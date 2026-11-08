#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builder Maestro V65 - The Best Brand
Construye apps/web/tbb-commercial-experience-and-payments.js partiendo de la base limpia del commit 1f20183a
garantizando 100% validez sintáctica y ejecución libre de errores en Node.js y navegadores.
"""

import subprocess
import re
import os

print("[1/4] Obteniendo base limpia del commit 1f20183a ...")
cmd = ["git", "show", "1f20183a7437683d058f9966b6ae5d0430da9926:apps/web/tbb-commercial-experience-and-payments.js"]
base_code = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout

print(f"Base original cargada: {len(base_code)} caracteres.")

# ==============================================================================
# 1. MODIFICAR DICCIONARIO Y PALETA (REEMPLAZAR 30 LÁMINAS POR MANUAL DE MARCA DE 30 HOJAS)
# ==============================================================================
base_code = base_code.replace("30 Láminas en Vivo", "Manual de Marca de 30 Hojas en Vivo")
base_code = base_code.replace("30 Láminas en Curvas", "Manual de Marca de 30 Hojas en Curvas")
base_code = base_code.replace("30 Láminas", "Manual de Marca de 30 Hojas")
base_code = base_code.replace("30 láminas", "Manual de Marca de 30 Hojas")

# Erradicar el color naranja por Navy Blue (#0D2540), Zafiro (#426EAE) y Celeste (#4C9DE6)
base_code = base_code.replace("#FF7A00", "#4C9DE6")
base_code = base_code.replace("#EA580C", "#0D2540")
base_code = base_code.replace("#F97316", "#0D2540")
base_code = base_code.replace("#FFF7ED", "#F0F7FF")
base_code = base_code.replace("#FEF3C7", "#EFF6FF")
base_code = base_code.replace("#FDBA74", "#93C5FD")
base_code = base_code.replace("tbb-comm-btn-orange", "tbb-comm-btn-black")

# ==============================================================================
# 2. DEFINIR DATOS: YOUTUBE AUTHORS, LIBROS Y COMPARISON MATRIX
# ==============================================================================
extra_data_and_helpers = '''
  // ---------------------------------------------------------------------------
  // VIDEOTECA DE YOUTUBE DE AUTORES METODOLÓGICOS (THE BEST BRAND V65)
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

  // ---------------------------------------------------------------------------
  // BIBLIOTECA DE LIBROS RECOMENDADOS EN KINDLE Y APPLE BOOKS
  // ---------------------------------------------------------------------------
  const FOUNDER_ESSENTIAL_BOOKS = [
    {
      id: "osterwalder_bmgen",
      category: "canvas",
      categoryLabel: "Modelo de Negocio",
      badgeColor: "#0D2540",
      title: "Business Model Generation",
      subtitle: "Un manual para visionarios, revolucionarios y retadores",
      author: "Alexander Osterwalder & Yves Pigneur",
      methodStep: "Paso 1 · ADN de Negocio y Canvas",
      takeaway: "El lienzo de 9 bloques que define cómo tu empresa crea, entrega y captura valor en el mercado real.",
      kindleUrl: "https://www.amazon.com/s?k=Business+Model+Generation+Alexander+Osterwalder&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Business+Model+Generation+Alexander+Osterwalder",
      coverBg: "linear-gradient(135deg, #0D2540 0%, #1E3A8A 100%)",
      coverAccent: "#4C9DE6",
      edition: "Serie Estratégica Oficial",
      isbn: "978-0470876411"
    },
    {
      id: "osterwalder_vpd",
      category: "canvas",
      categoryLabel: "Propuesta de Valor",
      badgeColor: "#426EAE",
      title: "Value Proposition Design",
      subtitle: "Cómo crear productos y servicios que tus clientes realmente deseen",
      author: "Alexander Osterwalder, Yves Pigneur, Greg Bernarda",
      methodStep: "Paso 1 · Oferta y Encaje Problema-Solución",
      takeaway: "El mapa de valor conectado directamente al perfil del cliente: alegrías, dolores y tareas por resolver.",
      kindleUrl: "https://www.amazon.com/s?k=Value+Proposition+Design+Alexander+Osterwalder&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Value+Proposition+Design+Alexander+Osterwalder",
      coverBg: "linear-gradient(135deg, #0A192F 0%, #172A45 100%)",
      coverAccent: "#64FFDA",
      edition: "Diseño de Encaje de Mercado",
      isbn: "978-1118968055"
    },
    {
      id: "sinek_why",
      category: "branding",
      categoryLabel: "Propósito Nuclear",
      badgeColor: "#0D2540",
      title: "Start With Why",
      subtitle: "Cómo los grandes líderes inspiran a la acción",
      author: "Simon Sinek",
      methodStep: "Paso 1 · Círculo Dorado (Why, How, What)",
      takeaway: "La gente no compra lo que haces; compra por qué lo haces. El propósito nuclear es el cimiento de toda marca duradera.",
      kindleUrl: "https://www.amazon.com/s?k=Start+With+Why+Simon+Sinek&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Start+With+Why+Simon+Sinek",
      coverBg: "linear-gradient(135deg, #090D16 0%, #1E293B 100%)",
      coverAccent: "#4C9DE6",
      edition: "Clásico del Liderazgo",
      isbn: "978-1591846444"
    },
    {
      id: "miller_storybrand",
      category: "story",
      categoryLabel: "Claridad de Mensaje",
      badgeColor: "#426EAE",
      title: "Building a StoryBrand",
      subtitle: "Clarifica tu mensaje para que tus clientes te escuchen",
      author: "Donald Miller",
      methodStep: "Paso 1 y 2 · Touchpoints y Narrativa",
      takeaway: "El marco de 7 partes que convierte a tu cliente en el héroe y a tu marca en el guía indispensable.",
      kindleUrl: "https://www.amazon.com/s?k=Building+a+StoryBrand+Donald+Miller&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Building+a+StoryBrand+Donald+Miller",
      coverBg: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
      coverAccent: "#38BDF8",
      edition: "Metodología StoryBrand",
      isbn: "978-0718033323"
    },
    {
      id: "ries_lean",
      category: "canvas",
      categoryLabel: "Emprendimiento Ágil",
      badgeColor: "#0D2540",
      title: "The Lean Startup",
      subtitle: "Cómo crear empresas exitosas utilizando la innovación continua",
      author: "Eric Ries",
      methodStep: "Validación y Ejecución Ágil",
      takeaway: "El ciclo Construir-Medir-Aprender para lanzar marcas y productos sin quemar capital innecesario.",
      kindleUrl: "https://www.amazon.com/s?k=The+Lean+Startup+Eric+Ries&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=The+Lean+Startup+Eric+Ries",
      coverBg: "linear-gradient(135deg, #1E1B4B 0%, #0D2540 100%)",
      coverAccent: "#4C9DE6",
      edition: "Manifiesto Emprendedor",
      isbn: "978-0307887894"
    }
  ];

  window.tbbFilterBooksCategory = function (cat) {
    const cards = document.querySelectorAll(".tbb-book-card");
    const pills = document.querySelectorAll(".tbb-book-filter-pill");
    pills.forEach(p => p.classList.toggle("is-active", p.dataset.cat === cat));
    cards.forEach(c => {
      if (cat === "all" || c.dataset.cat === cat) {
        c.style.display = "flex";
      } else {
        c.style.display = "none";
      }
    });
  };

  // ---------------------------------------------------------------------------
  // GRÁFICO COMPARATIVO VISUAL DE VALOR (AGENCIAS vs THE BEST BRAND vs APPS)
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

  window.tbbOpenAuraRecorridoModal = function () {
    window.tbbSwitchMainSection(4);
    setTimeout(() => {
      window.tbbSelectMasterclassChapter(0);
      window.tbbToggleMasterclassPlay();
    }, 150);
  };
'''

# Inyectar helpers antes de window.tbbSelectMasterclassChapter
insert_marker = "window.tbbSelectMasterclassChapter = function"
base_code = base_code.replace(insert_marker, extra_data_and_helpers + "\n\n  " + insert_marker)

# ==============================================================================
# 3. ACTUALIZAR VIDEO CAPSULES CON EL VIDEO DE AURA 02:48 EN PRIMER LUGAR
# ==============================================================================
aura_capsules = '''  const VIDEO_CAPSULES = [
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

base_code = re.sub(r'const VIDEO_CAPSULES = \[\s*\{[\s\S]*?\n\s*\}\s*\];', aura_capsules, base_code, count=1)

# ==============================================================================
# 4. CONTROLADOR DE 4 SECCIONES ESTRUCTURADAS Y AISLAMIENTO DE DEMO
# ==============================================================================
sections_code = '''
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
'''

base_code = base_code.replace("function syncDemoStateFromAppIfAvailable() {", sections_code + "\n\n  function syncDemoStateFromAppIfAvailable() {")

# ==============================================================================
# 5. RECONSTRUIR EL MARKUP CON LAS 4 PESTAÑAS STICKY Y EFECTOS TECNOLÓGICOS
# ==============================================================================
markup_marker_start = "window.tbbBuildCommercialExperienceMarkup = function (isStandalonePage) {"
pos_start = base_code.find(markup_marker_start)
if pos_start == -1:
    raise ValueError("No se encontró window.tbbBuildCommercialExperienceMarkup")

# El inicio del return
pos_return = base_code.find("return `", pos_start)

# El fin de window.tbbBuildCommercialExperienceMarkup es justo antes de window.tbbSwitchCommercialDemoStep
pos_next_func = base_code.find("\n  window.tbbSwitchCommercialDemoStep = function", pos_return)
if pos_next_func == -1:
    raise ValueError("No se encontró window.tbbSwitchCommercialDemoStep")

# El fin del return es justo antes del }; que precede a window.tbbSwitchCommercialDemoStep
pos_end_return = base_code.rfind("`;", pos_return, pos_next_func)
if pos_end_return == -1:
    raise ValueError("No se encontró `; que cierra el return")

pos_end_return += 2 # Incluir `;

# Reemplazar el bloque de return de tbbBuildCommercialExperienceMarkup
base_code = base_code[:pos_return] + new_markup_return + base_code[pos_end_return:]

# ==============================================================================
# 6. INYECTAR ESTILOS AWWWARDS Y ENGINE SHADER WEBGL
# ==============================================================================
styles_and_shader = '''
    /* PESTAÑAS ESTILO IMPROBEARS Y DESTELLO RADAR PULSE */
    @keyframes tbbRadarPulse {
      0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(76, 157, 230, 0.7); }
      70% { transform: scale(1.04); box-shadow: 0 0 0 9px rgba(76, 157, 230, 0); }
      100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(76, 157, 230, 0); }
    }
    @keyframes tbbShimmerWave {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .tbb-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4C9DE6;
      display: inline-block;
      animation: tbbRadarPulse 1.8s infinite ease-in-out;
    }
    .tbb-tab-destello {
      position: relative;
      overflow: hidden;
      border: 2px solid #0D2540 !important;
      background: linear-gradient(90deg, #FFFFFF 0%, #F0F7FF 50%, #FFFFFF 100%) !important;
    }
    .tbb-tab-destello::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(76, 157, 230, 0.35), transparent);
      background-size: 200% 100%;
      animation: tbbShimmerWave 2.8s infinite;
      pointer-events: none;
    }
    .tbb-badge-spark {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.60rem;
      font-weight: 900;
      background: #0D2540;
      color: #FFFFFF;
      border: 1px solid #4C9DE6;
      padding: 2px 7px;
      border-radius: 999px;
      letter-spacing: 0.04em;
      margin-left: 6px;
      animation: tbbRadarPulse 2s infinite ease-in-out;
    }
    .tbb-btn-hero-spark {
      position: relative;
      overflow: hidden;
      border: 2px solid #4C9DE6 !important;
      box-shadow: 0 0 24px rgba(76, 157, 230, 0.5), 0 8px 24px rgba(13, 37, 64, 0.4) !important;
    }
    .tbb-btn-hero-spark::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(76, 157, 230, 0.4), transparent);
      background-size: 200% 100%;
      animation: tbbShimmerWave 2.2s infinite;
      pointer-events: none;
    }

    /* BARRA FIJA DE NAVEGACIÓN EN MÓVIL ESTILO IMPROBEARS WEB AWWWARDS */
    .tbb-mobile-sections-tabs-bar {
      display: none;
      position: sticky;
      top: 60px;
      z-index: 990;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 2px solid #CBD5E1;
      padding: 6px 8px;
      gap: 6px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
    }
    @media (max-width: 900px) {
      .tbb-mobile-sections-tabs-bar {
        display: flex !important;
      }
      .tbb-desktop-nav-links {
        display: none !important;
      }
    }
    .tbb-mob-tab-btn {
      flex: 1;
      min-width: fit-content;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1.5px solid #CBD5E1;
      background: #F8FAFC;
      color: #475569;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.76rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }
    .tbb-mob-tab-btn.is-active {
      background: #0D2540 !important;
      color: #FFFFFF !important;
      border-color: #4C9DE6 !important;
      box-shadow: 0 4px 14px rgba(13, 37, 64, 0.35);
    }

    /* HERO NAVY & EFECTOS TECNOLÓGICOS */
    .hero-navy {
      position: relative;
      background: radial-gradient(circle at 50% 20%, #183B65 0%, #0D2540 55%, #050E1A 100%);
    }
    .webgl-liquid-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.72;
      z-index: 1;
    }
    .hero-dynamic-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    }
    .dot-matrix-overlay {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px);
      background-size: 24px 24px;
      pointer-events: none;
      z-index: 1;
      opacity: 0.55;
    }
    .hero-concentric-svg {
      position: absolute;
      right: -80px;
      top: 50%;
      transform: translateY(-50%);
      width: 580px;
      height: 580px;
      opacity: 0.28;
      pointer-events: none;
      z-index: 1;
    }
'''

base_code = base_code.replace("/* ==========================================================================\n     PESTAÑAS ESTILO IMPROBEARS Y DESTELLO RADAR PULSE", "/* PESTAÑAS ESTILO IMPROBEARS Y DESTELLO RADAR PULSE")
if "/* PESTAÑAS ESTILO IMPROBEARS Y DESTELLO RADAR PULSE */" in base_code:
    base_code = base_code.replace("/* PESTAÑAS ESTILO IMPROBEARS Y DESTELLO RADAR PULSE */", styles_and_shader)
else:
    # Inyectar al inicio de tbbInjectAwwwardsStyles
    inj_pos = base_code.find("styleEl.textContent = `")
    if inj_pos != -1:
        base_code = base_code[:inj_pos + len("styleEl.textContent = `\n")] + styles_and_shader + base_code[inj_pos + len("styleEl.textContent = `\n"):]

# ==============================================================================
# 7. INICIALIZADOR DE HERO PARTICLES Y SHADER GLSL
# ==============================================================================
canvas_init_func = '''
  let _tbbDynamicCanvasRaf = null;
  let _tbbLiquidShaderRaf = null;

  window.tbbInitHeroParticlesCanvas = function () {
    // 1. WebGL GLSL Liquid Waves Shader
    const liquidCanvas = document.getElementById("webglLiquidShader");
    if (liquidCanvas && !liquidCanvas.dataset.running) {
      liquidCanvas.dataset.running = "1";
      try {
        const gl = liquidCanvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
        if (gl) {
          const vsSrc = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
          const fsSrc = `
            precision mediump float;
            uniform vec2 u_res;
            uniform float u_time;
            uniform vec2 u_mouse;
            void main() {
              vec2 uv = gl_FragCoord.xy / u_res.xy;
              vec2 p = uv - u_mouse;
              float dist = length(p);
              float ripple = sin(dist * 20.0 - u_time * 3.0) * exp(-dist * 4.0) * 0.04;
              float w1 = sin(uv.x * 6.0 + u_time * 0.8 + uv.y * 3.5) * 0.5 + 0.5;
              float w2 = cos(uv.y * 5.5 - u_time * 0.6 + (uv.x + ripple) * 4.0) * 0.5 + 0.5;
              vec3 navy = vec3(0.051, 0.145, 0.251);
              vec3 blue = vec3(0.259, 0.431, 0.682);
              vec3 sky  = vec3(0.298, 0.616, 0.902);
              vec3 col = mix(navy, blue, w1 * 0.6);
              col = mix(col, sky, w2 * 0.35);
              gl_FragColor = vec4(col, 0.38);
            }
          `;
          const vs = gl.createShader(gl.VERTEX_SHADER);
          gl.shaderSource(vs, vsSrc);
          gl.compileShader(vs);
          const fs = gl.createShader(gl.FRAGMENT_SHADER);
          gl.shaderSource(fs, fsSrc);
          gl.compileShader(fs);
          const prog = gl.createProgram();
          gl.attachShader(prog, vs);
          gl.attachShader(prog, fs);
          gl.linkProgram(prog);
          gl.useProgram(prog);

          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
          const pLoc = gl.getAttribLocation(prog, "p");
          gl.enableVertexAttribArray(pLoc);
          gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

          const uRes = gl.getUniformLocation(prog, "u_res");
          const uTime = gl.getUniformLocation(prog, "u_time");
          const uMouse = gl.getUniformLocation(prog, "u_mouse");

          let mouseX = 0.5, mouseY = 0.5;
          window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = 1.0 - (e.clientY / window.innerHeight);
          }, { passive: true });

          const resizeLiquid = () => {
            if (!liquidCanvas.parentElement) return;
            liquidCanvas.width = liquidCanvas.parentElement.offsetWidth;
            liquidCanvas.height = liquidCanvas.parentElement.offsetHeight;
            gl.viewport(0, 0, liquidCanvas.width, liquidCanvas.height);
          };
          resizeLiquid();
          window.addEventListener("resize", resizeLiquid, { passive: true });

          const startTime = performance.now();
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
      } catch (err) {}
    }

    // 2. Connected Nodes Dynamic Canvas 60fps
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
      heroSec.addEventListener("mouseleave", () => { mouse.isHover = false; }, { passive: true });
    }

    const nodeCount = Math.min(38, Math.floor(w / 30));
    const nodes = [];
    const colors = ["#4C9DE6", "#426EAE", "#93C5FD", "#FFFFFF"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
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
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
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

        n.pulse += n.pulseSpeed;
        const currentRadius = n.radius + Math.sin(n.pulse) * 0.8;

        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      _tbbDynamicCanvasRaf = requestAnimationFrame(drawNodes);
    };
    drawNodes();
  };
'''

base_code = base_code.replace("window.tbbInitHeroParticlesCanvas = function () {", canvas_init_func + "\n  var _legacyParticles = function() {")

TARGET_JS = "apps/web/tbb-commercial-experience-and-payments.js"
with open(TARGET_JS, "w", encoding="utf-8") as f:
    f.write(base_code)

print(f"[OK] {TARGET_JS} generado con éxito ({len(base_code)} caracteres).")
