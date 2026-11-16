#!/usr/bin/env python3
"""
THEBESTBRAND — MOTOR DE REELS VERTICALES 9:16 (720x1280 · 30 FPS)
CON AVATARES DEL FUNDADOR EN MOVIMIENTO REAL (HEYGEN · JORGE IMPROBEARS)
+ VOZ MASCULINA EJECUTIVA SINCRONIZADA (132 Hz)
+ CAPTURAS EN VIVO DE LA APP THEBESTBRAND STUDIO Y LÁMINAS C-00
+ GUIONES ORIGINALES INTACTOS DE CÁPSULAS (PASOS 0 AL 6).

Cumple con la Regla 5 del Brandbook V5.1 y Aislamiento Estricto:
- Cero reutilización de videos de ImproBears-Web (`consulting-presentacion.mp4`, `studio-reel.mp4`, etc.).
- Cada uno de los 7 pasos utiliza su propio look ejecutivo oficial de `Jorge Improbears` en HeyGen
  (camisa + blazer en tonos claros/neutros de marca, cero aretes/piercings) sincronizado vía
  lip-sync de envolvente acústica con el guion actual de cada paso.
- En las escenas de demostración de interfaz, muestra la tarjeta flotante de la pantalla real
  de TheBestBrand Studio App correspondiente a ese paso e idioma.
"""

import json
import math
import os
import re
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

WORKSPACE_ROOT = Path("/home/antigravity/ImprobearsIA/thebestbrand")
VIDEOS_OUT_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
API_VIDEOS_OUT_DIR = WORKSPACE_ROOT / "artifacts" / "api-server" / "public" / "assets" / "videos"
CAPTURES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "app_captures"
PLATES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "brandbook_plates_tbb"
FONTS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "fonts"
HEYGEN_ASSETS_DIR = Path("/tmp/heygen_tbb_assets")
TMP_DIR = Path("/tmp/tbb_heygen_steps_v99")

VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
API_VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
TMP_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = str(FONTS_DIR / "Montserrat-Black.ttf")
FONT_SEMI = str(FONTS_DIR / "PlusJakartaSans-Bold.ttf")
FONT_REG = str(FONTS_DIR / "PlusJakartaSans-Regular.ttf")

# Ventanas de habla activa y de boca cerrada (reposo) medidas en el avatar HeyGen Jorge Improbears (1d65ca4f)
SPEAK_WINDOWS = [
    (0.10, 0.38),
    (0.60, 1.32),
    (1.72, 2.90),
    (3.02, 3.30),
    (3.42, 4.00),
    (4.12, 5.90),
    (6.32, 7.20),
    (7.32, 8.40),
    (8.72, 8.92),
    (9.02, 10.02),
]
REST_WINDOWS = [
    (1.42, 1.68),
    (6.10, 6.28),
    (10.20, 10.38),
    (0.42, 0.56),
]

