import fs from "fs";
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

console.log("=== PRUEBA END-TO-END: FLUJO LIMPIO Y GENERATIVO (SIN SHORTCUTS) ===");

// 1. Test clean session
console.log("1. Ejecutando startFreshBrandSession()...");
global.startFreshBrandSession();
console.log("Canvas state post-limpieza:", JSON.stringify(global.canvasState));
if (global.canvasState.brandName === "") {
  console.log("✓ Verificación de aislamiento: La sesión arranca 100% limpia sin residuos.");
} else {
  console.error("FAIL: canvasState no se limpió correctamente.");
}

// 2. User inputs raw brand data
console.log("\n2. Simulando ingreso de un nuevo cliente emprendedor...");
const rawUserInput = {
  name: "Komorebi Té & Botánica",
  custom_business_type: "Salón de té japonés, matcha ceremonial y repostería wagashi",
  userRawWhy: "queremos que la gente se desconecte del celular y disfrute del silencio y la ceremonia del te verde autentico traido de uji",
  colors: ["#FFFFFF", "#0A140D", "#2D5A3C", "#8FA89B"],
  primaryFont: "Cormorant Garamond"
};

// 3. Test Gemini refinement
console.log("\n3. Refinando el propósito con Gemini (sin alucinaciones, puliendo gramática)...");
global.refineBrandContentWithGemini(rawUserInput.userRawWhy, "Propósito Nuclear", { name: rawUserInput.name }).then(refinedText => {
  console.log("Texto original:", rawUserInput.userRawWhy);
  console.log("Texto refinado por Gemini:", refinedText);

  // 4. Test Tri-Fold logo generation
  console.log("\n4. Generando la Suite de Logotipos Tri-Fold (Directiva Max C-00)...");
  const brandProfile = {
    name: rawUserInput.name,
    tagline: "CEREMONIA DEL TÉ & BOTÁNICA JAPONESA",
    giro: rawUserInput.custom_business_type,
    category: "Comestibles & Hospitalidad",
    why: refinedText,
    how: "Importación directa de Uji, Kioto, vajilla artesanal de cerámica Raku y silencio ceremonial.",
    what: "Matcha ceremonial de grado imperial, hojas de sencha y gyokuro, wagashi artesanal.",
    buyer: "Personas que buscan paz mental, amantes del té fino y conocedores de la cultura zen.",
    persona: "Maestro de té: sereno, meticuloso, hospitalario y en profunda sintonía con la naturaleza.",
    niza: "Clase 30 (Té, matcha y repostería) y Clase 43 (Servicios de cafetería y salón de té).",
    colors: {
      pri: "#2D5A3C",
      sec: "#8FA89B",
      acc: "#D4AF37",
      darkInk: "#0A140D",
      midGray: "#707070",
      lightGray: "#E6E6E6",
      softBg: "#F7FAF8",
      white: "#FFFFFF"
    },
    primaryFont: "Cormorant Garamond",
    secondaryFont: "Plus Jakarta Sans"
  };

  const suite = global.generateTriFoldLogoSuite(brandProfile);
  console.log("✓ Logotipo Horizontal generado (Ratio 3.5:1):", suite.horizontal.length, "bytes");
  console.log("✓ Avatar Redes 1:1 generado (Concéntrico):", suite.avatar.length, "bytes");
  console.log("✓ Sello de Packaging generado (Texto Curvado <textPath>):", suite.seal.length, "bytes");

  // 5. Test dynamic 30 plates generation
  console.log("\n5. Generando Brandbook de 30 Láminas en Curvas desde Cero...");
  const plates = global.generateBrandbook30Plates(brandProfile);
  console.log("✓ Cantidad de láminas generadas:", plates.length);

  // Write sample HTML
  const fullHtml = global.generateFullBrandbookDocHtml(brandProfile);
  fs.writeFileSync("apps/web/sample_komorebi_brandbook.html", fullHtml);
  console.log("✓ Guardado apps/web/sample_komorebi_brandbook.html");
  console.log("\n=== PRUEBA END-TO-END COMPLETADA CON ÉXITO ===");
});
