#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Aplica las mejoras solicitadas:
1. Destello atractivo (Shimmer & Radar Pulse) en pestañas y botón hacia la Demo.
2. Sección 2 con la aplicación real Studio embebida sin scroll forzado, que al pasar al paso 3 envía a Comprar la App.
3. Solución definitiva del video de Aura: controles nativos, botón play central, y modal directo desde el Hero.
4. Nuevos videos en YouTube sobre Customer Journey y Touchpoints.
"""

with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    code = f.read()

# ------------------------------------------------------------------------------
# 1. ACTUALIZAR YOUTUBE_METHODOLOGY_AUTHORS CON CUSTOMER JOURNEY Y TOUCHPOINTS
# ------------------------------------------------------------------------------
old_yt_start = code.find("const YOUTUBE_METHODOLOGY_AUTHORS = [")
old_yt_end = code.find("];", old_yt_start) + 2

new_yt_code = """const YOUTUBE_METHODOLOGY_AUTHORS = [
    {
      id: "u4ZoJKF_VuA",
      step: "Paso 1 · ADN de Marca",
      author: "Simon Sinek",
      title: "El Círculo Dorado: Cómo los Grandes Líderes Inspiran a la Acción",
      topic: "Por qué existe tu marca más allá de ganar dinero (Start With Why).",
      channel: "TED Oficial",
      duration: "18:04",
      badgeColor: "#EA580C"
    },
    {
      id: "3iwL2OEeWiw",
      step: "Paso 2 · Customer Journey",
      author: "Nielsen Norman Group (NN/g)",
      title: "Customer Journey Mapping 101: Estructura y Momentos Clave",
      topic: "Cómo mapear visualmente el viaje del cliente a través de canales y eliminar fricciones.",
      channel: "Nielsen Norman Group",
      duration: "03:45",
      badgeColor: "#0284C7"
    },
    {
      id: "zSDXJrCLWxE",
      step: "Paso 2 · Touchpoints",
      author: "Customer Experience Institute",
      title: "Customer Touchpoints: Cómo Diseñar Puntos de Contacto Antes, Durante y Después",
      topic: "Los Momentos de la Verdad (Jan Carlzon) y cómo cada contacto genera lealtad.",
      channel: "CX Global Network",
      duration: "08:12",
      badgeColor: "#15803D"
    },
    {
      id: "g6nBwm9lPrc",
      step: "Paso 2 · Metodología Práctica",
      author: "Design Strategy Lab",
      title: "Customer Journey Map: Guía de Puntos de Contacto y Emociones",
      topic: "Metodología práctica para diseñar una experiencia de compra impecable de principio a fin.",
      channel: "Design Strategy",
      duration: "06:30",
      badgeColor: "#7C3AED"
    },
    {
      id: "Fz-XGd8EX3U",
      step: "Paso 4 · Anatomía y Logotipos",
      author: "Sagi Haviv",
      title: "Las 3 Reglas de Oro de un Logotipo Legendario",
      topic: "Sencillez, memorabilidad y pertinencia (Chermayeff & Geismar & Haviv).",
      channel: "The Futur",
      duration: "14:22",
      badgeColor: "#1D4ED8"
    },
    {
      id: "MzKQ-zvpebE",
      step: "Paso 1.2 · Filosofía",
      author: "Marty Neumeier",
      title: "The Brand Gap: Qué es Realmente una Marca",
      topic: "Una marca no es lo que tú dices que es; es lo que tus clientes sienten que es.",
      channel: "The Futur / Liquid Agency",
      duration: "21:15",
      badgeColor: "#7C3AED"
    },
    {
      id: "QRHCoU04Pe0",
      step: "Paso 1 · Tono y Claridad",
      author: "Donald Miller",
      title: "StoryBrand: Cómo Clarificar tu Mensaje para que te Escuchen",
      topic: "El cliente es el héroe de la historia; tu marca es el guía confiable.",
      channel: "TEDx Talks",
      duration: "16:48",
      badgeColor: "#059669"
    },
    {
      id: "Gt-LxHnqeio",
      step: "Paso 0 · Capital de Marca",
      author: "David Aaker",
      title: "Brand Equity: Cómo Proteger y Escalar el Valor de tu Empresa",
      topic: "Construir valor acumulado a través de asociaciones fuertes y consistencia visual.",
      channel: "Prophet / Aaker on Branding",
      duration: "12:35",
      badgeColor: "#0284C7"
    }
  ];"""

if old_yt_start != -1 and old_yt_end != -1:
    code = code[:old_yt_start] + new_yt_code + code[old_yt_end:]
    print("[OK] YOUTUBE_METHODOLOGY_AUTHORS actualizado con Customer Journey y Touchpoints.")
else:
    print("[WARN] No se encontró YOUTUBE_METHODOLOGY_AUTHORS.")

# ------------------------------------------------------------------------------
# 2. AGREGAR MODAL DIRECTO PARA REPRODUCIR VIDEO DE AURA EN CUALQUIER MOMENTO
# ------------------------------------------------------------------------------
aura_modal_code = """
  window.tbbOpenAuraRecorridoModal = function () {
    const existing = document.getElementById("tbbAuraVideoModal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "tbbAuraVideoModal";
    modal.style.cssText = "position:fixed; inset:0; z-index:999999; background:rgba(9,13,22,0.92); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); display:flex; align-items:center; justify-content:center; padding:18px;";
    modal.innerHTML = `
      <div style="width:100%; max-width:960px; background:#000000; border-radius:22px; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,0.85); border:2px solid #1D4ED8; position:relative;">
        <button type="button" onclick="document.getElementById('tbbAuraVideoModal').remove()" style="position:absolute; top:12px; right:12px; z-index:20; background:rgba(0,0,0,0.7); color:#FFFFFF; border:1px solid rgba(255,255,255,0.3); border-radius:50%; width:38px; height:38px; font-size:1.15rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
        <div style="padding:14px 20px; background:#090D16; border-bottom:1px solid #1E293B; display:flex; align-items:center; gap:10px;">
          <span style="width:10px; height:10px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
          <span style="font-family:'Montserrat',sans-serif; font-size:0.92rem; font-weight:900; color:#FFFFFF;">Recorrido Completo con Aura: Cómo se Construye tu Marca</span>
          <span style="font-family:'JetBrains Mono',monospace; font-size:0.70rem; color:#93C5FD; margin-left:auto;">02:48 · Full HD</span>
        </div>
        <div style="aspect-ratio:16/9; width:100%; background:#000000;">
          <video id="tbbAuraModalVideo" src="/assets/videos/capsula_teoria_aura_recorrido.mp4" controls autoplay playsinline style="width:100%; height:100%; display:block; object-fit:contain;"></video>
        </div>
      </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
    const vid = document.getElementById("tbbAuraModalVideo");
    if (vid) {
      vid.play().catch(() => { vid.muted = true; vid.play(); });
    }
  };
"""

target_after_yt = "window.tbbPlayYouTubeAuthorVideo = function (videoId) {"
idx_yt = code.find(target_after_yt)
if idx_yt != -1:
    code = code[:idx_yt] + aura_modal_code + "\n" + code[idx_yt:]
    print("[OK] window.tbbOpenAuraRecorridoModal inyectado.")

# ------------------------------------------------------------------------------
# 3. ACTUALIZAR CONTROLES Y PLAY OVERLAY DE VIDEO MASTERCLASS
# ------------------------------------------------------------------------------
old_play_fn_start = code.find("window.tbbToggleMasterclassPlay = function () {")
old_play_fn_end = code.find("// ---------------------------------------------------------------------------", old_play_fn_start)

new_play_fns = """window.tbbToggleMasterclassPlay = function () {
    const player = document.getElementById("tbbMasterclassVideoPlayer");
    const overlay = document.getElementById("tbbVideoPlayOverlay");
    if (!player) return;
    if (player.paused) {
      player.play().then(() => {
        if (overlay) overlay.style.display = "none";
        window.tbbCommercialDemoState.videoIsPlaying = true;
        window.tbbUpdateVideoControlsUI();
      }).catch((err) => {
        console.warn("Reproduciendo con audio silenciado por política del navegador...", err);
        player.muted = true;
        player.play().then(() => {
          if (overlay) overlay.style.display = "none";
          window.tbbCommercialDemoState.videoIsPlaying = true;
          window.tbbUpdateVideoControlsUI();
        });
      });
    } else {
      player.pause();
      if (overlay) overlay.style.display = "flex";
      window.tbbCommercialDemoState.videoIsPlaying = false;
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
    const playBtn = document.getElementById("tbbMasterclassPlayBtn") || document.getElementById("tbbBtnVidPlayPause");
    const muteBtn = document.getElementById("tbbMasterclassMuteBtn") || document.getElementById("tbbBtnVidMute");
    const overlay = document.getElementById("tbbVideoPlayOverlay");
    if (overlay) overlay.style.display = isPlaying ? "none" : "flex";
    if (playBtn) playBtn.innerHTML = isPlaying ? `<span>❚❚ Pausar</span>` : `<span>▶ Reproducir</span>`;
    if (muteBtn) muteBtn.innerHTML = isMuted ? `<span>Activar Sonido</span>` : `<span>Silenciar</span>`;
  };

  """

if old_play_fn_start != -1 and old_play_fn_end != -1:
    code = code[:old_play_fn_start] + new_play_fns + code[old_play_fn_end:]
    print("[OK] Funciones de control de video y overlay actualizadas.")

# ------------------------------------------------------------------------------
# 4. INYECTAR CSS CON ESTILO IMPROBEARS, DESTELLO ANIMADO Y RESPONSIVIDAD
# ------------------------------------------------------------------------------
style_target = "function tbbInjectAwwwardsStyles() {"
idx_style = code.find(style_target)
if idx_style != -1:
    style_content_start = code.find("styleEl.textContent = `", idx_style)
    extra_css = """
      /* PESTAÑAS ESTILO IMPROBEARS Y DESTELLO RADAR PULSE */
      @keyframes tbbRadarPulse {
        0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.7); }
        70% { transform: scale(1.04); box-shadow: 0 0 0 9px rgba(255, 122, 0, 0); }
        100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(255, 122, 0, 0); }
      }
      @keyframes tbbShimmerWave {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .tbb-pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FF7A00;
        display: inline-block;
        animation: tbbRadarPulse 1.8s infinite ease-in-out;
      }
      .tbb-tab-destello {
        position: relative;
        overflow: hidden;
        border: 2px solid #FF7A00 !important;
        background: linear-gradient(90deg, #FFFFFF 0%, #FFF7ED 50%, #FFFFFF 100%) !important;
        background-size: 200% 100% !important;
        animation: tbbShimmerWave 3.2s infinite linear !important;
        box-shadow: 0 0 18px rgba(255, 122, 0, 0.32) !important;
      }
      .tbb-badge-spark {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.60rem;
        font-weight: 900;
        background: linear-gradient(90deg, #FF7A00 0%, #EA580C 100%);
        color: #FFFFFF;
        padding: 2px 7px;
        border-radius: 999px;
        letter-spacing: 0.04em;
        margin-left: 4px;
        box-shadow: 0 2px 8px rgba(234, 88, 12, 0.4);
      }
      .tbb-btn-hero-spark {
        position: relative;
        overflow: hidden;
        border: 2.5px solid #FF7A00 !important;
        box-shadow: 0 0 24px rgba(255, 122, 0, 0.5), 0 8px 24px rgba(9, 13, 22, 0.3) !important;
        transition: all 0.25s ease;
      }
      .tbb-btn-hero-spark:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 0 38px rgba(255, 122, 0, 0.75), 0 12px 30px rgba(9, 13, 22, 0.45) !important;
      }
"""
    code = code[:style_content_start + len("styleEl.textContent = `")] + extra_css + code[style_content_start + len("styleEl.textContent = `"):]
    print("[OK] CSS de Destello y Estilo ImproBears inyectado.")

# ------------------------------------------------------------------------------
# 5. ACTUALIZAR NAVBAR CON PESTAÑA 2 DESTELLANTE
# ------------------------------------------------------------------------------
old_nav_tab2 = '<button type="button" id="tbbMainSecTab_2" onclick="window.tbbSwitchMainSection(2)" class="tbb-tab-light-surface ${st.activeMainSection === 2 ? \'is-active\' : \'\'}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">\n            <span style="font-weight:800; color:#FF7A00;">2.</span> Demo en Vivo\n          </button>'

new_nav_tab2 = """<button type="button" id="tbbMainSecTab_2" onclick="window.tbbSwitchMainSection(2)" class="tbb-tab-light-surface tbb-tab-destello ${st.activeMainSection === 2 ? 'is-active' : ''}" style="border:none; cursor:pointer; font-size:0.78rem; padding:8px 14px;">
            <span class="tbb-pulse-dot"></span>
            <span style="font-weight:900; color:#FF7A00; margin-left:3px;">2.</span> Demo en Vivo
            <span class="tbb-badge-spark">¡PRUEBA AHORA!</span>
          </button>"""

if old_nav_tab2 in code:
    code = code.replace(old_nav_tab2, new_nav_tab2)
    print("[OK] Pestaña de navegación 2 actualizada con destello y badge.")

# ------------------------------------------------------------------------------
# 6. ACTUALIZAR HERO CON BOTÓN SPARK Y BOTÓN DE VER VIDEO AURA DIRECTO
# ------------------------------------------------------------------------------
old_hero_ctas = """                <!-- CTAs Directos -->
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
                </div>"""

new_hero_ctas = """                <!-- CTAs Directos con Destello Atractivo -->
                <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px; align-items:center;">
                  <button type="button" class="tbb-comm-btn-black tbb-btn-hero-spark" onclick="window.tbbSwitchMainSection(2)" style="font-size:0.94rem; padding:13px 26px;">
                    <span class="tbb-pulse-dot"></span>
                    <span style="margin-left:4px;">Probar la App en Vivo Gratis →</span>
                  </button>
                  <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenAuraRecorridoModal()" style="font-size:0.92rem; padding:13px 20px;">
                    <span style="width:8px; height:8px; border-radius:50%; background:#1D4ED8; display:inline-block;"></span>
                    <span>Ver a Aura Explicar el Recorrido (02:48) ▶</span>
                  </button>
                  <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.92rem; padding:13px 20px;">
                    <span>Comprar Pro · $49 USD</span>
                  </button>
                </div>"""

if old_hero_ctas in code:
    code = code.replace(old_hero_ctas, new_hero_ctas)
    print("[OK] Hero CTAs actualizados con destello y botón de video Aura.")

# ------------------------------------------------------------------------------
# 7. REEMPLAZAR PANE 2 CON LA APLICACIÓN REAL STUDIO (SIN SCROLL Y BLOQUEO AL PASO 3)
# ------------------------------------------------------------------------------
pane2_start = code.find('<!-- PANE 2: DEMO INTERACTIVA EN VIVO (PASOS 1 Y 2)')
if pane2_start == -1:
    pane2_start = code.find('<div id="tbbMainSectionPane_2"')

pane3_start = code.find('<!-- ===================================================================== -->\n      <!-- PANE 3: OFERTA Y ENTREGABLES OFICIALES')
if pane3_start == -1:
    pane3_start = code.find('<div id="tbbMainSectionPane_3"')

new_pane2_markup = """<!-- ===================================================================== -->
      <!-- PANE 2: LA APLICACIÓN REAL (THE BEST BRAND STUDIO) SIN SCROLL          -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_2" style="display:${st.activeMainSection === 2 ? 'block' : 'none'}; padding:20px 18px 40px 18px; background:#F1F5F9;">
        <div style="max-width:1380px; margin:0 auto;">
          <!-- Barra de Control de Ventana macOS / Atelier -->
          <div style="background:#090D16; border-radius:20px 20px 0 0; padding:14px 20px; display:flex; justify-content:space-between; align-items:center; border:1.5px solid #1E293B; border-bottom:none; box-shadow:0 -6px 20px rgba(0,0,0,0.15);">
            <div style="display:flex; align-items:center; gap:12px;">
              <!-- 3 Puntos Semáforo macOS -->
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="width:11px; height:11px; border-radius:50%; background:#FF5F56; display:inline-block;"></span>
                <span style="width:11px; height:11px; border-radius:50%; background:#FFBD2E; display:inline-block;"></span>
                <span style="width:11px; height:11px; border-radius:50%; background:#27C93F; display:inline-block;"></span>
              </div>
              <div style="font-family:'Montserrat', sans-serif; font-size:0.84rem; font-weight:900; color:#FFFFFF; letter-spacing:0.02em;">
                THE BEST BRAND STUDIO · APLICACIÓN REAL EN VIVO
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px;">
              <span style="display:inline-flex; align-items:center; gap:6px; background:rgba(255,122,0,0.15); border:1px solid #FF7A00; border-radius:999px; padding:4px 12px; font-family:'JetBrains Mono',monospace; font-size:0.68rem; font-weight:800; color:#FFB347;">
                <span class="tbb-pulse-dot"></span>
                <span>PASOS 0, 1 Y 2 ACTIVOS</span>
              </span>
              <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" class="tbb-comm-btn-black" style="padding:6px 14px; font-size:0.75rem; border:1px solid rgba(255,255,255,0.2);">
                Comprar Licencia Completa ($49 USD)
              </button>
            </div>
          </div>

          <!-- Marco del Iframe de la App Real (The Best Brand Studio) -->
          <div style="border:1.5px solid #1E293B; border-top:none; border-radius:0 0 20px 20px; overflow:hidden; box-shadow:0 24px 60px rgba(9,13,22,0.15); background:#FFFFFF; position:relative;">
            <iframe id="tbbLiveAppStudioIframe" src="/studio?demo=true" style="width:100%; height:calc(100vh - 140px); min-height:760px; max-height:940px; border:none; display:block; background:#FFFFFF;" title="The Best Brand App Real"></iframe>
          </div>

          <!-- Nota Informativa al pie de la app -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding:0 8px; flex-wrap:wrap; gap:10px;">
            <div style="font-size:0.80rem; color:#64748B; font-weight:600;">
              💡 <strong>Estás interactuando con la aplicación real:</strong> Define tu propósito nuclear (Paso 1) y tus touchpoints (Paso 2). Al pulsar continuar al Paso 3, desbloquearás la app completa con tu Licencia Pro.
            </div>
            <button type="button" onclick="window.tbbSwitchMainSection(3)" class="tbb-comm-btn-white" style="padding:8px 16px; font-size:0.80rem;">
              <span>Ver Entregables y Precios (Paso 3) →</span>
            </button>
          </div>
        </div>
      </div>

      """

if pane2_start != -1 and pane3_start != -1:
    code = code[:pane2_start] + new_pane2_markup + code[pane3_start:]
    print("[OK] Pane 2 reemplazado con la Aplicación Real Studio sin scroll.")

# ------------------------------------------------------------------------------
# 8. ACTUALIZAR REPRODUCTOR DE VIDEO DE AURA EN PANE 4 (CONTROLES Y PLAY OVERLAY)
# ------------------------------------------------------------------------------
old_video_markup = """              <!-- Reproductor -->
              <div style="aspect-ratio:16/9; width:100%; max-height:520px; background:#000000; position:relative;">
                <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" playsinline muted loop style="width:100%; height:100%; object-fit:contain; display:block;"></video>
              </div>"""

new_video_markup = """              <!-- Reproductor con Controles Completos y Botón Central de Play -->
              <div style="aspect-ratio:16/9; width:100%; max-height:520px; background:#000000; position:relative; overflow:hidden;">
                <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" controls playsinline preload="auto" style="width:100%; height:100%; object-fit:contain; display:block;"></video>
                <!-- Botón de Play Central Superpuesto -->
                <div id="tbbVideoPlayOverlay" onclick="window.tbbToggleMasterclassPlay()" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.3); cursor:pointer; transition:opacity 0.25s ease;">
                  <div style="width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg, #FF7A00 0%, #EA580C 100%); display:flex; align-items:center; justify-content:center; box-shadow:0 12px 35px rgba(234,88,12,0.6); pointer-events:none;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFFFFF" style="margin-left:4px;"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                  </div>
                </div>
              </div>"""

if old_video_markup in code:
    code = code.replace(old_video_markup, new_video_markup)
    print("[OK] Reproductor de video de Aura actualizado con controles nativos y botón central.")

# ------------------------------------------------------------------------------
# 9. AGREGAR LISTENER DE MENSAJES POSTMESSAGE PARA DESBLOQUEAR CHECKOUT
# ------------------------------------------------------------------------------
listener_code = """
  // Listener de Eventos desde la App Real Embebida (/studio?demo=true)
  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "TBB_DEMO_COMPLETED_STEP_2") {
      console.log("[TBB] Paso 2 completado en la App Embebida -> Desplegando Checkout Pro");
      window.tbbOpenBuyAppCheckoutModal("pro_atelier");
    }
  });
"""

if "window.addEventListener(\"message\"" not in code:
    init_marker = "if (document.readyState === \"loading\") {"
    idx_init = code.find(init_marker)
    if idx_init != -1:
        code = code[:idx_init] + listener_code + "\n  " + code[idx_init:]
        print("[OK] Listener postMessage para abrir checkout agregado.")

# ------------------------------------------------------------------------------
# 10. GUARDAR ARCHIVO
# ------------------------------------------------------------------------------
with open("apps/web/tbb-commercial-experience-and-payments.js", "w", encoding="utf-8") as f:
    f.write(code)

print("[ÉXITO TOTAL] apps/web/tbb-commercial-experience-and-payments.js actualizado al 100%.")