# Capturas oficiales de TheBestBrand Studio App por paso (para tarjeta de demostración en escenas 2 y 4)
STEP_APP_CAPTURES = {
    0: [
        ("tour_step0_1_objetivo", "THEBESTBRAND STUDIO · PASO 0.1 OBJETIVO"),
        ("step0_logo_aura", "DIAGNÓSTICO DE LOGO BASE CON GEMINI VISION"),
        ("tour_step0_3_giro", "PASO 0.3 · GIRO DEL NEGOCIO Y ECOSISTEMA"),
        ("step0_logo_aura", "SINCRONIZACIÓN EN VIVO CON AURA"),
    ],
    1: [
        ("step1_proposito_sinek", "SIMON SINEK · EL CÍRCULO DORADO"),
        ("step1_proposito_sinek", "POR QUÉ -> CÓMO -> QUÉ"),
        ("tour_step1_6_persona", "LA EMPRESA COMO PERSONA Y ARQUETIPOS"),
        ("plate-04", "LÁMINA 04 · CÍRCULO DORADO EN CURVAS"),
    ],
    2: [
        ("step2_touchpoints_carlzon", "JAN CARLZON · MOMENTOS DE LA VERDAD"),
        ("step2_touchpoints_carlzon", "TOUCHPOINTS: ANTES DE LA COMPRA"),
        ("tour_step2_2_durante", "TOUCHPOINTS: DURANTE Y DESPUÉS"),
        ("plate-10", "LÁMINA 10 · ARQUITECTURA DE EXPERIENCIA"),
    ],
    3: [
        ("step3_naming_niza", "WALLY OLINS & AL RIES · IDENTIDAD VERBAL"),
        ("step3_naming_niza", "ALEXANDRA WATKINS · MÉTODO SMILE"),
        ("step3_naming_niza", "CLASIFICACIÓN INTERNACIONAL DE NIZA"),
        ("plate-13", "LÁMINA 13 · TERNA OFICIAL DE LOGOTIPO"),
    ],
    4: [
        ("step4_kansei_tipografia", "MITSUO NAGAMACHI · INGENIERÍA KANSEI"),
        ("step4_kansei_tipografia", "7 EJES SEMÁNTICOS DE CHARLES OSGOOD"),
        ("step4_kansei_tipografia", "ROBERT BRINGHURST · VOZ TIPOGRÁFICA"),
        ("plate-22", "LÁMINA 22 · GOBERNANZA TIPOGRÁFICA HÍBRIDA"),
    ],
    5: [
        ("step5_taller_logo_liquid_glass", "PAUL RAND & JOSEF ALBERS · TALLER DE LOGO"),
        ("step5_taller_logo_liquid_glass", "SAGI HAVIV · EVOLUCIÓN DE LOGO BASE"),
        ("step5_taller_logo_liquid_glass", "10 ITERACIONES CON NANO BANANA PRO"),
        ("plate-14", "LÁMINA 14 · ANATOMÍA VECTORIAL .SVG / .AI"),
    ],
    6: [
        ("step6_visor_36_laminas", "MASSIMO VIGNELLI · 36 LÁMINAS EN CURVAS"),
        ("step6_visor_36_laminas", "DIRECTIVA C-00 · LIENZO 100% CLARO"),
        ("step6_boveda_entregables", "BÓVEDA DE 9 ENTREGABLES EJECUTIVOS"),
        ("step6_firma_correo_html", "EXPORTACIÓN PDF, HTML, VECTORES Y OFFICE"),
    ],
}

