#!/usr/bin/env python3
"""
Generador de los 7 Videos Animados con Personajes de Nivel Mundial (HD 1280x720 MP4)
para TheBestBrand (Pasos 0 al 6 + Nuevos Temas: Subida/Evolución de Logo Base,
Sincronización Multi-Dispositivo, Iteración Abierta Gemini Vision y Brandbook 30 Láminas C-00).

Mecanismo Técnico de Animación Multi-Clip:
1. Define los 7 Guiones Cinematográficos (1 por Tema/Paso, del Paso 0 al Paso 6),
   cada uno dividido en 4 Clips Narrativos con:
   - Personaje 1: AURA (Orbe Cuántico Superior Centrado + Avatar Holográfico con Lip-Sync).
   - Personaje 2: EL AUTOR MAESTRO DEL TEMA (Personaje animado con gestos de brazo, parpadeo y lip-sync:
     David Aaker & Sagi Haviv, Simon Sinek, Don Norman & Lemon/Verhoef, Alexandra Watkins & David Placek,
     Mitsuo Nagamachi & Robert Bringhurst, Paul Rand & Jony Ive, Massimo Vignelli & Jorge "El Oso").
   - Personaje 3: EL FUNDADOR / CREADOR (Personaje interactuando en vivo con la plataforma).
2. Por cada clip (28 clips en total), sintetiza la locución en español (`say -v Paulina`)
   y renderiza 8 fotogramas clave progresivos (`frame_00.png` .. `frame_07.png`) en Chromium Headless
   (Playwright) donde los personajes hablan (lip-sync), mueven los brazos señalando el pizarrón,
   parpadean y el diagrama interactivo cobra vida cuadro por cuadro.
3. Codifica cada clip en MP4 (H.264 + AAC, 24fps) y une los 4 clips de cada tema mediante `ffmpeg concat`
   con `-movflags +faststart` en `apps/web/assets/videos/capsula_teoria_paso_0.mp4` .. `capsula_teoria_paso_6.mp4`.
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
        "step": 0,
        "transition_label": "PUNTO DE PARTIDA · GIRO, LOGOTIPO BASE Y MULTI-DISPOSITIVO",
        "title": "Paso 0: Objetivo, Evolución de Logo Actual y Giro del Negocio",
        "theory_badge": "TEORÍA 00 · DAVID AAKER, SAGI HAVIV & PETER DRUCKER",
        "accent_color": "#0284C7",
        "secondary_color": "#FF7A00",
        "author_name": "David Aaker & Sagi Haviv",
        "author_role": "Capital de Marca y Evolución de Símbolos",
        "author_avatar_theme": "aaker_haviv",
        "founder_name": "Elena · Fundadora",
        "board_type": "step0_logo_upload_and_giro",
        "scenes": [
            {
                "phase_tag": "CLIP 1/4 · EL PUNTO DE PARTIDA ESTRATÉGICO",
                "headline": "¿Crear desde Cero, Evolucionar o Crear una Sub-marca?",
                "bullet_title": "Cita de Autor: Peter Drucker & Marty Neumeier",
                "body_text": "Como enseñó Peter Drucker, toda gran transformación empieza definiendo la misión actual. Elige tu objetivo mientras Aura te responde en menos de 10 segundos.",
                "narration": "Hola, soy Aura. Como afirma Peter Drucker, la mejor forma de predecir el futuro es creándolo. En el Paso cero eliges si construyes tu marca desde cero, evolucionas la actual o creas una sub-marca."
            },
            {
                "phase_tag": "CLIP 2/4 · SUBE TU LOGO ACTUAL: MANTENER O EVOLUCIONAR",
                "headline": "Nuevo Motor para Marcas con Nombre o Logotipo Existente",
                "bullet_title": "Cita de Autor: David Aaker & Sagi Haviv",
                "body_text": "David Aaker demostró que tu logo actual guarda valor acumulado. Súbelo en PNG o SVG: extraemos sus colores y decides si mantenerlo o evolucionarlo como base.",
                "narration": "Si ya tienes nombre y logotipo, David Aaker y Sagi Haviv recomiendan proteger tu capital visual. Ahora puedes subir tu logo actual para mantenerlo intacto o pedirle al motor que lo tome como base y lo mejore."
            },
            {
                "phase_tag": "CLIP 3/4 · GIRO COMERCIAL QUE ALIMENTA TODO EL SISTEMA",
                "headline": "Describe tu Giro: El Motor Adapta Preguntas y Láminas",
                "bullet_title": "Cita de Autor: Al Ries, Jack Trout & Clayton Christensen",
                "body_text": "Al describir a qué se dedica tu negocio con tus palabras, el sistema sintetiza tu esencia para personalizar automáticamente los Pasos 1 al 6.",
                "narration": "Siguiendo a Al Ries y Jack Trout en Posicionamiento, cuando describes tu giro con claridad en el tercer sub-paso, el sistema adapta automáticamente tus preguntas, puntos de contacto y propuestas."
            },
            {
                "phase_tag": "CLIP 4/4 · SINCRONIZACIÓN EN VIVO Y RESPUESTAS DE AURA",
                "headline": "Tu Cuenta Sincronizada en Todos tus Dispositivos",
                "bullet_title": "Continuidad Total en iPhone, iPad y Computadora",
                "body_text": "Con solo iniciar sesión controlas tus dispositivos activos y escuchas el consejo breve de Aura con referencias de autores en cada interacción.",
                "narration": "Además, tu sesión se sincroniza en tiempo real entre tu teléfono y tu computadora. En cada decisión escucharás mi respuesta breve de menos de diez segundos con el respaldo de los grandes autores."
            }
        ]
    },
    {
        "step": 1,
        "transition_label": "BIENVENIDA DEL PASO 0 → ENTRADA AL PASO 1",
        "title": "Paso 1: El Círculo Dorado y la Promesa de Valor",
        "theory_badge": "TEORÍA 01 · SIMON SINEK, ALEX OSTERWALDER & DONALD MILLER",
        "accent_color": "#D4AF37",
        "secondary_color": "#38BDF8",
        "author_name": "Simon Sinek",
        "author_role": "Autor de Start With Why (El Círculo Dorado)",
        "author_avatar_theme": "sinek",
        "founder_name": "Mateo · Fundador",
        "board_type": "step1_golden_circle",
        "scenes": [
            {
                "phase_tag": "CLIP 1/4 · DEL GIRO AL PROPÓSITO NUCLEAR",
                "headline": "Paso 1: Construyendo el Alma Estratégica de tu Marca",
                "bullet_title": "Cita de Autor: Simon Sinek & Jim Collins",
                "body_text": "Aura ya interpretó tu giro del Paso 0. Ahora definiremos tus 6 pilares estratégicos antes de trazar una sola línea gráfica.",
                "narration": "Bienvenido al Paso uno. Como demostró Jim Collins en Empresas que Sobresalen, toda marca duradera nace de cimientos estratégicos claros antes de diseñar su identidad visual."
            },
            {
                "phase_tag": "CLIP 2/4 · LA TEORÍA: EL CÍRCULO DORADO",
                "headline": "Empezar por el 'Por Qué' antes del 'Qué'",
                "bullet_title": "Cita de Autor: Simon Sinek (Start With Why)",
                "body_text": "Las marcas ordinarias dicen qué venden; las marcas líderes inspiran desde el centro: 1) ¿Por qué existes?, 2) ¿Cómo lo haces único?, y 3) ¿Qué entregas?",
                "narration": "La teoría del Círculo Dorado de Simon Sinek enseña que la gente no compra lo que haces, sino el porqué lo haces. Cuando comunicas tu propósito nuclear, dejas de competir por precio."
            },
            {
                "phase_tag": "CLIP 3/4 · OFERTA DE VALOR Y PLAN DE 3 PASOS",
                "headline": "Claridad que Elimina la Fricción de Compra",
                "bullet_title": "Cita de Autor: Alex Osterwalder & Donald Miller",
                "body_text": "Definir tu Oferta de Valor (Osterwalder) y resumir tu método en 3 pasos simples (Donald Miller) da certidumbre inmediata a tu cliente ideal.",
                "narration": "Combinamos el Lienzo de Propuesta de Valor de Alex Osterwalder con el método StoryBrand de Donald Miller: al explicar tu proceso en tres pasos claros, tu cliente confía sin dudar."
            },
            {
                "phase_tag": "CLIP 4/4 · CASO REAL Y ENTRADA AL TALLER",
                "headline": "Ejemplo Real: Apple y Nubank",
                "bullet_title": "Vender Transformación Humana en lugar de Funciones",
                "body_text": "Nubank no vendió 'una tarjeta más'; su propósito fue liberar a las personas de la burocracia bancaria. ¡Respondamos tus 7 preguntas del Paso 1!",
                "narration": "Observa a Nubank: su propósito fue liberar a las personas de la burocracia financiera con calidez y transparencia. Entra ahora al Paso uno y construyamos tus pilares estratégicos."
            }
        ]
    },
    {
        "step": 2,
        "transition_label": "RESUMEN DEL PASO 1 → ENTRADA AL PASO 2",
        "title": "Paso 2: Arquitectura de Touchpoints (Antes, Durante y Después)",
        "theory_badge": "TEORÍA 02 · LEMON & VERHOEF, JAN CARLZON & DON NORMAN",
        "accent_color": "#10B981",
        "secondary_color": "#0284C7",
        "author_name": "Don Norman & K. Lemon",
        "author_role": "Diseño de Experiencia y Service Blueprint",
        "author_avatar_theme": "norman",
        "founder_name": "Sofía · Directora",
        "board_type": "step2_touchpoints",
        "scenes": [
            {
                "phase_tag": "CLIP 1/4 · DE LA PROMESA A LA EXPERIENCIA TANGIBLE",
                "headline": "Convirtiendo tu Propósito en Momentos de la Verdad",
                "bullet_title": "Cita de Autor: Jan Carlzon (Momentos de la Verdad)",
                "body_text": "En el Paso 1 definiste tu promesa. Como enseñó Jan Carlzon, bastan 15 segundos en un punto de contacto para demostrar la grandeza de tu marca.",
                "narration": "Excelente avance en el Paso uno. Como enseñó Jan Carlzon en los Momentos de la Verdad, cada contacto de quince segundos con tu cliente define si confía en tu marca."
            },
            {
                "phase_tag": "CLIP 2/4 · LA TEORÍA: ANTES, DURANTE Y DESPUÉS",
                "headline": "El Viaje Completo del Cliente en 3 Etapas",
                "bullet_title": "Cita de Autor: Katherine Lemon, Peter Verhoef & Lynn Shostack",
                "body_text": "Mapearemos: 1) Antes (descubrimiento y confianza), 2) Durante (compra o servicio sin fricción) y 3) Después (seguimiento, lealtad y recomendación).",
                "narration": "Según Katherine Lemon y Peter Verhoef, toda experiencia se divide en tres etapas: cómo te descubren Antes, cómo entregas valor Durante, y cómo fidelizas Después."
            },
            {
                "phase_tag": "CLIP 3/4 · ELIMINAR FRICCIONES Y CONECTAR CON EL MANUAL",
                "headline": "Por qué tus Touchpoints Dictan las Láminas de tu Brandbook",
                "bullet_title": "Cita de Autor: Don Norman (El Diseño de las Cosas Cotidianas)",
                "body_text": "Don Norman demostró que el buen diseño reduce la carga mental. Los touchpoints que elijas aquí se plasmarán en la Lámina 05 y aplicaciones del Paso 6.",
                "narration": "Don Norman explica que el diseño excelente elimina la fricción operativa. Los puntos de contacto reales que selecciones aquí alimentarán directamente las láminas de tu manual final."
            },
            {
                "phase_tag": "CLIP 4/4 · EJEMPLO REAL Y PASO A LA ACCIÓN",
                "headline": "Ejemplo Real: ImproBears y Experiencias Memorables",
                "bullet_title": "Atención 24/7, Capacitación In Situ y Portal Sin Fricción",
                "body_text": "Conectar redes y agente WhatsApp Antes, entrega impecable Durante, y seguimiento proactivo Después convierte clientes en embajadores.",
                "narration": "Cuando articulas atención ágil antes, servicio impecable durante y acompañamiento leal después, tus clientes se vuelven promotores. Seleccionemos ahora tus puntos de contacto en el Paso dos."
            }
        ]
    },
    {
        "step": 3,
        "transition_label": "RESUMEN DEL PASO 2 → ENTRADA AL PASO 3",
        "title": "Paso 3: Ingeniería de Naming, Fonética y Clases de Niza",
        "theory_badge": "TEORÍA 03 · ALEXANDRA WATKINS, DAVID PLACEK & AL RIES",
        "accent_color": "#38BDF8",
        "secondary_color": "#D4AF37",
        "author_name": "Alexandra Watkins",
        "author_role": "Creadora del Método SMILE & SCRATCH",
        "author_avatar_theme": "watkins",
        "founder_name": "Ricardo · Fundador",
        "board_type": "step3_naming",
        "scenes": [
            {
                "phase_tag": "CLIP 1/4 · LA IDENTIDAD VERBAL DE TU MARCA",
                "headline": "Bautizando o Confirmando el Nombre Oficial",
                "bullet_title": "Cita de Autor: Wally Olins & Al Ries",
                "body_text": "Tus touchpoints ya están listos. Ahora confirmaremos tu nombre actual o generaremos propuestas a partir de las raíces estratégicas de tus respuestas.",
                "narration": "Ya tienes el mapa de experiencia de tu cliente. Como afirma Wally Olins, el nombre es el primer activo verbal que pronunciarán tus clientes en cada canal."
            },
            {
                "phase_tag": "CLIP 2/4 · LA TEORÍA: MODELO SMILE & FONÉTICA",
                "headline": "Sonoridad, Recordación e Imagen Mental",
                "bullet_title": "Cita de Autor: Alexandra Watkins & David Placek (Lexicon)",
                "body_text": "Alexandra Watkins evalúa que el nombre sea Sugerente, Memorable y Emocional (SMILE), mientras David Placek optimiza su fuerza acústica en 2 a 3 sílabas.",
                "narration": "Aplicamos el modelo SMILE de Alexandra Watkins y el simbolismo fonético de David Placek: buscamos un nombre de dos a tres sílabas, fácil de recordar y con iniciales potentes."
            },
            {
                "phase_tag": "CLIP 3/4 · BLINDAJE EN CLASES DE NIZA Y DESCRIPTOR",
                "headline": "Viabilidad Legal y Descriptor de 3 Segundos",
                "bullet_title": "Cita de Autor: Alina Wheeler (Designing Brand Identity)",
                "body_text": "Vinculamos tu nombre con las Clases Internacionales de Niza de tu giro y definimos el descriptor oficial que acompañará a tu logotipo.",
                "narration": "Siguiendo a Alina Wheeler, acompañamos tu nombre oficial con un descriptor claro y verificamos sus clases internacionales de Niza para proteger tu registro legal."
            },
            {
                "phase_tag": "CLIP 4/4 · EJEMPLO REAL Y SELECCIÓN EN VIVO",
                "headline": "Ejemplo Real: Stripe, Notion y Rolex",
                "bullet_title": "Nombres Cortos con Monogramas Perfectos para Ícono 1:1",
                "body_text": "Nombres rítmicos como Rolex o Stripe brillan por su sonoridad y por proyectar un monograma limpio en cualquier pantalla o fachada.",
                "narration": "Piensa en Rolex o Stripe: nombres breves cuyas iniciales forman un monograma inconfundible. Entremos al Paso tres para confirmar el nombre y eslogan de tu marca."
            }
        ]
    },
    {
        "step": 4,
        "transition_label": "RESUMEN DEL PASO 3 → ENTRADA AL PASO 4",
        "title": "Paso 4: Ingeniería Kansei, 7 Ejes Visuales y Tipografía",
        "theory_badge": "TEORÍA 04 · MITSUO NAGAMACHI, CHARLES OSGOOD & R. BRINGHURST",
        "accent_color": "#F59E0B",
        "secondary_color": "#0284C7",
        "author_name": "Prof. Mitsuo Nagamachi",
        "author_role": "Fundador de la Ingeniería Kansei & Semiótica",
        "author_avatar_theme": "nagamachi",
        "founder_name": "Javier · Arquitecto",
        "board_type": "step4_kansei",
        "scenes": [
            {
                "phase_tag": "CLIP 1/4 · DE LA PALABRA A LA GEOMETRÍA EMOCIONAL",
                "headline": "Traduciendo tu Estrategia a Parámetros Visuales",
                "bullet_title": "Cita de Autor: Mitsuo Nagamachi (Ingeniería Kansei)",
                "body_text": "Con tu nombre confirmado, usamos la Ingeniería Kansei de Mitsuo Nagamachi para convertir emociones humanas en proporciones geométricas exactas.",
                "narration": "Con tu nombre oficial listo, entramos al Paso cuatro. El profesor Mitsuo Nagamachi creó la Ingeniería Kansei para traducir sentimientos humanos en parámetros de diseño exactos."
            },
            {
                "phase_tag": "CLIP 2/4 · PSICOLOGÍA DE LA FORMA Y 7 EJES DE OSGOOD",
                "headline": "Curvas de Cercanía vs. Ángulos de Precisión",
                "bullet_title": "Cita de Autor: V. S. Ramachandran & Charles Osgood",
                "body_text": "El efecto Bouba/Kiki demuestra que las curvas comunican empatía y los ángulos proyectan precisión técnica. Calibra los 7 ejes con referencias reales.",
                "narration": "Como demostraron Ramachandran y Charles Osgood, nuestro cerebro asocia curvas suaves con cercanía humana y ángulos rectos con precisión técnica. Desliza los siete ejes hacia tu polo ideal."
            },
            {
                "phase_tag": "CLIP 3/4 · LA TIPOGRAFÍA ES LA VOZ VISIBLE",
                "headline": "Selección Tipográfica y Estructura Base",
                "bullet_title": "Cita de Autor: Robert Bringhurst & Adrian Frutiger",
                "body_text": "Robert Bringhurst llamó a la tipografía 'el lenguaje hecho visible', y Adrian Frutiger estableció las familias estructurales de todo gran símbolo.",
                "narration": "Robert Bringhurst afirma que la tipografía es el lenguaje hecho visible, y Adrian Frutiger demostró el poder de la estructura base. Aquí elegirás tu fuente oficial y tu familia constructiva."
            },
            {
                "phase_tag": "CLIP 4/4 · EJEMPLO REAL Y PASO AL CALIBRADOR",
                "headline": "Ejemplo Real: Airbnb vs. Tesla",
                "bullet_title": "Coherencia Absoluta entre Personalidad y Trazo",
                "body_text": "Airbnb emplea curvas orgánicas para evocar hospitalidad; Tesla usa vértices agudos para proyectar ingeniería eléctrica. ¡Calibremos tu marca!",
                "narration": "Mira cómo Airbnb usa un lazo curvo para transmitir pertenencia, mientras Tesla usa ángulos de ingeniería. Calibra ahora el carácter visual de tu marca en el Paso cuatro."
            }
        ]
    },
    {
        "step": 5,
        "transition_label": "RESUMEN DEL PASO 4 → ENTRADA AL PASO 5",
        "title": "Paso 5: Estudio de Logotipo con Gemini Vision y Evolución de Base",
        "theory_badge": "TEORÍA 05 · PAUL RAND, SAGI HAVIV, JONY IVE & JOSEF ALBERS",
        "accent_color": "#A855F7",
        "secondary_color": "#D4AF37",
        "author_name": "Paul Rand & Jony Ive",
        "author_role": "Maestros de Identidad Visual y Liquid Glass",
        "author_avatar_theme": "rand_ive",
        "founder_name": "Jorge · Creador",
        "board_type": "step5_logo_studio",
        "scenes": [
            {
                "phase_tag": "CLIP 1/4 · BIENVENIDO AL TALLER DE LOGOTIPO EN VIVO",
                "headline": "Simplicidad, Fuerza Geométrica y Color Consciente",
                "bullet_title": "Cita de Autor: Paul Rand & Josef Albers",
                "body_text": "Paul Rand enseñó que un logo debe ser simple, memorable y versátil desde 16px hasta una fachada, apoyado en la interacción del color de Josef Albers.",
                "narration": "Bienvenido al Paso cinco. Como enseñó el legendario Paul Rand, un logotipo extraordinario combina simplicidad geométrica y recordación inmediata, potenciado por la armonía cromática de Josef Albers."
            },
            {
                "phase_tag": "CLIP 2/4 · CONSERVA O EVOLUCIONA TU LOGO ACTUAL COMO BASE",
                "headline": "Visión Multimodal Gemini para Mejorar tu Logo Existente",
                "bullet_title": "Cita de Autor: Sagi Haviv (Chermayeff & Geismar & Haviv)",
                "body_text": "Si subiste tu logo actual, puedes mantenerlo intacto o pulsar 'Evolucionar mi Logo': Gemini Vision analiza tu imagen y traza una evolución vectorial.",
                "narration": "Si subiste tu logotipo actual, seguimos la máxima de Sagi Haviv: respetar la esencia reconocible mientras perfeccionamos sus trazos. Gemini analiza tu imagen y crea versiones evolucionadas al instante."
            },
            {
                "phase_tag": "CLIP 3/4 · LIBERTAD CREATIVA 100% ABIERTA SIN LÍMITES",
                "headline": "Cambia el Objeto, Estilo o Proporción en Tiempo Real",
                "bullet_title": "Cita de Autor: Max Wertheimer (Gestalt) & Dieter Rams",
                "body_text": "Escribe en el cuadro inferior cualquier objeto, símbolo, tipografía o disposición: cada iteración se guarda en la barra superior para comparar.",
                "narration": "Bajo las leyes de la Gestalt de Max Wertheimer y la pureza de Dieter Rams, tienes libertad total: pide cualquier símbolo u objeto nuevo en el cuadro inferior y compara tus iteraciones arriba."
            },
            {
                "phase_tag": "CLIP 4/4 · LOCKUP PRINCIPAL + ÍCONO APP 1:1 LIQUID GLASS",
                "headline": "Doble Vista Simultánea Lista para el Brandbook",
                "bullet_title": "Cita de Autor: Jony Ive (Física Óptica y Proporción 1:1)",
                "body_text": "Observa en vivo tu logotipo horizontal o apilado arriba y tu ícono App 1:1 debajo. Al confirmarlo, se integra en tus 30 láminas del Paso 6.",
                "narration": "Inspirados en el rigor industrial de Jony Ive, visualizas al mismo tiempo tu logotipo completo y su ícono uno a uno. Cuando te enamore el resultado, confírmalo para generar tu manual."
            }
        ]
    },
    {
        "step": 6,
        "transition_label": "RESUMEN DEL PASO 5 → ENTRADA AL PASO 6",
        "title": "Paso 6: Brandbook Maestro de 30 Láminas en Curvas (Guía C-00)",
        "theory_badge": "TEORÍA 06 · MASSIMO VIGNELLI, MÜLLER-BROCKMANN & GUÍA C-00",
        "accent_color": "#0284C7",
        "secondary_color": "#10B981",
        "author_name": "Massimo Vignelli & El Oso",
        "author_role": "Sistemas de Retículas y Constitución C-00 ImproBears",
        "author_avatar_theme": "vignelli_oso",
        "founder_name": "Jorge · Director",
        "board_type": "step6_brandbook_30",
        "scenes": [
            {
                "phase_tag": "CLIP 1/4 · LA CONSTITUCIÓN VISUAL DE TU MARCA",
                "headline": "30 Láminas Horizontales Conectadas de Punta a Punta",
                "bullet_title": "Cita de Autor: Massimo Vignelli (The Vignelli Canon)",
                "body_text": "Massimo Vignelli demostró que un sistema de identidad protege el valor de la marca frente a terceros. Tu Brandbook une tus respuestas del Paso 0 al 5.",
                "narration": "Felicidades por llegar al Paso seis. Como estableció Massimo Vignelli en su Canon, un manual de identidad es la constitución que protege la coherencia de tu marca en todo momento."
            },
            {
                "phase_tag": "CLIP 2/4 · FLUJO EN CURVAS ABIERTAS Y REGLA 70/20/10",
                "headline": "Estándar Editorial C-00 de ImproBears en 30 Secciones",
                "bullet_title": "Cita de Autor: Josef Müller-Brockmann & Guía C-00 ImproBears",
                "body_text": "Diseñado sobre lienzo claro dominante, ondas vectoriales orgánicas, logotipo en positivo por defecto, acentos de tu logo y marcos fotográficos curvos.",
                "narration": "Aplicamos los sistemas de retículas de Josef Müller-Brockmann y la Guía Oficial C-Cero-Cero de ImproBears: treinta láminas en curvas abiertas sobre lienzo claro, siguiendo exactamente los colores de tu logotipo."
            },
            {
                "phase_tag": "CLIP 3/4 · ARQUITECTURA COMPLETA: DE LA FILOSOFÍA A LA IMPRENTA",
                "headline": "Retícula 8X×3X, Pantone/CMYK, Submarcas y Touchpoints",
                "bullet_title": "Cita de Autor: Danne & Blackburn (Manual NASA) & Alina Wheeler",
                "body_text": "Incluye Esencia, La Empresa como Persona, Touchpoints, Geometría, Variantes en Positivo y Negativo, Usos Incorrectos, Papelería, Uniformes y Checklist.",
                "narration": "Al igual que el manual de la NASA de Danne y Blackburn y la metodología de Alina Wheeler, tus treinta láminas cubren desde la filosofía y geometría hasta papelería, uniformes y firma digital."
            },
            {
                "phase_tag": "CLIP 4/4 · DESCARGA INSTANTÁNEA EN IPHONE, IPAD Y ESCRITORIO",
                "headline": "Exportación Ultrarrápida en PDF, HTML Autónomo y SVG",
                "bullet_title": "Compatible con Modo App en iOS y Compartir Nativo",
                "body_text": "Descarga las 30 láminas en PDF en menos de 2 segundos, abre el visor interactivo dentro de la app o exporta los vectores de tu logotipo.",
                "narration": "Con un solo toque puedes descargar tu PDF de treinta láminas en menos de dos segundos, compartirlo desde tu iPhone o exportar tu logotipo en curvas. Tu marca está lista para conquistar el mundo."
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


def build_animated_stage_html(capsule: dict, scene: dict, scene_idx: int, total_scenes: int) -> str:
    """
    Construye una escena HTML 1280x720 con personajes animados controlados por `window.setAnimFrame(frameIdx, totalFrames)`:
    - En la parte superior central (fuera del cuadro): Orbe 3D de AURA animado y pulsante + Globo de diálogo de Aura.
    - En el escenario izquierdo: El Personaje del Autor Maestro (con movimiento de boca lip-sync, parpadeo, brazo señalando)
      + El Personaje Fundador (asintiendo e interactuando).
    - En el escenario derecho: Pizarrón Cinemático Animado que construye progresivamente los elementos visuales del tema.
    """
    step_num = capsule["step"]
    accent = capsule["accent_color"]
    sec = capsule["secondary_color"]
    author_name = capsule["author_name"]
    author_role = capsule["author_role"]
    founder_name = capsule["founder_name"]
    board_type = capsule["board_type"]
    base_pct = int((scene_idx / total_scenes) * 100)
    span_pct = int((1.0 / total_scenes) * 100)

    steps_pills_html = ""
    labels = ["Clip 1 · Contexto", "Clip 2 · Teoría Autor", "Clip 3 · Sistema", "Clip 4 · Caso Real"]
    for i in range(total_scenes):
        active = (i == scene_idx)
        done = (i < scene_idx)
        bg = accent if active else ("#DCFCE7" if done else "#F1F5F9")
        col = "#FFFFFF" if active else ("#166534" if done else "#64748B")
        border = accent if active else ("#86EFAC" if done else "#CBD5E1")
        steps_pills_html += f"""
          <div style="padding:5px 13px; border-radius:999px; background:{bg}; color:{col}; border:1.5px solid {border}; font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:800;">
            {labels[i]}
          </div>
        """

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@500;700;800&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet"/>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1280px;
      height: 720px;
      overflow: hidden;
      background: #FFFFFF;
      color: #0D2540;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 18px 38px 20px 38px;
      position: relative;
    }}
    /* Curvas abiertas estilo Manual C-00 ImproBears en el fondo */
    .bg-curves {{
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }}
    .top-bar {{
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #E2E8F0;
      padding-bottom: 10px;
    }}
    .brand-tag {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 800;
      color: #0D2540;
      background: #F0F9FF;
      border: 1.5px solid {accent};
      padding: 6px 14px;
      border-radius: 999px;
    }}
    /* AURA CENTRADA EN LA PARTE SUPERIOR FUERA DEL CUADRO */
    .aura-top-hero {{
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      margin: 4px auto 2px auto;
    }}
    .aura-orb-wrap {{
      width: 66px;
      height: 66px;
      border-radius: 999px;
      background: #F0F9FF;
      border: 2.5px solid #38BDF8;
      box-shadow: 0 6px 18px rgba(2, 132, 199, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }}
    .aura-dialogue-pill {{
      background: #FFFFFF;
      border: 2px solid #BAE6FD;
      border-bottom: 4px solid #7DD3FC;
      border-radius: 14px;
      padding: 5px 18px;
      font-size: 13px;
      font-weight: 800;
      color: #0369A1;
      text-align: center;
      box-shadow: 0 4px 12px rgba(15,23,42,0.05);
    }}
    .main-stage {{
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1.12fr 0.88fr;
      gap: 24px;
      align-items: stretch;
      flex: 1;
      margin: 8px 0;
      min-height: 0;
    }}
    .left-character-stage {{
      background: linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%);
      border: 2px solid #CBD5E1;
      border-left: 6px solid {accent};
      border-radius: 22px;
      padding: 18px 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 12px 32px rgba(13, 37, 64, 0.07);
      position: relative;
      overflow: hidden;
    }}
    .phase-chip {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      font-weight: 800;
      color: {accent};
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }}
    h1 {{
      font-family: 'Montserrat', sans-serif;
      font-size: 24px;
      font-weight: 900;
      line-height: 1.18;
      color: #0D2540;
      margin-bottom: 8px;
    }}
    .theory-card {{
      background: #FFFFFF;
      border: 1.5px solid #BAE6FD;
      border-radius: 14px;
      padding: 10px 14px;
      margin-bottom: 8px;
    }}
    .theory-title {{
      font-size: 13.5px;
      font-weight: 800;
      color: #FF7A00;
      margin-bottom: 3px;
    }}
    .theory-body {{
      font-size: 14.5px;
      line-height: 1.38;
      color: #1E293B;
      font-weight: 600;
    }}
    .characters-canvas-box {{
      flex: 1;
      min-height: 185px;
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }}
    .right-board {{
      background: #0D2540;
      border: 2.5px solid {accent};
      border-radius: 22px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 14px 36px rgba(13, 37, 64, 0.16);
      position: relative;
      overflow: hidden;
    }}
    .board-caption {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      font-weight: 800;
      color: #FDE68A;
      letter-spacing: 0.05em;
      text-align: center;
      background: rgba(255,255,255,0.08);
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid rgba(253,230,138,0.35);
      width: 100%;
    }}
    .subtitle-footer {{
      position: relative;
      z-index: 2;
    }}
    .subtitle-bar {{
      background: #0D2540;
      border: 2px solid {accent};
      border-radius: 14px;
      padding: 10px 20px;
      text-align: center;
      box-shadow: 0 6px 20px rgba(13,37,64,0.14);
    }}
    .subtitle-text {{
      font-size: 16.5px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.32;
    }}
    .progress-track {{
      width: 100%;
      height: 6px;
      background: #E2E8F0;
      border-radius: 999px;
      margin-top: 8px;
      overflow: hidden;
    }}
    .progress-fill {{
      height: 100%;
      width: {base_pct + int(span_pct * 0.5)}%;
      background: linear-gradient(90deg, {accent}, #FF7A00, #10B981);
    }}
  </style>
</head>
<body>
  <svg class="bg-curves" viewBox="0 0 1280 720" preserveAspectRatio="none">
    <path d="M 0 0 L 1280 0 L 1280 140 C 960 70, 420 190, 0 95 Z" fill="#F0F9FF" opacity="0.85"/>
    <path d="M 0 720 L 1280 720 L 1280 610 C 880 680, 420 560, 0 650 Z" fill="#FFF7ED" opacity="0.85"/>
    <path d="M 0 95 C 420 190, 960 70, 1280 140" fill="none" stroke="{accent}" stroke-width="2" stroke-opacity="0.25"/>
  </svg>

  <div class="top-bar">
    <div class="brand-tag">ESTUDIO ANIMADO PASO {step_num} · {capsule["transition_label"]}</div>
    <div style="display:flex; gap:8px;">
      {steps_pills_html}
    </div>
  </div>

  <!-- AURA GRANDE, CENTRADA Y FUERA DEL CUADRO EN LA PARTE SUPERIOR -->
  <div class="aura-top-hero">
    <div class="aura-orb-wrap">
      <svg id="auraTopOrbSvg" viewBox="0 0 100 100" width="62" height="62"></svg>
    </div>
    <div class="aura-dialogue-pill">
      AURA · MENTORA DE MARCA · AUTOR INVITADO: {author_name.upper()} ({author_role.upper()})
    </div>
  </div>

  <div class="main-stage">
    <div class="left-character-stage">
      <div>
        <span class="phase-chip">{scene["phase_tag"]}</span>
        <h1>{scene["headline"]}</h1>
        <div class="theory-card">
          <div class="theory-title">{scene["bullet_title"]}</div>
          <div class="theory-body">{scene["body_text"]}</div>
        </div>
      </div>

      <!-- ESCENARIO CON PERSONAJES ANIMADOS (AUTOR + FUNDADOR + HOLOGRAMA AURA) -->
      <div class="characters-canvas-box">
        <svg id="charactersStageSvg" viewBox="0 0 640 210" width="100%" height="100%"></svg>
      </div>
    </div>

    <div class="right-board">
      <div style="width:100%; flex:1; display:flex; align-items:center; justify-content:center;">
        <svg id="dynamicBoardSvg" viewBox="0 0 460 340" width="100%" height="100%"></svg>
      </div>
      <div class="board-caption">{capsule["theory_badge"]}</div>
    </div>
  </div>

  <div class="subtitle-footer">
    <div class="subtitle-bar">
      <div class="subtitle-text">AURA: «{scene["narration"]}»</div>
    </div>
    <div class="progress-track">
      <div id="animProgressFill" class="progress-fill"></div>
    </div>
  </div>

  <script>
    const ACCENT = "{accent}";
    const SEC = "{sec}";
    const AUTHOR_NAME = "{author_name}";
    const AUTHOR_ROLE = "{author_role}";
    const FOUNDER_NAME = "{founder_name}";
    const BOARD_TYPE = "{board_type}";
    const SCENE_IDX = {scene_idx};
    const BASE_PCT = {base_pct};
    const SPAN_PCT = {span_pct};

    window.setAnimFrame = function(frameIdx, totalFrames) {{
      const t = totalFrames > 1 ? (frameIdx / (totalFrames - 1)) : 0.5;
      const angle = frameIdx * 0.85;
      const mouthOpen = (frameIdx % 2 === 0) ? 7.5 : 2.0;
      const blink = (frameIdx === 3 || frameIdx === 7) ? 0.2 : 1.0;
      const armWave = Math.sin(frameIdx * 1.2) * 14;
      const founderNod = Math.cos(frameIdx * 1.1) * 3.5;
      const pulseR = 1 + Math.sin(frameIdx * 1.4) * 0.10;

      // 1. Actualizar barra de progreso
      const pf = document.getElementById("animProgressFill");
      if (pf) pf.style.width = (BASE_PCT + SPAN_PCT * ((frameIdx + 1) / totalFrames)).toFixed(1) + "%";

      // 2. Renderizar Orbe 3D de Aura Superior Centrado
      const orbSvg = document.getElementById("auraTopOrbSvg");
      if (orbSvg) {{
        const rot1 = (frameIdx * 28) % 360;
        const rot2 = (360 - (frameIdx * 22) % 360);
        orbSvg.innerHTML = `
          <defs>
            <radialGradient id="orbG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="45%" stop-color="#38BDF8"/>
              <stop offset="85%" stop-color="#0284C7"/>
              <stop offset="100%" stop-color="#0D2540"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#orbG)"/>
          <g transform="translate(50,50) rotate(${{rot1}}) scale(${{pulseR}})">
            <ellipse cx="0" cy="0" rx="34" ry="15" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-opacity="0.85"/>
          </g>
          <g transform="translate(50,50) rotate(${{rot2}}) scale(${{pulseR}})">
            <ellipse cx="0" cy="0" rx="15" ry="34" fill="none" stroke="#FDE047" stroke-width="2.2" stroke-opacity="0.8"/>
          </g>
          <circle cx="50" cy="50" r="${{10 * pulseR}}" fill="#FFFFFF"/>
        `;
      }}

      // 3. Renderizar Escenario de Personajes Animados (Autor Maestro + Holograma Aura + Fundador)
      const charSvg = document.getElementById("charactersStageSvg");
      if (charSvg) {{
        charSvg.innerHTML = `
          <defs>
            <linearGradient id="suitAuthor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0D2540"/>
              <stop offset="100%" stop-color="#1E3A8A"/>
            </linearGradient>
            <linearGradient id="suitFounder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${{ACCENT}}"/>
              <stop offset="100%" stop-color="#0F172A"/>
            </linearGradient>
          </defs>
          <!-- Piso / Línea de Estudio -->
          <line x1="20" y1="186" x2="620" y2="186" stroke="#CBD5E1" stroke-width="2"/>
          <ellipse cx="145" cy="186" rx="68" ry="8" fill="#E2E8F0"/>
          <ellipse cx="325" cy="186" rx="52" ry="7" fill="#BAE6FD"/>
          <ellipse cx="500" cy="186" rx="64" ry="8" fill="#E2E8F0"/>

          <!-- PERSONAJE 1 (IZQUIERDA): EL AUTOR MAESTRO DEL TEMA HABLANDO Y SEÑALANDO -->
          <g transform="translate(145, 112)">
            <!-- Torso / Traje Editorial -->
            <path d="M -42 74 L -34 18 C -32 4, 32 4, 34 18 L 42 74 Z" fill="url(#suitAuthor)"/>
            <!-- Solapa y Corbata / Pañuelo de Autor -->
            <polygon points="-10,10 10,10 0,38" fill="#F8FAFC"/>
            <polygon points="-4,20 4,20 3,52 -3,52" fill="#FF7A00"/>
            <!-- Brazo Izquierdo en Reposo -->
            <path d="M -34 20 Q -50 45 -38 68" fill="none" stroke="#0D2540" stroke-width="11" stroke-linecap="round"/>
            <circle cx="-38" cy="68" r="6" fill="#FDBA74"/>
            <!-- Brazo Derecho Animado Señalando al Pizarrón -->
            <g transform="translate(32, 22) rotate(${{-28 + armWave}})">
              <line x1="0" y1="0" x2="48" y2="-16" stroke="#1E3A8A" stroke-width="11" stroke-linecap="round"/>
              <circle cx="52" cy="-18" r="6.5" fill="#FDBA74"/>
              <!-- Puntero Láser / Pluma Estilográfica del Autor -->
              <line x1="54" y1="-18" x2="76" y2="-28" stroke="#FF7A00" stroke-width="3.5" stroke-linecap="round"/>
              <circle cx="77" cy="-29" r="3.5" fill="#38BDF8"/>
            </g>
            <!-- Cabeza del Autor -->
            <g transform="translate(0, ${{-18 + founderNod * 0.4}})">
              <circle cx="0" cy="0" r="24" fill="#FDBA74" stroke="#0D2540" stroke-width="2"/>
              <!-- Cabello / Estilo Distintivo -->
              <path d="M -24 -6 C -22 -28, 22 -28, 24 -6 C 18 -16, -18 -16, -24 -6 Z" fill="#334155"/>
              <!-- Gafas Intelectuales de Autor -->
              <rect x="-17" y="-7" width="13" height="9" rx="3" fill="none" stroke="#0D2540" stroke-width="2.2"/>
              <rect x="4" y="-7" width="13" height="9" rx="3" fill="none" stroke="#0D2540" stroke-width="2.2"/>
              <line x1="-4" y1="-3" x2="4" y2="-3" stroke="#0D2540" stroke-width="2"/>
              <!-- Ojos con Parpadeo -->
              <ellipse cx="-10.5" cy="-2.5" rx="2.3" ry="${{2.3 * blink}}" fill="#0D2540"/>
              <ellipse cx="10.5" cy="-2.5" rx="2.3" ry="${{2.3 * blink}}" fill="#0D2540"/>
              <!-- Boca Animada (Lip-Sync) -->
              <ellipse cx="0" cy="11" rx="6.5" ry="${{mouthOpen * 0.65}}" fill="#991B1B" stroke="#0D2540" stroke-width="1.5"/>
            </g>
            <!-- Globo de Cita Breve sobre el Autor -->
            <g transform="translate(-85, -92)">
              <rect x="0" y="0" width="174" height="34" rx="10" fill="#0D2540" stroke="${{ACCENT}}" stroke-width="1.8"/>
              <text x="87" y="14" text-anchor="middle" fill="#FDE047" font-family="Montserrat" font-size="9.5" font-weight="800">${{AUTHOR_NAME.toUpperCase()}}</text>
              <text x="87" y="26" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="8.5" font-weight="600">${{AUTHOR_ROLE.slice(0, 32)}}</text>
            </g>
          </g>

          <!-- PERSONAJE 2 (CENTRO): AVATAR HOLOGRÁFICO DE AURA EN EL ESTUDIO -->
          <g transform="translate(325, 108)">
            <!-- Pedestal de Luz -->
            <polygon points="-28,78 28,78 18,52 -18,52" fill="#0284C7" opacity="0.22"/>
            <!-- Haz Holográfico -->
            <polygon points="-18,52 18,52 38,-22 -38,-22" fill="#38BDF8" opacity="0.14"/>
            <!-- Figura Holográfica de Aura -->
            <g transform="translate(0, ${{Math.sin(frameIdx * 1.1) * 4}})">
              <path d="M -22 48 C -20 18, 20 18, 22 48 Z" fill="#0284C7" opacity="0.85" stroke="#38BDF8" stroke-width="2"/>
              <circle cx="0" cy="-4" r="19" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/>
              <!-- Ojos Luminosos y Boca Lip-Sync de Aura -->
              <ellipse cx="-6.5" cy="-6" rx="2.2" ry="${{2.4 * blink}}" fill="#0284C7"/>
              <ellipse cx="6.5" cy="-6" rx="2.2" ry="${{2.4 * blink}}" fill="#0284C7"/>
              <ellipse cx="0" cy="4" rx="5.5" ry="${{mouthOpen * 0.55}}" fill="#0284C7"/>
              <!-- Ondas Acústicas de Menos de 10 Segundos -->
              <circle cx="0" cy="-4" r="${{25 + (frameIdx % 3) * 6}}" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.75"/>
            </g>
            <rect x="-54" y="60" width="108" height="20" rx="10" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.5"/>
            <text x="0" y="73" text-anchor="middle" fill="#0369A1" font-family="JetBrains Mono" font-size="9" font-weight="800">AURA · VOZ &lt;=10S</text>
          </g>

          <!-- PERSONAJE 3 (DERECHA): FUNDADOR / CREADOR DE MARCA INTERACTUANDO -->
          <g transform="translate(500, 114)">
            <path d="M -38 72 L -30 18 C -28 5, 28 5, 30 18 L 38 72 Z" fill="url(#suitFounder)"/>
            <!-- Tablet / Lienzo de TheBestBrand en manos del Fundador -->
            <g transform="translate(-26, 26) rotate(${{-8 + founderNod}})">
              <rect x="-24" y="-12" width="44" height="30" rx="5" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5"/>
              <circle cx="-2" cy="3" r="7" fill="${{ACCENT}}" opacity="0.85"/>
              <line x1="-14" y1="13" x2="10" y2="13" stroke="#FF7A00" stroke-width="2.5"/>
            </g>
            <!-- Brazo Derecho Levantando Pulgar / Construyendo -->
            <g transform="translate(28, 24) rotate(${{18 - armWave * 0.7}})">
              <line x1="0" y1="0" x2="28" y2="-18" stroke="#0F172A" stroke-width="10" stroke-linecap="round"/>
              <circle cx="30" cy="-20" r="6" fill="#FDE68A"/>
            </g>
            <!-- Cabeza del Fundador -->
            <g transform="translate(0, ${{-17 - founderNod * 0.5}})">
              <circle cx="0" cy="0" r="22" fill="#FDE68A" stroke="#0D2540" stroke-width="2"/>
              <path d="M -22 -5 C -20 -26, 20 -26, 22 -5 C 14 -14, -14 -14, -22 -5 Z" fill="#0F172A"/>
              <ellipse cx="-8" cy="-2" rx="2.2" ry="${{2.2 * blink}}" fill="#0D2540"/>
              <ellipse cx="8" cy="-2" rx="2.2" ry="${{2.2 * blink}}" fill="#0D2540"/>
              <path d="M -6 8 Q 0 ${{13 + (frameIdx % 2) * 3}} 6 8" fill="none" stroke="#0D2540" stroke-width="2.2" stroke-linecap="round"/>
            </g>
            <rect x="-64" y="-76" width="128" height="24" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
            <text x="0" y="-60" text-anchor="middle" fill="#065F46" font-family="Montserrat" font-size="9.5" font-weight="800">${{FOUNDER_NAME.toUpperCase()}}</text>
          </g>
        `;
      }}

      // 4. Renderizar Pizarrón Dinámico a la Derecha según el Tema y el Fotograma
      const boardSvg = document.getElementById("dynamicBoardSvg");
      if (boardSvg) {{
        const prog = (frameIdx + 1) / totalFrames;
        if (BOARD_TYPE === "step0_logo_upload_and_giro") {{
          boardSvg.innerHTML = `
            <rect x="16" y="14" width="428" height="312" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" stroke-width="1.5"/>
            <text x="230" y="44" text-anchor="middle" fill="#38BDF8" font-family="JetBrains Mono" font-size="12" font-weight="800">MOTOR DE LOGOTIPO BASE + GIRO (PASO 0)</text>
            <!-- Tarjeta Izquierda: Logo Actual Subido -->
            <g transform="translate(36, 66)">
              <rect x="0" y="0" width="160" height="150" rx="14" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
              <text x="80" y="24" text-anchor="middle" fill="#BAE6FD" font-family="Montserrat" font-size="10" font-weight="800">1. SUBE TU LOGO ACTUAL</text>
              <circle cx="80" cy="76" r="34" fill="#FFFFFF" stroke="#0284C7" stroke-width="3"/>
              <path d="M 64 88 L 80 54 L 96 88 Z" fill="#0284C7"/>
              <circle cx="80" cy="72" r="7" fill="#FF7A00"/>
              <text x="80" y="132" text-anchor="middle" fill="#FDE047" font-family="JetBrains Mono" font-size="9.5" font-weight="800">#0284C7 · #FF7A00</text>
            </g>
            <!-- Flecha de Transformación Animada -->
            <g transform="translate(206, 132)">
              <line x1="0" y1="0" x2="44" y2="0" stroke="#FDE047" stroke-width="4" stroke-dasharray="6 4"/>
              <polygon points="48,0 36,-8 36,8" fill="#FDE047" transform="translate(${{Math.sin(frameIdx)*4}}, 0)"/>
            </g>
            <!-- Tarjeta Derecha: Mantener o Evolucionar con Gemini Vision -->
            <g transform="translate(264, 66)">
              <rect x="0" y="0" width="160" height="150" rx="14" fill="#0F172A" stroke="#10B981" stroke-width="2.5"/>
              <text x="80" y="24" text-anchor="middle" fill="#6EE7B7" font-family="Montserrat" font-size="10" font-weight="800">2. MANTENER O MEJORAR</text>
              <g transform="translate(80, 76) scale(${{0.92 + 0.12 * Math.sin(frameIdx)}})">
                <rect x="-36" y="-36" width="72" height="72" rx="18" fill="#0284C7" stroke="#FFFFFF" stroke-width="2.5"/>
                <path d="M -18 16 L 0 -22 L 18 16 L 0 8 Z" fill="#FFFFFF"/>
                <circle cx="0" cy="-6" r="8" fill="#FF7A00"/>
              </g>
              <text x="80" y="132" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="9.5" font-weight="800">30 Láminas Sincronizadas</text>
            </g>
            <!-- Barra Inferior de Modos -->
            <rect x="36" y="236" width="184" height="36" rx="10" fill="${{frameIdx % 2 === 0 ? '#0284C7' : '#1E293B'}}" stroke="#38BDF8" stroke-width="1.5"/>
            <text x="128" y="259" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat" font-size="11" font-weight="800">Mantener mi logo actual</text>
            <rect x="240" y="236" width="184" height="36" rx="10" fill="${{frameIdx % 2 === 1 ? '#10B981' : '#1E293B'}}" stroke="#6EE7B7" stroke-width="1.5"/>
            <text x="332" y="259" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat" font-size="11" font-weight="800">Tomarlo como base + IA</text>
            <text x="230" y="302" text-anchor="middle" fill="#93C5FD" font-family="JetBrains Mono" font-size="10.5" font-weight="800">CITA: DAVID AAKER &amp; SAGI HAVIV · BRAND EQUITY</text>
          `;
        }} else if (BOARD_TYPE === "step1_golden_circle") {{
          boardSvg.innerHTML = `
            <circle cx="230" cy="155" r="${{112 + Math.sin(frameIdx)*4}}" fill="rgba(212,175,55,0.10)" stroke="#D4AF37" stroke-width="2.5" stroke-dasharray="7 5"/>
            <circle cx="230" cy="155" r="${{76 + Math.cos(frameIdx)*3}}" fill="rgba(56,189,248,0.16)" stroke="#38BDF8" stroke-width="2.5"/>
            <circle cx="230" cy="155" r="${{42 * pulseR}}" fill="rgba(255,122,0,0.32)" stroke="#FDE047" stroke-width="3"/>
            <text x="230" y="160" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat" font-size="15" font-weight="900">1. ¿POR QUÉ?</text>
            <text x="230" y="96" text-anchor="middle" fill="#7DD3FC" font-family="Montserrat" font-size="12.5" font-weight="800">2. ¿CÓMO? (Método en 3 Pasos)</text>
            <text x="230" y="58" text-anchor="middle" fill="#FDE68A" font-family="Montserrat" font-size="12.5" font-weight="800">3. ¿QUÉ? (Oferta de Valor)</text>
            <rect x="44" y="284" width="372" height="36" rx="10" fill="rgba(255,255,255,0.08)" stroke="#D4AF37" stroke-width="1.5"/>
            <text x="230" y="307" text-anchor="middle" fill="#FDE047" font-family="JetBrains Mono" font-size="11" font-weight="800">SIMON SINEK · ALEX OSTERWALDER · DONALD MILLER</text>
          `;
        }} else if (BOARD_TYPE === "step2_touchpoints") {{
          const activeBox = frameIdx % 3;
          boardSvg.innerHTML = `
            <line x1="65" y1="150" x2="395" y2="150" stroke="#34D399" stroke-width="4" stroke-dasharray="8 5"/>
            <g transform="translate(30, 82) scale(${{activeBox === 0 ? 1.06 : 1.0}})">
              <rect x="0" y="0" width="118" height="136" rx="16" fill="${{activeBox === 0 ? 'rgba(16,185,129,0.32)' : 'rgba(16,185,129,0.14)'}}" stroke="#10B981" stroke-width="2.5"/>
              <text x="59" y="48" text-anchor="middle" fill="#6EE7B7" font-family="Montserrat" font-size="14" font-weight="900">1. ANTES</text>
              <text x="59" y="74" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="11" font-weight="700">Descubrimiento</text>
              <text x="59" y="96" text-anchor="middle" fill="#BAE6FD" font-family="JetBrains Mono" font-size="10">Web · Redes · WA</text>
            </g>
            <g transform="translate(171, 72) scale(${{activeBox === 1 ? 1.06 : 1.0}})">
              <rect x="0" y="0" width="118" height="156" rx="16" fill="${{activeBox === 1 ? 'rgba(2,132,199,0.38)' : 'rgba(2,132,199,0.18)'}}" stroke="#38BDF8" stroke-width="3"/>
              <text x="59" y="54" text-anchor="middle" fill="#FDE047" font-family="Montserrat" font-size="14" font-weight="900">2. DURANTE</text>
              <text x="59" y="80" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="11" font-weight="700">Entrega de Valor</text>
              <text x="59" y="104" text-anchor="middle" fill="#BAE6FD" font-family="JetBrains Mono" font-size="10">Cero Fricción</text>
            </g>
            <g transform="translate(312, 82) scale(${{activeBox === 2 ? 1.06 : 1.0}})">
              <rect x="0" y="0" width="118" height="136" rx="16" fill="${{activeBox === 2 ? 'rgba(255,122,0,0.32)' : 'rgba(255,122,0,0.16)'}}" stroke="#FF7A00" stroke-width="2.5"/>
              <text x="59" y="48" text-anchor="middle" fill="#FDBA74" font-family="Montserrat" font-size="14" font-weight="900">3. DESPUÉS</text>
              <text x="59" y="74" text-anchor="middle" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="11" font-weight="700">Fidelización</text>
              <text x="59" y="96" text-anchor="middle" fill="#BAE6FD" font-family="JetBrains Mono" font-size="10">Lealtad Activa</text>
            </g>
            <text x="230" y="295" text-anchor="middle" fill="#6EE7B7" font-family="JetBrains Mono" font-size="11" font-weight="800">LEMON &amp; VERHOEF · JAN CARLZON · DON NORMAN</text>
          `;
        }} else if (BOARD_TYPE === "step3_naming") {{
          boardSvg.innerHTML = `
            <polygon points="230,28 380,104 330,248 130,248 80,104" fill="rgba(56,189,248,0.14)" stroke="#38BDF8" stroke-width="2.5"/>
            <circle cx="230" cy="148" r="${{56 * pulseR}}" fill="rgba(212,175,55,0.25)" stroke="#FDE047" stroke-width="3"/>
            <text x="230" y="144" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat" font-size="16" font-weight="900">SMILE</text>
            <text x="230" y="166" text-anchor="middle" fill="#FDE047" font-family="JetBrains Mono" font-size="12" font-weight="800">98 / 100</text>
            <text x="230" y="20" text-anchor="middle" fill="#7DD3FC" font-family="Montserrat" font-size="11.5" font-weight="800">2-3 Sílabas (David Placek)</text>
            <text x="388" y="94" text-anchor="middle" fill="#6EE7B7" font-family="Montserrat" font-size="11" font-weight="800">Clases Niza</text>
            <text x="72" y="94" text-anchor="middle" fill="#FDE047" font-family="Montserrat" font-size="11" font-weight="800">Monograma 1:1</text>
            <text x="230" y="302" text-anchor="middle" fill="#FDE047" font-family="JetBrains Mono" font-size="11" font-weight="800">ALEXANDRA WATKINS · DAVID PLACEK · AL RIES</text>
          `;
        }} else if (BOARD_TYPE === "step4_kansei") {{
          const sliderPos = 120 + Math.sin(frameIdx * 0.9) * 95;
          boardSvg.innerHTML = `
            <rect x="36" y="38" width="165" height="90" rx="45" fill="rgba(56,189,248,0.18)" stroke="#38BDF8" stroke-width="2.5"/>
            <polygon points="340,36 415,126 265,126" fill="rgba(245,158,11,0.22)" stroke="#F59E0B" stroke-width="2.5"/>
            <text x="118" y="88" text-anchor="middle" fill="#7DD3FC" font-family="Montserrat" font-size="13" font-weight="800">Bouba (Orgánico)</text>
            <text x="340" y="106" text-anchor="middle" fill="#FDE68A" font-family="Montserrat" font-size="13" font-weight="800">Kiki (Geométrico)</text>
            <!-- Barra Deslizadora Animada de Osgood -->
            <line x1="56" y1="188" x2="404" y2="188" stroke="#64748B" stroke-width="6" stroke-linecap="round"/>
            <line x1="56" y1="188" x2="${{150 + sliderPos}}" y2="188" stroke="#38BDF8" stroke-width="6" stroke-linecap="round"/>
            <circle cx="${{150 + sliderPos}}" cy="188" r="14" fill="#FDE047" stroke="#FFFFFF" stroke-width="3"/>
            <!-- Muestra Tipográfica de Bringhurst -->
            <rect x="56" y="224" width="348" height="54" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)"/>
            <text x="230" y="257" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat" font-size="18" font-weight="900">Aa · Voz Visible (Bringhurst)</text>
            <text x="230" y="310" text-anchor="middle" fill="#FDE047" font-family="JetBrains Mono" font-size="10.5" font-weight="800">MITSUO NAGAMACHI · CHARLES OSGOOD · R. BRINGHURST</text>
          `;
        }} else if (BOARD_TYPE === "step5_logo_studio") {{
          boardSvg.innerHTML = `
            <!-- Mitad Superior: Lockup 3D -->
            <rect x="34" y="24" width="392" height="128" rx="16" fill="#F8FAFC" stroke="#38BDF8" stroke-width="2.5"/>
            <g transform="translate(105, 88) scale(${{pulseR}})">
              <circle cx="0" cy="0" r="42" fill="#0284C7"/>
              <path d="M -20 16 L 0 -24 L 20 16 L 0 6 Z" fill="#FFFFFF"/>
              <circle cx="0" cy="-6" r="8" fill="#FF7A00"/>
            </g>
            <text x="175" y="82" fill="#0D2540" font-family="Montserrat" font-size="24" font-weight="900">TU MARCA</text>
            <text x="175" y="106" fill="#FF7A00" font-family="JetBrains Mono" font-size="11" font-weight="800">ITERACIÓN GEMINI #${{(frameIdx % 4) + 1}}</text>
            <!-- Mitad Inferior: App 1:1 Liquid Glass -->
            <rect x="176" y="168" width="108" height="108" rx="26" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="3"/>
            <g transform="translate(230, 222) scale(${{0.85 * pulseR}})">
              <circle cx="0" cy="0" r="38" fill="#0284C7"/>
              <path d="M -18 14 L 0 -22 L 18 14 L 0 5 Z" fill="#FFFFFF"/>
              <circle cx="0" cy="-5" r="7" fill="#FF7A00"/>
            </g>
            <text x="230" y="308" text-anchor="middle" fill="#FDE047" font-family="JetBrains Mono" font-size="11" font-weight="800">PAUL RAND · SAGI HAVIV · JONY IVE · GESTALT</text>
          `;
        }} else {{
          boardSvg.innerHTML = `
            <!-- Lámina Horizontal en Curvas Abiertas C-00 -->
            <rect x="28" y="24" width="404" height="236" rx="16" fill="#FFFFFF" stroke="#0284C7" stroke-width="3"/>
            <path d="M 28 24 L 432 24 L 432 82 C 320 52, 160 104, 28 68 Z" fill="#F0F9FF"/>
            <path d="M 28 68 C 160 104, 320 52, 432 82" fill="none" stroke="#0284C7" stroke-width="2.5"/>
            <text x="52" y="54" fill="#0D2540" font-family="Montserrat" font-size="14" font-weight="900">LÁMINA ${{String((frameIdx * 4) % 30 + 1).padStart(2, '0')}} DE 30 · GUÍA C-00</text>
            <!-- Retícula Constructiva 8X x 3X -->
            <g stroke="#CBD5E1" stroke-width="1">
              <line x1="56" y1="96" x2="256" y2="96"/><line x1="56" y1="136" x2="256" y2="136"/>
              <line x1="56" y1="176" x2="256" y2="176"/><line x1="56" y1="216" x2="256" y2="216"/>
              <line x1="56" y1="96" x2="56" y2="216"/><line x1="122" y1="96" x2="122" y2="216"/>
              <line x1="188" y1="96" x2="188" y2="216"/><line x1="256" y1="96" x2="256" y2="216"/>
            </g>
            <circle cx="156" cy="156" r="${{34 * pulseR}}" fill="#0284C7" opacity="0.9"/>
            <path d="M 142 168 L 156 138 L 170 168 Z" fill="#FFFFFF"/>
            <!-- Paleta Oficial Derecha -->
            <rect x="282" y="98" width="124" height="32" rx="8" fill="#0D2540"/>
            <text x="344" y="118" text-anchor="middle" fill="#FFFFFF" font-family="JetBrains Mono" font-size="10" font-weight="800">PRIMARIO HEX</text>
            <rect x="282" y="138" width="124" height="32" rx="8" fill="#FF7A00"/>
            <text x="344" y="158" text-anchor="middle" fill="#FFFFFF" font-family="JetBrains Mono" font-size="10" font-weight="800">ACENTO HEX</text>
            <rect x="282" y="182" width="124" height="36" rx="10" fill="#10B981"/>
            <text x="344" y="204" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat" font-size="10.5" font-weight="900">PDF 30 LÁMINAS</text>
            <text x="230" y="302" text-anchor="middle" fill="#6EE7B7" font-family="JetBrains Mono" font-size="10.5" font-weight="800">MASSIMO VIGNELLI · MÜLLER-BROCKMANN · GUÍA C-00</text>
          `;
        }}
      }}
    }};
    window.setAnimFrame(0, 8);
  </script>
</body>
</html>"""


