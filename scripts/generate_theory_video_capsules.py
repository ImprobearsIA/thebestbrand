#!/usr/bin/env python3
"""
Generador de las 6 Cápsulas de Video de Teoría, Importancia y Ejemplo Práctico (HD 1280x720 MP4)
para TheBestBrand.

Mecanismo Técnico:
1. Redacta los 6 guiones estructurados en 4 escenas por cápsula:
   - Escena 1: Puente / Resumen del paso previo (o Bienvenida antes del Paso 1)
   - Escena 2: Marco Teórico (Simon Sinek, Service Blueprint, SMILE & SCRATCH, Ingeniería Kansei, Ceteris Paribus, Norma ISO/Retícula)
   - Escena 3: Por qué es crucial para el negocio (Importancia estratégica y comercial)
   - Escena 4: Ejemplo breve del mundo real + Pase directo a la primera pregunta del paso
2. Sintetiza la locución en español (macOS `say -v Paulina`) para cada escena con tiempos exactos.
3. Renderiza las láminas cinematográficas 1280x720 en Chromium Headless (Playwright) con diagramas SVG,
   progreso visual de las 4 escenas y subtítulos sincronizados.
4. Ensambla y codifica cada cápsula en MP4 (H.264 + AAC, -movflags +faststart) mediante `ffmpeg`.
"""

import os
import json
import subprocess
import tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
VIDEOS_OUT_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "videos"
FFMPEG_BIN = "/Users/oso/.gemini/antigravity/bin/ffmpeg"
if not os.path.exists(FFMPEG_BIN):
    FFMPEG_BIN = "ffmpeg"

