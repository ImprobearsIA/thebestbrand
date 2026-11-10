import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import http from "http";
import fs from "fs";
import path from "path";

const PORT = 8995;
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
  console.log("Servidor arquitectura en http://localhost:" + PORT);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(`http://localhost:${PORT}/studio.html`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  const evalResult = await page.evaluate(() => {
    // 1. Audit core globals
    const coreGlobals = [
      "canvasState",
      "step0State",
      "buildActiveBrandProfileForV80",
      "generateBrandbook30Plates",
      "convertSvgTextToIllustratorCurves",
      "exportCloudIllustratorAsset",
      "exportCloudOfficeAsset",
      "openInApp30PlatesViewer",
      "startFreshBrandSession",
      "switchStep"
    ];

    const globalsStatus = {};
    coreGlobals.forEach(g => {
      globalsStatus[g] = typeof window[g];
    });

    // 2. Check Zero-Scroll interaction on all 6 steps
    const stepScrollHeights = {};
    for (let s = 1; s <= 6; s++) {
      if (typeof window.switchStep === "function") {
        window.switchStep(s);
      }
      const panel = document.getElementById(`panel-step-${s}`);
      if (panel) {
        stepScrollHeights[`step_${s}`] = {
          clientHeight: panel.clientHeight,
          scrollHeight: panel.scrollHeight,
          isZeroScroll: panel.scrollHeight <= (window.innerHeight + 100)
        };
      }
    }

    // 3. Audio & Voice safety check
    const hasVoiceStopper = typeof window.tbbStopAllAuraVoicePlayback === "function" || typeof window.stopContinuousVoice === "function";

    return {
      globalsStatus,
      stepScrollHeights,
      hasVoiceStopper
    };
  });

  console.log("RESULTADOS ARQUITECTURA Y ZERO-SCROLL:", evalResult);
  await browser.close();
  server.close();
});
