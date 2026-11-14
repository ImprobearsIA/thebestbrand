#!/usr/bin/env python3
"""
THEBESTBRAND — GENERADOR DEL VIDEO HERO DE CONVERGENCIA TEÓRICA (1280x720 · 30 FPS · 14 SEGUNDOS)
Muestra gráficamente cómo los 6 pilares científicos del branding:
  1. Círculo Dorado (Simon Sinek)
  2. Momentos de la Verdad / Touchpoints (Jan Carlzon & Don Norman)
  3. Posicionamiento & Método SMILE (Al Ries, Jack Trout & Alexandra Watkins)
  4. Ingeniería Kansei & 7 Ejes (Mitsuo Nagamachi & Charles Osgood)
  5. Síntesis Vectorial & Liquid Glass (Paul Rand, Sagi Haviv & Jony Ive)
  6. Canon Editorial de 36 Láminas (Massimo Vignelli & Guía C-00)
orbitan, convergen y se funden en el núcleo cuántico para dar origen a la aplicación
THE BEST BRAND, su logotipo oficial Apple Liquid Glass y sus 9 Entregables Profesionales.
"""

import math
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

WORKSPACE_ROOT = Path("/home/antigravity/ImprobearsIA/thebestbrand")
VIDEOS_OUT_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
LOGOS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "logos"
CAPTURES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "app_captures"
PLATES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "brandbook_plates_tbb"
FONTS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "fonts"
TMP_DIR = Path("/tmp/tbb_hero_convergence_frames")

VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
TMP_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = str(FONTS_DIR / "Montserrat-Black.ttf")
FONT_SEMI = str(FONTS_DIR / "PlusJakartaSans-Bold.ttf")
FONT_REG = str(FONTS_DIR / "PlusJakartaSans-Regular.ttf")

THEORIES = [
    ("01 · CÍRCULO DORADO", "Simon Sinek · Propósito Nuclear", (29, 78, 216), "WHY → HOW → WHAT"),
    ("02 · TOUCHPOINTS", "Jan Carlzon & Don Norman", (2, 132, 199), "Antes · Durante · Después"),
    ("03 · NAMING & NIZA", "Ries, Trout & A. Watkins (SMILE)", (234, 88, 12), "Fonética & Blindaje Legal"),
    ("04 · INGENIERÍA KANSEI", "Mitsuo Nagamachi & Osgood", (13, 37, 64), "7 Ejes Emocionales"),
    ("05 · VECTOR & GLASS", "Paul Rand, Sagi Haviv & Jony Ive", (29, 78, 216), "Curvas Bézier .SVG / .AI"),
    ("06 · CANON 36 LÁMINAS", "Massimo Vignelli & Guía C-00", (234, 88, 12), "9 Entregables Oficiales"),
]


def ease_in_out_cubic(x: float) -> float:
    x = max(0.0, min(1.0, x))
    return 4 * x * x * x if x < 0.5 else 1 - pow(-2 * x + 2, 3) / 2