CAPSULES_SPEC = [
    {
        "step": 1,
        "transition_label": "BIENVENIDA DEL PASO 0 → ENTRADA AL PASO 1",
        "title": "Paso 1: El Círculo Dorado y la Promesa de Valor",
        "theory_badge": "TEORÍA 01 · SIMON SINEK & ARQUITECTURA DE PROPÓSITO",
        "accent_color": "#D4AF37",
        "secondary_color": "#38BDF8",
        "svg_diagram": """
          <svg viewBox="0 0 320 220" width="100%" height="100%">
            <circle cx="160" cy="110" r="95" fill="rgba(212,175,55,0.08)" stroke="#D4AF37" stroke-width="2" stroke-dasharray="5 4"/>
            <circle cx="160" cy="110" r="64" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
            <circle cx="160" cy="110" r="34" fill="rgba(212,175,55,0.28)" stroke="#FDE68A" stroke-width="2.5"/>
            <text x="160" y="114" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="13" font-weight="800">¿POR QUÉ?</text>
            <text x="160" y="62" text-anchor="middle" fill="#7DD3FC" font-family="Plus Jakarta Sans" font-size="11" font-weight="700">¿CÓMO? (Método)</text>
            <text x="160" y="30" text-anchor="middle" fill="#FDE68A" font-family="Plus Jakarta Sans" font-size="11" font-weight="700">¿QUÉ? (Producto)</text>
          </svg>
        """,
        "scenes": [
            {
                "phase_tag": "1/4 · BIENVENIDA E INTERPRETACIÓN INICIAL",
                "headline": "Bienvenido al Paso 1: El Alma Estratégica de tu Marca",
                "bullet_title": "Del Giro Comercial al Propósito Nuclear",
                "body_text": "Aura ya interpretó a qué se dedica tu negocio en el Paso 0. Antes de pensar en colores o logotipos, toda gran marca necesita cimientos estratégicos claros.",
                "narration": "Bienvenido al primer paso de The Best Brand. Ya interpretamos la esencia de tu negocio, y antes de diseñar cualquier logotipo, vamos a construir los cimientos estratégicos de tu marca."
            },
            {
                "phase_tag": "2/4 · LA TEORÍA: EL CÍRCULO DORADO",
                "headline": "Teoría: El Círculo Dorado de Simon Sinek",
                "bullet_title": "Empezar por el 'Por Qué' antes del 'Qué'",
                "body_text": "La mayoría de las empresas dicen qué venden, pero las marcas líderes inspiran desde el centro: 1) ¿Por qué existes?, 2) ¿Cómo lo haces único?, y 3) ¿Qué entregas exactamente?",
                "narration": "La teoría del Círculo Dorado de Simon Sinek demuestra que la gente no compra lo que haces, sino el porqué lo haces. Cuando comunicas tu propósito y tu método único, dejas de competir por precio."
            },
            {
                "phase_tag": "3/4 · IMPORTANCIA PARA TU NEGOCIO",
                "headline": "¿Por qué es vital definir tus 6 Pilares hoy?",
                "bullet_title": "Filtro para Nombre, Touchpoints e Identidad Visual",
                "body_text": "Tu Propósito, Oferta de Valor, Rol Social, Proceso en 3 pasos, Promesa Central y Cliente Ideal guiarán automáticamente las sugerencias de nombres y el diseño de tu logotipo.",
                "narration": "Definir estos seis pilares es crucial porque evita que tu identidad sea genérica. Cada respuesta que des aquí alimentará directamente tu mapa de experiencia, tu nombre y tu logotipo."
            },
            {
                "phase_tag": "4/4 · EJEMPLO BREVE Y PRIMERA PREGUNTA",
                "headline": "Ejemplo Real: Apple y Nubank",
                "bullet_title": "Vender Transformación en lugar de Funciones",
                "body_text": "Nubank no dijo 'somos una tarjeta de crédito'; su propósito fue liberar a las personas de la burocracia bancaria con una app humana y transparente. ¡Respondamos tu primera pregunta!",
                "narration": "Por ejemplo, Nubank no se presentó como un banco más, sino como una plataforma para liberar a la gente de la burocracia financiera. Ahora sí, pasemos a la primera pregunta de tu Paso 1."
            }
        ]
    },
    {
        "step": 2,
        "transition_label": "RESUMEN DEL PASO 1 → ENTRADA AL PASO 2",
        "title": "Paso 2: Arquitectura de Touchpoints y Customer Journey",
        "theory_badge": "TEORÍA 02 · LEMON & VERHOEF · SERVICE BLUEPRINT",
        "accent_color": "#10B981",
        "secondary_color": "#D4AF37",
        "svg_diagram": """
          <svg viewBox="0 0 320 220" width="100%" height="100%">
            <line x1="35" y1="115" x2="285" y2="115" stroke="#34D399" stroke-width="3" stroke-dasharray="6 4"/>
            <rect x="20" y="70" width="80" height="90" rx="12" fill="rgba(16,185,129,0.14)" stroke="#10B981" stroke-width="2"/>
            <rect x="120" y="55" width="80" height="110" rx="12" fill="rgba(212,175,55,0.2)" stroke="#D4AF37" stroke-width="2.5"/>
            <rect x="220" y="70" width="80" height="90" rx="12" fill="rgba(56,189,248,0.14)" stroke="#38BDF8" stroke-width="2"/>
            <text x="60" y="112" text-anchor="middle" fill="#6EE7B7" font-family="Plus Jakarta Sans" font-size="12" font-weight="800">1. ANTES</text>
            <text x="60" y="130" text-anchor="middle" fill="#CBD5E1" font-family="Plus Jakarta Sans" font-size="9">Descubrimiento</text>
            <text x="160" y="108" text-anchor="middle" fill="#FDE68A" font-family="Plus Jakarta Sans" font-size="12" font-weight="800">2. DURANTE</text>
            <text x="160" y="128" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="9">Momento Clave</text>
            <text x="260" y="112" text-anchor="middle" fill="#7DD3FC" font-family="Plus Jakarta Sans" font-size="12" font-weight="800">3. DESPUÉS</text>
            <text x="260" y="130" text-anchor="middle" fill="#CBD5E1" font-family="Plus Jakarta Sans" font-size="9">Fidelización</text>
          </svg>
        """,
        "scenes": [
            {
                "phase_tag": "1/4 · RESUMEN DEL PASO 1 COMPLETADO",
                "headline": "¡Paso 1 Conquistado! Tu Esencia está Lista",
                "bullet_title": "De la Promesa Abstracta a la Experiencia Real",
                "body_text": "En el Paso 1 definiste tu propósito, tu diferencial y tu cliente ideal. Ahora traduciremos esa promesa en interacciones tangibles que el cliente pueda ver, tocar o usar en pantalla.",
                "narration": "¡Excelente trabajo en el Paso 1! Ya definiste tu propósito nuclear y tu oferta de valor. Ahora daremos el siguiente paso: convertir esa promesa en puntos de contacto reales con tu cliente."
            },
            {
                "phase_tag": "2/4 · LA TEORÍA: ARQUITECTURA DE TOUCHPOINTS",
                "headline": "Teoría: Los 3 Momentos de la Verdad",
                "bullet_title": "Antes, Durante y Después de Comprar o Registrarse",
                "body_text": "Según Lemon y Verhoef, toda experiencia se divide en 3 etapas: 1) Antes (atracción y confianza), 2) Durante (activación o compra sin fricción) y 3) Después (retención y recomendación).",
                "narration": "La teoría de Arquitectura de Experiencia divide el viaje de tu cliente en tres etapas críticas: qué ve antes de elegirte, qué vive durante el uso o compra, y qué recibe después para volver."
            },
            {
                "phase_tag": "3/4 · IMPORTANCIA Y EFECTO SURPRISE & DELIGHT",
                "headline": "Coherencia con tu Giro: Digital vs. Físico",
                "bullet_title": "Por qué tus Touchpoints dictan tus Entregables",
                "body_text": "Si tu producto es una App, tus touchpoints son pantallas, demos interactivas y notificaciones; si es físico, son empaques, aromas y servicio. De aquí saldrán las aplicaciones de tu manual.",
                "narration": "Esto es vital porque tus puntos de contacto deben corresponder al cien por ciento con la naturaleza de tu negocio, ya sea una aplicación digital o un servicio físico, definiendo tus entregables reales."
            },
            {
                "phase_tag": "4/4 · EJEMPLO BREVE Y PRIMERA PREGUNTA",
                "headline": "Ejemplo Real: Spotify Wrapped y Duolingo",
                "bullet_title": "Micro-momentos que Enamoran y Retienen",
                "body_text": "En una app, permitir probar sin tarjeta Antes, lograr el primer resultado en 60 segundos Durante, y enviar un resumen compartible tipo Spotify Wrapped Después multiplica la lealtad.",
                "narration": "Por ejemplo, en una app digital, ofrecer una prueba inmediata al inicio y un resumen anual interactivo como Spotify Wrapped convierte usuarios en embajadores. ¡Vamos a la primera pregunta del Paso 2!"
            }
        ]
    },
    {
        "step": 3,
        "transition_label": "RESUMEN DEL PASO 2 → ENTRADA AL PASO 3",
        "title": "Paso 3: Ingeniería de Naming, Fonética y Registro",
        "theory_badge": "TEORÍA 03 · SMILE & SCRATCH + CLASIFICACIÓN DE NIZA",
        "accent_color": "#38BDF8",
        "secondary_color": "#D4AF37",
        "svg_diagram": """
          <svg viewBox="0 0 320 220" width="100%" height="100%">
            <polygon points="160,24 275,85 240,192 80,192 45,85" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
            <circle cx="160" cy="115" r="42" fill="rgba(212,175,55,0.22)" stroke="#D4AF37" stroke-width="2"/>
            <text x="160" y="112" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="11" font-weight="800">SMILE</text>
            <text x="160" y="128" text-anchor="middle" fill="#FDE68A" font-family="JetBrains Mono" font-size="9">96/100</text>
            <text x="160" y="16" text-anchor="middle" fill="#7DD3FC" font-family="Plus Jakarta Sans" font-size="10" font-weight="700">Sonoridad (2-3 sílabas)</text>
            <text x="278" y="78" text-anchor="middle" fill="#6EE7B7" font-family="Plus Jakarta Sans" font-size="9" font-weight="700">Clase Niza</text>
            <text x="42" y="78" text-anchor="middle" fill="#FDE68A" font-family="Plus Jakarta Sans" font-size="9" font-weight="700">Dominio .com</text>
          </svg>
        """,
        "scenes": [
            {
                "phase_tag": "1/4 · RESUMEN DEL PASO 2 COMPLETADO",
                "headline": "¡Viaje del Cliente Mapeado al 100%!",
                "bullet_title": "Tus canales reales ya están listos",
                "body_text": "Acabas de definir cómo te descubren, cómo te usan o compran, y cómo fidelizas a tus clientes. Esos canales determinan exactamente cómo debe sonar y registrarse tu nombre.",
                "narration": "¡Felicidades por completar el Paso 2! Ya tenemos el mapa completo de cómo interactúa tu cliente Antes, Durante y Después. Esa información es el insumo clave para bautizar tu marca."
            },
            {
                "phase_tag": "2/4 · LA TEORÍA: SMILE & SCRATCH + 6 ESTILOS",
                "headline": "Teoría: Fonética Memorizable y 6 Familias",
                "bullet_title": "Alexandra Watkins + Clasificación Internacional de Niza",
                "body_text": "Un gran nombre cumple el modelo SMILE: Sugerente, Memorable, con Imagen mental, Piernas para crecer y Emoción. Exploraremos 6 estilos: Descriptivo, Compuesto, Neologismo, Siglas, Evocativo y Corto.",
                "narration": "Aplicaremos la metodología SMILE de Alexandra Watkins junto con seis estilos de naming y la Clasificación Internacional de Niza. Un nombre poderoso tiene de dos a tres sílabas, ritmo claro y alta registrabilidad."
            },
            {
                "phase_tag": "3/4 · IMPORTANCIA ESTRATÉGICA Y LEGAL",
                "headline": "¿Por qué no basta un nombre 'bonito'?",
                "bullet_title": "Viabilidad en IMPI/USPTO, App Stores y Dominios",
                "body_text": "Un nombre genérico o incoherente con tu producto confunde al usuario y es rechazado al registrar la marca. Evaluaremos su fonética y su encaje exacto con tu oferta de valor.",
                "narration": "Elegir el nombre correcto con respaldo fonético y legal te ahorra rechazos de registro y hace que tus clientes te recomienden de boca en boca sin errores de ortografía."
            },
            {
                "phase_tag": "4/4 · EJEMPLO BREVE Y ENTRADA AL PASO 3",
                "headline": "Ejemplo Real: Stripe, Notion y Rolex",
                "bullet_title": "Ritmo Acústico de 2 Sílabas y Monograma Fuerte",
                "body_text": "Nombres cortos como 'Stripe' o 'Notion' en tecnología, o 'Rolex' en relojería, destacan por sus consonantes firmes y por tener iniciales perfectas para su icono y monograma.",
                "narration": "Piensa en nombres como Notion o Stripe en aplicaciones digitales: son cortos, fáciles de pronunciar y sus iniciales lucen impecables en un icono de pantalla. ¡Entremos al Paso 3 para elegir el tuyo!"
            }
        ]
    },
    {
        "step": 4,
        "transition_label": "RESUMEN DEL PASO 3 → ENTRADA AL PASO 4",
        "title": "Paso 4: Psicología de la Forma y los 7 Ejes Visuales",
        "theory_badge": "TEORÍA 04 · INGENIERÍA KANSEI & SEMIÓTICA VISUAL",
        "accent_color": "#F59E0B",
        "secondary_color": "#38BDF8",
        "svg_diagram": """
          <svg viewBox="0 0 320 220" width="100%" height="100%">
            <rect x="25" y="35" width="120" height="68" rx="34" fill="rgba(56,189,248,0.15)" stroke="#38BDF8" stroke-width="2"/>
            <polygon points="235,32 292,102 178,102" fill="rgba(212,175,55,0.18)" stroke="#D4AF37" stroke-width="2"/>
            <text x="85" y="74" text-anchor="middle" fill="#7DD3FC" font-family="Plus Jakarta Sans" font-size="11" font-weight="800">Curva Orgánica</text>
            <text x="235" y="88" text-anchor="middle" fill="#FDE68A" font-family="Plus Jakarta Sans" font-size="10" font-weight="800">Geometría Exacta</text>
            <line x1="40" y1="150" x2="280" y2="150" stroke="#94A3B8" stroke-width="3"/>
            <circle cx="215" cy="150" r="10" fill="#D4AF37" stroke="#FFFFFF" stroke-width="2"/>
            <text x="160" y="185" text-anchor="middle" fill="#E2E8F0" font-family="JetBrains Mono" font-size="10">7 EJES BIPOLARES + 4 FAMILIAS BASE</text>
          </svg>
        """,
        "scenes": [
            {
                "phase_tag": "1/4 · RESUMEN DEL PASO 3 COMPLETADO",
                "headline": "¡Tu Marca ya Tiene Nombre Oficial!",
                "bullet_title": "De la Identidad Verbal a la Arquitectura Visual",
                "body_text": "Tu nombre oficial y su monograma ya quedaron blindados en el sistema. Ahora definiremos la personalidad visual y la estructura geométrica que representará a ese nombre.",
                "narration": "¡Extraordinario! Ya seleccionaste y bloqueaste el nombre oficial de tu marca. Con tu nombre definido, ahora vamos a traducir su carácter a formas, proporciones y geometría visual."
            },
            {
                "phase_tag": "2/4 · LA TEORÍA: INGENIERÍA KANSEI Y DIFERENCIAL DE OSGOOD",
                "headline": "Teoría: Psicología de la Forma (Bouba vs. Kiki)",
                "bullet_title": "Cómo el cerebro humano interpreta líneas y ángulos",
                "body_text": "La neurociencia visual demuestra que las curvas suaves comunican cercanía y empatía, mientras que los ángulos geométricos comunican precisión técnica, velocidad y autoridad.",
                "narration": "En el Paso 4 utilizamos la Ingeniería Kansei y el Diferencial Semántico de Osgood. Nuestro cerebro asocia instantáneamente curvas suaves con empatía, y trazos geométricos con tecnología y precisión."
            },
            {
                "phase_tag": "3/4 · IMPORTANCIA: LAS 4 FAMILIAS ARQUITECTÓNICAS",
                "headline": "Calibrar antes de Dibujar",
                "bullet_title": "Monograma, Escudo, Trazo Continuo o Prisma 3D",
                "body_text": "Al ajustar los 7 deslizadores bipolares y elegir entre las 4 Familias Arquitectónicas Base, establecemos el plano maestro sobre el cual refinaremos tu logotipo en el siguiente paso.",
                "narration": "Calibrar estos siete ejes y elegir tu familia arquitectónica base —ya sea monograma, escudo, trazo fluido o prisma— es fundamental para que el logotipo refleje la personalidad exacta de tu negocio."
            },
            {
                "phase_tag": "4/4 · EJEMPLO BREVE Y ENTRADA AL PASO 4",
                "headline": "Ejemplo Real: Airbnb vs. Tesla",
                "bullet_title": "Dos Polos de Tensión Visual Exitosos",
                "body_text": "Airbnb usa un símbolo continuo curvo ('Bélo') porque vende pertenencia humana; Tesla usa vértices afilados y simetría técnica porque vende ingeniería eléctrica de vanguardia.",
                "narration": "Observa la diferencia entre Airbnb, que usa un trazo curvo continuo para transmitir calidez, y Tesla, que emplea ángulos precisos de ingeniería. ¡Entremos al Paso 4 para calibrar tu marca!"
            }
        ]
    },
    {
        "step": 5,
        "transition_label": "RESUMEN DEL PASO 4 → ENTRADA AL PASO 5",
        "title": "Paso 5: Aislamiento Ceteris Paribus de 24 Atributos y Logo Final",
        "theory_badge": "TEORÍA 05 · MÉTODO CETERIS PARIBUS & LEYES DE LA GESTALT",
        "accent_color": "#A855F7",
        "secondary_color": "#D4AF37",
        "svg_diagram": """
          <svg viewBox="0 0 320 220" width="100%" height="100%">
            <rect x="35" y="45" width="105" height="110" rx="14" fill="rgba(255,255,255,0.06)" stroke="#CBD5E1" stroke-width="2"/>
            <rect x="180" y="45" width="105" height="110" rx="14" fill="rgba(212,175,55,0.16)" stroke="#D4AF37" stroke-width="2.5"/>
            <circle cx="87" cy="100" r="26" fill="none" stroke="#FFFFFF" stroke-width="2"/>
            <circle cx="232" cy="100" r="26" fill="none" stroke="#FDE68A" stroke-width="7"/>
            <text x="87" y="142" text-anchor="middle" fill="#CBD5E1" font-family="Plus Jakarta Sans" font-size="10" font-weight="700">Opción A (Fino)</text>
            <text x="232" y="142" text-anchor="middle" fill="#FDE68A" font-family="Plus Jakarta Sans" font-size="10" font-weight="800">Opción B (Bold)</text>
            <text x="160" y="190" text-anchor="middle" fill="#E2E8F0" font-family="JetBrains Mono" font-size="10">1 SOLO ATRIBUTO AISLADO POR DUELO (24/24)</text>
          </svg>
        """,
        "scenes": [
            {
                "phase_tag": "1/4 · RESUMEN DEL PASO 4 COMPLETADO",
                "headline": "¡Personalidad y Familia Base Calibradas!",
                "bullet_title": "Tu Estructura Madre ya está Definida",
                "body_text": "Ya configuraste los 7 ejes bipolares y elegiste la familia arquitectónica de tu símbolo. Ahora afinaremos con bisturí cada rasgo gráfico antes de ensamblar tu logotipo final.",
                "narration": "¡Excelente! Ya definiste los siete ejes de personalidad y la familia arquitectónica base de tu marca. Ahora pasaremos a perfeccionar cada detalle visual mediante veinticuatro duelos de precisión."
            },
            {
                "phase_tag": "2/4 · LA TEORÍA: AISLAMIENTO CETERIS PARIBUS",
                "headline": "Teoría: Cambiar 1 Solo Atributo a la Vez",
                "bullet_title": "12 de Forma (B/N) · 6 de Tipografía · 6 de Color",
                "body_text": "Bajo el principio científico Ceteris Paribus ('todo lo demás constante'), en cada par A/B mantenemos idéntico el boceto y cambiamos un único parámetro para aislar tu preferencia real.",
                "narration": "Utilizamos el principio científico Ceteris Paribus: en cada comparación verás la misma estructura, cambiando únicamente un atributo a la vez: primero doce de forma en blanco y negro, luego seis de tipografía y seis de color."
            },
            {
                "phase_tag": "3/4 · IMPORTANCIA: PRIMERO FORMA EN B/N, LUEGO COLOR",
                "headline": "¿Por qué evaluamos primero en Blanco y Negro?",
                "bullet_title": "Regla de Oro de Paul Rand y Pentagram",
                "body_text": "El color emociona, pero puede distraer de un trazo débil. Si un símbolo funciona en blanco y negro a 16 píxeles (favicon de app) y en fachada, funcionará siempre.",
                "narration": "Los grandes estudios como Pentagram evalúan primero la geometría en blanco y negro porque el color puede engañar al ojo. Al final de los veinticuatro duelos, generaremos cuatro propuestas finales con tu nombre oficial."
            },
            {
                "phase_tag": "4/4 · EJEMPLO BREVE Y ENTRADA AL PASO 5",
                "headline": "Ejemplo Real: El Espacio Negativo de FedEx y Apple",
                "bullet_title": "Decisiones Micro-geométricas que Crean Iconos",
                "body_text": "Aislar si prefieres vértices redondeados o rectos, trazo fino o bold, y serif o sans-serif geométrica nos permite sintetizar tu Logotipo Oficial sin adivinanzas.",
                "narration": "Por ejemplo, decidir aisladamente el radio de las esquinas o el peso tipográfico es lo que separa un boceto amateur de un logotipo icónico. ¡Comencemos con el Duelo 1 del Paso 5!"
            }
        ]
    },
    {
        "step": 6,
        "transition_label": "RESUMEN DEL PASO 5 → ENTRADA AL PASO 6",
        "title": "Paso 6: Brandbook Maestro y Norma Técnica Internacional",
        "theory_badge": "TEORÍA 06 · SISTEMAS DE IDENTIDAD & NORMA ISO 12647-2",
        "accent_color": "#D4AF37",
        "secondary_color": "#10B981",
        "svg_diagram": """
          <svg viewBox="0 0 320 220" width="100%" height="100%">
            <g stroke="rgba(212,175,55,0.28)" stroke-width="1">
              <line x1="60" y1="30" x2="60" y2="170"/><line x1="110" y1="30" x2="110" y2="170"/>
              <line x1="160" y1="30" x2="160" y2="170"/><line x1="210" y1="30" x2="210" y2="170"/><line x1="260" y1="30" x2="260" y2="170"/>
              <line x1="40" y1="55" x2="280" y2="55"/><line x1="40" y1="100" x2="280" y2="100"/><line x1="40" y1="145" x2="280" y2="145"/>
            </g>
            <rect x="85" y="55" width="150" height="90" rx="10" fill="rgba(212,175,55,0.18)" stroke="#FDE68A" stroke-width="2.5"/>
            <text x="160" y="98" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="13" font-weight="800">RETÍCULA 8X × 3X</text>
            <text x="160" y="118" text-anchor="middle" fill="#6EE7B7" font-family="JetBrains Mono" font-size="10">ISO 12647-2 · AAA</text>
            <text x="160" y="194" text-anchor="middle" fill="#FDE68A" font-family="JetBrains Mono" font-size="10">10 TOMOS CONECTADOS DE PUNTA A PUNTA</text>
          </svg>
        """,
        "scenes": [
            {
                "phase_tag": "1/4 · RESUMEN DEL PASO 5 COMPLETADO",
                "headline": "¡Logotipo Oficial y 24 Atributos Aprobados!",
                "bullet_title": "Tu Identidad Visual y Verbal están Completas",
                "body_text": "Has completado los 24 duelos de aislamiento y adoptaste el Logotipo Oficial de tu marca. Ahora compilaremos todos los pasos en tu Brandbook Maestro Ilustrado.",
                "narration": "¡Felicidades! Has elegido el logotipo oficial de tu marca tras completar los veinticuatro duelos de aislamiento. Ahora integraremos absolutamente todo tu recorrido en el Brandbook Maestro."
            },
            {
                "phase_tag": "2/4 · LA TEORÍA: SISTEMAS DE GOBERNANZA VISUAL",
                "headline": "Teoría: Retícula Constructiva y Reproducción Fiel",
                "bullet_title": "Massimo Vignelli · Norma ISO 12647-2 (FOGRA39) y WCAG AAA",
                "body_text": "Un logotipo sin reglas técnicas se deforma en manos de terceros. El Brandbook establece la retícula 8X por 3X, el área de protección 1X, perfiles CMYK FOGRA39 y contraste digital AAA.",
                "narration": "Como enseñó Massimo Vignelli, un manual de identidad es la constitución técnica de tu marca. Establece la retícula constructiva, el área de aislamiento, las tintas para imprenta y el contraste en pantallas."
            },
            {
                "phase_tag": "3/4 · IMPORTANCIA: CONTINUIDAD TOTAL DEL PASO 1 AL 6",
                "headline": "¿Por qué este Manual protege tu Inversión?",
                "bullet_title": "Guía Lista para Desarrolladores, Diseñadores e Imprentas",
                "body_text": "Tu manual une el Propósito (Paso 1), los Touchpoints reales de tu giro (Paso 2), el Nombre Oficial (Paso 3), la Geometría (Paso 4) y el Logotipo adoptado (Paso 5) sin contradicciones.",
                "narration": "Este documento evita que programadores, agencias o proveedores distorsionen tu marca. Conecta sin fisuras tu propósito, tus touchpoints reales, tu nombre oficial y tu logotipo final."
            },
            {
                "phase_tag": "4/4 · EJEMPLO BREVE Y APERTURA DEL BRANDBOOK",
                "headline": "Ejemplo Real: Manual de la NASA y Apple HIG",
                "bullet_title": "Consistencia desde un Ícono de 16px hasta Corporativo",
                "body_text": "Gracias a sus normas de escala mínima, usos incorrectos prohibidos y hojas de producción en 1 página, cualquier colaborador aplica la marca con precisión quirúrgica.",
                "narration": "Igual que los manuales técnicos de la NASA o Apple, tu Brandbook incluye láminas ilustradas y hojas técnicas listas para descargar en PDF. ¡Abramos tu Brandbook Maestro en el Paso 6!"
            }
        ]
    }
]


