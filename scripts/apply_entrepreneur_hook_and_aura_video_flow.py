#!/usr/bin/env python3
"""
Aplica la nueva arquitectura de producto de The Best Brand:
1. Gancho arriba: Titular y propuesta de valor enfocados en resolver el dolor del empresario (agencias caras/lentas vs control total en minutos).
2. Video de Aura: Sección 2 justo después del gancho, mostrando a Aura y explicando el recorrido completo con la nueva cápsula maestra.
3. Demo interactiva: Sección 3 justo después del video, para que el usuario comience de inmediato con los Pasos 1 y 2.
4. Entregables y 30 Láminas: Secciones 4 y 5.
5. Eliminación total de banners de métodos de pago en el Hero y en Precios (el pago solo se selecciona discretamente en el modal de checkout).
6. Botón de compra flotante discreto pero a la mano en todo momento.
"""

import re

with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    text = f.read()

# ------------------------------------------------------------------------------
# 1. ACTUALIZAR VIDEO_CAPSULES PARA INCLUIR LA CÁPSULA MAESTRA DE AURA
# ------------------------------------------------------------------------------
old_video_capsules = """  const VIDEO_CAPSULES = [
    {
      step: 0,
      title: "Paso 0: Objetivo, Capital de Marca y Giro",
      author: "David Aaker & Sagi Haviv",
      quote: "«Proteger el capital visual de tu marca define su valor antes de trazar un solo vector.»",
      url: "/assets/videos/capsula_teoria_paso_0.mp4",
      duration: "00:49"
    },"""

new_video_capsules = """  const VIDEO_CAPSULES = [
    {
      step: "master",
      title: "Recorrido Completo: Cómo Aura Construye tu Marca en 7 Pasos",
      author: "Aura · Mentora de Marca con IA",
      quote: "«The Best Brand te da el control total: de tu propósito al manual oficial de 30 láminas en minutos.»",
      url: "/assets/videos/capsula_teoria_aura_recorrido.mp4",
      duration: "02:48"
    },
    {
      step: 0,
      title: "Paso 0: Objetivo, Capital de Marca y Giro",
      author: "Aura · Punto de Partida",
      quote: "«Proteger el capital visual de tu marca define su valor antes de trazar un solo vector.»",
      url: "/assets/videos/capsula_teoria_paso_0.mp4",
      duration: "00:49"
    },"""

text = text.replace(old_video_capsules, new_video_capsules)

# ------------------------------------------------------------------------------
# 2. ACTUALIZAR I18N EN ESPAÑOL Y OTROS IDIOMAS PARA EL NUEVO GANCHO Y NAVEGACIÓN
# ------------------------------------------------------------------------------
old_i18n_es_hero = """      navPlates: "30 Láminas en Vivo",
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
      heroCtaBuy: "Adquirir Licencia Pro · $49 USD",
      plateExplorerTag: "EXPLORADOR INTERACTIVO · MANUAL OFICIAL DE 30 LÁMINAS",
      plateExplorerTitle: "Un manual estructurado de 30 láminas listo para tu empresa",
      plateExplorerSub: "Arquitectura oficial de marca única: propósito, puntos de contacto clave, aplicaciones gráficas y normas de uso.",
      deliverablesTag: "ENTREGABLES REALES EN CURVAS · LISTOS PARA OPERAR",
      deliverablesTitle: "Tu identidad en el mundo real: Packaging, papelería y fachadas",
      deliverablesSub: "Cada activo se entrega en curvas vectoriales puras y especificaciones de imprenta offset CMYK y Pantone.",
      videoSectionTag: "VIDEO TEATRO Y MASTERCLASS INTERACTIVA",
      videoSectionTitle: "7 Pasos guiados para construir una marca sólida y memorable",
      videoSectionSub: "Aura te explica cada fase con claridad y concisión, respaldada por principios probados de estrategia y diseño.",
      demoSectionTag: "TALLER INTERACTIVO EN VIVO · PÁGINA 1 DE TU MARCA",
      demoSectionTitle: "Experimenta la plataforma ahora mismo: Pasos 1 y 2 gratis",
      demoSectionSub: "Escribe tu propósito, evalúa tu promesa y mapea tus puntos de contacto antes, durante y después.",
      demoStep1Tab: "Paso 1 · Círculo Dorado y Propósito",
      demoStep2Tab: "Paso 2 · Puntos de Contacto",
      goldenCircleTitle: "EL CÍRCULO DORADO"
    };"""