def main():
    W, H = 1280, 720
    FPS = 30
    DURATION = 12.0
    TOTAL_FRAMES = int(FPS * DURATION)

    try:
        f_kicker = ImageFont.truetype(FONT_BOLD, 13)
        f_title = ImageFont.truetype(FONT_BOLD, 28)
        f_sub = ImageFont.truetype(FONT_SEMI, 16)
        f_node_t = ImageFont.truetype(FONT_BOLD, 14)
        f_node_s = ImageFont.truetype(FONT_REG, 12)
        f_node_b = ImageFont.truetype(FONT_BOLD, 11)
        f_center_lg = ImageFont.truetype(FONT_BOLD, 34)
    except Exception:
        f_kicker = f_title = f_sub = f_node_t = f_node_s = f_node_b = f_center_lg = ImageFont.load_default()

    logo_path = LOGOS_DIR / "tbb_official_liquid_glass_logo.jpg"
    logo_img = Image.open(logo_path).convert("RGBA") if logo_path.exists() else None

    app_cap_path = CAPTURES_DIR / "step0_logo_aura.png"
    app_cap = Image.open(app_cap_path).convert("RGBA") if app_cap_path.exists() else None

    plate1_path = PLATES_DIR / "plate-01.jpg"
    plate1 = Image.open(plate1_path).convert("RGBA") if plate1_path.exists() else None

    cx, cy = W // 2, H // 2 + 18

    print(f"Generando {TOTAL_FRAMES} cuadros HD (1280x720) del Video Hero de Convergencia Teórica...")
    for fidx in range(TOTAL_FRAMES):
        t = fidx / FPS
        img = Image.new("RGBA", (W, H), (248, 250, 252, 255))
        draw = ImageDraw.Draw(img)

        # Retícula arquitectónica sutil sobre lienzo claro (#F8FAFC / #FFFFFF)
        for gx in range(0, W, 64):
            draw.line([(gx, 0), (gx, H)], fill=(226, 232, 240, 110), width=1)
        for gy in range(0, H, 64):
            draw.line([(0, gy), (W, gy)], fill=(226, 232, 240, 110), width=1)

        # Círculos concéntricos del Círculo Dorado en el centro
        for r_idx, rad in enumerate([270, 200, 130]):
            pulse = math.sin(t * 2.2 + r_idx) * 4
            col = (203, 213, 225, 160) if r_idx < 2 else (147, 197, 253, 210)
            draw.ellipse([cx - rad - pulse, cy - rad - pulse, cx + rad + pulse, cy + rad + pulse], outline=col, width=2)

        # Header superior limpio
        draw.rounded_rectangle([W // 2 - 270, 18, W // 2 + 270, 52], radius=17, fill=(255, 255, 255, 245), outline=(203, 213, 225, 255), width=1)
        draw.ellipse([W // 2 - 252, 29, W // 2 - 240, 41], fill=(234, 88, 12, 255))
        draw.text((W // 2 - 228, 28), "CONVERGENCIA DE LAS 6 TEORÍAS CIENTÍFICAS DE BRANDING", font=f_kicker, fill=(13, 37, 64, 255))

        # Fase 1 (0..4.5s): Los 6 nodos teóricos orbitan y envían haces de energía al centro
        # Fase 2 (4.5..7.5s): Los 6 nodos convergen y se funden en el núcleo dando origen al Logo Liquid Glass
        # Fase 3 (7.5..12.0s): El Logo despliega la aplicación real en vivo y los 9 Entregables
        conv_p = ease_in_out_cubic((t - 4.0) / 2.6) if t > 4.0 else 0.0
        reveal_p = ease_in_out_cubic((t - 6.4) / 1.8) if t > 6.4 else 0.0

        # Dibujar los 6 nodos teóricos
        if conv_p < 0.99:
            base_rx = 420 * (1.0 - conv_p * 0.88)
            base_ry = 225 * (1.0 - conv_p * 0.88)
            node_alpha = int(255 * (1.0 - max(0.0, (conv_p - 0.72) / 0.28)))

            for i, (t_code, t_author, t_rgb, t_pill) in enumerate(THEORIES):
                angle = (i / 6.0) * math.pi * 2 - math.pi / 2 + t * 0.32 + conv_p * 1.8
                nx = int(cx + math.cos(angle) * base_rx)
                ny = int(cy + math.sin(angle) * base_ry)

                # Haz conector hacia el núcleo
                draw.line([(nx, ny), (cx, cy)], fill=(t_rgb[0], t_rgb[1], t_rgb[2], int(140 * (1 - conv_p * 0.5))), width=3)

                # Partícula viajando hacia el núcleo
                beam_prog = ((t * 1.4 + i * 0.17) % 1.0)
                px = int(nx + (cx - nx) * beam_prog)
                py = int(ny + (cy - ny) * beam_prog)
                draw.ellipse([px - 5, py - 5, px + 5, py + 5], fill=(234, 88, 12, node_alpha))

                # Tarjeta del concepto teórico
                cw, ch = 228, 86
                x0, y0 = nx - cw // 2, ny - ch // 2
                draw.rounded_rectangle(
                    [x0, y0, x0 + cw, y0 + ch],
                    radius=16,
                    fill=(255, 255, 255, min(248, node_alpha)),
                    outline=(t_rgb[0], t_rgb[1], t_rgb[2], node_alpha),
                    width=2
                )
                draw.text((x0 + 14, y0 + 12), t_code, font=f_node_t, fill=(t_rgb[0], t_rgb[1], t_rgb[2], node_alpha))
                draw.text((x0 + 14, y0 + 34), t_author, font=f_node_s, fill=(51, 65, 85, node_alpha))
                draw.rounded_rectangle([x0 + 14, y0 + 56, x0 + cw - 14, y0 + 76], radius=8, fill=(241, 245, 249, node_alpha))
                draw.text((x0 + 22, y0 + 59), t_pill, font=f_node_b, fill=(15, 23, 42, node_alpha))

        # Núcleo central durante la convergencia
        core_r = int(68 + conv_p * 34 - reveal_p * 18)
        draw.ellipse(
            [cx - core_r - 10, cy - core_r - 10, cx + core_r + 10, cy + core_r + 10],
            fill=(29, 78, 216, int(45 + conv_p * 60))
        )

        # Fase 3: Despliegue de la Aplicación Real (Izquierda) + Manual de 36 Láminas (Derecha) + Logo Central
        if reveal_p > 0.01:
            alpha_rev = int(255 * reveal_p)
            slide_offset = int((1.0 - reveal_p) * 90)

            # Tarjeta izquierda: La Aplicación Real (Pasos 0 al 6 con Aura)
            if app_cap is not None:
                card_w, card_h = 400, 255
                lx = cx - 490 - slide_offset // 2
                ly = cy - card_h // 2 - 10
                draw.rounded_rectangle(
                    [lx - 6, ly - 34, lx + card_w + 6, ly + card_h + 6],
                    radius=18,
                    fill=(255, 255, 255, alpha_rev),
                    outline=(29, 78, 216, alpha_rev),
                    width=2
                )
                draw.text((lx + 12, ly - 24), "APLICACIÓN EN VIVO · 7 PASOS CON AURA", font=f_node_b, fill=(29, 78, 216, alpha_rev))
                cap_resized = app_cap.resize((card_w, card_h), Image.Resampling.LANCZOS)
                if alpha_rev < 255:
                    cap_resized.putalpha(alpha_rev)
                img.alpha_composite(cap_resized, (lx, ly))

            # Tarjeta derecha: Manual de 36 Láminas + 9 Entregables
            if plate1 is not None:
                card_w, card_h = 400, 255
                rx = cx + 90 + slide_offset // 2
                ry = cy - card_h // 2 - 10
                draw.rounded_rectangle(
                    [rx - 6, ry - 34, rx + card_w + 6, ry + card_h + 6],
                    radius=18,
                    fill=(255, 255, 255, alpha_rev),
                    outline=(234, 88, 12, alpha_rev),
                    width=2
                )
                draw.text((rx + 12, ry - 24), "BRANDBOOK DE 36 LÁMINAS + 9 ENTREGABLES", font=f_node_b, fill=(234, 88, 12, alpha_rev))
                pl_resized = plate1.resize((card_w, card_h), Image.Resampling.LANCZOS)
                if alpha_rev < 255:
                    pl_resized.putalpha(alpha_rev)
                img.alpha_composite(pl_resized, (rx, ry))

        # Símbolo oficial Apple Liquid Glass en el centro
        if logo_img is not None:
            logo_sz = int(116 + conv_p * 42)
            l_resized = logo_img.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
            # Máscara circular limpia
            mask = Image.new("L", (logo_sz, logo_sz), 0)
            ImageDraw.Draw(mask).ellipse([0, 0, logo_sz, logo_sz], fill=255)
            circ_logo = Image.new("RGBA", (logo_sz, logo_sz), (0, 0, 0, 0))
            circ_logo.paste(l_resized, (0, 0), mask)
            draw.ellipse(
                [cx - logo_sz // 2 - 5, cy - logo_sz // 2 - 5, cx + logo_sz // 2 + 5, cy + logo_sz // 2 + 5],
                fill=(255, 255, 255, 255),
                outline=(234, 88, 12, 255) if conv_p > 0.5 else (29, 78, 216, 255),
                width=4
            )
            img.alpha_composite(circ_logo, (cx - logo_sz // 2, cy - logo_sz // 2))

        # Banner inferior con la síntesis de convergencia
        draw.rounded_rectangle([80, H - 96, W - 80, H - 18], radius=20, fill=(255, 255, 255, 248), outline=(203, 213, 225, 255), width=2)
        if t < 4.5:
            stage_title = "1. FUNDAMENTO CIENTÍFICO: 6 TEORÍAS DE CLASE MUNDIAL"
            stage_desc = "Sinek (Círculo Dorado) + Carlzon (Touchpoints) + Watkins (SMILE) + Nagamachi (Kansei) + Rand/Ive + Vignelli"
        elif t < 7.5:
            stage_title = "2. FUSIÓN ALGORÍTMICA EN TIEMPO REAL"
            stage_desc = "Las teorías convergen en el motor socrático de Aura y sintetizan la identidad visual Apple Liquid Glass"
        else:
            stage_title = "3. THE BEST BRAND · TU MARCA Y TUS 9 ENTREGABLES EN 30 MINUTOS"
            stage_desc = "Manual de 36 Láminas (.PDF/.HTML) + Suite de Vectores (.SVG/.AI) + Word + PowerPoint + Firma + Fuentes"

        draw.text((112, H - 84), stage_title, font=f_title, fill=(15, 23, 42, 255))
        draw.text((112, H - 48), stage_desc, font=f_sub, fill=(71, 85, 105, 255))

        frame_file = TMP_DIR / f"frame_{fidx:04d}.jpg"
        img.convert("RGB").save(frame_file, "JPEG", quality=92)

    out_mp4 = VIDEOS_OUT_DIR / "hero_convergence_thebestbrand.mp4"
    poster_jpg = VIDEOS_OUT_DIR / "poster_hero_convergence.jpg"
    subprocess.run([
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", str(TMP_DIR / "frame_%04d.jpg"),
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "21",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(out_mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    subprocess.run([
        "ffmpeg", "-y",
        "-i", str(out_mp4),
        "-ss", "00:00:08.50",
        "-frames:v", "1",
        "-q:v", "2",
        str(poster_jpg)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print(f"✓ Video Hero de Convergencia generado: {out_mp4} ({round(out_mp4.stat().st_size / 1024, 1)} KB)")


if __name__ == "__main__":
    main()
