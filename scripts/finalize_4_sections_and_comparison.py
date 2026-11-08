#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Aplica la nueva arquitectura de 4 secciones y comparativa gráfica de valor:
1. Reemplaza tbbBuildOfficialBrandbook1EmblemSVG con la roseta armónica exacta de 6 órbitas (12 lóbulos) en azul eléctrico (#4C9DE6) y centro ámbar resplandeciente.
2. Reemplaza tbbBuildCommercialExperienceMarkup para estructurar la página en 4 Secciones principales independientes (sin scroll infinito):
   - Sección 1: El Gancho (Titular “Crea tu Marca de manera profesional, ¡en minutos!” + Gráfico Comparativo 3 Columnas: Agencias vs The Best Brand vs Apps).
   - Sección 2: Demo en Vivo (Pasos 1 y 2 con Círculo Dorado Simon Sinek 100% circular + Touchpoints + Corrector ortográfico).
   - Sección 3: Oferta y Entregables (Manual de Marca de 30 Hojas + Mockups + Precios $49 / $149 sin banners de pago).
   - Sección 4: Videos Educativos (Aura Full HD 1080p + Videoteca de YouTube con Simon Sinek, Sagi Haviv, Marty Neumeier, Donald Miller y David Aaker).
3. Sustituye '30 láminas' por 'Manual de Marca de 30 Hojas' en todo el documento.
"""

with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    code = f.read()

# ------------------------------------------------------------------------------
# 1. ACTUALIZAR EMBLEMA OFICIAL SVG
# ------------------------------------------------------------------------------
start_emb = code.find("window.tbbBuildOfficialBrandbook1EmblemSVG = function (size = 120) {")
end_emb = code.find("// Parte un texto en 2 líneas equilibradas", start_emb)

new_emblem_code = """window.tbbBuildOfficialBrandbook1EmblemSVG = function (size = 120) {
    const uid = Math.random().toString(36).slice(2, 7);
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:block; flex-shrink:0;">
        <defs>
          <radialGradient id="tbbLogoBase_${uid}" cx="50%" cy="46%" r="54%">
            <stop offset="0%" stop-color="#091A2E"/>
            <stop offset="65%" stop-color="#040D18"/>
            <stop offset="100%" stop-color="#02070D"/>
          </radialGradient>
          <radialGradient id="tbbLogoAmberGlow_${uid}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="18%" stop-color="#FFB347"/>
            <stop offset="38%" stop-color="#FF7A00"/>
            <stop offset="68%" stop-color="#EA580C" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#091A2E" stop-opacity="0"/>
          </radialGradient>
          <filter id="tbbLogoShadow_${uid}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#001830" flood-opacity="0.35"/>
          </filter>
        </defs>
        <!-- Sombra y Base Circular Negra/Navy de Lujo (Brandbook 1.0 Oficial) -->
        <circle cx="100" cy="100" r="82" fill="url(#tbbLogoBase_${uid})" stroke="#0D2540" stroke-width="2.5" filter="url(#tbbLogoShadow_${uid})"/>
        <!-- Resplandor Cálido Central -->
        <circle cx="100" cy="100" r="54" fill="url(#tbbLogoAmberGlow_${uid})"/>
        <!-- Roseta Cuántica de 6 Órbitas / Pétalos en Azul Eléctrico (#4C9DE6) rotadas a 30° -->
        <g transform="translate(100,100)">
          <ellipse rx="46" ry="18" fill="none" stroke="#4C9DE6" stroke-width="2" opacity="0.88"/>
          <ellipse rx="46" ry="18" transform="rotate(30)" fill="none" stroke="#4C9DE6" stroke-width="2" opacity="0.88"/>
          <ellipse rx="46" ry="18" transform="rotate(60)" fill="none" stroke="#4C9DE6" stroke-width="2" opacity="0.88"/>
          <ellipse rx="46" ry="18" transform="rotate(90)" fill="none" stroke="#4C9DE6" stroke-width="2" opacity="0.88"/>
          <ellipse rx="46" ry="18" transform="rotate(120)" fill="none" stroke="#4C9DE6" stroke-width="2" opacity="0.88"/>
          <ellipse rx="46" ry="18" transform="rotate(150)" fill="none" stroke="#4C9DE6" stroke-width="2" opacity="0.88"/>
          <!-- Núcleo Central Ámbar / Blanco -->
          <circle cx="0" cy="0" r="11" fill="#FF7A00" stroke="#FFD8A8" stroke-width="2.5"/>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
        </g>
      </svg>
    `;
  };

  """

if start_emb != -1 and end_emb != -1:
    code = code[:start_emb] + new_emblem_code + code[end_emb:]
    print("[OK] Emblema oficial SVG actualizado con roseta armónica de 6 órbitas.")
else:
    print("[WARN] No se encontró el bloque del emblema.")

# ------------------------------------------------------------------------------
# 2. ACTUALIZAR EL MOTOR DE RENDERIZADO DE LAS 4 SECCIONES
# ------------------------------------------------------------------------------
start_markup = code.find("window.tbbBuildCommercialExperienceMarkup = function (isStandalonePage) {")
end_markup = code.find("window.tbbRefreshCommercialPortalDOM = function () {", start_markup)

new_markup_engine = """window.tbbBuildCommercialExperienceMarkup = function (isStandalonePage) {
    syncDemoStateFromAppIfAvailable();
    const st = window.tbbCommercialDemoState;
    if (!st.activeMainSection) st.activeMainSection = 1;
    const curLang = getLang();
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    const activeCapsule = VIDEO_CAPSULES[st.activeVideoStep] || VIDEO_CAPSULES[0];

    const tpCatalog = {
      before: [
        "Búsqueda Web y App Store",
        "Demostración Interactiva en Línea (Pasos 1 y 2)",
        "Recomendación Directa de Empresarios",
        "Contenido Ejecutivo en LinkedIn / Instagram",
        "Presentación / Portafolio Corporativo"
      ],
      during: [
        "Taller Guiado por Voz con Aura",
        "Lienzo Generativo de Logotipo en Tiempo Real",
        "Checkout Directo con Apple Pay, Google Pay y Tarjeta",
        "Sesión de Diagnóstico de Identidad",
        "Selección de Tipografía y Paleta Cromática"
      ],
      after: [
        "Entrega de Manual de Marca de 30 Hojas en PDF y HTML",
        "Actualizaciones Multilingües en la Nube",
        "Programa de Lealtad y Expansión de Marca",
        "Seguimiento de Satisfacción Post-Entrega",
        "Certificado Oficial de Registro y Vectores SVG"
      ]
    };

    return `
      <!-- ===================================================================== -->
      <!-- BARRA DE NAVEGACIÓN SUPERIOR FIJA MONOFILA CON SELECTOR DE 4 SECCIONES -->
      <!-- ===================================================================== -->
      <header class="tbb-awwwards-nav">
        <a href="#section1" onclick="window.tbbSwitchMainSection(1); return false;" style="display:flex; align-items:center; gap:11px; text-decoration:none; min-width:0;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG(40)}
          <div style="min-width:0;">
            <div style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:0.96rem; font-weight:900; color:#090D16; letter-spacing:-0.02em; line-height:1.1; white-space:nowrap;">
              THE BEST BRAND <span class="tbb-brand-inline-tagline" style="color:#64748B; font-size:0.68rem; font-weight:700;">YOUR BRAND, NOW!!!</span>
            </div>
            <div class="tbb-brand-subtag" style="font-family:'JetBrains Mono', monospace; font-size:0.54rem; font-weight:800; color:#64748B; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:250px;">
              ${t("brandTag")}
            </div>
          </div>
        </a>

        <!-- Navegación de 4 Secciones Principales (Sin Scroll Infinito) -->
        <nav class="tbb-desktop-nav-links" aria-label="Secciones de la Plataforma">
          <button type="button" id="tbbMainSecTab_1" onclick="window.tbbSwitchMainSection(1)" class="tbb-tab-light-surface ${st.activeMainSection === 1 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span style="font-weight:800; color:#1D4ED8;">1.</span> El Gancho
          </button>
          <button type="button" id="tbbMainSecTab_2" onclick="window.tbbSwitchMainSection(2)" class="tbb-tab-light-surface ${st.activeMainSection === 2 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span style="font-weight:800; color:#FF7A00;">2.</span> Demo en Vivo
          </button>
          <button type="button" id="tbbMainSecTab_3" onclick="window.tbbSwitchMainSection(3)" class="tbb-tab-light-surface ${st.activeMainSection === 3 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span style="font-weight:800; color:#090D16;">3.</span> Oferta y Entregables
          </button>
          <button type="button" id="tbbMainSecTab_4" onclick="window.tbbSwitchMainSection(4)" class="tbb-tab-light-surface ${st.activeMainSection === 4 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span style="font-weight:800; color:#16A34A;">4.</span> Videos Educativos
          </button>
        </nav>

        <div style="display:flex; align-items:center; gap:8px;">
          <select id="tbbCommercialLangSelect" aria-label="Idioma" onchange="window.tbbChangeCommercialLanguage(this.value)" class="tbb-desktop-only-ctrl" style="height:34px; padding:0 10px; border-radius:999px; background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; font-family:'Plus Jakarta Sans', sans-serif; font-size:0.74rem; font-weight:800; cursor:pointer;">
            <option value="es" ${curLang === "es" ? "selected" : ""}>ES</option>
            <option value="en" ${curLang === "en" ? "selected" : ""}>EN</option>
            <option value="fr" ${curLang === "fr" ? "selected" : ""}>FR</option>
            <option value="pt" ${curLang === "pt" ? "selected" : ""}>PT</option>
            <option value="de" ${curLang === "de" ? "selected" : ""}>DE</option>
            <option value="it" ${curLang === "it" ? "selected" : ""}>IT</option>
          </select>

          <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:8px 16px; font-size:0.78rem;">
            <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
            <span>${t("buyNowShort")}</span>
          </button>

          <button type="button" class="tbb-mobile-only-burger" onclick="window.tbbToggleMobileDrawer(true)" aria-label="Abrir Menú">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="#090D16" stroke-width="2.5" fill="none"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      <!-- DRAWER MÓVIL PARA IPHONE -->
      <div id="tbbCommercialMobileDrawer" class="tbb-mobile-drawer">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div style="font-weight:900; font-size:0.92rem; color:#090D16;">SECCIONES</div>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false)" style="background:none; border:none; font-size:1.4rem; cursor:pointer; color:#090D16;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button type="button" onclick="window.tbbSwitchMainSection(1); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">1. El Gancho & Comparativa</button>
          <button type="button" onclick="window.tbbSwitchMainSection(2); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">2. Demo en Vivo (Pasos 1 y 2)</button>
          <button type="button" onclick="window.tbbSwitchMainSection(3); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">3. Oferta y Entregables (Manual 30 Hojas)</button>
          <button type="button" onclick="window.tbbSwitchMainSection(4); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">4. Videos Educativos (Aura & Autores)</button>
        </div>
        <div style="margin-top:20px; padding-top:14px; border-top:1px solid #E2E8F0;">
          <button type="button" class="tbb-comm-btn-black" onclick="window.tbbToggleMobileDrawer(false); window.tbbOpenBuyAppCheckoutModal('pro_atelier');" style="width:100%; padding:12px;">Comprar Ahora · $49 USD</button>
        </div>
      </div>
      <div id="tbbCommercialBackdrop" class="tbb-drawer-backdrop" onclick="window.tbbToggleMobileDrawer(false)"></div>

      <!-- ===================================================================== -->
      <!-- PANE 1: EL GANCHO & COMPARATIVA DE VALOR                             -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_1" style="display:${st.activeMainSection === 1 ? 'block' : 'none'};">
        <section id="tbbCommHeroSection" style="position:relative; padding:54px 24px 48px 24px; background:linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%); color:#090D16; overflow:hidden; border-bottom:1px solid #E2E8F0;">
          <div style="max-width:1160px; margin:0 auto;">
            <div class="tbb-comm-grid-2" style="align-items:center; gap:36px;">
              <!-- Columna Izquierda: El Gancho Sintético Directo -->
              <div class="tbb-apple-reveal is-visible" style="display:flex; flex-direction:column; gap:16px;">
                <div style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; border:1px solid #CBD5E1; border-radius:999px; padding:6px 14px; width:fit-content; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                  <span style="width:8px; height:8px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.70rem; font-weight:800; color:#090D16; letter-spacing:0.04em;">
                    ${t("heroBadge") || "¿CANSADO DE AGENCIAS QUE TARDAN MESES? · SOLUCIÓN INMEDIATA"}
                  </span>
                </div>

                <h1 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(2.10rem, 4.4vw, 3.40rem); font-weight:900; line-height:1.06; letter-spacing:-0.03em; color:#090D16; margin:0;">
                  Crea tu Marca de manera profesional,<br/>
                  <span style="color:#090D16; border-bottom:3.5px solid #FF7A00; padding-bottom:2px;">¡en minutos!</span>
                </h1>

                <p style="font-size:1.02rem; font-weight:500; color:#475569; line-height:1.55; margin:0; max-width:540px;">
                  Sin semanas de espera ni costos desmedidos. Aura, tu mentora con inteligencia artificial, te guía paso a paso para construir una identidad de clase mundial y generar tu Manual de Marca de 30 Hojas listo para operar hoy mismo.
                </p>

                <!-- CTAs Directos -->
                <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px;">
                  <button type="button" class="tbb-comm-btn-black" onclick="window.tbbSwitchMainSection(2)" style="font-size:0.94rem; padding:13px 24px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                    <span>Comenzar con la Demo en Vivo →</span>
                  </button>
                  <button type="button" class="tbb-comm-btn-white" onclick="window.tbbSwitchMainSection(4)" style="font-size:0.94rem; padding:13px 20px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#1D4ED8; display:inline-block;"></span>
                    <span>Ver Videos Educativos ↓</span>
                  </button>
                  <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.94rem; padding:13px 20px;">
                    <span>Comprar Pro · $49 USD</span>
                  </button>
                </div>
              </div>

              <!-- Columna Derecha: Portada Oficial del Manual de Marca de 30 Hojas (Sin Submarcas) -->
              <div class="tbb-apple-reveal is-visible" style="display:flex; flex-direction:column; gap:14px;">
                <div id="tbbCommHeroCoverWrapper">
                  ${window.tbbBuildBrandbook1CoverPreviewHTML()}
                </div>
              </div>
            </div>

            <!-- Gráfico Comparativo de 3 Columnas (Agencias vs The Best Brand vs Apps Genéricas) -->
            ${window.tbbBuildComparisonMatrixHTML()}
          </div>
        </section>
      </div>

      <!-- ===================================================================== -->
      <!-- PANE 2: DEMO INTERACTIVA EN VIVO (PASOS 1 Y 2)                        -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_2" style="display:${st.activeMainSection === 2 ? 'block' : 'none'};">
        <section id="tbbCommLiveDemoSection" style="padding:54px 24px 68px 24px; background:#F8FAFC; border-bottom:2px solid #CBD5E1;">
          <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:24px;">
            <div class="tbb-apple-reveal is-visible" style="display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap;">
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#FF7A00; letter-spacing:0.06em;">
                  TALLER INTERACTIVO EN VIVO · PÁGINA 1 DE TU MARCA
                </div>
                <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
                  Comienza ahora mismo: define tu Círculo Dorado y Touchpoints
                </h2>
                <p style="font-size:0.94rem; font-weight:500; color:#475569; margin:0; max-width:760px;">
                  Escribe tus ideas. Aura corrige ortografía y redacción ejecutiva en un clic y proyecta tu Círculo Dorado Simon Sinek 100% circular en tiempo real.
                </p>
              </div>

              <div style="display:flex; gap:8px;">
                <button type="button" class="tbb-tab-light-surface ${st.activeDemoStep === 1 ? 'is-active' : ''}" onclick="window.tbbSwitchCommercialDemoStep(1)" style="font-size:0.80rem; padding:10px 16px;">
                  Paso 1 · Círculo Dorado
                </button>
                <button type="button" class="tbb-tab-light-surface ${st.activeDemoStep === 2 ? 'is-active' : ''}" onclick="window.tbbSwitchCommercialDemoStep(2)" style="font-size:0.80rem; padding:10px 16px;">
                  Paso 2 · Touchpoints
                </button>
              </div>
            </div>

            <!-- Interfaz del Taller en Vivo -->
            <div class="tbb-comm-grid-2" style="gap:24px; align-items:start;">
              <!-- Columna Izquierda: Formulario Guiado con Corrector -->
              <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:22px; padding:24px; display:flex; flex-direction:column; gap:16px; box-shadow:0 16px 38px rgba(9,13,22,0.07);">
                ${st.activeDemoStep === 1 ? `
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                      <label style="display:block; font-size:0.76rem; font-weight:800; color:#090D16; margin-bottom:4px;">Nombre de tu Marca:</label>
                      <input type="text" id="tbbDemoBrandNameInput" value="${escHtml(st.brandName)}" oninput="window.tbbUpdateCommercialDemoField('brandName', this.value)" style="width:100%; height:44px; padding:0 12px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.88rem; font-weight:800; color:#090D16;" />
                    </div>
                    <div>
                      <label style="display:block; font-size:0.76rem; font-weight:800; color:#090D16; margin-bottom:4px;">Giro o Actividad Principal:</label>
                      <input type="text" id="tbbDemoGiroInput" value="${escHtml(st.businessGiro)}" oninput="window.tbbUpdateCommercialDemoField('businessGiro', this.value)" style="width:100%; height:44px; padding:0 12px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.88rem; font-weight:700; color:#090D16;" />
                    </div>
                  </div>

                  <div>
                    <label style="display:block; font-size:0.78rem; font-weight:900; color:#EA580C; margin-bottom:4px;">1. PROPÓSITO NUCLEAR (WHY · ¿Por qué existe tu marca?):</label>
                    <textarea id="tbbDemoWhyInput" rows="2" oninput="window.tbbUpdateCommercialDemoField('whyPurpose', this.value)" style="width:100%; min-height:64px; padding:10px 12px; border-radius:12px; border:2px solid #F97316; background:#FFF7ED; font-size:0.87rem; font-weight:700; color:#090D16; line-height:1.45; resize:vertical;">${escHtml(st.whyPurpose)}</textarea>
                  </div>

                  <div>
                    <label style="display:block; font-size:0.78rem; font-weight:900; color:#1D4ED8; margin-bottom:4px;">2. MÉTODO DIFERENCIADOR (HOW · ¿Cómo lo haces realidad?):</label>
                    <textarea id="tbbDemoHowInput" rows="2" oninput="window.tbbUpdateCommercialDemoField('howMethod', this.value)" style="width:100%; min-height:64px; padding:10px 12px; border-radius:12px; border:2px solid #93C5FD; background:#EFF6FF; font-size:0.87rem; font-weight:700; color:#090D16; line-height:1.45; resize:vertical;">${escHtml(st.howMethod)}</textarea>
                  </div>

                  <div>
                    <label style="display:block; font-size:0.78rem; font-weight:900; color:#090D16; margin-bottom:4px;">3. OFERTA DE VALOR (WHAT · ¿Qué entregas al cliente?):</label>
                    <textarea id="tbbDemoWhatInput" rows="2" oninput="window.tbbUpdateCommercialDemoField('whatOffer', this.value)" style="width:100%; min-height:64px; padding:10px 12px; border-radius:12px; border:2px solid #CBD5E1; background:#F8FAFC; font-size:0.87rem; font-weight:700; color:#090D16; line-height:1.45; resize:vertical;">${escHtml(st.whatOffer)}</textarea>
                  </div>

                  <div style="display:flex; gap:10px; flex-wrap:wrap; padding-top:4px;">
                    <button type="button" class="tbb-btn-light-surface" onclick="window.tbbPolishCommercialDemoStep1()" style="flex:1; padding:12px 14px; font-size:0.82rem;">
                      <span>Mejorar redacción y corregir ortografía</span>
                    </button>
                    <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbSwitchCommercialDemoStep(2)" style="flex:1.15; padding:12px 16px; font-size:0.84rem;">
                      <span>Guardar Paso 1 y Pasar a Touchpoints (Paso 2) →</span>
                    </button>
                  </div>
                ` : `
                  <!-- PASO 2: TOUCHPOINTS -->
                  ${["before", "during", "after"].map((phaseKey, pIdx) => {
                    const phaseTitle = pIdx === 0 ? "1. ANTES DE COMPRAR (Descubrimiento)" : (pIdx === 1 ? "2. DURANTE LA COMPRA (Experiencia)" : "3. DESPUÉS DE COMPRAR (Fidelidad)");
                    const stateKey = pIdx === 0 ? "tpBefore" : (pIdx === 1 ? "tpDuring" : "tpAfter");
                    const selectedArr = st[stateKey] || [];
                    const allOpts = [...new Set([...tpCatalog[phaseKey], ...selectedArr])];
                    const accentColor = pIdx === 0 ? "#1D4ED8" : (pIdx === 1 ? "#EA580C" : "#090D16");
                    return `
                      <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-left:4px solid ${accentColor}; border-radius:14px; padding:12px 14px;">
                        <div style="font-family:'JetBrains Mono', monospace; font-size:0.73rem; font-weight:800; color:${accentColor}; margin-bottom:8px;">
                          ${phaseTitle}
                        </div>
                        <div style="display:flex; flex-wrap:wrap; gap:6px;">
                          ${allOpts.map(opt => {
                            const isSel = selectedArr.includes(opt);
                            const safeOpt = opt.replace(/'/g, "\\\\'");
                            return `
                              <button type="button" onclick="window.tbbToggleCommercialDemoTouchpoint('${stateKey}', '${safeOpt}')" style="background:${isSel ? '#EFF6FF' : '#FFFFFF'}; color:${isSel ? '#1D4ED8' : '#090D16'}; border:2px solid ${isSel ? '#1D4ED8' : '#CBD5E1'}; border-radius:10px; padding:6px 12px; font-size:0.76rem; font-weight:800; cursor:pointer;">
                                ${isSel ? "✓ " : "+ "}${escHtml(opt)}
                              </button>
                            `;
                          }).join("")}
                        </div>
                      </div>
                    `;
                  }).join("")}

                  <div style="display:flex; gap:10px; flex-wrap:wrap; padding-top:4px;">
                    <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbSwitchMainSection(3)" style="flex:1; padding:12px 14px; font-size:0.84rem;">
                      <span>Ver Oferta y Entregables (Paso 3) →</span>
                    </button>
                    <button type="button" class="tbb-comm-btn-orange" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="flex:1; padding:12px 14px; font-size:0.84rem;">
                      <span>Comprar App · $49 USD</span>
                    </button>
                  </div>
                `}
              </div>

              <!-- Columna Derecha: Círculo Dorado 100% Circular y Resumen -->
              <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:22px; padding:22px; display:flex; flex-direction:column; gap:14px; box-shadow:0 16px 38px rgba(9,13,22,0.07);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8;">
                    CÍRCULO DORADO (SIMON SINEK) · HOJA 04 / 30
                  </span>
                  <span style="background:#FFF7ED; color:#EA580C; border:1px solid #FDBA74; border-radius:999px; padding:3px 10px; font-size:0.66rem; font-weight:800;">
                    100% CIRCULAR
                  </span>
                </div>

                <div id="tbbCommGoldenCircleSvgWrap">
                  ${window.tbbBuildCircularGoldenCircleSVG()}
                </div>

                <div id="tbbCommTouchpointsLiveSummary" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; font-size:0.72rem;">
                  <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:8px; text-align:center;">
                    <div style="font-weight:800; color:#1D4ED8;">1. ANTES (${st.tpBefore.length})</div>
                    <div style="color:#1E3A8A; font-weight:600; margin-top:2px;">Descubrimiento</div>
                  </div>
                  <div style="background:#FFF7ED; border:1px solid #FED7AA; border-radius:10px; padding:8px; text-align:center;">
                    <div style="font-weight:800; color:#EA580C;">2. DURANTE (${st.tpDuring.length})</div>
                    <div style="color:#7C2D12; font-weight:600; margin-top:2px;">Experiencia</div>
                  </div>
                  <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:8px; text-align:center;">
                    <div style="font-weight:800; color:#090D16;">3. DESPUÉS (${st.tpAfter.length})</div>
                    <div style="color:#334155; font-weight:600; margin-top:2px;">Lealtad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- ===================================================================== -->
      <!-- PANE 3: OFERTA Y ENTREGABLES (MANUAL 30 HOJAS, BENTO & PRECIOS)       -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_3" style="display:${st.activeMainSection === 3 ? 'block' : 'none'};">
        <!-- Explorador de Hojas del Manual -->
        <section id="tbbCommPlateExplorerSection" style="padding:54px 24px; background:linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%); border-bottom:2px solid #CBD5E1;">
          <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:20px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap;">
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8; letter-spacing:0.06em;">
                  ESPECIFICACIÓN TÉCNICA · BRANDBOOK 1.0 OFICIAL
                </div>
                <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
                  Un Manual de Marca de 30 Hojas listo para imprenta
                </h2>
                <p style="font-size:0.94rem; font-weight:500; color:#475569; margin:0; max-width:760px;">
                  Sistema oficial de marca única: propósito nuclear, puntos de contacto clave, aplicaciones gráficas y normas de uso.
                </p>
              </div>

              <!-- Pestañas de Hojas -->
              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                ${[
                  { n: 1, lbl: "Hoja 01 · Portada" },
                  { n: 4, lbl: "Hoja 04 · Círculo Dorado" },
                  { n: 6, lbl: "Hoja 06 · Personalidad" },
                  { n: 8, lbl: "Hoja 08 · Touchpoints" },
                  { n: 14, lbl: "Hoja 14 · Versiones de Logo" },
                  { n: 20, lbl: "Hoja 20 · CMYK & Pantone" }
                ].map(tab => `
                  <button type="button" id="tbbExpTab_${tab.n}" class="tbb-tab-light-surface ${tab.n === st.activeExplorerPlate ? 'is-active' : ''}" onclick="window.tbbSelectExplorerPlate(${tab.n})" style="font-size:0.76rem; padding:8px 12px;">
                    ${tab.lbl}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Escenario de la Hoja Seleccionada -->
            <div id="tbbExplorerPlateLiveStage" style="margin-top:10px;">
              ${window.tbbBuildExplorerPlateStageHTML(st.activeExplorerPlate)}
            </div>
          </div>
        </section>

        <!-- Bento Grid de Entregables Reales -->
        <section id="tbbCommDeliverablesSection" style="padding:54px 24px; background:#FFFFFF; border-bottom:2px solid #E2E8F0;">
          <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:20px;">
            <div style="text-align:center; max-width:720px; margin:0 auto;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#EA580C; letter-spacing:0.06em;">
                ENTREGABLES REALES EN CURVAS · LISTOS PARA OPERAR
              </div>
              <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
                Tu identidad en el mundo real: Packaging, papelería y fachadas
              </h2>
              <p style="font-size:0.94rem; font-weight:500; color:#475569; margin:0;">
                Cada activo se entrega en curvas vectoriales puras y especificaciones de imprenta offset CMYK y Pantone.
              </p>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px; margin-top:12px;">
              <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:18px; padding:20px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#1D4ED8;">01 · PACKAGING Y UNBOXING</div>
                <h4 style="font-size:1.10rem; font-weight:900; color:#090D16; margin:6px 0 8px 0;">Cajas y Bolsas de Lujo</h4>
                <p style="font-size:0.80rem; color:#475569; line-height:1.45; margin:0;">Acabados en hot-stamping ámbar, barniz a registro y cartulina negra mate.</p>
              </div>
              <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:18px; padding:20px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#EA580C;">02 · PAPELERÍA EJECUTIVA</div>
                <h4 style="font-size:1.10rem; font-weight:900; color:#090D16; margin:6px 0 8px 0;">Hojas Membretadas y Tarjetas</h4>
                <p style="font-size:0.80rem; color:#475569; line-height:1.45; margin:0;">Plantillas listas para impresión offset con valores CMYK y Pantone certificados.</p>
              </div>
              <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:18px; padding:20px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#090D16;">03 · SEÑALÉTICA Y FACHADAS</div>
                <h4 style="font-size:1.10rem; font-weight:900; color:#090D16; margin:6px 0 8px 0;">Letreros 3D y Vitrinas</h4>
                <p style="font-size:0.80rem; color:#475569; line-height:1.45; margin:0;">Especificaciones de corte láser en acrílico, aluminio cepillado y retroiluminación LED.</p>
              </div>
              <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:18px; padding:20px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#16A34A;">04 · ECOSISTEMA DIGITAL</div>
                <h4 style="font-size:1.10rem; font-weight:900; color:#090D16; margin:6px 0 8px 0;">Iconos iOS/Android y Redes</h4>
                <p style="font-size:0.80rem; color:#475569; line-height:1.45; margin:0;">Assets en proporción 1:1, favicons, cabeceras de LinkedIn y WhatsApp Business.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Planes y Precios Transparentes (Sin Banners de Pasarelas) -->
        <section id="tbbCommPricingSection" style="padding:54px 24px 72px 24px; background:#F8FAFC; border-bottom:1px solid #E2E8F0;">
          <div style="max-width:960px; margin:0 auto; display:flex; flex-direction:column; gap:24px;">
            <div style="text-align:center;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8; letter-spacing:0.06em;">
                LICENCIA OFICIAL · ACCESO DE POR VIDA SIN SUSCRIPCIONES
              </div>
              <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
                Adquiere The Best Brand y descarga tu Manual de Marca de 30 Hojas
              </h2>
              <p style="font-size:0.94rem; font-weight:500; color:#475569; margin:0;">
                Pago único de por vida. Activación instantánea para ti o para tu agencia.
              </p>
            </div>

            <!-- Grilla de Planes Limpia -->
            <div class="tbb-comm-grid-2" style="gap:20px;">
              <div style="background:#FFFFFF; border:2.5px solid #090D16; border-radius:22px; padding:28px; box-shadow:0 18px 45px rgba(9,13,22,0.08); display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="display:inline-block; background:#EFF6FF; color:#1D4ED8; border-radius:999px; padding:4px 12px; font-family:'JetBrains Mono',monospace; font-size:0.70rem; font-weight:800;">
                    LICENCIA RECOMENDADA
                  </div>
                  <h3 style="font-size:1.45rem; font-weight:900; color:#090D16; margin:8px 0 2px 0;">Licencia Pro Empresario</h3>
                  <div style="font-size:2.4rem; font-weight:900; color:#090D16;">$49 <span style="font-size:1rem; font-weight:700; color:#64748B;">USD</span></div>
                  <div style="font-size:0.78rem; font-weight:700; color:#16A34A; margin-bottom:16px;">Pago único de por vida · Cero mensualidades</div>

                  <ul style="font-size:0.86rem; color:#334155; font-weight:600; line-height:1.7; padding-left:18px; margin:0;">
                    <li>Recorrido guiado de 7 pasos con Aura en tiempo real</li>
                    <li>Generación de logotipo en curvas vectoriales SVG</li>
                    <li><strong>Manual de Marca de 30 Hojas</strong> en PDF e interactivo</li>
                    <li>Sincronización en la nube y 6 idiomas (ES, EN, FR, PT, DE, IT)</li>
                  </ul>
                </div>

                <div style="margin-top:24px;">
                  <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="width:100%; padding:14px; font-size:0.92rem;">
                    Comprar Licencia Pro · $49 USD
                  </button>
                  <div style="font-size:0.74rem; font-weight:600; color:#64748B; text-align:center; margin-top:8px;">
                    Pago seguro instantáneo · Activación inmediata con Tarjeta, Apple Pay, Google Pay o PayPal en el checkout
                  </div>
                </div>
              </div>

              <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:22px; padding:28px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="display:inline-block; background:#FFF7ED; color:#EA580C; border-radius:999px; padding:4px 12px; font-family:'JetBrains Mono',monospace; font-size:0.70rem; font-weight:800;">
                    AGENCIAS Y MULTI-MARCA
                  </div>
                  <h3 style="font-size:1.45rem; font-weight:900; color:#090D16; margin:8px 0 2px 0;">Licencia Atelier Multi-Marca</h3>
                  <div style="font-size:2.4rem; font-weight:900; color:#090D16;">$149 <span style="font-size:1rem; font-weight:700; color:#64748B;">USD</span></div>
                  <div style="font-size:0.78rem; font-weight:700; color:#16A34A; margin-bottom:16px;">Pago único · Marcas ilimitadas</div>

                  <ul style="font-size:0.86rem; color:#334155; font-weight:600; line-height:1.7; padding-left:18px; margin:0;">
                    <li>Marcas ilimitadas para entrega comercial a clientes</li>
                    <li>Suite técnica completa para imprenta Offset CMYK y Pantone</li>
                    <li>Exportación en alta resolución para registro de marca</li>
                    <li>Soporte prioritario y certificación de identidad</li>
                  </ul>
                </div>

                <div style="margin-top:24px;">
                  <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite')" style="width:100%; padding:14px; font-size:0.92rem;">
                    Comprar Licencia Atelier · $149 USD
                  </button>
                  <div style="font-size:0.74rem; font-weight:600; color:#64748B; text-align:center; margin-top:8px;">
                    Licencia comercial para agencias · Activación multi-marca inmediata
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón para avanzar a los Videos Educativos -->
            <div style="text-align:center; margin-top:10px;">
              <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbSwitchMainSection(4)" style="padding:12px 24px; font-size:0.88rem;">
                <span>Ver Sección 4: Videos Educativos y Autores de YouTube →</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- ===================================================================== -->
      <!-- PANE 4: VIDEOS EDUCATIVOS Y AUTORES DE YOUTUBE                        -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_4" style="display:${st.activeMainSection === 4 ? 'block' : 'none'};">
        <section id="tbbCommVideoSection" style="padding:54px 24px 72px 24px; background:#F8FAFC; color:#090D16; border-bottom:1px solid #E2E8F0;">
          <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:28px;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8; letter-spacing:0.06em;">
                MASTERCLASS OFICIAL & VIDEOTECA DE AUTORES
              </div>
              <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
                Aprende la Metodología con Aura y los Grandes Autores del Branding
              </h2>
              <p style="font-size:0.94rem; font-weight:500; color:#475569; margin:0; max-width:820px;">
                The Best Brand está respaldada por los marcos de trabajo más influyentes del mundo. Mira el recorrido guiado por Aura o profundiza en las conferencias oficiales de cada autor en YouTube.
              </p>
            </div>

            <!-- 1. VIDEO MAESTRO DE AURA EN FULL HD -->
            <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:24px; overflow:hidden; box-shadow:0 18px 45px rgba(9,13,22,0.07);">
              <div style="padding:16px 20px; background:#090D16; color:#FFFFFF; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="width:8px; height:8px; border-radius:50%; background:#FF7A00;"></span>
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:800;">RECORRIDO GUIADO POR VOZ · AURA</span>
                </div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#94A3B8;">
                  Full HD 1080p · 02:48
                </div>
              </div>

              <!-- Pestañas de Capítulos -->
              <div style="display:flex; gap:8px; overflow-x:auto; padding:12px 20px; background:#F8FAFC; border-bottom:1px solid #E2E8F0;">
                ${VIDEO_CAPSULES.map((c, idx) => `
                  <button type="button" id="tbbVidTab_${idx}" class="tbb-tab-light-surface ${idx === st.activeVideoStep ? 'is-active' : ''}" onclick="window.tbbSelectMasterclassChapter(${idx})" style="flex-shrink:0; font-size:0.78rem; padding:8px 14px;">
                    <span>${c.step === 'master' ? '★ Recorrido con Aura (02:48)' : 'Paso ' + c.step + ' · ' + c.title.split(':')[0]}</span>
                  </button>
                `).join("")}
              </div>

              <!-- Reproductor -->
              <div style="aspect-ratio:16/9; width:100%; max-height:520px; background:#000000; position:relative;">
                <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" playsinline muted loop style="width:100%; height:100%; object-fit:contain; display:block;"></video>
              </div>

              <div style="padding:18px 24px; display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; border-top:1px solid #E2E8F0;">
                <div style="flex:1; min-width:260px;">
                  <h3 id="tbbMasterclassTitle" style="font-size:1.15rem; font-weight:900; margin:0; color:#090D16;">
                    ${activeCapsule.title}
                  </h3>
                  <div id="tbbMasterclassAuthor" style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8; margin-top:3px;">
                    ${activeCapsule.author} · ${activeCapsule.duration}
                  </div>
                  <div id="tbbMasterclassQuote" style="font-size:0.84rem; font-weight:600; color:#475569; margin-top:4px;">
                    ${activeCapsule.quote}
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:8px;">
                  <button type="button" id="tbbMasterclassPlayBtn" class="tbb-comm-btn-black" onclick="window.tbbToggleMasterclassPlay()" style="padding:10px 18px; font-size:0.82rem;">
                    Reproducir
                  </button>
                  <button type="button" id="tbbMasterclassMuteBtn" class="tbb-comm-btn-white" onclick="window.tbbToggleMasterclassMute()" style="padding:10px 18px; font-size:0.82rem;">
                    Activar Sonido
                  </button>
                </div>
              </div>
            </div>

            <!-- 2. VIDEOTECA DE YOUTUBE DE LOS AUTORES RELACIONADOS CON EL RECORRIDO -->
            <div style="margin-top:20px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:18px; flex-wrap:wrap; gap:10px;">
                <div>
                  <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#EA580C;">
                    LOS PILARES METODOLÓGICOS EN YOUTUBE
                  </div>
                  <h3 style="font-family:'Montserrat', sans-serif; font-size:1.45rem; font-weight:900; color:#090D16; margin:4px 0 0 0;">
                    Conferencias Magistrales de los Autores
                  </h3>
                </div>
                <div style="font-size:0.80rem; color:#64748B; font-weight:600;">
                  Haz clic en cualquier video para reproducirlo al instante
                </div>
              </div>

              <!-- Grilla de Videos de YouTube -->
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:18px;">
                ${YOUTUBE_METHODOLOGY_AUTHORS.map(v => `
                  <div onclick="window.tbbPlayYouTubeAuthorVideo('${v.id}')" style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:18px; overflow:hidden; box-shadow:0 10px 25px rgba(9,13,22,0.05); cursor:pointer; transition:transform 0.2s ease, box-shadow 0.2s ease; display:flex; flex-direction:column;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 18px 35px rgba(9,13,22,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 25px rgba(9,13,22,0.05)';" aria-label="Ver video de ${v.author}">
                    <div style="position:relative; aspect-ratio:16/9; background:#000000; overflow:hidden;">
                      <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" style="width:100%; height:100%; object-fit:cover; display:block;" />
                      <div style="position:absolute; inset:0; background:rgba(9,13,22,0.25); display:flex; align-items:center; justify-content:center;">
                        <div style="width:52px; height:52px; border-radius:50%; background:rgba(220,38,38,0.92); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF"><polygon points="8 5 19 12 8 19 8 5"/></svg>
                        </div>
                      </div>
                      <div style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.85); color:#FFFFFF; border-radius:6px; padding:2px 8px; font-family:'JetBrains Mono',monospace; font-size:0.68rem; font-weight:800;">
                        ${v.duration}
                      </div>
                      <div style="position:absolute; top:8px; left:8px; background:${v.badgeColor}; color:#FFFFFF; border-radius:6px; padding:3px 10px; font-family:'JetBrains Mono',monospace; font-size:0.62rem; font-weight:800;">
                        ${v.step}
                      </div>
                    </div>

                    <div style="padding:16px; display:flex; flex-direction:column; justify-content:space-between; flex:1;">
                      <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                          <div style="font-family:'Montserrat',sans-serif; font-size:0.88rem; font-weight:900; color:#090D16;">${v.author}</div>
                          <div style="font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#64748B;">${v.channel}</div>
                        </div>
                        <h4 style="font-size:0.96rem; font-weight:800; color:#090D16; margin:0 0 6px 0; line-height:1.35;">
                          ${v.title}
                        </h4>
                        <p style="font-size:0.78rem; color:#475569; margin:0; line-height:1.42;">
                          ${v.topic}
                        </p>
                      </div>

                      <div style="margin-top:12px; padding-top:10px; border-top:1px solid #E2E8F0; display:flex; align-items:center; justify-content:space-between;">
                        <span style="font-size:0.74rem; font-weight:800; color:#DC2626; display:inline-flex; align-items:center; gap:4px;">
                          ▶ Ver en YouTube
                        </span>
                        <span style="font-size:0.70rem; font-weight:700; color:#64748B;">
                          Charla Magistral
                        </span>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Botones de Acción al pie de la Sección 4 -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:12px; padding-top:18px; border-top:1px solid #E2E8F0;">
              <button type="button" class="tbb-comm-btn-white" onclick="window.tbbSwitchMainSection(1)" style="padding:12px 20px; font-size:0.86rem;">
                <span>← Volver al Gancho</span>
              </button>
              <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:12px 24px; font-size:0.90rem;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>Comprar Licencia Pro · $49 USD</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    `;
  };
"""

if start_markup != -1 and end_markup != -1:
    code = code[:start_markup] + new_markup_engine + code[end_markup:]
    print("[OK] tbbBuildCommercialExperienceMarkup reemplazado con arquitectura de 4 secciones.")
else:
    print("[WARN] No se encontró el bloque de tbbBuildCommercialExperienceMarkup.")

# ------------------------------------------------------------------------------
# 3. REEMPLAZO GLOBAL DE '30 LÁMINAS' -> 'MANUAL DE MARCA DE 30 HOJAS'
# ------------------------------------------------------------------------------
code = code.replace("30 Láminas", "Manual de Marca de 30 Hojas")
code = code.replace("30 láminas", "Manual de Marca de 30 Hojas")
code = code.replace("30 LÁMINAS", "MANUAL DE MARCA DE 30 HOJAS")

# ------------------------------------------------------------------------------
# 4. GUARDAR
# ------------------------------------------------------------------------------
with open("apps/web/tbb-commercial-experience-and-payments.js", "w", encoding="utf-8") as f:
    f.write(code)

print("[ÉXITO TOTAL] apps/web/tbb-commercial-experience-and-payments.js actualizado al 100%.")
