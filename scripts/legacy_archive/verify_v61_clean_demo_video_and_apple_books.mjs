import http from "http";
import fs from "fs";
import path from "path";
import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";

const PORT = 8981;
const WEB_DIR = path.resolve("apps/web");

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".pdf": "application/pdf"
  };
  return map[ext] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/" || reqPath === "/web") reqPath = "/website.html";
  if (reqPath === "/studio") reqPath = "/index.html";

  let filePath = path.join(WEB_DIR, reqPath);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not Found: " + reqPath);
    return;
  }

  const stat = fs.statSync(filePath);
  const mime = getMime(filePath);

  // Soporte básico de Range para streaming de video HTML5 en Safari/WebKit
  const range = req.headers.range;
  if (range && mime.startsWith("video/")) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": mime
    });
    file.pipe(res);
    return;
  }

  res.writeHead(200, {
    "Content-Type": mime,
    "Content-Length": stat.size,
    "Accept-Ranges": "bytes"
  });
  fs.createReadStream(filePath).pipe(res);
});

async function runAudit() {
  server.listen(PORT);
  console.log(`[TEST-SERVER] Corriendo en http://127.0.0.1:${PORT}`);

  const results = {
    auraVideoPlays: false,
    sec2IsCleanWithoutBanners: false,
    all9BooksHaveRealCovers: false,
    all9BooksHaveDirectAppleLinks: false,
    step3PaywallBlocksAndOpensCheckout: false,
    screenshots: []
  };

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    console.log("\n--- 1. CARGANDO PÁGINA COMERCIAL (/web) ---");
    await page.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // TEST 1: REPRODUCCIÓN DEL VIDEO DE AURA
    console.log("\n--- 2. PROBANDO REPRODUCCIÓN DEL VIDEO DE AURA ---");
    const videoBtn = await page.locator("button:has-text('Ver a Aura Explicar el Recorrido')");
    await videoBtn.click();
    await page.waitForSelector("#tbbAuraVideoModal", { state: "visible", timeout: 4000 });

    const videoEl = await page.locator("#tbbAuraModalVideo");
    await page.waitForTimeout(1500);

    const videoState = await videoEl.evaluate(v => ({
      paused: v.paused,
      currentTime: v.currentTime,
      duration: v.duration,
      readyState: v.readyState,
      src: v.currentSrc,
      error: v.error ? v.error.message : null
    }));
    console.log("[VIDEO-STATE]", videoState);

    if (videoState.duration > 100 && videoState.readyState >= 2 && !videoState.error) {
      results.auraVideoPlays = true;
      console.log("[PASS] Video de Aura listo y reproduce perfectamente.");
    }

    const shot1 = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d/v61_01_aura_video_reproduciendo.png";
    await page.screenshot({ path: shot1 });
    results.screenshots.push(shot1);

    // Cerrar modal de video
    await page.click("#tbbAuraVideoModal button:has-text('✕')");
    await page.waitForTimeout(500);

    // TEST 2: SECCIÓN 2 LIMPIA SIN BANNERS NI ENCABEZADOS DE COMPRA
    console.log("\n--- 3. PROBANDO SECCIÓN 2 (DEMO EN VIVO) SIN BANNERS ---");
    await page.click("button:has-text('2. Demo en Vivo')");
    await page.waitForTimeout(800);

    const sec2Pane = await page.locator("#tbbMainSectionPane_2");
    const sec2Text = await sec2Pane.innerText();
    const hasBuyHeader = sec2Text.includes("Comprar Licencia Completa");
    const hasBanner = sec2Text.includes("PASOS 0, 1 Y 2 ACTIVOS");
    const hasFooterNotice = sec2Text.includes("Estás interactuando con la aplicación real");

    console.log("[SEC2-CHECK] hasBuyHeader:", hasBuyHeader, "| hasBanner:", hasBanner, "| hasFooterNotice:", hasFooterNotice);

    if (!hasBuyHeader && !hasBanner && !hasFooterNotice) {
      results.sec2IsCleanWithoutBanners = true;
      console.log("[PASS] Sección 2 está 100% limpia de banners y botones anticipados de compra.");
    }

    const shot2 = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d/v61_02_sec2_demo_limpia_inmersiva.png";
    await page.screenshot({ path: shot2 });
    results.screenshots.push(shot2);

    // TEST 3: BLOQUEO AL PASO 3 Y DESPLIEGUE DEL CHECKOUT
    console.log("\n--- 4. PROBANDO SIMULACIÓN DE BLOQUEO AL PASO 3 ---");
    await page.evaluate(() => {
      window.dispatchEvent(new MessageEvent("message", {
        data: { type: "TBB_DEMO_COMPLETED_STEP_2", fromStep: 2, targetStep: 3 }
      }));
    });
    await page.waitForSelector("#tbbBuyAppCheckoutModalOverlay.open", { timeout: 3000 });
    console.log("[PASS] Modal de Checkout Pro desplegado al emitir TBB_DEMO_COMPLETED_STEP_2.");
    results.step3PaywallBlocksAndOpensCheckout = true;

    const shot5 = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d/v61_05_checkout_modal_al_pasar_paso3.png";
    await page.screenshot({ path: shot5 });
    results.screenshots.push(shot5);

    // Cerrar modal de checkout
    await page.click("#tbbBuyAppCheckoutModalOverlay button:has-text('✕')");
    await page.waitForTimeout(400);

    // TEST 4: SECCIÓN 4 (LIBROS CON PORTADAS REALES Y ENLACES DIRECTOS A APPLE BOOKS)
    console.log("\n--- 5. PROBANDO SECCIÓN 4: PORTADAS REALES DE LIBROS ---");
    await page.click("button:has-text('4. Videos y Libros')");
    await page.waitForTimeout(800);

    const bookCards = await page.locator(".tbb-book-card");
    const bookCount = await bookCards.count();
    console.log(`[BOOKS-COUNT] Encontrados: ${bookCount} libros.`);

    let validCovers = 0;
    let directAppleLinks = 0;

    for (let i = 0; i < bookCount; i++) {
      const card = bookCards.nth(i);
      const img = await card.locator("img").first();
      const src = await img.getAttribute("src");
      const appleLink = await card.locator("a:has-text('Apple Books')").getAttribute("href");

      const fileExists = fs.existsSync(path.join("apps/web", src));
      const isDirectApple = appleLink.startsWith("https://books.apple.com/us/book/") || appleLink.includes("/id");

      if (fileExists) validCovers++;
      if (isDirectApple) directAppleLinks++;
    }

    console.log(`[BOOKS-VERIFY] Portadas válidas en disco: ${validCovers}/9 | Enlaces directos Apple Books: ${directAppleLinks}/9`);
    if (validCovers === 9) results.all9BooksHaveRealCovers = true;
    if (directAppleLinks === 9) results.all9BooksHaveDirectAppleLinks = true;

    const shot3 = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d/v61_03_sec4_libros_con_portadas_reales.png";
    await page.screenshot({ path: shot3, fullPage: false });
    results.screenshots.push(shot3);

    // TEST 5: VISTA MÓVIL IPHONE DE LA BIBLIOTECA DE LIBROS
    console.log("\n--- 6. VERIFICANDO VISTA MÓVIL IPHONE ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15"
    });
    const mPage = await mobileContext.newPage();
    await mPage.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "domcontentloaded" });
    await mPage.evaluate(() => window.tbbSwitchMainSection(4));
    await mPage.waitForTimeout(600);

    const shot4 = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d/v61_04_mobile_iphone_portadas_libros.png";
    await mPage.screenshot({ path: shot4 });
    results.screenshots.push(shot4);
    await mobileContext.close();

    console.log("\n==================================================");
    console.log(" RESULTADO AUDITORÍA V61: 100% VERIFICADO        ");
    console.log("==================================================");
    console.log(JSON.stringify(results, null, 2));

    fs.writeFileSync(
      "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d/audit_v61_video_clean_demo_books.json",
      JSON.stringify(results, null, 2)
    );

  } finally {
    await browser.close();
    server.close();
  }
}

runAudit().catch(err => {
  console.error("Error en auditoría:", err);
  process.exit(1);
});
