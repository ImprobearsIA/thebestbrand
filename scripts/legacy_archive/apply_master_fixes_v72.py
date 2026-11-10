import re
import os

print("[1/3] Updating video URLs and removing orange in tbb-commercial-experience-and-payments.js...")

with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update Video URLs to GCS with HTTP 206 Byte-Range streaming support
gcs_base = "https://storage.googleapis.com/thebestbrand-media-crm/videos/"

js = js.replace('/assets/videos/capsula_teoria_aura_recorrido.mp4', gcs_base + 'capsula_teoria_aura_recorrido.mp4')
js = js.replace('/assets/videos/poster_aura_recorrido.jpg', gcs_base + 'poster_aura_recorrido.jpg')

for i in range(0, 7):
    js = js.replace(f'/assets/videos/capsula_teoria_paso_{i}.mp4', gcs_base + f'capsula_teoria_paso_{i}.mp4')
    js = js.replace(f'/assets/videos/poster_paso_{i}.jpg', gcs_base + f'poster_paso_{i}.jpg')

# 2. Update default poster fallbacks
js = js.replace("poster='/assets/videos/poster_aura_recorrido.jpg'", f"poster='{gcs_base}poster_aura_recorrido.jpg'")
js = js.replace('poster="/assets/videos/poster_aura_recorrido.jpg"', f'poster="{gcs_base}poster_aura_recorrido.jpg"')

# 3. Replace any orange in video play overlay with Navy Blue #0D2540 + Sapphire #426EAE
js = re.sub(
    r'border-bottom:\s*3\.5px solid #FF7A00;',
    'border-bottom: 2.5px solid #4C9DE6;',
    js
)

# 4. Update .tbb-float-buy-cta to official Navy Blue (#0D2540) + Sky Blue (#4C9DE6) - ZERO ORANGE
float_btn_css_old = """.tbb-float-buy-cta {
        background: linear-gradient(135deg, #FF7A00 0%, #EA580C 100%);
        color: #FFFFFF;
        border: none;
        padding: 9px 18px;
        border-radius: 999px;
        font-family: var(--font-main);
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(255, 122, 0, 0.45);
        white-space: nowrap;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }"""

float_btn_css_new = """.tbb-float-buy-cta {
        background: linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%) !important;
        color: #FFFFFF !important;
        border: 1.5px solid #4C9DE6 !important;
        padding: 9px 18px;
        border-radius: 999px;
        font-family: var(--font-main);
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(13, 37, 64, 0.45) !important;
        white-space: nowrap;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .tbb-float-buy-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(76, 157, 230, 0.45) !important;
        border-color: #93C5FD !important;
      }"""

if float_btn_css_old in js:
    js = js.replace(float_btn_css_old, float_btn_css_new)
    print("✓ Updated .tbb-float-buy-cta to Navy Blue")
else:
    # Regex fallback
    js = re.sub(
        r'\.tbb-float-buy-cta\s*\{[^}]*background:[^}]*\}',
        float_btn_css_new,
        js
    )
    print("✓ .tbb-float-buy-cta updated via regex")

# 5. Strict Demo Isolation CSS: completely hide floating bar and header buy button in demo
strict_demo_css = """
      /* REGLA DE AISLAMIENTO ESTRICTO EN SECCIÓN DEMO: Cero ruido de compra */
      body.tbb-is-demo-section #tbbAlwaysOnBuyFloatingBar,
      body.tbb-is-demo-section .tbb-comm-btn-black,
      body.tbb-is-demo-section #tbbBtnTopBuyAppNow,
      body.tbb-is-demo-section .tbb-sec-tab-direct-studio,
      body.tbb-is-demo-section .tbb-comm-btn-studio-header,
      body.tbb-is-demo-section #tbbCommercialLangSelect {
        display: none !important;
      }
"""
js = re.sub(r'/\* REGLA DE AISLAMIENTO ESTRICTO EN SECCIÓN DEMO:.*?\*/\s*body\.tbb-is-demo-section\s*\{[^}]*\}', strict_demo_css.strip(), js, flags=re.DOTALL)
if "body.tbb-is-demo-section" not in js:
    js = js.replace("/* Modales */", strict_demo_css + "\n      /* Modales */")

# 6. Hero button update: remove orange glow and make it elegant Navy Blue
js = js.replace(
    'background:#0D2540; border:2px solid #4C9DE6; border-bottom:3.5px solid #FF7A00;',
    'background:#0D2540; border:2px solid #426EAE; border-bottom:3.5px solid #4C9DE6;'
)

# 7. Make sure #tbbAlwaysOnBuyFloatingBar is never mounted or shown in studio.html
js = js.replace(
    'const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true";',
    'const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true" && window.location.pathname !== "/studio" && !window.location.pathname.endsWith("studio.html");'
)

with open("apps/web/tbb-commercial-experience-and-payments.js", "w", encoding="utf-8") as f:
    f.write(js)
print("✓ Saved apps/web/tbb-commercial-experience-and-payments.js")

# [2/3] Update studio.html: strictly hide #tbbAlwaysOnBuyFloatingBar and clean up header
print("[2/3] Updating apps/web/studio.html...")
with open("apps/web/studio.html", "r", encoding="utf-8") as f:
    studio = f.read()

# Add a permanent global style in head to hide floating buy bar in studio
studio_hide_style = """<style id="tbbPermanentStudioCleanStyles">
  #tbbAlwaysOnBuyFloatingBar { display: none !important; }
  .tbb-comm-btn-studio-header { display: none !important; }
</style>"""

if "tbbPermanentStudioCleanStyles" not in studio:
    studio = studio.replace("</head>", f"  {studio_hide_style}\n</head>")
    print("✓ Injected tbbPermanentStudioCleanStyles in studio.html")

with open("apps/web/studio.html", "w", encoding="utf-8") as f:
    f.write(studio)
print("✓ Saved apps/web/studio.html")

# [3/3] Bump cache bust version to v=72.0 in index.html and studio.html
print("[3/3] Bumping script version to v=72.0...")
for fn in ["apps/web/index.html", "apps/web/studio.html"]:
    with open(fn, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("v=71.0", "v=72.0")
    with open(fn, "w", encoding="utf-8") as f:
        f.write(c)
    print(f"✓ Bumped version to v=72.0 in {fn}")

print("=== ALL MASTER FIXES APPLIED SUCCESSFULLY ===")
