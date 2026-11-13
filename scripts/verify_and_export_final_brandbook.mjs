import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/the_best_brand_liquid_glass_entregables";
const ITER04_CAUSTICS_PATH = path.join(ARTIFACT_DIR, "tbb_aura_iter04_liquid_glass_caustics_1794509733501.jpg");

fs.mkdirSync(DELIVERABLES_DIR, { recursive: true });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fileToDataUrl(filePath, mime = "image/png") {
  const buf = fs.readFileSync(filePath);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

async function connectCDP(port) {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page && page.webSocketDebuggerUrl) {
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => {
          ws.onopen = resolve;
          ws.onerror = reject;
        });
        let msgId = 0;
        const pending = new Map();
        ws.onmessage = (ev) => {
          const data = JSON.parse(ev.data);
          if (data.id && pending.has(data.id)) {
            const { resolve, reject } = pending.get(data.id);
            pending.delete(data.id);
            if (data.error) reject(new Error(data.error.message));
            else resolve(data.result);
          }
        };
        const send = (method, params = {}) =>
          new Promise((resolve, reject) => {
            const id = ++msgId;
            pending.set(id, { resolve, reject });
            ws.send(JSON.stringify({ id, method, params }));
          });
        const evalJs = async (expression) => {
          const res = await send("Runtime.evaluate", {
            expression,
            awaitPromise: true,
            returnByValue: true
          });
          if (res && res.exceptionDetails) {
            console.error("JS Eval Error:", res.exceptionDetails.text, res.exceptionDetails.exception?.description || "");
          }
          return res?.result?.value;
        };
        const capturePng = async (outPath) => {
          const shot = await send("Page.captureScreenshot", { format: "png" });
          fs.writeFileSync(outPath, Buffer.from(shot.data, "base64"));
        };
        return { ws, send, evalJs, capturePng, close: () => ws.close() };
      }
    } catch (e) {}
    await sleep(250);
  }
  throw new Error("Could not connect to Chromium CDP");
}

