#!/usr/bin/env python3
import re

print("[START] Applying complete Pure Light Lienzo Claro & Zero Jargon refactor...")

# ==============================================================================
# 1. Update apps/web/tbb-commercial-experience-and-payments.js
# ==============================================================================
with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    js_content = f.read()

# A. Video section light transformation
old_video_sec_pattern = re.compile(
    r'<section id="tbbCommVideoSection" style="padding:64px 24px; background:#090D16; color:#FFFFFF; border-bottom:2px solid #1D4ED8;">[\s\S]*?</section>',
    re.MULTILINE
)

new_video_sec = """<section id="tbbCommVideoSection" style="padding:68px 24px; background:#F8FAFC; color:#090D16; border-bottom:1px solid #E2E8F0;">
        <div style="max-width:1160px; margin:0 auto; display:flex; flex-direction:column; gap:24px;">
          <div class="tbb-apple-reveal" style="display:flex; justify-content:space-between; align-items:flex-end; gap:16px; flex-wrap:wrap;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8; letter-spacing:0.06em;">
                ${t("videoSectionTag")}
              </div>
              <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.35rem); font-weight:900; color:#090D16; margin:6px 0;">
                ${t("videoSectionTitle")}
              </h2>
              <p style="font-size:0.94rem; font-weight:500; color:#475569; margin:0; max-width:760px;">
                ${t("videoSectionSub")}
              </p>
            </div>
            <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:10px 20px; font-size:0.84rem;">
              <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
              <span>${t("buyNowSticky")}</span>
            </button>
          </div>

          <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:6px;">
            ${VIDEO_CAPSULES.map((c, idx) => `
              <button type="button" id="tbbVidTab_${idx}" class="tbb-tab-light-surface ${idx === st.activeVideoStep ? 'is-active' : ''}" onclick="window.tbbSelectMasterclassChapter(${idx})" style="flex-shrink:0; font-size:0.78rem; padding:9px 14px;">
                <span>Capítulo ${c.step} · ${c.title.split(':')[0]}</span>
              </button>
            `).join("")}
          </div>

          <div class="tbb-apple-reveal" style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:24px; overflow:hidden; box-shadow:0 18px 45px rgba(9,13,22,0.07); position:relative;">
            <div style="aspect-ratio:16/9; width:100%; max-height:540px; background:#000000; position:relative;">
              <video id="tbbMasterclassVideoPlayer" src="${activeCapsule.url}" playsinline muted loop style="width:100%; height:100%; object-fit:contain; display:block;"></video>
            </div>

            <div style="background:#FFFFFF; padding:18px 24px; display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; border-top:1px solid #E2E8F0;">
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

              <div style="display:flex; gap:10px; flex-shrink:0;">
                <button type="button" id="tbbBtnVidPlayPause" class="tbb-comm-btn-black" onclick="window.tbbToggleMasterclassPlay()" style="padding:10px 18px; font-size:0.84rem;">
                  <span>▶ ${t("videoPlayBtn")}</span>
                </button>
                <button type="button" id="tbbBtnVidMute" class="tbb-comm-btn-white" onclick="window.tbbToggleMasterclassMute()" style="padding:10px 14px; font-size:0.82rem;">
                  <span>Activar Audio (${t("videoUnmuteBtn")})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>"""

if old_video_sec_pattern.search(js_content):
    js_content = old_video_sec_pattern.sub(new_video_sec, js_content)
    print("  [OK] Replaced Video section with pure Lienzo Claro Apple design")
else:
    print("  [WARN] Video section pattern did not match")

# B. Authority section light transformation
old_auth_sec_pattern = re.compile(
    r'<section id="tbbCommAuthoritySection" style="padding:64px 24px; background:#090D16; color:#FFFFFF; border-bottom:2px solid #1D4ED8;">[\s\S]*?</section>',
    re.MULTILINE
)

