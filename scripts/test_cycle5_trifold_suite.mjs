import fs from "fs";
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
require("../apps/web/tbb-generative-brandbook-engine.js");

console.log("=== GAUNTLET CICLO 5: CERTIFICACIÓN TERNA TRI-FOLD & CALADO NEGATIVO ===");

let passed = 0;
const brandsToTest = [global.CATALOG_30_MAP["the_best_brand"], ...ENTREPRENEURS_30];

for (const b of brandsToTest) {
  const suite = global.generateTriFoldLogoSuite(b);
  const hasH = suite.horizontal && suite.horizontal.includes("<svg") && suite.horizontal.includes("viewBox=\"0 0 460 120\"");
  const hasA = suite.avatar && suite.avatar.includes("<svg") && suite.avatar.includes("viewBox=\"0 0 200 200\"");
  const hasS = suite.seal && suite.seal.includes("<svg") && suite.seal.includes("textPath");
  
  // Calado check: negative version must not have solid white rectangle covering the background
  const hasMuddyWhiteBoxInNeg = suite.horizontalNeg && suite.horizontalNeg.includes("<rect width=\"460\" height=\"120\" fill=\"#FFFFFF\"");

  if (hasH && hasA && hasS && !hasMuddyWhiteBoxInNeg) {
    passed++;
  } else {
    console.error(`FAIL en ${b.name}: hasH=${hasH}, hasA=${hasA}, hasS=${hasS}, muddyWhite=${hasMuddyWhiteBoxInNeg}`);
  }
}

console.log(`✓ ${passed}/${brandsToTest.length} Marcas certificadas con la Terna Tri-Fold (Horizontal, Avatar 1:1, Sello textPath y Calado Limpio).`);
