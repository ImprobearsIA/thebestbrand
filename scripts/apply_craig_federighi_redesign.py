import re
import sys

file_path = "apps/web/tbb-commercial-experience-and-payments.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Clean I18N ES
content = re.sub(
    r'brandTag:\s*"BRANDBOOK 1\.0 · ARQUITECTURA MONOLÍTICA · ALGORITHMIC VISUAL IDENTITY"',
    'brandTag: "EDICIÓN OFICIAL 1.0 · MANUAL DE MARCA DE 30 LÁMINAS · VECTORES EN CURVAS"',
    content
)
content = re.sub(
    r'heroBadge:\s*"EDICIÓN OFICIAL BRANDBOOK 1\.0 · ARQUITECTURA MONOLÍTICA · AWWWARDS CRAFT"',
    'heroBadge: "SISTEMA OFICIAL DE IDENTIDAD · EDICIÓN 1.0 · PAGO ÚNICO $49 USD"',
    content
)
content = re.sub(
    r'heroTitle1:\s*"De la Idea al Manual Oficial de 30 Láminas en Curvas"',
    'heroTitle1: "Crea la Identidad y el Manual Oficial de tu Empresa"',
    content
)
content = re.sub(
    r'heroDesc:\s*"Desarrollado con la ingeniería visual de Acqua e ImproBears:[^"]*"',
    'heroDesc: "La forma más rápida y profesional de diseñar tu logotipo vectorial, definir tu propósito y descargar un manual de 30 láminas listo para imprenta, registro y medios digitales. Vive los Pasos 1 y 2 gratis directamente en esta página."',
    content
)
content = re.sub(
    r'plateExplorerTag:\s*"EXPLORADOR INTERACTIVO EN CURVAS · BRANDBOOK 1\.0 EN VIVO"',
    'plateExplorerTag: "EXPLORADOR INTERACTIVO · MANUAL OFICIAL DE 30 LÁMINAS"',
    content
)
content = re.sub(
    r'plateExplorerTitle:\s*"Inspecciona el Manual de 30 Láminas que se adapta a tu arquitectura de marca"',
    'plateExplorerTitle: "Un manual estructurado de 30 láminas listo para tu negocio"',
    content
)
content = re.sub(
    r'plateExplorerSub:\s*"Cero plantillas genéricas ni submarcas forzadas:[^"]*"',
    'plateExplorerSub: "Cada lámina especifica con precisión tu logotipo, colores oficiales, tipografías, empaques, papelería y presencia digital sin plantillas genéricas."',
    content
)
content = re.sub(
    r'videoSectionTag:\s*"VIDEO TEATRO Y MASTERCLASS ESTRATÉGICA \(7 CAPÍTULOS ANIMADOS\)"',
    'videoSectionTag: "VIDEO MASTERCLASS · EL MÉTODO DE 7 PASOS"',
    content
)
content = re.sub(
    r'videoSectionTitle:\s*"Los 7 Pasos que transforman la intuición en un Sistema de Marca"',
    'videoSectionTitle: "7 Pasos guiados para construir una marca sólida y memorable"',
    content
)
content = re.sub(
    r'videoSectionSub:\s*"Cada etapa cuenta con su cápsula teórica animada narrada por Aura y respaldada por los autores clásicos del diseño y la estrategia\."',
    'videoSectionSub: "Aura te explica cada fase con claridad y concisión, respaldada por principios probados de estrategia y diseño."',
    content
)
content = re.sub(
    r'deliverablesTag:\s*"ENTREGABLES OFICIALES · INGENIERÍA EDITORIAL Y PRODUCCIÓN"',
    'deliverablesTag: "ENTREGABLES OFICIALES · PRODUCCIÓN FÍSICA Y DIGITAL"',
    content
)
content = re.sub(
    r'deliverablesTitle:\s*"Una suite de 30 láminas lista para imprenta offset, registro y ecosistema digital"',
    'deliverablesTitle: "Todo lo que tu marca necesita, listo para descargar"',
    content
)
content = re.sub(
    r'deliverablesSub:\s*"Exportación inmediata en vectores matemáticos \(\.PDF de 30 láminas en curvas, \.HTML interactivo autónomo y \.SVG puros sin píxeles\)\."',
    'deliverablesSub: "Archivos vectoriales en curvas (.SVG) que nunca pierden resolución, manual interactivo (.HTML) y documento de alta resolución para imprenta (.PDF)."',
    content
)
content = re.sub(
    r'demoSectionTag:\s*"TALLER INTERACTIVO EN VIVO · PASOS 1 Y 2 SIN COSTO"',
    'demoSectionTag: "DEMO INTERACTIVA EN VIVO · PASOS 1 Y 2 SIN COSTO"',
    content
)
content = re.sub(
    r'demoSectionTitle:\s*"Construye hoy mismo los Pasos 1 y 2 de tu marca con Aura"',
    'demoSectionTitle: "Prueba The Best Brand aquí mismo antes de comprar"',
    content
)
content = re.sub(
    r'demoSectionSub:\s*"Escribe tu idea como te salga:[^"]*"',
    'demoSectionSub: "Escribe tu idea con tus propias palabras. Nuestro corrector de redacción y ortografía la pule en un clic sin cambiar tu esencia. Tu avance se guarda para continuar en la app."',
    content
)
content = re.sub(
    r'demoPolishBtn:\s*"Corregir ortografía y expresar con claridad ejecutiva"',
    'demoPolishBtn: "Mejorar redacción y corregir ortografía"',
    content
)
content = re.sub(
    r'demoTpBeforeTitle:\s*"1\. ANTES DE COMPRAR \(Descubrimiento y Primera Impresión\)"',
    'demoTpBeforeTitle: "1. ANTES DE COMPRAR (Descubrimiento y Primera Impresión)"',
    content
)
content = re.sub(
    r'demoTpDuringTitle:\s*"2\. DURANTE LA COMPRA \(Experiencia Central y Entrega\)"',
    'demoTpDuringTitle: "2. DURANTE LA COMPRA (Atención al Cliente y Entrega)"',
    content
)
content = re.sub(
    r'demoTpAfterTitle:\s*"3\. DESPUÉS DE COMPRAR \(Lealtad, Soporte y Recompra\)"',
    'demoTpAfterTitle: "3. DESPUÉS DE COMPRAR (Fidelidad, Garantía y Soporte)"',
    content
)
content = re.sub(
    r'demoTransferBtn:\s*"Continuar al Estudio Completo con mi Marca \(Pasos 0 al 6\) →"',
    'demoTransferBtn: "Continuar al Estudio Completo con mi avance (Pasos 0 al 6) →"',
    content
)
content = re.sub(
    r'demoBuyInlineBtn:\s*"Comprar la App y Desbloquear mis 30 Láminas \(\$49 USD\)"',
    'demoBuyInlineBtn: "Comprar la App y Descargar mis 30 Láminas ($49 USD)"',
    content
)
content = re.sub(
    r'authorityTag:\s*"FILOSOFÍA DE INGENIERÍA · DEL CAOS AL SISTEMA"',
    'authorityTag: "FILOSOFÍA DE TRABAJO · ORDEN Y SISTEMA"',
    content
)
content = re.sub(
    r'pricingTag:\s*"LICENCIA OFICIAL · ACCESO VITALICIO SIN SUSCRIPCIONES"',
    'pricingTag: "LICENCIA OFICIAL · ACCESO DE POR VIDA SIN SUSCRIPCIONES"',
    content
)
content = re.sub(
    r'planSinglePeriod:\s*"Pago único de por vida · Cero cargos mensuales"',
    'planSinglePeriod: "Pago único de por vida · Cero suscripciones mensuales"',
    content
)

