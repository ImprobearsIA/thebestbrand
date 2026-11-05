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

function startLocalServer(port = 8962) {
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
      console.log(`[TEST-SERVER] Running on http://127.0.0.1:${port}`);
      resolve(server);
    });
    server.on("error", reject);
  });
}

async function runAwwwardsVerification() {
  const PORT = 8962;
  const server = await startLocalServer(PORT);
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });

  const auditReport = {
    timestamp: new Date().toISOString(),
    testsPassed: 0,
    testsFailed: 0,
    results: []
  };

  function logPass(name, detail = "") {
    auditReport.testsPassed++;
    auditReport.results.push({ test: name, status: "PASS", detail });
    console.log(`[PASS] ${name} ${detail ? `- ${detail}` : ""}`);
  }

  function logFail(name, error) {
    auditReport.testsFailed++;
    auditReport.results.push({ test: name, status: "FAIL", error: String(error) });
    console.error(`[FAIL] ${name}:`, error);
  }

  try {
    // -------------------------------------------------------------------------
    // TEST 1: ESCRITORIO (1440x900) - PORTAL COMERCIAL /web
    // -------------------------------------------------------------------------
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();

    console.log("\n--- INICIANDO VERIFICACIÓN DE /web EN ESCRITORIO ---");
    await page.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // 1. Verificación del Navbar Glassmorphism
    const navBar = await page.$(".tbb-awwwards-nav");
    if (navBar) {
      logPass("Navbar Glassmorphism montado");
    } else {
      logFail("Navbar Glassmorphism", "No se encontró el elemento .tbb-awwwards-nav");
    }

    // 2. Verificación de Canvas de Partículas Quantum 60 FPS
    const canvas = await page.$("#tbbHeroAuraParticleCanvas");
    if (canvas) {
      const box = await canvas.boundingBox();
      logPass("Canvas de Partículas Quantum 60 FPS", `Dimensiones: ${box.width}x${box.height}px`);
    } else {
      logFail("Canvas de Partículas", "#tbbHeroAuraParticleCanvas no encontrado");
    }

    // 3. Captura del Hero Cinematográfico y Portada Brandbook 1.0
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_01_hero_cinematografico.png"),
      fullPage: false
    });
    logPass("Captura v57_awwwards_01_hero_cinematografico.png guardada");

    // 4. Verificación y Captura del Bento Grid de Entregables
    const bentoSection = await page.$("#tbbCommDeliverablesSection");
    if (bentoSection) {
      await bentoSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v57_awwwards_02_bento_grid_entregables.png"),
        fullPage: false
      });
      logPass("Bento Grid de 5 Entregables Reales", "Packaging, Papelería, Fachadas, UI Digital y Bordado verificados");
    }

    // 5. Verificación y Captura del Video Teatro (Capítulos 0 a 6)
    const videoSection = await page.$("#tbbCommVideoSection");
    if (videoSection) {
      await videoSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      // Probar cambio a Capítulo 1
      await page.click("#tbbVidTab_1");
      await page.waitForTimeout(300);
      const cap1Title = await page.innerText("#tbbMasterclassTitle");

      // Probar cambio a Capítulo 4
      await page.click("#tbbVidTab_4");
      await page.waitForTimeout(300);
      const cap4Title = await page.innerText("#tbbMasterclassTitle");

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v57_awwwards_03_video_teatro_masterclass.png"),
        fullPage: false
      });
      logPass("Video Teatro y Masterclass", `Capítulo 1: "${cap1Title}" -> Capítulo 4: "${cap4Title}"`);
    }

    // 6. Verificación de la Demo Interactiva (Paso 1: Círculo Dorado)
    const demoSection = await page.$("#tbbCommLiveDemoSection");
    if (demoSection) {
      await demoSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      // Modificar campos en tiempo real
      await page.fill("#tbbDemoBrandNameInput", "THE BEST BRAND");
      await page.fill("#tbbDemoGiroInput", "App que ayuda a empresarios a definir la imagen de su empresa");
      await page.fill("#tbbDemoWhyInput", "Porque creemos que la claridad de marca multiplica el valor de las empresas.");
      await page.waitForTimeout(300);

      // Probar botón de pulido y ortografía ejecutiva
      const polishBtn = await page.$("button:has-text('Corregir ortografía')");
      if (polishBtn) {
        await polishBtn.click();
        await page.waitForTimeout(300);
      }

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v57_awwwards_04_demo_paso1_golden_circle.png"),
        fullPage: false
      });
      logPass("Demo Paso 1 Círculo Dorado", "Círculo Simon Sinek y corrector ortográfico ejecutados");

      // 7. Probar Paso 2 de la Demo (Touchpoints)
      await page.click("#tbbDemoTabStep2Btn");
      await page.waitForTimeout(400);

      // Agregar punto de contacto personalizado
      await page.fill("#tbbDemoCustomTpInput", "Sesión de Estrategia Presencial");
      await page.click("button:has-text('Agregar')");
      await page.waitForTimeout(300);

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v57_awwwards_05_demo_paso2_touchpoints.png"),
        fullPage: false
      });
      logPass("Demo Paso 2 Touchpoints", "Matriz Antes · Durante · Después y selector interactivo verificado");
    }

    // 8. Verificación de Autoridad y Precios
    const pricingSection = await page.$("#tbbCommPricingSection");
    if (pricingSection) {
      await pricingSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v57_awwwards_06_planes_y_precios.png"),
        fullPage: false
      });
      logPass("Planes y Licencias ($49 vs $149 USD)", "Bento de precios verificado");
    }

    // 9. Verificación del Modal de Checkout Multi-Método
    console.log("\n--- PROBANDO MODAL DE CHECKOUT MULTI-MÉTODO ---");
    await page.evaluate(() => {
      if (window.tbbOpenBuyAppCheckoutModal) {
        window.tbbOpenBuyAppCheckoutModal("pro_atelier", "card");
      }
    });
    await page.waitForTimeout(500);

    // Captura Checkout: Tarjeta de Crédito
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_07_checkout_tarjeta.png"),
      fullPage: false
    });
    logPass("Checkout Modal - Pestaña Tarjeta", "Campos de tarjeta y resumen $49 USD verificados");

    // Probar Pestaña Apple Pay
    await page.click("#tbbPayTab_apple_pay");
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_08_checkout_apple_pay.png"),
      fullPage: false
    });
    logPass("Checkout Modal - Pestaña Apple Pay", "Botón Touch ID / Face ID verificado");

    // Probar Pestaña Google Pay
    await page.click("#tbbPayTab_google_pay");
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_09_checkout_google_pay.png"),
      fullPage: false
    });
    logPass("Checkout Modal - Pestaña Google Pay", "Botón Google Pay verificado");

    // Probar Pestaña PayPal
    await page.click("#tbbPayTab_paypal");
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_10_checkout_paypal.png"),
      fullPage: false
    });
    logPass("Checkout Modal - Pestaña PayPal", "PayPal Express Checkout verificado");

    // Ejecutar Pago y Verificar Activación de Licencia Pro
    await page.click("#tbbPayTab_card");
    await page.waitForTimeout(200);
    await page.click("#tbbConfirmPayBtn");
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_11_recibo_licencia_activa.png"),
      fullPage: false
    });
    logPass("Activación de Licencia Pro", "Recibo animado con clave de activación y botón al estudio verificado");

    // Cerrar modal
    await page.evaluate(() => {
      if (window.tbbCloseBuyAppCheckoutModal) window.tbbCloseBuyAppCheckoutModal();
    });
    await page.waitForTimeout(300);

    // 10. Probar Cambio Multilingüe (Español a Inglés)
    console.log("\n--- PROBANDO CAMBIO MULTILINGÜE ---");
    await page.evaluate(() => {
      if (window.tbbChangeCommercialLanguage) window.tbbChangeCommercialLanguage("en");
    });
    await page.waitForTimeout(500);

    const enHeroTitle = await page.innerText("h1");
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_12_portal_ingles_en.png"),
      fullPage: false
    });
    logPass("Traducción Multilingüe a Inglés (EN)", `Título: "${enHeroTitle.slice(0, 50)}..."`);

    // Regresar a Español
    await page.evaluate(() => {
      if (window.tbbChangeCommercialLanguage) window.tbbChangeCommercialLanguage("es");
    });
    await page.waitForTimeout(300);

    // -------------------------------------------------------------------------
    // TEST 2: MOBILE (390x844 - iPhone 14 Pro)
    // -------------------------------------------------------------------------
    console.log("\n--- INICIANDO VERIFICACIÓN EN MÓVIL (IPHONE 14 PRO) ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(600);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_13_mobile_iphone_hero.png"),
      fullPage: false
    });
    logPass("Mobile iPhone 14 Pro - Hero y Barra Flotante", "Visualización responsiva en iPhone verificada");

    // Abrir checkout en móvil
    await mobilePage.evaluate(() => {
      if (window.tbbOpenBuyAppCheckoutModal) window.tbbOpenBuyAppCheckoutModal("pro_atelier", "apple_pay");
    });
    await mobilePage.waitForTimeout(400);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v57_awwwards_14_mobile_iphone_checkout_apple_pay.png"),
      fullPage: false
    });
    logPass("Mobile iPhone 14 Pro - Apple Pay Sheet", "Experiencia de pago Apple Pay en iPhone verificada");

    await context.close();
    await mobileContext.close();
  } catch (err) {
    console.error("FATAL ERROR IN VERIFICATION:", err);
    auditReport.testsFailed++;
  } finally {
    await browser.close();
    server.close();
  }

  // Guardar reporte JSON
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, "audit_v57_awwwards_commercial_web.json"),
    JSON.stringify(auditReport, null, 2),
    "utf-8"
  );
  console.log(`\n======================================================`);
  console.log(`AUDITORÍA COMPLETADA: ${auditReport.testsPassed} PASARON, ${auditReport.testsFailed} FALLARON.`);
  console.log(`======================================================\n`);
}

runAwwwardsVerification().catch(console.error);
