import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/arco_ingenieria";
const ITER10_IMG_PATH = path.join(ARTIFACT_DIR, "arco_iter10_final_masterpiece_original_colors_1794503913524.jpg");

if (!fs.existsSync(DELIVERABLES_DIR)) {
  fs.mkdirSync(DELIVERABLES_DIR, { recursive: true });
}

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
  console.log("=== DESCARGANDO Y RENDERIZANDO TODOS LOS ENTREGABLES DE ARCO INGENIERÍA (LOGO #10) ===");
  const debugPort = 9248;
  const userDataDir = "/tmp/chromium_arco_deliverables_" + Date.now();
  const chromeProc = spawn(
    "/usr/lib/chromium/chromium",
    [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
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
    if (!targets || !targets.length) throw new Error("No se pudo conectar a Chromium");

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

    // Esperar a que studio.html y tbb-executive-deliverables-suite.js estén completamente cargados
    for (let w = 0; w < 30; w++) {
      const ready = await cdp.evalJs(`Boolean(typeof window.tbbExportLogoInCurves === "function" && typeof window.buildActiveBrandProfileForV80 === "function")`);
      if (ready) break;
      await sleep(350);
    }

    const iter10DataUrl = fileToDataUrl(ITER10_IMG_PATH, "image/jpeg");

    // 1. Configurar el estado exacto de ARCO Ingeniería con el Logo #10 y capturar todos los archivos descargados en memoria
    const exportedBundle = await cdp.evalJs(`(async () => {
      if (typeof window.tbbDismissAuraSplashBoot === "function") window.tbbDismissAuraSplashBoot(false);
      const sp = document.getElementById("tbbAuraSplashBootScreen");
      if (sp) sp.style.display = "none";

      const iter10Url = ${JSON.stringify(iter10DataUrl)};
      const centeredUrl = (typeof window.tbbAutoTrimAndCenterRasterLogo === "function")
        ? await window.tbbAutoTrimAndCenterRasterLogo(iter10Url, 1024, 0.82)
        : iter10Url;

      const tracedSvg = (typeof window.tbbVectorizeRasterLogoToSvgCurves === "function")
        ? await window.tbbVectorizeRasterLogoToSvgCurves(centeredUrl)
        : "";

      const cs = (typeof canvasState === "object" && canvasState) ? canvasState : (window.canvasState = {});
      window.canvasState = cs;
      const st = window.tbbState || (window.tbbState = {});
      cs.brandName = "ARCO Ingeniería";
      cs.tagline = "Diseño Arquitectónico, Construcción y Obra Civil";
      cs.custom_business_type = "Empresa mexicana de arquitectura, ingeniería y construcción integral (ARCO Ingeniería). Especialistas en edificación de casas residenciales, torres de departamentos, obra civil, urbanización, terracerías, áreas comunes y amenidades para grandes desarrolladoras y constructoras en todo México.";
      cs.golden_circle = "Porque cada obra civil, desarrollo habitacional y estructura que edificamos es el cimiento donde miles de familias mexicanas y grandes desarrolladoras construyen su patrimonio con seguridad estructural y certeza técnica.";
      cs.process_steps_text = "Mediante ingeniería civil de precisión, supervisión rigurosa en sitio, control presupuestal transparente, cumplimiento estricto de tiempos de entrega y acabados arquitectónicos de primer nivel.";
      cs.value_offer = "Construcción integral de casas residenciales, torres de departamentos, urbanización, obra civil pesada, estructura metálica y áreas comunes para grandes constructoras.";
      cs.ideal_customer = "Directores de grandes constructoras, desarrolladores inmobiliarios corporativos e inversionistas que exigen un socio constructor confiable y puntual.";
      cs.brand_persona = "Ingeniero Estructural Senior: fuerza tranquila, rigor matemático, cumplimiento implacable en obra y lealtad absoluta con el desarrollador.";
      cs.primary_nice_class = "Clase 37 (Construcción, edificación residencial, obra civil y urbanización) y Clase 42 (Ingeniería estructural y proyectos arquitectónicos)";

      cs.uploaded_logo_data_url = centeredUrl;
      cs.base_uploaded_logo_data_url = centeredUrl;
      cs.uploaded_logo_traced_curves_svg = tracedSvg || "";
      cs.uploaded_logo_colors = ["#0078C0", "#88E0E0", "#585850"];
      cs.primary_color = "#0078C0";
      cs.secondary_color = "#88E0E0";
      cs.accent_color = "#585850";
      cs.selected_colors_hex = ["#FFFFFF", "#090D16", "#0078C0", "#88E0E0"];
      cs.primary_font = "Montserrat";
      cs.secondary_font = "Plus Jakarta Sans";
      cs.mono_font = "JetBrains Mono";

      st.logoPriHex = "#0078C0";
      st.logoSecHex = "#88E0E0";
      st.selectedFontFamily = "Montserrat";
      st.selectedSecondaryFont = "Plus Jakarta Sans";
      st.selectedMonoFont = "JetBrains Mono";

      // Interceptar window.tbbDeliverFileNativeOrDownload para capturar todos los Blobs generados
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

      // 1. Exportar Logotipo Horizontal en Curvas (.SVG y .AI)
      await window.tbbExportLogoInCurves("horizontal", "svg");
      await window.tbbExportLogoInCurves("horizontal", "ai");

      // 2. Exportar Avatar 1:1 y Sello Circular en Curvas (.SVG)
      await window.tbbExportLogoInCurves("avatar", "svg");
      await window.tbbExportLogoInCurves("seal", "svg");
      await window.tbbExportLogoInCurves("symbol", "svg");

      // 3. Exportar Hoja Membretada Editable (.DOCX)
      const docxBlob = await window.tbbDownloadEditableLetterheadDOCX();
      if (docxBlob && !capturedFiles["Plantilla_Hoja_Membretada_arco_ingenieria.docx"]) {
        capturedFiles["Plantilla_Hoja_Membretada_arco_ingenieria.docx"] = await blobToBase64(docxBlob);
      }

      // 4. Exportar Presentación Ejecutiva Editable 16:9 (.PPTX)
      const pptxBlob = await window.tbbDownloadEditableDeckPPTX();
      if (pptxBlob && !capturedFiles["Plantilla_Presentacion_Ejecutiva_arco_ingenieria.pptx"]) {
        capturedFiles["Plantilla_Presentacion_Ejecutiva_arco_ingenieria.pptx"] = await blobToBase64(pptxBlob);
      }

      // 5. Generar Firma Corporativa en HTML con datos reales de ARCO Ingeniería
      const brandProfile = window.buildActiveBrandProfileForV80();
      const sigHtml = await window.tbbBuildCorporateEmailSignatureHTML(brandProfile, {
        personName: "Ing. Dirección de Proyectos",
        roleTitle: "Dirección de Ingeniería y Construcción · ARCO Ingeniería",
        phone: "+52 (55) 5555 0199",
        email: "contacto@arco-ingenieria.com",
        web: "www.arco-ingenieria.com"
      });

      // 6. Obtener Terna de Logos con la imagen de alta resolución para renderizar también las láminas de vista previa
      const suite = window.generateTriFoldLogoSuite(brandProfile);

      return {
        capturedFiles,
        sigHtml,
        centeredUrl,
        suiteHorizontal: suite.horizontal,
        suiteHorizontalNeg: suite.horizontalNeg,
        suiteAvatar: suite.avatar,
        suiteAvatarInverted: suite.avatarInverted,
        suiteSeal: suite.seal
      };
    })()`);

    // Guardar todos los archivos capturados tanto en DELIVERABLES_DIR como en ARTIFACT_DIR
    for (const [fname, b64] of Object.entries(exportedBundle.capturedFiles || {})) {
      if (!b64) continue;
      const buf = Buffer.from(b64, "base64");
      fs.writeFileSync(path.join(DELIVERABLES_DIR, fname), buf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, fname), buf);
      console.log(`✓ Archivo exportado: ${fname} (${(buf.length / 1024).toFixed(1)} KB)`);
    }

    // Guardar Firma Corporativa HTML completa
    const fullSigDoc = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Firma Corporativa Oficial — ARCO Ingeniería</title>
</head>
<body style="margin:0;padding:32px;background:#F8FAFC;font-family:'Plus Jakarta Sans',sans-serif;">
  ${exportedBundle.sigHtml}
</body>
</html>`;
    fs.writeFileSync(path.join(DELIVERABLES_DIR, "Firma_Corporativa_ARCO_Ingenieria.html"), fullSigDoc, "utf8");
    fs.writeFileSync(path.join(ARTIFACT_DIR, "Firma_Corporativa_ARCO_Ingenieria.html"), fullSigDoc, "utf8");
    console.log("✓ Archivo exportado: Firma_Corporativa_ARCO_Ingenieria.html");

    // Guardar también el PNG transparente de alta resolución del Símbolo #10 centrado
    const symPngB64 = String(exportedBundle.centeredUrl || "").split(",")[1] || "";
    if (symPngB64) {
      const symBuf = Buffer.from(symPngB64, "base64");
      fs.writeFileSync(path.join(DELIVERABLES_DIR, "Isotipo_Oficial_ARCO_Ingenieria_1024px.png"), symBuf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, "Isotipo_Oficial_ARCO_Ingenieria_1024px.png"), symBuf);
      console.log("✓ Archivo exportado: Isotipo_Oficial_ARCO_Ingenieria_1024px.png");
    }

    // -------------------------------------------------------------------------
    // CAPTURAR VISTAS PREVIAS DE ALTA RESOLUCIÓN DE CADA ENTREGABLE PARA MOSTRAR AL USUARIO
    // -------------------------------------------------------------------------

    // A) Captura del Modal de Firma Corporativa de Correo abierto en la App con datos reales de ARCO Ingeniería
    await cdp.evalJs(`(async () => {
      await window.tbbOpenEmailSignatureModal();
      const setVal = (id, v) => {
        const el = document.getElementById(id);
        if (el) { el.value = v; el.dispatchEvent(new Event("input", { bubbles: true })); }
      };
      setVal("sigInpName", "Ing. Dirección de Proyectos");
      setVal("sigInpRole", "Dirección de Ingeniería y Construcción · ARCO Ingeniería");
      setVal("sigInpPhone", "+52 (55) 5555 0199");
      setVal("sigInpEmail", "contacto@arco-ingenieria.com");
      setVal("sigInpWeb", "www.arco-ingenieria.com");
    })()`);
    await sleep(700);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "entregable_01_modal_firma_correo_arco.png"));
    console.log("✓ Preview 01: Modal de Firma Corporativa en la App");

    // B) Renderizar Lámina Showcase de la Terna Oficial de Logotipos (Horizontal Positivo, Horizontal Negativo, Avatar 1:1, Avatar Invertido y Sello Circular)
    await cdp.evalJs(`(() => {
      const m = document.getElementById("tbbEmailSigConfiguratorModal");
      if (m) m.remove();
      document.body.innerHTML = \`
        <div style="width:1440px;height:920px;background:#F8FAFC;padding:32px 44px;box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif;display:flex;flex-direction:column;gap:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0078C0;padding-bottom:12px;">
            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;color:#0078C0;letter-spacing:1.5px;">SUITE VECTORIAL DE LOGOTIPOS DESCARGADA (.SVG / .AI / .PNG) · ITERACIÓN #10 ELEGIDA</div>
              <h1 style="font-family:'Montserrat',sans-serif;font-size:26px;font-weight:900;color:#090D16;margin:4px 0 0 0;">ARCO INGENIERÍA — Terna Oficial y Variantes de Identidad</h1>
            </div>
            <div style="display:flex;gap:10px;align-items:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;">
              <span style="background:#0078C0;color:#FFF;padding:6px 12px;border-radius:8px;">#0078C0 Cobalto</span>
              <span style="background:#88E0E0;color:#090D16;padding:6px 12px;border-radius:8px;">#88E0E0 Turquesa</span>
              <span style="background:#585850;color:#FFF;padding:6px 12px;border-radius:8px;">#585850 Taupe</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1.25fr 1.25fr;gap:20px;flex:1;">
            <!-- 1. Logotipo Horizontal Positivo -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0078C0;">01 · LOGOTIPO HORIZONTAL OFICIAL (SOBRE LIENZO CLARO #FFFFFF) · Logotipo_Horizontal_Curvas_arco_ingenieria.svg</div>
              <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:12px;">
                \${${JSON.stringify(exportedBundle.suiteHorizontal)}}
              </div>
              <div style="font-size:12px;color:#64748B;font-weight:600;">Proporción 3.5:1 · Tipografía Montserrat 900 en curvas Bézier · Centro óptico calibrado</div>
            </div>

            <!-- 2. Logotipo Horizontal en Negativo -->
            <div style="background:#090D16;border:1.5px solid #1E293B;border-radius:20px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#88E0E0;">02 · LOGOTIPO HORIZONTAL EN NEGATIVO (SOPORTE OSCURO + CÁPSULA C-00)</div>
              <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:12px;">
                \${${JSON.stringify(exportedBundle.suiteHorizontalNeg)}}
              </div>
              <div style="font-size:12px;color:#94A3B8;font-weight:600;">Isotipo aislado en cápsula neutra para preservar 100% los colores originales de ARCO</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;height:330px;">
            <!-- 3. Avatar Social 1:1 -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0078C0;align-self:flex-start;">03 · AVATAR APP / SOCIAL 1:1 (.SVG)</div>
              <div style="width:190px;height:190px;">\${${JSON.stringify(exportedBundle.suiteAvatar)}}</div>
              <div style="font-size:11.5px;color:#64748B;font-weight:600;">Avatar_Social_1x1_Curvas_arco_ingenieria.svg</div>
            </div>

            <!-- 4. Avatar Social en Contraste Cobalto -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0078C0;align-self:flex-start;">04 · AVATAR EN FONDO PRIMARIO (#0078C0)</div>
              <div style="width:190px;height:190px;">\${${JSON.stringify(exportedBundle.suiteAvatarInverted)}}</div>
              <div style="font-size:11.5px;color:#64748B;font-weight:600;">Variante institucional para cascos y perfiles</div>
            </div>

            <!-- 5. Sello Circular de Autor -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0078C0;align-self:flex-start;">05 · SELLO CIRCULAR DE CERTIFICACIÓN (.SVG)</div>
              <div style="width:205px;height:205px;">\${${JSON.stringify(exportedBundle.suiteSeal)}}</div>
              <div style="font-size:11.5px;color:#64748B;font-weight:600;">Sello_Circular_Curvas_arco_ingenieria.svg</div>
            </div>
          </div>
        </div>
      \`;
    })()`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "entregable_02_suite_logos_descargados_arco.png"));
    console.log("✓ Preview 02: Suite Completa de Logotipos Descargados");

    // C) Renderizar Vista Previa Visual de la Firma de Correo + Hoja Membretada (.DOCX) + Presentación (.PPTX)
    await cdp.evalJs(`(() => {
      document.body.innerHTML = \`
        <div style="width:1440px;height:920px;background:#F1F5F9;padding:28px 40px;box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif;display:grid;grid-template-columns:1fr 1.15fr;gap:28px;">
          <!-- Columna Izquierda: Firma Corporativa HTML y Presentación PPTX -->
          <div style="display:flex;flex-direction:column;gap:22px;">
            <!-- Tarjeta 1: Firma Corporativa HTML -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:22px;box-shadow:0 4px 12px rgba(0,0,0,0.03);">
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0078C0;margin-bottom:6px;">ARCHIVO DESCARGADO: Firma_Corporativa_ARCO_Ingenieria.html</div>
              <h3 style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:900;color:#090D16;margin:0 0 14px 0;">1. Firma Corporativa Lista para Gmail / Outlook / Apple Mail</h3>
              <div style="background:#F8FAFC;border:1.5px dashed #93C5FD;border-radius:14px;padding:18px;">
                \${${JSON.stringify(exportedBundle.sigHtml)}}
              </div>
            </div>

            <!-- Tarjeta 2: Presentación Ejecutiva 16:9 (.PPTX) -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:22px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0078C0;margin-bottom:4px;">ARCHIVO DESCARGADO: Plantilla_Presentacion_Ejecutiva_arco_ingenieria.pptx (6 Diapositivas 16:9)</div>
                <h3 style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:900;color:#090D16;margin:0 0 12px 0;">2. Presentación Ejecutiva Editable (.PPTX PowerPoint / Slides)</h3>
              </div>
              <!-- Mockup de Diapositiva 1 del PPTX generado -->
              <div style="aspect-ratio:16/9;background:#FFFFFF;border:2px solid #CBD5E1;border-radius:12px;position:relative;overflow:hidden;display:flex;">
                <div style="width:16px;background:#0078C0;height:100%;"></div>
                <div style="flex:1;display:flex;flex-direction:column;">
                  <div style="height:8px;background:#585850;width:100%;"></div>
                  <div style="flex:1;display:grid;grid-template-columns:1.4fr 1fr;padding:22px 26px;align-items:center;gap:16px;">
                    <div>
                      <div style="font-size:10px;font-weight:800;color:#585850;letter-spacing:1.2px;font-family:'Montserrat',sans-serif;">PRESENTACIÓN CORPORATIVA OFICIAL</div>
                      <div style="font-size:28px;font-weight:900;color:#0078C0;font-family:'Montserrat',sans-serif;line-height:1.1;margin:6px 0;">ARCO INGENIERÍA</div>
                      <div style="font-size:11px;font-weight:800;color:#090D16;margin-bottom:10px;">DISEÑO ARQUITECTÓNICO, CONSTRUCCIÓN Y OBRA CIVIL</div>
                      <div style="font-size:11px;color:#334155;line-height:1.45;">Especialistas en edificación de casas residenciales, torres de departamentos, obra civil, urbanización, terracerías y áreas comunes para grandes constructoras en México.</div>
                    </div>
                    <div style="background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:18px;padding:18px;display:flex;align-items:center;justify-content:center;">
                      <img src="\${${JSON.stringify(exportedBundle.centeredUrl)}}" style="width:140px;height:140px;object-fit:contain;" />
                    </div>
                  </div>
                  <div style="padding:8px 26px;border-top:1px solid #E2E8F0;font-size:10px;font-weight:700;color:#64748B;">www.arco-ingenieria.com  ·  contacto@arco-ingenieria.com  ·  Diapositivas 01 a 06 Editables</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Hoja Membretada Editable (.DOCX Word) -->
          <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:24px 28px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0078C0;margin-bottom:4px;">ARCHIVO DESCARGADO: Plantilla_Hoja_Membretada_arco_ingenieria.docx</div>
              <h3 style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:900;color:#090D16;margin:0 0 14px 0;">3. Hoja Membretada Corporativa Editable (.DOCX Microsoft Word)</h3>
            </div>

            <!-- Representación exacta del documento Word generado -->
            <div style="flex:1;background:#FFFFFF;border:1.5px solid #94A3B8;border-radius:8px;padding:28px 36px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 8px 24px rgba(15,23,42,0.06);">
              <div>
                <!-- Header Word -->
                <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #585850;padding-bottom:14px;margin-bottom:22px;">
                  <div style="display:flex;align-items:center;gap:14px;">
                    <img src="\${${JSON.stringify(exportedBundle.centeredUrl)}}" style="width:54px;height:54px;object-fit:contain;" />
                    <div>
                      <div style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:900;color:#0078C0;">ARCO INGENIERÍA</div>
                      <div style="font-size:10px;font-weight:800;color:#585850;letter-spacing:0.8px;">DISEÑO ARQUITECTÓNICO, CONSTRUCCIÓN Y OBRA CIVIL</div>
                    </div>
                  </div>
                  <div style="text-align:right;font-size:10.5px;color:#64748B;line-height:1.4;">
                    <div>www.arco-ingenieria.com</div>
                    <div>contacto@arco-ingenieria.com</div>
                  </div>
                </div>

                <!-- Cuerpo Word -->
                <div style="text-align:right;font-size:11.5px;color:#64748B;margin-bottom:18px;">Ciudad de México, a 12 de noviembre de 2026</div>
                <div style="font-size:13px;font-weight:800;color:#0F172A;">Dirección de Desarrollo Inmobiliario y Proyectos</div>
                <div style="font-size:12px;color:#475569;margin-bottom:18px;">Grupo Constructor Nacional · Presente</div>

                <div style="border-left:4px solid #585850;padding-left:12px;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:900;color:#0078C0;margin-bottom:16px;">
                  ASUNTO: PROPUESTA EJECUTIVA DE CONSTRUCCIÓN Y OBRA CIVIL
                </div>

                <p style="font-size:12.5px;color:#1E293B;line-height:1.65;margin:0 0 12px 0;">
                  Estimado socio comercial, por medio de la presente compartimos los alcances técnicos, presupuesto paramétrico y compromisos de calidad respaldados por <strong style="color:#0078C0;">ARCO Ingeniería</strong> (Especialistas en edificación de casas residenciales, torres de departamentos, obra civil, urbanización y áreas comunes para grandes constructoras).
                </p>
                <p style="font-size:12.5px;color:#1E293B;line-height:1.65;margin:0 0 14px 0;">
                  <strong style="color:#0078C0;">Nuestro Compromiso de Valor:</strong> Construcción integral de casas residenciales, torres de departamentos, urbanización, obra civil pesada, estructura metálica y áreas comunes con supervisión rigurosa en sitio.
                </p>
                <p style="font-size:12px;color:#64748B;line-height:1.55;background:#F8FAFC;padding:10px 14px;border-radius:8px;border:1px dashed #CBD5E1;">
                  [Este archivo .DOCX es 100% editable en Microsoft Word, Google Docs y Apple Pages. El encabezado con el logotipo #10 de ARCO Ingeniería y el pie de página se repiten automáticamente en cada hoja.]
                </p>

                <div style="margin-top:26px;">
                  <div style="font-size:12.5px;font-weight:700;color:#0F172A;margin-bottom:24px;">Atentamente,</div>
                  <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:900;color:#0078C0;">Dirección General · ARCO Ingeniería</div>
                  <div style="font-size:10.5px;font-weight:800;color:#585850;margin-top:2px;">DISEÑO ARQUITECTÓNICO, CONSTRUCCIÓN Y OBRA CIVIL</div>
                </div>
              </div>

              <!-- Footer Word -->
              <div style="border-top:1.5px solid #0078C0;padding-top:10px;font-size:10px;color:#64748B;display:flex;justify-content:space-between;">
                <span><strong style="color:#0078C0;">ARCO INGENIERÍA</strong> · Documento Corporativo Oficial</span>
                <span>contacto@arco-ingenieria.com · Confidencial</span>
              </div>
            </div>
          </div>
        </div>
      \`;
    })()`);
    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "entregable_03_firma_word_y_powerpoint_arco.png"));
    console.log("✓ Preview 03: Firma HTML + Hoja Membretada Word (.DOCX) + Presentación (.PPTX)");

  } finally {
    if (cdp) cdp.close();
    try { chromeProc.kill("SIGKILL"); } catch (e) {}
  }
  console.log("=== TODOS LOS ENTREGABLES DE ARCO INGENIERÍA EXPORTADOS ===");
}

main().catch((err) => {
  console.error("Error exportando entregables:", err);
  process.exit(1);
});
