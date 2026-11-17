#!/usr/bin/env python3
"""
THE BEST BRAND — UPGRADE OF CONCEPTUAL HERO CONVERGENCE VIDEOS (6 LANGUAGES),
OPEN-EYES POSTER EXTRACTION, AND ZERO-INTERNAL-TOOL-NAMES SANITIZATION.
"""

import json
import math
import re
import shutil
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont

WORKSPACE_ROOT = Path("/home/antigravity/ImprobearsIA/thebestbrand")
VIDEOS_OUT_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
API_VIDEOS_OUT_DIR = WORKSPACE_ROOT / "artifacts" / "api-server" / "public" / "assets" / "videos"
LOGOS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "logos"
CAPTURES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "app_captures"
PLATES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "brandbook_plates_tbb"
FONTS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "fonts"
TMP_DIR = Path("/tmp/tbb_hero_convergence_v105")
TMP_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = str(FONTS_DIR / "Montserrat-Black.ttf")
FONT_SEMI = str(FONTS_DIR / "PlusJakartaSans-Bold.ttf")
FONT_REG = str(FONTS_DIR / "PlusJakartaSans-Regular.ttf")

MALE_PITCH_BY_LANG = {
    "es": (0.735, "com.mx"),
    "en": (0.765, "com"),
    "fr": (0.865, "fr"),
    "pt": (0.705, "com.br"),
    "de": (0.755, "de"),
    "it": (1.020, "it"),
}

