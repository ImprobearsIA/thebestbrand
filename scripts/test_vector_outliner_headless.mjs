import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import http from "http";
import fs from "fs";
import path from "path";

const PORT = 8994;
const webDir = path.resolve("apps/web");

const server = http.createServer((req, res) => {
  const filePath = path.join(webDir, req.url.split("?")[0]);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === ".js" ? "application/javascript" : (ext === ".ttf" ? "font/ttf" : "text/html");
    res.writeHead(200, { "Content-Type": mime });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, async () => {
  console.log("Servidor de prueba outliner en http://localhost:" + PORT);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true
  });
  const page = await browser.newPage();

  await page.goto(`http://localhost:${PORT}/studio.html`, { waitUntil: "domcontentloaded" });

  await page.waitForTimeout(500);

  const result = await page.evaluate(async (port) => {
    const testHorizontalSvg = `<svg viewBox="0 0 460 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="40" fill="#0D2540"/>
      <text x="145" y="58" font-family="Montserrat" font-weight="900" font-size="26" letter-spacing="2" fill="#090D16">THE BEST BRAND</text>
      <text x="146" y="80" font-family="Plus Jakarta Sans" font-weight="700" font-size="9.5" letter-spacing="3" fill="#426EAE">BRAND IDENTITY ATELIER</text>
    </svg>`;

    const testSealSvg = `<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="seal_top" d="M 35,130 A 95,95 0 1,1 225,130" fill="none"/>
        <path id="seal_bottom" d="M 225,130 A 95,95 0 0,1 35,130" fill="none"/>
      </defs>
      <circle cx="130" cy="130" r="122" fill="#FAF8F5" stroke="#0D2540" stroke-width="2.8"/>
      <text font-family="Montserrat" font-weight="900" font-size="12" letter-spacing="3.5" fill="#090D16">
        <textPath href="#seal_top" startOffset="50%" text-anchor="middle">THE BEST BRAND</textPath>
      </text>
      <text font-family="Plus Jakarta Sans" font-weight="800" font-size="9" letter-spacing="3" fill="#0D2540">
        <textPath href="#seal_bottom" startOffset="50%" text-anchor="middle">★ CALIDAD CERTIFICADA · 2026 ★</textPath>
      </text>
    </svg>`;

    const outlinedH = await window.convertSvgTextToIllustratorCurves(testHorizontalSvg, "Montserrat");
    const outlinedS = await window.convertSvgTextToIllustratorCurves(testSealSvg, "Montserrat");

    return {
      hOriginalTextCount: (testHorizontalSvg.match(/<text/g) || []).length,
      hOutlinedTextCount: (outlinedH.match(/<text/g) || []).length,
      hOutlinedPathCount: (outlinedH.match(/<path/g) || []).length,
      sOriginalTextPathCount: (testSealSvg.match(/<textPath/g) || []).length,
      sOutlinedTextPathCount: (outlinedS.match(/<textPath/g) || []).length,
      sOutlinedPathCount: (outlinedS.match(/<path/g) || []).length,
      isCertifiedH: outlinedH.includes("X-Vector-Curves-Certified") || outlinedH.includes("d=\"M"),
      isCertifiedS: outlinedS.includes("X-Vector-Curves-Certified") || outlinedS.includes("d=\"M")
    };
  }, PORT);

  console.log("RESULTADOS DE PRUEBA MOTOR DE CONTORNOS VECTORIALES (V82.0):", result);
  await browser.close();
  server.close();
});