# 2. Clean I18N EN
content = re.sub(
    r'brandTag:\s*"BRANDBOOK 1\.0 · MONOLITHIC ARCHITECTURE · ALGORITHMIC VISUAL IDENTITY"',
    'brandTag: "OFFICIAL EDITION 1.0 · 30-PLATE BRAND MANUAL · PURE VECTOR CURVES"',
    content
)
content = re.sub(
    r'heroBadge:\s*"OFFICIAL BRANDBOOK 1\.0 EDITION · MONOLITHIC ARCHITECTURE · AWWWARDS CRAFT"',
    'heroBadge: "OFFICIAL BRAND IDENTITY SYSTEM · EDITION 1.0 · $49 USD ONE-TIME"',
    content
)
content = re.sub(
    r'heroTitle1:\s*"From Raw Idea to an Official 30-Plate Vector Brandbook"',
    'heroTitle1: "Create Your Company\'s Brand Identity and Official Manual"',
    content
)
content = re.sub(
    r'heroDesc:\s*"Engineered by the creators of Acqua and ImproBears:[^"]*"',
    'heroDesc: "The fastest, most professional way to craft your vector logo, define your purpose, and download a 30-plate manual ready for print, trademark registration, and digital UI. Try Steps 1 and 2 live on this page."',
    content
)
content = re.sub(
    r'plateExplorerTag:\s*"INTERACTIVE VECTOR EXPLORER · LIVE BRANDBOOK 1\.0"',
    'plateExplorerTag: "INTERACTIVE EXPLORER · OFFICIAL 30-PLATE MANUAL"',
    content
)
content = re.sub(
    r'plateExplorerTitle:\s*"Inspect the 30-Plate Manual tailored to your brand architecture"',
    'plateExplorerTitle: "A complete, structured manual engineered for your business"',
    content
)
content = re.sub(
    r'plateExplorerSub:\s*"Zero forced sub-brands:[^"]*"',
    'plateExplorerSub: "Each plate precisely specifies your logo, brand colors, typography, packaging, stationery, and digital presence with zero generic templates."',
    content
)
content = re.sub(
    r'videoSectionTag:\s*"VIDEO THEATER & STRATEGIC MASTERCLASS \(7 ANIMATED CHAPTERS\)"',
    'videoSectionTag: "VIDEO MASTERCLASS · THE 7-STEP METHOD"',
    content
)
content = re.sub(
    r'videoSectionTitle:\s*"The 7 Steps that turn intuition into a cohesive Brand System"',
    'videoSectionTitle: "7 Guided Steps to build a cohesive, profitable brand"',
    content
)
content = re.sub(
    r'videoSectionSub:\s*"Each stage includes an animated theory capsule narrated by Aura with foundational insights from global branding masters\."',
    'videoSectionSub: "Aura explains every step with clarity and precision, backed by proven strategic and design principles."',
    content
)
content = re.sub(
    r'deliverablesTag:\s*"OFFICIAL DELIVERABLES · EDITORIAL & PRINT ENGINEERING"',
    'deliverablesTag: "OFFICIAL DELIVERABLES · PRINT & DIGITAL PRODUCTION"',
    content
)
content = re.sub(
    r'deliverablesTitle:\s*"A 30-plate suite engineered for offset print, trademark registration, and digital UI"',
    'deliverablesTitle: "Everything your brand needs ready for download"',
    content
)
content = re.sub(
    r'deliverablesSub:\s*"Instant export in mathematically pure vector curves \(\.PDF of 30 plates in curves, \.HTML and \.SVG\)\."',
    'deliverablesSub: "Pure vector curves (.SVG) that never pixelate, interactive manual (.HTML), and high-resolution print PDF (.PDF)."',
    content
)
content = re.sub(
    r'demoSectionTag:\s*"LIVE INTERACTIVE WORKSHOP · STEPS 1 & 2 FREE"',
    'demoSectionTag: "LIVE INTERACTIVE DEMO · STEPS 1 & 2 FREE"',
    content
)
content = re.sub(
    r'demoSectionTitle:\s*"Build Steps 1 and 2 of your brand right here with Aura"',
    'demoSectionTitle: "Experience The Best Brand right here before purchasing"',
    content
)
content = re.sub(
    r'demoSectionSub:\s*"Write your idea naturally:[^"]*"',
    'demoSectionSub: "Write your idea naturally. Our executive clarity and spelling refiner polishes it with one click without altering your essence. Your progress is saved for the full app."',
    content
)

