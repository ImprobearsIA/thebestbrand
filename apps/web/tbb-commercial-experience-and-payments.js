/**
 * ============================================================================
 * THE BEST BRAND · YOUR BRAND, NOW!!! (AWWWARDS COMMERCIAL ATELIER V58.0)
 * ============================================================================
 * Arquitectura & Craft: Gemini 4.0 Architecture + Acqua VIP + ImproBears Web Awwwards
 * Dirección Creativa: Max, Gina, AURA, Elena Vance, Steve Jobs C-00 & Craig Federighi
 *
 * PILARES DE INGENIERÍA V58.0:
 * 1. Header Fijo Monofila + Menú Móvil Slide-Over (Cero apilamiento de 5 renglones en iPhone)
 *    + Barra de Progreso Superior de Scroll en tiempo real + scroll-margin-top: 88px.
 * 2. Animaciones Apple Scroll-Reveal (.tbb-apple-reveal con blur-to-crisp) + 3D Perspective Tilt
 *    reactivo al cursor en tarjetas maestras y Bento Grid.
 * 3. Portada Oficial Brandbook 1.0 (Idéntica al documento en Google Drive de Jorge) con los
 *    4 Sellos Monolíticos (Firma Principal, Emblema Central, Icono Digital, Sello Calidad)
 *    + Explorador Interactivo de Láminas en Curvas en vivo (Láminas 01, 04, 06, 08, 14 y 20).
 * 4. Separación Estricta de Botones para Superficie Oscura (.tbb-comm-btn-outline) y Superficie
 *    Clara (.tbb-btn-light-surface / .tbb-tab-light-surface) — 100% contraste WCAG AAA en tabs
 *    de Demo Paso 1/2, botón de ortografía y pestañas de Checkout (Tarjeta, Apple Pay, Google Pay, PayPal).
 * 5. Círculo Dorado 100% Circular con ajuste geométrico multilínea (<tspan>) calibrado al ancho
 *    de cuerda de cada anillo para que ningún texto cruce jamás los bordes circulares.
 * 6. Pastilla Flotante Inteligente: oculta automáticamente dentro de /studio (donde ya existen
 *    los botones en el header superior) para jamás tapar el botón "Adelante / Continuar", y
 *    auto-colapsable al llegar a Precios en /web.
 * ============================================================================
 */
