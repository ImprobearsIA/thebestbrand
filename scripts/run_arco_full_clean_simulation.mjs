import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a";
const WEB_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/apps/web";
const LOGO_ORIGINAL_PATH = path.join(WEB_DIR, "assets/logos/arco_ingenieria_logo4k_original.png");

const ITER04_IMG_PATH = path.join(ARTIFACT_DIR, "arco_iter04_nanobanana_original_colors_1794503915051.jpg");
const ITER07_IMG_PATH = path.join(ARTIFACT_DIR, "arco_iter07_nanobanana_original_colors_1794503915874.jpg");
const ITER10_IMG_PATH = path.join(ARTIFACT_DIR, "arco_iter10_final_masterpiece_original_colors_1794503913524.jpg");

function fileToDataUrl(filePath, mime = "image/jpeg") {
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
  console.log("=== INICIANDO SIMULACRO E2E DESDE CERO PARA ARCO INGENIERÍA ===");
  const debugPort = 9237;
  const userDataDir = "/tmp/chromium_arco_clean_sim_" + Date.now();
  const chromeProc = spawn(
    "/usr/lib/chromium/chromium",
    [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--autoplay-policy=no-user-gesture-required",
      "--window-size=1440,920",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      "http://127.0.0.1:8000/studio"
    ],
    { stdio: "ignore" }
  );

  let cdp = null;
  try {
    let targets = null;
    for (let attempt = 0; attempt < 30; attempt++) {
      try {
        targets = await httpGetJson(`http://127.0.0.1:${debugPort}/json`);
        if (Array.isArray(targets) && targets.length > 0) break;
      } catch (e) {}
      await sleep(400);
    }
    if (!targets || !targets.length) throw new Error("No se pudo conectar a Chromium en puerto " + debugPort);

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

    await sleep(1600);

    // 1. LIMPIEZA TOTAL DESDE CERO (CERO REMANENTES)
    await cdp.evalJs(`(() => {
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      if (typeof window.startFreshBrandSession === "function") {
        window.startFreshBrandSession();
      }
      return true;
    })()`);
    await sleep(700);

    // -------------------------------------------------------------------------
    // PASO 0.1: OBJETIVO ("Evolucionar y profesionalizar mi marca actual")
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      if (typeof selectStep0Goal === "function") selectStep0Goal("redesign");
      window.tbbState.step = 0;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_01_step0_1_objetivo_redisenar.png"));
    console.log("✓ Screenshot 01: Paso 0.1 Objetivo");

    // -------------------------------------------------------------------------
    // PASO 0.2: NOMBRE ("ARCO Ingeniería") + SUBIDA DE SU LOGO ORIGINAL + MODO "EVOLVE"
    // -------------------------------------------------------------------------
    const origLogoDataUrl = fileToDataUrl(LOGO_ORIGINAL_PATH, "image/png");
    fs.writeFileSync(path.join(ARTIFACT_DIR, "arco_original_logo4k.png"), fs.readFileSync(LOGO_ORIGINAL_PATH));

    await cdp.evalJs(`(async () => {
      if (typeof selectStep0Assets === "function") selectStep0Assets("has_name");
      window.tbbState.step = 0;
      window.tbbState.subStep = 2;
      if (typeof window.tbbUpdateBrandNameFromInput === "function") {
        window.tbbUpdateBrandNameFromInput("ARCO Ingeniería");
      }

      const rawUrl = ${JSON.stringify(origLogoDataUrl)};
      let centeredUrl = rawUrl;
      if (typeof window.tbbAutoTrimAndCenterRasterLogo === "function") {
        centeredUrl = await window.tbbAutoTrimAndCenterRasterLogo(rawUrl);
      }

      const origCols = ["#0078C0", "#88E0E0", "#585850"];
      if (!window.step0State) window.step0State = { goal: "redesign", assets: "has_name" };
      window.step0State.assets = "has_name";
      window.step0State.existingLogoMode = "evolve";
      window.step0State.uploadedLogoDataUrl = centeredUrl;
      window.step0State.uploadedLogoColors = origCols;

      const cs = window.canvasState;
      cs.brandName = "ARCO Ingeniería";
      cs.tagline = "Diseño Arquitectónico, Construcción y Obra Civil";
      cs.uploaded_logo_data_url = centeredUrl;
      cs.base_uploaded_logo_data_url = centeredUrl;
      cs.existing_logo_mode = "evolve";
      cs.uploaded_logo_colors = origCols;
      cs.primary_color = "#0078C0";
      cs.secondary_color = "#88E0E0";
      cs.accent_color = "#585850";
      cs.selected_colors_hex = ["#FFFFFF", "#090D16", "#0078C0", "#88E0E0"];

      window.tbbState.logoPriHex = "#0078C0";
      window.tbbState.logoSecHex = "#88E0E0";
      window.tbbSyncUploadedLogoIntoIterations();
      window.renderTbbZeroScrollStage();
      return origCols;
    })()`);
    await sleep(650);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_02_step0_2_logo_original_y_evolucionar.png"));
    console.log("✓ Screenshot 02: Paso 0.2 Logo Original ARCO + Modo Evolucionar");

    // -------------------------------------------------------------------------
    // PASO 0.3: GIRO Y ESENCIA DEL NEGOCIO (Datos reales de arco-ingenieria.com)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 0;
      window.tbbState.subStep = 3;
      const bizDesc = "Empresa mexicana de arquitectura, ingeniería y construcción integral (ARCO Ingeniería). Especialistas en edificación de casas residenciales, torres de departamentos, obra civil, urbanización, terracerías, áreas comunes y amenidades para grandes desarrolladoras y constructoras en todo México.";
      if (typeof window.tbbUpdateBusinessTypeFromInput === "function") {
        window.tbbUpdateBusinessTypeFromInput(bizDesc);
      } else {
        window.canvasState.custom_business_type = bizDesc;
      }
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_03_step0_3_giro_constructora.png"));
    console.log("✓ Screenshot 03: Paso 0.3 Giro del Negocio");

    // -------------------------------------------------------------------------
    // VIDEO VERTICAL 9:16 PASO 0 -> PASO 1 (DESKTOP + MOBILE)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      openPhaseTransitionVideoCapsule(0, 1);
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) { vid.currentTime = 4.2; }
    })()`);
    await sleep(1400);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_04_video_vertical_paso0_a_1_desktop.png"));
    console.log("✓ Screenshot 04: Video Vertical 9:16 Paso 0 -> 1 (Desktop con textos al lado)");

    // Vista Móvil Responsiva (390x844) con textos debajo del video vertical
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_05_video_vertical_paso0_a_1_mobile.png"));
    console.log("✓ Screenshot 05: Video Vertical 9:16 Paso 0 -> 1 (Móvil con textos debajo)");

    // Volver a Desktop y avanzar a Paso 1
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 920,
      deviceScaleFactor: 2,
      mobile: false
    });
    await sleep(400);
    await cdp.evalJs(`finishTransitionVideoAndEnterNextStep()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 1: CÍRCULO DORADO DE SIMON SINEK
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      const cs = window.canvasState;
      cs.golden_circle = "Porque cada obra civil, desarrollo habitacional y estructura que edificamos es el cimiento donde miles de familias mexicanas y grandes desarrolladoras construyen su patrimonio con seguridad estructural y certeza técnica.";
      cs.process_steps_text = "Mediante ingeniería civil de precisión, supervisión rigurosa en sitio, control presupuestal transparente, cumplimiento estricto de tiempos de entrega y acabados arquitectónicos de primer nivel.";
      cs.value_offer = "Construcción integral de casas residenciales, torres de departamentos, urbanización, obra civil pesada, estructura metálica y áreas comunes para grandes constructoras.";
      cs.ideal_customer = "Directores de grandes constructoras, desarrolladores inmobiliarios corporativos e inversionistas que exigen un socio constructor confiable y puntual.";
      cs.brand_persona = "Ingeniero Estructural Senior: fuerza tranquila, rigor matemático, cumplimiento implacable en obra y lealtad absoluta con el desarrollador.";
      window.tbbState.step = 1;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_06_step1_circulo_dorado_sinek.png"));
    console.log("✓ Screenshot 06: Paso 1 Círculo Dorado");

    // Video Vertical 9:16 Paso 1 -> Paso 2 (Frame en B-Roll segundo 16.5s)
    await cdp.evalJs(`(() => {
      openPhaseTransitionVideoCapsule(1, 2);
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) { vid.currentTime = 16.5; }
    })()`);
    await sleep(1200);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_07_video_vertical_paso1_a_2.png"));
    console.log("✓ Screenshot 07: Video Vertical 9:16 Paso 1 -> 2 (B-Roll)");
    await cdp.evalJs(`finishTransitionVideoAndEnterNextStep()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 2: TOUCHPOINTS (ANTES · DURANTE · DESPUÉS)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tpExtractedItems = {
        before: [
          "Portafolio web corporativo (arco-ingenieria.com) con obras ejecutadas",
          "Licitaciones técnicas y presupuestos paramétricos transparentes",
          "Recorridos previos y dictámenes de factibilidad estructural",
          "Referencias comprobables con grandes constructoras nacionales"
        ],
        during: [
          "Residencia de obra con bitácora digital y reportes fotográficos semanales",
          "Control de calidad en cimentación, aceros, concretos y acabados",
          "Seguridad industrial normativa y cascos/chalecos con identidad ARCO",
          "Estimaciones claras y juntas de avance en tiempo real con dirección"
        ],
        after: [
          "Entrega física llave en mano con dossier de planos As-Built",
          "Pólizas de garantía estructural y vicios ocultos",
          "Mantenimiento preventivo de áreas comunes y urbanización",
          "Alianza continua para subsecuentes etapas del desarrollo inmobiliario"
        ]
      };
      window.tbbState.step = 2;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_08_step2_touchpoints_obra_civil.png"));
    console.log("✓ Screenshot 08: Paso 2 Touchpoints");

    // Video Vertical 9:16 Paso 2 -> Paso 3 (Frame en Toma B segundo 28s)
    await cdp.evalJs(`(() => {
      openPhaseTransitionVideoCapsule(2, 3);
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) { vid.currentTime = 28.0; }
    })()`);
    await sleep(1200);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_09_video_vertical_paso2_a_3.png"));
    console.log("✓ Screenshot 09: Video Vertical 9:16 Paso 2 -> 3");
    await cdp.evalJs(`finishTransitionVideoAndEnterNextStep()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 3: NAMING Y CLASE DE NIZA 37
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      const cs = window.canvasState;
      cs.brandName = "ARCO Ingeniería";
      cs.tagline = "Diseño Arquitectónico, Construcción y Obra Civil";
      cs.primary_nice_class = "Clase 37 (Construcción, edificación residencial, obra civil y urbanización) y Clase 42 (Ingeniería estructural y proyectos arquitectónicos)";
      window.tbbState.step = 3;
      window.tbbState.subStep = 2;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_10_step3_naming_y_clase_niza_37.png"));
    console.log("✓ Screenshot 10: Paso 3 Naming y Clase de Niza 37");

    // Video Vertical 9:16 Paso 3 -> Paso 4
    await cdp.evalJs(`(() => {
      openPhaseTransitionVideoCapsule(3, 4);
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) { vid.currentTime = 18.0; }
    })()`);
    await sleep(1200);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_11_video_vertical_paso3_a_4.png"));
    console.log("✓ Screenshot 11: Video Vertical 9:16 Paso 3 -> 4");
    await cdp.evalJs(`finishTransitionVideoAndEnterNextStep()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 4: KANSEI (4.1) Y CATÁLOGO DE FUENTES OPEN SOURCE (4.4)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_12_step4_1_ejes_kansei.png"));

    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 4;
      if (typeof window.tbbFilterFontTriadsByCategory === "function") {
        window.tbbFilterFontTriadsByCategory("geometric");
      }
      if (typeof window.tbbSelectCuratedFontTriad === "function") {
        window.tbbSelectCuratedFontTriad("arch_swiss");
      }
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_13_step4_4_catalogo_fuentes_open_source.png"));
    console.log("✓ Screenshot 12-13: Paso 4 Kansei y Catálogo de Fuentes");

    // Video Vertical 9:16 Paso 4 -> Paso 5
    await cdp.evalJs(`(() => {
      openPhaseTransitionVideoCapsule(4, 5);
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) { vid.currentTime = 17.5; }
    })()`);
    await sleep(1200);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_14_video_vertical_paso4_a_5.png"));
    console.log("✓ Screenshot 14: Video Vertical 9:16 Paso 4 -> 5");
    await cdp.evalJs(`finishTransitionVideoAndEnterNextStep()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 5.1: PALETA ORIGINAL PRESERVADA DE ARCO (#0078C0, #88E0E0, #585850)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      const cs = window.canvasState;
      cs.uploaded_logo_colors = ["#0078C0", "#88E0E0", "#585850"];
      cs.primary_color = "#0078C0";
      cs.secondary_color = "#88E0E0";
      cs.accent_color = "#585850";
      cs.selected_colors_hex = ["#FFFFFF", "#090D16", "#0078C0", "#88E0E0"];
      window.tbbState.logoPriHex = "#0078C0";
      window.tbbState.logoSecHex = "#88E0E0";
      window.tbbState.step = 5;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_15_step5_1_paleta_original_arco.png"));
    console.log("✓ Screenshot 15: Paso 5.1 Paleta Original de ARCO (#0078C0 · #88E0E0 · #585850)");

    // -------------------------------------------------------------------------
    // PASO 5.2: LAS 10 ITERACIONES PROGRESIVAS Y SELECCIÓN DE LA #10 COMO FINAL
    // -------------------------------------------------------------------------
    const iter04DataUrl = fileToDataUrl(ITER04_IMG_PATH, "image/jpeg");
    const iter07DataUrl = fileToDataUrl(ITER07_IMG_PATH, "image/jpeg");
    const iter10DataUrl = fileToDataUrl(ITER10_IMG_PATH, "image/jpeg");

    await cdp.evalJs(`(() => {
      const st = window.tbbState;
      const cs = window.canvasState;
      const baseLogoUrl = cs.base_uploaded_logo_data_url || cs.uploaded_logo_data_url;
      const iter04Url = ${JSON.stringify(iter04DataUrl)};
      const iter07Url = ${JSON.stringify(iter07DataUrl)};
      const iter10Url = ${JSON.stringify(iter10DataUrl)};
      const pri = "#0078C0";
      const sec = "#88E0E0";
      const acc = "#585850";

      const tracedIter04Svg = '<g data-nanobanana-pro="1"><image data-tbb-uploaded-logo="1" href="' + iter04Url + '" xlink:href="' + iter04Url + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>';
      const tracedIter07Svg = '<g data-nanobanana-pro="1"><image data-tbb-uploaded-logo="1" href="' + iter07Url + '" xlink:href="' + iter07Url + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>';
      const tracedIter10Svg = '<g data-nanobanana-pro="1"><image data-tbb-uploaded-logo="1" href="' + iter10Url + '" xlink:href="' + iter10Url + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>';

      st.logoIterations = [
        {
          idx: 1,
          isUploadedUserLogo: true,
          uploadedLogoDataUrl: baseLogoUrl,
          archetype: "uploaded_user_logo",
          conceptLabel: "Tu Logo Base",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: "",
          note: "Iteración #1: Logotipo original actual de ARCO Ingeniería (arco-ingenieria.com)",
          prompt: "Logotipo original actual de ARCO Ingeniería con arco cobalto (#0078C0), turquesa (#88E0E0) y torres en gris arquitectónico (#585850).",
          geminiPrompt40w: "Logotipo original actual de ARCO Ingeniería con arco cobalto (#0078C0), turquesa (#88E0E0) y torres en gris arquitectónico (#585850)."
        },
        {
          idx: 2,
          isUploadedUserLogo: false,
          archetype: "gemini_custom_3d",
          conceptLabel: "Arco Doble",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: '<g><path d="M24 148 C24 64 156 64 156 148 L134 148 C134 86 46 86 46 148 Z" fill="#0078C0"/><path d="M42 148 C42 82 138 82 138 148 L122 148 C122 98 58 98 58 148 Z" fill="#88E0E0"/><rect x="64" y="88" width="18" height="60" fill="#585850"/><rect x="86" y="72" width="22" height="76" fill="#585850"/><polygon points="86,72 108,58 108,72" fill="#0078C0"/></g>',
          note: "Iteración #2: Limpieza geométrica del doble arco en azul cobalto (#0078C0) y turquesa (#88E0E0) con torres centrales (#585850)",
          prompt: "Iteración #2: Limpieza geométrica del doble arco estructural en azul cobalto (#0078C0) y turquesa (#88E0E0) enmarcando dos torres residenciales en gris arquitectónico (#585850).",
          geminiPrompt40w: "Iteración #2: Limpieza geométrica del doble arco estructural en azul cobalto (#0078C0) y turquesa (#88E0E0) enmarcando dos torres residenciales en gris arquitectónico (#585850)."
        },
        {
          idx: 3,
          isUploadedUserLogo: false,
          archetype: "gemini_custom_3d",
          conceptLabel: "Monograma A",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: '<g><path d="M36 150 C46 58 148 52 156 150 L134 150 C128 78 64 82 56 150 Z" fill="#0078C0"/><path d="M52 150 C60 76 132 72 138 150 L122 150 C118 92 72 94 66 150 Z" fill="#88E0E0"/><path d="M30 150 L66 56 L88 56 L118 150 L96 150 L90 128 L58 128 L50 150 Z M64 110 L84 110 L75 78 Z" fill="#585850"/></g>',
          note: "Iteración #3: Integración del monograma A arquitectónico (#585850) con la bóveda envolvente en colores originales (#0078C0 y #88E0E0)",
          prompt: "Iteración #3: Fusión del monograma A estructural en gris taupe (#585850) con la doble bóveda envolvente en azul cobalto (#0078C0) y agua turquesa (#88E0E0).",
          geminiPrompt40w: "Iteración #3: Fusión del monograma A estructural en gris taupe (#585850) con la doble bóveda envolvente en azul cobalto (#0078C0) y agua turquesa (#88E0E0)."
        },
        {
          idx: 4,
          isUploadedUserLogo: false,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: iter04Url,
          archetype: "gemini_custom_3d",
          conceptLabel: "Síntesis Suiza",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: tracedIter04Svg,
          note: "Iteración #4: Síntesis NanoBanana fiel al logo original con A + edificios en #585850 y arco doble en #88E0E0 y #0078C0",
          prompt: "Iteración #4: Evolución directa del emblema original de ARCO Ingeniería perfeccionando la proporción entre el bloque de edificios (#585850) y el doble arco (#88E0E0 / #0078C0).",
          geminiPrompt40w: "Iteración #4: Evolución directa del emblema original de ARCO Ingeniería perfeccionando la proporción entre el bloque de edificios (#585850) y el doble arco (#88E0E0 / #0078C0)."
        },
        {
          idx: 5,
          isUploadedUserLogo: false,
          archetype: "gemini_custom_3d",
          conceptLabel: "Puente Civil",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Space Grotesk", layout: "horizontal",
          mods: {},
          geminiCustomSvg: '<g><path d="M20 144 C32 54 148 54 160 144 L140 144 C130 78 50 78 40 144 Z" fill="#0078C0"/><path d="M36 144 C46 76 134 76 144 144 L128 144 C120 92 60 92 52 144 Z" fill="#88E0E0"/><rect x="54" y="64" width="16" height="80" fill="#585850"/><rect x="76" y="46" width="20" height="98" fill="#585850"/><rect x="102" y="74" width="16" height="70" fill="#585850"/><rect x="18" y="142" width="144" height="8" rx="4" fill="#0078C0"/></g>',
          note: "Iteración #5: Énfasis en torres de departamentos y puente de obra civil respetando la paleta original (#0078C0, #88E0E0, #585850)",
          prompt: "Iteración #5: Composición simétrica de tres torres residenciales (#585850) resguardadas por un arco de ingeniería civil en azul cobalto (#0078C0) y turquesa (#88E0E0).",
          geminiPrompt40w: "Iteración #5: Composición simétrica de tres torres residenciales (#585850) resguardadas por un arco de ingeniería civil en azul cobalto (#0078C0) y turquesa (#88E0E0)."
        },
        {
          idx: 6,
          isUploadedUserLogo: false,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: iter04Url,
          archetype: "gemini_custom_3d",
          conceptLabel: "Lockup Vertical",
          pri, sec, accentHex: acc,
          scale: 1.04, darkBg: false,
          fontFamily: "Montserrat", layout: "stacked",
          mods: { layout: "stacked", scale: 1.04 },
          geminiCustomSvg: tracedIter04Svg,
          note: "Iteración #6: Prueba de disposición vertical apilada (stacked) para cascos de obra y tótems constructivos",
          prompt: "Iteración #6: Disposición vertical monumental con isotipo centrado sobre la tipografía ARCO INGENIERÍA, ideal para señalética de obra y tótems.",
          geminiPrompt40w: "Iteración #6: Disposición vertical monumental con isotipo centrado sobre la tipografía ARCO INGENIERÍA, ideal para señalética de obra y tótems."
        },
        {
          idx: 7,
          isUploadedUserLogo: false,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: iter07Url,
          archetype: "gemini_custom_3d",
          conceptLabel: "Isometría 3D",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: tracedIter07Svg,
          note: "Iteración #7: Exploración isométrica 3D de arcos estructurales y torres residenciales en #0078C0, #88E0E0 y #585850",
          prompt: "Iteración #7: Exploración volumétrica isométrica de arcos de acero y torres de departamentos utilizando exclusivamente la paleta original de ARCO.",
          geminiPrompt40w: "Iteración #7: Exploración volumétrica isométrica de arcos de acero y torres de departamentos utilizando exclusivamente la paleta original de ARCO."
        },
        {
          idx: 8,
          isUploadedUserLogo: false,
          archetype: "gemini_custom_3d",
          conceptLabel: "Bisel Áureo",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: '<g><defs><linearGradient id="arcoPri8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0388D8"/><stop offset="100%" stop-color="#0078C0"/></linearGradient></defs><path d="M44 48 C88 22 146 52 154 148 L126 148 C118 76 82 54 48 70 Z" fill="url(#arcoPri8)"/><path d="M44 48 C68 38 96 48 106 72 L84 82 C76 66 58 60 40 68 Z" fill="#88E0E0"/><polygon points="24,148 56,52 84,52 116,148 92,148 84,122 48,122 40,148" fill="#585850"/><polygon points="54,102 78,102 68,72" fill="#FFFFFF"/></g>',
          note: "Iteración #8: Síntesis facetada de la letra A y el arco estructural con biseles de ingeniería civil",
          prompt: "Iteración #8: Síntesis escultórica que une el pilar A en gris arquitectónico (#585850) con un arco facetado en azul cobalto (#0078C0) y turquesa (#88E0E0).",
          geminiPrompt40w: "Iteración #8: Síntesis escultórica que une el pilar A en gris arquitectónico (#585850) con un arco facetado en azul cobalto (#0078C0) y turquesa (#88E0E0)."
        },
        {
          idx: 9,
          isUploadedUserLogo: false,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: iter10Url,
          archetype: "gemini_custom_3d",
          conceptLabel: "Prueba Oscuro",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: true,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: tracedIter10Svg,
          note: "Iteración #9: Verificación del emblema facetado sobre soporte oscuro corporativo",
          prompt: "Iteración #9: Prueba de alto contraste del emblema facetado de ARCO Ingeniería sobre fondo nocturno para cascos y maquinaria.",
          geminiPrompt40w: "Iteración #9: Prueba de alto contraste del emblema facetado de ARCO Ingeniería sobre fondo nocturno para cascos y maquinaria."
        },
        {
          idx: 10,
          isUploadedUserLogo: false,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: iter10Url,
          archetype: "gemini_custom_3d",
          conceptLabel: "Final Elegido",
          pri, sec, accentHex: acc,
          scale: 1.06, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: { scale: 1.06, layout: "horizontal", fontFamily: "Montserrat" },
          geminiCustomSvg: tracedIter10Svg,
          note: "Iteración #10 (Logo Final Seleccionado): Evolución Masterpiece NanoBanana PRO de ARCO Ingeniería con facetas arquitectónicas 3D y paleta 100% original (#0078C0, #88E0E0, #585850)",
          prompt: "Iteración #10 (Final Elegido): Emblema arquitectónico facetado NanoBanana PRO que fusiona el pilar A (#585850) con el arco estructural en azul cobalto (#0078C0) y turquesa (#88E0E0).",
          geminiPrompt40w: "Iteración #10 (Final Elegido): Emblema arquitectónico facetado NanoBanana PRO que fusiona el pilar A (#585850) con el arco estructural en azul cobalto (#0078C0) y turquesa (#88E0E0)."
        }
      ];

      st._uploadedLogoEvolvedOnce = true;
      st.step = 5;
      st.subStep = 2;
      st.logoIterationIndex = 1;
      window.renderTbbZeroScrollStage();
    })()`);

    // Capturar screenshot de CADA UNA de las 10 iteraciones (#1 a #10)
    for (let i = 1; i <= 10; i++) {
      await cdp.evalJs(`(() => {
        window.tbbRestoreLogoIteration(${i - 1});
        const strip = document.getElementById("tbbIterationPillsStrip");
        if (strip) {
          const btns = strip.querySelectorAll("button");
          if (btns[${i - 1}]) btns[${i - 1}].scrollIntoView({ behavior: "instant", inline: "center", block: "nearest" });
        }
      })()`);
      await sleep(550);
      const padNum = String(i).padStart(2, "0");
      const shotName = `sim_iter_${padNum}_step5_2.png`;
      await cdp.capturePng(path.join(ARTIFACT_DIR, shotName));
      console.log(`✓ Screenshot Iteración #${i}: ${shotName}`);
    }

    // Confirmar la Iteración #10 como LOGO FINAL OFICIAL y sincronizar con canvasState y Brandbook
    await cdp.evalJs(`(() => {
      window.tbbRestoreLogoIteration(9); // Índice 9 = Iteración #10
      const cs = window.canvasState;
      const st = window.tbbState;
      cs.uploaded_logo_data_url = ${JSON.stringify(iter10DataUrl)};
      cs.uploaded_logo_colors = ["#0078C0", "#88E0E0", "#585850"];
      cs.primary_color = "#0078C0";
      cs.secondary_color = "#88E0E0";
      cs.accent_color = "#585850";
      cs.selected_colors_hex = ["#FFFFFF", "#090D16", "#0078C0", "#88E0E0"];
      st.logoPriHex = "#0078C0";
      st.logoSecHex = "#88E0E0";
      st.logoDarkBg = false;
      if (typeof window.saveBrandSessionToLocalStorage === "function") {
        window.saveBrandSessionToLocalStorage(false, true);
      }
    })()`);

    // Video Vertical 9:16 Paso 5 -> Paso 6
    await cdp.evalJs(`(() => {
      openPhaseTransitionVideoCapsule(5, 6);
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) { vid.currentTime = 19.0; }
    })()`);
    await sleep(1200);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_26_video_vertical_paso5_a_6.png"));
    console.log("✓ Screenshot 26: Video Vertical 9:16 Paso 5 -> 6");
    await cdp.evalJs(`finishTransitionVideoAndEnterNextStep()`);
    await sleep(900);

    // -------------------------------------------------------------------------
    // PASO 6.1: BRANDBOOK DE 36 LÁMINAS CON EL LOGO #10 Y COLORES ORIGINALES
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 1;
      window.tbbState.plateIdx = 0;
      window._tbbStep6PendingCeremony = false;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(950);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_27_step6_1_lamina01_portada_logo10.png"));
    console.log("✓ Screenshot 27: Paso 6.1 Lámina 01 Portada con Logo #10");

    // Lámina 13: Terna Oficial con Logo #10
    await cdp.evalJs(`(() => {
      window.tbbState.plateIdx = 12; // Plate 13 (0-indexed 12)
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(750);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_28_step6_1_lamina13_terna_logo10.png"));
    console.log("✓ Screenshot 28: Paso 6.1 Lámina 13 Terna Oficial con Logo #10");

    // Lámina 21: Paleta Oficial de Marca (#0078C0, #88E0E0, #585850)
    await cdp.evalJs(`(() => {
      window.tbbState.plateIdx = 20; // Plate 21 (0-indexed 20)
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(750);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_29_step6_1_lamina21_paleta_original_arco.png"));
    console.log("✓ Screenshot 29: Paso 6.1 Lámina 21 Paleta Original ARCO");

    // -------------------------------------------------------------------------
    // PASO 6.2: BÓVEDA EJECUTIVA DE ENTREGABLES + KIT DE FUENTES (.TTF)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 2;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(750);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "sim_30_step6_2_boveda_entregables_y_fuentes.png"));
    console.log("✓ Screenshot 30: Paso 6.2 Bóveda de Entregables y Kit de Fuentes");

    // Exportar el HTML completo de las 36 láminas actualizado con el Logo #10 y paleta original
    const fullHtml = await cdp.evalJs(`(() => {
      const bProfile = window.buildActiveBrandProfileForV80 ? window.buildActiveBrandProfileForV80() : null;
      if (bProfile && window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml === "function") {
        return window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml(bProfile);
      }
      return "";
    })()`);
    if (fullHtml) {
      fs.writeFileSync(path.join(ARTIFACT_DIR, "Manual_Marca_36_Laminas_Arco_Ingenieria.html"), fullHtml, "utf8");
      console.log("✓ Manual_Marca_36_Laminas_Arco_Ingenieria.html actualizado con Logo #10 y colores originales.");
    }

  } finally {
    if (cdp) cdp.close();
    try { chromeProc.kill("SIGKILL"); } catch (e) {}
  }
  console.log("=== SIMULACRO E2E COMPLETADO CON ÉXITO ===");
}

main().catch((err) => {
  console.error("Error en simulacro E2E:", err);
  process.exit(1);
});
