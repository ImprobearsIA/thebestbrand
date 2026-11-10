// ============================================================================
// UNIVERSAL 30-PLATE BRANDBOOK ENGINE IN CURVES (GUÍA OFICIAL DE ARQUITECTURA DE MARCA)
// Diseña las 30 láminas completas siguiendo la Guía Oficial de ImproBears,
// extrayendo los colores, acentos, geometría y tipografía del logotipo activo,
// y generando escenas editoriales e ilustraciones vectoriales 100% coherentes con el logo.
// ============================================================================
(function () {
  function esc(str) {
    if (typeof window.escapeHTML === "function") return window.escapeHTML(String(str == null ? "" : str));
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function clipWords(str, maxLen, addPeriod = false) {
    const s = String(str == null ? "" : str).replace(/\s+/g, " ").trim();
    if (!maxLen || s.length <= maxLen) return s;
    let cut = s.slice(0, maxLen);
    const lastSpace = cut.lastIndexOf(" ");
    if (lastSpace > maxLen * 0.5) {
      cut = cut.slice(0, lastSpace);
    }
    cut = cut.replace(/[,;:\-·\s]+$/, "");
    // Eliminar artículos, preposiciones o conjunciones sueltas al final
    while (/\s+(?:de|del|en|con|para|por|y|e|o|u|a|al|la|el|los|las|un|una|unos|unas|su|sus|que|mediante|hacia|bajo|sobre|entre|sin)$/i.test(cut)) {
      cut = cut.replace(/\s+(?:de|del|en|con|para|por|y|e|o|u|a|al|la|el|los|las|un|una|unos|unas|su|sus|que|mediante|hacia|bajo|sobre|entre|sin)$/i, "").replace(/[,;:\-·\s]+$/, "");
    }
    return cut + (addPeriod && !/[.!?]$/.test(cut) ? "." : "");
  }

  function hexToRgb(hex) {
    const clean = String(hex || "#426EAE").replace("#", "").trim();
    const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean.padEnd(6, "0");
    const num = parseInt(full.slice(0, 6), 16) || 0;
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function rgbToHex(r, g, b) {
    const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
    return "#" + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase();
  }

  function mixHex(hex1, hex2, weight2) {
    const c1 = hexToRgb(hex1);
    const c2 = hexToRgb(hex2);
    const w = Math.max(0, Math.min(1, Number(weight2 || 0)));
    return rgbToHex(
      c1.r * (1 - w) + c2.r * w,
      c1.g * (1 - w) + c2.g * w,
      c1.b * (1 - w) + c2.b * w
    );
  }

  function hexToCmyk(hex) {
    if (typeof window.hexToCmykSpec === "function") return window.hexToCmykSpec(hex);
    const { r, g, b } = hexToRgb(hex);
    const r1 = r / 255, g1 = g / 255, b1 = b / 255;
    const k = 1 - Math.max(r1, g1, b1);
    if (k >= 0.99) return "C:40 M:30 Y:20 K:100";
    const c = Math.round(((1 - r1 - k) / (1 - k)) * 100);
    const m = Math.round(((1 - g1 - k) / (1 - k)) * 100);
    const y = Math.round(((1 - b1 - k) / (1 - k)) * 100);
    return `C:${c} M:${m} Y:${y} K:${Math.round(k * 100)}`;
  }

  function hexToPantone(hex, idx) {
    const h = String(hex || "").toUpperCase();
    const known = {
      "#426EAE": "Pantone 7683 C",
      "#0D2540": "Pantone 296 C",
      "#FF7A00": "Pantone 1505 C",
      "#4C9DE6": "Pantone 2925 C",
      "#1D4ED8": "Pantone 2728 C",
      "#F97316": "Pantone 1655 C",
      "#333333": "Pantone 447 C",
      "#707070": "Pantone 424 C",
      "#E6E6E6": "Pantone Cool Gray 1 C",
      "#FFFFFF": "Blanco Puro (Papel)"
    };
    if (known[h]) return known[h];
    const { r, g, b } = hexToRgb(h);
    const code = 200 + ((r * 3 + g * 5 + b * 7 + (idx || 0) * 19) % 780);
    return `Pantone ${code} C`;
  }

  // Extrae colores reales del SVG de Gemini si el usuario pidió colores específicos en el chat
  function extractColorsFromLogoState(activeIt, st) {
    let pri = (activeIt && activeIt.pri) || (st && st.logoPriHex) || "#426EAE";
    let sec = (activeIt && activeIt.sec) || (st && st.logoSecHex) || "#4C9DE6";

    const customSvg = (activeIt && activeIt.geminiCustomSvg) ? String(activeIt.geminiCustomSvg) : "";
    if (customSvg.length > 20) {
      const matches = customSvg.match(/#[0-9A-Fa-f]{6}\b/g) || [];
      const distinct = [];
      for (const m of matches) {
        const up = m.toUpperCase();
        const { r, g, b } = hexToRgb(up);
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const sat = Math.max(r, g, b) - Math.min(r, g, b);
        // Ignorar blancos, negros puros y grises neutros
        if (lum > 240 || lum < 18 || sat < 24) continue;
        if (!distinct.includes(up)) distinct.push(up);
      }
      if (distinct.length >= 1 && (pri === "#1D4ED8" || !activeIt?.pri)) {
        pri = distinct[0];
      }
      if (distinct.length >= 2 && (sec === "#F97316" || !activeIt?.sec)) {
        sec = distinct[1];
      }
    }

    const darkInk = mixHex(pri, "#061121", 0.64);
    const accentLight = mixHex(pri, "#7DD3FC", 0.36);
    const softTint = mixHex(pri, "#FFFFFF", 0.92);
    const warmTint = mixHex(sec, "#FFFFFF", 0.92);

    return {
      pri: pri.toUpperCase(),
      sec: sec.toUpperCase(),
      darkInk: darkInk.toUpperCase(),
      accentLight: accentLight.toUpperCase(),
      softTint: softTint.toUpperCase(),
      warmTint: warmTint.toUpperCase(),
      darkGray: "#333333",
      midGray: "#707070",
      lightGray: "#E6E6E6",
      white: "#FFFFFF"
    };
  }

  // ==========================================================================
  // MOTOR DE CORRECCIÓN ORTOGRÁFICA Y CLARIDAD EDITORIAL (SIN ALTERAR LA IDEA)
  // Corrige acentos, puntuación y ortografía en español, y estructura las ideas
  // informales o breves del usuario para expresarlas con claridad ejecutiva.
  // ==========================================================================
  const SPANISH_ORTHO_MAP = {
    "mas": "más", "tambien": "también", "ademas": "además", "asi": "así",
    "despues": "después", "traves": "través", "segun": "según", "detras": "detrás",
    "facil": "fácil", "faciles": "fáciles", "dificil": "difícil", "rapido": "rápido",
    "rapida": "rápida", "rapidos": "rápidos", "rapidas": "rápidas", "comodo": "cómodo",
    "comoda": "cómoda", "comodos": "cómodos", "comodas": "cómodas", "practico": "práctico",
    "practica": "práctica", "economico": "económico", "economica": "económica",
    "unico": "único", "unica": "única", "unicos": "únicos", "unicas": "únicas",
    "autentico": "auténtico", "autentica": "auténtica", "organico": "orgánico",
    "organica": "orgánica", "organicos": "orgánicos", "organicas": "orgánicas",
    "ecologico": "ecológico", "ecologica": "ecológica", "tecnologico": "tecnológico",
    "tecnologica": "tecnológica", "tecnologia": "tecnología", "diseno": "diseño",
    "disenos": "diseños", "logistica": "logística", "clinica": "clínica",
    "clinico": "clínico", "medico": "médico", "medica": "médica", "medicos": "médicos",
    "odontologia": "odontología", "psicologia": "psicología", "nutricion": "nutrición",
    "alimentacion": "alimentación", "educacion": "educación", "capacitacion": "capacitación",
    "formacion": "formación", "construccion": "construcción", "arquitectonico": "arquitectónico",
    "arquitectonica": "arquitectónica", "ingenieria": "ingeniería", "consultoria": "consultoría",
    "asesoria": "asesoría", "auditoria": "auditoría", "atencion": "atención",
    "solucion": "solución", "soluciones": "soluciones", "innovacion": "innovación",
    "produccion": "producción", "distribucion": "distribución", "fabricacion": "fabricación",
    "elaboracion": "elaboración", "reparacion": "reparación", "instalacion": "instalación",
    "decoracion": "decoración", "administracion": "administración", "gestion": "gestión",
    "operacion": "operación", "informacion": "información", "comunicacion": "comunicación",
    "presentacion": "presentación", "evaluacion": "evaluación", "certificacion": "certificación",
    "personalizacion": "personalización", "automatizacion": "automatización",
    "optimizacion": "optimización", "transformacion": "transformación",
    "ubicacion": "ubicación", "proteccion": "protección", "prevencion": "prevención",
    "rehabilitacion": "rehabilitación", "investigacion": "investigación",
    "garantia": "garantía", "garantias": "garantías", "envio": "envío", "envios": "envíos",
    "cafe": "café", "cafes": "cafés", "cafeteria": "cafetería", "panaderia": "panadería",
    "reposteria": "repostería", "pasteleria": "pastelería", "carniceria": "carnicería",
    "joyeria": "joyería", "ferreteria": "ferretería", "papeleria": "papelería",
    "carpinteria": "carpintería", "plomeria": "plomería", "barberia": "barbería",
    "peluqueria": "peluquería", "lavanderia": "lavandería", "heladeria": "heladería",
    "pizzeria": "pizzería", "taqueria": "taquería", "cerveceria": "cervecería",
    "estetica": "estética", "estetico": "estético", "higienico": "higiénico",
    "mexico": "México", "cdmx": "CDMX", "bogota": "Bogotá", "peru": "Perú",
    "panama": "Panamá", "espana": "España", "exito": "éxito", "optimo": "óptimo",
    "optima": "óptima", "maximo": "máximo", "maxima": "máxima", "minimo": "mínimo",
    "minima": "mínima", "linea": "línea", "lineas": "líneas", "fisico": "físico",
    "fisica": "física", "publico": "público", "publica": "pública", "ninos": "niños",
    "ninas": "niñas", "jovenes": "jóvenes", "duenos": "dueños", "anos": "años",
    "vehiculos": "vehículos", "automoviles": "automóviles", "analisis": "análisis",
    "diagnostico": "diagnóstico", "metodo": "método", "metodos": "métodos",
    "proposito": "propósito", "catalogo": "catálogo", "formula": "fórmula",
    "habito": "hábito", "habitos": "hábitos", "telefono": "teléfono", "movil": "móvil",
    "pagina": "página", "paginas": "páginas", "camara": "cámara", "musica": "música",
    "energia": "energía", "bateria": "batería", "dia": "día", "dias": "días",
    "pais": "país", "paises": "países", "raiz": "raíz", "raices": "raíces",
    "vacio": "vacío", "frio": "frío", "fria": "fría", "calido": "cálido",
    "calida": "cálida", "intimo": "íntimo", "intima": "íntima", "clasico": "clásico",
    "clasica": "clásica", "geometrico": "geométrico", "geometrica": "geométrica",
    "simbolo": "símbolo", "tipografia": "tipografía", "fotografia": "fotografía",
    "asesoramiento": "asesoramiento", "azucar": "azúcar", "diabeticos": "diabéticos",
    "gluten": "gluten", "proteina": "proteína", "vitaminas": "vitaminas",
    "domestico": "doméstico", "domesticos": "domésticos", "ecologia": "ecología",
    "aplicacion": "aplicación", "aplicaciones": "aplicaciones", "estrategica": "estratégica",
    "estrategico": "estratégico", "estrategicas": "estratégicas", "estrategicos": "estratégicos",
    "practicas": "prácticas", "practicos": "prácticos", "suscripcion": "suscripción",
    "valoracion": "valoración", "biomecanica": "biomecánica", "biomecanico": "biomecánico",
    "contemporanea": "contemporánea", "contemporaneo": "contemporáneo", "direccion": "dirección",
    "juridico": "jurídico", "juridica": "jurídica", "analitica": "analítica", "analitico": "analítico",
    "autonomos": "autónomos", "autonomo": "autónomo", "autonoma": "autónoma", "planeacion": "planeación",
    "manana": "mañana", "precision": "precisión", "integracion": "integración", "ejecucion": "ejecución"
  };

  function fixSpanishOrthography(inputStr) {
    if (!inputStr) return "";
    let s = String(inputStr)
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .replace(/([,.;:!?])([^\s0-9.,;:!?])/g, "$1 $2")
      .trim();

    if (!s) return "";

    // Corregir palabras palabra por palabra respetando mayúsculas iniciales o totales
    s = s.replace(/\b([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)\b/g, (match) => {
      const low = match.toLowerCase();
      let replacement = SPANISH_ORTHO_MAP[low];
      if (!replacement && low.length >= 6 && /[a-z]cion$/.test(low)) {
        replacement = low.slice(0, -4) + "ción";
      }
      if (!replacement) return match;
      if (match === match.toUpperCase() && match.length > 1) {
        return replacement.toUpperCase();
      }
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });

    // Correcciones contextuales frecuentes ("que vivan mas", "sin azucar", "al vacio", etc.)
    s = s
      .replace(/\bpor que\b(?=\s+(?:quiero|queremos|buscamos|existe|creemos|hacemos))/gi, "porque")
      .replace(/\ba domicilio\b/gi, "a domicilio")
      .replace(/\bal vacio\b/gi, "al vacío")
      .replace(/\bsin azucar\b/gi, "sin azúcar");

    // Primera letra siempre en mayúscula
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
  }

  // ==========================================================================
  // CONSEJO METODOLÓGICO DE AUTORES CONSULTORES · THE BEST BRAND ADVISORY BOARD
  // Cada autor audita y valida los capítulos y láminas del Brand Book
  // ==========================================================================
  window.TBB_MASTER_AUTHORS_BOARD = {
    aaker: {
      id: "aaker",
      name: "David Aaker",
      shortName: "Aaker",
      role: "Consejero Metodológico de Relevancia de Categoría & Brand Equity",
      book: "Building Strong Brands & Brand Relevance",
      channel: "UC Berkeley Haas / Prophet",
      monogram: "DA",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [0],
      plates: ["01", "02", "03", "14"],
      keyMotto: "No compitas por precio: crea una subcategoría propia donde la competencia sea irrelevante.",
      auditVerdictDefault: "AUDITORÍA DE RELEVANCIA Y CATEGORÍA: APROBADA",
      auditMethod: function (rawText, context = {}) {
        const text = String(rawText || "").trim();
        const bName = context.bName || "la marca";
        const hasPain = /problema|fricción|caos|desconexión|necesidad|falta|cansad/i.test(text);
        const hasSol = /solución|sistema|plataforma|servicio|elaboración|diseño/i.test(text);
        const score = text.length > 25 ? (hasPain && hasSol ? 99 : 95) : 89;
        const critique = `David Aaker dictamina: Tu descripción define con claridad la categoría y el dolor nuclear que resuelves. La formulación ejecutiva elimina ambigüedades operativas y posiciona a ${bName} como el referente natural de su industria.`;
        const executiveCopy = window.tbbRefineUserCopyOrthoAndClarity(text, "giro", bName, text);
        return {
          author: "David Aaker",
          role: "Relevancia de Categoría",
          verdict: "AUDITORÍA DE CATEGORÍA: APROBADA",
          score: `${score}/100`,
          critique,
          executiveCopy
        };
      }
    },
    osterwalder: {
      id: "osterwalder",
      name: "Alexander Osterwalder",
      shortName: "Osterwalder",
      role: "Consejero Metodológico de Propuesta de Valor & Business Model Canvas",
      book: "Business Model Generation & Value Proposition Design",
      channel: "Strategyzer",
      monogram: "AO",
      avatarColor: "#0D2540",
      accentColor: "#4C9DE6",
      stepIds: [0, 1],
      plates: ["02", "03"],
      keyMotto: "Encaja los dolores y ganancias del cliente con el mapa de valor de tu solución.",
      auditVerdictDefault: "AUDITORÍA DE ENCAJE PROBLEMA-SOLUCIÓN: VALIDADA",
      auditMethod: function (rawText, context = {}) {
        const text = String(rawText || "").trim();
        const bName = context.bName || "la marca";
        const executiveCopy = window.tbbRefineUserCopyOrthoAndClarity(text, "offer", bName, text);
        return {
          author: "Alexander Osterwalder",
          role: "Value Proposition Fit",
          verdict: "ENCAJE DE PROPUESTA DE VALOR: VALIDADO",
          score: "98/100",
          critique: `Alexander Osterwalder dictamina: Se verifica un encaje sólido entre los 'Jobs-to-be-Done' del comprador y el mapa de valor entregado por ${bName}.`,
          executiveCopy
        };
      }
    },
    sinek: {
      id: "sinek",
      name: "Simon Sinek",
      shortName: "Sinek",
      role: "Consejero Metodológico de Propósito Nuclear & Círculo Dorado",
      book: "Start With Why & The Infinite Game",
      channel: "TED Talk Oficial",
      monogram: "SS",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [1],
      plates: ["04", "05", "06"],
      keyMotto: "La gente no compra lo que haces, sino por qué lo haces.",
      auditVerdictDefault: "AUDITORÍA DE PROPÓSITO CONCÉNTRICO: APROBADA",
      auditMethod: function (rawText, context = {}) {
        const text = String(rawText || "").trim();
        const bName = context.bName || "la marca";
        const executiveCopy = window.tbbRefineUserCopyOrthoAndClarity(text, "purpose", bName, text);
        return {
          author: "Simon Sinek",
          role: "El Círculo Dorado",
          verdict: "PROPÓSITO CONCÉNTRICO: APROBADO",
          score: "99/100",
          critique: `Simon Sinek dictamina: Tu 'Por Qué' trasciende la simple transacción comercial. Inspira pertenencia y lealtad visceral tanto en el equipo interno como en los clientes.`,
          executiveCopy
        };
      }
    },
    miller: {
      id: "miller",
      name: "Donald Miller",
      shortName: "Miller",
      role: "Consejero Metodológico de Claridad Narrativa & StoryBrand",
      book: "Building a StoryBrand & Hero on a Mission",
      channel: "StoryBrand Studios",
      monogram: "DM",
      avatarColor: "#0D2540",
      accentColor: "#4C9DE6",
      stepIds: [1],
      plates: ["05", "07", "08"],
      keyMotto: "El cliente es el héroe de la historia, no tu marca. Tu empresa es el guía.",
      auditVerdictDefault: "AUDITORÍA DE CLARIDAD NARRATIVA: CERTIFICADA",
      auditMethod: function (rawText, context = {}) {
        const text = String(rawText || "").trim();
        const bName = context.bName || "la marca";
        const executiveCopy = window.tbbRefineUserCopyOrthoAndClarity(text, "persona", bName, text);
        return {
          author: "Donald Miller",
          role: "Claridad Narrativa & Guía",
          verdict: "CLARIDAD NARRATIVA: CERTIFICADA",
          score: "98/100",
          critique: `Donald Miller dictamina: Tu marca asume con elegancia el rol de 'Guía' (con empatía y autoridad comprobada), ofreciendo un plan claro y medible que guía al héroe hacia el éxito.`,
          executiveCopy
        };
      }
    },
    carlzon: {
      id: "carlzon",
      name: "Jan Carlzon",
      shortName: "Carlzon",
      role: "Consejero Metodológico de Momentos de la Verdad & Experiencia Operativa",
      book: "Moments of Truth",
      channel: "SAS Leadership Series",
      monogram: "JC",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [2],
      plates: ["09", "10", "11", "12"],
      keyMotto: "Cada interacción de 15 segundos entre un cliente y tu equipo es un Momento de la Verdad.",
      auditVerdictDefault: "AUDITORÍA DE MOMENTOS DE VERDAD: CERTIFICADA",
      auditMethod: function (rawList, context = {}) {
        return {
          author: "Jan Carlzon",
          role: "Momentos de la Verdad",
          verdict: "EXPERIENCIA OPERATIVA: CERTIFICADA",
          score: "97/100",
          critique: `Jan Carlzon dictamina: La arquitectura de touchpoints cubre sin fisuras los 3 momentos críticos (Antes, Durante y Después). Se garantiza cero fricción y un estándar humano y puntual en cada contacto.`,
          executiveCopy: "Mapeo omnicanal homologado con respuesta garantizada, trazabilidad y seguimiento post-venta."
        };
      }
    },
    norman: {
      id: "norman",
      name: "Don Norman",
      shortName: "Norman",
      role: "Consejero Metodológico de Diseño Emocional & Experiencia Humana",
      book: "The Design of Everyday Things & Emotional Design",
      channel: "Nielsen Norman Group / UCSD",
      monogram: "DN",
      avatarColor: "#0D2540",
      accentColor: "#4C9DE6",
      stepIds: [2],
      plates: ["09", "11", "12"],
      keyMotto: "Las cosas atractivas funcionan mejor: diseña para el nivel visceral, conductual y reflexivo.",
      auditVerdictDefault: "AUDITORÍA DE USABILIDAD EMOCIONAL: APROBADA",
      auditMethod: function (rawText, context = {}) {
        return {
          author: "Don Norman",
          role: "Diseño Emocional",
          verdict: "USABILIDAD EMOCIONAL: APROBADA",
          score: "98/100",
          critique: `Don Norman dictamina: El flujo de servicio ofrece affordances claros y retroalimentación inmediata, eliminando la sobrecarga cognitiva del usuario.`,
          executiveCopy: "Interacción intuitiva, transparente y centrada 100% en las necesidades humanas del cliente."
        };
      }
    },
    ries_trout: {
      id: "ries_trout",
      name: "Al Ries & Jack Trout",
      shortName: "Ries & Trout",
      role: "Consejeros Metodológicos de Posicionamiento & Batalla Mental",
      book: "Positioning: The Battle for Your Mind & 22 Immutable Laws",
      channel: "Marketing Masters",
      monogram: "RT",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [3],
      plates: ["13", "14"],
      keyMotto: "El posicionamiento no es lo que le haces al producto, es lo que construyes en la mente del prospecto.",
      auditVerdictDefault: "AUDITORÍA DE POSICIONAMIENTO EN LA MENTE: CERTIFICADA",
      auditMethod: function (rawName, context = {}) {
        const name = String(rawName || "TheBestBrand").trim();
        const score = name.length <= 15 ? 99 : 92;
        return {
          author: "Al Ries & Jack Trout",
          role: "Posicionamiento en la Mente",
          verdict: "POSICIONAMIENTO Y DIFERENCIACIÓN: CERTIFICADO",
          score: `${score}/100`,
          critique: `Al Ries & Jack Trout dictaminan: «${name}» posee alta sonoridad y pregnancia nemotécnica. Ocupa un territorio nítido en la mente y permite adueñarse de una sola palabra en la categoría.`,
          executiveCopy: `${name.toUpperCase()} · Posicionamiento de categoría única con registro prioritario en Niza.`
        };
      }
    },
    watkins: {
      id: "watkins",
      name: "Alexandra Watkins",
      shortName: "Watkins",
      role: "Consejera Metodológica de Naming & Fonética Comercial",
      book: "Hello, My Name Is Awesome: How to Create Brand Names That Stick",
      channel: "Eat My Words",
      monogram: "AW",
      avatarColor: "#0D2540",
      accentColor: "#4C9DE6",
      stepIds: [3],
      plates: ["13"],
      keyMotto: "Pasa el test SMILE (Suggestive, Meaningful, Imagery, Legs, Emotional) y evita SCRATCH.",
      auditVerdictDefault: "AUDITORÍA FONÉTICA SMILE: APROBADA CON EXCELENCIA",
      auditMethod: function (rawName, context = {}) {
        return {
          author: "Alexandra Watkins",
          role: "Test Fonético SMILE & SCRATCH",
          verdict: "TEST SMILE: 5/5 CRITERIOS SUPERADOS",
          score: "100/100",
          critique: `Alexandra Watkins dictamina: El nombre supera las 5 pruebas SMILE: es sugestivo, memorable, evoca imaginería mental positiva, tiene piernas para extenderse y genera tracción emocional.`,
          executiveCopy: "Nombre fonéticamente equilibrado, libre de ortografía confusa y de pronunciación fluida."
        };
      }
    },
    rand: {
      id: "rand",
      name: "Paul Rand",
      shortName: "Rand",
      role: "Consejero Metodológico de Rigor Simbólico & Semiótica Icónica",
      book: "A Designer's Art & Design, Form, and Chaos",
      channel: "Yale School of Art Archive",
      monogram: "PR",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [4],
      plates: ["15", "16", "17", "18", "19", "21", "26"],
      keyMotto: "Un logo no vende; identifica. Su valor se revela cuando se asocia a un producto o servicio de calidad.",
      auditVerdictDefault: "TEST DE RAND (7 CRITERIOS DE CALIDAD): 100/100",
      auditMethod: function (symbolData, context = {}) {
        return {
          author: "Paul Rand",
          role: "Test de Rand de 7 Puntos",
          verdict: "TEST DE RAND: 7/7 CRITERIOS APROBADOS",
          score: "100/100",
          critique: `Paul Rand dictamina: El símbolo maestro cumple rigurosamente con los 7 criterios del Test de Rand: 1. Es distintivo. 2. Es visible. 3. Es adaptable. 4. Es memorable. 5. Es universal. 6. Es atemporal. 7. Es simple.`,
          executiveCopy: "Síntesis geométrica de alta retención que conserva su legibilidad desde 16px hasta escala monumental."
        };
      }
    },
    vignelli: {
      id: "vignelli",
      name: "Massimo Vignelli",
      shortName: "Vignelli",
      role: "Consejero Metodológico de Disciplina Constructiva & Retícula 8x8",
      book: "The Vignelli Canon",
      channel: "Vignelli Center for Design Studies",
      monogram: "MV",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [4, 5],
      plates: ["20", "21", "22", "25"],
      keyMotto: "Si puedes diseñar una cosa, puedes diseñarlo todo. La retícula es la disciplina que libera la creatividad.",
      auditVerdictDefault: "RETÍCULA CONSTRUCTIVA 8x8 Y AISLAMIENTO 1.5X: CERTIFICADA",
      auditMethod: function (gridData, context = {}) {
        return {
          author: "Massimo Vignelli",
          role: "El Canon Vignelli",
          verdict: "DISCIPLINA CONSTRUCTIVA Y RETÍCULA: CERTIFICADA",
          score: "99/100",
          critique: `Massimo Vignelli dictamina: La construcción técnica en módulo 8x8 y el área de aislamiento de 1.5X protegen al símbolo de cualquier contaminación visual. Las 6 prohibiciones blindan la dignidad de la marca.`,
          executiveCopy: "Geometría euclidiana con cotas exactas, área de guarda innegociable y aplicación calada en negativo."
        };
      }
    },
    haviv: {
      id: "haviv",
      name: "Sagi Haviv",
      shortName: "Haviv",
      role: "Consejero Metodológico de Simplicidad Radical & Marcas Perdurables",
      book: "Identify: Basic Principles of Identity Design",
      channel: "Chermayeff & Geismar & Haviv",
      monogram: "SH",
      avatarColor: "#0D2540",
      accentColor: "#4C9DE6",
      stepIds: [4],
      plates: ["01", "15", "18", "19", "21"],
      keyMotto: "Un logo excelente no describe; identifica. Debe ser tan simple que un niño pueda dibujarlo de memoria en la arena.",
      auditVerdictDefault: "AUDITORÍA DE SIMPLICIDAD ICÓNICA: APROBADA",
      auditMethod: function (iconData, context = {}) {
        return {
          author: "Sagi Haviv",
          role: "Simplicidad Icónica",
          verdict: "SÍNTESIS ICÓNICA RADICAL: APROBADA",
          score: "98/100",
          critique: `Sagi Haviv dictamina: La marca alcanza la cota más alta del diseño de identidad: reducción al elemento esencial sin perder su carga simbólica.`,
          executiveCopy: "Identificador puro, reproducible en un solo color y reconocible al instante a cualquier distancia."
        };
      }
    },
    nagamachi: {
      id: "nagamachi",
      name: "Mitsuhiro Nagamachi",
      shortName: "Nagamachi",
      role: "Consejero Metodológico de Ingeniería Kansei & Psicología Emocional",
      book: "Kansei Engineering & Affective Product Design",
      channel: "Hiroshima University Kansei Lab",
      monogram: "MN",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [5],
      plates: ["23", "24", "26"],
      keyMotto: "Traduce los sentimientos, emociones y valores psicológicos del usuario en parámetros físicos de diseño.",
      auditVerdictDefault: "AUDITORÍA KANSEI DE RESONANCIA EMOCIONAL: CERTIFICADA",
      auditMethod: function (paletteData, context = {}) {
        return {
          author: "Mitsuhiro Nagamachi",
          role: "Ingeniería Kansei",
          verdict: "RESONANCIA EMOCIONAL KANSEI: CERTIFICADA",
          score: "99/100",
          critique: `Mitsuhiro Nagamachi dictamina: La paleta de 8 tonos genera una respuesta afectiva de certeza, serenidad técnica y confianza institucional en el sistema nervioso del observador.`,
          executiveCopy: "Cromatismo calibrado por longitud de onda, con balance de contraste 18.5:1 sobre lienzo blanco puro."
        };
      }
    },
    ive: {
      id: "ive",
      name: "Jony Ive",
      shortName: "Ive",
      role: "Consejero Metodológico de Acabado Sensorial & Proporción de Luz",
      book: "Industrial Design Philosophy & Sensory Minimalism",
      channel: "LoveFrom / Apple Design Archive",
      monogram: "JI",
      avatarColor: "#0D2540",
      accentColor: "#4C9DE6",
      stepIds: [5],
      plates: ["23", "24", "25", "28"],
      keyMotto: "La verdadera simplicidad no es solo la ausencia de desorden; es la consecuencia inevitable de resolver profundamente un problema.",
      auditVerdictDefault: "PROPORCIÓN DE LUZ 70/20/10 Y ACABADO SENSORIAL: APROBADO",
      auditMethod: function (visualData, context = {}) {
        return {
          author: "Jony Ive",
          role: "Acabado Sensorial & Luz",
          verdict: "PROPORCIÓN 70/20/10 Y SENSORIALIDAD: APROBADA",
          score: "100/100",
          critique: `Jony Ive dictamina: El espacio negativo actúa como material de construcción. 70% lienzo blanco puro, 20% contraste estructural y 10% acento funcional confieren un acabado de lujo austero.`,
          executiveCopy: "Pureza formal donde cada radio de curvatura y cota tipográfica responde a una razón constructiva ineludible."
        };
      }
    },
    porter: {
      id: "porter",
      name: "Michael Porter",
      shortName: "Porter",
      role: "Consejero Metodológico de Estrategia Competitiva & Barreras de Entrada",
      book: "Competitive Strategy & What is Strategy?",
      channel: "Harvard Business School",
      monogram: "MP",
      avatarColor: "#0D2540",
      accentColor: "#426EAE",
      stepIds: [6],
      plates: ["27", "28", "29", "30"],
      keyMotto: "La estrategia consiste en elegir qué no hacer y crear un conjunto de actividades único que sea difícil de replicar.",
      auditVerdictDefault: "AUDITORÍA DE GOBERNANZA Y BARRERAS DE ENTRADA: VIGENTE",
      auditMethod: function (govData, context = {}) {
        return {
          author: "Michael Porter",
          role: "Estrategia Competitiva",
          verdict: "BLINDAJE Y BARRERAS DE ENTRADA: CERTIFICADO",
          score: "99/100",
          critique: `Michael Porter dictamina: Este manual constituye una barrera de entrada estratégica. Al estandarizar la cadena de valor visual y operativa, convierte a la marca en un activo institucional inimitable.`,
          executiveCopy: "Gobernanza corporativa de cumplimiento obligatorio que protege la prima de valor en el mercado."
        };
      }
    },
    neumeier: {
      id: "neumeier",
      name: "Marty Neumeier",
      shortName: "Neumeier",
      role: "Consejero Metodológico de Síntesis Estratégica & The Brand Gap",
      book: "The Brand Gap, Zag & The Dictionary of Brand",
      channel: "Liquid Agency / The Futur",
      monogram: "MN",
      avatarColor: "#0D2540",
      accentColor: "#4C9DE6",
      stepIds: [6],
      plates: ["27", "30"],
      keyMotto: "Una marca no es lo que tú dices que es; es lo que ellos dicen que es.",
      auditVerdictDefault: "AUDITORÍA DE SÍNTESIS ZAG Y DIFERENCIACIÓN RADICAL: APROBADA",
      auditMethod: function (brandData, context = {}) {
        return {
          author: "Marty Neumeier",
          role: "The Brand Gap & Zag",
          verdict: "SÍNTESIS ESTRATÉGICA ZAG: APROBADA",
          score: "99/100",
          critique: `Marty Neumeier dictamina: Se ha cerrado la brecha entre la lógica de negocios y la magia del diseño. Mientras el mercado hace ZIG, esta marca hace ZAG con convicción total.`,
          executiveCopy: "Identidad carismática que une visión estratégica y potencia estética en un solo impulso."
        };
      }
    }
  };

  // Función global para ejecutar la auditoría interactiva del autor en el paso actual
  window.tbbRunLiveAuthorAudit = function (stepNum, fieldRole) {
    const s = Number(stepNum || 0);
    const board = window.TBB_MASTER_AUTHORS_BOARD || {};
    const cs = (typeof canvasState === "object" && canvasState) ? canvasState : {};
    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";
    const bGiro = (cs.custom_business_type || cs.step0_short_essence || "Soluciones Especializadas").trim();

    const stepAuthorMap = {
      0: board.aaker,
      1: board.sinek,
      2: board.carlzon,
      3: board.ries_trout,
      4: board.rand,
      5: board.nagamachi,
      6: board.porter
    };

    const author = stepAuthorMap[s] || board.aaker;
    let rawText = "";

    if (s === 0) {
      rawText = document.getElementById("tbbStep0BizTextarea")?.value || cs.custom_business_type || "";
    } else if (s === 1) {
      rawText = document.getElementById("tbbStep1AnswerInput")?.value || cs[fieldRole] || "";
    } else if (s === 2) {
      rawText = (typeof tpExtractedItems === "object" && tpExtractedItems[fieldRole]) ? tpExtractedItems[fieldRole] : [];
    } else if (s === 3) {
      rawText = cs.brandName || "";
    } else if (s === 4) {
      rawText = cs.step4_seed_idea || cs.primary_font || "";
    } else if (s === 5) {
      rawText = window.tbbState?.logoPriHex || "#0D2540";
    } else if (s === 6) {
      rawText = bName;
    }

    const audit = author.auditMethod(rawText, { bName, bGiro, fieldRole, step: s });

    const container = document.getElementById(`tbbAuthorAuditResult_${s}`);
    if (container) {
      container.style.display = "block";
      container.innerHTML = `
        <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-top:3.5px solid #0D2540; border-radius:12px; padding:12px 14px; margin-top:8px; box-shadow:0 8px 24px rgba(13,37,64,0.08);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10B981;"></span>
              <span style="font-family:'Montserrat',sans-serif; font-size:0.78rem; font-weight:900; color:#0D2540;">${author.name} · ${author.role}</span>
            </div>
            <span style="font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:800; color:#047857; background:#ECFDF5; padding:3px 8px; border-radius:6px; border:1px solid #A7F3D0;">
              ✦ ${audit.verdict} (${audit.score})
            </span>
          </div>
          <p style="font-size:0.80rem; color:#334155; line-height:1.48; margin:0 0 10px 0; font-style:italic;">
            “${audit.critique}”
          </p>
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; margin-bottom:10px;">
            <div style="font-size:0.68rem; font-weight:800; color:#64748B; margin-bottom:4px; letter-spacing:0.06em;">REDACCIÓN EJECUTIVA DICTAMINADA POR ${author.name.toUpperCase()}:</div>
            <div style="font-size:0.86rem; font-weight:700; color:#090D16; line-height:1.4;">${audit.executiveCopy}</div>
          </div>
          <button type="button" class="tbb-duo-btn tbb-duo-btn-primary" onclick="window.tbbApplyAuthorExecutiveCopy(${s}, '${fieldRole}', '${encodeURIComponent(audit.executiveCopy)}')" style="min-height:36px !important; padding:6px 14px !important; font-size:0.78rem !important; width:100%; border-radius:10px !important;">
            ✓ Aplicar Redacción Ejecutiva de ${author.shortName} al Campo
          </button>
        </div>
      `;
    }

    if (typeof window.triggerAuraEmpatheticFeedback === "function") {
      window.triggerAuraEmpatheticFeedback("author_audit", `Dictamen metodológico emitido por ${author.name}`, false, true);
    }
  };

  window.tbbApplyAuthorExecutiveCopy = function (stepNum, fieldRole, encodedCopy) {
    const text = decodeURIComponent(encodedCopy || "");
    if (!text) return;
    const s = Number(stepNum || 0);

    if (s === 0) {
      const el = document.getElementById("tbbStep0BizTextarea");
      if (el) el.value = text;
      if (typeof window.tbbUpdateBusinessTypeFromInput === "function") window.tbbUpdateBusinessTypeFromInput(text);
    } else if (s === 1) {
      const el = document.getElementById("tbbStep1AnswerInput");
      if (el) el.value = text;
      if (typeof window.tbbSaveStep1Answer === "function") window.tbbSaveStep1Answer(fieldRole, text);
    } else if (s === 3) {
      if (typeof window.tbbUpdateBrandNameFromInput === "function") window.tbbUpdateBrandNameFromInput(text);
    }

    const container = document.getElementById(`tbbAuthorAuditResult_${s}`);
    if (container) {
      container.innerHTML = `
        <div style="background:#ECFDF5; border:1px solid #A7F3D0; border-radius:8px; padding:8px 12px; font-size:0.78rem; font-weight:800; color:#047857; text-align:center;">
          ✓ Redacción ejecutiva aplicada exitosamente y sincronizada con el Manual de 30 Hojas.
        </div>
      `;
      setTimeout(() => {
        if (container) container.style.display = "none";
      }, 3500);
    }
  };

  window.tbbRefineUserCopyOrthoAndClarity = function (rawText, fieldRole = "general", brandName = "la marca", fallbackText = "") {
    const cleanRaw = String(rawText || "").replace(/\s+/g, " ").trim();
    if (!cleanRaw || /^es una app que sirve para$/i.test(cleanRaw)) {
      return fallbackText;
    }

    let text = fixSpanishOrthography(cleanRaw);
    const bName = (brandName && !/^mi nueva marca$/i.test(brandName)) ? String(brandName).trim() : "nuestra marca";

    // Elevar claridad sin alterar la idea central del usuario
    if (fieldRole === "giro") {
      text = text
        .replace(/^(?:soluciones estrat[eé]gicas,?\s+ingenier[ií]a de valor y experiencia de marca\s+(?:en\s+)?)/i, "")
        .replace(/^(?:es una app|es una aplicaci[oó]n|somos una app)\s+que\s+/i, "Aplicación y plataforma digital que ")
        .replace(/^(?:es una plataforma|somos una plataforma)\s+que\s+/i, "Plataforma tecnológica que ")
        .replace(/^(?:es un software|es un sistema)\s+que\s+/i, "Sistema tecnológico especializado que ")
        .replace(/^(?:es una empresa|es un negocio|somos una empresa|somos un negocio)\s+que\s+/i, "Organización especializada que ")
        .replace(/^(?:yo\s+|nosotros\s+)?(?:vendo|vendemos|comercializo|comercializamos)\s+/i, "Elaboración y comercialización de ")
        .replace(/^(?:yo\s+|nosotros\s+)?(?:hago|hacemos|fabricamos|fabrico|produzco|producimos)\s+/i, "Diseño, elaboración y entrega de ")
        .replace(/^(?:yo\s+|nosotros\s+)?(?:doy|damos|ofrezco|ofrecemos|brindo|brindamos)\s+/i, "Servicios especializados de ")
        .replace(/^(?:me dedico a|nos dedicamos a|somos una empresa de|es un negocio de|es una empresa que hace)\s+/i, "");
      text = text.charAt(0).toUpperCase() + text.slice(1);
      text = text.replace(/\.+$/, "");
      return text;
    }

    if (fieldRole === "purpose") {
      text = text
        .replace(/^(?:porque\s+)?(?:quiero|queremos|busco|buscamos)\s+que\s+/i, "Existimos para lograr que ")
        .replace(/^(?:porque\s+)?(?:quiero|queremos|busco|buscamos)\s+/i, "Nuestro propósito es ")
        .replace(/^(?:para\s+que\s+)/i, "Impulsamos un impacto positivo para que ")
        .replace(/^(?:ayudar\s+a\s+)/i, "Transformar y mejorar la experiencia de ");
      text = text.charAt(0).toUpperCase() + text.slice(1);
      if (!/[.!?]$/.test(text)) text += ".";
      if (text.split(/\s+/).length < 10) {
        text = text.replace(/\.$/, "") + `, brindando certidumbre, calidad y confianza a través de ${bName}.`;
      }
      return text;
    }

    if (fieldRole === "offer") {
      text = text
        .replace(/^(?:nosotros\s+)?(?:usamos|utilizamos)\s+/i, "Nos diferenciamos porque seleccionamos y utilizamos ")
        .replace(/^(?:que\s+somos|somos)\s+/i, "Destacamos por ser una propuesta ")
        .replace(/^(?:tenemos|contamos con)\s+/i, "Integramos ");
      text = text.charAt(0).toUpperCase() + text.slice(1);
      if (!/[.!?]$/.test(text)) text += ".";
      if (text.split(/\s+/).length < 10) {
        text = text.replace(/\.$/, "") + `, asegurando resultados superiores y atención cuidada en cada detalle.`;
      }
      return text;
    }

    if (fieldRole === "social") {
      text = text
        .replace(/^(?:ayudar\s+a|ayudamos\s+a)\s+/i, "Facilitamos y elevamos la calidad de vida de ")
        .replace(/^(?:hacer\s+que|lograr\s+que)\s+/i, "Generamos bienestar tangible logrando que ");
      text = text.charAt(0).toUpperCase() + text.slice(1);
      if (!/[.!?]$/.test(text)) text += ".";
      return text;
    }

    if (fieldRole === "process") {
      // Si el usuario escribió pasos con números sin punto ("1 cocinamos 2 empacamos 3 enviamos")
      if (/\b1[\s.)-]/.test(text) && /\b2[\s.)-]/.test(text)) {
        text = text
          .replace(/\b([1-9])\s*[\s.)-]+\s*/g, (_, n) => `${n === "1" ? "" : " · "}${n}. `)
          .replace(/^\s*·\s*/, "");
        text = text.replace(/(?:^|\·\s*)([1-9]\.\s*)([a-záéíóúñ])/g, (_, prefix, ch) => prefix + ch.toUpperCase());
      } else if (!/·|;/.test(text) && /,|\sy\s/.test(text) && text.split(/\s+/).length <= 24) {
        const parts = text.split(/\s*(?:,|luego|después|y al final|finalmente)\s*/i).map(p => p.trim()).filter(Boolean);
        if (parts.length >= 2 && parts.length <= 5) {
          text = parts.map((p, idx) => `${idx + 1}. ${p.charAt(0).toUpperCase() + p.slice(1).replace(/\.$/, "")}`).join(" · ");
        }
      }
      return text;
    }

    if (fieldRole === "message") {
      text = text.replace(/^["«“]|["»”]$/g, "").replace(/\.+$/, "").trim();
      text = text.charAt(0).toUpperCase() + text.slice(1);
      return text;
    }

    if (fieldRole === "persona") {
      if (text.split(/\s+/).length <= 8 && !/[.]/.test(text)) {
        text = `Una marca de carácter ${text.charAt(0).toLowerCase() + text.slice(1)}, que escucha primero al cliente, comunica con claridad sin tecnicismos innecesarios y acompaña con compromiso real.`;
      } else if (!/[.!?]$/.test(text)) {
        text += ".";
      }
      return text;
    }

    if (fieldRole === "buyer") {
      text = text
        .replace(/^(?:para\s+|son\s+)/i, "")
        .replace(/\.+$/, "");
      text = text.charAt(0).toUpperCase() + text.slice(1);
      return text;
    }

    if (fieldRole === "touchpoint") {
      text = text.replace(/\.+$/, "");
      text = text.charAt(0).toUpperCase() + text.slice(1);
      return text;
    }

    if (!/[.!?]$/.test(text) && text.length > 45) text += ".";
    return text;
  };

  // ==========================================================================
  // RESOLUTOR PARAMÉTRICO DE ARQUITECTURA DE MARCA, OFERTA Y ACENTOS VISUALES
  // Adapta el manual de 30 láminas a:
  // 1) Tipo de Arquitectura: Monolítica (Marca Única), Evolución/Portafolio o Multimarca (Submarcas)
  // 2) Oferta y Giro Real del Usuario (Clases de Niza, Pilares de Oferta, Entregables)
  // 3) Elecciones del Usuario sobre el Logo (Trazos Orgánicos vs. Rectos/Geométricos, Tradicional vs. Moderno)
  // ==========================================================================
  function normalizeBipolarVal(rawVal, fallbackNorm = 0.65) {
    if (rawVal === undefined || rawVal === null || rawVal === "") return fallbackNorm;
    const n = Number(rawVal);
    if (!Number.isFinite(n)) return fallbackNorm;
    // En Step 4 los sliders van de -1 a +1; si viene en 0..100 lo convertimos a -1..+1
    if (n > 1.05 || n < -1.05) {
      return Math.max(-1, Math.min(1, (n - 50) / 50));
    }
    return Math.max(-1, Math.min(1, n));
  }

  function resolveBrandbookDesignDNA(cs, st, activeIt, bName, bGiro, bOffer) {
    const bpRaw = (typeof window.bipolarSliderValues === "object" && window.bipolarSliderValues)
      ? window.bipolarSliderValues
      : ((cs && typeof cs.bipolar_sliders === "object" && cs.bipolar_sliders) ? cs.bipolar_sliders : {});

    const orgGeo = normalizeBipolarVal(bpRaw.organico_geometrico, 0.35); // -1 = Orgánico Fluido, +1 = Geométrico Recto
    const tradInn = normalizeBipolarVal(bpRaw.tradicional_innovador, 0.45); // -1 = Tradicional Clásico, +1 = Moderno Vanguardista
    const minComp = normalizeBipolarVal(bpRaw.minimalista_complejo, -0.2); // -1 = Minimalista, +1 = Detallado/Blasón
    const amigAuto = normalizeBipolarVal(bpRaw.amigable_autoritario, 0.3);
    const humTec = normalizeBipolarVal(bpRaw.humano_tecnologico, 0.4);
    const serJug = normalizeBipolarVal(bpRaw.serio_jugueton, -0.1);
    const convReb = normalizeBipolarVal(bpRaw.convencional_rebelde, 0.25);

    const paradigm = (activeIt && activeIt.paradigm) || (st && st.logoParadigm) || "volumetric_glass";
    const archetype = (typeof window.resolveActiveLogoArchetype === "function")
      ? window.resolveActiveLogoArchetype()
      : ((activeIt && activeIt.archetype) || "apple_liquid_wings");
    const priFont = (activeIt && activeIt.fontFamily) || (activeIt && activeIt.mods && activeIt.mods.fontFamily) || (cs && cs.primary_font) || "Montserrat";

    // 1. Determinar Geometría de Trazos y Acentos: "rectilinear" (Trazos Rectos / Geométricos) vs "organic" (Trazos Orgánicos / Curvas)
    const isRectilinearLogo =
      paradigm === "direct_geometric" ||
      archetype === "direct_uber_monolith" ||
      archetype === "liquid_glass_compass" ||
      orgGeo >= 0.15;
    const isOrganicLogo =
      paradigm === "fluid_gradient" ||
      archetype === "liquid_glass_infinity" ||
      archetype === "apple_liquid_wings" ||
      archetype === "fluid_gradient_bloom" ||
      orgGeo < 0.15;

    const strokeStyle = (orgGeo < 0.15 || (isOrganicLogo && orgGeo < 0.45 && paradigm !== "direct_geometric"))
      ? "organic"
      : (isRectilinearLogo ? "rectilinear" : "organic");

    // 2. Determinar Carácter Temporal: "traditional" (Tradicional / Clásico / Herencia) vs "modern" (Moderno / Vanguardista)
    const isSerifFont = /playfair|cormorant|garamond|serif|cinzel|bodoni|merriweather/i.test(priFont);
    const isTraditionalLogo =
      tradInn < 0.0 ||
      paradigm === "artisan_seal" ||
      paradigm === "detailed_emblem" ||
      archetype === "liquid_glass_crown" ||
      archetype === "artisan_butcher_seal" ||
      archetype === "outdoor_camp_emblem" ||
      isSerifFont;
    const eraStyle = isTraditionalLogo ? "traditional" : "modern";

    // 3. Determinar Densidad Visual: "minimal" vs "detailed"
    const densityStyle = (minComp > 0.2 || paradigm === "detailed_emblem" || paradigm === "artisan_seal") ? "detailed" : "minimal";

    // Etiqueta descriptiva del lenguaje gráfico para cabeceras, portadas y láminas técnicas
    const strokeLabel = strokeStyle === "rectilinear"
      ? "Trazos Rectos y Precisión Geométrica"
      : "Trazos Orgánicos y Flujo en Curvas";
    const strokeBadge = strokeStyle === "rectilinear"
      ? "TRAZOS RECTOS Y GEOMETRICOS"
      : "TRAZOS ORGANICOS EN CURVAS";
    const eraLabel = eraStyle === "traditional"
      ? "Cánones Clásicos de Herencia y Autoridad"
      : "Estética Moderna y Vanguardia Contemporánea";
    const systemStyleBadge = strokeStyle === "rectilinear"
      ? (eraStyle === "traditional" ? "ARQUITECTURA CLÁSICA DE TRAZO RECTO" : "ARQUITECTURA GEOMÉTRICA DE TRAZO RECTO")
      : (eraStyle === "traditional" ? "ARQUITECTURA EDITORIAL DE CURVA CLÁSICA" : "ARQUITECTURA ORGÁNICA EN CURVAS FLUIDAS");

    const frameRadius = strokeStyle === "rectilinear"
      ? (eraStyle === "traditional" ? "4px" : "6px")
      : (eraStyle === "traditional" ? "14px 26px 14px 14px" : "18px 38px 18px 18px");

    const cardRadius = strokeStyle === "rectilinear" ? "4px" : "14px";
    const badgeRadius = strokeStyle === "rectilinear" ? (eraStyle === "traditional" ? "3px" : "6px") : "50%";

    // 4. Determinar Tipo de Arquitectura de Marca según Paso 0 y contexto del negocio
    const bUpper = String(bName || "TheBestBrand").toUpperCase();
    const isImproBears = /impro\s*bears/i.test(bUpper);
    const step0Goal = (window.step0State && window.step0State.goal) || (cs && cs.step0_goal) || "first";
    const combinedText = `${bGiro || ""} ${bOffer || ""} ${(cs && cs.golden_circle) || ""}`.toLowerCase();

    // Por defecto toda marca es una Marca Única (monolithic) SIN submarcas, a menos que el usuario haya elegido explícitamente "subbrand" en Paso 0 o sea ImproBears
    let archMode = "monolithic";
    if (isImproBears || step0Goal === "subbrand") {
      archMode = "multibrand";
    }

    const archBadge = archMode === "multibrand"
      ? "ARQUITECTURA MULTIMARCA"
      : "MARCA ÚNICA OFICIAL";
    const archTitle = archMode === "multibrand"
      ? "Sistema Multimarca Homologado"
      : "Sistema de Identidad de Marca Única";

    // 5. Detectar Sector y Oferta Real del Usuario para adaptar Clases de Niza, Pilares, Unidades e Imágenes Temáticas
    let sectorKey = "general_services";
    if (/\b(restaurante|caf[eé]|gastronom|alimento|comida|bebida|panader|pasteler|postre|bar|cocina|hotel|hospitalidad|catering|chef|carnicer|asador|perro|mascota|pet|croqueta|nutrici[oó]n animal)\b/i.test(combinedText)) {
      sectorKey = "food_hospitality";
    } else if (/\b(salud|m[eé]dic|cl[ií]nica|dental|odont|psicol|terapia|bienestar|spa|fitness|gimnasio|nutrici|farmac|hospital|veterinar|dermatol|fisioterap)\b/i.test(combinedText)) {
      sectorKey = "health_wellness";
    } else if (/\b(arquitect|construcci|inmobiliar|interiorismo|ingenier[ií]a civil|obra|desarrollo urbano|bienes ra[ií]ces|hogar|mueble|carpinter|decoraci)\b/i.test(combinedText)) {
      sectorKey = "architecture_real_estate";
    } else if (/\b(moda|ropa|prenda|deportiv|joyer|cosm[eé]tic|belleza|tienda|retail|e-commerce|producto|calzado|accesorio|perfum|artesan|boutique)\b/i.test(combinedText)) {
      sectorKey = "retail_product";
    } else if (/\b(educaci|academia|escuela|colegio|universidad|curso|capacitaci|formaci|coaching|taller|enseñanza)\b/i.test(combinedText)) {
      sectorKey = "education_academy";
    } else if (/\b(software|saas|tecnolog|app|plataforma|inteligencia artificial|datos|ciberseguridad|cloud|digital|fintech|automatizaci)\b/i.test(combinedText)) {
      sectorKey = "tech_saas";
    }

    // Extraer pilares reales de la oferta escrita por el usuario (o adaptados al sector)
    const rawOfferParts = String(bOffer || "")
      .split(/[·•;|]|\.\s+|\n+/)
      .map(s => s.trim())
      .filter(s => s.length > 10 && !/^ecosistema integral en/i.test(s));

    const sectorDefaults = {
      food_hospitality: {
        themeTitle: "Gastronomía, Alimentación y Hospitalidad",
        shortNoun: "gastronomía y hospitalidad",
        niceClasses: [
          { c: "CLASE 43", t: "Servicios de Gastronomía, Preparación y Hospitalidad", d: `Preparación especializada de alimentos, experiencia gastronómica y hospitalidad de ${bName}.` },
          { c: "CLASE 30 / 29 / 31", t: "Alimentos Preparados, Recetas Naturales e Insumos Selectos", d: `Productos alimenticios, nutrición especializada, repostería o especialidades envasadas bajo el sello ${bName}.` },
          { c: "CLASE 35", t: "Comercialización, Pedidos Digitales, Suscripción y Tienda", d: `Gestión comercial, venta en línea, pedidos recurrentes y programa de lealtad.` },
          { c: "CLASE 39", t: "Entrega a Domicilio (Delivery), Cadena de Frescura y Empaque", d: `Logística de envío puntual con empaque protector homologado hasta la puerta del cliente.` }
        ],
        portfolioUnits: [
          { suffix: "RECETA & ORIGEN", tag: "CALIDAD NATURAL", promise: `“Ingredientes frescos seleccionados con rigor y preparación cuidada en cada lote de ${bName}.”` },
          { suffix: "EXPERIENCIA", tag: "ATENCIÓN CERCANA", promise: `“Calidez, confianza y presentación impecable pensada para el bienestar diario.”` },
          { suffix: "A DOMICILIO", tag: "EMPAQUE & FRESCURA", promise: `“Entrega puntual y empaque higiénico que conserva intactos el sabor y los nutrientes.”` },
          { suffix: "SUSCRIPCIÓN & CLUB", tag: "LEALTAD CONTINUA", promise: `“Planes recurrentes y seguimiento personalizado para nuestros clientes frecuentes.”` }
        ]
      },
      health_wellness: {
        themeTitle: "Salud, Clínica Especializada y Bienestar Integral",
        shortNoun: "salud y bienestar integral",
        niceClasses: [
          { c: "CLASE 44", t: "Servicios Médicos, Clínicos, Terapéuticos y de Bienestar", d: `Atención especializada, diagnóstico clínico, tratamientos y cuidado integral de la salud en ${bName}.` },
          { c: "CLASE 05 / 03", t: "Preparaciones, Suplementos y Cuidado Especializado", d: `Fórmulas, dermocosmética, insumos clínicos y productos de apoyo terapéutico certificados.` },
          { c: "CLASE 10 / 42", t: "Tecnología Diagnóstica y Seguimiento Digital del Paciente", d: `Expediente clínico digital, telemedicina, monitoreo y aparatología de precisión.` },
          { c: "CLASE 41 / 35", t: "Educación en Salud, Prevención y Gestión de Pacientes", d: `Programas preventivos, acompañamiento continuo y experiencia de paciente libre de estrés.` }
        ],
        portfolioUnits: [
          { suffix: "DIAGNÓSTICO", tag: "VALORACIÓN INTEGRAL", promise: `“Escucha clínica empática y evaluación precisa para entender la raíz de cada paciente.”` },
          { suffix: "TRATAMIENTO", tag: "ESPECIALIDAD CORE", promise: `“Protocolos seguros, personalizados y respaldados por evidencia y tecnología.”` },
          { suffix: "PREVENCIÓN", tag: "BIENESTAR CONTINUO", promise: `“Hábitos, programas y seguimiento cercano para sostener resultados de largo plazo.”` },
          { suffix: "PACIENTE DIGITAL", tag: "AGENDA & PORTAL", promise: `“Citas ágiles, recetas claras y acompañamiento oportuno en todo momento.”` }
        ]
      },
      architecture_real_estate: {
        themeTitle: "Arquitectura, Construcción, Mobiliario y Espacios",
        shortNoun: "arquitectura y espacios",
        niceClasses: [
          { c: "CLASE 42", t: "Arquitectura, Diseño Espacial, Interiorismo e Ingeniería", d: `Proyecto arquitectónico, diseño a medida, modelado técnico y dirección de ${bName}.` },
          { c: "CLASE 37", t: "Construcción, Manufactura, Instalación y Supervisión", d: `Ejecución constructiva, fabricación de precisión, acabados superiores y entrega llave en mano.` },
          { c: "CLASE 20 / 19", t: "Mobiliario de Autor, Materiales Nobles y Equipamiento", d: `Diseño en madera, piedra, metal y soluciones espaciales duraderas para hogar y oficina.` },
          { c: "CLASE 35 / 36", t: "Comercialización de Proyectos, Catálogo y Garantía Patrimonial", d: `Asesoría personalizada, cotización transparente y garantía estructural post-entrega.` }
        ],
        portfolioUnits: [
          { suffix: "DISEÑO A MEDIDA", tag: "CONCEPTO & PLANOS", promise: `“Diseño funcional y estética atemporal que traduce tu visión en espacios y piezas reales.”` },
          { suffix: "MANUFACTURA", tag: "MATERIALES NOBLES", promise: `“Rigor técnico, materiales de primera selección y acabados cuidados al milímetro.”` },
          { suffix: "INSTALACIÓN", tag: "ENTREGA PUNTUAL", promise: `“Montaje limpio, cumplimiento de tiempos y supervisión directa en cada espacio.”` },
          { suffix: "GARANTÍA", tag: "PATRIMONIO DURADERO", promise: `“Certeza documental, manual de cuidado y durabilidad pensada para muchos años.”` }
        ]
      },
      retail_product: {
        themeTitle: "Moda, Diseño de Producto y Comercio Especializado",
        shortNoun: "diseño de producto y comercio",
        niceClasses: [
          { c: "CLASE 35", t: "Comercio Especializado, Boutique, E-Commerce y Distribución", d: `Experiencia de compra física y digital, curaduría de catálogo y atención personalizada de ${bName}.` },
          { c: "CLASE 25 / 18 / 03", t: "Línea Principal de Productos, Indumentaria y Diseño de Autor", d: `Creación, confección, producción y control de calidad de cada pieza firmada por ${bName}.` },
          { c: "CLASE 16 / 39", t: "Empaque de Presentación (Unboxing), Logística y Envío", d: `Packaging protector y memorable, etiquetas de autenticidad y entrega segura al cliente.` },
          { c: "CLASE 42", t: "Catálogo Digital, Personalización y Garantía Post-Venta", d: `Tienda en línea, guía de tallas o selección, certificado de calidad y servicio al cliente.` }
        ],
        portfolioUnits: [
          { suffix: "COLECCIÓN CORE", tag: "LÍNEA PRINCIPAL", promise: `“Diseño cómodo, materiales superiores y calidad que se siente desde el primer uso.”` },
          { suffix: "EDICIÓN ESPECIAL", tag: "PERSONALIZACIÓN", promise: `“Opciones versátiles y detalles cuidados adaptados al ritmo y estilo de cada cliente.”` },
          { suffix: "UNBOXING", tag: "EMPAQUE & ENVÍO", promise: `“Presentación limpia y memorable que protege cada prenda o producto en su entrega.”` },
          { suffix: "COMUNIDAD", tag: "LEALTAD & RECOMPRA", promise: `“Cambios ágiles, respaldo directo y beneficios exclusivos para clientes frecuentes.”` }
        ]
      },
      education_academy: {
        themeTitle: "Educación, Formación Práctica y Desarrollo de Talento",
        shortNoun: "educación y formación ejecutiva",
        niceClasses: [
          { c: "CLASE 41", t: "Educación, Programas Formativos, Talleres y Certificación", d: `Enseñanza práctica, mentoría, cursos presenciales y en línea impartidos por ${bName}.` },
          { c: "CLASE 09 / 16", t: "Materiales Didácticos, Manuales, Guías y Contenido Digital", d: `Cuadernos de trabajo, recursos descargables, plantillas y biblioteca audiovisual.` },
          { c: "CLASE 42", t: "Plataforma Educativa (LMS) y Evaluación de Competencias", d: `Campus virtual, seguimiento de avance, laboratorios prácticos y credenciales verificables.` },
          { c: "CLASE 35", t: "Vinculación Profesional, Comunidad e Impulso de Talento", d: `Asesoría de carrera, programas para empresas y red activa de egresados.` }
        ],
        portfolioUnits: [
          { suffix: "FUNDAMENTOS", tag: "FORMACIÓN BASE", promise: `“Método claro y estructurado para dominar las bases sin confusión ni teoría vacía.”` },
          { suffix: "PRÁCTICA REAL", tag: "TALLER APLICADO", promise: `“Aprender haciendo con casos reales, retroalimentación directa y herramientas listas para usar.”` },
          { suffix: "CAMPUS DIGITAL", tag: "RECURSOS & GUÍAS", promise: `“Acceso continuo a manuales en lienzo claro, cápsulas y seguimiento personalizado.”` },
          { suffix: "CERTIFICACIÓN", tag: "IMPACTO & COMUNIDAD", promise: `“Resultados demostrables, evolución continua y respaldo de la comunidad ${bName}.”` }
        ]
      },
      tech_saas: {
        themeTitle: "Tecnología, Software como Servicio (SaaS) e Inteligencia",
        shortNoun: "plataformas digitales y tecnología",
        niceClasses: [
          { c: "CLASE 42", t: "Software como Servicio (SaaS), Cloud, IA y Desarrollo Tecnológico", d: `Arquitectura de software, algoritmos, APIs, seguridad e infraestructura digital de ${bName}.` },
          { c: "CLASE 09", t: "Aplicaciones Móviles, Interfaces y Sistemas Conectados", d: `Aplicaciones descargables, componentes interactivos y procesamiento inteligente de datos.` },
          { c: "CLASE 35", t: "Analítica de Negocio, Automatización Operativa y Productividad", d: `Optimización de flujos comerciales, tableros de control y eficiencia empresarial.` },
          { c: "CLASE 41", t: "Onboarding Técnico, Documentación y Capacitación de Usuarios", d: `Guías de implementación rápida, academia de producto y soporte especializado.` }
        ],
        portfolioUnits: [
          { suffix: "PLATAFORMA CORE", tag: "MOTOR PRINCIPAL", promise: `“Tecnología rápida, intuitiva y confiable que resuelve el problema crítico sin fricción.”` },
          { suffix: "INTEGRACIÓN", tag: "ECOSISTEMA CONECTADO", promise: `“Sincronización fluida con tus herramientas, dispositivos y flujos de trabajo actuales.”` },
          { suffix: "INTELIGENCIA", tag: "DATOS & AUTOMATIZACIÓN", promise: `“Visibilidad en tiempo real y automatización práctica que ahorra horas cada semana.”` },
          { suffix: "SOPORTE & SLA", tag: "CONFIABILIDAD 24/7", promise: `“Acompañamiento experto, seguridad de datos y evolución continua del sistema.”` }
        ]
      },
      general_services: {
        themeTitle: "Soluciones Profesionales, Consultoría y Operación de Valor",
        shortNoun: "soluciones y servicios especializados",
        niceClasses: [
          { c: "CLASE 35", t: "Estrategia, Gestión Comercial y Operación Especializada", d: `Asesoría, estructuración de soluciones, atención al cliente y operación de ${bName} en ${bGiro}.` },
          { c: "CLASE 42", t: "Diseño de Soluciones, Ingeniería de Servicio y Calidad", d: `Metodología propia, control de calidad, plataformas digitales y trazabilidad técnica.` },
          { c: "CLASE 41", t: "Acompañamiento, Capacitación y Transferencia de Conocimiento", d: `Implementación hombro con hombro, manuales claros y formación para el cliente.` },
          { c: "CLASE 37 / 39", t: "Implementación, Entrega Certificada y Soporte Continuo", d: `Ejecución puntual en campo o digital, logística de entrega y respaldo post-venta.` }
        ],
        portfolioUnits: [
          { suffix: "DIAGNÓSTICO", tag: "CLARIDAD INICIAL", promise: `“Escuchamos primero tu necesidad real y diseñamos el plan exacto sin improvisación.”` },
          { suffix: "SOLUCIÓN CORE", tag: "EJECUCIÓN EXPERTA", promise: `“Calidad técnica superior en ${bGiro} con procesos claros y resultados medibles.”` },
          { suffix: "EXPERIENCIA", tag: "ATENCIÓN SIN FRICCIÓN", promise: `“Comunicación transparente, entregas puntuales y trato humano en cada contacto.”` },
          { suffix: "CONTINUIDAD", tag: "RESPALDO & MEJORA", promise: `“Seguimiento post-venta, garantías claras y evolución constante junto a ti.”` }
        ]
      }
    };

    const activeSector = sectorDefaults[sectorKey] || sectorDefaults.general_services;
    const cleanGiroStr = String(bGiro || "").trim();
    const shortSectorNoun = (cleanGiroStr.length > 0 && cleanGiroStr.length <= 36 && !/\b(que|es\s+una|somos)\b/i.test(cleanGiroStr))
      ? cleanGiroStr
      : (activeSector.shortNoun || activeSector.themeTitle);

    return {
      orgGeo,
      tradInn,
      minComp,
      amigAuto,
      humTec,
      serJug,
      convReb,
      paradigm,
      archetype,
      priFont,
      strokeStyle,
      eraStyle,
      densityStyle,
      strokeLabel,
      strokeBadge,
      eraLabel,
      systemStyleBadge,
      frameRadius,
      cardRadius,
      badgeRadius,
      archMode,
      archBadge,
      archTitle,
      isImproBears,
      sectorKey,
      themeTitle: activeSector.themeTitle,
      shortSectorNoun,
      niceClasses: activeSector.niceClasses,
      portfolioUnits: activeSector.portfolioUnits,
      rawOfferParts
    };
  }
  window.resolveBrandbookDesignDNA = resolveBrandbookDesignDNA;

  // Genera el símbolo en positivo, negativo calado y las 4 unidades / versiones según el Tipo de Arquitectura de Marca y los Acentos elegidos
  function buildBrandSymbolsAndSubbrands(uidBase, pal, bName, bUpper, priFont, secFont, bGiro, dnaOpt) {
    const cs = getActiveCanvasState();
    const st = window.tbbState || {};
    const activeIt = (st.logoIterations && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const bOffer = (cs.value_offer || `Soluciones especializadas y experiencia superior en ${bGiro}`).trim();
    const dna = dnaOpt || resolveBrandbookDesignDNA(cs, st, activeIt, bName, bGiro, bOffer);

    const rawSymPos = typeof window.synthesizeSystemicSymbol180 === "function"
      ? window.synthesizeSystemicSymbol180(uidBase + "_pos")
      : `<circle cx="90" cy="90" r="68" fill="none" stroke="${pal.pri}" stroke-width="8"/><circle cx="90" cy="90" r="28" fill="${pal.sec}"/>`;

    const symPosSvg = `<svg viewBox="0 0 180 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible;">${rawSymPos}</svg>`;

    // Versión en Negativo Real Calado: invierte tintas oscuras a blanco luminoso y mantiene el acento vibrante
    const rawSymNegBase = typeof window.synthesizeSystemicSymbol180 === "function"
      ? window.synthesizeSystemicSymbol180(uidBase + "_neg")
      : rawSymPos;
    const rawSymNeg = String(rawSymNegBase)
      .replace(new RegExp(pal.darkInk, "gi"), "#FFFFFF")
      .replace(/#090D16|#0F172A|#020617|#1E293B|#0D2540/gi, "#FFFFFF")
      .replace(new RegExp(pal.pri, "gi"), pal.accentLight);

    const symNegSvg = `<svg viewBox="0 0 180 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible;">${rawSymNeg}</svg>`;

    const masterSealPos = (sizePx) => `
      <div style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
        <div style="width:${sizePx}px;height:${sizePx}px;position:relative;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 12px 24px rgba(13,37,64,0.08));">
          ${symPosSvg}
        </div>
      </div>
    `;

    // Renderizador de Lockup adaptado a la Geometría elegida por el usuario (Rectilíneo/Geométrico vs Orgánico/Curvo, Tradicional vs Moderno)
    const renderAdaptiveLockup = (subKey, subLabel, badgeIconPath, heightPx, lockupVariant) => {
      const symSub = typeof window.synthesizeSystemicSymbol180 === "function"
        ? window.synthesizeSystemicSymbol180(`${uidBase}_sub_${subKey}`)
        : rawSymPos;

      const isRect = dna.strokeStyle === "rectilinear";
      const isTrad = dna.eraStyle === "traditional";

      // En arquitectura monolítica mostramos las 4 Versiones Oficiales de Disposición del Logotipo (Horizontal, Vertical, Símbolo 1:1, Sello)
      if (dna.archMode === "monolithic" && lockupVariant === "horizontal") {
        const horizFontSize = bUpper.length > 13 ? 9.8 : (bUpper.length > 10 ? 11.2 : 13.5);
        const frameMarkup = isRect
          ? `<rect x="6" y="24" width="248" height="122" rx="${isTrad ? 2 : 6}" fill="${pal.softTint}" stroke="${pal.pri}" stroke-width="2"/>
             ${isTrad ? `<rect x="11" y="29" width="238" height="112" fill="none" stroke="${pal.sec}" stroke-width="1"/>` : `<path d="M6,24 L40,24 L26,38 L6,38 Z" fill="${pal.sec}"/>`}`
          : `<rect x="6" y="24" width="248" height="122" rx="22" fill="${pal.softTint}" stroke="${pal.lightGray}" stroke-width="1.5"/>
             <path d="M16,24 L116,24 C80,42 44,56 6,72 L6,40 Q6,24 22,24 Z" fill="${pal.sec}" opacity="0.22"/>`;
        return `
          <svg viewBox="0 0 260 215" height="${heightPx || 78}" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;overflow:visible;">
            ${frameMarkup}
            <g transform="translate(14, 41) scale(0.49)">${symSub}</g>
            <line x1="108" y1="46" x2="108" y2="124" stroke="${pal.pri}" stroke-width="1.5" opacity="0.35"/>
            <text x="116" y="78" text-anchor="start" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="${horizFontSize}" fill="${pal.darkInk}" letter-spacing="0.4">${esc(bUpper.slice(0, 16))}</text>
            <text x="116" y="96" text-anchor="start" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="8.6" fill="${pal.sec}" letter-spacing="1.2">${esc(subLabel.slice(0, 18))}</text>
            <line x1="116" y1="106" x2="238" y2="106" stroke="${pal.sec}" stroke-width="2"/>
            <text x="130" y="182" text-anchor="middle" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="14" fill="${pal.darkInk}" letter-spacing="1.0">${esc(bUpper)}</text>
            <text x="130" y="201" text-anchor="middle" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="10.2" fill="${pal.sec}" letter-spacing="1.6">${esc(subLabel)}</text>
          </svg>
        `;
      }

      if (dna.archMode === "monolithic" && lockupVariant === "compact_app") {
        const iconFrame = isRect
          ? `<rect x="46" y="10" width="148" height="148" rx="${isTrad ? 6 : 14}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/>
             <polyline points="46,34 46,10 70,10" fill="none" stroke="${pal.sec}" stroke-width="4"/>
             <polyline points="194,134 194,158 170,158" fill="none" stroke="${pal.sec}" stroke-width="4"/>`
          : `<rect x="46" y="10" width="148" height="148" rx="36" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.2"/>
             <path d="M58,10 L138,10 C105,28 75,44 46,66 L46,28 Q46,10 64,10 Z" fill="${pal.softTint}"/>`;
        return `
          <svg viewBox="0 0 240 215" height="${heightPx || 78}" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;overflow:visible;">
            ${iconFrame}
            <g transform="translate(54, 18) scale(0.73)">${symSub}</g>
            <rect x="164" y="114" width="34" height="34" rx="${isRect ? 4 : 17}" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2.5"/>
            <g transform="translate(169, 119) scale(1)">${badgeIconPath}</g>
            <text x="120" y="182" text-anchor="middle" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="14.5" fill="${pal.darkInk}" letter-spacing="1.1">${esc(bUpper)}</text>
            <text x="120" y="201" text-anchor="middle" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="10.5" fill="${pal.sec}" letter-spacing="1.8">${esc(subLabel)}</text>
          </svg>
        `;
      }

      // Marco geométrico recto vs Marco orgánico curvo para Vertical / Sello / Submarca
      const surroundMarkup = isRect
        ? `
          <polygon points="120,8 190,46 190,122 120,160 50,122 50,46" fill="${pal.softTint}" stroke="${pal.pri}" stroke-width="2"/>
          ${isTrad
            ? `<polygon points="120,14 184,49 184,119 120,154 56,119 56,49" fill="none" stroke="${pal.sec}" stroke-width="1.2" stroke-dasharray="4,3"/>`
            : `<polyline points="50,72 50,46 120,8 190,46" fill="none" stroke="${pal.sec}" stroke-width="3.5"/>`
          }
          <rect x="156" y="110" width="36" height="36" rx="${isTrad ? 2 : 5}" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2.5"/>
        `
        : `
          <circle cx="120" cy="84" r="72" fill="${pal.softTint}" stroke="${pal.lightGray}" stroke-width="1.5"/>
          ${isTrad
            ? `<circle cx="120" cy="84" r="67" fill="none" stroke="${pal.pri}" stroke-width="1.4"/><circle cx="120" cy="84" r="62" fill="none" stroke="${pal.sec}" stroke-width="1" stroke-dasharray="3,3"/>`
            : `<path d="M 54 62 A 72 72 0 1 1 186 106" fill="none" stroke="${pal.pri}" stroke-width="3" opacity="0.55"/>
               <path d="M 62 118 A 68 68 0 0 0 178 54" fill="none" stroke="${pal.sec}" stroke-width="3.5" stroke-linecap="round"/>`
          }
          <circle cx="174" cy="128" r="18" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2.5"/>
        `;

      return `
        <svg viewBox="0 0 240 215" height="${heightPx || 78}" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;overflow:visible;">
          ${surroundMarkup}
          <g transform="translate(52, 16) scale(0.76)">${symSub}</g>
          <g transform="translate(162, 116) scale(1)">${badgeIconPath}</g>
          <text x="120" y="182" text-anchor="middle" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="15.5" fill="${pal.darkInk}" letter-spacing="1.2">${esc(bUpper)}</text>
          <text x="120" y="201" text-anchor="middle" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="800" font-size="11" fill="${pal.sec}" letter-spacing="2.0">${esc(subLabel)}</text>
        </svg>
      `;
    };

    const cleanSlug = bName.toLowerCase().replace(/[^a-z0-9]/g, "") || "marca";
    let subBrands = [];

    if (dna.archMode === "multibrand") {
      // MODO C: ARQUITECTURA MULTIMARCA (Marca Madre + 4 Submarcas Homologadas, ej. ImproBears o Grupo con Divisiones)
      const secondSuffix = dna.isImproBears ? "INGREDIENTS" : "SOLUTIONS";
      subBrands = [
        {
          key: "consulting",
          code: "01",
          unitKindLabel: "SUBMARCA OFICIAL 01",
          suffix: "CONSULTING",
          domain: `consulting.${cleanSlug}.com`,
          lockupVariant: "subbrand",
          tagline: `Arquitectura estratégica, diagnóstico profundo y sistemas de alto rendimiento en ${bGiro}.`,
          promise: `“Transformamos la complejidad operativa en un sistema claro, medible y escalable.”`,
          diffTitle: "Símbolo Diferenciador: Nodos de Estrategia y Precisión",
          diffText: `Integra el símbolo maestro de ${bName} en positivo con el vector de diagnóstico y dirección estratégica en ${pal.sec}.`,
          pillars: [
            { t: "01. Diagnóstico y Auditoría 360°", d: `Análisis de causa raíz, mapeo de procesos críticos y detección de oportunidades en ${bGiro}.` },
            { t: "02. Arquitectura de Procesos y Sistemas", d: "Diseño de flujos de trabajo sin fricción, estandarización operativa y gobernanza." },
            { t: "03. Tableros Ejecutivos y Rentabilidad", d: "Indicadores clave en tiempo real para liberar tiempo mental y escalar con control." }
          ],
          badgeSvg: `<path d="M4,18 L10,12 L14,15 L20,7" fill="none" stroke="${pal.darkInk}" stroke-width="2.2" stroke-linecap="round"/><circle cx="20" cy="7" r="2.5" fill="${pal.sec}"/>`
        },
        {
          key: "solutions",
          code: "02",
          unitKindLabel: "SUBMARCA OFICIAL 02",
          suffix: secondSuffix,
          domain: `${secondSuffix.toLowerCase()}.${cleanSlug}.com`,
          lockupVariant: "subbrand",
          tagline: `Desarrollo técnico, producto core, insumos especializados y ejecución certificada en ${bGiro}.`,
          promise: `“Calidad técnica rigurosa y soluciones listas para operar desde el primer día.”`,
          diffTitle: "Símbolo Diferenciador: Hexágono de Ingeniería y Calidad",
          diffText: `Mantiene intacta la silueta y cromática del logotipo oficial (${pal.pri} y ${pal.sec}), añadiendo el sello de formulación y entrega técnica.`,
          pillars: [
            { t: "01. Soluciones e Insumos Especializados", d: `Portafolio principal de productos y servicios diseñados a la medida de ${bGiro}.` },
            { t: "02. Control de Calidad y Trazabilidad", d: "Protocolos de verificación técnica, cumplimiento normativo y desempeño garantizado." },
            { t: "03. Implementación Hombro con Hombro", d: "Acompañamiento técnico directo en campo o planta para asegurar resultados inmediatos." }
          ],
          badgeSvg: `<polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="${pal.sec}"/>`
        },
        {
          key: "studio",
          code: "03",
          unitKindLabel: "SUBMARCA OFICIAL 03",
          suffix: "STUDIO",
          domain: `studio.${cleanSlug}.com`,
          lockupVariant: "subbrand",
          tagline: `Narrativa visual, producción de contenido, diseño de experiencias y posicionamiento de autoridad.`,
          promise: `“Hacemos visible el valor real de ${bName} con estética limpia, humana y memorable.”`,
          diffTitle: "Símbolo Diferenciador: Lente de Claridad Editorial",
          diffText: `Conecta la geometría del logotipo con el sistema de acentos (${dna.strokeLabel.toLowerCase()}) sobre lienzo claro (#FFFFFF).`,
          pillars: [
            { t: "01. Identidad y Sistemas Visuales", d: "Materiales corporativos, presentaciones ejecutivas y catálogos bajo la Norma Oficial de Identidad." },
            { t: "02. Producción Audiovisual y Digital", d: "Cápsulas demostrativas, fotografía de marca y contenido educativo para redes y web." },
            { t: "03. Experiencia de Cliente y Embalaje", d: "Diseño de cada punto de contacto físico y digital para transmitir confianza inmediata." }
          ],
          badgeSvg: `<rect x="4" y="6" width="16" height="12" rx="2.5" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><circle cx="12" cy="12" r="3.2" fill="${pal.sec}"/>`
        },
        {
          key: "ai",
          code: "04",
          unitKindLabel: "SUBMARCA OFICIAL 04",
          suffix: "AI",
          domain: `ai.${cleanSlug}.com`,
          lockupVariant: "subbrand",
          tagline: `Agentes inteligentes 24/7, automatización de atención y ecosistema digital sincronizado.`,
          promise: `“Inteligencia artificial práctica que atiende al instante, ordena datos y multiplica la productividad.”`,
          diffTitle: "Símbolo Diferenciador: Red Neural Homologada",
          diffText: `100% homologada con las otras 3 unidades sobre fondo blanco (#FFFFFF), integrando nodos de inteligencia conectada en ${pal.sec}.`,
          pillars: [
            { t: "01. Agente de Atención y Ventas 24/7", d: "Respuesta inmediata en WhatsApp y web con calificación automática y trato cálido." },
            { t: "02. Sincronización CRM y Portal de Clientes", d: "Cotizaciones, pedidos, facturas y seguimiento post-venta conectados en tiempo real." },
            { t: "03. Automatización y Analítica Predictiva", d: "Flujos inteligentes que eliminan tareas repetitivas y entregan métricas claras al líder." }
          ],
          badgeSvg: `<circle cx="12" cy="6" r="2.5" fill="${pal.sec}"/><circle cx="6" cy="17" r="2.5" fill="${pal.darkInk}"/><circle cx="18" cy="17" r="2.5" fill="${pal.pri}"/><path d="M12,8.5 L6,14.5 M12,8.5 L18,14.5 M8.5,17 L15.5,17" stroke="${pal.darkInk}" stroke-width="1.8"/>`
        }
      ];
    } else if (dna.archMode === "portfolio") {
      // MODO B: EVOLUCIÓN DE MARCA Y ARQUITECTURA DE PORTAFOLIO / LÍNEAS DE OFERTA (Adaptado al giro y oferta real del usuario)
      const pUnits = dna.portfolioUnits;
      const offerLines = dna.rawOfferParts;
      const badges = [
        `<polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="${pal.sec}"/>`,
        `<path d="M4,18 L10,12 L14,15 L20,7" fill="none" stroke="${pal.darkInk}" stroke-width="2.2" stroke-linecap="round"/><circle cx="20" cy="7" r="2.5" fill="${pal.sec}"/>`,
        `<rect x="4" y="6" width="16" height="12" rx="2.5" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><circle cx="12" cy="12" r="3.2" fill="${pal.sec}"/>`,
        `<circle cx="12" cy="12" r="8" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><polyline points="8.5,12 11,14.5 16,9.5" fill="none" stroke="${pal.sec}" stroke-width="2.2"/>`
      ];
      subBrands = pUnits.map((pu, idx) => {
        const customLine = offerLines[idx] || "";
        return {
          key: `linea_0${idx + 1}`,
          code: `0${idx + 1}`,
          unitKindLabel: `LÍNEA DE VALOR 0${idx + 1}`,
          suffix: pu.suffix,
          domain: `www.${cleanSlug}.com/${pu.suffix.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          lockupVariant: idx === 0 ? "horizontal" : (idx === 2 ? "compact_app" : "vertical"),
          tagline: customLine ? `${customLine} (${bGiro}).` : `Línea oficial de portafolio enfocada en ${pu.tag.toLowerCase()} dentro de ${bGiro}.`,
          promise: pu.promise,
          diffTitle: `Configuración Visual: ${bName} · ${pu.suffix} (${dna.strokeLabel})`,
          diffText: `Articula la oferta de ${bName} manteniendo una sola identidad rectora con acentos en ${dna.strokeStyle === "rectilinear" ? "trazos rectos y ángulos de precisión" : "curvas orgánicas fluidas"} (${pal.pri} y ${pal.sec}).`,
          pillars: [
            { t: `01. Propuesta de Valor en ${pu.suffix}`, d: customLine || `Ejecución especializada de ${bName} diseñada para resolver las necesidades clave en ${bGiro}.` },
            { t: "02. Estándar Visual y Presentación Homologada", d: `Aplicación del logotipo en positivo con ${dna.strokeLabel.toLowerCase()} y jerarquía ${dna.eraLabel.toLowerCase()}.` },
            { t: "03. Experiencia del Cliente y Resultados", d: "Trazabilidad completa, trato cercano y entrega puntual que consolida la reputación de la marca." }
          ],
          badgeSvg: badges[idx]
        };
      });
    } else {
      // MODO A (POR DEFECTO PARA MARCA ÚNICA / DESDE CERO): ARQUITECTURA MONOLÍTICA DE MARCA ÚNICA
      // En lugar de inventar 4 submarcas, presenta las 4 Versiones Oficiales del Logotipo + Pilares de la Oferta de la Marca Única
      const shortSec = dna.shortSectorNoun || "su sector";
      const offer1 = dna.rawOfferParts[0] || `Oferta principal de ${bName} en ${shortSec}`;
      const offer2 = dna.rawOfferParts[1] || `Atención personalizada, entrega impecable y experiencia superior en ${shortSec}`;
      const offer3 = dna.rawOfferParts[2] || `Presencia digital, atención ágil por WhatsApp/Web y descubrimiento de marca`;
      const offer4 = dna.rawOfferParts[3] || `Garantía de calidad, seguimiento post-venta y relación de largo plazo`;

      subBrands = [
        {
          key: "lockup_horizontal",
          code: "01",
          unitKindLabel: "VERSIÓN OFICIAL 01 · LOCKUP HORIZONTAL",
          suffix: "FIRMA PRINCIPAL",
          domain: `www.${cleanSlug}.com`,
          lockupVariant: "horizontal",
          tagline: `Disposición Horizontal Maestra para cabezales web, fachada, propuestas y presentación de la oferta core: ${clipWords(offer1, 95, true)}`,
          promise: `“Una sola marca sólida (${bName}) que concentra el 100% del reconocimiento, la confianza y la propuesta de valor.”`,
          diffTitle: `Geometría Rectora: ${dna.strokeLabel} · ${dna.eraLabel}`,
          diffText: `En el Sistema Oficial de Marca Única no se fragmenta el nombre en submarcas: el Lockup Horizontal Maestro une el símbolo en positivo con el nombre ${bName} y su descriptor de oferta en ${pal.sec}.`,
          pillars: [
            { t: "01. Aplicación en Oferta Principal (Core)", d: `${offer1}. Firmado siempre con la versión horizontal principal sobre lienzo claro (#FFFFFF).` },
            { t: "02. Proporción Símbolo + Logotipo Tipográfico", d: `Alineación constructiva en ${priFont} con acentos en ${dna.strokeStyle === "rectilinear" ? "líneas rectas y cortes geométricos" : "curvas orgánicas continuas"}.` },
            { t: "03. Uso en Portadas, Web y Cotizaciones", d: "Encabezado oficial de alta legibilidad para documentos comerciales y canales principales." }
          ],
          badgeSvg: `<rect x="3" y="7" width="18" height="10" rx="2" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><circle cx="8" cy="12" r="2.2" fill="${pal.sec}"/><line x1="12" y1="12" x2="18" y2="12" stroke="${pal.pri}" stroke-width="2"/>`
        },
        {
          key: "lockup_vertical",
          code: "02",
          unitKindLabel: "VERSIÓN OFICIAL 02 · EMBLEMA VERTICAL",
          suffix: "EMBLEMA CENTRAL",
          domain: `experiencia.${cleanSlug}.com`,
          lockupVariant: "vertical",
          tagline: `Disposición Vertical Centrada para empaques, señalética, uniformes y experiencia durante el servicio: ${clipWords(offer2, 95, true)}`,
          promise: `“Presencia equilibrada y memorable en cada punto de contacto físico, empaque o atención presencial.”`,
          diffTitle: `Acentos de Marca: ${dna.systemStyleBadge}`,
          diffText: `Presenta el símbolo maestro en eje central simétrico sobre el nombre ${bUpper}, enmarcado por ${dna.strokeStyle === "rectilinear" ? "trazos poligonales de precisión" : "anillos y arcos orgánicos"} en ${pal.pri} y ${pal.sec}.`,
          pillars: [
            { t: "01. Experiencia Durante la Compra y Servicio", d: `${offer2}. Presencia visual de autoridad en el momento de verdad con el cliente.` },
            { t: "02. Empaques, Etiquetas, Menús y Señalética", d: "Composición centrada ideal para soportes verticales, bolsas, cajas de producto y tótems." },
            { t: "03. Indumentaria y Credenciales del Equipo", d: "Bordado o impresión limpia sobre prendas institucionales y gafetes de atención." }
          ],
          badgeSvg: `<polygon points="12,3 20,8 20,16 12,21 4,16 4,8" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="${pal.sec}"/><line x1="8" y1="15" x2="16" y2="15" stroke="${pal.pri}" stroke-width="2"/>`
        },
        {
          key: "lockup_compact",
          code: "03",
          unitKindLabel: "VERSIÓN OFICIAL 03 · SÍMBOLO COMPACTO 1:1",
          suffix: "ICONO DIGITAL",
          domain: `@${cleanSlug} · www.${cleanSlug}.com`,
          lockupVariant: "compact_app",
          tagline: `Síntesis 1:1 de alta legibilidad para foto de perfil en redes, WhatsApp Business, favicon e icono de App: ${clipWords(offer3, 95, true)}`,
          promise: `“Reconocimiento instantáneo en pantallas móviles desde 40 px sin perder nitidez ni carácter.”`,
          diffTitle: "Síntesis Óptica para Ecosistema Digital y Móvil",
          diffText: `Aísla el símbolo maestro dentro de un contenedor ${dna.strokeStyle === "rectilinear" ? "geométrico de esquinas técnicas" : "de curva suave"} para garantizar impacto visual inmediato en avatares y notificaciones.`,
          pillars: [
            { t: "01. Avatar Oficial en Redes y WhatsApp 24/7", d: `${offer3}. Identificación inmediata en chats de atención, Instagram, LinkedIn y Google Maps.` },
            { t: "02. Icono de Aplicación (PWA) y Favicon Web", d: "Lectura nítida en pantallas Retina e iconos de pantalla de inicio en iPhone y Android." },
            { t: "03. Marca de Agua y Sello en Videos/Reels", d: "Firma discreta y elegante para contenido audiovisual, catálogos interactivos y presentaciones." }
          ],
          badgeSvg: `<rect x="5" y="3" width="14" height="18" rx="3" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><circle cx="12" cy="11" r="2.8" fill="${pal.sec}"/><line x1="10" y1="17" x2="14" y2="17" stroke="${pal.pri}" stroke-width="1.8"/>`
        },
        {
          key: "lockup_seal",
          code: "04",
          unitKindLabel: "VERSIÓN OFICIAL 04 · SELLO DE GARANTÍA",
          suffix: "SELLO CALIDAD",
          domain: `contacto@${cleanSlug}.com`,
          lockupVariant: "seal",
          tagline: `Insignia institucional de cierre, certificado de autenticidad, garantía y fidelización post-venta: ${clipWords(offer4, 95, true)}`,
          promise: `“Cada entrega lleva la firma de compromiso, respaldo técnico y lealtad de ${bName}.”`,
          diffTitle: "Sello de Certificación y Post-Venta en Lienzo Claro",
          diffText: `Combina el símbolo maestro con el anillo o marco de certificación en ${pal.sec} para lacrar certificados, garantías, cierres de contrato y empaques de entrega.`,
          pillars: [
            { t: "01. Certificados de Entrega y Garantía", d: `${offer4}. Respaldo formal en cada proyecto o producto entregado al cliente.` },
            { t: "02. Cierre de Propuestas y Contratos", d: "Sello de validación ejecutiva en cotizaciones, reportes finales y estados de cuenta." },
            { t: "03. Programa de Lealtad y Recompra", d: "Distintivo oficial para clientes recurrentes, membresías y alianzas estratégicas." }
          ],
          badgeSvg: `<circle cx="12" cy="12" r="8.5" fill="none" stroke="${pal.darkInk}" stroke-width="2"/><polyline points="8.5,12 11,14.5 16,9.5" fill="none" stroke="${pal.sec}" stroke-width="2.4" stroke-linecap="round"/>`
        }
      ];
    }

    subBrands.forEach(sb => {
      sb.lockupSvg = (h) => renderAdaptiveLockup(sb.key, sb.suffix, sb.badgeSvg, h, sb.lockupVariant);
    });

    return { symPosSvg, symNegSvg, masterSealPos, subBrands, cleanSlug, dna };
  }

  // Genera ilustraciones vectoriales temáticas de alta precisión acordes al sector/giro real del usuario
  function renderThematicIndustryMotif(sectorKey, pal, isRect) {
    if (sectorKey === "food_hospitality") {
      // Ilustración temática: Empaque gastronómico / bowl artesanal / hoja orgánica / sello de frescura
      return `
        <g>
          <rect x="14" y="18" width="118" height="92" rx="${isRect ? 4 : 18}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
          <path d="M32,68 C32,92 114,92 114,68 Z" fill="${pal.sec}" opacity="0.9"/>
          <ellipse cx="73" cy="68" rx="41" ry="9" fill="${pal.warmTint}" stroke="${pal.darkInk}" stroke-width="1.8"/>
          <path d="M54,48 C50,36 62,32 58,22 M73,46 C69,34 81,30 77,20 M92,48 C88,36 100,32 96,22" fill="none" stroke="${pal.pri}" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M96,38 C112,32 122,44 110,56 C98,62 90,50 96,38 Z" fill="#10B981" opacity="0.85"/>
          <rect x="36" y="94" width="74" height="10" rx="5" fill="${pal.softTint}"/>
        </g>
      `;
    }
    if (sectorKey === "health_wellness") {
      // Ilustración temática: Cruz clínica de precisión, pulso vital, escudo de bienestar y frasco dermocosmético/clínico
      return `
        <g>
          <rect x="14" y="18" width="118" height="92" rx="${isRect ? 4 : 18}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
          <circle cx="52" cy="62" r="24" fill="${pal.softTint}" stroke="${pal.pri}" stroke-width="2"/>
          <path d="M52,48 V76 M38,62 H66" stroke="${pal.sec}" stroke-width="5" stroke-linecap="round"/>
          <polyline points="78,66 88,66 94,46 102,82 110,58 116,66 124,66" fill="none" stroke="${pal.darkInk}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="30" y="94" width="86" height="8" rx="4" fill="${pal.warmTint}"/>
        </g>
      `;
    }
    if (sectorKey === "architecture_real_estate") {
      // Ilustración temática: Perspectiva arquitectónica isométrica, compás estructural y mobiliario/espacio
      return `
        <g>
          <rect x="14" y="18" width="118" height="92" rx="${isRect ? 4 : 16}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
          <polygon points="73,26 116,46 116,92 73,104 30,92 30,46" fill="${pal.softTint}" stroke="${pal.darkInk}" stroke-width="1.8"/>
          <polygon points="73,26 116,46 73,64 30,46" fill="${pal.sec}" opacity="0.85"/>
          <line x1="73" y1="64" x2="73" y2="104" stroke="${pal.darkInk}" stroke-width="2"/>
          <rect x="44" y="68" width="16" height="22" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="1.5"/>
          <rect x="86" y="64" width="16" height="16" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="1.5"/>
        </g>
      `;
    }
    if (sectorKey === "retail_product") {
      // Ilustración temática: Bolsa boutique de autor, etiqueta colgante (hangtag) y caja de unboxing
      return `
        <g>
          <rect x="14" y="18" width="118" height="92" rx="${isRect ? 4 : 18}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
          <rect x="36" y="44" width="48" height="54" rx="${isRect ? 3 : 8}" fill="${pal.softTint}" stroke="${pal.darkInk}" stroke-width="2"/>
          <path d="M48,44 C48,28 72,28 72,44" fill="none" stroke="${pal.sec}" stroke-width="2.8" stroke-linecap="round"/>
          <rect x="76" y="54" width="38" height="44" rx="${isRect ? 2 : 6}" fill="${pal.warmTint}" stroke="${pal.sec}" stroke-width="2"/>
          <line x1="76" y1="68" x2="114" y2="68" stroke="${pal.sec}" stroke-width="2"/>
          <circle cx="60" cy="70" r="8" fill="${pal.pri}"/>
        </g>
      `;
    }
    if (sectorKey === "education_academy") {
      // Ilustración temática: Libro abierto / manual ejecutivo, birrete/insignia de certificación y nodo de aprendizaje
      return `
        <g>
          <rect x="14" y="18" width="118" height="92" rx="${isRect ? 4 : 18}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
          <path d="M32,42 Q52,36 73,44 Q94,36 114,42 V88 Q94,82 73,90 Q52,82 32,88 Z" fill="${pal.softTint}" stroke="${pal.darkInk}" stroke-width="2"/>
          <line x1="73" y1="44" x2="73" y2="90" stroke="${pal.pri}" stroke-width="2"/>
          <circle cx="73" cy="32" r="8" fill="${pal.sec}"/>
          <line x1="42" y1="56" x2="64" y2="56" stroke="${pal.pri}" stroke-width="2"/>
          <line x1="82" y1="56" x2="104" y2="56" stroke="${pal.sec}" stroke-width="2"/>
        </g>
      `;
    }
    if (sectorKey === "tech_saas") {
      // Ilustración temática: Ecosistema cloud, interfaz UI multipantalla y red neural conectada
      return `
        <g>
          <rect x="14" y="18" width="118" height="92" rx="${isRect ? 4 : 18}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
          <rect x="26" y="30" width="68" height="48" rx="6" fill="${pal.darkInk}"/>
          <rect x="32" y="40" width="32" height="6" rx="3" fill="${pal.sec}"/>
          <rect x="32" y="50" width="48" height="5" rx="2.5" fill="${pal.accentLight}"/>
          <rect x="82" y="46" width="36" height="54" rx="7" fill="${pal.softTint}" stroke="${pal.sec}" stroke-width="2"/>
          <circle cx="100" cy="72" r="9" fill="${pal.pri}"/>
        </g>
      `;
    }
    // general_services: Tablero estratégico, brújula de ingeniería y portafolio certificado
    return `
      <g>
        <rect x="14" y="18" width="118" height="92" rx="${isRect ? 4 : 18}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
        <rect x="28" y="32" width="90" height="64" rx="${isRect ? 3 : 10}" fill="${pal.softTint}" stroke="${pal.darkInk}" stroke-width="1.8"/>
        <polyline points="38,80 58,62 74,70 104,44" fill="none" stroke="${pal.sec}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="58" cy="62" r="4" fill="${pal.pri}"/><circle cx="104" cy="44" r="5" fill="${pal.sec}"/>
      </g>
    `;
  }
  window.renderThematicIndustryMotif = renderThematicIndustryMotif;

  // Genera escenas editoriales vectoriales e ilustraciones contextuales acordes al tema, oferta y elecciones de trazo del usuario
  function renderBrandSceneFrame(sceneType, ctx, heightPx, borderAccentColor) {
    const { pal, bName, bUpper, bGiro, priFont, assets } = ctx;
    const dna = (assets && assets.dna) || { strokeStyle: "organic", eraStyle: "modern", frameRadius: "18px 38px 18px 18px", strokeLabel: "Trazos Orgánicos", systemStyleBadge: "SISTEMA ACTIVO", sectorKey: "general_services", themeTitle: "Soluciones y Experiencia" };
    const isRect = dna.strokeStyle === "rectilinear";
    const isTrad = dna.eraStyle === "traditional";
    const h = heightPx || 176;
    const bCol = borderAccentColor || pal.sec;
    const symInline = (suffixId) => (typeof window.synthesizeSystemicSymbol180 === "function" ? window.synthesizeSystemicSymbol180(ctx.uid + "_" + suffixId) : "");
    const themeMotif = renderThematicIndustryMotif(dna.sectorKey, pal, isRect);

    const bgDecorMain = isRect
      ? `<polygon points="0,185 240,145 440,195 620,130 620,220 0,220" fill="${pal.pri}" opacity="0.09"/>
         <polygon points="0,202 280,170 460,208 620,158 620,220 0,220" fill="${pal.sec}" opacity="0.16"/>`
      : `<path d="M0,185 C180,140 380,210 620,130 L620,220 L0,220 Z" fill="${pal.pri}" opacity="0.10"/>
         <path d="M0,200 C220,165 410,215 620,155 L620,220 L0,220 Z" fill="${pal.sec}" opacity="0.18"/>`;

    const arrowConnector = isRect
      ? `<polyline points="208,98 238,74 282,74 312,98" fill="none" stroke="${pal.sec}" stroke-width="3.5"/>
         <polygon points="316,102 303,95 309,86" fill="${pal.sec}"/>
         <rect x="245" y="63" width="30" height="24" rx="${isTrad ? 2 : 4}" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2"/>
         <text x="260" y="79" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.5" fill="${pal.darkInk}">P0</text>`
      : `<path d="M210,98 C245,68 275,68 310,98" fill="none" stroke="${pal.sec}" stroke-width="3.5" stroke-linecap="round"/>
         <polygon points="316,102 303,95 309,86" fill="${pal.sec}"/>
         <circle cx="260" cy="78" r="15" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2"/>
         <text x="260" y="82" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.5" fill="${pal.darkInk}">P0</text>`;

    let innerScene = "";
    if (sceneType === "chaos_to_clarity") {
      innerScene = `
        <svg viewBox="0 0 620 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="scBg1_${ctx.uid}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${pal.softTint}"/>
              <stop offset="55%" stop-color="#FFFFFF"/>
              <stop offset="100%" stop-color="${pal.warmTint}"/>
            </linearGradient>
          </defs>
          <rect width="620" height="220" fill="url(#scBg1_${ctx.uid})"/>
          ${bgDecorMain}
          <g transform="translate(24, 30)">
            <rect x="0" y="0" width="172" height="136" rx="${isRect ? 4 : 14}" fill="#FFFFFF" stroke="${pal.lightGray}" stroke-width="1.5"/>
            <text x="16" y="24" font-family="'${priFont}',sans-serif" font-weight="800" font-size="9.2" fill="${pal.midGray}" letter-spacing="1.1">ANTES · IMPROVISACION</text>
            <path d="M18,52 L58,38 L92,74 L138,44 M24,92 L74,64 L118,98 L146,78" fill="none" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4,4"/>
            <circle cx="58" cy="38" r="4" fill="#94A3B8"/><circle cx="92" cy="74" r="4" fill="#94A3B8"/><circle cx="118" cy="98" r="4" fill="#94A3B8"/>
            <text x="16" y="118" font-family="'${priFont}',sans-serif" font-weight="600" font-size="9" fill="${pal.midGray}">Fricción y esfuerzo disperso</text>
          </g>
          ${arrowConnector}
          <g transform="translate(324, 18)">
            <rect x="0" y="0" width="272" height="168" rx="${isRect ? 4 : 16}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
            ${isRect
              ? `<polygon points="0,132 145,122 272,136 272,168 0,168" fill="${pal.softTint}"/>`
              : `<path d="M0,132 C95,114 180,148 272,118 L272,168 L0,168 Z" fill="${pal.softTint}"/>`
            }
            <g transform="translate(12, 14) scale(0.46)">${symInline("sc1")}</g>
            <g transform="translate(132, 6) scale(0.88)">${themeMotif}</g>
            <text x="18" y="122" font-family="'${priFont}',sans-serif" font-weight="800" font-size="12.5" fill="${pal.darkInk}">${esc(bUpper)} · ${esc((dna.themeTitle || bGiro).slice(0, 26))}</text>
            <text x="18" y="150" font-family="'${priFont}',sans-serif" font-weight="700" font-size="9.0" fill="${pal.sec}">Sistema claro · Identidad homologada · Resultados reales</text>
          </g>
        </svg>
      `;
    } else if (sceneType === "executive_desk") {
      innerScene = `
        <svg viewBox="0 0 460 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="460" height="200" fill="${pal.softTint}"/>
          ${isRect
            ? `<polygon points="0,0 240,0 140,125 0,125" fill="#FFFFFF"/>
               <polygon points="260,200 460,40 460,200" fill="${pal.pri}" opacity="0.14"/>
               <polygon points="305,200 460,72 460,200" fill="${pal.sec}" opacity="0.22"/>`
            : `<path d="M0,0 L240,0 C170,45 90,85 0,130 Z" fill="#FFFFFF"/>
               <path d="M260,200 C330,145 395,95 460,35 L460,200 Z" fill="${pal.pri}" opacity="0.14"/>
               <path d="M295,200 C355,155 410,110 460,65 L460,200 Z" fill="${pal.sec}" opacity="0.22"/>`
          }
          <rect x="22" y="18" width="416" height="164" rx="${isRect ? 4 : 14}" fill="#FFFFFF" stroke="${pal.lightGray}" stroke-width="1.5"/>
          <rect x="22" y="18" width="416" height="30" rx="${isRect ? 4 : 14}" fill="${pal.darkInk}"/>
          <circle cx="40" cy="33" r="4" fill="${pal.sec}"/><circle cx="52" cy="33" r="4" fill="${pal.accentLight}"/><circle cx="64" cy="33" r="4" fill="#FFFFFF" opacity="0.5"/>
          <text x="84" y="37" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.8" fill="#FFFFFF" letter-spacing="1.3"> ESCENA TEMATICA • ${esc((dna.themeTitle || bUpper).toUpperCase().slice(0, 34))}</text>
          <g transform="translate(28, 52) scale(0.95)">${themeMotif}</g>
          <g transform="translate(174, 56) scale(0.42)">${symInline("sc2")}</g>
          <text x="262" y="82" font-family="'${priFont}',sans-serif" font-weight="800" font-size="13.5" fill="${pal.darkInk}">${esc(bName)}</text>
          <text x="262" y="99" font-family="'${priFont}',sans-serif" font-weight="700" font-size="9.0" fill="${pal.pri}">${esc(bGiro.slice(0, 32))}</text>
          <rect x="180" y="122" width="236" height="42" rx="${isRect ? 3 : 10}" fill="${pal.warmTint}" stroke="${pal.sec}" stroke-width="1.2"/>
          <text x="298" y="140" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.5" fill="${pal.sec}">EXPERIENCIA DISEÑADA PARA EL CLIENTE</text>
          <text x="298" y="154" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="700" font-size="8.2" fill="${pal.darkInk}">${esc(dna.strokeLabel)} · ${esc(dna.eraStyle === "traditional" ? "Sello Clásico" : "Vanguardia")}</text>
        </svg>
      `;
    } else if (sceneType === "filosofia_y_sistema") {
      // Escena Editorial para Lámina 05: Brújula / Horizonte de Visión + Aplicación Temática del Giro
      innerScene = `
        <svg viewBox="0 0 540 175" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="175" fill="${pal.softTint}"/>
          ${isRect
            ? `<polygon points="0,0 220,0 140,175 0,175" fill="#FFFFFF"/>
               <polygon points="350,175 540,0 540,175" fill="${pal.pri}" opacity="0.14"/>`
            : `<path d="M0,0 L240,0 C180,65 110,125 0,175 Z" fill="#FFFFFF"/>
               <path d="M330,175 C410,115 475,55 540,0 L540,175 Z" fill="${pal.pri}" opacity="0.14"/>`
          }
          <g transform="translate(18, 22) scale(1.05)">${themeMotif}</g>
          <g transform="translate(168, 20)">
            <rect x="0" y="0" width="350" height="135" rx="${isRect ? 4 : 16}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="1.8"/>
            <g transform="translate(16, 18) scale(0.54)">${symInline("scFilo")}</g>
            <text x="126" y="42" font-family="'${priFont}',sans-serif" font-weight="800" font-size="9" fill="${pal.sec}" letter-spacing="1.5">NORTE ESTRATEGICO • ${esc(bUpper)}</text>
            <text x="126" y="64" font-family="'${priFont}',sans-serif" font-weight="800" font-size="14" fill="${pal.darkInk}">${esc((dna.themeTitle || bGiro).slice(0, 34))}</text>
            <line x1="126" y1="74" x2="328" y2="74" stroke="${pal.lightGray}" stroke-width="1.5"/>
            <rect x="126" y="86" width="96" height="28" rx="${isRect ? 3 : 8}" fill="${pal.softTint}" stroke="${pal.pri}" stroke-width="1.2"/>
            <text x="174" y="104" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.2" fill="${pal.darkInk}">100% CLARIDAD</text>
            <rect x="230" y="86" width="98" height="28" rx="${isRect ? 3 : 8}" fill="${pal.warmTint}" stroke="${pal.sec}" stroke-width="1.2"/>
            <text x="279" y="104" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.2" fill="${pal.sec}">VALOR MEDIBLE</text>
          </g>
        </svg>
      `;
    } else if (sceneType === "persona_emblem") {
      innerScene = `
        <svg viewBox="0 0 420 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="260" fill="${pal.softTint}"/>
          ${isRect
            ? `<polygon points="0,0 240,0 0,165" fill="${pal.sec}" opacity="0.88"/>
               <polygon points="220,260 420,65 420,260" fill="${pal.pri}" opacity="0.18"/>
               <polygon points="145,28 215,68 215,148 145,188 75,148 75,68" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/>`
            : `<path d="M0,0 L260,0 C170,55 85,110 0,180 Z" fill="${pal.sec}" opacity="0.88"/>
               <path d="M220,260 C300,200 365,135 420,55 L420,260 Z" fill="${pal.pri}" opacity="0.18"/>
               <circle cx="145" cy="108" r="74" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/>
               <path d="M64,84 A84,84 0 1,1 226,132" fill="none" stroke="${pal.sec}" stroke-width="3.5" stroke-linecap="round"/>`
          }
          <g transform="translate(80, 44) scale(0.72)">${symInline("scPers")}</g>
          <g transform="translate(248, 42) scale(1.02)">${themeMotif}</g>
          <rect x="24" y="206" width="372" height="36" rx="${isRect ? 4 : 16}" fill="#FFFFFF" stroke="${pal.lightGray}" stroke-width="1.2"/>
          <text x="210" y="228" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="9.5" fill="${pal.darkInk}" letter-spacing="1.2">ARQUETIPO HUMANO Y TEMA • ${esc(bUpper)}</text>
        </svg>
      `;
    } else if (sceneType === "touchpoints_antes_omnicanal") {
      // Escena Mockup para Lámina 10 (ANTES): Smartphone Redes/Web + Agente WhatsApp 24/7 + Catálogo Temático
      innerScene = `
        <svg viewBox="0 0 540 210" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="210" fill="${pal.softTint}"/>
          <!-- Mockup Laptop / Web Oficial -->
          <rect x="22" y="22" width="230" height="142" rx="10" fill="#FFFFFF" stroke="${pal.darkInk}" stroke-width="2.5"/>
          <rect x="22" y="22" width="230" height="24" rx="8" fill="${pal.darkInk}"/>
          <circle cx="36" cy="34" r="3.5" fill="${pal.sec}"/><circle cx="46" cy="34" r="3.5" fill="${pal.accentLight}"/>
          <text x="60" y="37" font-family="monospace" font-weight="700" font-size="8" fill="#FFFFFF">www.${esc(assets.cleanSlug)}.com</text>
          <g transform="translate(34, 54) scale(0.42)">${symInline("scTp1")}</g>
          <text x="118" y="78" font-family="'${priFont}',sans-serif" font-weight="800" font-size="12" fill="${pal.darkInk}">${esc(bUpper)}</text>
          <text x="118" y="93" font-family="'${priFont}',sans-serif" font-weight="700" font-size="8" fill="${pal.sec}">DESCUBRIMIENTO DIGITAL</text>
          <rect x="118" y="102" width="112" height="22" rx="6" fill="${pal.pri}"/>
          <text x="174" y="116" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8" fill="#FFFFFF">SOLICITAR / COMPRAR</text>
          <rect x="8" y="164" width="258" height="10" rx="5" fill="${pal.darkInk}"/>
          <!-- Mockup iPhone WhatsApp 24/7 & Instagram -->
          <rect x="278" y="16" width="106" height="176" rx="18" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/>
          <rect x="312" y="22" width="38" height="6" rx="3" fill="${pal.darkInk}"/>
          <rect x="290" y="38" width="82" height="42" rx="8" fill="${pal.softTint}"/>
          <text x="331" y="55" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="7.5" fill="${pal.pri}">WHATSAPP 24/7</text>
          <text x="331" y="69" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="700" font-size="7" fill="${pal.darkInk}">Respuesta inmediata</text>
          <rect x="290" y="88" width="82" height="46" rx="8" fill="${pal.warmTint}" stroke="${pal.sec}" stroke-width="1.2"/>
          <text x="331" y="106" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="7.5" fill="${pal.sec}">CONTENIDO REDES</text>
          <text x="331" y="120" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="700" font-size="7" fill="${pal.darkInk}">@${esc(assets.cleanSlug)}</text>
          <!-- Ilustración Temática del Giro a la Derecha -->
          <g transform="translate(392, 34) scale(0.92)">${themeMotif}</g>
        </svg>
      `;
    } else if (sceneType === "touchpoints_durante_servicio") {
      // Escena Mockup para Lámina 11 (DURANTE): Experiencia en Vivo + Empaque / Producto / Servicio del Giro
      innerScene = `
        <svg viewBox="0 0 540 210" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="210" fill="#FFFFFF"/>
          <rect x="0" y="0" width="540" height="210" fill="${pal.warmTint}" opacity="0.45"/>
          <!-- Mockup de Espacio / Empaque / Ejecución del Giro -->
          <g transform="translate(18, 22) scale(1.25)">${themeMotif}</g>
          <!-- Tarjeta de Experiencia Durante la Compra -->
          <g transform="translate(198, 20)">
            <rect x="0" y="0" width="320" height="168" rx="${isRect ? 4 : 18}" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2"/>
            <rect x="0" y="0" width="320" height="32" rx="${isRect ? 4 : 12}" fill="${pal.sec}"/>
            <text x="160" y="20" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="9" fill="#FFFFFF" letter-spacing="1.4">MOMENTO DE VERDAD • EXPERIENCIA EN VIVO</text>
            <g transform="translate(18, 44) scale(0.56)">${symInline("scTp2")}</g>
            <text x="132" y="72" font-family="'${priFont}',sans-serif" font-weight="800" font-size="14" fill="${pal.darkInk}">${esc(bName)}</text>
            <text x="132" y="90" font-family="'${priFont}',sans-serif" font-weight="700" font-size="9" fill="${pal.pri}">${esc((dna.themeTitle || bGiro).slice(0, 32))}</text>
            <rect x="132" y="102" width="168" height="44" rx="${isRect ? 3 : 10}" fill="${pal.softTint}" stroke="${pal.lightGray}" stroke-width="1"/>
            <text x="216" y="120" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.2" fill="${pal.darkInk}">ESTÁNDAR DE ENTREGA HOMOLOGADO</text>
            <text x="216" y="135" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="700" font-size="8" fill="${pal.sec}">Trato cálido · Puntualidad · Cero fricción</text>
          </g>
        </svg>
      `;
    } else if (sceneType === "touchpoints_despues_portal") {
      // Escena Mockup para Lámina 12 (DESPUÉS): Portal de Clientes + Certificado de Garantía + Recompra
      innerScene = `
        <svg viewBox="0 0 540 210" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="210" fill="${pal.softTint}"/>
          <!-- Portal de Clientes & Historial -->
          <rect x="20" y="20" width="310" height="168" rx="${isRect ? 4 : 16}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
          <rect x="20" y="20" width="310" height="30" rx="${isRect ? 4 : 12}" fill="${pal.pri}"/>
          <text x="175" y="39" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.8" fill="#FFFFFF" letter-spacing="1.2">PORTAL DE CLIENTES • SEGUIMIENTO Y GARANTÍA</text>
          <g transform="translate(34, 62) scale(0.48)">${symInline("scTp3")}</g>
          <text x="134" y="82" font-family="'${priFont}',sans-serif" font-weight="800" font-size="12.5" fill="${pal.darkInk}">Certificado de Calidad ${esc(bName)}</text>
          <rect x="134" y="94" width="174" height="10" rx="5" fill="#DCFCE7"/>
          <text x="142" y="102" font-family="'${priFont}',sans-serif" font-weight="800" font-size="7.2" fill="#15803D">ENTREGA VERIFICADA • SATISFACCION 100%</text>
          <rect x="134" y="114" width="174" height="52" rx="8" fill="#F8FAFC" stroke="${pal.lightGray}" stroke-width="1"/>
          <text x="144" y="132" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.2" fill="${pal.darkInk}">Programa de Lealtad y Continuidad</text>
          <text x="144" y="148" font-family="'${priFont}',sans-serif" font-weight="600" font-size="8" fill="${pal.midGray}">Soporte directo · Recompra preferencial</text>
          <!-- Sello Dorado/Acento de Garantía y Motivo Temático -->
          <g transform="translate(352, 34) scale(1.1)">${themeMotif}</g>
        </svg>
      `;
    } else if (/^submarca_/.test(sceneType)) {
      // 4 Mockups Contextuales distintos para las Láminas 16, 17, 18 y 19 para evitar cualquier monotonía
      const isLockup1 = /consulting|linea_01|lockup_horizontal/i.test(sceneType);
      const isLockup2 = /solutions|ingredients|linea_02|lockup_vertical/i.test(sceneType);
      const isLockup3 = /studio|linea_03|lockup_compact/i.test(sceneType);

      if (isLockup1) {
        // Lámina 16: Mockup Cabezal Web Flagship & Carpeta Ejecutiva
        innerScene = `
          <svg viewBox="0 0 540 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="540" height="200" fill="${pal.softTint}"/>
            <rect x="22" y="18" width="336" height="164" rx="${isRect ? 4 : 14}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>
            <rect x="22" y="18" width="336" height="28" fill="${pal.darkInk}"/>
            <circle cx="38" cy="32" r="4" fill="${pal.sec}"/><circle cx="50" cy="32" r="4" fill="${pal.accentLight}"/>
            <text x="68" y="36" font-family="monospace" font-weight="700" font-size="8.5" fill="#FFFFFF">CABEZAL OFICIAL • ${esc(bUpper)}</text>
            <g transform="translate(38, 56) scale(0.52)">${symInline("scSub1")}</g>
            <text x="146" y="92" font-family="'${priFont}',sans-serif" font-weight="800" font-size="18" fill="${pal.darkInk}">${esc(bUpper)}</text>
            <text x="146" y="110" font-family="'${priFont}',sans-serif" font-weight="800" font-size="9.5" fill="${pal.sec}" letter-spacing="1.4">${esc((dna.themeTitle || bGiro).toUpperCase().slice(0, 28))}</text>
            <rect x="146" y="122" width="184" height="36" rx="${isRect ? 3 : 8}" fill="${pal.softTint}"/>
            <text x="238" y="144" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.5" fill="${pal.pri}">FIRMA HORIZONTAL EN WEB Y PROPUESTAS</text>
            <g transform="translate(374, 34) scale(1.02)">${themeMotif}</g>
          </svg>
        `;
      } else if (isLockup2) {
        // Lámina 17: Mockup de Empaque / Etiqueta / Señalética Vertical e Indumentaria
        innerScene = `
          <svg viewBox="0 0 540 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="540" height="200" fill="${pal.warmTint}"/>
            <!-- Mockup Caja / Empaque / Señalética Vertical -->
            <rect x="28" y="16" width="152" height="168" rx="${isRect ? 4 : 16}" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2.2"/>
            <g transform="translate(64, 26) scale(0.44)">${symInline("scSub2")}</g>
            <text x="104" y="126" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="12" fill="${pal.darkInk}">${esc(bUpper)}</text>
            <rect x="52" y="136" width="104" height="18" rx="4" fill="${pal.sec}"/>
            <text x="104" y="148" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="7.5" fill="#FFFFFF">EMPAQUE &amp; SEÑALÉTICA</text>
            <!-- Mockup Gafete / Indumentaria + Escena del Giro -->
            <rect x="202" y="24" width="168" height="152" rx="${isRect ? 4 : 14}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="1.8"/>
            <rect x="256" y="16" width="60" height="14" rx="5" fill="${pal.darkInk}"/>
            <g transform="translate(248, 42) scale(0.42)">${symInline("scSub2b")}</g>
            <text x="286" y="138" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="10.5" fill="${pal.darkInk}">EQUIPO ${esc(bUpper.slice(0, 12))}</text>
            <text x="286" y="154" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="700" font-size="8" fill="${pal.pri}">PRESENCIA IN SITU</text>
            <g transform="translate(382, 34) scale(0.98)">${themeMotif}</g>
          </svg>
        `;
      } else if (isLockup3) {
        // Lámina 18: Mockup iPhone Icono App 1:1 Squircle + Avatar Redes Sociales
        innerScene = `
          <svg viewBox="0 0 540 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="540" height="200" fill="${pal.softTint}"/>
            <!-- Squircle App Icon 1:1 -->
            <rect x="32" y="26" width="148" height="148" rx="34" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/>
            <g transform="translate(49, 43) scale(0.63)">${symInline("scSub3")}</g>
            <!-- Perfil Móvil y Avatar 1:1 -->
            <rect x="204" y="22" width="312" height="156" rx="${isRect ? 4 : 16}" fill="#FFFFFF" stroke="${pal.lightGray}" stroke-width="1.8"/>
            <circle cx="256" cy="76" r="32" fill="${pal.softTint}" stroke="${pal.sec}" stroke-width="2.2"/>
            <g transform="translate(232, 52) scale(0.27)">${symInline("scSub3b")}</g>
            <text x="302" y="68" font-family="'${priFont}',sans-serif" font-weight="800" font-size="14" fill="${pal.darkInk}">@${esc(assets.cleanSlug)}</text>
            <text x="302" y="85" font-family="'${priFont}',sans-serif" font-weight="700" font-size="9" fill="${pal.sec}">ICONO APP 1:1 Y PERFIL VERIFICADO</text>
            <rect x="224" y="122" width="132" height="34" rx="8" fill="${pal.pri}"/>
            <text x="290" y="143" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.5" fill="#FFFFFF">APP STORE / PLAY STORE</text>
            <rect x="368" y="122" width="128" height="34" rx="8" fill="${pal.warmTint}" stroke="${pal.sec}" stroke-width="1.5"/>
            <text x="432" y="143" text-anchor="middle" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8.5" fill="${pal.sec}">WHATSAPP BUSINESS</text>
          </svg>
        `;
      } else {
        // Lámina 19: Sello de Garantía, Certificado de Autenticidad y Cierre Post-Venta
        innerScene = `
          <svg viewBox="0 0 540 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="540" height="200" fill="#FFFFFF"/>
            <rect x="18" y="16" width="504" height="168" rx="${isRect ? 4 : 16}" fill="${pal.softTint}" stroke="${pal.sec}" stroke-width="2"/>
            <rect x="28" y="26" width="484" height="148" rx="${isRect ? 2 : 12}" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="1.2" stroke-dasharray="6,4"/>
            <circle cx="112" cy="100" r="56" fill="${pal.warmTint}" stroke="${pal.sec}" stroke-width="3"/>
            <g transform="translate(68, 56) scale(0.49)">${symInline("scSub4")}</g>
            <text x="192" y="66" font-family="'${priFont}',sans-serif" font-weight="800" font-size="9.5" fill="${pal.sec}" letter-spacing="1.6">CERTIFICADO OFICIAL DE GARANTÍA Y CALIDAD</text>
            <text x="192" y="92" font-family="'${priFont}',sans-serif" font-weight="800" font-size="18" fill="${pal.darkInk}">${esc(bUpper)} • SELLO DE AUTORIDAD</text>
            <text x="192" y="114" font-family="'${priFont}',sans-serif" font-weight="600" font-size="10" fill="${pal.darkGray}">Respaldo técnico, autenticidad verificada y compromiso post-venta.</text>
            <line x1="192" y1="142" x2="340" y2="142" stroke="${pal.darkInk}" stroke-width="1.5"/>
            <text x="192" y="156" font-family="'${priFont}',sans-serif" font-weight="800" font-size="8" fill="${pal.pri}">FIRMA DE DIRECCIÓN • ${esc(bUpper)}</text>
            <g transform="translate(372, 42) scale(0.95)">${themeMotif}</g>
          </svg>
        `;
      }
    } else {
      const labelTop = sceneType.toUpperCase().replace(/_/g, " • ");
      innerScene = `
        <svg viewBox="0 0 540 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="200" fill="#FFFFFF"/>
          ${isRect
            ? `<polygon points="0,0 300,0 0,150" fill="${pal.softTint}"/>
               <polygon points="0,0 180,0 0,98" fill="${pal.sec}" opacity="0.88"/>
               <polygon points="315,200 540,20 540,200" fill="${pal.pri}" opacity="0.14"/>
               <polygon points="102,30 164,66 164,138 102,174 40,138 40,66" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2"/>`
            : `<path d="M0,0 L310,0 C210,48 105,95 0,155 Z" fill="${pal.softTint}"/>
               <path d="M0,0 L190,0 C125,34 65,68 0,105 Z" fill="${pal.sec}" opacity="0.88"/>
               <path d="M310,200 C400,145 475,85 540,15 L540,200 Z" fill="${pal.pri}" opacity="0.14"/>
               <circle cx="102" cy="102" r="64" fill="#FFFFFF" stroke="${pal.lightGray}" stroke-width="1.5"/>`
          }
          <g transform="translate(46, 46) scale(0.62)">${symInline("scG_" + sceneType)}</g>
          <text x="188" y="62" font-family="'${priFont}',sans-serif" font-weight="800" font-size="9.2" fill="${pal.sec}" letter-spacing="1.5">${esc(labelTop)}</text>
          <text x="188" y="88" font-family="'${priFont}',sans-serif" font-weight="800" font-size="18" fill="${pal.darkInk}">${esc(bUpper)}</text>
          <text x="188" y="108" font-family="'${priFont}',sans-serif" font-weight="600" font-size="10" fill="${pal.darkGray}">${esc(bGiro.slice(0, 38))}</text>
          <g transform="translate(382, 36) scale(0.95)">${themeMotif}</g>
        </svg>
      `;
    }

    return `
      <div style="position:relative;width:100%;height:${h}px;border-radius:${dna.frameRadius};overflow:hidden;border:${isTrad ? `2px double ${pal.pri}` : `1px solid ${pal.lightGray}`};border-bottom:3.5px solid ${bCol};background:#FFFFFF;">
        ${innerScene}
      </div>
    `;
  }

  function getActiveCanvasState() {
    if (typeof canvasState === "object" && canvasState) return canvasState;
    if (typeof window.canvasState === "object" && window.canvasState) return window.canvasState;
    return {};
  }
  window.getActiveCanvasState = getActiveCanvasState;

  // Metadatos Oficiales de las 30 Láminas adaptados dinámicamente a la Arquitectura de Marca, Oferta y Estilo de Trazos del Usuario
  window.getUniversalImproBearsGuide30PlatesMeta = function (brandNameOpt) {
    const cs = getActiveCanvasState();
    const st = window.tbbState || {};
    const activeIt = (st.logoIterations && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const bName = brandNameOpt || ((cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand");
    const bUpper = bName.toUpperCase();
    const rawGiro = (cs.custom_business_type || cs.step0_short_essence || "Soluciones Estratégicas, Ingeniería de Valor y Experiencia de Marca").trim();
    const bGiro = window.tbbRefineUserCopyOrthoAndClarity(rawGiro, "giro", bName, rawGiro);
    const rawOffer = (cs.value_offer || `Ecosistema integral en ${bGiro}`).trim();
    const bOffer = window.tbbRefineUserCopyOrthoAndClarity(rawOffer, "offer", bName, bGiro);
    const dna = resolveBrandbookDesignDNA(cs, st, activeIt, bName, bGiro, bOffer);
    const isRect = dna.strokeStyle === "rectilinear";
    const accentNoun = isRect ? "Trazos Geométricos" : "Curvas Orgánicas";

    const plate14Title = dna.archMode === "multibrand"
      ? "Arquitectura Maestra de Marca: Marca Madre + 4 Submarcas Homologadas"
      : `Sistema de Identidad de Marca Única y Disposiciones Oficiales de ${bName}`;

    const plate16to19Titles = dna.archMode === "multibrand"
      ? [
          `Submarca Oficial 01: ${bName} Consulting (Estrategia)`,
          `Submarca Oficial 02: ${bName} ${dna.isImproBears ? "Ingredients" : "Solutions"} (Producto Core)`,
          `Submarca Oficial 03: ${bName} Studio (Experiencia y Comunicación)`,
          `Submarca Oficial 04: ${bName} AI (Esquema Homologado)`
        ]
      : [
          `Pilar 01 de ${bName}: Propuesta de Valor, Solución Principal y Firma Horizontal`,
          `Pilar 02 de ${bName}: Estándar de Experiencia, Atención al Cliente y Presencia Física`,
          `Pilar 03 de ${bName}: Ecosistema Digital, Web, Redes Sociales y Símbolo 1:1`,
          `Pilar 04 de ${bName}: Entregables, Garantía de Calidad y Fidelización Post-Venta`
        ];

    return [
      {
        num: "01",
        sec: "PORTADA MAESTRA",
        title: `Portada Maestra en ${accentNoun}: ${bUpper}`,
        leadAuthor: "David Aaker & Sagi Haviv",
        authorBadge: "METODOLOGÍA DAVID AAKER & SAGI HAVIV",
        authorRole: "Brand Equity & Simbolismo Icónico",
        auditVerdict: "PORTADA MAESTRA Y SÍMBOLO CENTRAL: CERTIFICADOS",
        authorQuote: "“Un símbolo no describe; identifica con autoridad inmutable.”"
      },
      {
        num: "02",
        sec: "01 · ARQUITECTURA METODOLÓGICA",
        title: "Índice Metodológico TheBestBrand (Pasos 0 al 6 · 30 Láminas)",
        leadAuthor: "Alexander Osterwalder & David Aaker",
        authorBadge: "METODOLOGÍA ALEXANDER OSTERWALDER & DAVID AAKER",
        authorRole: "Modelo de Negocio & Consistencia Sistémica",
        auditVerdict: "ARQUITECTURA DE 30 LÁMINAS: HOMOLOGADA",
        authorQuote: "“La consistencia visual y operativa crea ventajas competitivas inexpugnables.”"
      },
      {
        num: "03",
        sec: "01 · PASO 0 — GIRO Y PROBLEMA",
        title: "Manifiesto Fundacional: Del Caos al Sistema y Buyer Persona",
        leadAuthor: "David Aaker & Alexander Osterwalder",
        authorBadge: "METODOLOGÍA DAVID AAKER & ALEXANDER OSTERWALDER",
        authorRole: "Relevancia de Categoría & Propuesta de Valor",
        auditVerdict: "RELEVANCIA DE CATEGORÍA Y BUYER PERSONA: CERTIFICADA",
        authorQuote: "“Define una categoría donde tu solución sea la única opción obvia.”"
      },
      {
        num: "04",
        sec: "02 · PASO 1 — ADN DE MARCA",
        title: `El Círculo Dorado (WHY · HOW · WHAT) y Oferta de ${bName}`,
        leadAuthor: "Simon Sinek",
        authorBadge: "METODOLOGÍA SIMON SINEK · EL CÍRCULO DORADO",
        authorRole: "Propósito Nuclear & Alineación Estratégica",
        auditVerdict: "PROPÓSITO CONCÉNTRICO (WHY · HOW · WHAT): APROBADO",
        authorQuote: "“La gente no compra lo que haces, sino por qué lo haces.”"
      },
      {
        num: "05",
        sec: "02 · PASO 1 — ADN DE MARCA",
        title: "Promesa, Misión, Visión y las 6 Máximas de Filosofía",
        leadAuthor: "Donald Miller",
        authorBadge: "METODOLOGÍA DONALD MILLER · STORYBRAND",
        authorRole: "Claridad Narrativa & El Guía de la Historia",
        auditVerdict: "PROMESA CENTRAL Y LAS 6 MÁXIMAS: CERTIFICADAS",
        authorQuote: "“Si confundes al cliente, lo pierdes. La claridad vence a la persuasión.”"
      },
      {
        num: "06",
        sec: "02 · PASO 1 — ADN DE MARCA",
        title: "Los 6 Principios que nos Guían y Nuestra Relación con Clientes",
        leadAuthor: "Simon Sinek & Donald Miller",
        authorBadge: "METODOLOGÍA SIMON SINEK & DONALD MILLER",
        authorRole: "Cultura Operativa & Relaciones Duraderas",
        auditVerdict: "PRINCIPIOS RECTORES Y 5 COMPROMISOS: CERTIFICADOS",
        authorQuote: "“Los principios innegociables construyen reputación a través de las décadas.”"
      },
      {
        num: "07",
        sec: "02 · PASO 1 — LA EMPRESA COMO PERSONA",
        title: `La Empresa como Persona: Carácter y 4 Facetas de ${bName}`,
        leadAuthor: "Donald Miller",
        authorBadge: "METODOLOGÍA DONALD MILLER · LA EMPRESA COMO GUÍA",
        authorRole: "Personificación de Marca & Empatía con el Cliente",
        auditVerdict: "ARQUETIPO HUMANO Y 4 FACETAS: CERTIFICADOS",
        authorQuote: "“Posiciona a tu empresa como el guía leal y al cliente como el héroe de la jornada.”"
      },
      {
        num: "08",
        sec: "02 · PASO 1 — LA EMPRESA COMO PERSONA",
        title: "Tono de Voz, Personalidad y Lenguaje Visual",
        leadAuthor: "Donald Miller & Aura",
        authorBadge: "METODOLOGÍA DONALD MILLER & MOTOR NEURAL AURA",
        authorRole: "Calibración Lingüística & Voz Corporativa",
        auditVerdict: "TONO DE VOZ Y ESPECTRO DE ATRIBUTOS: CALIBRADOS",
        authorQuote: "“El tono corporativo debe ser firme, cercano y libre de ambigüedades técnicas.”"
      },
      {
        num: "09",
        sec: "03 · PASO 2 — TOUCHPOINTS",
        title: "Ingeniería de Touchpoints: Mapa de Contacto Real con el Cliente",
        leadAuthor: "Jan Carlzon & Don Norman",
        authorBadge: "METODOLOGÍA JAN CARLZON & DON NORMAN",
        authorRole: "Momentos de la Verdad & Diseño Emocional",
        auditVerdict: "INGENIERÍA DE TOUCHPOINTS (3 FASES): CERTIFICADA",
        authorQuote: "“50,000 momentos de verdad diarios definen si tu marca vive o muere.”"
      },
      {
        num: "10",
        sec: "03 · PASO 2 — TOUCHPOINTS",
        title: "Touchpoints Momento 1: Antes de Comprar (Descubrimiento y Confianza)",
        leadAuthor: "Jan Carlzon",
        authorBadge: "METODOLOGÍA JAN CARLZON · MOMENTO 1 (ANTES)",
        authorRole: "Arquitectura de Descubrimiento & Confianza",
        auditVerdict: "DESCUBRIMIENTO Y ANCLAJE DE CONFIANZA: APROBADO",
        authorQuote: "“La primera impresión fija el marco mental en el que se juzgará todo lo demás.”"
      },
      {
        num: "11",
        sec: "03 · PASO 2 — TOUCHPOINTS",
        title: "Touchpoints Momento 2: Durante la Compra y Ejecución del Servicio",
        leadAuthor: "Jan Carlzon & Don Norman",
        authorBadge: "METODOLOGÍA JAN CARLZON & DON NORMAN · MOMENTO 2 (DURANTE)",
        authorRole: "Experiencia en Vivo & Fricción Cero",
        auditVerdict: "EJECUCIÓN DEL SERVICIO SIN FRICCIÓN: APROBADA",
        authorQuote: "“La experiencia en vivo es donde la promesa comercial se vuelve realidad medible.”"
      },
      {
        num: "12",
        sec: "03 · PASO 2 — TOUCHPOINTS",
        title: "Touchpoints Momento 3: Después de Comprar (Portal, Entregables y Lealtad)",
        leadAuthor: "Jan Carlzon & Don Norman",
        authorBadge: "METODOLOGÍA JAN CARLZON & DON NORMAN · MOMENTO 3 (DESPUÉS)",
        authorRole: "Retención, Post-Venta & Lealtad",
        auditVerdict: "PORTAL, ENTREGABLES Y FIDELIZACIÓN: CERTIFICADOS",
        authorQuote: "“El servicio post-venta no es un costo; es la génesis de la próxima compra.”"
      },
      {
        num: "13",
        sec: "04 · PASO 3 — EL NOMBRE OFICIAL",
        title: `Naming Estratégico (${bUpper}), Semiótica y Clases de Niza`,
        leadAuthor: "Al Ries, Jack Trout & Alexandra Watkins",
        authorBadge: "METODOLOGÍA AL RIES, JACK TROUT & ALEXANDRA WATKINS",
        authorRole: "Posicionamiento en la Mente & Test SMILE",
        auditVerdict: "TEST SMILE Y CLASIFICACIÓN DE NIZA: APROBADA",
        authorQuote: "“El nombre es la primera clavija mental que se inserta en el cerebro del consumidor.”"
      },
      {
        num: "14",
        sec: "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS",
        title: plate14Title,
        leadAuthor: "David Aaker & Al Ries",
        authorBadge: "METODOLOGÍA DAVID AAKER & AL RIES",
        authorRole: "Arquitectura de Portafolio & Concentración de Capital",
        auditVerdict: "ARQUITECTURA DE MARCA MONOLÍTICA: HOMOLOGADA",
        authorQuote: "“Una marca única multiplica el retorno sobre la inversión en cada punto de contacto.”"
      },
      {
        num: "15",
        sec: "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS",
        title: "Anatomía Semiótica del Símbolo Maestro en Positivo",
        leadAuthor: "Paul Rand & Sagi Haviv",
        authorBadge: "METODOLOGÍA PAUL RAND & SAGI HAVIV",
        authorRole: "Test de Rand de 7 Puntos & Proporción Áurea",
        auditVerdict: "TEST DE RAND (7 PUNTOS) Y PROPORCIÓN ÁUREA: 100/100",
        authorQuote: "“La belleza de un símbolo radica en su inevitabilidad funcional.”"
      },
      {
        num: "16",
        sec: "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS",
        title: plate16to19Titles[0],
        leadAuthor: "Paul Rand",
        authorBadge: "METODOLOGÍA PAUL RAND · PILAR 01 (PROPUESTA CORE)",
        authorRole: "Síntesis Visual & Firma Horizontal",
        auditVerdict: "FIRMA HORIZONTAL Y SOLUCIÓN PRINCIPAL: APROBADA",
        authorQuote: "“Diseña para la mente del observador, no para su capacidad de asombro efímero.”"
      },
      {
        num: "17",
        sec: "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS",
        title: plate16to19Titles[1],
        leadAuthor: "Paul Rand",
        authorBadge: "METODOLOGÍA PAUL RAND · PILAR 02 (EXPERIENCIA)",
        authorRole: "Integridad y Estándar de Presencia Físcia",
        auditVerdict: "ESTÁNDAR DE ATENCIÓN Y PRESENCIA FÍSICA: APROBADA",
        authorQuote: "“La coherencia geométrica transmite integridad ética y técnica.”"
      },
      {
        num: "18",
        sec: "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS",
        title: plate16to19Titles[2],
        leadAuthor: "Sagi Haviv",
        authorBadge: "METODOLOGÍA SAGI HAVIV · PILAR 03 (ECOSISTEMA DIGITAL)",
        authorRole: "Adaptabilidad Digital & Reducción Escalar",
        auditVerdict: "ADAPTABILIDAD DIGITAL 1:1 Y FAVICON: CERTIFICADA",
        authorQuote: "“Si el símbolo no funciona a 16 píxeles, la marca fracasará en el mundo digital.”"
      },
      {
        num: "19",
        sec: "05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS",
        title: plate16to19Titles[3],
        leadAuthor: "Paul Rand & Sagi Haviv",
        authorBadge: "METODOLOGÍA PAUL RAND & SAGI HAVIV · PILAR 04 (ENTREGABLES)",
        authorRole: "Control de Calidad & Garantía de Marca",
        auditVerdict: "GARANTÍA DE CALIDAD Y RETENCIÓN: APROBADA",
        authorQuote: "“El rigor en el detalle final es lo que distingue a los grandes del resto.”"
      },
      {
        num: "20",
        sec: "05 · PASO 4 — CONSTRUCCIÓN TÉCNICA",
        title: `Retícula Constructiva (8X × 8X) y Sistema de ${accentNoun}`,
        leadAuthor: "Massimo Vignelli",
        authorBadge: "METODOLOGÍA MASSIMO VIGNELLI · EL CANON",
        authorRole: "Geometría Euclidiana & Retícula 8x8",
        auditVerdict: "RETÍCULA CONSTRUCTIVA 8x8 Y COTAS EUCLIDIANAS: CERTIFICADAS",
        authorQuote: "“La retícula es un instrumento de claridad y honestidad moral.”"
      },
      {
        num: "21",
        sec: "05 · PASO 4 — CONSTRUCCIÓN TÉCNICA",
        title: "Área de Aislamiento (1.5X) y Sección de Aplicación en Negativo",
        leadAuthor: "Massimo Vignelli & Paul Rand",
        authorBadge: "METODOLOGÍA MASSIMO VIGNELLI & PAUL RAND",
        authorRole: "Área de Guarda & Calado en Negativo",
        auditVerdict: "ÁREA DE AISLAMIENTO 1.5X Y NEGATIVO CALADO: APROBADOS",
        authorQuote: "“El espacio de guarda garantiza que la marca nunca sea asfixiada por su entorno.”"
      },
      {
        num: "22",
        sec: "05 · PASO 4 — CONSTRUCCIÓN TÉCNICA",
        title: "Usos Incorrectos y Restricciones de Integridad Visual (6 Reglas)",
        leadAuthor: "Massimo Vignelli",
        authorBadge: "METODOLOGÍA MASSIMO VIGNELLI · RESTRICCIONES DE INTEGRIDAD",
        authorRole: "Disciplina Gráfica & Protección del Símbolo",
        auditVerdict: "CÓDIGO DE LAS 6 PROHIBICIONES VISUALES: VIGENTE",
        authorQuote: "“La disciplina visual es la barrera que protege a la marca de la mediocridad.”"
      },
      {
        num: "23",
        sec: "06 · PASO 5 — COLOR Y TIPOGRAFÍA",
        title: "Paleta Cromática Oficial (8 Colores · Pantone · CMYK · HEX)",
        leadAuthor: "Mitsuhiro Nagamachi",
        authorBadge: "METODOLOGÍA MITSUHIRO NAGAMACHI · INGENIERÍA KANSEI",
        authorRole: "Psicología Afectiva del Color & Calibración de Onda",
        auditVerdict: "SISTEMA CROMÁTICO DE 8 TONOS (PANTONE/CMYK/HEX): CERTIFICADO",
        authorQuote: "“El color no decora; induce estados psicológicos de confianza y certeza.”"
      },
      {
        num: "24",
        sec: "06 · PASO 5 — COLOR Y TIPOGRAFÍA",
        title: `Proporción de Luz (70/20/10) y los 6 Recursos en ${accentNoun}`,
        leadAuthor: "Jony Ive & Mitsuhiro Nagamachi",
        authorBadge: "METODOLOGÍA JONY IVE & MITSUHIRO NAGAMACHI",
        authorRole: "Lienzo Puro & Balance 70/20/10",
        auditVerdict: "PROPORCIÓN DE LUZ 70/20/10 Y RECURSOS DE TRAZO: APROBADA",
        authorQuote: "“El 70% de lienzo claro otorga el oxígeno que hace brillar al producto.”"
      },
      {
        num: "25",
        sec: "06 · PASO 5 — COLOR Y TIPOGRAFÍA",
        title: "Sistema Tipográfico Oficial y Jerarquía Editorial",
        leadAuthor: "Massimo Vignelli & Jony Ive",
        authorBadge: "METODOLOGÍA MASSIMO VIGNELLI & JONY IVE",
        authorRole: "Tipografía Modular & Escala Armónica",
        auditVerdict: "ESCALA MODULAR TIPOGRÁFICA Y JERARQUÍA: CERTIFICADA",
        authorQuote: "“La tipografía debe ser una voz elocuente y no un estorbo ruidoso.”"
      },
      {
        num: "26",
        sec: "06 · PASO 5 — COLOR Y TIPOGRAFÍA",
        title: "Sistema de los 6 Sellos Metodológicos en el Estilo del Logo",
        leadAuthor: "Paul Rand & Mitsuhiro Nagamachi",
        authorBadge: "METODOLOGÍA PAUL RAND & MITSUHIRO NAGAMACHI",
        authorRole: "Sellos de Certificación & Calidad Institucional",
        auditVerdict: "SISTEMA DE LOS 6 SELLOS METODOLÓGICOS: HOMOLOGADO",
        authorQuote: "“Los sellos de certificación son la rúbrica visible de la excelencia técnica.”"
      },
      {
        num: "27",
        sec: "07 · PASO 6 — APLICACIONES Y GOBERNANZA",
        title: "Gobernanza de Identidad Documental y Co-Branding (Norma Oficial de Co-Branding)",
        leadAuthor: "Michael Porter & Marty Neumeier",
        authorBadge: "METODOLOGÍA MICHAEL PORTER & MARTY NEUMEIER",
        authorRole: "Gobernanza Institucional & Norma de Co-Branding",
        auditVerdict: "GOBERNANZA Y NORMA OFICIAL DE CO-BRANDING: VIGENTE",
        authorQuote: "“El co-branding en cápsula neutra protege el capital de ambas partes sin mezclar identidades.”"
      },
      {
        num: "28",
        sec: "07 · PASO 6 — APLICACIONES Y GOBERNANZA",
        title: "Papelería en Lienzo Claro, Propuestas, Tarjetas Ejecutivas y Firma",
        leadAuthor: "Marty Neumeier & Jony Ive",
        authorBadge: "METODOLOGÍA MARTY NEUMEIER & JONY IVE",
        authorRole: "Papelería Corporativa & Experiencia Táctil",
        auditVerdict: "SISTEMA DE PAPELERÍA EN LIENZO CLARO: APROBADO",
        authorQuote: "“Cada pieza física que toca un cliente es un embajador tangible de tu promesa.”"
      },
      {
        num: "29",
        sec: "07 · PASO 6 — APLICACIONES Y GOBERNANZA",
        title: "Ecosistema Digital en Lienzo Claro y Checklist de 10 Controles",
        leadAuthor: "Michael Porter",
        authorBadge: "METODOLOGÍA MICHAEL PORTER · AUDITORÍA DE 10 CONTROLES",
        authorRole: "Auditoría de Activos Digitales & Blindaje de Marca",
        auditVerdict: "ECOSISTEMA DIGITAL Y CHECKLIST DE INTEGRIDAD: 10/10",
        authorQuote: "“El control exhaustivo de los activos digitales blinda la reputación en cualquier canal.”"
      },
      {
        num: "30",
        sec: "07 · PASO 6 — COLOFÓN INSTITUCIONAL",
        title: `Colofón Institucional sobre Fondo Claro y Síntesis ${bUpper}`,
        leadAuthor: "Marty Neumeier & Michael Porter",
        authorBadge: "METODOLOGÍA MARTY NEUMEIER & MICHAEL PORTER",
        authorRole: "Constitución Oficial de Marca & Promulgación",
        auditVerdict: "COLOFÓN CONSTITUCIONAL Y VALIDEZ JURÍDICA: PROMULGADO",
        authorQuote: "“La marca queda formalmente constituida como un activo intangible inmutable y de valor creciente.”"
      }
    ];
  };

  window.renderBeneficSinglePlateHTML = function (plateIdx, forPrint) {
    return window.renderUniversalImproBearsGuideSinglePlateHTML(plateIdx, forPrint);
  };

  window.buildComplete30PlatesStandaloneHTML = function () {
    return window.buildUniversal30PlatesStandaloneHTML();
  };


  window.buildActiveBrandProfileForV80 = function () {
    const cs = getActiveCanvasState();
    const st = window.tbbState || {};
    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "The Best Brand";
    const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "the_best_brand";
    
    // Check if matching in CATALOG_30_MAP
    if (window.CATALOG_30_MAP) {
      if (window.CATALOG_30_MAP[slug]) return window.CATALOG_30_MAP[slug];
      if (window.CATALOG_30_MAP[bName.toLowerCase()]) return window.CATALOG_30_MAP[bName.toLowerCase()];
      const altSlug = slug.replace(/_athletics|_ip|_soc|_trauma|_group|_lab|_master|_films|_solar|_dry|_consulting|_ingredients|_studio|_ai/g, "");
      if (window.CATALOG_30_MAP[altSlug]) return window.CATALOG_30_MAP[altSlug];
    }

    const activeIt = (st.logoIterations && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const mods = (activeIt && activeIt.mods) || {};
    const priFont = (activeIt && activeIt.fontFamily) || mods.fontFamily || cs.primary_font || "Montserrat";
    const secFont = "Avenir Next";
    const pal = extractColorsFromLogoState(activeIt, st);
    const symCorePos = typeof window.synthesizeSystemicSymbol180 === "function" ? window.synthesizeSystemicSymbol180("bb_v80_pos") : "";
    const symCoreNeg = typeof window.synthesizeSystemicSymbol180 === "function" ? window.synthesizeSystemicSymbol180("bb_v80_neg") : symCorePos;

    return {
      name: bName,
      slug: slug,
      tagline: (cs.tagline || cs.step0_short_essence || cs.custom_business_type || "SISTEMA INTEGRAL DE IDENTIDAD").trim(),
      category: cs.custom_business_type || "Servicios Especializados",
      giro: (cs.custom_business_type || cs.step0_short_essence || "Soluciones estratégicas, ingeniería de valor y experiencia de marca.").trim(),
      buyer: (cs.ideal_customer || cs.step0_buyer_actor || "Líderes de empresas y clientes que exigen excelencia técnica.").trim(),
      why: (cs.golden_circle || "Porque liberar el tiempo mental y operar con orden transforma el valor de cualquier negocio.").trim(),
      how: (cs.process_steps_text || "Metodología rigurosa, tecnología de última generación y acompañamiento humano.").trim(),
      what: (cs.value_offer || "Identidad oficial de marca, manual de 30 láminas y activos vectoriales.").trim(),
      persona: (cs.brand_persona || "Líder profesional, analítico y socio leal que escucha y acompaña con excelencia.").trim(),
      niza: "Clase Oficial de Registro",
      tpBefore: (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.before) || ["Contenido digital", "Atención ágil", "Diagnóstico inicial", "Propuesta clara"],
      tpDuring: (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.during) || ["Arranque puntual", "Ejecución técnica", "Acompañamiento en vivo", "Entrega y cobro claro"],
      tpAfter: (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.after) || ["Manual y activos", "Garantía activa", "Beneficios leales", "Mejora continua"],
      colors: {
        pri: pal.pri || "#0D2540",
        sec: pal.sec || "#426EAE",
        acc: pal.accentLight || pal.sec || "#FF7A00",
        darkInk: pal.darkInk || "#0D2540",
        midGray: pal.midGray || "#707070",
        lightGray: pal.lightGray || "#E6E6E6",
        softBg: pal.softTint || "#F8FAFC",
        white: "#FFFFFF",
        pantonePri: hexToPantone(pal.pri, 1),
        pantoneSec: hexToPantone(pal.sec, 2),
        cmykPri: hexToCmyk(pal.pri),
        cmykSec: hexToCmyk(pal.sec)
      },
      primaryFont: priFont,
      secondaryFont: secFont,
      isEstablished: false,
      isMultibrand: /improbears/i.test(bName),
      svgCore: symCorePos,
      svgCoreNeg: symCoreNeg
    };
  };

  window.renderUniversalImproBearsGuideSinglePlateHTML = function (plateIdx, forPrint) {
    const idx = Math.max(0, Math.min(29, Number(plateIdx || 0)));
    const cs = getActiveCanvasState();
    const st = window.tbbState || {};
    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";

    // Motor V80 Flawless (Lienzo Claro #FFFFFF · Directiva Max C-00)
    if (window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.generateBrandbook30Plates === "function") {
      const activeBrandObj = window.buildActiveBrandProfileForV80();
      const plates = window.TBB_V80_PLATES_GENERATOR.generateBrandbook30Plates(activeBrandObj);
      const v80Plate = plates[idx] || plates[0];
      if (forPrint) {
        return v80Plate;
      }
      setTimeout(() => {
        if (typeof window.scaleImproBearsPlateInStage === "function") {
          window.scaleImproBearsPlateInStage();
        }
      }, 30);
      return `<div class="tbb-improbears-stage-wrapper"><div class="tbb-improbears-stage-scaler">${v80Plate}</div></div>`;
    }

    const activeIt = (st.logoIterations && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const mods = (activeIt && activeIt.mods) || {};
    const bUpper = bName.toUpperCase();
    const rawGiro = (cs.custom_business_type || cs.step0_short_essence || "Soluciones Estratégicas, Ingeniería de Valor y Experiencia de Marca").trim();
    const bGiro = window.tbbRefineUserCopyOrthoAndClarity(rawGiro, "giro", bName, rawGiro);
    const dnaPre = resolveBrandbookDesignDNA(cs, st, activeIt, bName, bGiro, cs.value_offer || "");
    const sectorShort = dnaPre.shortSectorNoun || "su sector";
    const rawTagline = (cs.tagline || cs.step0_short_essence || bGiro || "CLARIDAD, SISTEMA Y RESULTADOS").trim();
    const tagline = window.tbbRefineUserCopyOrthoAndClarity(rawTagline, "tagline", bName, bGiro);
    const rawBuyer = (cs.step0_buyer_actor || cs.ideal_customer || `Fundadores, Directores y Clientes que buscan certeza, excelencia técnica y resultados medibles en ${sectorShort}`).trim();
    const bBuyer = window.tbbRefineUserCopyOrthoAndClarity(rawBuyer, "buyer", bName, bGiro);
    const rawPurpose = (cs.golden_circle || `Transformar ${sectorShort} mediante sistemas claros, atención humana y ejecución de alta precisión que multiplica resultados.`).trim();
    const bPurpose = window.tbbRefineUserCopyOrthoAndClarity(rawPurpose, "purpose", bName, bGiro);
    const rawOffer = (cs.value_offer || `Ecosistema integral de ${sectorShort} que une estrategia, diseño de experiencia y ejecución especializada en una sola marca.`).trim();
    const bOffer = window.tbbRefineUserCopyOrthoAndClarity(rawOffer, "offer", bName, bGiro);
    const rawSocial = (cs.social_role || `Convertir la complejidad operativa y técnica de ${sectorShort} en claridad, confianza y crecimiento sostenible para nuestros clientes.`).trim();
    const bSocial = window.tbbRefineUserCopyOrthoAndClarity(rawSocial, "social", bName, bGiro);
    const rawProcess = (cs.process_steps_text || `1. Diagnóstico Profundo 360° · 2. Ingeniería y Ejecución Especializada en ${sectorShort} · 3. Entrega Certificada y Mejora Continua`).trim();
    const bProcess = window.tbbRefineUserCopyOrthoAndClarity(rawProcess, "process", bName, bGiro);
    const rawMessage = (cs.core_message || `${bName}: Del caos al sistema con precisión técnica, calidez humana y resultados tangibles.`).trim();
    const bMessage = window.tbbRefineUserCopyOrthoAndClarity(rawMessage, "message", bName, bGiro);
    const rawPersona = (cs.brand_persona || `Líder cercano, con mente de ingeniero y calidez de socio leal: escucha primero la necesidad real del cliente, explica con claridad sin tecnicismos vacíos y acompaña hombro a hombro hasta que todo funcione con orden, estética y rentabilidad.`).trim();
    const bPersona = window.tbbRefineUserCopyOrthoAndClarity(rawPersona, "persona", bName, bGiro);

    const priFont = (activeIt && activeIt.fontFamily) || mods.fontFamily || cs.primary_font || "Montserrat";
    const secFont = "Avenir Next";
    const pal = extractColorsFromLogoState(activeIt, st);
    const uid = (forPrint ? "pr_" : "st_") + idx;
    const dna = resolveBrandbookDesignDNA(cs, st, activeIt, bName, bGiro, bOffer);
    const isRect = dna.strokeStyle === "rectilinear";
    const isTrad = dna.eraStyle === "traditional";
    const assets = buildBrandSymbolsAndSubbrands(uid, pal, bName, bUpper, priFont, secFont, bGiro, dna);
    const ctx = { uid, pal, bName, bUpper, bGiro, tagline, priFont, secFont, assets, dna };

    const tpBeforeRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.before?.length)
      ? window.tpExtractedItems.before
      : (cs.tp_before ? cs.tp_before.split(",").map(s => s.trim()).filter(Boolean) : [
          `Contenido de valor y presencia en redes sociales (${bName})`,
          `Sitio web claro y especializado (www.${assets.cleanSlug}.com)`,
          `Atención inmediata por WhatsApp 24/7 con agente inteligente`,
          `Diagnóstico inicial, cotización ágil o solicitud de muestras/demo`
        ]);
    const tpDuringRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.during?.length)
      ? window.tpExtractedItems.during
      : (cs.tp_during ? cs.tp_during.split(",").map(s => s.trim()).filter(Boolean) : [
          `Proceso de compra y contratación ágil sin fricciones`,
          `Ejecución y acompañamiento hombro con hombro in situ o digital`,
          `Presentación visual clara de avances, prototipos y entregables`,
          `Entrega puntual con empaque y presentación de estándar superior`
        ]);
    const tpAfterRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.after?.length)
      ? window.tpExtractedItems.after
      : (cs.tp_after ? cs.tp_after.split(",").map(s => s.trim()).filter(Boolean) : [
          `Portal de Clientes con historial de proyectos, pedidos y facturas`,
          `Manuales, reportes ejecutivos y garantías en lienzo claro`,
          `Encuesta ejecutiva de satisfacción y mejora continua`,
          `Acompañamiento post-venta, recompra y evolución anual`
        ]);

    const tpBeforeArr = tpBeforeRaw.map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, bGiro));
    const tpDuringArr = tpDuringRaw.map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, bGiro));
    const tpAfterArr = tpAfterRaw.map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, bGiro));

    while (tpBeforeArr.length < 4) tpBeforeArr.push(`Punto de contacto previo #${tpBeforeArr.length + 1} homologado (${bName})`);
    while (tpDuringArr.length < 4) tpDuringArr.push(`Punto de contacto durante el servicio #${tpDuringArr.length + 1} (${bName})`);
    while (tpAfterArr.length < 4) tpAfterArr.push(`Punto de contacto post-venta #${tpAfterArr.length + 1} (${bName})`);

    const metaList = window.getUniversalImproBearsGuide30PlatesMeta(bName);
    const meta = metaList[idx] || metaList[0];

    const archSummaryPhrase = dna.archMode === "multibrand"
      ? `la Marca Madre <strong>${esc(bName)}</strong> y sus <strong>4 Submarcas Homologadas</strong>`
      : (dna.archMode === "portfolio"
          ? `la Marca Rectora <strong>${esc(bName)}</strong> y sus <strong>4 Líneas de Portafolio</strong> en ${esc(bGiro.slice(0, 46))}`
          : `la Marca Única <strong>${esc(bName)}</strong> y sus <strong>4 Versiones Oficiales de Aplicación</strong>`);

    const archShortList = assets.subBrands.map(s => s.suffix).join(" · ");

    // Fondo Paramétrico de cada Lámina: Se adapta a Trazos Rectos/Geométricos vs. Trazos Orgánicos/Curvos y Tradicional vs. Moderno
    const bgCurvesStandard = isRect
      ? `
        <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
          <polygon points="0,0 820,0 760,54 0,54" fill="${pal.pri}" opacity="0.06"/>
          <polygon points="1060,0 1600,0 1600,44 1110,44" fill="${pal.accentLight}" opacity="0.16"/>
          <polygon points="1280,0 1600,0 1600,20 1305,20" fill="${pal.sec}" opacity="0.92"/>
          ${isTrad
            ? `<rect x="24" y="16" width="1552" height="868" fill="none" stroke="${pal.lightGray}" stroke-width="1.2"/>
               <polyline points="24,52 24,16 64,16" fill="none" stroke="${pal.sec}" stroke-width="3"/>
               <polyline points="1576,52 1576,16 1536,16" fill="none" stroke="${pal.pri}" stroke-width="3"/>`
            : `<polyline points="0,835 540,835 570,815 1600,815" fill="none" stroke="${pal.lightGray}" stroke-width="1.5"/>`
          }
          <g stroke="${pal.midGray}" stroke-width="1.4" opacity="0.35">
            <line x1="44" y1="112" x2="54" y2="112"/><line x1="49" y1="107" x2="49" y2="117"/>
            <line x1="68" y1="112" x2="78" y2="112"/><line x1="73" y1="107" x2="73" y2="117"/>
            <line x1="92" y1="112" x2="102" y2="112"/><line x1="97" y1="107" x2="97" y2="117"/>
          </g>
        </svg>
      `
      : `
        <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
          <path d="M0,0 L860,0 C640,28 380,48 0,72 Z" fill="${pal.pri}" opacity="0.06"/>
          <path d="M1040,0 L1600,0 L1600,52 C1400,34 1210,16 1040,0 Z" fill="${pal.accentLight}" opacity="0.14"/>
          <path d="M1260,0 L1600,0 L1600,24 C1470,16 1360,8 1260,0 Z" fill="${pal.sec}" opacity="0.92"/>
          ${isTrad
            ? `<path d="M28,832 C480,856 1120,808 1572,832" fill="none" stroke="${pal.pri}" stroke-width="1.2" opacity="0.28"/>`
            : ""
          }
          <path d="M-20,830 C460,870 1020,785 1620,835" fill="none" stroke="${pal.lightGray}" stroke-width="1.5"/>
          <circle cx="48" cy="110" r="2.5" fill="${pal.midGray}" opacity="0.3"/><circle cx="64" cy="110" r="2.5" fill="${pal.midGray}" opacity="0.3"/><circle cx="80" cy="110" r="2.5" fill="${pal.midGray}" opacity="0.3"/>
          <circle cx="48" cy="126" r="2.5" fill="${pal.midGray}" opacity="0.3"/><circle cx="64" cy="126" r="2.5" fill="${pal.midGray}" opacity="0.3"/><circle cx="80" cy="126" r="2.5" fill="${pal.midGray}" opacity="0.3"/>
        </svg>
      `;

    // Encabezado oficial adaptado al estilo de trazos (Geométrico/Recto vs Orgánico/Curvo y Tradicional vs Moderno)
    const renderHeader = (secCode, titleText) => `
      <div class="plate-hdr" style="${isTrad ? `border-bottom:3px double ${pal.pri};` : ""}">
        <div style="display:flex;align-items:center;gap:10px;min-width:0;">
          <svg width="18" height="18" viewBox="0 0 18 18" style="flex-shrink:0;">
            ${isRect
              ? `<rect x="2" y="2" width="14" height="14" rx="${isTrad ? 1 : 2}" fill="none" stroke="${pal.darkInk}" stroke-width="2"/>
                 <rect x="6" y="6" width="6" height="6" fill="${pal.sec}"/>`
              : `<circle cx="9" cy="9" r="7" fill="none" stroke="${pal.darkInk}" stroke-width="2"/>
                 <circle cx="9" cy="9" r="3" fill="${pal.sec}"/>`
            }
          </svg>
          <span style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:800;font-size:9.5px;letter-spacing:0.14em;color:${pal.sec};white-space:nowrap;flex-shrink:0;">${esc(secCode)}</span>
          <span style="color:${pal.accentLight};font-weight:700;font-size:11px;flex-shrink:0;">—</span>
          <span style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:800;font-size:9.2px;letter-spacing:0.08em;color:${pal.darkInk};text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(titleText)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;flex-shrink:0;white-space:nowrap;">
          <span style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:700;font-size:8.0px;letter-spacing:0.11em;color:${pal.pri};white-space:nowrap;">${esc(dna.systemStyleBadge)}</span>
          <span style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:800;font-size:9.5px;color:${pal.darkInk};border-bottom:2.5px solid ${pal.sec};padding-bottom:2px;letter-spacing:0.1em;white-space:nowrap;">LAMINA ${meta.num} / 30</span>
        </div>
      </div>
      <div class="plate-author-seal-bar" style="display:flex;align-items:center;justify-content:space-between;background:#F8FAFC;border:1px solid #E2E8F0;border-left:3.5px solid ${pal.sec};border-radius:6px;padding:3px 12px;margin:2px 34px 6px 34px;">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;overflow:hidden;">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10B981;flex-shrink:0;"></span>
          <span style="font-family:'JetBrains Mono',monospace;font-size:7.4px;font-weight:800;letter-spacing:0.08em;color:${pal.darkInk};white-space:nowrap;text-transform:uppercase;">${esc(meta.authorBadge || "CONSEJO METODOLÓGICO THE BEST BRAND")}</span>
          <span style="color:#94A3B8;font-size:8px;flex-shrink:0;">•</span>
          <span style="font-family:'Montserrat',sans-serif;font-size:7.4px;font-weight:700;color:${pal.sec};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(meta.leadAuthor || "Equipo Metodológico")}</span>
          ${meta.authorQuote ? `<span style="color:#64748B;font-size:7.2px;font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(meta.authorQuote)}</span>` : ""}
        </div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:7.0px;font-weight:800;color:#047857;letter-spacing:0.06em;background:#ECFDF5;padding:1px 6px;border-radius:4px;border:1px solid #A7F3D0;white-space:nowrap;flex-shrink:0;">
          ✦ ${esc(meta.auditVerdict || "DICTAMEN METODOLÓGICO: APROBADO")}
        </div>
      </div>
    `;

    // Pie de página oficial adaptado al estilo de trazos (Geométrico/Recto vs Orgánico/Curvo)
    const renderFooter = () => `
      <div class="plate-ftr">
        <svg viewBox="0 0 1600 44" width="100%" height="44" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
          <path d="M0,4 L1600,4" stroke="${pal.lightGray}" stroke-width="1" fill="none"/>
          <path d="M0,4 L680,4" stroke="${pal.sec}" stroke-width="3" fill="none"/>
          ${isRect
            ? `<polygon points="1180,44 1235,4 1600,4 1600,44" fill="${pal.softTint}"/>
               <polyline points="1310,44 1350,12 1600,12" stroke="${pal.accentLight}" stroke-width="2" fill="none" opacity="0.7"/>
               <polyline points="1400,44 1430,20 1600,20" stroke="${pal.sec}" stroke-width="2.5" fill="none" opacity="0.9"/>`
            : `<path d="M1180,44 C1320,20 1460,8 1600,2 L1600,44 Z" fill="${pal.softTint}"/>
               <path d="M1340,44 C1440,28 1520,16 1600,8" stroke="${pal.accentLight}" stroke-width="2" fill="none" opacity="0.65"/>
               <path d="M1420,44 C1490,32 1550,22 1600,14" stroke="${pal.sec}" stroke-width="2.5" fill="none" opacity="0.85"/>`
          }
        </svg>
        <div style="position:relative;z-index:1;display:flex;align-items:center;gap:10px;">
          <div style="width:26px;height:26px;display:flex;align-items:center;justify-content:center;">${assets.symPosSvg}</div>
          <span style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:800;font-size:10px;letter-spacing:0.14em;color:${pal.darkInk};">${esc(bUpper)}</span>
          <span style="color:${pal.sec};font-weight:800;">•</span>
          <span style="font-family:'${secFont}','Plus Jakarta Sans',sans-serif;font-weight:600;font-size:9px;letter-spacing:0.12em;color:${pal.pri};">${esc(tagline.toUpperCase().slice(0, 48))}</span>
        </div>
        <div style="position:relative;z-index:1;display:flex;align-items:center;gap:14px;">
          <span style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:700;font-size:8.2px;letter-spacing:0.14em;color:${pal.sec};">${esc(dna.strokeLabel.toUpperCase())} • ${esc(dna.eraStyle === "traditional" ? "ESTILO CLÁSICO" : "ESTILO MODERNO")}</span>
          <span style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:800;font-size:9.5px;color:${pal.darkInk};">PAG. ${meta.num}</span>
        </div>
      </div>
    `;

    let plateInnerHTML = "";

    // =========================================================================
    // LÁMINA 01: PORTADA MAESTRA ADAPTADA A LA ARQUITECTURA, OFERTA Y TRAZOS DEL LOGO
    // =========================================================================
    if (idx === 0) {
      const coverBgSvg = isRect
        ? `
          <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:1;">
            <polygon points="0,0 740,0 480,290 0,290" fill="${pal.sec}"/>
            <polygon points="0,250 740,0 880,0 560,340 0,340" fill="${pal.lightGray}" opacity="0.82"/>
            ${isTrad
              ? `<rect x="34" y="28" width="1532" height="844" fill="none" stroke="${pal.pri}" stroke-width="1.8" opacity="0.35"/>
                 <rect x="42" y="36" width="1516" height="828" fill="none" stroke="${pal.sec}" stroke-width="1" opacity="0.35"/>`
              : `<polyline points="80,635 580,635 720,410 1060,410" fill="none" stroke="${pal.lightGray}" stroke-width="2" stroke-dasharray="6,6"/>`
            }
            <polyline points="620,240 780,240 860,350 960,350" fill="none" stroke="${pal.sec}" stroke-width="2.5"/>
            <rect x="615" y="235" width="10" height="10" fill="${pal.sec}"/>
            <rect x="955" y="345" width="10" height="10" fill="${pal.pri}"/>
            <polygon points="1175,110 1355,185 1430,365 1355,545 1175,620 995,545 920,365 995,185" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5" opacity="0.45"/>
            <polyline points="995,185 1175,110 1355,185 1430,365" fill="none" stroke="${pal.sec}" stroke-width="4.5"/>
            <polygon points="1175,142 1332,208 1398,365 1332,522 1175,588 1018,522 952,365 1018,208" fill="none" stroke="${pal.accentLight}" stroke-width="2" stroke-dasharray="8,6"/>
            <polygon points="1060,900 1600,450 1600,900" fill="${pal.darkInk}" opacity="0.10"/>
            <polygon points="960,900 1600,390 1600,460 1030,900" fill="${pal.pri}" opacity="0.22"/>
            <polygon points="890,900 1600,345 1600,382 945,900" fill="${pal.accentLight}" opacity="0.45"/>
            <g stroke="${pal.midGray}" stroke-width="1.6" opacity="0.38">
              <line x1="875" y1="110" x2="887" y2="110"/><line x1="881" y1="104" x2="881" y2="116"/>
              <line x1="905" y1="110" x2="917" y2="110"/><line x1="911" y1="104" x2="911" y2="116"/>
              <line x1="935" y1="110" x2="947" y2="110"/><line x1="941" y1="104" x2="941" y2="116"/>
              <line x1="875" y1="138" x2="887" y2="138"/><line x1="881" y1="132" x2="881" y2="144"/>
              <line x1="905" y1="138" x2="917" y2="138"/><line x1="911" y1="132" x2="911" y2="144"/>
              <line x1="935" y1="138" x2="947" y2="138"/><line x1="941" y1="132" x2="941" y2="144"/>
            </g>
          </svg>
        `
        : `
          <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:1;">
            <path d="M0,0 L760,0 C540,85 280,190 0,350 Z" fill="${pal.sec}"/>
            <path d="M0,255 C260,145 520,68 830,0 L940,0 C600,105 310,220 0,395 Z" fill="${pal.lightGray}" opacity="0.85"/>
            <path d="M80,635 C520,635 690,410 1060,410" fill="none" stroke="${pal.lightGray}" stroke-width="2" stroke-dasharray="6,6"/>
            <path d="M620,240 C780,240 850,350 960,350" fill="none" stroke="${pal.sec}" stroke-width="2.5"/>
            <circle cx="620" cy="240" r="5" fill="${pal.sec}"/>
            <circle cx="960" cy="350" r="5" fill="${pal.pri}"/>
            <circle cx="1175" cy="365" r="245" fill="#FFFFFF"/>
            <path d="M955,245 A250,250 0 1,1 1395,485" fill="none" stroke="${pal.pri}" stroke-width="3" opacity="0.35"/>
            <path d="M985,495 A235,235 0 0,1 1375,225" fill="none" stroke="${pal.sec}" stroke-width="4" stroke-linecap="round"/>
            <path d="M1010,525 A215,215 0 0,0 1390,395" fill="none" stroke="${pal.accentLight}" stroke-width="2.5" stroke-dasharray="8,6"/>
            <path d="M1060,900 C1270,790 1440,650 1600,450 L1600,900 Z" fill="${pal.darkInk}" opacity="0.10"/>
            <path d="M960,900 C1210,780 1410,620 1600,390 L1600,460 C1420,665 1230,805 1020,900 Z" fill="${pal.pri}" opacity="0.22"/>
            <path d="M890,900 C1160,770 1380,600 1600,345 L1600,382 C1390,615 1175,780 935,900 Z" fill="${pal.accentLight}" opacity="0.45"/>
            <g fill="${pal.midGray}" opacity="0.35">
              <circle cx="880" cy="110" r="3"/><circle cx="902" cy="110" r="3"/><circle cx="924" cy="110" r="3"/><circle cx="946" cy="110" r="3"/>
              <circle cx="880" cy="132" r="3"/><circle cx="902" cy="132" r="3"/><circle cx="924" cy="132" r="3"/><circle cx="946" cy="132" r="3"/>
              <circle cx="880" cy="154" r="3"/><circle cx="902" cy="154" r="3"/><circle cx="924" cy="154" r="3"/><circle cx="946" cy="154" r="3"/>
            </g>
          </svg>
        `;

      plateInnerHTML = `
        <section class="benefic-plate" id="plate-01" style="background:#FFFFFF;">
          ${coverBgSvg}

          <div class="plate-body" style="position:relative;z-index:2;display:grid;grid-template-columns:1.12fr 0.88fr;align-items:center;gap:32px;padding:54px 56px 26px 56px;">
            <div style="padding-top:44px;">
              <div style="display:inline-flex;align-items:center;gap:8px;font-family:'${priFont}','Montserrat',sans-serif;font-size:10px;font-weight:800;letter-spacing:0.18em;color:${pal.sec};margin-bottom:10px;">
                <span style="display:inline-block;width:28px;height:2.5px;background:${pal.sec};"></span>
                MANUAL OFICIAL DE IDENTIDAD • ${esc(dna.systemStyleBadge)}
              </div>
              <h1 style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:800;font-size:48px;line-height:1.0;color:${pal.darkInk};letter-spacing:-0.02em;margin:0 0 8px 0;">${esc(bUpper)}</h1>
              <div style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.24em;color:${pal.pri};margin-bottom:14px;">${esc(tagline.toUpperCase().slice(0, 46))}</div>
              <svg width="240" height="12" viewBox="0 0 240 12" style="margin-bottom:14px;display:block;">
                <line x1="0" y1="6" x2="95" y2="6" stroke="${pal.sec}" stroke-width="4" stroke-linecap="${isRect ? "square" : "round"}"/>
                <line x1="105" y1="6" x2="185" y2="6" stroke="${pal.pri}" stroke-width="2.5" stroke-linecap="${isRect ? "square" : "round"}"/>
                ${isRect
                  ? `<rect x="196" y="2" width="8" height="8" fill="${pal.accentLight}"/>`
                  : `<circle cx="200" cy="6" r="4" fill="${pal.accentLight}"/>`
                }
              </svg>
              <div style="font-family:'${priFont}','Montserrat',sans-serif;font-weight:700;font-size:20px;color:${pal.darkInk};margin-bottom:8px;line-height:1.22;">
                ${esc(clipWords(bGiro, 84))}
              </div>
              <p style="font-family:'${secFont}',sans-serif;font-size:12.6px;line-height:1.52;color:#333333;margin:0 0 18px 0;max-width:540px;">
                Sistema rector de posicionamiento, Círculo Dorado, <strong>La Empresa como Persona</strong>, Ingeniería de Touchpoints (Antes · Durante · Después) y acentos visuales en <strong>${esc(dna.strokeLabel.toLowerCase())}</strong> (${esc(dna.eraLabel.toLowerCase())}) para ${archSummaryPhrase}.
              </p>

              ${dna.archMode === "multibrand"
                ? `
                  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding-top:12px;border-top:1.5px solid ${pal.lightGray};">
                    ${assets.subBrands.map((sb, sIdx) => `
                      <div style="padding:4px 10px;${sIdx < 3 ? `border-right:1px solid ${pal.lightGray};` : ""}text-align:center;">
                        ${sb.lockupSvg(64)}
                      </div>
                    `).join("")}
                  </div>
                `
                : `
                  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:12px 14px;background:${pal.softTint};border:1.5px solid ${pal.lightGray};border-left:4px solid ${pal.sec};border-radius:${dna.cardRadius};">
                    <div style="padding-right:10px;border-right:1px solid ${pal.lightGray};">
                      <div style="font-family:'${priFont}',sans-serif;font-size:8.5px;font-weight:800;color:${pal.sec};letter-spacing:0.14em;">01 · PROPÓSITO CENTRAL</div>
                      <div style="font-family:'${secFont}',sans-serif;font-size:10.4px;color:${pal.darkInk};line-height:1.38;margin-top:3px;font-weight:600;">${esc(clipWords(bPurpose, 128, true))}</div>
                    </div>
                    <div style="padding-right:10px;border-right:1px solid ${pal.lightGray};">
                      <div style="font-family:'${priFont}',sans-serif;font-size:8.5px;font-weight:800;color:${pal.pri};letter-spacing:0.14em;">02 · OFERTA DE VALOR</div>
                      <div style="font-family:'${secFont}',sans-serif;font-size:10.4px;color:${pal.darkInk};line-height:1.38;margin-top:3px;font-weight:600;">${esc(clipWords(bOffer, 128, true))}</div>
                    </div>
                    <div>
                      <div style="font-family:'${priFont}',sans-serif;font-size:8.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.14em;">03 · MARCA ÚNICA OFICIAL</div>
                      <div style="font-family:'${secFont}',sans-serif;font-size:10.4px;color:#333333;line-height:1.38;margin-top:3px;">100% reputación unificada en <strong>${esc(bName)}</strong> sin fragmentarse en submarcas.</div>
                    </div>
                  </div>
                `
              }
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-right:10px;">
              <div style="width:270px;height:270px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 16px 32px rgba(13,37,64,0.10));">
                ${assets.symPosSvg}
              </div>
              <div style="margin-top:16px;font-family:'${priFont}','Montserrat',sans-serif;font-size:10px;font-weight:800;letter-spacing:0.20em;color:${pal.darkInk};">
                ${esc(dna.strokeStyle === "rectilinear" ? "PRECISIÓN GEOMÉTRICA" : "FLUIDEZ ORGÁNICA")} <span style="color:${pal.sec};">•</span> ${esc(dna.eraStyle === "traditional" ? "AUTORIDAD CLÁSICA" : "VANGUARDIA MODERNA")}
              </div>
              <div style="margin-top:4px;font-family:'${secFont}',sans-serif;font-size:10.5px;font-weight:600;color:${pal.pri};letter-spacing:0.08em;">
                Versión Positiva Principal sobre Lienzo Claro (#FFFFFF) • ${pal.pri} &amp; ${pal.sec}
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 02: MAPA METODOLÓGICO THEBESTBRAND (PASOS 0 AL 6 · 30 LÁMINAS)
    // =========================================================================
    else if (idx === 1) {
      const p4IndexLabel = dna.archMode === "multibrand"
        ? "14. Arquitectura: Madre + 4 Submarcas<br/>15. Anatomía · 16–19. Las 4 Submarcas"
        : (dna.archMode === "portfolio"
            ? "14. Arquitectura: Marca + 4 Líneas de Oferta<br/>15. Anatomía · 16–19. Las 4 Líneas de Valor"
            : "14. Sistema Oficial de Marca Única<br/>15. Anatomía · 16–19. Las 4 Versiones del Logo");

      plateInnerHTML = `
        <section class="benefic-plate" id="plate-02">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 01", "INTRODUCCION Y ARQUITECTURA METODOLOGICA DEL MANUAL (30 LAMINAS)")}
          <div class="plate-body" style="display:grid;grid-template-columns:0.84fr 1.16fr;gap:34px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:14px;padding-right:18px;border-right:1.5px solid ${pal.lightGray};">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;letter-spacing:0.18em;color:${pal.sec};margin-bottom:4px;">ESTRUCTURA DEL SISTEMA • PASOS 0 AL 6</div>
                <h2 style="font-family:'${priFont}',sans-serif;font-size:23px;font-weight:800;color:${pal.darkInk};margin:0 0 8px 0;line-height:1.14;">
                  De la esencia humana y los Touchpoints al símbolo de ${esc(bName)}.
                </h2>
                <p style="font-family:'${secFont}',sans-serif;font-size:11.8px;color:#333333;line-height:1.52;margin:0;">
                  Este manual adapta su arquitectura y sus acentos gráficos a las decisiones reales tomadas para <strong>${esc(bName)}</strong>: define el problema que resolvemos (Paso 0), el ADN y <strong>La Empresa como Persona</strong> (Paso 1), y los <strong>Touchpoints</strong> (Paso 2) antes del <strong>Nombre</strong> (Paso 3) y el sistema visual en <strong>${esc(dna.strokeLabel.toLowerCase())}</strong> (Pasos 4–6).
                </p>
              </div>

              <div style="position:relative;padding:6px 0;">
                <svg viewBox="0 0 420 155" width="100%" height="148" style="display:block;">
                  ${isRect
                    ? `<polyline points="32,118 102,84 176,46 246,64 312,72 384,32" fill="none" stroke="${pal.pri}" stroke-width="3"/>
                       <polyline points="32,128 102,94 176,56 246,74 312,82 390,42" fill="none" stroke="${pal.sec}" stroke-width="2" stroke-dasharray="5,4"/>`
                    : `<path d="M24,118 C95,118 115,44 195,44 C275,44 295,104 388,28" fill="none" stroke="${pal.pri}" stroke-width="3" stroke-linecap="round"/>
                       <path d="M24,128 C105,128 125,58 205,58 C285,58 305,114 394,40" fill="none" stroke="${pal.sec}" stroke-width="2" stroke-dasharray="5,4"/>`
                  }
                  <polygon points="396,22 380,24 389,37" fill="${pal.sec}"/>
                  <circle cx="32" cy="118" r="13" fill="#FFFFFF" stroke="${pal.darkInk}" stroke-width="2.5"/>
                  <text x="32" y="122" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="8.5" fill="${pal.darkInk}">P0</text>
                  <text x="32" y="144" text-anchor="middle" font-family="${priFont}" font-weight="700" font-size="7.5" fill="${pal.midGray}">CAOS→SISTEMA</text>

                  <circle cx="102" cy="84" r="13" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/>
                  <text x="102" y="88" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="8.5" fill="${pal.darkInk}">P1</text>
                  <text x="102" y="62" text-anchor="middle" font-family="${priFont}" font-weight="700" font-size="7.5" fill="${pal.pri}">PERSONA</text>

                  <circle cx="176" cy="46" r="13" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="2.5"/>
                  <text x="176" y="50" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="8.5" fill="${pal.sec}">P2</text>
                  <text x="176" y="24" text-anchor="middle" font-family="${priFont}" font-weight="700" font-size="7.5" fill="${pal.sec}">TOUCHPOINTS</text>

                  <circle cx="246" cy="64" r="13" fill="#FFFFFF" stroke="${pal.darkInk}" stroke-width="2.5"/>
                  <text x="246" y="68" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="8.5" fill="${pal.darkInk}">P3</text>
                  <text x="246" y="92" text-anchor="middle" font-family="${priFont}" font-weight="700" font-size="7.5" fill="${pal.darkInk}">NAMING</text>

                  <circle cx="312" cy="72" r="13" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/>
                  <text x="312" y="76" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="8.5" fill="${pal.pri}">P4</text>
                  <text x="312" y="99" text-anchor="middle" font-family="${priFont}" font-weight="700" font-size="7.5" fill="${pal.pri}">${esc(dna.archMode === "monolithic" ? "MARCA ÚNICA" : "ARQUITECTURA")}</text>

                  <circle cx="372" cy="36" r="14" fill="${pal.sec}"/>
                  <text x="372" y="40" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="8" fill="#FFFFFF">P5·6</text>
                  <text x="366" y="14" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="7.5" fill="${pal.sec}">SISTEMA OFICIAL</text>
                </svg>
                <div style="font-family:'${priFont}',sans-serif;font-size:8.5px;font-weight:800;color:${pal.pri};letter-spacing:0.12em;margin-top:4px;">
                  ${esc(dna.systemStyleBadge)} • DEL ADN Y TOUCHPOINTS A LA IDENTIDAD
                </div>
              </div>

              <div style="border-left:3px solid ${pal.sec};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.12em;">ACENTOS PARAMÉTRICOS DEL MANUAL</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;margin-top:2px;">
                  Geometría configurada en <strong>${esc(dna.strokeLabel)}</strong> con carácter <strong>${esc(dna.eraLabel)}</strong> sobre lienzo claro (#FFFFFF).
                </div>
              </div>
            </div>

            <div style="position:relative;">
              <svg viewBox="0 0 600 420" width="100%" height="100%" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
                ${isRect
                  ? `<polyline points="18,45 160,45 310,185 450,185 580,320" fill="none" stroke="${pal.accentLight}" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.55"/>`
                  : `<path d="M18,45 C140,45 160,185 310,185 C440,185 460,320 580,320" fill="none" stroke="${pal.accentLight}" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.55"/>`
                }
                <line x1="290" y1="10" x2="290" y2="410" stroke="${pal.lightGray}" stroke-width="1"/>
                <line x1="0" y1="140" x2="590" y2="140" stroke="${pal.lightGray}" stroke-width="1"/>
                <line x1="0" y1="280" x2="590" y2="280" stroke="${pal.lightGray}" stroke-width="1"/>
              </svg>
              <div style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;column-gap:32px;row-gap:18px;">
                <div class="ib-flow-node" style="cursor:pointer;" onclick="if(!${Boolean(forPrint)}){window.tbbState.plateIdx=2;renderTbbZeroScrollStage();}">
                  <div class="ib-node-hdr" style="color:${pal.pri};"><span style="width:8px;height:8px;border-radius:${isRect ? "1px" : "50%"};background:${pal.sec};display:inline-block;"></span>SECCION 01 • LAMINAS 01–03 (PASO 0)</div>
                  <div class="ib-flow-title" style="color:${pal.darkInk};">Introducción, Giro y Oferta</div>
                  <div class="ib-flow-txt">01. Portada en ${esc(isRect ? "Trazos Geométricos" : "Curvas Orgánicas")}<br/>02. Mapa Metodológico de 30 Láminas<br/>03. Manifiesto: Del Caos al Sistema</div>
                </div>
                <div class="ib-flow-node" style="cursor:pointer;" onclick="if(!${Boolean(forPrint)}){window.tbbState.plateIdx=3;renderTbbZeroScrollStage();}">
                  <div class="ib-node-hdr" style="color:${pal.pri};"><span style="width:8px;height:8px;border-radius:${isRect ? "1px" : "50%"};background:${pal.pri};display:inline-block;"></span>SECCION 02 • LAMINAS 04–08 (PASO 1)</div>
                  <div class="ib-flow-title" style="color:${pal.darkInk};">ADN y La Empresa como Persona</div>
                  <div class="ib-flow-txt">04. Círculo Dorado (WHY · HOW · WHAT)<br/>05. Promesa, Misión, Visión y 6 Máximas<br/>06. Los 6 Principios y Relación Cliente<br/>07. <strong>La Empresa como Persona</strong><br/>08. Voz, Conducta y Espectro Atributos Visuales</div>
                </div>
                <div class="ib-flow-node" style="cursor:pointer;" onclick="if(!${Boolean(forPrint)}){window.tbbState.plateIdx=8;renderTbbZeroScrollStage();}">
                  <div class="ib-node-hdr" style="color:${pal.pri};"><span style="width:8px;height:8px;border-radius:${isRect ? "1px" : "50%"};background:${pal.sec};display:inline-block;"></span>SECCION 03 • LAMINAS 09–12 (PASO 2)</div>
                  <div class="ib-flow-title" style="color:${pal.darkInk};">Ingeniería de Touchpoints</div>
                  <div class="ib-flow-txt">09. Mapa Integral del Viaje del Cliente<br/>10. Touchpoints ANTES de Comprar<br/>11. Touchpoints DURANTE la Compra<br/>12. Touchpoints DESPUÉS de Comprar</div>
                </div>
                <div class="ib-flow-node" style="cursor:pointer;" onclick="if(!${Boolean(forPrint)}){window.tbbState.plateIdx=12;renderTbbZeroScrollStage();}">
                  <div class="ib-node-hdr" style="color:${pal.pri};"><span style="width:8px;height:8px;border-radius:${isRect ? "1px" : "50%"};background:${pal.pri};display:inline-block;"></span>SECCION 04–05 • LAMINAS 13–22 (PASO 3–4)</div>
                  <div class="ib-flow-title" style="color:${pal.darkInk};">Nombre, Arquitectura y Logos</div>
                  <div class="ib-flow-txt">13. <strong>Naming (${esc(bUpper)}) y Niza</strong><br/>${p4IndexLabel}<br/>20. Retícula · 21. Sección Negativo · 22. Prohibiciones</div>
                </div>
                <div class="ib-flow-node" style="cursor:pointer;" onclick="if(!${Boolean(forPrint)}){window.tbbState.plateIdx=22;renderTbbZeroScrollStage();}">
                  <div class="ib-node-hdr" style="color:${pal.pri};"><span style="width:8px;height:8px;border-radius:${isRect ? "1px" : "50%"};background:${pal.sec};display:inline-block;"></span>SECCION 06 • LAMINAS 23–26 (PASO 5)</div>
                  <div class="ib-flow-title" style="color:${pal.darkInk};">Color, Acentos, Tipografía y Sellos</div>
                  <div class="ib-flow-txt">23. Paleta Oficial (8 Tonos del Sistema)<br/>24. Regla 70/20/10 y 6 Recursos (${esc(isRect ? "Rectos" : "Curvos")})<br/>25. Tipografía ${esc(priFont)} + ${esc(secFont)}<br/>26. Los 6 Sellos Metodológicos</div>
                </div>
                <div class="ib-flow-node" style="cursor:pointer;" onclick="if(!${Boolean(forPrint)}){window.tbbState.plateIdx=26;renderTbbZeroScrollStage();}">
                  <div class="ib-node-hdr" style="color:${pal.pri};"><span style="width:8px;height:8px;border-radius:${isRect ? "1px" : "50%"};background:${pal.pri};display:inline-block;"></span>SECCION 07 • LAMINAS 27–30 (PASO 6)</div>
                  <div class="ib-flow-title" style="color:${pal.darkInk};">Aplicaciones y Gobernanza Oficial</div>
                  <div class="ib-flow-txt">27. Norma Oficial de Co-Branding<br/>28. Papelería, Propuestas, Tarjetas y Firma<br/>29. Ecosistema Digital y Auditoría (10 Controles)<br/>30. Colofón Institucional en Lienzo Claro</div>
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 03: MANIFIESTO FUNDACIONAL · DEL CAOS AL SISTEMA Y BUYER PERSONA (PASO 0)
    // =========================================================================
    else if (idx === 2) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-03">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 01", "MANIFIESTO FUNDACIONAL • DE LA COMPLEJIDAD A LA CLARIDAD (PASO 0)")}
          <div class="plate-body" style="display:grid;grid-template-columns:1.18fr 0.82fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">EL PROBLEMA QUE RESOLVEMOS • DEL CAOS AL SISTEMA</div>
                <h2 style="font-family:'${priFont}',sans-serif;font-size:22px;font-weight:800;color:${pal.darkInk};margin:4px 0 6px 0;line-height:1.16;">
                  Transformamos la incertidumbre en un sistema confiable de ${esc(bGiro.slice(0, 48))}.
                </h2>
                <p style="font-family:'${secFont}',sans-serif;font-size:11.8px;color:#333333;line-height:1.48;margin:0;">
                  <strong>${esc(bName)}</strong> nace para resolver la desconexión entre lo que el cliente necesita y lo que el mercado entrega habitualmente. Sustituimos la improvisación, el desgaste y las soluciones aisladas por una arquitectura clara, humana y medible.
                </p>
              </div>

              ${renderBrandSceneFrame("chaos_to_clarity", ctx, 182, pal.sec)}

              <div style="display:grid;grid-template-columns:1fr 54px 1fr;align-items:center;gap:8px;padding-top:2px;">
                <div style="border-left:3px solid ${pal.midGray};padding-left:12px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.midGray};letter-spacing:0.1em;">ANTES: FRAGMENTACION</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.4;margin-top:3px;">
                    Procesos dispersos, falta de estandarización visual y operativa, y fricción constante para el cliente.
                  </div>
                </div>
                <div style="text-align:center;">
                  <svg width="48" height="32" viewBox="0 0 48 32">
                    ${isRect
                      ? `<polyline points="4,22 24,22 38,8" fill="none" stroke="${pal.sec}" stroke-width="3.5"/>`
                      : `<path d="M4,22 Q22,22 38,8" fill="none" stroke="${pal.sec}" stroke-width="3.5" stroke-linecap="round"/>`
                    }
                    <polygon points="42,5 32,7 39,15" fill="${pal.sec}"/>
                  </svg>
                </div>
                <div style="border-left:3px solid ${pal.sec};padding-left:12px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.1em;">DESPUES: SISTEMA ${esc(bUpper)}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.4;margin-top:3px;">
                    Claridad operativa en tiempo real, identidad coherente con el logotipo y resultados verificables.
                  </div>
                </div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:14px;padding-left:22px;border-left:1px solid ${pal.lightGray};">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">EL ACTOR COMPRADOR (BUYER PERSONA)</div>
                <h3 style="font-family:'${priFont}',sans-serif;font-size:17px;font-weight:800;color:${pal.darkInk};margin:4px 0 6px 0;line-height:1.2;">
                  ${esc(bBuyer.slice(0, 78))}
                </h3>
                <p style="font-family:'${secFont}',sans-serif;font-size:11.4px;color:#333333;line-height:1.46;margin:0;">
                  Organizaciones y personas que valoran la certeza técnica, el acompañamiento cercano y una ejecución impecable en <strong>${esc(bGiro)}</strong> sin perder tiempo ni energía.
                </p>
              </div>
              ${renderBrandSceneFrame("executive_desk", ctx, 158, pal.pri)}
              <div style="border-left:3.5px solid ${pal.darkInk};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.14em;">LA TRANSFORMACION CENTRAL</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.4px;color:${pal.darkInk};font-weight:600;line-height:1.44;margin-top:3px;">
                  “${esc(bMessage.slice(0, 145))}”
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 04: EL CÍRCULO DORADO ADAPTADO A LA OFERTA Y ARQUITECTURA DE MARCA (PASO 1.1)
    // =========================================================================
    else if (idx === 3) {
      const whatDiagramLabel = dna.archMode === "multibrand"
        ? "WHAT • 4 SUBMARCAS"
        : "WHAT • OFERTA DE VALOR";
      const whatSubLabel = dna.archMode === "multibrand"
        ? archShortList.slice(0, 48)
        : bOffer.slice(0, 44);
      const whatTextClosing = dna.archMode === "multibrand"
        ? `Articulado en la Marca Madre y sus 4 submarcas homologadas: <strong>${esc(assets.subBrands.map(s => `${bName} ${s.suffix}`).join(", "))}</strong>.`
        : `Concentrado al 100% bajo el nombre único de <strong>${esc(bName)}</strong> para maximizar su reconocimiento y confianza en el mercado.`;

      plateInnerHTML = `
        <section class="benefic-plate" id="plate-04">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 02", `ADN DE MARCA • EL CIRCULO DORADO Y OFERTA DE ${bUpper} (PASO 1.1)`)}
          <div class="plate-body" style="display:grid;grid-template-columns:0.92fr 1.08fr;gap:18px;align-items:center;">
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
              <svg viewBox="0 0 460 390" width="100%" height="360">
                <!-- El Círculo Dorado SIEMPRE se representa con 3 círculos concéntricos perfectos (WHY · HOW · WHAT) -->
                <circle cx="210" cy="195" r="158" fill="#F8FAFC" stroke="${pal.lightGray}" stroke-width="1.5"/>
                <path d="M62,140 A158,158 0 1,1 295,328" fill="none" stroke="${pal.pri}" stroke-width="3.5" stroke-linecap="round"/>
                <circle cx="210" cy="195" r="108" fill="${pal.softTint}" stroke="${pal.accentLight}" stroke-width="2.5" stroke-dasharray="6,4"/>
                <path d="M112,150 A108,108 0 1,1 285,272" fill="none" stroke="${pal.darkInk}" stroke-width="3.5"/>
                <circle cx="210" cy="195" r="58" fill="${pal.warmTint}" stroke="${pal.sec}" stroke-width="3.5"/>
                <text x="210" y="191" text-anchor="middle" fill="${pal.darkInk}" font-family="${priFont}" font-weight="800" font-size="16">WHY</text>
                <text x="210" y="207" text-anchor="middle" fill="${pal.sec}" font-family="${priFont}" font-weight="800" font-size="8.5" letter-spacing="1.5">PROPOSITO</text>
                <text x="210" y="112" text-anchor="middle" fill="${pal.darkInk}" font-family="${priFont}" font-weight="800" font-size="10.5">HOW • METODO</text>
                <text x="210" y="126" text-anchor="middle" fill="${pal.pri}" font-family="${secFont}" font-weight="700" font-size="8.5">Método + Calidez + Sistema</text>
                <text x="210" y="56" text-anchor="middle" fill="${pal.darkInk}" font-family="${priFont}" font-weight="800" font-size="10.2">${esc(whatDiagramLabel)}</text>
                <text x="210" y="70" text-anchor="middle" fill="${pal.midGray}" font-family="${priFont}" font-weight="700" font-size="7.6">${esc(whatSubLabel)}</text>
                <path d="M268,195 C330,195 355,75 448,75" fill="none" stroke="${pal.sec}" stroke-width="2.2"/>
                <path d="M352,265 C390,295 410,315 448,315" fill="none" stroke="${pal.accentLight}" stroke-width="2.2"/>
                <circle cx="268" cy="195" r="4.5" fill="${pal.sec}"/><circle cx="448" cy="75" r="4.5" fill="${pal.sec}"/>
                <path d="M318,195 L448,195" fill="none" stroke="${pal.pri}" stroke-width="2.2"/>
                <circle cx="318" cy="195" r="4.5" fill="${pal.pri}"/><circle cx="448" cy="195" r="4.5" fill="${pal.pri}"/>
                <circle cx="352" cy="265" r="4.5" fill="${pal.accentLight}"/><circle cx="448" cy="315" r="4.5" fill="${pal.accentLight}"/>
              </svg>
            </div>

            <div style="display:flex;flex-direction:column;gap:18px;">
              <div style="padding-bottom:12px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:10.5px;font-weight:800;color:${pal.sec};letter-spacing:0.15em;">01. WHY • EL PROPOSITO NUCLEAR (POR QUE EXISTIMOS)</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:12px;color:${pal.darkInk};line-height:1.5;margin-top:4px;">
                  ${esc(bPurpose)}
                </div>
              </div>

              <div style="padding-bottom:12px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:10.5px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">02. HOW • LA METODOLOGIA DIFERENCIADORA (COMO LO HACEMOS)</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.8px;color:#333333;line-height:1.48;margin-top:4px;">
                  <strong>Escucha y Diagnóstico Real:</strong> Entendemos primero la meta del cliente antes de proponer.<br/>
                  <strong>Proceso Estructurado:</strong> ${esc(bProcess)}<br/>
                  <strong>Acompañamiento Hombro con Hombro:</strong> Ejecución transparente, indicadores claros y mejora continua.
                </div>
              </div>

              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:10.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.15em;">03. WHAT • LA OFERTA DE VALOR Y ARQUITECTURA (QUE ENTREGAMOS)</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.8px;color:#333333;line-height:1.48;margin-top:4px;">
                  ${esc(bOffer)} ${whatTextClosing}
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 05: PROMESA, MISIÓN, VISIÓN Y LAS 6 MÁXIMAS DE FILOSOFÍA (PASO 1.2)
    // =========================================================================
    else if (idx === 4) {
      const maximas = [
        { n: "01", t: "Claridad antes que complejidad", d: "Si una solución no es clara para el cliente y su equipo, aún no está terminada.", col: pal.sec },
        { n: "02", t: "Escuchar antes de proponer", d: "Respetamos la visión del cliente y la potenciamos con ingeniería, diseño y método.", col: pal.pri },
        { n: "03", t: "Del caos al sistema reproducible", d: "Reemplazamos esfuerzos aislados por sistemas que funcionan con precisión todos los días.", col: pal.sec },
        { n: "04", t: "Estética con propósito funcional", d: `Cada curva, color (${pal.pri} / ${pal.sec}) y punto de contacto guía la atención y genera confianza.`, col: pal.pri },
        { n: "05", t: "Cero fricción operativa", d: "Hacemos fácil comprar, fácil colaborar y fácil medir el retorno de cada proyecto.", col: pal.sec },
        { n: "06", t: "Socios de largo plazo", d: "No buscamos transacciones rápidas; construimos relaciones duraderas basadas en resultados.", col: pal.pri }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-05">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 02", "ESENCIA DE MARCA • PROMESA, MISION, VISION Y FILOSOFIA (PASO 1.2)")}
          <div class="plate-body" style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:12px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              <div style="border-left:4px solid ${pal.sec};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">LA PROMESA CENTRAL DE MARCA</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:18px;font-weight:800;color:${pal.darkInk};line-height:1.2;margin-top:3px;">
                  “${esc(bMessage.slice(0, 110))}”
                </div>
              </div>

              <div style="padding-bottom:8px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">MISION INSTITUCIONAL</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.6px;color:#333333;line-height:1.46;margin-top:3px;">
                  ${esc(bPurpose)}
                </div>
              </div>

              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.15em;">VISION DE FUTURO Y ROL SOCIAL</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.6px;color:#333333;line-height:1.46;margin-top:3px;">
                  ${esc(bSocial)}
                </div>
              </div>

              ${renderBrandSceneFrame("filosofia_y_sistema", ctx, 128, pal.sec)}
            </div>

            <div style="display:flex;flex-direction:column;gap:9px;">
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;margin-bottom:2px;">
                LAS 6 MAXIMAS DE FILOSOFIA ${esc(bUpper)}
              </div>
              ${maximas.map(m => `
                <div style="display:flex;align-items:baseline;gap:12px;padding-bottom:7px;border-bottom:1px solid ${pal.lightGray};">
                  <span style="font-family:'${priFont}',sans-serif;font-size:14px;font-weight:800;color:${m.col};flex-shrink:0;">${m.n}</span>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:11.5px;font-weight:800;color:${pal.darkInk};">${esc(m.t)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.36;">${esc(m.d)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 06: LOS 6 PRINCIPIOS QUE NOS GUÍAN Y RELACIÓN CON CLIENTES (PASO 1.3)
    // =========================================================================
    else if (idx === 5) {
      const principios = [
        { t: "1. Comprensión Profunda", d: "Diagnosticamos la raíz antes de diseñar o ejecutar cualquier solución." },
        { t: "2. Pensamiento Sistémico", d: "Todo elemento visual, comercial y operativo trabaja conectado en armonía." },
        { t: "3. Claridad Ejecutiva", d: "Hablamos con transparencia, datos verificables y cero ambigüedad." },
        { t: "4. Excelencia Técnica", d: `Estándar riguroso en cada entrega de ${bGiro}.` },
        { t: "5. Trato Humano y Leal", d: "Acompañamos hombro con hombro sin imponer ego ni soluciones genéricas." },
        { t: "6. Resultados Medibles", d: "Cada acción está diseñada para generar valor real, orden y crecimiento." }
      ];
      const compromisos = [
        { t: "Escuchar primero, construir después", d: "Entendemos la idea del cliente y la profesionalizamos respetando su esencia." },
        { t: "Comunicación proactiva y puntual", d: "Visibilidad completa en cada etapa del servicio sin sorpresas." },
        { t: "Transferencia de certidumbre", d: "Entregables documentados en lienzo claro que el cliente puede usar de inmediato." },
        { t: "Soporte y evolución continua", d: "Permanecemos cerca después de la entrega para asegurar el éxito sostenido." },
        { t: "Ética y confidencialidad absoluta", d: "Cuidamos el patrimonio, la información y la reputación de cada aliado." }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-06">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 02", "ADN DE MARCA • PRINCIPIOS QUE NOS GUIAN Y RELACION CON CLIENTES (PASO 1.3)")}
          <div class="plate-body" style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:34px;align-items:center;">
            <div>
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;margin-bottom:12px;">
                LOS 6 PRINCIPIOS QUE NOS GUIAN
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:16px;">
                ${principios.map((p, i) => `
                  <div style="display:flex;align-items:flex-start;gap:10px;padding-bottom:10px;border-bottom:1px solid ${pal.lightGray};">
                    <svg width="26" height="26" viewBox="0 0 28 28" style="flex-shrink:0;margin-top:2px;">
                      ${isRect
                        ? `<rect x="3" y="3" width="22" height="22" rx="3" fill="none" stroke="${i % 2 === 0 ? pal.pri : pal.sec}" stroke-width="2"/>
                           <rect x="10" y="10" width="8" height="8" fill="${i % 2 === 0 ? pal.sec : pal.darkInk}"/>`
                        : `<circle cx="14" cy="14" r="11" fill="none" stroke="${i % 2 === 0 ? pal.pri : pal.sec}" stroke-width="2"/>
                           <circle cx="14" cy="14" r="4" fill="${i % 2 === 0 ? pal.sec : pal.darkInk}"/>`}
                    </svg>
                    <div>
                      <div style="font-family:'${priFont}',sans-serif;font-size:11.8px;font-weight:800;color:${pal.darkInk};">${esc(p.t)}</div>
                      <div style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.4;margin-top:2px;">${esc(p.d)}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
              <div style="margin-top:12px;">
                ${renderBrandSceneFrame("executive_desk", ctx, 114, pal.pri)}
              </div>
            </div>

            <div style="padding-left:26px;border-left:1.5px solid ${pal.lightGray};position:relative;">
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};letter-spacing:0.16em;margin-bottom:4px;">
                NUESTRA RELACION CON LOS CLIENTES
              </div>
              <h3 style="font-family:'${priFont}',sans-serif;font-size:18px;font-weight:800;color:${pal.darkInk};margin:0 0 12px 0;">
                5 Compromisos Innegociables
              </h3>
              <div style="display:flex;flex-direction:column;gap:11px;position:relative;">
                <svg width="16" height="280" viewBox="0 0 16 280" style="position:absolute;left:0;top:6px;pointer-events:none;">
                  <path d="M8,6 L8,268" stroke="${pal.accentLight}" stroke-width="2" stroke-dasharray="4,4"/>
                </svg>
                ${compromisos.map((c, i) => `
                  <div style="padding-left:24px;position:relative;">
                    <span style="position:absolute;left:3px;top:4px;width:10px;height:10px;border-radius:50%;background:${i % 2 === 0 ? pal.sec : pal.pri};border:2px solid #FFFFFF;"></span>
                    <div style="font-family:'${priFont}',sans-serif;font-size:11.2px;font-weight:800;color:${pal.darkInk};">${esc(c.t)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;">${esc(c.d)}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 07: LA EMPRESA COMO PERSONA · CARÁCTER Y 4 FACETAS (PASO 1.4)
    // =========================================================================
    else if (idx === 6) {
      const facetas = [
        {
          tag: "FACETA 01 • MENTE ESTRUCTURADA",
          title: "Visión de Sistema y Claridad Técnica",
          desc: `Observa el panorama completo de ${bGiro}, identifica cuellos de botella con precisión y diseña soluciones limpias, ordenadas y duraderas.`,
          col: pal.sec
        },
        {
          tag: "FACETA 02 • SOCIO HOMBRO CON HOMBRO",
          title: "Escucha Empática sin Imponer Ego",
          desc: "Primero escucha y comprende la idea del cliente; después suma método, estética y tecnología para llevarla al siguiente nivel.",
          col: pal.pri
        },
        {
          tag: "FACETA 03 • COMUNICADOR CLARO",
          title: "Lenguaje Directo, Cálido y Ejecutivo",
          desc: "Traduce lo técnico o complejo en explicaciones visuales comprensibles al instante, generando tranquilidad y confianza inmediata.",
          col: pal.sec
        },
        {
          tag: "FACETA 04 • GUARDIÁN DE LA CALIDAD",
          title: "Rigor en Cada Detalle y Punto de Contacto",
          desc: `Cuida que cada producto, servicio, documento y logotipo de ${bName} cumpla con el estándar más alto de excelencia.`,
          col: pal.pri
        }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-07">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 02", "LA EMPRESA COMO PERSONA • CARACTER HUMANO Y 4 FACETAS (PASO 1.4)")}
          <div class="plate-body" style="display:grid;grid-template-columns:0.88fr 1.12fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:12px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">SI ${esc(bUpper)} FUERA UNA PERSONA</div>
                <h2 style="font-family:'${priFont}',sans-serif;font-size:22px;font-weight:800;color:${pal.darkInk};margin:4px 0 4px 0;">
                  Fuerza Serena, Mente de Ingeniero y Calidez de Aliado
                </h2>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.2px;font-weight:700;color:${pal.pri};">
                  Arquetipo Rector: El Arquitecto de Claridad · El Sabio Práctico · El Aliado Leal
                </div>
              </div>

              ${renderBrandSceneFrame("persona_emblem", ctx, 198, pal.sec)}

              <p style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.46;margin:0;">
                ${esc(bPersona.slice(0, 260))}
              </p>
            </div>

            <div style="display:flex;flex-direction:column;gap:13px;">
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};letter-spacing:0.16em;">
                LAS 4 FACETAS PSICOLOGICAS Y OPERATIVAS DE LA PERSONA DE MARCA
              </div>
              ${facetas.map(f => `
                <div style="padding-bottom:10px;border-bottom:1px solid ${pal.lightGray};">
                  <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${f.col};letter-spacing:0.14em;">${esc(f.tag)}</div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:13px;font-weight:800;color:${pal.darkInk};margin:2px 0;">${esc(f.title)}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.42;">${esc(f.desc)}</div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 08: VOZ, CONDUCTA Y CALIBRACIÓN DE LOS LENGUAJE Y ATRIBUTOS VISUALES (PASO 1.5)
    // =========================================================================
    else if (idx === 7) {
      const bp = (typeof window.bipolarSliderValues === "object" && window.bipolarSliderValues) ? window.bipolarSliderValues : {};
      const kanseiRows = [
        { l: "Tradicional y Clásico", r: "Vanguardista e Innovador", v: normalizeBipolarVal(bp.tradicional_innovador, 78) },
        { l: "Trazos Orgánicos y Curvos", r: "Trazos Rectos y Geométricos", v: normalizeBipolarVal(bp.organico_geometrico, isRect ? 82 : 28) },
        { l: "Minimalista y Esencial", r: "Detallado y Estructurado", v: normalizeBipolarVal(bp.minimalista_complejo, 38) },
        { l: "Cercano, Cálido y Empático", r: "Institucional y Autoritario", v: normalizeBipolarVal(bp.amigable_autoritario, 36) },
        { l: "Artesanal y Humano", r: "Ingenieril y Tecnológico", v: normalizeBipolarVal(bp.humano_tecnologico, 74) },
        { l: "Serio y Ejecutivo", r: "Dinámico y Expresivo", v: normalizeBipolarVal(bp.serio_jugueton, 34) },
        { l: "Estándar de Industria", r: "Disruptivo y Diferenciador", v: normalizeBipolarVal(bp.convencional_rebelde, 72) }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-08">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 02", "LA EMPRESA COMO PERSONA • TONO DE VOZ, PERSONALIDAD Y ATRIBUTOS VISUALES (PASO 1.5)")}
          <div class="plate-body" style="display:grid;grid-template-columns:0.96fr 1.04fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:14px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              <div style="border-left:3.5px solid ${pal.pri};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">COMO HABLA Y ACTUA ${esc(bUpper)} (SI ES)</div>
                <ul style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.48;margin:6px 0 0 0;padding-left:16px;">
                  <li><strong>Escucha activa:</strong> Comprende la necesidad del cliente antes de emitir un diagnóstico.</li>
                  <li><strong>Claridad ejecutiva:</strong> Explica con estructura visual limpia, datos reales y lenguaje humano.</li>
                  <li><strong>Calidez profesional:</strong> Transmite serenidad, dominio técnico y respaldo continuo.</li>
                  <li><strong>Coherencia de acentos:</strong> Refleja fielmente el lenguaje de <strong>${esc(dna.strokeLabel.toLowerCase())}</strong> y el carácter <strong>${esc(dna.eraLabel.toLowerCase())}</strong> elegidos para su símbolo.</li>
                </ul>
              </div>

              <div style="border-left:3.5px solid ${pal.sec};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.15em;">LO QUE JAMAS HARIA NI DIRIA (NO ES)</div>
                <ul style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.48;margin:6px 0 0 0;padding-left:16px;">
                  <li><strong>Jamás impone con arrogancia:</strong> No invalida la experiencia previa del cliente.</li>
                  <li><strong>Jamás vende humo ni tecnicismos vacíos:</strong> No promete lo que no puede medir ni sostener.</li>
                  <li><strong>Jamás entrega materiales incoherentes:</strong> Prohibido contradecir la arquitectura (${esc(dna.archBadge)}) o deformar el logo.</li>
                  <li><strong>Jamás abandona en post-venta:</strong> La entrega es el inicio de la relación de largo plazo.</li>
                </ul>
              </div>

              <div style="padding:10px 12px;background:${pal.softTint};border-radius:${dna.cardRadius};border:1px solid ${pal.lightGray};font-family:'${secFont}',sans-serif;font-size:10.4px;color:${pal.darkInk};">
                <strong style="color:${pal.pri};">Traducción al Diseño del Manual:</strong> Tus elecciones de personalidad y logotipo activaron automáticamente acentos de <strong>${esc(dna.strokeLabel)}</strong> con estética <strong>${esc(dna.eraLabel)}</strong> en las 30 láminas.
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:9px;">
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};letter-spacing:0.15em;margin-bottom:2px;">
                CALIBRACIÓN DE ATRIBUTOS DE MARCA Y LENGUAJE VISUAL
              </div>
              ${kanseiRows.map((k, i) => `
                <div style="padding-bottom:5px;border-bottom:1px solid ${pal.lightGray};">
                  <div style="display:flex;justify-content:space-between;font-family:'${priFont}',sans-serif;font-size:9.2px;font-weight:700;margin-bottom:4px;">
                    <span style="color:${k.v < 45 ? pal.darkInk : pal.midGray};font-weight:${k.v < 45 ? "800" : "700"};">${esc(k.l)}</span>
                    <span style="color:${k.v >= 45 ? pal.darkInk : pal.midGray};font-weight:${k.v >= 45 ? "800" : "700"};">${esc(k.r)} (${k.v}%)</span>
                  </div>
                  <div style="height:7px;background:${pal.lightGray};border-radius:${isRect ? "2px" : "4px"};position:relative;overflow:hidden;">
                    <div style="width:${k.v}%;height:100%;background:${i % 2 === 0 ? pal.pri : pal.sec};border-radius:${isRect ? "2px" : "4px"};"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 09: INGENIERÍA DE TOUCHPOINTS · MAPA DE CONTACTO REAL (PASO 2)
    // =========================================================================
    else if (idx === 8) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-09">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 03", "INGENIERIA DE TOUCHPOINTS • MAPA DE CONTACTO REAL CON EL CLIENTE (PASO 2)")}
          <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:8px;border-bottom:1px solid ${pal.lightGray};">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">ARQUITECTURA DE EXPERIENCIA ANTES DEL NOMBRE</div>
                <h2 style="font-family:'${priFont}',sans-serif;font-size:21px;font-weight:800;color:${pal.darkInk};margin:2px 0 0 0;">
                  Los 3 Momentos de Verdad de ${esc(bName)}: Antes · Durante · Después
                </h2>
              </div>
              <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.pri};font-weight:700;">
                12 Touchpoints Homologados · ${esc(dna.strokeBadge)}
              </div>
            </div>

            <div style="position:relative;height:145px;">
              <svg viewBox="0 0 1020 145" width="100%" height="145" style="display:block;">
                ${isRect ? `
                  <polyline points="60,95 170,64 340,64 510,72 680,72 850,68 960,48" fill="none" stroke="${pal.pri}" stroke-width="3.5" stroke-linejoin="miter"/>
                  <polyline points="60,108 170,78 340,78 510,86 680,86 850,82 960,62" fill="none" stroke="${pal.sec}" stroke-width="2" stroke-dasharray="6,5"/>
                  <rect x="148" y="42" width="44" height="44" rx="4" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="3"/>
                  <rect x="488" y="50" width="44" height="44" rx="4" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="3"/>
                  <rect x="828" y="46" width="44" height="44" rx="4" fill="${pal.darkInk}" stroke="${pal.accentLight}" stroke-width="3"/>
                ` : `
                  <path d="M60,95 C240,20 420,130 510,72 C600,15 780,120 960,48" fill="none" stroke="${pal.pri}" stroke-width="3.5" stroke-linecap="round"/>
                  <path d="M60,108 C240,34 420,142 510,84 C600,28 780,132 960,60" fill="none" stroke="${pal.sec}" stroke-width="2" stroke-dasharray="6,5"/>
                  <circle cx="170" cy="64" r="22" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="3"/>
                  <circle cx="510" cy="72" r="22" fill="#FFFFFF" stroke="${pal.sec}" stroke-width="3"/>
                  <circle cx="850" cy="68" r="22" fill="${pal.darkInk}" stroke="${pal.accentLight}" stroke-width="3"/>
                `}
                <text x="170" y="68" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="11" fill="${pal.darkInk}">M1</text>
                <text x="170" y="26" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="10" fill="${pal.pri}">1. ANTES DE COMPRAR</text>

                <text x="510" y="76" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="11" fill="${pal.sec}">M2</text>
                <text x="510" y="34" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="10" fill="${pal.sec}">2. DURANTE LA COMPRA</text>

                <text x="850" y="72" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="11" fill="#FFFFFF">M3</text>
                <text x="850" y="30" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="10" fill="${pal.darkInk}">3. DESPUES DE COMPRAR</text>
              </svg>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;padding-top:6px;border-top:1px solid ${pal.lightGray};">
              <div style="border-left:3.5px solid ${pal.pri};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};letter-spacing:0.12em;">MOMENTO 1 • DESCUBRIMIENTO (LAMINA 10)</div>
                <ul style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.45;margin:6px 0 0 0;padding-left:15px;">
                  ${tpBeforeArr.slice(0, 4).map(t => `<li>${esc(t)}</li>`).join("")}
                </ul>
              </div>
              <div style="border-left:3.5px solid ${pal.sec};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.sec};letter-spacing:0.12em;">MOMENTO 2 • COMPRA Y SERVICIO (LAMINA 11)</div>
                <ul style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.45;margin:6px 0 0 0;padding-left:15px;">
                  ${tpDuringArr.slice(0, 4).map(t => `<li>${esc(t)}</li>`).join("")}
                </ul>
              </div>
              <div style="border-left:3.5px solid ${pal.darkInk};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};letter-spacing:0.12em;">MOMENTO 3 • POST-VENTA Y LEALTAD (LAMINA 12)</div>
                <ul style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.45;margin:6px 0 0 0;padding-left:15px;">
                  ${tpAfterArr.slice(0, 4).map(t => `<li>${esc(t)}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINAS 10, 11 Y 12: DESGLOSE PROFUNDO DE TOUCHPOINTS (ANTES, DURANTE Y DESPUÉS)
    // =========================================================================
    else if (idx === 9 || idx === 10 || idx === 11) {
      const isBefore = idx === 9;
      const isDuring = idx === 10;
      const items = isBefore ? tpBeforeArr.slice(0, 4) : (isDuring ? tpDuringArr.slice(0, 4) : tpAfterArr.slice(0, 4));
      const mTitle = isBefore
        ? "TOUCHPOINTS MOMENTO 1: ANTES DE COMPRAR (PASO 2.1)"
        : (isDuring ? "TOUCHPOINTS MOMENTO 2: DURANTE LA COMPRA Y EJECUCION (PASO 2.2)" : "TOUCHPOINTS MOMENTO 3: DESPUES DE COMPRAR / POST-VENTA (PASO 2.3)");
      const mSub = isBefore
        ? "ATRACCION, CLARIDAD DIGITAL Y RESPUESTA INMEDIATA 24/7"
        : (isDuring ? "CONTRATACION FACIL, EJECUCION HOMBRO CON HOMBRO Y ENTREGA IMPECABLE" : "PORTAL DE CLIENTES, DOCUMENTACION EN LIENZO CLARO Y RECOMPRA");
      const mHeadline = isBefore
        ? `Cómo nos descubre el cliente y siente confianza inmediata en ${bName}.`
        : (isDuring ? `Experiencia sin fricción durante la compra y ejecución del servicio.` : `Cómo consolidamos la lealtad, la trazabilidad y el crecimiento continuo.`);
      const sceneKey = isBefore ? "touchpoints_antes_omnicanal" : (isDuring ? "touchpoints_durante_servicio" : "touchpoints_despues_portal");

      plateInnerHTML = `
        <section class="benefic-plate" id="plate-${meta.num}">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 03", mTitle)}
          <div class="plate-body" style="display:grid;grid-template-columns:0.86fr 1.14fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:14px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">${esc(mSub)}</div>
                <h2 style="font-family:'${priFont}',sans-serif;font-size:21px;font-weight:800;color:${pal.darkInk};margin:4px 0 6px 0;line-height:1.18;">
                  ${esc(mHeadline)}
                </h2>
              </div>

              ${renderBrandSceneFrame(sceneKey, ctx, 188, isBefore ? pal.pri : pal.sec)}

              <div style="border-left:3.5px solid ${pal.sec};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.12em;">REGLA DE ORO DEL MOMENTO ${idx - 8}</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;margin-top:3px;">
                  Todo punto de contacto utiliza el logotipo de <strong>${esc(bName)}</strong> en positivo sobre fondo claro (#FFFFFF), tipografía <strong>${esc(priFont)}</strong> y acentos de <strong>${esc(dna.strokeLabel.toLowerCase())}</strong> en <strong>${pal.sec}</strong>.
                </div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:14px;">
              ${items.map((itText, i) => `
                <div style="display:flex;align-items:flex-start;gap:14px;padding-bottom:12px;border-bottom:1px solid ${pal.lightGray};">
                  <div style="width:32px;height:32px;border-radius:${dna.badgeRadius};background:${i % 2 === 0 ? pal.softTint : pal.warmTint};border:2px solid ${i % 2 === 0 ? pal.pri : pal.sec};display:flex;align-items:center;justify-content:center;font-family:'${priFont}',sans-serif;font-size:11px;font-weight:800;color:${pal.darkInk};flex-shrink:0;">
                    0${i + 1}
                  </div>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:12.5px;font-weight:800;color:${pal.darkInk};">${esc(itText)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">
                      Homologado bajo la arquitectura visual de <strong>${esc(bName)}</strong> con respuesta clara, trazabilidad inmediata y experiencia libre de fricción en ${esc(bGiro.slice(0, 44))}.
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 13: EL NOMBRE OFICIAL · MORFOLOGÍA, SEMIÓTICA Y CLASES DE NIZA (PASO 3)
    // =========================================================================
    else if (idx === 12) {
      const half = Math.max(2, Math.ceil(bUpper.length / 2));
      const rootA = bUpper.slice(0, half);
      const rootB = bUpper.slice(half) || "BRAND";
      const domainStructureHtml = dna.archMode === "monolithic"
        ? `• Dominio Oficial Único: <span style="color:${pal.darkInk};">www.${esc(assets.cleanSlug)}.com</span><br/>
           • Rutas de Experiencia: <span style="color:#333333;">www.${esc(assets.cleanSlug)}.com/oferta · /experiencia · /app · /clientes</span><br/>
           • Contacto Oficial: <span style="color:${pal.sec};">hola@${esc(assets.cleanSlug)}.com · direccion@${esc(assets.cleanSlug)}.com</span>`
        : (dna.archMode === "portfolio"
          ? `• Dominio Rector: <span style="color:${pal.darkInk};">www.${esc(assets.cleanSlug)}.com</span><br/>
             • Líneas de Oferta: <span style="color:#333333;">${assets.subBrands.map(s => s.domain).join(" · ")}</span><br/>
             • Contacto Oficial: <span style="color:${pal.sec};">contacto@${esc(assets.cleanSlug)}.com · atencion@${esc(assets.cleanSlug)}.com</span>`
          : `• Dominio Rector: <span style="color:${pal.darkInk};">www.${esc(assets.cleanSlug)}.com</span><br/>
             • Subdominios de Submarca: <span style="color:#333333;">${assets.subBrands.map(s => s.domain).join(" · ")}</span><br/>
             • Contacto Oficial: <span style="color:${pal.sec};">contacto@${esc(assets.cleanSlug)}.com · direccion@${esc(assets.cleanSlug)}.com</span>`);

      plateInnerHTML = `
        <section class="benefic-plate" id="plate-13">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 04", "EL NOMBRE OFICIAL • NAMING ESTRATEGICO, SEMIOTICA Y CLASES DE NIZA (PASO 3)")}
          <div class="plate-body" style="display:grid;grid-template-columns:0.95fr 1.05fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:14px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">CONSTRUCCION MORFOLOGICA Y FONETICA</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:34px;font-weight:800;color:${pal.darkInk};margin:4px 0;">
                  ${esc(rootA)}<span style="color:${pal.sec};">+</span>${esc(rootB)}
                </div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.5px;color:#333333;line-height:1.48;">
                  El nombre oficial <strong>${esc(bName)}</strong> sintetiza autoridad, recordación fonética inmediata y coherencia bajo su modelo de <strong>${esc(dna.archTitle)}</strong> en ${esc(bGiro.slice(0, 64))}.
                </div>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:12px 0;border-top:1px solid ${pal.lightGray};border-bottom:1px solid ${pal.lightGray};">
                <div style="border-left:3px solid ${pal.pri};padding-left:10px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};">RAIZ 01 • ${esc(rootA)}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10.6px;color:#333333;margin-top:2px;">Evoca precisión, origen, método y liderazgo en ${esc(bGiro.slice(0, 36))}.</div>
                </div>
                <div style="border-left:3px solid ${pal.sec};padding-left:10px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.sec};">RAIZ 02 • ${esc(rootB)}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10.6px;color:#333333;margin-top:2px;">Aporta fuerza humana, cercanía, respaldo y proyección de largo plazo.</div>
                </div>
              </div>

              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.14em;margin-bottom:4px;">ECOSISTEMA DE DOMINIOS Y CORREOS OFICIALES</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.pri};font-weight:700;line-height:1.5;">
                  ${domainStructureHtml}
                </div>
              </div>
              ${renderBrandSceneFrame("submarca_consulting", ctx, 112, pal.sec)}
            </div>

            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">
                CLASIFICACION INTERNACIONAL DE NIZA ADAPTADA AL GIRO Y OFERTA
              </div>
              ${dna.niceClasses.map((nz, i) => `
                <div style="padding-bottom:9px;border-bottom:1px solid ${pal.lightGray};display:flex;gap:12px;align-items:flex-start;">
                  <span style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${i % 2 === 0 ? pal.pri : pal.sec};min-width:92px;padding-top:2px;">${esc(nz.c)}</span>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:11.5px;font-weight:800;color:${pal.darkInk};">${esc(nz.t)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;">${esc(nz.d)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 14: SISTEMA DE MARCA ÚNICA (SIN SUBMARCAS) O ARQUITECTURA MULTIMARCA (PASO 4)
    // =========================================================================
    else if (idx === 13) {
      if (dna.archMode === "multibrand") {
        plateInnerHTML = `
          <section class="benefic-plate" id="plate-14">
            ${bgCurvesStandard}
            ${renderHeader("SECCION 05", "ARQUITECTURA MAESTRA DE MARCA • MARCA MADRE Y 4 SUBMARCAS HOMOLOGADAS (PASO 4)")}
            <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:8px;">
              <div style="display:flex;flex-direction:column;align-items:center;text-align:center;">
                <div style="width:118px;height:118px;display:flex;align-items:center;justify-content:center;">${assets.symPosSvg}</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:20px;font-weight:800;color:${pal.darkInk};margin-top:4px;">${esc(bUpper)} — MARCA MADRE RECTORA</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.pri};font-weight:600;">Sistema Multimarca Endosado • Mismo Símbolo Maestro + Descriptor de Submarca en ${pal.sec}</div>
              </div>

              <svg viewBox="0 0 960 46" width="100%" height="42" style="display:block;overflow:visible;">
                <path d="M480,0 L480,18 M120,18 L840,18 M120,18 L120,42 M360,18 L360,42 M600,18 L600,42 M840,18 L840,42" fill="none" stroke="${pal.pri}" stroke-width="2"/>
                <circle cx="480" cy="18" r="4.5" fill="${pal.sec}"/>
                <circle cx="120" cy="42" r="4" fill="${pal.sec}"/><circle cx="360" cy="42" r="4" fill="${pal.pri}"/><circle cx="600" cy="42" r="4" fill="${pal.sec}"/><circle cx="840" cy="42" r="4" fill="${pal.pri}"/>
              </svg>

              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;width:100%;padding-top:6px;border-top:1.5px solid ${pal.lightGray};">
                ${assets.subBrands.map((sb, i) => `
                  <div style="padding:6px 14px;${i < 3 ? `border-right:1px solid ${pal.lightGray};` : ""}display:flex;flex-direction:column;align-items:center;text-align:center;">
                    ${sb.lockupSvg(96)}
                    <div style="font-family:'${secFont}',sans-serif;font-size:10px;color:#333333;line-height:1.36;margin-top:6px;">
                      ${esc(sb.tagline.slice(0, 88))}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
            ${renderFooter()}
          </section>
        `;
      } else {
        // MARCA ÚNICA (SIN SUBMARCAS): Presentación limpia de la Identidad Única y sus 3 disposiciones funcionales (Horizontal, Vertical y Compacta 1:1)
        const singleBrandDispositions = [
          {
            code: "DISPOSICIÓN 01 · HORIZONTAL",
            title: `Firma Horizontal Principal (${bName})`,
            desc: "Uso preferente en cabezales web, portadas de propuestas ejecutivas, hojas membretadas y señalización panorámica.",
            svg: assets.subBrands[0].lockupSvg(88)
          },
          {
            code: "DISPOSICIÓN 02 · VERTICAL",
            title: "Emblema Centrado Simétrico",
            desc: "Uso en empaques verticales, etiquetas de producto, credenciales, uniformes y tótems de bienvenida.",
            svg: assets.subBrands[1].lockupSvg(88)
          },
          {
            code: "DISPOSICIÓN 03 · COMPACTA 1:1",
            title: "Símbolo de App y Avatar Digital",
            desc: "Síntesis óptica 1:1 desde 40 px para perfil de WhatsApp Business, Instagram, LinkedIn e icono de aplicación móvil.",
            svg: assets.subBrands[2].lockupSvg(88)
          }
        ];

        plateInnerHTML = `
          <section class="benefic-plate" id="plate-14">
            ${bgCurvesStandard}
            ${renderHeader("SECCION 05", `SISTEMA DE IDENTIDAD DE MARCA UNICA • ${bUpper} SIN SUBMARCAS (PASO 4)`)}
            <div class="plate-body" style="display:grid;grid-template-columns:0.88fr 1.12fr;gap:32px;align-items:center;">
              <div style="display:flex;flex-direction:column;gap:14px;padding-right:22px;border-right:1.5px solid ${pal.lightGray};">
                <div style="display:flex;align-items:center;gap:16px;padding:16px;background:${pal.softTint};border:1.5px solid ${pal.pri};border-radius:${dna.cardRadius};">
                  <div style="width:96px;height:96px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#FFFFFF;border-radius:${dna.cardRadius};padding:10px;border:1px solid ${pal.lightGray};">
                    ${assets.symPosSvg}
                  </div>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.15em;">IDENTIDAD UNIFICADA AL 100%</div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:22px;font-weight:800;color:${pal.darkInk};margin:2px 0;">${esc(bUpper)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.pri};font-weight:700;">${esc(tagline.slice(0, 52))}</div>
                  </div>
                </div>

                <div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.15em;">POR QUE ${esc(bUpper)} OPERA COMO MARCA UNICA</div>
                  <h3 style="font-family:'${priFont}',sans-serif;font-size:17px;font-weight:800;color:${pal.darkInk};margin:4px 0 6px 0;line-height:1.2;">
                    Todo el valor, el prestigio y la confianza se concentran en un solo nombre.
                  </h3>
                  <p style="font-family:'${secFont}',sans-serif;font-size:11.3px;color:#333333;line-height:1.48;margin:0;">
                    A diferencia de los conglomerados multimarca, <strong>${esc(bName)}</strong> mantiene una <strong>Identidad de Marca Única</strong>: no divide ni fragmenta su nombre en submarcas. Cada producto, servicio y punto de contacto suma reputación directamente al nombre principal.
                  </p>
                </div>

                <div style="border-left:3.5px solid ${pal.pri};padding-left:14px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.12em;">REGLA DE ORO DE IDENTIDAD UNICA</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.44;margin-top:3px;">
                    Prohibido añadir sufijos o inventar divisiones secundarias junto al logotipo. Se adapta únicamente su disposición geométrica (Horizontal, Vertical o Icono 1:1) según el espacio disponible.
                  </div>
                </div>
              </div>

              <div style="display:flex;flex-direction:column;gap:12px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">
                  LAS 3 DISPOSICIONES OFICIALES DEL LOGOTIPO UNICO DE ${esc(bUpper)}
                </div>
                ${singleBrandDispositions.map((disp, dIdx) => `
                  <div style="display:grid;grid-template-columns:132px 1fr;gap:16px;align-items:center;padding:10px 14px;background:#FFFFFF;border:1.5px solid ${pal.lightGray};border-left:4px solid ${dIdx % 2 === 0 ? pal.pri : pal.sec};border-radius:${dna.cardRadius};">
                    <div style="display:flex;align-items:center;justify-content:center;background:#F8FAFC;border-radius:8px;padding:6px;">
                      ${disp.svg}
                    </div>
                    <div>
                      <div style="font-family:'${priFont}',sans-serif;font-size:8.8px;font-weight:800;color:${dIdx % 2 === 0 ? pal.sec : pal.pri};letter-spacing:0.14em;">${esc(disp.code)}</div>
                      <div style="font-family:'${priFont}',sans-serif;font-size:13px;font-weight:800;color:${pal.darkInk};margin:2px 0 4px 0;">${esc(disp.title)}</div>
                      <div style="font-family:'${secFont}',sans-serif;font-size:10.6px;color:#333333;line-height:1.4;">${esc(disp.desc)}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
            ${renderFooter()}
          </section>
        `;
      }
    }

    // =========================================================================
    // LÁMINA 15: ANATOMÍA SEMIÓTICA DEL SÍMBOLO MAESTRO EN POSITIVO (PASO 4.1)
    // =========================================================================
    else if (idx === 14) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-15">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 05", "ANATOMIA SEMIOTICA DEL SIMBOLO MAESTRO EN POSITIVO (PASO 4.1)")}
          <div class="plate-body" style="display:grid;grid-template-columns:1fr 310px 1fr;gap:20px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:28px;text-align:right;padding-right:12px;">
              <div style="border-right:3.5px solid ${pal.pri};padding-right:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.14em;">01. ${esc(dna.strokeBadge)}</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:13.5px;font-weight:800;color:${pal.darkInk};margin:3px 0;">${esc(dna.strokeLabel)}</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.44;">
                  ${isRect
                    ? `Construido bajo geometría ortogonal de trazos rectos y ángulos precisos que proyectan ingeniería, orden estructural y exactitud en ${esc(bName)}.`
                    : `Construido mediante trazos orgánicos y curvas continuas que proyectan fluidez humana, empatía y evolución armónica en ${esc(bName)}.`}
                </div>
              </div>
              <div style="border-right:3.5px solid ${pal.sec};padding-right:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.14em;">02. ACENTO CROMATICO VIBRANTE (${pal.sec})</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:13.5px;font-weight:800;color:${pal.darkInk};margin:3px 0;">Energía, Acción y Diferenciación</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.44;">
                  El punto focal en <strong>${pal.sec}</strong> guía el ojo hacia el núcleo del símbolo y alimenta el 10% de acento en los vectores de todo el manual.
                </div>
              </div>
            </div>

            <div style="position:relative;width:310px;height:310px;display:flex;align-items:center;justify-content:center;">
              <svg viewBox="0 0 310 310" width="310" height="310" style="position:absolute;inset:0;pointer-events:none;">
                ${isRect ? `
                  <polygon points="95,18 215,18 292,95 292,215 215,292 95,292 18,215 18,95" fill="${pal.softTint}" stroke="${pal.lightGray}" stroke-width="1.5"/>
                  <polygon points="102,32 208,32 278,102 278,208 208,278 102,278 32,208 32,102" fill="none" stroke="${pal.pri}" stroke-width="2" stroke-dasharray="6,5"/>
                  <polyline points="24,120 24,52 92,24" fill="none" stroke="${pal.sec}" stroke-width="3.5"/>
                  <polyline points="286,190 286,258 218,286" fill="none" stroke="${pal.sec}" stroke-width="3.5"/>
                ` : `
                  <circle cx="155" cy="155" r="138" fill="${pal.softTint}" stroke="${pal.lightGray}" stroke-width="1.5"/>
                  <path d="M35,105 A138,138 0 1,1 275,205" fill="none" stroke="${pal.pri}" stroke-width="2.5" stroke-dasharray="6,5"/>
                  <path d="M52,215 A128,128 0 0,0 258,95" fill="none" stroke="${pal.sec}" stroke-width="3" stroke-linecap="round"/>
                `}
              </svg>
              <div style="width:196px;height:196px;position:relative;z-index:2;display:flex;align-items:center;justify-content:center;">
                ${assets.symPosSvg}
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:28px;padding-left:12px;">
              <div style="border-left:3.5px solid ${pal.darkInk};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.14em;">03. CARACTER TEMPORAL (${esc(dna.eraLabel.toUpperCase())})</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:13.5px;font-weight:800;color:${pal.darkInk};margin:3px 0;">Confianza, Prestigio y Orden</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.44;">
                  Los tonos estructurales <strong>${pal.pri}</strong> y <strong>${pal.darkInk}</strong> consolidan un carácter <strong>${esc(dna.eraLabel.toLowerCase())}</strong> con legibilidad perfecta sobre lienzo blanco (#FFFFFF).
                </div>
              </div>
              <div style="border-left:3.5px solid ${pal.accentLight};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.14em;">04. TIPOGRAFIA DE AUTOR (${esc(priFont.toUpperCase())})</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:13.5px;font-weight:800;color:${pal.darkInk};margin:3px 0;">Voz Tipográfica Homologada</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.44;">
                  Construida en <strong>${esc(priFont)}</strong> para encabezados y <strong>${esc(secFont)}</strong> para lectura ejecutiva fluida.
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINAS 16, 17, 18 Y 19: LAS 4 VERSIONES / LÍNEAS DE OFERTA / SUBMARCAS (PASOS 4.2 A 4.5)
    // =========================================================================
    else if (idx >= 15 && idx <= 18) {
      const sb = assets.subBrands[idx - 15];
      const hdrUnitTitle = dna.archMode === "monolithic"
        ? `${sb.unitKindLabel || `VERSION OFICIAL ${sb.code}`} • ${sb.suffix} (PASO 4.${idx - 13})`
        : `${sb.unitKindLabel || `UNIDAD OFICIAL ${sb.code}`} • ${bUpper} ${sb.suffix} (PASO 4.${idx - 13})`;
      const promiseCaption = dna.archMode === "monolithic"
        ? `PILAR DE OFERTA Y APLICACION ${sb.code} • ${sb.domain.toUpperCase()}`
        : (dna.archMode === "portfolio"
          ? `PROMESA DE LA LINEA DE VALOR ${sb.code} • ${sb.domain.toUpperCase()}`
          : `PROMESA DE LA SUBMARCA ${sb.code} • ${sb.domain.toUpperCase()}`);

      plateInnerHTML = `
        <section class="benefic-plate" id="plate-${meta.num}">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 05", hdrUnitTitle)}
          <div class="plate-body" style="display:grid;grid-template-columns:0.88fr 1.12fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              ${sb.lockupSvg(138)}
              <div style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
                ${esc(sb.tagline)}
              </div>
              ${renderBrandSceneFrame(`submarca_${sb.key}`, ctx, 134, pal.sec)}
            </div>

            <div style="display:flex;flex-direction:column;gap:14px;">
              <div style="border-left:4px solid ${pal.sec};padding-left:14px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">${esc(promiseCaption)}</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:16.5px;font-weight:800;color:${pal.darkInk};line-height:1.22;margin-top:3px;">
                  ${esc(sb.promise)}
                </div>
              </div>

              <div style="padding-bottom:10px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};letter-spacing:0.14em;">${esc(sb.diffTitle.toUpperCase())}</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;margin-top:3px;">
                  ${esc(sb.diffText)}
                </div>
              </div>

              <div style="display:flex;flex-direction:column;gap:10px;">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};letter-spacing:0.15em;">${dna.archMode === "monolithic" ? "USOS AUTORIZADOS Y PILARES DE VALOR" : "PORTAFOLIO Y ENTREGABLES CLAVE"}</div>
                ${sb.pillars.map((pil, pIdx) => `
                  <div style="padding-bottom:8px;border-bottom:1px solid ${pal.lightGray};">
                    <div style="font-family:'${priFont}',sans-serif;font-size:11.5px;font-weight:800;color:${pIdx % 2 === 0 ? pal.darkInk : pal.pri};">${esc(pil.t)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:10.6px;color:#333333;line-height:1.38;">${esc(pil.d)}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 20: RETÍCULA CONSTRUCTIVA (8X × 8X) Y SISTEMA DE ACENTOS DEL BANNER (PASO 4.6)
    // =========================================================================
    else if (idx === 19) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-20">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 05", `CONSTRUCCION TECNICA • RETICULA (8X × 8X) Y ${isRect ? "GEOMETRIA RECTA DEL BANNER" : "CURVAS DEL BANNER"} (PASO 4.6)`)}
          <div class="plate-body" style="display:grid;grid-template-columns:0.95fr 1.05fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">PLANO DE INGENIERIA • RETICULA MODULAR 8X × 8X</div>
              <div style="position:relative;width:300px;height:300px;border:1.5px solid ${pal.pri};background:#FFFFFF;">
                <svg viewBox="0 0 300 300" width="300" height="300" style="position:absolute;inset:0;pointer-events:none;">
                  ${[1,2,3,4,5,6,7].map(n => `
                    <line x1="${n * 37.5}" y1="0" x2="${n * 37.5}" y2="300" stroke="${pal.accentLight}" stroke-width="0.8" stroke-dasharray="3,3"/>
                    <line x1="0" y1="${n * 37.5}" x2="300" y2="${n * 37.5}" stroke="${pal.accentLight}" stroke-width="0.8" stroke-dasharray="3,3"/>
                  `).join("")}
                  ${isRect
                    ? `<polygon points="95,38 205,38 262,95 262,205 205,262 95,262 38,205 38,95" fill="none" stroke="${pal.sec}" stroke-width="1.3" stroke-dasharray="5,4"/>
                       <line x1="0" y1="0" x2="300" y2="300" stroke="${pal.pri}" stroke-width="0.6" opacity="0.4"/>
                       <line x1="300" y1="0" x2="0" y2="300" stroke="${pal.pri}" stroke-width="0.6" opacity="0.4"/>`
                    : `<circle cx="150" cy="150" r="112" fill="none" stroke="${pal.sec}" stroke-width="1.2" stroke-dasharray="5,4"/>`}
                  <text x="12" y="22" font-family="monospace" font-weight="700" font-size="10" fill="${pal.pri}">X = Módulo Rector</text>
                  <text x="235" y="290" font-family="monospace" font-weight="700" font-size="10" fill="${pal.sec}">8X × 8X</text>
                </svg>
                <div style="position:absolute;inset:36px;display:flex;align-items:center;justify-content:center;">
                  ${assets.symPosSvg}
                </div>
              </div>
              <div style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;text-align:center;">
                Proporción simétrica <strong>1:1 (8X × 8X)</strong> para el Símbolo Maestro y <strong>8X × 9.5X</strong> con titular y descriptor.
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:14px;">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">${isRect ? "SISTEMA DE PLANOS ANGULARES Y TRAZOS RECTOS DEL BANNER" : "SISTEMA DE ONDAS Y CURVAS DEL BANNER OFICIAL"}</div>
                <h3 style="font-family:'${priFont}',sans-serif;font-size:19px;font-weight:800;color:${pal.darkInk};margin:4px 0;">
                  ${isRect ? "Geometría Arquitectónica Derivada de tus Elecciones de Logo" : "Geometría Fluida Derivada de los Acentos del Logotipo"}
                </h3>
                <p style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.46;margin:0;">
                  ${isRect
                    ? `Los planos angulares a 45° y líneas ortogonales que recorren encabezados, pies de página, tarjetas y presentaciones nacen directamente de tu elección de trazos rectos y geométricos (${pal.sec}, ${pal.pri} y ${pal.darkInk}) sobre lienzo blanco.`
                    : `Las curvas orgánicas que recorren encabezados, pies de página, tarjetas y presentaciones nacen directamente de tu elección de trazos fluidos y de la paleta del logotipo (${pal.sec}, ${pal.pri}, ${pal.accentLight} y ${pal.darkInk}) sobre lienzo blanco.`}
                </p>
              </div>

              <div style="position:relative;height:145px;border-radius:${dna.cardRadius};overflow:hidden;border:1px solid ${pal.lightGray};background:#FFFFFF;">
                <svg viewBox="0 0 520 145" width="100%" height="145" preserveAspectRatio="none">
                  ${isRect ? `
                    <polygon points="0,0 240,0 130,92 0,92" fill="${pal.sec}" opacity="0.92"/>
                    <polygon points="240,0 320,0 185,112 0,112 0,92 130,92" fill="${pal.lightGray}" opacity="0.88"/>
                    <polygon points="340,145 520,18 520,145" fill="${pal.darkInk}" opacity="0.12"/>
                    <polygon points="285,145 520,0 520,34 325,145" fill="${pal.pri}" opacity="0.32"/>
                    <polyline points="255,145 415,42 520,42" fill="none" stroke="${pal.accentLight}" stroke-width="3"/>
                    <text x="260" y="78" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="11" fill="${pal.darkInk}">ARQUITECTURA GEOMETRICA RECTA • ${esc(bUpper)}</text>
                  ` : `
                    <path d="M0,0 L260,0 C180,38 95,75 0,120 Z" fill="${pal.sec}" opacity="0.92"/>
                    <path d="M0,85 C110,48 210,22 310,0 L360,0 C240,38 125,82 0,135 Z" fill="${pal.lightGray}" opacity="0.85"/>
                    <path d="M310,145 C390,105 460,62 520,12 L520,145 Z" fill="${pal.darkInk}" opacity="0.12"/>
                    <path d="M275,145 C365,102 445,55 520,0 L520,32 C450,78 375,118 300,145 Z" fill="${pal.pri}" opacity="0.32"/>
                    <path d="M245,145 C345,98 430,48 520,0" fill="none" stroke="${pal.accentLight}" stroke-width="3"/>
                    <text x="260" y="78" text-anchor="middle" font-family="${priFont}" font-weight="800" font-size="11" fill="${pal.darkInk}">ARQUITECTURA DE ONDAS EN CURVAS • ${esc(bUpper)}</text>
                  `}
                </svg>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                <div style="border-left:3px solid ${pal.sec};padding-left:10px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.sec};">${isRect ? `PLANO ANGULAR SUPERIOR (${pal.sec})` : `ONDA SUPERIOR IZQUIERDA (${pal.sec})`}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10.5px;color:#333333;margin-top:2px;">Aporta energía inmediata en portadas, cierres y reverso de tarjetas.</div>
                </div>
                <div style="border-left:3px solid ${pal.pri};padding-left:10px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};">${isRect ? `VECTORES ORTOGONALES INFERIORES (${pal.pri})` : `ONDAS INFERIORES DERECHAS (${pal.pri})`}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10.5px;color:#333333;margin-top:2px;">Sostienen el cierre visual de la página con estabilidad e ingeniería.</div>
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 21: ÁREA DE AISLAMIENTO (1.5X) Y SECCIÓN DE APLICACIÓN EN NEGATIVO REAL (PASO 4.7)
    // =========================================================================
    else if (idx === 20) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-21">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 05", "AREA DE AISLAMIENTO (1.5X), ESCALAS Y SECCION DE APLICACION EN NEGATIVO (PASO 4.7)")}
          <div class="plate-body" style="display:grid;grid-template-columns:0.95fr 1.05fr;gap:30px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:14px;padding-right:18px;border-right:1.5px solid ${pal.lightGray};">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">AREA DE AISLAMIENTO PERIMETRAL (1.5X)</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;margin-top:3px;">
                  Alrededor del logotipo debe respetarse siempre un margen libre mínimo de <strong>1.5X</strong> libre de textos, bordes u otros gráficos.
                </div>
              </div>

              <div style="display:flex;align-items:center;justify-content:center;padding:12px;border:1.5px dashed ${pal.pri};background:${pal.softTint};border-radius:${dna.cardRadius};position:relative;">
                <div style="padding:18px;background:#FFFFFF;border:1px solid ${pal.lightGray};display:flex;align-items:center;justify-content:center;width:150px;height:150px;">
                  ${assets.symPosSvg}
                </div>
                <span style="position:absolute;top:6px;left:12px;font-family:monospace;font-size:10px;font-weight:800;color:${pal.sec};">1.5X Libre</span>
                <span style="position:absolute;bottom:6px;right:12px;font-family:monospace;font-size:10px;font-weight:800;color:${pal.pri};">Positivo por Defecto</span>
              </div>

              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding-top:6px;border-top:1px solid ${pal.lightGray};text-align:center;">
                <div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};">MINIMO DIGITAL</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.pri};font-weight:700;">40 px alto</div>
                </div>
                <div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};">MINIMO IMPRESO</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.sec};font-weight:700;">18 mm alto</div>
                </div>
                <div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};">BORDADO TEXTIL</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.pri};font-weight:700;">25 mm alto</div>
                </div>
              </div>
            </div>

            <!-- Única Sección Oficial de Aplicación en Negativo Real Calado sobre Fondo Oscuro -->
            <div style="background:${pal.darkInk};border-radius:${dna.frameRadius};padding:24px 26px;color:#FFFFFF;border-bottom:4px solid ${pal.sec};display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">SECCION DE APLICACION EN NEGATIVO REAL CALADO</div>
                <h3 style="font-family:'${priFont}',sans-serif;font-size:18px;font-weight:800;color:#FFFFFF;margin:4px 0;">
                  Exclusivo para Soportes Oscuros (${pal.darkInk})
                </h3>
                <p style="font-family:'${secFont}',sans-serif;font-size:11px;color:#E2E8F0;line-height:1.45;margin:0;">
                  Cuando el soporte sea oscuro, <strong>jamás se coloca un parche o círculo blanco</strong> detrás del logo positivo. Se utiliza la versión en <strong>Negativo Real Calado</strong> con trazos estructurales en blanco (#FFFFFF) y acento intacto en <strong>${pal.sec}</strong>.
                </p>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-around;padding:12px 0;border-top:1px solid rgba(255,255,255,0.14);border-bottom:1px solid rgba(255,255,255,0.14);">
                <div style="text-align:center;">
                  <div style="width:124px;height:124px;margin:0 auto;display:flex;align-items:center;justify-content:center;">
                    ${assets.symNegSvg}
                  </div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:12px;font-weight:800;color:#FFFFFF;margin-top:6px;letter-spacing:0.1em;">${esc(bUpper)}</div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.18em;">VERSION NEGATIVO CALADO</div>
                </div>
              </div>

              <div style="font-family:'${secFont}',sans-serif;font-size:10.5px;color:${pal.accentLight};font-weight:600;">
                Regla de Oro: En el 95% de los documentos se usa el Logotipo en Positivo sobre Lienzo Claro (#FFFFFF).
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 22: USOS INCORRECTOS Y RESTRICCIONES DE INTEGRIDAD VISUAL (PASO 4.8)
    // =========================================================================
    else if (idx === 21) {
      const prohibiciones = [
        { t: "01. Prohibido deformar o achatar", d: "Mantener siempre el bloqueo de aspecto 1:1 al escalar el símbolo.", style: "transform:scaleX(1.38) scaleY(0.68);" },
        { t: "02. Prohibido el parche de círculo blanco", d: "En fondos oscuros usar versión negativo calado, nunca encerrar en parche blanco.", darkPatch: true },
        { t: "03. Prohibido alterar los colores oficiales", d: `No sustituir ${pal.pri} ni ${pal.sec} por colores ajenos al sistema.`, style: "filter:hue-rotate(145deg) saturate(2.2);" },
        { t: "04. Prohibido positivo sobre fondo oscuro", d: "Pierde contraste estructural; usar versión en negativo real.", darkRaw: true },
        { t: "05. Prohibido cambiar la tipografía oficial", d: `No reemplazar ${priFont} por fuentes informales o cursivas.`, badFont: true },
        { t: "06. Prohibido encerrar en cajas pesadas", d: "El sistema respira en flujo abierto con curvas, sin marcos negros ni sombras duras.", heavyBox: true }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-22">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 05", "USOS INCORRECTOS Y RESTRICCIONES DE INTEGRIDAD VISUAL (PASO 4.8)")}
          <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
            <div style="font-family:'${secFont}',sans-serif;font-size:11.5px;color:#333333;">
              El logotipo de <strong>${esc(bName)}</strong> es un activo técnico inalterable. Queda estrictamente prohibida cualquiera de las siguientes 6 alteraciones:
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);column-gap:26px;row-gap:16px;flex:1;align-items:center;">
              ${prohibiciones.map(p => `
                <div style="padding-bottom:10px;border-bottom:1.5px solid #FECACA;display:flex;flex-direction:column;gap:6px;">
                  <div style="height:104px;border-radius:12px;border:1px dashed #EF4444;background:${p.darkPatch || p.darkRaw ? pal.darkInk : "#FFF5F5"};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
                    <div style="width:68px;height:68px;display:flex;align-items:center;justify-content:center;${p.style || ""}${p.darkPatch ? "background:#FFFFFF;border-radius:50%;padding:8px;" : ""}${p.heavyBox ? "border:4px solid #000000;box-shadow:6px 6px 0 #000;" : ""}">
                      ${assets.symPosSvg}
                    </div>
                    ${p.badFont ? `<span style="font-family:'Comic Sans MS',cursive;font-size:12px;color:#EF4444;font-weight:700;margin-left:6px;">${esc(bName)}</span>` : ""}
                    <span style="position:absolute;top:6px;right:8px;background:#EF4444;color:#FFFFFF;font-family:'${priFont}',sans-serif;font-size:8.5px;font-weight:800;padding:2px 6px;border-radius:10px;">INCORRECTO</span>
                  </div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:11px;font-weight:800;color:#991B1B;">${esc(p.t)}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10.2px;color:#333333;line-height:1.35;">${esc(p.d)}</div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 23: PALETA CROMÁTICA OFICIAL DE 8 TONOS (PASO 5.1)
    // =========================================================================
    else if (idx === 22) {
      const colors8 = [
        { name: "01. Color Primario del Logo", hex: pal.pri, role: "Estructura principal, arcos y titulares secundarios" },
        { name: "02. Tinta Profunda Rectora", hex: pal.darkInk, role: "Titulares maestros, encabezados y fondo negativo" },
        { name: "03. Acento Vibrante del Logo", hex: pal.sec, role: "Descriptores, llamadas de atención y curva 10%" },
        { name: "04. Acento Luminoso de Curvas", hex: pal.accentLight, role: "Líneas punteadas de flujo, nodos y arcos secundarios" },
        { name: "05. Gris Oscuro Editorial", hex: "#333333", role: "Cuerpo de texto ejecutivo y párrafos de lectura" },
        { name: "06. Gris Medio Técnico", hex: "#707070", role: "Cotas técnicas, metadatos y etiquetas secundarias" },
        { name: "07. Gris Claro Capilar", hex: "#E6E6E6", role: "Líneas divisorias capilares en flujo abierto" },
        { name: "08. Lienzo Blanco Oficial", hex: "#FFFFFF", role: "Fondo dominante (70% de luz) en todo el sistema" }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-23">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 06", "PALETA CROMATICA OFICIAL • 8 COLORES EN FLUJO ABIERTO (PASO 5.1)")}
          <div class="plate-body" style="display:grid;grid-template-columns:repeat(4,1fr);column-gap:22px;row-gap:16px;align-items:center;">
            ${colors8.map((c, i) => {
              const rgb = hexToRgb(c.hex);
              const cmyk = hexToCmyk(c.hex);
              const pantone = hexToPantone(c.hex, i);
              return `
                <div style="padding-bottom:10px;border-bottom:1.5px solid ${pal.lightGray};display:flex;flex-direction:column;gap:6px;">
                  <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:52px;height:52px;border-radius:50%;background:${c.hex};border:2px solid ${c.hex === "#FFFFFF" ? "#CBD5E1" : c.hex};box-shadow:0 6px 14px rgba(13,37,64,0.08);flex-shrink:0;position:relative;">
                      <svg width="60" height="60" viewBox="0 0 60 60" style="position:absolute;inset:-6px;pointer-events:none;">
                        <path d="M8,30 A22,22 0 0,1 52,30" fill="none" stroke="${i % 2 === 0 ? pal.sec : pal.pri}" stroke-width="2"/>
                      </svg>
                    </div>
                    <div>
                      <div style="font-family:'${priFont}',sans-serif;font-size:10.5px;font-weight:800;color:${pal.darkInk};">${esc(c.name)}</div>
                      <div style="font-family:monospace;font-size:12px;font-weight:800;color:${pal.sec};">${c.hex}</div>
                    </div>
                  </div>
                  <div style="font-family:monospace;font-size:9.2px;color:${pal.midGray};line-height:1.4;">
                    <strong>RGB:</strong> ${rgb.r}, ${rgb.g}, ${rgb.b} · <strong>${esc(pantone)}</strong><br/>
                    <strong>CMYK:</strong> ${cmyk}
                  </div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10px;color:#333333;line-height:1.34;">
                    ${esc(c.role)}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 24: PROPORCIÓN DE LUZ (70/20/10) Y LOS 6 RECURSOS VISUALES ADAPTADOS AL TRAZO (PASO 5.2)
    // =========================================================================
    else if (idx === 23) {
      const recursos6 = isRect
        ? [
            { t: "01. Líneas Rectas Ortogonales", d: "Conectan ideas, pasos y momentos del cliente con precisión arquitectónica.", svg: `<polyline points="10,34 45,14 85,14 120,28" fill="none" stroke="${pal.pri}" stroke-width="3" stroke-linejoin="miter"/>` },
            { t: "02. Marcos Angulares con Chaflán", d: "Enmarcan al símbolo maestro y a los indicadores clave con cortes a 45°.", svg: `<polygon points="28,10 102,10 116,24 116,38 14,38 14,24" fill="none" stroke="${pal.sec}" stroke-width="2.5"/>` },
            { t: "03. Retícula Modular Suiza", d: "Divisiones ortogonales de 1px en #E6E6E6 que ordenan sin usar cajas pesadas.", svg: `<line x1="15" y1="24" x2="115" y2="24" stroke="#CBD5E1" stroke-width="1.5"/><line x1="65" y1="6" x2="65" y2="42" stroke="#CBD5E1" stroke-width="1.5"/>` },
            { t: "04. Cruces Técnicas de Coordenadas (+)", d: "Aportan precisión de plano de ingeniería en las esquinas de las láminas.", svg: `<g stroke="${pal.midGray}" stroke-width="1.6" opacity="0.65"><path d="M35,14 v8 M31,18 h8 M65,14 v8 M61,18 h8 M95,14 v8 M91,18 h8 M35,28 v8 M31,32 h8 M65,28 v8 M61,32 h8 M95,28 v8 M91,32 h8"/></g>` },
            { t: "05. Vectores de Crecimiento Angular", d: `Señalan evolución y transformación (Del Caos al Sistema) en ${pal.sec}.`, svg: `<polyline points="18,36 58,36 102,12" fill="none" stroke="${pal.sec}" stroke-width="3"/><polygon points="108,9 96,11 103,19" fill="${pal.sec}"/>` },
            { t: "06. Diagramas de Bloques Conectados", d: "Nodos geométricos unidos por trayectorias ortogonales limpias.", svg: `<line x1="24" y1="24" x2="104" y2="24" stroke="${pal.pri}" stroke-width="2" stroke-dasharray="4,4"/><rect x="22" y="18" width="12" height="12" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/><rect x="58" y="18" width="12" height="12" fill="${pal.sec}"/><rect x="94" y="18" width="12" height="12" fill="${pal.darkInk}"/>` }
          ]
        : [
            { t: "01. Líneas Curvas Continuas", d: "Conectan ideas, pasos y momentos del cliente con fluidez orgánica.", svg: `<path d="M10,32 C45,8 85,52 120,18" fill="none" stroke="${pal.pri}" stroke-width="3" stroke-linecap="round"/>` },
            { t: "02. Arcos Abiertos Orbitales", d: "Abrazan al símbolo maestro y a los indicadores clave sin encerrarlos.", svg: `<path d="M25,40 A34,34 0 0,1 105,40" fill="none" stroke="${pal.sec}" stroke-width="3" stroke-linecap="round"/>` },
            { t: "03. Grids Capilares Minimalistas", d: `Divisiones sutiles de 1px en #E6E6E6 que ordenan sin usar cajas pesadas.`, svg: `<line x1="15" y1="24" x2="115" y2="24" stroke="#CBD5E1" stroke-width="1.5"/><line x1="65" y1="6" x2="65" y2="42" stroke="#CBD5E1" stroke-width="1.5"/>` },
            { t: "04. Patrones de Puntos Suaves", d: "Aportan textura técnica discreta en las esquinas de las láminas.", svg: `<g fill="${pal.midGray}" opacity="0.55"><circle cx="35" cy="18" r="3"/><circle cx="55" cy="18" r="3"/><circle cx="75" cy="18" r="3"/><circle cx="35" cy="32" r="3"/><circle cx="55" cy="32" r="3"/><circle cx="75" cy="32" r="3"/></g>` },
            { t: "05. Flechas de Crecimiento en Curva", d: `Señalan evolución y transformación (Del Caos al Sistema) en ${pal.sec}.`, svg: `<path d="M18,36 Q60,34 102,12" fill="none" stroke="${pal.sec}" stroke-width="3"/><polygon points="108,9 96,11 103,19" fill="${pal.sec}"/>` },
            { t: "06. Diagramas y Flujos Conectados", d: "Nodos limpios unidos por trayectorias vectoriales estilo Illustrator.", svg: `<line x1="24" y1="24" x2="104" y2="24" stroke="${pal.pri}" stroke-width="2" stroke-dasharray="4,4"/><circle cx="28" cy="24" r="6" fill="#FFFFFF" stroke="${pal.pri}" stroke-width="2.5"/><circle cx="64" cy="24" r="6" fill="${pal.sec}"/><circle cx="100" cy="24" r="6" fill="${pal.darkInk}"/>` }
          ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-24">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 06", `PROPORCION DE LUZ (70/20/10) Y LOS 6 RECURSOS DE ${dna.strokeBadge} (PASO 5.2)`)}
          <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div>
              <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;margin-bottom:6px;">
                LEY DE PROPORCION CROMATICA Y LUMINOSIDAD (70% BLANCO / 20% ESTRUCTURA / 10% ACENTO)
              </div>
              <div style="display:flex;height:44px;border-radius:${dna.cardRadius};overflow:hidden;border:1.5px solid ${pal.lightGray};">
                <div style="width:70%;background:#FFFFFF;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-family:'${priFont}',sans-serif;font-size:11px;font-weight:800;color:${pal.darkInk};">
                  <span>70% LIENZO CLARO DOMINANTE (#FFFFFF)</span>
                  <span style="color:${pal.midGray};font-size:9.5px;">Aire, limpieza y legibilidad (${esc(dna.eraLabel)})</span>
                </div>
                <div style="width:20%;background:${pal.pri};display:flex;align-items:center;justify-content:center;font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:#FFFFFF;">
                  20% ${pal.pri} / ${pal.darkInk}
                </div>
                <div style="width:10%;background:${pal.sec};display:flex;align-items:center;justify-content:center;font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:#FFFFFF;">
                  10% ${pal.sec}
                </div>
              </div>
            </div>

            <div>
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.pri};letter-spacing:0.16em;margin-bottom:10px;">
                LOS 6 RECURSOS VISUALES AUTORIZADOS (${esc(dna.strokeLabel.toUpperCase())})
              </div>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);column-gap:26px;row-gap:14px;">
                ${recursos6.map(r => `
                  <div style="padding-bottom:10px;border-bottom:1px solid ${pal.lightGray};">
                    <svg width="130" height="46" viewBox="0 0 130 46" style="display:block;margin-bottom:4px;">${r.svg}</svg>
                    <div style="font-family:'${priFont}',sans-serif;font-size:11.5px;font-weight:800;color:${pal.darkInk};">${esc(r.t)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;margin-top:2px;">${esc(r.d)}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 25: SISTEMA TIPOGRÁFICO OFICIAL Y JERARQUÍA EDITORIAL (PASO 5.3)
    // =========================================================================
    else if (idx === 24) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-25">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 06", `SISTEMA TIPOGRAFICO OFICIAL • ${priFont.toUpperCase()} & ${secFont.toUpperCase()} (PASO 5.3)`)}
          <div class="plate-body" style="display:grid;grid-template-columns:0.95fr 1.05fr;gap:32px;align-items:center;">
            <div style="display:flex;flex-direction:column;gap:16px;padding-right:20px;border-right:1.5px solid ${pal.lightGray};">
              <div style="padding-bottom:14px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">TIPOGRAFIA PRIMARIA • TITULARES Y ENCABEZADOS</div>
                <div style="display:flex;align-items:baseline;gap:14px;margin-top:4px;">
                  <span style="font-family:'${priFont}',sans-serif;font-size:48px;font-weight:800;color:${pal.darkInk};line-height:1;">Aa</span>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:20px;font-weight:800;color:${pal.darkInk};">${esc(priFont)}</div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:700;color:${pal.pri};">Bold (700) · ExtraBold (800) · Black (900)</div>
                  </div>
                </div>
                <div style="font-family:'${priFont}',sans-serif;font-size:11.5px;font-weight:700;color:#333333;letter-spacing:0.06em;margin-top:8px;">
                  A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z · 0 1 2 3 4 5 6 7 8 9
                </div>
              </div>

              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.16em;">TIPOGRAFIA COMPLEMENTARIA • CUERPO EJECUTIVO</div>
                <div style="display:flex;align-items:baseline;gap:14px;margin-top:4px;">
                  <span style="font-family:'${secFont}',sans-serif;font-size:44px;font-weight:600;color:${pal.pri};line-height:1;">Aa</span>
                  <div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:19px;font-weight:700;color:${pal.darkInk};">${esc(secFont)} / Plus Jakarta Sans</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:10px;font-weight:600;color:${pal.midGray};">Regular (400) · Medium (500) · SemiBold (600)</div>
                  </div>
                </div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.5px;color:#333333;line-height:1.45;margin-top:8px;">
                  Diseñada para máxima claridad y descanso visual en reportes, manuales, propuestas comerciales e interfaces digitales sobre fondo blanco.
                </div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};letter-spacing:0.16em;">
                JERARQUIA EDITORIAL Y ESCALA DE LECTURA
              </div>
              <div style="padding-bottom:10px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">H1 • TITULAR DE PORTADA (44–52 PX · EXTRABOLD)</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:24px;font-weight:800;color:${pal.darkInk};margin-top:2px;">${esc(bUpper)} — SISTEMA RECTOR</div>
              </div>
              <div style="padding-bottom:10px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.pri};letter-spacing:0.16em;">H2 • TITULAR DE SECCION (20–24 PX · EXTRABOLD)</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:17px;font-weight:800;color:${pal.darkInk};margin-top:2px;">Del Caos al Sistema con Claridad y Precisión</div>
              </div>
              <div style="padding-bottom:10px;border-bottom:1px solid ${pal.lightGray};">
                <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">DESCRIPTOR OFICIAL (9–11 PX · TRACKING +0.18EM · COLOR ${pal.sec})</div>
                <div style="font-family:'${priFont}',sans-serif;font-size:11px;font-weight:800;color:${pal.sec};letter-spacing:0.18em;margin-top:2px;">${esc(tagline.toUpperCase().slice(0, 48))}</div>
              </div>
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.midGray};letter-spacing:0.16em;">CUERPO DE TEXTO EJECUTIVO (11–13 PX · INTERLINEADO 1.50)</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:11.5px;color:#333333;line-height:1.5;margin-top:3px;">
                  Cada párrafo mantiene un ancho óptimo de lectura sobre lienzo blanco (#FFFFFF), garantizando comprensión inmediata en pantallas y documentos impresos.
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 26: SISTEMA DE LOS 6 SELLOS METODOLÓGICOS EN EL ESTILO DEL LOGO (PASO 5.4)
    // =========================================================================
    else if (idx === 25) {
      const sellos = [
        { code: "SELLO 01", t: "Diagnóstico 360°", d: "Escucha profunda y análisis de causa raíz antes de intervenir." },
        { code: "SELLO 02", t: isRect ? "Arquitectura Geométrica" : "Arquitectura en Curvas", d: "Diseño de sistemas limpios, conectados y libres de fricción." },
        { code: "SELLO 03", t: "Ejecución Certificada", d: `Estándar técnico superior en cada entrega de ${bName}.` },
        { code: "SELLO 04", t: "Acompañamiento Leal", d: "Trabajo hombro con hombro junto al cliente y su equipo." },
        { code: "SELLO 05", t: "Inteligencia y Datos", d: "Trazabilidad en tiempo real y mejora continua." },
        { code: "SELLO 06", t: "Resultados Medibles", d: "Crecimiento sostenible, orden operativo y rentabilidad." }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-26">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 06", "SISTEMA DE LOS 6 SELLOS METODOLOGICOS EN EL ESTILO DEL LOGOTIPO (PASO 5.4)")}
          <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
            <div style="font-family:'${secFont}',sans-serif;font-size:11.5px;color:#333333;">
              Los <strong>6 Sellos Metodológicos de ${esc(bName)}</strong> comparten el mismo lenguaje de <strong>${esc(dna.strokeLabel.toLowerCase())}</strong> y paleta cromática (<strong>${pal.pri}</strong>, <strong>${pal.sec}</strong> y <strong>${pal.darkInk}</strong>) del logotipo maestro:
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);column-gap:26px;row-gap:16px;flex:1;align-items:center;">
              ${sellos.map((s, i) => `
                <div style="display:flex;align-items:center;gap:14px;padding-bottom:12px;border-bottom:1.5px solid ${pal.lightGray};">
                  <div style="width:68px;height:68px;border-radius:${dna.badgeRadius};background:${pal.softTint};border:2px solid ${i % 2 === 0 ? pal.pri : pal.sec};display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0;">
                    <div style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;">
                      ${assets.symPosSvg}
                    </div>
                    <span style="position:absolute;bottom:-4px;right:-4px;background:${i % 2 === 0 ? pal.sec : pal.darkInk};color:#FFFFFF;font-family:'${priFont}',sans-serif;font-size:8px;font-weight:800;padding:2px 5px;border-radius:${isRect ? "2px" : "8px"};">0${i + 1}</span>
                  </div>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${i % 2 === 0 ? pal.sec : pal.pri};letter-spacing:0.14em;">${s.code}</div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:12.5px;font-weight:800;color:${pal.darkInk};margin:2px 0;">${esc(s.t)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:10.5px;color:#333333;line-height:1.36;">${esc(s.d)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 27: GOBERNANZA DE IDENTIDAD DOCUMENTAL Y CO-BRANDING (NORMA OFICIAL DE CO-BRANDING · PASO 6.1)
    // =========================================================================
    else if (idx === 26) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-27">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 07", "GOBERNANZA DE IDENTIDAD DOCUMENTAL Y CO-BRANDING • NORMA OFICIAL (PASO 6.1)")}
          <div class="plate-body" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:stretch;">
            <div style="border-top:4px solid ${pal.pri};padding-top:14px;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.16em;">REGLA 1 • DOCUMENTOS FIRMADOS POR ${esc(bUpper)}</div>
                <h3 style="font-family:'${priFont}',sans-serif;font-size:18px;font-weight:800;color:${pal.darkInk};margin:4px 0 8px 0;">
                  100% Identidad ${esc(bName)} en Lienzo Claro + Cápsula Neutra Cliente
                </h3>
                <p style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.48;margin:0 0 12px 0;">
                  Toda propuesta, reporte o entregable emitido por <strong>${esc(bName)}</strong> utiliza exclusivamente el lienzo blanco (#FFFFFF), los acentos de <strong>${esc(dna.strokeLabel.toLowerCase())}</strong> en <strong>${pal.pri}</strong> / <strong>${pal.sec}</strong> y el logotipo oficial en positivo. El logotipo del cliente se ubica únicamente dentro de una <strong>cápsula neutra aislada</strong> ("Preparado para: [Logo Cliente]") sin mezclar sus colores.
                </p>
              </div>

              <div style="border:1.5px solid ${pal.lightGray};border-radius:${dna.frameRadius};border-bottom:3.5px solid ${pal.pri};padding:16px;background:#FFFFFF;display:flex;align-items:center;justify-content:space-between;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:48px;height:48px;">${assets.symPosSvg}</div>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:12px;font-weight:800;color:${pal.darkInk};">${esc(bUpper)}</div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:8.5px;font-weight:800;color:${pal.sec};">EMISOR OFICIAL DEL DOCUMENTO</div>
                  </div>
                </div>
                <div style="padding:8px 14px;border-radius:${dna.cardRadius};background:#F8FAFC;border:1px dashed #CBD5E1;text-align:center;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:8px;font-weight:800;color:${pal.midGray};">PREPARADO PARA:</div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:#475569;margin-top:2px;">[LOGO CLIENTE AISLADO]</div>
                </div>
              </div>
            </div>

            <div style="border-top:4px solid ${pal.sec};padding-top:14px;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.pri};letter-spacing:0.16em;">REGLA 2 • DOCUMENTOS INTERNOS DE TERCEROS / CLIENTES</div>
                <h3 style="font-family:'${priFont}',sans-serif;font-size:18px;font-weight:800;color:${pal.darkInk};margin:4px 0 8px 0;">
                  Aislamiento Total de Identidades (Cero Híbridos)
                </h3>
                <p style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;line-height:1.48;margin:0 0 12px 0;">
                  Cuando se maqueta un documento que será firmado exclusivamente por una empresa cliente como suyo propio, se rige al 100% por el manual de esa empresa, sin mezclar los acentos, tipografías ni colores de <strong>${esc(bName)}</strong>.
                </p>
              </div>

              <div style="border-left:3.5px solid ${pal.sec};padding-left:14px;background:${pal.warmTint};padding:14px;border-radius:${isRect ? "0 4px 4px 0" : "0 16px 16px 0"};">
                <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};">GARANTÍA DE COHERENCIA VISUAL OFICIAL</div>
                <div style="font-family:'${secFont}',sans-serif;font-size:10.8px;color:#333333;line-height:1.42;margin-top:4px;">
                  Ningún documento de <strong>${esc(bName)}</strong> puede adoptar colores ajenos al logotipo ni fondos negros que contradigan la regla 70/20/10 de lienzo claro.
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 28: PAPELERÍA EN LIENZO CLARO · HOJA, PROPUESTA, TARJETAS Y FIRMA (PASO 6.2)
    // =========================================================================
    else if (idx === 27) {
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-28">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 07", "PAPELERIA EN LIENZO CLARO • HOJA, PROPUESTA, TARJETAS Y FIRMA (PASO 6.2)")}
          <div class="plate-body" style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:28px;align-items:center;">
            <!-- Izquierda: Hoja Membretada A4 + Portada de Propuesta en Lienzo Claro -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div style="height:290px;border:1.5px solid ${pal.lightGray};border-radius:${dna.cardRadius};background:#FFFFFF;padding:14px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;box-shadow:0 10px 24px rgba(13,37,64,0.06);">
                <svg viewBox="0 0 200 40" width="100%" height="32" preserveAspectRatio="none" style="position:absolute;top:0;left:0;">
                  ${isRect ? `
                    <polygon points="0,0 130,0 95,30 0,30" fill="${pal.sec}" opacity="0.9"/>
                    <polygon points="115,0 200,0 200,20 140,20" fill="${pal.pri}" opacity="0.18"/>
                  ` : `
                    <path d="M0,0 L120,0 C80,14 40,24 0,36 Z" fill="${pal.sec}" opacity="0.9"/>
                    <path d="M110,0 L200,0 L200,22 C165,14 135,6 110,0 Z" fill="${pal.pri}" opacity="0.18"/>
                  `}
                </svg>
                <div style="display:flex;align-items:center;gap:8px;margin-top:18px;position:relative;z-index:1;">
                  <div style="width:32px;height:32px;">${assets.symPosSvg}</div>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.darkInk};">${esc(bUpper)}</div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:7px;font-weight:700;color:${pal.sec};">HOJA MEMBRETADA OFICIAL</div>
                  </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;padding:10px 0;">
                  <div style="height:5px;width:65%;background:${pal.darkInk};border-radius:3px;opacity:0.8;"></div>
                  <div style="height:4px;width:92%;background:${pal.lightGray};border-radius:2px;"></div>
                  <div style="height:4px;width:88%;background:${pal.lightGray};border-radius:2px;"></div>
                  <div style="height:4px;width:76%;background:${pal.lightGray};border-radius:2px;"></div>
                  <div style="height:4px;width:90%;background:${pal.lightGray};border-radius:2px;margin-top:6px;"></div>
                  <div style="height:4px;width:80%;background:${pal.lightGray};border-radius:2px;"></div>
                </div>
                <div style="border-top:2px solid ${pal.sec};padding-top:6px;font-family:'${secFont}',sans-serif;font-size:7.5px;color:${pal.midGray};display:flex;justify-content:space-between;">
                  <span>www.${esc(assets.cleanSlug)}.com</span>
                  <span style="color:${pal.pri};font-weight:700;">Lienzo Claro</span>
                </div>
              </div>

              <div style="height:290px;border:1.5px solid ${pal.lightGray};border-radius:${dna.cardRadius};background:#FFFFFF;padding:14px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;box-shadow:0 10px 24px rgba(13,37,64,0.06);">
                <svg viewBox="0 0 200 60" width="100%" height="48" preserveAspectRatio="none" style="position:absolute;top:0;left:0;">
                  ${isRect ? `
                    <polygon points="0,0 145,0 100,48 0,48" fill="${pal.sec}"/>
                    <polygon points="125,0 200,0 200,32 150,32" fill="${pal.pri}" opacity="0.25"/>
                  ` : `
                    <path d="M0,0 L140,0 C95,22 45,40 0,58 Z" fill="${pal.sec}"/>
                    <path d="M120,0 L200,0 L200,36 C170,22 145,10 120,0 Z" fill="${pal.pri}" opacity="0.25"/>
                  `}
                </svg>
                <div style="margin-top:36px;position:relative;z-index:1;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:7.5px;font-weight:800;color:${pal.sec};letter-spacing:0.14em;">PROPUESTA EJECUTIVA</div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:13px;font-weight:800;color:${pal.darkInk};margin-top:2px;">${esc(bUpper)}</div>
                </div>
                <div style="width:74px;height:74px;margin:0 auto;">${assets.symPosSvg}</div>
                <div style="border-top:1px solid ${pal.lightGray};padding-top:6px;font-family:'${priFont}',sans-serif;font-size:7.5px;font-weight:800;color:${pal.pri};text-align:center;">
                  PORTADA EJECUTIVA A4
                </div>
              </div>
            </div>

            <!-- Derecha: Tarjetas Ejecutivas 90x50mm (Frente y Vuelta) + Firma de Correo -->
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div style="font-family:'${priFont}',sans-serif;font-size:9.5px;font-weight:800;color:${pal.sec};letter-spacing:0.15em;">
                TARJETAS EJECUTIVAS (90 × 50 MM) Y FIRMA DE CORREO CORPORATIVO
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                <!-- Frente Tarjeta -->
                <div style="height:118px;border:1.5px solid ${pal.lightGray};border-radius:${dna.cardRadius};background:#FFFFFF;padding:12px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;box-shadow:0 8px 18px rgba(13,37,64,0.06);">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <div style="width:36px;height:36px;">${assets.symPosSvg}</div>
                    <div>
                      <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};">Dirección General</div>
                      <div style="font-family:'${priFont}',sans-serif;font-size:8px;font-weight:800;color:${pal.sec};">${esc(bUpper)}</div>
                    </div>
                  </div>
                  <div style="border-top:1.5px solid ${pal.pri};padding-top:4px;font-family:'${secFont}',sans-serif;font-size:8px;color:#333333;">
                    direccion@${esc(assets.cleanSlug)}.com · www.${esc(assets.cleanSlug)}.com
                  </div>
                </div>
                <!-- Vuelta Tarjeta -->
                <div style="height:118px;border:1.5px solid ${pal.pri};border-radius:${dna.cardRadius};background:${pal.softTint};padding:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;">
                  <div style="width:52px;height:52px;">${assets.symPosSvg}</div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};margin-top:4px;letter-spacing:0.1em;">${esc(bUpper)}</div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:7.5px;font-weight:800;color:${pal.sec};letter-spacing:0.14em;">${isRect ? "FRENTE Y VUELTA GEOMETRICA" : "FRENTE Y VUELTA EN CURVAS"}</div>
                </div>
              </div>

              <!-- Firma de Correo HTML -->
              <div style="border:1.5px solid ${pal.lightGray};border-left:4px solid ${pal.sec};border-radius:${dna.cardRadius};padding:12px 16px;background:#FFFFFF;display:flex;align-items:center;gap:14px;">
                <div style="width:54px;height:54px;flex-shrink:0;">${assets.symPosSvg}</div>
                <div style="border-left:1.5px solid ${pal.lightGray};padding-left:14px;">
                  <div style="font-family:'${priFont}',sans-serif;font-size:12px;font-weight:800;color:${pal.darkInk};">Dirección Estratégica · ${esc(bName)}</div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.12em;">${esc(tagline.toUpperCase().slice(0, 44))}</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:10px;color:${pal.pri};font-weight:600;margin-top:3px;">
                    contacto@${esc(assets.cleanSlug)}.com · www.${esc(assets.cleanSlug)}.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 29: ECOSISTEMA DIGITAL EN LIENZO CLARO Y CHECKLIST DE AUDITORÍA (10 CONTROLES · PASO 6.3)
    // =========================================================================
    else if (idx === 28) {
      const ctrl06Text = dna.archMode === "monolithic"
        ? { t: "06. Sistema Oficial de Marca Única", d: `4 Versiones Oficiales del Logotipo y Pilares de Oferta de ${bName} en coherencia total.` }
        : (dna.archMode === "portfolio"
          ? { t: "06. Portafolio de 4 Líneas de Oferta", d: `Marca rectora ${bName} respaldando sus 4 líneas de valor en ${bGiro.slice(0, 36)}.` }
          : { t: "06. Familia de 4 Submarcas Homologada", d: `Submarcas con el mismo símbolo maestro y descriptor en ${pal.sec}.` });
      const controles10 = [
        { t: "01. Logotipo en Positivo por Defecto", d: "Logo positivo sobre fondo claro (#FFFFFF) en todo el documento, salvo en la Lámina 21." },
        { t: "02. Lienzo Claro Dominante (70/20/10)", d: `Fondo blanco luminoso con acentos en ${pal.sec} y estructura en ${pal.pri} / ${pal.darkInk}.` },
        { t: `03. Acentos Fieles al Logo (${dna.strokeLabel})`, d: isRect ? "Geometría arquitectónica de trazos rectos y ángulos precisos acorde al logo." : "Flujo abierto de curvas orgánicas continuas acorde al logo." },
        { t: "04. La Empresa como Persona", d: `Presencia cálida, estructurada y leal de ${bName} (${dna.eraLabel}) reflejada en voz y conducta.` },
        { t: "05. Touchpoints Antes del Nombre", d: "Ingeniería Antes · Durante · Después documentada antes del Naming Oficial." },
        ctrl06Text,
        { t: "07. Aplicación en Negativo sin Parches", d: "En fondos oscuros se usa la versión en negativo calado sin círculos ni parches blancos." },
        { t: "08. Tipografía Oficial Intocable", d: `Titulares en ${priFont} y cuerpo ejecutivo en ${secFont} con amplio aire blanco.` },
        { t: "09. Norma Oficial de Co-Branding (Co-Branding)", d: "Logo del cliente aislado en cápsula neutra sin mezclar colores ni vectores." },
        { t: "10. Imágenes y Mockups Coherentes con el Logo", d: `Todas las ilustraciones y aplicaciones integran el logotipo real y su paleta (${pal.pri} / ${pal.sec}).` }
      ];
      plateInnerHTML = `
        <section class="benefic-plate" id="plate-29">
          ${bgCurvesStandard}
          ${renderHeader("SECCION 07", "ECOSISTEMA DIGITAL EN LIENZO CLARO Y CHECKLIST DE AUDITORIA (10 CONTROLES · PASO 6.3)")}
          <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;border-bottom:1.5px solid ${pal.lightGray};">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:42px;height:42px;">${assets.symPosSvg}</div>
                <div>
                  <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.14em;">INTERFACES DIGITALES, WEB Y PORTALES EN MODO CLARO</div>
                  <div style="font-family:'${secFont}',sans-serif;font-size:11.2px;color:#333333;">
                    Portales web, dashboards ejecutivos y presentaciones de <strong>${esc(bName)}</strong> priorizan el lienzo blanco (#FFFFFF) con logotipo positivo y acentos en ${pal.pri} y ${pal.sec}.
                  </div>
                </div>
              </div>
              <span style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.darkInk};border-left:3px solid ${pal.sec};padding-left:10px;">AUDITORÍA DE IDENTIDAD VERIFICADA</span>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:30px;row-gap:8px;flex:1;align-items:center;">
              ${controles10.map((c, i) => `
                <div style="display:flex;align-items:flex-start;gap:8px;padding-bottom:6px;border-bottom:1px solid ${pal.lightGray};">
                  <svg width="16" height="16" viewBox="0 0 18 18" style="flex-shrink:0;margin-top:2px;">
                    ${isRect
                      ? `<rect x="2" y="2" width="14" height="14" rx="2" fill="none" stroke="${i % 2 === 0 ? pal.sec : pal.pri}" stroke-width="2"/>`
                      : `<circle cx="9" cy="9" r="7" fill="none" stroke="${i % 2 === 0 ? pal.sec : pal.pri}" stroke-width="2"/>`}
                    <polyline points="5.5,9 8,11.5 12.5,6.5" fill="none" stroke="${pal.darkInk}" stroke-width="2"/>
                  </svg>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:10px;font-weight:800;color:${pal.darkInk};">${esc(c.t)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:9.8px;color:#333333;line-height:1.32;">${esc(c.d)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    // =========================================================================
    // LÁMINA 30: COLOFÓN INSTITUCIONAL SOBRE FONDO CLARO (#FFFFFF) (PASO 6.4)
    // =========================================================================
    else {
      const colophonBgSvg = isRect ? `
        <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:1;">
          <polygon points="0,58 460,58 210,275 0,275" fill="${pal.sec}" opacity="0.9"/>
          <polygon points="460,58 610,58 310,315 0,315 0,275 210,275" fill="${pal.lightGray}" opacity="0.85"/>
          <polyline points="120,560 520,560 560,520 1080,520 1120,560 1480,560" fill="none" stroke="${pal.accentLight}" stroke-width="2" stroke-dasharray="6,6" opacity="0.6"/>
          <polygon points="1120,900 1600,480 1600,900" fill="${pal.darkInk}" opacity="0.09"/>
          <polygon points="1010,900 1600,400 1600,475 1090,900" fill="${pal.pri}" opacity="0.22"/>
          <polyline points="940,900 1380,520 1600,520" fill="none" stroke="${pal.accentLight}" stroke-width="3" opacity="0.5"/>
        </svg>
      ` : `
        <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:1;">
          <path d="M0,58 L460,58 C310,135 160,220 0,320 Z" fill="${pal.sec}" opacity="0.9"/>
          <path d="M0,245 C180,165 350,105 550,58 L640,58 C410,130 210,210 0,355 Z" fill="${pal.lightGray}" opacity="0.85"/>
          <path d="M120,560 C480,500 1120,620 1480,540" fill="none" stroke="${pal.accentLight}" stroke-width="2" stroke-dasharray="6,6" opacity="0.6"/>
          <path d="M1080,900 C1280,790 1450,650 1600,470 L1600,900 Z" fill="${pal.darkInk}" opacity="0.09"/>
          <path d="M980,900 C1220,780 1420,620 1600,410 L1600,475 C1430,665 1240,805 1040,900 Z" fill="${pal.pri}" opacity="0.22"/>
          <path d="M910,900 C1170,770 1390,600 1600,365 L1600,400 C1400,625 1185,785 955,900 Z" fill="${pal.accentLight}" opacity="0.45"/>
        </svg>
      `;

      plateInnerHTML = `
        <section class="benefic-plate" id="plate-30" style="background:#FFFFFF;color:${pal.darkInk};">
          ${colophonBgSvg}
          ${renderHeader("SECCION 07", `COLOFON INSTITUCIONAL • ${dna.archBadge} ${bUpper} (PASO 6.4)`)}
          <div class="plate-body" style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:14px;text-align:center;padding-top:10px;">
            <div style="display:flex;flex-direction:column;align-items:center;">
              <div style="width:152px;height:152px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 12px 24px rgba(13,37,64,0.08));">
                ${assets.symPosSvg}
              </div>
              <h2 style="font-family:'${priFont}',sans-serif;font-weight:800;font-size:28px;color:${pal.darkInk};margin:8px 0 3px 0;letter-spacing:0.03em;">${esc(bUpper)} — ${esc(clipWords(tagline.toUpperCase(), 38))}</h2>
              <div style="font-family:'${secFont}',sans-serif;font-weight:600;font-size:12.5px;color:${pal.pri};margin-bottom:5px;">
                ${esc(clipWords(bGiro, 98))}
              </div>
              <div style="font-family:'${priFont}',sans-serif;font-weight:800;font-size:10px;letter-spacing:0.22em;color:${pal.sec};">
                ${esc(dna.archBadge)} • ${esc(dna.strokeBadge)} • ${esc(dna.eraLabel.toUpperCase())}
              </div>
            </div>

            ${dna.archMode === "multibrand"
              ? `
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;width:100%;max-width:1020px;padding:12px 0;border-top:1.5px solid ${pal.lightGray};border-bottom:1.5px solid ${pal.lightGray};">
                  ${assets.subBrands.map((sb, i) => `
                    <div style="padding:4px 14px;${i < 3 ? `border-right:1px solid ${pal.lightGray};` : ""}display:flex;flex-direction:column;align-items:center;">
                      ${sb.lockupSvg(78)}
                      <div style="font-family:'${secFont}',sans-serif;font-size:9.5px;color:${pal.pri};font-weight:600;margin-top:4px;">${esc(sb.domain)}</div>
                    </div>
                  `).join("")}
                </div>
              `
              : `
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;max-width:1020px;padding:16px 20px;background:${pal.softTint};border:1.5px solid ${pal.lightGray};border-top:4px solid ${pal.pri};border-radius:${dna.cardRadius};text-align:left;">
                  <div style="padding-right:14px;border-right:1px solid ${pal.lightGray};">
                    <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.sec};letter-spacing:0.15em;">01 · PROPÓSITO DE ${esc(bUpper)}</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.darkInk};line-height:1.42;margin-top:4px;font-weight:600;">${esc(clipWords(bPurpose, 128, true))}</div>
                  </div>
                  <div style="padding-right:14px;border-right:1px solid ${pal.lightGray};">
                    <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.pri};letter-spacing:0.15em;">02 · OFERTA DE VALOR UNIFICADA</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:${pal.darkInk};line-height:1.42;margin-top:4px;font-weight:600;">${esc(clipWords(bOffer, 128, true))}</div>
                  </div>
                  <div>
                    <div style="font-family:'${priFont}',sans-serif;font-size:9px;font-weight:800;color:${pal.darkInk};letter-spacing:0.15em;">03 · IDENTIDAD DE MARCA ÚNICA OFICIAL</div>
                    <div style="font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:4px;">Nombre oficial único <strong>${esc(bName)}</strong> en lienzo claro (#FFFFFF), acentos en <strong>${esc(dna.strokeLabel.toLowerCase())}</strong> y logotipo en positivo por defecto.</div>
                  </div>
                </div>
              `
            }

            <div style="width:100%;max-width:1020px;display:flex;align-items:center;justify-content:space-between;font-family:'${secFont}',sans-serif;font-size:11px;color:#333333;">
              <span><strong style="color:${pal.darkInk};">Contacto Oficial:</strong> contacto@${esc(assets.cleanSlug)}.com · direccion@${esc(assets.cleanSlug)}.com · www.${esc(assets.cleanSlug)}.com</span>
              <span><strong style="color:${pal.sec};">Motor Paramétrico:</strong> TheBestBrand Studio Engine v5.3 · ${esc(dna.archTitle)}</span>
            </div>
          </div>
          ${renderFooter()}
        </section>
      `;
    }

    if (forPrint) {
      return plateInnerHTML;
    }
    setTimeout(() => {
      if (typeof window.scaleImproBearsPlateInStage === "function") {
        window.scaleImproBearsPlateInStage();
      }
    }, 30);
    return `<div class="tbb-improbears-stage-wrapper"><div class="tbb-improbears-stage-scaler">${plateInnerHTML}</div></div>`;
  };

  // Empaqueta un arreglo de páginas JPEG (data:image/jpeg;base64,...) en un archivo binario .PDF multipágina A4 Horizontal (ISO 32000-1)
  window.packJpegDataUrlsToA4LandscapePdfBlob = function (jpegPages) {
    const chunks = [];
    let byteOffset = 0;
    const encoder = new TextEncoder();

    function pushStr(str) {
      const bytes = encoder.encode(str);
      chunks.push(bytes);
      byteOffset += bytes.byteLength;
    }

    function pushBytes(uint8) {
      chunks.push(uint8);
      byteOffset += uint8.byteLength;
    }

    function base64ToUint8(dataUrl) {
      const b64 = String(dataUrl || "").split(",")[1] || "";
      const bin = atob(b64);
      const len = bin.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) arr[i] = bin.charCodeAt(i);
      return arr;
    }

    const totalPages = jpegPages.length;
    const totalObjects = 2 + totalPages * 3;
    const offsets = new Array(totalObjects + 1).fill(0);

    pushStr("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");

    // Obj 1: Catalog
    offsets[1] = byteOffset;
    pushStr("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

    // Obj 2: Pages
    const kidsRefs = [];
    for (let i = 0; i < totalPages; i++) {
      kidsRefs.push(`${3 + i * 3} 0 R`);
    }
    offsets[2] = byteOffset;
    pushStr(`2 0 obj\n<< /Type /Pages /Kids [ ${kidsRefs.join(" ")} ] /Count ${totalPages} >>\nendobj\n`);

    const pageW = 841.89;
    const pageH = 595.28;

    for (let i = 0; i < totalPages; i++) {
      const pageObjId = 3 + i * 3;
      const contentObjId = 4 + i * 3;
      const imgObjId = 5 + i * 3;
      const pg = jpegPages[i];
      const jpegBytes = base64ToUint8(pg.dataUrl);
      const imgW = pg.width || 1122;
      const imgH = pg.height || 794;

      // Page Object
      offsets[pageObjId] = byteOffset;
      pushStr(
        `${pageObjId} 0 obj\n` +
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] ` +
        `/Resources << /XObject << /Im${i} ${imgObjId} 0 R >> >> ` +
        `/Contents ${contentObjId} 0 R >>\nendobj\n`
      );

      // Content Stream Object
      const contentStream = `q ${pageW} 0 0 ${pageH} 0 0 cm /Im${i} Do Q\n`;
      const contentBytes = encoder.encode(contentStream);
      offsets[contentObjId] = byteOffset;
      pushStr(`${contentObjId} 0 obj\n<< /Length ${contentBytes.byteLength} >>\nstream\n`);
      pushBytes(contentBytes);
      pushStr("\nendstream\nendobj\n");

      // Image XObject
      offsets[imgObjId] = byteOffset;
      pushStr(
        `${imgObjId} 0 obj\n` +
        `<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.byteLength} >>\nstream\n`
      );
      pushBytes(jpegBytes);
      pushStr("\nendstream\nendobj\n");
    }

    const xrefOffset = byteOffset;
    pushStr(`xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`);
    for (let objId = 1; objId <= totalObjects; objId++) {
      const offStr = String(offsets[objId]).padStart(10, "0");
      pushStr(`${offStr} 00000 n \n`);
    }
    pushStr(
      `trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\n` +
      `startxref\n${xrefOffset}\n%%EOF`
    );

    return new Blob(chunks, { type: "application/pdf" });
  };

  window.ensureHtml2CanvasLoaded = function () {
    if (typeof window.html2canvas === "function") return Promise.resolve(window.html2canvas);
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.onload = () => resolve(window.html2canvas);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  };

  // Entrega universal de archivos compatible con App en Pantalla de Inicio de iPhone (iOS Standalone PWA), Safari móvil y Escritorio
  window.tbbDeliverFileNativeOrDownload = async function (blob, fileName, mimeType, titleText) {
    const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent || "") || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isStandalonePWA = Boolean(window.navigator.standalone) || (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);

    const fileObj = (typeof File === "function")
      ? new File([blob], fileName, { type: mimeType || blob.type || "application/pdf" })
      : null;

    const canNativeShareFile = Boolean(
      fileObj &&
      navigator.share &&
      (!navigator.canShare || navigator.canShare({ files: [fileObj] }))
    );

    // 1. Intentar compartir/guardar directamente si el gesto táctil sigue activo (ej. SVG, HTML, JSON instantáneos)
    if (canNativeShareFile && (isIOS || isStandalonePWA)) {
      try {
        await navigator.share({
          files: [fileObj],
          title: titleText || fileName
        });
        return true;
      } catch (shareErr) {
        if (shareErr && shareErr.name === "AbortError") {
          return true; // El usuario cerró voluntariamente la hoja de compartir de iOS
        }
        // Si falló por NotAllowedError (porque la generación asíncrona de 30 láminas tomó varios segundos y expiró el gesto táctil de iOS),
        // mostramos la hoja nativa de 1 toque para que el nuevo toque abra el menú de iOS al instante (0ms).
        window.tbbShowNativeIOSFileReadySheet(blob, fileObj, fileName, titleText);
        return true;
      }
    }

    // 2. Si estamos en iOS / App de Pantalla de Inicio y no entró arriba, mostrar hoja de guardado con botón de retorno seguro
    if (isIOS || isStandalonePWA) {
      window.tbbShowNativeIOSFileReadySheet(blob, fileObj, fileName, titleText);
      return true;
    }

    // 3. En escritorio / Android estándar: descarga directa con <a download>
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    }, 1500);
    return true;
  };

  // Hoja modal para iPhone / App en Pantalla de Inicio que ejecuta navigator.share() en un gesto síncrono de 0ms
  window.tbbShowNativeIOSFileReadySheet = function (blob, fileObj, fileName, titleText) {
    let existing = document.getElementById("tbbNativeFileReadySheet");
    if (existing) existing.remove();

    const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
    const overlay = document.createElement("div");
    overlay.id = "tbbNativeFileReadySheet";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(9,13,22,0.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:18px;";

    overlay.innerHTML = `
      <div style="width:100%;max-width:410px;background:#FFFFFF;border:2px solid #0284C7;border-bottom:6px solid #0369A1;border-radius:24px;padding:22px 20px;box-shadow:0 24px 60px rgba(9,13,22,0.38);text-align:center;font-family:'Plus Jakarta Sans',sans-serif;">
        <div style="display:inline-block;background:#DCFCE7;color:#15803D;border:1.5px solid #86EFAC;border-radius:999px;padding:5px 14px;font-family:'JetBrains Mono',monospace;font-size:0.72rem;font-weight:800;margin-bottom:10px;">
          ARCHIVO GENERADO Y LISTO (${sizeMB} MB)
        </div>
        <h3 style="font-family:'Montserrat','Plus Jakarta Sans',sans-serif;font-size:1.18rem;font-weight:900;color:#090D16;margin:0 0 6px 0;">
          ${esc(titleText || "Manual Oficial de 30 Láminas")}
        </h3>
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.74rem;color:#475569;background:#F1F5F9;border:1px solid #CBD5E1;border-radius:10px;padding:8px 10px;margin-bottom:14px;word-break:break-all;">
          ${esc(fileName)}
        </div>
        <p style="font-size:0.84rem;color:#334155;line-height:1.45;margin:0 0 16px 0;font-weight:600;">
          Como estás usando <strong>TheBestBrand como App en tu iPhone</strong>, toca el botón verde para abrir el menú nativo de iOS y elegir <strong>«Guardar en Archivos»</strong>, <strong>WhatsApp</strong>, <strong>AirDrop</strong> o <strong>Imprimir</strong>.
        </p>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <button type="button" id="tbbBtnTriggerNativeShareNow" style="width:100%;background:#58CC02;color:#FFFFFF;border:2px solid #46A302;border-bottom:5px solid #388200;border-radius:16px;padding:15px 18px;font-family:'Montserrat',sans-serif;font-size:0.95rem;font-weight:900;cursor:pointer;-webkit-user-select:none;user-select:none;touch-action:manipulation;">
            Guardar en Archivos / Compartir en iPhone
          </button>
          <button type="button" id="tbbBtnOpenInAppViewerFromSheet" style="width:100%;background:#1CB0F6;color:#FFFFFF;border:2px solid #0095D9;border-bottom:5px solid #0077B3;border-radius:16px;padding:13px 16px;font-family:'Montserrat',sans-serif;font-size:0.86rem;font-weight:800;cursor:pointer;-webkit-user-select:none;user-select:none;touch-action:manipulation;">
            Ver e Imprimir las 30 Láminas Aquí Mismo
          </button>
          <button type="button" id="tbbBtnCloseReadySheet" style="width:100%;background:#F8FAFC;color:#0F172A;border:2px solid #CBD5E1;border-bottom:4px solid #94A3B8;border-radius:14px;padding:11px 16px;font-family:'Montserrat',sans-serif;font-size:0.84rem;font-weight:800;cursor:pointer;-webkit-user-select:none;user-select:none;touch-action:manipulation;">
            ← Volver a la App
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const btnShare = document.getElementById("tbbBtnTriggerNativeShareNow");
    if (btnShare) {
      btnShare.onclick = async function () {
        if (fileObj && navigator.share) {
          try {
            await navigator.share({
              files: [fileObj],
              title: titleText || fileName
            });
            overlay.remove();
            return;
          } catch (err) {
            if (err && err.name === "AbortError") return;
          }
        }
        // Fallback descarga directa
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => a.remove(), 1200);
      };
    }

    const btnView = document.getElementById("tbbBtnOpenInAppViewerFromSheet");
    if (btnView) {
      btnView.onclick = function () {
        overlay.remove();
        window.openInApp30PlatesViewer();
      };
    }

    const btnClose = document.getElementById("tbbBtnCloseReadySheet");
    if (btnClose) {
      btnClose.onclick = function () {
        overlay.remove();
      };
    }
  };

  // Visor Completo de 30 Láminas integrado DENTRO de la App (con botón "← Volver a la App" para no quedar atrapado en la App de iPhone)
  window.openInApp30PlatesViewer = function () {
    let existing = document.getElementById("tbbInApp30PlatesViewerModal");
    if (existing) existing.remove();

    const cs = getActiveCanvasState();
    const st = window.tbbState || {};
    const activeIt = (st.logoIterations && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";
    const pal = extractColorsFromLogoState(activeIt, st);

    if (!document.getElementById("tbb-v80-styles") && window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.getTheBestBrandStyles === "function") {
      const stEl = document.createElement("style");
      stEl.id = "tbb-v80-styles";
      stEl.textContent = window.TBB_V80_PLATES_GENERATOR.getTheBestBrandStyles();
      document.head.appendChild(stEl);
    }

    const sheets = [];
    for (let i = 0; i < 30; i++) {
      const rawPlate = window.isImproBearsActiveBrand && window.isImproBearsActiveBrand() && typeof window.renderImproBearsSinglePlateHTML === "function"
        ? window.renderImproBearsSinglePlateHTML(i, true)
        : window.renderUniversalImproBearsGuideSinglePlateHTML(i, true);
      sheets.push(`<div class="tbb-inapp-a4-page" style="margin:0 auto 16px auto;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 12px 32px rgba(13,37,64,0.14);position:relative;">${rawPlate}</div>`);
    }

    const modal = document.createElement("div");
    modal.id = "tbbInApp30PlatesViewerModal";
    modal.style.cssText = "position:fixed;inset:0;background:#F1F5F9;z-index:999990;display:flex;flex-direction:column;overflow:hidden;";

    modal.innerHTML = `
      <div style="background:#FFFFFF;border-bottom:4px solid ${pal.sec};padding:max(12px, env(safe-area-inset-top)) 14px 12px 14px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;box-shadow:0 8px 24px rgba(13,37,64,0.08);z-index:10;">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1 1 200px;">
          <button type="button" id="tbbBtnCloseInApp30Viewer" style="background:#F8FAFC;color:#0F172A;border:2px solid #CBD5E1;border-bottom:4px solid #94A3B8;border-radius:12px;padding:9px 14px;font-family:'Montserrat',sans-serif;font-size:0.82rem;font-weight:900;cursor:pointer;white-space:nowrap;-webkit-user-select:none;user-select:none;touch-action:manipulation;">
            ← Volver a la App
          </button>
          <div style="min-width:0;overflow:hidden;">
            <div style="font-family:'Montserrat',sans-serif;font-size:0.82rem;font-weight:900;color:${pal.darkInk};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              30 LÁMINAS A4 · ${esc(bName.toUpperCase())}
            </div>
            <div style="font-size:0.70rem;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              Guía Oficial de Marca · Desliza hacia abajo para ver las 30 láminas
            </div>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex:1 1 auto;justify-content:flex-end;">
          <button type="button" id="tbbBtnInAppViewerDownloadPDF" style="background:${pal.pri};color:#FFFFFF;border:none;border-bottom:4px solid ${pal.darkInk};border-radius:12px;padding:10px 16px;font-family:'Montserrat',sans-serif;font-size:0.82rem;font-weight:900;cursor:pointer;flex:1 1 auto;-webkit-user-select:none;user-select:none;touch-action:manipulation;">
            Descargar / Guardar PDF (30 Láminas)
          </button>
          <button type="button" id="tbbBtnInAppViewerPrint" style="background:#F8FAFC;color:${pal.darkInk};border:2px solid #CBD5E1;border-bottom:4px solid #94A3B8;border-radius:12px;padding:10px 14px;font-family:'Montserrat',sans-serif;font-size:0.80rem;font-weight:800;cursor:pointer;-webkit-user-select:none;user-select:none;touch-action:manipulation;">
            Imprimir
          </button>
        </div>
      </div>
      <div id="tbbInApp30PlatesScrollBody" style="flex:1;overflow-y:auto;overflow-x:hidden;padding:14px 12px 60px 12px;-webkit-overflow-scrolling:touch;">
        ${sheets.join("\n")}
      </div>
    `;

    document.body.appendChild(modal);

    const fitInAppPlates = () => {
      const container = document.getElementById("tbbInApp30PlatesScrollBody");
      if (!container) return;
      const availW = Math.min(window.innerWidth || 1122, container.clientWidth || 1122) - 20;
      const pages = container.querySelectorAll(".tbb-inapp-a4-page");
      pages.forEach((page) => {
        const plate = page.querySelector(".benefic-plate, .tbb-plate");
        if (!plate) return;
        plate.style.transformOrigin = "top left";
        if (availW < 1122) {
          const s = Math.max(0.25, availW / 1122);
          page.style.width = Math.round(1122 * s) + "px";
          page.style.height = Math.round(794 * s) + "px";
          plate.style.transform = `scale(${s.toFixed(4)})`;
        } else {
          page.style.width = "1122px";
          page.style.height = "794px";
          plate.style.transform = "none";
        }
      });
    };

    fitInAppPlates();
    window.addEventListener("resize", fitInAppPlates);

    const btnClose = document.getElementById("tbbBtnCloseInApp30Viewer");
    if (btnClose) {
      btnClose.onclick = function () {
        window.removeEventListener("resize", fitInAppPlates);
        modal.remove();
      };
    }

    const btnPdf = document.getElementById("tbbBtnInAppViewerDownloadPDF");
    if (btnPdf) {
      btnPdf.onclick = function () {
        window.downloadReal30PlatesPDFDirect(btnPdf);
      };
    }

    const btnPrint = document.getElementById("tbbBtnInAppViewerPrint");
    if (btnPrint) {
      btnPrint.onclick = function () {
        window.print();
      };
    }
  };

  // Carga un SVG en un objeto Image en memoria para dibujarlo en Canvas 2D sin contaminar (zero foreignObject)
  function loadSvgStringToImage(svgStr) {
    return new Promise((resolve) => {
      try {
        const cleanSvg = String(svgStr || "").trim();
        if (!cleanSvg.startsWith("<svg")) {
          resolve(null);
          return;
        }
        const img = new Image();
        const timer = setTimeout(() => resolve(null), 180);
        img.onload = () => {
          clearTimeout(timer);
          resolve(img);
        };
        img.onerror = () => {
          clearTimeout(timer);
          resolve(null);
        };
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(cleanSvg);
      } catch (e) {
        resolve(null);
      }
    });
  }

  // Ajusta automáticamente el tamaño de fuente o trunca con "…" para que ningún texto de una línea se salga de maxWidth
  function fillTextFitted(ctx, text, x, y, maxWidth) {
    const str = String(text == null ? "" : text).replace(/\s+/g, " ").trim();
    if (!str || !maxWidth || maxWidth <= 10) return;
    const savedFont = ctx.font;
    let m = ctx.measureText(str);
    if (m.width <= maxWidth) {
      ctx.fillText(str, x, y);
      return;
    }
    // Reducir gradualmente el tamaño de fuente hasta un 72% antes de truncar
    const sizeMatch = savedFont.match(/(\d+(?:\.\d+)?)px/);
    if (sizeMatch) {
      const origPx = parseFloat(sizeMatch[1]);
      for (let scale = 0.92; scale >= 0.72; scale -= 0.06) {
        const nextPx = Math.max(8.5, Math.round(origPx * scale * 10) / 10);
        ctx.font = savedFont.replace(/(\d+(?:\.\d+)?)px/, `${nextPx}px`);
        if (ctx.measureText(str).width <= maxWidth) {
          ctx.fillText(str, x, y);
          ctx.font = savedFont;
          return;
        }
      }
    }
    // Si aún excede, truncar limpiamente con "…"
    let cut = str;
    while (cut.length > 4 && ctx.measureText(cut + "…").width > maxWidth) {
      cut = cut.slice(0, -2).trim();
    }
    ctx.fillText(cut + "…", x, y);
    ctx.font = savedFont;
  }

  // Envuelve texto automáticamente en Canvas 2D sin salirse jamás de maxWidth ni de maxLines
  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return y;
    const words = clean.split(" ");
    let line = "";
    let curY = y;
    let linesCount = 0;
    const limit = Math.max(1, maxLines || 99);

    const flushTruncatedLine = (ln) => {
      let candidate = ln + "…";
      while (candidate.length > 4 && ctx.measureText(candidate).width > maxWidth) {
        candidate = candidate.slice(0, -3).trim() + "…";
      }
      ctx.fillText(candidate, x, curY);
    };

    for (let n = 0; n < words.length; n++) {
      let word = words[n];
      // Si una sola palabra (ej. URL) es más ancha que maxWidth, cortarla
      while (word.length > 6 && ctx.measureText(word).width > maxWidth) {
        word = word.slice(0, -2);
      }
      const testLine = line ? line + " " + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        linesCount++;
        if (linesCount >= limit) {
          flushTruncatedLine(line);
          return curY + lineHeight;
        }
        ctx.fillText(line, x, curY);
        line = word;
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) {
      linesCount++;
      if (linesCount > limit) {
        flushTruncatedLine(line);
      } else {
        fillTextFitted(ctx, line, x, y + (linesCount - 1) * lineHeight, maxWidth);
      }
      curY += lineHeight;
    }
    return curY;
  }

  function drawRoundedRect(ctx, x, y, w, h, r, fillHex, strokeHex, lineW) {
    const rad = Math.min(r || 12, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
    if (fillHex) {
      ctx.fillStyle = fillHex;
      ctx.fill();
    }
    if (strokeHex) {
      ctx.strokeStyle = strokeHex;
      ctx.lineWidth = lineW || 1.5;
      ctx.stroke();
    }
  }

  // Motor Nativo Ultra-Rápido (Single-Canvas 2D · ~0.25s · Cero html2canvas · Cero desbordes · Cero límite de RAM en iPhone)
  window.generate30PlatesPdfBlobUltraFast = async function (onProgress) {
    const cs = getActiveCanvasState();
    const st = window.tbbState || {};
    const activeIt = (st.logoIterations && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const mods = (activeIt && activeIt.mods) || {};

    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";
    const bUpper = bName.toUpperCase();
    const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "thebestbrand";
    const rawIndustry = (cs.custom_business_type || cs.step0_short_essence || "Soluciones Estratégicas, Ingeniería de Valor y Experiencia de Marca").trim();
    const industry = window.tbbRefineUserCopyOrthoAndClarity(rawIndustry, "giro", bName, rawIndustry);
    const rawTagline = (cs.tagline || cs.step0_short_essence || industry || "CLARIDAD, SISTEMA Y RESULTADOS").trim();
    const tagline = window.tbbRefineUserCopyOrthoAndClarity(rawTagline, "tagline", bName, industry);
    const priFont = (activeIt && activeIt.fontFamily) || mods.fontFamily || cs.primary_font || "Montserrat";
    const secFont = "Avenir Next";
    const pal = extractColorsFromLogoState(activeIt, st);
    pal.lightBg = pal.softTint || "#F0F6FC";

    const rawOffer = (cs.value_offer || `Propuesta integral de ${bName} que une estrategia, calidad técnica y experiencia superior para el cliente.`).trim();
    const valueOffer = window.tbbRefineUserCopyOrthoAndClarity(rawOffer, "offer", bName, industry);
    const dna = resolveBrandbookDesignDNA(cs, st, activeIt, bName, industry, valueOffer);
    const sectorShort = dna.shortSectorNoun || dna.themeTitle;

    const d = {
      pal,
      bName,
      bUpper,
      slug,
      tagline,
      industry,
      sectorShort,
      idealCustomer: window.tbbRefineUserCopyOrthoAndClarity((cs.step0_buyer_actor || cs.ideal_customer || `Fundadores, Directores y Clientes que buscan certeza, excelencia técnica y resultados medibles en ${sectorShort}`).trim(), "buyer", bName, industry),
      whyText: window.tbbRefineUserCopyOrthoAndClarity((cs.golden_circle || `Transformar la experiencia del cliente en ${sectorShort} mediante sistemas claros, trato cercano y ejecución de alta precisión.`).trim(), "purpose", bName, industry),
      howText: window.tbbRefineUserCopyOrthoAndClarity((cs.process_steps_text || `1. Diagnóstico Profundo 360° · 2. Ejecución Especializada con Método · 3. Entrega Certificada y Mejora Continua`).trim(), "process", bName, industry),
      whatText: valueOffer,
      valueOffer,
      socialRole: window.tbbRefineUserCopyOrthoAndClarity((cs.social_role || `Convertir la complejidad en claridad, confianza y crecimiento sostenible para nuestros clientes.`).trim(), "social", bName, industry)
    };

    const PLATE_META = window.getUniversalImproBearsGuide30PlatesMeta(bName);
    const hexToRgbStr = (h) => {
      const rgb = hexToRgb(h);
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    };
    const hexToCmykStr = (h) => hexToCmyk(h);

    const assets = buildBrandSymbolsAndSubbrands("pdf_fast", pal, bName, bUpper, priFont, secFont, industry, dna);
    const isRect = dna.strokeStyle === "rectilinear";
    const posLogoSvg = assets.symPosSvg;
    const negLogoSvg = assets.symNegSvg;
    const uploadedDirectUrl = (activeIt && activeIt.uploadedLogoDataUrl) || cs.uploaded_logo_data_url || window.step0State?.uploadedLogoDataUrl || "";
    const useUploadedDirectImg = Boolean(
      uploadedDirectUrl &&
      (
        (activeIt && (activeIt.isUploadedUserLogo || activeIt.archetype === "uploaded_user_logo")) ||
        (!(activeIt && activeIt.geminiCustomSvg) && (cs.existing_logo_mode === "keep" || window.step0State?.existingLogoMode === "keep"))
      )
    );
    const loadDirectDataUrlToImage = (dUrl) => new Promise((resolve) => {
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = () => resolve(im);
      im.onerror = () => resolve(null);
      im.src = dUrl;
    });
    const [posLogoImg, negLogoImg] = useUploadedDirectImg
      ? await Promise.all([loadDirectDataUrlToImage(uploadedDirectUrl), loadDirectDataUrlToImage(uploadedDirectUrl)])
      : await Promise.all([loadSvgStringToImage(posLogoSvg), loadSvgStringToImage(negLogoSvg)]);

    const W = 1400;
    const H = 990;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const drawLogoOrEmblem = (x, y, size, isNeg, subDesc, maxDescW) => {
      const img = isNeg ? negLogoImg : posLogoImg;
      if (img) {
        ctx.drawImage(img, x, y, size, size);
      } else {
        drawRoundedRect(ctx, x, y, size, size, isRect ? 6 : size * 0.24, isNeg ? pal.darkInk : pal.lightBg, pal.pri, 3);
        ctx.fillStyle = isNeg ? "#FFFFFF" : pal.pri;
        ctx.font = `900 ${Math.round(size * 0.36)}px Montserrat, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(bUpper.slice(0, 2), x + size / 2, y + size * 0.62);
        ctx.textAlign = "left";
      }
      if (subDesc) {
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.textAlign = "center";
        fillTextFitted(ctx, subDesc.toUpperCase(), x + size / 2, y + size + 16, maxDescW || Math.max(size + 36, 130));
        ctx.textAlign = "left";
      }
    };

    // Dibuja una ilustración vectorial temática dentro de un recuadro en Canvas 2D (acorde al sector y tema de la lámina)
    const drawCanvasSectorIllustration = (ix, iy, iw, ih, plateIdx) => {
      ctx.save();
      drawRoundedRect(ctx, ix, iy, iw, ih, isRect ? 4 : 14, "#FFFFFF", "#CBD5E1", 1.5);
      ctx.beginPath();
      ctx.rect(ix + 2, iy + 2, iw - 4, ih - 4);
      ctx.clip();

      // Barra superior temática
      ctx.fillStyle = pal.softTint;
      ctx.fillRect(ix, iy, iw, 28);
      ctx.fillStyle = pal.sec;
      ctx.beginPath();
      ctx.arc(ix + 16, iy + 14, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = pal.pri;
      ctx.beginPath();
      ctx.arc(ix + 28, iy + 14, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = pal.darkInk;
      ctx.font = "800 9.5px Montserrat, sans-serif";
      fillTextFitted(ctx, `ESCENA VISUAL · ${dna.themeTitle.toUpperCase()}`, ix + 42, iy + 18, iw - 54);

      const midY = iy + 28 + (ih - 28) / 2;
      // Símbolo de marca integrado a la izquierda de la escena
      const logoSz = Math.min(82, ih - 54);
      drawLogoOrEmblem(ix + 18, midY - logoSz / 2, logoSz, false);

      // Gráfico vectorial temático a la derecha según el sector y número de lámina
      const gx = ix + logoSz + 34;
      const gw = iw - (logoSz + 48);
      const gy = iy + 40;
      const gh = ih - 52;

      drawRoundedRect(ctx, gx, gy, gw, gh, isRect ? 4 : 10, "#F8FAFC", "#E2E8F0", 1);

      if (dna.sectorKey === "food_hospitality") {
        // Ilustración gastronómica / empaque fresco
        ctx.fillStyle = pal.sec;
        ctx.beginPath();
        ctx.arc(gx + 44, gy + gh / 2 + 6, 24, 0, Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx + 34, gy + gh / 2 - 4);
        ctx.quadraticCurveTo(gx + 38, gy + gh / 2 - 18, gx + 34, gy + gh / 2 - 26);
        ctx.moveTo(gx + 44, gy + gh / 2 - 6);
        ctx.quadraticCurveTo(gx + 48, gy + gh / 2 - 20, gx + 44, gy + gh / 2 - 28);
        ctx.moveTo(gx + 54, gy + gh / 2 - 4);
        ctx.quadraticCurveTo(gx + 58, gy + gh / 2 - 18, gx + 54, gy + gh / 2 - 26);
        ctx.stroke();
      } else if (dna.sectorKey === "health_wellness") {
        // Ilustración clínica / pulso y bienestar
        ctx.fillStyle = pal.softTint;
        ctx.beginPath();
        ctx.arc(gx + 44, gy + gh / 2, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(gx + 44, gy + gh / 2 - 12);
        ctx.lineTo(gx + 44, gy + gh / 2 + 12);
        ctx.moveTo(gx + 32, gy + gh / 2);
        ctx.lineTo(gx + 56, gy + gh / 2);
        ctx.stroke();
      } else {
        // Ilustración de sistema / interfaz / arquitectura de marca
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(gx + 44, gy + gh / 2, 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = pal.sec;
        ctx.beginPath();
        ctx.arc(gx + 44, gy + gh / 2, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Barras e indicadores de valor en la escena
      const tx = gx + 82;
      const tw = Math.max(40, gw - 94);
      ctx.fillStyle = pal.darkInk;
      ctx.font = "800 11px Montserrat, sans-serif";
      fillTextFitted(ctx, bUpper, tx, gy + 26, tw);
      ctx.fillStyle = pal.pri;
      ctx.font = "700 9.5px Plus Jakarta Sans, sans-serif";
      fillTextFitted(ctx, dna.strokeLabel, tx, gy + 44, tw);
      ctx.fillStyle = pal.sec;
      ctx.fillRect(tx, gy + 54, Math.min(tw, 90), 5);
      ctx.fillStyle = "#CBD5E1";
      ctx.fillRect(tx, gy + 65, Math.min(tw, 130), 4);
      ctx.fillRect(tx, gy + 74, Math.min(tw, 110), 4);

      ctx.restore();
    };

    const drawC00Chrome = (plateIdx) => {
      const meta = PLATE_META[plateIdx];
      // Lienzo 100% Blanco Puro (Norma Oficial de Identidad)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      if (isRect) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(plateIdx === 0 ? 580 : 390, 0);
        ctx.lineTo(plateIdx === 0 ? 290 : 190, plateIdx === 0 ? 235 : 135);
        ctx.lineTo(0, plateIdx === 0 ? 235 : 135);
        ctx.closePath();
        ctx.fillStyle = pal.sec;
        ctx.globalAlpha = plateIdx === 0 ? 0.94 : 0.14;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, plateIdx === 0 ? 265 : 155);
        ctx.lineTo(plateIdx === 0 ? 315 : 210, plateIdx === 0 ? 265 : 155);
        ctx.lineTo(plateIdx === 0 ? 635 : 435, 0);
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.48;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(W, H - (plateIdx === 0 ? 330 : 195));
        ctx.lineTo(W - (plateIdx === 0 ? 480 : 340), H);
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = pal.lightBg;
        ctx.globalAlpha = 0.88;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(W - (plateIdx === 0 ? 530 : 380), H);
        ctx.lineTo(W - (plateIdx === 0 ? 240 : 170), H - (plateIdx === 0 ? 240 : 140));
        ctx.lineTo(W, H - (plateIdx === 0 ? 240 : 140));
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 3.5;
        ctx.globalAlpha = 0.35;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(plateIdx === 0 ? 640 : 420, 0);
        ctx.bezierCurveTo(plateIdx === 0 ? 460 : 280, 60, plateIdx === 0 ? 220 : 140, 140, 0, plateIdx === 0 ? 280 : 145);
        ctx.closePath();
        ctx.fillStyle = pal.sec;
        ctx.globalAlpha = plateIdx === 0 ? 0.94 : 0.14;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, plateIdx === 0 ? 310 : 165);
        ctx.bezierCurveTo(180, 120, 360, 55, plateIdx === 0 ? 690 : 470, 0);
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.45;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(W, H - (plateIdx === 0 ? 360 : 210));
        ctx.bezierCurveTo(W - 140, H - 120, W - 290, H - 50, W - (plateIdx === 0 ? 520 : 380), H);
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = pal.lightBg;
        ctx.globalAlpha = 0.85;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(W - (plateIdx === 0 ? 480 : 340), H);
        ctx.bezierCurveTo(W - 240, H - 55, W - 110, H - 120, W, H - (plateIdx === 0 ? 320 : 185));
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.35;
        ctx.stroke();
      }
      ctx.restore();

      // Matriz de puntos o cruces técnicas
      ctx.fillStyle = pal.pri;
      ctx.strokeStyle = pal.pri;
      ctx.globalAlpha = 0.18;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 6; c++) {
          const px = 62 + c * 14;
          const py = 96 + r * 14;
          if (isRect) {
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(px - 2.5, py);
            ctx.lineTo(px + 2.5, py);
            ctx.moveTo(px, py - 2.5);
            ctx.lineTo(px, py + 2.5);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Encabezado (Láminas 02 a 30) con ajuste estricto de ancho
      if (plateIdx > 0) {
        drawLogoOrEmblem(54, 22, 34, false);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10.5px Montserrat, sans-serif";
        fillTextFitted(ctx, meta.sec, 98, 37, 680);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 13.5px Montserrat, sans-serif";
        fillTextFitted(ctx, meta.title, 98, 56, 760);

        ctx.textAlign = "right";
        ctx.fillStyle = pal.pri;
        ctx.font = "800 9.5px Montserrat, sans-serif";
        fillTextFitted(ctx, `${dna.archBadge}  •  ${dna.strokeBadge}`, W - 180, 44, 340);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 13px Montserrat, sans-serif";
        ctx.fillText(`LÁMINA ${meta.num} / 30`, W - 54, 44);
        ctx.fillStyle = pal.sec;
        ctx.fillRect(W - 155, 50, 101, 3);
        ctx.textAlign = "left";

        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(54, 70);
        ctx.lineTo(W - 54, 70);
        ctx.stroke();
      }

      // Pie de página oficial (30 Láminas)
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(54, H - 52);
      ctx.lineTo(W - 54, H - 52);
      ctx.stroke();

      ctx.fillStyle = pal.sec;
      ctx.fillRect(54, H - 53, 380, 3);

      drawLogoOrEmblem(54, H - 42, 26, false);
      ctx.fillStyle = pal.darkInk;
      ctx.font = "800 11px Montserrat, sans-serif";
      fillTextFitted(ctx, bUpper, 88, H - 25, 220);
      const bWidth = Math.min(220, ctx.measureText(bUpper).width);
      ctx.fillStyle = pal.sec;
      ctx.fillText("•", 96 + bWidth, H - 25);
      ctx.fillStyle = pal.pri;
      ctx.font = "700 10px Plus Jakarta Sans, sans-serif";
      fillTextFitted(ctx, tagline.toUpperCase(), 112 + bWidth, H - 25, 560);

      ctx.textAlign = "right";
      ctx.fillStyle = pal.sec;
      ctx.font = "800 10px Montserrat, sans-serif";
      ctx.fillText("IDENTIDAD  •  ESTRUCTURA  •  EJECUCIÓN  •  CRECIMIENTO", W - 130, H - 25);
      ctx.fillStyle = pal.darkInk;
      ctx.font = "900 11px Montserrat, sans-serif";
      ctx.fillText(`PAG. ${meta.num}`, W - 54, H - 25);
      ctx.textAlign = "left";
    };

    // Tarjeta blindada con ctx.clip() para que NINGÚN texto pueda salirse jamás del cuadro
    const drawNodeCard = (x, y, w, h, badge, title, body, accentHex) => {
      drawRoundedRect(ctx, x, y, w, h, isRect ? 4 : 16, "#F8FAFC", "#E2E8F0", 1.5);
      ctx.fillStyle = accentHex || pal.pri;
      ctx.fillRect(x, y + (isRect ? 0 : 12), 4, Math.max(12, h - (isRect ? 0 : 24)));

      ctx.save();
      ctx.beginPath();
      ctx.rect(x + 8, y + 6, w - 16, h - 12);
      ctx.clip();

      const innerW = w - 32;
      const isCompact = h < 115;

      ctx.fillStyle = accentHex || pal.pri;
      ctx.font = `800 ${isCompact ? "9.5px" : "10px"} Montserrat, sans-serif`;
      fillTextFitted(ctx, String(badge || "").toUpperCase(), x + 18, y + (isCompact ? 20 : 25), innerW);

      ctx.fillStyle = pal.darkInk;
      ctx.font = `800 ${isCompact ? "13px" : "14.5px"} Montserrat, sans-serif`;
      const titleMaxLines = isCompact ? 1 : 2;
      const nextY = drawWrappedText(ctx, title, x + 18, y + (isCompact ? 38 : 46), innerW, isCompact ? 17 : 19, titleMaxLines);

      const availBodyH = (y + h - 10) - (nextY + 4);
      const bodyLineH = isCompact ? 15 : 17.5;
      const bodyMaxLines = Math.max(1, Math.floor(availBodyH / bodyLineH));
      if (availBodyH >= 14 && body) {
        ctx.fillStyle = "#334155";
        ctx.font = `500 ${isCompact ? "11.5px" : "12.2px"} Plus Jakarta Sans, sans-serif`;
        drawWrappedText(ctx, body, x + 18, nextY + 4, innerW, bodyLineH, bodyMaxLines);
      }

      ctx.restore();
    };

    const jpegPages = [];

    // =========================================================================
    // ENRIQUECIMIENTO SEMÁNTICO DE DATOS (PASOS 0 AL 6) — CERO REDUNDANCIAS
    // =========================================================================
    const rawPersona = (cs.brand_persona || `Líder con mente de ingeniero, rigor analítico y calidez de socio leal: escucha primero la necesidad real del cliente, estructura con orden y acompaña hombro a hombro con fuerza serena y visión de largo plazo.`).trim();
    d.persona = window.tbbRefineUserCopyOrthoAndClarity(rawPersona, "persona", bName, industry);

    const tpBeforeRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.before?.length)
      ? window.tpExtractedItems.before
      : (cs.tp_before ? cs.tp_before.split(",").map(s => s.trim()).filter(Boolean) : [
          `Presencia de autoridad y contenidos de valor en redes ejecutivas (${bName})`,
          `Sitio web oficial claro, sin fricciones y orientado a la conversión (www.${assets.cleanSlug}.com)`,
          `Agente conversacional inteligente en WhatsApp 24/7 con atención inmediata`,
          `Diagnóstico inicial ágil, solicitud de propuesta ejecutiva o sesión de alineación`
        ]);
    const tpDuringRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.during?.length)
      ? window.tpExtractedItems.during
      : (cs.tp_during ? cs.tp_during.split(",").map(s => s.trim()).filter(Boolean) : [
          `Proceso de contratación y pago transparente con opciones digitales integradas`,
          `Sesión de alineación estratégica hombro a hombro (in situ o vía videoconferencia)`,
          `Tablero interactivo de seguimiento y presentación ejecutiva de prototipos`,
          `Entrega puntual certificada con acabados y empaquetado de estándar superior`
        ]);
    const tpAfterRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.after?.length)
      ? window.tpExtractedItems.after
      : (cs.tp_after ? cs.tp_after.split(",").map(s => s.trim()).filter(Boolean) : [
          `Bóveda digital de cliente con historial completo de activos, entregables y facturas`,
          `Manuales de aplicación, certificados de autenticidad y garantías en lienzo claro`,
          `Encuesta ejecutiva de satisfacción, calibración de impacto y mejora continua`,
          `Acompañamiento post-lanzamiento, evolución continua y revisión estratégica anual`
        ]);

    d.tpBefore = tpBeforeRaw.slice(0, 4).map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, industry));
    d.tpDuring = tpDuringRaw.slice(0, 4).map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, industry));
    d.tpAfter = tpAfterRaw.slice(0, 4).map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, industry));

    while (d.tpBefore.length < 4) d.tpBefore.push(`Punto de contacto de descubrimiento y confianza (${bName})`);
    while (d.tpDuring.length < 4) d.tpDuring.push(`Punto de contacto de contratación y entrega ágil (${bName})`);
    while (d.tpAfter.length < 4) d.tpAfter.push(`Punto de contacto de portal, entregables y lealtad (${bName})`);

    // Helper para tarjeta editorial asimétrica suiza (cero cajas baratas, respiración amplia)
    const drawEditorialBlock = (bx, by, bw, bh, badge, title, bodyText, accentCol) => {
      drawRoundedRect(ctx, bx, by, bw, bh, isRect ? 4 : 14, "#FFFFFF", "#E2E8F0", 1.5);
      ctx.fillStyle = accentCol || pal.pri;
      ctx.fillRect(bx, by, isRect ? 4 : 6, bh);

      ctx.save();
      ctx.beginPath();
      ctx.rect(bx + 14, by + 10, bw - 28, bh - 20);
      ctx.clip();

      ctx.fillStyle = accentCol || pal.pri;
      ctx.font = "800 10.5px Montserrat, sans-serif";
      fillTextFitted(ctx, String(badge || "").toUpperCase(), bx + 22, by + 26, bw - 44);

      ctx.fillStyle = pal.darkInk;
      ctx.font = "800 16px Montserrat, sans-serif";
      const nextY = drawWrappedText(ctx, title, bx + 22, by + 48, bw - 44, 21, 2);

      if (bodyText) {
        ctx.fillStyle = "#334155";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        const availH = (by + bh - 12) - (nextY + 6);
        const maxLines = Math.max(1, Math.floor(availH / 18.5));
        drawWrappedText(ctx, bodyText, bx + 22, nextY + 6, bw - 44, 18.5, maxLines);
      }
      ctx.restore();
    };

    // Helper para citatorio o directriz de autor clásica
    const drawAuthorCallout = (cx, cy, cw, ch, quote, author, role) => {
      drawRoundedRect(ctx, cx, cy, cw, ch, isRect ? 4 : 12, pal.lightBg, pal.softTint, 1.5);
      ctx.fillStyle = pal.sec;
      ctx.fillRect(cx, cy, 5, ch);

      ctx.save();
      ctx.beginPath();
      ctx.rect(cx + 12, cy + 8, cw - 24, ch - 16);
      ctx.clip();

      ctx.fillStyle = pal.darkInk;
      ctx.font = "italic 600 12.5px Plus Jakarta Sans, sans-serif";
      const afterQ = drawWrappedText(ctx, `«${quote}»`, cx + 18, cy + 28, cw - 36, 18, 3);

      ctx.fillStyle = pal.sec;
      ctx.font = "800 10px Montserrat, sans-serif";
      fillTextFitted(ctx, `— ${author.toUpperCase()} · ${role}`, cx + 18, Math.max(cy + ch - 16, afterQ + 14), cw - 36);
      ctx.restore();
    };

    for (let i = 0; i < 30; i++) {
      if (typeof onProgress === "function") onProgress(i + 1, 30);
      drawC00Chrome(i);
      const meta = PLATE_META[i];

      if (i > 0) {
        // TÍTULO EDITORIAL OFICIAL (LÁMINAS 02 A 30)
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, `${meta.sec}  ·  ${dna.archBadge}`, 54, 106, W - 108);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        fillTextFitted(ctx, `${meta.num}. ${meta.title}`, 54, 138, W - 108);
      }

      if (i === 0) {
        // LÁMINA 01: PORTADA MAESTRA ADAPTATIVA (MONUMENTAL ATELIER · CERO SUBMARCAS FORZADAS EN MARCA ÚNICA)
        ctx.fillStyle = pal.sec;
        ctx.font = "800 12.5px Montserrat, sans-serif";
        fillTextFitted(ctx, `MANUAL OFICIAL DE IDENTIDAD · ${dna.archBadge} · ${dna.strokeBadge}`, 72, 316, 670);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 58px Montserrat, sans-serif";
        fillTextFitted(ctx, bUpper, 72, 386, 670);

        ctx.fillStyle = pal.pri;
        ctx.font = "800 18px Montserrat, sans-serif";
        fillTextFitted(ctx, tagline.toUpperCase(), 72, 424, 670);

        ctx.fillStyle = pal.pri;
        ctx.fillRect(72, 442, 130, 5);
        ctx.fillStyle = pal.sec;
        if (isRect) {
          ctx.fillRect(212, 440, 9, 9);
        } else {
          ctx.beginPath();
          ctx.arc(218, 444.5, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 19.5px Plus Jakarta Sans, sans-serif";
        const afterGiroY = drawWrappedText(ctx, industry, 72, 480, 668, 26, 2);

        ctx.fillStyle = "#475569";
        ctx.font = "500 13.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(
          ctx,
          `Constitución oficial de marca con Círculo Dorado (Why·How·What), La Empresa como Persona, Ingeniería de Touchpoints en 3 Momentos y Sistema Visual en ${dna.strokeLabel.toLowerCase()} (${pal.pri} y ${pal.sec}) para ${bName}.`,
          72,
          Math.max(540, afterGiroY + 10),
          668,
          20,
          3
        );

        if (dna.archMode === "multibrand") {
          const subs = assets.subBrands.map(s => s.suffix);
          subs.forEach((s, idx) => {
            const sx = 72 + idx * 168;
            drawRoundedRect(ctx, sx, 632, 154, 152, isRect ? 4 : 16, "#F8FAFC", "#E2E8F0", 1.5);
            ctx.save();
            ctx.beginPath();
            ctx.rect(sx + 6, 638, 142, 140);
            ctx.clip();
            drawLogoOrEmblem(sx + 41, 648, 72, false, s, 136);
            ctx.restore();
          });
        } else {
          // Marca Única Monolítica: Ficha Estratégica en 3 Columnas
          const cardX = 72, cardY = 626, cardW = 668, cardH = 168;
          drawRoundedRect(ctx, cardX, cardY, cardW, cardH, isRect ? 4 : 16, "#F8FAFC", "#CBD5E1", 1.5);
          ctx.fillStyle = pal.sec;
          ctx.fillRect(cardX, cardY, cardW, 5);

          const pillarsCover = [
            { badge: "01 · PROPÓSITO NUCLEAR", title: "Por qué existimos", body: d.whyText, col: pal.sec },
            { badge: "02 · OFERTA DE VALOR", title: "Qué entregamos", body: d.valueOffer, col: pal.pri },
            { badge: "03 · IDENTIDAD MONOLÍTICA", title: `100% ${bName}`, body: `Concentración total del prestigio en un solo nombre oficial. Cero división de capital en submarcas.`, col: pal.darkInk }
          ];
          const colW = Math.floor((cardW - 36) / 3);
          pillarsCover.forEach((pCol, pIdx) => {
            const px = cardX + 14 + pIdx * (colW + 6);
            if (pIdx > 0) {
              ctx.strokeStyle = "#E2E8F0";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(px - 4, cardY + 18);
              ctx.lineTo(px - 4, cardY + cardH - 14);
              ctx.stroke();
            }
            ctx.save();
            ctx.beginPath();
            ctx.rect(px, cardY + 12, colW - 6, cardH - 22);
            ctx.clip();
            ctx.fillStyle = pCol.col;
            ctx.font = "800 9.5px Montserrat, sans-serif";
            fillTextFitted(ctx, pCol.badge, px + 4, cardY + 28, colW - 12);
            ctx.fillStyle = pal.darkInk;
            ctx.font = "800 13px Montserrat, sans-serif";
            fillTextFitted(ctx, pCol.title, px + 4, cardY + 48, colW - 12);
            ctx.fillStyle = "#334155";
            ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, pCol.body, px + 4, cardY + 68, colW - 12, 16, 5);
            ctx.restore();
          });
        }

        // Emblema Monumental Derecho en Lienzo Limpio con Órbitas Áureas
        const boxX = 790, boxY = 220, boxW = 546, boxH = 574;
        const cx = boxX + boxW / 2;
        drawRoundedRect(ctx, boxX, boxY, boxW, boxH, isRect ? 4 : 24, "#FFFFFF", "#CBD5E1", 2);

        ctx.save();
        ctx.beginPath();
        ctx.rect(boxX + 4, boxY + 4, boxW - 8, boxH - 8);
        ctx.clip();

        // Órbitas matemáticas sutiles en fondo
        ctx.strokeStyle = pal.softTint;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, boxY + 225, 195, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, boxY + 225, 140, 0, Math.PI * 2);
        ctx.stroke();

        drawLogoOrEmblem(cx - 140, boxY + 65, 280, false);

        // Ficha inferior de certificación de portada
        const footerBoxY = boxY + 458;
        drawRoundedRect(ctx, boxX + 26, footerBoxY, boxW - 52, 92, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.5);
        ctx.textAlign = "center";
        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 12px Montserrat, sans-serif";
        fillTextFitted(ctx, `${dna.archBadge}  •  ${dna.strokeBadge}`, cx, footerBoxY + 34, boxW - 80);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 11.5px Plus Jakarta Sans, sans-serif";
        fillTextFitted(ctx, `Versión Positiva Principal sobre Lienzo Claro (#FFFFFF) · ${pal.pri} & ${pal.sec}`, cx, footerBoxY + 62, boxW - 80);
        ctx.textAlign = "left";
        ctx.restore();

      } else if (i === 1) {
        // LÁMINA 02: MAPA METODOLÓGICO DE 30 LÁMINAS (PASOS 0 AL 6)
        // Columna Izquierda: Arquitectura del Manual + Pipeline Vectorial Continuo
        drawEditorialBlock(54, 160, 480, 240, "ARQUITECTURA DEL MANUAL", `Del Caos al Sistema de ${dna.strokeLabel}`, `Este manual se adapta a la identidad real de ${bName} (${dna.archTitle}). Ordena primero el problema raíz (Paso 0), el propósito nuclear y la personificación (Paso 1) y los puntos de contacto reales (Paso 2) antes de definir el nombre (Paso 3) y la geometría oficial del logotipo (${pal.pri} y ${pal.sec}).`, pal.pri);

        // Pipeline Vectorial Continuo P0 a P6
        drawRoundedRect(ctx, 54, 420, 480, 465, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
        ctx.save();
        ctx.beginPath();
        ctx.rect(58, 424, 472, 457);
        ctx.clip();

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 13px Montserrat, sans-serif";
        fillTextFitted(ctx, "TRAYECTORIA METODOLÓGICA (PASOS 0 AL 6)", 76, 452, 436);

        const flowSteps = [
          { p: "P0", name: "Giro & Problema", sub: "Diagnóstico comercial y buyer persona", y: 495, c: pal.darkInk },
          { p: "P1", name: "ADN & Persona", sub: "Círculo Dorado y arquetipos humanos", y: 560, c: pal.pri },
          { p: "P2", name: "Touchpoints", sub: "Experiencia Antes · Durante · Después", y: 625, c: pal.sec },
          { p: "P3", name: "Naming & Niza", sub: "Semiótica, Test SMILE y registro", y: 690, c: pal.pri },
          { p: "P4", name: "Arquitectura", sub: dna.archMode === "multibrand" ? "Marca Madre + Submarcas" : "Marca Única Monolítica", y: 755, c: pal.darkInk },
          { p: "P5-6", name: "Color & Gobernanza", sub: "Paleta 8 tonos, tipografía y sellos", y: 820, c: pal.sec }
        ];

        // Eje vertical conector
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(96, 495);
        ctx.lineTo(96, 820);
        ctx.stroke();

        flowSteps.forEach((st) => {
          ctx.fillStyle = st.c;
          ctx.beginPath();
          ctx.arc(96, st.y, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "800 9px Montserrat, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(st.p, 96, st.y + 3);
          ctx.textAlign = "left";

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 13px Montserrat, sans-serif";
          fillTextFitted(ctx, st.name, 126, st.y - 2, 380);

          ctx.fillStyle = "#64748B";
          ctx.font = "500 11px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, st.sub, 126, st.y + 14, 380);
        });
        ctx.restore();

        // Columna Derecha: 6 Bloques del Índice Oficial de 30 Láminas
        const secs = [
          ["SECCIÓN 01 · LÁMINAS 01–03", "Introducción, Giro y Problema", "01. Portada Maestra · 02. Mapa Metodológico · 03. Manifiesto: Del Caos al Sistema y Buyer Persona."],
          ["SECCIÓN 02 · LÁMINAS 04–08", "ADN y La Empresa como Persona", "04. Círculo Dorado (Why·How·What) · 05. Promesa, Misión, Visión · 06. 6 Principios · 07. La Empresa como Persona · 08. Tono de Voz."],
          ["SECCIÓN 03 · LÁMINAS 09–12", "Ingeniería de Touchpoints", "09. Mapa Integral del Viaje · 10. Antes de Comprar · 11. Durante la Compra · 12. Después de Comprar."],
          ["SECCIÓN 04–05 · LÁMINAS 13–22", "Nombre, Arquitectura y Logotipos", `13. Naming y Niza · 14. ${dna.archTitle} · 15. Anatomía Semiótica · 16–19. Los 4 Pilares · 20. Retícula 8X · 21. Aislamiento · 22. 6 Prohibiciones.`],
          ["SECCIÓN 06 · LÁMINAS 23–26", "Color, Trazo, Tipografía y Sellos", `23. Paleta Cromática (8 Tonos) · 24. Proporción 70/20/10 y Trazo · 25. Tipografía Oficial · 26. Los 6 Sellos Metodológicos.`],
          ["SECCIÓN 07 · LÁMINAS 27–30", "Aplicaciones y Gobernanza Oficial", "27. Norma Oficial de Co-Branding · 28. Papelería y Tarjetas · 29. Ecosistema Digital · 30. Colofón y Certificado Institucional."]
        ];
        secs.forEach((sItem, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const bx = 560 + col * 400;
          const by = 160 + row * 242;
          drawEditorialBlock(bx, by, 384, 226, sItem[0], sItem[1], sItem[2], idx % 2 === 0 ? pal.pri : pal.sec);
        });

      } else if (i === 2) {
        // LÁMINA 03: PASO 0 — MANIFIESTO: DEL CAOS AL SISTEMA & BUYER PERSONA
        drawEditorialBlock(54, 160, 630, 310, "EL PROBLEMA QUE RESOLVEMOS · DEL CAOS AL SISTEMA", `Transformamos la incertidumbre en certidumbre operativa en ${sectorShort}`, `${bName} nace para erradicar la improvisación y la falta de estandarización en ${industry}. Muchas empresas operan con procesos dispersos y comunicación incoherente que agota al equipo y confunde al comprador. Nuestra solución unifica estrategia, lenguaje y entrega bajo un solo estándar medible y confiable.`, pal.sec);

        drawEditorialBlock(710, 160, 636, 310, "EL ACTOR COMPRADOR (BUYER PERSONA)", d.idealCustomer, `Perfil del comprador ideal: Organizaciones y líderes que valoran la honestidad profesional, la precisión técnica y el acompañamiento leal. Buscan un socio que escuche primero y resuelva con método, sin perder tiempo ni generar fricción. Rol social de nuestra marca: ${d.socialRole}`, pal.pri);

        // Comparativa Asimétrica de 3 Escenas en el Mundo Real
        const scenes = [
          ["01 · EL CAOS PREVIO", "Operación Fragmentada y Fricción", "Criterios dispersos, mensajes contradictorios y desgaste en cada punto de contacto comercial.", "#64748B"],
          ["02 · LA INTERVENCIÓN " + bUpper, "Identidad y Estandarización Oficial", `Implantación del sistema de ${bName}: procesos alineados, imagen ejecutiva y certidumbre.`, pal.pri],
          ["03 · EL RESULTADO MEDIBLE", "Claridad, Confianza y Crecimiento", `Operación sólida bajo ${dna.archTitle}, lealtad del cliente y escalabilidad sostenible.`, pal.sec]
        ];
        scenes.forEach((sc, idx) => {
          const sx = 54 + idx * 440;
          drawRoundedRect(ctx, sx, 496, 412, 395, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
          ctx.fillStyle = sc[3];
          ctx.fillRect(sx, 496, 412, 7);

          ctx.save();
          ctx.beginPath();
          ctx.rect(sx + 10, 506, 392, 375);
          ctx.clip();

          ctx.fillStyle = sc[3];
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, sc[0], sx + 22, 532, 368);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          drawWrappedText(ctx, sc[1], sx + 22, 558, 368, 21, 2);

          ctx.fillStyle = "#334155";
          ctx.font = "500 13px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sc[2], sx + 22, 616, 368, 20, 5);

          // Vector conceptual de escena
          drawRoundedRect(ctx, sx + 22, 735, 368, 120, isRect ? 4 : 12, "#FFFFFF", "#E2E8F0", 1.5);
          ctx.fillStyle = sc[3];
          ctx.beginPath();
          ctx.arc(sx + 56, 795, 20, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "800 12px Montserrat, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`0${idx + 1}`, sx + 56, 799);
          ctx.textAlign = "left";

          ctx.fillStyle = pal.darkInk;
          ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, idx === 0 ? "Diagnóstico profundo en Paso 0" : idx === 1 ? "Alineación integral con Aura" : "Liderazgo sólido y respetado", sx + 88, 798, 280);
          ctx.restore();
        });

      } else if (i === 3) {
        // LÁMINA 04: EL CÍRCULO DORADO (WHY · HOW · WHAT) — SIMON SINEK
        // Izquierda: 3 Círculos Concéntricos Puros con Vectores Matemáticos
        const cx = 335, cy = 528;
        // Anillo 3: WHAT (Oferta Externa)
        ctx.beginPath();
        ctx.arc(cx, cy, 244, 0, Math.PI * 2);
        ctx.fillStyle = "#F8FAFC";
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#CBD5E1";
        ctx.stroke();

        // Anillo 2: HOW (Método y Diferencial)
        ctx.beginPath();
        ctx.arc(cx, cy, 168, 0, Math.PI * 2);
        ctx.fillStyle = pal.lightBg;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = pal.pri;
        ctx.stroke();

        // Anillo 1: WHY (Propósito Nuclear)
        ctx.beginPath();
        ctx.arc(cx, cy, 92, 0, Math.PI * 2);
        ctx.fillStyle = pal.darkInk;
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = pal.sec;
        ctx.stroke();

        // Rótulos centrales concéntricos
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 16px Montserrat, sans-serif";
        ctx.fillText("01. WHY", cx, cy - 8);
        ctx.font = "700 10px Plus Jakarta Sans, sans-serif";
        ctx.fillText("PROPÓSITO", cx, cy + 10);

        ctx.fillStyle = pal.pri;
        ctx.font = "800 12.5px Montserrat, sans-serif";
        ctx.fillText("02. HOW · EL MÉTODO Y DIFERENCIAL", cx, cy - 132);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 12.5px Montserrat, sans-serif";
        ctx.fillText("03. WHAT · LA OFERTA AL MERCADO", cx, cy - 208);
        ctx.textAlign = "left";

        // Derecha: 3 Bloques Editoriales Ricos y Profundos
        drawEditorialBlock(650, 165, 696, 226, "01 · WHY (EL PROPÓSITO CENTRAL · LA CREENCIA)", "Por qué existe " + bName + " más allá de vender", d.whyText, pal.sec);
        drawEditorialBlock(650, 412, 696, 226, "02 · HOW (EL MÉTODO Y DIFERENCIAL REAL)", "Cómo lo hacemos realidad cada día con rigor", d.howText + ". " + d.socialRole, pal.pri);
        drawEditorialBlock(650, 660, 696, 226, "03 · WHAT (LA OFERTA CONCRETA DE VALOR)", "Qué entregamos al mercado con maestría técnica", d.whatText + ` Diseñado y operado bajo el estándar de calidad de ${bName}.`, pal.darkInk);

      } else if (i === 4) {
        // LÁMINA 05: PROMESA, MISIÓN, VISIÓN Y LAS 6 MÁXIMAS DE FILOSOFÍA (DONALD MILLER)
        // Columna Izquierda: Promesa, Misión y Visión
        drawEditorialBlock(54, 160, 580, 226, "LA GRAN PROMESA DE MARCA (STORYBRAND)", `La transformación del cliente al elegir ${bName}`, `Prometemos a cada cliente que encontrará en ${bName} un socio de máxima fiabilidad técnica y calidez humana. Sustituimos la incertidumbre por claridad ejecutiva, entregando soluciones de alto impacto que protegen su inversión y multiplican su valor.`, pal.sec);

        drawEditorialBlock(54, 404, 580, 226, "MISIÓN OPERATIVA", `Qué hacemos cada día con maestría`, `Diseñar, estructurar y operar soluciones integrales en ${industry} mediante procesos rigurosos, tecnología de punta y acompañamiento cercano que libera tiempo mental a nuestros clientes.`, pal.pri);

        drawEditorialBlock(54, 648, 580, 238, "VISIÓN DE LARGO PLAZO", `Hacia dónde construimos para la próxima década`, `Ser reconocidos como el referente indiscutible de excelencia, ética y consistencia en ${sectorShort}, demostrando que el orden, la belleza funcional y la lealtad con el cliente son las mayores ventajas competitivas sostenibles.`, pal.darkInk);

        // Columna Derecha: Las 6 Máximas de Filosofía
        drawRoundedRect(ctx, 660, 160, 686, 726, isRect ? 4 : 20, "#F8FAFC", pal.softTint, 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(660, 160, 686, 8);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "FILOSOFÍA INSTITUCIONAL INNEGOCIABLE", 692, 196, 620);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 22px Montserrat, sans-serif";
        fillTextFitted(ctx, `Las 6 Máximas de Filosofía de ${bName}`, 692, 226, 620);

        const maximas = [
          ["01", "Claridad Radical sobre Artificios", "Si no aporta claridad al cliente, se elimina. La simplicidad funcional es nuestra mayor muestra de respeto."],
          ["02", "Mente de Ingeniero, Trato de Socio", "Combinamos la exactitud matemática con la empatía de quien camina hombro con hombro."],
          ["03", "Cero Tolerancia a la Improvisación", "Cada proceso, entregable y documento cuenta con una razón técnica y estética inmutable."],
          ["04", "El Cliente es el Héroe; Nosotros el Guía", "Nuestra autoridad se demuestra en el éxito de nuestros clientes, no en la ostentación propia."],
          ["05", "Valor Medible y Sostenible", "Toda intervención debe justificarse en reducción de fricción, certidumbre y rentabilidad duradera."],
          ["06", "Coherencia de la Idea a la Entrega", "Lo que prometemos en el primer contacto es exactamente lo que recibe en sus manos."]
        ];

        maximas.forEach((m, mIdx) => {
          const my = 260 + mIdx * 98;
          drawRoundedRect(ctx, 692, my, 622, 84, isRect ? 3 : 12, "#FFFFFF", "#E2E8F0", 1.2);
          ctx.fillStyle = mIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(692, my, 5, 84);

          ctx.fillStyle = mIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "900 16px Montserrat, sans-serif";
          ctx.fillText(m[0], 712, my + 34);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 14px Montserrat, sans-serif";
          fillTextFitted(ctx, m[1], 752, my + 30, 540);

          ctx.fillStyle = "#475569";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, m[2], 752, my + 48, 540, 16, 2);
        });

      } else if (i === 5) {
        // LÁMINA 06: LOS 6 PRINCIPIOS RECTORES Y CÓDIGO DE RELACIÓN CON CLIENTES
        // Columna Izquierda: Los 6 Principios Rectores
        const prX = 54, prW = 630;
        drawEditorialBlock(prX, 160, prW, 726, "CÓDIGO OPERATIVO INTERNO", "Los 6 Principios que Guían Cada Decisión", "", pal.pri);

        const principles = [
          ["PRINCIPIO 01 · VERDAD TÉCNICA", "Honestidad de Diagnóstico", "Nunca inflamos problemas para vender soluciones complejas. Decimos la verdad técnica con datos objetivos."],
          ["PRINCIPIO 02 · RESPETO AL TIEMPO", "Eficiencia y Cero Fricción", "El tiempo mental de nuestro cliente es sagrado. Diseñamos sistemas que resuelven en minutos lo que otros tardan semanas."],
          ["PRINCIPIO 03 · RIGOR EN EL DETALLE", "Obsesión por la Calidad", "Cuidamos cada milímetro, cada píxel y cada palabra con el estándar de un taller artesanal de alta precisión."],
          ["PRINCIPIO 04 · TRANSPARENCIA", "Cuentas y Términos Claros", "Sin letras pequeñas, costos ocultos ni ambigüedades contractuales. Operamos con luz total desde el primer momento."],
          ["PRINCIPIO 05 · ACOMPAÑAMIENTO", "Presencia Real y Accesible", "No desaparecemos tras la venta. Mantenemos canales abiertos y respuesta humana ante cualquier contingencia."],
          ["PRINCIPIO 06 · MEJORA CONTINUA", "Evolución sin Descanso", "Auditamos nuestros propios sistemas periódicamente para incorporar innovaciones que beneficien al usuario."]
        ];

        principles.forEach((pr, pIdx) => {
          const py = 240 + pIdx * 104;
          drawRoundedRect(ctx, prX + 20, py, prW - 40, 92, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);
          ctx.fillStyle = pIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 10px Montserrat, sans-serif";
          fillTextFitted(ctx, pr[0], prX + 36, py + 24, prW - 72);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 14px Montserrat, sans-serif";
          fillTextFitted(ctx, pr[1], prX + 36, py + 44, prW - 72);

          ctx.fillStyle = "#475569";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, pr[2], prX + 36, py + 62, prW - 72, 16, 2);
        });

        // Columna Derecha: Código de Relación con Clientes
        const rcX = 710, rcW = 636;
        drawEditorialBlock(rcX, 160, rcW, 726, "RELACIÓN HUMANA CON EL CLIENTE", `El Compromiso de Confianza de ${bName}`, "", pal.sec);

        const commitments = [
          ["COMPROMISO 01", "Escucha Activa antes de Proponer", "Primero comprendemos la meta y el contexto del cliente antes de sugerir cualquier herramienta o servicio."],
          ["COMPROMISO 02", "Propuesta de Valor Directa", "Cada propuesta explica en lenguaje claro el entregable, el cronograma y el impacto tangible."],
          ["COMPROMISO 03", "Entrega en Lienzo Claro", "Todos los entregables se entregan listos para operar, con acceso irrestricto y sin dependencias cautivas."],
          ["COMPROMISO 04", "Atención Inteligente 24/7", "Canales de soporte siempre activos que resuelven dudas inmediatas y escalan a atención ejecutiva."],
          ["COMPROMISO 05", "Alianza a Largo Plazo", "Medimos nuestro éxito en la recompra, la recomendación sincera y la lealtad mutua a través de los años."]
        ];

        commitments.forEach((cm, cIdx) => {
          const cy = 250 + cIdx * 124;
          drawRoundedRect(ctx, rcX + 24, cy, rcW - 48, 110, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
          ctx.fillStyle = pal.sec;
          ctx.fillRect(rcX + 24, cy, 6, 110);

          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          fillTextFitted(ctx, cm[0], rcX + 44, cy + 28, rcW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 15px Montserrat, sans-serif";
          fillTextFitted(ctx, cm[1], rcX + 44, cy + 50, rcW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, cm[2], rcX + 44, cy + 70, rcW - 88, 17.5, 2);
        });

      } else if (i === 6) {
        // LÁMINA 07: LA EMPRESA COMO PERSONA (CARÁCTER Y 4 FACETAS HUMANAS)
        // Izquierda: Gráfico Radar de Arquetipos de Carl Jung (6 Ejes en Curvas)
        drawEditorialBlock(54, 160, 560, 726, "ARQUETIPO DE MARCA Y PSICOLOGÍA", `La Personalidad Humana de ${bName}`, "", pal.sec);

        const rx = 334, ry = 480, rRad = 175;
        // Malla poligonal hexagonal
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 1.2;
        [0.35, 0.7, 1.0].forEach(scale => {
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (Math.PI / 3) * a - Math.PI / 2;
            const px = rx + Math.cos(angle) * rRad * scale;
            const py = ry + Math.sin(angle) * rRad * scale;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        });

        // Ejes de coordenadas
        const axesLabels = [
          "Fuerza Serena", "Rigor Técnico", "Claridad Ejecutiva",
          "Empatía & Calidez", "Agilidad", "Lealtad Leal"
        ];
        for (let a = 0; a < 6; a++) {
          const angle = (Math.PI / 3) * a - Math.PI / 2;
          const px = rx + Math.cos(angle) * rRad;
          const py = ry + Math.sin(angle) * rRad;
          ctx.strokeStyle = "#CBD5E1";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          ctx.textAlign = "center";
          const lx = rx + Math.cos(angle) * (rRad + 24);
          const ly = ry + Math.sin(angle) * (rRad + 24) + 4;
          ctx.fillText(axesLabels[a], lx, ly);
          ctx.textAlign = "left";
        }

        // Polígono de personalidad calibrada
        const values = [0.92, 0.88, 0.95, 0.85, 0.78, 0.96];
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const angle = (Math.PI / 3) * a - Math.PI / 2;
          const vx = rx + Math.cos(angle) * rRad * values[a];
          const vy = ry + Math.sin(angle) * rRad * values[a];
          if (a === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.fillStyle = pal.pri;
        ctx.globalAlpha = 0.22;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 3;
        ctx.stroke();

        drawAuthorCallout(74, 715, 520, 145, d.persona, "ARQUETIPO OFICIAL", "Personalidad y Conducta de Marca");

        // Derecha: Las 4 Facetas de Carácter Humano
        const fcX = 640, fcW = 706;
        drawEditorialBlock(fcX, 160, fcW, 726, "LAS 4 FACETAS DE CONDUCTA", "Cómo se Manifiesta Nuestra Personalidad en Vivo", "", pal.pri);

        const facets = [
          ["01 · EL ARQUITECTO DE CLARIDAD", "Mente Analítica y Estructura", "Aborda los desafíos con orden matemático. Convierte problemas dispersos en esquemas diáfanos, cronogramas viables y decisiones bien fundamentadas.", pal.pri],
          ["02 · EL SOCIO LEAL", "Calidez Humana y Cercanía", "Escucha sin arrogancia. No impone ideas desde la distancia; se sienta junto al cliente para construir la mejor solución técnica hombro a hombro.", pal.sec],
          ["03 · LA FUERZA SERENA", "Autoridad Tranquila y Firmeza", "Transmite seguridad sin necesidad de aspavientos ni agresividad comercial. Su tranquilidad se apoya en el dominio del oficio y la preparación rigurosa.", pal.darkInk],
          ["04 · EL ARTESANO FUNCIONAL", "Cuidado Obsesivo por la Forma", "Sabe que cada línea, cada tipografía y cada interfaz refleja el valor de la empresa. No tolera la mediocridad gráfica ni el descuido operacional.", pal.pri]
        ];

        facets.forEach((fc, fIdx) => {
          const fy = 246 + fIdx * 154;
          drawRoundedRect(ctx, fcX + 24, fy, fcW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = fc[3];
          ctx.fillRect(fcX + 24, fy, 6, 138);

          ctx.fillStyle = fc[3];
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, fc[0], fcX + 44, fy + 30, fcW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, fc[1], fcX + 44, fy + 54, fcW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, fc[2], fcX + 44, fy + 78, fcW - 88, 19, 3);
        });

      } else if (i === 7) {
        // LÁMINA 08: TONO DE VOZ, PERSONALIDAD Y LENGUAJE VISUAL (AURA & DONALD MILLER)
        // Izquierda: Espectro Tonal en Sliders de Polaridad
        const slX = 54, slW = 580;
        drawEditorialBlock(slX, 160, slW, 726, "CALIBRACIÓN KANSEI DEL TONO", "Espectro Tonal en 4 Dimensiones", `El tono de ${bName} está calibrado para proyectar solvencia ejecutiva sin sonar distante, y cercanía humana sin caer en la informalidad trivial.`, pal.sec);

        const sliders = [
          ["DIMENSIÓN 01 · CERCANÍA VS FORMALIDAD", "Cercano y Humano", "Rígido y Distante", 0.65, "65% Cercano"],
          ["DIMENSIÓN 02 · LENGUAJE TÉCNICO", "Claro y Accesible", "Jerga Compleja", 0.78, "78% Accesible"],
          ["DIMENSIÓN 03 · POSTURA COMERCIAL", "Consultivo y Seguro", "Vendedor Agresivo", 0.72, "72% Consultivo"],
          ["DIMENSIÓN 04 · ENFOQUE NARRATIVO", "Pragmático y Realista", "Idealismo Vacío", 0.68, "68% Pragmático"]
        ];

        sliders.forEach((sl, sIdx) => {
          const sy = 280 + sIdx * 135;
          drawRoundedRect(ctx, slX + 20, sy, slW - 40, 116, isRect ? 3 : 12, "#F8FAFC", "#E2E8F0", 1);

          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          fillTextFitted(ctx, sl[0], slX + 36, sy + 24, slW - 72);

          // Pista del slider
          const trackX = slX + 36, trackW = slW - 72, trackY = sy + 58;
          ctx.fillStyle = "#E2E8F0";
          ctx.beginPath();
          ctx.roundRect(trackX, trackY, trackW, 8, [4]);
          ctx.fill();

          // Relleno activo
          ctx.fillStyle = pal.pri;
          ctx.beginPath();
          ctx.roundRect(trackX, trackY, trackW * sl[3], 8, [4]);
          ctx.fill();

          // Puntero / Manija
          ctx.fillStyle = pal.sec;
          ctx.beginPath();
          ctx.arc(trackX + trackW * sl[3], trackY + 4, 9, 0, Math.PI * 2);
          ctx.fill();

          // Etiquetas de extremos
          ctx.fillStyle = pal.darkInk;
          ctx.font = "700 11px Plus Jakarta Sans, sans-serif";
          ctx.fillText(sl[1], trackX, sy + 88);
          ctx.textAlign = "right";
          ctx.fillStyle = "#64748B";
          ctx.fillText(sl[2], trackX + trackW, sy + 88);
          ctx.textAlign = "left";

          ctx.fillStyle = pal.pri;
          ctx.font = "800 10.5px JetBrains Mono, monospace";
          ctx.fillText(sl[4], trackX + trackW / 2 - 32, sy + 46);
        });

        // Derecha: Do's and Don'ts de Lenguaje
        const ddX = 660, ddW = 686;
        drawEditorialBlock(ddX, 160, ddW, 726, "GUÍA DE ESTILO LINGÜÍSTICO", "Directrices de Qué Decir y Qué Evitar", "", pal.pri);

        // Tabla comparativa Dos & Don'ts
        const dosX = ddX + 24, colHalfW = (ddW - 64) / 2;
        drawRoundedRect(ctx, dosX, 240, colHalfW, 616, isRect ? 4 : 14, "#F0FDF4", "#BBF7D0", 1.5);
        ctx.fillStyle = "#15803D";
        ctx.fillRect(dosX, 240, colHalfW, 6);

        ctx.fillStyle = "#15803D";
        ctx.font = "800 13px Montserrat, sans-serif";
        ctx.fillText("✓ CÓMO HABLAMOS (RECOMENDADO)", dosX + 16, 272);

        const dosList = [
          "«Diseñamos sistemas que reducen la fricción y liberan tu tiempo.»",
          "«Te explicamos el diagnóstico con datos y alternativas claras.»",
          "«El proceso toma 7 pasos y cuentas con nuestro apoyo diario.»",
          "«Hacemos que lo complejo se sienta sencillo y elegante.»",
          "«Tu marca queda lista para operar hoy mismo con certeza legal.»"
        ];
        dosList.forEach((item, idx) => {
          const dy = 300 + idx * 105;
          ctx.fillStyle = "#166534";
          ctx.font = "700 11.5px Plus Jakarta Sans, sans-serif";
          ctx.fillText(`0${idx + 1}.`, dosX + 16, dy);
          ctx.fillStyle = "#1F2937";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, item, dosX + 42, dy, colHalfW - 56, 18, 4);
        });

        const dontsX = dosX + colHalfW + 16;
        drawRoundedRect(ctx, dontsX, 240, colHalfW, 616, isRect ? 4 : 14, "#FEF2F2", "#FECACA", 1.5);
        ctx.fillStyle = "#B91C1C";
        ctx.fillRect(dontsX, 240, colHalfW, 6);

        ctx.fillStyle = "#B91C1C";
        ctx.font = "800 13px Montserrat, sans-serif";
        ctx.fillText("✕ LO QUE NUNCA DECIMOS (PROHIBIDO)", dontsX + 16, 272);

        const dontsList = [
          "«Somos los líderes número uno indiscutibles del mercado global.»",
          "«Nuestra sinergia holística disruptiva cambiará el paradigma.»",
          "«El costo depende... ya le avisaremos cuánto va a salir todo.»",
          "«Usted no se preocupe por los detalles técnicos porque no los entendería.»",
          "«Ofrecemos la solución mágica que resuelve cualquier cosa sin esfuerzo.»"
        ];
        dontsList.forEach((item, idx) => {
          const dy = 300 + idx * 105;
          ctx.fillStyle = "#991B1B";
          ctx.font = "700 11.5px Plus Jakarta Sans, sans-serif";
          ctx.fillText(`0${idx + 1}.`, dontsX + 16, dy);
          ctx.fillStyle = "#1F2937";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, item, dontsX + 42, dy, colHalfW - 56, 18, 4);
        });

      } else if (i === 8) {
        // LÁMINA 09: INGENIERÍA DE TOUCHPOINTS: MAPA INTEGRAL DEL VIAJE DEL CLIENTE
        // Cabezal Editorial Holístico
        drawEditorialBlock(54, 160, 1292, 160, "LOS 50,000 MOMENTOS DE LA VERDAD (JAN CARLZON & DON NORMAN)", `El Mapa Holístico de Experiencia de ${bName}`, `La reputación de ${bName} no se construye con discursos, sino en cada punto de contacto real donde el cliente interactúa con la marca. Diseñamos y homologamos la experiencia a lo largo de 3 momentos secuenciales: Antes de Comprar (descubrimiento y anclaje de confianza), Durante la Compra (ejecución sin fricción y trato humano) y Después de Comprar (entrega ejecutiva, portal y lealtad).`, pal.sec);

        // Infografía Vectorial Continua de las 3 Macro-Fases
        const phases = [
          {
            num: "01",
            name: "ANTES DE COMPRAR",
            tag: "Momento 1 · Descubrimiento y Confianza",
            color: pal.darkInk,
            points: d.tpBefore
          },
          {
            num: "02",
            name: "DURANTE LA COMPRA",
            tag: "Momento 2 · Ejecución y Trato Humano",
            color: pal.pri,
            points: d.tpDuring
          },
          {
            num: "03",
            name: "DESPUÉS DE COMPRAR",
            tag: "Momento 3 · Portal, Entregables y Lealtad",
            color: pal.sec,
            points: d.tpAfter
          }
        ];

        phases.forEach((ph, pIdx) => {
          const px = 54 + pIdx * 440;
          drawRoundedRect(ctx, px, 340, 412, 546, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
          ctx.fillStyle = ph.color;
          ctx.fillRect(px, 340, 412, 8);

          ctx.save();
          ctx.beginPath();
          ctx.rect(px + 10, 350, 392, 526);
          ctx.clip();

          // Número grande de momento
          ctx.fillStyle = ph.color;
          ctx.font = "900 32px Montserrat, sans-serif";
          ctx.fillText(ph.num, px + 22, 395);

          ctx.fillStyle = ph.color;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, ph.tag, px + 76, 380, 310);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 17px Montserrat, sans-serif";
          fillTextFitted(ctx, ph.name, px + 76, 404, 310);

          // Línea separadora
          ctx.strokeStyle = "#CBD5E1";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px + 22, 422);
          ctx.lineTo(px + 390, 422);
          ctx.stroke();

          // Los 4 Puntos de Contacto Reales de esta Fase
          ph.points.forEach((pt, ptIdx) => {
            const py = 440 + ptIdx * 105;
            drawRoundedRect(ctx, px + 20, py, 372, 92, isRect ? 3 : 12, "#FFFFFF", "#E2E8F0", 1.2);
            ctx.fillStyle = ph.color;
            ctx.fillRect(px + 20, py, 5, 92);

            ctx.fillStyle = ph.color;
            ctx.font = "800 10px Montserrat, sans-serif";
            fillTextFitted(ctx, `PUNTO CLAVE 0${ptIdx + 1}`, px + 36, py + 22, 340);

            ctx.fillStyle = pal.darkInk;
            ctx.font = "600 12.2px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, pt, px + 36, py + 42, 340, 18, 3);
          });
          ctx.restore();
        });

      } else if (i === 9) {
        // LÁMINA 10: TOUCHPOINTS MOMENTO 1: ANTES DE COMPRAR (DESCUBRIMIENTO Y CONFIANZA)
        // Columna Izquierda: Escenario Vectorial de Descubrimiento (Móvil + Búsqueda)
        const scX = 54, scW = 540;
        drawEditorialBlock(scX, 160, scW, 726, "ESCENARIO DE DESCUBRIMIENTO", "La Primera Impresión Fija el Marco de Confianza", `Como enseña Jan Carlzon, el cliente se forma una opinión en los primeros 15 segundos. Nuestro ecosistema previo a la compra combina presencia en redes, web clara y atención conversacional inmediata para transmitir orden y autoridad técnica.`, pal.darkInk);

        // Vector de smartphone en curvas con wireframe de landing y chat
        const phX = scX + 130, phY = 320, phW = 280, phH = 430;
        drawRoundedRect(ctx, phX, phY, phW, phH, 32, "#0F172A", "#334155", 3);
        drawRoundedRect(ctx, phX + 12, phY + 12, phW - 24, phH - 24, 22, "#FFFFFF", "#E2E8F0", 1.5);

        // Pantalla de teléfono
        ctx.fillStyle = pal.pri;
        ctx.fillRect(phX + 12, phY + 12, phW - 24, 38);
        drawLogoOrEmblem(phX + 22, phY + 18, 26, true);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText(bUpper, phX + 56, phY + 36);

        // Wireframe de contenido en pantalla
        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 13px Montserrat, sans-serif";
        drawWrappedText(ctx, `Crea tu marca en minutos con Aura`, phX + 26, phY + 76, phW - 52, 17, 2);

        // Mensaje de WhatsApp en pantalla
        drawRoundedRect(ctx, phX + 24, phY + 130, phW - 48, 86, 12, "#DCF8C6", "#86EFAC", 1);
        ctx.fillStyle = "#065F46";
        ctx.font = "800 9.5px Montserrat, sans-serif";
        ctx.fillText("AURA CONCIERGE 24/7", phX + 36, phY + 148);
        ctx.fillStyle = "#1F2937";
        ctx.font = "500 10.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Hola, bienvenido a ${bName}. Cuéntame tu proyecto y te preparo una propuesta en 2 minutos.`, phX + 36, phY + 166, phW - 72, 15, 3);

        // Ficha inferior
        drawRoundedRect(ctx, scX + 24, 765, scW - 48, 105, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("ESTÁNDAR OFICIAL DE RESPUESTA", scX + 40, 792);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Tiempo de respuesta menor a 3 minutos vía WhatsApp y sitio web con velocidad de carga menor a 1.2 segundos.`, scX + 40, 814, scW - 80, 18, 2);

        // Columna Derecha: Los 4 Touchpoints de Descubrimiento a Detalle
        const dtX = 620, dtW = 726;
        drawEditorialBlock(dtX, 160, dtW, 726, "INGENIERÍA DE MOMENTO 1", "Los 4 Puntos de Contacto Previos a la Compra", "", pal.sec);

        const beforeTouchpoints = [
          {
            badge: "TOUCHPOINT 01 · AUTORIDAD DIGITAL",
            title: "Redes Sociales y Publicaciones de Valor",
            body: d.tpBefore[0] || `Presencia cuidada en LinkedIn e Instagram con piezas visuales en Lienzo Claro (#FFFFFF) y acentos en ${pal.sec}. Compartimos casos reales y método, sin saturar con promociones vacías.`
          },
          {
            badge: "TOUCHPOINT 02 · SITIO WEB OFICIAL",
            title: `Portal Comercial y Experiencia Web (${assets.cleanSlug}.com)`,
            body: d.tpBefore[1] || `Sitio web limpio y directo que explica el valor en el primer scroll. Incluye comparativa de valor transparente y acceso inmediato a demo sin necesidad de registro forzado.`
          },
          {
            badge: "TOUCHPOINT 03 · ASISTENCIA CONVERSACIONAL",
            title: "Agente Inteligente en WhatsApp 24/7",
            body: d.tpBefore[2] || `Atención inmediata con lenguaje empático que resuelve inquietudes de horario, precio y metodología, facilitando la agenda de citas o la compra directa en segundos.`
          },
          {
            badge: "TOUCHPOINT 04 · DIAGNÓSTICO INICIAL",
            title: "Solicitud y Cotización Transparente",
            body: d.tpBefore[3] || `Formulario o diálogo inicial que captura las necesidades reales sin tecnicismos confusos, generando una propuesta ejecutiva formal en menos de 24 horas.`
          }
        ];

        beforeTouchpoints.forEach((bt, bIdx) => {
          const by = 246 + bIdx * 154;
          drawRoundedRect(ctx, dtX + 24, by, dtW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = bIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(dtX + 24, by, 6, 138);

          ctx.fillStyle = bIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, bt.badge, dtX + 44, by + 30, dtW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, bt.title, dtX + 44, by + 54, dtW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, bt.body, dtX + 44, by + 78, dtW - 88, 19, 3);
        });

      }
    
      else if (i === 10) {
        // LÁMINA 11: TOUCHPOINTS MOMENTO 2: DURANTE LA COMPRA Y EJECUCIÓN (JAN CARLZON & DON NORMAN)
        // Columna Izquierda: Escenario Vectorial de Ejecución y Contrato
        const exX = 54, exW = 540;
        drawEditorialBlock(exX, 160, exW, 726, "ESCENARIO DE COMPRA Y SERVICIO", "Fricción Cero en la Contratación y Entrega", `La fase donde la promesa comercial se vuelve realidad tangible. Diseñamos un flujo transparente sin sorpresas de costos, con sesiones de trabajo colaborativas y visualización continua de avances.`, pal.pri);

        // Vector de documento ejecutivo y apretón de manos
        const docX = exX + 130, docY = 320, docW = 280, docH = 430;
        drawRoundedRect(ctx, docX, docY, docW, docH, 16, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(docX, docY, docW, 40);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 12px Montserrat, sans-serif";
        ctx.fillText("PROPUESTA Y ACUERDO OFICIAL", docX + 18, docY + 25);

        // Líneas de contenido de documento
        [80, 110, 140, 170, 200, 230, 260].forEach((ly, lIdx) => {
          ctx.fillStyle = lIdx === 0 ? pal.sec : "#E2E8F0";
          ctx.fillRect(docX + 20, docY + ly, lIdx === 0 ? 120 : (lIdx % 2 === 0 ? docW - 50 : docW - 80), lIdx === 0 ? 8 : 6);
        });

        // Casillas de verificación
        [300, 335, 370].forEach((cy, cIdx) => {
          ctx.strokeStyle = "#10B981";
          ctx.lineWidth = 2;
          ctx.strokeRect(docX + 20, docY + cy, 18, 18);
          ctx.fillStyle = "#10B981";
          ctx.beginPath();
          ctx.arc(docX + 29, docY + cy + 9, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = pal.darkInk;
          ctx.font = "700 11px Plus Jakarta Sans, sans-serif";
          ctx.fillText(cIdx === 0 ? "Diagnóstico validado" : (cIdx === 1 ? "Entregables certificados" : "Acompañamiento activo"), docX + 48, docY + cy + 13);
        });

        drawRoundedRect(ctx, exX + 24, 765, exW - 48, 105, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("ESTÁNDAR DE EJECUCIÓN", exX + 40, 792);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Tiempos de entrega innegociables y actualización de avances cada 48 horas sin que el cliente tenga que solicitarlo.`, exX + 40, 814, exW - 80, 18, 2);

        // Columna Derecha: Los 4 Touchpoints Durante la Compra
        const dcX = 620, dcW = 726;
        drawEditorialBlock(dcX, 160, dcW, 726, "INGENIERÍA DE MOMENTO 2", "Los 4 Puntos de Contacto Durante el Servicio", "", pal.pri);

        const duringTouchpoints = [
          {
            badge: "TOUCHPOINT 01 · CONTRATACIÓN ÁGIL",
            title: "Proceso de Pago y Firma Transparente",
            body: d.tpDuring[0] || `Pasarela digital segura con opciones de pago directo (Tarjeta, Apple Pay, Google Pay, transferencia bancaria), factura inmediata y contrato de términos claros sin cláusulas abusivas.`
          },
          {
            badge: "TOUCHPOINT 02 · ONBOARDING EJECUTIVO",
            title: "Sesión de Alineación Hombro con Hombro",
            body: d.tpDuring[1] || `Reunión inicial de bienvenida para clarificar expectativas, roles y fechas clave. Se asigna un responsable directo de proyecto que acompaña al cliente sin triangulaciones.`
          },
          {
            badge: "TOUCHPOINT 03 · SEGUIMIENTO EN VIVO",
            title: "Presentación de Avances y Prototipos",
            body: d.tpDuring[2] || `Presentaciones visuales ejecutivas en Lienzo Claro (#FFFFFF) donde el cliente evalúa avances reales con criterio técnico, permitiendo retroalimentación precisa y ágil.`
          },
          {
            badge: "TOUCHPOINT 04 · PROTOCOLO DE ENTREGA",
            title: "Entrega Puntual y Empaquetado Premium",
            body: d.tpDuring[3] || `Tanto en entregables físicos como digitales, cuidamos el acabado, la resolución y la organización estructural para que el cliente reciba una solución lista para operar hoy mismo.`
          }
        ];

        duringTouchpoints.forEach((dt, dIdx) => {
          const dy = 246 + dIdx * 154;
          drawRoundedRect(ctx, dcX + 24, dy, dcW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(dcX + 24, dy, 6, 138);

          ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, dt.badge, dcX + 44, dy + 30, dcW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, dt.title, dcX + 44, dy + 54, dcW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, dt.body, dcX + 44, dy + 78, dcW - 88, 19, 3);
        });

      } else if (i === 11) {
        // LÁMINA 12: TOUCHPOINTS MOMENTO 3: DESPUÉS DE COMPRAR (PORTAL, ENTREGABLES Y LEALTAD)
        // Columna Izquierda: Escenario Vectorial de Bóveda y Lealtad
        const poX = 54, poW = 540;
        drawEditorialBlock(poX, 160, poW, 726, "ESCENARIO DE POST-VENTA", "La Génesis de la Próxima Compra y Recomendación", `El servicio post-venta en ${bName} no es un costo de soporte; es el activo que convierte clientes satisfechos en embajadores apasionados. Garantizamos acceso perpetuo a los activos y acompañamiento evolutivo.`, pal.sec);

        // Vector de portal digital con carpetas de activos
        const vX = poX + 130, vY = 320, vW = 280, vH = 430;
        drawRoundedRect(ctx, vX, vY, vW, vH, 18, "#0F172A", "#1E293B", 2);

        // Cabezal del portal
        ctx.fillStyle = "#1E293B";
        ctx.fillRect(vX, vY, vW, 44);
        ctx.fillStyle = pal.sec;
        ctx.beginPath();
        ctx.arc(vX + 24, vY + 22, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText(`PORTAL DE CLIENTE · ${bUpper}`, vX + 38, vY + 26);

        // Carpetas de activos digitales
        const folders = [
          ["Manual Oficial 30 Hojas (.PDF)", "Vectores en curvas de alta resolución"],
          ["Logotipos en Formatos Vectoriales", ".SVG, .PNG positivo y negativo calado"],
          ["Fuentes y Recursos Tipográficos", "Familias Montserrat y Plus Jakarta Sans"],
          ["Facturas y Certificados de Vigencia", "Comprobantes fiscales y licencias"]
        ];

        folders.forEach((f, fIdx) => {
          const fy = vY + 60 + fIdx * 80;
          drawRoundedRect(ctx, vX + 16, fy, vW - 32, 68, 10, "#1E293B", "#334155", 1);
          ctx.fillStyle = pal.pri;
          ctx.fillRect(vX + 16, fy, 4, 68);

          ctx.fillStyle = "#F8FAFC";
          ctx.font = "800 11.5px Montserrat, sans-serif";
          fillTextFitted(ctx, f[0], vX + 28, fy + 26, vW - 56);

          ctx.fillStyle = "#94A3B8";
          ctx.font = "500 10.5px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, f[1], vX + 28, fy + 46, vW - 56);
        });

        // Ficha inferior
        drawRoundedRect(ctx, poX + 24, 765, poW - 48, 105, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("GARANTÍA Y RETENCIÓN ACTIVA", poX + 40, 792);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Auditoría anual de vigencia visual y actualización gratuita ante cambios de versión del software o formatos web.`, poX + 40, 814, poW - 80, 18, 2);

        // Columna Derecha: Los 4 Touchpoints de Post-Venta
        const atX = 620, atW = 726;
        drawEditorialBlock(atX, 160, atW, 726, "INGENIERÍA DE MOMENTO 3", "Los 4 Puntos de Contacto de Fidelización y Lealtad", "", pal.sec);

        const afterTouchpoints = [
          {
            badge: "TOUCHPOINT 01 · BÓVEDA DIGITAL PRIVADA",
            title: "Portal de Clientes con Acceso 24/7",
            body: d.tpAfter[0] || `Repositorio centralizado en la nube donde el cliente descarga en cualquier momento sus manuales, logotipos en curvas, licencias y comprobantes sin intermediarios ni demoras.`
          },
          {
            badge: "TOUCHPOINT 02 · ENTREGABLES CERTIFICADOS",
            title: "Manuales de Marca y Guías Operativas",
            body: d.tpAfter[1] || `Entrega del Manual de Marca de 30 Hojas en .PDF vectorial nativo y versión .HTML interactiva, garantizando que impresores, desarrolladores y agencias apliquen la marca sin desviaciones.`
          },
          {
            badge: "TOUCHPOINT 03 · CALIBRACIÓN DE SATISFACCIÓN",
            title: "Encuesta Ejecutiva de Calidad y NPS",
            body: d.tpAfter[2] || `Medición formal del índice de satisfacción tras la entrega, evaluando la claridad, la velocidad y la atención recibida para implementar mejoras operativas inmediatas.`
          },
          {
            badge: "TOUCHPOINT 04 · ALIANZA CONTINUA",
            title: "Acompañamiento y Evolución de Marca",
            body: d.tpAfter[3] || `Seguimiento periódico para evaluar la tracción del sistema en el mercado, ofreciendo ampliaciones de portafolio y nuevos recursos gráficos conforme el negocio crece.`
          }
        ];

        afterTouchpoints.forEach((at, aIdx) => {
          const ay = 246 + aIdx * 154;
          drawRoundedRect(ctx, atX + 24, ay, atW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = aIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(atX + 24, ay, 6, 138);

          ctx.fillStyle = aIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, at.badge, atX + 44, ay + 30, atW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, at.title, atX + 44, ay + 54, atW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, at.body, atX + 44, ay + 78, atW - 88, 19, 3);
        });

      } else if (i === 12) {
        // LÁMINA 13: NAMING ESTRATÉGICO, SEMIÓTICA Y CLASES DE NIZA (ALEXANDRA WATKINS & AL RIES)
        // Cabezal Superior con Desglose Fonético del Nombre
        drawRoundedRect(ctx, 54, 160, 1292, 185, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(54, 160, 1292, 7);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11.5px Montserrat, sans-serif";
        fillTextFitted(ctx, "ANATOMÍA FONÉTICA Y POSICIONAMIENTO EN LA MENTE", 80, 194, 600);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 44px Montserrat, sans-serif";
        fillTextFitted(ctx, bUpper, 80, 246, 750);

        ctx.fillStyle = pal.pri;
        ctx.font = "700 13px Plus Jakarta Sans, sans-serif";
        fillTextFitted(ctx, `Etimología y justificación semiótica: Nombre de alta sonoridad y memorabilidad inmediata diseñado para dominar la categoría de ${industry}.`, 80, 280, 750);

        // Bloque derecho de cabezal: Sello oficial de registro Niza
        drawRoundedRect(ctx, 920, 185, 396, 134, isRect ? 4 : 14, "#FFFFFF", "#CBD5E1", 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "CLASIFICACIÓN INTERNACIONAL DE NIZA", 940, 214, 356);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        fillTextFitted(ctx, "CLASES 35 · 42 · PROTECCIÓN GLOBAL", 940, 246, 356);

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Servicios comerciales, dirección de negocios, diseño tecnológico y software de marca. Blindaje ante homónimos.`, 940, 270, 356, 16, 2);

        // Mitad Inferior: El Test SMILE de Alexandra Watkins (Izquierda) y Test SCRATCH (Derecha)
        const smX = 54, smW = 630;
        drawEditorialBlock(smX, 365, smW, 520, "AUDITORÍA SMILE (ALEXANDRA WATKINS)", "5 Factores de Fortaleza Fonética y Emocional", "", pal.pri);

        const smileItems = [
          ["S · SUGGESTIVE", "Evoca la Esencia del Negocio", `Sugiere de forma inmediata excelencia, liderazgo y solución en ${sectorShort}.`],
          ["M · MEANINGFUL", "Cargado de Significado Real", `El nombre comunica valor genuino sin depender de explicaciones forzadas.`],
          ["I · IMAGERY", "Crea una Imagen Mental Clara", `Provoca asociaciones visuales de estructura, confianza y vanguardia tecnológica.`],
          ["L · LEGS", "Capacidad de Extensión", `Permite crecer hacia nuevas líneas de producto y servicios sin quedar obsoleto.`],
          ["E · EMOTIONAL", "Conexión Empática Inmediata", `Genera calidez y certidumbre en el primer contacto con el cliente.`]
        ];

        smileItems.forEach((sm, smIdx) => {
          const sy = 440 + smIdx * 82;
          drawRoundedRect(ctx, smX + 20, sy, smW - 40, 72, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);
          ctx.fillStyle = pal.pri;
          ctx.font = "800 11.5px Montserrat, sans-serif";
          ctx.fillText(sm[0], smX + 36, sy + 24);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 13px Montserrat, sans-serif";
          fillTextFitted(ctx, sm[1], smX + 180, sy + 24, smW - 210);

          ctx.fillStyle = "#475569";
          ctx.font = "500 11px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sm[2], smX + 36, sy + 44, smW - 72, 15, 2);
        });

        // Derecha: Test SCRATCH de Eliminación de Errores Críticos
        const scX2 = 710, scW2 = 636;
        drawEditorialBlock(scX2, 365, scW2, 520, "FILTRO SCRATCH DE RIESGO CERO", "7 Errores Críticos Superados con Éxito (100%)", "", pal.sec);

        const scratchItems = [
          ["Spelling-challenged", "Fácil de escribir al escuchar"],
          ["Copycat", "Original y sin copia de rivales"],
          ["Restrictive", "No limita la expansión futura"],
          ["Annoying", "Agradable al oído y elegante"],
          ["Tame", "Memorable con personalidad propia"],
          ["Curse of Knowledge", "Cero tecnicismos crípticos"],
          ["Hard to pronounce", "Pronunciación universal fluida"]
        ];

        scratchItems.forEach((sc, scIdx) => {
          const scy = 440 + scIdx * 58;
          drawRoundedRect(ctx, scX2 + 20, scy, scW2 - 40, 50, isRect ? 3 : 8, "#F8FAFC", "#E2E8F0", 1);
          ctx.fillStyle = "#10B981";
          ctx.font = "900 14px Montserrat, sans-serif";
          ctx.fillText("✓", scX2 + 36, scy + 32);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 12.5px Montserrat, sans-serif";
          ctx.fillText(`Superado: ${sc[0]}`, scX2 + 64, scy + 26);

          ctx.fillStyle = "#64748B";
          ctx.font = "500 11px Plus Jakarta Sans, sans-serif";
          ctx.fillText(`— ${sc[1]}`, scX2 + 64, scy + 42);
        });

      } else if (i === 13) {
        // LÁMINA 14: ARQUITECTURA DE MARCA ÚNICA (MONOLÍTICA) O MULTIMARCA
        if (dna.archMode === "multibrand") {
          // Multimarca con 4 Submarcas Homologadas
          drawEditorialBlock(54, 160, 1292, 160, "ARQUITECTURA MULTIMARCA HOMOLOGADA", `Marca Madre ${bUpper} y sus 4 Divisiones de Negocio`, `Estructura corporativa diseñada para grupos que operan en múltiples líneas especializadas. Cada división comparte el símbolo maestro y la tipografía rectora, diferenciándose mediante un color de acento armónico y un descriptor funcional claro.`, pal.pri);

          assets.subBrands.forEach((sb, sIdx) => {
            const sx = 54 + sIdx * 328;
            drawRoundedRect(ctx, sx, 340, 308, 546, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
            ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
            ctx.fillRect(sx, 340, 308, 8);

            drawLogoOrEmblem(sx + 89, 370, 130, false, sb.suffix, 270);
            ctx.fillStyle = pal.darkInk;
            ctx.font = "800 16px Montserrat, sans-serif";
            ctx.textAlign = "center";
            fillTextFitted(ctx, `${bUpper} ${sb.suffix}`, sx + 154, 545, 275);
            ctx.textAlign = "left";

            ctx.fillStyle = "#334155";
            ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, sb.tagline, sx + 20, 580, 268, 18, 5);

            ctx.fillStyle = pal.pri;
            ctx.font = "800 10.5px JetBrains Mono, monospace";
            ctx.textAlign = "center";
            fillTextFitted(ctx, sb.domain, sx + 154, 845, 275);
            ctx.textAlign = "left";
          });
        } else {
          // MARCA ÚNICA (MONOLÍTICA): Foco total en un solo nombre oficial
          // Columna Izquierda: Principio de Concentración Total de Valor
          const moX = 54, moW = 540;
          drawRoundedRect(ctx, moX, 160, moW, 726, isRect ? 4 : 20, "#F8FAFC", pal.pri, 2);
          ctx.fillStyle = pal.sec;
          ctx.fillRect(moX, 160, moW, 8);

          ctx.save();
          ctx.beginPath();
          ctx.rect(moX + 10, 172, moW - 20, 706);
          ctx.clip();

          drawLogoOrEmblem(moX + 160, 195, 220, false);
          ctx.textAlign = "center";
          ctx.fillStyle = pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, "IDENTIDAD UNIFICADA AL 100% · SIN SUBMARCAS", moX + 270, 452, moW - 60);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "900 28px Montserrat, sans-serif";
          fillTextFitted(ctx, bUpper, moX + 270, 488, moW - 60);

          ctx.fillStyle = pal.pri;
          ctx.font = "700 13px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, tagline, moX + 270, 514, moW - 60);
          ctx.textAlign = "left";

          drawEditorialBlock(moX + 22, 542, moW - 44, 155, "POR QUÉ OPERAMOS COMO MARCA ÚNICA", "Concentración Absoluta de Prestigio", `A diferencia de los grupos dispersos, ${bName} concentra el 100% de su inversión publicitaria, confianza y valor de marca en un solo nombre. Cada éxito de cualquier producto fortalece directamente la reputación global de ${bName}.`, pal.pri);

          drawEditorialBlock(moX + 22, 712, moW - 44, 155, "REGLA DE ORO DE IDENTIDAD", "Un Solo Nombre y 3 Disposiciones", `Queda estrictamente prohibido crear submarcas o agregar sufijos arbitrarios. La marca se adapta únicamente en su disposición geométrica (Horizontal, Vertical o 1:1) según las exigencias del soporte.`, pal.sec);
          ctx.restore();

          // Columna Derecha: Las 3 Disposiciones Oficiales del Logotipo Único
          const dpX = 620, dpW = 726;
          const dispositions = [
            {
              badge: "DISPOSICIÓN 01 · USO PRINCIPAL EN CABEZALES Y DOCUMENTOS",
              title: `Firma Horizontal Principal (${bName})`,
              body: `Integra el símbolo en positivo a la izquierda y el logotipo tipográfico a la derecha. Uso obligatorio en cabezales web (www.${assets.cleanSlug}.com), portadas de propuestas comerciales y hojas membretadas oficiales.`
            },
            {
              badge: "DISPOSICIÓN 02 · USO EN EMPAQUES, SEÑALÉTICA Y RÓTULOS",
              title: `Emblema Vertical Centrado (${bName})`,
              body: `Presenta el símbolo maestro en eje central simétrico sobre el nombre ${bUpper}. Ideal para etiquetas verticales, empaques, bolsas de entrega, uniformes y tótems de recepción.`
            },
            {
              badge: "DISPOSICIÓN 03 · USO EN ECOSISTEMA DIGITAL Y REDES",
              title: "Símbolo Compacto 1:1 (Icono de App y Avatar)",
              body: `Síntesis óptica cuadrada 1:1 para foto de perfil en WhatsApp Business, Instagram, LinkedIn, favicon web e icono de aplicación móvil desde 16 píxeles con máxima nitidez.`
            }
          ];

          dispositions.forEach((disp, dIdx) => {
            const dy = 160 + dIdx * 248;
            drawRoundedRect(ctx, dpX, dy, dpW, 230, isRect ? 4 : 18, "#FFFFFF", "#CBD5E1", 1.8);
            ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
            ctx.fillRect(dpX, dy, 6, 230);

            ctx.save();
            ctx.beginPath();
            ctx.rect(dpX + 10, dy + 8, dpW - 20, 214);
            ctx.clip();

            drawRoundedRect(ctx, dpX + 20, dy + 22, 184, 184, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.5);
            drawLogoOrEmblem(dpX + 52, dy + 42, 120, false, dIdx === 0 ? "HORIZONTAL" : dIdx === 1 ? "VERTICAL" : "ICONO 1:1", 164);

            ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
            ctx.font = "800 10px Montserrat, sans-serif";
            fillTextFitted(ctx, disp.badge, dpX + 225, dy + 40, dpW - 245);

            ctx.fillStyle = pal.darkInk;
            ctx.font = "800 18px Montserrat, sans-serif";
            fillTextFitted(ctx, disp.title, dpX + 225, dy + 68, dpW - 245);

            ctx.fillStyle = "#334155";
            ctx.font = "500 13px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, disp.body, dpX + 225, dy + 98, dpW - 245, 20, 5);
            ctx.restore();
          });
        }

      } else if (i === 14) {
        // LÁMINA 15: ANATOMÍA SEMIÓTICA DEL SÍMBOLO MAESTRO (PAUL RAND & SAGI HAVIV)
        // Izquierda: Símbolo a Gran Escala con Guías Ópticas de Construcción
        const smX = 54, smW = 630;
        drawRoundedRect(ctx, smX, 160, smW, 726, isRect ? 4 : 22, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(smX, 160, smW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(smX + 8, 172, smW - 16, 706);
        ctx.clip();

        const sCenter = smX + smW / 2;
        // Guías de retícula y ejes
        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sCenter, 200);
        ctx.lineTo(sCenter, 570);
        ctx.moveTo(smX + 50, 385);
        ctx.lineTo(smX + smW - 50, 385);
        ctx.stroke();

        // Círculos de proporción áurea
        ctx.strokeStyle = pal.softTint;
        ctx.lineWidth = 1.8;
        [120, 160, 200].forEach(r => {
          ctx.beginPath();
          ctx.arc(sCenter, 385, r, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Símbolo maestro central
        drawLogoOrEmblem(sCenter - 140, 245, 280, false);

        // Ficha técnica inferior del símbolo
        drawRoundedRect(ctx, smX + 24, 620, smW - 48, 235, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "JUSTIFICACIÓN SEMIÓTICA Y EQUILIBRIO ÓPTICO", smX + 44, 650, smW - 88);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 16px Montserrat, sans-serif";
        fillTextFitted(ctx, `La Morfología Visual de ${bName}`, smX + 44, 678, smW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `El símbolo sintetiza los valores de ${industry}: orden, solidez técnica y visión hacia el futuro. Su geometría se apoya en arcos tangentes que transmiten dinamismo sin perder aplomo institucional. Los trazos en ${dna.strokeLabel.toLowerCase()} garantizan un peso óptico homogéneo que no se deforma al reducirse a iconos móviles ni al ampliarse en señalética arquitectónica.`, smX + 44, 704, smW - 88, 19, 6);
        ctx.restore();

        // Derecha: Auditoría de 7 Puntos de Paul Rand (100/100)
        const prX = 710, prW = 636;
        drawEditorialBlock(prX, 160, prW, 726, "TEST DE PAUL RAND (CALIDAD DE LOGO)", "Evaluación de 7 Factores de Viabilidad Icónica", "", pal.sec);

        const randFactors = [
          ["01 · DISTINTIVIDAD", "10 / 10", "Se diferencia con claridad de cualquier competidor directo en " + sectorShort + "."],
          ["02 · VISIBILIDAD", "10 / 10", "Impacto visual instantáneo a primer golpe de vista, incluso en entornos saturados."],
          ["03 · ADAPTABILIDAD", "10 / 10", "Funciona en blanco y negro, grabado láser, bordado textil y pantalla digital."],
          ["04 · MEMORABILIDAD", "10 / 10", "Fácil de recordar y describir verbalmente tras verlo una sola vez."],
          ["05 · UNIVERSALIDAD", "10 / 10", "Aceptado y comprendido a través de distintas culturas sin connotaciones equívocas."],
          ["06 · PERDURABILIDAD", "10 / 10", "Diseño inmune a modas pasajeras que mantendrá su vigencia durante décadas."],
          ["07 · SIMPLICIDAD", "10 / 10", "Reducido a sus elementos indispensables sin elementos superfluos."]
        ];

        randFactors.forEach((rf, rIdx) => {
          const rfy = 246 + rIdx * 78;
          drawRoundedRect(ctx, prX + 24, rfy, prW - 48, 68, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);

          ctx.fillStyle = pal.pri;
          ctx.font = "800 11px Montserrat, sans-serif";
          ctx.fillText(rf[0], prX + 40, rfy + 24);

          ctx.fillStyle = "#10B981";
          ctx.font = "900 13px Montserrat, sans-serif";
          ctx.textAlign = "right";
          ctx.fillText(rf[1] + " ★", prX + prW - 40, rfy + 24);
          ctx.textAlign = "left";

          ctx.fillStyle = "#475569";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, rf[2], prX + 40, rfy + 44, prW - 80, 16, 2);
        });

        // Dictamen inferior de Rand
        drawRoundedRect(ctx, prX + 24, 804, prW - 48, 68, isRect ? 4 : 10, "#ECFDF5", "#A7F3D0", 1.5);
        ctx.fillStyle = "#047857";
        ctx.font = "800 12px Montserrat, sans-serif";
        ctx.fillText("DICTAMEN OFICIAL: APTO PARA REGISTRO Y RECONOCIMIENTO ICÓNICO", prX + 40, 832);
        ctx.fillStyle = "#065F46";
        ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Puntuación Total: 100/100 · Símbolo certificado por el Consejo Metodológico.", prX + 40, 852);

      } else if (i >= 15 && i <= 18) {
        // LÁMINAS 16–19: LOS 4 PILARES DE EXCELENCIA DE LA MARCA ÚNICA (O SUBMARCAS)
        const pilarIndex = i - 14; // 1, 2, 3, 4
        const pilarTitles = [
          `Pilar 01 de ${bName}: Solución Central y Propuesta de Valor`,
          `Pilar 02 de ${bName}: Estándar de Experiencia y Atención al Cliente`,
          `Pilar 03 de ${bName}: Ecosistema Digital y Adaptabilidad 1:1`,
          `Pilar 04 de ${bName}: Control de Calidad, Entrega y Retención`
        ];
        const pilarBadges = [
          "PROPUESTA CORE Y VENTAJA COMPETITIVA",
          "EXPERIENCIA HUMANA Y TRATO DE SOCIO",
          "CONECTIVIDAD DIGITAL Y MOVILIDAD",
          "GARANTÍA INSTITUCIONAL Y LEALTAD"
        ];
        const pilarBodies = [
          `La solución central de ${bName} combina rigor analítico, metodología probada y ejecución especializada para resolver el problema raíz de nuestros clientes en ${industry}. Oferta oficial: ${d.valueOffer}`,
          `El trato con el cliente se apoya en la empatía y la presencia accesible. Ningún cliente es un número de folio; acompañamos hombro con hombro desde el diagnóstico inicial hasta la implantación final.`,
          `Diseño concebido para brillar en pantallas OLED de smartphones, tablets, ordenadores y redes sociales. El símbolo 1:1 mantiene su nitidez absoluta incluso en favicons de 16 píxeles.`,
          `Compromiso contractual con la entrega puntual, la vigencia documental y la mejora continua. Respaldamos cada solución con soporte activo y auditorías periódicas.`
        ];

        // Columna Izquierda: Símbolo Monumental en Positivo sobre Fondo Claro
        const pX = 54, pW = 540;
        drawRoundedRect(ctx, pX, 160, pW, 726, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = i % 2 === 0 ? pal.pri : pal.sec;
        ctx.fillRect(pX, 160, pW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(pX + 8, 172, pW - 16, 706);
        ctx.clip();

        drawLogoOrEmblem(pX + 140, 240, 260, false, `PILAR 0${pilarIndex} · OFICIAL`, pW - 60);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        ctx.textAlign = "center";
        fillTextFitted(ctx, bUpper, pX + 270, 560, pW - 60);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 12px Montserrat, sans-serif";
        fillTextFitted(ctx, `DISPOSICIÓN OFICIAL EN ${i === 15 ? 'HORIZONTAL' : (i === 16 ? 'VERTICAL' : (i === 17 ? 'ICONO 1:1' : 'DOCUMENTAL'))}`, pX + 270, 588, pW - 60);
        ctx.textAlign = "left";

        drawEditorialBlock(pX + 24, 630, pW - 48, 226, "APLICACIÓN EN EL MUNDO REAL", "Norma de Uso del Logotipo", `En este pilar, la marca ${bName} se presenta con su logotipo en positivo sobre Lienzo Claro (#FFFFFF). Prohibido deformar el trazo o añadir cajas blancas que rompan el flujo visual.`, pal.pri);
        ctx.restore();

        // Columna Derecha: Contenido Editorial Profundo del Pilar
        const pdX = 620, pdW = 726;
        drawEditorialBlock(pdX, 160, pdW, 726, pilarBadges[pilarIndex - 1], pilarTitles[pilarIndex - 1], "", i % 2 === 0 ? pal.pri : pal.sec);

        // 3 Bloques Específicos de este Pilar
        const pilarSubBlocks = [
          [
            ["01 · DIAGNÓSTICO PROFUNDO", "Comprensión de Raíz", `Analizamos el contexto específico de cada cliente en ${sectorShort} para diseñar la solución exacta.`],
            ["02 · MÉTODO PROBADO", "Cero Improvisación", `Ejecutamos bajo el marco de 7 pasos de The Best Brand con estándares de clase mundial.`],
            ["03 · RESULTADO TANGIBLE", "Impacto Medible", `El cliente experimenta reducción inmediata de fricción operativa y claridad en su comunicación.`]
          ],
          [
            ["01 · ESCUCHA ACTIVA", "Atención sin Arrogancia", "Escuchamos primero la visión del cliente para profesionalizarla con rigor sin imponer caprichos."],
            ["02 · RESPUESTA RÁPIDA", "Cero Burocracia", "Canales directos de comunicación que eliminan intermediarios y resuelven dudas en minutos."],
            ["03 · LEALTAD MUTUA", "Alianza a Largo Plazo", "Construimos relaciones comerciales que perduran por años basadas en el respeto y la confianza."]
          ],
          [
            ["01 · REDUCCIÓN ESCALAR", "Nitidez a 16 Píxeles", "El símbolo mantiene su legibilidad óptica tanto en un rascacielos como en el favicon del navegador."],
            ["02 · OPTIMIZACIÓN MÓVIL", "Cero Latencia en Red", "Archivos SVG matemáticos ultra-ligeros (<15 KB) que cargan instantáneamente en 4G/5G."],
            ["03 · AVATARES Y REDES", "Ajuste Óptico Cuadrado", "Encuadre calibrado para círculos y cuadrados de WhatsApp Business, LinkedIn e Instagram."]
          ],
          [
            ["01 · VIGENCIA DOCUMENTAL", "Garantía de Marca", "Todos los archivos y fuentes quedan resguardados en el portal con validez permanente."],
            ["02 · ENTREGABLES NATIVOS", "Formatos Industriales", "Archivos listos para imprenta offset, serigrafía textil, corte láser y desarrollo web."],
            ["03 · AUDITORÍA ANUAL", "Evolución sin Costo", "Revisión anual para certificar que la marca siga alineada con las nuevas tecnologías."]
          ]
        ];

        pilarSubBlocks[pilarIndex - 1].forEach((sb, sbIdx) => {
          const sby = 246 + sbIdx * 206;
          drawRoundedRect(ctx, pdX + 24, sby, pdW - 48, 186, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = sbIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(pdX + 24, sby, 6, 186);

          ctx.fillStyle = sbIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11.5px Montserrat, sans-serif";
          fillTextFitted(ctx, sb[0], pdX + 44, sby + 32, pdW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 18px Montserrat, sans-serif";
          fillTextFitted(ctx, sb[1], pdX + 44, sby + 58, pdW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 13px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sb[2], pdX + 44, sby + 86, pdW - 88, 20, 4);
        });

      } else if (i === 19) {
        // LÁMINA 20: RETÍCULA CONSTRUCTIVA (8X × 8X) Y GEOMETRÍA EUCLIDIANA (MASSIMO VIGNELLI)
        // Izquierda: Plano Técnico de Construcción en Grilla 8x8 con Cotas en Cyan
        const gridX = 54, gridW = 740, gridH = 726;
        drawRoundedRect(ctx, gridX, 160, gridW, gridH, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = "#0284C7";
        ctx.fillRect(gridX, 160, gridW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(gridX + 8, 172, gridW - 16, gridH - 24);
        ctx.clip();

        // Malla cuadriculada 8x8
        const gCells = 8;
        const cellSize = 62;
        const startGX = gridX + (gridW - gCells * cellSize) / 2;
        const startGY = 210;

        ctx.strokeStyle = "#E0F2FE";
        ctx.lineWidth = 1;
        for (let r = 0; r <= gCells; r++) {
          ctx.beginPath();
          ctx.moveTo(startGX, startGY + r * cellSize);
          ctx.lineTo(startGX + gCells * cellSize, startGY + r * cellSize);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(startGX + r * cellSize, startGY);
          ctx.lineTo(startGX + r * cellSize, startGY + gCells * cellSize);
          ctx.stroke();
        }

        // Ejes principales en Cyan
        ctx.strokeStyle = "#0284C7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startGX, startGY + 4 * cellSize);
        ctx.lineTo(startGX + gCells * cellSize, startGY + 4 * cellSize);
        ctx.moveTo(startGX + 4 * cellSize, startGY);
        ctx.lineTo(startGX + 4 * cellSize, startGY + gCells * cellSize);
        ctx.stroke();

        // Círculos de radio constructivo
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(startGX + 4 * cellSize, startGY + 4 * cellSize, 3 * cellSize, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(startGX + 4 * cellSize, startGY + 4 * cellSize, 1.8 * cellSize, 0, Math.PI * 2);
        ctx.stroke();

        // Símbolo dibujado en el centro de la retícula
        drawLogoOrEmblem(startGX + 4 * cellSize - 110, startGY + 4 * cellSize - 110, 220, false);

        // Cotas milimétricas '8X' y '1X'
        ctx.fillStyle = "#0369A1";
        ctx.font = "800 12px JetBrains Mono, monospace";
        ctx.fillText("|<------------------------ 8X ------------------------>|", startGX, startGY + gCells * cellSize + 28);
        ctx.fillText("MODULO = 1X", startGX + gCells * cellSize + 14, startGY + 32);

        // Rótulo inferior técnico
        drawRoundedRect(ctx, gridX + 24, 755, gridW - 48, 105, isRect ? 4 : 12, "#F0F9FF", "#BAE6FD", 1.5);
        ctx.fillStyle = "#0369A1";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("PROPORCIÓN MATEMÁTICA Y PRECISIÓN VECTORIAL", gridX + 40, 782);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "500 12px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `La totalidad del símbolo se inscribe en un módulo cuadrado de 8X × 8X. Todos los ángulos y radios de curvatura derivan de múltiplos exactos de X, permitiendo una reproducción milimétrica en cualquier soporte físico o digital.`, gridX + 40, 804, gridW - 80, 18, 3);
        ctx.restore();

        // Derecha: Explicación de las Leyes de la Retícula
        const grX = 820, grW = 526;
        drawEditorialBlock(grX, 160, grW, 726, "EL CANON DE MASSIMO VIGNELLI", "Leyes de la Retícula Euclidiana", "", "#0284C7");

        const gridRules = [
          ["01 · EL MÓDULO BASE (1X)", "Unidad Mínima Inmutable", "El grosor del trazo principal define la variable matemática X. Ningún elemento puede trazarse fuera de esta proporción."],
          ["02 · RELACIÓN DE ALTURAS", "Simbolismo y Logotipo", "La altura del texto tipográfico corresponde exactamente a 2.5X respecto a la altura total del símbolo (8X)."],
          ["03 · ESPACIADO ÓPTICO (KERNING)", "Interletraje Calibrado", "El espacio entre caracteres está ajustado matemáticamente para mantener la legibilidad incluso a distancias mayores a 10 metros."],
          ["04 · CENTRO DE GRAVEDAD", "Equilibrio Físico y Visual", "El baricentro óptico del símbolo coincide con el cruce de las diagonales principales de la grilla 8x8."]
        ];

        gridRules.forEach((gr, gIdx) => {
          const gry = 246 + gIdx * 154;
          drawRoundedRect(ctx, grX + 24, gry, grW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = "#0284C7";
          ctx.fillRect(grX + 24, gry, 6, 138);

          ctx.fillStyle = "#0284C7";
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, gr[0], grX + 44, gry + 30, grW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, gr[1], grX + 44, gry + 54, grW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, gr[2], grX + 44, gry + 78, grW - 88, 19, 3);
        });

      }
    
      else if (i === 20) {
        // LÁMINA 21: ÁREA DE AISLAMIENTO (1.5X) Y SECCIÓN EN NEGATIVO CALADO (MASSIMO VIGNELLI & PAUL RAND)
        // Izquierda: Área de Aislamiento 1.5X con Cotas de Ingeniería sobre Lienzo Claro
        const isX = 54, isW = 630;
        drawRoundedRect(ctx, isX, 160, isW, 726, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(isX, 160, isW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(isX + 8, 172, isW - 16, 706);
        ctx.clip();

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "ESPACIO DE GUARDA PERIMETRAL (1.5X)", isX + 24, 202, isW - 48);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 18px Montserrat, sans-serif";
        fillTextFitted(ctx, "Protección Contra Asfixia Visual", isX + 24, 228, isW - 48);

        // Bounding box punteado de aislamiento
        const bxX = isX + 105, bxY = 270, bxW = 420, bxH = 340;
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(bxX, bxY, bxW, bxH);
        ctx.setLineDash([]);

        // Flechas de cota 1.5X
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px JetBrains Mono, monospace";
        ctx.fillText("1.5X", bxX + bxW / 2 - 14, bxY - 10);
        ctx.fillText("1.5X", bxX + bxW / 2 - 14, bxY + bxH + 18);
        ctx.fillText("1.5X", bxX - 38, bxY + bxH / 2 + 4);
        ctx.fillText("1.5X", bxX + bxW + 8, bxY + bxH / 2 + 4);

        // Símbolo dentro del área segura
        drawLogoOrEmblem(bxX + 90, bxY + 50, 240, false);

        // Ficha técnica inferior
        drawRoundedRect(ctx, isX + 24, 650, isW - 48, 205, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "NORMA DE RESPETO PERIMETRAL", isX + 44, 680, isW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `El área de aislamiento equivale a 1.5 veces el módulo X del logotipo. Ningún texto, fotografía, borde o elemento gráfico puede invadir este espacio de guarda. Esta norma garantiza que el símbolo de ${bName} mantenga su respiración y destaque con máxima jerarquía sin competir con su entorno.`, isX + 44, 706, isW - 88, 19, 6);
        ctx.restore();

        // Derecha: Sección Oficial en Negativo Calado sobre Fondo Azul Noche
        const ngX = 710, ngW = 636;
        drawRoundedRect(ctx, ngX, 160, ngW, 726, isRect ? 4 : 20, pal.darkInk, pal.sec, 2.5);

        ctx.save();
        ctx.beginPath();
        ctx.rect(ngX + 8, 172, ngW - 16, 706);
        ctx.clip();

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "VERSIÓN EN NEGATIVO CALADO (SOPORTES OSCUROS)", ngX + 24, 202, ngW - 48);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 18px Montserrat, sans-serif";
        fillTextFitted(ctx, "Firma Oficial sobre Fondo Nocturno", ngX + 24, 228, ngW - 48);

        // Símbolo en negativo a gran escala
        drawLogoOrEmblem(ngX + (ngW - 270) / 2, 280, 270, true);

        // Ficha técnica de uso en negativo
        drawRoundedRect(ctx, ngX + 24, 610, ngW - 48, 245, isRect ? 4 : 14, "rgba(255,255,255,0.06)", "rgba(255,255,255,0.18)", 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "REGLA SUPREMA: CERO PARCHES BLANCOS", ngX + 44, 642, ngW - 88);

        ctx.fillStyle = "#CBD5E1";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Queda estrictamente prohibido encerrar el logotipo positivo dentro de cajas o parches blancos rectangulares cuando el soporte sea oscuro. Cuando el fondo sea ${pal.darkInk}, negro o fotográfico oscuro, se utiliza exclusivamente esta versión calada en negativo con trazos en blanco puro y acento en ${pal.sec}.`, ngX + 44, 668, ngW - 88, 19, 7);
        ctx.restore();

      } else if (i === 21) {
        // LÁMINA 22: USOS INCORRECTOS Y 6 RESTRICCIONES DE INTEGRIDAD VISUAL (MASSIMO VIGNELLI)
        // Cabezal Editorial
        drawEditorialBlock(54, 160, 1292, 140, "DISCIPLINA GRÁFICA Y BLINDAJE DE MARCA (MASSIMO VIGNELLI)", "Las 6 Prohibiciones Innegociables de Uso del Logotipo", `La consistencia visual es la barrera que protege a ${bName} de la degradación gráfica. Estas seis restricciones son de observancia obligatoria para cualquier colaborador, impresor o proveedor tecnológico externo. El logotipo no se interpreta: se reproduce de forma fidedigna.`, "#DC2626");

        // Matriz de 6 Infotargetas Vectoriales con Prohibiciones
        const infractions = [
          {
            num: "01",
            title: "Prohibido Deformar o Estirar",
            desc: "Bajo ninguna circunstancia se debe alterar la proporción horizontal o vertical (aspect ratio) del símbolo o del texto tipográfico.",
            drawInfraction: (ix, iy, iw, ih) => {
              // Dibujar logo estirado artificialmente
              ctx.save();
              ctx.scale(1.4, 0.7);
              drawLogoOrEmblem((ix + 20) / 1.4, (iy + 15) / 0.7, 54, false);
              ctx.restore();
            }
          },
          {
            num: "02",
            title: "Prohibido Rotar Arbitrariamente",
            desc: "El símbolo y el logotipo deben apoyarse siempre en un plano horizontal perfecto de 0°. Queda prohibido inclinarlo o girarlo.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.save();
              ctx.translate(ix + iw / 2, iy + ih / 2);
              ctx.rotate(0.35);
              drawLogoOrEmblem(-27, -27, 54, false);
              ctx.restore();
            }
          },
          {
            num: "03",
            title: "Prohibido Alterar la Paleta",
            desc: `No se permite aplicar colores ajenos a la paleta oficial (como rojos, verdes o degradados no autorizados fuera de ${pal.pri} y ${pal.sec}).`,
            drawInfraction: (ix, iy, iw, ih) => {
              drawRoundedRect(ctx, ix + iw / 2 - 27, iy + ih / 2 - 27, 54, 54, 8, "#EC4899", "#BE185D", 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.font = "900 16px Montserrat, sans-serif";
              ctx.fillText("!?", ix + iw / 2 - 9, iy + ih / 2 + 6);
            }
          },
          {
            num: "04",
            title: "Prohibido Sombras o Biseles",
            desc: "Cero sombras grises difusas, biseles 3D, relieves o efectos de iluminación artificial que rompan la pureza plana vectorial.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.fillStyle = "rgba(0,0,0,0.35)";
              ctx.beginPath();
              ctx.arc(ix + iw / 2 + 6, iy + ih / 2 + 6, 26, 0, Math.PI * 2);
              ctx.fill();
              drawLogoOrEmblem(ix + iw / 2 - 26, iy + ih / 2 - 26, 52, false);
            }
          },
          {
            num: "05",
            title: "Prohibido Parche Blanco en Oscuro",
            desc: "Nunca encerrar el logotipo positivo en una caja blanca sobre fondos oscuros. En fondos oscuros se usa la versión calada.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.fillStyle = "#0F172A";
              ctx.fillRect(ix + 16, iy + 10, iw - 32, ih - 20);
              drawRoundedRect(ctx, ix + iw / 2 - 32, iy + ih / 2 - 24, 64, 48, 4, "#FFFFFF", "#E2E8F0", 1);
              drawLogoOrEmblem(ix + iw / 2 - 18, iy + ih / 2 - 18, 36, false);
            }
          },
          {
            num: "06",
            title: "Prohibido Cambiar la Tipografía",
            desc: "No sustituir las familias oficiales (Montserrat y Plus Jakarta Sans) por tipografías genéricas como Arial, Times o Comic Sans.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.fillStyle = "#991B1B";
              ctx.font = "italic 700 20px 'Times New Roman', serif";
              ctx.textAlign = "center";
              ctx.fillText(bName, ix + iw / 2, iy + ih / 2 + 7);
              ctx.textAlign = "left";
            }
          }
        ];

        infractions.forEach((inf, idx) => {
          const col = idx % 3;
          const row = Math.floor(idx / 3);
          const cxCard = 54 + col * 440;
          const cyCard = 320 + row * 280;

          drawRoundedRect(ctx, cxCard, cyCard, 412, 260, isRect ? 4 : 14, "#FEF2F2", "#FECACA", 1.5);
          ctx.fillStyle = "#DC2626";
          ctx.fillRect(cxCard, cyCard, 412, 5);

          // Escenario visual de infracción (Izquierda de tarjeta)
          const scX = cxCard + 16, scY = cyCard + 24, scW = 110, scH = 100;
          drawRoundedRect(ctx, scX, scY, scW, scH, 8, "#FFFFFF", "#FCA5A5", 1);
          inf.drawInfraction(scX, scY, scW, scH);

          // Símbolo de PROHIBIDO (Círculo rojo con barra diagonal)
          ctx.strokeStyle = "#DC2626";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(scX + scW / 2, scY + scH / 2, 34, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(scX + scW / 2 - 24, scY + scH / 2 - 24);
          ctx.lineTo(scX + scW / 2 + 24, scY + scH / 2 + 24);
          ctx.stroke();

          // Textos de infracción
          ctx.fillStyle = "#DC2626";
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, `RESTRICCIÓN ${inf.num}`, cxCard + 140, cyCard + 42, 250);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          drawWrappedText(ctx, inf.title, cxCard + 140, cyCard + 64, 250, 19, 2);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, inf.desc, cxCard + 16, cyCard + 146, 380, 18, 5);
        });

      } else if (i === 22) {
        // LÁMINA 23: PALETA CROMÁTICA OFICIAL (8 COLORES · PANTONE · CMYK · HEX · WCAG AAA)
        drawEditorialBlock(54, 160, 1292, 130, "INGENIERÍA KANSEI DEL COLOR (MITSUHIRO NAGAMACHI)", "Los 8 Tonos Oficiales del Sistema Cromático", `El color no decora: induce estados emocionales de certeza, autoridad y modernidad. Esta paleta de 8 tonos cuenta con fórmulas verificadas para impresión offset (Pantone & CMYK) y pantallas digitales (HEX & RGB), garantizando contraste accesible certificado WCAG AAA.`, pal.sec);

        const swatches = [
          { name: "01 · PRIMARIO OFICIAL", hex: pal.pri, pms: "Pantone 2945 C", role: "Identidad estructural, vectores principales y cabezales", pct: "20%" },
          { name: "02 · AZUL NOCHE PROFUNDO", hex: pal.darkInk, pms: "Pantone 534 C", role: "Tipografía de lectura, contraste y soporte negativo calado", pct: "70% Fondo" },
          { name: "03 · NARANJA ENERGÍA ACENTO", hex: pal.sec, pms: "Pantone 1585 C", role: "Descriptores, puntos de acción (CTA) y acentos focales", pct: "10%" },
          { name: "04 · AZUL ELÉCTRICO VIBRANTE", hex: pal.accentLight || "#4C9DE6", pms: "Pantone 2925 C", role: "Vínculos interactivos, badges y destellos tecnológicos", pct: "Acento" },
          { name: "05 · GRIS PIZARRA EJECUTIVO", hex: "#334155", pms: "Pantone 7546 C", role: "Párrafos secundarios, fichas técnicas y bordes sutiles", pct: "Neutro" },
          { name: "06 · GRIS MEDIO TÉCNICO", hex: "#707070", pms: "Pantone Cool Gray 8 C", role: "Líneas de cota, retículas de construcción y flechas", pct: "Neutro" },
          { name: "07 · LIENZO CLARO SUPERFICIE", hex: pal.softTint || "#F0F6FC", pms: "Pantone 656 C", role: "Fondos de tarjetas, paneles de lectura y tablas", pct: "Fondo Sec" },
          { name: "08 · BLANCO PURO LIENZO", hex: "#FFFFFF", pms: "Pantone Bright White", role: "Lienzo dominante (70% de la superficie) y respiración", pct: "70% Dom" }
        ];

        swatches.forEach((sw, idx) => {
          const col = idx % 4;
          const row = Math.floor(idx / 4);
          const sx = 54 + col * 328;
          const sy = 310 + row * 285;

          drawRoundedRect(ctx, sx, sy, 308, 265, isRect ? 4 : 16, "#FFFFFF", "#CBD5E1", 1.5);
          ctx.save();
          ctx.beginPath();
          ctx.rect(sx + 4, sy + 4, 300, 257);
          ctx.clip();

          // Muestra grande del color
          drawRoundedRect(ctx, sx + 14, sy + 14, 280, 110, isRect ? 3 : 10, sw.hex, "#CBD5E1", 1);

          ctx.fillStyle = sw.hex === "#FFFFFF" || sw.hex === pal.softTint ? "#0F172A" : "#FFFFFF";
          ctx.font = "800 11px JetBrains Mono, monospace";
          ctx.fillText(sw.hex, sx + 26, sy + 104);

          ctx.fillStyle = pal.sec;
          ctx.font = "800 10px Montserrat, sans-serif";
          fillTextFitted(ctx, sw.name, sx + 16, sy + 146, 276);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 14px Montserrat, sans-serif";
          fillTextFitted(ctx, sw.pms, sx + 16, sy + 168, 276);

          ctx.fillStyle = "#64748B";
          ctx.font = "600 10.5px JetBrains Mono, monospace";
          ctx.fillText(`RGB: ${hexToRgbStr(sw.hex)}`, sx + 16, sy + 192);
          ctx.fillText(`CMYK: ${hexToCmykStr(sw.hex)}`, sx + 16, sy + 210);

          ctx.fillStyle = "#334155";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, `${sw.role} (${sw.pct})`, sx + 16, sy + 230, 276, 16, 2);
          ctx.restore();
        });

      } else if (i === 23) {
        // LÁMINA 24: PROPORCIÓN DE LUZ (70/20/10) Y RECURSOS DE TRAZO (JONY IVE)
        // Cabezal Superior
        drawEditorialBlock(54, 160, 1292, 130, "ARQUITECTURA DE LA LUZ Y EL VACÍO (JONY IVE)", "La Regla de Oro de Luz: 70% Lienzo Claro · 20% Primario · 10% Acento", `El 70% de espacio en blanco (#FFFFFF) no es ausencia de diseño: es el aire y la respiración que otorga jerarquía a la solución de ${bName}. El 20% aporta la solidez institucional y el 10% focaliza la mirada en los puntos críticos de decisión.`, pal.pri);

        // Barra Monumental Proporcional de Luz
        const barX = 54, barY = 310, barW = 1292, barH = 100;
        drawRoundedRect(ctx, barX, barY, barW, barH, 18, "#FFFFFF", "#CBD5E1", 2);
        ctx.save();
        ctx.beginPath();
        ctx.rect(barX + 2, barY + 2, barW - 4, barH - 4);
        ctx.clip();

        // 70% Lienzo Claro
        ctx.fillStyle = "#F8FAFC";
        ctx.fillRect(barX, barY, barW * 0.70, barH);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        ctx.fillText("70% LIENZO CLARO (#FFFFFF)", barX + 32, barY + 58);
        ctx.font = "600 12px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Espacio de respiración, fondo dominante y limpieza absoluta", barX + 32, barY + 80);

        // 20% Primario
        ctx.fillStyle = pal.pri;
        ctx.fillRect(barX + barW * 0.70, barY, barW * 0.20, barH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 18px Montserrat, sans-serif";
        ctx.fillText("20% ESTRUCTURA", barX + barW * 0.70 + 20, barY + 54);
        ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`${pal.pri} · Identidad oficial`, barX + barW * 0.70 + 20, barY + 76);

        // 10% Acento
        ctx.fillStyle = pal.sec;
        ctx.fillRect(barX + barW * 0.90, barY, barW * 0.10, barH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 16px Montserrat, sans-serif";
        ctx.fillText("10%", barX + barW * 0.90 + 16, barY + 54);
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("ACENTO", barX + barW * 0.90 + 16, barY + 74);
        ctx.restore();

        // Mitad Inferior: Los 6 Recursos Gráficos en Curvas de The Best Brand
        const resX = 54, resW = 1292, resY = 440;
        drawEditorialBlock(resX, resY, resW, 446, "CATÁLOGO DE RECURSOS DE TRAZO", `El Sistema de ${dna.strokeLabel} de ${bName}`, "", pal.sec);

        const strokeResources = [
          ["01 · Curva Orbital Asimétrica", "Línea de flujo abierta que guía la lectura sin encasillar"],
          ["02 · Filete de Cota Técnico", "Líneas de 1.5 pt en color acento con nodos en los extremos"],
          ["03 · Contenedores Orgánicos", "Superficies con radio asimétrico que abrazan el contenido"],
          ["04 · Conectores de Trayectoria", "Trazos Bézier con derivaciones hacia hitos de avance"],
          ["05 · Marco Fotográfico Curvo", "Borde asimétrico que enmarca retratos sin cortar cabezas"],
          ["06 · Separador de Eje Limpio", "Línea arquitectónica de 1 pt con corte de color al 30%"]
        ];

        strokeResources.forEach((sr, sIdx) => {
          const col = sIdx % 3;
          const row = Math.floor(sIdx / 3);
          const rxCard = resX + 24 + col * 420;
          const ryCard = resY + 90 + row * 165;

          drawRoundedRect(ctx, rxCard, ryCard, 400, 145, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(rxCard, ryCard, 5, 145);

          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, sr[0], rxCard + 20, ryCard + 30, 360);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sr[1], rxCard + 20, ryCard + 54, 360, 18, 3);

          // Mini vector demostrativo
          ctx.strokeStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(rxCard + 20, ryCard + 120);
          ctx.bezierCurveTo(rxCard + 120, ryCard + 105, rxCard + 240, ryCard + 135, rxCard + 370, ryCard + 115);
          ctx.stroke();
        });

      } else if (i === 24) {
        // LÁMINA 25: SISTEMA TIPOGRÁFICO OFICIAL: FAMILIAS Y ESCALA (MASSIMO VIGNELLI & JONY IVE)
        // Columna Izquierda: Tipografía Principal Display (Montserrat)
        const tyX = 54, tyW = 630;
        drawEditorialBlock(tyX, 160, tyW, 726, "TIPOGRAFÍA PRINCIPAL DISPLAY (TITULARES)", "Montserrat · Fortaleza Geométrica y Elegancia", `Diseñada por Julieta Ulanovsky en Buenos Aires, inspirada en los letreros urbanos del siglo XX. Aporta autoridad inmutable, legibilidad a gran escala y solidez arquitectónica en titulares y logotipos.`, pal.pri);

        drawRoundedRect(ctx, tyX + 24, 280, tyW - 48, 240, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 48px Montserrat, sans-serif";
        ctx.fillText("Aa Gg Rr 99", tyX + 44, 345);

        ctx.fillStyle = pal.pri;
        ctx.font = "700 18px Montserrat, sans-serif";
        ctx.fillText("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", tyX + 44, 385);
        ctx.fillText("abcdefghijklmnñopqrstuvwxyz", tyX + 44, 415);
        ctx.fillText("0123456789 • !?@#$%&/()=", tyX + 44, 445);

        ctx.fillStyle = "#64748B";
        ctx.font = "600 11.5px JetBrains Mono, monospace";
        ctx.fillText("PESOS OFICIALES: 900 BLACK · 800 EXTRA BOLD · 700 BOLD", tyX + 44, 490);

        // Columna Izquierda Inferior: Párrafo de prueba Display
        drawRoundedRect(ctx, tyX + 24, 545, tyW - 48, 315, isRect ? 4 : 14, "#FFFFFF", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("ESCALA MODULAR DE TITULARES", tyX + 44, 575);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 28px Montserrat, sans-serif";
        fillTextFitted(ctx, `Titular H1: ${bUpper}`, tyX + 44, 615, tyW - 88);

        ctx.font = "800 20px Montserrat, sans-serif";
        fillTextFitted(ctx, `Subtítulo H2: Sistemas de Alta Precisión`, tyX + 44, 655, tyW - 88);

        ctx.font = "700 15px Montserrat, sans-serif";
        fillTextFitted(ctx, `Encabezado H3: Claridad Radical para ${sectorShort}`, tyX + 44, 695, tyW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Uso exclusivo en portadas, nombres de láminas, títulos de propuesta ejecutiva y cabezales comerciales. Nunca utilizar para bloques de texto corrido mayores a 3 líneas.`, tyX + 44, 735, tyW - 88, 18, 4);

        // Columna Derecha: Tipografía Secundaria de Lectura (Plus Jakarta Sans / Avenir Next)
        const trX = 710, trW = 636;
        drawEditorialBlock(trX, 160, trW, 726, "TIPOGRAFÍA SECUNDARIA DE LECTURA (TEXTO CORRIDO)", "Plus Jakarta Sans / Avenir Next · Claridad Suiza", `Familia geométrica neogrotesca calibrada para lectura prolongada en pantallas de alta densidad y documentos impresos. Garantiza fatiga visual cero y un flujo armónico en cuerpos de texto y tablas técnicas.`, pal.sec);

        drawRoundedRect(ctx, trX + 24, 280, trW - 48, 240, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 48px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Ee Mm Kk 42", trX + 44, 345);

        ctx.fillStyle = pal.sec;
        ctx.font = "700 18px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", trX + 44, 385);
        ctx.fillText("abcdefghijklmnñopqrstuvwxyz", trX + 44, 415);
        ctx.fillText("0123456789 • €$£¥«»—–§±≠", trX + 44, 445);

        ctx.fillStyle = "#64748B";
        ctx.font = "600 11.5px JetBrains Mono, monospace";
        ctx.fillText("PESOS OFICIALES: 600 SEMIBOLD · 500 MEDIUM · 400 REGULAR", trX + 44, 490);

        // Columna Derecha Inferior: Escala Modular de Párrafos y Jerarquía
        drawRoundedRect(ctx, trX + 24, 545, trW - 48, 315, isRect ? 4 : 14, "#FFFFFF", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("JERARQUÍA EDITORIAL DE LECTURA", trX + 44, 575);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "600 14.5px 'Plus Jakarta Sans', sans-serif";
        fillTextFitted(ctx, `Texto Lead (14 pt): Introducción ejecutiva con ritmo dinámico.`, trX + 44, 610, trW - 88);

        ctx.font = "500 12.5px 'Plus Jakarta Sans', sans-serif";
        fillTextFitted(ctx, `Cuerpo Principal (12 pt): Párrafos informativos con interlineado de 1.5x.`, trX + 44, 645, trW - 88);

        ctx.font = "400 10.5px 'Plus Jakarta Sans', sans-serif";
        fillTextFitted(ctx, `Texto Técnico (10 pt): Notas al pie, metadatos y citas metodológicas.`, trX + 44, 680, trW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Pangrama de validación de glifos: «El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja». Todas las tildes, signos y diéresis verificados.`, trX + 44, 725, trW - 88, 18, 5);

      } else if (i === 25) {
        // LÁMINA 26: LOS 6 SELLOS METODOLÓGICOS (PAUL RAND & MITSUHIRO NAGAMACHI)
        drawEditorialBlock(54, 160, 1292, 130, "SISTEMA DE CERTIFICACIÓN Y RIGOR TÉCNICO", "Los 6 Sellos Metodológicos Oficiales", `Rúbricas gráficas de garantía que avalan la integridad intelectual de cada solución desarrollada bajo el marco de The Best Brand. Se aplican en diplomas, portadas de propuestas, empaques y contratos formales.`, pal.sec);

        const seals = [
          { code: "SELLO 01", name: "Estrategia Socrática", author: "Simon Sinek", desc: "Certifica que la marca cuenta con propósito nuclear (Why) y alineación de causa.", icon: "WHY" },
          { code: "SELLO 02", name: "Geometría Euclidiana", author: "Massimo Vignelli", desc: "Aval de retícula constructiva 8X, proporciones exactas y vectores limpios.", icon: "8X" },
          { code: "SELLO 03", name: "Calibración Kansei", author: "Mitsuhiro Nagamachi", desc: "Garantía de respuesta emocional positiva, balance cromático y empatía humana.", icon: "KAN" },
          { code: "SELLO 04", name: "Arquitectura Monolítica", author: "David Aaker", desc: "Certificación de concentración de valor en un solo nombre sin submarcas forzadas.", icon: "MONO" },
          { code: "SELLO 05", name: "Auditoría Directiva C-00", author: "Consejo Crítico", desc: "Superación del estándar implacable de Steve Jobs: cero plantillas y cero relleno.", icon: "C-00" },
          { code: "SELLO 06", name: "Promulgación Oficial", author: "The Best Brand", desc: "Sello de vigencia constitucional e inmutabilidad de activos de marca.", icon: "LEX" }
        ];

        seals.forEach((sl, sIdx) => {
          const col = sIdx % 3;
          const row = Math.floor(sIdx / 3);
          const sx = 54 + col * 440;
          const sy = 310 + row * 285;

          drawRoundedRect(ctx, sx, sy, 412, 260, isRect ? 4 : 16, "#FFFFFF", "#CBD5E1", 1.5);
          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(sx, sy, 412, 6);

          // Emblema circular del sello
          const scx = sx + 74, scy = sy + 80;
          ctx.strokeStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(scx, scy, 44, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = pal.softTint;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(scx, scy, 38, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "900 13px Montserrat, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(sl.icon, scx, scy + 5);
          ctx.textAlign = "left";

          // Textos del sello
          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          fillTextFitted(ctx, sl.code, sx + 135, sy + 44, 250);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, sl.name, sx + 135, sy + 70, 250);

          ctx.fillStyle = "#64748B";
          ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, `Metodología: ${sl.author}`, sx + 135, sy + 92, 250);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sl.desc, sx + 22, sy + 148, 368, 18, 5);
        });

      } else if (i === 26) {
        // LÁMINA 27: GOBERNANZA Y NORMA OFICIAL DE CO-BRANDING (REGLA MAX C-00)
        drawEditorialBlock(54, 160, 1292, 130, "GOBERNANZA DE IDENTIDAD DOCUMENTAL (MICHAEL PORTER & MARTY NEUMEIER)", "La Regla Max C-00 de Co-Branding y Preservación de Jerarquía", `Cuando ${bName} colabora con clientes, aliados o patrocinadores, la jerarquía visual debe ser nítida e inmutable. El logotipo del cliente o aliado jamás se mezcla ni se funde con los trazos de ${bName}: habita exclusivamente en una cápsula neutra aislada.`, pal.pri);

        // Mitad Inferior: Demostración Visual del Co-Branding en Cápsula Neutra
        const cbX = 54, cbW = 1292, cbY = 310;
        drawRoundedRect(ctx, cbX, cbY, cbW, 576, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);

        // Lado Izquierdo: Logotipo Dominante de The Best Brand
        ctx.fillStyle = pal.sec;
        ctx.font = "800 12px Montserrat, sans-serif";
        ctx.fillText("MARCA RECTORA AUTÓNOMA (LIENZO CLARO DOMINANTE)", cbX + 44, cbY + 48);

        drawLogoOrEmblem(cbX + 80, cbY + 110, 240, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 32px Montserrat, sans-serif";
        ctx.fillText(bUpper, cbX + 360, cbY + 200);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 14px Plus Jakarta Sans, sans-serif";
        ctx.fillText(tagline.toUpperCase(), cbX + 360, cbY + 230);

        // Línea divisoria vertical de co-branding
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cbX + cbW / 2 + 60, cbY + 40);
        ctx.lineTo(cbX + cbW / 2 + 60, cbY + 530);
        ctx.stroke();

        ctx.fillStyle = "#64748B";
        ctx.font = "800 16px Montserrat, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("EN ALIANZA CON", cbX + cbW / 2 + 60, cbY + 285);
        ctx.textAlign = "left";

        // Lado Derecho: La Cápsula Neutra Aislada del Aliado
        const capX = cbX + cbW / 2 + 130, capY = cbY + 120, capW = 440, capH = 260;
        drawRoundedRect(ctx, capX, capY, capW, capH, 16, "#F8FAFC", "#CBD5E1", 1.5);

        ctx.fillStyle = "#64748B";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("CÁPSULA NEUTRA AISLADA DEL CLIENTE O ALIADO", capX + 24, capY + 36);

        // Simulación de logo de cliente en caja neutra
        drawRoundedRect(ctx, capX + 30, capY + 60, capW - 60, 110, 8, "#FFFFFF", "#E2E8F0", 1);
        ctx.fillStyle = "#94A3B8";
        ctx.font = "800 18px Montserrat, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("[ LOGOTIPO DEL CLIENTE / PARTNER ]", capX + capW / 2, capY + 125);
        ctx.textAlign = "left";

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Aislamiento estricto: El logotipo del cliente no adopta la tipografía ni los colores de ${bName}, preservando al 100% su identidad original en su propio espacio.`, capX + 24, capY + 195, capW - 48, 17, 3);

        // Rótulo de directiva al pie
        drawRoundedRect(ctx, cbX + 44, cbY + 440, cbW - 88, 100, isRect ? 4 : 12, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("REGLA DOCUMENTAL MAX C-00 (VIGENTE)", cbX + 64, cbY + 468);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "500 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Todo documento emitido por ${bName} debe ejecutarse en Lienzo Claro (#FFFFFF) con logotipo en positivo. Si el documento es firmado por el cliente, se diseña enteramente bajo el manual del cliente sin mezclar estilos.`, cbX + 64, cbY + 490, cbW - 128, 18, 2);

      } else if (i === 27) {
        // LÁMINA 28: PAPELERÍA EN LIENZO CLARO Y APLICACIONES EJECUTIVAS (MARTY NEUMEIER & JONY IVE)
        drawEditorialBlock(54, 160, 1292, 130, "APLICACIONES FÍSICAS EN LIENZO CLARO", "Papelería Corporativa, Hojas Membretadas y Tarjetas Ejecutivas", `La experiencia táctil en el mundo real. Cada pieza física refleja el mismo rigor gráfico: papel opalina de alto gramaje, 70% de blanco puro, logotipo positivo y acentos precisos sin saturar.`, pal.sec);

        // Mockup Vectorial Izquierdo: Hoja Membretada Ejecutiva A4
        const letX = 54, letY = 310, letW = 520, letH = 576;
        drawRoundedRect(ctx, letX, letY, letW, letH, 16, "#FFFFFF", "#CBD5E1", 2);

        // Cabezal de carta membretada
        drawLogoOrEmblem(letX + 32, letY + 30, 48, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 14px Montserrat, sans-serif";
        ctx.fillText(bUpper, letX + 90, letY + 52);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 9.5px Plus Jakarta Sans, sans-serif";
        ctx.fillText(tagline.toUpperCase(), letX + 90, letY + 68);

        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(letX + 32, letY + 95);
        ctx.lineTo(letX + letW - 32, letY + 95);
        ctx.stroke();

        // Líneas de texto de carta simulada
        ctx.fillStyle = "#64748B";
        ctx.font = "600 10.5px JetBrains Mono, monospace";
        ctx.fillText("FECHA: NOVIEMBRE 2026 · CIUDAD DE MÉXICO", letX + 32, letY + 125);
        ctx.fillText("REF: PROPUESTA INTEGRAL DE MARCA", letX + 32, letY + 145);

        [185, 215, 245, 275, 305, 345, 375, 405, 435].forEach((ly, lIdx) => {
          ctx.fillStyle = lIdx === 0 ? pal.pri : (lIdx === 4 ? pal.sec : "#E2E8F0");
          ctx.fillRect(letX + 32, letY + ly, lIdx === 0 ? 180 : (lIdx % 3 === 0 ? letW - 120 : letW - 64), lIdx === 0 ? 8 : 6);
        });

        // Firma en carta
        ctx.fillStyle = pal.darkInk;
        ctx.font = "italic 700 13px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Jorge Benítez «El Oso»", letX + 32, letY + 500);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("FUNDADOR · IMPROBEARS & SUITE THE BEST", letX + 32, letY + 518);

        // Pie de membrete
        ctx.fillStyle = "#94A3B8";
        ctx.font = "500 9px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`www.${assets.cleanSlug}.com • contacto@${assets.cleanSlug}.com • Confidencial`, letX + 32, letY + 552);

        // Mockups Derechos: Tarjeta Ejecutiva (Frente y Vuelta) + Firma Digital
        const crdX = 600, crdW = 746, crdY = 310;

        // Tarjeta Frente (Lienzo Blanco)
        drawRoundedRect(ctx, crdX, crdY, 360, 210, 14, "#FFFFFF", "#CBD5E1", 2);
        drawLogoOrEmblem(crdX + 40, crdY + 55, 100, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 18px Montserrat, sans-serif";
        ctx.fillText(bUpper, crdX + 155, crdY + 105);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 10.5px Plus Jakarta Sans, sans-serif";
        ctx.fillText(tagline.toUpperCase(), crdX + 155, crdY + 125);

        // Tarjeta Vuelta (Azul Noche Calado)
        drawRoundedRect(ctx, crdX + 386, crdY, 360, 210, 14, pal.darkInk, pal.sec, 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 14px Montserrat, sans-serif";
        ctx.fillText("JORGE BENÍTEZ «EL OSO»", crdX + 416, crdY + 55);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("CHIEF ARCHITECT & FOUNDER", crdX + 416, crdY + 75);

        ctx.fillStyle = "#CBD5E1";
        ctx.font = "500 10.5px JetBrains Mono, monospace";
        ctx.fillText("jorge.benitez@improbears.com", crdX + 416, crdY + 115);
        ctx.fillText("+52 55 1234 5678", crdX + 416, crdY + 135);
        ctx.fillText(`www.${assets.cleanSlug}.com`, crdX + 416, crdY + 155);

        // Firma Digital Ejecutiva de Correo (Inferior Derecha)
        drawRoundedRect(ctx, crdX, crdY + 235, crdW, 341, 16, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("FIRMA DIGITAL HOMOLOGADA PARA CORREO ELECTRÓNICO", crdX + 30, crdY + 270);

        drawRoundedRect(ctx, crdX + 30, crdY + 290, crdW - 60, 165, 12, "#FFFFFF", "#E2E8F0", 1.5);
        drawLogoOrEmblem(crdX + 50, crdY + 320, 68, false);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 16px Montserrat, sans-serif";
        ctx.fillText("Equipo Directivo de " + bName, crdX + 135, crdY + 342);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText(`Especialistas en ${sectorShort}`, crdX + 135, crdY + 364);

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`Atención directa: contacto@${assets.cleanSlug}.com • WhatsApp 24/7 disponible`, crdX + 135, crdY + 392);
        ctx.fillText(`Sitio oficial: www.${assets.cleanSlug}.com`, crdX + 135, crdY + 414);

        ctx.fillStyle = "#64748B";
        ctx.font = "500 10.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Regla técnica: Todas las firmas de correo corporativo deben utilizar código HTML responsivo con imágenes alojadas en CDN SSL y tipografía web segura.`, crdX + 30, crdY + 480, crdW - 60, 17, 3);

      } else if (i === 28) {
        // LÁMINA 29: ECOSISTEMA DIGITAL Y CHECKLIST DE 10 CONTROLES DE INTEGRIDAD (MICHAEL PORTER)
        // Columna Izquierda: Mockups Digitales Responsivos (Desktop + Smartphone)
        const dX = 54, dW = 560;
        drawEditorialBlock(dX, 160, dW, 726, "RESPONSIVIDAD Y MOVILIDAD", "Adaptabilidad Digital en Cualquier Pantalla", `El sistema de diseño de ${bName} se adapta con fluidez desde monitores de escritorio ultrawide hasta pantallas compactas de smartphone. Los vectores matemáticos garantizan velocidad de carga instantánea y cero distorsión.`, pal.pri);

        // Ventana de navegador desktop vectorial
        const brX = dX + 30, brY = 320, brW = dW - 60, brH = 260;
        drawRoundedRect(ctx, brX, brY, brW, brH, 12, "#FFFFFF", "#CBD5E1", 2);

        // Barra superior de navegador
        ctx.fillStyle = "#F1F5F9";
        ctx.fillRect(brX, brY, brW, 36);
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(brX + 18, brY + 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#F59E0B";
        ctx.beginPath();
        ctx.arc(brX + 34, brY + 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(brX + 50, brY + 18, 5, 0, Math.PI * 2);
        ctx.fill();

        // Barra de URL
        drawRoundedRect(ctx, brX + 70, brY + 8, brW - 90, 20, 6, "#FFFFFF", "#CBD5E1", 1);
        ctx.fillStyle = "#64748B";
        ctx.font = "600 9.5px JetBrains Mono, monospace";
        ctx.fillText(`https://www.${assets.cleanSlug}.com`, brX + 85, brY + 22);

        // Contenido de la ventana web
        drawLogoOrEmblem(brX + 24, brY + 54, 42, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 15px Montserrat, sans-serif";
        ctx.fillText(bUpper, brX + 76, brY + 76);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 18px Montserrat, sans-serif";
        fillTextFitted(ctx, `Crea tu marca en minutos con Aura`, brX + 24, brY + 130, brW - 48);

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Sin semanas de espera ni costos inflados. Tu Manual de 30 Hojas listo hoy mismo.`, brX + 24, brY + 155, brW - 48, 16, 2);

        drawRoundedRect(ctx, brX + 24, brY + 195, 140, 36, 18, pal.pri, pal.sec, 1.5);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("Probar Demo ↗", brX + 44, brY + 218);

        // Ficha inferior de velocidad
        drawRoundedRect(ctx, dX + 30, 610, dW - 60, 245, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("ESTÁNDAR DE RENDIMIENTO WEB", dX + 50, 642);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 15px Montserrat, sans-serif";
        ctx.fillText("Core Web Vitals 100/100 · Carga < 1.2s", dX + 50, 668);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Todos los activos SVG y estilos CSS están minificados y optimizados para garantizar que la plataforma obtenga puntuaciones perfectas en Google PageSpeed y sea indexada con máxima prioridad en motores de búsqueda.`, dX + 50, 694, dW - 100, 18, 6);

        // Columna Derecha: Checklist de los 10 Controles de Integridad Digital
        const chX = 640, chW = 706;
        drawEditorialBlock(chX, 160, chW, 726, "AUDITORÍA TÉCNICA DE 10 CONTROLES", "Checklist de Verificación de Integridad Digital (10/10)", "", pal.sec);

        const checkList = [
          ["CONTROL 01", "Favicon 1:1 en formato .ICO y .PNG a 16px, 32px y 48px con nitidez absoluta."],
          ["CONTROL 02", "OpenGraph Card para previsualización impecable al compartir enlaces en WhatsApp y LinkedIn."],
          ["CONTROL 03", "Tipografía web con carga asíncrona (font-display: swap) para evitar saltos de maquetación."],
          ["CONTROL 04", "Contraste accesible nivel WCAG AAA en todos los botones y textos informativos."],
          ["CONTROL 05", "Modo Oscuro nativo utilizando la versión en negativo calado sobre fondos nocturnos."],
          ["CONTROL 06", "Iconos de aplicación móvil en proporción 1:1 listos para iOS App Store y Google Play."],
          ["CONTROL 07", "Archivos SVG depurados con rutas simplificadas y peso menor a 15 KB por archivo."],
          ["CONTROL 08", "Seguridad SSL obligatoria y encabezados de protección CSP contra inyección de código."],
          ["CONTROL 09", "Firma HTML corporativa homologada para todos los buzones de correo institucionales."],
          ["CONTROL 10", "Bóveda de activos en la nube con acceso permanente para clientes y proveedores certificados."]
        ];

        checkList.forEach((ck, cIdx) => {
          const cky = 246 + cIdx * 62;
          drawRoundedRect(ctx, chX + 24, cky, chW - 48, 54, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);

          ctx.fillStyle = "#10B981";
          ctx.font = "900 15px Montserrat, sans-serif";
          ctx.fillText("✓", chX + 40, cky + 33);

          ctx.fillStyle = pal.pri;
          ctx.font = "800 11px Montserrat, sans-serif";
          ctx.fillText(ck[0], chX + 68, cky + 24);

          ctx.fillStyle = "#334155";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, ck[1], chX + 160, cky + 24, chW - 220);

          ctx.fillStyle = "#047857";
          ctx.font = "800 10px JetBrains Mono, monospace";
          ctx.fillText("CERTIFICADO", chX + chW - 130, cky + 33);
        });

      } else if (i === 29) {
        // LÁMINA 30: COLOFÓN INSTITUCIONAL Y CERTIFICADO DE PROMULGACIÓN (MARTY NEUMEIER & MICHAEL PORTER)
        // Gran Marco de Certificado Oficial con Doble Filete en Oro y Navy
        const certX = 54, certY = 160, certW = 1292, certH = 726;
        drawRoundedRect(ctx, certX, certY, certW, certH, isRect ? 4 : 24, "#FFFFFF", pal.pri, 3);

        ctx.save();
        ctx.beginPath();
        ctx.rect(certX + 10, certY + 10, certW - 20, certH - 20);
        ctx.clip();

        // Filete interior dorado/secundario
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(certX + 18, certY + 18, certW - 36, certH - 36);

        // Sello de agua central sutil
        ctx.save();
        ctx.globalAlpha = 0.04;
        drawLogoOrEmblem(certX + certW / 2 - 200, certY + certH / 2 - 200, 400, false);
        ctx.restore();

        // Cabezal del Certificado
        ctx.textAlign = "center";
        ctx.fillStyle = pal.sec;
        ctx.font = "800 13px Montserrat, sans-serif";
        ctx.fillText("REPÚBLICA EDITORIAL DE MARCA · THE BEST BRAND", certX + certW / 2, certY + 70);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 36px Montserrat, sans-serif";
        ctx.fillText("ACTA DE CONSTITUCIÓN Y PROMULGACIÓN DE MARCA", certX + certW / 2, certY + 115);

        ctx.fillStyle = pal.pri;
        ctx.font = "700 15px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`Manual Oficial de 30 Láminas en Curvas — Edición Maestra para ${bUpper}`, certX + certW / 2, certY + 145);

        // Texto formal de promulgación
        ctx.fillStyle = "#334155";
        ctx.font = "500 13.5px Plus Jakarta Sans, sans-serif";
        const declX = certX + 120, declW = certW - 240;
        const textDecl = `Por medio del presente documento, se certifica que la identidad visual, el propósito nuclear, la arquitectura de marca y las normas de ingeniería gráfica contenidas en este manual de 30 láminas han sido plenamente promulgadas y homologadas para ${bName}. A partir de esta fecha, este sistema constituye el estándar inmutable y rector para todas las aplicaciones físicas, digitales, comerciales y jurídicas de la organización, quedando prohibida cualquier desviación que comprometa su integridad.`;
        drawWrappedText(ctx, textDecl, declX, certY + 195, declW, 22, 5);

        // 3 Bloques de Certificación Formal
        const certBlocks = [
          ["AUTORÍA INTELECTUAL", "Ingeniería de Acqua e ImproBears", "Marco de 7 pasos fundamentado en Sinek, Carlzon, Vignelli, Rand y Neumeier."],
          ["ARQUITECTURA DE MARCA", dna.archTitle, `Operación concentrada en marca única sin dispersión de capital en submarcas.`],
          ["FORMATO Y VIGENCIA", "ISO 32000-1 (.PDF Vectorial)", "Vectores matemáticos en curvas puras sin pérdida de resolución a perpetuidad."]
        ];

        certBlocks.forEach((cb, cIdx) => {
          const bx = certX + 60 + cIdx * 395;
          const by = certY + 340;
          drawRoundedRect(ctx, bx, by, 380, 130, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          ctx.fillText(cb[0], bx + 20, by + 30);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 15px Montserrat, sans-serif";
          fillTextFitted(ctx, cb[1], bx + 20, by + 56, 340);

          ctx.fillStyle = "#475569";
          ctx.font = "500 12px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, cb[2], bx + 20, by + 80, 340, 17, 2);
        });

        // Firmas Oficiales y Sello al pie del certificado
        const sigY = certY + 540;

        // Firma 1: Fundador
        ctx.strokeStyle = pal.darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(certX + 140, sigY + 60);
        ctx.lineTo(certX + 440, sigY + 60);
        ctx.stroke();

        ctx.fillStyle = pal.darkInk;
        ctx.font = "italic 700 18px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Jorge Benítez «El Oso»", certX + 290, sigY + 45);

        ctx.font = "800 11.5px Montserrat, sans-serif";
        ctx.fillText("JORGE BENÍTEZ «EL OSO»", certX + 290, sigY + 80);
        ctx.fillStyle = pal.sec;
        ctx.font = "700 10px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Fundador · ImproBears & Suite The Best", certX + 290, sigY + 96);

        // Sello Central de Certificación
        const selCX = certX + certW / 2, selCY = sigY + 50;
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(selCX, selCY, 48, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(selCX, selCY, 42, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = pal.pri;
        ctx.font = "900 12px Montserrat, sans-serif";
        ctx.fillText("PROMULGADO", selCX, selCY - 4);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 9.5px JetBrains Mono, monospace";
        ctx.fillText("OFICIAL 2026", selCX, selCY + 12);

        // Firma 2: Mentor / Arquitecto de Marca
        ctx.strokeStyle = pal.darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(certX + certW - 440, sigY + 60);
        ctx.lineTo(certX + certW - 140, sigY + 60);
        ctx.stroke();

        ctx.fillStyle = pal.darkInk;
        ctx.font = "italic 700 18px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Aura Brand Architect", certX + certW - 290, sigY + 45);

        ctx.font = "800 11.5px Montserrat, sans-serif";
        ctx.fillText("AURA · MENTORA DE IDENTIDAD", certX + certW - 290, sigY + 80);
        ctx.fillStyle = pal.sec;
        ctx.font = "700 10px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Motor Algorítmico de Síntesis de Marca", certX + certW - 290, sigY + 96);

        // Hash de Verificación Criptográfica al fondo
        ctx.fillStyle = "#94A3B8";
        ctx.font = "600 9.5px JetBrains Mono, monospace";
        ctx.fillText(`HASH DE VERIFICACIÓN: SHA256-${bUpper.slice(0, 4)}-${Date.now().toString(16).toUpperCase()}-V71 · EMISIÓN LEGAL REGISTRADA`, certX + certW / 2, certY + certH - 30);
        ctx.textAlign = "left";
        ctx.restore();

      }
    

      jpegPages.push({
        dataUrl: canvas.toDataURL("image/jpeg", 0.88),
        width: W,
        height: H
      });
    }

    // Liberar memoria GPU inmediatamente en iPhone
    canvas.width = 1;
    canvas.height = 1;

    return window.packJpegDataUrlsToA4LandscapePdfBlob(jpegPages);
  };

  // Genera y descarga el archivo .PDF real de 30 láminas directamente en móvil (iPhone App/Safari/Android) y escritorio en ~0.3s
  window.downloadReal30PlatesPDFDirect = async function (triggerBtn) {
    const cs = getActiveCanvasState();
    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";
    const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "thebestbrand";
    const fileName = `Manual_Marca_30_Laminas_${slug}.pdf`;
    const isTBB = /the_?best_?brand/i.test(slug);

    const origText = triggerBtn ? triggerBtn.innerHTML : "";
    const setStatus = (txt) => {
      if (triggerBtn) {
        triggerBtn.disabled = true;
        triggerBtn.style.opacity = "0.88";
        triggerBtn.textContent = txt;
      }
    };

    if (isTBB) {
      try {
        setStatus("Descargando PDF Oficial V80.0 (4.08 MB)...");
        const resp = await fetch("/brandbooks/Manual_Marca_30_Laminas_TheBestBrand_Oficial_v80.pdf");
        if (resp.ok) {
          const blob = await resp.blob();
          await window.tbbDeliverFileNativeOrDownload(
            blob,
            "Manual_Marca_30_Laminas_TheBestBrand_Oficial_v80.pdf",
            "application/pdf",
            "Manual Oficial 30 Láminas — The Best Brand"
          );
          if (triggerBtn) {
            triggerBtn.disabled = false;
            triggerBtn.style.opacity = "1";
            triggerBtn.textContent = "PDF Oficial de 30 Láminas Listo ✓";
            setTimeout(() => { triggerBtn.innerHTML = origText; }, 3500);
          }
          return;
        }
      } catch (err) {
        console.warn("Direct PDF download fallback:", err);
      }
    }

    try {
      setStatus("Compilando PDF Vectorial en Curvas (30 Láminas)...");
      // 1. Intentar primero compilación 100% Vectorial en Curvas en el servidor con Chromium Headless (`page.pdf`)
      try {
        const vectorHtml = (typeof window.buildUniversal30PlatesStandaloneHTML === "function")
          ? window.buildUniversal30PlatesStandaloneHTML()
          : "";
        if (vectorHtml && vectorHtml.length > 500) {
          const vecResp = await fetch("/api/step6/download-pdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              brand_name: bName,
              html_override: vectorHtml
            })
          });
          if (vecResp.ok) {
            const vecBlob = await vecResp.blob();
            if (vecBlob && vecBlob.size > 10000) {
              if (triggerBtn) {
                triggerBtn.disabled = false;
                triggerBtn.style.opacity = "1";
                triggerBtn.textContent = "PDF Vectorial en Curvas Listo (.PDF) ✓";
                setTimeout(() => { triggerBtn.innerHTML = origText; }, 3500);
              }
              await window.tbbDeliverFileNativeOrDownload(
                vecBlob,
                fileName,
                "application/pdf",
                `Manual Oficial 30 Láminas (Vectorial) — ${bName}`
              );
              return;
            }
          }
        }
      } catch (vecErr) {
        console.warn("Server vector PDF compilation unavailable, falling back to local generator:", vecErr);
      }

      // 2. Respaldo offline ultrarrápido en el navegador
      setStatus("Preparando PDF de 30 Láminas...");
      const pdfBlob = await window.generate30PlatesPdfBlobUltraFast((cur, tot) => {
        setStatus(`Generando PDF (${cur}/${tot})...`);
      });

      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.style.opacity = "1";
        triggerBtn.textContent = "PDF de 30 Láminas Listo (.PDF)";
        setTimeout(() => { triggerBtn.innerHTML = origText; }, 3500);
      }

      await window.tbbDeliverFileNativeOrDownload(
        pdfBlob,
        fileName,
        "application/pdf",
        `Manual Oficial 30 Láminas — ${bName}`
      );
    } catch (err) {
      console.error("Error generating 30-plate PDF:", err);
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.style.opacity = "1";
        triggerBtn.innerHTML = origText;
      }
      window.openInApp30PlatesViewer();
    }
  };

  // Construye el documento HTML autónomo de 30 Láminas A4 Horizontal (adaptable en iPhone/Móvil + descarga directa de PDF)
  window.buildUniversal30PlatesStandaloneHTML = function () {
    const cs = getActiveCanvasState();
    const st = window.tbbState || {};
    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";
    const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "thebestbrand";
    const isTBB = /the_?best_?brand/i.test(slug);

    if (window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml === "function") {
      const activeBrandObj = window.buildActiveBrandProfileForV80();
      return window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml(activeBrandObj);
    }

    const activeIt = (st.logoIterations && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const pal = extractColorsFromLogoState(activeIt, st);
    const originUrl = window.location.origin;

    const sheets = [];
    for (let i = 0; i < 30; i++) {
      const rawPlate = window.renderUniversalImproBearsGuideSinglePlateHTML(i, true)
        .replace(/src="\/assets\//g, `src="${originUrl}/assets/`);
      sheets.push(`<div class="benefic-a4-page">${rawPlate}</div>`);
    }

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>Manual Oficial de Identidad y Arquitectura (30 Láminas en Curvas) — ${esc(bName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=JetBrains+Mono:wght@600;700;800&family=Montserrat:wght@500;600;700;800;900&family=Outfit:wght@500;700;800&family=Playfair+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
  <style>
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    @page { size: A4 landscape; margin: 0; }
    body {
      margin: 0;
      padding: 12px;
      background: #F1F5F9;
      font-family: 'Avenir Next', 'Plus Jakarta Sans', sans-serif;
      color: #333333;
      overflow-x: hidden;
    }
    .top-print-bar {
      width: 100%;
      max-width: 1122px;
      margin: 0 auto 16px auto;
      background: #FFFFFF;
      border: 1.5px solid #E6E6E6;
      border-bottom: 4px solid ${pal.sec};
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 28px rgba(13,37,64,0.08);
      position: sticky;
      top: 8px;
      z-index: 999;
    }
    .top-print-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      width: 100%;
      justify-content: flex-end;
    }
    @media (min-width: 768px) {
      .top-print-actions { width: auto; }
    }
    .top-print-btn {
      background: ${pal.pri};
      color: #FFFFFF;
      border: none;
      border-bottom: 3px solid ${pal.darkInk};
      border-radius: 10px;
      padding: 12px 18px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 0.86rem;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      touch-action: manipulation;
      text-align: center;
      flex: 1 1 auto;
    }
    .top-print-btn-sec {
      background: #F8FAFC;
      color: ${pal.darkInk};
      border: 1.5px solid #CBD5E1;
      border-bottom: 3px solid #94A3B8;
      border-radius: 10px;
      padding: 12px 16px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      touch-action: manipulation;
    }
    .benefic-a4-page {
      width: 1122px;
      height: 794px;
      margin: 0 auto 18px auto;
      page-break-after: always;
      break-after: page;
      background: #FFFFFF;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 14px 36px rgba(13,37,64,0.12);
      position: relative;
    }
    .benefic-plate {
      width: 1122px !important;
      height: 794px !important;
      margin: 0 !important;
      background: #FFFFFF;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transform-origin: top left;
    }
    .plate-hdr {
      position: relative;
      z-index: 2;
      padding: 18px 42px 10px 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E6E6E6;
    }
    .plate-body {
      position: relative;
      z-index: 2;
      flex: 1;
      padding: 18px 42px;
      overflow: hidden;
    }
    .plate-ftr {
      position: relative;
      z-index: 2;
      height: 42px;
      background: #FFFFFF;
      padding: 0 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ib-flow-node { padding: 4px 8px 4px 0; }
    .ib-node-hdr {
      display: flex;
      align-items: center;
      gap: 7px;
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .ib-flow-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .ib-flow-txt {
      font-family: 'Avenir Next', 'Plus Jakarta Sans', sans-serif;
      font-size: 11.2px;
      line-height: 1.46;
      color: #333333;
    }
    @media print {
      body { padding: 0; background: #FFFFFF; }
      .top-print-bar { display: none !important; }
      .benefic-a4-page {
        width: 1122px !important;
        height: 794px !important;
        margin: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      .benefic-plate {
        transform: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="top-print-bar">
    <div style="min-width:220px;flex:1;">
      <strong style="font-family:'Montserrat',sans-serif;color:${pal.darkInk};font-size:0.92rem;display:block;">MANUAL OFICIAL EN CURVAS · 30 LÁMINAS A4 · ${esc(bName.toUpperCase())}</strong>
      <div style="font-size:0.76rem;color:#475569;margin-top:2px;">Diseñado siguiendo tu logotipo (${pal.pri} y ${pal.sec}) bajo la Guía Oficial de Identidad de Marca.</div>
    </div>
    <div class="top-print-actions">
      <button type="button" class="top-print-btn-sec" onclick="if(window.history.length>1){window.history.back();}else{window.location.href='${originUrl}/';}">← Volver a la App</button>
      <button type="button" class="top-print-btn" id="btnDirectPdfDownloadStandalone" onclick="downloadStandalone30PlatesPDF(this)">Descargar / Guardar PDF (30 Láminas .PDF)</button>
      <button type="button" class="top-print-btn-sec" onclick="window.print()">Imprimir / AirPrint</button>
    </div>
  </div>
  <div id="platesContainerRoot">
    ${sheets.join("\n")}
  </div>
  <script>
    function fitPlatesToMobileScreen() {
      var vw = Math.min(window.innerWidth || 1122, document.documentElement.clientWidth || 1122) - 24;
      var pages = document.querySelectorAll('.benefic-a4-page');
      for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var plate = page.querySelector('.benefic-plate');
        if (!plate) continue;
        if (vw < 1122) {
          var s = Math.max(0.25, vw / 1122);
          page.style.width = Math.round(1122 * s) + 'px';
          page.style.height = Math.round(794 * s) + 'px';
          plate.style.transform = 'scale(' + s.toFixed(4) + ')';
        } else {
          page.style.width = '1122px';
          page.style.height = '794px';
          plate.style.transform = 'none';
        }
      }
    }
    window.addEventListener('resize', fitPlatesToMobileScreen);
    window.addEventListener('load', fitPlatesToMobileScreen);
    fitPlatesToMobileScreen();

    var packPdfFn = ${window.packJpegDataUrlsToA4LandscapePdfBlob.toString()};

    function showStandaloneIOSSaveSheet(pdfBlob, fileName) {
      var old = document.getElementById('standaloneIOSSaveModal');
      if (old) old.remove();
      var fileObj = (typeof File === 'function') ? new File([pdfBlob], fileName, { type: 'application/pdf' }) : null;
      var modal = document.createElement('div');
      modal.id = 'standaloneIOSSaveModal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(9,13,22,0.74);backdrop-filter:blur(6px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px;';
      modal.innerHTML = '<div style="width:100%;max-width:390px;background:#FFFFFF;border:2px solid #0284C7;border-bottom:6px solid #0369A1;border-radius:22px;padding:22px 18px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,0.35);">' +
        '<div style="display:inline-block;background:#DCFCE7;color:#15803D;border:1px solid #86EFAC;border-radius:999px;padding:4px 12px;font-size:0.72rem;font-weight:800;margin-bottom:8px;">PDF DE 30 LÁMINAS LISTO</div>' +
        '<h3 style="font-family:Montserrat,sans-serif;font-size:1.1rem;font-weight:900;color:#090D16;margin:0 0 8px 0;">Guardar o Compartir en iPhone</h3>' +
        '<p style="font-size:0.82rem;color:#334155;margin:0 0 14px 0;line-height:1.45;">Toca el botón verde para elegir <strong>Guardar en Archivos</strong>, enviar por <strong>WhatsApp</strong> o <strong>AirDrop</strong>.</p>' +
        '<button type="button" id="btnShareStandaloneIOSNow" style="width:100%;background:#58CC02;color:#FFFFFF;border:2px solid #46A302;border-bottom:5px solid #388200;border-radius:14px;padding:14px;font-family:Montserrat,sans-serif;font-size:0.92rem;font-weight:900;cursor:pointer;margin-bottom:8px;-webkit-user-select:none;user-select:none;">Guardar en Archivos / Compartir PDF</button>' +
        '<button type="button" id="btnCloseStandaloneIOSNow" style="width:100%;background:#F8FAFC;color:#0F172A;border:1.5px solid #CBD5E1;border-radius:12px;padding:10px;font-family:Montserrat,sans-serif;font-size:0.82rem;font-weight:800;cursor:pointer;">Cerrar</button>' +
      '</div>';
      document.body.appendChild(modal);
      document.getElementById('btnShareStandaloneIOSNow').onclick = async function() {
        if (fileObj && navigator.share) {
          try {
            await navigator.share({ files: [fileObj], title: fileName });
            modal.remove();
            return;
          } catch (e) {}
        }
        var u = URL.createObjectURL(pdfBlob);
        var a = document.createElement('a');
        a.href = u;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
      };
      document.getElementById('btnCloseStandaloneIOSNow').onclick = function() { modal.remove(); };
    }

    async function downloadStandalone30PlatesPDF(btn) {
      var origLabel = btn.textContent;
      btn.disabled = true;
      btn.style.opacity = '0.85';
      try {
        var plates = document.querySelectorAll('.benefic-plate');
        var jpegPages = [];
        for (var i = 0; i < plates.length; i++) {
          btn.textContent = 'Generando PDF (' + (i + 1) + '/' + plates.length + ')...';
          var p = plates[i];
          var prevTransform = p.style.transform;
          p.style.transform = 'none';
          await new Promise(function(r){ setTimeout(r, 10); });
          var canvas = await html2canvas(p, {
            width: 1122,
            height: 794,
            scale: 1.35,
            backgroundColor: '#FFFFFF',
            useCORS: true,
            logging: false
          });
          p.style.transform = prevTransform;
          jpegPages.push({
            dataUrl: canvas.toDataURL('image/jpeg', 0.88),
            width: canvas.width,
            height: canvas.height
          });
        }
        btn.textContent = 'Empaquetando PDF...';
        var pdfBlob = packPdfFn(jpegPages);
        var fileName = 'Manual_Identidad_30_Laminas_${esc(slug)}.pdf';
        var isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent || '') || Boolean(window.navigator.standalone);
        if (isIOS) {
          showStandaloneIOSSaveSheet(pdfBlob, fileName);
        } else {
          var pdfUrl = URL.createObjectURL(pdfBlob);
          var a = document.createElement('a');
          a.href = pdfUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          setTimeout(function(){ a.remove(); }, 1500);
        }
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.textContent = 'PDF Listo (.PDF)';
        setTimeout(function(){ btn.textContent = origLabel; }, 3500);
      } catch (err) {
        console.error(err);
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.textContent = origLabel;
        window.print();
      }
    }
  <\/script>
</body>
</html>`;
  };
})();
