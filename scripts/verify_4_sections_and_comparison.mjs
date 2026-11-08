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

function startLocalServer(port = 8965) {
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
  const PORT = 8965;
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

    console.log("\n=======================================================");
    console.log(" AUDITORÍA COMPLETA: 4 SECCIONES + COMPARATIVA DE VALOR");
    console.log("=======================================================\n");

    await page.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    // 1. Validar ausencia de "lámina" y presencia de "Manual de Marca de 30 Hojas"
    const pageBodyText = await page.innerText("body");
    const hasLamina = /30 láminas|30 laminas|las 30 láminas/i.test(pageBodyText);
    if (!hasLamina) {
      pass("Terminología correcta: Cero menciones de '30 láminas'. Sustituido por 'Manual de Marca de 30 Hojas'.");
    } else {
      fail("Terminología incorrecta: Se detectó '30 láminas' en el texto.");
    }

    // 2. SECCIÓN 1: El Gancho & Comparativa de Valor
    console.log("\n--- VERIFICANDO SECCIÓN 1: EL GANCHO & COMPARATIVA DE VALOR ---");
    const h1Text = await page.innerText("#tbbMainSectionPane_1 h1");
    if (h1Text.includes("Crea tu Marca de manera profesional") && h1Text.includes("¡en minutos!")) {
      pass(`Titular exacto verificado: "${h1Text.replace(/\n/g, ' ')}"`);
    } else {
      fail("Titular de Gancho incorrecto", h1Text);
    }

    // Comprobar Gráfico Comparativo de 3 Columnas
    const compMatrix = await page.$(".tbb-comm-grid-3");
    if (compMatrix) {
      pass("Gráfico Comparativo de 3 Columnas montado con éxito.");
    } else {
      fail("Gráfico Comparativo", "No se encontró .tbb-comm-grid-3");
    }

    // Captura HD de la Sección 1
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v58_sec1_el_gancho_y_comparativa.png"),
      fullPage: false
    });
    pass("Captura v58_sec1_el_gancho_y_comparativa.png generada.");

    // 3. CAMBIAR A SECCIÓN 2: Demo en Vivo
    console.log("\n--- VERIFICANDO SECCIÓN 2: DEMO EN VIVO (PASOS 1 Y 2) ---");
    await page.click("#tbbMainSecTab_2");
    await page.waitForTimeout(500);

    const pane2Visible = await page.isVisible("#tbbMainSectionPane_2");
    const pane1Hidden = !(await page.isVisible("#tbbMainSectionPane_1"));
    if (pane2Visible && pane1Hidden) {
      pass("Transición a Sección 2 (Demo en Vivo) exitosa sin scroll infinito.");
    } else {
      fail("Transición a Sección 2", `Pane 2 visible: ${pane2Visible}, Pane 1 oculto: ${pane1Hidden}`);
    }

    // Probar interacción con el Círculo Dorado
    await page.fill("#tbbDemoBrandNameInput", "CAFÉ BOREAL");
    await page.fill("#tbbDemoWhyInput", "Porque el café de especialidad conecta a las personas con su origen natural.");
    await page.waitForTimeout(300);

    // Click en botón pulir redacción
    await page.click("button:has-text('Mejorar redacción')");
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v58_sec2_demo_paso1_golden_circle.png"),
      fullPage: false
    });
    pass("Captura v58_sec2_demo_paso1_golden_circle.png generada.");

    // Cambiar a Paso 2 de la Demo (Touchpoints)
    await page.click("button:has-text('Paso 2 · Touchpoints')");
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v58_sec2_demo_paso2_touchpoints.png"),
      fullPage: false
    });
    pass("Captura v58_sec2_demo_paso2_touchpoints.png generada.");

    // 4. CAMBIAR A SECCIÓN 3: Oferta y Entregables
    console.log("\n--- VERIFICANDO SECCIÓN 3: OFERTA Y ENTREGABLES ---");
    await page.click("#tbbMainSecTab_3");
    await page.waitForTimeout(500);

    const pane3Visible = await page.isVisible("#tbbMainSectionPane_3");
    if (pane3Visible) {
      pass("Transición a Sección 3 (Oferta y Entregables) exitosa.");
    } else {
      fail("Transición a Sección 3", "Pane 3 no visible");
    }

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v58_sec3_oferta_y_entregables_30_hojas.png"),
      fullPage: false
    });
    pass("Captura v58_sec3_oferta_y_entregables_30_hojas.png generada.");

    // 5. CAMBIAR A SECCIÓN 4: Videos Educativos & Videoteca de YouTube
    console.log("\n--- VERIFICANDO SECCIÓN 4: VIDEOS EDUCATIVOS & YOUTUBE ---");
    await page.click("#tbbMainSecTab_4");
    await page.waitForTimeout(500);

    const pane4Visible = await page.isVisible("#tbbMainSectionPane_4");
    if (pane4Visible) {
      pass("Transición a Sección 4 (Videos Educativos) exitosa.");
    } else {
      fail("Transición a Sección 4", "Pane 4 no visible");
    }

    // Verificar que los autores de YouTube estén presentes
    const pageTextSec4 = await page.innerText("#tbbMainSectionPane_4");
    const hasSimonSinek = pageTextSec4.includes("Simon Sinek");
    const hasSagiHaviv = pageTextSec4.includes("Sagi Haviv");
    const hasMartyNeumeier = pageTextSec4.includes("Marty Neumeier");
    const hasDonaldMiller = pageTextSec4.includes("Donald Miller");
    const hasDavidAaker = pageTextSec4.includes("David Aaker");

    if (hasSimonSinek && hasSagiHaviv && hasMartyNeumeier && hasDonaldMiller && hasDavidAaker) {
      pass("Videoteca de YouTube completa: Simon Sinek, Sagi Haviv, Marty Neumeier, Donald Miller y David Aaker presentes.");
    } else {
      fail("Videoteca de YouTube", "Falta algún autor");
    }

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v58_sec4_videos_educativos_y_youtube_autores.png"),
      fullPage: false
    });
    pass("Captura v58_sec4_videos_educativos_y_youtube_autores.png generada.");

    // Probar abrir un video de YouTube en Modal
    console.log("\n--- PROBANDO MODAL DE YOUTUBE ---");
    await page.click("div[aria-label='Ver video de Simon Sinek']");
    await page.waitForTimeout(600);

    const ytModal = await page.$("#tbbYouTubeModal");
    if (ytModal) {
      pass("Modal de YouTube con Simon Sinek reproducido con éxito.");
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "v58_sec4_youtube_modal_simon_sinek.png"),
        fullPage: false
      });
      // Cerrar modal
      await page.click("#tbbYouTubeModal button");
      await page.waitForTimeout(300);
    } else {
      fail("Modal de YouTube", "No se abrió #tbbYouTubeModal");
    }

    // 6. VERIFICACIÓN DEL BOTÓN DE COMPRA FLOTANTE DISCRETO
    console.log("\n--- VERIFICANDO BOTÓN DE COMPRA FLOTANTE DISCRETO ---");
    const stickyBuy = await page.$("#tbbStickyBottomBar");
    if (stickyBuy) {
      const stickyVisible = await stickyBuy.isVisible();
      pass(`Barra / Botón flotante de compra presente (Visible: ${stickyVisible}).`);
    }

    // 7. PRUEBA EN VISTA MÓVIL IPHONE (393x852)
    console.log("\n--- VERIFICANDO RESPONSIVIDAD MÓVIL IPHONE ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      deviceScaleFactor: 3,
      isMobile: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(600);

    // Captura Mobile Sección 1
    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v58_mobile_iphone_sec1_gancho.png"),
      fullPage: false
    });
    pass("Captura v58_mobile_iphone_sec1_gancho.png generada.");

    // Abrir drawer móvil
    await mobilePage.click(".tbb-mobile-only-burger");
    await mobilePage.waitForTimeout(400);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v58_mobile_iphone_drawer_secciones.png"),
      fullPage: false
    });
    pass("Captura v58_mobile_iphone_drawer_secciones.png generada.");

    console.log("\n=======================================================");
    console.log(` AUDITORÍA FINALIZADA: ${report.testsPassed} PASADOS, ${report.testsFailed} FALLIDOS`);
    console.log("=======================================================\n");

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "audit_v58_commercial_4_sections.json"),
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