def generate_all_capsules():
    VIDEOS_OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    frames_per_clip = 8

    with sync_playwright() as p:
        chrome_bin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        if os.path.exists(chrome_bin):
            browser = p.chromium.launch(headless=True, executable_path=chrome_bin)
        else:
            browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        for capsule in CAPSULES_SPEC:
            step_num = capsule["step"]
            out_mp4 = VIDEOS_OUT_DIR / f"capsula_teoria_paso_{step_num}.mp4"
            print(f"\n=== Generando Video Animado con Personajes Paso {step_num}: {out_mp4.name} ===")

            with tempfile.TemporaryDirectory() as tmpdir:
                tmp_path = Path(tmpdir)
                segment_files = []
                total_scenes = len(capsule["scenes"])
                total_duration = 0.0

                for idx, scene in enumerate(capsule["scenes"]):
                    html_file = tmp_path / f"scene_{idx}.html"
                    aiff_file = tmp_path / f"scene_{idx}.aiff"
                    seg_mp4 = tmp_path / f"seg_{idx}.mp4"

                    html_content = build_animated_stage_html(capsule, scene, idx, total_scenes)
                    html_file.write_text(html_content, encoding="utf-8")

                    page.goto(f"file://{html_file}")
                    page.wait_for_timeout(80)

                    # Capturar los 8 fotogramas animados de los personajes hablando y señalando
                    for f_idx in range(frames_per_clip):
                        page.evaluate(f"window.setAnimFrame({f_idx}, {frames_per_clip})")
                        frame_png = tmp_path / f"scene_{idx}_f_{f_idx:02d}.png"
                        page.screenshot(path=str(frame_png))

                    # Generar locución en español con macOS `say -v Paulina`
                    subprocess.run(
                        ["/usr/bin/say", "-v", "Paulina", "-r", "194", "-o", str(aiff_file), scene["narration"]],
                        check=True
                    )
                    dur = get_audio_duration_seconds(aiff_file) + 0.30
                    total_duration += dur

                    # Codificar el clip animando en bucle fluido los 8 fotogramas de personajes a 24fps sincronizados con la voz
                    subprocess.run(
                        [
                            FFMPEG_BIN, "-y",
                            "-stream_loop", "-1",
                            "-framerate", "4",
                            "-i", str(tmp_path / f"scene_{idx}_f_%02d.png"),
                            "-i", str(aiff_file),
                            "-r", "24",
                            "-c:v", "libopenh264",
                            "-b:v", "1900k",
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

                # Unir los 4 clips animados en el MP4 maestro del tema con +faststart
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
                print(f"✓ {out_mp4.name} generado ({size_kb:.1f} KB, {total_duration:.1f}s, 4 clips animados unidos)")
                manifest.append({
                    "step": step_num,
                    "video_url": f"/assets/videos/{out_mp4.name}",
                    "duration_sec": round(total_duration, 1),
                    "size_kb": round(size_kb, 1),
                    "title": capsule["title"],
                    "author_name": capsule["author_name"],
                    "author_role": capsule["author_role"],
                    "theory_badge": capsule["theory_badge"],
                    "scenes": capsule["scenes"]
                })

        browser.close()

    manifest_path = VIDEOS_OUT_DIR / "capsules_manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✓ Manifiesto de 7 videos animados guardado en {manifest_path}")


if __name__ == "__main__":
    generate_all_capsules()
