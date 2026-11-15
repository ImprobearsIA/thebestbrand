#!/usr/bin/env python3
"""
Captures all 22 App Tour screenshots across EN, FR, PT, DE, IT from live /studio?lang=<lang>
using headless Chromium CDP at 1280x820 so the App Tour cards and Lightbox on the commercial page
show 100% localized UI in the selected language.
"""
import asyncio
import base64
import json
import os
import subprocess
import time
import aiohttp

OUT_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/apps/web/assets/app_captures"
LANGS = ["en", "fr", "pt", "de", "it"]

# Each entry: (base_filename, step, subStep, modal_to_open_or_None)
CAPTURE_SPECS = [
    ("tour_step0_1_objetivo", 0, 1, None),
    ("step0_logo_aura", 0, 2, None),
    ("tour_step0_3_giro", 0, 3, None),
    ("popup_video_paso_0_a_1", 0, 3, (0, 1)),
    ("step1_proposito_sinek", 1, 1, None),
    ("tour_step1_6_persona", 1, 6, None),
    ("popup_video_paso_1_a_2", 1, 7, (1, 2)),
    ("step2_touchpoints_carlzon", 2, 1, None),
    ("tour_step2_2_durante", 2, 2, None),
    ("popup_video_paso_2_a_3", 2, 3, (2, 3)),
    ("step3_naming_niza", 3, 1, None),
    ("tour_step3_2_naming", 3, 2, None),
    ("popup_video_paso_3_a_4", 3, 3, (3, 4)),
    ("step4_kansei_tipografia", 4, 4, None),
    ("tour_step4_1_kansei", 4, 1, None),
    ("popup_video_paso_4_a_5", 4, 5, (4, 5)),
    ("step5_taller_logo_liquid_glass", 5, 2, None),
    ("tour_step5_2_iter6_claro", 5, 1, None),
    ("popup_video_paso_5_a_6", 5, 2, (5, 6)),
    ("step6_visor_36_laminas", 6, 1, None),
    ("step6_boveda_entregables", 6, 2, None),
]

async def cdp_send(ws, method, params=None, msg_id=1):
    payload = {"id": msg_id, "method": method, "params": params or {}}
    await ws.send_str(json.dumps(payload))
    while True:
        msg = await ws.receive()
        if msg.type == aiohttp.WSMsgType.TEXT:
            data = json.loads(msg.data)
            if data.get("id") == msg_id:
                return data.get("result", {})

