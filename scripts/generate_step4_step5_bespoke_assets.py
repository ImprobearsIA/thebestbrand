"""
Generador Paralelo de Activos Visuales de Alto Contraste para los Pasos 4 y 5 (Steve Jobs & LAB-AVI Gauntlet V18).
Crea láminas dedicadas para:
- Las 4 Direcciones Maestras de Identidad en el Paso 4 (reemplazando los SVGs genéricos).
- Los Duelos de Aislamiento de 1 Solo Atributo (Ceteris Paribus) en el Paso 5.
"""

import os
import json
import base64
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../apps/web/assets/avi"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

BESPOKE_ASSETS = [
    # PASO 4: 4 DIRECCIONES MAESTRAS DE IDENTIDAD (ALTO CONTRASTE, CERO GENÉRICOS)
    {
        "filename": "step4_dir1_swiss_geometric.png",
        "prompt": (
            "Museum-grade brand identity presentation board by Pentagram and Apple Design Team. "
            "A bold, iconic minimalist geometric monogram logo mark constructed with Golden Ratio circles and 45-degree architectural cuts, "
            "shown on left as a precision blueprint on warm cream paper (#FAF8F5) and on right embossed in brushed gold and obsidian titanium on a luxury app icon and physical anodized metal badge. "
            "Ultra high contrast, photorealistic studio lighting, no random text."
        )
    },
    {
        "filename": "step4_dir2_modern_heraldic.png",
        "prompt": (
            "World-class modern heraldic crest brand identity presentation board inspired by Porsche and Ferrari design studios. "
            "A sleek, contemporary aerodynamic shield emblem with precision metallic facets, shown both as a flat high-contrast vector mark on ivory paper "
            "and as a 3D woven carbon-fiber and gold enamel crest on a luxury physical product. Ultra sharp contrast, no random text."
        )
    },
    {
        "filename": "step4_dir3_organic_golden_flow.png",
        "prompt": (
            "Iconic continuous-curve symbol brand identity board inspired by Apple, Airbnb and Nike design language. "
            "A single fluid, harmonious golden-ratio ribbon forming an unforgettable abstract symbol, presented with its mathematical curvature grid on the left "
            "and rendered in luminous warm gold and deep obsidian glass on the right. High contrast, studio photography, no text."
        )
    },
    {
        "filename": "step4_dir4_architectural_origami.png",
        "prompt": (
            "Avant-garde architectural faceted symbol brand identity board inspired by Swiss International Style and luxury hardware brands. "
            "A bold isometric prism and origami falcon mark with razor-sharp 30 and 60 degree facets, shown in pure black-and-white vector positive/negative lockup "
            "and laser-etched into matte black steel. Maximum visual contrast, no text."
        )
    },
    # PASO 5: LÁMINAS DE AISLAMIENTO DE 1 SOLO ATRIBUTO (CETERIS PARIBUS)
    {
        "filename": "step5_attr1_curves_vs_angles.png",
        "prompt": (
            "Split A/B visual comparison diagram on pure contrasting studio background isolating ONLY ONE design attribute: Corner Curvature. "
            "Left half shows a bold geometric symbol with smooth, organic continuous rounded curves (like Apple/Airbnb). "
            "Right half shows the EXACT same symbol scale and weight but with razor-sharp 45-degree faceted chamfered corners (like Tesla/Lamborghini). "
            "Ultra clear side-by-side comparison, deep navy and gold accents, no text."
        )
    },
    {
        "filename": "step5_attr2_fine_vs_bold_stroke.png",
        "prompt": (
            "Split A/B visual comparison diagram isolating ONLY ONE design attribute: Stroke Weight and Mass. "
            "Left half shows a luxury geometric emblem rendered in ultra-fine Swiss watchmaking precision lines (1.25mm). "
            "Right half shows the exact same emblem rendered in monumental, ultra-bold solid ink mass (4mm) with maximum impact. "
            "Extreme visual contrast, Pentagram design manual style, no text."
        )
    },
    {
        "filename": "step5_attr3_open_vs_enclosed.png",
        "prompt": (
            "Split A/B visual comparison diagram isolating ONLY ONE design attribute: Spatial Containment. "
            "Left half shows a dynamic minimalist mark floating freely in open negative space without borders. "
            "Right half shows the same mark anchored inside a solid protective hexagonal heraldic shield container. "
            "Crisp black, ivory, and gold architectural presentation, no text."
        )
    },
    {
        "filename": "step5_attr4_static_vs_kinetic.png",
        "prompt": (
            "Split A/B visual comparison diagram isolating ONLY ONE design attribute: Axial Symmetry vs Kinetic Forward Tilt. "
            "Left half shows a perfectly vertical 90-degree symmetrical architectural emblem radiating calm authority. "
            "Right half shows the same emblem tilted forward at a 14-degree aerodynamic speed angle radiating motion and velocity. "
            "Swiss design manual illustration, no text."
        )
    }
]


def generate_asset(item: dict) -> dict:
    models = ["gemini-2.5-flash-image", "gemini-3.1-flash-image"]
    out_path = os.path.join(OUTPUT_DIR, item["filename"])
    for model in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"
        payload = {
            "contents": [{"parts": [{"text": item["prompt"]}]}],
            "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
        }
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=50) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
                for part in parts:
                    if "inlineData" in part and part["inlineData"].get("data"):
                        img_bytes = base64.b64decode(part["inlineData"]["data"])
                        with open(out_path, "wb") as f:
                            f.write(img_bytes)
                        return {"filename": item["filename"], "status": "SUCCESS", "bytes": len(img_bytes), "model": model}
        except Exception as e:
            last_err = str(e)
            continue
    return {"filename": item["filename"], "status": "FAILED", "error": locals().get("last_err", "Unknown")}


def main():
    print(f"🎨 Generando {len(BESPOKE_ASSETS)} láminas de alto contraste en Google AI Studio...")
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = [ex.submit(generate_asset, item) for item in BESPOKE_ASSETS]
        for fut in as_completed(futs):
            print(" ->", fut.result())


if __name__ == "__main__":
    main()