new_i18n_es_hero = """      navPlates: "30 Láminas",
      navMasterclass: "Recorrido con Aura",
      navDeliverables: "Entregables",
      navDemo: "Demo en Vivo",
      navPricing: "Precios",
      navOpenApp: "Estudio Completo",
      buyNowSticky: "Comprar Ahora · $49 USD",
      buyNowShort: "Comprar · $49",
      webDemoShort: "Demo en Vivo",
      heroBadge: "¿CANSADO DE AGENCIAS QUE TARDAN MESES Y COBRAN FORTUNAS? · DEL CAOS AL SISTEMA",
      heroTitle1: "Deja de perder tiempo y dinero con agencias de diseño.",
      heroTitleAccent: "Crea tu marca oficial y tu manual de 30 láminas en minutos con Aura.",
      heroDesc: "Contratar una agencia tradicional cuesta entre $2,000 y $8,000 dólares, tarda semanas de reuniones y suele terminar en un simple logotipo sin estrategia ni archivos en curvas para imprenta. The Best Brand resuelve tu identidad de raíz: Aura, tu mentora de marca con inteligencia artificial y voz en tiempo real, te guía por 7 pasos estratégicos para construir una identidad de clase mundial y generar tu Manual Oficial de 30 Láminas en Curvas listo para operar, imprimir y registrar hoy mismo.",
      heroCtaDemo: "Comenzar Demo en Vivo (Paso 1) →",
      heroCtaVideo: "Ver el Recorrido con Aura (Video) ↓",
      heroCtaBuy: "Comprar Licencia Pro · $49 USD",
      videoSectionTag: "CONOCE A AURA · INTELIGENCIA ARTIFICIAL PARA TU IDENTIDAD DE MARCA",
      videoSectionTitle: "Mira cómo Aura guía el recorrido completo de tu marca",
      videoSectionSub: "Un recorrido cinematográfico de 7 pasos: desde la definición de tu giro y propósito hasta tu Manual Oficial de 30 Láminas en Curvas listo para imprenta.",
      demoSectionTag: "TALLER INTERACTIVO EN VIVO · PÁGINA 1 DE TU MARCA",
      demoSectionTitle: "Comienza ahora mismo: define tu Círculo Dorado y Touchpoints",
      demoSectionSub: "Escribe el nombre de tu empresa, tu giro y tu propósito. Observa cómo Aura corrige ortografía y estilo, y proyecta tu Círculo Dorado en tiempo real.",
      demoStep1Tab: "Paso 1 · Círculo Dorado y Propósito",
      demoStep2Tab: "Paso 2 · Puntos de Contacto",
      goldenCircleTitle: "EL CÍRCULO DORADO",
      plateExplorerTag: "ESPECIFICACIÓN TÉCNICA · BRANDBOOK 1.0 OFICIAL",
      plateExplorerTitle: "Un manual estructurado de 30 láminas listo para imprenta",
      plateExplorerSub: "Sistema oficial de marca única: propósito, puntos de contacto clave, aplicaciones gráficas y normas de uso.",
      deliverablesTag: "ENTREGABLES REALES EN CURVAS · LISTOS PARA OPERAR",
      deliverablesTitle: "Tu identidad en el mundo real: Packaging, papelería y fachadas",
      deliverablesSub: "Cada activo se entrega en curvas vectoriales puras y especificaciones de imprenta offset CMYK y Pantone.",
      pricingTag: "LICENCIA OFICIAL · ACCESO DE POR VIDA SIN SUSCRIPCIONES",
      pricingTitle: "Adquiere The Best Brand y descarga tus 30 Láminas Oficiales",
      pricingSub: "Activación instantánea para ti o para tu agencia. Un solo pago, sin mensualidades.",
      goldenCircleTitle: "EL CÍRCULO DORADO"""

text = text.replace(old_i18n_es_hero, new_i18n_es_hero)

