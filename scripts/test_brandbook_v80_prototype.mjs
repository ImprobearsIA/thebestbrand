import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

// 1. Motor Vectorial de Identidad para The Best Brand (Isotipo Maestro Radiant Nexus & Lockups)
function generateTheBestBrandLogoSvg(variant = "horizontal", size = 200) {
  const pri = "#0D2540"; // Navy Blue Oficial
  const sec = "#426EAE"; // Zafiro Corporativo
  const acc = "#FF7A00"; // Naranja Acento Sutil

  // Símbolo Isotipo Puro (Radiant Nexus 8 Facetas)
  const symCore = `
    <g transform="translate(100,100)">
      <!-- 4 Pétalos Mayores en Cruz (Navy Blue) -->
      <path d="M 0,-76 L 19,-24 L 0,-6 L -19,-24 Z" fill="${pri}"/>
      <path d="M 76,0 L 24,19 L 6,0 L 24,-19 Z" fill="${pri}"/>
      <path d="M 0,76 L -19,24 L 0,6 L 19,24 Z" fill="${pri}"/>
      <path d="M -76,0 L -24,-19 L -6,0 L -24,19 Z" fill="${pri}"/>
      
      <!-- 4 Pétalos Menores Diagonales (Zafiro Blue) -->
      <path d="M 48,-48 L 34,-14 L 14,-14 L 14,-34 Z" fill="${sec}"/>
      <path d="M 48,48 L 14,34 L 14,14 L 34,14 Z" fill="${sec}"/>
      <path d="M -48,48 L -34,14 L -14,14 L -14,34 Z" fill="${sec}"/>
      <path d="M -48,-48 L -14,-34 L -14,-14 L -34,-14 Z" fill="${sec}"/>
      
      <!-- Núcleo Dorado / Naranja -->
      <circle cx="0" cy="0" r="6.5" fill="${acc}"/>
    </g>
  `;

  if (variant === "symbol_only") {
    return `
      <svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        ${symCore}
      </svg>
    `;
  }

  if (variant === "vertical") {
    return `
      <svg viewBox="0 0 280 240" width="${size * 1.16}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;">
        <g transform="translate(40, -10) scale(0.68)">
          ${symCore}
        </g>
        <text x="140" y="180" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20" fill="${pri}" letter-spacing="2.2">THE BEST BRAND</text>
        <text x="140" y="202" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="700" font-size="9" fill="${sec}" letter-spacing="3.0">BRAND IDENTITY ATELIER</text>
      </svg>
    `;
  }

  if (variant === "seal") {
    return `
      <svg viewBox="0 0 240 240" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;">
        <defs>
          <path id="sealCirclePath" d="M 120,120 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0" fill="none"/>
        </defs>
        <circle cx="120" cy="120" r="110" fill="none" stroke="${pri}" stroke-width="2"/>
        <circle cx="120" cy="120" r="102" fill="none" stroke="${sec}" stroke-width="1" stroke-dasharray="3,3"/>
        <text font-family="'Montserrat', sans-serif" font-weight="800" font-size="8.8" fill="${pri}" letter-spacing="2.4">
          <textPath href="#sealCirclePath" startOffset="50%" text-anchor="middle">
            THE BEST BRAND • OFFICIAL BRAND IDENTITY ATELIER •
          </textPath>
        </text>
        <g transform="translate(40, 40) scale(0.40)">
          ${symCore}
        </g>
      </svg>
    `;
  }

  // Por defecto: Lockup Horizontal
  return `
    <svg viewBox="0 0 460 110" width="${size * 2.8}" height="${size * 0.67}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
      <g transform="translate(-10, 5) scale(0.50)">
        ${symCore}
      </g>
      <line x1="96" y1="26" x2="96" y2="84" stroke="#E2E8F0" stroke-width="1.8"/>
      <text x="114" y="52" font-family="'Montserrat', sans-serif" font-weight="900" font-size="22" fill="${pri}" letter-spacing="2.0">THE BEST BRAND</text>
      <text x="114" y="74" font-family="'Montserrat', sans-serif" font-weight="700" font-size="10" fill="${sec}" letter-spacing="3.0">BRAND IDENTITY ATELIER</text>
    </svg>
  `;
}

// 2. Generador de Láminas Editoriales Abiertas (Cero Cajas Rígidas, 100% Lienzo Claro)
function renderPlateHeader(secNum, secTitle, plateNum, plateTitle) {
  return `
    <header class="tbb-plate-hdr">
      <div class="tbb-hdr-left">
        <span class="tbb-hdr-sec">${secNum} · ${secTitle}</span>
        <h2 class="tbb-hdr-title">${plateNum}. ${plateTitle}</h2>
      </div>
      <div class="tbb-hdr-right">
        <span class="tbb-hdr-brand">THE BEST BRAND · MANUAL OFICIAL DE IDENTIDAD</span>
        <span class="tbb-hdr-num">LÁMINA ${plateNum} / 30</span>
      </div>
    </header>
  `;
}

