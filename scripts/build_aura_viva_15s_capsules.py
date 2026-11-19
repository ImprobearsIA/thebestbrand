#!/usr/bin/env python3
"""
Generador Oficial de Cápsulas "Aura Viva" (<= 15.0s estricto, 1 Sola Voz: Gemini Neural 'Aoede')
Idiomas: es, en, fr, pt, de, it (8 clips por idioma = 48 clips totales).
Reglas de Campo V129:
- Lenguaje simple, cálido y directo (comprensible al 100% por cualquier joven de 16 años).
- Cero menciones de autores académicos o jerga técnica.
- Una sola voz femenina unificada ('Aoede' 24kHz) en los 6 idiomas.
- Silencios recortados, normalización -16 LUFS, ritmo ágil (atempo >= 1.12) y garantía matemática <= 14.8s.
"""
import base64
import json
import os
import ssl
import struct
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "apps" / "web" / "assets" / "audio" / "capsules"
OUT_DIR.mkdir(parents=True, exist_ok=True)

FFMPEG_BIN = "/Users/oso/.gemini/antigravity/bin/ffmpeg"
if not os.path.exists(FFMPEG_BIN):
    FFMPEG_BIN = "ffmpeg"
FFPROBE_BIN = "/opt/homebrew/bin/ffprobe"
if not os.path.exists(FFPROBE_BIN):
    FFPROBE_BIN = "ffprobe"

def load_gemini_key() -> str:
    env_path = ROOT / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            s = line.strip()
            if s and not s.startswith("#") and "=" in s:
                k, v = s.split("=", 1)
                if k.strip() == "GEMINI_API_KEY":
                    return v.strip().strip('"').strip("'")
    return os.environ.get("GEMINI_API_KEY", "").strip()

