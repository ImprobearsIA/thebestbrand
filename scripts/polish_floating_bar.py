with open('apps/web/tbb-commercial-experience-and-payments.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update .tbb-float-buy-cta CSS
old_cta_css = """      .tbb-float-buy-cta {
        background: linear-gradient(135deg, #FF7A00 0%, #EA580C 100%);
        color: #FFFFFF;
        font-family: var(--font-main);
        font-weight: 800;
        border: none;
        border-radius: 999px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }"""

new_cta_css = """      .tbb-float-buy-cta {
        background: #090D16;
        color: #FFFFFF !important;
        font-family: var(--font-main);
        font-weight: 800;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 999px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 4px 14px rgba(9, 13, 22, 0.15);
        transition: all 0.2s ease;
      }
      .tbb-float-buy-cta:hover {
        transform: translateY(-1.5px);
        border-color: #FF7A00;
        box-shadow: 0 6px 18px rgba(9, 13, 22, 0.25);
      }"""

text = text.replace(old_cta_css, new_cta_css)

# 2. Update floatBar.innerHTML
old_float_inner = """      <div style="display:flex; align-items:center; gap:7px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
        <span style="font-size:0.72rem; font-weight:800; color:#E2E8F0; white-space:nowrap;">THE BEST BRAND 1.0</span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
        ${isLicensed ? t("licenseActiveBadge") : t("buyNowSticky")}
      </button>"""

new_float_inner = """      <div style="display:flex; align-items:center; gap:8px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG(22)}
        <span style="font-size:0.76rem; font-weight:800; color:#090D16; white-space:nowrap;">THE BEST BRAND <span style="color:#64748B; font-weight:600;">1.0</span></span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
        <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>
        <span>${isLicensed ? t("licenseActiveBadge") : t("buyNowSticky")}</span>
      </button>"""

text = text.replace(old_float_inner, new_float_inner)

# 3. Apple Pay button in modal: clean Apple black
text = text.replace(
    'border:2px solid #090D16; border-bottom:4px solid #F97316; border-radius:14px;',
    'border:none; border-radius:14px; background:#000000;'
)

# 4. Receipt enter studio button to black pill
text = text.replace(
    '<button type="button" class="tbb-comm-btn-orange" onclick="window.tbbCloseBuyAppCheckoutModal(); window.tbbContinueFromDemoIntoFullStudio();" style="flex:1; padding:13px;">\n            <span>Entrar al Estudio Completo con mi Marca →</span>',
    '<button type="button" class="tbb-comm-btn-black" onclick="window.tbbCloseBuyAppCheckoutModal(); window.tbbContinueFromDemoIntoFullStudio();" style="flex:1; padding:13px;">\n            <span style="width:6px; height:6px; border-radius:50%; background:#FF7A00; display:inline-block;"></span>\n            <span>Entrar al Estudio Completo con mi Marca →</span>'
)

with open('apps/web/tbb-commercial-experience-and-payments.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('[OK] Floating bar and modal polish applied.')
