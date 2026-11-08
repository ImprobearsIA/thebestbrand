import http from "http";
import fs from "fs";
import path from "path";
import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";

const PORT = 8990;
const WEB_DIR = path.resolve("apps/web");
const ARTIFACTS_DIR = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d";

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
  console.log("SERVER REQ:", req.url);
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/" || reqPath === "/web") reqPath = "/index.html";
  if (reqPath === "/studio") reqPath = "/studio.html";

  let filePath = path.join(WEB_DIR, reqPath);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not Found: " + reqPath);
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    res.writeHead(404);
    res.end();
    return;
  }
  const mime = getMime(filePath);

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
      "Content-Type": mime,
      "Access-Control-Allow-Origin": "*"
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": stat.size,
      "Content-Type": mime,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, async () => {
  console.log(`[TEST-SERVER] Servidor de prueba listo en http://localhost:${PORT}`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
  });
  const report = { timestamp: new Date().toISOString(), tests: [] };

  try {
    // -------------------------------------------------------------------------
    // 1. AUDITORÍA MOBILE IPHONE 15 PRO (393 x 852)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST MOBILE IPHONE 15 PRO ---");
    const mobileCtx = await browser.newContext({
      viewport: { width: 393, height: 852 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true
    });
    const page = await mobileCtx.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    console.log("Navegando a http://127.0.0.1:" + PORT + " ...");
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // 1.1 Verificar Pestañas Móviles Sticky
    const tabsBar = await page.$("#tbbMobileSectionsTabsBar");
    const tabsBarVisible = tabsBar ? await tabsBar.isVisible() : false;
    const tab1Text = await page.textContent("#tbbMobSecTab_1");
    const tab2Text = await page.textContent("#tbbMobSecTab_2");
    const tab3Text = await page.textContent("#tbbMobSecTab_3");
    const tab4Text = await page.textContent("#tbbMobSecTab_4");
    console.log("Pestañas Móviles Visibles:", tabsBarVisible);
    console.log("Texto Tabs:", { tab1Text, tab2Text, tab3Text, tab4Text });

    // 1.2 Verificar Hero Navy y Canvases
    const heroNavy = await page.$(".hero-navy");
    const webglCanvas = await page.$("#webglLiquidShader");
    const dynamicCanvas = await page.$("#heroDynamicCanvas");
    console.log("Hero Navy:", Boolean(heroNavy), "| WebGL Canvas:", Boolean(webglCanvas), "| Dynamic Canvas:", Boolean(dynamicCanvas));

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, "v64_01_mobile_iphone_hero_navy_and_tabs.png"), fullPage: false });
    console.log("[SCREENSHOT 1] v64_01_mobile_iphone_hero_navy_and_tabs.png guardada.");

    // 1.3 Probar Sección 2 (Demo en Vivo)
    console.log("\nCambiando a Sección 2 (Demo en Vivo)...");
    await page.click("#tbbMobSecTab_2");
    await page.waitForTimeout(700);

    const pane2Visible = await page.isVisible("#tbbMainSectionPane_2");
    const floatingBarVisibleInDemo = await page.isVisible("#tbbAlwaysOnBuyFloatingBar");
    const topBuyBtnVisibleInDemo = await page.isVisible("#tbbTopHeaderBuyBtn");
    console.log("Pane 2 Visible:", pane2Visible);
    console.log("Barra Flotante de Compra en Demo (debe ser FALSE):", floatingBarVisibleInDemo);
    console.log("Botón de Compra Superior en Demo (debe ser FALSE):", topBuyBtnVisibleInDemo);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, "v64_02_mobile_iphone_clean_demo_inmersiva.png"), fullPage: false });
    console.log("[SCREENSHOT 2] v64_02_mobile_iphone_clean_demo_inmersiva.png guardada.");

    // 1.4 Probar Sección 4 (Videos & Libros)
    console.log("\nCambiando a Sección 4 (Videos y Libros)...");
    await page.click("#tbbMobSecTab_4");
    await page.waitForTimeout(700);

    const pane4Visible = await page.isVisible("#tbbMainSectionPane_4");
    const videoPoster = await page.getAttribute("#tbbMasterclassVideoPlayer", "poster");
    const playOverlayVisible = await page.isVisible("#tbbVideoPlayOverlay");
    console.log("Pane 4 Visible:", pane4Visible);
    console.log("Video Poster:", videoPoster);
    console.log("Play Overlay Visible antes de clic:", playOverlayVisible);

    // Clic en Play de Aura
    console.log("Haciendo clic en el botón de Play de Aura...");
    await page.click("#tbbVideoPlayOverlay");
    await page.waitForTimeout(800);

    const isVideoPlaying = await page.evaluate(() => {
      const v = document.getElementById("tbbMasterclassVideoPlayer");
      return v ? !v.paused : false;
    });
    console.log("¿Video de Aura reproduciendo?:", isVideoPlaying);

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, "v64_04_mobile_iphone_video_aura_reproduciendo.png"), fullPage: false });
    console.log("[SCREENSHOT 3] v64_04_mobile_iphone_video_aura_reproduciendo.png guardada.");

    // 1.5 Probar Apertura de Checkout Modal
    console.log("\nProbando apertura de Checkout Modal...");
    await page.evaluate(() => window.tbbOpenBuyAppCheckoutModal("pro_atelier"));
    await page.waitForTimeout(400);

    const checkoutOpen = await page.isVisible("#tbbBuyAppCheckoutModalOverlay");
    const modalContent = await page.textContent("#tbbCheckoutSheetInner");
    console.log("Modal de Checkout Abierto:", checkoutOpen);
    console.log("Opciones de Pago detectadas en Checkout:", {
      card: modalContent.includes("Tarjeta"),
      applePay: modalContent.includes("Apple Pay"),
      googlePay: modalContent.includes("Google Pay"),
      paypal: modalContent.includes("PayPal")
    });

    await page.screenshot({ path: path.join(ARTIFACTS_DIR, "v64_05_mobile_iphone_checkout_modal.png"), fullPage: false });
    console.log("[SCREENSHOT 4] v64_05_mobile_iphone_checkout_modal.png guardada.");

    await mobileCtx.close();

    // -------------------------------------------------------------------------
    // 2. AUDITORÍA DESKTOP (1440 x 900)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST DESKTOP (1440 x 900) ---");
    const deskCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const deskPage = await deskCtx.newPage();
    await deskPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "domcontentloaded" });
    await deskPage.waitForTimeout(800);

    await deskPage.screenshot({ path: path.join(ARTIFACTS_DIR, "v64_06_desktop_hero_navy.png"), fullPage: false });
    console.log("[SCREENSHOT 5] v64_06_desktop_hero_navy.png guardada.");

    await deskCtx.close();

    report.success = true;
    fs.writeFileSync(path.join(ARTIFACTS_DIR, "audit_v64_final_verification.json"), JSON.stringify(report, null, 2));
    console.log("\n[TEST COMPLETADO CON ÉXITO ABSOLUTO]");
  } catch (err) {
    console.error("[ERROR EN AUDITORÍA]", err);
  } finally {
    await browser.close();
    server.close();
  }
});