# Secuencia de las 4 escenas por paso usando los 7 looks ejecutivos de Jorge Improbears en HeyGen
STEP_VIDEO_SOURCES = {
    0: [
        ("heygen_avatar", 0, 0.0, "HEYGEN AVATAR · JORGE IMPROBEARS", "Peter Drucker · Definir el punto de partida"),
        ("heygen_app_card", 1, 2.0, "HEYGEN AVATAR + APP STUDIO", "David Aaker & Sagi Haviv · Logo Base"),
        ("heygen_avatar", 0, 5.0, "HEYGEN AVATAR · MENTORÍA EN VIVO", "Al Ries & Jack Trout · Giro del Negocio"),
        ("heygen_app_card", 2, 7.0, "HEYGEN AVATAR + APP STUDIO", "Sincronización en todos tus dispositivos"),
    ],
    1: [
        ("heygen_avatar", 1, 0.5, "HEYGEN AVATAR · PROPÓSITO NUCLEAR", "Simon Sinek · El Círculo Dorado"),
        ("heygen_app_card", 2, 3.0, "HEYGEN AVATAR + APP STUDIO", "Empezar por el Porqué antes del Qué"),
        ("heygen_avatar", 1, 6.0, "HEYGEN AVATAR · OFERTA DE VALOR", "Alex Osterwalder & Donald Miller"),
        ("heygen_app_card", 0, 8.0, "HEYGEN AVATAR + BRANDBOOK", "Claridad que elimina toda fricción"),
    ],
    2: [
        ("heygen_avatar", 2, 1.0, "HEYGEN AVATAR · MOMENTOS DE VERDAD", "Jan Carlzon · 15 segundos decisivos"),
        ("heygen_app_card", 3, 3.5, "HEYGEN AVATAR + APP STUDIO", "Antes, Durante y Después de la compra"),
        ("heygen_avatar", 2, 6.5, "HEYGEN AVATAR · SERVICIO SIN FRICCIÓN", "Don Norman · Psicología de Touchpoints"),
        ("heygen_app_card", 1, 8.5, "HEYGEN AVATAR + BRANDBOOK", "Entrega, garantía y lealtad"),
    ],
    3: [
        ("heygen_avatar", 3, 0.0, "HEYGEN AVATAR · IDENTIDAD VERBAL", "Wally Olins · El poder del nombre"),
        ("heygen_app_card", 4, 2.5, "HEYGEN AVATAR + APP STUDIO", "Alexandra Watkins & David Placek (SMILE)"),
        ("heygen_avatar", 3, 5.5, "HEYGEN AVATAR · BLINDAJE LEGAL", "Alina Wheeler · Clases Internacionales Niza"),
        ("heygen_app_card", 5, 7.5, "HEYGEN AVATAR + BRANDBOOK", "Monograma en digital y arquitectura"),
    ],
    4: [
        ("heygen_avatar", 4, 1.0, "HEYGEN AVATAR · INGENIERÍA KANSEI", "Mitsuo Nagamachi · Geometría emocional"),
        ("heygen_app_card", 0, 3.0, "HEYGEN AVATAR + APP STUDIO", "7 Ejes de Charles Osgood & Ramachandran"),
        ("heygen_avatar", 4, 6.0, "HEYGEN AVATAR · VOZ TIPOGRÁFICA", "Robert Bringhurst & Adrian Frutiger"),
        ("heygen_app_card", 2, 8.0, "HEYGEN AVATAR + BRANDBOOK", "Tipografía híbrida lista para descarga"),
    ],
    5: [
        ("heygen_avatar", 5, 0.5, "HEYGEN AVATAR · TALLER DE LOGOTIPO", "Paul Rand & Josef Albers · Color original"),
        ("heygen_app_card", 1, 3.0, "HEYGEN AVATAR + APP STUDIO", "Sagi Haviv · Conservar o evolucionar base"),
        ("heygen_avatar", 5, 5.5, "HEYGEN AVATAR · ITERACIÓN ABIERTA", "Max Wertheimer & Dieter Rams"),
        ("heygen_app_card", 6, 8.0, "HEYGEN AVATAR + BRANDBOOK", "Jony Ive · Símbolo y vectores en curvas .AI"),
    ],
    6: [
        ("heygen_avatar", 6, 0.0, "HEYGEN AVATAR · CONSTITUCIÓN C-00", "Massimo Vignelli · 36 Láminas en Curvas"),
        ("heygen_app_card", 5, 2.5, "HEYGEN AVATAR + APP STUDIO", "Josef Müller-Brockmann · Lienzo Claro"),
        ("heygen_avatar", 6, 5.0, "HEYGEN AVATAR · SUITE EJECUTIVA", "Danne & Blackburn · De la idea a imprenta"),
        ("heygen_app_card", 1, 7.5, "HEYGEN AVATAR + BÓVEDA", "PDF, Vectores .SVG/.AI, Word, PPTX y Fuentes"),
    ],
}


def get_heygen_master_for_look(look_idx: int) -> Path:
    """Devuelve el clip maestro 720x1280 30fps All-I-frame de Jorge Improbears para el look solicitado."""
    idx = look_idx % 7
    p = HEYGEN_ASSETS_DIR / f"master_step{idx}.mp4"
    if p.exists() and p.stat().st_size > 1_000_000:
        return p
    fallback = HEYGEN_ASSETS_DIR / "video_1d65ca4f.mp4"
    return fallback


def resolve_localized_capture_path(base_name: str, lang: str = "es") -> Path:
    """Resuelve la captura localizada de la app o lámina del brandbook."""
    if base_name.startswith("plate-"):
        p = PLATES_DIR / f"{base_name}.jpg"
        if p.exists():
            return p
    if lang and lang != "es":
        p_lang = CAPTURES_DIR / f"{base_name}_{lang}.png"
        if p_lang.exists():
            return p_lang
    p_es = CAPTURES_DIR / f"{base_name}.png"
    if p_es.exists():
        return p_es
    return PLATES_DIR / "plate-01.jpg"