# 3. Clean FR, PT, DE, IT from "ARCHITECTURE MONOLITHIQUE", "Kansei", "ALGORITHMIC VISUAL IDENTITY"
content = content.replace("ALGORITHMIC VISUAL IDENTITY", "OFFICIAL BRANDBOOK 1.0")
content = content.replace("ARCHITECTURE MONOLITHIQUE", "IDENTITÉ OFFICIELLE")
content = content.replace("ARQUITETURA MONOLÍTICA", "IDENTIDADE OFICIAL")
content = content.replace("MONOLITHISCHE ARCHITEKTUR", "OFFIZIELLE IDENTITÄT")
content = content.replace("ARCHITETTURA MONOLITICA", "IDENTITÀ UFFICIALE")
content = content.replace("ingénierie Kansei et synthèse vectorielle pure", "design guidé par l'IA et courbes vectorielles pures")
content = content.replace("engenharia Kansei e síntese vetorial pura", "design guiado por IA e curvas vetoriais puras")
content = content.replace("Kansei-Engineering und reine Vektorkurven", "KI-geführtes Design und reine Vektorkurven")
content = content.replace("ingegneria Kansei e curve vettoriali pure", "design guidato dall'IA e curve vettoriali pure")

# 4. Clean VIDEO_CAPSULES titles & quotes
content = content.replace(
    'title: "Paso 4: Calibración Visual Kansei y Tipografías"',
    'title: "Paso 4: Colores, Tipografías y Lenguaje Visual"'
)
content = content.replace(
    'title: "Paso 5: Síntesis Vectorial 3D y Logotipo"',
    'title: "Paso 5: Logotipos Vectoriales en Curvas (.SVG)"'
)
content = content.replace(
    'title: "Paso 6: La Bóveda de 30 Láminas en Curvas"',
    'title: "Paso 6: Tu Manual Oficial de 30 Láminas"'
)

