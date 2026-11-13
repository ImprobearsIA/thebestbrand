// ============================================================================
// THE BEST BRAND — SCRIPT DE AUTO-LLENADO E2E EN MAC (VOZ DE JORGE BENÍTEZ)
// Marca Madre: IMPROBEARS — BUSINESS IMPROVEMENT + 4 Submarcas Homologadas
// (Consulting · Ingredients · Studio · AI) — Conservando Nombres y Logos 100%
// ============================================================================
(async function runJorgeImproBearsAutoFillMac() {
  console.log("🐻 Iniciando llenado automático en vivo como Jorge Benítez ('El Oso') para IMPROBEARS y sus 4 Submarcas...");
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function urlToDataUrl(url) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return url;
    }
  }

  // 0. Limpiar sesión previa para arrancar desde cero sin remanentes
  if (typeof window.tbbDismissAuraSplashBoot === "function") window.tbbDismissAuraSplashBoot(false);
  const sp = document.getElementById("tbbAuraSplashBootOverlay");
  if (sp) sp.style.display = "none";
  if (typeof window.startFreshBrandSession === "function") window.startFreshBrandSession();
  delete window.canvasState.isOfficialAdminTbbPreset;
  window.tbbState.step = 0;
  window.tbbState.subStep = 1;
  window.renderTbbZeroScrollStage();
  await sleep(400);

  // PASO 0.1: Objetivo
  if (typeof selectStep0Goal === "function") selectStep0Goal("redesign");
  window.renderTbbZeroScrollStage();
  await sleep(450);
  window.onTbbAtomicNext();
  await sleep(450);

  // PASO 0.2: Nombre oficial IMPROBEARS + Subida del Logotipo Oficial y opción "Mantener mi logo actual" (keep)
  if (typeof selectStep0Assets === "function") selectStep0Assets("has_name");
  window.renderTbbZeroScrollStage();
  const nameInp = document.getElementById("tbbStep0BrandNameInput");
  if (nameInp) {
    nameInp.value = "IMPROBEARS";
    nameInp.dispatchEvent(new Event("input", { bubbles: true }));
  }
  window.tbbUpdateBrandNameFromInput("IMPROBEARS");

  const masterDataUrl = await urlToDataUrl("/assets/improbears/logo-improbears-master.png");
  const consultDataUrl = await urlToDataUrl("/assets/improbears/logo-improbears-consulting.png");
  const ingredDataUrl = await urlToDataUrl("/assets/improbears/logo-improbears-ingredients.png");
  const studioDataUrl = await urlToDataUrl("/assets/improbears/logo-improbears-studio.png");
  const aiDataUrl = await urlToDataUrl("/assets/improbears/logo-improbears-ai.png");

  try {
    const res = await fetch(masterDataUrl);
    const blob = await res.blob();
    const file = new File([blob], "logo-improbears-master.png", { type: "image/png" });
    const dt = new DataTransfer();
    dt.items.add(file);
    const fileInp = document.getElementById("tbbExistingLogoFileInput");
    if (fileInp) {
      fileInp.files = dt.files;
      await window.tbbHandleExistingLogoUpload(fileInp);
    }
  } catch (e) {}

  window.tbbSetExistingLogoMode("keep");
  const cols = ["#0D2540", "#426EAE", "#FF7A00"];
  window.canvasState.uploaded_logo_colors = cols;
  window.canvasState.primary_color = "#0D2540";
  window.canvasState.secondary_color = "#426EAE";
  window.canvasState.accent_color = "#FF7A00";
  if (window.step0State) window.step0State.uploadedLogoColors = cols;
  window.tbbState.logoPriHex = "#0D2540";
  window.tbbState.logoSecHex = "#426EAE";
  window.tbbSyncUploadedLogoIntoIterations();
  window.renderTbbZeroScrollStage();
  await sleep(500);
  window.onTbbAtomicNext();
  await sleep(450);

  // PASO 0.3: Giro detallado y las 4 Submarcas Homologadas
  const jorgeGiroText = "Somos IMPROBEARS — Business Improvement, una firma y ecosistema de mejora integral de negocios donde ayudamos a empresarios, directores e industrias a pasar del caos al sistema. Nuestra Marca Madre integra 4 submarcas oficiales conservando siempre su nombre y su logotipo especializado con su descriptor en naranja (#FF7A00): 1) IMPROBEARS CONSULTING (consultoría estratégica, procesos, productividad e implementación Zoho One), 2) IMPROBEARS INGREDIENTS (biotecnología alimentaria, Hopzoil® e ingredientes funcionales B2B), 3) IMPROBEARS STUDIO (producción audiovisual en locación, cine corporativo y diseño de marca) y 4) IMPROBEARS AI (asistentes digitales en WhatsApp 24/7, copilotos ejecutivos y nuestra suite de software propio The Best).";
  const ta03 = document.getElementById("tbbStep0BizTextarea");
  if (ta03) {
    ta03.value = jorgeGiroText;
    ta03.dispatchEvent(new Event("input", { bubbles: true }));
  }
  window.tbbUpdateBusinessTypeFromInput(jorgeGiroText);
  await sleep(500);
  window.onTbbAtomicNext();
  await sleep(400);
  if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
  await sleep(400);

  // PASO 1: Las 7 respuestas estratégicas extensas (1.1 a 1.7) con el lenguaje de Jorge Benítez
  const step1Answers = [
    {
      sub: 1,
      key: "golden_circle",
      text: "Porque he visto a demasiados empresarios valiosos trabajar de sol a sol atrapados en el caos de su propia operación: tienen ventas y talento, pero la información está regada en mil chats, los procesos dependen de que el dueño esté encima de todo y eso les roba la paz mental. Creamos IMPROBEARS para pasar del caos al sistema: conectar estrategia, operación, ciencia, comunicación e Inteligencia Artificial para devolverle claridad, control y libertad mental al líder."
    },
    {
      sub: 2,
      key: "value_offer",
      text: "A diferencia de los consultores tradicionales que solo dejan un PowerPoint y se van, o de proveedores sueltos que no entienden el negocio completo, nosotros somos un socio integral que se mete a la cancha hombro a hombro contigo a través de nuestras 4 submarcas conservando una sola arquitectura coherente: IMPROBEARS CONSULTING (orden operativo y Zoho), IMPROBEARS INGREDIENTS (innovación y abasto funcional como Hopzoil®), IMPROBEARS STUDIO (video profesional e identidad) e IMPROBEARS AI (automatización, asistentes de IA en WhatsApp 24/7 y copilotos ejecutivos)."
    },
    {
      sub: 3,
      key: "social_role",
      text: "Le quitamos al dueño la carga de sentir que está solo cargando toda la empresa en los hombros. Cuando instalamos un sistema claro, homologamos su marca, optimizamos su formulación industrial o automatizamos su atención y sus tableros financieros, el líder recupera tiempo de calidad para pensar estratégicamente y su equipo trabaja sin fricción."
    },
    {
      sub: 4,
      key: "process_steps_text",
      text: "1. Escuchamos primero tu idea y diagnosticamos a fondo dónde está el cuello de botella sin imponerte rollos teóricos · 2. Diseñamos e implementamos hombro a hombro el sistema a la medida con la división exacta (Consulting, Ingredients, Studio o AI) · 3. Medimos resultados reales en productividad, ventas y rentabilidad dejando todo documentado y operando en orden."
    },
    {
      sub: 5,
      key: "core_message",
      text: "Del Caos al Sistema: Estrategia, Ciencia, Producción e Inteligencia Artificial trabajando hombro a hombro por la rentabilidad de tu empresa."
    },
    {
      sub: 6,
      key: "brand_persona",
      text: "Jorge Benítez ('El Oso'): Fuerza tranquila, mente de ingeniero y calidez de socio leal. Es ese aliado con experiencia real en planta, dirección y tecnología que primero te escucha con respeto, toma tu idea original para profesionalizarla sin ego, habla directo y claro, y no te suelta hasta que el sistema funcione al 100%."
    },
    {
      sub: 7,
      key: "ideal_customer",
      text: "Dueños de empresa, fundadores, directores generales, maestros cerveceros, directores de I+D en la industria de alimentos y bebidas, y líderes B2B que ya tienen tracción pero buscan orden operativo, ingredientes de alto valor, imagen impecable y automatización inteligente."
    }
  ];

  for (let i = 0; i < step1Answers.length; i++) {
    const item = step1Answers[i];
    window.tbbState.step = 1;
    window.tbbState.subStep = item.sub;
    window.renderTbbZeroScrollStage();
    const inp = document.getElementById("tbbStep1AnswerInput");
    if (inp) {
      inp.value = item.text;
      inp.dispatchEvent(new Event("input", { bubbles: true }));
    }
    window.tbbSaveStep1Answer(item.key, item.text);
    await sleep(350);
    if (i < step1Answers.length - 1) {
      window.onTbbAtomicNext();
      await sleep(250);
    }
  }

  window.onTbbAtomicNext();
  await sleep(350);
  if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
  await sleep(350);

  // PASO 2: Touchpoints reales Antes (2.1), Durante (2.2) y Después (2.3)
  window.tbbState.step = 2;
  window.tbbState.subStep = 1;
  window.tpExtractedItems.before = [
    "Redes sociales oficiales con contenido de valor por división (LinkedIn, Instagram, YouTube y Reels)",
    "Sitio web institucional en lienzo claro (improbears.com) con calculadoras interactivas (Hopzoil®) y embudo de diagnóstico",
    "Asistente de IA en WhatsApp 24/7 para atención inmediata y calificación sin fricción",
    "Solicitud ágil de diagnóstico, muestras de ingredientes B2B o sesiones de producción audiovisual"
  ];
  window.renderTbbZeroScrollStage();
  await sleep(350);

  window.tbbState.subStep = 2;
  window.tpExtractedItems.during = [
    "Compra fácil y propuestas ejecutivas claras firmadas digitalmente en Zoho Sign bajo Regla 1 (Lienzo Claro C-00)",
    "Capacitación in situ y consultoría hombro a hombro en planta u oficinas del cliente (ImproBears Consulting & AI)",
    "Sesión profesional de video, fotografía y dirección de marca en locación (ImproBears Studio)",
    "Envío puntual de productos e ingredientes funcionales con trazabilidad y guía activa (ImproBears Ingredients)"
  ];
  window.renderTbbZeroScrollStage();
  await sleep(350);

  window.tbbState.subStep = 3;
  window.tpExtractedItems.after = [
    "Portal de Clientes Zoho Books para consulta de estados de cuenta, descarga de facturas CFDI y pagos en línea",
    "Entrega de manuales operativos, fichas técnicas COA/SDS, masters de video 4K y bóveda de marca",
    "Encuesta ejecutiva de satisfacción y auditoría de resultados (ROI)",
    "Seguimiento proactivo por WhatsApp Business para soporte continuo y recompra fácil en 1 clic"
  ];
  window.renderTbbZeroScrollStage();
  await sleep(350);

  window.onTbbAtomicNext();
  await sleep(350);
  if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
  await sleep(350);

  // PASO 3: Identidad Verbal, Conservación de IMPROBEARS + 4 Submarcas y Clases de Niza
  window.tbbState.step = 3;
  window.tbbState.subStep = 1;
  if (typeof selectNamingFocusOption === "function") selectNamingFocusOption("founders");
  window.tbbUpdateBrandNameFromInput("IMPROBEARS");
  window.canvasState.tagline = "BUSINESS IMPROVEMENT · DEL CAOS AL SISTEMA";
  window.canvasState.primary_nice_class = "Clases 35 (ImproBears Consulting), 01 y 32 (ImproBears Ingredients), 41 (ImproBears Studio) y 42 (ImproBears AI & Software)";
  window.tbbState.subStep = 3;
  window.renderTbbZeroScrollStage();
  await sleep(350);

  window.onTbbAtomicNext();
  await sleep(350);
  if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
  await sleep(350);

  // PASO 4: Kansei, Tipografía Oficial (Montserrat + Avenir Next) y Semilla de los 5 Logos Conservados
  window.tbbState.step = 4;
  window.tbbUpdateSliderValue("organico_geometrico", 0.55);
  window.tbbUpdateSliderValue("tradicional_innovador", 0.80);
  window.tbbUpdateSliderValue("serio_jugueton", -0.50);
  window.tbbUpdateSliderValue("accesible_exclusivo", 0.65);
  window.tbbUpdateSliderValue("sutil_energetico", 0.70);
  window.tbbUpdateSliderValue("artesanal_industrial", 0.75);
  window.tbbUpdateSliderValue("minimalista_complejo", -0.25);
  window.tbbState.subStep = 4;
  window.tbbSelectFontCategoryTab("adobe_hybrid");
  window.tbbUpdateAdobeTypekitId("improbears-c00-kit");
  window.tbbSelectOfficialFontFamily("Montserrat", "Plus Jakarta Sans", "JetBrains Mono");
  window.canvasState.primary_font = "Montserrat";
  window.canvasState.secondary_font = "Avenir Next";
  window.tbbState.subStep = 5;
  window.tbbSelectBaseStructureFamily(1);
  window.tbbUpdateStep4SeedIdea("Conservar íntegramente el logotipo oficial de la Marca Madre IMPROBEARS — BUSINESS IMPROVEMENT (oso protector en Azul ImproBears #426EAE, silueta humana en espacio negativo blanco, flecha ascendente en Naranja Acción #FF7A00 y doble anillo en Azul Profundo #0D2540) junto con los 4 logotipos oficiales de las submarcas: IMPROBEARS CONSULTING, IMPROBEARS INGREDIENTS, IMPROBEARS STUDIO e IMPROBEARS AI.");
  window.renderTbbZeroScrollStage();
  await sleep(400);

  window.onTbbAtomicNext();
  await sleep(350);
  if (typeof finishTransitionVideoAndEnterNextStep === "function") finishTransitionVideoAndEnterNextStep();
  await sleep(350);

  // PASO 5: Paleta Oficial y carga en el Atelier de los 5 Logotipos Oficiales (Marca Madre + 4 Submarcas)
  window.tbbState.step = 5;
  window.tbbState.subStep = 2;
  const uMaster = await window.tbbAutoTrimAndCenterRasterLogo(masterDataUrl, 1024, 0.88);
  const uConsult = await window.tbbAutoTrimAndCenterRasterLogo(consultDataUrl, 1024, 0.88);
  const uIngred = await window.tbbAutoTrimAndCenterRasterLogo(ingredDataUrl, 1024, 0.88);
  const uStudio = await window.tbbAutoTrimAndCenterRasterLogo(studioDataUrl, 1024, 0.88);
  const uAi = await window.tbbAutoTrimAndCenterRasterLogo(aiDataUrl, 1024, 0.88);

  const vMaster = await window.tbbVectorizeRasterLogoToSvgCurves(uMaster);
  const vConsult = await window.tbbVectorizeRasterLogoToSvgCurves(uConsult);
  const vIngred = await window.tbbVectorizeRasterLogoToSvgCurves(uIngred);
  const vStudio = await window.tbbVectorizeRasterLogoToSvgCurves(uStudio);
  const vAi = await window.tbbVectorizeRasterLogoToSvgCurves(uAi);

  const pri = "#0D2540", sec = "#426EAE", acc = "#FF7A00";
  window.tbbState.logoIterations = [
    {
      idx: 1,
      isUploadedBase: true,
      uploadedDataUrl: uMaster,
      tracedSvgPaths: vMaster ? vMaster.svgGroup : "",
      tracedPathCount: vMaster ? vMaster.pathCount : 0,
      geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uMaster + '" xlink:href="' + uMaster + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
      conceptLabel: "Marca Madre Oficial: IMPROBEARS — Business Improvement (Conservado 100%)",
      archetype: "uploaded_logo_base",
      paradigm: "structural_monolith",
      pri, sec, accentHex: acc,
      scale: 1.0, darkBg: false, fontFamily: "Montserrat", layout: "horizontal",
      mods: { fontFamily: "Montserrat", layout: "horizontal" },
      note: "Marca Madre Oficial IMPROBEARS — Business Improvement (Conservada Intacta)"
    },
    {
      idx: 2,
      isUploadedBase: true,
      uploadedDataUrl: uConsult,
      tracedSvgPaths: vConsult ? vConsult.svgGroup : "",
      tracedPathCount: vConsult ? vConsult.pathCount : 0,
      geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uConsult + '" xlink:href="' + uConsult + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
      conceptLabel: "Submarca Oficial 01: IMPROBEARS CONSULTING (Barras de Crecimiento)",
      archetype: "uploaded_logo_base",
      paradigm: "structural_monolith",
      pri, sec, accentHex: acc,
      scale: 1.0, darkBg: false, fontFamily: "Montserrat", layout: "horizontal",
      mods: { fontFamily: "Montserrat", layout: "horizontal" },
      note: "Submarca Oficial 01: IMPROBEARS CONSULTING (Nombre y Logo Conservados)"
    },
    {
      idx: 3,
      isUploadedBase: true,
      uploadedDataUrl: uIngred,
      tracedSvgPaths: vIngred ? vIngred.svgGroup : "",
      tracedPathCount: vIngred ? vIngred.pathCount : 0,
      geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uIngred + '" xlink:href="' + uIngred + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
      conceptLabel: "Submarca Oficial 02: IMPROBEARS INGREDIENTS (Estructura Molecular)",
      archetype: "uploaded_logo_base",
      paradigm: "structural_monolith",
      pri, sec, accentHex: acc,
      scale: 1.0, darkBg: false, fontFamily: "Montserrat", layout: "horizontal",
      mods: { fontFamily: "Montserrat", layout: "horizontal" },
      note: "Submarca Oficial 02: IMPROBEARS INGREDIENTS (Nombre y Logo Conservados)"
    },
    {
      idx: 4,
      isUploadedBase: true,
      uploadedDataUrl: uStudio,
      tracedSvgPaths: vStudio ? vStudio.svgGroup : "",
      tracedPathCount: vStudio ? vStudio.pathCount : 0,
      geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uStudio + '" xlink:href="' + uStudio + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
      conceptLabel: "Submarca Oficial 03: IMPROBEARS STUDIO (Cámara de Cine y Producción)",
      archetype: "uploaded_logo_base",
      paradigm: "structural_monolith",
      pri, sec, accentHex: acc,
      scale: 1.0, darkBg: false, fontFamily: "Montserrat", layout: "horizontal",
      mods: { fontFamily: "Montserrat", layout: "horizontal" },
      note: "Submarca Oficial 03: IMPROBEARS STUDIO (Nombre y Logo Conservados)"
    },
    {
      idx: 5,
      isUploadedBase: true,
      uploadedDataUrl: uAi,
      tracedSvgPaths: vAi ? vAi.svgGroup : "",
      tracedPathCount: vAi ? vAi.pathCount : 0,
      geminiCustomSvg: '<g><image data-tbb-uploaded-logo="1" href="' + uAi + '" xlink:href="' + uAi + '" x="6" y="6" width="168" height="168" preserveAspectRatio="xMidYMid meet"/></g>',
      conceptLabel: "Submarca Oficial 04: IMPROBEARS AI (Grafo Neuronal Multi-Agente)",
      archetype: "uploaded_logo_base",
      paradigm: "structural_monolith",
      pri, sec, accentHex: acc,
      scale: 1.0, darkBg: false, fontFamily: "Montserrat", layout: "horizontal",
      mods: { fontFamily: "Montserrat", layout: "horizontal" },
      note: "Submarca Oficial 04: IMPROBEARS AI (Nombre y Logo Conservados)"
    }
  ];

  if (typeof window.tbbRestoreLogoIteration === "function") {
    window.tbbRestoreLogoIteration(0);
  } else {
    window.tbbState.logoIterationIndex = 1;
  }
  window.canvasState.uploaded_logo_data_url = uMaster;
  window.canvasState.uploaded_logo_svg_curves = vMaster ? vMaster.svgGroup : "";
  window.canvasState.useGenerative36Plates = true;
  if (typeof saveBrandSessionToLocalStorage === "function") saveBrandSessionToLocalStorage();
  await sleep(500);

  // PASO 6.1: Abrir el Visor del Manual de 36 Láminas en la Portada
  const ov = document.getElementById("tbbStep6LiveAssemblyOverlay");
  if (ov) ov.remove();
  window.tbbState.step = 6;
  window.tbbState.subStep = 1;
  window.tbbState.plateIdx = 0;
  window.renderTbbZeroScrollStage();
  if (typeof window.scaleImproBearsPlateInStage === "function") window.scaleImproBearsPlateInStage();

  console.log("✅ ¡Listo! IMPROBEARS y sus 4 Submarcas (Consulting, Ingredients, Studio y AI) están cargadas con todos tus textos extensos y sus 5 logotipos oficiales intactos.");
})();