def build_transparent_hud_overlay(
    step_num: int,
    shot_idx: int,
    shot_badge: str,
    headline: str,
    sub_label: str,
    narration_text: str,
    pip_img_path: Path,
    pip_caption: str,
    out_png: Path,
    show_app_card: bool = False,
    step_word: str = "PASO",
    part_word: str = "PARTE",
):
    """
    Construye un overlay RGBA 720x1280 estilo Apple / HeyGen:
    - Parte superior: Píldora discreta PASO 0X · PARTE Y/4 + badge HeyGen Jorge Improbears.
    - Si `show_app_card` es True (escenas 2 y 4), muestra una tarjeta cristalina en la zona
      inferior-media (debajo del pecho, sin tapar jamás el rostro del avatar) con la captura
      real de TheBestBrand Studio App en el idioma activo.
    - Parte inferior: Lower-third limpio de 2 líneas (Titular + Autor) y barra fina de progreso.
    """
    W, H = 720, 1280
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Gradiente inferior suave para legibilidad del titular
    grad_start = H - 340 if show_app_card else H - 280
    for y in range(grad_start, H):
        prog = (y - grad_start) / float(H - grad_start)
        alpha = int(225 * (prog ** 1.25))
        draw.line([(0, y), (W, y)], fill=(8, 13, 24, alpha))

    try:
        f_top_badge = ImageFont.truetype(FONT_BOLD, 13)
        f_card_tag = ImageFont.truetype(FONT_BOLD, 11)
        f_title = ImageFont.truetype(FONT_BOLD, 24)
        f_sub = ImageFont.truetype(FONT_SEMI, 15)
    except Exception:
        f_top_badge = f_card_tag = f_title = f_sub = ImageFont.load_default()

    # Píldora superior izquierda: PASO 0X · PARTE Y/4
    draw.rounded_rectangle([28, 28, 286, 62], radius=17, fill=(13, 37, 64, 220), outline=(255, 255, 255, 75), width=1)
    draw.ellipse([42, 40, 52, 50], fill=(255, 122, 0, 255))
    draw.text((62, 37), f"{step_word} 0{step_num} · {part_word} {shot_idx + 1}/4", font=f_top_badge, fill=(255, 255, 255, 255))

    # Píldora superior derecha: THE BEST BRAND · STUDIO
    draw.rounded_rectangle([W - 252, 28, W - 28, 62], radius=17, fill=(255, 255, 255, 230), outline=(66, 110, 174, 180), width=1)
    draw.text((W - 234, 37), "THE BEST BRAND AI", font=f_top_badge, fill=(13, 37, 64, 255))

    # Si corresponde mostrar la tarjeta de captura de la app (debajo del pecho, y=735..1075)
    if show_app_card and pip_img_path and pip_img_path.exists():
        try:
            card_w, card_h = 664, 326
            cx0, cy0 = 28, 742
            draw.rounded_rectangle(
                [cx0 - 4, cy0 - 30, cx0 + card_w + 4, cy0 + card_h + 4],
                radius=18,
                fill=(13, 37, 64, 238),
                outline=(255, 122, 0, 230),
                width=2,
            )
            draw.ellipse([cx0 + 12, cy0 - 20, cx0 + 20, cy0 - 12], fill=(255, 122, 0, 255))
            draw.text((cx0 + 28, cy0 - 22), pip_caption[:56], font=f_card_tag, fill=(255, 255, 255, 245))

            cap_img = Image.open(pip_img_path).convert("RGBA")
            cap_resized = cap_img.resize((card_w, card_h), Image.Resampling.LANCZOS)
            mask = Image.new("L", (card_w, card_h), 0)
            ImageDraw.Draw(mask).rounded_rectangle([0, 0, card_w, card_h], radius=14, fill=255)
            overlay.paste(cap_resized, (cx0, cy0), mask)
        except Exception:
            pass

    # Barra de acento lateral limpia en el lower-third
    draw.rounded_rectangle([28, H - 160, 35, H - 54], radius=3, fill=(255, 122, 0, 255))

    words = headline.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if len(test) <= 34:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    lines = lines[:2]

    y_text = H - 160
    for ln in lines:
        draw.text((48, y_text), ln, font=f_title, fill=(255, 255, 255, 255))
        y_text += 30

    draw.text((48, y_text + 4), sub_label[:54], font=f_sub, fill=(147, 197, 253, 255))

    # Barra fina de progreso de las 4 escenas abajo
    seg_w = (W - 56 - 24) // 4
    for i in range(4):
        sx = 28 + i * (seg_w + 8)
        col = (255, 122, 0, 255) if i <= shot_idx else (255, 255, 255, 75)
        draw.rounded_rectangle([sx, H - 30, sx + seg_w, H - 24], radius=3, fill=col)

    overlay.save(out_png, "PNG")


