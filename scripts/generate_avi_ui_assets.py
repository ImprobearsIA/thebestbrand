"""
Script de Generación de Activos Visuales Oficiales para la Interfaz de Usuario de LAB-AVI
(Fase de Definición del Logotipo — Algorithmic Visual Identity Closed-Loop System)
Utiliza la API de Google AI Studio (gemini-2.5-flash-image / gemini-3.1-flash-image)
en paralelo con ThreadPoolExecutor para crear el paquete de elementos visuales de alta resolución.
"""

import os
import json
import base64
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../apps/web/assets/avi"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

ASSETS_TO_GENERATE = [
    {
        "filename": "avi_hero_synthesis.png",
        "title": "De la Percepción Humana a la Síntesis Generativa",
        "prompt": (
            "Architectural technical blueprint illustration on warm cream drafting paper (#FAF8F5) with subtle millimeter grid. "
            "On the left side, an acoustic soundwave of human voice emotion transforming in the center into a 3D geodesic wireframe polyhedron, "
            "and emerging on the right as a precision geometric vector bird logo with Golden Ratio construction circles and 30/45/90 degree dimension lines in deep navy (#003366) and slate blue. "
            "Swiss International Typographic Style, Pentagram studio technical diagram, ultra crisp vector lines, no text."
        )
    },
    {
        "filename": "avi_phase1_pca_capture.png",
        "title": "Fase 1: Captura Semántica & Reducción PCA",
        "prompt": (
            "Minimalist scientific blueprint diagram on warm ivory paper (#FAF8F5) showing a 3D orthogonal coordinate system (PCA Principal Components PC1, PC2, PC3) "
            "with glowing geometric nodes and Gaussian bell curve semantic gradients in deep navy (#003366) and electric cyan (#0284C7). "
            "Clean Swiss technical illustration, architectural drafting style, flat vector precision, no text."
        )
    },
    {
        "filename": "avi_phase2_gabpnn_mapping.png",
        "title": "Fase 2: Mapeo No Lineal GA-BPNN & SVR",
        "prompt": (
            "Technical architectural diagram on cream grid paper (#FAF8F5) showing a multi-layer neural network (GA-BPNN) connecting geometric primitives "
            "(circle, hexagon, golden spiral, color swatch) on the left through interconnected synaptic nodes to a precision parametric logo blueprint on the right. "
            "Deep navy (#003366), emerald (#059669) and indigo (#4F46E5) technical ink lines, Swiss grid aesthetic, no text."
        )
    },
    {
        "filename": "avi_phase3_ip_adapter_synthesis.png",
        "title": "Fase 3: Síntesis Generativa (Atención Cruzada Desacoplada IP-Adapter)",
        "prompt": (
            "Clean technical diagram on ivory drafting paper (#FAF8F5) showing two converging streams into a central U-Net prism: "
            "top stream is semantic waves, bottom stream is 3D geometric wireframe solids (cube, pyramid, sphere), "
            "producing on the right a 3x3 grid of 9 ultra-clean minimalist isometric hexagonal corporate logo marks in navy, coral, teal, and gold. "
            "Pentagram studio quality, Swiss blueprint style, no text."
        )
    },
    {
        "filename": "avi_phase4_actr_bdi_simulation.png",
        "title": "Fase 4: Simulación Cognitiva ACT-R / BDI & Lazo Cerrado",
        "prompt": (
            "Architectural blueprint diagram on warm cream paper (#FAF8F5) showing a closed-loop circular cybernetic feedback system "
            "with 4 quadrants: optical eye perception module, cognitive neural network brain gear, probability bar chart, and geometric origami crane logo with angular callouts (30 deg, 45 deg). "
            "Deep navy (#003366) and warm amber (#D97706) drafting ink, ultra clean vector blueprint, no text."
        )
    },
    {
        "filename": "avi_origami_precision_blueprint.png",
        "title": "De la Intuición a la Precisión Algorítmica",
        "prompt": (
            "Split technical illustration on warm cream drafting grid paper (#FAF8F5): the left half of a majestic geometric origami crane is rendered in solid dark metallic navy facets (#0F172A), "
            "while the right half transitions seamlessly into a transparent architectural wireframe blueprint with Golden Ratio circles, tangent nodes, and 30-degree angular callouts. "
            "Museum-grade Swiss design studio illustration, no text."
        )
    }
]


def generate_single_asset(item: dict) -> dict:
    models_to_try = ["gemini-2.5-flash-image", "gemini-3.1-flash-image", "gemini-3-pro-image"]
    out_path = os.path.join(OUTPUT_DIR, item["filename"])

    for model in models_to_try:
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
            with urllib.request.urlopen(req, timeout=45) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
                for part in parts:
                    if "inlineData" in part and part["inlineData"].get("data"):
                        img_bytes = base64.b64decode(part["inlineData"]["data"])
                        with open(out_path, "wb") as f:
                            f.write(img_bytes)
                        return {
                            "filename": item["filename"],
                            "status": "SUCCESS",
                            "model": model,
                            "bytes": len(img_bytes),
                            "path": out_path
                        }
        except Exception as e:
            last_err = str(e)
            continue

    return {"filename": item["filename"], "status": "FAILED", "error": locals().get("last_err", "Unknown")}


def main():
    print(f"🚀 Iniciando generación paralela de {len(ASSETS_TO_GENERATE)} activos visuales en Google AI Studio...")
    results = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(generate_single_asset, item): item for item in ASSETS_TO_GENERATE}
        for future in as_completed(futures):
            res = future.result()
            print(f" -> {res['filename']}: {res['status']} ({res.get('bytes', 0)} bytes via {res.get('model', 'N/A')})")
            results.append(res)

    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"✅ Manifiesto guardado en {manifest_path}")


if __name__ == "__main__":
    main()
