#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reordenador y Finalizador Maestro V67 - The Best Brand
Organiza la página comercial exactamente en las 4 secciones solicitadas por el usuario:
- Pane 1: El Gancho (Hero Navy + Shaders + Titular + Matriz Comparativa + Autoridad)
- Pane 2: Demo en Vivo (Pasos 1 y 2 limpios, cero banners de compra, bloqueo en paso 3)
- Pane 3: Oferta y Entregables (Manual 30 Hojas + Entregables + Tabla de Precios $49 y $149)
- Pane 4: Videos y Libros (Video Aura 02:48 con poster + Autores YouTube + Libros Kindle/Apple)
"""

import subprocess
import sys

TARGET_JS = "apps/web/tbb-commercial-experience-and-payments.js"

with open(TARGET_JS, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Extraer los bloques de cada sección
def get_block(start_str, end_str):
    s = text.find(start_str)
    if s == -1:
        raise ValueError(f"No se encontró inicio: {start_str[:40]}")
    e = text.find(end_str, s)
    if e == -1:
        raise ValueError(f"No se encontró fin: {end_str[:40]}")
    e += len(end_str)
    return text[s:e], s, e

hero_block, s_hero, e_hero = get_block('<section id="tbbCommHeroSection"', '</section>')
explorer_block, s_exp, e_exp = get_block('<section id="tbbCommPlateExplorerSection"', '</section>')
deliverables_block, s_del, e_del = get_block('<section id="tbbCommDeliverablesSection"', '</section>')
video_block, s_vid, e_vid = get_block('<section id="tbbCommVideoSection"', '</section>')
demo_block, s_demo, e_demo = get_block('<section id="tbbCommLiveDemoSection"', '</section>')
authority_block, s_auth, e_auth = get_block('<section id="tbbCommAuthoritySection"', '</section>')
pricing_block, s_prc, e_prc = get_block('<section id="tbbCommPricingSection"', '</section>')

print(f"Hero: {len(hero_block)} chars")
print(f"Explorer: {len(explorer_block)} chars")
print(f"Deliverables: {len(deliverables_block)} chars")
print(f"Video: {len(video_block)} chars")
print(f"Demo: {len(demo_block)} chars")
print(f"Authority: {len(authority_block)} chars")
print(f"Pricing: {len(pricing_block)} chars")

# 2. Perfeccionar el reproductor de video en video_block con poster y botón play Navy Blue
old_vid_player = """            <div style="aspect-ratio:16/9; width:100%; max-height:540px; background:#000000; position:relative;">
              <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" playsinline muted loop style="width:100%; height:100%; object-fit:contain; display:block;"></video>
            </div>"""

new_vid_player = """            <div style="aspect-ratio:16/9; width:100%; max-height:540px; background:#000000; position:relative;">
              <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" poster="${activeCapsule.poster || '/assets/videos/poster_aura_recorrido.jpg'}" playsinline webkit-playsinline preload="metadata" style="width:100%; height:100%; object-fit:contain; display:block;"></video>
              
              <!-- Botón de Reproducción Central Navy Blue (¡CERO NARANJA!) -->
              <div id="tbbVideoPlayOverlay" onclick="window.tbbToggleMasterclassPlay()" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(9,13,22,0.35); cursor:pointer;">
                <div style="width:78px; height:78px; border-radius:50%; background:#0D2540; border:2.5px solid #4C9DE6; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 32px rgba(13,37,64,0.6); transition:transform 0.2s ease;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" style="margin-left:3px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            </div>"""

if old_vid_player in video_block:
    video_block = video_block.replace(old_vid_player, new_vid_player)

# 3. Construir bloques complementarios de YouTube y Libros para la Sección 4
youtube_and_books_html = """
          <!-- VIDEOTECA DE YOUTUBE DE LOS AUTORES -->
          <div style="margin-top:44px; padding-top:32px; border-top:1.5px solid rgba(255,255,255,0.12);">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#4C9DE6; letter-spacing:0.06em;">
              LOS PILARES METODOLÓGICOS EN YOUTUBE
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
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#4C9DE6; letter-spacing:0.06em;">
                  BIBLIOTECA DEL FUNDADOR · LECTURAS ESENCIALES
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
"""

# Insertar youtube_and_books_html dentro de video_block antes de cerrar el contenedor
video_block_enriched = video_block.replace("        </div>\n      </section>", youtube_and_books_html + "        </div>\n      </section>")

