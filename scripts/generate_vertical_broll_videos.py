#!/usr/bin/env python3
"""
THEBESTBRAND — GENERADOR DE VIDEOS VERTICALES 9:16 (720x1280) PROFESIONALES
Intercambia tomas de cámara realistas (Presentadora / Director de Marca) con B-Rolls
cinematográficos que apoyan cada concepto, movimiento de cámara suave (Ken Burns) y
voz humana en español de México (gTTS com.mx + atempo natural).
"""

import os
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS

WORKSPACE_ROOT = Path("/home/antigravity/ImprobearsIA/thebestbrand")
VIDEOS_OUT_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
PHOTOS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "editorial_photos"
ARTIFACTS_DIR = Path("/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a")
FONTS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "fonts"
TMP_DIR = Path("/tmp/tbb_vertical_videos_build")

VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
TMP_DIR.mkdir(parents=True, exist_ok=True)

# 1. Fuentes para plecas editoriales inferiores (lower thirds) en cada toma 9:16
FONT_BOLD = str(FONTS_DIR / "Montserrat-Black.ttf")
FONT_SEMI = str(FONTS_DIR / "PlusJakartaSans-Bold.ttf")
FONT_REG = str(FONTS_DIR / "PlusJakartaSans-Regular.ttf")

# 2. Mapa de tomas realistas (A = Presentadora / Host, B = B-Roll de concepto)
HOST_A = ARTIFACTS_DIR / "video_host_shot_a_1794503225618.jpg"
HOST_B = ARTIFACTS_DIR / "video_host_shot_b_1794503226700.jpg"
BROLL_KANSEI = ARTIFACTS_DIR / "video_broll_kansei_typography_1794503227674.jpg"
BROLL_ATELIER = ARTIFACTS_DIR / "video_broll_brandbook_atelier_1794503226796.jpg"

BROLL_01 = PHOTOS_DIR / "arco_01_persona.jpg"
BROLL_02 = PHOTOS_DIR / "arco_02_buyer.jpg"
BROLL_03 = PHOTOS_DIR / "arco_03_tp_before.jpg"
BROLL_04 = PHOTOS_DIR / "arco_04_tp_during.jpg"
BROLL_05 = PHOTOS_DIR / "arco_05_tp_after.jpg"
BROLL_06 = PHOTOS_DIR / "arco_06_environment.jpg"

STEP_SHOT_SEQUENCE = {
    0: [
        (HOST_A, "TOMA 01 · MENTORA EJECUTIVA", "Peter Drucker · Definir el punto de partida"),
        (BROLL_ATELIER, "B-ROLL · CAPITAL VISUAL", "David Aaker & Sagi Haviv · Logo Base"),
        (HOST_B, "TOMA 02 · DIRECCIÓN ESTRATÉGICA", "Al Ries & Jack Trout · Giro del Negocio"),
        (BROLL_01, "B-ROLL · ARQUITECTURA REAL", "Continuidad en todos los dispositivos")
    ],
    1: [
        (HOST_A, "TOMA 01 · PROPÓSITO NUCLEAR", "Simon Sinek · El Círculo Dorado"),
        (BROLL_02, "B-ROLL · COMITÉ DIRECTIVO", "Empezar por el Porqué antes del Qué"),
        (HOST_B, "TOMA 02 · OFERTA DE VALOR", "Alex Osterwalder & Donald Miller"),
        (BROLL_06, "B-ROLL · IMPACTO TANGIBLE", " Claridad que elimina toda fricción")
    ],
    2: [
        (HOST_A, "TOMA 01 · MOMENTOS DE VERDAD", "Jan Carlzon · 15 segundos decisivos"),
        (BROLL_03, "B-ROLL · FASE 1: ANTES", "Descubrimiento y primera impresión"),
        (BROLL_04, "B-ROLL · FASE 2: DURANTE", "Ejecución impecable en campo"),
        (BROLL_05, "B-ROLL · FASE 3: DESPUÉS", "Entrega, garantía y lealtad")
    ],
    3: [
        (HOST_A, "TOMA 01 · IDENTIDAD VERBAL", "Wally Olins · El poder del nombre"),
        (BROLL_KANSEI, "B-ROLL · MÉTODO SMILE", "Alexandra Watkins & David Placek"),
        (HOST_B, "TOMA 02 · BLINDAJE LEGAL", "Alina Wheeler · Clases de Niza"),
        (BROLL_ATELIER, "B-ROLL · MONOGRAMA 1:1", "Presencia en digital y fachada")
    ],
    4: [
        (HOST_A, "TOMA 01 · INGENIERÍA KANSEI", "Mitsuo Nagamachi · Geometría emocional"),
        (BROLL_KANSEI, "B-ROLL · CALIBRACIÓN VISUAL", "7 Ejes de Osgood & Proporción"),
        (HOST_B, "TOMA 02 · VOZ TIPOGRAFÍA", "Robert Bringhurst & Adrian Frutiger"),
        (BROLL_ATELIER, "B-ROLL · SISTEMA TIPOGRÁFICO", "Fuentes abiertas listas para descarga")
    ],
    5: [
        (HOST_A, "TOMA 01 · TALLER DE LOGOTIPO", "Paul Rand & Josef Albers · Color original"),
        (BROLL_ATELIER, "B-ROLL · EVOLUCIÓN DE BASE", "Sagi Haviv · Respetar esencia y paleta"),
        (HOST_B, "TOMA 02 · ITERACIÓN ABIERTA", "Max Wertheimer & Dieter Rams"),
        (BROLL_KANSEI, "B-ROLL · PRECISIÓN 1:1", "Jony Ive · Símbolo y vectores en curvas")
    ],
    6: [
        (HOST_A, "TOMA 01 · CONSTITUCIÓN DE MARCA", "Massimo Vignelli · 36 Láminas"),
        (BROLL_ATELIER, "B-ROLL · FLUJO EN CURVAS", "Josef Müller-Brockmann · Lienzo Claro"),
        (HOST_B, "TOMA 02 · SUITE EJECUTIVA", "Danne & Blackburn · De la idea a imprenta"),
        (BROLL_06, "B-ROLL · MARCA EN ACCIÓN", "PDF, Vectores .SVG/.AI, Office y Fuentes")
    ]
}

