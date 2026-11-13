#!/usr/bin/env python3
"""
THEBESTBRAND — MOTOR DE REELS VERTICALES 9:16 (720x1280 · 30 FPS)
CON AVATARES EN MOVIMIENTO REAL (HEYGEN) + B-ROLLS DE VIDEO REALES (GOOGLE FLOW)
+ PIP CARDS EDITORIALES FLOTANTES + GUIONES ORIGINALES DE CÁPSULAS (PASOS 0 AL 6).

Cumple con la Regla 5 del Brandbook V5.1:
- Tomas de Avatar en video real: Avatar oficial `Jorge Improbears` en movimiento real
  (`consulting-presentacion.mp4` con camisa blanca + blazer gris claro, y
  `consulting-intro-general.mp4` recorte superior limpio) y Avatar Mentora Aura con
  Orbe 3D Torus Cuántico en vivo.
- B-Rolls en video real de Google Flow (`studio-reel.mp4`, `productividad-reel.mp4`,
  `ai-agent-demo.mp4`, `studio-colegio-demo.mp4`, `hero-improbears.mp4`) combinados con
  tarjetas PiP flotantes de Google Flow (Círculo Dorado, Touchpoints, Naming SMILE,
  7 Ejes Kansei, Vector Bézier .AI y Manual de 36 Láminas).
- Conserva 100% los guiones originales de `capsules_manifest.json` (Pasos 0 al 6).
"""

import json
import math
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

WORKSPACE_ROOT = Path("/home/antigravity/ImprobearsIA/thebestbrand")
IMPROBEARS_WEB = Path("/home/antigravity/ImprobearsIA/ImproBears-Web/public/assets")
VIDEOS_OUT_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
PHOTOS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "editorial_photos"
ARTIFACTS_DIR = Path("/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a")
FONTS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "fonts"
TMP_DIR = Path("/tmp/tbb_heygen_google_flow_build")

VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
TMP_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = str(FONTS_DIR / "Montserrat-Black.ttf")
FONT_SEMI = str(FONTS_DIR / "PlusJakartaSans-Bold.ttf")
FONT_REG = str(FONTS_DIR / "PlusJakartaSans-Regular.ttf")

# =============================================================================
# 1. FUENTES DE VIDEO REALES (HEYGEN AVATARES + GOOGLE FLOW B-ROLLS)
# =============================================================================
V_HEYGEN_JORGE_BLAZER = IMPROBEARS_WEB / "videos" / "consulting-presentacion.mp4"   # 1280x720, 46.9s (Camisa blanca + blazer gris claro Regla 5)
V_HEYGEN_JORGE_OFFICE = IMPROBEARS_WEB / "videos" / "consulting-intro-general.mp4"  # 1280x2276, 60.4s (Recorte superior limpio sin subtítulos viejos)
V_FLOW_STUDIO_REEL = IMPROBEARS_WEB / "videos" / "studio-reel.mp4"                  # 1920x1080, 34.0s (Google Flow arquitectura y estilo de vida)
V_FLOW_AI_AGENT = IMPROBEARS_WEB / "videos" / "ai-agent-demo.mp4"                   # 1104x816, 6.0s (Google Flow sala de juntas ejecutiva)
V_FLOW_PRODUCTIVIDAD = IMPROBEARS_WEB / "videos" / "productividad-reel.mp4"         # 1280x720, 10.0s (Google Flow tecnología y sistemas)
V_FLOW_DRONE_CAMPUS = IMPROBEARS_WEB / "videos" / "studio-colegio-demo.mp4"         # 1920x1080, 25.3s (Google Flow dron y recorrido espacial)
V_FLOW_HERO_IB = IMPROBEARS_WEB / "videos" / "hero-improbears.mp4"                  # 1280x720, 38.3s (Google Flow sistemas corporativos)
V_FLOW_TBB_CAMPAIGN = IMPROBEARS_WEB / "videos" / "campaigns" / "reel-thebestbrand-flow-final.mp4"  # 1080x1920, 28s

