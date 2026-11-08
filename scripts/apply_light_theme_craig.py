with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Update Header text colors on light background
old_header_markup = """        <a href="#tbbCommHeroSection" style="display:flex; align-items:center; gap:11px; text-decoration:none; min-width:0;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG(40)}
          <div style="min-width:0;">
            <div style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:0.96rem; font-weight:900; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.1; white-space:nowrap;">
              THE BEST BRAND <span class="tbb-brand-inline-tagline" style="color:#F97316; font-size:0.68rem;">YOUR BRAND, NOW!!!</span>
            </div>
            <div class="tbb-brand-subtag" style="font-family:'JetBrains Mono', monospace; font-size:0.54rem; font-weight:800; color:#93C5FD; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:250px;">
              ${t("brandTag")}
            </div>
          </div>
        </a>"""

new_header_markup = """        <a href="#tbbCommHeroSection" style="display:flex; align-items:center; gap:11px; text-decoration:none; min-width:0;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG(40)}
          <div style="min-width:0;">
            <div style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:0.96rem; font-weight:900; color:#090D16; letter-spacing:-0.02em; line-height:1.1; white-space:nowrap;">
              THE BEST BRAND <span class="tbb-brand-inline-tagline" style="color:#64748B; font-size:0.68rem; font-weight:700;">YOUR BRAND, NOW!!!</span>
            </div>
            <div class="tbb-brand-subtag" style="font-family:'JetBrains Mono', monospace; font-size:0.54rem; font-weight:800; color:#64748B; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:250px;">
              ${t("brandTag")}
            </div>
          </div>
        </a>"""

text = text.replace(old_header_markup, new_header_markup)

# 2. Update desktop nav links to light styling
old_nav_links = """        <!-- Navegación Desktop Monofila -->
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
          <a href="#tbbCommLiveDemoSection" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem; border-color:#F97316; color:#FDBA74 !important;">
            <span>${t("navDemo")}</span>
          </a>
          <a href="#tbbCommPricingSection" class="tbb-comm-btn-outline" style="padding:7px 12px; font-size:0.76rem;">
            <span>${t("navPricing")}</span>
          </a>
        </nav>"""