def prepare_vertical_9x16_frame(img_path: Path, step_num: int, shot_idx: int, shot_badge: str, headline: str, subtext: str, out_png: Path):
    """Prepara un fotograma vertical 9:16 (720x1280) de alta resolución con encuadre cinematográfico y pleca editorial limpia."""
    W, H = 720, 1280
    src = Image.open(img_path).convert("RGB")
    sw, sh = src.size

    # Crop central-superior respetando proporciones humanas sin deformar (aspect ratio 9:16)
    target_ratio = W / H
    src_ratio = sw / sh
    if src_ratio > target_ratio:
        new_w = int(sh * target_ratio)
        left = (sw - new_w) // 2
        cropped = src.crop((left, 0, left + new_w, sh))
    else:
        new_h = int(sw / target_ratio)
        top = int((sh - new_h) * 0.18)
        cropped = src.crop((0, top, sw, top + new_h))

    base = cropped.resize((W, H), Image.Resampling.LANCZOS).convert("RGBA")

    # Degradado cinemático sutil superior e inferior para legibilidad perfecta de las plecas
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Gradiente superior suave
    for y in range(0, 170):
        alpha = int(155 * (1 - y / 170.0))
        draw.line([(0, y), (W, y)], fill=(9, 13, 22, alpha))

    # Gradiente inferior para lower-third
    for y in range(H - 360, H):
        prog = (y - (H - 360)) / 360.0
        alpha = int(215 * (prog ** 1.15))
        draw.line([(0, y), (W, y)], fill=(9, 13, 22, alpha))

    # Cargar fuentes
    try:
        f_kicker = ImageFont.truetype(FONT_BOLD, 17)
        f_title = ImageFont.truetype(FONT_BOLD, 30)
        f_sub = ImageFont.truetype(FONT_SEMI, 20)
        f_top = ImageFont.truetype(FONT_BOLD, 16)
    except Exception:
        f_kicker = f_title = f_sub = f_top = ImageFont.load_default()

    # Pleca superior: THEBESTBRAND · PASO X · TOMA Y/4
    draw.rounded_rectangle([32, 32, 360, 74], radius=21, fill=(13, 37, 64, 220), outline=(56, 189, 248, 220), width=2)
    draw.text((50, 44), f"PASO 0{step_num} · TOMA {shot_idx + 1}/4 · 9:16 HD", font=f_top, fill=(255, 255, 255, 255))

    # Indicador de tipo de toma (Presentadora vs B-Roll)
    is_broll = "B-ROLL" in shot_badge
    pill_bg = (3, 109, 200, 230) if is_broll else (16, 185, 129, 230)
    draw.rounded_rectangle([32, H - 285, 390, H - 247], radius=19, fill=pill_bg)
    draw.text((48, H - 275), shot_badge[:32], font=f_kicker, fill=(255, 255, 255, 255))

    # Línea de acento vertical en el lower-third
    draw.rectangle([32, H - 228, 40, H - 64], fill=(56, 189, 248, 255))

    # Wrapping de headline (máximo 2 líneas)
    words = headline.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if len(test) <= 30:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    lines = lines[:2]

    y_text = H - 226
    for ln in lines:
        draw.text((54, y_text), ln, font=f_title, fill=(255, 255, 255, 255))
        y_text += 38

    # Subtexto de apoyo
    draw.text((54, y_text + 8), subtext[:48], font=f_sub, fill=(161, 216, 214, 255))

    # Barra de progreso de las 4 tomas en la base
    seg_w = (W - 64 - 24) // 4
    for i in range(4):
        sx = 32 + i * (seg_w + 8)
        col = (56, 189, 248, 255) if i <= shot_idx else (255, 255, 255, 70)
        draw.rounded_rectangle([sx, H - 36, sx + seg_w, H - 28], radius=4, fill=col)

    composed = Image.alpha_composite(base, overlay).convert("RGB")
    composed.save(out_png, "PNG")


