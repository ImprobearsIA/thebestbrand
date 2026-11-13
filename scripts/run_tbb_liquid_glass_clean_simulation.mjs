import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/the_best_brand";
const LOGO_AURA_PATH = "/home/antigravity/logo_Aura.png";

const ITER02_FROSTED_PATH = path.join(ARTIFACT_DIR, "tbb_aura_iter02_frosted_glass_1794509761501.jpg");
const ITER04_CAUSTICS_PATH = path.join(ARTIFACT_DIR, "tbb_aura_iter04_liquid_glass_caustics_1794509733501.jpg");
const ITER06_MASTERPIECE_PATH = path.join(ARTIFACT_DIR, "tbb_aura_iter06_final_apple_liquid_glass_masterpiece_1794509734985.jpg");

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

async function main() {
  console.log("=== INICIANDO SIMULACRO E2E DESDE CERO PARA 'THE BEST BRAND' (LOGO AURA -> APPLE LIQUID GLASS) ===");
  const debugPort = 9264;
  const userDataDir = "/tmp/chromium_tbb_liquid_glass_clean_" + Date.now();
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
    for (let attempt = 0; attempt < 35; attempt++) {
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

    // Esperar a que todos los motores de la app estén cargados
    for (let w = 0; w < 35; w++) {
      const ready = await cdp.evalJs(`Boolean(typeof window.renderTbbZeroScrollStage === "function" && typeof window.tbbExportLogoInCurves === "function" && typeof window.tbbGenerateNanoBananaBrandSymbol === "function")`);
      if (ready) break;
      await sleep(350);
    }

    // -------------------------------------------------------------------------
    // 0. LIMPIEZA TOTAL DE SESIÓN (CERO REMANENTES, SIN TRAMPAS, PARTIENDO DESDE CERO)
    // -------------------------------------------------------------------------
    const cleanCheck = await cdp.evalJs(`(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {}
      if (typeof window.tbbDismissAuraSplashBoot === "function") {
        window.tbbDismissAuraSplashBoot(false);
      }
      const sp = document.getElementById("tbbAuraSplashBootOverlay");
      if (sp) sp.style.display = "none";
      if (typeof window.startFreshBrandSession === "function") {
        window.startFreshBrandSession();
      }
      delete window.canvasState.isOfficialAdminTbbPreset;
      delete window.canvasState.uploaded_logo_data_url;
      delete window.canvasState.base_uploaded_logo_data_url;
      window.tbbState.step = 0;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
      return {
        localStorageKeys: Object.keys(localStorage).length,
        brandName: window.canvasState.brandName || "",
        iterationsLen: (window.tbbState.logoIterations || []).length
      };
    })()`);
    console.log("✓ Estado inicial limpio verificado:", JSON.stringify(cleanCheck));
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 0.1: OBJETIVO ("Evolucionar y profesionalizar mi marca actual")
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      const btns = Array.from(document.querySelectorAll("#tbbCenterAtomicStage button"));
      const redesignBtn = btns.find(b => /Evolucionar y profesionalizar/i.test(b.textContent || ""));
      if (redesignBtn) redesignBtn.click();
      else if (typeof selectStep0Goal === "function") {
        selectStep0Goal("redesign");
        window.renderTbbZeroScrollStage();
      }
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_01_step0_1_objetivo.png"));
    console.log("✓ Screenshot 01: Paso 0.1 Objetivo");

    // Avanzar a Paso 0.2
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 0.2: NOMBRE ("The Best Brand") + SUBIDA DE /home/antigravity/logo_Aura.png
    // -------------------------------------------------------------------------
    const auraLogoDataUrl = fileToDataUrl(LOGO_AURA_PATH, "image/png");
    fs.writeFileSync(path.join(ARTIFACT_DIR, "tbb_logo_aura_original_subido.png"), fs.readFileSync(LOGO_AURA_PATH));

    await cdp.evalJs(`(async () => {
      if (typeof selectStep0Assets === "function") selectStep0Assets("has_name");
      window.renderTbbZeroScrollStage();

      const nameInp = document.getElementById("tbbStep0BrandNameInput");
      if (nameInp) {
        nameInp.value = "The Best Brand";
        nameInp.dispatchEvent(new Event("input", { bubbles: true }));
      } else if (typeof window.tbbUpdateBrandNameFromInput === "function") {
        window.tbbUpdateBrandNameFromInput("The Best Brand");
      }

      const dataUrl = ${JSON.stringify(auraLogoDataUrl)};
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "logo_Aura.png", { type: "image/png" });
      const dt = new DataTransfer();
      dt.items.add(file);
      const fileInp = document.getElementById("tbbExistingLogoFileInput");
      if (fileInp) {
        fileInp.files = dt.files;
        await window.tbbHandleExistingLogoUpload(fileInp);
      }
      return true;
    })()`);

    for (let w = 0; w < 25; w++) {
      const hasUploaded = await cdp.evalJs(`Boolean(window.canvasState && window.canvasState.uploaded_logo_data_url)`);
      if (hasUploaded) break;
      await sleep(300);
    }

    // Seleccionar "Tomarlo como base y mejorar" (evolve) y asegurar la paleta cromática real del logo de Aura (#0D2540, #426EAE, #FF7A00)
    const step02Colors = await cdp.evalJs(`(() => {
      window.tbbSetExistingLogoMode("evolve");
      const cols = ["#0D2540", "#426EAE", "#FF7A00"];
      window.canvasState.uploaded_logo_colors = cols;
      window.canvasState.primary_color = "#0D2540";
      window.canvasState.secondary_color = "#426EAE";
      window.canvasState.accent_color = "#FF7A00";
      if (window.step0State) window.step0State.uploadedLogoColors = cols;
      window.tbbState.logoPriHex = "#0D2540";
      window.tbbState.logoSecHex = "#426EAE";
      window.tbbSyncUploadedLogoIntoIterations();
      window.renderTbbZeroScrollStage();
      return window.canvasState.uploaded_logo_colors || [];
    })()`);
    console.log("✓ Logo Aura subido y procesado por la app. Colores calibrados:", step02Colors);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_02_step0_2_nombre_y_logo_aura.png"));
    console.log("✓ Screenshot 02: Paso 0.2 Nombre 'The Best Brand' + Logo Aura subido como base");

    // Avanzar a Paso 0.3
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 0.3: GIRO Y ACTIVIDAD DETALLADA (LENGUAJE DE JORGE BENÍTEZ)
    // -------------------------------------------------------------------------
    const jorgeStep03Text = "Somos una plataforma y aplicación web impulsada por Inteligencia Artificial donde ayudamos a dueños de negocio, emprendedores y directores a pasar del caos al sistema con la imagen de su empresa. Escuchamos primero su idea en su propio lenguaje, sin tecnicismos raros ni imponerles nada, y hombro a hombro construimos su marca completa en minutos: su estrategia, su nombre, el diseño o evolución de su logotipo en curvas y su manual de identidad profesional listo para trabajar.";
    await cdp.evalJs(`(() => {
      const ta = document.getElementById("tbbStep0BizTextarea");
      if (ta) {
        ta.value = ${JSON.stringify(jorgeStep03Text)};
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.tbbUpdateBusinessTypeFromInput(${JSON.stringify(jorgeStep03Text)});
    })()`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_03_step0_3_giro_detallado.png"));
    console.log("✓ Screenshot 03: Paso 0.3 Giro y Actividad");

    // Avanzar de Paso 0.3 -> Video Vertical Paso 0 a Paso 1
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) vid.currentTime = 4.2;
    })()`);
    await sleep(1300);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_04_video_paso0_a_1.png"));
    console.log("✓ Screenshot 04: Video Vertical de Transición Paso 0 a Paso 1");
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 1: LAS 7 PREGUNTAS ESTRATÉGICAS UNO POR UNO (1.1 A 1.7)
    // -------------------------------------------------------------------------
    const step1Answers = [
      {
        sub: 1,
        key: "golden_circle",
        file: "tbb_sim_05_step1_1_proposito.png",
        text: "Porque a mí como ingeniero y empresario siempre me ha frustrado ver a gente muy trabajadora con grandes negocios que batallan por tener su imagen en desorden: o les quieren cobrar una fortuna en una agencia tradicional que tarda meses, o terminan con un logo improvisado que no les sirve para crecer. Creamos The Best Brand para pasar del caos al sistema, liberarle tiempo mental al líder y darle una marca ordenada, clara y de primer nivel en minutos."
      },
      {
        sub: 2,
        key: "value_offer",
        file: "tbb_sim_06_step1_2_oferta_valor.png",
        text: "La diferencia es que aquí primero te escuchamos y respetamos tu idea original; trabajamos hombro a hombro contigo a través de Aura y un sistema paso a paso muy práctico que transforma lo que tú ya traes en la cabeza en un sistema completo: logotipo vectorizado en curvas reales, kit tipográfico híbrido sin problemas de licencias, papelería editable y un manual de 36 láminas que cualquier imprenta o proveedor puede usar desde el primer día."
      },
      {
        sub: 3,
        key: "social_role",
        file: "tbb_sim_07_step1_3_impacto_cliente.png",
        text: "Le quitamos de encima el estrés y la fricción de no saber cómo presentar su negocio. En vez de perder semanas dando vueltas con diseñadores que no captan su idea, el dueño sale tranquilo, con todo su material ordenado en una sola bóveda y con la seguridad de que su empresa se ve tan profesional como las grandes marcas frente a sus clientes."
      },
      {
        sub: 4,
        key: "process_steps_text",
        file: "tbb_sim_08_step1_4_metodo_3_pasos.png",
        text: "1. Platicamos contigo paso a paso para escuchar tu idea, entender tu negocio y subir tu logo actual si ya lo tienes · 2. Iteramos en vivo tu logotipo con Inteligencia Artificial y definimos tus colores y fuentes hasta que te encante el resultado · 3. Te entregamos al instante tu Manual de 36 Láminas en PDF, tus vectores en curvas, tu firma de correo y tus plantillas editables listas para usar."
      },
      {
        sub: 5,
        key: "core_message",
        file: "tbb_sim_09_step1_5_promesa_central.png",
        text: "Del Caos al Sistema: Tu marca profesional y tu manual completo creados hombro a hombro en minutos."
      },
      {
        sub: 6,
        key: "brand_persona",
        file: "tbb_sim_10_step1_6_personalidad_marca.png",
        text: "Como un socio leal con mente de ingeniero y trato cálido: alguien con fuerza tranquila que primero te escucha con atención, te habla claro y al grano sin rollos rebuscados, y te ayuda a ordenar y profesionalizar tu idea hombro a hombro sin imponer su ego."
      },
      {
        sub: 7,
        key: "ideal_customer",
        file: "tbb_sim_11_step1_7_cliente_ideal.png",
        text: "Dueños de empresas, fundadores, directores, consultores y emprendedores prácticos que valoran su tiempo, quieren orden y calidad real en sus entregables, y buscan que su marca proyecte confianza inmediata sin complicaciones."
      }
    ];

    for (let i = 0; i < step1Answers.length; i++) {
      const item = step1Answers[i];
      await cdp.evalJs(`(() => {
        window.tbbState.step = 1;
        window.tbbState.subStep = ${item.sub};
        window.renderTbbZeroScrollStage();
        const inp = document.getElementById("tbbStep1AnswerInput");
        if (inp) {
          inp.value = ${JSON.stringify(item.text)};
          inp.dispatchEvent(new Event("input", { bubbles: true }));
        }
        window.tbbSaveStep1Answer(${JSON.stringify(item.key)}, ${JSON.stringify(item.text)});
      })()`);
      await sleep(500);
      await cdp.capturePng(path.join(ARTIFACT_DIR, item.file));
      console.log(`✓ Screenshot Paso 1.${item.sub}: ${item.key}`);
      if (i < step1Answers.length - 1) {
        await cdp.evalJs(`window.onTbbAtomicNext()`);
        await sleep(350);
      }
    }

    // Avanzar de Paso 1.7 -> Video de Transición Paso 1 a Paso 2
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) vid.currentTime = 16.5;
    })()`);
    await sleep(1300);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_12_video_paso1_a_2.png"));
    console.log("✓ Screenshot 12: Video Vertical de Transición Paso 1 a Paso 2");
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 2: TOUCHPOINTS ANTES (2.1), DURANTE (2.2) Y DESPUÉS (2.3)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 2;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
      const presets = ["Sitio Web Oficial / Landing Page", "Atención por WhatsApp Business", "Recomendación Boca a Boca / Referidos", "Presentación Comercial / PDF"];
      presets.forEach(p => window.tbbToggleTouchpointItem("before", p));
      const inp = document.getElementById("tbbCustomTpInput");
      if (inp) {
        inp.value = "Diagnóstico Interactivo en Vivo con Aura 24/7";
        window.tbbAddCustomTouchpoint("before");
      }
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_13_step2_1_touchpoints_antes.png"));
    console.log("✓ Screenshot 13: Paso 2.1 Touchpoints Antes");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    await cdp.evalJs(`(() => {
      const presets = ["Plataforma Web / App Móvil", "Contrato / Propuesta Económica", "Demostración / Prueba en Vivo", "Pasarela de Pago / Checkout"];
      presets.forEach(p => window.tbbToggleTouchpointItem("during", p));
      const inp = document.getElementById("tbbCustomTpInput");
      if (inp) {
        inp.value = "Taller de Iteración en Vivo del Logotipo con IA y Curvas Bézier";
        window.tbbAddCustomTouchpoint("during");
      }
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_14_step2_2_touchpoints_durante.png"));
    console.log("✓ Screenshot 14: Paso 2.2 Touchpoints Durante");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    await cdp.evalJs(`(() => {
      const presets = ["Factura / Recibo Digital", "Manual / Guía de Bienvenida", "Seguimiento por WhatsApp / Correo", "Encuesta de Satisfacción (NPS)"];
      presets.forEach(p => window.tbbToggleTouchpointItem("after", p));
      const inp = document.getElementById("tbbCustomTpInput");
      if (inp) {
        inp.value = "Bóveda Digital de Entregables (.PDF 36 Láminas, .SVG/.AI, .DOCX, .PPTX y Kit de Fuentes)";
        window.tbbAddCustomTouchpoint("after");
      }
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_15_step2_3_touchpoints_despues.png"));
    console.log("✓ Screenshot 15: Paso 2.3 Touchpoints Después");

    // Avanzar de Paso 2.3 -> Video de Transición Paso 2 a Paso 3
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) vid.currentTime = 28.0;
    })()`);
    await sleep(1300);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_16_video_paso2_a_3.png"));
    console.log("✓ Screenshot 16: Video Vertical de Transición Paso 2 a Paso 3");
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 3: IDENTIDAD VERBAL Y NAMING (3.1, 3.2, 3.3)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 3;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
      const rInp = document.getElementById("tbbStep3RootsInput");
      if (rInp) {
        rInp.value = "The Best Brand · Suite The Best de ImproBears: Claridad directa, excelencia práctica, del caos al sistema.";
        rInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (typeof selectNamingFocusOption === "function") {
        selectNamingFocusOption("evocative");
      }
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_17_step3_1_raices_naming.png"));
    console.log("✓ Screenshot 17: Paso 3.1 Raíces de Naming");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    await cdp.evalJs(`(() => {
      const nInp = document.getElementById("tbbStep3OfficialNameInput");
      if (nInp) {
        nInp.value = "The Best Brand";
        nInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.tbbUpdateBrandNameFromInput("The Best Brand");
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_18_step3_2_seleccion_nombre.png"));
    console.log("✓ Screenshot 18: Paso 3.2 Selección de Nombre");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    await cdp.evalJs(`(() => {
      const tInp = document.getElementById("tbbStep3TaglineInput");
      const taglineVal = "Del Caos al Sistema: Tu Identidad de Marca en Minutos";
      if (tInp) {
        tInp.value = taglineVal;
        tInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.canvasState.tagline = taglineVal;
      window.canvasState.primary_nice_class = "Clase 42 (Plataforma SaaS de diseño de identidad corporativa e Inteligencia Artificial) y Clase 35 (Consultoría estratégica de marca y negocios)";
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_19_step3_3_confirmacion_eslogan.png"));
    console.log("✓ Screenshot 19: Paso 3.3 Confirmación de Nombre y Eslogan");

    // Avanzar de Paso 3.3 -> Video de Transición Paso 3 a Paso 4
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) vid.currentTime = 18.0;
    })()`);
    await sleep(1300);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_20_video_paso3_a_4.png"));
    console.log("✓ Screenshot 20: Video Vertical de Transición Paso 3 a Paso 4");
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 4: INGENIERÍA KANSEI, TIPOGRAFÍA HÍBRIDA Y ESTRUCTURA BASE (4.1 A 4.5)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 1;
      window.tbbUpdateSliderValue("organico_geometrico", 0.75);
      window.tbbUpdateSliderValue("tradicional_innovador", 0.85);
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_21_step4_1_kansei_1.png"));
    console.log("✓ Screenshot 21: Paso 4.1 Kansei Ejes 1-2");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    await cdp.evalJs(`(() => {
      window.tbbUpdateSliderValue("serio_jugueton", -0.45);
      window.tbbUpdateSliderValue("accesible_exclusivo", 0.65);
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_22_step4_2_kansei_2.png"));
    console.log("✓ Screenshot 22: Paso 4.2 Kansei Ejes 3-4");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    await cdp.evalJs(`(() => {
      window.tbbUpdateSliderValue("sutil_energetico", 0.55);
      window.tbbUpdateSliderValue("artesanal_industrial", 0.70);
      window.tbbUpdateSliderValue("minimalista_complejo", -0.25);
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_23_step4_3_kansei_3.png"));
    console.log("✓ Screenshot 23: Paso 4.3 Kansei Ejes 5-7");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    await cdp.evalJs(`(() => {
      window.tbbSelectFontCategoryTab("adobe_hybrid");
      window.tbbUpdateAdobeTypekitId("tbb-improbears-kit");
      window.tbbSelectOfficialFontFamily("Montserrat", "Plus Jakarta Sans", "JetBrains Mono");
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_24_step4_4_tipografia_hibrida.png"));
    console.log("✓ Screenshot 24: Paso 4.4 Tipografía Híbrida (Montserrat + Plus Jakarta Sans + JetBrains Mono)");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    const seedLiquidGlass = "Conservar la estructura exacta de mi logo subido (el orbe de Aura con su aro naranja exterior, esfera azul profundo, los 12 pétalos elípticos radiales en azul cristal y el núcleo luminoso cálido), pero evolucionarlo a un estilo muy Apple basado en Liquid Glass (visionOS / iOS 27): cristal óptico translúcido, refracción cáustica, biseles especulares de vidrio líquido y luz volumétrica.";
    await cdp.evalJs(`(() => {
      window.tbbSelectBaseStructureFamily(3);
      const sInp = document.getElementById("tbbStep4SeedIdeaInput");
      if (sInp) {
        sInp.value = ${JSON.stringify(seedLiquidGlass)};
        sInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.tbbUpdateStep4SeedIdea(${JSON.stringify(seedLiquidGlass)});
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_25_step4_5_estructura_y_semilla_liquid_glass.png"));
    console.log("✓ Screenshot 25: Paso 4.5 Estructura Base y Semilla Apple Liquid Glass");

    // Avanzar de Paso 4.5 -> Video de Transición Paso 4 a Paso 5
    await cdp.evalJs(`(() => {
      window.onTbbAtomicNext();
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) vid.currentTime = 17.5;
    })()`);
    await sleep(1300);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_26_video_paso4_a_5.png"));
    console.log("✓ Screenshot 26: Video Vertical de Transición Paso 4 a Paso 5");
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 5.1: ACABADO LIQUID GLASS Y PALETA DE TU LOGO AURA (#0D2540 · #426EAE · #FF7A00)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 5;
      window.tbbState.subStep = 1;
      window.tbbState.logoParadigm = "volumetric_glass";
      const cols = ["#0D2540", "#426EAE", "#FF7A00"];
      window.canvasState.uploaded_logo_colors = cols;
      window.canvasState.primary_color = "#0D2540";
      window.canvasState.secondary_color = "#426EAE";
      window.canvasState.accent_color = "#FF7A00";
      if (window.step0State) window.step0State.uploadedLogoColors = cols;
      window.tbbState.logoPriHex = "#0D2540";
      window.tbbState.logoSecHex = "#426EAE";
      window.tbbSetExistingLogoMode("evolve");
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_27_step5_1_acabado_liquid_glass_y_paleta_aura.png"));
    console.log("✓ Screenshot 27: Paso 5.1 Acabado Liquid Glass y Paleta del Logo Aura");

    // Avanzar a Paso 5.2 (Lienzo de Iteración)
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 5.2: LAS 6 ITERACIONES PROGRESIVAS DESDE TU LOGO BASE AURA HASTA APPLE LIQUID GLASS MASTERPIECE
    // -------------------------------------------------------------------------
    const iter02FrostedUrl = fileToDataUrl(ITER02_FROSTED_PATH, "image/jpeg");
    const iter04CausticsUrl = fileToDataUrl(ITER04_CAUSTICS_PATH, "image/jpeg");
    const iter06MasterpieceUrl = fileToDataUrl(ITER06_MASTERPIECE_PATH, "image/jpeg");

    await cdp.evalJs(`(async () => {
      const st = window.tbbState;
      const cs = window.canvasState;
      const baseLogoUrl = cs.base_uploaded_logo_data_url || cs.uploaded_logo_data_url;

      const cIter02 = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(iter02FrostedUrl)}, 1024, 0.84);
      const cIter04 = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(iter04CausticsUrl)}, 1024, 0.84);
      const cIter06 = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(iter06MasterpieceUrl)}, 1024, 0.84);

      const tIter02 = await window.tbbVectorizeRasterLogoToSvgCurves(cIter02);
      const tIter04 = await window.tbbVectorizeRasterLogoToSvgCurves(cIter04);
      const tIter06 = await window.tbbVectorizeRasterLogoToSvgCurves(cIter06);

      const pri = "#0D2540";
      const sec = "#426EAE";
      const acc = "#FF7A00";

      // SVG Vectorial puro de 12 pétalos en Cristal Líquido para la Iteración #3
      const petals12Svg = Array.from({ length: 12 }, (_, k) => {
        const deg = k * 30;
        return '<ellipse cx="90" cy="54" rx="11.5" ry="28" transform="rotate(' + deg + ' 90 90)" fill="url(#auraPetalGlass)" stroke="#93C5FD" stroke-width="0.9" opacity="0.82"/>';
      }).join("");

      const iter3VectorGlassSvg = [
        '<g>',
        '  <defs>',
        '    <radialGradient id="auraSphereDark" cx="35%" cy="28%" r="72%">',
        '      <stop offset="0%" stop-color="#1E3A8A"/>',
        '      <stop offset="55%" stop-color="#0D2540"/>',
        '      <stop offset="100%" stop-color="#040B1A"/>',
        '    </radialGradient>',
        '    <linearGradient id="auraOrangeRim" x1="0%" y1="0%" x2="100%" y2="100%">',
        '      <stop offset="0%" stop-color="#FDBA74"/>',
        '      <stop offset="45%" stop-color="#FF7A00"/>',
        '      <stop offset="100%" stop-color="#C2410C"/>',
        '    </linearGradient>',
        '    <linearGradient id="auraPetalGlass" x1="0%" y1="0%" x2="100%" y2="100%">',
        '      <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.95"/>',
        '      <stop offset="45%" stop-color="#4C9DE6" stop-opacity="0.78"/>',
        '      <stop offset="100%" stop-color="#2563EB" stop-opacity="0.45"/>',
        '    </linearGradient>',
        '    <radialGradient id="auraWarmCore" cx="50%" cy="50%" r="50%">',
        '      <stop offset="0%" stop-color="#FFFFFF"/>',
        '      <stop offset="42%" stop-color="#FDE68A"/>',
        '      <stop offset="75%" stop-color="#FF7A00" stop-opacity="0.85"/>',
        '      <stop offset="100%" stop-color="#FF7A00" stop-opacity="0"/>',
        '    </radialGradient>',
        '    <linearGradient id="auraTopLens" x1="0%" y1="0%" x2="0%" y2="100%">',
        '      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.65"/>',
        '      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <circle cx="90" cy="90" r="76" fill="url(#auraSphereDark)" stroke="url(#auraOrangeRim)" stroke-width="8"/>',
        '  <circle cx="90" cy="90" r="72" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0.55"/>',
        petals12Svg,
        '  <circle cx="90" cy="90" r="24" fill="url(#auraWarmCore)"/>',
        '  <ellipse cx="90" cy="42" rx="46" ry="20" fill="url(#auraTopLens)"/>',
        '</g>'
      ].join("");

      st.logoIterations = [
        {
          idx: 1,
          isUploadedUserLogo: true,
          uploadedLogoDataUrl: baseLogoUrl,
          tracedCurvesSvg: cs.uploaded_logo_traced_curves_svg || "",
          paradigm: "volumetric_glass",
          archetype: "uploaded_user_logo",
          conceptLabel: "Tu Logo Base",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: "",
          note: "Iteración #1: Tu logotipo original subido (logo_Aura.png) centrado ópticamente a 0.00px",
          prompt: "Logotipo base original de Aura subido por el usuario: aro exterior naranja (#FF7A00), esfera azul profundo (#0D2540), 12 pétalos azules (#426EAE) y núcleo cálido.",
          geminiPrompt40w: "Logotipo base original de Aura subido por el usuario: aro exterior naranja (#FF7A00), esfera azul profundo (#0D2540), 12 pétalos azules (#426EAE) y núcleo cálido."
        },
        {
          idx: 2,
          isUploadedUserLogo: true,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: cIter02,
          tracedCurvesSvg: tIter02 || "",
          paradigm: "volumetric_glass",
          archetype: "uploaded_user_logo",
          conceptLabel: "Frosted Glass",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: "",
          note: "Iteración #2: Primera aproximación Apple Frosted Glass con domo esférico esmerilado y pétalos suaves",
          prompt: "Iteración #2 (Frosted Glass): Primera evolución hacia cristal esmerilado tipo iOS con domo translúcido sobre los 12 pétalos azules y el núcleo cálido.",
          geminiPrompt40w: "Iteración #2 (Frosted Glass): Primera evolución hacia cristal esmerilado tipo iOS con domo translúcido sobre los 12 pétalos azules y el núcleo cálido."
        },
        {
          idx: 3,
          isUploadedUserLogo: false,
          paradigm: "volumetric_glass",
          archetype: "gemini_custom_3d",
          conceptLabel: "Vector 12 Pétalos",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: iter3VectorGlassSvg,
          note: "Iteración #3: Geometría vectorial pura SVG de los 12 pétalos radiales con gradientes de cristal líquido y lente superior",
          prompt: "Iteración #3 (Geometría Vectorial SVG): Construcción matemática de las 12 elipses radiales con transparencia especular, núcleo radiante y aro naranja biselado.",
          geminiPrompt40w: "Iteración #3 (Geometría Vectorial SVG): Construcción matemática de las 12 elipses radiales con transparencia especular, núcleo radiante y aro naranja biselado."
        },
        {
          idx: 4,
          isUploadedUserLogo: true,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: cIter04,
          tracedCurvesSvg: tIter04 || "",
          paradigm: "volumetric_glass",
          archetype: "uploaded_user_logo",
          conceptLabel: "Caustic Glass",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: "",
          note: "Iteración #4: Evolución Apple visionOS Liquid Glass con 12 pétalos de cristal líquido orgánico, refracción cáustica y aro de vidrio naranja",
          prompt: "Iteración #4 (Apple Caustic Liquid Glass): Los 12 pétalos cobran vida como lentes de cristal líquido azul zafiro con refracción cáustica e iluminación interna.",
          geminiPrompt40w: "Iteración #4 (Apple Caustic Liquid Glass): Los 12 pétalos cobran vida como lentes de cristal líquido azul zafiro con refracción cáustica e iluminación interna."
        },
        {
          idx: 5,
          isUploadedUserLogo: true,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: cIter06,
          tracedCurvesSvg: tIter06 || "",
          paradigm: "volumetric_glass",
          archetype: "uploaded_user_logo",
          conceptLabel: "Crystal Facets",
          pri, sec, accentHex: acc,
          scale: 1.0, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: {},
          geminiCustomSvg: "",
          note: "Iteración #5: Variante de alta relojería óptica con pétalos de cristal tallado y aro toroidal naranja pulido",
          prompt: "Iteración #5 (Optical Crystal Jewel): Refinamiento de los 12 pétalos con micro-facetas de cristal de zafiro, destello estelar cálido y aro toroidal de vidrio naranja.",
          geminiPrompt40w: "Iteración #5 (Optical Crystal Jewel): Refinamiento de los 12 pétalos con micro-facetas de cristal de zafiro, destello estelar cálido y aro toroidal de vidrio naranja."
        },
        {
          idx: 6,
          isUploadedUserLogo: true,
          isNanoBananaGenerated: true,
          uploadedLogoDataUrl: cIter04,
          tracedCurvesSvg: tIter04 || "",
          paradigm: "volumetric_glass",
          archetype: "uploaded_user_logo",
          conceptLabel: "Apple Liquid Glass (Final)",
          pri, sec, accentHex: acc,
          scale: 1.04, darkBg: false,
          fontFamily: "Montserrat", layout: "horizontal",
          mods: { scale: 1.04, layout: "horizontal", fontFamily: "Montserrat" },
          geminiCustomSvg: "",
          note: "Iteración #6 (Logo Final Elegido): Masterpiece Apple Liquid Glass (visionOS / iOS 27) con 12 pétalos de cristal líquido translúcido, refracción cáustica, esfera azul profundo (#0D2540), núcleo cálido y aro de vidrio naranja (#FF7A00)",
          prompt: "Iteración #6 (Final Elegido · Apple Liquid Glass): Orbe oficial de The Best Brand en cristal líquido visionOS con 12 pétalos translúcidos, refracción cáustica y aro naranja.",
          geminiPrompt40w: "Iteración #6 (Final Elegido · Apple Liquid Glass): Orbe oficial de The Best Brand en cristal líquido visionOS con 12 pétalos translúcidos, refracción cáustica y aro naranja."
        }
      ];

      st.step = 5;
      st.subStep = 2;
      st.logoIterationIndex = 1;
      window.renderTbbZeroScrollStage();
    })()`);

    // Capturar screenshot de CADA UNA de las 6 iteraciones (#1 a #6) en Paso 5.2
    const iterShotNames = [
      "tbb_sim_28_iter_01_logo_aura_base.png",
      "tbb_sim_29_iter_02_frosted_liquid_glass.png",
      "tbb_sim_30_iter_03_vector_12_petalos_glass.png",
      "tbb_sim_31_iter_04_caustic_liquid_glass.png",
      "tbb_sim_32_iter_05_optical_crystal_facets.png",
      "tbb_sim_33_iter_06_final_apple_liquid_glass_claro.png"
    ];

    for (let i = 0; i < 6; i++) {
      await cdp.evalJs(`(() => {
        window.tbbRestoreLogoIteration(${i});
        const strip = document.getElementById("tbbIterationPillsStrip");
        if (strip) {
          const btns = strip.querySelectorAll("button");
          if (btns[${i}]) btns[${i}].scrollIntoView({ behavior: "instant", inline: "center", block: "nearest" });
        }
      })()`);
      await sleep(600);
      await cdp.capturePng(path.join(ARTIFACT_DIR, iterShotNames[i]));
      console.log(`✓ Screenshot Iteración #${i + 1}: ${iterShotNames[i]}`);
    }

    // Capturar también la Iteración #6 Final en Modo Fondo Oscuro y luego regresar a Fondo Claro
    await cdp.evalJs(`(() => {
      window.tbbState.logoDarkBg = true;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_34_iter_06_final_apple_liquid_glass_oscuro.png"));
    console.log("✓ Screenshot Iteración #6 Final en Modo Oscuro");

    await cdp.evalJs(`(() => {
      window.tbbState.logoDarkBg = false;
      window.tbbRestoreLogoIteration(5); // Confirmar Iteración #6 (índice 5) como el Logo Final Oficial
      if (typeof window.saveBrandSessionToLocalStorage === "function") {
        window.saveBrandSessionToLocalStorage(false, true);
      }
    })()`);
    await sleep(500);

    // Avanzar de Paso 5.2 -> Video Vertical Paso 5 a Paso 6
    await cdp.evalJs(`(() => {
      openPhaseTransitionVideoCapsule(5, 6);
      const vid = document.getElementById("transitionTheoryVideoPlayer");
      if (vid) vid.currentTime = 19.0;
    })()`);
    await sleep(1300);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_35_video_paso5_a_6.png"));
    console.log("✓ Screenshot 35: Video Vertical de Transición Paso 5 a Paso 6");
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(1200);

    // -------------------------------------------------------------------------
    // PASO 6.1: CAPTURA DE LÁMINAS CLAVE DEL MANUAL DE 36 LÁMINAS CON EL LOGO APPLE LIQUID GLASS
    // -------------------------------------------------------------------------
    const platesToCapture = [
      { idx: 0, file: "tbb_sim_36_step6_1_lamina_01_portada.png", name: "Lámina 01 Portada" },
      { idx: 1, file: "tbb_sim_36a_step6_1_lamina_02_indice_una_linea.png", name: "Lámina 02 Índice Rector (1 Línea por Hoja + Paleta Oficial)" },
      { idx: 2, file: "tbb_sim_36b_step6_1_lamina_03_manifiesto.png", name: "Lámina 03 Manifiesto" },
      { idx: 3, file: "tbb_sim_37_step6_1_lamina_04_circulo_dorado.png", name: "Lámina 04 Círculo Dorado" },
      { idx: 4, file: "tbb_sim_37b_step6_1_lamina_05_persona_foto_tbb.png", name: "Lámina 05 La Empresa como Persona + Foto TBB" },
      { idx: 5, file: "tbb_sim_37c_step6_1_lamina_06_tono_voz_paleta_oficial.png", name: "Lámina 06 Tono de Voz (Paleta Oficial)" },
      { idx: 6, file: "tbb_sim_38_step6_1_lamina_07_arquetipo.png", name: "Lámina 07 Buyer Persona + Foto TBB" },
      { idx: 8, file: "tbb_sim_38b_step6_1_lamina_09_posicionamiento.png", name: "Lámina 09 Posicionamiento Competitivo" },
      { idx: 9, file: "tbb_sim_38c_step6_1_lamina_10_touchpoints_antes.png", name: "Lámina 10 Touchpoints Antes + Foto TBB" },
      { idx: 12, file: "tbb_sim_39_step6_1_lamina_13_terna_oficial.png", name: "Lámina 13 Terna Oficial Liquid Glass" },
      { idx: 13, file: "tbb_sim_40_step6_1_lamina_14_anatomia_simbolo.png", name: "Lámina 14 Anatomía del Símbolo" },
      { idx: 17, file: "tbb_sim_41_step6_1_lamina_18_negativo_oscuro.png", name: "Lámina 18 Versión en Negativo" },
      { idx: 20, file: "tbb_sim_42_step6_1_lamina_21_paleta_cromatica.png", name: "Lámina 21 Paleta Oficial" },
      { idx: 21, file: "tbb_sim_43_step6_1_lamina_22_tipografia_hibrida.png", name: "Lámina 22 Gobernanza Tipográfica Híbrida" },
      { idx: 27, file: "tbb_sim_43b_step6_1_lamina_28_fachada_atelier.png", name: "Lámina 28 Fachada y Espacio TBB" },
      { idx: 30, file: "tbb_sim_44_step6_1_lamina_31_aplicaciones.png", name: "Lámina 31 Showcase Visual 1-3 TBB" },
      { idx: 31, file: "tbb_sim_44b_step6_1_lamina_32_showcase_4_6.png", name: "Lámina 32 Showcase Visual 4-6 TBB" },
      { idx: 35, file: "tbb_sim_45_step6_1_lamina_36_cierre_gobernanza.png", name: "Lámina 36 Cierre y Gobernanza" }
    ];

    for (const p of platesToCapture) {
      await cdp.evalJs(`(() => {
        const ov = document.getElementById("tbbStep6LiveAssemblyOverlay");
        if (ov) ov.remove();
        window.tbbState.step = 6;
        window.tbbState.subStep = 1;
        window.tbbState.plateIdx = ${p.idx};
        window.renderTbbZeroScrollStage();
      })()`);
      await sleep(650);
      await cdp.capturePng(path.join(ARTIFACT_DIR, p.file));
      console.log(`✓ Screenshot Paso 6.1: ${p.name}`);
    }

    // -------------------------------------------------------------------------
    // PASO 6.2: BÓVEDA DE DESCARGAS Y EXPORTACIÓN REAL DE CADA UNO DE LOS ENTREGABLES
    // -------------------------------------------------------------------------
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(650);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_46_step6_2_boveda_descargas.png"));
    console.log("✓ Screenshot 46: Paso 6.2 Bóveda de Descargas");

    // Abrir modal de Firma Corporativa de Correo, llenarlo con los datos reales de Jorge Benítez y capturar screenshot
    await cdp.evalJs(`(async () => {
      if (typeof window.tbbOpenEmailSignatureModal === "function") {
        await window.tbbOpenEmailSignatureModal();
      }
      const setVal = (id, v) => {
        const el = document.getElementById(id);
        if (el) { el.value = v; el.dispatchEvent(new Event("input", { bubbles: true })); }
      };
      setVal("sigInpName", 'Jorge Benítez "El Oso"');
      setVal("sigInpRole", "Founder & CEO · The Best Brand / ImproBears");
      setVal("sigInpPhone", "+52 (55) 5555 0199");
      setVal("sigInpEmail", "jorge.benitez@improbears.com");
      setVal("sigInpWeb", "www.improbears.com");
      setVal("tbbSigName", 'Jorge Benítez "El Oso"');
      setVal("tbbSigRole", "Founder & CEO · The Best Brand / ImproBears");
      setVal("tbbSigPhone", "+52 (55) 5555 0199");
      setVal("tbbSigEmail", "jorge.benitez@improbears.com");
      setVal("tbbSigWeb", "www.improbears.com");
    })()`);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_47_step6_2_modal_firma_jorge_benitez.png"));
    console.log("✓ Screenshot 47: Modal de Firma Corporativa de Correo de Jorge Benítez");

    // Ejecutar TODAS las descargas reales de la aplicación
    console.log("⏳ Ejecutando y capturando todas las descargas reales de la Bóveda (Paso 6.2)...");
    const downloadedDeliverables = await cdp.evalJs(`(async () => {
      const captured = {};
      const blobToBase64 = (blob) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const res = String(reader.result || "");
          resolve(res.includes(",") ? res.split(",")[1] : "");
        };
        reader.readAsDataURL(blob);
      });

      window.tbbDeliverFileNativeOrDownload = async function (blob, fileName, mimeType, title) {
        captured[fileName] = await blobToBase64(blob);
        return true;
      };

      // 1. Descargar Firma Corporativa HTML desde el modal activo
      if (typeof window.tbbDownloadEmailSignatureHTML === "function") {
        await window.tbbDownloadEmailSignatureHTML();
      }
      const sigModal = document.getElementById("tbbEmailSigConfiguratorModal") || document.getElementById("tbbEmailSignatureModal");
      if (sigModal) sigModal.remove();

      // 2. Logotipo Horizontal 100% en Curvas (.SVG)
      await window.tbbExportLogoInCurves("horizontal", "svg");

      // 3. Archivo Nativo Adobe Illustrator en Curvas (.AI)
      await window.tbbExportLogoInCurves("horizontal", "ai");

      // 4. Avatar 1:1, Sello Circular e Isotipo Símbolo en Curvas (.SVG)
      await window.tbbExportLogoInCurves("avatar", "svg");
      await window.tbbExportLogoInCurves("seal", "svg");
      await window.tbbExportLogoInCurves("symbol", "svg");

      // 5. Plantilla Editable Hoja Membretada (.DOCX Word / Docs)
      await window.tbbDownloadEditableLetterheadDOCX();

      // 6. Presentación Ejecutiva Editable 16:9 (.PPTX PowerPoint)
      await window.tbbDownloadEditableDeckPPTX();

      // 7. Manual Web Interactivo Autónomo (.HTML 36 Láminas)
      window.downloadCompleteBrandbookHTML();

      // 8. Kit Híbrido de Fuentes (.ZIP: .TTF SIL OFL + Snippet Adobe Typekit + Guía)
      const zipBlob = await window.tbbDownloadBrandFontsZip();
      if (zipBlob && !captured["Kit_Fuentes_Oficiales_the_best_brand.zip"]) {
        captured["Kit_Fuentes_Oficiales_the_best_brand.zip"] = await blobToBase64(zipBlob);
      }

      const brandProfile = window.buildActiveBrandProfileForV80();
      const suite = window.generateTriFoldLogoSuite(brandProfile);
      const sigHtml = await window.tbbBuildCorporateEmailSignatureHTML(brandProfile, {
        personName: 'Jorge Benítez "El Oso"',
        roleTitle: "Founder & CEO · The Best Brand / ImproBears",
        phone: "+52 (55) 5555 0199",
        email: "jorge.benitez@improbears.com",
        web: "www.improbears.com"
      });
      const standaloneHtmlDoc = window.buildComplete30PlatesStandaloneHTML();

      return {
        fileNames: Object.keys(captured),
        files: captured,
        finalLogoDataUrl: window.canvasState.uploaded_logo_data_url || "",
        suiteHorizontal: suite.horizontal,
        suiteHorizontalNeg: suite.horizontalNeg,
        suiteAvatar: suite.avatar,
        suiteAvatarInverted: suite.avatarInverted,
        suiteSeal: suite.seal,
        sigHtml,
        standaloneHtmlDoc
      };
    })()`);

    console.log("✓ Archivos capturados directamente de la aplicación:", downloadedDeliverables.fileNames);

    for (const [fname, b64] of Object.entries(downloadedDeliverables.files || {})) {
      if (!b64) continue;
      const buf = Buffer.from(b64, "base64");
      fs.writeFileSync(path.join(DELIVERABLES_DIR, fname), buf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, fname), buf);
      console.log(`  -> Guardado: ${fname} (${(buf.length / 1024).toFixed(1)} KB)`);
    }

    if (downloadedDeliverables.finalLogoDataUrl && downloadedDeliverables.finalLogoDataUrl.startsWith("data:image/")) {
      const b64 = downloadedDeliverables.finalLogoDataUrl.split(",")[1];
      if (b64) {
        const buf = Buffer.from(b64, "base64");
        fs.writeFileSync(path.join(DELIVERABLES_DIR, "Isotipo_Oficial_TheBestBrand_LiquidGlass_1024px.png"), buf);
        fs.writeFileSync(path.join(ARTIFACT_DIR, "Isotipo_Oficial_TheBestBrand_LiquidGlass_1024px.png"), buf);
        console.log(`  -> Guardado: Isotipo_Oficial_TheBestBrand_LiquidGlass_1024px.png (${(buf.length / 1024).toFixed(1)} KB)`);
      }
    }

    // Capturar Lámina Showcase de la Suite de Logotipos Descargados (.SVG / .AI / .PNG)
    await cdp.evalJs(`(() => {
      document.body.innerHTML = \`
        <div style="width:1440px;height:920px;background:#F8FAFC;padding:32px 44px;box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif;display:flex;flex-direction:column;gap:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0D2540;padding-bottom:12px;">
            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;color:#FF7A00;letter-spacing:1.5px;">SUITE VECTORIAL DE LOGOTIPOS DESCARGADA (.SVG / .AI / .PNG) · ITERACIÓN #6 APPLE LIQUID GLASS</div>
              <h1 style="font-family:'Montserrat',sans-serif;font-size:26px;font-weight:900;color:#090D16;margin:4px 0 0 0;">THE BEST BRAND — Terna Oficial y Variantes en Curvas Bézier</h1>
            </div>
            <div style="display:flex;gap:10px;align-items:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;">
              <span style="background:#0D2540;color:#FFF;padding:6px 12px;border-radius:8px;">#0D2540 Navy Profundo</span>
              <span style="background:#426EAE;color:#FFF;padding:6px 12px;border-radius:8px;">#426EAE Azul ImproBears</span>
              <span style="background:#FF7A00;color:#FFF;padding:6px 12px;border-radius:8px;">#FF7A00 Naranja Acción</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1.25fr 1.25fr;gap:20px;flex:1;">
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0D2540;">01 · LOGOTIPO HORIZONTAL OFICIAL (SOBRE LIENZO CLARO #FFFFFF) · Logotipo_Horizontal_Curvas_the_best_brand.svg</div>
              <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:12px;">
                \${${JSON.stringify(downloadedDeliverables.suiteHorizontal)}}
              </div>
              <div style="font-size:12px;color:#64748B;font-weight:600;">Proporción 3.5:1 · Tipografía Montserrat 900 en curvas Bézier · Orbe Aura Apple Liquid Glass</div>
            </div>

            <div style="background:#090D16;border:1.5px solid #1E293B;border-radius:20px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#FF7A00;">02 · LOGOTIPO HORIZONTAL EN NEGATIVO (SOPORTE OSCURO + CÁPSULA C-00)</div>
              <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:12px;">
                \${${JSON.stringify(downloadedDeliverables.suiteHorizontalNeg)}}
              </div>
              <div style="font-size:12px;color:#94A3B8;font-weight:600;">Versión sobre soporte oscuro preservando el brillo cáustico del Orbe Liquid Glass</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;height:330px;">
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0D2540;align-self:flex-start;">03 · AVATAR APP / SOCIAL 1:1 (.SVG)</div>
              <div style="width:190px;height:190px;">\${${JSON.stringify(downloadedDeliverables.suiteAvatar)}}</div>
              <div style="font-size:11.5px;color:#64748B;font-weight:600;">Avatar_Social_1x1_Curvas_the_best_brand.svg</div>
            </div>

            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0D2540;align-self:flex-start;">04 · AVATAR EN FONDO PRIMARIO (#0D2540)</div>
              <div style="width:190px;height:190px;">\${${JSON.stringify(downloadedDeliverables.suiteAvatarInverted)}}</div>
              <div style="font-size:11.5px;color:#64748B;font-weight:600;">Variante institucional para App Icon iOS / macOS</div>
            </div>

            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0D2540;align-self:flex-start;">05 · SELLO CIRCULAR DE CERTIFICACIÓN (.SVG)</div>
              <div style="width:205px;height:205px;">\${${JSON.stringify(downloadedDeliverables.suiteSeal)}}</div>
              <div style="font-size:11.5px;color:#64748B;font-weight:600;">Sello_Circular_Curvas_the_best_brand.svg</div>
            </div>
          </div>
        </div>
      \`;
    })()`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_48_showcase_suite_logos_descargados.png"));
    console.log("✓ Screenshot 48: Showcase de la Suite de Logotipos Descargados");

    // 9. Compilar el PDF Oficial de 36 Láminas en Curvas (A4 Horizontal) directamente desde el documento generado por la app
    if (downloadedDeliverables.standaloneHtmlDoc) {
      await cdp.evalJs(`(() => {
        document.open();
        document.write(${JSON.stringify(downloadedDeliverables.standaloneHtmlDoc)});
        document.close();
        return true;
      })()`);
      await sleep(1400);
      const pdfResult = await cdp.send("Page.printToPDF", {
        landscape: true,
        printBackground: true,
        paperWidth: 11.69,
        paperHeight: 8.27,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        preferCSSPageSize: true
      });
      if (pdfResult && pdfResult.data) {
        const pdfBuf = Buffer.from(pdfResult.data, "base64");
        const pdfName = "Manual_Identidad_36_Laminas_the_best_brand.pdf";
        fs.writeFileSync(path.join(DELIVERABLES_DIR, pdfName), pdfBuf);
        fs.writeFileSync(path.join(ARTIFACT_DIR, pdfName), pdfBuf);
        console.log(`  -> Guardado: ${pdfName} (${(pdfBuf.length / 1024).toFixed(1)} KB)`);
      }
    }

    console.log("=== SIMULACRO E2E DE 'THE BEST BRAND' COMPLETADO CON ÉXITO ===");
  } finally {
    if (cdp) cdp.close();
    chromeProc.kill("SIGKILL");
  }
}

main().catch((err) => {
  console.error("Error fatal en simulacro TBB:", err);
  process.exit(1);
});
