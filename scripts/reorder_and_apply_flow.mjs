import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("apps/web/tbb-commercial-experience-and-payments.js");
let code = fs.readFileSync(FILE_PATH, "utf-8");

console.log("[1/6] Actualizando VIDEO_CAPSULES con Cápsula Maestra de Aura...");

// 1. Agregar la Cápsula Maestra a VIDEO_CAPSULES
const oldCapsuleLead = `  const VIDEO_CAPSULES = [
    {
      step: 0,
      title: "Paso 0: Objetivo, Capital de Marca y Giro",`;

const newCapsuleLead = `  const VIDEO_CAPSULES = [
    {
      step: "master",
      title: "Recorrido Completo: Cómo Aura Construye tu Marca en 7 Pasos",
      author: "Aura · Mentora de Marca con IA",
      quote: "«The Best Brand te da el control total: de tu propósito nuclear al Manual Oficial de 30 Láminas en Curvas listo para imprenta en minutos.»",
      url: "/assets/videos/capsula_teoria_aura_recorrido.mp4",
      duration: "02:48"
    },
    {
      step: 0,
      title: "Paso 0: Objetivo, Capital de Marca y Giro",`;

if (code.includes(oldCapsuleLead)) {
  code = code.replace(oldCapsuleLead, newCapsuleLead);
  console.log("  [OK] VIDEO_CAPSULES actualizada con la Cápsula Maestra.");
} else if (code.includes('url: "/assets/videos/capsula_teoria_aura_recorrido.mp4"')) {
  console.log("  [SKIP] VIDEO_CAPSULES ya incluía la Cápsula Maestra.");
} else {
  console.warn("  [WARN] No se encontró el bloque exacto de VIDEO_CAPSULES.");
}

console.log("[2/6] Actualizando textos del Hero y navegación en i18n...");

// 2. Actualizar i18n en español para el Hero enfocado en el dolor del empresario
const oldEsHeroSection = `      navPlates: "30 Láminas",
      navMasterclass: "Video Masterclass",
      navDeliverables: "Entregables",
      navDemo: "Demo Pasos 1 y 2",
      navPricing: "Planes y Licencias",
      navOpenApp: "Estudio Completo",
      buyNowSticky: "Comprar App · $49 USD",
      buyNowShort: "Comprar · $49",
      webDemoShort: "Demo Pasos 1 y 2",
      heroBadge: "SISTEMA OFICIAL DE IDENTIDAD · EDICIÓN 1.0 · PAGO ÚNICO $49 USD",
      heroTitle1: "Crea la Identidad y el Manual Oficial de tu Empresa",
      heroTitleAccent: "con Aura en Tiempo Real.",
      heroDesc: "La forma más rápida y profesional de diseñar tu logotipo vectorial, definir tu propósito y descargar un manual de 30 láminas listo para imprenta, registro y medios digitales. Vive los Pasos 1 y 2 gratis directamente en esta página.",
      heroCtaDemo: "Vivir Demo Interactiva (Pasos 1 y 2)",
      heroCtaBuy: "Adquirir Licencia Pro · $49 USD",`;

const newEsHeroSection = `      navPlates: "30 Láminas",
      navMasterclass: "Recorrido con Aura",
      navDeliverables: "Entregables",
      navDemo: "Demo en Vivo",
      navPricing: "Precios",
      navOpenApp: "Estudio Completo",
      buyNowSticky: "Comprar Ahora · $49 USD",
      buyNowShort: "Comprar · $49",
      webDemoShort: "Demo en Vivo",
      heroBadge: "¿CANSADO DE AGENCIAS QUE TARDAN MESES Y COBRAN FORTUNAS? · SOLUCIÓN INMEDIATA",
      heroTitle1: "Deja de perder tiempo y dinero con agencias de diseño.",
      heroTitleAccent: "Crea tu marca oficial y tu manual de 30 láminas en minutos con Aura.",
      heroDesc: "Las agencias cobran entre $2,000 y $8,000 dólares, tardan semanas y te entregan simples PNGs sin estrategia ni curvas para imprenta. The Best Brand te da el control total: Aura, tu mentora con inteligencia artificial y voz en tiempo real, te guía por 7 pasos estratégicos para construir una identidad de clase mundial y generar tu Manual Oficial de 30 Láminas en Curvas listo hoy mismo.",
      heroCtaVideo: "Ver el Recorrido con Aura (Video) ↓",
      heroCtaDemo: "Comenzar Demo en Vivo (Pasos 1 y 2) →",
      heroCtaBuy: "Comprar Licencia Pro · $49 USD",`;