# 5. Clean initial state
content = content.replace(
    'businessGiro: "Plataforma interactiva que ayuda a empresarios a definir la identidad estratégica y el manual oficial de 30 láminas en curvas de su empresa."',
    'businessGiro: "Aplicación que ayuda a empresarios a definir la imagen y el manual de marca oficial de su empresa."'
)
content = content.replace(
    'whyPurpose: "Porque creemos que la claridad de marca multiplica el valor de las empresas y libera tiempo mental al líder."',
    'whyPurpose: "Porque creemos que una marca clara y profesional genera confianza inmediata y multiplica el valor del negocio."'
)
content = content.replace(
    'howMethod: "Combinamos el acompañamiento socrático de Aura, ingeniería Kansei y síntesis vectorial en curvas paso a paso."',
    'howMethod: "Guiamos al empresario paso a paso con inteligencia artificial y generamos archivos vectoriales listos para imprenta y medios digitales."'
)
content = content.replace(
    'whatOffer: "Plataforma interactiva y manual oficial de 30 láminas en curvas listo para registro, impresión y despliegue digital."',
    'whatOffer: "Logotipo vectorial en curvas, paleta de colores, tipografías y manual oficial de 30 láminas en PDF y HTML interactivo."'
)
content = content.replace(
    '"Bóveda Digital de 30 Láminas en PDF y HTML"',
    '"Entrega de Manual de 30 Láminas en PDF y HTML"'
)

