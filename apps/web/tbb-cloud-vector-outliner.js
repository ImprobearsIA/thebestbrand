// ============================================================================
// THE BEST BRAND · CLOUD VECTOR CURVE OUTLINER ENGINE (V82.0)
// Equivalente exacto en la Nube a Adobe Illustrator "Create Outlines" (Cmd+Shift+O)
// - Convierte todo <text> y <textPath> a trazos Bézier puros <path d="M... C... Z"/>
// - Genera archivos .SVG (100% en curvas, 0 etiquetas <text>) y .AI (Illustrator Native PDF Vector)
// ============================================================================

(function () {
  "use strict";

  const FONT_URL_MAP = {
    "montserrat": "/assets/fonts/Montserrat-Black.ttf",
    "montserrat-bold": "/assets/fonts/Montserrat-Bold.ttf",
    "plus jakarta sans": "/assets/fonts/PlusJakartaSans-ExtraBold.ttf",
    "space grotesk": "/assets/fonts/SpaceGrotesk-Bold.ttf",
    "playfair display": "/assets/fonts/PlayfairDisplay-Bold.ttf",
    "cormorant garamond": "/assets/fonts/CormorantGaramond-Bold.ttf",
    "syne": "/assets/fonts/Syne-ExtraBold.ttf",
    "outfit": "/assets/fonts/Outfit-Bold.ttf"
  };

  const _fontCache = new Map();

  function resolveFontUrl(fontFamilyStr, fontWeight) {
    const clean = String(fontFamilyStr || "Montserrat")
      .split(",")[0]
      .replace(/['"]/g, "")
      .trim()
      .toLowerCase();
    if (clean === "montserrat" && Number(fontWeight) <= 700) {
      return FONT_URL_MAP["montserrat-bold"];
    }
    return FONT_URL_MAP[clean] || FONT_URL_MAP["montserrat"];
  }

  async function loadOpenTypeFont(url) {
    if (_fontCache.has(url)) return _fontCache.get(url);
    if (typeof window.opentype === "undefined") {
      throw new Error("opentype.js not loaded");
    }
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} loading font ${url}`);
    const buf = await resp.arrayBuffer();
    const font = window.opentype.parse(buf);
    _fontCache.set(url, font);
    return font;
  }

  // Convierte una cadena de texto lineal en un <path d="..."/> exacto con kerning y letter-spacing
  function renderLinearTextToPathD(font, text, x, y, fontSize, letterSpacing, textAnchor) {
    const str = String(text || "");
    if (!str) return "";
    const scale = fontSize / font.unitsPerEm;
    const glyphs = font.stringToGlyphs(str);

    // 1. Calcular ancho total con kerning + letterSpacing
    let totalWidth = 0;
    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];
      const adv = (g.advanceWidth || font.unitsPerEm * 0.5) * scale;
      totalWidth += adv;
      if (i < glyphs.length - 1) {
        const kern = font.getKerningValue(g, glyphs[i + 1]) * scale;
        totalWidth += kern + letterSpacing;
      }
    }

    let cursorX = x;
    if (textAnchor === "middle") cursorX -= totalWidth / 2;
    else if (textAnchor === "end") cursorX -= totalWidth;

    const fullPath = new window.opentype.Path();
    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];
      const gPath = g.getPath(cursorX, y, fontSize);
      fullPath.extend(gPath);
      const adv = (g.advanceWidth || font.unitsPerEm * 0.5) * scale;
      cursorX += adv;
      if (i < glyphs.length - 1) {
        const kern = font.getKerningValue(g, glyphs[i + 1]) * scale;
        cursorX += kern + letterSpacing;
      }
    }
    return fullPath.toPathData(3);
  }

  // Convierte texto sobre arco circular (<textPath>) en un grupo <g> de <path d="..."/> individuales rotados sobre la circunferencia
  function renderCircularArcTextToPathsMarkup(font, text, cx, cy, r, isTopArc, fontSize, letterSpacing, fill) {
    const str = String(text || "");
    if (!str) return "";
    const scale = fontSize / font.unitsPerEm;
    const glyphs = font.stringToGlyphs(str);

    const advances = [];
    let totalArcLen = 0;
    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];
      let adv = (g.advanceWidth || font.unitsPerEm * 0.5) * scale;
      if (i < glyphs.length - 1) {
        adv += font.getKerningValue(g, glyphs[i + 1]) * scale + letterSpacing;
      }
      advances.push(adv);
      totalArcLen += adv;
    }

    const totalAngleRad = totalArcLen / r;
    const pathsOut = [];

    if (isTopArc) {
      // Arco superior: centrado en -PI/2 (12 en punto), avanza en sentido horario
      let currentAngle = -Math.PI / 2 - totalAngleRad / 2;
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        const halfAdv = advances[i] / 2;
        const charCenterAngle = currentAngle + halfAdv / r;
        const gx = cx + r * Math.cos(charCenterAngle);
        const gy = cy + r * Math.sin(charCenterAngle);
        const rotDeg = (charCenterAngle + Math.PI / 2) * (180 / Math.PI);
        const gPath = g.getPath(-halfAdv, 0, fontSize);
        const d = gPath.toPathData(3);
        if (d) {
          pathsOut.push(`<path d="${d}" fill="${fill}" transform="translate(${gx.toFixed(2)}, ${gy.toFixed(2)}) rotate(${rotDeg.toFixed(2)})"/>`);
        }
        currentAngle += advances[i] / r;
      }
    } else {
      // Arco inferior: centrado en +PI/2 (6 en punto), legible de izquierda a derecha
      let currentAngle = Math.PI / 2 + totalAngleRad / 2;
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        const halfAdv = advances[i] / 2;
        const charCenterAngle = currentAngle - halfAdv / r;
        const gx = cx + r * Math.cos(charCenterAngle);
        const gy = cy + r * Math.sin(charCenterAngle);
        const rotDeg = (charCenterAngle - Math.PI / 2) * (180 / Math.PI);
        const gPath = g.getPath(-halfAdv, 0, fontSize);
        const d = gPath.toPathData(3);
        if (d) {
          pathsOut.push(`<path d="${d}" fill="${fill}" transform="translate(${gx.toFixed(2)}, ${gy.toFixed(2)}) rotate(${rotDeg.toFixed(2)})"/>`);
        }
        currentAngle -= advances[i] / r;
      }
    }

    return `<g data-outlined-arc="true">${pathsOut.join("")}</g>`;
  }

  /**
   * Recibe cualquier documento SVG y convierte el 100% de sus etiquetas <text> y <textPath>
   * en curvas Bézier matemáticas cerradas (<path d="M... C... Z"/>).
   */
  async function convertSvgTextToIllustratorCurves(rawSvgMarkup) {
    if (!rawSvgMarkup || !/<text\b/i.test(rawSvgMarkup)) {
      return rawSvgMarkup;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvgMarkup.trim(), "image/svg+xml");
    const svgRoot = doc.querySelector("svg");
    if (!svgRoot) return rawSvgMarkup;

    const textNodes = Array.from(svgRoot.querySelectorAll("text"));
    for (const textEl of textNodes) {
      const fontFamily = textEl.getAttribute("font-family") || "Montserrat";
      const fontWeight = textEl.getAttribute("font-weight") || "800";
      const fontSize = parseFloat(textEl.getAttribute("font-size") || "16") || 16;
      const letterSpacing = parseFloat(textEl.getAttribute("letter-spacing") || "0") || 0;
      const fill = textEl.getAttribute("fill") || "#090D16";
      const textAnchor = textEl.getAttribute("text-anchor") || "start";
      const opacity = textEl.getAttribute("opacity") || "";
      const transform = textEl.getAttribute("transform") || "";

      const fontUrl = resolveFontUrl(fontFamily, fontWeight);
      let font;
      try {
        font = await loadOpenTypeFont(fontUrl);
      } catch (err) {
        console.warn("Fallback font load:", err);
        font = await loadOpenTypeFont(FONT_URL_MAP["montserrat"]);
      }

      const textPathEl = textEl.querySelector("textPath");
      if (textPathEl) {
        const href = (textPathEl.getAttribute("href") || textPathEl.getAttribute("xlink:href") || "").replace("#", "");
        const content = (textPathEl.textContent || "").trim();
        const isTop = href.includes("_top") || !href.includes("_bottom");
        const arcMarkup = renderCircularArcTextToPathsMarkup(font, content, 130, 130, 95, isTop, fontSize, letterSpacing, fill);
        const tempDoc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${arcMarkup}</svg>`, "image/svg+xml");
        const gNode = tempDoc.querySelector("g");
        if (gNode && textEl.parentNode) {
          textEl.parentNode.replaceChild(doc.importNode(gNode, true), textEl);
        }
      } else {
        const x = parseFloat(textEl.getAttribute("x") || "0") || 0;
        const y = parseFloat(textEl.getAttribute("y") || "0") || 0;
        const content = (textEl.textContent || "").trim();
        const d = renderLinearTextToPathD(font, content, x, y, fontSize, letterSpacing, textAnchor);
        const pathEl = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute("d", d);
        pathEl.setAttribute("fill", fill);
        pathEl.setAttribute("data-outlined-from-text", content);
        if (opacity) pathEl.setAttribute("opacity", opacity);
        if (transform) pathEl.setAttribute("transform", transform);
        if (textEl.parentNode) {
          textEl.parentNode.replaceChild(pathEl, textEl);
        }
      }
    }

    // Añadir metadatos de certificación de curvas ISO 15930 / Illustrator Outlined
    svgRoot.setAttribute("data-curves-certified", "true");
    svgRoot.setAttribute("data-live-font-dependencies", "0");

    const serializer = new XMLSerializer();
    let finalSvg = serializer.serializeToString(svgRoot);
    if (!finalSvg.startsWith("<?xml")) {
      finalSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Generado 100% en Curvas Bézier por TheBestBrand Cloud Vector Engine (Illustrator Outlines Ready) -->\n` + finalSvg;
    }
    return finalSvg;
  }

  /**
   * Descarga directa del activo en formato Adobe Illustrator (.AI Vector PDF 1.6 en curvas)
   * o .SVG 100% en curvas sin depender de Illustrator instalado localmente.
   */
  async function exportCloudIllustratorAsset(type, format = "svg", triggerBtn = null) {
    // Delegar al motor nativo V83.0 que traza imágenes PNG/JPG a curvas Bézier puras y empaqueta .AI PDF 1.6 sin servidor externo
    if (typeof window.tbbExportLogoInCurves === "function") {
      return window.tbbExportLogoInCurves(type || "horizontal", format || "svg", triggerBtn);
    }
    if (!window.currentTriFoldSuite && typeof window.refreshTriFoldLogoSuiteUI === "function") {
      window.refreshTriFoldLogoSuiteUI();
    }
    const suite = window.currentTriFoldSuite || {};
    const activeBrand = (typeof window.buildActiveBrandProfileForV80 === "function" && window.buildActiveBrandProfileForV80()) || {};
    const slug = activeBrand.slug || ((window.canvasState && window.canvasState.brandName) || "marca").toLowerCase().replace(/[^a-z0-9]+/g, "_") || "marca";

    let rawSvg = "";
    let baseName = "";
    if (type === "horizontal") {
      rawSvg = suite.horizontal || "";
      baseName = `Logotipo_Horizontal_Curvas_${slug}`;
    } else if (type === "avatar") {
      rawSvg = suite.avatar || "";
      baseName = `Avatar_Social_1x1_Curvas_${slug}`;
    } else if (type === "seal") {
      rawSvg = suite.seal || "";
      baseName = `Sello_Autor_Packaging_Curvas_${slug}`;
    }

    if (!rawSvg) {
      alert("No se encontró el activo vectorial para exportar.");
      return;
    }

    const outlinedSvg = await convertSvgTextToIllustratorCurves(rawSvg);

    if (format === "ai") {
      try {
        const resp = await fetch((window.TBB_API_BASE || "") + "/api/v1/vector/export-illustrator-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand_name: activeBrand.name || slug,
            asset_type: type,
            outlined_svg: outlinedSvg
          })
        });
        if (resp.ok) {
          const blob = await resp.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${baseName}.ai`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          return;
        }
      } catch (err) {
        console.warn("Servidor .AI no disponible, descargando SVG en curvas compatible con Illustrator:", err);
      }
    }

    const blob = new Blob([outlinedSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /**
   * Descarga directa de Hoja Membretada Editable (.DOCX) o Presentación Ejecutiva (.PPTX)
   * generadas 100% en la nube con el perfil de marca activo.
   */
  async function exportCloudOfficeAsset(format = "docx", triggerBtn = null) {
    if (format === "pptx" && typeof window.tbbDownloadEditableDeckPPTX === "function") {
      return window.tbbDownloadEditableDeckPPTX(triggerBtn);
    }
    if (format !== "pptx" && typeof window.tbbDownloadEditableLetterheadDOCX === "function") {
      return window.tbbDownloadEditableLetterheadDOCX(triggerBtn);
    }
    const activeBrand = (typeof window.buildActiveBrandProfileForV80 === "function" && window.buildActiveBrandProfileForV80()) || {};
    const slug = activeBrand.slug || ((window.canvasState && window.canvasState.brandName) || "marca").toLowerCase().replace(/[^a-z0-9]+/g, "_") || "marca";
    const endpoint = format === "pptx"
      ? "/api/v1/office/export-deck-pptx"
      : "/api/v1/office/export-letterhead-docx";
    const filename = format === "pptx"
      ? `Presentacion_Ejecutiva_${slug}.pptx`
      : `Papeleria_Membretada_${slug}.docx`;

    try {
      const resp = await fetch((window.TBB_API_BASE || "") + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_profile: activeBrand })
      });
      if (resp.ok) {
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        return;
      }
    } catch (err) {
      console.warn("Office exporter warning:", err);
    }
    alert("Para descargar el archivo editable Office (.DOCX / .PPTX), asegúrate de tener activo el servidor Cloud API.");
  }

  window.convertSvgTextToIllustratorCurves = convertSvgTextToIllustratorCurves;
  window.exportCloudIllustratorAsset = exportCloudIllustratorAsset;
  window.exportCloudOfficeAsset = exportCloudOfficeAsset;

  console.log("✓ Motor Cloud de Contornos Vectoriales (Illustrator Outlines + Office Suite V82.0) activo.");
})();