new_auth_sec = """<section id="tbbCommAuthoritySection" style="padding:68px 24px; background:#FFFFFF; color:#090D16; border-bottom:1px solid #E2E8F0;">
        <div style="max-width:1160px; margin:0 auto;" class="tbb-comm-grid-2">
          <div class="tbb-apple-reveal" style="position:relative; border-radius:24px; overflow:hidden; border:1px solid #CBD5E1; box-shadow:0 18px 45px rgba(9,13,22,0.07);">
            <img src="/assets/improbears/foto-jb-oso-hero.png" alt="Jorge Benítez El Oso · ImproBears" style="width:100%; height:auto; display:block; object-fit:cover;" />
            <div style="position:absolute; bottom:14px; left:14px; right:14px; background:rgba(255,255,255,0.92); backdrop-filter:blur(12px); border:1px solid rgba(226,232,240,0.9); border-radius:14px; padding:12px 16px;">
              <div style="font-family:'Montserrat', sans-serif; font-size:0.98rem; font-weight:900; color:#090D16;">Jorge Benítez «El Oso»</div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#FF7A00;">FUNDADOR DE IMPROBEARS & SUITE THE BEST</div>
            </div>
          </div>

          <div class="tbb-apple-reveal" style="display:flex; flex-direction:column; gap:16px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8; letter-spacing:0.06em;">
              ${t("authorityTag")}
            </div>
            <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.8rem, 3.4vw, 2.4rem); font-weight:900; color:#090D16; margin:0; line-height:1.15;">
              ${t("authorityTitle")}
            </h2>
            <p style="font-size:0.96rem; font-weight:500; color:#475569; line-height:1.65; margin:0;">
              ${t("authorityDesc")}
            </p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; padding-top:6px;">
              <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-left:3.5px solid #1D4ED8; border-radius:14px; padding:16px;">
                <div style="font-size:0.92rem; font-weight:900; color:#090D16;">Del Caos al Sistema</div>
                <div style="font-size:0.78rem; font-weight:500; color:#475569; margin-top:4px; line-height:1.45;">Metodología probada en empresas reales para conectar estrategia con operación diaria.</div>
              </div>
              <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-left:3.5px solid #FF7A00; border-radius:14px; padding:16px;">
                <div style="font-size:0.92rem; font-weight:900; color:#090D16;">30 Láminas en Curvas</div>
                <div style="font-size:0.78rem; font-weight:500; color:#475569; margin-top:4px; line-height:1.45;">Cero plantillas rígidas: arquitectura adaptativa lista para imprenta y registro oficial.</div>
              </div>
            </div>
          </div>
        </div>
      </section>"""

if old_auth_sec_pattern.search(js_content):
    js_content = old_auth_sec_pattern.sub(new_auth_sec, js_content)
    print("  [OK] Replaced Authority section with pure Lienzo Claro Apple design")
else:
    print("  [WARN] Authority section pattern did not match")

# C. Pricing section refinement (pure Apple minimalist cards, surgical accents)
old_pricing_sec_pattern = re.compile(
    r'<section id="tbbCommPricingSection"[\s\S]*?</section>',
    re.MULTILINE
)