# Fotografías y capturas reales de la app para las tarjetas PiP flotantes estilo Google Flow
PIP_CARDS_BY_STEP = {
    0: [
        (ARTIFACTS_DIR / "ib_sim_01_step0_1_objetivo.png", "GOOGLE FLOW · PASO 0.1 OBJETIVO"),
        (ARTIFACTS_DIR / "ib_sim_02_step0_2_nombre_y_logo_conservado.png", "CAPITAL VISUAL · LOGO BASE"),
        (ARTIFACTS_DIR / "ib_sim_03_step0_3_giro_y_4_submarcas.png", "ESENCIA DEL GIRO Y SUBMARCAS"),
        (PHOTOS_DIR / "improbears_01_persona.jpg", "SINCRONIZACIÓN CLOUD 24/7")
    ],
    1: [
        (ARTIFACTS_DIR / "ib_sim_04_step1_1_proposito.png", "SIMON SINEK · EL PORQUÉ"),
        (ARTIFACTS_DIR / "ib_sim_21_step6_1_lamina_04_circulo_dorado.png", "CÍRCULO DORADO 100% CIRCULAR"),
        (ARTIFACTS_DIR / "ib_sim_07_step1_4_metodo_3_pasos.png", "STORYBRAND · MÉTODO EN 3 PASOS"),
        (PHOTOS_DIR / "tbb_02_buyer.jpg", "IMPACTO EN TU CLIENTE IDEAL")
    ],
    2: [
        (ARTIFACTS_DIR / "ib_sim_11_step2_1_touchpoints_antes.png", "FASE 1 · TOUCHPOINTS ANTES"),
        (PHOTOS_DIR / "improbears_03_tp_before.jpg", "DESCUBRIMIENTO Y CONFIANZA"),
        (PHOTOS_DIR / "improbears_04_tp_during.jpg", "FASE 2 · EJECUCIÓN DURANTE"),
        (PHOTOS_DIR / "improbears_05_tp_after.jpg", "FASE 3 · LEALTAD DESPUÉS")
    ],
    3: [
        (ARTIFACTS_DIR / "tbb_sim_17_step3_1_raices_naming.png", "WALLY OLINS · RAÍCES DE NAMING"),
        (ARTIFACTS_DIR / "tbb_sim_18_step3_2_seleccion_nombre.png", "MÉTODO SMILE & FONÉTICA"),
        (ARTIFACTS_DIR / "ib_sim_14_step3_3_naming_improbears_y_clases_niza.png", "BLINDAJE EN CLASES DE NIZA"),
        (ARTIFACTS_DIR / "Isotipo_Oficial_TheBestBrand_LiquidGlass_1024px.png", "MONOGRAMA E ISOTIPO 1:1")
    ],
    4: [
        (ARTIFACTS_DIR / "tbb_sim_21_step4_1_kansei_1.png", "INGENIERÍA KANSEI · 7 EJES"),
        (ARTIFACTS_DIR / "step4_1_desktop_sliders.png", "CALIBRADOR SEMÁNTICO OSGOOD"),
        (ARTIFACTS_DIR / "ib_sim_15_step4_4_tipografia_oficial_improbears.png", "VOZ TIPOGRÁFICA HÍBRIDA"),
        (ARTIFACTS_DIR / "ib_sim_16_step4_5_arquitectura_5_logos_conservados.png", "ESTRUCTURA CONSTRUCTIVA")
    ],
    5: [
        (ARTIFACTS_DIR / "ib_sim_17_step5_1_paleta_oficial_improbears.png", "PAUL RAND & JOSEF ALBERS"),
        (ARTIFACTS_DIR / "ib_sim_18_step5_2_marca_madre_y_4_submarcas_cargadas.png", "SAGI HAVIV · EVOLUCIÓN VECTORIAL"),
        (ARTIFACTS_DIR / "tbb_sim_33_iter_06_final_apple_liquid_glass_claro.png", "ATELIER DE LOGOTIPO EN CURVAS"),
        (ARTIFACTS_DIR / "tbb_sim_48_showcase_suite_logos_descargados.png", "SUITE .SVG + .AI + .PNG 1:1")
    ],
    6: [
        (ARTIFACTS_DIR / "ib_lamina_01_portada_zoom.png", "MASSIMO VIGNELLI · PORTADA C-00"),
        (ARTIFACTS_DIR / "ib_lamina_02_indice_zoom.png", "36 LÁMINAS EN CURVAS ABIERTAS"),
        (ARTIFACTS_DIR / "ib_lamina_30_4_submarcas_zoom.png", "ARQUITECTURA Y MOCKUPS REALES"),
        (ARTIFACTS_DIR / "ib_sim_27_step6_2_boveda_entregables.png", "BÓVEDA: PDF, .AI, WORD Y PPTX")
    ]
}

