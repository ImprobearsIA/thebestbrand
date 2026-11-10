import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { createRequire } from "module";
import { ENTREPRENEURS_30 } from "./catalog_30_entrepreneurs.mjs";

const require = createRequire(import.meta.url);

global.window = global;
global.document = {
  createElement: () => ({ style: {}, appendChild: () => {} }),
  head: { appendChild: () => {} },
  body: { appendChild: () => {} },
  getElementById: () => null
};
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.location = { search: "" };

require("../apps/web/tbb-v80-brandbook-plates.js");

const chromeBin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const dirHtmls = path.resolve("entregables_brandbooks/entrepreneurs_30/htmls");
const dirPdfs = path.resolve("entregables_brandbooks/entrepreneurs_30");

if (!fs.existsSync(dirHtmls)) fs.mkdirSync(dirHtmls, { recursive: true });
if (!fs.existsSync(dirPdfs)) fs.mkdirSync(dirPdfs, { recursive: true });

console.log("=========================================================================");
console.log("  RECOMPILACIÓN EDITORIAL V82.0 · EXACTAMENTE 30 PÁGINAS CERTIFICADAS");
console.log("=========================================================================\n");

let passedCount = 0;

for (let i = 0; i < ENTREPRENEURS_30.length; i++) {
  const brand = ENTREPRENEURS_30[i];
  const num = String(brand.id).padStart(2, "0");
  const slug = brand.slug;
  const baseName = `brandbook_entrepreneur_${num}_${slug}`;
  const htmlPath = path.join(dirHtmls, `${baseName}.html`);
  const pdfPath = path.join(dirPdfs, `${baseName}.pdf`);

  process.stdout.write(`[${num}/30] ${brand.name.padEnd(26)} -> `);

  // 1. Generar HTML con estilos impresos corregidos
  const fullHtml = global.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml(brand);
  fs.writeFileSync(htmlPath, fullHtml, "utf8");

  // 2. Compilar PDF con Chrome Headless
  execSync(`"${chromeBin}" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file://${htmlPath}"`, { stdio: "ignore" });

  // 3. Validar conteo de páginas exacto
  const pdfBuf = fs.readFileSync(pdfPath);
  const matches = pdfBuf.toString("latin1").match(/\/Type\s*\/Page\b/g);
  const count = matches ? matches.length : 0;
  const stat = fs.statSync(pdfPath);
  const sizeMb = (stat.size / (1024 * 1024)).toFixed(2);

  if (count === 30) {
    console.log(`OK: 30 Páginas exactas (${sizeMb} MB)`);
    passedCount++;
  } else {
    console.log(`FALLÓ: ${count} páginas (esperado 30)`);
  }
}

console.log("\n=========================================================================");
console.log(`RESULTADO FINAL: ${passedCount}/30 Brandbooks certificados con 30 páginas exactas.`);
console.log("=========================================================================");
