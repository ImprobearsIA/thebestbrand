import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/arco_ingenieria";
const ITER10_IMG_PATH = path.join(ARTIFACT_DIR, "arco_iter10_final_masterpiece_original_colors_1794503913524.jpg");

fs.mkdirSync(DELIVERABLES_DIR, { recursive: true });

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
  console.log("=== VERIFICANDO OPCIÓN HÍBRIDA DE TIPOGRAFÍA (SIL OFL .TTF + ADOBE FONTS TYPEKIT) ===");
  const debugPort = 9252;
  const userDataDir = "/tmp/chromium_hybrid_fonts_" + Date.now();
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

    await sleep(1800);
    const iter10DataUrl = fileToDataUrl(ITER10_IMG_PATH, "image/jpeg");

    await cdp.evalJs(`(async () => {
      if (typeof window.tbbDismissAuraSplashBoot === "function") {
        window.tbbDismissAuraSplashBoot(false);
      }
      if (typeof window.startFreshBrandSession === "function") {
        window.startFreshBrandSession();
      }
      const centered10 = await window.tbbAutoTrimAndCenterRasterLogo(${JSON.stringify(iter10DataUrl)}, 1024, 0.82);
      const traced10 = await window.tbbVectorizeRasterLogoToSvgCurves(centered10);

      window.canvasState.brandName = "ARCO Ingeniería";
      window.canvasState.userLockedBrandName = true;
      window.canvasState.custom_business_type = "Constructora de casas, departamentos, obra civil y áreas comunes para grandes desarrolladoras.";
      window.canvasState.primary_color = "#0078C0";
      window.canvasState.secondary_color = "#88E0E0";
      window.canvasState.accent_color = "#585850";
      window.canvasState.uploaded_logo_colors = ["#0078C0", "#88E0E0", "#585850"];
      window.canvasState.uploaded_logo_data_url = centered10;
      window.canvasState.uploaded_logo_traced_curves_svg = traced10;
      window.tbbState.logoPriHex = "#0078C0";
      window.tbbState.logoSecHex = "#88E0E0";
      window.tbbState.logoIterations = [{
        idx: 1,
        isUploadedUserLogo: true,
        isNanoBananaGenerated: true,
        uploadedLogoDataUrl: centered10,
        uploadedLogoSvgMarkup: "",
        conceptLabel: "Final Elegido",
        pri: "#0078C0",
        sec: "#88E0E0",
        accentHex: "#585850",
        scale: 1.0,
        darkBg: false,
        fontFamily: "Proxima Nova",
        layout: "horizontal",
        mods: { fontFamily: "Proxima Nova" }
      }];
      window.tbbState.logoIterationIndex = 1;

      // Ir a Paso 4.4 con la pestaña 5 "✦ Adobe Fonts (Híbrido)" seleccionada y Typekit ID configurado
      window.tbbState.step = 4;
      window.tbbState.subStep = 4;
      window.tbbSelectFontCategoryTab("adobe_hybrid");
      window.tbbUpdateAdobeTypekitId("arco7tk");
      window.tbbSelectOfficialFontFamily("Proxima Nova", "Plus Jakarta Sans", "JetBrains Mono");
      window.renderTbbZeroScrollStage();
      return true;
    })()`);

    await sleep(600);
    const shotStep4 = path.join(ARTIFACT_DIR, "hybrid_fonts_01_step4_4_adobe_typekit_tab.png");
    await cdp.capturePng(shotStep4);
    console.log("✓ Screenshot Paso 4.4 (Modo Híbrido Adobe Fonts + SIL OFL):", shotStep4);

    // Ir a Paso 6.1 Lámina 22 (Gobernanza Tipográfica Híbrida)
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 1;
      window.tbbState.plateIdx = 21; // Lámina 22
      window.renderTbbZeroScrollStage();
      return true;
    })()`);
    await sleep(700);
    const shotPlate22 = path.join(ARTIFACT_DIR, "hybrid_fonts_02_plate22_gobernanza_hibrida.png");
    await cdp.capturePng(shotPlate22);
    console.log("✓ Screenshot Lámina 22 (Gobernanza Tipográfica Híbrida):", shotPlate22);

    // Ir a Paso 6.2 Bóveda de Descargas y capturar el .ZIP Híbrido en memoria
    await cdp.evalJs(`(() => {
      window.tbbState.step = 6;
      window.tbbState.subStep = 2;
      window.renderTbbZeroScrollStage();
      return true;
    })()`);
    await sleep(600);
    const shotVault = path.join(ARTIFACT_DIR, "hybrid_fonts_03_step6_2_boveda_kit_hibrido.png");
    await cdp.capturePng(shotVault);
    console.log("✓ Screenshot Paso 6.2 (Bóveda con Kit Híbrido):", shotVault);

    // Interceptar el Blob generado por tbbDownloadBrandFontsZip y devolverlo en Base64
    const zipB64 = await cdp.evalJs(`(async () => {
      let capturedBlob = null;
      const origCreateObjectURL = URL.createObjectURL;
      URL.createObjectURL = function(blob) {
        capturedBlob = blob;
        return origCreateObjectURL.call(URL, blob);
      };
      await window.tbbDownloadBrandFontsZip(document.getElementById("tbbBtnDownloadBrandFontsKitZip"));
      URL.createObjectURL = origCreateObjectURL;
      if (!capturedBlob) return "";
      const ab = await capturedBlob.arrayBuffer();
      const u8 = new Uint8Array(ab);
      let bin = "";
      for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
      return btoa(bin);
    })()`);

    if (zipB64) {
      const zipBuf = Buffer.from(zipB64, "base64");
      const zipPathDeliv = path.join(DELIVERABLES_DIR, "Kit_Hibrido_Fuentes_ARCO_Ingenieria.zip");
      const zipPathArt = path.join(ARTIFACT_DIR, "Kit_Hibrido_Fuentes_ARCO_Ingenieria.zip");
      fs.writeFileSync(zipPathDeliv, zipBuf);
      fs.writeFileSync(zipPathArt, zipBuf);
      console.log(`✓ Kit Híbrido .ZIP exportado (${zipBuf.length} bytes): ${zipPathDeliv}`);
    }
  } finally {
    if (cdp) cdp.close();
    chromeProc.kill("SIGKILL");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
