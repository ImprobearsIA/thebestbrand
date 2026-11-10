const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=== INICIANDO AUDITORÍA CRÍTICA: RESPETO ABSOLUTO DEL LOGO SUBIDO ===");

// 1. Mock minimal DOM and global environment
global.window = global;
global.document = {
  createElement: () => ({
    getContext: () => ({
      clearRect: () => {},
      drawImage: () => {},
      getImageData: () => ({ data: new Uint8ClampedArray(1024 * 1024 * 4) })
    }),
    setAttribute: () => {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    innerHTML: ""
  }),
  body: { setAttribute: () => {} },
  documentElement: { setAttribute: () => {} },
  getElementById: () => null
};
global.localStorage = {
  _store: {},
  getItem: (k) => global.localStorage._store[k] || null,
  setItem: (k, v) => { global.localStorage._store[k] = String(v); },
  removeItem: (k) => { delete global.localStorage._store[k]; }
};

// 2. Extraer y evaluar las funciones críticas de studio.html
const studioHtml = fs.readFileSync(path.join(__dirname, '../apps/web/studio.html'), 'utf8');

// Extraer synthesizeSystemicSymbol180
const synthMatch = studioHtml.match(/window\.synthesizeSystemicSymbol180\s*=\s*function\s*\([^\)]*\)\s*\{([\s\S]*?)\n\s*\};\s*\n\s*\/\//);
if (!synthMatch) {
  throw new Error("No se pudo extraer synthesizeSystemicSymbol180 de studio.html");
}
eval("window.synthesizeSystemicSymbol180 = function(uid) {" + synthMatch[1] + "};");

// Mock CATALOG_30_MAP
window.CATALOG_30_MAP = {
  the_best_brand: {
    name: "The Best Brand",
    slug: "the_best_brand",
    svgCore: "<g id='hardcoded_cat_wings'></g>",
    svgCoreNeg: "<g id='hardcoded_cat_wings_neg'></g>",
    colors: { pri: "#0D2540", sec: "#426EAE" }
  },
  maison_levain: {
    name: "Maison Levain",
    slug: "maison_levain",
    svgCore: "<g id='hardcoded_maison_wheat'></g>",
    svgCoreNeg: "<g id='hardcoded_maison_wheat_neg'></g>",
    colors: { pri: "#78350F", sec: "#D97706" }
  }
};

// Test 1: Usuario con marca "The Best Brand" y SIN logo subido
window.canvasState = { brandName: "The Best Brand" };
window.tbbState = { logoIterationIndex: 1, logoIterations: [] };
window.step0State = {};

let defaultSymbol = window.synthesizeSystemicSymbol180("test1");
assert(defaultSymbol.includes("tbbWingBlue"), "TEST 1 FALLIDO: Si no sube logo, The Best Brand debe tener las alas TB");
console.log("✓ TEST 1 PASADO: Marca por defecto sin logo subido muestra alas TB");

// Test 2: Usuario sube SVG propio a "The Best Brand"
const userCustomSvg = '<svg viewBox="0 0 200 200" width="160" height="160" x="10" y="10"><circle cx="100" cy="100" r="80" fill="#FF0000"/><text x="100" y="100">MI LOGO REAL</text></svg>';
window.canvasState = {
  brandName: "The Best Brand",
  uploaded_logo_svg_markup: userCustomSvg
};
window.step0State = {
  uploadedLogoSvgMarkup: userCustomSvg,
  existingLogoMode: "keep"
};
window.tbbState = {
  logoIterationIndex: 1,
  logoIterations: [{
    idx: 1,
    isUploadedUserLogo: true,
    uploadedLogoSvgMarkup: userCustomSvg,
    archetype: "uploaded_user_logo"
  }]
};

let uploadedSymbol = window.synthesizeSystemicSymbol180("test2");
assert(!uploadedSymbol.includes("tbbWingBlue"), "TEST 2 FALLIDO: El logo subido fue reemplazado por alas TB!");
assert(!uploadedSymbol.includes("apple_liquid_wings"), "TEST 2 FALLIDO: El logo subido fue reemplazado por apple_liquid_wings!");
assert(uploadedSymbol.includes("MI LOGO REAL"), "TEST 2 FALLIDO: El símbolo no contiene el SVG del usuario!");
console.log("✓ TEST 2 PASADO: Logo SVG subido en 'The Best Brand' tiene prioridad absoluta (sin alas TB inventadas)");

// Test 3: Usuario sube imagen raster (PNG base64)
const samplePngDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
window.canvasState = {
  brandName: "The Best Brand",
  uploaded_logo_data_url: samplePngDataUrl
};
window.step0State = {
  uploadedLogoDataUrl: samplePngDataUrl,
  existingLogoMode: "keep"
};
window.tbbState = {
  logoIterationIndex: 1,
  logoIterations: [{
    idx: 1,
    isUploadedUserLogo: true,
    uploadedLogoDataUrl: samplePngDataUrl,
    archetype: "uploaded_user_logo"
  }]
};

let rasterSymbol = window.synthesizeSystemicSymbol180("test3");
assert(!rasterSymbol.includes("tbbWingBlue"), "TEST 3 FALLIDO: El logo PNG subido fue reemplazado por alas TB!");
assert(rasterSymbol.includes(samplePngDataUrl), "TEST 3 FALLIDO: El símbolo no contiene el PNG dataUrl del usuario!");
assert(rasterSymbol.includes('xlink:href="data:image/png;base64,'), "TEST 3 FALLIDO: El elemento <image> debe tener xlink:href para máxima compatibilidad!");
console.log("✓ TEST 3 PASADO: Logo PNG subido tiene prioridad absoluta y preserva xlink:href");

// Test 4: Evaluar buildActiveBrandProfileForV80 en universal-brandbook-30-engine.js
const universalEngineJs = fs.readFileSync(path.join(__dirname, '../apps/web/universal-brandbook-30-engine.js'), 'utf8');
const buildMatchUniv = universalEngineJs.match(/window\.buildActiveBrandProfileForV80\s*=\s*function\s*\([^\)]*\)\s*\{([\s\S]*?)\n\s*\};\s*\n\s*\/\//);
if (!buildMatchUniv) {
  throw new Error("No se pudo extraer buildActiveBrandProfileForV80 de universal-brandbook-30-engine.js");
}
eval("window.getActiveCanvasState = function() { return window.canvasState; };");
eval("window.extractColorsFromLogoState = function() { return { pri: '#123456', sec: '#654321' }; };");
eval("window.toCaladoNegativeSvg = function(s) { return s; };");
eval("global.hexToPantone = function(h, i) { return 'Pantone ' + i; };");
eval("global.hexToCmyk = function(h) { return 'C:0 M:0 Y:0 K:0'; };");
eval("global.buildSystemicSymbolPair = function() { return { pos: '', neg: '' }; };");
eval("window.buildActiveBrandProfileForV80_univ = function() {" + buildMatchUniv[1] + "};");

// Con logo subido en marca del catálogo (maison_levain)
window.canvasState = {
  brandName: "Maison Levain",
  uploaded_logo_svg_markup: userCustomSvg
};
window.step0State = {
  uploadedLogoSvgMarkup: userCustomSvg,
  existingLogoMode: "keep"
};
window.tbbState = {
  logoIterationIndex: 1,
  logoIterations: [{
    idx: 1,
    isUploadedUserLogo: true,
    uploadedLogoSvgMarkup: userCustomSvg,
    archetype: "uploaded_user_logo"
  }]
};

const profUniv = window.buildActiveBrandProfileForV80_univ();
assert(!profUniv.svgCore.includes("hardcoded_maison_wheat"), "TEST 4 FALLIDO: El catálogo sobreescribió el logo subido en universal engine!");
assert(profUniv.svgCore.includes("MI LOGO REAL"), "TEST 4 FALLIDO: svgCore no contiene el SVG del usuario!");
assert(profUniv.isEstablished === true, "TEST 4 FALLIDO: isEstablished debe ser true!");
console.log("✓ TEST 4 PASADO: universal-brandbook-30-engine respeta el logo subido incluso en marcas del catálogo");

// Test 5: Evaluar buildActiveBrandProfileForV80 en tbb-generative-brandbook-engine.js
const genEngineJs = fs.readFileSync(path.join(__dirname, '../apps/web/tbb-generative-brandbook-engine.js'), 'utf8');
const buildMatchGen = genEngineJs.match(/window\.buildActiveBrandProfileForV80\s*=\s*function\s*\([^\)]*\)\s*\{([\s\S]*?)\n\s*\};\s*\n\s*\/\//);
if (!buildMatchGen) {
  throw new Error("No se pudo extraer buildActiveBrandProfileForV80 de tbb-generative-brandbook-engine.js");
}
eval("window.buildActiveBrandProfileForV80_gen = function() {" + buildMatchGen[1] + "};");

const profGen = window.buildActiveBrandProfileForV80_gen();
assert(!profGen.svgCore.includes("hardcoded_maison_wheat"), "TEST 5 FALLIDO: El catálogo sobreescribió el logo subido en generative engine!");
assert(profGen.svgCore.includes("MI LOGO REAL"), "TEST 5 FALLIDO: svgCore no contiene el SVG del usuario en generative engine!");
console.log("✓ TEST 5 PASADO: tbb-generative-brandbook-engine respeta el logo subido con prioridad absoluta");

// Test 6: Evaluar motor generativo completo + inyección de estilos Step 6 + 30 láminas reales + no atajo estático PDF
const headStyles = {};
global.document.head = {
  appendChild: (el) => { if (el.id) headStyles[el.id] = el; }
};
global.document.getElementById = (id) => headStyles[id] || null;
eval(genEngineJs);

window.canvasState = {
  brandName: "The Best Brand",
  custom_business_type: "Tostaduría artesanal de café de especialidad en Chiapas",
  golden_circle: "Honrar a los caficultores mexicanos con trazabilidad pura.",
  uploaded_logo_data_url: samplePngDataUrl
};
window.step0State = {
  uploadedLogoDataUrl: samplePngDataUrl,
  existingLogoMode: "keep"
};
window.tbbState = {
  logoIterationIndex: 1,
  logoIterations: [{
    idx: 1,
    isUploadedUserLogo: true,
    uploadedLogoDataUrl: samplePngDataUrl,
    archetype: "uploaded_user_logo"
  }]
};

const step6Markup = window.renderUniversalImproBearsGuideSinglePlateHTML(11, false);
assert(headStyles["tbb-inapp-brandbook-styles"] && headStyles["tbb-inapp-brandbook-styles"].textContent.includes(".tbb-plate"), "TEST 6 FALLIDO: No se inyectaron los estilos #tbb-inapp-brandbook-styles en document.head!");
assert(step6Markup.includes("tbb-improbears-stage-scaler") && step6Markup.includes('class="tbb-plate"'), "TEST 6 FALLIDO: La lámina de Paso 6 no está envuelta en el escalador con clase .tbb-plate!");
console.log("✓ TEST 6 PASADO: Paso 6 inyecta CSS editorial y renderiza láminas A4 estilizadas (cero HTML crudo)");

const fullBrand = window.buildActiveBrandProfileForV80();
const plates30 = window.generateBrandbook30Plates(fullBrand);
assert(plates30.length === 30, "TEST 7 FALLIDO: No se generaron exactamente 30 láminas!");
assert(plates30[0].includes("Tostaduría artesanal de café de especialidad en Chiapas"), "TEST 7 FALLIDO: El catálogo estático de The Best Brand secuestró los textos del usuario!");
assert(plates30[0].includes(samplePngDataUrl) && plates30[12].includes(samplePngDataUrl) && plates30[17].includes(samplePngDataUrl) && plates30[24].includes(samplePngDataUrl), "TEST 7 FALLIDO: El logotipo PNG subido no está incrustado en las láminas 01, 13, 18 y 25!");
console.log("✓ TEST 7 PASADO: Las 30 láminas usan los textos reales del usuario e incrustan su logo subido en todas las vistas");

assert(!universalEngineJs.includes('fetch("/brandbooks/Manual_Marca_30_Laminas_TheBestBrand_Oficial_v80.pdf")'), "TEST 8 FALLIDO: Aún existe el atajo instantáneo al PDF estático sin logo de usuario!");
assert(typeof window.compileLive30PlatesBrandbookPdfBlob === "function", "TEST 8 FALLIDO: compileLive30PlatesBrandbookPdfBlob no está exportado!");
console.log("✓ TEST 8 PASADO: Exportación PDF compila las 30 hojas reales y eliminó el atajo instantáneo estático");

console.log("\n=======================================================");
console.log(" TODOS LOS TESTS DE AUDITORÍA PASARON EXITOSAMENTE (8/8)");
console.log(" EL LOGOTIPO SUBIDO Y EL GENERADOR DE 30 HOJAS ESTÁN BLINDADOS");
console.log("=======================================================");