# ------------------------------------------------------------------------------
# 3. ACTUALIZAR NAVBAR DESKTOP MONOFILA CON EL NUEVO ORDEN DE NAVEGACIÓN
# ------------------------------------------------------------------------------
old_nav_desktop = """        <!-- Navegación Desktop Monofila -->
        <nav class="tbb-desktop-nav-links" aria-label="Navegación Principal">
          <a href="#tbbCommPlateExplorerSection" class="tbb-nav-light-link">
            <span>${t("navPlates")}</span>
          </a>
          <a href="#tbbCommDeliverablesSection" class="tbb-nav-light-link">
            <span>${t("navDeliverables")}</span>
          </a>
          <a href="#tbbCommVideoSection" class="tbb-nav-light-link">
            <span>${t("navMasterclass")}</span>
          </a>
          <a href="#tbbCommLiveDemoSection" class="tbb-nav-light-link" style="color:#090D16 !important; font-weight:800;">
            <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block; margin-right:4px;"></span>
            <span>${t("navDemo")}</span>
          </a>
          <a href="#tbbCommPricingSection" class="tbb-nav-light-link">
            <span>${t("navPricing")}</span>
          </a>
        </nav>"""

new_nav_desktop = """        <!-- Navegación Desktop Monofila (Nuevo Orden de Valor) -->
        <nav class="tbb-desktop-nav-links" aria-label="Navegación Principal">
          <a href="#tbbCommVideoSection" class="tbb-nav-light-link">
            <span style="width:6px; height:6px; border-radius:50%; background:#1D4ED8; display:inline-block; margin-right:4px;"></span>
            <span>${t("navMasterclass")}</span>
          </a>
          <a href="#tbbCommLiveDemoSection" class="tbb-nav-light-link" style="color:#090D16 !important; font-weight:800;">
            <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block; margin-right:4px;"></span>
            <span>${t("navDemo")}</span>
          </a>
          <a href="#tbbCommPlateExplorerSection" class="tbb-nav-light-link">
            <span>${t("navPlates")}</span>
          </a>
          <a href="#tbbCommDeliverablesSection" class="tbb-nav-light-link">
            <span>${t("navDeliverables")}</span>
          </a>
          <a href="#tbbCommPricingSection" class="tbb-nav-light-link">
            <span>${t("navPricing")}</span>
          </a>
        </nav>"""

text = text.replace(old_nav_desktop, new_nav_desktop)

# ------------------------------------------------------------------------------
# 4. ACTUALIZAR EL HERO: ELIMINAR LOS BANNERS DE PAGO Y COLOCAR CTAS PRECISOS
# ------------------------------------------------------------------------------
old_hero_ctas_and_payments = """            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px;">
              <button type="button" class="tbb-comm-btn-black" onclick="const el=document.getElementById('tbbCommLiveDemoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.94rem; padding:13px 24px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>${t("heroCtaDemo")}</span>
              </button>
              <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.94rem; padding:13px 24px;">
                <span>${t("heroCtaBuy")}</span>
              </button>
            </div>

            <!-- Métodos de Pago Oficiales -->
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding-top:4px;">
              <span style="font-size:0.72rem; font-weight:800; color:#64748B;">Checkout instantáneo:</span>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'card')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">Tarjeta Visa / MC / Amex</button>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'apple_pay')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">Apple Pay</button>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'google_pay')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">Google Pay</button>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'paypal')" style="background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; border-radius:8px; padding:4px 10px; font-size:0.71rem; font-weight:800; cursor:pointer;">PayPal</button>
            </div>"""

new_hero_ctas_and_payments = """            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:8px;">
              <button type="button" class="tbb-comm-btn-black" onclick="const el=document.getElementById('tbbCommVideoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.94rem; padding:13px 24px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#1D4ED8; display:inline-block;"></span>
                <span>${t("heroCtaVideo") || "Ver el Recorrido con Aura (Video) ↓"}</span>
              </button>
              <button type="button" class="tbb-comm-btn-white" onclick="const el=document.getElementById('tbbCommLiveDemoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.94rem; padding:13px 24px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>${t("heroCtaDemo")}</span>
              </button>
              <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.94rem; padding:13px 20px;">
                <span>${t("heroCtaBuy")}</span>
              </button>
            </div>"""

text = text.replace(old_hero_ctas_and_payments, new_hero_ctas_and_payments)

