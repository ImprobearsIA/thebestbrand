#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builder Maestro V66 - The Best Brand (Commercial Experience & Payments)
Reconstrucción perfecta y libre de errores sintácticos basada en 1f20183.
"""

import subprocess
import re
import sys
import os

print("[1/5] Obteniendo código base limpio del commit 1f20183 ...")
cmd = ["git", "show", "1f20183:apps/web/tbb-commercial-experience-and-payments.js"]
code = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout
print(f"Base cargada: {len(code)} caracteres, {len(code.splitlines())} líneas.")

# ==============================================================================
# 1. ERRADICACIÓN TOTAL DEL COLOR NARANJA POR NAVY BLUE (#0D2540) Y CELESTE (#4C9DE6)
# ==============================================================================
print("[2/5] Erradicando colores naranjas e inyectando Navy Blue #0D2540 ...")

# Terminología de 30 Hojas
code = code.replace("30 Láminas en Vivo", "Manual de Marca de 30 Hojas en Vivo")
code = code.replace("30 Láminas en Curvas", "Manual de Marca de 30 Hojas en Curvas")
code = code.replace("30 Láminas", "Manual de Marca de 30 Hojas")
code = code.replace("30 láminas", "Manual de Marca de 30 Hojas")
code = code.replace("30 Lámina", "Manual de Marca de 30 Hojas")
code = code.replace("30 lámina", "Manual de Marca de 30 Hojas")

# Colores primarios y acentos
code = code.replace("#FF7A00", "#4C9DE6")
code = code.replace("#EA580C", "#0D2540")
code = code.replace("#F97316", "#0D2540")
code = code.replace("#FFF7ED", "#F0F7FF")
code = code.replace("#FEF3C7", "#EFF6FF")
code = code.replace("#FDBA74", "#93C5FD")
code = code.replace("#FB923C", "#4C9DE6")
code = code.replace("#F59E0B", "#4C9DE6")
code = code.replace("tbb-comm-btn-orange", "tbb-comm-btn-black")

# ==============================================================================
# 2. DEFINIR DATOS: VIDEO CAPSULES (AURA 02:48 PRIMERO), AUTORES Y LIBROS
# ==============================================================================

aura_capsules = '''  const VIDEO_CAPSULES = [
    {
      step: 'master',
      title: "Recorrido Completo: Cómo Aura Construye tu Marca en 7 Pasos",
      author: "Aura · Mentora de Marca con IA",
      quote: "«The Best Brand te da el control total: de tu propósito nuclear al Manual Oficial de Marca de 30 Hojas en Curvas listo para imprenta en minutos.»",
      url: "/assets/videos/capsula_teoria_aura_recorrido.mp4",
      poster: "/assets/videos/poster_aura_recorrido.jpg",
      duration: "02:48"
    },
    {
      step: 0,
      title: "Paso 0: Objetivo, Capital de Marca y Giro",
      author: "David Aaker & Sagi Haviv",
      quote: "«Proteger el capital visual de tu marca define su valor antes de trazar un solo vector.»",
      url: "/assets/videos/capsula_teoria_paso_0.mp4",
      poster: "/assets/videos/poster_paso_0.jpg",
      duration: "00:49"
    },
    {
      step: 1,
      title: "Paso 1: El Círculo Dorado y la Promesa de Valor",
      author: "Simon Sinek & Donald Miller",
      quote: "«La gente no compra lo que haces, sino el porqué lo haces (Start With Why).»",
      url: "/assets/videos/capsula_teoria_paso_1.mp4",
      poster: "/assets/videos/poster_paso_1.jpg",
      duration: "00:44"
    },
    {
      step: 2,
      title: "Paso 2: Ingeniería de Touchpoints (Antes · Durante · Después)",
      author: "Jan Carlzon & Don Norman",
      quote: "«En quince segundos de contacto tu cliente decide si confía para siempre en tu marca.»",
      url: "/assets/videos/capsula_teoria_paso_2.mp4",
      poster: "/assets/videos/poster_paso_2.jpg",
      duration: "00:43"
    },
    {
      step: 3,
      title: "Paso 3: Fonética y Naming Estratégico",
      author: "Alexandra Watkins & David Placek",
      quote: "«Un gran nombre reduce a la mitad tu costo de adquisición de clientes.»",
      url: "/assets/videos/capsula_teoria_paso_3.mp4",
      poster: "/assets/videos/poster_paso_3.jpg",
      duration: "00:43"
    },
    {
      step: 4,
      title: "Paso 4: Calibración Visual Kansei y Tipografías",
      author: "Mitsuo Nagamachi & Robert Bringhurst",
      quote: "«La tipografía y la geometría transmiten confianza visceral antes de que la razón intervenga.»",
      url: "/assets/videos/capsula_teoria_paso_4.mp4",
      poster: "/assets/videos/poster_paso_4.jpg",
      duration: "00:47"
    },
    {
      step: 5,
      title: "Paso 5: Síntesis Vectorial 3D y Logotipo",
      author: "Paul Rand & Jony Ive",
      quote: "«El diseño no es solo cómo se ve, sino cómo transforma la complejidad en belleza y función.»",
      url: "/assets/videos/capsula_teoria_paso_5.mp4",
      poster: "/assets/videos/poster_paso_5.jpg",
      duration: "00:45"
    },
    {
      step: 6,
      title: "Paso 6: La Bóveda de Manual de Marca de 30 Hojas en Curvas",
      author: "Massimo Vignelli & Josef Müller-Brockmann",
      quote: "«El orden tipográfico y la disciplina de retícula convierten una idea en un imperio.»",
      url: "/assets/videos/capsula_teoria_paso_6.mp4",
      poster: "/assets/videos/poster_paso_6.jpg",
      duration: "00:48"
    }
  ];'''

code = re.sub(r'const VIDEO_CAPSULES = \[\s*\{[\s\S]*?\n\s*\}\s*\];', aura_capsules, code, count=1)

# Inyectar Autores de YouTube, Libros, Matriz Comparativa y Controladores
helpers_code = '''
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
    modal.style.cssText = "position:fixed; inset:0; z-index:999999; background:rgba(9,13,22,0.88); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; padding:20px;";
    modal.innerHTML = `
      <div style="width:100%; max-width:880px; background:#000000; border-radius:20px; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.7); position:relative; border:1.5px solid #4C9DE6;">
        <button type="button" onclick="document.getElementById('tbbYouTubeModal').remove()" style="position:absolute; top:12px; right:12px; z-index:10; background:#0D2540; color:#FFFFFF; border:1px solid #4C9DE6; border-radius:50%; width:36px; height:36px; font-size:1.1rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
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
      appleBooksUrl: "https://books.apple.com/us/book-search?term=Business+Model+Generation+Alexander+Osterwalder",
      coverImg: "osterwalder_bmg.jpg"
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
      appleBooksUrl: "https://books.apple.com/us/book-search?term=Value+Proposition+Design+Alexander+Osterwalder",
      coverImg: "osterwalder_vpd.jpg"
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
      appleBooksUrl: "https://books.apple.com/us/book-search?term=Start+With+Why+Simon+Sinek",
      coverImg: "sinek_why.jpg"
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
      appleBooksUrl: "https://books.apple.com/us/book-search?term=Building+a+StoryBrand+Donald+Miller",
      coverImg: "miller_storybrand.jpg"
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
      appleBooksUrl: "https://books.apple.com/us/book-search?term=The+Lean+Startup+Eric+Ries",
      coverImg: "ries_lean.jpg"
    },
    {
      id: "neumeier_brandgap",
      category: "branding",
      categoryLabel: "Estrategia de Marca",
      badgeColor: "#426EAE",
      title: "The Brand Gap",
      subtitle: "Cómo cerrar la brecha entre la estrategia de negocio y el diseño",
      author: "Marty Neumeier",
      methodStep: "Paso 1 · Filosofía y Carisma",
      takeaway: "Diferenciación, colaboración, innovación, validación y cultivo de marca.",
      kindleUrl: "https://www.amazon.com/s?k=The+Brand+Gap+Marty+Neumeier&i=digital-text",
      appleBooksUrl: "https://books.apple.com/us/book-search?term=The+Brand+Gap+Marty+Neumeier",
      coverImg: "neumeier_brandgap.jpg"
    },
    {
      id: "haviv_identify",
      category: "branding",
      categoryLabel: "Anatomía de Logotipos",
      badgeColor: "#0D2540",
      title: "Identify",
      subtitle: "Diseño básico de identidades y marcas icónicas",
      author: "Chermayeff & Geismar & Haviv",
      methodStep: "Paso 4 y 5 · Logotipo y Geometría",
      takeaway: "Los principios de los logos más reconocidos de la historia moderna.",
      kindleUrl: "https://www.amazon.com/s?k=Identify+Chermayeff+Geismar+Haviv&i=digital-text",
      appleBooksUrl: "https://books.apple.com/us/book-search?term=Identify+Chermayeff+Geismar+Haviv",
      coverImg: "haviv_identify.jpg"
    },
    {
      id: "carlzon_truth",
      category: "story",
      categoryLabel: "Momentos de la Verdad",
      badgeColor: "#426EAE",
      title: "Moments of Truth",
      subtitle: "Cómo gestionar cada punto de contacto con el cliente",
      author: "Jan Carlzon",
      methodStep: "Paso 2 · Ingeniería de Touchpoints",
      takeaway: "Los primeros 15 segundos de contacto definen la fidelidad para siempre.",
      kindleUrl: "https://www.amazon.com/s?k=Moments+of+Truth+Jan+Carlzon&i=digital-text",
      appleBooksUrl: "https://books.apple.com/us/book-search?term=Moments+of+Truth+Jan+Carlzon",
      coverImg: "carlzon_truth.jpg"
    },
    {
      id: "aaker_branding",
      category: "branding",
      categoryLabel: "Capital de Marca",
      badgeColor: "#0D2540",
      title: "Aaker on Branding",
      subtitle: "20 principios para crear marcas exitosas y duraderas",
      author: "David Aaker",
      methodStep: "Paso 0 · Capital de Marca",
      takeaway: "Construcción de valor estratégico, reconocimiento y consistencia multicanal.",
      kindleUrl: "https://www.amazon.com/s?k=Aaker+on+Branding+David+Aaker&i=digital-text",
      appleBooksUrl: "https://books.apple.com/us/book-search?term=Aaker+on+Branding+David+Aaker",
      coverImg: "aaker_branding.jpg"
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

  // ---------------------------------------------------------------------------
  // CONTROLADOR DE 4 SECCIONES ESTRUCTURADAS (SIN SCROLL INFINITO)
  // ---------------------------------------------------------------------------
  window.tbbSwitchMainSection = function (secNumber) {
    const s = Math.max(1, Math.min(4, Number(secNumber || 1)));
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.activeMainSection = s;

    for (let i = 1; i <= 4; i++) {
      const pane = document.getElementById(`tbbMainSectionPane_${i}`);
      if (pane) {
        pane.style.display = (i === s) ? "block" : "none";
      }
      document.querySelectorAll(`#tbbSecTab_${i}, #tbbMobSecTab_${i}, .tbb-tab-sec-${i}`).forEach(btn => {
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

  window.tbbOpenAuraRecorridoModal = function () {
    window.tbbSwitchMainSection(4);
    setTimeout(() => {
      window.tbbSelectMasterclassChapter(0);
      window.tbbToggleMasterclassPlay();
    }, 150);
  };
'''

# Insertar helpers antes de window.tbbSelectMasterclassChapter
code = code.replace("window.tbbSelectMasterclassChapter = function", helpers_code + "\n\n  window.tbbSelectMasterclassChapter = function")

# ==============================================================================
# 3. ACTUALIZAR REPRODUCTOR DE VIDEO PARA ARRANQUE GARANTIZADO EN SAFARI Y BOTÓN NAVY
# ==============================================================================
video_play_fix = '''  window.tbbToggleMasterclassPlay = function () {
    const player = document.getElementById("tbbMasterclassVideoPlayer");
    const playOverlay = document.getElementById("tbbVideoPlayOverlay");
    if (!player) return;

    if (player.paused) {
      player.controls = true;
      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          window.tbbCommercialDemoState.videoIsPlaying = true;
          if (playOverlay) playOverlay.style.display = "none";
          window.tbbUpdateVideoControlsUI();
        }).catch(err => {
          // Si Safari bloquea audio, reproducir silenciado
          player.muted = true;
          player.play().then(() => {
            window.tbbCommercialDemoState.videoIsPlaying = true;
            if (playOverlay) playOverlay.style.display = "none";
            window.tbbUpdateVideoControlsUI();
          }).catch(e => console.warn("Video play blocked:", e));
        });
      }
    } else {
      player.pause();
      window.tbbCommercialDemoState.videoIsPlaying = false;
      if (playOverlay) playOverlay.style.display = "flex";
      window.tbbUpdateVideoControlsUI();
    }
  };'''

code = re.sub(r'window\.tbbToggleMasterclassPlay = function \(\) \{[\s\S]*?\n  \};', video_play_fix, code, count=1)

# ==============================================================================
# 4. ACTUALIZAR CAPACIDADES DE CHECKOUT MODAL (PROCESADOR SEGURO CON SIMULACIÓN)
# ==============================================================================
checkout_process_code = '''  window.tbbProcessCheckoutPayment = async function (methodId) {
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

    await new Promise(r => setTimeout(r, 1100));

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
  };'''

code = re.sub(r'window\.tbbProcessCheckoutPayment = async function \(methodId\) \{[\s\S]*?\n  \};', checkout_process_code, code, count=1)

# ==============================================================================
# 5. ACTUALIZAR RENDERIZADOR DE CHECKOUT CONTENT (4 MÉTODOS Y SIN NARANJA)
# ==============================================================================
checkout_content_code = '''  window.tbbRenderCheckoutModalContent = function () {
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
  };'''

code = re.sub(r'window\.tbbRenderCheckoutModalContent = function \(\) \{[\s\S]*?\n  \};', checkout_content_code, code, count=1)

# ==============================================================================
# 6. SHADER GLSL WEBGL + 60FPS CONNECTED NODES CANVAS (DE IMPROBEARS VANGUARD)
# ==============================================================================
hero_canvas_engine = '''  let _tbbDynamicCanvasRaf = null;
  let _tbbLiquidShaderRaf = null;

  window.tbbInitHeroParticlesCanvas = function () {
    // 1. WebGL Liquid Waves Shader (GLSL interactivo al touch/pointer)
    const liquidCanvas = document.getElementById("webglLiquidShader");
    if (liquidCanvas && !liquidCanvas.dataset.running) {
      liquidCanvas.dataset.running = "1";
      try {
        const gl = liquidCanvas.getContext("webgl") || liquidCanvas.getContext("experimental-webgl");
        if (gl) {
          const resizeLiquid = () => {
            const parent = liquidCanvas.parentElement;
            liquidCanvas.width = parent ? parent.offsetWidth : window.innerWidth;
            liquidCanvas.height = parent ? parent.offsetHeight : 520;
            gl.viewport(0, 0, liquidCanvas.width, liquidCanvas.height);
          };
          resizeLiquid();
          window.addEventListener("resize", resizeLiquid, { passive: true });

          const vsSource = `
            attribute vec2 a_pos;
            void main() {
              gl_Position = vec4(a_pos, 0.0, 1.0);
            }
          `;
          const fsSource = `
            precision mediump float;
            uniform vec2 u_res;
            uniform float u_time;
            uniform vec2 u_mouse;

            void main() {
              vec2 st = gl_FragCoord.xy / u_res.xy;
              vec2 m = u_mouse / u_res.xy;
              float dist = distance(st, m);
              float wave1 = sin(st.x * 3.5 + u_time * 0.45 + dist * 2.0);
              float wave2 = cos(st.y * 3.0 - u_time * 0.35 + dist * 1.5);
              float glow = smoothstep(0.7, 0.0, dist) * 0.18;
              vec3 deepNavy = vec3(0.051, 0.145, 0.251); // #0D2540
              vec3 sapphire = vec3(0.258, 0.431, 0.682); // #426EAE
              vec3 sky = vec3(0.298, 0.615, 0.902);      // #4C9DE6
              vec3 col = mix(deepNavy, sapphire, (wave1 + wave2 + 2.0) * 0.18);
              col += sky * glow;
              gl_FragColor = vec4(col, 0.94);
            }
          `;

          function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
          }

          const program = gl.createProgram();
          gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
          gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
          gl.linkProgram(program);
          gl.useProgram(program);

          const posBuf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,  1, -1, -1,  1,
            -1,  1,  1, -1,  1,  1
          ]), gl.STATIC_DRAW);

          const aPos = gl.getAttribLocation(program, "a_pos");
          gl.enableVertexAttribArray(aPos);
          gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

          const uRes = gl.getUniformLocation(program, "u_res");
          const uTime = gl.getUniformLocation(program, "u_time");
          const uMouse = gl.getUniformLocation(program, "u_mouse");

          let mouseX = liquidCanvas.width * 0.5;
          let mouseY = liquidCanvas.height * 0.5;
          const heroSec = document.getElementById("tbbCommHeroSection");
          if (heroSec) {
            heroSec.addEventListener("mousemove", (e) => {
              const r = liquidCanvas.getBoundingClientRect();
              mouseX = e.clientX - r.left;
              mouseY = liquidCanvas.height - (e.clientY - r.top);
            }, { passive: true });
            heroSec.addEventListener("touchmove", (e) => {
              if (e.touches && e.touches[0]) {
                const r = liquidCanvas.getBoundingClientRect();
                mouseX = e.touches[0].clientX - r.left;
                mouseY = liquidCanvas.height - (e.touches[0].clientY - r.top);
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

    const nodeCount = Math.min(38, Math.floor(w / 30));
    const nodes = [];
    const colors = ["#4C9DE6", "#426EAE", "#93C5FD", "#FFFFFF"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
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
  };'''

code = re.sub(r'let _auraCanvasRaf = null;\s*window\.tbbInitHeroParticlesCanvas = function \(\) \{[\s\S]*?\n  \};', hero_canvas_engine, code, count=1)

# ==============================================================================
# 7. ESTILOS AWWWARDS Y PESTAÑAS (BARRA FIJA EN MÓVIL Y DESKTOP)
# ==============================================================================
styles_tabs_spark = '''    /* PESTAÑAS DE NAVEGACIÓN PERMANENTES Y DESTELLO RADAR */
    .tbb-sections-tabs-bar {
      position: -webkit-sticky;
      position: sticky;
      top: 56px;
      z-index: 998;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 2px solid #CBD5E1;
      box-shadow: 0 4px 16px rgba(13, 37, 64, 0.08);
      display: flex !important;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
    }
    @media (max-width: 768px) {
      .tbb-sections-tabs-bar {
        top: 52px;
        justify-content: flex-start;
        padding: 8px 12px;
      }
    }
    .tbb-sec-tab {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 999px;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
      color: #475569;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    .tbb-sec-tab:hover {
      background: #EFF6FF;
      border-color: #93C5FD;
      color: #0D2540;
    }
    .tbb-sec-tab.is-active {
      background: #0D2540 !important;
      border-color: #4C9DE6 !important;
      color: #FFFFFF !important;
      box-shadow: 0 4px 14px rgba(13, 37, 64, 0.35);
    }
    .tbb-sec-tab.is-active .tbb-tab-number {
      background: #4C9DE6;
      color: #0D2540;
    }
    .tbb-tab-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 900;
      background: #E2E8F0;
      color: #475569;
      padding: 2px 6px;
      border-radius: 999px;
    }
    @keyframes tbbRadarPulse {
      0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(76, 157, 230, 0.7); }
      70% { transform: scale(1.04); box-shadow: 0 0 0 9px rgba(76, 157, 230, 0); }
      100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(76, 157, 230, 0); }
    }
    @keyframes tbbShimmerWave {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
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
    .hero-dynamic-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      z-index: 1;
    }
    .webgl-liquid-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      z-index: 0;
    }
    .dot-matrix-overlay {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
      background-size: 24px 24px;
      pointer-events: none;
      z-index: 1;
    }
    .hero-concentric-svg {
      position: absolute;
      right: -120px;
      top: -90px;
      width: 560px;
      height: 560px;
      opacity: 0.22;
      pointer-events: none;
      z-index: 1;
    }
    .tbb-book-card {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 18px;
      padding: 16px;
      display: flex;
      gap: 16px;
      box-shadow: 0 6px 18px rgba(9, 13, 22, 0.04);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .tbb-book-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(9, 13, 22, 0.08);
      border-color: #4C9DE6;
    }
    .tbb-book-filter-pill {
      padding: 6px 14px;
      border-radius: 999px;
      border: 1.5px solid #CBD5E1;
      background: #F8FAFC;
      color: #475569;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .tbb-book-filter-pill.is-active {
      background: #0D2540;
      border-color: #4C9DE6;
      color: #FFFFFF;
    }
    .tbb-btn-kindle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 8px;
      background: #FF9900;
      color: #111111;
      font-size: 0.72rem;
      font-weight: 800;
      text-decoration: none;
    }
    .tbb-btn-apple-books {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 8px;
      background: #000000;
      color: #FFFFFF;
      font-size: 0.72rem;
      font-weight: 800;
      text-decoration: none;
    }
'''

code = code.replace("tbb-comm-btn-orange", "tbb-comm-btn-black")
code = code.replace("/* --- 4. Hero Section --- */", styles_tabs_spark + "\n    /* --- 4. Hero Section --- */")

# Actualizar el botón flotante Always-On
code = code.replace("window.tbbUpdateAlwaysOnFloatingBarText = function () {", '''window.tbbUpdateAlwaysOnFloatingBarText = function () {
    const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
    if (!floatBar) return;
    const st = window.tbbCommercialDemoState;
    if (st && st.activeMainSection === 2) {
      floatBar.style.display = "none";
      return;
    }
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY) || localStorage.getItem("thebestbrand_pro_license"));
    floatBar.style.display = "flex";
    floatBar.style.background = "rgba(13, 37, 64, 0.95)";
    floatBar.style.border = "1.5px solid #4C9DE6";
    floatBar.style.boxShadow = "0 10px 30px rgba(13, 37, 64, 0.5)";
    floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        ${window.tbbBuildOfficialBrandbook1EmblemSVG ? window.tbbBuildOfficialBrandbook1EmblemSVG(24) : ''}
        <span style="font-size:0.76rem; font-weight:800; color:#FFFFFF; white-space:nowrap;">THE BEST BRAND</span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="background:#0D2540; border:1.5px solid #4C9DE6; color:#FFFFFF; padding:8px 16px; border-radius:999px; font-weight:800; font-size:0.78rem; cursor:pointer;">
        ${isLicensed ? "LICENCIA PRO ACTIVA ✓" : "Comprar · $49 USD"}
      </button>
    `;
  };
  var _legacyFloatBar = function () {''')

TARGET_JS = "apps/web/tbb-commercial-experience-and-payments.js"
with open(TARGET_JS, "w", encoding="utf-8") as f:
    f.write(code)

print(f"[OK] Archivo intermedio {TARGET_JS} generado. Validando sintaxis...")
res = subprocess.run(["node", "-c", TARGET_JS], capture_output=True, text=True)
if res.returncode != 0:
    print("Error sintáctico:", res.stderr)
    sys.exit(1)
else:
    print("[OK] Sintaxis Node.js 100% VÁLIDA.")
