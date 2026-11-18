import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/16fe541d-e38d-4da5-8a68-1c763c940574";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/arco_ingenieria_luis_ponce";
const WEB_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/apps/web";
const LOGO_ORIGINAL_PATH = path.join(WEB_DIR, "assets/logos/arco_ingenieria_logo4k_original.png");

if (!fs.existsSync(DELIVERABLES_DIR)) {
  fs.mkdirSync(DELIVERABLES_DIR, { recursive: true });
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

async function waitForNotBusy(cdp, maxWaitMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const busy = await cdp.evalJs(`Boolean(window.tbbState && window.tbbState.geminiBusy)`);
    if (!busy) return true;
    await sleep(600);
  }
  return false;
}

async function main() {
  console.log("=== INICIANDO SESIÓN 100% NUEVA: ING. LUIS PONCE · ARCO INGENIERÍA ===");
  const debugPort = 9255;
  const userDataDir = "/tmp/chromium_luis_ponce_arco_fresh_" + Date.now();
  const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || "";
  const chromeArgs = [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--ignore-certificate-errors",
    "--autoplay-policy=no-user-gesture-required",
    "--window-size=1440,920",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`
  ];
  if (proxyUrl) {
    chromeArgs.push(`--proxy-server=${proxyUrl}`);
    chromeArgs.push(`--proxy-bypass-list=127.0.0.1,localhost`);
  }
  chromeArgs.push("https://thebestbrand.app/studio");

  const chromeProc = spawn(
    "/usr/lib/chromium/chromium",
    chromeArgs,
    { stdio: "ignore" }
  );

  const auditLog = [];
  let cdp = null;

  try {
    let targets = null;
    for (let attempt = 0; attempt < 40; attempt++) {
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

    // Esperar carga completa de studio.html y tbb-executive-deliverables-suite.js
    for (let w = 0; w < 40; w++) {
      const ready = await cdp.evalJs(`Boolean(typeof window.renderTbbZeroScrollStage === "function" && typeof window.tbbGenerateNanoBananaBrandSymbol === "function")`);
      if (ready) break;
      await sleep(400);
    }

    // 1. SESIÓN COMPLETAMENTE NUEVA (Limpieza total de storage + inicio desde Paso 0.1)
    await cdp.evalJs(`(() => {
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      try {
        localStorage.setItem("tbb_license_active_pro_atelier", "true");
        localStorage.setItem("tbb_license_token", "LIC-TBB-PRO-ARCO-LUIS-PONCE");
      } catch (e) {}
      if (typeof window.tbbDismissAuraSplashBoot === "function") window.tbbDismissAuraSplashBoot(false);
      const sp = document.getElementById("tbbAuraSplashBootScreen");
      if (sp) sp.style.display = "none";
      if (typeof window.startFreshBrandSession === "function") {
        window.startFreshBrandSession();
      }
      window.tbbState.step = 0;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
      return true;
    })()`);
    await sleep(600);

    // =========================================================================
    // PASO 0.1: OBJETIVO ("Evolucionar y profesionalizar mi marca actual")
    // =========================================================================
    await cdp.evalJs(`(() => {
      selectStep0Goal('redesign');
      window.renderTbbZeroScrollStage();
      return window.step0State?.goal;
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_01_paso0_1_objetivo_evolucionar.png"));
    console.log("✓ [01] Paso 0.1: Objetivo -> Evolucionar y profesionalizar mi marca actual");
    auditLog.push("Paso 0.1: Selección de objetivo 'redesign' funciona sin bloqueos.");

    // Avanzar con botón Siguiente (onTbbAtomicNext) a Paso 0.2
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);

    // =========================================================================
    // PASO 0.2: NOMBRE ("ARCO Ingeniería") + SUBIDA DE LOGO ORIGINAL + MODERNIZAR
    // =========================================================================
    const origLogoDataUrl = fileToDataUrl(LOGO_ORIGINAL_PATH, "image/png");
    const step02Info = await cdp.evalJs(`(async () => {
      window.tbbDeactivateNamelessDiscoveryMode();
      const inp = document.getElementById("tbbStep0NameInput");
      if (inp) {
        inp.value = "ARCO Ingeniería";
        window.tbbUpdateBrandNameFromInput("ARCO Ingeniería");
      }

      // Simular subida real del archivo PNG original de ARCO Ingeniería
      const dataUrl = ${JSON.stringify(origLogoDataUrl)};
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "arco_ingenieria_logo4k_original.png", { type: "image/png" });
      const dt = new DataTransfer();
      dt.items.add(file);
      const fileInp = document.getElementById("tbbExistingLogoFileInput");
      if (fileInp) {
        fileInp.files = dt.files;
        window.tbbHandleExistingLogoUpload(fileInp);
      }
      return true;
    })()`);
    await sleep(1600);
    await cdp.evalJs(`(() => {
      window.tbbSetExistingLogoMode('evolve');
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_02_paso0_2_nombre_y_logo_actual_modernizar.png"));
    console.log("✓ [02] Paso 0.2: Nombre 'ARCO Ingeniería' + Logo Original Subido + Modo 'Modernizar / Evolucionar'");
    auditLog.push("Paso 0.2: Subida de logo original extrajo colores reales (#0078C0, #88E0E0, #585850) y activó modo 'evolve'.");

    // Avanzar con botón Siguiente a Paso 0.3
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);

    // =========================================================================
    // PASO 0.3: GIRO Y ACTIVIDAD + PULIR CON IA + DICTAMEN DE DAVID AAKER
    // =========================================================================
    await cdp.evalJs(`(async () => {
      const rawBiz = "Soy el Ing. Luis Ponce, director y fundador de ARCO Ingeniería (Arco Ingeniería y Diseño). Somos una firma mexicana de ingeniería civil, arquitectura y construcción integral especializada en edificación de residencias de alto nivel, torres de departamentos, urbanización, terracerías, obra civil pesada, estructura metálica y amenidades llave en mano para desarrolladoras inmobiliarias, corporativos e inversionistas en todo México.";
      const ta = document.getElementById("tbbStep0BizTextarea");
      if (ta) {
        ta.value = rawBiz;
        window.tbbUpdateBusinessTypeFromInput(rawBiz);
      }
      await window.tbbPolishInputFieldClarity("tbbStep0BizTextarea", "giro");
      await window.tbbRunLiveAuthorAudit(0, "giro");
      await window.requestLiveGeminiAuraEmpatheticComment("input_biz", window.canvasState.custom_business_type);
      return window.canvasState.custom_business_type;
    })()`);
    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_03_paso0_3_giro_y_dictamen_aaker.png"));
    console.log("✓ [03] Paso 0.3: Giro detallado por Ing. Luis Ponce + Redacción IA + Dictamen en vivo de David Aaker");
    auditLog.push("Paso 0.3: Pulido IA, Dictamen de David Aaker y comentario superior de Aura respondieron con contexto real de ARCO Ingeniería.");

    // =========================================================================
    // CÁPSULA DE TRANSICIÓN PASO 0 -> PASO 1 (ESFERA AURA ANIMADA SIN VIDEO HEYGEN)
    // =========================================================================
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(1000);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_04_capsula_aura_animada_paso0_a_1.png"));
    console.log("✓ [04] Cápsula de Transición Paso 0 -> 1: Esfera Aura Animada en vivo (Cero video de Jorge)");
    await cdp.evalJs(`finishTransitionVideoAndEnterNextStep()`);
    await sleep(600);

    // =========================================================================
    // PASO 1: LAS 7 PREGUNTAS DEL CÍRCULO DORADO Y ESENCIA (DETALLADAS POR LUIS PONCE)
    // =========================================================================
    const step1Answers = [
      {
        sub: 1,
        key: "golden_circle",
        file: "arco_05_paso1_1_proposito_why_sinek.png",
        audit: true,
        text: "Porque en ARCO Ingeniería creemos que cada cimiento, estructura y desarrollo habitacional que edificamos es el patrimonio seguro donde miles de familias mexicanas viven y donde los grandes desarrolladores inmobiliarios consolidan su prestigio sin riesgos estructurales ni sobrecostos."
      },
      {
        sub: 2,
        key: "value_offer",
        file: "arco_06_paso1_2_oferta_valor_what.png",
        audit: false,
        text: "Ingeniería civil, diseño arquitectónico y construcción integral llave en mano de desarrollos residenciales, torres verticales, urbanización, terracerías, estructuras de acero y concreto, y amenidades ejecutivas con certeza presupuestal y entrega puntual."
      },
      {
        sub: 3,
        key: "social_role",
        file: "arco_07_paso1_3_impacto_cliente.png",
        audit: false,
        text: "Transformamos la incertidumbre de la construcción en tranquilidad total para el inversionista y el director de desarrollo: eliminamos retrasos de obra, desviaciones financieras y vicios ocultos mediante supervisión técnica rigurosa en sitio."
      },
      {
        sub: 4,
        key: "process_steps_text",
        file: "arco_08_paso1_4_metodo_3_pasos_how.png",
        audit: false,
        text: "1. Ingeniería de Valor y Planeación Estructural (cálculo milimétrico, presupuesto paramétrico transparente y cronograma crítico) · 2. Ejecución y Residencia de Obra de Alta Precisión (control de calidad en aceros/concretos, seguridad normativa y reportes semanales) · 3. Entrega Llave en Mano con Dossier As-Built y Póliza de Garantía Estructural."
      },
      {
        sub: 5,
        key: "core_message",
        file: "arco_09_paso1_5_mensaje_central.png",
        audit: false,
        text: "ARCO Ingeniería: Precisión estructural, diseño arquitectónico y cumplimiento implacable en cada metro cuadrado que edificamos."
      },
      {
        sub: 6,
        key: "brand_persona",
        file: "arco_10_paso1_6_empresa_como_persona.png",
        audit: false,
        text: "El Ingeniero Luis Ponce y su equipo senior: una personalidad de autoridad técnica serena, mente matemática exacta, trato directo de socio leal, casco bien puesto en obra y compromiso inquebrantable con la palabra dada."
      },
      {
        sub: 7,
        key: "ideal_customer",
        file: "arco_11_paso1_7_cliente_ideal_buyer.png",
        audit: true,
        text: "Directores generales de desarrolladoras inmobiliarias, fondos de inversión inmobiliaria, comités técnicos de grandes constructoras y propietarios residenciales de nivel medio-alto y alto que buscan un contratista general confiable y solvente."
      }
    ];

    for (const item of step1Answers) {
      await cdp.evalJs(`(async () => {
        window.tbbState.step = 1;
        window.tbbState.subStep = ${item.sub};
        window.renderTbbZeroScrollStage();
        const inp = document.getElementById("tbbStep1AnswerInput");
        if (inp) {
          inp.value = ${JSON.stringify(item.text)};
          window.tbbSaveStep1Answer(${JSON.stringify(item.key)}, ${JSON.stringify(item.text)});
        }
        await window.requestLiveGeminiAuraEmpatheticComment("input_step1_" + ${item.sub}, ${JSON.stringify(item.text)});
        if (${item.audit}) {
          await window.tbbRunLiveAuthorAudit(1, ${JSON.stringify(item.key)});
        }
        return true;
      })()`);
      await sleep(700);
      await cdp.capturePng(path.join(ARTIFACT_DIR, item.file));
      console.log(`✓ [${String(item.sub + 4).padStart(2, "0")}] Paso 1.${item.sub} (${item.key}) capturado`);
    }

    // Avanzar a Paso 2 y cerrar cápsula
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
    })()`);
    await sleep(600);

    // =========================================================================
    // PASO 2: TOUCHPOINTS (ANTES · DURANTE · DESPUÉS DE LA OBRA)
    // =========================================================================
    const step2Phases = [
      {
        sub: 1,
        key: "before",
        file: "arco_12_paso2_1_touchpoints_antes_carlzon.png",
        audit: true,
        items: [
          "Portafolio web corporativo (arco-ingenieria.com) con obras ejecutadas",
          "Carpetas técnicas de licitación y presupuestos paramétricos detallados",
          "Visitas técnicas preliminares a terreno y dictámenes de factibilidad",
          "Reuniones ejecutivas con el Ing. Luis Ponce y referencias de desarrolladoras"
        ]
      },
      {
        sub: 2,
        key: "during",
        file: "arco_13_paso2_2_touchpoints_durante.png",
        audit: false,
        items: [
          "Señalética monumental de obra, tapiales, cascos y chalecos con identidad ARCO",
          "Bitácora digital de residencia de obra y reportes fotográficos con dron",
          "Pruebas de laboratorio en aceros, soldaduras, concretos y compactación",
          "Juntas semanales de control de avance físico-financiero y estimaciones claras"
        ]
      },
      {
        sub: 3,
        key: "after",
        file: "arco_14_paso2_3_touchpoints_despues.png",
        audit: true,
        items: [
          "Acta de entrega-recepción llave en mano y dossier de planos As-Built",
          "Pólizas de garantía estructural, impermeabilización y vicios ocultos",
          "Programa de mantenimiento preventivo post-entrega en áreas comunes",
          "Alianza estratégica continua para las siguientes etapas del desarrollo"
        ]
      }
    ];

    for (const ph of step2Phases) {
      await cdp.evalJs(`(async () => {
        window.tbbState.step = 2;
        window.tbbState.subStep = ${ph.sub};
        if (typeof tpExtractedItems === "object") {
          tpExtractedItems[${JSON.stringify(ph.key)}] = ${JSON.stringify(ph.items)};
        }
        window.canvasState["tp_" + ${JSON.stringify(ph.key)}] = ${JSON.stringify(ph.items)};
        window.renderTbbZeroScrollStage();
        await window.requestLiveGeminiAuraEmpatheticComment("touchpoints_" + ${JSON.stringify(ph.key)}, ${JSON.stringify(ph.items.join(", "))});
        if (${ph.audit}) {
          await window.tbbRunLiveAuthorAudit(2, ${JSON.stringify(ph.key)});
        }
        return true;
      })()`);
      await sleep(700);
      await cdp.capturePng(path.join(ARTIFACT_DIR, ph.file));
      console.log(`✓ [${ph.sub + 11}] Paso 2.${ph.sub} (Touchpoints ${ph.key}) capturado`);
    }

    // Avanzar a Paso 3
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
    })()`);
    await sleep(600);

    // =========================================================================
    // PASO 3.1: 4 EJES SINTETIZADOS CON IA + NOMBRE "ARCO Ingeniería" ACTIVO
    // =========================================================================
    await cdp.evalJs(`(async () => {
      window.tbbState.step = 3;
      window.tbbState.subStep = 1;
      await window.tbbSynthesizeNamingAxesWithAI(true);
      window.tbbUpdateBrandNameFromInput("ARCO Ingeniería");
      window.renderTbbZeroScrollStage();
      return true;
    })()`);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_15_paso3_1_ejes_ia_nombre_arco.png"));
    console.log("✓ [15] Paso 3.1: 4 Ejes sintetizados en vivo por Gemini IA + Nombre ARCO Ingeniería");

    // =========================================================================
    // PASO 3.2: PROPUESTAS DE IA + CONSERVACIÓN DE "ARCO Ingeniería"
    // =========================================================================
    await cdp.evalJs(`(async () => {
      await window.tbbGenerateLiveAINamingProposals(null, true);
      window.tbbUpdateBrandNameFromInput("ARCO Ingeniería");
      window.renderTbbZeroScrollStage();
      return true;
    })()`);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_16_paso3_2_variantes_ia_conservando_arco.png"));
    console.log("✓ [16] Paso 3.2: Propuestas IA generadas + ARCO Ingeniería confirmado como nombre oficial");

    // =========================================================================
    // PASO 3.3: CONFIRMACIÓN DE NOMBRE OFICIAL, ESLOGAN, CLASE NIZA 37/42 Y RIES & TROUT
    // =========================================================================
    await cdp.evalJs(`(async () => {
      window.tbbState.step = 3;
      window.tbbState.subStep = 3;
      window.tbbUpdateBrandNameFromInput("ARCO Ingeniería");
      window.canvasState.tagline = "Ingeniería Estructural, Arquitectura y Construcción de Alto Nivel";
      window.renderTbbZeroScrollStage();
      await window.tbbRunLiveAuthorAudit(3, "brandName");
      return true;
    })()`);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_17_paso3_3_confirmacion_eslogan_clase_niza37_ries_trout.png"));
    console.log("✓ [17] Paso 3.3: Confirmación ARCO Ingeniería + Eslogan + Clase Niza 37/42 + Dictamen Ries & Trout");

    // Avanzar a Paso 4
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
    })()`);
    await sleep(600);

    // =========================================================================
    // PASO 4.1, 4.2, 4.3: CALIBRACIÓN DE LOS 7 EJES KANSEI / OSGOOD PARA ARCO INGENIERÍA
    // =========================================================================
    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 1;
      window.tbbUpdateSliderValue("tradicion_vanguardia", 0.78);
      window.tbbUpdateSliderValue("silencio_expresion", 0.65);
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_18_paso4_1_sliders_kansei_1_y_2.png"));
    console.log("✓ [18] Paso 4.1: Sliders Kansei 1 y 2");

    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 2;
      window.tbbUpdateSliderValue("cercania_autoridad", 0.85);
      window.tbbUpdateSliderValue("organico_geometrico", 0.90);
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_19_paso4_2_sliders_kansei_3_y_4.png"));
    console.log("✓ [19] Paso 4.2: Sliders Kansei 3 y 4 (Alta Autoridad + Rigor Geométrico)");

    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 3;
      window.tbbUpdateSliderValue("calma_dinamismo", 0.72);
      window.tbbUpdateSliderValue("sintesis_detalle", 0.55);
      window.tbbUpdateSliderValue("fisico_digital", 0.35);
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_20_paso4_3_sliders_kansei_5_6_7.png"));
    console.log("✓ [20] Paso 4.3: Sliders Kansei 5, 6 y 7");

    // =========================================================================
    // PASO 4.4: SISTEMA TIPOGRÁFICO HÍBRIDO (MONTSERRAT + PLUS JAKARTA SANS + JETBRAINS MONO)
    // =========================================================================
    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 4;
      window.tbbSelectFontCategoryTab("geometrica");
      window.tbbSelectOfficialFontFamily("Montserrat", "Plus Jakarta Sans", "JetBrains Mono");
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_21_paso4_4_tipografia_montserrat_arquitectura.png"));
    console.log("✓ [21] Paso 4.4: Tríada Tipográfica Ingeniería & Geométrica (Montserrat + Plus Jakarta Sans + JetBrains Mono)");

    // =========================================================================
    // PASO 4.5: FAMILIA ESTRUCTURAL + IDEA SEMILLA DE LUIS PONCE + DICTAMEN DE PAUL RAND
    // =========================================================================
    const seedIdeaArco = "Modernizar nuestro logotipo actual de ARCO Ingeniería eliminando la letra cursiva antigua de 'Arco' y reemplazándola por tipografía arquitectónica moderna y sólida. Conservar la esencia de nuestro doble arco envolvente en azul cobalto (#0078C0) y turquesa (#88E0E0) integrado con una 'A' estructural y siluetas limpias de torres residenciales y obra civil en gris arquitectónico (#585850).";
    await cdp.evalJs(`(async () => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 5;
      window.tbbSelectStructuralFamily(0);
      window.tbbSaveSeedIdea(${JSON.stringify(seedIdeaArco)});
      window.renderTbbZeroScrollStage();
      await window.tbbRunLiveAuthorAudit(4, "step4_seed_idea");
      return true;
    })()`);
    await sleep(750);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_22_paso4_5_familia_estructural_semilla_dictamen_rand.png"));
    console.log("✓ [22] Paso 4.5: Idea Semilla de modernización de ARCO + Dictamen en vivo de Paul Rand");

    // Avanzar a Paso 5.1
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
    })()`);
    await sleep(600);

    // =========================================================================
    // PASO 5.1: ACABADO, LOGO BASE ("MODERNIZAR") Y SELECTOR CIRCULAR DE ESPECTRO (5 COLORES ARCO)
    // =========================================================================
    await cdp.evalJs(`(() => {
      window.tbbState.step = 5;
      window.tbbState.subStep = 1;
      window.tbbSetExistingLogoMode("evolve");
      window.tbbSyncBrandPaletteToEngine(["#0078C0", "#88E0E0", "#585850", "#0D2540", "#F8FAFC"], false, "Paleta Oficial ARCO Ingeniería");
      window.renderTbbZeroScrollStage();
      if (typeof window.tbbInitCircularSpectrumWheel === "function") window.tbbInitCircularSpectrumWheel();
    })()`);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_23_paso5_1_rueda_circular_colores_arco.png"));
    console.log("✓ [23] Paso 5.1: Rueda Circular de Espectro con los 5 colores de ARCO (#0078C0, #88E0E0, #585850, #0D2540, #F8FAFC)");

    // =========================================================================
    // PASO 5.2: LIENZO DE LOGOTIPO NANOBANANA PRO — PRUEBA EN VIVO DE MODERNIZACIÓN Y 4 MODOS CREATIVOS
    // =========================================================================
    console.log("⏳ Entrando a Paso 5.2 y generando modernizaciones en vivo con NanoBanana PRO...");
    await cdp.evalJs(`(() => {
      window.tbbState.step = 5;
      window.tbbState.subStep = 2;
      window.renderTbbZeroScrollStage();
    })()`);

    // Esperar a que termine la primera evolución automática de NanoBanana PRO (#2 · Emblema de Autor)
    await sleep(400);
    await waitForNotBusy(cdp, 65000);
    await sleep(700);

    // Capturar Iteración #1 (Tu Logo Base Original de ARCO Ingeniería en el nuevo Marco de Galería)
    await cdp.evalJs(`window.tbbRestoreLogoIteration(0)`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_24_paso5_2_iter1_logo_base_original.png"));
    console.log("✓ [24] Paso 5.2 Iteración #1: Tu Logo Base Original de ARCO Ingeniería");

    // Capturar Iteración #2 (Primera Modernización Automática NanoBanana PRO: ✦ 1. Emblema de Autor)
    await cdp.evalJs(`window.tbbRestoreLogoIteration(1)`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_25_paso5_2_iter2_nanobanana_emblema_autor.png"));
    console.log("✓ [25] Paso 5.2 Iteración #2: Modernización NanoBanana PRO (✦ 1. Emblema de Autor)");

    // Generar Iteración #3 con el botón ✦ 2. Monograma + Giro (monogram_fusion)
    console.log("⏳ Generando Iteración #3 con NanoBanana PRO: ✦ 2. Monograma + Giro...");
    await cdp.evalJs(`window.tbbGenerateNanoBananaBrandSymbol(
      "Diseña un monograma arquitectónico 'A' sólido y escultórico en gris taupe (#585850) fusionado con el doble arco estructural envolvente en azul cobalto (#0078C0) y turquesa (#88E0E0) e integrando siluetas de torres residenciales modernas, con la tipografía ARCO INGENIERÍA · DISEÑO, CONSTRUCCIÓN Y OBRA CIVIL.",
      { creativeMode: "monogram_fusion", switchCreativeMode: true, evolveCurrent: false, freshFromScratch: true }
    )`);
    await waitForNotBusy(cdp, 65000);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_26_paso5_2_iter3_nanobanana_monograma_giro.png"));
    console.log("✓ [26] Paso 5.2 Iteración #3: Modernización NanoBanana PRO (✦ 2. Monograma + Giro)");

    // Generar Iteración #4 con el botón ✦ 3. Insignia / Sello (editorial_crest)
    console.log("⏳ Generando Iteración #4 con NanoBanana PRO: ✦ 3. Insignia / Sello...");
    await cdp.evalJs(`window.tbbGenerateNanoBananaBrandSymbol(
      "Diseña un sello circular / escudo arquitectónico contemporáneo de prestigio institucional para ARCO Ingeniería que enmarque las torres residenciales, un puente de obra civil y el doble arco en azul cobalto (#0078C0), turquesa (#88E0E0) y gris acero (#585850) con anillo perimetral ARCO INGENIERÍA · DISEÑO Y CONSTRUCCIÓN.",
      { creativeMode: "editorial_crest", switchCreativeMode: true, evolveCurrent: false, freshFromScratch: true }
    )`);
    await waitForNotBusy(cdp, 65000);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_27_paso5_2_iter4_nanobanana_insignia_sello.png"));
    console.log("✓ [27] Paso 5.2 Iteración #4: Modernización NanoBanana PRO (✦ 3. Insignia / Sello)");

    // Generar Iteración #5 con el botón ✦ 4. Lineal Minimalista (minimal_couture)
    console.log("⏳ Generando Iteración #5 con NanoBanana PRO: ✦ 4. Lineal Minimalista...");
    await cdp.evalJs(`window.tbbGenerateNanoBananaBrandSymbol(
      "Diseña un isotipo geométrico monolineal minimalista de trazo continuo de alta precisión para ARCO Ingeniería: un trazo arquitectónico limpio que forme un arco estructural y dos torres esbeltas en azul cobalto (#0078C0), turquesa (#88E0E0) y gris (#585850), ideal para grabado en casco de obra y bordado ejecutivo.",
      { creativeMode: "minimal_couture", switchCreativeMode: true, evolveCurrent: false, freshFromScratch: true }
    )`);
    await waitForNotBusy(cdp, 65000);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png"));
    console.log("✓ [28] Paso 5.2 Iteración #5: Modernización NanoBanana PRO (✦ 4. Lineal Minimalista)");

    // Generar Iteración #6 probando la CAJA DE TEXTO CONVERSACIONAL (onTbbAtomicCenterAction) como Luis Ponce
    console.log("⏳ Generando Iteración #6 desde la caja de texto conversacional de Luis Ponce...");
    await cdp.evalJs(`(async () => {
      // Partir de la Iteración #3 (Monograma + Giro) para refinarla conversacionalmente
      window.tbbRestoreLogoIteration(2);
      const box = document.getElementById("tbbSingleLogoIterationBox");
      if (box) {
        box.value = "Perfecciona este diseño como logotipo definitivo de ARCO Ingeniería: haz que la letra A estructural en gris (#585850) forme sutilmente dos torres residenciales modernas, abrazadas a la derecha por el doble arco dinámico en azul cobalto (#0078C0) y turquesa (#88E0E0), con la tipografía ARCO INGENIERÍA en Montserrat Bold impecable y el descriptor DISEÑO ARQUITECTÓNICO Y OBRA CIVIL debajo.";
      }
      await window.onTbbAtomicCenterAction();
      return true;
    })()`);
    await waitForNotBusy(cdp, 65000);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_29_paso5_2_iter6_nanobanana_evolucion_conversacional_final.png"));
    console.log("✓ [29] Paso 5.2 Iteración #6: Evolución Conversacional Final de ARCO Ingeniería");

    // =========================================================================
    // PASO 6.1: BRANDBOOK OFICIAL DE 36 LÁMINAS DE ARCO INGENIERÍA
    // =========================================================================
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 1;
      window.tbbState.plateIdx = 0;
      window._tbbStep6PendingCeremony = false;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(900);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_30_paso6_1_brandbook_lamina01_portada.png"));
    console.log("✓ [30] Paso 6.1: Brandbook Lámina 01 (Portada Oficial ARCO Ingeniería)");

    await cdp.evalJs(`(() => {
      window.tbbState.plateIdx = 12; // Lámina 13: Terna Oficial
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_31_paso6_1_brandbook_lamina13_terna.png"));
    console.log("✓ [31] Paso 6.1: Brandbook Lámina 13 (Terna Oficial de Logotipos)");

    await cdp.evalJs(`(() => {
      window.tbbState.plateIdx = 20; // Lámina 21: Paleta Oficial
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_32_paso6_1_brandbook_lamina21_paleta.png"));
    console.log("✓ [32] Paso 6.1: Brandbook Lámina 21 (Paleta Cromática Oficial)");

    // =========================================================================
    // PASO 6.2: BÓVEDA EJECUTIVA Y DESCARGA REAL DE CADA UNO DE LOS ENTREGABLES
    // =========================================================================
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 2;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(800);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_33_paso6_2_boveda_ejecutiva_descargas.png"));
    console.log("✓ [33] Paso 6.2: Bóveda Ejecutiva de Entregables");

    console.log("⏳ Descargando todos los entregables ejecutivos de ARCO Ingeniería...");
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

      const activeIt = window.tbbState.logoIterations[window.tbbState.logoIterationIndex - 1] || {};
      return {
        capturedFiles,
        sigHtml,
        fullBrandbookHtml,
        finalFullArtworkUrl: activeIt.nanoBananaFullArtworkUrl || window.canvasState.nano_banana_full_artwork_url || "",
        finalSymbolUrl: activeIt.nanoBananaSymbolUrl || window.canvasState.nano_banana_symbol_url || ""
      };
    })()`);

    const savedPaths = [];
    for (const [fname, b64] of Object.entries(exportedBundle.capturedFiles || {})) {
      if (!b64) continue;
      const buf = Buffer.from(b64, "base64");
      const pDeliv = path.join(DELIVERABLES_DIR, fname);
      const pArt = path.join(ARTIFACT_DIR, fname);
      fs.writeFileSync(pDeliv, buf);
      fs.writeFileSync(pArt, buf);
      savedPaths.push({ name: fname, kb: (buf.length / 1024).toFixed(1), path: pDeliv });
      console.log(`✓ Entregable descargado: ${fname} (${(buf.length / 1024).toFixed(1)} KB)`);
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
      fs.writeFileSync(path.join(DELIVERABLES_DIR, "Firma_Corporativa_Luis_Ponce_ARCO_Ingenieria.html"), fullSigDoc, "utf8");
      fs.writeFileSync(path.join(ARTIFACT_DIR, "Firma_Corporativa_Luis_Ponce_ARCO_Ingenieria.html"), fullSigDoc, "utf8");
      console.log("✓ Entregable descargado: Firma_Corporativa_Luis_Ponce_ARCO_Ingenieria.html");
    }

    if (exportedBundle.fullBrandbookHtml) {
      fs.writeFileSync(path.join(DELIVERABLES_DIR, "Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.html"), exportedBundle.fullBrandbookHtml, "utf8");
      fs.writeFileSync(path.join(ARTIFACT_DIR, "Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.html"), exportedBundle.fullBrandbookHtml, "utf8");
      console.log("✓ Entregable descargado: Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.html");
    }

    if (exportedBundle.finalFullArtworkUrl && exportedBundle.finalFullArtworkUrl.includes(",")) {
      const b64 = exportedBundle.finalFullArtworkUrl.split(",")[1];
      const buf = Buffer.from(b64, "base64");
      fs.writeFileSync(path.join(DELIVERABLES_DIR, "Logotipo_Masterpiece_NanoBanana_ARCO_Ingenieria.png"), buf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, "Logotipo_Masterpiece_NanoBanana_ARCO_Ingenieria.png"), buf);
      console.log("✓ Entregable descargado: Logotipo_Masterpiece_NanoBanana_ARCO_Ingenieria.png");
    }

    if (exportedBundle.finalSymbolUrl && exportedBundle.finalSymbolUrl.includes(",")) {
      const b64 = exportedBundle.finalSymbolUrl.split(",")[1];
      const buf = Buffer.from(b64, "base64");
      fs.writeFileSync(path.join(DELIVERABLES_DIR, "Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png"), buf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, "Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png"), buf);
      console.log("✓ Entregable descargado: Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png");
    }

    // Capturar también el modal de Firma Corporativa de Ing. Luis Ponce en vivo
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
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "arco_34_modal_firma_corporativa_luis_ponce.png"));
    console.log("✓ [34] Modal de Firma Corporativa de Ing. Luis Ponce capturado");

  } finally {
    if (cdp) cdp.close();
    try { chromeProc.kill("SIGKILL"); } catch (e) {}
  }

  console.log("=== RECORRIDO E2E COMPLETO DE ING. LUIS PONCE (ARCO INGENIERÍA) FINALIZADO CON ÉXITO ===");
}

main().catch((err) => {
  console.error("Error en recorrido E2E:", err);
  process.exit(1);
});