def synthesize_human_voice_m4a(narration_text: str, clip_id: str) -> Path:
    """Genera voz humana en español de México (gTTS com.mx con cadencia ejecutiva natural 1.08x) en formato M4A."""
    out_m4a = TMP_DIR / f"{clip_id}.m4a"
    if out_m4a.exists() and out_m4a.stat().st_size > 1000:
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


def build_animated_vertical_clip(frame_png: Path, audio_m4a: Path, out_mp4: Path, zoom_in: bool = True):
    """Genera un clip de video vertical 720x1280 con movimiento de cámara suave (Ken Burns) y audio humano."""
    dur = get_duration(audio_m4a)
    frames_total = max(24, int(dur * 24) + 6)
    if zoom_in:
        zp = f"zoompan=z='min(zoom+0.0007,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames_total}:s=720x1280:fps=24"
    else:
        zp = f"zoompan=z='if(eq(on,1),1.08,max(1.0,zoom-0.0007))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames_total}:s=720x1280:fps=24"

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", str(frame_png),
        "-i", str(audio_m4a),
        "-vf", zp,
        "-t", f"{dur:.2f}",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-shortest",
        str(out_mp4)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    manifest_path = VIDEOS_OUT_DIR / "capsules_manifest.json"
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    updated = []
    first_clips = []

    for item in manifest:
        step = item["step"]
        shots = STEP_SHOT_SEQUENCE.get(step, STEP_SHOT_SEQUENCE[0])
        clip_paths = []
        print(f"=== Generando Video Vertical 9:16 Paso {step}: {item['title']} ===")

        for s_idx, scene in enumerate(item["scenes"]):
            clip_id = f"v916_step_{step}_clip_{s_idx}"
            img_path, shot_badge, sub_label = shots[s_idx % len(shots)]
            frame_png = TMP_DIR / f"{clip_id}.png"
            prepare_vertical_9x16_frame(
                img_path=img_path,
                step_num=step,
                shot_idx=s_idx,
                shot_badge=shot_badge,
                headline=scene["headline"],
                subtext=sub_label,
                out_png=frame_png
            )
            if s_idx == 0:
                poster_path = VIDEOS_OUT_DIR / f"poster_paso_{step}.jpg"
                Image.open(frame_png).save(poster_path, "JPEG", quality=90)

            audio_m4a = synthesize_human_voice_m4a(scene["narration"], clip_id)
            clip_mp4 = TMP_DIR / f"{clip_id}.mp4"
            build_animated_vertical_clip(frame_png, audio_m4a, clip_mp4, zoom_in=(s_idx % 2 == 0))
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
        print(f"  ✓ {out_step_mp4.name} listo ({dur}s, {sz_kb} KB, 720x1280 9:16)")

        item_copy = dict(item)
        item_copy["duration_sec"] = dur
        item_copy["size_kb"] = sz_kb
        item_copy["aspect_ratio"] = "9:16"
        updated.append(item_copy)

    # Master tour
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
    print("\n✓ Todos los 8 videos verticales 9:16 con voz humana e intercambio de tomas + B-rolls generados.")

if __name__ == "__main__":
    main()
