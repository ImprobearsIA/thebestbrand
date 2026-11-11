#!/usr/bin/env python3
"""
THEBESTBRAND — GENERADOR DE VIDEOS ILUSTRADOS DE CALIDAD DE AGENCIA MUNDIAL
Basado en Directiva Max C-00 (100% Lienzo Claro, Logo Oficial Convergence Wings,
Paleta Oficial #0D2540 / #426EAE / #FF7A00, y Voz Neural Aoede de Google Gemini).

Genera:
- 7 Videos Temáticos (Pasos 0 al 6) con Principios y Conclusiones de cada fase.
- 1 Video Maestro Panorámico (capsula_teoria_aura_recorrido.mp4).
- 8 Posters de Video en Alta Resolución (.jpg).
- Actualización certificada de capsules_manifest.json.
"""

import os
import sys
import json
import time
import base64
import hashlib
import subprocess
import urllib.request
import urllib.error
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
VIDEOS_OUT_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
CACHE_DIR = Path("/tmp/tbb_gemini_voice_cache")
FRAMES_DIR = Path("/tmp/tbb_video_frames")
CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FFMPEG_BIN = "/Users/oso/.gemini/antigravity/bin/ffmpeg"

if not os.path.exists(FFMPEG_BIN):
    FFMPEG_BIN = "ffmpeg"

VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
CACHE_DIR.mkdir(parents=True, exist_ok=True)
FRAMES_DIR.mkdir(parents=True, exist_ok=True)

# Cargar clave de Gemini
def get_gemini_key():
    env_file = WORKSPACE_ROOT / ".env"
    if env_file.exists():
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("GEMINI_API_KEY="):
                    k = line.split("=", 1)[1].strip().strip('"').strip("'")
                    if k:
                        return k
    return os.environ.get("GEMINI_API_KEY", "").strip()

GEMINI_API_KEY = get_gemini_key()

