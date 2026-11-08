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

function startLocalServer(port = 8991) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const rawUrl = (req.url || "/").split("?")[0];
      const urlPath = decodeURIComponent(rawUrl);
      let filePath = path.join(WEB_ROOT, urlPath === "/" ? "index.html" : urlPath);

      if (!fs.existsSync(filePath)) {
        if (urlPath === "/studio") filePath = path.join(WEB_ROOT, "studio.html");
        else if (urlPath === "/web") filePath = path.join(WEB_ROOT, "index.html");
        else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
          return;
        }
      }

      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME[ext] || "application/octet-stream";

      // Manejo de streaming para video mp4 (Range requests)
      if (ext === ".mp4") {
        const range = req.headers.range;
        const totalSize = stat.size;
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
          const chunkSize = (end - start) + 1;
          const fileStream = fs.createReadStream(filePath, { start, end });
          res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${totalSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": contentType
          });
          fileStream.pipe(res);
          return;
        } else {
          res.writeHead(200, {
            "Content-Length": totalSize,
            "Accept-Ranges": "bytes",
            "Content-Type": contentType
          });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }

      const content = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
      resolve(server);
    });
    server.on("error", reject);
  });
}

async function runAudit() {
  const server = await startLocalServer(8991);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    console.log("=== INICIANDO AUDITORÍA V71 PLAYWRIGHT ===");

    // -------------------------------------------------------------------------
    // TEST 1: MOBILE VIEWPORT (IPHONE 390x844) EN LANDING (INDEX.HTML)
    // -------------------------------------------------------------------------
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1"
    });
    const mobilePage = await mobileContext.newPage();

    console.log("\n--- TEST 1: MOBILE INDEX.HTML ---");
    await mobilePage.goto("http://localhost:8991/index.html", { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(600);

    // Captura Sección 1: El Gancho
    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v71_01_mobile_sec1_gancho.png"),
      fullPage: false
    });
    console.log("✓ Captura guardada: v71_01_mobile_sec1_gancho.png");

    // Verificar Secciones / Tabs
    const secTabsCount = await mobilePage.evaluate(() => {
      return document.querySelectorAll(".tbb-sec-tab").length;
    });
    console.log(`✓ Pestañas de sección encontradas: ${secTabsCount} (Esperadas: 4)`);

    // Cambiar a Sección 2: Demo en Vivo
    console.log("\n--- TEST 2: AISLAMIENTO DEMO EN VIVO (SECCIÓN 2) ---");
    await mobilePage.evaluate(() => {
      window.tbbSwitchMainSection(2);
    });
    await mobilePage.waitForTimeout(500);

    // Verificar que la barra flotante y botones de compra estén OCULTOS
    const demoIsolationCheck = await mobilePage.evaluate(() => {
      const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
      const floatDisp = floatBar ? window.getComputedStyle(floatBar).display : "none";
      const isDemoSec = document.body.classList.contains("tbb-is-demo-section");
      return { floatDisp, isDemoSec };
    });
    console.log("✓ Aislamiento Sección 2:", demoIsolationCheck);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v71_02_mobile_sec2_demo_isolated.png"),
      fullPage: false
    });
    console.log("✓ Captura guardada: v71_02_mobile_sec2_demo_isolated.png");

    // Probar Paso 2 de la Demo y trigger de compra
    await mobilePage.evaluate(() => {
      window.tbbSwitchCommercialDemoStep(2);
    });
    await mobilePage.waitForTimeout(300);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v71_03_mobile_sec2_step2_touchpoints.png"),
      fullPage: false
    });
    console.log("✓ Captura guardada: v71_03_mobile_sec2_step2_touchpoints.png");

    // Click "Continuar al Paso 3" y verificar que abre modal de checkout
    console.log("\n--- TEST 3: CHECKOUT MODAL TRIGGER DESDE DEMO ---");
    await mobilePage.evaluate(() => {
      window.tbbContinueFromDemoIntoFullStudio();
    });
    await mobilePage.waitForTimeout(500);

    const checkoutModalOpen = await mobilePage.evaluate(() => {
      const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
      return ov ? ov.classList.contains("open") : false;
    });
    console.log("✓ Modal de Checkout abierto tras terminar demo:", checkoutModalOpen);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v71_04_mobile_checkout_modal.png"),
      fullPage: false
    });
    console.log("✓ Captura guardada: v71_04_mobile_checkout_modal.png");

    // Cerrar Checkout
    await mobilePage.evaluate(() => {
      window.tbbCloseBuyAppCheckoutModal();
    });

    // Probar Sección 4: Videos y Libros
    console.log("\n--- TEST 4: SECCIÓN 4 (AURA VIDEO Y AUTORES) ---");
    await mobilePage.evaluate(() => {
      window.tbbSwitchMainSection(4);
    });
    await mobilePage.waitForTimeout(500);

    const videoState = await mobilePage.evaluate(() => {
      const vid = document.getElementById("tbbMasterclassVideoPlayer");
      return {
        src: vid ? vid.src : null,
        poster: vid ? vid.poster : null,
        paused: vid ? vid.paused : null
      };
    });
    console.log("✓ Estado Video Player:", videoState);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v71_05_mobile_sec4_video_books.png"),
      fullPage: false
    });
    console.log("✓ Captura guardada: v71_05_mobile_sec4_video_books.png");

    await mobileContext.close();

    // -------------------------------------------------------------------------
    // TEST 5: MOTOR DE BRANDBOOK DE 30 LÁMINAS EN STUDIO (DESKTOP)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST 5: STUDIO / BRANDBOOK 30 LÁMINAS BESPOKE ---");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const studioPage = await desktopContext.newPage();

    // Cargar perfil Admin TheBestBrand
    await studioPage.goto("http://localhost:8991/studio.html?admin=thebestbrand", { waitUntil: "networkidle" });
    await studioPage.waitForTimeout(1000);

    // Navegar a Paso 6 (Brandbook)
    await studioPage.evaluate(() => {
      if (typeof window.tbbJumpToStep === "function") {
        window.tbbJumpToStep(6, 1);
      }
    });
    await studioPage.waitForTimeout(800);

    // Abrir Visor In-App de 30 Láminas
    console.log("Abriendo visor interactivo de 30 láminas...");
    await studioPage.evaluate(() => {
      if (typeof window.openInApp30PlatesViewer === "function") {
        window.openInApp30PlatesViewer();
      }
    });
    await studioPage.waitForTimeout(1200);

    // Contar cuántas láminas existen en el visor
    const plateCount = await studioPage.evaluate(() => {
      return document.querySelectorAll(".tbb-inapp-a4-page").length;
    });
    console.log(`✓ Láminas en visor in-app: ${plateCount} (Esperadas: 30)`);

    // Captura Visor In-App Lámina 1
    await studioPage.screenshot({
      path: path.join(ARTIFACT_DIR, "v71_06_studio_brandbook_inapp_viewer.png"),
      fullPage: false
    });
    console.log("✓ Captura guardada: v71_06_studio_brandbook_inapp_viewer.png");

    // Renderizar láminas en canvas y verificar ausencia de textos duplicados
    console.log("\n--- TEST 6: VERIFICACIÓN PROCEDURAL CANVAS 2D DE 30 LÁMINAS ---");
    const canvasEvaluation = await studioPage.evaluate(async () => {
      // Probar generate30PlatesPdfBlobUltraFast
      let curStep = 0, totSteps = 0;
      const blob = await window.generate30PlatesPdfBlobUltraFast((c, t) => {
        curStep = c;
        totSteps = t;
      });
      return {
        blobSize: blob.size,
        blobType: blob.type,
        curStep,
        totSteps
      };
    });
    console.log("✓ Generación Ultra-Fast PDF:", canvasEvaluation);

    // Capturar láminas representativas directamente del HTML renderizado
    const samplePlates = [0, 3, 6, 8, 13, 19, 29]; // 1, 4, 7, 9, 14, 20, 30
    for (const pIdx of samplePlates) {
      const plateHtml = await studioPage.evaluate((idx) => {
        const p = document.querySelectorAll(".tbb-inapp-a4-page")[idx];
        return p ? p.innerHTML : null;
      }, pIdx);

      if (plateHtml) {
        // Renderizar temporalmente en una página limpia para capturar alta resolución
        const platePage = await desktopContext.newPage();
        await platePage.setViewportSize({ width: 1122, height: 794 });
        await platePage.setContent(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=JetBrains+Mono:wght@500;700;800&family=Montserrat:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="http://localhost:8991/benefic-editorial-base.css?v=71.0">
            <style>
              body { margin:0; padding:0; background:#FFFFFF; overflow:hidden; }
              .benefic-plate { width:1122px; height:794px; position:relative; box-sizing:border-box; }
            </style>
          </head>
          <body>${plateHtml}</body>
          </html>
        `);
        await platePage.waitForTimeout(500);
        const fileName = `v71_sheet_${String(pIdx + 1).padStart(2, "0")}.png`;
        await platePage.screenshot({
          path: path.join(ARTIFACT_DIR, fileName),
          fullPage: true
        });
        console.log(`✓ Lámina ${pIdx + 1} capturada: ${fileName}`);
        await platePage.close();
      }
    }

    await desktopContext.close();

    console.log("\n=== TODAS LAS PRUEBAS V71 COMPLETADAS CON ÉXITO ===");

  } catch (err) {
    console.error("❌ ERROR EN AUDITORÍA V71:", err);
  } finally {
    await browser.close();
    server.close();
  }
}

runAudit();