HERO_CONVERGENCE_SPECS = {
    "es": {
        "kicker": "CONVERGENCIA CIENTÍFICA · THE BEST BRAND & AURA",
        "theories": [
            ("CÍRCULO DORADO", "Simon Sinek · Propósito WHY → HOW → WHAT", (13, 37, 64), "Propósito Nuclear"),
            ("MODELO SMILE", "Alexandra Watkins · Naming & Fonética", (66, 110, 174), "Fuerza Verbal"),
            ("TOUCHPOINTS", "Jan Carlzon · Antes, Durante y Después", (76, 157, 230), "Momentos de Verdad"),
            ("INGENIERÍA KAIZEN", "Masaaki Imai · Evolución Continua", (255, 122, 0), "Mejora sin Fricción"),
            ("DIFERENCIAL OSGOOD", "Charles Osgood & Nagamachi · 7 Ejes", (13, 37, 64), "Geometría Emocional"),
            ("CANON VECTORIAL", "Paul Rand & Massimo Vignelli · Guía C-00", (66, 110, 174), "Brandbook +30 Páginas"),
        ],
        "left_card": "INTERACCIÓN EN VIVO CON AURA",
        "right_card": "BRANDBOOK OFICIAL · MÁS DE 30 PÁGINAS",
        "stage1_t": "1. CONVERGENCIA DE LAS GRANDES TEORÍAS DE MARCA",
        "stage1_d": "Círculo Dorado · Modelo SMILE · Touchpoints · Ingeniería Kaizen · Diferencial de Osgood",
        "stage2_t": "2. FUSIÓN ORGÁNICA CON AURA EN TIEMPO REAL",
        "stage2_d": "La ciencia estratégica y la geometría emocional se funden en una identidad visual única",
        "stage3_t": "3. THE BEST BRAND · TU MARCA Y BRANDBOOK (+30 PÁGINAS)",
        "stage3_d": "Manual Oficial de más de 30 páginas + Suite Vectorial (.SVG/.AI) + Kit Ejecutivo Completo",
        "narration": "El Círculo Dorado, el modelo SMILE, los Touchpoints, la ingeniería Kaizen y el diferencial de Osgood convergen y se transforman orgánicamente en The Best Brand junto a Aura, creando tu marca y tu Brandbook de más de treinta páginas.",
    },
    "en": {
        "kicker": "SCIENTIFIC CONVERGENCE · THE BEST BRAND & AURA",
        "theories": [
            ("GOLDEN CIRCLE", "Simon Sinek · Purpose WHY → HOW → WHAT", (13, 37, 64), "Core Purpose"),
            ("SMILE MODEL", "Alexandra Watkins · Naming & Phonetics", (66, 110, 174), "Verbal Power"),
            ("TOUCHPOINTS", "Jan Carlzon · Before, During & After", (76, 157, 230), "Moments of Truth"),
            ("KAIZEN ENGINEERING", "Masaaki Imai · Continuous Evolution", (255, 122, 0), "Zero-Friction Flow"),
            ("OSGOOD DIFFERENTIAL", "Charles Osgood & Nagamachi · 7 Axes", (13, 37, 64), "Emotional Geometry"),
            ("VECTOR CANON", "Paul Rand & Massimo Vignelli · Guide C-00", (66, 110, 174), "30+ Page Brandbook"),
        ],
        "left_card": "LIVE INTERACTION WITH AURA",
        "right_card": "OFFICIAL BRANDBOOK · 30+ PAGES",
        "stage1_t": "1. CONVERGENCE OF WORLD-CLASS BRANDING THEORIES",
        "stage1_d": "Golden Circle · SMILE Model · Touchpoints · Kaizen Engineering · Osgood Differential",
        "stage2_t": "2. REAL-TIME ORGANIC FUSION WITH AURA",
        "stage2_d": "Strategic science and emotional geometry merge into an unmistakable visual identity",
        "stage3_t": "3. THE BEST BRAND · YOUR BRAND & 30+ PAGE BRANDBOOK",
        "stage3_d": "Official 30+ Page Brandbook + Vector Suite (.SVG/.AI) + Complete Executive Kit",
        "narration": "The Golden Circle, the SMILE model, Touchpoints, Kaizen engineering, and Osgood's semantic differential converge and transform organically into The Best Brand with Aura, crafting your brand and your official brandbook of over thirty pages.",
    },
    "fr": {
        "kicker": "CONVERGENCE SCIENTIFIQUE · THE BEST BRAND & AURA",
        "theories": [
            ("CERCLE D'OR", "Simon Sinek · Raison d'Être WHY → HOW → WHAT", (13, 37, 64), "Raison d'Être"),
            ("MODÈLE SMILE", "Alexandra Watkins · Naming & Phonétique", (66, 110, 174), "Force Verbale"),
            ("TOUCHPOINTS", "Jan Carlzon · Avant, Pendant et Après", (76, 157, 230), "Moments de Vérité"),
            ("INGÉNIERIE KAIZEN", "Masaaki Imai · Évolution Continue", (255, 122, 0), "Zéro Friction"),
            ("DIFFÉRENTIEL OSGOOD", "Charles Osgood & Nagamachi · 7 Axes", (13, 37, 64), "Géométrie Émotionnelle"),
            ("CANON VECTORIEL", "Paul Rand & Massimo Vignelli · Guide C-00", (66, 110, 174), "Brandbook +30 Pages"),
        ],
        "left_card": "INTERACTION EN DIRECT AVEC AURA",
        "right_card": "BRANDBOOK OFFICIEL · PLUS DE 30 PAGES",
        "stage1_t": "1. CONVERGENCE DES GRANDES THÉORIES DE MARQUE",
        "stage1_d": "Cercle d'Or · Modèle SMILE · Touchpoints · Ingénierie Kaizen · Différentiel d'Osgood",
        "stage2_t": "2. FUSION ORGANIQUE EN TEMPS RÉEL AVEC AURA",
        "stage2_d": "La science stratégique et la géométrie émotionnelle fusionnent en une identité unique",
        "stage3_t": "3. THE BEST BRAND · VOTRE MARQUE ET BRANDBOOK (+30 PAGES)",
        "stage3_d": "Brandbook Officiel de plus de 30 pages + Suite Vectorielle (.SVG/.AI) + Kit Exécutif",
        "narration": "Le Cercle d'Or, le modèle SMILE, les Touchpoints, l'ingénierie Kaizen et le différentiel d'Osgood convergent et se transforment organiquement en The Best Brand avec Aura, créant votre marque et votre Brandbook de plus de trente pages.",
    },
    "pt": {
        "kicker": "CONVERGÊNCIA CIENTÍFICA · THE BEST BRAND & AURA",
        "theories": [
            ("CÍRCULO DOURADO", "Simon Sinek · Propósito WHY → HOW → WHAT", (13, 37, 64), "Propósito Nuclear"),
            ("MODELO SMILE", "Alexandra Watkins · Naming & Fonética", (66, 110, 174), "Força Verbal"),
            ("TOUCHPOINTS", "Jan Carlzon · Antes, Durante e Depois", (76, 157, 230), "Momentos da Verdade"),
            ("ENGENHARIA KAIZEN", "Masaaki Imai · Evolução Contínua", (255, 122, 0), "Melhoria sem Fricção"),
            ("DIFERENCIAL OSGOOD", "Charles Osgood & Nagamachi · 7 Eixos", (13, 37, 64), "Geometria Emocional"),
            ("CÂNONE VETORIAL", "Paul Rand & Massimo Vignelli · Guia C-00", (66, 110, 174), "Brandbook +30 Páginas"),
        ],
        "left_card": "INTERAÇÃO AO VIVO COM A AURA",
        "right_card": "BRANDBOOK OFICIAL · MAIS DE 30 PÁGINAS",
        "stage1_t": "1. CONVERGÊNCIA DAS GRANDES TEORIAS DE MARCA",
        "stage1_d": "Círculo Dourado · Modelo SMILE · Touchpoints · Engenharia Kaizen · Diferencial de Osgood",
        "stage2_t": "2. FUSÃO ORGÂNICA EM TEMPO REAL COM A AURA",
        "stage2_d": "A ciência estratégica e a geometria emocional fundem-se numa identidade visual única",
        "stage3_t": "3. THE BEST BRAND · A SUA MARCA E BRANDBOOK (+30 PÁGINAS)",
        "stage3_d": "Manual Oficial de mais de 30 páginas + Suite Vetorial (.SVG/.AI) + Kit Executivo Completo",
        "narration": "O Círculo Dourado, o modelo SMILE, os Touchpoints, a engenharia Kaizen e o diferencial de Osgood convergem e transformam-se organicamente em The Best Brand com a Aura, criando a sua marca e o seu Brandbook com mais de trinta páginas.",
    },
    "de": {
        "kicker": "WISSENSCHAFTLICHE KONVERGENZ · THE BEST BRAND & AURA",
        "theories": [
            ("GOLDEN CIRCLE", "Simon Sinek · Kernzweck WHY → HOW → WHAT", (13, 37, 64), "Kernzweck"),
            ("SMILE-MODELL", "Alexandra Watkins · Naming & Phonetik", (66, 110, 174), "Verbale Kraft"),
            ("TOUCHPOINTS", "Jan Carlzon · Vorher, Während & Nachher", (76, 157, 230), "Momente der Wahrheit"),
            ("KAIZEN-ENGINEERING", "Masaaki Imai · Kontinuierliche Evolution", (255, 122, 0), "Null Reibung"),
            ("OSGOOD-DIFFERENTIAL", "Charles Osgood & Nagamachi · 7 Achsen", (13, 37, 64), "Emotionale Geometrie"),
            ("VEKTOR-KANON", "Paul Rand & Massimo Vignelli · Leitfaden C-00", (66, 110, 174), "Brandbook +30 Seiten"),
        ],
        "left_card": "LIVE-INTERAKTION MIT AURA",
        "right_card": "OFFIZIELLES BRANDBOOK · ÜBER 30 SEITEN",
        "stage1_t": "1. KONVERGENZ DER FÜHRENDEN MARKENTHEORIEN",
        "stage1_d": "Golden Circle · SMILE-Modell · Touchpoints · Kaizen-Engineering · Osgood-Differential",
        "stage2_t": "2. ORGANISCHE FUSION IN ECHTZEIT MIT AURA",
        "stage2_d": "Strategische Wissenschaft und emotionale Geometrie verschmelzen zu Ihrer Markenidentität",
        "stage3_t": "3. THE BEST BRAND · IHRE MARKE & BRANDBOOK (+30 SEITEN)",
        "stage3_d": "Offizielles Brandbook mit über 30 Seiten + Vektor-Suite (.SVG/.AI) + Executive-Kit",
        "narration": "Der Golden Circle, das SMILE-Modell, Touchpoints, Kaizen-Engineering und das Osgood-Differential verschmelzen mit Aura organisch zu The Best Brand und erschaffen Ihre Marke sowie Ihr Brandbook mit über dreißig Seiten.",
    },
    "it": {
        "kicker": "CONVERGENZA SCIENTIFICA · THE BEST BRAND & AURA",
        "theories": [
            ("CERCHIO D'ORO", "Simon Sinek · Scopo WHY → HOW → WHAT", (13, 37, 64), "Scopo Centrale"),
            ("MODELLO SMILE", "Alexandra Watkins · Naming & Fonetica", (66, 110, 174), "Forza Verbale"),
            ("TOUCHPOINTS", "Jan Carlzon · Prima, Durante e Dopo", (76, 157, 230), "Momenti della Verità"),
            ("INGEGNERIA KAIZEN", "Masaaki Imai · Evoluzione Continua", (255, 122, 0), "Zero Attrito"),
            ("DIFFERENZIALE OSGOOD", "Charles Osgood & Nagamachi · 7 Assi", (13, 37, 64), "Geometria Emozionale"),
            ("CANONE VETTORIALE", "Paul Rand & Massimo Vignelli · Guida C-00", (66, 110, 174), "Brandbook +30 Pagine"),
        ],
        "left_card": "INTERAZIONE DAL VIVO CON AURA",
        "right_card": "BRANDBOOK UFFICIALE · OLTRE 30 PAGINE",
        "stage1_t": "1. CONVERGENZA DELLE GRANDI TEORIE DI BRANDING",
        "stage1_d": "Cerchio d'Oro · Modello SMILE · Touchpoints · Ingegneria Kaizen · Differenziale di Osgood",
        "stage2_t": "2. FUSIONE ORGANICA IN TEMPO REALE CON AURA",
        "stage2_d": "Scienza strategica e geometria emozionale si fondono in un'identità visiva inconfondibile",
        "stage3_t": "3. THE BEST BRAND · IL TUO BRAND E BRANDBOOK (+30 PAGINE)",
        "stage3_d": "Brandbook Ufficiale di oltre 30 pagine + Suite Vettoriale (.SVG/.AI) + Kit Esecutivo",
        "narration": "Il Cerchio d'Oro, il modello SMILE, i Touchpoints, l'ingegneria Kaizen e il differenziale di Osgood convergono e si trasformano organicamente in The Best Brand con Aura, creando il tuo brand e il tuo Brandbook di oltre trenta pagine.",
    },
}