def get_audio_duration_seconds(audio_path: Path) -> float:
    """Obtiene la duración exacta del archivo de audio usando ffmpeg -i."""
    proc = subprocess.run(
        [FFMPEG_BIN, "-i", str(audio_path)],
        capture_output=True,
        text=True
    )
    out = proc.stderr or ""
    for line in out.splitlines():
        if "Duration:" in line:
            try:
                dur_str = line.split("Duration:")[1].split(",")[0].strip()
                parts = dur_str.split(":")
                return int(parts[0]) * 3600 + int(parts[1]) * 60 + float(parts[2])
            except Exception:
                pass
    return 7.5


def build_scene_html(capsule: dict, scene: dict, scene_idx: int, total_scenes: int) -> str:
    step_num = capsule["step"]
    accent = capsule["accent_color"]
    sec = capsule["secondary_color"]
    pct = int(((scene_idx + 1) / total_scenes) * 100)

    steps_pills_html = ""
    for i in range(total_scenes):
        active = (i == scene_idx)
        done = (i < scene_idx)
        bg = accent if active else ("rgba(16,185,129,0.28)" if done else "rgba(255,255,255,0.07)")
        col = "#090D16" if active else ("#6EE7B7" if done else "#94A3B8")
        border = accent if active else ("#10B981" if done else "rgba(255,255,255,0.15)")
        labels = ["1. Resumen Previo", "2. Teoría Base", "3. Importancia", "4. Ejemplo Real"]
        steps_pills_html += f"""
          <div style="padding:6px 14px; border-radius:999px; background:{bg}; color:{col}; border:1.5px solid {border}; font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:800;">
            {labels[i]}
          </div>
        """

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=JetBrains+Mono:wght@600;800&display=swap" rel="stylesheet"/>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1280px;
      height: 720px;
      overflow: hidden;
      background: radial-gradient(circle at 82% 18%, rgba(212,175,55,0.16), transparent 45%),
                  radial-gradient(circle at 15% 82%, rgba(56,189,248,0.14), transparent 48%),
                  linear-gradient(145deg, #05070C 0%, #0B111E 55%, #111827 100%);
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 36px 48px 28px 48px;
      position: relative;
    }}
    .top-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.12);
      padding-bottom: 16px;
    }}
    .brand-tag {{
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 800;
      color: #FDE68A;
      background: rgba(212,175,55,0.14);
      border: 1.5px solid {accent};
      padding: 7px 16px;
      border-radius: 999px;
      letter-spacing: 0.06em;
    }}
    .main-grid {{
      display: grid;
      grid-template-columns: 1.38fr 0.92fr;
      gap: 34px;
      align-items: center;
      margin: 12px 0;
      flex: 1;
    }}
    .left-card {{
      background: rgba(255,255,255,0.04);
      border: 1.5px solid rgba(255,255,255,0.14);
      border-left: 6px solid {accent};
      border-radius: 22px;
      padding: 28px 32px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.45);
    }}
    .phase-chip {{
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 800;
      color: {accent};
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 10px;
    }}
    h1 {{
      font-size: 35px;
      font-weight: 800;
      line-height: 1.16;
      color: #FFFFFF;
      margin-bottom: 14px;
    }}
    .sub-box {{
      background: rgba(9,13,22,0.75);
      border: 1px solid rgba(212,175,55,0.35);
      border-radius: 14px;
      padding: 16px 20px;
      margin-top: 10px;
    }}
    .sub-title {{
      font-size: 18px;
      font-weight: 800;
      color: #FDE68A;
      margin-bottom: 6px;
    }}
    .sub-body {{
      font-size: 19px;
      line-height: 1.45;
      color: #E2E8F0;
      font-weight: 500;
    }}
    .right-diagram {{
      background: rgba(9,13,22,0.82);
      border: 2px solid rgba(212,175,55,0.38);
      border-radius: 24px;
      height: 330px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      position: relative;
      box-shadow: inset 0 0 40px rgba(212,175,55,0.08);
    }}
    .diagram-caption {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 800;
      color: {sec};
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 10px;
      text-align: center;
    }}
    .subtitle-bar {{
      background: rgba(5, 7, 12, 0.92);
      border: 1.5px solid rgba(212,175,55,0.55);
      border-radius: 16px;
      padding: 14px 24px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    }}
    .subtitle-text {{
      font-size: 20px;
      font-weight: 700;
      color: #FEF3C7;
      line-height: 1.35;
    }}
    .progress-track {{
      width: 100%;
      height: 6px;
      background: rgba(255,255,255,0.12);
      border-radius: 999px;
      margin-top: 12px;
      overflow: hidden;
    }}
    .progress-fill {{
      width: {pct}%;
      height: 100%;
      background: linear-gradient(90deg, {accent}, {sec});
    }}
  </style>
