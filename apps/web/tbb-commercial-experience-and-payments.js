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
      title: "Paso 0: Objetivo, Logo Base y Esencia del Giro",
      author: "Aura · Mentora de Marca con IA",
      duration: "00:36",
      url: "/assets/videos/capsula_teoria_paso_0.mp4?v=90.0",
      poster: "/assets/videos/poster_paso_0.jpg?v=90.0",
      quote: "«The Best Brand te da el control total: de tu propósito nuclear al Manual Oficial de Marca de 36 Láminas en Curvas listo para imprenta en minutos.»"
    },
    {
      step: 1,
      title: "Paso 1: Diálogo Socrático Nuclear (Círculo Dorado)",
      author: "Simon Sinek & Donald Miller",
      duration: "00:38",
      url: "/assets/videos/capsula_teoria_paso_1.mp4?v=90.0",
      poster: "/assets/videos/poster_paso_1.jpg?v=90.0",
      quote: "«La gente no compra lo que haces, sino el porqué lo haces (Start With Why).»"
    },
    {
      step: 2,
      title: "Paso 2: Ingeniería de Touchpoints (Antes · Durante · Después)",
      author: "Jan Carlzon & Don Norman",
      duration: "00:38",
      url: "/assets/videos/capsula_teoria_paso_2.mp4?v=90.0",
      poster: "/assets/videos/poster_paso_2.jpg?v=90.0",
      quote: "«En quince segundos de contacto tu cliente decide si confía para siempre en tu marca.»"
    },
    {
      step: 3,
      title: "Paso 3: Fonética y Naming Estratégico",
      author: "Alexandra Watkins & David Placek",
      duration: "00:38",
      url: "/assets/videos/capsula_teoria_paso_3.mp4?v=90.0",
      poster: "/assets/videos/poster_paso_3.jpg?v=90.0",
      quote: "«Un gran nombre reduce a la mitad tu costo de adquisición de clientes.»"
    },
    {
      step: 4,
      title: "Paso 4: Calibración Visual Kansei y Tipografías",
      author: "Mitsuo Nagamachi & Robert Bringhurst",
      duration: "00:38",
      url: "/assets/videos/capsula_teoria_paso_4.mp4?v=90.0",
      poster: "/assets/videos/poster_paso_4.jpg?v=90.0",
      quote: "«La tipografía y la geometría transmiten confianza visceral antes de que la razón intervenga.»"
    },
    {
      step: 5,
      title: "Paso 5: Síntesis Vectorial 3D y Logotipo",
      author: "Paul Rand & Jony Ive",
      duration: "00:38",
      url: "/assets/videos/capsula_teoria_paso_5.mp4?v=90.0",
      poster: "/assets/videos/poster_paso_5.jpg?v=90.0",
      quote: "«El diseño no es solo cómo se ve, sino cómo transforma la complejidad en belleza y función.»"
    },
    {
      step: 6,
      title: "Paso 6: La Bóveda del Manual de Marca de 36 Láminas en Curvas",
      author: "Massimo Vignelli & Josef Müller-Brockmann",
      duration: "00:40",
      url: "/assets/videos/capsula_teoria_paso_6.mp4?v=90.0",
      poster: "/assets/videos/poster_paso_6.jpg?v=90.0",
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
    activeExplorerPlate: 1, // 1, 2, 4, 13, 14, 18, 21, 24, 25, 31, 32, 33, 34, 35, 36
    activeRightShowcaseMode: "deliverables", // "deliverables" | "plates" | "journey"
    activeDeliverableIdx: 0, // 0..8
    activeManualCropNum: 1, // 1..36
    activeJourneyLang: "es", // "es" | "en" | "fr" | "pt" | "de" | "it"
    activeJourneyStepIdx: 0, // 0..8
    videoIsPlaying: false,
    videoMuted: true,
    mobileDrawerOpen: false,
    brandName: "THE BEST BRAND",
    tagline: "YOUR BRAND, NOW!!!",
    businessGiro: "Plataforma interactiva con IA que guía a empresarios paso a paso para definir su identidad estratégica y generar su Manual Oficial de Marca de 36 Láminas en Curvas.",
    whyPurpose: "Porque creemos que la claridad de marca multiplica el valor de las empresas y libera tiempo mental al líder.",
    howMethod: "Combinamos el acompañamiento socrático de Aura, ingeniería Kansei y síntesis vectorial Apple Liquid Glass en curvas paso a paso.",
    whatOffer: "Suite ejecutiva de 9 entregables oficiales: Manual de 36 Láminas (.PDF y .HTML), vectores (.SVG y .AI), firma (.HTML), Word (.DOCX), PowerPoint (.PPTX) y Kit de Fuentes (.ZIP).",
    tpBefore: ["Búsqueda Web y App Store", "Demostración Interactiva en Línea (Pasos 1 y 2)", "Recomendación Directa de Empresarios"],
    tpDuring: ["Taller Guiado por Voz con Aura", "Lienzo Generativo de Logotipo en Tiempo Real", "Checkout Directo con Apple Pay, Google Pay y Tarjeta"],
    tpAfter: ["Bóveda Digital de Manual de Marca de 36 Láminas en PDF y HTML", "Suite Editable (.SVG, .AI, .DOCX, .PPTX, .HTML, .ZIP)", "Certificado Oficial de Registro y Vectores en Curvas"],
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
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:block; flex-shrink:0; filter:drop-shadow(0 4px 12px rgba(255,122,0,0.28));">
        <g data-tbb-parametric-liquid-glass="true" data-tbb-bezier-traced="true">
          <circle cx="100" cy="102" r="87" fill="#090D16" fill-opacity="0.10"/>
          <circle cx="100" cy="100" r="86" fill="#FF7A00"/>
          <circle cx="100" cy="100" r="84.2" fill="none" stroke="#FFF7ED" stroke-width="1.2" stroke-opacity="0.55"/>
          <circle cx="100" cy="100" r="81.2" fill="#EA580C" fill-opacity="0.65"/>
          <circle cx="100" cy="100" r="79.5" fill="#070D19"/>
          <circle cx="100" cy="100" r="76.5" fill="#0D2540" fill-opacity="0.88"/>
          <circle cx="100" cy="96" r="68" fill="#1E3A8A" fill-opacity="0.28"/>
          <circle cx="100" cy="100" r="77.2" fill="none" stroke="#60A5FA" stroke-width="1.3" stroke-opacity="0.42"/>
          <circle cx="100" cy="100" r="56" fill="#38BDF8" fill-opacity="0.12"/>
          <circle cx="100" cy="100" r="44" fill="#426EAE" fill-opacity="0.18"/>
          <path d="M 100.00 87.00 C 86.50 68.00, 81.50 43.00, 100.00 32.00 C 118.50 43.00, 113.50 68.00, 100.00 87.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 100.00 84.00 C 91.80 70.00, 88.60 48.00, 100.00 39.00 C 111.40 48.00, 108.20 70.00, 100.00 84.00 Z" fill="#BAE6FD" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 100.00 82.00 C 96.80 72.00, 95.50 54.00, 100.00 46.00 C 104.50 54.00, 103.20 72.00, 100.00 82.00 Z" fill="#FF7A00" fill-opacity="0.22" stroke="#FB923C" stroke-width="0.85" stroke-opacity="0.68"/>
          <path d="M 106.50 88.74 C 104.31 65.54, 112.48 41.39, 134.00 41.11 C 144.52 59.89, 127.69 79.04, 106.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 108.00 86.14 C 107.90 69.92, 116.13 49.27, 130.50 47.17 C 135.87 60.67, 122.10 78.12, 108.00 86.14 Z" fill="#38BDF8" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 111.26 93.50 C 120.96 72.31, 140.11 55.48, 158.89 66.00 C 158.61 87.52, 134.46 95.69, 111.26 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 113.86 92.00 C 121.88 77.90, 139.33 64.13, 152.83 69.50 C 150.73 83.87, 130.08 92.10, 113.86 92.00 Z" fill="#BAE6FD" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 113.00 100.00 C 132.00 86.50, 157.00 81.50, 168.00 100.00 C 157.00 118.50, 132.00 113.50, 113.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 116.00 100.00 C 130.00 91.80, 152.00 88.60, 161.00 100.00 C 152.00 111.40, 130.00 108.20, 116.00 100.00 Z" fill="#38BDF8" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 118.00 100.00 C 128.00 96.80, 146.00 95.50, 154.00 100.00 C 146.00 104.50, 128.00 103.20, 118.00 100.00 Z" fill="#FF7A00" fill-opacity="0.22" stroke="#FB923C" stroke-width="0.85" stroke-opacity="0.68"/>
          <path d="M 111.26 106.50 C 134.46 104.31, 158.61 112.48, 158.89 134.00 C 140.11 144.52, 120.96 127.69, 111.26 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 113.86 108.00 C 130.08 107.90, 150.73 116.13, 152.83 130.50 C 139.33 135.87, 121.88 122.10, 113.86 108.00 Z" fill="#BAE6FD" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 106.50 111.26 C 127.69 120.96, 144.52 140.11, 134.00 158.89 C 112.48 158.61, 104.31 134.46, 106.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 108.00 113.86 C 122.10 121.88, 135.87 139.33, 130.50 152.83 C 116.13 150.73, 107.90 130.08, 108.00 113.86 Z" fill="#38BDF8" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 100.00 113.00 C 113.50 132.00, 118.50 157.00, 100.00 168.00 C 81.50 157.00, 86.50 132.00, 100.00 113.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 100.00 116.00 C 108.20 130.00, 111.40 152.00, 100.00 161.00 C 88.60 152.00, 91.80 130.00, 100.00 116.00 Z" fill="#BAE6FD" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 100.00 118.00 C 103.20 128.00, 104.50 146.00, 100.00 154.00 C 95.50 146.00, 96.80 128.00, 100.00 118.00 Z" fill="#FF7A00" fill-opacity="0.22" stroke="#FB923C" stroke-width="0.85" stroke-opacity="0.68"/>
          <path d="M 93.50 111.26 C 95.69 134.46, 87.52 158.61, 66.00 158.89 C 55.48 140.11, 72.31 120.96, 93.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 92.00 113.86 C 92.10 130.08, 83.87 150.73, 69.50 152.83 C 64.13 139.33, 77.90 121.88, 92.00 113.86 Z" fill="#38BDF8" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 88.74 106.50 C 79.04 127.69, 59.89 144.52, 41.11 134.00 C 41.39 112.48, 65.54 104.31, 88.74 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 86.14 108.00 C 78.12 122.10, 60.67 135.87, 47.17 130.50 C 49.27 116.13, 69.92 107.90, 86.14 108.00 Z" fill="#BAE6FD" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 87.00 100.00 C 68.00 113.50, 43.00 118.50, 32.00 100.00 C 43.00 81.50, 68.00 86.50, 87.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 84.00 100.00 C 70.00 108.20, 48.00 111.40, 39.00 100.00 C 48.00 88.60, 70.00 91.80, 84.00 100.00 Z" fill="#38BDF8" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 82.00 100.00 C 72.00 103.20, 54.00 104.50, 46.00 100.00 C 54.00 95.50, 72.00 96.80, 82.00 100.00 Z" fill="#FF7A00" fill-opacity="0.22" stroke="#FB923C" stroke-width="0.85" stroke-opacity="0.68"/>
          <path d="M 88.74 93.50 C 65.54 95.69, 41.39 87.52, 41.11 66.00 C 59.89 55.48, 79.04 72.31, 88.74 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 86.14 92.00 C 69.92 92.10, 49.27 83.87, 47.17 69.50 C 60.67 64.13, 78.12 77.90, 86.14 92.00 Z" fill="#BAE6FD" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <path d="M 93.50 88.74 C 72.31 79.04, 55.48 59.89, 66.00 41.11 C 87.52 41.39, 95.69 65.54, 93.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/>
          <path d="M 92.00 86.14 C 77.90 78.12, 64.13 60.67, 69.50 47.17 C 83.87 49.27, 92.10 69.92, 92.00 86.14 Z" fill="#38BDF8" fill-opacity="0.20" stroke="#E0F2FE" stroke-width="0.65" stroke-opacity="0.55"/>
          <circle cx="100" cy="100" r="28" fill="none" stroke="#93C5FD" stroke-width="0.9" stroke-opacity="0.45"/>
          <circle cx="100" cy="100" r="30" fill="#FF7A00" fill-opacity="0.14"/>
          <circle cx="100" cy="100" r="25" fill="#FF7A00" fill-opacity="0.22"/>
          <circle cx="100" cy="100" r="21" fill="#FB923C" fill-opacity="0.34"/>
          <circle cx="100" cy="100" r="17.5" fill="#F97316" fill-opacity="0.48"/>
          <circle cx="100" cy="100" r="14.5" fill="#FDBA74" fill-opacity="0.68"/>
          <circle cx="100" cy="100" r="11.8" fill="#FFEDD5" fill-opacity="0.86"/>
          <circle cx="100" cy="100" r="9.2" fill="#FFFFFF" fill-opacity="0.96"/>
          <circle cx="100" cy="100" r="6.5" fill="#FFFFFF" fill-opacity="1.00"/>
          <path d="M 42 66 C 56 35, 144 35, 158 66 C 138 50, 62 50, 42 66 Z" fill="#FFFFFF" fill-opacity="0.26"/>
          <path d="M 54 54 C 72 34, 128 34, 146 54 C 126 43, 74 43, 54 54 Z" fill="#FFFFFF" fill-opacity="0.38"/>
          <path d="M 52 152 C 74 172, 126 172, 148 152 C 126 164, 74 164, 52 152 Z" fill="#7DD3FC" fill-opacity="0.28"/>
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
    const bGiro = st.businessGiro || "Plataforma interactiva con IA que guía a empresarios para definir su identidad estratégica y generar su Manual Oficial de 36 Láminas en Curvas.";

    return `
      <div data-tbb-tilt style="position:relative; background:linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%); border:2px solid #CBD5E1; border-radius:20px; overflow:hidden; padding:18px 18px 14px 18px; box-shadow:0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.12); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1);">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:10px; padding-bottom:8px; border-bottom:1.5px solid #E2E8F0;">
          <div style="display:flex; align-items:center; gap:9px;">
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand Official Logo" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:1.5px solid #FF7A00; box-shadow:0 4px 12px rgba(255,122,0,0.35);" />
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.56rem; font-weight:800; color:#FF7A00; letter-spacing:0.06em;">LÁMINA 01 / 36 · MANUAL OFICIAL REAL</div>
              <div style="font-family:'Montserrat', sans-serif; font-size:0.94rem; font-weight:900; color:#090D16; line-height:1.1;">${escHtml(bName)} · <span style="color:#1D4ED8; font-size:0.74rem;">${escHtml(bTag)}</span></div>
            </div>
          </div>
          <a href="/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf" target="_blank" rel="noopener" style="background:#0D2540; color:#FFFFFF; border:1.5px solid #4C9DE6; border-bottom:2.5px solid #FF7A00; border-radius:999px; padding:5px 11px; font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; text-decoration:none; white-space:nowrap;">
            Abrir PDF 36 Láminas ↗
          </a>
        </div>

        <div style="position:relative; border-radius:14px; overflow:hidden; border:1.5px solid #CBD5E1; background:#FFFFFF; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(1)">
          <img src="/assets/brandbook_plates_tbb/plate-01.jpg" alt="Portada Real Manual 36 Láminas The Best Brand" style="width:100%; height:auto; display:block;" />
          <div style="position:absolute; bottom:10px; right:10px; background:rgba(9,13,22,0.88); color:#FFFFFF; border:1px solid #4C9DE6; border-radius:999px; padding:4px 10px; font-family:'JetBrains Mono', monospace; font-size:0.60rem; font-weight:800;">
            🔍 Clic para Ampliar Lámina Real
          </div>
        </div>

        <div style="margin-top:10px; background:#F0F7FF; border:1px solid #93C5FD; border-radius:10px; padding:8px 11px; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; min-width:180px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.55rem; font-weight:800; color:#1D4ED8;">SÍNTESIS REACTIVA DE TU DEMO EN VIVO:</div>
            <div style="font-size:0.72rem; font-weight:700; color:#090D16; line-height:1.35; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${escHtml(bGiro)}</div>
          </div>
          <div style="display:flex; gap:6px; align-items:center;">
            <span style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:6px; padding:3px 7px; font-family:'JetBrains Mono', monospace; font-size:0.56rem; font-weight:800; color:#0D2540;">.PDF 36H</span>
            <span style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:6px; padding:3px 7px; font-family:'JetBrains Mono', monospace; font-size:0.56rem; font-weight:800; color:#1D4ED8;">.SVG/.AI</span>
            <span style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:6px; padding:3px 7px; font-family:'JetBrains Mono', monospace; font-size:0.56rem; font-weight:800; color:#EA580C;">.DOCX/.PPTX</span>
          </div>
        </div>
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // 7. CATÁLOGO OFICIAL DE LOS 9 ENTREGABLES + RECORTES DEL MANUAL DE 36 LÁMINAS + RECORRIDO MULTILINGÜE
  // ---------------------------------------------------------------------------
  const OFFICIAL_9_DELIVERABLES = [
    {
      num: "01",
      badge: ".PDF · 36 LÁMINAS EN CURVAS",
      title: "Manual Oficial de Identidad de 36 Láminas (Imprenta Offset & Digital)",
      desc: "Documento maestro de 36 hojas 16:9 sobre lienzo claro (#FFFFFF) con índice rector, Círculo Dorado, Touchpoints, terna de logotipos, retícula constructiva, paleta CMYK/Pantone y aplicaciones reales.",
      plateNum: 1,
      plateImg: "/assets/brandbook_plates_tbb/plate-01.jpg",
      sampleUrl: "/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf",
      sampleBtnLabel: "Ver / Descargar PDF Real (36 Láminas) ↗",
      accent: "#FF7A00"
    },
    {
      num: "02",
      badge: ".HTML · VISOR WEB INTERACTIVO",
      title: "Manual Web Autónomo de 36 Láminas (Listo para Compartir)",
      desc: "Versión interactiva autónoma en un solo archivo .HTML con navegación rápida entre las 36 láminas, ideal para enviar a proveedores, agencias, imprentas y equipo directivo.",
      plateNum: 2,
      plateImg: "/assets/brandbook_plates_tbb/plate-02.jpg",
      sampleUrl: "/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf",
      sampleBtnLabel: "Inspeccionar Índice de 36 Láminas ↗",
      accent: "#1D4ED8"
    },
    {
      num: "03",
      badge: ".SVG · VECTORES BÉZIER PUROS",
      title: "Logotipo Horizontal Oficial 100% en Curvas Matemáticas (.SVG)",
      desc: "Archivo vectorial escalable al infinito sin pérdida de nitidez, con geometría paramétrica Apple Liquid Glass lista para web, rotulación vehicular, espectaculares y bordado.",
      plateNum: 13,
      plateImg: "/assets/brandbook_plates_tbb/plate-13.jpg",
      sampleUrl: "/assets/logos/Logotipo_Horizontal_Curvas_the_best_brand.svg",
      sampleBtnLabel: "Descargar .SVG Horizontal Real ↗",
      accent: "#0D2540"
    },
    {
      num: "04",
      badge: ".AI · ADOBE ILLUSTRATOR NATIVO",
      title: "Archivo Maestro Editable en Capas para Diseño e Imprenta (.AI)",
      desc: "Código nativo PostScript/Illustrator con trazos vectoriales puros, capas organizadas y plasta de color oficial para diseñadores e imprentas industriales.",
      plateNum: 14,
      plateImg: "/assets/brandbook_plates_tbb/plate-14.jpg",
      sampleUrl: "/assets/logos/Isotipo_Simbolo_Curvas_the_best_brand.ai",
      sampleBtnLabel: "Descargar .AI Nativo Real ↗",
      accent: "#FF7A00"
    },
    {
      num: "05",
      badge: ".SVG + .PNG 1024px · APP ICON & SELLO",
      title: "Isotipo 1:1 Apple Liquid Glass, Avatar Social y Sello Circular",
      desc: "Suite de símbolos cuadrados 1:1 en alta resolución (1024×1024px) y curvas .SVG para ícono de App Store/Google Play, perfil de WhatsApp Business, LinkedIn, Instagram y lacre.",
      plateNum: 18,
      plateImg: "/assets/brandbook_plates_tbb/plate-18.jpg",
      sampleUrl: "/assets/logos/Isotipo_Simbolo_Curvas_the_best_brand.svg",
      sampleBtnLabel: "Ver Símbolo Vectorial .SVG ↗",
      accent: "#1D4ED8"
    },
    {
      num: "06",
      badge: ".HTML · GMAIL, OUTLOOK & APPLE MAIL",
      title: "Firma Corporativa de Correo Electrónico Interactiva (.HTML)",
      desc: "Plantilla ejecutiva personalizable con foto o isotipo oficial, cargo, teléfono, enlaces directos y botón de copia en 1 clic para pegar directo en Gmail, Outlook o Apple Mail.",
      plateNum: 33,
      plateImg: "/assets/brandbook_plates_tbb/plate-33.jpg",
      sampleUrl: "/assets/deliverables_tbb/Firma_Correo_Corporativa_the_best_brand.html",
      sampleBtnLabel: "Abrir Firma de Correo Real (.HTML) ↗",
      accent: "#0D2540"
    },
    {
      num: "07",
      badge: ".DOCX · MICROSOFT WORD & GOOGLE DOCS",
      title: "Plantilla Editable de Hoja Membretada Corporativa (.DOCX)",
      desc: "Documento oficial en formato Carta/A4 con encabezado vectorial, tipografías homologadas, tabla de cotización y pie de página institucional listo para escribir contratos y propuestas.",
      plateNum: 34,
      plateImg: "/assets/brandbook_plates_tbb/plate-34.jpg",
      sampleUrl: "/assets/deliverables_tbb/Plantilla_Hoja_Membretada_the_best_brand.docx",
      sampleBtnLabel: "Descargar Hoja Membretada (.DOCX) ↗",
      accent: "#1D4ED8"
    },
    {
      num: "08",
      badge: ".PPTX · POWERPOINT, KEYNOTE & SLIDES",
      title: "Presentación Ejecutiva Editable Widescreen 16:9 (.PPTX)",
      desc: "Master Deck corporativo con diapositivas editables (Portada, Propósito, Oferta Comercial, Metodología, Comparativa y Cierre) alineadas 100% a tu paleta y tipografía oficial.",
      plateNum: 35,
      plateImg: "/assets/brandbook_plates_tbb/plate-35.jpg",
      sampleUrl: "/assets/deliverables_tbb/Plantilla_Presentacion_Ejecutiva_the_best_brand.pptx",
      sampleBtnLabel: "Descargar Presentación 16:9 (.PPTX) ↗",
      accent: "#FF7A00"
    },
    {
      num: "09",
      badge: ".ZIP · KIT HÍBRIDO DE FUENTES (.TTF + TYPEKIT)",
      title: "Paquete Oficial de Tipografías Instalables (.TTF) y Gobernanza Web",
      desc: "Archivo .ZIP con las fuentes oficiales listas para instalar en Mac y Windows (Licencia Abierta SIL OFL) más hoja técnica de emparejamiento tipográfico y CSS/Adobe Typekit.",
      plateNum: 36,
      plateImg: "/assets/brandbook_plates_tbb/plate-36.jpg",
      sampleUrl: "/assets/deliverables_tbb/Kit_Fuentes_Oficiales_the_best_brand.zip",
      sampleBtnLabel: "Descargar Kit de Fuentes (.ZIP) ↗",
      accent: "#0D2540"
    }
  ];

  const MANUAL_36_PLATES_HIGHLIGHTS = [
    { n: 1, tag: "Lámina 01 / 36", title: "Portada Oficial Monolítica", desc: "Portada con el isotipo real de 12 pétalos Apple Liquid Glass y los 4 sellos de autenticidad." },
    { n: 2, tag: "Lámina 02 / 36", title: "Índice Rector de las 36 Láminas", desc: "Mapa estructural completo de las 6 secciones estratégicas y operativas del manual." },
    { n: 4, tag: "Lámina 04 / 36", title: "El Círculo Dorado (Simon Sinek)", desc: "Síntesis geométrica 100% circular del Propósito (WHY), Método (HOW) y Oferta (WHAT)." },
    { n: 6, tag: "Lámina 06 / 36", title: "Tono de Voz y Personalidad", desc: "Matriz verbal, pilares de comunicación ejecutiva y reglas de expresión de marca." },
    { n: 10, tag: "Lámina 10 / 36", title: "Ingeniería de Touchpoints (Carlzon)", desc: "Protocolo de Momentos de la Verdad Antes, Durante y Después de la compra con fotografía 4:3." },
    { n: 13, tag: "Lámina 13 / 36", title: "Terna Oficial de Logotipos", desc: "Lockup Horizontal Maestro, Tótem Vertical Central y Símbolo Puro App Icon 1:1 en curvas." },
    { n: 14, tag: "Lámina 14 / 36", title: "Anatomía y Retícula del Símbolo", desc: "Geometría áurea de 12 pétalos translúcidos con núcleo cálido naranja y halo azul cobalto." },
    { n: 18, tag: "Lámina 18 / 36", title: "Versión en Negativo sobre Soporte Oscuro", desc: "Calibración lumínica sobre fondo obsidiana (#090D16) y azul profundo (#0D2540)." },
    { n: 21, tag: "Lámina 21 / 36", title: "Paleta Cromática Oficial (HEX · CMYK · Pantone)", desc: "Especificación industrial de color para impresión offset, textil y pantallas Retina." },
    { n: 24, tag: "Lámina 24 / 36", title: "Ecosistema Digital, Web y App Icons", desc: "Gobernanza UI/UX, íconos iOS/Android y contraste WCAG AAA." },
    { n: 25, tag: "Lámina 25 / 36", title: "Papelería Corporativa Ejecutiva", desc: "Tarjetas de presentación, hoja membretada, sobre americano y carpeta institucional." },
    { n: 31, tag: "Lámina 31 / 36", title: "Showcase Editorial 4:3 (Parte I)", desc: "Fotografía hiperrealista con el logotipo real aplicado en contextos ejecutivos." },
    { n: 32, tag: "Lámina 32 / 36", title: "Showcase de Entorno y Fachada (Parte II)", desc: "Aplicaciones arquitectónicas, tótems, salas de consejo y experiencia física." },
    { n: 33, tag: "Lámina 33 / 36", title: "Entregable #6 · Firma de Correo HTML", desc: "Especificación y vista previa de la firma electrónica corporativa lista para copiar." },
    { n: 34, tag: "Lámina 34 / 36", title: "Entregable #7 · Hoja Membretada Editable (.DOCX)", desc: "Diseño normativo de página maestra para Word y Google Docs." },
    { n: 35, tag: "Lámina 35 / 36", title: "Entregable #8 · Presentación Ejecutiva 16:9 (.PPTX)", desc: "Sistema de diapositivas maestras Widescreen para ventas y consejo." },
    { n: 36, tag: "Lámina 36 / 36", title: "Entregable #9 · Certificado Vectorial (.SVG / .AI / .ZIP)", desc: "Sello de cierre, paquete tipográfico híbrido y garantía de vectores matemáticos." }
  ];

  const MULTILINGUAL_APP_JOURNEY_CAPTURES = [
    {
      stepCode: "PASO 0",
      img: "/assets/app_captures/step0_logo_aura.png",
      i18n: {
        es: { title: "Paso 0 · Objetivo, Nombre y Logo Base con Aura", uiBadge: "INTERFAZ EN ESPAÑOL · RECONOCIMIENTO DE VOZ Y TEXTO", desc: "Eliges si vas a crear una marca desde cero o evolucionar tu logo actual. Aura te escucha hablar de tu giro empresarial con su orbe 3D en tiempo real.", auraPrompt: "«Hola, soy Aura. Cuéntame con tus propias palabras a qué se dedica tu empresa y qué logotipo base deseas evolucionar o crear hoy.»" },
        en: { title: "Step 0 · Goal, Brand Name & Base Logo with Aura", uiBadge: "ENGLISH UI · LIVE VOICE & TEXT RECOGNITION", desc: "Choose whether to build a brand from scratch or evolve your existing logo. Aura listens to your business activity with her real-time 3D Liquid Glass orb.", auraPrompt: "«Hi, I'm Aura. Tell me in your own words what your company does and whether we're evolving your current logo or creating a new one.»" },
        fr: { title: "Étape 0 · Objectif, Nom et Logo de Base avec Aura", uiBadge: "INTERFACE EN FRANÇAIS · VOIX & TEXTE EN DIRECT", desc: "Choisissez de créer une marque ou de faire évoluer votre logo actuel. Aura analyse votre secteur d'activité en temps réel.", auraPrompt: "«Bonjour, je suis Aura. Décrivez-moi simplement votre activité principale et l'objectif visuel de votre marque.»" },
        pt: { title: "Passo 0 · Objetivo, Nome e Logo Base com Aura", uiBadge: "INTERFACE EM PORTUGUÊS · VOZ E TEXTO AO VIVO", desc: "Escolha criar do zero ou evoluir seu logotipo atual. Aura compreende seu ramo de negócio instantaneamente.", auraPrompt: "«Olá, sou a Aura. Conte-me com suas palavras o que sua empresa faz e qual é o seu objetivo de marca hoje.»" },
        de: { title: "Schritt 0 · Ziel, Markenname & Basis-Logo mit Aura", uiBadge: "DEUTSCHE OBERFLÄCHE · SPRACH- & TEXTMODUS", desc: "Wählen Sie zwischen Neuerstellung oder Weiterentwicklung Ihres bestehenden Logos mit Auras 3D-Echtzeit-Begleitung.", auraPrompt: "«Hallo, ich bin Aura. Erzählen Sie mir kurz, was Ihr Unternehmen macht und welches Marken-Ziel wir heute verfolgen.»" },
        it: { title: "Passo 0 · Obiettivo, Nome e Logo Base con Aura", uiBadge: "INTERFACCIA IN ITALIANO · VOCE E TESTO LIVE", desc: "Scegli se creare un marchio da zero o evolvere il tuo logo attuale con la guida vocale e visiva di Aura.", auraPrompt: "«Ciao, sono Aura. Raccontami con parole tue di cosa si occupa la tua azienda e quale obiettivo vogliamo raggiungere.»" }
      }
    },
    {
      stepCode: "PASO 1",
      img: "/assets/app_captures/step1_circulo_dorado.png",
      i18n: {
        es: { title: "Paso 1 · ADN y Círculo Dorado (Simon Sinek)", uiBadge: "ESPAÑOL · CORRECCIÓN EJECUTIVA EN 1 CLIC", desc: "Defines tu Porqué (WHY), tu Método (HOW) y tu Oferta (WHAT). Con un clic, el motor pule ortografía y redacción ejecutiva sin cambiar tu idea.", auraPrompt: "«Como enseña Simon Sinek: la gente no compra lo que haces, sino el propósito por el que lo haces. Definamos tu núcleo.»" },
        en: { title: "Step 1 · Brand DNA & Golden Circle (Simon Sinek)", uiBadge: "ENGLISH · 1-CLICK EXECUTIVE COPY POLISH", desc: "Define your Core Purpose (WHY), Differentiating Method (HOW), and Value Offer (WHAT) with instant executive clarity refinement.", auraPrompt: "«As Simon Sinek teaches: people don't buy what you do, they buy why you do it. Let's articulate your core purpose.»" },
        fr: { title: "Étape 1 · ADN et Cercle d'Or (Simon Sinek)", uiBadge: "FRANÇAIS · CLARTÉ EXÉCUTIVE EN 1 CLIC", desc: "Définissez votre Pourquoi (WHY), Comment (HOW) et Quoi (WHAT) avec correction orthographique et rédactionnelle instantanée.", auraPrompt: "«Comme l'affirme Simon Sinek : les gens n'achètent pas ce que vous faites, mais pourquoi vous le faites.»" },
        pt: { title: "Passo 1 · DNA e Círculo Dourado (Simon Sinek)", uiBadge: "PORTUGUÊS · REDAÇÃO EXECUTIVA EM 1 CLIQUE", desc: "Defina seu Propósito (WHY), Método (HOW) e Oferta (WHAT) com revisão executiva automática.", auraPrompt: "«Como ensina Simon Sinek: as pessoas não compram o que você faz, mas o porquê você faz.»" },
        de: { title: "Schritt 1 · Marken-DNA & Golden Circle (Simon Sinek)", uiBadge: "DEUTSCH · EXECUTIVE-REDAKTION PER KLICK", desc: "Definieren Sie Ihr Warum (WHY), Wie (HOW) und Was (WHAT) inklusive automatischer Stil- und Rechtschreiboptimierung.", auraPrompt: "«Wie Simon Sinek zeigt: Menschen kaufen nicht, was Sie tun, sondern warum Sie es tun.»" },
        it: { title: "Passo 1 · DNA e Cerchio d'Oro (Simon Sinek)", uiBadge: "ITALIANO · REVISIONE ESECUTIVA IN 1 CLIC", desc: "Definisci il tuo Perché (WHY), Come (HOW) e Cosa (WHAT) con perfezionamento stilistico immediato.", auraPrompt: "«Come insegna Simon Sinek: le persone non comprano ciò che fai, ma il perché lo fai.»" }
      }
    },
    {
      stepCode: "PASO 2",
      img: "/assets/app_captures/step2_touchpoints.png",
      i18n: {
        es: { title: "Paso 2 · Ingeniería de Touchpoints (Jan Carlzon)", uiBadge: "ESPAÑOL · MAPA ANTES · DURANTE · DESPUÉS", desc: "Seleccionas y personalizas los puntos de contacto clave donde tu cliente descubre, compra y recomienda tu marca.", auraPrompt: "«En quince segundos de contacto tu cliente decide si confía en tu marca. Diseñemos el Antes, Durante y Después.»" },
        en: { title: "Step 2 · Touchpoint Engineering (Jan Carlzon)", uiBadge: "ENGLISH · BEFORE · DURING · AFTER MATRIX", desc: "Map out the exact Moments of Truth where customers discover, experience, and stay loyal to your brand.", auraPrompt: "«In fifteen seconds of contact, your customer decides whether to trust your brand. Let's map Before, During, and After.»" },
        fr: { title: "Étape 2 · Ingénierie des Touchpoints (Jan Carlzon)", uiBadge: "FRANÇAIS · PARCOURS AVANT · PENDANT · APRÈS", desc: "Cartographiez chaque Moment de Vérité avant, pendant et après l'achat pour fidéliser vos clients.", auraPrompt: "«En quinze secondes d'interaction, votre client décide s'il fait confiance à votre marque.»" },
        pt: { title: "Passo 2 · Engenharia de Touchpoints (Jan Carlzon)", uiBadge: "PORTUGUÊS · JORNADA ANTES · DURANTE · DEPOIS", desc: "Mapeie os Momentos da Verdade antes, durante e depois da compra para eliminar atritos.", auraPrompt: "«Em quinze segundos de contato, seu cliente decide se confia na sua marca. Vamos estruturar cada etapa.»" },
        de: { title: "Schritt 2 · Touchpoint-Engineering (Jan Carlzon)", uiBadge: "DEUTSCH · VOR · WÄHREND · NACH DEM KAUF", desc: "Strukturieren Sie alle Kontaktpunkte vor, während und nach dem Kauf für maximale Kundenbindung.", auraPrompt: "«In fünfzehn Sekunden Kontakt entscheidet Ihr Kunde über Vertrauen und Loyalität.»" },
        it: { title: "Passo 2 · Ingegneria dei Touchpoint (Jan Carlzon)", uiBadge: "ITALIANO · PRIMA · DURANTE · DOPO L'ACQUISTO", desc: "Mappa i Momenti della Verità prima, durante e dopo l'acquisto per un'esperienza impeccabile.", auraPrompt: "«In quindici secondi di contatto il cliente decide se fidarsi per sempre del tuo marchio.»" }
      }
    },
    {
      stepCode: "PASO 3",
      img: "/assets/app_captures/step3_naming_niza.png",
      i18n: {
        es: { title: "Paso 3 · Naming Estratégico, Eslogan y Clases de Niza", uiBadge: "ESPAÑOL · CLASIFICACIÓN INTERNACIONAL IMPI / USPTO / EUIPO", desc: "Confirmas tu nombre comercial, eslogan rector y las Clases Internacionales de Niza exactas para blindar tu registro marcario.", auraPrompt: "«Hemos identificado las Clases de Niza ideales para proteger legalmente tu nombre y eslogan en tu sector.»" },
        en: { title: "Step 3 · Strategic Naming, Tagline & Nice Classes", uiBadge: "ENGLISH · USPTO / EUIPO / WIPO TRADEMARK CLASSES", desc: "Lock in your brand name, tagline, and international Nice Classification classes for trademark protection.", auraPrompt: "«We've matched your business activity with the exact Nice Classification classes for trademark registration.»" },
        fr: { title: "Étape 3 · Naming Stratégique, Slogan & Classes de Nice", uiBadge: "FRANÇAIS · CLASSIFICATION INPI / EUIPO / OMPI", desc: "Validez votre nom, votre slogan et les classes internationales de Nice pour déposer votre marque en sécurité.", auraPrompt: "«Voici les classes de Nice recommandées pour protéger juridiquement votre nom et votre slogan.»" },
        pt: { title: "Passo 3 · Naming Estratégico, Slogan e Classes de Nice", uiBadge: "PORTUGUÊS · CLASSIFICAÇÃO INPI / OMPI", desc: "Confirme seu nome, slogan e as Classes Internacionais de Nice para registro oficial da marca.", auraPrompt: "«Identificamos as Classes de Nice exatas para proteger legalmente o nome e o slogan da sua marca.»" },
        de: { title: "Schritt 3 · Naming, Claim & Nizza-Klassifikation", uiBadge: "DEUTSCH · DPMA / EUIPO MARKENKLASSEN", desc: "Bestätigen Sie Markenname, Claim und die passenden Nizza-Klassen für den offiziellen Markenschutz.", auraPrompt: "«Wir haben die passenden Nizza-Klassen ermittelt, um Ihren Markennamen rechtlich abzusichern.»" },
        it: { title: "Passo 3 · Naming Strategico, Payoff e Classi di Nizza", uiBadge: "ITALIANO · CLASSIFICAZIONE UIBM / EUIPO", desc: "Conferma nome, slogan e Classi Internazionali di Nizza per la registrazione ufficiale del marchio.", auraPrompt: "«Abbiamo individuato le Classi di Nizza ideali per proteggere legalmente il tuo marchio.»" }
      }
    },
    {
      stepCode: "PASO 4",
      img: "/assets/app_captures/step4_tipografia_hibrida.png",
      i18n: {
        es: { title: "Paso 4 · Brújula Kansei y Gobernanza Tipográfica Híbrida", uiBadge: "ESPAÑOL · FUENTES SIL OFL + ADOBE TYPEKIT", desc: "Calibras la personalidad visual (Kansei) y eliges la dupla tipográfica perfecta con descarga directa .ZIP y soporte Adobe Fonts.", auraPrompt: "«La tipografía comunica autoridad antes de leer una sola palabra. Selecciona el par tipográfico ideal para tu marca.»" },
        en: { title: "Step 4 · Kansei Compass & Hybrid Typography Suite", uiBadge: "ENGLISH · SIL OFL FONTS + ADOBE TYPEKIT", desc: "Calibrate your Kansei sensory parameters and select your primary & secondary font pairing with instant .ZIP bundling.", auraPrompt: "«Typography communicates authority before a single word is read. Choose your official font pairing.»" },
        fr: { title: "Étape 4 · Boussole Kansei & Typographie Hybride", uiBadge: "FRANÇAIS · POLICES SIL OFL + ADOBE TYPEKIT", desc: "Calibrez vos axes sensoriels Kansei et sélectionnez votre duo typographique officiel téléchargeable en .ZIP.", auraPrompt: "«La typographie transmet la confiance avant même la lecture. Choisissez votre duo de polices officiel.»" },
        pt: { title: "Passo 4 · Bússola Kansei e Tipografia Híbrida", uiBadge: "PORTUGUÊS · FONTES SIL OFL + ADOBE TYPEKIT", desc: "Calibre os eixos Kansei e escolha a combinação tipográfica oficial com pacote instalável .ZIP.", auraPrompt: "«A tipografia transmite autoridade antes mesmo da leitura. Escolha o par de fontes da sua marca.»" },
        de: { title: "Schritt 4 · Kansei-Kompass & Hybride Typografie", uiBadge: "DEUTSCH · SIL OFL SCHRIFTEN + ADOBE TYPEKIT", desc: "Kalibrieren Sie die sensorischen Kansei-Achsen und wählen Sie Ihr offizielles Schriftpaar inklusive .ZIP-Schriftenpaket.", auraPrompt: "«Typografie vermittelt Vertrauen auf den ersten Blick. Wählen Sie Ihre offizielle Schriftkombination.»" },
        it: { title: "Passo 4 · Bussola Kansei e Tipografia Ibrida", uiBadge: "ITALIANO · FONT SIL OFL + ADOBE TYPEKIT", desc: "Calibra i parametri sensoriali Kansei e scegli la coppia tipografica ufficiale con kit .ZIP incluso.", auraPrompt: "«La tipografia trasmette autorevolezza prima ancora di leggere. Scegli i tuoi font ufficiali.»" }
      }
    },
    {
      stepCode: "PASO 5",
      img: "/assets/app_captures/step5_taller_logo_liquid_glass.png",
      i18n: {
        es: { title: "Paso 5 · Taller de Logotipo e Iteración Apple Liquid Glass", uiBadge: "ESPAÑOL · TRAZADO VECTORIAL EN CURVAS BÉZIER", desc: "Evolucionas tu logotipo con IA generativa y síntesis geométrica en curvas hasta obtener la pieza maestra sobre fondo claro y oscuro.", auraPrompt: "«Observa cómo tu símbolo cobra vida en cristal líquido y curvas matemáticas listas para cualquier escala.»" },
        en: { title: "Step 5 · Logo Atelier & Apple Liquid Glass Iteration", uiBadge: "ENGLISH · PURE BÉZIER VECTOR SYNTHESIS", desc: "Evolve and refine your emblem through AI synthesis and parametric Bézier curves on both light and dark canvases.", auraPrompt: "«Watch your emblem come alive with Apple Liquid Glass refraction and pure mathematical vector curves.»" },
        fr: { title: "Étape 5 · Atelier Logo & Itération Apple Liquid Glass", uiBadge: "FRANÇAIS · COURBES DE BÉZIER VECTORIELLES", desc: "Faites évoluer votre logotype en courbes vectorielles pures sur fond clair et fond sombre.", auraPrompt: "«Observez votre emblème prendre vie en verre liquide et courbes mathématiques parfaites.»" },
        pt: { title: "Passo 5 · Atelier de Logotipo e Apple Liquid Glass", uiBadge: "PORTUGUÊS · VETORIZAÇÃO EM CURVAS BÉZIER", desc: "Evolua seu logotipo com síntese vetorial pura em curvas matemáticas sobre fundo claro e escuro.", auraPrompt: "«Veja seu símbolo ganhar vida com refração Apple Liquid Glass e curvas vetoriais perfeitas.»" },
        de: { title: "Schritt 5 · Logo-Atelier & Apple Liquid Glass", uiBadge: "DEUTSCH · REINE BÉZIER-VEKTORKURVEN", desc: "Entwickeln Sie Ihr Markenzeichen in mathematisch präzisen Vektorkurven auf hellem und dunklem Grund.", auraPrompt: "«Erleben Sie, wie Ihr Symbol in Liquid-Glass-Ästhetik und reinen Vektorkurven entsteht.»" },
        it: { title: "Passo 5 · Atelier del Logo e Apple Liquid Glass", uiBadge: "ITALIANO · CURVE DI BÉZIER VETTORIALI PURE", desc: "Evolvi il tuo marchio con sintesi vettoriale in curve matematiche su sfondo chiaro e scuro.", auraPrompt: "«Guarda il tuo simbolo prendere vita con rifrazione Liquid Glass e curve vettoriali pure.»" }
      }
    },
    {
      stepCode: "PASO 6.1",
      img: "/assets/app_captures/step6_visor_36_laminas.png",
      i18n: {
        es: { title: "Paso 6.1 · Visor Interactivo de las 36 Láminas en Vivo", uiBadge: "ESPAÑOL · AUDITORÍA LÁMINA POR LÁMINA (01 A 36)", desc: "Inspeccionas cada una de las 36 láminas de tu Manual Oficial antes de exportar, verificando textos, mockups 4:3 y geometría.", auraPrompt: "«Tu Manual Oficial de 36 Láminas está compilado. Recorre cada lámina o descárgalo directo en PDF y HTML.»" },
        en: { title: "Step 6.1 · Live 36-Plate Interactive Brandbook Viewer", uiBadge: "ENGLISH · PLATE-BY-PLATE INSPECTION (01 TO 36)", desc: "Inspect all 36 plates of your compiled Brandbook in real time before exporting print-ready PDF and HTML files.", auraPrompt: "«Your 36-Plate Official Brandbook is compiled. Flip through every plate or export immediately.»" },
        fr: { title: "Étape 6.1 · Visionneuse Interactive des 36 Planches", uiBadge: "FRANÇAIS · INSPECTION PLANCHE PAR PLANCHE (01 À 36)", desc: "Inspectez chacune des 36 planches de votre manuel officiel avant l'exportation finale en PDF et HTML.", auraPrompt: "«Votre Manuel Officiel de 36 Planches est prêt. Parcourez chaque planche en temps réel.»" },
        pt: { title: "Passo 6.1 · Visualizador Interativo das 36 Lâminas", uiBadge: "PORTUGUÊS · INSPEÇÃO LÂMINA POR LÂMINA (01 A 36)", desc: "Inspecione todas as 36 lâminas do seu Manual Oficial em tempo real antes de exportar em PDF e HTML.", auraPrompt: "«Seu Manual Oficial de 36 Lâminas está pronto. Navegue por cada página ou baixe agora.»" },
        de: { title: "Schritt 6.1 · Interaktiver 36-Tafeln-Brandbook-Viewer", uiBadge: "DEUTSCH · TAFEL FÜR TAFEL PRÜFEN (01 BIS 36)", desc: "Prüfen Sie alle 36 Tafeln Ihres Markenhandbuchs live vor dem druckfertigen PDF- und HTML-Export.", auraPrompt: "«Ihr 36-Tafeln-Markenhandbuch ist kompiliert. Blättern Sie durch jede Tafel in Echtzeit.»" },
        it: { title: "Passo 6.1 · Visore Interattivo delle 36 Tavole", uiBadge: "ITALIANO · ISPEZIONE TAVOLA PER TAVOLA (01 A 36)", desc: "Ispeziona ciascuna delle 36 tavole del tuo Manuale Ufficiale prima dell'esportazione in PDF e HTML.", auraPrompt: "«Il tuo Manuale Ufficiale di 36 Tavole è pronto. Sfoglia ogni tavola in tempo reale.»" }
      }
    },
    {
      stepCode: "PASO 6.2",
      img: "/assets/app_captures/step6_boveda_entregables.png",
      i18n: {
        es: { title: "Paso 6.2 · Bóveda Ejecutiva de los 9 Entregables Oficiales", uiBadge: "ESPAÑOL · DESCARGA EN 1 CLIC (.PDF, .HTML, .SVG, .AI, .DOCX, .PPTX, .ZIP)", desc: "Centro de descarga inmediata con tus 9 entregables listos para imprenta offset, registro marcario, papelería Word/PowerPoint y web.", auraPrompt: "«Aquí tienes tu Bóveda Ejecutiva completa: desde el PDF de 36 láminas y vectores .AI hasta Word y PowerPoint.»" },
        en: { title: "Step 6.2 · Executive Vault of All 9 Official Deliverables", uiBadge: "ENGLISH · 1-CLICK DOWNLOAD (.PDF, .HTML, .SVG, .AI, .DOCX, .PPTX, .ZIP)", desc: "Download all 9 production-ready deliverables in one place: 36-plate PDF, interactive HTML, SVG/AI vectors, Word, PowerPoint, and Font Kit.", auraPrompt: "«Welcome to your Executive Vault: download your 36-plate PDF, native Illustrator vectors, Word, and PowerPoint templates.»" },
        fr: { title: "Étape 6.2 · Coffre Exécutif des 9 Livrables Officiels", uiBadge: "FRANÇAIS · TÉLÉCHARGEMENT DIRECT (.PDF, .SVG, .AI, .DOCX, .PPTX, .ZIP)", desc: "Téléchargez vos 9 livrables officiels prêts pour l'imprimerie, le web, Word et PowerPoint.", auraPrompt: "«Voici votre Coffre Exécutif complet : manuel PDF 36 planches, vecteurs .AI/.SVG, Word et PowerPoint.»" },
        pt: { title: "Passo 6.2 · Cofre Executivo dos 9 Entregáveis Oficiais", uiBadge: "PORTUGUÊS · DOWNLOAD DIRETO (.PDF, .SVG, .AI, .DOCX, .PPTX, .ZIP)", desc: "Baixe todos os 9 entregáveis oficiais prontos para gráfica, registro, Word, PowerPoint e web.", auraPrompt: "«Aqui está seu Cofre Executivo completo: PDF de 36 lâminas, vetores .AI/.SVG, Word, PowerPoint e Kit de Fontes.»" },
        de: { title: "Schritt 6.2 · Executive-Tresor aller 9 offiziellen Deliverables", uiBadge: "DEUTSCH · DIREKTDOWNLOAD (.PDF, .SVG, .AI, .DOCX, .PPTX, .ZIP)", desc: "Laden Sie alle 9 Produktionsdateien herunter: 36-Tafeln-PDF, HTML, SVG/AI-Vektoren, Word, PowerPoint und Font-Kit.", auraPrompt: "«Hier ist Ihr kompletter Executive-Tresor mit allen 9 offiziellen Marken-Deliverables.»" },
        it: { title: "Passo 6.2 · Caveau Esecutivo dei 9 Deliverable Ufficiali", uiBadge: "ITALIANO · DOWNLOAD DIRETTO (.PDF, .SVG, .AI, .DOCX, .PPTX, .ZIP)", desc: "Scarica tutti i 9 file ufficiali pronti per stampa offset, web, Word, PowerPoint e kit caratteri.", auraPrompt: "«Ecco il tuo Caveau Esecutivo completo con tutti i 9 deliverable ufficiali del tuo marchio.»" }
      }
    },
    {
      stepCode: "PASO 6.3",
      img: "/assets/app_captures/step6_firma_correo_html.png",
      i18n: {
        es: { title: "Paso 6.3 · Generador Interactivo de Firma de Correo (.HTML)", uiBadge: "ESPAÑOL · COPIAR Y PEGAR EN GMAIL, OUTLOOK Y APPLE MAIL", desc: "Personalizas los datos de cada integrante de tu equipo, eliges si incluir foto o isotipo en curvas y descargas o copias la firma en 1 clic.", auraPrompt: "«Personaliza nombre, cargo, teléfono y foto para generar las firmas de correo de todo tu equipo al instante.»" },
        en: { title: "Step 6.3 · Interactive Corporate Email Signature Generator (.HTML)", uiBadge: "ENGLISH · 1-CLICK COPY FOR GMAIL, OUTLOOK & APPLE MAIL", desc: "Customize team member details, toggle photo or vector emblem, and copy or download the HTML signature in one click.", auraPrompt: "«Customize name, role, phone, and photo to generate HTML email signatures for your entire team.»" },
        fr: { title: "Étape 6.3 · Générateur de Signature E-mail Corporative (.HTML)", uiBadge: "FRANÇAIS · COPIER-COLLER POUR GMAIL, OUTLOOK & APPLE MAIL", desc: "Personnalisez le nom, la fonction et la photo de chaque collaborateur et copiez la signature HTML en un clic.", auraPrompt: "«Générez des signatures e-mail HTML professionnelles pour toute votre équipe en quelques secondes.»" },
        pt: { title: "Passo 6.3 · Gerador de Assinatura de E-mail Corporativa (.HTML)", uiBadge: "PORTUGUÊS · COPIAR E COLAR NO GMAIL, OUTLOOK E APPLE MAIL", desc: "Personalize nome, cargo, telefone e foto de cada membro da equipe e copie a assinatura HTML em 1 clique.", auraPrompt: "«Personalize os dados da sua equipe e gere assinaturas de e-mail HTML prontas para usar.»" },
        de: { title: "Schritt 6.3 · Interaktiver E-Mail-Signatur-Generator (.HTML)", uiBadge: "DEUTSCH · 1-KLICK-KOPIE FÜR GMAIL, OUTLOOK & APPLE MAIL", desc: "Passen Sie Name, Position und Foto für jedes Teammitglied an und kopieren Sie die fertige HTML-Signatur.", auraPrompt: "«Erstellen Sie im Handumdrehen professionelle HTML-E-Mail-Signaturen für Ihr gesamtes Team.»" },
        it: { title: "Passo 6.3 · Generatore di Firma Email Aziendale (.HTML)", uiBadge: "ITALIANO · COPIA IN 1 CLIC PER GMAIL, OUTLOOK E APPLE MAIL", desc: "Personalizza nome, ruolo, telefono e foto del tuo team e copia o scarica la firma HTML con un clic.", auraPrompt: "«Crea firme email HTML coordinate per tutto il tuo team in pochi istanti.»" }
      }
    }
  ];

  const DEMO_QUICK_PRESETS = [
    {
      id: "tbb",
      label: "✨ The Best Brand (SaaS IA)",
      brandName: "THE BEST BRAND",
      tagline: "YOUR BRAND, NOW!!!",
      businessGiro: "Plataforma interactiva con IA que guía a empresarios paso a paso para definir su identidad estratégica y generar su Manual Oficial de Marca de 36 Láminas en Curvas.",
      whyPurpose: "Porque creemos que la claridad de marca multiplica el valor de las empresas y libera tiempo mental al líder.",
      howMethod: "Combinamos el acompañamiento socrático de Aura, ingeniería Kansei y síntesis vectorial Apple Liquid Glass en curvas paso a paso.",
      whatOffer: "Suite ejecutiva de 9 entregables oficiales: Manual de 36 Láminas (.PDF y .HTML), vectores (.SVG y .AI), firma (.HTML), Word (.DOCX), PowerPoint (.PPTX) y Kit de Fuentes (.ZIP)."
    },
    {
      id: "arco",
      label: "🏗️ ARCO Ingeniería (Constructora)",
      brandName: "ARCO INGENIERÍA",
      tagline: "ESTRUCTURAS QUE TRASCIENDEN",
      businessGiro: "Firma de ingeniería civil y construcción industrial especializada en naves logísticas e infraestructura de alta precisión.",
      whyPurpose: "Porque creemos que cada obra bien ejecutada protege el patrimonio de nuestros clientes y eleva el estándar industrial del país.",
      howMethod: "Mediante planeación BIM milimétrica, supervisión residente diaria y cumplimiento estricto de tiempos y presupuesto llave en mano.",
      whatOffer: "Diseño estructural, construcción de naves industriales y gerencia de proyectos con garantía de cero sobrecostos."
    },
    {
      id: "boreal",
      label: "☕ Café Boreal (Especialidad)",
      brandName: "CAFÉ BOREAL",
      tagline: "ORIGEN DE ALTURA EN CADA TAZA",
      businessGiro: "Tostaduría artesanal y barras de café de especialidad con grano trazable de microlotes mexicanos de estricta altura.",
      whyPurpose: "Porque creemos que el productor de montaña merece comercio justo y el consumidor urbano merece una pausa auténtica y memorable.",
      howMethod: "Seleccionamos microlotes de +1,600 msnm, tostamos en lotes pequeños cada semana y diseñamos espacios cálidos de hospitalidad.",
      whatOffer: "Café de especialidad en grano, suscripciones corporativas y barras de experiencia sensorial."
    }
  ];

  window.tbbApplyCommercialDemoPreset = function (presetId) {
    const p = DEMO_QUICK_PRESETS.find(item => item.id === presetId) || DEMO_QUICK_PRESETS[0];
    const st = window.tbbCommercialDemoState;
    st.brandName = p.brandName;
    st.tagline = p.tagline;
    st.businessGiro = p.businessGiro;
    st.whyPurpose = p.whyPurpose;
    st.howMethod = p.howMethod;
    st.whatOffer = p.whatOffer;
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
    window.tbbTriggerCommercialAuraFeedback("why");
  };

  window.tbbSetRightShowcaseMode = function (mode) {
    const valid = ["deliverables", "plates", "journey"];
    window.tbbCommercialDemoState.activeRightShowcaseMode = valid.includes(mode) ? mode : "deliverables";
    const rightWrap = document.getElementById("tbbHeroRightInteractiveShowcaseWrap");
    if (rightWrap) {
      rightWrap.innerHTML = window.tbbBuildRightInteractiveShowcaseHTML();
    } else {
      window.tbbRefreshCommercialPortalDOM();
    }
  };

  window.tbbSelectDeliverableCard = function (idx) {
    const cleanIdx = Math.max(0, Math.min(OFFICIAL_9_DELIVERABLES.length - 1, Number(idx) || 0));
    window.tbbCommercialDemoState.activeDeliverableIdx = cleanIdx;
    window.tbbCommercialDemoState.activeRightShowcaseMode = "deliverables";
    const rightWrap = document.getElementById("tbbHeroRightInteractiveShowcaseWrap");
    if (rightWrap) {
      rightWrap.innerHTML = window.tbbBuildRightInteractiveShowcaseHTML();
    }
  };

  window.tbbSelectManualCropPlate = function (plateNum) {
    window.tbbCommercialDemoState.activeManualCropNum = Math.max(1, Math.min(36, Number(plateNum) || 1));
    window.tbbCommercialDemoState.activeRightShowcaseMode = "plates";
    const rightWrap = document.getElementById("tbbHeroRightInteractiveShowcaseWrap");
    if (rightWrap) {
      rightWrap.innerHTML = window.tbbBuildRightInteractiveShowcaseHTML();
    }
  };

  window.tbbSetJourneyGalleryLang = function (langCode) {
    const valid = ["es", "en", "fr", "pt", "de", "it"];
    const clean = String(langCode || "es").toLowerCase();
    window.tbbCommercialDemoState.activeJourneyLang = valid.includes(clean) ? clean : "es";
    window.tbbCommercialDemoState.activeRightShowcaseMode = "journey";
    const rightWrap = document.getElementById("tbbHeroRightInteractiveShowcaseWrap");
    if (rightWrap) {
      rightWrap.innerHTML = window.tbbBuildRightInteractiveShowcaseHTML();
    }
    const secJourneyWrap = document.getElementById("tbbFullMultilingualJourneySectionWrap");
    if (secJourneyWrap) {
      secJourneyWrap.innerHTML = window.tbbBuildFullMultilingualJourneyGallerySectionHTML();
    }
  };

  window.tbbSelectJourneyGalleryStep = function (stepIdx) {
    const total = MULTILINGUAL_APP_JOURNEY_CAPTURES.length;
    const clean = ((Number(stepIdx) || 0) % total + total) % total;
    window.tbbCommercialDemoState.activeJourneyStepIdx = clean;
    const rightWrap = document.getElementById("tbbHeroRightInteractiveShowcaseWrap");
    if (rightWrap && window.tbbCommercialDemoState.activeRightShowcaseMode === "journey") {
      rightWrap.innerHTML = window.tbbBuildRightInteractiveShowcaseHTML();
    }
    const secJourneyWrap = document.getElementById("tbbFullMultilingualJourneySectionWrap");
    if (secJourneyWrap) {
      secJourneyWrap.innerHTML = window.tbbBuildFullMultilingualJourneyGallerySectionHTML();
    }
  };

  window.tbbOpenPlateLightboxModal = function (plateNum, customImgUrl, customTitle) {
    const pNum = Math.max(1, Math.min(36, Number(plateNum) || 1));
    const padNum = String(pNum).padStart(2, "0");
    const imgSrc = customImgUrl || `/assets/brandbook_plates_tbb/plate-${padNum}.jpg`;
    const meta = MANUAL_36_PLATES_HIGHLIGHTS.find(m => m.n === pNum);
    const titleTxt = customTitle || (meta ? `${meta.tag} · ${meta.title}` : `Lámina ${padNum} / 36 · Manual Oficial The Best Brand`);

    let ov = document.getElementById("tbbPlateLightboxModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbPlateLightboxModalOverlay";
      ov.style.cssText = "position:fixed; inset:0; background:rgba(5,8,17,0.92); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); z-index:10080; display:flex; align-items:center; justify-content:center; padding:16px;";
      ov.onclick = (e) => { if (e.target === ov) window.tbbClosePlateLightboxModal(); };
      document.body.appendChild(ov);
    }

    const prevNum = pNum > 1 ? pNum - 1 : 36;
    const nextNum = pNum < 36 ? pNum + 1 : 1;

    ov.innerHTML = `
      <div style="background:#090D16; border:2px solid #4C9DE6; border-top:5px solid #FF7A00; border-radius:22px; width:100%; max-width:1120px; max-height:94vh; overflow-y:auto; box-shadow:0 30px 90px rgba(0,0,0,0.85); display:flex; flex-direction:column;">
        <div style="padding:14px 20px; display:flex; justify-content:space-between; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.14); flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:34px; height:34px; border-radius:50%; border:1.5px solid #FF7A00; object-fit:cover;" />
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#FF7A00;">INSPECCIÓN DE ALTA RESOLUCIÓN · MANUAL OFICIAL DE 36 LÁMINAS</div>
              <div style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:900; color:#FFFFFF;">${escHtml(titleTxt)}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${!customImgUrl ? `
              <button type="button" onclick="window.tbbOpenPlateLightboxModal(${prevNum})" class="tbb-comm-btn-outline" style="padding:6px 12px; font-size:0.76rem;">← Lámina ${String(prevNum).padStart(2, '0')}</button>
              <button type="button" onclick="window.tbbOpenPlateLightboxModal(${nextNum})" class="tbb-comm-btn-outline" style="padding:6px 12px; font-size:0.76rem;">Lámina ${String(nextNum).padStart(2, '0')} →</button>
            ` : ''}
            <a href="/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf" target="_blank" rel="noopener" class="tbb-comm-btn-blue" style="padding:7px 14px; font-size:0.76rem; border-bottom:2px solid #FF7A00;">Abrir PDF Completo (36 Láminas) ↗</a>
            <button type="button" onclick="window.tbbClosePlateLightboxModal()" class="tbb-comm-btn-outline" style="padding:6px 12px; font-size:0.86rem;">✕</button>
          </div>
        </div>
        <div style="padding:16px; background:#050811; display:flex; justify-content:center; align-items:center;">
          <img src="${imgSrc}" alt="${escHtml(titleTxt)}" style="width:100%; max-height:76vh; object-fit:contain; border-radius:12px; background:#FFFFFF; box-shadow:0 16px 50px rgba(0,0,0,0.6);" />
        </div>
      </div>
    `;
    ov.style.display = "flex";
  };

  window.tbbClosePlateLightboxModal = function () {
    const ov = document.getElementById("tbbPlateLightboxModalOverlay");
    if (ov) {
      ov.style.display = "none";
      ov.innerHTML = "";
    }
  };

  // Builder para la Columna Izquierda del Workbench Hero (Demo Interactiva Inmediata)
  window.tbbBuildLeftInteractiveDemoHookHTML = function () {
    const st = window.tbbCommercialDemoState;
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
        "Bóveda Digital de Manual de Marca de 36 Láminas en PDF y HTML",
        "Suite Editable (.SVG, .AI, .DOCX, .PPTX, .HTML, .ZIP)",
        "Certificado Oficial de Registro y Vectores en Curvas",
        "Seguimiento de Satisfacción Post-Entrega"
      ]
    };

    return `
      <div style="background:#FFFFFF; border:2.5px solid #4C9DE6; border-top:6px solid #FF7A00; border-radius:24px; padding:22px; color:#090D16; box-shadow:0 24px 60px rgba(0,0,0,0.45); display:flex; flex-direction:column; gap:14px;">
        <!-- Cabecera de la Demo Izquierda con Logo Real -->
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap; border-bottom:1.5px solid #E2E8F0; padding-bottom:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="Aura Liquid Glass" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid #FF7A00; box-shadow:0 4px 14px rgba(255,122,0,0.35);" />
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; font-family:'JetBrains Mono', monospace; font-size:0.65rem; font-weight:800; color:#EA580C; letter-spacing:0.05em;">
                <span style="width:7px; height:7px; border-radius:50%; background:#FF7A00; display:inline-block; box-shadow:0 0 8px #FF7A00;"></span>
                <span>DEMO INTERACTIVA EN VIVO · PRUÉBALA AQUÍ MISMO</span>
              </div>
              <h2 style="font-family:'Montserrat', sans-serif; font-size:1.22rem; font-weight:900; color:#090D16; margin:2px 0 0 0; line-height:1.15;">
                Experimenta cómo Aura estructura tu Marca
              </h2>
            </div>
          </div>
          <span style="background:#EFF6FF; color:#1D4ED8; border:1.5px solid #93C5FD; border-radius:999px; padding:4px 10px; font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800;">
            SIN REGISTRO · EN VIVO
          </span>
        </div>

        <!-- Selector Rápido de Ejemplos Reales en 1 Clic -->
        <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:12px; padding:9px 11px; display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap;">
          <span style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; color:#0D2540;">CARGAR EJEMPLO EN 1 CLIC:</span>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${DEMO_QUICK_PRESETS.map(p => `
              <button type="button" onclick="window.tbbApplyCommercialDemoPreset('${p.id}')" style="background:${st.brandName === p.brandName ? '#0D2540' : '#FFFFFF'}; color:${st.brandName === p.brandName ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${st.brandName === p.brandName ? '#FF7A00' : '#CBD5E1'}; border-radius:999px; padding:4px 10px; font-size:0.68rem; font-weight:800; cursor:pointer; transition:all 0.18s ease;">
                ${escHtml(p.label)}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Pestañas Paso 1 (Círculo Dorado) y Paso 2 (Touchpoints) -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <button type="button" class="tbb-tab-light-surface ${st.activeDemoStep === 1 ? 'is-active' : ''}" onclick="window.tbbSwitchCommercialDemoStep(1)" style="padding:10px 12px; font-size:0.75rem;">
            <span>1. ADN y Círculo Dorado</span>
          </button>
          <button type="button" class="tbb-tab-light-surface ${st.activeDemoStep === 2 ? 'is-active' : ''}" onclick="window.tbbSwitchCommercialDemoStep(2)" style="padding:10px 12px; font-size:0.75rem;">
            <span>2. Touchpoints (${st.tpBefore.length + st.tpDuring.length + st.tpAfter.length})</span>
          </button>
        </div>

        ${st.activeDemoStep === 1 ? `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:800; color:#090D16; margin-bottom:3px;">Nombre de tu Marca:</label>
              <input type="text" value="${escHtml(st.brandName)}" oninput="window.tbbUpdateCommercialDemoField('brandName', this.value)" placeholder="Ej. THE BEST BRAND..." style="width:100%; height:40px; padding:0 11px; border-radius:10px; border:2px solid #1D4ED8; font-size:0.86rem; font-weight:800; color:#090D16; background:#FFFFFF;" />
            </div>
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:800; color:#090D16; margin-bottom:3px;">Eslogan o Promesa Breve:</label>
              <input type="text" value="${escHtml(st.tagline)}" oninput="window.tbbUpdateCommercialDemoField('tagline', this.value)" placeholder="Ej. YOUR BRAND, NOW!!!" style="width:100%; height:40px; padding:0 11px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.82rem; font-weight:800; color:#0D2540; background:#FFFFFF;" />
            </div>
          </div>

          <div>
            <label style="display:block; font-size:0.72rem; font-weight:800; color:#090D16; margin-bottom:3px;">Giro o Actividad Principal de tu Empresa:</label>
            <input type="text" value="${escHtml(st.businessGiro)}" oninput="window.tbbUpdateCommercialDemoField('businessGiro', this.value)" style="width:100%; height:40px; padding:0 11px; border-radius:10px; border:2px solid #CBD5E1; font-size:0.80rem; font-weight:700; color:#090D16; background:#F8FAFC;" />
          </div>

          <div style="display:grid; grid-template-columns:1.15fr 0.85fr; gap:12px; align-items:center;">
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div>
                <label style="display:block; font-size:0.70rem; font-weight:900; color:#0D2540; margin-bottom:2px;">1. POR QUÉ EXISTE TU MARCA (WHY · Propósito):</label>
                <textarea rows="2" oninput="window.tbbUpdateCommercialDemoField('whyPurpose', this.value)" style="width:100%; min-height:52px; padding:7px 10px; border-radius:10px; border:2px solid #0D2540; background:#F0F7FF; font-size:0.78rem; font-weight:700; color:#090D16; line-height:1.35; resize:vertical;">${escHtml(st.whyPurpose)}</textarea>
              </div>
              <div>
                <label style="display:block; font-size:0.70rem; font-weight:900; color:#1D4ED8; margin-bottom:2px;">2. CÓMO LO HACES ÚNICO (HOW · Método):</label>
                <textarea rows="2" oninput="window.tbbUpdateCommercialDemoField('howMethod', this.value)" style="width:100%; min-height:52px; padding:7px 10px; border-radius:10px; border:2px solid #93C5FD; background:#EFF6FF; font-size:0.78rem; font-weight:700; color:#090D16; line-height:1.35; resize:vertical;">${escHtml(st.howMethod)}</textarea>
              </div>
              <div>
                <label style="display:block; font-size:0.70rem; font-weight:900; color:#EA580C; margin-bottom:2px;">3. QUÉ ENTREGAS (WHAT · Oferta Concreta):</label>
                <textarea rows="2" oninput="window.tbbUpdateCommercialDemoField('whatOffer', this.value)" style="width:100%; min-height:52px; padding:7px 10px; border-radius:10px; border:2px solid #FDBA74; background:#FFF7ED; font-size:0.78rem; font-weight:700; color:#090D16; line-height:1.35; resize:vertical;">${escHtml(st.whatOffer)}</textarea>
              </div>
            </div>

            <!-- Vista Previa Circular en Vivo del Círculo Dorado -->
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:16px; padding:10px; text-align:center;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.58rem; font-weight:800; color:#1D4ED8; margin-bottom:4px;">LÁMINA 04 / 36 EN VIVO</div>
              <div id="tbbHeroGoldenCircleSvgWrap">
                ${window.tbbBuildCircularGoldenCircleSVG()}
              </div>
            </div>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="tbb-btn-light-surface" onclick="window.tbbPolishCommercialDemoStep1()" style="flex:1; padding:10px 12px; font-size:0.76rem;">
              <span>✨ Pulir Redacción Ejecutiva con IA</span>
            </button>
            <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbSwitchCommercialDemoStep(2)" style="flex:1; padding:10px 14px; font-size:0.78rem; border-bottom:2.5px solid #FF7A00;">
              <span>Pasar a Touchpoints (Paso 2) →</span>
            </button>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${["before", "during", "after"].map((phaseKey, pIdx) => {
              const phaseTitle = pIdx === 0 ? "1. ANTES DE COMPRAR (Descubrimiento)" : (pIdx === 1 ? "2. DURANTE LA COMPRA (Experiencia Central)" : "3. DESPUÉS DE COMPRAR (Lealtad y Entrega)");
              const stateKey = pIdx === 0 ? "tpBefore" : (pIdx === 1 ? "tpDuring" : "tpAfter");
              const selectedArr = st[stateKey] || [];
              const allOpts = [...new Set([...tpCatalog[phaseKey], ...selectedArr])];
              const accentColor = pIdx === 0 ? "#1D4ED8" : (pIdx === 1 ? "#0D2540" : "#EA580C");
              return `
                <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-left:4px solid ${accentColor}; border-radius:12px; padding:9px 11px;">
                  <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:${accentColor}; margin-bottom:6px;">
                    ${phaseTitle}
                  </div>
                  <div style="display:flex; flex-wrap:wrap; gap:5px;">
                    ${allOpts.map(opt => {
                      const isSel = selectedArr.includes(opt);
                      const safeOpt = opt.replace(/'/g, "\\'");
                      return `
                        <button type="button" onclick="window.tbbToggleCommercialDemoTouchpoint('${stateKey}', '${safeOpt}')" style="background:${isSel ? '#EFF6FF' : '#FFFFFF'}; color:${isSel ? '#1D4ED8' : '#090D16'}; border:1.5px solid ${isSel ? '#1D4ED8' : '#CBD5E1'}; border-radius:8px; padding:4px 9px; font-size:0.70rem; font-weight:800; cursor:pointer;">
                          ${isSel ? "✓ " : "+ "}${escHtml(opt)}
                        </button>
                      `;
                    }).join("")}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `}

        <!-- Respuesta Socrática de Aura + Botón Directo al Estudio -->
        <div style="background:#090D16; border:1.5px solid #1D4ED8; border-left:4px solid #FF7A00; border-radius:14px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:10px; flex:1; min-width:210px;">
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="Aura" style="width:34px; height:34px; border-radius:50%; border:1.5px solid #FF7A00; object-fit:cover; flex-shrink:0;" />
            <div style="min-width:0;">
              <div id="tbbCommAuraRefBadge" style="font-family:'JetBrains Mono', monospace; font-size:0.58rem; font-weight:800; color:#FF7A00;">
                AURA · ${escHtml(st.auraAuthorRef)}
              </div>
              <div id="tbbCommAuraQuoteText" style="font-size:0.74rem; font-weight:600; color:#E2E8F0; line-height:1.35;">
                ${escHtml(st.auraQuote)}
              </div>
            </div>
          </div>
          <a href="/studio" onclick="window.tbbSyncCommercialDemoToAppState()" style="background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); color:#FFFFFF; border:1.5px solid #4C9DE6; border-bottom:2.5px solid #FF7A00; border-radius:999px; padding:9px 15px; font-size:0.76rem; font-weight:800; text-decoration:none; white-space:nowrap; box-shadow:0 6px 16px rgba(29,78,216,0.4);">
            Llevar mi Marca al Estudio Completo ↗
          </a>
        </div>
      </div>
    `;
  };

  // Builder para la Columna Derecha del Workbench Hero:
  // 1) Checklist de los 9 Entregables Oficiales + Vista Previa Real
  // 2) Recortes Reales del Manual de 36 Láminas (Manual_Identidad_36_Laminas_the_best_brand.pdf)
  // 3) Recorrido en la Aplicación en 6 Idiomas (ES · EN · FR · PT · DE · IT)
  window.tbbBuildRightInteractiveShowcaseHTML = function () {
    const st = window.tbbCommercialDemoState;
    const mode = st.activeRightShowcaseMode || "deliverables";
    const delivIdx = Math.max(0, Math.min(OFFICIAL_9_DELIVERABLES.length - 1, Number(st.activeDeliverableIdx) || 0));
    const activeDeliv = OFFICIAL_9_DELIVERABLES[delivIdx];
    const cropNum = Math.max(1, Math.min(36, Number(st.activeManualCropNum) || 1));
    const activeCropMeta = MANUAL_36_PLATES_HIGHLIGHTS.find(m => m.n === cropNum) || MANUAL_36_PLATES_HIGHLIGHTS[0];
    const jLang = st.activeJourneyLang || "es";
    const jStepIdx = Math.max(0, Math.min(MULTILINGUAL_APP_JOURNEY_CAPTURES.length - 1, Number(st.activeJourneyStepIdx) || 0));
    const activeJourney = MULTILINGUAL_APP_JOURNEY_CAPTURES[jStepIdx];
    const activeJourneyText = activeJourney.i18n[jLang] || activeJourney.i18n.es;

    return `
      <div style="background:#FFFFFF; border:2.5px solid #CBD5E1; border-top:6px solid #1D4ED8; border-radius:24px; padding:22px; color:#090D16; box-shadow:0 24px 60px rgba(0,0,0,0.45); display:flex; flex-direction:column; gap:14px;">
        <!-- Selector Superior de 3 Vistas Interactivas -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; border-bottom:1.5px solid #E2E8F0; padding-bottom:10px;">
          <div>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:#1D4ED8; letter-spacing:0.05em;">
              BÓVEDA DE ENTREGABLES REALES Y RECORRIDO MULTILINGÜE
            </div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:1.18rem; font-weight:900; color:#090D16; margin:2px 0 0 0;">
              ¿Qué recibes exactamente al finalizar tu Marca?
            </h2>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button type="button" onclick="window.tbbSetRightShowcaseMode('deliverables')" style="background:${mode === 'deliverables' ? '#0D2540' : '#F8FAFC'}; color:${mode === 'deliverables' ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${mode === 'deliverables' ? '#FF7A00' : '#CBD5E1'}; border-radius:999px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
              📦 Los 9 Entregables
            </button>
            <button type="button" onclick="window.tbbSetRightShowcaseMode('plates')" style="background:${mode === 'plates' ? '#0D2540' : '#F8FAFC'}; color:${mode === 'plates' ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${mode === 'plates' ? '#FF7A00' : '#CBD5E1'}; border-radius:999px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
              📘 Recortes Manual (36 Hojas)
            </button>
            <button type="button" onclick="window.tbbSetRightShowcaseMode('journey')" style="background:${mode === 'journey' ? '#0D2540' : '#F8FAFC'}; color:${mode === 'journey' ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${mode === 'journey' ? '#FF7A00' : '#CBD5E1'}; border-radius:999px; padding:6px 12px; font-size:0.72rem; font-weight:800; cursor:pointer;">
              🌍 App en 6 Idiomas
            </button>
          </div>
        </div>

        ${mode === "deliverables" ? `
          <!-- MODO 1: LISTADO CLARO E INTERACTIVO DE LOS 9 ENTREGABLES OFICIALES -->
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
            ${OFFICIAL_9_DELIVERABLES.map((item, idx) => {
              const isAct = idx === delivIdx;
              return `
                <button type="button" onclick="window.tbbSelectDeliverableCard(${idx})" style="background:${isAct ? '#0D2540' : '#F8FAFC'}; color:${isAct ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${isAct ? '#FF7A00' : '#CBD5E1'}; border-radius:10px; padding:7px 8px; text-align:left; cursor:pointer; transition:all 0.16s ease; display:flex; flex-direction:column; gap:2px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <span style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:900; color:${isAct ? '#FF7A00' : '#1D4ED8'};">#${item.num}</span>
                    <span style="font-family:'JetBrains Mono', monospace; font-size:0.55rem; font-weight:800; color:${isAct ? '#93C5FD' : '#475569'};">${escHtml(item.badge.split('·')[0])}</span>
                  </div>
                  <div style="font-size:0.70rem; font-weight:800; line-height:1.2; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                    ${escHtml(item.title.replace(/\(.*\)/, '').trim())}
                  </div>
                </button>
              `;
            }).join("")}
          </div>

          <!-- Visor en Vivo del Entregable Seleccionado con su Lámina Real del Manual -->
          <div style="background:#F8FAFC; border:2px solid #0D2540; border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap;">
              <div style="flex:1; min-width:220px;">
                <span style="display:inline-block; background:#0D2540; color:#FF7A00; border-radius:999px; padding:3px 10px; font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800;">
                  ENTREGABLE OFICIAL #${activeDeliv.num} DE 09 · ${escHtml(activeDeliv.badge)}
                </span>
                <h3 style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:900; color:#090D16; margin:5px 0 3px 0; line-height:1.2;">
                  ${escHtml(activeDeliv.title)}
                </h3>
                <p style="font-size:0.76rem; font-weight:600; color:#334155; margin:0; line-height:1.42;">
                  ${escHtml(activeDeliv.desc)}
                </p>
              </div>
              <a href="${activeDeliv.sampleUrl}" target="_blank" rel="noopener" style="background:#1D4ED8; color:#FFFFFF; border:1.5px solid #0D2540; border-bottom:3px solid #FF7A00; border-radius:999px; padding:8px 14px; font-size:0.72rem; font-weight:800; text-decoration:none; white-space:nowrap;">
                ${escHtml(activeDeliv.sampleBtnLabel)}
              </a>
            </div>

            <div style="position:relative; border-radius:12px; overflow:hidden; border:1.5px solid #CBD5E1; background:#FFFFFF; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${activeDeliv.plateNum})">
              <img src="${activeDeliv.plateImg}" alt="${escHtml(activeDeliv.title)}" style="width:100%; max-height:245px; object-fit:contain; display:block; margin:0 auto; background:#FFFFFF;" />
              <div style="position:absolute; bottom:8px; right:8px; background:rgba(9,13,22,0.88); color:#FFFFFF; border:1px solid #4C9DE6; border-radius:999px; padding:4px 10px; font-family:'JetBrains Mono', monospace; font-size:0.60rem; font-weight:800;">
                🔍 Ampliar Lámina ${String(activeDeliv.plateNum).padStart(2, '0')} / 36
              </div>
            </div>
          </div>
        ` : mode === "plates" ? `
          <!-- MODO 2: GALERÍA DE RECORTES REALES DEL MANUAL DE 36 LÁMINAS -->
          <div style="display:flex; gap:5px; flex-wrap:wrap; max-height:84px; overflow-y:auto; padding:2px;">
            ${MANUAL_36_PLATES_HIGHLIGHTS.map(m => {
              const isAct = m.n === cropNum;
              return `
                <button type="button" onclick="window.tbbSelectManualCropPlate(${m.n})" style="background:${isAct ? '#0D2540' : '#F8FAFC'}; color:${isAct ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${isAct ? '#FF7A00' : '#CBD5E1'}; border-radius:8px; padding:4px 8px; font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; cursor:pointer;">
                  Lámina ${String(m.n).padStart(2, '0')}
                </button>
              `;
            }).join("")}
          </div>

          <div style="background:#F8FAFC; border:2px solid #0D2540; border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; color:#EA580C;">${escHtml(activeCropMeta.tag)} · EXTRAÍDA DEL MANUAL OFICIAL</div>
                <h3 style="font-family:'Montserrat', sans-serif; font-size:1.0rem; font-weight:900; color:#090D16; margin:2px 0;">${escHtml(activeCropMeta.title)}</h3>
                <p style="font-size:0.75rem; font-weight:600; color:#334155; margin:0;">${escHtml(activeCropMeta.desc)}</p>
              </div>
              <button type="button" onclick="window.tbbOpenPlateLightboxModal(${cropNum})" class="tbb-comm-btn-blue" style="padding:7px 12px; font-size:0.72rem;">
                🔍 Pantalla Completa
              </button>
            </div>

            <div style="position:relative; border-radius:12px; overflow:hidden; border:1.5px solid #CBD5E1; background:#FFFFFF; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${cropNum})">
              <img src="/assets/brandbook_plates_tbb/plate-${String(cropNum).padStart(2, '0')}.jpg" alt="${escHtml(activeCropMeta.title)}" style="width:100%; max-height:275px; object-fit:contain; display:block; margin:0 auto;" />
            </div>
          </div>
        ` : `
          <!-- MODO 3: GALERÍA DE CAPTURAS EN 6 IDIOMAS DEL RECORRIDO EN LA APP -->
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; background:#F0F7FF; border:1.5px solid #93C5FD; border-radius:12px; padding:7px 10px;">
            <span style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; color:#0D2540;">IDIOMA DEL RECORRIDO:</span>
            <div style="display:flex; gap:5px; flex-wrap:wrap;">
              ${[
                { code: "es", lbl: "🇪🇸 ES" },
                { code: "en", lbl: "🇺🇸 EN" },
                { code: "fr", lbl: "🇫🇷 FR" },
                { code: "pt", lbl: "🇧🇷 PT" },
                { code: "de", lbl: "🇩🇪 DE" },
                { code: "it", lbl: "🇮🇹 IT" }
              ].map(l => `
                <button type="button" onclick="window.tbbSetJourneyGalleryLang('${l.code}')" style="background:${jLang === l.code ? '#0D2540' : '#FFFFFF'}; color:${jLang === l.code ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${jLang === l.code ? '#FF7A00' : '#CBD5E1'}; border-radius:999px; padding:4px 9px; font-size:0.68rem; font-weight:800; cursor:pointer;">
                  ${l.lbl}
                </button>
              `).join("")}
            </div>
          </div>

          <div style="display:flex; gap:5px; flex-wrap:wrap;">
            ${MULTILINGUAL_APP_JOURNEY_CAPTURES.map((cap, idx) => `
              <button type="button" onclick="window.tbbSelectJourneyGalleryStep(${idx})" style="background:${idx === jStepIdx ? '#1D4ED8' : '#F8FAFC'}; color:${idx === jStepIdx ? '#FFFFFF' : '#090D16'}; border:1.5px solid ${idx === jStepIdx ? '#0D2540' : '#CBD5E1'}; border-radius:8px; padding:4px 8px; font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; cursor:pointer;">
                ${escHtml(cap.stepCode)}
              </button>
            `).join("")}
          </div>

          <div style="background:#090D16; border:2px solid #1D4ED8; border-radius:16px; padding:12px; color:#FFFFFF; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.58rem; font-weight:800; color:#FF7A00;">${escHtml(activeJourneyText.uiBadge)}</div>
                <div style="font-family:'Montserrat', sans-serif; font-size:0.95rem; font-weight:900; color:#FFFFFF;">${escHtml(activeJourneyText.title)}</div>
              </div>
              <div style="display:flex; gap:5px;">
                <button type="button" onclick="window.tbbSelectJourneyGalleryStep(${jStepIdx - 1})" class="tbb-comm-btn-outline" style="padding:4px 9px; font-size:0.70rem;">←</button>
                <button type="button" onclick="window.tbbSelectJourneyGalleryStep(${jStepIdx + 1})" class="tbb-comm-btn-outline" style="padding:4px 9px; font-size:0.70rem;">→</button>
              </div>
            </div>

            <div style="position:relative; border-radius:10px; overflow:hidden; border:1.5px solid #4C9DE6; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(1, '${activeJourney.img}', '${escHtml(activeJourneyText.title)}')">
              <img src="${activeJourney.img}" alt="${escHtml(activeJourneyText.title)}" style="width:100%; max-height:220px; object-fit:cover; object-position:top center; display:block;" />
              <div style="position:absolute; bottom:6px; right:6px; background:rgba(9,13,22,0.9); color:#FFFFFF; border:1px solid #FF7A00; border-radius:999px; padding:3px 9px; font-family:'JetBrains Mono', monospace; font-size:0.56rem; font-weight:800;">
                🔍 Ampliar Captura Real de la App
              </div>
            </div>

            <div style="font-size:0.74rem; color:#CBD5E1; line-height:1.38;">
              ${escHtml(activeJourneyText.desc)}
            </div>
            <div style="background:rgba(29,78,216,0.22); border-left:3px solid #FF7A00; border-radius:8px; padding:6px 10px; font-size:0.72rem; font-weight:700; color:#93C5FD;">
              ${escHtml(activeJourneyText.auraPrompt)}
            </div>
          </div>
        `}

        <!-- Pie de la Columna Derecha: Logos Oficiales en Curvas + Acceso a los 9 Entregables -->
        <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:14px; padding:9px 12px; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="/assets/logos/Isotipo_Simbolo_Curvas_the_best_brand.svg" alt="Vector SVG" style="width:30px; height:30px;" />
            <div style="font-size:0.72rem; font-weight:800; color:#090D16;">
              9 Entregables Oficiales Incluidos · <span style="color:#1D4ED8;">Pago Único $49 USD</span>
            </div>
          </div>
          <div style="display:flex; gap:6px; align-items:center;">
            <a href="#tbbCommFullDeliverablesChecklistSection" style="font-size:0.70rem; font-weight:800; color:#0D2540; text-decoration:underline;">Ver Listado Detallado ↓</a>
            <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="background:#0D2540; color:#FFFFFF; border:1.5px solid #FF7A00; border-radius:999px; padding:6px 12px; font-size:0.70rem; font-weight:800; cursor:pointer;">
              Adquirir Pro · $49
            </button>
          </div>
        </div>
      </div>
    `;
  };

  // Builder para la Sección Completa del Listado de 9 Entregables + Galería del Manual de 36 Láminas
  window.tbbBuildFullDeliverablesAndManualGallerySectionHTML = function () {
    return `
      <section id="tbbCommFullDeliverablesChecklistSection" style="padding:56px 24px; background:#FFFFFF; border-bottom:2px solid #CBD5E1;">
        <div style="max-width:1220px; margin:0 auto; display:flex; flex-direction:column; gap:28px;">
          <!-- Encabezado con el Logotipo Horizontal Oficial en Curvas -->
          <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:18px; flex-wrap:wrap; border-bottom:2px solid #E2E8F0; padding-bottom:18px;">
            <div>
              <div style="display:inline-flex; align-items:center; gap:8px; background:#FFF7ED; border:1.5px solid #FDBA74; border-radius:999px; padding:5px 14px; font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#EA580C; margin-bottom:8px;">
                <span>📦 CHECKLIST OFICIAL DE ENTREGABLES · 100% EN CURVAS Y EDITABLES</span>
              </div>
              <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.75rem, 3.1vw, 2.35rem); font-weight:900; color:#090D16; margin:0;">
                Los 9 Entregables Ejecutivos que recibes con tu Marca
              </h2>
              <p style="font-size:0.94rem; font-weight:600; color:#475569; margin:6px 0 0 0; max-width:780px;">
                Haz clic en cualquier entregable para inspeccionar su lámina real del Manual de 36 Hojas o descargar el archivo muestra oficial de <strong>The Best Brand</strong>.
              </p>
            </div>
            <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:16px; padding:10px 16px; display:flex; align-items:center; gap:12px;">
              <img src="/assets/logos/Logotipo_Horizontal_Curvas_the_best_brand.svg" alt="Logotipo Horizontal Oficial The Best Brand" style="height:42px; width:auto; display:block;" />
            </div>
          </div>

          <!-- Grid de las 9 Tarjetas de Entregables con Recortes Reales del Manual -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:18px;">
            ${OFFICIAL_9_DELIVERABLES.map((item) => `
              <div style="background:#F8FAFC; border:2px solid #CBD5E1; border-top:5px solid ${item.accent}; border-radius:20px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; gap:12px; box-shadow:0 12px 28px rgba(9,13,22,0.06);">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:8px;">
                    <span style="background:#0D2540; color:#FFFFFF; border-radius:8px; padding:4px 9px; font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:900;">
                      ENTREGABLE #${item.num}
                    </span>
                    <span style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:${item.accent};">
                      ${escHtml(item.badge)}
                    </span>
                  </div>

                  <div style="position:relative; border-radius:12px; overflow:hidden; border:1.5px solid #CBD5E1; background:#FFFFFF; margin-bottom:10px; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${item.plateNum})">
                    <img src="${item.plateImg}" alt="${escHtml(item.title)}" style="width:100%; height:175px; object-fit:cover; object-position:top center; display:block;" />
                    <div style="position:absolute; bottom:6px; right:6px; background:rgba(9,13,22,0.86); color:#FFFFFF; border-radius:999px; padding:3px 9px; font-family:'JetBrains Mono', monospace; font-size:0.56rem; font-weight:800;">
                      🔍 Ver Lámina ${String(item.plateNum).padStart(2, '0')} / 36
                    </div>
                  </div>

                  <h3 style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:900; color:#090D16; margin:0 0 6px 0; line-height:1.25;">
                    ${escHtml(item.title)}
                  </h3>
                  <p style="font-size:0.80rem; font-weight:600; color:#475569; margin:0; line-height:1.48;">
                    ${escHtml(item.desc)}
                  </p>
                </div>

                <div style="display:flex; gap:8px; padding-top:8px; border-top:1px solid #E2E8F0;">
                  <button type="button" onclick="window.tbbOpenPlateLightboxModal(${item.plateNum})" class="tbb-btn-light-surface" style="flex:1; padding:8px 10px; font-size:0.72rem;">
                    🔍 Inspeccionar Lámina
                  </button>
                  <a href="${item.sampleUrl}" target="_blank" rel="noopener" style="flex:1.15; display:inline-flex; align-items:center; justify-content:center; background:#0D2540; color:#FFFFFF; border:1.5px solid #1D4ED8; border-bottom:2.5px solid #FF7A00; border-radius:999px; padding:8px 10px; font-size:0.72rem; font-weight:800; text-decoration:none; text-align:center;">
                    Descargar Muestra ↗
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  };

  // Builder para la Galería Interactiva Multilingüe del Recorrido en la App (Sección Dedicada)
  window.tbbBuildFullMultilingualJourneyGallerySectionHTML = function () {
    const st = window.tbbCommercialDemoState;
    const jLang = st.activeJourneyLang || "es";
    const jStepIdx = Math.max(0, Math.min(MULTILINGUAL_APP_JOURNEY_CAPTURES.length - 1, Number(st.activeJourneyStepIdx) || 0));
    const activeCap = MULTILINGUAL_APP_JOURNEY_CAPTURES[jStepIdx];
    const activeTxt = activeCap.i18n[jLang] || activeCap.i18n.es;

    return `
      <div style="max-width:1220px; margin:0 auto; display:flex; flex-direction:column; gap:22px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(29,78,216,0.25); border:1.5px solid #4C9DE6; border-radius:999px; padding:5px 14px; font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#93C5FD; margin-bottom:8px;">
              <span>🌍 RECORRIDO INTERACTIVO EN LA APLICACIÓN · 6 IDIOMAS NATIVOS</span>
            </div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.7rem, 3vw, 2.25rem); font-weight:900; color:#FFFFFF; margin:0;">
              Explora cada momento del Taller con Aura en 6 Idiomas
            </h2>
            <p style="font-size:0.92rem; color:#CBD5E1; margin:6px 0 0 0; max-width:760px;">
              Cambia el idioma y haz clic en cualquier etapa del recorrido (Paso 0 al Paso 6.3) para ver las capturas reales del estudio en acción.
            </p>
          </div>

          <!-- Selector de los 6 Idiomas -->
          <div style="display:flex; gap:6px; flex-wrap:wrap; background:rgba(255,255,255,0.06); border:1.5px solid rgba(255,255,255,0.16); border-radius:999px; padding:6px 10px;">
            ${[
              { code: "es", lbl: "🇪🇸 Español" },
              { code: "en", lbl: "🇺🇸 English" },
              { code: "fr", lbl: "🇫🇷 Français" },
              { code: "pt", lbl: "🇧🇷 Português" },
              { code: "de", lbl: "🇩🇪 Deutsch" },
              { code: "it", lbl: "🇮🇹 Italiano" }
            ].map(l => `
              <button type="button" onclick="window.tbbSetJourneyGalleryLang('${l.code}')" style="background:${jLang === l.code ? '#FF7A00' : 'transparent'}; color:#FFFFFF; border:1.5px solid ${jLang === l.code ? '#FFFFFF' : 'transparent'}; border-radius:999px; padding:6px 12px; font-size:0.75rem; font-weight:800; cursor:pointer;">
                ${l.lbl}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Barra de los 9 Momentos del Recorrido -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(115px, 1fr)); gap:8px;">
          ${MULTILINGUAL_APP_JOURNEY_CAPTURES.map((cap, idx) => {
            const isAct = idx === jStepIdx;
            const tObj = cap.i18n[jLang] || cap.i18n.es;
            return `
              <button type="button" onclick="window.tbbSelectJourneyGalleryStep(${idx})" style="background:${isAct ? 'linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%)' : 'rgba(255,255,255,0.05)'}; color:#FFFFFF; border:1.5px solid ${isAct ? '#FF7A00' : 'rgba(255,255,255,0.16)'}; border-radius:12px; padding:9px 10px; text-align:left; cursor:pointer; transition:all 0.18s ease;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:900; color:${isAct ? '#FF7A00' : '#93C5FD'};">${escHtml(cap.stepCode)}</div>
                <div style="font-size:0.72rem; font-weight:800; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escHtml(tObj.title.split('·')[1] || tObj.title)}</div>
              </button>
            `;
          }).join("")}
        </div>

        <!-- Escenario Principal de la Captura Seleccionada -->
        <div class="tbb-comm-grid-2" style="background:#0F172A; border:2px solid #1D4ED8; border-top:5px solid #FF7A00; border-radius:22px; padding:22px; gap:24px; align-items:center;">
          <div style="position:relative; border-radius:16px; overflow:hidden; border:2px solid #4C9DE6; box-shadow:0 20px 50px rgba(0,0,0,0.65); cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(1, '${activeCap.img}', '${escHtml(activeTxt.title)}')">
            <img src="${activeCap.img}" alt="${escHtml(activeTxt.title)}" style="width:100%; height:auto; display:block;" />
            <div style="position:absolute; top:12px; left:12px; background:rgba(9,13,22,0.9); border:1.5px solid #FF7A00; border-radius:999px; padding:4px 12px; font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:#FFFFFF;">
              ${escHtml(activeCap.stepCode)} · ${jLang.toUpperCase()}
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:14px;">
            <div style="display:inline-flex; align-items:center; gap:8px; align-self:flex-start; background:rgba(29,78,216,0.25); border:1px solid #4C9DE6; border-radius:999px; padding:5px 12px; font-family:'JetBrains Mono', monospace; font-size:0.65rem; font-weight:800; color:#93C5FD;">
              ${escHtml(activeTxt.uiBadge)}
            </div>
            <h3 style="font-family:'Montserrat', sans-serif; font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0; line-height:1.2;">
              ${escHtml(activeTxt.title)}
            </h3>
            <p style="font-size:0.95rem; font-weight:500; color:#E2E8F0; line-height:1.6; margin:0;">
              ${escHtml(activeTxt.desc)}
            </p>
            <div style="background:rgba(9,13,22,0.9); border:1.5px solid #1D4ED8; border-left:4px solid #FF7A00; border-radius:14px; padding:14px; display:flex; align-items:center; gap:12px;">
              <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="Aura" style="width:44px; height:44px; border-radius:50%; border:2px solid #FF7A00; object-fit:cover; flex-shrink:0;" />
              <div>
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; color:#FF7A00;">GUÍA DE VOZ Y TEXTO DE AURA (${jLang.toUpperCase()}):</div>
                <div style="font-size:0.84rem; font-weight:700; color:#FFFFFF; margin-top:3px; line-height:1.45;">${escHtml(activeTxt.auraPrompt)}</div>
              </div>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap; padding-top:4px;">
              <button type="button" onclick="window.tbbSelectJourneyGalleryStep(${jStepIdx - 1})" class="tbb-comm-btn-outline" style="padding:10px 16px; font-size:0.80rem;">← Momento Anterior</button>
              <button type="button" onclick="window.tbbSelectJourneyGalleryStep(${jStepIdx + 1})" class="tbb-comm-btn-outline" style="padding:10px 16px; font-size:0.80rem;">Siguiente Momento →</button>
              <a href="/studio" onclick="window.tbbChangeCommercialLanguage('${jLang}')" class="tbb-comm-btn-blue" style="padding:10px 18px; font-size:0.82rem; border-bottom:2.5px solid #FF7A00; margin-left:auto;">
                Abrir Estudio en ${jLang.toUpperCase()} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.tbbSelectExplorerPlate = function (plateNum) {
    window.tbbCommercialDemoState.activeExplorerPlate = Number(plateNum) || 1;
    const stage = document.getElementById("tbbExplorerPlateLiveStage");
    if (stage) {
      stage.innerHTML = window.tbbBuildExplorerPlateStageHTML(window.tbbCommercialDemoState.activeExplorerPlate);
    }
    MANUAL_36_PLATES_HIGHLIGHTS.forEach(m => {
      const btn = document.getElementById(`tbbExpTab_${m.n}`);
      if (btn) btn.classList.toggle("is-active", m.n === window.tbbCommercialDemoState.activeExplorerPlate);
    });
  };

  window.tbbBuildExplorerPlateStageHTML = function (plateNum) {
    const pNum = Math.max(1, Math.min(36, Number(plateNum) || 1));
    const padNum = String(pNum).padStart(2, "0");
    const meta = MANUAL_36_PLATES_HIGHLIGHTS.find(m => m.n === pNum) || {
      n: pNum,
      tag: `Lámina ${padNum} / 36`,
      title: `Lámina Oficial ${padNum} del Manual de Marca`,
      desc: "Lámina vectorial extraída directamente de Manual_Identidad_36_Laminas_the_best_brand.pdf."
    };

    return `
      <div style="background:#FFFFFF; border:2px solid #0D2540; border-top:6px solid #FF7A00; border-radius:22px; padding:22px; box-shadow:0 20px 50px rgba(9,13,22,0.10); color:#090D16;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding-bottom:14px; margin-bottom:16px; border-bottom:1.5px solid #CBD5E1;">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand Official Logo" style="width:44px; height:44px; border-radius:50%; border:2px solid #FF7A00; object-fit:cover;" />
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#EA580C;">${escHtml(meta.tag)} · MANUAL OFICIAL EN CURVAS</div>
              <div style="font-family:'Montserrat', sans-serif; font-size:1.18rem; font-weight:900; color:#090D16;">${escHtml(meta.title)}</div>
              <div style="font-size:0.82rem; font-weight:600; color:#475569;">${escHtml(meta.desc)}</div>
            </div>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" onclick="window.tbbOpenPlateLightboxModal(${pNum})" class="tbb-btn-light-surface" style="padding:8px 14px; font-size:0.78rem;">
              🔍 Ampliar Lámina ${padNum}
            </button>
            <a href="/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf" target="_blank" rel="noopener" class="tbb-comm-btn-blue" style="padding:8px 16px; font-size:0.78rem; border-bottom:2.5px solid #FF7A00;">
              Descargar PDF de 36 Láminas ↗
            </a>
          </div>
        </div>

        <div style="position:relative; border-radius:16px; overflow:hidden; border:1.5px solid #CBD5E1; background:#F8FAFC; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${pNum})">
          <img src="/assets/brandbook_plates_tbb/plate-${padNum}.jpg" alt="${escHtml(meta.title)}" style="width:100%; max-height:620px; object-fit:contain; display:block; margin:0 auto; background:#FFFFFF;" />
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
      player.poster = capsule.poster || 'https://storage.googleapis.com/thebestbrand-media-crm/videos/poster_aura_recorrido.jpg';
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

    const explorerTabs = MANUAL_36_PLATES_HIGHLIGHTS.map(p => ({
      n: p.n,
      lbl: `Lámina ${String(p.n).padStart(2, "0")} · ${p.title}`
    }));

    return `
      <!-- ===================================================================== -->
      <!-- 1. HEADER MONOFILA DE ALTA PRECISIÓN + DRAWER MÓVIL (IMPROBEARS / ACQUA) -->
      <!-- ===================================================================== -->
      <header class="tbb-awwwards-nav">
        <a href="#tbbCommHeroSection" style="display:flex; align-items:center; gap:11px; text-decoration:none; min-width:0;">
          <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:40px; height:40px; border-radius:10px; object-fit:cover; border:1.5px solid #4C9DE6; box-shadow:0 4px 12px rgba(29,78,216,0.35); flex-shrink:0;" />
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
          <a href="#tbbHeroLeftInteractiveDemoWrap" onclick="window.tbbSwitchMainSection(1);" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem; border-color:#FF7A00; color:#FFFFFF !important;">
            <span>⚡ Demo Interactiva</span>
          </a>
          <a href="#tbbCommDeliverablesFullSection" onclick="window.tbbSwitchMainSection(1);" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>📦 Los 9 Entregables</span>
          </a>
          <a href="#tbbFullMultilingualJourneySectionWrap" onclick="window.tbbSwitchMainSection(1);" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>🌍 App en 6 Idiomas</span>
          </a>
          <a href="#tbbCommPlateExplorerSection" onclick="window.tbbSwitchMainSection(3);" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>📘 Manual 36 Láminas</span>
          </a>
          <a href="#tbbCommVideoSection" onclick="window.tbbSwitchMainSection(4);" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>🎬 Videos & Libros</span>
          </a>
          <a href="#tbbCommPricingSection" onclick="window.tbbSwitchMainSection(3);" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
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
          <span class="tbb-tab-text">Demo + Entregables + Idiomas</span>
        </button>
        <button type="button" class="tbb-sec-tab tbb-tab-destello ${st.activeMainSection === 2 ? 'is-active' : ''}" id="tbbSecTab_2" onclick="window.tbbSwitchMainSection(2)">
          <span class="tbb-tab-number">02</span>
          <span class="tbb-tab-text">Taller Completo (Pasos 1 y 2)</span>
          <span class="tbb-badge-spark" style="background:#FF7A00; color:#FFFFFF; border-color:#FF7A00;">EN VIVO ✨</span>
        </button>
        <button type="button" class="tbb-sec-tab ${st.activeMainSection === 3 ? 'is-active' : ''}" id="tbbSecTab_3" onclick="window.tbbSwitchMainSection(3)">
          <span class="tbb-tab-number">03</span>
          <span class="tbb-tab-text">Manual 36 Láminas y Precios</span>
        </button>
        <button type="button" class="tbb-sec-tab ${st.activeMainSection === 4 ? 'is-active' : ''}" id="tbbSecTab_4" onclick="window.tbbSwitchMainSection(4)">
          <span class="tbb-tab-number">04</span>
          <span class="tbb-tab-text">Videos HeyGen/Flow y Libros</span>
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
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:32px; height:32px; border-radius:8px; object-fit:cover; border:1.5px solid #4C9DE6;" />
            <span style="font-weight:900; font-size:0.92rem; color:#FFFFFF;">THE BEST BRAND <span style="color:#FF7A00;">1.0</span></span>
          </div>
          <button type="button" class="tbb-comm-btn-outline" onclick="window.tbbToggleMobileDrawer(false)" style="padding:5px 10px;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; margin-top:14px;">
          <!-- ACCESO DIRECTO DESTACADO A LA APP -->
          <a href="/studio" style="display:flex; align-items:center; justify-content:space-between; padding:13px 15px; background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); border:2px solid #4C9DE6; border-bottom: 2.5px solid #4C9DE6; border-radius:14px; text-decoration:none; color:#FFFFFF; margin-bottom:6px; box-shadow:0 8px 20px rgba(0,0,0,0.35);">
            <div>
              <div style="font-size:0.92rem; font-weight:900; display:flex; align-items:center; gap:6px;">
                <span style="color:#FF7A00;">●</span> Entrar al Estudio Completo
              </div>
              <div style="font-size:0.72rem; color:#93C5FD; margin-top:2px;">
                Taller de Marca de 7 Pasos · 9 Entregables · 36 Láminas
              </div>
            </div>
            <span style="font-size:1.25rem; font-weight:900; color:#FF7A00;">↗</span>
          </a>
          <a href="#tbbHeroLeftInteractiveDemoWrap" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(1);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">⚡ Demo Interactiva + Galería</a>
          <a href="#tbbCommDeliverablesFullSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(1);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">📦 Los 9 Entregables Oficiales</a>
          <a href="#tbbFullMultilingualJourneySectionWrap" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(1);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">🌍 App en 6 Idiomas</a>
          <a href="#tbbCommPlateExplorerSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(3);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">📘 Explorador de 36 Láminas</a>
          <a href="#tbbCommVideoSection" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(4);" class="tbb-comm-btn-outline" style="justify-content:flex-start; padding:11px 14px;">🎬 Videos HeyGen + Flow & Libros</a>
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
      <!-- SECCIÓN 1: EL GANCHO INMEDIATO (DEMO INTERACTIVA IZQ + GALERÍA DER)   -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_1" style="display:${(st.activeMainSection === 1 || !st.activeMainSection) ? 'block' : 'none'};">
        <section id="tbbCommHeroSection" style="position:relative; padding:32px 20px 44px 20px; background:radial-gradient(circle at 65% 20%, #0D2540 0%, #090D16 58%, #050811 100%); color:#FFFFFF; overflow:hidden;">
          <!-- 60fps Dynamic Connected Nodes Canvas + WebGL GLSL Liquid Shader Backdrop + Dot Matrix Overlay -->
          <canvas id="heroDynamicCanvas" class="hero-dynamic-canvas" data-canvas-mode="ecosystem" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>
          <canvas id="webglLiquidShader" class="webgl-liquid-canvas" aria-hidden="true" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1; opacity:0.42; mix-blend-mode:screen;"></canvas>
          <div class="dot-matrix-overlay" aria-hidden="true" style="position:absolute; inset:0; width:100%; height:100%; background-image:radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px); background-size:24px 24px; pointer-events:none; z-index:1;"></div>
          <canvas id="tbbHeroAuraParticleCanvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>

          <div style="position:relative; z-index:2; max-width:1360px; margin:0 auto; display:flex; flex-direction:column; gap:24px;">
            <!-- CABECERA COMPACTA DE ALTO IMPACTO CON LOGO REAL APPLE LIQUID GLASS -->
            <div style="display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; background:rgba(9,13,22,0.82); backdrop-filter:blur(14px); border:1.5px solid rgba(76,157,230,0.45); border-left:5px solid #FF7A00; border-radius:22px; padding:18px 24px; box-shadow:0 20px 50px rgba(0,0,0,0.45);">
              <div style="display:flex; align-items:center; gap:18px; flex:1; min-width:300px;">
                <div style="position:relative; flex-shrink:0;">
                  <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand Official Logo" style="width:78px; height:78px; border-radius:20px; object-fit:cover; border:2.5px solid #4C9DE6; box-shadow:0 10px 30px rgba(29,78,216,0.55);" />
                  <span style="position:absolute; bottom:-5px; right:-5px; background:#FF7A00; color:#FFFFFF; font-family:'JetBrains Mono', monospace; font-size:0.54rem; font-weight:900; padding:2px 6px; border-radius:999px; border:1.5px solid #FFFFFF;">OFICIAL</span>
                </div>
                <div style="min-width:0;">
                  <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(29,78,216,0.22); border:1px solid #4C9DE6; border-radius:999px; padding:3px 12px; font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:#93C5FD; margin-bottom:6px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; box-shadow:0 0 8px #FF7A00;"></span>
                    <span>PRUÉBALO AHORA MISMO · DEMO EN VIVO A LA IZQUIERDA + 9 ENTREGABLES Y 6 IDIOMAS A LA DERECHA</span>
                  </div>
                  <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.65rem, 3.1vw, 2.45rem); font-weight:900; line-height:1.1; letter-spacing:-0.03em; margin:0; color:#FFFFFF;">
                    Crea tu Marca Profesional y tus <span style="color:#4C9DE6; border-bottom:2.5px solid #FF7A00;">9 Entregables Oficiales</span> ¡en minutos!
                  </h1>
                  <p style="font-size:0.88rem; font-weight:500; color:#CBD5E1; line-height:1.5; margin:6px 0 0 0; max-width:780px;">
                    Edita los datos en la <strong>Demo Interactiva (izquierda)</strong> y explora en la <strong>Galería Interactiva (derecha)</strong> los <strong>9 Entregables Reales</strong>, los recortes del <strong>Manual de 36 Láminas</strong> y el recorrido real de la aplicación en <strong>6 idiomas</strong>.
                  </p>
                </div>
              </div>

              <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; flex-shrink:0;">
                <a href="/studio" class="tbb-comm-btn-black tbb-tab-destello" style="font-size:0.86rem; padding:12px 20px; background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); border:2px solid #4C9DE6; border-bottom:3px solid #FF7A00; color:#FFFFFF; font-weight:900; border-radius:999px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; box-shadow:0 10px 25px rgba(13,37,64,0.45);">
                  <span style="color:#FF7A00; font-size:1rem; line-height:1;">●</span>
                  <span>Entrar a la App Completa ↗</span>
                </a>
                <button type="button" class="tbb-btn-light-surface" onclick="window.tbbOpenAuraRecorridoModal()" style="font-size:0.82rem; padding:11px 16px; background:#FFFFFF; color:#0D2540; border:1.5px solid #4C9DE6; border-radius:999px; font-weight:800; cursor:pointer;">
                  <span style="color:#FF7A00; margin-right:4px;">▶</span> Video Recorrido (00:55)
                </button>
                <button type="button" class="tbb-btn-light-surface" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.82rem; padding:11px 16px; background:#FF7A00; color:#FFFFFF; border:1.5px solid #FFFFFF; border-radius:999px; font-weight:900; cursor:pointer;">
                  <span>Comprar Pro · $49 USD</span>
                </button>
              </div>
            </div>

            <!-- WORKBENCH DE ENGANCHE INMEDIATO: DEMO EN VIVO (IZQUIERDA) + GALERÍA DE 9 ENTREGABLES, 36 LÁMINAS Y 6 IDIOMAS (DERECHA) -->
            <div class="tbb-comm-grid-2" style="align-items:stretch; gap:22px;">
              <!-- COLUMNA IZQUIERDA: DEMO INTERACTIVA EN VIVO -->
              <div id="tbbHeroLeftInteractiveDemoWrap" style="display:flex; flex-direction:column;">
                ${window.tbbBuildLeftInteractiveDemoHookHTML()}
              </div>

              <!-- COLUMNA DERECHA: GALERÍA INTERACTIVA DE 9 ENTREGABLES + RECORTES DEL MANUAL DE 36 LÁMINAS + RECORRIDO MULTILINGÜE -->
              <div id="tbbHeroRightInteractiveShowcaseWrap" style="display:flex; flex-direction:column;">
                ${window.tbbBuildRightInteractiveShowcaseHTML()}
              </div>
            </div>
          </div>
        </section>

        <!-- TICKER MARQUEE CONTINUO DE INGENIERÍA DE MARCA -->
        <div style="background:#090D16; border-top:2px solid #1D4ED8; border-bottom:3px solid #FF7A00; padding:10px 0; overflow:hidden; white-space:nowrap;">
          <div style="display:inline-block; animation:tbbMarquee 28s linear infinite; font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:800; color:#FFFFFF; letter-spacing:0.12em;">
            THE BEST BRAND · YOUR BRAND, NOW!!! · 9 ENTREGABLES OFICIALES (.PDF, .HTML, .SVG, .AI, ICONO 1:1, FIRMA CORREO, WORD .DOCX, POWERPOINT .PPTX, KIT DE FUENTES .ZIP) · MANUAL DE 36 LÁMINAS EN CURVAS · APP EN 6 IDIOMAS (ES, EN, FR, PT, DE, IT) · DEL CAOS AL SISTEMA ·
            THE BEST BRAND · YOUR BRAND, NOW!!! · 9 ENTREGABLES OFICIALES (.PDF, .HTML, .SVG, .AI, ICONO 1:1, FIRMA CORREO, WORD .DOCX, POWERPOINT .PPTX, KIT DE FUENTES .ZIP) · MANUAL DE 36 LÁMINAS EN CURVAS · APP EN 6 IDIOMAS (ES, EN, FR, PT, DE, IT) · DEL CAOS AL SISTEMA ·
          </div>
        </div>

        <!-- CATÁLOGO COMPLETO DE LOS 9 ENTREGABLES OFICIALES CON RECORTES REALES DEL MANUAL DE 36 LÁMINAS -->
        ${window.tbbBuildFullDeliverablesAndManualGallerySectionHTML()}

        <!-- GALERÍA MULTILINGÜE COMPLETA (6 IDIOMAS × 9 MOMENTOS DEL RECORRIDO DE LA APP) -->
        <section id="tbbFullMultilingualJourneySectionWrap" style="padding:58px 24px; background:#090D16; border-bottom:2px solid #1D4ED8;">
          ${window.tbbBuildFullMultilingualJourneyGallerySectionHTML()}
        </section>

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
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; font-weight:800; color:#4C9DE6;">FUNDADOR DE IMPROBEARS & SUITE THE BEST</div>
            </div>
          </div>

          <div class="tbb-apple-reveal" style="display:flex; flex-direction:column; gap:16px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#FF7A00;">
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
              <div style="background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.14); border-left:4px solid #FF7A00; border-radius:12px; padding:14px;">
                <div style="font-size:0.90rem; font-weight:900; color:#FFFFFF;">Manual de 36 Láminas + 9 Entregables</div>
                <div style="font-size:0.76rem; color:#CBD5E1; margin-top:3px;">Cero plantillas rígidas: arquitectura adaptativa lista para imprenta, web y registro.</div>
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
                  <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbContinueFromDemoIntoFullStudio()" style="width:100%; padding:14px 20px; font-size:0.92rem; font-weight:800; background:linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%); border-bottom: 2.5px solid #4C9DE6;">
                    <span>Continuar al Paso 3 · Naming & Clases de Niza →</span>
                  </button>

                </div>
              `}
            </div>

            <!-- Columna Derecha: Círculo Dorado Circular + Matriz de Touchpoints -->
            <div style="background:#FFFFFF; border:2px solid #CBD5E1; border-top:6px solid #0D2540; border-radius:22px; padding:22px; display:flex; flex-direction:column; justify-content:space-between; gap:14px; box-shadow:0 16px 38px rgba(9,13,22,0.07);">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8;">
                  ${t("goldenCircleTitle")} · LÁMINA 04 / 36
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
                  MATRIZ DE TOUCHPOINTS SELECCIONADOS (LÁMINAS 10-12 / 36)
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
      <!-- SECCIÓN 3: OFERTA Y ENTREGABLES (MANUAL DE 36 LÁMINAS, BÓVEDA Y PRECIOS)-->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_3" style="display:${st.activeMainSection === 3 ? 'block' : 'none'};">
        <section id="tbbCommPlateExplorerSection" style="padding:64px 24px; background:linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%); border-bottom:2px solid #CBD5E1;">
        <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:22px;">
          <div class="tbb-apple-reveal" style="text-align:center; max-width:840px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#FF7A00; letter-spacing:0.06em;">
              MANUAL OFICIAL DE IDENTIDAD DE 36 LÁMINAS · THE BEST BRAND
            </div>
            <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.75rem, 3.1vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
              Explorador de Recortes Reales del Manual de 36 Láminas
            </h2>
            <p style="font-size:0.94rem; font-weight:600; color:#334155; margin:0;">
              Selecciona cualquier lámina para inspeccionar el acabado editorial real extraído de <code>Manual_Identidad_36_Laminas_the_best_brand.pdf</code>.
            </p>
          </div>

          <!-- Pestañas de Láminas de Alta Contraste sobre Lienzo Claro -->
          <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
            ${explorerTabs.map(tab => `
              <button type="button" id="tbbExpTab_${tab.n}" class="tbb-tab-light-surface ${st.activeExplorerPlate === tab.n ? 'is-active' : ''}" onclick="window.tbbSelectExplorerPlate(${tab.n})" style="padding:9px 13px; font-size:0.74rem;">
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

        ${window.tbbBuildFullDeliverablesAndManualGallerySectionHTML()}

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
                  <li>Generación y evolución ilimitada de logotipo en curvas SVG y .AI</li>
                  <li>Los 9 Entregables Oficiales (.PDF 36 Láminas, .HTML, .SVG, .AI, .DOCX, .PPTX, Firma .HTML y Kit .ZIP)</li>
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
                  <li>Paquete técnico completo de 9 entregables para cada marca cliente</li>
                  <li>Licencia comercial para entrega de manuales de 36 láminas a tus clientes</li>
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
              <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" poster="${activeCapsule.poster || 'https://storage.googleapis.com/thebestbrand-media-crm/videos/poster_aura_recorrido.jpg'}" playsinline webkit-playsinline controls preload="metadata" style="width:100%; height:100%; object-fit:contain; display:block;"></video>
              
              <!-- Botón de Reproducción Central Navy Blue con Micro-Acento Naranja -->
              <div id="tbbVideoPlayOverlay" onclick="window.tbbToggleMasterclassPlay()" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(9,13,22,0.35); cursor:pointer;">
                <div style="width:78px; height:78px; border-radius:50%; background:#0D2540; border:2.5px solid #4C9DE6; border-bottom: 2.5px solid #4C9DE6; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 32px rgba(13,37,64,0.6); transition:transform 0.2s ease;">
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
    const heroLeft = document.getElementById("tbbHeroLeftInteractiveDemoWrap");
    if (heroLeft) heroLeft.innerHTML = window.tbbBuildLeftInteractiveDemoHookHTML();
    window.tbbRefreshCommercialPortalDOM();
    window.tbbTriggerCommercialAuraFeedback(stepNum === 2 ? "touchpoint" : "why");
  };

  window.tbbUpdateCommercialDemoField = function (fieldKey, value) {
    window.tbbCommercialDemoState[fieldKey] = String(value || "");
    window.tbbSyncCommercialDemoToAppState();
    const gcWrap = document.getElementById("tbbCommGoldenCircleSvgWrap");
    if (gcWrap) gcWrap.innerHTML = window.tbbBuildCircularGoldenCircleSVG();
    const heroGcWrap = document.getElementById("tbbHeroGoldenCircleSvgWrap");
    if (heroGcWrap) heroGcWrap.innerHTML = window.tbbBuildCircularGoldenCircleSVG();
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
        background: linear-gradient(135deg, #0D2540 0%, #1D4ED8 100%) !important;
        color: #FFFFFF !important;
        border: 1.5px solid #4C9DE6 !important;
        padding: 9px 18px;
        border-radius: 999px;
        font-family: var(--font-main);
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(13, 37, 64, 0.45) !important;
        white-space: nowrap;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .tbb-float-buy-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(76, 157, 230, 0.45) !important;
        border-color: #93C5FD !important;
      }

      
      /* REGLA DE AISLAMIENTO ESTRICTO EN SECCIÓN DEMO: Cero ruido de compra */
      body.tbb-is-demo-section #tbbAlwaysOnBuyFloatingBar,
      body.tbb-is-demo-section .tbb-comm-btn-black,
      body.tbb-is-demo-section #tbbBtnTopBuyAppNow,
      body.tbb-is-demo-section .tbb-sec-tab-direct-studio,
      body.tbb-is-demo-section .tbb-comm-btn-studio-header,
      body.tbb-is-demo-section #tbbCommercialLangSelect {
        display: none !important;
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
    const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true" && window.location.pathname !== "/studio" && !window.location.pathname.endsWith("studio.html");

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
    const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true" && window.location.pathname !== "/studio" && !window.location.pathname.endsWith("studio.html");
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
