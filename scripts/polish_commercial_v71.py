import re

def update_commercial():
    path = "apps/web/tbb-commercial-experience-and-payments.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Eliminar el banner superior dentro de la demo
    banner_to_remove = """          <!-- Banner Directo al Estudio Completo para no atrapar al usuario en la demo -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; background:#EFF6FF; border:1.5px solid #93C5FD; border-left:4px solid #FF7A00; border-radius:14px; padding:12px 18px; box-shadow:0 4px 14px rgba(13,37,64,0.05);">
            <div style="font-size:0.84rem; font-weight:700; color:#0D2540;">
              <span style="color:#FF7A00; font-size:0.95rem;">●</span> <strong>Demostración de Pasos 1 y 2</strong>. Para vivir los 7 pasos completos con los 15 autores y tu Brandbook de 30 Hojas:
            </div>
            <a href="/studio" style="display:inline-flex; align-items:center; gap:6px; padding:8px 18px; background:#0D2540; color:#FFFFFF; border:1px solid #4C9DE6; border-bottom:2.5px solid #FF7A00; border-radius:999px; font-size:0.78rem; font-weight:800; text-decoration:none; white-space:nowrap; box-shadow:0 3px 10px rgba(13,37,64,0.3);">
              <span style="color:#FF7A00;">●</span> <span>Abrir Estudio Completo (App) ↗</span>
            </a>
          </div>"""
    
    if banner_to_remove in content:
        content = content.replace(banner_to_remove, "          <!-- Demo en Vivo Aislada e Inmersiva (Cero ruido publicitario) -->")
        print("✓ Banner de compra eliminado de la demo")
    else:
        print("! Banner no encontrado exactamente, buscando regex...")
        content = re.sub(
            r'<!-- Banner Directo al Estudio Completo.*?<\/div>\s*<\/div>',
            '<!-- Demo en Vivo Aislada e Inmersiva -->',
            content,
            flags=re.DOTALL
        )
        print("✓ Banner eliminado por regex")

    # 2. Eliminar el enlace de bypass en el Paso 2 de la demo
    bypass_link = """                  <a href="/studio" style="text-align:center; font-size:0.80rem; font-weight:800; color:#426EAE; text-decoration:none; padding:4px;">
                    O abrir el Estudio Completo directamente (Pasos 0 al 6) ↗
                  </a>"""
    if bypass_link in content:
        content = content.replace(bypass_link, "")
        print("✓ Enlace de bypass eliminado de Paso 2")

    # 3. Asegurar regla de aislamiento de Demo en CSS
    css_isolation = """
      /* REGLA DE AISLAMIENTO ESTRICTO EN SECCIÓN DEMO: Cero ruido de compra */
      body.tbb-is-demo-section #tbbAlwaysOnBuyFloatingBar,
      body.tbb-is-demo-section .tbb-comm-btn-black.tbb-desktop-only-ctrl,
      body.tbb-is-demo-section #tbbBtnTopBuyAppNow,
      body.tbb-is-demo-section .tbb-sec-tab-direct-studio,
      body.tbb-is-demo-section .tbb-comm-btn-studio-header {
        display: none !important;
      }
    """
    if "tbb-is-demo-section" not in content:
        content = content.replace("/* Modales */", css_isolation + "\n      /* Modales */")
        print("✓ CSS de aislamiento de demo inyectado")
    else:
        # Asegurar que esté completo
        content = re.sub(r'body\.tbb-is-demo-section.*?\{[^}]*\}', css_isolation.strip(), content, flags=re.DOTALL)
        print("✓ CSS de aislamiento actualizado")

    # 4. Aura video: sincronía de reproducción y eventos nativos
    old_video_modal = """  window.tbbOpenAuraRecorridoModal = function () {
    window.tbbSwitchMainSection(4);
    setTimeout(() => {
      window.tbbSelectMasterclassChapter(0);
      window.tbbToggleMasterclassPlay();
    }, 150);
  };"""

    new_video_modal = """  window.tbbOpenAuraRecorridoModal = function () {
    window.tbbSwitchMainSection(4);
    const videoSec = document.getElementById("tbbCommVideoSection");
    if (videoSec) {
      videoSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.tbbSelectMasterclassChapter(0);
    window.tbbToggleMasterclassPlay();
  };"""
    if old_video_modal in content:
        content = content.replace(old_video_modal, new_video_modal)
        print("✓ tbbOpenAuraRecorridoModal actualizado sin setTimeout desacoplado")

    # 5. Wire up video events in tbbSelectMasterclassChapter
    old_select_chapter = """    if (player) {
      player.src = capsule.url;
      player.muted = window.tbbCommercialDemoState.videoMuted;
      player.play().then(() => {
        window.tbbCommercialDemoState.videoIsPlaying = true;
        window.tbbUpdateVideoControlsUI();
      }).catch(() => {
        window.tbbCommercialDemoState.videoIsPlaying = false;
        window.tbbUpdateVideoControlsUI();
      });
    }"""

    new_select_chapter = """    if (player) {
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
    }"""

    if old_select_chapter in content:
        content = content.replace(old_select_chapter, new_select_chapter)
        print("✓ tbbSelectMasterclassChapter actualizado con eventos nativos")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("✓ Archivo tbb-commercial-experience-and-payments.js guardado con éxito.")

if __name__ == "__main__":
    update_commercial()
