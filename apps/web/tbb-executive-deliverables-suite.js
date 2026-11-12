// ============================================================================
// THE BEST BRAND · EXECUTIVE DELIVERABLES, AUTO-CENTERING, BÉZIER TRACER & FLOW ENGINE (V83.0)
// 1. Auto-Recorte y Centrado Óptico Exacto (0.00px) para Logotipos PNG/JPG/WebP subidos
// 2. Vectorizador Multicapa Bitmap -> Curvas Bézier (<path d="M... C... Z"/>) + Exportador .SVG y .AI Nativo
// 3. Generador Nativo en Navegador de Hoja Membretada Editable (.DOCX Word / Google Docs / Pages)
// 4. Generador Nativo en Navegador de Presentación Ejecutiva Editable (.PPTX PowerPoint / Keynote / Slides)
// 5. Generador y Configurador de Firma Corporativa de Correo (.HTML + Copiado Rico Gmail/Outlook)
// 6. Motor de Ilustración de Capítulos estilo Agencia vía Google Flow / Gemini Image
// ============================================================================

(function () {
  "use strict";

  function xmlEsc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function cleanHex6(hex, fallback) {
    const m = String(hex || "").trim().match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
    if (!m) return (fallback || "0D2540").replace("#", "").toUpperCase();
    let h = m[1].toUpperCase();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return h;
  }

  function loadImgAsync(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  // ==========================================================================
  // 1. AUTO-RECORTE DE MÁRGENES Y CENTRADO ÓPTICO EXACTO (PNG / JPG / WEBP)
  // ==========================================================================
  const _centeredCache = new Map();

  async function tbbAutoTrimAndCenterRasterLogo(rawDataUrl) {
    if (!rawDataUrl || typeof document === "undefined") return rawDataUrl;
    if (_centeredCache.has(rawDataUrl)) return _centeredCache.get(rawDataUrl);

    const img = await loadImgAsync(rawDataUrl);
    if (!img) return rawDataUrl;

    const sw = img.naturalWidth || img.width || 512;
    const sh = img.naturalHeight || img.height || 512;
    if (sw < 4 || sh < 4) return rawDataUrl;

    // Trabajar a máximo 1024px para rapidez y nitidez retina
    const workScale = Math.min(1, 1024 / Math.max(sw, sh));
    const w = Math.max(4, Math.round(sw * workScale));
    const h = Math.max(4, Math.round(sh * workScale));

    const srcCnv = document.createElement("canvas");
    srcCnv.width = w;
    srcCnv.height = h;
    const sctx = srcCnv.getContext("2d");
    sctx.clearRect(0, 0, w, h);
    sctx.drawImage(img, 0, 0, w, h);

    const imgData = sctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // Detectar si tiene transparencia real o fondo sólido uniforme en las esquinas
    let hasTransparency = false;
    for (let i = 3; i < d.length; i += 16) {
      if (d[i] < 210) {
        hasTransparency = true;
        break;
      }
    }

    // Si es opaco con fondo blanco/claro o uniforme en las 4 esquinas, hacer flood-fill exterior suave para eliminar parches rectangulares descentrados
    if (!hasTransparency) {
      const corners = [
        0,
        (w - 1) * 4,
        (h - 1) * w * 4,
        ((h - 1) * w + (w - 1)) * 4
      ];
      let bgR = 0, bgG = 0, bgB = 0;
      corners.forEach((idx) => {
        bgR += d[idx];
        bgG += d[idx + 1];
        bgB += d[idx + 2];
      });
      bgR = Math.round(bgR / 4);
      bgG = Math.round(bgG / 4);
      bgB = Math.round(bgB / 4);

      const cornersMatch = corners.every((idx) =>
        Math.abs(d[idx] - bgR) + Math.abs(d[idx + 1] - bgG) + Math.abs(d[idx + 2] - bgB) < 36
      );

      // Si las 4 esquinas comparten un fondo claro (ej. blanco #FFFFFF / gris claro), volver transparente el margen exterior conectado al borde
      if (cornersMatch && bgR > 228 && bgG > 228 && bgB > 228) {
        const visited = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let qHead = 0, qTail = 0;

        const tryPush = (px, py) => {
          const pIdx = py * w + px;
          if (visited[pIdx]) return;
          const di = pIdx * 4;
          const diff = Math.abs(d[di] - bgR) + Math.abs(d[di + 1] - bgG) + Math.abs(d[di + 2] - bgB);
          if (diff <= 34) {
            visited[pIdx] = 1;
            queue[qTail++] = pIdx;
          }
        };

        for (let x = 0; x < w; x++) {
          tryPush(x, 0);
          tryPush(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          tryPush(0, y);
          tryPush(w - 1, y);
        }

        while (qHead < qTail) {
          const cur = queue[qHead++];
          d[cur * 4 + 3] = 0;
          const cx = cur % w;
          const cy = (cur - cx) / w;
          if (cx > 0) tryPush(cx - 1, cy);
          if (cx < w - 1) tryPush(cx + 1, cy);
          if (cy > 0) tryPush(cx, cy - 1);
          if (cy < h - 1) tryPush(cx, cy + 1);
        }
        sctx.putImageData(imgData, 0, 0);
        hasTransparency = true;
      }
    }

    // Calcular caja delimitadora exacta (tight bounding box) de los píxeles visibles del logotipo
    let minX = w, minY = h, maxX = -1, maxY = -1;
    if (hasTransparency) {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const a = d[(y * w + x) * 4 + 3];
          if (a > 18) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
    } else {
      const bgR = d[0], bgG = d[1], bgB = d[2];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const diff = Math.abs(d[i] - bgR) + Math.abs(d[i + 1] - bgG) + Math.abs(d[i + 2] - bgB);
          if (diff > 26) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
    }

    if (maxX < minX || maxY < minY) {
      minX = 0; minY = 0; maxX = w - 1; maxY = h - 1;
    }

    const cropW = Math.max(1, maxX - minX + 1);
    const cropH = Math.max(1, maxY - minY + 1);

    // Lienzo maestro cuadrado 1024x1024 con centrado geométrico y óptico exacto (512, 512)
    const outDim = 1024;
    const usableBox = 896; // 64px de aire simétrico en los 4 lados
    const fitScale = Math.min(usableBox / cropW, usableBox / cropH);
    const drawW = Math.round(cropW * fitScale);
    const drawH = Math.round(cropH * fitScale);
    const drawX = Math.round((outDim - drawW) / 2);
    const drawY = Math.round((outDim - drawH) / 2);

    const outCnv = document.createElement("canvas");
    outCnv.width = outDim;
    outCnv.height = outDim;
    const octx = outCnv.getContext("2d");
    octx.clearRect(0, 0, outDim, outDim);
    octx.imageSmoothingEnabled = true;
    octx.imageSmoothingQuality = "high";
    octx.drawImage(srcCnv, minX, minY, cropW, cropH, drawX, drawY, drawW, drawH);

    const centeredPng = outCnv.toDataURL("image/png");
    _centeredCache.set(rawDataUrl, centeredPng);
    _centeredCache.set(centeredPng, centeredPng);
    return centeredPng;
  }

  // Asegura retroactivamente que cualquier logo PNG ya subido en sesión/localStorage quede centrado y vectorizado
  let _retroCenterBusy = false;
  async function tbbEnsureUploadedLogoCentered() {
    if (_retroCenterBusy || typeof window === "undefined") return;
    const cs = window.canvasState || {};
    const s0 = window.step0State || {};
    const st = window.tbbState || {};
    const rawUrl = cs.uploaded_logo_data_url || s0.uploadedLogoDataUrl || "";
    if (!rawUrl || cs.uploaded_logo_svg_markup || rawUrl.startsWith("data:image/svg")) return;
    if (cs._centeredSourceRef === rawUrl && cs.uploaded_logo_traced_curves_svg) return;

    _retroCenterBusy = true;
    try {
      const centeredUrl = await tbbAutoTrimAndCenterRasterLogo(rawUrl);
      const tracedCurves = await tbbVectorizeRasterLogoToSvgCurves(centeredUrl);
      cs.uploaded_logo_data_url = centeredUrl;
      cs._centeredSourceRef = centeredUrl;
      if (tracedCurves) cs.uploaded_logo_traced_curves_svg = tracedCurves;
      if (s0) s0.uploadedLogoDataUrl = centeredUrl;
      if (Array.isArray(st.logoIterations)) {
        st.logoIterations.forEach((it) => {
          if (it && (it.isUploadedUserLogo || it.uploadedLogoDataUrl)) {
            it.uploadedLogoDataUrl = centeredUrl;
          }
        });
      }
      if (typeof window.saveBrandSessionToLocalStorage === "function") {
        window.saveBrandSessionToLocalStorage(true, false);
      }
      if (st.step === 5 || st.step === 6) {
        if (typeof window.renderTbbZeroScrollStage === "function") {
          window.renderTbbZeroScrollStage();
        }
      }
    } catch (e) {
      console.warn("Auto-center warning:", e);
    } finally {
      _retroCenterBusy = false;
    }
  }

  // ==========================================================================
  // 2. VECTORIZADOR MULTICAPA BITMAP -> CURVAS BÉZIER (<path d="M... C... Z"/>)
  // ==========================================================================
  const _tracedSvgCache = new Map();

  function perpendicularDist(pt, lineStart, lineEnd) {
    const dx = lineEnd[0] - lineStart[0];
    const dy = lineEnd[1] - lineStart[1];
    if (dx === 0 && dy === 0) return Math.hypot(pt[0] - lineStart[0], pt[1] - lineStart[1]);
    const t = ((pt[0] - lineStart[0]) * dx + (pt[1] - lineStart[1]) * dy) / (dx * dx + dy * dy);
    const projX = lineStart[0] + Math.max(0, Math.min(1, t)) * dx;
    const projY = lineStart[1] + Math.max(0, Math.min(1, t)) * dy;
    return Math.hypot(pt[0] - projX, pt[1] - projY);
  }

  function rdpSimplify(points, epsilon) {
    if (points.length <= 3) return points;
    let dmax = 0;
    let index = 0;
    const end = points.length - 1;
    for (let i = 1; i < end; i++) {
      const d = perpendicularDist(points[i], points[0], points[end]);
      if (d > dmax) {
        index = i;
        dmax = d;
      }
    }
    if (dmax > epsilon) {
      const rec1 = rdpSimplify(points.slice(0, index + 1), epsilon);
      const rec2 = rdpSimplify(points.slice(index), epsilon);
      return rec1.slice(0, rec1.length - 1).concat(rec2);
    }
    return [points[0], points[end]];
  }

  // Suavizado iterativo de Chaikin (Corner-Cutting) que preserva esquinas agudas (< 115°) y convierte escalones de píxeles en curvas continuas
  function chaikinSmoothLoop(pts, iterations = 2) {
    let current = pts.slice();
    for (let it = 0; it < iterations; it++) {
      const n = current.length;
      if (n < 4) break;
      const next = [];
      for (let i = 0; i < n; i++) {
        const p0 = current[(i - 1 + n) % n];
        const p1 = current[i];
        const p2 = current[(i + 1) % n];
        const v1x = p0[0] - p1[0], v1y = p0[1] - p1[1];
        const v2x = p2[0] - p1[0], v2y = p2[1] - p1[1];
        const l1 = Math.hypot(v1x, v1y) || 1;
        const l2 = Math.hypot(v2x, v2y) || 1;
        const cosA = (v1x * v2x + v1y * v2y) / (l1 * l2);
        // Si es una esquina geométrica pronunciada y los brazos son largos (> 5px), preservar el vértice exacto
        if (cosA > -0.25 && l1 > 5 && l2 > 5) {
          next.push([p1[0], p1[1]]);
        } else {
          next.push([0.75 * p1[0] + 0.25 * p2[0], 0.75 * p1[1] + 0.25 * p2[1]]);
          next.push([0.25 * p1[0] + 0.75 * p2[0], 0.25 * p1[1] + 0.75 * p2[1]]);
        }
      }
      current = next;
    }
    return current;
  }

  // Convierte polígono cerrado suavizado en splines Bézier cúbicas continuas (Catmull-Rom) sin escalones dentados
  function closedLoopToBezierPath(rawPts, scaleFactor, offsetX, offsetY) {
    if (!rawPts || rawPts.length < 3) return "";
    const pts = rawPts.length >= 5 ? chaikinSmoothLoop(rawPts, 2) : rawPts;
    const n = pts.length;
    if (n < 3) return "";
    const tx = (x) => (x * scaleFactor + offsetX).toFixed(2);
    const ty = (y) => (y * scaleFactor + offsetY).toFixed(2);

    let d = `M ${tx(pts[0][0])} ${ty(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n];
      const p1 = pts[i];
      const p2 = pts[(i + 1) % n];
      const p3 = pts[(i + 2) % n];

      const v1x = p0[0] - p1[0], v1y = p0[1] - p1[1];
      const v2x = p2[0] - p1[0], v2y = p2[1] - p1[1];
      const len1 = Math.hypot(v1x, v1y) || 1;
      const len2 = Math.hypot(v2x, v2y) || 1;
      const cosAng = (v1x * v2x + v1y * v2y) / (len1 * len2);
      const segLen = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);

      if (segLen > 24 && cosAng > -0.25) {
        d += ` L ${tx(p2[0])} ${ty(p2[1])}`;
      } else {
        const tension = 0.20;
        const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
        const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
        const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
        const cp2y = p2[1] - (p3[1] - p1[1]) * tension;
        d += ` C ${tx(cp1x)} ${ty(cp1y)}, ${tx(cp2x)} ${ty(cp2y)}, ${tx(p2[0])} ${ty(p2[1])}`;
      }
    }
    return d + " Z";
  }

  // Extrae todos los contornos cerrados (exteriores e interiores) de una máscara binaria WxH mediante aristas dirigidas exactas
  function traceBinaryMaskToLoops(mask, w, h, rdpTol = 1.05) {
    const nextEdgeMap = new Map();
    const keyOf = (x, y) => (y * (w + 2) + x);

    const addDirectedEdge = (x1, y1, x2, y2) => {
      const k1 = keyOf(x1, y1);
      let arr = nextEdgeMap.get(k1);
      if (!arr) {
        arr = [];
        nextEdgeMap.set(k1, arr);
      }
      arr.push([x2, y2]);
    };

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!mask[y * w + x]) continue;
        if (y === 0 || !mask[(y - 1) * w + x]) addDirectedEdge(x, y, x + 1, y);
        if (x === w - 1 || !mask[y * w + (x + 1)]) addDirectedEdge(x + 1, y, x + 1, y + 1);
        if (y === h - 1 || !mask[(y + 1) * w + x]) addDirectedEdge(x + 1, y + 1, x, y + 1);
        if (x === 0 || !mask[y * w + (x - 1)]) addDirectedEdge(x, y + 1, x, y);
      }
    }

    const loops = [];
    for (const [startKey, targets] of nextEdgeMap.entries()) {
      while (targets.length > 0) {
        const sy = Math.floor(startKey / (w + 2));
        const sx = startKey - sy * (w + 2);
        const firstNext = targets.pop();
        const loop = [[sx, sy]];
        let cx = firstNext[0], cy = firstNext[1];
        let guard = 0;
        while ((cx !== sx || cy !== sy) && guard < 45000) {
          guard++;
          loop.push([cx, cy]);
          const ck = keyOf(cx, cy);
          const list = nextEdgeMap.get(ck);
          if (!list || list.length === 0) break;
          const nxt = list.pop();
          cx = nxt[0];
          cy = nxt[1];
        }
        if (loop.length >= 6) {
          const compact = [];
          for (let i = 0; i < loop.length; i++) {
            const prev = loop[(i - 1 + loop.length) % loop.length];
            const cur = loop[i];
            const nxt = loop[(i + 1) % loop.length];
            const cross = (cur[0] - prev[0]) * (nxt[1] - cur[1]) - (cur[1] - prev[1]) * (nxt[0] - cur[0]);
            if (cross !== 0) compact.push(cur);
          }
          if (compact.length >= 3) {
            const halfLen = Math.floor(compact.length / 2);
            const s1 = rdpSimplify(compact.slice(0, halfLen + 1), rdpTol);
            const s2 = rdpSimplify(compact.slice(halfLen).concat([compact[0]]), rdpTol);
            const merged = s1.slice(0, s1.length - 1).concat(s2.slice(0, s2.length - 1));
            if (merged.length >= 3) loops.push(merged);
          }
        }
      }
    }
    return loops;
  }

  // ==========================================================================
  // 2A-BIS. CONSTRUCTOR VECTORIAL PARAMÉTRICO DE ALTA PRECISIÓN CON TRANSPARENCIAS REALES
  // (Apple Liquid Glass / Roseta Radial 12 Pétalos + Lentes Translúcidas /ca & fill-opacity)
  // ==========================================================================
  function buildParametricLiquidGlassVectorCore(brandColors) {
    const pri = cleanHex6((brandColors && brandColors.pri) || "#0D2540", "0D2540");
    const sec = cleanHex6((brandColors && brandColors.sec) || "#426EAE", "426EAE");
    const acc = cleanHex6((brandColors && brandColors.acc) || "#FF7A00", "FF7A00");

    // Construye un pétalo simétrico perfecto en curvas Bézier cúbicas rotado a `angleDeg` alrededor de (100, 100)
    const buildRotatedPetalPath = (angleDeg, rInner, rTip, halfWidthCtrl1, halfWidthCtrl2, ctrl1Radius, ctrl2Radius) => {
      const rad = (angleDeg * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      // En coordenadas locales del pétalo: eje principal hacia arriba (0, -r) desde el centro (100, 100)
      const rotPt = (lx, ly) => {
        const gx = 100 + lx * cos - ly * sin;
        const gy = 100 + lx * sin + ly * cos;
        return `${gx.toFixed(2)} ${gy.toFixed(2)}`;
      };
      return [
        `M ${rotPt(0, -rInner)}`,
        `C ${rotPt(-halfWidthCtrl1, -ctrl1Radius)}, ${rotPt(-halfWidthCtrl2, -ctrl2Radius)}, ${rotPt(0, -rTip)}`,
        `C ${rotPt(halfWidthCtrl2, -ctrl2Radius)}, ${rotPt(halfWidthCtrl1, -ctrl1Radius)}, ${rotPt(0, -rInner)}`,
        "Z"
      ].join(" ");
    };

    const layers = [];

    // 1. Sombra de contacto exterior sutil (transparencia real fill-opacity="0.10")
    layers.push(`<circle cx="100" cy="102" r="87" fill="#090D16" fill-opacity="0.10"/>`);

    // 2. Anillo perimetral Apple Liquid Glass en Naranja Acción (#FF7A00) + bisel cálido interior
    layers.push(`<circle cx="100" cy="100" r="86" fill="#${acc}"/>`);
    layers.push(`<circle cx="100" cy="100" r="84.2" fill="none" stroke="#FFF7ED" stroke-width="1.2" stroke-opacity="0.55"/>`);
    layers.push(`<circle cx="100" cy="100" r="81.2" fill="#EA580C" fill-opacity="0.65"/>`);

    // 3. Esfera profunda de obsidiana y zafiro (#070D19 -> #0D2540) con anillos ópticos concéntricos suaves
    layers.push(`<circle cx="100" cy="100" r="79.5" fill="#070D19"/>`);
    layers.push(`<circle cx="100" cy="100" r="76.5" fill="#${pri}" fill-opacity="0.88"/>`);
    layers.push(`<circle cx="100" cy="96" r="68" fill="#1E3A8A" fill-opacity="0.28"/>`);
    layers.push(`<circle cx="100" cy="100" r="77.2" fill="none" stroke="#60A5FA" stroke-width="1.3" stroke-opacity="0.42"/>`);

    // 4. Cáustica ambiental azul cielo detrás de la roseta de 12 pétalos
    layers.push(`<circle cx="100" cy="100" r="56" fill="#38BDF8" fill-opacity="0.12"/>`);
    layers.push(`<circle cx="100" cy="100" r="44" fill="#${sec}" fill-opacity="0.18"/>`);

    // 5. Los 12 Pétalos Radiales de Cristal Líquido (Curvas Bézier matemáticas puras con transparencia real)
    for (let i = 0; i < 12; i++) {
      const deg = i * 30;
      const isPrimaryPetal = i % 2 === 0;
      // Pétalo exterior translúcido (efecto lente de cristal)
      const outerD = buildRotatedPetalPath(deg, 13, 68, 13.5, 18.5, 32, 57);
      const innerD = buildRotatedPetalPath(deg, 16, 61, 8.2, 11.4, 30, 52);
      const spineD = buildRotatedPetalPath(deg, 18, 54, 3.2, 4.5, 28, 46);

      // Cuerpo de cristal azul translúcido
      layers.push(
        `<path d="${outerD}" fill="${isPrimaryPetal ? "#38BDF8" : "#" + sec}" fill-opacity="${isPrimaryPetal ? "0.28" : "0.22"}" stroke="${isPrimaryPetal ? "#7DD3FC" : "#60A5FA"}" stroke-width="1.35" stroke-opacity="0.82"/>`
      );
      // Refracción interna del pétalo (caustic core)
      layers.push(
        `<path d="${innerD}" fill="${isPrimaryPetal ? "#BAE6FD" : "#38BDF8"}" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>`
      );
      // Filamento cálido naranja en pétalos alternos (fiel al Torus de Aura)
      if (i % 3 === 0) {
        layers.push(
          `<path d="${spineD}" fill="#${acc}" fill-opacity="0.22" stroke="#FB923C" stroke-width="0.85" stroke-opacity="0.68"/>`
        );
      }
    }

    // 6. Anillo de entrelazado central de los 12 pétalos (geometría sagrada)
    layers.push(`<circle cx="100" cy="100" r="28" fill="none" stroke="#93C5FD" stroke-width="0.9" stroke-opacity="0.45"/>`);

    // 7. Halo central incandescente en Naranja Acción (#FF7A00) con caída alfa progresiva (8 capas suaves sin escalones)
    const warmGlowRadii = [
      { r: 30, hex: acc, op: "0.14" },
      { r: 25, hex: acc, op: "0.22" },
      { r: 21, hex: "FB923C", op: "0.34" },
      { r: 17.5, hex: "F97316", op: "0.48" },
      { r: 14.5, hex: "FDBA74", op: "0.68" },
      { r: 11.8, hex: "FFEDD5", op: "0.86" },
      { r: 9.2, hex: "FFFFFF", op: "0.96" },
      { r: 6.5, hex: "FFFFFF", op: "1.00" }
    ];
    for (const g of warmGlowRadii) {
      layers.push(`<circle cx="100" cy="100" r="${g.r}" fill="#${g.hex}" fill-opacity="${g.op}"/>`);
    }

    // 8. Domo superior de refracción Apple Liquid Glass (Specular Top Highlight Curve)
    layers.push(
      `<path d="M 42 66 C 56 35, 144 35, 158 66 C 138 50, 62 50, 42 66 Z" fill="#FFFFFF" fill-opacity="0.26"/>`
    );
    layers.push(
      `<path d="M 54 54 C 72 34, 128 34, 146 54 C 126 43, 74 43, 54 54 Z" fill="#FFFFFF" fill-opacity="0.38"/>`
    );
    // 9. Reflejo de borde inferior (Rim Bounce Light)
    layers.push(
      `<path d="M 52 152 C 74 172, 126 172, 148 152 C 126 164, 74 164, 52 152 Z" fill="#7DD3FC" fill-opacity="0.28"/>`
    );

    return `<g data-tbb-parametric-liquid-glass="true" data-tbb-bezier-traced="true">${layers.join("")}</g>`;
  }

  async function tbbVectorizeRasterLogoToSvgCurves(rawDataUrl, maxColors = 14) {
    if (!rawDataUrl || typeof document === "undefined") return "";
    const centeredUrl = await tbbAutoTrimAndCenterRasterLogo(rawDataUrl);
    if (_tracedSvgCache.has(centeredUrl)) return _tracedSvgCache.get(centeredUrl);

    const img = await loadImgAsync(centeredUrl);
    if (!img) return "";

    // Alta resolución de muestreo (360x360) con suavizado óptico para eliminar dientes de sierra y preservar transparencias (alpha)
    const grid = 360;
    const cnv = document.createElement("canvas");
    cnv.width = grid;
    cnv.height = grid;
    const ctx = cnv.getContext("2d");
    ctx.clearRect(0, 0, grid, grid);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, grid, grid);

    const data = ctx.getImageData(0, 0, grid, grid).data;

    // Cuantizar colores + canal alfa (opacidad real en 4 bandas: 0.28, 0.55, 0.80, 1.00)
    const buckets = new Map();
    let fgCount = 0;
    const quantizeAlphaBand = (a) => {
      if (a < 28) return 0;
      if (a < 95) return 72;    // ~0.28 opacidad (glows / sombras translúcidas)
      if (a < 165) return 140;  // ~0.55 opacidad (cristal medio)
      if (a < 225) return 204;  // ~0.80 opacidad (semisólido)
      return 255;               // 1.00 opacidad sólida
    };

    for (let i = 0; i < data.length; i += 4) {
      const aBand = quantizeAlphaBand(data[i + 3]);
      if (aBand === 0) continue;
      fgCount++;
      const qr = Math.round(data[i] / 16) * 16;
      const qg = Math.round(data[i + 1] / 16) * 16;
      const qb = Math.round(data[i + 2] / 16) * 16;
      const k = `${qr},${qg},${qb},${aBand}`;
      const b = buckets.get(k) || { count: 0, rSum: 0, gSum: 0, bSum: 0, aBand };
      b.count++;
      b.rSum += data[i];
      b.gSum += data[i + 1];
      b.bSum += data[i + 2];
      buckets.set(k, b);
    }

    if (fgCount < 16) return "";

    const sorted = Array.from(buckets.values())
      .map((b) => ({
        count: b.count,
        r: Math.round(b.rSum / b.count),
        g: Math.round(b.gSum / b.count),
        b: Math.round(b.bSum / b.count),
        aBand: b.aBand
      }))
      .sort((a, b) => b.count - a.count);

    const palette = [];
    for (const cand of sorted) {
      if (cand.count < fgCount * 0.003 && palette.length > 0) continue;
      const existing = palette.find(
        (p) => p.aBand === cand.aBand && (Math.abs(p.r - cand.r) + Math.abs(p.g - cand.g) + Math.abs(p.b - cand.b) < 38)
      );
      if (existing) {
        const tot = existing.count + cand.count;
        existing.r = Math.round((existing.r * existing.count + cand.r * cand.count) / tot);
        existing.g = Math.round((existing.g * existing.count + cand.g * cand.count) / tot);
        existing.b = Math.round((existing.b * existing.count + cand.b * cand.count) / tot);
        existing.count = tot;
      } else if (palette.length < maxColors) {
        palette.push(Object.assign({}, cand));
      }
    }

    // Ordenar capas de menor opacidad / mayor área (fondo) a mayor opacidad / detalle (frente)
    palette.sort((a, b) => (a.aBand - b.aBand) || (b.count - a.count));

    const pixelClass = new Int8Array(grid * grid).fill(-1);
    for (let p = 0; p < grid * grid; p++) {
      const aBand = quantizeAlphaBand(data[p * 4 + 3]);
      if (aBand === 0) continue;
      const r = data[p * 4], g = data[p * 4 + 1], b = data[p * 4 + 2];
      let bestIdx = 0, bestDist = 1e9;
      for (let c = 0; c < palette.length; c++) {
        const alphaPenalty = Math.abs(aBand - palette[c].aBand) * 1.5;
        const dist = Math.abs(r - palette[c].r) + Math.abs(g - palette[c].g) + Math.abs(b - palette[c].b) + alphaPenalty;
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = c;
        }
      }
      pixelClass[p] = bestIdx;
    }

    // Filtro de mediana 3x3 para eliminar manchas aisladas ("speckles") antes de trazar curvas
    const cleanedClass = new Int8Array(pixelClass);
    for (let y = 1; y < grid - 1; y++) {
      for (let x = 1; x < grid - 1; x++) {
        const idx = y * grid + x;
        const cur = pixelClass[idx];
        let sameNeighbors = 0;
        const counts = new Map();
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nb = pixelClass[(y + dy) * grid + (x + dx)];
            if (nb === cur) sameNeighbors++;
            counts.set(nb, (counts.get(nb) || 0) + 1);
          }
        }
        if (sameNeighbors <= 1) {
          let majClass = cur, majCount = 0;
          for (const [k, v] of counts.entries()) {
            if (v > majCount) { majCount = v; majClass = k; }
          }
          cleanedClass[idx] = majClass;
        }
      }
    }

    const scaleFactor = 168 / grid;
    const offset = 16;
    const pathElements = [];

    for (let c = 0; c < palette.length; c++) {
      const mask = new Uint8Array(grid * grid);
      let count = 0;
      for (let p = 0; p < grid * grid; p++) {
        if (cleanedClass[p] === c) {
          mask[p] = 1;
          count++;
        }
      }
      if (count < 14) continue;
      const loops = traceBinaryMaskToLoops(mask, grid, grid, 1.15);
      const subPaths = loops.map((lp) => closedLoopToBezierPath(lp, scaleFactor, offset, offset)).filter(Boolean);
      if (subPaths.length > 0) {
        const hex = "#" + [palette[c].r, palette[c].g, palette[c].b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
        const opacityVal = (palette[c].aBand / 255).toFixed(2);
        const opAttr = palette[c].aBand < 250 ? ` fill-opacity="${opacityVal}"` : "";
        pathElements.push(`<path d="${subPaths.join(" ")}" fill="${hex}"${opAttr} fill-rule="evenodd"/>`);
      }
    }

    const tracedGroup = `<g data-tbb-bezier-traced="true">${pathElements.join("")}</g>`;
    _tracedSvgCache.set(centeredUrl, tracedGroup);
    return tracedGroup;
  }

  // ==========================================================================
  // 2B. EXPORTADOR NATIVO EN CURVAS (.SVG 100% <path> Y .AI ADOBE ILLUSTRATOR PDF 1.6 CON TRANSPARENCIA /ExtGState)
  // ==========================================================================
  function hexToRgbUnit(hex) {
    const h = cleanHex6(hex, "0D2540");
    return [
      (parseInt(h.slice(0, 2), 16) / 255).toFixed(4),
      (parseInt(h.slice(2, 4), 16) / 255).toFixed(4),
      (parseInt(h.slice(4, 6), 16) / 255).toFixed(4)
    ];
  }

  function parseTransformMatrix(transformStr) {
    let m = [1, 0, 0, 1, 0, 0];
    if (!transformStr) return m;
    const mul = (m1, m2) => [
      m1[0] * m2[0] + m1[2] * m2[1],
      m1[1] * m2[0] + m1[3] * m2[1],
      m1[0] * m2[2] + m1[2] * m2[3],
      m1[1] * m2[2] + m1[3] * m2[3],
      m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
      m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
    ];
    const re = /(translate|scale|rotate)\s*\(([^)]+)\)/gi;
    let match;
    while ((match = re.exec(transformStr)) !== null) {
      const fn = match[1].toLowerCase();
      const nums = match[2].trim().split(/[\s,]+/).map(Number);
      if (fn === "translate") {
        m = mul(m, [1, 0, 0, 1, nums[0] || 0, nums[1] || 0]);
      } else if (fn === "scale") {
        const sx = isNaN(nums[0]) ? 1 : nums[0];
        const sy = isNaN(nums[1]) ? sx : nums[1];
        m = mul(m, [sx, 0, 0, sy, 0, 0]);
      } else if (fn === "rotate") {
        const rad = ((nums[0] || 0) * Math.PI) / 180;
        const cos = Math.cos(rad), sin = Math.sin(rad);
        m = mul(m, [cos, sin, -sin, cos, 0, 0]);
      }
    }
    return m;
  }

  function convertSvgCurvesToNativeIllustratorAiBlob(outlinedSvg) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(outlinedSvg, "image/svg+xml");
    const svg = doc.querySelector("svg");
    const vb = ((svg && svg.getAttribute("viewBox")) || "0 0 460 120").trim().split(/[\s,]+/).map(Number);
    const W = vb[2] || 460;
    const H = vb[3] || 120;

    const ops = ["q"];
    // Registro dinámico de estados de transparencia PDF 1.6 (/ExtGState << /GS1 << /Type /ExtGState /ca 0.28 /CA 0.82 >> >>)
    const extGStates = new Map();
    const getGsName = (fillAlpha, strokeAlpha) => {
      const fa = Math.max(0, Math.min(1, isNaN(fillAlpha) ? 1 : fillAlpha)).toFixed(2);
      const sa = Math.max(0, Math.min(1, isNaN(strokeAlpha) ? 1 : strokeAlpha)).toFixed(2);
      const key = `${fa}_${sa}`;
      if (!extGStates.has(key)) {
        const gsId = `GS${extGStates.size + 1}`;
        extGStates.set(key, { id: gsId, ca: fa, CA: sa });
      }
      return extGStates.get(key).id;
    };

    function getCumulativeMatrix(el) {
      const chain = [];
      let cur = el;
      while (cur && cur.tagName && cur.tagName.toLowerCase() !== "svg") {
        const t = cur.getAttribute("transform");
        if (t) chain.unshift(parseTransformMatrix(t));
        cur = cur.parentElement;
      }
      let m = [1, 0, 0, 1, 0, 0];
      for (const cm of chain) {
        m = [
          m[0] * cm[0] + m[2] * cm[1],
          m[1] * cm[0] + m[3] * cm[1],
          m[0] * cm[2] + m[2] * cm[3],
          m[1] * cm[2] + m[3] * cm[3],
          m[0] * cm[4] + m[2] * cm[5] + m[4],
          m[1] * cm[4] + m[3] * cm[5] + m[5]
        ];
      }
      return m;
    }

    const pt = (m, x, y) => {
      const nx = m[0] * x + m[2] * y + m[4];
      const ny = H - (m[1] * x + m[3] * y + m[5]);
      return `${nx.toFixed(2)} ${ny.toFixed(2)}`;
    };

    function svgPathDToPdfOps(d, m) {
      const tokens = String(d || "").match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) || [];
      let i = 0, cmd = "", cx = 0, cy = 0, sx = 0, sy = 0;
      const out = [];
      while (i < tokens.length) {
        if (/^[a-zA-Z]$/.test(tokens[i])) cmd = tokens[i++];
        if (cmd === "M" || cmd === "m") {
          const x = parseFloat(tokens[i++]) + (cmd === "m" ? cx : 0);
          const y = parseFloat(tokens[i++]) + (cmd === "m" ? cy : 0);
          cx = sx = x; cy = sy = y;
          out.push(`${pt(m, cx, cy)} m`);
          cmd = cmd === "m" ? "l" : "L";
        } else if (cmd === "L" || cmd === "l") {
          const x = parseFloat(tokens[i++]) + (cmd === "l" ? cx : 0);
          const y = parseFloat(tokens[i++]) + (cmd === "l" ? cy : 0);
          cx = x; cy = y;
          out.push(`${pt(m, cx, cy)} l`);
        } else if (cmd === "H" || cmd === "h") {
          const x = parseFloat(tokens[i++]) + (cmd === "h" ? cx : 0);
          cx = x;
          out.push(`${pt(m, cx, cy)} l`);
        } else if (cmd === "V" || cmd === "v") {
          const y = parseFloat(tokens[i++]) + (cmd === "v" ? cy : 0);
          cy = y;
          out.push(`${pt(m, cx, cy)} l`);
        } else if (cmd === "C" || cmd === "c") {
          const x1 = parseFloat(tokens[i++]) + (cmd === "c" ? cx : 0);
          const y1 = parseFloat(tokens[i++]) + (cmd === "c" ? cy : 0);
          const x2 = parseFloat(tokens[i++]) + (cmd === "c" ? cx : 0);
          const y2 = parseFloat(tokens[i++]) + (cmd === "c" ? cy : 0);
          const x = parseFloat(tokens[i++]) + (cmd === "c" ? cx : 0);
          const y = parseFloat(tokens[i++]) + (cmd === "c" ? cy : 0);
          cx = x; cy = y;
          out.push(`${pt(m, x1, y1)} ${pt(m, x2, y2)} ${pt(m, x, y)} c`);
        } else if (cmd === "Q" || cmd === "q") {
          const qx = parseFloat(tokens[i++]) + (cmd === "q" ? cx : 0);
          const qy = parseFloat(tokens[i++]) + (cmd === "q" ? cy : 0);
          const x = parseFloat(tokens[i++]) + (cmd === "q" ? cx : 0);
          const y = parseFloat(tokens[i++]) + (cmd === "q" ? cy : 0);
          const c1x = cx + (2 / 3) * (qx - cx), c1y = cy + (2 / 3) * (qy - cy);
          const c2x = x + (2 / 3) * (qx - x), c2y = y + (2 / 3) * (qy - y);
          cx = x; cy = y;
          out.push(`${pt(m, c1x, c1y)} ${pt(m, c2x, c2y)} ${pt(m, x, y)} c`);
        } else if (cmd === "Z" || cmd === "z") {
          cx = sx; cy = sy;
          out.push("h");
          cmd = "";
        } else {
          i++;
        }
      }
      return out.join("\n");
    }

    if (svg) {
      const shapes = Array.from(svg.querySelectorAll("rect, circle, line, path"));
      for (const el of shapes) {
        if (el.closest("defs")) continue;
        const tag = el.tagName.toLowerCase();
        const m = getCumulativeMatrix(el);
        const fill = el.getAttribute("fill") || (tag === "line" ? "none" : "#0D2540");
        const stroke = el.getAttribute("stroke") || "none";
        const sw = parseFloat(el.getAttribute("stroke-width") || "1") * Math.hypot(m[0], m[1]);
        const baseOp = parseFloat(el.getAttribute("opacity") || "1");
        const fillOp = parseFloat(el.getAttribute("fill-opacity") || "1") * (isNaN(baseOp) ? 1 : baseOp);
        const strokeOp = parseFloat(el.getAttribute("stroke-opacity") || "1") * (isNaN(baseOp) ? 1 : baseOp);
        const gsName = getGsName(fillOp, strokeOp);

        let geom = "";
        if (tag === "rect") {
          const x = parseFloat(el.getAttribute("x") || "0");
          const y = parseFloat(el.getAttribute("y") || "0");
          const w = parseFloat(el.getAttribute("width") || "0");
          const h = parseFloat(el.getAttribute("height") || "0");
          const rx = Math.min(parseFloat(el.getAttribute("rx") || "0"), w / 2, h / 2);
          if (w > 0 && h > 0) {
            if (rx > 0.5) {
              const k = 0.55228475 * rx;
              geom = [
                `${pt(m, x + rx, y)} m`,
                `${pt(m, x + w - rx, y)} l`,
                `${pt(m, x + w - rx + k, y)} ${pt(m, x + w, y + rx - k)} ${pt(m, x + w, y + rx)} c`,
                `${pt(m, x + w, y + h - rx)} l`,
                `${pt(m, x + w, y + h - rx + k)} ${pt(m, x + w - rx + k, y + h)} ${pt(m, x + w - rx, y + h)} c`,
                `${pt(m, x + rx, y + h)} l`,
                `${pt(m, x + rx - k, y + h)} ${pt(m, x, y + h - rx + k)} ${pt(m, x, y + h - rx)} c`,
                `${pt(m, x, y + rx)} l`,
                `${pt(m, x, y + rx - k)} ${pt(m, x + rx - k, y)} ${pt(m, x + rx, y)} c h`
              ].join("\n");
            } else {
              geom = `${pt(m, x, y)} m ${pt(m, x + w, y)} l ${pt(m, x + w, y + h)} l ${pt(m, x, y + h)} l h`;
            }
          }
        } else if (tag === "circle") {
          const cx = parseFloat(el.getAttribute("cx") || "0");
          const cy = parseFloat(el.getAttribute("cy") || "0");
          const r = parseFloat(el.getAttribute("r") || "0");
          if (r > 0) {
            const k = 0.55228475 * r;
            geom = [
              `${pt(m, cx + r, cy)} m`,
              `${pt(m, cx + r, cy + k)} ${pt(m, cx + k, cy + r)} ${pt(m, cx, cy + r)} c`,
              `${pt(m, cx - k, cy + r)} ${pt(m, cx - r, cy + k)} ${pt(m, cx - r, cy)} c`,
              `${pt(m, cx - r, cy - k)} ${pt(m, cx - k, cy - r)} ${pt(m, cx, cy - r)} c`,
              `${pt(m, cx + k, cy - r)} ${pt(m, cx + r, cy - k)} ${pt(m, cx + r, cy)} c h`
            ].join("\n");
          }
        } else if (tag === "line") {
          const x1 = parseFloat(el.getAttribute("x1") || "0");
          const y1 = parseFloat(el.getAttribute("y1") || "0");
          const x2 = parseFloat(el.getAttribute("x2") || "0");
          const y2 = parseFloat(el.getAttribute("y2") || "0");
          geom = `${pt(m, x1, y1)} m ${pt(m, x2, y2)} l`;
        } else if (tag === "path") {
          geom = svgPathDToPdfOps(el.getAttribute("d") || "", m);
        }

        if (!geom) continue;
        const hasFill = fill && fill !== "none" && !fill.startsWith("url(");
        const hasStroke = stroke && stroke !== "none" && !stroke.startsWith("url(");
        if (hasFill && hasStroke) {
          const [fr, fg, fb] = hexToRgbUnit(fill);
          const [sr, sg, sb] = hexToRgbUnit(stroke);
          ops.push(`/${gsName} gs ${fr} ${fg} ${fb} rg ${sr} ${sg} ${sb} RG ${sw.toFixed(2)} w\n${geom}\nB*`);
        } else if (hasFill) {
          const [fr, fg, fb] = hexToRgbUnit(fill);
          ops.push(`/${gsName} gs ${fr} ${fg} ${fb} rg\n${geom}\nf*`);
        } else if (hasStroke) {
          const [sr, sg, sb] = hexToRgbUnit(stroke);
          ops.push(`/${gsName} gs ${sr} ${sg} ${sb} RG ${sw.toFixed(2)} w\n${geom}\nS`);
        }
      }
    }
    ops.push("Q");
    const streamStr = ops.join("\n");

    const extGStateEntries = Array.from(extGStates.values())
      .map((g) => `/${g.id} << /Type /ExtGState /ca ${g.ca} /CA ${g.CA} /BM /Normal >>`)
      .join(" ");
    const resourcesDict = `<< /ExtGState << ${extGStateEntries} >> >>`;

    const objs = [
      `1 0 obj\n<< /Type /Catalog /Pages 2 0 R /Creator (TheBestBrand Cloud Vector Engine V89 - Native Transparency & Bezier Curves) >>\nendobj\n`,
      `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`,
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /ArtBox [0 0 ${W} ${H}] /Group << /Type /Group /S /Transparency /CS /DeviceRGB >> /Resources ${resourcesDict} /Contents 4 0 R >>\nendobj\n`,
      `4 0 obj\n<< /Length ${streamStr.length} >>\nstream\n${streamStr}\nendstream\nendobj\n`
    ];

    let pdf = "%PDF-1.6\n%\xE2\xE3\xCF\xD3\n";
    const offsets = [0];
    for (const o of objs) {
      offsets.push(pdf.length);
      pdf += o;
    }
    const xrefPos = pdf.length;
    pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objs.length; i++) {
      pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    }
    pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
    return new Blob([pdf], { type: "application/postscript" });
  }

  async function tbbExportLogoInCurves(variant = "horizontal", format = "svg", triggerBtn = null) {
    const origTxt = triggerBtn ? triggerBtn.innerHTML : "";
    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.textContent = "Trazando curvas Bézier y transparencias...";
    }

    try {
      const brand = window.buildActiveBrandProfileForV80 ? Object.assign({}, window.buildActiveBrandProfileForV80()) : {};
      const slug = brand.slug || "marca";
      const bName = brand.name || "Marca";
      const finishStyle = String((window.canvasState && window.canvasState.logo_finish_style) || brand.finishStyle || "").toLowerCase();
      const isLiquidGlassOrTbb = finishStyle === "liquid_glass" || /the_?best_?brand/i.test(slug) || /aura/i.test(slug);

      if (isLiquidGlassOrTbb) {
        // Reconstrucción vectorial paramétrica 100% en curvas Bézier matemáticas con transparencias reales (/ca & fill-opacity)
        const parametricCore = buildParametricLiquidGlassVectorCore(brand.colors);
        if (window.canvasState) window.canvasState.uploaded_logo_traced_curves_svg = parametricCore;
        brand.svgCore = parametricCore;
        brand.svgCoreNeg = parametricCore;
      } else if (brand.uploadedLogoDataUrl && !String(brand.uploadedLogoDataUrl).startsWith("data:image/svg")) {
        // Vectorizador multicapa con canal alfa real y splines suaves (Chaikin + Catmull-Rom) para cualquier otro logo raster
        const tracedGroup = await tbbVectorizeRasterLogoToSvgCurves(brand.uploadedLogoDataUrl, 14);
        if (tracedGroup) {
          if (window.canvasState) window.canvasState.uploaded_logo_traced_curves_svg = tracedGroup;
          brand.svgCore = tracedGroup;
          brand.svgCoreNeg = `<rect x="14" y="14" width="172" height="172" rx="30" fill="#FFFFFF"/>${tracedGroup}`;
        }
      }

      const suite = window.generateTriFoldLogoSuite ? window.generateTriFoldLogoSuite(brand) : {};
      let rawSvg = "";
      let baseName = "";

      if (variant === "symbol") {
        rawSvg = `<svg viewBox="0 0 200 200" width="800" height="800" xmlns="http://www.w3.org/2000/svg">${brand.svgCore || ""}</svg>`;
        baseName = `Isotipo_Simbolo_Curvas_${slug}`;
      } else if (variant === "avatar") {
        rawSvg = suite.avatar || "";
        baseName = `Avatar_Social_1x1_Curvas_${slug}`;
      } else if (variant === "seal") {
        rawSvg = suite.seal || "";
        baseName = `Sello_Circular_Curvas_${slug}`;
      } else {
        rawSvg = suite.horizontal || "";
        baseName = `Logotipo_Horizontal_Curvas_${slug}`;
      }

      const outlinedSvg = (typeof window.convertSvgTextToIllustratorCurves === "function")
        ? await window.convertSvgTextToIllustratorCurves(rawSvg)
        : rawSvg;

      if (format === "ai") {
        const aiBlob = convertSvgCurvesToNativeIllustratorAiBlob(outlinedSvg);
        const fileName = `${baseName}.ai`;
        if (typeof window.tbbDeliverFileNativeOrDownload === "function") {
          await window.tbbDeliverFileNativeOrDownload(aiBlob, fileName, "application/postscript", `Adobe Illustrator en Curvas (.AI) — ${bName}`);
        }
      } else {
        const svgBlob = new Blob([outlinedSvg], { type: "image/svg+xml;charset=utf-8" });
        const fileName = `${baseName}.svg`;
        if (typeof window.tbbDeliverFileNativeOrDownload === "function") {
          await window.tbbDeliverFileNativeOrDownload(svgBlob, fileName, "image/svg+xml", `Vector 100% en Curvas (.SVG) — ${bName}`);
        }
      }

      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = "✓ Curvas Descargadas";
        setTimeout(() => { if (origTxt) triggerBtn.innerHTML = origTxt; }, 2600);
      }
    } catch (err) {
      console.error("Error exportando logotipo en curvas:", err);
      if (triggerBtn) {
        triggerBtn.disabled = false;
        if (origTxt) triggerBtn.innerHTML = origTxt;
      }
    }
  }

  // ==========================================================================
  // 3. EMPAQUETADOR BINARIO ZIP (CRC32 + STORE OOXML ESTÁNDAR ISO/IEC 29500)
  // ==========================================================================
  const _crcTable = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32Bytes(u8) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < u8.length; i++) c = _crcTable[(c ^ u8[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function buildZipBlob(entries, mimeType) {
    const enc = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    for (const entry of entries) {
      const nameBytes = enc.encode(entry.name);
      const dataBytes = entry.data instanceof Uint8Array ? entry.data : enc.encode(String(entry.data));
      const crc = crc32Bytes(dataBytes);
      const size = dataBytes.length;

      const lh = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(lh.buffer);
      lv.setUint32(0, 0x04034B50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0x0800, true); // UTF-8 filename flag
      lv.setUint16(8, 0, true); // Store (0)
      lv.setUint16(10, 0x4821, true);
      lv.setUint16(12, 0x566A, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, size, true);
      lv.setUint32(22, size, true);
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);
      lh.set(nameBytes, 30);

      const ch = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(ch.buffer);
      cv.setUint32(0, 0x02014B50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, 0x4821, true);
      cv.setUint16(14, 0x566A, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, size, true);
      cv.setUint32(24, size, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, offset, true);
      ch.set(nameBytes, 46);

      localParts.push(lh, dataBytes);
      centralParts.push(ch);
      offset += lh.length + dataBytes.length;
    }

    const centralSize = centralParts.reduce((s, a) => s + a.length, 0);
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054B50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, entries.length, true);
    ev.setUint16(10, entries.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, offset, true);
    ev.setUint16(20, 0, true);

    return new Blob([...localParts, ...centralParts, eocd], { type: mimeType || "application/zip" });
  }

  function dataUrlToUint8(dataUrl) {
    const base64 = String(dataUrl || "").split(",")[1] || "";
    const bin = atob(base64);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return u8;
  }

  // Renderiza el símbolo centrado activo de la marca a PNG 512x512 transparente para incrustarlo en .DOCX, .PPTX y Firma .HTML
  async function renderActiveSymbolPngDataUrl(brand, size = 384) {
    if (brand.uploadedLogoDataUrl && !String(brand.uploadedLogoDataUrl).startsWith("data:image/svg")) {
      const centered = await tbbAutoTrimAndCenterRasterLogo(brand.uploadedLogoDataUrl);
      const img = await loadImgAsync(centered);
      if (img) {
        const cnv = document.createElement("canvas");
        cnv.width = size; cnv.height = size;
        const ctx = cnv.getContext("2d");
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        return cnv.toDataURL("image/png");
      }
    }
    const svgStr = `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${brand.svgCore || ""}</svg>`;
    const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
    const img = await loadImgAsync(svgUrl);
    const cnv = document.createElement("canvas");
    cnv.width = size; cnv.height = size;
    const ctx = cnv.getContext("2d");
    ctx.clearRect(0, 0, size, size);
    if (img) ctx.drawImage(img, 0, 0, size, size);
    return cnv.toDataURL("image/png");
  }

  // ==========================================================================
  // 4. GENERADOR NATIVO DE PLANTILLA DE HOJA MEMBRETADA EDITABLE (.DOCX WORD / DOCS)
  // ==========================================================================
  async function tbbDownloadEditableLetterheadDOCX(triggerBtn) {
    const orig = triggerBtn ? triggerBtn.innerHTML : "";
    if (triggerBtn) { triggerBtn.disabled = true; triggerBtn.textContent = "Generando Hoja Membretada .DOCX..."; }

    try {
      const brand = window.buildActiveBrandProfileForV80();
      const bName = brand.name || "The Best Brand";
      const slug = brand.slug || "marca";
      const tagline = (brand.tagline || "IDENTIDAD CORPORATIVA").toUpperCase();
      const pri = cleanHex6(brand.colors?.pri, "0D2540");
      const sec = cleanHex6(brand.colors?.sec, "426EAE");
      const acc = cleanHex6(brand.colors?.acc, "FF7A00");
      const priFont = brand.primaryFont || "Montserrat";
      const secFont = brand.secondaryFont || "Calibri";

      const logoPngUrl = await renderActiveSymbolPngDataUrl(brand, 360);
      const logoBytes = dataUrlToUint8(logoPngUrl);

      const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>
  <Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
</Types>`;

      const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

      const docRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>
</Relationships>`;

      const hdrRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.png"/>
</Relationships>`;

      const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="${xmlEsc(secFont)}" w:hAnsi="${xmlEsc(secFont)}"/>
        <w:sz w:val="22"/>
        <w:color w:val="1E293B"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>`;

      const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
       xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9360" w:type="dxa"/>
      <w:tblBorders>
        <w:bottom w:val="single" w:sz="18" w:space="8" w:color="${acc}"/>
      </w:tblBorders>
    </w:tblPr>
    <w:tr>
      <w:tc>
        <w:tcPr><w:tcW w:w="1300" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr>
        <w:p>
          <w:r>
            <w:drawing>
              <wp:inline distT="0" distB="0" distL="0" distR="0">
                <wp:extent cx="520000" cy="520000"/>
                <wp:docPr id="1" name="Logo Oficial"/>
                <a:graphic>
                  <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                    <pic:pic>
                      <pic:nvPicPr><pic:cNvPr id="1" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr>
                      <pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>
                      <pic:spPr>
                        <a:xfrm><a:off x="0" y="0"/><a:ext cx="520000" cy="520000"/></a:xfrm>
                        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                      </pic:spPr>
                    </pic:pic>
                  </a:graphicData>
                </a:graphic>
              </wp:inline>
            </w:drawing>
          </w:r>
        </w:p>
      </w:tc>
      <w:tc>
        <w:tcPr><w:tcW w:w="5260" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr>
        <w:p>
          <w:pPr><w:spacing w:after="20"/></w:pPr>
          <w:r><w:rPr><w:rFonts w:ascii="${xmlEsc(priFont)}" w:hAnsi="${xmlEsc(priFont)}"/><w:b/><w:sz w:val="30"/><w:color w:val="${pri}"/></w:rPr><w:t>${xmlEsc(bName.toUpperCase())}</w:t></w:r>
        </w:p>
        <w:p>
          <w:pPr><w:spacing w:after="0"/></w:pPr>
          <w:r><w:rPr><w:b/><w:sz w:val="16"/><w:color w:val="${sec}"/></w:rPr><w:t>${xmlEsc(tagline.slice(0, 68))}</w:t></w:r>
        </w:p>
      </w:tc>
      <w:tc>
        <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr>
        <w:p>
          <w:pPr><w:jc w:val="right"/><w:spacing w:after="20"/></w:pPr>
          <w:r><w:rPr><w:sz w:val="16"/><w:color w:val="64748B"/></w:rPr><w:t>www.${xmlEsc(slug)}.com</w:t></w:r>
        </w:p>
        <w:p>
          <w:pPr><w:jc w:val="right"/><w:spacing w:after="0"/></w:pPr>
          <w:r><w:rPr><w:sz w:val="16"/><w:color w:val="64748B"/></w:rPr><w:t>contacto@${xmlEsc(slug)}.com</w:t></w:r>
        </w:p>
      </w:tc>
    </w:tr>
  </w:tbl>
  <w:p><w:pPr><w:spacing w:after="120"/></w:pPr></w:p>
</w:hdr>`;

      const footerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:p>
    <w:pPr>
      <w:pBdr><w:top w:val="single" w:sz="8" w:space="6" w:color="${pri}"/></w:pBdr>
      <w:jc w:val="both"/>
    </w:pPr>
    <w:r><w:rPr><w:b/><w:sz w:val="16"/><w:color w:val="${pri}"/></w:rPr><w:t>${xmlEsc(bName.toUpperCase())}  ·  </w:t></w:r>
    <w:r><w:rPr><w:sz w:val="16"/><w:color w:val="64748B"/></w:rPr><w:t>Documento Corporativo Oficial  |  contacto@${xmlEsc(slug)}.com  |  Confidencial</w:t></w:r>
  </w:p>
</w:ftr>`;

      const todayStr = new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
      const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="right"/><w:spacing w:after="240"/></w:pPr>
      <w:r><w:rPr><w:color w:val="64748B"/><w:sz w:val="20"/></w:rPr><w:t>Ciudad de México, a ${xmlEsc(todayStr)}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F172A"/></w:rPr><w:t>[Nombre del Destinatario / Director General]</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="260"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="20"/><w:color w:val="475569"/></w:rPr><w:t>[Empresa u Organización] · Presente</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr>
        <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="${acc}"/></w:pBdr>
        <w:spacing w:after="240"/>
      </w:pPr>
      <w:r><w:rPr><w:rFonts w:ascii="${xmlEsc(priFont)}" w:hAnsi="${xmlEsc(priFont)}"/><w:b/><w:sz w:val="26"/><w:color w:val="${pri}"/></w:rPr><w:t>ASUNTO: PROPUESTA EJECUTIVA Y COMUNICADO OFICIAL</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:line="320" w:lineRule="auto" w:after="200"/></w:pPr>
      <w:r><w:t>Estimado(a) socio comercial, por medio de la presente compartimos los alcances estratégicos y compromisos de calidad respaldados por </w:t></w:r>
      <w:r><w:rPr><w:b/><w:color w:val="${pri}"/></w:rPr><w:t>${xmlEsc(bName)}</w:t></w:r>
      <w:r><w:t>. (${xmlEsc(brand.giro || "")})</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:line="320" w:lineRule="auto" w:after="200"/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="${sec}"/></w:rPr><w:t>Nuestro Compromiso de Valor: </w:t></w:r>
      <w:r><w:t>${xmlEsc(brand.what || "Entrega impecable con rigor técnico y trato cercano.")}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:line="320" w:lineRule="auto" w:after="420"/></w:pPr>
      <w:r><w:t>[Edita libremente este cuerpo de texto en Microsoft Word, Google Docs o Apple Pages. El encabezado con tu logotipo centrado y el pie de página institucional se repetirán automáticamente en cada hoja nueva.]</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="0F172A"/></w:rPr><w:t>Atentamente,</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:before="360" w:after="40"/></w:pPr>
      <w:r><w:rPr><w:rFonts w:ascii="${xmlEsc(priFont)}" w:hAnsi="${xmlEsc(priFont)}"/><w:b/><w:sz w:val="24"/><w:color w:val="${pri}"/></w:rPr><w:t>Dirección General · ${xmlEsc(bName)}</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:sz w:val="18"/><w:color w:val="${acc}"/></w:rPr><w:t>${xmlEsc(tagline)}</w:t></w:r>
    </w:p>
    <w:sectPr>
      <w:headerReference w:type="default" r:id="rId2"/>
      <w:footerReference w:type="default" r:id="rId3"/>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1800" w:right="1440" w:bottom="1440" w:left="1440" w:header="640" w:footer="640"/>
    </w:sectPr>
  </w:body>
</w:document>`;

      const docxBlob = buildZipBlob([
        { name: "[Content_Types].xml", data: contentTypes },
        { name: "_rels/.rels", data: rootRels },
        { name: "word/document.xml", data: documentXml },
        { name: "word/_rels/document.xml.rels", data: docRels },
        { name: "word/styles.xml", data: stylesXml },
        { name: "word/header1.xml", data: headerXml },
        { name: "word/_rels/header1.xml.rels", data: hdrRels },
        { name: "word/footer1.xml", data: footerXml },
        { name: "word/media/logo.png", data: logoBytes }
      ], "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

      const fileName = `Plantilla_Hoja_Membretada_${slug}.docx`;
      await window.tbbDeliverFileNativeOrDownload(docxBlob, fileName, docxBlob.type, `Hoja Membretada Editable (.DOCX) — ${bName}`);

      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = "✓ Hoja Membretada .DOCX Lista";
        setTimeout(() => { if (orig) triggerBtn.innerHTML = orig; }, 2800);
      }
      return docxBlob;
    } catch (err) {
      console.error("DOCX build error:", err);
      if (triggerBtn) { triggerBtn.disabled = false; if (orig) triggerBtn.innerHTML = orig; }
      return null;
    }
  }

  // ==========================================================================
  // 5. GENERADOR NATIVO DE PRESENTACIÓN EJECUTIVA EDITABLE (.PPTX 16:9 · 6 SLIDES)
  // ==========================================================================
  function pptShapeRect(id, name, x, y, cx, cy, fillHex, radius) {
    const geom = radius ? `<a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 8000"/></a:avLst></a:prstGeom>` : `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>`;
    return `<p:sp>
      <p:nvSpPr><p:cNvPr id="${id}" name="${xmlEsc(name)}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>
        ${geom}
        <a:solidFill><a:srgbClr val="${cleanHex6(fillHex, "FFFFFF")}"/></a:solidFill>
        <a:ln><a:noFill/></a:ln>
      </p:spPr>
    </p:sp>`;
  }

  function pptTextBox(id, name, x, y, cx, cy, paragraphs) {
    const parasXml = paragraphs.map((p) => `
      <a:p>
        <a:pPr algn="${p.align || "l"}"/>
        <a:r>
          <a:rPr lang="es-MX" sz="${(p.pt || 18) * 100}" b="${p.bold ? "1" : "0"}" dirty="0">
            <a:solidFill><a:srgbClr val="${cleanHex6(p.color, "0F172A")}"/></a:solidFill>
            <a:latin typeface="${xmlEsc(p.font || "Montserrat")}"/>
          </a:rPr>
          <a:t>${xmlEsc(p.text || "")}</a:t>
        </a:r>
      </a:p>`).join("");
    return `<p:sp>
      <p:nvSpPr><p:cNvPr id="${id}" name="${xmlEsc(name)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
      <p:spPr>
        <a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        <a:noFill/>
      </p:spPr>
      <p:txBody>
        <a:bodyPr wrap="square" rtlCol="0"/>
        <a:lstStyle/>
        ${parasXml}
      </p:txBody>
    </p:sp>`;
  }

  function pptLogoPic(id, x, y, size) {
    return `<p:pic>
      <p:nvPicPr><p:cNvPr id="${id}" name="Logo Oficial"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
      <p:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
      <p:spPr>
        <a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${size}" cy="${size}"/></a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
      </p:spPr>
    </p:pic>`;
  }

  function wrapPptSlide(innerShapesXml) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      ${innerShapesXml}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
  }

  async function tbbDownloadEditableDeckPPTX(triggerBtn) {
    const orig = triggerBtn ? triggerBtn.innerHTML : "";
    if (triggerBtn) { triggerBtn.disabled = true; triggerBtn.textContent = "Generando Presentación .PPTX..."; }

    try {
      const brand = window.buildActiveBrandProfileForV80();
      const bName = brand.name || "The Best Brand";
      const slug = brand.slug || "marca";
      const tagline = (brand.tagline || "PRESENTACIÓN EJECUTIVA").toUpperCase();
      const pri = cleanHex6(brand.colors?.pri, "0D2540");
      const sec = cleanHex6(brand.colors?.sec, "426EAE");
      const acc = cleanHex6(brand.colors?.acc, "FF7A00");
      const priFont = brand.primaryFont || "Montserrat";
      const secFont = brand.secondaryFont || "Calibri";

      const logoPngUrl = await renderActiveSymbolPngDataUrl(brand, 420);
      const logoBytes = dataUrlToUint8(logoPngUrl);

      // 16:9 Widescreen: 12192000 x 6858000 EMUs
      const slideHeader = (kicker, title, pageNum) => [
        pptShapeRect(2, "TopAccent", 0, 0, 12192000, 110000, pri, false),
        pptShapeRect(3, "SubAccent", 0, 110000, 3400000, 45000, acc, false),
        pptLogoPic(4, 10850000, 260000, 680000),
        pptTextBox(5, "Kicker", 680000, 320000, 9600000, 360000, [{ text: kicker, pt: 11, bold: true, color: acc, font: priFont }]),
        pptTextBox(6, "SlideTitle", 680000, 640000, 9800000, 680000, [{ text: title, pt: 26, bold: true, color: pri, font: priFont }]),
        pptShapeRect(7, "FooterRule", 680000, 6380000, 10830000, 18000, "E2E8F0", false),
        pptTextBox(8, "FooterTxt", 680000, 6430000, 10830000, 300000, [{ text: `${bName.toUpperCase()}  ·  PRESENTACIÓN EJECUTIVA EDITABLE  ·  DIAPOSITIVA 0${pageNum} / 06`, pt: 9, bold: true, color: "64748B", font: secFont }])
      ].join("");

      const s1 = wrapPptSlide([
        pptShapeRect(2, "LeftBar", 0, 0, 280000, 6858000, pri, false),
        pptShapeRect(3, "TopRibbon", 280000, 0, 11912000, 140000, acc, false),
        pptShapeRect(4, "LogoCard", 8150000, 1350000, 3200000, 3200000, "F8FAFC", true),
        pptLogoPic(5, 8550000, 1750000, 2400000),
        pptTextBox(6, "CoverKicker", 920000, 1500000, 6800000, 420000, [{ text: "PRESENTACIÓN CORPORATIVA OFICIAL", pt: 13, bold: true, color: acc, font: priFont }]),
        pptTextBox(7, "CoverBrand", 920000, 1980000, 6900000, 1100000, [{ text: bName.toUpperCase(), pt: 44, bold: true, color: pri, font: priFont }]),
        pptTextBox(8, "CoverTag", 920000, 3120000, 6800000, 520000, [{ text: tagline.slice(0, 80), pt: 16, bold: true, color: sec, font: priFont }]),
        pptTextBox(9, "CoverGiro", 920000, 3760000, 6800000, 1200000, [{ text: brand.giro || "", pt: 15, bold: false, color: "334155", font: secFont }]),
        pptTextBox(10, "CoverFtr", 920000, 6100000, 10200000, 400000, [{ text: `www.${slug}.com  ·  contacto@${slug}.com`, pt: 12, bold: true, color: "64748B", font: secFont }])
      ].join(""));

      const s2 = wrapPptSlide([
        slideHeader("01 · PROPÓSITO Y ADN CORPORATIVO", "El Círculo Dorado de Nuestra Organización", 2),
        pptShapeRect(11, "Card1", 680000, 1650000, 3420000, 4200000, "FFF7ED", true),
        pptTextBox(12, "Txt1", 880000, 1900000, 3020000, 3700000, [
          { text: "01 · ¿POR QUÉ EXISTIMOS?", pt: 14, bold: true, color: acc, font: priFont },
          { text: " ", pt: 8, color: acc, font: secFont },
          { text: brand.why || "", pt: 14, bold: false, color: "1E293B", font: secFont }
        ]),
        pptShapeRect(13, "Card2", 4380000, 1650000, 3420000, 4200000, "F0F9FF", true),
        pptTextBox(14, "Txt2", 4580000, 1900000, 3020000, 3700000, [
          { text: "02 · ¿CÓMO LO HACEMOS?", pt: 14, bold: true, color: sec, font: priFont },
          { text: " ", pt: 8, color: sec, font: secFont },
          { text: brand.how || "", pt: 14, bold: false, color: "1E293B", font: secFont }
        ]),
        pptShapeRect(15, "Card3", 8080000, 1650000, 3430000, 4200000, "F8FAFC", true),
        pptTextBox(16, "Txt3", 8280000, 1900000, 3030000, 3700000, [
          { text: "03 · ¿QUÉ ENTREGAMOS?", pt: 14, bold: true, color: pri, font: priFont },
          { text: " ", pt: 8, color: pri, font: secFont },
          { text: brand.what || "", pt: 14, bold: false, color: "1E293B", font: secFont }
        ])
      ].join(""));

      const s3 = wrapPptSlide([
        slideHeader("02 · ENFOQUE EN EL CLIENTE", "A Quién Servimos y Cómo Generamos Valor", 3),
        pptShapeRect(11, "LeftBox", 680000, 1680000, 5200000, 4150000, "F8FAFC", true),
        pptTextBox(12, "BuyerTxt", 920000, 1940000, 4720000, 3600000, [
          { text: "PERFIL DEL CLIENTE ALIADO", pt: 13, bold: true, color: sec, font: priFont },
          { text: " ", pt: 8, color: sec, font: secFont },
          { text: brand.buyer || "", pt: 16, bold: true, color: pri, font: priFont },
          { text: " ", pt: 10, color: pri, font: secFont },
          { text: "Diseñamos cada solución para eliminar fricción operativa, ahorrar tiempo y garantizar certidumbre.", pt: 14, color: "475569", font: secFont }
        ]),
        pptShapeRect(13, "RightBox", 6180000, 1680000, 5330000, 4150000, pri, true),
        pptTextBox(14, "PersonaTxt", 6440000, 1940000, 4820000, 3600000, [
          { text: "NUESTRO SELLO HUMANO", pt: 13, bold: true, color: acc, font: priFont },
          { text: " ", pt: 8, color: "FFFFFF", font: secFont },
          { text: brand.persona || "", pt: 16, bold: true, color: "FFFFFF", font: priFont },
          { text: " ", pt: 10, color: "FFFFFF", font: secFont },
          { text: "Rigor técnico, escucha activa y acompañamiento hombro con hombro.", pt: 14, color: "E2E8F0", font: secFont }
        ])
      ].join(""));

      const tpB = (brand.tpBefore || []).slice(0, 3).map((x) => "• " + x);
      const tpD = (brand.tpDuring || []).slice(0, 3).map((x) => "• " + x);
      const tpA = (brand.tpAfter || []).slice(0, 3).map((x) => "• " + x);
      const s4 = wrapPptSlide([
        slideHeader("03 · RECORRIDO DEL CLIENTE", "Experiencia Integral: Antes · Durante · Después", 4),
        pptShapeRect(11, "TP1", 680000, 1680000, 3420000, 4150000, "F8FAFC", true),
        pptTextBox(12, "TPTxt1", 860000, 1900000, 3060000, 3700000, [
          { text: "1. ANTES (DESCUBRIMIENTO)", pt: 13, bold: true, color: pri, font: priFont },
          ...tpB.map((t) => ({ text: t, pt: 13, color: "334155", font: secFont }))
        ]),
        pptShapeRect(13, "TP2", 4380000, 1680000, 3420000, 4150000, "F0F9FF", true),
        pptTextBox(14, "TPTxt2", 4560000, 1900000, 3060000, 3700000, [
          { text: "2. DURANTE (EJECUCIÓN)", pt: 13, bold: true, color: sec, font: priFont },
          ...tpD.map((t) => ({ text: t, pt: 13, color: "334155", font: secFont }))
        ]),
        pptShapeRect(15, "TP3", 8080000, 1680000, 3430000, 4150000, "FFF7ED", true),
        pptTextBox(16, "TPTxt3", 8260000, 1900000, 3060000, 3700000, [
          { text: "3. DESPUÉS (LEALTAD)", pt: 13, bold: true, color: acc, font: priFont },
          ...tpA.map((t) => ({ text: t, pt: 13, color: "334155", font: secFont }))
        ])
      ].join(""));

      const s5 = wrapPptSlide([
        slideHeader("04 · PROPUESTA COMERCIAL EDITABLE", "Alcance del Proyecto, Entregables e Inversión", 5),
        pptShapeRect(11, "P1", 680000, 1680000, 6800000, 4150000, "F8FAFC", true),
        pptTextBox(12, "PTxt1", 920000, 1920000, 6320000, 3700000, [
          { text: "ENTREGABLES Y FASES DE TRABAJO (EDITABLE)", pt: 14, bold: true, color: pri, font: priFont },
          { text: "• Fase 1: Diagnóstico y levantamiento de requerimientos.", pt: 14, color: "334155", font: secFont },
          { text: "• Fase 2: Desarrollo, implementación y validación de calidad.", pt: 14, color: "334155", font: secFont },
          { text: "• Fase 3: Entrega ejecutiva, capacitación y garantía post-venta.", pt: 14, color: "334155", font: secFont }
        ]),
        pptShapeRect(13, "P2", 7760000, 1680000, 3750000, 4150000, "FFF7ED", true),
        pptTextBox(14, "PTxt2", 8000000, 1980000, 3270000, 3500000, [
          { text: "INVERSIÓN ESTIMADA", pt: 13, bold: true, color: acc, font: priFont },
          { text: "$00,000 MXN", pt: 28, bold: true, color: pri, font: priFont },
          { text: "Tiempo de entrega: [X semanas]", pt: 13, color: "475569", font: secFont },
          { text: "Vigencia de propuesta: 15 días", pt: 13, color: "475569", font: secFont }
        ])
      ].join(""));

      const s6 = wrapPptSlide([
        pptShapeRect(2, "FullDark", 0, 0, 12192000, 6858000, pri, false),
        pptShapeRect(3, "BottomBar", 0, 6680000, 12192000, 178000, acc, false),
        pptShapeRect(4, "Capsule", 5196000, 1150000, 1800000, 1800000, "FFFFFF", true),
        pptLogoPic(5, 5346000, 1300000, 1500000),
        pptTextBox(6, "Thanks", 1200000, 3250000, 9792000, 900000, [{ text: `GRACIAS · ${bName.toUpperCase()}`, pt: 34, bold: true, color: "FFFFFF", font: priFont, align: "ctr" }]),
        pptTextBox(7, "Contact", 1200000, 4200000, 9792000, 900000, [
          { text: tagline, pt: 15, bold: true, color: acc, font: priFont, align: "ctr" },
          { text: `contacto@${slug}.com  ·  www.${slug}.com  ·  +52 (55) 0000 0000`, pt: 14, color: "E2E8F0", font: secFont, align: "ctr" }
        ])
      ].join(""));

      const slides = [s1, s2, s3, s4, s5, s6];
      const slideRelXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/logo.png"/>
</Relationships>`;

      const entries = [
        {
          name: "[Content_Types].xml",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${slides.map((_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join("\n  ")}
</Types>`
        },
        {
          name: "_rels/.rels",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`
        },
        {
          name: "ppt/presentation.xml",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
                xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
                xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rIdMaster"/></p:sldMasterIdLst>
  <p:sldIdLst>
    ${slides.map((_, i) => `<p:sldId id="${256 + i}" r:id="rIdS${i + 1}"/>`).join("\n    ")}
  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`
        },
        {
          name: "ppt/_rels/presentation.xml.rels",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdMaster" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
  <Relationship Id="rIdTheme" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
  ${slides.map((_, i) => `<Relationship Id="rIdS${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`).join("\n  ")}
</Relationships>`
        },
        {
          name: "ppt/slideMasters/slideMaster1.xml",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
             xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
             xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
</p:sldMaster>`
        },
        {
          name: "ppt/slideMasters/_rels/slideMaster1.xml.rels",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>`
        },
        {
          name: "ppt/slideLayouts/slideLayout1.xml",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
             xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
             xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>`
        },
        {
          name: "ppt/slideLayouts/_rels/slideLayout1.xml.rels",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>`
        },
        {
          name: "ppt/theme/theme1.xml",
          data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="TheBestBrandTheme">
  <a:themeElements>
    <a:clrScheme name="TBB">
      <a:dk1><a:srgbClr val="090D16"/></a:dk1>
      <a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="${pri}"/></a:dk2>
      <a:lt2><a:srgbClr val="F8FAFC"/></a:lt2>
      <a:accent1><a:srgbClr val="${pri}"/></a:accent1>
      <a:accent2><a:srgbClr val="${sec}"/></a:accent2>
      <a:accent3><a:srgbClr val="${acc}"/></a:accent3>
      <a:accent4><a:srgbClr val="10B981"/></a:accent4>
      <a:accent5><a:srgbClr val="64748B"/></a:accent5>
      <a:accent6><a:srgbClr val="CBD5E1"/></a:accent6>
      <a:hlink><a:srgbClr val="${sec}"/></a:hlink>
      <a:folHlink><a:srgbClr val="${pri}"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="TBBFonts">
      <a:majorFont><a:latin typeface="${xmlEsc(priFont)}"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>
      <a:minorFont><a:latin typeface="${xmlEsc(secFont)}"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="TBBFmt">
      <a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>
      <a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
      <a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
      <a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>`
        },
        { name: "ppt/media/logo.png", data: logoBytes }
      ];

      slides.forEach((xml, idx) => {
        entries.push({ name: `ppt/slides/slide${idx + 1}.xml`, data: xml });
        entries.push({ name: `ppt/slides/_rels/slide${idx + 1}.xml.rels`, data: slideRelXml });
      });

      const pptxBlob = buildZipBlob(entries, "application/vnd.openxmlformats-officedocument.presentationml.presentation");
      const fileName = `Plantilla_Presentacion_Ejecutiva_${slug}.pptx`;
      await window.tbbDeliverFileNativeOrDownload(pptxBlob, fileName, pptxBlob.type, `Presentación Ejecutiva (.PPTX) — ${bName}`);

      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = "✓ Presentación .PPTX Lista";
        setTimeout(() => { if (orig) triggerBtn.innerHTML = orig; }, 2800);
      }
      return pptxBlob;
    } catch (err) {
      console.error("PPTX build error:", err);
      if (triggerBtn) { triggerBtn.disabled = false; if (orig) triggerBtn.innerHTML = orig; }
      return null;
    }
  }

  // ==========================================================================
  // 6. FIRMA CORPORATIVA EN HTML (COMPATIBLE GMAIL, OUTLOOK, APPLE MAIL, ZOHO)
  // ==========================================================================
  async function tbbBuildCorporateEmailSignatureHTML(brand, customFields = {}) {
    const bName = brand.name || "The Best Brand";
    const slug = brand.slug || "marca";
    const pri = brand.colors?.pri || "#0D2540";
    const sec = brand.colors?.sec || "#426EAE";
    const acc = brand.colors?.acc || "#FF7A00";
    const logoPng = await renderActiveSymbolPngDataUrl(brand, 180);

    const personName = customFields.personName || (window.tbbUserAccount && window.tbbUserAccount.name) || "Dirección General";
    const roleTitle = customFields.roleTitle || `Socio Fundador · ${bName}`;
    const phone = customFields.phone || "+52 (55) 5555 0199";
    const email = customFields.email || `direccion@${slug}.com`;
    const web = customFields.web || `www.${slug}.com`;
    const tagline = (brand.tagline || "EXCELENCIA Y CONFIANZA").slice(0, 64);

    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#0F172A;max-width:560px;border-collapse:collapse;background:#FFFFFF;">
  <tr>
    <td style="padding:14px 18px 14px 0;vertical-align:middle;border-right:3px solid ${acc};width:96px;text-align:center;">
      <img src="${logoPng}" alt="${xmlEsc(bName)}" width="84" height="84" style="display:block;margin:0 auto;width:84px;height:84px;object-fit:contain;border:0;" />
    </td>
    <td style="padding:12px 0 12px 18px;vertical-align:middle;">
      <div style="font-size:17px;font-weight:800;color:${pri};line-height:1.2;margin:0 0 2px 0;">${xmlEsc(personName)}</div>
      <div style="font-size:12.5px;font-weight:700;color:${sec};margin:0 0 8px 0;">${xmlEsc(roleTitle)}</div>
      <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;color:#334155;line-height:1.55;">
        <tr>
          <td style="padding-right:14px;"><strong>Tel:</strong> <a href="tel:${xmlEsc(phone.replace(/[^+\d]/g, ""))}" style="color:#0F172A;text-decoration:none;">${xmlEsc(phone)}</a></td>
          <td><strong>Email:</strong> <a href="mailto:${xmlEsc(email)}" style="color:${pri};text-decoration:none;font-weight:600;">${xmlEsc(email)}</a></td>
        </tr>
        <tr>
          <td colspan="2" style="padding-top:2px;"><strong>Web:</strong> <a href="https://${xmlEsc(web.replace(/^https?:\/\//, ""))}" style="color:${sec};text-decoration:none;font-weight:700;">${xmlEsc(web)}</a></td>
        </tr>
      </table>
      <div style="margin-top:8px;padding-top:6px;border-top:1px solid #E2E8F0;font-size:10.5px;font-weight:800;color:${acc};letter-spacing:0.6px;text-transform:uppercase;">
        ${xmlEsc(bName)} · ${xmlEsc(tagline)}
      </div>
    </td>
  </tr>
</table>`;
  }

  async function tbbOpenEmailSignatureModal() {
    let existing = document.getElementById("tbbEmailSigConfiguratorModal");
    if (existing) existing.remove();

    const brand = window.buildActiveBrandProfileForV80();
    const bName = brand.name || "Tu Marca";
    const slug = brand.slug || "marca";
    const pri = brand.colors?.pri || "#0D2540";
    const acc = brand.colors?.acc || "#FF7A00";

    const state = {
      personName: (window.tbbUserAccount && window.tbbUserAccount.name) || "Nombre y Apellido",
      roleTitle: `Dirección General · ${bName}`,
      phone: "+52 (55) 5555 0199",
      email: `contacto@${slug}.com`,
      web: `www.${slug}.com`
    };

    const modal = document.createElement("div");
    modal.id = "tbbEmailSigConfiguratorModal";
    modal.style.cssText = "position:fixed;inset:0;background:rgba(9,13,22,0.75);backdrop-filter:blur(8px);z-index:999995;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto;";

    modal.innerHTML = `
      <div style="width:100%;max-width:680px;background:#FFFFFF;border:2px solid ${pri};border-bottom:5px solid ${acc};border-radius:20px 38px 20px 20px;padding:22px;font-family:'Plus Jakarta Sans',sans-serif;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.70rem;font-weight:800;color:${acc};">ENTREGABLE EJECUTIVO · GMAIL / OUTLOOK / APPLE MAIL / ZOHO</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:1.15rem;font-weight:900;color:#090D16;margin:2px 0 0 0;">Firma Corporativa en HTML de «${xmlEsc(bName)}»</h3>
          </div>
          <button type="button" id="tbbCloseSigModal" style="background:#F1F5F9;border:1.5px solid #CBD5E1;border-radius:10px;padding:6px 12px;font-weight:800;cursor:pointer;">✕ Cerrar</button>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
          <input id="sigInpName" value="${xmlEsc(state.personName)}" placeholder="Nombre completo" style="padding:9px 11px;border:1.5px solid #CBD5E1;border-radius:9px;font-size:0.84rem;font-weight:700;"/>
          <input id="sigInpRole" value="${xmlEsc(state.roleTitle)}" placeholder="Cargo / Puesto" style="padding:9px 11px;border:1.5px solid #CBD5E1;border-radius:9px;font-size:0.84rem;font-weight:700;"/>
          <input id="sigInpPhone" value="${xmlEsc(state.phone)}" placeholder="Teléfono / WhatsApp" style="padding:9px 11px;border:1.5px solid #CBD5E1;border-radius:9px;font-size:0.84rem;"/>
          <input id="sigInpEmail" value="${xmlEsc(state.email)}" placeholder="Correo electrónico" style="padding:9px 11px;border:1.5px solid #CBD5E1;border-radius:9px;font-size:0.84rem;"/>
          <input id="sigInpWeb" value="${xmlEsc(state.web)}" placeholder="Sitio web" style="grid-column:1/-1;padding:9px 11px;border:1.5px solid #CBD5E1;border-radius:9px;font-size:0.84rem;"/>
        </div>

        <div style="background:#F8FAFC;border:1.5px dashed #CBD5E1;border-radius:14px;padding:18px;margin-bottom:14px;overflow-x:auto;">
          <div id="tbbEmailSigLivePreview"></div>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button type="button" id="tbbBtnCopySigRich" style="flex:1;background:#10B981;color:#FFFFFF;border:none;border-bottom:4px solid #047857;border-radius:12px;padding:12px 16px;font-family:'Montserrat',sans-serif;font-weight:900;font-size:0.84rem;cursor:pointer;">
            Copiar Firma Lista para Pegar (Gmail / Outlook)
          </button>
          <button type="button" id="tbbBtnDownloadSigHtml" style="flex:1;background:${pri};color:#FFFFFF;border:none;border-bottom:4px solid #090D16;border-radius:12px;padding:12px 16px;font-family:'Montserrat',sans-serif;font-weight:900;font-size:0.84rem;cursor:pointer;">
            Descargar Archivo .HTML
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    let latestHtml = "";
    const refreshPreview = async () => {
      state.personName = document.getElementById("sigInpName").value;
      state.roleTitle = document.getElementById("sigInpRole").value;
      state.phone = document.getElementById("sigInpPhone").value;
      state.email = document.getElementById("sigInpEmail").value;
      state.web = document.getElementById("sigInpWeb").value;
      latestHtml = await tbbBuildCorporateEmailSignatureHTML(brand, state);
      const prev = document.getElementById("tbbEmailSigLivePreview");
      if (prev) prev.innerHTML = latestHtml;
    };

    ["sigInpName", "sigInpRole", "sigInpPhone", "sigInpEmail", "sigInpWeb"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", refreshPreview);
    });
    await refreshPreview();

    document.getElementById("tbbCloseSigModal").onclick = () => modal.remove();
    document.getElementById("tbbBtnCopySigRich").onclick = async function () {
      try {
        if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
          const item = new ClipboardItem({
            "text/html": new Blob([latestHtml], { type: "text/html" }),
            "text/plain": new Blob([`${state.personName} · ${state.roleTitle} · ${state.phone} · ${state.email}`], { type: "text/plain" })
          });
          await navigator.clipboard.write([item]);
        } else {
          await navigator.clipboard.writeText(latestHtml);
        }
        this.textContent = "✓ ¡Firma Copiada! Pégala directo en Gmail / Outlook";
      } catch (e) {
        await navigator.clipboard.writeText(latestHtml);
        this.textContent = "✓ Código HTML Copiado al Portapapeles";
      }
    };
    document.getElementById("tbbBtnDownloadSigHtml").onclick = async () => {
      const fullDoc = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Firma Corporativa — ${xmlEsc(bName)}</title></head><body style="padding:32px;background:#F8FAFC;font-family:sans-serif;"><h3 style="color:${pri};">Firma Corporativa Lista para Correo (${xmlEsc(bName)})</h3><p style="color:#475569;font-size:13px;">Selecciona el bloque inferior, cópialo (Cmd+C / Ctrl+C) y pégalo en Configuración → Firma de Gmail, Outlook, Apple Mail o Zoho Mail:</p><div style="background:#FFFFFF;padding:24px;border-radius:12px;display:inline-block;border:1px solid #E2E8F0;">${latestHtml}</div></body></html>`;
      const blob = new Blob([fullDoc], { type: "text/html;charset=utf-8" });
      await window.tbbDeliverFileNativeOrDownload(blob, `Firma_Correo_Corporativa_${slug}.html`, "text/html", `Firma HTML — ${bName}`);
    };
  }

  async function tbbDownloadEmailSignatureHTML(triggerBtn) {
    const brand = window.buildActiveBrandProfileForV80();
    const slug = brand.slug || "marca";
    const bName = brand.name || "Tu Marca";
    const sigTable = await tbbBuildCorporateEmailSignatureHTML(brand);
    const fullDoc = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Firma Corporativa — ${xmlEsc(bName)}</title></head><body style="padding:32px;background:#F8FAFC;font-family:sans-serif;"><h3 style="color:${brand.colors?.pri || "#0D2540"};">Firma Corporativa Oficial — ${xmlEsc(bName)}</h3><p style="color:#475569;font-size:13px;">Copia la firma visual inferior y pégala directamente en Gmail, Outlook, Apple Mail o Zoho Mail:</p><div style="background:#FFFFFF;padding:24px;border-radius:12px;display:inline-block;border:1px solid #E2E8F0;">${sigTable}</div></body></html>`;
    const blob = new Blob([fullDoc], { type: "text/html;charset=utf-8" });
    if (triggerBtn) {
      const orig = triggerBtn.innerHTML;
      triggerBtn.textContent = "✓ Firma .HTML Lista";
      setTimeout(() => { triggerBtn.innerHTML = orig; }, 2500);
    }
    return window.tbbDeliverFileNativeOrDownload(blob, `Firma_Correo_Corporativa_${slug}.html`, "text/html", `Firma Corporativa HTML — ${bName}`);
  }

  // ==========================================================================
  // 7. MOTOR GOOGLE FLOW / GEMINI IMAGE PARA ILUSTRAR CAPÍTULOS DE MARCA
  // ==========================================================================
  function buildEditorialSvgSceneDataUrl(slotKey, brand) {
    const pri = brand.colors?.pri || "#0D2540";
    const sec = brand.colors?.sec || "#426EAE";
    const acc = brand.colors?.acc || "#FF7A00";
    const soft = brand.colors?.softBg || "#FAF8F5";
    const dark = brand.colors?.darkInk || "#090D16";
    const textCtx = `${brand.giro || ""} ${brand.persona || ""} ${brand.what || ""}`.toLowerCase();
    const isNature = /campamento|sierra|bosque|monta[ñn]a|naturaleza|ecotur|glamping|r[ií]o|fogata|sender/i.test(textCtx);
    const isFood = /restaurante|caf[eé]|panader|gastronom|cocina|bar|vino|mezcal|alimento/i.test(textCtx);

    let scenePaths = "";
    if (isNature) {
      if (slotKey === "persona") {
        // Guardabosques / guía cálido en la Sierra Gorda con montañas, pinos y taza humeante
        scenePaths = `
          <circle cx="480" cy="96" r="42" fill="${acc}" fill-opacity="0.22"/>
          <circle cx="480" cy="96" r="24" fill="${acc}"/>
          <path d="M0,255 L145,125 L265,215 L395,98 L535,210 L640,145 L640,360 L0,360 Z" fill="${pri}" fill-opacity="0.22"/>
          <path d="M0,285 L195,158 L335,248 L475,142 L640,262 L640,360 L0,360 Z" fill="${pri}" fill-opacity="0.48"/>
          <g fill="${pri}">
            <path d="M98,162 L68,225 H84 L60,275 H136 L112,225 H128 Z"/>
            <rect x="93" y="275" width="10" height="26" fill="${dark}"/>
            <path d="M548,154 L518,218 H534 L510,270 H586 L562,218 H578 Z"/>
            <rect x="543" y="270" width="10" height="28" fill="${dark}"/>
          </g>
          <!-- Figura humana editorial del guía/guardabosques -->
          <circle cx="310" cy="176" r="28" fill="#FDE68A" stroke="${dark}" stroke-width="2.5"/>
          <path d="M268,168 Q310,138 352,168 Z" fill="${acc}" stroke="${dark}" stroke-width="2.5"/>
          <ellipse cx="310" cy="168" rx="48" ry="7" fill="${pri}"/>
          <path d="M254,330 C258,244 276,216 310,216 C344,216 362,244 366,330 Z" fill="${pri}"/>
          <path d="M286,216 L310,256 L334,216" fill="none" stroke="${acc}" stroke-width="5" stroke-linecap="round"/>
          <!-- Taza de café de olla caliente con vapor -->
          <rect x="366" y="246" width="32" height="36" rx="6" fill="${acc}" stroke="#FFFFFF" stroke-width="2.5"/>
          <path d="M398,254 C410,254 410,274 398,274" fill="none" stroke="${acc}" stroke-width="4"/>
          <path d="M376,236 Q372,222 380,212 M388,236 Q384,220 392,208" fill="none" stroke="${acc}" stroke-width="2.8" stroke-linecap="round"/>
        `;
      } else if (slotKey === "buyer") {
        // Familia feliz explorando sendero natural con niños
        scenePaths = `
          <circle cx="515" cy="84" r="34" fill="${acc}" fill-opacity="0.88"/>
          <path d="M0,250 Q160,120 330,215 T640,175 L640,360 L0,360 Z" fill="${pri}" fill-opacity="0.22"/>
          <path d="M0,290 Q220,210 430,275 T640,250 L640,360 L0,360 Z" fill="${pri}" fill-opacity="0.55"/>
          <path d="M240,360 C275,305 345,295 395,255 C425,232 465,228 520,235" fill="none" stroke="#FDE68A" stroke-width="18" stroke-linecap="round"/>
          <!-- Padres e hijos tomados de la mano -->
          <circle cx="215" cy="192" r="20" fill="#FDE68A"/><path d="M188,315 C192,242 200,220 215,220 C230,220 238,242 242,315 Z" fill="${pri}"/>
          <circle cx="280" cy="226" r="15" fill="#FDE68A"/><path d="M260,315 C264,268 270,248 280,248 C290,248 296,268 300,315 Z" fill="${acc}"/>
          <circle cx="340" cy="232" r="14" fill="#FDE68A"/><path d="M322,315 C325,272 331,252 340,252 C349,252 355,272 358,315 Z" fill="${sec}"/>
          <circle cx="405" cy="196" r="19" fill="#FDE68A"/><path d="M380,315 C384,246 392,224 405,224 C418,224 426,246 430,315 Z" fill="${dark}"/>
        `;
      } else if (slotKey === "tpDuring") {
        // Fogata nocturna/atardecer, tienda glamping y cielo estrellado con telescopio
        scenePaths = `
          <rect x="0" y="0" width="640" height="360" fill="${dark}"/>
          <circle cx="110" cy="68" r="3" fill="#FDE68A"/><circle cx="195" cy="48" r="2.5" fill="#FFFFFF"/>
          <circle cx="310" cy="62" r="4" fill="${acc}"/><circle cx="445" cy="52" r="3" fill="#FDE68A"/><circle cx="545" cy="82" r="2.5" fill="#FFFFFF"/>
          <path d="M0,250 L150,138 L295,232 L460,118 L640,238 L640,360 L0,360 Z" fill="${pri}" fill-opacity="0.58"/>
          <!-- Tienda Glamping iluminada -->
          <path d="M96,288 L196,172 L296,288 Z" fill="#FAF8F5" stroke="${acc}" stroke-width="4"/>
          <path d="M162,288 L196,216 L230,288 Z" fill="${acc}" fill-opacity="0.88"/>
          <!-- Fogata cálida central -->
          <circle cx="415" cy="272" r="52" fill="${acc}" fill-opacity="0.22"/>
          <path d="M415,214 C442,242 446,274 415,288 C384,274 388,242 415,214 Z" fill="${acc}"/>
          <path d="M415,238 C430,254 430,274 415,284 C400,274 400,254 415,238 Z" fill="#FDE68A"/>
          <rect x="382" y="286" width="66" height="10" rx="5" fill="#78350F" transform="rotate(-12 415 291)"/>
          <rect x="382" y="286" width="66" height="10" rx="5" fill="#92400E" transform="rotate(12 415 291)"/>
          <!-- Telescopio astronómico -->
          <line x1="528" y1="226" x2="508" y2="294" stroke="#E2E8F0" stroke-width="3.5"/>
          <line x1="528" y1="226" x2="548" y2="294" stroke="#E2E8F0" stroke-width="3.5"/>
          <rect x="496" y="204" width="62" height="14" rx="5" fill="#FFFFFF" transform="rotate(-24 527 211)"/>
        `;
      } else {
        // Cabañas sustentables, río cristalino y puente colgante en bosque de niebla
        scenePaths = `
          <path d="M0,220 L165,96 L325,208 L485,88 L640,196 L640,360 L0,360 Z" fill="${pri}" fill-opacity="0.25"/>
          <path d="M0,265 Q180,225 340,268 T640,248 L640,360 L0,360 Z" fill="${pri}" fill-opacity="0.62"/>
          <!-- Río cristalino serpenteante -->
          <path d="M295,258 C255,288 365,312 285,360 L395,360 C455,312 335,286 355,258 Z" fill="#38BDF8" fill-opacity="0.82"/>
          <!-- Cabaña sustentable de madera -->
          <path d="M92,216 L168,156 L244,216 Z" fill="${acc}"/>
          <rect x="110" y="216" width="116" height="68" rx="6" fill="#FFFFFF" stroke="${pri}" stroke-width="3"/>
          <rect x="148" y="236" width="40" height="48" rx="4" fill="${acc}" fill-opacity="0.85"/>
          <!-- Puente colgante escénico -->
          <path d="M355,196 Q470,242 585,192" fill="none" stroke="${acc}" stroke-width="5"/>
          <path d="M355,214 Q470,260 585,210" fill="none" stroke="${dark}" stroke-width="3"/>
        `;
      }
    } else if (isFood) {
      scenePaths = `
        <circle cx="320" cy="175" r="98" fill="#FFFFFF" stroke="${pri}" stroke-width="4"/>
        <circle cx="320" cy="175" r="72" fill="${soft}" stroke="${acc}" stroke-width="2.5" stroke-dasharray="6 4"/>
        <path d="M268,192 C268,148 372,148 372,192 Z" fill="${pri}"/>
        <path d="M295,126 Q288,104 300,88 M322,122 Q315,98 328,82 M348,126 Q342,104 352,88" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
      `;
    } else {
      scenePaths = `
        <circle cx="490" cy="108" r="68" fill="${acc}" fill-opacity="0.16"/>
        <rect x="84" y="76" width="260" height="196" rx="22" fill="#FFFFFF" stroke="${pri}" stroke-width="3"/>
        <rect x="114" y="110" width="140" height="18" rx="9" fill="${pri}"/>
        <rect x="114" y="142" width="196" height="12" rx="6" fill="${sec}" fill-opacity="0.65"/>
        <rect x="114" y="166" width="172" height="12" rx="6" fill="#CBD5E1"/>
        <rect x="114" y="206" width="112" height="32" rx="16" fill="${acc}"/>
        <circle cx="446" cy="196" r="64" fill="${pri}"/>
        <path d="M418,196 L438,216 L476,176" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bg_${slotKey}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="55%" stop-color="${soft}"/>
          <stop offset="100%" stop-color="${pri}" stop-opacity="0.14"/>
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#bg_${slotKey})"/>
      <g transform="translate(0, 60)">
        ${scenePaths}
      </g>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  }

  window._tbbFlowVisualsCache = window._tbbFlowVisualsCache || {};

  // Recorta/normaliza cualquier imagen generada exactamente a 4:3 (960x720) preservando la proporción 1:1 de píxeles (CERO estiramiento ni deformación)
  async function normalizePhotoToLocked4x3Canvas(rawDataUrl) {
    if (!rawDataUrl || typeof document === "undefined") return rawDataUrl;
    return new Promise((resolve) => {
      const img = new Image();
      if (!rawDataUrl.startsWith("data:")) img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const targetW = 960;
          const targetH = 720; // Proporción exacta 4:3 bloqueada
          const sw = img.naturalWidth || img.width || targetW;
          const sh = img.naturalHeight || img.height || targetH;
          const cnv = document.createElement("canvas");
          cnv.width = targetW;
          cnv.height = targetH;
          const ctx = cnv.getContext("2d");
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, targetW, targetH);

          // Escalado uniforme (Math.max) sin alterar jamás la relación de aspecto original; encuadre superior (22%) para no cortar cabezas
          const scale = Math.max(targetW / sw, targetH / sh);
          const drawW = sw * scale;
          const drawH = sh * scale;
          const dx = (targetW - drawW) * 0.5;
          const dy = (targetH - drawH) * 0.22;
          ctx.drawImage(img, dx, dy, drawW, drawH);
          resolve(cnv.toDataURL("image/jpeg", 0.92));
        } catch (err) {
          resolve(rawDataUrl);
        }
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    });
  }

  async function generateSingleFlowIllustration(promptText, slotKey, brand, aspectRatio = "4:3") {
    const models = ["gemini-3.1-flash-image-preview", "gemini-3-pro-image-preview", "gemini-2.5-flash-image"];
    const proxyUrl = (window.TBB_API_BASE || "") + "/api/v1/gemini/proxy";
    for (const model of models) {
      try {
        const genCfg = { responseModalities: ["IMAGE", "TEXT"] };
        if (model !== "gemini-2.5-flash-image" && aspectRatio) {
          genCfg.imageConfig = { aspectRatio: aspectRatio };
        }
        const resp = await fetch(proxyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model,
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: genCfg
          })
        });
        if (!resp.ok) continue;
        const data = await resp.json();
        const parts = data?.candidates?.[0]?.content?.parts || [];
        for (const p of parts) {
          if (p?.inlineData?.data) {
            const mime = p.inlineData.mimeType || "image/png";
            const rawUrl = `data:${mime};base64,${p.inlineData.data}`;
            return await normalizePhotoToLocked4x3Canvas(rawUrl);
          }
        }
      } catch (e) {
        console.warn("Flow chapter photo fallback:", e);
      }
    }
    const slug = String(brand?.slug || "").toLowerCase();
    const isArcoBrand = /^arco(_ingenier[ií]a)?$/i.test(slug);
    const photoPrefix = isArcoBrand ? "arco" : "tbb";
    const editorialFallbackMap = {
      persona: `/assets/editorial_photos/${photoPrefix}_01_persona.jpg`,
      step0_splash: `/assets/editorial_photos/${photoPrefix}_01_persona.jpg`,
      buyer: `/assets/editorial_photos/${photoPrefix}_02_buyer.jpg`,
      step1_golden: `/assets/editorial_photos/${photoPrefix}_02_buyer.jpg`,
      tpBefore: `/assets/editorial_photos/${photoPrefix}_03_tp_before.jpg`,
      step3_touchpoints: `/assets/editorial_photos/${photoPrefix}_03_tp_before.jpg`,
      tpDuring: `/assets/editorial_photos/${photoPrefix}_04_tp_during.jpg`,
      step4_kansei: `/assets/editorial_photos/${photoPrefix}_04_tp_during.jpg`,
      tpAfter: `/assets/editorial_photos/${photoPrefix}_05_tp_after.jpg`,
      step5_atelier: `/assets/editorial_photos/${photoPrefix}_05_tp_after.jpg`,
      environment: `/assets/editorial_photos/${photoPrefix}_06_environment.jpg`,
      step6_map: `/assets/editorial_photos/${photoPrefix}_06_environment.jpg`
    };
    const fallbackPhotoUrl = editorialFallbackMap[slotKey] || `/assets/editorial_photos/${photoPrefix}_06_environment.jpg`;
    return await normalizePhotoToLocked4x3Canvas(fallbackPhotoUrl);
  }

  async function tbbGenerateChapterVisualsWithFlow(brandOrBtn, onProgress) {
    const isDomButton = brandOrBtn && typeof brandOrBtn === "object" && (brandOrBtn.tagName === "BUTTON" || typeof brandOrBtn.textContent === "string");
    const triggerBtn = isDomButton ? brandOrBtn : null;
    const origBtnHtml = triggerBtn ? triggerBtn.innerHTML : "";
    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.textContent = "Fotografiando capítulos (0/6)...";
    }
    const brand = (!isDomButton && brandOrBtn && brandOrBtn.slug) ? brandOrBtn : window.buildActiveBrandProfileForV80();
    const cacheKey = `photo_v88|${brand.slug}|${(brand.giro || "").slice(0, 32)}`;
    window._tbbFlowVisualsInFlight = window._tbbFlowVisualsInFlight || {};
    if (window._tbbFlowVisualsCache[cacheKey] && window._tbbFlowVisualsCache[cacheKey]._complete) {
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = "✓ Fotografía Editorial 4:3 Lista";
        setTimeout(() => { if (origBtnHtml) triggerBtn.innerHTML = origBtnHtml; }, 2200);
      }
      return window._tbbFlowVisualsCache[cacheKey];
    }
    if (window._tbbFlowVisualsInFlight[cacheKey]) {
      return window._tbbFlowVisualsInFlight[cacheKey];
    }

    const isTbbDedicatedPhotos = /^the_?best_?brand$/i.test(brand.slug);
    if (isTbbDedicatedPhotos) {
      const tbbEntry = {
        persona: "/assets/editorial_photos/tbb_01_persona.jpg",
        step0_splash: "/assets/editorial_photos/tbb_01_persona.jpg",
        buyer: "/assets/editorial_photos/tbb_02_buyer.jpg",
        step1_golden: "/assets/editorial_photos/tbb_02_buyer.jpg",
        tpBefore: "/assets/editorial_photos/tbb_03_tp_before.jpg",
        step3_touchpoints: "/assets/editorial_photos/tbb_03_tp_before.jpg",
        tpDuring: "/assets/editorial_photos/tbb_04_tp_during.jpg",
        step4_kansei: "/assets/editorial_photos/tbb_04_tp_during.jpg",
        tpAfter: "/assets/editorial_photos/tbb_05_tp_after.jpg",
        step5_atelier: "/assets/editorial_photos/tbb_05_tp_after.jpg",
        environment: "/assets/editorial_photos/tbb_06_environment.jpg",
        step6_map: "/assets/editorial_photos/tbb_06_environment.jpg",
        _complete: true
      };
      window._tbbFlowVisualsCache[cacheKey] = tbbEntry;
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = "✓ Fotografía Editorial 4:3 de The Best Brand Lista";
        setTimeout(() => { if (origBtnHtml) triggerBtn.innerHTML = origBtnHtml; }, 2200);
      }
      return tbbEntry;
    }

    const pri = brand.colors?.pri || "#0D2540";
    const sec = brand.colors?.sec || "#426EAE";
    const acc = brand.colors?.acc || "#FF7A00";
    const photoStyle = `Award-winning editorial magazine photography (Kinfolk / Cereal Magazine / Architectural Digest / Monocle), captured on medium-format Hasselblad X2D 50mm f/2.5 lens, natural golden-hour daylight, tactile organic materials (travertine stone, warm oak wood, brushed metal, raw linen, natural skin tones), subtle chromatic harmony with ${pri}, ${sec}, and warm accent ${acc}. STRICTLY REAL PHOTOGRAPHY (zero cartoon, zero flat vector illustration, zero comic outlines, zero 3D CGI render), zero text, no words, no signs with letters, no watermarks, locked 4:3 horizontal composition with generous headroom so heads and subjects are never cropped or stretched.`;

    const jobs = [
      {
        key: "persona",
        alias: "step0_splash",
        aspect: "4:3",
        label: "La Empresa como Persona",
        prompt: `Authentic editorial environmental portrait photograph representing the human archetype of "${brand.name}" (${brand.giro}): ${brand.persona}. Warm, composed expert in their real craft studio or architectural workspace, medium-wide 4:3 horizontal framing with generous breathing room above the head. ${photoStyle}`
      },
      {
        key: "buyer",
        alias: "step1_golden",
        aspect: "4:3",
        label: "Cliente Ideal (Buyer Persona)",
        prompt: `Candid luxury editorial lifestyle photograph of the ideal customer of "${brand.name}": ${brand.buyer}, genuinely enjoying ${brand.what} in a sunlit refined setting, natural expressions, medium-wide horizontal 4:3 composition with full headroom. ${photoStyle}`
      },
      {
        key: "tpBefore",
        alias: "step3_touchpoints",
        aspect: "4:3",
        label: "Touchpoint Antes de Comprar",
        prompt: `High-end editorial photograph of the first discovery touchpoint for "${brand.name}" (${brand.giro}): ${(brand.tpBefore && brand.tpBefore[0]) || "welcoming boutique entrance or curated digital discovery moment"}, clean architectural lines and natural light, 4:3 horizontal frame. ${photoStyle}`
      },
      {
        key: "tpDuring",
        alias: "step4_kansei",
        aspect: "4:3",
        label: "Touchpoint Durante el Servicio",
        prompt: `Editorial medium documentary photograph of the signature service experience of "${brand.name}" (${brand.giro}): ${(brand.tpDuring && brand.tpDuring[0]) || "bespoke consultation and tactile presentation"}, authentic human connection, real materials, warm hospitality, 4:3 horizontal frame. ${photoStyle}`
      },
      {
        key: "tpAfter",
        alias: "step5_atelier",
        aspect: "4:3",
        label: "Touchpoint Después del Servicio",
        prompt: `Tactile editorial still-life and lifestyle photograph of the post-purchase keepsake, bespoke packaging, certificate, or lasting relationship of "${brand.name}" (${brand.giro}): ${(brand.tpAfter && brand.tpAfter[0]) || "signature keepsake box, certificate of authenticity and lasting relationship"} resting on natural stone or warm timber in soft morning sunlight, 4:3 horizontal composition. ${photoStyle}`
      },
      {
        key: "environment",
        alias: "step6_map",
        aspect: "4:3",
        label: "Espacio Físico y Arquitectura de Marca",
        prompt: `Architectural Digest style wide-angle interior & exterior flagship photograph of "${brand.name}" (${brand.giro}), refined contemporary architecture, museum-grade lighting, noble materials, zero text on walls, 4:3 horizontal composition. ${photoStyle}`
      }
    ];

    const entry = window._tbbFlowVisualsCache[cacheKey] || {};
    window._tbbFlowVisualsCache[cacheKey] = entry;

    let done = 0;
    const runPromise = (async () => {
      for (const j of jobs) {
        if (!entry[j.key] || String(entry[j.key]).startsWith("data:image/svg")) {
          const url = await generateSingleFlowIllustration(j.prompt, j.key, brand, j.aspect || "4:3");
          if (url) {
            entry[j.key] = url;
            if (j.alias) entry[j.alias] = url;
          }
        } else if (j.alias && !entry[j.alias]) {
          entry[j.alias] = entry[j.key];
        }
        done++;
        if (triggerBtn) triggerBtn.textContent = `Fotografía Editorial 4:3 (${done}/${jobs.length})...`;
        if (typeof onProgress === "function") onProgress(done, jobs.length, j.label);
        if (typeof window.renderTbbZeroScrollStage === "function") {
          window.renderTbbZeroScrollStage();
        }
      }

      const realRasterCount = Object.values(entry).filter(v => typeof v === "string" && /^data:image\/(png|jpeg|webp)/i.test(v)).length;
      entry._complete = realRasterCount >= 4;
      delete window._tbbFlowVisualsInFlight[cacheKey];
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = "✓ Fotografía Editorial 4:3 Lista";
        if (typeof window.renderTbbZeroScrollStage === "function") {
          window.renderTbbZeroScrollStage();
        }
        setTimeout(() => { if (origBtnHtml) triggerBtn.innerHTML = origBtnHtml; }, 2600);
      }
      return entry;
    })();
    window._tbbFlowVisualsInFlight[cacheKey] = runPromise;
    return runPromise;
  }

  async function tbbGenerateNanoBananaBrandSymbol(userHint) {
    const cs = (typeof window.canvasState === "object" && window.canvasState) ? window.canvasState : {};
    const st = window.tbbState || {};
    const s0 = window.step0State || {};
    const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "Tu Marca";
    const giro = (cs.custom_business_type || cs.step0_short_essence || "Servicios profesionales").trim();
    const persona = (cs.brand_persona || "").trim();
    const seedIdea = String(userHint || cs.step4_logo_seed_idea || "").trim();
    const uploadedCols = (Array.isArray(cs.uploaded_logo_colors) && cs.uploaded_logo_colors.length)
      ? cs.uploaded_logo_colors
      : (Array.isArray(s0.uploadedLogoColors) ? s0.uploadedLogoColors : []);
    const pri = (uploadedCols[0]) || st.logoPriHex || cs.primary_color || (Array.isArray(cs.selected_colors_hex) && cs.selected_colors_hex[2]) || "#0078C0";
    const sec = (uploadedCols[1]) || st.logoSecHex || cs.secondary_color || (Array.isArray(cs.selected_colors_hex) && cs.selected_colors_hex[3]) || pri;
    const acc = (uploadedCols[2]) || cs.accent_color || sec;

    const firstIter = (Array.isArray(st.logoIterations) && st.logoIterations[0]) ? st.logoIterations[0] : null;
    const baseLogoDataUrl = (firstIter && firstIter.isUploadedUserLogo && firstIter.uploadedLogoDataUrl)
      || cs.base_uploaded_logo_data_url
      || cs.uploaded_logo_data_url
      || s0.uploadedLogoDataUrl
      || "";
    const isEvolveMode = Boolean(baseLogoDataUrl && (cs.existing_logo_mode === "evolve" || s0.existingLogoMode === "evolve" || userHint));

    st.geminiBusy = true;
    st.geminiStatusText = isEvolveMode
      ? `NanoBanana PRO evolucionando tu logotipo base preservando su paleta original (${pri}, ${sec}, ${acc})...`
      : "NanoBanana PRO diseñando tu símbolo de agencia y trazando curvas Bézier...";
    if (typeof window.renderTbbZeroScrollStage === "function") window.renderTbbZeroScrollStage();

    const wantsLiquidGlass = /liquid\s*glass|apple|vision\s*os|ios\s*27|cristal\s*l[ií]quido|transl[uú]cido|refracci[oó]n/i.test(`${seedIdea} ${persona} ${st.logoParadigm || ""}`);
    const prompt = isEvolveMode
      ? [
          `Take the attached current base logo of "${bName}" (${giro}) as direct structural inspiration and evolve it into a world-class executive brand emblem (ICON MARK ONLY, ZERO TEXT, NO WORDS, NO LETTERS).`,
          wantsLiquidGlass
            ? `STYLE DIRECTION — APPLE LIQUID GLASS (visionOS / iOS 27 Optical Glass Masterpiece): Transform the exact motif of the attached base logo into a breathtaking Apple-grade 3D Liquid Glass icon mark. Render the outer ring, internal dark optical sphere, radial translucent petals/ellipses, and glowing core with physically accurate translucent crystal refraction, specular caustic highlights, frosted glass depth, subsurface scattering, and precision micro-bevels.`
            : `Preserve the recognizable core motif and structural essence of the base logo, but elevate its geometry to mathematical perfection: golden-ratio architectural precision, clean bold dimensional facets, commanding presence, and timeless authority.`,
          seedIdea ? `Specific evolution direction: ${seedIdea}.` : "",
          persona ? `Brand character: ${persona}.` : "",
          `STRICT COLOR RULE: Preserve 100% the original brand color palette from the base logo: primary (${pri}), secondary (${sec}), and structural accent (${acc}). Center the emblem on a pure solid stark white #FFFFFF background with generous margin.`
        ].filter(Boolean).join(" ")
      : [
          `Masterpiece corporate logo symbol (ICON MARK ONLY, ZERO TEXT, NO LETTERS, NO WORDS, NO TYPOGRAPHY) for brand "${bName}" in sector: ${giro}.`,
          seedIdea ? `Visual concept & motif requested: ${seedIdea}.` : "",
          persona ? `Brand personality: ${persona}.` : "",
          wantsLiquidGlass
            ? `Apple visionOS / iOS 27 Liquid Glass emblem design: translucent optical glass geometry, specular caustic refractions, multi-layered 3D crystal depth, strictly using the brand palette (${pri} primary, ${sec} secondary, and ${acc} accent) centered on a pure solid stark white #FFFFFF background.`
            : `Pentagram / Chermayeff & Geismar / Sagi Haviv award-winning emblem design: bold architectural vector geometry, balanced negative space, strictly using the brand palette (${pri} primary, ${sec} secondary, and ${acc} accent) centered on a pure solid stark white #FFFFFF background.`,
          `No photorealistic clutter, no thin hairlines, no mockups, no frames touching edges, generous white margin around the emblem.`
        ].filter(Boolean).join(" ");

    const requestParts = [];
    if (isEvolveMode && /^data:image\/(png|jpeg|jpg|webp);base64,/i.test(baseLogoDataUrl)) {
      const m = baseLogoDataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (m) {
        requestParts.push({
          inlineData: {
            mimeType: m[1],
            data: m[2]
          }
        });
      }
    }
    requestParts.push({ text: prompt });

    const proxyUrl = (window.TBB_API_BASE || "") + "/api/v1/gemini/proxy";
    const models = ["gemini-3.1-flash-image-preview", "gemini-3-pro-image-preview", "gemini-2.5-flash-image"];
    let rawImgUrl = "";

    for (const model of models) {
      try {
        const resp = await fetch(proxyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model,
            contents: [{ parts: requestParts }],
            generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
          })
        });
        if (!resp.ok) continue;
        const data = await resp.json();
        const parts = data?.candidates?.[0]?.content?.parts || [];
        for (const p of parts) {
          if (p?.inlineData?.data) {
            const mime = p.inlineData.mimeType || "image/png";
            rawImgUrl = `data:${mime};base64,${p.inlineData.data}`;
            break;
          }
        }
        if (rawImgUrl) break;
      } catch (err) {
        console.warn("Nano Banana logo error:", err);
      }
    }

    if (rawImgUrl) {
      const centeredPng = await tbbAutoTrimAndCenterRasterLogo(rawImgUrl, 1024, 0.80);
      const tracedCurves = await tbbVectorizeRasterLogoToSvgCurves(centeredPng);

      if (!window.step0State) window.step0State = {};
      if (baseLogoDataUrl && !cs.base_uploaded_logo_data_url) {
        cs.base_uploaded_logo_data_url = baseLogoDataUrl;
        window.step0State.baseUploadedLogoDataUrl = baseLogoDataUrl;
      }
      window.step0State.uploadedLogoDataUrl = centeredPng;
      window.step0State.uploadedLogoTracedCurvesSvg = tracedCurves || "";
      cs.uploaded_logo_data_url = centeredPng;
      cs.uploaded_logo_traced_curves_svg = tracedCurves || "";
      cs.existing_logo_mode = "evolve";

      if (!Array.isArray(st.logoIterations) || st.logoIterations.length === 0) {
        if (baseLogoDataUrl) {
          st.logoIterations = [{
            idx: 1,
            isInitialSystemic: false,
            isUploadedUserLogo: true,
            uploadedLogoDataUrl: baseLogoDataUrl,
            uploadedLogoSvgMarkup: "",
            paradigm: st.logoParadigm || "volumetric_glass",
            archetype: "uploaded_user_logo",
            conceptLabel: "Tu Logo Base Actual",
            pri: pri,
            sec: sec,
            accentHex: acc,
            scale: 1.0,
            darkBg: Boolean(st.logoDarkBg),
            fontFamily: cs.primary_font || st.selectedFontFamily || "Montserrat",
            layout: "horizontal",
            mods: {},
            geminiCustomSvg: "",
            svgOverlayAdditions: "",
            note: `Logotipo actual tomado como base para ${bName}`,
            prompt: `Logotipo actual subido como punto de partida para evolucionar la identidad de «${bName}».`,
            geminiPrompt40w: `Logotipo actual subido como punto de partida para evolucionar la identidad de «${bName}».`
          }];
        } else {
          st.logoIterations = [];
        }
      }

      const nextIdx = st.logoIterations.length + 1;
      const nbLabel = wantsLiquidGlass ? `Liquid Glass #${nextIdx}` : "Evolución NanoBanana PRO";
      const nbEntry = {
        idx: nextIdx,
        isInitialSystemic: false,
        isUploadedUserLogo: true,
        isNanoBananaGenerated: true,
        uploadedLogoDataUrl: centeredPng,
        tracedCurvesSvg: tracedCurves || "",
        uploadedLogoSvgMarkup: "",
        paradigm: st.logoParadigm || "volumetric_glass",
        archetype: "uploaded_user_logo",
        conceptLabel: nbLabel,
        pri: pri,
        sec: sec,
        accentHex: acc,
        scale: 1.0,
        darkBg: Boolean(st.logoDarkBg),
        fontFamily: cs.primary_font || st.selectedFontFamily || "Montserrat",
        layout: "horizontal",
        mods: {},
        geminiCustomSvg: "",
        svgOverlayAdditions: "",
        note: seedIdea || `Evolución NanoBanana PRO desde tu Logo Base para ${bName}`,
        prompt: wantsLiquidGlass
          ? `Evolución Apple Liquid Glass sobre tu logo base de «${bName}» (${pri}, ${sec}, ${acc}) con refracción cáustica, pétalos translúcidos y centrado óptico a 0.00px.`
          : `Evolución arquitectónica NanoBanana PRO tomando tu logo actual como base para «${bName}» (${pri}, ${sec}, ${acc}), centrado a 0.00px y vectorizado en curvas Bézier.`,
        geminiPrompt40w: wantsLiquidGlass
          ? `Evolución Apple Liquid Glass sobre tu logo base de «${bName}» (${pri}, ${sec}, ${acc}) con refracción cáustica, pétalos translúcidos y centrado óptico a 0.00px.`
          : `Evolución arquitectónica NanoBanana PRO tomando tu logo actual como base para «${bName}» (${pri}, ${sec}, ${acc}), centrado a 0.00px y vectorizado en curvas Bézier.`
      };
      st.logoIterations.push(nbEntry);
      st.logoIterationIndex = st.logoIterations.length;
      if (typeof window.saveBrandSessionToLocalStorage === "function") window.saveBrandSessionToLocalStorage();
    }

    st.geminiBusy = false;
    st.geminiStatusText = "";
    if (typeof window.renderTbbZeroScrollStage === "function") window.renderTbbZeroScrollStage();
    return rawImgUrl;
  }

  // ==========================================================================
  // 7. EXPORTADOR DE KIT DE FUENTES OFICIALES DE LA MARCA (.ZIP CON ARCHIVOS .TTF + LICENCIA SIL OFL + MODO HÍBRIDO ADOBE FONTS TYPEKIT)
  // ==========================================================================
  const TBB_FONT_FILES_INDEX = {
    "montserrat": ["Montserrat-Regular.ttf", "Montserrat-Bold.ttf", "Montserrat-Black.ttf"],
    "plus jakarta sans": ["PlusJakartaSans-Regular.ttf", "PlusJakartaSans-Bold.ttf", "PlusJakartaSans-ExtraBold.ttf"],
    "outfit": ["Outfit-Regular.ttf", "Outfit-Bold.ttf"],
    "league spartan": ["LeagueSpartan-Regular.ttf", "LeagueSpartan-Bold.ttf"],
    "urbanist": ["Urbanist-Regular.ttf", "Urbanist-Bold.ttf"],
    "space grotesk": ["SpaceGrotesk-Regular.ttf", "SpaceGrotesk-Bold.ttf"],
    "inter": ["Inter-Regular.ttf", "Inter-Bold.ttf"],
    "sora": ["Sora-Regular.ttf", "Sora-Bold.ttf"],
    "manrope": ["Manrope-Regular.ttf", "Manrope-Bold.ttf"],
    "playfair display": ["PlayfairDisplay-Regular.ttf", "PlayfairDisplay-Bold.ttf"],
    "cormorant garamond": ["CormorantGaramond-Regular.ttf", "CormorantGaramond-Bold.ttf"],
    "cinzel": ["Cinzel-Regular.ttf", "Cinzel-Bold.ttf"],
    "libre baskerville": ["LibreBaskerville-Regular.ttf", "LibreBaskerville-Bold.ttf"],
    "fraunces": ["Fraunces-Regular.ttf", "Fraunces-Bold.ttf"],
    "syne": ["Syne-Regular.ttf", "Syne-Bold.ttf", "Syne-ExtraBold.ttf"],
    "oswald": ["Oswald-Regular.ttf", "Oswald-Bold.ttf"],
    "bebas neue": ["BebasNeue-Regular.ttf"],
    "archivo black": ["ArchivoBlack-Regular.ttf"],
    "dm sans": ["DMSans-Regular.ttf", "DMSans-Bold.ttf"],
    "work sans": ["WorkSans-Regular.ttf", "WorkSans-Bold.ttf"],
    "lato": ["Lato-Regular.ttf", "Lato-Bold.ttf"],
    "jetbrains mono": ["JetBrainsMono-Regular.ttf", "JetBrainsMono-Bold.ttf"],
    "ibm plex mono": ["IBMPlexMono-Regular.ttf", "IBMPlexMono-Bold.ttf"],
    "space mono": ["SpaceMono-Regular.ttf", "SpaceMono-Bold.ttf"],
    // Homólogos métricos 100% Open Source (SIL OFL 1.1) para cuando se selecciona una fuente Adobe Fonts:
    // Cumple 100% el EULA de Adobe (que prohíbe empaquetar binarios comerciales en .ZIP para terceros)
    // entregando los .TTF libres equivalentes + las instrucciones de activación en Creative Cloud y Typekit CSS.
    "avenir next": ["PlusJakartaSans-Regular.ttf", "PlusJakartaSans-Bold.ttf", "PlusJakartaSans-ExtraBold.ttf"],
    "proxima nova": ["Montserrat-Regular.ttf", "Montserrat-Bold.ttf", "Montserrat-Black.ttf"],
    "futura pt": ["Outfit-Regular.ttf", "Outfit-Bold.ttf"],
    "brandon grotesque": ["LeagueSpartan-Regular.ttf", "LeagueSpartan-Bold.ttf"],
    "neue haas grotesk": ["Inter-Regular.ttf", "Inter-Bold.ttf"],
    "acumin pro": ["SpaceGrotesk-Regular.ttf", "SpaceGrotesk-Bold.ttf"],
    "aktiv grotesk": ["Manrope-Regular.ttf", "Manrope-Bold.ttf"],
    "din 2014": ["Oswald-Regular.ttf", "Oswald-Bold.ttf"],
    "adobe garamond pro": ["CormorantGaramond-Regular.ttf", "CormorantGaramond-Bold.ttf"],
    "minion pro": ["LibreBaskerville-Regular.ttf", "LibreBaskerville-Bold.ttf"],
    "freight display pro": ["PlayfairDisplay-Regular.ttf", "PlayfairDisplay-Bold.ttf"],
    "baskerville urw": ["LibreBaskerville-Regular.ttf", "LibreBaskerville-Bold.ttf"]
  };

  const TBB_ADOBE_FONTS_EQUIVALENT_MAP = {
    "proxima nova": { adobeName: "Proxima Nova", oflPartner: "Montserrat", adobeUrl: "https://fonts.adobe.com/fonts/proxima-nova" },
    "futura pt": { adobeName: "Futura PT", oflPartner: "Outfit", adobeUrl: "https://fonts.adobe.com/fonts/futura-pt" },
    "avenir next": { adobeName: "Avenir Next", oflPartner: "Plus Jakarta Sans", adobeUrl: "https://fonts.adobe.com/fonts/avenir-next" },
    "brandon grotesque": { adobeName: "Brandon Grotesque", oflPartner: "League Spartan", adobeUrl: "https://fonts.adobe.com/fonts/brandon-grotesque" },
    "neue haas grotesk": { adobeName: "Neue Haas Grotesk", oflPartner: "Inter", adobeUrl: "https://fonts.adobe.com/fonts/neue-haas-grotesk" },
    "acumin pro": { adobeName: "Acumin Pro", oflPartner: "Space Grotesk", adobeUrl: "https://fonts.adobe.com/fonts/acumin" },
    "aktiv grotesk": { adobeName: "Aktiv Grotesk", oflPartner: "Manrope", adobeUrl: "https://fonts.adobe.com/fonts/aktiv-grotesk" },
    "din 2014": { adobeName: "DIN 2014", oflPartner: "Oswald", adobeUrl: "https://fonts.adobe.com/fonts/din-2014" },
    "adobe garamond pro": { adobeName: "Adobe Garamond Pro", oflPartner: "Cormorant Garamond", adobeUrl: "https://fonts.adobe.com/fonts/adobe-garamond" },
    "minion pro": { adobeName: "Minion Pro", oflPartner: "Libre Baskerville", adobeUrl: "https://fonts.adobe.com/fonts/minion" },
    "freight display pro": { adobeName: "Freight Display Pro", oflPartner: "Playfair Display", adobeUrl: "https://fonts.adobe.com/fonts/freight-display" },
    "baskerville urw": { adobeName: "Baskerville URW", oflPartner: "Libre Baskerville", adobeUrl: "https://fonts.adobe.com/fonts/baskerville-urw" }
  };

  function resolveFontFilesForFamily(famName, fallbackFam) {
    const clean = String(famName || fallbackFam || "Montserrat")
      .split(",")[0]
      .replace(/['"]/g, "")
      .trim()
      .toLowerCase();
    return TBB_FONT_FILES_INDEX[clean] || TBB_FONT_FILES_INDEX[String(fallbackFam || "montserrat").toLowerCase()] || TBB_FONT_FILES_INDEX["montserrat"];
  }

  async function tbbDownloadBrandFontsZip(triggerBtn) {
    const origHtml = triggerBtn ? triggerBtn.innerHTML : "";
    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.textContent = "Empaquetando Kit Híbrido de Fuentes (.TTF + Typekit)...";
    }
    try {
      const brand = (typeof window.buildActiveBrandProfileForV80 === "function")
        ? window.buildActiveBrandProfileForV80()
        : {};
      const cs = window.canvasState || {};
      const st = window.tbbState || {};
      const bName = brand.name || cs.brandName || "TheBestBrand";
      const safeSlug = String(brand.slug || bName).replace(/[^a-zA-Z0-9_-]+/g, "_") || "Marca";

      const priFont = brand.primaryFont || cs.primary_font || st.selectedFontFamily || "Montserrat";
      const secFont = brand.secondaryFont || cs.secondary_font || st.selectedSecondaryFont || (priFont === "Plus Jakarta Sans" ? "Inter" : "Plus Jakarta Sans");
      const monoFont = brand.monoFont || cs.mono_font || st.selectedMonoFont || "JetBrains Mono";
      const adobeKitId = String(brand.adobeTypekitId || cs.adobe_typekit_id || st.adobeTypekitId || "").trim();
      const priAdobeMeta = TBB_ADOBE_FONTS_EQUIVALENT_MAP[String(priFont).toLowerCase()] || null;
      const secAdobeMeta = TBB_ADOBE_FONTS_EQUIVALENT_MAP[String(secFont).toLowerCase()] || null;
      const isHybridAdobeActive = Boolean(adobeKitId || priAdobeMeta || secAdobeMeta || st.fontLicenseMode === "hybrid");

      const familiesToPack = [
        { role: "01_Titulares_y_Logomarca", family: priFont, files: resolveFontFilesForFamily(priFont, "Montserrat") },
        { role: "02_Cuerpo_y_Documentos", family: secFont, files: resolveFontFilesForFamily(secFont, "Plus Jakarta Sans") },
        { role: "03_Datos_Tecnicos_y_Tablas", family: monoFont, files: resolveFontFilesForFamily(monoFont, "JetBrains Mono") }
      ];

      const zipEntries = [];
      const seenFiles = new Set();

      for (const group of familiesToPack) {
        for (const fname of group.files) {
          const entryPath = `${group.role}_${group.family.replace(/\s+/g, "_")}/${fname}`;
          if (seenFiles.has(entryPath)) continue;
          seenFiles.add(entryPath);
          try {
            const resp = await fetch(`/assets/fonts/${fname}`);
            if (resp.ok) {
              const buf = await resp.arrayBuffer();
              zipEntries.push({ name: entryPath, data: new Uint8Array(buf) });
            }
          } catch (fe) {
            console.warn("Font fetch warning:", fname, fe);
          }
        }
      }

      const adobeSectionLines = isHybridAdobeActive
        ? [
            "",
            "5. MODO HÍBRIDO ADOBE FONTS (TYPEKIT) · 100% CUMPLIMIENTO DE COPYRIGHT:",
            `   • Estado del Proyecto Web Adobe Fonts (Typekit ID): ${adobeKitId ? adobeKitId + " (https://use.typekit.net/" + adobeKitId + ".css)" : "Activación vía Adobe Creative Cloud"}`,
            priAdobeMeta
              ? `   • Fuente Primaria Adobe Fonts: ${priAdobeMeta.adobeName} (${priAdobeMeta.adobeUrl}) -> Homólogo métrico Open Source incluido en este .ZIP: ${priAdobeMeta.oflPartner} (.TTF)`
              : `   • Fuente Primaria: ${priFont}`,
            secAdobeMeta
              ? `   • Fuente Secundaria Adobe Fonts: ${secAdobeMeta.adobeName} (${secAdobeMeta.adobeUrl}) -> Homólogo métrico Open Source incluido en este .ZIP: ${secAdobeMeta.oflPartner} (.TTF)`
              : `   • Fuente Secundaria: ${secFont}`,
            "   • NOTA LEGAL DE COPYRIGHT (EULA ADOBE FONTS):",
            "     1) Tus logotipos (.SVG y .AI) ya están convertidos 100% a curvas Bézier (<path>), y tu Manual (.PDF)",
            "        lleva las fuentes incrustadas legalmente conforme a los Términos de Uso de Adobe Fonts.",
            "     2) Para equipos de tu empresa que cuenten con suscripción Adobe Creative Cloud, activa la fuente en 1 clic",
            "        desde https://fonts.adobe.com/.",
            "     3) Para equipos o proveedores sin Creative Cloud, instala directamente los archivos .TTF Open Source (SIL OFL 1.1)",
            "        incluidos en las carpetas de este paquete sin costo ni restricción de licencias."
          ]
        : [];

      const readmeTxt = [
        "================================================================================",
        `KIT OFICIAL DE TIPOGRAFÍAS CORPORATIVAS (MODO HÍBRIDO) · ${bName.toUpperCase()}`,
        "Generado por The Best Brand — Algorithmic Visual Identity Atelier",
        "================================================================================",
        "",
        "1. ARQUITECTURA TIPOGRÁFICA SELECCIONADA PARA TU MARCA:",
        `   • Tipografía Primaria (Titulares, Portadas y Logotipo): ${priFont}${priAdobeMeta ? ` [Adobe Fonts + Homólogo SIL OFL: ${priAdobeMeta.oflPartner}]` : " [Open Source SIL OFL 1.1]"}`,
        `   • Tipografía Secundaria (Cuerpo de Lectura, Contratos y Presentaciones): ${secFont}${secAdobeMeta ? ` [Adobe Fonts + Homólogo SIL OFL: ${secAdobeMeta.oflPartner}]` : " [Open Source SIL OFL 1.1]"}`,
        `   • Tipografía Técnica / Monoespaciada (Tablas, Folios, Cifras y Códigos): ${monoFont} [Open Source SIL OFL 1.1]`,
        ...(adobeKitId ? [`   • Enlace Web CSS Adobe Fonts (Typekit): https://use.typekit.net/${adobeKitId}.css`] : []),
        "",
        "2. CONTENIDO DE ESTE PAQUETE (.TTF LISTOS PARA INSTALAR):",
        ...zipEntries.map((e) => `   - ${e.name} (${Math.round(e.data.length / 1024)} KB)`),
        "",
        "3. CÓMO INSTALAR TUS FUENTES EN 30 SEGUNDOS:",
        "   • En macOS (MacBook / iMac):",
        "     Abre cada carpeta, haz doble clic sobre los archivos .ttf y pulsa «Instalar tipo de letra»",
        "     en el Catálogo Tipográfico.",
        "   • En Windows 10 / 11:",
        "     Selecciona los archivos .ttf, haz clic derecho y elige «Instalar para todos los usuarios».",
        "",
        "4. LICENCIA DE USO COMERCIAL ABIERTO (SIL OPEN FONT LICENSE 1.1):",
        "   Todos los archivos binarios .TTF incluidos en este paquete están licenciados bajo SIL OFL 1.1.",
        "   Tu empresa cuenta con autorización perpetua y gratuita para instalarlos y utilizarlos en",
        "   cualquier computadora, papelería impresa, empaques, sitios web, aplicaciones y documentos.",
        ...adobeSectionLines,
        ""
      ].join("\r\n");

      const licenseTxt = [
        "SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007",
        "-----------------------------------------------------------",
        "PREAMBLE",
        "The goals of the Open Font License (OFL) are to stimulate worldwide",
        "development of collaborative font projects, to support the font creation",
        "efforts of academic and linguistic communities, and to provide a free and",
        "open framework in which fonts may be shared and improved in partnership",
        "with others.",
        "",
        "The OFL allows the licensed fonts to be used, studied, modified and",
        "redistributed freely as long as they are not sold by themselves. The",
        "fonts, including any derivative works, can be bundled, embedded,",
        "redistributed and/or sold with any software provided that any reserved",
        "names are not used by derivative works."
      ].join("\r\n");

      const webCssSnippet = [
        `/* ==========================================================================`,
        `   SNIPPET CSS OFICIAL DE TIPOGRAFÍA HÍBRIDA — ${bName.toUpperCase()}`,
        `   Compatible con Adobe Fonts (Typekit) + Respaldo Universal Open Source (SIL OFL)`,
        `   ========================================================================== */`,
        adobeKitId
          ? `@import url("https://use.typekit.net/${adobeKitId}.css");`
          : `/* Si creas un Proyecto Web en https://fonts.adobe.com/my_fonts#web_projects-section, descomenta la siguiente línea con tu ID: */\r\n/* @import url("https://use.typekit.net/TU_KIT_ID.css"); */`,
        `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;700&family=Montserrat:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap");`,
        ``,
        `:root {`,
        `  --brand-font-primary: '${priFont}', '${priAdobeMeta ? priAdobeMeta.oflPartner : "Montserrat"}', sans-serif;`,
        `  --brand-font-secondary: '${secFont}', '${secAdobeMeta ? secAdobeMeta.oflPartner : "Plus Jakarta Sans"}', sans-serif;`,
        `  --brand-font-mono: '${monoFont}', 'JetBrains Mono', monospace;`,
        `}`
      ].join("\r\n");

      zipEntries.unshift(
        { name: "LEEME_GUIA_TIPOGRAFICA_E_INSTALACION.txt", data: readmeTxt },
        { name: "SNIPPET_WEB_ADOBE_TYPEKIT_Y_GOOGLE_FONTS.css", data: webCssSnippet },
        { name: "LICENCIA_COMERCIAL_SIL_OFL_1.1.txt", data: licenseTxt }
      );

      const blob = buildZipBlob(zipEntries, "application/zip");
      const zipFileName = `Kit_Fuentes_Oficiales_${safeSlug}.zip`;
      if (typeof window.tbbDeliverFileNativeOrDownload === "function") {
        await window.tbbDeliverFileNativeOrDownload(blob, zipFileName, "application/zip", `Kit Híbrido de Fuentes — ${bName}`);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = zipFileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          a.remove();
          URL.revokeObjectURL(url);
        }, 1200);
      }

      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = `✓ Kit Híbrido Descargado (${priFont} + ${secFont} + ${monoFont})`;
        setTimeout(() => { if (origHtml) triggerBtn.innerHTML = origHtml; }, 2800);
      }
      return blob;
    } catch (err) {
      console.error("Error exportando Kit de Fuentes ZIP:", err);
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = origHtml || "Descargar Kit de Fuentes (.ZIP)";
      }
    }
  }

  function tbbEnsureAdobeTypekitCssInjected(kitIdOpt) {
    if (typeof document === "undefined" || !document.head) return "";
    const cs = window.canvasState || {};
    const st = window.tbbState || {};
    const rawId = String(kitIdOpt !== undefined ? kitIdOpt : (cs.adobe_typekit_id || st.adobeTypekitId || "")).trim();
    const cleanId = rawId
      .replace(/^https?:\/\/use\.typekit\.net\//i, "")
      .replace(/\.css.*$/i, "")
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .trim();

    let linkEl = document.getElementById("tbbAdobeTypekitDynamicStylesheet");
    if (!cleanId) {
      if (linkEl) linkEl.remove();
      return "";
    }
    const href = `https://use.typekit.net/${cleanId}.css`;
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.id = "tbbAdobeTypekitDynamicStylesheet";
      linkEl.rel = "stylesheet";
      document.head.appendChild(linkEl);
    }
    if (linkEl.href !== href) {
      linkEl.href = href;
    }
    return cleanId;
  }

  window.tbbGenerateNanoBananaBrandSymbol = tbbGenerateNanoBananaBrandSymbol;
  window.tbbAutoTrimAndCenterRasterLogo = tbbAutoTrimAndCenterRasterLogo;
  window.tbbEnsureUploadedLogoCentered = tbbEnsureUploadedLogoCentered;
  window.tbbVectorizeRasterLogoToSvgCurves = tbbVectorizeRasterLogoToSvgCurves;
  window.tbbExportLogoInCurves = tbbExportLogoInCurves;
  window.tbbDownloadEditableLetterheadDOCX = tbbDownloadEditableLetterheadDOCX;
  window.tbbDownloadEditableDeckPPTX = tbbDownloadEditableDeckPPTX;
  window.tbbBuildCorporateEmailSignatureHTML = tbbBuildCorporateEmailSignatureHTML;
  window.tbbOpenEmailSignatureModal = tbbOpenEmailSignatureModal;
  window.tbbDownloadEmailSignatureHTML = tbbDownloadEmailSignatureHTML;
  window.tbbGenerateChapterVisualsWithFlow = tbbGenerateChapterVisualsWithFlow;
  window.tbbDownloadBrandFontsZip = tbbDownloadBrandFontsZip;
  window.TBB_FONT_FILES_INDEX = TBB_FONT_FILES_INDEX;
  window.TBB_ADOBE_FONTS_EQUIVALENT_MAP = TBB_ADOBE_FONTS_EQUIVALENT_MAP;
  window.tbbEnsureAdobeTypekitCssInjected = tbbEnsureAdobeTypekitCssInjected;

  // Ejecutar centrado retroactivo al cargar si ya había un PNG en la sesión
  if (typeof window !== "undefined") {
    setTimeout(() => { tbbEnsureUploadedLogoCentered(); }, 350);
  }

  console.log("✓ Suite Ejecutiva de Entregables (.SVG/.AI Curvas, .DOCX, .PPTX, Firma .HTML, Kit Fuentes .ZIP, Auto-Center & Google Flow Visuals V83.0) activa.");
})();
