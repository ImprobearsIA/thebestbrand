import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

console.log('=====================================================================');
console.log('VERIFICACIÓN INTEGRAL: VIDEOS DE AGENCIA, VOZ GEMINI & TYPING SILENCIOSO');
console.log('=====================================================================');

// 1. Verificar archivos de video y poster en assets/videos/
const videosDir = path.join(root, 'apps', 'web', 'assets', 'videos');
const expectedVideos = [
  'capsula_teoria_paso_0.mp4',
  'capsula_teoria_paso_1.mp4',
  'capsula_teoria_paso_2.mp4',
  'capsula_teoria_paso_3.mp4',
  'capsula_teoria_paso_4.mp4',
  'capsula_teoria_paso_5.mp4',
  'capsula_teoria_paso_6.mp4',
  'capsula_teoria_aura_recorrido.mp4'
];

const expectedPosters = [
  'poster_paso_0.jpg',
  'poster_paso_1.jpg',
  'poster_paso_2.jpg',
  'poster_paso_3.jpg',
  'poster_paso_4.jpg',
  'poster_paso_5.jpg',
  'poster_paso_6.jpg',
  'poster_aura_recorrido.jpg'
];

console.log('\n1. Verificando integridad de videos MP4 y posters:');
for (const v of expectedVideos) {
  const vp = path.join(videosDir, v);
  if (!fs.existsSync(vp)) {
    throw new Error(`Video faltante: ${v}`);
  }
  const stat = fs.statSync(vp);
  if (stat.size < 500000) {
    throw new Error(`Video corrupto o demasiado pequeño: ${v} (${stat.size} bytes)`);
  }
  console.log(`  ✓ ${v}: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
}

for (const p of expectedPosters) {
  const pp = path.join(videosDir, p);
  if (!fs.existsSync(pp)) {
    throw new Error(`Poster faltante: ${p}`);
  }
  const stat = fs.statSync(pp);
  console.log(`  ✓ ${p}: ${(stat.size / 1024).toFixed(1)} KB`);
}

// 2. Verificar manifest
const manifestPath = path.join(videosDir, 'capsules_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log(`\n2. Manifest validado: ${manifest.length} temas configurados.`);
for (const item of manifest) {
  console.log(`  - Paso ${item.step}: ${item.duration_sec}s (${item.size_kb} KB)`);
}

// 3. Verificar código fuente studio.html
console.log('\n3. Verificando código fuente en apps/web/studio.html:');
const studioHtml = fs.readFileSync(path.join(root, 'apps', 'web', 'studio.html'), 'utf8');

// Comprobar que NO haya triggerAuraEmpatheticFeedback prematuro en oninput
const prematureInputs = [
  'tbbUpdateBrandNameFromInput',
  'tbbUpdateBusinessTypeFromInput',
  'tbbSaveStep1Answer',
  'tbbUpdateStep4SeedIdea'
];

for (const fn of prematureInputs) {
  const fnRegex = new RegExp(`window\\.${fn}\\s*=\\s*function[\\s\\S]*?\\n\\s*\\};`, 'm');
  const match = studioHtml.match(fnRegex);
  if (match) {
    const fnBody = match[0];
    if (fnBody.includes('triggerAuraEmpatheticFeedback(')) {
      throw new Error(`Violación de UX: ${fn} aún contiene triggerAuraEmpatheticFeedback prematuro en oninput.`);
    } else {
      console.log(`  ✓ ${fn}: silencioso durante el tecleo (sin interrupciones prematuras).`);
    }
  }
}

// Comprobar proxy en fetch interceptor
if (!studioHtml.includes('pathOnly.indexOf("/api/v1/gemini/proxy") === 0')) {
  throw new Error('El interceptor de fetch en studio.html no tiene soporte para /api/v1/gemini/proxy');
}
console.log('  ✓ studio.html maneja /api/v1/gemini/proxy con clave de respaldo en cliente.');

// 4. Verificar tbb-multilingual-gemini-voice.js
console.log('\n4. Verificando motor de voz en apps/web/tbb-multilingual-gemini-voice.js:');
const voiceJs = fs.readFileSync(path.join(root, 'apps', 'web', 'tbb-multilingual-gemini-voice.js'), 'utf8');

if (!voiceJs.includes('AIzaSyByQl8lrqiK5R4d')) {
  throw new Error('tbb-multilingual-gemini-voice.js no tiene la clave de respaldo de Gemini');
}
console.log('  ✓ Clave de respaldo Gemini neural activa.');

if (!voiceJs.includes('gemini-2.5-flash-preview-tts')) {
  throw new Error('Modelo gemini-2.5-flash-preview-tts no configurado en GEMINI_TTS_MODELS');
}
console.log('  ✓ gemini-2.5-flash-preview-tts configurado como modelo primario de síntesis de voz.');

console.log('\nTODAS LAS PRUEBAS DE VERIFICACIÓN PASARON AL 100%.');