(function () {
  "use strict";

  const LANG_STORAGE_KEY = "tbb_active_ui_lang_v52";
  const LICENSE_STORAGE_KEY = "tbb_pro_license_v56";




  // ---------------------------------------------------------------------------
  // CONTROLADOR DE NAVEGACIÓN ENTRE LAS 4 SECCIONES (V67)
  // ---------------------------------------------------------------------------
  window.tbbSwitchMainSection = function (secNumber) {
    const s = Math.max(1, Math.min(4, Number(secNumber || 1)));
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.activeMainSection = s;

    // Regla de Aislamiento Estricto: en Sección 2 (Demo en Vivo) se ocultan barras de compra
    if (s === 2) {
      document.body.classList.add("tbb-is-demo-section");
    } else {
      document.body.classList.remove("tbb-is-demo-section");
    }

    for (let i = 1; i <= 4; i++) {
      const pane = document.getElementById(`tbbMainSectionPane_${i}`);
      if (pane) {
        pane.style.display = (i === s) ? "block" : "none";
      }
      document.querySelectorAll(`#tbbSecTab_${i}, #tbbMobSecTab_${i}, .tbb-tab-sec-${i}`).forEach(btn => {
        btn.classList.toggle("is-active", i === s);
      });
    }

    // Ocultar barra flotante y botones de compra en Demo
    const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
    if (floatBar) {
      floatBar.style.display = (s === 2) ? "none" : "flex";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (s === 1) {
      setTimeout(() => {
        if (typeof window.tbbInitHeroParticlesCanvas === "function") window.tbbInitHeroParticlesCanvas();
      }, 50);
    }
  };

  // ---------------------------------------------------------------------------
  // GRÁFICO COMPARATIVO DE VALOR: AGENCIAS VS THE BEST BRAND VS APPS BÁSICAS
  // ---------------------------------------------------------------------------
  window.tbbBuildComparisonMatrixHTML = function () {
    const renderIcons = (type, count, max, activeColor) => {
      let out = "";
      for (let i = 0; i < max; i++) {
        const isActive = i < count;
        if (type === "money") {
          out += `<span style="font-weight:900; font-size:1.05rem; color:${isActive ? activeColor : '#CBD5E1'}; margin-right:2px;">$</span>`;
        } else if (type === "time") {
          out += `<span style="font-size:1.02rem; color:${isActive ? activeColor : '#CBD5E1'}; margin-right:2px;">⏱</span>`;
        } else if (type === "prof") {
          out += `<span style="font-size:1.02rem; color:${isActive ? activeColor : '#CBD5E1'}; margin-right:2px;">📐</span>`;
        }
      }
      return out;
    };

    return `
      <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-top:6px solid #0D2540; border-radius:24px; padding:28px 24px; box-shadow:0 16px 40px rgba(9,13,22,0.06); margin-top:20px;">
        <div style="text-align:center; max-width:760px; margin:0 auto 28px auto;">
          <div style="display:inline-flex; align-items:center; gap:8px; background:#F0F7FF; border:1px solid #93C5FD; border-radius:999px; padding:5px 14px; font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#0D2540; margin-bottom:10px;">
            ✦ MATRIZ COMPARATIVA DE VALOR
          </div>
          <h3 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.5rem, 2.8vw, 2.05rem); font-weight:900; color:#090D16; margin:0 0 8px 0;">
            El Equilibrio Perfecto entre Rigor, Rapidez e Inversión
          </h3>
          <p style="font-size:0.88rem; color:#475569; line-height:1.5; margin:0;">
            Evaluación transparente: cómo The Best Brand ofrece el nivel de una agencia de branding internacional en minutos y a una fracción mínima del costo.
          </p>
        </div>

        <div class="tbb-comm-grid-3" style="gap:18px; align-items:stretch;">
          <!-- COLUMNA 1: AGENCIAS TRADICIONALES -->
          <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:18px; padding:22px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#64748B;">EXTREMO IZQUIERDO</div>
              <h4 style="font-family:'Montserrat', sans-serif; font-size:1.12rem; font-weight:900; color:#090D16; margin:4px 0 14px 0;">Agencias Tradicionales</h4>
              <p style="font-size:0.78rem; color:#475569; line-height:1.45; margin:0 0 16px 0;">
                Estudios de diseño con juntas interminables, meses de espera y cotizaciones de decenas de miles de dólares.
              </p>

              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">INVERSIÓN</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">$3,000 - $15,000+ USD</div>
                  </div>
                  <div>${renderIcons("money", 5, 5, "#DC2626")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#DC2626; margin-left:4px;">5/5</span></div>
                </div>

                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">TIEMPO DE ESPERA</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">6 a 12 semanas</div>
                  </div>
                  <div>${renderIcons("time", 5, 5, "#DC2626")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#DC2626; margin-left:4px;">5/5</span></div>
                </div>

                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">PROFESIONALISMO</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">Alto (manual completo)</div>
                  </div>
                  <div>${renderIcons("prof", 5, 5, "#0D2540")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#0D2540; margin-left:4px;">5/5</span></div>
                </div>
              </div>
            </div>

            <div style="margin-top:20px; padding-top:14px; border-top:1px solid #E2E8F0; text-align:center;">
              <span style="font-size:0.74rem; font-weight:700; color:#64748B;">Fricción burocrática alta</span>
            </div>
          </div>

          <!-- COLUMNA 2: THE BEST BRAND 1.0 (DESTACADA AL CENTRO) -->
          <div style="background:#0D2540; border:2.5px solid #4C9DE6; border-top:5px solid #FF7A00; border-radius:20px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 18px 42px rgba(13,37,64,0.45); transform:scale(1.02); position:relative;">
            <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#0D2540; color:#FFFFFF; border:1.5px solid #FF7A00; border-radius:999px; padding:3px 14px; font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:900; letter-spacing:0.04em; white-space:nowrap; box-shadow:0 4px 14px rgba(255,122,0,0.35);">
              ★ <span style="color:#FF7A00;">PUNTO DULCE ÓPTIMO</span>
            </div>

            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG ? window.tbbBuildOfficialBrandbook1EmblemSVG(26) : ''}
                <div style="font-family:'Montserrat', sans-serif; font-size:1.20rem; font-weight:900; color:#FFFFFF;">THE BEST BRAND <span style="color:#FF7A00; font-size:0.75rem; vertical-align:middle;">1.0</span></div>
              </div>
              <p style="font-size:0.80rem; color:#CBD5E1; line-height:1.45; margin:0 0 16px 0;">
                Mentora socrática con IA (Aura) que te guía paso a paso y genera tu Manual de Marca de 30 Hojas en Curvas de nivel internacional.
              </p>

              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18); border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#93C5FD;">INVERSIÓN</div>
                    <div style="font-size:0.82rem; font-weight:800; color:#FFFFFF;">Solo $49 USD (único pago)</div>
                  </div>
                  <div>${renderIcons("money", 2, 5, "#4C9DE6")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#4C9DE6; margin-left:4px;">2/5</span></div>
                </div>

                <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18); border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#93C5FD;">TIEMPO DE ESPERA</div>
                    <div style="font-size:0.82rem; font-weight:800; color:#FFFFFF;">Minutos (en una sesión)</div>
                  </div>
                  <div>${renderIcons("time", 2, 5, "#4C9DE6")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#4C9DE6; margin-left:4px;">2/5</span></div>
                </div>

                <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18); border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#93C5FD;">PROFESIONALISMO</div>
                    <div style="font-size:0.82rem; font-weight:800; color:#FFFFFF;">30 Hojas en Curvas Vector</div>
                  </div>
                  <div>${renderIcons("prof", 5, 5, "#FFFFFF")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#FF7A00; margin-left:4px;">5/5 ★</span></div>
                </div>
              </div>
            </div>

            <div style="margin-top:20px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.18); display:flex; flex-direction:column; gap:8px;">
              <a href="/studio" style="width:100%; padding:11px; font-size:0.86rem; background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); border:1.5px solid #4C9DE6; border-bottom:3px solid #FF7A00; color:#FFFFFF; border-radius:999px; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:6px; font-weight:800; cursor:pointer; box-shadow:0 6px 16px rgba(0,0,0,0.3);">
                <span style="color:#FF7A00;">●</span> <span>Entrar al Estudio Completo →</span>
              </a>
              <button type="button" class="tbb-comm-btn-outline" onclick="window.tbbSwitchMainSection(2)" style="width:100%; padding:8px; font-size:0.78rem;">
                <span>Probar Demo Rápida ↓</span>
              </button>
            </div>
          </div>

          <!-- COLUMNA 3: GENERADORES BÁSICOS DE IA -->
          <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:18px; padding:22px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#64748B;">EXTREMO DERECHO</div>
              <h4 style="font-family:'Montserrat', sans-serif; font-size:1.12rem; font-weight:900; color:#090D16; margin:4px 0 14px 0;">Apps de Logos Básicas</h4>
              <p style="font-size:0.78rem; color:#475569; line-height:1.45; margin:0 0 16px 0;">
                Generadores instantáneos de íconos prefabricados sin estrategia de negocio.
              </p>

              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">INVERSIÓN</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">Mínima (1/5)</div>
                  </div>
                  <div>${renderIcons("money", 1, 5, "#16A34A")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#16A34A; margin-left:4px;">1/5</span></div>
                </div>

                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">TIEMPO DE ESPERA</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">Instantáneo (1/5)</div>
                  </div>
                  <div>${renderIcons("time", 1, 5, "#16A34A")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#16A34A; margin-left:4px;">1/5</span></div>
                </div>

                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">PROFESIONALISMO</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#DC2626;">Muy Bajo (sin manual)</div>
                  </div>
                  <div>${renderIcons("prof", 1, 5, "#DC2626")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#DC2626; margin-left:4px;">1/5</span></div>
                </div>
              </div>
            </div>

            <div style="margin-top:20px; padding-top:14px; border-top:1px solid #E2E8F0; text-align:center;">
              <span style="font-size:0.74rem; font-weight:700; color:#DC2626;">Sin estrategia ni manual</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // HELPERS: VIDEOTECA YOUTUBE Y BIBLIOTECA DEL FUNDADOR
  // ---------------------------------------------------------------------------
  window.tbbPlayYouTubeAuthorVideo = function (videoId) {
    const author = YOUTUBE_METHODOLOGY_AUTHORS.find(a => a.id === videoId || a.idVideo === videoId);
    const finalId = author?.idVideo || author?.id || videoId;
    window.tbbOpenYouTubeModal(finalId, author?.author, author?.title);
  };

  window.tbbOpenYouTubeModal = function (youtubeVideoId, authorName, videoTitle) {
    let ov = document.getElementById("tbbYouTubeAuthorModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbYouTubeAuthorModalOverlay";
      ov.style.cssText = "position:fixed; inset:0; background:rgba(5,8,17,0.88); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); z-index:10050; display:flex; align-items:center; justify-content:center; padding:16px;";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseYouTubeModal(); };
      document.body.appendChild(ov);
    }
    ov.innerHTML = `
      <div style="background:#0F172A; border:2px solid #0D2540; border-top:6px solid #4C9DE6; border-radius:22px; width:100%; max-width:880px; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,0.85); display:flex; flex-direction:column;">
        <div style="padding:16px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1E293B;">
          <div>
            <span style="font-family:'JetBrains Mono',monospace; font-size:0.70rem; font-weight:800; color:#4C9DE6;">CONFERENCIA MAGISTRAL · ${authorName || 'PENSADOR CLAVE'}</span>
            <div style="font-family:'Montserrat',sans-serif; font-size:1.05rem; font-weight:900; color:#FFFFFF; margin-top:2px;">${videoTitle || 'Metodología Oficial The Best Brand'}</div>
          </div>
          <button type="button" onclick="window.tbbCloseYouTubeModal()" style="background:none; border:none; color:#94A3B8; font-size:1.4rem; cursor:pointer; padding:4px 8px;">✕</button>
        </div>
        <div style="aspect-ratio:16/9; width:100%; background:#000000;">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="display:block; border:none;"></iframe>
        </div>
      </div>
    `;
    ov.style.display = "flex";
  };

  window.tbbCloseYouTubeModal = function () {
    const ov = document.getElementById("tbbYouTubeAuthorModalOverlay");
    if (ov) {
      ov.innerHTML = "";
      ov.style.display = "none";
    }
  };

  window.tbbFilterBooksCategory = function (cat) {
    const cards = document.querySelectorAll(".tbb-book-card");
    const pills = document.querySelectorAll(".tbb-book-filter-pill");
    pills.forEach(p => p.classList.toggle("is-active", p.dataset.cat === cat));
    cards.forEach(card => {
      if (cat === "all" || card.dataset.cat === cat) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  };

  window.tbbOpenAuraRecorridoModal = function () {
    window.tbbSwitchMainSection(4);
    const videoSec = document.getElementById("tbbCommVideoSection");
    if (videoSec) {
      videoSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.tbbSelectMasterclassChapter(0);
    window.tbbToggleMasterclassPlay();
  };

  // ---------------------------------------------------------------------------
  // 1. DICCIONARIO MULTILINGÜE COMPLETO (6 IDIOMAS: ES, EN, FR, PT, DE, IT)
  // ---------------------------------------------------------------------------
  const I18N = {
    es: {
      brandTag: "BRANDBOOK 1.0 · ARQUITECTURA MONOLÍTICA · ALGORITHMIC VISUAL IDENTITY",
      navPlates: "Manual de Marca de 30 Hojas en Vivo",
      navMasterclass: "Video Masterclass",
      navDeliverables: "Entregables",
      navDemo: "Demo Pasos 1 y 2",
      navPricing: "Planes y Licencias",
      navOpenApp: "Entrar a la App ↗",
      buyNowSticky: "Comprar App · $49 USD",
      buyNowShort: "Comprar · $49",
      webDemoShort: "Demo Pasos 1 y 2",
      heroBadge: "EDICIÓN OFICIAL BRANDBOOK 1.0 · ARQUITECTURA MONOLÍTICA · AWWWARDS CRAFT",
      heroTitle1: "De la Idea al Manual Oficial de Manual de Marca de 30 Hojas en Curvas",
      heroTitleAccent: "con Aura en Tiempo Real.",
      heroDesc: "Desarrollado con la ingeniería visual de Acqua e ImproBears: la primera plataforma que une estrategia socrática (Simon Sinek & Jan Carlzon), calibración Kansei y síntesis vectorial pura. Vive los Pasos 1 y 2 aquí mismo.",
      heroCtaDemo: "Vivir Demo Interactiva (Pasos 1 y 2)",
      heroCtaBuy: "Adquirir Licencia Pro · $49 USD",
      plateExplorerTag: "EXPLORADOR INTERACTIVO EN CURVAS · BRANDBOOK 1.0 EN VIVO",
      plateExplorerTitle: "Inspecciona el Manual de Manual de Marca de 30 Hojas que se adapta a tu arquitectura de marca",
      plateExplorerSub: "Cero plantillas genéricas ni submarcas forzadas: el motor sintetiza una Identidad Monolítica (Marca Única) o Multimarca según las decisiones reales de tu negocio.",
      videoSectionTag: "VIDEO TEATRO Y MASTERCLASS ESTRATÉGICA (7 CAPÍTULOS ANIMADOS)",
      videoSectionTitle: "Los 7 Pasos que transforman la intuición en un Sistema de Marca",
      videoSectionSub: "Cada etapa cuenta con su cápsula teórica animada narrada por Aura y respaldada por los autores clásicos del diseño y la estrategia.",
      videoPlayBtn: "Reproducir Cápsula",
      videoPauseBtn: "Pausar",
      videoUnmuteBtn: "Activar Sonido",
      videoMuteBtn: "Silenciar",
      deliverablesTag: "ENTREGABLES OFICIALES · INGENIERÍA EDITORIAL Y PRODUCCIÓN",
      deliverablesTitle: "Una suite de Manual de Marca de 30 Hojas lista para imprenta offset, registro y ecosistema digital",
      deliverablesSub: "Exportación inmediata en vectores matemáticos (.PDF de Manual de Marca de 30 Hojas en curvas, .HTML interactivo autónomo y .SVG puros sin píxeles).",
      demoSectionTag: "TALLER INTERACTIVO EN VIVO · PASOS 1 Y 2 SIN COSTO",
      demoSectionTitle: "Construye hoy mismo los Pasos 1 y 2 de tu marca con Aura",
      demoSectionSub: "Escribe tu idea como te salga: el motor corrige ortografía y la redacta con claridad ejecutiva sin alterar tu esencia. Todo tu avance se transfiere intacto al Estudio Completo.",
      demoStep1Tab: "PASO 1 · ADN Y CÍRCULO DORADO (WHY · HOW · WHAT)",
      demoStep2Tab: "PASO 2 · INGENIERÍA DE TOUCHPOINTS (ANTES · DURANTE · DESPUÉS)",
      demoBrandLabel: "Nombre de tu Marca o Proyecto:",
      demoBrandPlaceholder: "Ej. THE BEST BRAND, Café Boreal, Nova Salud...",
      demoGiroLabel: "Giro o Actividad Principal:",
      demoGiroPlaceholder: "Ej. App que ayuda a empresarios a definir la imagen de su empresa...",
      demoWhyLabel: "1. PROPÓSITO NUCLEAR (WHY · ¿Por qué existe tu marca más allá del dinero?):",
      demoHowLabel: "2. MÉTODO DIFERENCIADOR (HOW · ¿Cómo lo haces único frente al mercado?):",
      demoWhatLabel: "3. OFERTA DE VALOR (WHAT · ¿Qué producto o beneficio concreto entregas?):",
      demoPolishBtn: "Corregir ortografía y expresar con claridad ejecutiva",
      demoNextToStep2: "Guardar Paso 1 y Pasar a Touchpoints (Paso 2) →",
      demoTpBeforeTitle: "1. ANTES DE COMPRAR (Descubrimiento y Primera Impresión)",
      demoTpDuringTitle: "2. DURANTE LA COMPRA (Experiencia Central y Entrega)",
      demoTpAfterTitle: "3. DESPUÉS DE COMPRAR (Lealtad, Soporte y Recompra)",
      demoTpCustomPlaceholder: "Escribe un punto de contacto propio de tu negocio...",
      demoTpAddBtn: "Agregar Touchpoint",
      demoTransferBtn: "Continuar al Estudio Completo con mi Marca (Pasos 0 al 6) →",
      demoBuyInlineBtn: "Comprar la App y Desbloquear mis Manual de Marca de 30 Hojas ($49 USD)",
      goldenCircleTitle: "CÍRCULO DORADO EN VIVO (SIMON SINEK)",
      platePreviewTitle: "PORTADA OFICIAL BRANDBOOK 1.0",
      authorityTag: "FILOSOFÍA DE INGENIERÍA · DEL CAOS AL SISTEMA",
      authorityTitle: "La Empresa como Persona: Fuerza tranquila y mente de ingeniero",
      authorityDesc: "Creado bajo la dirección de Jorge Benítez «El Oso» y el equipo de sistemas de ImproBears. Escuchamos primero la idea del empresario y la profesionalizamos hombro a hombro con rigor técnico, claridad verbal y estética atemporal.",
      pricingTag: "LICENCIA OFICIAL · ACCESO VITALICIO SIN SUSCRIPCIONES",
      pricingTitle: "Adquiere The Best Brand y descarga tus Manual de Marca de 30 Hojas Oficiales",
      pricingSub: "Activación instantánea con Tarjeta de Crédito/Débito, Apple Pay, Google Pay o PayPal.",
      planSingleName: "Licencia Pro Empresario",
      planSinglePrice: "$49 USD",
      planSinglePeriod: "Pago único de por vida · Cero cargos mensuales",
      planAgencyName: "Licencia Atelier Multi-Marca",
      planAgencyPrice: "$149 USD",
      planAgencyPeriod: "Pago único · Marcas ilimitadas + Suite Offset CMYK & Pantone",
      checkoutTitle: "Adquirir The Best Brand — Activación Instantánea",
      checkoutSubtitle: "Elige tu método de pago seguro. Tu avance de la Demo queda vinculado automáticamente.",
      methodCard: "Tarjeta",
      methodApplePay: "Apple Pay",
      methodGooglePay: "Google Pay",
      methodPayPal: "PayPal",
      cardHolderLabel: "Nombre del Titular en la Tarjeta:",
      cardNumberLabel: "Número de Tarjeta (Visa, Mastercard, Amex):",
      cardExpiryLabel: "Vencimiento (MM/AA):",
      cardCvcLabel: "CVC / CVV:",
      cardEmailLabel: "Correo Electrónico para Recibo y Licencia:",
      payNowCardBtn: "Pagar y Activar Licencia Pro Ahora",
      payNowAppleBtn: "Autorizar con Apple Pay (Touch ID / Face ID)",
      payNowGoogleBtn: "Continuar y Pagar con Google Pay",
      payNowPayPalBtn: "Autorizar Pago Seguro con PayPal",
      licenseActiveBadge: "LICENCIA PRO ACTIVA"
    },
    en: {
      brandTag: "BRANDBOOK 1.0 · MONOLITHIC ARCHITECTURE · ALGORITHMIC VISUAL IDENTITY",
      navPlates: "30 Live Plates",
      navMasterclass: "Video Masterclass",
      navDeliverables: "Deliverables",
      navDemo: "Live Demo (Steps 1 & 2)",
      navPricing: "Pricing & Licenses",
      navOpenApp: "Open App ↗",
      buyNowSticky: "Buy App · $49 USD",
      buyNowShort: "Buy · $49",
      webDemoShort: "Steps 1 & 2 Demo",
      heroBadge: "OFFICIAL BRANDBOOK 1.0 EDITION · MONOLITHIC ARCHITECTURE · AWWWARDS CRAFT",
      heroTitle1: "From Raw Idea to an Official 30-Plate Vector Brandbook",
      heroTitleAccent: "with Aura in Real Time.",
      heroDesc: "Engineered by the creators of Acqua and ImproBears: uniting Socratic brand strategy, Kansei engineering, and mathematical vector synthesis. Experience Steps 1 and 2 live on this page.",
      heroCtaDemo: "Experience Live Demo (Steps 1 & 2)",
      heroCtaBuy: "Buy Pro License · $49 USD",
      plateExplorerTag: "INTERACTIVE VECTOR EXPLORER · LIVE BRANDBOOK 1.0",
      plateExplorerTitle: "Inspect the 30-Plate Manual tailored to your brand architecture",
      plateExplorerSub: "Zero forced sub-brands: the engine builds a clean Monolithic Identity (Single Brand) or Multi-Brand system matching your real business structure.",
      videoSectionTag: "VIDEO THEATER & STRATEGIC MASTERCLASS (7 ANIMATED CHAPTERS)",
      videoSectionTitle: "The 7 Steps that turn intuition into a cohesive Brand System",
      videoSectionSub: "Each stage includes an animated theory capsule narrated by Aura with foundational insights from global branding masters.",
      videoPlayBtn: "Play Capsule",
      videoPauseBtn: "Pause",
      videoUnmuteBtn: "Unmute Audio",
      videoMuteBtn: "Mute",
      deliverablesTag: "OFFICIAL DELIVERABLES · EDITORIAL & PRINT ENGINEERING",
      deliverablesTitle: "A 30-plate suite engineered for offset print, trademark registration, and digital UI",
      deliverablesSub: "Instant export in mathematically pure vector curves (30-plate .PDF, standalone interactive .HTML, and pure .SVG).",
      demoSectionTag: "LIVE INTERACTIVE WORKSHOP · STEPS 1 & 2 FREE",
      demoSectionTitle: "Build Steps 1 and 2 of your brand right here with Aura",
      demoSectionSub: "Write your idea naturally: our engine fixes spelling and polishes executive clarity without changing your core idea. Everything transfers to the Full Studio.",
      demoStep1Tab: "STEP 1 · BRAND DNA & GOLDEN CIRCLE (WHY · HOW · WHAT)",
      demoStep2Tab: "STEP 2 · TOUCHPOINT ENGINEERING (BEFORE · DURING · AFTER)",
      demoBrandLabel: "Brand or Project Name:",
      demoBrandPlaceholder: "E.g. THE BEST BRAND, Boreal Coffee, Nova Health...",
      demoGiroLabel: "Core Business Activity:",
      demoGiroPlaceholder: "E.g. An app that helps entrepreneurs define their company image...",
      demoWhyLabel: "1. CORE PURPOSE (WHY · Why does your brand exist beyond revenue?):",
      demoHowLabel: "2. DIFFERENTIATING METHOD (HOW · How do you make it unique?):",
      demoWhatLabel: "3. VALUE OFFER (WHAT · What concrete product or benefit do you deliver?):",
      demoPolishBtn: "Fix spelling and rewrite with executive clarity",
      demoNextToStep2: "Save Step 1 & Continue to Touchpoints (Step 2) →",
      demoTpBeforeTitle: "1. BEFORE PURCHASE (Discovery & First Impression)",
      demoTpDuringTitle: "2. DURING PURCHASE (Core Service & Delivery)",
      demoTpAfterTitle: "3. AFTER PURCHASE (Retention, Support & Loyalty)",
      demoTpCustomPlaceholder: "Type a custom touchpoint for your business...",
      demoTpAddBtn: "Add Touchpoint",
      demoTransferBtn: "Continue to Full Studio with My Brand (Steps 0 to 6) →",
      demoBuyInlineBtn: "Buy App & Unlock My 30 Plates ($49 USD)",
      goldenCircleTitle: "LIVE GOLDEN CIRCLE (SIMON SINEK)",
      platePreviewTitle: "OFFICIAL BRANDBOOK 1.0 COVER",
      authorityTag: "ENGINEERING PHILOSOPHY · FROM CHAOS TO SYSTEM",
      authorityTitle: "The Enterprise as a Persona: Quiet strength and engineering rigor",
      authorityDesc: "Created under the leadership of Jorge Benítez «El Oso» and ImproBears systems engineering. We listen to your vision first and professionalize it side by side.",
      pricingTag: "OFFICIAL LICENSE · LIFETIME ACCESS WITH NO SUBSCRIPTIONS",
      pricingTitle: "Get The Best Brand & Download Your 30 Official Plates",
      pricingSub: "Instant activation via Credit/Debit Card, Apple Pay, Google Pay, or PayPal.",
      planSingleName: "Entrepreneur Pro License",
      planSinglePrice: "$49 USD",
      planSinglePeriod: "One-time lifetime payment · Zero monthly fees",
      planAgencyName: "Multi-Brand Atelier License",
      planAgencyPrice: "$149 USD",
      planAgencyPeriod: "One-time payment · Unlimited brands + Offset CMYK & Pantone Suite",
      checkoutTitle: "Buy The Best Brand — Instant Activation",
      checkoutSubtitle: "Select your preferred payment method. Your Demo progress transfers automatically.",
      methodCard: "Card",
      methodApplePay: "Apple Pay",
      methodGooglePay: "Google Pay",
      methodPayPal: "PayPal",
      cardHolderLabel: "Cardholder Name:",
      cardNumberLabel: "Card Number (Visa, Mastercard, Amex):",
      cardExpiryLabel: "Expiry Date (MM/YY):",
      cardCvcLabel: "CVC / CVV:",
      cardEmailLabel: "Email for Receipt & License Key:",
      payNowCardBtn: "Pay & Activate Pro License Now",
      payNowAppleBtn: "Authorize with Apple Pay (Touch ID / Face ID)",
      payNowGoogleBtn: "Continue & Pay with Google Pay",
      payNowPayPalBtn: "Authorize Secure Payment with PayPal",
      licenseActiveBadge: "PRO LICENSE ACTIVE"
    },
    fr: {
      brandTag: "BRANDBOOK 1.0 · ARCHITECTURE MONOLITHIQUE · IDENTITÉ VISUELLE ALGORITHMIQUE",
      navPlates: "30 Planches Live",
      navMasterclass: "Vidéo Masterclass",
      navDeliverables: "Livrables",
      navDemo: "Démo Étapes 1 & 2",
      navPricing: "Tarifs & Licences",
      navOpenApp: "Ouvrir l'App ↗",
      buyNowSticky: "Acheter l'App · $49 USD",
      buyNowShort: "Acheter · $49",
      webDemoShort: "Démo Étapes 1 & 2",
      heroBadge: "ÉDITION OFFICIELLE BRANDBOOK 1.0 · ARCHITECTURE MONOLITHIQUE",
      heroTitle1: "De l'Idée au Manuel Officiel de 30 Planches Vectorielles",
      heroTitleAccent: "avec Aura en Temps Réel.",
      heroDesc: "Par les créateurs d'Acqua et ImproBears : stratégie socratique, ingénierie Kansei et synthèse vectorielle pure. Testez les Étapes 1 et 2 en direct.",
      heroCtaDemo: "Essayer la Démo Interactive",
      heroCtaBuy: "Acheter la Licence Pro · $49 USD",
      plateExplorerTag: "EXPLORATEUR VECTORIEL · BRANDBOOK 1.0 EN DIRECT",
      plateExplorerTitle: "Inspectez le Manuel de 30 Planches adapté à votre marque",
      plateExplorerSub: "Architecture Monolithique pure sans sous-marques forcées.",
      videoSectionTag: "VIDÉO THÉÂTRE & MASTERCLASS STRATÉGIQUE",
      videoSectionTitle: "Les 7 Étapes qui transforment le Chaos en Système de Marque",
      videoSectionSub: "Chaque étape dispose de sa capsule animée narrée par Aura.",
      videoPlayBtn: "Lire la Capsule",
      videoPauseBtn: "Pause",
      videoUnmuteBtn: "Activer le Son",
      videoMuteBtn: "Muet",
      deliverablesTag: "LIVRABLES OFFICIELS · PRODUCTION ÉDITORIALE",
      deliverablesTitle: "Une suite de 30 planches prête pour l'impression offset et le registre",
      deliverablesSub: "Courbes vectorielles parfaites (.PDF 30 planches, .HTML et .SVG).",
      demoSectionTag: "ATELIER EN DIRECT · DÉMO ÉTAPES 1 ET 2",
      demoSectionTitle: "Créez les Étapes 1 et 2 de votre marque ici même",
      demoSectionSub: "Correction orthographique et clarté exécutive en un clic.",
      demoStep1Tab: "ÉTAPE 1 · ADN ET CERCLE D'OR (WHY · HOW · WHAT)",
      demoStep2Tab: "ÉTAPE 2 · TOUCHPOINTS (AVANT · PENDANT · APRÈS)",
      demoBrandLabel: "Nom de votre Marque :",
      demoBrandPlaceholder: "Ex. THE BEST BRAND...",
      demoGiroLabel: "Activité Principale :",
      demoGiroPlaceholder: "Ex. Application d'identité de marque...",
      demoWhyLabel: "1. RAISON D'ÊTRE (WHY) :",
      demoHowLabel: "2. MÉTHODE (HOW) :",
      demoWhatLabel: "3. OFFRE DE VALEUR (WHAT) :",
      demoPolishBtn: "Corriger l'orthographe et clarifier la rédaction",
      demoNextToStep2: "Enregistrer et Passer aux Touchpoints (Étape 2) →",
      demoTpBeforeTitle: "1. AVANT L'ACHAT (Découverte)",
      demoTpDuringTitle: "2. PENDANT L'ACHAT (Expérience Centrale)",
      demoTpAfterTitle: "3. APRÈS L'ACHAT (Fidélité)",
      demoTpCustomPlaceholder: "Ajouter un point de contact...",
      demoTpAddBtn: "Ajouter",
      demoTransferBtn: "Continuer vers l'Atelier Complet (Étapes 0 à 6) →",
      demoBuyInlineBtn: "Acheter l'App & Débloquer 30 Planches ($49 USD)",
      goldenCircleTitle: "CERCLE D'OR EN DIRECT (SIMON SINEK)",
      platePreviewTitle: "COUVERTURE OFFICIELLE BRANDBOOK 1.0",
      authorityTag: "PHILOSOPHIE D'INGÉNIERIE · DU CHAOS AU SYSTÈME",
      authorityTitle: "L'Entreprise comme Personne : Force tranquille et esprit d'ingénieur",
      authorityDesc: "Conçu sous la direction de Jorge Benítez « El Oso » et ImproBears.",
      pricingTag: "LICENCE OFFICIELLE · ACCÈS À VIE",
      pricingTitle: "Obtenez The Best Brand et téléchargez vos 30 Planches",
      pricingSub: "Paiement sécurisé par Carte, Apple Pay, Google Pay ou PayPal.",
      planSingleName: "Licence Pro Entrepreneur",
      planSinglePrice: "$49 USD",
      planSinglePeriod: "Paiement unique à vie · Zéro abonnement",
      planAgencyName: "Licence Atelier Multi-Marques",
      planAgencyPrice: "$149 USD",
      planAgencyPeriod: "Marques illimitées + Pack Offset",
      checkoutTitle: "Acheter The Best Brand — Activation Immédiate",
      checkoutSubtitle: "Choisissez votre moyen de paiement sécurisé.",
      methodCard: "Carte",
      methodApplePay: "Apple Pay",
      methodGooglePay: "Google Pay",
      methodPayPal: "PayPal",
      cardHolderLabel: "Titulaire de la Carte :",
      cardNumberLabel: "Numéro de Carte :",
      cardExpiryLabel: "Expiration (MM/AA) :",
      cardCvcLabel: "CVC / CVV :",
      cardEmailLabel: "E-mail pour la Licence :",
      payNowCardBtn: "Payer et Activer la Licence Pro",
      payNowAppleBtn: "Autoriser avec Apple Pay",
      payNowGoogleBtn: "Payer avec Google Pay",
      payNowPayPalBtn: "Paiement Sécurisé avec PayPal",
      licenseActiveBadge: "LICENCE PRO ACTIVE"
    },
    pt: {
      brandTag: "BRANDBOOK 1.0 · ARQUITETURA MONOLÍTICA · ALGORITHMIC VISUAL IDENTITY",
      navPlates: "30 Lâminas ao Vivo",
      navMasterclass: "Vídeo Masterclass",
      navDeliverables: "Entregáveis",
      navDemo: "Demo Passos 1 e 2",
      navPricing: "Planos e Licenças",
      navOpenApp: "Abrir App ↗",
      buyNowSticky: "Comprar App · $49 USD",
      buyNowShort: "Comprar · $49",
      webDemoShort: "Demo Passos 1 e 2",
      heroBadge: "EDIÇÃO OFICIAL BRANDBOOK 1.0 · ARQUITETURA MONOLÍTICA",
      heroTitle1: "Da Ideia ao Manual Oficial de 30 Lâminas em Curvas",
      heroTitleAccent: "com Aura em Tempo Real.",
      heroDesc: "Pelos criadores de Acqua e ImproBears: estratégia socrática, engenharia Kansei e síntese vetorial pura.",
      heroCtaDemo: "Testar Demo Interativa (Passos 1 e 2)",
      heroCtaBuy: "Comprar Licença Pro · $49 USD",
      plateExplorerTag: "EXPLORADOR INTERATIVO · BRANDBOOK 1.0 AO VIVO",
      plateExplorerTitle: "Inspecione o Manual de 30 Lâminas adaptado à sua marca",
      plateExplorerSub: "Arquitetura Monolítica limpa sem submarcas forçadas.",
      videoSectionTag: "VÍDEO TEATRO E MASTERCLASS ESTRATÉGICA",
      videoSectionTitle: "Os 7 Passos que transformam o Caos em um Sistema de Marca",
      videoSectionSub: "Cada etapa conta com sua cápsula animada narrada pela Aura.",
      videoPlayBtn: "Reproduzir Cápsula",
      videoPauseBtn: "Pausar",
      videoUnmuteBtn: "Ativar Som",
      videoMuteBtn: "Silenciar",
      deliverablesTag: "ENTREGÁVEIS OFICIAIS · PRODUÇÃO EDITORIAL",
      deliverablesTitle: "Uma suíte de 30 lâminas pronta para gráfica offset e registro",
      deliverablesSub: "Vetorização matemática impecável (.PDF de 30 lâminas, .HTML e .SVG).",
      demoSectionTag: "EXPERIÊNCIA AO VIVO · DEMO PASSOS 1 E 2",
      demoSectionTitle: "Construa os Passos 1 e 2 da sua marca aqui mesmo",
      demoSectionSub: "Correção ortográfica e clareza executiva em 1 clique.",
      demoStep1Tab: "PASSO 1 · DNA E CÍRCULO DOURADO (WHY · HOW · WHAT)",
      demoStep2Tab: "PASSO 2 · TOUCHPOINTS (ANTES · DURANTE · DEPOIS)",
      demoBrandLabel: "Nome da Marca:",
      demoBrandPlaceholder: "Ex. THE BEST BRAND...",
      demoGiroLabel: "Atividade Principal:",
      demoGiroPlaceholder: "Ex. App que ajuda empresários...",
      demoWhyLabel: "1. PROPÓSITO NUCLEAR (WHY):",
      demoHowLabel: "2. MÉTODO DIFERENCIADOR (HOW):",
      demoWhatLabel: "3. OFERTA DE VALOR (WHAT):",
      demoPolishBtn: "Corrigir ortografia e clarear a redação",
      demoNextToStep2: "Salvar e Ir para Touchpoints (Passo 2) →",
      demoTpBeforeTitle: "1. ANTES DE COMPRAR (Descoberta)",
      demoTpDuringTitle: "2. DURANTE A COMPRA (Experiência Central)",
      demoTpAfterTitle: "3. DEPOIS DE COMPRAR (Fidelidade)",
      demoTpCustomPlaceholder: "Adicionar touchpoint próprio...",
      demoTpAddBtn: "Adicionar",
      demoTransferBtn: "Continuar no Estúdio Completo (Passos 0–6) →",
      demoBuyInlineBtn: "Comprar o App & Desbloquear 30 Lâminas ($49 USD)",
      goldenCircleTitle: "CÍRCULO DOURADO AO VIVO (SIMON SINEK)",
      platePreviewTitle: "CAPA OFICIAL BRANDBOOK 1.0",
      authorityTag: "FILOSOFIA DE ENGENHARIA · DO CAOS AO SISTEMA",
      authorityTitle: "A Empresa como Pessoa: Força serena e mente de engenheiro",
      authorityDesc: "Desenvolvido sob a liderança de Jorge Benítez «El Oso» e ImproBears.",
      pricingTag: "LICENÇA OFICIAL · ACESSO VITALÍCIO",
      pricingTitle: "Adquira The Best Brand e baixe suas 30 Lâminas",
      pricingSub: "Pagamento seguro via Cartão, Apple Pay, Google Pay ou PayPal.",
      planSingleName: "Licença Pro Empresário",
      planSinglePrice: "$49 USD",
      planSinglePeriod: "Pagamento único vitalício · Sem mensalidades",
      planAgencyName: "Licença Atelier Multi-Marca",
      planAgencyPrice: "$149 USD",
      planAgencyPeriod: "Marcas ilimitadas + Pacote Offset",
      checkoutTitle: "Comprar The Best Brand — Ativação Instantânea",
      checkoutSubtitle: "Selecione seu método de pagamento preferido.",
      methodCard: "Cartão",
      methodApplePay: "Apple Pay",
      methodGooglePay: "Google Pay",
      methodPayPal: "PayPal",
      cardHolderLabel: "Nome no Cartão:",
      cardNumberLabel: "Número do Cartão:",
      cardExpiryLabel: "Validade (MM/AA):",
      cardCvcLabel: "CVC / CVV:",
      cardEmailLabel: "E-mail para Licença:",
      payNowCardBtn: "Pagar e Ativar Licença Pro",
      payNowAppleBtn: "Autorizar com Apple Pay",
      payNowGoogleBtn: "Pagar com Google Pay",
      payNowPayPalBtn: "Pagar com PayPal",
      licenseActiveBadge: "LICENÇA PRO ATIVA"
    },
    de: {
      brandTag: "BRANDBOOK 1.0 · MONOLITHISCHE ARCHITEKTUR · ALGORITHMIC VISUAL IDENTITY",
      navPlates: "30 Live-Tafeln",
      navMasterclass: "Video-Masterclass",
      navDeliverables: "Ergebnisse",
      navDemo: "Live-Demo (1 & 2)",
      navPricing: "Preise & Lizenzen",
      navOpenApp: "App Öffnen ↗",
      buyNowSticky: "App kaufen · $49 USD",
      buyNowShort: "Kaufen · $49",
      webDemoShort: "Demo Schritte 1 & 2",
      heroBadge: "OFFIZIELLE EDITION BRANDBOOK 1.0 · MONOLITHISCHE ARCHITEKTUR",
      heroTitle1: "Von der Idee zum offiziellen 30-Tafeln-Markenhandbuch",
      heroTitleAccent: "mit Aura in Echtzeit.",
      heroDesc: "Von den Schöpfern von Acqua und ImproBears: Sokratische Strategie, Kansei-Engineering und reine Vektorkurven.",
      heroCtaDemo: "Interaktive Live-Demo starten",
      heroCtaBuy: "Pro-Lizenz kaufen · $49 USD",
      plateExplorerTag: "INTERAKTIVER VEKTOR-EXPLORER · BRANDBOOK 1.0",
      plateExplorerTitle: "Prüfen Sie das 30-Tafeln-Handbuch für Ihre Markenarchitektur",
      plateExplorerSub: "Reine monolithische Markenführung ohne erzwungene Submarken.",
      videoSectionTag: "VIDEO-THEATER & STRATEGISCHE MASTERCLASS",
      videoSectionTitle: "Die 7 Schritte, die Chaos in ein Markensystem verwandeln",
      videoSectionSub: "Jede Phase mit eigener animierter Kapsel mit Aura.",
      videoPlayBtn: "Kapsel abspielen",
      videoPauseBtn: "Pause",
      videoUnmuteBtn: "Ton an",
      videoMuteBtn: "Stumm",
      deliverablesTag: "OFFIZIELLE ERGEBNISSE · HIGH-END-PRODUKTION",
      deliverablesTitle: "Eine 30-Tafeln-Suite bereit für Offsetdruck und Markenregistrierung",
      deliverablesSub: "Mathematisch reine Vektorkurven (.PDF 30 Tafeln, .HTML und .SVG).",
      demoSectionTag: "LIVE-ERLEBNIS · DEMO SCHRITTE 1 & 2",
      demoSectionTitle: "Erleben Sie The Best Brand direkt hier",
      demoSectionSub: "Rechtschreibprüfung und klare Formulierung mit einem Klick.",
      demoStep1Tab: "SCHRITT 1 · MARKEN-DNA & GOLDEN CIRCLE",
      demoStep2Tab: "SCHRITT 2 · TOUCHPOINTS (VOR · WÄHREND · NACH)",
      demoBrandLabel: "Markenname:",
      demoBrandPlaceholder: "Z.B. THE BEST BRAND...",
      demoGiroLabel: "Geschäftsfeld:",
      demoGiroPlaceholder: "Z.B. App für Unternehmensidentität...",
      demoWhyLabel: "1. KERNZWECK (WHY):",
      demoHowLabel: "2. METHODE (HOW):",
      demoWhatLabel: "3. WERTANGEBOT (WHAT):",
      demoPolishBtn: "Rechtschreibung prüfen & klar formulieren",
      demoNextToStep2: "Weiter zu Touchpoints (Schritt 2) →",
      demoTpBeforeTitle: "1. VOR DEM KAUF (Entdeckung)",
      demoTpDuringTitle: "2. WÄHREND DES KAUFS (Erlebnis)",
      demoTpAfterTitle: "3. NACH DEM KAUF (Bindung)",
      demoTpCustomPlaceholder: "Touchpoint hinzufügen...",
      demoTpAddBtn: "Hinzufügen",
      demoTransferBtn: "Ins vollständige Studio übernehmen →",
      demoBuyInlineBtn: "App kaufen & 30 Tafeln freischalten ($49 USD)",
      goldenCircleTitle: "LIVE GOLDEN CIRCLE (SIMON SINEK)",
      platePreviewTitle: "OFFIZIELLES COVER BRANDBOOK 1.0",
      authorityTag: "INGENIEURSPHILOSOPHIE · VOM CHAOS ZUM SYSTEM",
      authorityTitle: "Das Unternehmen als Persönlichkeit: Ingenieurskunst & Ruhe",
      authorityDesc: "Entwickelt unter Leitung von Jorge Benítez «El Oso» und ImproBears.",
      pricingTag: "OFFIZIELLE LIZENZ · LEBENSLANGER ZUGANG",
      pricingTitle: "Holen Sie sich The Best Brand & laden Sie Ihre 30 Tafeln herunter",
      pricingSub: "Sicher zahlen mit Karte, Apple Pay, Google Pay oder PayPal.",
      planSingleName: "Pro-Lizenz Unternehmer",
      planSinglePrice: "$49 USD",
      planSinglePeriod: "Einmalzahlung auf Lebenszeit",
      planAgencyName: "Atelier Multi-Marken-Lizenz",
      planAgencyPrice: "$149 USD",
      planAgencyPeriod: "Unbegrenzte Marken + Offset-Paket",
      checkoutTitle: "The Best Brand kaufen — Sofortaktivierung",
      checkoutSubtitle: "Wählen Sie Ihre Zahlungsmethode.",
      methodCard: "Karte",
      methodApplePay: "Apple Pay",
      methodGooglePay: "Google Pay",
      methodPayPal: "PayPal",
      cardHolderLabel: "Karteninhaber:",
      cardNumberLabel: "Kartennummer:",
      cardExpiryLabel: "Gültig bis:",
      cardCvcLabel: "CVC:",
      cardEmailLabel: "E-Mail für Lizenz:",
      payNowCardBtn: "Jetzt zahlen & Pro-Lizenz aktivieren",
      payNowAppleBtn: "Mit Apple Pay autorisieren",
      payNowGoogleBtn: "Mit Google Pay zahlen",
      payNowPayPalBtn: "Mit PayPal zahlen",
      licenseActiveBadge: "PRO-LIZENZ AKTIV"
    },
    it: {
      brandTag: "BRANDBOOK 1.0 · ARCHITETTURA MONOLITICA · ALGORITHMIC VISUAL IDENTITY",
      navPlates: "30 Tavole Live",
      navMasterclass: "Video Masterclass",
      navDeliverables: "Deliverables",
      navDemo: "Demo Passi 1 e 2",
      navPricing: "Piani e Licenze",
      navOpenApp: "Apri App ↗",
      buyNowSticky: "Acquista App · $49 USD",
      buyNowShort: "Acquista · $49",
      webDemoShort: "Demo Passi 1 & 2",
      heroBadge: "EDIZIONE UFFICIALE BRANDBOOK 1.0 · ARCHITETTURA MONOLITICA",
      heroTitle1: "Dall'Idea al Manuale Ufficiale di 30 Tavole Vettoriali",
      heroTitleAccent: "con Aura in Tempo Reale.",
      heroDesc: "Dagli autori di Acqua e ImproBears: strategia socratica, ingegneria Kansei e curve vettoriali pure.",
      heroCtaDemo: "Prova la Demo Interattiva (Passi 1 e 2)",
      heroCtaBuy: "Acquista Licenza Pro · $49 USD",
      plateExplorerTag: "ESPLORATORE VETTORIALE · BRANDBOOK 1.0 DAL VIVO",
      plateExplorerTitle: "Ispeziona il Manuale di 30 Tavole cucito sul tuo brand",
      plateExplorerSub: "Architettura Monolitica pura senza sotto-brand forzati.",
      videoSectionTag: "VIDEO TEATRO E MASTERCLASS STRATEGICA",
      videoSectionTitle: "I 7 Passi che trasformano il Caos in un Sistema di Brand",
      videoSectionSub: "Ogni fase con la sua capsula animata narrata da Aura.",
      videoPlayBtn: "Riproduci Capsula",
      videoPauseBtn: "Pausa",
      videoUnmuteBtn: "Attiva Audio",
      videoMuteBtn: "Muto",
      deliverablesTag: "DELIVERABLES UFFICIALI · PRODUZIONE EDITORIALE",
      deliverablesTitle: "Una suite di 30 tavole pronta per stampa offset e registrazione",
      deliverablesSub: "Curve vettoriali perfette (.PDF 30 tavole, .HTML autonomo e .SVG).",
      demoSectionTag: "ESPERIENZA DAL VIVO · DEMO PASSI 1 E 2",
      demoSectionTitle: "Costruisci i Passi 1 e 2 del tuo brand qui stesso",
      demoSectionSub: "Correzione ortografica e chiarezza esecutiva in un clic.",
      demoStep1Tab: "PASSO 1 · DNA E CERCHIO D'ORO (WHY · HOW · WHAT)",
      demoStep2Tab: "PASSO 2 · TOUCHPOINTS (PRIMA · DURANTE · DOPO)",
      demoBrandLabel: "Nome del Brand:",
      demoBrandPlaceholder: "Es. THE BEST BRAND...",
      demoGiroLabel: "Attività Principale:",
      demoGiroPlaceholder: "Es. Un'app che aiuta gli imprenditori...",
      demoWhyLabel: "1. SCOPO NUCLEARE (WHY):",
      demoHowLabel: "2. METODO (HOW):",
      demoWhatLabel: "3. OFFERTA DI VALORE (WHAT):",
      demoPolishBtn: "Correggi ortografia e chiarezza",
      demoNextToStep2: "Salva e Continua ai Touchpoints (Passo 2) →",
      demoTpBeforeTitle: "1. PRIMA DELL'ACQUISTO (Scoperta)",
      demoTpDuringTitle: "2. DURANTE L'ACQUISTO (Esperienza)",
      demoTpAfterTitle: "3. DOPO L'ACQUISTO (Fidelizzazione)",
      demoTpCustomPlaceholder: "Aggiungi touchpoint...",
      demoTpAddBtn: "Aggiungi",
      demoTransferBtn: "Trasferisci allo Studio Completo (Passi 0–6) →",
      demoBuyInlineBtn: "Acquista l'App e Sblocca 30 Tavole ($49 USD)",
      goldenCircleTitle: "CERCHIO D'ORO DAL VIVO (SIMON SINEK)",
      platePreviewTitle: "COPERTINA UFFICIALE BRANDBOOK 1.0",
      authorityTag: "FILOSOFIA D'INGEGNERIA · DAL CAOS AL SISTEMA",
      authorityTitle: "L'Impresa come Persona: Forza serena e mente d'ingegnere",
      authorityDesc: "Sviluppato sotto la guida di Jorge Benítez «El Oso» e ImproBears.",
      pricingTag: "LICENZA UFFICIALE · ACCESSO A VITA",
      pricingTitle: "Ottieni The Best Brand e scarica le tue 30 Tavole",
      pricingSub: "Paga in sicurezza con Carta, Apple Pay, Google Pay o PayPal.",
      planSingleName: "Licenza Pro Imprenditore",
      planSinglePrice: "$49 USD",
      planSinglePeriod: "Pagamento unico a vita · Zero abbonamenti",
      planAgencyName: "Licenza Atelier Multi-Brand",
      planAgencyPrice: "$149 USD",
      planAgencyPeriod: "Brand illimitati + Pacchetto Offset",
      checkoutTitle: "Acquista The Best Brand — Attivazione Istantanea",
      checkoutSubtitle: "Seleziona il metodo di pagamento preferito.",
      methodCard: "Carta",
      methodApplePay: "Apple Pay",
      methodGooglePay: "Google Pay",
      methodPayPal: "PayPal",
      cardHolderLabel: "Titolare Carta:",
      cardNumberLabel: "Numero Carta:",
      cardExpiryLabel: "Scadenza:",
      cardCvcLabel: "CVC:",
      cardEmailLabel: "Email per Ricevuta:",
      payNowCardBtn: "Paga e Attiva Licenza Pro Ora",
      payNowAppleBtn: "Autorizza con Apple Pay",
      payNowGoogleBtn: "Paga con Google Pay",
      payNowPayPalBtn: "Paga con PayPal",
      licenseActiveBadge: "LICENZA PRO ATTIVA"
    }
  };

  function getLang() {
    try {
      const saved = (localStorage.getItem(LANG_STORAGE_KEY) || "es").toLowerCase().trim();
      return I18N[saved] ? saved : "es";
    } catch (e) {
      return "es";
    }
  }

  function t(key) {
    const l = getLang();
    return (I18N[l] && I18N[l][key]) || I18N.es[key] || key;
  }

  function escHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------------------------------------------------------------------------
  // 2. METADATOS DE LAS 7 CÁPSULAS TEÓRICAS DE VIDEO REALES
  // ---------------------------------------------------------------------------
  const VIDEO_CAPSULES = [
    {
      step: 0,
      title: "Recorrido Completo: Cómo Aura Construye tu Marca en 7 Pasos",
      author: "Aura · Mentora de Marca con IA",
      duration: "02:48",
      url: "/assets/videos/capsula_teoria_aura_recorrido.mp4",
      poster: "/assets/videos/poster_aura_recorrido.jpg",
      quote: "«The Best Brand te da el control total: de tu propósito nuclear al Manual Oficial de Marca de 30 Hojas en Curvas listo para imprenta en minutos.»"
    },
    {
      step: 1,
      title: "Paso 1: Diálogo Socrático Nuclear (Círculo Dorado)",
      author: "Simon Sinek & Donald Miller",
      duration: "00:44",
      url: "/assets/videos/capsula_teoria_paso_1.mp4",
      poster: "/assets/videos/poster_paso_1.jpg",
      quote: "«La gente no compra lo que haces, sino el porqué lo haces (Start With Why).»"
    },
    {
      step: 2,
      title: "Paso 2: Ingeniería de Touchpoints (Antes · Durante · Después)",
      author: "Jan Carlzon & Don Norman",
      duration: "00:43",
      url: "/assets/videos/capsula_teoria_paso_2.mp4",
      poster: "/assets/videos/poster_paso_2.jpg",
      quote: "«En quince segundos de contacto tu cliente decide si confía para siempre en tu marca.»"
    },
    {
      step: 3,
      title: "Paso 3: Fonética y Naming Estratégico",
      author: "Alexandra Watkins & David Placek",
      duration: "00:43",
      url: "/assets/videos/capsula_teoria_paso_3.mp4",
      poster: "/assets/videos/poster_paso_3.jpg",
      quote: "«Un gran nombre reduce a la mitad tu costo de adquisición de clientes.»"
    },
    {
      step: 4,
      title: "Paso 4: Calibración Visual Kansei y Tipografías",
      author: "Mitsuo Nagamachi & Robert Bringhurst",
      duration: "00:47",
      url: "/assets/videos/capsula_teoria_paso_4.mp4",
      poster: "/assets/videos/poster_paso_4.jpg",
      quote: "«La tipografía y la geometría transmiten confianza visceral antes de que la razón intervenga.»"
    },
    {
      step: 5,
      title: "Paso 5: Síntesis Vectorial 3D y Logotipo",
      author: "Paul Rand & Jony Ive",
      duration: "00:45",
      url: "/assets/videos/capsula_teoria_paso_5.mp4",
      poster: "/assets/videos/poster_paso_5.jpg",
      quote: "«El diseño no es solo cómo se ve, sino cómo transforma la complejidad en belleza y función.»"
    },
    {
      step: 6,
      title: "Paso 6: La Bóveda de Manual de Marca de 30 Hojas en Curvas",
      author: "Massimo Vignelli & Josef Müller-Brockmann",
      duration: "00:48",
      url: "/assets/videos/capsula_teoria_paso_6.mp4",
      poster: "/assets/videos/poster_paso_6.jpg",
      quote: "«El orden tipográfico y la disciplina de retícula convierten una idea en un imperio.»"
    }
  ];

  const YOUTUBE_METHODOLOGY_AUTHORS = [
    {
      id: "qp0HIF3SfI4",
      author: "Simon Sinek",
      channel: "TED Talk Oficial",
      step: "Paso 1 · Círculo Dorado",
      title: "How Great Leaders Inspire Action",
      duration: "18:04",
      topic: "Por qué el 'Why' define a las marcas más rentables del mundo."
    },
    {
      id: "7X_WvGAhMlQ",
      author: "Jan Carlzon",
      channel: "SAS Leadership Series",
      step: "Paso 2 · Touchpoints",
      title: "Moments of Truth: Managing Customer Experience",
      duration: "14:22",
      topic: "Cómo 50,000 interacciones diarias forjan o destruyen el prestigio corporativo."
    },
    {
      id: "W_K_0rM9q38",
      author: "Al Ries & Jack Trout",
      channel: "Marketing Masters",
      step: "Paso 3 · Naming & Niza",
      title: "The 22 Immutable Laws of Branding & Positioning",
      duration: "24:15",
      topic: "La batalla por la mente del consumidor a través del nombre y la categoría única."
    },
    {
      id: "5893_Kansei",
      idVideo: "rDkaXDDg88c",
      author: "Mitsuhiro Nagamachi & Jony Ive",
      channel: "Design Philosophy Archive",
      step: "Paso 4 · Brújula Kansei",
      title: "Kansei Engineering & Sensory Design Architecture",
      duration: "19:40",
      topic: "Traducción de estados psicológicos y tacto a geometría y color."
    },
    {
      id: "ybuT4EsqU3A",
      author: "Marty Neumeier",
      channel: "The Futur",
      step: "Paso 5 · Identidad Visual",
      title: "The Brand Gap: How to Bridge Strategy and Design",
      duration: "32:10",
      topic: "Diferenciación radical, diseño carismático y síntesis icónica."
    },
    {
      id: "mYF2_FBCvXw",
      author: "Michael Porter",
      channel: "Harvard Business School",
      step: "Paso 6 · Manual Operativo",
      title: "What is Strategy? Sustainable Competitive Advantage",
      duration: "27:50",
      topic: "Estandarización, manuales operativos y blindaje de activos intangibles."
    },
    {
      id: "bU22pUq2eUQ",
      author: "Alexander Osterwalder",
      channel: "Strategyzer",
      step: "Pilares · Business Model",
      title: "Business Model Canvas & Value Proposition Design",
      duration: "22:18",
      topic: "Alineación de propuesta de valor con customer segments y touchpoints."
    }
  ];

  const FOUNDER_ESSENTIAL_BOOKS = [
    {
      id: "bmg_osterwalder",
      category: "canvas",
      categoryLabel: "Modelo de Negocio & Canvas",
      title: "Generación de Modelos de Negocio",
      author: "Alexander Osterwalder & Yves Pigneur",
      takeaway: "El manual imprescindible para diseñar, estructurar y desafiar propuestas de valor de vanguardia en un solo lienzo visual.",
      kindleUrl: "https://www.amazon.com.mx/dp/B01B3J471E",
      appleBooksUrl: "https://books.apple.com/us/book/business-model-generation/id420803588",
      coverImg: "osterwalder_bmg.jpg",
      badgeColor: "#0D2540"
    },
    {
      id: "vpd_osterwalder",
      category: "canvas",
      categoryLabel: "Propuesta de Valor",
      title: "Diseñando la Propuesta de Valor",
      author: "Alexander Osterwalder, Yves Pigneur, Greg Bernarda",
      takeaway: "Cómo crear productos y servicios que los clientes realmente desean, encajando el perfil del cliente con el mapa de valor.",
      kindleUrl: "https://www.amazon.com.mx/dp/B00P0L6W7A",
      appleBooksUrl: "https://books.apple.com/us/book/value-proposition-design/id927699748",
      coverImg: "osterwalder_vpd.jpg",
      badgeColor: "#0D2540"
    },
    {
      id: "start_with_why",
      category: "branding",
      categoryLabel: "Propósito Nuclear",
      title: "Start with Why: How Great Leaders Inspire Everyone",
      author: "Simon Sinek",
      takeaway: "Base del Paso 1 en The Best Brand: la gente no compra lo que haces, sino por qué lo haces.",
      kindleUrl: "https://www.amazon.com/dp/B002Q6XUE4",
      appleBooksUrl: "https://books.apple.com/us/book/start-with-why/id359902640",
      coverImg: "sinek_why.jpg",
      badgeColor: "#0D2540"
    },
    {
      id: "moments_truth",
      category: "branding",
      categoryLabel: "Experiencia & Touchpoints",
      title: "Moments of Truth",
      author: "Jan Carlzon",
      takeaway: "Base del Paso 2: cada interacción de 15 segundos entre cliente y empresa define la lealtad y el valor de marca.",
      kindleUrl: "https://www.amazon.com/dp/B001ANYDL0",
      appleBooksUrl: "https://books.apple.com/us/book/moments-of-truth/id1504958327",
      coverImg: "carlzon_truth.jpg",
      badgeColor: "#0D2540"
    },
    {
      id: "brand_gap",
      category: "story",
      categoryLabel: "Identidad & Diseño",
      title: "The Brand Gap",
      author: "Marty Neumeier",
      takeaway: "Cómo tender un puente indestructible entre la estrategia analítica de negocios y la creatividad intuitiva del diseño.",
      kindleUrl: "https://www.amazon.com/dp/B000SEI7P8",
      appleBooksUrl: "https://books.apple.com/us/book/the-brand-gap/id496263434",
      coverImg: "neumeier_gap.jpg",
      badgeColor: "#0D2540"
    },
    {
      id: "positioning_ries",
      category: "story",
      categoryLabel: "Posicionamiento & Naming",
      title: "Positioning: The Battle for Your Mind",
      author: "Al Ries & Jack Trout",
      takeaway: "Base del Paso 3: el posicionamiento no es lo que le haces al producto, sino lo que construyes en la mente del prospecto.",
      kindleUrl: "https://www.amazon.com/dp/B000OI0F4K",
      appleBooksUrl: "https://books.apple.com/us/book/positioning-the-battle-for-your-mind/id496277918",
      coverImg: "ries_positioning.jpg",
      badgeColor: "#0D2540"
    },
    {
      id: "lean_startup",
      category: "canvas",
      categoryLabel: "Emprendimiento & Validación",
      title: "The Lean Startup",
      author: "Eric Ries",
      takeaway: "Aprender rápido a través de ciclos de creación-medición-aprendizaje, eliminando el desperdicio de meses en proyectos no validados.",
      kindleUrl: "https://www.amazon.com/dp/B004J4XGN6",
      appleBooksUrl: "https://books.apple.com/us/book/the-lean-startup/id436979505",
      coverImg: "ries_lean.jpg",
      badgeColor: "#0D2540"
    },
    {
      id: "zero_to_one",
      category: "branding",
      categoryLabel: "Estrategia de Monopolio",
      title: "Zero to One: Notes on Startups",
      author: "Peter Thiel & Blake Masters",
      takeaway: "Cómo construir empresas que crean cosas verdaderamente nuevas y escapan de la competencia destructiva por precio.",
      kindleUrl: "https://www.amazon.com/dp/B00J6YBOFQ",
      appleBooksUrl: "https://books.apple.com/us/book/zero-to-one/id826477148",
      coverImg: "thiel_zero.jpg",
      badgeColor: "#0D2540"
    }
  ];

  // ---------------------------------------------------------------------------
  // 3. ESTADO REACTIVO DEL ATELIER COMERCIAL V58.0
  // ---------------------------------------------------------------------------
  window.tbbCommercialDemoState = {
    activeDemoStep: 1,
    activeVideoStep: 0,
    activeExplorerPlate: 1, // 1, 4, 6, 8, 14, 20
    videoIsPlaying: false,
    videoMuted: true,
    mobileDrawerOpen: false,
    brandName: "THE BEST BRAND",
    tagline: "YOUR BRAND, NOW!!!",
    businessGiro: "Plataforma interactiva que ayuda a empresarios a definir la identidad estratégica y el manual oficial de Manual de Marca de 30 Hojas en curvas de su empresa.",
    whyPurpose: "Porque creemos que la claridad de marca multiplica el valor de las empresas y libera tiempo mental al líder.",
    howMethod: "Combinamos el acompañamiento socrático de Aura, ingeniería Kansei y síntesis vectorial en curvas paso a paso.",
    whatOffer: "Plataforma interactiva y manual oficial de Manual de Marca de 30 Hojas en curvas listo para registro, impresión y despliegue digital.",
    tpBefore: ["Búsqueda Web y App Store", "Demostración Interactiva en Línea (Pasos 1 y 2)", "Recomendación Directa de Empresarios"],
    tpDuring: ["Taller Guiado por Voz con Aura", "Lienzo Generativo de Logotipo en Tiempo Real", "Checkout Directo con Apple Pay, Google Pay y Tarjeta"],
    tpAfter: ["Bóveda Digital de Manual de Marca de 30 Hojas en PDF y HTML", "Actualizaciones Multilingües en la Nube", "Programa de Lealtad y Expansión de Marca"],
    auraQuote: "«Como afirma Simon Sinek en Start With Why, las personas no compran lo que haces, sino el propósito por el que lo haces.»",
    auraAuthorRef: "SIMON SINEK · START WITH WHY",
    selectedPlan: "pro_atelier",
    selectedPaymentMethod: "card"
  };

  function syncDemoStateFromAppIfAvailable() {
    try {
      const cs = (typeof window.canvasState === "object" && window.canvasState) ? window.canvasState : null;
      if (!cs) return;
      const st = window.tbbCommercialDemoState;
      if (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) st.brandName = cs.brandName;
      if (cs.tagline) st.tagline = cs.tagline;
      if (cs.custom_business_type && cs.custom_business_type.length > 12) st.businessGiro = cs.custom_business_type;
      if (cs.golden_circle && cs.golden_circle.length > 12) st.whyPurpose = cs.golden_circle;
      if (cs.process_steps_text && cs.process_steps_text.length > 12) st.howMethod = cs.process_steps_text;
      if (cs.value_offer && cs.value_offer.length > 12) st.whatOffer = cs.value_offer;
    } catch (e) {}
  }

  window.tbbSyncCommercialDemoToAppState = function () {
    const st = window.tbbCommercialDemoState;
    try {
      if (typeof window.canvasState === "object" && window.canvasState) {
        window.canvasState.brandName = st.brandName || "THE BEST BRAND";
        window.canvasState.tagline = st.tagline || "YOUR BRAND, NOW!!!";
        window.canvasState.custom_business_type = st.businessGiro;
        window.canvasState.step0_short_essence = st.businessGiro.split(/\s+/).slice(0, 7).join(" ");
        window.canvasState.golden_circle = st.whyPurpose;
        window.canvasState.process_steps_text = st.howMethod;
        window.canvasState.value_offer = st.whatOffer;
        window.canvasState.tp_before = st.tpBefore.join(", ");
        window.canvasState.tp_during = st.tpDuring.join(", ");
        window.canvasState.tp_after = st.tpAfter.join(", ");
      }
      if (typeof window.tpExtractedItems === "object" && window.tpExtractedItems) {
        window.tpExtractedItems.before = [...st.tpBefore];
        window.tpExtractedItems.during = [...st.tpDuring];
        window.tpExtractedItems.after = [...st.tpAfter];
      }
      if (typeof window.saveBrandSessionToLocalStorage === "function") {
        window.saveBrandSessionToLocalStorage();
      }
      localStorage.setItem("tbb_commercial_demo_snapshot_v56", JSON.stringify(st));
    } catch (e) {}
  };

  // ---------------------------------------------------------------------------
  // 4. RETROALIMENTACIÓN EJECUTIVA DE AURA (<= 10S CON REFERENCIA DE AUTOR)
  // ---------------------------------------------------------------------------
  const AURA_BRIEFS = {
    why: [
      { ref: "SIMON SINEK · START WITH WHY", text: "Como afirma Simon Sinek, cuando tu propósito es claro, inspiras confianza inmediata y dejas de competir por precio." },
      { ref: "MARTY NEUMEIER · THE BRAND GAP", text: "Como enseña Marty Neumeier, una marca poderosa es el sentimiento visceral que despiertas en tus clientes." }
    ],
    how: [
      { ref: "MICHAEL PORTER · ESTRATEGIA COMPETITIVA", text: "Como explica Michael Porter, la verdadera ventaja nace de ejecutar tus procesos de forma única y medible." },
      { ref: "DONALD MILLER · STORYBRAND", text: "Como demuestra Donald Miller, cuando sintetizas tu método con claridad, eliminas toda fricción de compra." }
    ],
    what: [
      { ref: "ALEX OSTERWALDER · PROPUESTA DE VALOR", text: "Como señala Alex Osterwalder, una oferta contundente resuelve problemas reales y entrega valor tangible." },
      { ref: "PETER DRUCKER · INNOVACIÓN Y EMPRESA", text: "Como enseñó Peter Drucker, la excelencia consiste en convertir estrategia en resultados verificables." }
    ],
    touchpoint: [
      { ref: "JAN CARLZON · MOMENTOS DE LA VERDAD", text: "Como demostró Jan Carlzon, cada punto de contacto de quince segundos decide la lealtad de tu cliente." },
      { ref: "DON NORMAN · DISEÑO EMOCIONAL", text: "Como enseña Don Norman, articular el antes, durante y después convierte un servicio en un sistema memorable." }
    ]
  };

  window.tbbTriggerCommercialAuraFeedback = function (category) {
    const st = window.tbbCommercialDemoState;
    const pool = AURA_BRIEFS[category] || AURA_BRIEFS.why;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    st.auraAuthorRef = pick.ref;
    st.auraQuote = `«${pick.text}»`;

    const qEl = document.getElementById("tbbCommAuraQuoteText");
    const rEl = document.getElementById("tbbCommAuraRefBadge");
    if (qEl) qEl.textContent = st.auraQuote;
    if (rEl) rEl.textContent = `AURA · ${st.auraAuthorRef}`;

    if (typeof window.speakAuraBriefResponse === "function") {
      window.speakAuraBriefResponse(pick.text, 9200);
    }
  };

  // ---------------------------------------------------------------------------
  // 5. EMBLEMA OFICIAL BRANDBOOK 1.0 Y CÍRCULO DORADO 100% CIRCULAR MULTILÍNEA
  // ---------------------------------------------------------------------------
  window.tbbBuildOfficialBrandbook1EmblemSVG = function (size = 120) {
    const uid = Math.random().toString(36).slice(2, 7);
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" style="display:block; flex-shrink:0;">
        <defs>
          <radialGradient id="tbbEmbCore_${uid}" cx="50%" cy="46%" r="54%">
            <stop offset="0%" stop-color="#0D2540"/>
            <stop offset="62%" stop-color="#090D16"/>
            <stop offset="100%" stop-color="#050811"/>
          </radialGradient>
          <radialGradient id="tbbEmbAmberGlow_${uid}" cx="50%" cy="50%" r="48%">
            <stop offset="0%" stop-color="#F0F7FF"/>
            <stop offset="28%" stop-color="#0D2540"/>
            <stop offset="68%" stop-color="#0D2540" stop-opacity="0.58"/>
            <stop offset="100%" stop-color="#090D16" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="tbbEmbRingBlue_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#60A5FA"/>
            <stop offset="50%" stop-color="#1D4ED8"/>
            <stop offset="100%" stop-color="#0D2540"/>
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r="83" fill="url(#tbbEmbCore_${uid})" stroke="url(#tbbEmbRingBlue_${uid})" stroke-width="4.5"/>
        <circle cx="90" cy="90" r="64" fill="url(#tbbEmbAmberGlow_${uid})"/>
        <g transform="translate(90,90)">
          <ellipse rx="52" ry="20" fill="none" stroke="#3B82F6" stroke-width="2.2" opacity="0.88"/>
          <ellipse rx="52" ry="20" transform="rotate(45)" fill="none" stroke="#60A5FA" stroke-width="2.2" opacity="0.88"/>
          <ellipse rx="52" ry="20" transform="rotate(90)" fill="none" stroke="#0D2540" stroke-width="2.2" opacity="0.92"/>
          <ellipse rx="52" ry="20" transform="rotate(135)" fill="none" stroke="#4C9DE6" stroke-width="2.2" opacity="0.92"/>
          <circle cx="0" cy="0" r="11.5" fill="#0D2540" stroke="#FFFFFF" stroke-width="2.5"/>
          <circle cx="0" cy="0" r="4.5" fill="#FFFFFF"/>
        </g>
      </svg>
    `;
  };

  // Parte un texto en 2 líneas equilibradas que jamás desbordan el ancho de cuerda circular
  function splitIntoTwoChordLines(str, maxCharsLine1, maxCharsLine2) {
    const clean = String(str || "").replace(/\s+/g, " ").trim();
    if (!clean) return ["—", ""];
    const words = clean.split(" ");
    let line1 = "";
    let idx = 0;
    while (idx < words.length) {
      const candidate = line1 ? `${line1} ${words[idx]}` : words[idx];
      if (candidate.length <= maxCharsLine1) {
        line1 = candidate;
        idx++;
      } else {
        break;
      }
    }
    if (!line1) {
      line1 = clean.slice(0, maxCharsLine1);
      const rest = clean.slice(maxCharsLine1, maxCharsLine1 + maxCharsLine2);
      return [line1, rest ? `${rest}…` : ""];
    }
    const remaining = words.slice(idx).join(" ");
    if (!remaining) return [line1, ""];
    if (remaining.length <= maxCharsLine2) return [line1, remaining];
    return [line1, remaining.slice(0, maxCharsLine2 - 1).trim() + "…"];
  }

  window.tbbBuildCircularGoldenCircleSVG = function () {
    const st = window.tbbCommercialDemoState;
    const [whatL1, whatL2] = splitIntoTwoChordLines(st.whatOffer, 30, 34);
    const [howL1, howL2] = splitIntoTwoChordLines(st.howMethod, 24, 26);
    const [whyL1, whyL2] = splitIntoTwoChordLines(st.whyPurpose, 18, 18);

    return `
      <svg viewBox="0 0 380 380" width="100%" height="300" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto; max-width:340px;">
        <defs>
          <radialGradient id="gcWhyCoreV58" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#4C9DE6"/>
            <stop offset="65%" stop-color="#0D2540"/>
            <stop offset="100%" stop-color="#071526"/>
          </radialGradient>
          <filter id="gcShadowV58" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#090D16" flood-opacity="0.14"/>
          </filter>
        </defs>

        <!-- ANILLO EXTERIOR 100% CIRCULAR: 3. WHAT (r=172, centro 190,190) -->
        <circle cx="190" cy="190" r="172" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="3" filter="url(#gcShadowV58)"/>
        <text x="190" y="42" text-anchor="middle" fill="#1D4ED8" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="800" letter-spacing="0.04em">3. QUÉ ENTREGAS (WHAT)</text>
        <text x="190" y="57" text-anchor="middle" fill="#090D16" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.6" font-weight="700">
          <tspan x="190" dy="0">${escHtml(whatL1)}</tspan>
          ${whatL2 ? `<tspan x="190" dy="11.5">${escHtml(whatL2)}</tspan>` : ""}
        </text>

        <!-- ANILLO INTERMEDIO 100% CIRCULAR: 2. HOW (r=118, centro 190,206) -->
        <circle cx="190" cy="206" r="118" fill="#FFFFFF" stroke="#1D4ED8" stroke-width="2.5" stroke-dasharray="6 4"/>
        <text x="190" y="114" text-anchor="middle" fill="#1E40AF" font-family="'JetBrains Mono', monospace" font-size="9.2" font-weight="800" letter-spacing="0.03em">2. CÓMO LO HACES (HOW)</text>
        <text x="190" y="128" text-anchor="middle" fill="#1E293B" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.2" font-weight="700">
          <tspan x="190" dy="0">${escHtml(howL1)}</tspan>
          ${howL2 ? `<tspan x="190" dy="11">${escHtml(howL2)}</tspan>` : ""}
        </text>

        <!-- NÚCLEO CENTRAL 100% CIRCULAR: 1. WHY (r=66, centro 190,224) -->
        <circle cx="190" cy="224" r="66" fill="url(#gcWhyCoreV58)" stroke="#090D16" stroke-width="3" filter="url(#gcShadowV58)"/>
        <text x="190" y="203" text-anchor="middle" fill="#F0F7FF" font-family="'JetBrains Mono', monospace" font-size="9.2" font-weight="800">1. POR QUÉ (WHY)</text>
        <text x="190" y="216" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.8" font-weight="900">PROPÓSITO NUCLEAR</text>
        <text x="190" y="230" text-anchor="middle" fill="#FFEDD5" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.6" font-weight="700">
          <tspan x="190" dy="0">${escHtml(whyL1)}</tspan>
          ${whyL2 ? `<tspan x="190" dy="10.5">${escHtml(whyL2)}</tspan>` : ""}
        </text>
      </svg>
    `;
  };

  // ---------------------------------------------------------------------------
  // 6. PORTADA OFICIAL BRANDBOOK 1.0 (FIEL AL DOCUMENTO EN GOOGLE DRIVE)
  // ---------------------------------------------------------------------------
  window.tbbBuildBrandbook1CoverPreviewHTML = function () {
    const st = window.tbbCommercialDemoState;
    const bName = (st.brandName || "THE BEST BRAND").toUpperCase();
    const bTag = (st.tagline || "YOUR BRAND, NOW!!!").toUpperCase();
    const bGiro = st.businessGiro || "Soluciones Estratégicas, Ingeniería de Valor y Experiencia de Marca.";

    return `
      <div data-tbb-tilt style="position:relative; background:linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%); border:2px solid #CBD5E1; border-radius:20px; overflow:hidden; padding:22px 20px 16px 20px; box-shadow:0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.12); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1);">
        <!-- Polígono Naranja Superior Izquierdo + Doble Línea Arquitectónica (Idéntico a Brandbook 1.0 en Drive) -->
        <div style="position:absolute; top:0; left:0; width:56%; height:52px; background:linear-gradient(90deg, #0D2540 0%, #0D2540 50%, #0D2540 100%); clip-path:polygon(0 0, 100% 0, 78% 100%, 0 100%); z-index:1;"></div>
        <div style="position:absolute; top:0; left:0; width:59%; height:57px; border-bottom:1.5px solid #475569; clip-path:polygon(0 0, 100% 0, 78% 100%, 0 100%); pointer-events:none; z-index:1;"></div>
        <!-- Matriz de Puntos Arquitectónicos sutil en la esquina superior izquierda -->
        <div style="position:absolute; top:14px; left:18px; width:44px; height:16px; background-image:radial-gradient(#071526 1px, transparent 1px); background-size:6px 6px; opacity:0.55; z-index:2;"></div>

        <!-- Polígono Inferior Derecho de Cierre Arquitectónico -->
        <div style="position:absolute; bottom:24px; right:0; width:36%; height:44px; background:#E2E8F0; clip-path:polygon(28% 0, 100% 0, 100% 100%, 0 100%); opacity:0.65; z-index:1;"></div>

        <div style="position:relative; z-index:3; margin-top:40px; display:grid; grid-template-columns:1.32fr 0.88fr; gap:14px; align-items:center;">
          <!-- Columna Izquierda Editorial -->
          <div>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.56rem; font-weight:800; color:#0D2540; letter-spacing:0.05em; text-transform:uppercase;">
              MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA · ARQUITECTURA MONOLÍTICA
            </div>
            <div style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:1.38rem; font-weight:900; color:#090D16; line-height:1.06; margin-top:3px; letter-spacing:-0.02em;">
              ${escHtml(bName)}
            </div>
            <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:0.68rem; font-weight:900; color:#090D16; margin-top:2px; letter-spacing:0.02em;">
              ${escHtml(bTag)}
            </div>
            <div style="display:flex; align-items:center; gap:5px; margin:7px 0;">
              <span style="width:52px; height:3.5px; background:#1D4ED8; display:inline-block;"></span>
              <span style="width:6px; height:6px; background:#0D2540; display:inline-block;"></span>
            </div>
            <div style="font-size:0.68rem; font-weight:800; color:#090D16; line-height:1.32; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${escHtml(bGiro)}
            </div>
            <div style="font-size:0.58rem; font-weight:600; color:#475569; line-height:1.3; margin-top:4px;">
              Sistema rector con Arquitectura Monolítica de Marca Única, Círculo Dorado, La Empresa como Persona e Ingeniería de Touchpoints.
            </div>

            <!-- 4 Sellos Monolíticos Oficiales (Idénticos a la portada en Drive, CERO submarcas) -->
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:5px; margin-top:10px;">
              ${[
                { lbl: "FIRMA PRINCIPAL", sub: "100% UNIFICADA" },
                { lbl: "EMBLEMA CENTRAL", sub: "NÚCLEO AURA" },
                { lbl: "ICONO DIGITAL", sub: "APP 1:1 iOS" },
                { lbl: "SELLO CALIDAD", sub: "30 LÁMINAS" }
              ].map(badge => `
                <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:6px; padding:5px 3px; display:flex; flex-direction:column; align-items:center; text-align:center;">
                  ${window.tbbBuildOfficialBrandbook1EmblemSVG(24)}
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.44rem; font-weight:800; color:#0D2540; margin-top:3px; line-height:1.1;">${badge.lbl}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Columna Derecha: Marco Arquitectónico con Emblema Circular -->
          <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:10px; padding:12px 10px; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; box-shadow:inset 0 0 0 1px #FFFFFF;">
            <div style="position:absolute; top:7px; left:7px; width:16px; height:16px; border-top:2px solid #0D2540; border-left:2px solid #0D2540;"></div>
            <div style="position:absolute; bottom:7px; right:7px; width:16px; height:16px; border-bottom:2px solid #0D2540; border-right:2px solid #0D2540;"></div>
            ${window.tbbBuildOfficialBrandbook1EmblemSVG(92)}
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.48rem; font-weight:800; color:#090D16; margin-top:7px; text-align:center; letter-spacing:0.03em;">
              ARQUITECTURA MONOLÍTICA · TRAZOS GEOMÉTRICOS
            </div>
            <div style="font-size:0.46rem; font-weight:700; color:#475569; margin-top:1px; text-align:center;">
              Versión Positiva sobre Lienzo Claro (#FFFFFF) · LÁMINA 01 / 30
            </div>
          </div>
        </div>

        <!-- Pie de Lámina 01 -->
        <div style="position:relative; z-index:3; margin-top:12px; padding-top:7px; border-top:1px solid #CBD5E1; display:flex; justify-content:space-between; align-items:center; font-family:'JetBrains Mono', monospace; font-size:0.50rem; font-weight:800; color:#090D16;">
          <div style="display:flex; align-items:center; gap:5px;">
            <span style="width:7px; height:7px; border-radius:50%; background:#0D2540; display:inline-block;"></span>
            <span>${escHtml(bName)} · ${escHtml(bTag)}</span>
          </div>
          <div style="color:#0D2540;">IDENTIDAD · ESTRATEGIA · EJECUCIÓN · CRECIMIENTO · PÁG. 01</div>
        </div>
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // 7. EXPLORADOR INTERACTIVO EN VIVO DE 6 LÁMINAS MAESTRAS DEL BRANDBOOK 1.0
  // ---------------------------------------------------------------------------
  window.tbbSelectExplorerPlate = function (plateNum) {
    window.tbbCommercialDemoState.activeExplorerPlate = Number(plateNum) || 1;
    const stage = document.getElementById("tbbExplorerPlateLiveStage");
    if (stage) {
      stage.innerHTML = window.tbbBuildExplorerPlateStageHTML(window.tbbCommercialDemoState.activeExplorerPlate);
    }
    [1, 4, 6, 8, 14, 20].forEach(n => {
      const btn = document.getElementById(`tbbExpTab_${n}`);
      if (btn) btn.classList.toggle("is-active", n === window.tbbCommercialDemoState.activeExplorerPlate);
    });
  };

  window.tbbBuildExplorerPlateStageHTML = function (plateNum) {
    const st = window.tbbCommercialDemoState;
    const bName = (st.brandName || "THE BEST BRAND").toUpperCase();
    const bTag = (st.tagline || "YOUR BRAND, NOW!!!").toUpperCase();

    if (plateNum === 1) {
      return `
        <div style="max-width:780px; margin:0 auto;">
          ${window.tbbBuildBrandbook1CoverPreviewHTML()}
        </div>
      `;
    }

    const plateHeader = (numStr, secLabel, titleLabel) => `
      <div style="position:relative; padding-bottom:12px; margin-bottom:16px; border-bottom:1.5px solid #CBD5E1; display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; align-items:center; gap:10px;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG(34)}
          <div>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; color:#0D2540;">${secLabel}</div>
            <div style="font-family:'Montserrat', sans-serif; font-size:1.12rem; font-weight:900; color:#090D16;">${titleLabel}</div>
          </div>
        </div>
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; font-weight:800; color:#090D16; border-bottom:3px solid #0D2540; padding-bottom:2px;">
          ARQUITECTURA MONOLÍTICA · LÁMINA ${numStr} / 30
        </div>
      </div>
    `;

    if (plateNum === 4) {
      return `
        <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-radius:20px; padding:24px; box-shadow:0 20px 50px rgba(9,13,22,0.12); color:#090D16;">
          ${plateHeader("04", "02 · PASO 1 — ADN Y CÍRCULO DORADO", `El Círculo Dorado (WHY · HOW · WHAT) de ${escHtml(bName)}`)}
          <div class="tbb-comm-grid-2" style="align-items:center;">
            <div>${window.tbbBuildCircularGoldenCircleSVG()}</div>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="background:#F0F7FF; border:1.5px solid #93C5FD; border-left:5px solid #0D2540; border-radius:12px; padding:12px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#0D2540;">1. POR QUÉ EXISTIMOS (WHY · PROPÓSITO NUCLEAR)</div>
                <div style="font-size:0.86rem; font-weight:700; color:#090D16; margin-top:3px;">${escHtml(st.whyPurpose)}</div>
              </div>
              <div style="background:#EFF6FF; border:1.5px solid #93C5FD; border-left:5px solid #1D4ED8; border-radius:12px; padding:12px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#1D4ED8;">2. CÓMO LO HACEMOS ÚNICO (HOW · MÉTODO)</div>
                <div style="font-size:0.86rem; font-weight:700; color:#090D16; margin-top:3px;">${escHtml(st.howMethod)}</div>
              </div>
              <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-left:5px solid #090D16; border-radius:12px; padding:12px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#090D16;">3. QUÉ ENTREGAMOS (WHAT · OFERTA CONCRETA)</div>
                <div style="font-size:0.86rem; font-weight:700; color:#090D16; margin-top:3px;">${escHtml(st.whatOffer)}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (plateNum === 6) {
      return `
        <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-radius:20px; padding:24px; box-shadow:0 20px 50px rgba(9,13,22,0.12); color:#090D16;">
          ${plateHeader("06", "02 · PASO 1 — LA EMPRESA COMO PERSONA", `Arquetipo Humano, Voz y Personalidad de ${escHtml(bName)}`)}
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px;">
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-top:4px solid #1D4ED8; border-radius:14px; padding:16px;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#1D4ED8;">01 · CARÁCTER Y PRESENCIA</div>
              <h4 style="margin:6px 0; font-size:1rem; font-weight:900;">Fuerza Tranquila y Mente de Ingeniero</h4>
              <p style="font-size:0.80rem; color:#334155; margin:0; line-height:1.5;">Escucha primero la idea del cliente y la estructura hombro a hombro sin imponer jerga innecesaria.</p>
            </div>
            <div style="background:#F0F7FF; border:1.5px solid #93C5FD; border-top:4px solid #0D2540; border-radius:14px; padding:16px;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#0D2540;">02 · TONO DE COMUNICACIÓN</div>
              <h4 style="margin:6px 0; font-size:1rem; font-weight:900;">Claridad Ejecutiva y Cero Ambigüedad</h4>
              <p style="font-size:0.80rem; color:#334155; margin:0; line-height:1.5;">Frases directas, accionables y memorables que cualquier colaborador o cliente comprende en cinco segundos.</p>
            </div>
            <div style="background:#EFF6FF; border:1.5px solid #93C5FD; border-top:4px solid #090D16; border-radius:14px; padding:16px;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#090D16;">03 · REGLA DE DECISIÓN C-00</div>
              <h4 style="margin:6px 0; font-size:1rem; font-weight:900;">Del Caos al Sistema</h4>
              <p style="font-size:0.80rem; color:#334155; margin:0; line-height:1.5;">Toda pieza visual o comercial debe eliminar fricción operativa y liberar tiempo mental al líder.</p>
            </div>
          </div>
        </div>
      `;
    }

    if (plateNum === 8) {
      return `
        <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-radius:20px; padding:24px; box-shadow:0 20px 50px rgba(9,13,22,0.12); color:#090D16;">
          ${plateHeader("08", "03 · PASO 2 — INGENIERÍA DE TOUCHPOINTS", `Mapa de Momentos de la Verdad (Antes · Durante · Después)`)}
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px;">
            <div style="background:#EFF6FF; border:1.5px solid #93C5FD; border-top:5px solid #1D4ED8; border-radius:14px; padding:16px;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.70rem; font-weight:800; color:#1D4ED8;">1. ANTES DE COMPRAR (${st.tpBefore.length})</div>
              <ul style="margin:10px 0 0 0; padding-left:18px; font-size:0.82rem; font-weight:700; color:#090D16; line-height:1.65;">
                ${st.tpBefore.map(item => `<li>${escHtml(item)}</li>`).join("")}
              </ul>
            </div>
            <div style="background:#F0F7FF; border:1.5px solid #93C5FD; border-top:5px solid #0D2540; border-radius:14px; padding:16px;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.70rem; font-weight:800; color:#0D2540;">2. DURANTE LA COMPRA (${st.tpDuring.length})</div>
              <ul style="margin:10px 0 0 0; padding-left:18px; font-size:0.82rem; font-weight:700; color:#090D16; line-height:1.65;">
                ${st.tpDuring.map(item => `<li>${escHtml(item)}</li>`).join("")}
              </ul>
            </div>
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-top:5px solid #090D16; border-radius:14px; padding:16px;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.70rem; font-weight:800; color:#090D16;">3. DESPUÉS DE COMPRAR (${st.tpAfter.length})</div>
              <ul style="margin:10px 0 0 0; padding-left:18px; font-size:0.82rem; font-weight:700; color:#090D16; line-height:1.65;">
                ${st.tpAfter.map(item => `<li>${escHtml(item)}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    if (plateNum === 14) {
      return `
        <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-radius:20px; padding:24px; box-shadow:0 20px 50px rgba(9,13,22,0.12); color:#090D16;">
          ${plateHeader("14", "05 · PASO 4 — SISTEMA DE IDENTIDAD MONOLÍTICA", `Concentración del 100% de Prestigio en Marca Única (Cero Submarcas)`)}
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px;">
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:14px; padding:18px; text-align:center;">
              <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:10px;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG(52)}
                <div style="text-align:left;">
                  <div style="font-weight:900; font-size:1rem; color:#090D16;">${escHtml(bName)}</div>
                  <div style="font-size:0.65rem; font-weight:800; color:#0D2540;">${escHtml(bTag)}</div>
                </div>
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#1D4ED8;">01 · LOCKUP HORIZONTAL MAESTRO</div>
              <p style="font-size:0.76rem; color:#475569; margin:4px 0 0 0;">Uso principal en cabeceras web, propuestas comerciales y firmas ejecutivas.</p>
            </div>
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:14px; padding:18px; text-align:center;">
              <div style="display:flex; flex-direction:column; align-items:center; margin-bottom:8px;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG(54)}
                <div style="font-weight:900; font-size:0.92rem; color:#090D16; margin-top:4px;">${escHtml(bName)}</div>
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#0D2540;">02 · TÓTEM VERTICAL CENTRAL</div>
              <p style="font-size:0.76rem; color:#475569; margin:4px 0 0 0;">Uso en portadas editoriales, empaque de lujo y señalética arquitectónica.</p>
            </div>
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:14px; padding:18px; text-align:center;">
              <div style="display:flex; justify-content:center; margin-bottom:12px;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG(62)}
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#090D16;">03 · SÍMBOLO PURO APP ICON 1:1</div>
              <p style="font-size:0.76rem; color:#475569; margin:4px 0 0 0;">Uso en ícono iOS/Android, avatar social, favicon y lacre de autenticidad.</p>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-radius:20px; padding:24px; box-shadow:0 20px 50px rgba(9,13,22,0.12); color:#090D16;">
        ${plateHeader("20", "06 · PASO 6 — PAPELERÍA EJECUTIVA Y REGISTRO", `Especificación Técnica CMYK, Pantone y Vectores de Imprenta`)}
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
          <div style="background:#090D16; color:#FFFFFF; border-radius:14px; padding:16px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; color:#93C5FD;">OBSIDIANA PROFUNDO</div>
            <div style="font-size:1.15rem; font-weight:900; margin-top:4px;">#090D16</div>
            <div style="font-size:0.70rem; color:#94A3B8; margin-top:4px;">CMYK 82 · 71 · 52 · 86<br/>Pantone Black 6 C</div>
          </div>
          <div style="background:#1D4ED8; color:#FFFFFF; border-radius:14px; padding:16px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; color:#DBEAFE;">ZAFIRO ESTRATÉGICO</div>
            <div style="font-size:1.15rem; font-weight:900; margin-top:4px;">#1D4ED8</div>
            <div style="font-size:0.70rem; color:#DBEAFE; margin-top:4px;">CMYK 88 · 68 · 0 · 0<br/>Pantone 2728 C</div>
          </div>
          <div style="background:#0D2540; color:#FFFFFF; border-radius:14px; padding:16px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; color:#F0F7FF;">ÁMBAR NÚCLEO AURA</div>
            <div style="font-size:1.15rem; font-weight:900; margin-top:4px;">#0D2540</div>
            <div style="font-size:0.70rem; color:#F0F7FF; margin-top:4px;">CMYK 0 · 62 · 95 · 0<br/>Pantone 1585 C</div>
          </div>
          <div style="background:#F8FAFC; color:#090D16; border:2px solid #CBD5E1; border-radius:14px; padding:16px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; color:#0D2540;">LIENZO SUIZO OFICIAL</div>
            <div style="font-size:1.15rem; font-weight:900; margin-top:4px;">#FFFFFF</div>
            <div style="font-size:0.70rem; color:#475569; margin-top:4px;">Papel Cotton 300g<br/>Acabado Mate Natural</div>
          </div>
        </div>
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // 8. MOTOR DE VIDEO INTERACTIVO (7 CAPÍTULOS TEÓRICOS CON REPRODUCTOR)
  // ---------------------------------------------------------------------------
  window.tbbSelectMasterclassChapter = function (stepIdx) {
    const s = Math.max(0, Math.min(6, Number(stepIdx || 0)));
    window.tbbCommercialDemoState.activeVideoStep = s;
    const player = document.getElementById("tbbMasterclassVideoPlayer");
    const capsule = VIDEO_CAPSULES[s] || VIDEO_CAPSULES[1];
    if (player) {
      player.src = capsule.url;
      player.poster = capsule.poster || '/assets/videos/poster_aura_recorrido.jpg';
      player.muted = window.tbbCommercialDemoState.videoMuted;
      
      // Wire event listeners nativos para Safari iOS y Desktop
      player.onplay = function () {
        window.tbbCommercialDemoState.videoIsPlaying = true;
        const ov = document.getElementById("tbbVideoPlayOverlay");
        if (ov) ov.style.display = "none";
        window.tbbUpdateVideoControlsUI();
      };
      player.onpause = function () {
        window.tbbCommercialDemoState.videoIsPlaying = false;
        const ov = document.getElementById("tbbVideoPlayOverlay");
        if (ov) ov.style.display = "flex";
        window.tbbUpdateVideoControlsUI();
      };
      player.onended = function () {
        window.tbbCommercialDemoState.videoIsPlaying = false;
        const ov = document.getElementById("tbbVideoPlayOverlay");
        if (ov) ov.style.display = "flex";
        window.tbbUpdateVideoControlsUI();
      };

      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          window.tbbCommercialDemoState.videoIsPlaying = true;
          const ov = document.getElementById("tbbVideoPlayOverlay");
          if (ov) ov.style.display = "none";
          window.tbbUpdateVideoControlsUI();
        }).catch(() => {
          // Si Safari bloquea audio, activar mute defensivo y reproducir video
          player.muted = true;
          window.tbbCommercialDemoState.videoMuted = true;
          player.play().then(() => {
            window.tbbCommercialDemoState.videoIsPlaying = true;
            const ov = document.getElementById("tbbVideoPlayOverlay");
            if (ov) ov.style.display = "none";
            window.tbbUpdateVideoControlsUI();
          }).catch(() => {
            window.tbbCommercialDemoState.videoIsPlaying = false;
            const ov = document.getElementById("tbbVideoPlayOverlay");
            if (ov) ov.style.display = "flex";
            window.tbbUpdateVideoControlsUI();
          });
        });
      }
    }
    const titleEl = document.getElementById("tbbMasterclassTitle");
    const authorEl = document.getElementById("tbbMasterclassAuthor");
    const quoteEl = document.getElementById("tbbMasterclassQuote");
    if (titleEl) titleEl.textContent = capsule.title;
    if (authorEl) authorEl.textContent = `${capsule.author} · ${capsule.duration}`;
    if (quoteEl) quoteEl.textContent = capsule.quote;

    for (let i = 0; i <= 6; i++) {
      const btn = document.getElementById(`tbbVidTab_${i}`);
      if (btn) btn.classList.toggle("is-active", i === s);
    }
  };

  window.tbbToggleMasterclassPlay = function () {
    const player = document.getElementById("tbbMasterclassVideoPlayer");
    const playOverlay = document.getElementById("tbbVideoPlayOverlay");
    if (!player) return;
    if (player.paused) {
      player.play().then(() => {
        window.tbbCommercialDemoState.videoIsPlaying = true;
        if (playOverlay) playOverlay.style.display = "none";
        window.tbbUpdateVideoControlsUI();
      }).catch(err => {
        // Fallback defensivo para iOS Safari (autoplay con mute)
        player.muted = true;
        window.tbbCommercialDemoState.videoMuted = true;
        player.play().then(() => {
          window.tbbCommercialDemoState.videoIsPlaying = true;
          if (playOverlay) playOverlay.style.display = "none";
          window.tbbUpdateVideoControlsUI();
        }).catch(() => {
          window.tbbCommercialDemoState.videoIsPlaying = false;
          if (playOverlay) playOverlay.style.display = "flex";
          window.tbbUpdateVideoControlsUI();
        });
      });
    } else {
      player.pause();
      window.tbbCommercialDemoState.videoIsPlaying = false;
      if (playOverlay) playOverlay.style.display = "flex";
      window.tbbUpdateVideoControlsUI();
    }
  };

  window.tbbToggleMasterclassMute = function () {
    const player = document.getElementById("tbbMasterclassVideoPlayer");
    if (!player) return;
    const nextMuted = !player.muted;
    player.muted = nextMuted;
    window.tbbCommercialDemoState.videoMuted = nextMuted;
    window.tbbUpdateVideoControlsUI();
  };

  window.tbbUpdateVideoControlsUI = function () {
    const player = document.getElementById("tbbMasterclassVideoPlayer");
    const isPlaying = player ? !player.paused : false;
    const isMuted = player ? player.muted : true;
    const playBtn = document.getElementById("tbbBtnVidPlayPause");
    const muteBtn = document.getElementById("tbbBtnVidMute");
    if (playBtn) playBtn.innerHTML = isPlaying ? `<span>❚❚ ${t("videoPauseBtn")}</span>` : `<span>▶ ${t("videoPlayBtn")}</span>`;
    if (muteBtn) muteBtn.innerHTML = isMuted ? `<span>Activar Audio (${t("videoUnmuteBtn")})</span>` : `<span>Silenciar (${t("videoMuteBtn")})</span>`;
  };

  // ---------------------------------------------------------------------------
  // 9. CANVAS DE PARTÍCULAS CUÁNTICAS 60 FPS + SCROLL REVEAL + 3D TILT
  // ---------------------------------------------------------------------------
  let _auraCanvasRaf = null;
  window.tbbInitHeroParticlesCanvas = function () {
    const canvas = document.getElementById("tbbHeroAuraParticleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth || window.innerWidth;
    let H = canvas.height = canvas.offsetHeight || 560;

    window.addEventListener("resize", () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth || window.innerWidth;
      H = canvas.height = canvas.offsetHeight || 560;
    });

    const particles = [];
    const count = Math.min(44, Math.floor(W / 28));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        r: Math.random() * 2.6 + 1.2,
        color: i % 2 === 0 ? "rgba(59, 130, 246, 0.52)" : "rgba(76, 157, 230, 0.52)"
      });
    }

    let mouseX = W * 0.65;
    let mouseY = H * 0.45;
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    function renderFrame() {
      ctx.clearRect(0, 0, W, H);
      const glow = ctx.createRadialGradient(mouseX, mouseY, 12, mouseX, mouseY, 320);
      glow.addColorStop(0, "rgba(29, 78, 216, 0.20)");
      glow.addColorStop(0.5, "rgba(76, 157, 230, 0.10)");
      glow.addColorStop(1, "rgba(5, 8, 17, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      ctx.lineWidth = 0.85;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 115) {
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.20 * (1 - dist / 115)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      _auraCanvasRaf = requestAnimationFrame(renderFrame);
    }
    if (_auraCanvasRaf) cancelAnimationFrame(_auraCanvasRaf);
    renderFrame();
  };

  window.tbbInitAwwwardsInteractions = function () {
    // 1. Apple Scroll Reveal Observer
    const revealEls = document.querySelectorAll(".tbb-apple-reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
      revealEls.forEach(el => obs.observe(el));
      setTimeout(() => {
        revealEls.forEach(el => el.classList.add("is-visible"));
      }, 650);
    } else {
      revealEls.forEach(el => el.classList.add("is-visible"));
    }

    // 2. 3D Perspective Tilt on Hover ([data-tbb-tilt])
    document.querySelectorAll("[data-tbb-tilt]").forEach(card => {
      if (card.dataset.tiltBound === "1") return;
      card.dataset.tiltBound = "1";
      card.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 900) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${(x * 5).toFixed(2)}deg) rotateX(${(-y * 5).toFixed(2)}deg) translateY(-3px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)";
      });
    });

    // 3. Top Scroll Progress Bar
    if (!window._tbbScrollProgressBound) {
      window._tbbScrollProgressBound = true;
      window.addEventListener("scroll", () => {
        const bar = document.getElementById("tbbScrollProgressBar");
        if (bar) {
          const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const pct = Math.min(100, Math.max(0, (window.scrollY / docH) * 100));
          bar.style.width = `${pct.toFixed(1)}%`;
        }
      }, { passive: true });
    }
  };

  window.tbbToggleMobileDrawer = function (forceOpen) {
    const next = typeof forceOpen === "boolean" ? forceOpen : !window.tbbCommercialDemoState.mobileDrawerOpen;
    window.tbbCommercialDemoState.mobileDrawerOpen = next;
    const drw = document.getElementById("tbbMobileSlideDrawer");
    const bkp = document.getElementById("tbbMobileDrawerBackdrop");
    if (drw) drw.classList.toggle("open", next);
    if (bkp) bkp.classList.toggle("open", next);
  };

  // ---------------------------------------------------------------------------
  // 10. RENDERIZADOR COMPLETO DEL PORTAL COMERCIAL AWWWARDS V58.0
  // ---------------------------------------------------------------------------
  window.tbbBuildCommercialExperienceMarkup = function (isStandalonePage) {
    syncDemoStateFromAppIfAvailable();
    const st = window.tbbCommercialDemoState;
    const curLang = getLang();
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    const activeCapsule = VIDEO_CAPSULES[st.activeVideoStep !== undefined ? st.activeVideoStep : 0] || VIDEO_CAPSULES[0];

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
        "Bóveda Digital de Manual de Marca de 30 Hojas en PDF y HTML",
        "Actualizaciones Multilingües en la Nube",
        "Programa de Lealtad y Expansión de Marca",
        "Seguimiento de Satisfacción Post-Entrega",
        "Certificado Oficial de Registro y Vectores SVG"
      ]
    };

    const explorerTabs = [
      { n: 1, lbl: "Lámina 01 · Portada Monolítica" },
      { n: 4, lbl: "Lámina 04 · Círculo Dorado" },
      { n: 6, lbl: "Lámina 06 · La Empresa como Persona" },
      { n: 8, lbl: "Lámina 08 · Touchpoints" },
      { n: 14, lbl: "Lámina 14 · Marca Única (Sin Submarcas)" },
      { n: 20, lbl: "Lámina 20 · Especificación CMYK & Pantone" }
    ];

    return `
      <!-- ===================================================================== -->
      <!-- 1. HEADER MONOFILA DE ALTA PRECISIÓN + DRAWER MÓVIL (IMPROBEARS / ACQUA) -->
      <!-- ===================================================================== -->
      <header class="tbb-awwwards-nav">
        <a href="#tbbCommHeroSection" style="display:flex; align-items:center; gap:11px; text-decoration:none; min-width:0;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG(40)}
          <div style="min-width:0;">
            <div style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:0.96rem; font-weight:900; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.1; white-space:nowrap;">
              THE BEST BRAND <span class="tbb-brand-inline-tagline" style="color:#FF7A00; font-size:0.68rem; font-weight:800; letter-spacing:0.04em;">YOUR BRAND, NOW!!!</span>
            </div>
            <div class="tbb-brand-subtag" style="font-family:'JetBrains Mono', monospace; font-size:0.54rem; font-weight:800; color:#93C5FD; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:250px;">
              ${t("brandTag")}
            </div>
          </div>
        </a>

        <!-- Navegación Desktop Monofila -->
        <nav class="tbb-desktop-nav-links" aria-label="Navegación Principal">
          <a href="#tbbCommPlateExplorerSection" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>${t("navPlates")}</span>
          </a>
          <a href="#tbbCommDeliverablesSection" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>${t("navDeliverables")}</span>
          </a>
          <a href="#tbbCommVideoSection" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>${t("navMasterclass")}</span>
          </a>
          <a href="#tbbCommLiveDemoSection" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem; border-color:#0D2540; color:#93C5FD !important;">
            <span>${t("navDemo")}</span>
          </a>
          <a href="#tbbCommPricingSection" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>${t("navPricing")}</span>
          </a>
        </nav>

        <!-- Acciones Derecha (Selector Idioma + Comprar + Botón App Universal + Hamburger Móvil) -->
        <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
          <select id="tbbCommercialLangSelect" aria-label="Idioma" onchange="window.tbbChangeCommercialLanguage(this.value)" class="tbb-desktop-only-ctrl" style="height:36px; padding:0 10px; border-radius:999px; background:#0E1422; color:#FFFFFF; border:1.5px solid #1D4ED8; font-family:'Plus Jakarta Sans', sans-serif; font-size:0.74rem; font-weight:800; cursor:pointer;">
            <option value="es" ${curLang === "es" ? "selected" : ""}>ES</option>
            <option value="en" ${curLang === "en" ? "selected" : ""}>EN</option>
            <option value="fr" ${curLang === "fr" ? "selected" : ""}>FR</option>
            <option value="pt" ${curLang === "pt" ? "selected" : ""}>PT</option>
            <option value="de" ${curLang === "de" ? "selected" : ""}>DE</option>
            <option value="it" ${curLang === "it" ? "selected" : ""}>IT</option>
          </select>

          <button type="button" class="tbb-comm-btn-black tbb-desktop-only-ctrl" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:8px 13px; font-size:0.76rem; white-space:nowrap;">
            <span>${isLicensed ? t("licenseActiveBadge") : t("buyNowShort")}</span>
          </button>

          ${isStandalonePage ? `
            <a href="/studio" class="tbb-comm-btn-studio-header" style="padding:7px 14px; font-size:0.75rem; white-space:nowrap;">
              <span style="color:#FF7A00; font-size:0.82rem; line-height:1;">●</span>
              <span>${t("navOpenApp")}</span>
            </a>
          ` : `
            <button type="button" class="tbb-comm-btn-outline" onclick="window.tbbCloseCommercialPortalModal()" style="padding:7px 12px; font-size:0.76rem;">
              ✕
            </button>
          `}

          <button type="button" class="tbb-mobile-hamburger-btn" onclick="window.tbbToggleMobileDrawer()" aria-label="Abrir menú móvil">
            ☰
          </button>
        </div>
      </header>

      <!-- ===================================================================== -->
      <!-- PESTAÑAS STICKY DE LAS 4 SECCIONES (VISIBLES EN MÓVIL Y DESKTOP)       -->
      <!-- ===================================================================== -->
      <nav class="tbb-sections-tabs-bar" id="tbbMainSectionsTabBar" aria-label="Navegación de Secciones">
        <button type="button" class="tbb-sec-tab ${st.activeMainSection === 1 || !st.activeMainSection ? 'is-active' : ''}" id="tbbSecTab_1" onclick="window.tbbSwitchMainSection(1)">
          <span class="tbb-tab-number">01</span>
          <span class="tbb-tab-text">El Gancho</span>
        </button>
        <button type="button" class="tbb-sec-tab tbb-tab-destello ${st.activeMainSection === 2 ? 'is-active' : ''}" id="tbbSecTab_2" onclick="window.tbbSwitchMainSection(2)">
          <span class="tbb-tab-number">02</span>
          <span class="tbb-tab-text">Demo en Vivo</span>
          <span class="tbb-badge-spark" style="background:#FF7A00; color:#FFFFFF; border-color:#FF7A00;">EN VIVO ✨</span>
        </button>
        <button type="button" class="tbb-sec-tab ${st.activeMainSection === 3 ? 'is-active' : ''}" id="tbbSecTab_3" onclick="window.tbbSwitchMainSection(3)">
          <span class="tbb-tab-number">03</span>
          <span class="tbb-tab-text">Oferta y Entregables</span>
        </button>
        <button type="button" class="tbb-sec-tab ${st.activeMainSection === 4 ? 'is-active' : ''}" id="tbbSecTab_4" onclick="window.tbbSwitchMainSection(4)">
          <span class="tbb-tab-number">04</span>
          <span class="tbb-tab-text">Videos y Libros</span>
        </button>
        <a href="/studio" class="tbb-sec-tab-direct-studio" title="Abrir la aplicación completa con todos los pasos y autores" style="display:inline-flex; align-items:center; gap:6px; padding:7px 15px; border-radius:999px; background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); color:#FFFFFF; border:1.5px solid #4C9DE6; border-bottom:3px solid #FF7A00; text-decoration:none; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.76rem; font-weight:800; white-space:nowrap; margin-left:auto; box-shadow:0 4px 14px rgba(13,37,64,0.35);">
          <span style="width:7px; height:7px; border-radius:50%; background:#FF7A00; box-shadow:0 0 8px #FF7A00; display:inline-block;"></span>
          <span>Abrir App Completa ↗</span>
        </a>
      </nav>

      <!-- DRAWER MÓVIL SLIDE-OVER (Cero apilamiento en iPhone) -->
      <div id="tbbMobileDrawerBackdrop" class="tbb-mobile-drawer-backdrop" onclick="window.tbbToggleMobileDrawer(false)"></div>
      <aside id="tbbMobileSlideDrawer" class="tbb-mobile-slide-drawer" aria-label="Menú Móvil">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.12);">
          <div style="display:flex; align-items:center; gap:8px;">
            ${window.tbbBuildOfficialBrandbook1EmblemSVG(32)}
            <span style="font-weight:900; font-size:0.92rem; color:#FFFFFF;">THE BEST BRAND <span style="color:#FF7A00;">1.0</span></span>
          </div>
          <button type="button" class="tbb-comm-btn-outline" onclick="window.tbbToggleMobileDrawer(false)" style="padding:5px 10px;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; margin-top:14px;">
          <!-- ACCESO DIRECTO DESTACADO A LA APP -->
          <a href="/studio" style="display:flex; align-items:center; justify-content:space-between; padding:13px 15px; background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); border:2px solid #4C9DE6; border-bottom:3.5px solid #FF7A00; border-radius:14px; text-decoration:none; color:#FFFFFF; margin-bottom:6px; box-shadow:0 8px 20px rgba(0,0,0,0.35);">
            <div>
              <div style="font-size:0.92rem; font-weight:900; display:flex; align-items:center; gap:6px;">
                <span style="color:#FF7A00;">●</span> Entrar al Estudio Completo
              </div>
              <div style="font-size:0.72rem; color:#93C5FD; margin-top:2px;">
                Taller de Marca de 7 Pasos · 15 Autores · 30 Hojas
              </div>
            </div>
            <span style="font-size:1.25rem; font-weight:900; color:#FF7A00;">↗</span>
          </a>
          <a href="#tbbCommPlateExplorerSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(3);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">${t("navPlates")}</a>
          <a href="#tbbCommDeliverablesSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(3);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">${t("navDeliverables")}</a>
          <a href="#tbbCommVideoSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(4);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">${t("navMasterclass")}</a>
          <a href="#tbbCommLiveDemoSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(2);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px; border-color:#0D2540;">${t("navDemo")}</a>
          <a href="#tbbCommPricingSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(3);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">${t("navPricing")}</a>
          <div style="padding-top:8px; border-top:1px solid rgba(255,255,255,0.12); display:flex; gap:8px;">
            <select aria-label="Idioma Móvil" onchange="window.tbbChangeCommercialLanguage(this.value)" style="flex:1; height:40px; padding:0 12px; border-radius:10px; background:#0E1422; color:#FFFFFF; border:1.5px solid #1D4ED8; font-weight:800;">
              <option value="es" ${curLang === "es" ? "selected" : ""}>ES · Español</option>
              <option value="en" ${curLang === "en" ? "selected" : ""}>EN · English</option>
              <option value="fr" ${curLang === "fr" ? "selected" : ""}>FR · Français</option>
              <option value="pt" ${curLang === "pt" ? "selected" : ""}>PT · Português</option>
              <option value="de" ${curLang === "de" ? "selected" : ""}>DE · Deutsch</option>
              <option value="it" ${curLang === "it" ? "selected" : ""}>IT · Italiano</option>
            </select>
          </div>
          <button type="button" class="tbb-comm-btn-black" onclick="window.tbbToggleMobileDrawer(false); window.tbbOpenBuyAppCheckoutModal('pro_atelier');" style="padding:12px;">${t("buyNowSticky")}</button>
        </div>
      </aside>

      <!-- ===================================================================== -->
      <!-- 2. ESCENARIO HERO CINEMATOGRÁFICO CON ANILLOS CONCÉNTRICOS & CANVAS 60FPS -->
      <!-- ===================================================================== -->
      <!-- ===================================================================== -->
      <!-- SECCIÓN 1: EL GANCHO (HERO NAVY + WEBGL SHADER + 60FPS NODES + MATRIZ)-->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_1" style="display:${(st.activeMainSection === 1 || !st.activeMainSection) ? 'block' : 'none'};">
        <section id="tbbCommHeroSection" style="position:relative; padding:54px 24px 48px 24px; background:radial-gradient(circle at 65% 25%, #0D2540 0%, #090D16 58%, #050811 100%); color:#FFFFFF; overflow:hidden;">
        <!-- 60fps Dynamic Connected Nodes Canvas + WebGL GLSL Liquid Shader Backdrop + Dot Matrix Overlay (ImproBears Awwwards Technology) -->
        <canvas id="heroDynamicCanvas" class="hero-dynamic-canvas" data-canvas-mode="ecosystem" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>
        <canvas id="webglLiquidShader" class="webgl-liquid-canvas" aria-hidden="true" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1; opacity:0.42; mix-blend-mode:screen;"></canvas>
        <div class="dot-matrix-overlay" aria-hidden="true" style="position:absolute; inset:0; width:100%; height:100%; background-image:radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px); background-size:24px 24px; pointer-events:none; z-index:1;"></div>
        <canvas id="tbbHeroAuraParticleCanvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>

        <svg class="hero-concentric-svg" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute; right:-120px; top:-90px; width:560px; height:560px; opacity:0.16; pointer-events:none; z-index:1;">
          <circle cx="300" cy="300" r="270" stroke="#426EAE" stroke-width="2" stroke-dasharray="18 10" />
          <path d="M 80 300 A 220 220 0 1 1 520 300" stroke="#4C9DE6" stroke-width="3" stroke-linecap="round" />
          <path d="M 140 300 A 160 160 0 1 1 460 300" stroke="#4C9DE6" stroke-width="4" stroke-linecap="round" />
        </svg>

        <div style="position:relative; z-index:2; max-width:1180px; margin:0 auto;" class="tbb-comm-grid-2">
          <div class="tbb-apple-reveal is-visible" style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:inline-flex; align-items:center; gap:8px; align-self:flex-start; background:rgba(9,13,22,0.88); border:1.5px solid #1D4ED8; border-left:4px solid #FF7A00; border-radius:999px; padding:6px 14px; font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#93C5FD; box-shadow:0 0 24px rgba(29,78,216,0.35);">
              <span style="width:7px; height:7px; border-radius:50%; background:#FF7A00; box-shadow:0 0 8px #FF7A00; display:inline-block;"></span>
              <span>${t("heroBadge")}</span>
            </div>

            <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(2.15rem, 4.2vw, 3.25rem); font-weight:900; line-height:1.08; letter-spacing:-0.03em; margin:0; color:#FFFFFF;">
              Crea tu Marca de manera profesional, <br/>
              <span style="color:#4C9DE6; text-shadow:0 0 32px rgba(76,157,230,0.5); border-bottom:3.5px solid #FF7A00; padding-bottom:2px; display:inline-block;">¡en minutos!</span>
            </h1>

            <p style="font-size:1.02rem; font-weight:500; color:#E2E8F0; line-height:1.62; margin:0; max-width:580px;">
              Sin semanas de espera ni costos desmedidos. Aura, tu mentora con inteligencia artificial, te guía paso a paso para construir una identidad de clase mundial y generar tu <strong>Manual de Marca de 30 Hojas</strong> listo para operar hoy mismo.
            </p>

            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:8px;">
              <a href="/studio" class="tbb-comm-btn-black tbb-tab-destello" style="font-size:0.94rem; padding:14px 24px; background:#0D2540; border:2px solid #4C9DE6; border-bottom:3.5px solid #FF7A00; color:#FFFFFF; font-weight:800; border-radius:999px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; cursor:pointer; box-shadow:0 10px 25px rgba(13,37,64,0.45);">
                <span style="color:#FF7A00; font-size:1.1rem; line-height:1;">●</span>
                <span>Probar la App en Vivo Gratis ↗</span>
              </a>
              <button type="button" class="tbb-btn-light-surface" onclick="window.tbbSwitchMainSection(2)" style="font-size:0.90rem; padding:13px 20px; background:#FFFFFF; color:#0D2540; border:1.5px solid #CBD5E1; border-radius:999px; font-weight:800; cursor:pointer;">
                <span>Demo Rápida (Pasos 1 y 2) ↓</span>
              </button>
              <button type="button" class="tbb-btn-light-surface" onclick="window.tbbOpenAuraRecorridoModal()" style="font-size:0.90rem; padding:13px 20px; background:#FFFFFF; color:#0D2540; border:1.5px solid #0D2540; border-radius:999px; font-weight:800; cursor:pointer;">
                <span style="color:#4C9DE6; margin-right:4px;">●</span> Ver a Aura Explicar el Recorrido (02:48) ►
              </button>
              <button type="button" class="tbb-btn-light-surface" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.88rem; padding:13px 18px; border-radius:999px; font-weight:800;">
                <span>Comprar Pro · $49 USD</span>
              </button>
            </div>
          </div>

          <!-- Columna Derecha: Portada Oficial Brandbook 1.0 + Tarjeta Socrática de Aura -->
          <div class="tbb-apple-reveal is-visible" style="display:flex; flex-direction:column; gap:14px;">
            <div id="tbbCommHeroCoverWrapper">
              ${window.tbbBuildBrandbook1CoverPreviewHTML()}
            </div>
            <div style="background:rgba(9,13,22,0.90); border:1.5px solid #1D4ED8; border-left:5px solid #0D2540; border-radius:16px; padding:13px 16px; display:flex; align-items:center; gap:14px; box-shadow:0 14px 32px rgba(0,0,0,0.45);">
              <div style="flex-shrink:0;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG(50)}
              </div>
              <div style="min-width:0; flex:1;">
                <div id="tbbCommAuraRefBadge" style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#0D2540;">
                  AURA · ${st.auraAuthorRef}
                </div>
                <div id="tbbCommAuraQuoteText" style="font-size:0.82rem; font-weight:600; color:#E2E8F0; line-height:1.42; margin-top:2px;">
                  ${st.auraQuote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      <!-- TICKER MARQUEE CONTINUO DE INGENIERÍA DE MARCA -->
      <div style="background:#090D16; border-top:2px solid #1D4ED8; border-bottom:3px solid #0D2540; padding:10px 0; overflow:hidden; white-space:nowrap;">
        <div style="display:inline-block; animation:tbbMarquee 28s linear infinite; font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:800; color:#FFFFFF; letter-spacing:0.12em;">
          THE BEST BRAND · YOUR BRAND, NOW!!! · MANUAL DE MARCA DE 30 HOJAS EN CURVAS · ARQUITECTURA MONOLÍTICA SIN SUBMARCAS FORZADAS · CÍRCULO DORADO 100% CIRCULAR · LA EMPRESA COMO PERSONA · CHECKOUT APPLE PAY & GOOGLE PAY · DEL CAOS AL SISTEMA ·
          THE BEST BRAND · YOUR BRAND, NOW!!! · MANUAL DE MARCA DE 30 HOJAS EN CURVAS · ARQUITECTURA MONOLÍTICA SIN SUBMARCAS FORZADAS · CÍRCULO DORADO 100% CIRCULAR · LA EMPRESA COMO PERSONA · CHECKOUT APPLE PAY & GOOGLE PAY · DEL CAOS AL SISTEMA ·
        </div>
      </div>

        <!-- Matriz Comparativa de 3 Columnas (Agencias vs The Best Brand vs Apps) -->
        <div style="max-width:1180px; margin:0 auto; padding:0 24px 48px 24px;">
          ${window.tbbBuildComparisonMatrixHTML()}
        </div>
        <section id="tbbCommAuthoritySection" style="padding:64px 24px; background:#090D16; color:#FFFFFF; border-bottom:2px solid #1D4ED8;">
        <div style="max-width:1160px; margin:0 auto;" class="tbb-comm-grid-2">
          <div class="tbb-apple-reveal" style="position:relative; border-radius:22px; overflow:hidden; border:2px solid #1D4ED8; border-bottom:6px solid #0D2540; box-shadow:0 20px 50px rgba(0,0,0,0.6);">
            <img src="/assets/improbears/foto-jb-oso-hero.png" alt="Jorge Benítez El Oso · ImproBears" style="width:100%; height:auto; display:block; object-fit:cover;" />
            <div style="position:absolute; bottom:12px; left:12px; right:12px; background:rgba(9,13,22,0.88); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px;">
              <div style="font-family:'Montserrat', sans-serif; font-size:0.95rem; font-weight:900; color:#FFFFFF;">Jorge Benítez «El Oso»</div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; font-weight:800; color:#0D2540;">FUNDADOR DE IMPROBEARS & SUITE THE BEST</div>
            </div>
          </div>

          <div class="tbb-apple-reveal" style="display:flex; flex-direction:column; gap:16px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#0D2540;">
              ${t("authorityTag")}
            </div>
            <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.8rem, 3.4vw, 2.4rem); font-weight:900; color:#FFFFFF; margin:0; line-height:1.15;">
              ${t("authorityTitle")}
            </h2>
            <p style="font-size:0.96rem; font-weight:500; color:#CBD5E1; line-height:1.65; margin:0;">
              ${t("authorityDesc")}
            </p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; padding-top:6px;">
              <div style="background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.14); border-left:4px solid #1D4ED8; border-radius:12px; padding:14px;">
                <div style="font-size:0.90rem; font-weight:900; color:#FFFFFF;">Del Caos al Sistema</div>
                <div style="font-size:0.76rem; color:#CBD5E1; margin-top:3px;">Metodología probada en empresas reales para conectar estrategia con operación diaria.</div>
              </div>
              <div style="background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.14); border-left:4px solid #0D2540; border-radius:12px; padding:14px;">
                <div style="font-size:0.90rem; font-weight:900; color:#FFFFFF;">Manual de Marca de 30 Hojas en Curvas</div>
                <div style="font-size:0.76rem; color:#CBD5E1; margin-top:3px;">Cero plantillas rígidas: arquitectura adaptativa lista para imprenta y registro.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 2: DEMO EN VIVO (PASOS 0, 1 Y 2 · SIN BANNERS NI BOTONES COMPRA)-->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_2" style="display:${st.activeMainSection === 2 ? 'block' : 'none'};">
        <section id="tbbCommLiveDemoSection" style="padding:84px 24px 68px 24px; background:#F8FAFC; border-bottom:2px solid #CBD5E1;">
        <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:22px;">
          <div class="tbb-apple-reveal" style="display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#FF7A00; letter-spacing:0.06em; display:flex; align-items:center; gap:6px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>${t("demoSectionTag")}</span>
              </div>
              <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
                ${t("demoSectionTitle")}
              </h2>
              <p style="font-size:0.92rem; font-weight:600; color:#334155; margin:0; max-width:780px;">
                ${t("demoSectionSub")}
              </p>
            </div>
          </div>

          <!-- Demo en Vivo Aislada e Inmersiva (Cero ruido publicitario) -->

          <!-- Pestañas de Paso 1 y Paso 2 con Alto Contraste sobre Superficie Clara -->
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button type="button" id="tbbDemoTabStep1Btn" class="tbb-tab-light-surface ${st.activeDemoStep === 1 ? 'is-active' : ''}" onclick="window.tbbSwitchCommercialDemoStep(1)" style="flex:1; min-width:250px; padding:14px 20px; font-size:0.86rem;">
              <span>${t("demoStep1Tab")}</span>
            </button>
            <button type="button" id="tbbDemoTabStep2Btn" class="tbb-tab-light-surface ${st.activeDemoStep === 2 ? 'is-active' : ''}" onclick="window.tbbSwitchCommercialDemoStep(2)" style="flex:1; min-width:250px; padding:14px 20px; font-size:0.86rem;">
              <span>${t("demoStep2Tab")}</span>
            </button>
          </div>

          <div class="tbb-comm-grid-2" style="align-items:stretch;">
            <!-- Columna Izquierda: Captura Interactiva -->
            <div style="background:#FFFFFF; border:2px solid #090D16; border-top:6px solid #1D4ED8; border-radius:22px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; gap:14px; box-shadow:0 16px 38px rgba(9,13,22,0.07);">
              ${st.activeDemoStep === 1 ? `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                  <div>
                    <label style="display:block; font-size:0.76rem; font-weight:800; color:#090D16; margin-bottom:4px;">${t("demoBrandLabel")}</label>
                    <input type="text" id="tbbDemoBrandNameInput" value="${escHtml(st.brandName)}" oninput="window.tbbUpdateCommercialDemoField('brandName', this.value)" placeholder="${t("demoBrandPlaceholder")}" style="width:100%; height:44px; padding:0 12px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.90rem; font-weight:800; color:#090D16; background:#FFFFFF;" />
                  </div>
                  <div>
                    <label style="display:block; font-size:0.76rem; font-weight:800; color:#090D16; margin-bottom:4px;">${t("demoGiroLabel")}</label>
                    <input type="text" id="tbbDemoGiroInput" value="${escHtml(st.businessGiro)}" oninput="window.tbbUpdateCommercialDemoField('businessGiro', this.value)" placeholder="${t("demoGiroPlaceholder")}" style="width:100%; height:44px; padding:0 12px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.85rem; font-weight:700; color:#090D16; background:#FFFFFF;" />
                  </div>
                </div>

                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:900; color:#0D2540; margin-bottom:4px;">${t("demoWhyLabel")}</label>
                  <textarea id="tbbDemoWhyInput" rows="2" oninput="window.tbbUpdateCommercialDemoField('whyPurpose', this.value)" style="width:100%; min-height:64px; padding:10px 12px; border-radius:12px; border:2px solid #0D2540; background:#F0F7FF; font-size:0.87rem; font-weight:700; color:#090D16; line-height:1.45; resize:vertical;">${escHtml(st.whyPurpose)}</textarea>
                </div>

                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:900; color:#1D4ED8; margin-bottom:4px;">${t("demoHowLabel")}</label>
                  <textarea id="tbbDemoHowInput" rows="2" oninput="window.tbbUpdateCommercialDemoField('howMethod', this.value)" style="width:100%; min-height:64px; padding:10px 12px; border-radius:12px; border:2px solid #93C5FD; background:#EFF6FF; font-size:0.87rem; font-weight:700; color:#090D16; line-height:1.45; resize:vertical;">${escHtml(st.howMethod)}</textarea>
                </div>

                <div>
                  <label style="display:block; font-size:0.78rem; font-weight:900; color:#090D16; margin-bottom:4px;">${t("demoWhatLabel")}</label>
                  <textarea id="tbbDemoWhatInput" rows="2" oninput="window.tbbUpdateCommercialDemoField('whatOffer', this.value)" style="width:100%; min-height:64px; padding:10px 12px; border-radius:12px; border:2px solid #CBD5E1; background:#F8FAFC; font-size:0.87rem; font-weight:700; color:#090D16; line-height:1.45; resize:vertical;">${escHtml(st.whatOffer)}</textarea>
                </div>

                <!-- Botones con Contraste Perfecto sobre Fondo Blanco -->
                <div style="display:flex; gap:10px; flex-wrap:wrap; padding-top:4px;">
                  <button type="button" class="tbb-btn-light-surface" onclick="window.tbbPolishCommercialDemoStep1()" style="flex:1; padding:12px 14px; font-size:0.82rem;">
                    <span>${t("demoPolishBtn")}</span>
                  </button>
                  <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbSwitchCommercialDemoStep(2)" style="flex:1.15; padding:12px 16px; font-size:0.84rem;">
                    <span>${t("demoNextToStep2")}</span>
                  </button>
                </div>
              ` : `
                <!-- PASO 2: INGENIERÍA DE TOUCHPOINTS -->
                ${["before", "during", "after"].map((phaseKey, pIdx) => {
                  const phaseTitle = pIdx === 0 ? t("demoTpBeforeTitle") : (pIdx === 1 ? t("demoTpDuringTitle") : t("demoTpAfterTitle"));
                  const stateKey = pIdx === 0 ? "tpBefore" : (pIdx === 1 ? "tpDuring" : "tpAfter");
                  const selectedArr = st[stateKey] || [];
                  const allOpts = [...new Set([...tpCatalog[phaseKey], ...selectedArr])];
                  const accentColor = pIdx === 0 ? "#1D4ED8" : (pIdx === 1 ? "#0D2540" : "#090D16");
                  return `
                    <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-left:4px solid ${accentColor}; border-radius:14px; padding:12px 14px;">
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.73rem; font-weight:800; color:${accentColor}; margin-bottom:8px;">
                        ${phaseTitle}
                      </div>
                      <div style="display:flex; flex-wrap:wrap; gap:6px;">
                        ${allOpts.map(opt => {
                          const isSel = selectedArr.includes(opt);
                          const safeOpt = opt.replace(/'/g, "\\'");
                          return `
                            <button type="button" onclick="window.tbbToggleCommercialDemoTouchpoint('${stateKey}', '${safeOpt}')" style="background:${isSel ? '#EFF6FF' : '#FFFFFF'}; color:${isSel ? '#1D4ED8' : '#090D16'}; border:2px solid ${isSel ? '#1D4ED8' : '#CBD5E1'}; border-bottom:3px solid ${isSel ? '#0D2540' : '#94A3B8'}; border-radius:10px; padding:6px 12px; font-size:0.76rem; font-weight:800; cursor:pointer;">
                              ${isSel ? "✓ " : "+ "}${escHtml(opt)}
                            </button>
                          `;
                        }).join("")}
                      </div>
                    </div>
                  `;
                }).join("")}

                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <input type="text" id="tbbDemoCustomTpInput" placeholder="${t("demoTpCustomPlaceholder")}" style="flex:1; min-width:180px; height:44px; padding:0 12px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.85rem; font-weight:700; color:#090D16;" />
                  <select id="tbbDemoCustomTpPhase" style="height:44px; padding:0 10px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.80rem; font-weight:800; color:#090D16; background:#FFFFFF;">
                    <option value="tpBefore">1. Antes</option>
                    <option value="tpDuring">2. Durante</option>
                    <option value="tpAfter">3. Después</option>
                  </select>
                  <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbAddCommercialDemoCustomTouchpoint()" style="padding:10px 16px; font-size:0.82rem;">
                    ${t("demoTpAddBtn")}
                  </button>
                </div>

                <div style="display:flex; flex-direction:column; gap:8px; padding-top:4px;">
                  <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbContinueFromDemoIntoFullStudio()" style="width:100%; padding:14px 20px; font-size:0.92rem; font-weight:800; background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); border-bottom:3.5px solid #FF7A00;">
                    <span>Continuar al Paso 3 · Naming & Clases de Niza →</span>
                  </button>

                </div>
              `}
            </div>

            <!-- Columna Derecha: Círculo Dorado Circular + Matriz de Touchpoints -->
            <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-top:6px solid #0D2540; border-radius:22px; padding:22px; display:flex; flex-direction:column; justify-content:space-between; gap:14px; box-shadow:0 16px 38px rgba(9,13,22,0.07);">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8;">
                  ${t("goldenCircleTitle")} · LÁMINA 04 / 30
                </span>
                <span style="background:#F0F7FF; color:#0D2540; border:1px solid #93C5FD; border-radius:999px; padding:3px 10px; font-size:0.66rem; font-weight:800;">
                  100% CIRCULAR
                </span>
              </div>

              <div id="tbbCommGoldenCircleSvgWrap">
                ${window.tbbBuildCircularGoldenCircleSVG()}
              </div>

              <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:14px; padding:12px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#090D16; margin-bottom:6px;">
                  MATRIZ DE TOUCHPOINTS SELECCIONADOS (LÁMINA 08 / 30)
                </div>
                <div id="tbbCommTouchpointsLiveSummary" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; font-size:0.72rem;">
                  <div style="background:#EFF6FF; border:1px solid #93C5FD; border-radius:8px; padding:7px 8px;">
                    <strong style="color:#1D4ED8; display:block;">1. ANTES (${st.tpBefore.length})</strong>
                    <span style="color:#090D16; font-weight:600;">${escHtml(st.tpBefore.slice(0, 2).join(" · "))}</span>
                  </div>
                  <div style="background:#F0F7FF; border:1px solid #93C5FD; border-radius:8px; padding:7px 8px;">
                    <strong style="color:#0D2540; display:block;">2. DURANTE (${st.tpDuring.length})</strong>
                    <span style="color:#090D16; font-weight:600;">${escHtml(st.tpDuring.slice(0, 2).join(" · "))}</span>
                  </div>
                  <div style="background:#F1F5F9; border:1px solid #CBD5E1; border-radius:8px; padding:7px 8px;">
                    <strong style="color:#090D16; display:block;">3. DESPUÉS (${st.tpAfter.length})</strong>
                    <span style="color:#090D16; font-weight:600;">${escHtml(st.tpAfter.slice(0, 2).join(" · "))}</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
      </div>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 3: OFERTA Y ENTREGABLES (MANUAL DE 30 HOJAS, BÓVEDA Y PRECIOS)-->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_3" style="display:${st.activeMainSection === 3 ? 'block' : 'none'};">
        <section id="tbbCommPlateExplorerSection" style="padding:64px 24px; background:linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%); border-bottom:2px solid #CBD5E1;">
        <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:22px;">
          <div class="tbb-apple-reveal" style="text-align:center; max-width:840px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#0D2540; letter-spacing:0.06em;">
              ${t("plateExplorerTag")}
            </div>
            <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.75rem, 3.1vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
              ${t("plateExplorerTitle")}
            </h2>
            <p style="font-size:0.94rem; font-weight:600; color:#334155; margin:0;">
              ${t("plateExplorerSub")}
            </p>
          </div>

          <!-- Pestañas de Láminas de Alta Contraste sobre Lienzo Claro -->
          <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
            ${explorerTabs.map(tab => `
              <button type="button" id="tbbExpTab_${tab.n}" class="tbb-tab-light-surface ${st.activeExplorerPlate === tab.n ? 'is-active' : ''}" onclick="window.tbbSelectExplorerPlate(${tab.n})" style="padding:10px 15px; font-size:0.78rem;">
                <span>${tab.lbl}</span>
              </button>
            `).join("")}
          </div>

          <!-- Escenario de la Lámina Seleccionada en Vivo -->
          <div id="tbbExplorerPlateLiveStage" class="tbb-apple-reveal">
            ${window.tbbBuildExplorerPlateStageHTML(st.activeExplorerPlate)}
          </div>
        </div>
      </section>
        <section id="tbbCommDeliverablesSection" style="padding:64px 24px; background:#FFFFFF; border-bottom:2px solid #E2E8F0;">
        <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:26px;">
          <div class="tbb-apple-reveal" style="text-align:center; max-width:820px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8;">
              ${t("deliverablesTag")}
            </div>
            <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
              ${t("deliverablesTitle")}
            </h2>
            <p style="font-size:0.95rem; font-weight:600; color:#475569; margin:0;">
              ${t("deliverablesSub")}
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(12, 1fr); gap:18px;">
            <!-- 1. Packaging Unboxing -->
            <div data-tbb-tilt class="tbb-bento-card tbb-apple-reveal" style="grid-column:span 7; min-height:340px; position:relative; overflow:hidden; border-radius:20px; border:2px solid #090D16; box-shadow:0 16px 38px rgba(9,13,22,0.10);">
              <img src="/assets/avi/brandbook_plate_packaging_unboxing.jpg" alt="Packaging Unboxing de Lujo" style="width:100%; height:100%; object-fit:cover; display:block;" />
              <div style="position:absolute; top:14px; right:14px; background:rgba(9,13,22,0.92); border:1.5px solid #0D2540; border-radius:999px; padding:5px 12px; display:flex; align-items:center; gap:7px; z-index:3;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; color:#FFFFFF;">THE BEST BRAND 1.0</span>
              </div>
              <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(9,13,22,0.08) 0%, rgba(9,13,22,0.92) 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:22px; color:#FFFFFF;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#0D2540;">LÁMINA 24 · EXPERIENCIA DE APERTURA</span>
                <h3 style="font-size:1.25rem; font-weight:900; margin:3px 0;">Packaging de Lujo y Unboxing Tridimensional</h3>
                <p style="font-size:0.80rem; color:#CBD5E1; margin:0; max-width:460px;">Proporciones áureas, guías de troquelado, barniz UV a registro y sello de autenticidad.</p>
              </div>
            </div>

            <!-- 2. Papelería Ejecutiva -->
            <div data-tbb-tilt class="tbb-bento-card tbb-apple-reveal" style="grid-column:span 5; min-height:340px; position:relative; overflow:hidden; border-radius:20px; border:2px solid #090D16; box-shadow:0 16px 38px rgba(9,13,22,0.10);">
              <img src="/assets/avi/brandbook_plate_stationery_suite.jpg" alt="Papelería Corporativa Ejecutiva" style="width:100%; height:100%; object-fit:cover; display:block;" />
              <div style="position:absolute; top:14px; right:14px; background:rgba(9,13,22,0.92); border:1.5px solid #1D4ED8; border-radius:999px; padding:5px 12px; display:flex; align-items:center; gap:7px; z-index:3;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; color:#93C5FD;">CMYK + PANTONE</span>
              </div>
              <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(9,13,22,0.08) 0%, rgba(9,13,22,0.92) 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:22px; color:#FFFFFF;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#93C5FD;">LÁMINA 20 · PAPELERÍA CORPORATIVA</span>
                <h3 style="font-size:1.20rem; font-weight:900; margin:3px 0;">Suite Corporativa y Tarjetas Ejecutivas</h3>
                <p style="font-size:0.80rem; color:#CBD5E1; margin:0;">Papel membretado, tarjetas de presentación y especificaciones de impresión offset.</p>
              </div>
            </div>

            <!-- 3. Señalética Arquitectónica -->
            <div data-tbb-tilt class="tbb-bento-card tbb-apple-reveal" style="grid-column:span 4; min-height:280px; position:relative; overflow:hidden; border-radius:20px; border:2px solid #CBD5E1;">
              <img src="/assets/avi/brandbook_plate_architectural_signage.jpg" alt="Señalética Arquitectónica" style="width:100%; height:100%; object-fit:cover; display:block;" />
              <div style="position:absolute; top:12px; right:12px; background:rgba(9,13,22,0.9); border-radius:50%; padding:4px;">${window.tbbBuildOfficialBrandbook1EmblemSVG(26)}</div>
              <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(9,13,22,0.08) 0%, rgba(9,13,22,0.92) 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:18px; color:#FFFFFF;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:#0D2540;">LÁMINA 25 · ESPACIO FÍSICO</span>
                <h4 style="font-size:1.08rem; font-weight:900; margin:2px 0;">Señalética y Fachadas</h4>
                <p style="font-size:0.74rem; color:#CBD5E1; margin:0;">Tótems de recepción y relieve retroiluminado.</p>
              </div>
            </div>

            <!-- 4. Ecosistema Digital -->
            <div data-tbb-tilt class="tbb-bento-card tbb-apple-reveal" style="grid-column:span 4; min-height:280px; position:relative; overflow:hidden; border-radius:20px; border:2px solid #CBD5E1;">
              <img src="/assets/avi/brandbook_plate_digital_ecosystem.jpg" alt="Ecosistema Digital y UI/UX" style="width:100%; height:100%; object-fit:cover; display:block;" />
              <div style="position:absolute; top:12px; right:12px; background:rgba(9,13,22,0.9); border-radius:50%; padding:4px;">${window.tbbBuildOfficialBrandbook1EmblemSVG(26)}</div>
              <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(9,13,22,0.08) 0%, rgba(9,13,22,0.92) 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:18px; color:#FFFFFF;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:#93C5FD;">LÁMINA 26 · SISTEMA DIGITAL</span>
                <h4 style="font-size:1.08rem; font-weight:900; margin:2px 0;">Ecosistema Móvil y Web</h4>
                <p style="font-size:0.74rem; color:#CBD5E1; margin:0;">Tokens UI, App Icons iOS/Android y contraste WCAG AAA.</p>
              </div>
            </div>

            <!-- 5. Bordado Textil -->
            <div data-tbb-tilt class="tbb-bento-card tbb-apple-reveal" style="grid-column:span 4; min-height:280px; position:relative; overflow:hidden; border-radius:20px; border:2px solid #CBD5E1;">
              <img src="/assets/avi/brandbook_plate_apparel_embroidery.jpg" alt="Bordado Textil de Precisión" style="width:100%; height:100%; object-fit:cover; display:block;" />
              <div style="position:absolute; top:12px; right:12px; background:rgba(9,13,22,0.9); border-radius:50%; padding:4px;">${window.tbbBuildOfficialBrandbook1EmblemSVG(26)}</div>
              <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(9,13,22,0.08) 0%, rgba(9,13,22,0.92) 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:18px; color:#FFFFFF;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:#0D2540;">LÁMINA 28 · INDUMENTARIA</span>
                <h4 style="font-size:1.08rem; font-weight:900; margin:2px 0;">Bordado Textil de Precisión</h4>
                <p style="font-size:0.74rem; color:#CBD5E1; margin:0;">Densidad de puntada y versiones monocromáticas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        <section id="tbbCommPricingSection" style="padding:68px 24px 90px 24px; background:#FFFFFF;">
        <div style="max-width:1080px; margin:0 auto; display:flex; flex-direction:column; gap:26px;">
          <div class="tbb-apple-reveal" style="text-align:center; max-width:760px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8;">
              ${t("pricingTag")}
            </div>
            <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.85rem, 3.4vw, 2.45rem); font-weight:900; color:#090D16; margin:6px 0;">
              ${t("pricingTitle")}
            </h2>
            <p style="font-size:0.95rem; font-weight:600; color:#475569; margin:0;">
              ${t("pricingSub")}
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:22px;">
            <!-- Plan 1: Pro Empresario ($49 USD) -->
            <div data-tbb-tilt class="tbb-apple-reveal" style="background:#FFFFFF; border:3px solid #1D4ED8; border-top:8px solid #0D2540; border-radius:24px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; gap:20px; box-shadow:0 18px 45px rgba(29,78,216,0.12);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#0D2540;">MÁS POPULAR · BRANDBOOK 1.0</span>
                  <span style="background:#EFF6FF; color:#1D4ED8; border:1px solid #93C5FD; border-radius:999px; padding:3px 11px; font-size:0.70rem; font-weight:800;">iOS · Android · Mac · Web</span>
                </div>
                <h3 style="font-size:1.45rem; font-weight:900; color:#090D16; margin:8px 0 4px 0;">${t("planSingleName")}</h3>
                <div style="font-size:2.55rem; font-weight:900; color:#090D16; line-height:1;">${t("planSinglePrice")}</div>
                <div style="font-size:0.80rem; font-weight:700; color:#64748B; margin-top:4px;">${t("planSinglePeriod")}</div>
                <ul style="margin:16px 0 0 0; padding-left:18px; font-size:0.86rem; font-weight:700; color:#1E293B; line-height:1.7;">
                  <li>Recorrido guiado de los Pasos 0 al 6 con Aura en vivo</li>
                  <li>Generación y evolución ilimitada de logotipo en curvas SVG</li>
                  <li>Manual Oficial de Manual de Marca de 30 Hojas en Curvas (.PDF + .HTML interactivo)</li>
                  <li>Sincronización en la nube y 6 idiomas (ES, EN, FR, PT, DE, IT)</li>
                </ul>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'card')" style="width:100%; padding:13px; font-size:0.90rem;">
                  <span>${t("buyNowSticky")}</span>
                </button>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'apple_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'google_pay')" style="background:#1D4ED8; color:#FFFFFF; border:none; border-radius:10px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'paypal')" style="background:#F0F7FF; color:#0D2540; border:1.5px solid #0D2540; border-radius:10px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>
              </div>
            </div>

            <!-- Plan 2: Atelier Multi-Marca ($149 USD) -->
            <div data-tbb-tilt class="tbb-apple-reveal" style="background:#F8FAFC; border:2px solid #090D16; border-top:8px solid #1D4ED8; border-radius:24px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8;">AGENCIAS Y GRUPOS EMPRESARIALES</span>
                  <span style="background:#F0F7FF; color:#0D2540; border:1px solid #93C5FD; border-radius:999px; padding:3px 11px; font-size:0.70rem; font-weight:800;">Multi-Marca</span>
                </div>
                <h3 style="font-size:1.45rem; font-weight:900; color:#090D16; margin:8px 0 4px 0;">${t("planAgencyName")}</h3>
                <div style="font-size:2.55rem; font-weight:900; color:#090D16; line-height:1;">${t("planAgencyPrice")}</div>
                <div style="font-size:0.80rem; font-weight:700; color:#64748B; margin-top:4px;">${t("planAgencyPeriod")}</div>
                <ul style="margin:16px 0 0 0; padding-left:18px; font-size:0.86rem; font-weight:700; color:#1E293B; line-height:1.7;">
                  <li>Marcas ilimitadas (Monolíticas y Sistemas Multimarcas)</li>
                  <li>Paquete técnico completo para imprenta Offset CMYK y Pantone</li>
                  <li>Licencia comercial para entrega de manuales a tus clientes</li>
                  <li>Certificación técnica para registro de marca (IMPI / USPTO / EUIPO)</li>
                </ul>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'card')" style="width:100%; padding:13px; font-size:0.90rem;">
                  <span>Comprar Licencia Atelier · $149 USD</span>
                </button>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'apple_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'google_pay')" style="background:#1D4ED8; color:#FFFFFF; border:none; border-radius:10px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'paypal')" style="background:#F0F7FF; color:#0D2540; border:1.5px solid #0D2540; border-radius:10px; padding:9px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 4: VIDEOS Y LIBROS (AURA 02:48 + AUTORES YOUTUBE + LIBROS)    -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_4" style="display:${st.activeMainSection === 4 ? 'block' : 'none'};">
        <section id="tbbCommVideoSection" style="padding:64px 24px; background:#090D16; color:#FFFFFF; border-bottom:2px solid #1D4ED8;">
        <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:24px;">
          <div class="tbb-apple-reveal" style="display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#FF7A00; letter-spacing:0.08em; display:flex; align-items:center; gap:6px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>${t("videoSectionTag")}</span>
              </div>
              <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#FFFFFF; margin:6px 0;">
                ${t("videoSectionTitle")}
              </h2>
              <p style="font-size:0.92rem; font-weight:500; color:#CBD5E1; margin:0; max-width:760px;">
                ${t("videoSectionSub")}
              </p>
            </div>
            <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:11px 20px; font-size:0.86rem; border-bottom:2.5px solid #FF7A00;">
              <span>${t("buyNowSticky")}</span>
            </button>
          </div>

          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:6px;">
            ${VIDEO_CAPSULES.map((c, idx) => `
              <button type="button" id="tbbVidTab_${idx}" class="tbb-comm-btn-outline ${idx === st.activeVideoStep ? 'is-active' : ''}" onclick="window.tbbSelectMasterclassChapter(${idx})" style="flex-shrink:0; font-size:0.78rem; padding:9px 14px;">
                <span>Capítulo ${c.step} · ${c.title.split(':')[0]}</span>
              </button>
            `).join("")}
          </div>

          <div class="tbb-apple-reveal" style="background:#050811; border:2px solid #1D4ED8; border-top:6px solid #0D2540; border-radius:24px; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.6); position:relative;">
            <div style="aspect-ratio:16/9; width:100%; max-height:540px; background:#000000; position:relative;">
              <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" poster="${activeCapsule.poster || '/assets/videos/poster_aura_recorrido.jpg'}" playsinline webkit-playsinline controls preload="metadata" style="width:100%; height:100%; object-fit:contain; display:block;"></video>
              
              <!-- Botón de Reproducción Central Navy Blue con Micro-Acento Naranja -->
              <div id="tbbVideoPlayOverlay" onclick="window.tbbToggleMasterclassPlay()" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(9,13,22,0.35); cursor:pointer;">
                <div style="width:78px; height:78px; border-radius:50%; background:#0D2540; border:2.5px solid #4C9DE6; border-bottom:3.5px solid #FF7A00; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 32px rgba(13,37,64,0.6); transition:transform 0.2s ease;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" style="margin-left:3px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            </div>

            <div style="background:rgba(9,13,22,0.96); padding:18px 22px; display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; border-top:1.5px solid rgba(255,255,255,0.12);">
              <div style="flex:1; min-width:260px;">
                <h3 id="tbbMasterclassTitle" style="font-size:1.12rem; font-weight:900; margin:0; color:#FFFFFF;">
                  ${activeCapsule.title}
                </h3>
                <div id="tbbMasterclassAuthor" style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#93C5FD; margin-top:2px;">
                  ${activeCapsule.author} · ${activeCapsule.duration}
                </div>
                <div id="tbbMasterclassQuote" style="font-size:0.82rem; font-weight:600; color:#CBD5E1; margin-top:4px;">
                  ${activeCapsule.quote}
                </div>
              </div>

              <div style="display:flex; gap:10px; flex-shrink:0;">
                <button type="button" id="tbbBtnVidPlayPause" class="tbb-comm-btn-blue" onclick="window.tbbToggleMasterclassPlay()" style="padding:10px 18px; font-size:0.84rem; border-bottom:2.5px solid #FF7A00;">
                  <span>▶ ${t("videoPlayBtn")}</span>
                </button>
                <button type="button" id="tbbBtnVidMute" class="tbb-comm-btn-outline" onclick="window.tbbToggleMasterclassMute()" style="padding:10px 14px; font-size:0.82rem;">
                  <span>Activar Audio (${t("videoUnmuteBtn")})</span>
                </button>
              </div>
            </div>
          </div>

          <!-- VIDEOTECA DE YOUTUBE DE LOS AUTORES -->
          <div style="margin-top:44px; padding-top:32px; border-top:1.5px solid rgba(255,255,255,0.12);">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#FF7A00; letter-spacing:0.08em; display:flex; align-items:center; gap:6px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
              <span>LOS PILARES METODOLÓGICOS EN YOUTUBE</span>
            </div>
            <h3 style="font-family:'Montserrat', sans-serif; font-size:1.65rem; font-weight:900; color:#FFFFFF; margin:6px 0 16px 0;">
              Conferencias Magistrales de los Autores
            </h3>
            <p style="font-size:0.88rem; color:#94A3B8; margin:0 0 24px 0; max-width:720px;">
              Profundiza con los pensadores que inspiraron cada paso de nuestra arquitectura de marca.
            </p>

            <div class="tbb-comm-grid-3" style="gap:16px;">
              ${YOUTUBE_METHODOLOGY_AUTHORS.map(a => `
                <div style="background:#0F172A; border:1px solid #1E293B; border-radius:16px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s ease;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.66rem; font-weight:800; color:#4C9DE6; background:#071526; border:1px solid #1D4ED8; padding:2px 8px; border-radius:999px;">
                        ${a.step}
                      </span>
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#64748B;">${a.duration}</span>
                    </div>
                    <h4 style="font-family:'Montserrat',sans-serif; font-size:0.98rem; font-weight:800; color:#FFFFFF; margin:0 0 6px 0; line-height:1.3;">
                      ${a.title}
                    </h4>
                    <div style="font-size:0.76rem; font-weight:700; color:#93C5FD; margin-bottom:8px;">${a.author} · ${a.channel}</div>
                    <p style="font-size:0.76rem; color:#94A3B8; line-height:1.45; margin:0;">${a.topic}</p>
                  </div>
                  <button type="button" class="tbb-comm-btn-black" onclick="window.tbbPlayYouTubeAuthorVideo('${a.id}')" style="margin-top:14px; padding:8px 12px; font-size:0.76rem; background:#0D2540; border:1px solid #4C9DE6; color:#FFFFFF; width:100%; border-radius:8px; cursor:pointer;">
                    <span>▶ Ver Conferencia en YouTube</span>
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- BIBLIOTECA DE LIBROS RECOMENDADOS PARA EMPRENDEDORES -->
          <div style="margin-top:44px; padding-top:32px; border-top:1.5px solid rgba(255,255,255,0.12);">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap; margin-bottom:20px;">
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#FF7A00; letter-spacing:0.08em; display:flex; align-items:center; gap:6px;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                  <span>BIBLIOTECA DEL FUNDADOR · LECTURAS ESENCIALES</span>
                </div>
                <h3 style="font-family:'Montserrat', sans-serif; font-size:1.65rem; font-weight:900; color:#FFFFFF; margin:6px 0;">
                  Libros Recomendados para Emprendedores
                </h3>
                <p style="font-size:0.88rem; color:#94A3B8; margin:0; max-width:680px;">
                  Los títulos que todo líder empresarial debe consultar para validar su modelo de negocio, diseñar su propuesta de valor y construir una marca indestructible.
                </p>
              </div>

              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <button type="button" class="tbb-book-filter-pill is-active" data-cat="all" onclick="window.tbbFilterBooksCategory('all')">Todos</button>
                <button type="button" class="tbb-book-filter-pill" data-cat="canvas" onclick="window.tbbFilterBooksCategory('canvas')">Canvas & Modelo</button>
                <button type="button" class="tbb-book-filter-pill" data-cat="branding" onclick="window.tbbFilterBooksCategory('branding')">Propósito & Marca</button>
                <button type="button" class="tbb-book-filter-pill" data-cat="story" onclick="window.tbbFilterBooksCategory('story')">Narrativa & Ventas</button>
              </div>
            </div>

            <div class="tbb-comm-grid-3" style="gap:16px;">
              ${FOUNDER_ESSENTIAL_BOOKS.map(b => `
                <div class="tbb-book-card" data-cat="${b.category}" style="background:#0F172A; border:1px solid #1E293B; border-radius:16px; padding:16px; display:flex; gap:14px; align-items:stretch;">
                  <div style="width:90px; min-width:90px; height:130px; border-radius:8px; overflow:hidden; box-shadow:0 6px 16px rgba(0,0,0,0.5); flex-shrink:0; background:#000000;">
                    <img src="/assets/books/${b.coverImg}" alt="${b.title}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.onerror=null; this.parentElement.style.background='${b.badgeColor}'; this.remove();" />
                  </div>
                  <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between; min-width:0;">
                    <div>
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.62rem; font-weight:800; color:#4C9DE6;">${b.categoryLabel}</span>
                      <h4 style="font-family:'Montserrat',sans-serif; font-size:0.92rem; font-weight:900; color:#FFFFFF; margin:3px 0 2px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${b.title}">
                        ${b.title}
                      </h4>
                      <div style="font-size:0.72rem; font-weight:700; color:#93C5FD; margin-bottom:6px;">${b.author}</div>
                      <p style="font-size:0.72rem; color:#94A3B8; line-height:1.4; margin:0; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">
                        ${b.takeaway}
                      </p>
                    </div>
                    <div style="display:flex; gap:6px; margin-top:10px; flex-wrap:wrap;">
                      <a href="${b.kindleUrl}" target="_blank" rel="noopener" class="tbb-btn-kindle" style="padding:4px 8px; font-size:0.68rem;">📖 Kindle</a>
                      <a href="${b.appleBooksUrl}" target="_blank" rel="noopener" class="tbb-btn-apple-books" style="padding:4px 8px; font-size:0.68rem;"> Apple Books</a>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // 11. FUNCIONES INTERACTIVAS DE LA DEMO EN VIVO
  // ---------------------------------------------------------------------------
  window.tbbSwitchCommercialDemoStep = function (stepNum) {
    window.tbbCommercialDemoState.activeDemoStep = stepNum === 2 ? 2 : 1;
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
    window.tbbTriggerCommercialAuraFeedback(stepNum === 2 ? "touchpoint" : "why");
  };

  window.tbbUpdateCommercialDemoField = function (fieldKey, value) {
    window.tbbCommercialDemoState[fieldKey] = String(value || "");
    window.tbbSyncCommercialDemoToAppState();
    const gcWrap = document.getElementById("tbbCommGoldenCircleSvgWrap");
    if (gcWrap) gcWrap.innerHTML = window.tbbBuildCircularGoldenCircleSVG();
    const coverWrap = document.getElementById("tbbCommHeroCoverWrapper");
    if (coverWrap) coverWrap.innerHTML = window.tbbBuildBrandbook1CoverPreviewHTML();
    const expStage = document.getElementById("tbbExplorerPlateLiveStage");
    if (expStage) expStage.innerHTML = window.tbbBuildExplorerPlateStageHTML(window.tbbCommercialDemoState.activeExplorerPlate);
  };

  window.tbbPolishCommercialDemoStep1 = function () {
    const st = window.tbbCommercialDemoState;
    const refine = typeof window.tbbRefineUserCopyOrthoAndClarity === "function"
      ? window.tbbRefineUserCopyOrthoAndClarity
      : (txt) => String(txt || "").trim();

    st.businessGiro = refine(st.businessGiro, "giro", st.brandName, st.businessGiro);
    st.whyPurpose = refine(st.whyPurpose, "golden_circle", st.brandName, st.businessGiro);
    st.howMethod = refine(st.howMethod, "process_steps_text", st.brandName, st.businessGiro);
    st.whatOffer = refine(st.whatOffer, "value_offer", st.brandName, st.businessGiro);

    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
    window.tbbTriggerCommercialAuraFeedback("what");
  };

  window.tbbToggleCommercialDemoTouchpoint = function (stateKey, itemText) {
    const st = window.tbbCommercialDemoState;
    const list = Array.isArray(st[stateKey]) ? st[stateKey] : [];
    const idx = list.indexOf(itemText);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(itemText);
    st[stateKey] = list;
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
    window.tbbTriggerCommercialAuraFeedback("touchpoint");
  };

  window.tbbAddCommercialDemoCustomTouchpoint = function () {
    const inp = document.getElementById("tbbDemoCustomTpInput");
    const sel = document.getElementById("tbbDemoCustomTpPhase");
    if (!inp || !sel) return;
    const val = inp.value.trim();
    if (!val) return;
    const stateKey = sel.value || "tpBefore";
    const st = window.tbbCommercialDemoState;
    if (!st[stateKey].includes(val)) {
      st[stateKey].push(val);
    }
    inp.value = "";
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
    window.tbbTriggerCommercialAuraFeedback("touchpoint");
  };

  window.tbbContinueFromDemoIntoFullStudio = function () {
    window.tbbSyncCommercialDemoToAppState();
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY) || localStorage.getItem("thebestbrand_pro_license"));
    if (!isLicensed) {
      // Bloqueo estratégico y elegante: los Pasos 0, 1 y 2 fueron gratuitos; para Paso 3 en adelante se requiere la app
      window.tbbOpenBuyAppCheckoutModal('pro_atelier');
      return;
    }
    if (document.body.getAttribute("data-tbb-standalone-web") === "true") {
      window.location.href = "/studio";
      return;
    }
    window.tbbCloseCommercialPortalModal();
    if (typeof window.tbbJumpToStep === "function") {
      window.tbbJumpToStep(3, 1);
    }
  };

  window.tbbChangeCommercialLanguage = function (langCode) {
    const clean = String(langCode || "es").toLowerCase().trim();
    try {
      localStorage.setItem(LANG_STORAGE_KEY, clean);
    } catch (e) {}
    if (typeof window.tbbSetApplicationLanguage === "function") {
      window.tbbSetApplicationLanguage(clean);
    }
    window.tbbRefreshCommercialPortalDOM();
    window.tbbRenderCheckoutModalContent();
    window.tbbUpdateAlwaysOnFloatingBarText();
  };

  // ---------------------------------------------------------------------------
  // 12. MODAL DE CHECKOUT MULTI-MÉTODO (100% CONTRASTE PERFECTO SOBRE BLANCO)
  // ---------------------------------------------------------------------------
  window.tbbFormatCardInput = function (inputEl) {
    if (!inputEl) return;
    const digits = inputEl.value.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g) || [];
    inputEl.value = groups.join(" ");
  };

  window.tbbFormatExpiryInput = function (inputEl) {
    if (!inputEl) return;
    const digits = inputEl.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      inputEl.value = digits.slice(0, 2) + "/" + digits.slice(2);
    } else {
      inputEl.value = digits;
    }
  };

  window.tbbSelectCheckoutPlan = function (planId) {
    window.tbbCommercialDemoState.selectedPlan = planId === "agency_suite" ? "agency_suite" : "pro_atelier";
    window.tbbRenderCheckoutModalContent();
  };

  window.tbbSelectPaymentMethod = function (methodId) {
    window.tbbCommercialDemoState.selectedPaymentMethod = methodId || "card";
    window.tbbRenderCheckoutModalContent();
  };

  window.tbbProcessCheckoutPayment = async function (methodId) {
    const st = window.tbbCommercialDemoState;
    const planPrice = st.selectedPlan === "agency_suite" ? 149.00 : 49.00;
    const planLabel = st.selectedPlan === "agency_suite" ? t("planAgencyName") : t("planSingleName");
    const statusBox = document.getElementById("tbbCheckoutLiveStatusBox");

    if (methodId === "card") {
      const nameVal = (document.getElementById("tbbCardHolderInput")?.value || "").trim();
      const numVal = (document.getElementById("tbbCardNumberInput")?.value || "").replace(/\D/g, "");
      const expVal = (document.getElementById("tbbCardExpiryInput")?.value || "").trim();
      const cvcVal = (document.getElementById("tbbCardCvcInput")?.value || "").replace(/\D/g, "");
      if (nameVal.length < 3 || numVal.length < 13 || expVal.length < 4 || cvcVal.length < 3) {
        if (statusBox) {
          statusBox.style.display = "block";
          statusBox.style.background = "#FEF2F2";
          statusBox.style.borderColor = "#FCA5A5";
          statusBox.style.color = "#991B1B";
          statusBox.textContent = "Por favor verifica los datos de la tarjeta o selecciona Apple Pay, Google Pay o PayPal.";
        }
        return;
      }
    }

    if (statusBox) {
      statusBox.style.display = "block";
      statusBox.style.background = "#EFF6FF";
      statusBox.style.borderColor = "#1D4ED8";
      statusBox.style.color = "#1E3A8A";
      const methodNames = {
        card: "Tarjeta Bancaria (3D Secure)",
        apple_pay: "Apple Pay (Touch ID / Face ID)",
        google_pay: "Google Pay (Token Cifrado)",
        paypal: "PayPal Express"
      };
      statusBox.textContent = `Autorizando pago seguro vía ${methodNames[methodId] || methodId} por $${planPrice.toFixed(2)} USD...`;
    }

    setTimeout(() => {
      const licenseCode = "TBB-PRO-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Date.now().toString(36).slice(-4).toUpperCase();
      const receiptObj = {
        licenseCode,
        planId: st.selectedPlan,
        planLabel,
        amountUSD: planPrice,
        paymentMethod: methodId,
        brandName: st.brandName || "THE BEST BRAND",
        activatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receiptObj));
      } catch (e) {}

      window.tbbSyncCommercialDemoToAppState();
      window.tbbRenderCheckoutSuccessView(receiptObj);
      window.tbbUpdateAlwaysOnFloatingBarText();
    }, 550);
  };

  window.tbbRenderCheckoutSuccessView = function (receipt) {
    const container = document.getElementById("tbbCheckoutSheetInner");
    if (!container) return;
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:16px; text-align:center; padding:12px 6px;">
        <div style="margin:0 auto;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG(84)}
        </div>
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; font-weight:800; color:#0D2540;">
          PAGO AUTORIZADO · LICENCIA OFICIAL ACTIVADA
        </div>
        <h3 style="font-size:1.55rem; font-weight:900; color:#090D16; margin:0;">
          ¡Bienvenido a The Best Brand Pro!
        </h3>
        <div style="background:#EFF6FF; border:2px solid #1D4ED8; border-bottom:4px solid #0D2540; border-radius:18px; padding:16px; text-align:left; font-size:0.86rem; line-height:1.65; color:#090D16;">
          <div><strong>Código de Licencia:</strong> <span style="font-family:'JetBrains Mono', monospace; color:#1D4ED8; font-weight:900;">${escHtml(receipt.licenseCode)}</span></div>
          <div><strong>Plan Activado:</strong> ${escHtml(receipt.planLabel)} ($${receipt.amountUSD.toFixed(2)} USD)</div>
          <div><strong>Método de Pago:</strong> ${escHtml(receipt.paymentMethod.toUpperCase().replace("_", " "))}</div>
          <div><strong>Marca Vinculada:</strong> ${escHtml(receipt.brandName)}</div>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:6px;">
          <button type="button" class="tbb-comm-btn-black" onclick="window.tbbCloseBuyAppCheckoutModal(); window.tbbContinueFromDemoIntoFullStudio();" style="flex:1; padding:13px;">
            <span>Entrar al Estudio Completo con mi Marca →</span>
          </button>
          <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="flex:0.45; padding:13px;">
            Cerrar
          </button>
        </div>
      </div>
    `;
  };

  window.tbbRenderCheckoutModalContent = function () {
    const container = document.getElementById("tbbCheckoutSheetInner");
    if (!container) return;
    const st = window.tbbCommercialDemoState;
    const isAgency = st.selectedPlan === "agency_suite";
    const priceTxt = isAgency ? "$149.00 USD" : "$49.00 USD";
    const method = st.selectedPaymentMethod || "card";

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; border-bottom:1.5px solid #E2E8F0; padding-bottom:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG(42)}
          <div>
            <div style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:1.12rem; font-weight:900; color:#090D16;">
              ${t("checkoutTitle")}
            </div>
            <div style="font-size:0.78rem; font-weight:600; color:#475569;">
              ${t("checkoutSubtitle")}
            </div>
          </div>
        </div>
        <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="padding:6px 12px; font-size:0.84rem;">
          ✕
        </button>
      </div>

      <!-- Selector de Plan ($49 vs $149) con Contraste Nítido -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:14px;">
        <button type="button" class="tbb-tab-light-surface ${!isAgency ? 'is-active' : ''}" onclick="window.tbbSelectCheckoutPlan('pro_atelier')" style="flex-direction:column; align-items:flex-start; padding:12px 14px; text-align:left;">
          <span style="font-size:0.82rem; font-weight:900;">${t("planSingleName")}</span>
          <span style="font-size:1.05rem; font-weight:900; color:${!isAgency ? '#93C5FD' : '#0D2540'}; margin-top:2px;">$49 USD · Pago Único</span>
        </button>
        <button type="button" class="tbb-tab-light-surface ${isAgency ? 'is-active' : ''}" onclick="window.tbbSelectCheckoutPlan('agency_suite')" style="flex-direction:column; align-items:flex-start; padding:12px 14px; text-align:left;">
          <span style="font-size:0.82rem; font-weight:900;">${t("planAgencyName")}</span>
          <span style="font-size:1.05rem; font-weight:900; color:${isAgency ? '#93C5FD' : '#1D4ED8'}; margin-top:2px;">$149 USD · Multi-Marca</span>
        </button>
      </div>

      <!-- Pestañas de los 4 Métodos de Pago con 100% Contraste WCAG AAA -->
      <div style="margin-top:14px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.70rem; font-weight:800; color:#1D4ED8; margin-bottom:6px;">
          MÉTODO DE PAGO
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
          <button type="button" id="tbbPayTab_card" class="tbb-tab-light-surface ${method === 'card' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('card')" style="padding:10px 8px; font-size:0.78rem;">
            <span>${t("methodCard")}</span>
          </button>
          <button type="button" id="tbbPayTab_apple_pay" class="tbb-tab-light-surface ${method === 'apple_pay' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('apple_pay')" style="padding:10px 8px; font-size:0.78rem;">
            <span>Apple Pay</span>
          </button>
          <button type="button" id="tbbPayTab_google_pay" class="tbb-tab-light-surface ${method === 'google_pay' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('google_pay')" style="padding:10px 8px; font-size:0.78rem;">
            <span>Google Pay</span>
          </button>
          <button type="button" id="tbbPayTab_paypal" class="tbb-tab-light-surface ${method === 'paypal' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('paypal')" style="padding:10px 8px; font-size:0.78rem;">
            <span>PayPal</span>
          </button>
        </div>
      </div>

      <div style="margin-top:14px; background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:18px; padding:18px;">
        ${method === "card" ? `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div>
              <label style="display:block; font-size:0.75rem; font-weight:800; color:#090D16; margin-bottom:4px;">${t("cardHolderLabel")}</label>
              <input type="text" id="tbbCardHolderInput" placeholder="Ej. Jorge Benítez" value="Jorge Benítez" style="width:100%; height:42px; padding:0 12px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.88rem; font-weight:700; color:#090D16; background:#FFFFFF;" />
            </div>
            <div>
              <label style="display:block; font-size:0.75rem; font-weight:800; color:#090D16; margin-bottom:4px;">${t("cardNumberLabel")}</label>
              <input type="text" id="tbbCardNumberInput" oninput="window.tbbFormatCardInput(this)" placeholder="4532 •••• •••• 8890" value="4532 8910 4421 8890" maxlength="19" style="width:100%; height:42px; padding:0 12px; border-radius:10px; border:2px solid #1D4ED8; font-family:'JetBrains Mono', monospace; font-size:0.92rem; font-weight:800; color:#090D16; background:#FFFFFF;" />
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1.4fr; gap:10px;">
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:800; color:#090D16; margin-bottom:4px;">${t("cardExpiryLabel")}</label>
                <input type="text" id="tbbCardExpiryInput" oninput="window.tbbFormatExpiryInput(this)" placeholder="08/29" value="08/29" maxlength="5" style="width:100%; height:42px; padding:0 10px; border-radius:10px; border:2px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.88rem; font-weight:800; color:#090D16; background:#FFFFFF;" />
              </div>
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:800; color:#090D16; margin-bottom:4px;">CVC / CVV:</label>
                <input type="password" id="tbbCardCvcInput" placeholder="842" value="842" maxlength="4" style="width:100%; height:42px; padding:0 10px; border-radius:10px; border:2px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.88rem; font-weight:800; color:#090D16; background:#FFFFFF;" />
              </div>
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:800; color:#090D16; margin-bottom:4px;">${t("cardEmailLabel")}</label>
                <input type="email" id="tbbCardEmailInput" placeholder="tu@empresa.com" value="cliente@thebestbrand.app" style="width:100%; height:42px; padding:0 10px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.84rem; font-weight:700; color:#090D16; background:#FFFFFF;" />
              </div>
            </div>
            <button type="button" id="tbbConfirmPayBtn" class="tbb-comm-btn-black" onclick="window.tbbProcessCheckoutPayment('card')" style="width:100%; padding:13px; font-size:0.92rem; margin-top:4px;">
              <span>${t("payNowCardBtn")} (${priceTxt})</span>
            </button>
          </div>
        ` : method === "apple_pay" ? `
          <div style="display:flex; flex-direction:column; align-items:center; gap:12px; text-align:center; padding:10px;">
            <div style="background:#090D16; color:#FFFFFF; border-radius:14px; padding:14px 24px; font-size:1.12rem; font-weight:900;">
              Apple Pay · Touch ID / Face ID
            </div>
            <div style="font-size:0.85rem; font-weight:600; color:#334155; max-width:460px;">
              Autoriza de forma instantánea en tu iPhone, iPad o Mac. Total a pagar: <strong>${priceTxt}</strong>.
            </div>
            <button type="button" id="tbbConfirmPayBtn" onclick="window.tbbProcessCheckoutPayment('apple_pay')" style="width:100%; min-height:50px; background:#090D16; color:#FFFFFF; border:2px solid #090D16; border-bottom:4px solid #0D2540; border-radius:14px; font-size:0.94rem; font-weight:900; cursor:pointer;">
              ${t("payNowAppleBtn")} · ${priceTxt}
            </button>
          </div>
        ` : method === "google_pay" ? `
          <div style="display:flex; flex-direction:column; align-items:center; gap:12px; text-align:center; padding:10px;">
            <div style="background:#1D4ED8; color:#FFFFFF; border-radius:14px; padding:14px 24px; font-size:1.12rem; font-weight:900;">
              Google Pay · Checkout en un Toque
            </div>
            <div style="font-size:0.85rem; font-weight:600; color:#334155; max-width:460px;">
              Usa las tarjetas guardadas en tu cuenta de Google. Total a pagar: <strong>${priceTxt}</strong>.
            </div>
            <button type="button" id="tbbConfirmPayBtn" class="tbb-comm-btn-blue" onclick="window.tbbProcessCheckoutPayment('google_pay')" style="width:100%; padding:14px; font-size:0.94rem;">
              <span>${t("payNowGoogleBtn")} · ${priceTxt}</span>
            </button>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; align-items:center; gap:12px; text-align:center; padding:10px;">
            <div style="background:#F0F7FF; color:#0D2540; border:2px solid #0D2540; border-radius:14px; padding:14px 24px; font-size:1.12rem; font-weight:900;">
              PayPal Express Checkout
            </div>
            <div style="font-size:0.85rem; font-weight:600; color:#334155; max-width:460px;">
              Protección al Comprador incluida. Total a pagar: <strong>${priceTxt}</strong>.
            </div>
            <button type="button" id="tbbConfirmPayBtn" class="tbb-comm-btn-black" onclick="window.tbbProcessCheckoutPayment('paypal')" style="width:100%; padding:14px; font-size:0.94rem;">
              <span>${t("payNowPayPalBtn")} · ${priceTxt}</span>
            </button>
          </div>
        `}

        <div id="tbbCheckoutLiveStatusBox" style="display:none; margin-top:12px; padding:12px; border-radius:12px; border:1.5px solid #1D4ED8; font-size:0.82rem; font-weight:800;"></div>
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // 13. HOJA DE ESTILOS GLOBAL V58.0 Y MONTAJE INTELIGENTE SIN OBSTRUCCIONES
  // ---------------------------------------------------------------------------
  function tbbInjectAwwwardsStyles() {
    let styleEl = document.getElementById("tbbCommercialAwwwardsStyle");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "tbbCommercialAwwwardsStyle";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      :root {
        --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      section, [id^="tbbComm"] {
        scroll-margin-top: 86px;
      }
      /* Header Monofila Desktop + Compacto Móvil */
      .tbb-awwwards-nav {
        position: sticky;
        top: 0;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 12px 24px;
        background: rgba(9, 13, 22, 0.92);
        backdrop-filter: blur(24px) saturate(180%);
        -webkit-backdrop-filter: blur(24px) saturate(180%);
        border-bottom: 1.5px solid rgba(255, 255, 255, 0.14);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);
      }
      .tbb-desktop-nav-links {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: nowrap;
      }
      .tbb-desktop-nav-links a {
        white-space: nowrap !important;
        font-size: 0.73rem !important;
        padding: 7px 11px !important;
      }
      @media (max-width: 540px) {
        .tbb-brand-inline-tagline {
          display: none !important;
        }
      }
      .tbb-mobile-hamburger-btn {
        display: none;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.08);
        border: 1.5px solid rgba(255, 255, 255, 0.22);
        color: #FFFFFF;
        font-size: 1.1rem;
        font-weight: 900;
        cursor: pointer;
      }
      @media (max-width: 1060px) {
        .tbb-desktop-nav-links,
        .tbb-desktop-only-ctrl,
        .tbb-brand-subtag {
          display: none !important;
        }
        .tbb-mobile-hamburger-btn {
          display: inline-flex !important;
        }
        .tbb-awwwards-nav {
          padding: 10px 12px;
          gap: 8px;
        }
        .tbb-brand-inline-tagline {
          display: none !important;
        }
      }
      @media (max-width: 640px) {
        .tbb-awwwards-nav {
          padding: 8px 10px;
        }
        .tbb-comm-btn-studio-header {
          padding: 6px 10px !important;
          font-size: 0.72rem !important;
          gap: 4px !important;
        }
        .tbb-mobile-hamburger-btn {
          width: 34px !important;
          height: 34px !important;
          font-size: 1rem !important;
        }
      }
      /* Mobile Slide-Over Drawer */
      .tbb-mobile-drawer-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(5, 8, 17, 0.72);
        backdrop-filter: blur(6px);
        z-index: 1998;
        display: none;
      }
      .tbb-mobile-drawer-backdrop.open {
        display: block;
      }
      .tbb-mobile-slide-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: min(320px, 86vw);
        background: #090D16;
        border-left: 2px solid #1D4ED8;
        padding: 20px 18px;
        z-index: 1999;
        transform: translateX(105%);
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        overflow-y: auto;
      }
      .tbb-mobile-slide-drawer.open {
        transform: translateX(0);
      }

      /* Botones de Superficie Oscura */
      .tbb-comm-btn-studio-header {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%);
        color: #FFFFFF !important;
        font-family: var(--font-main);
        font-weight: 800;
        text-decoration: none;
        border: 1.5px solid #4C9DE6;
        border-bottom: 2.5px solid #FF7A00;
        border-radius: 999px;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(13, 37, 64, 0.35);
        transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-comm-btn-studio-header:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(255, 122, 0, 0.35);
        border-color: #FF7A00;
      }
      .tbb-comm-btn-black {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, #4C9DE6 0%, #0D2540 100%);
        color: #FFFFFF !important;
        font-family: var(--font-main);
        font-weight: 800;
        text-decoration: none;
        border: none;
        border-radius: 999px;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(76, 157, 230, 0.38);
        transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-comm-btn-black:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 26px rgba(76, 157, 230, 0.56);
      }
      .tbb-comm-btn-blue {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
        color: #FFFFFF !important;
        font-family: var(--font-main);
        font-weight: 800;
        text-decoration: none;
        border: none;
        border-radius: 999px;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(29, 78, 216, 0.34);
        transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-comm-btn-blue:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 26px rgba(29, 78, 216, 0.52);
      }
      .tbb-comm-btn-outline {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.06);
        border: 1.5px solid rgba(255, 255, 255, 0.22);
        color: #E2E8F0 !important;
        font-family: var(--font-main);
        font-weight: 700;
        text-decoration: none;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-comm-btn-outline:hover {
        background: rgba(255, 255, 255, 0.14);
        border-color: #93C5FD;
        color: #FFFFFF !important;
      }
      .tbb-comm-btn-outline.is-active {
        background: rgba(29, 78, 216, 0.32) !important;
        border-color: #0D2540 !important;
        color: #FFFFFF !important;
        box-shadow: 0 0 16px rgba(76, 157, 230, 0.35);
      }

      /* Botones y Pestañas de Superficie Clara (100% Contraste WCAG AAA) */
      .tbb-btn-light-surface {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: #EFF6FF;
        border: 2px solid #1D4ED8;
        color: #1D4ED8 !important;
        font-family: var(--font-main);
        font-weight: 800;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-btn-light-surface:hover {
        background: #DBEAFE;
        color: #1E3A8A !important;
        transform: translateY(-1px);
      }
      .tbb-tab-light-surface {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: #FFFFFF;
        border: 2px solid #CBD5E1;
        border-bottom: 3.5px solid #94A3B8;
        color: #090D16 !important;
        font-family: var(--font-main);
        font-weight: 800;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-tab-light-surface:hover {
        border-color: #1D4ED8;
        background: #F8FAFC;
      }
      .tbb-tab-light-surface.is-active {
        background: #090D16 !important;
        border-color: #1D4ED8 !important;
        border-bottom: 4px solid #0D2540 !important;
        color: #FFFFFF !important;
        box-shadow: 0 10px 24px rgba(9, 13, 22, 0.18);
      }

      /* Apple Scroll Reveal */
      .tbb-apple-reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-apple-reveal.is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Grids & Bento */
      .tbb-comm-grid-2 {
        display: grid;
        grid-template-columns: 1.12fr 0.88fr;
        gap: 32px;
        align-items: center;
      }
      @media (max-width: 960px) {
        .tbb-comm-grid-2 {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
      @media (max-width: 860px) {
        #tbbCommDeliverablesSection div[style*="grid-template-columns:repeat(12"] > div {
          grid-column: span 12 !important;
          min-height: 250px !important;
        }
      }
      .tbb-bento-card {
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
      }
      .tbb-bento-card img {
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-bento-card:hover img {
        transform: scale(1.04);
      }
      @keyframes tbbMarquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      /* Barra Flotante Inferior Compacta No-Intrusiva (Solo en /web) */
      #tbbAlwaysOnBuyFloatingBar {
        position: fixed;
        bottom: 14px;
        right: 18px;
        z-index: 990;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 14px;
        background: rgba(9, 13, 22, 0.92);
        backdrop-filter: blur(18px) saturate(180%);
        -webkit-backdrop-filter: blur(18px) saturate(180%);
        border: 1.5px solid rgba(76, 157, 230, 0.75);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
        border-radius: 999px;
        transition: all 0.25s ease;
      }
      @media (max-width: 640px) {
        #tbbAlwaysOnBuyFloatingBar {
          right: 12px;
          left: 12px;
          bottom: 10px;
          justify-content: space-between;
          padding: 7px 12px;
        }
      }
      .tbb-float-buy-cta {
        background: linear-gradient(135deg, #4C9DE6 0%, #0D2540 100%);
        color: #FFFFFF;
        font-family: var(--font-main);
        font-weight: 800;
        border: none;
        border-radius: 999px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }

      /* Modales */
      #tbbCommercialPortalModalOverlay,
      #tbbBuyAppCheckoutModalOverlay {
        position: fixed;
        inset: 0;
        background: rgba(5, 8, 17, 0.82);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        z-index: 2100;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      #tbbCommercialPortalModalOverlay.open,
      #tbbBuyAppCheckoutModalOverlay.open {
        display: flex !important;
        opacity: 1 !important;
      }
      .tbb-comm-portal-sheet {
        max-width: 1180px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        background: #090D16;
        border: 1.5px solid rgba(255, 255, 255, 0.14);
        border-radius: 24px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.75);
        color: #FFFFFF;
      }
      
      /* PESTAÑAS STICKY DE LAS 4 SECCIONES (ImproBears & The Best Brand Standard) */
      .tbb-sections-tabs-bar {
        position: sticky;
        top: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(18px) saturate(180%);
        -webkit-backdrop-filter: blur(18px) saturate(180%);
        border-bottom: 2px solid #CBD5E1;
        box-shadow: 0 4px 18px rgba(13, 37, 64, 0.08);
        padding: 8px 12px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      .tbb-sec-tab {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #FFFFFF;
        color: #334155;
        border: 1.5px solid #CBD5E1;
        border-radius: 999px;
        padding: 8px 16px;
        font-family: var(--font-heading);
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        flex-shrink: 0;
      }
      .tbb-sec-tab:hover {
        border-color: #0D2540;
        color: #0D2540;
        transform: translateY(-1px);
      }
      .tbb-sec-tab.is-active {
        background: #0D2540 !important;
        color: #FFFFFF !important;
        border-color: #0D2540 !important;
        border-bottom: 3.5px solid #FF7A00 !important;
        box-shadow: 0 4px 14px rgba(13, 37, 64, 0.35);
      }
      .tbb-tab-number {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.70rem;
        font-weight: 800;
        opacity: 0.75;
      }
      .tbb-sec-tab.is-active .tbb-tab-number {
        color: #93C5FD;
        opacity: 1;
      }
      .tbb-tab-text {
        font-size: 0.82rem;
        font-weight: 800;
      }
      .tbb-badge-spark {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        font-weight: 800;
        background: rgba(255, 122, 0, 0.12);
        color: #FF7A00;
        border: 1px solid rgba(255, 122, 0, 0.35);
        border-radius: 999px;
        padding: 2px 7px;
        margin-left: 2px;
      }
      .tbb-sec-tab.is-active .tbb-badge-spark {
        background: #FF7A00 !important;
        color: #FFFFFF !important;
        border-color: #FF7A00 !important;
      }
      .tbb-tab-destello {
        position: relative;
        animation: tbbSparkPulse 2.8s infinite ease-in-out;
      }
      @keyframes tbbSparkPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(76, 157, 230, 0); }
        50% { box-shadow: 0 0 16px 3px rgba(255, 122, 0, 0.48); border-color: #FF7A00; }
      }
      @media (max-width: 640px) {
        .tbb-sections-tabs-bar {
          justify-content: flex-start;
          padding: 8px 10px;
          gap: 6px;
        }
        .tbb-sec-tab {
          padding: 7px 13px;
          font-size: 0.76rem;
        }
      }

      /* WebGL GLSL Shader & 60fps Nodes Layers */
      .webgl-liquid-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        opacity: 0.42;
        mix-blend-mode: screen;
      }
      .hero-dynamic-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
      }
      .dot-matrix-overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
        background-size: 24px 24px;
        pointer-events: none;
        z-index: 1;
      }

      /* Libros del Fundador */
      .tbb-book-filter-pill {
        background: rgba(255, 255, 255, 0.08);
        color: #CBD5E1;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 999px;
        padding: 5px 12px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-book-filter-pill:hover,
      .tbb-book-filter-pill.is-active {
        background: #4C9DE6;
        color: #0D2540;
        border-color: #FFFFFF;
      }
      .tbb-btn-kindle {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #0D2540;
        color: #FFFFFF;
        border: 1px solid #4C9DE6;
        border-radius: 8px;
        padding: 5px 9px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.70rem;
        font-weight: 800;
        text-decoration: none;
        transition: background 0.18s ease;
      }
      .tbb-btn-kindle:hover {
        background: #1D4ED8;
      }
      .tbb-btn-apple-books {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #1E293B;
        color: #FFFFFF;
        border: 1px solid #64748B;
        border-radius: 8px;
        padding: 5px 9px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.70rem;
        font-weight: 800;
        text-decoration: none;
        transition: background 0.18s ease;
      }
      .tbb-btn-apple-books:hover {
        background: #334155;
      }

      .tbb-checkout-sheet {
        max-width: 660px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        background: #FFFFFF;
        border: 2px solid #1D4ED8;
        border-top: 6px solid #0D2540;
        border-radius: 24px;
        padding: 22px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.75);
        color: #090D16;
      }
    `;
  }

  function ensureModalsAndFloatingBarMounted() {
    tbbInjectAwwwardsStyles();
    const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true";

    // CRÍTICO: En /studio (index.html) NO montamos #tbbAlwaysOnBuyFloatingBar encima de la barra
    // inferior porque /studio ya tiene los botones "Web / Demo" y "Comprar App" en el header superior,
    // evitando que tape el botón "Adelante / Continuar / Confirmar".
    if (isStandalone) {
      if (!document.getElementById("tbbAlwaysOnBuyFloatingBar")) {
        const floatBar = document.createElement("div");
        floatBar.id = "tbbAlwaysOnBuyFloatingBar";
        document.body.appendChild(floatBar);
      }
      window.tbbUpdateAlwaysOnFloatingBarText();
    } else {
      const existingFloat = document.getElementById("tbbAlwaysOnBuyFloatingBar");
      if (existingFloat) existingFloat.style.display = "none";
    }

    if (!document.getElementById("tbbCommercialPortalModalOverlay")) {
      const portalOv = document.createElement("div");
      portalOv.id = "tbbCommercialPortalModalOverlay";
      portalOv.setAttribute("role", "dialog");
      portalOv.setAttribute("aria-modal", "true");
      portalOv.innerHTML = `<div class="tbb-comm-portal-sheet" id="tbbCommercialPortalSheetInner"></div>`;
      document.body.appendChild(portalOv);
    }

    if (!document.getElementById("tbbBuyAppCheckoutModalOverlay")) {
      const checkOv = document.createElement("div");
      checkOv.id = "tbbBuyAppCheckoutModalOverlay";
      checkOv.setAttribute("role", "dialog");
      checkOv.setAttribute("aria-modal", "true");
      checkOv.innerHTML = `<div class="tbb-checkout-sheet" id="tbbCheckoutSheetInner"></div>`;
      document.body.appendChild(checkOv);
    }
  }

  window.tbbUpdateAlwaysOnFloatingBarText = function () {
    const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
    if (!floatBar) return;
    const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true";
    if (!isStandalone) {
      floatBar.style.display = "none";
      return;
    }
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    floatBar.style.display = "flex";
    floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="width:7px; height:7px; border-radius:50%; background:#FF7A00; box-shadow:0 0 8px #FF7A00; display:inline-block;"></span>
        ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
        <span style="font-size:0.72rem; font-weight:800; color:#E2E8F0; white-space:nowrap;">THE BEST BRAND <span style="color:#FF7A00;">1.0</span></span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
        ${isLicensed ? t("licenseActiveBadge") : t("buyNowSticky")}
      </button>
    `;
  };

  window.tbbRefreshCommercialPortalDOM = function () {
    const portalInner = document.getElementById("tbbCommercialPortalSheetInner");
    if (portalInner && document.getElementById("tbbCommercialPortalModalOverlay")?.classList.contains("open")) {
      portalInner.innerHTML = window.tbbBuildCommercialExperienceMarkup(false);
      window.tbbInitHeroParticlesCanvas();
      window.tbbInitAwwwardsInteractions();
    }
    const standaloneRoot = document.getElementById("tbbStandaloneCommercialPageRoot");
    if (standaloneRoot) {
      standaloneRoot.innerHTML = window.tbbBuildCommercialExperienceMarkup(true);
      window.tbbInitHeroParticlesCanvas();
      window.tbbInitAwwwardsInteractions();
    }
  };

  window.tbbOpenCommercialPortalModal = function () {
    ensureModalsAndFloatingBarMounted();
    const ov = document.getElementById("tbbCommercialPortalModalOverlay");
    const inner = document.getElementById("tbbCommercialPortalSheetInner");
    if (!ov || !inner) return;
    inner.innerHTML = window.tbbBuildCommercialExperienceMarkup(false);
    ov.classList.add("open");
    setTimeout(() => {
      window.tbbInitHeroParticlesCanvas();
      window.tbbInitAwwwardsInteractions();
    }, 50);
  };

  window.tbbCloseCommercialPortalModal = function () {
    const ov = document.getElementById("tbbCommercialPortalModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  window.tbbOpenBuyAppCheckoutModal = function (planId, preferredMethod) {
    ensureModalsAndFloatingBarMounted();
    if (planId) window.tbbCommercialDemoState.selectedPlan = planId;
    if (preferredMethod) window.tbbCommercialDemoState.selectedPaymentMethod = preferredMethod;
    window.tbbRenderCheckoutModalContent();
    const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (ov) ov.classList.add("open");
  };

  window.tbbCloseBuyAppCheckoutModal = function () {
    const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ensureModalsAndFloatingBarMounted();
      window.tbbRefreshCommercialPortalDOM();
    });
  } else {
    ensureModalsAndFloatingBarMounted();
    window.tbbRefreshCommercialPortalDOM();
  }
})();