# 6. Clean Explorer Tabs & Cover Preview
content = content.replace(
    '{ n: 1, lbl: "Lámina 01 · Portada Monolítica" }',
    '{ n: 1, lbl: "Lámina 01 · Portada Oficial" }'
)
content = content.replace(
    '{ n: 14, lbl: "Lámina 14 · Marca Única (Sin Submarcas)" }',
    '{ n: 14, lbl: "Lámina 14 · Versiones del Logotipo" }'
)
content = content.replace(
    '{ n: 6, lbl: "Lámina 06 · La Empresa como Persona" }',
    '{ n: 6, lbl: "Lámina 06 · Personalidad de Marca" }'
)
content = content.replace(
    '{ n: 8, lbl: "Lámina 08 · Touchpoints" }',
    '{ n: 8, lbl: "Lámina 08 · Puntos de Contacto" }'
)
content = content.replace(
    '{ n: 20, lbl: "Lámina 20 · Especificación CMYK & Pantone" }',
    '{ n: 20, lbl: "Lámina 20 · Colores y Papelería" }'
)
content = content.replace(
    "MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA · ARQUITECTURA MONOLÍTICA",
    "MANUAL OFICIAL DE IDENTIDAD DE MARCA · VERSIÓN OFICIAL 1.0"
)
content = content.replace(
    "Sistema rector con Arquitectura Monolítica de Marca Única, Círculo Dorado, La Empresa como Persona e Ingeniería de Touchpoints.",
    "Manual integral de marca con definición de propósito, puntos de contacto clave, aplicaciones gráficas y normas de uso oficial."
)
content = content.replace(
    "ARQUITECTURA MONOLÍTICA · TRAZOS GEOMÉTRICOS",
    "IDENTIDAD DE MARCA ÚNICA · TRAZOS GEOMÉTRICOS"
)
content = content.replace(
    "05 · PASO 4 — SISTEMA DE IDENTIDAD MONOLÍTICA",
    "05 · PASO 4 — SISTEMA DE IDENTIDAD DE MARCA ÚNICA"
)
content = content.replace(
    "Concentración del 100% de Prestigio en Marca Única (Cero Submarcas)",
    "Concentración del 100% de Prestigio en Marca Única"
)

# 7. Clean Ticker Marquee text
content = content.replace(
    "THE BEST BRAND · YOUR BRAND, NOW!!! · 30 LÁMINAS EN CURVAS · ARQUITECTURA MONOLÍTICA SIN SUBMARCAS FORZADAS · CÍRCULO DORADO 100% CIRCULAR · LA EMPRESA COMO PERSONA · CHECKOUT APPLE PAY & GOOGLE PAY · DEL CAOS AL SISTEMA ·",
    "THE BEST BRAND · YOUR BRAND, NOW!!! · MANUAL OFICIAL DE 30 LÁMINAS · LOGOTIPOS VECTORIALES EN SVG · LISTO PARA IMPRENTA Y REGISTRO · ASISTENTE POR VOZ AURA · CHECKOUT CON APPLE PAY, GOOGLE PAY Y TARJETA · PAGO ÚNICO $49 USD DE POR VIDA ·"
)

# 8. Transform Hero from Dark Cave to Light Luxury Canvas (70/20/10 Rule)
old_hero_section = '<section id="tbbCommHeroSection" style="position:relative; padding:54px 24px 48px 24px; background:radial-gradient(circle at 65% 25%, #0D2540 0%, #090D16 58%, #050811 100%); color:#FFFFFF; overflow:hidden;">'
new_hero_section = '<section id="tbbCommHeroSection" style="position:relative; padding:64px 24px 56px 24px; background:linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%); color:#090D16; overflow:hidden; border-bottom:1px solid #E2E8F0;">'
content = content.replace(old_hero_section, new_hero_section)

# Update concentric rings opacity and stroke for light background
content = content.replace(
    '<circle cx="300" cy="300" r="270" stroke="#3B82F6" stroke-width="2" stroke-dasharray="16 10" />',
    '<circle cx="300" cy="300" r="270" stroke="#1D4ED8" stroke-width="1.5" stroke-dasharray="12 8" opacity="0.35" />'
)
content = content.replace(
    '<path d="M 80 300 A 220 220 0 1 1 520 300" stroke="#60A5FA" stroke-width="3" stroke-linecap="round" />',
    '<path d="M 80 300 A 220 220 0 1 1 520 300" stroke="#93C5FD" stroke-width="2" stroke-linecap="round" opacity="0.4" />'
)
content = content.replace(
    '<path d="M 140 300 A 160 160 0 1 1 460 300" stroke="#F97316" stroke-width="4" stroke-linecap="round" />',
    '<path d="M 140 300 A 160 160 0 1 1 460 300" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" opacity="0.5" />'
)
content = content.replace('opacity:0.16;', 'opacity:0.10;')