new_pricing_sec = """<section id="tbbCommPricingSection" style="padding:68px 24px 90px 24px; background:#F8FAFC; border-bottom:1px solid #E2E8F0;">
        <div style="max-width:1080px; margin:0 auto; display:flex; flex-direction:column; gap:26px;">
          <div class="tbb-apple-reveal" style="text-align:center; max-width:760px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:#1D4ED8; letter-spacing:0.06em;">
              ${t("pricingTag")}
            </div>
            <h2 style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:clamp(1.85rem, 3.4vw, 2.45rem); font-weight:900; color:#090D16; margin:6px 0;">
              ${t("pricingTitle")}
            </h2>
            <p style="font-size:0.95rem; font-weight:500; color:#475569; margin:0;">
              ${t("pricingSub")}
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:22px;">
            <!-- Plan 1: Pro Empresario ($49 USD) -->
            <div data-tbb-tilt class="tbb-apple-reveal" style="background:#FFFFFF; border:2px solid #090D16; border-radius:24px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; gap:20px; box-shadow:0 18px 45px rgba(9,13,22,0.08);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="background:#090D16; color:#FFFFFF; border-radius:999px; padding:4px 12px; font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; display:inline-flex; align-items:center; gap:6px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                    LICENCIA RECOMENDADA
                  </span>
                  <span style="background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; border-radius:999px; padding:3px 11px; font-size:0.70rem; font-weight:800;">iOS · Android · Mac · Web</span>
                </div>
                <h3 style="font-size:1.45rem; font-weight:900; color:#090D16; margin:10px 0 4px 0;">${t("planSingleName")}</h3>
                <div style="font-size:2.55rem; font-weight:900; color:#090D16; line-height:1;">${t("planSinglePrice")}</div>
                <div style="font-size:0.80rem; font-weight:600; color:#64748B; margin-top:4px;">${t("planSinglePeriod")}</div>
                <ul style="margin:16px 0 0 0; padding-left:18px; font-size:0.86rem; font-weight:600; color:#334155; line-height:1.7;">
                  <li>Recorrido guiado de los Pasos 0 al 6 con Aura en vivo</li>
                  <li>Generación y evolución de logotipo en curvas SVG</li>
                  <li>Manual Oficial de 30 Láminas en Curvas (.PDF + .HTML interactivo)</li>
                  <li>Sincronización en la nube y 6 idiomas (ES, EN, FR, PT, DE, IT)</li>
                </ul>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'card')" style="width:100%; padding:13px; font-size:0.92rem;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                  <span>${t("buyNowSticky")}</span>
                </button>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'apple_pay')" style="background:#000000; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'google_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier', 'paypal')" style="background:#FFC439; color:#003087; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>
              </div>
            </div>

            <!-- Plan 2: Atelier Multi-Marca ($149 USD) -->
            <div data-tbb-tilt class="tbb-apple-reveal" style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:24px; padding:28px; display:flex; flex-direction:column; justify-content:space-between; gap:20px; box-shadow:0 10px 30px rgba(9,13,22,0.04);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="background:#F1F5F9; color:#475569; border-radius:999px; padding:4px 12px; font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800;">
                    AGENCIAS Y GRUPOS EMPRESARIALES
                  </span>
                  <span style="background:#FFF7ED; color:#EA580C; border:1px solid #FDBA74; border-radius:999px; padding:3px 11px; font-size:0.70rem; font-weight:800;">Multi-Marca</span>
                </div>
                <h3 style="font-size:1.45rem; font-weight:900; color:#090D16; margin:10px 0 4px 0;">${t("planAgencyName")}</h3>
                <div style="font-size:2.55rem; font-weight:900; color:#090D16; line-height:1;">${t("planAgencyPrice")}</div>
                <div style="font-size:0.80rem; font-weight:600; color:#64748B; margin-top:4px;">${t("planAgencyPeriod")}</div>
                <ul style="margin:16px 0 0 0; padding-left:18px; font-size:0.86rem; font-weight:600; color:#334155; line-height:1.7;">
                  <li>Marcas ilimitadas (Marca Única o Portafolio de Productos)</li>
                  <li>Paquete técnico completo para imprenta Offset CMYK y Pantone</li>
                  <li>Licencia comercial para entrega de manuales a clientes</li>
                  <li>Certificación técnica para registro de marca (IMPI / USPTO / EUIPO)</li>
                </ul>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'card')" style="width:100%; padding:13px; font-size:0.92rem;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#1D4ED8; display:inline-block;"></span>
                  <span>Comprar Licencia Atelier · $149 USD</span>
                </button>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'apple_pay')" style="background:#000000; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Apple Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'google_pay')" style="background:#090D16; color:#FFFFFF; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">Google Pay</button>
                  <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('agency_suite', 'paypal')" style="background:#FFC439; color:#003087; border:none; border-radius:10px; padding:10px; font-size:0.76rem; font-weight:800; cursor:pointer;">PayPal</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>"""

if old_pricing_sec_pattern.search(js_content):
    js_content = old_pricing_sec_pattern.sub(new_pricing_sec, js_content)
    print("  [OK] Replaced Pricing section with pure Lienzo Claro Apple design")
else:
    print("  [WARN] Pricing section pattern did not match")

# D. Live demo cards refinement (remove clunky 6px top borders, clean Apple borders)
js_content = js_content.replace(
    'style="background:#FFFFFF; border:2px solid #090D16; border-top:6px solid #1D4ED8; border-radius:22px;',
    'style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:22px;'
)
js_content = js_content.replace(
    'style="background:#FFFFFF; border:2px solid #CBD5E1; border-top:6px solid #F97316; border-radius:22px;',
    'style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:22px;'
)
js_content = js_content.replace(
    "border-bottom:3px solid ${isSel ? '#F97316' : '#94A3B8'};",
    ""
)