if (code.includes(oldEsHeroSection)) {
  code = code.replace(oldEsHeroSection, newEsHeroSection);
  console.log("  [OK] i18n español actualizado con nuevo gancho del dolor.");
} else {
  console.log("  [INFO] Verificando i18n...");
}

// 3. Actualizar navegación Desktop en el header
const oldNavDesktop = `        <!-- Navegación Desktop Monofila -->
        <nav class="tbb-desktop-nav-links" aria-label="Navegación Principal">
          <a href="#tbbCommPlateExplorerSection" class="tbb-nav-light-link">
            <span>\${t("navPlates")}</span>
          </a>
          <a href="#tbbCommDeliverablesSection" class="tbb-nav-light-link">
            <span>\${t("navDeliverables")}</span>
          </a>
          <a href="#tbbCommVideoSection" class="tbb-nav-light-link">
            <span>\${t("navMasterclass")}</span>
          </a>
          <a href="#tbbCommLiveDemoSection" class="tbb-nav-light-link" style="color:#090D16 !important; font-weight:800;">
            <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block; margin-right:4px;"></span>
            <span>\${t("navDemo")}</span>
          </a>
          <a href="#tbbCommPricingSection" class="tbb-nav-light-link">
            <span>\${t("navPricing")}</span>
          </a>
        </nav>`;

const newNavDesktop = `        <!-- Navegación Desktop Monofila (Orden Cronológico de Valor) -->
        <nav class="tbb-desktop-nav-links" aria-label="Navegación Principal">
          <a href="#tbbCommVideoSection" class="tbb-nav-light-link">
            <span style="width:6px; height:6px; border-radius:50%; background:#1D4ED8; display:inline-block; margin-right:4px;"></span>
            <span>\${t("navMasterclass") || "Recorrido con Aura"}</span>
          </a>
          <a href="#tbbCommLiveDemoSection" class="tbb-nav-light-link" style="color:#090D16 !important; font-weight:800;">
            <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block; margin-right:4px;"></span>
            <span>\${t("navDemo") || "Demo en Vivo"}</span>
          </a>
          <a href="#tbbCommPlateExplorerSection" class="tbb-nav-light-link">
            <span>\${t("navPlates")}</span>
          </a>
          <a href="#tbbCommDeliverablesSection" class="tbb-nav-light-link">
            <span>\${t("navDeliverables")}</span>
          </a>
          <a href="#tbbCommPricingSection" class="tbb-nav-light-link">
            <span>\${t("navPricing")}</span>
          </a>
        </nav>`;

if (code.includes(oldNavDesktop)) {
  code = code.replace(oldNavDesktop, newNavDesktop);
  console.log("  [OK] Navegación Desktop monofila actualizada.");
}

// 4. Actualizar botones del Hero: eliminar banners de pago, colocar CTAs exactos
const oldHeroActions = `            <!-- Botones de Acción del Hero -->
            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px;">
              <button type="button" class="tbb-comm-btn-black" onclick="const el=document.getElementById('tbbCommLiveDemoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.94rem; padding:13px 24px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>\${t("heroCtaDemo")}</span>
              </button>
              <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.94rem; padding:13px 24px;">
                <span>\${t("heroCtaBuy")}</span>
              </button>
            </div>

            <!-- Métodos de Pago Oficiales -->
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding-top:4px;">
              <span style="font-size:0.72rem; font-weight:800; color:#64748B;">Checkout instantáneo:</span>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'card')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">Tarjeta Visa / MC / Amex</button>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'apple_pay')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">Apple Pay</button>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'google_pay')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">Google Pay</button>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'paypal')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">PayPal</button>
            </div>`;

const newHeroActions = `            <!-- Botones de Acción del Hero (Enfocados al Recorrido y la Acción) -->
            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:8px;">
              <button type="button" class="tbb-comm-btn-black" onclick="const el=document.getElementById('tbbCommVideoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.94rem; padding:13px 24px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#1D4ED8; display:inline-block;"></span>
                <span>\${t("heroCtaVideo") || "Ver el Recorrido con Aura (Video) ↓"}</span>
              </button>
              <button type="button" class="tbb-comm-btn-white" onclick="const el=document.getElementById('tbbCommLiveDemoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.94rem; padding:13px 24px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>\${t("heroCtaDemo") || "Comenzar Demo en Vivo →"}</span>
              </button>
              <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.94rem; padding:13px 22px;">
                <span>\${t("heroCtaBuy") || "Comprar Licencia Pro · $49 USD"}</span>
              </button>
            </div>`;

