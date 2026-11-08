import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import http from "http";
import fs from "fs";
import path from "path";

const WEB_ROOT = path.resolve("apps/web");
const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  let u = req.url.split("?")[0];
  if (u === "/web" || u === "/") u = "/website.html";
  const f = path.join(WEB_ROOT, u);
  if (fs.existsSync(f) && !fs.statSync(f).isDirectory()) {
    const ext = path.extname(f);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8983, async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://127.0.0.1:8983/web", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.tbbSwitchMainSection(4));
  await page.waitForTimeout(600);

  const bookHeader = await page.locator(".tbb-book-card").first();
  await bookHeader.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const shot = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d/v61_06_biblioteca_libros_portadas_reales.png";
  await page.screenshot({ path: shot });
  console.log("Screenshot saved:", shot);

  await browser.close();
  server.close();
});