# ------------------------------------------------------------------------------
# 5. ACTUALIZAR CAPÍTULOS DE VIDEO PARA QUE INCLUYAN LA CÁPSULA MAESTRA
# ------------------------------------------------------------------------------
old_video_tabs_markup = """          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:6px;">
            ${VIDEO_CAPSULES.map((c, idx) => `
              <button type="button" id="tbbVidTab_${idx}" class="tbb-tab-light-surface ${idx === st.activeVideoStep ? 'is-active' : ''}" onclick="window.tbbSelectMasterclassChapter(${idx})" style="flex-shrink:0; font-size:0.78rem; padding:9px 14px;">
                <span>Capítulo ${c.step} · ${c.title.split(':')[0]}</span>
              </button>
            `).join("")}
          </div>"""

new_video_tabs_markup = """          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:6px;">
            ${VIDEO_CAPSULES.map((c, idx) => `
              <button type="button" id="tbbVidTab_${idx}" class="tbb-tab-light-surface ${idx === st.activeVideoStep ? 'is-active' : ''}" onclick="window.tbbSelectMasterclassChapter(${idx})" style="flex-shrink:0; font-size:0.78rem; padding:9px 14px;">
                <span>${idx === 0 ? "★ " + c.title.split(':')[0] : "Paso " + c.step + " · " + c.title.split(':')[0]}</span>
              </button>
            `).join("")}
          </div>"""

text = text.replace(old_video_tabs_markup, new_video_tabs_markup)

# Y en selectMasterclassChapter:
text = text.replace(
    "const s = Math.max(0, Math.min(6, Number(stepIdx || 0)));",
    "const s = Math.max(0, Math.min(VIDEO_CAPSULES.length - 1, Number(stepIdx || 0)));"
)
text = text.replace(
    "for (let i = 0; i <= 6; i++) {",
    "for (let i = 0; i < VIDEO_CAPSULES.length; i++) {"
)

# ------------------------------------------------------------------------------
# 6. REORDENAR LAS SECCIONES EN tbbBuildCommercialExperienceMarkup
# ORDEN SOLICITADO:
# 1. Hero (#tbbCommHeroSection)
# 2. Ticker
# 3. Video de Aura (#tbbCommVideoSection)
# 4. Demo en Vivo (#tbbCommLiveDemoSection)
# 5. Explorador 30 Láminas (#tbbCommPlateExplorerSection)
# 6. Bento Grid Entregables (#tbbCommDeliverablesSection)
# 7. Autoridad ImproBears (#tbbCommAuthoritySection)
# 8. Precios (#tbbCommPricingSection)
# ------------------------------------------------------------------------------

# Extraer el bloque del video
vid_match = re.search(r'(<!-- =+ -->\s*<!-- \d+\. VIDEO TEATRO[\s\S]*?<\/section>)', text)
demo_match = re.search(r'(<!-- =+ -->\s*<!-- \d+\. DEMO INTERACTIVA[\s\S]*?<\/section>)', text)
plates_match = re.search(r'(<!-- =+ -->\s*<!-- \d+\. EXPLORADOR INTERACTIVO[\s\S]*?<\/section>)', text)
bento_match = re.search(r'(<!-- =+ -->\s*<!-- \d+\. BENTO GRID[\s\S]*?<\/section>)', text)
auth_match = re.search(r'(<!-- =+ -->\s*<!-- \d+\. SECCIÓN DE AUTORIDAD[\s\S]*?<\/section>)', text)
pricing_match = re.search(r'(<!-- =+ -->\s*<!-- \d+\. SECCIÓN DE PLANES[\s\S]*?<\/section>)', text)

print("Matches found:")
print("  Video:", bool(vid_match))
print("  Demo:", bool(demo_match))
print("  Plates:", bool(plates_match))
print("  Bento:", bool(bento_match))
print("  Auth:", bool(auth_match))
print("  Pricing:", bool(pricing_match))