# Update Hero Badge styling for light background
content = content.replace(
    'background:rgba(9,13,22,0.88); border:1.5px solid #1D4ED8; border-left:4px solid #F97316; border-radius:999px; padding:6px 14px; font-family:\'JetBrains Mono\', monospace; font-size:0.66rem; font-weight:800; color:#93C5FD; box-shadow:0 0 24px rgba(29,78,216,0.35);',
    'background:#FFFFFF; border:1px solid #CBD5E1; border-left:3.5px solid #F97316; border-radius:999px; padding:6px 14px; font-family:\'JetBrains Mono\', monospace; font-size:0.66rem; font-weight:800; color:#334155; box-shadow:0 2px 10px rgba(15,23,42,0.04);'
)

# Update Hero Title and Text Accent for light background (solid black with subtle amber underline)
content = content.replace(
    '<h1 style="font-family:\'Montserrat\', \'Plus Jakarta Sans\', sans-serif; font-size:clamp(2.05rem, 4vw, 3.15rem); font-weight:900; line-height:1.08; letter-spacing:-0.03em; margin:0;">',
    '<h1 style="font-family:\'Montserrat\', \'Plus Jakarta Sans\', sans-serif; font-size:clamp(2.15rem, 4.2vw, 3.35rem); font-weight:900; line-height:1.08; letter-spacing:-0.03em; color:#090D16; margin:0;">'
)
content = content.replace(
    '<span style="color:#F97316; text-shadow:0 0 36px rgba(249,115,22,0.42);">${t("heroTitleAccent")}</span>',
    '<span style="color:#090D16; border-bottom:3px solid #F97316; padding-bottom:3px;">${t("heroTitleAccent")}</span>'
)
content = content.replace(
    '<p style="font-size:1.01rem; font-weight:500; color:#CBD5E1; line-height:1.62; margin:0; max-width:580px;">',
    '<p style="font-size:1.04rem; font-weight:500; color:#475569; line-height:1.62; margin:0; max-width:580px;">'
)

# Update Aura Quote Card in Hero
content = content.replace(
    'background:rgba(9,13,22,0.90); border:1.5px solid #1D4ED8; border-left:5px solid #F97316; border-radius:16px; padding:13px 16px; display:flex; align-items:center; gap:14px; box-shadow:0 14px 32px rgba(0,0,0,0.45);',
    'background:#FFFFFF; border:1px solid #CBD5E1; border-left:4px solid #F97316; border-radius:16px; padding:13px 16px; display:flex; align-items:center; gap:14px; box-shadow:0 10px 28px rgba(15,23,42,0.06);'
)
content = content.replace(
    'font-size:0.82rem; font-weight:600; color:#E2E8F0; line-height:1.42; margin-top:2px;',
    'font-size:0.82rem; font-weight:600; color:#334155; line-height:1.42; margin-top:2px;'
)

# Update payment chips in Hero
content = content.replace('color:#94A3B8;">Checkout instantáneo:', 'color:#64748B;">Checkout instantáneo:')
content = content.replace(
    'background:rgba(255,255,255,0.08); color:#FFFFFF; border:1px solid rgba(255,255,255,0.2); border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;',
    'background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;'
)

# Update Marquee Ticker background to crisp light
content = content.replace(
    '<div style="background:#090D16; border-top:2px solid #1D4ED8; border-bottom:3px solid #F97316; padding:10px 0; overflow:hidden; white-space:nowrap;">',
    '<div style="background:#F8FAFC; border-top:1px solid #E2E8F0; border-bottom:1px solid #E2E8F0; padding:11px 0; overflow:hidden; white-space:nowrap;">'
)
content = content.replace(
    'color:#FFFFFF; letter-spacing:0.12em;',
    'color:#090D16; letter-spacing:0.12em;'
)

# 9. Update Navbar to light-mode glassmorphism
content = content.replace(
    'background: rgba(9, 13, 22, 0.92);\n        backdrop-filter: blur(24px) saturate(180%);\n        -webkit-backdrop-filter: blur(24px) saturate(180%);\n        border-bottom: 1.5px solid rgba(255, 255, 255, 0.14);\n        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);',
    'background: rgba(255, 255, 255, 0.92);\n        backdrop-filter: blur(24px) saturate(180%);\n        -webkit-backdrop-filter: blur(24px) saturate(180%);\n        border-bottom: 1px solid #E2E8F0;\n        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);'
)

# Write back
with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("[SUCCESS] Applied Craig Federighi redesign to", file_path)