# E. Floating bar light mode update
old_float_bar_markup = """      floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:7px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
        <span style="font-size:0.72rem; font-weight:800; color:#E2E8F0; white-space:nowrap;">THE BEST BRAND 1.0</span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
        ${isLicensed ? t("licenseActiveBadge") : t("buyNowSticky")}
      </button>
    `;"""

new_float_bar_markup = """      floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
        <span style="font-size:0.76rem; font-weight:800; color:#090D16; white-space:nowrap;">THE BEST BRAND <span style="color:#64748B; font-weight:600;">1.0</span></span>
      </div>
      <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:7px 15px; font-size:0.78rem;">
        <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
        <span>${isLicensed ? t("licenseActiveBadge") : t("buyNowSticky")}</span>
      </button>
    `;"""

js_content = js_content.replace(old_float_bar_markup, new_float_bar_markup)

# F. Modal CSS sheets & Floating Bar CSS
old_modal_css = """.tbb-comm-portal-sheet {
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
      .tbb-checkout-sheet {
        max-width: 660px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        background: #FFFFFF;
        border: 2px solid #1D4ED8;
        border-top: 6px solid #F97316;
        border-radius: 24px;
        padding: 22px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.75);
        color: #090D16;
      }"""

new_modal_css = """.tbb-comm-portal-sheet {
        max-width: 1180px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        background: #FFFFFF;
        border: 1px solid #CBD5E1;
        border-radius: 24px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.22);
        color: #090D16;
      }
      .tbb-checkout-sheet {
        max-width: 660px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        background: #FFFFFF;
        border: 1px solid #CBD5E1;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 25px 60px rgba(9, 13, 22, 0.18);
        color: #090D16;
      }"""

js_content = js_content.replace(old_modal_css, new_modal_css)

# G. Floating bar CSS update to light glass
old_float_css = """      #tbbAlwaysOnBuyFloatingBar {
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
        border: 1.5px solid rgba(249, 115, 22, 0.75);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
        border-radius: 999px;
        transition: all 0.25s ease;
      }"""

new_float_css = """      #tbbAlwaysOnBuyFloatingBar {
        position: fixed;
        bottom: 14px;
        right: 18px;
        z-index: 990;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.94);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(226, 232, 240, 0.9);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        border-radius: 999px;
        transition: all 0.25s ease;
      }"""

js_content = js_content.replace(old_float_css, new_float_css)

# H. Active tab style in CSS: subtle, zero clunky neon borders
old_tab_active_css = """.tbb-tab-light-surface.is-active {
        background: #090D16 !important;
        border-color: #1D4ED8 !important;
        border-bottom: 4px solid #F97316 !important;
        color: #FFFFFF !important;
        box-shadow: 0 10px 24px rgba(9, 13, 22, 0.18);
      }"""

new_tab_active_css = """.tbb-tab-light-surface.is-active {
        background: #090D16 !important;
        border-color: #090D16 !important;
        color: #FFFFFF !important;
        box-shadow: 0 4px 14px rgba(9, 13, 22, 0.12);
      }"""

js_content = js_content.replace(old_tab_active_css, new_tab_active_css)

# I. Purge any remaining Monolítica in translations
js_content = js_content.replace("Arquitetura Monolítica limpa", "Sistema Oficial de Marca Única limpo")
js_content = js_content.replace("Architettura Monolitica pura", "Sistema Ufficiale a Marchio Unico")
js_content = js_content.replace("Marcas ilimitadas (Monolíticas y Sistemas Multimarcas)", "Marcas ilimitadas (Marca Única o Portafolio de Productos)")

