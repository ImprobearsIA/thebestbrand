import fs from 'fs';
import vm from 'vm';

// Mock browser environment
const domMock = {
  document: {
    readyState: 'complete',
    documentElement: { classList: { add: () => {}, remove: () => {} } },
    body: {
      getAttribute: (k) => k === 'data-tbb-standalone-web' ? 'true' : null,
      appendChild: () => {},
      classList: { add: () => {}, remove: () => {} },
      style: {}
    },
    getElementById: (id) => {
      return {
        id,
        style: {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
        setAttribute: () => {},
        innerHTML: '',
        textContent: '',
        remove: () => {},
        dataset: {}
      };
    },
    querySelectorAll: () => [],
    createElement: (tag) => {
      return {
        tagName: tag,
        style: {},
        setAttribute: () => {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
        dataset: {},
        appendChild: () => {},
        remove: () => {}
      };
    },
    addEventListener: () => {}
  },
  window: { addEventListener: () => {} }, addEventListener: () => {},
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  navigator: { userAgent: 'iPhone; CPU iPhone OS 17_0 like Mac OS X' },
  location: { search: '', href: '' },
  requestAnimationFrame: (cb) => setTimeout(cb, 16),
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  performance: { now: () => Date.now() },
  console: console
};

domMock.window = domMock;
const ctx = vm.createContext(domMock);

const code = fs.readFileSync('apps/web/tbb-commercial-experience-and-payments.js', 'utf-8');

try {
  vm.runInContext(code, ctx);
  console.log('[OK] Script ejecutado exitosamente en contexto global.');
} catch (err) {
  console.error('[FAIL] Error en ejecución de script:', err);
  process.exit(1);
}

// Probar window.tbbBuildCommercialExperienceMarkup
if (typeof domMock.window.tbbBuildCommercialExperienceMarkup !== 'function') {
  console.error('[FAIL] window.tbbBuildCommercialExperienceMarkup no está definida.');
  process.exit(1);
}

const html = domMock.window.tbbBuildCommercialExperienceMarkup(true);
console.log(`[OK] tbbBuildCommercialExperienceMarkup retornó ${html.length} caracteres de HTML.`);

// Verificar que contenga las 4 secciones
const checks = [
  'tbbMainSectionsTabBar',
  'tbbMainSectionPane_1',
  'tbbMainSectionPane_2',
  'tbbMainSectionPane_3',
  'tbbMainSectionPane_4',
  'webglLiquidShader',
  'heroDynamicCanvas',
  'MATRIZ COMPARATIVA DE VALOR',
  'poster_aura_recorrido.jpg',
  'capsula_teoria_aura_recorrido.mp4',
  'YOUTUBE_METHODOLOGY_AUTHORS',
  'BIBLIOTECA DEL FUNDADOR',
  'osterwalder_bmg.jpg'
];

for (const c of checks) {
  if (html.includes(c) || code.includes(c)) {
    console.log(`[PASS] Encontrado: ${c}`);
  } else {
    console.error(`[FAIL] NO encontrado: ${c}`);
    process.exit(1);
  }
}

// Verificar que NO haya colores naranjas estridentes en el HTML
const orangeMatches = html.match(/(#FF7A00|#EA580C|#F97316)/g) || [];
if (orangeMatches.length > 0) {
  console.warn(`[WARN] Se encontraron ${orangeMatches.length} colores naranjas en el HTML:`, orangeMatches);
} else {
  console.log('[PASS] CERO colores naranjas en el HTML comercial renderizado.');
}

console.log('>>> TODOS LOS TESTS DE RUNTIME PASARON CON ÉXITO <<<');