if (code.includes(oldHeroActions)) {
  code = code.replace(oldHeroActions, newHeroActions);
  console.log("  [OK] Hero actualizado: banners de pago eliminados y CTAs optimizados.");
}

// 5. Actualizar botones de los capítulos de video
const oldVideoTabsMap = `          <!-- Pestañas de Capítulos -->
          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:6px;">
            \${VIDEO_CAPSULES.map((c, idx) => \`
              <button type="button" id="tbbVidTab_\${idx}" class="tbb-tab-light-surface \${idx === st.activeVideoStep ? 'is-active' : ''}" onclick="window.tbbSelectMasterclassChapter(\${idx})" style="flex-shrink:0; font-size:0.78rem; padding:9px 14px;">
                <span>Capítulo \${c.step} · \${c.title.split(':')[0]}</span>
              </button>
            \`).join("")}
          </div>`;

const newVideoTabsMap = `          <!-- Pestañas de Capítulos de Video (Cápsula Maestra + Pasos 0 al 6) -->
          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:6px;">
            \${VIDEO_CAPSULES.map((c, idx) => \`
              <button type="button" id="tbbVidTab_\${idx}" class="tbb-tab-light-surface \${idx === st.activeVideoStep ? 'is-active' : ''}" onclick="window.tbbSelectMasterclassChapter(\${idx})" style="flex-shrink:0; font-size:0.78rem; padding:9px 14px;">
                <span>\${c.step === 'master' ? '★ Recorrido Completo con Aura (02:48)' : 'Paso ' + c.step + ' · ' + c.title.split(':')[0]}</span>
              </button>
            \`).join("")}
          </div>`;

if (code.includes(oldVideoTabsMap)) {
  code = code.replace(oldVideoTabsMap, newVideoTabsMap);
  console.log("  [OK] Pestañas de capítulos de video actualizadas.");
}

code = code.replace(
  "const s = Math.max(0, Math.min(6, Number(stepIdx || 0)));",
  "const s = Math.max(0, Math.min(VIDEO_CAPSULES.length - 1, Number(stepIdx || 0)));"
);
code = code.replace(
  "for (let i = 0; i <= 6; i++) {",
  "for (let i = 0; i < VIDEO_CAPSULES.length; i++) {"
);

console.log("[3/6] Eliminando banners de pasarelas de pago de la Sección de Precios...");

// 6. Eliminar botones de pago en las tarjetas de precios
const oldPlan1Payments = `                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'apple_pay')" style="background:#000000; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'google_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'paypal')" style="background:#FFC439; color:#003087; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>`;

const newPlan1Payments = `                <div style="font-size:0.76rem; font-weight:600; color:#64748B; text-align:center; padding-top:2px;">
                  Pago seguro instantáneo · Activación inmediata con Tarjeta, Apple Pay, Google Pay o PayPal en el checkout
                </div>`;

if (code.includes(oldPlan1Payments)) {
  code = code.replace(oldPlan1Payments, newPlan1Payments);
  console.log("  [OK] Banners de pago eliminados del Plan Pro.");
}

const oldPlan2Payments = `                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'apple_pay')" style="background:#000000; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'google_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'paypal')" style="background:#FFC439; color:#003087; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>`;

const newPlan2Payments = `                <div style="font-size:0.76rem; font-weight:600; color:#64748B; text-align:center; padding-top:2px;">
                  Licencia comercial para entrega ilimitada a clientes · Activación multi-marca inmediata
                </div>`;

if (code.includes(oldPlan2Payments)) {
  code = code.replace(oldPlan2Payments, newPlan2Payments);
  console.log("  [OK] Banners de pago eliminados del Plan Atelier.");
}

console.log("[4/6] Reordenando Secciones según la estructura requerida...");

// 7. Extraer secciones y reordenar
function extractSection(markup, secId) {
  const marker = `id="${secId}"`;
  const pos = markup.indexOf(marker);
  if (pos === -1) throw new Error(`No se encontró la sección ${secId}`);
  const start = markup.lastIndexOf("<section", pos);
  const end = markup.indexOf("</section>", pos) + "</section>".length;
  return { start, end, html: markup.substring(start, end) };
}

const heroSec = extractSection(code, "tbbCommHeroSection");
const platesSec = extractSection(code, "tbbCommPlateExplorerSection");
const bentoSec = extractSection(code, "tbbCommDeliverablesSection");
const videoSec = extractSection(code, "tbbCommVideoSection");
const demoSec = extractSection(code, "tbbCommLiveDemoSection");
const authSec = extractSection(code, "tbbCommAuthoritySection");
const pricingSec = extractSection(code, "tbbCommPricingSection");

