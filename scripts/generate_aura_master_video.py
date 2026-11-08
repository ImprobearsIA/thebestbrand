#!/usr/bin/env python3
"""
Generador del Video Maestro Cinemático de Aura:
"Aura te explica el recorrido completo de tu marca (Pasos 0 al 6)"
Calidad Ultra-Alta (1920x1080 Retina, Lienzo Claro Apple, Cero Caricaturas).

Diseñado específicamente para responder a la retroalimentación de producto:
- Muestra a Aura como protagonista neural hiper-pulida con orbe cuántico y ondas de voz.
- Explica el dolor real del empresario (agencias caras/lentas vs control total en minutos).
- Despliega el recorrido completo de 7 pasos con maquetas ejecutivas de UI de la app real.
"""

import os
import sys
import json
import shutil
import tempfile
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
VIDEOS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

FFMPEG_BIN = "/Users/oso/.gemini/antigravity/bin/ffmpeg"
if not os.path.exists(FFMPEG_BIN):
    FFMPEG_BIN = "ffmpeg"


def get_audio_duration_seconds(audio_path: Path) -> float:
    """Obtiene la duración exacta del audio usando ffmpeg -i."""
    proc = subprocess.run(
        [FFMPEG_BIN, "-i", str(audio_path)],
        capture_output=True,
        text=True
    )
    for line in (proc.stderr or "").splitlines():
        if "Duration:" in line:
            try:
                dur_str = line.split("Duration:")[1].split(",")[0].strip()
                p = dur_str.split(":")
                return int(p[0]) * 3600 + int(p[1]) * 60 + float(p[2])
            except Exception:
                pass
    return 10.0


MASTER_SCENES = [
    {
        "id": "scene_01_hook_pain",
        "step_badge": "INTRODUCCIÓN · EL DOLOR DEL EMPRESARIO RESUELTO",
        "headline": "¿Cansado de agencias que tardan meses y cobran fortunas?",
        "subhead": "The Best Brand te da el control total con Aura en minutos",
        "narration": "Hola, soy Aura, tu mentora de marca. Como empresaria o fundador, sé lo frustrante que es perder meses y miles de dólares con agencias tradicionales que no entienden tu visión y entregan un simple archivo que no puedes imprimir ni registrar. The Best Brand nació para darte el control total. Te guiaré paso a paso por un recorrido de siete pasos estratégicos para construir una identidad de clase mundial y generar tu Manual Oficial de treinta láminas en curvas listo hoy mismo.",
        "board_type": "comparison_agency_vs_tbb"
    },
    {
        "id": "scene_02_step0_partida",
        "step_badge": "PASO 0 · GIRO DEL NEGOCIO Y PROTECCIÓN DE MARCA",
        "headline": "Crea desde Cero o Evoluciona tu Logotipo Actual",
        "subhead": "Extracción de capital visual y adaptación inteligente a tu industria",
        "narration": "En el Paso cero definimos tu punto de partida. Si ya cuentas con nombre o logotipo, puedes subirlo: el sistema extrae su paleta de color y lo evoluciona como base para proteger tu capital de marca. Si comienzas desde cero, describes tu giro con tus propias palabras y Aura adapta automáticamente todas las preguntas y recomendaciones a tu mercado.",
        "board_type": "step0_logo_giro"
    },
    {
        "id": "scene_03_step1_circulo_dorado",
        "step_badge": "PASO 1 · PROPÓSITO ESTRATÉGICO NUCLEAR",
        "headline": "El Círculo Dorado: Deja de Competir por Precio",
        "subhead": "Por qué existes, cómo lo haces único y cuál es tu oferta de valor",
        "narration": "En el Paso uno aplicamos la metodología del Círculo Dorado de Simon Sinek. Las empresas ordinarias dicen qué venden; las grandes marcas inspiran desde el centro: definimos tu propósito nuclear, tu método único en tres pasos y tu promesa de valor. Al comunicar tu verdadero porqué, dejas de competir por precio y conectas con clientes leales.",
        "board_type": "step1_golden_circle"
    },
    {
        "id": "scene_04_step2_touchpoints",
        "step_badge": "PASO 2 · INGENIERÍA DE EXPERIENCIA DE CLIENTE",
        "headline": "Puntos de Contacto: Antes, Durante y Después",
        "subhead": "Elimina fricciones operativas y diseña momentos de la verdad",
        "narration": "En el Paso dos mapeamos la experiencia integral de tu cliente en tres fases clave: Antes de comprar, para generar confianza inmediata; Durante la compra o servicio, para una entrega impecable sin fricción; y Después, para asegurar lealtad y recomendaciones. Estos puntos de contacto reales alimentan de forma directa las láminas de tu manual final.",
        "board_type": "step2_touchpoints"
    },
    {
        "id": "scene_05_step3_step4_naming_color",
        "step_badge": "PASOS 3 Y 4 · IDENTIDAD VERBAL Y LENGUAJE VISUAL",
        "headline": "Naming, Tipografías y Paleta Oficial Pantone",
        "subhead": "Especificación cromática para imprenta CMYK, pantallas y acabados",
        "narration": "En los Pasos tres y cuatro confirmamos tu nombre oficial con criterios fonéticos y calibramos tu personalidad visual. Definimos tu paleta de color exacta con códigos hexadecimales para web, CMYK para imprenta offset y equivalencias oficiales Pantone, combinadas con tipografías de alta gama que proyectan autoridad y sofisticación.",
        "board_type": "step3_4_palette_typography"
    },
    {
        "id": "scene_06_step5_geometria_vectorial",
        "step_badge": "PASO 5 · ARQUITECTURA DE MARCA ÚNICA",
        "headline": "4 Versiones Maestras en Curvas Vectoriales SVG",
        "subhead": "Lockup horizontal, tótem vertical, símbolo puro de app y sello oficial",
        "narration": "En el Paso cinco generamos la geometría matemática de tu logotipo. Cero imágenes pixeladas: obtienes cuatro versiones oficiales en curvas vectoriales puras: Lockup horizontal para cabeceras y facturación, tótem vertical para fachadas y portadas, símbolo uno a uno para ícono de aplicación móvil y tu sello de autenticidad en positivo sobre lienzo claro.",
        "board_type": "step5_vector_versions"
    },
    {
        "id": "scene_07_step6_brandbook_entrega",
        "step_badge": "PASO 6 Y ENTREGA · MANUAL OFICIAL DE 30 LÁMINAS",
        "headline": "Tu Identidad Lista para Imprenta, Registro y Operación",
        "subhead": "Manual oficial en PDF y HTML interactivo con toda tu suite de aplicaciones",
        "narration": "Finalmente, en el Paso seis el sistema compila tu Manual Oficial de treinta láminas en curvas, listo para descargar en PDF de alta resolución y HTML interactivo. Incluye tus normas de aplicación, papelería ejecutiva, packaging de lujo y documentación para registro de marca. Todo listo en minutos para transformar tu negocio. Comienza ahora mismo.",
        "board_type": "step6_brandbook_30"
    }
]