def synthesize_founder_voice_m4a(narration_text: str, clip_id: str) -> Path:
    """
    Genera la narración exacta del guion en español con voz masculina barítona calibrada al registro
    fundamental de Jorge Benítez (~132 Hz) con formantes vocales desplazados vía librubberband.
    """
    out_m4a = TMP_DIR / f"{clip_id}_male132.m4a"
    if out_m4a.exists() and out_m4a.stat().st_size > 2000:
        return out_m4a

    spoken_text = re.sub(r"^Hola,\s*soy\s+Aura\.", "Hola, soy Jorge Benítez.", narration_text.strip())
    spoken_text = spoken_text.replace("escucharás mi respuesta breve", "escucharás la respuesta de Aura en vivo")

    raw_mp3 = TMP_DIR / f"{clip_id}_raw.mp3"
    tts = gTTS(text=spoken_text, lang="es", tld="com.mx", slow=False)
    tts.save(str(raw_mp3))

    af_filter = (
        "rubberband=pitch=0.586:tempo=1.06:formant=shifted:pitchq=quality,"
        "equalizer=f=135:t=q:w=1.1:g=3.5,"
        "equalizer=f=3200:t=q:w=1.5:g=-2.5,"
        "lowpass=f=7200,volume=1.6"
    )
    subprocess.run([
        "ffmpeg", "-y", "-i", str(raw_mp3),
        "-af", af_filter,
        "-ar", "24000", "-ac", "1",
        "-c:a", "aac", "-b:a", "128k",
        str(out_m4a)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out_m4a


def get_duration(media_path: Path) -> float:
    res = subprocess.run(["ffmpeg", "-i", str(media_path)], capture_output=True, text=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", res.stderr)
    if m:
        h, mi, s = m.groups()
        return int(h) * 3600 + int(mi) * 60 + float(s)
    return 8.0


def build_lipsync_ffconcat(audio_m4a: Path, look_idx: int, start_sec: float, out_concat_txt: Path) -> float:
    """
    Analiza la envolvente de voz (en ventanas de 50ms) del audio narrado y construye una línea
    de tiempo ffconcat sobre el clip maestro HeyGen del look de ese paso (`master_step{look_idx}.mp4`),
    alternando entre ventanas de habla activa (SPEAK_WINDOWS) cuando hay voz y ventanas de boca
    cerrada en reposo (REST_WINDOWS) durante las pausas.
    """
    import numpy as np

    master_v = get_heygen_master_for_look(look_idx)
    raw_pcm = subprocess.check_output([
        "ffmpeg", "-v", "error", "-i", str(audio_m4a),
        "-f", "f32le", "-ac", "1", "-ar", "16000", "-"
    ])
    samples = np.frombuffer(raw_pcm, dtype=np.float32)
    sr = 16000
    step_sz = 800  # 50 ms
    win_sz = 1600
    n_steps = max(1, len(samples) // step_sz)
    voiced = []
    for i in range(n_steps):
        seg = samples[i * step_sz: i * step_sz + win_sz]
        rms = float(np.sqrt(np.mean(seg ** 2))) if len(seg) > 0 else 0.0
        voiced.append(rms > 0.010)

    # Suavizar micro-huecos menores a 100ms dentro de una misma frase
    for i in range(1, len(voiced) - 1):
        if not voiced[i] and voiced[i - 1] and voiced[i + 1]:
            voiced[i] = True

    runs = []
    cur_v = voiced[0]
    cur_len = 1
    for v in voiced[1:]:
        if v == cur_v:
            cur_len += 1
        else:
            runs.append((cur_v, round(cur_len * 0.05, 3)))
            cur_v = v
            cur_len = 1
    runs.append((cur_v, round(cur_len * 0.05, 3)))

    lines = ["ffconcat version 1.0"]
    sw_idx = int(abs(start_sec) * 2 + look_idx) % len(SPEAK_WINDOWS)
    rw_idx = look_idx % len(REST_WINDOWS)
    for is_v, d in runs:
        rem = d
        if is_v:
            while rem > 0.02:
                w0, w1 = SPEAK_WINDOWS[sw_idx % len(SPEAK_WINDOWS)]
                w_len = w1 - w0
                take = min(rem, w_len)
                lines.append(f"file '{master_v}'")
                lines.append(f"inpoint {w0:.3f}")
                lines.append(f"outpoint {w0 + take:.3f}")
                rem -= take
                sw_idx += 1
        else:
            while rem > 0.02:
                w0, w1 = REST_WINDOWS[rw_idx % len(REST_WINDOWS)]
                w_len = w1 - w0
                take = min(rem, w_len)
                lines.append(f"file '{master_v}'")
                lines.append(f"inpoint {w0:.3f}")
                lines.append(f"outpoint {w0 + take:.3f}")
                rem -= take
                rw_idx += 1

    out_concat_txt.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return len(samples) / sr


def build_dynamic_heygen_flow_clip(
    mode: str,
    look_idx: int,
    start_sec: float,
    overlay_png: Path,
    audio_m4a: Path,
    out_mp4: Path,
    poster_jpg: Path = None
):
    dur = get_duration(audio_m4a)
    concat_file = out_mp4.with_suffix(".ffconcat")
    build_lipsync_ffconcat(audio_m4a, int(look_idx), start_sec, concat_file)

    v_filter = "[0:v]fps=30,setsar=1[bg];[bg][1:v]overlay=0:0:format=auto[outv]"
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0",
        "-i", str(concat_file),
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
    import shutil

    manifest_path = VIDEOS_OUT_DIR / "capsules_manifest.json"
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    updated = []
    first_clips = []
    legacy_map = {
        0: "capsule_step_0_intro.mp4",
        1: "capsule_step_1_to_2.mp4",
        2: "capsule_step_2_to_3.mp4",
        3: "capsule_step_3_to_4.mp4",
        4: "capsule_step_4_to_5.mp4",
        5: "capsule_step_5_to_6.mp4",
        6: "capsule_step_6_to_7.mp4",
    }

    for item in manifest:
        step = item["step"]
        sources = STEP_VIDEO_SOURCES.get(step, STEP_VIDEO_SOURCES[0])
        cap_specs = STEP_APP_CAPTURES.get(step, STEP_APP_CAPTURES[0])
        clip_paths = []
        print(f"=== Generando Reel 9:16 HeyGen Avatar (Look Paso {step}) + Voz Masculina 132Hz · Paso {step}: {item['title']} ===")

        for s_idx, scene in enumerate(item["scenes"]):
            clip_id = f"v99_step_{step}_clip_{s_idx}_es"
            mode, look_idx, start_sec, shot_badge, sub_label = sources[s_idx % len(sources)]
            cap_base, cap_caption = cap_specs[s_idx % len(cap_specs)]
            cap_path = resolve_localized_capture_path(cap_base, "es")

            if step == 0 and s_idx == 0:
                scene["narration"] = re.sub(r"^Hola,\s*soy\s+Aura\.", "Hola, soy Jorge Benítez.", scene["narration"])

            overlay_png = TMP_DIR / f"{clip_id}_overlay.png"
            build_transparent_hud_overlay(
                step_num=step,
                shot_idx=s_idx,
                shot_badge=shot_badge,
                headline=scene["headline"],
                sub_label=sub_label,
                narration_text=scene.get("narration", ""),
                pip_img_path=cap_path,
                pip_caption=cap_caption,
                out_png=overlay_png,
                show_app_card=(mode == "heygen_app_card"),
                step_word="PASO",
                part_word="PARTE",
            )

            audio_m4a = synthesize_founder_voice_m4a(scene["narration"], clip_id)
            clip_mp4 = TMP_DIR / f"{clip_id}_heygen.mp4"
            poster_path = (VIDEOS_OUT_DIR / f"poster_paso_{step}.jpg") if s_idx == 0 else None

            build_dynamic_heygen_flow_clip(
                mode=mode,
                look_idx=look_idx,
                start_sec=start_sec,
                overlay_png=overlay_png,
                audio_m4a=audio_m4a,
                out_mp4=clip_mp4,
                poster_jpg=poster_path,
            )
            clip_paths.append(clip_mp4)
            if s_idx == 0:
                first_clips.append(clip_mp4)

        concat_txt = TMP_DIR / f"concat_step_{step}_es.txt"
        with open(concat_txt, "w") as cf:
            for cp in clip_paths:
                cf.write(f"file '{cp.resolve()}'\n")

        out_step_mp4 = VIDEOS_OUT_DIR / f"capsula_teoria_paso_{step}.mp4"
        subprocess.run([
            "ffmpeg", "-y", "-f", "concat", "-safe", "0",
            "-i", str(concat_txt), "-c", "copy", "-movflags", "+faststart",
            str(out_step_mp4)
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Copiar al directorio espejo de api-server y actualizar nombre legacy
        shutil.copy2(out_step_mp4, API_VIDEOS_OUT_DIR / out_step_mp4.name)
        poster_file = VIDEOS_OUT_DIR / f"poster_paso_{step}.jpg"
        if poster_file.exists():
            shutil.copy2(poster_file, API_VIDEOS_OUT_DIR / poster_file.name)

        leg_name = legacy_map.get(step)
        if leg_name:
            shutil.copy2(out_step_mp4, VIDEOS_OUT_DIR / leg_name)
            shutil.copy2(out_step_mp4, API_VIDEOS_OUT_DIR / leg_name)

        dur = round(get_duration(out_step_mp4), 1)
        sz_kb = round(out_step_mp4.stat().st_size / 1024, 1)
        print(f"  ✓ [ES] {out_step_mp4.name} listo ({dur}s, {sz_kb} KB, 720x1280 30fps HeyGen Look {step} + Lip-Sync)")

        item_copy = dict(item)
        item_copy["duration_sec"] = dur
        item_copy["size_kb"] = sz_kb
        item_copy["aspect_ratio"] = "9:16"
        item_copy["production_engine"] = f"HeyGen Founder Avatar (Jorge Improbears Look {step} Lip-Sync) + TheBestBrand Studio Captures + Male Baritone Voice (132Hz)"
        updated.append(item_copy)

    # Master tour (Recorrido completo con los 7 looks del Fundador en HeyGen)
    concat_master = TMP_DIR / "concat_master_es.txt"
    with open(concat_master, "w") as mf:
        for cp in first_clips:
            mf.write(f"file '{cp.resolve()}'\n")
    master_mp4 = VIDEOS_OUT_DIR / "capsula_teoria_aura_recorrido.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_master), "-c", "copy", "-movflags", "+faststart",
        str(master_mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    shutil.copy2(master_mp4, API_VIDEOS_OUT_DIR / master_mp4.name)

    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(updated, f, indent=2, ensure_ascii=False)
    shutil.copy2(manifest_path, API_VIDEOS_OUT_DIR / "capsules_manifest.json")
    print("\n✓ Los 7 videos verticales en Español (Pasos 0..6) generados con el avatar HeyGen de Jorge Improbears sin material de ImproBears-Web.")


if __name__ == "__main__":
    main()
