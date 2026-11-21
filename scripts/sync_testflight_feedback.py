#!/usr/bin/env python3
"""
Sincronizador Oficial Zero-Touch de Comentarios y Capturas de TestFlight
(App Store Connect API -> Descarga de Capturas HD + Neon PostgreSQL tbb_feedback_inbox).
"""
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

import jwt  # PyJWT + cryptography

APP_ID = os.environ.get("ASC_APP_ID", "6836450465")
KEY_ID = os.environ.get("ASC_KEY_ID", "39SVX48393")
ISSUER_ID = os.environ.get("ASC_ISSUER_ID", "7cccb707-bcb3-4289-bf5e-631054c5b190")
KEY_PATH = Path(
    os.environ.get(
        "ASC_PRIVATE_KEY_PATH",
        os.path.expanduser("~/.appstoreconnect/private_keys/AuthKey_39SVX48393.p8"),
    )
)
OUT_DIR = Path(
    os.environ.get(
        "TBB_TESTFLIGHT_OUT_DIR",
        "/Users/oso/.gemini/antigravity/brain/d494e20d-5df7-41c7-ad31-4d13630be22d/scratch/testflight_feedback",
    )
)
RAILWAY_WEBHOOK_URL = "https://thebestbrand-api-studio-production.up.railway.app/api/v1/feedback/testflight-webhook"
RAILWAY_SUBMIT_URL = "https://thebestbrand-api-studio-production.up.railway.app/api/v1/feedback/submit"


def build_asc_jwt() -> str:
    private_key = KEY_PATH.read_text(encoding="utf-8")
    now = int(time.time())
    payload = {
        "iss": ISSUER_ID,
        "iat": now - 30,
        "exp": now + 1100,
        "aud": "appstoreconnect-v1",
    }
    headers = {"alg": "ES256", "kid": KEY_ID, "typ": "JWT"}
    return jwt.encode(payload, private_key, algorithm="ES256", headers=headers)


def asc_get(url: str, token: str) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=25) as resp:
        return json.loads(resp.read().decode("utf-8"))


def asc_post(url: str, token: str, body: dict) -> tuple[int, dict]:
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            return e.code, json.loads(raw)
        except Exception:
            return e.code, {"raw": raw}


def ensure_webhook_registered(token: str):
    try:
        existing = asc_get(f"https://api.appstoreconnect.apple.com/v1/apps/{APP_ID}/webhooks", token)
        hooks = existing.get("data") or []
        for h in hooks:
            u = (h.get("attributes") or {}).get("url") or ""
            if "testflight-webhook" in u:
                print(f"[WEBHOOK] Already active in App Store Connect: {h.get('id')} -> {u}")
                return
    except Exception as e:
        print(f"[WEBHOOK CHECK NOTE] {e}")

    st, res = asc_post(
        "https://api.appstoreconnect.apple.com/v1/webhooks",
        token,
        {
            "data": {
                "type": "webhooks",
                "attributes": {
                    "enabled": True,
                    "eventTypes": [
                        "BETA_FEEDBACK_SCREENSHOT_SUBMISSION_CREATED",
                        "BETA_FEEDBACK_CRASH_SUBMISSION_CREATED",
                    ],
                    "name": "TheBestBrand TestFlight AutoSync",
                    "secret": "improbears2026c00",
                    "url": RAILWAY_WEBHOOK_URL,
                },
                "relationships": {
                    "app": {"data": {"type": "apps", "id": APP_ID}}
                },
            }
        },
    )
    print(f"[WEBHOOK REGISTER] HTTP {st}: {str(res)[:300]}")