function renderPlateFooter(plateNum) {
  return `
    <footer class="tbb-plate-ftr">
      <div class="tbb-ftr-left">
        <span class="tbb-ftr-dot"></span>
        <span class="tbb-ftr-copy">THE BEST BRAND · TODOS LOS DERECHOS RESERVADOS · DIRECTIVA MAX C-00</span>
      </div>
      <div class="tbb-ftr-mid">
        <span>IDENTIDAD</span> · <span>ESTRUCTURA</span> · <span>EJECUCIÓN</span> · <span>GOBERNANZA</span>
      </div>
      <div class="tbb-ftr-right">
        <span>DOCUMENTO OFICIAL EN CURVAS · PÁG. ${plateNum}</span>
      </div>
    </footer>
  `;
}

// 3. Compilación de las primeras 5 Láminas Maestras
function buildMasterPlates() {
  const logoHoriz = generateTheBestBrandLogoSvg("horizontal", 100);
  const logoSym = generateTheBestBrandLogoSvg("symbol_only", 220);
  const logoVert = generateTheBestBrandLogoSvg("vertical", 160);
  const logoSeal = generateTheBestBrandLogoSvg("seal", 160);

  // LÁMINA 01: PORTADA MAESTRA
  const plate01 = `
    <article class="tbb-plate" id="plate-01">
      <div class="tbb-cover-grid">
        <div class="tbb-cover-left">
          <div class="tbb-cover-badge">
            <span class="tbb-badge-bar"></span>
            MANUAL OFICIAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V80.0
          </div>
          <h1 class="tbb-cover-h1">THE BEST BRAND</h1>
          <div class="tbb-cover-tagline">BRAND IDENTITY ATELIER & ALGORITHMIC BRANDBOOK ENGINE</div>
          <div class="tbb-cover-rule"></div>
          
          <p class="tbb-cover-lead">
            Sistema rector de posicionamiento estratégico, Círculo Dorado, La Empresa como Persona, Ingeniería de Touchpoints y Arquitectura Visual Vectorial en curvas matemáticas para la plataforma The Best Brand.
          </p>

          <div class="tbb-cover-specs">
            <div class="tbb-spec-col">
              <span class="tbb-spec-label">01 · PROPÓSITO</span>
              <p class="tbb-spec-text">Democratizar el branding corporativo de clase mundial, liberando al empresario de meses de incertidumbre y costos de agencia.</p>
            </div>
            <div class="tbb-spec-col">
              <span class="tbb-spec-label">02 · METODOLOGÍA</span>
              <p class="tbb-spec-text">7 Pasos guiados por Aura, algoritmos de diseño vectorial sin plantillas y rigor de ingeniería suiza.</p>
            </div>
            <div class="tbb-spec-col">
              <span class="tbb-spec-label">03 · ARQUITECTURA</span>
              <p class="tbb-spec-text">Marca Única Monolítica: 100% de la reputación concentrada bajo el nombre oficial de The Best Brand.</p>
            </div>
          </div>
        </div>

        <div class="tbb-cover-right">
          <div class="tbb-cover-emblem-stage">
            <svg class="tbb-orbit-bg" viewBox="0 0 340 340" width="340" height="340">
              <circle cx="170" cy="170" r="160" fill="none" stroke="#F1F5F9" stroke-width="1.5"/>
              <circle cx="170" cy="170" r="125" fill="none" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4,4"/>
              <circle cx="170" cy="170" r="90" fill="none" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="170" y1="5" x2="170" y2="335" stroke="#F1F5F9" stroke-width="1"/>
              <line x1="5" y1="170" x2="335" y2="170" stroke="#F1F5F9" stroke-width="1"/>
            </svg>
            <div class="tbb-emblem-wrap">
              ${logoSym}
            </div>
          </div>
          <div class="tbb-cover-auth">
            <div class="tbb-auth-title">SISTEMA VECTORIAL OFICIAL EN POSITIVO</div>
            <div class="tbb-auth-sub">Lienzo Claro Puro (#FFFFFF) · Navy Blue #0D2540 · Zafiro #426EAE · Naranja #FF7A00</div>
          </div>
        </div>
      </div>
      ${renderPlateFooter(1)}
    </article>
  `;

  // LÁMINA 02: ÍNDICE METODOLÓGICO Y MAPA DE RUTA (30 LÁMINAS)
  const plate02 = `
    <article class="tbb-plate" id="plate-02">
      ${renderPlateHeader("SECCIÓN 01", "INTRODUCCIÓN Y ARQUITECTURA METODOLÓGICA", 2, "Índice Metodológico y Mapa de 30 Láminas")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-narrative">
          <div class="tbb-kicker">DEL CAOS AL SISTEMA</div>
          <h3 class="tbb-h3">Una Estructura en 7 Fases para Construir Valor Patrimonial</h3>
          <p class="tbb-p">
            Este manual no es un folleto decorativo ni una plantilla genérica. Es la constitución técnica y documental de <strong>The Best Brand</strong>.
            Está concebido para operar bajo la <strong>Directiva Max C-00</strong>: todo sobre lienzo blanco (#FFFFFF), con tipografía jerárquica de alta legibilidad, curvas matemáticas exactas y cero ornamentos superfluos.
          </p>
          <div class="tbb-callout-quote">
            <p>«El diseño de marca no consiste en decorar una empresa; consiste en dotarla de un sistema rector que reduzca la fricción diaria y multiplique su valor de mercado.»</p>
            <cite>— Metodología The Best Brand · Inspirada en Al Ries & Massimo Vignelli</cite>
          </div>
          <div class="tbb-meta-strip">
            <div><strong>Formato Oficial:</strong> A4 Landscape (1122 × 794 pt)</div>
            <div><strong>Tinta Maestra:</strong> Deep Navy (#0D2540)</div>
            <div><strong>Vigencia:</strong> Permanente (Versión 80.0)</div>
          </div>
        </div>

        <div class="tbb-col-index-tree">
          <div class="tbb-index-item">
            <span class="tbb-idx-tag">SECCIÓN 01 · PASO 0</span>
            <div class="tbb-idx-title">Introducción y Manifiesto (Láminas 01–03)</div>
            <div class="tbb-idx-desc">Portada Maestra, Índice Metodológico y Manifiesto Fundacional: Del Caos al Sistema.</div>
          </div>
          <div class="tbb-index-item">
            <span class="tbb-idx-tag">SECCIÓN 02 · PASO 1</span>
            <div class="tbb-idx-title">Propósito y ADN de Marca (Láminas 04–08)</div>
            <div class="tbb-idx-desc">Círculo Dorado (WHY-HOW-WHAT), Misión, Visión, Principios, La Empresa como Persona y Tono de Voz.</div>
          </div>
          <div class="tbb-index-item">
            <span class="tbb-idx-tag">SECCIÓN 03 · PASO 2</span>
            <div class="tbb-idx-title">Ingeniería de Touchpoints (Láminas 09–12)</div>
            <div class="tbb-idx-desc">Mapa de Contacto Real del Cliente: Puntos de contacto ANTES, DURANTE y DESPUÉS de la compra.</div>
          </div>
          <div class="tbb-index-item">
            <span class="tbb-idx-tag">SECCIÓN 04–05 · PASO 3–4</span>
            <div class="tbb-idx-title">Identidad, Naming y Logotipos (Láminas 13–22)</div>
            <div class="tbb-idx-desc">Naming, Registro Niza, Anatomía del Símbolo, Versiones Oficiales, Retícula 8X, Negativo y Restricciones.</div>
          </div>
          <div class="tbb-index-item">
            <span class="tbb-idx-tag">SECCIÓN 06 · PASO 5</span>
            <div class="tbb-idx-title">Cromática, Tipografía y Sellos (Láminas 23–26)</div>
            <div class="tbb-idx-desc">Paleta de 8 tonos, Regla 70/20/10, Fuentes Montserrat + Plus Jakarta Sans y Sellos de Garantía.</div>
          </div>
          <div class="tbb-index-item">
            <span class="tbb-idx-tag">SECCIÓN 07 · PASO 6</span>
            <div class="tbb-idx-title">Aplicaciones y Gobernanza (Láminas 27–30)</div>
            <div class="tbb-idx-desc">Norma de Co-Branding, Papelería Ejecutiva, Ecosistema Digital y Colofón Institucional con Firma Oficial.</div>
          </div>
        </div>
      </div>
      ${renderPlateFooter(2)}
    </article>
  `;

  // LÁMINA 03: MANIFIESTO FUNDACIONAL (DEL CAOS AL SISTEMA)
  const plate03 = `
    <article class="tbb-plate" id="plate-03">
      ${renderPlateHeader("SECCIÓN 01", "INTRODUCCIÓN Y ARQUITECTURA METODOLÓGICA", 3, "Manifiesto Fundacional: Del Caos al Sistema")}
      <div class="tbb-body-grid-manifesto">
        <div class="tbb-manifesto-core">
          <div class="tbb-kicker">NUESTRA TESIS FUNDACIONAL</div>
          <h3 class="tbb-manifesto-h3">«El tiempo mental del líder es el recurso más valioso de cualquier organización.»</h3>
          <p class="tbb-manifesto-p">
            Durante décadas, las agencias de publicidad tradicionales han cobrado fortunas y tardado meses enteros en entregar documentos decorativos que nadie aplica. En el otro extremo, las aplicaciones automatizadas generan logotipos genéricos que carecen de estrategia, propósito y rigor constructivo.
          </p>
          <p class="tbb-manifesto-p">
            <strong>The Best Brand</strong> nace para erradicar ese falso dilema. Unimos la calidez y empatía de una mentora de clase mundial (<strong>Aura</strong>) con la precisión matemática de un motor generativo en curvas de Illustrator. En cuestión de minutos, transformamos la intuición del empresario en una constitución de marca de 30 láminas lista para operar con certeza legal y excelencia visual.
          </p>
          <div class="tbb-pillars-row">
            <div class="tbb-pillar-card">
              <span class="tbb-pillar-num">01</span>
              <h4>Escucha sin Juicio</h4>
              <p>Entendemos primero la idea genuina del cliente antes de trazar una sola línea geométrica.</p>
            </div>
            <div class="tbb-pillar-card">
              <span class="tbb-pillar-num">02</span>
              <h4>Rigor de Ingeniería</h4>
              <p>Cada proporción, tipografía y color responde a una lógica matemática comprobable.</p>
            </div>
            <div class="tbb-pillar-card">
              <span class="tbb-pillar-num">03</span>
              <h4>Cero Fricción</h4>
              <p>El cliente obtiene certeza inmediata y un manual operable desde el primer día.</p>
            </div>
          </div>
        </div>

        <div class="tbb-manifesto-buyer">
          <div class="tbb-kicker">BUYER PERSONA IDEAL</div>
          <h3 class="tbb-h3">A Quién Servimos con Excelencia</h3>
          
          <div class="tbb-buyer-card">
            <div class="tbb-buyer-role">EMPRESARIOS, FUNDADORES Y PROFESIONALES DE ALTO IMPACTO</div>
            <p class="tbb-buyer-desc">
              Líderes de empresas consolidadas o emergentes en tecnología, servicios profesionales, arquitectura, gastronomía, salud y retail que valoran su tiempo, exigen sofisticación y rechazan el trabajo amateur.
            </p>
            <ul class="tbb-buyer-list">
              <li><strong>Su Dolor Principal:</strong> Cansados de procesos lentos, cotizaciones infladas y entregables que no resuelven la operación diaria de su equipo.</li>
              <li><strong>Su Deseo Nuclear:</strong> Tener una identidad de autoridad incuestionable que transmita la calidad de su servicio antes de abrir la boca.</li>
              <li><strong>Su Victoria con Nosotros:</strong> Un Manual Oficial de 30 Láminas en Curvas entregado en minutos con calidad de agencia internacional.</li>
            </ul>
          </div>
        </div>
      </div>
      ${renderPlateFooter(3)}
    </article>
  `;

  // LÁMINA 04: EL CÍRCULO DORADO (WHY · HOW · WHAT)
  const plate04 = `
    <article class="tbb-plate" id="plate-04">
      ${renderPlateHeader("SECCIÓN 02", "PROPÓSITO CENTRAL Y ADN DE MARCA", 4, "El Círculo Dorado (WHY · HOW · WHAT)")}
      <div class="tbb-body-grid-goldencircle">
        <div class="tbb-gc-diagram-wrap">
          <svg viewBox="0 0 440 380" width="100%" height="340">
            <!-- 3 Círculos Áureos Concéntricos Puros -->
            <!-- WHAT Ring -->
            <circle cx="200" cy="190" r="160" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.8"/>
            <text x="200" y="58" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="12" fill="#0D2540" letter-spacing="2.4">WHAT · QUÉ ENTREGAMOS</text>
            <text x="200" y="74" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="9" fill="#707070">Manual 30 Láminas + Identidad Vectorial</text>
            
            <!-- HOW Ring -->
            <circle cx="200" cy="190" r="108" fill="#EFF6FF" stroke="#426EAE" stroke-width="2.2" stroke-dasharray="6,4"/>
            <text x="200" y="114" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="12" fill="#426EAE" letter-spacing="2.0">HOW · CÓMO LO HACEMOS</text>
            <text x="200" y="130" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="8.8" fill="#426EAE">Metodología 7 Pasos + Motor Algorítmico</text>
            
            <!-- WHY Core -->
            <circle cx="200" cy="190" r="54" fill="#0D2540" stroke="#FF7A00" stroke-width="3"/>
            <text x="200" y="186" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="16" fill="#FFFFFF" letter-spacing="2.0">WHY</text>
            <text x="200" y="204" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8.5" fill="#FF7A00" letter-spacing="1.5">PROPÓSITO</text>

            <!-- Conectores a la columna narrativa -->
            <line x1="254" y1="190" x2="430" y2="190" stroke="#FF7A00" stroke-width="2"/>
            <circle cx="430" cy="190" r="4.5" fill="#FF7A00"/>
            
            <line x1="308" y1="190" x2="350" y2="110" stroke="#426EAE" stroke-width="1.8"/>
            <line x1="350" y1="110" x2="430" y2="110" stroke="#426EAE" stroke-width="1.8"/>
            <circle cx="430" cy="110" r="4" fill="#426EAE"/>

            <line x1="360" y1="190" x2="390" y2="280" stroke="#0D2540" stroke-width="1.8"/>
            <line x1="390" y1="280" x2="430" y2="280" stroke="#0D2540" stroke-width="1.8"/>
            <circle cx="430" cy="280" r="4" fill="#0D2540"/>
          </svg>
        </div>

        <div class="tbb-gc-narrative">
          <!-- WHY Block -->
          <div class="tbb-gc-block why-block">
            <div class="tbb-gc-tag tbb-tag-why">01 · WHY (EL PROPÓSITO CENTRAL · LA CREENCIA)</div>
            <h4 class="tbb-gc-h4">Por Qué Existimos</h4>
            <p class="tbb-gc-p">
              Creemos apasionadamente que todo empresario merece una marca de nivel mundial sin tener que pagar precios exorbitantes ni esperar meses a que una agencia entienda su negocio. Existimos para <strong>liberar tiempo mental al líder</strong> y transformar su visión en un activo tangible de alto valor.
            </p>
          </div>

          <!-- HOW Block -->
          <div class="tbb-gc-block how-block">
            <div class="tbb-gc-tag tbb-tag-how">02 · HOW (EL MÉTODO DIFERENCIADOR · EL SISTEMA)</div>
            <h4 class="tbb-gc-h4">Cómo Hacemos Realidad esa Promesa</h4>
            <p class="tbb-gc-p">
              A través de <strong>Aura</strong>, nuestra mentora conversacional con inteligencia artificial, guiamos al usuario paso a paso por 7 etapas estratégicas. A partir de sus respuestas, nuestro <strong>motor de geometría algorítmica</strong> genera identidades vectoriales únicas en curvas y maquetación editorial adaptada a su industria sin usar plantillas fijas.
            </p>
          </div>

          <!-- WHAT Block -->
          <div class="tbb-gc-block what-block">
            <div class="tbb-gc-tag tbb-tag-what">03 · WHAT (LA ENTREGA TANGIBLE · LA SOLUCIÓN)</div>
            <h4 class="tbb-gc-h4">Qué Entregamos al Mercado con Excelencia</h4>
            <p class="tbb-gc-p">
              Un <strong>Manual Oficial de Marca de 30 Láminas en Curvas Vectoriales (.PDF)</strong> listo para imprenta y uso digital, acompañado del paquete completo de isotipos, retículas, paletas certificadas y estándares de gobernanza que protegen el prestigio de la empresa para siempre.
            </p>
          </div>
        </div>
      </div>
      ${renderPlateFooter(4)}
    </article>
  `;

  // LÁMINA 05: PROMESA, MISIÓN, VISIÓN Y LAS 6 MÁXIMAS
  const plate05 = `
    <article class="tbb-plate" id="plate-05">
      ${renderPlateHeader("SECCIÓN 02", "PROPÓSITO CENTRAL Y ADN DE MARCA", 5, "Promesa de Marca, Misión, Visión y 6 Máximas")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-mvp">
          <div class="tbb-mvp-card">
            <span class="tbb-mvp-label">NUESTRA PROMESA DE MARCA</span>
            <h3 class="tbb-mvp-title">«Tu Identidad de Clase Mundial Lista en Minutos, con Calidad de Agencia Internacional.»</h3>
            <p class="tbb-mvp-desc">Cero jerga publicitaria vacía. Cero semanas de retraso. Cero plantillas genéricas. Entrega vectorial impecable y certeza total desde la primera sesión.</p>
          </div>

          <div class="tbb-split-cards">
            <div class="tbb-split-box">
              <span class="tbb-box-tag">MISIÓN OFICIAL</span>
              <p>Desarrollar la tecnología algorítmica y la experiencia conversacional más avanzada para que todo negocio consolide una presencia de marca memorable y profesional de inmediato.</p>
            </div>
            <div class="tbb-split-box">
              <span class="tbb-box-tag">VISIÓN A 5 AÑOS</span>
              <p>Ser el estándar global de creación de Brandbooks y arquitectura visual para empresas en Iberoamérica y el mundo, liderando la convergencia entre IA empática y diseño suizo.</p>
            </div>
          </div>
        </div>

        <div class="tbb-col-maxims">
          <div class="tbb-kicker">LAS 6 MÁXIMAS DE NUESTRA FILOSOFÍA</div>
          <h3 class="tbb-h3">Criterios de Excelencia Innegociables</h3>
          <div class="tbb-maxims-list">
            <div class="tbb-maxim-row">
              <span class="tbb-m-num">01</span>
              <div>
                <strong>La Claridad Supera al Volumen:</strong> Un manual de 30 láminas conciso y aplicable vale mil veces más que 200 páginas de texto que nadie lee.
              </div>
            </div>
            <div class="tbb-maxim-row">
              <span class="tbb-m-num">02</span>
              <div>
                <strong>El Diseño es Función y Emoción:</strong> La belleza visual no riñe con la efectividad comercial; ambas se potencian cuando hay rigor técnico.
              </div>
            </div>
            <div class="tbb-maxim-row">
              <span class="tbb-m-num">03</span>
              <div>
                <strong>Toda Decisión Reduce Fricción:</strong> Cada pantalla, botón o párrafo debe ahorrar tiempo y energía mental al líder.
              </div>
            </div>
            <div class="tbb-maxim-row">
              <span class="tbb-m-num">04</span>
              <div>
                <strong>Autoridad Tranquila:</strong> No necesitamos gritar ni usar colores estridentes para demostrar solvencia y excelencia técnica.
              </div>
            </div>
            <div class="tbb-maxim-row">
              <span class="tbb-m-num">05</span>
              <div>
                <strong>Curvas Matemáticas Puras:</strong> Jamás entregamos píxeles borrosos. Todo activo nace en vectores escalables al infinito.
              </div>
            </div>
            <div class="tbb-maxim-row">
              <span class="tbb-m-num">06</span>
              <div>
                <strong>Socio Leal a Largo Plazo:</strong> El valor de una marca se demuestra en su consistencia en el tiempo y en el soporte a su fundador.
              </div>
            </div>
          </div>
        </div>
      </div>
      ${renderPlateFooter(5)}
    </article>
  `;

  return [plate01, plate02, plate03, plate04, plate05];
}