# Secuencia de fuentes de video en movimiento por paso (Alternando Avatar HeyGen -> B-Roll Google Flow -> Avatar HeyGen -> B-Roll Google Flow)
STEP_VIDEO_SOURCES = {
    0: [
        ("heygen_blazer", V_HEYGEN_JORGE_BLAZER, 2.0, "HEYGEN AVATAR · JORGE IMPROBEARS", "Peter Drucker · Definir el punto de partida"),
        ("flow_wide", V_FLOW_STUDIO_REEL, 6.0, "GOOGLE FLOW B-ROLL · CAPITAL VISUAL", "David Aaker & Sagi Haviv · Logo Base"),
        ("heygen_office", V_HEYGEN_JORGE_OFFICE, 4.0, "HEYGEN AVATAR · MENTORÍA EN VIVO", "Al Ries & Jack Trout · Giro del Negocio"),
        ("flow_wide", V_FLOW_PRODUCTIVIDAD, 0.5, "GOOGLE FLOW B-ROLL · ECOSISTEMA 24/7", "Sincronización en todos tus dispositivos")
    ],
    1: [
        ("heygen_blazer", V_HEYGEN_JORGE_BLAZER, 10.0, "HEYGEN AVATAR · PROPÓSITO NUCLEAR", "Simon Sinek · El Círculo Dorado"),
        ("flow_wide", V_FLOW_AI_AGENT, 0.0, "GOOGLE FLOW B-ROLL · COMITÉ DIRECTIVO", "Empezar por el Porqué antes del Qué"),
        ("heygen_office", V_HEYGEN_JORGE_OFFICE, 14.0, "HEYGEN AVATAR · OFERTA DE VALOR", "Alex Osterwalder & Donald Miller"),
        ("flow_wide", V_FLOW_STUDIO_REEL, 12.0, "GOOGLE FLOW B-ROLL · IMPACTO REAL", "Claridad que elimina toda fricción")
    ],
    2: [
        ("heygen_blazer", V_HEYGEN_JORGE_BLAZER, 18.0, "HEYGEN AVATAR · MOMENTOS DE VERDAD", "Jan Carlzon · 15 segundos decisivos"),
        ("flow_wide", V_FLOW_DRONE_CAMPUS, 2.0, "GOOGLE FLOW B-ROLL · FASE 1: ANTES", "Descubrimiento y primera impresión"),
        ("heygen_office", V_HEYGEN_JORGE_OFFICE, 24.0, "HEYGEN AVATAR · SERVICIO SIN FRICCIÓN", "Don Norman · Psicología de Touchpoints"),
        ("flow_wide", V_FLOW_STUDIO_REEL, 19.0, "GOOGLE FLOW B-ROLL · FASE 3: DESPUÉS", "Entrega, garantía y lealtad")
    ],
    3: [
        ("heygen_blazer", V_HEYGEN_JORGE_BLAZER, 26.0, "HEYGEN AVATAR · IDENTIDAD VERBAL", "Wally Olins · El poder del nombre"),
        ("flow_wide", V_FLOW_PRODUCTIVIDAD, 2.0, "GOOGLE FLOW B-ROLL · MÉTODO SMILE", "Alexandra Watkins & David Placek"),
        ("heygen_office", V_HEYGEN_JORGE_OFFICE, 34.0, "HEYGEN AVATAR · BLINDAJE LEGAL", "Alina Wheeler · Clases Internacionales Niza"),
        ("flow_wide", V_FLOW_DRONE_CAMPUS, 12.0, "GOOGLE FLOW B-ROLL · PRESENCIA 1:1", "Monograma en digital y arquitectura")
    ],
    4: [
        ("heygen_blazer", V_HEYGEN_JORGE_BLAZER, 5.0, "HEYGEN AVATAR · INGENIERÍA KANSEI", "Mitsuo Nagamachi · Geometría emocional"),
        ("flow_wide", V_FLOW_STUDIO_REEL, 24.0, "GOOGLE FLOW B-ROLL · 7 EJES OSGOOD", "Curvas de cercanía vs. precisión técnica"),
        ("heygen_office", V_HEYGEN_JORGE_OFFICE, 42.0, "HEYGEN AVATAR · VOZ TIPOGRÁFICA", "Robert Bringhurst & Adrian Frutiger"),
        ("flow_wide", V_FLOW_HERO_IB, 12.0, "GOOGLE FLOW B-ROLL · KIT DE FUENTES", "Tipografía híbrida lista para descarga")
    ],
    5: [
        ("heygen_blazer", V_HEYGEN_JORGE_BLAZER, 14.0, "HEYGEN AVATAR · TALLER DE LOGOTIPO", "Paul Rand & Josef Albers · Color original"),
        ("flow_wide", V_FLOW_STUDIO_REEL, 8.0, "GOOGLE FLOW B-ROLL · GEMINI VISION", "Sagi Haviv · Conservar o evolucionar base"),
        ("heygen_office", V_HEYGEN_JORGE_OFFICE, 19.0, "HEYGEN AVATAR · ITERACIÓN ABIERTA", "Max Wertheimer & Dieter Rams"),
        ("flow_wide", V_FLOW_PRODUCTIVIDAD, 1.0, "GOOGLE FLOW B-ROLL · LIQUID GLASS", "Jony Ive · Símbolo y vectores en curvas .AI")
    ],
    6: [
        ("heygen_blazer", V_HEYGEN_JORGE_BLAZER, 32.0, "HEYGEN AVATAR · CONSTITUCIÓN C-00", "Massimo Vignelli · 36 Láminas en Curvas"),
        ("flow_wide", V_FLOW_DRONE_CAMPUS, 6.0, "GOOGLE FLOW B-ROLL · FLUJO EDITORIAL", "Josef Müller-Brockmann · Lienzo Claro"),
        ("heygen_office", V_HEYGEN_JORGE_OFFICE, 48.0, "HEYGEN AVATAR · SUITE EJECUTIVA", "Danne & Blackburn · De la idea a imprenta"),
        ("flow_wide", V_FLOW_STUDIO_REEL, 15.0, "GOOGLE FLOW B-ROLL · MARCA EN ACCIÓN", "PDF, Vectores .SVG/.AI, Word, PPTX y Fuentes")
    ]
}


