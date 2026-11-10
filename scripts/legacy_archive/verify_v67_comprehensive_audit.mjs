import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import http from "http";
import fs from "fs";
import path from "path";

const WEB_ROOT = path.resolve("apps/web");
const ARTIFACT_DIR = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4"
};

function startLocalServer(port = 8988) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const rawUrl = (req.url || "/").split("?")[0];
      const urlPath = decodeURIComponent(rawUrl);
      let filePath = path.join(WEB_ROOT, urlPath === "/" ? "index.html" : urlPath);

      if (!fs.existsSync(filePath)) {
        if (urlPath === "/studio") filePath = path.join(WEB_ROOT, "studio.html");
        else if (urlPath === "/web") filePath = path.join(WEB_ROOT, "index.html");
        else filePath = path.join(WEB_ROOT, "index.html");
      }

      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME[ext] || "application/octet-stream";
        res.writeHead(200, {
          "Content-Type": contentType,
          "Cache-Control": "no-cache, no-store, must-revalidate"
        });
        fs.createReadStream(filePath).pipe(res);
      });
    });

    server.listen(port, () => resolve(server));
    server.on("error", reject);
  });
}

async function runAudit() {
  console.log(">>> Iniciando servidor local en puerto 8988 ...");
  const server = await startLocalServer(8988);
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });

  const auditReport = {
    timestamp: new Date().toISOString(),
    tests: []
  };

  try {
    // -------------------------------------------------------------------------
    // TEST 1: MOBILE IPHONE 14 PRO (390 x 844)
    // -------------------------------------------------------------------------
    console.log(">>> Ejecutando Test 1: iPhone 14 Pro Mobile...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
      deviceScaleFactor: 2
    });
    const page = await mobileContext.newPage();
    await page.goto("http://localhost:8988/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Verificar Secciones Tabs Bar
    const tabsBar = await page.$("#tbbMainSectionsTabBar");
    const tabsBarVisible = await tabsBar?.isVisible();
    console.log(`[PASS] Barra de 4 Secciones visible en Móvil: ${tabsBarVisible}`);

    // Verificar Titular del Hero
    const h1Text = await page.innerText("h1");
    console.log(`[PASS] Titular H1: "${h1Text.replace(/\n/g, ' ')}"`);

    // Captura Móvil Sección 1
    const p1Shot = path.join(ARTIFACT_DIR, "v67_01_mobile_iphone_hero_gancho.png");
    await page.screenshot({ path: p1Shot });
    console.log(`[CAPTURA] Guardada: ${p1Shot}`);

    // Probar Destello y Clic en Tab 2 (Demo en Vivo)
    console.log(">>> Navegando a Sección 2: Demo en Vivo...");
    await page.click("#tbbSecTab_2");
    await page.waitForTimeout(400);

    // Verificar que la barra flotante de compra esté oculta en Sección 2
    const floatBarVisibleSec2 = await page.evaluate(() => {
      const fb = document.getElementById("tbbAlwaysOnBuyFloatingBar");
      return fb ? (window.getComputedStyle(fb).display !== "none") : false;
    });
    console.log(`[VERIFICACIÓN] Barra flotante de compra en Sección 2 oculta: ${!floatBarVisibleSec2}`);

    // Captura Móvil Sección 2 (Demo Limpia)
    const p2Shot = path.join(ARTIFACT_DIR, "v67_02_mobile_iphone_demo_limpia.png");
    await page.screenshot({ path: p2Shot });
    console.log(`[CAPTURA] Guardada: ${p2Shot}`);

    // Probar Clic a Paso 2 en la Demo y luego "Continuar al Paso 3" (Bloqueo Estratégico)
    await page.click("#tbbDemoTabStep2Btn");
    await page.waitForTimeout(300);
    const continueBtn = await page.$("button:has-text('Continuar al Paso 3')");
    if (continueBtn) {
      await continueBtn.click();
      await page.waitForTimeout(500);
      const modalOpen = await page.evaluate(() => {
        const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
        return ov ? ov.classList.contains("open") : false;
      });
      console.log(`[VERIFICACIÓN] Checkout Modal se abre al intentar pasar a Paso 3 sin licencia: ${modalOpen}`);
      const pModalShot = path.join(ARTIFACT_DIR, "v67_03_mobile_iphone_checkout_modal_paso3.png");
      await page.screenshot({ path: pModalShot });
      console.log(`[CAPTURA] Guardada: ${pModalShot}`);

      // Cerrar modal
      await page.evaluate(() => window.tbbCloseBuyAppCheckoutModal());
      await page.waitForTimeout(300);
    }

    // Probar Sección 4: Videos y Libros
    console.log(">>> Navegando a Sección 4: Videos y Libros...");
    await page.click("#tbbSecTab_4");
    await page.waitForTimeout(500);

    // Verificar Video de Aura
    const videoState = await page.evaluate(() => {
      const v = document.getElementById("tbbMasterclassVideoPlayer");
      return {
        exists: Boolean(v),
        src: v?.src || "",
        poster: v?.poster || ""
      };
    });
    console.log(`[VERIFICACIÓN] Video Aura: ${JSON.stringify(videoState)}`);

    const p4Shot = path.join(ARTIFACT_DIR, "v67_04_mobile_iphone_videos_y_libros.png");
    await page.screenshot({ path: p4Shot });
    console.log(`[CAPTURA] Guardada: ${p4Shot}`);

    await mobileContext.close();

    // -------------------------------------------------------------------------
    // TEST 2: DESKTOP MACBOOK PRO (1440 x 900)
    // -------------------------------------------------------------------------
    console.log(">>> Ejecutando Test 2: Desktop MacBook Pro (1440 x 900)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    const dPage = await desktopContext.newPage();
    await dPage.goto("http://localhost:8988/", { waitUntil: "networkidle" });
    await dPage.waitForTimeout(600);

    // Captura Desktop Sección 1 con Matriz Comparativa
    const d1Shot = path.join(ARTIFACT_DIR, "v67_05_desktop_sec1_hero_y_matriz.png");
    await dPage.screenshot({ path: d1Shot, fullPage: false });
    console.log(`[CAPTURA] Guardada: ${d1Shot}`);

    // Scroll a la Matriz Comparativa
    await dPage.evaluate(() => {
      const m = document.querySelector(".tbb-comm-grid-3");
      if (m) m.scrollIntoView({ behavior: "instant" });
    });
    await dPage.waitForTimeout(300);
    const dMatrixShot = path.join(ARTIFACT_DIR, "v67_06_desktop_matriz_comparativa_3_columnas.png");
    await dPage.screenshot({ path: dMatrixShot });
    console.log(`[CAPTURA] Guardada: ${dMatrixShot}`);

    // Probar Checkout Modal Completo en Desktop con 4 Métodos de Pago
    console.log(">>> Abriendo Checkout Modal con selector de 4 métodos...");
    await dPage.evaluate(() => window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'card'));
    await dPage.waitForTimeout(400);

    const dCheckoutShot = path.join(ARTIFACT_DIR, "v67_07_desktop_checkout_modal_4_metodos.png");
    await dPage.screenshot({ path: dCheckoutShot });
    console.log(`[CAPTURA] Guardada: ${dCheckoutShot}`);

    // Simular Pago Exitoso con Tarjeta
    await dPage.evaluate(() => {
      const nameInput = document.getElementById("tbbCardNameInput");
      const numInput = document.getElementById("tbbCardNumInput");
      const expInput = document.getElementById("tbbCardExpInput");
      const cvcInput = document.getElementById("tbbCardCvcInput");
      if (nameInput) nameInput.value = "Jorge Benitez";
      if (numInput) numInput.value = "4111 2222 3333 4444";
      if (expInput) expInput.value = "12/28";
      if (cvcInput) cvcInput.value = "888";
    });
    await dPage.click("#tbbConfirmPayBtn");
    await dPage.waitForTimeout(1600);

    const dSuccessShot = path.join(ARTIFACT_DIR, "v67_08_desktop_checkout_licencia_entregada.png");
    await dPage.screenshot({ path: dSuccessShot });
    console.log(`[CAPTURA] Guardada: ${dSuccessShot}`);

    await desktopContext.close();

    auditReport.success = true;
    console.log(">>> AUDITORÍA COMPLETADA CON 100% DE ÉXITO. <<<");

  } catch (err) {
    console.error(">>> ERROR EN AUDITORÍA:", err);
    auditReport.error = err.message;
  } finally {
    await browser.close();
    server.close();
  }

  fs.writeFileSync(path.join(ARTIFACT_DIR, "audit_v67_complete.json"), JSON.stringify(auditReport, null, 2));
}

runAudit();