async function main() {
  const debugPort = 9366;
  const userDataDir = `/tmp/chrome_tbb_final_${Date.now()}`;
  const chromeProc = spawn(
    "chromium",
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      "--window-size=1440,920",
      "http://127.0.0.1:8000/studio"
    ],
    { stdio: "ignore" }
  );

  let cdp = null;
  try {
    cdp = await connectCDP(debugPort);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 920,
      deviceScaleFactor: 2,
      mobile: false
    });
    await sleep(1600);

    const iter04CausticsUrl = fileToDataUrl(ITER04_CAUSTICS_PATH, "image/jpeg");

    await cdp.evalJs(`(async () => {
      const cIter04 = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(iter04CausticsUrl)}, 1024, 0.84);
      const tIter04 = await window.tbbVectorizeRasterLogoToSvgCurves(cIter04);
      const cols = ["#0D2540", "#426EAE", "#FF7A00"];
      const st = window.tbbState;
      const cs = window.canvasState;
      const s0 = window.step0State || {};

      cs.brandName = "The Best Brand";
      s0.brandName = "The Best Brand";
      s0.existingBrandName = "The Best Brand";
      cs.custom_business_type = "Plataforma SaaS e Identidad de Marca con IA";
      s0.customBusinessType = "Plataforma SaaS e Identidad de Marca con IA";
      cs.step0_short_essence = "Transformamos la visión del líder en un sistema visual y operativo listo para crecer.";
      cs.golden_circle = "Pasar del caos al sistema liberando tiempo mental al líder. Erradicamos la improvisación visual y los procesos lentos mediante ingeniería de marca accesible y rigurosa.";
      cs.value_offer = "Identidad vectorial en curvas, kit tipográfico y manual de 36 láminas. Entregamos activos 100% editables (.SVG, .AI, .PDF, .DOCX, .PPTX y fuentes) listos para imprenta y operación.";
      cs.social_role = "Democratizar el diseño corporativo de clase mundial para que cualquier empresa opere con orden, orgullo y certeza técnica desde el primer día.";
      cs.process_steps_text = "1. Diagnóstico en lenguaje claro · 2. Iteración de logotipo en vivo · 3. Bóveda inmediata de entregables.";
      cs.core_message = "Del Caos al Sistema: Tu Identidad de Marca en Minutos";
      cs.tagline = "Del Caos al Sistema: Tu Identidad de Marca en Minutos";
      s0.tagline = "Del Caos al Sistema: Tu Identidad de Marca en Minutos";
      cs.brand_persona = "Como un socio leal con mente de ingeniero y trato cálido. Alguien con fuerza tranquila que primero te escucha con atención, te habla claro y al grano sin rollos rebuscados.";
      cs.ideal_customer = "Fundadores, directores y empresarios que exigen orden y excelencia. Líderes prácticos que valoran su tiempo y buscan certeza técnica en sus entregables.";
      cs.primary_nice_class = "Clase 42 (Plataforma SaaS de diseño de identidad corporativa e Inteligencia Artificial) y Clase 35 (Consultoría estratégica de marca y negocios)";
      cs.primary_font = "Montserrat";
      cs.secondary_font = "Plus Jakarta Sans";
      cs.mono_font = "JetBrains Mono";
      cs.adobe_typekit_id = "tbb-improbears-kit";
      cs.font_license_mode = "adobe_hybrid";
      st.selectedFontFamily = "Montserrat";
      st.selectedSecondaryFont = "Plus Jakarta Sans";
      st.selectedMonoFont = "JetBrains Mono";
      st.adobeTypekitId = "tbb-improbears-kit";
      st.fontLicenseMode = "adobe_hybrid";

      window.tpExtractedItems = {
        before: ["Sitio Web Oficial / Landing Page", "Atención por WhatsApp Business", "Recomendación Boca a Boca / Referidos", "Diagnóstico Interactivo en Vivo con Aura 24/7"],
        during: ["Plataforma Web / App Móvil", "Contrato / Propuesta Económica", "Demostración / Prueba en Vivo", "Taller de Iteración en Vivo del Logotipo con IA y Curvas Bézier"],
        after: ["Factura / Recibo Digital", "Manual / Guía de Bienvenida", "Seguimiento por WhatsApp / Correo", "Bóveda Digital de Entregables (.PDF 36 Láminas, .SVG/.AI, .DOCX, .PPTX y Kit de Fuentes)"]
      };

      cs.uploaded_logo_data_url = cIter04;
      cs.uploaded_logo_traced_curves_svg = tIter04 || "";
      cs.uploaded_logo_colors = cols;
      cs.primary_color = "#0D2540";
      cs.secondary_color = "#426EAE";
      cs.accent_color = "#FF7A00";
      s0.uploadedLogoDataUrl = cIter04;
      s0.uploadedLogoColors = cols;
      st.logoPriHex = "#0D2540";
      st.logoSecHex = "#426EAE";

      st.logoIterations = [{
        idx: 6,
        isUploadedUserLogo: true,
        isNanoBananaGenerated: true,
        uploadedLogoDataUrl: cIter04,
        tracedCurvesSvg: tIter04 || "",
        paradigm: "volumetric_glass",
        archetype: "uploaded_user_logo",
        conceptLabel: "Apple Liquid Glass (Final)",
        pri: "#0D2540",
        sec: "#426EAE",
        accentHex: "#FF7A00",
        scale: 1.04,
        darkBg: false,
        fontFamily: "Montserrat",
        layout: "horizontal",
        mods: { scale: 1.04, layout: "horizontal", fontFamily: "Montserrat" },
        geminiCustomSvg: ""
      }];
      st.logoIterationIndex = 1;
    })()`);

    const platesToCapture = [
      { idx: 1, file: "tbb_sim_36a_step6_1_lamina_02_indice_una_linea.png", name: "Lámina 02 Índice Rector (1 Línea por Hoja + Paleta Oficial)" },
      { idx: 4, file: "tbb_sim_37b_step6_1_lamina_05_persona_foto_tbb.png", name: "Lámina 05 La Empresa como Persona + Foto TBB" },
      { idx: 5, file: "tbb_sim_37c_step6_1_lamina_06_tono_voz_paleta_oficial.png", name: "Lámina 06 Tono de Voz (Paleta Oficial)" },
      { idx: 6, file: "tbb_sim_38_step6_1_lamina_07_arquetipo.png", name: "Lámina 07 Buyer Persona + Foto TBB" },
      { idx: 8, file: "tbb_sim_38b_step6_1_lamina_09_posicionamiento.png", name: "Lámina 09 Posicionamiento Competitivo" },
      { idx: 9, file: "tbb_sim_38c_step6_1_lamina_10_touchpoints_antes.png", name: "Lámina 10 Touchpoints Antes + Foto TBB" },
      { idx: 27, file: "tbb_sim_43b_step6_1_lamina_28_fachada_atelier.png", name: "Lámina 28 Fachada y Espacio TBB" },
      { idx: 30, file: "tbb_sim_44_step6_1_lamina_31_aplicaciones.png", name: "Lámina 31 Showcase Visual 1-3 TBB" },
      { idx: 31, file: "tbb_sim_44b_step6_1_lamina_32_showcase_4_6.png", name: "Lámina 32 Showcase Visual 4-6 TBB" }
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
      await sleep(450);
      await cdp.capturePng(path.join(ARTIFACT_DIR, p.file));
      console.log(`✓ Capturada: ${p.name}`);
    }

    // Exportar el HTML directamente dentro del navegador hacia un archivo en disco o inyectar las láminas directamente en el DOM sin transferir strings gigantes por CDP
    const htmlSaved = await cdp.evalJs(`(() => {
      const brand = window.buildActiveBrandProfileForV80();
      const styles = window.getDynamicBrandbookStyles();
      const plates = window.generateBrandbook30Plates(brand);
      window._tbbFullHtmlDoc = window.generateFullBrandbookDocHtml(brand);
      document.head.innerHTML = '<meta charset="UTF-8"><style>' + styles + '</style>';
      document.body.innerHTML = plates.join("\\n");
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.background = "#FFFFFF";
      return window._tbbFullHtmlDoc.length;
    })()`);
    console.log("✓ Documento de 36 láminas montado en DOM. Bytes HTML:", htmlSaved);
    await sleep(800);

    // Capturar primeros planos limpios 1:1 (1122x794) de Lámina 02, 06, 31 y 32
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1122,
      height: 794,
      deviceScaleFactor: 2,
      mobile: false
    });

    const cleanZoomPlates = [
      { id: "plate-02", out: "tbb_lamina_02_indice_limpio_zoom.png" },
      { id: "plate-06", out: "tbb_lamina_06_tono_voz_limpio_zoom.png" },
      { id: "plate-31", out: "tbb_lamina_31_mockups_logo_real_zoom.png" },
      { id: "plate-32", out: "tbb_lamina_32_mockups_logo_real_zoom.png" }
    ];

    for (const zp of cleanZoomPlates) {
      await cdp.evalJs(`(() => {
        document.querySelectorAll(".tbb-plate").forEach(el => {
          el.style.display = (el.id === ${JSON.stringify(zp.id)}) ? "flex" : "none";
          el.style.margin = "0";
        });
      })()`);
      await sleep(300);
      await cdp.capturePng(path.join(ARTIFACT_DIR, zp.out));
      console.log(`✓ Captura 1:1 de lámina limpia: ${zp.out}`);
    }

    // Restaurar todas las 36 láminas y exportar PDF
    await cdp.evalJs(`(() => {
      document.querySelectorAll(".tbb-plate").forEach(el => {
        el.style.display = "flex";
      });
      return true;
    })()`);
    await sleep(400);

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
      console.log(`✓ Guardado PDF 36 Láminas: ${pdfName} (${(pdfBuf.length / 1024).toFixed(1)} KB)`);
    }

    // Extraer el HTML completo en bloques de 250KB para guardar Manual_Identidad_36_Laminas_the_best_brand.html
    const totalLen = await cdp.evalJs(`window._tbbFullHtmlDoc.length`);
    let fullHtml = "";
    const chunkSize = 250000;
    for (let offset = 0; offset < totalLen; offset += chunkSize) {
      const chunk = await cdp.evalJs(`window._tbbFullHtmlDoc.slice(${offset}, ${offset + chunkSize})`);
      fullHtml += chunk;
    }
    const htmlName = "Manual_Identidad_36_Laminas_the_best_brand.html";
    fs.writeFileSync(path.join(DELIVERABLES_DIR, htmlName), fullHtml, "utf8");
    fs.writeFileSync(path.join(ARTIFACT_DIR, htmlName), fullHtml, "utf8");
    console.log(`✓ Guardado HTML 36 Láminas: ${htmlName} (${(fullHtml.length / 1024).toFixed(1)} KB)`);
  } finally {
    if (cdp) cdp.close();
    chromeProc.kill("SIGKILL");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
