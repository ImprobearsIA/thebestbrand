// ============================================================================
// THE BEST BRAND · MOTOR GENERATIVO EDITORIAL DE BRANDBOOK V81.0 (FLAWLESS)
// Cero Plantillas Rígidas · Terna de Logos Profesional · Directiva Max C-00
// ============================================================================

(function () {
  "use strict";

  // --- HELPERS BÁSICOS Y SANITIZACIÓN ---
  function esc(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function hexToRgb(hex) {
    const clean = String(hex || "#426EAE").replace("#", "").trim();
    const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean.padEnd(6, "0");
    const num = parseInt(full.slice(0, 6), 16) || 0;
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function hexToCmyk(hex) {
    const { r, g, b } = hexToRgb(hex);
    const r1 = r / 255, g1 = g / 255, b1 = b / 255;
    const k = 1 - Math.max(r1, g1, b1);
    if (k >= 0.99) return "C:40 M:30 Y:20 K:100";
    const c = Math.round(((1 - r1 - k) / (1 - k)) * 100);
    const m = Math.round(((1 - g1 - k) / (1 - k)) * 100);
    const y = Math.round(((1 - b1 - k) / (1 - k)) * 100);
    return `C:${c} M:${m} Y:${y} K:${Math.round(k * 100)}`;
  }

  // UID seguro para IDs SVG (sin espacios ni símbolos, para que url(#...) siempre resuelva)
  function toSafeSymbolUid(raw) {
    return String(raw || "marca").toLowerCase().replace(/[^a-z0-9_-]+/g, "_").replace(/^_+|_+$/g, "") || "marca";
  }

  // Negativo real calado (Lámina 21): todo trazo, relleno y parada de gradiente pasa a blanco puro.
  // Se conservan fill="none"/transparent y las opacidades, sin parches ni fondos añadidos.
  function toCaladoNegativeSvg(rawSvg) {
    if (!rawSvg) return "";
    const colorRe = /(#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\))/gi;
    return String(rawSvg)
      .replace(/\b(fill|stroke|stop-color|flood-color|lighting-color)\s*=\s*(["'])(.*?)\2/gi, (m, attr, q, val) =>
        /^(none|transparent)$/i.test(val.trim()) || /^url\(/i.test(val.trim()) ? m : `${attr}=${q}#FFFFFF${q}`)
      .replace(/\b(fill|stroke|stop-color)\s*:\s*([^;"']+)/gi, (m, prop, val) =>
        /^(none|transparent)$/i.test(val.trim()) || /^url\(/i.test(val.trim()) ? m : `${prop}:${val.replace(colorRe, "#FFFFFF")}`);
  }

  // Isotipo 180x180 sintetizado por studio.html (firma real: synthesizeSystemicSymbol180(uid), colores tomados del estado)
  function buildSystemicSymbolPair(uidBase, fallbackPos, fallbackNeg) {
    if (typeof window.synthesizeSystemicSymbol180 === "function") {
      try {
        const uid = toSafeSymbolUid(uidBase);
        const pos = window.synthesizeSystemicSymbol180(uid + "_pos");
        const neg = toCaladoNegativeSvg(window.synthesizeSystemicSymbol180(uid + "_neg"));
        if (pos) return { pos, neg: neg || fallbackNeg };
      } catch (e) {
        console.warn("synthesizeSystemicSymbol180 no disponible:", e);
      }
    }
    return { pos: fallbackPos, neg: fallbackNeg };
  }

  function hexToPantone(hex, idx = 1) {
    const h = String(hex || "").toUpperCase();
    const known = {
      "#0D2540": "Pantone 296 C",
      "#426EAE": "Pantone 7683 C",
      "#FF7A00": "Pantone 1505 C",
      "#4C9DE6": "Pantone 2925 C",
      "#1D4ED8": "Pantone 2728 C",
      "#0B1E36": "Pantone 289 C",
      "#854D0E": "Pantone 7558 C",
      "#0F3A40": "Pantone 5463 C",
      "#18181B": "Pantone Black 7 C",
      "#713F12": "Pantone 7552 C",
      "#FFFFFF": "Blanco Puro (Papel)"
    };
    if (known[h]) return known[h];
    const { r, g, b } = hexToRgb(h);
    const code = 200 + ((r * 3 + g * 5 + b * 7 + idx * 23) % 780);
    return `Pantone ${code} C`;
  }

  // --- MOTOR DE GENERACIÓN DE TERNA DE LOGOTIPOS PROFESIONAL ---
  // Genera: 1. Logotipo Horizontal, 2. Avatar Social Cuadrado, 3. Sello de Autor
  function generateTriFoldLogoSuite(brand) {
    const bName = brand.name || "The Best Brand";
    const bUpper = bName.toUpperCase();
    const tagline = brand.tagline || "BRAND IDENTITY ATELIER";
    const taglineUpper = tagline.toUpperCase();
    const pri = (brand.colors && brand.colors.pri) || "#0D2540";
    const sec = (brand.colors && brand.colors.sec) || "#426EAE";
    const acc = (brand.colors && brand.colors.acc) || "#FF7A00";
    const darkInk = (brand.colors && brand.colors.darkInk) || "#090D16";
    const lightGray = (brand.colors && brand.colors.lightGray) || "#E6E6E6";
    const softBg = (brand.colors && brand.colors.softBg) || "#FAF8F5";
    const priFont = brand.primaryFont || "Montserrat";
    const defaultCurvedMonolith = `<path d="M90 18 C132 18 162 48 162 90 C162 132 132 162 90 162 C48 162 18 132 18 90 C18 48 48 18 90 18 Z M90 42 C63.5 42 42 63.5 42 90 C42 116.5 63.5 138 90 138 C116.5 138 138 116.5 138 90 C138 63.5 116.5 42 90 42 Z" fill-rule="evenodd" fill="${pri}"/><path d="M66 90 L90 56 L114 90 L90 124 Z" fill="${acc}"/>`;
    const defaultCurvedMonolithNeg = toCaladoNegativeSvg(defaultCurvedMonolith);
    const needsSymbolPair = !brand.svgCore || !brand.svgCoreNeg;
    const symbolPair = needsSymbolPair
      ? buildSystemicSymbolPair("bb_v81_" + (brand.slug || bName), defaultCurvedMonolith, defaultCurvedMonolithNeg)
      : null;
    const symCore = brand.svgCore || symbolPair.pos;
    const symCoreNeg = brand.svgCoreNeg || (brand.svgCore ? toCaladoNegativeSvg(brand.svgCore) : symbolPair.neg);

    // 1. LOGO HORIZONTAL (Ratio 3.5:1 para cabeceras, papelería y firmas)
    const logoHorizontal = `
      <svg viewBox="0 0 460 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block; max-height:100px;">
        <defs>
          <filter id="hDropShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.06"/>
          </filter>
        </defs>
        <!-- Isotipo Reducido a la izquierda -->
        <g transform="translate(15, 15) scale(0.5)">
          ${symCore}
        </g>
        <!-- Línea Divisoria Vertical Fina -->
        <line x1="125" y1="28" x2="125" y2="92" stroke="${lightGray}" stroke-width="1.8"/>
        <!-- Textos Tipográficos con Kerning y Escala Óptima -->
        <text x="145" y="58" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="900" font-size="26" letter-spacing="2" fill="${darkInk}">${esc(bUpper)}</text>
        <text x="146" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="9.5" letter-spacing="3" fill="${pri}">${esc(taglineUpper.slice(0, 42))}</text>
      </svg>
    `;

    // 1B. LOGO HORIZONTAL EN NEGATIVO (Para soportes oscuros / contraste)
    const logoHorizontalNeg = `
      <svg viewBox="0 0 460 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block; max-height:100px;">
        <g transform="translate(15, 15) scale(0.5)">
          ${symCoreNeg}
        </g>
        <line x1="125" y1="28" x2="125" y2="92" stroke="rgba(255,255,255,0.25)" stroke-width="1.8"/>
        <text x="145" y="58" font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="900" font-size="26" letter-spacing="2" fill="#FFFFFF">${esc(bUpper)}</text>
        <text x="146" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="9.5" letter-spacing="3" fill="${acc}">${esc(taglineUpper.slice(0, 42))}</text>
      </svg>
    `;

    // 2. AVATAR SOCIAL MEDIA & APP ICON (1:1 con esquinas suaves y zona de respiración 20%)
    const logoSocialAvatar = `
      <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <rect width="200" height="200" rx="46" fill="${softBg}" stroke="${lightGray}" stroke-width="2"/>
        <g transform="translate(35, 35) scale(0.72)">
          ${symCore}
        </g>
      </svg>
    `;

    // 2B. AVATAR EN CONTRASTE PRIMARIO
    const logoSocialAvatarInverted = `
      <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <rect width="200" height="200" rx="46" fill="${pri}"/>
        <g transform="translate(35, 35) scale(0.72)">
          ${symCoreNeg}
        </g>
      </svg>
    `;

    // 3. SELLO DE AUTOR / EMBLEMA DE PACKAGING (Circular con trazado perimetral)
    const sealId = "sealPath_" + Math.random().toString(36).slice(2, 8);
    const logoSeal = `
      <svg viewBox="0 0 260 260" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <defs>
          <path id="${sealId}_top" d="M 35,130 A 95,95 0 1,1 225,130" fill="none"/>
          <path id="${sealId}_bottom" d="M 225,130 A 95,95 0 0,1 35,130" fill="none"/>
        </defs>
        <!-- Aro Exterior Sólido -->
        <circle cx="130" cy="130" r="122" fill="${softBg}" stroke="${pri}" stroke-width="2.8"/>
        <!-- Aro Dentado / Punteado Interior -->
        <circle cx="130" cy="130" r="114" fill="none" stroke="${sec}" stroke-width="1.6" stroke-dasharray="4,4"/>
        <!-- Aro Central Blanco -->
        <circle cx="130" cy="130" r="76" fill="#FFFFFF" stroke="${pri}" stroke-width="1.8"/>
        <!-- Texto Curvado Superior (Nombre de la Marca) -->
        <text font-family="'${priFont}', 'Montserrat', sans-serif" font-weight="900" font-size="12" letter-spacing="3.5" fill="${darkInk}">
          <textPath href="#${sealId}_top" startOffset="50%" text-anchor="middle">${esc(bUpper)}</textPath>
        </text>
        <!-- Texto Curvado Inferior (Calidad & Origen) -->
        <text font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="9" letter-spacing="3" fill="${pri}">
          <textPath href="#${sealId}_bottom" startOffset="50%" text-anchor="middle">★ CALIDAD CERTIFICADA · 2026 ★</textPath>
        </text>
        <!-- Símbolo en el Corazón del Sello -->
        <g transform="translate(80, 80) scale(0.55)">
          ${symCore}
        </g>
      </svg>
    `;

    return {
      horizontal: logoHorizontal,
      horizontalNeg: logoHorizontalNeg,
      avatar: logoSocialAvatar,
      avatarInverted: logoSocialAvatarInverted,
      seal: logoSeal
    };
  }

  // --- ESTILOS VECTORIALES GLOBALES (DIRECTIVA MAX C-00) ---
  function getDynamicBrandbookStyles() {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:wght@600;700&family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@700;800&display=swap');

      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      body {
        margin: 0;
        padding: 0;
        background: #F1F5F9;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #090D16;
        -webkit-font-smoothing: antialiased;
      }

      .tbb-plate {
        width: 1122px;
        height: 794px;
        max-width: 1122px;
        max-height: 794px;
        margin: 0 auto 24px auto;
        background: #FFFFFF !important;
        border: 1px solid #E6E6E6;
        box-shadow: 0 16px 40px rgba(13, 37, 64, 0.08);
        padding: 38px 48px 30px 48px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        page-break-after: always;
        break-inside: avoid;
      }

      @media print {
        @page {
          size: A4 landscape;
          margin: 0;
        }
        html, body {
          background: #FFFFFF !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .tbb-plate {
          margin: 0 !important;
          border: none !important;
          box-shadow: none !important;
          max-width: 100% !important;
          max-height: 100% !important;
          width: 100vw !important;
          height: 100vh !important;
          page-break-after: always !important;
          break-inside: avoid !important;
        }
      }

      /* ENCABEZADOS Y PIES CONECTADOS AL TEMARIO */
      .tbb-hdr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1.5px solid #E6E6E6;
        padding-bottom: 12px;
        margin-bottom: 16px;
      }
      .tbb-hdr-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .tbb-tag-pill {
        background: #0D2540;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-weight: 800;
        font-size: 9.5px;
        letter-spacing: 1.5px;
        padding: 5px 12px;
        border-radius: 6px;
      }
      .tbb-hdr-titles h2 {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        font-size: 15px;
        font-weight: 800;
        color: #0D2540;
        letter-spacing: 0.5px;
      }
      .tbb-hdr-titles span {
        font-size: 11px;
        color: #707070;
        font-weight: 500;
      }
      .tbb-hdr-right {
        text-align: right;
        font-family: 'JetBrains Mono', monospace;
        font-size: 10.5px;
        font-weight: 700;
        color: #0D2540;
      }

      .tbb-ftr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #E6E6E6;
        padding-top: 10px;
        margin-top: 16px;
        font-size: 9.5px;
        color: #707070;
      }

      /* COMPONENTES EDITORIALES FLEXIBLES */
      .tbb-card {
        background: #FFFFFF;
        border: 1px solid #E6E6E6;
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 4px 14px rgba(13, 37, 64, 0.03);
      }
      .tbb-card-title {
        font-family: 'Montserrat', sans-serif;
        font-weight: 800;
        font-size: 12px;
        color: #0D2540;
        letter-spacing: 0.5px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .tbb-card-body {
        font-size: 11.5px;
        line-height: 1.55;
        color: #333333;
      }

      .tbb-grid-2col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        flex: 1;
      }
      .tbb-grid-3col {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        flex: 1;
      }
      .tbb-grid-4col {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
        flex: 1;
      }

      .tbb-swatch {
        border-radius: 10px;
        padding: 12px;
        background: #FFFFFF;
        border: 1px solid #E6E6E6;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .tbb-swatch-box {
        width: 100%;
        height: 64px;
        border-radius: 8px;
        border: 1px solid rgba(0,0,0,0.08);
      }
      .tbb-swatch-meta {
        font-size: 10px;
        line-height: 1.4;
        color: #333333;
      }

      .tbb-tp-pill {
        border-left: 3.5px solid #0D2540;
        padding: 10px 14px;
        background: #FAF8F5;
        border-radius: 0 8px 8px 0;
        margin-bottom: 8px;
        font-size: 11px;
        line-height: 1.45;
      }
    `;
  }

  // --- GENERADOR DE LAS 30 LÁMINAS DESDE CERO ---
  function generateBrandbook30Plates(brand) {
    const bName = brand.name || "The Best Brand";
    const bUpper = bName.toUpperCase();
    const tagline = brand.tagline || "BRAND IDENTITY ATELIER";
    const giro = brand.giro || "Servicios profesionales e identidad de marca";
    const category = brand.category || "Servicios Generales";
    const buyer = brand.buyer || "Clientes y empresas que buscan excelencia";
    const why = brand.why || "Porque el propósito auténtico conecta con las personas y trasciende.";
    const how = brand.how || "Procesos rigurosos, atención cercana y tecnología de vanguardia.";
    const what = brand.what || "Soluciones y productos de la más alta calidad y trazabilidad.";
    const persona = brand.persona || "Líder apasionado, confiable, empático y enfocado en resultados.";
    const niza = brand.niza || "Clase Internacional de Registro";
    const tpBefore = brand.tpBefore || ["Presencia digital clara", "Atención ágil", "Diagnóstico inicial", "Propuesta transparente"];
    const tpDuring = brand.tpDuring || ["Bienvenida cálida", "Ejecución profesional", "Acompañamiento en vivo", "Cobro y entrega clara"];
    const tpAfter = brand.tpAfter || ["Manual y garantía", "Seguimiento post-venta", "Beneficios leales", "Encuesta de calidad"];

    const pri = (brand.colors && brand.colors.pri) || "#0D2540";
    const sec = (brand.colors && brand.colors.sec) || "#426EAE";
    const acc = (brand.colors && brand.colors.acc) || "#FF7A00";
    const darkInk = (brand.colors && brand.colors.darkInk) || "#090D16";
    const midGray = (brand.colors && brand.colors.midGray) || "#707070";
    const lightGray = (brand.colors && brand.colors.lightGray) || "#E6E6E6";
    const softBg = (brand.colors && brand.colors.softBg) || "#FAF8F5";
    const priFont = brand.primaryFont || "Montserrat";
    const secFont = brand.secondaryFont || "Plus Jakarta Sans";
    const isMultibrand = Boolean(brand.isMultibrand);

    const defaultCurvedMonolith = `<path d="M90 18 C132 18 162 48 162 90 C162 132 132 162 90 162 C48 162 18 132 18 90 C18 48 48 18 90 18 Z M90 42 C63.5 42 42 63.5 42 90 C42 116.5 63.5 138 90 138 C116.5 138 138 116.5 138 90 C138 63.5 116.5 42 90 42 Z" fill-rule="evenodd" fill="${pri}"/><path d="M66 90 L90 56 L114 90 L90 124 Z" fill="${acc}"/>`;
    const defaultCurvedMonolithNeg = toCaladoNegativeSvg(defaultCurvedMonolith);
    const needsSymbolPair = !brand.svgCore || !brand.svgCoreNeg;
    const symbolPair = needsSymbolPair
      ? buildSystemicSymbolPair("bb_v81_" + (brand.slug || bName), defaultCurvedMonolith, defaultCurvedMonolithNeg)
      : null;
    const symCore = brand.svgCore || symbolPair.pos;
    const symCoreNeg = brand.svgCoreNeg || (brand.svgCore ? toCaladoNegativeSvg(brand.svgCore) : symbolPair.neg);

    // Generar la Terna de Logos Profesional
    const suite = generateTriFoldLogoSuite(brand);

    const hdr = (secNum, secName, pNum, pTitle) => `
      <header class="tbb-hdr">
        <div class="tbb-hdr-left">
          <span class="tbb-tag-pill" style="background:${pri};">${secNum}</span>
          <div class="tbb-hdr-titles">
            <h2>${secName}</h2>
            <span>${pTitle}</span>
          </div>
        </div>
        <div class="tbb-hdr-right" style="color:${pri};">
          LÁMINA ${String(pNum).padStart(2, "0")} / 30
        </div>
      </header>
    `;

    const ftr = (pNum) => `
      <footer class="tbb-ftr">
        <div><strong>${esc(bUpper)}</strong> · MANUAL OFICIAL DE IDENTIDAD Y ARQUITECTURA DE MARCA</div>
        <div>DIRECTIVA MAX C-00 · CONSTITUCIÓN DOCUMENTAL V81.0</div>
        <div>PÁGINA ${String(pNum).padStart(2, "0")}</div>
      </footer>
    `;

    const plates = [];

    // =========================================================================
    // LÁMINA 01: PORTADA MONUMENTAL DE AUTOR
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-01">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid ${pri}; padding-bottom:12px;">
          <div style="font-family:'Montserrat', sans-serif; font-weight:800; font-size:11px; letter-spacing:2px; color:${pri};">
            MANUAL OFICIAL DE IDENTIDAD Y ARQUITECTURA DE MARCA
          </div>
          <div style="font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:700; color:${sec};">
            VERSIÓN 81.0 OFICIAL · 2026
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1.15fr 0.85fr; gap:40px; align-items:center; flex:1; padding:20px 0;">
          <div>
            <span style="display:inline-block; background:${softBg}; border:1px solid ${lightGray}; border-left:3.5px solid ${acc}; padding:4px 10px; font-size:10px; font-weight:800; color:${darkInk}; border-radius:4px; margin-bottom:14px;">
              ${esc(category.toUpperCase())}
            </span>
            <h1 style="font-family:'${priFont}', 'Montserrat', sans-serif; font-size:46px; font-weight:900; line-height:1.05; color:${darkInk}; margin:0 0 12px 0; letter-spacing:-0.5px;">
              ${esc(bUpper)}
            </h1>
            <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:13px; font-weight:800; color:${pri}; letter-spacing:2px; margin-bottom:18px;">
              ${esc(tagline.toUpperCase())}
            </div>
            <p style="font-size:12.5px; line-height:1.6; color:#475569; margin:0 0 24px 0; max-width:500px;">
              ${esc(giro)}
            </p>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; border-top:1px solid ${lightGray}; padding-top:16px;">
              <div>
                <div style="font-size:9.5px; font-weight:800; color:${midGray}; letter-spacing:1px;">PROPÓSITO NUCLEAR</div>
                <div style="font-size:11px; font-weight:700; color:${darkInk}; margin-top:2px;">${esc(why.slice(0, 90))}...</div>
              </div>
              <div>
                <div style="font-size:9.5px; font-weight:800; color:${midGray}; letter-spacing:1px;">CLASIFICACIÓN NIZA</div>
                <div style="font-size:11px; font-weight:700; color:${darkInk}; margin-top:2px;">${esc(niza.slice(0, 45))}</div>
              </div>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:${softBg}; border:1.5px solid ${lightGray}; border-radius:20px; padding:32px; box-shadow:0 12px 28px rgba(13,37,64,0.04);">
            <div style="width:200px; height:200px; margin-bottom:18px;">
              <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                ${symCore}
              </svg>
            </div>
            <div style="font-family:'Montserrat', sans-serif; font-size:10px; font-weight:800; color:${pri}; letter-spacing:2px;">
              ISOTIPO CENTRAL MATRIZ
            </div>
            <div style="font-size:9.5px; color:${midGray}; margin-top:2px;">
              Curvas Bézier Vectoriales Puras · 100% Sin Rasterizado
            </div>
          </div>
        </div>

        ${ftr(1)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 02: ÍNDICE GENERAL Y TEMARIO RECTOR
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-02">
        ${hdr("SECCIÓN 01", "ESTRUCTURA EDITORIAL Y TEMARIO RECTOR", 2, "Índice General de las 30 Láminas de Constitución de Marca")}
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; flex:1;">
          <div class="tbb-card">
            <div class="tbb-card-title" style="color:${pri};">I. ADN Y ESTRATEGIA (01 - 09)</div>
            <ul style="margin:0; padding-left:18px; font-size:10.5px; line-height:1.65; color:#333;">
              <li>01. Portada Monumental de Marca</li>
              <li>02. Temario Rector e Índice General</li>
              <li>03. Manifiesto y Declaración de Valor</li>
              <li>04. Círculo Dorado (Why, How, What)</li>
              <li>05. La Empresa como Persona</li>
              <li>06. Arquetipo y Tono Verbal</li>
              <li>07. Buyer Persona y Perfil Ideal</li>
              <li>08. Mapa de Empatía del Cliente</li>
              <li>09. Posicionamiento Estratégico</li>
            </ul>
          </div>
          <div class="tbb-card">
            <div class="tbb-card-title" style="color:${sec};">II. TOUCHPOINTS & LOGOS (10 - 18)</div>
            <ul style="margin:0; padding-left:18px; font-size:10.5px; line-height:1.65; color:#333;">
              <li>10. Touchpoints Fase 1: Antes</li>
              <li>11. Touchpoints Fase 2: Durante</li>
              <li>12. Touchpoints Fase 3: Después</li>
              <li>13. <strong>Terna Oficial de Logotipos</strong></li>
              <li>14. Anatomía del Símbolo Central</li>
              <li>15. Construcción y Retícula Áurea</li>
              <li>16. Área de Aislamiento y Reducción</li>
              <li>17. Versión Oficial en Positivo</li>
              <li>18. Versión Oficial en Negativo Calado</li>
            </ul>
          </div>
          <div class="tbb-card">
            <div class="tbb-card-title" style="color:${acc};">III. SISTEMA & GOBERNANZA (19 - 30)</div>
            <ul style="margin:0; padding-left:18px; font-size:10.5px; line-height:1.65; color:#333;">
              <li>19. Versión Monocromo y Fax</li>
              <li>20. Usos Prohibidos y Normativa</li>
              <li>21. Paleta Cromática (HEX/Pantone)</li>
              <li>22. Jerarquía Tipográfica Principal</li>
              <li>23. Jerarquía Tipográfica de Lectura</li>
              <li>24. Despliegue en Entornos Digitales</li>
              <li>25. Papelería y Documentos Ejecutivos</li>
              <li>26. Packaging y Sello de Autor</li>
              <li>27. Indumentaria y Textiles</li>
              <li>28. Entorno Físico y Señalética</li>
              <li>29. Clasificación de Niza Legal</li>
              <li>30. Gobernanza y Clausura Oficial</li>
            </ul>
          </div>
        </div>
        ${ftr(2)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 03: MANIFIESTO Y DECLARACIÓN DE VALOR
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-03">
        ${hdr("SECCIÓN 01", "ADN Y ESTRATEGIA DE MARCA", 3, "Manifiesto Central y Filosofía Operativa")}
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:26px; flex:1; align-items:center;">
          <div>
            <div style="font-family:'${priFont}', 'Montserrat', sans-serif; font-size:26px; font-weight:900; line-height:1.2; color:${darkInk}; margin-bottom:16px;">
              "El valor real no se impone: se demuestra con rigor, calidez y certidumbre en cada interacción."
            </div>
            <p style="font-size:12px; line-height:1.65; color:#334155; margin-bottom:14px;">
              En <strong>${esc(bName)}</strong> operamos bajo la premisa de que todo punto de fricción debe transformarse en una experiencia sin esfuerzo para quien confía en nosotros.
            </p>
            <div class="tbb-card" style="border-left:4px solid ${pri};">
              <div class="tbb-card-title">COMPROMISO INSTITUCIONAL</div>
              <div class="tbb-card-body">${esc(giro)}</div>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${pri};">1. Rigor Metodológico</div>
              <div class="tbb-card-body">Cero atajos; cada entregable o producto responde a los más altos estándares técnicos de su categoría.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${sec};">2. Calidez Humana</div>
              <div class="tbb-card-body">Escuchar activamente antes de proponer; trato de socio leal, transparente y empático.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${acc};">3. Certeza en el Tiempo</div>
              <div class="tbb-card-body">Liberar tiempo mental y energía al usuario, asegurando que cada resultado sea duradero y medible.</div>
            </div>
          </div>
        </div>
        ${ftr(3)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 04: EL CÍRCULO DORADO (WHY · HOW · WHAT)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-04">
        ${hdr("SECCIÓN 01", "ADN Y ESTRATEGIA DE MARCA", 4, "El Círculo Dorado: Propósito, Proceso y Resultado")}
        <div class="tbb-grid-3col">
          <div class="tbb-card" style="border-top:4px solid ${acc}; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${acc};">01 · PROPÓSITO CENTRAL</div>
              <h3 style="font-family:'Montserrat', sans-serif; font-size:18px; font-weight:900; color:${darkInk}; margin:8px 0 12px 0;">¿POR QUÉ EXISTIMOS?</h3>
              <p style="font-size:12px; line-height:1.6; color:#333;">${esc(why)}</p>
            </div>
            <div style="background:${softBg}; padding:8px 12px; border-radius:6px; font-size:10.5px; color:${midGray}; font-weight:600;">
              El corazón emocional y causa raíz del negocio.
            </div>
          </div>

          <div class="tbb-card" style="border-top:4px solid ${sec}; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${sec};">02 · METODOLOGÍA ÚNICA</div>
              <h3 style="font-family:'Montserrat', sans-serif; font-size:18px; font-weight:900; color:${darkInk}; margin:8px 0 12px 0;">¿CÓMO LO HACEMOS?</h3>
              <p style="font-size:12px; line-height:1.6; color:#333;">${esc(how)}</p>
            </div>
            <div style="background:${softBg}; padding:8px 12px; border-radius:6px; font-size:10.5px; color:${midGray}; font-weight:600;">
              El estándar técnico y diferencial competitivo.
            </div>
          </div>

          <div class="tbb-card" style="border-top:4px solid ${pri}; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${pri};">03 · OFERTA TANGIBLE</div>
              <h3 style="font-family:'Montserrat', sans-serif; font-size:18px; font-weight:900; color:${darkInk}; margin:8px 0 12px 0;">¿QUÉ ENTREGAMOS?</h3>
              <p style="font-size:12px; line-height:1.6; color:#333;">${esc(what)}</p>
            </div>
            <div style="background:${softBg}; padding:8px 12px; border-radius:6px; font-size:10.5px; color:${midGray}; font-weight:600;">
              El resultado tangible que recibe el usuario final.
            </div>
          </div>
        </div>
        ${ftr(4)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 05: LA EMPRESA COMO PERSONA
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-05">
        ${hdr("SECCIÓN 01", "ADN Y ESTRATEGIA DE MARCA", 5, "La Empresa como Persona: Identidad Humana y Arquetipo")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div class="tbb-card" style="border-left:5px solid ${pri}; padding:24px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:10.5px; font-weight:800; color:${pri}; margin-bottom:8px;">
              PERFIL DE CARÁCTER CORPORATIVO
            </div>
            <h3 style="font-family:'${priFont}', 'Montserrat', sans-serif; font-size:24px; font-weight:900; color:${darkInk}; margin:0 0 14px 0;">
              ${esc(persona)}
            </h3>
            <p style="font-size:12px; line-height:1.65; color:#475569; margin:0;">
              Si <strong>${esc(bName)}</strong> fuera una persona de carne y hueso, entraría al espacio con paso seguro y mirada franca. Habla con métricas precisas y conocimiento profundo de su oficio, pero siempre con un café en la mano y la disposición genuina de escuchar antes de prescribir.
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${pri};">Fuerza Tranquila</div>
              <div class="tbb-card-body">Seguridad que nace de la maestría técnica; jamás necesita levantar la voz ni usar artificios agresivos de venta.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${sec};">Mente de Ingeniero</div>
              <div class="tbb-card-body">Estructura, lógica, datos y procesos claros que resuelven problemas reales desde la raíz.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${acc};">Calidez de Socio Leal</div>
              <div class="tbb-card-body">Acompañamiento cercano; celebra el éxito de su cliente como propio y cuida sus intereses con honorabilidad.</div>
            </div>
          </div>
        </div>
        ${ftr(5)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 06: TONO DE VOZ VERBAL Y CRITERIOS EDITORIALES
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-06">
        ${hdr("SECCIÓN 01", "ADN Y ESTRATEGIA DE MARCA", 6, "Tono de Voz Verbal: Lo que Somos y lo que Jamás Seremos")}
        <div class="tbb-grid-2col">
          <div class="tbb-card" style="border-top:4px solid #10B981;">
            <div class="tbb-card-title" style="color:#059669;"> SÍ HABLAMOS ASÍ (PRINCIPIOS APROBADOS)</div>
            <ul style="margin:10px 0 0 0; padding-left:18px; font-size:11.5px; line-height:1.7; color:#333;">
              <li><strong>Claro y Directo:</strong> Frases concisas que van al grano sin rodeos innecesarios.</li>
              <li><strong>Profesional y Cercano:</strong> Vocabulario especializado pero explicado con total claridad.</li>
              <li><strong>Orientado a Soluciones:</strong> Enfocado en el beneficio tangible y en la certeza del cliente.</li>
              <li><strong>Empatía y Respeto:</strong> Tratamos al usuario como un igual inteligente y ocupado.</li>
            </ul>
          </div>

          <div class="tbb-card" style="border-top:4px solid #EF4444;">
            <div class="tbb-card-title" style="color:#DC2626;">✕ JAMÁS HABLAMOS ASÍ (PROHIBICIONES)</div>
            <ul style="margin:10px 0 0 0; padding-left:18px; font-size:11.5px; line-height:1.7; color:#333;">
              <li><strong>Cero Arrogancia:</strong> Prohibido usar tecnicismos para confundir o presumir superioridad.</li>
              <li><strong>Cero Jerga de Relleno:</strong> Evitar frases vacías como "soluciones disruptivas 360°".</li>
              <li><strong>Cero Falsas Promesas:</strong> Nunca prometer tiempos o resultados que no se puedan auditar.</li>
              <li><strong>Cero Informalidad Excesiva:</strong> Respetamos el tono institucional sin caer en frialdad.</li>
            </ul>
          </div>
        </div>
        ${ftr(6)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 07: BUYER PERSONA Y PERFIL IDEAL
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-07">
        ${hdr("SECCIÓN 01", "ADN Y ESTRATEGIA DE MARCA", 7, "Perfil del Cliente Ideal (Buyer Persona)")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div class="tbb-card" style="border-left:4px solid ${sec}; padding:20px;">
            <div style="font-size:10px; font-weight:800; color:${sec}; letter-spacing:1px; margin-bottom:6px;">SEGMENTO OBJETIVO</div>
            <h3 style="font-family:'Montserrat', sans-serif; font-size:18px; font-weight:900; color:${darkInk}; margin:0 0 10px 0;">${esc(buyer)}</h3>
            <p style="font-size:11.5px; line-height:1.6; color:#475569; margin:0;">
              Individuos y directores de empresas que valoran su tiempo por encima de todo. No buscan el precio más bajo sino la máxima garantía de calidad, cumplimiento y tranquilidad operativa.
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${pri};">Dolor Principal que Resolvemos</div>
              <div class="tbb-card-body">Incertidumbre, proveedores informales que entregan a medias y falta de claridad técnica en el sector.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${sec};">Criterio de Decisión de Compra</div>
              <div class="tbb-card-body">Evidencia de resultados, trazabilidad, seriedad institucional y trato humano personalizado.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${acc};">Transformación Lograda</div>
              <div class="tbb-card-body">Pasan de la dispersión y la duda al control absoluto y la satisfacción con orgullo de marca.</div>
            </div>
          </div>
        </div>
        ${ftr(7)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 08: MAPA DE EMPATÍA DEL CLIENTE
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-08">
        ${hdr("SECCIÓN 01", "ADN Y ESTRATEGIA DE MARCA", 8, "Mapa de Empatía: Lo que Siente, Ve y Necesita el Cliente")}
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; flex:1;">
          <div class="tbb-card">
            <div class="tbb-card-title" style="color:${pri};">¿QUÉ PIENSA Y SIENTE?</div>
            <p class="tbb-card-body">"Necesito un aliado que realmente sepa lo que hace y me quite problemas de encima, no que me genere más juntas ni tareas pendientes."</p>
          </div>
          <div class="tbb-card">
            <div class="tbb-card-title" style="color:${sec};">¿QUÉ VE EN EL MERCADO?</div>
            <p class="tbb-card-body">Opciones genéricas con promesas exageradas, plantillas baratas y poca sustancia profesional.</p>
          </div>
          <div class="tbb-card">
            <div class="tbb-card-title" style="color:${acc};">¿QUÉ DICE Y HACE?</div>
            <p class="tbb-card-body">Investiga recomendaciones, revisa portafolios previos y exige seriedad desde el primer mensaje de WhatsApp o llamada.</p>
          </div>
          <div class="tbb-card">
            <div class="tbb-card-title" style="color:${darkInk};">¿QUÉ FRUSTRACIÓN EVITAMOS?</div>
            <p class="tbb-card-body">El desgaste de tiempo, la pérdida de dinero en pruebas fallidas y el estrés de la improvisación.</p>
          </div>
        </div>
        ${ftr(8)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 09: POSICIONAMIENTO ESTRATÉGICO
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-09">
        ${hdr("SECCIÓN 01", "ADN Y ESTRATEGIA DE MARCA", 9, "Declaración de Posicionamiento Competitivo")}
        <div style="display:flex; flex-direction:column; justify-content:center; gap:20px; flex:1;">
          <div class="tbb-card" style="border-left:6px solid ${pri}; padding:26px;">
            <div style="font-size:10px; font-weight:800; color:${pri}; letter-spacing:1px; margin-bottom:8px;">FÓRMULA DE POSICIONAMIENTO</div>
            <div style="font-family:'${priFont}', 'Montserrat', sans-serif; font-size:20px; font-weight:900; line-height:1.35; color:${darkInk};">
              Para <u>${esc(buyer)}</u>, <strong>${esc(bName)}</strong> es el referente en <u>${esc(category)}</u> que entrega <u>${esc(what)}</u> porque a diferencia de las alternativas comunes, nosotros <u>${esc(how)}</u>.
            </div>
          </div>
          <div class="tbb-grid-3col">
            <div class="tbb-card"><div class="tbb-card-title">Atributo Clave #1</div><div class="tbb-card-body">Precisión de ingeniería y diseño en curvas puras.</div></div>
            <div class="tbb-card"><div class="tbb-card-title">Atributo Clave #2</div><div class="tbb-card-body">Acompañamiento personalizado y socio leal 24/7.</div></div>
            <div class="tbb-card"><div class="tbb-card-title">Atributo Clave #3</div><div class="tbb-card-body">Garantía total de cumplimiento y certeza de valor.</div></div>
          </div>
        </div>
        ${ftr(9)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 10: TOUCHPOINTS FASE 1 (ANTES DE LA COMPRA)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-10">
        ${hdr("SECCIÓN 02", "INGENIERÍA DE TOUCHPOINTS", 10, "Fase 1: Puntos de Contacto Antes de la Compra (Descubrimiento)")}
        <div style="margin-bottom:12px; font-size:12px; color:#475569;">
          Touchpoints diseñados para transmitir confianza inmediata, autoridad técnica y eliminar toda fricción inicial:
        </div>
        <div class="tbb-grid-2col">
          ${tpBefore.map((tp, idx) => `
            <div class="tbb-card" style="border-left:4px solid ${pri};">
              <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${pri}; margin-bottom:4px;">TOUCHPOINT 0${idx+1} · ANTES</div>
              <div style="font-size:12px; font-weight:700; color:${darkInk}; line-height:1.45;">${esc(tp)}</div>
            </div>
          `).join("")}
        </div>
        ${ftr(10)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 11: TOUCHPOINTS FASE 2 (DURANTE LA COMPRA / OPERACIÓN)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-11">
        ${hdr("SECCIÓN 02", "INGENIERÍA DE TOUCHPOINTS", 11, "Fase 2: Puntos de Contacto Durante el Servicio (Operación y Entrega)")}
        <div style="margin-bottom:12px; font-size:12px; color:#475569;">
          Puntos de contacto que garantizan una experiencia impecable, sin retrasos y con transparencia total:
        </div>
        <div class="tbb-grid-2col">
          ${tpDuring.map((tp, idx) => `
            <div class="tbb-card" style="border-left:4px solid ${sec};">
              <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${sec}; margin-bottom:4px;">TOUCHPOINT 0${idx+5} · DURANTE</div>
              <div style="font-size:12px; font-weight:700; color:${darkInk}; line-height:1.45;">${esc(tp)}</div>
            </div>
          `).join("")}
        </div>
        ${ftr(11)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 12: TOUCHPOINTS FASE 3 (DESPUÉS DE LA COMPRA / LEALTAD)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-12">
        ${hdr("SECCIÓN 02", "INGENIERÍA DE TOUCHPOINTS", 12, "Fase 3: Puntos de Contacto Después del Servicio (Lealtad y Garantía)")}
        <div style="margin-bottom:12px; font-size:12px; color:#475569;">
          Touchpoints que consolidan la lealtad a largo plazo, convierten clientes en promotores y blindan la garantía:
        </div>
        <div class="tbb-grid-2col">
          ${tpAfter.map((tp, idx) => `
            <div class="tbb-card" style="border-left:4px solid ${acc};">
              <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${acc}; margin-bottom:4px;">TOUCHPOINT 0${idx+9} · DESPUÉS</div>
              <div style="font-size:12px; font-weight:700; color:${darkInk}; line-height:1.45;">${esc(tp)}</div>
            </div>
          `).join("")}
        </div>
        ${ftr(12)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 13: TERNA OFICIAL DE LOGOTIPOS (HORIZONTAL, AVATAR, SELLO)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-13">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 13, "Terna Oficial de Logotipos: Horizontal, Avatar Social y Sello de Autor")}
        <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap:20px; flex:1;">
          <!-- 1. LOGO HORIZONTAL -->
          <div class="tbb-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <span class="tbb-tag-pill" style="background:${pri}; font-size:8.5px;">1. LOGOTIPO HORIZONTAL OFICIAL</span>
              <div style="font-size:10.5px; color:${midGray}; margin:6px 0 12px 0;">Aplicación primaria para cabeceras web, facturas, contratos y papelería corporativa.</div>
              <div style="background:${softBg}; border:1px solid ${lightGray}; border-radius:12px; padding:20px; display:flex; align-items:center; justify-content:center; min-height:130px;">
                ${suite.horizontal}
              </div>
            </div>
            <div style="font-size:10.5px; color:#475569; line-height:1.4; border-top:1px solid ${lightGray}; padding-top:8px;">
              Proporción 3.5:1 · Tipografía con kerning óptico y alineación axial con el isotipo.
            </div>
          </div>

          <!-- 2 Y 3: AVATAR Y SELLO -->
          <div style="display:grid; grid-template-rows: 1fr 1fr; gap:14px;">
            <!-- 2. AVATAR SOCIAL MEDIA -->
            <div class="tbb-card" style="display:flex; gap:16px; align-items:center;">
              <div style="width:84px; height:84px; flex-shrink:0;">
                ${suite.avatar}
              </div>
              <div>
                <span class="tbb-tag-pill" style="background:${sec}; font-size:8px;">2. AVATAR / APP / SOCIAL</span>
                <div style="font-size:11px; font-weight:700; color:${darkInk}; margin:4px 0 2px 0;">Icono Cuadrado 1:1</div>
                <div style="font-size:10px; color:${midGray}; line-height:1.35;">Optimizado para WhatsApp, Instagram, LinkedIn, Favicon y apps móviles.</div>
              </div>
            </div>

            <!-- 3. SELLO DE AUTOR -->
            <div class="tbb-card" style="display:flex; gap:16px; align-items:center;">
              <div style="width:84px; height:84px; flex-shrink:0;">
                ${suite.seal}
              </div>
              <div>
                <span class="tbb-tag-pill" style="background:${acc}; font-size:8px;">3. SELLO / EMBLEMA</span>
                <div style="font-size:11px; font-weight:700; color:${darkInk}; margin:4px 0 2px 0;">Sello Circular de Packaging</div>
                <div style="font-size:10px; color:${midGray}; line-height:1.35;">Ideal para packaging, lacres de cera, cajas, etiquetas y bordados textiles.</div>
              </div>
            </div>
          </div>
        </div>
        ${ftr(13)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 14: ANATOMÍA Y CONCEPTO DEL SÍMBOLO CENTRAL
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-14">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 14, "Anatomía y Fundamentación Conceptual del Símbolo")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:${softBg}; border:1.5px solid ${lightGray}; border-radius:18px; padding:28px;">
            <div style="width:190px; height:190px;">
              <svg viewBox="0 0 200 200" width="190" height="190" xmlns="http://www.w3.org/2000/svg">
                ${symCore}
              </svg>
            </div>
            <div style="font-family:'Montserrat', sans-serif; font-size:10px; font-weight:800; color:${pri}; margin-top:14px; letter-spacing:1.5px;">
              GEOMETRÍA BÉZIER PURA · SIN PLANTILLAS
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${pri};">1. Morfología y Síntesis</div>
              <div class="tbb-card-body">Diseñado mediante trazos Bézier continuos sin puntos de anclaje espurios ni esquinas quebradas. La figura equilibra masa y espacio negativo.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${sec};">2. Relevancia Semántica</div>
              <div class="tbb-card-body">Cada vector responde al giro real de la marca (${esc(category)}), transmitiendo liderazgo y solidez desde la primera mirada.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title" style="color:${acc};">3. Escalabilidad Extrema</div>
              <div class="tbb-card-body">Conserva reconocimiento óptico absoluto tanto en vallas de 10 metros como en un favicon microscópico de 16x16 píxeles.</div>
            </div>
          </div>
        </div>
        ${ftr(14)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 15: CONSTRUCCIÓN Y RETÍCULA MODULAR ÁUREA
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-15">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 15, "Construcción Geométrica y Retícula Proporcional (φ = 1.618)")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div style="position:relative; background:${softBg}; border:1.5px solid ${lightGray}; border-radius:18px; padding:24px; display:flex; align-items:center; justify-content:center;">
            <!-- Retícula de Guías Superpuesta -->
            <svg viewBox="0 0 200 200" width="200" height="200" style="position:absolute; inset:24px; pointer-events:none;">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#CBD5E1" stroke-width="1"/>
              <circle cx="100" cy="100" r="55.6" fill="none" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3,3"/>
              <circle cx="100" cy="100" r="34.4" fill="none" stroke="${sec}" stroke-width="1"/>
              <line x1="10" y1="100" x2="190" y2="100" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="100" y1="10" x2="100" y2="190" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="20" y1="20" x2="180" y2="180" stroke="#E2E8F0" stroke-width="0.8"/>
              <line x1="20" y1="180" x2="180" y2="20" stroke="#E2E8F0" stroke-width="0.8"/>
            </svg>
            <div style="width:200px; height:200px; opacity:0.85;">
              <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                ${symCore}
              </svg>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="tbb-card">
              <div class="tbb-card-title">Módulo Base X y Relación Áurea</div>
              <div class="tbb-card-body">Las curvas se gobiernan por arcos concéntricos derivados de la serie Fibonacci (34, 55, 89, 144 módulos), asegurando armonía visual natural.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">Simetría Axial y Balance Dinámico</div>
              <div class="tbb-card-body">El centro de gravedad óptico coincide con el eje geométrico vertical (X=100), evitando cualquier sensación de inclinación o desequilibrio.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">Cero Deformaciones Manuales</div>
              <div class="tbb-card-body">La retícula prohíbe el estiramiento asimétrico en el software de edición. Los vectores deben escalarse manteniendo la proporción 1:1.</div>
            </div>
          </div>
        </div>
        ${ftr(15)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 16: ÁREA DE AISLAMIENTO Y REDUCCIÓN MÍNIMA
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-16">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 16, "Área de Aislamiento y Límites de Reducción Mínima")}
        <div class="tbb-grid-2col">
          <div class="tbb-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div class="tbb-card-title">ZONA DE PROTECCIÓN (MARGEN X)</div>
              <p style="font-size:11.5px; color:#475569; margin:4px 0 16px 0;">Ningún texto, logotipo de terceros o elemento gráfico puede invadir el área perimetral definida por el módulo X (altura del símbolo / 4):</p>
              <div style="background:${softBg}; border:1px dashed ${sec}; border-radius:12px; padding:24px; display:flex; align-items:center; justify-content:center;">
                <div style="border:1.5px dashed ${pri}; padding:14px; border-radius:8px;">
                  <div style="width:110px; height:110px;">
                    <svg viewBox="0 0 200 200" width="110" height="110">${symCore}</svg>
                  </div>
                </div>
              </div>
            </div>
            <div style="font-size:10.5px; color:${midGray}; font-weight:700;">Margen de seguridad: X = 25% de la cota vertical.</div>
          </div>

          <div class="tbb-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div class="tbb-card-title">LÍMITES DE REDUCCIÓN MÍNIMA</div>
              <p style="font-size:11.5px; color:#475569; margin:4px 0 16px 0;">Para garantizar legibilidad absoluta y evitar empastamiento de tintas o pixelado en pantallas:</p>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; text-align:center;">
                <div style="background:${softBg}; border:1px solid ${lightGray}; border-radius:10px; padding:16px;">
                  <div style="font-size:24px; font-weight:900; color:${pri}; font-family:'JetBrains Mono';">12 mm</div>
                  <div style="font-size:10px; font-weight:700; color:${darkInk}; margin-top:4px;">MEDIOS IMPRESOS</div>
                  <div style="font-size:9.5px; color:${midGray};">Off-set, serigrafía y bordado</div>
                </div>
                <div style="background:${softBg}; border:1px solid ${lightGray}; border-radius:10px; padding:16px;">
                  <div style="font-size:24px; font-weight:900; color:${sec}; font-family:'JetBrains Mono';">36 px</div>
                  <div style="font-size:10px; font-weight:700; color:${darkInk}; margin-top:4px;">PANTALLAS DIGITALES</div>
                  <div style="font-size:9.5px; color:${midGray};">UI móvil y web responsive</div>
                </div>
              </div>
            </div>
            <div style="font-size:10.5px; color:${midGray}; font-weight:700;">Para favicons de 16x16 px usar exclusivamente el isotipo matriz.</div>
          </div>
        </div>
        ${ftr(16)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 17: VERSIÓN OFICIAL EN POSITIVO (LIENZO CLARO #FFFFFF)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-17">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 17, "Versión Oficial en Positivo (100% Lienzo Claro #FFFFFF)")}
        <div style="display:flex; flex-direction:column; justify-content:space-between; flex:1;">
          <div style="background:#FFFFFF; border:2px solid #E6E6E6; border-radius:16px; padding:40px; display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; box-shadow:0 8px 24px rgba(13,37,64,0.03);">
            <div style="max-width:480px; width:100%;">
              ${suite.horizontal}
            </div>
          </div>
          <div class="tbb-card" style="margin-top:14px; border-left:4px solid ${pri};">
            <div class="tbb-card-title">NORMATIVA DE LIENZO CLARO (DIRECTIVA MAX C-00)</div>
            <div class="tbb-card-body">Esta es la versión primaria por defecto. Debe aplicarse siempre sobre fondo blanco puro (#FFFFFF) o superficies con luminancia superior al 95%. Prohibido aplicar sombras paralelas, contornos artificiales o parches grises alrededor del logo.</div>
          </div>
        </div>
        ${ftr(17)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 18: VERSIÓN OFICIAL EN NEGATIVO CALADO
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-18">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 18, "Versión Oficial en Negativo Calado (Fondo Oscuro sin Parches)")}
        <div style="display:flex; flex-direction:column; justify-content:space-between; flex:1;">
          <div style="background:${darkInk}; border-radius:16px; padding:40px; display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; box-shadow:0 12px 30px rgba(0,0,0,0.18);">
            <div style="max-width:480px; width:100%;">
              ${suite.horizontalNeg}
            </div>
          </div>
          <div class="tbb-card" style="margin-top:14px; border-left:4px solid ${sec};">
            <div class="tbb-card-title">NORMATIVA DE NEGATIVO CALADO</div>
            <div class="tbb-card-body">Uso exclusivo cuando el soporte sea negro, azul corporativo oscuro o fotográfico de baja luminosidad. El isotipo se adapta en blanco óptico y zafiro, eliminando cualquier contenedor blanco rectangular.</div>
          </div>
        </div>
        ${ftr(18)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 19: VERSIÓN MONOCROMÁTICA Y ESCALA DE GRISES
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-19">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 19, "Versiones Monocromáticas: Negro Puro y Alto Contraste")}
        <div class="tbb-grid-2col">
          <div class="tbb-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div class="tbb-card-title">1. MONOCROMO EN NEGRO PURO (#000000)</div>
              <p style="font-size:11px; color:#475569; margin:4px 0 16px 0;">Para facturación fiscal física, sellos de goma, copias fotostáticas y documentos legales notariales:</p>
              <div style="background:#FFFFFF; border:1px solid #E6E6E6; border-radius:10px; padding:24px; display:flex; align-items:center; justify-content:center;">
                <div style="width:110px; height:110px; filter:grayscale(100%) contrast(200%);">
                  <svg viewBox="0 0 200 200" width="110" height="110">${symCore}</svg>
                </div>
              </div>
            </div>
            <div style="font-size:10px; color:${midGray}; font-weight:700;">100% Tinta Negra (K:100) sin tramas.</div>
          </div>

          <div class="tbb-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div class="tbb-card-title">2. ESCALA DE GRISES CONTROLADA</div>
              <p style="font-size:11px; color:#475569; margin:4px 0 16px 0;">Para publicaciones en prensa y guías impresas a una sola tinta con valores de gris diferenciados:</p>
              <div style="background:#FFFFFF; border:1px solid #E6E6E6; border-radius:10px; padding:24px; display:flex; align-items:center; justify-content:center;">
                <div style="width:110px; height:110px; filter:grayscale(100%);">
                  <svg viewBox="0 0 200 200" width="110" height="110">${symCore}</svg>
                </div>
              </div>
            </div>
            <div style="font-size:10px; color:${midGray}; font-weight:700;">Degradado lineal en gris al 80% y 40%.</div>
          </div>
        </div>
        ${ftr(19)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 20: USOS PROHIBIDOS Y DEFORMACIONES
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-20">
        ${hdr("SECCIÓN 03", "ARQUITECTURA DE IDENTIDAD VISUAL", 20, "Usos Prohibidos y Deformaciones Gráficas No Permitidas")}
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; flex:1;">
          <div class="tbb-card" style="text-align:center; border:1.5px solid #FCA5A5;">
            <div style="height:70px; display:flex; align-items:center; justify-content:center; transform:scaleX(1.4); opacity:0.8;">
              <div style="width:50px; height:50px;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
            </div>
            <div style="color:#DC2626; font-weight:900; font-size:11px; margin:6px 0 2px 0;">✕ NO DEFORMAR</div>
            <div style="font-size:9.5px; color:#666;">Prohibido estirar horizontal o verticalmente.</div>
          </div>

          <div class="tbb-card" style="text-align:center; border:1.5px solid #FCA5A5;">
            <div style="height:70px; display:flex; align-items:center; justify-content:center; filter:drop-shadow(4px 4px 6px #000);">
              <div style="width:50px; height:50px;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
            </div>
            <div style="color:#DC2626; font-weight:900; font-size:11px; margin:6px 0 2px 0;">✕ NO SOMBRAS GRISES</div>
            <div style="font-size:9.5px; color:#666;">Prohibido añadir sombras paralelas borrosas.</div>
          </div>

          <div class="tbb-card" style="text-align:center; border:1.5px solid #FCA5A5;">
            <div style="height:70px; display:flex; align-items:center; justify-content:center; filter:hue-rotate(140deg);">
              <div style="width:50px; height:50px;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
            </div>
            <div style="color:#DC2626; font-weight:900; font-size:11px; margin:6px 0 2px 0;">✕ NO CAMBIAR PALETA</div>
            <div style="font-size:9.5px; color:#666;">Usar exclusivamente los tonos aprobados.</div>
          </div>

          <div class="tbb-card" style="text-align:center; border:1.5px solid #FCA5A5;">
            <div style="height:70px; display:flex; align-items:center; justify-content:center; transform:rotate(28deg);">
              <div style="width:50px; height:50px;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
            </div>
            <div style="color:#DC2626; font-weight:900; font-size:11px; margin:6px 0 2px 0;">✕ NO ROTAR EN ÁNGULO</div>
            <div style="font-size:9.5px; color:#666;">El símbolo siempre se alinea en eje recto.</div>
          </div>

          <div class="tbb-card" style="text-align:center; border:1.5px solid #FCA5A5;">
            <div style="height:70px; display:flex; align-items:center; justify-content:center; background:#E11D48; border-radius:6px; padding:4px;">
              <div style="width:50px; height:50px;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
            </div>
            <div style="color:#DC2626; font-weight:900; font-size:11px; margin:6px 0 2px 0;">✕ NO FONDOS ESTRIDENTES</div>
            <div style="font-size:9.5px; color:#666;">Jamás montar sobre rojos, verdes o amarillos.</div>
          </div>

          <div class="tbb-card" style="text-align:center; border:1.5px solid #FCA5A5;">
            <div style="height:70px; display:flex; align-items:center; justify-content:center; font-family:'Comic Sans MS', cursive; font-size:14px; font-weight:bold; color:${pri};">
              ${esc(bUpper)}
            </div>
            <div style="color:#DC2626; font-weight:900; font-size:11px; margin:6px 0 2px 0;">✕ NO ALTERAR TIPOGRAFÍA</div>
            <div style="font-size:9.5px; color:#666;">Usar exclusivamente la fuente institucional.</div>
          </div>
        </div>
        ${ftr(20)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 21: PALETA CROMÁTICA OFICIAL (HEX, RGB, CMYK, PANTONE)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-21">
        ${hdr("SECCIÓN 04", "COLORIMETRÍA Y TIPOGRAFÍA", 21, "Paleta Cromática Oficial de 4 Tonos Clave")}
        <div class="tbb-grid-4col" style="align-items:center;">
          <!-- 1. PRIMARIO -->
          <div class="tbb-swatch">
            <div class="tbb-swatch-box" style="background:${pri};"></div>
            <div class="tbb-swatch-meta">
              <strong style="color:${darkInk};">COLOR PRIMARIO</strong><br/>
              HEX: <code>${pri}</code><br/>
              RGB: ${hexToRgb(pri).r}, ${hexToRgb(pri).g}, ${hexToRgb(pri).b}<br/>
              CMYK: ${hexToCmyk(pri)}<br/>
              ${hexToPantone(pri, 1)}
            </div>
          </div>

          <!-- 2. SECUNDARIO -->
          <div class="tbb-swatch">
            <div class="tbb-swatch-box" style="background:${sec};"></div>
            <div class="tbb-swatch-meta">
              <strong style="color:${darkInk};">COLOR SECUNDARIO</strong><br/>
              HEX: <code>${sec}</code><br/>
              RGB: ${hexToRgb(sec).r}, ${hexToRgb(sec).g}, ${hexToRgb(sec).b}<br/>
              CMYK: ${hexToCmyk(sec)}<br/>
              ${hexToPantone(sec, 2)}
            </div>
          </div>

          <!-- 3. ACENTO -->
          <div class="tbb-swatch">
            <div class="tbb-swatch-box" style="background:${acc};"></div>
            <div class="tbb-swatch-meta">
              <strong style="color:${darkInk};">COLOR DE ACENTO</strong><br/>
              HEX: <code>${acc}</code><br/>
              RGB: ${hexToRgb(acc).r}, ${hexToRgb(acc).g}, ${hexToRgb(acc).b}<br/>
              CMYK: ${hexToCmyk(acc)}<br/>
              ${hexToPantone(acc, 3)}
            </div>
          </div>

          <!-- 4. TINTA OSCURA -->
          <div class="tbb-swatch">
            <div class="tbb-swatch-box" style="background:${darkInk};"></div>
            <div class="tbb-swatch-meta">
              <strong style="color:${darkInk};">TINTA DE TEXTO</strong><br/>
              HEX: <code>${darkInk}</code><br/>
              RGB: ${hexToRgb(darkInk).r}, ${hexToRgb(darkInk).g}, ${hexToRgb(darkInk).b}<br/>
              CMYK: ${hexToCmyk(darkInk)}<br/>
              Pantone Black 6 C
            </div>
          </div>
        </div>
        ${ftr(21)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 22: JERARQUÍA TIPOGRÁFICA PRINCIPAL (TITULARES)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-22">
        ${hdr("SECCIÓN 04", "COLORIMETRÍA Y TIPOGRAFÍA", 22, "Tipografía Institucional Primaria: Titulares y Logomarca")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div class="tbb-card" style="border-left:5px solid ${pri}; padding:26px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${pri}; margin-bottom:8px;">FAMILIA DISPLAY PRINCIPAL</div>
            <h1 style="font-family:'${priFont}', 'Montserrat', sans-serif; font-size:36px; font-weight:900; color:${darkInk}; margin:0 0 10px 0;">${priFont}</h1>
            <p style="font-size:12px; line-height:1.6; color:#475569; margin:0 0 14px 0;">
              Tipografía con proporciones nobles, alta fuerza visual y trazos limpios que comunican solvencia técnica e impacto.
            </p>
            <div style="font-family:'${priFont}', 'Montserrat', sans-serif; font-size:16px; font-weight:800; color:${pri}; letter-spacing:1px;">
              ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<br/>
              abcdefghijklmnñopqrstuvwxyz<br/>
              0123456789 (!?@#$%&amp;*)
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="tbb-card">
              <div class="tbb-card-title">H1 · Titulares Principales</div>
              <div style="font-family:'${priFont}', sans-serif; font-size:22px; font-weight:900; color:${darkInk};">Construcción y Excelencia</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">H2 · Subtitulares de Sección</div>
              <div style="font-family:'${priFont}', sans-serif; font-size:16px; font-weight:800; color:${pri};">Rigor Técnico y Confianza</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">Uso Normativo</div>
              <div class="tbb-card-body">Exclusiva para nombres de marca, portadas, títulos y lemas. Prohibido usar para párrafos extensos.</div>
            </div>
          </div>
        </div>
        ${ftr(22)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 23: JERARQUÍA TIPOGRÁFICA DE LECTURA (TEXTO CORRIDO)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-23">
        ${hdr("SECCIÓN 04", "COLORIMETRÍA Y TIPOGRAFÍA", 23, "Tipografía de Lectura y Contratos: ${secFont}")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div class="tbb-card" style="border-left:5px solid ${sec}; padding:26px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:10px; font-weight:800; color:${sec}; margin-bottom:8px;">FAMILIA DE CUERPO Y UI</div>
            <h1 style="font-family:'${secFont}', sans-serif; font-size:32px; font-weight:800; color:${darkInk}; margin:0 0 10px 0;">${secFont}</h1>
            <p style="font-size:12px; line-height:1.6; color:#475569; margin:0 0 14px 0;">
              Fuente sans-serif geométrica de legibilidad superior en pantallas de alta densidad y contratos impresos en cuerpos pequeños (8 a 11 pt).
            </p>
            <div style="font-family:'${secFont}', sans-serif; font-size:14px; font-weight:500; color:#333; line-height:1.5;">
              ABCDEFGHIJKLMNÑOPQRSTUVWXYZ<br/>
              abcdefghijklmnñopqrstuvwxyz<br/>
              0123456789 (!?@#$%&amp;*)
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="tbb-card">
              <div class="tbb-card-title">Párrafo Estándar (11 pt / Interlineado 1.6)</div>
              <div class="tbb-card-body" style="font-family:'${secFont}';">La claridad en la comunicación escrita refleja la seriedad operativa de la organización en cada touchpoint comercial.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">Microcopy y Datos Técnicos (9 pt)</div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:9.5px; color:${midGray};">CLASE NIZA 42 · REGISTRO PENDIENTE · IMPRESO EN MÉXICO</div>
            </div>
          </div>
        </div>
        ${ftr(23)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 24: DESPLIEGUE EN ENTORNOS DIGITALES (WEB, APP, SOCIAL)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-24">
        ${hdr("SECCIÓN 05", "SISTEMA DE APLICACIONES", 24, "Despliegue Digital: Web, Móvil y Perfiles Sociales")}
        <div class="tbb-grid-3col" style="align-items:center;">
          <!-- 1. Cabecera Web -->
          <div class="tbb-card" style="text-align:center;">
            <div style="font-size:10px; font-weight:800; color:${pri}; margin-bottom:8px;">1. CABECERA WEB (DESKTOP)</div>
            <div style="background:#FFFFFF; border:1px solid ${lightGray}; border-radius:8px; padding:12px; margin-bottom:8px;">
              ${suite.horizontal}
            </div>
            <div style="font-size:10px; color:${midGray};">Header con navegación transparente o fondo blanco.</div>
          </div>

          <!-- 2. Favicon y App Icon -->
          <div class="tbb-card" style="text-align:center;">
            <div style="font-size:10px; font-weight:800; color:${sec}; margin-bottom:8px;">2. APP ICON &amp; FAVICON</div>
            <div style="width:72px; height:72px; margin:0 auto 10px auto;">
              ${suite.avatar}
            </div>
            <div style="font-size:10px; color:${midGray};">Icono para pantalla de inicio iOS/Android.</div>
          </div>

          <!-- 3. Avatar Redes Sociales -->
          <div class="tbb-card" style="text-align:center;">
            <div style="font-size:10px; font-weight:800; color:${acc}; margin-bottom:8px;">3. SOCIAL AVATAR</div>
            <div style="width:72px; height:72px; margin:0 auto 10px auto;">
              ${suite.avatarInverted}
            </div>
            <div style="font-size:10px; color:${midGray};">Foto de perfil circular en LinkedIn e Instagram.</div>
          </div>
        </div>
        ${ftr(24)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 25: PAPELERÍA CORPORATIVA Y FACTURA EJECUTIVA
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-25">
        ${hdr("SECCIÓN 05", "SISTEMA DE APLICACIONES", 25, "Papelería Ejecutiva: Hoja Membretada y Tarjeta de Presentación")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <!-- Hoja Membretada -->
          <div class="tbb-card" style="background:#FFFFFF; height:240px; display:flex; flex-direction:column; justify-content:space-between; border:1.5px solid ${lightGray};">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid ${lightGray}; padding-bottom:8px;">
              <div style="width:130px;">${suite.horizontal}</div>
              <div style="font-size:8px; font-family:'JetBrains Mono'; color:${midGray};">${esc(bUpper)} · OFICIAL</div>
            </div>
            <div style="font-size:8.5px; line-height:1.6; color:#555;">
              Estimado cliente,<br/>
              Por medio de la presente certificamos la entrega de los servicios estipulados bajo los estándares de calidad comprometidos en la propuesta ejecutiva...
            </div>
            <div style="border-top:1px solid ${lightGray}; padding-top:6px; display:flex; justify-content:space-between; font-size:7.5px; color:${midGray};">
              <span>contacto@${esc(brand.slug || "marca")}.com</span>
              <span>Página 01 de 01</span>
            </div>
          </div>

          <!-- Tarjeta de Presentación -->
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="background:${pri}; color:#FFFFFF; border-radius:10px; padding:18px; box-shadow:0 8px 18px rgba(13,37,64,0.15);">
              <div style="width:140px; margin-bottom:12px;">${suite.horizontalNeg}</div>
              <div style="font-size:12px; font-weight:800;">DIRECCIÓN GENERAL</div>
              <div style="font-size:9.5px; opacity:0.8;">Socio Fundador · ${esc(bName)}</div>
            </div>
            <div style="background:#FFFFFF; border:1.5px solid ${lightGray}; border-radius:10px; padding:14px; font-size:9.5px; color:#333;">
              <strong>Dimensiones oficiales de tarjeta:</strong> 9.0 x 5.0 cm en cartulina couché mate de 350 g con barniz a registro en el isotipo.
            </div>
          </div>
        </div>
        ${ftr(25)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 26: PACKAGING, EMPAQUES Y SELLO DE AUTOR
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-26">
        ${hdr("SECCIÓN 05", "SISTEMA DE APLICACIONES", 26, "Packaging y Empaque: Aplicación del Sello de Autor")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:${softBg}; border:1.5px solid ${lightGray}; border-radius:18px; padding:24px;">
            <div style="width:170px; height:170px;">
              ${suite.seal}
            </div>
            <div style="font-size:10.5px; font-weight:800; color:${pri}; margin-top:12px; letter-spacing:1px;">
              SELLO DE CLAUSURA DE CAJA
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div class="tbb-card">
              <div class="tbb-card-title">1. Cinta Adhesiva de Seguridad</div>
              <div class="tbb-card-body">Cinta de papel kraft ecológico con repetición del logo horizontal en tinta al agua #0D2540.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">2. Lacre o Sello en Relieve</div>
              <div class="tbb-card-body">Para cajas de lujo y sobres ejecutivos, estampar el sello circular con golpe seco o cera vegetal.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">3. Bolsa de Papel FSC</div>
              <div class="tbb-card-body">Bolsa con asas de algodón y el logo centrado a 12 cm de base con contraste positivo.</div>
            </div>
          </div>
        </div>
        ${ftr(26)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 27: UNIFORMES Y TEXTILES (BORDADO Y SERIGRAFÍA)
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-27">
        ${hdr("SECCIÓN 05", "SISTEMA DE APLICACIONES", 27, "Indumentaria Corporativa y Aplicación Textil")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div class="tbb-card" style="border-left:4px solid ${pri}; padding:20px;">
            <div class="tbb-card-title">CRITERIOS DE BORDADO (NORMA TÉCNICA)</div>
            <p style="font-size:11.5px; line-height:1.6; color:#333; margin-bottom:12px;">
              Para prendas ejecutivas (camisas polo, sacos y delantales):
            </p>
            <ul style="margin:0; padding-left:18px; font-size:11px; line-height:1.6; color:#475569;">
              <li>Ubicación: Pecho izquierdo (sobre el corazón) a 18 cm del hombro.</li>
              <li>Ancho máximo de bordado: 7.5 cm para el logo horizontal o 5.0 cm para el isotipo.</li>
              <li>Grosor mínimo de puntada: 1.2 mm para evitar deshilachado con lavados continuos.</li>
              <li>Hilos aprobados: Madeira Polyneon con equivalencia Pantone oficial.</li>
            </ul>
          </div>

          <div class="tbb-card" style="border-left:4px solid ${sec}; padding:20px;">
            <div class="tbb-card-title">SERIGRAFÍA Y TRANSFER TÉCNICO</div>
            <p style="font-size:11.5px; line-height:1.6; color:#333; margin-bottom:12px;">
              Para camisetas de algodón y gorras deportivas:
            </p>
            <ul style="margin:0; padding-left:18px; font-size:11px; line-height:1.6; color:#475569;">
              <li>Tintas base agua libres de PVC y metales pesados.</li>
              <li>En prendas oscuras, fondear primero con base blanca elástica.</li>
              <li>Temperatura de curado textil: 160°C durante 90 segundos.</li>
            </ul>
          </div>
        </div>
        ${ftr(27)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 28: ESPACIO FÍSICO, FACHADA Y SEÑALÉTICA
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-28">
        ${hdr("SECCIÓN 05", "SISTEMA DE APLICACIONES", 28, "Espacio Físico, Fachada y Señalética Arquitectónica")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div class="tbb-card" style="border-left:4px solid ${acc}; padding:20px;">
            <div class="tbb-card-title">RÓTULO EXTERIOR DE FACHADA</div>
            <p style="font-size:11.5px; line-height:1.6; color:#333; margin-bottom:12px;">
              El rótulo exterior debe montarse en letras 3D recortadas (aluminio cepillado o acrílico mate de 15 mm) con retroiluminación LED cálida (3000K):
            </p>
            <div style="background:${softBg}; border:1px solid ${lightGray}; border-radius:8px; padding:16px; text-align:center;">
              <div style="font-family:'${priFont}', sans-serif; font-size:22px; font-weight:900; color:${darkInk}; letter-spacing:3px;">
                ${esc(bUpper)}
              </div>
              <div style="font-size:9px; color:${pri}; font-weight:700; margin-top:4px;">${esc(tagline.toUpperCase())}</div>
            </div>
          </div>

          <div class="tbb-card" style="border-left:4px solid ${pri}; padding:20px;">
            <div class="tbb-card-title">SEÑALIZACIÓN INTERIOR Y TÓTEM</div>
            <ul style="margin:0; padding-left:18px; font-size:11px; line-height:1.65; color:#475569;">
              <li>Placas de directorio en vidrio templado esmerilado con chapetones de acero inoxidable.</li>
              <li>Señalética de módulos con tipografía ${secFont} a 1.60 m de altura respecto al piso.</li>
              <li>Aroma y música ambiental curados para complementar la experiencia sensorial del giro.</li>
            </ul>
          </div>
        </div>
        ${ftr(28)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 29: CLASIFICACIÓN DE NIZA Y GOBERNANZA LEGAL
    // =========================================================================
    plates.push(`
      <article class="tbb-plate" id="plate-29">
        ${hdr("SECCIÓN 06", "GOBERNANZA Y BLINDAJE JURÍDICO", 29, "Registro de Marca y Clasificación Internacional de Niza")}
        <div class="tbb-grid-2col" style="align-items:center;">
          <div class="tbb-card" style="border-left:5px solid ${pri}; padding:24px;">
            <div style="font-size:10px; font-weight:800; color:${pri}; letter-spacing:1px; margin-bottom:6px;">PROTECCIÓN LEGAL OFICIAL</div>
            <h3 style="font-family:'Montserrat', sans-serif; font-size:20px; font-weight:900; color:${darkInk}; margin:0 0 10px 0;">${esc(niza)}</h3>
            <p style="font-size:12px; line-height:1.6; color:#475569; margin:0 0 14px 0;">
              Clase rectora recomendada ante los institutos de propiedad industrial (IMPI / USPTO / EUIPO) según el giro operativo real de <strong>${esc(bName)}</strong>.
            </p>
            <div style="background:${softBg}; border:1px solid ${lightGray}; border-radius:8px; padding:10px; font-size:10px; color:#333;">
              <strong>Signo Distintivo:</strong> Marca Mixta (Denominación + Diseño en Curvas SVG registradas).
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div class="tbb-card">
              <div class="tbb-card-title">Vigilancia Marcaria Activa</div>
              <div class="tbb-card-body">Monitoreo permanente de gacetas oficiales para presentar oposiciones oportunas ante solicitudes fonéticamente similares.</div>
            </div>
            <div class="tbb-card">
              <div class="tbb-card-title">Declaración de Uso Real</div>
              <div class="tbb-card-body">Asegurar la vigencia decenal mediante la presentación de comprobantes de uso comercial continuo.</div>
            </div>
          </div>
        </div>
        ${ftr(29)}
      </article>
    `);

    // =========================================================================
    // LÁMINA 30: CLAUSURA Y ARQUITECTURA MULTIMARCA / MONOLÍTICA
    // =========================================================================
    if (isMultibrand) {
      // HOLDING MULTIMARCA (Ej: Grupo Corporativo ImproBears con 4 Divisiones Homologadas)
      plates.push(`
        <article class="tbb-plate" id="plate-30">
          ${hdr("SECCIÓN 06", "GOBERNANZA Y ARQUITECTURA", 30, "Arquitectura Corporativa Multimarca: 4 Divisiones Homologadas")}
          <div style="margin-bottom:12px; font-size:11.5px; color:#475569;">
            Ecosistema empresarial homologado bajo la Directiva Max C-00 (Descriptor en <strong>#FF7A00</strong> y Marca Madre en Positivo):
          </div>
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; flex:1; align-items:center;">
            <!-- Consulting -->
            <div class="tbb-card" style="text-align:center; padding:14px;">
              <div style="width:70px; height:70px; margin:0 auto 8px auto;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
              <div style="font-family:'Montserrat', sans-serif; font-size:10px; font-weight:900; color:${darkInk};">IMPROBEARS</div>
              <div style="font-size:9px; font-weight:800; color:#FF7A00; letter-spacing:1px; margin-top:2px;">CONSULTING</div>
              <div style="font-size:8.5px; color:${midGray}; margin-top:6px;">Estrategia &amp; Negocios</div>
            </div>

            <!-- Ingredients -->
            <div class="tbb-card" style="text-align:center; padding:14px;">
              <div style="width:70px; height:70px; margin:0 auto 8px auto;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
              <div style="font-family:'Montserrat', sans-serif; font-size:10px; font-weight:900; color:${darkInk};">IMPROBEARS</div>
              <div style="font-size:9px; font-weight:800; color:#FF7A00; letter-spacing:1px; margin-top:2px;">INGREDIENTS</div>
              <div style="font-size:8.5px; color:${midGray}; margin-top:6px;">Ingeniería de Valor</div>
            </div>

            <!-- Studio -->
            <div class="tbb-card" style="text-align:center; padding:14px;">
              <div style="width:70px; height:70px; margin:0 auto 8px auto;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
              <div style="font-family:'Montserrat', sans-serif; font-size:10px; font-weight:900; color:${darkInk};">IMPROBEARS</div>
              <div style="font-size:9px; font-weight:800; color:#FF7A00; letter-spacing:1px; margin-top:2px;">STUDIO</div>
              <div style="font-size:8.5px; color:${midGray}; margin-top:6px;">Medios &amp; Marca</div>
            </div>

            <!-- AI -->
            <div class="tbb-card" style="text-align:center; padding:14px;">
              <div style="width:70px; height:70px; margin:0 auto 8px auto;"><svg viewBox="0 0 200 200">${symCore}</svg></div>
              <div style="font-family:'Montserrat', sans-serif; font-size:10px; font-weight:900; color:${darkInk};">IMPROBEARS</div>
              <div style="font-size:9px; font-weight:800; color:#FF7A00; letter-spacing:1px; margin-top:2px;">AI</div>
              <div style="font-size:8.5px; color:${midGray}; margin-top:6px;">Soluciones Autónomas</div>
            </div>
          </div>
          <div style="background:${softBg}; border:1px solid ${lightGray}; border-radius:8px; padding:10px; margin-top:10px; font-size:10px; color:#475569; text-align:center;">
            <strong>Regla Maestra de Convivencia:</strong> Cada división mantiene el imagotipo unificado en azul corporativo, diferenciándose exclusivamente por el descriptor tipográfico en naranja (#FF7A00).
          </div>
          ${ftr(30)}
        </article>
      `);
    } else {
      // MARCA INDIVIDUAL / MONOLÍTICA
      plates.push(`
        <article class="tbb-plate" id="plate-30">
          ${hdr("SECCIÓN 06", "GOBERNANZA Y CLAUSURA", 30, "Certificado Oficial de Entrega y Constitución de Marca")}
          <div style="display:flex; flex-direction:column; justify-content:space-between; align-items:center; text-align:center; flex:1; padding:20px 40px;">
            <div style="width:130px; height:130px; margin-bottom:12px;">
              ${suite.seal}
            </div>
            <h2 style="font-family:'${priFont}', 'Montserrat', sans-serif; font-size:26px; font-weight:900; color:${darkInk}; margin:0 0 6px 0;">
              ${esc(bUpper)}
            </h2>
            <div style="font-size:12px; font-weight:800; color:${pri}; letter-spacing:2px; margin-bottom:14px;">
              CONSTITUCIÓN DE IDENTIDAD VECTORIAL EN CURVAS PURAS
            </div>
            <p style="font-size:11.5px; line-height:1.65; color:#475569; max-width:620px; margin:0 0 16px 0;">
              Se certifica que la presente identidad de marca ha sido generada bajo la <strong>Directiva Max C-00</strong> sobre lienzo claro puro (#FFFFFF), con independencia absoluta de datos, retícula proporcional áurea y vectores matemáticos sin dependencia de plantillas prefabricadas.
            </p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; border-top:1.5px solid ${lightGray}; padding-top:14px; width:100%; max-width:540px;">
              <div>
                <div style="font-size:9.5px; font-weight:800; color:${midGray};">SOCIO FUNDADOR / PROPIETARIO</div>
                <div style="font-size:11px; font-weight:700; color:${darkInk}; margin-top:2px;">Aprobado y Firmado</div>
              </div>
              <div>
                <div style="font-size:9.5px; font-weight:800; color:${midGray};">ATELIER THE BEST BRAND</div>
                <div style="font-size:11px; font-weight:700; color:${darkInk}; margin-top:2px;">Emisión Certificada 2026</div>
              </div>
            </div>
          </div>
          ${ftr(30)}
        </article>
      `);
    }

    return plates;
  }

  // --- COMPILADOR DE DOCUMENTO HTML COMPLETO ---
  function generateFullBrandbookDocHtml(brand) {
    const bName = brand.name || "The Best Brand";
    const styles = getDynamicBrandbookStyles();
    const plates = generateBrandbook30Plates(brand);

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Manual Oficial de Identidad (30 Láminas) — ${esc(bName)}</title>
  <style>${styles}</style>
</head>
<body>
  ${plates.join("\n")}
</body>
</html>`;
  }

  // --- MÓDULO DE REFINAMIENTO SOCRÁTICO CON GEMINI (PROXY BLINDADO + MEMOIZACIÓN FINOPS) ---
  const _refineContentCache = new Map();
  async function refineBrandContentWithGemini(rawUserInput, sectionKey, brandContext = {}) {
    if (!rawUserInput || String(rawUserInput).trim().length < 3) return rawUserInput;
    const bName = brandContext.name || "Marca";
    const cacheKey = `${bName}:${sectionKey}:${String(rawUserInput).trim().toLowerCase()}`;
    if (_refineContentCache.has(cacheKey)) {
      return _refineContentCache.get(cacheKey);
    }
    const apiKey = window.TBB_GEMINI_KEY || (typeof process !== "undefined" && process.env && process.env.GEMINI_API_KEY) || "";

    const prompt = `Actúa como editor de marcas socrático de clase mundial.
El usuario ha redactado lo siguiente para su marca "${bName}" en la sección "${sectionKey}":
"${rawUserInput}"

Instrucciones obligatorias:
1. Pule la redacción, corrige faltas de ortografía y puntuación.
2. Dale estructura ejecutiva clara, concisa y profesional, sin agregar clichés vacíos ni inventar datos que el usuario no mencionó.
3. Respeta 100% la intención original del usuario.
4. Devuelve ÚNICAMENTE el texto pulido en español, sin preámbulos ni explicaciones.`;

    try {
      const payload = {
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3 }
      };
      const baseOrigin = window.TBB_API_BASE || (window.location && window.location.origin ? window.location.origin : "");
      if (!apiKey && !baseOrigin) {
        return rawUserInput;
      }
      const url = apiKey
        ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
        : `${baseOrigin}/api/v1/gemini/proxy`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates && data.candidates[0];
        const text = candidate && candidate.content && candidate.content.parts && candidate.content.parts[0] && candidate.content.parts[0].text;
        if (text && text.trim().length > 3) {
          const cleaned = text.trim();
          _refineContentCache.set(cacheKey, cleaned);
          return cleaned;
        }
      }
    } catch (e) {
      console.warn("Fallo refinamiento Gemini, conservando texto de usuario:", e);
    }
    return rawUserInput;
  }

  // --- GESTOR DE AISLAMIENTO ABSOLUTO DE SESIÓN ---
  function startFreshBrandSession() {
    console.log("Iniciando sesión 100% limpia y sin residuos...");
    try {
      // Limpiar claves de marca en localStorage
      const keysToPurge = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith("tbb_") || k.includes("brand"))) {
          if (k !== "tbb_replit_release_id" && k !== "tbb_user_account_v30" && !k.startsWith("tbb_vault_")) {
            keysToPurge.push(k);
          }
        }
      }
      keysToPurge.forEach(k => localStorage.removeItem(k));
    } catch (e) {}

    // Limpiar estado en memoria de window
    window.canvasState = {
      brandName: "",
      tagline: "",
      primary_font: "Montserrat",
      secondary_font: "Plus Jakarta Sans",
      custom_business_type: "",
      ideal_customer: "",
      golden_circle: "",
      process_steps_text: "",
      value_offer: "",
      brand_persona: "",
      selected_colors_hex: ["#FFFFFF", "#090D16", "#0D2540", "#426EAE"]
    };

    window.step0State = {
      goal: "first",
      sector: "custom_negocio_propio",
      brandName: "",
      tagline: "",
      customBusinessType: ""
    };

    window.tpExtractedItems = {
      before: [],
      during: [],
      after: []
    };

    if (window.tbbState) {
      window.tbbState.activeMode = "step";
      window.tbbState.step = 0;
      window.tbbState.activeStep = 0;
      window.tbbState.subStep = 1;
      window.tbbState.plateIdx = 0;
      window.tbbState.logoIterationIndex = 1;
      window.tbbState.logoIterations = [];
      window.tbbState.logoPriHex = "";
      window.tbbState.logoSecHex = "";
      window.tbbState.selectedFontFamily = "";
    }
    window.currentStep = 1;
    window.acceptedNamingVault = [];

    // Limpiar campos del DOM si existen
    const s0Name = document.getElementById("step0BrandNameInput");
    if (s0Name) s0Name.value = "";
    const s0Slogan = document.getElementById("step0BrandSloganInput");
    if (s0Slogan) s0Slogan.value = "";
    const s0Giro = document.getElementById("step0CustomBusinessInput");
    if (s0Giro) s0Giro.value = "";

    if (typeof window.tbbJumpToStep === "function") {
      window.tbbJumpToStep(0, 1);
    } else if (typeof window.navigateToScreen === "function") {
      window.navigateToScreen("step0", 1);
    } else if (typeof window.renderTbbZeroScrollStage === "function") {
      window.renderTbbZeroScrollStage();
    }
    console.log("✓ Sesión limpia establecida con éxito.");
  }

  // --- VISOR NATIVO EN PANTALLA DENTRO DE STUDIO.HTML ---
  function openInApp30PlatesViewer() {
    let existing = document.getElementById("tbbInApp30PlatesViewerModal");
    if (existing) existing.remove();

    const brand = (typeof window.buildActiveBrandProfileForV80 === "function")
      ? window.buildActiveBrandProfileForV80()
      : (window.canvasState || {});

    const bName = brand.name || "The Best Brand";
    const pri = (brand.colors && brand.colors.pri) || "#0D2540";
    const plates = generateBrandbook30Plates(brand);

    // Inyectar estilos si no existen
    if (!document.getElementById("tbb-v81-styles")) {
      const stEl = document.createElement("style");
      stEl.id = "tbb-v81-styles";
      stEl.textContent = getDynamicBrandbookStyles();
      document.head.appendChild(stEl);
    }

    const modal = document.createElement("div");
    modal.id = "tbbInApp30PlatesViewerModal";
    modal.style.cssText = "position:fixed;inset:0;background:#F1F5F9;z-index:999990;display:flex;flex-direction:column;overflow:hidden;";

    modal.innerHTML = `
      <div style="background:#FFFFFF; border-bottom:4px solid ${pri}; padding:max(12px, env(safe-area-inset-top)) 18px 12px 18px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; box-shadow:0 8px 24px rgba(13,37,64,0.08); z-index:10;">
        <div style="display:flex; align-items:center; gap:12px;">
          <button type="button" id="tbbBtnCloseInApp30Viewer" style="background:#F8FAFC; color:#0F172A; border:2px solid #CBD5E1; border-radius:10px; padding:8px 14px; font-family:'Montserrat',sans-serif; font-size:0.82rem; font-weight:800; cursor:pointer;">
            ← Volver al Atelier
          </button>
          <div>
            <div style="font-family:'Montserrat',sans-serif; font-size:0.86rem; font-weight:900; color:${pri};">
              30 LÁMINAS EN CURVAS · ${esc(bName.toUpperCase())}
            </div>
            <div style="font-size:0.72rem; color:#64748B;">
              Manual Oficial Generado desde Cero · Directiva Max C-00
            </div>
          </div>
        </div>

        <div style="display:flex; gap:10px; align-items:center;">
          <button type="button" id="tbbBtnDownloadBrandbookPdf" style="background:${pri}; color:#FFFFFF; border:none; border-radius:10px; padding:9px 16px; font-family:'Montserrat',sans-serif; font-size:0.82rem; font-weight:800; cursor:pointer; box-shadow:0 4px 12px rgba(13,37,64,0.18);">
             Descargar PDF de 30 Láminas
          </button>
        </div>
      </div>

      <div id="tbbInApp30PlatesScrollBody" style="flex:1; overflow-y:auto; padding:24px 12px; display:flex; flex-direction:column; align-items:center; -webkit-overflow-scrolling:touch;">
        ${plates.join("\n")}
      </div>
    `;

    document.body.appendChild(modal);

    const btnClose = document.getElementById("tbbBtnCloseInApp30Viewer");
    if (btnClose) {
      btnClose.onclick = function () {
        modal.remove();
      };
    }

    const btnDownload = document.getElementById("tbbBtnDownloadBrandbookPdf");
    if (btnDownload) {
      btnDownload.onclick = function () {
        if (typeof window.downloadReal30PlatesPDFDirect === "function") {
          window.downloadReal30PlatesPDFDirect(btnDownload);
        } else {
          window.print();
        }
      };
    }
  }

  // --- EXPORTACIONES GLOBALES AL RUNTIME DE THE BEST BRAND ---
  // Preservamos las referencias nativas del motor de curvas oficial (tbb-v80-brandbook-plates.js + universal-brandbook-30-engine.js)
  // para no degradar sus curvas asimétricas (18px 38px 18px 18px) ni sus isométricos vectoriales.
  const _nativeOpenInApp30PlatesViewer = typeof window.openInApp30PlatesViewer === "function"
    ? window.openInApp30PlatesViewer
    : null;
  const _nativeBuildUniversal30PlatesStandaloneHTML = typeof window.buildUniversal30PlatesStandaloneHTML === "function"
    ? window.buildUniversal30PlatesStandaloneHTML
    : null;
  const _nativeRenderUniversalSinglePlateHTML = typeof window.renderUniversalImproBearsGuideSinglePlateHTML === "function"
    ? window.renderUniversalImproBearsGuideSinglePlateHTML
    : null;
  const _nativeV80PlatesGenerator = window.TBB_V80_PLATES_GENERATOR
    ? Object.assign({}, window.TBB_V80_PLATES_GENERATOR)
    : null;

  window.generateTriFoldLogoSuite = generateTriFoldLogoSuite;
  window.getDynamicBrandbookStyles = getDynamicBrandbookStyles;
  window.generateBrandbook30Plates = (_nativeV80PlatesGenerator && _nativeV80PlatesGenerator.generateBrandbook30Plates) || generateBrandbook30Plates;
  window.generateFullBrandbookDocHtml = (_nativeV80PlatesGenerator && _nativeV80PlatesGenerator.generateFullBrandbookDocHtml) || generateFullBrandbookDocHtml;
  window.refineBrandContentWithGemini = refineBrandContentWithGemini;
  window.startFreshBrandSession = startFreshBrandSession;
  window.openInApp30PlatesViewer = _nativeOpenInApp30PlatesViewer || openInApp30PlatesViewer;

  // Interfaz de compatibilidad universal (Directiva Max C-00 + Escalador Zero-Scroll)
  window.buildUniversal30PlatesStandaloneHTML = function () {
    if (_nativeBuildUniversal30PlatesStandaloneHTML && window.useLegacyCardBrandbook !== true) {
      return _nativeBuildUniversal30PlatesStandaloneHTML();
    }
    const b = (typeof window.buildActiveBrandProfileForV80 === "function")
      ? window.buildActiveBrandProfileForV80()
      : (window.canvasState || {});
    return window.generateFullBrandbookDocHtml(b);
  };

  window.renderUniversalImproBearsGuideSinglePlateHTML = function (plateIdx, forPrint) {
    if (_nativeRenderUniversalSinglePlateHTML && window.useLegacyCardBrandbook !== true) {
      return _nativeRenderUniversalSinglePlateHTML(plateIdx, forPrint);
    }
    const idx = Math.max(0, Math.min(29, Number(plateIdx || 0)));
    const b = (typeof window.buildActiveBrandProfileForV80 === "function")
      ? window.buildActiveBrandProfileForV80()
      : (window.canvasState || {});
    const plates = window.generateBrandbook30Plates(b);
    const activePlate = plates[idx] || plates[0];
    if (forPrint) {
      return activePlate;
    }
    setTimeout(() => {
      if (typeof window.scaleImproBearsPlateInStage === "function") {
        window.scaleImproBearsPlateInStage();
      }
    }, 30);
    return `<div class="tbb-improbears-stage-wrapper"><div class="tbb-improbears-stage-scaler">${activePlate}</div></div>`;
  };

  window.TBB_V80_PLATES_GENERATOR = _nativeV80PlatesGenerator || {
    generateBrandbook30Plates: generateBrandbook30Plates,
    getUniversalBrandbookStyles: getDynamicBrandbookStyles,
    getTheBestBrandStyles: getDynamicBrandbookStyles,
    generateFullBrandbookDocHtml: generateFullBrandbookDocHtml,
    renderTheBestBrandPlate: function (idx, forPrint) {
      return window.renderUniversalImproBearsGuideSinglePlateHTML(idx, forPrint);
    }
  };

  
  // --- UI INTERACTIVA DE TERNA DE LOGOTIPOS (STEP 5 & 6) ---
  window.currentTriFoldSuite = null;

  window.refreshTriFoldLogoSuiteUI = function () {
    const brand = (typeof window.buildActiveBrandProfileForV80 === "function")
      ? window.buildActiveBrandProfileForV80()
      : (window.canvasState || {});

    const suite = generateTriFoldLogoSuite(brand);
    window.currentTriFoldSuite = suite;

    const elH = document.getElementById("triFoldPreviewHorizontal");
    if (elH) elH.innerHTML = suite.horizontal;

    const elA = document.getElementById("triFoldPreviewAvatar");
    if (elA) elA.innerHTML = suite.avatar;

    const elS = document.getElementById("triFoldPreviewSeal");
    if (elS) elS.innerHTML = suite.seal;

    console.log("✓ Terna de Logotipos Tri-Fold actualizada en UI para:", brand.name);
  };

  window.downloadTriFoldAsset = async function (type, format) {
    if (typeof window.exportCloudIllustratorAsset === "function") {
      return window.exportCloudIllustratorAsset(type, format || "svg");
    }
    if (!window.currentTriFoldSuite) {
      window.refreshTriFoldLogoSuiteUI();
    }
    const suite = window.currentTriFoldSuite || {};
    const activeBrand = (typeof window.buildActiveBrandProfileForV80 === "function" && window.buildActiveBrandProfileForV80()) || {};
    const slug = activeBrand.slug || ((window.canvasState && window.canvasState.brandName) || "marca").toLowerCase().replace(/[^a-z0-9]+/g, "_") || "marca";

    let svgContent = "";
    let filename = "";

    if (type === "horizontal") {
      svgContent = suite.horizontal || "";
      filename = `Logotipo_Horizontal_Curvas_${slug}.svg`;
    } else if (type === "avatar") {
      svgContent = suite.avatar || "";
      filename = `Avatar_Social_1x1_Curvas_${slug}.svg`;
    } else if (type === "seal") {
      svgContent = suite.seal || "";
      filename = `Sello_Autor_Packaging_Curvas_${slug}.svg`;
    }

    if (!svgContent) {
      alert("No se encontró el activo para descargar.");
      return;
    }

    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  window.copyTriFoldAssetCode = async function (type) {
    if (!window.currentTriFoldSuite) {
      window.refreshTriFoldLogoSuiteUI();
    }
    const suite = window.currentTriFoldSuite || {};
    let svgContent = "";
    if (type === "horizontal") svgContent = suite.horizontal;
    else if (type === "avatar") svgContent = suite.avatar;
    else if (type === "seal") svgContent = suite.seal;

    if (typeof window.convertSvgTextToIllustratorCurves === "function" && svgContent) {
      try {
        svgContent = await window.convertSvgTextToIllustratorCurves(svgContent);
      } catch (e) {
        console.warn("Outliner warning on copy:", e);
      }
    }

    if (navigator.clipboard && svgContent) {
      navigator.clipboard.writeText(svgContent).then(() => {
        alert("¡Código SVG 100% en Curvas (0 etiquetas <text>) copiado al portapapeles!");
      }).catch(() => {
        alert("No se pudo copiar automáticamente. Puedes descargar el archivo SVG en curvas.");
      });
    }
  };

  // --- PERFIL UNIFICADO EN VIVO (SINCRONIZA tbbState + canvasState + step0State + tpExtractedItems) ---
  window.buildActiveBrandProfileForV80 = function () {
    const cs = window.canvasState || {};
    const st = window.tbbState || {};
    const s0 = window.step0State || {};

    const rawName = cs.brandName || s0.brandName || "";
    const bName = (rawName && !/^mi nueva marca$/i.test(rawName)) ? rawName.trim() : "The Best Brand";
    const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "the_best_brand";

    const activeIt = (Array.isArray(st.logoIterations) && st.logoIterations[st.logoIterationIndex - 1]) || null;
    const uploadedUrl = (activeIt && activeIt.uploadedLogoDataUrl) || cs.uploaded_logo_data_url || s0.uploadedLogoDataUrl || "";
    const uploadedSvg = (activeIt && activeIt.uploadedLogoSvgMarkup) || cs.uploaded_logo_svg_markup || s0.uploadedLogoSvgMarkup || "";
    const hasUploadedLogo = Boolean(uploadedUrl || uploadedSvg);
    const hasGeminiCustom = Boolean(activeIt && activeIt.geminiCustomSvg && String(activeIt.geminiCustomSvg).trim().length > 10);

    // Solo consultar catálogo estático si el usuario NO ha subido un logo propio y no hay iteración AI activa
    if (!hasUploadedLogo && !hasGeminiCustom && window.CATALOG_30_MAP) {
      if (window.CATALOG_30_MAP[slug]) return window.CATALOG_30_MAP[slug];
      if (window.CATALOG_30_MAP[bName.toLowerCase()]) return window.CATALOG_30_MAP[bName.toLowerCase()];
    }

    // Prioridad de Colores: 1) Iteración de Logo activa en Paso 5, 2) tbbState.logoPriHex/logoSecHex, 3) canvasState.primary_color, 4) selected_colors_hex
    const priColors = (Array.isArray(cs.selected_colors_hex) && cs.selected_colors_hex.length >= 2)
      ? cs.selected_colors_hex
      : ["#FFFFFF", "#090D16", "#0D2540", "#426EAE"];

    const pri = (activeIt && (activeIt.pri || activeIt.priHex))
      || st.logoPriHex
      || cs.primary_color
      || priColors[2]
      || "#0D2540";

    const sec = (activeIt && (activeIt.sec || activeIt.secHex))
      || st.logoSecHex
      || cs.secondary_color
      || priColors[3]
      || "#426EAE";

    const acc = (activeIt && activeIt.accentHex)
      || cs.accent_color
      || (priColors[0] && priColors[0] !== "#FFFFFF" ? priColors[0] : "#FF7A00");

    const darkInk = priColors[1] || "#090D16";

    // Lectura pura: NO se escribe de vuelta en canvasState. Escribir aquí congelaba cs.primary_color
    // e ignoraba los cambios posteriores de paleta del Paso 4 (selected_colors_hex).

    const mods = (activeIt && activeIt.mods) || {};
    const priFont = (activeIt && activeIt.fontFamily) || mods.fontFamily || st.selectedFontFamily || cs.primary_font || "Montserrat";
    const secFont = cs.secondary_font || "Plus Jakarta Sans";

    // Isotipo vectorial puro calado 180x180 (NUNCA inyectar el lienzo doble 760x440 de vista previa)
    let pureSymbolPos = "";
    let pureSymbolNeg = "";

    if (hasUploadedLogo && !hasGeminiCustom) {
      if (uploadedSvg) {
        let cleanSvg = uploadedSvg.trim();
        if (!cleanSvg.startsWith("<svg") && !cleanSvg.startsWith("<g")) {
          cleanSvg = `<g transform="translate(10,10)">${cleanSvg}</g>`;
        }
        pureSymbolPos = cleanSvg;
        pureSymbolNeg = (typeof toCaladoNegativeSvg === "function") ? toCaladoNegativeSvg(cleanSvg) : cleanSvg;
      } else {
        pureSymbolPos = `<g transform="translate(10,10)"><image href="${uploadedUrl}" xlink:href="${uploadedUrl}" x="10" y="10" width="160" height="160" preserveAspectRatio="xMidYMid meet" /></g>`;
        pureSymbolNeg = `<g transform="translate(10,10)"><image href="${uploadedUrl}" xlink:href="${uploadedUrl}" x="10" y="10" width="160" height="160" preserveAspectRatio="xMidYMid meet" style="filter:brightness(0) invert(1);" /></g>`;
      }
    } else {
      const synthPair = buildSystemicSymbolPair("bb_v81_" + slug, "", "");
      pureSymbolPos = synthPair.pos;
      pureSymbolNeg = synthPair.neg;
      if (!pureSymbolPos) {
        const candidateSvg = cs.selected_symbol_only_svg || "";
        const isPreviewCanvas760 = /viewBox\s*=\s*["']\s*0\s+0\s+760\s+440/i.test(candidateSvg) || candidateSvg.includes("App en proporción 1:1");
        if (candidateSvg && !isPreviewCanvas760) {
          pureSymbolPos = candidateSvg;
          pureSymbolNeg = cs.selected_symbol_only_neg_svg || toCaladoNegativeSvg(candidateSvg);
        } else {
          // Fallback calado: anillo (espacio negativo real) + núcleo, sin disco sólido de parche
          pureSymbolPos = `<path d="M90 20 C128.7 20 160 51.3 160 90 C160 128.7 128.7 160 90 160 C51.3 160 20 128.7 20 90 C20 51.3 51.3 20 90 20 Z M90 46 C65.7 46 46 65.7 46 90 C46 114.3 65.7 134 90 134 C114.3 134 134 114.3 134 90 C134 65.7 114.3 46 90 46 Z" fill-rule="evenodd" fill="${pri}"/><circle cx="90" cy="90" r="22" fill="${acc}"/>`;
          pureSymbolNeg = toCaladoNegativeSvg(pureSymbolPos);
        }
      }
    }

    // Si coincide con una marca del catálogo pero el usuario subió su propio logo, heredar los textos ricos pero inyectar el logo propio
    if (hasUploadedLogo && window.CATALOG_30_MAP && (window.CATALOG_30_MAP[slug] || window.CATALOG_30_MAP[bName.toLowerCase()])) {
      const baseCat = window.CATALOG_30_MAP[slug] || window.CATALOG_30_MAP[bName.toLowerCase()];
      const catObj = Object.assign({}, baseCat);
      catObj.svgCore = pureSymbolPos;
      catObj.svgCoreNeg = pureSymbolNeg;
      catObj.isEstablished = true;
      if (pri) catObj.colors.pri = pri;
      if (sec) catObj.colors.sec = sec;
      return catObj;
    }

    const tpB = (window.tpExtractedItems && Array.isArray(window.tpExtractedItems.before) && window.tpExtractedItems.before.length)
      ? window.tpExtractedItems.before
      : ["Presencia digital clara y accesible", "Atención ágil vía WhatsApp/Web", "Diagnóstico inicial transparente", "Propuesta técnica detallada"];

    const tpD = (window.tpExtractedItems && Array.isArray(window.tpExtractedItems.during) && window.tpExtractedItems.during.length)
      ? window.tpExtractedItems.during
      : ["Bienvenida personalizada y cálida", "Ejecución profesional con estándares suizos", "Acompañamiento en tiempo real", "Entrega puntual y cobro sin sorpresas"];

    const tpA = (window.tpExtractedItems && Array.isArray(window.tpExtractedItems.after) && window.tpExtractedItems.after.length)
      ? window.tpExtractedItems.after
      : ["Entrega de manual y activos vectoriales", "Garantía de servicio y soporte activo", "Comunidad de clientes leales", "Encuesta breve de satisfacción"];

    const giroText = (cs.custom_business_type || s0.customBusinessType || cs.step0_short_essence || "Soluciones estratégicas, ingeniería de valor y experiencia de marca.").trim();

    return {
      name: bName,
      slug: slug,
      tagline: (cs.tagline || s0.tagline || cs.step0_short_essence || giroText || "SISTEMA INTEGRAL DE IDENTIDAD").trim(),
      category: cs.custom_business_type || s0.customBusinessType || "Servicios Especializados",
      giro: giroText,
      buyer: (cs.ideal_customer || cs.step0_buyer_actor || "Clientes y empresas que exigen excelencia técnica y resultados.").trim(),
      why: (cs.golden_circle || "Porque el propósito auténtico conecta con las personas y trasciende.").trim(),
      how: (cs.process_steps_text || "Metodología rigurosa, tecnología de última generación y trato humano.").trim(),
      what: (cs.value_offer || "Identidad oficial de marca, manual de 30 láminas y activos vectoriales.").trim(),
      persona: (cs.brand_persona || "Líder apasionado, confiable, empático y enfocado en resultados.").trim(),
      niza: cs.primary_nice_class || "Clase Oficial de Registro de Marca",
      tpBefore: tpB,
      tpDuring: tpD,
      tpAfter: tpA,
      colors: {
        pri: pri,
        sec: sec,
        acc: acc,
        darkInk: darkInk,
        midGray: "#707070",
        lightGray: "#E6E6E6",
        softBg: "#FAF8F5",
        white: "#FFFFFF",
        pantonePri: hexToPantone(pri, 1),
        pantoneSec: hexToPantone(sec, 2),
        pantoneAcc: hexToPantone(acc, 3),
        cmykPri: hexToCmyk(pri),
        cmykSec: hexToCmyk(sec)
      },
      primaryFont: priFont,
      secondaryFont: secFont,
      isMultibrand: /improbears/i.test(bName),
      svgCore: pureSymbolPos,
      svgCoreNeg: pureSymbolNeg
    };
  };

  // Compatibilidad con scripts y tests V80 (`getTheBestBrand30PlatesHtml`)
  if (window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.getTheBestBrand30PlatesHtml !== "function") {
    window.TBB_V80_PLATES_GENERATOR.getTheBestBrand30PlatesHtml = function (optBrand) {
      const b = optBrand || window.buildActiveBrandProfileForV80();
      return generateBrandbook30Plates(b);
    };
  }

  // --- TURNO SOCRÁTICO DIRECTO CON GEMINI (CON CACHÉ DE IDEMPOTENCIA Y DEDUPLICACIÓN IN-FLIGHT) ---
  const _socraticTurnCache = new Map();
  const _socraticInFlight = new Map();

  async function executeDirectGeminiSocraticTurn(userText, step = 1, subStep = 1, cs = {}) {
    const safeUserText = String(userText || "");
    const bName = (cs && cs.brandName) || "tu marca";
    const giro = (cs && cs.custom_business_type) || "tu negocio";
    const cacheKey = `${step}:${subStep}:${bName}:${safeUserText.trim().toLowerCase()}`;
    if (_socraticTurnCache.has(cacheKey)) {
      return JSON.parse(JSON.stringify(_socraticTurnCache.get(cacheKey)));
    }
    if (_socraticInFlight.has(cacheKey)) {
      const sharedRes = await _socraticInFlight.get(cacheKey);
      return JSON.parse(JSON.stringify(sharedRes));
    }

    const apiKey = window.TBB_GEMINI_KEY || (typeof process !== "undefined" && process.env && process.env.GEMINI_API_KEY) || "";

    const prompt = `Actúa como Aura, mentora ejecutiva de identidad visual de TheBestBrand.
El usuario está respondiendo en el Paso ${step}, Subpaso ${subStep}.
Marca: "${bName}" (Giro: "${giro}").
Texto ingresado por el usuario:
"${safeUserText}"

Genera una respuesta en formato JSON estrictamente válido con los siguientes campos:
{
  "avatar_response": "Tu respuesta empática, socrática y breve (máximo 2 oraciones) felicitando el aporte y haciendo la siguiente pregunta clave.",
  "updated_canvas": {
    "value_offer": "Síntesis clara de la propuesta de valor",
    "golden_circle": "El por qué esencial de la marca",
    "ideal_customer": "Perfil del cliente ideal",
    "brand_persona": "Personalidad de la marca",
    "process_steps_text": "Cómo se entrega el valor"
  },
  "next_sub_step": ${subStep + 1}
}
Solo incluye en "updated_canvas" los campos que se desprendan directamente de lo que dijo el usuario. NO inventes datos que el usuario no mencionó. Devuelve SOLO el JSON sin markdown.`;

    const requestPromise = (async () => {
      try {
        const baseOrigin = window.TBB_API_BASE || (window.location && window.location.origin ? window.location.origin : "");
        if (!apiKey && !baseOrigin) {
          throw new Error("headless_no_origin");
        }
        const url = apiKey
          ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
          : `${baseOrigin}/api/v1/gemini/proxy`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.25 }
          })
        });
        if (res.ok) {
          const respData = await res.json();
          const rawJson = respData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawJson) {
            const parsed = JSON.parse(rawJson);
            _socraticTurnCache.set(cacheKey, parsed);
            return parsed;
          }
        }
      } catch (err) {
        console.warn("Direct Gemini socratic error:", err);
      }

      const fallbackCanvas = {};
      if (step === 1 && subStep === 1) fallbackCanvas.golden_circle = safeUserText.slice(0, 180);
      else if (step === 1 && subStep === 2) fallbackCanvas.process_steps_text = safeUserText.slice(0, 180);
      else if (step === 1 && subStep === 3) fallbackCanvas.value_offer = safeUserText.slice(0, 180);
      else if (step === 1 && subStep === 4) fallbackCanvas.brand_persona = safeUserText.slice(0, 180);
      else if (step === 0) fallbackCanvas.ideal_customer = safeUserText.slice(0, 180);
      else fallbackCanvas.value_offer = safeUserText.slice(0, 180);

      return {
        avatar_response: `Excelente aporte para ${bName}. Sigamos profundizando para que tu Brandbook quede impecable.`,
        updated_canvas: fallbackCanvas,
        next_sub_step: subStep + 1
      };
    })();

    _socraticInFlight.set(cacheKey, requestPromise);
    try {
      const finalOut = await requestPromise;
      return JSON.parse(JSON.stringify(finalOut));
    } finally {
      _socraticInFlight.delete(cacheKey);
    }
  }

  window.executeDirectGeminiSocraticTurn = executeDirectGeminiSocraticTurn;

  console.log("✓ Motor Generativo Editorial TheBestBrand V81.0 cargado con éxito.");
})();
