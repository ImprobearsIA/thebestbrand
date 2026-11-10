import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { createRequire } from "module";

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
require("../apps/web/tbb-generative-brandbook-engine.js");

const chromeBin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = path.resolve("entregables_brandbooks/entrepreneurs_30");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Map brands by ID 1 to 30
const brandsById = {};
Object.values(global.CATALOG_30_MAP || {}).forEach(b => {
  if (b && typeof b.id === "number") {
    brandsById[b.id] = b;
  }
});

const fileMap = {
  1: "brandbook_entrepreneur_01_maison_levain",
  2: "brandbook_entrepreneur_02_vertice_y_sombra",
  3: "brandbook_entrepreneur_03_abaco_y_ley",
  4: "brandbook_entrepreneur_04_aerovent_athletics",
  5: "brandbook_entrepreneur_05_dentalumina",
  6: "brandbook_entrepreneur_06_lexprotect_ip",
  7: "brandbook_entrepreneur_07_brasa_y_nori",
  8: "brandbook_entrepreneur_08_titanium_forge",
  9: "brandbook_entrepreneur_09_grano_silvestre",
  10: "brandbook_entrepreneur_10_nexus_scale",
  11: "brandbook_entrepreneur_11_genomix_lab",
  12: "brandbook_entrepreneur_12_hormigon_y_cristal",
  13: "brandbook_entrepreneur_13_roble_ancestral",
  14: "brandbook_entrepreneur_14_serena_prana",
  15: "brandbook_entrepreneur_15_flete_veloz",
  16: "brandbook_entrepreneur_16_decibel_master",
  17: "brandbook_entrepreneur_17_lupulo_feroz",
  18: "brandbook_entrepreneur_18_nebula_selva",
  19: "brandbook_entrepreneur_19_vitalvet_trauma",
  20: "brandbook_entrepreneur_20_fortress_shield_soc",
  21: "brandbook_entrepreneur_21_aurum_y_diamante",
  22: "brandbook_entrepreneur_22_cilindro_maestro",
  23: "brandbook_entrepreneur_23_botanica_sublime",
  24: "brandbook_entrepreneur_24_facturaflow",
  25: "brandbook_entrepreneur_25_aquapure_dry",
  26: "brandbook_entrepreneur_26_cumbre_austral",
  27: "brandbook_entrepreneur_27_orbita_films",
  28: "brandbook_entrepreneur_28_helios_solar",
  29: "brandbook_entrepreneur_29_dolce_gelato",
  30: "brandbook_entrepreneur_30_improbears_group"
};

console.log("=========================================================================");
console.log("INICIANDO GENERACIÓN EDITORIAL V81.0 (DIRECTIVA MAX C-00 · 30 MARCAS)");
console.log("=========================================================================");

const results = [];

for (let id = 1; id <= 30; id++) {
  const brand = brandsById[id];
  if (!brand) {
    console.warn(`[WARN] Marca con ID ${id} no encontrada en catálogo.`);
    continue;
  }

  const baseName = fileMap[id] || `brandbook_entrepreneur_${String(id).padStart(2, "0")}_${brand.slug}`;
  const htmlPath = path.join(outDir, `${baseName}.html`);
  const pdfPath = path.join(outDir, `${baseName}.pdf`);

  process.stdout.write(`[${String(id).padStart(2, "0")}/30] ${brand.name.padEnd(26)} -> Generando HTML y PDF... `);

  // 1. Generar HTML completo con el nuevo motor editorial v81
  const fullHtml = global.generateFullBrandbookDocHtml(brand);
  fs.writeFileSync(htmlPath, fullHtml, "utf8");

  // 2. Compilar PDF vectorial vía Google Chrome headless
  try {
    execSync(`"${chromeBin}" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file://${htmlPath}"`, { stdio: "ignore" });
    const stat = fs.statSync(pdfPath);
    const sizeMb = (stat.size / 1024 / 1024).toFixed(2);
    console.log(`OK (${sizeMb} MB)`);
    results.push({ id, name: brand.name, sizeMb, status: "OK" });
  } catch (err) {
    console.log(`ERROR (${err.message})`);
    results.push({ id, name: brand.name, error: err.message, status: "FAIL" });
  }
}

console.log("=========================================================================");
console.log(`GENERACIÓN COMPLETADA: ${results.filter(r => r.status === "OK").length}/30 marcas generadas con éxito.`);
console.log("=========================================================================");