async def main():
    srv_proc = subprocess.Popen(
        ["python3", "-m", "http.server", "8095", "--bind", "127.0.0.1"],
        cwd="/home/antigravity/ImprobearsIA/thebestbrand/apps/web",
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    await asyncio.sleep(0.8)
    port = 9344
    proc = subprocess.Popen([
        "/usr/bin/chromium",
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        f"--remote-debugging-port={port}",
        "--window-size=1280,820",
        "about:blank"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    try:
        await asyncio.sleep(1.5)
        async with aiohttp.ClientSession() as session:
            tabs = await (await session.get(f"http://127.0.0.1:{port}/json")).json()
            ws_url = tabs[0]["webSocketDebuggerUrl"]
            async with session.ws_connect(ws_url, max_msg_size=50 * 1024 * 1024) as ws:
                msg_id = 1
                await cdp_send(ws, "Page.enable", {}, msg_id); msg_id += 1
                await cdp_send(ws, "Runtime.enable", {}, msg_id); msg_id += 1
                await cdp_send(ws, "Emulation.setDeviceMetricsOverride", {
                    "width": 1280,
                    "height": 820,
                    "deviceScaleFactor": 1,
                    "mobile": False
                }, msg_id); msg_id += 1

                for lang in LANGS:
                    url = f"http://127.0.0.1:8095/studio.html?brand=tbb&step=0&novideo=1&lang={lang}"
                    await cdp_send(ws, "Page.navigate", {"url": url}, msg_id); msg_id += 1
                    await asyncio.sleep(1.4)

                    # Dismiss splash and force language
                    init_js = f"""
                    (function() {{
                      localStorage.setItem('tbb_app_lang', '{lang}');
                      localStorage.setItem('thebestbrand_lang_v90', '{lang}');
                      if (window.tbbDismissAuraSplashBoot) window.tbbDismissAuraSplashBoot(false);
                      const ov = document.getElementById('tbbAuraSplashBootOverlay');
                      if (ov) ov.style.display = 'none';
                      if (window.tbbLoadOfficialAdminTheBestBrandData) window.tbbLoadOfficialAdminTheBestBrandData(0);
                      if (window.tbbSetLanguage) window.tbbSetLanguage('{lang}', true);
                      const toastEl = document.getElementById('stepResetToast');
                      if (toastEl) toastEl.style.display = 'none';
                      return document.documentElement.lang;
                    }})()
                    """
                    await cdp_send(ws, "Runtime.evaluate", {"expression": init_js, "returnByValue": True}, msg_id); msg_id += 1
                    await asyncio.sleep(0.5)

                    for base_name, step_num, sub_step, video_pair in CAPTURE_SPECS:
                        if video_pair is None:
                            step_js = f"""
                            (function() {{
                              const vm = document.getElementById('phaseTransitionVideoModal');
                              if (vm) vm.classList.remove('open');
                              const toastEl = document.getElementById('stepResetToast');
                              if (toastEl) toastEl.style.display = 'none';
                              window.tbbState.activeMode = 'step';
                              window.tbbState.step = {step_num};
                              window.tbbState.subStep = {sub_step};
                              const subKey = 'substep_{step_num}_{sub_step}';
                              if (window.getNextNonRepetitiveAuraMessage) {{
                                const m = window.getNextNonRepetitiveAuraMessage(subKey);
                                window.tbbState.auraCurrentMessage = m;
                                if (window.updateAuraTopPresenceDOM) window.updateAuraTopPresenceDOM(m);
                              }}
                              window.renderTbbZeroScrollStage();
                              if (window.tbbApplyCurrentLanguageToDOM) window.tbbApplyCurrentLanguageToDOM();
                              return true;
                            }})()
                            """
                        else:
                            from_s, to_s = video_pair
                            step_js = f"""
                            (function() {{
                              const toastEl = document.getElementById('stepResetToast');
                              if (toastEl) toastEl.style.display = 'none';
                              window.tbbState.activeMode = 'step';
                              window.tbbState.step = {step_num};
                              window.tbbState.subStep = {sub_step};
                              window.renderTbbZeroScrollStage();
                              if (window.openPhaseTransitionVideoCapsule) {{
                                window.openPhaseTransitionVideoCapsule({from_s}, {to_s}, {{ keepCurrentSubStep: true }});
                              }}
                              const v = document.getElementById('transitionTheoryVideoPlayer');
                              if (v) {{ try {{ v.pause(); v.currentTime = 1.2; }} catch(e){{}} }}
                              if (window.tbbApplyCurrentLanguageToDOM) window.tbbApplyCurrentLanguageToDOM();
                              return true;
                            }})()
                            """
                        await cdp_send(ws, "Runtime.evaluate", {"expression": step_js, "returnByValue": True}, msg_id); msg_id += 1
                        await asyncio.sleep(0.45)

                        shot = await cdp_send(ws, "Page.captureScreenshot", {"format": "png"}, msg_id); msg_id += 1
                        img_bytes = base64.b64decode(shot["data"])
                        out_path = os.path.join(OUT_DIR, f"{base_name}_{lang}.png")
                        with open(out_path, "wb") as f:
                            f.write(img_bytes)

                    # Also copy step6_boveda_entregables_<lang>.png to step6_firma_correo_html_<lang>.png
                    src_bov = os.path.join(OUT_DIR, f"step6_boveda_entregables_{lang}.png")
                    dst_fir = os.path.join(OUT_DIR, f"step6_firma_correo_html_{lang}.png")
                    if os.path.exists(src_bov):
                        with open(src_bov, "rb") as rf, open(dst_fir, "wb") as wf:
                            wf.write(rf.read())
                    print(f"[{lang.upper()}] 22 localized App Tour captures generated.")
    finally:
        proc.terminate()
        srv_proc.terminate()

if __name__ == "__main__":
    asyncio.run(main())