def ease_in_out_cubic(x: float) -> float:
    x = max(0.0, min(1.0, x))
    return 4 * x * x * x if x < 0.5 else 1 - pow(-2 * x + 2, 3) / 2


def synthesize_voice(text: str, lang: str, clip_id: str) -> Path:
    out_m4a = TMP_DIR / f"{clip_id}_{lang}_voice.m4a"
    pitch_factor, tld = MALE_PITCH_BY_LANG.get(lang, (0.765, "com"))
    raw_mp3 = TMP_DIR / f"{clip_id}_{lang}_raw.mp3"
    tts = gTTS(text=text, lang=lang, tld=tld, slow=False)
    tts.save(str(raw_mp3))

    af_voice = (
        f"[0:a]rubberband=pitch={pitch_factor:.3f}:tempo=1.18:formant=shifted:pitchq=quality,"
        "equalizer=f=135:t=q:w=1.1:g=1.0,"
        "equalizer=f=3200:t=q:w=1.4:g=2.0,"
        "highpass=f=85,aresample=44100,volume=1.65[v];"
        "[1:a]lowpass=f=680[bg];"
        "[v][bg]amix=inputs=2:duration=first:dropout_transition=1,apad=pad_dur=0.25[aout]"
    )
    subprocess.run([
        "ffmpeg", "-y",
        "-i", str(raw_mp3),
        "-f", "lavfi",
        "-i", "aevalsrc='0.009*sin(2*PI*196*t)+0.006*sin(2*PI*293.66*t)+0.005*sin(2*PI*392*t)':s=44100:c=stereo",
        "-filter_complex", af_voice,
        "-map", "[aout]",
        "-c:a", "aac", "-b:a", "128k",
        str(out_m4a)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out_m4a


def render_hero_convergence_video(lang: str):
    cfg = HERO_CONVERGENCE_SPECS[lang]
    W, H = 1280, 720
    FPS = 24
    DURATION = 13.0
    TOTAL_FRAMES = int(FPS * DURATION)
    frames_dir = TMP_DIR / f"frames_{lang}"
    frames_dir.mkdir(parents=True, exist_ok=True)

    try:
        f_kicker = ImageFont.truetype(FONT_BOLD, 13)
        f_title = ImageFont.truetype(FONT_BOLD, 24)
        f_sub = ImageFont.truetype(FONT_SEMI, 15)
        f_node_t = ImageFont.truetype(FONT_BOLD, 14)
        f_node_s = ImageFont.truetype(FONT_REG, 12)
        f_node_b = ImageFont.truetype(FONT_BOLD, 11)
        f_brand_big = ImageFont.truetype(FONT_BOLD, 42)
        f_brand_tag = ImageFont.truetype(FONT_SEMI, 16)
    except Exception:
        f_kicker = f_title = f_sub = f_node_t = f_node_s = f_node_b = f_brand_big = f_brand_tag = ImageFont.load_default()

    isotipo_path = LOGOS_DIR / "Isotipo_Oficial_TheBestBrand_LiquidGlass_1024px.png"
    if not isotipo_path.exists():
        isotipo_path = LOGOS_DIR / "tbb_official_liquid_glass_logo.jpg"
    logo_img = Image.open(isotipo_path).convert("RGBA") if isotipo_path.exists() else None

    cx, cy = W // 2, 330
    for fidx in range(TOTAL_FRAMES):
        t = fidx / FPS
        img = Image.new("RGBA", (W, H), (255, 255, 255, 255))
        draw = ImageDraw.Draw(img)

        # Subtle architectural blueprint grid (#E6E6E6 on #FFFFFF)
        for gx in range(0, W, 64):
            draw.line([(gx, 0), (gx, H)], fill=(230, 236, 244, 130), width=1)
        for gy in range(0, H, 64):
            draw.line([(0, gy), (W, gy)], fill=(230, 236, 244, 130), width=1)

        # Flowing vector wave curves in background (ImproBears style)
        for w_idx in range(3):
            pts = []
            for x in range(0, W + 32, 32):
                y_off = math.sin(x * 0.005 + t * 1.4 + w_idx * 1.2) * (28 + w_idx * 10)
                pts.append((x, int(cy + y_off + (w_idx - 1) * 70)))
            col_w = (66, 110, 174, 42) if w_idx != 1 else (255, 122, 0, 48)
            draw.line(pts, fill=col_w, width=2)

        # Concentric Golden Circle / Orbital rings
        conv_p = ease_in_out_cubic((t - 4.2) / 3.0) if t > 4.2 else 0.0
        reveal_p = ease_in_out_cubic((t - 6.8) / 2.0) if t > 6.8 else 0.0

        for r_idx, rad in enumerate([255, 185, 118]):
            pulse = math.sin(t * 2.4 + r_idx) * 5
            r_dyn = int((rad + pulse) * (1.0 - conv_p * 0.35))
            col = (66, 110, 174, int(130 * (1.0 - reveal_p * 0.4))) if r_idx < 2 else (255, 122, 0, 195)
            draw.ellipse([cx - r_dyn, cy - r_dyn, cx + r_dyn, cy + r_dyn], outline=col, width=2)

        # Top Kicker Pill
        draw.rounded_rectangle([W // 2 - 285, 18, W // 2 + 285, 52], radius=17, fill=(255, 255, 255, 248), outline=(214, 224, 238, 255), width=2)
        draw.ellipse([W // 2 - 266, 29, W // 2 - 254, 41], fill=(255, 122, 0, 255))
        draw.text((W // 2 - 242, 28), cfg["kicker"], font=f_kicker, fill=(13, 37, 64, 255))

        # Orbiting & Converging Theory Nodes (0s -> 7.2s)
        if conv_p < 0.995:
            base_rx = 425 * (1.0 - conv_p * 0.90)
            base_ry = 192 * (1.0 - conv_p * 0.90)
            node_alpha = int(255 * (1.0 - max(0.0, (conv_p - 0.72) / 0.28)))
            for i, (t_code, t_author, t_rgb, t_pill) in enumerate(cfg["theories"]):
                angle = (i / 6.0) * math.pi * 2 - math.pi / 2 + t * 0.34 + conv_p * 2.15
                nx = int(cx + math.cos(angle) * base_rx)
                ny = int(cy + math.sin(angle) * base_ry)

                # Energy convergence beam
                draw.line([(nx, ny), (cx, cy)], fill=(t_rgb[0], t_rgb[1], t_rgb[2], int(165 * (1 - conv_p * 0.4))), width=3)
                beam_prog = ((t * 1.55 + i * 0.16) % 1.0)
                px = int(nx + (cx - nx) * beam_prog)
                py = int(ny + (cy - ny) * beam_prog)
                draw.ellipse([px - 6, py - 6, px + 6, py + 6], fill=(255, 122, 0, node_alpha))

                cw, ch = 244, 88
                x0, y0 = nx - cw // 2, ny - ch // 2
                draw.rounded_rectangle(
                    [x0, y0, x0 + cw, y0 + ch],
                    radius=18,
                    fill=(255, 255, 255, min(250, node_alpha)),
                    outline=(t_rgb[0], t_rgb[1], t_rgb[2], node_alpha),
                    width=2,
                )
                draw.text((x0 + 14, y0 + 11), t_code, font=f_node_t, fill=(t_rgb[0], t_rgb[1], t_rgb[2], node_alpha))
                draw.text((x0 + 14, y0 + 33), t_author[:34], font=f_node_s, fill=(51, 65, 85, node_alpha))
                draw.rounded_rectangle([x0 + 14, y0 + 56, x0 + cw - 14, y0 + 77], radius=8, fill=(244, 248, 252, node_alpha))
                draw.text((x0 + 22, y0 + 60), t_pill, font=f_node_b, fill=(13, 37, 64, node_alpha))

        # Central Fusion & Large-Scale THE BEST BRAND Logo Transformation
        core_glow = int(76 + conv_p * 52 + math.sin(t * 4.0) * 6)
        draw.ellipse(
            [cx - core_glow - 16, cy - core_glow - 16, cx + core_glow + 16, cy + core_glow + 16],
            fill=(66, 110, 174, int(35 + conv_p * 55)),
        )

        if logo_img is not None:
            # Scales up dramatically as theories converge into the brand logo
            logo_sz = int(124 + conv_p * 86 + reveal_p * 24)
            logo_y_center = int(cy - reveal_p * 34)
            l_resized = logo_img.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
            mask = Image.new("L", (logo_sz, logo_sz), 0)
            ImageDraw.Draw(mask).rounded_rectangle([0, 0, logo_sz, logo_sz], radius=int(logo_sz * 0.24), fill=255)
            rounded_logo = Image.new("RGBA", (logo_sz, logo_sz), (0, 0, 0, 0))
            rounded_logo.paste(l_resized, (0, 0), mask)

            pad = 8
            draw.rounded_rectangle(
                [
                    cx - logo_sz // 2 - pad,
                    logo_y_center - logo_sz // 2 - pad,
                    cx + logo_sz // 2 + pad,
                    logo_y_center + logo_sz // 2 + pad,
                ],
                radius=int(logo_sz * 0.26),
                fill=(255, 255, 255, 255),
                outline=(255, 122, 0, 255) if conv_p > 0.45 else (66, 110, 174, 255),
                width=4,
            )
            img.alpha_composite(rounded_logo, (cx - logo_sz // 2, logo_y_center - logo_sz // 2))

        # When theories fuse (reveal_p > 0.05), unveil Monumental THE BEST BRAND Wordmark + 5-Pillar Badges
        if reveal_p > 0.05:
            alpha_rev = int(255 * reveal_p)
            wordmark_y = int(cy + 98 + (1.0 - reveal_p) * 20)
            draw.rounded_rectangle(
                [cx - 330, wordmark_y - 12, cx + 330, wordmark_y + 84],
                radius=22,
                fill=(255, 255, 255, min(248, alpha_rev)),
                outline=(13, 37, 64, alpha_rev),
                width=2,
            )
            draw.text((cx - 210, wordmark_y - 2), "THE BEST BRAND", font=f_brand_big, fill=(13, 37, 64, alpha_rev))
            draw.text(
                (cx - 245, wordmark_y + 48),
                "AURA · ALGORITHMIC BRAND IDENTITY ATELIER · +30 PAGES",
                font=f_brand_tag,
                fill=(255, 122, 0, alpha_rev),
            )

            # Left & Right floating synthesis cards
            lx, rx = int(52 - (1.0 - reveal_p) * 40), int(W - 352 + (1.0 - reveal_p) * 40)
            for bx, label, col_b in [
                (lx, cfg["left_card"], (66, 110, 174, alpha_rev)),
                (rx, cfg["right_card"], (255, 122, 0, alpha_rev)),
            ]:
                draw.rounded_rectangle([bx, cy - 72, bx + 300, cy + 32], radius=18, fill=(255, 255, 255, alpha_rev), outline=col_b, width=2)
                draw.text((bx + 18, cy - 48), label[:30], font=f_node_t, fill=(13, 37, 64, alpha_rev))
                draw.text((bx + 18, cy - 18), "Sinek · Watkins · Carlzon · Kaizen · Osgood", font=f_node_s, fill=(71, 85, 105, alpha_rev))

        # Bottom Stage Caption Bar
        draw.rounded_rectangle([76, H - 96, W - 76, H - 18], radius=20, fill=(255, 255, 255, 250), outline=(203, 213, 225, 255), width=2)
        if t < 4.4:
            stage_title, stage_desc = cfg["stage1_t"], cfg["stage1_d"]
        elif t < 7.2:
            stage_title, stage_desc = cfg["stage2_t"], cfg["stage2_d"]
        else:
            stage_title, stage_desc = cfg["stage3_t"], cfg["stage3_d"]

        draw.text((106, H - 84), stage_title, font=f_title, fill=(13, 37, 64, 255))
        draw.text((106, H - 48), stage_desc, font=f_sub, fill=(71, 85, 105, 255))

        frame_file = frames_dir / f"frame_{fidx:04d}.jpg"
        img.convert("RGB").save(frame_file, "JPEG", quality=92)

    hero_audio = synthesize_voice(cfg["narration"], lang, f"hero_conv_v105_{lang}")
    sfx = "" if lang == "es" else f"_{lang}"
    out_mp4 = VIDEOS_OUT_DIR / f"hero_convergence_thebestbrand{sfx}.mp4"
    poster_jpg = VIDEOS_OUT_DIR / f"poster_hero_convergence{sfx}.jpg"

    subprocess.run([
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", str(frames_dir / "frame_%04d.jpg"),
        "-i", str(hero_audio),
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
        "-c:a", "aac", "-b:a", "128k",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-shortest",
        str(out_mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    subprocess.run([
        "ffmpeg", "-y",
        "-ss", "00:00:08.50",
        "-i", str(out_mp4),
        "-frames:v", "1",
        "-q:v", "2",
        str(poster_jpg)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    shutil.copy2(out_mp4, API_VIDEOS_OUT_DIR / out_mp4.name)
    shutil.copy2(poster_jpg, API_VIDEOS_OUT_DIR / poster_jpg.name)
    print(f"  ✓ [{lang.upper()}] {out_mp4.name} & {poster_jpg.name} generados sin nombres internos")


def refresh_open_eyes_step_posters():
    """Extrae posters en un fotograma con ojos abiertos (2.25s) para los 42 videos de paso."""
    langs = ["es", "en", "fr", "pt", "de", "it"]
    count = 0
    for lang in langs:
        sfx = "" if lang == "es" else f"_{lang}"
        for step in range(7):
            mp4 = VIDEOS_OUT_DIR / f"capsula_teoria_paso_{step}{sfx}.mp4"
            poster = VIDEOS_OUT_DIR / f"poster_paso_{step}{sfx}.jpg"
            if mp4.exists():
                subprocess.run([
                    "ffmpeg", "-y",
                    "-ss", "00:00:02.25",
                    "-i", str(mp4),
                    "-frames:v", "1",
                    "-q:v", "2",
                    str(poster)
                ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                shutil.copy2(poster, API_VIDEOS_OUT_DIR / poster.name)
                count += 1
    print(f"  ✓ {count} posters de cápsulas actualizados con fotograma de ojos abiertos (t=2.25s)")


def sanitize_manifest_and_studio():
    """Elimina toda mención pública a HeyGen, NanoBanana, Nano Banana, Google Flow y Gemini."""
    manifest_path = VIDEOS_OUT_DIR / "capsules_manifest.json"
    if manifest_path.exists():
        txt = manifest_path.read_text(encoding="utf-8")
        txt = re.sub(r"HeyGen Founder Avatar \([^)]+\)", "The Best Brand Founder Avatar", txt)
        txt = re.sub(r"HeyGen", "The Best Brand Studio", txt, flags=re.IGNORECASE)
        txt = re.sub(r"Nano\s*Banana(\s*Pro|\s*2\.1)?", "Motor Vectorial The Best Brand", txt, flags=re.IGNORECASE)
        txt = re.sub(r"Visión Multimodal Gemini", "Visión Multimodal de Aura", txt, flags=re.IGNORECASE)
        txt = re.sub(r"Gemini Vision", "Aura Vision", txt, flags=re.IGNORECASE)
        txt = re.sub(r"Gemini", "Aura", txt)
        txt = re.sub(r"36\s*Láminas", "más de 30 páginas", txt, flags=re.IGNORECASE)
        txt = re.sub(r"30\s*Láminas", "más de 30 páginas", txt, flags=re.IGNORECASE)
        manifest_path.write_text(txt, encoding="utf-8")
        shutil.copy2(manifest_path, API_VIDEOS_OUT_DIR / manifest_path.name)
        print("  ✓ capsules_manifest.json sanitizado (cero nombres de herramientas internas)")


def main():
    print("=== 1. Generando los 6 Videos Hero de Convergencia (ES, EN, FR, PT, DE, IT) ===")
    with ThreadPoolExecutor(max_workers=3) as ex:
        futures = [ex.submit(render_hero_convergence_video, l) for l in ["es", "en", "fr", "pt", "de", "it"]]
        for f in futures:
            f.result()

    print("=== 2. Actualizando los 42 Posters de Cápsulas (ojos abiertos) ===")
    refresh_open_eyes_step_posters()

    print("=== 3. Sanitizando capsules_manifest.json ===")
    sanitize_manifest_and_studio()


if __name__ == "__main__":
    main()