# ---------------------------------------------------------------------------
# SÍNTESIS DE AUDIO NEURAL GEMINI 2.5 FLASH TTS (VOZ AOEDE)
# ---------------------------------------------------------------------------
def synthesize_gemini_audio(text, clip_id):
    """Sintetiza la narración en español usando Gemini 2.5 Flash Preview TTS con voz Aoede."""
    h = hashlib.md5(f"aoede_{text}".encode("utf-8")).hexdigest()[:12]
    pcm_path = CACHE_DIR / f"{clip_id}_{h}.pcm"
    aac_path = CACHE_DIR / f"{clip_id}_{h}.m4a"

    if aac_path.exists() and aac_path.stat().st_size > 1000:
        return aac_path

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={GEMINI_API_KEY}"
    payload = {
        "contents": [{"parts": [{"text": text}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": "Aoede"
                    }
                }
            }
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
            audio_part = next((p.get("inlineData") for p in parts if "inlineData" in p), None)
            if not audio_part or not audio_part.get("data"):
                raise RuntimeError("No audio data returned from Gemini TTS")
            
            raw_bytes = base64.b64decode(audio_part["data"])
            with open(pcm_path, "wb") as pf:
                pf.write(raw_bytes)
            
            # Convertir PCM 24kHz a AAC en contenedor M4A
            cmd = [
                FFMPEG_BIN, "-y",
                "-f", "s16le", "-ar", "24000", "-ac", "1",
                "-i", str(pcm_path),
                "-c:a", "aac", "-b:a", "128k",
                str(aac_path)
            ]
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return aac_path
    except Exception as e:
        print(f"  [TTS Fallback say] Error Gemini TTS para '{clip_id}': {e}. Usando respaldo alta fidelidad...")
        # Fallback local say a AIFF y luego a AAC si falla conexión
        aiff_tmp = CACHE_DIR / f"{clip_id}_fallback.aiff"
        subprocess.run(["say", "-v", "Paulina", "-r", "165", "-o", str(aiff_tmp), text], check=True)
        subprocess.run([FFMPEG_BIN, "-y", "-i", str(aiff_tmp), "-c:a", "aac", "-b:a", "128k", str(aac_path)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return aac_path

def get_media_duration(file_path):
    """Obtiene la duración exacta en segundos con ffmpeg."""
    import re
    cmd = [FFMPEG_BIN, "-i", str(file_path)]
    res = subprocess.run(cmd, capture_output=True, text=True)
    match = re.search(r'Duration:\s*(\d+):(\d+):(\d+\.\d+)', res.stderr)
    if match:
        h, m, s = match.groups()
        return int(h) * 3600 + int(m) * 60 + float(s)
    return 10.0

# ---------------------------------------------------------------------------
# ILUSTRACIONES EDITORIALES SVG DE CALIDAD DE AGENCIA POR PASO Y ESCENA
# ---------------------------------------------------------------------------
def get_agency_illustration_svg(step, scene_idx):
    """Devuelve ilustración vectorial SVG de nivel agencia correspondiente a cada paso y momento."""
    if step == 0:
        if scene_idx == 0:
            # Principio: Génesis, Misión y Fundador
            return '''
            <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
              <rect x="20" y="30" width="220" height="170" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
              <rect x="36" y="46" width="188" height="24" rx="8" fill="#EFF6FF" stroke="#426EAE" stroke-width="1.5"/>
              <circle cx="52" cy="58" r="6" fill="#FF7A00"/>
              <text x="68" y="62" font-family="Montserrat" font-size="11" font-weight="800" fill="#0D2540">MISIÓN DEL NEGOCIO</text>
              <line x1="36" y1="90" x2="200" y2="90" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
              <line x1="36" y1="110" x2="180" y2="110" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
              <line x1="36" y1="130" x2="160" y2="130" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
              <rect x="36" y="152" width="100" height="28" rx="8" fill="#0D2540"/>
              <text x="86" y="170" font-family="Montserrat" font-size="10" font-weight="800" fill="#FFFFFF" text-anchor="middle">DEFINIR GIRO</text>
              
              <path d="M255 115 C275 95, 285 95, 305 115" stroke="#FF7A00" stroke-width="3" stroke-dasharray="6 4"/>
              <polygon points="308,115 300,110 300,120" fill="#FF7A00"/>

              <rect x="320" y="30" width="180" height="170" rx="18" fill="#FFFFFF" stroke="#426EAE" stroke-width="2.5"/>
              <circle cx="410" cy="95" r="42" fill="#FAF8F5" stroke="#FF7A00" stroke-width="2"/>
              <path d="M392 92 C396 74, 408 66, 414 66 C411 78, 408 88, 401 97 C395 97, 393 95, 392 92 Z" fill="#426EAE"/>
              <path d="M428 92 C424 74, 412 66, 406 66 C409 78, 412 88, 419 97 C425 97, 427 95, 428 92 Z" fill="#FF7A00"/>
              <text x="410" y="160" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540" text-anchor="middle">ATELIER C-00</text>
              <text x="410" y="178" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#FF7A00" text-anchor="middle">SISTEMA ACTIVO</text>
            </svg>
            '''
        elif scene_idx == 1:
            # Logo Actual: Mantener o Evolucionar
            return '''
            <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
              <rect x="30" y="40" width="180" height="150" rx="16" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 4"/>
              <text x="120" y="85" font-family="Montserrat" font-size="11" font-weight="800" fill="#64748B" text-anchor="middle">LOGO BASE ACTUAL</text>
              <circle cx="120" cy="125" r="26" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>
              <text x="120" y="130" font-family="Montserrat" font-size="14" font-weight="900" fill="#64748B" text-anchor="middle">PNG</text>
              
              <path d="M230 115 L280 115" stroke="#FF7A00" stroke-width="3"/>
              <polygon points="285,115 277,110 277,120" fill="#FF7A00"/>
              
              <rect x="300" y="30" width="190" height="170" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
              <text x="395" y="60" font-family="Montserrat" font-size="11" font-weight="900" fill="#0D2540" text-anchor="middle">EXTRACCIÓN VECTORIAL</text>
              <circle cx="360" cy="100" r="16" fill="#426EAE"/>
              <circle cx="400" cy="100" r="16" fill="#FF7A00"/>
              <circle cx="440" cy="100" r="16" fill="#0D2540"/>
              <rect x="330" y="135" width="130" height="34" rx="8" fill="#EFF6FF" stroke="#426EAE" stroke-width="1.5"/>
              <text x="395" y="156" font-family="Montserrat" font-size="10" font-weight="800" fill="#1D4ED8" text-anchor="middle">CAPITAL VISUAL OK</text>
            </svg>
            '''
        elif scene_idx == 2:
            # Giro que adapta todo el sistema
            return '''
            <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
              <rect x="30" y="30" width="200" height="170" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
              <text x="46" y="58" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540">GIRO Y ACTIVIDAD</text>
              <rect x="46" y="72" width="168" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1"/>
              <text x="56" y="94" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" fill="#475569">«Cafetería de especialidad</text>
              <text x="56" y="110" font-family="Plus Jakarta Sans" font-size="10" font-weight="600" fill="#475569">y panadería artesanal»</text>
              <rect x="46" y="145" width="168" height="36" rx="8" fill="#059669"/>
              <text x="130" y="167" font-family="Montserrat" font-size="11" font-weight="800" fill="#FFFFFF" text-anchor="middle">SÍNTESIS APROBADA</text>

              <path d="M245 115 L285 115" stroke="#FF7A00" stroke-width="3"/>
              
              <g transform="translate(300, 30)">
                <rect width="190" height="48" rx="10" fill="#FFFFFF" stroke="#426EAE" stroke-width="1.5"/>
                <text x="14" y="28" font-family="Montserrat" font-size="10" font-weight="800" fill="#0D2540">PASO 1 · PROPÓSITO</text>
                <text x="14" y="40" font-family="JetBrains Mono" font-size="8" font-weight="700" fill="#FF7A00">ADAPTADO AL GIRO</text>
                
                <rect y="58" width="190" height="48" rx="10" fill="#FFFFFF" stroke="#426EAE" stroke-width="1.5"/>
                <text x="14" y="86" font-family="Montserrat" font-size="10" font-weight="800" fill="#0D2540">PASO 2 · TOUCHPOINTS</text>
                <text x="14" y="98" font-family="JetBrains Mono" font-size="8" font-weight="700" fill="#FF7A00">CANALES Y PACKAGING</text>

                <rect y="116" width="190" height="48" rx="10" fill="#FFFFFF" stroke="#426EAE" stroke-width="1.5"/>
                <text x="14" y="144" font-family="Montserrat" font-size="10" font-weight="800" fill="#0D2540">PASO 5 · LOGOTIPO</text>
                <text x="14" y="156" font-family="JetBrains Mono" font-size="8" font-weight="700" fill="#FF7A00">SÍMBOLOS RELEVANTES</text>
              </g>
            </svg>
            '''
        else:
            # Conclusión: Continuidad y Multi-Dispositivo
            return '''
            <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
              <rect x="50" y="30" width="220" height="150" rx="16" fill="#FFFFFF" stroke="#0D2540" stroke-width="3"/>
              <rect x="65" y="45" width="190" height="95" rx="8" fill="#F8FAFC" stroke="#CBD5E1"/>
              <text x="160" y="95" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540" text-anchor="middle">ESCRITORIO MAC</text>
              <rect x="130" y="185" width="60" height="15" rx="3" fill="#94A3B8"/>
              <rect x="110" y="200" width="100" height="6" rx="3" fill="#CBD5E1"/>

              <rect x="320" y="55" width="90" height="150" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
              <rect x="330" y="70" width="70" height="110" rx="8" fill="#F8FAFC" stroke="#CBD5E1"/>
              <circle cx="365" cy="195" r="4" fill="#0D2540"/>
              <text x="365" y="125" font-family="Montserrat" font-size="9" font-weight="800" fill="#0D2540" text-anchor="middle">IPHONE</text>

              <path d="M280 110 C 295 90, 305 90, 315 110" stroke="#FF7A00" stroke-width="2.5" stroke-dasharray="4 3"/>
              <text x="440" y="120" font-family="Montserrat" font-size="11" font-weight="900" fill="#059669">SINCRONIZADO</text>
              <text x="440" y="136" font-family="JetBrains Mono" font-size="9" font-weight="700" fill="#64748B">LATENCIA &lt; 50ms</text>
            </svg>
            '''
    elif step == 1:
        # El Círculo Dorado (Simon Sinek)
        return '''
        <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
          <circle cx="200" cy="120" r="100" fill="#0D2540" opacity="0.08" stroke="#0D2540" stroke-width="2"/>
          <circle cx="200" cy="120" r="68" fill="#426EAE" opacity="0.15" stroke="#426EAE" stroke-width="2.5"/>
          <circle cx="200" cy="120" r="36" fill="#FF7A00" opacity="0.25" stroke="#FF7A00" stroke-width="3"/>
          <circle cx="200" cy="120" r="12" fill="#FF7A00"/>
          
          <text x="200" y="124" font-family="Montserrat" font-size="8" font-weight="900" fill="#FFFFFF" text-anchor="middle">POR QUÉ</text>
          <text x="200" y="70" font-family="Montserrat" font-size="9" font-weight="800" fill="#426EAE" text-anchor="middle">CÓMO</text>
          <text x="200" y="38" font-family="Montserrat" font-size="10" font-weight="800" fill="#0D2540" text-anchor="middle">QUÉ</text>

          <g transform="translate(330, 45)">
            <rect width="165" height="42" rx="10" fill="#FFFFFF" stroke="#FF7A00" stroke-width="2"/>
            <text x="14" y="22" font-family="Montserrat" font-size="10" font-weight="900" fill="#0D2540">PROPÓSITO NUCLEAR</text>
            <text x="14" y="34" font-family="JetBrains Mono" font-size="8" font-weight="700" fill="#FF7A00">SIMON SINEK</text>

            <rect y="52" width="165" height="42" rx="10" fill="#FFFFFF" stroke="#426EAE" stroke-width="1.5"/>
            <text x="14" y="74" font-family="Montserrat" font-size="10" font-weight="900" fill="#0D2540">PROPUESTA DE VALOR</text>
            <text x="14" y="86" font-family="JetBrains Mono" font-size="8" font-weight="700" fill="#426EAE">ALEX OSTERWALDER</text>

            <rect y="104" width="165" height="42" rx="10" fill="#FFFFFF" stroke="#0D2540" stroke-width="1.5"/>
            <text x="14" y="126" font-family="Montserrat" font-size="10" font-weight="900" fill="#0D2540">PLAN DE 3 PASOS</text>
            <text x="14" y="138" font-family="JetBrains Mono" font-size="8" font-weight="700" fill="#0D2540">DONALD MILLER</text>
          </g>
        </svg>
        '''
    elif step == 2:
        # Arquitectura de Touchpoints (Antes, Durante y Después)
        return '''
        <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
          <g transform="translate(30, 40)">
            <rect width="140" height="150" rx="16" fill="#FFFFFF" stroke="#426EAE" stroke-width="2.5"/>
            <circle cx="70" cy="45" r="22" fill="#EFF6FF" stroke="#426EAE" stroke-width="2"/>
            <text x="70" y="50" font-family="Montserrat" font-size="12" font-weight="900" fill="#426EAE" text-anchor="middle">1</text>
            <text x="70" y="90" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540" text-anchor="middle">ANTES</text>
            <text x="70" y="112" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Atracción &amp; Web</text>
            <text x="70" y="126" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Redes y Confianza</text>
          </g>

          <g transform="translate(190, 40)">
            <rect width="140" height="150" rx="16" fill="#FFFFFF" stroke="#FF7A00" stroke-width="2.5"/>
            <circle cx="70" cy="45" r="22" fill="#FFF7ED" stroke="#FF7A00" stroke-width="2"/>
            <text x="70" y="50" font-family="Montserrat" font-size="12" font-weight="900" fill="#FF7A00" text-anchor="middle">2</text>
            <text x="70" y="90" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540" text-anchor="middle">DURANTE</text>
            <text x="70" y="112" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Compra sin Fricción</text>
            <text x="70" y="126" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Momento de Verdad</text>
          </g>

          <g transform="translate(350, 40)">
            <rect width="140" height="150" rx="16" fill="#FFFFFF" stroke="#059669" stroke-width="2.5"/>
            <circle cx="70" cy="45" r="22" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
            <text x="70" y="50" font-family="Montserrat" font-size="12" font-weight="900" fill="#059669" text-anchor="middle">3</text>
            <text x="70" y="90" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540" text-anchor="middle">DESPUÉS</text>
            <text x="70" y="112" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Retención &amp; Portal</text>
            <text x="70" y="126" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Soporte y Lealtad</text>
          </g>
        </svg>
        '''
    elif step == 3:
        # Naming, Fonética y Clases de Niza
        return '''
        <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
          <rect x="30" y="30" width="260" height="170" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
          <text x="50" y="60" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540">SIMBOLISMO FONÉTICO</text>
          <path d="M50 110 Q 80 70, 110 110 T 170 110 T 230 110" stroke="#FF7A00" stroke-width="3" fill="none"/>
          <circle cx="110" cy="110" r="6" fill="#426EAE"/>
          <circle cx="170" cy="110" r="6" fill="#0D2540"/>
          <circle cx="230" cy="110" r="6" fill="#FF7A00"/>
          <text x="50" y="150" font-family="JetBrains Mono" font-size="10" font-weight="800" fill="#426EAE">2 A 3 SÍLABAS · MODELO SMILE</text>
          <text x="50" y="170" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B">Alexandra Watkins &amp; David Placek</text>

          <g transform="translate(315, 30)">
            <rect width="175" height="80" rx="14" fill="#FFFFFF" stroke="#426EAE" stroke-width="2"/>
            <text x="16" y="32" font-family="Montserrat" font-size="11" font-weight="900" fill="#0D2540">CLASES DE NIZA</text>
            <text x="16" y="50" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#059669">CLASE 09 · SOFTWARE</text>
            <text x="16" y="66" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#059669">CLASE 35 · NEGOCIOS</text>

            <rect y="90" width="175" height="80" rx="14" fill="#FFFFFF" stroke="#FF7A00" stroke-width="2"/>
            <text x="16" y="122" font-family="Montserrat" font-size="11" font-weight="900" fill="#0D2540">DESCRIPTOR OFICIAL</text>
            <text x="16" y="140" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#FF7A00">CLARIDAD EN 3 SEG</text>
            <text x="16" y="156" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B">Alina Wheeler</text>
          </g>
        </svg>
        '''
    elif step == 4:
        # Semiótica, Kansei y 7 Ejes
        return '''
        <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
          <g transform="translate(30, 30)">
            <rect width="210" height="170" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
            <text x="16" y="30" font-family="Montserrat" font-size="11" font-weight="900" fill="#0D2540">PSICOLOGÍA DE LA FORMA</text>
            <path d="M30 110 C30 70, 70 70, 70 110 C70 150, 110 150, 110 110" stroke="#426EAE" stroke-width="3.5" fill="none"/>
            <polygon points="140,110 165,70 190,110 165,150" stroke="#FF7A00" stroke-width="3" fill="none"/>
            <text x="35" y="155" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#426EAE">CURVAS KANSEI</text>
            <text x="135" y="155" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#FF7A00">PRECISIÓN</text>
          </g>

          <g transform="translate(260, 30)">
            <rect width="230" height="170" rx="18" fill="#FFFFFF" stroke="#426EAE" stroke-width="2"/>
            <text x="18" y="30" font-family="Montserrat" font-size="11" font-weight="900" fill="#0D2540">4 FAMILIAS ARQUITECTÓNICAS</text>
            
            <rect x="18" y="46" width="90" height="48" rx="8" fill="#EFF6FF" stroke="#426EAE"/>
            <text x="63" y="74" font-family="Montserrat" font-size="9" font-weight="800" fill="#0D2540" text-anchor="middle">MONOGRAMA</text>
            
            <rect x="122" y="46" width="90" height="48" rx="8" fill="#FFF7ED" stroke="#FF7A00"/>
            <text x="167" y="74" font-family="Montserrat" font-size="9" font-weight="800" fill="#0D2540" text-anchor="middle">EMBLEMA</text>

            <rect x="18" y="104" width="90" height="48" rx="8" fill="#F0FDF4" stroke="#059669"/>
            <text x="63" y="132" font-family="Montserrat" font-size="9" font-weight="800" fill="#0D2540" text-anchor="middle">CONTINUO</text>

            <rect x="122" y="104" width="90" height="48" rx="8" fill="#F8FAFC" stroke="#0D2540"/>
            <text x="167" y="132" font-family="Montserrat" font-size="9" font-weight="800" fill="#0D2540" text-anchor="middle">VOLUMEN 3D</text>
          </g>
        </svg>
        '''
    elif step == 5:
        # Taller de Logotipo & Atelier Visual
        return '''
        <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
          <rect x="30" y="30" width="280" height="170" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
          <text x="50" y="58" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540">LOCKUP PRINCIPAL EN CURVAS</text>
          
          <!-- Logo TheBestBrand en curvas -->
          <g transform="translate(60, 80)">
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
              <path d="M18 52 C22 28, 42 16, 50 16 C46 32, 42 46, 32 58 C24 58, 20 56, 18 52 Z" fill="#426EAE"/>
              <path d="M82 52 C78 28, 58 16, 50 16 C54 32, 58 46, 68 58 C76 58, 80 56, 82 52 Z" fill="#FF7A00"/>
              <rect x="44" y="36" width="12" height="46" rx="4" fill="#0D2540"/>
              <path d="M44 38 H64 C70 38, 74 42, 74 48 C74 54, 70 58, 64 58 H44 Z" fill="#0D2540" opacity="0.95"/>
            </svg>
            <text x="60" y="24" font-family="Montserrat" font-size="16" font-weight="900" fill="#0D2540">THEBESTBRAND</text>
            <text x="60" y="38" font-family="JetBrains Mono" font-size="8" font-weight="800" fill="#FF7A00" letter-spacing="1.5">LUXURY ATELIER</text>
          </g>

          <text x="50" y="165" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#059669">TEST DE RAND · 100% CONTRASTE</text>
          <text x="50" y="180" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B">Paul Rand &amp; Sagi Haviv</text>

          <g transform="translate(330, 30)">
            <rect width="160" height="170" rx="18" fill="#FFFFFF" stroke="#426EAE" stroke-width="2"/>
            <text x="80" y="55" font-family="Montserrat" font-size="10" font-weight="900" fill="#0D2540" text-anchor="middle">ÍCONO APP 1:1</text>
            <rect x="45" y="70" width="70" height="70" rx="18" fill="#0D2540"/>
            <svg x="55" y="80" width="50" height="50" viewBox="0 0 100 100" fill="none">
              <path d="M18 52 C22 28, 42 16, 50 16 C46 32, 42 46, 32 58 C24 58, 20 56, 18 52 Z" fill="#426EAE"/>
              <path d="M82 52 C78 28, 58 16, 50 16 C54 32, 58 46, 68 58 C76 58, 80 56, 82 52 Z" fill="#FF7A00"/>
              <rect x="44" y="36" width="12" height="46" rx="4" fill="#FFFFFF"/>
            </svg>
            <text x="80" y="165" font-family="JetBrains Mono" font-size="8" font-weight="800" fill="#FF7A00" text-anchor="middle">LIQUID GLASS</text>
          </g>
        </svg>
        '''
    else:
        # Brandbook de 30 Láminas (Paso 6)
        return '''
        <svg viewBox="0 0 520 240" fill="none" class="agency-illu">
          <g transform="translate(30, 30)">
            <rect width="250" height="170" rx="18" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
            <text x="20" y="35" font-family="Montserrat" font-size="12" font-weight="900" fill="#0D2540">MANUAL DE 30 LÁMINAS</text>
            <g transform="translate(20, 50)">
              <rect x="0" y="0" width="55" height="38" rx="4" fill="#EFF6FF" stroke="#426EAE" stroke-width="1.5"/>
              <rect x="65" y="0" width="55" height="38" rx="4" fill="#EFF6FF" stroke="#426EAE" stroke-width="1.5"/>
              <rect x="130" y="0" width="55" height="38" rx="4" fill="#EFF6FF" stroke="#426EAE" stroke-width="1.5"/>
              <rect x="0" y="46" width="55" height="38" rx="4" fill="#FFF7ED" stroke="#FF7A00" stroke-width="1.5"/>
              <rect x="65" y="46" width="55" height="38" rx="4" fill="#FFF7ED" stroke="#FF7A00" stroke-width="1.5"/>
              <rect x="130" y="46" width="55" height="38" rx="4" fill="#FFF7ED" stroke="#FF7A00" stroke-width="1.5"/>
            </g>
            <text x="20" y="155" font-family="JetBrains Mono" font-size="9" font-weight="800" fill="#0D2540">DIRECTIVA C-00 · GUÍA OFICIAL</text>
            <text x="20" y="170" font-family="Plus Jakarta Sans" font-size="9" font-weight="700" fill="#64748B">Massimo Vignelli &amp; ImproBears</text>
          </g>

          <g transform="translate(300, 30)">
            <rect width="190" height="170" rx="18" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
            <text x="20" y="35" font-family="Montserrat" font-size="11" font-weight="900" fill="#0D2540">FORMATOS LISTOS</text>
            
            <rect x="20" y="50" width="150" height="32" rx="8" fill="#F0FDF4" stroke="#059669"/>
            <text x="35" y="70" font-family="Montserrat" font-size="10" font-weight="800" fill="#047857">PDF VECTOR 30 LÁMINAS</text>

            <rect x="20" y="90" width="150" height="32" rx="8" fill="#EFF6FF" stroke="#426EAE"/>
            <text x="35" y="110" font-family="Montserrat" font-size="10" font-weight="800" fill="#1D4ED8">HTML AUTÓNOMO</text>

            <rect x="20" y="130" width="150" height="32" rx="8" fill="#FFF7ED" stroke="#FF7A00"/>
            <text x="35" y="150" font-family="Montserrat" font-size="10" font-weight="800" fill="#B45309">SVG CURVAS BÉZIER</text>
          </g>
        </svg>
        '''

# ---------------------------------------------------------------------------
# GENERADOR DE CÓDIGO HTML PARA RENDERIZAR FOTOGRAMAS HD 1280x720
# ---------------------------------------------------------------------------
def build_frame_html(step_meta, scene, scene_idx, author_quote):
    step_num = step_meta["step"]
    title = step_meta["title"]
    phase_tag = scene["phase_tag"]
    headline = scene["headline"]
    author_name = step_meta["author_name"]
    illu_svg = get_agency_illustration_svg(step_num, scene_idx)

    return f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap');
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{
  width: 1280px; height: 720px; overflow: hidden;
  background: #FAF8F5; color: #0D2540;
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative; display: flex; flex-direction: column;
  justify-content: space-between; padding: 22px 42px;
}}
.bg-art {{
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
}}
.header {{
  position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 2px solid #E2E8F0; padding-bottom: 12px;
}}
.brand-identity {{
  display: flex; align-items: center; gap: 14px;
}}
.logo-icon {{
  width: 44px; height: 44px;
}}
.brand-title {{
  font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #0D2540; letter-spacing: 0.5px;
}}
.brand-sub {{
  font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 800; color: #FF7A00; letter-spacing: 2px;
}}
.badge-step {{
  background: #FFFFFF; border: 1.5px solid #0D2540; border-left: 5px solid #FF7A00;
  padding: 6px 16px; border-radius: 999px; font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 800; color: #0D2540;
}}
.content-grid {{
  position: relative; z-index: 2; display: grid; grid-template-columns: 1.15fr 0.85fr;
  gap: 28px; flex: 1; margin: 16px 0; align-items: stretch;
}}
.left-card {{
  background: #FFFFFF; border: 2px solid #CBD5E1; border-left: 6px solid #FF7A00;
  border-radius: 20px; padding: 24px 28px; display: flex; flex-direction: column;
  justify-content: space-between; box-shadow: 0 10px 30px rgba(13,37,64,0.06);
}}
.phase-tag {{
  font-family: 'JetBrains Mono', monospace; font-size: 11.5px; font-weight: 800;
  color: #FF7A00; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;
}}
.headline {{
  font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900;
  color: #0D2540; line-height: 1.22; margin-bottom: 12px;
}}
.illustration-box {{
  background: #FAF8F5; border: 1.5px solid #E2E8F0; border-radius: 16px;
  padding: 12px; flex: 1; display: flex; align-items: center; justify-content: center;
}}
.agency-illu {{
  width: 100%; height: 100%; max-height: 230px;
}}
.right-card {{
  background: linear-gradient(145deg, #0D2540 0%, #173860 100%);
  border-radius: 20px; padding: 26px; color: #FFFFFF;
  display: flex; flex-direction: column; justify-content: space-between;
  box-shadow: 0 10px 30px rgba(13,37,64,0.15); border: 2px solid #426EAE;
}}
.footer-bar {{
  position: relative; z-index: 2; display: flex; justify-content: space-between;
  align-items: center; padding-top: 10px; border-top: 1.5px solid #E2E8F0;
  font-size: 12px; font-weight: 700; color: #707070;
}}
</style>
</head>
<body>
<svg class="bg-art" viewBox="0 0 1280 720" fill="none">
  <path d="M0 450 Q 320 380, 640 470 T 1280 430 L 1280 720 L 0 720 Z" fill="#F1F5F9" opacity="0.7"/>
  <path d="M0 520 Q 340 460, 680 540 T 1280 500 L 1280 720 L 0 720 Z" fill="#E6ECEF" opacity="0.5"/>
  <circle cx="1180" cy="120" r="180" fill="#FF7A00" opacity="0.04"/>
</svg>
<div class="header">
  <div class="brand-identity">
    <svg class="logo-icon" viewBox="0 0 100 100" fill="none">
      <path d="M18 52 C22 28, 42 16, 50 16 C46 32, 42 46, 32 58 C24 58, 20 56, 18 52 Z" fill="#426EAE"/>
      <path d="M82 52 C78 28, 58 16, 50 16 C54 32, 58 46, 68 58 C76 58, 80 56, 82 52 Z" fill="#FF7A00"/>
      <rect x="44" y="36" width="12" height="46" rx="4" fill="#0D2540"/>
      <path d="M44 38 H64 C70 38, 74 42, 74 48 C74 54, 70 58, 64 58 H44 Z" fill="#0D2540" opacity="0.95"/>
    </svg>
    <div>
      <div class="brand-title">THEBESTBRAND</div>
      <div class="brand-sub">LUXURY BRAND IDENTITY ATELIER</div>
    </div>
  </div>
  <div class="badge-step">PASO {step_num} · {title.upper()[:40]}</div>
</div>

<div class="content-grid">
  <div class="left-card">
    <div>
      <div class="phase-tag">{phase_tag}</div>
      <div class="headline">{headline}</div>
    </div>
    <div class="illustration-box">
      {illu_svg}
    </div>
  </div>

  <div class="right-card">
    <div>
      <div style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#FF7A00; letter-spacing:1px; margin-bottom:8px;">DICTAMEN METODOLÓGICO</div>
      <div style="font-family:'Montserrat', sans-serif; font-size:22px; font-weight:900; line-height:1.2; margin-bottom:12px;">{author_name}</div>
      <p style="font-size:14px; line-height:1.55; color:#E2E8F0; font-weight:500;">
        «{author_quote}»
      </p>
    </div>
    <div style="background:rgba(255,255,255,0.08); border-radius:12px; padding:14px; border:1px solid rgba(255,255,255,0.15);">
      <div style="font-size:11px; font-weight:800; color:#38BDF8; margin-bottom:4px;">ARQUITECTURA DE MARCA</div>
      <div style="font-size:12px; color:#FFFFFF; font-weight:600;">{scene.get('body_text', '')[:100]}...</div>
    </div>
  </div>
</div>

<div class="footer-bar">
  <span>CONSTITUCIÓN DIRECTIVA MAX C-00 · 100% LIENZO CLARO</span>
  <span style="font-family:'JetBrains Mono', monospace; color:#0D2540; font-weight:800;">THEBESTBRAND · ESTÁNDAR DE AGENCIA MUNDIAL</span>
</div>
</body>
</html>'''

# ---------------------------------------------------------------------------
# RENDERIZADO DE FOTOGRAMA CON CHROME HEADLESS
# ---------------------------------------------------------------------------
def render_frame_image(html_str, out_png_path):
    tmp_html = out_png_path.with_suffix(".html")
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_str)
    
    cmd = [
        CHROME_BIN,
        "--headless",
        "--disable-gpu",
        f"--screenshot={out_png_path}",
        "--window-size=1280,720",
        str(tmp_html)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        tmp_html.unlink()
    except Exception:
        pass

# ---------------------------------------------------------------------------
# CODIFICACIÓN DE VIDEO MP4 POR ESCENA Y CONCATENACIÓN POR PASO
# ---------------------------------------------------------------------------
def generate_clip_mp4(frame_png, audio_m4a, out_clip_mp4):
    dur = get_media_duration(audio_m4a)
    cmd = [
        FFMPEG_BIN, "-y",
        "-loop", "1",
        "-i", str(frame_png),
        "-i", str(audio_m4a),
        "-c:v", "h264_videotoolbox",
        "-b:v", "2200k",
        "-pix_fmt", "yuv420p",
        "-r", "24",
        "-t", str(dur),
        "-c:a", "aac",
        "-b:a", "128k",
        "-shortest",
        str(out_clip_mp4)
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        # Fallback a libopenh264 si videotoolbox no estuviera disponible
        cmd[8] = "libopenh264"
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def concat_clips_to_step_video(clip_paths, out_step_mp4):
    list_txt = CACHE_DIR / f"concat_{out_step_mp4.stem}.txt"
    with open(list_txt, "w") as f:
        for p in clip_paths:
            f.write(f"file '{p.resolve()}'\n")
    
    cmd = [
        FFMPEG_BIN, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(list_txt),
        "-c", "copy",
        "-movflags", "+faststart",
        str(out_step_mp4)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        list_txt.unlink()
    except Exception:
        pass

# ---------------------------------------------------------------------------
# PIPELINE PRINCIPAL
# ---------------------------------------------------------------------------
def main():
    print("=====================================================================")
    print("THEBESTBRAND — GENERADOR DE VIDEOS DE AGENCIA EN ESTILO ILUSTRACIÓN")
    print("=====================================================================")

    manifest_path = VIDEOS_OUT_DIR / "capsules_manifest.json"
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    updated_manifest = []

    for item in manifest:
        step_num = item["step"]
        print(f"\n[PASO {step_num}] Compilando cápsula de video ilustrada: {item['title']}")
        clip_mp4_paths = []
        step_total_dur = 0.0

        for s_idx, scene in enumerate(item["scenes"]):
            clip_id = f"step_{step_num}_clip_{s_idx}"
            print(f"  -> Clip {s_idx+1}/4: {scene['headline'][:45]}...")
            
            # 1. Síntesis de voz Gemini
            narr = scene["narration"]
            audio_m4a = synthesize_gemini_audio(narr, clip_id)
            c_dur = get_media_duration(audio_m4a)
            step_total_dur += c_dur
            print(f"     Audio: {c_dur:.1f}s (Gemini Neural TTS)")

            # 2. Renderizado de fotograma ilustrado
            author_quote = scene.get("body_text", "")
            frame_html = build_frame_html(item, scene, s_idx, author_quote)
            frame_png = FRAMES_DIR / f"{clip_id}.png"
            render_frame_image(frame_html, frame_png)

            # 3. Guardar póster para el clip 0 del paso
            if s_idx == 0:
                poster_jpg = VIDEOS_OUT_DIR / f"poster_paso_{step_num}.jpg"
                cmd_p = [
                    FFMPEG_BIN, "-y",
                    "-i", str(frame_png),
                    "-q:v", "2",
                    str(poster_jpg)
                ]
                subprocess.run(cmd_p, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

            # 4. Codificar clip MP4
            clip_mp4 = CACHE_DIR / f"{clip_id}.mp4"
            generate_clip_mp4(frame_png, audio_m4a, clip_mp4)
            clip_mp4_paths.append(clip_mp4)

        # 5. Concatenar clips en el video final del paso
        final_mp4 = VIDEOS_OUT_DIR / f"capsula_teoria_paso_{step_num}.mp4"
        concat_clips_to_step_video(clip_mp4_paths, final_mp4)
        v_size_kb = round(final_mp4.stat().st_size / 1024, 1)
        real_dur = get_media_duration(final_mp4)
        print(f"  ==> Video generado: {final_mp4.name} ({real_dur:.1f}s, {v_size_kb} KB)")

        item_copy = dict(item)
        item_copy["duration_sec"] = round(real_dur, 1)
        item_copy["size_kb"] = v_size_kb
        updated_manifest.append(item_copy)

    # 6. Generar video maestro Aura Recorrido (capsula_teoria_aura_recorrido.mp4)
    print("\n[MASTER TOUR] Generando capsula_teoria_aura_recorrido.mp4...")
    all_first_clips = [CACHE_DIR / f"step_{s}_clip_0.mp4" for s in range(7)]
    master_mp4 = VIDEOS_OUT_DIR / "capsula_teoria_aura_recorrido.mp4"
    concat_clips_to_step_video(all_first_clips, master_mp4)
    
    # Poster del master tour
    poster_aura = VIDEOS_OUT_DIR / "poster_aura_recorrido.jpg"
    cmd_pa = [
        FFMPEG_BIN, "-y",
        "-i", str(FRAMES_DIR / "step_0_clip_0.png"),
        "-q:v", "2",
        str(poster_aura)
    ]
    subprocess.run(cmd_pa, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"  ==> Master Tour generado: {master_mp4.name} ({get_media_duration(master_mp4):.1f}s)")

    # 7. Guardar manifest actualizado
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(updated_manifest, f, indent=2, ensure_ascii=False)
    print("\nManifest actualizado en:", manifest_path)
    print("Videos de agencia completados con éxito 100%.")

if __name__ == "__main__":
    main()