with open("apps/web/tbb-commercial-experience-and-payments.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("[OK] apps/web/tbb-commercial-experience-and-payments.js fully updated.")


# ==============================================================================
# 2. Update apps/web/website.html footer to pure Lienzo Claro
# ==============================================================================
with open("apps/web/website.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Update footer CSS in website.html
old_footer_css = """    footer.tbb-comm-footer {
      background: #050811;
      color: #E2E8F0;
      border-top: 5px solid #F97316;
      padding: 48px 24px 116px 24px;
      text-align: center;
      font-size: 0.84rem;
    }"""

new_footer_css = """    footer.tbb-comm-footer {
      background: #F8FAFC;
      color: #64748B;
      border-top: 1px solid #CBD5E1;
      padding: 48px 24px 116px 24px;
      text-align: center;
      font-size: 0.84rem;
    }"""

html_content = html_content.replace(old_footer_css, new_footer_css)

# Update footer markup in website.html
old_footer_markup = """  <footer class="tbb-comm-footer">
    <div style="max-width:1120px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:12px;">
      <div style="font-family:var(--font-heading); font-weight:900; font-size:1.08rem; color:#FFFFFF; letter-spacing:0.02em;">
        THE BEST BRAND — <span style="color:#F97316;">YOUR BRAND, NOW!!!</span> · EDICIÓN OFICIAL 1.0
      </div>
      <div style="color:#94A3B8; font-weight:600; max-width:720px; line-height:1.55;">
        Plataforma para crear la identidad visual, el logotipo en vectores y el manual oficial de 30 láminas de tu empresa con inteligencia artificial y guía por voz de Aura.
      </div>
      <div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:center; margin-top:6px;">
        <a href="/studio" style="color:#93C5FD; font-weight:800; text-decoration:none;">Abrir Estudio Completo</a>
        <span style="color:#475569;">·</span>
        <a href="#tbbCommPlateExplorerSection" style="color:#E2E8F0; font-weight:800; text-decoration:none;">Explorador de 30 Láminas</a>
        <span style="color:#475569;">·</span>
        <a href="#tbbCommLiveDemoSection" style="color:#FDBA74; font-weight:800; text-decoration:none;">Demo en Vivo (Pasos 1 y 2)</a>
        <span style="color:#475569;">·</span>
        <a href="#tbbCommPricingSection" onclick="if(window.tbbOpenBuyAppCheckoutModal){window.tbbOpenBuyAppCheckoutModal('pro_atelier'); return false;}" style="color:#FFFFFF; font-weight:800; text-decoration:none;">Comprar la App (Tarjeta · Apple Pay · Google Pay · PayPal)</a>
      </div>
    </div>
  </footer>"""

new_footer_markup = """  <footer class="tbb-comm-footer">
    <div style="max-width:1120px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:12px;">
      <div style="font-family:var(--font-heading); font-weight:900; font-size:1.08rem; color:#090D16; letter-spacing:0.02em;">
        THE BEST BRAND — <span style="color:#090D16;">YOUR BRAND, NOW!!!</span> · <span style="color:#1D4ED8;">EDICIÓN OFICIAL 1.0</span>
      </div>
      <div style="color:#64748B; font-weight:500; max-width:720px; line-height:1.55;">
        Plataforma para crear la identidad visual, el logotipo en vectores y el manual oficial de 30 láminas de tu empresa con inteligencia artificial y guía por voz de Aura.
      </div>
      <div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:center; margin-top:6px;">
        <a href="/studio" style="color:#1D4ED8; font-weight:800; text-decoration:none;">Abrir Estudio Completo</a>
        <span style="color:#CBD5E1;">·</span>
        <a href="#tbbCommPlateExplorerSection" style="color:#475569; font-weight:800; text-decoration:none;">Explorador de 30 Láminas</a>
        <span style="color:#CBD5E1;">·</span>
        <a href="#tbbCommLiveDemoSection" style="color:#090D16; font-weight:800; text-decoration:none;">Demo en Vivo (Pasos 1 y 2)</a>
        <span style="color:#CBD5E1;">·</span>
        <a href="#tbbCommPricingSection" onclick="if(window.tbbOpenBuyAppCheckoutModal){window.tbbOpenBuyAppCheckoutModal('pro_atelier'); return false;}" style="color:#090D16; font-weight:800; text-decoration:none;">Comprar la App (Tarjeta · Apple Pay · Google Pay · PayPal)</a>
      </div>
    </div>
  </footer>"""

html_content = html_content.replace(old_footer_markup, new_footer_markup)

with open("apps/web/website.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("[OK] apps/web/website.html footer fully updated.")
print("[FINISHED] Pure Light refactor applied cleanly!")