if vid_match and demo_match and plates_match and bento_match and auth_match and pricing_match:
    # Vamos a reescribir el ensamblado de las secciones
    # Buscamos dónde termina el Ticker Marquee
    ticker_end = text.find('<!-- TICKER MARQUEE CONTINUO DE INGENIERÍA DE MARCA -->')
    ticker_close = text.find('</div>\n      </div>', ticker_end) + len('</div>\n      </div>')
    
    prefix = text[:ticker_close]
    
    # Encontrar dónde termina la sección de pricing
    pricing_end = text.find('</section>', text.find('id="tbbCommPricingSection"')) + len('</section>')
    suffix = text[pricing_end:]
    
    new_sections_order = f"""

      <!-- ===================================================================== -->
      <!-- 2. VIDEO DE AURA: RECORRIDO COMPLETO DE LA IDENTIDAD DE TU MARCA      -->
      <!-- ===================================================================== -->
{vid_match.group(1)}

      <!-- ===================================================================== -->
      <!-- 3. TALLER INTERACTIVO EN VIVO: COMIENZA AHORA MISMO TU MARCA (PÁG 1)  -->
      <!-- ===================================================================== -->
{demo_match.group(1)}

      <!-- ===================================================================== -->
      <!-- 4. EXPLORADOR INTERACTIVO EN VIVO DE LAS 30 LÁMINAS DEL BRANDBOOK 1.0 -->
      <!-- ===================================================================== -->
{plates_match.group(1)}

      <!-- ===================================================================== -->
      <!-- 5. BENTO GRID DE ENTREGABLES REALES CON SELLO OFICIAL BRANDBOOK 1.0   -->
      <!-- ===================================================================== -->
{bento_match.group(1)}

      <!-- ===================================================================== -->
      <!-- 6. SECCIÓN DE AUTORIDAD METODOLÓGICA (IMPROBEARS & JORGE BENÍTEZ)    -->
      <!-- ===================================================================== -->
{auth_match.group(1)}

      <!-- ===================================================================== -->
      <!-- 7. SECCIÓN DE PLANES Y PRECIOS TRANSPARENTES (SIN BANNERS DE PAGO)   -->
      <!-- ===================================================================== -->
{pricing_match.group(1)}"""

    text = prefix + new_sections_order + suffix
    print("  [OK] Reordered sections: Hero -> Ticker -> Video -> Demo -> Plates -> Bento -> Auth -> Pricing")
else:
    print("  [WARN] Could not find all section matches for reordering")

# ------------------------------------------------------------------------------
# 7. ELIMINAR BANNERS PROMOCIONALES DE PAGO EN LA SECCIÓN DE PRECIOS
# ------------------------------------------------------------------------------
# Eliminar las grillas de 3 botones de Apple Pay, Google Pay y PayPal debajo de los botones de precio
old_plan1_sub_btns = """                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'apple_pay')" style="background:#000000; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'google_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'paypal')" style="background:#FFC439; color:#003087; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>"""

new_plan1_sub_btns = """                <div style="font-size:0.76rem; font-weight:600; color:#64748B; text-align:center; padding-top:2px;">
                  Pago seguro instantáneo · Activación inmediata
                </div>"""

text = text.replace(old_plan1_sub_btns, new_plan1_sub_btns)

old_plan2_sub_btns = """                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'apple_pay')" style="background:#000000; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'google_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'paypal')" style="background:#FFC439; color:#003087; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>"""

new_plan2_sub_btns = """                <div style="font-size:0.76rem; font-weight:600; color:#64748B; text-align:center; padding-top:2px;">
                  Licencia comercial para entrega ilimitada a clientes
                </div>"""

text = text.replace(old_plan2_sub_btns, new_plan2_sub_btns)

# ------------------------------------------------------------------------------
# 8. BOTÓN DE COMPRA FLOTANTE DISCRETO PERO A LA MANO EN TODO MOMENTO
# ------------------------------------------------------------------------------
old_float_bar_div = """      floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
        <span style="font-size:0.76rem; font-weight:800; color:#090D16; white-space:nowrap;">THE BEST BRAND <span style="color:#64748B; font-weight:600;">1.0</span></span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
        <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
        <span>${isLicensed ? t("licenseActiveBadge") : t("buyNowSticky")}</span>
      </button>
    `;"""

new_float_bar_div = """      floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:9px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG(24)}
        <span style="font-size:0.78rem; font-weight:900; color:#090D16; white-space:nowrap; letter-spacing:-0.01em;">THE BEST BRAND</span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" aria-label="Comprar Ahora" style="padding:8px 16px; font-size:0.80rem;">
        <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
        <span>${isLicensed ? t("licenseActiveBadge") : "Comprar Ahora · $49 USD"}</span>
      </button>
    `;"""

text = text.replace(old_float_bar_div, new_float_bar_div)

with open("apps/web/tbb-commercial-experience-and-payments.js", "w", encoding="utf-8") as f:
    f.write(text)

print("[SUCCESS] apps/web/tbb-commercial-experience-and-payments.js updated with new flow and video.")
