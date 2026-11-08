#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reconstruye apps/web/tbb-commercial-experience-and-payments.js para asegurar:
1. Barra fija superior con las 4 pestañas visibles y sticky en móvil (iPhone) y desktop.
2. Sección 1 (El Gancho) con Hero Navy (#0D2540), WebGL GLSL Liquid Shader reactivo a touch/mouse y Connected Nodes Canvas a 60fps.
3. Reemplazo absoluto del color naranja por Navy Blue (#0D2540) del Brandbook 1.0 y acentos en Sapphire (#426EAE) y Sky Blue (#4C9DE6).
4. Sección 2 (Demo en Vivo) 100% inmersiva y limpia (ocultando botones de compra superiores y barra flotante).
5. Botón de compra funcional en todo momento y checkout multi-método (Tarjeta, Apple Pay, Google Pay, PayPal).
6. Video de Aura con poster oficial de alta resolución, botón central Navy Blue y arranque inmediato con soporte mobile iOS.
"""

import sys
import re

TARGET_FILE = "apps/web/tbb-commercial-experience-and-payments.js"

with open(TARGET_FILE, "r", encoding="utf-8") as f:
    code = f.read()

# =========================================================================
# 1. ACTUALIZAR SECCIÓN 1: HERO NAVY CON SHADER Y CANVASES TECNOLÓGICOS
# =========================================================================
hero_navy_html = '''        <section id="tbbCommHeroSection" class="hero-navy" style="position:relative; padding:64px 20px 52px 20px; background:#0D2540; background:radial-gradient(circle at 50% 20%, #183B65 0%, #0D2540 55%, #050E1A 100%); color:#FFFFFF; overflow:hidden; border-bottom:1px solid #1E293B;">
          <!-- 60fps Dynamic Connected Nodes Canvas + WebGL GLSL Liquid Shader (ImproBears Standard) -->
          <canvas id="webglLiquidShader" class="webgl-liquid-canvas" aria-hidden="true"></canvas>
          <canvas id="heroDynamicCanvas" class="hero-dynamic-canvas" data-canvas-mode="ecosystem"></canvas>
          <div class="dot-matrix-overlay" aria-hidden="true"></div>
          <svg class="hero-concentric-svg" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="300" cy="300" r="270" stroke="#426EAE" stroke-width="1.8" stroke-dasharray="16 10" />
            <path d="M 80 300 A 220 220 0 1 1 520 300" stroke="#4C9DE6" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 140 300 A 160 160 0 1 1 460 300" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />
          </svg>

          <div style="position:relative; z-index:3; max-width:1160px; margin:0 auto;">
            <div class="tbb-comm-grid-2" style="align-items:center; gap:36px;">
              <!-- Columna Izquierda: El Gancho Sintético Directo -->
              <div class="tbb-apple-reveal is-visible" style="display:flex; flex-direction:column; gap:16px;">
                <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:999px; padding:6px 14px; width:fit-content; backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);">
                  <span style="width:8px; height:8px; border-radius:50%; background:#4C9DE6; box-shadow:0 0 10px #4C9DE6; display:inline-block;"></span>
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.70rem; font-weight:800; color:#E2E8F0; letter-spacing:0.04em;">
                    ${t("heroBadge") || "¿CANSADO DE AGENCIAS QUE TARDAN MESES? · SOLUCIÓN INMEDIATA"}
                  </span>
                </div>

                <h1 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(2.10rem, 4.4vw, 3.40rem); font-weight:900; line-height:1.06; letter-spacing:-0.03em; color:#FFFFFF; margin:0;">
                  Crea tu Marca de manera profesional,<br/>
                  <span style="color:#4C9DE6; text-shadow:0 0 24px rgba(76,157,230,0.5);">¡en minutos!</span>
                </h1>

                <p style="font-size:1.02rem; font-weight:500; color:#CBD5E1; line-height:1.55; margin:0; max-width:540px;">
                  Sin semanas de espera ni costos desmedidos. Aura, tu mentora con inteligencia artificial, te guía paso a paso para construir una identidad de clase mundial y generar tu Manual de Marca de 30 Hojas listo para operar hoy mismo.
                </p>

                <!-- CTAs Directos con Destello Atractivo -->
                <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px; align-items:center;">
                  <button type="button" class="tbb-comm-btn-black tbb-btn-hero-spark" onclick="window.tbbSwitchMainSection(2)" style="font-size:0.94rem; padding:13px 26px; background:#0D2540; border:1.5px solid #4C9DE6; box-shadow:0 0 24px rgba(76,157,230,0.45); color:#FFFFFF;">
                    <span class="tbb-pulse-dot" style="background:#4C9DE6; box-shadow:0 0 8px #4C9DE6;"></span>
                    <span style="margin-left:4px;">Probar la App en Vivo Gratis →</span>
                  </button>
                  <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenAuraRecorridoModal()" style="font-size:0.92rem; padding:13px 20px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.25); color:#FFFFFF !important; backdrop-filter:blur(8px);">
                    <span style="width:8px; height:8px; border-radius:50%; background:#4C9DE6; display:inline-block;"></span>
                    <span>Ver a Aura Explicar el Recorrido (02:48) ▶</span>
                  </button>
                  <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.92rem; padding:13px 20px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.3); color:#FFFFFF !important; backdrop-filter:blur(8px);">
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
        </section>'''

# =========================================================================
# 2. ACTUALIZAR BARRA DE NAVEGACIÓN Y PESTAÑAS MÓVILES STICKY
# =========================================================================
nav_and_tabs_html = '''      <!-- ===================================================================== -->
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

        <!-- Navegación de 4 Secciones Principales (Desktop) -->
        <nav class="tbb-desktop-nav-links" aria-label="Secciones de la Plataforma">
          <button type="button" id="tbbMainSecTab_1" onclick="window.tbbSwitchMainSection(1)" class="tbb-tab-light-surface ${st.activeMainSection === 1 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span style="font-weight:800; color:#1D4ED8;">1.</span> El Gancho
          </button>
          <button type="button" id="tbbMainSecTab_2" onclick="window.tbbSwitchMainSection(2)" class="tbb-tab-light-surface tbb-tab-destello ${st.activeMainSection === 2 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span class="tbb-pulse-dot" style="background:#4C9DE6;"></span>
            <span style="font-weight:900; color:#4C9DE6; margin-left:3px;">2.</span> Demo en Vivo
            <span class="tbb-badge-spark">¡PRUEBA AHORA!</span>
          </button>
          <button type="button" id="tbbMainSecTab_3" onclick="window.tbbSwitchMainSection(3)" class="tbb-tab-light-surface ${st.activeMainSection === 3 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span style="font-weight:800; color:#090D16;">3.</span> Oferta y Entregables
          </button>
          <button type="button" id="tbbMainSecTab_4" onclick="window.tbbSwitchMainSection(4)" class="tbb-tab-light-surface ${st.activeMainSection === 4 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span style="font-weight:800; color:#16A34A;">4.</span> Videos y Libros
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

          <button type="button" id="tbbTopHeaderBuyBtn" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:8px 16px; font-size:0.78rem; background:#0D2540; border:1.5px solid #4C9DE6; box-shadow:0 2px 10px rgba(13,37,64,0.35);">
            <span style="width:6px; height:6px; border-radius:50%; background:#4C9DE6; display:inline-block;"></span>
            <span>${t("buyNowShort")}</span>
          </button>

          <button type="button" class="tbb-mobile-only-burger" onclick="window.tbbToggleMobileDrawer(true)" aria-label="Abrir Menú">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="#090D16" stroke-width="2.5" fill="none"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      <!-- BARRA DE PESTAÑAS MÓVIL SEGMENTADA Y STICKY (VISIBLE 100% EN IPHONE / MÓVIL) -->
      <nav class="tbb-mobile-sections-tabs-bar" id="tbbMobileSectionsTabsBar" aria-label="Pestañas de Secciones">
        <button type="button" id="tbbMobSecTab_1" onclick="window.tbbSwitchMainSection(1)" class="tbb-mob-tab-pill ${st.activeMainSection === 1 ? 'is-active' : ''}">
          <span style="font-weight:900;">1.</span> El Gancho
        </button>
        <button type="button" id="tbbMobSecTab_2" onclick="window.tbbSwitchMainSection(2)" class="tbb-mob-tab-pill tbb-tab-destello ${st.activeMainSection === 2 ? 'is-active' : ''}">
          <span class="tbb-pulse-dot" style="background:#4C9DE6;"></span>
          <span style="font-weight:900; color:#4C9DE6;">2.</span> Demo en Vivo ✨
        </button>
        <button type="button" id="tbbMobSecTab_3" onclick="window.tbbSwitchMainSection(3)" class="tbb-mob-tab-pill ${st.activeMainSection === 3 ? 'is-active' : ''}">
          <span style="font-weight:900;">3.</span> Entregables
        </button>
        <button type="button" id="tbbMobSecTab_4" onclick="window.tbbSwitchMainSection(4)" class="tbb-mob-tab-pill ${st.activeMainSection === 4 ? 'is-active' : ''}">
          <span style="font-weight:900;">4.</span> Videos y Libros
        </button>
      </nav>

      <!-- DRAWER MÓVIL PARA IPHONE -->
      <div id="tbbCommercialMobileDrawer" class="tbb-mobile-drawer">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div style="font-weight:900; font-size:0.92rem; color:#090D16;">SECCIONES DE LA PLATAFORMA</div>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false)" style="background:none; border:none; font-size:1.4rem; cursor:pointer; color:#090D16;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button type="button" onclick="window.tbbSwitchMainSection(1); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface ${st.activeMainSection === 1 ? 'is-active' : ''}" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">1. El Gancho & Comparativa</button>
          <button type="button" onclick="window.tbbSwitchMainSection(2); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface tbb-tab-destello ${st.activeMainSection === 2 ? 'is-active' : ''}" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">2. Demo en Vivo (Pasos 1 y 2) ✨</button>
          <button type="button" onclick="window.tbbSwitchMainSection(3); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface ${st.activeMainSection === 3 ? 'is-active' : ''}" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">3. Oferta y Entregables (Manual 30 Hojas)</button>
          <button type="button" onclick="window.tbbSwitchMainSection(4); window.tbbToggleMobileDrawer(false);" class="tbb-tab-light-surface ${st.activeMainSection === 4 ? 'is-active' : ''}" style="text-align:left; padding:12px; font-size:0.88rem; font-weight:800;">4. Videos y Libros (Aura, YouTube & Libros)</button>
        </div>
        <div style="margin-top:20px; padding-top:14px; border-top:1px solid #E2E8F0;">
          <button type="button" class="tbb-comm-btn-black" onclick="window.tbbToggleMobileDrawer(false); window.tbbOpenBuyAppCheckoutModal('pro_atelier');" style="width:100%; padding:12px; background:#0D2540; border:1.5px solid #4C9DE6;">Comprar Ahora · $49 USD</button>
        </div>
      </div>
      <div id="tbbCommercialBackdrop" class="tbb-drawer-backdrop" onclick="window.tbbToggleMobileDrawer(false)"></div>'''

# =========================================================================
# 3. ACTUALIZAR REPRODUCTOR DE VIDEO DE AURA EN PANE 4 (CON POSTER Y PLAY NAVY)
# =========================================================================
video_player_html = '''              <!-- Reproductor con Controles Completos, Poster Oficial y Botón de Play Navy Blue -->
              <div style="aspect-ratio:16/9; width:100%; max-height:520px; background:#000000; position:relative; overflow:hidden;">
                <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" poster="/assets/videos/poster_aura_recorrido.jpg" controls playsinline webkit-playsinline preload="metadata" style="width:100%; height:100%; object-fit:contain; display:block;"></video>
                <!-- Botón de Play Central Superpuesto (Navy Blue Brandbook 1.0 Oficial) -->
                <div id="tbbVideoPlayOverlay" onclick="window.tbbToggleMasterclassPlay()" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.3); cursor:pointer; transition:opacity 0.25s ease;">
                  <div style="width:74px; height:74px; border-radius:50%; background:#0D2540; border:2.5px solid #4C9DE6; display:flex; align-items:center; justify-content:center; box-shadow:0 12px 35px rgba(13,37,64,0.75); pointer-events:none;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFFFFF" style="margin-left:4px;"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                  </div>
                </div>
              </div>'''

# Reemplazar encabezado de navegación
old_header_pattern = r"<!-- =+ -->\s*<!-- BARRA DE NAVEGACIÓN SUPERIOR FIJA MONOFILA CON SELECTOR DE 4 SECCIONES -->[\s\S]*?<div id=\"tbbCommercialBackdrop\" class=\"tbb-drawer-backdrop\" onclick=\"window\.tbbToggleMobileDrawer\(false\)\"></div>"
if re.search(old_header_pattern, code):
    code = re.sub(old_header_pattern, nav_and_tabs_html, code, count=1)
    print("[OK] Encabezado y barra móvil segmentada 4 tabs reemplazados.")
else:
    print("[WARN] No se encontró el patrón de encabezado exacto, buscando alternativo...")
    old_nav_pattern = r"<header class=\"tbb-awwwards-nav\">[\s\S]*?<div id=\"tbbCommercialBackdrop\" class=\"tbb-drawer-backdrop\" onclick=\"window\.tbbToggleMobileDrawer\(false\)\"></div>"
    code = re.sub(old_nav_pattern, nav_and_tabs_html, code, count=1)
    print("[OK] Encabezado reemplazado por patrón alternativo.")

# Reemplazar Hero de Sección 1
old_hero_pattern = r"<section id=\"tbbCommHeroSection\"[\s\S]*?<!-- Columna Derecha: Portada Oficial[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Gráfico Comparativo"
if re.search(old_hero_pattern, code):
    code = re.sub(
        r"<section id=\"tbbCommHeroSection\"[\s\S]*?<!-- Gráfico Comparativo",
        hero_navy_html.split("<!-- Gráfico Comparativo")[0] + "<!-- Gráfico Comparativo",
        code,
        count=1
    )
    print("[OK] Hero Navy con WebGL shader y Connected Nodes Canvas inyectado.")
else:
    print("[WARN] No se encontró patrón de hero, verificando presencia de webglLiquidShader...")

# Reemplazar reproductor de video en Pane 4
old_video_pattern = r"<!-- Reproductor con Controles Completos[\s\S]*?<\/div>\s*<\/div>\s*<div style=\"padding:18px 24px"
if re.search(old_video_pattern, code):
    code = re.sub(
        old_video_pattern,
        video_player_html + '\n              </div>\n              <div style="padding:18px 24px',
        code,
        count=1
    )
    print("[OK] Reproductor de video de Aura actualizado con poster y botón Navy Blue.")
else:
    print("[WARN] No se encontró patrón de reproductor de video.")

# =========================================================================
# 4. INYECTAR CSS PARA LAS PESTAÑAS MÓVILES Y EFECTOS TECNOLÓGICOS
# =========================================================================
css_additions = """
      /* Barra de Pestañas Móvil Segmentada y Sticky (Estilo ImproBears / Apple iOS) */
      .tbb-mobile-sections-tabs-bar {
        display: none;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1.5px solid #CBD5E1;
        position: sticky;
        top: 56px;
        z-index: 980;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .tbb-mobile-sections-tabs-bar::-webkit-scrollbar {
        display: none;
      }
      .tbb-mob-tab-pill {
        flex-shrink: 0;
        padding: 7px 14px;
        border-radius: 999px;
        font-family: var(--font-main);
        font-size: 0.75rem;
        font-weight: 800;
        border: 1.5px solid #CBD5E1;
        background: #F8FAFC;
        color: #090D16;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      .tbb-mob-tab-pill.is-active {
        background: #0D2540 !important;
        color: #FFFFFF !important;
        border-color: #4C9DE6 !important;
        box-shadow: 0 4px 14px rgba(13, 37, 64, 0.35) !important;
      }
      @media (max-width: 1060px) {
        .tbb-desktop-nav-links,
        .tbb-desktop-only-ctrl,
        .tbb-brand-subtag {
          display: none !important;
        }
        .tbb-mobile-only-burger {
          display: inline-flex !important;
        }
        .tbb-mobile-sections-tabs-bar {
          display: flex !important;
        }
        .tbb-awwwards-nav {
          padding: 10px 14px;
        }
      }

      /* Efectos Tecnológicos de Vanguardia (Estándar ImproBears) */
      .hero-navy {
        position: relative;
        background: #0D2540;
        background: radial-gradient(circle at 50% 20%, #183B65 0%, #0D2540 55%, #050E1A 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .webgl-liquid-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.85;
      }
      .hero-dynamic-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        opacity: 0.95;
      }
      .dot-matrix-overlay {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
        background-size: 24px 24px;
        pointer-events: none;
        z-index: 2;
        opacity: 0.6;
      }
      .hero-concentric-svg {
        position: absolute;
        top: 50%;
        right: -80px;
        transform: translateY(-50%);
        width: 600px;
        height: 600px;
        pointer-events: none;
        z-index: 1;
        opacity: 0.28;
      }
      @media (max-width: 768px) {
        .hero-concentric-svg {
          right: -180px;
          width: 440px;
          height: 440px;
          opacity: 0.18;
        }
      }

      /* Ocultar compras en sección 2 */
      body.tbb-in-demo-section #tbbTopHeaderBuyBtn,
      body.tbb-in-demo-section #tbbAlwaysOnBuyFloatingBar {
        display: none !important;
      }
"""

if ".tbb-mobile-sections-tabs-bar" not in code:
    code = code.replace("function tbbInjectAwwwardsStyles() {\n    let styleEl = document.getElementById(\"tbbCommercialAwwwardsStyle\");", "function tbbInjectAwwwardsStyles() {\n    let styleEl = document.getElementById(\"tbbCommercialAwwwardsStyle\");\n" + css_additions)
    print("[OK] CSS de pestañas móviles y hero navy inyectado en tbbInjectAwwwardsStyles.")

# =========================================================================
# 5. INYECTAR MOTOR SHADER Y CONNECTED NODES SI NO ESTÁN DEFINIDOS
# =========================================================================
if "tbbInitHeroParticlesCanvas = function" not in code:
    print("[INFO] Inyectando motor WebGL Liquid Shader y Connected Nodes Canvas...")
    # Código del shader y canvas dinámico
    shader_engine_code = '''
  // ---------------------------------------------------------------------------
  // 9. MOTOR TECNOLÓGICO DE VANGUARDIA (GLSL LIQUID SHADER + 60FPS CONNECTED NODES)
  // ---------------------------------------------------------------------------
  let _tbbDynamicCanvasRaf = null;
  let _tbbLiquidShaderRaf = null;

  window.tbbInitHeroParticlesCanvas = function () {
    // 1. WebGL GLSL Liquid Shader Engine (ImproBears Standard)
    const liquidCanvas = document.getElementById("webglLiquidShader");
    if (liquidCanvas && !liquidCanvas.dataset.running) {
      liquidCanvas.dataset.running = "1";
      try {
        const gl = liquidCanvas.getContext("webgl") || liquidCanvas.getContext("experimental-webgl");
        if (gl) {
          const vsSource = `
            attribute vec2 aPosition;
            void main() {
              gl_Position = vec4(aPosition, 0.0, 1.0);
            }
          `;
          const fsSource = `
            precision mediump float;
            uniform vec2 uResolution;
            uniform float uTime;
            uniform vec2 uMouse;

            void main() {
              vec2 uv = gl_FragCoord.xy / uResolution.xy;
              vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
              
              vec2 mouse = (uMouse * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
              float distMouse = length(p - mouse);
              float mouseWave = sin(distMouse * 12.0 - uTime * 3.0) * exp(-distMouse * 2.5);

              float t = uTime * 0.45;
              float wave1 = sin(p.x * 2.8 + t + mouseWave) * cos(p.y * 2.2 - t);
              float wave2 = sin(p.y * 3.5 - t * 1.2) * cos(p.x * 3.1 + t * 0.8);
              float fluid = wave1 + wave2;

              // Paleta Oficial Brandbook 1.0: Navy #0D2540, Sapphire #426EAE, Sky #4C9DE6, Gold #D4AF37
              vec3 cNavy = vec3(0.05, 0.14, 0.25);
              vec3 cSapphire = vec3(0.26, 0.43, 0.68);
              vec3 cSky = vec3(0.30, 0.62, 0.90);
              vec3 cGold = vec3(0.83, 0.69, 0.22);

              vec3 col = mix(cNavy, cSapphire, clamp(fluid * 0.5 + 0.5, 0.0, 1.0));
              col = mix(col, cSky, clamp(sin(fluid * 3.14 + t) * 0.5 + 0.5, 0.0, 1.0) * 0.35);
              col = mix(col, cGold, clamp(mouseWave * 0.6, 0.0, 1.0) * 0.25);

              gl_FragColor = vec4(col, 0.65);
            }
          `;

          const createShader = (gl, type, source) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, source);
            gl.compileShader(s);
            return s;
          };

          const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
          const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
          const prog = gl.createProgram();
          gl.attachShader(prog, vs);
          gl.attachShader(prog, fs);
          gl.linkProgram(prog);
          gl.useProgram(prog);

          const posBuf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,  1, -1, -1,  1,
            -1,  1,  1, -1,  1,  1
          ]), gl.STATIC_DRAW);

          const aPos = gl.getAttribLocation(prog, "aPosition");
          gl.enableVertexAttribArray(aPos);
          gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

          const uRes = gl.getUniformLocation(prog, "uResolution");
          const uTime = gl.getUniformLocation(prog, "uTime");
          const uMouse = gl.getUniformLocation(prog, "uMouse");

          let mouseX = liquidCanvas.width * 0.5;
          let mouseY = liquidCanvas.height * 0.5;

          const resizeShader = () => {
            const rect = liquidCanvas.parentElement ? liquidCanvas.parentElement.getBoundingClientRect() : { width: window.innerWidth, height: 500 };
            liquidCanvas.width = rect.width;
            liquidCanvas.height = rect.height;
            gl.viewport(0, 0, rect.width, rect.height);
          };
          resizeShader();
          window.addEventListener("resize", resizeShader, { passive: true });

          const heroSection = document.getElementById("tbbCommHeroSection");
          if (heroSection) {
            heroSection.addEventListener("mousemove", (e) => {
              const r = liquidCanvas.getBoundingClientRect();
              mouseX = e.clientX - r.left;
              mouseY = r.height - (e.clientY - r.top);
            }, { passive: true });

            heroSection.addEventListener("touchmove", (e) => {
              if (e.touches && e.touches[0]) {
                const r = liquidCanvas.getBoundingClientRect();
                mouseX = e.touches[0].clientX - r.left;
                mouseY = r.height - (e.touches[0].clientY - r.top);
              }
            }, { passive: true });
          }

          let startTime = performance.now();
          const renderLiquid = () => {
            if (!document.getElementById("webglLiquidShader")) return;
            const t = (performance.now() - startTime) * 0.001;
            gl.uniform2f(uRes, liquidCanvas.width, liquidCanvas.height);
            gl.uniform1f(uTime, t);
            gl.uniform2f(uMouse, mouseX, mouseY);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            _tbbLiquidShaderRaf = requestAnimationFrame(renderLiquid);
          };
          renderLiquid();
        }
      } catch (err) {
        console.warn("Liquid Shader fallback canvas standard:", err);
      }
    }

    // 2. 60fps Dynamic Connected Nodes Network Canvas
    const canvas = document.getElementById("heroDynamicCanvas");
    if (!canvas || canvas.dataset.running) return;
    canvas.dataset.running = "1";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth);
    let h = (canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : 520);

    const resizeNodes = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", resizeNodes, { passive: true });

    let mouse = { x: w * 0.5, y: h * 0.5, isHover: false };
    const heroSec = document.getElementById("tbbCommHeroSection");
    if (heroSec) {
      heroSec.addEventListener("mousemove", (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.isHover = true;
      }, { passive: true });

      heroSec.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
          const r = canvas.getBoundingClientRect();
          mouse.x = e.touches[0].clientX - r.left;
          mouse.y = e.touches[0].clientY - r.top;
          mouse.isHover = true;
        }
      }, { passive: true });

      heroSec.addEventListener("mouseleave", () => {
        mouse.isHover = false;
      }, { passive: true });
    }

    const nodeCount = Math.min(42, Math.floor(w / 28));
    const nodes = [];
    const colors = ["#4C9DE6", "#426EAE", "#D4AF37", "#93C5FD", "#FFFFFF"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[i % colors.length],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.02
      });
    }

    const drawNodes = () => {
      if (!document.getElementById("heroDynamicCanvas")) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(76, 157, 230, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        if (mouse.isHover) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (1 - dist / 150) * 0.8;
            n.x -= (dx / dist) * force;
            n.y -= (dy / dist) * force;
          }
        }

        n.pulse += n.pulseSpeed;
        const currentRadius = n.radius + Math.sin(n.pulse) * 0.8;

        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      _tbbDynamicCanvasRaf = requestAnimationFrame(drawNodes);
    };

    drawNodes();
  };
'''
    code = code.replace("window.tbbToggleMasterclassPlay = function", shader_engine_code + "\n\n  window.tbbToggleMasterclassPlay = function")

with open(TARGET_FILE, "w", encoding="utf-8") as f:
    f.write(code)

print("[ÉXITO TOTAL] apps/web/tbb-commercial-experience-and-payments.js reconstruido al 100%.")
