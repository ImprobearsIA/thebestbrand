#!/usr/bin/env python3
"""
===============================================================================
improbears_bridge_mcp_server.py — Servidor MCP JSON-RPC 2.0 (stdio)
Puente Operativo Bidireccional entre Google Antigravity (`max`) y Claude Code (`claude_code`).
- Base de datos SQLite en SSD local (`~/.local/share/improbears-bridge/bridge.sqlite3`)
  con modo WAL y transacciones atómicas `BEGIN IMMEDIATE` (fuera de Google Drive).
- Validación estricta de rutas dentro de `Proyectos Antigravity` y bloqueo de archivos
  de credenciales/secretos.
===============================================================================
"""
import os
import sys
import time
import uuid
import json
import hashlib
import sqlite3
from datetime import datetime
from typing import Dict, Any, List, Optional

WORKSPACE_ROOT = "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity"
LOCAL_STATE_DIR = os.path.expanduser("~/.local/share/improbears-bridge")
DB_PATH = os.path.join(LOCAL_STATE_DIR, "bridge.sqlite3")

FORBIDDEN_SECRET_PATTERNS = (".env", "cookie", ".zoho_credentials", ".onedrive_personal_token", ".gemini_credentials", "id_ed25519")


def get_db() -> sqlite3.Connection:
    os.makedirs(LOCAL_STATE_DIR, mode=0o700, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=15.0, isolation_level=None)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA busy_timeout=5000;")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            task_id TEXT PRIMARY KEY,
            idempotency_key TEXT UNIQUE,
            project TEXT NOT NULL,
            from_agent TEXT NOT NULL,
            to_agent TEXT NOT NULL,
            priority INTEGER DEFAULT 50,
            instructions TEXT NOT NULL,
            file_refs_json TEXT DEFAULT '[]',
            status TEXT DEFAULT 'pending',
            retry_count INTEGER DEFAULT 0,
            max_retries INTEGER DEFAULT 2,
            result_summary TEXT,
            changed_files_json TEXT DEFAULT '[]',
            error_message TEXT,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            expires_at INTEGER NOT NULL
        );
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS file_locks (
            file_path TEXT PRIMARY KEY,
            owner_agent TEXT NOT NULL,
            task_id TEXT,
            locked_at INTEGER NOT NULL,
            expires_at INTEGER NOT NULL
        );
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS decisions (
            decision_id TEXT PRIMARY KEY,
            project TEXT NOT NULL,
            author_agent TEXT NOT NULL,
            title TEXT NOT NULL,
            context_and_rationale TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS artifacts (
            artifact_id TEXT PRIMARY KEY,
            project TEXT NOT NULL,
            author_agent TEXT NOT NULL,
            artifact_type TEXT NOT NULL,
            file_path TEXT NOT NULL,
            sha256 TEXT NOT NULL,
            summary TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
    """)
    return conn


def _validate_safe_path(p: str) -> str:
    abs_p = os.path.abspath(os.path.join(WORKSPACE_ROOT, p) if not os.path.isabs(p) else p)
    low = os.path.basename(abs_p).lower()
    for pat in FORBIDDEN_SECRET_PATTERNS:
        if pat in low:
            raise ValueError(f"Ruta bloqueada por política de seguridad C-00 (contiene '{pat}'): {abs_p}")
    return abs_p


def _cleanup_expired(conn: sqlite3.Connection):
    now = int(time.time())
    conn.execute("DELETE FROM file_locks WHERE expires_at <= ?", (now,))
    conn.execute(
        "UPDATE tasks SET status = 'pending', updated_at = ? WHERE status = 'in_progress' AND expires_at <= ? AND retry_count < max_retries",
        (now, now)
    )


TOOLS = [
    {
        "name": "bridge_post_task",
        "description": "Crea una tarea en la bandeja compartida entre Antigravity ('max') y Claude Code ('claude_code') con clave de idempotencia y prioridad.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "project": {"type": "string", "description": "Nombre del proyecto (ej. TheBestBrand, ImproBears_Web_Awwwards, Zoho_ImproBears, Acqua)"},
                "from_agent": {"type": "string", "description": "Agente emisor ('max' o 'claude_code')"},
                "to_agent": {"type": "string", "description": "Agente destino ('claude_code' o 'max')"},
                "instructions": {"type": "string", "description": "Instrucciones claras y accionables"},
                "file_refs": {"type": "array", "items": {"type": "string"}, "description": "Rutas relativas o absolutas de referencia"},
                "priority": {"type": "integer", "description": "Prioridad 1-100 (100 = máxima)"},
                "idempotency_key": {"type": "string", "description": "Clave opcional para evitar tareas duplicadas"}
            },
            "required": ["project", "from_agent", "to_agent", "instructions"]
        }
    },
    {
        "name": "bridge_claim_task",
        "description": "Reclama atómicamente la siguiente tarea pendiente de mayor prioridad asignada al agente y la marca como 'in_progress'.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "agent_id": {"type": "string", "description": "Identificador del agente ('claude_code' o 'max')"},
                "lease_seconds": {"type": "integer", "description": "Segundos de concesión antes de expirar (default 900)"}
            },
            "required": ["agent_id"]
        }
    },
    {
        "name": "bridge_complete_task",
        "description": "Marca una tarea como 'done' registrando el resumen de resultados y las rutas modificadas.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "task_id": {"type": "string"},
                "agent_id": {"type": "string"},
                "result_summary": {"type": "string"},
                "changed_files": {"type": "array", "items": {"type": "string"}}
            },
            "required": ["task_id", "agent_id", "result_summary"]
        }
    },
    {
        "name": "bridge_fail_task",
        "description": "Registra un fallo en una tarea; si tiene reintentos disponibles la devuelve a 'pending', de lo contrario la marca como 'failed'.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "task_id": {"type": "string"},
                "agent_id": {"type": "string"},
                "error_message": {"type": "string"}
            },
            "required": ["task_id", "agent_id", "error_message"]
        }
    },
    {
        "name": "bridge_read_inbox",
        "description": "Consulta las tareas pendientes, en progreso o completadas recientemente para un agente o proyecto.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "agent_id": {"type": "string", "description": "Filtrar por agente destino ('claude_code', 'max' o 'all')"},
                "status": {"type": "string", "description": "Filtrar por estado ('pending', 'in_progress', 'done', 'failed', 'all')"},
                "limit": {"type": "integer", "description": "Máximo de registros (default 20)"}
            }
        }
    },
    {
        "name": "bridge_record_decision",
        "description": "Registra una decisión arquitectónica o de producto (ADR) para que ambos agentes la consulten sin perder contexto.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "project": {"type": "string"},
                "author_agent": {"type": "string"},
                "title": {"type": "string"},
                "context_and_rationale": {"type": "string"}
            },
            "required": ["project", "author_agent", "title", "context_and_rationale"]
        }
    },
    {
        "name": "bridge_lock_file",
        "description": "Adquiere o renueva un bloqueo temporal sobre un archivo antes de editarlo para evitar colisiones entre Antigravity y Claude Code.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "file_path": {"type": "string"},
                "owner_agent": {"type": "string"},
                "ttl_seconds": {"type": "integer", "description": "Duración del bloqueo en segundos (default 300)"},
                "task_id": {"type": "string"}
            },
            "required": ["file_path", "owner_agent"]
        }
    },
    {
        "name": "bridge_unlock_file",
        "description": "Libera el bloqueo de un archivo una vez finalizada su edición.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "file_path": {"type": "string"},
                "owner_agent": {"type": "string"}
            },
            "required": ["file_path", "owner_agent"]
        }
    },
    {
        "name": "bridge_get_project_context",
        "description": "Entrega de inmediato el SQUAD_MANIFEST.json, las decisiones recientes y los bloqueos activos de un proyecto sin tener que explorar todo el disco.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "project": {"type": "string", "description": "Nombre del proyecto (ej. TheBestBrand)"}
            },
            "required": ["project"]
        }
    },
    {
        "name": "bridge_publish_artifact",
        "description": "Registra un entregable, diff o reporte con su ruta y hash SHA-256 verificado (sin incluir secretos en el payload).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "project": {"type": "string"},
                "author_agent": {"type": "string"},
                "artifact_type": {"type": "string", "description": "ej. 'diff', 'audit_report', 'pdf_brandbook', 'test_result'"},
                "file_path": {"type": "string"},
                "summary": {"type": "string"}
            },
            "required": ["project", "author_agent", "artifact_type", "file_path", "summary"]
        }
    }
]


def execute_tool(name: str, args: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_db()
    now = int(time.time())
    _cleanup_expired(conn)

    if name == "bridge_post_task":
        project = str(args["project"])
        from_agent = str(args["from_agent"])
        to_agent = str(args["to_agent"])
        instructions = str(args["instructions"])
        priority = int(args.get("priority", 50))
        file_refs = [_validate_safe_path(f) for f in (args.get("file_refs") or [])]
        idem_key = args.get("idempotency_key") or hashlib.sha256(f"{project}|{from_agent}|{to_agent}|{instructions}".encode("utf-8")).hexdigest()[:24]
        task_id = f"TASK-{uuid.uuid4().hex[:8].upper()}"

        conn.execute("BEGIN IMMEDIATE;")
        try:
            existing = conn.execute("SELECT task_id, status FROM tasks WHERE idempotency_key = ?", (idem_key,)).fetchone()
            if existing:
                conn.execute("COMMIT;")
                return {"ok": True, "deduplicated": True, "task_id": existing["task_id"], "status": existing["status"]}
            conn.execute(
                """INSERT INTO tasks (task_id, idempotency_key, project, from_agent, to_agent, priority, instructions, file_refs_json, status, created_at, updated_at, expires_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)""",
                (task_id, idem_key, project, from_agent, to_agent, priority, instructions, json.dumps(file_refs), now, now, now + 86400)
            )
            conn.execute("COMMIT;")
            return {"ok": True, "deduplicated": False, "task_id": task_id, "to_agent": to_agent, "priority": priority}
        except Exception as e:
            conn.execute("ROLLBACK;")
            raise e

    elif name == "bridge_claim_task":
        agent_id = str(args["agent_id"])
        lease = int(args.get("lease_seconds", 900))
        conn.execute("BEGIN IMMEDIATE;")
        try:
            row = conn.execute(
                "SELECT * FROM tasks WHERE to_agent = ? AND status = 'pending' ORDER BY priority DESC, created_at ASC LIMIT 1",
                (agent_id,)
            ).fetchone()
            if not row:
                conn.execute("COMMIT;")
                return {"ok": True, "claimed": False, "message": f"No hay tareas pendientes para {agent_id}."}
            conn.execute(
                "UPDATE tasks SET status = 'in_progress', updated_at = ?, expires_at = ? WHERE task_id = ?",
                (now, now + lease, row["task_id"])
            )
            conn.execute("COMMIT;")
            return {
                "ok": True,
                "claimed": True,
                "task": {
                    "task_id": row["task_id"],
                    "project": row["project"],
                    "from_agent": row["from_agent"],
                    "priority": row["priority"],
                    "instructions": row["instructions"],
                    "file_refs": json.loads(row["file_refs_json"] or "[]"),
                }
            }
        except Exception as e:
            conn.execute("ROLLBACK;")
            raise e

    elif name == "bridge_complete_task":
        task_id = str(args["task_id"])
        summary = str(args["result_summary"])
        changed = [_validate_safe_path(f) for f in (args.get("changed_files") or [])]
        conn.execute("BEGIN IMMEDIATE;")
        conn.execute(
            "UPDATE tasks SET status = 'done', result_summary = ?, changed_files_json = ?, updated_at = ? WHERE task_id = ?",
            (summary, json.dumps(changed), now, task_id)
        )
        conn.execute("DELETE FROM file_locks WHERE task_id = ?", (task_id,))
        conn.execute("COMMIT;")
        return {"ok": True, "task_id": task_id, "status": "done"}

    elif name == "bridge_fail_task":
        task_id = str(args["task_id"])
        err_msg = str(args["error_message"])
        conn.execute("BEGIN IMMEDIATE;")
        row = conn.execute("SELECT retry_count, max_retries FROM tasks WHERE task_id = ?", (task_id,)).fetchone()
        if not row:
            conn.execute("COMMIT;")
            return {"ok": False, "error": "Task not found"}
        new_retry = int(row["retry_count"]) + 1
        new_status = "pending" if new_retry <= int(row["max_retries"]) else "failed"
        conn.execute(
            "UPDATE tasks SET status = ?, retry_count = ?, error_message = ?, updated_at = ? WHERE task_id = ?",
            (new_status, new_retry, err_msg, now, task_id)
        )
        conn.execute("DELETE FROM file_locks WHERE task_id = ?", (task_id,))
        conn.execute("COMMIT;")
        return {"ok": True, "task_id": task_id, "new_status": new_status, "retry_count": new_retry}

    elif name == "bridge_read_inbox":
        agent_id = args.get("agent_id", "all")
        status = args.get("status", "all")
        limit = int(args.get("limit", 20))
        q = "SELECT task_id, project, from_agent, to_agent, priority, status, instructions, result_summary, updated_at FROM tasks WHERE 1=1"
        params: list = []
        if agent_id and agent_id != "all":
            q += " AND to_agent = ?"
            params.append(agent_id)
        if status and status != "all":
            q += " AND status = ?"
            params.append(status)
        q += " ORDER BY priority DESC, updated_at DESC LIMIT ?"
        params.append(limit)
        rows = [dict(r) for r in conn.execute(q, params).fetchall()]
        return {"ok": True, "count": len(rows), "tasks": rows}

    elif name == "bridge_record_decision":
        dec_id = f"ADR-{uuid.uuid4().hex[:8].upper()}"
        ctx_rat = args.get("context_and_rationale") or f"Context: {args.get('context', '')} | Decision: {args.get('decision', '')}"
        conn.execute(
            "INSERT INTO decisions (decision_id, project, author_agent, title, context_and_rationale, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            (dec_id, str(args["project"]), str(args["author_agent"]), str(args["title"]), str(ctx_rat), datetime.now().isoformat())
        )
        return {"ok": True, "decision_id": dec_id}

    elif name == "bridge_lock_file":
        safe_p = _validate_safe_path(str(args["file_path"]))
        owner = str(args["owner_agent"])
        ttl = int(args.get("ttl_seconds", 300))
        task_id = args.get("task_id")
        conn.execute("BEGIN IMMEDIATE;")
        try:
            curr = conn.execute("SELECT owner_agent, expires_at FROM file_locks WHERE file_path = ?", (safe_p,)).fetchone()
            if curr and curr["owner_agent"] != owner and curr["expires_at"] > now:
                conn.execute("COMMIT;")
                return {"ok": False, "locked": False, "held_by": curr["owner_agent"], "expires_in_sec": curr["expires_at"] - now}
            conn.execute(
                "INSERT OR REPLACE INTO file_locks (file_path, owner_agent, task_id, locked_at, expires_at) VALUES (?, ?, ?, ?, ?)",
                (safe_p, owner, task_id, now, now + ttl)
            )
            conn.execute("COMMIT;")
            return {"ok": True, "locked": True, "file_path": safe_p, "owner_agent": owner, "expires_at": now + ttl}
        except Exception as e:
            conn.execute("ROLLBACK;")
            raise e

    elif name == "bridge_unlock_file":
        safe_p = _validate_safe_path(str(args["file_path"]))
        owner = str(args["owner_agent"])
        conn.execute("DELETE FROM file_locks WHERE file_path = ? AND owner_agent = ?", (safe_p, owner))
        return {"ok": True, "unlocked": True, "file_path": safe_p}

    elif name == "bridge_get_project_context":
        proj = str(args["project"])
        squad_path = os.path.join(WORKSPACE_ROOT, "SQUAD_MANIFEST.json")
        squad = {}
        if os.path.exists(squad_path):
            with open(squad_path, "r", encoding="utf-8") as f:
                squad = json.load(f)
        decs = [dict(r) for r in conn.execute("SELECT * FROM decisions WHERE project = ? OR project = 'GLOBAL' ORDER BY created_at DESC LIMIT 10", (proj,)).fetchall()]
        locks = [dict(r) for r in conn.execute("SELECT * FROM file_locks WHERE expires_at > ?", (now,)).fetchall()]
        arts = [dict(r) for r in conn.execute("SELECT * FROM artifacts WHERE project = ? ORDER BY created_at DESC LIMIT 10", (proj,)).fetchall()]
        return {
            "ok": True,
            "project": proj,
            "squad_manifest_summary": {
                "organization": squad.get("organization"),
                "c00_visual_rules": squad.get("c00_visual_rules"),
                "accounts": (squad.get("human_leader") or {}).get("accounts"),
            },
            "recent_decisions": decs,
            "active_file_locks": locks,
            "recent_artifacts": arts,
        }

    elif name == "bridge_publish_artifact":
        safe_p = _validate_safe_path(str(args["file_path"]))
        digest = "FILE_NOT_FOUND"
        if os.path.isfile(safe_p):
            h = hashlib.sha256()
            with open(safe_p, "rb") as f:
                for chunk in iter(lambda: f.read(65536), b""):
                    h.update(chunk)
            digest = h.hexdigest()
        art_id = f"ART-{uuid.uuid4().hex[:8].upper()}"
        conn.execute(
            "INSERT INTO artifacts (artifact_id, project, author_agent, artifact_type, file_path, sha256, summary, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (art_id, str(args["project"]), str(args["author_agent"]), str(args["artifact_type"]), safe_p, digest, str(args["summary"]), datetime.now().isoformat())
        )
        return {"ok": True, "artifact_id": art_id, "file_path": safe_p, "sha256": digest}

    raise ValueError(f"Unknown tool: {name}")


def main():
    for raw_line in sys.stdin:
        line = raw_line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except Exception:
            continue

        method = req.get("method")
        req_id = req.get("id")

        if method == "initialize":
            resp = {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {"tools": {}},
                    "serverInfo": {"name": "improbears-bridge", "version": "1.0.0"}
                }
            }
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()
        elif method == "notifications/initialized":
            continue
        elif method == "tools/list":
            resp = {"jsonrpc": "2.0", "id": req_id, "result": {"tools": TOOLS}}
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()
        elif method == "tools/call":
            params = req.get("params") or {}
            tname = params.get("name", "")
            targs = params.get("arguments") or {}
            try:
                res_obj = execute_tool(tname, targs)
                resp = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": json.dumps(res_obj, ensure_ascii=False, indent=2)}],
                        "isError": False
                    }
                }
            except Exception as err:
                resp = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": json.dumps({"ok": False, "error": str(err)}, ensure_ascii=False)}],
                        "isError": True
                    }
                }
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()
        elif req_id is not None:
            resp = {"jsonrpc": "2.0", "id": req_id, "result": {}}
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    main()