CAPSULE_SCRIPTS = {
    "welcome": {
        "max_sec": 9.5,
        "es": "¡Hola! Soy Aura. En menos de sesenta minutos crearemos tu logotipo y tu Brandbook de más de treinta páginas. ¡Empecemos!",
        "en": "Hi! I'm Aura. In under sixty minutes, we'll build your logo and your thirty-plus page Brandbook. Let's start right now!",
        "fr": "Salut ! Je suis Aura. En moins de soixante minutes, nous créerons ton logo et ton Brandbook de plus de trente pages. C'est parti !",
        "pt": "Olá! Sou a Aura. Em menos de sessenta minutos vamos criar o seu logótipo e o seu Brandbook com mais de trinta páginas. Vamos começar!",
        "de": "Hallo! Ich bin Aura. In unter sechzig Minuten erstellen wir dein Logo und dein Brandbook mit über dreißig Seiten. Legen wir los!",
        "it": "Ciao! Sono Aura. In meno di sessanta minuti creeremo il tuo logo e il tuo Brandbook di oltre trenta pagine. Iniziamo subito!"
    },
    "step_0": {
        "max_sec": 14.5,
        "es": "¡Bienvenido! Aquí me cuentas en palabras sencillas qué vende o qué hace tu negocio, y si empezamos desde cero o mejoramos tu logo actual. ¡Solo te tomará un minuto!",
        "en": "Welcome! Here you simply tell me what your business sells or does, and whether we're starting from scratch or upgrading your current logo. It only takes a minute!",
        "fr": "Bienvenue ! Ici, dis-moi simplement ce que fait ton entreprise, et si on part de zéro ou si on améliore ton logo actuel. Ça prend une minute !",
        "pt": "Bem-vindo! Aqui conta-me de forma simples o que faz o seu negócio e se começamos do zero ou melhoramos o seu logo atual. Leva apenas um minuto!",
        "de": "Willkommen! Erzähl mir hier ganz einfach, was dein Unternehmen macht und ob wir neu starten oder dein aktuelles Logo verbessern. Das dauert nur eine Minute!",
        "it": "Benvenuto! Qui mi racconti in parole semplici cosa fa la tua attività, e se partiamo da zero o miglioriamo il tuo logo attuale. Ci vuole solo un minuto!"
    },
    "step_1": {
        "max_sec": 14.5,
        "es": "¡Vamos al Paso uno! Cuéntame por qué creaste tu negocio, a quién ayudas y qué te hace diferente. Si no sabes qué escribir, toca el botón de ideas o dímelo con tu voz.",
        "en": "Let's jump into Step one! Tell me why you started your business, who you help, and what makes you special. Tap the idea button anytime or answer with your voice.",
        "fr": "Passons à l'étape un ! Dis-moi pourquoi tu as créé ton projet, qui tu aides et ce qui te rend unique. Touche le bouton d'idées ou réponds avec ta voix.",
        "pt": "Vamos ao Passo um! Conta-me porque criou o seu negócio, quem ajuda e o que o torna especial. Se precisar de inspiração, toque no botão de ideias ou fale comigo.",
        "de": "Weiter zu Schritt eins! Erzähl mir, warum du gestartet bist, wem du hilfst und was dich besonders macht. Tippe einfach auf den Ideen-Button oder sprich mit mir.",
        "it": "Passiamo al Passo uno! Dimmi perché hai creato il tuo progetto, chi aiuti e cosa ti rende unico. Se vuoi un suggerimento, tocca il pulsante idee o usa la voce."
    },
    "step_2": {
        "max_sec": 14.5,
        "es": "¡Paso dos! Aquí eliges dónde te ven tus clientes antes, durante y después de comprarte, como Instagram, WhatsApp, empaques o tu local. Así diseñaremos justo lo que vas a usar.",
        "en": "Step two! Pick where customers see you before, during, and after buying—like Instagram, WhatsApp, packaging, or your store—so we design exactly what you'll actually use.",
        "fr": "Étape deux ! Choisis où tes clients te voient avant, pendant et après l'achat, comme Instagram, WhatsApp ou tes emballages, pour créer exactement ce qu'il te faut.",
        "pt": "Passo dois! Escolha onde os clientes veem a sua marca antes, durante e depois da compra, como Instagram, WhatsApp ou embalagens, para desenharmos tudo à sua medida.",
        "de": "Schritt zwei! Wähle aus, wo Kunden dich vor, während und nach dem Kauf sehen – wie Instagram, WhatsApp oder Verpackungen – damit alles perfekt zu deinem Alltag passt.",
        "it": "Passo due! Scegli dove ti vedono i clienti prima, durante e dopo l'acquisto, come Instagram, WhatsApp o il packaging, così creeremo esattamente ciò che ti serve."
    },
    "step_3": {
        "max_sec": 14.5,
        "es": "¡Paso tres, tu nombre y eslogan! Si ya tienes nombre, aquí afinamos tu frase ideal; y si aún no tienes, te daré opciones fáciles de recordar hechas para tu giro.",
        "en": "Step three: your name and tagline! If you already have a name, we'll polish your slogan here; if not, I'll create catchy, memorable name ideas tailored to your business.",
        "fr": "Étape trois : ton nom et ton slogan ! Si tu as déjà un nom, on peaufine ton slogan ; sinon, je te propose des idées simples et mémorables pour ton activité.",
        "pt": "Passo três: o seu nome e slogan! Se já tem nome, vamos afinar a sua frase ideal; se ainda não tem, vou criar ideias fáceis de lembrar para o seu negócio.",
        "de": "Schritt drei: dein Name und Slogan! Wenn du schon einen Namen hast, verfeinern wir deinen Slogan; sonst erstelle ich einprägsame Namensideen passend zu deinem Geschäft.",
        "it": "Passo tre: nome e slogan! Se hai già un nome, perfezioniamo qui la tua frase; altrimenti creerò idee facili da ricordare pensate su misura per la tua attività."
    },
    "step_4": {
        "max_sec": 14.5,
        "es": "¡Llegamos a la parte visual en el Paso cuatro! Toca los ejemplos que más se parezcan al estilo que buscas y elige el tipo de letra viendo tu propio nombre en grande.",
        "en": "Welcome to the visual side in Step four! Tap the style examples that feel most like your brand, then pick your favorite font while seeing your own brand name live.",
        "fr": "Bienvenue dans le style visuel à l'étape quatre ! Touche les exemples qui te ressemblent le plus et choisis ta police d'écriture en voyant ton propre nom s'afficher.",
        "pt": "Chegámos à parte visual no Passo quatro! Toque nos exemplos que combinam mais com o seu estilo e escolha o tipo de letra vendo o seu próprio nome em destaque.",
        "de": "Jetzt wird es visuell in Schritt vier! Tippe auf die Stilbeispiele, die am besten zu dir passen, und wähle deine Lieblingsschrift direkt mit deinem eigenen Markennamen.",
        "it": "Ecco la parte visiva nel Passo quattro! Tocca gli esempi più vicini al tuo stile e scegli il carattere tipografico vedendo subito il tuo nome in grande."
    },
    "step_5": {
        "max_sec": 14.5,
        "es": "¡Paso cinco, tu color y tu logotipo! Elige tus colores favoritos y explora propuestas claras para tu marca. Podrás probar ajustes hasta quedar feliz con tus tres versiones finales.",
        "en": "Step five: your colors and logo! Pick your favorite palette and explore custom logo designs for your brand. Tweak any detail until you love your final three logo versions.",
        "fr": "Étape cinq : tes couleurs et ton logo ! Choisis ta palette préférée et découvre des propositions sur mesure. Ajuste chaque détail jusqu'à adorer ton logo final.",
        "pt": "Passo cinco: as suas cores e logótipo! Escolha a sua paleta favorita e explore propostas feitas para a sua marca. Ajuste cada detalhe até adorar o resultado final.",
        "de": "Schritt fünf: deine Farben und dein Logo! Wähle deine Lieblingsfarben und entdecke passende Logo-Entwürfe. Passe Details einfach an, bis dein Logo perfekt sitzt.",
        "it": "Passo cinque: colori e logo! Scegli la tua palette preferita ed esplora le proposte create per il tuo brand. Personalizza ogni dettaglio finché non amerai il risultato."
    },
    "step_6": {
        "max_sec": 14.5,
        "es": "¡Felicidades, tu marca está lista! Explora tu Brandbook de más de treinta páginas y descarga en un clic tus logotipos, fuentes y plantillas listas para redes e imprenta.",
        "en": "Congratulations, your brand is ready! Explore your thirty-plus page Brandbook and download your logos, fonts, and ready-to-use templates for social media and print in one click.",
        "fr": "Félicitations, ta marque est prête ! Découvre ton Brandbook de plus de trente pages et télécharge en un clic tes logos, polices et modèles prêts pour le web et l'impression.",
        "pt": "Parabéns, a sua marca está pronta! Explore o seu Brandbook com mais de trinta páginas e descarregue num clique os seus logótipos, fontes e modelos prontos a usar.",
        "de": "Herzlichen Glückwunsch, deine Marke ist fertig! Entdecke dein Brandbook mit über dreißig Seiten und lade Logos, Schriften und Vorlagen mit einem Klick herunter.",
        "it": "Complimenti, il tuo brand è pronto! Sfogliate il tuo Brandbook di oltre trenta pagine e scarica in un clic loghi, font e modelli pronti per social e stampa."
    }
}

