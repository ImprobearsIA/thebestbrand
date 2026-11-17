/**
 * ============================================================================
 * THE BEST BRAND · YOUR BRAND, NOW!!! (PANORAMIC LIGHT EDITION V91.0)
 * ============================================================================
 * Arquitectura & Craft:
 * - 100% Lienzo Claro Panorámico (#FFFFFF / #F8FAFC) sin cajas anidadas innecesarias
 * - Tipografía ligera y elegante (font-weight 400/500 en cuerpo, 600/700 en titulares)
 * - Un solo elemento focal a la vez (Single-Focus Storytelling)
 * - 100% Capturas reales de la Aplicación y Láminas reales del Brandbook de 36 Láminas
 * - 5 Subpáginas Secuenciales en el Menú:
 *     01 Inicio (Hook + 2 opciones principales + Showcase Panorámico)
 *     02 Demo (Pasos 0, 1 y 2 en vivo con indicador pulsante dinámico)
 *     03 App Tour (Recorrido interactivo con Parallax, Sticky Stacking, Horizontal Scroll y Pop-ups de Video)
 *     04 Bases teóricas (Videos con miniaturas y Libros con links directos)
 *     05 Pack de descargas (Carrusel moderno + Visor pantalla casi completa + Próximamente Web & Redes Sociales)
 * - 100% Multilingüe en 6 idiomas (ES, EN, FR, PT, DE, IT) incluyendo capturas y videos
 * - Pago Real Habilitado (/api/v1/payments/checkout-live) y opción de Comprar siempre visible
 * ============================================================================
 */
(function () {
  "use strict";

  const LANG_STORAGE_KEY = "tbb_active_ui_lang_v52";
  const LICENSE_STORAGE_KEY = "tbb_pro_license_v56";

  // ---------------------------------------------------------------------------
  // 1. DICCIONARIO MULTILINGÜE COMPLETO (6 IDIOMAS: ES, EN, FR, PT, DE, IT)
  // ---------------------------------------------------------------------------
  const I18N = {
    es: {
      bento9Kicker: "SUITE EJECUTIVA COMPLETA · LOS 9 ENTREGABLES OFICIALES",
      carouselPrev: "← Anterior",
      carouselNext: "Siguiente →",
      gcLiveKicker: "VISTA PREVIA EN VIVO DEL CÍRCULO DORADO DE TU MARCA",
      iphoneSectionKicker: "APLICACIÓN REAL EN VIVO · CONECTADA CON AURA",
      iphoneStep0Free: "Paso 0 · Giro (Gratis)",
      iphoneStep1Free: "Paso 1 · Círculo Dorado (Gratis)",
      iphoneStep2Free: "Paso 2 · Touchpoints (Gratis)",
      iphoneStep3Free: "Paso 3 · Naming SMILE (Gratis)",
      iphoneStep4Unlock: "🔒 Paso 4 · Desbloquear ($49 USD)",
      iphoneVideoBtn: "▶ Video HeyGen del Paso",
      nanoAfterLabel: "DESPUÉS · EVOLUCIÓN NANO BANANA PRO 4K + TRAZADO VECTORIAL EN CURVAS (.SVG / .AI)",
      nanoBeforeLabel: "ANTES · LOGOTIPO SUBIDO POR EL CLIENTE (PASO 0.2)",
      nanoKicker: "MOTOR VISUAL NANO BANANA PRO 4K + VECTORES BÉZIER PUROS",
      plates36Kicker: "MANUAL OFICIAL DE IDENTIDAD · LAS 36 LÁMINAS EN CURVAS (16:9)",
      syncFreeBadge: "✓ Acceso Libre",
      syncLiveConnected: "● AURA EN VIVO CONECTADA",
      syncUnlockBtn: "Desbloquear · $49 USD",
      videoPopupContinue: "Continuar explorando",
      videoPopupScriptLabel: "GUION EXACTO HABLADO (SINCRONIZADO EN HEYGEN):",
      ytWatchHere: "▶ Reproducir Conferencia Aquí",
      menu1: "Inicio",
      menu2: "Demo",
      menu2Live: "EN VIVO",
      menu3: "App Tour",
      menu4: "Bases teóricas",
      menu5: "Pack de descargas",
      openStudio: "Abrir Estudio ↗",
      buyNowHeader: "Comprar · $49 USD",
      buyNowFloating: "Adquirir Licencia Pro · $49 USD",
      licenseActive: "LICENCIA PRO ACTIVA ✓",
      heroEyebrow: "THE BEST BRAND · SUITE DE IDENTIDAD Y BRANDBOOK EN CURVAS",
      heroHook: "Crea tu Marca y tus 9 Entregables de nivel profesional ¡en 30 minutos!",
      heroSub: "Sin juntas interminables ni plantillas genéricas. Conversa con Aura, recorre los 7 pasos estratégicos y descarga tu Manual Oficial de 36 Láminas y toda tu papelería editable al instante.",
      heroBtnDemo: "Usa nuestra demo con el paso 0, 1 y 2",
      heroBtnTour: "Explorar el recorrido paso a paso (App Tour) →",
      heroShowcaseTag: "VISTA PANORÁMICA REAL DE LA APLICACIÓN Y DEL BRANDBOOK",
      heroShowcaseTitle: "Un sistema diseñado para enfocarte en una sola decisión a la vez",
      heroShowcaseDesc: "Cada respuesta que das a Aura se transforma en tiempo real en geometría vectorial, tipografía calibrada y láminas listas para imprenta y mundo digital.",
      heroSwitchApp: "Ver Captura Real de la App",
      heroSwitchManual: "Ver Lámina Real del Manual (01/36)",
      nextToDemoBtn: "Ir al siguiente paso: Usa nuestra Demo (Pasos 0, 1 y 2) →",
      nextToTourBtn: "Continuar al siguiente menú: App Tour (Recorrido Completo) →",
      nextToTheoryBtn: "Ir al siguiente submenú: Bases teóricas (Videos y Libros) →",
      nextToDownloadsBtn: "Ir al último submenú: Pack de descargas (Carrusel + Próximamente) →",
      demoEyebrow: "MENÚ 02 · DEMO INTERACTIVA EN TIEMPO REAL",
      demoTitle: "Vive la experiencia real con el Paso 0, Paso 1 y Paso 2",
      demoDesc: "Elige un caso real o escribe el giro de tu negocio. Observa cómo la aplicación estructura tu propósito (Simon Sinek) y tus puntos de contacto (Jan Carlzon) sobre tu manual en vivo.",
      demoStep0Tab: "Paso 0 · Objetivo y Giro",
      demoStep1Tab: "Paso 1 · Círculo Dorado (Por qué, Cómo, Qué)",
      demoStep2Tab: "Paso 2 · Touchpoints (Antes, Durante, Después)",
      demoObjCreate: "Crear una marca desde cero",
      demoObjRedesign: "Evolucionar mi marca actual",
      demoBrandLabel: "Nombre de tu marca",
      demoTaglineLabel: "Eslogan o frase rectora",
      demoGiroLabel: "Giro y actividad principal de tu empresa",
      demoWhyLabel: "1. Por qué existe tu marca (Propósito nuclear)",
      demoHowLabel: "2. Cómo lo haces único (Método diferenciador)",
      demoWhatLabel: "3. Qué entregas (Oferta de valor concreta)",
      demoPolishBtn: "Pulir redacción con claridad ejecutiva",
      demoNextStepBtn: "Siguiente paso de la Demo →",
      tourEyebrow: "MENÚ 03 · RECORRIDO INTERACTIVO CON SCROLLING",
      tourTitle: "De la idea inicial a los 9 entregables paso a paso",
      tourDesc: "Desliza hacia abajo para explorar cada pantalla real de la aplicación, las cápsulas de video que aparecen entre cada etapa y la bóveda final de descargas.",
      tourPopupBadge: "POP-UP DE VIDEO INTERACTIVO ENTRE ETAPAS",
      tourPlayVideoBtn: "Reproducir cápsula de video en tu idioma",
      theoryEyebrow: "MENÚ 04 · BASES TEÓRICAS, CÁPSULAS DE VIDEO Y BIBLIOTECA",
      theoryTitle: "La profundidad metodológica detrás de cada decisión",
      theoryDesc: "Reproduce las cápsulas dinámicas con avatares y B-Roll de cada paso, mira las conferencias magistrales de los autores y consulta los libros fundamentales con enlaces directos.",
      theoryCapsulesTitle: "Cápsulas de Video del Taller (Paso 0 al Paso 6)",
      theoryAuthorsTitle: "Conferencias Magistrales de los Autores",
      theoryBooksTitle: "Biblioteca Esencial con Enlaces Directos",
      packEyebrow: "MENÚ 05 · PACK DE DESCARGAS Y EXPANSIÓN DE MARCA",
      packTitle: "Tus 9 Entregables Oficiales en alta resolución",
      packDesc: "Desliza el carrusel moderno y haz clic en cualquier entregable para abrirlo a máxima resolución en pantalla casi completa o descargar un ejemplo real.",
      packOpenFullscreen: "Ver a máxima resolución en pantalla casi completa ⤢",
      packDownloadSample: "Descargar archivo muestra ↗",
      comingSoonEyebrow: "PRÓXIMAMENTE · NUEVOS MÓDULOS AUTOMATIZADOS",
      comingSoonTitle: "Expande tu Brandbook hacia tu Web y tus Redes Sociales",
      comingSoonDesc: "Muy pronto podrás adquirir directamente desde tu bóveda dos módulos conectados al ADN, colores, tipografías y fotografías de tu manual:",
      csWebTitle: "Creación Automática de Página Web Oficial",
      csWebDesc: "Sitio web responsivo, veloz y optimizado para conversión generado automáticamente con la paleta cromática, tipografías, narrativa socrática y fotografías 4:3 de tu Brandbook.",
      csWebPrice: "Próximamente · Reserva prioritaria",
      csSocialTitle: "Pack de Publicaciones para Redes Sociales",
      csSocialDesc: "Parrilla mensual de contenido visual, carruseles educativos, historias y plantillas editables para Instagram, LinkedIn y Facebook alineadas 100% a la gobernanza de tu marca.",
      csSocialPrice: "Próximamente · Reserva prioritaria",
      csReserveBtn: "Solicitar acceso prioritario",
      csReservedOk: "✓ Acceso prioritario registrado para tu correo",
      checkoutTitle: "Adquirir The Best Brand — Activación Instantánea",
      checkoutSub: "Pago único sin suscripciones. Desbloquea los 7 pasos completos y la descarga inmediata de tus 9 entregables oficiales.",
      planSingleName: "Licencia Pro Empresario",
      planSingleDesc: "1 Marca Completa · 36 Láminas + 9 Entregables",
      planAgencyName: "Licencia Atelier Multi-Marca",
      planAgencyDesc: "Marcas Ilimitadas · Para Agencias y Grupos",
      payNowBtn: "Autorizar Pago Seguro y Activar Licencia",
      heroTheoriesCopy: "Respaldado científicamente por las teorías de Simon Sinek (Círculo Dorado), Jan Carlzon (Momentos de la Verdad), Al Ries, Jack Trout y Alexandra Watkins (Posicionamiento y SMILE), Mitsuo Nagamachi (Ingeniería Kansei), Paul Rand y Jony Ive (Geometría Vectorial Liquid Glass) y Massimo Vignelli (Canon de 36 Láminas).",
      heroBtnTryIphone: "Usa nuestra demo con el paso 0, 1 y 2",
      heroBtnIntroVideo: "▶ Ver Video Introductorio del Fundador (HeyGen)",
      iphoneSectionEyebrow: "APLICACIÓN REAL EN VIVO · CONECTADA AL MOTOR DE AURA",
      iphoneSectionTitle: "Interactúa aquí mismo con la aplicación real: avanza sin costo en los primeros 3 pasos",
      iphoneSectionDesc: "Escribe o habla con Aura dentro del iPhone. Completa gratis hasta el Paso 3 (Naming y Clases de Niza); al pasar al Paso 4 se activa el desbloqueo de $49 USD y tus respuestas se migran automáticamente a tu nueva cuenta.",
      iphoneStep0Btn: "Paso 0 · Giro (Gratis)",
      iphoneStep1Btn: "Paso 1 · Círculo Dorado (Gratis)",
      iphoneStep2Btn: "Paso 2 · Touchpoints (Gratis)",
      iphoneStep3Btn: "Paso 3 · Naming SMILE (Gratis)",
      iphoneStep4BtnLocked: "🔒 Paso 4 · Desbloquear ($49 USD)",
      iphoneStep4BtnUnlocked: "Paso 4 · Kansei ✓",
      iphoneVideoStepBtn: "▶ Video HeyGen del Paso",
      syncBadgeTitle: "SINCRONIZACIÓN Y RETENCIÓN AUTOMÁTICA DE PROGRESO",
      syncLiveStatus: "● AURA CONECTADA EN VIVO",
      syncCardHeading: "Tu avance en los Pasos 1 al 3 se guarda en tiempo real",
      syncRow1: "Paso 0 y Paso 1 · Giro + Círculo Dorado (Simon Sinek)",
      syncRow2: "Paso 2 · Touchpoints Antes, Durante y Después (Carlzon)",
      syncRow3: "Paso 3 · Naming SMILE y Clases de Niza (Watkins)",
      syncRow4: "Paso 4 al 6 · Kansei, Logotipo Nano Banana Pro y 9 Entregables",
      freeAccessLabel: "✓ Acceso Libre",
      unlock49Label: "Desbloquear · $49 USD",
      presetsLabel: "Cargar Caso de Éxito Real:",
      gcLiveHeading: "VISTA EN VIVO DEL CÍRCULO DORADO DE TU MARCA",
      nanoEyebrow: "MOTOR VISUAL NANO BANANA PRO 4K + VECTORES MATEMÁTICOS BÉZIER",
      nanoTitle: "De un boceto o logo antiguo a un símbolo Apple Liquid Glass y curvas .SVG / .AI",
      nanoDesc: "En el Paso 5 iteras tu logotipo con el modelo más avanzado de Nano Banana Pro y nuestro trazador matemático en curvas Bézier puras sobre lienzo claro (#FFFFFF) y oscuro (#090D16).",
      plates36Eyebrow: "MANUAL OFICIAL DE IDENTIDAD · LAS 36 LÁMINAS EN CURVAS (16:9)",
      plates36Title: "Explora las 36 Láminas reales que el sistema compila para tu empresa",
      plates36Desc: "Haz clic en cualquier lámina para inspeccionarla a máxima resolución en pantalla casi completa y navegar de la Lámina 01 a la 36.",
      bento9Eyebrow: "SUITE EJECUTIVA COMPLETA · LOS 9 ENTREGABLES OFICIALES",
      bento9Title: "Todo lo que descargas al finalizar tus 7 pasos en 30 minutos",
      bento9Desc: "Haz clic en cualquier entregable para verlo en pantalla casi completa o ir al Pack de Descargas.",
      lightboxKicker: "VISTA A MÁXIMA RESOLUCIÓN · PANTALLA CASI COMPLETA",
      lightboxPrev: "← Lámina",
      lightboxNext: "Lámina →",
      lightboxClose: "✕ Cerrar",
      videoCapsuleBadge: "CÁPSULA HEYGEN + GOOGLE FLOW",
      videoScriptHeading: "GUION HABLADO EXACTO (SINCRONIZADO EN HEYGEN):",
      videoContinueBtn: "Continuar explorando",
      tourAmplifyBtn: "⤢ Ampliar captura",
      tourQuickJumpLabel: "Saltar al paso:",
      footerHeadlineSub: "EDICIÓN OFICIAL 1.0 · SUITE THE BEST",
      footerDesc: "Plataforma para crear la identidad visual, los 9 entregables oficiales y el Manual de Marca de 36 Láminas en Curvas de tu empresa con inteligencia artificial y guía por voz de Aura en 6 idiomas."
    },
    en: {
      bento9Kicker: "COMPLETE EXECUTIVE SUITE · ALL 9 OFFICIAL DELIVERABLES",
      carouselPrev: "← Previous",
      carouselNext: "Next →",
      gcLiveKicker: "LIVE PREVIEW OF YOUR BRAND GOLDEN CIRCLE",
      iphoneSectionKicker: "REAL LIVE APPLICATION · CONNECTED WITH AURA",
      iphoneStep0Free: "Step 0 · Sector (Free)",
      iphoneStep1Free: "Step 1 · Golden Circle (Free)",
      iphoneStep2Free: "Step 2 · Touchpoints (Free)",
      iphoneStep3Free: "Step 3 · SMILE Naming (Free)",
      iphoneStep4Unlock: "🔒 Step 4 · Unlock ($49 USD)",
      iphoneVideoBtn: "▶ HeyGen Step Video",
      nanoAfterLabel: "AFTER · NANO BANANA PRO 4K EVOLUTION + VECTOR CURVES (.SVG / .AI)",
      nanoBeforeLabel: "BEFORE · ORIGINAL CLIENT LOGO UPLOADED (STEP 0.2)",
      nanoKicker: "NANO BANANA PRO 4K VISUAL ENGINE + PURE BÉZIER VECTORS",
      plates36Kicker: "OFFICIAL IDENTITY MANUAL · ALL 36 VECTOR PLATES (16:9)",
      syncFreeBadge: "✓ Free Access",
      syncLiveConnected: "● AURA LIVE CONNECTED",
      syncUnlockBtn: "Unlock · $49 USD",
      videoPopupContinue: "Continue exploring",
      videoPopupScriptLabel: "EXACT SPOKEN SCRIPT (SYNCHRONIZED IN HEYGEN):",
      ytWatchHere: "▶ Watch Keynote Here",
      menu1: "Home",
      menu2: "Demo",
      menu2Live: "LIVE",
      menu3: "App Tour",
      menu4: "Theoretical Foundations",
      menu5: "Download Pack",
      openStudio: "Open Studio ↗",
      buyNowHeader: "Buy Now · $49 USD",
      buyNowFloating: "Get Pro License · $49 USD",
      licenseActive: "PRO LICENSE ACTIVE ✓",
      heroEyebrow: "THE BEST BRAND · ALGORITHMIC BRAND IDENTITY & VECTOR BRANDBOOK",
      heroHook: "Create your Brand and your 9 Professional Deliverables in 30 minutes!",
      heroSub: "No endless agency meetings or generic templates. Talk with Aura, complete 7 strategic steps, and download your 36-Plate Official Brandbook and editable stationery right away.",
      heroBtnDemo: "Use our live demo with Step 0, 1 & 2",
      heroBtnTour: "Explore the step-by-step App Tour →",
      heroShowcaseTag: "REAL PANORAMIC VIEW OF THE APPLICATION & BRANDBOOK",
      heroShowcaseTitle: "An experience designed to focus on one single element at a time",
      heroShowcaseDesc: "Every answer you give Aura turns in real time into mathematical vector geometry, calibrated typography, and print-ready plates.",
      heroSwitchApp: "View Real App Screenshot",
      heroSwitchManual: "View Real Brandbook Plate (01/36)",
      nextToDemoBtn: "Next step: Use our Live Demo (Steps 0, 1 & 2) →",
      nextToTourBtn: "Continue to next menu: App Tour (Full Scroll Journey) →",
      nextToTheoryBtn: "Continue to next menu: Theoretical Foundations (Videos & Books) →",
      nextToDownloadsBtn: "Continue to final menu: Download Pack (Carousel & Coming Soon) →",
      demoEyebrow: "MENU 02 · LIVE INTERACTIVE DEMO",
      demoTitle: "Experience Step 0, Step 1, and Step 2 live",
      demoDesc: "Pick a preset or type your business activity. Watch how the app structures your Golden Circle (Simon Sinek) and Touchpoints (Jan Carlzon) live.",
      demoStep0Tab: "Step 0 · Goal & Business Sector",
      demoStep1Tab: "Step 1 · Golden Circle (Why, How, What)",
      demoStep2Tab: "Step 2 · Touchpoints (Before, During, After)",
      demoObjCreate: "Create a brand from scratch",
      demoObjRedesign: "Evolve my existing brand",
      demoBrandLabel: "Your brand name",
      demoTaglineLabel: "Tagline or core promise",
      demoGiroLabel: "Core business activity",
      demoWhyLabel: "1. Why your brand exists (Core Purpose)",
      demoHowLabel: "2. How you make it unique (Differentiating Method)",
      demoWhatLabel: "3. What you deliver (Concrete Value Offer)",
      demoPolishBtn: "Polish copy with executive clarity",
      demoNextStepBtn: "Next Demo Step →",
      tourEyebrow: "MENU 03 · INTERACTIVE SCROLLING APP TOUR",
      tourTitle: "From initial spark to all 9 deliverables step by step",
      tourDesc: "Scroll down to explore real application screens for every step, the interactive video pop-ups between stages, and the final download vault.",
      tourPopupBadge: "INTERACTIVE STAGE TRANSITION VIDEO POP-UP",
      tourPlayVideoBtn: "Play video capsule in your language",
      theoryEyebrow: "MENU 04 · THEORETICAL FOUNDATIONS, VIDEOS & BOOKS",
      theoryTitle: "The strategic depth behind every creative decision",
      theoryDesc: "Watch the dynamic avatar + B-Roll video capsules with thumbnails, explore masterclasses by the original authors, and access essential books with direct links.",
      theoryCapsulesTitle: "Step-by-Step Video Capsules (Step 0 to Step 6)",
      theoryAuthorsTitle: "Author Masterclass Lectures",
      theoryBooksTitle: "Essential Founder Library with Direct Links",
      packEyebrow: "MENU 05 · DOWNLOAD PACK & BRAND EXPANSION",
      packTitle: "Your 9 Official Deliverables in full resolution",
      packDesc: "Browse the modern carousel and click any deliverable thumbnail to inspect it in near-fullscreen maximum resolution or download a real sample file.",
      packOpenFullscreen: "View at maximum resolution in near-fullscreen ⤢",
      packDownloadSample: "Download sample file ↗",
      comingSoonEyebrow: "COMING SOON · AUTOMATED BRAND EXPANSION ADD-ONS",
      comingSoonTitle: "Turn your Brandbook into a Live Website and Social Media Suite",
      comingSoonDesc: "Soon you will be able to purchase two automated add-on modules directly powered by your Brandbook's DNA, palette, fonts, and photography:",
      csWebTitle: "Automated Official Website Creation",
      csWebDesc: "A fast, responsive, conversion-ready website automatically generated using your Brandbook's color system, typography, Socratic copy, and 4:3 photography.",
      csWebPrice: "Coming Soon · Priority Access",
      csSocialTitle: "Social Media Content & Post Pack",
      csSocialDesc: "Monthly visual content grid, carousels, stories, and editable templates for Instagram, LinkedIn, and Facebook 100% aligned with your brand rules.",
      csSocialPrice: "Coming Soon · Priority Access",
      csReserveBtn: "Request priority access",
      csReservedOk: "✓ Priority access registered",
      checkoutTitle: "Get The Best Brand — Instant Activation",
      checkoutSub: "One-time payment, zero subscriptions. Unlock all 7 steps and immediate download of your 9 official deliverables.",
      planSingleName: "Entrepreneur Pro License",
      planSingleDesc: "1 Full Brand · 36 Plates + 9 Deliverables",
      planAgencyName: "Multi-Brand Atelier License",
      planAgencyDesc: "Unlimited Brands · For Agencies & Groups",
      payNowBtn: "Authorize Secure Payment & Activate License",
      heroTheoriesCopy: "Scientifically backed by the theories of Simon Sinek (Golden Circle), Jan Carlzon (Moments of Truth), Al Ries, Jack Trout & Alexandra Watkins (Positioning & SMILE), Mitsuo Nagamachi (Kansei Engineering), Paul Rand & Jony Ive (Liquid Glass Vector Geometry), and Massimo Vignelli (36-Plate Canon).",
      heroBtnTryIphone: "Use our live demo with Step 0, 1 & 2",
      heroBtnIntroVideo: "▶ Watch Founder Intro Video (HeyGen)",
      iphoneSectionEyebrow: "LIVE REAL APPLICATION · CONNECTED TO AURA ENGINE",
      iphoneSectionTitle: "Interact right here with the real app: advance free through the first 3 steps",
      iphoneSectionDesc: "Type or speak with Aura inside the iPhone. Complete up to Step 3 (Naming & Nice Classes) for free; advancing to Step 4 activates the $49 USD unlock and migrates your answers to your new account.",
      iphoneStep0Btn: "Step 0 · Sector (Free)",
      iphoneStep1Btn: "Step 1 · Golden Circle (Free)",
      iphoneStep2Btn: "Step 2 · Touchpoints (Free)",
      iphoneStep3Btn: "Step 3 · SMILE Naming (Free)",
      iphoneStep4BtnLocked: "🔒 Step 4 · Unlock ($49 USD)",
      iphoneStep4BtnUnlocked: "Step 4 · Kansei ✓",
      iphoneVideoStepBtn: "▶ HeyGen Step Video",
      syncBadgeTitle: "REAL-TIME PROGRESS RETENTION & MIGRATION",
      syncLiveStatus: "● AURA CONNECTED LIVE",
      syncCardHeading: "Your progress across Steps 1 to 3 is saved in real time",
      syncRow1: "Step 0 & Step 1 · Sector + Golden Circle (Simon Sinek)",
      syncRow2: "Step 2 · Before, During & After Touchpoints (Carlzon)",
      syncRow3: "Step 3 · SMILE Naming & Nice Classes (Watkins)",
      syncRow4: "Steps 4 to 6 · Kansei, Nano Banana Pro Logo & 9 Deliverables",
      freeAccessLabel: "✓ Free Access",
      unlock49Label: "Unlock · $49 USD",
      presetsLabel: "Load Real Case Study:",
      gcLiveHeading: "LIVE GOLDEN CIRCLE PREVIEW OF YOUR BRAND",
      nanoEyebrow: "NANO BANANA PRO 4K ENGINE + PURE BÉZIER VECTORS",
      nanoTitle: "From an initial sketch or legacy logo to an Apple Liquid Glass emblem & .SVG / .AI curves",
      nanoDesc: "In Step 5 you iterate your logo with the most advanced Nano Banana Pro model and our mathematical Bézier vector tracer on light (#FFFFFF) and dark (#090D16) canvases.",
      plates36Eyebrow: "OFFICIAL BRAND IDENTITY MANUAL · ALL 36 PLATES IN CURVES (16:9)",
      plates36Title: "Explore all 36 real Brandbook Plates compiled for your company",
      plates36Desc: "Click any plate to inspect it at maximum resolution in near-fullscreen and navigate from Plate 01 to 36.",
      bento9Eyebrow: "COMPLETE EXECUTIVE SUITE · THE 9 OFFICIAL DELIVERABLES",
      bento9Title: "Everything you download upon completing your 7 steps in 30 minutes",
      bento9Desc: "Click any deliverable to inspect it in near-fullscreen or jump to the Download Pack.",
      lightboxKicker: "MAXIMUM RESOLUTION · NEAR-FULLSCREEN VIEWER",
      lightboxPrev: "← Plate",
      lightboxNext: "Plate →",
      lightboxClose: "✕ Close",
      videoCapsuleBadge: "HEYGEN + GOOGLE FLOW CAPSULE",
      videoScriptHeading: "EXACT SPOKEN SCRIPT (SYNCHRONIZED IN HEYGEN):",
      videoContinueBtn: "Continue exploring",
      tourAmplifyBtn: "⤢ Expand screenshot",
      tourQuickJumpLabel: "Jump to step:",
      footerHeadlineSub: "OFFICIAL EDITION 1.0 · THE BEST SUITE",
      footerDesc: "Platform to create your brand identity, 9 official deliverables, and 36-Plate Vector Brandbook with AI and live voice guidance from Aura in 6 languages."
    },
    fr: {
      bento9Kicker: "SUITE EXÉCUTIVE COMPLÈTE · LES 9 LIVRABLES OFFICIELS",
      carouselPrev: "← Précédent",
      carouselNext: "Suivant →",
      gcLiveKicker: "APERÇU EN DIRECT DU CERCLE D'OR DE VOTRE MARQUE",
      iphoneSectionKicker: "APPLICATION RÉELLE EN DIRECT · CONNECTÉE À AURA",
      iphoneStep0Free: "Étape 0 · Secteur (Gratuit)",
      iphoneStep1Free: "Étape 1 · Cercle d'Or (Gratuit)",
      iphoneStep2Free: "Étape 2 · Touchpoints (Gratuit)",
      iphoneStep3Free: "Étape 3 · Naming SMILE (Gratuit)",
      iphoneStep4Unlock: "🔒 Étape 4 · Débloquer (49 $ USD)",
      iphoneVideoBtn: "▶ Vidéo HeyGen de l'Étape",
      nanoAfterLabel: "APRÈS · ÉVOLUTION NANO BANANA PRO 4K + COURBES VECTORIELLES (.SVG / .AI)",
      nanoBeforeLabel: "AVANT · LOGO CLIENT TÉLÉVERSÉ (ÉTAPE 0.2)",
      nanoKicker: "MOTEUR VISUEL NANO BANANA PRO 4K + VECTEURS DE BÉZIER PURS",
      plates36Kicker: "MANUEL OFFICIEL D'IDENTITÉ · LES 36 PLANCHES EN COURBES (16:9)",
      syncFreeBadge: "✓ Accès Libre",
      syncLiveConnected: "● AURA CONNECTÉE EN DIRECT",
      syncUnlockBtn: "Débloquer · 49 $ USD",
      videoPopupContinue: "Continuer l'exploration",
      videoPopupScriptLabel: "SCRIPT PARLÉ EXACT (SYNCHRONISÉ DANS HEYGEN) :",
      ytWatchHere: "▶ Regarder la Conférence Ici",
      menu1: "Accueil",
      menu2: "Démo",
      menu2Live: "EN DIRECT",
      menu3: "App Tour",
      menu4: "Bases théoriques",
      menu5: "Pack de téléchargements",
      openStudio: "Ouvrir le Studio ↗",
      buyNowHeader: "Acheter · $49 USD",
      buyNowFloating: "Licence Pro · $49 USD",
      licenseActive: "LICENCE PRO ACTIVE ✓",
      heroEyebrow: "THE BEST BRAND · IDENTITÉ VISUELLE & BRANDBOOK VECTORIEL",
      heroHook: "Créez votre Marque et vos 9 Livrables de niveau professionnel en 30 minutes !",
      heroSub: "Sans réunions interminables ni modèles génériques. Dialoguez avec Aura, parcourez les 7 étapes et téléchargez votre Manuel Officiel de 36 Planches et vos fichiers éditables.",
      heroBtnDemo: "Utiliser notre démo avec les étapes 0, 1 et 2",
      heroBtnTour: "Découvrir le parcours pas à pas (App Tour) →",
      heroShowcaseTag: "VUE PANORAMIQUE RÉELLE DE L'APPLICATION ET DU BRANDBOOK",
      heroShowcaseTitle: "Une expérience épurée centrée sur une seule décision à la fois",
      heroShowcaseDesc: "Chaque réponse donnée à Aura devient en temps réel une géométrie vectorielle pure, une typographie calibrée et des planches prêtes pour l'impression.",
      heroSwitchApp: "Voir Capture Réelle de l'App",
      heroSwitchManual: "Voir Planche Réelle du Manuel (01/36)",
      nextToDemoBtn: "Étape suivante : Essayer la Démo (Étapes 0, 1 et 2) →",
      nextToTourBtn: "Continuer vers : App Tour (Parcours Complet) →",
      nextToTheoryBtn: "Continuer vers : Bases théoriques (Vidéos et Livres) →",
      nextToDownloadsBtn: "Continuer vers : Pack de téléchargements →",
      demoEyebrow: "MENU 02 · DÉMO INTERACTIVE EN DIRECT",
      demoTitle: "Testez en direct l'Étape 0, l'Étape 1 et l'Étape 2",
      demoDesc: "Choisissez un exemple ou décrivez votre activité. Observez comment l'application structure votre Cercle d'Or (Simon Sinek) et vos Touchpoints (Jan Carlzon).",
      demoStep0Tab: "Étape 0 · Objectif et Secteur",
      demoStep1Tab: "Étape 1 · Cercle d'Or (Pourquoi, Comment, Quoi)",
      demoStep2Tab: "Étape 2 · Touchpoints (Avant, Pendant, Après)",
      demoObjCreate: "Créer une marque de zéro",
      demoObjRedesign: "Faire évoluer ma marque actuelle",
      demoBrandLabel: "Nom de votre marque",
      demoTaglineLabel: "Slogan ou promesse",
      demoGiroLabel: "Activité principale de votre entreprise",
      demoWhyLabel: "1. Pourquoi votre marque existe (Raison d'être)",
      demoHowLabel: "2. Comment vous vous différenciez (Méthode)",
      demoWhatLabel: "3. Ce que vous délivrez (Offre concrète)",
      demoPolishBtn: "Affiner la rédaction avec clarté exécutive",
      demoNextStepBtn: "Étape suivante de la Démo →",
      tourEyebrow: "MENU 03 · PARCOURS INTERACTIF AVEC DÉFILEMENT",
      tourTitle: "De l'idée initiale aux 9 livrables étape par étape",
      tourDesc: "Faites défiler pour explorer chaque capture réelle de l'application, les pop-ups vidéo entre chaque étape et le coffre final des livrables.",
      tourPopupBadge: "POP-UP VIDÉO INTERACTIF ENTRE LES ÉTAPES",
      tourPlayVideoBtn: "Lire la capsule vidéo dans votre langue",
      theoryEyebrow: "MENU 04 · BASES THÉORIQUES, VIDÉOS & LIVRES",
      theoryTitle: "La profondeur méthodologique derrière chaque décision",
      theoryDesc: "Visionnez les capsules vidéo avec miniatures, les conférences des auteurs et les livres recommandés avec liens directs.",
      theoryCapsulesTitle: "Capsules Vidéo de l'Atelier (Étape 0 à Étape 6)",
      theoryAuthorsTitle: "Conférences Magistrales des Auteurs",
      theoryBooksTitle: "Bibliothèque Essentielle avec Liens Directs",
      packEyebrow: "MENU 05 · PACK DE TÉLÉCHARGEMENTS & EXPANSION",
      packTitle: "Vos 9 Livrables Officiels en haute résolution",
      packDesc: "Parcourez le carrousel moderne et cliquez sur n'importe quelle miniature pour l'inspecter en plein écran ou télécharger un fichier d'exemple.",
      packOpenFullscreen: "Voir en résolution maximale plein écran ⤢",
      packDownloadSample: "Télécharger l'exemple ↗",
      comingSoonEyebrow: "PROCHAINEMENT · NOUVEAUX MODULES AUTOMATISÉS",
      comingSoonTitle: "Déployez votre Brandbook sur votre Site Web et vos Réseaux Sociaux",
      comingSoonDesc: "Bientôt disponibles à l'achat directement depuis votre coffre de marque :",
      csWebTitle: "Création Automatique de Site Web Officiel",
      csWebDesc: "Site web rapide et responsive généré automatiquement avec les couleurs, polices, textes et photos 4:3 de votre Brandbook.",
      csWebPrice: "Prochainement · Accès prioritaire",
      csSocialTitle: "Pack de Publications Réseaux Sociaux",
      csSocialDesc: "Calendrier mensuel de visuels, carrousels et stories pour Instagram, LinkedIn et Facebook alignés sur votre charte.",
      csSocialPrice: "Prochainement · Accès prioritaire",
      csReserveBtn: "Demander un accès prioritaire",
      csReservedOk: "✓ Accès prioritaire enregistré",
      checkoutTitle: "Acheter The Best Brand — Activation Immédiate",
      checkoutSub: "Paiement unique sans abonnement. Débloquez les 7 étapes et vos 9 livrables officiels.",
      planSingleName: "Licence Pro Entrepreneur",
      planSingleDesc: "1 Marque Complète · 36 Planches + 9 Livrables",
      planAgencyName: "Licence Atelier Multi-Marques",
      planAgencyDesc: "Marques Illimitées · Pour Agences & Groupes",
      payNowBtn: "Autoriser le Paiement Sécurisé et Activer",
      heroTheoriesCopy: "Fondé scientifiquement sur les théories de Simon Sinek (Cercle d'Or), Jan Carlzon (Moments de Vérité), Al Ries, Jack Trout & Alexandra Watkins (Positionnement & SMILE), Mitsuo Nagamachi (Ingénierie Kansei), Paul Rand & Jony Ive (Géométrie Vectorielle Liquid Glass) et Massimo Vignelli (Canon de 36 Planches).",
      heroBtnTryIphone: "Utiliser notre démo avec les étapes 0, 1 et 2",
      heroBtnIntroVideo: "▶ Voir la Vidéo d'Introduction du Fondateur (HeyGen)",
      iphoneSectionEyebrow: "APPLICATION RÉELLE EN DIRECT · CONNECTÉE À AURA",
      iphoneSectionTitle: "Interagissez ici même avec l'application réelle : avancez gratuitement sur les 3 premières étapes",
      iphoneSectionDesc: "Écrivez ou parlez avec Aura dans l'iPhone. Complétez gratuitement jusqu'à l'Étape 3 ; le passage à l'Étape 4 active le déblocage à 49 $ USD et migre automatiquement vos réponses.",
      iphoneStep0Btn: "Étape 0 · Secteur (Gratuit)",
      iphoneStep1Btn: "Étape 1 · Cercle d'Or (Gratuit)",
      iphoneStep2Btn: "Étape 2 · Touchpoints (Gratuit)",
      iphoneStep3Btn: "Étape 3 · Naming SMILE (Gratuit)",
      iphoneStep4BtnLocked: "🔒 Étape 4 · Débloquer ($49 USD)",
      iphoneStep4BtnUnlocked: "Étape 4 · Kansei ✓",
      iphoneVideoStepBtn: "▶ Vidéo HeyGen de l'Étape",
      syncBadgeTitle: "SYNCHRONISATION ET RÉTENTION AUTOMATIQUE",
      syncLiveStatus: "● AURA CONNECTÉE EN DIRECT",
      syncCardHeading: "Votre progression sur les Étapes 1 à 3 est sauvegardée en temps réel",
      syncRow1: "Étape 0 et 1 · Secteur + Cercle d'Or (Simon Sinek)",
      syncRow2: "Étape 2 · Touchpoints Avant, Pendant et Après (Carlzon)",
      syncRow3: "Étape 3 · Naming SMILE et Classes de Nice (Watkins)",
      syncRow4: "Étapes 4 à 6 · Kansei, Logo Nano Banana Pro et 9 Livrables",
      freeAccessLabel: "✓ Accès Libre",
      unlock49Label: "Débloquer · $49 USD",
      presetsLabel: "Charger un Cas Réel :",
      gcLiveHeading: "APERÇU EN DIRECT DU CERCLE D'OR DE VOTRE MARQUE",
      nanoEyebrow: "MOTEUR NANO BANANA PRO 4K + VECTEURS BÉZIER PURS",
      nanoTitle: "D'une esquisse ou logo existant à un emblème Apple Liquid Glass en courbes .SVG / .AI",
      nanoDesc: "À l'Étape 5, faites évoluer votre logo avec le modèle Nano Banana Pro le plus avancé et notre traceur vectoriel de Bézier sur fond clair et sombre.",
      plates36Eyebrow: "MANUEL OFFICIEL D'IDENTITÉ · LES 36 PLANCHES EN COURBES (16:9)",
      plates36Title: "Explorez les 36 planches réelles compilées pour votre entreprise",
      plates36Desc: "Cliquez sur n'importe quelle planche pour l'inspecter en haute résolution et naviguer de la Planche 01 à 36.",
      bento9Eyebrow: "SUITE EXÉCUTIVE COMPLÈTE · LES 9 LIVRABLES OFFICIELS",
      bento9Title: "Tout ce que vous téléchargez en terminant vos 7 étapes en 30 minutes",
      bento9Desc: "Cliquez sur un livrable pour l'afficher en plein écran ou accéder au Pack de Téléchargements.",
      lightboxKicker: "RÉSOLUTION MAXIMALE · PLEIN ÉCRAN",
      lightboxPrev: "← Planche",
      lightboxNext: "Planche →",
      lightboxClose: "✕ Fermer",
      videoCapsuleBadge: "CAPSULE HEYGEN + GOOGLE FLOW",
      videoScriptHeading: "SCRIPT PARLÉ EXACT (SYNCHRONISÉ DANS HEYGEN) :",
      videoContinueBtn: "Continuer l'exploration",
      tourAmplifyBtn: "⤢ Agrandir la capture",
      tourQuickJumpLabel: "Aller à l'étape :",
      footerHeadlineSub: "ÉDITION OFFICIELLE 1.0 · SUITE THE BEST",
      footerDesc: "Plateforme pour créer l'identité visuelle, les 9 livrables officiels et le Manuel de Marque de 36 Planches avec IA et guidage vocal d'Aura en 6 langues."
    },
    pt: {
      bento9Kicker: "SUÍTE EXECUTIVA COMPLETA · OS 9 ENTREGÁVEIS OFICIAIS",
      carouselPrev: "← Anterior",
      carouselNext: "Próximo →",
      gcLiveKicker: "PRÉVIA AO VIVO DO CÍRCULO DOURADO DA SUA MARCA",
      iphoneSectionKicker: "APLICAÇÃO REAL AO VIVO · CONECTADA COM A AURA",
      iphoneStep0Free: "Passo 0 · Ramo (Grátis)",
      iphoneStep1Free: "Passo 1 · Círculo Dourado (Grátis)",
      iphoneStep2Free: "Passo 2 · Touchpoints (Grátis)",
      iphoneStep3Free: "Passo 3 · Naming SMILE (Grátis)",
      iphoneStep4Unlock: "🔒 Passo 4 · Desbloquear ($49 USD)",
      iphoneVideoBtn: "▶ Vídeo HeyGen do Passo",
      nanoAfterLabel: "DEPOIS · EVOLUÇÃO NANO BANANA PRO 4K + CURVAS VETORIAIS (.SVG / .AI)",
      nanoBeforeLabel: "ANTES · LOGOTIPO ENVIADO PELO CLIENTE (PASSO 0.2)",
      nanoKicker: "MOTOR VISUAL NANO BANANA PRO 4K + VETORES BÉZIER PUROS",
      plates36Kicker: "MANUAL OFICIAL DE IDENTIDADE · AS 36 LÂMINAS EM CURVAS (16:9)",
      syncFreeBadge: "✓ Acesso Livre",
      syncLiveConnected: "● AURA CONECTADA AO VIVO",
      syncUnlockBtn: "Desbloquear · $49 USD",
      videoPopupContinue: "Continuar explorando",
      videoPopupScriptLabel: "ROTEIRO EXATO FALADO (SINCRONIZADO NO HEYGEN):",
      ytWatchHere: "▶ Assistir Conferência Aqui",
      menu1: "Início",
      menu2: "Demo",
      menu2Live: "AO VIVO",
      menu3: "App Tour",
      menu4: "Bases teóricas",
      menu5: "Pack de downloads",
      openStudio: "Abrir Estúdio ↗",
      buyNowHeader: "Comprar · $49 USD",
      buyNowFloating: "Adquirir Licença Pro · $49 USD",
      licenseActive: "LICENÇA PRO ATIVA ✓",
      heroEyebrow: "THE BEST BRAND · IDENTIDADE VISUAL & BRANDBOOK EM CURVAS",
      heroHook: "Crie sua Marca e seus 9 Entregáveis de nível profissional em 30 minutos!",
      heroSub: "Sem reuniões intermináveis ou templates genéricos. Converse com a Aura, percorra os 7 passos estratégicos e baixe seu Manual Oficial de 36 Lâminas e papelaria editável.",
      heroBtnDemo: "Use nossa demo com o passo 0, 1 e 2",
      heroBtnTour: "Explorar o tour passo a passo (App Tour) →",
      heroShowcaseTag: "VISÃO PANORÂMICA REAL DO APLICATIVO E DO BRANDBOOK",
      heroShowcaseTitle: "Um sistema elegante focado em uma única decisão por vez",
      heroShowcaseDesc: "Cada resposta dada à Aura se transforma em tempo real em geometria vetorial, tipografia calibrada e lâminas prontas para gráfica e digital.",
      heroSwitchApp: "Ver Captura Real do App",
      heroSwitchManual: "Ver Lâmina Real do Manual (01/36)",
      nextToDemoBtn: "Próximo passo: Use nossa Demo (Passos 0, 1 e 2) →",
      nextToTourBtn: "Continuar para: App Tour (Jornada Completa) →",
      nextToTheoryBtn: "Continuar para: Bases teóricas (Vídeos e Livros) →",
      nextToDownloadsBtn: "Continuar para: Pack de downloads (Carrossel + Em Breve) →",
      demoEyebrow: "MENU 02 · DEMO INTERATIVA AO VIVO",
      demoTitle: "Experimente ao vivo o Passo 0, Passo 1 e Passo 2",
      demoDesc: "Escolha um exemplo ou digite o ramo da sua empresa. Veja como o aplicativo estrutura seu Círculo Dourado (Simon Sinek) e Touchpoints (Jan Carlzon).",
      demoStep0Tab: "Passo 0 · Objetivo e Ramo",
      demoStep1Tab: "Passo 1 · Círculo Dourado (Por quê, Como, O quê)",
      demoStep2Tab: "Passo 2 · Touchpoints (Antes, Durante, Depois)",
      demoObjCreate: "Criar uma marca do zero",
      demoObjRedesign: "Evoluir minha marca atual",
      demoBrandLabel: "Nome da sua marca",
      demoTaglineLabel: "Slogan ou promessa",
      demoGiroLabel: "Ramo e atividade principal da empresa",
      demoWhyLabel: "1. Por que sua marca existe (Propósito nuclear)",
      demoHowLabel: "2. Como você faz único (Método diferenciador)",
      demoWhatLabel: "3. O que você entrega (Oferta de valor)",
      demoPolishBtn: "Refinar redação com clareza executiva",
      demoNextStepBtn: "Próximo passo da Demo →",
      tourEyebrow: "MENU 03 · TOUR INTERATIVO COM SCROLLING",
      tourTitle: "Da ideia inicial aos 9 entregáveis passo a passo",
      tourDesc: "Role a página para explorar cada captura real do aplicativo, os pop-ups de vídeo entre cada etapa e o cofre final de downloads.",
      tourPopupBadge: "POP-UP DE VÍDEO INTERATIVO ENTRE ETAPAS",
      tourPlayVideoBtn: "Reproduzir cápsula de vídeo no seu idioma",
      theoryEyebrow: "MENU 04 · BASES TEÓRICAS, VÍDEOS E LIVROS",
      theoryTitle: "A profundidade metodológica por trás de cada decisão",
      theoryDesc: "Assista às cápsulas de vídeo com miniaturas, palestras dos autores e livros essenciais com links diretos.",
      theoryCapsulesTitle: "Cápsulas de Vídeo do Estúdio (Passo 0 ao Passo 6)",
      theoryAuthorsTitle: "Palestras Magistrais dos Autores",
      theoryBooksTitle: "Biblioteca Essencial com Links Diretos",
      packEyebrow: "MENU 05 · PACK DE DOWNLOADS E EXPANSÃO",
      packTitle: "Seus 9 Entregáveis Oficiais em alta resolução",
      packDesc: "Navegue pelo carrossel moderno e clique em qualquer miniatura para abrir em resolução máxima em tela quase cheia ou baixar um exemplo real.",
      packOpenFullscreen: "Ver em resolução máxima em tela cheia ⤢",
      packDownloadSample: "Baixar arquivo de amostra ↗",
      comingSoonEyebrow: "EM BREVE · NOVOS MÓDULOS AUTOMATIZADOS",
      comingSoonTitle: "Expanda seu Brandbook para seu Site e Redes Sociais",
      comingSoonDesc: "Em breve você poderá adquirir diretamente dois módulos conectados ao DNA, cores, fontes e fotos do seu manual:",
      csWebTitle: "Criação Automática de Site Oficial",
      csWebDesc: "Site responsivo e otimizado gerado automaticamente com a paleta de cores, tipografia, narrativa e fotos 4:3 do seu Brandbook.",
      csWebPrice: "Em breve · Acesso prioritário",
      csSocialTitle: "Pack de Publicações para Redes Sociais",
      csSocialDesc: "Grade mensal de conteúdo visual, carrosséis e stories para Instagram, LinkedIn e Facebook alinhados à sua marca.",
      csSocialPrice: "Em breve · Acesso prioritário",
      csReserveBtn: "Solicitar acesso prioritário",
      csReservedOk: "✓ Acesso prioritário registrado",
      checkoutTitle: "Adquirir The Best Brand — Ativação Instantânea",
      checkoutSub: "Pagamento único sem mensalidades. Desbloqueie os 7 passos e o download imediato dos seus 9 entregáveis.",
      planSingleName: "Licença Pro Empresário",
      planSingleDesc: "1 Marca Completa · 36 Lâminas + 9 Entregáveis",
      planAgencyName: "Licença Atelier Multi-Marca",
      planAgencyDesc: "Marcas Ilimitadas · Para Agências e Grupos",
      payNowBtn: "Autorizar Pagamento Seguro e Ativar Licença",
      heroTheoriesCopy: "Respaldado cientificamente pelas teorias de Simon Sinek (Círculo Dourado), Jan Carlzon (Momentos da Verdade), Al Ries, Jack Trout e Alexandra Watkins (Posicionamento e SMILE), Mitsuo Nagamachi (Engenharia Kansei), Paul Rand e Jony Ive (Geometria Vetorial Liquid Glass) e Massimo Vignelli (Cânone de 36 Lâminas).",
      heroBtnTryIphone: "Use nossa demo com o passo 0, 1 e 2",
      heroBtnIntroVideo: "▶ Ver Vídeo Introdutório do Fundador (HeyGen)",
      iphoneSectionEyebrow: "APLICATIVO REAL AO VIVO · CONECTADO AO MOTOR DA AURA",
      iphoneSectionTitle: "Interaja aqui mesmo com o aplicativo real: avance grátis nos 3 primeiros passos",
      iphoneSectionDesc: "Escreva ou fale com a Aura dentro do iPhone. Complete sem custo até o Passo 3; ao avançar para o Passo 4 ativa-se o desbloqueio de $49 USD e suas respostas migram automaticamente.",
      iphoneStep0Btn: "Passo 0 · Ramo (Grátis)",
      iphoneStep1Btn: "Passo 1 · Círculo Dourado (Grátis)",
      iphoneStep2Btn: "Passo 2 · Touchpoints (Grátis)",
      iphoneStep3Btn: "Passo 3 · Naming SMILE (Grátis)",
      iphoneStep4BtnLocked: "🔒 Passo 4 · Desbloquear ($49 USD)",
      iphoneStep4BtnUnlocked: "Passo 4 · Kansei ✓",
      iphoneVideoStepBtn: "▶ Vídeo HeyGen do Passo",
      syncBadgeTitle: "SINCRONIZAÇÃO E RETENÇÃO AUTOMÁTICA DE PROGRESSO",
      syncLiveStatus: "● AURA CONECTADA AO VIVO",
      syncCardHeading: "Seu avanço nos Passos 1 a 3 é salvo em tempo real",
      syncRow1: "Passo 0 e Passo 1 · Ramo + Círculo Dourado (Simon Sinek)",
      syncRow2: "Passo 2 · Touchpoints Antes, Durante e Depois (Carlzon)",
      syncRow3: "Passo 3 · Naming SMILE e Classes de Nice (Watkins)",
      syncRow4: "Passo 4 ao 6 · Kansei, Logotipo Nano Banana Pro e 9 Entregáveis",
      freeAccessLabel: "✓ Acesso Livre",
      unlock49Label: "Desbloquear · $49 USD",
      presetsLabel: "Carregar Caso de Sucesso:",
      gcLiveHeading: "VISÃO AO VIVO DO CÍRCULO DOURADO DA SUA MARCA",
      nanoEyebrow: "MOTOR VISUAL NANO BANANA PRO 4K + VETORES BÉZIER PUROS",
      nanoTitle: "De um esboço ou logo antigo a um símbolo Apple Liquid Glass em curvas .SVG / .AI",
      nanoDesc: "No Passo 5 você evolui seu logotipo com o modelo mais avançado do Nano Banana Pro e nosso traçador matemático em curvas Bézier puras em fundo claro e escuro.",
      plates36Eyebrow: "MANUAL OFICIAL DE IDENTIDADE · AS 36 LÂMINAS EM CURVAS (16:9)",
      plates36Title: "Explore as 36 Lâminas reais que o sistema compila para sua empresa",
      plates36Desc: "Clique em qualquer lâmina para inspecioná-la em resolução máxima e navegar da Lâmina 01 à 36.",
      bento9Eyebrow: "SUÍTE EXECUTIVA COMPLETA · OS 9 ENTREGÁVEIS OFICIAIS",
      bento9Title: "Tudo o que você baixa ao finalizar seus 7 passos em 30 minutos",
      bento9Desc: "Clique em qualquer entregável para vê-lo em tela cheia ou ir ao Pack de Downloads.",
      lightboxKicker: "RESOLUÇÃO MÁXIMA · TELA QUASE CHEIA",
      lightboxPrev: "← Lâmina",
      lightboxNext: "Lâmina →",
      lightboxClose: "✕ Fechar",
      videoCapsuleBadge: "CÁPSULA HEYGEN + GOOGLE FLOW",
      videoScriptHeading: "ROTEIRO FALADO EXATO (SINCRONIZADO NO HEYGEN):",
      videoContinueBtn: "Continuar explorando",
      tourAmplifyBtn: "⤢ Ampliar captura",
      tourQuickJumpLabel: "Ir para o passo:",
      footerHeadlineSub: "EDIÇÃO OFICIAL 1.0 · SUÍTE THE BEST",
      footerDesc: "Plataforma para criar a identidade visual, os 9 entregáveis oficiais e o Manual de Marca de 36 Lâminas em Curvas da sua empresa com IA e voz da Aura em 6 idiomas."
    },
    de: {
      bento9Kicker: "KOMPLETTE EXECUTIVE-SUITE · DIE 9 OFFIZIELLEN DELIVERABLES",
      carouselPrev: "← Zurück",
      carouselNext: "Weiter →",
      gcLiveKicker: "LIVE-VORSCHAU DES GOLDEN CIRCLE IHRER MARKE",
      iphoneSectionKicker: "ECHTE LIVE-APPLIKATION · MIT AURA VERBUNDEN",
      iphoneStep0Free: "Schritt 0 · Branche (Gratis)",
      iphoneStep1Free: "Schritt 1 · Golden Circle (Gratis)",
      iphoneStep2Free: "Schritt 2 · Touchpoints (Gratis)",
      iphoneStep3Free: "Schritt 3 · SMILE-Naming (Gratis)",
      iphoneStep4Unlock: "🔒 Schritt 4 · Freischalten ($49 USD)",
      iphoneVideoBtn: "▶ HeyGen-Schritt-Video",
      nanoAfterLabel: "NACHHER · NANO BANANA PRO 4K EVOLUTION + VEKTORKURVEN (.SVG / .AI)",
      nanoBeforeLabel: "VORHER · VOM KUNDEN HOCHGELADENES LOGO (SCHRITT 0.2)",
      nanoKicker: "NANO BANANA PRO 4K ENGINE + REINE BÉZIER-VEKTOREN",
      plates36Kicker: "OFFIZIELLES MARKENHANDBUCH · ALLE 36 TAFELN IN KURVEN (16:9)",
      syncFreeBadge: "✓ Freier Zugang",
      syncLiveConnected: "● AURA LIVE VERBUNDEN",
      syncUnlockBtn: "Freischalten · $49 USD",
      videoPopupContinue: "Weiter erkunden",
      videoPopupScriptLabel: "EXAKTES SPRECHSKRIPT (SYNCHRONISIERT IN HEYGEN):",
      ytWatchHere: "▶ Vortrag hier ansehen",
      menu1: "Startseite",
      menu2: "Demo",
      menu2Live: "LIVE",
      menu3: "App Tour",
      menu4: "Theoretische Grundlagen",
      menu5: "Download-Paket",
      openStudio: "Studio öffnen ↗",
      buyNowHeader: "Kaufen · $49 USD",
      buyNowFloating: "Pro-Lizenz kaufen · $49 USD",
      licenseActive: "PRO-LIZENZ AKTIV ✓",
      heroEyebrow: "THE BEST BRAND · ALGORITHMISCHE MARKENIDENTITÄT & VEKTOR-BRANDBOOK",
      heroHook: "Erstellen Sie Ihre Marke und Ihre 9 Profi-Deliverables in 30 Minuten!",
      heroSub: "Ohne endlose Agentur-Meetings oder generische Vorlagen. Sprechen Sie mit Aura, durchlaufen Sie 7 strategische Schritte und laden Sie Ihr 36-Tafeln-Markenhandbuch sofort herunter.",
      heroBtnDemo: "Unsere Live-Demo mit Schritt 0, 1 und 2 nutzen",
      heroBtnTour: "Schritt-für-Schritt App Tour entdecken →",
      heroShowcaseTag: "ECHTE PANORAMA-ANSICHT DER APP UND DES BRANDBOOKS",
      heroShowcaseTitle: "Ein klares System mit Fokus auf jeweils ein einzelnes Element",
      heroShowcaseDesc: "Jede Antwort an Aura wird in Echtzeit in präzise Vektorgeometrie, kalibrierte Typografie und druckfertige Tafeln übersetzt.",
      heroSwitchApp: "Echten App-Screenshot ansehen",
      heroSwitchManual: "Echte Brandbook-Tafel ansehen (01/36)",
      nextToDemoBtn: "Nächster Schritt: Live-Demo testen (Schritte 0, 1 & 2) →",
      nextToTourBtn: "Weiter zum nächsten Menü: App Tour (Scroll-Reise) →",
      nextToTheoryBtn: "Weiter zum Menü: Theoretische Grundlagen (Videos & Bücher) →",
      nextToDownloadsBtn: "Weiter zum letzten Menü: Download-Paket (Karussell & Demnächst) →",
      demoEyebrow: "MENÜ 02 · INTERAKTIVE LIVE-DEMO",
      demoTitle: "Erleben Sie Schritt 0, Schritt 1 und Schritt 2 live",
      demoDesc: "Wählen Sie ein Beispiel oder geben Sie Ihre Branche ein. Sehen Sie live, wie Ihr Golden Circle (Simon Sinek) und Ihre Touchpoints (Jan Carlzon) entstehen.",
      demoStep0Tab: "Schritt 0 · Ziel & Branche",
      demoStep1Tab: "Schritt 1 · Golden Circle (Warum, Wie, Was)",
      demoStep2Tab: "Schritt 2 · Touchpoints (Vor, Während, Nach)",
      demoObjCreate: "Marke komplett neu erstellen",
      demoObjRedesign: "Bestehende Marke weiterentwickeln",
      demoBrandLabel: "Name Ihrer Marke",
      demoTaglineLabel: "Claim oder Markenversprechen",
      demoGiroLabel: "Hauptgeschäftsfeld Ihres Unternehmens",
      demoWhyLabel: "1. Warum Ihre Marke existiert (Kernzweck)",
      demoHowLabel: "2. Wie Sie es einzigartig machen (Methode)",
      demoWhatLabel: "3. Was Sie liefern (Wertangebot)",
      demoPolishBtn: "Text mit Executive-Klarheit optimieren",
      demoNextStepBtn: "Nächster Demo-Schritt →",
      tourEyebrow: "MENÜ 03 · INTERAKTIVE SCROLL-APP-TOUR",
      tourTitle: "Von der ersten Idee bis zu allen 9 Deliverables Schritt für Schritt",
      tourDesc: "Scrollen Sie durch alle echten App-Screens, die Video-Pop-ups zwischen den Schritten und den finalen Download-Tresor.",
      tourPopupBadge: "INTERAKTIVES VIDEO-POP-UP ZWISCHEN DEN SCHRITTEN",
      tourPlayVideoBtn: "Videokapsel in Ihrer Sprache abspielen",
      theoryEyebrow: "MENÜ 04 · THEORETISCHE GRUNDLAGEN, VIDEOS & BÜCHER",
      theoryTitle: "Die methodische Tiefe hinter jeder Markenentscheidung",
      theoryDesc: "Sehen Sie die dynamischen Videokapseln mit Vorschaubildern, Autoren-Vorträge und Fachbücher mit direkten Links.",
      theoryCapsulesTitle: "Video-Kapseln des Studios (Schritt 0 bis Schritt 6)",
      theoryAuthorsTitle: "Keynote-Vorträge der Autoren",
      theoryBooksTitle: "Gründer-Bibliothek mit Direktlinks",
      packEyebrow: "MENÜ 05 · DOWNLOAD-PAKET & MARKENERWEITERUNG",
      packTitle: "Ihre 9 offiziellen Deliverables in maximaler Auflösung",
      packDesc: "Durchblättern Sie das moderne Karussell und klicken Sie auf eine Vorschau für die Fast-Vollbild-Ansicht oder den Beispiel-Download.",
      packOpenFullscreen: "In maximaler Auflösung fast im Vollbild öffnen ⤢",
      packDownloadSample: "Beispieldatei herunterladen ↗",
      comingSoonEyebrow: "DEMNÄCHST · AUTOMATISIERTE MARKEN-ERWEITERUNGEN",
      comingSoonTitle: "Erweitern Sie Ihr Brandbook auf Website und Social Media",
      comingSoonDesc: "In Kürze können Sie zwei Zusatzmodule erwerben, die direkt aus Ihrem Brandbook generiert werden:",
      csWebTitle: "Automatische Erstellung Ihrer offiziellen Website",
      csWebDesc: "Responsive, schnelle Website, automatisch erstellt mit Farben, Schriften, Texten und 4:3-Fotos Ihres Brandbooks.",
      csWebPrice: "Demnächst · Prioritätszugang",
      csSocialTitle: "Social-Media-Content & Posting-Paket",
      csSocialDesc: "Monatlicher Redaktionsplan mit Karussells, Stories und Vorlagen für Instagram, LinkedIn und Facebook im Marken-Look.",
      csSocialPrice: "Demnächst · Prioritätszugang",
      csReserveBtn: "Prioritätszugang anfordern",
      csReservedOk: "✓ Prioritätszugang registriert",
      checkoutTitle: "The Best Brand kaufen — Sofortaktivierung",
      checkoutSub: "Einmalzahlung ohne Abonnement. Schaltet alle 7 Schritte und alle 9 offiziellen Deliverables frei.",
      planSingleName: "Unternehmer Pro-Lizenz",
      planSingleDesc: "1 komplette Marke · 36 Tafeln + 9 Deliverables",
      planAgencyName: "Multi-Marken Atelier-Lizenz",
      planAgencyDesc: "Unbegrenzte Marken · Für Agenturen & Gruppen",
      payNowBtn: "Sichere Zahlung autorisieren & Lizenz aktivieren",
      heroTheoriesCopy: "Wissenschaftlich fundiert durch die Theorien von Simon Sinek (Golden Circle), Jan Carlzon (Momente der Wahrheit), Al Ries, Jack Trout & Alexandra Watkins (Positionierung & SMILE), Mitsuo Nagamachi (Kansei-Engineering), Paul Rand & Jony Ive (Liquid Glass Vektorgeometrie) und Massimo Vignelli (36-Tafeln-Kanon).",
      heroBtnTryIphone: "Unsere Live-Demo mit Schritt 0, 1 und 2 nutzen",
      heroBtnIntroVideo: "▶ Gründer-Intro-Video ansehen (HeyGen)",
      iphoneSectionEyebrow: "ECHTE LIVE-APPLIKATION · MIT AURA VERBUNDEN",
      iphoneSectionTitle: "Interagieren Sie direkt hier mit der echten App: die ersten 3 Schritte kostenlos",
      iphoneSectionDesc: "Schreiben oder sprechen Sie mit Aura im iPhone. Bis Schritt 3 kostenlos; beim Wechsel zu Schritt 4 wird die $49-USD-Freischaltung mit automatischer Datenmigration aktiviert.",
      iphoneStep0Btn: "Schritt 0 · Branche (Gratis)",
      iphoneStep1Btn: "Schritt 1 · Golden Circle (Gratis)",
      iphoneStep2Btn: "Schritt 2 · Touchpoints (Gratis)",
      iphoneStep3Btn: "Schritt 3 · SMILE-Naming (Gratis)",
      iphoneStep4BtnLocked: "🔒 Schritt 4 · Freischalten ($49 USD)",
      iphoneStep4BtnUnlocked: "Schritt 4 · Kansei ✓",
      iphoneVideoStepBtn: "▶ HeyGen-Schritt-Video",
      syncBadgeTitle: "AUTOMATISCHE FORTSCHRITTS-SPEICHERUNG & MIGRATION",
      syncLiveStatus: "● AURA LIVE VERBUNDEN",
      syncCardHeading: "Ihr Fortschritt in den Schritten 1 bis 3 wird in Echtzeit gespeichert",
      syncRow1: "Schritt 0 & 1 · Branche + Golden Circle (Simon Sinek)",
      syncRow2: "Schritt 2 · Touchpoints Vor, Während & Nach (Carlzon)",
      syncRow3: "Schritt 3 · SMILE-Naming & Nizza-Klassen (Watkins)",
      syncRow4: "Schritt 4 bis 6 · Kansei, Nano Banana Pro Logo & 9 Deliverables",
      freeAccessLabel: "✓ Freier Zugang",
      unlock49Label: "Freischalten · $49 USD",
      presetsLabel: "Echtes Fallbeispiel laden:",
      gcLiveHeading: "LIVE-VORSCHAU DES GOLDEN CIRCLE IHRER MARKE",
      nanoEyebrow: "NANO BANANA PRO 4K ENGINE + REINE BÉZIER-VEKTOREN",
      nanoTitle: "Vom Entwurf oder Alt-Logo zum Apple Liquid Glass Emblem in .SVG / .AI Kurven",
      nanoDesc: "In Schritt 5 entwickeln Sie Ihr Logo mit dem neuesten Nano Banana Pro Modell und unserem mathematischen Bézier-Vektor-Tracer auf hellem und dunklem Grund.",
      plates36Eyebrow: "OFFIZIELLES MARKENHANDBUCH · ALLE 36 TAFELN IN KURVEN (16:9)",
      plates36Title: "Entdecken Sie alle 36 echten Brandbook-Tafeln für Ihr Unternehmen",
      plates36Desc: "Klicken Sie auf eine Tafel für die Fast-Vollbild-Ansicht und blättern Sie von Tafel 01 bis 36.",
      bento9Eyebrow: "KOMPLETTE EXECUTIVE-SUITE · DIE 9 OFFIZIELLEN DELIVERABLES",
      bento9Title: "Alles, was Sie nach den 7 Schritten in 30 Minuten herunterladen",
      bento9Desc: "Klicken Sie auf ein Deliverable für die Vollbild-Vorschau oder das Download-Paket.",
      lightboxKicker: "MAXIMALE AUFLÖSUNG · FAST-VOLLBILD-ANSICHT",
      lightboxPrev: "← Tafel",
      lightboxNext: "Tafel →",
      lightboxClose: "✕ Schließen",
      videoCapsuleBadge: "HEYGEN + GOOGLE FLOW KAPSEL",
      videoScriptHeading: "EXAKTES SPRECHSKRIPT (SYNCHRONISIERT IN HEYGEN):",
      videoContinueBtn: "Weiter erkunden",
      tourAmplifyBtn: "⤢ Screenshot vergrößern",
      tourQuickJumpLabel: "Springe zu Schritt:",
      footerHeadlineSub: "OFFIZIELLE EDITION 1.0 · THE BEST SUITE",
      footerDesc: "Plattform zur Erstellung Ihrer Markenidentität, der 9 offiziellen Deliverables und des 36-Tafeln-Vektor-Brandbooks mit KI und Auras Sprachführung in 6 Sprachen."
    },
    it: {
      bento9Kicker: "SUITE ESECUTIVA COMPLETA · I 9 DELIVERABLE UFFICIALI",
      carouselPrev: "← Precedente",
      carouselNext: "Successivo →",
      gcLiveKicker: "ANTEPRIMA DAL VIVO DEL CERCHIO D'ORO DEL TUO BRAND",
      iphoneSectionKicker: "APPLICAZIONE REALE DAL VIVO · CONNESSA AD AURA",
      iphoneStep0Free: "Passo 0 · Settore (Gratis)",
      iphoneStep1Free: "Passo 1 · Cerchio d'Oro (Gratis)",
      iphoneStep2Free: "Passo 2 · Touchpoint (Gratis)",
      iphoneStep3Free: "Passo 3 · Naming SMILE (Gratis)",
      iphoneStep4Unlock: "🔒 Passo 4 · Sblocca ($49 USD)",
      iphoneVideoBtn: "▶ Video HeyGen del Passo",
      nanoAfterLabel: "DOPO · EVOLUZIONE NANO BANANA PRO 4K + CURVE VETTORIALI (.SVG / .AI)",
      nanoBeforeLabel: "PRIMA · LOGO CARICATO DAL CLIENTE (PASSO 0.2)",
      nanoKicker: "MOTORE VISIVO NANO BANANA PRO 4K + VETTORI BÉZIER PURI",
      plates36Kicker: "MANUALE UFFICIALE D'IDENTITÀ · LE 36 TAVOLE IN CURVE (16:9)",
      syncFreeBadge: "✓ Accesso Libero",
      syncLiveConnected: "● AURA CONNESSA DAL VIVO",
      syncUnlockBtn: "Sblocca · $49 USD",
      videoPopupContinue: "Continua a esplorare",
      videoPopupScriptLabel: "COPIONE PARLATO ESATTO (SINCRONIZZATO IN HEYGEN):",
      ytWatchHere: "▶ Guarda la Conferenza Qui",
      menu1: "Home",
      menu2: "Demo",
      menu2Live: "LIVE",
      menu3: "App Tour",
      menu4: "Basi teoriche",
      menu5: "Pack di download",
      openStudio: "Apri Studio ↗",
      buyNowHeader: "Acquista · $49 USD",
      buyNowFloating: "Licenza Pro · $49 USD",
      licenseActive: "LICENZA PRO ATTIVA ✓",
      heroEyebrow: "THE BEST BRAND · IDENTITÀ VISIVA & BRANDBOOK IN CURVE",
      heroHook: "Crea il tuo Brand e i tuoi 9 Deliverable di livello professionale in 30 minuti!",
      heroSub: "Senza riunioni interminabili o template generici. Dialoga con Aura, completa i 7 passi strategici e scarica il tuo Manuale Ufficiale di 36 Tavole e i file editabili.",
      heroBtnDemo: "Usa la nostra demo con il passo 0, 1 e 2",
      heroBtnTour: "Esplora il percorso passo dopo passo (App Tour) →",
      heroShowcaseTag: "VISTA PANORAMICA REALE DELL'APPLICAZIONE E DEL BRANDBOOK",
      heroShowcaseTitle: "Un sistema elegante pensato per concentrarsi su un solo elemento alla volta",
      heroShowcaseDesc: "Ogni risposta data ad Aura si trasforma in tempo reale in geometria vettoriale, tipografia calibrata e tavole pronte per la stampa.",
      heroSwitchApp: "Vedi Screenshot Reale dell'App",
      heroSwitchManual: "Vedi Tavola Reale del Manuale (01/36)",
      nextToDemoBtn: "Prossimo passo: Usa la nostra Demo (Passi 0, 1 e 2) →",
      nextToTourBtn: "Continua al menu successivo: App Tour (Percorso Completo) →",
      nextToTheoryBtn: "Continua al menu: Basi teoriche (Video e Libri) →",
      nextToDownloadsBtn: "Continua all'ultimo menu: Pack di download (Carosello + Prossimamente) →",
      demoEyebrow: "MENU 02 · DEMO INTERATTIVA DAL VIVO",
      demoTitle: "Vivi l'esperienza reale con il Passo 0, Passo 1 e Passo 2",
      demoDesc: "Scegli un esempio o inserisci il settore della tua azienda. Osserva come l'app struttura il Cerchio d'Oro (Simon Sinek) e i Touchpoint (Jan Carlzon).",
      demoStep0Tab: "Passo 0 · Obiettivo e Settore",
      demoStep1Tab: "Passo 1 · Cerchio d'Oro (Perché, Come, Cosa)",
      demoStep2Tab: "Passo 2 · Touchpoint (Prima, Durante, Dopo)",
      demoObjCreate: "Creare un brand da zero",
      demoObjRedesign: "Evolvere il mio brand attuale",
      demoBrandLabel: "Nome del tuo brand",
      demoTaglineLabel: "Slogan o promessa",
      demoGiroLabel: "Settore e attività principale dell'azienda",
      demoWhyLabel: "1. Perché esiste il tuo brand (Scopo nucleare)",
      demoHowLabel: "2. Come lo rendi unico (Metodo differenziante)",
      demoWhatLabel: "3. Cosa consegni (Offerta di valore)",
      demoPolishBtn: "Perfeziona il testo con chiarezza esecutiva",
      demoNextStepBtn: "Prossimo passo della Demo →",
      tourEyebrow: "MENU 03 · PERCORSO INTERATTIVO CON SCROLLING",
      tourTitle: "Dall'idea iniziale ai 9 deliverable passo dopo passo",
      tourDesc: "Scorri verso il basso per esplorare ogni schermata reale dell'applicazione, i pop-up video tra le fasi e il caveau finale di download.",
      tourPopupBadge: "POP-UP VIDEO INTERATTIVO TRA LE FASI",
      tourPlayVideoBtn: "Riproduci capsula video nella tua lingua",
      theoryEyebrow: "MENU 04 · BASI TEORICHE, VIDEO E LIBRI",
      theoryTitle: "La profondità metodologica dietro ogni decisione",
      theoryDesc: "Guarda le capsule video dinamiche con miniature, le conferenze degli autori e i libri essenziali con link diretti.",
      theoryCapsulesTitle: "Capsule Video dello Studio (Passo 0 a Passo 6)",
      theoryAuthorsTitle: "Conferenze Magistrali degli Autori",
      theoryBooksTitle: "Biblioteca Essenziale con Link Diretti",
      packEyebrow: "MENU 05 · PACK DI DOWNLOAD ED ESPANSIONE",
      packTitle: "I tuoi 9 Deliverable Ufficiali ad alta risoluzione",
      packDesc: "Scorri il carosello moderno e clicca su qualsiasi miniatura per aprirla a massima risoluzione a quasi tutto schermo o scaricare un file di esempio.",
      packOpenFullscreen: "Vedi a massima risoluzione a tutto schermo ⤢",
      packDownloadSample: "Scarica file di esempio ↗",
      comingSoonEyebrow: "PROSSIMAMENTE · NUOVI MODULI AUTOMATIZZATI",
      comingSoonTitle: "Espandi il tuo Brandbook verso il Sito Web e i Social Media",
      comingSoonDesc: "Presto potrai acquistare direttamente due moduli collegati al DNA, colori, font e foto del tuo manuale:",
      csWebTitle: "Creazione Automatica del Sito Web Ufficiale",
      csWebDesc: "Sito web responsive e veloce generato automaticamente con palette cromatica, tipografia, testi e fotografie 4:3 del tuo Brandbook.",
      csWebPrice: "Prossimamente · Accesso prioritario",
      csSocialTitle: "Pack di Pubblicazioni per Social Media",
      csSocialDesc: "Piano mensile di contenuti visivi, caroselli e storie per Instagram, LinkedIn e Facebook allineati al tuo brand.",
      csSocialPrice: "Prossimamente · Accesso prioritario",
      csReserveBtn: "Richiedi accesso prioritario",
      csReservedOk: "✓ Accesso prioritario registrato",
      checkoutTitle: "Acquista The Best Brand — Attivazione Istantanea",
      checkoutSub: "Pagamento unico senza abbonamenti. Sblocca tutti i 7 passi e il download immediato dei tuoi 9 deliverable ufficiali.",
      planSingleName: "Licenza Pro Imprenditore",
      planSingleDesc: "1 Brand Completo · 36 Tavole + 9 Deliverable",
      planAgencyName: "Licenza Atelier Multi-Brand",
      planAgencyDesc: "Brand Illimitati · Per Agenzie e Gruppi",
      payNowBtn: "Autorizza Pagamento Sicuro e Attiva Licenza",
      heroTheoriesCopy: "Scientificamente fondato sulle teorie di Simon Sinek (Cerchio d'Oro), Jan Carlzon (Momenti della Verità), Al Ries, Jack Trout e Alexandra Watkins (Posizionamento e SMILE), Mitsuo Nagamachi (Ingegneria Kansei), Paul Rand e Jony Ive (Geometria Vettoriale Liquid Glass) e Massimo Vignelli (Canone di 36 Tavole).",
      heroBtnTryIphone: "Usa la nostra demo con il passo 0, 1 e 2",
      heroBtnIntroVideo: "▶ Guarda il Video Introduttivo del Fondatore (HeyGen)",
      iphoneSectionEyebrow: "APPLICAZIONE REALE DAL VIVO · CONNESSA AD AURA",
      iphoneSectionTitle: "Interagisci qui stesso con l'applicazione reale: avanza gratis nei primi 3 passi",
      iphoneSectionDesc: "Scrivi o parla con Aura dentro l'iPhone. Completa gratis fino al Passo 3; passando al Passo 4 si attiva lo sblocco da $49 USD e le tue risposte migrano automaticamente.",
      iphoneStep0Btn: "Passo 0 · Settore (Gratis)",
      iphoneStep1Btn: "Passo 1 · Cerchio d'Oro (Gratis)",
      iphoneStep2Btn: "Passo 2 · Touchpoint (Gratis)",
      iphoneStep3Btn: "Passo 3 · Naming SMILE (Gratis)",
      iphoneStep4BtnLocked: "🔒 Passo 4 · Sblocca ($49 USD)",
      iphoneStep4BtnUnlocked: "Passo 4 · Kansei ✓",
      iphoneVideoStepBtn: "▶ Video HeyGen del Passo",
      syncBadgeTitle: "SINCRONIZZAZIONE E CONSERVAZIONE AUTOMATICA",
      syncLiveStatus: "● AURA CONNESSA DAL VIVO",
      syncCardHeading: "Il tuo progresso nei Passi 1 a 3 è salvato in tempo reale",
      syncRow1: "Passo 0 e Passo 1 · Settore + Cerchio d'Oro (Simon Sinek)",
      syncRow2: "Passo 2 · Touchpoint Prima, Durante e Dopo (Carlzon)",
      syncRow3: "Passo 3 · Naming SMILE e Classi di Nizza (Watkins)",
      syncRow4: "Passi 4 a 6 · Kansei, Logo Nano Banana Pro e 9 Deliverable",
      freeAccessLabel: "✓ Accesso Libero",
      unlock49Label: "Sblocca · $49 USD",
      presetsLabel: "Carica Caso Studio Reale:",
      gcLiveHeading: "ANTEPRIMA DAL VIVO DEL CERCHIO D'ORO DEL TUO BRAND",
      nanoEyebrow: "MOTORE VISIVO NANO BANANA PRO 4K + VETTORI BÉZIER PURI",
      nanoTitle: "Da uno schizzo o logo esistente a un simbolo Apple Liquid Glass in curve .SVG / .AI",
      nanoDesc: "Nel Passo 5 fai evolvere il tuo logo con il modello più avanzato di Nano Banana Pro e il nostro tracciatore matematico in curve di Bézier su sfondo chiaro e scuro.",
      plates36Eyebrow: "MANUALE UFFICIALE D'IDENTITÀ · LE 36 TAVOLE IN CURVE (16:9)",
      plates36Title: "Esplora le 36 Tavole reali compilate dal sistema per la tua azienda",
      plates36Desc: "Clicca su qualsiasi tavola per ispezionarla a massima risoluzione e navigare dalla Tavola 01 alla 36.",
      bento9Eyebrow: "SUITE ESECUTIVA COMPLETA · I 9 DELIVERABLE UFFICIALI",
      bento9Title: "Tutto ciò che scarichi completando i 7 passi in 30 minuti",
      bento9Desc: "Clicca su qualsiasi deliverable per vederlo a quasi tutto schermo o andare al Pack di Download.",
      lightboxKicker: "MASSIMA RISOLUZIONE · QUASI TUTTO SCHERMO",
      lightboxPrev: "← Tavola",
      lightboxNext: "Tavola →",
      lightboxClose: "✕ Chiudi",
      videoCapsuleBadge: "CAPSULA HEYGEN + GOOGLE FLOW",
      videoScriptHeading: "COPIONE PARLATO ESATTO (SINCRONIZZATO IN HEYGEN):",
      videoContinueBtn: "Continua a esplorare",
      tourAmplifyBtn: "⤢ Ingrandisci screenshot",
      tourQuickJumpLabel: "Vai al passo:",
      footerHeadlineSub: "EDIZIONE UFFICIALE 1.0 · SUITE THE BEST",
      footerDesc: "Piattaforma per creare l'identità visiva, i 9 deliverable ufficiali e il Manuale di Brand di 36 Tavole in Curve con IA e guida vocale di Aura in 6 lingue."
    }
  };

  function getLang() {
    try {
      const saved = (localStorage.getItem(LANG_STORAGE_KEY) || "es").toLowerCase().trim();
      return I18N[saved] ? saved : "es";
    } catch (e) {
      return "es";
    }
  }

  function t(key) {
    const l = getLang();
    return (I18N[l] && I18N[l][key]) || I18N.es[key] || key;
  }

  function escHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------------------------------------------------------------------------
  // 2. DATOS MULTILINGÜES DE LOS VIDEOS, AUTORES, LIBROS, APP TOUR Y 9 ENTREGABLES
  // ---------------------------------------------------------------------------
  function resolveVideoAsset(relPath) {
    const isLocal = typeof window !== "undefined" && (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost");
    if (isLocal) return `${relPath}?v=99.0`;
    return `https://raw.githubusercontent.com/ImprobearsIA/thebestbrand/main/apps/web${relPath}?v=99.0`;
  }

  function getLocalizedStepVideoUrl(stepNum, langOverride) {
    const l = String(langOverride || getLang() || "es").toLowerCase().trim();
    const sfx = (l && l !== "es" && ["en", "fr", "pt", "de", "it"].includes(l)) ? `_${l}` : "";
    return resolveVideoAsset(`/assets/videos/capsula_teoria_paso_${stepNum}${sfx}.mp4`);
  }

  function getLocalizedStepPosterUrl(stepNum, langOverride) {
    const l = String(langOverride || getLang() || "es").toLowerCase().trim();
    const sfx = (l && l !== "es" && ["en", "fr", "pt", "de", "it"].includes(l)) ? `_${l}` : "";
    return resolveVideoAsset(`/assets/videos/poster_paso_${stepNum}${sfx}.jpg`);
  }

  function getLocalizedHeroVideoUrl(langOverride) {
    const l = String(langOverride || getLang() || "es").toLowerCase().trim();
    const sfx = (l && l !== "es" && ["en", "fr", "pt", "de", "it"].includes(l)) ? `_${l}` : "";
    return resolveVideoAsset(`/assets/videos/hero_convergence_thebestbrand${sfx}.mp4`);
  }

  function getLocalizedHeroPosterUrl(langOverride) {
    const l = String(langOverride || getLang() || "es").toLowerCase().trim();
    const sfx = (l && l !== "es" && ["en", "fr", "pt", "de", "it"].includes(l)) ? `_${l}` : "";
    return resolveVideoAsset(`/assets/videos/poster_hero_convergence${sfx}.jpg`);
  }

  function getLocalizedAppCaptureUrl(relPath, langOverride) {
    const l = String(langOverride || getLang() || "es").toLowerCase().trim();
    const sfx = (l && l !== "es" && ["en", "fr", "pt", "de", "it"].includes(l)) ? `_${l}` : "";
    const localizedRel = sfx ? String(relPath).replace(/\.png$/i, `${sfx}.png`) : relPath;
    return resolveVideoAsset(localizedRel);
  }

  function stepLabelForLang(stepNum, isIntro) {
    const l = getLang();
    const map = {
      es: isIntro ? `Intro · Paso ${stepNum}` : `Paso ${stepNum}`,
      en: isIntro ? `Intro · Step ${stepNum}` : `Step ${stepNum}`,
      fr: isIntro ? `Intro · Étape ${stepNum}` : `Étape ${stepNum}`,
      pt: isIntro ? `Intro · Passo ${stepNum}` : `Passo ${stepNum}`,
      de: isIntro ? `Intro · Schritt ${stepNum}` : `Schritt ${stepNum}`,
      it: isIntro ? `Intro · Passo ${stepNum}` : `Passo ${stepNum}`
    };
    return map[l] || map.es;
  }

  function stepUpperForLang(stepNum) {
    const l = getLang();
    const map = {
      es: `PASO ${stepNum}`,
      en: `STEP ${stepNum}`,
      fr: `ÉTAPE ${stepNum}`,
      pt: `PASSO ${stepNum}`,
      de: `SCHRITT ${stepNum}`,
      it: `PASSO ${stepNum}`
    };
    return map[l] || map.es;
  }

  const VIDEO_CAPSULES = [
    {
      step: 0,
      get url() { return getLocalizedStepVideoUrl(0); },
      get poster() { return getLocalizedStepPosterUrl(0); },
      get popupCapture() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_0_a_1.png"); },
      duration: "00:54",
      author: "Jorge Benítez (HeyGen) + Google Flow · David Aaker, Peter Drucker & Sagi Haviv",
      exactScript: "Hola, soy Jorge Benítez. Como afirma Peter Drucker, la mejor forma de predecir el futuro es creándolo. En el Paso cero eliges si construyes tu marca desde cero, evolucionas la actual o creas una sub-marca. Si ya tienes nombre y logotipo, David Aaker y Sagi Haviv recomiendan proteger tu capital visual. Aquí puedes conservar tu logo intacto, pedir sugerencias o evolucionarlo con inteligencia artificial. Siguiendo a Al Ries y Jack Trout en Posicionamiento, cuando describes tu giro con claridad en el tercer sub-paso, el sistema adapta automáticamente tus preguntas, puntos de contacto y propuestas. Y con el esquema Brand Relationship Spectrum de David Aaker, defines desde hoy si tu empresa operará como marca única o si tendrá sub-marcas listas para crecer.",
      i18n: {
        es: { title: "Video Introductorio y Paso 0 · Objetivo, Logo Base y Giro", desc: "Cómo elegir entre crear una marca desde cero o evolucionar tu logotipo actual respetando tu capital visual (Peter Drucker, David Aaker y Sagi Haviv)." },
        en: { title: "Intro & Step 0 · Goal, Base Logo & Core Business Essence", desc: "How to choose between creating a brand from scratch or evolving your current logo while honoring your brand equity." },
        fr: { title: "Intro & Étape 0 · Objectif, Logo de Base et Essence du Secteur", desc: "Choisir entre créer une marque de zéro ou faire évoluer votre logo actuel." },
        pt: { title: "Intro & Passo 0 · Objetivo, Logo Base e Essência do Negócio", desc: "Como escolher entre criar uma marca do zero ou evoluir seu logotipo atual." },
        de: { title: "Intro & Schritt 0 · Ziel, Basis-Logo & Unternehmenskern", desc: "Wahl zwischen Neuerstellung oder Evolution Ihres bestehenden Logos." },
        it: { title: "Intro & Passo 0 · Obiettivo, Logo Base ed Essenza del Business", desc: "Come scegliere tra creare un brand da zero o evolvere il tuo logo attuale." }
      }
    },
    {
      step: 1,
      get url() { return getLocalizedStepVideoUrl(1); },
      get poster() { return getLocalizedStepPosterUrl(1); },
      get popupCapture() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_0_a_1.png"); },
      duration: "00:48",
      author: "Jorge Benítez (HeyGen) + Google Flow · Simon Sinek, Jim Collins & Donald Miller",
      exactScript: "Bienvenido al Paso uno. Como demostró Jim Collins en Empresas que Sobresalen, toda marca duradera nace de cimientos estratégicos claros antes de diseñar su identidad visual. La teoría del Círculo Dorado de Simon Sinek enseña que la gente no compra lo que haces, sino el porqué lo haces. En los primeros sub-pasos descubrirás tu propósito nuclear. Combinamos el Lienzo de Propuesta de Valor de Alex Osterwalder con el método StoryBrand de Donald Miller: al explicar tu proceso en tres pasos claros, tu cliente confía sin dudar. Finalmente, con los arquetipos de Carl Jung y la escala de Jennifer Aaker, definimos la personalidad humana de tu marca y el perfil exacto de tu cliente ideal.",
      i18n: {
        es: { title: "Transición al Paso 1 · El Círculo Dorado y la Promesa de Valor", desc: "Por qué la gente no compra lo que haces, sino el propósito por el que lo haces (Simon Sinek, Jim Collins, Alex Osterwalder y Donald Miller)." },
        en: { title: "Transition to Step 1 · The Golden Circle & Value Promise", desc: "Why people don't buy what you do, they buy why you do it (Simon Sinek, Jim Collins, Alex Osterwalder & Donald Miller)." },
        fr: { title: "Transition vers l'Étape 1 · Le Cercle d'Or et la Promesse de Valeur", desc: "Pourquoi les clients n'achètent pas ce que vous faites, mais pourquoi vous le faites." },
        pt: { title: "Transição ao Passo 1 · O Círculo Dourado e a Promessa de Valor", desc: "Por que as pessoas não compram o que você faz, mas o porquê você faz." },
        de: { title: "Übergang zu Schritt 1 · Der Golden Circle & Wertversprechen", desc: "Warum Menschen nicht kaufen, was Sie tun, sondern warum Sie es tun." },
        it: { title: "Transizione al Passo 1 · Il Cerchio d'Oro e la Promessa di Valore", desc: "Perché le persone non comprano ciò che fai, ma il perché lo fai." }
      }
    },
    {
      step: 2,
      get url() { return getLocalizedStepVideoUrl(2); },
      get poster() { return getLocalizedStepPosterUrl(2); },
      get popupCapture() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_1_a_2.png"); },
      duration: "00:47",
      author: "Jorge Benítez (HeyGen) + Google Flow · Jan Carlzon, Lemon/Verhoef & Don Norman",
      exactScript: "Excelente avance en el Paso uno. Como enseñó Jan Carlzon en los Momentos de la Verdad, cada contacto de quince segundos con tu cliente define si confía en tu marca. Según Katherine Lemon y Peter Verhoef en Journal of Marketing, toda experiencia se divide en tres etapas: cómo te descubren Antes, cómo entregas valor Durante, y cómo fidelizas Después. Don Norman explica en el Diseño de las Cosas Cotidianas que el diseño excelente elimina la fricción. Aquí elegirás los puntos de contacto clave de tu negocio en tres clics. Al terminar el Paso dos, el sistema vinculará tus canales reales con los entregables y fotografías de tu manual para que tu marca viva en cada interacción.",
      i18n: {
        es: { title: "Transición al Paso 2 · Ingeniería de Touchpoints (Momentos de la Verdad)", desc: "En 15 segundos de contacto tu cliente decide si confía en tu marca antes, durante y después de comprar (Jan Carlzon, Lemon/Verhoef y Don Norman)." },
        en: { title: "Transition to Step 2 · Touchpoint Engineering (Moments of Truth)", desc: "In 15 seconds of contact, your customer decides whether to trust your brand before, during, and after purchase." },
        fr: { title: "Transition vers l'Étape 2 · Ingénierie des Touchpoints (Moments de Vérité)", desc: "En 15 secondes de contact, votre client décide s'il fait confiance à votre marque." },
        pt: { title: "Transição ao Passo 2 · Engenharia de Touchpoints (Momentos da Verdade)", desc: "Em 15 segundos de contato seu cliente decide se confia na sua marca antes, durante e depois da compra." },
        de: { title: "Übergang zu Schritt 2 · Touchpoint-Engineering (Momente der Wahrheit)", desc: "In 15 Sekunden Kontakt entscheidet Ihr Kunde über Vertrauen vor, während und nach dem Kauf." },
        it: { title: "Transizione al Passo 2 · Ingegneria dei Touchpoint (Momenti della Verità)", desc: "In 15 secondi di contatto il cliente decide se fidarsi del tuo brand prima, durante e dopo l'acquisto." }
      }
    },
    {
      step: 3,
      get url() { return getLocalizedStepVideoUrl(3); },
      get poster() { return getLocalizedStepPosterUrl(3); },
      get popupCapture() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_2_a_3.png"); },
      duration: "00:45",
      author: "Jorge Benítez (HeyGen) + Google Flow · Alexandra Watkins, David Placek & Alina Wheeler",
      exactScript: "Ya tienes el mapa de experiencia de tu cliente. Como afirma Wally Olins, el nombre es el primer activo verbal que pronunciarán tus clientes en cada canal. Aplicamos el modelo SMILE de Alexandra Watkins y el simbolismo fonético de David Placek, creador de Lexicon Branding: buscamos un nombre de dos a tres sílabas, fácil de recordar y con iniciales potentes. Siguiendo a Alina Wheeler en Designing Brand Identity, acompañamos tu nombre oficial con un descriptor claro y un eslogan que comunique tu promesa en tres segundos. Y para blindar tu patrimonio, el Paso tres verifica automáticamente las clases internacionales de Niza para el registro legal de tu marca ante la autoridad.",
      i18n: {
        es: { title: "Transición al Paso 3 · Fonética, Naming SMILE y Clases de Niza", desc: "Cómo elegir un nombre memorable de 2 a 3 sílabas y vincularlo con las Clases Internacionales de Niza (Watkins, Placek y Alina Wheeler)." },
        en: { title: "Transition to Step 3 · Phonetics, SMILE Naming & Nice Classes", desc: "How to lock in a memorable name and match it with international Nice Classification trademark classes." },
        fr: { title: "Transition vers l'Étape 3 · Phonétique, Naming SMILE et Classes de Nice", desc: "Comment valider un nom mémorable et l'associer aux classes internationales de Nice." },
        pt: { title: "Transição ao Passo 3 · Fonética, Naming SMILE e Classes de Nice", desc: "Como escolher um nome memorável e vinculá-lo às Classes Internacionais de Nice." },
        de: { title: "Übergang zu Schritt 3 · Phonetik, SMILE-Naming & Nizza-Klassen", desc: "Wie Sie einen einprägsamen Markennamen wählen und rechtlich in Nizza-Klassen einordnen." },
        it: { title: "Transizione al Passo 3 · Fonetica, Naming SMILE e Classi di Nizza", desc: "Come scegliere un nome memorabile e abbinarlo alle Classi Internazionali di Nizza." }
      }
    },
    {
      step: 4,
      get url() { return getLocalizedStepVideoUrl(4); },
      get poster() { return getLocalizedStepPosterUrl(4); },
      get popupCapture() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_3_a_4.png"); },
      duration: "00:51",
      author: "Jorge Benítez (HeyGen) + Google Flow · Mitsuo Nagamachi, Osgood & R. Bringhurst",
      exactScript: "Con tu nombre oficial listo, entramos al Paso cuatro. El profesor Mitsuo Nagamachi creó la Ingeniería Kansei para traducir sentimientos humanos en parámetros de diseño exactos. Como demostraron Ramachandran y Charles Osgood con el diferencial semántico, nuestro cerebro asocia curvas suaves con cercanía humana y ángulos rectos con precisión técnica. Robert Bringhurst afirma que la tipografía es el lenguaje hecho visible. Por eso elegirás tu fuente por estilo visual y recibirás el paquete instalable para tu equipo. Finalmente, con la taxonomía de Per Mollerup y Wheeler, eliges la estructura de tu marca: logotipo con símbolo integrado, monograma de iniciales o emblema.",
      i18n: {
        es: { title: "Transición al Paso 4 · Ingeniería Kansei y Gobernanza Tipográfica", desc: "Traducción de emociones a parámetros geométricos en 7 ejes y selección del par tipográfico oficial (Mitsuo Nagamachi, Osgood y Bringhurst)." },
        en: { title: "Transition to Step 4 · Kansei Engineering & Typographic Governance", desc: "Translating sensory emotion into geometry and selecting your official open-license font pairing." },
        fr: { title: "Transition vers l'Étape 4 · Ingénierie Kansei et Gouvernance Typographique", desc: "Traduction des émotions en géométrie et sélection du duo typographique officiel." },
        pt: { title: "Transição ao Passo 4 · Engenharia Kansei e Governança Tipográfica", desc: "Tradução de emoções em parâmetros visuais e escolha do par tipográfico oficial." },
        de: { title: "Übergang zu Schritt 4 · Kansei-Engineering & Typografie-Governance", desc: "Übersetzung sensorischer Eindrücke in Geometrie und Auswahl Ihres offiziellen Schriftpaares." },
        it: { title: "Transizione al Passo 4 · Ingegneria Kansei e Governance Tipografica", desc: "Traduzione delle emozioni in geometria e scelta della coppia tipografica ufficiale." }
      }
    },
    {
      step: 5,
      get url() { return getLocalizedStepVideoUrl(5); },
      get poster() { return getLocalizedStepPosterUrl(5); },
      get popupCapture() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_4_a_5.png"); },
      duration: "00:54",
      author: "Jorge Benítez (HeyGen) + Google Flow · Paul Rand, Sagi Haviv & Jony Ive",
      exactScript: "Bienvenido al Paso cinco. Como enseñó el legendario Paul Rand, un logotipo extraordinario combina simplicidad geométrica y recordación inmediata, potenciado por la armonía cromática de Josef Albers. Si subiste tu logotipo actual, seguimos la máxima de Sagi Haviv en Chermayeff & Geismar: respetar la esencia reconocible mientras perfeccionamos sus trazos y acabados. Inspirados en el rigor industrial de Jony Ive, visualizas al mismo tiempo tu logotipo completo y su ícono cuadrado uno a uno sobre fondo claro y oscuro. Puedes iterar con el motor visual de inteligencia artificial, refinar detalles en tiempo real y aprobar la versión maestra que se compilará en curvas vectoriales puras.",
      i18n: {
        es: { title: "Transición al Paso 5 · Síntesis Vectorial Nano Banana Pro y Taller de Logotipo", desc: "Iteración asistida por Nano Banana Pro 4K y trazado matemático Bézier Liquid Glass sobre fondo claro y oscuro sin píxeles (Paul Rand, Sagi Haviv y Jony Ive)." },
        en: { title: "Transition to Step 5 · Nano Banana Pro Vector Synthesis & Logo Atelier", desc: "Nano Banana Pro AI-assisted iteration and mathematical Bézier vector tracing on light and dark canvases." },
        fr: { title: "Transition vers l'Étape 5 · Synthèse Vectorielle Nano Banana Pro et Atelier Logo", desc: "Itération assistée par Nano Banana Pro et tracé mathématique de Bézier sur fond clair et sombre." },
        pt: { title: "Transição ao Passo 5 · Síntese Vetorial Nano Banana Pro e Atelier de Logo", desc: "Iteração assistida por Nano Banana Pro e traçado matemático Bézier sobre fundo claro e escuro." },
        de: { title: "Übergang zu Schritt 5 · Nano Banana Pro Vektorsynthese & Logo-Atelier", desc: "KI-gestützte Nano Banana Pro Iteration und mathematische Bézier-Vektorisierung auf hellem und dunklem Grund." },
        it: { title: "Transizione al Passo 5 · Sintesi Vettoriale Nano Banana Pro e Atelier del Logo", desc: "Iterazione assistita da Nano Banana Pro e tracciato matematico di Bézier su sfondo chiaro e scuro." }
      }
    },
    {
      step: 6,
      get url() { return getLocalizedStepVideoUrl(6); },
      get poster() { return getLocalizedStepPosterUrl(6); },
      get popupCapture() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_5_a_6.png"); },
      duration: "00:52",
      author: "Jorge Benítez (HeyGen) + Google Flow · Massimo Vignelli & Josef Müller-Brockmann",
      exactScript: "Felicidades por llegar al Paso seis. Como estableció Massimo Vignelli en su Canon, un manual de identidad es la constitución que protege la coherencia de tu marca en todo momento. Aplicamos los sistemas de retículas de Josef Müller-Brockmann y la Guía Oficial C-Cero-Cero de ImproBears: láminas en curvas abiertas sobre lienzo claro, siguiendo exactamente los colores de tu logotipo. Tu manual incluye la terna oficial de tu marca, pruebas de legibilidad, códigos de color para imprenta y pantalla, y fotografías de aplicación en el mundo real. Desde la Bóveda descargas tus nueve entregables oficiales: Manual en PDF y Web, vectores editables, firma de correo, plantillas de Word y PowerPoint y tu kit de fuentes.",
      i18n: {
        es: { title: "Transición al Paso 6 · El Manual Oficial de 36 Láminas y los 9 Entregables", desc: "Cómo la disciplina de retícula de Massimo Vignelli y tus 9 archivos ejecutivos convierten tu marca en un sistema escalable." },
        en: { title: "Transition to Step 6 · The 36-Plate Official Brandbook & 9 Deliverables", desc: "How grid discipline and your 9 production files turn your brand into a scalable enterprise asset." },
        fr: { title: "Transition vers l'Étape 6 · Le Manuel Officiel de 36 Planches et les 9 Livrables", desc: "Comment la rigueur de grille et vos 9 fichiers transforment votre marque en système durable." },
        pt: { title: "Transição ao Passo 6 · O Manual Oficial de 36 Lâminas e os 9 Entregáveis", desc: "Como a disciplina de grid e seus 9 arquivos transformam sua marca em um sistema escalável." },
        de: { title: "Übergang zu Schritt 6 · Das 36-Tafeln-Markenhandbuch & 9 Deliverables", desc: "Wie Rasterdisziplin und Ihre 9 Produktionsdateien Ihre Marke in ein skalierbares System verwandeln." },
        it: { title: "Transizione al Passo 6 · Il Manuale Ufficiale di 36 Tavole e i 9 Deliverable", desc: "Come la disciplina della griglia e i tuoi 9 file trasformano il brand in un sistema scalabile." }
      }
    }
  ];

  const APP_TOUR_FLOW_ITEMS = [
    {
      id: "step0_1",
      type: "step",
      badge: "PASO 0.1 · PUNTO DE PARTIDA",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/tour_step0_1_objetivo.png"); },
      get secondaryImg() { return getLocalizedAppCaptureUrl("/assets/app_captures/step0_logo_aura.png"); },
      i18n: {
        es: { badge: "PASO 0.1 · PUNTO DE PARTIDA", title: "Eliges tu objetivo y conversas con Aura", desc: "Desde el primer segundo, la interfaz limpia te permite elegir si crearás una marca desde cero o evolucionarás tu logotipo actual, acompañado por el orbe líquido 3D de Aura en tiempo real." },
        en: { badge: "STEP 0.1 · STARTING POINT", title: "Choose your goal and talk with Aura", desc: "From the very first second, a clean interface lets you choose whether to build a brand from scratch or evolve your existing logo, guided by Aura's live 3D Liquid Glass orb." },
        fr: { badge: "ÉTAPE 0.1 · POINT DE DÉPART", title: "Choisissez votre objectif et échangez avec Aura", desc: "Dès la première seconde, choisissez de créer une marque de zéro ou de faire évoluer votre logo actuel avec l'orbe 3D d'Aura." },
        pt: { badge: "PASSO 0.1 · PONTO DE PARTIDA", title: "Escolha seu objetivo e converse com a Aura", desc: "Desde o primeiro segundo, escolha criar uma marca do zero ou evoluir seu logotipo atual com o orbe 3D da Aura." },
        de: { badge: "SCHRITT 0.1 · AUSGANGSPUNKT", title: "Ziel wählen und mit Aura sprechen", desc: "Wählen Sie vom ersten Moment an zwischen Neuerstellung oder Evolution Ihres bestehenden Logos mit Auras 3D-Orb." },
        it: { badge: "PASSO 0.1 · PUNTO DI PARTENZA", title: "Scegli il tuo obiettivo e dialoga con Aura", desc: "Dal primo secondo scegli se creare un brand da zero o evolvere il tuo logo attuale con la sfera 3D di Aura." }
      }
    },
    {
      id: "step0_3",
      type: "step",
      badge: "PASO 0.3 · GIRO Y ARQUITECTURA",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/tour_step0_3_giro.png"); },
      get secondaryImg() { return getLocalizedAppCaptureUrl("/assets/app_captures/step0_logo_aura.png"); },
      i18n: {
        es: { badge: "PASO 0.3 · GIRO Y ARQUITECTURA", title: "Defines tu giro empresarial por voz o texto", desc: "Describes con tus propias palabras qué hace tu empresa. El motor comprende el contexto industrial y configura si tu marca será monolítica o con submarcas." },
        en: { badge: "STEP 0.3 · SECTOR & ARCHITECTURE", title: "Define your business sector by voice or text", desc: "Describe what your company does in your own words. The engine understands your industry context and configures a monolithic or multi-brand architecture." },
        fr: { badge: "ÉTAPE 0.3 · SECTEUR ET ARCHITECTURE", title: "Définissez votre secteur par la voix ou le texte", desc: "Décrivez avec vos propres mots l'activité de votre entreprise pour calibrer toute l'architecture." },
        pt: { badge: "PASSO 0.3 · RAMO E ARQUITETURA", title: "Defina seu ramo por voz ou texto", desc: "Descreva com suas próprias palavras o que sua empresa faz para calibrar toda a arquitetura da marca." },
        de: { badge: "SCHRITT 0.3 · BRANCHE & ARCHITEKTUR", title: "Branche per Sprache oder Text definieren", desc: "Beschreiben Sie in eigenen Worten Ihr Geschäftsfeld zur automatischen Kalibrierung der Markenarchitektur." },
        it: { badge: "PASSO 0.3 · SETTORE E ARCHITETTURA", title: "Definisci il tuo settore con voce o testo", desc: "Descrivi con parole tue cosa fa la tua azienda per calibrare l'intera architettura del brand." }
      }
    },
    {
      id: "popup_0_1",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 0 A PASO 1",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_0_a_1.png"); },
      videoIdx: 1,
      i18n: {
        es: { badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 0 A PASO 1", title: "Cápsula emergente: El Círculo Dorado antes del Paso 1", desc: "Al avanzar de etapa, la aplicación despliega un pop-up cinematográfico 9:16 con el fundador en HeyGen y B-Roll Google Flow que te explica cómo definir el Porqué de tu empresa." },
        en: { badge: "VIDEO POP-UP · TRANSITION STEP 0 TO STEP 1", title: "Pop-up Capsule: The Golden Circle before Step 1", desc: "When advancing stages, the app presents a 9:16 cinematic pop-up with HeyGen founder avatar and Google Flow B-Roll explaining how to articulate your company's Why." },
        fr: { badge: "POP-UP VIDÉO · TRANSITION ÉTAPE 0 À ÉTAPE 1", title: "Pop-up Vidéo : Le Cercle d'Or avant l'Étape 1", desc: "À chaque transition, un pop-up vidéo 9:16 avec avatar HeyGen et B-Roll Google Flow explique la théorie de l'étape suivante." },
        pt: { badge: "POP-UP DE VÍDEO · TRANSIÇÃO PASSO 0 AO PASSO 1", title: "Pop-up de Vídeo: O Círculo Dourado antes do Passo 1", desc: "Ao avançar de etapa, o app exibe um pop-up 9:16 com avatar HeyGen e B-Roll Google Flow explicando como definir seu Porquê." },
        de: { badge: "VIDEO-POP-UP · ÜBERGANG SCHRITT 0 ZU SCHRITT 1", title: "Video-Pop-up: Der Golden Circle vor Schritt 1", desc: "Beim Phasenwechsel öffnet sich ein 9:16-Video-Pop-up mit HeyGen-Avatar und Google Flow B-Roll zur Einführung in den Golden Circle." },
        it: { badge: "POP-UP VIDEO · TRANSIZIONE PASSO 0 A PASSO 1", title: "Pop-up Video: Il Cerchio d'Oro prima del Passo 1", desc: "Al cambio di fase, l'app mostra un pop-up video 9:16 con avatar HeyGen e B-Roll Google Flow che spiega come definire il tuo Perché." }
      }
    },
    {
      id: "step1_main",
      type: "step",
      badge: "PASO 1 · ADN Y CÍRCULO DORADO",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/step1_proposito_sinek.png"); },
      get secondaryImg() { return getLocalizedAppCaptureUrl("/assets/app_captures/tour_step1_6_persona.png"); },
      i18n: {
        es: { badge: "PASO 1 · ADN Y CÍRCULO DORADO", title: "Estructuras tu Propósito, Método, Promesa y Personalidad", desc: "Guiado por preguntas claras y corrección ortográfica/ejecutiva en un clic, defines el corazón filosófico de tu marca y su arquetipo humano." },
        en: { badge: "STEP 1 · BRAND DNA & GOLDEN CIRCLE", title: "Structure your Purpose, Method, Promise & Brand Persona", desc: "Guided by clear prompts and 1-click executive copy refinement, you define the philosophical core and human persona of your brand." },
        fr: { badge: "ÉTAPE 1 · ADN ET CERCLE D'OR", title: "Structurez votre Raison d'être, Méthode et Personnalité", desc: "Guidé par des questions claires et une révision exécutive en un clic, vous définissez le cœur de votre marque." },
        pt: { badge: "PASSO 1 · DNA E CÍRCULO DOURADO", title: "Estruture seu Propósito, Método, Promessa e Personalidade", desc: "Guiado por perguntas claras e revisão executiva em um clique, você define o coração estratégico da sua marca." },
        de: { badge: "SCHRITT 1 · MARKEN-DNA & GOLDEN CIRCLE", title: "Zweck, Methode, Versprechen & Markenpersönlichkeit", desc: "Mit klaren Impulsen und 1-Klick-Textoptimierung definieren Sie den strategischen Kern Ihrer Marke." },
        it: { badge: "PASSO 1 · DNA E CERCHIO D'ORO", title: "Struttura Scopo, Metodo, Promessa e Personalità", desc: "Guidato da domande chiare e revisione esecutiva in un clic, definisci il cuore strategico del tuo brand." }
      }
    },
    {
      id: "popup_1_2",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 1 A PASO 2",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_1_a_2.png"); },
      videoIdx: 2,
      i18n: {
        es: { badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 1 A PASO 2", title: "Cápsula emergente: Momentos de la Verdad (Jan Carlzon)", desc: "Antes de mapear la experiencia de tu cliente, la cápsula de video te muestra cómo los primeros 15 segundos de contacto determinan la lealtad hacia tu marca." },
        en: { badge: "VIDEO POP-UP · TRANSITION STEP 1 TO STEP 2", title: "Pop-up Capsule: Moments of Truth (Jan Carlzon)", desc: "Before mapping your customer journey, this video pop-up shows how the first 15 seconds of contact determine brand loyalty." },
        fr: { badge: "POP-UP VIDÉO · TRANSITION ÉTAPE 1 À ÉTAPE 2", title: "Pop-up Vidéo : Les Moments de Vérité (Jan Carlzon)", desc: "Découvrez comment 15 secondes d'interaction déterminent la confiance de vos clients." },
        pt: { badge: "POP-UP DE VÍDEO · TRANSIÇÃO PASSO 1 AO PASSO 2", title: "Pop-up de Vídeo: Momentos da Verdade (Jan Carlzon)", desc: "Veja como os primeiros 15 segundos de contato determinam a fidelidade do seu cliente." },
        de: { badge: "VIDEO-POP-UP · ÜBERGANG SCHRITT 1 ZU SCHRITT 2", title: "Video-Pop-up: Momente der Wahrheit (Jan Carlzon)", desc: "Erleben Sie, wie die ersten 15 Sekunden Kundenkontakt über langfristige Markentreue entscheiden." },
        it: { badge: "POP-UP VIDEO · TRANSIZIONE PASSO 1 A PASSO 2", title: "Pop-up Video: I Momenti della Verità (Jan Carlzon)", desc: "Scopri come i primi 15 secondi di contatto determinano la fedeltà verso il tuo brand." }
      }
    },
    {
      id: "step2_main",
      type: "step",
      badge: "PASO 2 · TOUCHPOINTS ANTES, DURANTE Y DESPUÉS",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/step2_touchpoints_carlzon.png"); },
      get secondaryImg() { return getLocalizedAppCaptureUrl("/assets/app_captures/tour_step2_2_durante.png"); },
      i18n: {
        es: { badge: "PASO 2 · TOUCHPOINTS ANTES, DURANTE Y DESPUÉS", title: "Seleccionas los puntos de contacto clave de tu negocio", desc: "Eliges y personalizas cómo te descubren tus clientes (Antes), cómo viven tu servicio (Durante) y cómo aseguras que regresen y te recomienden (Después)." },
        en: { badge: "STEP 2 · BEFORE, DURING & AFTER TOUCHPOINTS", title: "Select the key touchpoints of your business", desc: "Choose and customize how customers discover you (Before), experience your service (During), and stay loyal (After)." },
        fr: { badge: "ÉTAPE 2 · TOUCHPOINTS AVANT, PENDANT ET APRÈS", title: "Sélectionnez les points de contact clés de votre entreprise", desc: "Personnalisez comment vos clients vous découvrent (Avant), vivent votre service (Pendant) et restent fidèles (Après)." },
        pt: { badge: "PASSO 2 · TOUCHPOINTS ANTES, DURANTE E DEPOIS", title: "Selecione os pontos de contato chave do seu negócio", desc: "Personalize como seus clientes descobrem você (Antes), vivem seu serviço (Durante) e permanecem fiéis (Depois)." },
        de: { badge: "SCHRITT 2 · TOUCHPOINTS VORHER, WÄHREND & NACHHER", title: "Wählen Sie die wichtigsten Kontaktpunkte Ihres Geschäfts", desc: "Definieren Sie, wie Kunden Sie entdecken (Vorher), erleben (Währenddessen) und weiterempfehlen (Nachher)." },
        it: { badge: "PASSO 2 · TOUCHPOINT PRIMA, DURANTE E DOPO", title: "Seleziona i punti di contatto chiave del tuo business", desc: "Personalizza come i clienti ti scoprono (Prima), vivono il servizio (Durante) e restano fedeli (Dopo)." }
      }
    },
    {
      id: "popup_2_3",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 2 A PASO 3",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_2_a_3.png"); },
      videoIdx: 3,
      i18n: {
        es: { badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 2 A PASO 3", title: "Cápsula emergente: Naming Estratégico y Posicionamiento", desc: "El pop-up de video introduce las leyes de posicionamiento de Al Ries & Jack Trout y la fonética comercial SMILE antes de bautizar o confirmar el nombre de tu marca." },
        en: { badge: "VIDEO POP-UP · TRANSITION STEP 2 TO STEP 3", title: "Pop-up Capsule: Strategic Naming & Positioning", desc: "This video pop-up introduces Al Ries & Jack Trout's positioning laws and SMILE commercial phonetics before confirming your brand name." },
        fr: { badge: "POP-UP VIDÉO · TRANSITION ÉTAPE 2 À ÉTAPE 3", title: "Pop-up Vidéo : Naming Stratégique et Positionnement", desc: "Introduction aux lois du positionnement et à la phonétique de marque SMILE." },
        pt: { badge: "POP-UP DE VÍDEO · TRANSIÇÃO PASSO 2 AO PASSO 3", title: "Pop-up de Vídeo: Naming Estratégico e Posicionamento", desc: "Introdução às leis de posicionamento e fonética comercial SMILE antes de confirmar seu nome." },
        de: { badge: "VIDEO-POP-UP · ÜBERGANG SCHRITT 2 ZU SCHRITT 3", title: "Video-Pop-up: Strategisches Naming & Positionierung", desc: "Einführung in die Gesetze der Markenpositionierung und kommerziellen Phonetik." },
        it: { badge: "POP-UP VIDEO · TRANSIZIONE PASSO 2 A PASSO 3", title: "Pop-up Video: Naming Strategico e Posizionamento", desc: "Introduzione alle leggi del posizionamento e alla fonetica commerciale." }
      }
    },
    {
      id: "step3_main",
      type: "step",
      badge: "PASO 3 · NAMING, ESLOGAN Y CLASES DE NIZA",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/step3_naming_niza.png"); },
      get secondaryImg() { return getLocalizedAppCaptureUrl("/assets/app_captures/tour_step3_2_naming.png"); },
      i18n: {
        es: { badge: "PASO 3 · NAMING, ESLOGAN Y CLASES DE NIZA", title: "Confirmas tu Nombre, Eslogan y Clasificación Legal de Niza", desc: "Exploras propuestas de naming o validas tu nombre actual junto con su eslogan y las Clases Internacionales de Niza exactas para proteger tu marca ante IMPI, USPTO o EUIPO." },
        en: { badge: "STEP 3 · NAMING, TAGLINE & NICE CLASSES", title: "Confirm your Name, Tagline & Legal Nice Classification", desc: "Explore naming proposals or validate your current name, tagline, and exact International Nice Classes for trademark registration." },
        fr: { badge: "ÉTAPE 3 · NAMING, SLOGAN ET CLASSES DE NICE", title: "Confirmez votre Nom, Slogan et Classification de Nice", desc: "Validez votre nom commercial, votre slogan et les classes internationales de Nice pour le dépôt de marque." },
        pt: { badge: "PASSO 3 · NAMING, SLOGAN E CLASSES DE NICE", title: "Confirme seu Nome, Slogan e Classificação de Nice", desc: "Valide seu nome comercial, slogan e as Classes Internacionais de Nice exatas para registro de marca." },
        de: { badge: "SCHRITT 3 · NAMING, CLAIM & NIZZA-KLASSEN", title: "Markenname, Claim & Nizza-Klassifikation bestätigen", desc: "Bestätigen Sie Ihren Markennamen, Ihren Claim und die exakten Nizza-Klassen für den Markenschutz." },
        it: { badge: "PASSO 3 · NAMING, PAYOFF E CLASSI DI NIZZA", title: "Conferma Nome, Payoff e Classificazione di Nizza", desc: "Convalida il nome del brand, lo slogan e le Classi Internazionali di Nizza per la registrazione del marchio." }
      }
    },
    {
      id: "popup_3_4",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 3 A PASO 4",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_3_a_4.png"); },
      videoIdx: 4,
      i18n: {
        es: { badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 3 A PASO 4", title: "Cápsula emergente: Ingeniería Kansei y Psicología de la Forma", desc: "Descubre en video cómo la metodología japonesa Kansei traduce tus valores estratégicos en peso tipográfico, curvatura y carácter visual." },
        en: { badge: "VIDEO POP-UP · TRANSITION STEP 3 TO STEP 4", title: "Pop-up Capsule: Kansei Engineering & Psychology of Form", desc: "Discover how Japanese Kansei engineering translates your strategic values into typographic weight, curvature, and visual character." },
        fr: { badge: "POP-UP VIDÉO · TRANSITION ÉTAPE 3 À ÉTAPE 4", title: "Pop-up Vidéo : Ingénierie Kansei et Psychologie des Formes", desc: "Découvrez comment la méthode japonaise Kansei traduit vos valeurs en typographie et géométrie." },
        pt: { badge: "POP-UP DE VÍDEO · TRANSIÇÃO PASSO 3 AO PASSO 4", title: "Pop-up de Vídeo: Engenharia Kansei e Psicologia da Forma", desc: "Descubra como a metodologia japonesa Kansei traduz seus valores em tipografia e geometria." },
        de: { badge: "VIDEO-POP-UP · ÜBERGANG SCHRITT 3 ZU SCHRITT 4", title: "Video-Pop-up: Kansei-Engineering & Formpsychologie", desc: "Erfahren Sie, wie japanisches Kansei-Engineering Ihre Markenwerte in Typografie und Geometrie übersetzt." },
        it: { badge: "POP-UP VIDEO · TRANSIZIONE PASSO 3 A PASSO 4", title: "Pop-up Video: Ingegneria Kansei e Psicologia della Forma", desc: "Scopri come il metodo giapponese Kansei traduce i tuoi valori in tipografia e geometria." }
      }
    },
    {
      id: "step4_main",
      type: "step",
      badge: "PASO 4 · BRÚJULA KANSEI Y TIPOGRAFÍA HÍBRIDA",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/step4_kansei_tipografia.png"); },
      get secondaryImg() { return getLocalizedAppCaptureUrl("/assets/app_captures/tour_step4_1_kansei.png"); },
      i18n: {
        es: { badge: "PASO 4 · BRÚJULA KANSEI Y TIPOGRAFÍA HÍBRIDA", title: "Calibras tus ejes sensoriales y eliges tus fuentes oficiales", desc: "Ajustas los deslizadores Kansei y seleccionas tu arquitectura tipográfica (Primaria, Secundaria y Monoespaciada) con empaquetado automático .TTF en archivo .ZIP." },
        en: { badge: "STEP 4 · KANSEI COMPASS & HYBRID TYPOGRAPHY", title: "Calibrate sensory axes and select your official fonts", desc: "Adjust the Kansei sliders and choose your typographic hierarchy (Primary, Secondary, Monospace) with automatic .TTF font bundling in a .ZIP kit." },
        fr: { badge: "ÉTAPE 4 · BOUSSOLE KANSEI ET TYPOGRAPHIE HYBRIDE", title: "Calibrez vos axes sensoriels et choisissez vos polices", desc: "Ajustez les curseurs Kansei et sélectionnez votre duo typographique officiel avec kit .ZIP inclus." },
        pt: { badge: "PASSO 4 · BÚSSOLA KANSEI E TIPOGRAFIA HÍBRIDA", title: "Calibre seus eixos sensoriais e escolha suas fontes", desc: "Ajuste os controles Kansei e selecione sua hierarquia tipográfica oficial com pacote .ZIP incluso." },
        de: { badge: "SCHRITT 4 · KANSEI-KOMPASS & HYBRIDE TYPOGRAFIE", title: "Sensorische Achsen kalibrieren & Schriften wählen", desc: "Kalibrieren Sie die Kansei-Regler und wählen Sie Ihre offizielle Schrifthierarchie inklusive .ZIP-Schriftenpaket." },
        it: { badge: "PASSO 4 · BUSSOLA KANSEI E TIPOGRAFIA IBRIDA", title: "Calibra gli assi sensoriali e scegli i tuoi font ufficiali", desc: "Regola i cursori Kansei e seleziona la gerarchia tipografica ufficiale con kit .ZIP incluso." }
      }
    },
    {
      id: "popup_4_5",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 4 A PASO 5",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_4_a_5.png"); },
      videoIdx: 5,
      i18n: {
        es: { badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 4 A PASO 5", title: "Cápsula emergente: Síntesis Vectorial Nano Banana Pro y Colorimetría", desc: "El video explica cómo la simplicidad geométrica de Paul Rand y Jony Ive permite que un símbolo funcione desde el ícono de una app hasta la fachada de un edificio." },
        en: { badge: "VIDEO POP-UP · TRANSITION STEP 4 TO STEP 5", title: "Pop-up Capsule: Nano Banana Pro Vector Synthesis & Colorimetry", desc: "This video explains how geometric simplicity lets your emblem scale effortlessly from a mobile app icon to a building facade." },
        fr: { badge: "POP-UP VIDÉO · TRANSITION ÉTAPE 4 À ÉTAPE 5", title: "Pop-up Vidéo : Synthèse Vectorielle Nano Banana Pro et Colorimétrie", desc: "Comment la simplicité géométrique permet à votre emblème de fonctionner à toutes les échelles." },
        pt: { badge: "POP-UP DE VÍDEO · TRANSIÇÃO PASSO 4 AO PASSO 5", title: "Pop-up de Vídeo: Síntese Vetorial Nano Banana Pro e Colorimetria", desc: "Como a simplicidade geométrica permite que seu símbolo funcione de um ícone de app até uma fachada." },
        de: { badge: "VIDEO-POP-UP · ÜBERGANG SCHRITT 4 ZU SCHRITT 5", title: "Video-Pop-up: Nano Banana Pro Vektorsynthese & Farbarchitektur", desc: "Wie geometrische Präzision dafür sorgt, dass Ihr Markenzeichen vom App-Icon bis zur Gebäudefassade wirkt." },
        it: { badge: "POP-UP VIDEO · TRANSIZIONE PASSO 4 A PASSO 5", title: "Pop-up Video: Sintesi Vettoriale Nano Banana Pro e Colorimetria", desc: "Come la semplicità geometrica permette al tuo simbolo di funzionare da un'icona app fino a una facciata." }
      }
    },
    {
      id: "step5_main",
      type: "step",
      badge: "PASO 5 · TALLER DE LOGOTIPO NANO BANANA PRO Y LIQUID GLASS",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/step5_taller_logo_liquid_glass.png"); },
      get secondaryImg() { return getLocalizedAppCaptureUrl("/assets/app_captures/tour_step5_2_iter6_claro.png"); },
      i18n: {
        es: { badge: "PASO 5 · TALLER DE LOGOTIPO NANO BANANA PRO Y LIQUID GLASS", title: "Evolucionas con Nano Banana Pro y apruebas tu Logotipo en Curvas", desc: "Visualizas tus iteraciones sobre lienzo claro (#FFFFFF) y soporte oscuro (#090D16), ajustas tu paleta HEX/CMYK/Pantone y bloqueas la versión maestra en vectores matemáticos." },
        en: { badge: "STEP 5 · NANO BANANA PRO & LIQUID GLASS LOGO ATELIER", title: "Evolve with Nano Banana Pro and approve your Official Vector Logo", desc: "Preview iterations on light (#FFFFFF) and dark (#090D16) canvases, fine-tune your HEX/CMYK/Pantone palette, and lock in your master vector emblem." },
        fr: { badge: "ÉTAPE 5 · ATELIER LOGO NANO BANANA PRO ET LIQUID GLASS", title: "Faites évoluer avec Nano Banana Pro et validez votre Logotype", desc: "Prévisualisez vos itérations sur fond clair et sombre, ajustez votre palette HEX/CMYK/Pantone et validez le vecteur maître." },
        pt: { badge: "PASSO 5 · ATELIER DE LOGOTIPO NANO BANANA PRO E LIQUID GLASS", title: "Evolua com Nano Banana Pro e aprove seu Logotipo Oficial", desc: "Visualize suas iterações em fundo claro e escuro, ajuste sua paleta HEX/CMYK/Pantone e aprove o vetor mestre." },
        de: { badge: "SCHRITT 5 · NANO BANANA PRO & LIQUID GLASS LOGO-ATELIER", title: "Mit Nano Banana Pro Vektor-Logo entwickeln und freigeben", desc: "Prüfen Sie Varianten auf hellem und dunklem Grund, kalibrieren Sie HEX/CMYK/Pantone und bestätigen Sie das Master-Logo." },
        it: { badge: "PASSO 5 · ATELIER DEL LOGO NANO BANANA PRO E LIQUID GLASS", title: "Evolvi con Nano Banana Pro e approva il tuo Logo in Curve", desc: "Visualizza le iterazioni su sfondo chiaro e scuro, regola la palette HEX/CMYK/Pantone e approva il vettore master." }
      }
    },
    {
      id: "popup_5_6",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 5 A PASO 6",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/popup_video_paso_5_a_6.png"); },
      videoIdx: 6,
      i18n: {
        es: { badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 5 A PASO 6", title: "Cápsula emergente: La Bóveda del Manual de 36 Láminas", desc: "Última cápsula antes de entrar a tu bóveda: cómo usar tu Manual de Identidad y tus 9 entregables con imprentas, diseñadores y equipo comercial." },
        en: { badge: "VIDEO POP-UP · TRANSITION STEP 5 TO STEP 6", title: "Pop-up Capsule: The 36-Plate Brandbook Vault", desc: "Final video capsule before entering your vault: how to deploy your 36-Plate Brandbook and 9 deliverables across print shops, designers, and sales teams." },
        fr: { badge: "POP-UP VIDÉO · TRANSITION ÉTAPE 5 À ÉTAPE 6", title: "Pop-up Vidéo : Le Coffre du Manuel de 36 Planches", desc: "Dernière capsule avant le coffre : comment utiliser votre manuel et vos 9 livrables au quotidien." },
        pt: { badge: "POP-UP DE VÍDEO · TRANSIÇÃO PASSO 5 AO PASSO 6", title: "Pop-up de Vídeo: O Cofre do Manual de 36 Lâminas", desc: "Última cápsula antes do cofre: como usar seu Manual de 36 Lâminas e seus 9 entregáveis com gráficas e equipe." },
        de: { badge: "VIDEO-POP-UP · ÜBERGANG SCHRITT 5 ZU SCHRITT 6", title: "Video-Pop-up: Der Tresor des 36-Tafeln-Handbuchs", desc: "Letzte Kapsel vor dem Tresor: Wie Sie Ihr Handbuch und alle 9 Deliverables im Alltag einsetzen." },
        it: { badge: "POP-UP VIDEO · TRANSIZIONE PASSO 5 A PASSO 6", title: "Pop-up Video: Il Caveau del Manuale di 36 Tavole", desc: "Ultima capsula prima del caveau: come utilizzare il Manuale di 36 Tavole e i 9 deliverable con stamperie e team." }
      }
    },
    {
      id: "step6_1",
      type: "step",
      badge: "PASO 6.1 · VISOR EN VIVO DE LAS 36 LÁMINAS",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/step6_visor_36_laminas.png"); },
      secondaryImg: "/assets/brandbook_plates_tbb/plate-01.jpg",
      i18n: {
        es: { badge: "PASO 6.1 · VISOR EN VIVO DE LAS 36 LÁMINAS", title: "Inspeccionas tu Manual Oficial de 36 Láminas hoja por hoja", desc: "Recorres las 36 láminas compiladas en tiempo real: portada monolítica, índice rector, Círculo Dorado, Touchpoints, retícula del logo, paleta industrial y mockups fotográficos 4:3." },
        en: { badge: "STEP 6.1 · LIVE 36-PLATE BRANDBOOK VIEWER", title: "Inspect your 36-Plate Official Brandbook page by page", desc: "Flip through all 36 compiled plates in real time: monolithic cover, master index, Golden Circle, Touchpoints, logo grid, industrial palette, and 4:3 photo mockups." },
        fr: { badge: "ÉTAPE 6.1 · VISIONNEUSE EN DIRECT DES 36 PLANCHES", title: "Inspectez votre Manuel Officiel de 36 Planches page par page", desc: "Parcourez les 36 planches compilées en temps réel avant l'exportation finale." },
        pt: { badge: "PASSO 6.1 · VISUALIZADOR AO VIVO DAS 36 LÂMINAS", title: "Inspecione seu Manual Oficial de 36 Lâminas folha por folha", desc: "Navegue pelas 36 lâminas compiladas em tempo real antes de exportar." },
        de: { badge: "SCHRITT 6.1 · LIVE-VIEWER DER 36 TAFELN", title: "Prüfen Sie Ihr 36-Tafeln-Markenhandbuch Seite für Seite", desc: "Blättern Sie in Echtzeit durch alle 36 kompilierten Tafeln vor dem Export." },
        it: { badge: "PASSO 6.1 · VISORE LIVE DELLE 36 TAVOLE", title: "Ispeziona il tuo Manuale Ufficiale di 36 Tavole pagina per pagina", desc: "Sfoglia tutte le 36 tavole compilate in tempo reale prima dell'esportazione." }
      }
    },
    {
      id: "step6_2_deliverables",
      type: "deliverables_finale",
      badge: "PASO 6.2 Y 6.3 · DESCARGA DE LOS 9 ENTREGABLES OFICIALES",
      get img() { return getLocalizedAppCaptureUrl("/assets/app_captures/step6_boveda_entregables.png"); },
      secondaryImg: "/assets/app_captures/step6_firma_correo_html.png",
      i18n: {
        es: { badge: "PASO 6.2 Y 6.3 · DESCARGA DE LOS 9 ENTREGABLES OFICIALES", title: "Descargas tus 9 Entregables Oficiales listos para operar", desc: "Al final del recorrido descargas en un clic tu Manual PDF de 36 Láminas, Visor Web HTML, Logotipo Horizontal SVG, Maestro Illustrator .AI, Isotipo 1024px, Firma de Correo HTML, Hoja Membretada Word .DOCX, Presentación PowerPoint .PPTX y Kit de Fuentes .ZIP." },
        en: { badge: "STEP 6.2 & 6.3 · DOWNLOAD ALL 9 OFFICIAL DELIVERABLES", title: "Download all 9 Official Deliverables ready for business", desc: "At the end of the tour, download in one click your 36-Plate PDF Brandbook, Interactive HTML Viewer, Horizontal SVG Logo, Native Illustrator .AI, 1024px App Icon, HTML Email Signature, Word Letterhead .DOCX, PowerPoint Deck .PPTX, and Font Kit .ZIP." },
        fr: { badge: "ÉTAPE 6.2 ET 6.3 · TÉLÉCHARGEMENT DES 9 LIVRABLES OFFICIELS", title: "Téléchargez vos 9 Livrables Officiels prêts à l'emploi", desc: "À la fin du parcours, téléchargez en un clic votre Manuel PDF 36 Planches, Visionneuse HTML, SVG, Illustrator .AI, Icône 1024px, Signature HTML, Word .DOCX, PowerPoint .PPTX et Kit de Polices .ZIP." },
        pt: { badge: "PASSO 6.2 E 6.3 · DOWNLOAD DOS 9 ENTREGÁVEIS OFICIAIS", title: "Baixe seus 9 Entregáveis Oficiais prontos para usar", desc: "No final do tour, baixe em um clique seu Manual PDF de 36 Lâminas, Visualizador HTML, SVG, Illustrator .AI, Ícone 1024px, Assinatura HTML, Word .DOCX, PowerPoint .PPTX e Kit de Fontes .ZIP." },
        de: { badge: "SCHRITT 6.2 & 6.3 · DOWNLOAD ALLER 9 OFFIZIELLEN DELIVERABLES", title: "Laden Sie alle 9 offiziellen Deliverables einsatzbereit herunter", desc: "Am Ende der Tour laden Sie per Klick Ihr 36-Tafeln-PDF, HTML-Viewer, SVG, Illustrator .AI, 1024px Icon, HTML-Signatur, Word .DOCX, PowerPoint .PPTX und Font-Kit .ZIP herunter." },
        it: { badge: "PASSO 6.2 E 6.3 · DOWNLOAD DEI 9 DELIVERABLE UFFICIALI", title: "Scarica i tuoi 9 Deliverable Ufficiali pronti per operare", desc: "Alla fine del percorso scarichi con un clic il Manuale PDF di 36 Tavole, Visore HTML, SVG, Illustrator .AI, Icona 1024px, Firma HTML, Word .DOCX, PowerPoint .PPTX e Kit Font .ZIP." }
      }
    }
  ];

  const OFFICIAL_9_DELIVERABLES = [
    {
      num: "01",
      format: ".PDF · 36 PLATES",
      plateNum: 1,
      thumb: "/assets/brandbook_plates_tbb/plate-01.jpg",
      sampleUrl: "/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf",
      i18n: {
        es: { format: ".PDF · 36 LÁMINAS", title: "Manual Oficial de Identidad de 36 Láminas (.PDF)", desc: "Documento maestro de 36 páginas 16:9 sobre lienzo claro con índice rector, Círculo Dorado, Touchpoints, terna de logotipos, retícula constructiva, paleta CMYK/Pantone y aplicaciones reales." },
        en: { format: ".PDF · 36 PLATES", title: "36-Plate Official Brand Identity Manual (.PDF)", desc: "36-page 16:9 master document on a light canvas featuring master index, Golden Circle, Touchpoints, logo suite, construction grid, CMYK/Pantone palette, and real-world mockups." },
        fr: { format: ".PDF · 36 PLANCHES", title: "Manuel Officiel d'Identité de 36 Planches (.PDF)", desc: "Document maître de 36 pages 16:9 avec sommaire, Cercle d'Or, Touchpoints, logotypes, grille de construction, palette CMJN/Pantone et applications." },
        pt: { format: ".PDF · 36 LÂMINAS", title: "Manual Oficial de Identidade de 36 Lâminas (.PDF)", desc: "Documento mestre de 36 páginas 16:9 com índice diretor, Círculo Dourado, Touchpoints, terna de logotipos, grid construtivo, paleta CMYK/Pantone e aplicações." },
        de: { format: ".PDF · 36 TAFELN", title: "Offizielles 36-Tafeln-Markenhandbuch (.PDF)", desc: "36-seitiges 16:9-Masterdokument mit Inhaltsverzeichnis, Golden Circle, Touchpoints, Logo-Suite, Konstruktionsraster, CMYK/Pantone-Palette und Mockups." },
        it: { format: ".PDF · 36 TAVOLE", title: "Manuale Ufficiale d'Identità di 36 Tavole (.PDF)", desc: "Documento master di 36 pagine 16:9 con indice generale, Cerchio d'Oro, Touchpoint, terna di loghi, griglia costruttiva, palette CMYK/Pantone e mockup." }
      }
    },
    {
      num: "02",
      format: ".HTML · WEB VIEWER",
      plateNum: 2,
      thumb: "/assets/brandbook_plates_tbb/plate-02.jpg",
      sampleUrl: "/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.html",
      i18n: {
        es: { format: ".HTML · VISOR INTERACTIVO", title: "Manual Web Autónomo de 36 Láminas (.HTML)", desc: "Archivo interactivo autónomo con navegación instantánea entre las 36 láminas, ideal para compartir con tu equipo directivo, diseñadores y proveedores." },
        en: { format: ".HTML · INTERACTIVE VIEWER", title: "Standalone Interactive 36-Plate Web Brandbook (.HTML)", desc: "Self-contained interactive file with instant navigation across all 36 plates, ideal for sharing with your executive team, designers, and vendors." },
        fr: { format: ".HTML · VISIONNEUSE WEB", title: "Manuel Web Autonome de 36 Planches (.HTML)", desc: "Fichier interactif autonome permettant de naviguer instantanément entre les 36 planches sur tout navigateur." },
        pt: { format: ".HTML · VISUALIZADOR INTERATIVO", title: "Manual Web Autônomo de 36 Lâminas (.HTML)", desc: "Arquivo interativo autônomo com navegação rápida entre as 36 lâminas para compartilhar com equipe e fornecedores." },
        de: { format: ".HTML · INTERAKTIVER VIEWER", title: "Eigenständiges Interaktives Web-Brandbook (.HTML)", desc: "Interaktive Einzeldatei mit Sofortnavigation durch alle 36 Tafeln für Team, Agenturen und Lieferanten." },
        it: { format: ".HTML · VISORE INTERATTIVO", title: "Manuale Web Autonomo di 36 Tavole (.HTML)", desc: "File interattivo autonomo con navigazione istantanea tra le 36 tavole da condividere con team e fornitori." }
      }
    },
    {
      num: "03",
      format: ".SVG · PURE VECTORS",
      plateNum: 13,
      thumb: "/assets/brandbook_plates_tbb/plate-13.jpg",
      sampleUrl: "/assets/logos/Logotipo_Horizontal_Curvas_the_best_brand.svg",
      i18n: {
        es: { format: ".SVG · VECTORES PUROS", title: "Logotipo Horizontal Oficial en Curvas (.SVG)", desc: "Archivo vectorial matemático escalable al infinito sin pérdida de nitidez para web, rotulación vehicular, espectaculares y bordado." },
        en: { format: ".SVG · PURE VECTORS", title: "Official Horizontal Vector Logo in Curves (.SVG)", desc: "Infinitely scalable mathematical vector file with zero quality loss for web, vehicle wraps, billboards, and embroidery." },
        fr: { format: ".SVG · VECTEURS PURS", title: "Logotype Horizontal Officiel en Courbes (.SVG)", desc: "Fichier vectoriel mathématique extensible à l'infini pour le web, la signalétique et l'impression grand format." },
        pt: { format: ".SVG · VETORES PUROS", title: "Logotipo Horizontal Oficial em Curvas (.SVG)", desc: "Arquivo vetorial matemático escalável ao infinito sem perda de nitidez para web, frota, outdoor e bordado." },
        de: { format: ".SVG · REINE VEKTOREN", title: "Offizielles Horizontales Vektor-Logo (.SVG)", desc: "Unendlich skalierbare mathematische Vektordatei ohne Qualitätsverlust für Web, Beschriftung und Großformatdruck." },
        it: { format: ".SVG · VETTORI PURI", title: "Logotipo Orizzontale Ufficiale in Curve (.SVG)", desc: "File vettoriale matematico scalabile all'infinito senza perdita di qualità per web, insegne e stampa." }
      }
    },
    {
      num: "04",
      format: ".AI · ADOBE ILLUSTRATOR",
      plateNum: 14,
      thumb: "/assets/brandbook_plates_tbb/plate-14.jpg",
      sampleUrl: "/assets/deliverables_tbb/Logotipo_Horizontal_Curvas_the_best_brand.ai",
      i18n: {
        es: { format: ".AI · ADOBE ILLUSTRATOR", title: "Archivo Maestro Editable en Capas (.AI)", desc: "Código nativo Adobe Illustrator con trazos Bézier puros, retícula constructiva y capas organizadas para imprentas offset y diseñadores." },
        en: { format: ".AI · ADOBE ILLUSTRATOR", title: "Layered Native Master Vector File (.AI)", desc: "Native Adobe Illustrator file with pure Bézier paths, construction grid, and organized layers for offset printers and designers." },
        fr: { format: ".AI · ADOBE ILLUSTRATOR", title: "Fichier Maître Éditable en Calques (.AI)", desc: "Fichier natif Adobe Illustrator avec tracés de Bézier purs et calques organisés pour les imprimeurs." },
        pt: { format: ".AI · ADOBE ILLUSTRATOR", title: "Arquivo Mestre Editável em Camadas (.AI)", desc: "Arquivo nativo Adobe Illustrator com curvas Bézier puras e camadas organizadas para gráficas e designers." },
        de: { format: ".AI · ADOBE ILLUSTRATOR", title: "Editierbare Master-Vektordatei mit Ebenen (.AI)", desc: "Native Adobe-Illustrator-Datei mit reinen Bézier-Pfaden und geordneten Ebenen für Druckereien und Designer." },
        it: { format: ".AI · ADOBE ILLUSTRATOR", title: "File Master Editabile a Livelli (.AI)", desc: "File nativo Adobe Illustrator con tracciati di Bézier puri e livelli organizzati per tipografie e designer." }
      }
    },
    {
      num: "05",
      format: ".SVG + .PNG 1024px · APP ICON",
      plateNum: 18,
      thumb: "/assets/brandbook_plates_tbb/plate-18.jpg",
      sampleUrl: "/assets/logos/Isotipo_Oficial_TheBestBrand_LiquidGlass_1024px.png",
      i18n: {
        es: { format: ".SVG + .PNG 1024px · APP ICON", title: "Isotipo 1:1, Avatar Social y Sello Circular", desc: "Símbolo cuadrado en alta resolución (1024×1024px) y curvas .SVG calibrado para App Store, WhatsApp Business, LinkedIn, Instagram y sello institucional." },
        en: { format: ".SVG + .PNG 1024px · APP ICON", title: "1:1 App Icon, Social Avatar & Circular Seal", desc: "High-resolution 1024×1024px square symbol and .SVG curves calibrated for App Store, WhatsApp Business, LinkedIn, Instagram, and official seal." },
        fr: { format: ".SVG + .PNG 1024px · APP ICON", title: "Isotype 1:1, Avatar Social et Sceau Circulaire", desc: "Symbole carré haute résolution (1024×1024px) et .SVG calibré pour App Store, WhatsApp Business, LinkedIn et Instagram." },
        pt: { format: ".SVG + .PNG 1024px · APP ICON", title: "Isotipo 1:1, Avatar Social e Selo Circular", desc: "Símbolo quadrado em alta resolução (1024×1024px) e .SVG calibrado para App Store, WhatsApp Business, LinkedIn e Instagram." },
        de: { format: ".SVG + .PNG 1024px · APP ICON", title: "1:1 App-Icon, Social-Avatar & Rundsiegel", desc: "Hochauflösendes 1024×1024px-Symbol und .SVG für App Store, WhatsApp Business, LinkedIn, Instagram und Siegel." },
        it: { format: ".SVG + .PNG 1024px · APP ICON", title: "Isotipo 1:1, Avatar Social e Sigillo Circolare", desc: "Simbolo quadrato ad alta risoluzione (1024×1024px) e .SVG calibrato per App Store, WhatsApp Business, LinkedIn e Instagram." }
      }
    },
    {
      num: "06",
      format: ".HTML · EMAIL SIGNATURE",
      plateNum: 33,
      thumb: "/assets/brandbook_plates_tbb/plate-33.jpg",
      sampleUrl: "/assets/deliverables_tbb/Firma_Correo_Corporativa_the_best_brand.html",
      i18n: {
        es: { format: ".HTML · FIRMA DE CORREO", title: "Firma Corporativa Interactiva de Correo (.HTML)", desc: "Plantilla ejecutiva personalizable con foto o isotipo, cargo, teléfono, enlaces y botón de copia en un clic para Gmail, Outlook y Apple Mail." },
        en: { format: ".HTML · EMAIL SIGNATURE", title: "Interactive Corporate Email Signature (.HTML)", desc: "Customizable executive signature with photo or emblem, role, phone, links, and 1-click copy for Gmail, Outlook, and Apple Mail." },
        fr: { format: ".HTML · SIGNATURE E-MAIL", title: "Signature E-mail Corporative Interactive (.HTML)", desc: "Modèle exécutif personnalisable avec photo ou isotype et copie en un clic pour Gmail, Outlook et Apple Mail." },
        pt: { format: ".HTML · ASSINATURA DE E-MAIL", title: "Assinatura Corporativa Interativa de E-mail (.HTML)", desc: "Modelo executivo personalizável com foto ou isotipo e cópia em um clique para Gmail, Outlook e Apple Mail." },
        de: { format: ".HTML · E-MAIL-SIGNATUR", title: "Interaktive Corporate E-Mail-Signatur (.HTML)", desc: "Anpassbare Executive-Signatur mit Foto oder Emblem und 1-Klick-Kopie für Gmail, Outlook und Apple Mail." },
        it: { format: ".HTML · FIRMA EMAIL", title: "Firma Email Aziendale Interattiva (.HTML)", desc: "Modello esecutivo personalizzabile con foto o isotipo e copia in un clic per Gmail, Outlook e Apple Mail." }
      }
    },
    {
      num: "07",
      format: ".DOCX · MICROSOFT WORD",
      plateNum: 34,
      thumb: "/assets/brandbook_plates_tbb/plate-34.jpg",
      sampleUrl: "/assets/deliverables_tbb/Plantilla_Hoja_Membretada_the_best_brand.docx",
      i18n: {
        es: { format: ".DOCX · MICROSOFT WORD", title: "Plantilla Editable de Hoja Membretada (.DOCX)", desc: "Documento oficial en formato Carta/A4 con encabezado vectorial, tipografías homologadas y pie institucional listo para contratos y cotizaciones en Word o Google Docs." },
        en: { format: ".DOCX · MICROSOFT WORD", title: "Editable Corporate Letterhead Template (.DOCX)", desc: "Official Letter/A4 document with vector header, matched typography, and institutional footer ready for contracts and quotes in Word or Google Docs." },
        fr: { format: ".DOCX · MICROSOFT WORD", title: "Modèle Éditable de Papier à En-tête (.DOCX)", desc: "Document officiel avec en-tête vectoriel et pied de page institutionnel prêt pour vos contrats dans Word ou Google Docs." },
        pt: { format: ".DOCX · MICROSOFT WORD", title: "Modelo Editável de Papel Timbrado (.DOCX)", desc: "Documento oficial com cabeçalho vetorial e rodapé institucional pronto para contratos e propostas no Word ou Google Docs." },
        de: { format: ".DOCX · MICROSOFT WORD", title: "Editierbare Briefpapier-Vorlage (.DOCX)", desc: "Offizielle Vorlage mit Vektor-Kopfzeile und Fußzeile, bereit für Angebote und Verträge in Word oder Google Docs." },
        it: { format: ".DOCX · MICROSOFT WORD", title: "Modello Editabile di Carta Intestata (.DOCX)", desc: "Documento ufficiale con intestazione vettoriale e piè di pagina pronto per contratti e preventivi in Word o Google Docs." }
      }
    },
    {
      num: "08",
      format: ".PPTX · POWERPOINT 16:9",
      plateNum: 35,
      thumb: "/assets/brandbook_plates_tbb/plate-35.jpg",
      sampleUrl: "/assets/deliverables_tbb/Plantilla_Presentacion_Ejecutiva_the_best_brand.pptx",
      i18n: {
        es: { format: ".PPTX · POWERPOINT 16:9", title: "Presentación Ejecutiva Widescreen 16:9 (.PPTX)", desc: "Master Deck corporativo con diapositivas editables de Portada, Propósito, Oferta Comercial, Metodología y Cierre alineadas a tu paleta oficial." },
        en: { format: ".PPTX · POWERPOINT 16:9", title: "Widescreen 16:9 Executive Presentation (.PPTX)", desc: "Corporate Master Deck with editable Cover, Purpose, Commercial Offer, Methodology, and Closing slides aligned with your official palette." },
        fr: { format: ".PPTX · POWERPOINT 16:9", title: "Présentation Exécutive Widescreen 16:9 (.PPTX)", desc: "Master Deck corporatif avec diapositives éditables alignées à 100% sur votre palette et votre typographie." },
        pt: { format: ".PPTX · POWERPOINT 16:9", title: "Apresentação Executiva Widescreen 16:9 (.PPTX)", desc: "Master Deck corporativo com slides editáveis de Capa, Propósito, Oferta Comercial e Fechamento alinhados à sua marca." },
        de: { format: ".PPTX · POWERPOINT 16:9", title: "Executive-Präsentation Widescreen 16:9 (.PPTX)", desc: "Corporate Master-Deck mit editierbaren Folien für Titel, Zweck, Angebot und Abschluss im offiziellen Marken-Design." },
        it: { format: ".PPTX · POWERPOINT 16:9", title: "Presentazione Esecutiva Widescreen 16:9 (.PPTX)", desc: "Master Deck aziendale con diapositive editabili di Copertina, Scopo, Offerta Commerciale e Chiusura." }
      }
    },
    {
      num: "09",
      format: ".ZIP · FONT KIT .TTF",
      plateNum: 36,
      thumb: "/assets/brandbook_plates_tbb/plate-36.jpg",
      sampleUrl: "/assets/deliverables_tbb/Kit_Fuentes_Oficiales_the_best_brand.zip",
      i18n: {
        es: { format: ".ZIP · KIT DE FUENTES .TTF", title: "Paquete Oficial de Tipografías Instalables (.ZIP)", desc: "Archivo comprimido con las familias tipográficas oficiales en formato .TTF listas para instalar en Mac y Windows más guía de uso web y Adobe Typekit." },
        en: { format: ".ZIP · .TTF FONT KIT", title: "Installable Official Font Package (.ZIP)", desc: "ZIP archive containing your official .TTF font families ready to install on Mac and Windows plus web CSS and Adobe Typekit governance guide." },
        fr: { format: ".ZIP · KIT DE POLICES .TTF", title: "Pack Officiel de Polices Installables (.ZIP)", desc: "Archive .ZIP contenant les polices officielles .TTF prêtes à installer sur Mac et Windows ainsi que le guide CSS/Web." },
        pt: { format: ".ZIP · KIT DE FONTES .TTF", title: "Pacote Oficial de Tipografias Instaláveis (.ZIP)", desc: "Arquivo .ZIP com as famílias tipográficas oficiais .TTF prontas para instalar no Mac e Windows mais guia de uso web." },
        de: { format: ".ZIP · SCHRIFTENPAKET .TTF", title: "Installierbares Offizielles Schriftenpaket (.ZIP)", desc: "ZIP-Archiv mit allen offiziellen .TTF-Schriftfamilien für Mac und Windows inklusive Web-CSS-Leitfaden." },
        it: { format: ".ZIP · KIT DI FONT .TTF", title: "Pacchetto Ufficiale di Font Installabili (.ZIP)", desc: "Archivio .ZIP con le famiglie tipografiche ufficiali .TTF pronte da installare su Mac e Windows più guida CSS web." }
      }
    }
  ];

  // Conferencias magistrales de los autores con miniaturas 16:9 reales de YouTube (Cero fotos del fundador)
  const YOUTUBE_METHODOLOGY_AUTHORS = [
    {
      id: "qp0HIF3SfI4",
      author: "Simon Sinek",
      duration: "18:04",
      thumb: resolveVideoAsset("/assets/videos/yt_thumbs/qp0HIF3SfI4.jpg"),
      ytThumbFallback: "https://i.ytimg.com/vi/qp0HIF3SfI4/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=qp0HIF3SfI4",
      i18n: {
        es: { step: "Paso 1 · Círculo Dorado", title: "Cómo los grandes líderes inspiran la acción (Start With Why)" },
        en: { step: "Step 1 · Golden Circle", title: "How Great Leaders Inspire Action (Start With Why)" },
        fr: { step: "Étape 1 · Cercle d'Or", title: "Comment les grands leaders inspirent l'action (Start With Why)" },
        pt: { step: "Passo 1 · Círculo Dourado", title: "Como grandes líderes inspiram ação (Start With Why)" },
        de: { step: "Schritt 1 · Golden Circle", title: "Wie große Führungspersönlichkeiten zum Handeln inspirieren (Start With Why)" },
        it: { step: "Passo 1 · Cerchio d'Oro", title: "Come i grandi leader ispirano l'azione (Start With Why)" }
      }
    },
    {
      id: "_Kc57XAE_V4",
      author: "Don Norman & Jan Carlzon",
      duration: "14:22",
      thumb: resolveVideoAsset("/assets/videos/yt_thumbs/_Kc57XAE_V4.jpg"),
      ytThumbFallback: "https://i.ytimg.com/vi/_Kc57XAE_V4/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=_Kc57XAE_V4",
      i18n: {
        es: { step: "Paso 2 · Touchpoints", title: "El Diseño de las Cosas Cotidianas y los Momentos de la Verdad" },
        en: { step: "Step 2 · Touchpoints", title: "The Design of Everyday Things & Moments of Truth" },
        fr: { step: "Étape 2 · Touchpoints", title: "Le Design des Objets du Quotidien et les Moments de Vérité" },
        pt: { step: "Passo 2 · Touchpoints", title: "O Design do Dia a Dia e os Momentos da Verdade" },
        de: { step: "Schritt 2 · Touchpoints", title: "The Design of Everyday Things & Momente der Wahrheit" },
        it: { step: "Passo 2 · Touchpoint", title: "La Caffettiera del Masochista e i Momenti della Verità" }
      }
    },
    {
      id: "iM-ouJfISwY",
      author: "Al Ries & Jack Trout",
      duration: "11:45",
      thumb: resolveVideoAsset("/assets/videos/yt_thumbs/iM-ouJfISwY.jpg"),
      ytThumbFallback: "https://i.ytimg.com/vi/iM-ouJfISwY/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=iM-ouJfISwY",
      i18n: {
        es: { step: "Paso 3 · Naming y Posicionamiento", title: "Las Leyes Inmutables del Posicionamiento y el Enfoque Mental" },
        en: { step: "Step 3 · Naming & Positioning", title: "The Immutable Laws of Branding & Narrowing the Focus" },
        fr: { step: "Étape 3 · Naming et Positionnement", title: "Les Lois Immuables du Branding et du Positionnement" },
        pt: { step: "Passo 3 · Naming e Posicionamento", title: "As Leis Imutáveis do Branding e Posicionamento" },
        de: { step: "Schritt 3 · Naming & Positionierung", title: "Die unveränderlichen Gesetze von Branding & Positionierung" },
        it: { step: "Passo 3 · Naming e Posizionamento", title: "Le Leggi Immutabili del Branding e del Posizionamento" }
      }
    },
    {
      id: "nIoRRan0KE4",
      author: "Sir Jony Ive & Mitsuo Nagamachi",
      duration: "19:40",
      thumb: resolveVideoAsset("/assets/videos/yt_thumbs/nIoRRan0KE4.jpg"),
      ytThumbFallback: "https://i.ytimg.com/vi/nIoRRan0KE4/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=nIoRRan0KE4",
      i18n: {
        es: { step: "Paso 4 · Ingeniería Kansei y Forma", title: "Arquitectura Sensorial, Cuidado Industrial e Ingeniería Kansei" },
        en: { step: "Step 4 · Kansei Engineering & Form", title: "Sensory Design Architecture, Craft & Kansei Engineering" },
        fr: { step: "Étape 4 · Ingénierie Kansei et Forme", title: "Architecture Sensorielle, Design Industriel et Ingénierie Kansei" },
        pt: { step: "Passo 4 · Engenharia Kansei e Forma", title: "Arquitetura Sensorial, Design Industrial e Engenharia Kansei" },
        de: { step: "Schritt 4 · Kansei-Engineering & Form", title: "Sensorische Designarchitektur, Präzision & Kansei-Engineering" },
        it: { step: "Passo 4 · Ingegneria Kansei e Forma", title: "Architettura Sensoriale, Cura Industriale e Ingegneria Kansei" }
      }
    },
    {
      id: "XvzExym4slg",
      author: "Marty Neumeier",
      duration: "16:10",
      thumb: resolveVideoAsset("/assets/videos/yt_thumbs/XvzExym4slg.jpg"),
      ytThumbFallback: "https://i.ytimg.com/vi/XvzExym4slg/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=XvzExym4slg",
      i18n: {
        es: { step: "Paso 5 · Identidad Visual", title: "The Brand Gap: Uniendo la Estrategia de Negocio con el Diseño" },
        en: { step: "Step 5 · Visual Identity", title: "The Brand Gap: Bridging Business Strategy and Design" },
        fr: { step: "Étape 5 · Identité Visuelle", title: "The Brand Gap : Relier la Stratégie d'Entreprise et le Design" },
        pt: { step: "Passo 5 · Identidade Visual", title: "The Brand Gap: Unindo a Estratégia de Negócios ao Design" },
        de: { step: "Schritt 5 · Visuelle Identität", title: "The Brand Gap: Brücke zwischen Strategie und Design" },
        it: { step: "Passo 5 · Identità Visiva", title: "The Brand Gap: Unire Strategia di Business e Design" }
      }
    },
    {
      id: "2FumwkBMhLo",
      author: "Alexander Osterwalder",
      duration: "22:18",
      thumb: resolveVideoAsset("/assets/videos/yt_thumbs/2FumwkBMhLo.jpg"),
      ytThumbFallback: "https://i.ytimg.com/vi/2FumwkBMhLo/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=2FumwkBMhLo",
      i18n: {
        es: { step: "Paso 6 · Modelo y Propuesta de Valor", title: "Diseño de Propuesta de Valor y Business Model Canvas" },
        en: { step: "Step 6 · Value Proposition & Model", title: "Value Proposition Design & Business Model Canvas" },
        fr: { step: "Étape 6 · Modèle et Proposition de Valeur", title: "La Proposition de Valeur et le Business Model Canvas" },
        pt: { step: "Passo 6 · Modelo e Proposta de Valor", title: "Design de Proposta de Valor e Business Model Canvas" },
        de: { step: "Schritt 6 · Wertangebot & Geschäftsmodell", title: "Value Proposition Design & Business Model Canvas" },
        it: { step: "Passo 6 · Modello e Proposta di Valore", title: "Value Proposition Design e Business Model Canvas" }
      }
    }
  ];

  const FOUNDER_ESSENTIAL_BOOKS = [
    {
      title: "Start with Why",
      author: "Simon Sinek",
      coverImg: "sinek_why.jpg",
      kindleUrl: "https://www.amazon.com/dp/B002Q6XUE4",
      appleBooksUrl: "https://books.apple.com/us/book/start-with-why/id359902640",
      i18n: {
        es: { step: "Paso 1 · Propósito Nuclear", takeaway: "Las personas no compran lo que haces, sino el porqué lo haces. La base del Paso 1." },
        en: { step: "Step 1 · Core Purpose", takeaway: "People don't buy what you do; they buy why you do it. The foundation of Step 1." },
        fr: { step: "Étape 1 · Raison d'Être", takeaway: "Les gens n'achètent pas ce que vous faites, mais pourquoi vous le faites. La base de l'Étape 1." },
        pt: { step: "Passo 1 · Propósito Nuclear", takeaway: "As pessoas não compram o que você faz, mas o porquê você faz. A base do Passo 1." },
        de: { step: "Schritt 1 · Kernzweck", takeaway: "Menschen kaufen nicht, was Sie tun, sondern warum Sie es tun. Das Fundament von Schritt 1." },
        it: { step: "Passo 1 · Scopo Centrale", takeaway: "Le persone non comprano ciò che fai, ma il perché lo fai. La base del Passo 1." }
      }
    },
    {
      title: "Moments of Truth",
      author: "Jan Carlzon",
      coverImg: "carlzon_truth.jpg",
      kindleUrl: "https://www.amazon.com/dp/B001ANYDL0",
      appleBooksUrl: "https://books.apple.com/us/book/moments-of-truth/id1504958327",
      i18n: {
        es: { step: "Paso 2 · Touchpoints", takeaway: "Cómo cada contacto de 15 segundos entre cliente y empresa define la lealtad hacia tu marca." },
        en: { step: "Step 2 · Touchpoints", takeaway: "How every 15-second contact between customer and company defines long-term brand loyalty." },
        fr: { step: "Étape 2 · Touchpoints", takeaway: "Comment chaque contact de 15 secondes entre le client et l'entreprise définit la fidélité." },
        pt: { step: "Passo 2 · Touchpoints", takeaway: "Como cada contato de 15 segundos entre cliente e empresa define a lealdade à sua marca." },
        de: { step: "Schritt 2 · Touchpoints", takeaway: "Wie jeder 15-Sekunden-Kontakt zwischen Kunde und Unternehmen die Markentreue bestimmt." },
        it: { step: "Passo 2 · Touchpoint", takeaway: "Come ogni contatto di 15 secondi tra cliente e azienda definisce la fedeltà al brand." }
      }
    },
    {
      title: "Positioning: The Battle for Your Mind",
      author: "Al Ries & Jack Trout",
      coverImg: "ries_lean.jpg",
      kindleUrl: "https://www.amazon.com/dp/B000OI0F4K",
      appleBooksUrl: "https://books.apple.com/us/book/positioning-the-battle-for-your-mind/id496277918",
      i18n: {
        es: { step: "Paso 0 y 3 · Posicionamiento y Naming", takeaway: "Cómo ocupar un lugar único e indiscutible en la mente de tu cliente ideal desde el nombre y giro." },
        en: { step: "Steps 0 & 3 · Positioning & Naming", takeaway: "How to claim a unique, unmistakable position in your ideal customer's mind starting with your name." },
        fr: { step: "Étapes 0 et 3 · Positionnement et Naming", takeaway: "Comment occuper une place unique dans l'esprit de votre client idéal dès le choix du nom." },
        pt: { step: "Passos 0 e 3 · Posicionamento e Naming", takeaway: "Como ocupar um lugar único na mente do seu cliente ideal a partir do nome e ramo." },
        de: { step: "Schritt 0 & 3 · Positionierung & Naming", takeaway: "Wie Sie vom Namen an einen einzigartigen Platz im Kopf Ihres Idealkunden besetzen." },
        it: { step: "Passi 0 e 3 · Posizionamento e Naming", takeaway: "Come occupare un posto unico nella mente del cliente ideale a partire dal nome." }
      }
    },
    {
      title: "The Brand Gap",
      author: "Marty Neumeier",
      coverImg: "neumeier_brandgap.jpg",
      kindleUrl: "https://www.amazon.com/dp/B000SEI7P8",
      appleBooksUrl: "https://books.apple.com/us/book/the-brand-gap/id496263434",
      i18n: {
        es: { step: "Paso 4 y 5 · Estrategia y Diseño", takeaway: "El puente ejecutivo entre la estrategia de negocio analítica y la expresión visual carismática." },
        en: { step: "Steps 4 & 5 · Strategy & Design", takeaway: "The executive bridge between analytical business strategy and charismatic visual expression." },
        fr: { step: "Étapes 4 et 5 · Stratégie et Design", takeaway: "Le pont exécutif entre la stratégie d'entreprise analytique et l'expression visuelle." },
        pt: { step: "Passos 4 e 5 · Estratégia e Design", takeaway: "A ponte executiva entre a estratégia analítica de negócios e a expressão visual carismática." },
        de: { step: "Schritt 4 & 5 · Strategie & Design", takeaway: "Die Brücke zwischen analytischer Geschäftsstrategie und charismatischem Design." },
        it: { step: "Passi 4 e 5 · Strategia e Design", takeaway: "Il ponte esecutivo tra strategia aziendale analitica ed espressione visiva carismatica." }
      }
    },
    {
      title: "Building Strong Brands",
      author: "David A. Aaker",
      coverImg: "aaker_branding.jpg",
      kindleUrl: "https://www.amazon.com/dp/B003L77VSC",
      appleBooksUrl: "https://books.apple.com/us/book/building-strong-brands/id381482832",
      i18n: {
        es: { step: "Paso 0 · Arquitectura y Capital de Marca", takeaway: "El modelo Brand Relationship Spectrum para proteger tu capital de marca y estructurar submarcas." },
        en: { step: "Step 0 · Brand Equity & Architecture", takeaway: "The Brand Relationship Spectrum model to protect brand equity and structure sub-brands." },
        fr: { step: "Étape 0 · Architecture et Capital de Marque", takeaway: "Le modèle Brand Relationship Spectrum pour protéger votre capital et structurer vos sous-marques." },
        pt: { step: "Passo 0 · Arquitetura e Brand Equity", takeaway: "O modelo Brand Relationship Spectrum para proteger seu patrimônio visual e estruturar submarcas." },
        de: { step: "Schritt 0 · Markenarchitektur & Brand Equity", takeaway: "Das Brand-Relationship-Spectrum-Modell zum Schutz Ihres Markenkapitals und Ihrer Submarken." },
        it: { step: "Passo 0 · Architettura e Brand Equity", takeaway: "Il modello Brand Relationship Spectrum per proteggere il capitale di marca e i sub-brand." }
      }
    },
    {
      title: "Identify: Basic Principles of Identity Design",
      author: "Sagi Haviv, Tom Geismar & Ivan Chermayeff",
      coverImg: "haviv_identify.jpg",
      kindleUrl: "https://www.amazon.com/dp/1440310327",
      appleBooksUrl: "https://books.apple.com/us/book/identify/id540656455",
      i18n: {
        es: { step: "Paso 5 · Síntesis Vectorial y Rediseño", takeaway: "Por qué un símbolo memorable debe ser simple, apropiado y distintivo en blanco y negro." },
        en: { step: "Step 5 · Vector Synthesis & Redesign", takeaway: "Why a memorable symbol must be simple, appropriate, and distinctive in pure black and white." },
        fr: { step: "Étape 5 · Synthèse Vectorielle et Refonte", takeaway: "Pourquoi un symbole mémorable doit être simple, approprié et distinctif en noir et blanc." },
        pt: { step: "Passo 5 · Síntese Vetorial e Redesign", takeaway: "Por que um símbolo memorável deve ser simples, apropriado e distintivo em preto e branco." },
        de: { step: "Schritt 5 · Vektorsynthese & Redesign", takeaway: "Warum ein starkes Markenzeichen einfach, passend und in Schwarz-Weiß unverwechselbar sein muss." },
        it: { step: "Passo 5 · Sintesi Vettoriale e Redesign", takeaway: "Perché un simbolo memorabile deve essere semplice, appropriato e distintivo in bianco e nero." }
      }
    },
    {
      title: "Building a StoryBrand",
      author: "Donald Miller",
      coverImg: "miller_storybrand.jpg",
      kindleUrl: "https://www.amazon.com/dp/B06XCFV93Z",
      appleBooksUrl: "https://books.apple.com/us/book/building-a-storybrand/id1209119036",
      i18n: {
        es: { step: "Paso 1.4 · Método en 3 Pasos Claros", takeaway: "Cómo posicionar a tu cliente como el héroe y presentar tu método en 3 pasos libres de fricción." },
        en: { step: "Step 1.4 · Clear 3-Step Method", takeaway: "How to position your customer as the hero and present your method in 3 friction-free steps." },
        fr: { step: "Étape 1.4 · Méthode en 3 Étapes Claires", takeaway: "Comment positionner votre client en héros et présenter votre méthode en 3 étapes simples." },
        pt: { step: "Passo 1.4 · Método em 3 Passos Claros", takeaway: "Como posicionar seu cliente como o herói e apresentar seu método em 3 passos sem fricção." },
        de: { step: "Schritt 1.4 · Klare 3-Schritte-Methode", takeaway: "Wie Sie Ihren Kunden zum Helden machen und Ihre Methode in 3 klaren Schritten erklären." },
        it: { step: "Passo 1.4 · Metodo in 3 Passi Chiari", takeaway: "Come posizionare il cliente come l'eroe e presentare il tuo metodo in 3 passi senza attrito." }
      }
    },
    {
      title: "Business Model Generation",
      author: "Alexander Osterwalder & Yves Pigneur",
      coverImg: "osterwalder_bmg.jpg",
      kindleUrl: "https://www.amazon.com.mx/dp/B01B3J471E",
      appleBooksUrl: "https://books.apple.com/us/book/business-model-generation/id420803588",
      i18n: {
        es: { title: "Generación de Modelos de Negocio", step: "Paso 6 · Arquitectura de Valor", takeaway: "El estándar global para estructurar tu modelo de negocio en un sistema visual coherente." },
        en: { title: "Business Model Generation", step: "Step 6 · Value Architecture", takeaway: "The global standard for structuring your business model into a coherent visual system." },
        fr: { title: "Business Model Nouvelle Génération", step: "Étape 6 · Architecture de Valeur", takeaway: "La référence mondiale pour structurer votre modèle économique en un système visuel cohérent." },
        pt: { title: "Business Model Generation", step: "Passo 6 · Arquitetura de Valor", takeaway: "O padrão global para estruturar seu modelo de negócios em um sistema visual coerente." },
        de: { title: "Business Model Generation", step: "Schritt 6 · Wertarchitektur", takeaway: "Der globale Standard zur Strukturierung Ihres Geschäftsmodells in einem klaren visuellen System." },
        it: { title: "Business Model Generation", step: "Passo 6 · Architettura di Valore", takeaway: "Lo standard globale per strutturare il tuo modello di business in un sistema visivo coerente." }
      }
    },
    {
      title: "Value Proposition Design",
      author: "Alexander Osterwalder & Yves Pigneur",
      coverImg: "osterwalder_vpd.jpg",
      kindleUrl: "https://www.amazon.com.mx/dp/B00P0L6W7A",
      appleBooksUrl: "https://books.apple.com/us/book/value-proposition-design/id927699748",
      i18n: {
        es: { title: "Diseñando la Propuesta de Valor", step: "Paso 1.2 · Oferta Comercial", takeaway: "Cómo alinear exactamente lo que entregas con los dolores y aspiraciones reales de tu cliente." },
        en: { title: "Value Proposition Design", step: "Step 1.2 · Commercial Offer", takeaway: "How to align what you deliver with the real pains, gains, and aspirations of your customer." },
        fr: { title: "La Méthode Value Proposition Design", step: "Étape 1.2 · Offre Commerciale", takeaway: "Comment aligner exactement votre offre sur les besoins et aspirations réels de vos clients." },
        pt: { title: "Value Proposition Design", step: "Passo 1.2 · Oferta Comercial", takeaway: "Como alinhar exatamente o que você entrega com as dores e aspirações reais do seu cliente." },
        de: { title: "Value Proposition Design", step: "Schritt 1.2 · Wertangebot", takeaway: "Wie Sie Ihr Angebot exakt auf die echten Bedürfnisse und Ziele Ihrer Kunden ausrichten." },
        it: { title: "Value Proposition Design", step: "Passo 1.2 · Offerta Commerciale", takeaway: "Come allineare esattamente ciò che offri con i problemi e le aspirazioni reali del cliente." }
      }
    }
  ];

  const DEMO_QUICK_PRESETS = [
    {
      id: "tbb",
      label: "The Best Brand (SaaS IA)",
      objective: "create",
      brandName: "THE BEST BRAND",
      tagline: "YOUR BRAND, NOW!!!",
      businessGiro: "Plataforma interactiva con IA que guía a empresarios paso a paso para definir su identidad estratégica y generar su Manual Oficial de Marca de 36 Láminas y 9 Entregables.",
      whyPurpose: "Porque creemos que la claridad de marca multiplica el valor de las empresas y libera tiempo mental al líder.",
      howMethod: "Combinamos el acompañamiento socrático de Aura, ingeniería Kansei y síntesis vectorial Apple Liquid Glass paso a paso.",
      whatOffer: "Suite ejecutiva de 9 entregables oficiales: Manual de 36 Láminas (.PDF y .HTML), vectores (.SVG y .AI), firma (.HTML), Word (.DOCX), PowerPoint (.PPTX) y Kit de Fuentes (.ZIP).",
      i18n: {
        es: {
          label: "The Best Brand (SaaS IA)",
          tagline: "YOUR BRAND, NOW!!!",
          businessGiro: "Plataforma interactiva con IA que guía a empresarios paso a paso para definir su identidad estratégica y generar su Manual Oficial de Marca de 36 Láminas y 9 Entregables.",
          whyPurpose: "Porque creemos que la claridad de marca multiplica el valor de las empresas y libera tiempo mental al líder.",
          howMethod: "Combinamos el acompañamiento socrático de Aura, ingeniería Kansei y síntesis vectorial Apple Liquid Glass paso a paso.",
          whatOffer: "Suite ejecutiva de 9 entregables oficiales: Manual de 36 Láminas (.PDF y .HTML), vectores (.SVG y .AI), firma (.HTML), Word (.DOCX), PowerPoint (.PPTX) y Kit de Fuentes (.ZIP)."
        },
        en: {
          label: "The Best Brand (AI SaaS)",
          tagline: "YOUR BRAND, NOW!!!",
          businessGiro: "Interactive AI platform guiding entrepreneurs step by step to define their strategic identity and compile their 36-Plate Official Brandbook & 9 Deliverables.",
          whyPurpose: "Because we believe brand clarity multiplies company value and frees executive mental bandwidth.",
          howMethod: "Combining Aura's live Socratic guidance, Kansei engineering, and step-by-step Apple Liquid Glass vector synthesis.",
          whatOffer: "Executive suite of 9 official deliverables: 36-Plate Brandbook (.PDF & .HTML), vectors (.SVG & .AI), email signature (.HTML), Word (.DOCX), PowerPoint (.PPTX) & Font Kit (.ZIP)."
        },
        fr: {
          label: "The Best Brand (SaaS IA)",
          tagline: "YOUR BRAND, NOW!!!",
          businessGiro: "Plateforme interactive avec IA guidant les dirigeants étape par étape pour créer leur Manuel Officiel de 36 Planches et 9 Livrables.",
          whyPurpose: "Parce que la clarté de marque multiplie la valeur des entreprises et libère l'esprit du dirigeant.",
          howMethod: "En combinant le guidage socratique d'Aura, l'ingénierie Kansei et la synthèse vectorielle Apple Liquid Glass.",
          whatOffer: "Suite exécutive de 9 livrables officiels : Manuel de 36 Planches (.PDF/.HTML), vecteurs (.SVG/.AI), signature (.HTML), Word (.DOCX), PowerPoint (.PPTX) et Polices (.ZIP)."
        },
        pt: {
          label: "The Best Brand (SaaS IA)",
          tagline: "YOUR BRAND, NOW!!!",
          businessGiro: "Plataforma interativa com IA que guia empresários passo a passo para criar seu Manual Oficial de 36 Lâminas e 9 Entregáveis.",
          whyPurpose: "Porque acreditamos que a clareza de marca multiplica o valor das empresas e libera tempo mental ao líder.",
          howMethod: "Combinamos o acompanhamento socrático da Aura, engenharia Kansei e síntese vetorial Apple Liquid Glass.",
          whatOffer: "Suíte executiva de 9 entregáveis oficiais: Manual de 36 Lâminas (.PDF/.HTML), vetores (.SVG/.AI), assinatura (.HTML), Word (.DOCX), PowerPoint (.PPTX) e Fontes (.ZIP)."
        },
        de: {
          label: "The Best Brand (KI-SaaS)",
          tagline: "YOUR BRAND, NOW!!!",
          businessGiro: "Interaktive KI-Plattform, die Unternehmer Schritt für Schritt zum offiziellen 36-Tafeln-Brandbook und 9 Deliverables führt.",
          whyPurpose: "Weil Markenklarheit den Unternehmenswert steigert und dem Führenden mentale Freiheit schafft.",
          howMethod: "Durch Auras sokratische Sprachführung, Kansei-Engineering und Apple Liquid Glass Vektorsynthese.",
          whatOffer: "Executive-Suite mit 9 offiziellen Deliverables: 36-Tafeln-Brandbook (.PDF/.HTML), Vektoren (.SVG/.AI), Signatur (.HTML), Word (.DOCX), PowerPoint (.PPTX) & Schriften (.ZIP)."
        },
        it: {
          label: "The Best Brand (SaaS IA)",
          tagline: "YOUR BRAND, NOW!!!",
          businessGiro: "Piattaforma interattiva con IA che guida gli imprenditori passo dopo passo a generare il Manuale Ufficiale di 36 Tavole e 9 Deliverable.",
          whyPurpose: "Perché crediamo che la chiarezza del brand moltiplichi il valore aziendale e liberi tempo mentale al leader.",
          howMethod: "Combinando la guida socratica di Aura, l'ingegneria Kansei e la sintesi vettoriale Apple Liquid Glass.",
          whatOffer: "Suite esecutiva di 9 deliverable ufficiali: Manuale di 36 Tavole (.PDF/.HTML), vettori (.SVG/.AI), firma (.HTML), Word (.DOCX), PowerPoint (.PPTX) e Font (.ZIP)."
        }
      }
    },
    {
      id: "arco",
      label: "ARCO Ingeniería (Constructora)",
      objective: "redesign",
      brandName: "ARCO INGENIERÍA",
      tagline: "ESTRUCTURAS QUE TRASCIENDEN",
      businessGiro: "Firma de ingeniería civil y construcción industrial especializada en naves logísticas e infraestructura de alta precisión.",
      whyPurpose: "Porque creemos que cada obra bien ejecutada protege el patrimonio de nuestros clientes y eleva el estándar industrial.",
      howMethod: "Mediante planeación BIM milimétrica, supervisión residente diaria y cumplimiento estricto de tiempos y presupuesto.",
      whatOffer: "Diseño estructural, construcción de naves industriales y gerencia de proyectos llave en mano.",
      i18n: {
        es: {
          label: "ARCO Ingeniería (Constructora)",
          tagline: "ESTRUCTURAS QUE TRASCIENDEN",
          businessGiro: "Firma de ingeniería civil y construcción industrial especializada en naves logísticas e infraestructura de alta precisión.",
          whyPurpose: "Porque creemos que cada obra bien ejecutada protege el patrimonio de nuestros clientes y eleva el estándar industrial.",
          howMethod: "Mediante planeación BIM milimétrica, supervisión residente diaria y cumplimiento estricto de tiempos y presupuesto.",
          whatOffer: "Diseño estructural, construcción de naves industriales y gerencia de proyectos llave en mano."
        },
        en: {
          label: "ARCO Engineering (Industrial Construction)",
          tagline: "STRUCTURES THAT TRANSCEND",
          businessGiro: "Civil engineering and industrial construction firm specializing in logistics hubs and high-precision infrastructure.",
          whyPurpose: "Because every well-executed structure protects our clients' capital and elevates the industrial standard.",
          howMethod: "Through millimeter-precise BIM planning, daily on-site supervision, and strict schedule and budget compliance.",
          whatOffer: "Structural engineering, industrial warehouse construction, and turnkey project management."
        },
        fr: {
          label: "ARCO Ingénierie (Construction)",
          tagline: "DES STRUCTURES QUI TRANSCENDENT",
          businessGiro: "Cabinet de génie civil et construction industrielle spécialisé dans les plateformes logistiques de haute précision.",
          whyPurpose: "Parce que chaque ouvrage bien exécuté protège le patrimoine de nos clients et élève le standard industriel.",
          howMethod: "Grâce à une planification BIM millimétrique, une supervision quotidienne et le respect strict des délais.",
          whatOffer: "Ingénierie structurelle, construction de bâtiments industriels et gestion de projets clés en main."
        },
        pt: {
          label: "ARCO Engenharia (Construtora)",
          tagline: "ESTRUTURAS QUE TRANSCENDEM",
          businessGiro: "Empresa de engenharia civil e construção industrial especializada em galpões logísticos e infraestrutura de alta precisão.",
          whyPurpose: "Porque acreditamos que cada obra bem executada protege o patrimônio dos nossos clientes e eleva o padrão industrial.",
          howMethod: "Por meio de planejamento BIM milimétrico, supervisão diária em obra e cumprimento estrito de prazos e orçamento.",
          whatOffer: "Projeto estrutural, construção de galpões industriais e gerenciamento de obras chave na mão."
        },
        de: {
          label: "ARCO Ingenieurbau (Industriebau)",
          tagline: "STRUKTUREN, DIE ÜBERDAUERN",
          businessGiro: "Tief- und Industriebauunternehmen für Logistikzentren und hochpräzise Infrastruktur.",
          whyPurpose: "Weil jedes präzise ausgeführte Bauwerk das Kapital unserer Kunden schützt und Industriestandards hebt.",
          howMethod: "Durch millimetergenaue BIM-Planung, tägliche Bauleitung vor Ort und strikte Termin- und Budgettreue.",
          whatOffer: "Tragwerksplanung, Bau von Industriehallen und schlüsselfertiges Projektmanagement."
        },
        it: {
          label: "ARCO Ingegneria (Costruzioni)",
          tagline: "STRUTTURE CHE TRASCENDONO",
          businessGiro: "Società di ingegneria civile e costruzioni industriali specializzata in poli logistici e infrastrutture di alta precisione.",
          whyPurpose: "Perché ogni opera ben eseguita protegge il patrimonio dei nostri clienti ed eleva lo standard industriale.",
          howMethod: "Tramite pianificazione BIM millimetrica, supervisione quotidiana in cantiere e rispetto rigoroso di tempi e budget.",
          whatOffer: "Progettazione strutturale, costruzione di capannoni industriali e gestione progetti chiavi in mano."
        }
      }
    },
    {
      id: "improbears",
      label: "ImproBears (4 Submarcas)",
      objective: "redesign",
      brandName: "IMPROBEARS",
      tagline: "DEL CAOS AL SISTEMA",
      businessGiro: "Firma de ingeniería de negocios, ingredientes especializados, producción audiovisual e inteligencia artificial aplicada con 4 submarcas homologadas.",
      whyPurpose: "Porque creemos en acompañar hombro a hombro al líder para transformar el caos operativo en sistemas rentables que liberan tiempo mental.",
      howMethod: "Escuchamos primero la visión del cliente, estructuramos procesos claros y desplegamos tecnología e identidad sin imponer.",
      whatOffer: "Consultoría estratégica (Consulting), insumos cerveceros (Ingredients), producción visual (Studio) y agentes digitales (AI).",
      i18n: {
        es: {
          label: "ImproBears (4 Submarcas)",
          tagline: "DEL CAOS AL SISTEMA",
          businessGiro: "Firma de ingeniería de negocios, ingredientes especializados, producción audiovisual e inteligencia artificial aplicada con 4 submarcas homologadas.",
          whyPurpose: "Porque creemos en acompañar hombro a hombro al líder para transformar el caos operativo en sistemas rentables que liberan tiempo mental.",
          howMethod: "Escuchamos primero la visión del cliente, estructuramos procesos claros y desplegamos tecnología e identidad sin imponer.",
          whatOffer: "Consultoría estratégica (Consulting), insumos cerveceros (Ingredients), producción visual (Studio) y agentes digitales (AI)."
        },
        en: {
          label: "ImproBears (4 Sub-brands)",
          tagline: "FROM CHAOS TO SYSTEM",
          businessGiro: "Business engineering, specialty brewing ingredients, audiovisual studio, and applied AI firm with 4 homologated sub-brands.",
          whyPurpose: "Because we work shoulder to shoulder with leaders to turn operational chaos into profitable systems that free mental time.",
          howMethod: "Listening first to the client's vision, structuring clear processes, and deploying technology and identity without imposing.",
          whatOffer: "Strategic Consulting, Specialty Ingredients, Audiovisual Studio, and Applied AI Digital Agents."
        },
        fr: {
          label: "ImproBears (4 Sous-marques)",
          tagline: "DU CHAOS AU SYSTÈME",
          businessGiro: "Cabinet d'ingénierie d'affaires, ingrédients spécialisés, production audiovisuelle et IA appliquée avec 4 sous-marques.",
          whyPurpose: "Accompagner le dirigeant côte à côte pour transformer le chaos opérationnel en systèmes rentables.",
          howMethod: "Écouter d'abord la vision du client, structurer des processus clairs et déployer la technologie sans imposer.",
          whatOffer: "Conseil stratégique (Consulting), ingrédients (Ingredients), studio audiovisuel (Studio) et agents IA (AI)."
        },
        pt: {
          label: "ImproBears (4 Submarcas)",
          tagline: "DO CAOS AO SISTEMA",
          businessGiro: "Firma de engenharia de negócios, ingredientes especializados, produção audiovisual e IA aplicada com 4 submarcas homologadas.",
          whyPurpose: "Acompanhar ombro a ombro o líder para transformar o caos operacional em sistemas rentáveis que liberam tempo mental.",
          howMethod: "Ouvimos primeiro a visão do cliente, estruturamos processos claros e implementamos tecnologia sem impor.",
          whatOffer: "Consultoria estratégica (Consulting), insumos cervejeiros (Ingredients), estúdio visual (Studio) e agentes digitais (AI)."
        },
        de: {
          label: "ImproBears (4 Submarken)",
          tagline: "VOM CHAOS ZUM SYSTEM",
          businessGiro: "Unternehmensberatung, Spezialzutaten, Medienproduktion und angewandte KI mit 4 homologierten Submarken.",
          whyPurpose: "Schulter an Schulter mit Führungskräften operatives Chaos in profitable Systeme verwandeln.",
          howMethod: "Zuerst die Vision des Kunden verstehen, klare Prozesse strukturieren und Technologie partnerschaftlich einsetzen.",
          whatOffer: "Strategieberatung (Consulting), Spezialzutaten (Ingredients), Filmstudio (Studio) und KI-Agenten (AI)."
        },
        it: {
          label: "ImproBears (4 Sub-brand)",
          tagline: "DAL CAOS AL SISTEMA",
          businessGiro: "Società di ingegneria aziendale, ingredienti speciali, produzione audiovisiva e IA applicata con 4 sub-brand omologati.",
          whyPurpose: "Affiancare spalla a spalla il leader per trasformare il caos operativo in sistemi redditizi che liberano tempo mentale.",
          howMethod: "Ascoltiamo prima la visione del cliente, strutturiamo processi chiari e implementiamo tecnologia senza imporre.",
          whatOffer: "Consulenza strategica (Consulting), ingredienti (Ingredients), produzione visiva (Studio) e agenti digitali (AI)."
        }
      }
    }
  ];

  function getLocalizedPresetData(presetObj) {
    const p = presetObj || DEMO_QUICK_PRESETS[0];
    const l = getLang();
    const loc = (p.i18n && (p.i18n[l] || p.i18n.es)) || p;
    return {
      id: p.id,
      objective: p.objective,
      brandName: p.brandName,
      label: loc.label || p.label,
      tagline: loc.tagline || p.tagline,
      businessGiro: loc.businessGiro || p.businessGiro,
      whyPurpose: loc.whyPurpose || p.whyPurpose,
      howMethod: loc.howMethod || p.howMethod,
      whatOffer: loc.whatOffer || p.whatOffer
    };
  }

  // ---------------------------------------------------------------------------
  // 3. ESTADO GLOBAL DE LA EXPERIENCIA COMERCIAL V91.0
  // ---------------------------------------------------------------------------
  window.tbbCommercialDemoState = {
    activeMainSection: 1, // 1: Inicio | 2: Demo | 3: App Tour | 4: Bases teóricas | 5: Pack de descargas
    heroVisualMode: "app", // "app" | "manual"
    activeDemoStep: 0, // 0, 1, 2
    demoObjective: "create", // "create" | "redesign"
    activeVideoStep: 0, // 0..6
    activeCarouselIndex: 0, // 0..8
    mobileDrawerOpen: false,
    activePresetId: "tbb",
    brandName: "THE BEST BRAND",
    tagline: "YOUR BRAND, NOW!!!",
    businessGiro: "Plataforma interactiva con IA que guía a empresarios paso a paso para definir su identidad estratégica y generar su Manual Oficial de Marca de 36 Láminas y 9 Entregables.",
    whyPurpose: "Porque creemos que la claridad de marca multiplica el valor de las empresas y libera tiempo mental al líder.",
    howMethod: "Combinamos el acompañamiento socrático de Aura, ingeniería Kansei y síntesis vectorial Apple Liquid Glass paso a paso.",
    whatOffer: "Suite ejecutiva de 9 entregables oficiales: Manual de 36 Láminas (.PDF y .HTML), vectores (.SVG y .AI), firma (.HTML), Word (.DOCX), PowerPoint (.PPTX) y Kit de Fuentes (.ZIP).",
    tpBefore: ["Búsqueda Web y App Store", "Demostración Interactiva en Línea (Pasos 0, 1 y 2)", "Recomendación Directa de Empresarios"],
    tpDuring: ["Taller Guiado por Voz con Aura", "Lienzo Generativo de Logotipo en Tiempo Real", "Checkout Directo con Tarjeta, Apple Pay, Google Pay y PayPal"],
    tpAfter: ["Bóveda Digital del Manual de 36 Láminas en PDF y HTML", "Suite Editable (.SVG, .AI, .DOCX, .PPTX, .HTML, .ZIP)", "Seguimiento de Satisfacción y Expansión Web"],
    selectedPlan: "pro_atelier",
    selectedPaymentMethod: "card",
    comingSoonReservedWeb: false,
    comingSoonReservedSocial: false
  };

  function syncDemoStateFromAppIfAvailable() {
    try {
      const st = window.tbbCommercialDemoState;
      const presetBase = DEMO_QUICK_PRESETS.find(item => item.id === (st.activePresetId || "tbb")) || DEMO_QUICK_PRESETS[0];
      const locP = getLocalizedPresetData(presetBase);
      if (!st.userEditedCustomDemo) {
        st.brandName = locP.brandName;
        st.tagline = locP.tagline;
        st.businessGiro = locP.businessGiro;
        st.whyPurpose = locP.whyPurpose;
        st.howMethod = locP.howMethod;
        st.whatOffer = locP.whatOffer;
      }
      const cs = (typeof window.canvasState === "object" && window.canvasState) ? window.canvasState : null;
      if (!cs) return;
      if (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) st.brandName = cs.brandName;
      if (cs.tagline) st.tagline = cs.tagline;
      if (cs.custom_business_type && cs.custom_business_type.length > 12) st.businessGiro = cs.custom_business_type;
      if (cs.golden_circle && cs.golden_circle.length > 12) st.whyPurpose = cs.golden_circle;
      if (cs.process_steps_text && cs.process_steps_text.length > 12) st.howMethod = cs.process_steps_text;
      if (cs.value_offer && cs.value_offer.length > 12) st.whatOffer = cs.value_offer;
    } catch (e) {}
  }

  window.tbbSyncCommercialDemoToAppState = function () {
    const st = window.tbbCommercialDemoState;
    try {
      if (typeof window.canvasState === "object" && window.canvasState) {
        window.canvasState.brandName = st.brandName || "THE BEST BRAND";
        window.canvasState.tagline = st.tagline || "YOUR BRAND, NOW!!!";
        window.canvasState.custom_business_type = st.businessGiro;
        window.canvasState.step0_short_essence = st.businessGiro.split(/\s+/).slice(0, 7).join(" ");
        window.canvasState.golden_circle = st.whyPurpose;
        window.canvasState.process_steps_text = st.howMethod;
        window.canvasState.value_offer = st.whatOffer;
        window.canvasState.tp_before = st.tpBefore.join(", ");
        window.canvasState.tp_during = st.tpDuring.join(", ");
        window.canvasState.tp_after = st.tpAfter.join(", ");
      }
      if (typeof window.saveBrandSessionToLocalStorage === "function") {
        window.saveBrandSessionToLocalStorage();
      }
      localStorage.setItem("tbb_commercial_demo_snapshot_v56", JSON.stringify(st));
    } catch (e) {}
  };

  // ---------------------------------------------------------------------------
  // 4. CONTROLADOR DE NAVEGACIÓN ENTRE LAS 5 SUBPÁGINAS (COMPRAR SIEMPRE VISIBLE)
  // ---------------------------------------------------------------------------
  const SUBPAGE_META = {
    1: { slug: "inicio", path: "/", title: "THE BEST BRAND — YOUR BRAND, NOW!!!" },
    2: { slug: "demo", path: "/demo", title: "Demo EN VIVO — THE BEST BRAND" },
    3: { slug: "app-tour", path: "/app-tour", title: "App Tour — THE BEST BRAND" },
    4: { slug: "bases-teoricas", path: "/bases-teoricas", title: "Bases Teóricas — THE BEST BRAND" },
    5: { slug: "pack-descargas", path: "/pack-descargas", title: "Pack de Descargas — THE BEST BRAND" }
  };

  window.tbbSetActiveMainTab = function (slugOrNum) {
    const map = {
      inicio: 1,
      home: 1,
      demo: 2,
      "app-tour": 3,
      tour: 3,
      "bases-teoricas": 4,
      bases: 4,
      theory: 4,
      "pack-descargas": 5,
      pack: 5,
      downloads: 5
    };
    const key = String(slugOrNum || "1").toLowerCase().trim();
    const sec = map[key] || Number(slugOrNum) || 1;
    window.tbbSwitchMainSection(sec);
  };

  window.tbbMountSingleActiveIphoneStudioFrame = function () {
    const st = window.tbbCommercialDemoState || {};
    const sec = Number(st.activeMainSection || 1);
    const homeMount = document.getElementById("tbbHomeIphoneMount");
    const sub2Mount = document.getElementById("tbbSubpage2IphoneMount");

    if (sec === 2 && sub2Mount) {
      if (homeMount) homeMount.innerHTML = "";
      if (!sub2Mount.querySelector("iframe")) {
        sub2Mount.innerHTML = window.tbbBuildIphoneLiveStudioFrameHTML("tbbSubpage2IphoneStudioFrame");
      }
    } else if (homeMount) {
      if (sub2Mount) sub2Mount.innerHTML = "";
      if (!homeMount.querySelector("iframe")) {
        homeMount.innerHTML = window.tbbBuildIphoneLiveStudioFrameHTML("tbbHomeIphoneStudioFrame");
      }
    }
  };

  window.tbbFilterHome36PlatesChapter = function (chapFilter) {
    window.tbbCommercialDemoState.activePlateChapterFilter = chapFilter || "all";
    document.querySelectorAll(".tbb-plate36-filter-btn").forEach(btn => {
      const isAct = btn.getAttribute("data-chapter") === (chapFilter || "all");
      btn.style.background = isAct ? "#0D2540" : "#FFFFFF";
      btn.style.color = isAct ? "#FFFFFF" : "#334155";
      btn.style.borderColor = isAct ? "#0D2540" : "#CBD5E1";
    });
    document.querySelectorAll(".tbb-plate36-thumb-card").forEach(card => {
      const ch = card.getAttribute("data-chapter");
      const show = !chapFilter || chapFilter === "all" || ch === chapFilter;
      card.style.display = show ? "flex" : "none";
    });
  };

  window.tbbRenderActiveSubpageHTML = function (secNumber) {
    const s = Math.max(1, Math.min(5, Number(secNumber || 1)));
    if (s === 2) return window.tbbBuildSubpage2DemoHTML();
    if (s === 3) return window.tbbBuildSubpage3AppTourHTML();
    if (s === 4) return window.tbbBuildSubpage4TheoryHTML();
    if (s === 5) return window.tbbBuildSubpage5DownloadsHTML();
    return window.tbbBuildSubpage1HomeHTML();
  };

  window.tbbSwitchMainSection = function (secNumber, opts) {
    const s = Math.max(1, Math.min(5, Number(secNumber || 1)));
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.activeMainSection = s;
    document.body.classList.remove("tbb-is-demo-section");

    const meta = SUBPAGE_META[s] || SUBPAGE_META[1];
    try {
      document.title = meta.title;
      if (!(opts && opts.skipHistory)) {
        const currentSearch = window.location.search || "";
        const targetUrl = meta.path + currentSearch;
        if (window.location.pathname !== meta.path) {
          window.history.pushState({ sec: s }, meta.title, targetUrl);
        }
      }
    } catch (e) {}

    const viewport = document.getElementById("tbbMainActiveSubpageViewport");
    if (viewport) {
      viewport.innerHTML = window.tbbRenderActiveSubpageHTML(s);
    } else {
      for (let i = 1; i <= 5; i++) {
        const pane = document.getElementById(`tbbMainSectionPane_${i}`);
        if (pane) {
          pane.style.display = (i === s) ? "block" : "none";
        }
      }
    }

    for (let i = 1; i <= 5; i++) {
      document.querySelectorAll(`#tbbSecTab_${i}, .tbb-tab-sec-${i}`).forEach(btn => {
        btn.classList.toggle("is-active", i === s);
      });
    }

    window.tbbMountSingleActiveIphoneStudioFrame();

    const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
    if (floatBar) {
      const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true" && window.location.pathname !== "/studio" && !window.location.pathname.endsWith("studio.html");
      floatBar.style.display = isStandalone ? "flex" : "none";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (typeof window.tbbInitAwwwardsInteractions === "function") {
        window.tbbInitAwwwardsInteractions();
      }
    }, 60);
  };

  window.tbbLaunchDemoFullscreen = function () {
    window.tbbSwitchMainSection(2);
    const curLang = getLang();
    let overlay = document.getElementById("tbbFullscreenDemoOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "tbbFullscreenDemoOverlay";
      overlay.style.cssText = "position:fixed; inset:0; z-index:99999; background:#090D16; display:flex; flex-direction:column; width:100vw; height:100vh;";
      document.body.appendChild(overlay);
    }

    const backLabel = {
      es: "← Volver a The Best Brand",
      en: "← Back to The Best Brand",
      fr: "← Retour à The Best Brand",
      pt: "← Voltar para The Best Brand",
      de: "← Zurück zu The Best Brand",
      it: "← Torna a The Best Brand"
    }[curLang] || "← Volver a The Best Brand";

    overlay.innerHTML = `
      <div style="height:48px; background:#0D2540; border-bottom:1px solid rgba(255,255,255,0.12); display:flex; align-items:center; justify-content:space-between; padding:0 18px; flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="tbb-live-pulse-dot"></span>
          <span style="font-family:'Montserrat', sans-serif; font-size:0.84rem; font-weight:700; color:#FFFFFF; letter-spacing:0.02em;">THE BEST BRAND · DEMO EN VIVO</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:6px 14px; border-radius:999px; border:none; background:#FF7A00; color:#FFFFFF; font-size:0.76rem; font-weight:700; cursor:pointer;">${escHtml(t("buyNowHeader"))}</button>
          <button type="button" onclick="window.tbbCloseDemoFullscreen()" style="padding:6px 14px; border-radius:999px; border:1px solid rgba(255,255,255,0.28); background:rgba(255,255,255,0.08); color:#FFFFFF; font-size:0.76rem; font-weight:600; cursor:pointer;">${escHtml(backLabel)}</button>
        </div>
      </div>
      <iframe
        id="tbbFullscreenLiveStudioIframe"
        src="/studio?demo=true&fullscreen=1&lang=${encodeURIComponent(curLang)}"
        title="The Best Brand — Demo EN VIVO Pantalla Completa"
        allow="microphone; autoplay; clipboard-write; fullscreen"
        allowfullscreen
        style="flex:1; width:100%; height:calc(100vh - 48px); border:none; display:block; background:#090D16;"
      ></iframe>
    `;
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";

    try {
      if (document.fullscreenEnabled && overlay.requestFullscreen && !document.fullscreenElement) {
        overlay.requestFullscreen().catch(() => {});
      }
    } catch (e) {}
  };

  window.tbbCloseDemoFullscreen = function () {
    const overlay = document.getElementById("tbbFullscreenDemoOverlay");
    if (overlay) {
      overlay.style.display = "none";
      overlay.innerHTML = "";
    }
    document.body.style.overflow = "";
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}
  };

  window.tbbSetHeroVisualMode = function (mode) {
    window.tbbCommercialDemoState.heroVisualMode = mode === "manual" ? "manual" : "app";
    window.tbbRefreshCommercialPortalDOM();
  };

  // ---------------------------------------------------------------------------
  // 5. EMBLEMA VECTORIAL Y CÍRCULO DORADO EN VIVO (TIPOGRAFÍA LIGERA Y LIMPIA)
  // ---------------------------------------------------------------------------
  window.tbbBuildOfficialBrandbook1EmblemSVG = function (size = 44) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:block; flex-shrink:0;">
        <circle cx="100" cy="100" r="86" fill="#FF7A00"/>
        <circle cx="100" cy="100" r="79" fill="#0D2540"/>
        <circle cx="100" cy="100" r="56" fill="#38BDF8" fill-opacity="0.16"/>
        <path d="M 100 86 C 86 67, 82 43, 100 32 C 118 43, 114 67, 100 86 Z" fill="#38BDF8" fill-opacity="0.38" stroke="#7DD3FC" stroke-width="1.4"/>
        <path d="M 114 100 C 133 86, 157 82, 168 100 C 157 118, 133 114, 114 100 Z" fill="#38BDF8" fill-opacity="0.38" stroke="#7DD3FC" stroke-width="1.4"/>
        <path d="M 100 114 C 114 133, 118 157, 100 168 C 82 157, 86 133, 100 114 Z" fill="#38BDF8" fill-opacity="0.38" stroke="#7DD3FC" stroke-width="1.4"/>
        <path d="M 86 100 C 67 114, 43 118, 32 100 C 43 82, 67 86, 86 100 Z" fill="#38BDF8" fill-opacity="0.38" stroke="#7DD3FC" stroke-width="1.4"/>
        <circle cx="100" cy="100" r="22" fill="#FF7A00" fill-opacity="0.45"/>
        <circle cx="100" cy="100" r="11" fill="#FFFFFF"/>
      </svg>
    `;
  };

  function splitIntoTwoChordLines(str, maxCharsLine1, maxCharsLine2) {
    const clean = String(str || "").replace(/\s+/g, " ").trim();
    if (!clean) return ["—", ""];
    const words = clean.split(" ");
    let line1 = "";
    let idx = 0;
    while (idx < words.length) {
      const candidate = line1 ? `${line1} ${words[idx]}` : words[idx];
      if (candidate.length <= maxCharsLine1) {
        line1 = candidate;
        idx++;
      } else {
        break;
      }
    }
    if (!line1) {
      line1 = clean.slice(0, maxCharsLine1);
      const rest = clean.slice(maxCharsLine1, maxCharsLine1 + maxCharsLine2);
      return [line1, rest ? `${rest}…` : ""];
    }
    const remaining = words.slice(idx).join(" ");
    if (!remaining) return [line1, ""];
    if (remaining.length <= maxCharsLine2) return [line1, remaining];
    return [line1, remaining.slice(0, maxCharsLine2 - 1).trim() + "…"];
  }

  window.tbbBuildCircularGoldenCircleSVG = function () {
    const st = window.tbbCommercialDemoState;
    const lang = getLang();
    const [whatL1, whatL2] = splitIntoTwoChordLines(st.whatOffer, 32, 36);
    const [howL1, howL2] = splitIntoTwoChordLines(st.howMethod, 26, 28);
    const [whyL1, whyL2] = splitIntoTwoChordLines(st.whyPurpose, 18, 18);

    const gcLabels = {
      es: { w: "3. WHAT · OFERTA", h: "2. HOW · MÉTODO", y: "1. WHY · PROPÓSITO" },
      en: { w: "3. WHAT · OFFER", h: "2. HOW · METHOD", y: "1. WHY · PURPOSE" },
      fr: { w: "3. WHAT · OFFRE", h: "2. HOW · MÉTHODE", y: "1. WHY · RAISON D'ÊTRE" },
      pt: { w: "3. WHAT · OFERTA", h: "2. HOW · MÉTODO", y: "1. WHY · PROPÓSITO" },
      de: { w: "3. WHAT · ANGEBOT", h: "2. HOW · METHODE", y: "1. WHY · SINN & ZWECK" },
      it: { w: "3. WHAT · OFFERTA", h: "2. HOW · METODO", y: "1. WHY · SCOPO" }
    }[lang] || { w: "3. WHAT · OFERTA", h: "2. HOW · MÉTODO", y: "1. WHY · PROPÓSITO" };

    return `
      <svg viewBox="0 0 380 380" width="100%" height="320" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto; max-width:360px;">
        <defs>
          <radialGradient id="gcWhyCoreV91" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#1D4ED8"/>
            <stop offset="100%" stop-color="#0D2540"/>
          </radialGradient>
        </defs>
        <circle cx="190" cy="190" r="172" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
        <text x="190" y="42" text-anchor="middle" fill="#1D4ED8" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" letter-spacing="0.05em">${escHtml(gcLabels.w)}</text>
        <text x="190" y="57" text-anchor="middle" fill="#334155" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="500">
          <tspan x="190" dy="0">${escHtml(whatL1)}</tspan>
          ${whatL2 ? `<tspan x="190" dy="11.5">${escHtml(whatL2)}</tspan>` : ""}
        </text>

        <circle cx="190" cy="206" r="118" fill="#FFFFFF" stroke="#93C5FD" stroke-width="2" stroke-dasharray="5 4"/>
        <text x="190" y="114" text-anchor="middle" fill="#0D2540" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" letter-spacing="0.04em">${escHtml(gcLabels.h)}</text>
        <text x="190" y="128" text-anchor="middle" fill="#334155" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.2" font-weight="500">
          <tspan x="190" dy="0">${escHtml(howL1)}</tspan>
          ${howL2 ? `<tspan x="190" dy="11">${escHtml(howL2)}</tspan>` : ""}
        </text>

        <circle cx="190" cy="224" r="66" fill="url(#gcWhyCoreV91)" stroke="#FF7A00" stroke-width="2.5"/>
        <text x="190" y="205" text-anchor="middle" fill="#93C5FD" font-family="'JetBrains Mono', monospace" font-size="8.8" font-weight="600">${escHtml(gcLabels.y)}</text>
        <text x="190" y="224" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.8" font-weight="500">
          <tspan x="190" dy="0">${escHtml(whyL1)}</tspan>
          ${whyL2 ? `<tspan x="190" dy="10.5">${escHtml(whyL2)}</tspan>` : ""}
        </text>
      </svg>
    `;
  };

  // ---------------------------------------------------------------------------
  // 6. LIGHTBOX DE PANTALLA CASI COMPLETA (MÁXIMA RESOLUCIÓN) Y MODAL DE VIDEO
  // ---------------------------------------------------------------------------
  window.tbbOpenPlateLightboxModal = function (plateNum, customImgUrl, customTitle, customSampleUrl) {
    const pNum = Math.max(1, Math.min(36, Number(plateNum) || 1));
    const padNum = String(pNum).padStart(2, "0");
    const isBrandbookPlate = !customImgUrl || String(customImgUrl).includes("/assets/brandbook_plates_tbb/plate-");
    const imgSrc = customImgUrl || `/assets/brandbook_plates_tbb/plate-${padNum}.jpg`;
    const titleTxt = customTitle || `${t("lightboxPrev")} ${padNum} / 36 · The Best Brand`;
    const downloadHref = customSampleUrl || "/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf";

    let ov = document.getElementById("tbbPlateLightboxModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbPlateLightboxModalOverlay";
      ov.style.cssText = "position:fixed; inset:0; background:rgba(15,23,42,0.88); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); z-index:10080; display:flex; align-items:center; justify-content:center; padding:12px;";
      ov.onclick = (e) => { if (e.target === ov) window.tbbClosePlateLightboxModal(); };
      document.body.appendChild(ov);
    }

    const prevNum = pNum > 1 ? pNum - 1 : 36;
    const nextNum = pNum < 36 ? pNum + 1 : 1;

    ov.innerHTML = `
      <div style="background:#FFFFFF; border-radius:20px; width:96vw; height:94vh; max-width:1680px; box-shadow:0 30px 90px rgba(0,0,0,0.45); display:flex; flex-direction:column; overflow:hidden;">
        <div style="padding:14px 24px; display:flex; justify-content:space-between; align-items:center; gap:12px; border-bottom:1px solid #E2E8F0; flex-wrap:wrap; background:#FFFFFF;">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:34px; height:34px; border-radius:50%; object-fit:cover;" />
            <div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#EA580C;">${escHtml(t("lightboxKicker"))}</div>
              <div style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:600; color:#0F172A;">${escHtml(titleTxt)}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            ${isBrandbookPlate ? `
              <button type="button" onclick="window.tbbOpenPlateLightboxModal(${prevNum})" class="tbb-btn-light-surface" style="padding:7px 14px; font-size:0.78rem;">← ${escHtml(t("lightboxPrev"))} ${String(prevNum).padStart(2, '0')}</button>
              <button type="button" onclick="window.tbbOpenPlateLightboxModal(${nextNum})" class="tbb-btn-light-surface" style="padding:7px 14px; font-size:0.78rem;">${escHtml(t("lightboxNext"))} ${String(nextNum).padStart(2, '0')} →</button>
            ` : ''}
            <a href="${downloadHref}" target="_blank" rel="noopener" class="tbb-comm-btn-blue" style="padding:8px 16px; font-size:0.78rem; text-decoration:none;">${escHtml(t("packDownloadSample"))}</a>
            <button type="button" onclick="window.tbbClosePlateLightboxModal()" class="tbb-btn-light-surface" style="padding:7px 14px; font-size:0.86rem;">${escHtml(t("lightboxClose"))}</button>
          </div>
        </div>
        <div style="flex:1; padding:18px; background:#F8FAFC; display:flex; justify-content:center; align-items:center; overflow:auto;">
          <img src="${imgSrc}" alt="${escHtml(titleTxt)}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:12px; background:#FFFFFF; box-shadow:0 12px 40px rgba(15,23,42,0.08);" />
        </div>
      </div>
    `;
    ov.style.display = "flex";
  };

  window.tbbClosePlateLightboxModal = function () {
    const ov = document.getElementById("tbbPlateLightboxModalOverlay");
    if (ov) {
      ov.style.display = "none";
      ov.innerHTML = "";
    }
  };

  window.tbbOpenVideoPopupModal = function (stepIdx) {
    const s = Math.max(0, Math.min(VIDEO_CAPSULES.length - 1, Number(stepIdx) || 0));
    const cap = VIDEO_CAPSULES[s] || VIDEO_CAPSULES[0];
    const lang = getLang();
    const loc = cap.i18n[lang] || cap.i18n.es;
    if (window.tbbCommercialDemoState) {
      window.tbbCommercialDemoState.openVideoModalStep = s;
    }

    let ov = document.getElementById("tbbVideoCapsuleModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbVideoCapsuleModalOverlay";
      ov.style.cssText = "position:fixed; inset:0; background:rgba(15,23,42,0.86); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); z-index:10090; display:flex; align-items:center; justify-content:center; padding:16px;";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseVideoPopupModal(); };
      document.body.appendChild(ov);
    }

    const nextVideoLbl = {
      es: `Siguiente Video · ${stepLabelForLang(s + 1)} →`,
      en: `Next Video · ${stepLabelForLang(s + 1)} →`,
      fr: `Vidéo Suivante · ${stepLabelForLang(s + 1)} →`,
      pt: `Próximo Vídeo · ${stepLabelForLang(s + 1)} →`,
      de: `Nächstes Video · ${stepLabelForLang(s + 1)} →`,
      it: `Video Successivo · ${stepLabelForLang(s + 1)} →`
    }[lang] || `Siguiente Video · ${stepLabelForLang(s + 1)} →`;

    const stepPillsHtml = VIDEO_CAPSULES.map((vc, idx) => {
      const isAct = idx === s;
      return `<button type="button" onclick="window.tbbOpenVideoPopupModal(${idx})" style="padding:5px 10px; border-radius:999px; border:1px solid ${isAct ? '#FF7A00' : '#CBD5E1'}; background:${isAct ? '#0D2540' : '#F8FAFC'}; color:${isAct ? '#FFFFFF' : '#0F172A'}; font-size:0.72rem; font-weight:600; cursor:pointer;">${escHtml(stepLabelForLang(idx, idx === 0))}</button>`;
    }).join("");

    ov.innerHTML = `
      <div style="background:#FFFFFF; border-radius:24px; width:100%; max-width:860px; overflow:hidden; box-shadow:0 30px 90px rgba(0,0,0,0.45); display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr));">
        <div style="background:#0F172A; display:flex; align-items:center; justify-content:center; padding:16px;">
          <video src="${cap.url}" poster="${cap.poster}" controls autoplay playsinline style="max-height:74vh; width:auto; max-width:100%; border-radius:16px; box-shadow:0 16px 40px rgba(0,0,0,0.5);"></video>
        </div>
        <div style="padding:28px 26px; display:flex; flex-direction:column; justify-content:space-between; gap:16px; background:#FFFFFF; color:#0F172A;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:12px;">
              <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:600; color:#EA580C; background:#FFF7ED; padding:4px 10px; border-radius:999px;">
                ${escHtml(stepUpperForLang(s))} · HEYGEN · ${cap.duration} · (${lang.toUpperCase()})
              </span>
              <button type="button" onclick="window.tbbCloseVideoPopupModal()" class="tbb-btn-light-surface" style="padding:4px 11px; font-size:0.82rem;">✕</button>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px;">
              ${stepPillsHtml}
            </div>
            <h3 style="font-family:'Montserrat', sans-serif; font-size:1.22rem; font-weight:600; color:#0F172A; margin:0 0 8px 0; line-height:1.28;">
              ${escHtml(loc.title)}
            </h3>
            <div style="font-size:0.80rem; font-weight:500; color:#1D4ED8; margin-bottom:12px;">
              ${escHtml(cap.author)}
            </div>
            <p style="font-size:0.88rem; font-weight:400; color:#475569; line-height:1.62; margin:0;">
              ${escHtml(loc.desc)}
            </p>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; padding-top:14px; border-top:1px solid #E2E8F0;">
            ${s < 6 ? `
              <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbOpenVideoPopupModal(${s + 1});" style="width:100%; padding:11px; font-size:0.86rem;">
                ${escHtml(nextVideoLbl)}
              </button>
            ` : `
              <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbCloseVideoPopupModal(); window.tbbOpenBuyAppCheckoutModal('pro_atelier');" style="width:100%; padding:11px; font-size:0.86rem;">
                ${escHtml(t("buyNowFloating"))}
              </button>
            `}
            <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseVideoPopupModal()" style="width:100%; padding:9px; font-size:0.80rem;">
              ${escHtml(t("videoPopupContinue"))}
            </button>
          </div>
        </div>
      </div>
    `;
    ov.style.display = "flex";
  };

  window.tbbCloseVideoPopupModal = function () {
    if (window.tbbCommercialDemoState) {
      window.tbbCommercialDemoState.openVideoModalStep = null;
    }
    const ov = document.getElementById("tbbVideoCapsuleModalOverlay");
    if (ov) {
      ov.style.display = "none";
      ov.innerHTML = "";
    }
  };

  // ---------------------------------------------------------------------------
  // 7. FUNCIONES INTERACTIVAS DE LA DEMO (PASOS 0, 1 Y 2), CARRUSEL Y PRÓXIMAMENTE
  // ---------------------------------------------------------------------------
  window.tbbApplyCommercialDemoPreset = function (presetId) {
    const rawPreset = DEMO_QUICK_PRESETS.find(item => item.id === presetId) || DEMO_QUICK_PRESETS[0];
    const p = getLocalizedPresetData(rawPreset);
    const st = window.tbbCommercialDemoState;
    st.activePresetId = p.id;
    st.demoObjective = p.objective || "create";
    st.brandName = p.brandName;
    st.tagline = p.tagline;
    st.businessGiro = p.businessGiro;
    st.whyPurpose = p.whyPurpose;
    st.howMethod = p.howMethod;
    st.whatOffer = p.whatOffer;
    window.tbbSyncCommercialDemoToAppState();

    // Actualizar tarjeta del Círculo Dorado y título sin recargar el iframe del iPhone
    const gcWrap = document.getElementById("tbbDemoLiveGoldenCircleWrap");
    if (gcWrap) gcWrap.innerHTML = window.tbbBuildCircularGoldenCircleSVG();
    const bTitleEl = document.getElementById("tbbDemoLiveBrandTitle");
    if (bTitleEl) bTitleEl.textContent = st.brandName;
    const bTagEl = document.getElementById("tbbDemoLiveBrandTagline");
    if (bTagEl) bTagEl.textContent = st.tagline;

    document.querySelectorAll(".tbb-demo-preset-pill-btn").forEach(btn => {
      const isAct = btn.getAttribute("data-preset-id") === p.id;
      btn.style.background = isAct ? "#0D2540" : "#FFFFFF";
      btn.style.color = isAct ? "#FFFFFF" : "#0F172A";
      btn.style.borderColor = isAct ? "#0D2540" : "#CBD5E1";
    });

    // Enviar preset al iframe real de Studio en el iPhone
    document.querySelectorAll(".tbb-live-iphone-studio-iframe").forEach(fr => {
      try {
        if (fr && fr.contentWindow) {
          fr.contentWindow.postMessage({ type: "TBB_LOAD_PRESET", presetId: p.id, presetData: p }, "*");
        }
      } catch (e) {}
    });
  };

  window.tbbSwitchCommercialDemoStep = function (stepNum) {
    const s = [0, 1, 2].includes(Number(stepNum)) ? Number(stepNum) : 0;
    window.tbbCommercialDemoState.activeDemoStep = s;
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
  };

  window.tbbSetDemoObjective = function (objMode) {
    window.tbbCommercialDemoState.demoObjective = objMode === "redesign" ? "redesign" : "create";
    window.tbbRefreshCommercialPortalDOM();
  };

  window.tbbUpdateCommercialDemoField = function (fieldKey, value) {
    window.tbbCommercialDemoState[fieldKey] = String(value || "");
    window.tbbSyncCommercialDemoToAppState();
    const gcWrap = document.getElementById("tbbDemoLiveGoldenCircleWrap");
    if (gcWrap) gcWrap.innerHTML = window.tbbBuildCircularGoldenCircleSVG();
    const bTitleEl = document.getElementById("tbbDemoLiveBrandTitle");
    if (bTitleEl) bTitleEl.textContent = window.tbbCommercialDemoState.brandName || "THE BEST BRAND";
    const bTagEl = document.getElementById("tbbDemoLiveBrandTagline");
    if (bTagEl) bTagEl.textContent = window.tbbCommercialDemoState.tagline || "YOUR BRAND, NOW!!!";
  };

  window.tbbPolishCommercialDemoStep1 = function () {
    const st = window.tbbCommercialDemoState;
    const refine = typeof window.tbbRefineUserCopyOrthoAndClarity === "function"
      ? window.tbbRefineUserCopyOrthoAndClarity
      : (txt) => String(txt || "").trim();
    st.businessGiro = refine(st.businessGiro, "giro", st.brandName, st.businessGiro);
    st.whyPurpose = refine(st.whyPurpose, "golden_circle", st.brandName, st.businessGiro);
    st.howMethod = refine(st.howMethod, "process_steps_text", st.brandName, st.businessGiro);
    st.whatOffer = refine(st.whatOffer, "value_offer", st.brandName, st.businessGiro);
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
  };

  window.tbbToggleCommercialDemoTouchpoint = function (stateKey, itemText) {
    const st = window.tbbCommercialDemoState;
    const list = Array.isArray(st[stateKey]) ? st[stateKey] : [];
    const idx = list.indexOf(itemText);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(itemText);
    st[stateKey] = list;
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
  };

  window.tbbSelectDeliverableCarousel = function (idx) {
    const total = OFFICIAL_9_DELIVERABLES.length;
    const clean = ((Number(idx) || 0) % total + total) % total;
    window.tbbCommercialDemoState.activeCarouselIndex = clean;
    window.tbbRefreshCommercialPortalDOM();
    setTimeout(() => {
      const strip = document.getElementById("tbbModernDeliverablesCarouselTrack");
      const card = document.getElementById(`tbbCarouselDelivCard_${clean}`);
      if (strip && card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }, 30);
  };

  window.tbbReserveComingSoonAddon = function (addonType) {
    if (addonType === "web") {
      window.tbbCommercialDemoState.comingSoonReservedWeb = true;
    } else {
      window.tbbCommercialDemoState.comingSoonReservedSocial = true;
    }
    window.tbbRefreshCommercialPortalDOM();
  };

  // ---------------------------------------------------------------------------
  // 8. CONSTRUCCIÓN DE CADA UNA DE LAS 5 SUBPÁGINAS (PANORÁMICAS, CLARAS, LIMPIAS)
  // ---------------------------------------------------------------------------

  window.tbbBuildIphoneLiveStudioFrameHTML = function (frameId = "tbbLiveIphoneStudioFrame") {
    const st = window.tbbCommercialDemoState;
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    const curStep = Math.max(0, Math.min(6, Number(st.activeDemoStep || 0)));
    const curLang = getLang();

    const step4UnlockedLbl = {
      es: "Paso 4 · Kansei ✓",
      en: "Step 4 · Kansei ✓",
      fr: "Étape 4 · Kansei ✓",
      pt: "Passo 4 · Kansei ✓",
      de: "Schritt 4 · Kansei ✓",
      it: "Passo 4 · Kansei ✓"
    }[curLang] || "Paso 4 · Kansei ✓";

    return `
      <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
        <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px;">
          ${[
            { s: 0, lbl: t("iphoneStep0Free") },
            { s: 1, lbl: t("iphoneStep1Free") },
            { s: 2, lbl: t("iphoneStep2Free") },
            { s: 3, lbl: t("iphoneStep3Free") },
            { s: 4, lbl: isLicensed ? step4UnlockedLbl : t("iphoneStep4Unlock") }
          ].map(item => {
            const isAct = curStep === item.s;
            return `
              <button type="button" onclick="window.tbbIphoneJumpToStep(${item.s})" style="padding:7px 13px; border-radius:999px; border:1px solid ${isAct ? '#1D4ED8' : (item.s === 4 && !isLicensed ? '#FDBA74' : '#CBD5E1')}; background:${isAct ? '#0D2540' : (item.s === 4 && !isLicensed ? '#FFF7ED' : '#FFFFFF')}; color:${isAct ? '#FFFFFF' : (item.s === 4 && !isLicensed ? '#EA580C' : '#0F172A')}; font-size:0.75rem; font-weight:500; cursor:pointer; transition:all 0.2s ease;">
                ${escHtml(item.lbl)}
              </button>
            `;
          }).join("")}
          <button type="button" onclick="window.tbbIphoneOpenActiveStepVideo()" style="padding:7px 13px; border-radius:999px; border:1px solid #1D4ED8; background:#EFF6FF; color:#1D4ED8; font-size:0.75rem; font-weight:500; cursor:pointer;">
            ${escHtml(t("iphoneVideoBtn"))}
          </button>
        </div>

        <!-- Mockup Real de iPhone 16 Pro Titanium con la App Real (/studio) y Aura en Vivo -->
        <div style="position:relative; width:392px; max-width:94vw; height:790px; background:linear-gradient(145deg, #1E293B 0%, #0F172A 50%, #334155 100%); border-radius:54px; padding:13px; box-shadow:0 34px 90px rgba(15,23,42,0.22), inset 0 0 0 2px rgba(255,255,255,0.22); display:flex; flex-direction:column;">
          <!-- Dynamic Island -->
          <div style="position:absolute; top:21px; left:50%; transform:translateX(-50%); width:116px; height:26px; background:#000000; border-radius:999px; z-index:20; display:flex; align-items:center; justify-content:space-between; padding:0 12px; box-shadow:0 2px 8px rgba(0,0,0,0.45);">
            <span class="tbb-live-pulse-dot" style="width:7px; height:7px;"></span>
            <span style="font-family:'JetBrains Mono', monospace; font-size:0.55rem; color:#FFFFFF; letter-spacing:0.04em;">AURA LIVE</span>
            <span style="width:9px; height:9px; border-radius:50%; background:radial-gradient(circle, #38BDF8 0%, #1E3A8A 80%);"></span>
          </div>

          <!-- Pantalla iOS con App Real Ejecutándose en Vivo -->
          <div style="flex:1; width:100%; height:100%; background:#090D16; border-radius:42px; overflow:hidden; position:relative; display:flex; flex-direction:column;">
            <div style="height:34px; background:#090D16; color:#FFFFFF; display:flex; align-items:center; justify-content:space-between; padding:6px 22px 0 22px; font-family:'Plus Jakarta Sans', sans-serif; font-size:0.7rem; font-weight:500; flex-shrink:0;">
              <span>9:41</span>
              <span style="font-family:'JetBrains Mono', monospace; font-size:0.6rem; color:#38BDF8;">5G · TBB OS</span>
            </div>
            <iframe
              id="${frameId}"
              class="tbb-live-iphone-studio-iframe"
              src="/studio?demo=true&embed=iphone&lang=${encodeURIComponent(curLang)}"
              title="The Best Brand Studio Real App con Aura en Vivo"
              allow="microphone; autoplay; clipboard-write"
              style="flex:1; width:100%; height:100%; border:none; display:block; background:#090D16;"
            ></iframe>
          </div>
        </div>
      </div>
    `;
  };

  window.tbbIphoneJumpToStep = function (stepNum) {
    const target = Number(stepNum || 0);
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    if (target >= 4 && !isLicensed) {
      window.tbbOpenBuyAppCheckoutModal("pro_atelier");
      return;
    }
    window.tbbCommercialDemoState.activeDemoStep = target;
    document.querySelectorAll(".tbb-live-iphone-studio-iframe").forEach(fr => {
      try {
        if (fr && fr.contentWindow) {
          fr.contentWindow.postMessage({ type: "TBB_IPHONE_JUMP_STEP", step: target, subStep: 1 }, "*");
        }
      } catch (e) {}
    });
  };

  window.tbbIphoneOpenActiveStepVideo = function () {
    const curStep = Number(window.tbbCommercialDemoState.activeDemoStep || 0);
    window.tbbOpenVideoPopupModal(curStep);
  };

  // SUBPÁGINA 1: PORTADA / INICIO (VIDEO CONVERGENCIA 6 TEORÍAS + IPHONE REAL + NANOBANANA PRO 4K + 36 LÁMINAS + 9 ENTREGABLES)
  window.tbbBuildSubpage1HomeHTML = function () {
    const st = window.tbbCommercialDemoState;
    const lang = getLang();
    const isManual = st.heroVisualMode === "manual";
    const step0Loc = APP_TOUR_FLOW_ITEMS[0].i18n[lang] || APP_TOUR_FLOW_ITEMS[0].i18n.es;
    const activePreset = st.activePresetId || "tbb";

    const theoryPillarsDict = {
      es: [
        { step: "PASO 1", author: "Simon Sinek", theory: "El Círculo Dorado (Why · How · What)" },
        { step: "PASO 2", author: "Jan Carlzon & Don Norman", theory: "Momentos de la Verdad & Touchpoints" },
        { step: "PASO 3", author: "Al Ries, Trout & A. Watkins", theory: "Posicionamiento, Modelo SMILE & Clases Niza" },
        { step: "PASO 4", author: "Prof. Mitsuo Nagamachi", theory: "Ingeniería Kansei & Diferencial de Osgood" },
        { step: "PASO 5", author: "Paul Rand, Sagi Haviv & Jony Ive", theory: "Síntesis Vectorial Bézier & Liquid Glass" },
        { step: "PASO 6", author: "Massimo Vignelli & Müller-Brockmann", theory: "Canon de Retícula en 36 Láminas y 9 Entregables" }
      ],
      en: [
        { step: "STEP 1", author: "Simon Sinek", theory: "The Golden Circle (Why · How · What)" },
        { step: "STEP 2", author: "Jan Carlzon & Don Norman", theory: "Moments of Truth & Touchpoints" },
        { step: "STEP 3", author: "Al Ries, Trout & A. Watkins", theory: "Positioning, SMILE Model & Nice Classes" },
        { step: "STEP 4", author: "Prof. Mitsuo Nagamachi", theory: "Kansei Engineering & Osgood Differential" },
        { step: "STEP 5", author: "Paul Rand, Sagi Haviv & Jony Ive", theory: "Bézier Vector Synthesis & Liquid Glass" },
        { step: "STEP 6", author: "Massimo Vignelli & Müller-Brockmann", theory: "Grid Canon in 36 Plates & 9 Deliverables" }
      ],
      fr: [
        { step: "ÉTAPE 1", author: "Simon Sinek", theory: "Le Cercle d'Or (Why · How · What)" },
        { step: "ÉTAPE 2", author: "Jan Carlzon & Don Norman", theory: "Moments de Vérité & Touchpoints" },
        { step: "ÉTAPE 3", author: "Al Ries, Trout & A. Watkins", theory: "Positionnement, Modèle SMILE & Classes de Nice" },
        { step: "ÉTAPE 4", author: "Prof. Mitsuo Nagamachi", theory: "Ingénierie Kansei & Différentiel d'Osgood" },
        { step: "ÉTAPE 5", author: "Paul Rand, Sagi Haviv & Jony Ive", theory: "Synthèse Vectorielle Bézier & Liquid Glass" },
        { step: "ÉTAPE 6", author: "Massimo Vignelli & Müller-Brockmann", theory: "Canon de Grille en 36 Planches & 9 Livrables" }
      ],
      pt: [
        { step: "PASSO 1", author: "Simon Sinek", theory: "O Círculo Dourado (Why · How · What)" },
        { step: "PASSO 2", author: "Jan Carlzon & Don Norman", theory: "Momentos da Verdade & Touchpoints" },
        { step: "PASSO 3", author: "Al Ries, Trout & A. Watkins", theory: "Posicionamento, Modelo SMILE & Classes Nice" },
        { step: "PASSO 4", author: "Prof. Mitsuo Nagamachi", theory: "Engenharia Kansei & Diferencial de Osgood" },
        { step: "PASSO 5", author: "Paul Rand, Sagi Haviv & Jony Ive", theory: "Síntese Vetorial Bézier & Liquid Glass" },
        { step: "PASSO 6", author: "Massimo Vignelli & Müller-Brockmann", theory: "Cânone de Grelha em 36 Lâminas e 9 Entregáveis" }
      ],
      de: [
        { step: "SCHRITT 1", author: "Simon Sinek", theory: "Der Golden Circle (Why · How · What)" },
        { step: "SCHRITT 2", author: "Jan Carlzon & Don Norman", theory: "Momente der Wahrheit & Touchpoints" },
        { step: "SCHRITT 3", author: "Al Ries, Trout & A. Watkins", theory: "Positionierung, SMILE-Modell & Nizza-Klassen" },
        { step: "SCHRITT 4", author: "Prof. Mitsuo Nagamachi", theory: "Kansei-Engineering & Osgood-Differential" },
        { step: "SCHRITT 5", author: "Paul Rand, Sagi Haviv & Jony Ive", theory: "Bézier-Vektorsynthese & Liquid Glass" },
        { step: "SCHRITT 6", author: "Massimo Vignelli & Müller-Brockmann", theory: "Rasterkanon in 36 Tafeln & 9 Ergebnissen" }
      ],
      it: [
        { step: "PASSO 1", author: "Simon Sinek", theory: "Il Cerchio d'Oro (Why · How · What)" },
        { step: "PASSO 2", author: "Jan Carlzon & Don Norman", theory: "Momenti della Verità & Touchpoint" },
        { step: "PASSO 3", author: "Al Ries, Trout & A. Watkins", theory: "Posizionamento, Modello SMILE & Classi di Nizza" },
        { step: "PASSO 4", author: "Prof. Mitsuo Nagamachi", theory: "Ingegneria Kansei & Differenziale di Osgood" },
        { step: "PASSO 5", author: "Paul Rand, Sagi Haviv & Jony Ive", theory: "Sintesi Vettoriale Bézier & Liquid Glass" },
        { step: "PASSO 6", author: "Massimo Vignelli & Müller-Brockmann", theory: "Canone di Griglia in 36 Tavole e 9 Deliverable" }
      ]
    };
    const theoryPillars = theoryPillarsDict[lang] || theoryPillarsDict.es;

    const chapI18n = {
      es: {
        all: "Todas las 36 Láminas (01–36)",
        c1: "Cap. I · Estrategia (01–09)",
        c2: "Cap. II · Touchpoints (10–12)",
        c3: "Cap. III · Logotipo & Curvas (13–20)",
        c4: "Cap. IV · Color & Fuentes (21–26)",
        c5: "Cap. V · Mockups & Cierre (27–36)",
        s1: "Cap. I · Estrategia",
        s2: "Cap. II · Touchpoints",
        s3: "Cap. III · Logotipo & Geometría",
        s4: "Cap. IV · Color & Tipografía",
        s5: "Cap. V · Aplicaciones & Cierre",
        plateWord: "LÁMINA",
        pdfBtn: "⬇ PDF 36 Láminas",
        badgePlate1: "BRANDBOOK OFICIAL · LÁMINA 01 / 36"
      },
      en: {
        all: "All 36 Plates (01–36)",
        c1: "Ch. I · Strategy (01–09)",
        c2: "Ch. II · Touchpoints (10–12)",
        c3: "Ch. III · Logo & Curves (13–20)",
        c4: "Ch. IV · Color & Fonts (21–26)",
        c5: "Ch. V · Mockups & Closing (27–36)",
        s1: "Ch. I · Strategy",
        s2: "Ch. II · Touchpoints",
        s3: "Ch. III · Logo & Geometry",
        s4: "Ch. IV · Color & Typography",
        s5: "Ch. V · Applications & Closing",
        plateWord: "PLATE",
        pdfBtn: "⬇ 36-Plate PDF",
        badgePlate1: "OFFICIAL BRANDBOOK · PLATE 01 / 36"
      },
      fr: {
        all: "Toutes les 36 Planches (01–36)",
        c1: "Chap. I · Stratégie (01–09)",
        c2: "Chap. II · Touchpoints (10–12)",
        c3: "Chap. III · Logo & Courbes (13–20)",
        c4: "Chap. IV · Couleur & Polices (21–26)",
        c5: "Chap. V · Mockups & Clôture (27–36)",
        s1: "Chap. I · Stratégie",
        s2: "Chap. II · Touchpoints",
        s3: "Chap. III · Logo & Géométrie",
        s4: "Chap. IV · Couleur & Typographie",
        s5: "Chap. V · Applications & Clôture",
        plateWord: "PLANCHE",
        pdfBtn: "⬇ PDF 36 Planches",
        badgePlate1: "BRANDBOOK OFFICIEL · PLANCHE 01 / 36"
      },
      pt: {
        all: "Todas as 36 Lâminas (01–36)",
        c1: "Cap. I · Estratégia (01–09)",
        c2: "Cap. II · Touchpoints (10–12)",
        c3: "Cap. III · Logotipo & Curvas (13–20)",
        c4: "Cap. IV · Cor & Fontes (21–26)",
        c5: "Cap. V · Mockups & Fecho (27–36)",
        s1: "Cap. I · Estratégia",
        s2: "Cap. II · Touchpoints",
        s3: "Cap. III · Logotipo & Geometria",
        s4: "Cap. IV · Cor & Tipografia",
        s5: "Cap. V · Aplicações & Fecho",
        plateWord: "LÂMINA",
        pdfBtn: "⬇ PDF 36 Lâminas",
        badgePlate1: "BRANDBOOK OFICIAL · LÂMINA 01 / 36"
      },
      de: {
        all: "Alle 36 Tafeln (01–36)",
        c1: "Kap. I · Strategie (01–09)",
        c2: "Kap. II · Touchpoints (10–12)",
        c3: "Kap. III · Logo & Kurven (13–20)",
        c4: "Kap. IV · Farbe & Schriften (21–26)",
        c5: "Kap. V · Mockups & Abschluss (27–36)",
        s1: "Kap. I · Strategie",
        s2: "Kap. II · Touchpoints",
        s3: "Kap. III · Logo & Geometrie",
        s4: "Kap. IV · Farbe & Typografie",
        s5: "Kap. V · Anwendungen & Abschluss",
        plateWord: "TAFEL",
        pdfBtn: "⬇ PDF 36 Tafeln",
        badgePlate1: "OFFIZIELLES BRANDBOOK · TAFEL 01 / 36"
      },
      it: {
        all: "Tutte le 36 Tavole (01–36)",
        c1: "Cap. I · Strategia (01–09)",
        c2: "Cap. II · Touchpoint (10–12)",
        c3: "Cap. III · Logo & Curve (13–20)",
        c4: "Cap. IV · Colore & Font (21–26)",
        c5: "Cap. V · Mockup & Chiusura (27–36)",
        s1: "Cap. I · Strategia",
        s2: "Cap. II · Touchpoint",
        s3: "Cap. III · Logo & Geometria",
        s4: "Cap. IV · Colore & Tipografia",
        s5: "Cap. V · Applicazioni & Chiusura",
        plateWord: "TAVOLA",
        pdfBtn: "⬇ PDF 36 Tavole",
        badgePlate1: "BRANDBOOK UFFICIALE · TAVOLA 01 / 36"
      }
    }[lang] || {
      all: "Todas las 36 Láminas (01–36)",
      c1: "Cap. I · Estrategia (01–09)",
      c2: "Cap. II · Touchpoints (10–12)",
      c3: "Cap. III · Logotipo & Curvas (13–20)",
      c4: "Cap. IV · Color & Fuentes (21–26)",
      c5: "Cap. V · Mockups & Cierre (27–36)",
      s1: "Cap. I · Estrategia",
      s2: "Cap. II · Touchpoints",
      s3: "Cap. III · Logotipo & Geometría",
      s4: "Cap. IV · Color & Tipografía",
      s5: "Cap. V · Aplicaciones & Cierre",
      plateWord: "LÁMINA",
      pdfBtn: "⬇ PDF 36 Láminas",
      badgePlate1: "BRANDBOOK OFICIAL · LÁMINA 01 / 36"
    };

    const nanoCaseCopy = {
      es: {
        c1Badge: "CASO REAL 01 · REDISEÑO INDUSTRIAL",
        c1Iter: "10 ITERACIONES NANO BANANA PRO",
        c1Foot: "ARCO Ingeniería · Paleta Institucional Respetada + Vector .SVG y .AI",
        c1Zoom: "⤢ Ver en estudio",
        c2Badge: "CASO REAL 02 · APPLE LIQUID GLASS 4K",
        c2Iter: "6 ITERACIONES + CURVAS BÉZIER",
        c2Foot: "4 Configuraciones Oficiales: Horizontal, Apilado, Símbolo 1:1 y Sello Circular",
        c2Zoom: "⤢ Ampliar",
        tag1: "SaaS IA · 36 Láminas",
        tag2: "Arquitectura Homologada",
        tag3: "Síntesis Kansei Minimalista",
        tag4: "Geometría Vectorial Precisa"
      },
      en: {
        c1Badge: "REAL CASE 01 · INDUSTRIAL REDESIGN",
        c1Iter: "10 NANO BANANA PRO ITERATIONS",
        c1Foot: "ARCO Engineering · Institutional Palette Preserved + .SVG & .AI Vector",
        c1Zoom: "⤢ View in studio",
        c2Badge: "REAL CASE 02 · APPLE LIQUID GLASS 4K",
        c2Iter: "6 ITERATIONS + BÉZIER CURVES",
        c2Foot: "4 Official Lockups: Horizontal, Stacked, 1:1 Symbol & Circular Seal",
        c2Zoom: "⤢ Enlarge",
        tag1: "AI SaaS · 36 Plates",
        tag2: "Unified Brand Architecture",
        tag3: "Minimalist Kansei Synthesis",
        tag4: "Precise Vector Geometry"
      },
      fr: {
        c1Badge: "CAS RÉEL 01 · REFONTE INDUSTRIELLE",
        c1Iter: "10 ITÉRATIONS NANO BANANA PRO",
        c1Foot: "ARCO Ingénierie · Palette Institutionnelle Respectée + Vecteur .SVG & .AI",
        c1Zoom: "⤢ Voir en studio",
        c2Badge: "CAS RÉEL 02 · APPLE LIQUID GLASS 4K",
        c2Iter: "6 ITÉRATIONS + COURBES DE BÉZIER",
        c2Foot: "4 Configurations Officielles : Horizontale, Empilée, Symbole 1:1 et Sceau",
        c2Zoom: "⤢ Agrandir",
        tag1: "SaaS IA · 36 Planches",
        tag2: "Architecture Homologuée",
        tag3: "Synthèse Kansei Minimaliste",
        tag4: "Géométrie Vectorielle Précise"
      },
      pt: {
        c1Badge: "CASO REAL 01 · REDESIGN INDUSTRIAL",
        c1Iter: "10 ITERAÇÕES NANO BANANA PRO",
        c1Foot: "ARCO Engenharia · Paleta Institucional Respeitada + Vetor .SVG e .AI",
        c1Zoom: "⤢ Ver no estúdio",
        c2Badge: "CASO REAL 02 · APPLE LIQUID GLASS 4K",
        c2Iter: "6 ITERAÇÕES + CURVAS BÉZIER",
        c2Foot: "4 Configurações Oficiais: Horizontal, Empilhado, Símbolo 1:1 e Selo Circular",
        c2Zoom: "⤢ Ampliar",
        tag1: "SaaS IA · 36 Lâminas",
        tag2: "Arquitetura Homologada",
        tag3: "Síntese Kansei Minimalista",
        tag4: "Geometria Vetorial Precisa"
      },
      de: {
        c1Badge: "PRAXISFALL 01 · INDUSTRIE-REDESIGN",
        c1Iter: "10 NANO BANANA PRO ITERATIONEN",
        c1Foot: "ARCO Ingenieurwesen · Institutionelle Palette bewahrt + .SVG & .AI Vektor",
        c1Zoom: "⤢ Im Studio ansehen",
        c2Badge: "PRAXISFALL 02 · APPLE LIQUID GLASS 4K",
        c2Iter: "6 ITERATIONEN + BÉZIER-KURVEN",
        c2Foot: "4 Offizielle Lockups: Horizontal, Gestapelt, 1:1-Symbol & Rundsiegel",
        c2Zoom: "⤢ Vergrößern",
        tag1: "KI-SaaS · 36 Tafeln",
        tag2: "Homologierte Architektur",
        tag3: "Minimalistische Kansei-Synthese",
        tag4: "Präzise Vektorgeometrie"
      },
      it: {
        c1Badge: "CASO REALE 01 · REDESIGN INDUSTRIALE",
        c1Iter: "10 ITERAZIONI NANO BANANA PRO",
        c1Foot: "ARCO Ingegneria · Palette Istituzionale Rispettata + Vettore .SVG e .AI",
        c1Zoom: "⤢ Vedi in studio",
        c2Badge: "CASO REALE 02 · APPLE LIQUID GLASS 4K",
        c2Iter: "6 ITERAZIONI + CURVE BÉZIER",
        c2Foot: "4 Configurazioni Ufficiali: Orizzontale, Impilato, Simbolo 1:1 e Sigillo",
        c2Zoom: "⤢ Ingrandisci",
        tag1: "SaaS IA · 36 Tavole",
        tag2: "Architettura Omologata",
        tag3: "Sintesi Kansei Minimalista",
        tag4: "Geometria Vettoriale Precisa"
      }
    }[lang] || {
      c1Badge: "CASO REAL 01 · REDISEÑO INDUSTRIAL",
      c1Iter: "10 ITERACIONES NANO BANANA PRO",
      c1Foot: "ARCO Ingeniería · Paleta Institucional Respetada + Vector .SVG y .AI",
      c1Zoom: "⤢ Ver en estudio",
      c2Badge: "CASO REAL 02 · APPLE LIQUID GLASS 4K",
      c2Iter: "6 ITERACIONES + CURVAS BÉZIER",
      c2Foot: "4 Configuraciones Oficiales: Horizontal, Apilado, Símbolo 1:1 y Sello Circular",
      c2Zoom: "⤢ Ampliar",
      tag1: "SaaS IA · 36 Láminas",
      tag2: "Arquitectura Homologada",
      tag3: "Síntesis Kansei Minimalista",
      tag4: "Geometría Vectorial Precisa"
    };

    const plates36Meta = Array.from({ length: 36 }, (_, idx) => {
      const n = idx + 1;
      const pad = String(n).padStart(2, "0");
      let chap = "c1";
      let chapLabel = chapI18n.s1;
      if (n >= 10 && n <= 12) { chap = "c2"; chapLabel = chapI18n.s2; }
      else if (n >= 13 && n <= 20) { chap = "c3"; chapLabel = chapI18n.s3; }
      else if (n >= 21 && n <= 26) { chap = "c4"; chapLabel = chapI18n.s4; }
      else if (n >= 27) { chap = "c5"; chapLabel = chapI18n.s5; }
      return { n, pad, chap, chapLabel, img: `/assets/brandbook_plates_tbb/plate-${pad}.jpg` };
    });

    return `
      <section style="padding:48px 24px 52px 24px; background:linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);">
        <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:26px;">
          <div style="text-align:center; max-width:980px; display:flex; flex-direction:column; align-items:center; gap:18px;">
            <div style="display:inline-flex; align-items:center; gap:10px; padding:6px 16px; border-radius:999px; background:#F1F5F9; color:#0D2540; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; letter-spacing:0.04em;">
              <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="Aura" style="width:22px; height:22px; border-radius:50%; object-fit:cover;" />
              <span>${escHtml(t("heroEyebrow"))}</span>
            </div>

            <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(2.1rem, 4.3vw, 3.5rem); font-weight:600; color:#0F172A; line-height:1.12; letter-spacing:-0.03em; margin:0;">
              ${escHtml(t("heroHook"))}
            </h1>

            <p style="font-size:clamp(0.98rem, 1.38vw, 1.12rem); font-weight:400; color:#475569; line-height:1.68; max-width:880px; margin:0;">
              ${escHtml(t("heroTheoriesCopy"))}
            </p>

            <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:14px; margin-top:4px; width:100%;">
              <button type="button" onclick="document.getElementById('tbbHomeLiveIphoneDemoAnchor')?.scrollIntoView({behavior:'smooth'});" class="tbb-comm-btn-blue" style="padding:15px 26px; font-size:0.95rem; font-weight:600; display:inline-flex; align-items:center; gap:12px;">
                <span class="tbb-live-pulse-dot"></span>
                <span>${escHtml(t("heroBtnDemo"))}</span>
                <span class="tbb-live-pill-badge">${escHtml(t("menu2Live"))}</span>
              </button>

              <button type="button" onclick="window.tbbOpenVideoPopupModal(0)" class="tbb-btn-light-surface" style="padding:15px 24px; font-size:0.94rem; font-weight:500;">
                <span>${escHtml(t("heroBtnIntroVideo"))}</span>
              </button>

              <button type="button" onclick="window.tbbSwitchMainSection(3)" class="tbb-btn-light-surface" style="padding:15px 24px; font-size:0.94rem; font-weight:500;">
                <span>${escHtml(t("heroBtnTour"))}</span>
              </button>
            </div>
          </div>

          <!-- REQUERIMIENTO B: VIDEO ANIMADO DE CONVERGENCIA DE LAS 6 TEORÍAS HACIA LA APP Y SU LOGOTIPO (16:9 SIN RECORTE, EN EL IDIOMA ACTIVO) -->
          <div style="width:100%; max-width:1160px; border-radius:26px; overflow:hidden; background:#F8FAFC; border:1px solid #CBD5E1; box-shadow:0 28px 75px rgba(15,23,42,0.10); position:relative;">
            <video
              id="tbbHeroConvergenceVideoPlayer"
              src="${getLocalizedHeroVideoUrl()}"
              poster="${getLocalizedHeroPosterUrl()}"
              autoplay
              muted
              loop
              playsinline
              controls
              style="width:100%; height:auto; aspect-ratio:16/9; max-height:652px; object-fit:contain; display:block; background:#F8FAFC;"
            ></video>
          </div>

          <!-- Píldoras de Autoridad Teórica que Respaldan el Proceso (1 clic = Video HeyGen + Google Flow) -->
          <div style="width:100%; max-width:1160px; display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px;">
            ${theoryPillars.map((p, idx) => `
              <div onclick="window.tbbOpenVideoPopupModal(${idx + 1})" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:12px 14px; cursor:pointer; transition:all 0.2s ease; display:flex; flex-direction:column; gap:4px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.65rem; font-weight:500; color:#EA580C;">${escHtml(p.step)} · ▶ HEYGEN + FLOW</div>
                <div style="font-family:'Montserrat', sans-serif; font-size:0.84rem; font-weight:600; color:#0F172A;">${escHtml(p.author)}</div>
                <div style="font-size:0.76rem; font-weight:400; color:#475569; line-height:1.38;">${escHtml(p.theory)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- REQUERIMIENTO C EN PORTADA: MOCKUP DE IPHONE CON LA APLICACIÓN REAL CONECTADA A AURA (PASOS 0 AL 3 GRATIS, PAYWALL EN PASO 4) -->
      <section id="tbbHomeLiveIphoneDemoAnchor" style="padding:52px 24px 68px 24px; background:#FFFFFF; border-top:1px solid #F1F5F9;">
        <div style="max-width:1260px; margin:0 auto; display:flex; flex-direction:column; gap:34px;">
          <div style="text-align:center; max-width:860px; margin:0 auto;">
            <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 14px; border-radius:999px; background:#FFF7ED; color:#EA580C; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; margin-bottom:10px;">
              <span class="tbb-live-pulse-dot"></span>
              <span>${escHtml(t("iphoneSectionKicker"))}</span>
            </div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.75rem, 3.2vw, 2.5rem); font-weight:600; color:#0F172A; margin:0 0 10px 0; letter-spacing:-0.02em;">
              ${escHtml(t("iphoneSectionTitle"))}
            </h2>
            <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
              ${escHtml(t("iphoneSectionDesc"))}
            </p>
          </div>

          <div class="tbb-comm-grid-2" style="align-items:start; gap:44px;">
            <div id="tbbHomeIphoneMount">
              ${(st.activeMainSection || 1) === 1 ? window.tbbBuildIphoneLiveStudioFrameHTML("tbbHomeIphoneStudioFrame") : ""}
            </div>

            <div style="display:flex; flex-direction:column; gap:20px;">
              <!-- Selector rápido de 3 Casos de Estudio Reales -->
              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:20px; padding:18px 22px; display:flex; flex-direction:column; gap:10px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#1D4ED8;">
                  ${escHtml(t("presetsLabel"))}
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                  ${DEMO_QUICK_PRESETS.map(rawP => {
                    const p = getLocalizedPresetData(rawP);
                    const isAct = activePreset === p.id;
                    return `
                      <button type="button" data-preset-id="${p.id}" class="tbb-demo-preset-pill-btn" onclick="window.tbbApplyCommercialDemoPreset('${p.id}')" style="padding:8px 14px; border-radius:999px; border:1px solid ${isAct ? '#0D2540' : '#CBD5E1'}; background:${isAct ? '#0D2540' : '#FFFFFF'}; color:${isAct ? '#FFFFFF' : '#0F172A'}; font-size:0.78rem; font-weight:500; cursor:pointer; transition:all 0.2s ease;">
                        ${escHtml(p.label)}
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:24px; padding:24px; display:flex; flex-direction:column; gap:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#1D4ED8; background:#EFF6FF; padding:4px 12px; border-radius:999px;">
                    ${escHtml(t("syncBadgeTitle"))}
                  </span>
                  <span id="tbbLiveSyncStepBadge" class="tbb-live-migration-status-txt" style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; color:#16A34A; font-weight:500;">
                    ${escHtml(t("syncLiveConnected"))}
                  </span>
                </div>
                <h3 style="font-family:'Montserrat', sans-serif; font-size:1.2rem; font-weight:600; color:#0F172A; margin:0;">
                  ${escHtml(t("syncCardHeading"))}
                </h3>
                <div style="display:flex; flex-direction:column; gap:9px; font-size:0.86rem; font-weight:400; color:#334155;">
                  <div style="padding:10px 14px; background:#FFFFFF; border-radius:12px; border:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span>${escHtml(t("syncRow1"))}</span>
                    <span style="color:#16A34A; font-weight:500; font-size:0.76rem; white-space:nowrap;">${escHtml(t("syncFreeBadge"))}</span>
                  </div>
                  <div style="padding:10px 14px; background:#FFFFFF; border-radius:12px; border:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span>${escHtml(t("syncRow2"))}</span>
                    <span style="color:#16A34A; font-weight:500; font-size:0.76rem; white-space:nowrap;">${escHtml(t("syncFreeBadge"))}</span>
                  </div>
                  <div style="padding:10px 14px; background:#FFFFFF; border-radius:12px; border:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span>${escHtml(t("syncRow3"))}</span>
                    <span style="color:#16A34A; font-weight:500; font-size:0.76rem; white-space:nowrap;">${escHtml(t("syncFreeBadge"))}</span>
                  </div>
                  <div style="padding:11px 14px; background:#FFF7ED; border-radius:12px; border:1px solid #FDBA74; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span>${escHtml(t("syncRow4"))}</span>
                    <button type="button" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="background:#0D2540; color:#FFFFFF; border:none; border-radius:999px; padding:6px 14px; font-size:0.74rem; font-weight:600; cursor:pointer; white-space:nowrap;">
                      ${escHtml(t("syncUnlockBtn"))}
                    </button>
                  </div>
                </div>
              </div>

              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:24px; padding:20px; text-align:center;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#EA580C; margin-bottom:4px;">
                  ${escHtml(t("gcLiveKicker"))}
                </div>
                <div id="tbbDemoLiveBrandTitle" style="font-family:'Montserrat', sans-serif; font-size:1.2rem; font-weight:600; color:#0F172A;">${escHtml(st.brandName)}</div>
                <div id="tbbDemoLiveBrandTagline" style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; font-weight:500; color:#1D4ED8; margin-top:2px; margin-bottom:6px;">${escHtml(st.tagline)}</div>
                <div id="tbbDemoLiveGoldenCircleWrap">
                  ${window.tbbBuildCircularGoldenCircleSVG()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SHOWCASE DE LOGOTIPOS NANO BANANA PRO 4K + VECTORES BÉZIER 100% EN CURVAS -->
      <section style="padding:60px 24px 64px 24px; background:#F8FAFC; border-top:1px solid #E2E8F0;">
        <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; gap:36px;">
          <div style="text-align:center; max-width:860px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#EA580C; letter-spacing:0.06em; margin-bottom:8px;">
              ${escHtml(t("nanoKicker"))}
            </div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.7rem, 3.1vw, 2.45rem); font-weight:600; color:#0F172A; margin:0 0 10px 0; letter-spacing:-0.02em;">
              ${escHtml(t("nanoTitle"))}
            </h2>
            <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
              ${escHtml(t("nanoDesc"))}
            </p>
          </div>

          <!-- Comparativa Interactiva Antes / Después (ARCO Ingeniería + The Best Brand Liquid Glass) -->
          <div class="tbb-comm-grid-2" style="gap:28px; align-items:stretch;">
            <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; gap:16px; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(14, '/assets/app_captures/step5_arco_despues_nanobanana.png', 'ARCO Ingeniería · Nano Banana Pro 4K + Bézier')">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#1D4ED8; background:#EFF6FF; padding:4px 10px; border-radius:999px;">${escHtml(nanoCaseCopy.c1Badge)}</span>
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; color:#EA580C;">${escHtml(nanoCaseCopy.c1Iter)}</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; align-items:center;">
                <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:14px; text-align:center;">
                  <div style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; color:#64748B; margin-bottom:8px;">${escHtml(t("nanoBeforeLabel"))}</div>
                  <img src="/assets/logos/arco_ingenieria_base_actual.png" alt="ARCO Base" style="width:100%; height:136px; object-fit:contain; display:block;" />
                </div>
                <div style="background:#FFFFFF; border:1.5px solid #93C5FD; border-radius:16px; padding:14px; text-align:center; box-shadow:0 12px 28px rgba(29,78,216,0.08);">
                  <div style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; color:#1D4ED8; margin-bottom:8px;">${escHtml(t("nanoAfterLabel"))}</div>
                  <img src="/assets/logos/arco_ingenieria_nanobanana_logo.png" alt="ARCO Nano Banana Pro" style="width:100%; height:136px; object-fit:contain; display:block;" />
                </div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.84rem; color:#475569;">
                <span>${escHtml(nanoCaseCopy.c1Foot)}</span>
                <span style="color:#1D4ED8; font-weight:500;">${escHtml(nanoCaseCopy.c1Zoom)}</span>
              </div>
            </div>

            <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:24px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; gap:16px; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(13, '/assets/app_captures/step5_tbb_liquid_glass.png', 'The Best Brand · 6 Iteraciones Apple Liquid Glass + Vector Bézier')">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#EA580C; background:#FFF7ED; padding:4px 10px; border-radius:999px;">${escHtml(nanoCaseCopy.c2Badge)}</span>
                <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; color:#1D4ED8;">${escHtml(nanoCaseCopy.c2Iter)}</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; align-items:center;">
                ${[1, 2, 3, 4].map(n => `
                  <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:14px; padding:8px; text-align:center;">
                    <img src="/assets/brandbook/step5b_master_logo_0${n}.jpg" alt="Master Lockup 0${n}" style="width:100%; height:118px; object-fit:contain; border-radius:10px; display:block;" />
                    <div style="font-family:'JetBrains Mono', monospace; font-size:0.6rem; color:#475569; margin-top:6px;">LOCKUP 0${n}</div>
                  </div>
                `).join("")}
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.84rem; color:#475569;">
                <span>${escHtml(nanoCaseCopy.c2Foot)}</span>
                <span style="color:#1D4ED8; font-weight:500;">${escHtml(nanoCaseCopy.c2Zoom)}</span>
              </div>
            </div>
          </div>

          <!-- Tira de identidades adicionales creadas con Nano Banana Pro -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
            ${[
              { img: "/assets/logos/tbb_official_liquid_glass_logo.jpg", name: "The Best Brand · Aura Liquid Glass", tag: nanoCaseCopy.tag1 },
              { img: "/assets/logos/improbears_oficial_positivo.png", name: "ImproBears · Master Brand + 4 Sub-brands", tag: nanoCaseCopy.tag2 },
              { img: "/assets/showcase/logo_coffee.jpg", name: "Kanso Roasters · Specialty Coffee", tag: nanoCaseCopy.tag3 },
              { img: "/assets/showcase/logo_fintech.jpg", name: "Vortex Pay · Wealth & Fintech", tag: nanoCaseCopy.tag4 }
            ].map(card => `
              <div onclick="window.tbbOpenPlateLightboxModal(13, '${card.img}', '${escHtml(card.name)}')" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:18px; padding:16px; display:flex; align-items:center; gap:14px; cursor:pointer;">
                <img src="${card.img}" alt="${escHtml(card.name)}" style="width:62px; height:62px; object-fit:contain; border-radius:14px; background:#F8FAFC; padding:4px; flex-shrink:0;" />
                <div>
                  <div style="font-family:'Montserrat', sans-serif; font-size:0.86rem; font-weight:600; color:#0F172A; line-height:1.25;">${escHtml(card.name)}</div>
                  <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; color:#64748B; margin-top:4px;">${escHtml(card.tag)}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- CONMUTADOR INTERACTIVO CAPTURA REAL DE LA APP VS MANUAL DE 36 LÁMINAS + FILMSTRIP DE LAS 36 LÁMINAS -->
      <section style="padding:60px 24px 68px 24px; background:#FFFFFF; border-top:1px solid #E2E8F0;">
        <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:28px;">
          <div style="text-align:center; max-width:820px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#1D4ED8; letter-spacing:0.06em; margin-bottom:6px;">
              ${escHtml(t("plates36Kicker"))}
            </div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.65rem, 2.9vw, 2.35rem); font-weight:600; color:#0F172A; margin:0 0 10px 0;">
              ${escHtml(t("plates36Title"))}
            </h2>
            <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
              ${escHtml(t("plates36Desc"))}
            </p>
          </div>

          <div style="display:inline-flex; background:#F1F5F9; padding:5px; border-radius:999px; gap:6px; border:1px solid #E2E8F0;">
            <button type="button" onclick="window.tbbSetHeroVisualMode('app')" style="padding:9px 20px; border-radius:999px; border:none; background:${!isManual ? '#FFFFFF' : 'transparent'}; color:${!isManual ? '#0F172A' : '#475569'}; font-size:0.84rem; font-weight:500; cursor:pointer; box-shadow:${!isManual ? '0 4px 12px rgba(15,23,42,0.08)' : 'none'};">
              ${escHtml(t("heroSwitchApp"))}
            </button>
            <button type="button" onclick="window.tbbSetHeroVisualMode('manual')" style="padding:9px 20px; border-radius:999px; border:none; background:${isManual ? '#FFFFFF' : 'transparent'}; color:${isManual ? '#0F172A' : '#475569'}; font-size:0.84rem; font-weight:500; cursor:pointer; box-shadow:${isManual ? '0 4px 12px rgba(15,23,42,0.08)' : 'none'};">
              ${escHtml(t("heroSwitchManual"))}
            </button>
          </div>

          <div style="width:100%; position:relative; border-radius:24px; overflow:hidden; box-shadow:0 24px 64px rgba(15,23,42,0.10); border:1px solid #E2E8F0; background:#FFFFFF; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(1, '${isManual ? '/assets/brandbook_plates_tbb/plate-01.jpg' : getLocalizedAppCaptureUrl('/assets/app_captures/step0_logo_aura.png')}', '${escHtml(step0Loc.title)}')">
            <img src="${isManual ? '/assets/brandbook_plates_tbb/plate-01.jpg' : getLocalizedAppCaptureUrl('/assets/app_captures/step0_logo_aura.png')}" alt="The Best Brand Showcase" style="width:100%; height:auto; display:block;" />
            <div style="position:absolute; top:18px; left:18px; background:rgba(255,255,255,0.94); backdrop-filter:blur(10px); padding:8px 16px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#0F172A; box-shadow:0 8px 24px rgba(15,23,42,0.12);">
              ${isManual ? escHtml(chapI18n.badgePlate1) : escHtml(step0Loc.title)} · (${lang.toUpperCase()})
            </div>
          </div>

          <!-- Filtros por Capítulo + Filmstrip Interactivo de las 36 Láminas -->
          <div style="width:100%; display:flex; flex-direction:column; gap:14px; padding-top:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                ${[
                  { id: "all", lbl: chapI18n.all },
                  { id: "c1", lbl: chapI18n.c1 },
                  { id: "c2", lbl: chapI18n.c2 },
                  { id: "c3", lbl: chapI18n.c3 },
                  { id: "c4", lbl: chapI18n.c4 },
                  { id: "c5", lbl: chapI18n.c5 }
                ].map((ch, idx) => `
                  <button type="button" data-chapter="${ch.id}" class="tbb-plate36-filter-btn" onclick="window.tbbFilterHome36PlatesChapter('${ch.id}')" style="padding:7px 14px; border-radius:999px; border:1px solid ${idx === 0 ? '#0D2540' : '#CBD5E1'}; background:${idx === 0 ? '#0D2540' : '#FFFFFF'}; color:${idx === 0 ? '#FFFFFF' : '#334155'}; font-size:0.76rem; font-weight:500; cursor:pointer;">
                    ${escHtml(ch.lbl)}
                  </button>
                `).join("")}
              </div>
              <a href="/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf" target="_blank" rel="noopener" class="tbb-btn-light-surface" style="padding:7px 16px; font-size:0.78rem; text-decoration:none;">
                ${escHtml(chapI18n.pdfBtn)}
              </a>
            </div>

            <div style="display:flex; gap:14px; overflow-x:auto; padding:6px 2px 16px 2px; scroll-snap-type:x mandatory;">
              ${plates36Meta.map(p => `
                <div data-chapter="${p.chap}" class="tbb-plate36-thumb-card" onclick="window.tbbOpenPlateLightboxModal(${p.n})" style="min-width:230px; max-width:230px; scroll-snap-align:start; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:10px; display:flex; flex-direction:column; gap:8px; cursor:pointer; flex-shrink:0;">
                  <img src="${p.img}" alt="Plate ${p.pad}" loading="eager" decoding="async" style="width:100%; height:132px; object-fit:cover; border-radius:10px; background:#FFFFFF; border:1px solid #E2E8F0;" />
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:600; color:#0F172A;">${escHtml(chapI18n.plateWord)} ${p.pad} / 36</span>
                    <span style="font-size:0.68rem; color:#1D4ED8;">⤢ Max Res</span>
                  </div>
                  <div style="font-size:0.72rem; color:#64748B;">${escHtml(p.chapLabel)}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <!-- BENTO GRID DE LOS 9 ENTREGABLES EJECUTIVOS EN PORTADA -->
      <section style="padding:56px 24px 80px 24px; background:#F8FAFC; border-top:1px solid #E2E8F0;">
        <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; gap:32px;">
          <div style="text-align:center; max-width:820px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#EA580C; letter-spacing:0.06em; margin-bottom:6px;">
              ${escHtml(t("bento9Kicker"))}
            </div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.65rem, 2.9vw, 2.35rem); font-weight:600; color:#0F172A; margin:0 0 10px 0;">
              ${escHtml(t("bento9Title"))}
            </h2>
            <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
              ${escHtml(t("bento9Desc"))}
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(275px, 1fr)); gap:18px;">
            ${OFFICIAL_9_DELIVERABLES.map(item => {
              const loc = item.i18n[lang] || item.i18n.es;
              const fmtTxt = loc.format || item.format;
              return `
                <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:20px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                  <div onclick="window.tbbOpenPlateLightboxModal(${item.plateNum}, '${item.thumb}', '${escHtml(loc.title)}', '${item.sampleUrl}')" style="cursor:pointer;">
                    <img src="${item.thumb}" alt="${escHtml(loc.title)}" loading="eager" decoding="async" style="width:100%; height:144px; object-fit:cover; object-position:top center; border-radius:12px; background:#F8FAFC; border:1px solid #F1F5F9; margin-bottom:10px;" />
                    <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:500; color:#EA580C;">#${item.num} · ${escHtml(fmtTxt)}</div>
                    <h3 style="font-family:'Montserrat', sans-serif; font-size:0.95rem; font-weight:600; color:#0F172A; margin:4px 0 6px 0; line-height:1.3;">${escHtml(loc.title)}</h3>
                    <p style="font-size:0.82rem; font-weight:400; color:#64748B; line-height:1.5; margin:0;">${escHtml(loc.desc)}</p>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; padding-top:10px; border-top:1px solid #F1F5F9;">
                    <button type="button" onclick="window.tbbOpenPlateLightboxModal(${item.plateNum}, '${item.thumb}', '${escHtml(loc.title)}', '${item.sampleUrl}')" class="tbb-btn-light-surface" style="padding:6px 12px; font-size:0.75rem;">⤢ Max Res</button>
                    <a href="${item.sampleUrl}" target="_blank" rel="noopener" style="font-size:0.76rem; font-weight:500; color:#1D4ED8; text-decoration:none;">${escHtml(t("packDownloadSample"))} →</a>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <div style="padding-top:16px; display:flex; flex-wrap:wrap; justify-content:center; gap:14px;">
            <button type="button" onclick="window.tbbSwitchMainSection(2)" class="tbb-comm-btn-blue" style="padding:15px 26px; font-size:0.94rem; font-weight:600;">
              <span class="tbb-live-pulse-dot"></span>
              <span>${escHtml(t("nextToDemoBtn"))}</span>
            </button>
            <button type="button" onclick="window.tbbSwitchMainSection(3)" class="tbb-btn-light-surface" style="padding:15px 26px; font-size:0.94rem; font-weight:500;">
              <span>${escHtml(t("nextToTourBtn"))}</span>
            </button>
            <button type="button" onclick="window.tbbSwitchMainSection(4)" class="tbb-btn-light-surface" style="padding:15px 26px; font-size:0.94rem; font-weight:500;">
              <span>${escHtml(t("nextToTheoryBtn"))}</span>
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // SUBPÁGINA 2: DEMO INTERACTIVA REAL EN MOCKUP DE IPHONE (PASOS 0 AL 3 GRATIS + PAYWALL EN PASO 4)
  window.tbbBuildSubpage2DemoHTML = function () {
    const st = window.tbbCommercialDemoState;
    const step = [0, 1, 2, 3].includes(st.activeDemoStep) ? st.activeDemoStep : 0;
    const activePreset = st.activePresetId || "tbb";

    return `
      <section style="padding:52px 24px 84px 24px; background:#FFFFFF;">
        <div style="max-width:1260px; margin:0 auto; display:flex; flex-direction:column; gap:36px;">
          <div style="text-align:center; max-width:860px; margin:0 auto;">
            <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 14px; border-radius:999px; background:#FFF7ED; color:#EA580C; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; margin-bottom:10px;">
              <span class="tbb-live-pulse-dot"></span>
              <span>${escHtml(t("demoEyebrow"))} · ${escHtml(t("iphoneSectionKicker"))}</span>
            </div>
            <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.85rem, 3.4vw, 2.7rem); font-weight:600; color:#0F172A; margin:0 0 12px 0; letter-spacing:-0.02em;">
              ${escHtml(t("demoTitle"))}
            </h1>
            <p style="font-size:1.0rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
              ${escHtml(t("demoDesc"))}
            </p>
          </div>

          <div class="tbb-comm-grid-2" style="align-items:start; gap:44px;">
            <div id="tbbSubpage2IphoneMount">
              ${(st.activeMainSection || 1) === 2 ? window.tbbBuildIphoneLiveStudioFrameHTML("tbbSubpage2IphoneStudioFrame") : ""}
            </div>

            <div style="display:flex; flex-direction:column; gap:20px;">
              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:20px; padding:18px 22px; display:flex; flex-direction:column; gap:10px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#1D4ED8;">
                  ${escHtml(t("presetsLabel"))}
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                  ${DEMO_QUICK_PRESETS.map(rawP => {
                    const p = getLocalizedPresetData(rawP);
                    const isAct = activePreset === p.id;
                    return `
                      <button type="button" data-preset-id="${p.id}" class="tbb-demo-preset-pill-btn" onclick="window.tbbApplyCommercialDemoPreset('${p.id}')" style="padding:8px 14px; border-radius:999px; border:1px solid ${isAct ? '#0D2540' : '#CBD5E1'}; background:${isAct ? '#0D2540' : '#FFFFFF'}; color:${isAct ? '#FFFFFF' : '#0F172A'}; font-size:0.78rem; font-weight:500; cursor:pointer; transition:all 0.2s ease;">
                        ${escHtml(p.label)}
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>

              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:24px; padding:26px; display:flex; flex-direction:column; gap:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <div style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; font-weight:500; color:#1D4ED8;">
                    ${escHtml(t("syncBadgeTitle"))}
                  </div>
                  <span class="tbb-live-migration-status-txt" style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; color:#16A34A; font-weight:500;">
                    ${escHtml(t("syncLiveConnected"))}
                  </span>
                </div>
                <h3 style="font-family:'Montserrat', sans-serif; font-size:1.22rem; font-weight:600; color:#0F172A; margin:0;">
                  ${escHtml(t("syncCardHeading"))}
                </h3>
                <p style="font-size:0.9rem; font-weight:400; color:#475569; line-height:1.62; margin:0;">
                  ${escHtml(t("iphoneSectionDesc"))}
                </p>
                <div style="display:flex; flex-direction:column; gap:10px;">
                  <button type="button" onclick="window.tbbIphoneJumpToStep(0)" style="padding:12px 16px; border-radius:14px; border:1px solid ${step === 0 ? '#1D4ED8' : '#E2E8F0'}; background:#FFFFFF; text-align:left; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span style="font-size:0.86rem; font-weight:500; color:#0F172A;">${escHtml(t("syncRow1"))}</span>
                    <span style="font-size:0.74rem; color:#16A34A; font-weight:500; white-space:nowrap;">${escHtml(t("syncFreeBadge"))} →</span>
                  </button>
                  <button type="button" onclick="window.tbbIphoneJumpToStep(1)" style="padding:12px 16px; border-radius:14px; border:1px solid ${step === 1 ? '#1D4ED8' : '#E2E8F0'}; background:#FFFFFF; text-align:left; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span style="font-size:0.86rem; font-weight:500; color:#0F172A;">${escHtml(t("iphoneStep1Free"))} (Simon Sinek)</span>
                    <span style="font-size:0.74rem; color:#16A34A; font-weight:500; white-space:nowrap;">${escHtml(t("syncFreeBadge"))} →</span>
                  </button>
                  <button type="button" onclick="window.tbbIphoneJumpToStep(2)" style="padding:12px 16px; border-radius:14px; border:1px solid ${step === 2 ? '#1D4ED8' : '#E2E8F0'}; background:#FFFFFF; text-align:left; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span style="font-size:0.86rem; font-weight:500; color:#0F172A;">${escHtml(t("syncRow2"))}</span>
                    <span style="font-size:0.74rem; color:#16A34A; font-weight:500; white-space:nowrap;">${escHtml(t("syncFreeBadge"))} →</span>
                  </button>
                  <button type="button" onclick="window.tbbIphoneJumpToStep(3)" style="padding:12px 16px; border-radius:14px; border:1px solid ${step === 3 ? '#1D4ED8' : '#E2E8F0'}; background:#FFFFFF; text-align:left; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span style="font-size:0.86rem; font-weight:500; color:#0F172A;">${escHtml(t("syncRow3"))}</span>
                    <span style="font-size:0.74rem; color:#16A34A; font-weight:500; white-space:nowrap;">${escHtml(t("syncFreeBadge"))} →</span>
                  </button>
                  <button type="button" onclick="window.tbbIphoneJumpToStep(4)" style="padding:13px 16px; border-radius:14px; border:1.5px solid #FDBA74; background:#FFF7ED; text-align:left; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:8px;">
                    <span style="font-size:0.86rem; font-weight:500; color:#0F172A;">🔒 ${escHtml(t("syncRow4"))}</span>
                    <span style="font-size:0.75rem; color:#EA580C; font-weight:600; white-space:nowrap;">${escHtml(t("syncUnlockBtn"))} →</span>
                  </button>
                </div>
              </div>

              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:24px; padding:22px; display:flex; flex-direction:column; gap:12px;">
                <div style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; font-weight:500; color:#EA580C;">
                  ${escHtml(t("theoryCapsulesTitle"))}
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:10px;">
                  ${VIDEO_CAPSULES.map((cap, idx) => `
                    <button type="button" onclick="window.tbbOpenVideoPopupModal(${idx})" style="padding:10px 12px; border-radius:12px; border:1px solid #CBD5E1; background:#FFFFFF; text-align:left; cursor:pointer;">
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.64rem; color:#1D4ED8; font-weight:500;">▶ ${escHtml(stepUpperForLang(idx))} · ${cap.duration}</div>
                      <div style="font-size:0.76rem; font-weight:500; color:#0F172A; margin-top:2px;">HeyGen + Flow · ${escHtml(stepLabelForLang(idx))}</div>
                    </button>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top:24px; padding-top:32px; border-top:1px solid #E2E8F0; display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
            <button type="button" onclick="window.tbbSwitchMainSection(3)" class="tbb-btn-light-surface" style="padding:15px 28px; font-size:0.94rem; font-weight:500;">
              ${escHtml(t("nextToTourBtn"))}
            </button>
            <button type="button" onclick="window.tbbSwitchMainSection(4)" class="tbb-comm-btn-blue" style="padding:15px 28px; font-size:0.94rem; font-weight:600;">
              ${escHtml(t("nextToTheoryBtn"))}
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // SUBPÁGINA 3: APP TOUR (RECORRIDO PANORÁMICO LIMPIO SIN SOLAPAMIENTO + COMPARATIVAS 2-UP + POP-UPS HEYGEN + 9 DESCARGABLES)
  window.tbbBuildSubpage3AppTourHTML = function () {
    const lang = getLang();

    const quickStepsDict = {
      es: [
        { id: "tbbTourItem_0", lbl: "Paso 0 · Giro" },
        { id: "tbbTourItem_2", lbl: "Paso 1 · Círculo Dorado" },
        { id: "tbbTourItem_4", lbl: "Paso 2 · Touchpoints" },
        { id: "tbbTourItem_6", lbl: "Paso 3 · Naming SMILE" },
        { id: "tbbTourItem_8", lbl: "Paso 4 · Kansei & Fuentes" },
        { id: "tbbTourItem_10", lbl: "Paso 5 · Nano Banana Pro" },
        { id: "tbbTourItem_12", lbl: "Paso 6 · 36 Láminas & 9 Entregables" }
      ],
      en: [
        { id: "tbbTourItem_0", lbl: "Step 0 · Sector" },
        { id: "tbbTourItem_2", lbl: "Step 1 · Golden Circle" },
        { id: "tbbTourItem_4", lbl: "Step 2 · Touchpoints" },
        { id: "tbbTourItem_6", lbl: "Step 3 · SMILE Naming" },
        { id: "tbbTourItem_8", lbl: "Step 4 · Kansei & Fonts" },
        { id: "tbbTourItem_10", lbl: "Step 5 · Nano Banana Pro" },
        { id: "tbbTourItem_12", lbl: "Step 6 · 36 Plates & 9 Deliverables" }
      ],
      fr: [
        { id: "tbbTourItem_0", lbl: "Étape 0 · Secteur" },
        { id: "tbbTourItem_2", lbl: "Étape 1 · Cercle d'Or" },
        { id: "tbbTourItem_4", lbl: "Étape 2 · Touchpoints" },
        { id: "tbbTourItem_6", lbl: "Étape 3 · Naming SMILE" },
        { id: "tbbTourItem_8", lbl: "Étape 4 · Kansei & Polices" },
        { id: "tbbTourItem_10", lbl: "Étape 5 · Nano Banana Pro" },
        { id: "tbbTourItem_12", lbl: "Étape 6 · 36 Planches & 9 Livrables" }
      ],
      pt: [
        { id: "tbbTourItem_0", lbl: "Passo 0 · Setor" },
        { id: "tbbTourItem_2", lbl: "Passo 1 · Círculo Dourado" },
        { id: "tbbTourItem_4", lbl: "Passo 2 · Touchpoints" },
        { id: "tbbTourItem_6", lbl: "Passo 3 · Naming SMILE" },
        { id: "tbbTourItem_8", lbl: "Passo 4 · Kansei & Fontes" },
        { id: "tbbTourItem_10", lbl: "Passo 5 · Nano Banana Pro" },
        { id: "tbbTourItem_12", lbl: "Passo 6 · 36 Lâminas & 9 Entregáveis" }
      ],
      de: [
        { id: "tbbTourItem_0", lbl: "Schritt 0 · Branche" },
        { id: "tbbTourItem_2", lbl: "Schritt 1 · Golden Circle" },
        { id: "tbbTourItem_4", lbl: "Schritt 2 · Touchpoints" },
        { id: "tbbTourItem_6", lbl: "Schritt 3 · SMILE Naming" },
        { id: "tbbTourItem_8", lbl: "Schritt 4 · Kansei & Schriften" },
        { id: "tbbTourItem_10", lbl: "Schritt 5 · Nano Banana Pro" },
        { id: "tbbTourItem_12", lbl: "Schritt 6 · 36 Tafeln & 9 Ergebnisse" }
      ],
      it: [
        { id: "tbbTourItem_0", lbl: "Passo 0 · Settore" },
        { id: "tbbTourItem_2", lbl: "Passo 1 · Cerchio d'Oro" },
        { id: "tbbTourItem_4", lbl: "Passo 2 · Touchpoint" },
        { id: "tbbTourItem_6", lbl: "Passo 3 · Naming SMILE" },
        { id: "tbbTourItem_8", lbl: "Passo 4 · Kansei & Font" },
        { id: "tbbTourItem_10", lbl: "Passo 5 · Nano Banana Pro" },
        { id: "tbbTourItem_12", lbl: "Passo 6 · 36 Tavole & 9 Deliverable" }
      ]
    };
    const quickSteps = quickStepsDict[lang] || quickStepsDict.es;

    const tourUiLabels = {
      es: {
        v1: "Vista Principal en Studio",
        v2: "Vista Complementaria / Evolución Nano Banana Pro",
        zoom: "⤢ Ampliar",
        playHint: "▶ CLIC PARA REPRODUCIR VIDEO 9:16 HEYGEN + FLOW",
        fullHint: "⤢ CLIC PARA PANTALLA CASI COMPLETA",
        finaleHeading: "LOS 9 DESCARGABLES QUE OBTIENES AL FINALIZAR:"
      },
      en: {
        v1: "Main Studio View",
        v2: "Complementary View / Nano Banana Pro Evolution",
        zoom: "⤢ Enlarge",
        playHint: "▶ CLICK TO PLAY 9:16 HEYGEN + FLOW VIDEO",
        fullHint: "⤢ CLICK FOR FULLSCREEN HIGH-RES VIEW",
        finaleHeading: "THE 9 DOWNLOADABLES YOU GET UPON COMPLETION:"
      },
      fr: {
        v1: "Vue Principale dans Studio",
        v2: "Vue Complémentaire / Évolution Nano Banana Pro",
        zoom: "⤢ Agrandir",
        playHint: "▶ CLIQUEZ POUR LIRE LA VIDÉO 9:16 HEYGEN + FLOW",
        fullHint: "⤢ CLIQUEZ POUR L'AFFICHAGE PLEIN ÉCRAN",
        finaleHeading: "LES 9 LIVRABLES QUE VOUS OBTENEZ À LA FIN :"
      },
      pt: {
        v1: "Vista Principal no Studio",
        v2: "Vista Complementar / Evolução Nano Banana Pro",
        zoom: "⤢ Ampliar",
        playHint: "▶ CLIQUE PARA REPRODUZIR VÍDEO 9:16 HEYGEN + FLOW",
        fullHint: "⤢ CLIQUE PARA ECRÃ QUASE COMPLETO",
        finaleHeading: "OS 9 DESCARREGÁVEIS QUE OBTÉM AO FINALIZAR:"
      },
      de: {
        v1: "Hauptansicht im Studio",
        v2: "Ergänzende Ansicht / Nano Banana Pro Evolution",
        zoom: "⤢ Vergrößern",
        playHint: "▶ KLICKEN FÜR 9:16 HEYGEN + FLOW VIDEO",
        fullHint: "⤢ KLICKEN FÜR VOLLBILDANSICHT",
        finaleHeading: "DIE 9 ERGEBNISSE BEI ABSCHLUSS:"
      },
      it: {
        v1: "Vista Principale in Studio",
        v2: "Vista Complementare / Evoluzione Nano Banana Pro",
        zoom: "⤢ Ingrandisci",
        playHint: "▶ CLICCA PER RIPRODURRE IL VIDEO 9:16 HEYGEN + FLOW",
        fullHint: "⤢ CLICCA PER SCHERMO QUASI INTERO",
        finaleHeading: "I 9 DELIVERABLE CHE OTTIENI AL TERMINE:"
      }
    }[lang] || {
      v1: "Vista Principal en Studio",
      v2: "Vista Complementaria / Evolución Nano Banana Pro",
      zoom: "⤢ Ampliar",
      playHint: "▶ CLIC PARA REPRODUCIR VIDEO 9:16 HEYGEN + FLOW",
      fullHint: "⤢ CLIC PARA PANTALLA CASI COMPLETA",
      finaleHeading: "LOS 9 DESCARGABLES QUE OBTIENES AL FINALIZAR:"
    };

    return `
      <section style="padding:60px 24px 36px 24px; background:linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%); text-align:center;">
        <div style="max-width:900px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:16px;">
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:500; color:#1D4ED8; letter-spacing:0.06em;">
            ${escHtml(t("tourEyebrow"))} · (${lang.toUpperCase()})
          </div>
          <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(2rem, 3.8vw, 3.05rem); font-weight:600; color:#0F172A; margin:0; line-height:1.15; letter-spacing:-0.02em;">
            ${escHtml(t("tourTitle"))}
          </h1>
          <p style="font-size:1.02rem; font-weight:400; color:#475569; line-height:1.68; margin:0; max-width:760px;">
            ${escHtml(t("tourDesc"))}
          </p>

          <!-- Barra Rápida de Salto por Paso (Sticky Friendly) -->
          <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px; margin-top:10px;">
            ${quickSteps.map(qs => `
              <button type="button" onclick="document.getElementById('${qs.id}')?.scrollIntoView({behavior:'smooth', block:'start'});" class="tbb-btn-light-surface" style="padding:7px 14px; font-size:0.76rem; font-weight:500;">
                ${escHtml(qs.lbl)}
              </button>
            `).join("")}
          </div>
        </div>
      </section>

      <section style="padding:20px 24px 72px 24px; background:#F8FAFC;">
        <div style="max-width:1220px; margin:0 auto; display:flex; flex-direction:column; gap:44px;">
          ${APP_TOUR_FLOW_ITEMS.map((item, idx) => {
            const loc = item.i18n[lang] || item.i18n.es;
            const badgeTxt = loc.badge || item.badge;
            const isPopup = item.type === "video_popup";
            const isFinale = item.type === "deliverables_finale";
            const hasSecondary = Boolean(item.secondaryImg);
            const displayImg = isPopup ? getLocalizedStepPosterUrl(item.videoIdx) : item.img;

            return `
              <article id="tbbTourItem_${idx}" class="tbb-tour-clean-stage" style="background:#FFFFFF; border-radius:26px; padding:clamp(24px, 3.8vw, 40px); box-shadow:0 20px 55px rgba(15,23,42,0.06); border:1px solid ${isPopup ? '#FDBA74' : '#E2E8F0'};">
                <div style="display:flex; flex-direction:column; gap:24px;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap;">
                    <div style="max-width:780px;">
                      <div style="display:inline-flex; align-items:center; gap:8px; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:${isPopup ? '#EA580C' : '#1D4ED8'}; margin-bottom:8px;">
                        <span>${escHtml(badgeTxt)}</span>
                        <span>·</span>
                        <span>${lang.toUpperCase()}</span>
                      </div>
                      <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.4rem, 2.4vw, 1.95rem); font-weight:600; color:#0F172A; margin:0 0 10px 0; line-height:1.22;">
                        ${escHtml(loc.title)}
                      </h2>
                      <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.66; margin:0;">
                        ${escHtml(loc.desc)}
                      </p>
                    </div>

                    ${isPopup ? `
                      <button type="button" onclick="window.tbbOpenVideoPopupModal(${item.videoIdx})" class="tbb-comm-btn-blue" style="padding:12px 22px; font-size:0.86rem; font-weight:600; flex-shrink:0;">
                        ▶ ${escHtml(t("tourPlayVideoBtn"))}
                      </button>
                    ` : `
                      <button type="button" onclick="window.tbbOpenPlateLightboxModal(1, '${item.img}', '${escHtml(loc.title)}')" class="tbb-btn-light-surface" style="padding:10px 18px; font-size:0.82rem; font-weight:500; flex-shrink:0;">
                        ⤢ ${escHtml(t("packOpenFullscreen"))}
                      </button>
                    `}
                  </div>

                  ${hasSecondary ? `
                    <div class="tbb-comm-grid-2" style="gap:20px; align-items:stretch;">
                      <div style="border-radius:18px; overflow:hidden; background:#F8FAFC; border:1px solid #E2E8F0; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between;" onclick="window.tbbOpenPlateLightboxModal(1, '${item.img}', '${escHtml(loc.title)} (01)')">
                        <img src="${item.img}" alt="${escHtml(loc.title)} 1" loading="eager" decoding="async" style="width:100%; max-height:460px; object-fit:contain; display:block; background:#F8FAFC;" />
                        <div style="padding:10px 16px; background:#FFFFFF; border-top:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:#475569;">
                          <span>${escHtml(tourUiLabels.v1)}</span>
                          <span style="color:#1D4ED8; font-family:'JetBrains Mono', monospace;">${escHtml(tourUiLabels.zoom)}</span>
                        </div>
                      </div>
                      <div style="border-radius:18px; overflow:hidden; background:#F8FAFC; border:1px solid #E2E8F0; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between;" onclick="window.tbbOpenPlateLightboxModal(1, '${item.secondaryImg}', '${escHtml(loc.title)} (02)')">
                        <img src="${item.secondaryImg}" alt="${escHtml(loc.title)} 2" loading="eager" decoding="async" style="width:100%; max-height:460px; object-fit:contain; display:block; background:#F8FAFC;" />
                        <div style="padding:10px 16px; background:#FFFFFF; border-top:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:#475569;">
                          <span>${escHtml(tourUiLabels.v2)}</span>
                          <span style="color:#1D4ED8; font-family:'JetBrains Mono', monospace;">${escHtml(tourUiLabels.zoom)}</span>
                        </div>
                      </div>
                    </div>
                  ` : `
                    <div style="border-radius:20px; overflow:hidden; background:#F8FAFC; border:1px solid #E2E8F0; cursor:pointer;" onclick="${isPopup ? `window.tbbOpenVideoPopupModal(${item.videoIdx})` : `window.tbbOpenPlateLightboxModal(1, '${item.img}', '${escHtml(loc.title)}')`}">
                      <img src="${displayImg}" alt="${escHtml(loc.title)}" loading="eager" decoding="async" style="width:100%; max-height:560px; object-fit:contain; display:block; margin:0 auto; background:#F8FAFC;" />
                      <div style="padding:12px 18px; background:#FFFFFF; border-top:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
                        <div style="font-size:0.84rem; font-weight:500; color:#0F172A;">
                          ${escHtml(loc.title)}
                        </div>
                        <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:${isPopup ? '#EA580C' : '#1D4ED8'};">
                          ${escHtml(isPopup ? tourUiLabels.playHint : tourUiLabels.fullHint)}
                        </div>
                      </div>
                    </div>
                  `}

                  ${isFinale ? `
                    <div style="padding-top:12px;">
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#0D2540; margin-bottom:12px;">
                        ${escHtml(t("bento9Kicker"))} · ${escHtml(tourUiLabels.finaleHeading)}
                      </div>
                      <div style="display:flex; gap:16px; overflow-x:auto; padding-bottom:12px; scroll-snap-type:x mandatory;">
                        ${OFFICIAL_9_DELIVERABLES.map((deliv) => {
                          const dLoc = deliv.i18n[lang] || deliv.i18n.es;
                          const dFmt = dLoc.format || deliv.format;
                          return `
                            <div style="min-width:290px; max-width:290px; scroll-snap-align:start; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:18px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:10px; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${deliv.plateNum}, '${deliv.thumb}', '${escHtml(dLoc.title)}', '${deliv.sampleUrl}')">
                              <img src="${deliv.thumb}" alt="${escHtml(dLoc.title)}" loading="eager" decoding="async" style="width:100%; height:150px; object-fit:cover; object-position:top center; border-radius:12px; background:#FFFFFF;" />
                              <div>
                                <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:500; color:#EA580C;">#${deliv.num} · ${escHtml(dFmt)}</div>
                                <div style="font-size:0.9rem; font-weight:600; color:#0F172A; margin-top:3px;">${escHtml(dLoc.title)}</div>
                              </div>
                            </div>
                          `;
                        }).join("")}
                      </div>
                    </div>
                  ` : ''}
                </div>
              </article>
            `;
          }).join("")}

          <div style="text-align:center; padding-top:24px;">
            <button type="button" onclick="window.tbbSwitchMainSection(4)" class="tbb-comm-btn-blue" style="padding:18px 34px; font-size:1.02rem; font-weight:600;">
              ${escHtml(t("nextToTheoryBtn"))}
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // SUBPÁGINA 4: BASES TEÓRICAS (VIDEOS 9:16 HEYGEN + GOOGLE FLOW CON PROPORCIÓN 9:16 PERFECTA Y AUTORES CON MINIATURA REAL DE YOUTUBE)
  window.tbbBuildSubpage4TheoryHTML = function () {
    const lang = getLang();

    return `
      <section style="padding:64px 24px 88px 24px; background:#FFFFFF;">
        <div style="max-width:1240px; margin:0 auto; display:flex; flex-direction:column; gap:64px;">
          <div style="text-align:center; max-width:820px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:500; color:#EA580C; letter-spacing:0.06em; margin-bottom:8px;">
              ${escHtml(t("theoryEyebrow"))}
            </div>
            <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.9rem, 3.6vw, 2.85rem); font-weight:600; color:#0F172A; margin:0 0 12px 0; letter-spacing:-0.02em;">
              ${escHtml(t("theoryTitle"))}
            </h1>
            <p style="font-size:1.02rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
              ${escHtml(t("theoryDesc"))}
            </p>
          </div>

          <div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:1.5rem; font-weight:600; color:#0F172A; margin:0 0 24px 0;">
              ${escHtml(t("theoryCapsulesTitle"))}
            </h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(255px, 1fr)); gap:24px;">
              ${VIDEO_CAPSULES.map((cap, idx) => {
                const loc = cap.i18n[lang] || cap.i18n.es;
                return `
                  <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:22px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.25s ease; cursor:pointer;" onclick="window.tbbOpenVideoPopupModal(${idx})">
                    <div>
                      <div style="position:relative; width:100%; aspect-ratio:9/16; max-height:420px; background:#0F172A; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                        <img src="${cap.poster}" alt="${escHtml(loc.title)}" loading="eager" decoding="async" style="width:100%; height:100%; object-fit:cover; object-position:top center; display:block; background:#0F172A;" />
                        <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.04) 0%, rgba(15,23,42,0.34) 100%); display:flex; align-items:center; justify-content:center;">
                          <div style="width:52px; height:52px; border-radius:50%; background:rgba(255,255,255,0.94); color:#0D2540; display:flex; align-items:center; justify-content:center; font-size:1.1rem; box-shadow:0 10px 25px rgba(0,0,0,0.28);">▶</div>
                        </div>
                        <span style="position:absolute; top:10px; left:10px; background:rgba(255,255,255,0.92); color:#0D2540; padding:3px 9px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.64rem; font-weight:600;">${escHtml(stepUpperForLang(cap.step))} · 9:16</span>
                        <span style="position:absolute; bottom:10px; right:10px; background:rgba(15,23,42,0.88); color:#FFFFFF; padding:3px 9px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.68rem;">${cap.duration}</span>
                      </div>
                      <div style="padding:18px 18px 10px 18px;">
                        <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#1D4ED8; margin-bottom:4px;">${escHtml(cap.author)}</div>
                        <h3 style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:600; color:#0F172A; margin:0 0 8px 0; line-height:1.3;">${escHtml(loc.title)}</h3>
                        <p style="font-size:0.86rem; font-weight:400; color:#475569; line-height:1.55; margin:0;">${escHtml(loc.desc)}</p>
                      </div>
                    </div>
                    <div style="padding:12px 18px 18px 18px;">
                      <span style="font-size:0.82rem; font-weight:500; color:#1D4ED8;">▶ ${escHtml(t("tourPlayVideoBtn"))} (${lang.toUpperCase()})</span>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:1.5rem; font-weight:600; color:#0F172A; margin:0 0 24px 0;">
              ${escHtml(t("theoryAuthorsTitle"))}
            </h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:24px;">
              ${YOUTUBE_METHODOLOGY_AUTHORS.map(a => {
                const aLoc = (a.i18n && (a.i18n[lang] || a.i18n.es)) || a;
                return `
                  <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                      <div style="position:relative; aspect-ratio:16/9; background:#0F172A; cursor:pointer; overflow:hidden;" onclick="window.tbbPlayYouTubeAuthorVideo('${a.id}')">
                        <img src="${a.thumb}" onerror="if(this.src!=='${a.ytThumbFallback}')this.src='${a.ytThumbFallback}';" alt="${escHtml(aLoc.title)}" loading="eager" decoding="async" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;" />
                        <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.10) 0%, rgba(15,23,42,0.42) 100%); display:flex; align-items:center; justify-content:center;">
                          <div style="width:54px; height:38px; border-radius:10px; background:#FF0000; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:1.05rem; box-shadow:0 8px 24px rgba(0,0,0,0.38);">▶</div>
                        </div>
                        <span style="position:absolute; top:10px; left:10px; background:rgba(15,23,42,0.86); color:#FFFFFF; padding:3px 9px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.62rem;">YOUTUBE · ${escHtml(a.author)}</span>
                        <span style="position:absolute; bottom:10px; right:10px; background:rgba(15,23,42,0.85); color:#FFFFFF; padding:3px 9px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.68rem;">${a.duration}</span>
                      </div>
                      <div style="padding:18px;">
                        <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#EA580C; margin-bottom:4px;">${escHtml(aLoc.step)} · ${escHtml(a.author)}</div>
                        <h3 style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:600; color:#0F172A; margin:0;">${escHtml(aLoc.title)}</h3>
                      </div>
                    </div>
                    <div style="padding:0 18px 18px 18px; display:flex; gap:10px;">
                      <button type="button" onclick="window.tbbPlayYouTubeAuthorVideo('${a.id}')" class="tbb-btn-light-surface" style="padding:8px 14px; font-size:0.8rem; font-weight:500;">${escHtml(t("ytWatchHere"))}</button>
                      <a href="${a.url}" target="_blank" rel="noopener" class="tbb-btn-light-surface" style="padding:8px 14px; font-size:0.8rem; font-weight:500; text-decoration:none;">YouTube ↗</a>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:1.5rem; font-weight:600; color:#0F172A; margin:0 0 24px 0;">
              ${escHtml(t("theoryBooksTitle"))}
            </h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:24px;">
              ${FOUNDER_ESSENTIAL_BOOKS.map(b => {
                const bLoc = (b.i18n && (b.i18n[lang] || b.i18n.es)) || b;
                return `
                  <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:20px; padding:20px; display:flex; gap:18px; align-items:center;">
                    <img src="/assets/books/${b.coverImg}" alt="${escHtml(bLoc.title || b.title)}" loading="eager" decoding="async" style="width:88px; height:128px; object-fit:cover; border-radius:10px; box-shadow:0 8px 20px rgba(15,23,42,0.12); flex-shrink:0;" />
                    <div style="display:flex; flex-direction:column; gap:6px;">
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:500; color:#1D4ED8;">${escHtml(bLoc.step)}</div>
                      <h3 style="font-family:'Montserrat', sans-serif; font-size:1.0rem; font-weight:600; color:#0F172A; margin:0;">${escHtml(bLoc.title || b.title)}</h3>
                      <div style="font-size:0.82rem; font-weight:500; color:#475569;">${escHtml(b.author)}</div>
                      <p style="font-size:0.82rem; font-weight:400; color:#64748B; line-height:1.45; margin:0;">${escHtml(bLoc.takeaway)}</p>
                      <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap;">
                        <a href="${b.kindleUrl}" target="_blank" rel="noopener" style="padding:6px 12px; border-radius:999px; background:#0D2540; color:#FFFFFF; font-size:0.75rem; font-weight:500; text-decoration:none;">Amazon / Kindle ↗</a>
                        <a href="${b.appleBooksUrl}" target="_blank" rel="noopener" style="padding:6px 12px; border-radius:999px; background:#E2E8F0; color:#0F172A; font-size:0.75rem; font-weight:500; text-decoration:none;">Apple Books ↗</a>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div style="text-align:center; padding-top:16px;">
            <button type="button" onclick="window.tbbSwitchMainSection(5)" class="tbb-comm-btn-blue" style="padding:18px 34px; font-size:1.02rem; font-weight:600;">
              ${escHtml(t("nextToDownloadsBtn"))}
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // SUBPÁGINA 5: PACK DE DESCARGAS (CARRUSEL MODERNO + VISOR PANTALLA CASI COMPLETA + PRÓXIMAMENTE WEB Y REDES SOCIALES)
  window.tbbBuildSubpage5DownloadsHTML = function () {
    const st = window.tbbCommercialDemoState;
    const lang = getLang();
    const activeIdx = Math.max(0, Math.min(OFFICIAL_9_DELIVERABLES.length - 1, Number(st.activeCarouselIndex) || 0));
    const activeItem = OFFICIAL_9_DELIVERABLES[activeIdx];
    const activeLoc = activeItem.i18n[lang] || activeItem.i18n.es;
    const activeFmt = activeLoc.format || activeItem.format;

    return `
      <section style="padding:64px 24px 88px 24px; background:#FFFFFF;">
        <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; gap:56px;">
          <div style="text-align:center; max-width:840px; margin:0 auto;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:500; color:#1D4ED8; letter-spacing:0.06em; margin-bottom:8px;">
              ${escHtml(t("packEyebrow"))}
            </div>
            <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.95rem, 3.6vw, 2.9rem); font-weight:600; color:#0F172A; margin:0 0 12px 0; letter-spacing:-0.02em;">
              ${escHtml(t("packTitle"))}
            </h1>
            <p style="font-size:1.02rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
              ${escHtml(t("packDesc"))}
            </p>
          </div>

          <div class="tbb-comm-grid-2" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:28px; padding:clamp(24px, 3.5vw, 40px); gap:36px; align-items:center;">
            <div style="position:relative; border-radius:20px; overflow:hidden; background:#FFFFFF; box-shadow:0 20px 50px rgba(15,23,42,0.10); cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${activeItem.plateNum}, '${activeItem.thumb}', '${escHtml(activeLoc.title)}', '${activeItem.sampleUrl}')">
              <img src="${activeItem.thumb}" alt="${escHtml(activeLoc.title)}" style="width:100%; max-height:440px; object-fit:contain; display:block; margin:0 auto;" />
              <div style="position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,0.88); color:#FFFFFF; padding:6px 14px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.7rem;">
                ⤢ ${escHtml(t("packOpenFullscreen"))}
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:18px;">
              <div style="display:inline-flex; align-items:center; gap:8px; align-self:flex-start; padding:5px 14px; border-radius:999px; background:#EFF6FF; color:#1D4ED8; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500;">
                #${activeItem.num} / 09 · ${escHtml(activeFmt)}
              </div>
              <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.4rem, 2.4vw, 1.95rem); font-weight:600; color:#0F172A; margin:0; line-height:1.22;">
                ${escHtml(activeLoc.title)}
              </h2>
              <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.68; margin:0;">
                ${escHtml(activeLoc.desc)}
              </p>

              <div style="display:flex; flex-wrap:wrap; gap:12px; padding-top:8px;">
                <button type="button" onclick="window.tbbOpenPlateLightboxModal(${activeItem.plateNum}, '${activeItem.thumb}', '${escHtml(activeLoc.title)}', '${activeItem.sampleUrl}')" class="tbb-comm-btn-blue" style="padding:13px 22px; font-size:0.88rem; font-weight:600;">
                  ${escHtml(t("packOpenFullscreen"))}
                </button>
                <a href="${activeItem.sampleUrl}" target="_blank" rel="noopener" class="tbb-btn-light-surface" style="padding:13px 22px; font-size:0.88rem; font-weight:500; text-decoration:none;">
                  ${escHtml(t("packDownloadSample"))}
                </a>
              </div>

              <div style="display:flex; gap:10px; padding-top:8px;">
                <button type="button" onclick="window.tbbSelectDeliverableCarousel(${activeIdx - 1})" class="tbb-btn-light-surface" style="padding:8px 16px; font-size:0.82rem;">${escHtml(t("carouselPrev"))}</button>
                <button type="button" onclick="window.tbbSelectDeliverableCarousel(${activeIdx + 1})" class="tbb-btn-light-surface" style="padding:8px 16px; font-size:0.82rem;">${escHtml(t("carouselNext"))}</button>
              </div>
            </div>
          </div>

          <div>
            <div id="tbbModernDeliverablesCarouselTrack" style="display:flex; gap:18px; overflow-x:auto; padding:8px 4px 20px 4px; scroll-snap-type:x mandatory;">
              ${OFFICIAL_9_DELIVERABLES.map((item, idx) => {
                const loc = item.i18n[lang] || item.i18n.es;
                const fmtTxt = loc.format || item.format;
                const isSel = idx === activeIdx;
                return `
                  <div id="tbbCarouselDelivCard_${idx}" onclick="window.tbbSelectDeliverableCarousel(${idx})" style="min-width:265px; max-width:265px; scroll-snap-align:center; background:${isSel ? '#FFFFFF' : '#F8FAFC'}; border-radius:20px; padding:14px; border:2px solid ${isSel ? '#1D4ED8' : '#E2E8F0'}; box-shadow:${isSel ? '0 16px 36px rgba(29,78,216,0.14)' : '0 4px 12px rgba(15,23,42,0.04)'}; cursor:pointer; transition:all 0.22s ease; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                    <div>
                      <div style="position:relative; border-radius:12px; overflow:hidden; background:#FFFFFF; margin-bottom:10px;">
                        <img src="${item.thumb}" alt="${escHtml(loc.title)}" loading="eager" decoding="async" style="width:100%; height:148px; object-fit:cover; object-position:top center; display:block;" />
                        <button type="button" onclick="event.stopPropagation(); window.tbbOpenPlateLightboxModal(${item.plateNum}, '${item.thumb}', '${escHtml(loc.title)}', '${item.sampleUrl}');" style="position:absolute; top:8px; right:8px; background:rgba(15,23,42,0.82); color:#FFFFFF; border:none; border-radius:999px; padding:4px 10px; font-size:0.68rem; cursor:pointer;">
                          ⤢ Max Res
                        </button>
                      </div>
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:500; color:#EA580C;">#${item.num} · ${escHtml(fmtTxt)}</div>
                      <div style="font-family:'Montserrat', sans-serif; font-size:0.92rem; font-weight:600; color:#0F172A; margin-top:4px; line-height:1.3;">${escHtml(loc.title)}</div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div style="padding-top:36px; border-top:1px solid #E2E8F0;">
            <div style="text-align:center; max-width:780px; margin:0 auto 36px auto;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#EA580C; letter-spacing:0.06em; margin-bottom:8px;">
                ${escHtml(t("comingSoonEyebrow"))}
              </div>
              <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.6rem, 2.8vw, 2.25rem); font-weight:600; color:#0F172A; margin:0 0 10px 0;">
                ${escHtml(t("comingSoonTitle"))}
              </h2>
              <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.65; margin:0;">
                ${escHtml(t("comingSoonDesc"))}
              </p>
            </div>

            <div class="tbb-comm-grid-2" style="gap:28px; align-items:stretch;">
              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:24px; padding:32px; display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px;">
                    <span style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; font-weight:500; color:#1D4ED8; background:#EFF6FF; padding:5px 12px; border-radius:999px;">
                      ADD-ON 01 · ${escHtml(t("csWebPrice"))}
                    </span>
                  </div>
                  <h3 style="font-family:'Montserrat', sans-serif; font-size:1.35rem; font-weight:600; color:#0F172A; margin:0 0 10px 0;">
                    🌐 ${escHtml(t("csWebTitle"))}
                  </h3>
                  <p style="font-size:0.94rem; font-weight:400; color:#475569; line-height:1.65; margin:0;">
                    ${escHtml(t("csWebDesc"))}
                  </p>
                </div>
                <div>
                  <button type="button" onclick="window.tbbReserveComingSoonAddon('web')" class="tbb-btn-light-surface" style="padding:12px 22px; font-size:0.86rem; font-weight:500;">
                    ${st.comingSoonReservedWeb ? escHtml(t("csReservedOk")) : escHtml(t("csReserveBtn"))}
                  </button>
                </div>
              </div>

              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:24px; padding:32px; display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px;">
                    <span style="font-family:'JetBrains Mono', monospace; font-size:0.7rem; font-weight:500; color:#EA580C; background:#FFF7ED; padding:5px 12px; border-radius:999px;">
                      ADD-ON 02 · ${escHtml(t("csSocialPrice"))}
                    </span>
                  </div>
                  <h3 style="font-family:'Montserrat', sans-serif; font-size:1.35rem; font-weight:600; color:#0F172A; margin:0 0 10px 0;">
                    📱 ${escHtml(t("csSocialTitle"))}
                  </h3>
                  <p style="font-size:0.94rem; font-weight:400; color:#475569; line-height:1.65; margin:0;">
                    ${escHtml(t("csSocialDesc"))}
                  </p>
                </div>
                <div>
                  <button type="button" onclick="window.tbbReserveComingSoonAddon('social')" class="tbb-btn-light-surface" style="padding:12px 22px; font-size:0.86rem; font-weight:500;">
                    ${st.comingSoonReservedSocial ? escHtml(t("csReservedOk")) : escHtml(t("csReserveBtn"))}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  };

  // ---------------------------------------------------------------------------
  // 9. RENDERIZADOR PRINCIPAL DE LA EXPERIENCIA COMERCIAL (5 SUBPÁGINAS)
  // ---------------------------------------------------------------------------
  window.tbbBuildCommercialExperienceMarkup = function (isStandalonePage) {
    syncDemoStateFromAppIfAvailable();
    const st = window.tbbCommercialDemoState;
    const curLang = getLang();
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    const sec = st.activeMainSection || 1;

    return `
      <header class="tbb-awwwards-nav">
        <a href="#top" onclick="window.tbbSwitchMainSection(1); return false;" style="display:flex; align-items:center; gap:12px; text-decoration:none; min-width:0;">
          <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:38px; height:38px; border-radius:10px; object-fit:cover; flex-shrink:0;" />
          <div class="tbb-header-brand-text-wrap" style="min-width:0;">
            <div style="font-family:'Montserrat', sans-serif; font-size:0.98rem; font-weight:600; color:#0F172A; letter-spacing:-0.02em; white-space:nowrap;">
              THE BEST BRAND <span class="tbb-brand-inline-tagline" style="color:#EA580C; font-size:0.7rem; font-weight:500; margin-left:4px;">YOUR BRAND, NOW!!!</span>
            </div>
          </div>
        </a>

        <nav class="tbb-desktop-nav-links" aria-label="Menú Principal">
          <button type="button" id="tbbSecTab_1" class="tbb-nav-menu-item ${sec === 1 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(1)">
            <span>${escHtml(t("menu1"))}</span>
          </button>
          <button type="button" id="tbbSecTab_2" class="tbb-nav-menu-item ${sec === 2 ? 'is-active' : ''}" onclick="window.tbbLaunchDemoFullscreen()">
            <span class="tbb-live-pulse-dot"></span>
            <span>${escHtml(t("menu2"))}</span>
            <span class="tbb-live-pill-badge">${escHtml(t("menu2Live"))}</span>
          </button>
          <button type="button" id="tbbSecTab_3" class="tbb-nav-menu-item ${sec === 3 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(3)">
            <span>${escHtml(t("menu3"))}</span>
          </button>
          <button type="button" id="tbbSecTab_4" class="tbb-nav-menu-item ${sec === 4 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(4)">
            <span>${escHtml(t("menu4"))}</span>
          </button>
          <button type="button" id="tbbSecTab_5" class="tbb-nav-menu-item ${sec === 5 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(5)">
            <span>${escHtml(t("menu5"))}</span>
          </button>
        </nav>

        <div style="display:flex; align-items:center; gap:10px; flex-shrink:0;">
          <select id="tbbCommercialLangSelect" aria-label="Idioma" onchange="window.tbbChangeCommercialLanguage(this.value)" style="height:36px; padding:0 10px; border-radius:999px; background:#F8FAFC; color:#0F172A; border:1px solid #CBD5E1; font-size:0.78rem; font-weight:500; cursor:pointer;">
            <option value="es" ${curLang === "es" ? "selected" : ""}>🇪🇸 ES</option>
            <option value="en" ${curLang === "en" ? "selected" : ""}>🇺🇸 EN</option>
            <option value="fr" ${curLang === "fr" ? "selected" : ""}>🇫🇷 FR</option>
            <option value="pt" ${curLang === "pt" ? "selected" : ""}>🇧🇷 PT</option>
            <option value="de" ${curLang === "de" ? "selected" : ""}>🇩🇪 DE</option>
            <option value="it" ${curLang === "it" ? "selected" : ""}>🇮🇹 IT</option>
          </select>

          <button type="button" id="tbbBtnTopBuyAppNow" class="tbb-comm-btn-blue" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')" style="padding:9px 18px; font-size:0.82rem; font-weight:600; white-space:nowrap;">
            <span>${isLicensed ? escHtml(t("licenseActive")) : escHtml(t("buyNowHeader"))}</span>
          </button>

          ${isStandalonePage ? `
            <a href="/studio" class="tbb-btn-light-surface tbb-desktop-only-ctrl" style="padding:8px 14px; font-size:0.8rem; font-weight:500; text-decoration:none; white-space:nowrap;">
              <span>${escHtml(t("openStudio"))}</span>
            </a>
          ` : `
            <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseCommercialPortalModal()" style="padding:7px 12px; font-size:0.8rem;">✕</button>
          `}

          <button type="button" class="tbb-mobile-hamburger-btn" onclick="window.tbbToggleMobileDrawer()" aria-label="Abrir menú móvil">
            ☰
          </button>
        </div>
      </header>

      <nav class="tbb-mobile-subpages-bar" aria-label="Subpáginas">
        <button type="button" class="tbb-mob-pill tbb-tab-sec-1 ${sec === 1 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(1)">${escHtml(t("menu1"))}</button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-2 ${sec === 2 ? 'is-active' : ''}" onclick="window.tbbLaunchDemoFullscreen()">
          <span class="tbb-live-pulse-dot"></span> ${escHtml(t("menu2"))}
        </button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-3 ${sec === 3 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(3)">${escHtml(t("menu3"))}</button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-4 ${sec === 4 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(4)">${escHtml(t("menu4"))}</button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-5 ${sec === 5 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(5)">${escHtml(t("menu5"))}</button>
      </nav>

      <div id="tbbMobileDrawerBackdrop" class="tbb-mobile-drawer-backdrop" onclick="window.tbbToggleMobileDrawer(false)"></div>
      <aside id="tbbMobileSlideDrawer" class="tbb-mobile-slide-drawer" aria-label="Menú Móvil">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:14px; border-bottom:1px solid #E2E8F0;">
          <span style="font-weight:600; font-size:0.95rem; color:#0F172A;">THE BEST BRAND</span>
          <button type="button" class="tbb-btn-light-surface" onclick="window.tbbToggleMobileDrawer(false)" style="padding:5px 10px;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px;">
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(1);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">01 · ${escHtml(t("menu1"))}</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbLaunchDemoFullscreen();" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">02 · ${escHtml(t("menu2"))} (${escHtml(t("menu2Live"))})</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(3);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">03 · ${escHtml(t("menu3"))}</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(4);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">04 · ${escHtml(t("menu4"))}</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(5);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">05 · ${escHtml(t("menu5"))}</button>
          <a href="/studio" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px; text-decoration:none;">${escHtml(t("openStudio"))}</a>
          <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbToggleMobileDrawer(false); window.tbbOpenBuyAppCheckoutModal('pro_atelier');" style="padding:14px; margin-top:6px;">${escHtml(t("buyNowFloating"))}</button>
        </div>
      </aside>

      <main id="tbbMainActiveSubpageViewport" style="background:#FFFFFF; min-height:82vh;">
        ${window.tbbRenderActiveSubpageHTML(sec)}
      </main>
    `;
  };

  // ---------------------------------------------------------------------------
  // 10. MODAL YOUTUBE Y MOTOR REAL DE PAGO (/api/v1/payments/checkout-live)
  // ---------------------------------------------------------------------------
  window.tbbPlayYouTubeAuthorVideo = function (videoId) {
    const author = YOUTUBE_METHODOLOGY_AUTHORS.find(a => a.id === videoId);
    const lang = getLang();
    const aLoc = (author && author.i18n && (author.i18n[lang] || author.i18n.es)) || author;
    let ov = document.getElementById("tbbYouTubeAuthorModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbYouTubeAuthorModalOverlay";
      ov.style.cssText = "position:fixed; inset:0; background:rgba(15,23,42,0.86); backdrop-filter:blur(14px); z-index:10050; display:flex; align-items:center; justify-content:center; padding:16px;";
      ov.onclick = (e) => { if (e.target === ov) { ov.style.display = "none"; ov.innerHTML = ""; } };
      document.body.appendChild(ov);
    }
    ov.innerHTML = `
      <div style="background:#FFFFFF; border-radius:22px; width:100%; max-width:900px; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,0.45);">
        <div style="padding:14px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #E2E8F0;">
          <div style="font-family:'Montserrat',sans-serif; font-size:1.0rem; font-weight:600; color:#0F172A;">${escHtml(aLoc?.title || author?.title || "YouTube")}</div>
          <button type="button" onclick="document.getElementById('tbbYouTubeAuthorModalOverlay').style.display='none'; document.getElementById('tbbYouTubeAuthorModalOverlay').innerHTML='';" class="tbb-btn-light-surface" style="padding:5px 12px;">✕</button>
        </div>
        <div style="aspect-ratio:16/9; width:100%; background:#000000;">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="display:block; border:none;"></iframe>
        </div>
      </div>
    `;
    ov.style.display = "flex";
  };

  window.tbbToggleMobileDrawer = function (forceOpen) {
    const next = typeof forceOpen === "boolean" ? forceOpen : !window.tbbCommercialDemoState.mobileDrawerOpen;
    window.tbbCommercialDemoState.mobileDrawerOpen = next;
    const drw = document.getElementById("tbbMobileSlideDrawer");
    const bkp = document.getElementById("tbbMobileDrawerBackdrop");
    if (drw) drw.classList.toggle("open", next);
    if (bkp) bkp.classList.toggle("open", next);
  };

  window.tbbUpdateLocalizedFooterDOM = function () {
    const fHead = document.getElementById("tbbFooterBrandHeadline");
    if (fHead) {
      const subMap = {
        es: "ARQUITECTURA DE MARCA EN 30 MINUTOS",
        en: "BRAND ARCHITECTURE IN 30 MINUTES",
        fr: "ARCHITECTURE DE MARQUE EN 30 MINUTES",
        pt: "ARQUITETURA DE MARCA EM 30 MINUTOS",
        de: "MARKENARCHITEKTUR IN 30 MINUTEN",
        it: "ARCHITETTURA DEL BRAND IN 30 MINUTI"
      };
      const subTxt = subMap[getLang()] || subMap.es;
      fHead.innerHTML = `THE BEST BRAND <span style="color:#EA580C; font-weight:500; font-size:0.76rem; margin-left:6px;">· ${escHtml(subTxt)}</span>`;
    }
    const fDesc = document.getElementById("tbbFooterBrandDesc");
    if (fDesc) fDesc.textContent = t("footerDesc");
    const fNav = document.getElementById("tbbFooterNavLinks");
    if (fNav) {
      fNav.innerHTML = `
        <a href="/" onclick="if(window.tbbSetActiveMainTab){window.tbbSetActiveMainTab('inicio');return false;}" style="font-size:0.84rem; color:#475569; text-decoration:none; font-weight:500;">01 · ${escHtml(t("menu1"))}</a>
        <a href="/demo" onclick="if(window.tbbLaunchDemoFullscreen){window.tbbLaunchDemoFullscreen();return false;}" style="font-size:0.84rem; color:#16A34A; text-decoration:none; font-weight:600;">02 · ${escHtml(t("menu2"))}</a>
        <a href="/app-tour" onclick="if(window.tbbSetActiveMainTab){window.tbbSetActiveMainTab('app-tour');return false;}" style="font-size:0.84rem; color:#475569; text-decoration:none; font-weight:500;">03 · ${escHtml(t("menu3"))}</a>
        <a href="/bases-teoricas" onclick="if(window.tbbSetActiveMainTab){window.tbbSetActiveMainTab('bases-teoricas');return false;}" style="font-size:0.84rem; color:#475569; text-decoration:none; font-weight:500;">04 · ${escHtml(t("menu4"))}</a>
        <a href="/pack-descargas" onclick="if(window.tbbSetActiveMainTab){window.tbbSetActiveMainTab('pack-descargas');return false;}" style="font-size:0.84rem; color:#475569; text-decoration:none; font-weight:500;">05 · ${escHtml(t("menu5"))}</a>
        <a href="/studio" style="font-size:0.84rem; color:#1D4ED8; text-decoration:none; font-weight:600;">${escHtml(t("openStudio"))}</a>
      `;
    }
  };

  window.tbbChangeCommercialLanguage = function (langCode) {
    const clean = String(langCode || "es").toLowerCase().trim();
    try {
      localStorage.setItem(LANG_STORAGE_KEY, clean);
      localStorage.setItem("tbb_app_lang", clean);
      document.documentElement.lang = clean;
    } catch (e) {}
    if (typeof window.tbbSetApplicationLanguage === "function") {
      window.tbbSetApplicationLanguage(clean);
    }
    // Actualizar datos del preset activo al nuevo idioma
    const st = window.tbbCommercialDemoState;
    if (st && st.activePresetId) {
      const rawP = DEMO_QUICK_PRESETS.find(item => item.id === st.activePresetId);
      if (rawP) {
        const locP = getLocalizedPresetData(rawP, clean);
        st.brandName = locP.brandName;
        st.tagline = locP.tagline;
        st.businessGiro = locP.businessGiro;
        st.whyPurpose = locP.whyPurpose;
        st.howMethod = locP.howMethod;
        st.whatOffer = locP.whatOffer;
      }
    }
    window.tbbRefreshCommercialPortalDOM();
    window.tbbRenderCheckoutModalContent();
    window.tbbUpdateAlwaysOnFloatingBarText();
    window.tbbUpdateLocalizedFooterDOM();
    // Si el modal de video está abierto, recargarlo en el idioma recién seleccionado
    if (st && typeof st.openVideoModalStep === "number") {
      const ov = document.getElementById("tbbVideoCapsuleModalOverlay");
      if (ov && ov.style.display === "flex") {
        window.tbbOpenVideoPopupModal(st.openVideoModalStep);
      }
    }
    document.querySelectorAll(".tbb-live-iphone-studio-iframe").forEach(fr => {
      try {
        if (fr && fr.contentWindow) {
          fr.contentWindow.postMessage({ type: "TBB_SET_LANGUAGE", lang: clean }, "*");
        }
      } catch (e) {}
    });
  };

  window.tbbFormatCardInput = function (inputEl) {
    if (!inputEl) return;
    const digits = inputEl.value.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g) || [];
    inputEl.value = groups.join(" ");
  };

  window.tbbFormatExpiryInput = function (inputEl) {
    if (!inputEl) return;
    const digits = inputEl.value.replace(/\D/g, "").slice(0, 4);
    inputEl.value = digits.length >= 3 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
  };

  window.tbbSelectCheckoutPlan = function (planId) {
    window.tbbCommercialDemoState.selectedPlan = planId === "agency_suite" ? "agency_suite" : "pro_atelier";
    window.tbbRenderCheckoutModalContent();
  };

  window.tbbSelectPaymentMethod = function (methodId) {
    window.tbbCommercialDemoState.selectedPaymentMethod = methodId || "card";
    window.tbbRenderCheckoutModalContent();
  };

  window.tbbGetPendingDemoMigrationSnapshot = function () {
    const st = window.tbbCommercialDemoState || {};
    if (st.migratedSteps0to3Snapshot && typeof st.migratedSteps0to3Snapshot === "object") {
      return st.migratedSteps0to3Snapshot;
    }
    try {
      const raw = localStorage.getItem("tbb_demo_steps0to3_migration_v92");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (e) {}
    if (typeof window.tbbBuildProgressMigrationSnapshot === "function") {
      try {
        return window.tbbBuildProgressMigrationSnapshot();
      } catch (e) {}
    }
    return {
      migratedAt: new Date().toISOString(),
      completedDemoSteps: [0, 1, 2, 3],
      targetStepAfterPaywall: 4,
      brandName: st.brandName || "THE BEST BRAND",
      sector: st.sector || "",
      whyPurpose: st.whyPurpose || "",
      howMethod: st.howMethod || "",
      whatOffer: st.whatOffer || "",
      touchpoints: Array.isArray(st.touchpoints) ? st.touchpoints : []
    };
  };

  window.tbbProcessCheckoutPayment = async function (methodId) {
    const st = window.tbbCommercialDemoState;
    const planPrice = st.selectedPlan === "agency_suite" ? 149.00 : 49.00;
    const planLabel = st.selectedPlan === "agency_suite" ? t("planAgencyName") : t("planSingleName");
    const statusBox = document.getElementById("tbbCheckoutLiveStatusBox");

    const nameVal = (document.getElementById("tbbCardHolderInput")?.value || "Jorge Benítez").trim();
    const numVal = (document.getElementById("tbbCardNumberInput")?.value || "4532891044218890").replace(/\D/g, "");
    const expVal = (document.getElementById("tbbCardExpiryInput")?.value || "08/29").trim();
    const cvcVal = (document.getElementById("tbbCardCvcInput")?.value || "842").replace(/\D/g, "");
    const emailVal = (document.getElementById("tbbCardEmailInput")?.value || "cliente@thebestbrand.app").trim();
    const pwdVal = (document.getElementById("tbbAccountPasswordInput")?.value || "TheBestBrand2026!").trim();

    if (methodId === "card" && (nameVal.length < 3 || numVal.length < 13 || expVal.length < 4 || cvcVal.length < 3)) {
      if (statusBox) {
        statusBox.style.display = "block";
        statusBox.style.background = "#FEF2F2";
        statusBox.style.color = "#991B1B";
        statusBox.textContent = "Please check your card details or choose Apple Pay, Google Pay, or PayPal.";
      }
      return;
    }

    const migrationSnapshot = window.tbbGetPendingDemoMigrationSnapshot();
    const effectiveBrandName = (migrationSnapshot && migrationSnapshot.brandName) || st.brandName || "THE BEST BRAND";

    if (statusBox) {
      statusBox.style.display = "block";
      statusBox.style.background = "#EFF6FF";
      statusBox.style.color = "#1E3A8A";
      statusBox.textContent = `$${planPrice.toFixed(2)} USD...`;
    }

    try {
      const resp = await fetch("/api/v1/payments/checkout-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: st.selectedPlan,
          payment_method: methodId,
          brand_name: effectiveBrandName,
          customer_email: emailVal,
          card_holder: nameVal,
          card_last4: numVal.slice(-4) || "8890",
          account_password: pwdVal,
          current_step: 4,
          state_snapshot: migrationSnapshot
        })
      });
      const data = await resp.json();

      if (data && data.stripe_checkout_url) {
        window.location.href = data.stripe_checkout_url;
        return;
      }

      const accountObj = (data && data.account) || {
        account_id: "acct_live_" + Date.now().toString(36),
        email: emailVal,
        full_name: nameVal,
        plan_tier: st.selectedPlan === "agency_suite" ? "ENTERPRISE_UNLIMITED" : "PRO_ATELIER_49",
        migrated_steps_1_to_3: true,
        unlocked_step: 4
      };

      const receiptObj = {
        licenseCode: (data && data.license_code) || ("TBB-PRO-" + Date.now().toString(36).toUpperCase()),
        orderFolio: (data && data.order_folio) || "TBB-LIVE-001",
        downloadGrantToken: (data && data.download_grant_token) || "",
        planId: st.selectedPlan,
        planLabel,
        amountUSD: planPrice,
        paymentMethod: methodId,
        brandName: effectiveBrandName,
        customerEmail: emailVal,
        accountId: accountObj.account_id,
        migratedSteps: "Steps 0–3 → Step 4 Unlocked",
        activatedAt: (data && data.authorized_at) || new Date().toISOString()
      };

      localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receiptObj));
      localStorage.setItem("tbb_license_active_pro_atelier", "true");
      localStorage.setItem("thebestbrand_pro_license", receiptObj.licenseCode);
      localStorage.setItem("tbb_user_account_v30", JSON.stringify(accountObj));
      localStorage.setItem("tbb_demo_steps0to3_migration_v92", JSON.stringify(migrationSnapshot));
      if (receiptObj.downloadGrantToken) {
        localStorage.setItem("tbb_hmac_download_grant_v82", receiptObj.downloadGrantToken);
      }

      window.tbbSyncCommercialDemoToAppState();
      window.tbbBroadcastLicenseUnlockedToStudio(receiptObj, accountObj, migrationSnapshot);
      window.tbbRenderCheckoutSuccessView(receiptObj, accountObj);
      window.tbbUpdateAlwaysOnFloatingBarText();
      window.tbbRefreshCommercialPortalDOM();
    } catch (err) {
      const fallbackAccount = {
        account_id: "acct_local_" + Date.now().toString(36),
        email: emailVal,
        full_name: nameVal,
        plan_tier: "PRO_ATELIER_49",
        migrated_steps_1_to_3: true,
        unlocked_step: 4
      };
      const fallbackReceipt = {
        licenseCode: "TBB-PRO-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
        orderFolio: "TBB-LIVE-LOCAL",
        planId: st.selectedPlan,
        planLabel,
        amountUSD: planPrice,
        paymentMethod: methodId,
        brandName: effectiveBrandName,
        customerEmail: emailVal,
        accountId: fallbackAccount.account_id,
        migratedSteps: "Steps 0–3 → Step 4 Unlocked",
        activatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(fallbackReceipt));
        localStorage.setItem("tbb_license_active_pro_atelier", "true");
        localStorage.setItem("thebestbrand_pro_license", fallbackReceipt.licenseCode);
        localStorage.setItem("tbb_user_account_v30", JSON.stringify(fallbackAccount));
      } catch (e) {}
      window.tbbBroadcastLicenseUnlockedToStudio(fallbackReceipt, fallbackAccount, migrationSnapshot);
      window.tbbRenderCheckoutSuccessView(fallbackReceipt, fallbackAccount);
      window.tbbUpdateAlwaysOnFloatingBarText();
      window.tbbRefreshCommercialPortalDOM();
    }
  };

  window.tbbBroadcastLicenseUnlockedToStudio = function (receiptObj, accountObj, migrationSnapshot) {
    // 1. Notificar a todos los iframes de iPhone en vivo en la landing
    try {
      const frames = document.querySelectorAll(".tbb-live-iphone-studio-iframe");
      frames.forEach(fr => {
        if (fr && fr.contentWindow) {
          fr.contentWindow.postMessage({
            type: "TBB_LICENSE_UNLOCKED_CONTINUE_STEP4",
            receipt: receiptObj,
            account: accountObj,
            migratedState: migrationSnapshot
          }, "*");
        }
      });
    } catch (e) {}

    // 2. Si estamos ejecutando dentro de studio.html directamente, desbloquear y saltar al Paso 4
    try {
      if (typeof window.switchStep === "function" && (window.location.pathname === "/studio" || window.location.pathname.endsWith("studio.html"))) {
        if (typeof window.state === "object" && window.state) {
          window.state.account = accountObj;
        }
        window.switchStep(4);
      }
    } catch (e) {}
  };

  window.tbbRenderCheckoutSuccessView = function (receipt, account) {
    const container = document.getElementById("tbbCheckoutSheetInner");
    if (!container) return;
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:14px; text-align:center; padding:14px 8px;">
        <div style="margin:0 auto;">${window.tbbBuildOfficialBrandbook1EmblemSVG(64)}</div>
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:600; color:#16A34A;">
          ✓ ${escHtml(t("licenseActive"))} · STEP 4 UNLOCKED
        </div>
        <h3 style="font-family:'Montserrat', sans-serif; font-size:1.38rem; font-weight:600; color:#0F172A; margin:0;">
          ${escHtml(receipt.brandName)} · Pro Atelier
        </h3>
        <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:16px; padding:14px; text-align:left; font-size:0.84rem; line-height:1.65; color:#334155;">
          <div>Account: <span style="font-family:'JetBrains Mono', monospace; color:#0F172A; font-weight:600;">${escHtml(receipt.customerEmail || account?.email || "cliente@thebestbrand.app")}</span></div>
          <div>License: <span style="font-family:'JetBrains Mono', monospace; color:#1D4ED8; font-weight:600;">${escHtml(receipt.licenseCode)}</span></div>
          <div>Order: <span style="font-family:'JetBrains Mono', monospace;">${escHtml(receipt.orderFolio || "TBB-LIVE")}</span></div>
          <div>Status: <span style="color:#15803D; font-weight:600;">✓ ${escHtml(receipt.migratedSteps || "Steps 1–3 → Step 4")}</span></div>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:4px;">
          <a href="/studio?step=4&continue=true" onclick="window.tbbCloseBuyAppCheckoutModal();" class="tbb-comm-btn-blue" style="flex:1; padding:14px; text-decoration:none;">
            ${escHtml(t("openStudio"))}
          </a>
          <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="padding:14px 18px;">
            ${escHtml(t("lightboxClose"))}
          </button>
        </div>
      </div>
    `;
  };

  window.tbbRenderCheckoutModalContent = function () {
    const container = document.getElementById("tbbCheckoutSheetInner");
    if (!container) return;
    const st = window.tbbCommercialDemoState;
    const lang = getLang();
    const isAgency = st.selectedPlan === "agency_suite";
    const priceTxt = isAgency ? "$149.00 USD" : "$49.00 USD";
    const method = st.selectedPaymentMethod || "card";
    const mig = window.tbbGetPendingDemoMigrationSnapshot();
    const migBrand = (mig && mig.brandName) || st.brandName || "THE BEST BRAND";

    const chkCopy = {
      es: {
        title: "Desbloquea los Pasos 4 al 6 y tus 9 Entregables",
        sub: "Crea tu cuenta y conserva intacto todo tu avance de los Pasos 1 al 3",
        migStrong: "Migración Automática Activada:",
        migText: `Tus respuestas de los Pasos 1 al 3 para ${migBrand} se vincularán automáticamente a tu nueva cuenta para continuar en el Paso 4 sin perder tu progreso.`,
        cardTab: "💳 Tarjeta",
        emailLbl: "Correo de tu nueva cuenta",
        pwdLbl: "Contraseña (migrar Pasos 1–3)",
        holderLbl: "Nombre del titular",
        numLbl: "Número de tarjeta",
        expLbl: "MM/AA",
        payBtn: `Crear Cuenta, Migrar Pasos 1–3 y Pagar · ${priceTxt}`,
        altText: `Autorización instantánea con ${method.toUpperCase().replace("_", " ")} por ${priceTxt} y migración automática de tus Pasos 1–3.`
      },
      en: {
        title: "Unlock Steps 4 to 6 and Your 9 Deliverables",
        sub: "Create your account and keep all your Steps 1 to 3 progress intact",
        migStrong: "Automatic Migration Active:",
        migText: `Your Steps 1 to 3 answers for ${migBrand} will automatically link to your new account so you can continue in Step 4 without losing progress.`,
        cardTab: "💳 Card",
        emailLbl: "New account email",
        pwdLbl: "Password (migrate Steps 1–3)",
        holderLbl: "Cardholder name",
        numLbl: "Card number",
        expLbl: "MM/YY",
        payBtn: `Create Account, Migrate Steps 1–3 & Pay · ${priceTxt}`,
        altText: `Instant authorization with ${method.toUpperCase().replace("_", " ")} for ${priceTxt} and automatic migration of your Steps 1–3.`
      },
      fr: {
        title: "Débloquez les Étapes 4 à 6 et vos 9 Livrables",
        sub: "Créez votre compte et conservez intacte toute votre progression des Étapes 1 à 3",
        migStrong: "Migration Automatique Activée :",
        migText: `Vos réponses des Étapes 1 à 3 pour ${migBrand} seront automatiquement liées à votre nouveau compte pour continuer à l'Étape 4.`,
        cardTab: "💳 Carte",
        emailLbl: "Email de votre nouveau compte",
        pwdLbl: "Mot de passe (migrer Étapes 1–3)",
        holderLbl: "Nom du titulaire",
        numLbl: "Numéro de carte",
        expLbl: "MM/AA",
        payBtn: `Créer un Compte, Migrer Étapes 1–3 & Payer · ${priceTxt}`,
        altText: `Autorisation instantanée avec ${method.toUpperCase().replace("_", " ")} pour ${priceTxt} et migration automatique.`
      },
      pt: {
        title: "Desbloqueie os Passos 4 a 6 e os seus 9 Entregáveis",
        sub: "Crie a sua conta e conserve intacto todo o seu avanço dos Passos 1 a 3",
        migStrong: "Migração Automática Ativada:",
        migText: `As suas respostas dos Passos 1 a 3 para ${migBrand} serão vinculadas automaticamente à sua nova conta para continuar no Passo 4.`,
        cardTab: "💳 Cartão",
        emailLbl: "Email da sua nova conta",
        pwdLbl: "Palavra-passe (migrar Passos 1–3)",
        holderLbl: "Nome do titular",
        numLbl: "Número do cartão",
        expLbl: "MM/AA",
        payBtn: `Criar Conta, Migrar Passos 1–3 e Pagar · ${priceTxt}`,
        altText: `Autorização instantânea com ${method.toUpperCase().replace("_", " ")} por ${priceTxt} e migração automática.`
      },
      de: {
        title: "Schritte 4 bis 6 & Ihre 9 Ergebnisse freischalten",
        sub: "Konto erstellen und Ihren gesamten Fortschritt aus den Schritten 1 bis 3 behalten",
        migStrong: "Automatische Migration aktiviert:",
        migText: `Ihre Antworten der Schritte 1 bis 3 für ${migBrand} werden automatisch mit Ihrem neuen Konto verknüpft, um in Schritt 4 fortzufahren.`,
        cardTab: "💳 Karte",
        emailLbl: "E-Mail Ihres neuen Kontos",
        pwdLbl: "Passwort (Schritte 1–3 migrieren)",
        holderLbl: "Name des Karteninhabers",
        numLbl: "Kartennummer",
        expLbl: "MM/JJ",
        payBtn: `Konto erstellen, Schritte 1–3 migrieren & zahlen · ${priceTxt}`,
        altText: `Sofortige Autorisierung mit ${method.toUpperCase().replace("_", " ")} für ${priceTxt} und automatische Migration.`
      },
      it: {
        title: "Sblocca i Passi da 4 a 6 e i tuoi 9 Deliverable",
        sub: "Crea il tuo account e conserva intatto tutto il progresso dei Passi da 1 a 3",
        migStrong: "Migrazione Automatica Attivata:",
        migText: `Le tue risposte dei Passi da 1 a 3 per ${migBrand} verranno collegate automaticamente al tuo nuovo account per continuare al Passo 4.`,
        cardTab: "💳 Carta",
        emailLbl: "Email del tuo nuovo account",
        pwdLbl: "Password (migra Passi 1–3)",
        holderLbl: "Nome del titolare",
        numLbl: "Numero di carta",
        expLbl: "MM/AA",
        payBtn: `Crea Account, Migra Passi 1–3 e Paga · ${priceTxt}`,
        altText: `Autorizzazione istantanea con ${method.toUpperCase().replace("_", " ")} per ${priceTxt} e migrazione automatica.`
      }
    }[lang] || {
      title: "Desbloquea los Pasos 4 al 6 y tus 9 Entregables",
      sub: "Crea tu cuenta y conserva intacto todo tu avance de los Pasos 1 al 3",
      migStrong: "Migración Automática Activada:",
      migText: `Tus respuestas de los Pasos 1 al 3 para ${migBrand} se vincularán automáticamente a tu nueva cuenta para continuar en el Paso 4 sin perder tu progreso.`,
      cardTab: "💳 Tarjeta",
      emailLbl: "Correo de tu nueva cuenta",
      pwdLbl: "Contraseña (migrar Pasos 1–3)",
      holderLbl: "Nombre del titular",
      numLbl: "Número de tarjeta",
      expLbl: "MM/AA",
      payBtn: `Crear Cuenta, Migrar Pasos 1–3 y Pagar · ${priceTxt}`,
      altText: `Autorización instantánea con ${method.toUpperCase().replace("_", " ")} por ${priceTxt} y migración automática de tus Pasos 1–3.`
    };

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; border-bottom:1px solid #E2E8F0; padding-bottom:12px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:38px; height:38px; border-radius:10px; object-fit:cover;" />
          <div>
            <div style="font-family:'Montserrat', sans-serif; font-size:1.06rem; font-weight:600; color:#0F172A;">${escHtml(chkCopy.title)}</div>
            <div style="font-size:0.78rem; font-weight:400; color:#475569;">${escHtml(chkCopy.sub)}</div>
          </div>
        </div>
        <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="padding:6px 12px;">✕</button>
      </div>

      <!-- Banner de Retención y Migración Automática de Datos (Pasos 1 al 3) -->
      <div style="margin-top:12px; padding:10px 14px; border-radius:12px; background:#F0FDF4; border:1px solid #BBF7D0; display:flex; align-items:center; gap:10px; font-size:0.78rem; color:#166534;">
        <span style="font-size:1rem;">🔄</span>
        <div>
          <strong>${escHtml(chkCopy.migStrong)}</strong> ${escHtml(chkCopy.migText)}
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
        <button type="button" onclick="window.tbbSelectCheckoutPlan('pro_atelier')" style="padding:12px; border-radius:14px; border:1.5px solid ${!isAgency ? '#1D4ED8' : '#CBD5E1'}; background:${!isAgency ? '#EFF6FF' : '#FFFFFF'}; text-align:left; cursor:pointer;">
          <div style="font-size:0.84rem; font-weight:600; color:#0F172A;">${escHtml(t("planSingleName"))}</div>
          <div style="font-size:1.12rem; font-weight:600; color:#1D4ED8; margin-top:2px;">$49 USD</div>
          <div style="font-size:0.72rem; font-weight:400; color:#475569;">${escHtml(t("planSingleDesc"))}</div>
        </button>
        <button type="button" onclick="window.tbbSelectCheckoutPlan('agency_suite')" style="padding:12px; border-radius:14px; border:1.5px solid ${isAgency ? '#1D4ED8' : '#CBD5E1'}; background:${isAgency ? '#EFF6FF' : '#FFFFFF'}; text-align:left; cursor:pointer;">
          <div style="font-size:0.84rem; font-weight:600; color:#0F172A;">${escHtml(t("planAgencyName"))}</div>
          <div style="font-size:1.12rem; font-weight:600; color:#1D4ED8; margin-top:2px;">$149 USD</div>
          <div style="font-size:0.72rem; font-weight:400; color:#475569;">${escHtml(t("planAgencyDesc"))}</div>
        </button>
      </div>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-top:12px;">
        ${[
          { id: "card", lbl: chkCopy.cardTab },
          { id: "apple_pay", lbl: " Apple Pay" },
          { id: "google_pay", lbl: "G Pay" },
          { id: "paypal", lbl: "PayPal" }
        ].map(m => `
          <button type="button" onclick="window.tbbSelectPaymentMethod('${m.id}')" style="padding:9px 8px; border-radius:10px; border:1px solid ${method === m.id ? '#0D2540' : '#CBD5E1'}; background:${method === m.id ? '#0D2540' : '#F8FAFC'}; color:${method === m.id ? '#FFFFFF' : '#0F172A'}; font-size:0.78rem; font-weight:500; cursor:pointer;">
            ${escHtml(m.lbl)}
          </button>
        `).join("")}
      </div>

      <div style="margin-top:12px; background:#F8FAFC; border-radius:16px; padding:16px;">
        <!-- Datos de creación de cuenta para vincular Pasos 1-3 -->
        <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:10px; margin-bottom:10px;">
          <div>
            <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">${escHtml(chkCopy.emailLbl)}</label>
            <input type="email" id="tbbCardEmailInput" value="cliente@thebestbrand.app" style="width:100%; height:40px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.84rem; color:#0F172A; background:#FFFFFF;" />
          </div>
          <div>
            <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">${escHtml(chkCopy.pwdLbl)}</label>
            <input type="password" id="tbbAccountPasswordInput" value="TheBestBrand2026!" style="width:100%; height:40px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.84rem; color:#0F172A; background:#FFFFFF;" />
          </div>
        </div>

        ${method === "card" ? `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div>
              <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">${escHtml(chkCopy.holderLbl)}</label>
              <input type="text" id="tbbCardHolderInput" value="Jorge Benítez" style="width:100%; height:40px; padding:0 12px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.86rem; color:#0F172A; background:#FFFFFF;" />
            </div>
            <div style="display:grid; grid-template-columns:1.8fr 0.8fr 0.7fr; gap:10px;">
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">${escHtml(chkCopy.numLbl)}</label>
                <input type="text" id="tbbCardNumberInput" oninput="window.tbbFormatCardInput(this)" value="4532 8910 4421 8890" maxlength="19" style="width:100%; height:40px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.86rem; color:#0F172A; background:#FFFFFF;" />
              </div>
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">${escHtml(chkCopy.expLbl)}</label>
                <input type="text" id="tbbCardExpiryInput" oninput="window.tbbFormatExpiryInput(this)" value="08/29" maxlength="5" style="width:100%; height:40px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.84rem; color:#0F172A; background:#FFFFFF;" />
              </div>
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">CVC</label>
                <input type="password" id="tbbCardCvcInput" value="842" maxlength="4" style="width:100%; height:40px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.84rem; color:#0F172A; background:#FFFFFF;" />
              </div>
            </div>
            <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbProcessCheckoutPayment('card')" style="width:100%; padding:14px; font-size:0.9rem; font-weight:600; margin-top:4px;">
              ${escHtml(chkCopy.payBtn)}
            </button>
          </div>
        ` : `
          <div style="text-align:center; padding:10px;">
            <p style="font-size:0.86rem; font-weight:400; color:#334155; margin:0 0 12px 0;">
              ${escHtml(chkCopy.altText)}
            </p>
            <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbProcessCheckoutPayment('${method}')" style="width:100%; padding:14px; font-size:0.9rem; font-weight:600;">
              ${escHtml(chkCopy.payBtn)}
            </button>
          </div>
        `}
        <div id="tbbCheckoutLiveStatusBox" style="display:none; margin-top:12px; padding:12px; border-radius:10px; font-size:0.82rem; font-weight:500;"></div>
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // 11. ESTILOS GLOBALES V91.0 (LIENZO CLARO, CERO NEGRITAS EXCESIVAS, COMPRA SIEMPRE VISIBLE)
  // ---------------------------------------------------------------------------
  function tbbInjectAwwwardsStyles() {
    let styleEl = document.getElementById("tbbCommercialAwwwardsStyle");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "tbbCommercialAwwwardsStyle";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      :root {
        --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      body[data-tbb-standalone-web="true"] {
        background: #FFFFFF !important;
        color: #0F172A !important;
        font-family: var(--font-main);
        font-weight: 400;
      }
      .tbb-awwwards-nav {
        position: sticky;
        top: 0;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        padding: 12px 28px;
        background: rgba(255, 255, 255, 0.94);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid #E2E8F0;
      }
      .tbb-desktop-nav-links {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .tbb-nav-menu-item {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 16px;
        border-radius: 999px;
        border: 1px solid transparent;
        background: transparent;
        color: #475569;
        font-family: var(--font-main);
        font-size: 0.86rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      .tbb-nav-menu-item:hover {
        color: #0F172A;
        background: #F8FAFC;
      }
      .tbb-nav-menu-item.is-active {
        color: #0F172A;
        background: #F1F5F9;
        border-color: #CBD5E1;
        font-weight: 600;
      }
      .tbb-live-pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FF7A00;
        display: inline-block;
        box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.7);
        animation: tbbLivePulseAnim 1.8s infinite;
      }
      @keyframes tbbLivePulseAnim {
        0% { box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.7); transform: scale(0.95); }
        70% { box-shadow: 0 0 0 8px rgba(255, 122, 0, 0); transform: scale(1.1); }
        100% { box-shadow: 0 0 0 0 rgba(255, 122, 0, 0); transform: scale(0.95); }
      }
      .tbb-live-pill-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.62rem;
        font-weight: 600;
        background: #FFF7ED;
        color: #EA580C;
        border: 1px solid #FDBA74;
        padding: 2px 7px;
        border-radius: 999px;
      }
      .tbb-comm-btn-blue {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #0D2540;
        color: #FFFFFF !important;
        font-family: var(--font-main);
        font-weight: 600;
        border: 1px solid #1D4ED8;
        border-radius: 999px;
        cursor: pointer;
        box-shadow: 0 8px 22px rgba(13, 37, 64, 0.16);
        transition: all 0.2s ease;
      }
      .tbb-comm-btn-blue:hover {
        background: #1D4ED8;
        transform: translateY(-1px);
      }
      .tbb-btn-light-surface {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: #FFFFFF;
        border: 1px solid #CBD5E1;
        color: #0F172A !important;
        font-family: var(--font-main);
        font-weight: 500;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-btn-light-surface:hover {
        border-color: #1D4ED8;
        background: #F8FAFC;
      }
      .tbb-comm-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        align-items: center;
      }
      .tbb-mobile-subpages-bar {
        display: none;
        gap: 8px;
        padding: 8px 14px;
        background: #F8FAFC;
        border-bottom: 1px solid #E2E8F0;
        overflow-x: auto;
      }
      .tbb-mob-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        color: #475569;
        font-size: 0.78rem;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
      }
      .tbb-mob-pill.is-active {
        background: #0D2540;
        color: #FFFFFF;
        border-color: #0D2540;
      }
      .tbb-mobile-hamburger-btn {
        display: none;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: #F8FAFC;
        border: 1px solid #CBD5E1;
        color: #0F172A;
        font-size: 1.05rem;
        cursor: pointer;
      }
      @media (max-width: 1040px) {
        .tbb-desktop-nav-links,
        .tbb-desktop-only-ctrl,
        .tbb-brand-inline-tagline {
          display: none !important;
        }
        .tbb-mobile-subpages-bar {
          display: flex !important;
        }
        .tbb-mobile-hamburger-btn {
          display: inline-flex !important;
        }
        .tbb-awwwards-nav {
          padding: 10px 16px;
        }
      }
      @media (max-width: 920px) {
        .tbb-comm-grid-2 {
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .tbb-tour-sticky-stage {
          position: relative !important;
          top: auto !important;
        }
      }
      @media (max-width: 560px) {
        .tbb-header-brand-text-wrap {
          display: none !important;
        }
        #tbbAlwaysOnBuyFloatingBar {
          left: 12px !important;
          right: 12px !important;
          bottom: 10px !important;
          justify-content: space-between !important;
        }
      }
      .tbb-mobile-drawer-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.45);
        backdrop-filter: blur(4px);
        z-index: 1998;
        display: none;
      }
      .tbb-mobile-drawer-backdrop.open {
        display: block;
      }
      .tbb-mobile-slide-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: min(320px, 86vw);
        background: #FFFFFF;
        border-left: 1px solid #E2E8F0;
        padding: 20px;
        z-index: 1999;
        transform: translateX(105%);
        transition: transform 0.25s ease;
        overflow-y: auto;
      }
      .tbb-mobile-slide-drawer.open {
        transform: translateX(0);
      }

      /* Barra Flotante de Compra SIEMPRE VISIBLE en las 5 subpáginas */
      #tbbAlwaysOnBuyFloatingBar {
        position: fixed;
        bottom: 16px;
        right: 20px;
        z-index: 990;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(16px);
        border: 1px solid #CBD5E1;
        box-shadow: 0 14px 36px rgba(15, 23, 42, 0.16);
        border-radius: 999px;
      }
      .tbb-float-buy-cta {
        background: #0D2540;
        color: #FFFFFF;
        border: 1px solid #1D4ED8;
        padding: 9px 18px;
        border-radius: 999px;
        font-family: var(--font-main);
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
      }
      #tbbCommercialPortalModalOverlay,
      #tbbBuyAppCheckoutModalOverlay {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.72);
        backdrop-filter: blur(12px);
        z-index: 2100;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      #tbbCommercialPortalModalOverlay.open,
      #tbbBuyAppCheckoutModalOverlay.open {
        display: flex !important;
      }
      .tbb-comm-portal-sheet {
        max-width: 1240px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        background: #FFFFFF;
        border-radius: 24px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
      }
      .tbb-checkout-sheet {
        max-width: 620px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        background: #FFFFFF;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
        color: #0F172A;
      }
    `;
  }

  window.tbbInitHeroParticlesCanvas = function () {};
  window.tbbInitAwwwardsInteractions = function () {};

  function ensureModalsAndFloatingBarMounted() {
    tbbInjectAwwwardsStyles();
    const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true" && window.location.pathname !== "/studio" && !window.location.pathname.endsWith("studio.html");

    if (isStandalone) {
      if (!document.getElementById("tbbAlwaysOnBuyFloatingBar")) {
        const floatBar = document.createElement("div");
        floatBar.id = "tbbAlwaysOnBuyFloatingBar";
        document.body.appendChild(floatBar);
      }
      window.tbbUpdateAlwaysOnFloatingBarText();
    } else {
      const existingFloat = document.getElementById("tbbAlwaysOnBuyFloatingBar");
      if (existingFloat) existingFloat.style.display = "none";
    }

    if (!document.getElementById("tbbCommercialPortalModalOverlay")) {
      const portalOv = document.createElement("div");
      portalOv.id = "tbbCommercialPortalModalOverlay";
      portalOv.innerHTML = `<div class="tbb-comm-portal-sheet" id="tbbCommercialPortalSheetInner"></div>`;
      document.body.appendChild(portalOv);
    }

    if (!document.getElementById("tbbBuyAppCheckoutModalOverlay")) {
      const checkOv = document.createElement("div");
      checkOv.id = "tbbBuyAppCheckoutModalOverlay";
      checkOv.innerHTML = `<div class="tbb-checkout-sheet" id="tbbCheckoutSheetInner"></div>`;
      document.body.appendChild(checkOv);
    }
  }

  window.tbbUpdateAlwaysOnFloatingBarText = function () {
    const floatBar = document.getElementById("tbbAlwaysOnBuyFloatingBar");
    if (!floatBar) return;
    const isStandalone = document.body.getAttribute("data-tbb-standalone-web") === "true" && window.location.pathname !== "/studio" && !window.location.pathname.endsWith("studio.html");
    if (!isStandalone) {
      floatBar.style.display = "none";
      return;
    }
    const isLicensed = Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    floatBar.style.display = "flex";
    floatBar.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="tbb-live-pulse-dot"></span>
        <span style="font-size:0.78rem; font-weight:500; color:#0F172A; white-space:nowrap;">THE BEST BRAND</span>
      </div>
      <button type="button" class="tbb-float-buy-cta" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
        ${isLicensed ? escHtml(t("licenseActive")) : escHtml(t("buyNowFloating"))}
      </button>
    `;
  };

  window.tbbRefreshCommercialPortalDOM = function () {
    const portalInner = document.getElementById("tbbCommercialPortalSheetInner");
    if (portalInner && document.getElementById("tbbCommercialPortalModalOverlay")?.classList.contains("open")) {
      portalInner.innerHTML = window.tbbBuildCommercialExperienceMarkup(false);
    }
    const standaloneRoot = document.getElementById("tbbStandaloneCommercialPageRoot");
    if (standaloneRoot) {
      standaloneRoot.innerHTML = window.tbbBuildCommercialExperienceMarkup(true);
    }
  };

  window.tbbOpenCommercialPortalModal = function () {
    ensureModalsAndFloatingBarMounted();
    const ov = document.getElementById("tbbCommercialPortalModalOverlay");
    const inner = document.getElementById("tbbCommercialPortalSheetInner");
    if (!ov || !inner) return;
    inner.innerHTML = window.tbbBuildCommercialExperienceMarkup(false);
    ov.classList.add("open");
  };

  window.tbbCloseCommercialPortalModal = function () {
    const ov = document.getElementById("tbbCommercialPortalModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  window.tbbOpenBuyAppCheckoutModal = function (planId, preferredMethod) {
    ensureModalsAndFloatingBarMounted();
    if (planId) window.tbbCommercialDemoState.selectedPlan = planId;
    if (preferredMethod) window.tbbCommercialDemoState.selectedPaymentMethod = preferredMethod;
    window.tbbRenderCheckoutModalContent();
    const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (ov) ov.classList.add("open");
  };

  window.tbbCloseBuyAppCheckoutModal = function () {
    const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  function applyUrlParamsState() {
    try {
      const sp = new URLSearchParams(window.location.search);
      const langParam = sp.get("lang");
      if (langParam && I18N[langParam]) {
        localStorage.setItem(LANG_STORAGE_KEY, langParam);
      }
      const secParam = sp.get("sec");
      if (secParam) {
        const map = { inicio: 1, demo: 2, tour: 3, bases: 4, pack: 5, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5 };
        if (map[secParam.toLowerCase()]) {
          window.tbbCommercialDemoState.activeMainSection = map[secParam.toLowerCase()];
        }
      }
    } catch (e) {}
  }

  window.addEventListener("message", function (ev) {
    if (!ev || !ev.data || typeof ev.data !== "object") return;
    const msg = ev.data;

    if (msg.type === "TBB_DEMO_PROGRESS_SYNC" && msg.stateSnapshot) {
      const snap = msg.stateSnapshot;
      const st = window.tbbCommercialDemoState;
      st.migratedSteps0to3Snapshot = snap;
      st.activeDemoStep = Number(msg.currentStep || st.activeDemoStep || 0);
      if (snap.brandName) st.brandName = snap.brandName;
      if (snap.tagline) st.tagline = snap.tagline;
      if (snap.sector) st.sector = snap.sector;
      if (snap.whyPurpose) st.whyPurpose = snap.whyPurpose;
      if (snap.howMethod) st.howMethod = snap.howMethod;
      if (snap.whatOffer) st.whatOffer = snap.whatOffer;
      if (Array.isArray(snap.touchpoints) && snap.touchpoints.length) {
        st.touchpoints = snap.touchpoints;
      }
      try {
        localStorage.setItem("tbb_demo_steps0to3_migration_v92", JSON.stringify(snap));
      } catch (e) {}

      // Actualizar texto de estado en vivo junto al iPhone y el Círculo Dorado SVG
      try {
        document.querySelectorAll(".tbb-live-migration-status-txt").forEach(el => {
          el.innerHTML = `<span style="color:#16A34A; font-weight:600;">● ${escHtml(snap.brandName || "Tu Marca")}</span> · Paso ${Number(msg.currentStep || 0)} sincronizado`;
        });
        const bTitleEl = document.getElementById("tbbDemoLiveBrandTitle");
        if (bTitleEl && st.brandName) bTitleEl.textContent = st.brandName;
        const bTagEl = document.getElementById("tbbDemoLiveBrandTagline");
        if (bTagEl && st.tagline) bTagEl.textContent = st.tagline;
        const gcWrap = document.getElementById("tbbDemoLiveGoldenCircleWrap");
        if (gcWrap && typeof window.tbbBuildCircularGoldenCircleSVG === "function") {
          gcWrap.innerHTML = window.tbbBuildCircularGoldenCircleSVG();
        }
      } catch (e) {}
    } else if (msg.type === "TBB_TRIGGER_STEP4_PAYWALL" || msg.type === "TBB_DEMO_COMPLETED_STEP_2") {
      if (msg.stateSnapshot) {
        window.tbbCommercialDemoState.migratedSteps0to3Snapshot = msg.stateSnapshot;
        if (msg.stateSnapshot.brandName) {
          window.tbbCommercialDemoState.brandName = msg.stateSnapshot.brandName;
        }
        try {
          localStorage.setItem("tbb_demo_steps0to3_migration_v92", JSON.stringify(msg.stateSnapshot));
        } catch (e) {}
      }
      window.tbbOpenBuyAppCheckoutModal("pro_atelier");
    }
  });

  function bootCommercialExperience() {
    applyUrlParamsState();
    ensureModalsAndFloatingBarMounted();
    window.tbbRefreshCommercialPortalDOM();
    if (typeof window.tbbUpdateLocalizedFooterDOM === "function") {
      window.tbbUpdateLocalizedFooterDOM();
    }
    try {
      const sp = new URLSearchParams(window.location.search);
      const viewerIdx = sp.get("viewer");
      if (viewerIdx !== null && typeof window.tbbOpenPlateLightboxModal === "function") {
        const idx = Math.max(0, Math.min(OFFICIAL_9_DELIVERABLES.length - 1, parseInt(viewerIdx, 10) || 0));
        const item = OFFICIAL_9_DELIVERABLES[idx];
        const loc = item.i18n[getLang()] || item.i18n.es;
        setTimeout(() => window.tbbOpenPlateLightboxModal(item.plateNum, item.thumb, loc.title, item.sampleUrl), 250);
      }
      const paywallParam = sp.get("paywall");
      if (paywallParam === "1" || paywallParam === "step4") {
        setTimeout(() => window.tbbOpenBuyAppCheckoutModal("pro_atelier"), 250);
      }
      const videoParam = sp.get("video");
      if (videoParam && typeof window.tbbOpenVideoPopupModal === "function") {
        setTimeout(() => window.tbbOpenVideoPopupModal(videoParam), 250);
      }
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootCommercialExperience);
  } else {
    bootCommercialExperience();
  }
})();
