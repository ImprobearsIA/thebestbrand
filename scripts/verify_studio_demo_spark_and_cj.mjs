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

function startLocalServer(port = 8976) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const rawUrl = (req.url || "/").split("?")[0];
      const urlPath = decodeURIComponent(rawUrl);

      let filePath;
      if (urlPath === "/web" || urlPath === "/web/") {
        filePath = path.join(WEB_ROOT, "website.html");
      } else if (urlPath === "/studio" || urlPath === "/studio/") {
        filePath = path.join(WEB_ROOT, "index.html");
      } else if (urlPath === "/") {
        filePath = path.join(WEB_ROOT, "website.html");
      } else {
        filePath = path.join(WEB_ROOT, urlPath);
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(WEB_ROOT, "website.html");
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
      });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, "127.0.0.1", () => {
      console.log(`[TEST-SERVER] Corriendo en http://127.0.0.1:${port}`);
      resolve(server);
    });
    server.on("error", reject);
  });
}

async function verifyAll() {
  const PORT = 8976;
  const server = await startLocalServer(PORT);
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });

  const report = {
    timestamp: new Date().toISOString(),
    testsPassed: 0,
    testsFailed: 0,
    log: []
  };

  function pass(msg) {
    report.testsPassed++;
    report.log.push({ status: "PASS", message: msg });
    console.log(`[PASS] ${msg}`);
  }

  function fail(msg, err) {
    report.testsFailed++;
    report.log.push({ status: "FAIL", message: msg, error: String(err) });
    console.error(`[FAIL] ${msg}:`, err);
  }

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 960 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();

    console.log("\n==================================================================");
    console.log(" AUDITORÍA EN VIVO: DESTELLO EN TABS, APP REAL STUDIO, VIDEO AURA");
    console.log("             Y VIDEOS DE CUSTOMER JOURNEY / TOUCHPOINTS           ");
    console.log("==================================================================\n");

    await page.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    // 1. Verificar Destello en Pestaña 2 y Botón Hero
    console.log("--- 1. VERIFICANDO DESTELLO EN PESTAÑA Y HERO ---");
    const tabDestello = await page.$(".tbb-tab-destello");
    const pulseDot = await page.$(".tbb-pulse-dot");
    const badgeSpark = await page.$(".tbb-badge-spark");
    const heroBtnSpark = await page.$(".tbb-btn-hero-spark");

    if (tabDestello && pulseDot && badgeSpark && heroBtnSpark) {
      pass("Destello atractivo verificado: .tbb-tab-destello, .tbb-pulse-dot, .tbb-badge-spark y .tbb-btn-hero-spark presentes.");
    } else {
      fail("Destello atractivo", "Falta algún elemento destellante");
    }

    // 2. Verificar Modal de Video de Aura desde el Hero
    console.log("\n--- 2. PROBANDO MODAL DE VIDEO DE AURA DESDE EL HERO ---");
    const auraBtnHero = await page.$("button:has-text('Ver a Aura Explicar el Recorrido')");
    if (auraBtnHero) {
      await auraBtnHero.click();
      await page.waitForTimeout(800);

      const auraModal = await page.$("#tbbAuraVideoModal");
      const auraModalVid = await page.$("#tbbAuraModalVideo");
      if (auraModal && auraModalVid) {
        pass("Modal de Video de Aura abierto con éxito desde el Hero.");
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, "v59_01_modal_video_aura_hero.png"),
          fullPage: false
        });
        pass("Captura v59_01_modal_video_aura_hero.png guardada.");

        // Cerrar modal
        await page.click("#tbbAuraVideoModal button");
        await page.waitForTimeout(400);
      } else {
        fail("Modal Video Aura", "No se abrió #tbbAuraVideoModal");
      }
    } else {
      fail("Botón Video Aura", "No se encontró el botón en el Hero");
    }

    // 3. Captura Sección 1 con Destello
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v59_02_sec1_destello_hero.png"),
      fullPage: false
    });
    pass("Captura v59_02_sec1_destello_hero.png guardada.");

    // 4. Navegar a Sección 2 (La Aplicación Real Studio Embebida)
    console.log("\n--- 3. PROBANDO SECCIÓN 2: APLICACIÓN REAL STUDIO EMBEBIDA ---");
    await page.click("#tbbMainSecTab_2");
    await page.waitForTimeout(800);

    const pane2Visible = await page.isVisible("#tbbMainSectionPane_2");
    const iframeStudio = await page.$("#tbbLiveAppStudioIframe");
    if (pane2Visible && iframeStudio) {
      pass("Sección 2 activa con Iframe de la App Real (Studio).");

      // Esperar a que el iframe cargue
      await page.waitForTimeout(1500);

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v59_03_sec2_app_real_studio_embebida.png"),
        fullPage: false
      });
      pass("Captura v59_03_sec2_app_real_studio_embebida.png guardada.");

      // Probar que el iframe responda y probar el avance al paso 3 para abrir checkout
      console.log("Probando mensaje de límite de demo (Paso 2 -> Paso 3)...");
      await page.evaluate(() => {
        window.postMessage({ type: "TBB_DEMO_COMPLETED_STEP_2", fromStep: 2, targetStep: 3 }, "*");
      });
      await page.waitForTimeout(600);

      const checkoutModal = await page.$("#tbbBuyAppCheckoutModalOverlay");
      const checkoutVisible = await checkoutModal.isVisible();
      if (checkoutVisible) {
        pass("Al intentar avanzar al Paso 3, la página comercial abrió automáticamente el Modal de Compra.");
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, "v59_04_checkout_modal_al_pasar_paso3.png"),
          fullPage: false
        });
        pass("Captura v59_04_checkout_modal_al_pasar_paso3.png guardada.");

        // Cerrar modal de checkout
        await page.evaluate(() => window.tbbCloseBuyAppCheckoutModal());
        await page.waitForTimeout(400);
      } else {
        fail("Checkout al pasar a Paso 3", "No se abrió #tbbBuyAppCheckoutModalOverlay");
      }
    } else {
      fail("Sección 2 App Real", "Pane 2 o iframe no encontrado");
    }

    // 5. Navegar a Sección 4 (Videos Educativos & Autores YouTube)
    console.log("\n--- 4. PROBANDO SECCIÓN 4: VIDEO DE AURA REPARADO + CUSTOMER JOURNEY ---");
    await page.click("#tbbMainSecTab_4");
    await page.waitForTimeout(600);

    // Verificar reproducción de video de Aura en Sección 4
    const masterVideo = await page.$("#tbbMasterclassVideoPlayer");
    const playOverlay = await page.$("#tbbVideoPlayOverlay");

    if (masterVideo && playOverlay) {
      pass("Reproductor de Aura en Sección 4 cuenta con video y botón central de Play.");

      // Hacer click en el botón central de Play
      await playOverlay.click();
      await page.waitForTimeout(800);

      const isVideoPlaying = await page.evaluate(() => {
        const v = document.getElementById("tbbMasterclassVideoPlayer");
        return v && !v.paused;
      });

      if (isVideoPlaying) {
        pass("Video de Aura se reproduce con éxito tras hacer clic en el botón central.");
      } else {
        fail("Reproducción Video Aura", "El video sigue pausado tras hacer clic");
      }

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v59_05_sec4_video_aura_reproduciendo.png"),
        fullPage: false
      });
      pass("Captura v59_05_sec4_video_aura_reproduciendo.png guardada.");
    } else {
      fail("Reproductor de Aura", "No se encontró el reproductor o el overlay de play");
    }

    // 6. Verificar nuevos videos de Customer Journey y Touchpoints
    console.log("\n--- 5. VERIFICANDO VIDEOTECA CON CUSTOMER JOURNEY Y TOUCHPOINTS ---");
    const sec4Text = await page.innerText("#tbbMainSectionPane_4");
    const hasCJ = sec4Text.includes("Customer Journey") || sec4Text.includes("Nielsen Norman Group");
    const hasTouchpoints = sec4Text.includes("Touchpoints") || sec4Text.includes("Momentos de la Verdad");

    if (hasCJ && hasTouchpoints) {
      pass("Videoteca de YouTube incluye conferencias de Customer Journey y Touchpoints.");
    } else {
      fail("Videoteca Customer Journey / Touchpoints", "No se encontraron los textos esperados");
    }

    // Probar abrir el video de Customer Journey Mapping 101 en modal
    console.log("Probando modal de YouTube para Customer Journey (Nielsen Norman Group)...");
    const cjVideoCard = await page.$("div[aria-label*='Nielsen Norman Group']");
    if (cjVideoCard) {
      await cjVideoCard.click();
      await page.waitForTimeout(600);

      const ytModal = await page.$("#tbbYouTubeModal");
      if (ytModal) {
        pass("Modal de YouTube con video de Customer Journey abierto con éxito.");
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, "v59_06_youtube_modal_customer_journey.png"),
          fullPage: false
        });
        pass("Captura v59_06_youtube_modal_customer_journey.png guardada.");

        // Cerrar modal
        await page.click("#tbbYouTubeModal button");
        await page.waitForTimeout(300);
      }
    }

    // 7. Prueba Móvil en iPhone
    console.log("\n--- 6. VERIFICANDO RESPONSIVIDAD IPHONE ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      deviceScaleFactor: 3,
      isMobile: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(600);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v59_07_mobile_iphone_hero_destello.png"),
      fullPage: false
    });
    pass("Captura v59_07_mobile_iphone_hero_destello.png guardada.");

    console.log("\n==================================================================");
    console.log(` RESULTADO FINAL: ${report.testsPassed} PASADOS, ${report.testsFailed} FALLIDOS`);
    console.log("==================================================================\n");

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "audit_v59_studio_demo_spark_cj.json"),
      JSON.stringify(report, null, 2),
      "utf-8"
    );

  } catch (err) {
    console.error("[FATAL ERROR]:", err);
  } finally {
    await browser.close();
    server.close();
  }
}

verifyAll();
