import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/16fe541d-e38d-4da5-8a68-1c763c940574";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/arco_ingenieria_luis_ponce";
const WEB_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/apps/web";
const SAMPLES_DIR = path.join(WEB_DIR, "samples");
const LOGO_ORIGINAL_PATH = path.join(WEB_DIR, "assets/logos/arco_ingenieria_logo4k_original.png");

for (const d of [DELIVERABLES_DIR, SAMPLES_DIR]) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function fileToDataUrl(filePath, mime = "image/png") {
  const buf = fs.readFileSync(filePath);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
  }
  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.addEventListener("open", () => resolve());
      this.ws.addEventListener("error", (err) => reject(err));
      this.ws.addEventListener("message", (ev) => {
        const msg = JSON.parse(String(ev.data));
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve: res, reject: rej } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) rej(new Error(msg.error.message || JSON.stringify(msg.error)));
          else res(msg.result);
        }
      });
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evalJs(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (res && res.exceptionDetails) {
      console.error("JS Eval Error:", res.exceptionDetails.exception?.description || res.exceptionDetails.text);
    }
    return res?.result?.value;
  }
  async capturePng(outFile) {
    const { data } = await this.send("Page.captureScreenshot", { format: "png", fromSurface: true });
    fs.writeFileSync(outFile, Buffer.from(data, "base64"));
  }
  close() {
    try { this.ws.close(); } catch (e) {}
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("=== SELECCIONANDO ITERACIÓN #5 (LINEAL MINIMALISTA) Y GENERANDO TODOS LOS DESCARGABLES ===");

  // Start local static HTTP server for apps/web so all local assets & scripts resolve with zero latency
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, "http://127.0.0.1");
    let rel = decodeURIComponent(u.pathname);
    if (rel === "/" || rel === "/index.html") rel = "/index.html";
    else if (rel === "/studio" || rel === "/studio/") rel = "/studio.html";
    const fp = path.join(WEB_DIR, rel);
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      const ext = path.extname(fp).toLowerCase();
      const mimes = {
        ".html": "text/html; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".json": "application/json",
        ".ttf": "font/ttf",
        ".woff2": "font/woff2"
      };
      res.writeHead(200, { "Content-Type": mimes[ext] || "application/octet-stream" });
      fs.createReadStream(fp).pipe(res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  await new Promise((r) => srv.listen(8791, "127.0.0.1", r));

  const debugPort = 9258;
  const userDataDir = "/tmp/chromium_arco_iter5_" + Date.now();
  const chromeProc = spawn(
    "/usr/lib/chromium/chromium",
    [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--ignore-certificate-errors",
      "--autoplay-policy=no-user-gesture-required",
      "--window-size=1440,920",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      "http://127.0.0.1:8791/studio.html"
    ],
    { stdio: "ignore" }
  );

  let cdp = null;
  try {
    let targets = null;
    for (let attempt = 0; attempt < 40; attempt++) {
      try {
        targets = await httpGetJson(`http://127.0.0.1:${debugPort}/json`);
        if (Array.isArray(targets) && targets.length > 0) break;
      } catch (e) {}
      await sleep(300);
    }
    const pageTarget = targets.find((t) => t.type === "page") || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 920,
      deviceScaleFactor: 2,
      mobile: false
    });

    for (let w = 0; w < 40; w++) {
      const ready = await cdp.evalJs(`Boolean(typeof window.renderTbbZeroScrollStage === "function" && typeof window.tbbRestoreLogoIteration === "function")`);
      if (ready) break;
      await sleep(300);
    }

    const origLogoDataUrl = fileToDataUrl(LOGO_ORIGINAL_PATH);
    const iter2Full = fileToDataUrl("/tmp/arco_iter2_full.png");
    const iter2Sym = fileToDataUrl("/tmp/arco_iter2_symbol.png");
    const iter3Full = fileToDataUrl("/tmp/arco_iter3_full.png");
    const iter3Sym = fileToDataUrl("/tmp/arco_iter3_symbol.png");
    const iter4Full = fileToDataUrl("/tmp/arco_iter4_full.png");
    const iter4Sym = fileToDataUrl("/tmp/arco_iter4_symbol.png");
    const iter5Full = fileToDataUrl("/tmp/arco_iter5_full.png");
    const iter5Sym = fileToDataUrl("/tmp/arco_iter5_symbol.png");
    const iter6Full = fileToDataUrl("/tmp/arco_iter6_full.png");
    const iter6Sym = fileToDataUrl("/tmp/arco_iter6_symbol.png");

    // Hydrate complete Ing. Luis Ponce · ARCO Ingeniería session and trace Iteration #5 Bézier curves
    await cdp.evalJs(`(async () => {
      window.tbbPullRemoteSession = async () => null;
      window.tbbPollRemoteSessionOnce = async () => null;
      if (window._tbbSyncPollTimer) clearInterval(window._tbbSyncPollTimer);

      try {
        localStorage.setItem("tbb_license_active_pro_atelier", "true");
        localStorage.setItem("tbb_license_token", "LIC-TBB-PRO-ARCO-LUIS-PONCE");
      } catch (e) {}

      if (typeof window.tbbDismissAuraSplashBoot === "function") window.tbbDismissAuraSplashBoot(false);
      const sp = document.getElementById("tbbAuraSplashBootScreen");
      if (sp) sp.style.display = "none";

      window.step0State = window.step0State || {};
      window.step0State.goal = "redesign";
      window.step0State.hasExistingName = true;
      window.step0State.brandName = "ARCO Ingeniería";
      window.step0State.businessType = "Ingeniería civil, diseño arquitectónico y construcción integral de desarrollos residenciales, torres verticales y obra civil en México.";

      if (typeof window.tbbUpdateBrandNameFromInput === "function") {
        window.tbbUpdateBrandNameFromInput("ARCO Ingeniería");
      }
      window.canvasState.brandName = "ARCO Ingeniería";
      window.canvasState.brand_name = "ARCO Ingeniería";
      window.canvasState.tagline = "Ingeniería Estructural, Arquitectura y Construcción de Alto Nivel";
      window.canvasState.custom_business_type = "Somos ARCO Ingeniería (fundada y dirigida por el Ing. Luis Ponce), firma mexicana de ingeniería civil, arquitectura y construcción integral especializada en edificación de residencias de alto nivel, torres de departamentos, urbanización, terracerías, obra civil pesada, estructura metálica y amenidades llave en mano para desarrolladoras inmobiliarias, corporativos e inversionistas.";
      window.canvasState.golden_circle = "Porque en ARCO Ingeniería creemos que cada cimiento, estructura y desarrollo habitacional que edificamos es el patrimonio seguro donde miles de familias mexicanas viven y donde los grandes desarrolladores inmobiliarios consolidan su prestigio sin riesgos estructurales ni sobrecostos.";
      window.canvasState.value_offer = "Ingeniería civil, diseño arquitectónico y construcción integral llave en mano de desarrollos residenciales, torres verticales, urbanización, terracerías, estructuras de acero y concreto, y amenidades ejecutivas con certeza presupuestal y entrega puntual.";
      window.canvasState.social_role = "Transformamos la incertidumbre de la construcción en tranquilidad total para el inversionista y el director de desarrollo: eliminamos retrasos de obra, desviaciones financieras y vicios ocultos mediante supervisión técnica rigurosa en sitio.";
      window.canvasState.process_steps_text = "1. Ingeniería de Valor y Planeación Estructural (cálculo milimétrico, presupuesto paramétrico transparente y cronograma crítico) · 2. Ejecución y Residencia de Obra de Alta Precisión (control de calidad en aceros/concretos, seguridad normativa y reportes semanales) · 3. Entrega Llave en Mano con Dossier As-Built y Póliza de Garantía Estructural.";
      window.canvasState.core_message = "ARCO Ingeniería: Precisión estructural, diseño arquitectónico y cumplimiento implacable en cada metro cuadrado que edificamos.";
      window.canvasState.brand_persona = "El Ingeniero Luis Ponce y su equipo senior: una personalidad de autoridad técnica serena, mente matemática exacta, trato directo de socio leal, casco bien puesto en obra y compromiso inquebrantable con la palabra dada.";
      window.canvasState.ideal_customer = "Directores generales de desarrolladoras inmobiliarias, fondos de inversión inmobiliaria, comités técnicos de grandes constructoras y propietarios residenciales de nivel medio-alto y alto que buscan un contratista general confiable y solvente.";
      window.canvasState.tp_before = [
        "Portafolio web corporativo (arco-ingenieria.com) con obras ejecutadas",
        "Carpetas técnicas de licitación y presupuestos paramétricos detallados",
        "Visitas técnicas preliminares a terreno y dictámenes de factibilidad",
        "Reuniones ejecutivas con el Ing. Luis Ponce y referencias de desarrolladoras"
      ];
      window.canvasState.tp_during = [
        "Señalética monumental de obra, tapiales, cascos y chalecos con identidad ARCO",
        "Bitácora digital de residencia de obra y reportes fotográficos con dron",
        "Pruebas de laboratorio en aceros, soldaduras, concretos y compactación",
        "Juntas semanales de control de avance físico-financiero y estimaciones claras"
      ];
      window.canvasState.tp_after = [
        "Acta de entrega-recepción llave en mano y dossier de planos As-Built",
        "Pólizas de garantía estructural, impermeabilización y vicios ocultos",
        "Programa de mantenimiento preventivo post-entrega en áreas comunes",
        "Alianza estratégica continua para las siguientes etapas del desarrollo"
      ];
      if (typeof window.tpExtractedItems === "object" && window.tpExtractedItems) {
        window.tpExtractedItems.before = window.canvasState.tp_before;
        window.tpExtractedItems.during = window.canvasState.tp_during;
        window.tpExtractedItems.after = window.canvasState.tp_after;
      }

      window.tbbSelectOfficialFontFamily("Montserrat", "Plus Jakarta Sans", "JetBrains Mono");
      window.tbbSyncBrandPaletteToEngine(["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"], false, "Paleta Oficial ARCO Ingeniería");

      window.canvasState.uploaded_logo_data_url = ${JSON.stringify(origLogoDataUrl)};
      window.canvasState.existing_logo_mode = "evolve";

      // Trace clean Bézier curves for Iteration #5 (Lineal Minimalista)
      const tracedIter5Svg = (typeof window.tbbTracePngDataUrlToCleanSvgCurves === "function")
        ? await window.tbbTracePngDataUrlToCleanSvgCurves(${JSON.stringify(iter5Full)}, ["#0078C0", "#88E0E0", "#585850", "#0D2540"])
        : "";
      const tracedOrigSvg = (typeof window.tbbTracePngDataUrlToCleanSvgCurves === "function")
        ? await window.tbbTracePngDataUrlToCleanSvgCurves(${JSON.stringify(origLogoDataUrl)}, ["#0078C0", "#88E0E0", "#585850"])
        : "";

      // Populate all 6 iterations in history
      window.tbbState.logoIterations = [
        {
          id: 1,
          label: "Tu Logo Base",
          conceptLabel: "Tu Logo Base",
          prompt: "Logotipo original subido por el fundador (Base de evolución)",
          isUploadedOriginal: true,
          isUploadedUserLogo: true,
          familyIdx: 0,
          finishMode: "clean_2d",
          creativeMode: "signature_emblem",
          pri: "#0078C0",
          sec: "#88E0E0",
          accentHex: "#585850",
          fontFamily: "Montserrat",
          palette: ["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"],
          uploadedLogoDataUrl: ${JSON.stringify(origLogoDataUrl)},
          nanoBananaFullArtworkUrl: ${JSON.stringify(origLogoDataUrl)},
          nanoBananaSymbolUrl: ${JSON.stringify(origLogoDataUrl)},
          tracedCurvesSvg: tracedOrigSvg
        },
        {
          id: 2,
          label: "Emblema de Autor",
          conceptLabel: "Emblema de Autor",
          prompt: "Modernización automática del logotipo base respetando su esencia",
          isNanoBananaGenerated: true,
          familyIdx: 0,
          finishMode: "clean_2d",
          creativeMode: "signature_emblem",
          pri: "#0078C0",
          sec: "#88E0E0",
          accentHex: "#585850",
          fontFamily: "Montserrat",
          palette: ["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"],
          nanoBananaFullArtworkUrl: ${JSON.stringify(iter2Full)},
          nanoBananaSymbolUrl: ${JSON.stringify(iter2Sym)},
          tracedCurvesSvg: tracedIter5Svg
        },
        {
          id: 3,
          label: "Monograma + Giro",
          conceptLabel: "Monograma + Giro",
          prompt: "Monograma arquitectónico A con doble arco estructural y torres residenciales",
          isNanoBananaGenerated: true,
          familyIdx: 0,
          finishMode: "clean_2d",
          creativeMode: "monogram_fusion",
          pri: "#0078C0",
          sec: "#88E0E0",
          accentHex: "#585850",
          fontFamily: "Montserrat",
          palette: ["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"],
          nanoBananaFullArtworkUrl: ${JSON.stringify(iter3Full)},
          nanoBananaSymbolUrl: ${JSON.stringify(iter3Sym)},
          tracedCurvesSvg: tracedIter5Svg
        },
        {
          id: 4,
          label: "Insignia / Sello",
          conceptLabel: "Insignia / Sello",
          prompt: "Sello circular arquitectónico contemporáneo para ARCO Ingeniería",
          isNanoBananaGenerated: true,
          familyIdx: 0,
          finishMode: "clean_2d",
          creativeMode: "editorial_crest",
          pri: "#0078C0",
          sec: "#88E0E0",
          accentHex: "#585850",
          fontFamily: "Montserrat",
          palette: ["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"],
          nanoBananaFullArtworkUrl: ${JSON.stringify(iter4Full)},
          nanoBananaSymbolUrl: ${JSON.stringify(iter4Sym)},
          tracedCurvesSvg: tracedIter5Svg
        },
        {
          id: 5,
          label: "Lineal Minimalista",
          conceptLabel: "Lineal Minimalista",
          prompt: "Isotipo geométrico monolineal minimalista de trazo continuo: arco estructural y dos torres esbeltas en azul cobalto (#0078C0), turquesa (#88E0E0) y gris (#585850)",
          isNanoBananaGenerated: true,
          familyIdx: 0,
          finishMode: "clean_2d",
          creativeMode: "minimal_couture",
          pri: "#0078C0",
          sec: "#88E0E0",
          accentHex: "#585850",
          fontFamily: "Montserrat",
          palette: ["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"],
          nanoBananaFullArtworkUrl: ${JSON.stringify(iter5Full)},
          nanoBananaSymbolUrl: ${JSON.stringify(iter5Sym)},
          tracedCurvesSvg: tracedIter5Svg
        },
        {
          id: 6,
          label: "Evolución IA #6",
          conceptLabel: "Evolución IA #6",
          prompt: "Variante escultórica de monograma A con doble arco",
          isNanoBananaGenerated: true,
          familyIdx: 0,
          finishMode: "clean_2d",
          creativeMode: "monogram_fusion",
          pri: "#0078C0",
          sec: "#88E0E0",
          accentHex: "#585850",
          fontFamily: "Montserrat",
          palette: ["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"],
          nanoBananaFullArtworkUrl: ${JSON.stringify(iter6Full)},
          nanoBananaSymbolUrl: ${JSON.stringify(iter6Sym)},
          tracedCurvesSvg: tracedIter5Svg
        }
      ];

      // REGRESAR AL PASO 5.2 Y SELECCIONAR LA ITERACIÓN #5 (índice 4: Lineal Minimalista)
      for (const mid of ["phaseTransitionVideoModal", "tbbTransitionVideoModal", "welcomeModalOverlay"]) {
        const m = document.getElementById(mid);
        if (m) { m.classList.remove("open"); m.style.display = "none"; }
      }

      window.tbbState.step = 5;
      window.tbbState.subStep = 2;
      window.tbbRestoreLogoIteration(4);
      window.canvasState.uploaded_logo_traced_curves_svg = tracedIter5Svg;
      window.renderTbbZeroScrollStage();
      return true;
    })()`);

    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png"));
    console.log("✓ [28] Paso 5.2: Regreso y selección de la Iteración #5 · Lineal Minimalista como logotipo definitivo");

    // =========================================================================
    // PASO 6.1: BRANDBOOK OFICIAL DE 36 LÁMINAS CON EL LOGOTIPO #5 · LINEAL MINIMALISTA
    // =========================================================================
    await cdp.evalJs(`(() => {
      for (const mid of ["phaseTransitionVideoModal", "tbbTransitionVideoModal", "welcomeModalOverlay"]) {
        const m = document.getElementById(mid);
        if (m) { m.classList.remove("open"); m.style.display = "none"; }
      }
      window.tbbState.step = 6;
      window.tbbState.subStep = 1;
      window.tbbState.plateIdx = 0;
      window._tbbStep6PendingCeremony = false;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(900);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_30_paso6_1_brandbook_lamina01_portada.png"));
    console.log("✓ [30] Paso 6.1: Brandbook Lámina 01 (Portada Oficial con Logo #5 · Lineal Minimalista)");

    await cdp.evalJs(`(() => {
      window.tbbState.plateIdx = 12; // Lámina 13: Terna Oficial
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_31_paso6_1_brandbook_lamina13_terna.png"));
    console.log("✓ [31] Paso 6.1: Brandbook Lámina 13 (Terna Oficial con Logo #5 · Lineal Minimalista)");

    await cdp.evalJs(`(() => {
      window.tbbState.plateIdx = 20; // Lámina 21: Paleta Oficial
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_32_paso6_1_brandbook_lamina21_paleta.png"));
    console.log("✓ [32] Paso 6.1: Brandbook Lámina 21 (Paleta Cromática Oficial)");

    // =========================================================================
    // PASO 6.2: BÓVEDA EJECUTIVA Y DESCARGA DE LOS 12 ENTREGABLES CON EL LOGO #5
    // =========================================================================
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 2;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_33_paso6_2_boveda_ejecutiva_descargas.png"));
    console.log("✓ [33] Paso 6.2: Bóveda Ejecutiva de Entregables con Logo #5 · Lineal Minimalista");

    const exportedBundle = await cdp.evalJs(`(async () => {
      const capturedFiles = {};
      const blobToBase64 = (blob) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const res = String(reader.result || "");
          resolve(res.includes(",") ? res.split(",")[1] : "");
        };
        reader.readAsDataURL(blob);
      });

      window.tbbDeliverFileNativeOrDownload = async function(blob, fileName, mimeType, title) {
        capturedFiles[fileName] = await blobToBase64(blob);
        return true;
      };

      // 1. Logotipo Horizontal en Curvas (.SVG y .AI)
      await window.tbbExportLogoInCurves("horizontal", "svg");
      await window.tbbExportLogoInCurves("horizontal", "ai");

      // 2. Avatar Social 1:1, Sello Circular y Símbolo en Curvas (.SVG)
      await window.tbbExportLogoInCurves("avatar", "svg");
      await window.tbbExportLogoInCurves("seal", "svg");
      await window.tbbExportLogoInCurves("symbol", "svg");

      // 3. Hoja Membretada Editable (.DOCX)
      const docxBlob = await window.tbbDownloadEditableLetterheadDOCX();
      if (docxBlob && !capturedFiles["Plantilla_Hoja_Membretada_arco_ingenieria.docx"]) {
        capturedFiles["Plantilla_Hoja_Membretada_arco_ingenieria.docx"] = await blobToBase64(docxBlob);
      }

      // 4. Presentación Ejecutiva Editable 16:9 (.PPTX)
      const pptxBlob = await window.tbbDownloadEditableDeckPPTX();
      if (pptxBlob && !capturedFiles["Plantilla_Presentacion_Ejecutiva_arco_ingenieria.pptx"]) {
        capturedFiles["Plantilla_Presentacion_Ejecutiva_arco_ingenieria.pptx"] = await blobToBase64(pptxBlob);
      }

      // 5. Kit Oficial de Fuentes (.ZIP con .TTF + Licencia SIL OFL)
      if (typeof window.tbbDownloadBrandFontsKitZip === "function") {
        await window.tbbDownloadBrandFontsKitZip();
      }

      // 6. Firma Corporativa HTML para Ing. Luis Ponce
      const brandProfile = window.buildActiveBrandProfileForV80();
      const sigHtml = await window.tbbBuildCorporateEmailSignatureHTML(brandProfile, {
        personName: "Ing. Luis Ponce",
        roleTitle: "Director General y Fundador · ARCO Ingeniería",
        phone: "+52 (55) 5555 0199",
        email: "luis.ponce@arco-ingenieria.com",
        web: "www.arco-ingenieria.com"
      });

      // 7. Manual de Marca Completo de 36 Láminas (.HTML)
      const fullBrandbookHtml = (window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml === "function")
        ? window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml(brandProfile)
        : "";

      return {
        capturedFiles,
        sigHtml,
        fullBrandbookHtml
      };
    })()`);

    for (const [fname, b64] of Object.entries(exportedBundle.capturedFiles || {})) {
      if (!b64) continue;
      const buf = Buffer.from(b64, "base64");
      fs.writeFileSync(path.join(DELIVERABLES_DIR, fname), buf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, fname), buf);
      fs.writeFileSync(path.join(SAMPLES_DIR, fname), buf);
      console.log(`✓ Entregable (#5 Lineal Minimalista): ${fname} (${(buf.length / 1024).toFixed(1)} KB)`);
    }

    if (exportedBundle.sigHtml) {
      const fullSigDoc = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Firma Corporativa Oficial — Ing. Luis Ponce · ARCO Ingeniería</title>
</head>
<body style="margin:0;padding:32px;background:#F8FAFC;font-family:'Plus Jakarta Sans',sans-serif;">
  ${exportedBundle.sigHtml}
</body>
</html>`;
      for (const dir of [DELIVERABLES_DIR, ARTIFACT_DIR, SAMPLES_DIR]) {
        fs.writeFileSync(path.join(dir, "Firma_Corporativa_Luis_Ponce_ARCO_Ingenieria.html"), fullSigDoc, "utf8");
      }
      console.log("✓ Entregable (#5 Lineal Minimalista): Firma_Corporativa_Luis_Ponce_ARCO_Ingenieria.html");
    }

    if (exportedBundle.fullBrandbookHtml) {
      for (const dir of [DELIVERABLES_DIR, ARTIFACT_DIR, SAMPLES_DIR]) {
        fs.writeFileSync(path.join(dir, "Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.html"), exportedBundle.fullBrandbookHtml, "utf8");
      }
      console.log("✓ Entregable (#5 Lineal Minimalista): Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.html");
    }

    // Save Masterpiece PNG and 1:1 Centered Symbol PNG of Iteration #5
    const bufFull5 = fs.readFileSync("/tmp/arco_iter5_full.png");
    const bufSym5 = fs.readFileSync("/tmp/arco_iter5_symbol.png");
    for (const dir of [DELIVERABLES_DIR, ARTIFACT_DIR, SAMPLES_DIR]) {
      fs.writeFileSync(path.join(dir, "Logotipo_Masterpiece_NanoBanana_ARCO_Ingenieria.png"), bufFull5);
      fs.writeFileSync(path.join(dir, "Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png"), bufSym5);
    }
    console.log("✓ Entregables PNG (#5 Lineal Minimalista): Logotipo_Masterpiece_NanoBanana_ARCO_Ingenieria.png + Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png");

    // Create Design Tokens JSON for ARCO Ingeniería in SAMPLES_DIR & DELIVERABLES_DIR
    const arcoTokensJson = JSON.stringify({
      brand: "ARCO Ingeniería",
      founder: "Ing. Luis Ponce",
      selectedIteration: "#5 · Lineal Minimalista",
      tagline: "Ingeniería Estructural, Arquitectura y Construcción de Alto Nivel",
      niceClasses: [37, 42],
      palette: {
        primaryCobalt: "#0078C0",
        accentTurquoise: "#88E0E0",
        structuralGray: "#585850",
        deepBlueprintNavy: "#0D2540",
        canvasLight: "#F8FAFC"
      },
      typography: {
        display: "Montserrat",
        body: "Plus Jakarta Sans",
        mono: "JetBrains Mono"
      },
      kanseiAxes: {
        tradicion_vanguardia: 0.78,
        silencio_expresion: 0.65,
        cercania_autoridad: 0.85,
        organico_geometrico: 0.90,
        calma_dinamismo: 0.72,
        sintesis_detalle: 0.55,
        fisico_digital: 0.35
      }
    }, null, 2);
    for (const dir of [DELIVERABLES_DIR, SAMPLES_DIR]) {
      fs.writeFileSync(path.join(dir, "Design_Tokens_ARCO_Ingenieria.json"), arcoTokensJson, "utf8");
    }

    // Capture Modal of Corporate Email Signature with Logo #5
    await cdp.evalJs(`(async () => {
      await window.tbbOpenEmailSignatureModal();
      const setVal = (id, v) => {
        const el = document.getElementById(id);
        if (el) { el.value = v; el.dispatchEvent(new Event("input", { bubbles: true })); }
      };
      setVal("sigInpName", "Ing. Luis Ponce");
      setVal("sigInpRole", "Director General y Fundador · ARCO Ingeniería");
      setVal("sigInpPhone", "+52 (55) 5555 0199");
      setVal("sigInpEmail", "luis.ponce@arco-ingenieria.com");
      setVal("sigInpWeb", "www.arco-ingenieria.com");
    })()`);
    await sleep(900);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_34_modal_firma_corporativa_luis_ponce.png"));
    console.log("✓ [34] Modal de Firma Corporativa de Ing. Luis Ponce con Logo #5 · Lineal Minimalista capturado");

    console.log("=== REGENERACIÓN DE ENTREGABLES CON LOGO #5 COMPLETADA CON ÉXITO ===");
  } finally {
    if (cdp) cdp.close();
    try { chromeProc.kill("SIGKILL"); } catch (e) {}
    try { srv.close(); } catch (e) {}
  }
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