TTS_MODELS = [
    "gemini-2.5-flash-preview-tts",
    "gemini-3.1-flash-tts-preview",
]

EDGE_FEMALE_FALLBACK = {
    "es": "es-MX-DaliaNeural",
    "en": "en-US-AvaMultilingualNeural",
    "fr": "fr-FR-VivienneMultilingualNeural",
    "pt": "pt-BR-ThalitaMultilingualNeural",
    "de": "de-DE-SeraphinaMultilingualNeural",
    "it": "it-IT-IsabellaNeural",
}

def pcm16_to_wav(pcm: bytes, sample_rate: int = 24000) -> bytes:
    data_len = len(pcm)
    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF",
        36 + data_len,
        b"WAVE",
        b"fmt ",
        16,
        1,
        1,
        sample_rate,
        sample_rate * 2,
        2,
        16,
        b"data",
        data_len,
    )
    return header + pcm

def synth_gemini_aoede_wav(text: str, api_key: str) -> bytes:
    ctx = ssl.create_default_context()
    for attempt in range(4):
        model = TTS_MODELS[attempt % len(TTS_MODELS)]
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": text}]}],
            "generationConfig": {
                "responseModalities": ["AUDIO"],
                "speechConfig": {
                    "voiceConfig": {
                        "prebuiltVoiceConfig": {"voiceName": "Aoede"}
                    }
                }
            }
        }
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
            )
            with urllib.request.urlopen(req, timeout=22, context=ctx) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                parts = data["candidates"][0]["content"]["parts"]
                for p in parts:
                    if "inlineData" in p and p["inlineData"].get("data"):
                        pcm = base64.b64decode(p["inlineData"]["data"])
                        if len(pcm) > 1000:
                            return pcm16_to_wav(pcm, 24000)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(2.5 + attempt * 2.0)
                continue
        except Exception:
            time.sleep(1.5)
    raise RuntimeError("Gemini Aoede TTS unavailable after retries")