// Extraer el Ticker Marquee entre hero y la siguiente sección
const tickerStart = code.indexOf("<!-- TICKER MARQUEE CONTINUO DE INGENIERÍA DE MARCA -->", heroSec.end);
const tickerEnd = code.indexOf("</div>\n      </div>", tickerStart) + "</div>\n      </div>".length;
const tickerHtml = code.substring(tickerStart, tickerEnd);

// Prefijo antes de las secciones en tbbBuildCommercialExperienceMarkup
const prefix = code.substring(0, heroSec.start);
// Sufijo después de pricingSec
const suffix = code.substring(pricingSec.end);

// Construir nuevo orden:
// 1. Hero
// 2. Ticker
// 3. Video de Aura (2º elemento principal)
// 4. Demo Interactiva en Vivo (3º elemento principal)
// 5. Explorador 30 Láminas
// 6. Bento Grid Entregables
// 7. Autoridad Metodológica
// 8. Precios
const reorderedSections = `${heroSec.html}

      ${tickerHtml}

      <!-- ===================================================================== -->
      <!-- 2. VIDEO DE AURA: RECORRIDO COMPLETO DE LA IDENTIDAD DE TU MARCA      -->
      <!-- ===================================================================== -->
      ${videoSec.html}

      <!-- ===================================================================== -->
      <!-- 3. TALLER INTERACTIVO EN VIVO: COMIENZA AHORA MISMO TU MARCA (PÁG 1)  -->
      <!-- ===================================================================== -->
      ${demoSec.html}

      <!-- ===================================================================== -->
      <!-- 4. EXPLORADOR INTERACTIVO EN VIVO DE LAS 30 LÁMINAS DEL BRANDBOOK 1.0 -->
      <!-- ===================================================================== -->
      ${platesSec.html}

      <!-- ===================================================================== -->
      <!-- 5. BENTO GRID DE ENTREGABLES REALES CON SELLO OFICIAL BRANDBOOK 1.0   -->
      <!-- ===================================================================== -->
      ${bentoSec.html}

      <!-- ===================================================================== -->
      <!-- 6. SECCIÓN DE AUTORIDAD METODOLÓGICA (IMPROBEARS & JORGE BENÍTEZ)    -->
      <!-- ===================================================================== -->
      ${authSec.html}

      <!-- ===================================================================== -->
      <!-- 7. SECCIÓN DE PLANES Y PRECIOS TRANSPARENTES (SIN BANNERS DE PAGO)   -->
      <!-- ===================================================================== -->
      ${pricingSec.html}`;

code = prefix + reorderedSections + suffix;
console.log("  [OK] Secciones reordenadas: Hero -> Ticker -> Video -> Demo -> Plates -> Bento -> Auth -> Pricing.");

console.log("[5/6] Asegurando botón flotante discreto de compra...");
const oldFloatBar = `      floatBar.innerHTML = \`
      <div style="display:flex; align-items:center; gap:8px;">
        \${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
        <span style="font-size:0.76rem; font-weight:800; color:#090D16; white-space:nowrap;">THE BEST BRAND <span style="color:#64748B; font-weight:600;">1.0</span></span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
        <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
        <span>\${isLicensed ? t("licenseActiveBadge") : t("buyNowSticky")}</span>
      </button>
    \`;`;

const newFloatBar = `      floatBar.innerHTML = \`
      <div style="display:flex; align-items:center; gap:8px;">
        \${window.tbbBuildOfficialBrandbook1EmblemSVG(24)}
        <span style="font-size:0.78rem; font-weight:900; color:#090D16; white-space:nowrap;">THE BEST BRAND</span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" aria-label="Comprar Ahora" style="padding:8px 16px; font-size:0.80rem;">
        <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
        <span>\${isLicensed ? t("licenseActiveBadge") : "Comprar Ahora · $49 USD"}</span>
      </button>
    \`;`;

if (code.includes(oldFloatBar)) {
  code = code.replace(oldFloatBar, newFloatBar);
  console.log("  [OK] Botón flotante actualizado.");
}

console.log("[6/6] Guardando cambios en apps/web/tbb-commercial-experience-and-payments.js...");
fs.writeFileSync(FILE_PATH, code, "utf-8");
console.log("[ÉXITO TOTAL] Archivo actualizado correctamente.");