def main():
    if not KEY_PATH.exists():
        print(f"ERROR: Missing key at {KEY_PATH}")
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    token = build_asc_jwt()

    # 1. Auto-register Webhook in App Store Connect so future feedback arrives in real time!
    ensure_webhook_registered(token)

    # 2. Fetch all existing TestFlight Screenshot Submissions for The Best Brand (6836450465)
    url = (
        f"https://api.appstoreconnect.apple.com/v1/apps/{APP_ID}/betaFeedbackScreenshotSubmissions"
        f"?limit=50&sort=-createdDate&include=build,tester"
    )
    data = asc_get(url, token)
    items = data.get("data") or []
    included = {(inc.get("type"), inc.get("id")): inc for inc in (data.get("included") or [])}
    print(f"[TESTFLIGHT] Found {len(items)} screenshot feedback submission(s) in App Store Connect.")

    summary = []
    for idx, item in enumerate(items, start=1):
        sub_id = item.get("id", "")
        attrs = item.get("attributes") or {}
        rels = item.get("relationships") or {}

        tester_rel = ((rels.get("tester") or {}).get("data")) or {}
        tester_obj = included.get((tester_rel.get("type"), tester_rel.get("id")), {})
        tester_attrs = tester_obj.get("attributes") or {}
        tester_name = f"{tester_attrs.get('firstName') or ''} {tester_attrs.get('lastName') or ''}".strip()
        tester_email = tester_attrs.get("email") or attrs.get("email") or ""

        build_rel = ((rels.get("build") or {}).get("data")) or {}
        build_obj = included.get((build_rel.get("type"), build_rel.get("id")), {})
        build_ver = (build_obj.get("attributes") or {}).get("version") or ""

        # Fetch individual submission detail if screenshots array isn't inline
        screenshots = attrs.get("screenshots") or []
        if not screenshots and sub_id:
            try:
                det = asc_get(f"https://api.appstoreconnect.apple.com/v1/betaFeedbackScreenshotSubmissions/{sub_id}", token)
                screenshots = ((det.get("data") or {}).get("attributes") or {}).get("screenshots") or []
            except Exception:
                pass

        saved_files = []
        first_remote_url = ""
        for s_idx, shot in enumerate(screenshots, start=1):
            shot_url = shot.get("url") or ""
            if not shot_url:
                continue
            if not first_remote_url:
                first_remote_url = shot_url
            out_img = OUT_DIR / f"tf_{idx:02d}_{sub_id[:10]}_shot{s_idx}.jpg"
            if not out_img.exists():
                try:
                    with urllib.request.urlopen(shot_url, timeout=25) as r_img:
                        out_img.write_bytes(r_img.read())
                except Exception as dl_err:
                    print(f"  [WARN] Screenshot download failed: {dl_err}")
            if out_img.exists():
                saved_files.append(str(out_img))

        rec = {
            "index": idx,
            "id": sub_id,
            "createdDate": attrs.get("createdDate"),
            "comment": attrs.get("comment") or "",
            "testerName": tester_name,
            "testerEmail": tester_email,
            "deviceModel": attrs.get("deviceModel") or "",
            "osVersion": attrs.get("osVersion") or "",
            "locale": attrs.get("locale") or "",
            "screenWidth": attrs.get("screenWidthInPoints"),
            "screenHeight": attrs.get("screenHeightInPoints"),
            "buildVersion": build_ver,
            "screenshotsLocal": saved_files,
        }
        summary.append(rec)

        # Also push into our live Railway -> Neon PostgreSQL inbox!
        try:
            wh_req = urllib.request.Request(
                RAILWAY_WEBHOOK_URL,
                data=json.dumps({"data": item}).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            urllib.request.urlopen(wh_req, timeout=10).read()
        except Exception:
            pass

    # 3. Also check crash submissions
    try:
        crashes_data = asc_get(
            f"https://api.appstoreconnect.apple.com/v1/apps/{APP_ID}/betaFeedbackCrashSubmissions?limit=20&sort=-createdDate",
            token,
        )
        crashes = crashes_data.get("data") or []
        print(f"[TESTFLIGHT] Found {len(crashes)} crash submission(s).")
    except Exception as ce:
        crashes = []
        print(f"[TESTFLIGHT CRASH CHECK NOTE] {ce}")

    manifest_file = OUT_DIR / "manifest.json"
    manifest_file.write_text(json.dumps({"submissions": summary, "crash_count": len(crashes)}, indent=2, ensure_ascii=False), encoding="utf-8")
    print("\n=== SUMMARY JSON ===")
    print(json.dumps(summary, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
