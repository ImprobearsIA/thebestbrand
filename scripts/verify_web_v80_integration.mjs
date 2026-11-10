import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import http from "http";
import fs from "fs";
import path from "path";

// Simple static server for apps/web
const PORT = 8991;
const webDir = path.resolve("apps/web");

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/" || reqPath === "/studio") reqPath = "/studio.html";
  const filePath = path.join(webDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, async () => {
  console.log(`Local static server running on http://localhost:${PORT}`);
  
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on("console", msg => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", err => {
    consoleErrors.push(err.message);
  });

  try {
    console.log("Navigating to http://localhost:" + PORT + "/studio.html ...");
    await page.goto(`http://localhost:${PORT}/studio.html`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(2000);

    const testResults = await page.evaluate(() => {
      const results = {};
      results.hasV80Generator = Boolean(window.TBB_V80_PLATES_GENERATOR);
      results.v80PlatesCount = window.TBB_V80_PLATES_GENERATOR ? window.TBB_V80_PLATES_GENERATOR.getTheBestBrand30PlatesHtml().length : 0;
      
      // Test plate 1 render directly from universal engine and benefic alias
      const p1 = window.renderUniversalImproBearsGuideSinglePlateHTML ? window.renderUniversalImproBearsGuideSinglePlateHTML(0, true) : "";
      const p1Benefic = window.renderBeneficSinglePlateHTML ? window.renderBeneficSinglePlateHTML(0, true) : "";
      results.plate1Length = p1.length;
      results.plate1BeneficLength = p1Benefic.length;
      results.plate1HasNexus = p1.includes("Radiant Star") || p1.includes("Pétalo Axial") || p1.includes("THE BEST BRAND") || p1.includes("BRANDBOOK ENGINE");

      // Test standalone HTML doc build from universal engine and complete alias
      const docHtml = window.buildUniversal30PlatesStandaloneHTML ? window.buildUniversal30PlatesStandaloneHTML() : "";
      const docHtmlComplete = window.buildComplete30PlatesStandaloneHTML ? window.buildComplete30PlatesStandaloneHTML() : "";
      results.docHtmlLength = docHtml.length;
      results.docHtmlCompleteLength = docHtmlComplete.length;
      results.docHtmlHas30Plates = docHtml.includes("LÁMINA 30 / 30") || docHtml.includes("plate-30");

      return results;
    });

    console.log("Test Results in Browser Context:", JSON.stringify(testResults, null, 2));

    if (consoleErrors.length > 0) {
      console.warn("Console errors encountered:", consoleErrors);
    } else {
      console.log("✓ Zero JavaScript console errors on studio.html!");
    }

    // Verify PDF accessibility
    const pdfPath = path.join(webDir, "brandbooks/Manual_Marca_30_Laminas_TheBestBrand_Oficial_v80.pdf");
    const pdfExists = fs.existsSync(pdfPath);
    const pdfSize = pdfExists ? fs.statSync(pdfPath).size : 0;
    console.log(`✓ Official PDF deliverable exists: ${pdfExists} (Size: ${(pdfSize / (1024 * 1024)).toFixed(2)} MB)`);

  } catch (err) {
    console.error("Test execution failed:", err);
  } finally {
    await browser.close();
    server.close();
    console.log("Verification finished.");
  }
});