</head>
<body>
  <div class="top-bar">
    <div class="brand-tag">🎬 CÁPSULA TEÓRICA PASO {step_num} · {capsule["transition_label"]}</div>
    <div style="display:flex; gap:8px;">
      {steps_pills_html}
    </div>
  </div>

  <div class="main-grid">
    <div class="left-card">
      <span class="phase-chip">✦ {scene["phase_tag"]}</span>
      <h1>{scene["headline"]}</h1>
      <div class="sub-box">
        <div class="sub-title">💡 {scene["bullet_title"]}</div>
        <div class="sub-body">{scene["body_text"]}</div>
      </div>
    </div>

    <div class="right-diagram">
      <div style="width:100%; height:245px; display:flex; align-items:center; justify-content:center;">
        {capsule["svg_diagram"]}
      </div>
      <div class="diagram-caption">{capsule["theory_badge"]}</div>
    </div>
  </div>

  <div>
    <div class="subtitle-bar">
      <div class="subtitle-text">🗣️ AURA: «{scene["narration"]}»</div>
    </div>
    <div class="progress-track">
      <div class="progress-fill"></div>
    </div>
  </div>
</body>
</html>"""


def generate_all_capsules():
    VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        for capsule in CAPSULES_SPEC:
            step_num = capsule["step"]
            out_mp4 = VIDEOS_OUT_DIR / f"capsula_teoria_paso_{step_num}.mp4"
            print(f"\n=== Generando Cápsula de Video Paso {step_num}: {out_mp4.name} ===")

            with tempfile.TemporaryDirectory() as tmpdir:
                tmp_path = Path(tmpdir)
                segment_files = []
                total_scenes = len(capsule["scenes"])
                total_duration = 0.0

                for idx, scene in enumerate(capsule["scenes"]):
                    html_file = tmp_path / f"scene_{idx}.html"
                    png_file = tmp_path / f"scene_{idx}.png"
                    aiff_file = tmp_path / f"scene_{idx}.aiff"
                    seg_mp4 = tmp_path / f"seg_{idx}.mp4"

                    html_content = build_scene_html(capsule, scene, idx, total_scenes)
                    html_file.write_text(html_content, encoding="utf-8")

                    page.goto(f"file://{html_file}")
                    page.wait_for_timeout(120)
                    page.screenshot(path=str(png_file))

                    # Generar voz en español con macOS `say -v Paulina` (190 palabras por minuto para ritmo ágil y claro)
                    subprocess.run(
                        ["/usr/bin/say", "-v", "Paulina", "-r", "192", "-o", str(aiff_file), scene["narration"]],
                        check=True
                    )
                    dur = get_audio_duration_seconds(aiff_file) + 0.35
                    total_duration += dur

                    # Crear segmento MP4 (imagen HD + audio AAC con codificador H.264 compatible con todos los navegadores)
                    subprocess.run(
                        [
                            FFMPEG_BIN, "-y",
                            "-loop", "1",
                            "-framerate", "24",
                            "-i", str(png_file),
                            "-i", str(aiff_file),
                            "-c:v", "libopenh264",
                            "-b:v", "1800k",
                            "-pix_fmt", "yuv420p",
                            "-c:a", "aac",
                            "-b:a", "160k",
                            "-ar", "44100",
                            "-t", f"{dur:.2f}",
                            "-shortest",
                            str(seg_mp4)
                        ],
                        check=True
                    )
                    segment_files.append(seg_mp4)

                # Concatenar los 4 segmentos en el MP4 final con faststart para reproducción web instantánea
                concat_list = tmp_path / "concat.txt"
                concat_list.write_text(
                    "\n".join([f"file '{seg.name}'" for seg in segment_files]),
                    encoding="utf-8"
                )
                subprocess.run(
                    [
                        FFMPEG_BIN, "-y",
                        "-f", "concat",
                        "-safe", "0",
                        "-i", str(concat_list),
                        "-c", "copy",
                        "-movflags", "+faststart",
                        str(out_mp4)
                    ],
                    check=True
                )
                size_kb = out_mp4.stat().st_size / 1024.0
                print(f"✓ {out_mp4.name} generado ({size_kb:.1f} KB, {total_duration:.1f}s)")
                manifest.append({
                    "step": step_num,
                    "video_url": f"/assets/videos/{out_mp4.name}",
                    "duration_sec": round(total_duration, 1),
                    "size_kb": round(size_kb, 1),
                    "title": capsule["title"],
                    "theory_badge": capsule["theory_badge"],
                    "scenes": capsule["scenes"]
                })

        browser.close()

    manifest_path = VIDEOS_OUT_DIR / "capsules_manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✓ Manifiesto guardado en {manifest_path}")


if __name__ == "__main__":
    generate_all_capsules()