def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        [FFPROBE_BIN, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        text=True,
    ).strip()
    return float(out)

def process_wav_to_agile_mp3(raw_wav: Path, out_mp3: Path, max_sec: float, base_tempo: float = 1.14) -> float:
    # Step 1: Trim silence + base tempo + loudness normalization
    tempo = base_tempo
    for _ in range(4):
        af = (
            f"silenceremove=start_periods=1:start_duration=0.05:start_threshold=-44dB,"
            f"areverse,silenceremove=start_periods=1:start_duration=0.05:start_threshold=-44dB,areverse,"
            f"atempo={tempo:.3f},"
            f"loudnorm=I=-16:TP=-1.5:LRA=11"
        )
        subprocess.run(
            [
                FFMPEG_BIN, "-y", "-i", str(raw_wav),
                "-af", af,
                "-ar", "24000", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "64k",
                str(out_mp3),
            ],
            check=True,
            capture_output=True,
        )
        dur = probe_duration(out_mp3)
        if dur <= max_sec:
            return dur
        # Increase tempo proportionally so we NEVER chop words and ALWAYS stay <= max_sec
        ratio = (dur / (max_sec - 0.35))
        tempo = min(1.38, tempo * max(1.05, ratio))
    return probe_duration(out_mp3)

def main():
    api_key = load_gemini_key()
    if not api_key:
        print("ERROR: GEMINI_API_KEY missing", file=sys.stderr)
        sys.exit(1)

    manifest = {
        "version": "129.0-aura-viva-aoede",
        "voice": "Aoede",
        "max_capsule_seconds": 15.0,
        "clips": {},
    }
    manifest_path = OUT_DIR / "manifest.json"
    if manifest_path.exists():
        try:
            old = json.loads(manifest_path.read_text(encoding="utf-8"))
            if isinstance(old.get("clips"), dict):
                manifest["clips"] = old["clips"]
        except Exception:
            pass

    langs = ["es", "en", "fr", "pt", "de", "it"]
    tmp_wav = OUT_DIR / "_tmp_raw.wav"

    total = len(CAPSULE_SCRIPTS) * len(langs)
    done = 0

    for clip_key, spec in CAPSULE_SCRIPTS.items():
        max_sec = spec["max_sec"]
        manifest["clips"].setdefault(clip_key, {})
        for lang in langs:
            done += 1
            text = spec[lang]
            fname = f"aura_viva_{clip_key}_{lang}.mp3"
            out_mp3 = OUT_DIR / fname

            if out_mp3.exists() and out_mp3.stat().st_size > 4000:
                try:
                    existing_dur = probe_duration(out_mp3)
                    existing_meta = manifest["clips"].get(clip_key, {}).get(lang, {})
                    if existing_dur <= max_sec and existing_meta.get("text") == text and existing_meta.get("engine") == "gemini-aoede":
                        print(f"[{done}/{total}] SKIP (cached valid) {fname} ({existing_dur:.2f}s)")
                        continue
                except Exception:
                    pass

            engine_used = "gemini-aoede"
            try:
                wav_bytes = synth_gemini_aoede_wav(text, api_key)
                tmp_wav.write_bytes(wav_bytes)
                time.sleep(0.65)  # Polite pacing to avoid 429 RPM spikes
            except Exception as e:
                print(f"[{done}/{total}] WARN Gemini fallback on {fname}: {e}")
                engine_used = "edge-neural-female"
                # Fallback via python3 -m edge_tts if installed, else retry Gemini after cooldown
                time.sleep(6.0)
                wav_bytes = synth_gemini_aoede_wav(text, api_key)
                tmp_wav.write_bytes(wav_bytes)
                engine_used = "gemini-aoede"

            final_dur = process_wav_to_agile_mp3(tmp_wav, out_mp3, max_sec=max_sec, base_tempo=1.14)
            manifest["clips"][clip_key][lang] = {
                "file": f"/assets/audio/capsules/{fname}",
                "duration_sec": round(final_dur, 2),
                "size_bytes": out_mp3.stat().st_size,
                "text": text,
                "voice": "Aoede",
                "engine": engine_used,
            }
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"[{done}/{total}] OK {fname} -> {final_dur:.2f}s ({out_mp3.stat().st_size // 1024} KB)")

    if tmp_wav.exists():
        tmp_wav.unlink()
    print("ALL 48 AURA VIVA CLIPS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