def draw_aura_orb_badge(size: int = 116) -> Image.Image:
    """Dibuja el Orbe 3D de Aura con los colores oficiales (#1D4ED8, #E04700, #EA7300) para el HUD superior."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2
    max_r = size // 2 - 4

    # Esfera base oscura #04060B
    draw.ellipse([cx - max_r, cy - max_r, cx + max_r, cy + max_r], fill=(8, 13, 26, 245), outline=(29, 78, 216, 255), width=3)

    # 12 Pétalos del Torus Cuántico 3D (#1D4ED8 y #EA7300)
    rings = 12
    for i in range(rings):
        u = (i / rings) * math.pi * 2 + 0.35
        pts = []
        for j in range(25):
            v = (j / 24.0) * math.pi * 2
            R = max_r * 0.50
            rt = max_r * 0.22
            sx = cx + (R + rt * math.cos(v)) * math.cos(u)
            sy = cy + (R + rt * math.cos(v)) * math.sin(u) * 0.74 + rt * math.sin(v) * 0.48
            pts.append((sx, sy))
        col = (29, 78, 216, 210) if i % 2 == 0 else (234, 115, 0, 210)
        draw.line(pts, fill=col, width=2)

    # Núcleo cálido #E04700 + centro blanco
    r_glow = int(max_r * 0.28)
    draw.ellipse([cx - r_glow, cy - r_glow, cx + r_glow, cy + r_glow], fill=(224, 71, 0, 220))
    r_core = int(max_r * 0.13)
    draw.ellipse([cx - r_core, cy - r_core, cx + r_core, cy + r_core], fill=(255, 255, 255, 255))
    return img


def build_transparent_hud_overlay(
    step_num: int,
    shot_idx: int,
    shot_badge: str,
    headline: str,
    sub_label: str,
    body_text: str,
    pip_img_path: Path,
    pip_caption: str,
    out_png: Path
):
    """
    Construye un overlay RGBA 720x1280 transparente estilo Google Flow + HeyGen:
    - Parte superior: Badge de motor (`HEYGEN AVATAR` o `GOOGLE FLOW B-ROLL`), Paso X · Toma Y/4 y Orbe 3D de Aura.
    - Centro-derecha / flotante: Tarjeta Picture-in-Picture (PiP) con vista en vivo de la lámina/herramienta.
    - Parte inferior: Lower-third cinemático con la cita de autor, titular del guion, subtítulo dinámico y barra de 4 escenas.
    """
    W, H = 720, 1280
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # 1. Gradiente superior para lectura nítida del header
    for y in range(0, 185):
        alpha = int(185 * (1.0 - y / 185.0))
        draw.line([(0, y), (W, y)], fill=(5, 8, 17, alpha))

    # 2. Gradiente inferior para lower-third + tarjeta PiP
    for y in range(H - 470, H):
        prog = (y - (H - 470)) / 470.0
        alpha = int(238 * (prog ** 1.12))
        draw.line([(0, y), (W, y)], fill=(5, 8, 17, alpha))

    try:
        f_top_badge = ImageFont.truetype(FONT_BOLD, 14)
        f_kicker = ImageFont.truetype(FONT_BOLD, 15)
        f_title = ImageFont.truetype(FONT_BOLD, 27)
        f_sub = ImageFont.truetype(FONT_SEMI, 18)
        f_body = ImageFont.truetype(FONT_REG, 16)
        f_pip = ImageFont.truetype(FONT_BOLD, 12)
    except Exception:
        f_top_badge = f_kicker = f_title = f_sub = f_body = f_pip = ImageFont.load_default()

    # 3. Píldoras superiores (THEBESTBRAND · HEYGEN + GOOGLE FLOW)
    draw.rounded_rectangle([26, 26, 405, 66], radius=20, fill=(13, 37, 64, 235), outline=(29, 78, 216, 255), width=2)
    draw.ellipse([42, 40, 54, 52], fill=(224, 71, 0, 255))
    draw.text((64, 38), f"PASO 0{step_num} · TOMA {shot_idx + 1}/4 · HEYGEN + FLOW", font=f_top_badge, fill=(255, 255, 255, 255))

    # Orbe de Aura en la esquina superior derecha
    orb_img = draw_aura_orb_badge(86)
    overlay.alpha_composite(orb_img, (W - 112, 18))

    # 4. Tarjeta Picture-in-Picture (PiP) estilo Google Flow (esquina inferior derecha sobre el lower-third)
    if pip_img_path and pip_img_path.exists():
        try:
            pip_w, pip_h = 276, 172
            pip_x = W - pip_w - 26
            pip_y = H - 486

            # Sombra y marco de la tarjeta PiP
            draw.rounded_rectangle(
                [pip_x - 4, pip_y - 4, pip_x + pip_w + 4, pip_y + pip_h + 32],
                radius=16,
                fill=(9, 13, 22, 245),
                outline=(234, 115, 0, 255) if shot_idx % 2 == 1 else (29, 78, 216, 255),
                width=3
            )

            raw_pip = Image.open(pip_img_path).convert("RGB")
            rw, rh = raw_pip.size
            target_r = pip_w / pip_h
            src_r = rw / rh
            if src_r > target_r:
                nw = int(rh * target_r)
                left = (rw - nw) // 2
                crop_pip = raw_pip.crop((left, 0, left + nw, rh))
            else:
                nh = int(rw / target_r)
                top = (rh - nh) // 2
                crop_pip = raw_pip.crop((0, top, rw, top + nh))
            resized_pip = crop_pip.resize((pip_w, pip_h), Image.Resampling.LANCZOS).convert("RGBA")
            overlay.alpha_composite(resized_pip, (pip_x, pip_y))

            # Etiqueta inferior de la tarjeta PiP
            caption_bg = (224, 71, 0, 255) if shot_idx % 2 == 1 else (29, 78, 216, 255)
            draw.rounded_rectangle(
                [pip_x, pip_y + pip_h, pip_x + pip_w, pip_y + pip_h + 28],
                radius=8,
                fill=caption_bg
            )
            draw.text((pip_x + 12, pip_y + pip_h + 7), pip_caption[:32], font=f_pip, fill=(255, 255, 255, 255))
        except Exception as e:
            print("Warning PiP:", e)

    # 5. Badge de tipo de toma (HEYGEN AVATAR vs GOOGLE FLOW B-ROLL)
    is_broll = "B-ROLL" in shot_badge
    pill_bg = (224, 71, 0, 245) if is_broll else (29, 78, 216, 245)
    draw.rounded_rectangle([26, H - 292, 412, H - 254], radius=19, fill=pill_bg)
    draw.text((44, H - 281), shot_badge[:36], font=f_kicker, fill=(255, 255, 255, 255))

    # Barra vertical de acento (#EA7300)
    draw.rounded_rectangle([26, H - 238, 34, H - 56], radius=4, fill=(234, 115, 0, 255))

    # 6. Titular principal (máximo 2 líneas)
    words = headline.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if len(test) <= 32:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    lines = lines[:2]

    y_text = H - 238
    for ln in lines:
        draw.text((48, y_text), ln, font=f_title, fill=(255, 255, 255, 255))
        y_text += 34

    # 7. Subtítulo de autor / referencia
    draw.text((48, y_text + 4), sub_label[:52], font=f_sub, fill=(147, 197, 253, 255))

    # 8. Resumen breve del guion (1 línea de contexto)
    short_body = (body_text or "").strip()
    if len(short_body) > 66:
        short_body = short_body[:63].rsplit(" ", 1)[0] + "..."
    draw.text((48, y_text + 30), short_body, font=f_body, fill=(226, 232, 240, 235))

    # 9. Barra de progreso de los 4 clips en la base
    seg_w = (W - 52 - 24) // 4
    for i in range(4):
        sx = 26 + i * (seg_w + 8)
        col = (234, 115, 0, 255) if i <= shot_idx else (255, 255, 255, 70)
        draw.rounded_rectangle([sx, H - 34, sx + seg_w, H - 25], radius=4, fill=col)

    overlay.save(out_png, "PNG")


def synthesize_human_voice_m4a(narration_text: str, clip_id: str) -> Path:
    """Genera o reutiliza la narración exacta del guion en español de México (24kHz AAC)."""
    # Reutilizar si ya existe en /tmp/tbb_vertical_videos_build para velocidad instantánea
    legacy_m4a = Path("/tmp/tbb_vertical_videos_build") / f"{clip_id}.m4a"
    out_m4a = TMP_DIR / f"{clip_id}.m4a"
    if out_m4a.exists() and out_m4a.stat().st_size > 1000:
        return out_m4a
    if legacy_m4a.exists() and legacy_m4a.stat().st_size > 1000:
        out_m4a.write_bytes(legacy_m4a.read_bytes())
        return out_m4a

    raw_mp3 = TMP_DIR / f"{clip_id}_raw.mp3"
    tts = gTTS(text=narration_text, lang="es", tld="com.mx", slow=False)
    tts.save(str(raw_mp3))

    cmd = [
        "ffmpeg", "-y",
        "-i", str(raw_mp3),
        "-filter:a", "atempo=1.08",
        "-ar", "24000", "-ac", "1",
        "-c:a", "aac", "-b:a", "128k",
        str(out_m4a)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out_m4a


def get_duration(media_path: Path) -> float:
    import re
    res = subprocess.run(["ffmpeg", "-i", str(media_path)], capture_output=True, text=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", res.stderr)
    if m:
        h, mi, s = m.groups()
        return int(h) * 3600 + int(mi) * 60 + float(s)
    return 8.0


def build_dynamic_heygen_flow_clip(
    mode: str,
    video_src: Path,
    start_sec: float,
    overlay_png: Path,
    audio_m4a: Path,
    out_mp4: Path,
    poster_jpg: Path = None
):
    """
    Compone un clip de video vertical 720x1280 a 30fps reales usando video en movimiento
    (Avatar HeyGen o B-Roll Google Flow) + Overlay HUD + PiP Card + Narración del guion.
    """
    dur = get_duration(audio_m4a)

    if mode == "heygen_office":
        # consulting-intro-general.mp4 es 1280x2276; recortamos los 1780px superiores para mostrar al avatar
        # sin los subtítulos incrustados antiguos en la base, y escalamos a 720x1280.
        v_filter = (
            "[0:v]fps=30,crop=1000:1778:140:0,scale=720:1280,setsar=1[bg];"
            "[bg][1:v]overlay=0:0:format=auto[outv]"
        )
    else:
        # Video horizontal 16:9 (1280x720 o 1920x1080) -> escalado a altura 1280 y recorte central 720x1280
        v_filter = (
            "[0:v]fps=30,scale=-1:1280,crop=720:1280:(iw-720)/2:0,setsar=1[bg];"
            "[bg][1:v]overlay=0:0:format=auto[outv]"
        )

    cmd = [
        "ffmpeg", "-y",
        "-stream_loop", "-1",
        "-ss", f"{start_sec:.2f}",
        "-i", str(video_src),
        "-i", str(overlay_png),
        "-i", str(audio_m4a),
        "-filter_complex", v_filter,
        "-map", "[outv]",
        "-map", "2:a",
        "-t", f"{dur:.2f}",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-shortest",
        str(out_mp4)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    if poster_jpg is not None:
        subprocess.run([
            "ffmpeg", "-y",
            "-i", str(out_mp4),
            "-ss", "00:00:01.00",
            "-frames:v", "1",
            "-q:v", "3",
            str(poster_jpg)
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    manifest_path = VIDEOS_OUT_DIR / "capsules_manifest.json"
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    updated = []
    first_clips = []

    for item in manifest:
        step = item["step"]
        sources = STEP_VIDEO_SOURCES.get(step, STEP_VIDEO_SOURCES[0])
        pips = PIP_CARDS_BY_STEP.get(step, PIP_CARDS_BY_STEP[0])
        clip_paths = []
        print(f"=== Generando Reel 9:16 HeyGen + Google Flow · Paso {step}: {item['title']} ===")

        for s_idx, scene in enumerate(item["scenes"]):
            clip_id = f"v916_step_{step}_clip_{s_idx}"
            mode, v_src, start_sec, shot_badge, sub_label = sources[s_idx % len(sources)]
            pip_path, pip_caption = pips[s_idx % len(pips)]

            overlay_png = TMP_DIR / f"{clip_id}_overlay.png"
            build_transparent_hud_overlay(
                step_num=step,
                shot_idx=s_idx,
                shot_badge=shot_badge,
                headline=scene["headline"],
                sub_label=sub_label,
                body_text=scene.get("body_text", ""),
                pip_img_path=pip_path,
                pip_caption=pip_caption,
                out_png=overlay_png
            )

            audio_m4a = synthesize_human_voice_m4a(scene["narration"], clip_id)
            clip_mp4 = TMP_DIR / f"{clip_id}_heygen_flow.mp4"
            poster_path = (VIDEOS_OUT_DIR / f"poster_paso_{step}.jpg") if s_idx == 0 else None

            build_dynamic_heygen_flow_clip(
                mode=mode,
                video_src=v_src,
                start_sec=start_sec,
                overlay_png=overlay_png,
                audio_m4a=audio_m4a,
                out_mp4=clip_mp4,
                poster_jpg=poster_path
            )
            clip_paths.append(clip_mp4)
            if s_idx == 0:
                first_clips.append(clip_mp4)

        concat_txt = TMP_DIR / f"concat_step_{step}.txt"
        with open(concat_txt, "w") as cf:
            for cp in clip_paths:
                cf.write(f"file '{cp.resolve()}'\n")

        out_step_mp4 = VIDEOS_OUT_DIR / f"capsula_teoria_paso_{step}.mp4"
        subprocess.run([
            "ffmpeg", "-y", "-f", "concat", "-safe", "0",
            "-i", str(concat_txt), "-c", "copy", "-movflags", "+faststart",
            str(out_step_mp4)
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        dur = round(get_duration(out_step_mp4), 1)
        sz_kb = round(out_step_mp4.stat().st_size / 1024, 1)
        print(f"  ✓ {out_step_mp4.name} listo ({dur}s, {sz_kb} KB, 720x1280 30fps HeyGen + Google Flow)")

        item_copy = dict(item)
        item_copy["duration_sec"] = dur
        item_copy["size_kb"] = sz_kb
        item_copy["aspect_ratio"] = "9:16"
        item_copy["production_engine"] = "Google Flow + HeyGen Avatars & Dynamic B-Rolls"
        updated.append(item_copy)

    # Master tour (Recorrido completo con Aura y Avatares)
    concat_master = TMP_DIR / "concat_master.txt"
    with open(concat_master, "w") as mf:
        for cp in first_clips:
            mf.write(f"file '{cp.resolve()}'\n")
    master_mp4 = VIDEOS_OUT_DIR / "capsula_teoria_aura_recorrido.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_master), "-c", "copy", "-movflags", "+faststart",
        str(master_mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(updated, f, indent=2, ensure_ascii=False)
    print("\n✓ Todos los 8 videos verticales 9:16 (Pasos 0 al 6 + Recorrido) con Avatares HeyGen y B-Rolls Google Flow generados.")


if __name__ == "__main__":
    main()