// 4. CSS Maestro Impecable (Lienzo Claro, Tipografía Suiza, Cero Cajas Rígidas)
function getMasterStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      margin: 0;
      padding: 24px;
      background: #F1F5F9;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      color: #333333;
    }

    .tbb-plate {
      width: 1122px;
      height: 794px;
      margin: 0 auto 30px auto;
      background: #FFFFFF;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 16px 36px rgba(13, 37, 64, 0.08);
      page-break-after: always;
      break-after: page;
      padding: 0;
    }

    /* ENCABEZADO EDITORIAL OFICIAL */
    .tbb-plate-hdr {
      height: 72px;
      padding: 20px 48px 0 48px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid #E6E6E6;
      flex-shrink: 0;
    }
    .tbb-hdr-left { display: flex; flex-direction: column; }
    .tbb-hdr-sec {
      font-family: 'Montserrat', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.18em;
      color: #426EAE;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .tbb-hdr-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 21px;
      font-weight: 900;
      color: #0D2540;
      margin: 0;
      letter-spacing: -0.01em;
    }
    .tbb-hdr-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
    }
    .tbb-hdr-brand {
      font-family: 'Montserrat', sans-serif;
      font-size: 7.8px;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: #707070;
      margin-bottom: 3px;
    }
    .tbb-hdr-num {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 900;
      color: #0D2540;
      letter-spacing: 0.08em;
    }

    /* PIE DE PÁGINA EDITORIAL OFICIAL */
    .tbb-plate-ftr {
      height: 44px;
      padding: 0 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #E6E6E6;
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      color: #707070;
      flex-shrink: 0;
    }
    .tbb-ftr-left { display: flex; align-items: center; gap: 8px; font-weight: 700; }
    .tbb-ftr-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF7A00; }
    .tbb-ftr-copy { letter-spacing: 0.1em; color: #0D2540; }
    .tbb-ftr-mid { font-weight: 800; letter-spacing: 0.18em; color: #426EAE; }
    .tbb-ftr-right { font-weight: 800; letter-spacing: 0.1em; color: #0D2540; }

    /* LAYOUT PORTADA MAESTRA (LÁMINA 01) */
    .tbb-cover-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      align-items: center;
      padding: 48px 48px 24px 48px;
      gap: 36px;
    }
    .tbb-cover-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.18em;
      color: #426EAE;
      margin-bottom: 12px;
    }
    .tbb-badge-bar { width: 28px; height: 2.5px; background: #FF7A00; }
    .tbb-cover-h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: 54px;
      font-weight: 900;
      color: #0D2540;
      margin: 0 0 8px 0;
      line-height: 0.98;
      letter-spacing: -0.02em;
    }
    .tbb-cover-tagline {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.22em;
      color: #426EAE;
      margin-bottom: 14px;
    }
    .tbb-cover-rule {
      width: 140px;
      height: 3.5px;
      background: #0D2540;
      position: relative;
      margin-bottom: 18px;
    }
    .tbb-cover-rule::after {
      content: '';
      position: absolute;
      right: -10px;
      top: 0;
      width: 6px;
      height: 3.5px;
      background: #FF7A00;
    }
    .tbb-cover-lead {
      font-size: 13px;
      line-height: 1.6;
      color: #333333;
      margin: 0 0 24px 0;
      max-width: 530px;
    }
    .tbb-cover-specs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding-top: 18px;
      border-top: 1px solid #E6E6E6;
    }
    .tbb-spec-col {
      border-right: 1px solid #E6E6E6;
      padding-right: 12px;
    }
    .tbb-spec-col:last-child { border-right: none; padding-right: 0; }
    .tbb-spec-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: #426EAE;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-spec-text {
      font-size: 10.5px;
      line-height: 1.42;
      color: #0D2540;
      margin: 0;
      font-weight: 500;
    }

    .tbb-cover-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .tbb-cover-emblem-stage {
      width: 340px;
      height: 340px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tbb-orbit-bg { position: absolute; inset: 0; }
    .tbb-emblem-wrap { position: relative; z-index: 2; }
    .tbb-cover-auth {
      margin-top: 14px;
    }
    .tbb-auth-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.16em;
      color: #0D2540;
      margin-bottom: 4px;
    }
    .tbb-auth-sub {
      font-size: 9.5px;
      color: #707070;
      font-weight: 600;
    }

    /* CONTENEDOR EDITORIAL A 2 COLUMNAS (LÁMINA 02, 05) */
    .tbb-body-grid-2col {
      flex: 1;
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      padding: 24px 48px;
      gap: 36px;
      align-items: flex-start;
      overflow: hidden;
    }
    .tbb-kicker {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.18em;
      color: #FF7A00;
      margin-bottom: 6px;
    }
    .tbb-h3 {
      font-family: 'Montserrat', sans-serif;
      font-size: 19px;
      font-weight: 800;
      color: #0D2540;
      margin: 0 0 12px 0;
      line-height: 1.25;
    }
    .tbb-p {
      font-size: 12px;
      line-height: 1.62;
      color: #333333;
      margin: 0 0 16px 0;
    }
    .tbb-callout-quote {
      border-left: 3px solid #426EAE;
      padding: 12px 18px;
      background: #F8FAFC;
      border-radius: 0 8px 8px 0;
      margin: 18px 0;
    }
    .tbb-callout-quote p {
      font-family: 'Montserrat', sans-serif;
      font-size: 11.8px;
      font-style: italic;
      line-height: 1.52;
      color: #0D2540;
      margin: 0 0 6px 0;
      font-weight: 600;
    }
    .tbb-callout-quote cite {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 9.5px;
      color: #707070;
      font-style: normal;
      font-weight: 700;
    }
    .tbb-meta-strip {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 10.5px;
      color: #0D2540;
      border-top: 1px solid #E6E6E6;
      padding-top: 14px;
    }

    /* ÍNDICE METODOLÓGICO (LÁMINA 02) */
    .tbb-col-index-tree {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tbb-index-item {
      padding: 8px 14px;
      border-left: 2.5px solid #426EAE;
      background: #FFFFFF;
      transition: all 0.2s;
    }
    .tbb-idx-tag {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #FF7A00;
      display: block;
      margin-bottom: 2px;
    }
    .tbb-idx-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 800;
      color: #0D2540;
      margin-bottom: 2px;
    }
    .tbb-idx-desc {
      font-size: 10.5px;
      color: #707070;
      line-height: 1.4;
    }

    /* MANIFIESTO (LÁMINA 03) */
    .tbb-body-grid-manifesto {
      flex: 1;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      padding: 24px 48px;
      gap: 36px;
      align-items: flex-start;
    }
    .tbb-manifesto-h3 {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 800;
      color: #0D2540;
      line-height: 1.3;
      margin: 0 0 14px 0;
    }
    .tbb-manifesto-p {
      font-size: 12px;
      line-height: 1.62;
      color: #333333;
      margin: 0 0 12px 0;
    }
    .tbb-pillars-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 16px;
      border-top: 1px solid #E6E6E6;
      padding-top: 14px;
    }
    .tbb-pillar-card {
      border-top: 2px solid #0D2540;
      padding-top: 8px;
    }
    .tbb-pillar-num {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 900;
      color: #FF7A00;
    }
    .tbb-pillar-card h4 {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 800;
      color: #0D2540;
      margin: 2px 0 4px 0;
    }
    .tbb-pillar-card p {
      font-size: 9.8px;
      color: #555555;
      line-height: 1.4;
      margin: 0;
    }

    .tbb-buyer-card {
      background: #F8FAFC;
      border-left: 3px solid #0D2540;
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
    }
    .tbb-buyer-role {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.16em;
      color: #426EAE;
      margin-bottom: 6px;
    }
    .tbb-buyer-desc {
      font-size: 11.5px;
      line-height: 1.54;
      color: #0D2540;
      font-weight: 600;
      margin: 0 0 12px 0;
    }
    .tbb-buyer-list {
      margin: 0;
      padding-left: 16px;
      font-size: 10.5px;
      line-height: 1.52;
      color: #333333;
    }
    .tbb-buyer-list li { margin-bottom: 6px; }

    /* CÍRCULO DORADO (LÁMINA 04) */
    .tbb-body-grid-goldencircle {
      flex: 1;
      display: grid;
      grid-template-columns: 0.95fr 1.05fr;
      padding: 20px 48px;
      gap: 32px;
      align-items: center;
    }
    .tbb-gc-narrative {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tbb-gc-block {
      border-left: 3px solid #E2E8F0;
      padding: 8px 16px;
      background: #FFFFFF;
    }
    .why-block { border-left-color: #FF7A00; background: #FFFBF5; border-radius: 0 8px 8px 0; }
    .how-block { border-left-color: #426EAE; background: #F8FAFC; border-radius: 0 8px 8px 0; }
    .what-block { border-left-color: #0D2540; background: #F8FAFC; border-radius: 0 8px 8px 0; }
    
    .tbb-gc-tag {
      font-family: 'Montserrat', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.16em;
      margin-bottom: 2px;
    }
    .tbb-tag-why { color: #FF7A00; }
    .tbb-tag-how { color: #426EAE; }
    .tbb-tag-what { color: #0D2540; }
    
    .tbb-gc-h4 {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 800;
      color: #0D2540;
      margin: 2px 0 4px 0;
    }
    .tbb-gc-p {
      font-size: 11px;
      line-height: 1.5;
      color: #333333;
      margin: 0;
    }

    /* PROMESA Y MÁXIMAS (LÁMINA 05) */
    .tbb-mvp-card {
      border-left: 3px solid #0D2540;
      padding: 14px 18px;
      background: #F8FAFC;
      border-radius: 0 8px 8px 0;
      margin-bottom: 16px;
    }
    .tbb-mvp-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.18em;
      color: #FF7A00;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-mvp-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #0D2540;
      line-height: 1.3;
      margin: 0 0 6px 0;
    }
    .tbb-mvp-desc {
      font-size: 11px;
      line-height: 1.48;
      color: #555555;
      margin: 0;
    }
    .tbb-split-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .tbb-split-box {
      border-top: 2px solid #426EAE;
      padding-top: 8px;
    }
    .tbb-box-tag {
      font-family: 'Montserrat', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #426EAE;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-split-box p {
      font-size: 10.5px;
      line-height: 1.45;
      color: #333333;
      margin: 0;
    }
    .tbb-maxims-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tbb-maxim-row {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      font-size: 10.8px;
      line-height: 1.46;
      color: #333333;
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 6px;
    }
    .tbb-m-num {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 900;
      color: #426EAE;
      flex-shrink: 0;
      width: 20px;
    }
  `;
}

// 5. Ejecución y Captura en Playwright
async function runPrototype() {
  console.log("=== COMPILANDO PROTOTIPO V80.0 DE THE BEST BRAND ===");
  const plates = buildMasterPlates();
  const styles = getMasterStyles();

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Prototipo V80.0 · The Best Brand</title>
      <style>${styles}</style>
    </head>
    <body>
      ${plates.join("\n")}
    </body>
    </html>
  `;

  const outHtmlPath = "/tmp/test_brandbook_v80.html";
  fs.writeFileSync(outHtmlPath, fullHtml, "utf-8");
  console.log("✓ HTML escrito en:", outHtmlPath);

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("file://" + outHtmlPath, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Capturar cada lámina individualmente
  for (let i = 1; i <= 5; i++) {
    const selector = "#plate-0" + i;
    const plateElement = await page.$(selector);
    if (plateElement) {
      const outPng = "/tmp/v80_plate_0" + i + ".png";
      await plateElement.screenshot({ path: outPng });
      console.log("✓ Captura Lámina 0" + i + " guardada en: " + outPng);
    }
  }

  await browser.close();
  console.log("=== PROTOTIPO COMPLETADO CON ÉXITO ===");
}

runPrototype();