# 4. Ticker Marquee del Hero
marquee_html = """
      <!-- TICKER MARQUEE CONTINUO DE INGENIERÍA DE MARCA -->
      <div style="background:#090D16; border-top:2px solid #1D4ED8; border-bottom:3px solid #0D2540; padding:10px 0; overflow:hidden; white-space:nowrap;">
        <div style="display:inline-block; animation:tbbMarquee 28s linear infinite; font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:800; color:#FFFFFF; letter-spacing:0.12em;">
          THE BEST BRAND · YOUR BRAND, NOW!!! · MANUAL DE MARCA DE 30 HOJAS EN CURVAS · ARQUITECTURA MONOLÍTICA SIN SUBMARCAS FORZADAS · CÍRCULO DORADO 100% CIRCULAR · LA EMPRESA COMO PERSONA · CHECKOUT APPLE PAY & GOOGLE PAY · DEL CAOS AL SISTEMA ·
          THE BEST BRAND · YOUR BRAND, NOW!!! · MANUAL DE MARCA DE 30 HOJAS EN CURVAS · ARQUITECTURA MONOLÍTICA SIN SUBMARCAS FORZADAS · CÍRCULO DORADO 100% CIRCULAR · LA EMPRESA COMO PERSONA · CHECKOUT APPLE PAY & GOOGLE PAY · DEL CAOS AL SISTEMA ·
        </div>
      </div>
"""

# 5. Ensamblar los 4 Panes en el orden exacto:
# Pane 1: El Gancho
# Pane 2: Demo en Vivo
# Pane 3: Oferta y Entregables
# Pane 4: Videos y Libros

panes_assembled = f"""
      <!-- ===================================================================== -->
      <!-- SECCIÓN 1: EL GANCHO (HERO NAVY + WEBGL SHADER + 60FPS NODES + MATRIZ)-->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_1" style="display:${{(st.activeMainSection === 1 || !st.activeMainSection) ? 'block' : 'none'}};">
        {hero_block}
        {marquee_html}
        <!-- Matriz Comparativa de 3 Columnas (Agencias vs The Best Brand vs Apps) -->
        <div style="max-width:1180px; margin:0 auto; padding:0 24px 48px 24px;">
          ${{window.tbbBuildComparisonMatrixHTML()}}
        </div>
        {authority_block}
      </div>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 2: DEMO EN VIVO (PASOS 0, 1 Y 2 · SIN BANNERS NI BOTONES COMPRA)-->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_2" style="display:${{st.activeMainSection === 2 ? 'block' : 'none'}};">
        {demo_block}
      </div>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 3: OFERTA Y ENTREGABLES (MANUAL DE 30 HOJAS, BÓVEDA Y PRECIOS)-->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_3" style="display:${{st.activeMainSection === 3 ? 'block' : 'none'}};">
        {explorer_block}
        {deliverables_block}
        {pricing_block}
      </div>

      <!-- ===================================================================== -->
      <!-- SECCIÓN 4: VIDEOS Y LIBROS (AURA 02:48 + AUTORES YOUTUBE + LIBROS)    -->
      <!-- ===================================================================== -->
      <div id="tbbMainSectionPane_4" style="display:${{st.activeMainSection === 4 ? 'block' : 'none'}};">
        {video_block_enriched}
      </div>
"""

# Reemplazar desde el inicio de tbbCommHeroSection hasta el final de tbbCommPricingSection
s_all = s_hero
e_all = e_prc

new_text = text[:s_all] + panes_assembled.strip() + text[e_all:]

# 6. Mejorar tbbToggleMasterclassPlay con manejo robusto de promesas para iOS Safari
robust_toggle_play = """  window.tbbToggleMasterclassPlay = function () {
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
  };"""

old_toggle_play_marker = """  window.tbbToggleMasterclassPlay = function () {
    const player = document.getElementById("tbbMasterclassVideoPlayer");
    if (!player) return;
    if (player.paused) {
      player.play();
      window.tbbCommercialDemoState.videoIsPlaying = true;
    } else {
      player.pause();
      window.tbbCommercialDemoState.videoIsPlaying = false;
    }
    window.tbbUpdateVideoControlsUI();
  };"""

if old_toggle_play_marker in new_text:
    new_text = new_text.replace(old_toggle_play_marker, robust_toggle_play)

# Guardar y validar sintaxis
with open(TARGET_JS, "w", encoding="utf-8") as f:
    f.write(new_text)

print(f"Archivo reensamblado con éxito: {len(new_text)} caracteres, {len(new_text.splitlines())} líneas.")
res = subprocess.run(["node", "-c", TARGET_JS], capture_output=True, text=True)
if res.returncode != 0:
    print("ERROR SINTÁCTICO:")
    print(res.stderr)
    sys.exit(1)
else:
    print(">>> ÉXITO: SINTAXIS 100% VÁLIDA. LOS 4 PANES ESTÁN PERFECTAMENTE EN ORDEN Y COMPILADOS. <<<")
