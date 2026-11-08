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

function startLocalServer(port = 8980) {
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
  const PORT = 8980;
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
    console.log(" AUDITORÍA: BIBLIOTECA ESENCIAL DE LIBROS (KINDLE & APPLE BOOKS)  ");
    console.log("==================================================================\n");

    await page.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // 1. Navegar a Sección 4 (Videos y Libros)
    console.log("--- 1. NAVEGANDO A SECCIÓN 4 (VIDEOS Y LIBROS) ---");
    await page.click("#tbbMainSecTab_4");
    await page.waitForTimeout(500);

    const pane4Visible = await page.isVisible("#tbbMainSectionPane_4");
    if (pane4Visible) {
      pass("Sección 4 (Videos y Libros) visible con éxito.");
    } else {
      fail("Sección 4 no visible");
    }

    // 2. Verificar presencia de la Biblioteca de Libros
    console.log("\n--- 2. VERIFICANDO PRESENCIA DE LIBROS RECOMENDADOS ---");
    const bookCards = await page.$$(".tbb-book-card");
    if (bookCards.length === 9) {
      pass(`Se encontraron los 9 libros fundacionales recomendados (Total: ${bookCards.length}).`);
    } else {
      fail("Cantidad de libros", `Esperados: 9, Encontrados: ${bookCards.length}`);
    }

    const sec4Text = await page.innerText("#tbbMainSectionPane_4");
    const hasOsterwalder = sec4Text.includes("Business Model Generation") && sec4Text.includes("Alexander Osterwalder");
    const hasValueProp = sec4Text.includes("Value Proposition Design");
    const hasSinek = sec4Text.includes("Start with Why") && sec4Text.includes("Simon Sinek");
    const hasStorybrand = sec4Text.includes("Building a StoryBrand") && sec4Text.includes("Donald Miller");
    const hasCarlzon = sec4Text.includes("Moments of Truth") && sec4Text.includes("Jan Carlzon");
    const hasHaviv = sec4Text.includes("Identify") && sec4Text.includes("Sagi Haviv");
    const hasLean = sec4Text.includes("The Lean Startup") && sec4Text.includes("Eric Ries");

    if (hasOsterwalder && hasValueProp && hasSinek && hasStorybrand && hasCarlzon && hasHaviv && hasLean) {
      pass("Obras de Alexander Osterwalder (Business Model Canvas), Simon Sinek, Donald Miller, Jan Carlzon, Sagi Haviv y Eric Ries verificadas en la biblioteca.");
    } else {
      fail("Faltan autores en la biblioteca", "Verificar textos");
    }

    // 3. Verificar que cada libro tenga enlaces a Kindle Store y Apple Books
    console.log("\n--- 3. VERIFICANDO ENLACES A KINDLE Y APPLE BOOKS ---");
    const kindleLinks = await page.$$("a:has-text('Kindle Store')");
    const appleBooksLinks = await page.$$("a:has-text('Apple Books')");

    if (kindleLinks.length === 9 && appleBooksLinks.length === 9) {
      pass("Cada uno de los 9 libros cuenta con su botón directo a Kindle Store y Apple Books.");
    } else {
      fail("Enlaces a Kindle / Apple Books", `Kindle: ${kindleLinks.length}, Apple Books: ${appleBooksLinks.length}`);
    }

    // 4. Probar filtro interactivo de categorías
    console.log("\n--- 4. PROBANDO FILTRO DE CATEGORÍAS ---");
    await page.click("button.tbb-book-filter-pill[data-cat='canvas']");
    await page.waitForTimeout(400);

    const visibleCanvasCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".tbb-book-card"));
      return cards.filter(c => c.style.display !== "none").length;
    });

    if (visibleCanvasCards === 3) {
      pass(`Filtro Canvas & Estrategia activo: 3 libros mostrados (Osterwalder BMG, VPD y Ries Lean Startup).`);
    } else {
      fail("Filtro Canvas", `Libros visibles: ${visibleCanvasCards}`);
    }

    // Restaurar a todos
    await page.click("button.tbb-book-filter-pill[data-cat='all']");
    await page.waitForTimeout(400);

    // Captura HD de la Biblioteca de Libros
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "v60_01_biblioteca_libros_kindle_apple.png"),
      fullPage: false
    });
    pass("Captura v60_01_biblioteca_libros_kindle_apple.png guardada.");

    // 5. Prueba Móvil en iPhone (393x852)
    console.log("\n--- 5. VERIFICANDO EN VISTA MÓVIL IPHONE ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      deviceScaleFactor: 3,
      isMobile: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://127.0.0.1:${PORT}/web`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(500);

    // Ir a sección 4 en móvil
    await mobilePage.evaluate(() => window.tbbSwitchMainSection(4));
    await mobilePage.waitForTimeout(500);

    await mobilePage.screenshot({
      path: path.join(ARTIFACT_DIR, "v60_02_mobile_iphone_biblioteca_libros.png"),
      fullPage: false
    });
    pass("Captura v60_02_mobile_iphone_biblioteca_libros.png guardada.");

    console.log("\n==================================================================");
    console.log(` RESULTADO FINAL: ${report.testsPassed} PASADOS, ${report.testsFailed} FALLIDOS`);
    console.log("==================================================================\n");

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "audit_v60_founder_books_library.json"),
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