new_nav_links = """        <!-- Navegación Desktop Monofila -->
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

text = text.replace(old_nav_links, new_nav_links)

# 3. Update header right controls
old_header_ctrls = """          <select id="tbbCommercialLangSelect" aria-label="Idioma" onchange="window.tbbChangeCommercialLanguage(this.value)" class="tbb-desktop-only-ctrl" style="height:36px; padding:0 10px; border-radius:999px; background:#0E1422; color:#FFFFFF; border:1.5px solid #1D4ED8; font-family:'Plus Jakarta Sans', sans-serif; font-size:0.74rem; font-weight:800; cursor:pointer;">
            <option value="es" ${curLang === "es" ? "selected" : ""}>ES</option>
            <option value="en" ${curLang === "en" ? "selected" : ""}>EN</option>
            <option value="fr" ${curLang === "fr" ? "selected" : ""}>FR</option>
            <option value="pt" ${curLang === "pt" ? "selected" : ""}>PT</option>
            <option value="de" ${curLang === "de" ? "selected" : ""}>DE</option>
            <option value="it" ${curLang === "it" ? "selected" : ""}>IT</option>
          </select>

          <button type="button" class="tbb-comm-btn-orange" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:8px 15px; font-size:0.78rem; white-space:nowrap;">
            <span>${isLicensed ? t("licenseActiveBadge") : t("buyNowShort")}</span>
          </button>

          ${isStandalonePage ? `
            <a href="/studio" class="tbb-comm-btn-blue tbb-desktop-only-ctrl" style="padding:8px 14px; font-size:0.76rem; white-space:nowrap;">
              <span>${t("navOpenApp")}</span>
            </a>
          ` : `
            <button type="button" class="tbb-comm-btn-outline" onclick="window.tbbCloseCommercialPortalModal()" style="padding:7px 12px; font-size:0.76rem;">
              ✕
            </button>
          `}

          <button type="button" class="tbb-mobile-hamburger-btn" onclick="window.tbbToggleMobileDrawer()" aria-label="Abrir menú móvil">
            ☰
          </button>"""

new_header_ctrls = """          <select id="tbbCommercialLangSelect" aria-label="Idioma" onchange="window.tbbChangeCommercialLanguage(this.value)" class="tbb-desktop-only-ctrl" style="height:34px; padding:0 10px; border-radius:999px; background:#FFFFFF; color:#090D16; border:1px solid #CBD5E1; font-family:'Plus Jakarta Sans', sans-serif; font-size:0.74rem; font-weight:800; cursor:pointer;">
            <option value="es" ${curLang === "es" ? "selected" : ""}>ES</option>
            <option value="en" ${curLang === "en" ? "selected" : ""}>EN</option>
            <option value="fr" ${curLang === "fr" ? "selected" : ""}>FR</option>
            <option value="pt" ${curLang === "pt" ? "selected" : ""}>PT</option>
            <option value="de" ${curLang === "de" ? "selected" : ""}>DE</option>
            <option value="it" ${curLang === "it" ? "selected" : ""}>IT</option>
          </select>

          <button type="button" class="tbb-comm-btn-black" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:8px 16px; font-size:0.78rem; white-space:nowrap;">
            <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
            <span>${isLicensed ? t("licenseActiveBadge") : t("buyNowShort")}</span>
          </button>

          ${isStandalonePage ? `
            <a href="/studio" class="tbb-comm-btn-white tbb-desktop-only-ctrl" style="padding:8px 14px; font-size:0.76rem; white-space:nowrap;">
              <span>${t("navOpenApp")}</span>
            </a>
          ` : `
            <button type="button" class="tbb-comm-btn-white" onclick="window.tbbCloseCommercialPortalModal()" style="padding:7px 12px; font-size:0.76rem;">
              ✕
            </button>
          `}

          <button type="button" class="tbb-mobile-hamburger-btn" onclick="window.tbbToggleMobileDrawer()" aria-label="Abrir menú móvil" style="background:#FFFFFF; border:1px solid #CBD5E1; color:#090D16;">
            ☰
          </button>"""

text = text.replace(old_header_ctrls, new_header_ctrls)

# 4. Update Hero buttons: Primary black with amber micro-dot, Secondary white
old_hero_btns = """            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px;">
              <button type="button" class="tbb-comm-btn-orange" onclick="const el=document.getElementById('tbbCommLiveDemoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.92rem; padding:13px 22px;">
                <span>${t("heroCtaDemo")}</span>
              </button>
              <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.92rem; padding:13px 22px;">
                <span>${t("heroCtaBuy")}</span>
              </button>
            </div>"""

new_hero_btns = """            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px;">
              <button type="button" class="tbb-comm-btn-black" onclick="const el=document.getElementById('tbbCommLiveDemoSection'); if(el) el.scrollIntoView({behavior:'smooth'});" style="font-size:0.94rem; padding:13px 24px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
                <span>${t("heroCtaDemo")}</span>
              </button>
              <button type="button" class="tbb-comm-btn-white" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="font-size:0.94rem; padding:13px 24px;">
                <span>${t("heroCtaBuy")}</span>
              </button>
            </div>"""

text = text.replace(old_hero_btns, new_hero_btns)

# 5. Insert .tbb-comm-btn-black, .tbb-comm-btn-white, .tbb-nav-light-link into styles
style_insert = """      .tbb-comm-btn-black {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #090D16;
        color: #FFFFFF !important;
        font-family: var(--font-main);
        font-weight: 800;
        text-decoration: none;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 999px;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(9, 13, 22, 0.15);
        transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-comm-btn-black:hover {
        transform: translateY(-1.5px);
        box-shadow: 0 8px 22px rgba(9, 13, 22, 0.25);
        border-color: #FF7A00;
      }
      .tbb-comm-btn-white {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #FFFFFF;
        color: #090D16 !important;
        font-family: var(--font-main);
        font-weight: 800;
        text-decoration: none;
        border: 1.5px solid #CBD5E1;
        border-radius: 999px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-comm-btn-white:hover {
        transform: translateY(-1.5px);
        background: #F8FAFC;
        border-color: #1D4ED8;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      }
      .tbb-nav-light-link {
        color: #475569 !important;
        font-family: var(--font-main);
        font-weight: 700;
        font-size: 0.76rem !important;
        padding: 7px 13px !important;
        text-decoration: none;
        border-radius: 999px;
        transition: all 0.18s ease;
      }
      .tbb-nav-light-link:hover {
        color: #090D16 !important;
        background: #F1F5F9;
      }
"""

text = text.replace(".tbb-comm-btn-orange {", style_insert + "      .tbb-comm-btn-orange {")

with open("apps/web/tbb-commercial-experience-and-payments.js", "w", encoding="utf-8") as f:
    f.write(text)

print("[SUCCESS] Applied Light Theme Craig Federighi style to payments.js")
