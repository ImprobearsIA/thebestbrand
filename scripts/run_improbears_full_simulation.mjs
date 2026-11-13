import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/improbears_master_suite";
const ASSETS_IB_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/apps/web/assets/improbears";

const LOGO_MASTER_PATH = path.join(ASSETS_IB_DIR, "logo-improbears-master.png");
const LOGO_CONSULTING_PATH = path.join(ASSETS_IB_DIR, "logo-improbears-consulting.png");
const LOGO_INGREDIENTS_PATH = path.join(ASSETS_IB_DIR, "logo-improbears-ingredients.png");
const LOGO_STUDIO_PATH = path.join(ASSETS_IB_DIR, "logo-improbears-studio.png");
const LOGO_AI_PATH = path.join(ASSETS_IB_DIR, "logo-improbears-ai.png");

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
  console.log("=== INICIANDO PRUEBA E2E DESDE CERO PARA 'IMPROBEARS' Y SUS 4 SUBMARCAS (CONSERVANDO NOMBRES Y LOGOS) ===");
  const debugPort = 9282;
  const userDataDir = "/tmp/chromium_improbears_full_sim_" + Date.now();
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

    for (let w = 0; w < 35; w++) {
      const ready = await cdp.evalJs(`Boolean(typeof window.renderTbbZeroScrollStage === "function" && typeof window.tbbExportLogoInCurves === "function")`);
      if (ready) break;
      await sleep(350);
    }

    // -------------------------------------------------------------------------
    // 0. LIMPIEZA TOTAL DE SESIÓN (CERO REMANENTES)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      if (typeof window.tbbDismissAuraSplashBoot === "function") window.tbbDismissAuraSplashBoot(false);
      const sp = document.getElementById("tbbAuraSplashBootOverlay");
      if (sp) sp.style.display = "none";
      if (typeof window.startFreshBrandSession === "function") window.startFreshBrandSession();
      delete window.canvasState.isOfficialAdminTbbPreset;
      delete window.canvasState.uploaded_logo_data_url;
      delete window.canvasState.base_uploaded_logo_data_url;
      window.tbbState.step = 0;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
      return true;
    })()`);
    await sleep(500);

    // -------------------------------------------------------------------------
    // PASO 0.1: OBJETIVO ("Evolucionar y profesionalizar mi marca actual" / Homologar arquitectura)
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
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_01_step0_1_objetivo.png"));
    console.log("✓ Screenshot 01: Paso 0.1 Objetivo");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(450);

    // -------------------------------------------------------------------------
    // PASO 0.2: NOMBRE ("IMPROBEARS") + SUBIR LOGO MAESTRO OFICIAL Y SELECCIONAR "MANTENER MI LOGO ACTUAL" (keep)
    // -------------------------------------------------------------------------
    const masterLogoDataUrl = fileToDataUrl(LOGO_MASTER_PATH, "image/png");
    const consultingLogoDataUrl = fileToDataUrl(LOGO_CONSULTING_PATH, "image/png");
    const ingredientsLogoDataUrl = fileToDataUrl(LOGO_INGREDIENTS_PATH, "image/png");
    const studioLogoDataUrl = fileToDataUrl(LOGO_STUDIO_PATH, "image/png");
    const aiLogoDataUrl = fileToDataUrl(LOGO_AI_PATH, "image/png");

    await cdp.evalJs(`(async () => {
      if (typeof selectStep0Assets === "function") selectStep0Assets("has_name");
      window.renderTbbZeroScrollStage();

      const nameInp = document.getElementById("tbbStep0BrandNameInput");
      if (nameInp) {
        nameInp.value = "IMPROBEARS";
        nameInp.dispatchEvent(new Event("input", { bubbles: true }));
      } else if (typeof window.tbbUpdateBrandNameFromInput === "function") {
        window.tbbUpdateBrandNameFromInput("IMPROBEARS");
      }

      const dataUrl = ${JSON.stringify(masterLogoDataUrl)};
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "logo-improbears-master.png", { type: "image/png" });
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

    await cdp.evalJs(`(() => {
      window.tbbSetExistingLogoMode("keep");
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
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_02_step0_2_nombre_y_logo_conservado.png"));
    console.log("✓ Screenshot 02: Paso 0.2 Nombre IMPROBEARS + Logo Oficial en modo 'Mantener mi logo actual'");

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(450);

    // -------------------------------------------------------------------------
    // PASO 0.3: GIRO Y ECOSISTEMA DE LA MARCA MADRE + 4 SUBMARCAS (LENGUAJE DE JORGE BENÍTEZ)
    // -------------------------------------------------------------------------
    const jorgeIbStep03 = "Somos IMPROBEARS — Business Improvement, una firma y ecosistema de mejora integral de negocios donde ayudamos a empresarios, directores e industrias a pasar del caos al sistema. Nuestra Marca Madre integra 4 submarcas oficiales conservando siempre su nombre y su logotipo especializado con su descriptor en naranja (#FF7A00): 1) IMPROBEARS CONSULTING (consultoría estratégica, procesos, productividad e implementación Zoho One), 2) IMPROBEARS INGREDIENTS (biotecnología alimentaria, Hopzoil® e ingredientes funcionales B2B), 3) IMPROBEARS STUDIO (producción audiovisual en locación, cine corporativo y diseño de marca) y 4) IMPROBEARS AI (asistentes digitales en WhatsApp 24/7, copilotos ejecutivos y nuestra suite de software propio The Best).";
    await cdp.evalJs(`(() => {
      const ta = document.getElementById("tbbStep0BizTextarea");
      if (ta) {
        ta.value = ${JSON.stringify(jorgeIbStep03)};
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.tbbUpdateBusinessTypeFromInput(${JSON.stringify(jorgeIbStep03)});
    })()`);
    await sleep(550);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_03_step0_3_giro_y_4_submarcas.png"));
    console.log("✓ Screenshot 03: Paso 0.3 Giro y las 4 Submarcas Homologadas");

    // Avanzar a Paso 1.1
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(600);
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(450);

    // -------------------------------------------------------------------------
    // PASO 1: LAS 7 PREGUNTAS ESTRATÉGICAS DETALLADAS CON LA VOZ DE JORGE BENÍTEZ ("EL OSO")
    // -------------------------------------------------------------------------
    const ibStep1Answers = [
      {
        sub: 1,
        key: "golden_circle",
        file: "ib_sim_04_step1_1_proposito.png",
        text: "Porque he visto a demasiados empresarios valiosos trabajar de sol a sol atrapados en el caos de su propia operación: tienen ventas y talento, pero la información está regada en mil chats, los procesos dependen de que el dueño esté encima de todo y eso les roba la paz mental. Creamos IMPROBEARS para pasar del caos al sistema: conectar estrategia, operación, ciencia, comunicación e Inteligencia Artificial para devolverle claridad, control y libertad mental al líder."
      },
      {
        sub: 2,
        key: "value_offer",
        file: "ib_sim_05_step1_2_oferta_valor.png",
        text: "A diferencia de los consultores tradicionales que solo dejan un PowerPoint y se van, o de proveedores sueltos que no entienden el negocio completo, nosotros somos un socio integral que se mete a la cancha hombro a hombro contigo a través de nuestras 4 submarcas conservando una sola arquitectura coherente: IMPROBEARS CONSULTING (orden operativo y Zoho), IMPROBEARS INGREDIENTS (innovación y abasto funcional como Hopzoil®), IMPROBEARS STUDIO (video profesional e identidad) e IMPROBEARS AI (automatización, asistentes de IA en WhatsApp 24/7 y copilotos ejecutivos)."
      },
      {
        sub: 3,
        key: "social_role",
        file: "ib_sim_06_step1_3_impacto_cliente.png",
        text: "Le quitamos al dueño la carga de sentir que está solo cargando toda la empresa en los hombros. Cuando instalamos un sistema claro, homologamos su marca, optimizamos su formulación industrial o automatizamos su atención y sus tableros financieros, el líder recupera tiempo de calidad para pensar estratégicamente y su equipo trabaja sin fricción."
      },
      {
        sub: 4,
        key: "process_steps_text",
        file: "ib_sim_07_step1_4_metodo_3_pasos.png",
        text: "1. Escuchamos primero tu idea y diagnosticamos a fondo dónde está el cuello de botella sin imponerte rollos teóricos · 2. Diseñamos e implementamos hombro a hombro el sistema a la medida con la división exacta (Consulting, Ingredients, Studio o AI) · 3. Medimos resultados reales en productividad, ventas y rentabilidad dejando todo documentado y operando en orden."
      },
      {
        sub: 5,
        key: "core_message",
        file: "ib_sim_08_step1_5_promesa_central.png",
        text: "Del Caos al Sistema: Estrategia, Ciencia, Producción e Inteligencia Artificial trabajando hombro a hombro por la rentabilidad de tu empresa."
      },
      {
        sub: 6,
        key: "brand_persona",
        file: "ib_sim_09_step1_6_personalidad_jorge_el_oso.png",
        text: "Jorge Benítez ('El Oso'): Fuerza tranquila, mente de ingeniero y calidez de socio leal. Es ese aliado con experiencia real en planta, dirección y tecnología que primero te escucha con respeto, toma tu idea original para profesionalizarla sin ego, habla directo y claro, y no te suelta hasta que el sistema funcione al 100%."
      },
      {
        sub: 7,
        key: "ideal_customer",
        file: "ib_sim_10_step1_7_cliente_ideal.png",
        text: "Dueños de empresa, fundadores, directores generales, maestros cerveceros, directores de I+D en la industria de alimentos y bebidas, y líderes B2B que ya tienen tracción pero buscan orden operativo, ingredientes de alto valor, imagen impecable y automatización inteligente."
      }
    ];

    for (let i = 0; i < ibStep1Answers.length; i++) {
      const item = ibStep1Answers[i];
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
      await sleep(450);
      await cdp.capturePng(path.join(ARTIFACT_DIR, item.file));
      console.log(`✓ Screenshot Paso 1.${item.sub}: ${item.key}`);
      if (i < ibStep1Answers.length - 1) {
        await cdp.evalJs(`window.onTbbAtomicNext()`);
        await sleep(300);
      }
    }

    // Avanzar a Paso 2.1
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(450);

    // -------------------------------------------------------------------------
    // PASO 2: TOUCHPOINTS REALES DE IMPROBEARS (ANTES, DURANTE Y DESPUÉS)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 2;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
      window.tpExtractedItems.before = [
        "Redes sociales oficiales con contenido de valor por división (LinkedIn, Instagram, YouTube y Reels)",
        "Sitio web institucional en lienzo claro (improbears.com) con calculadoras interactivas (Hopzoil®) y embudo de diagnóstico",
        "Asistente de IA en WhatsApp 24/7 para atención inmediata y calificación sin fricción",
        "Solicitud ágil de diagnóstico, muestras de ingredientes B2B o sesiones de producción audiovisual"
      ];
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(450);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_11_step2_1_touchpoints_antes.png"));

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(350);
    await cdp.evalJs(`(() => {
      window.tpExtractedItems.during = [
        "Compra fácil y propuestas ejecutivas claras firmadas digitalmente en Zoho Sign bajo Regla 1 (Lienzo Claro C-00)",
        "Capacitación in situ y consultoría hombro a hombro en planta u oficinas del cliente (ImproBears Consulting & AI)",
        "Sesión profesional de video, fotografía y dirección de marca en locación (ImproBears Studio)",
        "Envío puntual de productos e ingredientes funcionales con trazabilidad y guía activa (ImproBears Ingredients)"
      ];
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(450);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_12_step2_2_touchpoints_durante.png"));

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(350);
    await cdp.evalJs(`(() => {
      window.tpExtractedItems.after = [
        "Portal de Clientes Zoho Books para consulta de estados de cuenta, descarga de facturas CFDI y pagos en línea",
        "Entrega de manuales operativos, fichas técnicas COA/SDS, masters de video 4K y bóveda de marca",
        "Encuesta ejecutiva de satisfacción y auditoría de resultados (ROI)",
        "Seguimiento proactivo por WhatsApp Business para soporte continuo y recompra fácil en 1 clic"
      ];
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(450);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_13_step2_3_touchpoints_despues.png"));
    console.log("✓ Screenshots Paso 2.1, 2.2 y 2.3: Touchpoints Reales de ImproBears");

    // Avanzar a Paso 3.1
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(450);

    // -------------------------------------------------------------------------
    // PASO 3: NAMING E IDENTIDAD VERBAL CONSERVANDO IMPROBEARS + 4 SUBMARCAS
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 3;
      window.tbbState.subStep = 1;
      window.renderTbbZeroScrollStage();
      const rInp = document.getElementById("tbbStep3RootsInput");
      if (rInp) {
        rInp.value = "IMPRO (Improvement / Mejora Continua) + BEARS (El Oso Protector y Mentor) · Submarcas: CONSULTING, INGREDIENTS, STUDIO, AI.";
        rInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (typeof selectNamingFocusOption === "function") selectNamingFocusOption("founders");
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(400);
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(350);
    await cdp.evalJs(`(() => {
      const nInp = document.getElementById("tbbStep3OfficialNameInput");
      if (nInp) {
        nInp.value = "IMPROBEARS";
        nInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.tbbUpdateBrandNameFromInput("IMPROBEARS");
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(400);
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(350);
    await cdp.evalJs(`(() => {
      const taglineVal = "BUSINESS IMPROVEMENT · DEL CAOS AL SISTEMA";
      const tInp = document.getElementById("tbbStep3TaglineInput");
      if (tInp) {
        tInp.value = taglineVal;
        tInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.canvasState.tagline = taglineVal;
      window.canvasState.primary_nice_class = "Clases 35 (ImproBears Consulting), 01 y 32 (ImproBears Ingredients), 41 (ImproBears Studio) y 42 (ImproBears AI & Software)";
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(450);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_14_step3_3_naming_improbears_y_clases_niza.png"));
    console.log("✓ Screenshot 14: Paso 3 Naming IMPROBEARS + 4 Submarcas y Clases de Niza");

    // Avanzar a Paso 4
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(450);

    // -------------------------------------------------------------------------
    // PASO 4: CALIBRACIÓN KANSEI, TIPOGRAFÍA OFICIAL (MONTSERRAT + AVENIR NEXT) Y ARQUITECTURA DE LOGOS
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 4;
      window.tbbState.subStep = 1;
      window.tbbUpdateSliderValue("organico_geometrico", 0.55);
      window.tbbUpdateSliderValue("tradicional_innovador", 0.80);
      window.tbbUpdateSliderValue("serio_jugueton", -0.50);
      window.tbbUpdateSliderValue("accesible_exclusivo", 0.65);
      window.tbbUpdateSliderValue("sutil_energetico", 0.70);
      window.tbbUpdateSliderValue("artesanal_industrial", 0.75);
      window.tbbUpdateSliderValue("minimalista_complejo", -0.25);
      window.tbbState.subStep = 4;
      window.tbbSelectFontCategoryTab("adobe_hybrid");
      window.tbbUpdateAdobeTypekitId("improbears-c00-kit");
      window.tbbSelectOfficialFontFamily("Montserrat", "Plus Jakarta Sans", "JetBrains Mono");
      window.canvasState.primary_font = "Montserrat";
      window.canvasState.secondary_font = "Avenir Next";
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(500);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_15_step4_4_tipografia_oficial_improbears.png"));

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(400);
    const ibSeedText = "Conservar íntegramente el logotipo oficial de la Marca Madre IMPROBEARS — BUSINESS IMPROVEMENT (oso protector en Azul ImproBears #426EAE, silueta humana en espacio negativo blanco mirando hacia el futuro, flecha de crecimiento exponencial en Naranja Acción #FF7A00 y doble anillo estructural en Azul Profundo #0D2540) junto con los 4 logotipos oficiales de las submarcas: IMPROBEARS CONSULTING (barras de crecimiento), IMPROBEARS INGREDIENTS (estructura molecular), IMPROBEARS STUDIO (cámara de cine) e IMPROBEARS AI (grafo neuronal multi-agente).";
    await cdp.evalJs(`(() => {
      window.tbbSelectBaseStructureFamily(1);
      const sInp = document.getElementById("tbbStep4SeedIdeaInput");
      if (sInp) {
        sInp.value = ${JSON.stringify(ibSeedText)};
        sInp.dispatchEvent(new Event("input", { bubbles: true }));
      }
      window.tbbUpdateStep4SeedIdea(${JSON.stringify(ibSeedText)});
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(450);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_16_step4_5_arquitectura_5_logos_conservados.png"));
    console.log("✓ Screenshots Paso 4.4 y 4.5: Tipografía Oficial y Semilla de 5 Logos Conservados");

    // Avanzar a Paso 5
    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(500);
    await cdp.evalJs(`if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();`);
    await sleep(450);

    // -------------------------------------------------------------------------
    // PASO 5.1 Y 5.2: PALETA OFICIAL (#0D2540, #426EAE, #FF7A00) Y LOS 5 LOGOTIPOS OFICIALES (MARCA MADRE + 4 SUBMARCAS)
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      window.tbbState.step = 5;
      window.tbbState.subStep = 1;
      const cols = ["#0D2540", "#426EAE", "#FF7A00"];
      window.canvasState.uploaded_logo_colors = cols;
      window.canvasState.selected_colors_hex = ["#FFFFFF", "#0D2540", "#0D2540", "#426EAE", "#FF7A00"];
      window.canvasState.primary_color = "#0D2540";
      window.canvasState.secondary_color = "#426EAE";
      window.canvasState.accent_color = "#FF7A00";
      window.tbbState.logoPriHex = "#0D2540";
      window.tbbState.logoSecHex = "#426EAE";
      window.tbbSetExistingLogoMode("keep");
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(450);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_17_step5_1_paleta_oficial_improbears.png"));

    await cdp.evalJs(`window.onTbbAtomicNext()`);
    await sleep(450);

    // Cargar en Paso 5.2 las 5 variantes oficiales:
    // #1: Marca Madre IMPROBEARS — BUSINESS IMPROVEMENT
    // #2: Submarca 01 IMPROBEARS CONSULTING
    // #3: Submarca 02 IMPROBEARS INGREDIENTS
    // #4: Submarca 03 IMPROBEARS STUDIO
    // #5: Submarca 04 IMPROBEARS AI
    await cdp.evalJs(`(async () => {
      const st = window.tbbState;
      const cs = window.canvasState;

      const uMaster = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(masterLogoDataUrl)}, 1024, 0.88);
      const uConsult = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(consultingLogoDataUrl)}, 1024, 0.88);
      const uIngred = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(ingredientsLogoDataUrl)}, 1024, 0.88);
      const uStudio = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(studioLogoDataUrl)}, 1024, 0.88);
      const uAi = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(aiLogoDataUrl)}, 1024, 0.88);

      const vMaster = await window.tbbVectorizeRasterLogoToSvgCurves(uMaster);
      const vConsult = await window.tbbVectorizeRasterLogoToSvgCurves(uConsult);
      const vIngred = await window.tbbVectorizeRasterLogoToSvgCurves(uIngred);
      const vStudio = await window.tbbVectorizeRasterLogoToSvgCurves(uStudio);
      const vAi = await window.tbbVectorizeRasterLogoToSvgCurves(uAi);

      const pri = "#0D2540";
      const sec = "#426EAE";
      const acc = "#FF7A00";

      st.logoIterations = [
        {
          idx: 1,
          isUploadedBase: true,
          uploadedDataUrl: uMaster,
          tracedSvgPaths: vMaster ? vMaster.svgGroup : "",
          tracedPathCount: vMaster ? vMaster.pathCount : 0,
          geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uMaster + '" xlink:href="' + uMaster + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
          conceptLabel: "Marca Madre Oficial: IMPROBEARS — Business Improvement (Conservado 100%)",
          archetype: "uploaded_logo_base",
          paradigm: "structural_monolith",
          pri, sec, accentHex: acc,
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "horizontal",
          mods: { fontFamily: "Montserrat", layout: "horizontal" },
          note: "Marca Madre Oficial IMPROBEARS — Business Improvement (Conservada Intacta)"
        },
        {
          idx: 2,
          isUploadedBase: true,
          uploadedDataUrl: uConsult,
          tracedSvgPaths: vConsult ? vConsult.svgGroup : "",
          tracedPathCount: vConsult ? vConsult.pathCount : 0,
          geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uConsult + '" xlink:href="' + uConsult + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
          conceptLabel: "Submarca Oficial 01: IMPROBEARS CONSULTING (Barras de Crecimiento)",
          archetype: "uploaded_logo_base",
          paradigm: "structural_monolith",
          pri, sec, accentHex: acc,
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "horizontal",
          mods: { fontFamily: "Montserrat", layout: "horizontal" },
          note: "Submarca Oficial 01: IMPROBEARS CONSULTING (Nombre y Logo Conservados)"
        },
        {
          idx: 3,
          isUploadedBase: true,
          uploadedDataUrl: uIngred,
          tracedSvgPaths: vIngred ? vIngred.svgGroup : "",
          tracedPathCount: vIngred ? vIngred.pathCount : 0,
          geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uIngred + '" xlink:href="' + uIngred + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
          conceptLabel: "Submarca Oficial 02: IMPROBEARS INGREDIENTS (Estructura Molecular)",
          archetype: "uploaded_logo_base",
          paradigm: "structural_monolith",
          pri, sec, accentHex: acc,
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "horizontal",
          mods: { fontFamily: "Montserrat", layout: "horizontal" },
          note: "Submarca Oficial 02: IMPROBEARS INGREDIENTS (Nombre y Logo Conservados)"
        },
        {
          idx: 4,
          isUploadedBase: true,
          uploadedDataUrl: uStudio,
          tracedSvgPaths: vStudio ? vStudio.svgGroup : "",
          tracedPathCount: vStudio ? vStudio.pathCount : 0,
          geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uStudio + '" xlink:href="' + uStudio + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
          conceptLabel: "Submarca Oficial 03: IMPROBEARS STUDIO (Cámara de Cine y Producción)",
          archetype: "uploaded_logo_base",
          paradigm: "structural_monolith",
          pri, sec, accentHex: acc,
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "horizontal",
          mods: { fontFamily: "Montserrat", layout: "horizontal" },
          note: "Submarca Oficial 03: IMPROBEARS STUDIO (Nombre y Logo Conservados)"
        },
        {
          idx: 5,
          isUploadedBase: true,
          uploadedDataUrl: uAi,
          tracedSvgPaths: vAi ? vAi.svgGroup : "",
          tracedPathCount: vAi ? vAi.pathCount : 0,
          geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uAi + '" xlink:href="' + uAi + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
          conceptLabel: "Submarca Oficial 04: IMPROBEARS AI (Grafo Neuronal Multi-Agente)",
          archetype: "uploaded_logo_base",
          paradigm: "structural_monolith",
          pri, sec, accentHex: acc,
          scale: 1.0,
          darkBg: false,
          fontFamily: "Montserrat",
          layout: "horizontal",
          mods: { fontFamily: "Montserrat", layout: "horizontal" },
          note: "Submarca Oficial 04: IMPROBEARS AI (Nombre y Logo Conservados)"
        }
      ];

      // Dejar seleccionada la Marca Madre #1 como titular del manual (y las 4 submarcas integradas en la arquitectura)
      st.logoIterationIndex = 1;
      cs.uploaded_logo_data_url = uMaster;
      cs.uploaded_logo_svg_curves = vMaster ? vMaster.svgGroup : "";
      cs.selected_symbol_only_svg = st.logoIterations[0].geminiCustomSvg;
      cs.useGenerative36Plates = true;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_18_step5_2_marca_madre_y_4_submarcas_cargadas.png"));
    console.log("✓ Screenshot 18: Paso 5.2 Marca Madre + 4 Submarcas en el Atelier");

    // Capturar también vista previa de las submarcas en el selector de iteraciones (#2 Consulting, #3 Ingredients, #4 Studio, #5 AI)
    for (const subInfo of [
      { zeroIdx: 1, file: "ib_sim_18b_step5_2_submarca_consulting.png" },
      { zeroIdx: 2, file: "ib_sim_18c_step5_2_submarca_ingredients.png" },
      { zeroIdx: 3, file: "ib_sim_18d_step5_2_submarca_studio.png" },
      { zeroIdx: 4, file: "ib_sim_18e_step5_2_submarca_ai.png" }
    ]) {
      await cdp.evalJs(`window.tbbRestoreLogoIteration(${subInfo.zeroIdx})`);
      await sleep(400);
      await cdp.capturePng(path.join(ARTIFACT_DIR, subInfo.file));
    }

    // Volver a dejar activa la Marca Madre #1 (índice 0) para encabezar el Manual de 36 Láminas (que en la Lámina 30 despliega las 4 submarcas con sus logos)
    await cdp.evalJs(`(() => {
      window.tbbRestoreLogoIteration(0);
      window.canvasState.useGenerative36Plates = true;
    })()`);
    await sleep(400);

    // -------------------------------------------------------------------------
    // PASO 6.1: VISOR DEL MANUAL DE 36 LÁMINAS DE IMPROBEARS EN VIVO
    // -------------------------------------------------------------------------
    await cdp.evalJs(`(() => {
      const ov = document.getElementById("tbbStep6LiveAssemblyOverlay");
      if (ov) ov.remove();
      window.tbbState.step = 6;
      window.tbbState.subStep = 1;
      window.tbbState.plateIdx = 0;
      window.canvasState.useGenerative36Plates = true;
      window.renderTbbZeroScrollStage();
      if (typeof window.scaleImproBearsPlateInStage === "function") window.scaleImproBearsPlateInStage();
    })()`);
    await sleep(800);

    const platesToCapture = [
      { idx: 0, file: "ib_sim_19_step6_1_lamina_01_portada.png" },
      { idx: 1, file: "ib_sim_20_step6_1_lamina_02_indice_una_linea.png" },
      { idx: 3, file: "ib_sim_21_step6_1_lamina_04_circulo_dorado.png" },
      { idx: 4, file: "ib_sim_22_step6_1_lamina_05_persona_jorge_oso.png" },
      { idx: 12, file: "ib_sim_23_step6_1_lamina_13_terna_logos.png" },
      { idx: 29, file: "ib_sim_24_step6_1_lamina_30_arquitectura_4_submarcas.png" },
      { idx: 30, file: "ib_sim_25_step6_1_lamina_31_mockups_1_a_3.png" },
      { idx: 31, file: "ib_sim_26_step6_1_lamina_32_mockups_4_a_6.png" }
    ];

    for (const p of platesToCapture) {
      await cdp.evalJs(`(() => {
        const ov = document.getElementById("tbbStep6LiveAssemblyOverlay");
        if (ov) ov.remove();
        window.tbbState.step = 6;
        window.tbbState.subStep = 1;
        window.tbbState.plateIdx = ${p.idx};
        window.renderTbbZeroScrollStage();
        if (typeof window.scaleImproBearsPlateInStage === "function") window.scaleImproBearsPlateInStage();
      })()`);
      await sleep(600);
      await cdp.capturePng(path.join(ARTIFACT_DIR, p.file));
      console.log("✓ Screenshot Paso 6.1:", p.file);
    }

    // Paso 6.2: Bóveda de Descargas
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 2;
      window.renderTbbZeroScrollStage();
    })()`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "ib_sim_27_step6_2_boveda_entregables.png"));
    console.log("✓ Screenshot 27: Paso 6.2 Bóveda de Entregables");

    // -------------------------------------------------------------------------
    // EXPORTAR MANUAL DE 36 LÁMINAS (.PDF Y .HTML) Y CAPTURAS LIMPIAS 1:1
    // -------------------------------------------------------------------------
    const totalPlates = await cdp.evalJs(`(() => {
      const brand = window.buildActiveBrandProfileForV80();
      window._ibFullHtmlDoc = window.generateFullBrandbookDocHtml(brand);
      window._ibFullHtmlLen = window._ibFullHtmlDoc.length;
      const styles = window.getDynamicBrandbookStyles(false);
      const plates = window.generateBrandbook30Plates(brand);
      document.head.innerHTML = '<meta charset="UTF-8"><style>' + styles + '</style>';
      document.body.className = "";
      document.body.style.cssText = "margin:0;padding:0;background:#FFFFFF;";
      document.body.innerHTML = plates.join("\\n");
      return plates.length;
    })()`);
    console.log("✓ Láminas montadas para exportación PDF:", totalPlates);
    await sleep(1200);

    // Capturas limpias 1:1 de láminas clave
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1122,
      height: 794,
      deviceScaleFactor: 2,
      mobile: false
    });

    for (const z of [
      { id: "plate-01", file: "ib_lamina_01_portada_zoom.png" },
      { id: "plate-02", file: "ib_lamina_02_indice_zoom.png" },
      { id: "plate-30", file: "ib_lamina_30_4_submarcas_zoom.png" },
      { id: "plate-31", file: "ib_lamina_31_mockups_zoom.png" },
      { id: "plate-32", file: "ib_lamina_32_mockups_zoom.png" }
    ]) {
      await cdp.evalJs(`(() => {
        const el = document.getElementById(${JSON.stringify(z.id)});
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      })()`);
      await sleep(350);
      await cdp.capturePng(path.join(ARTIFACT_DIR, z.file));
      console.log("✓ Zoom 1:1 capturado:", z.file);
    }

    const pdfRes = await cdp.send("Page.printToPDF", {
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      paperWidth: 11.69,
      paperHeight: 8.27,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
    });
    const pdfBuf = Buffer.from(pdfRes.data, "base64");
    const pdfName = "Manual_Identidad_36_Laminas_IMPROBEARS_y_4_Submarcas.pdf";
    fs.writeFileSync(path.join(DELIVERABLES_DIR, pdfName), pdfBuf);
    fs.writeFileSync(path.join(ARTIFACT_DIR, pdfName), pdfBuf);
    console.log(`✓ PDF Oficial 36 Láminas exportado: ${(pdfBuf.length / 1024).toFixed(1)} KB`);

    const htmlLen = await cdp.evalJs(`window._ibFullHtmlLen || 0`);
    if (htmlLen > 0) {
      const chunkSize = 250000;
      const chunks = [];
      for (let offset = 0; offset < htmlLen; offset += chunkSize) {
        const part = await cdp.evalJs(`window._ibFullHtmlDoc.slice(${offset}, ${offset + chunkSize})`);
        chunks.push(part || "");
      }
      const htmlBuf = Buffer.from(chunks.join(""), "utf-8");
      const htmlName = "Manual_Identidad_36_Laminas_IMPROBEARS_y_4_Submarcas.html";
      fs.writeFileSync(path.join(DELIVERABLES_DIR, htmlName), htmlBuf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, htmlName), htmlBuf);
      console.log(`✓ HTML Oficial 36 Láminas exportado: ${(htmlBuf.length / 1024).toFixed(1)} KB`);
    }

    console.log("=== SIMULACRO E2E IMPROBEARS + 4 SUBMARCAS COMPLETADO AL 100% ===");
  } finally {
    if (cdp) cdp.close();
    try { chromeProc.kill("SIGKILL"); } catch (e) {}
  }
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