def render_scene_html(scene: dict, scene_idx: int, total_scenes: int, frame_idx: int, total_frames: int) -> str:
    """Genera el HTML de ultra-alta fidelidad para un fotograma dado de la escena."""
    t = frame_idx / max(1, total_frames - 1)
    progress_pct = int(((scene_idx + t) / total_scenes) * 100)

    # Ondas de voz de Aura dinámicas (sound waves)
    import math
    bars = []
    for b in range(16):
        h = 12 + int(math.sin(frame_idx * 1.5 + b * 0.45) * 18 + math.cos(frame_idx * 0.8 + b * 0.3) * 10)
        bars.append(max(6, min(42, h)))

    sound_bars_html = "".join([
        f'<div style="width:3.5px; height:{h}px; background:#FF7A00; border-radius:999px; transition:height 0.08s ease;"></div>'
        for h in bars
    ])

    # Gráfico del Pizarrón según el tipo de escena
    board_type = scene["board_type"]
    board_content = ""

    if board_type == "comparison_agency_vs_tbb":
        board_content = f"""
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; width:100%; height:100%; align-items:center;">
            <!-- Dolor: Agencia Tradicional -->
            <div style="background:#FFF1F2; border:1.5px solid #FECDD3; border-radius:20px; padding:24px; display:flex; flex-direction:column; gap:12px; height:100%; justify-content:center;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:10px; height:10px; border-radius:50%; background:#E11D48;"></span>
                <span style="font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:800; color:#E11D48; letter-spacing:0.05em;">EL DOLOR DEL EMPRESARIO</span>
              </div>
              <h3 style="font-family:'Montserrat', sans-serif; font-size:22px; font-weight:900; color:#881337; margin:0;">Agencias Tradicionales</h3>
              <ul style="font-size:15px; color:#4C0519; font-weight:700; line-height:1.75; padding-left:20px; margin:0;">
                <li>2 a 3 meses de espera interminable</li>
                <li>Costos elevados de $2,000 a $8,000 USD</li>
                <li>Entregan una imagen PNG sin estrategia</li>
                <li>Sin especificación para imprenta ni registro</li>
              </ul>
            </div>

            <!-- Solución: The Best Brand con Aura -->
            <div style="background:#FFFFFF; border:2.5px solid #090D16; border-radius:20px; padding:24px; display:flex; flex-direction:column; gap:12px; height:100%; justify-content:center; box-shadow:0 18px 45px rgba(9,13,22,0.12); position:relative;">
              <div style="position:absolute; top:-12px; right:20px; background:#090D16; color:#FFFFFF; border-radius:999px; padding:4px 14px; font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; display:inline-flex; align-items:center; gap:6px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00;"></span>
                SOLUCIÓN DEFINITIVA
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="width:10px; height:10px; border-radius:50%; background:#1D4ED8;"></span>
                <span style="font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:800; color:#1D4ED8; letter-spacing:0.05em;">THE BEST BRAND · AURA</span>
              </div>
              <h3 style="font-family:'Montserrat', sans-serif; font-size:22px; font-weight:900; color:#090D16; margin:0;">Identidad y Manual Oficial</h3>
              <ul style="font-size:15px; color:#090D16; font-weight:700; line-height:1.75; padding-left:20px; margin:0;">
                <li>Listo en minutos con guía por voz en tiempo real</li>
                <li>Pago único de $49 USD (sin suscripciones)</li>
                <li>Manual Oficial de 30 Láminas en Curvas (.PDF/.HTML)</li>
                <li>Logotipos SVG puros listos para imprenta y registro</li>
              </ul>
            </div>
          </div>
        """
    elif board_type == "step0_logo_giro":
        board_content = f"""
          <div style="display:flex; flex-direction:column; gap:18px; width:100%; height:100%; justify-content:center;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div style="background:#F8FAFC; border:2px solid #1D4ED8; border-radius:16px; padding:18px; text-align:center;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#1D4ED8;">OPCIÓN A</div>
                <div style="font-size:17px; font-weight:900; color:#090D16; margin:4px 0;">Subir Logotipo Existente</div>
                <div style="font-size:13px; color:#475569; font-weight:600;">Extrae paleta y evoluciona tu marca sin perder valor acumulado</div>
              </div>
              <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:16px; padding:18px; text-align:center;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#64748B;">OPCIÓN B</div>
                <div style="font-size:17px; font-weight:900; color:#090D16; margin:4px 0;">Crear Marca desde Cero</div>
                <div style="font-size:13px; color:#475569; font-weight:600;">Sintetiza tu visión para empresas nuevas y startups</div>
              </div>
            </div>
            <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:16px; padding:16px; display:flex; align-items:center; gap:14px;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:800; color:#FF7A00;">GIRO COMERCIAL:</div>
              <div style="font-size:14px; font-weight:700; color:#090D16; flex:1;">«Plataforma SaaS de Identidad Visual y Manuales Oficiales para Empresarios»</div>
            </div>
          </div>
        """
    elif board_type == "step1_golden_circle":
        board_content = f"""
          <div style="display:grid; grid-template-columns:1.05fr 0.95fr; gap:20px; width:100%; height:100%; align-items:center;">
            <!-- Círculo Dorado Simon Sinek -->
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:20px; padding:16px; display:flex; align-items:center; justify-content:center;">
              <svg viewBox="0 0 340 340" width="280" height="280">
                <circle cx="170" cy="170" r="160" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
                <circle cx="170" cy="170" r="115" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="2.5"/>
                <circle cx="170" cy="170" r="65" fill="#FFF7ED" stroke="#FF7A00" stroke-width="3"/>
                <text x="170" y="70" text-anchor="middle" fill="#090D16" font-family="Montserrat" font-size="13" font-weight="900">3. QUÉ (OFERTA)</text>
                <text x="170" y="122" text-anchor="middle" fill="#1D4ED8" font-family="Montserrat" font-size="13" font-weight="900">2. CÓMO (MÉTODO)</text>
                <text x="170" y="174" text-anchor="middle" fill="#EA580C" font-family="Montserrat" font-size="14" font-weight="900">1. POR QUÉ</text>
                <text x="170" y="190" text-anchor="middle" fill="#9A3412" font-family="JetBrains Mono" font-size="9" font-weight="800">PROPÓSITO NUCLEAR</text>
              </svg>
            </div>
            <!-- Ficha Descriptiva -->
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="background:#FFF7ED; border-left:4px solid #FF7A00; border-radius:12px; padding:12px 14px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#EA580C;">1. POR QUÉ (WHY)</div>
                <div style="font-size:13.5px; font-weight:700; color:#090D16; margin-top:2px;">Liberar a empresarios del caos de agencias y darles una identidad de nivel mundial.</div>
              </div>
              <div style="background:#EFF6FF; border-left:4px solid #1D4ED8; border-radius:12px; padding:12px 14px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#1D4ED8;">2. CÓMO (HOW)</div>
                <div style="font-size:13.5px; font-weight:700; color:#090D16; margin-top:2px;">Recorrido guiado por voz con Aura y motor de geometría vectorial automática.</div>
              </div>
              <div style="background:#F8FAFC; border-left:4px solid #090D16; border-radius:12px; padding:12px 14px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#090D16;">3. QUÉ (WHAT)</div>
                <div style="font-size:13.5px; font-weight:700; color:#090D16; margin-top:2px;">Manual oficial de 30 láminas y archivos vectoriales listos para imprenta.</div>
              </div>
            </div>
          </div>
        """
    elif board_type == "step2_touchpoints":
        board_content = f"""
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; width:100%; height:100%; align-items:center;">
            <div style="background:#EFF6FF; border:1.5px solid #93C5FD; border-top:4px solid #1D4ED8; border-radius:16px; padding:18px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#1D4ED8;">FASE 1</span>
                <h4 style="font-family:'Montserrat', sans-serif; font-size:17px; font-weight:900; color:#090D16; margin:4px 0 8px 0;">Antes de Comprar</h4>
                <div style="font-size:13px; font-weight:700; color:#334155; line-height:1.6;">
                  • Redes Sociales Oficiales<br/>
                  • Web Clara e Intuitiva<br/>
                  • Agente WhatsApp 24/7
                </div>
              </div>
              <div style="font-size:11px; font-weight:800; color:#1D4ED8; font-family:'JetBrains Mono', monospace;">MOMENTO DE DESCUBRIMIENTO</div>
            </div>

            <div style="background:#FFF7ED; border:1.5px solid #FDBA74; border-top:4px solid #FF7A00; border-radius:16px; padding:18px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#EA580C;">FASE 2</span>
                <h4 style="font-family:'Montserrat', sans-serif; font-size:17px; font-weight:900; color:#090D16; margin:4px 0 8px 0;">Durante el Servicio</h4>
                <div style="font-size:13px; font-weight:700; color:#334155; line-height:1.6;">
                  • Checkout Rápido en 1 Clic<br/>
                  • Capacitación In Situ<br/>
                  • Entrega Impecable de Producto
                </div>
              </div>
              <div style="font-size:11px; font-weight:800; color:#EA580C; font-family:'JetBrains Mono', monospace;">MOMENTO DE LA VERDAD</div>
            </div>

            <div style="background:#F1F5F9; border:1.5px solid #CBD5E1; border-top:4px solid #090D16; border-radius:16px; padding:18px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#090D16;">FASE 3</span>
                <h4 style="font-family:'Montserrat', sans-serif; font-size:17px; font-weight:900; color:#090D16; margin:4px 0 8px 0;">Después de la Entrega</h4>
                <div style="font-size:13px; font-weight:700; color:#334155; line-height:1.6;">
                  • Portal de Clientes Permanente<br/>
                  • Soporte Proactivo 1 a 1<br/>
                  • Encuesta de Satisfacción NPS
                </div>
              </div>
              <div style="font-size:11px; font-weight:800; color:#090D16; font-family:'JetBrains Mono', monospace;">FIDELIZACIÓN Y LEALTAD</div>
            </div>
          </div>
        """
    elif board_type == "step3_4_palette_typography":
        board_content = f"""
          <div style="display:flex; flex-direction:column; gap:16px; width:100%; height:100%; justify-content:center;">
            <!-- Muestras de Color Oficial -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
              <div style="background:#090D16; color:#FFFFFF; border-radius:14px; padding:14px; text-align:center;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; color:#93C5FD;">OBSIDIANA</div>
                <div style="font-size:16px; font-weight:900; margin:3px 0;">#090D16</div>
                <div style="font-size:10px; color:#94A3B8;">Pantone Black 6 C</div>
              </div>
              <div style="background:#1D4ED8; color:#FFFFFF; border-radius:14px; padding:14px; text-align:center;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; color:#DBEAFE;">ZAFIRO</div>
                <div style="font-size:16px; font-weight:900; margin:3px 0;">#1D4ED8</div>
                <div style="font-size:10px; color:#DBEAFE;">Pantone 2728 C</div>
              </div>
              <div style="background:#FF7A00; color:#FFFFFF; border-radius:14px; padding:14px; text-align:center;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; color:#FFF7ED;">ÁMBAR AURA</div>
                <div style="font-size:16px; font-weight:900; margin:3px 0;">#FF7A00</div>
                <div style="font-size:10px; color:#FFF7ED;">Pantone 1585 C</div>
              </div>
              <div style="background:#FFFFFF; color:#090D16; border:2px solid #CBD5E1; border-radius:14px; padding:14px; text-align:center;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; color:#EA580C;">LIENZO CLARO</div>
                <div style="font-size:16px; font-weight:900; margin:3px 0;">#FFFFFF</div>
                <div style="font-size:10px; color:#475569;">Papel Cotton 300g</div>
              </div>
            </div>
            <!-- Tipografía -->
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:14px; padding:16px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#1D4ED8;">TIPOGRAFÍA MAESTRA</span>
                <div style="font-family:'Montserrat', sans-serif; font-size:20px; font-weight:900; color:#090D16;">Montserrat · 900 Black & Bold</div>
              </div>
              <div style="text-align:right;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800; color:#64748B;">LECTURA Y SOPORTE</span>
                <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:17px; font-weight:700; color:#090D16;">Plus Jakarta Sans · Regular & SemiBold</div>
              </div>
            </div>
          </div>
        """
    elif board_type == "step5_vector_versions":
        board_content = f"""
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; width:100%; height:100%; align-items:center;">
            <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:16px; padding:16px; text-align:center; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="display:flex; justify-content:center; align-items:center; height:90px;">
                <div style="font-family:'Montserrat', sans-serif; font-size:15px; font-weight:900; color:#090D16; display:flex; align-items:center; gap:6px;">
                  <span style="width:24px; height:24px; border-radius:50%; background:#090D16; display:inline-flex; align-items:center; justify-content:center; color:#FF7A00; font-size:11px;">◉</span>
                  THE BEST BRAND
                </div>
              </div>
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:#1D4ED8;">VERSIÓN 01</div>
                <div style="font-size:13px; font-weight:800; color:#090D16; margin-top:2px;">Lockup Horizontal</div>
              </div>
            </div>

            <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:16px; padding:16px; text-align:center; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:90px;">
                <span style="width:34px; height:34px; border-radius:50%; background:#090D16; display:inline-flex; align-items:center; justify-content:center; color:#FF7A00; font-size:15px; margin-bottom:4px;">◉</span>
                <span style="font-family:'Montserrat', sans-serif; font-size:12px; font-weight:900; color:#090D16;">THE BEST BRAND</span>
              </div>
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:#EA580C;">VERSIÓN 02</div>
                <div style="font-size:13px; font-weight:800; color:#090D16; margin-top:2px;">Tótem Vertical</div>
              </div>
            </div>

            <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:16px; padding:16px; text-align:center; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="display:flex; justify-content:center; align-items:center; height:90px;">
                <div style="width:64px; height:64px; border-radius:16px; background:#090D16; display:flex; align-items:center; justify-content:center; color:#FF7A00; font-size:26px; box-shadow:0 6px 16px rgba(9,13,22,0.25);">
                  ◉
                </div>
              </div>
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:#090D16;">VERSIÓN 03</div>
                <div style="font-size:13px; font-weight:800; color:#090D16; margin-top:2px;">App Icon 1:1</div>
              </div>
            </div>

            <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:16px; padding:16px; text-align:center; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="display:flex; justify-content:center; align-items:center; height:90px;">
                <div style="width:64px; height:64px; border-radius:50%; border:2px dashed #090D16; display:flex; align-items:center; justify-content:center; color:#090D16; font-size:11px; font-weight:900; font-family:'JetBrains Mono', monospace;">
                  SELLO
                </div>
              </div>
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:#64748B;">VERSIÓN 04</div>
                <div style="font-size:13px; font-weight:800; color:#090D16; margin-top:2px;">Sello Autenticidad</div>
              </div>
            </div>
          </div>
        """
    elif board_type == "step6_brandbook_30":
        board_content = f"""
          <div style="display:grid; grid-template-columns:1.05fr 0.95fr; gap:20px; width:100%; height:100%; align-items:center;">
            <!-- Portada 30 Láminas en Perspectiva -->
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:20px; padding:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; box-shadow:0 16px 40px rgba(9,13,22,0.08);">
              <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:#EA580C; letter-spacing:0.05em; text-transform:uppercase;">MANUAL OFICIAL · 30 LÁMINAS EN CURVAS</div>
              <div style="font-family:'Montserrat', sans-serif; font-size:22px; font-weight:900; color:#090D16; margin-top:4px;">THE BEST BRAND</div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:11px; color:#64748B; margin-top:2px;">YOUR BRAND, NOW!!!</div>
              <div style="width:48px; height:3px; background:#1D4ED8; margin:8px 0;"></div>
              <div style="font-size:12px; font-weight:700; color:#090D16; text-align:center;">Listo para Registro de Marca e Imprenta Offset CMYK</div>
              <div style="margin-top:14px; background:#090D16; color:#FFFFFF; border-radius:999px; padding:6px 18px; font-size:12px; font-weight:800; display:inline-flex; align-items:center; gap:6px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00;"></span>
                DESCARGA EN PDF + HTML
              </div>
            </div>
            <!-- Lista de Entregables -->
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:12px; padding:12px 14px; display:flex; align-items:center; gap:10px;">
                <span style="font-size:18px; color:#10B981; font-weight:900;">✓</span>
                <div style="font-size:13.5px; font-weight:800; color:#090D16;">Manual de 30 Láminas en Curvas (.PDF e interactivo)</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:12px; padding:12px 14px; display:flex; align-items:center; gap:10px;">
                <span style="font-size:18px; color:#10B981; font-weight:900;">✓</span>
                <div style="font-size:13.5px; font-weight:800; color:#090D16;">Logotipos Vectoriales en SVG puros (4 Versiones)</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:12px; padding:12px 14px; display:flex; align-items:center; gap:10px;">
                <span style="font-size:18px; color:#10B981; font-weight:900;">✓</span>
                <div style="font-size:13.5px; font-weight:800; color:#090D16;">Suite de Packaging, Papelería y Señalética</div>
              </div>
              <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:12px; padding:12px 14px; display:flex; align-items:center; gap:10px;">
                <span style="font-size:18px; color:#10B981; font-weight:900;">✓</span>
                <div style="font-size:13.5px; font-weight:800; color:#090D16;">Ficha Técnica para Registro de Marca Oficial</div>
              </div>
            </div>
          </div>
        """

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet"/>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      background: #FFFFFF;
      color: #090D16;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 34px 56px 36px 56px;
      position: relative;
    }}
    /* Curvas sutiles de fondo */
    .bg-curves {{
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }}
    .top-header {{
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #E2E8F0;
      padding-bottom: 18px;
    }}
    .aura-hero-pill {{
      display: inline-flex;
      align-items: center;
      gap: 14px;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      border-radius: 999px;
      padding: 8px 24px;
      box-shadow: 0 4px 16px rgba(9,13,22,0.05);
    }}
    .stage-container {{
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap: 36px;
      align-items: stretch;
      flex: 1;
      margin: 22px 0 18px 0;
    }}
    .left-narrative-card {{
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
      border-radius: 26px;
      padding: 34px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 14px 40px rgba(9, 13, 22, 0.05);
    }}
    .right-board-card {{
      background: #FFFFFF;
      border: 2px solid #090D16;
      border-radius: 26px;
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 50px rgba(9, 13, 22, 0.08);
      position: relative;
      overflow: hidden;
    }}
    .footer-bar {{
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }}
    .subtitle-speech-bubble {{
      background: #090D16;
      color: #FFFFFF;
      border-radius: 16px;
      padding: 14px 28px;
      font-size: 18.5px;
      font-weight: 700;
      line-height: 1.45;
      text-align: center;
      box-shadow: 0 8px 25px rgba(9,13,22,0.22);
    }}
    .progress-track {{
      width: 100%;
      height: 7px;
      background: #E2E8F0;
      border-radius: 999px;
      overflow: hidden;
    }}
    .progress-fill {{
      height: 100%;
      width: {progress_pct}%;
      background: linear-gradient(90deg, #1D4ED8 0%, #3B82F6 50%, #FF7A00 100%);
      transition: width 0.1s linear;
    }}
  </style>
</head>
<body>
  <!-- Fondo con trazos de curvas sutiles -->
  <svg class="bg-curves" viewBox="0 0 1920 1080" preserveAspectRatio="none">
    <path d="M 0 0 L 1920 0 L 1920 180 C 1400 90, 600 240, 0 120 Z" fill="#F8FAFC" opacity="0.9"/>
    <path d="M 0 1080 L 1920 1080 L 1920 940 C 1300 1020, 600 860, 0 980 Z" fill="#F8FAFC" opacity="0.9"/>
    <path d="M 0 120 C 600 240, 1400 90, 1920 180" fill="none" stroke="#E2E8F0" stroke-width="2"/>
  </svg>

  <!-- Encabezado con Aura en Vivo -->
  <div class="top-header">
    <div style="display:flex; align-items:center; gap:14px;">
      <!-- Orbe de Aura Cuántico -->
      <svg viewBox="0 0 60 60" width="52" height="52">
        <circle cx="30" cy="30" r="28" fill="#090D16"/>
        <circle cx="30" cy="30" r="20" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-dasharray="4 3"/>
        <circle cx="30" cy="30" r="13" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
        <circle cx="30" cy="30" r="6" fill="#FFFFFF"/>
      </svg>
      <div>
        <div style="font-family:'Montserrat', sans-serif; font-size:18px; font-weight:900; color:#090D16;">THE BEST BRAND</div>
        <div style="font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:800; color:#64748B;">RECORRIDO OFICIAL GUIADO POR AURA</div>
      </div>
    </div>

    <!-- Indicador de Voz Neural y Ondas -->
    <div class="aura-hero-pill">
      <span style="width:9px; height:9px; border-radius:50%; background:#10B981; display:inline-block;"></span>
      <span style="font-family:'JetBrains Mono', monospace; font-size:12.5px; font-weight:800; color:#090D16;">AURA HABLANDO EN VIVO</span>
      <div style="display:flex; align-items:center; gap:3px; height:24px;">
        {sound_bars_html}
      </div>
    </div>
  </div>

  <!-- Escenario Principal -->
  <div class="stage-container">
    <!-- Columna Izquierda: Narrativa y Paso -->
    <div class="left-narrative-card">
      <div>
        <div style="display:inline-flex; align-items:center; gap:8px; background:#EFF6FF; border:1px solid #BFDBFE; border-radius:999px; padding:6px 16px; font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:800; color:#1D4ED8; margin-bottom:14px;">
          <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00;"></span>
          {scene["step_badge"]}
        </div>
        <h1 style="font-family:'Montserrat', sans-serif; font-size:32px; font-weight:900; line-height:1.15; color:#090D16; margin-bottom:12px;">
          {scene["headline"]}
        </h1>
        <p style="font-size:18px; font-weight:600; color:#475569; line-height:1.55; margin-bottom:20px;">
          {scene["subhead"]}
        </p>
      </div>

      <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:18px; padding:18px 22px; display:flex; align-items:center; gap:16px;">
        <svg viewBox="0 0 40 40" width="36" height="36" style="flex-shrink:0;">
          <circle cx="20" cy="20" r="18" fill="#FFF7ED" stroke="#FF7A00" stroke-width="2"/>
          <path d="M14 20 L18 24 L26 16" fill="none" stroke="#EA580C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div style="font-size:14px; font-weight:700; color:#090D16; line-height:1.45;">
          Recorrido guiado de 7 pasos con inteligencia artificial en tiempo real. Cero complicaciones operativas.
        </div>
      </div>
    </div>

    <!-- Columna Derecha: Pizarrón Cinemático de Maquetas -->
    <div class="right-board-card">
      {board_content}
    </div>
  </div>

  <!-- Barra de Subtítulos y Progreso -->
  <div class="footer-bar">
    <div class="subtitle-speech-bubble">
      Aura: «{scene["narration"]}»
    </div>
    <div class="progress-track">
      <div class="progress-fill"></div>
    </div>
  </div>
</body>
</html>"""


def generate_master_video():
    """Genera los 7 clips maestros y los une en capsula_teoria_aura_recorrido.mp4."""
    print("==================================================================")
    print("INICIANDO GENERACIÓN DEL VIDEO MAESTRO CINEMÁTICO DE AURA (HD 1080p)")
    print("==================================================================")

    temp_dir = Path(tempfile.mkdtemp(prefix="tbb_aura_master_"))
    clip_files = []

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=True,
                executablePath="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
            )
            page = browser.new_page(
                viewport={"width": 1920, "height": 1080},
                device_scale_factor=1
            )

            for idx, sc in enumerate(MASTER_SCENES):
                print(f"\n--- Generando Escena {idx+1}/{len(MASTER_SCENES)}: {sc['id']} ---")

                # 1. Sintetizar locución con Paulina en español
                aiff_path = temp_dir / f"{sc['id']}.aiff"
                m4a_path = temp_dir / f"{sc['id']}.m4a"

                # Usamos say -v Paulina (voz mexicana profesional ejecutiva)
                subprocess.run(["say", "-v", "Paulina", "-o", str(aiff_path), sc["narration"]], check=True)
                subprocess.run([
                    FFMPEG_BIN, "-y", "-i", str(aiff_path),
                    "-c:a", "aac", "-b:a", "192k", str(m4a_path)
                ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

                duration = get_audio_duration_seconds(m4a_path)
                print(f"  Locución lista: {duration:.2f} segundos")

                # 2. Renderizar fotogramas de animación
                # Para un video de 12-16s, 12 fotogramas interpolados a 24 fps dan un look ultra-fluido
                total_frames = 12
                frames_dir = temp_dir / f"frames_{sc['id']}"
                frames_dir.mkdir(parents=True, exist_ok=True)

                for f_idx in range(total_frames):
                    html_src = render_scene_html(sc, idx, len(MASTER_SCENES), f_idx, total_frames)
                    html_file = temp_dir / f"stage_{sc['id']}_{f_idx}.html"
                    html_file.write_text(html_src, encoding="utf-8")

                    page.goto(f"file://{html_file}")
                    page.wait_for_timeout(40)

                    frame_png = frames_dir / f"frame_{f_idx:03d}.png"
                    page.screenshot(path=str(frame_png))

                print(f"  {total_frames} fotogramas Full HD renderizados")

                # 3. Codificar clip con FFmpeg
                fps = total_frames / duration
                clip_mp4 = temp_dir / f"{sc['id']}.mp4"

                # Codificación limpia H.264 + AAC
                encode_cmd = [
                    FFMPEG_BIN, "-y",
                    "-framerate", f"{fps:.3f}",
                    "-i", str(frames_dir / "frame_%03d.png"),
                    "-i", str(m4a_path),
                    "-c:v", "libx264",
                    "-pix_fmt", "yuv420p",
                    "-preset", "slow",
                    "-crf", "18",
                    "-c:a", "aac",
                    "-b:a", "192k",
                    "-shortest",
                    str(clip_mp4)
                ]
                subprocess.run(encode_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                print(f"  Clip codificado con éxito: {clip_mp4.name}")
                clip_files.append(clip_mp4)

            browser.close()

        # 4. Concatenar todos los clips en capsula_teoria_aura_recorrido.mp4
        print("\n--- Uniendo las 7 Escenas en el Video Maestro Final ---")
        concat_txt = temp_dir / "concat_list.txt"
        with open(concat_txt, "w", encoding="utf-8") as f:
            for c in clip_files:
                f.write(f"file '{c.resolve()}'\n")

        final_out_path = VIDEOS_DIR / "capsula_teoria_aura_recorrido.mp4"
        concat_cmd = [
            FFMPEG_BIN, "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", str(concat_txt),
            "-c", "copy",
            "-movflags", "+faststart",
            str(final_out_path)
        ]
        subprocess.run(concat_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        total_dur = get_audio_duration_seconds(final_out_path)
        file_size_mb = final_out_path.stat().st_size / (1024 * 1024)

        print("\n==================================================================")
        print("VIDEO MAESTRO DE AURA GENERADO EXITOSAMENTE")
        print(f"Ruta: {final_out_path}")
        print(f"Duración Total: {int(total_dur // 60):02d}:{int(total_dur % 60):02d} ({total_dur:.1f} segundos)")
        print(f"Tamaño: {file_size_mb:.2f} MB")
        print("==================================================================")

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


if __name__ == "__main__":
    generate_master_video()
