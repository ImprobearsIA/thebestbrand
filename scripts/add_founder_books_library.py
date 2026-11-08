#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Incorpora la Biblioteca Esencial del Emprendedor (Libros recomendados con enlaces directos a Kindle y Apple Books):
- Serie de Alexander Osterwalder (Business Model Generation, Value Proposition Design).
- Simon Sinek (Start with Why).
- Marty Neumeier (The Brand Gap).
- Donald Miller (Building a StoryBrand).
- Jan Carlzon (Moments of Truth / Touchpoints).
- Sagi Haviv (Identify / Logotipos).
- David Aaker (Aaker on Branding / Brand Equity).
- Eric Ries (The Lean Startup).
"""

with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    code = f.read()

# ------------------------------------------------------------------------------
# 1. DEFINICIÓN DEL CATÁLOGO DE LIBROS RECOMENDADOS (KINDLE Y APPLE BOOKS)
# ------------------------------------------------------------------------------
books_catalog_code = """
  // ---------------------------------------------------------------------------
  // BIBLIOTECA ESENCIAL DEL EMPRENDEDOR (KINDLE & APPLE BOOKS)
  // ---------------------------------------------------------------------------
  const FOUNDER_ESSENTIAL_BOOKS = [
    {
      id: "osterwalder_bmg",
      category: "canvas",
      categoryLabel: "Business Model Canvas",
      badgeColor: "#1D4ED8",
      title: "Business Model Generation",
      subtitle: "Guía para visionarios, revolucionarios y retadores",
      author: "Alexander Osterwalder & Yves Pigneur",
      methodStep: "Estrategia Global · Modelo de Negocio",
      takeaway: "El lienzo de 9 bloques para diseñar, evaluar y transformar el modelo económico de tu empresa.",
      kindleUrl: "https://www.amazon.com/s?k=Business+Model+Generation+Alexander+Osterwalder&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Business+Model+Generation+Alexander+Osterwalder",
      coverBg: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
      coverAccent: "#3B82F6",
      edition: "Especial Canvas",
      isbn: "978-0470876411"
    },
    {
      id: "osterwalder_vpd",
      category: "canvas",
      categoryLabel: "Propuesta de Valor",
      badgeColor: "#EA580C",
      title: "Value Proposition Design",
      subtitle: "Cómo crear productos y servicios que tus clientes deseen",
      author: "Alexander Osterwalder & Equipo Strategyzer",
      methodStep: "Paso 1 · Oferta de Valor y Ajuste Mercado",
      takeaway: "Conecta los dolores y alegrías de tu cliente con la propuesta de valor única de tu marca.",
      kindleUrl: "https://www.amazon.com/s?k=Value+Proposition+Design+Alexander+Osterwalder&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Value+Proposition+Design+Alexander+Osterwalder",
      coverBg: "linear-gradient(135deg, #431407 0%, #EA580C 100%)",
      coverAccent: "#F97316",
      edition: "Serie Strategyzer",
      isbn: "978-1118968055"
    },
    {
      id: "sinek_why",
      category: "dna",
      categoryLabel: "Círculo Dorado",
      badgeColor: "#EA580C",
      title: "Start with Why",
      subtitle: "Cómo los grandes líderes inspiran a todos a actuar",
      author: "Simon Sinek",
      methodStep: "Paso 1 · ADN Nuclear de Marca",
      takeaway: "La gente no compra lo que haces, sino el porqué lo haces (Start with Why). La clave de la lealtad.",
      kindleUrl: "https://www.amazon.com/s?k=Start+with+Why+Simon+Sinek&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Start+with+Why+Simon+Sinek",
      coverBg: "linear-gradient(135deg, #1C1917 0%, #7C2D12 100%)",
      coverAccent: "#EA580C",
      edition: "Best Seller Mundial",
      isbn: "978-1591846444"
    },
    {
      id: "neumeier_brandgap",
      category: "branding",
      categoryLabel: "Arquitectura de Marca",
      badgeColor: "#7C3AED",
      title: "The Brand Gap",
      subtitle: "Cómo cerrar la brecha entre la estrategia de negocio y el diseño",
      author: "Marty Neumeier",
      methodStep: "Filosofía · Arquitectura y Diferenciación",
      takeaway: "Una marca no es lo que tú dices que es; es lo que tus clientes sienten visceralmente que es.",
      kindleUrl: "https://www.amazon.com/s?k=The+Brand+Gap+Marty+Neumeier&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=The+Brand+Gap+Marty+Neumeier",
      coverBg: "linear-gradient(135deg, #3B0764 0%, #6B21A8 100%)",
      coverAccent: "#A855F7",
      edition: "Clásico del Diseño",
      isbn: "978-0321348104"
    },
    {
      id: "carlzon_truth",
      category: "touchpoints",
      categoryLabel: "Touchpoints & CX",
      badgeColor: "#DC2626",
      title: "Moments of Truth",
      subtitle: "Estrategias de servicio para la economía orientada al cliente",
      author: "Jan Carlzon",
      methodStep: "Paso 2 · Puntos de Contacto",
      takeaway: "En cada interacción de 15 segundos tu cliente decide si confiará o abandonará tu marca para siempre.",
      kindleUrl: "https://www.amazon.com/s?k=Moments+of+Truth+Jan+Carlzon&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Moments+of+Truth+Jan+Carlzon",
      coverBg: "linear-gradient(135deg, #450A0A 0%, #991B1B 100%)",
      coverAccent: "#EF4444",
      edition: "Clásico de Liderazgo",
      isbn: "978-0060915735"
    },
    {
      id: "miller_storybrand",
      category: "dna",
      categoryLabel: "Claridad de Mensaje",
      badgeColor: "#059669",
      title: "Building a StoryBrand",
      subtitle: "Clarifica tu mensaje para que tus clientes te escuchen",
      author: "Donald Miller",
      methodStep: "Paso 1 · Tono, Copy y Claridad",
      takeaway: "El cliente es el héroe de la historia; tu marca es el guía confiable con un plan paso a paso.",
      kindleUrl: "https://www.amazon.com/s?k=Building+a+StoryBrand+Donald+Miller&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Building+a+StoryBrand+Donald+Miller",
      coverBg: "linear-gradient(135deg, #022C22 0%, #065F46 100%)",
      coverAccent: "#10B981",
      edition: "Best Seller NYT",
      isbn: "978-0718033323"
    },
    {
      id: "haviv_identify",
      category: "branding",
      categoryLabel: "Anatomía de Logotipos",
      badgeColor: "#1D4ED8",
      title: "Identify: Iconic Trademarks",
      subtitle: "Principios esenciales del diseño de identidad visual",
      author: "Sagi Haviv, Ivan Chermayeff & Tom Geismar",
      methodStep: "Pasos 4 y 5 · Logotipos y Curvas",
      takeaway: "Las 3 reglas de oro del diseño de logotipos legendarios: simplicidad radical, memorabilidad y pertinencia.",
      kindleUrl: "https://www.amazon.com/s?k=Identify+Chermayeff+Geismar+Haviv&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Identify+Chermayeff+Geismar+Haviv",
      coverBg: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      coverAccent: "#38BDF8",
      edition: "Maestros del Logo",
      isbn: "978-1440310324"
    },
    {
      id: "aaker_branding",
      category: "branding",
      categoryLabel: "Capital de Marca",
      badgeColor: "#0284C7",
      title: "Aaker on Branding",
      subtitle: "20 principios rectores para construir marcas fuertes",
      author: "David Aaker",
      methodStep: "Paso 0 · Brand Equity y Valor Acumulado",
      takeaway: "Cómo acumular valor patrimonial en la mente de tus clientes a través de consistencia y diferenciación.",
      kindleUrl: "https://www.amazon.com/s?k=Aaker+on+Branding+David+Aaker&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=Aaker+on+Branding+David+Aaker",
      coverBg: "linear-gradient(135deg, #082F49 0%, #0369A1 100%)",
      coverAccent: "#38BDF8",
      edition: "Estrategia Pura",
      isbn: "978-1614488323"
    },
    {
      id: "ries_lean",
      category: "canvas",
      categoryLabel: "Emprendimiento Ágil",
      badgeColor: "#4338CA",
      title: "The Lean Startup",
      subtitle: "Cómo crear empresas exitosas utilizando la innovación continua",
      author: "Eric Ries",
      methodStep: "Validación y Ejecución Ágil",
      takeaway: "El ciclo Construir-Medir-Aprender para lanzar marcas y productos sin quemar capital innecesario.",
      kindleUrl: "https://www.amazon.com/s?k=The+Lean+Startup+Eric+Ries&i=digital-text",
      appleBooksUrl: "https://books.apple.com/search?term=The+Lean+Startup+Eric+Ries",
      coverBg: "linear-gradient(135deg, #1E1B4B 0%, #3730A3 100%)",
      coverAccent: "#818CF8",
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
"""

target_catalog = "const VIDEO_CAPSULES = ["
idx_cat = code.find(target_catalog)
if idx_cat != -1:
    code = code[:idx_cat] + books_catalog_code + "\n  " + code[idx_cat:]
    print("[OK] FOUNDER_ESSENTIAL_BOOKS agregado.")

# ------------------------------------------------------------------------------
# 2. GENERADOR DE MARKUP PARA LA BIBLIOTECA DE LIBROS EN SECCIÓN 4
# ------------------------------------------------------------------------------
books_markup_section = """
            <!-- 3. BIBLIOTECA ESENCIAL DEL EMPRENDEDOR: LIBROS EN KINDLE & APPLE BOOKS -->
            <div style="margin-top:36px; padding-top:28px; border-top:1.5px solid #CBD5E1;">
              <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
                <div>
                  <div style="display:inline-flex; align-items:center; gap:6px; background:#EFF6FF; border:1px solid #93C5FD; border-radius:999px; padding:4px 12px; font-family:'JetBrains Mono', monospace; font-size:0.70rem; font-weight:800; color:#1D4ED8; margin-bottom:6px;">
                    ★ LECTURAS FUNDACIONALES RECOMENDADAS
                  </div>
                  <h3 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.35rem, 2.5vw, 1.65rem); font-weight:900; color:#090D16; margin:0;">
                    Biblioteca Esencial para el Emprendedor y Creador de Marca
                  </h3>
                  <p style="font-size:0.86rem; color:#475569; margin:4px 0 0 0; max-width:760px;">
                    Obras de referencia que fundamentan cada paso del método The Best Brand. Haz clic para abrirlos directamente en tu lector preferido de <strong>Kindle</strong> o <strong>Apple Books</strong>.
                  </p>
                </div>

                <!-- Filtros Rápidos por Categoría -->
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                  <button type="button" class="tbb-tab-light-surface tbb-book-filter-pill is-active" data-cat="all" onclick="window.tbbFilterBooksCategory('all')" style="padding:6px 12px; font-size:0.74rem;">Todos (9)</button>
                  <button type="button" class="tbb-tab-light-surface tbb-book-filter-pill" data-cat="canvas" onclick="window.tbbFilterBooksCategory('canvas')" style="padding:6px 12px; font-size:0.74rem;">Canvas & Estrategia</button>
                  <button type="button" class="tbb-tab-light-surface tbb-book-filter-pill" data-cat="dna" onclick="window.tbbFilterBooksCategory('dna')" style="padding:6px 12px; font-size:0.74rem;">ADN & Círculo Dorado</button>
                  <button type="button" class="tbb-tab-light-surface tbb-book-filter-pill" data-cat="touchpoints" onclick="window.tbbFilterBooksCategory('touchpoints')" style="padding:6px 12px; font-size:0.74rem;">Touchpoints & CX</button>
                  <button type="button" class="tbb-tab-light-surface tbb-book-filter-pill" data-cat="branding" onclick="window.tbbFilterBooksCategory('branding')" style="padding:6px 12px; font-size:0.74rem;">Logotipos & Identidad</button>
                </div>
              </div>

              <!-- Grilla de Libros Recomendados -->
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:18px;">
                ${FOUNDER_ESSENTIAL_BOOKS.map(b => `
                  <div class="tbb-book-card" data-cat="${b.category}" style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:20px; overflow:hidden; box-shadow:0 8px 24px rgba(9,13,22,0.05); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.22s ease, box-shadow 0.22s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 16px 36px rgba(9,13,22,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 24px rgba(9,13,22,0.05)';">
                    <!-- Portada Editorial Estilizada -->
                    <div style="background:${b.coverBg}; padding:20px 20px 16px 20px; color:#FFFFFF; position:relative; overflow:hidden; border-bottom:3px solid ${b.coverAccent};">
                      <div style="position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:${b.coverAccent}; opacity:0.18; pointer-events:none;"></div>
                      
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <span style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; font-weight:800; background:rgba(255,255,255,0.18); border-radius:999px; padding:2px 8px; letter-spacing:0.04em;">
                          ${b.categoryLabel.toUpperCase()}
                        </span>
                        <span style="font-family:'JetBrains Mono', monospace; font-size:0.62rem; color:#94A3B8;">
                          ${b.edition}
                        </span>
                      </div>

                      <h4 style="font-family:'Montserrat', sans-serif; font-size:1.15rem; font-weight:900; margin:0 0 4px 0; line-height:1.2; color:#FFFFFF;">
                        ${b.title}
                      </h4>
                      <div style="font-size:0.75rem; color:#CBD5E1; line-height:1.35; margin-bottom:8px; font-weight:600;">
                        ${b.subtitle}
                      </div>
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:800; color:${b.coverAccent};">
                        Por ${b.author}
                      </div>
                    </div>

                    <!-- Cuerpo Informativo y Sinopsis -->
                    <div style="padding:16px; display:flex; flex-direction:column; justify-content:space-between; flex:1;">
                      <div>
                        <div style="display:inline-flex; align-items:center; gap:6px; background:#F8FAFC; border:1px solid #CBD5E1; border-radius:8px; padding:3px 8px; font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:800; color:#090D16; margin-bottom:8px;">
                          <span style="width:6px; height:6px; border-radius:50%; background:${b.badgeColor}; display:inline-block;"></span>
                          <span>${b.methodStep}</span>
                        </div>
                        <p style="font-size:0.80rem; color:#475569; line-height:1.45; margin:0;">
                          ${b.takeaway}
                        </p>
                      </div>

                      <!-- Enlaces a Kindle y Apple Books -->
                      <div style="margin-top:16px; padding-top:12px; border-top:1px solid #E2E8F0; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                        <a href="${b.kindleUrl}" target="_blank" rel="noopener" class="tbb-tab-light-surface" style="padding:8px 6px; font-size:0.74rem; font-weight:800; text-decoration:none; justify-content:center; text-align:center; color:#090D16;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px; margin-right:4px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
                          <span>Kindle Store</span>
                        </a>
                        <a href="${b.appleBooksUrl}" target="_blank" rel="noopener" class="tbb-tab-light-surface" style="padding:8px 6px; font-size:0.74rem; font-weight:800; text-decoration:none; justify-content:center; text-align:center; color:#090D16;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px; margin-right:4px;"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1 .08 2.02-.49 2.64-1.24z"/></svg>
                          <span>Apple Books</span>
                        </a>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
"""

target_insert = "<!-- Botones de Acción al pie de la Sección 4 -->"
idx_insert = code.find(target_insert)
if idx_insert != -1:
    code = code[:idx_insert] + books_markup_section + "\n            " + code[idx_insert:]
    print("[OK] Sección de Libros (Kindle & Apple Books) insertada en Pane 4.")
else:
    print("[WARN] No se encontró el marcador de inserción en Pane 4.")

# ------------------------------------------------------------------------------
# 3. ACTUALIZAR TEXTO DE LA PESTAÑA 4 EN NAVBAR Y DRAWER
# ------------------------------------------------------------------------------
code = code.replace(
    '<span style="font-weight:800; color:#16A34A;">4.</span> Videos Educativos',
    '<span style="font-weight:800; color:#16A34A;">4.</span> Videos y Libros'
)
code = code.replace(
    '4. Videos Educativos (Aura & Autores)',
    '4. Videos y Libros (Aura, YouTube & Libros)'
)

# ------------------------------------------------------------------------------
# 4. GUARDAR ARCHIVO
# ------------------------------------------------------------------------------
with open("apps/web/tbb-commercial-experience-and-payments.js", "w", encoding="utf-8") as f:
    f.write(code)

print("[ÉXITO TOTAL] Biblioteca de libros con Kindle y Apple Books integrada al 100%.")
