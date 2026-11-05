#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera /apps/web/improbears-preset-engine.js con las 30 láminas oficiales de la Arquitectura
Maestra de IMPROBEARS (Master + Consulting + Ingredients + Studio + AI) y el preset completo
de los Pasos 0 al 6 para TheBestBrand.
"""

import json
from pathlib import Path
from improbears_brandbook_plates_1_to_15 import get_improbears_assets, build_plates_01_to_15
from improbears_brandbook_plates_16_to_30 import build_plates_16_to_30

BASE_DIR = Path("/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand")
OUT_JS = BASE_DIR / "apps" / "web" / "improbears-preset-engine.js"

web_assets = get_improbears_assets(embed_base64=False)
plates_1_15 = build_plates_01_to_15(web_assets)
plates_16_30 = build_plates_16_to_30(web_assets)
all_30_plates = plates_1_15 + plates_16_30

assert len(all_30_plates) == 30, f"Expected 30 plates, got {len(all_30_plates)}"

IMPROBEARS_META = [
    {"num": "01", "sec": "PORTADA MAESTRA", "title": "Portada Maestra en Curvas: IMPROBEARS — Business Improvement"},
    {"num": "02", "sec": "01 · ARQUITECTURA METODOLÓGICA", "title": "Índice Metodológico TheBestBrand (Pasos 0 al 6 · 30 Láminas)"},
    {"num": "03", "sec": "01 · PASO 0 — GIRO Y PROBLEMA", "title": "Manifiesto Fundacional, Giro de Negocio y Buyer Persona"},
    {"num": "04", "sec": "02 · PASO 1 — ADN DE MARCA", "title": "El Círculo Dorado (WHY · HOW · WHAT)"},
    {"num": "05", "sec": "02 · PASO 1 — ADN DE MARCA", "title": "Promesa, Misión, Visión y las 6 Máximas de Filosofía"},
    {"num": "06", "sec": "02 · PASO 1 — ADN DE MARCA", "title": "Principios que nos Guían y Nuestra Relación con Clientes"},
    {"num": "07", "sec": "02 · PASO 1 — LA EMPRESA COMO PERSONA", "title": "Brand Persona: Jorge Benítez (“El Oso” · Arquitecto de Claridad)"},
    {"num": "08", "sec": "02 · PASO 1 — LA EMPRESA COMO PERSONA", "title": "Voz, Conducta y Calibración Kansei de la Persona ImproBears"},
    {"num": "09", "sec": "03 · PASO 2 — TOUCHPOINTS", "title": "Ingeniería de Touchpoints: Mapa de Contacto Real con el Cliente"},
    {"num": "10", "sec": "03 · PASO 2 — TOUCHPOINTS", "title": "Touchpoints Momento 1: Antes de Comprar (Redes, Web, WhatsApp IA, Solicitud)"},
    {"num": "11", "sec": "03 · PASO 2 — TOUCHPOINTS", "title": "Touchpoints Momento 2: Durante la Compra (Compra Fácil, In Situ, Video, Envío)"},
    {"num": "12", "sec": "03 · PASO 2 — TOUCHPOINTS", "title": "Touchpoints Momento 3: Después de Comprar (Portal Zoho Books, Documentos, Encuesta)"},
    {"num": "13", "sec": "04 · PASO 3 — EL NOMBRE OFICIAL", "title": "Naming Estratégico (IMPRO + BEARS), Semiótica y Clases de Niza"},
    {"num": "14", "sec": "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS", "title": "Arquitectura Maestra de Marca: Marca Madre + 4 Submarcas"},
    {"num": "15", "sec": "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS", "title": "Anatomía Semiótica del Símbolo Maestro en Positivo"},
    {"num": "16", "sec": "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS", "title": "Submarca Oficial 01: ImproBears Consulting"},
    {"num": "17", "sec": "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS", "title": "Submarca Oficial 02: ImproBears Ingredients"},
    {"num": "18", "sec": "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS", "title": "Submarca Oficial 03: ImproBears Studio"},
    {"num": "19", "sec": "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS", "title": "Submarca Oficial 04: ImproBears AI (Esquema Homologado)"},
    {"num": "20", "sec": "05 · PASO 4 — CONSTRUCCIÓN TÉCNICA", "title": "Retícula Constructiva (8X × 8X) y Sistema de Curvas del Banner"},
    {"num": "21", "sec": "05 · PASO 4 — CONSTRUCCIÓN TÉCNICA", "title": "Área de Aislamiento (1.5X) y Sección de Aplicación en Negativo"},
    {"num": "22", "sec": "05 · PASO 4 — CONSTRUCCIÓN TÉCNICA", "title": "Usos Incorrectos y Restricciones de Integridad Visual"},
    {"num": "23", "sec": "06 · PASO 5 — COLOR Y TIPOGRAFÍA", "title": "Paleta Cromática Oficial (8 Colores · Pantone · CMYK · HEX)"},
    {"num": "24", "sec": "06 · PASO 5 — COLOR Y TIPOGRAFÍA", "title": "Proporción de Luz (70/20/10) y los 6 Recursos Visuales en Curvas"},
    {"num": "25", "sec": "06 · PASO 5 — COLOR Y TIPOGRAFÍA", "title": "Sistema Tipográfico Oficial: Montserrat & Avenir Next"},
    {"num": "26", "sec": "06 · PASO 5 — COLOR Y TIPOGRAFÍA", "title": "Sistema de los 6 Sellos Metodológicos (Framework Intelectual)"},
    {"num": "27", "sec": "07 · PASO 6 — APLICACIONES Y GOBERNANZA", "title": "Gobernanza de Identidad Documental y Co-Branding (Regla Max C-00)"},
    {"num": "28", "sec": "07 · PASO 6 — APLICACIONES Y GOBERNANZA", "title": "Papelería, Propuestas, Tarjetas Ejecutivas y Firma de Correo"},
    {"num": "29", "sec": "07 · PASO 6 — APLICACIONES Y GOBERNANZA", "title": "Ecosistema Digital en Lienzo Claro y Checklist de 10 Controles"},
    {"num": "30", "sec": "07 · PASO 6 — COLOFÓN INSTITUCIONAL", "title": "Colofón Institucional sobre Fondo Claro y Familia de 5 Marcas"},
]

js_content = f"""// ============================================================================
// IMPROBEARS MASTER ARCHITECTURE & 4 SUB-BRANDS ENGINE FOR THEBESTBRAND
// Mantiene intactos los 5 logotipos oficiales, los 8 colores oficiales
// (#426EAE, #0D2540, #FF7A00, #4C9DE6, #333333, #707070, #E6E6E6, #FFFFFF)
// y las tipografías oficiales (Montserrat + Avenir Next).
// ============================================================================
(function () {{
  window.IMPROBEARS_30_PLATES_META = {json.dumps(IMPROBEARS_META, ensure_ascii=False)};
  window.IMPROBEARS_30_PLATES_HTML = {json.dumps(all_30_plates, ensure_ascii=False)};

  window.isImproBearsActiveBrand = function () {{
    const cs = (typeof canvasState === "object" && canvasState) ? canvasState : {{}};
    const bName = String(cs.brandName || "").trim();
    return /improbears/i.test(bName);
  }};

  const styleEl = document.createElement("style");
  styleEl.textContent = `
    .tbb-improbears-stage-wrapper {{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F4F7FA;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }}
    .tbb-improbears-stage-scaler {{
      width: 1122px;
      height: 794px;
      transform-origin: center center;
      flex-shrink: 0;
      box-shadow: 0 14px 36px rgba(13,37,64,0.12);
      border-radius: 8px;
      overflow: hidden;
      background: #FFFFFF;
    }}
    .tbb-improbears-stage-scaler .benefic-plate {{
      width: 1122px !important;
      height: 794px !important;
      margin: 0 !important;
      background: #FFFFFF;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: none !important;
      font-family: 'Avenir Next', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #333333;
    }}
    .tbb-improbears-stage-scaler .plate-hdr {{
      position: relative;
      z-index: 2;
      padding: 18px 42px 10px 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E6E6E6;
    }}
    .tbb-improbears-stage-scaler .plate-body {{
      position: relative;
      z-index: 2;
      flex: 1;
      padding: 18px 42px;
      overflow: hidden;
    }}
    .tbb-improbears-stage-scaler .plate-ftr {{
      position: relative;
      z-index: 2;
      height: 42px;
      background: #FFFFFF;
      padding: 0 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #0D2540;
    }}
    .tbb-improbears-stage-scaler .ib-flow-node {{
      padding: 4px 8px 4px 0;
    }}
    .tbb-improbears-stage-scaler .ib-node-hdr {{
      display: flex;
      align-items: center;
      gap: 7px;
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: #426EAE;
      text-transform: uppercase;
      margin-bottom: 4px;
    }}
    .tbb-improbears-stage-scaler .ib-dot-orange {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #FF7A00;
      display: inline-block;
      flex-shrink: 0;
    }}
    .tbb-improbears-stage-scaler .ib-dot-blue {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #426EAE;
      display: inline-block;
      flex-shrink: 0;
    }}
    .tbb-improbears-stage-scaler .ib-flow-title {{
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 800;
      color: #0D2540;
      margin-bottom: 4px;
    }}
    .tbb-improbears-stage-scaler .ib-flow-txt {{
      font-family: 'Avenir Next', 'Plus Jakarta Sans', sans-serif;
      font-size: 11.2px;
      line-height: 1.46;
      color: #333333;
    }}
  `;
  document.head.appendChild(styleEl);

  window.scaleImproBearsPlateInStage = function () {{
    const wrap = document.querySelector(".tbb-improbears-stage-wrapper");
    const scaler = document.querySelector(".tbb-improbears-stage-scaler");
    if (!wrap || !scaler) return;
    const rect = wrap.getBoundingClientRect();
    if (rect.width <= 10 || rect.height <= 10) return;
    const scaleX = (rect.width - 10) / 1122;
    const scaleY = (rect.height - 10) / 794;
    const s = Math.max(0.22, Math.min(scaleX, scaleY, 1.0));
    scaler.style.transform = `scale(${{s.toFixed(4)}})`;
  }};

  window.addEventListener("resize", () => {{
    if (window.isImproBearsActiveBrand()) window.scaleImproBearsPlateInStage();
  }});

  window.renderImproBearsSinglePlateHTML = function (plateIdx, forPrint) {{
    const idx = Math.max(0, Math.min(29, Number(plateIdx || 0)));
    const rawPlate = window.IMPROBEARS_30_PLATES_HTML[idx] || window.IMPROBEARS_30_PLATES_HTML[0];
    if (forPrint) {{
      return rawPlate;
    }}
    setTimeout(() => window.scaleImproBearsPlateInStage(), 30);
    return `<div class="tbb-improbears-stage-wrapper"><div class="tbb-improbears-stage-scaler">${{rawPlate}}</div></div>`;
  }};

  window.loadImproBearsMasterArchitecturePreset = function (jumpToStep6 = true) {{
    const improCanvas = {{
      brandName: "IMPROBEARS",
      userLockedBrandName: true,
      tagline: "BUSINESS IMPROVEMENT · ARQUITECTURA DE MARCA Y 4 DIVISIONES",
      custom_business_type: "Firma de mejora de negocios, consultoría estratégica, ingredientes alimentarios B2B, estudio de marca/producción e inteligencia artificial multi-agente (Consulting · Ingredients · Studio · AI)",
      step0_short_essence: "Mejora integral de negocios: Consulting, Ingredients, Studio y AI",
      step0_paraphrased_essence: "Ecosistema empresarial híbrido que impulsa la evolución y rentabilidad de organizaciones mediante 4 divisiones: ImproBears Consulting, ImproBears Ingredients, ImproBears Studio e ImproBears AI.",
      step0_buyer_actor: "Fundadores, Directores Generales, Directores de I+D e Industria Alimentaria, y Empresas en Expansión B2B",
      golden_circle: "WHY (Propósito): Desatar el máximo potencial de las empresas combinando sabiduría estratégica, ciencia aplicada, creatividad de alto impacto e inteligencia artificial. HOW (Cómo): Mediante acompañamiento hombro con hombro (El Oso Mentor), metodologías probadas de mejora continua y tecnología multi-agente. WHAT (Qué): Ecosistema de 4 divisiones especializadas: ImproBears Consulting, ImproBears Ingredients, ImproBears Studio e ImproBears AI.",
      value_offer: "Un socio integral de evolución empresarial ('Business Improvement') que une consultoría de dirección y ventas, abasto e innovación en ingredientes alimentarios, diseño/producción de marcas y sistemas autónomos de IA y CRM en una sola arquitectura coherente.",
      social_role: "Transformar la complejidad técnica, operativa y tecnológica en ventajas competitivas claras, éticas y rentables para las empresas de Latinoamérica.",
      process_steps_text: "1. Diagnóstico Profundo 360° (Auditoría de negocio, formulación, marca o sistemas) · 2. Ingeniería y Creación de Soluciones (Estrategia, I+D, Branding o Agentes IA) · 3. Implementación Hombro con Hombro y Medición de ROI.",
      core_message: "IMPROBEARS — Business Improvement: Tu socio estratégico para construir, formular, diseñar y automatizar el futuro de tu empresa.",
      brand_persona: "La Empresa como Persona — Jorge Benítez ('El Oso'): Ingeniero, arquitecto de sistemas, estratega práctico, biotecnólogo, creador audiovisual y constructor incansable. Combina la fuerza serena y protectora del Oso con la calidez humana del aliado que escucha antes de proponer, entiende la idea del cliente sin imponer ego, y camina hombro con hombro hasta que las cosas funcionen con orden, estética y rentabilidad.",
      ideal_customer: "Empresarios, industrias de alimentos y bebidas, directores comerciales y organizaciones B2B/B2C que buscan escalar con orden, identidad de clase mundial y tecnología de vanguardia.",
      tp_before: "Contacto en redes sociales (LinkedIn, Instagram, YouTube y Reels por marca), Página web institucional y portales por submarca (improbears.com), Contacto por WhatsApp con el agente automatizado 24/7, Solicitud de capacitaciones, proyectos, sesiones de video o muestras de productos",
      tp_during: "Compra fácil y envío de documentos comerciales/legales (propuestas y firma digital Zoho Sign), Capacitación in situ y consultoría presencial en oficinas o planta del cliente (Consulting, Ingredients, AI), Sesión de video y producción audiovisual en locación (Studio), Envío de productos e insumos con rastreo de guía (Ingredients)",
      tp_after: "Portal de clientes de Zoho Books (descarga de facturas CFDI, estados de cuenta y pagos en línea), Envío de documentos finales, manuales, certificados COA/SDS y masters de video, Encuesta de servicio y evaluación de satisfacción del cliente, Seguimiento por WhatsApp automatizado, soporte y recompra fácil",
      primary_font: "Montserrat",
      secondary_font: "Avenir Next",
      selected_colors_hex: ["#0D2540", "#426EAE", "#FF7A00", "#4C9DE6", "#333333", "#707070", "#E6E6E6", "#FFFFFF"],
      selected_family_index: 1,
      step4_seed_idea: "Oso protector azul (#426EAE) en fusión con silueta humana en espacio negativo, flecha ascendente naranja (#FF7A00) y anillo azul oscuro (#0D2540) con íconos por división (Barras Consulting, Molécula Ingredients, Cámara Studio, Red Neuronal AI)."
    }};

    if (typeof canvasState === "object" && canvasState) {{
      Object.assign(canvasState, improCanvas);
    }}
    if (typeof tpExtractedItems === "object" && tpExtractedItems) {{
      tpExtractedItems.before = improCanvas.tp_before.split(", ").map(s => s.trim());
      tpExtractedItems.during = improCanvas.tp_during.split(", ").map(s => s.trim());
      tpExtractedItems.after = improCanvas.tp_after.split(", ").map(s => s.trim());
    }}
    if (typeof bipolarSliderValues === "object" && bipolarSliderValues) {{
      Object.assign(bipolarSliderValues, {{
        organico_geometrico: 0.45,
        tradicional_innovador: 0.78,
        minimalista_complejo: -0.35,
        serio_divertido: -0.55,
        accesible_exclusivo: 0.65,
        sutil_energetico: 0.72,
        manual_tecnologico: 0.80
      }});
    }}

    if (window.tbbState) {{
      window.tbbState.selectedFontFamily = "Montserrat";
      window.tbbState.logoPriHex = "#426EAE";
      window.tbbState.logoSecHex = "#FF7A00";
      window.tbbState.logoDarkBg = false;
      window.tbbState.logoIterations = [
        {{
          idx: 1,
          paradigm: "detailed_emblem",
          archetype: "gemini_custom_3d",
          conceptLabel: "Marca Maestra: IMPROBEARS — Business Improvement",
          brandTitleOverride: "IMPROBEARS",
          subtitleOverride: "BUSINESS IMPROVEMENT",
          pri: "#426EAE",
          sec: "#FF7A00",
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "stacked",
          mods: {{ fontFamily: "Montserrat", layout: "stacked" }},
          geminiCustomSvg: `<g><image href="/assets/improbears/logo-improbears-master.png" x="10" y="10" width="160" height="160" preserveAspectRatio="xMidYMid meet"/></g>`,
          note: "Logotipo Oficial Marca Maestra: IMPROBEARS — Business Improvement",
          prompt: "Logotipo oficial IMPROBEARS Business Improvement con oso azul #426EAE, silueta humana en espacio negativo, flecha naranja #FF7A00 y doble aro #0D2540.",
          geminiPrompt40w: "Logotipo oficial IMPROBEARS Business Improvement con oso azul #426EAE, silueta humana en espacio negativo, flecha naranja #FF7A00 y doble aro #0D2540."
        }},
        {{
          idx: 2,
          paradigm: "detailed_emblem",
          archetype: "gemini_custom_3d",
          conceptLabel: "Submarca 01: ImproBears Consulting",
          brandTitleOverride: "IMPROBEARS",
          subtitleOverride: "CONSULTING",
          pri: "#426EAE",
          sec: "#FF7A00",
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "stacked",
          mods: {{ fontFamily: "Montserrat", layout: "stacked" }},
          geminiCustomSvg: `<g><image href="/assets/improbears/logo-improbears-consulting.png" x="10" y="10" width="160" height="160" preserveAspectRatio="xMidYMid meet"/></g>`,
          note: "Submarca Oficial 01: ImproBears Consulting (Barras de Crecimiento)",
          prompt: "Logotipo oficial ImproBears Consulting con aro abierto #0D2540, 4 barras de crecimiento estratégico y subtítulo CONSULTING en #FF7A00.",
          geminiPrompt40w: "Logotipo oficial ImproBears Consulting con aro abierto #0D2540, 4 barras de crecimiento estratégico y subtítulo CONSULTING en #FF7A00."
        }},
        {{
          idx: 3,
          paradigm: "detailed_emblem",
          archetype: "gemini_custom_3d",
          conceptLabel: "Submarca 02: ImproBears Ingredients",
          brandTitleOverride: "IMPROBEARS",
          subtitleOverride: "INGREDIENTS",
          pri: "#426EAE",
          sec: "#FF7A00",
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "stacked",
          mods: {{ fontFamily: "Montserrat", layout: "stacked" }},
          geminiCustomSvg: `<g><image href="/assets/improbears/logo-improbears-ingredients.png" x="10" y="10" width="160" height="160" preserveAspectRatio="xMidYMid meet"/></g>`,
          note: "Submarca Oficial 02: ImproBears Ingredients (Estructura Molecular)",
          prompt: "Logotipo oficial ImproBears Ingredients con red molecular en #0D2540 y #FF7A00 y subtítulo INGREDIENTS en #FF7A00.",
          geminiPrompt40w: "Logotipo oficial ImproBears Ingredients con red molecular en #0D2540 y #FF7A00 y subtítulo INGREDIENTS en #FF7A00."
        }},
        {{
          idx: 4,
          paradigm: "detailed_emblem",
          archetype: "gemini_custom_3d",
          conceptLabel: "Submarca 03: ImproBears Studio",
          brandTitleOverride: "IMPROBEARS",
          subtitleOverride: "STUDIO",
          pri: "#426EAE",
          sec: "#FF7A00",
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "stacked",
          mods: {{ fontFamily: "Montserrat", layout: "stacked" }},
          geminiCustomSvg: `<g><image href="/assets/improbears/logo-improbears-studio.png" x="10" y="10" width="160" height="160" preserveAspectRatio="xMidYMid meet"/></g>`,
          note: "Submarca Oficial 03: ImproBears Studio (Cámara de Cine y Producción)",
          prompt: "Logotipo oficial ImproBears Studio con cámara de cine en #0D2540, lente #FF7A00 y subtítulo STUDIO en #FF7A00.",
          geminiPrompt40w: "Logotipo oficial ImproBears Studio con cámara de cine en #0D2540, lente #FF7A00 y subtítulo STUDIO en #FF7A00."
        }},
        {{
          idx: 5,
          paradigm: "detailed_emblem",
          archetype: "gemini_custom_3d",
          conceptLabel: "Submarca 04: ImproBears AI",
          brandTitleOverride: "IMPROBEARS",
          subtitleOverride: "AI",
          pri: "#426EAE",
          sec: "#FF7A00",
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "stacked",
          mods: {{ fontFamily: "Montserrat", layout: "stacked" }},
          geminiCustomSvg: `<g><image href="/assets/improbears/logo-improbears-ai.png" x="10" y="10" width="160" height="160" preserveAspectRatio="xMidYMid meet"/></g>`,
          note: "Submarca Oficial 04: ImproBears AI (Grafo Neuronal Multi-Agente)",
          prompt: "Logotipo oficial ImproBears AI con red neuronal de nodos en #0D2540, #426EAE y núcleo #FF7A00, y subtítulo AI en #0D2540.",
          geminiPrompt40w: "Logotipo oficial ImproBears AI con red neuronal de nodos en #0D2540, #426EAE y núcleo #FF7A00, y subtítulo AI en #0D2540."
        }}
      ];
      window.tbbState.logoIterationIndex = 1;
      window.tbbState.plateIdx = 0;
    }}

    if (typeof saveBrandSessionToLocalStorage === "function") {{
      saveBrandSessionToLocalStorage();
    }}
    if (typeof syncCurrentBrandToCloudAccount === "function") {{
      syncCurrentBrandToCloudAccount(true);
    }}
    if (jumpToStep6 && typeof window.tbbJumpToStep === "function") {{
      window.tbbJumpToStep(6, 1);
    }} else if (typeof window.renderTbbZeroScrollStage === "function") {{
      window.renderTbbZeroScrollStage();
    }}
  }};

  setTimeout(() => {{
    try {{
      const params = new URLSearchParams(window.location.search);
      if (/improbears/i.test(params.get("brand") || "")) {{
        window.loadImproBearsMasterArchitecturePreset(true);
      }}
    }} catch (e) {{}}
  }}, 250);
}})();
"""

OUT_JS.write_text(js_content, encoding="utf-8")
print(f"Generated {OUT_JS} ({OUT_JS.stat().st_size / 1024:.1f} KB)")
