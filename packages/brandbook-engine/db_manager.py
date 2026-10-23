"""
TheBestBrand — Neon Serverless PostgreSQL Database Manager
Maneja la persistencia de usuarios, sesiones de branding, manifiestos estratégicos,
candidatos de naming, torneos de 60 pares y compilaciones de Brandbooks en Neon.
"""

import os
import json
import logging
from typing import Dict, Any, Optional, List
from datetime import datetime

logger = logging.getLogger("TheBestBrand.DB")

DATABASE_URL = os.environ.get("DATABASE_URL", "")
NEON_PROJECT_ID = os.environ.get("NEON_PROJECT_ID", "green-cherry-54371329")


class NeonDatabaseManager:
    """Gestor de persistencia en Neon PostgreSQL con tolerancia a fallos y fallback."""
    
    def __init__(self, connection_url: Optional[str] = None):
        self.conn_url = connection_url or DATABASE_URL
        self._pool = None
        self._driver = None
        self._init_driver()
        
    def _init_driver(self):
        """Intenta inicializar psycopg o asyncpg si están disponibles."""
        try:
            import psycopg2
            self._driver = "psycopg2"
            logger.info("NeonDatabaseManager: Conector psycopg2 disponible.")
        except ImportError:
            try:
                import asyncpg
                self._driver = "asyncpg"
                logger.info("NeonDatabaseManager: Conector asyncpg disponible.")
            except ImportError:
                self._driver = "offline_fallback"
                logger.info("NeonDatabaseManager: Modo offline/JSON fallback activo (sin driver nativo).")

    def is_connected(self) -> bool:
        return bool(self.conn_url and self._driver != "offline_fallback")

    def save_project(self, brand_name: str, industry: str = "comercio_local", session_token: Optional[str] = None) -> Dict[str, Any]:
        """Crea o actualiza un proyecto en Neon."""
        if not self.is_connected():
            return {
                "id": "local-demo-project",
                "brand_name": brand_name,
                "industry": industry,
                "status": "in_progress",
                "backend": "offline_fallback"
            }
        
        try:
            import psycopg2
            from psycopg2.extras import RealDictCursor
            with psycopg2.connect(self.conn_url) as conn:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("""
                        INSERT INTO projects (brand_name, industry, session_token)
                        VALUES (%s, %s, %s)
                        RETURNING id, brand_name, industry, current_step, status, created_at;
                    """, (brand_name, industry, session_token))
                    row = cur.fetchone()
                    conn.commit()
                    return dict(row)
        except Exception as e:
            logger.error(f"Error guardando proyecto en Neon: {e}")
            return {"error": str(e), "brand_name": brand_name}

    def save_manifesto(self, project_id: str, dimensions: Dict[str, Any], socratic_notes: List[Any]) -> bool:
        """Guarda el progreso de los 6 pilares estratégicos en Neon."""
        if not self.is_connected():
            return True
        try:
            import psycopg2
            with psycopg2.connect(self.conn_url) as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO brand_manifestos (project_id, dimensions, raw_socratic_notes)
                        VALUES (%s, %s, %s)
                        ON CONFLICT (id) DO UPDATE 
                        SET dimensions = EXCLUDED.dimensions,
                            raw_socratic_notes = EXCLUDED.raw_socratic_notes,
                            updated_at = CURRENT_TIMESTAMP;
                    """, (project_id, json.dumps(dimensions), json.dumps(socratic_notes)))
                    conn.commit()
                    return True
        except Exception as e:
            logger.error(f"Error guardando manifiesto en Neon: {e}")
            return False

    def save_compiled_brandbook(self, project_id: str, master_spec: Dict[str, Any]) -> Optional[str]:
        """Registra la compilación final del Brandbook de 38 páginas en Neon."""
        if not self.is_connected():
            return "local-spec-saved"
        try:
            import psycopg2
            with psycopg2.connect(self.conn_url) as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO compiled_brandbooks (project_id, master_spec_json)
                        VALUES (%s, %s)
                        RETURNING id;
                    """, (project_id, json.dumps(master_spec)))
                    book_id = cur.fetchone()[0]
                    conn.commit()
                    return str(book_id)
        except Exception as e:
            logger.error(f"Error guardando brandbook en Neon: {e}")
            return None
