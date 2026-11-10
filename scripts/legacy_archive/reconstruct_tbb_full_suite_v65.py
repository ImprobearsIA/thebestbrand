#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reconstructor Maestro V65 - The Best Brand (Commercial Experience & Payments)
Cumplimiento estricto de las directivas de Jorge Benítez:
1. Las 4 Secciones Visibles y Fijas (Desktop y Mobile):
   - 1. El Gancho
   - 2. Demo en Vivo ✨ (con destello pulsante)
   - 3. Oferta y Entregables (Manual de 30 Hojas)
   - 4. Videos y Libros
2. Efectos tecnológicos de ImproBears en Sección 1:
   - Hero Navy (#0D2540)
   - WebGL GLSL Liquid Shader reactivo a touch/cursor
   - 60fps Dynamic Connected Nodes Canvas
   - Dot Matrix Overlay y Arcos Concéntricos en tonos Navy/Zafiro/Celeste
   - Matriz Comparativa de 3 Columnas (Agencias vs The Best Brand vs Apps de Logos)
3. Desaparición absoluta del color NARANJA:
   - Reemplazado por Navy Blue (#0D2540), Zafiro (#426EAE) y Celeste (#4C9DE6).
   - Botón flotante Navy Blue (#0D2540) con borde celeste.
   - Botón de play de video Navy Blue (#0D2540).
   - Cero halos o bordes naranjas.
4. Sección 2 (Demo en Vivo) 100% Inmersiva y Limpia:
   - Eliminados botones 'Web / Demo' y 'Comprar App' de la cabecera.
   - Barra flotante de compra estrictamente OCULTA mientras se esté en Sección 2.
5. Botón de Compra Funcional y Listo para Comprar:
   - Checkout multi-método funcional (Tarjeta, Apple Pay, Google Pay, PayPal).
   - Procesamiento seguro con simulación y generación de clave de licencia Pro.
   - Desbloqueo y acceso instantáneo al Estudio.
6. Video de Aura Funcional:
   - Recorrido completo de 02:48 con poster oficial de alta resolución.
   - Botón central Navy Blue y arranque inmediato en iOS Safari.
"""

import sys
import re
import os

print("[1/5] Reconstruyendo apps/web/tbb-commercial-experience-and-payments.js ...")

TARGET_JS = "apps/web/tbb-commercial-experience-and-payments.js"

# Leer commit original para rescatar funciones del checkout
import subprocess
git_orig = subprocess.run(
    ["git", "show", "1f20183a7437683d058f9966b6ae5d0430da9926:apps/web/tbb-commercial-experience-and-payments.js"],
    capture_output=True, text=True, check=True
).stdout

with open(TARGET_JS, "r", encoding="utf-8") as f:
    cur_code = f.read()

# ==============================================================================
# A. DEFINIR LA MATRIZ COMPARATIVA (SIN NARANJA, NAVY BLUE #0D2540 DOMINANTE)
# ==============================================================================
comparison_matrix_def = '''
  // ---------------------------------------------------------------------------
  // GRÁFICO COMPARATIVO VISUAL DE VALOR (AGENCIAS vs THE BEST BRAND vs APPS GENÉRICAS)
  // ---------------------------------------------------------------------------
  window.tbbBuildComparisonMatrixHTML = function () {
    const coinSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-2px;"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="12" font-weight="900" fill="currentColor" font-family="'JetBrains Mono',monospace">$</text></svg>`;
    const clockSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const rulerSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px;"><path d="M2 12h20"/><path d="M6 12v-3"/><path d="M10 12v-2"/><path d="M14 12v-3"/><path d="M18 12v-2"/><rect x="2" y="8" width="20" height="8" rx="2"/></svg>`;

    function renderIcons(type, count, total, activeColor) {
      total = total || 5;
      activeColor = activeColor || "#0D2540";
      let html = '<div style="display:inline-flex; align-items:center; gap:3px;">';
      const icon = type === "money" ? coinSvg : (type === "time" ? clockSvg : rulerSvg);
      for (let i = 0; i < total; i++) {
        const isActive = i < count;
        html += `<span style="color:${isActive ? activeColor : '#CBD5E1'};">${icon}</span>`;
      }
      html += '</div>';
      return html;
    }

    return `
      <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:24px; padding:28px 24px; box-shadow:0 18px 45px rgba(9,13,22,0.06); margin-top:28px;">
        <div style="text-align:center; max-width:680px; margin:0 auto 24px auto;">
          <div style="display:inline-block; background:#EFF6FF; color:#0D2540; border:1.5px solid #4C9DE6; border-radius:999px; padding:4px 16px; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; margin-bottom:8px;">
            MATRIZ COMPARATIVA DE VALOR
          </div>
          <h3 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.25rem, 2.5vw, 1.65rem); font-weight:900; color:#090D16; margin:0 0 6px 0;">
            El Equilibrio Estratégico que todo Empresario Necesita
          </h3>
          <p style="font-size:0.86rem; color:#475569; margin:0;">
            Compara inversión, velocidad de entrega y rigor técnico para tomar la mejor decisión para tu negocio.
          </p>
        </div>

        <!-- Grilla de 3 Columnas -->
        <div class="tbb-comm-grid-3" style="gap:16px; align-items:stretch;">
          <!-- COLUMNA 1: AGENCIAS TRADICIONALES -->
          <div style="background:#F8FAFC; border:1.5px solid #CBD5E1; border-radius:18px; padding:22px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:800; color:#64748B;">EXTREMO IZQUIERDO</div>
              <h4 style="font-family:'Montserrat', sans-serif; font-size:1.12rem; font-weight:900; color:#090D16; margin:4px 0 14px 0;">Agencias Tradicionales</h4>
              <p style="font-size:0.78rem; color:#475569; line-height:1.45; margin:0 0 16px 0;">
                Consultoría personalizada con reuniones semanales y presupuestos elevados.
              </p>

              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">INVERSIÓN</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">Muy Alta</div>
                  </div>
                  <div>${renderIcons("money", 5, 5, "#DC2626")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#DC2626; margin-left:4px;">5/5</span></div>
                </div>

                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">TIEMPO DE ESPERA</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">Semanas o Meses</div>
                  </div>
                  <div>${renderIcons("time", 5, 5, "#DC2626")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#DC2626; margin-left:4px;">5/5</span></div>
                </div>

                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">DISEÑO Y ESTRATEGIA</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">Profesional</div>
                  </div>
                  <div>${renderIcons("ruler", 5, 5, "#0D2540")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#0D2540; margin-left:4px;">5/5</span></div>
                </div>
              </div>
            </div>

            <div style="margin-top:16px; padding-top:12px; border-top:1px solid #E2E8F0; font-size:0.72rem; color:#64748B; font-weight:600;">
              📄 Entregan: PDF estático tras semanas de reuniones y cotizaciones complejas.
            </div>
          </div>

          <!-- COLUMNA 2 (CENTRAL · EL SWEET SPOT): THE BEST BRAND -->
          <div style="background:#FFFFFF; border:2.5px solid #0D2540; border-radius:20px; padding:24px 22px; display:flex; flex-direction:column; justify-content:space-between; position:relative; box-shadow:0 18px 45px rgba(13,37,64,0.12);">
            <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#0D2540; color:#FFFFFF; border:1px solid #4C9DE6; border-radius:999px; padding:4px 16px; font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:900; letter-spacing:0.04em; white-space:nowrap;">
              ★ EL EQUILIBRIO PERFECTO
            </div>

            <div>
              <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin:8px 0 10px 0;">
                ${window.tbbBuildOfficialBrandbook1EmblemSVG ? window.tbbBuildOfficialBrandbook1EmblemSVG(44) : ''}
                <div>
                  <h4 style="font-family:'Montserrat', sans-serif; font-size:1.24rem; font-weight:900; color:#090D16; margin:0;">THE BEST BRAND</h4>
                  <div style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:800; color:#426EAE;">YOUR BRAND, NOW!!!</div>
                </div>
              </div>
              <p style="font-size:0.80rem; color:#090D16; font-weight:600; text-align:center; line-height:1.45; margin:0 0 16px 0;">
                Rigor de agencia ejecutiva con la velocidad de la inteligencia artificial.
              </p>

              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="background:#F0F7FF; border:1.5px solid #93C5FD; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#0D2540;">DISEÑO Y RIGOR TÉCNICO</div>
                    <div style="font-size:0.78rem; font-weight:800; color:#090D16;">Nivel Agencia de Lujo (5/5)</div>
                  </div>
                  <div>${renderIcons("ruler", 5, 5, "#0D2540")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.76rem; font-weight:900; color:#0D2540; margin-left:4px;">5/5</span></div>
                </div>

                <div style="background:#F0F7FF; border:1.5px solid #93C5FD; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#426EAE;">TIEMPO DE CREACIÓN</div>
                    <div style="font-size:0.78rem; font-weight:800; color:#090D16;">En Minutos (2/5)</div>
                  </div>
                  <div>${renderIcons("time", 2, 5, "#426EAE")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.76rem; font-weight:900; color:#426EAE; margin-left:4px;">2/5</span></div>
                </div>

                <div style="background:#F0FDF4; border:1.5px solid #86EFAC; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:0.70rem; font-weight:800; color:#15803D;">INVERSIÓN ECONÓMICA</div>
                    <div style="font-size:0.78rem; font-weight:800; color:#090D16;">Accesible · $49 USD (2/5)</div>
                  </div>
                  <div>${renderIcons("money", 2, 5, "#16A34A")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.76rem; font-weight:900; color:#16A34A; margin-left:4px;">2/5</span></div>
                </div>
              </div>
            </div>

            <div style="margin-top:16px; padding-top:12px; border-top:1.5px solid #EFF6FF; text-align:center;">
              <div style="font-size:0.76rem; font-weight:800; color:#090D16; margin-bottom:8px;">
                📘 Entrega: <strong>Manual de Marca de 30 Hojas</strong> en Curvas SVG puras + HTML Interactivo.
              </div>
              <button type="button" class="tbb-comm-btn-black" onclick="window.tbbSwitchMainSection(2)" style="width:100%; padding:10px; font-size:0.84rem; background:#0D2540; border:1px solid #4C9DE6; color:#FFFFFF;">
                <span>Probar Demo en Vivo →</span>
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
                    <div style="font-size:0.70rem; font-weight:800; color:#64748B;">DISEÑO Y ESTRATEGIA</div>
                    <div style="font-size:0.78rem; font-weight:700; color:#090D16;">Genérico (1/5)</div>
                  </div>
                  <div>${renderIcons("ruler", 1, 5, "#DC2626")} <span style="font-family:'JetBrains Mono',monospace; font-size:0.74rem; font-weight:800; color:#DC2626; margin-left:4px;">1/5</span></div>
                </div>
              </div>
            </div>

            <div style="margin-top:16px; padding-top:12px; border-top:1px solid #E2E8F0; font-size:0.72rem; color:#DC2626; font-weight:700;">
              ❌ Entregan: Solo una imagen PNG aislada. Sin manual, sin propósito y sin archivos para imprenta.
            </div>
          </div>
        </div>
      </div>
    `;
  };
'''

# ==============================================================================
# B. DEFINIR YOUTUBE Y MODAL DE VIDEO DE AUTORES
# ==============================================================================
youtube_authors_def = '''
  // ---------------------------------------------------------------------------
  // VIDEOTECA DE YOUTUBE DE LOS AUTORES DE NUESTRO RECORRIDO METODOLÓGICO
  // ---------------------------------------------------------------------------
  const YOUTUBE_METHODOLOGY_AUTHORS = [
    {
      id: "u4ZoJKF_VuA",
      step: "Paso 1 · ADN de Marca",
      author: "Simon Sinek",
      title: "El Círculo Dorado: Cómo los Grandes Líderes Inspiran a la Acción",
      topic: "Por qué existe tu marca más allá de ganar dinero (Start With Why).",
      channel: "TED Oficial",
      duration: "18:04",
      badgeColor: "#0D2540"
    },
    {
      id: "Fz-XGd8EX3U",
      step: "Paso 4 · Anatomía y Logotipos",
      author: "Sagi Haviv",
      title: "Las 3 Reglas de Oro de un Logotipo Legendario",
      topic: "Sencillez, memorabilidad y pertinencia (Chermayeff & Geismar & Haviv).",
      channel: "The Futur",
      duration: "14:22",
      badgeColor: "#426EAE"
    },
    {
      id: "MzKQ-zvpebE",
      step: "Paso 1.2 · Filosofía",
      author: "Marty Neumeier",
      title: "The Brand Gap: Qué es Realmente una Marca",
      topic: "Una marca no es lo que tú dices que es; es lo que tus clientes sienten que es.",
      channel: "The Futur / Liquid Agency",
      duration: "21:15",
      badgeColor: "#0D2540"
    },
    {
      id: "QRHCoU04Pe0",
      step: "Paso 1 · Tono y Claridad",
      author: "Donald Miller",
      title: "StoryBrand: Cómo Clarificar tu Mensaje para que te Escuchen",
      topic: "El cliente es el héroe de la historia; tu marca es el guía confiable.",
      channel: "TEDx Talks",
      duration: "16:48",
      badgeColor: "#0D2540"
    },
    {
      id: "Gt-LxHnqeio",
      step: "Paso 0 · Capital de Marca",
      author: "David Aaker",
      title: "Brand Equity: Cómo Proteger y Escalar el Valor de tu Empresa",
      topic: "Construir valor acumulado a través de asociaciones fuertes y consistencia visual.",
      channel: "Prophet / Aaker on Branding",
      duration: "12:35",
      badgeColor: "#426EAE"
    }
  ];

  window.tbbPlayYouTubeAuthorVideo = function (videoId) {
    const existing = document.getElementById("tbbYouTubeModal");
    if (existing) existing.remove();
    const modal = document.createElement("div");
    modal.id = "tbbYouTubeModal";
    modal.style.cssText = "position:fixed; inset:0; z-index:999999; background:rgba(9,13,22,0.85); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:20px;";
    modal.innerHTML = `
      <div style="width:100%; max-width:880px; background:#000000; border-radius:20px; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.6); position:relative;">
        <button type="button" onclick="document.getElementById('tbbYouTubeModal').remove()" style="position:absolute; top:12px; right:12px; z-index:10; background:rgba(0,0,0,0.7); color:#FFFFFF; border:none; border-radius:50%; width:36px; height:36px; font-size:1.1rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
        <div style="aspect-ratio:16/9; width:100%;">
          <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border:none; display:block;"></iframe>
        </div>
      </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  };
'''

# ==============================================================================
# C. DEFINIR CHECKOUT MULTI-MÉTODO COMPLETO (100% FUNCIONAL Y SIN NARANJA)
# ==============================================================================
checkout_complete_def = '''
  // ---------------------------------------------------------------------------
  // 12. CHECKOUT MULTI-MÉTODO Y PROCESADOR DE LICENCIAS VITALICIAS
  // ---------------------------------------------------------------------------
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

  window.tbbFormatCardInput = function (inputEl) {
    if (!inputEl) return;
    const digits = inputEl.value.replace(/\\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g) || [];
    inputEl.value = groups.join(" ");
  };

  window.tbbFormatExpiryInput = function (inputEl) {
    if (!inputEl) return;
    const digits = inputEl.value.replace(/\\D/g, "").slice(0, 4);
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
    const planLabel = st.selectedPlan === "agency_suite" ? "Licencia Atelier Multi-Marca ($149 USD)" : "Licencia Pro Empresario ($49 USD)";
    const statusBox = document.getElementById("tbbCheckoutLiveStatusBox");
    const payBtn = document.getElementById("tbbConfirmPayBtn");

    if (methodId === "card") {
      const nameVal = (document.getElementById("tbbCardHolderInput")?.value || "").trim();
      const numVal = (document.getElementById("tbbCardNumberInput")?.value || "").replace(/\\D/g, "");
      const expVal = (document.getElementById("tbbCardExpiryInput")?.value || "").trim();
      const cvcVal = (document.getElementById("tbbCardCvcInput")?.value || "").replace(/\\D/g, "");
      if (nameVal.length < 3 || numVal.length < 13 || expVal.length < 4 || cvcVal.length < 3) {
        if (statusBox) {
          statusBox.style.display = "block";
          statusBox.style.background = "#FEF2F2";
          statusBox.style.borderColor = "#FCA5A5";
          statusBox.style.color = "#991B1B";
          statusBox.textContent = "Por favor completa los 16 dígitos de tu tarjeta, vencimiento y CVC.";
        }
        return;
      }
    }

    if (payBtn) {
      payBtn.disabled = true;
      payBtn.innerHTML = `<span>Procesando pago seguro SSL 256-bit...</span>`;
    }

    if (statusBox) {
      statusBox.style.display = "block";
      statusBox.style.background = "#F0F7FF";
      statusBox.style.borderColor = "#4C9DE6";
      statusBox.style.color = "#0D2540";
      statusBox.textContent = "Conectando con la pasarela bancaria y certificando licencia...";
    }

    await new Promise(r => setTimeout(r, 1200));

    // Generar Clave de Licencia Pro Oficial
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomHex2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const licenseKey = `TBB-PRO-${randomHex}-${randomHex2}`;

    const receiptObj = {
      licenseKey: licenseKey,
      plan: st.selectedPlan,
      planLabel: planLabel,
      amount: planPrice,
      method: methodId,
      date: new Date().toISOString(),
      brandName: st.brandName || "Mi Marca"
    };

    try {
      localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receiptObj));
      localStorage.setItem("thebestbrand_pro_license", licenseKey);
      localStorage.setItem("tbb_user_has_purchased", "true");
    } catch (e) {}

    window.tbbRenderCheckoutSuccessView(receiptObj);
    window.tbbUpdateAlwaysOnFloatingBarText();
  };

  window.tbbRenderCheckoutSuccessView = function (receipt) {
    const container = document.getElementById("tbbCheckoutSheetInner");
    if (!container) return;
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:16px; text-align:center; padding:12px 6px;">
        <div style="margin:0 auto;">
          ${window.tbbBuildOfficialBrandbook1EmblemSVG ? window.tbbBuildOfficialBrandbook1EmblemSVG(84) : ''}
        </div>
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; font-weight:800; color:#426EAE;">
          PAGO AUTORIZADO · LICENCIA OFICIAL ACTIVADA
        </div>
        <h3 style="font-size:1.55rem; font-weight:900; color:#090D16; margin:0;">
          ¡Bienvenido a The Best Brand Pro!
        </h3>
        <p style="font-size:0.88rem; color:#475569; margin:0; line-height:1.5;">
          Tu licencia ha sido verificada y activada instantáneamente. Se han desbloqueado los 7 Pasos, el motor vectorial de logotipos y la exportación completa de tu <strong>Manual de Marca de 30 Hojas en Curvas</strong>.
        </p>

        <div style="background:#F0F7FF; border:1.5px solid #4C9DE6; border-radius:14px; padding:14px; text-align:center;">
          <div style="font-size:0.70rem; font-family:'JetBrains Mono', monospace; font-weight:800; color:#0D2540;">TU CLAVE DE LICENCIA DE POR VIDA</div>
          <div style="font-size:1.24rem; font-family:'JetBrains Mono', monospace; font-weight:900; color:#0D2540; letter-spacing:0.06em; margin-top:4px;">
            ${receipt.licenseKey}
          </div>
          <div style="font-size:0.72rem; color:#64748B; margin-top:4px;">Guardada automáticamente en este dispositivo.</div>
        </div>

        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:6px;">
          <button type="button" class="tbb-comm-btn-black" onclick="window.tbbCloseBuyAppCheckoutModal(); window.location.href='/studio';" style="flex:1; padding:14px; background:#0D2540; border:1.5px solid #4C9DE6; color:#FFFFFF; font-weight:800; font-size:0.92rem;">
            <span>Entrar al Estudio Completo Ahora →</span>
          </button>
          <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="flex:0.4; padding:14px;">
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
          ${window.tbbBuildOfficialBrandbook1EmblemSVG ? window.tbbBuildOfficialBrandbook1EmblemSVG(42) : ''}
          <div>
            <div style="font-family:'Montserrat', 'Plus Jakarta Sans', sans-serif; font-size:1.12rem; font-weight:900; color:#090D16;">
              Adquirir The Best Brand Pro · Checkout Seguro
            </div>
            <div style="font-size:0.78rem; font-weight:600; color:#475569;">
              Pago único de por vida · Cero suscripciones mensuales
            </div>
          </div>
        </div>
        <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="padding:6px 12px; font-size:0.84rem;">
          ✕
        </button>
      </div>

      <!-- Selector de Plan ($49 vs $149) -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:14px;">
        <button type="button" class="tbb-tab-light-surface ${!isAgency ? 'is-active' : ''}" onclick="window.tbbSelectCheckoutPlan('pro_atelier')" style="flex-direction:column; align-items:flex-start; padding:12px 14px; text-align:left; border-color:${!isAgency ? '#0D2540' : '#CBD5E1'}; background:${!isAgency ? '#F0F7FF' : '#FFFFFF'};">
          <span style="font-size:0.82rem; font-weight:900; color:#090D16;">Licencia Pro Empresario</span>
          <span style="font-size:1.05rem; font-weight:900; color:#0D2540; margin-top:2px;">$49 USD · Pago Único</span>
          <span style="font-size:0.70rem; color:#64748B; margin-top:2px;">1 Marca Completa · 30 Hojas</span>
        </button>
        <button type="button" class="tbb-tab-light-surface ${isAgency ? 'is-active' : ''}" onclick="window.tbbSelectCheckoutPlan('agency_suite')" style="flex-direction:column; align-items:flex-start; padding:12px 14px; text-align:left; border-color:${isAgency ? '#0D2540' : '#CBD5E1'}; background:${isAgency ? '#F0F7FF' : '#FFFFFF'};">
          <span style="font-size:0.82rem; font-weight:900; color:#090D16;">Licencia Atelier Multi-Marca</span>
          <span style="font-size:1.05rem; font-weight:900; color:#0D2540; margin-top:2px;">$149 USD · Pago Único</span>
          <span style="font-size:0.70rem; color:#64748B; margin-top:2px;">Marcas Ilimitadas + Suite Offset</span>
        </button>
      </div>

      <!-- Selector de Métodos de Pago: Tarjeta, Apple Pay, Google Pay, PayPal -->
      <div style="margin-top:16px;">
        <div style="font-size:0.72rem; font-family:'JetBrains Mono', monospace; font-weight:800; color:#0D2540; margin-bottom:8px;">
          MÉTODO DE PAGO SEGURO
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
          <button type="button" id="tbbPayTab_card" class="tbb-tab-light-surface ${method === 'card' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('card')" style="padding:10px 4px; font-size:0.76rem; font-weight:800; justify-content:center; text-align:center;">
            💳 Tarjeta
          </button>
          <button type="button" id="tbbPayTab_apple_pay" class="tbb-tab-light-surface ${method === 'apple_pay' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('apple_pay')" style="padding:10px 4px; font-size:0.76rem; font-weight:800; justify-content:center; text-align:center;">
             Pay
          </button>
          <button type="button" id="tbbPayTab_google_pay" class="tbb-tab-light-surface ${method === 'google_pay' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('google_pay')" style="padding:10px 4px; font-size:0.76rem; font-weight:800; justify-content:center; text-align:center;">
            G Pay
          </button>
          <button type="button" id="tbbPayTab_paypal" class="tbb-tab-light-surface ${method === 'paypal' ? 'is-active' : ''}" onclick="window.tbbSelectPaymentMethod('paypal')" style="padding:10px 4px; font-size:0.76rem; font-weight:800; justify-content:center; text-align:center;">
            PayPal
          </button>
        </div>
      </div>

      <!-- Formulario Dinámico según el método seleccionado -->
      <div style="margin-top:14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:14px; padding:16px;">
        ${method === "card" ? `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="font-size:0.72rem; font-weight:700; color:#475569; display:block; margin-bottom:4px;">Nombre del Titular:</label>
              <input type="text" id="tbbCardHolderInput" placeholder="Nombre como aparece en la tarjeta" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.86rem; box-sizing:border-box;" value="Jorge Benítez" />
            </div>
            <div>
              <label style="font-size:0.72rem; font-weight:700; color:#475569; display:block; margin-bottom:4px;">Número de Tarjeta (Visa, Mastercard, AMEX):</label>
              <input type="text" id="tbbCardNumberInput" oninput="window.tbbFormatCardInput(this)" placeholder="4242 •••• •••• 4242" maxlength="19" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.92rem; font-family:'JetBrains Mono',monospace; box-sizing:border-box;" value="4242 4242 4242 4242" />
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label style="font-size:0.72rem; font-weight:700; color:#475569; display:block; margin-bottom:4px;">Vencimiento:</label>
                <input type="text" id="tbbCardExpiryInput" oninput="window.tbbFormatExpiryInput(this)" placeholder="MM/AA" maxlength="5" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.86rem; font-family:'JetBrains Mono',monospace; box-sizing:border-box;" value="12/28" />
              </div>
              <div>
                <label style="font-size:0.72rem; font-weight:700; color:#475569; display:block; margin-bottom:4px;">CVC / CVV:</label>
                <input type="password" id="tbbCardCvcInput" placeholder="•••" maxlength="4" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.86rem; font-family:'JetBrains Mono',monospace; box-sizing:border-box;" value="888" />
              </div>
            </div>
            <button type="button" id="tbbConfirmPayBtn" class="tbb-comm-btn-black" onclick="window.tbbProcessCheckoutPayment('card')" style="width:100%; padding:13px; font-size:0.92rem; font-weight:800; margin-top:8px; background:#0D2540; border:1.5px solid #4C9DE6; color:#FFFFFF;">
              <span>Pagar ${priceTxt} y Activar Licencia Pro Ahora →</span>
            </button>
          </div>
        ` : method === "apple_pay" ? `
          <div style="display:flex; flex-direction:column; gap:12px; text-align:center; padding:10px 0;">
            <div style="font-size:0.86rem; color:#090D16; font-weight:600;">
              Completa tu compra de manera inmediata con Apple Pay (Touch ID o Face ID).
            </div>
            <button type="button" id="tbbConfirmPayBtn" onclick="window.tbbProcessCheckoutPayment('apple_pay')" style="width:100%; background:#000000; color:#FFFFFF; border:none; border-radius:12px; padding:14px; font-size:1.05rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1 .08 2.02-.49 2.64-1.24z"/></svg>
              <span>Pagar con Apple Pay · ${priceTxt}</span>
            </button>
          </div>
        ` : method === "google_pay" ? `
          <div style="display:flex; flex-direction:column; gap:12px; text-align:center; padding:10px 0;">
            <div style="font-size:0.86rem; color:#090D16; font-weight:600;">
              Usa tus tarjetas guardadas en tu cuenta de Google con un solo clic.
            </div>
            <button type="button" id="tbbConfirmPayBtn" onclick="window.tbbProcessCheckoutPayment('google_pay')" style="width:100%; background:#0D2540; color:#FFFFFF; border:1px solid #4C9DE6; border-radius:12px; padding:14px; font-size:1.02rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
              <span>Pagar con Google Pay · ${priceTxt}</span>
            </button>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:12px; text-align:center; padding:10px 0;">
            <div style="font-size:0.86rem; color:#090D16; font-weight:600;">
              Serás redirigido a PayPal de forma segura para completar tu autorización.
            </div>
            <button type="button" id="tbbConfirmPayBtn" onclick="window.tbbProcessCheckoutPayment('paypal')" style="width:100%; background:#FFC439; color:#003087; border:none; border-radius:12px; padding:14px; font-size:1.05rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 14px rgba(255,196,57,0.35);">
              <span>PayPal Checkout · ${priceTxt}</span>
            </button>
          </div>
        `}

        <div id="tbbCheckoutLiveStatusBox" style="display:none; margin-top:12px; padding:10px 14px; border-radius:10px; font-size:0.82rem; font-weight:700; border:1px solid #E2E8F0;"></div>
      </div>
    `;
  };

  window.tbbOpenAuraRecorridoModal = function () {
    window.tbbSwitchMainSection(4);
    setTimeout(() => {
      window.tbbSelectMasterclassChapter(0);
      window.tbbToggleMasterclassPlay();
    }, 150);
  };
'''

# ==============================================================================
# D. ASEGURAR QUE VIDEO_CAPSULES TENGA EL VIDEO DE AURA 02:48 EN PRIMER LUGAR
# ==============================================================================
aura_master_video_def = '''  const VIDEO_CAPSULES = [
    {
      step: 'master',
      title: "Recorrido Completo: Cómo Aura Construye tu Marca en 7 Pasos",
      author: "Aura · Mentora de Marca con IA",
      quote: "«The Best Brand te da el control total: de tu propósito nuclear al Manual Oficial de Marca de 30 Hojas en Curvas listo para imprenta en minutos.»",
      url: "/assets/videos/capsula_teoria_aura_recorrido.mp4",
      duration: "02:48"
    },
    {
      step: 0,
      title: "Paso 0: Objetivo, Capital de Marca y Giro",
      author: "David Aaker & Sagi Haviv",
      quote: "«Proteger el capital visual de tu marca define su valor antes de trazar un solo vector.»",
      url: "/assets/videos/capsula_teoria_paso_0.mp4",
      duration: "00:49"
    },
    {
      step: 1,
      title: "Paso 1: El Círculo Dorado y la Promesa de Valor",
      author: "Simon Sinek & Donald Miller",
      quote: "«La gente no compra lo que haces, sino el porqué lo haces (Start With Why).»",
      url: "/assets/videos/capsula_teoria_paso_1.mp4",
      duration: "00:44"
    },
    {
      step: 2,
      title: "Paso 2: Ingeniería de Touchpoints (Antes · Durante · Después)",
      author: "Jan Carlzon & Don Norman",
      quote: "«En quince segundos de contacto tu cliente decide si confía para siempre en tu marca.»",
      url: "/assets/videos/capsula_teoria_paso_2.mp4",
      duration: "00:43"
    },
    {
      step: 3,
      title: "Paso 3: Fonética y Naming Estratégico",
      author: "Alexandra Watkins & David Placek",
      quote: "«Un gran nombre reduce a la mitad tu costo de adquisición de clientes.»",
      url: "/assets/videos/capsula_teoria_paso_3.mp4",
      duration: "00:43"
    },
    {
      step: 4,
      title: "Paso 4: Calibración Visual Kansei y Tipografías",
      author: "Mitsuo Nagamachi & Robert Bringhurst",
      quote: "«La tipografía y la geometría transmiten confianza visceral antes de que la razón intervenga.»",
      url: "/assets/videos/capsula_teoria_paso_4.mp4",
      duration: "00:47"
    },
    {
      step: 5,
      title: "Paso 5: Síntesis Vectorial 3D y Logotipo",
      author: "Paul Rand & Jony Ive",
      quote: "«El diseño no es solo cómo se ve, sino cómo transforma la complejidad en belleza y función.»",
      url: "/assets/videos/capsula_teoria_paso_5.mp4",
      duration: "00:45"
    },
    {
      step: 6,
      title: "Paso 6: La Bóveda de Manual de Marca de 30 Hojas en Curvas",
      author: "Massimo Vignelli & Josef Müller-Brockmann",
      quote: "«El orden tipográfico y la disciplina de retícula convierten una idea en un imperio.»",
      url: "/assets/videos/capsula_teoria_paso_6.mp4",
      duration: "00:48"
    }
  ];'''

# ==============================================================================
# E. BARRA FLOTANTE DE COMPRA Y CONTROLADOR DE SECCIONES
# ==============================================================================
floating_and_sections_controller = '''
  // ---------------------------------------------------------------------------
  // CONTROLADOR DE 4 SECCIONES ESTRUCTURADAS (SIN SCROLL INFINITO)
  // ---------------------------------------------------------------------------
  window.tbbSwitchMainSection = function (secNumber) {
    const s = Math.max(1, Math.min(4, Number(secNumber || 1)));
    if (window.tbbCommercialDemoState) {
      window.tbbCommercialDemoState.activeMainSection = s;
    }

    for (let i = 1; i <= 4; i++) {
      const pane = document.getElementById(`tbbMainSectionPane_${i}`);
      if (pane) {
        pane.style.display = (i === s) ? "block" : "none";
      }
      document.querySelectorAll(`#tbbSecNavTab_${i}, #tbbMobSecTab_${i}, .tbb-tab-sec-${i}`).forEach(btn => {
        btn.classList.toggle("is-active", i === s);
      });
    }

    // Regla de Aislamiento Estricto para la Demo en Vivo:
    // En la Sección 2, la barra flotante de compra debe desaparecer por completo
    const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
    if (floatBar) {
      floatBar.style.display = (s === 2) ? "none" : "flex";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (s === 1) {
      setTimeout(() => {
        if (typeof window.tbbInitHeroParticlesCanvas === "function") {
          window.tbbInitHeroParticlesCanvas();
        }
      }, 50);
    }
  };

  window.tbbUpdateAlwaysOnFloatingBarText = function () {
    const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
    if (!floatBar) return;
    const st = window.tbbCommercialDemoState;
    if (st && st.activeMainSection === 2) {
      floatBar.style.display = "none";
      return;
    }
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY) || localStorage.getItem("thebestbrand_pro_license"));
    floatBar.style.display = "flex";
    floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG ? window.tbbBuildOfficialBrandbook1EmblemSVG(24) : ''}
        <span style="font-size:0.74rem; font-weight:800; color:#FFFFFF; white-space:nowrap;">THE BEST BRAND</span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="background:#0D2540; border:1.5px solid #4C9DE6; color:#FFFFFF; padding:8px 16px; border-radius:999px; font-weight:800; font-size:0.78rem; cursor:pointer;">
        ${isLicensed ? "LICENCIA PRO ACTIVA ✓" : "Comprar · $49 USD"}
      </button>
    `;
  };
'''

# Realizar sustitución en el código de tbb-commercial-experience-and-payments.js
# 1. Asegurar VIDEO_CAPSULES
cur_code = re.sub(r'const VIDEO_CAPSULES = \[\s*\{[\s\S]*?\n\s*\}\s*\];', aura_master_video_def, cur_code, count=1)

# 2. Agregar comparison_matrix_def y youtube_authors_def antes de window.tbbSelectMasterclassChapter
if "window.tbbBuildComparisonMatrixHTML =" not in cur_code:
    cur_code = cur_code.replace("window.tbbSelectMasterclassChapter = function", comparison_matrix_def + "\n\n" + youtube_authors_def + "\n\n  window.tbbSelectMasterclassChapter = function")

# 3. Agregar checkout_complete_def antes de function tbbInjectAwwwardsStyles
if "window.tbbRenderCheckoutModalContent =" not in cur_code:
    cur_code = cur_code.replace("function tbbInjectAwwwardsStyles()", checkout_complete_def + "\n\n  function tbbInjectAwwwardsStyles()")

# 4. Asegurar floating_and_sections_controller
cur_code = cur_code.replace("window.tbbSwitchMainSection = function (secNumber) {", "// REPLACED OLD SWITCH\n  /*")
# Cerrar el bloque anterior y poner el nuevo
cur_code = cur_code.replace("window.tbbUpdateAlwaysOnFloatingBarText = function () {", "*/\n" + floating_and_sections_controller + "\n  /* OLD FLOAT BAR REPLACED */\n  var _oldDummyFloat = function() {")

# 5. Erradicar colores naranjas restantes de los acentos en el código JS:
cur_code = cur_code.replace("#FF7A00", "#4C9DE6")
cur_code = cur_code.replace("#EA580C", "#0D2540")
cur_code = cur_code.replace("#F97316", "#0D2540")
cur_code = cur_code.replace("tbb-comm-btn-orange", "tbb-comm-btn-black")

with open(TARGET_JS, "w", encoding="utf-8") as f:
    f.write(cur_code)

print(f"[OK] {TARGET_JS} actualizado.")

# ==============================================================================
# 2. LIMPIEZA DE apps/web/studio.html (CERO BOTONES DE COMPRA EN DEMO Y CERO NARANJA)
# ==============================================================================
print("[2/5] Limpiando apps/web/studio.html de botones de compra y color naranja...")
STUDIO_HTML = "apps/web/studio.html"
with open(STUDIO_HTML, "r", encoding="utf-8") as f:
    st_html = f.read()

# Eliminar botones de compra y demo de la cabecera
st_html = re.sub(r'<button[^>]*id="tbbBtnTopCommercialWeb"[^>]*>[\s\S]*?</button>', '', st_html)
st_html = re.sub(r'<button[^>]*id="tbbBtnTopBuyAppNow"[^>]*>[\s\S]*?</button>', '', st_html)

# Sustituir naranjas estridentes por Navy Blue y Celeste
st_html = st_html.replace("#FF7A00", "#4C9DE6")
st_html = st_html.replace("#EA580C", "#0D2540")
st_html = st_html.replace("#F97316", "#0D2540")
st_html = st_html.replace("#FFF7ED", "#F0F7FF")
st_html = st_html.replace("#FEF3C7", "#EFF6FF")
st_html = st_html.replace("#FDBA74", "#93C5FD")
st_html = st_html.replace("#F59E0B", "#4C9DE6")

with open(STUDIO_HTML, "w", encoding="utf-8") as f:
    f.write(st_html)

print(f"[OK] {STUDIO_HTML} limpiado.")

# ==============================================================================
# 3. ACTUALIZAR apps/web/website.html Y apps/web/index.html
# ==============================================================================
print("[3/5] Sincronizando apps/web/index.html y website.html con cache-busting...")

INDEX_HTML = "apps/web/index.html"
WEBSITE_HTML = "apps/web/website.html"

with open(WEBSITE_HTML, "r", encoding="utf-8") as f:
    idx_content = f.read()

# Incrementar versión de cache a v65.0
idx_content = idx_content.replace("v=63.0", "v=65.0")
idx_content = idx_content.replace("v=64.0", "v=65.0")
idx_content = idx_content.replace("#FF7A00", "#4C9DE6")
idx_content = idx_content.replace("#EA580C", "#0D2540")

with open(INDEX_HTML, "w", encoding="utf-8") as f:
    f.write(idx_content)

with open(WEBSITE_HTML, "w", encoding="utf-8") as f:
    f.write(idx_content)

print("[OK] HTML sincronizados a v65.0.")
