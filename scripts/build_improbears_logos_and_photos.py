#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Construye:
1. El logotipo corregido y homologado de ImproBears AI (logo-improbears-ai.png) respetando la idea
   del cliente (Grafo/Núcleo Neuronal de IA) pero con la misma masa sólida (#0D2540 + #FF7A00),
   escala bajo la flecha sin colisión y descriptor "AI" en Naranja Estratégico (#FF7A00) que
   Consulting, Ingredients y Studio.
2. Las 5 versiones oficiales en NEGATIVO REAL con fondo 100% transparente (CERO círculo blanco):
   - logo-improbears-master-negativo.png
   - logo-improbears-consulting-negativo.png
   - logo-improbears-ingredients-negativo.png
   - logo-improbears-studio-negativo.png
   - logo-improbears-ai-negativo.png
   - logo-improbears-master-mono-white.png (100% Blanco Monocromático para grabado/serigrafía)
3. Optimiza y copia las 7 fotografías humanas y de producto de `2 Marca` a `apps/web/assets/improbears/`.
"""

import os
import shutil
import subprocess
import numpy as np
from PIL import Image

ASSETS_DIR = "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/assets/improbears"
MARCA_DIR = "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/2 Marca"


def build_clean_subbrand_chassis() -> np.ndarray:
    """
    Obtiene el chasis 100% limpio de submarca (900x826) a partir de logo-improbears-studio.png:
    1. En studio.png, la flecha naranja (#FF7A00) está completamente separada de la cámara
       por un margen limpio: basta borrar la cámara (x: 488..745, y: 326..488 donde no es la flecha).
    2. El arco horizonte inferior (#0D2540) es 100% simétrico respecto a x = 441, y su mitad
       izquierda (x: 135..441, y: 468..545) está completamente libre en studio.png.
       Al reflejar la mitad izquierda del arco hacia la derecha (x: 441..747), obtenemos el arco
       horizonte #0D2540 continuo y perfecto de extremo a extremo.
    3. Limpiamos el subtítulo "STUDIO" (y: 626..720, x: 180..720).
    """
    st = np.array(Image.open(os.path.join(ASSETS_DIR, "logo-improbears-studio.png")).convert("RGBA"))
    base = st.copy()

    # 1. Limpiar subtítulo inferior "STUDIO" (y >= 626, x entre 180 y 720)
    base[626:730, 180:720] = [255, 255, 255, 0]

    # 2. Borrar el cuerpo de la cámara y su lente en el cuadrante derecho (y: 325..495, x: 488..745)
    # conservando intacta la flecha naranja que pasa por arriba/izquierda de la línea diagonal
    for y in range(325, 495):
        for x in range(488, 745):
            # La cámara está debajo de la recta que separa la flecha de la cámara:
            # En x=488 la flecha termina arriba de y=375; en x=560 la flecha termina arriba de y=320.
            # Cualquier píxel con x > 488 y debajo del borde inferior de la flecha pertenece a la cámara.
            in_lens = (535 <= x <= 632) and (360 <= y <= 458)
            r, g, b, a = st[y, x]
            is_arrow_orange = (a > 30) and (r > 180) and (b < 100) and not in_lens
            if not is_arrow_orange:
                base[y, x] = [255, 255, 255, 0]

    # 3. Reconstruir la mitad derecha del arco horizonte #0D2540 (x: 446..755, y: 466..544)
    # reflejando únicamente los píxeles #0D2540 de la mitad izquierda del arco (eje x = 446 -> x_left = 892 - x)
    base[466:544, 446:755] = [255, 255, 255, 0]
    for y in range(466, 544):
        for x in range(446, 755):
            x_left = 892 - x
            if 135 <= x_left <= 446:
                r, g, b, a = st[y, x_left]
                # Copiar ÚNICAMENTE los píxeles Azul Profundo #0D2540 del arco (no el oso #426EAE ni la flecha #FF7A00)
                is_dark_arc = (a > 20) and (r < 60) and (g < 85) and (b < 120)
                if is_dark_arc:
                    base[y, x] = st[y, x_left]

    return base


def render_ai_overlay_via_chrome(width=900, height=826) -> np.ndarray:
    """
    Renderiza en Chrome Headless un SVG transparente 900x826 con:
    1. El nuevo ícono de ImproBears AI en el cuadrante inferior derecho (bajo la flecha naranja y sobre el arco #0D2540):
       Un Grafo / Núcleo Cognitivo de IA con la misma masa visual sólida (#0D2540 + #FF7A00) que Consulting, Ingredients y Studio:
       - Nodo maestro central (#0D2540 radio 34 con anillo blanco de reserva y núcleo energético #FF7A00 radio 17)
       - 5 nodos periféricos sólidos conectados por enlaces gruesos (#0D2540 stroke 11px) siguiendo la diagonal ascendente bajo la flecha (sin tocarla jamás)
       - Puntos especulares blancos (como en Ingredients) que le dan el sello exacto de familia
    2. El subtítulo "AI" en Montserrat Bold/ExtraBold #FF7A00 (y: 633..685) alineado al centro de IMPROBEARS.
    """
    svg_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap" rel="stylesheet"/>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{
    width: {width}px;
    height: {height}px;
    background: transparent !important;
    overflow: hidden;
  }}
</style>
</head>
<body>
<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
  <!-- SÍMBOLO IMPROBEARS AI: GRAFO Y NÚCLEO COGNITIVO MULTI-AGENTE (HOMOLOGADO CON INGREDIENTS Y STUDIO) -->
  <g id="ai-subbrand-icon">
    <!-- Enlaces sinápticos gruesos en Azul Profundo #0D2540 -->
    <g stroke="#0D2540" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">
      <!-- Enlaces desde el núcleo central (608, 422) hacia los 5 nodos periféricos -->
      <line x1="608" y1="422" x2="502" y2="444" />
      <line x1="608" y1="422" x2="554" y2="378" />
      <line x1="608" y1="422" x2="646" y2="338" />
      <line x1="608" y1="422" x2="714" y2="376" />
      <line x1="608" y1="422" x2="704" y2="452" />
      <!-- Enlaces perimetrales de red neuronal (constelación cerrada de alta solidez) -->
      <line x1="502" y1="444" x2="554" y2="378" stroke-width="8.5" />
      <line x1="554" y1="378" x2="646" y2="338" stroke-width="8.5" />
      <line x1="646" y1="338" x2="714" y2="376" stroke-width="8.5" />
      <line x1="714" y1="376" x2="704" y2="452" stroke-width="8.5" />
    </g>

    <!-- Nodo 1 (Izquierda Base - Naranja Estratégico #FF7A00) -->
    <circle cx="502" cy="444" r="19" fill="#FF7A00" stroke="#FFFFFF" stroke-width="3.5" />
    <circle cx="496" cy="438" r="4" fill="#FFFFFF" />

    <!-- Nodo 2 (Medio Izquierda - Azul Profundo #0D2540) -->
    <circle cx="554" cy="378" r="18" fill="#0D2540" stroke="#FFFFFF" stroke-width="3.5" />
    <circle cx="549" cy="373" r="3.8" fill="#FFFFFF" />

    <!-- Nodo 3 (Cúspide Derecha bajo la punta de la flecha - Naranja Estratégico #FF7A00) -->
    <circle cx="646" cy="338" r="22" fill="#FF7A00" stroke="#FFFFFF" stroke-width="4" />
    <circle cx="639" cy="331" r="4.5" fill="#FFFFFF" />

    <!-- Nodo 4 (Extremo Derecho Superior - Azul Profundo #0D2540) -->
    <circle cx="714" cy="376" r="20" fill="#0D2540" stroke="#FFFFFF" stroke-width="3.5" />
    <circle cx="708" cy="370" r="4.2" fill="#FFFFFF" />

    <!-- Nodo 5 (Extremo Derecho Base - Naranja Estratégico #FF7A00) -->
    <circle cx="704" cy="452" r="18" fill="#FF7A00" stroke="#FFFFFF" stroke-width="3.5" />
    <circle cx="699" cy="447" r="3.8" fill="#FFFFFF" />

    <!-- NÚCLEO CENTRAL MAESTRO IA (#0D2540 + Anillo Blanco + Corazón #FF7A00) -->
    <circle cx="608" cy="422" r="35" fill="#0D2540" stroke="#FFFFFF" stroke-width="4.5" />
    <circle cx="608" cy="422" r="20" fill="#FFFFFF" />
    <circle cx="608" cy="422" r="15" fill="#FF7A00" />
    <circle cx="603" cy="417" r="3.8" fill="#FFFFFF" />
  </g>

  <!-- DESCRIPTOR DE SUBMARCA "AI" HOMOLOGADO EN NARANJA ESTRATÉGICO (#FF7A00) Y PROPORCIÓN EXTENDIDA -->
  <g transform="translate(452, 684) scale(1.24, 1)">
    <text x="0" y="0" text-anchor="middle" fill="#FF7A00" font-family="'Montserrat', sans-serif" font-weight="700" font-size="68" letter-spacing="8">AI</text>
  </g>
</svg>
</body>
</html>"""
    html_path = "/tmp/improbears_ai_overlay.html"
    png_path = "/tmp/improbears_ai_overlay.png"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(svg_html)

    chrome_bin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    subprocess.run([
        chrome_bin,
        "--headless",
        "--disable-gpu",
        "--default-background-color=00000000",
        f"--window-size={width},{height}",
        f"--screenshot={png_path}",
        f"file://{html_path}"
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    return np.array(Image.open(png_path).convert("RGBA"))


def alpha_composite_rgba(base: np.ndarray, overlay: np.ndarray) -> np.ndarray:
    b_img = Image.fromarray(base, "RGBA")
    o_img = Image.fromarray(overlay, "RGBA")
    return np.array(Image.alpha_composite(b_img, o_img))


def make_transparent_positive(arr: np.ndarray) -> np.ndarray:
    """
    Convierte el fondo blanco (incluyendo la silueta humana interior y el ojo del oso)
    en 100% transparente (alpha=0) manteniendo los bordes anti-aliased suaves,
    y preserva el blanco únicamente donde es un separador interno pequeño si aplica.
    De hecho, como en Page 10 de Logo completo Improbears.pdf la silueta humana y el ojo
    son calados transparentes, hacer transparente el blanco en todo el lienzo permite que
    tanto en positivo sobre blanco como en negativo sobre oscuro la silueta funcione a la perfección.
    """
    out = arr.copy().astype(np.float32)
    r, g, b, a = out[:, :, 0], out[:, :, 1], out[:, :, 2], out[:, :, 3]

    # Qué tan cerca está el píxel del blanco puro (255, 255, 255)
    # Los colores de ImproBears son:
    # - Azul Profundo #0D2540 (13, 37, 64) -> min channel ~13, max diff from 255 is 242
    # - Azul Primario #426EAE (66, 110, 174) -> min channel ~66, max diff from 255 is 189
    # - Naranja #FF7A00 (246, 121, 11) -> min channel ~11, max diff from 255 is 244
    # Por lo tanto, cualquier píxel de color tiene al menos un canal lejos de 255.
    max_dist_from_white = np.maximum(np.maximum(255.0 - r, 255.0 - g), 255.0 - b)
    # En blanco puro max_dist_from_white == 0. En cualquiera de los 3 colores oficiales >= 185.
    color_opacity = np.clip((max_dist_from_white - 8.0) / 165.0, 0.0, 1.0)
    new_alpha = (a / 255.0) * color_opacity

    # Descontaminar el halo blanco de los píxeles de borde (un-premultiply white matte)
    safe_alpha = np.maximum(color_opacity, 1e-4)
    r_clean = np.clip((r - 255.0 * (1.0 - color_opacity)) / safe_alpha, 0.0, 255.0)
    g_clean = np.clip((g - 255.0 * (1.0 - color_opacity)) / safe_alpha, 0.0, 255.0)
    b_clean = np.clip((b - 255.0 * (1.0 - color_opacity)) / safe_alpha, 0.0, 255.0)

    res = np.zeros_like(arr)
    res[:, :, 0] = np.round(r_clean).astype(np.uint8)
    res[:, :, 1] = np.round(g_clean).astype(np.uint8)
    res[:, :, 2] = np.round(b_clean).astype(np.uint8)
    res[:, :, 3] = np.round(new_alpha * 255.0).astype(np.uint8)
    return res


def convert_positive_to_true_negative(pos_arr: np.ndarray) -> np.ndarray:
    """
    Aplica la Regla Oficial de Uso en Negativo (Pág. 10 de `Logo completo Improbears.pdf`):
    - Fondo y silueta humana: 100% Transparentes (calados dejando ver el fondo oscuro #0D2540 o negro).
    - Elementos en Azul Profundo (#0D2540): Aro exterior, arco base, barras Consulting,
      esferas/enlaces oscuros Ingredients, cámara Studio, nodos/enlaces oscuros AI,
      ola base y subtítulo BUSINESS IMPROVEMENT -> pasan a BLANCO PURO (#FFFFFF).
    - Elementos en Azul Primario (#426EAE): Oso protector y wordmark IMPROBEARS ->
      se mantienen en Azul Institucional luminoso (#4C9DE6 / #4A7EC2) para máximo contraste sobre #0D2540.
    - Elementos en Naranja Estratégico (#FF7A00): Flecha ascendente, aro interior Master,
      nodos naranjas y descriptores de submarca (CONSULTING, INGREDIENTS, STUDIO, AI) ->
      se mantienen en Naranja Estratégico (#FF7A00).
    """
    clean = make_transparent_positive(pos_arr)
    out = clean.copy().astype(np.float32)
    r, g, b, a = out[:, :, 0], out[:, :, 1], out[:, :, 2], out[:, :, 3]

    mask = a > 5
    # Clasificar cada píxel visible por cercanía a los 3 colores oficiales:
    # 1. Naranja (#FF7A00 ~ [246, 121, 11]): R > G + 40 y R > B + 80
    is_orange = mask & (r > g + 35) & (r > b + 70)

    # 2. Azul Profundo (#0D2540 ~ [13, 37, 64]) vs Azul Primario (#426EAE ~ [55..66, 110..118, 174..180]):
    # En #0D2540, B < 118 y R < 45. En #426EAE, B >= 118.
    is_dark_navy = mask & (~is_orange) & (b < 118)
    is_brand_blue = mask & (~is_orange) & (b >= 118)

    # Invertir Azul Profundo (#0D2540) -> Blanco Puro (#FFFFFF)
    out[is_dark_navy, 0] = 255.0
    out[is_dark_navy, 1] = 255.0
    out[is_dark_navy, 2] = 255.0

    # Ajustar Azul Primario (#426EAE) a tono luminoso institucional (#548FD8) para contraste limpio sobre #0D2540
    out[is_brand_blue, 0] = 84.0
    out[is_brand_blue, 1] = 143.0
    out[is_brand_blue, 2] = 216.0

    # Asegurar Naranja Estratégico vibrante (#FF7A00)
    out[is_orange, 0] = 255.0
    out[is_orange, 1] = 122.0
    out[is_orange, 2] = 0.0

    return np.clip(np.round(out), 0, 255).astype(np.uint8)


def convert_positive_to_mono_white(pos_arr: np.ndarray) -> np.ndarray:
    """
    Versión Negativo Monocromático 100% Blanco (#FFFFFF) con silueta humana calada transparente.
    Ideal para grabado láser, bordado a 1 hilo blanco o marca de agua sobre fotografía.
    """
    clean = make_transparent_positive(pos_arr)
    out = clean.copy()
    mask = out[:, :, 3] > 5
    out[mask, 0] = 255
    out[mask, 1] = 255
    out[mask, 2] = 255
    return out


def main():
    print("1. Construyendo nuevo logo homologado ImproBears AI...")
    chassis = build_clean_subbrand_chassis()
    ai_overlay = render_ai_overlay_via_chrome(900, 826)
    new_ai_rgba = alpha_composite_rgba(chassis, ai_overlay)

    # Guardar versión con fondo blanco/transparente limpio en assets y en 2 Marca/AI
    ai_pos_path = os.path.join(ASSETS_DIR, "logo-improbears-ai.png")
    Image.fromarray(new_ai_rgba, "RGBA").save(ai_pos_path)
    marca_ai_path = os.path.join(MARCA_DIR, "AI", "Logo Improbears AI.png")
    if os.path.exists(os.path.dirname(marca_ai_path)):
        Image.fromarray(new_ai_rgba, "RGBA").save(marca_ai_path)
    print("   -> Guardado:", ai_pos_path)

    print("2. Generando las 5 versiones en NEGATIVO REAL (sin círculo blanco) + Monocromo Blanco...")
    logos_map = {
        "master": "logo-improbears-master.png",
        "consulting": "logo-improbears-consulting.png",
        "ingredients": "logo-improbears-ingredients.png",
        "studio": "logo-improbears-studio.png",
        "ai": "logo-improbears-ai.png",
    }
    for key, fname in logos_map.items():
        src_path = os.path.join(ASSETS_DIR, fname)
        arr = np.array(Image.open(src_path).convert("RGBA"))
        neg_arr = convert_positive_to_true_negative(arr)
        neg_fname = fname.replace(".png", "-negativo.png")
        neg_path = os.path.join(ASSETS_DIR, neg_fname)
        Image.fromarray(neg_arr, "RGBA").save(neg_path)
        print(f"   -> Guardado negativo real: {neg_fname}")

        if key == "master":
            # También guardar miniatura negativa para el footer de las 30 láminas
            thumb_neg = Image.fromarray(neg_arr, "RGBA").resize((160, 146), Image.Resampling.LANCZOS)
            thumb_neg.save(os.path.join(ASSETS_DIR, "logo-improbears-master-negativo-thumb.png"))
            # Y versión 100% blanca monocromática
            mono_w = convert_positive_to_mono_white(arr)
            Image.fromarray(mono_w, "RGBA").save(os.path.join(ASSETS_DIR, "logo-improbears-master-mono-white.png"))

    print("3. Optimizando y copiando fotografías humanas y de producto a assets/improbears/...")
    photo_sources = {
        "foto-jb-oso-hero.png": (os.path.join(MARCA_DIR, "General", "Mesa de trabajo 6@2x.png"), (650, 588), "PNG"),
        "foto-caos-a-claridad.jpg": (os.path.join(MARCA_DIR, "General", "Imagenes stock", "C328EF9D-80F4-41E1-A84F-A8B5974D35ED.jpeg"), (960, 640), "JPEG"),
        "foto-sala-juntas-liderazgo.jpg": (os.path.join(MARCA_DIR, "General", "Imagenes stock", "7C433BF3-5224-430D-BBD8-5ACC6B4ECF4E.jpeg"), (960, 640), "JPEG"),
        "foto-ejecutiva-ia-sistemas.jpg": (os.path.join(MARCA_DIR, "General", "Imagenes stock", "48893219-CA70-4FD0-8D32-BE2FD1F6F3F9.jpeg"), (960, 640), "JPEG"),
        "foto-hopzoil-ingredients.jpg": (os.path.join(MARCA_DIR, "Ingredients", "IMG_3032.jpeg"), (720, 720), "JPEG"),
        "foto-escritorio-consultoria.jpg": (os.path.join(MARCA_DIR, "General", "Imagenes stock", "escritorio.png"), (900, 600), "JPEG"),
    }
    for dst_name, (src_p, max_sz, fmt) in photo_sources.items():
        if not os.path.exists(src_p):
            print("   [WARN] No encontrado:", src_p)
            continue
        im = Image.open(src_p)
        im.thumbnail(max_sz, Image.Resampling.LANCZOS)
        dst_p = os.path.join(ASSETS_DIR, dst_name)
        if fmt == "JPEG":
            im.convert("RGB").save(dst_p, "JPEG", quality=84, optimize=True)
        else:
            im.convert("RGBA").save(dst_p, "PNG", optimize=True)
        print(f"   -> Foto lista: {dst_name} ({os.path.getsize(dst_p) // 1024} KB)")


if __name__ == "__main__":
    main()
