(function () {
// =========================================================================
// MOTOR GENERADOR UNIVERSAL DE 30 LÁMINAS V80.0 (DIRECTIVA MAX C-00)
// Generación 100% en Lienzo Claro (#FFFFFF) · Curvas y Vectores Suizos
// =========================================================================

function generateBrandbook30Plates(brand) {
  const pri = brand.colors.pri;
  const sec = brand.colors.sec;
  const acc = brand.colors.acc;
  const darkInk = brand.colors.darkInk || brand.colors.pri;
  const midGray = brand.colors.midGray || "#707070";
  const lightGray = brand.colors.lightGray || "#E6E6E6";
  const softBg = brand.colors.softBg || "#F8FAFC";
  const white = brand.colors.white || "#FFFFFF";

  const bName = brand.name;
  const bUpper = brand.name.toUpperCase();
  const tagline = brand.tagline;
  const giro = brand.giro;
  const buyer = brand.buyer;
  const why = brand.why;
  const how = brand.how;
  const what = brand.what;
  const persona = brand.persona;
  const niza = brand.niza || "Clase Oficial de Registro";
  const tpBefore = brand.tpBefore || [];
  const tpDuring = brand.tpDuring || [];
  const tpAfter = brand.tpAfter || [];
  const priFont = brand.primaryFont || "Montserrat";
  const secFont = brand.secondaryFont || "Avenir Next";
  const pantonePri = brand.colors.pantonePri || "Pantone Spot C";
  const pantoneSec = brand.colors.pantoneSec || "Pantone Spot 2 C";
  const cmykPri = brand.colors.cmykPri || "C:80 M:50 Y:20 K:40";
  const cmykSec = brand.colors.cmykSec || "C:60 M:20 Y:10 K:0";
  const isMultibrand = Boolean(brand.isMultibrand);
  const subbrands = brand.subbrands || [];

  const symCore = brand.svgCore;
  const symCoreNeg = brand.svgCoreNeg;

  const logoSym = (sz = 200) => `
    <svg viewBox="0 0 200 200" width="${sz}" height="${sz}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
      ${symCore}
    </svg>
  `;

  const logoSymNeg = (sz = 200) => `
    <svg viewBox="0 0 200 200" width="${sz}" height="${sz}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
      ${symCoreNeg}
    </svg>
  `;

  const logoHoriz = (sz = 260) => `
    <svg viewBox="0 0 480 110" width="${sz * 1.76}" height="${sz * 0.42}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
      <g transform="translate(-5, 5) scale(0.50)">${symCore}</g>
      <line x1="106" y1="26" x2="106" y2="84" stroke="${lightGray}" stroke-width="1.8"/>
      <text x="122" y="52" font-family="'${priFont}', sans-serif" font-weight="900" font-size="20" fill="${pri}" letter-spacing="1.5">${bUpper.slice(0, 24)}</text>
      <text x="122" y="74" font-family="'${priFont}', sans-serif" font-weight="700" font-size="9" fill="${sec}" letter-spacing="2.2">${tagline.slice(0, 38).toUpperCase()}</text>
    </svg>
  `;

  const logoHorizNeg = (sz = 260) => `
    <svg viewBox="0 0 480 110" width="${sz * 1.76}" height="${sz * 0.42}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
      <g transform="translate(-5, 5) scale(0.50)">${symCoreNeg}</g>
      <line x1="106" y1="26" x2="106" y2="84" stroke="rgba(255,255,255,0.25)" stroke-width="1.8"/>
      <text x="122" y="52" font-family="'${priFont}', sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" letter-spacing="1.5">${bUpper.slice(0, 24)}</text>
      <text x="122" y="74" font-family="'${priFont}', sans-serif" font-weight="700" font-size="9" fill="${sec}" letter-spacing="2.2">${tagline.slice(0, 38).toUpperCase()}</text>
    </svg>
  `;

  const logoVert = (sz = 180) => `
    <svg viewBox="0 0 280 240" width="${sz * 1.16}" height="${sz}" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;">
      <g transform="translate(40, -10) scale(0.68)">${symCore}</g>
      <text x="140" y="180" text-anchor="middle" font-family="'${priFont}', sans-serif" font-weight="900" font-size="18" fill="${pri}" letter-spacing="1.8">${bUpper.slice(0, 24)}</text>
      <text x="140" y="202" text-anchor="middle" font-family="'${priFont}', sans-serif" font-weight="700" font-size="8.8" fill="${sec}" letter-spacing="2.2">${tagline.slice(0, 38).toUpperCase()}</text>
    </svg>
  `;

  const logoSeal = (sz = 170) => `
    <svg viewBox="0 0 240 240" width="${sz}" height="${sz}" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;">
      <defs>
        <path id="sealPath_${brand.slug}" d="M 120,120 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0" fill="none"/>
      </defs>
      <circle cx="120" cy="120" r="112" fill="none" stroke="${pri}" stroke-width="2"/>
      <circle cx="120" cy="120" r="104" fill="none" stroke="${sec}" stroke-width="1" stroke-dasharray="3,3"/>
      <text font-family="'${priFont}', sans-serif" font-weight="800" font-size="8" fill="${pri}" letter-spacing="2.0">
        <textPath href="#sealPath_${brand.slug}" startOffset="50%" text-anchor="middle">
          ${bUpper} • OFFICIAL BRAND SYSTEM •
        </textPath>
      </text>
      <g transform="translate(40, 40) scale(0.40)">${symCore}</g>
    </svg>
  `;

  // Headers y Footers Editoriales Oficiales
  const hdr = (secNum, secTitle, pNum, pTitle) => `
    <header class="tbb-plate-hdr">
      <div class="tbb-hdr-left">
        <span class="tbb-hdr-sec">${secNum} · ${secTitle}</span>
        <h2 class="tbb-hdr-title">${pNum < 10 ? "0" + pNum : pNum}. ${pTitle}</h2>
      </div>
      <div class="tbb-hdr-right">
        <span class="tbb-hdr-brand">${bUpper} · MANUAL OFICIAL DE IDENTIDAD</span>
        <span class="tbb-hdr-num">LÁMINA ${pNum < 10 ? "0" + pNum : pNum} / 30</span>
      </div>
    </header>
  `;

  const ftr = (pNum) => `
    <footer class="tbb-plate-ftr">
      <div class="tbb-ftr-left">
        <span class="tbb-ftr-dot"></span>
        <span class="tbb-ftr-copy">${bUpper} · TODOS LOS DERECHOS RESERVADOS · DIRECTIVA MAX C-00</span>
      </div>
      <div class="tbb-ftr-mid">
        <span>IDENTIDAD</span> · <span>ESTRUCTURA</span> · <span>EJECUCIÓN</span> · <span>GOBERNANZA</span>
      </div>
      <div class="tbb-ftr-right">
        <span>DOCUMENTO OFICIAL EN CURVAS · PÁG. ${pNum < 10 ? "0" + pNum : pNum}</span>
      </div>
    </footer>
  `;

  const plates = [];

  // =========================================================================
  // LÁMINA 01: PORTADA MAESTRA
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-01">
      <div class="tbb-cover-grid">
        <div class="tbb-cover-left">
          <div class="tbb-cover-badge">
            <span class="tbb-badge-bar"></span>
            MANUAL OFICIAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V80.0
          </div>
          <h1 class="tbb-cover-h1">${bUpper}</h1>
          <div class="tbb-cover-tagline">BRAND IDENTITY ATELIER &amp; ALGORITHMIC BRANDBOOK ENGINE</div>
          <div class="tbb-cover-rule"></div>
          
          <p class="tbb-cover-lead">
            Constitución rectora de posicionamiento estratégico, Círculo Dorado, La Empresa como Persona, Ingeniería de Touchpoints y Arquitectura Visual Vectorial en curvas matemáticas para ${bName}.
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
              <p class="tbb-spec-text">${isMultibrand ? "Ecosistema Multimarca: Marca Madre y 4 Submarcas Especializadas." : "Marca Única Monolítica: 100% de la reputación concentrada bajo el nombre oficial de " + bName + "."}</p>
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
              ${logoSym(220)}
            </div>
          </div>
          <div class="tbb-cover-auth">
            <div class="tbb-auth-title">SISTEMA VECTORIAL OFICIAL EN POSITIVO</div>
            <div class="tbb-auth-sub">Lienzo Claro Puro (#FFFFFF) · Navy Blue #0D2540 · Zafiro #426EAE · Naranja #FF7A00</div>
          </div>
        </div>
      </div>
      ${ftr(1)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 02: ÍNDICE METODOLÓGICO Y MAPA DE 30 LÁMINAS
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-02">
      ${hdr("SECCIÓN 01", "INTRODUCCIÓN Y ARQUITECTURA METODOLÓGICA", 2, "Índice Metodológico y Mapa de 30 Láminas")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-narrative">
          <div class="tbb-kicker">DEL CAOS AL SISTEMA</div>
          <h3 class="tbb-h3">Una Estructura en 7 Fases para Construir Valor Patrimonial</h3>
          <p class="tbb-p">
            Este manual no es un folleto decorativo ni una plantilla genérica. Es la constitución técnica y documental de <strong>${bName}</strong>.
            Está concebido para operar bajo la <strong>Directiva Max C-00</strong>: todo sobre lienzo blanco (#FFFFFF), con tipografía jerárquica de alta legibilidad, curvas matemáticas exactas y cero ornamentos superfluos.
          </p>
          <div class="tbb-callout-quote">
            <p>«El diseño de marca no consiste en decorar una empresa; consiste en dotarla de un sistema rector que reduzca la fricción diaria y multiplique su valor de mercado.»</p>
            <cite>— Metodología The Best Brand · Inspirada en Al Ries &amp; Massimo Vignelli</cite>
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
      ${ftr(2)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 03: MANIFIESTO FUNDACIONAL (DEL CAOS AL SISTEMA)
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-03">
      ${hdr("SECCIÓN 01", "INTRODUCCIÓN Y ARQUITECTURA METODOLÓGICA", 3, "Manifiesto Fundacional: Del Caos al Sistema")}
      <div class="tbb-body-grid-manifesto">
        <div class="tbb-manifesto-core">
          <div class="tbb-kicker">NUESTRA TESIS FUNDACIONAL</div>
          <h3 class="tbb-manifesto-h3">«El tiempo mental del líder es el recurso más valioso de cualquier organización.»</h3>
          <p class="tbb-manifesto-p">
            Durante décadas, las agencias de publicidad tradicionales han cobrado fortunas y tardado meses enteros en entregar documentos decorativos que nadie aplica. En el otro extremo, las aplicaciones automatizadas generan logotipos genéricos que carecen de estrategia, propósito y rigor constructivo.
          </p>
          <p class="tbb-manifesto-p">
            <strong>${bName}</strong> nace para operar con excelencia en ${giro.slice(0, 60)}. Unimos la convicción de un equipo apasionado con el rigor técnico y metodológico de la Directiva Max C-00. En cuestión de minutos, transformamos la intuición del empresario en una constitución de marca de 30 láminas lista para operar con certeza legal y excelencia visual.
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
            <div class="tbb-buyer-role">${bUpper} · CLIENTE IDEAL</div>
            <p class="tbb-buyer-desc">
              ${buyer}
            </p>
            <ul class="tbb-buyer-list">
              <li><strong>Su Dolor Principal:</strong> Cansados de procesos lentos, cotizaciones infladas y entregables que no resuelven la operación diaria de su equipo.</li>
              <li><strong>Su Deseo Nuclear:</strong> Tener una identidad de autoridad incuestionable que transmita la calidad de su servicio antes de abrir la boca.</li>
              <li><strong>Su Victoria con Nosotros:</strong> Un Manual Oficial de 30 Láminas en Curvas entregado en minutos con calidad de agencia internacional.</li>
            </ul>
          </div>
        </div>
      </div>
      ${ftr(3)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 04: EL CÍRCULO DORADO (WHY · HOW · WHAT)
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-04">
      ${hdr("SECCIÓN 02", "PROPÓSITO CENTRAL Y ADN DE MARCA", 4, "El Círculo Dorado (WHY · HOW · WHAT)")}
      <div class="tbb-body-grid-goldencircle">
        <div class="tbb-gc-diagram-wrap">
          <svg viewBox="0 0 440 380" width="100%" height="340">
            <!-- 3 Círculos Concéntricos Puros -->
            <circle cx="200" cy="190" r="160" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.8"/>
            <text x="200" y="58" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="12" fill="#0D2540" letter-spacing="2.4">WHAT · QUÉ ENTREGAMOS</text>
            <text x="200" y="74" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="9" fill="#707070">Manual 30 Láminas + Identidad Vectorial</text>
            
            <circle cx="200" cy="190" r="108" fill="#EFF6FF" stroke="#426EAE" stroke-width="2.2" stroke-dasharray="6,4"/>
            <text x="200" y="114" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="12" fill="#426EAE" letter-spacing="2.0">HOW · CÓMO LO HACEMOS</text>
            <text x="200" y="130" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="8.8" fill="#426EAE">Metodología 7 Pasos + Motor Algorítmico</text>
            
            <circle cx="200" cy="190" r="54" fill="#0D2540" stroke="#FF7A00" stroke-width="3"/>
            <text x="200" y="186" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="16" fill="#FFFFFF" letter-spacing="2.0">WHY</text>
            <text x="200" y="204" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8.5" fill="#FF7A00" letter-spacing="1.5">PROPÓSITO</text>

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
          <div class="tbb-gc-block why-block">
            <div class="tbb-gc-tag tbb-tag-why">01 · WHY (EL PROPÓSITO CENTRAL · LA CREENCIA)</div>
            <h4 class="tbb-gc-h4">Por Qué Existimos</h4>
            <p class="tbb-gc-p">
              Creemos apasionadamente que todo empresario merece una marca de nivel mundial sin tener que pagar precios exorbitantes ni esperar meses a que una agencia entienda su negocio. Existimos para <strong>liberar tiempo mental al líder</strong> y transformar su visión en un activo tangible de alto valor.
            </p>
          </div>

          <div class="tbb-gc-block how-block">
            <div class="tbb-gc-tag tbb-tag-how">02 · HOW (EL MÉTODO DIFERENCIADOR · EL SISTEMA)</div>
            <h4 class="tbb-gc-h4">Cómo Hacemos Realidad esa Promesa</h4>
            <p class="tbb-gc-p">
              A través de <strong>Aura</strong>, nuestra mentora conversacional con inteligencia artificial, guiamos al usuario paso a paso por 7 etapas estratégicas. A partir de sus respuestas, nuestro <strong>motor de geometría algorítmica</strong> genera identidades vectoriales únicas en curvas y maquetación editorial adaptada a su industria sin usar plantillas fijas.
            </p>
          </div>

          <div class="tbb-gc-block what-block">
            <div class="tbb-gc-tag tbb-tag-what">03 · WHAT (LA ENTREGA TANGIBLE · LA SOLUCIÓN)</div>
            <h4 class="tbb-gc-h4">Qué Entregamos al Mercado con Excelencia</h4>
            <p class="tbb-gc-p">
              Un <strong>Manual Oficial de Marca de 30 Láminas en Curvas Vectoriales (.PDF)</strong> listo para imprenta y uso digital, acompañado del paquete completo de isotipos, retículas, paletas certificadas y estándares de gobernanza que protegen el prestigio de la empresa para siempre.
            </p>
          </div>
        </div>
      </div>
      ${ftr(4)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 05: PROMESA, MISIÓN, VISIÓN Y LAS 6 MÁXIMAS
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-05">
      ${hdr("SECCIÓN 02", "PROPÓSITO CENTRAL Y ADN DE MARCA", 5, "Promesa de Marca, Misión, Visión y 6 Máximas")}
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
      ${ftr(5)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 06: LOS 6 PRINCIPIOS INNEGOCIABLES
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-06">
      ${hdr("SECCIÓN 02", "PROPÓSITO CENTRAL Y ADN DE MARCA", 6, "Los 6 Principios Innegociables")}
      <div class="tbb-body-grid-principles">
        <div class="tbb-principle-card">
          <div class="tbb-p-head"><span class="tbb-p-badge">PRINCIPIO 01</span><h4>Cero Plantillas Gráficas</h4></div>
          <p>Rechazamos los cascarones prediseñados de Canva o constructores genéricos. Toda marca se genera desde su ADN nuclear y su propio índice.</p>
        </div>
        <div class="tbb-principle-card">
          <div class="tbb-p-head"><span class="tbb-p-badge">PRINCIPIO 02</span><h4>100% Lienzo Claro</h4></div>
          <p>Nuestra directiva cromática C-00 exige fondos blancos puros (#FFFFFF) para máxima legibilidad, elegancia editorial y ahorro de impresión.</p>
        </div>
        <div class="tbb-principle-card">
          <div class="tbb-p-head"><span class="tbb-p-badge">PRINCIPIO 03</span><h4>Vectores en Curvas Puras</h4></div>
          <p>Todos los isotipos, retículas y diagramas se entregan en SVG y PDF vectorial nativo de alta resolución, listos para offset o serigrafía.</p>
        </div>
        <div class="tbb-principle-card">
          <div class="tbb-p-head"><span class="tbb-p-badge">PRINCIPIO 04</span><h4>La Empresa como Persona</h4></div>
          <p>Una marca no es un logo; es un carácter humano vivo. Definimos arquetipo, voz, tono y presencia real antes de elegir una tipografía.</p>
        </div>
        <div class="tbb-principle-card">
          <div class="tbb-p-head"><span class="tbb-p-badge">PRINCIPIO 05</span><h4>Touchpoints de Verdad</h4></div>
          <p>Mapeamos la experiencia real del cliente en 3 tiempos: Antes, Durante y Después de la compra, con estándares de servicio verificables.</p>
        </div>
        <div class="tbb-principle-card">
          <div class="tbb-p-head"><span class="tbb-p-badge">PRINCIPIO 06</span><h4>Propiedad Total del Cliente</h4></div>
          <p>El cliente es dueño absoluto de sus archivos vectoriales, derechos de autor y manual oficial, sin suscripciones forzosas ni candados.</p>
        </div>
      </div>
      ${ftr(6)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 07: LA EMPRESA COMO PERSONA
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-07">
      ${hdr("SECCIÓN 02", "PROPÓSITO CENTRAL Y ADN DE MARCA", 7, "La Empresa como Persona: Carácter y 4 Facetas")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-radar">
          <div class="tbb-kicker">ARQUETIPO NUCLEAR</div>
          <h3 class="tbb-h3">El Arquitecto de Identidades &amp; Socio Leal</h3>
          <p class="tbb-p">
            Si <strong>${bName}</strong> fuera una persona de carne y hueso: <em>«${persona}»</em>.
          </p>
          
          <div class="tbb-persona-radar-wrap">
            <svg viewBox="0 0 320 280" width="100%" height="240">
              <!-- Radar Hexagonal de Personalidad -->
              <polygon points="160,20 264,80 264,200 160,260 56,200 56,80" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
              <polygon points="160,50 238,95 238,185 160,230 82,185 82,95" fill="none" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3,3"/>
              
              <!-- Ejes -->
              <line x1="160" y1="20" x2="160" y2="260" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="56" y1="80" x2="264" y2="200" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="56" y1="200" x2="264" y2="80" stroke="#CBD5E1" stroke-width="1"/>
              
              <!-- Polígono Activo (The Best Brand Profile) -->
              <polygon points="160,32 254,88 248,192 160,245 70,188 68,88" fill="rgba(66,110,174,0.18)" stroke="#0D2540" stroke-width="2.5"/>
              <circle cx="160" cy="32" r="4.5" fill="#FF7A00"/>
              <circle cx="254" cy="88" r="4.5" fill="#426EAE"/>
              <circle cx="248" cy="192" r="4.5" fill="#0D2540"/>
              <circle cx="160" cy="245" r="4.5" fill="#426EAE"/>
              <circle cx="70" cy="188" r="4.5" fill="#0D2540"/>
              <circle cx="68" cy="88" r="4.5" fill="#426EAE"/>

              <!-- Etiquetas de los 6 Vértices -->
              <text x="160" y="12" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#0D2540">RIGOR TÉCNICO (95%)</text>
              <text x="274" y="80" text-anchor="start" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#426EAE">CLARIDAD (92%)</text>
              <text x="274" y="205" text-anchor="start" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#0D2540">AGILIDAD (94%)</text>
              <text x="160" y="275" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#426EAE">CALIDEZ (88%)</text>
              <text x="46" y="205" text-anchor="end" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#0D2540">SEGURIDAD (96%)</text>
              <text x="46" y="80" text-anchor="end" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#426EAE">INNOVACIÓN (90%)</text>
            </svg>
          </div>
        </div>

        <div class="tbb-col-facets">
          <div class="tbb-kicker">LAS 4 FACETAS DE CONDUCTA</div>
          <h3 class="tbb-h3">Cómo se Comporta en Vivo</h3>
          
          <div class="tbb-facets-list">
            <div class="tbb-facet-item">
              <div class="tbb-facet-title"><span class="tbb-f-dot"></span>01 · El Estratega Lúcido</div>
              <p>Habla con datos y modelos probados. Traduce la confusión y el desorden en un plan de acción estructurado con entregables tangibles.</p>
            </div>
            <div class="tbb-facet-item">
              <div class="tbb-facet-title"><span class="tbb-f-dot"></span>02 · El Diseñador Riguroso</div>
              <p>Respeta la geometría, la proporción áurea y la tipografía suiza. No tolera curvas rotas, textos desalineados ni logos pixelados.</p>
            </div>
            <div class="tbb-facet-item">
              <div class="tbb-facet-title"><span class="tbb-f-dot"></span>03 · El Mentor Empático (Aura)</div>
              <p>Acompaña con paciencia y calidez. Escucha cada duda del usuario y celebra cada paso completado sin condescendencia.</p>
            </div>
            <div class="tbb-facet-item">
              <div class="tbb-facet-title"><span class="tbb-f-dot"></span>04 · El Facilitador Pragmático</div>
              <p>Valora la velocidad y la eficiencia. Entrega archivos que la imprenta, el programador web y el equipo de marketing pueden usar de inmediato.</p>
            </div>
          </div>
        </div>
      </div>
      ${ftr(7)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 08: VOZ, TONO Y ATRIBUTOS FUNDAMENTALES
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-08">
      ${hdr("SECCIÓN 02", "PROPÓSITO CENTRAL Y ADN DE MARCA", 8, "Voz, Tono y Calibración Lingüística")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-sliders">
          <div class="tbb-kicker">CALIBRACIÓN KANSEI</div>
          <h3 class="tbb-h3">Espectro Tonal en 4 Dimensiones</h3>
          <p class="tbb-p">
            Nuestra voz es consistente, pero nuestro tono se adapta con naturalidad según el contexto: didáctico en el tutorial, empático en la conversación y ejecutivo en la entrega final.
          </p>

          <div class="tbb-sliders-list">
            <div class="tbb-slider-box">
              <div class="tbb-sl-hdr"><span>01 · CERCANÍA VS DISTANCIA</span><span class="tbb-sl-val">75% Cercano</span></div>
              <div class="tbb-sl-bar"><div class="tbb-sl-fill" style="width:75%;"></div><div class="tbb-sl-knob" style="left:75%;"></div></div>
              <div class="tbb-sl-labels"><span>Cálido y Socio Leal</span><span>Corporativo Frío</span></div>
            </div>
            <div class="tbb-slider-box">
              <div class="tbb-sl-hdr"><span>02 · AUTORIDAD VS ARROGANCIA</span><span class="tbb-sl-val">85% Seguro</span></div>
              <div class="tbb-sl-bar"><div class="tbb-sl-fill" style="width:85%;"></div><div class="tbb-sl-knob" style="left:85%;"></div></div>
              <div class="tbb-sl-labels"><span>Fuerza Tranquila</span><span>Prepotencia de Agencia</span></div>
            </div>
            <div class="tbb-slider-box">
              <div class="tbb-sl-hdr"><span>03 · SIMPLICIDAD VS JERGA</span><span class="tbb-sl-val">90% Claro</span></div>
              <div class="tbb-sl-bar"><div class="tbb-sl-fill" style="width:90%;"></div><div class="tbb-sl-knob" style="left:90%;"></div></div>
              <div class="tbb-sl-labels"><span>Español Ejecutivo Limpio</span><span>Tecnicismos Innecesarios</span></div>
            </div>
            <div class="tbb-slider-box">
              <div class="tbb-sl-hdr"><span>04 · ENFOQUE PRAGMÁTICO</span><span class="tbb-sl-val">95% Acción</span></div>
              <div class="tbb-sl-bar"><div class="tbb-sl-fill" style="width:95%;"></div><div class="tbb-sl-knob" style="left:95%;"></div></div>
              <div class="tbb-sl-labels"><span>Soluciones y Resultados</span><span>Humo Publicitario</span></div>
            </div>
          </div>
        </div>

        <div class="tbb-col-dosdonts">
          <div class="tbb-kicker">GUÍA PRÁCTICA DE REDACCIÓN</div>
          <h3 class="tbb-h3">Do's &amp; Don'ts de Lenguaje Oficial</h3>
          
          <div class="tbb-dosdonts-grid">
            <div class="tbb-dos-card">
              <div class="tbb-dd-head tbb-dd-yes">✓ CÓMO HABLAMOS (SÍ)</div>
              <ul>
                <li>«Tu marca queda lista para operar hoy mismo con certeza legal.»</li>
                <li>«Diseñamos sistemas que reducen la fricción y liberan tu tiempo.»</li>
                <li>«La metodología toma 7 pasos y tienes el control total en cada decisión.»</li>
                <li>«Explicamos la geometría con sencillez y entregamos en curvas puras.»</li>
              </ul>
            </div>
            <div class="tbb-donts-card">
              <div class="tbb-dd-head tbb-dd-no">✗ QUÉ EVITAMOS (NO)</div>
              <ul>
                <li>«Somos una agencia disruptiva holística 360 multi-touch.»</li>
                <li>«Tardaremos 6 semanas en idear el primer concepto creativo.»</li>
                <li>«Tu logotipo requiere que compres nuestra suscripción mensual.»</li>
                <li>«No podemos darte los archivos vectoriales abiertos.»</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      ${ftr(8)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 09: MAPA DEL VIAJE DEL CLIENTE (CUSTOMER JOURNEY)
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-09">
      ${hdr("SECCIÓN 03", "INGENIERÍA DE TOUCHPOINTS", 9, "Mapa Integral del Viaje del Cliente")}
      <div class="tbb-body-grid-journey">
        <div class="tbb-journey-intro">
          <div class="tbb-kicker">METODOLOGÍA ANTES · DURANTE · DESPUÉS</div>
          <h3 class="tbb-h3">La Experiencia End-to-End de ${bName}</h3>
          <p class="tbb-p">
            La reputación de una marca no se juega únicamente en su logotipo; se valida en cada interacción humana y digital. Mapeamos 12 puntos de contacto críticos organizados cronológicamente para garantizar una experiencia sin fisuras.
          </p>
        </div>

        <div class="tbb-journey-timeline">
          <div class="tbb-jt-stage">
            <div class="tbb-jt-pill tbb-pill-before">FASE 01 · ANTES DE COMPRAR</div>
            <h4>Descubrimiento y Confianza</h4>
            <p>El cliente conoce ${bName} a través de canales oficiales y contenido de valor, prueba el demo interactivo sin barreras de pago y escucha la mentoría de Aura.</p>
            <div class="tbb-jt-points">
              <span>01. Landing de Alta Conversión</span>
              <span>02. Demostración en Vivo Gratis</span>
              <span>03. Video Guiado por Voz</span>
              <span>04. Recomendación y Autoridad</span>
            </div>
          </div>

          <div class="tbb-jt-arrow">→</div>

          <div class="tbb-jt-stage">
            <div class="tbb-jt-pill tbb-pill-during">FASE 02 · DURANTE LA COMPRA</div>
            <h4>Atelier Conversacional</h4>
            <p>El cliente interactúa con Aura en 7 pasos, calibra su estilo visual en tiempo real y realiza un checkout transparente de $49 USD sin letra chica.</p>
            <div class="tbb-jt-points">
              <span>05. Entrevista Paso 0 al 2</span>
              <span>06. Selección de Nombre y Niza</span>
              <span>07. Calibración de Geometría</span>
              <span>08. Pasarela Directa con Stripe</span>
            </div>
          </div>

          <div class="tbb-jt-arrow">→</div>

          <div class="tbb-jt-stage">
            <div class="tbb-jt-pill tbb-pill-after">FASE 03 · DESPUÉS DE COMPRAR</div>
            <h4>Entrega y Gobernanza</h4>
            <p>El cliente descarga de inmediato su Manual de 30 Láminas en Curvas (.PDF), su kit vectorial de isotipos y mantiene acceso a su portal de por vida.</p>
            <div class="tbb-jt-points">
              <span>09. Generación PDF en 0.3s</span>
              <span>10. Kit de Isotipos en Curvas</span>
              <span>11. Bóveda Digital Permanente</span>
              <span>12. Encuesta de Satisfacción</span>
            </div>
          </div>
        </div>
      </div>
      ${ftr(9)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 10: TOUCHPOINTS ANTES DE COMPRAR
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-10">
      ${hdr("SECCIÓN 03", "INGENIERÍA DE TOUCHPOINTS", 10, "Touchpoints ANTES de Comprar")}
      <div class="tbb-body-grid-tp4">
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-01</span>
          <h4>Punto de Descubrimiento</h4>
          <div class="tbb-tp-meta">Fase 1 · Atracción &amp; Presencia</div>
          <p>${tpBefore[0] || 'Presencia de marca y contenido de valor en canales clave.'}</p>
          <div class="tbb-tp-rule">Estándar: Claridad conceptual, diseño impecable y mensaje memorable.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-02</span>
          <h4>Interacción Inicial</h4>
          <div class="tbb-tp-meta">Fase 1 · Primer Contacto</div>
          <p>${tpBefore[1] || 'Atención personalizada y exploración del requerimiento del cliente.'}</p>
          <div class="tbb-tp-rule">Estándar: Respuesta ágil en &lt; 24h y trato cercano y transparente.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-03</span>
          <h4>Demostración de Calidad</h4>
          <div class="tbb-tp-meta">Fase 1 · Evidencia &amp; Confianza</div>
          <p>${tpBefore[2] || 'Demostración de capacidades, catálogo y testimonios verificables.'}</p>
          <div class="tbb-tp-rule">Estándar: Muestras de trabajo real y certeza técnica sin humo publicitario.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-04</span>
          <h4>Decisión y Presupuesto</h4>
          <div class="tbb-tp-meta">Fase 1 · Propuesta Formal</div>
          <p>${tpBefore[3] || 'Cotización formal detallada y términos de servicio sin sorpresas.'}</p>
          <div class="tbb-tp-rule">Estándar: Precios claros, compromisos de entrega y alcances firmes.</div>
        </div>
      </div>
      ${ftr(10)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 11: TOUCHPOINTS DURANTE LA COMPRA
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-11">
      ${hdr("SECCIÓN 03", "INGENIERÍA DE TOUCHPOINTS", 11, "Touchpoints DURANTE la Compra")}
      <div class="tbb-body-grid-tp4">
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-05</span>
          <h4>Bienvenida y Arranque</h4>
          <div class="tbb-tp-meta">Fase 2 · Inicio del Servicio</div>
          <p>${tpDuring[0] || 'Recepción cálida y confirmación detallada del plan de trabajo.'}</p>
          <div class="tbb-tp-rule">Estándar: Entrega puntual de accesos, muestras o diagnóstico de inicio.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-06</span>
          <h4>Ejecución y Proceso</h4>
          <div class="tbb-tp-meta">Fase 2 · Operación &amp; Desarrollo</div>
          <p>${tpDuring[1] || 'Ejecución técnica rigurosa cumpliendo los más altos estándares.'}</p>
          <div class="tbb-tp-rule">Estándar: Calidad artesanal e ingeniería de precisión en cada etapa.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-07</span>
          <h4>Acompañamiento en Vivo</h4>
          <div class="tbb-tp-meta">Fase 2 · Interacción Continua</div>
          <p>${tpDuring[2] || 'Comunicación fluida y resolución inmediata de cualquier inquietud.'}</p>
          <div class="tbb-tp-rule">Estándar: Canal directo de comunicación y acompañamiento hombro a hombro.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-08</span>
          <h4>Entrega y Cobro Claro</h4>
          <div class="tbb-tp-meta">Fase 2 · Transacción &amp; Entrega</div>
          <p>${tpDuring[3] || 'Facturación transparente y entrega del producto o servicio contratado.'}</p>
          <div class="tbb-tp-rule">Estándar: Transacción sin fricciones, comprobante digital y satisfacción total.</div>
        </div>
      </div>
      ${ftr(11)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 12: TOUCHPOINTS DESPUÉS DE COMPRAR
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-12">
      ${hdr("SECCIÓN 03", "INGENIERÍA DE TOUCHPOINTS", 12, "Touchpoints DESPUÉS de Comprar")}
      <div class="tbb-body-grid-tp4">
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-09</span>
          <h4>Entrega Documental y Activos</h4>
          <div class="tbb-tp-meta">Fase 3 · Entrega Oficial</div>
          <p>${tpAfter[0] || 'Entrega de manuales, certificados y archivos finales listos para operar.'}</p>
          <div class="tbb-tp-rule">Estándar: Documentación en curvas de alta resolución y propiedad absoluta.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-10</span>
          <h4>Garantía y Monitoreo</h4>
          <div class="tbb-tp-meta">Fase 3 · Soporte Post-Venta</div>
          <p>${tpAfter[1] || 'Monitoreo de resultados y respaldo de garantía activa sin trabas.'}</p>
          <div class="tbb-tp-rule">Estándar: Respuesta en &lt; 2 horas y solución efectiva garantizada.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-11</span>
          <h4>Comunidad y Lealtad</h4>
          <div class="tbb-tp-meta">Fase 3 · Relación a Largo Plazo</div>
          <p>${tpAfter[2] || 'Acceso preferente a nuevos productos, lanzamientos y beneficios exclusivos.'}</p>
          <div class="tbb-tp-rule">Estándar: Trato de socio leal y recompensas tangibles por lealtad.</div>
        </div>
        <div class="tbb-tp-card">
          <span class="tbb-tp-num">TP-12</span>
          <h4>Evaluación y Mejora</h4>
          <div class="tbb-tp-meta">Fase 3 · Evolución Continua</div>
          <p>${tpAfter[3] || 'Encuesta ejecutiva de satisfacción para perfeccionar cada detalle.'}</p>
          <div class="tbb-tp-rule">Estándar: Escucha activa e incorporación inmediata de retroalimentación.</div>
        </div>
      </div>
      ${ftr(12)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 13: NAMING ESTRATÉGICO Y CLASES DE NIZA
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-13">
      ${hdr("SECCIÓN 04", "SISTEMA DE IDENTIDAD Y LOGOTIPOS", 13, "Naming Estratégico y Clases de Niza")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-naming">
          <div class="tbb-kicker">ANÁLISIS MORFOLÓGICO Y SEMIÓTICO</div>
          <h3 class="tbb-h3">«${bUpper}»</h3>
          <p class="tbb-p">
            Un nombre anglosajón universal, directo y asertivo que posiciona de inmediato a la plataforma en la cúspide de su categoría. No deja dudas sobre el estándar de calidad ni sobre el resultado final que obtiene el cliente.
          </p>

          <div class="tbb-smile-matrix">
            <div class="tbb-smile-item">
              <span class="tbb-s-letter">S</span>
              <div><strong>Suggestive:</strong> Evoca liderazgo, excelencia indiscutible y autoridad sin rodeos.</div>
            </div>
            <div class="tbb-smile-item">
              <span class="tbb-s-letter">M</span>
              <div><strong>Memorable:</strong> Estructura monosilábica y bisilábica de altísima fijación mental.</div>
            </div>
            <div class="tbb-smile-item">
              <span class="tbb-s-letter">I</span>
              <div><strong>Imagery:</strong> Proyecta la imagen de un atelier suizo y un sello de certificación de oro.</div>
            </div>
            <div class="tbb-smile-item">
              <span class="tbb-s-letter">L</span>
              <div><strong>Legs:</strong> Permite escalar a sub-productos y herramientas sin perder coherencia.</div>
            </div>
            <div class="tbb-smile-item">
              <span class="tbb-s-letter">E</span>
              <div><strong>Emotional:</strong> Otorga orgullo patrimonial al empresario al ver su marca construida.</div>
            </div>
          </div>
        </div>

        <div class="tbb-col-niza">
          <div class="tbb-kicker">PROTECCIÓN MARCARIA INTERNACIONAL</div>
          <h3 class="tbb-h3">Clasificación de Niza para Registro</h3>
          
          <div class="tbb-niza-cards">
            <div class="tbb-niza-box">
              <div class="tbb-nb-hdr">CLASE NIZA 42 · SERVICIOS CIENTÍFICOS Y TECNOLÓGICOS</div>
              <p>Software como servicio (SaaS), provisión de plataformas en la nube con inteligencia artificial para diseño gráfico algorítmico, generación automatizada de manuales de marca y desarrollo de identidades visuales digitales.</p>
            </div>
            <div class="tbb-niza-box">
              <div class="tbb-nb-hdr">CLASE NIZA 35 · PUBLICIDAD Y GESTIÓN DE NEGOCIOS</div>
              <p>Asesoría estratégica de branding, posicionamiento corporativo, creación de identidad de marca para empresas, consultoría en experiencia del cliente y marketing de touchpoints.</p>
            </div>
            <div class="tbb-niza-box">
              <div class="tbb-nb-hdr">CLASE NIZA 09 · SOFTWARE Y APLICACIONES INFORMÁTICAS</div>
              <p>Programas informáticos descargables y motores de procesamiento gráfico vectorial para creación, renderizado y exportación de documentos de identidad visual y especificaciones técnicas de imprenta.</p>
            </div>
          </div>
        </div>
      </div>
      ${ftr(13)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 14: ARQUITECTURA DE MARCA ÚNICA (MONOLÍTICA)
  // =========================================================================
  plates.push(`
        <article class="tbb-plate" id="plate-14">
      ${hdr("SECCIÓN 04", "SISTEMA DE IDENTIDAD Y LOGOTIPOS", 14, isMultibrand ? "Arquitectura Multimarca y Ecosistema de Submarcas" : "Arquitectura de Marca Monolítica y Extensiones")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-narrative">
          <div class="tbb-kicker">${isMultibrand ? "ARQUITECTURA ENDOSADA MULTIMARCA" : "MARCA ÚNICA (MASTER BRAND)"}</div>
          <h3 class="tbb-h3">${isMultibrand ? "Ecosistema Homologado con 4 Submarcas Especializadas" : "Estructura Monolítica de Alta Concentración"}</h3>
          <p class="tbb-p">
            ${isMultibrand
              ? `El grupo opera bajo la Directiva Max C-00 con una Marca Rectora sólida (<strong>${bName}</strong>) que transfiere autoridad y respaldo patrimonial a sus 4 divisiones de negocio especializadas. Cada submarca conserva el logotipo central y añade su descriptor homologado en color <strong>#FF7A00</strong>.`
              : `<strong>${bName}</strong> opera bajo una arquitectura monolítica donde todos los productos, servicios y touchpoints se firman directamente con la marca maestra. Esto maximiza la inversión publicitaria, previene la dispersión visual y genera autoridad acumulativa inmediata.`}
          </p>
          <div class="tbb-callout-quote">
            <p>«La coherencia arquitectónica es el escudo más poderoso contra la confusión del cliente en el mercado.»</p>
            <cite>— Directiva Max C-00 · ImproBears</cite>
          </div>
        </div>

        <div class="tbb-col-diagram">
          ${isMultibrand && subbrands.length >= 4 ? `
            <div style="display:flex; flex-direction:column; gap:12px; height:100%; justify-content:center;">
              ${subbrands.map((sub, sIdx) => `
                <div style="background:#FAF8F5; border:1px solid #E6E6E6; border-left:4px solid ${sub.color || sec}; border-radius:8px; padding:12px 18px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-family:'${priFont}', sans-serif; font-size:12px; font-weight:900; color:${pri}; letter-spacing:0.08em;">${sub.name}</div>
                    <div style="font-family:'Montserrat', sans-serif; font-size:8px; font-weight:800; color:#FF7A00; letter-spacing:0.12em; margin-top:2px;">${sub.descriptor}</div>
                    <div style="font-family:'Plus Jakarta Sans', sans-serif; font-size:8.5px; color:#555555; margin-top:4px;">${sub.focus}</div>
                  </div>
                  <div style="width:36px; height:36px; flex-shrink:0;">${logoSym(36)}</div>
                </div>
              `).join("")}
            </div>
          ` : `
            <div class="tbb-arch-monolith-box">
              <div class="tbb-mono-master">
                <span class="tbb-mono-tag">MARCA RECTORA</span>
                <h4>${bUpper}</h4>
                <p>Identidad Maestra Oficial</p>
              </div>
              <div class="tbb-mono-connector">↓</div>
              <div class="tbb-mono-sub-row">
                <div class="tbb-mono-sub">
                  <h5>Línea Signature</h5>
                  <p>Soluciones Premium</p>
                </div>
                <div class="tbb-mono-sub">
                  <h5>Línea Enterprise</h5>
                  <p>Cuentas Corporativas</p>
                </div>
                <div class="tbb-mono-sub">
                  <h5>Línea Atelier</h5>
                  <p>Proyectos de Autor</p>
                </div>
              </div>
            </div>
          `}
        </div>
      </div>
      ${ftr(14)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 15: ANATOMÍA DEL ISOTIPO MAESTRO
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-15">
      ${hdr("SECCIÓN 04", "SISTEMA DE IDENTIDAD Y LOGOTIPOS", 15, "Anatomía Semiótica del Isotipo Maestro")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-emblem-anatomy">
          <div class="tbb-anatomy-svg-stage">
            <svg viewBox="0 0 340 340" width="100%" height="320">
              <!-- Guías de construcción y cotas de anatomía -->
              <circle cx="170" cy="170" r="148" fill="none" stroke="#E2E8F0" stroke-width="1.5"/>
              <circle cx="170" cy="170" r="105" fill="none" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4"/>
              <circle cx="170" cy="170" r="48" fill="none" stroke="#E2E8F0" stroke-width="1"/>
              
              <!-- Ejes Ortogonales y Diagonales a 45° -->
              <line x1="170" y1="10" x2="170" y2="330" stroke="#4C9DE6" stroke-width="1" stroke-dasharray="4,2"/>
              <line x1="10" y1="170" x2="330" y2="170" stroke="#4C9DE6" stroke-width="1" stroke-dasharray="4,2"/>
              <line x1="56" y1="56" x2="284" y2="284" stroke="#4C9DE6" stroke-width="1" stroke-dasharray="4,2"/>
              <line x1="284" y1="56" x2="56" y2="284" stroke="#4C9DE6" stroke-width="1" stroke-dasharray="4,2"/>

              <!-- Isotipo -->
              <g transform="translate(70, 70)">
                ${symCore}
              </g>

              <!-- Cotas y llamadas técnicas -->
              <circle cx="170" cy="94" r="3" fill="#FF7A00"/>
              <line x1="170" y1="94" x2="280" y2="60" stroke="#FF7A00" stroke-width="1.2"/>
              <text x="286" y="63" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8.5" fill="#0D2540">ALA AZUL (RIGOR & IA)</text>

              <circle cx="218" cy="122" r="3" fill="#426EAE"/>
              <line x1="218" y1="122" x2="290" y2="122" stroke="#426EAE" stroke-width="1.2"/>
              <text x="296" y="125" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8.5" fill="#426EAE">ALA NARANJA (FACTOR HUMANO)</text>

              <circle cx="170" cy="170" r="3" fill="#FF7A00"/>
              <line x1="170" y1="170" x2="90" y2="240" stroke="#FF7A00" stroke-width="1.2"/>
              <text x="84" y="243" text-anchor="end" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8.5" fill="#FF7A00">NÚCLEO CENTRAL (TB)</text>
            </svg>
          </div>
        </div>

        <div class="tbb-col-anatomy-text">
          <div class="tbb-kicker">GEOMETRÍA Y FILOSOFÍA FORMAL</div>
          <h3 class="tbb-h3">Alas de Convergencia & Núcleo Central TB</h3>
          
          <div class="tbb-anatomy-breakdown">
            <div class="tbb-ab-item">
              <span class="tbb-ab-num">01</span>
              <div>
                <strong>El Ala Azul Izquierda (Tecnología &amp; Rigor):</strong> Representa el motor de inteligencia algorítmica, las curvas matemáticas Bézier y la solidez estructural en Deep Navy y Zafiro Corporativo.
              </div>
            </div>
            <div class="tbb-ab-item">
              <span class="tbb-ab-num">02</span>
              <div>
                <strong>El Ala Naranja Derecha (Creatividad &amp; Factor Humano):</strong> Encarna la calidez de socio leal, la mentoría socrática de Aura y la energía transformadora de la marca en Naranja Acento (#FF7A00).
              </div>
            </div>
            <div class="tbb-ab-item">
              <span class="tbb-ab-num">03</span>
              <div>
                <strong>El Núcleo Central Monograma TB &amp; Estrella Guía:</strong> Escudo protector en Deep Navy con las iniciales TB en blanco de alta legibilidad, custodiado por la Estrella Polar de excelencia creativa.
              </div>
            </div>
          </div>
        </div>
      </div>
      ${ftr(15)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 16: DISPOSICIÓN PRIMARIA (HORIZONTAL)
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-16">
      ${hdr("SECCIÓN 04", "SISTEMA DE IDENTIDAD Y LOGOTIPOS", 16, "Disposición Primaria del Logotipo (Horizontal)")}
      <div class="tbb-body-display-stage">
        <div class="tbb-display-hero">
          ${logoHoriz(320)}
        </div>

        <div class="tbb-display-specs-grid">
          <div class="tbb-ds-col">
            <span class="tbb-ds-title">CASO DE USO PRINCIPAL</span>
            <p>Cabeceras web, papelería ejecutiva, presentaciones institucionales y contratos comerciales. Es la versión de mayor jerarquía de la marca.</p>
          </div>
          <div class="tbb-ds-col">
            <span class="tbb-ds-title">PROPORCIÓN ISOTIPO / TEXTO</span>
            <p>La altura del isotipo equivale exactamente al 100% de la caja de texto (Nombre + Descriptor). Pleca divisoria de 0.8pt a 18pt de distancia.</p>
          </div>
          <div class="tbb-ds-col">
            <span class="tbb-ds-title">SOPORTE REQUERIDO</span>
            <p>100% Lienzo Claro Puro (#FFFFFF) o fondos institucionales de hasta 5% de tinte (#F8FAFC). Nunca sobre fondos de textura compleja.</p>
          </div>
        </div>
      </div>
      ${ftr(16)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 17: DISPOSICIONES SECUNDARIAS
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-17">
      ${hdr("SECCIÓN 04", "SISTEMA DE IDENTIDAD Y LOGOTIPOS", 17, "Disposiciones Secundarias Homologadas")}
      <div class="tbb-body-grid-3variants">
        <div class="tbb-var-card">
          <div class="tbb-var-preview">
            ${logoVert(150)}
          </div>
          <div class="tbb-var-info">
            <span class="tbb-var-name">01 · VERSIÓN VERTICAL / SIMÉTRICA</span>
            <p>Para soportes de formato vertical: credenciales, pendones, tótems de eventos y pantallas móviles centradas.</p>
          </div>
        </div>

        <div class="tbb-var-card">
          <div class="tbb-var-preview">
            ${logoSym(140)}
          </div>
          <div class="tbb-var-info">
            <span class="tbb-var-name">02 · ISOTIPO AISLADO 1:1</span>
            <p>Para avatares de redes sociales (Instagram, LinkedIn, X), app icon para iOS/Android y favicon de navegador.</p>
          </div>
        </div>

        <div class="tbb-var-card">
          <div class="tbb-var-preview">
            ${logoSeal(140)}
          </div>
          <div class="tbb-var-info">
            <span class="tbb-var-name">03 · SELLO MASTER DE GARANTÍA</span>
            <p>Para timbres de certificación, marcas de agua en video, sellos de cera corporativos y certificados oficiales de marca.</p>
          </div>
        </div>
      </div>
      ${ftr(17)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 18: ÁREA DE PROTECCIÓN Y REDUCCIÓN MÍNIMA
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-18">
      ${hdr("SECCIÓN 04", "SISTEMA DE IDENTIDAD Y LOGOTIPOS", 18, "Área de Protección y Reducción Mínima")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-safezone">
          <div class="tbb-kicker">ZONA DE RESPIRACIÓN OBLIGATORIA</div>
          <h3 class="tbb-h3">Módulo de Seguridad «X»</h3>
          <p class="tbb-p">
            Para garantizar que ningún elemento gráfico, texto o borde interfiera con la legibilidad del logotipo, se establece un área de aislamiento perimetral equivalente a <strong>1.0X</strong> (donde «X» es la altura del núcleo mayor del isotipo).
          </p>

          <div class="tbb-safezone-diagram">
            <svg viewBox="0 0 380 200" width="100%" height="180">
              <!-- Área de protección punteada -->
              <rect x="20" y="20" width="340" height="160" fill="#F8FAFC" stroke="#4C9DE6" stroke-width="1.5" stroke-dasharray="6,4"/>
              
              <!-- Cuotas de X -->
              <text x="10" y="105" font-family="'Montserrat', sans-serif" font-weight="900" font-size="11" fill="#4C9DE6">1.0X</text>
              <text x="190" y="15" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="11" fill="#4C9DE6">1.0X</text>
              <text x="368" y="105" font-family="'Montserrat', sans-serif" font-weight="900" font-size="11" fill="#4C9DE6">1.0X</text>
              <text x="190" y="195" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="11" fill="#4C9DE6">1.0X</text>

              <!-- Logo en el centro -->
              <g transform="translate(60, 48) scale(0.60)">
                ${symCore}
              </g>
              <line x1="184" y1="62" x2="184" y2="138" stroke="#E2E8F0" stroke-width="1.5"/>
              <text x="198" y="92" font-family="'${priFont}', sans-serif" font-weight="900" font-size="14" fill="${pri}" letter-spacing="1.2">${bUpper.slice(0, 22)}</text>
              <text x="198" y="112" font-family="'Montserrat', sans-serif" font-weight="700" font-size="8" fill="#426EAE" letter-spacing="2.4">BRAND IDENTITY ATELIER</text>
            </svg>
          </div>
        </div>

        <div class="tbb-col-minscale">
          <div class="tbb-kicker">LÍMITES FÍSICOS Y DIGITALES</div>
          <h3 class="tbb-h3">Reducción Mínima Legible</h3>
          
          <div class="tbb-minscale-cards">
            <div class="tbb-mc-item">
              <div class="tbb-mc-head">MEDIOS IMPRESOS (OFFSET &amp; DIGITAL)</div>
              <div class="tbb-mc-preview">
                <span class="tbb-mc-size">Ancho Mínimo: 32 mm</span>
              </div>
              <p>Por debajo de este tamaño, el descriptor tipográfico pierde definición. Para bordados o grabados menores a 32 mm, usar exclusivamente el Isotipo 1:1.</p>
            </div>

            <div class="tbb-mc-item">
              <div class="tbb-mc-head">PANTALLAS DIGITALES (RETINA &amp; WEB)</div>
              <div class="tbb-mc-preview">
                <span class="tbb-mc-size">Ancho Mínimo: 130 px (Isotipo: 24 px)</span>
              </div>
              <p>En resoluciones estándar y móviles, el logotipo horizontal mantiene perfecta nitidez hasta 130 px de ancho. Para favicons, emplear el isotipo a 16px/32px.</p>
            </div>
          </div>
        </div>
      </div>
      ${ftr(18)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 19: RETÍCULA CONSTRUCTIVA (8X × 8X)
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-19">
      ${hdr("SECCIÓN 05", "CONSTRUCCIÓN TÉCNICA Y NORMATIVA", 19, "Retícula Constructiva Vectorial (8X × 8X)")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-blueprint">
          <div class="tbb-blueprint-stage">
            <svg viewBox="0 0 360 360" width="100%" height="320">
              <!-- Cuadrícula Milimétrica Técnica (Cian Suizo #4C9DE6) -->
              <rect x="20" y="20" width="320" height="320" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
              ${Array.from({ length: 9 }).map((_, i) => `
                <line x1="${20 + i * 40}" y1="20" x2="${20 + i * 40}" y2="340" stroke="#E2E8F0" stroke-width="0.8"/>
                <line x1="20" y1="${20 + i * 40}" x2="340" y2="${20 + i * 40}" stroke="#E2E8F0" stroke-width="0.8"/>
              `).join("")}

              <!-- Círculos de Construcción Áurea -->
              <circle cx="180" cy="180" r="140" fill="none" stroke="#4C9DE6" stroke-width="1.2" stroke-dasharray="4,3"/>
              <circle cx="180" cy="180" r="95" fill="none" stroke="#4C9DE6" stroke-width="1.2" stroke-dasharray="4,3"/>
              <circle cx="180" cy="180" r="50" fill="none" stroke="#4C9DE6" stroke-width="1.2"/>

              <!-- Isotipo alineado al pixel -->
              <g transform="translate(80, 80)">
                ${symCore}
              </g>

              <!-- Cotas angulares y modulares -->
              <line x1="180" y1="20" x2="180" y2="40" stroke="#FF7A00" stroke-width="2"/>
              <text x="180" y="14" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#FF7A00" font-weight="700">8X (320 mm)</text>
              <line x1="20" y1="180" x2="40" y2="180" stroke="#FF7A00" stroke-width="2"/>
              <text x="14" y="183" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#FF7A00" font-weight="700">8X</text>
            </svg>
          </div>
        </div>

        <div class="tbb-col-blueprint-text">
          <div class="tbb-kicker">RIGOR MATEMÁTICO VECTORIAL</div>
          <h3 class="tbb-h3">Proporción Áurea y Coordenadas Polares</h3>
          <p class="tbb-p">
            El Isotipo de ${bName} no nace de un trazo libre ni de un dibujo empírico. Se estructura sobre una <strong>matriz ortogonal de 8X × 8X módulos</strong>, donde cada vértice coincide exactamente con una intersección áurea o un ángulo canónico de 45°.
          </p>
          <div class="tbb-blueprint-rules">
            <div class="tbb-bpr-item">
              <strong>Eje Concéntrico:</strong> Centro coordenado absoluto en (0,0). Simetría radial de orden 4 con rotación de 90° en los pétalos axiales.
            </div>
            <div class="tbb-bpr-item">
              <strong>Ángulo de Cuchilla:</strong> Los cortes en bisel de los 4 pétalos menores se encuentran exactamente a 45° respecto al plano horizontal.
            </div>
            <div class="tbb-bpr-item">
              <strong>Precisión SVG:</strong> Sin puntos flotantes redundantes. Curvas bezier optimizadas para renderizado a 120 FPS en pantallas ProMotion.
            </div>
          </div>
        </div>
      </div>
      ${ftr(19)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 20: LENGUAJE VISUAL Y SISTEMA DE CURVAS
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-20">
      ${hdr("SECCIÓN 05", "CONSTRUCCIÓN TÉCNICA Y NORMATIVA", 20, "Lenguaje Visual y Sistema de Curvas")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-visual-dna">
          <div class="tbb-kicker">ADN DE DISEÑO OFICIAL</div>
          <h3 class="tbb-h3">Geometría de Trazos Rectos y Micro-Biseles</h3>
          <p class="tbb-p">
            La personalidad de ${bName} se apoya en trazos firmes y equilibrados, diagonales limpias a 45° y esquinas con un radio sutil de 2 a 4 pt. Este tratamiento evita la frialdad de las cajas cuadradas rígidas y aporta la sofisticación de un instrumento de alta precisión.
          </p>
          
          <div class="tbb-curve-specimen">
            <svg viewBox="0 0 340 180" width="100%" height="160">
              <path d="M 20,140 L 160,20 L 300,140 Z" fill="none" stroke="#0D2540" stroke-width="3"/>
              <path d="M 60,140 L 160,50 L 260,140 Z" fill="none" stroke="#426EAE" stroke-width="2" stroke-dasharray="6,4"/>
              <circle cx="160" cy="20" r="6" fill="#FF7A00"/>
              <circle cx="160" cy="50" r="4.5" fill="#426EAE"/>
              <line x1="20" y1="140" x2="300" y2="140" stroke="#0D2540" stroke-width="3"/>
              <text x="160" y="165" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#0D2540">TRAZOS PLANOS A 45° · CERO DISTORSIÓN</text>
            </svg>
          </div>
        </div>

        <div class="tbb-col-visual-rules">
          <div class="tbb-kicker">PAUTAS DE REPRODUCCIÓN</div>
          <h3 class="tbb-h3">3 Reglas del Sistema Gráfico</h3>
          <div class="tbb-vr-list">
            <div class="tbb-vr-item">
              <span class="tbb-vr-num">01</span>
              <div>
                <strong>Plecas y Remates Rectos:</strong> Toda línea divisoria o separador de contenido debe tener un grosor entre 1 y 2.5 pt, con remates rectos o micro-cuadrados de acento.
              </div>
            </div>
            <div class="tbb-vr-item">
              <span class="tbb-vr-num">02</span>
              <div>
                <strong>Espacio Negativo Asimétrico:</strong> Preferir siempre márgenes amplios en blanco antes que llenar la página con cajas de texto abigarradas.
              </div>
            </div>
            <div class="tbb-vr-item">
              <span class="tbb-vr-num">03</span>
              <div>
                <strong>Cero Degradados Graduales:</strong> En publicaciones institucionales, se utilizan planos de color sólidos y nítidos. Cero sombras borrosas ni brillos plásticos.
              </div>
            </div>
          </div>
        </div>
      </div>
      ${ftr(20)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 21: VERSIÓN EN NEGATIVO REAL CALADO
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-21">
      ${hdr("SECCIÓN 05", "CONSTRUCCIÓN TÉCNICA Y NORMATIVA", 21, "Versión en Negativo Real Calado")}
      <div class="tbb-body-negative-stage">
        <div class="tbb-neg-box-wrap">
          <div class="tbb-neg-dark-canvas">
            ${logoHorizNeg(340)}
          </div>
        </div>

        <div class="tbb-neg-guidelines">
          <div class="tbb-ng-col">
            <span class="tbb-ng-title">NORMA OFICIAL DE NEGATIVO</span>
            <p>La versión en negativo está calada en Blanco Puro (#FFFFFF) con acento en Celeste (#4C9DE6) y núcleo naranja (#FF7A00). Cero bordes negros ni parches blancos artificiales.</p>
          </div>
          <div class="tbb-ng-col">
            <span class="tbb-ng-title">FONDOS PERMITIDOS</span>
            <p>Exclusivamente sobre el Navy Blue Institucional (#0D2540) o negro puro (#000000). Jamás aplicar sobre fondos de colores cálidos o saturados.</p>
          </div>
          <div class="tbb-ng-col">
            <span class="tbb-ng-title">APLICACIONES FÍSICAS</span>
            <p>Ideal para uniformes oscuros, fondos de escenario para conferencias, camisetas técnicas, packaging de lujo y modo oscuro en aplicaciones móviles.</p>
          </div>
        </div>
      </div>
      ${ftr(21)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 22: USOS PROHIBIDOS
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-22">
      ${hdr("SECCIÓN 05", "CONSTRUCCIÓN TÉCNICA Y NORMATIVA", 22, "Usos Prohibidos y Deformaciones")}
      <div class="tbb-body-grid-prohibitions">
        <div class="tbb-prob-card">
          <div class="tbb-prob-preview">
            <div style="transform: scaleX(1.4); opacity:0.8;">${logoSym(70)}</div>
            <div class="tbb-prob-cross">✕</div>
          </div>
          <div class="tbb-prob-desc"><strong>No Distorsionar:</strong> Jamás alterar la relación de aspecto ni estirar horizontal o verticalmente.</div>
        </div>

        <div class="tbb-prob-card">
          <div class="tbb-prob-preview">
            <div style="filter: drop-shadow(4px 4px 6px #000);">${logoSym(70)}</div>
            <div class="tbb-prob-cross">✕</div>
          </div>
          <div class="tbb-prob-desc"><strong>No Sombras Grises:</strong> Prohibido añadir sombras paralelas o difuminados artificiales en PDF.</div>
        </div>

        <div class="tbb-prob-card">
          <div class="tbb-prob-preview">
            <div style="filter: hue-rotate(120deg);">${logoSym(70)}</div>
            <div class="tbb-prob-cross">✕</div>
          </div>
          <div class="tbb-prob-desc"><strong>No Cambiar Colores:</strong> Usar estrictamente la paleta oficial (Navy, Zafiro, Naranja y Blanco).</div>
        </div>

        <div class="tbb-prob-card">
          <div class="tbb-prob-preview">
            <div style="transform: rotate(25deg);">${logoSym(70)}</div>
            <div class="tbb-prob-cross">✕</div>
          </div>
          <div class="tbb-prob-desc"><strong>No Rotar en Ángulo Libre:</strong> El isotipo siempre se orienta con sus ejes en cruz vertical perfecta.</div>
        </div>

        <div class="tbb-prob-card">
          <div class="tbb-prob-preview">
            <div style="background:#E11D48; padding:8px; border-radius:4px;">${logoSym(60)}</div>
            <div class="tbb-prob-cross">✕</div>
          </div>
          <div class="tbb-prob-desc"><strong>No Fondos Contrastantes Malos:</strong> Jamás montar el logo sobre fondos rojos, verdes o estridentes.</div>
        </div>

        <div class="tbb-prob-card">
          <div class="tbb-prob-preview">
            <div style="font-family:'Comic Sans MS', sans-serif; font-size:16px; font-weight:bold; color:${pri};">${bUpper}</div>
            <div class="tbb-prob-cross">✕</div>
          </div>
          <div class="tbb-prob-desc"><strong>No Alterar Tipografía:</strong> Usar exclusivamente la fuente institucional aprobada (Montserrat 900).</div>
        </div>
      </div>
      ${ftr(22)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 23: PALETA CROMÁTICA OFICIAL (8 TONOS)
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-23">
      ${hdr("SECCIÓN 06", "CROMÁTICA, TIPOGRAFÍA Y SISTEMA GRÁFICO", 23, "Paleta Cromática Oficial de 8 Tonos")}
      <div class="tbb-body-grid-palette">
        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${pri};"></div>
          <div class="tbb-swatch-info">
            <strong>PRIMARIO OFICIAL</strong>
            <span>HEX: ${pri}</span>
            <span>CMYK: ${cmykPri}</span>
            <span>Pantone: ${pantonePri}</span>
          </div>
        </div>

        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${sec};"></div>
          <div class="tbb-swatch-info">
            <strong>SECUNDARIO OFICIAL</strong>
            <span>HEX: ${sec}</span>
            <span>CMYK: ${cmykSec}</span>
            <span>Pantone: ${pantoneSec}</span>
          </div>
        </div>

        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${acc};"></div>
          <div class="tbb-swatch-info">
            <strong>ACENTO VIBRANTE</strong>
            <span>HEX: ${acc}</span>
            <span>Soporte / Llamados</span>
            <span>Acento Dinámico</span>
          </div>
        </div>

        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${darkInk};"></div>
          <div class="tbb-swatch-info">
            <strong>TINTA OSCURA</strong>
            <span>HEX: ${darkInk}</span>
            <span>Tipografía / Contraste</span>
            <span>WCAG AAA Compliance</span>
          </div>
        </div>

        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${white}; border:1px solid #E6E6E6;"></div>
          <div class="tbb-swatch-info">
            <strong>LIENZO CLARO PURO</strong>
            <span>HEX: #FFFFFF</span>
            <span>CMYK: 0, 0, 0, 0</span>
            <span>Soporte Maestro 100% C-00</span>
          </div>
        </div>

        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${softBg}; border:1px solid #E6E6E6;"></div>
          <div class="tbb-swatch-info">
            <strong>TINTE NEUTRO SUAVE</strong>
            <span>HEX: ${softBg}</span>
            <span>Cápsulas y Paneles</span>
            <span>Fondo Secundario</span>
          </div>
        </div>

        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${midGray};"></div>
          <div class="tbb-swatch-info">
            <strong>GRIS MEDIO</strong>
            <span>HEX: ${midGray}</span>
            <span>Subtítulos y Metadatos</span>
            <span>Tinta Neutra</span>
          </div>
        </div>

        <div class="tbb-color-swatch">
          <div class="tbb-swatch-chip" style="background:${lightGray};"></div>
          <div class="tbb-swatch-info">
            <strong>GRIS LÍNEAS</strong>
            <span>HEX: ${lightGray}</span>
            <span>Filetes y Separadores</span>
            <span>Estructura Reticular</span>
          </div>
        </div>
      </div>
      ${ftr(23)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 24: REGLA 70 / 20 / 10 DE JERARQUÍA DE COLOR
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-24">
      ${hdr("SECCIÓN 06", "CROMÁTICA, TIPOGRAFÍA Y SISTEMA GRÁFICO", 24, "Regla Proporcional 70 / 20 / 10")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-proportion-bar">
          <div class="tbb-kicker">PROPORCIÓN DE IMPACTO VISUAL</div>
          <h3 class="tbb-h3">Distribución Armónica de la Luz</h3>
          <p class="tbb-p">
            Una marca elegante nunca satura con color. Sigue la regla aurea suiza: el 70% del espacio respira en blanco puro, el 20% construye la estructura en Navy Blue institucional, y el 10% restante guía la mirada con acentos estratégicos en Zafiro y Naranja.
          </p>

          <div class="tbb-ratio-graphic">
            <div class="tbb-ratio-70">
              <span class="tbb-rg-pct">70%</span>
              <span class="tbb-rg-name">LIENZO CLARO (#FFFFFF)</span>
            </div>
            <div class="tbb-ratio-20">
              <span class="tbb-rg-pct">20%</span>
              <span class="tbb-rg-name">NAVY (#0D2540)</span>
            </div>
            <div class="tbb-ratio-10">
              <span class="tbb-rg-pct">10%</span>
              <span class="tbb-rg-name">ACENTOS</span>
            </div>
          </div>
        </div>

        <div class="tbb-col-ratio-rules">
          <div class="tbb-kicker">APLICACIÓN EN MATERIALES</div>
          <h3 class="tbb-h3">Gobernanza de Luz por Soporte</h3>
          <div class="tbb-ratio-cards">
            <div class="tbb-rc-item">
              <strong>En Documentos y PDF:</strong> 70% fondo blanco sin manchas; 20% titulares y tablas en Navy; 10% viñetas, botones y cifras clave en Naranja / Zafiro.
            </div>
            <div class="tbb-rc-item">
              <strong>En Sitios Web y Apps:</strong> Fondos inmaculados con tarjetas sutiles en #F8FAFC; botones primarios en Navy Blue #0D2540 con resplandor zafiro; llamadas de urgencia en #FF7A00.
            </div>
            <div class="tbb-rc-item">
              <strong>En Espacios Físicos y Stands:</strong> Muros blancos con rótulos en metal pavonado Navy Blue e iluminación puntual cálida de acento.
            </div>
          </div>
        </div>
      </div>
      ${ftr(24)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 25: SISTEMA TIPOGRÁFICO OFICIAL
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-25">
      ${hdr("SECCIÓN 06", "CROMÁTICA, TIPOGRAFÍA Y SISTEMA GRÁFICO", 25, "Sistema Tipográfico Oficial y Jerarquías")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-typo-primary">
          <div class="tbb-kicker">TIPOGRAFÍA TITULAR PRIMARIA</div>
          <h3 class="tbb-h3">${priFont}</h3>
          <p class="tbb-p">
            Inspirada en los antiguos carteles del barrio de Montserrat en Buenos Aires. Sus proporciones geométricas amplias y su peso visual comunican autoridad inquebrantable, modernidad y presencia institucional.
          </p>

          <div class="tbb-specimen-box">
            <div class="tbb-spec-h1">Aa Bb Cc Dd Ee Ff Gg 123</div>
            <div class="tbb-spec-weights">
              <span style="font-weight:900;">Black 900</span> ·
              <span style="font-weight:800;">ExtraBold 800</span> ·
              <span style="font-weight:700;">Bold 700</span> ·
              <span style="font-weight:600;">SemiBold 600</span>
            </div>
          </div>
        </div>

        <div class="tbb-col-typo-secondary">
          <div class="tbb-kicker">TIPOGRAFÍA DE LECTURA Y PANTALLA</div>
          <h3 class="tbb-h3">${secFont}</h3>
          <p class="tbb-p">
            Una tipografía grotesca contemporánea con curvas amables y gran apertura ocular, diseñada específicamente para pantallas Retina y textos de lectura continua de alta exigencia ergonómica.
          </p>

          <div class="tbb-specimen-box">
            <div class="tbb-spec-p">El veloz murciélago hindú comía feliz cardillo y kiwi. 0123456789</div>
            <div class="tbb-spec-weights">
              <span style="font-weight:700;">Bold 700</span> ·
              <span style="font-weight:600;">Medium 600</span> ·
              <span style="font-weight:400;">Regular 400</span>
            </div>
          </div>

          <div class="tbb-typo-scale">
            <div><strong>H1 Titular:</strong> ${priFont} 900 · 48 a 54 pt · Tracking -0.02em</div>
            <div><strong>H2 Sección:</strong> ${priFont} 800 · 20 a 24 pt · Tracking -0.01em</div>
            <div><strong>Cuerpo Texto:</strong> ${secFont} 400/500 · 11 a 13 pt · Interlínea 1.55</div>
          </div>
        </div>
      </div>
      ${ftr(25)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 26: SISTEMA DE SELLOS DE GARANTÍA
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-26">
      ${hdr("SECCIÓN 06", "CROMÁTICA, TIPOGRAFÍA Y SISTEMA GRÁFICO", 26, "Sistema de Sellos Oficiales de Garantía")}
      <div class="tbb-body-grid-seals">
        <div class="tbb-seal-card">
          <div class="tbb-sc-preview">${logoSeal(130)}</div>
          <div class="tbb-sc-name">SELLO MASTER DE IDENTIDAD</div>
          <p>Para portadas de manuales oficiales, actas constitutivas de marca y certificación de entrega técnica.</p>
        </div>

        <div class="tbb-seal-card">
          <div class="tbb-sc-preview">
            <svg viewBox="0 0 200 200" width="130" height="130">
              <circle cx="100" cy="100" r="88" fill="none" stroke="${pri}" stroke-width="2"/>
              <polygon points="100,24 120,70 170,70 130,102 146,150 100,122 54,150 70,102 30,70 80,70" fill="${sec}"/>
              <circle cx="100" cy="100" r="16" fill="${pri}"/>
              <circle cx="100" cy="100" r="6" fill="${acc}"/>
            </svg>
          </div>
          <div class="tbb-sc-name">SELLO CALIDAD ALGORÍTMICA</div>
          <p>Certifica que el entregable fue generado bajo arquitectura vectorial en curvas sin plantillas.</p>
        </div>

        <div class="tbb-seal-card">
          <div class="tbb-sc-preview">
            <svg viewBox="0 0 200 200" width="130" height="130">
              <rect x="25" y="25" width="150" height="150" rx="12" fill="none" stroke="${pri}" stroke-width="2"/>
              <rect x="35" y="35" width="130" height="130" rx="8" fill="none" stroke="${sec}" stroke-width="1" stroke-dasharray="4,4"/>
              <text x="100" y="94" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="13" fill="${pri}">DIRECTIVA</text>
              <text x="100" y="116" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="900" font-size="18" fill="${acc}">MAX C-00</text>
            </svg>
          </div>
          <div class="tbb-sc-name">SELLO NORMATIVO C-00</div>
          <p>Garantía de cumplimiento del estándar de 30 láminas y 100% lienzo claro oficial.</p>
        </div>

        <div class="tbb-seal-card">
          <div class="tbb-sc-preview">
            <svg viewBox="0 0 200 200" width="130" height="130">
              <circle cx="100" cy="100" r="88" fill="none" stroke="${sec}" stroke-width="2"/>
              <path d="M 65 100 L 90 125 L 140 75" fill="none" stroke="${acc}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="tbb-sc-name">SELLO READY TO OPERATE</div>
          <p>Valida que los activos entregados están listos para pauta publicitaria, registro y operación hoy mismo.</p>
        </div>
      </div>
      ${ftr(26)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 27: NORMA OFICIAL DE CO-BRANDING Y ALIANZAS
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-27">
      ${hdr("SECCIÓN 07", "APLICACIONES PRÁCTICAS Y GOBERNANZA", 27, "Norma Oficial de Co-Branding y Alianzas")}
      <div class="tbb-body-grid-2col">
        <div class="tbb-col-cobrand-stage">
          <div class="tbb-kicker">REGLA DE LA CÁPSULA NEUTRA AISLADA</div>
          <h3 class="tbb-h3">Convivencia Visual entre Marcas</h3>
          <p class="tbb-p">
            Cuando ${bName} coparticipa con empresas aliadas, clientes o certificadoras internacionales, los logotipos deben convivir en igualdad de condiciones ópticas, separados por una pleca capilar neutral y conservando su área de aislamiento.
          </p>

          <div class="tbb-cobrand-preview-box">
            ${logoHoriz(220)}
            <line x1="260" y1="20" x2="260" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>
            <div class="tbb-partner-capsule">
              <span class="tbb-pc-label">MARCA DEL CLIENTE O ALIADO</span>
              <strong>EMPRESA COLABORADORA</strong>
            </div>
          </div>
        </div>

        <div class="tbb-col-cobrand-rules">
          <div class="tbb-kicker">3 LEYES DE CO-BRANDING</div>
          <h3 class="tbb-h3">Criterios de Homologación</h3>
          <div class="tbb-cr-list">
            <div class="tbb-cr-item">
              <strong>01. Proporción Óptica Equilibrada:</strong> La altura visual del logotipo aliado debe igualar la altura de la caja de ${bName}. Ninguna marca debe lucir subordinada.
            </div>
            <div class="tbb-cr-item">
              <strong>02. Fondo Blanco Invariable:</strong> La convivencia de marcas solo está permitida sobre lienzo claro puro (#FFFFFF). Prohibido sobre fondos divididos a dos colores.
            </div>
            <div class="tbb-cr-item">
              <strong>03. Separador Neutral:</strong> La línea divisoria siempre se traza en gris claro (#CBD5E1) con una distancia mínima de 24 pt respecto a cada marca.
            </div>
          </div>
        </div>
      </div>
      ${ftr(27)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 28: PAPELERÍA EJECUTIVA EN LIENZO CLARO
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-28">
      ${hdr("SECCIÓN 07", "APLICACIONES PRÁCTICAS Y GOBERNANZA", 28, "Papelería Ejecutiva en Lienzo Claro")}
      <div class="tbb-body-grid-stationery">
        <!-- Tarjeta de Presentación -->
        <div class="tbb-stat-item">
          <div class="tbb-stat-card-preview">
            <div class="tbb-bc-front">
              ${logoHoriz(150)}
            </div>
            <div class="tbb-bc-back">
              <strong>JORGE BENÍTEZ</strong>
              <span>DIRECTOR GENERAL · ${bUpper}</span>
              <p>jorge.benitez@improbears.com · thebestbrand-studio.web.app</p>
            </div>
          </div>
          <span class="tbb-stat-label">Tarjeta Ejecutiva (85 × 55 mm) · Papel Opalina 350g</span>
        </div>

        <!-- Hoja Membretada -->
        <div class="tbb-stat-item">
          <div class="tbb-stat-letter-preview">
            <div class="tbb-let-head">
              ${logoHoriz(120)}
              <span class="tbb-let-date">Ciudad de México · 2026</span>
            </div>
            <div class="tbb-let-lines">
              <div style="width:80%;"></div><div style="width:95%;"></div><div style="width:90%;"></div><div style="width:60%;"></div>
            </div>
            <div class="tbb-let-foot">
              <span>${bName} · Directiva Max C-00 · Folio Oficial 001/80</span>
            </div>
          </div>
          <span class="tbb-stat-label">Hoja Membretada Carta (A4) · Papel Bond 90g</span>
        </div>

        <!-- Firma de Correo HTML -->
        <div class="tbb-stat-item">
          <div class="tbb-stat-email-preview">
            <div class="tbb-em-logo">${logoSym(42)}</div>
            <div class="tbb-em-text">
              <strong>Aura · Mentora de Marca con IA</strong>
              <span>${bName} · Identidad Corporativa</span>
              <span style="color:#426EAE;">thebestbrand-studio.web.app</span>
            </div>
          </div>
          <span class="tbb-stat-label">Firma Digital HTML Responsive para Mail</span>
        </div>
      </div>
      ${ftr(28)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 29: ECOSISTEMA DIGITAL Y REDES SOCIALES
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-29">
      ${hdr("SECCIÓN 07", "APLICACIONES PRÁCTICAS Y GOBERNANZA", 29, "Ecosistema Digital y Redes Sociales")}
      <div class="tbb-body-grid-digital">
        <!-- App Icon -->
        <div class="tbb-dig-card">
          <div class="tbb-app-icon-preview">
            ${logoSym(84)}
          </div>
          <strong>APP ICON (iOS &amp; ANDROID)</strong>
          <span>1024 × 1024 px · Esquinas curvas a 22.5%</span>
        </div>

        <!-- Favicon -->
        <div class="tbb-dig-card">
          <div class="tbb-favicon-preview">
            ${logoSym(36)}
          </div>
          <strong>FAVICON VECTORIAL</strong>
          <span>SVG 1:1 · Retina Ready para Safari / Chrome</span>
        </div>

        <!-- Avatar Redes -->
        <div class="tbb-dig-card">
          <div class="tbb-social-avatar-preview">
            ${logoSym(72)}
          </div>
          <strong>AVATAR SOCIAL (INSTAGRAM / X)</strong>
          <span>Recorte circular de 400 × 400 px</span>
        </div>

        <!-- Plantilla Post / Reel -->
        <div class="tbb-dig-card">
          <div class="tbb-reel-preview">
            <div class="tbb-rp-head">${logoHoriz(90)}</div>
            <div class="tbb-rp-title">«Tu Marca en Minutos»</div>
            <div class="tbb-rp-foot">@thebestbrand</div>
          </div>
          <strong>PLANTILLA REELS / CAROUSEL</strong>
          <span>Formato 9:16 (1080 × 1920 px)</span>
        </div>
      </div>
      ${ftr(29)}
    </article>
  `);

  // =========================================================================
  // LÁMINA 30: COLOFÓN INSTITUCIONAL Y FIRMA OFICIAL
  // =========================================================================
  plates.push(`
    <article class="tbb-plate" id="plate-30">
      ${hdr("SECCIÓN 07", "APLICACIONES PRÁCTICAS Y GOBERNANZA", 30, "Colofón Institucional y Acta de Entrega")}
      <div class="tbb-body-colophon">
        <div class="tbb-colophon-seal-wrap">
          ${logoSeal(180)}
        </div>

        <div class="tbb-colophon-content">
          <div class="tbb-kicker">CERTIFICACIÓN OFICIAL DE IDENTIDAD</div>
          <h3 class="tbb-h3">Acta de Emisión de Brandbook en Curvas</h3>
          <p class="tbb-colophon-statement">
            Por medio del presente documento, se certifica que la identidad visual, el sistema de posicionamiento estratégico, la ingeniería de touchpoints y los activos vectoriales contenidos en este Manual de 30 Láminas han sido formalmente auditados y aprobados conforme a la <strong>Directiva Max C-00 (Versión 80.0)</strong>.
          </p>

          <div class="tbb-signatures-grid">
            <div class="tbb-sig-block">
              <div class="tbb-sig-line"></div>
              <strong>JORGE BENÍTEZ («EL OSO»)</strong>
              <span>Dirección General &amp; Comité de Marca · ${bName}</span>
            </div>
            <div class="tbb-sig-block">
              <div class="tbb-sig-line"></div>
              <strong>AURA (MENTORA CON IA)</strong>
              <span>Directora de Estrategia Algorítmica &amp; Diseño de Marca</span>
            </div>
          </div>

          <div class="tbb-colophon-footnote">
            DOCUMENTO GENERADO BAJO LA DIRECTIVA MAX C-00 · ${bUpper} · CERTIFICACIÓN EN CURVAS SIN PLANTILLAS · ABRIL 2026
          </div>
        </div>
      </div>
      ${ftr(30)}
    </article>
  `);

  return plates;
}

// 5. CSS Maestro Definitivo (100% Lienzo Claro, Tipografía Suiza, Cero Cajas Rígidas)


function getUniversalBrandbookStyles() {

  return `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:wght@600;700&family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@700;800&display=swap');
    
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

    @page {
      size: 1122px 794px;
      margin: 0;
    }

    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #FFFFFF !important;
      }
      .tbb-plate {
        margin: 0 !important;
        box-shadow: none !important;
        page-break-after: always !important;
        break-after: page !important;
        width: 1122px !important;
        height: 794px !important;
      }
      .tbb-plate:last-of-type {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
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

    /* CONTENEDOR EDITORIAL A 2 COLUMNAS */
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

    /* PRINCIPIOS (LÁMINA 06) */
    .tbb-body-grid-principles {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      padding: 24px 48px;
      gap: 24px;
    }
    .tbb-principle-card {
      border-top: 2.5px solid #0D2540;
      padding-top: 10px;
    }
    .tbb-p-head { margin-bottom: 6px; }
    .tbb-p-badge {
      font-family: 'Montserrat', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #FF7A00;
      display: block;
    }
    .tbb-p-head h4 {
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 800;
      color: #0D2540;
      margin: 2px 0 0 0;
    }
    .tbb-principle-card p {
      font-size: 11px;
      line-height: 1.54;
      color: #555555;
      margin: 0;
    }

    /* RADAR Y FACETAS (LÁMINA 07) */
    .tbb-col-radar { display: flex; flex-direction: column; }
    .tbb-persona-radar-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 8px;
    }
    .tbb-col-facets { display: flex; flex-direction: column; }
    .tbb-facets-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .tbb-facet-item {
      padding: 10px 14px;
      border-left: 3px solid #426EAE;
      background: #F8FAFC;
      border-radius: 0 6px 6px 0;
    }
    .tbb-facet-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 800;
      color: #0D2540;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tbb-f-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF7A00; }
    .tbb-facet-item p {
      font-size: 10.8px;
      line-height: 1.48;
      color: #555555;
      margin: 0;
    }

    /* SLIDERS Y DOS/DONTS (LÁMINA 08) */
    .tbb-col-sliders { display: flex; flex-direction: column; }
    .tbb-sliders-list { display: flex; flex-direction: column; gap: 14px; margin-top: 8px; }
    .tbb-slider-box {
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 10px;
    }
    .tbb-sl-hdr {
      display: flex;
      justify-content: space-between;
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      color: #0D2540;
      margin-bottom: 6px;
    }
    .tbb-sl-val { color: #426EAE; font-weight: 900; }
    .tbb-sl-bar {
      height: 6px;
      background: #E2E8F0;
      border-radius: 3px;
      position: relative;
    }
    .tbb-sl-fill {
      height: 100%;
      background: #426EAE;
      border-radius: 3px;
    }
    .tbb-sl-knob {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FF7A00;
      position: absolute;
      top: -4px;
      transform: translateX(-50%);
      box-shadow: 0 2px 6px rgba(255,122,0,0.35);
    }
    .tbb-sl-labels {
      display: flex;
      justify-content: space-between;
      font-size: 9.5px;
      color: #707070;
      font-weight: 600;
      margin-top: 6px;
    }
    .tbb-dosdonts-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tbb-dos-card, .tbb-donts-card {
      padding: 14px 18px;
      border-radius: 6px;
    }
    .tbb-dos-card { background: #F0FDF4; border-left: 3px solid #16A34A; }
    .tbb-donts-card { background: #FEF2F2; border-left: 3px solid #DC2626; }
    .tbb-dd-head {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }
    .tbb-dd-yes { color: #16A34A; }
    .tbb-dd-no { color: #DC2626; }
    .tbb-dos-card ul, .tbb-donts-card ul {
      margin: 0;
      padding-left: 16px;
      font-size: 10.8px;
      line-height: 1.5;
      color: #333333;
    }
    .tbb-dos-card li, .tbb-donts-card li { margin-bottom: 6px; }

    /* JOURNEY TIMELINE (LÁMINA 09) */
    .tbb-body-grid-journey {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 24px 48px;
      gap: 28px;
    }
    .tbb-journey-timeline {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-top: 10px;
    }
    .tbb-jt-stage {
      flex: 1;
      background: #F8FAFC;
      border-top: 3px solid #0D2540;
      padding: 18px 20px;
      border-radius: 0 0 8px 8px;
    }
    .tbb-jt-pill {
      display: inline-block;
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: #FFFFFF;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .tbb-pill-before { background: #FF7A00; }
    .tbb-pill-during { background: #426EAE; }
    .tbb-pill-after { background: #0D2540; }
    .tbb-jt-stage h4 {
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 800;
      color: #0D2540;
      margin: 0 0 8px 0;
    }
    .tbb-jt-stage p {
      font-size: 11px;
      line-height: 1.5;
      color: #555555;
      margin: 0 0 14px 0;
    }
    .tbb-jt-points {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 10.5px;
      font-weight: 700;
      color: #0D2540;
      border-top: 1px solid #E2E8F0;
      padding-top: 10px;
    }
    .tbb-jt-arrow {
      font-size: 26px;
      color: #CBD5E1;
      align-self: center;
    }

    /* GRID TOUCHPOINTS (LÁMINAS 10, 11, 12) */
    .tbb-body-grid-tp4 {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      padding: 24px 48px;
      gap: 24px;
    }
    .tbb-tp-card {
      border-left: 3px solid #0D2540;
      background: #F8FAFC;
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .tbb-tp-num {
      font-family: 'Montserrat', sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #FF7A00;
    }
    .tbb-tp-card h4 {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #0D2540;
      margin: 4px 0 4px 0;
    }
    .tbb-tp-meta {
      font-size: 9.5px;
      color: #426EAE;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .tbb-tp-card p {
      font-size: 11px;
      line-height: 1.5;
      color: #444444;
      margin: 0 0 10px 0;
    }
    .tbb-tp-rule {
      font-size: 9.8px;
      color: #707070;
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
      font-weight: 600;
    }

    /* NAMING Y NIZA (LÁMINA 13) */
    .tbb-smile-matrix {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 14px;
    }
    .tbb-smile-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 11px;
      color: #333333;
      padding: 4px 0;
      border-bottom: 1px solid #F1F5F9;
    }
    .tbb-s-letter {
      width: 22px;
      height: 22px;
      border-radius: 4px;
      background: #0D2540;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 900;
      flex-shrink: 0;
    }
    .tbb-niza-cards {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tbb-niza-box {
      border-left: 3px solid #426EAE;
      padding: 10px 14px;
      background: #F8FAFC;
    }
    .tbb-nb-hdr {
      font-family: 'Montserrat', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      color: #0D2540;
      margin-bottom: 4px;
    }
    .tbb-niza-box p {
      font-size: 10.5px;
      line-height: 1.48;
      color: #555555;
      margin: 0;
    }

    /* ARQUITECTURA DE MARCA (LÁMINA 14) */
    .tbb-arch-matrix-card {
      margin-top: 18px;
      background: #F8FAFC;
      border-radius: 6px;
      padding: 12px 16px;
    }
    .tbb-amm-head {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: #0D2540;
      margin-bottom: 8px;
    }
    .tbb-amm-row {
      font-size: 10.8px;
      line-height: 1.48;
      margin-bottom: 8px;
      padding-left: 6px;
    }
    .tbb-amm-good { border-left: 2.5px solid #16A34A; color: #0D2540; }
    .tbb-amm-bad { border-left: 2.5px solid #DC2626; color: #555555; margin-bottom: 0; }
    .tbb-arch-tree-stage {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 24px 20px;
    }
    .tbb-tree-root { margin-bottom: 12px; }
    .tbb-tree-stem { width: 2px; height: 24px; background: #426EAE; }
    .tbb-tree-branches {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      width: 100%;
      border-top: 2px solid #426EAE;
      padding-top: 14px;
    }
    .tbb-tb-leaf {
      text-align: center;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 10px 8px;
    }
    .tbb-leaf-icon {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 900;
      color: #FF7A00;
      display: block;
      margin-bottom: 2px;
    }
    .tbb-tb-leaf strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      color: #0D2540;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-tb-leaf p {
      font-size: 9.5px;
      line-height: 1.35;
      color: #707070;
      margin: 0;
    }

    /* ANATOMÍA DEL ISOTIPO (LÁMINA 15) */
    .tbb-anatomy-svg-stage {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 14px;
    }
    .tbb-anatomy-breakdown {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 10px;
    }
    .tbb-ab-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      font-size: 11px;
      line-height: 1.52;
      color: #444444;
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 10px;
    }
    .tbb-ab-num {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 900;
      color: #426EAE;
      flex-shrink: 0;
      width: 20px;
    }

    /* DISPOSICIÓN PRIMARIA (LÁMINA 16) */
    .tbb-body-display-stage {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 36px 48px;
      justify-content: space-between;
    }
    .tbb-display-hero {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border: 1px solid #E6E6E6;
      border-radius: 12px;
      padding: 40px;
    }
    .tbb-display-specs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding-top: 24px;
      border-top: 1px solid #E6E6E6;
    }
    .tbb-ds-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #426EAE;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-ds-col p {
      font-size: 11px;
      line-height: 1.5;
      color: #555555;
      margin: 0;
    }

    /* 3 VARIANTES (LÁMINA 17) */
    .tbb-body-grid-3variants {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 24px 48px;
      gap: 24px;
    }
    .tbb-var-card {
      border: 1px solid #E6E6E6;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FFFFFF;
    }
    .tbb-var-preview {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
    }
    .tbb-var-info {
      border-top: 1px solid #E6E6E6;
      padding-top: 12px;
    }
    .tbb-var-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      color: #0D2540;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-var-info p {
      font-size: 10.5px;
      line-height: 1.48;
      color: #555555;
      margin: 0;
    }

    /* SAFEZONE Y ESCALAS (LÁMINA 18) */
    .tbb-safezone-diagram {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
    .tbb-minscale-cards {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tbb-mc-item {
      border-left: 3px solid #426EAE;
      padding: 12px 16px;
      background: #F8FAFC;
    }
    .tbb-mc-head {
      font-family: 'Montserrat', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      color: #0D2540;
      margin-bottom: 4px;
    }
    .tbb-mc-preview {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #FF7A00;
      margin-bottom: 6px;
    }
    .tbb-mc-item p {
      font-size: 10.5px;
      line-height: 1.48;
      color: #555555;
      margin: 0;
    }

    /* BLUEPRINT RETÍCULA (LÁMINA 19) */
    .tbb-blueprint-stage {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tbb-blueprint-rules {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 14px;
    }
    .tbb-bpr-item {
      font-size: 11px;
      line-height: 1.5;
      color: #444444;
      border-left: 2px solid #4C9DE6;
      padding-left: 10px;
    }

    /* LENGUAJE VISUAL (LÁMINA 20) */
    .tbb-curve-specimen {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      margin-top: 12px;
    }
    .tbb-vr-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tbb-vr-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      font-size: 11px;
      line-height: 1.5;
      color: #444444;
    }
    .tbb-vr-num {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 900;
      color: #FF7A00;
      flex-shrink: 0;
      width: 20px;
    }

    /* NEGATIVO CALADO (LÁMINA 21) */
    .tbb-body-negative-stage {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 32px 48px;
      justify-content: space-between;
    }
    .tbb-neg-box-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0D2540;
      border-radius: 12px;
      padding: 40px;
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
    }
    .tbb-neg-guidelines {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding-top: 24px;
      border-top: 1px solid #E6E6E6;
    }
    .tbb-ng-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #426EAE;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-ng-col p {
      font-size: 11px;
      line-height: 1.5;
      color: #555555;
      margin: 0;
    }

    /* PROHIBICIONES (LÁMINA 22) */
    .tbb-body-grid-prohibitions {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      padding: 24px 48px;
      gap: 20px;
    }
    .tbb-prob-card {
      border: 1px solid #FEE2E2;
      border-radius: 8px;
      padding: 12px 16px;
      background: #FFFDFD;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .tbb-prob-preview {
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .tbb-prob-cross {
      position: absolute;
      font-size: 42px;
      color: #DC2626;
      font-weight: 900;
      opacity: 0.85;
      line-height: 1;
    }
    .tbb-prob-desc {
      font-size: 10px;
      line-height: 1.4;
      color: #444444;
      border-top: 1px solid #FEE2E2;
      padding-top: 8px;
    }

    /* PALETA CROMÁTICA (LÁMINA 23) */
    .tbb-body-grid-palette {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      padding: 24px 48px;
      gap: 20px;
    }
    .tbb-color-swatch {
      border: 1px solid #E6E6E6;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
    }
    .tbb-swatch-chip {
      height: 72px;
      width: 100%;
    }
    .tbb-swatch-info {
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 9.5px;
      color: #555555;
    }
    .tbb-swatch-info strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 10.5px;
      color: #0D2540;
      margin-bottom: 2px;
    }

    /* REGLA 70/20/10 (LÁMINA 24) */
    .tbb-ratio-graphic {
      display: flex;
      height: 72px;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 24px;
      border: 1px solid #CBD5E1;
    }
    .tbb-ratio-70 {
      flex: 7;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-right: 2px solid #CBD5E1;
    }
    .tbb-ratio-20 {
      flex: 2;
      background: #0D2540;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .tbb-ratio-10 {
      flex: 1;
      background: #FF7A00;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .tbb-rg-pct {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 900;
    }
    .tbb-rg-name {
      font-size: 7.5px;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .tbb-ratio-cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .tbb-rc-item {
      border-left: 3px solid #426EAE;
      padding: 10px 14px;
      background: #F8FAFC;
      font-size: 11px;
      line-height: 1.5;
      color: #444444;
    }

    /* TIPOGRAFÍA (LÁMINA 25) */
    .tbb-specimen-box {
      border: 1px solid #E6E6E6;
      border-radius: 8px;
      padding: 14px 18px;
      background: #F8FAFC;
      margin: 12px 0 16px 0;
    }
    .tbb-spec-h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: 19px;
      font-weight: 900;
      color: #0D2540;
      margin-bottom: 8px;
    }
    .tbb-spec-p {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12.5px;
      color: #0D2540;
      margin-bottom: 8px;
    }
    .tbb-spec-weights {
      font-size: 10px;
      color: #707070;
      border-top: 1px solid #E2E8F0;
      padding-top: 6px;
    }
    .tbb-typo-scale {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 10.5px;
      color: #0D2540;
      border-top: 1px solid #E6E6E6;
      padding-top: 10px;
    }

    /* SELLOS (LÁMINA 26) */
    .tbb-body-grid-seals {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 24px 48px;
      gap: 20px;
    }
    .tbb-seal-card {
      border: 1px solid #E6E6E6;
      border-radius: 8px;
      padding: 16px 12px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FFFFFF;
    }
    .tbb-sc-preview {
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tbb-sc-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 9.5px;
      font-weight: 800;
      color: #0D2540;
      margin: 8px 0 4px 0;
    }
    .tbb-seal-card p {
      font-size: 10px;
      line-height: 1.42;
      color: #666666;
      margin: 0;
    }

    /* CO-BRANDING (LÁMINA 27) */
    .tbb-cobrand-preview-box {
      border: 1px solid #E6E6E6;
      border-radius: 8px;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      margin-top: 16px;
      background: #FFFFFF;
    }
    .tbb-partner-capsule {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tbb-pc-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #707070;
      margin-bottom: 2px;
    }
    .tbb-partner-capsule strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 800;
      color: #0D2540;
      letter-spacing: 1.2px;
    }
    .tbb-cr-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .tbb-cr-item {
      border-left: 3px solid #426EAE;
      padding: 10px 14px;
      background: #F8FAFC;
      font-size: 11px;
      line-height: 1.5;
      color: #444444;
    }

    /* PAPELERÍA (LÁMINA 28) */
    .tbb-body-grid-stationery {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 24px 48px;
      gap: 24px;
    }
    .tbb-stat-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tbb-stat-card-preview {
      height: 220px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .tbb-bc-front {
      background: #FFFFFF;
      border: 1px solid #E6E6E6;
      border-radius: 4px;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90px;
    }
    .tbb-bc-back {
      background: #FFFFFF;
      border: 1px solid #E6E6E6;
      border-radius: 4px;
      padding: 10px 12px;
      font-size: 8.5px;
      color: #444444;
    }
    .tbb-bc-back strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      color: #0D2540;
      display: block;
    }
    .tbb-bc-back span {
      color: #426EAE;
      font-weight: 700;
      display: block;
      margin-bottom: 4px;
    }
    .tbb-bc-back p { margin: 0; }
    .tbb-stat-letter-preview {
      height: 220px;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border-radius: 4px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .tbb-let-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tbb-let-date { font-size: 8px; color: #707070; }
    .tbb-let-lines {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .tbb-let-lines div {
      height: 4px;
      background: #E2E8F0;
      border-radius: 2px;
    }
    .tbb-let-foot {
      font-size: 7.5px;
      color: #707070;
      border-top: 1px solid #E6E6E6;
      padding-top: 6px;
    }
    .tbb-stat-email-preview {
      height: 220px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 18px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .tbb-em-text {
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-size: 9.5px;
    }
    .tbb-em-text strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      color: #0D2540;
    }
    .tbb-stat-label {
      font-size: 9.5px;
      font-weight: 700;
      color: #707070;
      text-align: center;
    }

    /* DIGITAL (LÁMINA 29) */
    .tbb-body-grid-digital {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 24px 48px;
      gap: 20px;
    }
    .tbb-dig-card {
      border: 1px solid #E6E6E6;
      border-radius: 8px;
      padding: 16px 12px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: #FFFFFF;
    }
    .tbb-app-icon-preview {
      width: 96px;
      height: 96px;
      border-radius: 22px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(13,37,64,0.12);
    }
    .tbb-favicon-preview {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background: #0D2540;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tbb-social-avatar-preview {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 2px solid #0D2540;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tbb-reel-preview {
      width: 80px;
      height: 120px;
      border-radius: 6px;
      background: #0D2540;
      border: 1px solid #0D2540;
      padding: 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #FFFFFF;
      text-align: center;
    }
    .tbb-rp-head { display: flex; justify-content: center; }
    .tbb-rp-title { font-family: 'Montserrat', sans-serif; font-size: 7.5px; font-weight: 800; }
    .tbb-rp-foot { font-size: 6.5px; color: #4C9DE6; }
    .tbb-dig-card strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 9.5px;
      color: #0D2540;
      margin-top: 8px;
    }
    .tbb-dig-card span {
      font-size: 9px;
      color: #707070;
    }

    /* COLOFÓN (LÁMINA 30) */
    .tbb-body-colophon {
      flex: 1;
      display: grid;
      grid-template-columns: 0.75fr 1.25fr;
      padding: 36px 48px;
      gap: 36px;
      align-items: center;
    }
    .tbb-colophon-seal-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tbb-colophon-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .tbb-colophon-statement {
      font-size: 12px;
      line-height: 1.65;
      color: #333333;
      margin: 0;
    }
    .tbb-signatures-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 18px;
      border-top: 1px solid #E6E6E6;
      padding-top: 20px;
    }
    .tbb-sig-block {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 9.5px;
      color: #707070;
    }
    .tbb-sig-line {
      width: 100%;
      height: 1px;
      background: #0D2540;
      margin-bottom: 8px;
    }
    .tbb-sig-block strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 10.5px;
      color: #0D2540;
    }
    .tbb-colophon-footnote {
      margin-top: 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      font-weight: 700;
      color: #426EAE;
      letter-spacing: 0.1em;
    }
  `;
}

function generateFullBrandbookDocHtml(brand) {
  const plates = generateBrandbook30Plates(brand);
  const styles = getUniversalBrandbookStyles();
  const bUpper = brand.name.toUpperCase();
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Manual Oficial de Identidad (30 Láminas en Curvas) — ${bUpper}</title>
  <style>${styles}</style>
</head>
<body>
  ${plates.join("\n")}
</body>
</html>`;
}


  
  const THE_BEST_BRAND_OFFICIAL_PROFILE = {
    "id": 0,
    "name": "The Best Brand",
    "slug": "the_best_brand",
    "tagline": "BRAND IDENTITY ATELIER & MOTOR ALGORÍTMICO",
    "category": "Tecnología / Luxury Brand Identity Atelier",
    "giro": "Atelier de identidad de marca algorítmica y motor editorial de Brandbooks de 30 láminas en curvas matemáticas puras.",
    "buyer": "Líderes de empresas consolidadas y fundadores exigentes que valoran su tiempo y exigen excelencia técnica sin plantillas genéricas.",
    "why": "Porque el tiempo mental del líder es sagrado; unimos la calidez de una mentora de clase mundial con el rigor matemático de curvas vectoriales.",
    "how": "Diálogo socrático de 7 pasos con Aura, calibración estética en tiempo real y síntesis geométrica en vectores.",
    "what": "Manual de Identidad de 30 Láminas en Curvas (.PDF), suite vectorial abierta y bóveda digital permanente.",
    "persona": "Jorge Benítez 'El Oso': mente de ingeniero, fuerza tranquila y socio leal que escucha primero y profesionaliza hombro a hombro.",
    "niza": "Clase 42 (Servicios tecnológicos y diseño de software e identidad) y Clase 35 (Consultoría de negocios).",
    "tpBefore": [
      "Landing page en lienzo claro con tiempo de carga inferior a 0.8 segundos",
      "Demo interactivo en tiempo real sin requerir tarjeta de crédito previa",
      "Video explicativo en Full HD 1080p guiado por la voz neural de Aura",
      "Portafolio editorial de Brandbooks reales creados para múltiples industrias"
    ],
    "tpDuring": [
      "Atelier conversacional con Aura respondiendo en lenguaje natural empático",
      "Algoritmo de validación de naming con Clases Niza y test fonético",
      "Calibración de afinidad estética con sliders bipolares a 60 FPS",
      "Checkout transparente y seguro con Stripe y entrega inmediata"
    ],
    "tpAfter": [
      "Descarga instantánea del PDF de 30 láminas vectoriales de alta resolución",
      "Kit de isotipos abiertos en SVG transparente y PNG a 4000 px",
      "Bóveda digital permanente con acceso vitalicio a los activos de marca",
      "Acompañamiento post-venta y soporte directo para aplicaciones impresas y digitales"
    ],
    "colors": {
      "pri": "#0D2540",
      "sec": "#426EAE",
      "acc": "#FF7A00",
      "darkInk": "#0D2540",
      "midGray": "#707070",
      "lightGray": "#E6E6E6",
      "softBg": "#F8FAFC",
      "white": "#FFFFFF",
      "pantonePri": "Pantone 296 C",
      "pantoneSec": "Pantone 7683 C",
      "cmykPri": "C:100 M:80 Y:40 K:50",
      "cmykSec": "C:75 M:45 Y:5 K:0"
    },
    "primaryFont": "Montserrat",
    "secondaryFont": "Plus Jakarta Sans",
    "isEstablished": true,
    "isMultibrand": false,
    "svgCore": "<g transform=\"translate(10,10)\"><defs><linearGradient id=\"tbbWingBlue_bb\" x1=\"10%\" y1=\"0%\" x2=\"90%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#60A5FA\"/><stop offset=\"42%\" stop-color=\"#426EAE\"/><stop offset=\"85%\" stop-color=\"#0D2540\"/><stop offset=\"100%\" stop-color=\"#050811\"/></linearGradient><linearGradient id=\"tbbWingOrange_bb\" x1=\"0%\" y1=\"0%\" x2=\"95%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#FEF08A\"/><stop offset=\"45%\" stop-color=\"#FF7A00\"/><stop offset=\"85%\" stop-color=\"#EA580C\"/><stop offset=\"100%\" stop-color=\"#9A3412\"/></linearGradient><linearGradient id=\"tbbRibbon_bb\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.98\"/><stop offset=\"50%\" stop-color=\"#E0F2FE\" stop-opacity=\"0.92\"/><stop offset=\"100%\" stop-color=\"#93C5FD\" stop-opacity=\"0.85\"/></linearGradient></defs><circle cx=\"90\" cy=\"90\" r=\"64\" fill=\"#426EAE\" opacity=\"0.10\"/><path d=\"M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z\" fill=\"url(#tbbWingBlue_bb)\" stroke=\"#93C5FD\" stroke-width=\"1.4\"/><path d=\"M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z\" fill=\"url(#tbbWingOrange_bb)\" stroke=\"#FDE68A\" stroke-width=\"1.4\"/><path d=\"M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z\" fill=\"url(#tbbRibbon_bb)\" opacity=\"0.92\"/><circle cx=\"90\" cy=\"90\" r=\"28\" fill=\"#0D2540\" stroke=\"#FFFFFF\" stroke-width=\"2.4\"/><ellipse cx=\"82\" cy=\"78\" rx=\"14\" ry=\"7\" transform=\"rotate(-28 82 78)\" fill=\"#FFFFFF\" opacity=\"0.30\"/><text x=\"90\" y=\"97.5\" text-anchor=\"middle\" fill=\"#FFFFFF\" font-family=\"'Montserrat', sans-serif\" font-weight=\"900\" font-size=\"20\" letter-spacing=\"1\">TB</text><path d=\"M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z\" fill=\"#FF7A00\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/></g>",
    "svgCoreNeg": "<g transform=\"translate(10,10)\"><defs><linearGradient id=\"tbbWingBlueNeg_bb\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#FFFFFF\"/><stop offset=\"50%\" stop-color=\"#93C5FD\"/><stop offset=\"100%\" stop-color=\"#4C9DE6\"/></linearGradient><linearGradient id=\"tbbWingOrangeNeg_bb\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#FEF08A\"/><stop offset=\"60%\" stop-color=\"#FF7A00\"/><stop offset=\"100%\" stop-color=\"#EA580C\"/></linearGradient></defs><circle cx=\"90\" cy=\"90\" r=\"64\" fill=\"#FFFFFF\" opacity=\"0.08\"/><path d=\"M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z\" fill=\"url(#tbbWingBlueNeg_bb)\" stroke=\"#93C5FD\" stroke-width=\"1.4\"/><path d=\"M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z\" fill=\"url(#tbbWingOrangeNeg_bb)\" stroke=\"#FDE68A\" stroke-width=\"1.4\"/><path d=\"M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z\" fill=\"#FFFFFF\" opacity=\"0.92\"/><circle cx=\"90\" cy=\"90\" r=\"28\" fill=\"#0D2540\" stroke=\"#FFFFFF\" stroke-width=\"2.4\"/><text x=\"90\" y=\"97.5\" text-anchor=\"middle\" fill=\"#FFFFFF\" font-family=\"'Montserrat', sans-serif\" font-weight=\"900\" font-size=\"20\" letter-spacing=\"1\">TB</text><path d=\"M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z\" fill=\"#FEF08A\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/></g>"
  };

  window.CATALOG_30_MAP = {
    "the_best_brand": THE_BEST_BRAND_OFFICIAL_PROFILE,
    "thebestbrand": THE_BEST_BRAND_OFFICIAL_PROFILE,
    "the best brand": THE_BEST_BRAND_OFFICIAL_PROFILE,
    "maison_levain": {"id": 1, "name": "Maison Levain", "slug": "maison_levain", "tagline": "PANADER\u00cdA DE MASA MADRE & FERMENTACI\u00d3N LENTA", "category": "Comestibles / Panader\u00eda Artesanal", "giro": "Panader\u00eda francesa tradicional especializada en hogazas de masa madre de fermentaci\u00f3n natural de 48 horas, viennoiserie hojaldrada con mantequilla AOC y reposter\u00eda r\u00fastica.", "buyer": "Familias, chefs y comensales que buscan sabor profundo, digestibilidad superior y materias primas limpias sin aditivos qu\u00edmicos ni mejoradores industriales.", "why": "Porque el verdadero pan es alimento sagrado que solo la paciencia, el grano entero agroecol\u00f3gico y el fermento vivo pueden honrar.", "how": "Cuidamos masa madre viva centenaria, harinas molidas a la piedra y horneado artesanal sobre piso de piedra refractaria.", "what": "Hogazas r\u00fasticas de centeno y espelta, croissants de mantequilla francesa, baguettes de fermentaci\u00f3n en fr\u00edo y brioche de vainilla natural.", "persona": "Maestro panadero con rigor de relojero y calidez de hogar: amasa antes del amanecer y explica con orgullo la corteza crujiente y la miga alveolada a cada comensal.", "niza": "Clase 30 (Pan, harinas, preparaciones a base de cereales, pasteler\u00eda y confiter\u00eda).", "tpBefore": ["Perfil en Instagram con videos del gre\u00f1ado de hogazas y el crujido de la corteza al salir del horno", "Tienda online con men\u00fa semanal de horneado y apartado de hogazas en prelanzamiento", "Aroma a pan caliente perceptible a dos cuadras del obrador desde las 6:30 AM", "Men\u00fa impreso en papel kraft reciclado con mapa de procedencia de los trigos limpios"], "tpDuring": ["Bienvenida con degustaci\u00f3n de pan campesino tibio con mantequilla de rancho y flor de sal", "Empaque en bolsas de papel microperforado que conservan la corteza crocante durante el traslado", "Recomendaci\u00f3n experta del panadero sobre maridajes de quesos, mermeladas y vinos", "Cobro \u00e1gil con terminal contactless y ticket digital enviado de inmediato al WhatsApp del cliente"], "tpAfter": ["Gu\u00eda impresa de conservaci\u00f3n del pan de masa madre y t\u00e9cnicas de tostado perfecto en sart\u00e9n", "Suscripci\u00f3n semanal de Pan Fresco a Domicilio con entrega garantizada cada martes y viernes", "Invitaci\u00f3n a talleres bimensuales de iniciaci\u00f3n a la masa madre casera para clientes leales", "Encuesta de 1 toque sobre textura y humedad de la miga para ajuste fino del lote siguiente"], "colors": {"pri": "#854D0E", "sec": "#D97706", "acc": "#F59E0B", "darkInk": "#292524", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 7558 C", "pantoneSec": "Pantone 7549 C", "cmykPri": "C:15 M:45 Y:90 K:48", "cmykSec": "C:5 M:50 Y:95 K:0"}, "primaryFont": "Playfair Display", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FAF8F5\" stroke=\"#D97706\" stroke-width=\"1.8\" stroke-dasharray=\"4,4\"/><path d=\"M 68 140 C 64 110, 54 86, 68 54 C 62 70, 58 90, 68 140 Z\" fill=\"#D97706\"/><path d=\"M 68 76 C 54 74, 46 66, 44 58 C 52 60, 62 66, 68 76 Z\" fill=\"#F59E0B\"/><path d=\"M 66 94 C 52 92, 44 84, 42 76 C 50 78, 60 84, 66 94 Z\" fill=\"#F59E0B\"/><path d=\"M 67 112 C 53 110, 45 102, 43 94 C 51 96, 61 102, 67 112 Z\" fill=\"#F59E0B\"/><path d=\"M 112 140 C 116 110, 126 86, 112 54 C 118 70, 122 90, 112 140 Z\" fill=\"#D97706\"/><path d=\"M 112 76 C 126 74, 134 66, 136 58 C 128 60, 118 66, 112 76 Z\" fill=\"#F59E0B\"/><path d=\"M 114 94 C 128 92, 136 84, 138 76 C 130 78, 120 84, 114 94 Z\" fill=\"#F59E0B\"/><path d=\"M 113 112 C 127 110, 135 102, 137 94 C 129 96, 119 102, 113 112 Z\" fill=\"#F59E0B\"/><path d=\"M 52 120 C 52 86, 128 86, 128 120 C 128 132, 52 132, 52 120 Z\" fill=\"#854D0E\" stroke=\"#5C3407\" stroke-width=\"2\"/><path d=\"M 64 112 Q 78 94 92 112\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 112 Q 102 94 116 112\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 42 L 92 42 L 92 78 L 88 78 Z\" fill=\"#78716C\"/><path d=\"M 85 40 Q 90 28 95 40 L 93 48 L 87 48 Z\" fill=\"#D97706\"/><circle cx=\"90\" cy=\"34\" r=\"2.5\" fill=\"#FAF8F5\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\" stroke-dasharray=\"4,4\"/><path d=\"M 68 140 C 64 110, 54 86, 68 54 C 62 70, 58 90, 68 140 Z\" fill=\"#F59E0B\"/><path d=\"M 68 76 C 54 74, 46 66, 44 58 C 52 60, 62 66, 68 76 Z\" fill=\"#FDE68A\"/><path d=\"M 66 94 C 52 92, 44 84, 42 76 C 50 78, 60 84, 66 94 Z\" fill=\"#FDE68A\"/><path d=\"M 67 112 C 53 110, 45 102, 43 94 C 51 96, 61 102, 67 112 Z\" fill=\"#FDE68A\"/><path d=\"M 112 140 C 116 110, 126 86, 112 54 C 118 70, 122 90, 112 140 Z\" fill=\"#F59E0B\"/><path d=\"M 112 76 C 126 74, 134 66, 136 58 C 128 60, 118 66, 112 76 Z\" fill=\"#FDE68A\"/><path d=\"M 114 94 C 128 92, 136 84, 138 76 C 130 78, 120 84, 114 94 Z\" fill=\"#FDE68A\"/><path d=\"M 113 112 C 127 110, 135 102, 137 94 C 129 96, 119 102, 113 112 Z\" fill=\"#FDE68A\"/><path d=\"M 52 120 C 52 86, 128 86, 128 120 C 128 132, 52 132, 52 120 Z\" fill=\"#FFFFFF\" stroke=\"#F59E0B\" stroke-width=\"2\"/><path d=\"M 64 112 Q 78 94 92 112\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 112 Q 102 94 116 112\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 42 L 92 42 L 92 78 L 88 78 Z\" fill=\"#E7E5E4\"/><path d=\"M 85 40 Q 90 28 95 40 L 93 48 L 87 48 Z\" fill=\"#F59E0B\"/><circle cx=\"90\" cy=\"34\" r=\"2.5\" fill=\"#292524\"/></g>"},
    "maison_levain": {"id": 1, "name": "Maison Levain", "slug": "maison_levain", "tagline": "PANADER\u00cdA DE MASA MADRE & FERMENTACI\u00d3N LENTA", "category": "Comestibles / Panader\u00eda Artesanal", "giro": "Panader\u00eda francesa tradicional especializada en hogazas de masa madre de fermentaci\u00f3n natural de 48 horas, viennoiserie hojaldrada con mantequilla AOC y reposter\u00eda r\u00fastica.", "buyer": "Familias, chefs y comensales que buscan sabor profundo, digestibilidad superior y materias primas limpias sin aditivos qu\u00edmicos ni mejoradores industriales.", "why": "Porque el verdadero pan es alimento sagrado que solo la paciencia, el grano entero agroecol\u00f3gico y el fermento vivo pueden honrar.", "how": "Cuidamos masa madre viva centenaria, harinas molidas a la piedra y horneado artesanal sobre piso de piedra refractaria.", "what": "Hogazas r\u00fasticas de centeno y espelta, croissants de mantequilla francesa, baguettes de fermentaci\u00f3n en fr\u00edo y brioche de vainilla natural.", "persona": "Maestro panadero con rigor de relojero y calidez de hogar: amasa antes del amanecer y explica con orgullo la corteza crujiente y la miga alveolada a cada comensal.", "niza": "Clase 30 (Pan, harinas, preparaciones a base de cereales, pasteler\u00eda y confiter\u00eda).", "tpBefore": ["Perfil en Instagram con videos del gre\u00f1ado de hogazas y el crujido de la corteza al salir del horno", "Tienda online con men\u00fa semanal de horneado y apartado de hogazas en prelanzamiento", "Aroma a pan caliente perceptible a dos cuadras del obrador desde las 6:30 AM", "Men\u00fa impreso en papel kraft reciclado con mapa de procedencia de los trigos limpios"], "tpDuring": ["Bienvenida con degustaci\u00f3n de pan campesino tibio con mantequilla de rancho y flor de sal", "Empaque en bolsas de papel microperforado que conservan la corteza crocante durante el traslado", "Recomendaci\u00f3n experta del panadero sobre maridajes de quesos, mermeladas y vinos", "Cobro \u00e1gil con terminal contactless y ticket digital enviado de inmediato al WhatsApp del cliente"], "tpAfter": ["Gu\u00eda impresa de conservaci\u00f3n del pan de masa madre y t\u00e9cnicas de tostado perfecto en sart\u00e9n", "Suscripci\u00f3n semanal de Pan Fresco a Domicilio con entrega garantizada cada martes y viernes", "Invitaci\u00f3n a talleres bimensuales de iniciaci\u00f3n a la masa madre casera para clientes leales", "Encuesta de 1 toque sobre textura y humedad de la miga para ajuste fino del lote siguiente"], "colors": {"pri": "#854D0E", "sec": "#D97706", "acc": "#F59E0B", "darkInk": "#292524", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 7558 C", "pantoneSec": "Pantone 7549 C", "cmykPri": "C:15 M:45 Y:90 K:48", "cmykSec": "C:5 M:50 Y:95 K:0"}, "primaryFont": "Playfair Display", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FAF8F5\" stroke=\"#D97706\" stroke-width=\"1.8\" stroke-dasharray=\"4,4\"/><path d=\"M 68 140 C 64 110, 54 86, 68 54 C 62 70, 58 90, 68 140 Z\" fill=\"#D97706\"/><path d=\"M 68 76 C 54 74, 46 66, 44 58 C 52 60, 62 66, 68 76 Z\" fill=\"#F59E0B\"/><path d=\"M 66 94 C 52 92, 44 84, 42 76 C 50 78, 60 84, 66 94 Z\" fill=\"#F59E0B\"/><path d=\"M 67 112 C 53 110, 45 102, 43 94 C 51 96, 61 102, 67 112 Z\" fill=\"#F59E0B\"/><path d=\"M 112 140 C 116 110, 126 86, 112 54 C 118 70, 122 90, 112 140 Z\" fill=\"#D97706\"/><path d=\"M 112 76 C 126 74, 134 66, 136 58 C 128 60, 118 66, 112 76 Z\" fill=\"#F59E0B\"/><path d=\"M 114 94 C 128 92, 136 84, 138 76 C 130 78, 120 84, 114 94 Z\" fill=\"#F59E0B\"/><path d=\"M 113 112 C 127 110, 135 102, 137 94 C 129 96, 119 102, 113 112 Z\" fill=\"#F59E0B\"/><path d=\"M 52 120 C 52 86, 128 86, 128 120 C 128 132, 52 132, 52 120 Z\" fill=\"#854D0E\" stroke=\"#5C3407\" stroke-width=\"2\"/><path d=\"M 64 112 Q 78 94 92 112\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 112 Q 102 94 116 112\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 42 L 92 42 L 92 78 L 88 78 Z\" fill=\"#78716C\"/><path d=\"M 85 40 Q 90 28 95 40 L 93 48 L 87 48 Z\" fill=\"#D97706\"/><circle cx=\"90\" cy=\"34\" r=\"2.5\" fill=\"#FAF8F5\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\" stroke-dasharray=\"4,4\"/><path d=\"M 68 140 C 64 110, 54 86, 68 54 C 62 70, 58 90, 68 140 Z\" fill=\"#F59E0B\"/><path d=\"M 68 76 C 54 74, 46 66, 44 58 C 52 60, 62 66, 68 76 Z\" fill=\"#FDE68A\"/><path d=\"M 66 94 C 52 92, 44 84, 42 76 C 50 78, 60 84, 66 94 Z\" fill=\"#FDE68A\"/><path d=\"M 67 112 C 53 110, 45 102, 43 94 C 51 96, 61 102, 67 112 Z\" fill=\"#FDE68A\"/><path d=\"M 112 140 C 116 110, 126 86, 112 54 C 118 70, 122 90, 112 140 Z\" fill=\"#F59E0B\"/><path d=\"M 112 76 C 126 74, 134 66, 136 58 C 128 60, 118 66, 112 76 Z\" fill=\"#FDE68A\"/><path d=\"M 114 94 C 128 92, 136 84, 138 76 C 130 78, 120 84, 114 94 Z\" fill=\"#FDE68A\"/><path d=\"M 113 112 C 127 110, 135 102, 137 94 C 129 96, 119 102, 113 112 Z\" fill=\"#FDE68A\"/><path d=\"M 52 120 C 52 86, 128 86, 128 120 C 128 132, 52 132, 52 120 Z\" fill=\"#FFFFFF\" stroke=\"#F59E0B\" stroke-width=\"2\"/><path d=\"M 64 112 Q 78 94 92 112\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 112 Q 102 94 116 112\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M 88 42 L 92 42 L 92 78 L 88 78 Z\" fill=\"#E7E5E4\"/><path d=\"M 85 40 Q 90 28 95 40 L 93 48 L 87 48 Z\" fill=\"#F59E0B\"/><circle cx=\"90\" cy=\"34\" r=\"2.5\" fill=\"#292524\"/></g>"},
    "vertice_y_sombra": {"id": 2, "name": "V\u00e9rtice & Sombra", "slug": "vertice_y_sombra", "tagline": "ARQUITECTURA BIOCLIM\u00c1TICA & PAISAJE PASIVO", "category": "Arquitectura & Construcci\u00f3n", "giro": "Taller de arquitectura bioclim\u00e1tica de autor especializado en residencias sustentables de alta gama, envolventes t\u00e9rmicas pasivas y paisajismo nativo regenerativo.", "buyer": "Familias e inversionistas conscientes que buscan hogares confortables que reduzcan al m\u00ednimo el consumo energ\u00e9tico sin renunciar a la belleza est\u00e9tica.", "why": "Porque habitar con dignidad significa sincronizar el refugio humano con la luz del sol, la direcci\u00f3n del viento y la sombra de los \u00e1rboles.", "how": "Calculamos trayectorias solares 3D, empleamos muros de inercia t\u00e9rmica en tierra compactada y dise\u00f1amos celos\u00edas de ventilaci\u00f3n cruzada.", "what": "Proyectos ejecutivos bioclim\u00e1ticos, direcci\u00f3n t\u00e9cnica de obra sustentable, consultor\u00eda de eficiencia LEED y dise\u00f1o de jardines xer\u00f3filos.", "persona": "Arquitecto bioclim\u00e1tico con mente de f\u00edsico y alma de bot\u00e1nico: escucha c\u00f3mo vive la familia y orienta cada ventana hacia la brisa m\u00e1s fresca.", "niza": "Clase 42 (Servicios de arquitectura, dise\u00f1o urban\u00edstico, ingenier\u00eda bioclim\u00e1tica y consultor\u00eda medioambiental).", "tpBefore": ["Monograf\u00eda digital descargable con an\u00e1lisis de asoleamiento y balance t\u00e9rmico de proyectos construidos", "Recorridos inmersivos 3D en web mostrando la sombra proyectada en solsticios y equinoccios", "Diagn\u00f3stico preliminar bioclim\u00e1tico del terreno en 48 horas con datos satelitales de viento", "Conferencias y art\u00edculos t\u00e9cnicos en revistas internacionales de arquitectura pasiva"], "tpDuring": ["Presentaci\u00f3n de maqueta f\u00edsica seccionada en maderas locales y acr\u00edlico solar", "Bit\u00e1cora fotogr\u00e1fica semanal de obra con medici\u00f3n t\u00e9rmica in situ de muros y techos", "Visitas conjuntas a canteras y viveros regionales para selecci\u00f3n directa de materiales y vegetaci\u00f3n", "Contrato transparente a precio alzado con hitos constructivos certificados ante notario"], "tpAfter": ["Manual del Usuario Bioclim\u00e1tico con instrucciones para operar celos\u00edas y ventilas en cada estaci\u00f3n", "Monitoreo t\u00e9rmico post-ocupaci\u00f3n durante el primer a\u00f1o con sensores IoT en estancia y rec\u00e1maras", "P\u00f3liza de garant\u00eda extendida de 5 a\u00f1os en impermeabilizaci\u00f3n y hermeticidad de carpinter\u00edas", "Sesi\u00f3n fotogr\u00e1fica editorial de la residencia habitada para publicaci\u00f3n en libros de arquitectura"], "colors": {"pri": "#0F3A40", "sec": "#2A6F68", "acc": "#D97706", "darkInk": "#0B1E22", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 5463 C", "pantoneSec": "Pantone 7475 C", "cmykPri": "C:80 M:40 Y:50 K:60", "cmykSec": "C:70 M:20 Y:45 K:15"}, "primaryFont": "Montserrat", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><line x1=\"20\" y1=\"160\" x2=\"160\" y2=\"160\" stroke=\"#E2E8F0\" stroke-width=\"1.2\"/><line x1=\"20\" y1=\"160\" x2=\"20\" y2=\"20\" stroke=\"#E2E8F0\" stroke-width=\"1.2\"/><polygon points=\"90,26 150,56 150,126 90,96\" fill=\"#2A6F68\" opacity=\"0.85\"/><polygon points=\"90,26 30,56 30,126 90,96\" fill=\"#0F3A40\"/><polygon points=\"90,96 150,126 90,156 30,126\" fill=\"#D97706\" opacity=\"0.90\"/><line x1=\"42\" y1=\"62\" x2=\"42\" y2=\"118\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><line x1=\"56\" y1=\"69\" x2=\"56\" y2=\"125\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><line x1=\"70\" y1=\"76\" x2=\"70\" y2=\"132\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><line x1=\"84\" y1=\"83\" x2=\"84\" y2=\"139\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><circle cx=\"145\" cy=\"30\" r=\"10\" fill=\"#D97706\"/><line x1=\"135\" y1=\"36\" x2=\"105\" y2=\"54\" stroke=\"#D97706\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><line x1=\"20\" y1=\"160\" x2=\"160\" y2=\"160\" stroke=\"#2A6F68\" stroke-width=\"1.2\"/><line x1=\"20\" y1=\"160\" x2=\"20\" y2=\"20\" stroke=\"#2A6F68\" stroke-width=\"1.2\"/><polygon points=\"90,26 150,56 150,126 90,96\" fill=\"#2A6F68\"/><polygon points=\"90,26 30,56 30,126 90,96\" fill=\"#FFFFFF\"/><polygon points=\"90,96 150,126 90,156 30,126\" fill=\"#D97706\"/><line x1=\"42\" y1=\"62\" x2=\"42\" y2=\"118\" stroke=\"#0F3A40\" stroke-width=\"2\"/><line x1=\"56\" y1=\"69\" x2=\"56\" y2=\"125\" stroke=\"#0F3A40\" stroke-width=\"2\"/><line x1=\"70\" y1=\"76\" x2=\"70\" y2=\"132\" stroke=\"#0F3A40\" stroke-width=\"2\"/><line x1=\"84\" y1=\"83\" x2=\"84\" y2=\"139\" stroke=\"#0F3A40\" stroke-width=\"2\"/><circle cx=\"145\" cy=\"30\" r=\"10\" fill=\"#D97706\"/><line x1=\"135\" y1=\"36\" x2=\"105\" y2=\"54\" stroke=\"#D97706\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/></g>"},
    "vértice_&_sombra": {"id": 2, "name": "V\u00e9rtice & Sombra", "slug": "vertice_y_sombra", "tagline": "ARQUITECTURA BIOCLIM\u00c1TICA & PAISAJE PASIVO", "category": "Arquitectura & Construcci\u00f3n", "giro": "Taller de arquitectura bioclim\u00e1tica de autor especializado en residencias sustentables de alta gama, envolventes t\u00e9rmicas pasivas y paisajismo nativo regenerativo.", "buyer": "Familias e inversionistas conscientes que buscan hogares confortables que reduzcan al m\u00ednimo el consumo energ\u00e9tico sin renunciar a la belleza est\u00e9tica.", "why": "Porque habitar con dignidad significa sincronizar el refugio humano con la luz del sol, la direcci\u00f3n del viento y la sombra de los \u00e1rboles.", "how": "Calculamos trayectorias solares 3D, empleamos muros de inercia t\u00e9rmica en tierra compactada y dise\u00f1amos celos\u00edas de ventilaci\u00f3n cruzada.", "what": "Proyectos ejecutivos bioclim\u00e1ticos, direcci\u00f3n t\u00e9cnica de obra sustentable, consultor\u00eda de eficiencia LEED y dise\u00f1o de jardines xer\u00f3filos.", "persona": "Arquitecto bioclim\u00e1tico con mente de f\u00edsico y alma de bot\u00e1nico: escucha c\u00f3mo vive la familia y orienta cada ventana hacia la brisa m\u00e1s fresca.", "niza": "Clase 42 (Servicios de arquitectura, dise\u00f1o urban\u00edstico, ingenier\u00eda bioclim\u00e1tica y consultor\u00eda medioambiental).", "tpBefore": ["Monograf\u00eda digital descargable con an\u00e1lisis de asoleamiento y balance t\u00e9rmico de proyectos construidos", "Recorridos inmersivos 3D en web mostrando la sombra proyectada en solsticios y equinoccios", "Diagn\u00f3stico preliminar bioclim\u00e1tico del terreno en 48 horas con datos satelitales de viento", "Conferencias y art\u00edculos t\u00e9cnicos en revistas internacionales de arquitectura pasiva"], "tpDuring": ["Presentaci\u00f3n de maqueta f\u00edsica seccionada en maderas locales y acr\u00edlico solar", "Bit\u00e1cora fotogr\u00e1fica semanal de obra con medici\u00f3n t\u00e9rmica in situ de muros y techos", "Visitas conjuntas a canteras y viveros regionales para selecci\u00f3n directa de materiales y vegetaci\u00f3n", "Contrato transparente a precio alzado con hitos constructivos certificados ante notario"], "tpAfter": ["Manual del Usuario Bioclim\u00e1tico con instrucciones para operar celos\u00edas y ventilas en cada estaci\u00f3n", "Monitoreo t\u00e9rmico post-ocupaci\u00f3n durante el primer a\u00f1o con sensores IoT en estancia y rec\u00e1maras", "P\u00f3liza de garant\u00eda extendida de 5 a\u00f1os en impermeabilizaci\u00f3n y hermeticidad de carpinter\u00edas", "Sesi\u00f3n fotogr\u00e1fica editorial de la residencia habitada para publicaci\u00f3n en libros de arquitectura"], "colors": {"pri": "#0F3A40", "sec": "#2A6F68", "acc": "#D97706", "darkInk": "#0B1E22", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 5463 C", "pantoneSec": "Pantone 7475 C", "cmykPri": "C:80 M:40 Y:50 K:60", "cmykSec": "C:70 M:20 Y:45 K:15"}, "primaryFont": "Montserrat", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><line x1=\"20\" y1=\"160\" x2=\"160\" y2=\"160\" stroke=\"#E2E8F0\" stroke-width=\"1.2\"/><line x1=\"20\" y1=\"160\" x2=\"20\" y2=\"20\" stroke=\"#E2E8F0\" stroke-width=\"1.2\"/><polygon points=\"90,26 150,56 150,126 90,96\" fill=\"#2A6F68\" opacity=\"0.85\"/><polygon points=\"90,26 30,56 30,126 90,96\" fill=\"#0F3A40\"/><polygon points=\"90,96 150,126 90,156 30,126\" fill=\"#D97706\" opacity=\"0.90\"/><line x1=\"42\" y1=\"62\" x2=\"42\" y2=\"118\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><line x1=\"56\" y1=\"69\" x2=\"56\" y2=\"125\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><line x1=\"70\" y1=\"76\" x2=\"70\" y2=\"132\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><line x1=\"84\" y1=\"83\" x2=\"84\" y2=\"139\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><circle cx=\"145\" cy=\"30\" r=\"10\" fill=\"#D97706\"/><line x1=\"135\" y1=\"36\" x2=\"105\" y2=\"54\" stroke=\"#D97706\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><line x1=\"20\" y1=\"160\" x2=\"160\" y2=\"160\" stroke=\"#2A6F68\" stroke-width=\"1.2\"/><line x1=\"20\" y1=\"160\" x2=\"20\" y2=\"20\" stroke=\"#2A6F68\" stroke-width=\"1.2\"/><polygon points=\"90,26 150,56 150,126 90,96\" fill=\"#2A6F68\"/><polygon points=\"90,26 30,56 30,126 90,96\" fill=\"#FFFFFF\"/><polygon points=\"90,96 150,126 90,156 30,126\" fill=\"#D97706\"/><line x1=\"42\" y1=\"62\" x2=\"42\" y2=\"118\" stroke=\"#0F3A40\" stroke-width=\"2\"/><line x1=\"56\" y1=\"69\" x2=\"56\" y2=\"125\" stroke=\"#0F3A40\" stroke-width=\"2\"/><line x1=\"70\" y1=\"76\" x2=\"70\" y2=\"132\" stroke=\"#0F3A40\" stroke-width=\"2\"/><line x1=\"84\" y1=\"83\" x2=\"84\" y2=\"139\" stroke=\"#0F3A40\" stroke-width=\"2\"/><circle cx=\"145\" cy=\"30\" r=\"10\" fill=\"#D97706\"/><line x1=\"135\" y1=\"36\" x2=\"105\" y2=\"54\" stroke=\"#D97706\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/></g>"},
    "abaco_y_ley": {"id": 3, "name": "\u00c1baco & Ley", "slug": "abaco_y_ley", "tagline": "AUDITOR\u00cdA CORPORATIVA & ESTRATEGIA FISCAL INTEGRAL", "category": "Servicios / Consultor\u00eda Fiscal & Legal", "giro": "Firma boutique de abogados fiscalistas y contadores p\u00fablicos certificados, especializada en planeaci\u00f3n patrimonial, auditor\u00eda financiera forense y litigio ante tribunales federales.", "buyer": "Consejos de administraci\u00f3n, directores generales y family offices que demandan blindaje fiscal riguroso y transparencia contable ante autoridades recaudatorias.", "why": "Porque la verdadera tranquilidad de un empresario reside en una contabilidad matem\u00e1ticamente exacta y legalmente inexpugnable.", "how": "Modelamos escenarios fiscales con algoritmos de predicci\u00f3n, auditamos libro por libro bajo normas NIF internacionales y defendemos cada peso con la ley en la mano.", "what": "Dict\u00e1menes fiscales para efectos fiscales, reestructuras corporativas, cumplimiento regulatorio antilavado y defensa tributaria en juicio de amparo.", "persona": "Socio fiscalista con mente de ajedrecista y serenidad de juez: escucha los planes de expansi\u00f3n del cliente y dise\u00f1a una armadura que optimiza su patrimonio.", "niza": "Clase 35 (Servicios de contabilidad, auditor\u00eda tributaria y consultor\u00eda de negocios) y Clase 45 (Servicios jur\u00eddicos y defensa fiscal).", "tpBefore": ["Informe Trimestral de Criterios Vinculativos de la Autoridad Fiscal distribuido a clientes VIP", "Calculadora web confidencial para proyectar el impacto de reformas tributarias en la empresa", "Diagn\u00f3stico preliminar de 360\u00b0 en riesgos de discrepancia fiscal y cumplimiento de n\u00f3mina", "Seminarios ejecutivos a puerta cerrada sobre gobierno corporativo y sucesi\u00f3n patrimonial"], "tpDuring": ["Reuni\u00f3n mensual del Comit\u00e9 Fiscal con entrega de carpeta ejecutiva en piel con sellos de auditor\u00eda", "Acceso cifrado a la b\u00f3veda digital con respaldos de CFDI y dict\u00e1menes firmados electr\u00f3nicamente", "L\u00ednea roja directa de WhatsApp para resolver dudas tributarias de urgencia en menos de 20 minutos", "Simulacros anuales de auditor\u00eda para capacitar al equipo contable interno de la empresa"], "tpAfter": ["Certificado Anual de Blindaje Fiscal con opini\u00f3n de cumplimiento 100% positiva emitida por el SAT", "Archivo documental digital indexado y listo para responder a requerimientos en menos de 24 horas", "Revisi\u00f3n semestral del plan de pensiones y distribuci\u00f3n de dividendos de los accionistas", "Almuerzo anual de planeaci\u00f3n estrat\u00e9gica para proyectar el crecimiento del a\u00f1o fiscal venidero"], "colors": {"pri": "#0B1E36", "sec": "#1E3A8A", "acc": "#CA8A04", "darkInk": "#070F1C", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone 289 C", "pantoneSec": "Pantone 280 C", "cmykPri": "C:90 M:70 Y:30 K:70", "cmykSec": "C:95 M:75 Y:10 K:20"}, "primaryFont": "Cinzel", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"74\" y=\"146\" width=\"32\" height=\"12\" rx=\"2\" fill=\"#0B1E36\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"146\" stroke=\"#0B1E36\" stroke-width=\"4\"/><line x1=\"32\" y1=\"52\" x2=\"148\" y2=\"52\" stroke=\"#0B1E36\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"90\" cy=\"52\" r=\"6\" fill=\"#CA8A04\"/><line x1=\"36\" y1=\"52\" x2=\"36\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"52\" x2=\"56\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><circle cx=\"36\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"36\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"56\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 28 108 C 28 126, 64 126, 64 108 Z\" fill=\"#0B1E36\"/><line x1=\"124\" y1=\"52\" x2=\"124\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><line x1=\"144\" y1=\"52\" x2=\"144\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><circle cx=\"124\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 116 108 C 116 126, 152 126, 152 108 Z\" fill=\"#0B1E36\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"74\" y=\"146\" width=\"32\" height=\"12\" rx=\"2\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"146\" stroke=\"#FFFFFF\" stroke-width=\"4\"/><line x1=\"32\" y1=\"52\" x2=\"148\" y2=\"52\" stroke=\"#FFFFFF\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"90\" cy=\"52\" r=\"6\" fill=\"#CA8A04\"/><line x1=\"36\" y1=\"52\" x2=\"36\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"52\" x2=\"56\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><circle cx=\"36\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"36\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"56\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 28 108 C 28 126, 64 126, 64 108 Z\" fill=\"#CA8A04\"/><line x1=\"124\" y1=\"52\" x2=\"124\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><line x1=\"144\" y1=\"52\" x2=\"144\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><circle cx=\"124\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 116 108 C 116 126, 152 126, 152 108 Z\" fill=\"#CA8A04\"/></g>"},
    "ábaco_&_ley": {"id": 3, "name": "\u00c1baco & Ley", "slug": "abaco_y_ley", "tagline": "AUDITOR\u00cdA CORPORATIVA & ESTRATEGIA FISCAL INTEGRAL", "category": "Servicios / Consultor\u00eda Fiscal & Legal", "giro": "Firma boutique de abogados fiscalistas y contadores p\u00fablicos certificados, especializada en planeaci\u00f3n patrimonial, auditor\u00eda financiera forense y litigio ante tribunales federales.", "buyer": "Consejos de administraci\u00f3n, directores generales y family offices que demandan blindaje fiscal riguroso y transparencia contable ante autoridades recaudatorias.", "why": "Porque la verdadera tranquilidad de un empresario reside en una contabilidad matem\u00e1ticamente exacta y legalmente inexpugnable.", "how": "Modelamos escenarios fiscales con algoritmos de predicci\u00f3n, auditamos libro por libro bajo normas NIF internacionales y defendemos cada peso con la ley en la mano.", "what": "Dict\u00e1menes fiscales para efectos fiscales, reestructuras corporativas, cumplimiento regulatorio antilavado y defensa tributaria en juicio de amparo.", "persona": "Socio fiscalista con mente de ajedrecista y serenidad de juez: escucha los planes de expansi\u00f3n del cliente y dise\u00f1a una armadura que optimiza su patrimonio.", "niza": "Clase 35 (Servicios de contabilidad, auditor\u00eda tributaria y consultor\u00eda de negocios) y Clase 45 (Servicios jur\u00eddicos y defensa fiscal).", "tpBefore": ["Informe Trimestral de Criterios Vinculativos de la Autoridad Fiscal distribuido a clientes VIP", "Calculadora web confidencial para proyectar el impacto de reformas tributarias en la empresa", "Diagn\u00f3stico preliminar de 360\u00b0 en riesgos de discrepancia fiscal y cumplimiento de n\u00f3mina", "Seminarios ejecutivos a puerta cerrada sobre gobierno corporativo y sucesi\u00f3n patrimonial"], "tpDuring": ["Reuni\u00f3n mensual del Comit\u00e9 Fiscal con entrega de carpeta ejecutiva en piel con sellos de auditor\u00eda", "Acceso cifrado a la b\u00f3veda digital con respaldos de CFDI y dict\u00e1menes firmados electr\u00f3nicamente", "L\u00ednea roja directa de WhatsApp para resolver dudas tributarias de urgencia en menos de 20 minutos", "Simulacros anuales de auditor\u00eda para capacitar al equipo contable interno de la empresa"], "tpAfter": ["Certificado Anual de Blindaje Fiscal con opini\u00f3n de cumplimiento 100% positiva emitida por el SAT", "Archivo documental digital indexado y listo para responder a requerimientos en menos de 24 horas", "Revisi\u00f3n semestral del plan de pensiones y distribuci\u00f3n de dividendos de los accionistas", "Almuerzo anual de planeaci\u00f3n estrat\u00e9gica para proyectar el crecimiento del a\u00f1o fiscal venidero"], "colors": {"pri": "#0B1E36", "sec": "#1E3A8A", "acc": "#CA8A04", "darkInk": "#070F1C", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone 289 C", "pantoneSec": "Pantone 280 C", "cmykPri": "C:90 M:70 Y:30 K:70", "cmykSec": "C:95 M:75 Y:10 K:20"}, "primaryFont": "Cinzel", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"74\" y=\"146\" width=\"32\" height=\"12\" rx=\"2\" fill=\"#0B1E36\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"146\" stroke=\"#0B1E36\" stroke-width=\"4\"/><line x1=\"32\" y1=\"52\" x2=\"148\" y2=\"52\" stroke=\"#0B1E36\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"90\" cy=\"52\" r=\"6\" fill=\"#CA8A04\"/><line x1=\"36\" y1=\"52\" x2=\"36\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"52\" x2=\"56\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><circle cx=\"36\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"36\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"56\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 28 108 C 28 126, 64 126, 64 108 Z\" fill=\"#0B1E36\"/><line x1=\"124\" y1=\"52\" x2=\"124\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><line x1=\"144\" y1=\"52\" x2=\"144\" y2=\"108\" stroke=\"#1E3A8A\" stroke-width=\"1.8\"/><circle cx=\"124\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 116 108 C 116 126, 152 126, 152 108 Z\" fill=\"#0B1E36\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"74\" y=\"146\" width=\"32\" height=\"12\" rx=\"2\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"146\" stroke=\"#FFFFFF\" stroke-width=\"4\"/><line x1=\"32\" y1=\"52\" x2=\"148\" y2=\"52\" stroke=\"#FFFFFF\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"90\" cy=\"52\" r=\"6\" fill=\"#CA8A04\"/><line x1=\"36\" y1=\"52\" x2=\"36\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"52\" x2=\"56\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><circle cx=\"36\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"36\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"56\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 28 108 C 28 126, 64 126, 64 108 Z\" fill=\"#CA8A04\"/><line x1=\"124\" y1=\"52\" x2=\"124\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><line x1=\"144\" y1=\"52\" x2=\"144\" y2=\"108\" stroke=\"#E5E7EB\" stroke-width=\"1.8\"/><circle cx=\"124\" cy=\"74\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"68\" r=\"4.5\" fill=\"#CA8A04\"/><circle cx=\"144\" cy=\"80\" r=\"4.5\" fill=\"#CA8A04\"/><path d=\"M 116 108 C 116 126, 152 126, 152 108 Z\" fill=\"#CA8A04\"/></g>"},
    "aerovent_athletics": {"id": 4, "name": "AeroVent Athletics", "slug": "aerovent_athletics", "tagline": "INDUMENTARIA T\u00c9CNICA & CALZADO DE ALTO RENDIMIENTO", "category": "Tienda / Ropa Deportiva & Calzado", "giro": "Marca de ropa deportiva t\u00e9cnica y calzado de trail running dise\u00f1ada con textiles inteligentes de ventilaci\u00f3n biomec\u00e1nica, peso ultraligero y absorci\u00f3n de impacto.", "buyer": "Maratonistas, atletas de monta\u00f1a y corredores urbanos que exigen m\u00e1xima ligereza, transpirabilidad absoluta y durabilidad en condiciones extremas.", "why": "Porque cada gramo y cada segundo cuentan cuando la mente y el cuerpo desaf\u00edan la gravedad y los l\u00edmites de la resistencia humana.", "how": "Dise\u00f1amos con escaneos de termograf\u00eda corporal, telas con microcanales de evaporaci\u00f3n y suelas con compuesto de caucho vulcanizado de agarre milim\u00e9trico.", "what": "Playeras termoselladas sin costuras, shorts de compresi\u00f3n muscular, rompevientos hidrof\u00f3bicos y calzado de trail con placa de carbono integrada.", "persona": "Ingeniero textil y ultra-corredor: prueba personalmente cada prenda en carreras de 100 millas bajo lluvia, sol y barro antes de mandarla a producci\u00f3n.", "niza": "Clase 25 (Prendas de vestir, calzado y art\u00edculos de sombrerer\u00eda para deporte).", "tpBefore": ["Pruebas de t\u00fanel de viento transmitidas en vivo mostrando la reducci\u00f3n de resistencia del textil", "Gu\u00eda interactiva de calzado seg\u00fan pisada (pronador, neutro, supinador) y tipo de terreno", "Stand interactivo en las principales expo-maratones del pa\u00eds con prueba de pisada 3D gratuita", "Comunidad en Strava con retos mensuales de kilometraje y recompensas exclusivas"], "tpDuring": ["Empaque tubular en aluminio reciclado con malla transpirable reutilizable para llevar a carreras", "Medici\u00f3n de talla con sensor \u00f3ptico en tienda o kit de prueba en casa con devoluci\u00f3n sin costo", "Instrucciones de cuidado t\u00e9rmico impresas con tinta reflectiva de alta visibilidad nocturna", "Prueba de carrera en banda sin fin con c\u00e1maras de alta velocidad en boutique oficial"], "tpAfter": ["Programa de reciclaje t\u00e9cnico: recibe cr\u00e9dito en tienda al devolver tenis usados para trituraci\u00f3n", "Garant\u00eda de rendimiento de 500 kil\u00f3metros con cambio inmediato ante cualquier desprendimiento", "Acceso VIP a entrenamientos guiados por atletas ol\u00edmpicos embajadores de la marca", "Recordatorio autom\u00e1tico de renovaci\u00f3n de calzado cuando se alcanza el kilometraje recomendado"], "colors": {"pri": "#1E40AF", "sec": "#2563EB", "acc": "#84CC16", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 286 C", "pantoneSec": "Pantone 2728 C", "cmykPri": "C:95 M:75 Y:0 K:5", "cmykSec": "C:85 M:55 Y:0 K:0"}, "primaryFont": "Space Grotesk", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 30 140 L 90 32 L 150 140 L 126 140 L 90 72 L 54 140 Z\" fill=\"#1E40AF\"/><path d=\"M 44 148 L 90 60 L 136 148 L 118 148 L 90 92 L 62 148 Z\" fill=\"#2563EB\"/><path d=\"M 76 100 L 90 44 L 104 100 L 90 88 Z\" fill=\"#84CC16\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#84CC16\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 30 140 L 90 32 L 150 140 L 126 140 L 90 72 L 54 140 Z\" fill=\"#FFFFFF\"/><path d=\"M 44 148 L 90 60 L 136 148 L 118 148 L 90 92 L 62 148 Z\" fill=\"#84CC16\"/><path d=\"M 76 100 L 90 44 L 104 100 L 90 88 Z\" fill=\"#2563EB\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#84CC16\"/></g>"},
    "aerovent_athletics": {"id": 4, "name": "AeroVent Athletics", "slug": "aerovent_athletics", "tagline": "INDUMENTARIA T\u00c9CNICA & CALZADO DE ALTO RENDIMIENTO", "category": "Tienda / Ropa Deportiva & Calzado", "giro": "Marca de ropa deportiva t\u00e9cnica y calzado de trail running dise\u00f1ada con textiles inteligentes de ventilaci\u00f3n biomec\u00e1nica, peso ultraligero y absorci\u00f3n de impacto.", "buyer": "Maratonistas, atletas de monta\u00f1a y corredores urbanos que exigen m\u00e1xima ligereza, transpirabilidad absoluta y durabilidad en condiciones extremas.", "why": "Porque cada gramo y cada segundo cuentan cuando la mente y el cuerpo desaf\u00edan la gravedad y los l\u00edmites de la resistencia humana.", "how": "Dise\u00f1amos con escaneos de termograf\u00eda corporal, telas con microcanales de evaporaci\u00f3n y suelas con compuesto de caucho vulcanizado de agarre milim\u00e9trico.", "what": "Playeras termoselladas sin costuras, shorts de compresi\u00f3n muscular, rompevientos hidrof\u00f3bicos y calzado de trail con placa de carbono integrada.", "persona": "Ingeniero textil y ultra-corredor: prueba personalmente cada prenda en carreras de 100 millas bajo lluvia, sol y barro antes de mandarla a producci\u00f3n.", "niza": "Clase 25 (Prendas de vestir, calzado y art\u00edculos de sombrerer\u00eda para deporte).", "tpBefore": ["Pruebas de t\u00fanel de viento transmitidas en vivo mostrando la reducci\u00f3n de resistencia del textil", "Gu\u00eda interactiva de calzado seg\u00fan pisada (pronador, neutro, supinador) y tipo de terreno", "Stand interactivo en las principales expo-maratones del pa\u00eds con prueba de pisada 3D gratuita", "Comunidad en Strava con retos mensuales de kilometraje y recompensas exclusivas"], "tpDuring": ["Empaque tubular en aluminio reciclado con malla transpirable reutilizable para llevar a carreras", "Medici\u00f3n de talla con sensor \u00f3ptico en tienda o kit de prueba en casa con devoluci\u00f3n sin costo", "Instrucciones de cuidado t\u00e9rmico impresas con tinta reflectiva de alta visibilidad nocturna", "Prueba de carrera en banda sin fin con c\u00e1maras de alta velocidad en boutique oficial"], "tpAfter": ["Programa de reciclaje t\u00e9cnico: recibe cr\u00e9dito en tienda al devolver tenis usados para trituraci\u00f3n", "Garant\u00eda de rendimiento de 500 kil\u00f3metros con cambio inmediato ante cualquier desprendimiento", "Acceso VIP a entrenamientos guiados por atletas ol\u00edmpicos embajadores de la marca", "Recordatorio autom\u00e1tico de renovaci\u00f3n de calzado cuando se alcanza el kilometraje recomendado"], "colors": {"pri": "#1E40AF", "sec": "#2563EB", "acc": "#84CC16", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 286 C", "pantoneSec": "Pantone 2728 C", "cmykPri": "C:95 M:75 Y:0 K:5", "cmykSec": "C:85 M:55 Y:0 K:0"}, "primaryFont": "Space Grotesk", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 30 140 L 90 32 L 150 140 L 126 140 L 90 72 L 54 140 Z\" fill=\"#1E40AF\"/><path d=\"M 44 148 L 90 60 L 136 148 L 118 148 L 90 92 L 62 148 Z\" fill=\"#2563EB\"/><path d=\"M 76 100 L 90 44 L 104 100 L 90 88 Z\" fill=\"#84CC16\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#84CC16\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 30 140 L 90 32 L 150 140 L 126 140 L 90 72 L 54 140 Z\" fill=\"#FFFFFF\"/><path d=\"M 44 148 L 90 60 L 136 148 L 118 148 L 90 92 L 62 148 Z\" fill=\"#84CC16\"/><path d=\"M 76 100 L 90 44 L 104 100 L 90 88 Z\" fill=\"#2563EB\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#84CC16\"/></g>"},
    "dentalumina": {"id": 5, "name": "DentaLumina", "slug": "dentalumina", "tagline": "ODONTOLOG\u00cdA DIGITAL, CIRUG\u00cdA GUIADA & EST\u00c9TICA DENTAL", "category": "Profesional / Odontolog\u00eda & Salud", "giro": "Cl\u00ednica odontol\u00f3gica de alta especialidad que combina escaneo intraoral 3D, dise\u00f1o digital de sonrisa, implantes guiados por computadora y carillas de porcelana ultra-delgadas.", "buyer": "Ejecutivos, novias, pacientes y profesionales que buscan perfeccionar su sonrisa con procedimientos indoloros, m\u00ednimamente invasivos y resultados de armon\u00eda natural.", "why": "Porque una sonrisa aut\u00e9ntica y saludable transforma la autoestima, la seguridad personal y la forma en que una persona se conecta con el mundo.", "how": "Eliminamos moldes molestos con esc\u00e1ner \u00f3ptico HD, simulamos el resultado final antes de tocar una pieza y tallamos porcelana con fresado rob\u00f3tico CAD/CAM.", "what": "Dise\u00f1o de Sonrisa Digital (DSD), carillas cer\u00e1micas Feldesp\u00e1ticas, ortodoncia invisible con alineadores transparentes y blanqueamiento l\u00e1ser.", "persona": "Cirujano dentista con sensibilidad de artista y precisi\u00f3n de cirujano pl\u00e1stico: trata al paciente con empat\u00eda absoluta, explica cada fase y garantiza cero dolor.", "niza": "Clase 44 (Servicios m\u00e9dicos y odontol\u00f3gicos, cl\u00ednicas dentales, higiene y est\u00e9tica bucodental).", "tpBefore": ["Simulador virtual en web que muestra c\u00f3mo lucir\u00eda tu sonrisa con escaneo de una selfie", "Tour fotogr\u00e1fico de las instalaciones mostrando quir\u00f3fanos est\u00e9riles y suites privadas de relajaci\u00f3n", "Citas gestionadas por WhatsApp con recordatorio autom\u00e1tico y ubicaci\u00f3n Waze con valet parking", "Testimonios en video en alta definici\u00f3n de pacientes reales mostrando el antes y despu\u00e9s"], "tpDuring": ["Sala de espera con aromaterapia relajante, selecci\u00f3n de caf\u00e9 org\u00e1nico y sill\u00f3n con masaje lumbar", "Uso de lentes de realidad virtual durante el tratamiento para ver pel\u00edculas y aislar ruidos", "Anestesia computarizada indolora dosificada gota a gota para eliminar cualquier molestia", "Fotograf\u00eda cl\u00ednica profesional en estudio fotogr\u00e1fico propio para comparar cada avance"], "tpAfter": ["Kit de bienvenida con cepillo s\u00f3nico recargable, cera ortod\u00f3ntica y pasta remineralizante", "Mensaje personalizado del doctor a las 8:00 PM consultando c\u00f3mo va la recuperaci\u00f3n", "Certificado de autenticidad y garant\u00eda de 10 a\u00f1os en porcelanas y aditamentos de titanio", "Recordatorio autom\u00e1tico de profilaxis y pulido preventivo cada 6 meses"], "colors": {"pri": "#0284C7", "sec": "#0EA5E9", "acc": "#06B6D4", "darkInk": "#082F49", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F0F9FF", "white": "#FFFFFF", "pantonePri": "Pantone 300 C", "pantoneSec": "Pantone 299 C", "cmykPri": "C:80 M:30 Y:0 K:0", "cmykSec": "C:65 M:15 Y:0 K:0"}, "primaryFont": "Plus Jakarta Sans", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 90 26 C 60 26, 42 48, 42 80 C 42 116, 62 152, 74 160 C 82 165, 88 152, 90 144 C 92 152, 98 165, 106 160 C 118 152, 138 116, 138 80 C 138 48, 120 26, 90 26 Z\" fill=\"#0284C7\"/><path d=\"M 90 32 C 66 32, 50 50, 50 78 C 50 110, 68 142, 78 150 C 84 154, 88 144, 90 138 C 92 144, 96 154, 102 150 C 112 142, 130 110, 130 78 C 130 50, 114 32, 90 32 Z\" fill=\"#0EA5E9\"/><path d=\"M 64 54 C 70 42, 80 38, 90 38 C 84 46, 76 56, 72 70 C 68 64, 66 58, 64 54 Z\" fill=\"#FFFFFF\" opacity=\"0.65\"/><path d=\"M 142 30 L 145 38 L 153 41 L 145 44 L 142 52 L 139 44 L 131 41 L 139 38 Z\" fill=\"#06B6D4\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 90 26 C 60 26, 42 48, 42 80 C 42 116, 62 152, 74 160 C 82 165, 88 152, 90 144 C 92 152, 98 165, 106 160 C 118 152, 138 116, 138 80 C 138 48, 120 26, 90 26 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 32 C 66 32, 50 50, 50 78 C 50 110, 68 142, 78 150 C 84 154, 88 144, 90 138 C 92 144, 96 154, 102 150 C 112 142, 130 110, 130 78 C 130 50, 114 32, 90 32 Z\" fill=\"#0EA5E9\"/><path d=\"M 64 54 C 70 42, 80 38, 90 38 C 84 46, 76 56, 72 70 C 68 64, 66 58, 64 54 Z\" fill=\"#082F49\" opacity=\"0.30\"/><path d=\"M 142 30 L 145 38 L 153 41 L 145 44 L 142 52 L 139 44 L 131 41 L 139 38 Z\" fill=\"#06B6D4\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/></g>"},
    "dentalumina": {"id": 5, "name": "DentaLumina", "slug": "dentalumina", "tagline": "ODONTOLOG\u00cdA DIGITAL, CIRUG\u00cdA GUIADA & EST\u00c9TICA DENTAL", "category": "Profesional / Odontolog\u00eda & Salud", "giro": "Cl\u00ednica odontol\u00f3gica de alta especialidad que combina escaneo intraoral 3D, dise\u00f1o digital de sonrisa, implantes guiados por computadora y carillas de porcelana ultra-delgadas.", "buyer": "Ejecutivos, novias, pacientes y profesionales que buscan perfeccionar su sonrisa con procedimientos indoloros, m\u00ednimamente invasivos y resultados de armon\u00eda natural.", "why": "Porque una sonrisa aut\u00e9ntica y saludable transforma la autoestima, la seguridad personal y la forma en que una persona se conecta con el mundo.", "how": "Eliminamos moldes molestos con esc\u00e1ner \u00f3ptico HD, simulamos el resultado final antes de tocar una pieza y tallamos porcelana con fresado rob\u00f3tico CAD/CAM.", "what": "Dise\u00f1o de Sonrisa Digital (DSD), carillas cer\u00e1micas Feldesp\u00e1ticas, ortodoncia invisible con alineadores transparentes y blanqueamiento l\u00e1ser.", "persona": "Cirujano dentista con sensibilidad de artista y precisi\u00f3n de cirujano pl\u00e1stico: trata al paciente con empat\u00eda absoluta, explica cada fase y garantiza cero dolor.", "niza": "Clase 44 (Servicios m\u00e9dicos y odontol\u00f3gicos, cl\u00ednicas dentales, higiene y est\u00e9tica bucodental).", "tpBefore": ["Simulador virtual en web que muestra c\u00f3mo lucir\u00eda tu sonrisa con escaneo de una selfie", "Tour fotogr\u00e1fico de las instalaciones mostrando quir\u00f3fanos est\u00e9riles y suites privadas de relajaci\u00f3n", "Citas gestionadas por WhatsApp con recordatorio autom\u00e1tico y ubicaci\u00f3n Waze con valet parking", "Testimonios en video en alta definici\u00f3n de pacientes reales mostrando el antes y despu\u00e9s"], "tpDuring": ["Sala de espera con aromaterapia relajante, selecci\u00f3n de caf\u00e9 org\u00e1nico y sill\u00f3n con masaje lumbar", "Uso de lentes de realidad virtual durante el tratamiento para ver pel\u00edculas y aislar ruidos", "Anestesia computarizada indolora dosificada gota a gota para eliminar cualquier molestia", "Fotograf\u00eda cl\u00ednica profesional en estudio fotogr\u00e1fico propio para comparar cada avance"], "tpAfter": ["Kit de bienvenida con cepillo s\u00f3nico recargable, cera ortod\u00f3ntica y pasta remineralizante", "Mensaje personalizado del doctor a las 8:00 PM consultando c\u00f3mo va la recuperaci\u00f3n", "Certificado de autenticidad y garant\u00eda de 10 a\u00f1os en porcelanas y aditamentos de titanio", "Recordatorio autom\u00e1tico de profilaxis y pulido preventivo cada 6 meses"], "colors": {"pri": "#0284C7", "sec": "#0EA5E9", "acc": "#06B6D4", "darkInk": "#082F49", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F0F9FF", "white": "#FFFFFF", "pantonePri": "Pantone 300 C", "pantoneSec": "Pantone 299 C", "cmykPri": "C:80 M:30 Y:0 K:0", "cmykSec": "C:65 M:15 Y:0 K:0"}, "primaryFont": "Plus Jakarta Sans", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 90 26 C 60 26, 42 48, 42 80 C 42 116, 62 152, 74 160 C 82 165, 88 152, 90 144 C 92 152, 98 165, 106 160 C 118 152, 138 116, 138 80 C 138 48, 120 26, 90 26 Z\" fill=\"#0284C7\"/><path d=\"M 90 32 C 66 32, 50 50, 50 78 C 50 110, 68 142, 78 150 C 84 154, 88 144, 90 138 C 92 144, 96 154, 102 150 C 112 142, 130 110, 130 78 C 130 50, 114 32, 90 32 Z\" fill=\"#0EA5E9\"/><path d=\"M 64 54 C 70 42, 80 38, 90 38 C 84 46, 76 56, 72 70 C 68 64, 66 58, 64 54 Z\" fill=\"#FFFFFF\" opacity=\"0.65\"/><path d=\"M 142 30 L 145 38 L 153 41 L 145 44 L 142 52 L 139 44 L 131 41 L 139 38 Z\" fill=\"#06B6D4\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 90 26 C 60 26, 42 48, 42 80 C 42 116, 62 152, 74 160 C 82 165, 88 152, 90 144 C 92 152, 98 165, 106 160 C 118 152, 138 116, 138 80 C 138 48, 120 26, 90 26 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 32 C 66 32, 50 50, 50 78 C 50 110, 68 142, 78 150 C 84 154, 88 144, 90 138 C 92 144, 96 154, 102 150 C 112 142, 130 110, 130 78 C 130 50, 114 32, 90 32 Z\" fill=\"#0EA5E9\"/><path d=\"M 64 54 C 70 42, 80 38, 90 38 C 84 46, 76 56, 72 70 C 68 64, 66 58, 64 54 Z\" fill=\"#082F49\" opacity=\"0.30\"/><path d=\"M 142 30 L 145 38 L 153 41 L 145 44 L 142 52 L 139 44 L 131 41 L 139 38 Z\" fill=\"#06B6D4\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/></g>"},
    "lexprotect_ip": {"id": 6, "name": "LexProtect IP", "slug": "lexprotect_ip", "tagline": "PROPIEDAD INTELECTUAL, PATENTES & DERECHO TECNOL\u00d3GICO", "category": "Servicios / Despacho Jur\u00eddico de Patentes", "giro": "Firma legal especializada en registro internacional de marcas y patentes, secretos industriales, derechos de autor en software e inteligencia artificial y litigio contra pirater\u00eda.", "buyer": "Startups tecnol\u00f3gicas, laboratorios farmac\u00e9uticos, dise\u00f1adores y empresas creadoras de valor intelectual que necesitan blindar sus invenciones en mercados globales.", "why": "Porque una gran idea sin registro legal no te pertenece; defender la innovaci\u00f3n es garantizar el futuro de quienes se atreven a crear.", "how": "Realizamos b\u00fasquedas fon\u00e9ticas y del estado del arte en bases de datos mundiales (IMPI, USPTO, EPO, WIPO) y redactamos memorias t\u00e9cnicas inatacables.", "what": "Patentes de invenci\u00f3n, modelos de utilidad, registros de marca multiclase, contratos de cesi\u00f3n de derechos y ciber-litigio de nombres de dominio.", "persona": "Abogado de patentes con formaci\u00f3n en ingenier\u00eda: comprende el algoritmo o la f\u00f3rmula qu\u00edmica tan profundamente como el c\u00f3digo de leyes que la protege.", "niza": "Clase 45 (Servicios jur\u00eddicos, gesti\u00f3n de propiedad intelectual, concesi\u00f3n de licencias de patentes y litigio de marcas).", "tpBefore": ["B\u00fasqueda fon\u00e9tica preliminar gratuita de viabilidad de marca entregada en 2 horas por correo", "Portal con monitor de marcas que alerta sobre solicitudes de competidores con nombres similares", "Calculadora online de tasas oficiales para registro de patentes en M\u00e9xico, EE.UU. y Europa", "Webinars mensuales sobre protecci\u00f3n de algoritmos de Machine Learning y marcas registradas"], "tpDuring": ["Entrega del expediente de solicitud con sello digital y c\u00f3digo QR de seguimiento ante el IMPI", "Panel de control privado para consultar en tiempo real el estatus de tr\u00e1mites en 140 pa\u00edses", "Redacci\u00f3n estrat\u00e9gica de oposiciones legales contra solicitudes que intenten invadir tu mercado", "Facturaci\u00f3n por honorarios fijos transparentes sin costos ocultos de paqueter\u00eda o gestor\u00eda"], "tpAfter": ["Env\u00edo del T\u00edtulo de Registro Oficial enmarcado en madera fina con grabado en placa met\u00e1lica", "Vigilancia marcaria automatizada 24/7 durante los 10 a\u00f1os de vigencia del t\u00edtulo legal", "Recordatorio oportuno para la Declaraci\u00f3n de Uso Real y Efectivo al tercer a\u00f1o del registro", "Asesor\u00eda expr\u00e9s para redactar contratos de franquicia y licenciamiento comercial de la marca"], "colors": {"pri": "#111827", "sec": "#374151", "acc": "#D97706", "darkInk": "#030712", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone Black 6 C", "pantoneSec": "Pantone 446 C", "cmykPri": "C:60 M:50 Y:40 K:100", "cmykSec": "C:40 M:30 Y:20 K:70"}, "primaryFont": "Cormorant Garamond", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 90 22 L 148 44 C 148 100, 126 142, 90 162 C 54 142, 32 100, 32 44 Z\" fill=\"#111827\" stroke=\"#D97706\" stroke-width=\"2.2\"/><path d=\"M 90 32 L 138 50 C 138 98, 120 134, 90 150 C 60 134, 42 98, 42 50 Z\" fill=\"#374151\"/><path d=\"M 90 46 L 102 78 L 102 116 L 90 128 L 78 116 L 78 78 Z\" fill=\"#D97706\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"108\" stroke=\"#111827\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"108\" r=\"3.5\" fill=\"#111827\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 90 22 L 148 44 C 148 100, 126 142, 90 162 C 54 142, 32 100, 32 44 Z\" fill=\"#FFFFFF\" stroke=\"#D97706\" stroke-width=\"2.2\"/><path d=\"M 90 32 L 138 50 C 138 98, 120 134, 90 150 C 60 134, 42 98, 42 50 Z\" fill=\"#D97706\"/><path d=\"M 90 46 L 102 78 L 102 116 L 90 128 L 78 116 L 78 78 Z\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"108\" stroke=\"#D97706\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"108\" r=\"3.5\" fill=\"#D97706\"/></g>"},
    "lexprotect_ip": {"id": 6, "name": "LexProtect IP", "slug": "lexprotect_ip", "tagline": "PROPIEDAD INTELECTUAL, PATENTES & DERECHO TECNOL\u00d3GICO", "category": "Servicios / Despacho Jur\u00eddico de Patentes", "giro": "Firma legal especializada en registro internacional de marcas y patentes, secretos industriales, derechos de autor en software e inteligencia artificial y litigio contra pirater\u00eda.", "buyer": "Startups tecnol\u00f3gicas, laboratorios farmac\u00e9uticos, dise\u00f1adores y empresas creadoras de valor intelectual que necesitan blindar sus invenciones en mercados globales.", "why": "Porque una gran idea sin registro legal no te pertenece; defender la innovaci\u00f3n es garantizar el futuro de quienes se atreven a crear.", "how": "Realizamos b\u00fasquedas fon\u00e9ticas y del estado del arte en bases de datos mundiales (IMPI, USPTO, EPO, WIPO) y redactamos memorias t\u00e9cnicas inatacables.", "what": "Patentes de invenci\u00f3n, modelos de utilidad, registros de marca multiclase, contratos de cesi\u00f3n de derechos y ciber-litigio de nombres de dominio.", "persona": "Abogado de patentes con formaci\u00f3n en ingenier\u00eda: comprende el algoritmo o la f\u00f3rmula qu\u00edmica tan profundamente como el c\u00f3digo de leyes que la protege.", "niza": "Clase 45 (Servicios jur\u00eddicos, gesti\u00f3n de propiedad intelectual, concesi\u00f3n de licencias de patentes y litigio de marcas).", "tpBefore": ["B\u00fasqueda fon\u00e9tica preliminar gratuita de viabilidad de marca entregada en 2 horas por correo", "Portal con monitor de marcas que alerta sobre solicitudes de competidores con nombres similares", "Calculadora online de tasas oficiales para registro de patentes en M\u00e9xico, EE.UU. y Europa", "Webinars mensuales sobre protecci\u00f3n de algoritmos de Machine Learning y marcas registradas"], "tpDuring": ["Entrega del expediente de solicitud con sello digital y c\u00f3digo QR de seguimiento ante el IMPI", "Panel de control privado para consultar en tiempo real el estatus de tr\u00e1mites en 140 pa\u00edses", "Redacci\u00f3n estrat\u00e9gica de oposiciones legales contra solicitudes que intenten invadir tu mercado", "Facturaci\u00f3n por honorarios fijos transparentes sin costos ocultos de paqueter\u00eda o gestor\u00eda"], "tpAfter": ["Env\u00edo del T\u00edtulo de Registro Oficial enmarcado en madera fina con grabado en placa met\u00e1lica", "Vigilancia marcaria automatizada 24/7 durante los 10 a\u00f1os de vigencia del t\u00edtulo legal", "Recordatorio oportuno para la Declaraci\u00f3n de Uso Real y Efectivo al tercer a\u00f1o del registro", "Asesor\u00eda expr\u00e9s para redactar contratos de franquicia y licenciamiento comercial de la marca"], "colors": {"pri": "#111827", "sec": "#374151", "acc": "#D97706", "darkInk": "#030712", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone Black 6 C", "pantoneSec": "Pantone 446 C", "cmykPri": "C:60 M:50 Y:40 K:100", "cmykSec": "C:40 M:30 Y:20 K:70"}, "primaryFont": "Cormorant Garamond", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 90 22 L 148 44 C 148 100, 126 142, 90 162 C 54 142, 32 100, 32 44 Z\" fill=\"#111827\" stroke=\"#D97706\" stroke-width=\"2.2\"/><path d=\"M 90 32 L 138 50 C 138 98, 120 134, 90 150 C 60 134, 42 98, 42 50 Z\" fill=\"#374151\"/><path d=\"M 90 46 L 102 78 L 102 116 L 90 128 L 78 116 L 78 78 Z\" fill=\"#D97706\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"108\" stroke=\"#111827\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"108\" r=\"3.5\" fill=\"#111827\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 90 22 L 148 44 C 148 100, 126 142, 90 162 C 54 142, 32 100, 32 44 Z\" fill=\"#FFFFFF\" stroke=\"#D97706\" stroke-width=\"2.2\"/><path d=\"M 90 32 L 138 50 C 138 98, 120 134, 90 150 C 60 134, 42 98, 42 50 Z\" fill=\"#D97706\"/><path d=\"M 90 46 L 102 78 L 102 116 L 90 128 L 78 116 L 78 78 Z\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"46\" x2=\"90\" y2=\"108\" stroke=\"#D97706\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"108\" r=\"3.5\" fill=\"#D97706\"/></g>"},
    "brasa_y_nori": {"id": 7, "name": "Brasa & Nori", "slug": "brasa_y_nori", "tagline": "COCINA DE FUEGO NIKKEI & BARRA OMAKASE", "category": "Comestibles / Restaurante Nikkei & Fusi\u00f3n", "giro": "Restaurante de alta cocina nikkei que fusiona el rigor y la pureza del corte japon\u00e9s con la intensidad del fuego de le\u00f1a de encino y los aj\u00edes del Per\u00fa y M\u00e9xico.", "buyer": "Foodies cosmopolitas, parejas y grupos de amigos que buscan una experiencia sensorial vibrante, cocteler\u00eda bot\u00e1nica de autor y maridajes inolvidables.", "why": "Porque cuando la precisi\u00f3n milim\u00e9trica del corte crudo se encuentra con el humo salvaje de la brasa, la gastronom\u00eda trasciende en pura emoci\u00f3n.", "how": "Seleccionamos pesca del d\u00eda sustentable de cooperativas ribere\u00f1as, asamos con carb\u00f3n binchotan sin humo y elaboramos salsas de fermentaci\u00f3n propia.", "what": "Nigiris flameados al soplete con mantequilla trufada, anticuchos de pulpo a la brasa, tiraditos de hamachi con aj\u00ed amarillo y barra omakase de 9 tiempos.", "persona": "Itamae apasionado con delantal de cuero y cuchillo yanagiba: atiende la barra con reverencia y explica la historia de cada bocado antes de colocarlo en tu plato.", "niza": "Clase 43 (Servicios de restauraci\u00f3n, restaurantes de sushi y brasa, bares y catering gourmet).", "tpBefore": ["Feed de Instagram con fotograf\u00eda macro de cortes de at\u00fan aleta azul y chispas de fuego", "Sistema de reservaci\u00f3n por OpenTable integrado con confirmaci\u00f3n instant\u00e1nea por WhatsApp", "Men\u00fa degustaci\u00f3n publicado diariamente seg\u00fan la pesca fresca disponible en lonja", "Fachada sobria en madera quemada Shou Sugi Ban con luz tenue y aroma sutil a encino"], "tpDuring": ["Bienvenida en la barra con toalla h\u00fameda Oshibori caliente con aroma a t\u00e9 verde y c\u00edtricos", "Servicio sincronizado en vajilla de cer\u00e1mica negra artesanal hecha por artesanos de Oaxaca", "Cata guiada de sakes artesanales y mezcales de agave silvestre por el sommelier de la casa", "Demostraci\u00f3n en vivo del corte de pescado y t\u00e9cnica de soplado frente al comensal"], "tpAfter": ["Infusi\u00f3n de cortes\u00eda de jengibre y zacate lim\u00f3n servida en taza t\u00e9rmica para el camino", "Env\u00edo digital de la comanda detallando los nombres de cada pieza degustada y su origen", "Invitaci\u00f3n preferente a las noches mensuales de ronqueo de at\u00fan en vivo con el chef invitado", "Tarjeta de cliente frecuente que desbloquea bocados secretos en visitas subsecuentes"], "colors": {"pri": "#18181B", "sec": "#DC2626", "acc": "#F59E0B", "darkInk": "#09090B", "midGray": "#71717A", "lightGray": "#E4E4E7", "softBg": "#FAFAFA", "white": "#FFFFFF", "pantonePri": "Pantone Black 7 C", "pantoneSec": "Pantone 186 C", "cmykPri": "C:50 M:40 Y:30 K:95", "cmykSec": "C:0 M:95 Y:90 K:0"}, "primaryFont": "Syne", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"#18181B\"/><path d=\"M 90 28 C 118 42, 138 76, 126 112 C 114 148, 72 158, 56 128 C 44 104, 60 80, 80 72 C 68 84, 68 100, 78 108 C 88 116, 102 108, 106 94 C 110 76, 96 52, 90 28 Z\" fill=\"#DC2626\"/><path d=\"M 92 68 C 104 80, 108 96, 98 108 C 90 116, 78 112, 74 104 C 80 102, 86 96, 88 88 C 90 80, 88 74, 92 68 Z\" fill=\"#F59E0B\"/><line x1=\"36\" y1=\"46\" x2=\"144\" y2=\"134\" stroke=\"#FAF8F5\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"50\" y1=\"36\" x2=\"134\" y2=\"148\" stroke=\"#FAF8F5\" stroke-width=\"3\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"#FFFFFF\"/><path d=\"M 90 28 C 118 42, 138 76, 126 112 C 114 148, 72 158, 56 128 C 44 104, 60 80, 80 72 C 68 84, 68 100, 78 108 C 88 116, 102 108, 106 94 C 110 76, 96 52, 90 28 Z\" fill=\"#DC2626\"/><path d=\"M 92 68 C 104 80, 108 96, 98 108 C 90 116, 78 112, 74 104 C 80 102, 86 96, 88 88 C 90 80, 88 74, 92 68 Z\" fill=\"#F59E0B\"/><line x1=\"36\" y1=\"46\" x2=\"144\" y2=\"134\" stroke=\"#18181B\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"50\" y1=\"36\" x2=\"134\" y2=\"148\" stroke=\"#18181B\" stroke-width=\"3\" stroke-linecap=\"round\"/></g>"},
    "brasa_&_nori": {"id": 7, "name": "Brasa & Nori", "slug": "brasa_y_nori", "tagline": "COCINA DE FUEGO NIKKEI & BARRA OMAKASE", "category": "Comestibles / Restaurante Nikkei & Fusi\u00f3n", "giro": "Restaurante de alta cocina nikkei que fusiona el rigor y la pureza del corte japon\u00e9s con la intensidad del fuego de le\u00f1a de encino y los aj\u00edes del Per\u00fa y M\u00e9xico.", "buyer": "Foodies cosmopolitas, parejas y grupos de amigos que buscan una experiencia sensorial vibrante, cocteler\u00eda bot\u00e1nica de autor y maridajes inolvidables.", "why": "Porque cuando la precisi\u00f3n milim\u00e9trica del corte crudo se encuentra con el humo salvaje de la brasa, la gastronom\u00eda trasciende en pura emoci\u00f3n.", "how": "Seleccionamos pesca del d\u00eda sustentable de cooperativas ribere\u00f1as, asamos con carb\u00f3n binchotan sin humo y elaboramos salsas de fermentaci\u00f3n propia.", "what": "Nigiris flameados al soplete con mantequilla trufada, anticuchos de pulpo a la brasa, tiraditos de hamachi con aj\u00ed amarillo y barra omakase de 9 tiempos.", "persona": "Itamae apasionado con delantal de cuero y cuchillo yanagiba: atiende la barra con reverencia y explica la historia de cada bocado antes de colocarlo en tu plato.", "niza": "Clase 43 (Servicios de restauraci\u00f3n, restaurantes de sushi y brasa, bares y catering gourmet).", "tpBefore": ["Feed de Instagram con fotograf\u00eda macro de cortes de at\u00fan aleta azul y chispas de fuego", "Sistema de reservaci\u00f3n por OpenTable integrado con confirmaci\u00f3n instant\u00e1nea por WhatsApp", "Men\u00fa degustaci\u00f3n publicado diariamente seg\u00fan la pesca fresca disponible en lonja", "Fachada sobria en madera quemada Shou Sugi Ban con luz tenue y aroma sutil a encino"], "tpDuring": ["Bienvenida en la barra con toalla h\u00fameda Oshibori caliente con aroma a t\u00e9 verde y c\u00edtricos", "Servicio sincronizado en vajilla de cer\u00e1mica negra artesanal hecha por artesanos de Oaxaca", "Cata guiada de sakes artesanales y mezcales de agave silvestre por el sommelier de la casa", "Demostraci\u00f3n en vivo del corte de pescado y t\u00e9cnica de soplado frente al comensal"], "tpAfter": ["Infusi\u00f3n de cortes\u00eda de jengibre y zacate lim\u00f3n servida en taza t\u00e9rmica para el camino", "Env\u00edo digital de la comanda detallando los nombres de cada pieza degustada y su origen", "Invitaci\u00f3n preferente a las noches mensuales de ronqueo de at\u00fan en vivo con el chef invitado", "Tarjeta de cliente frecuente que desbloquea bocados secretos en visitas subsecuentes"], "colors": {"pri": "#18181B", "sec": "#DC2626", "acc": "#F59E0B", "darkInk": "#09090B", "midGray": "#71717A", "lightGray": "#E4E4E7", "softBg": "#FAFAFA", "white": "#FFFFFF", "pantonePri": "Pantone Black 7 C", "pantoneSec": "Pantone 186 C", "cmykPri": "C:50 M:40 Y:30 K:95", "cmykSec": "C:0 M:95 Y:90 K:0"}, "primaryFont": "Syne", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"#18181B\"/><path d=\"M 90 28 C 118 42, 138 76, 126 112 C 114 148, 72 158, 56 128 C 44 104, 60 80, 80 72 C 68 84, 68 100, 78 108 C 88 116, 102 108, 106 94 C 110 76, 96 52, 90 28 Z\" fill=\"#DC2626\"/><path d=\"M 92 68 C 104 80, 108 96, 98 108 C 90 116, 78 112, 74 104 C 80 102, 86 96, 88 88 C 90 80, 88 74, 92 68 Z\" fill=\"#F59E0B\"/><line x1=\"36\" y1=\"46\" x2=\"144\" y2=\"134\" stroke=\"#FAF8F5\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"50\" y1=\"36\" x2=\"134\" y2=\"148\" stroke=\"#FAF8F5\" stroke-width=\"3\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"#FFFFFF\"/><path d=\"M 90 28 C 118 42, 138 76, 126 112 C 114 148, 72 158, 56 128 C 44 104, 60 80, 80 72 C 68 84, 68 100, 78 108 C 88 116, 102 108, 106 94 C 110 76, 96 52, 90 28 Z\" fill=\"#DC2626\"/><path d=\"M 92 68 C 104 80, 108 96, 98 108 C 90 116, 78 112, 74 104 C 80 102, 86 96, 88 88 C 90 80, 88 74, 92 68 Z\" fill=\"#F59E0B\"/><line x1=\"36\" y1=\"46\" x2=\"144\" y2=\"134\" stroke=\"#18181B\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"50\" y1=\"36\" x2=\"134\" y2=\"148\" stroke=\"#18181B\" stroke-width=\"3\" stroke-linecap=\"round\"/></g>"},
    "titanium_forge": {"id": 8, "name": "Titanium Forge", "slug": "titanium_forge", "tagline": "GIMNASIO DE FUERZA, HALTEROFILIA & CALISTENIA DE ALTO RENDIMIENTO", "category": "Servicios / Gimnasio & Entrenamiento", "giro": "Centro de entrenamiento de fuerza pura, halterofilia ol\u00edmpica y calistenia avanzada, equipado con barras de competencia calibradas, plataformas de madera y asesor\u00eda biomec\u00e1nica.", "buyer": "Atletas de fuerza, powerlifters y personas comprometidas que rechazan los gimnasios comerciales de pl\u00e1stico y buscan construir poder muscular real y disciplina inquebrantable.", "why": "Porque la fuerza f\u00edsica no es vanidad; es la armadura sobre la cual se cimientan la resiliencia mental y la longevidad del ser humano.", "how": "Dise\u00f1amos progresiones de sobrecarga basadas en datos, ense\u00f1amos t\u00e9cnica milim\u00e9trica de levantamiento y forjamos una hermandad donde nadie entrena solo.", "what": "Membres\u00edas de acceso libre, programas periodizados de fuerza, coaching biomec\u00e1nico personalizado y talleres de arrancada ol\u00edmpica.", "persona": "Entrenador jefe y ex-halterista: corrige tu postura con un comp\u00e1s en la mirada, aplaude tu esfuerzo con magnesia en las manos y te exige superarte sin excusas.", "niza": "Clase 41 (Servicios de entrenamiento f\u00edsico, gimnasios de halterofilia, clubes deportivos y preparaci\u00f3n de atletas).", "tpBefore": ["Video cinem\u00e1tico en YouTube mostrando el silencio tenso antes de levantar 250 kg de peso muerto", "Calculadora web de 1RM (repetici\u00f3n m\u00e1xima) y test de movilidad articular online gratuito", "Clase de prueba presencial de 90 minutos con diagn\u00f3stico t\u00e9cnico de sentadilla y press de banca", "Instalaciones industriales con ventilaci\u00f3n cruzada natural y pisos de caucho de alta densidad"], "tpDuring": ["Asignaci\u00f3n de casillero met\u00e1lico numerado con toalla de algod\u00f3n pesado y bote de magnesio l\u00edquido", "Supervisi\u00f3n activa del coach en cada serie para garantizar rango de movimiento completo y seguro", "Pizarr\u00f3n comunitario donde se registran los nuevos r\u00e9cords personales logrados en el d\u00eda", "Barra de recuperaci\u00f3n con batidos de prote\u00edna aislada limpia, electrolitos y fruta fresca"], "tpAfter": ["App m\u00f3vil para registrar cargas, volumen semanal y gr\u00e1ficos de progresi\u00f3n de fuerza", "Chequeo mensual de composici\u00f3n corporal por bioimpedancia m\u00e9dica con nutri\u00f3logo deportivo", "Competencias internas trimestrales de levantamiento con jueces certificados y medallas de acero", "Descuento en tiendas de equipo t\u00e9cnico: cinturones de palanca, rodilleras y calzado de halterofilia"], "colors": {"pri": "#334155", "sec": "#475569", "acc": "#EA580C", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 431 C", "pantoneSec": "Pantone 430 C", "cmykPri": "C:55 M:40 Y:30 K:40", "cmykSec": "C:45 M:30 Y:25 K:30"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"90,16 154,52 154,128 90,164 26,128 26,52\" fill=\"#334155\"/><polygon points=\"90,26 144,57 144,123 90,154 36,123 36,57\" fill=\"#0F172A\"/><path d=\"M 46 80 L 134 80 L 126 96 L 106 96 L 110 126 L 70 126 L 74 96 L 54 96 Z\" fill=\"#475569\"/><path d=\"M 38 80 L 52 80 L 52 92 L 42 92 Z\" fill=\"#EA580C\"/><circle cx=\"90\" cy=\"54\" r=\"8\" fill=\"#EA580C\"/><path d=\"M 86 42 L 94 42 L 94 66 L 86 66 Z\" fill=\"#FFFFFF\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"90,16 154,52 154,128 90,164 26,128 26,52\" fill=\"#FFFFFF\"/><polygon points=\"90,26 144,57 144,123 90,154 36,123 36,57\" fill=\"#334155\"/><path d=\"M 46 80 L 134 80 L 126 96 L 106 96 L 110 126 L 70 126 L 74 96 L 54 96 Z\" fill=\"#EA580C\"/><path d=\"M 38 80 L 52 80 L 52 92 L 42 92 Z\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"54\" r=\"8\" fill=\"#FFFFFF\"/><path d=\"M 86 42 L 94 42 L 94 66 L 86 66 Z\" fill=\"#EA580C\"/></g>"},
    "titanium_forge": {"id": 8, "name": "Titanium Forge", "slug": "titanium_forge", "tagline": "GIMNASIO DE FUERZA, HALTEROFILIA & CALISTENIA DE ALTO RENDIMIENTO", "category": "Servicios / Gimnasio & Entrenamiento", "giro": "Centro de entrenamiento de fuerza pura, halterofilia ol\u00edmpica y calistenia avanzada, equipado con barras de competencia calibradas, plataformas de madera y asesor\u00eda biomec\u00e1nica.", "buyer": "Atletas de fuerza, powerlifters y personas comprometidas que rechazan los gimnasios comerciales de pl\u00e1stico y buscan construir poder muscular real y disciplina inquebrantable.", "why": "Porque la fuerza f\u00edsica no es vanidad; es la armadura sobre la cual se cimientan la resiliencia mental y la longevidad del ser humano.", "how": "Dise\u00f1amos progresiones de sobrecarga basadas en datos, ense\u00f1amos t\u00e9cnica milim\u00e9trica de levantamiento y forjamos una hermandad donde nadie entrena solo.", "what": "Membres\u00edas de acceso libre, programas periodizados de fuerza, coaching biomec\u00e1nico personalizado y talleres de arrancada ol\u00edmpica.", "persona": "Entrenador jefe y ex-halterista: corrige tu postura con un comp\u00e1s en la mirada, aplaude tu esfuerzo con magnesia en las manos y te exige superarte sin excusas.", "niza": "Clase 41 (Servicios de entrenamiento f\u00edsico, gimnasios de halterofilia, clubes deportivos y preparaci\u00f3n de atletas).", "tpBefore": ["Video cinem\u00e1tico en YouTube mostrando el silencio tenso antes de levantar 250 kg de peso muerto", "Calculadora web de 1RM (repetici\u00f3n m\u00e1xima) y test de movilidad articular online gratuito", "Clase de prueba presencial de 90 minutos con diagn\u00f3stico t\u00e9cnico de sentadilla y press de banca", "Instalaciones industriales con ventilaci\u00f3n cruzada natural y pisos de caucho de alta densidad"], "tpDuring": ["Asignaci\u00f3n de casillero met\u00e1lico numerado con toalla de algod\u00f3n pesado y bote de magnesio l\u00edquido", "Supervisi\u00f3n activa del coach en cada serie para garantizar rango de movimiento completo y seguro", "Pizarr\u00f3n comunitario donde se registran los nuevos r\u00e9cords personales logrados en el d\u00eda", "Barra de recuperaci\u00f3n con batidos de prote\u00edna aislada limpia, electrolitos y fruta fresca"], "tpAfter": ["App m\u00f3vil para registrar cargas, volumen semanal y gr\u00e1ficos de progresi\u00f3n de fuerza", "Chequeo mensual de composici\u00f3n corporal por bioimpedancia m\u00e9dica con nutri\u00f3logo deportivo", "Competencias internas trimestrales de levantamiento con jueces certificados y medallas de acero", "Descuento en tiendas de equipo t\u00e9cnico: cinturones de palanca, rodilleras y calzado de halterofilia"], "colors": {"pri": "#334155", "sec": "#475569", "acc": "#EA580C", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 431 C", "pantoneSec": "Pantone 430 C", "cmykPri": "C:55 M:40 Y:30 K:40", "cmykSec": "C:45 M:30 Y:25 K:30"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"90,16 154,52 154,128 90,164 26,128 26,52\" fill=\"#334155\"/><polygon points=\"90,26 144,57 144,123 90,154 36,123 36,57\" fill=\"#0F172A\"/><path d=\"M 46 80 L 134 80 L 126 96 L 106 96 L 110 126 L 70 126 L 74 96 L 54 96 Z\" fill=\"#475569\"/><path d=\"M 38 80 L 52 80 L 52 92 L 42 92 Z\" fill=\"#EA580C\"/><circle cx=\"90\" cy=\"54\" r=\"8\" fill=\"#EA580C\"/><path d=\"M 86 42 L 94 42 L 94 66 L 86 66 Z\" fill=\"#FFFFFF\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"90,16 154,52 154,128 90,164 26,128 26,52\" fill=\"#FFFFFF\"/><polygon points=\"90,26 144,57 144,123 90,154 36,123 36,57\" fill=\"#334155\"/><path d=\"M 46 80 L 134 80 L 126 96 L 106 96 L 110 126 L 70 126 L 74 96 L 54 96 Z\" fill=\"#EA580C\"/><path d=\"M 38 80 L 52 80 L 52 92 L 42 92 Z\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"54\" r=\"8\" fill=\"#FFFFFF\"/><path d=\"M 86 42 L 94 42 L 94 66 L 86 66 Z\" fill=\"#EA580C\"/></g>"},
    "grano_silvestre": {"id": 9, "name": "Grano Silvestre", "slug": "grano_silvestre", "tagline": "CAF\u00c9 DE ESPECIALIDAD & MICRO-TOSTADUR\u00cdA DE ALTURA", "category": "Comestibles / Caf\u00e9 de Especialidad", "giro": "Tostadur\u00eda de caf\u00e9 de especialidad de origen \u00e9tico con puntuaci\u00f3n SCA superior a 86, tostado en peque\u00f1os lotes con perfil de curva t\u00e9rmica y cafeter\u00eda de m\u00e9todos artesanales.", "buyer": "Amantes del buen caf\u00e9, baristas y n\u00f3madas digitales que valoran la trazabilidad de la finca, las notas sensoriales complejas y el comercio justo con productores locales.", "why": "Porque una taza de caf\u00e9 excepcional es el puente que conecta el trabajo digno del agricultor en la monta\u00f1a con la lucidez y el placer del citadino.", "how": "Compramos directamente a fincas sustentables de Oaxaca, Chiapas y Veracruz, catamos cada lote y tostamos para resaltar notas frutales y florales naturales.", "what": "Bolsas de caf\u00e9 de grano entero con fecha de tueste, servicio de barra de espresso y m\u00e9todos lentos (V60, Chemex, Aeropress, Cold Brew).", "persona": "Tostador y catador Q-Grader: huele la molienda con reverencia y te ense\u00f1a a percibir los matices de jazm\u00edn, cacao y ciruela amarilla en cada sorbo.", "niza": "Clase 30 (Caf\u00e9, granos de caf\u00e9 tostados, bebidas a base de caf\u00e9 y suced\u00e1neos de caf\u00e9).", "tpBefore": ["Mapa interactivo en la tienda online mostrando la altitud, varietal y nombre del productor de cada microlote", "Gu\u00edas ilustradas de preparaci\u00f3n en casa para Chemex, cafetera italiana y prensa francesa", "Aroma embriagador a caf\u00e9 reci\u00e9n tostado en el obrador los martes y viernes por la ma\u00f1ana", "Prueba de molienda y degustaci\u00f3n de caf\u00e9 en grano antes de realizar la compra"], "tpDuring": ["Explicaci\u00f3n sensorial del barista sobre la temperatura y tiempo de extracci\u00f3n de tu m\u00e9todo elegido", "Empaque en bolsas herm\u00e9ticas con v\u00e1lvula desgasificadora y cierre zip reutilizable", "Acompa\u00f1amiento con vaso de agua mineral fr\u00eda con gas para limpiar el paladar antes de probar el caf\u00e9", "Posibilidad de moler el grano en molino Mahlk\u00f6nig seg\u00fan el m\u00e9todo de cafetera del cliente"], "tpAfter": ["Suscripci\u00f3n mensual de caf\u00e9 a domicilio con granos reci\u00e9n tostados y ficha t\u00e9cnica del lote", "Invitaci\u00f3n a catas p\u00fablicas gratuitas el primer s\u00e1bado de cada mes para comparar varietales", "Recepci\u00f3n de sacos vac\u00edos de caf\u00e9 de yute para reutilizaci\u00f3n en macetas y jardines urbanos", "Acceso al canal de Discord de baristas caseros para intercambiar recetas de extracci\u00f3n de agua"], "colors": {"pri": "#3B2219", "sec": "#78350F", "acc": "#15803D", "darkInk": "#1C120C", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 4695 C", "pantoneSec": "Pantone 7554 C", "cmykPri": "C:40 M:70 Y:80 K:60", "cmykSec": "C:25 M:65 Y:95 K:35"}, "primaryFont": "Fraunces", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FAF8F5\" stroke=\"#78350F\" stroke-width=\"1.8\"/><path d=\"M 60 76 C 50 48, 64 28, 86 36 C 88 56, 76 74, 60 76 Z\" fill=\"#15803D\"/><line x1=\"62\" y1=\"72\" x2=\"84\" y2=\"40\" stroke=\"#86EFAC\" stroke-width=\"1.2\"/><path d=\"M 120 76 C 130 48, 116 28, 94 36 C 92 56, 104 74, 120 76 Z\" fill=\"#15803D\"/><line x1=\"118\" y1=\"72\" x2=\"96\" y2=\"40\" stroke=\"#86EFAC\" stroke-width=\"1.2\"/><ellipse cx=\"90\" cy=\"112\" rx=\"38\" ry=\"46\" fill=\"#3B2219\"/><path d=\"M 90 68 C 82 82, 100 102, 90 120 C 80 138, 98 152, 90 156\" fill=\"none\" stroke=\"#FAF8F5\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"56\" cy=\"92\" r=\"7\" fill=\"#DC2626\"/><circle cx=\"124\" cy=\"92\" r=\"7\" fill=\"#DC2626\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"1.8\"/><path d=\"M 60 76 C 50 48, 64 28, 86 36 C 88 56, 76 74, 60 76 Z\" fill=\"#86EFAC\"/><line x1=\"62\" y1=\"72\" x2=\"84\" y2=\"40\" stroke=\"#15803D\" stroke-width=\"1.2\"/><path d=\"M 120 76 C 130 48, 116 28, 94 36 C 92 56, 104 74, 120 76 Z\" fill=\"#86EFAC\"/><line x1=\"118\" y1=\"72\" x2=\"96\" y2=\"40\" stroke=\"#15803D\" stroke-width=\"1.2\"/><ellipse cx=\"90\" cy=\"112\" rx=\"38\" ry=\"46\" fill=\"#FFFFFF\"/><path d=\"M 90 68 C 82 82, 100 102, 90 120 C 80 138, 98 152, 90 156\" fill=\"none\" stroke=\"#78350F\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"56\" cy=\"92\" r=\"7\" fill=\"#F87171\"/><circle cx=\"124\" cy=\"92\" r=\"7\" fill=\"#F87171\"/></g>"},
    "grano_silvestre": {"id": 9, "name": "Grano Silvestre", "slug": "grano_silvestre", "tagline": "CAF\u00c9 DE ESPECIALIDAD & MICRO-TOSTADUR\u00cdA DE ALTURA", "category": "Comestibles / Caf\u00e9 de Especialidad", "giro": "Tostadur\u00eda de caf\u00e9 de especialidad de origen \u00e9tico con puntuaci\u00f3n SCA superior a 86, tostado en peque\u00f1os lotes con perfil de curva t\u00e9rmica y cafeter\u00eda de m\u00e9todos artesanales.", "buyer": "Amantes del buen caf\u00e9, baristas y n\u00f3madas digitales que valoran la trazabilidad de la finca, las notas sensoriales complejas y el comercio justo con productores locales.", "why": "Porque una taza de caf\u00e9 excepcional es el puente que conecta el trabajo digno del agricultor en la monta\u00f1a con la lucidez y el placer del citadino.", "how": "Compramos directamente a fincas sustentables de Oaxaca, Chiapas y Veracruz, catamos cada lote y tostamos para resaltar notas frutales y florales naturales.", "what": "Bolsas de caf\u00e9 de grano entero con fecha de tueste, servicio de barra de espresso y m\u00e9todos lentos (V60, Chemex, Aeropress, Cold Brew).", "persona": "Tostador y catador Q-Grader: huele la molienda con reverencia y te ense\u00f1a a percibir los matices de jazm\u00edn, cacao y ciruela amarilla en cada sorbo.", "niza": "Clase 30 (Caf\u00e9, granos de caf\u00e9 tostados, bebidas a base de caf\u00e9 y suced\u00e1neos de caf\u00e9).", "tpBefore": ["Mapa interactivo en la tienda online mostrando la altitud, varietal y nombre del productor de cada microlote", "Gu\u00edas ilustradas de preparaci\u00f3n en casa para Chemex, cafetera italiana y prensa francesa", "Aroma embriagador a caf\u00e9 reci\u00e9n tostado en el obrador los martes y viernes por la ma\u00f1ana", "Prueba de molienda y degustaci\u00f3n de caf\u00e9 en grano antes de realizar la compra"], "tpDuring": ["Explicaci\u00f3n sensorial del barista sobre la temperatura y tiempo de extracci\u00f3n de tu m\u00e9todo elegido", "Empaque en bolsas herm\u00e9ticas con v\u00e1lvula desgasificadora y cierre zip reutilizable", "Acompa\u00f1amiento con vaso de agua mineral fr\u00eda con gas para limpiar el paladar antes de probar el caf\u00e9", "Posibilidad de moler el grano en molino Mahlk\u00f6nig seg\u00fan el m\u00e9todo de cafetera del cliente"], "tpAfter": ["Suscripci\u00f3n mensual de caf\u00e9 a domicilio con granos reci\u00e9n tostados y ficha t\u00e9cnica del lote", "Invitaci\u00f3n a catas p\u00fablicas gratuitas el primer s\u00e1bado de cada mes para comparar varietales", "Recepci\u00f3n de sacos vac\u00edos de caf\u00e9 de yute para reutilizaci\u00f3n en macetas y jardines urbanos", "Acceso al canal de Discord de baristas caseros para intercambiar recetas de extracci\u00f3n de agua"], "colors": {"pri": "#3B2219", "sec": "#78350F", "acc": "#15803D", "darkInk": "#1C120C", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 4695 C", "pantoneSec": "Pantone 7554 C", "cmykPri": "C:40 M:70 Y:80 K:60", "cmykSec": "C:25 M:65 Y:95 K:35"}, "primaryFont": "Fraunces", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FAF8F5\" stroke=\"#78350F\" stroke-width=\"1.8\"/><path d=\"M 60 76 C 50 48, 64 28, 86 36 C 88 56, 76 74, 60 76 Z\" fill=\"#15803D\"/><line x1=\"62\" y1=\"72\" x2=\"84\" y2=\"40\" stroke=\"#86EFAC\" stroke-width=\"1.2\"/><path d=\"M 120 76 C 130 48, 116 28, 94 36 C 92 56, 104 74, 120 76 Z\" fill=\"#15803D\"/><line x1=\"118\" y1=\"72\" x2=\"96\" y2=\"40\" stroke=\"#86EFAC\" stroke-width=\"1.2\"/><ellipse cx=\"90\" cy=\"112\" rx=\"38\" ry=\"46\" fill=\"#3B2219\"/><path d=\"M 90 68 C 82 82, 100 102, 90 120 C 80 138, 98 152, 90 156\" fill=\"none\" stroke=\"#FAF8F5\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"56\" cy=\"92\" r=\"7\" fill=\"#DC2626\"/><circle cx=\"124\" cy=\"92\" r=\"7\" fill=\"#DC2626\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#FDE68A\" stroke-width=\"1.8\"/><path d=\"M 60 76 C 50 48, 64 28, 86 36 C 88 56, 76 74, 60 76 Z\" fill=\"#86EFAC\"/><line x1=\"62\" y1=\"72\" x2=\"84\" y2=\"40\" stroke=\"#15803D\" stroke-width=\"1.2\"/><path d=\"M 120 76 C 130 48, 116 28, 94 36 C 92 56, 104 74, 120 76 Z\" fill=\"#86EFAC\"/><line x1=\"118\" y1=\"72\" x2=\"96\" y2=\"40\" stroke=\"#15803D\" stroke-width=\"1.2\"/><ellipse cx=\"90\" cy=\"112\" rx=\"38\" ry=\"46\" fill=\"#FFFFFF\"/><path d=\"M 90 68 C 82 82, 100 102, 90 120 C 80 138, 98 152, 90 156\" fill=\"none\" stroke=\"#78350F\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"56\" cy=\"92\" r=\"7\" fill=\"#F87171\"/><circle cx=\"124\" cy=\"92\" r=\"7\" fill=\"#F87171\"/></g>"},
    "nexus_scale": {"id": 10, "name": "Nexus Scale", "slug": "nexus_scale", "tagline": "GROWTH MARKETING, ADTECH & ESTRATEGIA DE ESCALAMIENTO", "category": "Servicios / Growth Marketing & AdTech", "giro": "Agencia de ingenier\u00eda de crecimiento para empresas tecnol\u00f3gicas y e-commerce, combinando compra de medios con algoritmos de atribuci\u00f3n, optimizaci\u00f3n de embudos y anal\u00edtica predictiva.", "buyer": "CEOs, CMOs y directores de e-commerce que necesitan escalar su facturaci\u00f3n reduciendo el CAC (Costo de Adquisici\u00f3n de Clientes) y maximizando el LTV.", "why": "Porque en un ecosistema saturado de publicidad vac\u00eda, el crecimiento rentable solo responde a hip\u00f3tesis cient\u00edficas, datos duros y ejecuci\u00f3n \u00e1gil.", "how": "Conectamos tracking server-side, dise\u00f1amos creativos de alta conversi\u00f3n con pruebas A/B y automatizamos pujas con modelos de machine learning.", "what": "Campa\u00f1as de Google Ads, Meta Ads y TikTok Ads orientadas a ROI, optimizaci\u00f3n CRO de p\u00e1ginas de venta y dashboards ejecutivos en tiempo real.", "persona": "Ingeniero de crecimiento y estratega de conversi\u00f3n: no habla de 'likes' ni 'impresiones', habla de margen de contribuci\u00f3n, retorno de inversi\u00f3n y escalamiento sostenible.", "niza": "Clase 35 (Publicidad, gesti\u00f3n de negocios comerciales, marketing digital y optimizaci\u00f3n de motores de b\u00fasqueda).", "tpBefore": ["Auditor\u00eda t\u00e9cnica de tracking y atribuci\u00f3n entregada en video Loom de 15 minutos sin costo", "Casos de estudio auditados con m\u00e9tricas reales de escalamiento de 1M a 10M de d\u00f3lares en ventas", "Calculadora interactiva de rentabilidad publicitaria seg\u00fan margen de producto y ticket promedio", "Benchmark trimestral de costos por clic y tendencias de conversi\u00f3n en el sector de e-commerce"], "tpDuring": ["Dashboard ejecutivo privado en Looker Studio actualizado cada hora con ventas y ROAS real", "Sprint semanal de 30 minutos los lunes para revisar hip\u00f3tesis aprobadas, aprendizajes y pr\u00f3ximos pasos", "Canal compartido en Slack con tiempo de respuesta promedio de menos de 12 minutos en horario laboral", "B\u00f3veda creativa compartida en Figma con m\u00e1s de 20 variaciones de anuncios listos para pauta"], "tpAfter": ["Reporte mensual de atribuci\u00f3n multitoque con desglose de canales de mayor rentabilidad", "Manual de directrices de creativos ganadores para el equipo interno de dise\u00f1o del cliente", "Revisi\u00f3n trimestral de estrategia comercial con propuesta de nuevos mercados y canales emergentes", "Sesi\u00f3n de alineaci\u00f3n con el equipo de ventas para mejorar el cierre de leads calificados"], "colors": {"pri": "#4338CA", "sec": "#6366F1", "acc": "#06B6D4", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 2685 C", "pantoneSec": "Pantone 2725 C", "cmykPri": "C:85 M:80 Y:0 K:0", "cmykSec": "C:70 M:60 Y:0 K:0"}, "primaryFont": "Outfit", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 30 144 L 80 94 L 114 116 L 154 36\" fill=\"none\" stroke=\"#4338CA\" stroke-width=\"4.5\" stroke-linecap=\"round\"/><polygon points=\"158,26 138,36 156,54\" fill=\"#06B6D4\"/><circle cx=\"30\" cy=\"144\" r=\"8\" fill=\"#4338CA\"/><circle cx=\"80\" cy=\"94\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"114\" cy=\"116\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"154\" cy=\"36\" r=\"10\" fill=\"#06B6D4\"/><line x1=\"30\" y1=\"156\" x2=\"160\" y2=\"156\" stroke=\"#E2E8F0\" stroke-width=\"1.8\"/><rect x=\"44\" y=\"120\" width=\"16\" height=\"34\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"72\" y=\"104\" width=\"16\" height=\"50\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"100\" y=\"80\" width=\"16\" height=\"74\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"128\" y=\"52\" width=\"16\" height=\"102\" rx=\"2\" fill=\"#4338CA\" opacity=\"0.30\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 30 144 L 80 94 L 114 116 L 154 36\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4.5\" stroke-linecap=\"round\"/><polygon points=\"158,26 138,36 156,54\" fill=\"#06B6D4\"/><circle cx=\"30\" cy=\"144\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"80\" cy=\"94\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"114\" cy=\"116\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"154\" cy=\"36\" r=\"10\" fill=\"#06B6D4\"/><line x1=\"30\" y1=\"156\" x2=\"160\" y2=\"156\" stroke=\"#4338CA\" stroke-width=\"1.8\"/><rect x=\"44\" y=\"120\" width=\"16\" height=\"34\" rx=\"2\" fill=\"#312E81\"/><rect x=\"72\" y=\"104\" width=\"16\" height=\"50\" rx=\"2\" fill=\"#312E81\"/><rect x=\"100\" y=\"80\" width=\"16\" height=\"74\" rx=\"2\" fill=\"#312E81\"/><rect x=\"128\" y=\"52\" width=\"16\" height=\"102\" rx=\"2\" fill=\"#06B6D4\" opacity=\"0.40\"/></g>"},
    "nexus_scale": {"id": 10, "name": "Nexus Scale", "slug": "nexus_scale", "tagline": "GROWTH MARKETING, ADTECH & ESTRATEGIA DE ESCALAMIENTO", "category": "Servicios / Growth Marketing & AdTech", "giro": "Agencia de ingenier\u00eda de crecimiento para empresas tecnol\u00f3gicas y e-commerce, combinando compra de medios con algoritmos de atribuci\u00f3n, optimizaci\u00f3n de embudos y anal\u00edtica predictiva.", "buyer": "CEOs, CMOs y directores de e-commerce que necesitan escalar su facturaci\u00f3n reduciendo el CAC (Costo de Adquisici\u00f3n de Clientes) y maximizando el LTV.", "why": "Porque en un ecosistema saturado de publicidad vac\u00eda, el crecimiento rentable solo responde a hip\u00f3tesis cient\u00edficas, datos duros y ejecuci\u00f3n \u00e1gil.", "how": "Conectamos tracking server-side, dise\u00f1amos creativos de alta conversi\u00f3n con pruebas A/B y automatizamos pujas con modelos de machine learning.", "what": "Campa\u00f1as de Google Ads, Meta Ads y TikTok Ads orientadas a ROI, optimizaci\u00f3n CRO de p\u00e1ginas de venta y dashboards ejecutivos en tiempo real.", "persona": "Ingeniero de crecimiento y estratega de conversi\u00f3n: no habla de 'likes' ni 'impresiones', habla de margen de contribuci\u00f3n, retorno de inversi\u00f3n y escalamiento sostenible.", "niza": "Clase 35 (Publicidad, gesti\u00f3n de negocios comerciales, marketing digital y optimizaci\u00f3n de motores de b\u00fasqueda).", "tpBefore": ["Auditor\u00eda t\u00e9cnica de tracking y atribuci\u00f3n entregada en video Loom de 15 minutos sin costo", "Casos de estudio auditados con m\u00e9tricas reales de escalamiento de 1M a 10M de d\u00f3lares en ventas", "Calculadora interactiva de rentabilidad publicitaria seg\u00fan margen de producto y ticket promedio", "Benchmark trimestral de costos por clic y tendencias de conversi\u00f3n en el sector de e-commerce"], "tpDuring": ["Dashboard ejecutivo privado en Looker Studio actualizado cada hora con ventas y ROAS real", "Sprint semanal de 30 minutos los lunes para revisar hip\u00f3tesis aprobadas, aprendizajes y pr\u00f3ximos pasos", "Canal compartido en Slack con tiempo de respuesta promedio de menos de 12 minutos en horario laboral", "B\u00f3veda creativa compartida en Figma con m\u00e1s de 20 variaciones de anuncios listos para pauta"], "tpAfter": ["Reporte mensual de atribuci\u00f3n multitoque con desglose de canales de mayor rentabilidad", "Manual de directrices de creativos ganadores para el equipo interno de dise\u00f1o del cliente", "Revisi\u00f3n trimestral de estrategia comercial con propuesta de nuevos mercados y canales emergentes", "Sesi\u00f3n de alineaci\u00f3n con el equipo de ventas para mejorar el cierre de leads calificados"], "colors": {"pri": "#4338CA", "sec": "#6366F1", "acc": "#06B6D4", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 2685 C", "pantoneSec": "Pantone 2725 C", "cmykPri": "C:85 M:80 Y:0 K:0", "cmykSec": "C:70 M:60 Y:0 K:0"}, "primaryFont": "Outfit", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 30 144 L 80 94 L 114 116 L 154 36\" fill=\"none\" stroke=\"#4338CA\" stroke-width=\"4.5\" stroke-linecap=\"round\"/><polygon points=\"158,26 138,36 156,54\" fill=\"#06B6D4\"/><circle cx=\"30\" cy=\"144\" r=\"8\" fill=\"#4338CA\"/><circle cx=\"80\" cy=\"94\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"114\" cy=\"116\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"154\" cy=\"36\" r=\"10\" fill=\"#06B6D4\"/><line x1=\"30\" y1=\"156\" x2=\"160\" y2=\"156\" stroke=\"#E2E8F0\" stroke-width=\"1.8\"/><rect x=\"44\" y=\"120\" width=\"16\" height=\"34\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"72\" y=\"104\" width=\"16\" height=\"50\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"100\" y=\"80\" width=\"16\" height=\"74\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"128\" y=\"52\" width=\"16\" height=\"102\" rx=\"2\" fill=\"#4338CA\" opacity=\"0.30\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 30 144 L 80 94 L 114 116 L 154 36\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4.5\" stroke-linecap=\"round\"/><polygon points=\"158,26 138,36 156,54\" fill=\"#06B6D4\"/><circle cx=\"30\" cy=\"144\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"80\" cy=\"94\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"114\" cy=\"116\" r=\"8\" fill=\"#6366F1\"/><circle cx=\"154\" cy=\"36\" r=\"10\" fill=\"#06B6D4\"/><line x1=\"30\" y1=\"156\" x2=\"160\" y2=\"156\" stroke=\"#4338CA\" stroke-width=\"1.8\"/><rect x=\"44\" y=\"120\" width=\"16\" height=\"34\" rx=\"2\" fill=\"#312E81\"/><rect x=\"72\" y=\"104\" width=\"16\" height=\"50\" rx=\"2\" fill=\"#312E81\"/><rect x=\"100\" y=\"80\" width=\"16\" height=\"74\" rx=\"2\" fill=\"#312E81\"/><rect x=\"128\" y=\"52\" width=\"16\" height=\"102\" rx=\"2\" fill=\"#06B6D4\" opacity=\"0.40\"/></g>"},
    "genomix_lab": {"id": 11, "name": "Genomix Lab", "slug": "genomix_lab", "tagline": "DIAGN\u00d3STICO GEN\u00d3MICO AVANZADO & SECUENCIACI\u00d3N NGS", "category": "Profesional / Biotecnolog\u00eda & Salud", "giro": "Laboratorio de biotecnolog\u00eda m\u00e9dica y secuenciaci\u00f3n gen\u00f3mica de \u00faltima generaci\u00f3n (NGS) especializado en oncolog\u00eda de precisi\u00f3n, cribado prenatal y farmacogen\u00f3mica.", "buyer": "M\u00e9dicos onc\u00f3logos, genetistas, hospitales de tercer nivel y pacientes que requieren diagn\u00f3sticos moleculares de precisi\u00f3n milim\u00e9trica para tratamientos personalizados.", "why": "Porque en el c\u00f3digo del ADN residen las respuestas para prevenir enfermedades antes de que se manifiesten y salvar vidas con medicina personalizada.", "how": "Secuenciamos en plataformas Illumina NovaSeq de alto rendimiento, interpretamos variantes con bioinform\u00e1tica cl\u00ednica y validamos con pat\u00f3logos moleculares.", "what": "Paneles de secuenciaci\u00f3n de c\u00e1ncer hereditario, biopsia l\u00edquida en sangre, estudios prenatales no invasivos (NIPT) y perfil farmacogen\u00e9tico.", "persona": "Cient\u00edfica genetista y doctora en biolog\u00eda molecular: rigurosa con la calidad del ensayo, emp\u00e1tica al explicar el informe cl\u00ednico y dedicada al bienestar del paciente.", "niza": "Clase 42 (Investigaci\u00f3n cient\u00edfica, servicios de laboratorio gen\u00e9tico y an\u00e1lisis bioinform\u00e1ticos) y Clase 44 (Diagn\u00f3sticos m\u00e9dicos y an\u00e1lisis cl\u00ednicos).", "tpBefore": ["Kit de toma de muestra bucal o sangu\u00ednea enviado a domicilio con empaque est\u00e9ril y gu\u00eda prepagada", "Calculadora web de compatibilidad gen\u00e9tica y cat\u00e1logo interactivo de m\u00e1s de 500 genes analizables", "Videollamada informativa previa con asesora gen\u00e9tica para resolver dudas del paciente y su familia", "Certificaciones internacionales CLIA y CAP visibles con n\u00famero de registro verificable en web"], "tpDuring": ["Notificaci\u00f3n por SMS y correo en cada fase: muestra recibida, extracci\u00f3n de ADN, secuenciaci\u00f3n y bioinform\u00e1tica", "Portal seguro para m\u00e9dicos tratantes con visor gen\u00f3mico de variantes patog\u00e9nicas y literatura cient\u00edfica", "Re-an\u00e1lisis de calidad doble ciego en muestras complejas sin costo adicional para el paciente", "Soporte telef\u00f3nico directo con el genetista bioinform\u00e1tico para discutir hallazgos incidentales"], "tpAfter": ["Reporte cl\u00ednico ejecutivo de 20 p\u00e1ginas con infograf\u00edas claras, nivel de evidencia y recomendaciones", "Sesi\u00f3n de asesoramiento gen\u00e9tico post-resultado de 60 minutos incluida con m\u00e9dico especialista", "Re-an\u00e1lisis anual gratuito de variantes de significado incierto (VUS) con nuevas bases de datos mundiales", "Custodia segura y cifrada del archivo FASTQ/VCF en la nube con acceso vitalicio para el paciente"], "colors": {"pri": "#1D4ED8", "sec": "#3B82F6", "acc": "#DB2777", "darkInk": "#0B132B", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 2728 C", "pantoneSec": "Pantone 279 C", "cmykPri": "C:90 M:65 Y:0 K:0", "cmykSec": "C:75 M:45 Y:0 K:0"}, "primaryFont": "Montserrat", "secondaryFont": "JetBrains Mono", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#1D4ED8\" stroke-width=\"1.8\"/><path d=\"M 64 36 C 46 60, 46 120, 64 144 C 74 158, 86 158, 96 144 C 114 120, 114 60, 96 36 C 86 22, 74 22, 64 36 Z\" fill=\"none\" stroke=\"#1D4ED8\" stroke-width=\"4\"/><path d=\"M 116 36 C 134 60, 134 120, 116 144 C 106 158, 94 158, 84 144 C 66 120, 66 60, 84 36 C 94 22, 106 22, 116 36 Z\" fill=\"none\" stroke=\"#DB2777\" stroke-width=\"4\"/><line x1=\"56\" y1=\"58\" x2=\"124\" y2=\"58\" stroke=\"#3B82F6\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"80\" x2=\"128\" y2=\"80\" stroke=\"#DB2777\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"100\" x2=\"128\" y2=\"100\" stroke=\"#3B82F6\" stroke-width=\"2.5\"/><line x1=\"56\" y1=\"122\" x2=\"124\" y2=\"122\" stroke=\"#DB2777\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"90\" r=\"6\" fill=\"#1D4ED8\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#3B82F6\" stroke-width=\"1.8\"/><path d=\"M 64 36 C 46 60, 46 120, 64 144 C 74 158, 86 158, 96 144 C 114 120, 114 60, 96 36 C 86 22, 74 22, 64 36 Z\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4\"/><path d=\"M 116 36 C 134 60, 134 120, 116 144 C 106 158, 94 158, 84 144 C 66 120, 66 60, 84 36 C 94 22, 106 22, 116 36 Z\" fill=\"none\" stroke=\"#DB2777\" stroke-width=\"4\"/><line x1=\"56\" y1=\"58\" x2=\"124\" y2=\"58\" stroke=\"#93C5FD\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"80\" x2=\"128\" y2=\"80\" stroke=\"#F472B6\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"100\" x2=\"128\" y2=\"100\" stroke=\"#93C5FD\" stroke-width=\"2.5\"/><line x1=\"56\" y1=\"122\" x2=\"124\" y2=\"122\" stroke=\"#F472B6\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"90\" r=\"6\" fill=\"#FFFFFF\"/></g>"},
    "genomix_lab": {"id": 11, "name": "Genomix Lab", "slug": "genomix_lab", "tagline": "DIAGN\u00d3STICO GEN\u00d3MICO AVANZADO & SECUENCIACI\u00d3N NGS", "category": "Profesional / Biotecnolog\u00eda & Salud", "giro": "Laboratorio de biotecnolog\u00eda m\u00e9dica y secuenciaci\u00f3n gen\u00f3mica de \u00faltima generaci\u00f3n (NGS) especializado en oncolog\u00eda de precisi\u00f3n, cribado prenatal y farmacogen\u00f3mica.", "buyer": "M\u00e9dicos onc\u00f3logos, genetistas, hospitales de tercer nivel y pacientes que requieren diagn\u00f3sticos moleculares de precisi\u00f3n milim\u00e9trica para tratamientos personalizados.", "why": "Porque en el c\u00f3digo del ADN residen las respuestas para prevenir enfermedades antes de que se manifiesten y salvar vidas con medicina personalizada.", "how": "Secuenciamos en plataformas Illumina NovaSeq de alto rendimiento, interpretamos variantes con bioinform\u00e1tica cl\u00ednica y validamos con pat\u00f3logos moleculares.", "what": "Paneles de secuenciaci\u00f3n de c\u00e1ncer hereditario, biopsia l\u00edquida en sangre, estudios prenatales no invasivos (NIPT) y perfil farmacogen\u00e9tico.", "persona": "Cient\u00edfica genetista y doctora en biolog\u00eda molecular: rigurosa con la calidad del ensayo, emp\u00e1tica al explicar el informe cl\u00ednico y dedicada al bienestar del paciente.", "niza": "Clase 42 (Investigaci\u00f3n cient\u00edfica, servicios de laboratorio gen\u00e9tico y an\u00e1lisis bioinform\u00e1ticos) y Clase 44 (Diagn\u00f3sticos m\u00e9dicos y an\u00e1lisis cl\u00ednicos).", "tpBefore": ["Kit de toma de muestra bucal o sangu\u00ednea enviado a domicilio con empaque est\u00e9ril y gu\u00eda prepagada", "Calculadora web de compatibilidad gen\u00e9tica y cat\u00e1logo interactivo de m\u00e1s de 500 genes analizables", "Videollamada informativa previa con asesora gen\u00e9tica para resolver dudas del paciente y su familia", "Certificaciones internacionales CLIA y CAP visibles con n\u00famero de registro verificable en web"], "tpDuring": ["Notificaci\u00f3n por SMS y correo en cada fase: muestra recibida, extracci\u00f3n de ADN, secuenciaci\u00f3n y bioinform\u00e1tica", "Portal seguro para m\u00e9dicos tratantes con visor gen\u00f3mico de variantes patog\u00e9nicas y literatura cient\u00edfica", "Re-an\u00e1lisis de calidad doble ciego en muestras complejas sin costo adicional para el paciente", "Soporte telef\u00f3nico directo con el genetista bioinform\u00e1tico para discutir hallazgos incidentales"], "tpAfter": ["Reporte cl\u00ednico ejecutivo de 20 p\u00e1ginas con infograf\u00edas claras, nivel de evidencia y recomendaciones", "Sesi\u00f3n de asesoramiento gen\u00e9tico post-resultado de 60 minutos incluida con m\u00e9dico especialista", "Re-an\u00e1lisis anual gratuito de variantes de significado incierto (VUS) con nuevas bases de datos mundiales", "Custodia segura y cifrada del archivo FASTQ/VCF en la nube con acceso vitalicio para el paciente"], "colors": {"pri": "#1D4ED8", "sec": "#3B82F6", "acc": "#DB2777", "darkInk": "#0B132B", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 2728 C", "pantoneSec": "Pantone 279 C", "cmykPri": "C:90 M:65 Y:0 K:0", "cmykSec": "C:75 M:45 Y:0 K:0"}, "primaryFont": "Montserrat", "secondaryFont": "JetBrains Mono", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#1D4ED8\" stroke-width=\"1.8\"/><path d=\"M 64 36 C 46 60, 46 120, 64 144 C 74 158, 86 158, 96 144 C 114 120, 114 60, 96 36 C 86 22, 74 22, 64 36 Z\" fill=\"none\" stroke=\"#1D4ED8\" stroke-width=\"4\"/><path d=\"M 116 36 C 134 60, 134 120, 116 144 C 106 158, 94 158, 84 144 C 66 120, 66 60, 84 36 C 94 22, 106 22, 116 36 Z\" fill=\"none\" stroke=\"#DB2777\" stroke-width=\"4\"/><line x1=\"56\" y1=\"58\" x2=\"124\" y2=\"58\" stroke=\"#3B82F6\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"80\" x2=\"128\" y2=\"80\" stroke=\"#DB2777\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"100\" x2=\"128\" y2=\"100\" stroke=\"#3B82F6\" stroke-width=\"2.5\"/><line x1=\"56\" y1=\"122\" x2=\"124\" y2=\"122\" stroke=\"#DB2777\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"90\" r=\"6\" fill=\"#1D4ED8\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#3B82F6\" stroke-width=\"1.8\"/><path d=\"M 64 36 C 46 60, 46 120, 64 144 C 74 158, 86 158, 96 144 C 114 120, 114 60, 96 36 C 86 22, 74 22, 64 36 Z\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4\"/><path d=\"M 116 36 C 134 60, 134 120, 116 144 C 106 158, 94 158, 84 144 C 66 120, 66 60, 84 36 C 94 22, 106 22, 116 36 Z\" fill=\"none\" stroke=\"#DB2777\" stroke-width=\"4\"/><line x1=\"56\" y1=\"58\" x2=\"124\" y2=\"58\" stroke=\"#93C5FD\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"80\" x2=\"128\" y2=\"80\" stroke=\"#F472B6\" stroke-width=\"2.5\"/><line x1=\"52\" y1=\"100\" x2=\"128\" y2=\"100\" stroke=\"#93C5FD\" stroke-width=\"2.5\"/><line x1=\"56\" y1=\"122\" x2=\"124\" y2=\"122\" stroke=\"#F472B6\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"90\" r=\"6\" fill=\"#FFFFFF\"/></g>"},
    "hormigon_y_cristal": {"id": 12, "name": "Hormig\u00f3n & Cristal", "slug": "hormigon_y_cristal", "tagline": "ESTRUCTURAS PESADAS, TORRES CORPORATIVAS & FACHADAS MONUMENTALES", "category": "Materiales & Construcci\u00f3n", "giro": "Constructora e ingenier\u00eda civil especializada en edificaci\u00f3n vertical de gran escala, torres corporativas en concreto preesforzado y fachadas continuas de vidrio templado.", "buyer": "Fondos de inversi\u00f3n inmobiliaria, desarrolladores de usos mixtos y corporativos internacionales que requieren entrega puntual de obras de alta complejidad t\u00e9cnica.", "why": "Porque levantar los monumentos que definen el horizonte de una ciudad exige la fuerza inquebrantable del hormig\u00f3n y la ligereza transparente del cristal.", "how": "Implementamos metodolog\u00eda BIM 5D en tiempo real, concreto autocompactante de ultra-alta resistencia (UHPC) y gr\u00faas torre con monitoreo satelital.", "what": "Construcci\u00f3n de torres residenciales y corporativas, c\u00e1lculo estructural sismorresistente, muros cortina de doble acristalamiento y cimentaciones profundas.", "persona": "Ingeniero civil de obra pesada y casco blanco: planifica con diagramas de Gantt milim\u00e9tricos, exige cero accidentes y supervisa cada colado hasta el fraguado perfecto.", "niza": "Clase 37 (Construcci\u00f3n de edificios, supervisi\u00f3n de obras, ingenier\u00eda civil y montaje de fachadas).", "tpBefore": ["Dossier t\u00e9cnico impreso en carpeta de aluminio anodizado con desglose de proyectos de m\u00e1s de 40 niveles", "Visita guiada con drones y realidad aumentada a predios en proceso de excavaci\u00f3n profunda", "Modelado financiero y programa de ruta cr\u00edtica con amortizaci\u00f3n de capital garantizada por contrato", "Fianzas de cumplimiento y vicios ocultos respaldadas por instituciones afianzadoras internacionales"], "tpDuring": ["C\u00e1maras de transmisi\u00f3n en vivo 4K instaladas en obra accesibles 24/7 para el comit\u00e9 t\u00e9cnico del inversionista", "Reporte semanal de cubicaci\u00f3n de concreto y pruebas de compresi\u00f3n de cilindros en laboratorio acreditado", "Reuniones de coordinaci\u00f3n BIM quincenales para resolver interferencias de instalaciones sin retrasos", "Protocolos estrictos de seguridad industrial 'Cero Da\u00f1o' con auditor\u00edas externas no anunciadas"], "tpAfter": ["Entrega del As-Built digital completo con gemelo digital 3D (Digital Twin) para gesti\u00f3n de mantenimiento", "P\u00f3liza de garant\u00eda estructural de 10 a\u00f1os y manual de operaci\u00f3n del sistema de limpieza de fachadas", "Acompa\u00f1amiento t\u00e9cnico durante la recepci\u00f3n y entrega de \u00e1reas privativas a cond\u00f3minos", "Auditor\u00eda anual de comportamiento sismol\u00f3gico y asentamientos diferenciales durante los primeros 3 a\u00f1os"], "colors": {"pri": "#374151", "sec": "#4B5563", "acc": "#0284C7", "darkInk": "#111827", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 431 C", "cmykPri": "C:50 M:40 Y:35 K:50", "cmykSec": "C:45 M:35 Y:30 K:40"}, "primaryFont": "Montserrat", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"24\" width=\"36\" height=\"132\" fill=\"#374151\"/><rect x=\"42\" y=\"32\" width=\"24\" height=\"116\" fill=\"#1F2937\"/><polygon points=\"72,24 144,24 144,156 72,156\" fill=\"#0284C7\" opacity=\"0.80\"/><line x1=\"72\" y1=\"56\" x2=\"144\" y2=\"56\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"90\" x2=\"144\" y2=\"90\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"124\" x2=\"144\" y2=\"124\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"108\" y1=\"24\" x2=\"108\" y2=\"156\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><polygon points=\"72,24 108,24 88,156 72,156\" fill=\"#FFFFFF\" opacity=\"0.25\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"24\" width=\"36\" height=\"132\" fill=\"#FFFFFF\"/><rect x=\"42\" y=\"32\" width=\"24\" height=\"116\" fill=\"#374151\"/><polygon points=\"72,24 144,24 144,156 72,156\" fill=\"#0284C7\"/><line x1=\"72\" y1=\"56\" x2=\"144\" y2=\"56\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"90\" x2=\"144\" y2=\"90\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"124\" x2=\"144\" y2=\"124\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"108\" y1=\"24\" x2=\"108\" y2=\"156\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><polygon points=\"72,24 108,24 88,156 72,156\" fill=\"#FFFFFF\" opacity=\"0.30\"/></g>"},
    "hormigón_&_cristal": {"id": 12, "name": "Hormig\u00f3n & Cristal", "slug": "hormigon_y_cristal", "tagline": "ESTRUCTURAS PESADAS, TORRES CORPORATIVAS & FACHADAS MONUMENTALES", "category": "Materiales & Construcci\u00f3n", "giro": "Constructora e ingenier\u00eda civil especializada en edificaci\u00f3n vertical de gran escala, torres corporativas en concreto preesforzado y fachadas continuas de vidrio templado.", "buyer": "Fondos de inversi\u00f3n inmobiliaria, desarrolladores de usos mixtos y corporativos internacionales que requieren entrega puntual de obras de alta complejidad t\u00e9cnica.", "why": "Porque levantar los monumentos que definen el horizonte de una ciudad exige la fuerza inquebrantable del hormig\u00f3n y la ligereza transparente del cristal.", "how": "Implementamos metodolog\u00eda BIM 5D en tiempo real, concreto autocompactante de ultra-alta resistencia (UHPC) y gr\u00faas torre con monitoreo satelital.", "what": "Construcci\u00f3n de torres residenciales y corporativas, c\u00e1lculo estructural sismorresistente, muros cortina de doble acristalamiento y cimentaciones profundas.", "persona": "Ingeniero civil de obra pesada y casco blanco: planifica con diagramas de Gantt milim\u00e9tricos, exige cero accidentes y supervisa cada colado hasta el fraguado perfecto.", "niza": "Clase 37 (Construcci\u00f3n de edificios, supervisi\u00f3n de obras, ingenier\u00eda civil y montaje de fachadas).", "tpBefore": ["Dossier t\u00e9cnico impreso en carpeta de aluminio anodizado con desglose de proyectos de m\u00e1s de 40 niveles", "Visita guiada con drones y realidad aumentada a predios en proceso de excavaci\u00f3n profunda", "Modelado financiero y programa de ruta cr\u00edtica con amortizaci\u00f3n de capital garantizada por contrato", "Fianzas de cumplimiento y vicios ocultos respaldadas por instituciones afianzadoras internacionales"], "tpDuring": ["C\u00e1maras de transmisi\u00f3n en vivo 4K instaladas en obra accesibles 24/7 para el comit\u00e9 t\u00e9cnico del inversionista", "Reporte semanal de cubicaci\u00f3n de concreto y pruebas de compresi\u00f3n de cilindros en laboratorio acreditado", "Reuniones de coordinaci\u00f3n BIM quincenales para resolver interferencias de instalaciones sin retrasos", "Protocolos estrictos de seguridad industrial 'Cero Da\u00f1o' con auditor\u00edas externas no anunciadas"], "tpAfter": ["Entrega del As-Built digital completo con gemelo digital 3D (Digital Twin) para gesti\u00f3n de mantenimiento", "P\u00f3liza de garant\u00eda estructural de 10 a\u00f1os y manual de operaci\u00f3n del sistema de limpieza de fachadas", "Acompa\u00f1amiento t\u00e9cnico durante la recepci\u00f3n y entrega de \u00e1reas privativas a cond\u00f3minos", "Auditor\u00eda anual de comportamiento sismol\u00f3gico y asentamientos diferenciales durante los primeros 3 a\u00f1os"], "colors": {"pri": "#374151", "sec": "#4B5563", "acc": "#0284C7", "darkInk": "#111827", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 431 C", "cmykPri": "C:50 M:40 Y:35 K:50", "cmykSec": "C:45 M:35 Y:30 K:40"}, "primaryFont": "Montserrat", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"24\" width=\"36\" height=\"132\" fill=\"#374151\"/><rect x=\"42\" y=\"32\" width=\"24\" height=\"116\" fill=\"#1F2937\"/><polygon points=\"72,24 144,24 144,156 72,156\" fill=\"#0284C7\" opacity=\"0.80\"/><line x1=\"72\" y1=\"56\" x2=\"144\" y2=\"56\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"90\" x2=\"144\" y2=\"90\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"124\" x2=\"144\" y2=\"124\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"108\" y1=\"24\" x2=\"108\" y2=\"156\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><polygon points=\"72,24 108,24 88,156 72,156\" fill=\"#FFFFFF\" opacity=\"0.25\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"24\" width=\"36\" height=\"132\" fill=\"#FFFFFF\"/><rect x=\"42\" y=\"32\" width=\"24\" height=\"116\" fill=\"#374151\"/><polygon points=\"72,24 144,24 144,156 72,156\" fill=\"#0284C7\"/><line x1=\"72\" y1=\"56\" x2=\"144\" y2=\"56\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"90\" x2=\"144\" y2=\"90\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"72\" y1=\"124\" x2=\"144\" y2=\"124\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><line x1=\"108\" y1=\"24\" x2=\"108\" y2=\"156\" stroke=\"#FFFFFF\" stroke-width=\"1.8\"/><polygon points=\"72,24 108,24 88,156 72,156\" fill=\"#FFFFFF\" opacity=\"0.30\"/></g>"},
    "roble_ancestral": {"id": 13, "name": "Roble Ancestral", "slug": "roble_ancestral", "tagline": "EBANISTER\u00cdA DE AUTOR, MADERAS MACIZAS & MOBILIARIO PATRIMONIAL", "category": "Tienda / Muebler\u00eda de Autor", "giro": "Taller de ebanister\u00eda fina y dise\u00f1o de mobiliario escult\u00f3rico elaborado a mano con maderas duras mexicanas y americanas de tala sustentable certificada (FSC).", "buyer": "Arquitectos de interiores, coleccionistas de dise\u00f1o y familias que buscan muebles con alma, ensamble tradicional sin clavos y durabilidad para varias generaciones.", "why": "Porque en un mundo de muebles desechables de aglomerado pl\u00e1stico, la nobleza de la madera maciza labrada a mano devuelve la calma y la ra\u00edz a los hogares.", "how": "Curamos maderas al aire libre por 24 meses, realizamos ensambles tradicionales de caja y espiga y terminamos con ceras y aceites de linaza puros sin solventes.", "what": "Comedores monol\u00edticos de borde vivo (live edge), credenzas con puertas ranuradas, sillas ergon\u00f3micas de autor y escritorios ejecutivos a medida.", "persona": "Maestro ebanista de tercera generaci\u00f3n: lee la veta del tronco como si fuera poes\u00eda, respeta cada nudo de la madera y lija cada superficie hasta el tacto de seda.", "niza": "Clase 20 (Muebles de madera, ebanister\u00eda, mesas, sillas y elementos decorativos de madera maciza).", "tpBefore": ["Cat\u00e1logo f\u00edsico de muestras de madera (nogal, tzalam, roble blanco, parota) encuadernado en lino", "Visita al aserradero del taller para que el cliente elija personalmente el tabl\u00f3n para su mesa", "Bocetos a escala en acuarela y planos acotados a mano antes de realizar el primer corte", "Exposici\u00f3n de piezas en galer\u00eda de arte con iluminaci\u00f3n cenital para apreciar el grano natural"], "tpDuring": ["Reporte fotogr\u00e1fico en blanco y negro del proceso de cepillado, ensamble y aceitado manual", "Firma y n\u00famero de serie \u00fanico pirograbado a fuego en el reverso de cada mueble fabricado", "Entrega con personal especializado propio con guantes blancos y ajuste de nivelaci\u00f3n milim\u00e9trico", "Presentaci\u00f3n en funda de manta cruda reutilizable de algod\u00f3n con fragancia a cedro"], "tpAfter": ["Kit de mantenimiento incluido con cera de abeja natural, pa\u00f1o de lana y esponja pulidora", "Servicio gratuito de re-aceitado y nutrici\u00f3n de madera al cumplir el primer a\u00f1o en el hogar", "Certificado de procedencia de la madera con coordenadas del bosque sustentable de origen", "Garant\u00eda de ensamble de por vida respaldada por el taller con derecho de herencia patrimonial"], "colors": {"pri": "#451A03", "sec": "#78350F", "acc": "#D97706", "darkInk": "#1A0A01", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 4625 C", "pantoneSec": "Pantone 7554 C", "cmykPri": "C:30 M:75 Y:90 K:70", "cmykSec": "C:20 M:65 Y:95 K:35"}, "primaryFont": "Cormorant Garamond", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"#FAF8F5\" stroke=\"#78350F\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#78350F\" stroke-width=\"1.2\" stroke-dasharray=\"6,4\"/><circle cx=\"90\" cy=\"90\" r=\"48\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"90\" r=\"34\" fill=\"none\" stroke=\"#78350F\" stroke-width=\"1.2\" stroke-dasharray=\"4,4\"/><circle cx=\"90\" cy=\"90\" r=\"20\" fill=\"#451A03\"/><polygon points=\"90,74 104,84 98,106 82,106 76,84\" fill=\"#D97706\"/><line x1=\"90\" y1=\"20\" x2=\"90\" y2=\"70\" stroke=\"#78350F\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"110\" x2=\"90\" y2=\"160\" stroke=\"#78350F\" stroke-width=\"1.5\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"1.2\" stroke-dasharray=\"6,4\"/><circle cx=\"90\" cy=\"90\" r=\"48\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"90\" r=\"34\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"1.2\" stroke-dasharray=\"4,4\"/><circle cx=\"90\" cy=\"90\" r=\"20\" fill=\"#D97706\"/><polygon points=\"90,74 104,84 98,106 82,106 76,84\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"20\" x2=\"90\" y2=\"70\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"110\" x2=\"90\" y2=\"160\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/></g>"},
    "roble_ancestral": {"id": 13, "name": "Roble Ancestral", "slug": "roble_ancestral", "tagline": "EBANISTER\u00cdA DE AUTOR, MADERAS MACIZAS & MOBILIARIO PATRIMONIAL", "category": "Tienda / Muebler\u00eda de Autor", "giro": "Taller de ebanister\u00eda fina y dise\u00f1o de mobiliario escult\u00f3rico elaborado a mano con maderas duras mexicanas y americanas de tala sustentable certificada (FSC).", "buyer": "Arquitectos de interiores, coleccionistas de dise\u00f1o y familias que buscan muebles con alma, ensamble tradicional sin clavos y durabilidad para varias generaciones.", "why": "Porque en un mundo de muebles desechables de aglomerado pl\u00e1stico, la nobleza de la madera maciza labrada a mano devuelve la calma y la ra\u00edz a los hogares.", "how": "Curamos maderas al aire libre por 24 meses, realizamos ensambles tradicionales de caja y espiga y terminamos con ceras y aceites de linaza puros sin solventes.", "what": "Comedores monol\u00edticos de borde vivo (live edge), credenzas con puertas ranuradas, sillas ergon\u00f3micas de autor y escritorios ejecutivos a medida.", "persona": "Maestro ebanista de tercera generaci\u00f3n: lee la veta del tronco como si fuera poes\u00eda, respeta cada nudo de la madera y lija cada superficie hasta el tacto de seda.", "niza": "Clase 20 (Muebles de madera, ebanister\u00eda, mesas, sillas y elementos decorativos de madera maciza).", "tpBefore": ["Cat\u00e1logo f\u00edsico de muestras de madera (nogal, tzalam, roble blanco, parota) encuadernado en lino", "Visita al aserradero del taller para que el cliente elija personalmente el tabl\u00f3n para su mesa", "Bocetos a escala en acuarela y planos acotados a mano antes de realizar el primer corte", "Exposici\u00f3n de piezas en galer\u00eda de arte con iluminaci\u00f3n cenital para apreciar el grano natural"], "tpDuring": ["Reporte fotogr\u00e1fico en blanco y negro del proceso de cepillado, ensamble y aceitado manual", "Firma y n\u00famero de serie \u00fanico pirograbado a fuego en el reverso de cada mueble fabricado", "Entrega con personal especializado propio con guantes blancos y ajuste de nivelaci\u00f3n milim\u00e9trico", "Presentaci\u00f3n en funda de manta cruda reutilizable de algod\u00f3n con fragancia a cedro"], "tpAfter": ["Kit de mantenimiento incluido con cera de abeja natural, pa\u00f1o de lana y esponja pulidora", "Servicio gratuito de re-aceitado y nutrici\u00f3n de madera al cumplir el primer a\u00f1o en el hogar", "Certificado de procedencia de la madera con coordenadas del bosque sustentable de origen", "Garant\u00eda de ensamble de por vida respaldada por el taller con derecho de herencia patrimonial"], "colors": {"pri": "#451A03", "sec": "#78350F", "acc": "#D97706", "darkInk": "#1A0A01", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 4625 C", "pantoneSec": "Pantone 7554 C", "cmykPri": "C:30 M:75 Y:90 K:70", "cmykSec": "C:20 M:65 Y:95 K:35"}, "primaryFont": "Cormorant Garamond", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"#FAF8F5\" stroke=\"#78350F\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#78350F\" stroke-width=\"1.2\" stroke-dasharray=\"6,4\"/><circle cx=\"90\" cy=\"90\" r=\"48\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"90\" r=\"34\" fill=\"none\" stroke=\"#78350F\" stroke-width=\"1.2\" stroke-dasharray=\"4,4\"/><circle cx=\"90\" cy=\"90\" r=\"20\" fill=\"#451A03\"/><polygon points=\"90,74 104,84 98,106 82,106 76,84\" fill=\"#D97706\"/><line x1=\"90\" y1=\"20\" x2=\"90\" y2=\"70\" stroke=\"#78350F\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"110\" x2=\"90\" y2=\"160\" stroke=\"#78350F\" stroke-width=\"1.5\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"74\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"1.2\" stroke-dasharray=\"6,4\"/><circle cx=\"90\" cy=\"90\" r=\"48\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"90\" r=\"34\" fill=\"none\" stroke=\"#D97706\" stroke-width=\"1.2\" stroke-dasharray=\"4,4\"/><circle cx=\"90\" cy=\"90\" r=\"20\" fill=\"#D97706\"/><polygon points=\"90,74 104,84 98,106 82,106 76,84\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"20\" x2=\"90\" y2=\"70\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"110\" x2=\"90\" y2=\"160\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/></g>"},
    "serena_prana": {"id": 14, "name": "Serena Prana", "slug": "serena_prana", "tagline": "YOGA TERAP\u00c9UTICO, MINDFULNESS & MEDICINA AYURV\u00c9DICA", "category": "Servicios / Bienestar & Mindfulness", "giro": "Centro hol\u00edstico de bienestar dedicado a la pr\u00e1ctica de hatha yoga restaurativo, pranayama, meditaci\u00f3n sonora con cuencos de cuarzo y consultas de nutrici\u00f3n ayurv\u00e9dica.", "buyer": "Profesionales con vidas aceleradas, madres y personas en b\u00fasqueda de equilibrio mental, alivio del estr\u00e9s cr\u00f3nico y reconexi\u00f3n profunda con su cuerpo.", "why": "Porque en un mundo que premia la prisa y el agotamiento, detenerse a respirar con consciencia es el acto de sanaci\u00f3n m\u00e1s revolucionario.", "how": "Creamos espacios de silencio y luz natural, guiamos con maestros certificados en India y personalizamos las posturas seg\u00fan la anatom\u00eda de cada alumno.", "what": "Clases diarias de yoga en grupos reducidos, retiros de silencio de fin de semana, terapia de sonido y masajes terap\u00e9uticos abhyanga con aceites herbales.", "persona": "Maestra de yoga y terapeuta ayurv\u00e9dica: habla con voz apacible, mira a los ojos con calidez sincera y te gu\u00eda para habitar el presente sin juicios.", "niza": "Clase 41 (Ense\u00f1anza de yoga y meditaci\u00f3n, retiros espirituales y actividades de bienestar) y Clase 44 (Terapias de relajaci\u00f3n, masajes y centros de bienestar).", "tpBefore": ["Meditaciones guiadas gratuitas en Spotify para iniciar el d\u00eda con serenidad y foco mental", "Cuestionario ayurv\u00e9dico online para descubrir tu Dosha predominante (Vata, Pitta, Kapha)", "Bienvenida por WhatsApp con gu\u00eda de vestimenta c\u00f3moda y recomendaciones para la primera sesi\u00f3n", "Shala de madera natural con pisos c\u00e1lidos, plantas arom\u00e1ticas y filtros de aire de grado m\u00e9dico"], "tpDuring": ["Recepci\u00f3n descalzo sobre duela de bamb\u00fa con t\u00e9 blanco tibio de jengibre y cardamomo", "Uso de tapetes de caucho natural org\u00e1nico desinfectados con aceites esenciales de lavanda", "Ajustes sutiles y respetuosos de postura con autorizaci\u00f3n previa del practicante", "Cierre de clase con relajaci\u00f3n profunda en Savasana y ba\u00f1o sonoro con gongs tibetanos"], "tpAfter": ["Mensaje de seguimiento con una cita inspiradora y recomendaciones de hidrataci\u00f3n para el d\u00eda", "Acceso a la biblioteca digital de Serena Prana con grabaciones de clases y recetario ayurv\u00e9dico", "Descuento preferencial en retiros de bienestar en la monta\u00f1a para miembros constantes", "Comunidad de apoyo con c\u00edrculos de palabra mensuales sobre autocompasi\u00f3n y manejo del estr\u00e9s"], "colors": {"pri": "#365314", "sec": "#4D7C0F", "acc": "#BE185D", "darkInk": "#142006", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F7FEE7", "white": "#FFFFFF", "pantonePri": "Pantone 7496 C", "pantoneSec": "Pantone 7495 C", "cmykPri": "C:60 M:30 Y:95 K:40", "cmykSec": "C:50 M:20 Y:90 K:20"}, "primaryFont": "Outfit", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F7FEE7\" stroke=\"#4D7C0F\" stroke-width=\"1.8\"/><path d=\"M 90 40 C 82 58, 80 84, 90 108 C 100 84, 98 58, 90 40 Z\" fill=\"#BE185D\"/><path d=\"M 90 56 C 74 68, 62 88, 70 106 C 80 98, 88 88, 90 56 Z\" fill=\"#4D7C0F\"/><path d=\"M 90 56 C 106 68, 118 88, 110 106 C 100 98, 92 88, 90 56 Z\" fill=\"#4D7C0F\"/><path d=\"M 90 74 C 64 82, 48 98, 54 114 C 68 112, 80 104, 90 74 Z\" fill=\"#365314\"/><path d=\"M 90 74 C 116 82, 132 98, 126 114 C 112 112, 100 104, 90 74 Z\" fill=\"#365314\"/><path d=\"M 40 128 Q 90 144 140 128\" fill=\"none\" stroke=\"#4D7C0F\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M 52 138 Q 90 152 128 138\" fill=\"none\" stroke=\"#BE185D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#BE185D\" stroke-width=\"1.8\"/><path d=\"M 90 40 C 82 58, 80 84, 90 108 C 100 84, 98 58, 90 40 Z\" fill=\"#BE185D\"/><path d=\"M 90 56 C 74 68, 62 88, 70 106 C 80 98, 88 88, 90 56 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 56 C 106 68, 118 88, 110 106 C 100 98, 92 88, 90 56 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 74 C 64 82, 48 98, 54 114 C 68 112, 80 104, 90 74 Z\" fill=\"#A3E635\"/><path d=\"M 90 74 C 116 82, 132 98, 126 114 C 112 112, 100 104, 90 74 Z\" fill=\"#A3E635\"/><path d=\"M 40 128 Q 90 144 140 128\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M 52 138 Q 90 152 128 138\" fill=\"none\" stroke=\"#BE185D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>"},
    "serena_prana": {"id": 14, "name": "Serena Prana", "slug": "serena_prana", "tagline": "YOGA TERAP\u00c9UTICO, MINDFULNESS & MEDICINA AYURV\u00c9DICA", "category": "Servicios / Bienestar & Mindfulness", "giro": "Centro hol\u00edstico de bienestar dedicado a la pr\u00e1ctica de hatha yoga restaurativo, pranayama, meditaci\u00f3n sonora con cuencos de cuarzo y consultas de nutrici\u00f3n ayurv\u00e9dica.", "buyer": "Profesionales con vidas aceleradas, madres y personas en b\u00fasqueda de equilibrio mental, alivio del estr\u00e9s cr\u00f3nico y reconexi\u00f3n profunda con su cuerpo.", "why": "Porque en un mundo que premia la prisa y el agotamiento, detenerse a respirar con consciencia es el acto de sanaci\u00f3n m\u00e1s revolucionario.", "how": "Creamos espacios de silencio y luz natural, guiamos con maestros certificados en India y personalizamos las posturas seg\u00fan la anatom\u00eda de cada alumno.", "what": "Clases diarias de yoga en grupos reducidos, retiros de silencio de fin de semana, terapia de sonido y masajes terap\u00e9uticos abhyanga con aceites herbales.", "persona": "Maestra de yoga y terapeuta ayurv\u00e9dica: habla con voz apacible, mira a los ojos con calidez sincera y te gu\u00eda para habitar el presente sin juicios.", "niza": "Clase 41 (Ense\u00f1anza de yoga y meditaci\u00f3n, retiros espirituales y actividades de bienestar) y Clase 44 (Terapias de relajaci\u00f3n, masajes y centros de bienestar).", "tpBefore": ["Meditaciones guiadas gratuitas en Spotify para iniciar el d\u00eda con serenidad y foco mental", "Cuestionario ayurv\u00e9dico online para descubrir tu Dosha predominante (Vata, Pitta, Kapha)", "Bienvenida por WhatsApp con gu\u00eda de vestimenta c\u00f3moda y recomendaciones para la primera sesi\u00f3n", "Shala de madera natural con pisos c\u00e1lidos, plantas arom\u00e1ticas y filtros de aire de grado m\u00e9dico"], "tpDuring": ["Recepci\u00f3n descalzo sobre duela de bamb\u00fa con t\u00e9 blanco tibio de jengibre y cardamomo", "Uso de tapetes de caucho natural org\u00e1nico desinfectados con aceites esenciales de lavanda", "Ajustes sutiles y respetuosos de postura con autorizaci\u00f3n previa del practicante", "Cierre de clase con relajaci\u00f3n profunda en Savasana y ba\u00f1o sonoro con gongs tibetanos"], "tpAfter": ["Mensaje de seguimiento con una cita inspiradora y recomendaciones de hidrataci\u00f3n para el d\u00eda", "Acceso a la biblioteca digital de Serena Prana con grabaciones de clases y recetario ayurv\u00e9dico", "Descuento preferencial en retiros de bienestar en la monta\u00f1a para miembros constantes", "Comunidad de apoyo con c\u00edrculos de palabra mensuales sobre autocompasi\u00f3n y manejo del estr\u00e9s"], "colors": {"pri": "#365314", "sec": "#4D7C0F", "acc": "#BE185D", "darkInk": "#142006", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F7FEE7", "white": "#FFFFFF", "pantonePri": "Pantone 7496 C", "pantoneSec": "Pantone 7495 C", "cmykPri": "C:60 M:30 Y:95 K:40", "cmykSec": "C:50 M:20 Y:90 K:20"}, "primaryFont": "Outfit", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F7FEE7\" stroke=\"#4D7C0F\" stroke-width=\"1.8\"/><path d=\"M 90 40 C 82 58, 80 84, 90 108 C 100 84, 98 58, 90 40 Z\" fill=\"#BE185D\"/><path d=\"M 90 56 C 74 68, 62 88, 70 106 C 80 98, 88 88, 90 56 Z\" fill=\"#4D7C0F\"/><path d=\"M 90 56 C 106 68, 118 88, 110 106 C 100 98, 92 88, 90 56 Z\" fill=\"#4D7C0F\"/><path d=\"M 90 74 C 64 82, 48 98, 54 114 C 68 112, 80 104, 90 74 Z\" fill=\"#365314\"/><path d=\"M 90 74 C 116 82, 132 98, 126 114 C 112 112, 100 104, 90 74 Z\" fill=\"#365314\"/><path d=\"M 40 128 Q 90 144 140 128\" fill=\"none\" stroke=\"#4D7C0F\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M 52 138 Q 90 152 128 138\" fill=\"none\" stroke=\"#BE185D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#BE185D\" stroke-width=\"1.8\"/><path d=\"M 90 40 C 82 58, 80 84, 90 108 C 100 84, 98 58, 90 40 Z\" fill=\"#BE185D\"/><path d=\"M 90 56 C 74 68, 62 88, 70 106 C 80 98, 88 88, 90 56 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 56 C 106 68, 118 88, 110 106 C 100 98, 92 88, 90 56 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 74 C 64 82, 48 98, 54 114 C 68 112, 80 104, 90 74 Z\" fill=\"#A3E635\"/><path d=\"M 90 74 C 116 82, 132 98, 126 114 C 112 112, 100 104, 90 74 Z\" fill=\"#A3E635\"/><path d=\"M 40 128 Q 90 144 140 128\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M 52 138 Q 90 152 128 138\" fill=\"none\" stroke=\"#BE185D\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>"},
    "flete_veloz": {"id": 15, "name": "Flete Veloz", "slug": "flete_veloz", "tagline": "LOG\u00cdSTICA FEDERAL, CARGA PESADA & CADENA DE FR\u00cdO CERTIFICADA", "category": "Servicios / Log\u00edstica & Transporte", "giro": "Empresa de transporte de carga pesada federal, fletes consolidados en caja seca y refrigerada, con flota moderna monitoreada por telemetr\u00eda GPS y custodia satelital 24/7.", "buyer": "Directores de cadena de suministro, plantas automotrices, cadenas de retail y exportadores agr\u00edcolas que demandan puntualidad inamovible y seguridad total en ruta.", "why": "Porque el comercio y la econom\u00eda de un pa\u00eds se mueven sobre ruedas; cuando una carga llega a tiempo, las promesas entre empresas se cumplen.", "how": "Operamos tractocamiones de \u00faltima generaci\u00f3n con mantenimiento predictivo, doble operador en rutas largas y protocolos certificados OEA y C-TPAT.", "what": "Transporte de carga completa (FTL), consolidado nacional (LTL), flete refrigerado a temperatura controlada y cruces fronterizos r\u00e1pidos.", "persona": "Director de operaciones log\u00edsticas: conoce cada kil\u00f3metro de carretera, resuelve contingencias con calma militar y entrega con precisi\u00f3n de relojero.", "niza": "Clase 39 (Transporte de mercanc\u00edas, servicios de flete, almacenamiento y log\u00edstica de distribuci\u00f3n).", "tpBefore": ["Cotizador online instant\u00e1neo que calcula tarifas por kil\u00f3metro y tiempo estimado de tr\u00e1nsito", "Portal para clientes con confirmaci\u00f3n de disponibilidad de tractores en menos de 15 minutos", "P\u00f3lizas de seguro de carga de amplia cobertura con aseguradoras de prestigio internacional", "Fichas t\u00e9cnicas descargables de la flota con a\u00f1o, capacidad volum\u00e9trica y sellos de emisiones"], "tpDuring": ["Enlace privado de rastreo GPS en tiempo real con sensor de apertura de puertas y temperatura de caja", "Operadores certificados con pruebas toxicol\u00f3gicas vigentes, uniforme y gafete de seguridad", "Monitoreo desde el Centro de Control C5 propio con bot\u00f3n de p\u00e1nico y enlace a Guardia Nacional", "Carta porte digital complementada con timbrado CFDI entregada antes de que el cami\u00f3n arranque"], "tpAfter": ["Evidencia fotogr\u00e1fica digital de la entrega con sello y firma de recibido enviada al instante por app", "Reporte mensual de KPI log\u00edsticos: \u00edndice de puntualidad on-time, mermas cero y ahorro en combustible", "L\u00ednea de cr\u00e9dito comercial a 30 y 45 d\u00edas para cuentas corporativas con facturaci\u00f3n recurrente", "Encuesta ejecutiva de satisfacci\u00f3n del servicio para evaluar la atenci\u00f3n del operador y la mesa de ayuda"], "colors": {"pri": "#1E3A8A", "sec": "#2563EB", "acc": "#F97316", "darkInk": "#0B132B", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 280 C", "pantoneSec": "Pantone 2728 C", "cmykPri": "C:95 M:75 Y:10 K:20", "cmykSec": "C:85 M:55 Y:0 K:0"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 24 116 L 40 56 L 110 56 L 110 116 Z\" fill=\"#1E3A8A\"/><path d=\"M 110 74 L 140 74 L 156 102 L 156 116 L 110 116 Z\" fill=\"#2563EB\"/><polygon points=\"114,80 134,80 148,100 114,100\" fill=\"#93C5FD\"/><circle cx=\"56\" cy=\"126\" r=\"14\" fill=\"#0F172A\"/><circle cx=\"56\" cy=\"126\" r=\"6\" fill=\"#F8FAFC\"/><circle cx=\"136\" cy=\"126\" r=\"14\" fill=\"#0F172A\"/><circle cx=\"136\" cy=\"126\" r=\"6\" fill=\"#F8FAFC\"/><line x1=\"20\" y1=\"46\" x2=\"90\" y2=\"46\" stroke=\"#F97316\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"30\" y1=\"34\" x2=\"80\" y2=\"34\" stroke=\"#F97316\" stroke-width=\"3\" stroke-linecap=\"round\"/><polygon points=\"158,98 174,98 170,106 158,106\" fill=\"#F97316\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 24 116 L 40 56 L 110 56 L 110 116 Z\" fill=\"#FFFFFF\"/><path d=\"M 110 74 L 140 74 L 156 102 L 156 116 L 110 116 Z\" fill=\"#F97316\"/><polygon points=\"114,80 134,80 148,100 114,100\" fill=\"#1E3A8A\"/><circle cx=\"56\" cy=\"126\" r=\"14\" fill=\"#FFFFFF\"/><circle cx=\"56\" cy=\"126\" r=\"6\" fill=\"#1E3A8A\"/><circle cx=\"136\" cy=\"126\" r=\"14\" fill=\"#FFFFFF\"/><circle cx=\"136\" cy=\"126\" r=\"6\" fill=\"#1E3A8A\"/><line x1=\"20\" y1=\"46\" x2=\"90\" y2=\"46\" stroke=\"#F97316\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"30\" y1=\"34\" x2=\"80\" y2=\"34\" stroke=\"#F97316\" stroke-width=\"3\" stroke-linecap=\"round\"/><polygon points=\"158,98 174,98 170,106 158,106\" fill=\"#FFFFFF\"/></g>"},
    "flete_veloz": {"id": 15, "name": "Flete Veloz", "slug": "flete_veloz", "tagline": "LOG\u00cdSTICA FEDERAL, CARGA PESADA & CADENA DE FR\u00cdO CERTIFICADA", "category": "Servicios / Log\u00edstica & Transporte", "giro": "Empresa de transporte de carga pesada federal, fletes consolidados en caja seca y refrigerada, con flota moderna monitoreada por telemetr\u00eda GPS y custodia satelital 24/7.", "buyer": "Directores de cadena de suministro, plantas automotrices, cadenas de retail y exportadores agr\u00edcolas que demandan puntualidad inamovible y seguridad total en ruta.", "why": "Porque el comercio y la econom\u00eda de un pa\u00eds se mueven sobre ruedas; cuando una carga llega a tiempo, las promesas entre empresas se cumplen.", "how": "Operamos tractocamiones de \u00faltima generaci\u00f3n con mantenimiento predictivo, doble operador en rutas largas y protocolos certificados OEA y C-TPAT.", "what": "Transporte de carga completa (FTL), consolidado nacional (LTL), flete refrigerado a temperatura controlada y cruces fronterizos r\u00e1pidos.", "persona": "Director de operaciones log\u00edsticas: conoce cada kil\u00f3metro de carretera, resuelve contingencias con calma militar y entrega con precisi\u00f3n de relojero.", "niza": "Clase 39 (Transporte de mercanc\u00edas, servicios de flete, almacenamiento y log\u00edstica de distribuci\u00f3n).", "tpBefore": ["Cotizador online instant\u00e1neo que calcula tarifas por kil\u00f3metro y tiempo estimado de tr\u00e1nsito", "Portal para clientes con confirmaci\u00f3n de disponibilidad de tractores en menos de 15 minutos", "P\u00f3lizas de seguro de carga de amplia cobertura con aseguradoras de prestigio internacional", "Fichas t\u00e9cnicas descargables de la flota con a\u00f1o, capacidad volum\u00e9trica y sellos de emisiones"], "tpDuring": ["Enlace privado de rastreo GPS en tiempo real con sensor de apertura de puertas y temperatura de caja", "Operadores certificados con pruebas toxicol\u00f3gicas vigentes, uniforme y gafete de seguridad", "Monitoreo desde el Centro de Control C5 propio con bot\u00f3n de p\u00e1nico y enlace a Guardia Nacional", "Carta porte digital complementada con timbrado CFDI entregada antes de que el cami\u00f3n arranque"], "tpAfter": ["Evidencia fotogr\u00e1fica digital de la entrega con sello y firma de recibido enviada al instante por app", "Reporte mensual de KPI log\u00edsticos: \u00edndice de puntualidad on-time, mermas cero y ahorro en combustible", "L\u00ednea de cr\u00e9dito comercial a 30 y 45 d\u00edas para cuentas corporativas con facturaci\u00f3n recurrente", "Encuesta ejecutiva de satisfacci\u00f3n del servicio para evaluar la atenci\u00f3n del operador y la mesa de ayuda"], "colors": {"pri": "#1E3A8A", "sec": "#2563EB", "acc": "#F97316", "darkInk": "#0B132B", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 280 C", "pantoneSec": "Pantone 2728 C", "cmykPri": "C:95 M:75 Y:10 K:20", "cmykSec": "C:85 M:55 Y:0 K:0"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><path d=\"M 24 116 L 40 56 L 110 56 L 110 116 Z\" fill=\"#1E3A8A\"/><path d=\"M 110 74 L 140 74 L 156 102 L 156 116 L 110 116 Z\" fill=\"#2563EB\"/><polygon points=\"114,80 134,80 148,100 114,100\" fill=\"#93C5FD\"/><circle cx=\"56\" cy=\"126\" r=\"14\" fill=\"#0F172A\"/><circle cx=\"56\" cy=\"126\" r=\"6\" fill=\"#F8FAFC\"/><circle cx=\"136\" cy=\"126\" r=\"14\" fill=\"#0F172A\"/><circle cx=\"136\" cy=\"126\" r=\"6\" fill=\"#F8FAFC\"/><line x1=\"20\" y1=\"46\" x2=\"90\" y2=\"46\" stroke=\"#F97316\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"30\" y1=\"34\" x2=\"80\" y2=\"34\" stroke=\"#F97316\" stroke-width=\"3\" stroke-linecap=\"round\"/><polygon points=\"158,98 174,98 170,106 158,106\" fill=\"#F97316\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><path d=\"M 24 116 L 40 56 L 110 56 L 110 116 Z\" fill=\"#FFFFFF\"/><path d=\"M 110 74 L 140 74 L 156 102 L 156 116 L 110 116 Z\" fill=\"#F97316\"/><polygon points=\"114,80 134,80 148,100 114,100\" fill=\"#1E3A8A\"/><circle cx=\"56\" cy=\"126\" r=\"14\" fill=\"#FFFFFF\"/><circle cx=\"56\" cy=\"126\" r=\"6\" fill=\"#1E3A8A\"/><circle cx=\"136\" cy=\"126\" r=\"14\" fill=\"#FFFFFF\"/><circle cx=\"136\" cy=\"126\" r=\"6\" fill=\"#1E3A8A\"/><line x1=\"20\" y1=\"46\" x2=\"90\" y2=\"46\" stroke=\"#F97316\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"30\" y1=\"34\" x2=\"80\" y2=\"34\" stroke=\"#F97316\" stroke-width=\"3\" stroke-linecap=\"round\"/><polygon points=\"158,98 174,98 170,106 158,106\" fill=\"#FFFFFF\"/></g>"},
    "decibel_master": {"id": 16, "name": "Decibel Master", "slug": "decibel_master", "tagline": "ACADEMIA DE AUDIO, MEZCLA DOLBY ATMOS & MASTERIZACI\u00d3N PROFESIONAL", "category": "Servicios / Producci\u00f3n Musical & Audio", "giro": "Estudio de grabaci\u00f3n ac\u00fasticamente calibrado y academia de ingenier\u00eda en audio profesional, especializada en masterizaci\u00f3n para plataformas de streaming y mezclas inmersivas Dolby Atmos.", "buyer": "M\u00fasicos independientes, productores, sellos discogr\u00e1ficos y podcasters que buscan un sonido cristalino, profundidad est\u00e9reo y competir al nivel sonoro de la industria global.", "why": "Porque la m\u00fasica es el lenguaje invisible del alma humana y cada frecuencia merece ser escuchada con fidelidad pristina y pegada emocional.", "how": "Utilizamos convertidores anal\u00f3gico-digitales Prism Sound, monitores de campo cercano ATC y salas de escucha tratadas con trampas de graves de precisi\u00f3n quir\u00fargica.", "what": "Masterizaci\u00f3n est\u00e9reo de tracks para Apple Music y Spotify, mezcla binaural e inmersiva 7.1.4, cursos de producci\u00f3n musical y alquiler de salas de grabaci\u00f3n.", "persona": "Ingeniero de mezcla ganador de premios de la industria: escucha lo que otros no perciben, trata la pista con respeto absoluto y balancea graves y agudos con o\u00eddo de oro.", "niza": "Clase 41 (Producci\u00f3n musical, grabaci\u00f3n en estudio, masterizaci\u00f3n de sonido y cursos de ingenier\u00eda de audio).", "tpBefore": ["Prueba de masterizaci\u00f3n gratuita de 45 segundos enviando tu mezcla en WAV sin compromiso", "Gu\u00eda t\u00e9cnica en PDF para preparar tus pistas (stems) con el headroom ideal antes de enviar a mezcla", "Videos en YouTube con an\u00e1lisis de producci\u00f3n de grandes obras maestras de la m\u00fasica", "Estudio con dise\u00f1o ac\u00fastico flotante caja-dentro-de-caja visible en tour virtual 360\u00b0"], "tpDuring": ["Sesi\u00f3n de escucha conjunta presencial o v\u00eda streaming de alta fidelidad sin compresi\u00f3n (Audiomovers)", "Hasta 3 revisiones de mezcla detalladas con notas de timecode compartidas en tiempo real", "Entrega de masters optimizados para vinilo, CD y streaming con est\u00e1ndares de sonoridad LUFS exactos", "Caf\u00e9 espresso de cortes\u00eda en la sala de control mientras se calibran los sintetizadores anal\u00f3gicos"], "tpAfter": ["Entrega de archivo DDP y metadatos ISRC incrustados listos para distribuci\u00f3n discogr\u00e1fica digital", "Respaldo perpetuo de los stems y proyectos en almacenamiento RAID redundante sin costo", "Recomendaci\u00f3n directa con agregadores musicales y editores para monetizaci\u00f3n de regal\u00edas", "Descuento en paquetes de masterizaci\u00f3n de EP o \u00e1lbum completo para proyectos subsecuentes"], "colors": {"pri": "#18181B", "sec": "#27272A", "acc": "#10B981", "darkInk": "#09090B", "midGray": "#71717A", "lightGray": "#E4E4E7", "softBg": "#FAFAFA", "white": "#FFFFFF", "pantonePri": "Pantone Black 7 C", "pantoneSec": "Pantone 447 C", "cmykPri": "C:50 M:40 Y:30 K:95", "cmykSec": "C:40 M:35 Y:30 K:80"}, "primaryFont": "Space Grotesk", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#18181B\"/><circle cx=\"90\" cy=\"90\" r=\"64\" fill=\"none\" stroke=\"#27272A\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"50\" fill=\"none\" stroke=\"#27272A\" stroke-width=\"1.5\"/><rect x=\"52\" y=\"96\" width=\"8\" height=\"34\" rx=\"2\" fill=\"#10B981\"/><rect x=\"64\" y=\"80\" width=\"8\" height=\"50\" rx=\"2\" fill=\"#10B981\"/><rect x=\"76\" y=\"60\" width=\"8\" height=\"70\" rx=\"2\" fill=\"#10B981\"/><rect x=\"88\" y=\"44\" width=\"8\" height=\"86\" rx=\"2\" fill=\"#10B981\"/><rect x=\"100\" y=\"68\" width=\"8\" height=\"62\" rx=\"2\" fill=\"#10B981\"/><rect x=\"112\" y=\"86\" width=\"8\" height=\"44\" rx=\"2\" fill=\"#10B981\"/><rect x=\"124\" y=\"104\" width=\"8\" height=\"26\" rx=\"2\" fill=\"#10B981\"/><circle cx=\"90\" cy=\"90\" r=\"8\" fill=\"#FFFFFF\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"64\" fill=\"none\" stroke=\"#E4E4E7\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"50\" fill=\"none\" stroke=\"#E4E4E7\" stroke-width=\"1.5\"/><rect x=\"52\" y=\"96\" width=\"8\" height=\"34\" rx=\"2\" fill=\"#10B981\"/><rect x=\"64\" y=\"80\" width=\"8\" height=\"50\" rx=\"2\" fill=\"#10B981\"/><rect x=\"76\" y=\"60\" width=\"8\" height=\"70\" rx=\"2\" fill=\"#10B981\"/><rect x=\"88\" y=\"44\" width=\"8\" height=\"86\" rx=\"2\" fill=\"#10B981\"/><rect x=\"100\" y=\"68\" width=\"8\" height=\"62\" rx=\"2\" fill=\"#10B981\"/><rect x=\"112\" y=\"86\" width=\"8\" height=\"44\" rx=\"2\" fill=\"#10B981\"/><rect x=\"124\" y=\"104\" width=\"8\" height=\"26\" rx=\"2\" fill=\"#10B981\"/><circle cx=\"90\" cy=\"90\" r=\"8\" fill=\"#18181B\"/></g>"},
    "decibel_master": {"id": 16, "name": "Decibel Master", "slug": "decibel_master", "tagline": "ACADEMIA DE AUDIO, MEZCLA DOLBY ATMOS & MASTERIZACI\u00d3N PROFESIONAL", "category": "Servicios / Producci\u00f3n Musical & Audio", "giro": "Estudio de grabaci\u00f3n ac\u00fasticamente calibrado y academia de ingenier\u00eda en audio profesional, especializada en masterizaci\u00f3n para plataformas de streaming y mezclas inmersivas Dolby Atmos.", "buyer": "M\u00fasicos independientes, productores, sellos discogr\u00e1ficos y podcasters que buscan un sonido cristalino, profundidad est\u00e9reo y competir al nivel sonoro de la industria global.", "why": "Porque la m\u00fasica es el lenguaje invisible del alma humana y cada frecuencia merece ser escuchada con fidelidad pristina y pegada emocional.", "how": "Utilizamos convertidores anal\u00f3gico-digitales Prism Sound, monitores de campo cercano ATC y salas de escucha tratadas con trampas de graves de precisi\u00f3n quir\u00fargica.", "what": "Masterizaci\u00f3n est\u00e9reo de tracks para Apple Music y Spotify, mezcla binaural e inmersiva 7.1.4, cursos de producci\u00f3n musical y alquiler de salas de grabaci\u00f3n.", "persona": "Ingeniero de mezcla ganador de premios de la industria: escucha lo que otros no perciben, trata la pista con respeto absoluto y balancea graves y agudos con o\u00eddo de oro.", "niza": "Clase 41 (Producci\u00f3n musical, grabaci\u00f3n en estudio, masterizaci\u00f3n de sonido y cursos de ingenier\u00eda de audio).", "tpBefore": ["Prueba de masterizaci\u00f3n gratuita de 45 segundos enviando tu mezcla en WAV sin compromiso", "Gu\u00eda t\u00e9cnica en PDF para preparar tus pistas (stems) con el headroom ideal antes de enviar a mezcla", "Videos en YouTube con an\u00e1lisis de producci\u00f3n de grandes obras maestras de la m\u00fasica", "Estudio con dise\u00f1o ac\u00fastico flotante caja-dentro-de-caja visible en tour virtual 360\u00b0"], "tpDuring": ["Sesi\u00f3n de escucha conjunta presencial o v\u00eda streaming de alta fidelidad sin compresi\u00f3n (Audiomovers)", "Hasta 3 revisiones de mezcla detalladas con notas de timecode compartidas en tiempo real", "Entrega de masters optimizados para vinilo, CD y streaming con est\u00e1ndares de sonoridad LUFS exactos", "Caf\u00e9 espresso de cortes\u00eda en la sala de control mientras se calibran los sintetizadores anal\u00f3gicos"], "tpAfter": ["Entrega de archivo DDP y metadatos ISRC incrustados listos para distribuci\u00f3n discogr\u00e1fica digital", "Respaldo perpetuo de los stems y proyectos en almacenamiento RAID redundante sin costo", "Recomendaci\u00f3n directa con agregadores musicales y editores para monetizaci\u00f3n de regal\u00edas", "Descuento en paquetes de masterizaci\u00f3n de EP o \u00e1lbum completo para proyectos subsecuentes"], "colors": {"pri": "#18181B", "sec": "#27272A", "acc": "#10B981", "darkInk": "#09090B", "midGray": "#71717A", "lightGray": "#E4E4E7", "softBg": "#FAFAFA", "white": "#FFFFFF", "pantonePri": "Pantone Black 7 C", "pantoneSec": "Pantone 447 C", "cmykPri": "C:50 M:40 Y:30 K:95", "cmykSec": "C:40 M:35 Y:30 K:80"}, "primaryFont": "Space Grotesk", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#18181B\"/><circle cx=\"90\" cy=\"90\" r=\"64\" fill=\"none\" stroke=\"#27272A\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"50\" fill=\"none\" stroke=\"#27272A\" stroke-width=\"1.5\"/><rect x=\"52\" y=\"96\" width=\"8\" height=\"34\" rx=\"2\" fill=\"#10B981\"/><rect x=\"64\" y=\"80\" width=\"8\" height=\"50\" rx=\"2\" fill=\"#10B981\"/><rect x=\"76\" y=\"60\" width=\"8\" height=\"70\" rx=\"2\" fill=\"#10B981\"/><rect x=\"88\" y=\"44\" width=\"8\" height=\"86\" rx=\"2\" fill=\"#10B981\"/><rect x=\"100\" y=\"68\" width=\"8\" height=\"62\" rx=\"2\" fill=\"#10B981\"/><rect x=\"112\" y=\"86\" width=\"8\" height=\"44\" rx=\"2\" fill=\"#10B981\"/><rect x=\"124\" y=\"104\" width=\"8\" height=\"26\" rx=\"2\" fill=\"#10B981\"/><circle cx=\"90\" cy=\"90\" r=\"8\" fill=\"#FFFFFF\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"64\" fill=\"none\" stroke=\"#E4E4E7\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"90\" r=\"50\" fill=\"none\" stroke=\"#E4E4E7\" stroke-width=\"1.5\"/><rect x=\"52\" y=\"96\" width=\"8\" height=\"34\" rx=\"2\" fill=\"#10B981\"/><rect x=\"64\" y=\"80\" width=\"8\" height=\"50\" rx=\"2\" fill=\"#10B981\"/><rect x=\"76\" y=\"60\" width=\"8\" height=\"70\" rx=\"2\" fill=\"#10B981\"/><rect x=\"88\" y=\"44\" width=\"8\" height=\"86\" rx=\"2\" fill=\"#10B981\"/><rect x=\"100\" y=\"68\" width=\"8\" height=\"62\" rx=\"2\" fill=\"#10B981\"/><rect x=\"112\" y=\"86\" width=\"8\" height=\"44\" rx=\"2\" fill=\"#10B981\"/><rect x=\"124\" y=\"104\" width=\"8\" height=\"26\" rx=\"2\" fill=\"#10B981\"/><circle cx=\"90\" cy=\"90\" r=\"8\" fill=\"#18181B\"/></g>"},
    "lupulo_feroz": {"id": 17, "name": "L\u00fapulo Feroz", "slug": "lupulo_feroz", "tagline": "MICRO-CERVECER\u00cdA DE AUTOR, HAZY IPA & FERMENTACI\u00d3N SALVAJE", "category": "Comestibles / Cervecer\u00eda Artesanal", "giro": "Cervecer\u00eda artesanal independiente especializada en cervezas lupuladas de perfil jugoso (Hazy IPA, Double Dry Hopped, West Coast IPA) y series experimentales a\u00f1ejadas en barrica.", "buyer": "Entusiastas de la cerveza artesanal, catadores y grupos de amigos que rechazan las cervezas industriales aguadas y buscan intensidad arom\u00e1tica y frescura extrema.", "why": "Porque la cerveza artesanal es rebeli\u00f3n contra lo ins\u00edpido; cada lata debe ser una explosi\u00f3n de aroma a mango, pino y maracuy\u00e1 sin pasteurizar.", "how": "Importamos l\u00fapulos frescos de Yakima Valley en cadena fr\u00eda, aplicamos doble dry-hopping a bajas temperaturas y enlatamos con niveles \u00ednfimos de ox\u00edgeno disuelto.", "what": "Latas de 473 ml de Hazy IPA, Imperial Stout con caf\u00e9 de altura, Sour de frutos rojos fermentada con levaduras salvajes y servicio en taproom con 16 l\u00edneas de barril.", "persona": "Maestro cervecero de barba y botas de hule: vive midiendo densidades de fermentaci\u00f3n, celebra la turbidez perfecta y sirve cada pinta con dos dedos de espuma densa.", "niza": "Clase 32 (Cervezas, cervezas artesanales, ales, lagers y bebidas a base de malta).", "tpBefore": ["Anuncio de lanzamientos de latas de edici\u00f3n limitada cada jueves a las 7:00 PM en Instagram", "Tienda online con env\u00edos refrigerados express para garantizar que la cerveza no pierda frescura", "Fichas sensoriales descargables con varietales de l\u00fapulo (Citra, Mosaic, Galaxy) e IBU exacto", "M\u00fasica indie y aroma a malta tostada saliendo de los fermentadores en el taproom urbano"], "tpDuring": ["Servicio en vaso Teku de cristal fino dise\u00f1ado para concentrar los aceites esenciales del l\u00fapulo", "Venta de latas fr\u00edas para llevar directo del cuarto fr\u00edo a 2\u00b0C con portavasos ilustrados de colecci\u00f3n", "Recomendaci\u00f3n del personal del taproom sobre el orden de degustaci\u00f3n seg\u00fan graduaci\u00f3n alcoh\u00f3lica", "Pizzas a la le\u00f1a con masa madre elaborada con el mismo grano de malta cervecera"], "tpAfter": ["Club 'Feroz VIP' con derecho de apartado de barriles especiales y catas con el maestro cervecero", "Contenedores especiales en el taproom para reciclaje de latas de aluminio limpias", "Venta de growlers t\u00e9rmicos de acero inoxidable con recarga a precio preferencial", "Invitaci\u00f3n a cocinar colaborativamente una cerveza comunitaria con votos de la comunidad"], "colors": {"pri": "#14532D", "sec": "#166534", "acc": "#CA8A04", "darkInk": "#052010", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 343 C", "pantoneSec": "Pantone 348 C", "cmykPri": "C:85 M:35 Y:85 K:50", "cmykSec": "C:75 M:25 Y:75 K:30"}, "primaryFont": "Montserrat", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#166534\" stroke-width=\"2\"/><path d=\"M 90 28 C 76 44, 62 68, 62 96 C 62 128, 80 152, 90 158 C 100 152, 118 128, 118 96 C 118 68, 104 44, 90 28 Z\" fill=\"#14532D\"/><path d=\"M 90 42 C 82 54, 72 74, 72 96 C 72 122, 84 140, 90 144 C 96 140, 108 122, 108 96 C 108 74, 98 54, 90 42 Z\" fill=\"#166534\"/><path d=\"M 90 60 C 86 68, 80 82, 80 96 C 80 114, 88 126, 90 128 C 92 126, 100 114, 100 96 C 100 82, 94 68, 90 60 Z\" fill=\"#CA8A04\"/><path d=\"M 68 124 L 54 146 L 76 138 Z\" fill=\"#CA8A04\"/><path d=\"M 112 124 L 126 146 L 104 138 Z\" fill=\"#CA8A04\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#CA8A04\" stroke-width=\"2\"/><path d=\"M 90 28 C 76 44, 62 68, 62 96 C 62 128, 80 152, 90 158 C 100 152, 118 128, 118 96 C 118 68, 104 44, 90 28 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 42 C 82 54, 72 74, 72 96 C 72 122, 84 140, 90 144 C 96 140, 108 122, 108 96 C 108 74, 98 54, 90 42 Z\" fill=\"#CA8A04\"/><path d=\"M 90 60 C 86 68, 80 82, 80 96 C 80 114, 88 126, 90 128 C 92 126, 100 114, 100 96 C 100 82, 94 68, 90 60 Z\" fill=\"#14532D\"/><path d=\"M 68 124 L 54 146 L 76 138 Z\" fill=\"#FFFFFF\"/><path d=\"M 112 124 L 126 146 L 104 138 Z\" fill=\"#FFFFFF\"/></g>"},
    "lúpulo_feroz": {"id": 17, "name": "L\u00fapulo Feroz", "slug": "lupulo_feroz", "tagline": "MICRO-CERVECER\u00cdA DE AUTOR, HAZY IPA & FERMENTACI\u00d3N SALVAJE", "category": "Comestibles / Cervecer\u00eda Artesanal", "giro": "Cervecer\u00eda artesanal independiente especializada en cervezas lupuladas de perfil jugoso (Hazy IPA, Double Dry Hopped, West Coast IPA) y series experimentales a\u00f1ejadas en barrica.", "buyer": "Entusiastas de la cerveza artesanal, catadores y grupos de amigos que rechazan las cervezas industriales aguadas y buscan intensidad arom\u00e1tica y frescura extrema.", "why": "Porque la cerveza artesanal es rebeli\u00f3n contra lo ins\u00edpido; cada lata debe ser una explosi\u00f3n de aroma a mango, pino y maracuy\u00e1 sin pasteurizar.", "how": "Importamos l\u00fapulos frescos de Yakima Valley en cadena fr\u00eda, aplicamos doble dry-hopping a bajas temperaturas y enlatamos con niveles \u00ednfimos de ox\u00edgeno disuelto.", "what": "Latas de 473 ml de Hazy IPA, Imperial Stout con caf\u00e9 de altura, Sour de frutos rojos fermentada con levaduras salvajes y servicio en taproom con 16 l\u00edneas de barril.", "persona": "Maestro cervecero de barba y botas de hule: vive midiendo densidades de fermentaci\u00f3n, celebra la turbidez perfecta y sirve cada pinta con dos dedos de espuma densa.", "niza": "Clase 32 (Cervezas, cervezas artesanales, ales, lagers y bebidas a base de malta).", "tpBefore": ["Anuncio de lanzamientos de latas de edici\u00f3n limitada cada jueves a las 7:00 PM en Instagram", "Tienda online con env\u00edos refrigerados express para garantizar que la cerveza no pierda frescura", "Fichas sensoriales descargables con varietales de l\u00fapulo (Citra, Mosaic, Galaxy) e IBU exacto", "M\u00fasica indie y aroma a malta tostada saliendo de los fermentadores en el taproom urbano"], "tpDuring": ["Servicio en vaso Teku de cristal fino dise\u00f1ado para concentrar los aceites esenciales del l\u00fapulo", "Venta de latas fr\u00edas para llevar directo del cuarto fr\u00edo a 2\u00b0C con portavasos ilustrados de colecci\u00f3n", "Recomendaci\u00f3n del personal del taproom sobre el orden de degustaci\u00f3n seg\u00fan graduaci\u00f3n alcoh\u00f3lica", "Pizzas a la le\u00f1a con masa madre elaborada con el mismo grano de malta cervecera"], "tpAfter": ["Club 'Feroz VIP' con derecho de apartado de barriles especiales y catas con el maestro cervecero", "Contenedores especiales en el taproom para reciclaje de latas de aluminio limpias", "Venta de growlers t\u00e9rmicos de acero inoxidable con recarga a precio preferencial", "Invitaci\u00f3n a cocinar colaborativamente una cerveza comunitaria con votos de la comunidad"], "colors": {"pri": "#14532D", "sec": "#166534", "acc": "#CA8A04", "darkInk": "#052010", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 343 C", "pantoneSec": "Pantone 348 C", "cmykPri": "C:85 M:35 Y:85 K:50", "cmykSec": "C:75 M:25 Y:75 K:30"}, "primaryFont": "Montserrat", "secondaryFont": "Plus Jakarta Sans", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#166534\" stroke-width=\"2\"/><path d=\"M 90 28 C 76 44, 62 68, 62 96 C 62 128, 80 152, 90 158 C 100 152, 118 128, 118 96 C 118 68, 104 44, 90 28 Z\" fill=\"#14532D\"/><path d=\"M 90 42 C 82 54, 72 74, 72 96 C 72 122, 84 140, 90 144 C 96 140, 108 122, 108 96 C 108 74, 98 54, 90 42 Z\" fill=\"#166534\"/><path d=\"M 90 60 C 86 68, 80 82, 80 96 C 80 114, 88 126, 90 128 C 92 126, 100 114, 100 96 C 100 82, 94 68, 90 60 Z\" fill=\"#CA8A04\"/><path d=\"M 68 124 L 54 146 L 76 138 Z\" fill=\"#CA8A04\"/><path d=\"M 112 124 L 126 146 L 104 138 Z\" fill=\"#CA8A04\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#CA8A04\" stroke-width=\"2\"/><path d=\"M 90 28 C 76 44, 62 68, 62 96 C 62 128, 80 152, 90 158 C 100 152, 118 128, 118 96 C 118 68, 104 44, 90 28 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 42 C 82 54, 72 74, 72 96 C 72 122, 84 140, 90 144 C 96 140, 108 122, 108 96 C 108 74, 98 54, 90 42 Z\" fill=\"#CA8A04\"/><path d=\"M 90 60 C 86 68, 80 82, 80 96 C 80 114, 88 126, 90 128 C 92 126, 100 114, 100 96 C 100 82, 94 68, 90 60 Z\" fill=\"#14532D\"/><path d=\"M 68 124 L 54 146 L 76 138 Z\" fill=\"#FFFFFF\"/><path d=\"M 112 124 L 126 146 L 104 138 Z\" fill=\"#FFFFFF\"/></g>"},
    "nebula_selva": {"id": 18, "name": "N\u00e9bula Selva", "slug": "nebula_selva", "tagline": "ECO-RESORT, RESERVA BIOL\u00d3GICA & GLAMPING EN SELVA NUBLADA", "category": "Servicios / Hoteler\u00eda Sustentable", "giro": "Hotel boutique ecotur\u00edstico inmerso en una reserva biol\u00f3gica de bosque de niebla, con domos geod\u00e9sicos suspendidos sobre el dosel de la selva, energ\u00eda solar y gastronom\u00eda de recolecci\u00f3n.", "buyer": "Viajeros conscientes, parejas y naturalistas que buscan desconexi\u00f3n digital absoluta, confort de lujo sustentable y contacto \u00edntimo con la biodiversidad silvestre.", "why": "Porque solo al escuchar la lluvia sobre las hojas de la selva y contemplar la niebla subiendo por el ca\u00f1\u00f3n se recupera el asombro por la naturaleza viva.", "how": "Construimos sin derribar un solo \u00e1rbol, captamos 100% de agua pluvial y destinamos el 30% de los ingresos a la protecci\u00f3n del h\u00e1bitat del jaguar y el quetzal.", "what": "Hospedaje en domos panor\u00e1micos privados, senderismo con bi\u00f3logos certificados, ba\u00f1os de vapor temazcal y cenas bot\u00e1nicas bajo las estrellas.", "persona": "Gu\u00eda naturalista y anfitriona ecol\u00f3gica: te recibe con una sonrisa serena, conoce el canto de cada ave del bosque y cuida cada detalle de tu estancia con respeto absoluto.", "niza": "Clase 43 (Servicios de alojamiento temporal, hoteles boutique, eco-resorts y restaurantes de reserva ecol\u00f3gica).", "tpBefore": ["Sitio web con transmisi\u00f3n de sonidos en vivo del bosque de niebla (lluvia, ranas y aves)", "Gu\u00eda descargable de preparaci\u00f3n de maleta: calzado de monta\u00f1a, ropa t\u00e9rmica y linterna frontal", "Coordinaci\u00f3n de transporte 4x4 desde el aeropuerto m\u00e1s cercano con chofer de la comunidad", "Pol\u00edticas claras de turismo regenerativo y compromiso de 'Cero Pl\u00e1sticos de un Solo Uso'"], "tpDuring": ["Bienvenida con infusi\u00f3n de hierbas silvestres de la selva y toalla tibia con aceite de pino", "Domo con cama king size, s\u00e1banas de lino org\u00e1nico y terraza con tina de madera con vista al abismo", "Recorridos nocturnos guiados con l\u00e1mparas de luz ultravioleta para observar hongos bioluminiscentes", "Cocina de la selva preparada por cocineras tradicionales con ingredientes del huerto permacultural"], "tpAfter": ["Certificado de neutralizaci\u00f3n de huella de carbono del viaje con \u00e1rbol nativo sembrado a tu nombre", "Enlace a galer\u00eda fotogr\u00e1fica personalizada de las especies de aves avistadas durante tu estancia", "Env\u00edo de caf\u00e9 de sombra y miel virgen de la reserva para revivir los sabores de la selva en casa", "Invitaci\u00f3n a formar parte del patronato de conservaci\u00f3n del bosque de niebla"], "colors": {"pri": "#064E3B", "sec": "#047857", "acc": "#0284C7", "darkInk": "#02221A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#ECFDF5", "white": "#FFFFFF", "pantonePri": "Pantone 3305 C", "pantoneSec": "Pantone 341 C", "cmykPri": "C:85 M:35 Y:65 K:60", "cmykSec": "C:80 M:20 Y:60 K:20"}, "primaryFont": "Playfair Display", "secondaryFont": "Outfit", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#ECFDF5\" stroke=\"#047857\" stroke-width=\"1.8\"/><path d=\"M 40 144 C 56 128, 76 112, 90 92 C 104 112, 124 128, 140 144 Z\" fill=\"#047857\"/><path d=\"M 64 144 C 74 130, 84 118, 90 102 C 96 118, 106 130, 116 144 Z\" fill=\"#064E3B\"/><circle cx=\"90\" cy=\"62\" r=\"28\" fill=\"#064E3B\"/><path d=\"M 30 110 C 60 98, 120 120, 150 108\" fill=\"none\" stroke=\"#0284C7\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.80\"/><path d=\"M 44 126 C 74 114, 110 134, 136 124\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"132\" cy=\"50\" r=\"8\" fill=\"#0284C7\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#0284C7\" stroke-width=\"1.8\"/><path d=\"M 40 144 C 56 128, 76 112, 90 92 C 104 112, 124 128, 140 144 Z\" fill=\"#FFFFFF\"/><path d=\"M 64 144 C 74 130, 84 118, 90 102 C 96 118, 106 130, 116 144 Z\" fill=\"#047857\"/><circle cx=\"90\" cy=\"62\" r=\"28\" fill=\"#FFFFFF\"/><path d=\"M 30 110 C 60 98, 120 120, 150 108\" fill=\"none\" stroke=\"#0284C7\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 44 126 C 74 114, 110 134, 136 124\" fill=\"none\" stroke=\"#047857\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"132\" cy=\"50\" r=\"8\" fill=\"#0284C7\"/></g>"},
    "nébula_selva": {"id": 18, "name": "N\u00e9bula Selva", "slug": "nebula_selva", "tagline": "ECO-RESORT, RESERVA BIOL\u00d3GICA & GLAMPING EN SELVA NUBLADA", "category": "Servicios / Hoteler\u00eda Sustentable", "giro": "Hotel boutique ecotur\u00edstico inmerso en una reserva biol\u00f3gica de bosque de niebla, con domos geod\u00e9sicos suspendidos sobre el dosel de la selva, energ\u00eda solar y gastronom\u00eda de recolecci\u00f3n.", "buyer": "Viajeros conscientes, parejas y naturalistas que buscan desconexi\u00f3n digital absoluta, confort de lujo sustentable y contacto \u00edntimo con la biodiversidad silvestre.", "why": "Porque solo al escuchar la lluvia sobre las hojas de la selva y contemplar la niebla subiendo por el ca\u00f1\u00f3n se recupera el asombro por la naturaleza viva.", "how": "Construimos sin derribar un solo \u00e1rbol, captamos 100% de agua pluvial y destinamos el 30% de los ingresos a la protecci\u00f3n del h\u00e1bitat del jaguar y el quetzal.", "what": "Hospedaje en domos panor\u00e1micos privados, senderismo con bi\u00f3logos certificados, ba\u00f1os de vapor temazcal y cenas bot\u00e1nicas bajo las estrellas.", "persona": "Gu\u00eda naturalista y anfitriona ecol\u00f3gica: te recibe con una sonrisa serena, conoce el canto de cada ave del bosque y cuida cada detalle de tu estancia con respeto absoluto.", "niza": "Clase 43 (Servicios de alojamiento temporal, hoteles boutique, eco-resorts y restaurantes de reserva ecol\u00f3gica).", "tpBefore": ["Sitio web con transmisi\u00f3n de sonidos en vivo del bosque de niebla (lluvia, ranas y aves)", "Gu\u00eda descargable de preparaci\u00f3n de maleta: calzado de monta\u00f1a, ropa t\u00e9rmica y linterna frontal", "Coordinaci\u00f3n de transporte 4x4 desde el aeropuerto m\u00e1s cercano con chofer de la comunidad", "Pol\u00edticas claras de turismo regenerativo y compromiso de 'Cero Pl\u00e1sticos de un Solo Uso'"], "tpDuring": ["Bienvenida con infusi\u00f3n de hierbas silvestres de la selva y toalla tibia con aceite de pino", "Domo con cama king size, s\u00e1banas de lino org\u00e1nico y terraza con tina de madera con vista al abismo", "Recorridos nocturnos guiados con l\u00e1mparas de luz ultravioleta para observar hongos bioluminiscentes", "Cocina de la selva preparada por cocineras tradicionales con ingredientes del huerto permacultural"], "tpAfter": ["Certificado de neutralizaci\u00f3n de huella de carbono del viaje con \u00e1rbol nativo sembrado a tu nombre", "Enlace a galer\u00eda fotogr\u00e1fica personalizada de las especies de aves avistadas durante tu estancia", "Env\u00edo de caf\u00e9 de sombra y miel virgen de la reserva para revivir los sabores de la selva en casa", "Invitaci\u00f3n a formar parte del patronato de conservaci\u00f3n del bosque de niebla"], "colors": {"pri": "#064E3B", "sec": "#047857", "acc": "#0284C7", "darkInk": "#02221A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#ECFDF5", "white": "#FFFFFF", "pantonePri": "Pantone 3305 C", "pantoneSec": "Pantone 341 C", "cmykPri": "C:85 M:35 Y:65 K:60", "cmykSec": "C:80 M:20 Y:60 K:20"}, "primaryFont": "Playfair Display", "secondaryFont": "Outfit", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#ECFDF5\" stroke=\"#047857\" stroke-width=\"1.8\"/><path d=\"M 40 144 C 56 128, 76 112, 90 92 C 104 112, 124 128, 140 144 Z\" fill=\"#047857\"/><path d=\"M 64 144 C 74 130, 84 118, 90 102 C 96 118, 106 130, 116 144 Z\" fill=\"#064E3B\"/><circle cx=\"90\" cy=\"62\" r=\"28\" fill=\"#064E3B\"/><path d=\"M 30 110 C 60 98, 120 120, 150 108\" fill=\"none\" stroke=\"#0284C7\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.80\"/><path d=\"M 44 126 C 74 114, 110 134, 136 124\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"132\" cy=\"50\" r=\"8\" fill=\"#0284C7\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#0284C7\" stroke-width=\"1.8\"/><path d=\"M 40 144 C 56 128, 76 112, 90 92 C 104 112, 124 128, 140 144 Z\" fill=\"#FFFFFF\"/><path d=\"M 64 144 C 74 130, 84 118, 90 102 C 96 118, 106 130, 116 144 Z\" fill=\"#047857\"/><circle cx=\"90\" cy=\"62\" r=\"28\" fill=\"#FFFFFF\"/><path d=\"M 30 110 C 60 98, 120 120, 150 108\" fill=\"none\" stroke=\"#0284C7\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M 44 126 C 74 114, 110 134, 136 124\" fill=\"none\" stroke=\"#047857\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"132\" cy=\"50\" r=\"8\" fill=\"#0284C7\"/></g>"},
    "vitalvet_trauma": {"id": 19, "name": "VitalVet Trauma", "slug": "vitalvet_trauma", "tagline": "HOSPITAL VETERINARIO DE ALTA ESPECIALIDAD, TERAPIA INTENSIVA & CIRUG\u00cdA 24/7", "category": "Profesional / Medicina Veterinaria", "giro": "Hospital veterinario de urgencias m\u00e9dicas disponible las 24 horas del d\u00eda, con quir\u00f3fanos de flujo laminar, tomograf\u00eda computarizada, banco de sangre y terapia intensiva para perros y gatos.", "buyer": "Tutores de mascotas que consideran a sus animales parte sagrada de la familia y exigen el mismo nivel de tecnolog\u00eda, rigor m\u00e9dico y compasi\u00f3n que un hospital humano.", "why": "Porque la lealtad incondicional de un animal merece una respuesta m\u00e9dica de excelencia cuando su vida pende de un hilo.", "how": "Mantenemos un equipo de cirujanos y urgenci\u00f3logos de guardia permanente, monitoreo hemodin\u00e1mico avanzado y comunicaci\u00f3n emp\u00e1tica y transparente con la familia.", "what": "Cirug\u00eda de trauma ortop\u00e9dico y tejidos blandos, hospitalizaci\u00f3n en cub\u00edculos aislados con ox\u00edgeno, hemodi\u00e1lisis veterinaria y medicina felina Cat-Friendly.", "persona": "M\u00e9dico veterinario urgenci\u00f3logo: sereno en medio de la crisis, con manos precisas en el quir\u00f3fano y calidez infinita para abrazar a la familia preocupada.", "niza": "Clase 44 (Servicios m\u00e9dicos veterinarios, hospitales de animales, cirug\u00eda y cuidados intensivos para mascotas).", "tpBefore": ["L\u00ednea de emergencia telef\u00f3nica directa atendida por un m\u00e9dico veterinario en menos de 3 tonos", "Gu\u00eda de primeros auxilios y estabilizaci\u00f3n de mascotas antes de trasladarlas al hospital en web", "\u00c1rea de estacionamiento de urgencias con camilla y personal esperando en la puerta", "Instalaciones con certificaci\u00f3n internacional Cat-Friendly Clinic con salas de espera separadas"], "tpDuring": ["Triage inmediato en menos de 5 minutos con monitoreo de signos vitales frente al tutor", "Acceso de la familia a la sala de terapia intensiva durante los horarios de visita terap\u00e9utica", "Parte m\u00e9dico diario detallado con video y fotograf\u00edas del estado de \u00e1nimo del paciente", "Presupuesto claro y desglosado por fases m\u00e9dicas sin costos sorpresivos en la cuenta final"], "tpAfter": ["Instrucciones de medicaci\u00f3n y curaciones explicadas paso a paso con video en WhatsApp", "Llamada telef\u00f3nica a las 24 y 48 horas post-alta para monitorear apetito, dolor y movilidad", "Historial cl\u00ednico digitalizado completo con estudios de imagen y laboratorio descargables en PDF", "Servicio de ambulancia veterinaria para revisiones de seguimiento a domicilio si el paciente no puede caminar"], "colors": {"pri": "#0F766E", "sec": "#0D9488", "acc": "#E11D48", "darkInk": "#042624", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F0FDFA", "white": "#FFFFFF", "pantonePri": "Pantone 3282 C", "pantoneSec": "Pantone 3262 C", "cmykPri": "C:80 M:30 Y:50 K:25", "cmykSec": "C:70 M:15 Y:40 K:5"}, "primaryFont": "Plus Jakarta Sans", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"72\" y=\"24\" width=\"36\" height=\"132\" rx=\"6\" fill=\"#0F766E\"/><rect x=\"24\" y=\"72\" width=\"132\" height=\"36\" rx=\"6\" fill=\"#0F766E\"/><circle cx=\"90\" cy=\"90\" r=\"28\" fill=\"#FFFFFF\"/><circle cx=\"82\" cy=\"84\" r=\"5\" fill=\"#0D9488\"/><circle cx=\"98\" cy=\"84\" r=\"5\" fill=\"#0D9488\"/><circle cx=\"74\" cy=\"94\" r=\"4\" fill=\"#0D9488\"/><circle cx=\"106\" cy=\"94\" r=\"4\" fill=\"#0D9488\"/><ellipse cx=\"90\" cy=\"102\" rx=\"9\" ry=\"7\" fill=\"#0F766E\"/><path d=\"M 32 90 L 64 90 L 72 74 L 80 106 L 88 84 L 94 94 L 100 90 L 148 90\" fill=\"none\" stroke=\"#E11D48\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"72\" y=\"24\" width=\"36\" height=\"132\" rx=\"6\" fill=\"#FFFFFF\"/><rect x=\"24\" y=\"72\" width=\"132\" height=\"36\" rx=\"6\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"28\" fill=\"#0F766E\"/><circle cx=\"82\" cy=\"84\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"98\" cy=\"84\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"74\" cy=\"94\" r=\"4\" fill=\"#FFFFFF\"/><circle cx=\"106\" cy=\"94\" r=\"4\" fill=\"#FFFFFF\"/><ellipse cx=\"90\" cy=\"102\" rx=\"9\" ry=\"7\" fill=\"#FFFFFF\"/><path d=\"M 32 90 L 64 90 L 72 74 L 80 106 L 88 84 L 94 94 L 100 90 L 148 90\" fill=\"none\" stroke=\"#E11D48\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g>"},
    "vitalvet_trauma": {"id": 19, "name": "VitalVet Trauma", "slug": "vitalvet_trauma", "tagline": "HOSPITAL VETERINARIO DE ALTA ESPECIALIDAD, TERAPIA INTENSIVA & CIRUG\u00cdA 24/7", "category": "Profesional / Medicina Veterinaria", "giro": "Hospital veterinario de urgencias m\u00e9dicas disponible las 24 horas del d\u00eda, con quir\u00f3fanos de flujo laminar, tomograf\u00eda computarizada, banco de sangre y terapia intensiva para perros y gatos.", "buyer": "Tutores de mascotas que consideran a sus animales parte sagrada de la familia y exigen el mismo nivel de tecnolog\u00eda, rigor m\u00e9dico y compasi\u00f3n que un hospital humano.", "why": "Porque la lealtad incondicional de un animal merece una respuesta m\u00e9dica de excelencia cuando su vida pende de un hilo.", "how": "Mantenemos un equipo de cirujanos y urgenci\u00f3logos de guardia permanente, monitoreo hemodin\u00e1mico avanzado y comunicaci\u00f3n emp\u00e1tica y transparente con la familia.", "what": "Cirug\u00eda de trauma ortop\u00e9dico y tejidos blandos, hospitalizaci\u00f3n en cub\u00edculos aislados con ox\u00edgeno, hemodi\u00e1lisis veterinaria y medicina felina Cat-Friendly.", "persona": "M\u00e9dico veterinario urgenci\u00f3logo: sereno en medio de la crisis, con manos precisas en el quir\u00f3fano y calidez infinita para abrazar a la familia preocupada.", "niza": "Clase 44 (Servicios m\u00e9dicos veterinarios, hospitales de animales, cirug\u00eda y cuidados intensivos para mascotas).", "tpBefore": ["L\u00ednea de emergencia telef\u00f3nica directa atendida por un m\u00e9dico veterinario en menos de 3 tonos", "Gu\u00eda de primeros auxilios y estabilizaci\u00f3n de mascotas antes de trasladarlas al hospital en web", "\u00c1rea de estacionamiento de urgencias con camilla y personal esperando en la puerta", "Instalaciones con certificaci\u00f3n internacional Cat-Friendly Clinic con salas de espera separadas"], "tpDuring": ["Triage inmediato en menos de 5 minutos con monitoreo de signos vitales frente al tutor", "Acceso de la familia a la sala de terapia intensiva durante los horarios de visita terap\u00e9utica", "Parte m\u00e9dico diario detallado con video y fotograf\u00edas del estado de \u00e1nimo del paciente", "Presupuesto claro y desglosado por fases m\u00e9dicas sin costos sorpresivos en la cuenta final"], "tpAfter": ["Instrucciones de medicaci\u00f3n y curaciones explicadas paso a paso con video en WhatsApp", "Llamada telef\u00f3nica a las 24 y 48 horas post-alta para monitorear apetito, dolor y movilidad", "Historial cl\u00ednico digitalizado completo con estudios de imagen y laboratorio descargables en PDF", "Servicio de ambulancia veterinaria para revisiones de seguimiento a domicilio si el paciente no puede caminar"], "colors": {"pri": "#0F766E", "sec": "#0D9488", "acc": "#E11D48", "darkInk": "#042624", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F0FDFA", "white": "#FFFFFF", "pantonePri": "Pantone 3282 C", "pantoneSec": "Pantone 3262 C", "cmykPri": "C:80 M:30 Y:50 K:25", "cmykSec": "C:70 M:15 Y:40 K:5"}, "primaryFont": "Plus Jakarta Sans", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"72\" y=\"24\" width=\"36\" height=\"132\" rx=\"6\" fill=\"#0F766E\"/><rect x=\"24\" y=\"72\" width=\"132\" height=\"36\" rx=\"6\" fill=\"#0F766E\"/><circle cx=\"90\" cy=\"90\" r=\"28\" fill=\"#FFFFFF\"/><circle cx=\"82\" cy=\"84\" r=\"5\" fill=\"#0D9488\"/><circle cx=\"98\" cy=\"84\" r=\"5\" fill=\"#0D9488\"/><circle cx=\"74\" cy=\"94\" r=\"4\" fill=\"#0D9488\"/><circle cx=\"106\" cy=\"94\" r=\"4\" fill=\"#0D9488\"/><ellipse cx=\"90\" cy=\"102\" rx=\"9\" ry=\"7\" fill=\"#0F766E\"/><path d=\"M 32 90 L 64 90 L 72 74 L 80 106 L 88 84 L 94 94 L 100 90 L 148 90\" fill=\"none\" stroke=\"#E11D48\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"72\" y=\"24\" width=\"36\" height=\"132\" rx=\"6\" fill=\"#FFFFFF\"/><rect x=\"24\" y=\"72\" width=\"132\" height=\"36\" rx=\"6\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"28\" fill=\"#0F766E\"/><circle cx=\"82\" cy=\"84\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"98\" cy=\"84\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"74\" cy=\"94\" r=\"4\" fill=\"#FFFFFF\"/><circle cx=\"106\" cy=\"94\" r=\"4\" fill=\"#FFFFFF\"/><ellipse cx=\"90\" cy=\"102\" rx=\"9\" ry=\"7\" fill=\"#FFFFFF\"/><path d=\"M 32 90 L 64 90 L 72 74 L 80 106 L 88 84 L 94 94 L 100 90 L 148 90\" fill=\"none\" stroke=\"#E11D48\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></g>"},
    "fortress_shield_soc": {"id": 20, "name": "Fortress Shield SOC", "slug": "fortress_shield_soc", "tagline": "CIBERSEGURIDAD DEFENSIVA, CENTRO DE OPERACIONES SOC & THREAT INTELLIGENCE", "category": "Productos Digitales / Ciberseguridad & SOC", "giro": "Centro de Operaciones de Seguridad (SOC) de misi\u00f3n cr\u00edtica especializado en detecci\u00f3n de intrusiones en tiempo real, respuesta a incidentes de ransomware y pruebas de penetraci\u00f3n (Red Team).", "buyer": "Bancos, plataformas fintech, aseguradoras y corporativos que manejan infraestructura cr\u00edtica y datos sensibles y no pueden permitirse una sola brecha de seguridad.", "why": "Porque en la era digital la soberan\u00eda de una empresa depende de su capacidad de anticipar, resistir y neutralizar cualquier ciberataque antes de que toque sus activos.", "how": "Monitoreamos telemetr\u00eda de red con IA predictiva, contenemos ataques con agentes EDR en milisegundos y auditamos c\u00f3digo bajo est\u00e1ndares ISO 27001 y NIST.", "what": "SOC administrado 24/7/365, an\u00e1lisis de vulnerabilidades, simulacros de secuestro de datos (Ransomware Defense) y remediaci\u00f3n forense digital.", "persona": "Comandante de operaciones de ciberseguridad: met\u00f3dico, vigilante incansable y con reflejos de hacker \u00e9tico: neutraliza la amenaza antes de que el cliente siquiera note el intento.", "niza": "Clase 42 (Servicios de ciberseguridad, monitoreo de redes inform\u00e1ticas, protecci\u00f3n contra malware y auditor\u00eda de software).", "tpBefore": ["Escaneo externo gratuito de superficie de ataque que identifica puertos abiertos y credenciales filtradas", "Calculadora de riesgo financiero ante ataques de ransomware seg\u00fan el volumen de transacciones de la empresa", "Demostraci\u00f3n en vivo de detecci\u00f3n de intrusi\u00f3n en un entorno sandbox controlado", "Acuerdos de confidencialidad estrictos (NDA) firmados digitalmente antes de intercambiar cualquier informaci\u00f3n"], "tpDuring": ["Despliegue de sensores de monitoreo en toda la red corporativa en menos de 4 horas", "Dashboard en tiempo real con mapa mundial de ciberataques mitigados y niveles de alerta", "L\u00ednea de comunicaci\u00f3n de emergencia directa v\u00eda Signal y llamadas cifradas con el equipo de respuesta r\u00e1pida", "Informes ejecutivos semanales sin tecnicismos incomprensibles para la junta de directores"], "tpAfter": ["Certificado Oficial de Blindaje de Infraestructura y Cumplimiento de Controles de Seguridad", "Simulacros peri\u00f3dicos de phishing para evaluar y capacitar a los colaboradores de la empresa", "Revisi\u00f3n semestral de la arquitectura en la nube (AWS, Azure, GCP) para cerrar nuevas brechas", "P\u00f3liza de garant\u00eda de tiempo de respuesta (SLA) inferior a 15 minutos ante cualquier evento cr\u00edtico"], "colors": {"pri": "#030712", "sec": "#1F2937", "acc": "#10B981", "darkInk": "#000000", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone Black 6 C", "pantoneSec": "Pantone 432 C", "cmykPri": "C:70 M:60 Y:50 K:100", "cmykSec": "C:50 M:40 Y:35 K:60"}, "primaryFont": "Space Grotesk", "secondaryFont": "JetBrains Mono", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"90,18 152,48 152,118 90,162 28,118 28,48\" fill=\"#030712\" stroke=\"#10B981\" stroke-width=\"2.5\"/><polygon points=\"90,32 140,56 140,112 90,148 40,112 40,56\" fill=\"#1F2937\"/><circle cx=\"90\" cy=\"80\" r=\"14\" fill=\"#030712\" stroke=\"#10B981\" stroke-width=\"2\"/><rect x=\"86\" y=\"80\" width=\"8\" height=\"24\" fill=\"#10B981\"/><line x1=\"90\" y1=\"42\" x2=\"90\" y2=\"66\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"58\" y1=\"92\" x2=\"76\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"104\" y1=\"92\" x2=\"122\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"42\" r=\"3\" fill=\"#10B981\"/><circle cx=\"58\" cy=\"92\" r=\"3\" fill=\"#10B981\"/><circle cx=\"122\" cy=\"92\" r=\"3\" fill=\"#10B981\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"90,18 152,48 152,118 90,162 28,118 28,48\" fill=\"#FFFFFF\" stroke=\"#10B981\" stroke-width=\"2.5\"/><polygon points=\"90,32 140,56 140,112 90,148 40,112 40,56\" fill=\"#030712\"/><circle cx=\"90\" cy=\"80\" r=\"14\" fill=\"#10B981\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><rect x=\"86\" y=\"80\" width=\"8\" height=\"24\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"42\" x2=\"90\" y2=\"66\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"58\" y1=\"92\" x2=\"76\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"104\" y1=\"92\" x2=\"122\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"42\" r=\"3\" fill=\"#10B981\"/><circle cx=\"58\" cy=\"92\" r=\"3\" fill=\"#10B981\"/><circle cx=\"122\" cy=\"92\" r=\"3\" fill=\"#10B981\"/></g>"},
    "fortress_shield_soc": {"id": 20, "name": "Fortress Shield SOC", "slug": "fortress_shield_soc", "tagline": "CIBERSEGURIDAD DEFENSIVA, CENTRO DE OPERACIONES SOC & THREAT INTELLIGENCE", "category": "Productos Digitales / Ciberseguridad & SOC", "giro": "Centro de Operaciones de Seguridad (SOC) de misi\u00f3n cr\u00edtica especializado en detecci\u00f3n de intrusiones en tiempo real, respuesta a incidentes de ransomware y pruebas de penetraci\u00f3n (Red Team).", "buyer": "Bancos, plataformas fintech, aseguradoras y corporativos que manejan infraestructura cr\u00edtica y datos sensibles y no pueden permitirse una sola brecha de seguridad.", "why": "Porque en la era digital la soberan\u00eda de una empresa depende de su capacidad de anticipar, resistir y neutralizar cualquier ciberataque antes de que toque sus activos.", "how": "Monitoreamos telemetr\u00eda de red con IA predictiva, contenemos ataques con agentes EDR en milisegundos y auditamos c\u00f3digo bajo est\u00e1ndares ISO 27001 y NIST.", "what": "SOC administrado 24/7/365, an\u00e1lisis de vulnerabilidades, simulacros de secuestro de datos (Ransomware Defense) y remediaci\u00f3n forense digital.", "persona": "Comandante de operaciones de ciberseguridad: met\u00f3dico, vigilante incansable y con reflejos de hacker \u00e9tico: neutraliza la amenaza antes de que el cliente siquiera note el intento.", "niza": "Clase 42 (Servicios de ciberseguridad, monitoreo de redes inform\u00e1ticas, protecci\u00f3n contra malware y auditor\u00eda de software).", "tpBefore": ["Escaneo externo gratuito de superficie de ataque que identifica puertos abiertos y credenciales filtradas", "Calculadora de riesgo financiero ante ataques de ransomware seg\u00fan el volumen de transacciones de la empresa", "Demostraci\u00f3n en vivo de detecci\u00f3n de intrusi\u00f3n en un entorno sandbox controlado", "Acuerdos de confidencialidad estrictos (NDA) firmados digitalmente antes de intercambiar cualquier informaci\u00f3n"], "tpDuring": ["Despliegue de sensores de monitoreo en toda la red corporativa en menos de 4 horas", "Dashboard en tiempo real con mapa mundial de ciberataques mitigados y niveles de alerta", "L\u00ednea de comunicaci\u00f3n de emergencia directa v\u00eda Signal y llamadas cifradas con el equipo de respuesta r\u00e1pida", "Informes ejecutivos semanales sin tecnicismos incomprensibles para la junta de directores"], "tpAfter": ["Certificado Oficial de Blindaje de Infraestructura y Cumplimiento de Controles de Seguridad", "Simulacros peri\u00f3dicos de phishing para evaluar y capacitar a los colaboradores de la empresa", "Revisi\u00f3n semestral de la arquitectura en la nube (AWS, Azure, GCP) para cerrar nuevas brechas", "P\u00f3liza de garant\u00eda de tiempo de respuesta (SLA) inferior a 15 minutos ante cualquier evento cr\u00edtico"], "colors": {"pri": "#030712", "sec": "#1F2937", "acc": "#10B981", "darkInk": "#000000", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone Black 6 C", "pantoneSec": "Pantone 432 C", "cmykPri": "C:70 M:60 Y:50 K:100", "cmykSec": "C:50 M:40 Y:35 K:60"}, "primaryFont": "Space Grotesk", "secondaryFont": "JetBrains Mono", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"90,18 152,48 152,118 90,162 28,118 28,48\" fill=\"#030712\" stroke=\"#10B981\" stroke-width=\"2.5\"/><polygon points=\"90,32 140,56 140,112 90,148 40,112 40,56\" fill=\"#1F2937\"/><circle cx=\"90\" cy=\"80\" r=\"14\" fill=\"#030712\" stroke=\"#10B981\" stroke-width=\"2\"/><rect x=\"86\" y=\"80\" width=\"8\" height=\"24\" fill=\"#10B981\"/><line x1=\"90\" y1=\"42\" x2=\"90\" y2=\"66\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"58\" y1=\"92\" x2=\"76\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"104\" y1=\"92\" x2=\"122\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"42\" r=\"3\" fill=\"#10B981\"/><circle cx=\"58\" cy=\"92\" r=\"3\" fill=\"#10B981\"/><circle cx=\"122\" cy=\"92\" r=\"3\" fill=\"#10B981\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"90,18 152,48 152,118 90,162 28,118 28,48\" fill=\"#FFFFFF\" stroke=\"#10B981\" stroke-width=\"2.5\"/><polygon points=\"90,32 140,56 140,112 90,148 40,112 40,56\" fill=\"#030712\"/><circle cx=\"90\" cy=\"80\" r=\"14\" fill=\"#10B981\" stroke=\"#FFFFFF\" stroke-width=\"2\"/><rect x=\"86\" y=\"80\" width=\"8\" height=\"24\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"42\" x2=\"90\" y2=\"66\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"58\" y1=\"92\" x2=\"76\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><line x1=\"104\" y1=\"92\" x2=\"122\" y2=\"92\" stroke=\"#10B981\" stroke-width=\"2\"/><circle cx=\"90\" cy=\"42\" r=\"3\" fill=\"#10B981\"/><circle cx=\"58\" cy=\"92\" r=\"3\" fill=\"#10B981\"/><circle cx=\"122\" cy=\"92\" r=\"3\" fill=\"#10B981\"/></g>"},
    "aurum_y_diamante": {"id": 21, "name": "Aurum & Diamante", "slug": "aurum_y_diamante", "tagline": "ALTA JOYER\u00cdA DE AUTOR, ORO \u00c9TICO 24K & DIAMANTES CERTIFICADOS", "category": "Tienda / Alta Joyer\u00eda & Lujo", "giro": "Atelier de alta joyer\u00eda de autor especializado en sortijas de compromiso, collares de gemas preciosas sin conflicto y piezas de alta orfebrer\u00eda forjadas a mano en oro \u00e9tico de 24 y 18 quilates.", "buyer": "Coleccionistas, parejas comprometidas y conocedores que buscan piezas conmemorativas \u00fanicas, piedras con certificado gemol\u00f3gico GIA y manufactura art\u00edstica irrepetible.", "why": "Porque los grandes momentos de la vida merecen un objeto imperecedero cuya belleza y valor trasciendan los siglos y las generaciones.", "how": "Seleccionamos diamantes naturales bajo el Proceso de Kimberley, esculpimos modelos en cera perdida y engastamos cada gema bajo microscopio estereosc\u00f3pico.", "what": "Anillos de compromiso solitarios y halo, churumbelas de diamantes, brazaletes r\u00edgidos de oro macizo y servicio de restauraci\u00f3n de joyas de herencia familiar.", "persona": "Maestro joyero y gem\u00f3logo certificado: examina cada faceta de luz con lupa de 10x, trata los metales preciosos con devoci\u00f3n y custodia la historia emocional de cada cliente.", "niza": "Clase 14 (Metales preciosos y sus aleaciones, joyer\u00eda, piedras preciosas y semipreciosas, relojer\u00eda).", "tpBefore": ["Boutique privada con cita exclusiva a puerta cerrada con champa\u00f1a y asesor\u00eda personalizada", "Visor digital interactivo en web para rotar diamantes en 360\u00b0 y examinar su claridad y color", "Certificado gemol\u00f3gico oficial GIA o HRD entregado en carpeta de piel con holograma de seguridad", "Bocetos a mano alzada en gouache mostrando las dimensiones reales de la joya antes de fabricarla"], "tpDuring": ["Prueba de montura en cera para confirmar el ajuste perfecto al dedo antes del vaciado en oro", "Grabado l\u00e1ser personalizado en el interior del aro con caligraf\u00eda o huella dactilar de la pareja", "Estuche joyero artesanal forrado en terciopelo azul noche con cerradura de lat\u00f3n dorado", "Entrega con guantes de seda blanca y pa\u00f1o de microfibra especial para pulido de metales nobles"], "tpAfter": ["Servicio de limpieza y mantenimiento ultras\u00f3nico gratuito de por vida para todas las piezas del atelier", "P\u00f3liza de seguro contra robo y p\u00e9rdida respaldada por aseguradora internacional durante el primer a\u00f1o", "Aval\u00fao comercial formal actualizado cada 3 a\u00f1os para fines patrimoniales y testamentarios", "Invitaci\u00f3n a exhibiciones privadas anuales de gemas raras reci\u00e9n llegadas de Amberes y Ceil\u00e1n"], "colors": {"pri": "#0F172A", "sec": "#1E293B", "acc": "#EAB308", "darkInk": "#020617", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 296 C", "pantoneSec": "Pantone 295 C", "cmykPri": "C:85 M:70 Y:45 K:60", "cmykSec": "C:75 M:60 Y:40 K:40"}, "primaryFont": "Cinzel", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FAF8F5\" stroke=\"#EAB308\" stroke-width=\"1.8\"/><polygon points=\"90,32 126,58 142,58 90,138 38,58 54,58\" fill=\"#0F172A\"/><polygon points=\"54,58 126,58 90,138\" fill=\"#1E293B\"/><polygon points=\"54,58 90,32 126,58\" fill=\"#EAB308\"/><line x1=\"90\" y1=\"32\" x2=\"90\" y2=\"138\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/><line x1=\"72\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#EAB308\"/><circle cx=\"70\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><circle cx=\"110\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><path d=\"M 134 40 L 137 46 L 143 48 L 137 50 L 134 56 L 131 50 L 125 48 L 131 46 Z\" fill=\"#EAB308\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#EAB308\" stroke-width=\"1.8\"/><polygon points=\"90,32 126,58 142,58 90,138 38,58 54,58\" fill=\"#FFFFFF\"/><polygon points=\"54,58 126,58 90,138\" fill=\"#EAB308\"/><polygon points=\"54,58 90,32 126,58\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"32\" x2=\"90\" y2=\"138\" stroke=\"#0F172A\" stroke-width=\"1.5\"/><line x1=\"72\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#0F172A\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#0F172A\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#EAB308\"/><circle cx=\"70\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><circle cx=\"110\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><path d=\"M 134 40 L 137 46 L 143 48 L 137 50 L 134 56 L 131 50 L 125 48 L 131 46 Z\" fill=\"#FFFFFF\"/></g>"},
    "aurum_&_diamante": {"id": 21, "name": "Aurum & Diamante", "slug": "aurum_y_diamante", "tagline": "ALTA JOYER\u00cdA DE AUTOR, ORO \u00c9TICO 24K & DIAMANTES CERTIFICADOS", "category": "Tienda / Alta Joyer\u00eda & Lujo", "giro": "Atelier de alta joyer\u00eda de autor especializado en sortijas de compromiso, collares de gemas preciosas sin conflicto y piezas de alta orfebrer\u00eda forjadas a mano en oro \u00e9tico de 24 y 18 quilates.", "buyer": "Coleccionistas, parejas comprometidas y conocedores que buscan piezas conmemorativas \u00fanicas, piedras con certificado gemol\u00f3gico GIA y manufactura art\u00edstica irrepetible.", "why": "Porque los grandes momentos de la vida merecen un objeto imperecedero cuya belleza y valor trasciendan los siglos y las generaciones.", "how": "Seleccionamos diamantes naturales bajo el Proceso de Kimberley, esculpimos modelos en cera perdida y engastamos cada gema bajo microscopio estereosc\u00f3pico.", "what": "Anillos de compromiso solitarios y halo, churumbelas de diamantes, brazaletes r\u00edgidos de oro macizo y servicio de restauraci\u00f3n de joyas de herencia familiar.", "persona": "Maestro joyero y gem\u00f3logo certificado: examina cada faceta de luz con lupa de 10x, trata los metales preciosos con devoci\u00f3n y custodia la historia emocional de cada cliente.", "niza": "Clase 14 (Metales preciosos y sus aleaciones, joyer\u00eda, piedras preciosas y semipreciosas, relojer\u00eda).", "tpBefore": ["Boutique privada con cita exclusiva a puerta cerrada con champa\u00f1a y asesor\u00eda personalizada", "Visor digital interactivo en web para rotar diamantes en 360\u00b0 y examinar su claridad y color", "Certificado gemol\u00f3gico oficial GIA o HRD entregado en carpeta de piel con holograma de seguridad", "Bocetos a mano alzada en gouache mostrando las dimensiones reales de la joya antes de fabricarla"], "tpDuring": ["Prueba de montura en cera para confirmar el ajuste perfecto al dedo antes del vaciado en oro", "Grabado l\u00e1ser personalizado en el interior del aro con caligraf\u00eda o huella dactilar de la pareja", "Estuche joyero artesanal forrado en terciopelo azul noche con cerradura de lat\u00f3n dorado", "Entrega con guantes de seda blanca y pa\u00f1o de microfibra especial para pulido de metales nobles"], "tpAfter": ["Servicio de limpieza y mantenimiento ultras\u00f3nico gratuito de por vida para todas las piezas del atelier", "P\u00f3liza de seguro contra robo y p\u00e9rdida respaldada por aseguradora internacional durante el primer a\u00f1o", "Aval\u00fao comercial formal actualizado cada 3 a\u00f1os para fines patrimoniales y testamentarios", "Invitaci\u00f3n a exhibiciones privadas anuales de gemas raras reci\u00e9n llegadas de Amberes y Ceil\u00e1n"], "colors": {"pri": "#0F172A", "sec": "#1E293B", "acc": "#EAB308", "darkInk": "#020617", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 296 C", "pantoneSec": "Pantone 295 C", "cmykPri": "C:85 M:70 Y:45 K:60", "cmykSec": "C:75 M:60 Y:40 K:40"}, "primaryFont": "Cinzel", "secondaryFont": "Montserrat", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FAF8F5\" stroke=\"#EAB308\" stroke-width=\"1.8\"/><polygon points=\"90,32 126,58 142,58 90,138 38,58 54,58\" fill=\"#0F172A\"/><polygon points=\"54,58 126,58 90,138\" fill=\"#1E293B\"/><polygon points=\"54,58 90,32 126,58\" fill=\"#EAB308\"/><line x1=\"90\" y1=\"32\" x2=\"90\" y2=\"138\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/><line x1=\"72\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#EAB308\"/><circle cx=\"70\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><circle cx=\"110\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><path d=\"M 134 40 L 137 46 L 143 48 L 137 50 L 134 56 L 131 50 L 125 48 L 131 46 Z\" fill=\"#EAB308\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#EAB308\" stroke-width=\"1.8\"/><polygon points=\"90,32 126,58 142,58 90,138 38,58 54,58\" fill=\"#FFFFFF\"/><polygon points=\"54,58 126,58 90,138\" fill=\"#EAB308\"/><polygon points=\"54,58 90,32 126,58\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"32\" x2=\"90\" y2=\"138\" stroke=\"#0F172A\" stroke-width=\"1.5\"/><line x1=\"72\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#0F172A\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"58\" x2=\"90\" y2=\"138\" stroke=\"#0F172A\" stroke-width=\"1.2\"/><circle cx=\"90\" cy=\"24\" r=\"5\" fill=\"#EAB308\"/><circle cx=\"70\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><circle cx=\"110\" cy=\"28\" r=\"3.5\" fill=\"#EAB308\"/><path d=\"M 134 40 L 137 46 L 143 48 L 137 50 L 134 56 L 131 50 L 125 48 L 131 46 Z\" fill=\"#FFFFFF\"/></g>"},
    "cilindro_maestro": {"id": 22, "name": "Cilindro Maestro", "slug": "cilindro_maestro", "tagline": "RESTAURACI\u00d3N DE MOTORES V8, MEC\u00c1NICA DE PRECISI\u00d3N & AUTOS CL\u00c1SICOS", "category": "Servicios / Restauraci\u00f3n Automotriz", "giro": "Taller mec\u00e1nico de alta precisi\u00f3n especializado en reconstrucci\u00f3n integral de motores V8 cl\u00e1sicos y modernos, calibraci\u00f3n de carburadores de competici\u00f3n y restauraci\u00f3n de carrocer\u00edas.", "buyer": "Coleccionistas de autos cl\u00e1sicos, pilotos de carreras y apasionados del motor que demandan potencia pura, sonido sinf\u00f3nico y ajustes mec\u00e1nicos con tolerancias milim\u00e9tricas.", "why": "Porque un motor de combusti\u00f3n bien afinado es una obra maestra de la ingenier\u00eda mec\u00e1nica que merece rugir con fuerza y orgullo sobre el asfalto.", "how": "Rectificamos monoblocks en tornos computarizados, balanceamos cig\u00fce\u00f1ales din\u00e1micamente y probamos cada motor en banco de potencia dinamom\u00e9trico (Dyno).", "what": "Reconstrucci\u00f3n completa de motores de alto desempe\u00f1o, puesta a punto de sistemas de inyecci\u00f3n y carburaci\u00f3n, reconstrucci\u00f3n de transmisiones y suspensi\u00f3n deportiva.", "persona": "Maestro mec\u00e1nico y preparador de motores de competencia: escucha el ralent\u00ed con el o\u00eddo pegado al m\u00faltiple de admisi\u00f3n y calibra v\u00e1lvulas con galgas de precisi\u00f3n.", "niza": "Clase 37 (Reparaci\u00f3n, restauraci\u00f3n y mantenimiento de veh\u00edculos de motor, rectificaci\u00f3n de motores y afinaci\u00f3n mec\u00e1nica).", "tpBefore": ["Diagn\u00f3stico preliminar en video mostrando pruebas de compresi\u00f3n cilindro por cilindro y endoscop\u00eda interna", "Galer\u00eda fotogr\u00e1fica de proyectos de restauraci\u00f3n 'frame-off' completados con m\u00e1s de 2,000 horas de trabajo", "Presupuesto detallado parte por parte con n\u00fameros de pieza originales OEM y tiempos de entrega", "Recepci\u00f3n del veh\u00edculo en plataforma cerrada con inventario fotogr\u00e1fico minucioso de 50 puntos"], "tpDuring": ["Acceso semanal a la bit\u00e1cora fotogr\u00e1fica en l\u00ednea donde se documenta el maquinado de cada pieza", "Prueba de encendido inicial transmitida en vivo para el cliente desde la celda de pruebas del dinam\u00f3metro", "Gr\u00e1fica oficial de potencia (HP) y torque (lb-pie) certificada por el banco de potencia Dynojet", "Lavado ultras\u00f3nico de cada tornillo y recubrimiento anticorrosivo de grado automotriz de carrera"], "tpAfter": ["Libro de bit\u00e1cora encuadernado en cuero con todas las tolerancias de holgura, fotos y especificaciones de torque", "P\u00f3liza de garant\u00eda de 12 meses o 20,000 km en la reconstrucci\u00f3n del bloque del motor", "Afinaci\u00f3n y cambio de aceite de rodaje gratuito a los primeros 1,000 kil\u00f3metros de uso", "Asistencia t\u00e9cnica telef\u00f3nica directa con el maestro mec\u00e1nico para dudas en eventos de exhibici\u00f3n o pista"], "colors": {"pri": "#1F2937", "sec": "#374151", "acc": "#DC2626", "darkInk": "#0D1117", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 431 C", "cmykPri": "C:50 M:40 Y:35 K:60", "cmykSec": "C:45 M:35 Y:30 K:45"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"62\" y=\"32\" width=\"56\" height=\"52\" rx=\"4\" fill=\"#1F2937\"/><line x1=\"62\" y1=\"46\" x2=\"118\" y2=\"46\" stroke=\"#374151\" stroke-width=\"2.5\"/><line x1=\"62\" y1=\"60\" x2=\"118\" y2=\"60\" stroke=\"#374151\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"74\" r=\"8\" fill=\"#DC2626\"/><path d=\"M 84 84 L 76 138 L 104 138 L 96 84 Z\" fill=\"#374151\"/><circle cx=\"90\" cy=\"144\" r=\"16\" fill=\"#1F2937\"/><circle cx=\"90\" cy=\"144\" r=\"8\" fill=\"#FFFFFF\"/><path d=\"M 38 126 C 38 78, 54 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/><path d=\"M 142 126 C 142 78, 126 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"62\" y=\"32\" width=\"56\" height=\"52\" rx=\"4\" fill=\"#FFFFFF\"/><line x1=\"62\" y1=\"46\" x2=\"118\" y2=\"46\" stroke=\"#DC2626\" stroke-width=\"2.5\"/><line x1=\"62\" y1=\"60\" x2=\"118\" y2=\"60\" stroke=\"#DC2626\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"74\" r=\"8\" fill=\"#DC2626\"/><path d=\"M 84 84 L 76 138 L 104 138 L 96 84 Z\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"144\" r=\"16\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"144\" r=\"8\" fill=\"#1F2937\"/><path d=\"M 38 126 C 38 78, 54 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/><path d=\"M 142 126 C 142 78, 126 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/></g>"},
    "cilindro_maestro": {"id": 22, "name": "Cilindro Maestro", "slug": "cilindro_maestro", "tagline": "RESTAURACI\u00d3N DE MOTORES V8, MEC\u00c1NICA DE PRECISI\u00d3N & AUTOS CL\u00c1SICOS", "category": "Servicios / Restauraci\u00f3n Automotriz", "giro": "Taller mec\u00e1nico de alta precisi\u00f3n especializado en reconstrucci\u00f3n integral de motores V8 cl\u00e1sicos y modernos, calibraci\u00f3n de carburadores de competici\u00f3n y restauraci\u00f3n de carrocer\u00edas.", "buyer": "Coleccionistas de autos cl\u00e1sicos, pilotos de carreras y apasionados del motor que demandan potencia pura, sonido sinf\u00f3nico y ajustes mec\u00e1nicos con tolerancias milim\u00e9tricas.", "why": "Porque un motor de combusti\u00f3n bien afinado es una obra maestra de la ingenier\u00eda mec\u00e1nica que merece rugir con fuerza y orgullo sobre el asfalto.", "how": "Rectificamos monoblocks en tornos computarizados, balanceamos cig\u00fce\u00f1ales din\u00e1micamente y probamos cada motor en banco de potencia dinamom\u00e9trico (Dyno).", "what": "Reconstrucci\u00f3n completa de motores de alto desempe\u00f1o, puesta a punto de sistemas de inyecci\u00f3n y carburaci\u00f3n, reconstrucci\u00f3n de transmisiones y suspensi\u00f3n deportiva.", "persona": "Maestro mec\u00e1nico y preparador de motores de competencia: escucha el ralent\u00ed con el o\u00eddo pegado al m\u00faltiple de admisi\u00f3n y calibra v\u00e1lvulas con galgas de precisi\u00f3n.", "niza": "Clase 37 (Reparaci\u00f3n, restauraci\u00f3n y mantenimiento de veh\u00edculos de motor, rectificaci\u00f3n de motores y afinaci\u00f3n mec\u00e1nica).", "tpBefore": ["Diagn\u00f3stico preliminar en video mostrando pruebas de compresi\u00f3n cilindro por cilindro y endoscop\u00eda interna", "Galer\u00eda fotogr\u00e1fica de proyectos de restauraci\u00f3n 'frame-off' completados con m\u00e1s de 2,000 horas de trabajo", "Presupuesto detallado parte por parte con n\u00fameros de pieza originales OEM y tiempos de entrega", "Recepci\u00f3n del veh\u00edculo en plataforma cerrada con inventario fotogr\u00e1fico minucioso de 50 puntos"], "tpDuring": ["Acceso semanal a la bit\u00e1cora fotogr\u00e1fica en l\u00ednea donde se documenta el maquinado de cada pieza", "Prueba de encendido inicial transmitida en vivo para el cliente desde la celda de pruebas del dinam\u00f3metro", "Gr\u00e1fica oficial de potencia (HP) y torque (lb-pie) certificada por el banco de potencia Dynojet", "Lavado ultras\u00f3nico de cada tornillo y recubrimiento anticorrosivo de grado automotriz de carrera"], "tpAfter": ["Libro de bit\u00e1cora encuadernado en cuero con todas las tolerancias de holgura, fotos y especificaciones de torque", "P\u00f3liza de garant\u00eda de 12 meses o 20,000 km en la reconstrucci\u00f3n del bloque del motor", "Afinaci\u00f3n y cambio de aceite de rodaje gratuito a los primeros 1,000 kil\u00f3metros de uso", "Asistencia t\u00e9cnica telef\u00f3nica directa con el maestro mec\u00e1nico para dudas en eventos de exhibici\u00f3n o pista"], "colors": {"pri": "#1F2937", "sec": "#374151", "acc": "#DC2626", "darkInk": "#0D1117", "midGray": "#6B7280", "lightGray": "#E5E7EB", "softBg": "#F9FAFB", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 431 C", "cmykPri": "C:50 M:40 Y:35 K:60", "cmykSec": "C:45 M:35 Y:30 K:45"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"62\" y=\"32\" width=\"56\" height=\"52\" rx=\"4\" fill=\"#1F2937\"/><line x1=\"62\" y1=\"46\" x2=\"118\" y2=\"46\" stroke=\"#374151\" stroke-width=\"2.5\"/><line x1=\"62\" y1=\"60\" x2=\"118\" y2=\"60\" stroke=\"#374151\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"74\" r=\"8\" fill=\"#DC2626\"/><path d=\"M 84 84 L 76 138 L 104 138 L 96 84 Z\" fill=\"#374151\"/><circle cx=\"90\" cy=\"144\" r=\"16\" fill=\"#1F2937\"/><circle cx=\"90\" cy=\"144\" r=\"8\" fill=\"#FFFFFF\"/><path d=\"M 38 126 C 38 78, 54 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/><path d=\"M 142 126 C 142 78, 126 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"62\" y=\"32\" width=\"56\" height=\"52\" rx=\"4\" fill=\"#FFFFFF\"/><line x1=\"62\" y1=\"46\" x2=\"118\" y2=\"46\" stroke=\"#DC2626\" stroke-width=\"2.5\"/><line x1=\"62\" y1=\"60\" x2=\"118\" y2=\"60\" stroke=\"#DC2626\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"74\" r=\"8\" fill=\"#DC2626\"/><path d=\"M 84 84 L 76 138 L 104 138 L 96 84 Z\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"144\" r=\"16\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"144\" r=\"8\" fill=\"#1F2937\"/><path d=\"M 38 126 C 38 78, 54 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/><path d=\"M 142 126 C 142 78, 126 44, 90 24\" fill=\"none\" stroke=\"#DC2626\" stroke-width=\"2.5\" stroke-dasharray=\"6,4\"/></g>"},
    "botanica_sublime": {"id": 23, "name": "Bot\u00e1nica Sublime", "slug": "botanica_sublime", "tagline": "ALTA COSTURA FLORAL, ARTE BOT\u00c1NICO & PAISAJISMO ESCULT\u00d3RICO", "category": "Tienda & Servicios / Alta Florister\u00eda", "giro": "Estudio de arte bot\u00e1nico y alta costura floral especializado en ambientaci\u00f3n de bodas de destino, instalaciones vegetales ef\u00edmeras para eventos de lujo y paisajismo residencial.", "buyer": "Novias sofisticadas, marcas de moda de lujo, hoteler\u00eda premium y amantes de las flores que buscan propuestas art\u00edsticas vanguardistas que rompan con los arreglos convencionales.", "why": "Porque las flores son la manifestaci\u00f3n m\u00e1s ef\u00edmera y sublime de la belleza en la tierra; capturar su poes\u00eda transforma cualquier espacio en un santuario vivo.", "how": "Importamos flores de corte fresco de cultivos sustentables de Holanda, Ecuador y M\u00e9xico, seleccionamos formas escult\u00f3ricas y respetamos el movimiento natural de cada tallo.", "what": "Instalaciones florales suspendidas, arcos ceremoniales monumentales, ramos de novia de autor y dise\u00f1o de jardines perennes de bajo consumo h\u00eddrico.", "persona": "Directora creativa y artista floral: piensa con la sensibilidad de una pintora impresionista, compone con vol\u00famenes bot\u00e1nicos org\u00e1nicos y llena cada atm\u00f3sfera de aroma y elegancia.", "niza": "Clase 31 (Flores naturales, plantas vivas, arreglos bot\u00e1nicos) y Clase 44 (Servicios de florister\u00eda, dise\u00f1o de jardines y paisajismo).", "tpBefore": ["Moodboard conceptual personalizado en Notion con paleta crom\u00e1tica bot\u00e1nica y texturas de follaje", "Visita t\u00e9cnica de exploraci\u00f3n al recinto o jard\u00edn para analizar la luz solar y la ventilaci\u00f3n del espacio", "Portafolio editorial publicado en revistas internacionales de bodas y dise\u00f1o de interiores", "Prueba de flores frescas y muestra de texturas en el showroom del atelier antes de la firma del contrato"], "tpDuring": ["Montaje in situ con equipo de floristas profesionales trabajando bajo refrigeraci\u00f3n controlada", "Selecci\u00f3n y curadur\u00eda de floreros de cer\u00e1mica artesanal, cristal soplado y bases de piedra volc\u00e1nica", "Supervisi\u00f3n personal de la directora creativa hasta el minuto previo al inicio del evento", "Re-hidrataci\u00f3n peri\u00f3dica de las flores para garantizar que luzcan radiantes durante toda la velada"], "tpAfter": ["Servicio de desmontaje ecol\u00f3gico con compostaje de residuos vegetales en rancho org\u00e1nico asociado", "Donaci\u00f3n de flores en perfecto estado a hospitales y asilos locales con previa autorizaci\u00f3n del cliente", "Entrega del ramo de novia deshidratado y preservado en marco bot\u00e1nico herm\u00e9tico de colecci\u00f3n", "\u00c1lbum fotogr\u00e1fico digital de alta resoluci\u00f3n con los detalles de la ambientaci\u00f3n para el archivo familiar"], "colors": {"pri": "#2D3748", "sec": "#4A5568", "acc": "#EC4899", "darkInk": "#1A202C", "midGray": "#718096", "lightGray": "#E2E8F0", "softBg": "#FFF5F7", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 430 C", "cmykPri": "C:55 M:45 Y:35 K:45", "cmykSec": "C:45 M:35 Y:25 K:30"}, "primaryFont": "Cormorant Garamond", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FFF5F7\" stroke=\"#EC4899\" stroke-width=\"1.5\"/><path d=\"M 90 152 C 90 110, 80 84, 88 54 C 92 68, 86 98, 90 152 Z\" fill=\"#2D3748\"/><path d=\"M 88 54 C 74 34, 60 48, 70 66 C 78 62, 84 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 102 34, 116 48, 106 66 C 98 62, 92 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 88 28, 88 28, 88 28 C 84 38, 84 48, 88 54 Z\" fill=\"#4A5568\"/><circle cx=\"88\" cy=\"54\" r=\"6\" fill=\"#FDE047\"/><path d=\"M 89 110 C 64 100, 48 114, 56 128 C 70 126, 82 118, 89 110 Z\" fill=\"#4A5568\"/><path d=\"M 89 94 C 114 84, 130 98, 122 112 C 108 110, 96 102, 89 94 Z\" fill=\"#4A5568\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#EC4899\" stroke-width=\"1.5\"/><path d=\"M 90 152 C 90 110, 80 84, 88 54 C 92 68, 86 98, 90 152 Z\" fill=\"#FFFFFF\"/><path d=\"M 88 54 C 74 34, 60 48, 70 66 C 78 62, 84 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 102 34, 116 48, 106 66 C 98 62, 92 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 88 28, 88 28, 88 28 C 84 38, 84 48, 88 54 Z\" fill=\"#FFFFFF\"/><circle cx=\"88\" cy=\"54\" r=\"6\" fill=\"#FDE047\"/><path d=\"M 89 110 C 64 100, 48 114, 56 128 C 70 126, 82 118, 89 110 Z\" fill=\"#F472B6\"/><path d=\"M 89 94 C 114 84, 130 98, 122 112 C 108 110, 96 102, 89 94 Z\" fill=\"#F472B6\"/></g>"},
    "botánica_sublime": {"id": 23, "name": "Bot\u00e1nica Sublime", "slug": "botanica_sublime", "tagline": "ALTA COSTURA FLORAL, ARTE BOT\u00c1NICO & PAISAJISMO ESCULT\u00d3RICO", "category": "Tienda & Servicios / Alta Florister\u00eda", "giro": "Estudio de arte bot\u00e1nico y alta costura floral especializado en ambientaci\u00f3n de bodas de destino, instalaciones vegetales ef\u00edmeras para eventos de lujo y paisajismo residencial.", "buyer": "Novias sofisticadas, marcas de moda de lujo, hoteler\u00eda premium y amantes de las flores que buscan propuestas art\u00edsticas vanguardistas que rompan con los arreglos convencionales.", "why": "Porque las flores son la manifestaci\u00f3n m\u00e1s ef\u00edmera y sublime de la belleza en la tierra; capturar su poes\u00eda transforma cualquier espacio en un santuario vivo.", "how": "Importamos flores de corte fresco de cultivos sustentables de Holanda, Ecuador y M\u00e9xico, seleccionamos formas escult\u00f3ricas y respetamos el movimiento natural de cada tallo.", "what": "Instalaciones florales suspendidas, arcos ceremoniales monumentales, ramos de novia de autor y dise\u00f1o de jardines perennes de bajo consumo h\u00eddrico.", "persona": "Directora creativa y artista floral: piensa con la sensibilidad de una pintora impresionista, compone con vol\u00famenes bot\u00e1nicos org\u00e1nicos y llena cada atm\u00f3sfera de aroma y elegancia.", "niza": "Clase 31 (Flores naturales, plantas vivas, arreglos bot\u00e1nicos) y Clase 44 (Servicios de florister\u00eda, dise\u00f1o de jardines y paisajismo).", "tpBefore": ["Moodboard conceptual personalizado en Notion con paleta crom\u00e1tica bot\u00e1nica y texturas de follaje", "Visita t\u00e9cnica de exploraci\u00f3n al recinto o jard\u00edn para analizar la luz solar y la ventilaci\u00f3n del espacio", "Portafolio editorial publicado en revistas internacionales de bodas y dise\u00f1o de interiores", "Prueba de flores frescas y muestra de texturas en el showroom del atelier antes de la firma del contrato"], "tpDuring": ["Montaje in situ con equipo de floristas profesionales trabajando bajo refrigeraci\u00f3n controlada", "Selecci\u00f3n y curadur\u00eda de floreros de cer\u00e1mica artesanal, cristal soplado y bases de piedra volc\u00e1nica", "Supervisi\u00f3n personal de la directora creativa hasta el minuto previo al inicio del evento", "Re-hidrataci\u00f3n peri\u00f3dica de las flores para garantizar que luzcan radiantes durante toda la velada"], "tpAfter": ["Servicio de desmontaje ecol\u00f3gico con compostaje de residuos vegetales en rancho org\u00e1nico asociado", "Donaci\u00f3n de flores en perfecto estado a hospitales y asilos locales con previa autorizaci\u00f3n del cliente", "Entrega del ramo de novia deshidratado y preservado en marco bot\u00e1nico herm\u00e9tico de colecci\u00f3n", "\u00c1lbum fotogr\u00e1fico digital de alta resoluci\u00f3n con los detalles de la ambientaci\u00f3n para el archivo familiar"], "colors": {"pri": "#2D3748", "sec": "#4A5568", "acc": "#EC4899", "darkInk": "#1A202C", "midGray": "#718096", "lightGray": "#E2E8F0", "softBg": "#FFF5F7", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 430 C", "cmykPri": "C:55 M:45 Y:35 K:45", "cmykSec": "C:45 M:35 Y:25 K:30"}, "primaryFont": "Cormorant Garamond", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FFF5F7\" stroke=\"#EC4899\" stroke-width=\"1.5\"/><path d=\"M 90 152 C 90 110, 80 84, 88 54 C 92 68, 86 98, 90 152 Z\" fill=\"#2D3748\"/><path d=\"M 88 54 C 74 34, 60 48, 70 66 C 78 62, 84 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 102 34, 116 48, 106 66 C 98 62, 92 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 88 28, 88 28, 88 28 C 84 38, 84 48, 88 54 Z\" fill=\"#4A5568\"/><circle cx=\"88\" cy=\"54\" r=\"6\" fill=\"#FDE047\"/><path d=\"M 89 110 C 64 100, 48 114, 56 128 C 70 126, 82 118, 89 110 Z\" fill=\"#4A5568\"/><path d=\"M 89 94 C 114 84, 130 98, 122 112 C 108 110, 96 102, 89 94 Z\" fill=\"#4A5568\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#EC4899\" stroke-width=\"1.5\"/><path d=\"M 90 152 C 90 110, 80 84, 88 54 C 92 68, 86 98, 90 152 Z\" fill=\"#FFFFFF\"/><path d=\"M 88 54 C 74 34, 60 48, 70 66 C 78 62, 84 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 102 34, 116 48, 106 66 C 98 62, 92 58, 88 54 Z\" fill=\"#EC4899\"/><path d=\"M 88 54 C 88 28, 88 28, 88 28 C 84 38, 84 48, 88 54 Z\" fill=\"#FFFFFF\"/><circle cx=\"88\" cy=\"54\" r=\"6\" fill=\"#FDE047\"/><path d=\"M 89 110 C 64 100, 48 114, 56 128 C 70 126, 82 118, 89 110 Z\" fill=\"#F472B6\"/><path d=\"M 89 94 C 114 84, 130 98, 122 112 C 108 110, 96 102, 89 94 Z\" fill=\"#F472B6\"/></g>"},
    "facturaflow": {"id": 24, "name": "FacturaFlow", "slug": "facturaflow", "tagline": "FACTURACI\u00d3N ELECTR\u00d3NICA, COBRANZA AUTOMATIZADA CON IA & ERP CLOUD", "category": "Productos Digitales / Software SaaS & Fintech", "giro": "Plataforma de software como servicio (SaaS) en la nube para emisi\u00f3n masiva de CFDI 4.0, conciliaci\u00f3n bancaria autom\u00e1tica con inteligencia artificial y gesti\u00f3n de cobranza preventiva.", "buyer": "Directores de finanzas, contadores, directores de operaciones y empresas en crecimiento que pierden d\u00edas enteros conciliando facturas manualmente y sufren por cobranza tard\u00eda.", "why": "Porque el tiempo de los equipos financieros no debe consumirse en tareas burocr\u00e1ticas repetitivas, sino en analizar n\u00fameros para hacer crecer el negocio.", "how": "Conectamos API directa con los principales bancos y el SAT, procesamos comprobantes con OCR inteligente y enviamos recordatorios de pago automatizados y amables.", "what": "Emisi\u00f3n ilimitada de facturas electr\u00f3nicas, complementos de pago autom\u00e1ticos, portal de autoservicio para clientes y reportes de flujo de caja en tiempo real.", "persona": "Ingeniero de producto y l\u00edder fintech: obsesionado con la velocidad de carga de la app, la claridad visual de las tablas y la precisi\u00f3n en cada centavo.", "niza": "Clase 9 (Software descargable y aplicaciones web para facturaci\u00f3n y contabilidad) y Clase 35 (Servicios de facturaci\u00f3n electr\u00f3nica y gesti\u00f3n contable).", "tpBefore": ["Prueba gratuita de 14 d\u00edas con acceso total sin necesidad de ingresar tarjeta de cr\u00e9dito", "Calculadora web de horas ahorradas y reducci\u00f3n de cartera vencida con FacturaFlow", "Migraci\u00f3n autom\u00e1tica de cat\u00e1logos de clientes y productos desde el software anterior en 1 clic", "Webinars semanales de actualizaci\u00f3n sobre cambios en las reglas de la miscel\u00e1nea fiscal"], "tpDuring": ["Emisi\u00f3n de una factura completa en menos de 18 segundos con env\u00edo autom\u00e1tico por correo y WhatsApp", "Bot\u00f3n de pago directo en la factura digital para que los clientes paguen con transferencia o tarjeta", "Soporte t\u00e9cnico por chat en vivo con especialistas contables que responden en menos de 90 segundos", "Respaldo autom\u00e1tico de todos los XML y PDF en servidores con cifrado bancario de 256 bits"], "tpAfter": ["Reporte mensual de cobranza con desglose de facturas pagadas, pendientes y proyecci\u00f3n de flujo", "Alertas autom\u00e1ticas ante facturas canceladas indebidamente por proveedores o clientes", "Integraci\u00f3n nativa con sistemas ERP corporativos (SAP, Oracle, Zoho Books) mediante Webhooks", "Reuni\u00f3n de \u00e9xito del cliente trimestral para optimizar flujos de trabajo contables y reducir fricciones"], "colors": {"pri": "#0F172A", "sec": "#2563EB", "acc": "#059669", "darkInk": "#020617", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 296 C", "pantoneSec": "Pantone 2728 C", "cmykPri": "C:85 M:70 Y:45 K:60", "cmykSec": "C:85 M:55 Y:0 K:0"}, "primaryFont": "Plus Jakarta Sans", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"32\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#0F172A\"/><rect x=\"44\" y=\"44\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"44\" y=\"56\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#64748B\"/><rect x=\"44\" y=\"66\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#64748B\"/><rect x=\"44\" y=\"76\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#64748B\"/><rect x=\"84\" y=\"64\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#2563EB\"/><rect x=\"92\" y=\"76\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#FFFFFF\"/><rect x=\"92\" y=\"88\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"98\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"108\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><polygon points=\"98,34 76,78 92,78 82,112 114,64 96,64\" fill=\"#059669\" stroke=\"#FFFFFF\" stroke-width=\"2.2\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"32\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#FFFFFF\"/><rect x=\"44\" y=\"44\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#0F172A\"/><rect x=\"44\" y=\"56\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#2563EB\"/><rect x=\"44\" y=\"66\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#2563EB\"/><rect x=\"44\" y=\"76\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#2563EB\"/><rect x=\"84\" y=\"64\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#2563EB\"/><rect x=\"92\" y=\"76\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#FFFFFF\"/><rect x=\"92\" y=\"88\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"98\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"108\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><polygon points=\"98,34 76,78 92,78 82,112 114,64 96,64\" fill=\"#059669\" stroke=\"#FFFFFF\" stroke-width=\"2.2\"/></g>"},
    "facturaflow": {"id": 24, "name": "FacturaFlow", "slug": "facturaflow", "tagline": "FACTURACI\u00d3N ELECTR\u00d3NICA, COBRANZA AUTOMATIZADA CON IA & ERP CLOUD", "category": "Productos Digitales / Software SaaS & Fintech", "giro": "Plataforma de software como servicio (SaaS) en la nube para emisi\u00f3n masiva de CFDI 4.0, conciliaci\u00f3n bancaria autom\u00e1tica con inteligencia artificial y gesti\u00f3n de cobranza preventiva.", "buyer": "Directores de finanzas, contadores, directores de operaciones y empresas en crecimiento que pierden d\u00edas enteros conciliando facturas manualmente y sufren por cobranza tard\u00eda.", "why": "Porque el tiempo de los equipos financieros no debe consumirse en tareas burocr\u00e1ticas repetitivas, sino en analizar n\u00fameros para hacer crecer el negocio.", "how": "Conectamos API directa con los principales bancos y el SAT, procesamos comprobantes con OCR inteligente y enviamos recordatorios de pago automatizados y amables.", "what": "Emisi\u00f3n ilimitada de facturas electr\u00f3nicas, complementos de pago autom\u00e1ticos, portal de autoservicio para clientes y reportes de flujo de caja en tiempo real.", "persona": "Ingeniero de producto y l\u00edder fintech: obsesionado con la velocidad de carga de la app, la claridad visual de las tablas y la precisi\u00f3n en cada centavo.", "niza": "Clase 9 (Software descargable y aplicaciones web para facturaci\u00f3n y contabilidad) y Clase 35 (Servicios de facturaci\u00f3n electr\u00f3nica y gesti\u00f3n contable).", "tpBefore": ["Prueba gratuita de 14 d\u00edas con acceso total sin necesidad de ingresar tarjeta de cr\u00e9dito", "Calculadora web de horas ahorradas y reducci\u00f3n de cartera vencida con FacturaFlow", "Migraci\u00f3n autom\u00e1tica de cat\u00e1logos de clientes y productos desde el software anterior en 1 clic", "Webinars semanales de actualizaci\u00f3n sobre cambios en las reglas de la miscel\u00e1nea fiscal"], "tpDuring": ["Emisi\u00f3n de una factura completa en menos de 18 segundos con env\u00edo autom\u00e1tico por correo y WhatsApp", "Bot\u00f3n de pago directo en la factura digital para que los clientes paguen con transferencia o tarjeta", "Soporte t\u00e9cnico por chat en vivo con especialistas contables que responden en menos de 90 segundos", "Respaldo autom\u00e1tico de todos los XML y PDF en servidores con cifrado bancario de 256 bits"], "tpAfter": ["Reporte mensual de cobranza con desglose de facturas pagadas, pendientes y proyecci\u00f3n de flujo", "Alertas autom\u00e1ticas ante facturas canceladas indebidamente por proveedores o clientes", "Integraci\u00f3n nativa con sistemas ERP corporativos (SAP, Oracle, Zoho Books) mediante Webhooks", "Reuni\u00f3n de \u00e9xito del cliente trimestral para optimizar flujos de trabajo contables y reducir fricciones"], "colors": {"pri": "#0F172A", "sec": "#2563EB", "acc": "#059669", "darkInk": "#020617", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 296 C", "pantoneSec": "Pantone 2728 C", "cmykPri": "C:85 M:70 Y:45 K:60", "cmykSec": "C:85 M:55 Y:0 K:0"}, "primaryFont": "Plus Jakarta Sans", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"32\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#0F172A\"/><rect x=\"44\" y=\"44\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#E2E8F0\"/><rect x=\"44\" y=\"56\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#64748B\"/><rect x=\"44\" y=\"66\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#64748B\"/><rect x=\"44\" y=\"76\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#64748B\"/><rect x=\"84\" y=\"64\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#2563EB\"/><rect x=\"92\" y=\"76\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#FFFFFF\"/><rect x=\"92\" y=\"88\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"98\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"108\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><polygon points=\"98,34 76,78 92,78 82,112 114,64 96,64\" fill=\"#059669\" stroke=\"#FFFFFF\" stroke-width=\"2.2\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><rect x=\"36\" y=\"32\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#FFFFFF\"/><rect x=\"44\" y=\"44\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#0F172A\"/><rect x=\"44\" y=\"56\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#2563EB\"/><rect x=\"44\" y=\"66\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#2563EB\"/><rect x=\"44\" y=\"76\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#2563EB\"/><rect x=\"84\" y=\"64\" width=\"60\" height=\"84\" rx=\"6\" fill=\"#2563EB\"/><rect x=\"92\" y=\"76\" width=\"44\" height=\"6\" rx=\"2\" fill=\"#FFFFFF\"/><rect x=\"92\" y=\"88\" width=\"36\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"98\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><rect x=\"92\" y=\"108\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#BFDBFE\"/><polygon points=\"98,34 76,78 92,78 82,112 114,64 96,64\" fill=\"#059669\" stroke=\"#FFFFFF\" stroke-width=\"2.2\"/></g>"},
    "aquapure_dry": {"id": 25, "name": "AquaPure Dry", "slug": "aquapure_dry", "tagline": "TINTORER\u00cdA ECOL\u00d3GICA, CUIDADO TEXTIL CON OZONO & CERO EMISIONES", "category": "Servicios / Tintorer\u00eda & Lavander\u00eda Ecol\u00f3gica", "giro": "Tintorer\u00eda y lavander\u00eda sustentable que sustituye los qu\u00edmicos t\u00f3xicos tradicionales (percloroetileno) por tecnolog\u00eda Wet Cleaning de lavado en agua con ozono y detergentes biodegradables.", "buyer": "Familias conscientes, profesionistas con trajes finos y amantes de las prendas delicadas que buscan ropa impecable, suave al tacto y sin olores qu\u00edmicos da\u00f1inos.", "why": "Porque cuidar tus prendas no tiene por qu\u00e9 contaminar los r\u00edos ni exponer tu piel a sustancias qu\u00edmicas cancer\u00edgenas.", "how": "Utilizamos microburbujas de ozono que desinfectan en fr\u00edo, agua suavizada y planchas de vapor vertical que protegen la fibra natural de lanas y sedas.", "what": "Lavado ecol\u00f3gico de trajes, vestidos de noche, abrigos de lana, edredones de pluma, tenis de lujo y servicio de entrega a domicilio en veh\u00edculos el\u00e9ctricos.", "persona": "Especialista textil y maestro tintorero: inspecciona cada mancha bajo luz blanca, identifica la fibra al tacto y trata cada prenda con el cuidado de una reliquia.", "niza": "Clase 37 (Servicios de tintorer\u00eda, limpieza de ropa, planchado y cuidado de prendas textiles).", "tpBefore": ["App m\u00f3vil para programar recolecci\u00f3n a domicilio con chofer en horario exacto de 30 minutos", "Gu\u00eda de etiquetado textil en web para saber si tus prendas son aptas para Wet Cleaning", "Bolsa de recolecci\u00f3n textil reutilizable de lona impermeable entregada en el primer pedido", "Locales luminosos con ventanales limpios, aroma a brisa fresca y plantas purificadoras"], "tpDuring": ["Inspecci\u00f3n minuciosa con reporte fotogr\u00e1fico en la app de botones flojos o manchas preexistentes", "Proceso de lavado con agua recirculada y ozono que ahorra 70% de agua comparado con m\u00e9todos tradicionales", "Planchado a mano con fundas protectoras en suela de tefl\u00f3n para evitar brillos en telas oscuras", "Empaque en fundas biodegradables de almid\u00f3n de ma\u00edz o bolsas de tela del propio cliente"], "tpAfter": ["Prendas entregadas con aroma a frescura natural sin ning\u00fan residuo qu\u00edmico ni olor a solvente", "Ganchos de madera reciclada que se pueden devolver en el siguiente pedido para cr\u00e9dito en monedero", "Historial de ahorro de agua y qu\u00edmicos t\u00f3xicos acumulado en el perfil de usuario de la app", "Garant\u00eda de satisfacci\u00f3n: si una mancha no cede en el primer intento, se re-trata sin costo adicional"], "colors": {"pri": "#0284C7", "sec": "#0EA5E9", "acc": "#10B981", "darkInk": "#082F49", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F0FDF4", "white": "#FFFFFF", "pantonePri": "Pantone 300 C", "pantoneSec": "Pantone 299 C", "cmykPri": "C:80 M:30 Y:0 K:0", "cmykSec": "C:65 M:15 Y:0 K:0"}, "primaryFont": "Outfit", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F0FDF4\" stroke=\"#0284C7\" stroke-width=\"1.8\"/><path d=\"M 90 28 C 90 28, 48 86, 48 116 C 48 140, 68 156, 90 156 C 112 156, 132 140, 132 116 C 132 86, 90 28, 90 28 Z\" fill=\"#0284C7\"/><path d=\"M 90 38 C 90 38, 56 90, 56 116 C 56 134, 72 148, 90 148 C 108 148, 124 134, 124 116 C 124 90, 90 38, 90 38 Z\" fill=\"#0EA5E9\"/><path d=\"M 72 108 C 72 90, 84 80, 96 84 C 98 94, 90 106, 72 108 Z\" fill=\"#10B981\"/><line x1=\"74\" y1=\"106\" x2=\"94\" y2=\"86\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"106\" cy=\"118\" r=\"8\" fill=\"#FFFFFF\" opacity=\"0.65\"/><circle cx=\"114\" cy=\"106\" r=\"4\" fill=\"#FFFFFF\" opacity=\"0.55\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#0EA5E9\" stroke-width=\"1.8\"/><path d=\"M 90 28 C 90 28, 48 86, 48 116 C 48 140, 68 156, 90 156 C 112 156, 132 140, 132 116 C 132 86, 90 28, 90 28 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 38 C 90 38, 56 90, 56 116 C 56 134, 72 148, 90 148 C 108 148, 124 134, 124 116 C 124 90, 90 38, 90 38 Z\" fill=\"#0EA5E9\"/><path d=\"M 72 108 C 72 90, 84 80, 96 84 C 98 94, 90 106, 72 108 Z\" fill=\"#10B981\"/><line x1=\"74\" y1=\"106\" x2=\"94\" y2=\"86\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"106\" cy=\"118\" r=\"8\" fill=\"#082F49\" opacity=\"0.45\"/><circle cx=\"114\" cy=\"106\" r=\"4\" fill=\"#082F49\" opacity=\"0.45\"/></g>"},
    "aquapure_dry": {"id": 25, "name": "AquaPure Dry", "slug": "aquapure_dry", "tagline": "TINTORER\u00cdA ECOL\u00d3GICA, CUIDADO TEXTIL CON OZONO & CERO EMISIONES", "category": "Servicios / Tintorer\u00eda & Lavander\u00eda Ecol\u00f3gica", "giro": "Tintorer\u00eda y lavander\u00eda sustentable que sustituye los qu\u00edmicos t\u00f3xicos tradicionales (percloroetileno) por tecnolog\u00eda Wet Cleaning de lavado en agua con ozono y detergentes biodegradables.", "buyer": "Familias conscientes, profesionistas con trajes finos y amantes de las prendas delicadas que buscan ropa impecable, suave al tacto y sin olores qu\u00edmicos da\u00f1inos.", "why": "Porque cuidar tus prendas no tiene por qu\u00e9 contaminar los r\u00edos ni exponer tu piel a sustancias qu\u00edmicas cancer\u00edgenas.", "how": "Utilizamos microburbujas de ozono que desinfectan en fr\u00edo, agua suavizada y planchas de vapor vertical que protegen la fibra natural de lanas y sedas.", "what": "Lavado ecol\u00f3gico de trajes, vestidos de noche, abrigos de lana, edredones de pluma, tenis de lujo y servicio de entrega a domicilio en veh\u00edculos el\u00e9ctricos.", "persona": "Especialista textil y maestro tintorero: inspecciona cada mancha bajo luz blanca, identifica la fibra al tacto y trata cada prenda con el cuidado de una reliquia.", "niza": "Clase 37 (Servicios de tintorer\u00eda, limpieza de ropa, planchado y cuidado de prendas textiles).", "tpBefore": ["App m\u00f3vil para programar recolecci\u00f3n a domicilio con chofer en horario exacto de 30 minutos", "Gu\u00eda de etiquetado textil en web para saber si tus prendas son aptas para Wet Cleaning", "Bolsa de recolecci\u00f3n textil reutilizable de lona impermeable entregada en el primer pedido", "Locales luminosos con ventanales limpios, aroma a brisa fresca y plantas purificadoras"], "tpDuring": ["Inspecci\u00f3n minuciosa con reporte fotogr\u00e1fico en la app de botones flojos o manchas preexistentes", "Proceso de lavado con agua recirculada y ozono que ahorra 70% de agua comparado con m\u00e9todos tradicionales", "Planchado a mano con fundas protectoras en suela de tefl\u00f3n para evitar brillos en telas oscuras", "Empaque en fundas biodegradables de almid\u00f3n de ma\u00edz o bolsas de tela del propio cliente"], "tpAfter": ["Prendas entregadas con aroma a frescura natural sin ning\u00fan residuo qu\u00edmico ni olor a solvente", "Ganchos de madera reciclada que se pueden devolver en el siguiente pedido para cr\u00e9dito en monedero", "Historial de ahorro de agua y qu\u00edmicos t\u00f3xicos acumulado en el perfil de usuario de la app", "Garant\u00eda de satisfacci\u00f3n: si una mancha no cede en el primer intento, se re-trata sin costo adicional"], "colors": {"pri": "#0284C7", "sec": "#0EA5E9", "acc": "#10B981", "darkInk": "#082F49", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F0FDF4", "white": "#FFFFFF", "pantonePri": "Pantone 300 C", "pantoneSec": "Pantone 299 C", "cmykPri": "C:80 M:30 Y:0 K:0", "cmykSec": "C:65 M:15 Y:0 K:0"}, "primaryFont": "Outfit", "secondaryFont": "Inter", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F0FDF4\" stroke=\"#0284C7\" stroke-width=\"1.8\"/><path d=\"M 90 28 C 90 28, 48 86, 48 116 C 48 140, 68 156, 90 156 C 112 156, 132 140, 132 116 C 132 86, 90 28, 90 28 Z\" fill=\"#0284C7\"/><path d=\"M 90 38 C 90 38, 56 90, 56 116 C 56 134, 72 148, 90 148 C 108 148, 124 134, 124 116 C 124 90, 90 38, 90 38 Z\" fill=\"#0EA5E9\"/><path d=\"M 72 108 C 72 90, 84 80, 96 84 C 98 94, 90 106, 72 108 Z\" fill=\"#10B981\"/><line x1=\"74\" y1=\"106\" x2=\"94\" y2=\"86\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"106\" cy=\"118\" r=\"8\" fill=\"#FFFFFF\" opacity=\"0.65\"/><circle cx=\"114\" cy=\"106\" r=\"4\" fill=\"#FFFFFF\" opacity=\"0.55\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#0EA5E9\" stroke-width=\"1.8\"/><path d=\"M 90 28 C 90 28, 48 86, 48 116 C 48 140, 68 156, 90 156 C 112 156, 132 140, 132 116 C 132 86, 90 28, 90 28 Z\" fill=\"#FFFFFF\"/><path d=\"M 90 38 C 90 38, 56 90, 56 116 C 56 134, 72 148, 90 148 C 108 148, 124 134, 124 116 C 124 90, 90 38, 90 38 Z\" fill=\"#0EA5E9\"/><path d=\"M 72 108 C 72 90, 84 80, 96 84 C 98 94, 90 106, 72 108 Z\" fill=\"#10B981\"/><line x1=\"74\" y1=\"106\" x2=\"94\" y2=\"86\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><circle cx=\"106\" cy=\"118\" r=\"8\" fill=\"#082F49\" opacity=\"0.45\"/><circle cx=\"114\" cy=\"106\" r=\"4\" fill=\"#082F49\" opacity=\"0.45\"/></g>"},
    "cumbre_austral": {"id": 26, "name": "Cumbre Austral", "slug": "cumbre_austral", "tagline": "GU\u00cdAS DE ALTA MONTA\u00d1A, EXPEDICIONES ANDINAS & RESCATE ALPINO", "category": "Servicios / Ecoturismo & Monta\u00f1ismo", "giro": "Compa\u00f1\u00eda de gu\u00edas profesionales de monta\u00f1a certificados UIAGM/IFMGA especializada en expediciones de alta dificultad a volcanes y cumbres de Am\u00e9rica del Sur, escalada en hielo y traves\u00edas glaciares.", "buyer": "Monta\u00f1istas, escaladores y amantes de la aventura extrema que buscan alcanzar cimas desafiantes con la m\u00e1xima seguridad t\u00e9cnica y respeto irrestricto por la monta\u00f1a.", "why": "Porque en las cumbres m\u00e1s altas de la cordillera el ser humano comprende su peque\u00f1ez ante la inmensidad y descubre su verdadera fortaleza interior.", "how": "Mantenemos ratio estricto de 1 gu\u00eda por cada 2 clientes, equipo de telecomunicaciones satelitales Iridium y protocolos m\u00e9dicos de mal agudo de monta\u00f1a (MAM).", "what": "Expediciones guiadas al Aconcagua, Orizaba, Alpamayo y Huascar\u00e1n, cursos de rescate en grietas glaciares y programas de aclimataci\u00f3n progresiva.", "persona": "Gu\u00eda alpino de alta monta\u00f1a: sereno ante la ventisca, con pasos firmes sobre el glaciar, respeto sagrado por el clima y compromiso absoluto de regresar a todos con vida.", "niza": "Clase 39 (Organizaci\u00f3n de viajes de expedici\u00f3n, servicios de gu\u00edas de monta\u00f1a y transporte alpino) y Clase 41 (Instrucci\u00f3n en monta\u00f1ismo y escalada).", "tpBefore": ["Test m\u00e9dico y f\u00edsico previo obligatorio revisado por el m\u00e9dico especialista en medicina de altitud", "Sesi\u00f3n de revisi\u00f3n de equipo t\u00e9cnico por videollamada para verificar crampones, piolet y botas dobles", "Manual de entrenamiento f\u00edsico de 16 semanas dise\u00f1ado espec\u00edficamente para la cumbre objetivo", "P\u00f3liza de rescate a\u00e9reo en helic\u00f3ptero y repatriaci\u00f3n m\u00e9dica incluida en todas las expediciones"], "tpDuring": ["Campamento base con domos geod\u00e9sicos calefaccionados, comida caliente reconfortante y ox\u00edmetro diario", "Monitoreo meteorol\u00f3gico satelital actualizado dos veces al d\u00eda antes del ataque a la cumbre", "Cuerdas de seguridad din\u00e1micas homologadas UIAA y anclajes en nieve y roca certificados", "Celebraci\u00f3n en la cima con foto conmemorativa y tiempo suficiente para contemplar el amanecer andino"], "tpAfter": ["Certificado Oficial de Cumbre firmado por el gu\u00eda l\u00edder y la asociaci\u00f3n nacional de monta\u00f1ismo", "Enlace a galer\u00eda fotogr\u00e1fica y de video en 4K capturada con c\u00e1maras de acci\u00f3n durante la expedici\u00f3n", "Cena de cierre en la ciudad con entrega de medalla de cumbre forjada en peltre conmemorativo", "Cr\u00e9dito del 15% para la siguiente expedici\u00f3n a cumbres internacionales del circuito de las 7 Cimas"], "colors": {"pri": "#1E293B", "sec": "#334155", "acc": "#0EA5E9", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 431 C", "cmykPri": "C:70 M:55 Y:40 K:45", "cmykSec": "C:60 M:45 Y:35 K:35"}, "primaryFont": "Montserrat", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"90,26 148,136 32,136\" fill=\"#1E293B\"/><polygon points=\"90,26 112,68 90,60 74,74 68,68\" fill=\"#F8FAFC\"/><polygon points=\"128,68 168,136 114,136\" fill=\"#334155\"/><polygon points=\"128,68 142,94 132,90 120,96\" fill=\"#F8FAFC\"/><polygon points=\"52,68 12,136 66,136\" fill=\"#334155\"/><polygon points=\"52,68 62,94 52,90 40,96\" fill=\"#F8FAFC\"/><line x1=\"20\" y1=\"146\" x2=\"160\" y2=\"146\" stroke=\"#0EA5E9\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"90\" y1=\"60\" x2=\"90\" y2=\"136\" stroke=\"#334155\" stroke-width=\"1.8\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"90,26 148,136 32,136\" fill=\"#FFFFFF\"/><polygon points=\"90,26 112,68 90,60 74,74 68,68\" fill=\"#0EA5E9\"/><polygon points=\"128,68 168,136 114,136\" fill=\"#E2E8F0\"/><polygon points=\"128,68 142,94 132,90 120,96\" fill=\"#0EA5E9\"/><polygon points=\"52,68 12,136 66,136\" fill=\"#E2E8F0\"/><polygon points=\"52,68 62,94 52,90 40,96\" fill=\"#0EA5E9\"/><line x1=\"20\" y1=\"146\" x2=\"160\" y2=\"146\" stroke=\"#0EA5E9\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"90\" y1=\"60\" x2=\"90\" y2=\"136\" stroke=\"#0F172A\" stroke-width=\"1.8\"/></g>"},
    "cumbre_austral": {"id": 26, "name": "Cumbre Austral", "slug": "cumbre_austral", "tagline": "GU\u00cdAS DE ALTA MONTA\u00d1A, EXPEDICIONES ANDINAS & RESCATE ALPINO", "category": "Servicios / Ecoturismo & Monta\u00f1ismo", "giro": "Compa\u00f1\u00eda de gu\u00edas profesionales de monta\u00f1a certificados UIAGM/IFMGA especializada en expediciones de alta dificultad a volcanes y cumbres de Am\u00e9rica del Sur, escalada en hielo y traves\u00edas glaciares.", "buyer": "Monta\u00f1istas, escaladores y amantes de la aventura extrema que buscan alcanzar cimas desafiantes con la m\u00e1xima seguridad t\u00e9cnica y respeto irrestricto por la monta\u00f1a.", "why": "Porque en las cumbres m\u00e1s altas de la cordillera el ser humano comprende su peque\u00f1ez ante la inmensidad y descubre su verdadera fortaleza interior.", "how": "Mantenemos ratio estricto de 1 gu\u00eda por cada 2 clientes, equipo de telecomunicaciones satelitales Iridium y protocolos m\u00e9dicos de mal agudo de monta\u00f1a (MAM).", "what": "Expediciones guiadas al Aconcagua, Orizaba, Alpamayo y Huascar\u00e1n, cursos de rescate en grietas glaciares y programas de aclimataci\u00f3n progresiva.", "persona": "Gu\u00eda alpino de alta monta\u00f1a: sereno ante la ventisca, con pasos firmes sobre el glaciar, respeto sagrado por el clima y compromiso absoluto de regresar a todos con vida.", "niza": "Clase 39 (Organizaci\u00f3n de viajes de expedici\u00f3n, servicios de gu\u00edas de monta\u00f1a y transporte alpino) y Clase 41 (Instrucci\u00f3n en monta\u00f1ismo y escalada).", "tpBefore": ["Test m\u00e9dico y f\u00edsico previo obligatorio revisado por el m\u00e9dico especialista en medicina de altitud", "Sesi\u00f3n de revisi\u00f3n de equipo t\u00e9cnico por videollamada para verificar crampones, piolet y botas dobles", "Manual de entrenamiento f\u00edsico de 16 semanas dise\u00f1ado espec\u00edficamente para la cumbre objetivo", "P\u00f3liza de rescate a\u00e9reo en helic\u00f3ptero y repatriaci\u00f3n m\u00e9dica incluida en todas las expediciones"], "tpDuring": ["Campamento base con domos geod\u00e9sicos calefaccionados, comida caliente reconfortante y ox\u00edmetro diario", "Monitoreo meteorol\u00f3gico satelital actualizado dos veces al d\u00eda antes del ataque a la cumbre", "Cuerdas de seguridad din\u00e1micas homologadas UIAA y anclajes en nieve y roca certificados", "Celebraci\u00f3n en la cima con foto conmemorativa y tiempo suficiente para contemplar el amanecer andino"], "tpAfter": ["Certificado Oficial de Cumbre firmado por el gu\u00eda l\u00edder y la asociaci\u00f3n nacional de monta\u00f1ismo", "Enlace a galer\u00eda fotogr\u00e1fica y de video en 4K capturada con c\u00e1maras de acci\u00f3n durante la expedici\u00f3n", "Cena de cierre en la ciudad con entrega de medalla de cumbre forjada en peltre conmemorativo", "Cr\u00e9dito del 15% para la siguiente expedici\u00f3n a cumbres internacionales del circuito de las 7 Cimas"], "colors": {"pri": "#1E293B", "sec": "#334155", "acc": "#0EA5E9", "darkInk": "#0F172A", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 432 C", "pantoneSec": "Pantone 431 C", "cmykPri": "C:70 M:55 Y:40 K:45", "cmykSec": "C:60 M:45 Y:35 K:35"}, "primaryFont": "Montserrat", "secondaryFont": "Inter", "isEstablished": true, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"90,26 148,136 32,136\" fill=\"#1E293B\"/><polygon points=\"90,26 112,68 90,60 74,74 68,68\" fill=\"#F8FAFC\"/><polygon points=\"128,68 168,136 114,136\" fill=\"#334155\"/><polygon points=\"128,68 142,94 132,90 120,96\" fill=\"#F8FAFC\"/><polygon points=\"52,68 12,136 66,136\" fill=\"#334155\"/><polygon points=\"52,68 62,94 52,90 40,96\" fill=\"#F8FAFC\"/><line x1=\"20\" y1=\"146\" x2=\"160\" y2=\"146\" stroke=\"#0EA5E9\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"90\" y1=\"60\" x2=\"90\" y2=\"136\" stroke=\"#334155\" stroke-width=\"1.8\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"90,26 148,136 32,136\" fill=\"#FFFFFF\"/><polygon points=\"90,26 112,68 90,60 74,74 68,68\" fill=\"#0EA5E9\"/><polygon points=\"128,68 168,136 114,136\" fill=\"#E2E8F0\"/><polygon points=\"128,68 142,94 132,90 120,96\" fill=\"#0EA5E9\"/><polygon points=\"52,68 12,136 66,136\" fill=\"#E2E8F0\"/><polygon points=\"52,68 62,94 52,90 40,96\" fill=\"#0EA5E9\"/><line x1=\"20\" y1=\"146\" x2=\"160\" y2=\"146\" stroke=\"#0EA5E9\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"90\" y1=\"60\" x2=\"90\" y2=\"136\" stroke=\"#0F172A\" stroke-width=\"1.8\"/></g>"},
    "orbita_films": {"id": 27, "name": "\u00d3rbita Films", "slug": "orbita_films", "tagline": "CASA PRODUCTORA DE CINE, DOCUMENTAL & EFECTOS VISUALES VFX", "category": "Servicios / Producci\u00f3n Audiovisual & Cine", "giro": "Casa productora cinematogr\u00e1fica y estudio de post-producci\u00f3n especializado en largometrajes de ficci\u00f3n, documentales de impacto social, comerciales de televisi\u00f3n y efectos visuales VFX.", "buyer": "Directores de cine, plataformas de streaming (Netflix, Prime), agencias de publicidad y marcas que buscan narrativa visual conmovedora y est\u00e9tica cinematogr\u00e1fica impecable.", "why": "Porque una historia contada con luz, encuadre y sonido aut\u00e9nticos tiene el poder de conmover al espectador y cambiar su percepci\u00f3n del mundo.", "how": "Rodamos con c\u00e1maras de cine digital ARRI Alexa y lentes anam\u00f3rficos vintage, operamos salas de etalonaje DaVinci Resolve y cuidamos el dise\u00f1o sonoro en surround.", "what": "Producci\u00f3n integral de pel\u00edculas y series, correcci\u00f3n de color HDR en monitores de masterizaci\u00f3n Flanders Scientific, animaci\u00f3n 3D y dise\u00f1o de producci\u00f3n de arte.", "persona": "Director de fotograf\u00eda y cineasta: mira la realidad en proporciones de 2.39:1, encuentra la poes\u00eda en las sombras y no se detiene hasta lograr la toma perfecta.", "niza": "Clase 41 (Producci\u00f3n de pel\u00edculas, producci\u00f3n de videos, servicios de post-producci\u00f3n cinematogr\u00e1fica y montaje audiovisual).", "tpBefore": ["Reel cinematogr\u00e1fico en 4K en Vimeo con contrase\u00f1a privada mostrando escenas de alto impacto", "Desglose de gui\u00f3n y propuesta visual en 'lookbook' editorial con referencias de arte e iluminaci\u00f3n", "Scouting de locaciones con fotograf\u00eda a\u00e9rea y estudio de posici\u00f3n solar por hora del d\u00eda", "Plan de rodaje y presupuesto transparente dividido seg\u00fan lineamientos de sindicatos cinematogr\u00e1ficos"], "tpDuring": ["Set de filmaci\u00f3n ordenado y profesional con monitores inal\u00e1mbricos de alta resoluci\u00f3n para clientes", "Catering gourmet saludable para el equipo t\u00e9cnico y actores durante las jornadas de llamado", "Respaldo digital seguro en set con checksum triple en discos duros SSD de alta velocidad", "Ambiente de trabajo respetuoso y enfocado en la creatividad y la visi\u00f3n del director"], "tpAfter": ["Sesiones de correcci\u00f3n de color conjuntas en sala oscura de proyecci\u00f3n cinematogr\u00e1fica calibrada", "Entrega del master digital en formato DCP para salas de cine y ProRes 4444 XQ para streaming", "Trailer promocional y paquete de p\u00f3sters oficiales en alta resoluci\u00f3n listos para festivales", "Celebraci\u00f3n de premier privada con alfombra roja para el equipo y patrocinadores del proyecto"], "colors": {"pri": "#0A0A0A", "sec": "#18181B", "acc": "#F59E0B", "darkInk": "#000000", "midGray": "#71717A", "lightGray": "#E4E4E7", "softBg": "#FAFAFA", "white": "#FFFFFF", "pantonePri": "Pantone Black 6 C", "pantoneSec": "Pantone Black 7 C", "cmykPri": "C:60 M:50 Y:40 K:100", "cmykSec": "C:50 M:40 Y:30 K:95"}, "primaryFont": "Syne", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#0A0A0A\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"30\" fill=\"#18181B\"/><path d=\"M 68 68 L 112 68 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 112 68 L 112 112 L 90 90 Z\" fill=\"#DC2626\"/><path d=\"M 112 112 L 68 112 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 68 112 L 68 68 L 90 90 Z\" fill=\"#DC2626\"/><circle cx=\"90\" cy=\"90\" r=\"10\" fill=\"#0A0A0A\"/><circle cx=\"90\" cy=\"90\" r=\"4\" fill=\"#FFFFFF\"/><circle cx=\"146\" cy=\"54\" r=\"5\" fill=\"#F59E0B\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"30\" fill=\"#E4E4E7\"/><path d=\"M 68 68 L 112 68 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 112 68 L 112 112 L 90 90 Z\" fill=\"#DC2626\"/><path d=\"M 112 112 L 68 112 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 68 112 L 68 68 L 90 90 Z\" fill=\"#DC2626\"/><circle cx=\"90\" cy=\"90\" r=\"10\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"4\" fill=\"#0A0A0A\"/><circle cx=\"146\" cy=\"54\" r=\"5\" fill=\"#F59E0B\"/></g>"},
    "órbita_films": {"id": 27, "name": "\u00d3rbita Films", "slug": "orbita_films", "tagline": "CASA PRODUCTORA DE CINE, DOCUMENTAL & EFECTOS VISUALES VFX", "category": "Servicios / Producci\u00f3n Audiovisual & Cine", "giro": "Casa productora cinematogr\u00e1fica y estudio de post-producci\u00f3n especializado en largometrajes de ficci\u00f3n, documentales de impacto social, comerciales de televisi\u00f3n y efectos visuales VFX.", "buyer": "Directores de cine, plataformas de streaming (Netflix, Prime), agencias de publicidad y marcas que buscan narrativa visual conmovedora y est\u00e9tica cinematogr\u00e1fica impecable.", "why": "Porque una historia contada con luz, encuadre y sonido aut\u00e9nticos tiene el poder de conmover al espectador y cambiar su percepci\u00f3n del mundo.", "how": "Rodamos con c\u00e1maras de cine digital ARRI Alexa y lentes anam\u00f3rficos vintage, operamos salas de etalonaje DaVinci Resolve y cuidamos el dise\u00f1o sonoro en surround.", "what": "Producci\u00f3n integral de pel\u00edculas y series, correcci\u00f3n de color HDR en monitores de masterizaci\u00f3n Flanders Scientific, animaci\u00f3n 3D y dise\u00f1o de producci\u00f3n de arte.", "persona": "Director de fotograf\u00eda y cineasta: mira la realidad en proporciones de 2.39:1, encuentra la poes\u00eda en las sombras y no se detiene hasta lograr la toma perfecta.", "niza": "Clase 41 (Producci\u00f3n de pel\u00edculas, producci\u00f3n de videos, servicios de post-producci\u00f3n cinematogr\u00e1fica y montaje audiovisual).", "tpBefore": ["Reel cinematogr\u00e1fico en 4K en Vimeo con contrase\u00f1a privada mostrando escenas de alto impacto", "Desglose de gui\u00f3n y propuesta visual en 'lookbook' editorial con referencias de arte e iluminaci\u00f3n", "Scouting de locaciones con fotograf\u00eda a\u00e9rea y estudio de posici\u00f3n solar por hora del d\u00eda", "Plan de rodaje y presupuesto transparente dividido seg\u00fan lineamientos de sindicatos cinematogr\u00e1ficos"], "tpDuring": ["Set de filmaci\u00f3n ordenado y profesional con monitores inal\u00e1mbricos de alta resoluci\u00f3n para clientes", "Catering gourmet saludable para el equipo t\u00e9cnico y actores durante las jornadas de llamado", "Respaldo digital seguro en set con checksum triple en discos duros SSD de alta velocidad", "Ambiente de trabajo respetuoso y enfocado en la creatividad y la visi\u00f3n del director"], "tpAfter": ["Sesiones de correcci\u00f3n de color conjuntas en sala oscura de proyecci\u00f3n cinematogr\u00e1fica calibrada", "Entrega del master digital en formato DCP para salas de cine y ProRes 4444 XQ para streaming", "Trailer promocional y paquete de p\u00f3sters oficiales en alta resoluci\u00f3n listos para festivales", "Celebraci\u00f3n de premier privada con alfombra roja para el equipo y patrocinadores del proyecto"], "colors": {"pri": "#0A0A0A", "sec": "#18181B", "acc": "#F59E0B", "darkInk": "#000000", "midGray": "#71717A", "lightGray": "#E4E4E7", "softBg": "#FAFAFA", "white": "#FFFFFF", "pantonePri": "Pantone Black 6 C", "pantoneSec": "Pantone Black 7 C", "cmykPri": "C:60 M:50 Y:40 K:100", "cmykSec": "C:50 M:40 Y:30 K:95"}, "primaryFont": "Syne", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#0A0A0A\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"30\" fill=\"#18181B\"/><path d=\"M 68 68 L 112 68 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 112 68 L 112 112 L 90 90 Z\" fill=\"#DC2626\"/><path d=\"M 112 112 L 68 112 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 68 112 L 68 68 L 90 90 Z\" fill=\"#DC2626\"/><circle cx=\"90\" cy=\"90\" r=\"10\" fill=\"#0A0A0A\"/><circle cx=\"90\" cy=\"90\" r=\"4\" fill=\"#FFFFFF\"/><circle cx=\"146\" cy=\"54\" r=\"5\" fill=\"#F59E0B\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"62\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"30\" fill=\"#E4E4E7\"/><path d=\"M 68 68 L 112 68 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 112 68 L 112 112 L 90 90 Z\" fill=\"#DC2626\"/><path d=\"M 112 112 L 68 112 L 90 90 Z\" fill=\"#F59E0B\"/><path d=\"M 68 112 L 68 68 L 90 90 Z\" fill=\"#DC2626\"/><circle cx=\"90\" cy=\"90\" r=\"10\" fill=\"#FFFFFF\"/><circle cx=\"90\" cy=\"90\" r=\"4\" fill=\"#0A0A0A\"/><circle cx=\"146\" cy=\"54\" r=\"5\" fill=\"#F59E0B\"/></g>"},
    "helios_solar": {"id": 28, "name": "Helios Solar", "slug": "helios_solar", "tagline": "PARQUES FOTOVOLTAICOS, ENERG\u00cdA LIMPIA & ALMACENAMIENTO INDUSTRIAL BESS", "category": "Materiales & Servicios / Energ\u00eda Solar Fotovoltaica", "giro": "Empresa de ingenier\u00eda EPC especializada en dise\u00f1o, instalaci\u00f3n y mantenimiento de centrales solares fotovoltaicas sobre cubierta y a gran escala, y sistemas de almacenamiento con bater\u00edas BESS.", "buyer": "Parques industriales, centros comerciales, maquiladoras y empresas con altos consumos el\u00e9ctricos que buscan reducir dr\u00e1sticamente su factura de luz y cumplir metas ESG.", "why": "Porque aprovechar la radiaci\u00f3n inagotable del sol es el camino m\u00e1s inteligente, rentable y patri\u00f3tico para lograr la independencia energ\u00e9tica y frenar el cambio clim\u00e1tico.", "how": "Instalamos paneles solares monocristalinos Tier-1 de alta eficiencia, inversores inteligentes con telemetr\u00eda en tiempo real y estructuras de aluminio anodizado resistentes a huracanes.", "what": "Sistemas fotovoltaicos interconectados a red (PPA), bater\u00edas de litio industriales para respaldo de energ\u00eda, auditor\u00edas de calidad de energ\u00eda y gesti\u00f3n de contratos ante la CFE.", "persona": "Ingeniero en energ\u00edas renovables: riguroso con los c\u00e1lculos de radiaci\u00f3n y sombras, obsesionado con la seguridad el\u00e9ctrica y comprometido con la descarbonizaci\u00f3n del pa\u00eds.", "niza": "Clase 37 (Instalaci\u00f3n, mantenimiento y reparaci\u00f3n de paneles solares fotovoltaicos) y Clase 40 (Generaci\u00f3n de energ\u00eda solar y renovable).", "tpBefore": ["Estudio preliminar gratuito de viabilidad solar y retorno de inversi\u00f3n (ROI) analizando los \u00faltimos 12 recibos de CFE", "Modelado 3D del techo de la nave industrial con simulaci\u00f3n de irradiaci\u00f3n solar en software Helioscope", "Opciones de financiamiento verde y contratos de compra de energ\u00eda (PPA) con cero inversi\u00f3n inicial", "Visita t\u00e9cnica a proyectos industriales en operaci\u00f3n para constatar la calidad del cableado y los inversores"], "tpDuring": ["Instalaci\u00f3n certificada por t\u00e9cnicos electricistas con equipo de protecci\u00f3n contra ca\u00eddas y l\u00edneas de vida", "Pruebas de termograf\u00eda con drones sobre los m\u00f3dulos instalados para verificar la ausencia de puntos calientes", "Gesti\u00f3n completa de los tr\u00e1mites de interconexi\u00f3n y cambio de medidor bidireccional ante la CFE", "Capacitaci\u00f3n al equipo de mantenimiento de la planta sobre el funcionamiento y paro de emergencia"], "tpAfter": ["Monitoreo 24/7 de generaci\u00f3n de kWh y ahorro acumulado a trav\u00e9s de la aplicaci\u00f3n m\u00f3vil de Helios Solar", "Servicio programado de limpieza rob\u00f3tica de paneles solares para mantener la eficiencia m\u00e1xima", "P\u00f3liza de garant\u00eda de 25 a\u00f1os en la generaci\u00f3n de energ\u00eda de los m\u00f3dulos y 10 a\u00f1os en inversores", "Certificado anual de reducci\u00f3n de emisiones de CO\u2082 emitido para los informes de sustentabilidad de la empresa"], "colors": {"pri": "#0C4A6E", "sec": "#0284C7", "acc": "#F59E0B", "darkInk": "#082F49", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 303 C", "pantoneSec": "Pantone 300 C", "cmykPri": "C:90 M:55 Y:25 K:40", "cmykSec": "C:80 M:30 Y:0 K:0"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#0C4A6E\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"32\" fill=\"#F59E0B\"/><polygon points=\"90,16 96,36 84,36\" fill=\"#F59E0B\"/><polygon points=\"90,164 96,144 84,144\" fill=\"#F59E0B\"/><polygon points=\"16,90 36,96 36,84\" fill=\"#F59E0B\"/><polygon points=\"164,90 144,96 144,84\" fill=\"#F59E0B\"/><polygon points=\"38,38 56,48 48,56\" fill=\"#F59E0B\"/><polygon points=\"142,142 124,132 132,124\" fill=\"#F59E0B\"/><polygon points=\"142,38 132,56 124,48\" fill=\"#F59E0B\"/><polygon points=\"38,142 48,124 56,132\" fill=\"#F59E0B\"/><rect x=\"74\" y=\"74\" width=\"32\" height=\"32\" fill=\"#0C4A6E\"/><line x1=\"90\" y1=\"74\" x2=\"90\" y2=\"106\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/><line x1=\"74\" y1=\"90\" x2=\"106\" y2=\"90\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"32\" fill=\"#F59E0B\"/><polygon points=\"90,16 96,36 84,36\" fill=\"#FFFFFF\"/><polygon points=\"90,164 96,144 84,144\" fill=\"#FFFFFF\"/><polygon points=\"16,90 36,96 36,84\" fill=\"#FFFFFF\"/><polygon points=\"164,90 144,96 144,84\" fill=\"#FFFFFF\"/><polygon points=\"38,38 56,48 48,56\" fill=\"#FFFFFF\"/><polygon points=\"142,142 124,132 132,124\" fill=\"#FFFFFF\"/><polygon points=\"142,38 132,56 124,48\" fill=\"#FFFFFF\"/><polygon points=\"38,142 48,124 56,132\" fill=\"#FFFFFF\"/><rect x=\"74\" y=\"74\" width=\"32\" height=\"32\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"74\" x2=\"90\" y2=\"106\" stroke=\"#0C4A6E\" stroke-width=\"1.5\"/><line x1=\"74\" y1=\"90\" x2=\"106\" y2=\"90\" stroke=\"#0C4A6E\" stroke-width=\"1.5\"/></g>"},
    "helios_solar": {"id": 28, "name": "Helios Solar", "slug": "helios_solar", "tagline": "PARQUES FOTOVOLTAICOS, ENERG\u00cdA LIMPIA & ALMACENAMIENTO INDUSTRIAL BESS", "category": "Materiales & Servicios / Energ\u00eda Solar Fotovoltaica", "giro": "Empresa de ingenier\u00eda EPC especializada en dise\u00f1o, instalaci\u00f3n y mantenimiento de centrales solares fotovoltaicas sobre cubierta y a gran escala, y sistemas de almacenamiento con bater\u00edas BESS.", "buyer": "Parques industriales, centros comerciales, maquiladoras y empresas con altos consumos el\u00e9ctricos que buscan reducir dr\u00e1sticamente su factura de luz y cumplir metas ESG.", "why": "Porque aprovechar la radiaci\u00f3n inagotable del sol es el camino m\u00e1s inteligente, rentable y patri\u00f3tico para lograr la independencia energ\u00e9tica y frenar el cambio clim\u00e1tico.", "how": "Instalamos paneles solares monocristalinos Tier-1 de alta eficiencia, inversores inteligentes con telemetr\u00eda en tiempo real y estructuras de aluminio anodizado resistentes a huracanes.", "what": "Sistemas fotovoltaicos interconectados a red (PPA), bater\u00edas de litio industriales para respaldo de energ\u00eda, auditor\u00edas de calidad de energ\u00eda y gesti\u00f3n de contratos ante la CFE.", "persona": "Ingeniero en energ\u00edas renovables: riguroso con los c\u00e1lculos de radiaci\u00f3n y sombras, obsesionado con la seguridad el\u00e9ctrica y comprometido con la descarbonizaci\u00f3n del pa\u00eds.", "niza": "Clase 37 (Instalaci\u00f3n, mantenimiento y reparaci\u00f3n de paneles solares fotovoltaicos) y Clase 40 (Generaci\u00f3n de energ\u00eda solar y renovable).", "tpBefore": ["Estudio preliminar gratuito de viabilidad solar y retorno de inversi\u00f3n (ROI) analizando los \u00faltimos 12 recibos de CFE", "Modelado 3D del techo de la nave industrial con simulaci\u00f3n de irradiaci\u00f3n solar en software Helioscope", "Opciones de financiamiento verde y contratos de compra de energ\u00eda (PPA) con cero inversi\u00f3n inicial", "Visita t\u00e9cnica a proyectos industriales en operaci\u00f3n para constatar la calidad del cableado y los inversores"], "tpDuring": ["Instalaci\u00f3n certificada por t\u00e9cnicos electricistas con equipo de protecci\u00f3n contra ca\u00eddas y l\u00edneas de vida", "Pruebas de termograf\u00eda con drones sobre los m\u00f3dulos instalados para verificar la ausencia de puntos calientes", "Gesti\u00f3n completa de los tr\u00e1mites de interconexi\u00f3n y cambio de medidor bidireccional ante la CFE", "Capacitaci\u00f3n al equipo de mantenimiento de la planta sobre el funcionamiento y paro de emergencia"], "tpAfter": ["Monitoreo 24/7 de generaci\u00f3n de kWh y ahorro acumulado a trav\u00e9s de la aplicaci\u00f3n m\u00f3vil de Helios Solar", "Servicio programado de limpieza rob\u00f3tica de paneles solares para mantener la eficiencia m\u00e1xima", "P\u00f3liza de garant\u00eda de 25 a\u00f1os en la generaci\u00f3n de energ\u00eda de los m\u00f3dulos y 10 a\u00f1os en inversores", "Certificado anual de reducci\u00f3n de emisiones de CO\u2082 emitido para los informes de sustentabilidad de la empresa"], "colors": {"pri": "#0C4A6E", "sec": "#0284C7", "acc": "#F59E0B", "darkInk": "#082F49", "midGray": "#64748B", "lightGray": "#E2E8F0", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 303 C", "pantoneSec": "Pantone 300 C", "cmykPri": "C:90 M:55 Y:25 K:40", "cmykSec": "C:80 M:30 Y:0 K:0"}, "primaryFont": "Montserrat", "secondaryFont": "Space Grotesk", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#0C4A6E\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"32\" fill=\"#F59E0B\"/><polygon points=\"90,16 96,36 84,36\" fill=\"#F59E0B\"/><polygon points=\"90,164 96,144 84,144\" fill=\"#F59E0B\"/><polygon points=\"16,90 36,96 36,84\" fill=\"#F59E0B\"/><polygon points=\"164,90 144,96 144,84\" fill=\"#F59E0B\"/><polygon points=\"38,38 56,48 48,56\" fill=\"#F59E0B\"/><polygon points=\"142,142 124,132 132,124\" fill=\"#F59E0B\"/><polygon points=\"142,38 132,56 124,48\" fill=\"#F59E0B\"/><polygon points=\"38,142 48,124 56,132\" fill=\"#F59E0B\"/><rect x=\"74\" y=\"74\" width=\"32\" height=\"32\" fill=\"#0C4A6E\"/><line x1=\"90\" y1=\"74\" x2=\"90\" y2=\"106\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/><line x1=\"74\" y1=\"90\" x2=\"106\" y2=\"90\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.8\"/><circle cx=\"90\" cy=\"90\" r=\"32\" fill=\"#F59E0B\"/><polygon points=\"90,16 96,36 84,36\" fill=\"#FFFFFF\"/><polygon points=\"90,164 96,144 84,144\" fill=\"#FFFFFF\"/><polygon points=\"16,90 36,96 36,84\" fill=\"#FFFFFF\"/><polygon points=\"164,90 144,96 144,84\" fill=\"#FFFFFF\"/><polygon points=\"38,38 56,48 48,56\" fill=\"#FFFFFF\"/><polygon points=\"142,142 124,132 132,124\" fill=\"#FFFFFF\"/><polygon points=\"142,38 132,56 124,48\" fill=\"#FFFFFF\"/><polygon points=\"38,142 48,124 56,132\" fill=\"#FFFFFF\"/><rect x=\"74\" y=\"74\" width=\"32\" height=\"32\" fill=\"#FFFFFF\"/><line x1=\"90\" y1=\"74\" x2=\"90\" y2=\"106\" stroke=\"#0C4A6E\" stroke-width=\"1.5\"/><line x1=\"74\" y1=\"90\" x2=\"106\" y2=\"90\" stroke=\"#0C4A6E\" stroke-width=\"1.5\"/></g>"},
    "dolce_gelato": {"id": 29, "name": "Dolce Gelato", "slug": "dolce_gelato", "tagline": "GELATER\u00cdA ARTESANAL ITALIANA & SORBETES DE FRUTA NATURAL", "category": "Comestibles / Helader\u00eda Artesanal", "giro": "Gelater\u00eda tradicional italiana elaborada diariamente en peque\u00f1as cubas pozetti, con leche entera de libre pastoreo, pistache de Bronte (Sicilia), avellanas de Piamonte y sorbetes de fruta natural 100% veganos.", "buyer": "Familias, ni\u00f1os, j\u00f3venes y amantes de los postres que aprecian la textura cremosa y sedosa del gelato aut\u00e9ntico, bajo en grasa y libre de colorantes y esencias artificiales.", "why": "Porque una cucharada de gelato artesanal fr\u00edo en una tarde c\u00e1lida tiene la magia inocente de dibujar una sonrisa instant\u00e1nea en cualquier persona.", "how": "Mantecamos a bajas revoluciones para incorporar solo el aire natural, no usamos saborizantes sint\u00e9ticos y servimos con esp\u00e1tula tradicional a temperatura exacta.", "what": "Gelatos de pistache, fior di latte con stracciatella, avellana tostada, chocolate oscuro al 70%, conos de waffle crujiente reci\u00e9n horneados y affogato al caf\u00e9 espresso.", "persona": "Maestro gelataio italiano: sonriente, amante de su oficio y generoso al ofrecer pruebas con la cucharita antes de que decidas tu combinaci\u00f3n de sabores favorita.", "niza": "Clase 30 (Helados comestibles, gelatos artesanales, sorbetes y preparaciones para hacer helados).", "tpBefore": ["Feed de Instagram con videos hipn\u00f3ticos del gelato saliendo de la m\u00e1quina mantecadora con textura de terciopelo", "Aroma irresistible a barquillo dulce y vainilla saliendo de la plancha del cono en el local", "Pizarr\u00f3n con los sabores de temporada seg\u00fan la fruta m\u00e1s fresca disponible en el mercado", "Ubicaci\u00f3n c\u00e9ntrica en plaza arbolada con mesas al aire libre y espacio pet-friendly"], "tpDuring": ["Prueba sin l\u00edmite de sabores con cucharita compostable para que elijas exactamente lo que se te antoja", "Servicio en cono de barquillo caliente reci\u00e9n hecho o en vasito de cart\u00f3n biodegradable con galleta", "Opci\u00f3n de agregar un chorro de chocolate derretido tibio dentro del cono antes de servir el helado", "Atenci\u00f3n amable, r\u00e1pida y con una m\u00fasica italiana suave sonando de fondo"], "tpAfter": ["Venta de envases t\u00e9rmicos de medio y un litro para llevar a cenas familiares o eventos en casa", "Tarjeta de lealtad digital que te regala un cono mediano al acumular 8 visitas", "Servicio de carrito de gelatos para bodas y eventos corporativos con barista y 4 sabores a elegir", "Encuesta de 1 toque sobre temperatura y cremosidad para mantener la receta siempre impecable"], "colors": {"pri": "#451A03", "sec": "#78350F", "acc": "#059669", "darkInk": "#1A0A01", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 4625 C", "pantoneSec": "Pantone 7554 C", "cmykPri": "C:30 M:75 Y:90 K:70", "cmykSec": "C:20 M:65 Y:95 K:35"}, "primaryFont": "Playfair Display", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"62,102 118,102 90,162\" fill=\"#D97706\"/><line x1=\"72\" y1=\"102\" x2=\"98\" y2=\"148\" stroke=\"#B45309\" stroke-width=\"1.2\"/><line x1=\"84\" y1=\"102\" x2=\"106\" y2=\"136\" stroke=\"#B45309\" stroke-width=\"1.2\"/><line x1=\"96\" y1=\"102\" x2=\"82\" y2=\"148\" stroke=\"#B45309\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"102\" x2=\"74\" y2=\"136\" stroke=\"#B45309\" stroke-width=\"1.2\"/><path d=\"M 64 102 C 60 74, 120 74, 116 102 Z\" fill=\"#78350F\"/><path d=\"M 68 84 C 64 54, 116 54, 112 84 Z\" fill=\"#059669\"/><path d=\"M 74 64 C 70 34, 110 34, 106 64 C 98 44, 82 44, 74 64 Z\" fill=\"#451A03\"/><circle cx=\"90\" cy=\"30\" r=\"10\" fill=\"#DC2626\"/><path d=\"M 94 22 C 98 12, 108 14, 112 16\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"62,102 118,102 90,162\" fill=\"#D97706\"/><line x1=\"72\" y1=\"102\" x2=\"98\" y2=\"148\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"84\" y1=\"102\" x2=\"106\" y2=\"136\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"96\" y1=\"102\" x2=\"82\" y2=\"148\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"102\" x2=\"74\" y2=\"136\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><path d=\"M 64 102 C 60 74, 120 74, 116 102 Z\" fill=\"#FFFFFF\"/><path d=\"M 68 84 C 64 54, 116 54, 112 84 Z\" fill=\"#059669\"/><path d=\"M 74 64 C 70 34, 110 34, 106 64 C 98 44, 82 44, 74 64 Z\" fill=\"#FDE68A\"/><circle cx=\"90\" cy=\"30\" r=\"10\" fill=\"#DC2626\"/><path d=\"M 94 22 C 98 12, 108 14, 112 16\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>"},
    "dolce_gelato": {"id": 29, "name": "Dolce Gelato", "slug": "dolce_gelato", "tagline": "GELATER\u00cdA ARTESANAL ITALIANA & SORBETES DE FRUTA NATURAL", "category": "Comestibles / Helader\u00eda Artesanal", "giro": "Gelater\u00eda tradicional italiana elaborada diariamente en peque\u00f1as cubas pozetti, con leche entera de libre pastoreo, pistache de Bronte (Sicilia), avellanas de Piamonte y sorbetes de fruta natural 100% veganos.", "buyer": "Familias, ni\u00f1os, j\u00f3venes y amantes de los postres que aprecian la textura cremosa y sedosa del gelato aut\u00e9ntico, bajo en grasa y libre de colorantes y esencias artificiales.", "why": "Porque una cucharada de gelato artesanal fr\u00edo en una tarde c\u00e1lida tiene la magia inocente de dibujar una sonrisa instant\u00e1nea en cualquier persona.", "how": "Mantecamos a bajas revoluciones para incorporar solo el aire natural, no usamos saborizantes sint\u00e9ticos y servimos con esp\u00e1tula tradicional a temperatura exacta.", "what": "Gelatos de pistache, fior di latte con stracciatella, avellana tostada, chocolate oscuro al 70%, conos de waffle crujiente reci\u00e9n horneados y affogato al caf\u00e9 espresso.", "persona": "Maestro gelataio italiano: sonriente, amante de su oficio y generoso al ofrecer pruebas con la cucharita antes de que decidas tu combinaci\u00f3n de sabores favorita.", "niza": "Clase 30 (Helados comestibles, gelatos artesanales, sorbetes y preparaciones para hacer helados).", "tpBefore": ["Feed de Instagram con videos hipn\u00f3ticos del gelato saliendo de la m\u00e1quina mantecadora con textura de terciopelo", "Aroma irresistible a barquillo dulce y vainilla saliendo de la plancha del cono en el local", "Pizarr\u00f3n con los sabores de temporada seg\u00fan la fruta m\u00e1s fresca disponible en el mercado", "Ubicaci\u00f3n c\u00e9ntrica en plaza arbolada con mesas al aire libre y espacio pet-friendly"], "tpDuring": ["Prueba sin l\u00edmite de sabores con cucharita compostable para que elijas exactamente lo que se te antoja", "Servicio en cono de barquillo caliente reci\u00e9n hecho o en vasito de cart\u00f3n biodegradable con galleta", "Opci\u00f3n de agregar un chorro de chocolate derretido tibio dentro del cono antes de servir el helado", "Atenci\u00f3n amable, r\u00e1pida y con una m\u00fasica italiana suave sonando de fondo"], "tpAfter": ["Venta de envases t\u00e9rmicos de medio y un litro para llevar a cenas familiares o eventos en casa", "Tarjeta de lealtad digital que te regala un cono mediano al acumular 8 visitas", "Servicio de carrito de gelatos para bodas y eventos corporativos con barista y 4 sabores a elegir", "Encuesta de 1 toque sobre temperatura y cremosidad para mantener la receta siempre impecable"], "colors": {"pri": "#451A03", "sec": "#78350F", "acc": "#059669", "darkInk": "#1A0A01", "midGray": "#78716C", "lightGray": "#E7E5E4", "softBg": "#FAF8F5", "white": "#FFFFFF", "pantonePri": "Pantone 4625 C", "pantoneSec": "Pantone 7554 C", "cmykPri": "C:30 M:75 Y:90 K:70", "cmykSec": "C:20 M:65 Y:95 K:35"}, "primaryFont": "Playfair Display", "secondaryFont": "Montserrat", "isEstablished": false, "isMultibrand": false, "svgCore": "<g transform=\"translate(10,10)\"><polygon points=\"62,102 118,102 90,162\" fill=\"#D97706\"/><line x1=\"72\" y1=\"102\" x2=\"98\" y2=\"148\" stroke=\"#B45309\" stroke-width=\"1.2\"/><line x1=\"84\" y1=\"102\" x2=\"106\" y2=\"136\" stroke=\"#B45309\" stroke-width=\"1.2\"/><line x1=\"96\" y1=\"102\" x2=\"82\" y2=\"148\" stroke=\"#B45309\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"102\" x2=\"74\" y2=\"136\" stroke=\"#B45309\" stroke-width=\"1.2\"/><path d=\"M 64 102 C 60 74, 120 74, 116 102 Z\" fill=\"#78350F\"/><path d=\"M 68 84 C 64 54, 116 54, 112 84 Z\" fill=\"#059669\"/><path d=\"M 74 64 C 70 34, 110 34, 106 64 C 98 44, 82 44, 74 64 Z\" fill=\"#451A03\"/><circle cx=\"90\" cy=\"30\" r=\"10\" fill=\"#DC2626\"/><path d=\"M 94 22 C 98 12, 108 14, 112 16\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><polygon points=\"62,102 118,102 90,162\" fill=\"#D97706\"/><line x1=\"72\" y1=\"102\" x2=\"98\" y2=\"148\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"84\" y1=\"102\" x2=\"106\" y2=\"136\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"96\" y1=\"102\" x2=\"82\" y2=\"148\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><line x1=\"108\" y1=\"102\" x2=\"74\" y2=\"136\" stroke=\"#FFFFFF\" stroke-width=\"1.2\"/><path d=\"M 64 102 C 60 74, 120 74, 116 102 Z\" fill=\"#FFFFFF\"/><path d=\"M 68 84 C 64 54, 116 54, 112 84 Z\" fill=\"#059669\"/><path d=\"M 74 64 C 70 34, 110 34, 106 64 C 98 44, 82 44, 74 64 Z\" fill=\"#FDE68A\"/><circle cx=\"90\" cy=\"30\" r=\"10\" fill=\"#DC2626\"/><path d=\"M 94 22 C 98 12, 108 14, 112 16\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2\" stroke-linecap=\"round\"/></g>"},
    "improbears_group": {"id": 30, "name": "Grupo Corporativo ImproBears", "slug": "improbears_group", "tagline": "HOLDING EMPRESARIAL, INNOVACI\u00d3N & SISTEMAS PATRIMONIALES", "category": "Corporativo / Grupo Multimarca", "giro": "Grupo corporativo y holding de empresas que articula servicios profesionales de consultor\u00eda estrat\u00e9gica, cadena de suministro e ingredientes alimenticios, producci\u00f3n audiovisual cinematogr\u00e1fica e inteligencia artificial aplicada al negocio.", "buyer": "Consejos directivos, empresarios consolidados, inversionistas y directores generales que requieren soluciones de transformaci\u00f3n 360\u00b0 para sus organizaciones.", "why": "Porque liberar el tiempo mental de los l\u00edderes empresariales y erradicar el caos operativo es el motor para construir organizaciones humanas, eficientes y perdurables.", "how": "Operamos bajo la Directiva Max C-00: rigor de ingenier\u00eda, calidez de socio leal, metodolog\u00edas probadas en campo y tecnolog\u00eda de \u00faltima generaci\u00f3n.", "what": "Ecosistema de 4 divisiones homologadas: ImproBears Consulting, ImproBears Ingredients, ImproBears Studio e ImproBears AI.", "persona": "Jorge Ben\u00edtez 'El Oso': mente de ingeniero, fuerza tranquila y socio leal: escucha primero la idea del cliente y la profesionaliza hombro a hombro sin imponer.", "niza": "Clase 35 (Consultor\u00eda corporativa y gesti\u00f3n de negocios), Clase 30/31 (Ingredientes alimenticios), Clase 41 (Producci\u00f3n audiovisual en Studio) y Clase 42 (Servicios de Inteligencia Artificial).", "tpBefore": ["Portal corporativo de alta claridad en improbears.com con arquitectura de las 4 divisiones", "Agente conversacional en WhatsApp disponible 24/7 para canalizar requerimientos a la divisi\u00f3n correcta", "Diagn\u00f3stico preliminar integral 'Del Caos al Sistema' sin costo en menos de 48 horas", "Brandbook oficial de 30 l\u00e1minas en curvas que demuestra la autoridad documental del grupo"], "tpDuring": ["Acompa\u00f1amiento cercano hombro a hombro in situ por directores de cada divisi\u00f3n especializada", "Portal de Clientes unificado en Zoho Books para seguimiento de entregables, pedidos y facturaci\u00f3n", "Sesiones ejecutivas de avance con visualizaciones claras y cero tecnicismos innecesarios", "Contratos de confidencialidad y garant\u00eda de entrega en tiempo y forma en todos los proyectos"], "tpAfter": ["Encuesta de satisfacci\u00f3n ejecutiva post-servicio para evaluar la excelencia operativa", "Acompa\u00f1amiento continuo y revisi\u00f3n semestral de resultados con los socios fundadores del grupo", "Acceso preferencial y descuentos cruzados entre las 4 divisiones del grupo corporativo", "Eventos anuales de networking exclusivo con la comunidad de l\u00edderes y empresarios ImproBears"], "colors": {"pri": "#0D2540", "sec": "#426EAE", "acc": "#FF7A00", "darkInk": "#0D2540", "midGray": "#707070", "lightGray": "#E6E6E6", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 296 C", "pantoneSec": "Pantone 7683 C", "cmykPri": "C:90 M:70 Y:45 K:65", "cmykSec": "C:75 M:45 Y:0 K:10"}, "primaryFont": "Montserrat", "secondaryFont": "Avenir Next", "isEstablished": true, "isMultibrand": true, "subbrands": [{"name": "IMPROBEARS CONSULTING", "descriptor": "BUSINESS IMPROVEMENT & ESTRATEGIA OPERATIVA", "focus": "Optimizaci\u00f3n de procesos, gobernanza corporativa y liberaci\u00f3n de tiempo mental para el l\u00edder.", "color": "#426EAE", "acc": "#FF7A00"}, {"name": "IMPROBEARS INGREDIENTS", "descriptor": "MATERIA PRIMA & QU\u00cdMICA LIMPIA CERTIFICADA", "focus": "Suministro de ingredientes de grado alimenticio, trazabilidad sustentable y formulaciones de alto est\u00e1ndar.", "color": "#0D2540", "acc": "#FF7A00"}, {"name": "IMPROBEARS STUDIO", "descriptor": "PRODUCCI\u00d3N AUDIOVISUAL & BRAND IDENTITY ATELIER", "focus": "Cine, video corporativo, dise\u00f1o documental de alta gama y material audiovisual memorable.", "color": "#4C9DE6", "acc": "#FF7A00"}, {"name": "IMPROBEARS AI", "descriptor": "SISTEMAS NEURALES & AUTOMATIZACI\u00d3N DE NEGOCIO", "focus": "Agentes aut\u00f3nomos, automatizaci\u00f3n de procesos y modelos predictivos para escalar operaciones.", "color": "#1D4ED8", "acc": "#FF7A00"}], "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#426EAE\" stroke-width=\"2\"/><circle cx=\"58\" cy=\"46\" r=\"18\" fill=\"#0D2540\"/><circle cx=\"122\" cy=\"46\" r=\"18\" fill=\"#0D2540\"/><circle cx=\"58\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><circle cx=\"122\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"94\" rx=\"52\" ry=\"46\" fill=\"#0D2540\"/><ellipse cx=\"90\" cy=\"108\" rx=\"26\" ry=\"20\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"98\" rx=\"10\" ry=\"7\" fill=\"#FF7A00\"/><circle cx=\"70\" cy=\"80\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"110\" cy=\"80\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"71\" cy=\"79\" r=\"2.5\" fill=\"#0D2540\"/><circle cx=\"111\" cy=\"79\" r=\"2.5\" fill=\"#0D2540\"/><path d=\"M 82 112 Q 90 120 98 112\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"148\" cy=\"34\" r=\"6\" fill=\"#FF7A00\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#FF7A00\" stroke-width=\"2\"/><circle cx=\"58\" cy=\"46\" r=\"18\" fill=\"#FFFFFF\"/><circle cx=\"122\" cy=\"46\" r=\"18\" fill=\"#FFFFFF\"/><circle cx=\"58\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><circle cx=\"122\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"94\" rx=\"52\" ry=\"46\" fill=\"#FFFFFF\"/><ellipse cx=\"90\" cy=\"108\" rx=\"26\" ry=\"20\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"98\" rx=\"10\" ry=\"7\" fill=\"#FF7A00\"/><circle cx=\"70\" cy=\"80\" r=\"5\" fill=\"#0D2540\"/><circle cx=\"110\" cy=\"80\" r=\"5\" fill=\"#0D2540\"/><circle cx=\"71\" cy=\"79\" r=\"2.5\" fill=\"#FFFFFF\"/><circle cx=\"111\" cy=\"79\" r=\"2.5\" fill=\"#FFFFFF\"/><path d=\"M 82 112 Q 90 120 98 112\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"148\" cy=\"34\" r=\"6\" fill=\"#FF7A00\"/></g>"},
    "grupo_corporativo_improbears": {"id": 30, "name": "Grupo Corporativo ImproBears", "slug": "improbears_group", "tagline": "HOLDING EMPRESARIAL, INNOVACI\u00d3N & SISTEMAS PATRIMONIALES", "category": "Corporativo / Grupo Multimarca", "giro": "Grupo corporativo y holding de empresas que articula servicios profesionales de consultor\u00eda estrat\u00e9gica, cadena de suministro e ingredientes alimenticios, producci\u00f3n audiovisual cinematogr\u00e1fica e inteligencia artificial aplicada al negocio.", "buyer": "Consejos directivos, empresarios consolidados, inversionistas y directores generales que requieren soluciones de transformaci\u00f3n 360\u00b0 para sus organizaciones.", "why": "Porque liberar el tiempo mental de los l\u00edderes empresariales y erradicar el caos operativo es el motor para construir organizaciones humanas, eficientes y perdurables.", "how": "Operamos bajo la Directiva Max C-00: rigor de ingenier\u00eda, calidez de socio leal, metodolog\u00edas probadas en campo y tecnolog\u00eda de \u00faltima generaci\u00f3n.", "what": "Ecosistema de 4 divisiones homologadas: ImproBears Consulting, ImproBears Ingredients, ImproBears Studio e ImproBears AI.", "persona": "Jorge Ben\u00edtez 'El Oso': mente de ingeniero, fuerza tranquila y socio leal: escucha primero la idea del cliente y la profesionaliza hombro a hombro sin imponer.", "niza": "Clase 35 (Consultor\u00eda corporativa y gesti\u00f3n de negocios), Clase 30/31 (Ingredientes alimenticios), Clase 41 (Producci\u00f3n audiovisual en Studio) y Clase 42 (Servicios de Inteligencia Artificial).", "tpBefore": ["Portal corporativo de alta claridad en improbears.com con arquitectura de las 4 divisiones", "Agente conversacional en WhatsApp disponible 24/7 para canalizar requerimientos a la divisi\u00f3n correcta", "Diagn\u00f3stico preliminar integral 'Del Caos al Sistema' sin costo en menos de 48 horas", "Brandbook oficial de 30 l\u00e1minas en curvas que demuestra la autoridad documental del grupo"], "tpDuring": ["Acompa\u00f1amiento cercano hombro a hombro in situ por directores de cada divisi\u00f3n especializada", "Portal de Clientes unificado en Zoho Books para seguimiento de entregables, pedidos y facturaci\u00f3n", "Sesiones ejecutivas de avance con visualizaciones claras y cero tecnicismos innecesarios", "Contratos de confidencialidad y garant\u00eda de entrega en tiempo y forma en todos los proyectos"], "tpAfter": ["Encuesta de satisfacci\u00f3n ejecutiva post-servicio para evaluar la excelencia operativa", "Acompa\u00f1amiento continuo y revisi\u00f3n semestral de resultados con los socios fundadores del grupo", "Acceso preferencial y descuentos cruzados entre las 4 divisiones del grupo corporativo", "Eventos anuales de networking exclusivo con la comunidad de l\u00edderes y empresarios ImproBears"], "colors": {"pri": "#0D2540", "sec": "#426EAE", "acc": "#FF7A00", "darkInk": "#0D2540", "midGray": "#707070", "lightGray": "#E6E6E6", "softBg": "#F8FAFC", "white": "#FFFFFF", "pantonePri": "Pantone 296 C", "pantoneSec": "Pantone 7683 C", "cmykPri": "C:90 M:70 Y:45 K:65", "cmykSec": "C:75 M:45 Y:0 K:10"}, "primaryFont": "Montserrat", "secondaryFont": "Avenir Next", "isEstablished": true, "isMultibrand": true, "subbrands": [{"name": "IMPROBEARS CONSULTING", "descriptor": "BUSINESS IMPROVEMENT & ESTRATEGIA OPERATIVA", "focus": "Optimizaci\u00f3n de procesos, gobernanza corporativa y liberaci\u00f3n de tiempo mental para el l\u00edder.", "color": "#426EAE", "acc": "#FF7A00"}, {"name": "IMPROBEARS INGREDIENTS", "descriptor": "MATERIA PRIMA & QU\u00cdMICA LIMPIA CERTIFICADA", "focus": "Suministro de ingredientes de grado alimenticio, trazabilidad sustentable y formulaciones de alto est\u00e1ndar.", "color": "#0D2540", "acc": "#FF7A00"}, {"name": "IMPROBEARS STUDIO", "descriptor": "PRODUCCI\u00d3N AUDIOVISUAL & BRAND IDENTITY ATELIER", "focus": "Cine, video corporativo, dise\u00f1o documental de alta gama y material audiovisual memorable.", "color": "#4C9DE6", "acc": "#FF7A00"}, {"name": "IMPROBEARS AI", "descriptor": "SISTEMAS NEURALES & AUTOMATIZACI\u00d3N DE NEGOCIO", "focus": "Agentes aut\u00f3nomos, automatizaci\u00f3n de procesos y modelos predictivos para escalar operaciones.", "color": "#1D4ED8", "acc": "#FF7A00"}], "svgCore": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"#F8FAFC\" stroke=\"#426EAE\" stroke-width=\"2\"/><circle cx=\"58\" cy=\"46\" r=\"18\" fill=\"#0D2540\"/><circle cx=\"122\" cy=\"46\" r=\"18\" fill=\"#0D2540\"/><circle cx=\"58\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><circle cx=\"122\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"94\" rx=\"52\" ry=\"46\" fill=\"#0D2540\"/><ellipse cx=\"90\" cy=\"108\" rx=\"26\" ry=\"20\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"98\" rx=\"10\" ry=\"7\" fill=\"#FF7A00\"/><circle cx=\"70\" cy=\"80\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"110\" cy=\"80\" r=\"5\" fill=\"#FFFFFF\"/><circle cx=\"71\" cy=\"79\" r=\"2.5\" fill=\"#0D2540\"/><circle cx=\"111\" cy=\"79\" r=\"2.5\" fill=\"#0D2540\"/><path d=\"M 82 112 Q 90 120 98 112\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"148\" cy=\"34\" r=\"6\" fill=\"#FF7A00\"/></g>", "svgCoreNeg": "<g transform=\"translate(10,10)\"><circle cx=\"90\" cy=\"90\" r=\"76\" fill=\"none\" stroke=\"#FF7A00\" stroke-width=\"2\"/><circle cx=\"58\" cy=\"46\" r=\"18\" fill=\"#FFFFFF\"/><circle cx=\"122\" cy=\"46\" r=\"18\" fill=\"#FFFFFF\"/><circle cx=\"58\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><circle cx=\"122\" cy=\"46\" r=\"10\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"94\" rx=\"52\" ry=\"46\" fill=\"#FFFFFF\"/><ellipse cx=\"90\" cy=\"108\" rx=\"26\" ry=\"20\" fill=\"#426EAE\"/><ellipse cx=\"90\" cy=\"98\" rx=\"10\" ry=\"7\" fill=\"#FF7A00\"/><circle cx=\"70\" cy=\"80\" r=\"5\" fill=\"#0D2540\"/><circle cx=\"110\" cy=\"80\" r=\"5\" fill=\"#0D2540\"/><circle cx=\"71\" cy=\"79\" r=\"2.5\" fill=\"#FFFFFF\"/><circle cx=\"111\" cy=\"79\" r=\"2.5\" fill=\"#FFFFFF\"/><path d=\"M 82 112 Q 90 120 98 112\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"148\" cy=\"34\" r=\"6\" fill=\"#FF7A00\"/></g>"},
  };

  window.generateBrandbook30Plates = generateBrandbook30Plates;
  window.getUniversalBrandbookStyles = getUniversalBrandbookStyles;
  window.generateFullBrandbookDocHtml = generateFullBrandbookDocHtml;

  window.TBB_V80_PLATES_GENERATOR = {
    generateBrandbook30Plates: generateBrandbook30Plates,
    getUniversalBrandbookStyles: getUniversalBrandbookStyles,
    getTheBestBrandStyles: getUniversalBrandbookStyles,
    generateFullBrandbookDocHtml: generateFullBrandbookDocHtml,
    renderTheBestBrandPlate: function (idx) {
      var isTbb = /the\s*best\s*brand/i.test(window.canvasState?.brandName || "TheBestBrand");
      var brandData = isTbb ? {
        name: "The Best Brand",
        slug: "the_best_brand",
        tagline: "BRAND IDENTITY ATELIER & MOTOR ALGORÍTMICO",
        category: "Tecnología / Luxury Brand Identity Atelier",
        giro: "Atelier de identidad de marca algorítmica y motor editorial de Brandbooks de 30 láminas en curvas matemáticas puras.",
        buyer: "Líderes de empresas consolidadas y fundadores exigentes que valoran su tiempo y exigen excelencia técnica sin plantillas genéricas.",
        why: "Porque el tiempo mental del líder es sagrado; unimos la calidez de una mentora de clase mundial con el rigor matemático de curvas vectoriales.",
        how: "Diálogo socrático de 7 pasos con Aura, calibración estética en tiempo real y síntesis geométrica en vectores.",
        what: "Manual de Identidad de 30 Láminas en Curvas (.PDF), suite vectorial abierta y bóveda digital permanente.",
        persona: "Jorge Benítez 'El Oso': mente de ingeniero, fuerza tranquila y socio leal que escucha primero y profesionaliza hombro a hombro.",
        niza: "Clase 42 (Servicios tecnológicos y diseño de software e identidad) y Clase 35 (Consultoría de negocios).",
        tpBefore: [
          "Landing page en lienzo claro con tiempo de carga inferior a 0.8 segundos",
          "Demo interactivo en tiempo real sin requerir tarjeta de crédito previa",
          "Video explicativo en Full HD 1080p guiado por la voz neural de Aura",
          "Portafolio editorial de Brandbooks reales creados para múltiples industrias"
        ],
        tpDuring: [
          "Atelier conversacional con Aura respondiendo en lenguaje natural empático",
          "Algoritmo de validación de naming con Clases Niza y test fonético",
          "Calibración de afinidad estética con sliders bipolares a 60 FPS",
          "Checkout transparente y seguro con Stripe y entrega inmediata"
        ],
        tpAfter: [
          "Descarga instantánea del PDF de 30 láminas vectoriales de alta resolución",
          "Kit de isotipos abiertos en SVG transparente y PNG a 4000 px",
          "Bóveda digital permanente con acceso vitalicio a los activos de marca",
          "Acompañamiento post-venta y soporte directo para aplicaciones impresas y digitales"
        ],
        colors: {
          pri: "#0D2540", sec: "#426EAE", acc: "#FF7A00", darkInk: "#0D2540",
          midGray: "#707070", lightGray: "#E6E6E6", softBg: "#F8FAFC", white: "#FFFFFF",
          pantonePri: "Pantone 296 C", pantoneSec: "Pantone 7683 C",
          cmykPri: "C:100 M:80 Y:40 K:50", cmykSec: "C:75 M:45 Y:5 K:0"
        },
        primaryFont: "Montserrat",
        secondaryFont: "Plus Jakarta Sans",
        isEstablished: true,
        isMultibrand: false,
        svgCore: `
          <g transform="translate(10,10)">
            <defs>
              <linearGradient id="tbbWingBlue_bb" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stop-color="#60A5FA"/>
                <stop offset="42%" stop-color="#426EAE"/>
                <stop offset="85%" stop-color="#0D2540"/>
                <stop offset="100%" stop-color="#050811"/>
              </linearGradient>
              <linearGradient id="tbbWingOrange_bb" x1="0%" y1="0%" x2="95%" y2="100%">
                <stop offset="0%" stop-color="#FEF08A"/>
                <stop offset="45%" stop-color="#FF7A00"/>
                <stop offset="85%" stop-color="#EA580C"/>
                <stop offset="100%" stop-color="#9A3412"/>
              </linearGradient>
              <linearGradient id="tbbRibbon_bb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.98"/>
                <stop offset="50%" stop-color="#E0F2FE" stop-opacity="0.92"/>
                <stop offset="100%" stop-color="#93C5FD" stop-opacity="0.85"/>
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r="64" fill="#426EAE" opacity="0.10"/>
            <path d="M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z" fill="url(#tbbWingBlue_bb)" stroke="#93C5FD" stroke-width="1.4"/>
            <path d="M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z" fill="url(#tbbWingOrange_bb)" stroke="#FDE68A" stroke-width="1.4"/>
            <path d="M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z" fill="url(#tbbRibbon_bb)" opacity="0.92"/>
            <circle cx="90" cy="90" r="28" fill="#0D2540" stroke="#FFFFFF" stroke-width="2.4"/>
            <ellipse cx="82" cy="78" rx="14" ry="7" transform="rotate(-28 82 78)" fill="#FFFFFF" opacity="0.30"/>
            <text x="90" y="97.5" text-anchor="middle" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20" letter-spacing="1">TB</text>
            <path d="M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z" fill="#FF7A00" stroke="#FFFFFF" stroke-width="1.2"/>
          </g>
        `,
        svgCoreNeg: `
          <g transform="translate(10,10)">
            <defs>
              <linearGradient id="tbbWingBlueNeg_bb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="50%" stop-color="#93C5FD"/>
                <stop offset="100%" stop-color="#4C9DE6"/>
              </linearGradient>
              <linearGradient id="tbbWingOrangeNeg_bb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FEF08A"/>
                <stop offset="60%" stop-color="#FF7A00"/>
                <stop offset="100%" stop-color="#EA580C"/>
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r="64" fill="#FFFFFF" opacity="0.08"/>
            <path d="M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z" fill="url(#tbbWingBlueNeg_bb)" stroke="#93C5FD" stroke-width="1.4"/>
            <path d="M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z" fill="url(#tbbWingOrangeNeg_bb)" stroke="#FDE68A" stroke-width="1.4"/>
            <path d="M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z" fill="#FFFFFF" opacity="0.92"/>
            <circle cx="90" cy="90" r="28" fill="#0D2540" stroke="#FFFFFF" stroke-width="2.4"/>
            <text x="90" y="97.5" text-anchor="middle" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20" letter-spacing="1">TB</text>
            <path d="M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z" fill="#FEF08A" stroke="#FFFFFF" stroke-width="1.2"/>
          </g>
        `
      } : (window.buildActiveBrandProfileForV80 ? window.buildActiveBrandProfileForV80() : {});

      var plates = generateBrandbook30Plates(brandData);
      var safeIdx = Math.max(0, Math.min(29, Number(idx || 0)));
      return plates[safeIdx] || plates[0];
    },
    renderAllPlatesDocHtml: function (optBrand) {
      var b = optBrand || (window.buildActiveBrandProfileForV80 ? window.buildActiveBrandProfileForV80() : null);
      if (!b) {
        return window.TBB_V80_PLATES_GENERATOR.renderTheBestBrandPlate(0);
      }
      return generateFullBrandbookDocHtml(b);
    }
  };
})();
