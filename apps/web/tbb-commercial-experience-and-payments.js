/**
 * ============================================================================
 * THE BEST BRAND — COMMERCIAL EXPERIENCE, SCROLLYTELLING & $49 PAYWALL ENGINE
 * Edición Clínica V105.0 · 200 Mejoras de Diseño, Animación e Internacionalización
 * - Protagonismo monumental del logotipo oficial "The Best Brand"
 * - Menú móvil y de escritorio 100% con iconografía vectorial propietaria (Cero Emojis)
 * - Cero nombres de herramientas internas (100% centrado en The Best Brand y Aura)
 * - Orden estricto de navegación: 1. Inicio | 2. App Tour | 3. Bases Teóricas | 4. Demo en Vivo | 5. Pack de Descargas
 * - Infografía Académica Interactiva en Bases Teóricas (Cero cápsulas de video del fundador en esa vista)
 * - Mockup interactivo de iPhone en App Tour (Scrollytelling) y Demo en Vivo (Código real /studio + Aura + Paywall $49 USD en Paso 4)
 * - Brandbook unificado a "más de 30 páginas (ajustable según el giro del negocio)"
 * ============================================================================
 */
(function () {
  "use strict";

  const LANG_STORAGE_KEY = "tbb_active_ui_lang_v52";
  const LICENSE_STORAGE_KEY = "tbb_pro_license_v56";
  const ASSET_VERSION = "105.0";

  // Iconografía Vectorial Propietaria Dual-Tone (Cero Emojis Genéricos)
  const TBB_ICONS = {
    home: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6.5h-5V21H4a1 1 0 0 1-1-1v-9.5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="10" r="2" fill="#FF7A00"/></svg>`,
    appTour: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" stroke-width="2"/><path d="M10 5.5h4" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.5" r="1.3" fill="#FF7A00"/></svg>`,
    theory: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="#426EAE" stroke-width="1.8"/><circle cx="12" cy="12" r="2" fill="#FF7A00"/></svg>`,
    demo: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M10 9l5 3-5 3V9z" fill="#FF7A00"/></svg>`,
    downloads: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 4v11m0 0l-4-4m4 4l4-4" stroke="#FF7A00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    play: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(255,122,0,0.14)" stroke="#FF7A00" stroke-width="1.8"/><path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="#FF7A00"/></svg>`,
    lock: `<svg class="tbb-svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2.5" stroke="currentColor" stroke-width="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`,
    unlock: `<svg class="tbb-svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2.5" stroke="#10B981" stroke-width="2"/><path d="M8 11V7a4 4 0 0 1 7.5-1.8" stroke="#10B981" stroke-width="2" stroke-linecap="round"/></svg>`,
    check: `<svg class="tbb-svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" fill="rgba(16,185,129,0.14)" stroke="#10B981" stroke-width="1.8"/><path d="M8 12.3l2.6 2.6 5.4-5.4" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    spark: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" fill="#FF7A00"/></svg>`,
    globe: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 12h17M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" stroke="#426EAE" stroke-width="1.6"/></svg>`,
    close: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    expand: `<svg class="tbb-svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 4h5v5M9 20H4v-5M20 4l-6 6M4 20l6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    phone: `<svg class="tbb-svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="18" r="1.2" fill="#FF7A00"/></svg>`,
    desktop: `<svg class="tbb-svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="4" width="19" height="13" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 20h8M12 17v3" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`,
    refresh: `<svg class="tbb-svg-ic" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 11a8 8 0 1 0 2 5.3M20 4v7h-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrowRight: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrowLeft: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5m0 0l5-5m-5 5l5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    shield: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.2 8.7-7 10-3.8-1.3-7-5-7-10V6l7-3z" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke="#FF7A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    card: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="#FF7A00" stroke-width="2"/></svg>`,
    volume: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H3v6h3l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`,
    book: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" stroke="currentColor" stroke-width="2"/><path d="M8 7h8M8 11h5" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`
  };
  window.TBB_ICONS = TBB_ICONS;

  const I18N = {
    es: {
      navHome: "1. Inicio",
      navAppTour: "2. App Tour",
      navTheory: "3. Bases Teóricas",
      navDemo: "4. Demo en Vivo",
      navDownloads: "5. Pack de Descargas",
      navBuyCta: "Desbloquear Marca · $49 USD",
      navLicenseActive: "Licencia Pro Activa",
      heroEyebrow: "THE BEST BRAND · ARQUITECTURA CIENTÍFICA DE IDENTIDAD CON AURA",
      heroTitleLine1: "Donde la Ciencia Estratégica",
      heroTitleHighlight: "Se Convierte en tu Marca",
      heroLead: "El Círculo Dorado, el Modelo SMILE, los Touchpoints, la Ingeniería Kaizen y el Diferencial de Osgood convergen orgánicamente junto a Aura para construir tu identidad visual y tu Brandbook oficial de más de 30 páginas (ajustable según el giro del negocio).",
      heroCtaTour: "Explorar el App Tour Interactivo",
      heroCtaTheory: "Ver Infografía de Bases Teóricas",
      heroCtaDemo: "Probar Demo en Vivo (Pasos 1-3 Gratis)",
      heroVideoBadge: "CONVERGENCIA CONCEPTUAL EN VIVO · TEORÍAS → LOGOTIPO THE BEST BRAND",
      heroInteractiveStageTitle: "Fusión Orgánica: 5 Pilares Científicos hacia The Best Brand",
      heroInteractiveStageSub: "Haz clic en cada nodo teórico o reproduce la convergencia para observar cómo cada metodología estructura tu marca en tiempo real.",
      heroConvergencePlayBtn: "Activar Fusión hacia el Logotipo",
      tourEyebrow: "SECCIÓN 2 · RECORRIDO INTERACTIVO EN MÓVIL, TABLET O COMPUTADORA",
      tourTitle: "El Mapa de Recorrido como Base y Cada Paso en Capa Superior al Hacer Scroll",
      tourLead: "Úsala con total fluidez en tu móvil, tablet o computadora. Mantén el Mapa de Recorrido completo de la aplicación como base constante mientras al hacer scroll emerge en una capa superior lo que revisas en cada paso, intercalando capturas reales, texto explicativo e imágenes.",
      tourDeviceBadge: "DISPONIBLE EN MÓVIL · TABLET · COMPUTADORA (100% SINCRONIZADO EN LA NUBE)",
      tourDeviceMobile: "Móvil",
      tourDeviceTablet: "Tablet",
      tourDeviceDesktop: "Computadora",
      tourIphoneModeCutout: "Mapa Base + Capa Superior",
      tourIphoneModeLive: "App Real en Vivo",
      tourWatchStepCapsule: "Ver Cápsula Explicativa",
      tourBeforeAfterTitle: "Evolución Vectorial Inteligente: De Boceto o Logo Actual a Identidad Maestra",
      tourBeforeAfterSub: "Si ya cuentas con un logotipo, Aura preserva tu capital visual (Aaker & Haviv) y perfecciona su geometría y acabado.",
      theoryEyebrow: "SECCIÓN 3 · INFOGRAFÍA DINÁMICA DE BASES TEÓRICAS Y AUTORES",
      theoryTitle: "Arquitectura Científica Paso a Paso: Las Teorías que Respaldan tu Marca",
      theoryLead: "Explora nuestra infografía interactiva y responsiva para móvil, tablet o computadora. Cada etapa de The Best Brand está fundamentada en modelos académicos probados, diagramas geométricos vivos y autores de referencia mundial.",
      theoryInteractiveSimulatorTitle: "Simulador Interactivo Kansei & Diferencial Semántico de Osgood (Paso 4)",
      theoryInteractiveSimulatorSub: "Ajusta los ejes emocionales en vivo y observa cómo la geometría paramétrica transforma la tensión, el radio de curvatura y el carácter tipográfico.",
      theoryAuthorsSectionTitle: "Autores y Modelos que Estructuran cada Etapa",
      theoryBooksSectionTitle: "Bibliografía Esencial de Dirección Estratégica y Diseño",
      demoEyebrow: "SECCIÓN 4 · DEMO INTERACTIVA EN VIVO CON AURA (MÓVIL, TABLET O COMPUTADORA)",
      demoTitle: "Vive la Experiencia Real en Móvil, Tablet o Computadora: Pasos 1 al 3 Gratis",
      demoLead: "Interactúa directamente con Aura desde cualquier dispositivo (vista móvil, tablet o pantalla completa de computadora). Avanza gratis por los primeros 3 pasos reales; al pasar al Paso 4, activa tu licencia de $49 USD con migración automática de todas tus respuestas.",
      demoModeIphone: "Vista Dispositivo Móvil / Tablet",
      demoModeFull: "Vista Computadora / Pantalla Completa",
      demoFreeStepsBadge: "PASOS 0, 1, 2 Y 3 GRATIS EN VIVO",
      demoPaywallStep4Badge: "PASO 4 ACTIVA LICENCIA PRO ($49 USD) CON MIGRACIÓN AUTOMÁTICA",
      demoUnlockBtn: "Desbloquear Paso 4 al 6 + Brandbook (+30 Páginas) · $49 USD",
      downloadsEyebrow: "SECCIÓN 5 · CONSOLIDACIÓN DE ENTREGABLES Y BÓVEDA EJECUTIVA",
      downloadsTitle: "Tu Brandbook Oficial de Más de 30 Páginas y Kit Completo de Producción",
      downloadsLead: "Unificamos todos tus activos en un solo paquete ejecutivo descargable en móvil, tablet o computadora: tu Brandbook oficial de más de 30 páginas (ajustable según el giro del negocio), suite vectorial de logotipos en curvas (.SVG, .AI, .EPS, .PNG), plantillas corporativas y tipografías.",
      downloadsStandardBadge: "ESTÁNDAR OFICIAL UNIFICADO · BRANDBOOK DE MÁS DE 30 PÁGINAS (AJUSTABLE SEGÚN EL GIRO)",
      downloadsViewSampleBtn: "Inspeccionar Muestra en Alta Resolución",
      downloadsUnlockAllBtn: "Obtener los 9 Entregables Oficiales · $49 USD",
      lightboxPrev: "Anterior",
      lightboxNext: "Siguiente",
      lightboxClose: "Cerrar Visor",
      checkoutTitle: "Activa tu Licencia Pro ($49 USD) y Continúa al Paso 4 sin Perder tu Progreso",
      checkoutSub: "Crearemos tu cuenta ejecutiva y migraremos automáticamente todas tus respuestas de los Pasos 0 al 3 para que continúes en el Paso 4 desde tu móvil, tablet o computadora.",
      checkoutMigrationTitle: "Migración Automática Garantizada (Pasos 0 al 3 → Paso 4)",
      checkoutAccountLabel: "Correo electrónico para tu cuenta y respaldo en la nube",
      checkoutNameLabel: "Nombre del titular o fundador",
      checkoutPayBtn: "Pagar $49 USD, Crear Cuenta y Continuar al Paso 4"
    },
    en: {
      navHome: "1. Home",
      navAppTour: "2. App Tour",
      navTheory: "3. Theoretical Foundations",
      navDemo: "4. Live Demo",
      navDownloads: "5. Download Pack",
      navBuyCta: "Unlock Brand · $49 USD",
      navLicenseActive: "Pro License Active",
      heroEyebrow: "THE BEST BRAND · SCIENTIFIC BRAND ARCHITECTURE WITH AURA",
      heroTitleLine1: "Where Strategic Science",
      heroTitleHighlight: "Becomes Your Brand",
      heroLead: "The Golden Circle, the SMILE Model, Touchpoints, Kaizen Engineering, and Osgood's Semantic Differential converge organically with Aura to build your visual identity and your official Brandbook of over 30 pages (adaptable to your business sector).",
      heroCtaTour: "Explore Interactive App Tour",
      heroCtaTheory: "View Theoretical Infographic",
      heroCtaDemo: "Try Live Demo (Steps 1-3 Free)",
      heroVideoBadge: "LIVE CONCEPTUAL CONVERGENCE · THEORIES → THE BEST BRAND LOGO",
      heroInteractiveStageTitle: "Organic Fusion: 5 Scientific Pillars into The Best Brand",
      heroInteractiveStageSub: "Click any theoretical node or play the convergence to see how each methodology structures your brand in real time.",
      heroConvergencePlayBtn: "Trigger Logo Convergence",
      tourEyebrow: "SECTION 2 · INTERACTIVE TOUR ON MOBILE, TABLET, OR COMPUTER",
      tourTitle: "The Complete App Journey Map as Base & Upper Layer Inspection on Scroll",
      tourLead: "Use it seamlessly on your mobile phone, tablet, or computer. Keep the complete application Journey Map as a consistent base while scrolling reveals an interactive upper layer for each step—interleaving real screenshots, explanatory text, and visual graphics.",
      tourDeviceBadge: "AVAILABLE ON MOBILE · TABLET · COMPUTER (100% CLOUD-SYNCED)",
      tourDeviceMobile: "Mobile",
      tourDeviceTablet: "Tablet",
      tourDeviceDesktop: "Computer",
      tourIphoneModeCutout: "Base Map + Upper Layer",
      tourIphoneModeLive: "Live Interactive App",
      tourWatchStepCapsule: "Watch Explanatory Capsule",
      tourBeforeAfterTitle: "Intelligent Vector Evolution: From Sketch or Current Logo to Master Identity",
      tourBeforeAfterSub: "If you already have a logo, Aura preserves your visual equity (Aaker & Haviv) while refining its geometry and finish.",
      theoryEyebrow: "SECTION 3 · DYNAMIC THEORETICAL FOUNDATIONS & AUTHORS INFOGRAPHIC",
      theoryTitle: "Step-by-Step Scientific Architecture: The Theories Backing Your Brand",
      theoryLead: "Explore our responsive academic infographic on mobile, tablet, or computer. Every stage of The Best Brand is grounded in proven frameworks, live geometric diagrams, and world-renowned authors.",
      theoryInteractiveSimulatorTitle: "Interactive Kansei & Osgood Semantic Differential Simulator (Step 4)",
      theoryInteractiveSimulatorSub: "Adjust the emotional axes live and watch how parametric geometry transforms tension, corner radius, and typographic character.",
      theoryAuthorsSectionTitle: "Authors & Frameworks Structuring Every Stage",
      theoryBooksSectionTitle: "Essential Strategy & Brand Design Bibliography",
      demoEyebrow: "SECTION 4 · LIVE INTERACTIVE DEMO WITH AURA (MOBILE, TABLET, OR COMPUTER)",
      demoTitle: "Experience the Real App on Mobile, Tablet, or Computer: Steps 1 to 3 Free",
      demoLead: "Interact directly with Aura from any device (mobile, tablet, or full computer screen). Advance freely through the first 3 real steps; when entering Step 4, unlock your $49 USD Pro license with automatic migration of all your answers.",
      demoModeIphone: "Mobile / Tablet View",
      demoModeFull: "Computer / Fullscreen View",
      demoFreeStepsBadge: "STEPS 0, 1, 2 & 3 FREE LIVE",
      demoPaywallStep4Badge: "STEP 4 TRIGGERS PRO LICENSE ($49 USD) WITH AUTO-MIGRATION",
      demoUnlockBtn: "Unlock Steps 4 to 6 + Brandbook (30+ Pages) · $49 USD",
      downloadsEyebrow: "SECTION 5 · CONSOLIDATED DELIVERABLES & EXECUTIVE VAULT",
      downloadsTitle: "Your Official 30+ Page Brandbook & Complete Production Kit",
      downloadsLead: "All your brand assets unified under one standard for mobile, tablet, or computer: your official Brandbook of over 30 pages (adaptable to your business sector), vector logo suite (.SVG, .AI, .EPS, .PNG), corporate templates, and fonts.",
      downloadsStandardBadge: "UNIFIED OFFICIAL STANDARD · 30+ PAGE BRANDBOOK (ADAPTABLE TO YOUR SECTOR)",
      downloadsViewSampleBtn: "Inspect High-Resolution Sample",
      downloadsUnlockAllBtn: "Get All 9 Official Deliverables · $49 USD",
      lightboxPrev: "Previous",
      lightboxNext: "Next",
      lightboxClose: "Close Viewer",
      checkoutTitle: "Activate Your Pro License ($49 USD) & Continue to Step 4 Without Losing Progress",
      checkoutSub: "We create your executive account and automatically migrate all your answers from Steps 0 to 3 so you continue seamlessly in Step 4 on mobile, tablet, or computer.",
      checkoutMigrationTitle: "Guaranteed Automatic Migration (Steps 0 to 3 → Step 4)",
      checkoutAccountLabel: "Email address for your account & cloud backup",
      checkoutNameLabel: "Founder or account holder name",
      checkoutPayBtn: "Pay $49 USD, Create Account & Continue to Step 4"
    },
    fr: {
      navHome: "1. Accueil",
      navAppTour: "2. App Tour",
      navTheory: "3. Bases Théoriques",
      navDemo: "4. Démo en Direct",
      navDownloads: "5. Pack de Téléchargement",
      navBuyCta: "Débloquer Marque · 49 $ USD",
      navLicenseActive: "Licence Pro Active",
      heroEyebrow: "THE BEST BRAND · ARCHITECTURE SCIENTIFIQUE D'IDENTITÉ AVEC AURA",
      heroTitleLine1: "Où la Science Stratégique",
      heroTitleHighlight: "Devient Votre Marque",
      heroLead: "Le Cercle d'Or, le Modèle SMILE, les Touchpoints, l'Ingénierie Kaizen et le Différentiel d'Osgood convergent organiquement avec Aura pour créer votre identité visuelle et votre Brandbook officiel de plus de 30 pages (adaptable selon votre secteur d'activité).",
      heroCtaTour: "Explorer l'App Tour Interactif",
      heroCtaTheory: "Voir l'Infographie Théorique",
      heroCtaDemo: "Essayer la Démo en Direct (Étapes 1-3 Gratuites)",
      heroVideoBadge: "CONVERGENCE CONCEPTUELLE EN DIRECT · THÉORIES → LOGO THE BEST BRAND",
      heroInteractiveStageTitle: "Fusion Organique : 5 Piliers Scientifiques vers The Best Brand",
      heroInteractiveStageSub: "Cliquez sur chaque nœud théorique ou lancez la convergence pour observer comment chaque méthodologie structure votre marque.",
      heroConvergencePlayBtn: "Activer la Fusion vers le Logo",
      tourEyebrow: "SECTION 2 · PARCOURS INTERACTIF SUR MOBILE, TABLETTE OU ORDINATEUR",
      tourTitle: "La Carte du Parcours en Base et Chaque Étape en Couche Supérieure au Défilement",
      tourLead: "Utilisez-la avec fluidité sur mobile, tablette ou ordinateur. Gardez la Carte du Parcours complète comme base constante tandis que le défilement fait apparaître en couche supérieure ce qui est révisé à chaque étape, en alternant captures d'écran, textes et images.",
      tourDeviceBadge: "DISPONIBLE SUR MOBILE · TABLETTE · ORDINATEUR (100 % SYNCHRONISÉ)",
      tourDeviceMobile: "Mobile",
      tourDeviceTablet: "Tablette",
      tourDeviceDesktop: "Ordinateur",
      tourIphoneModeCutout: "Carte de Base + Couche Supérieure",
      tourIphoneModeLive: "App Réelle Interactive",
      tourWatchStepCapsule: "Voir la Capsule Explicative",
      tourBeforeAfterTitle: "Évolution Vectorielle Intelligente : Du Croquis ou Logo Actuel à l'Identité Maîtresse",
      tourBeforeAfterSub: "Si vous avez déjà un logo, Aura préserve votre capital visuel (Aaker & Haviv) et perfectionne sa géométrie.",
      theoryEyebrow: "SECTION 3 · INFOGRAPHIE DYNAMIQUE DES BASES THÉORIQUES ET AUTEURS",
      theoryTitle: "Architecture Scientifique Étape par Étape : Les Théories qui Soutiennent Votre Marque",
      theoryLead: "Explorez notre infographie académique responsive sur mobile, tablette ou ordinateur. Chaque étape de The Best Brand repose sur des modèles éprouvés, des diagrammes géométriques interactifs et des auteurs de référence mondiale.",
      theoryInteractiveSimulatorTitle: "Simulateur Interactif Kansei & Différentiel Sémantique d'Osgood (Étape 4)",
      theoryInteractiveSimulatorSub: "Ajustez les axes émotionnels en direct et observez comment la géométrie paramétrique transforme la tension et le caractère typographique.",
      theoryAuthorsSectionTitle: "Auteurs et Modèles Structurant Chaque Étape",
      theoryBooksSectionTitle: "Bibliographie Essentielle de Stratégie et Design de Marque",
      demoEyebrow: "SECTION 4 · DÉMO INTERACTIVE EN DIRECT AVEC AURA (MOBILE, TABLETTE OU ORDINATEUR)",
      demoTitle: "Vivez l'Expérience Réelle sur Mobile, Tablette ou Ordinateur : Étapes 1 à 3 Gratuites",
      demoLead: "Interagissez directement avec Aura depuis tout appareil (vue mobile, tablette ou plein écran d'ordinateur). Avancez gratuitement dans les 3 premières étapes réelles ; à l'Étape 4, activez votre licence à 49 $ USD avec migration automatique de toutes vos réponses.",
      demoModeIphone: "Vue Mobile / Tablette",
      demoModeFull: "Vue Ordinateur / Plein Écran",
      demoFreeStepsBadge: "ÉTAPES 0, 1, 2 ET 3 GRATUITES EN DIRECT",
      demoPaywallStep4Badge: "L'ÉTAPE 4 ACTIVE LA LICENCE PRO (49 $ USD) AVEC MIGRATION AUTO",
      demoUnlockBtn: "Débloquer Étapes 4 à 6 + Brandbook (+30 Pages) · 49 $ USD",
      downloadsEyebrow: "SECTION 5 · CONSOLIDATION DES LIVRABLES ET VOÛTE EXÉCUTIVE",
      downloadsTitle: "Votre Brandbook Officiel de Plus de 30 Pages et Kit Complet de Production",
      downloadsLead: "Tous vos actifs réunis sous un standard unique sur mobile, tablette ou ordinateur : votre Brandbook officiel de plus de 30 pages (adaptable selon votre secteur d'activité), suite vectorielle (.SVG, .AI, .EPS, .PNG), modèles corporatifs et polices.",
      downloadsStandardBadge: "STANDARD OFFICIEL UNIFIÉ · BRANDBOOK DE PLUS DE 30 PAGES (ADAPTABLE SELON VOTRE SECTEUR)",
      downloadsViewSampleBtn: "Inspecter l'Aperçu Haute Résolution",
      downloadsUnlockAllBtn: "Obtenir les 9 Livrables Officiels · 49 $ USD",
      lightboxPrev: "Précédent",
      lightboxNext: "Suivant",
      lightboxClose: "Fermer",
      checkoutTitle: "Activez Votre Licence Pro (49 $ USD) et Continuez à l'Étape 4 Sans Perdre Votre Progression",
      checkoutSub: "Nous créons votre compte et migrons automatiquement toutes vos réponses des Étapes 0 à 3 pour continuer immédiatement à l'Étape 4 sur mobile, tablette ou ordinateur.",
      checkoutMigrationTitle: "Migration Automatique Garantie (Étapes 0 à 3 → Étape 4)",
      checkoutAccountLabel: "Adresse e-mail pour votre compte et sauvegarde cloud",
      checkoutNameLabel: "Nom du fondateur ou titulaire",
      checkoutPayBtn: "Payer 49 $ USD, Créer le Compte et Continuer à l'Étape 4"
    },
    pt: {
      navHome: "1. Início",
      navAppTour: "2. App Tour",
      navTheory: "3. Bases Teóricas",
      navDemo: "4. Demo ao Vivo",
      navDownloads: "5. Pack de Descargas",
      navBuyCta: "Desbloquear Marca · $49 USD",
      navLicenseActive: "Licença Pro Ativa",
      heroEyebrow: "THE BEST BRAND · ARQUITETURA CIENTÍFICA DE IDENTIDADE COM A AURA",
      heroTitleLine1: "Onde a Ciência Estratégica",
      heroTitleHighlight: "Se Torna a Sua Marca",
      heroLead: "O Círculo Dourado, o Modelo SMILE, os Touchpoints, a Engenharia Kaizen e o Diferencial de Osgood convergem organicamente com a Aura para criar a sua identidade visual e o seu Brandbook oficial com mais de 30 páginas (ajustável conforme o ramo do negócio).",
      heroCtaTour: "Explorar o App Tour Interativo",
      heroCtaTheory: "Ver Infografia de Bases Teóricas",
      heroCtaDemo: "Testar Demo ao Vivo (Passos 1-3 Grátis)",
      heroVideoBadge: "CONVERGÊNCIA CONCETUAL AO VIVO · TEORIAS → LOGÓTIPO THE BEST BRAND",
      heroInteractiveStageTitle: "Fusão Orgânica: 5 Pilares Científicos em Direção à The Best Brand",
      heroInteractiveStageSub: "Clique em cada nó teórico ou reproduza a convergência para ver como cada metodologia estrutura a sua marca em tempo real.",
      heroConvergencePlayBtn: "Ativar Fusão para o Logótipo",
      tourEyebrow: "SECÇÃO 2 · PERCURSO INTERATIVO EM TELEMÓVEL, TABLET OU COMPUTADOR",
      tourTitle: "O Mapa de Percurso como Base e Cada Passo em Camada Superior ao Fazer Scroll",
      tourLead: "Utilize com total fluidez no telemóvel, tablet ou computador. Mantenha o Mapa de Percurso completo da aplicação como base constante enquanto o scroll revela numa camada superior o que é revisto em cada passo, intercalando capturas reais, texto e imagens.",
      tourDeviceBadge: "DISPONÍVEL EM TELEMÓVEL · TABLET · COMPUTADOR (100% SINCRONIZADO)",
      tourDeviceMobile: "Telemóvel",
      tourDeviceTablet: "Tablet",
      tourDeviceDesktop: "Computador",
      tourIphoneModeCutout: "Mapa Base + Camada Superior",
      tourIphoneModeLive: "App Real Interativa",
      tourWatchStepCapsule: "Ver Cápsula Explicativa",
      tourBeforeAfterTitle: "Evolução Vetorial Inteligente: De Esboço ou Logo Atual para Identidade Mestra",
      tourBeforeAfterSub: "Se já tem um logótipo, a Aura preserva o seu património visual (Aaker & Haviv) e aperfeiçoa a sua geometria.",
      theoryEyebrow: "SECÇÃO 3 · INFOGRAFIA DINÂMICA DE BASES TEÓRICAS E AUTORES",
      theoryTitle: "Arquitetura Científica Passo a Passo: As Teorias que Sustentam a Sua Marca",
      theoryLead: "Explore a nossa infografia académica responsiva em telemóvel, tablet ou computador. Cada etapa da The Best Brand baseia-se em modelos comprovados, diagramas geométricos vivos e autores de referência mundial.",
      theoryInteractiveSimulatorTitle: "Simulador Interativo Kansei & Diferencial Semântico de Osgood (Passo 4)",
      theoryInteractiveSimulatorSub: "Ajuste os eixos emocionais ao vivo e observe como a geometria paramétrica transforma a tensão e o caráter tipográfico.",
      theoryAuthorsSectionTitle: "Autores e Modelos que Estruturam Cada Etapa",
      theoryBooksSectionTitle: "Bibliografia Essencial de Estratégia e Design de Marca",
      demoEyebrow: "SECÇÃO 4 · DEMO INTERATIVA AO VIVO COM A AURA (TELEMÓVEL, TABLET OU COMPUTADOR)",
      demoTitle: "Viva a Experiência Real em Telemóvel, Tablet ou Computador: Passos 1 a 3 Gratuitos",
      demoLead: "Interaja diretamente com a Aura a partir de qualquer dispositivo (vista móvel, tablet ou ecrã inteiro de computador). Avance gratuitamente pelos primeiros 3 passos reais; ao aceder ao Passo 4, ative a sua licença de $49 USD com migração automática de todas as respostas.",
      demoModeIphone: "Vista Telemóvel / Tablet",
      demoModeFull: "Vista Computador / Ecrã Inteiro",
      demoFreeStepsBadge: "PASSOS 0, 1, 2 E 3 GRÁTIS AO VIVO",
      demoPaywallStep4Badge: "PASSO 4 ATIVA LICENÇA PRO ($49 USD) COM MIGRAÇÃO AUTOMÁTICA",
      demoUnlockBtn: "Desbloquear Passos 4 a 6 + Brandbook (+30 Páginas) · $49 USD",
      downloadsEyebrow: "SECÇÃO 5 · CONSOLIDAÇÃO DE ENTREGÁVEIS E COFRE EXECUTIVO",
      downloadsTitle: "O Seu Brandbook Oficial com Mais de 30 Páginas e Kit Completo de Produção",
      downloadsLead: "Unificamos todos os seus ativos num único pacote executivo para telemóvel, tablet ou computador: o seu Brandbook oficial com mais de 30 páginas (ajustável conforme o ramo do negócio), suite vetorial (.SVG, .AI, .EPS, .PNG), modelos corporativos e fontes.",
      downloadsStandardBadge: "PADRÃO OFICIAL UNIFICADO · BRANDBOOK COM MAIS DE 30 PÁGINAS (AJUSTÁVEL AO SEU RAMO)",
      downloadsViewSampleBtn: "Inspecionar Amostra em Alta Resolução",
      downloadsUnlockAllBtn: "Obter os 9 Entregáveis Oficiais · $49 USD",
      lightboxPrev: "Anterior",
      lightboxNext: "Seguinte",
      lightboxClose: "Fechar",
      checkoutTitle: "Ative a Sua Licença Pro ($49 USD) e Continue para o Passo 4 Sem Perder o Progresso",
      checkoutSub: "Criamos a sua conta executiva e migramos automaticamente todas as respostas dos Passos 0 a 3 para continuar de imediato no Passo 4 em telemóvel, tablet ou computador.",
      checkoutMigrationTitle: "Migração Automática Garantida (Passos 0 a 3 → Passo 4)",
      checkoutAccountLabel: "E-mail para a sua conta e cópia de segurança na nuvem",
      checkoutNameLabel: "Nome do fundador ou titular",
      checkoutPayBtn: "Pagar $49 USD, Criar Conta e Continuar no Passo 4"
    },
    de: {
      navHome: "1. Start",
      navAppTour: "2. App Tour",
      navTheory: "3. Theoretische Grundlagen",
      navDemo: "4. Live-Demo",
      navDownloads: "5. Download-Paket",
      navBuyCta: "Marke Freischalten · $49 USD",
      navLicenseActive: "Pro-Lizenz Aktiv",
      heroEyebrow: "THE BEST BRAND · WISSENSCHAFTLICHE MARKENARCHITEKTUR MIT AURA",
      heroTitleLine1: "Wo Strategische Wissenschaft",
      heroTitleHighlight: "Zu Ihrer Marke Wird",
      heroLead: "Der Golden Circle, das SMILE-Modell, Touchpoints, Kaizen-Engineering und das Osgood-Differential verschmelzen organisch mit Aura zu Ihrer visuellen Identität und Ihrem offiziellen Brandbook mit über 30 Seiten (anpassbar je nach Branche).",
      heroCtaTour: "Interaktive App Tour Starten",
      heroCtaTheory: "Theorie-Infografik Ansehen",
      heroCtaDemo: "Live-Demo Testen (Schritte 1-3 Gratis)",
      heroVideoBadge: "KONZEPTUELLE LIVE-KONVERGENZ · THEORIEN → THE BEST BRAND LOGO",
      heroInteractiveStageTitle: "Organische Fusion: 5 Wissenschaftliche Säulen zu The Best Brand",
      heroInteractiveStageSub: "Klicken Sie auf einen Theorieknoten oder starten Sie die Konvergenz, um zu sehen, wie jede Methodik Ihre Marke strukturiert.",
      heroConvergencePlayBtn: "Logo-Fusion Aktivieren",
      tourEyebrow: "ABSCHNITT 2 · INTERAKTIVER RUNDGANG AUF MOBILGERÄT, TABLET ODER COMPUTER",
      tourTitle: "Die Komplette App-Prozesskarte als Basis & Obere Ebene beim Scrollen",
      tourLead: "Nutzen Sie die Plattform nahtlos auf Mobilgerät, Tablet oder Computer. Die vollständige Prozesskarte bleibt als konsistente Basis sichtbar, während beim Scrollen in einer oberen Ebene erscheint, was in jedem Schritt geprüft wird – im Wechsel aus echten Screenshots, Text und Grafiken.",
      tourDeviceBadge: "VERFÜGBAR AUF MOBILGERÄT · TABLET · COMPUTER (100 % CLOUD-SYNCHRONISIERT)",
      tourDeviceMobile: "Mobilgerät",
      tourDeviceTablet: "Tablet",
      tourDeviceDesktop: "Computer",
      tourIphoneModeCutout: "Basiskarte + Obere Ebene",
      tourIphoneModeLive: "Echte Interaktive App",
      tourWatchStepCapsule: "Erklärkapsel Ansehen",
      tourBeforeAfterTitle: "Intelligente Vektor-Evolution: Vom Entwurf oder Aktuellen Logo zur Meister-Identität",
      tourBeforeAfterSub: "Wenn Sie bereits ein Logo haben, bewahrt Aura Ihr visuelles Kapital (Aaker & Haviv) und perfektioniert die Geometrie.",
      theoryEyebrow: "ABSCHNITT 3 · DYNAMISCHE INFOGRAFIK DER THEORIEN UND AUTOREN",
      theoryTitle: "Wissenschaftliche Architektur Schritt für Schritt: Die Theorien Hinter Ihrer Marke",
      theoryLead: "Entdecken Sie unsere responsive akademische Infografik auf Mobilgerät, Tablet oder Computer. Jeder Schritt von The Best Brand basiert auf bewährten Modellen, interaktiven Diagrammen und weltweit führenden Autoren.",
      theoryInteractiveSimulatorTitle: "Interaktiver Kansei- & Osgood-Differential-Simulator (Schritt 4)",
      theoryInteractiveSimulatorSub: "Kalibrieren Sie die emotionalen Achsen live und beobachten Sie, wie parametrische Geometrie Spannung und Typografie verändert.",
      theoryAuthorsSectionTitle: "Autoren und Modelle Jeder Entwicklungsstufe",
      theoryBooksSectionTitle: "Essenzielle Fachliteratur für Markenstrategie & Design",
      demoEyebrow: "ABSCHNITT 4 · INTERAKTIVE LIVE-DEMO MIT AURA (MOBILGERÄT, TABLET ODER COMPUTER)",
      demoTitle: "Erleben Sie die Echte App auf Mobilgerät, Tablet oder Computer: Schritte 1 bis 3 Kostenlos",
      demoLead: "Interagieren Sie direkt mit Aura auf jedem Gerät (Mobil-, Tablet- oder Computer-Vollbildansicht). Durchlaufen Sie die ersten 3 echten Schritte kostenlos; beim Wechsel zu Schritt 4 schalten Sie Ihre $49 USD Lizenz mit automatischer Datenmigration frei.",
      demoModeIphone: "Mobil- / Tablet-Ansicht",
      demoModeFull: "Computer- / Vollbildansicht",
      demoFreeStepsBadge: "SCHRITTE 0, 1, 2 & 3 KOSTENLOS LIVE",
      demoPaywallStep4Badge: "SCHRITT 4 AKTIVIERT PRO-LIZENZ ($49 USD) MIT AUTO-MIGRATION",
      demoUnlockBtn: "Schritte 4 bis 6 + Brandbook (+30 Seiten) Freischalten · $49 USD",
      downloadsEyebrow: "ABSCHNITT 5 · KONSOLIDIERTE DELIVERABLES & EXECUTIVE-TRESOR",
      downloadsTitle: "Ihr Offizielles Brandbook mit Über 30 Seiten & Komplettes Produktions-Kit",
      downloadsLead: "Alle Marken-Assets vereint für Mobilgerät, Tablet oder Computer: Ihr offizielles Brandbook mit über 30 Seiten (anpassbar je nach Branche), Vektor-Logo-Suite (.SVG, .AI, .EPS, .PNG), Unternehmensvorlagen und Schriften.",
      downloadsStandardBadge: "EINHEITLICHER STANDARD · BRANDBOOK MIT ÜBER 30 SEITEN (BRANCHENANPASSBAR)",
      downloadsViewSampleBtn: "Hochauflösende Vorschau Öffnen",
      downloadsUnlockAllBtn: "Alle 9 Offiziellen Deliverables Erhalten · $49 USD",
      lightboxPrev: "Zurück",
      lightboxNext: "Weiter",
      lightboxClose: "Schließen",
      checkoutTitle: "Pro-Lizenz Aktivieren ($49 USD) & Nahtlos mit Schritt 4 Fortfahren",
      checkoutSub: "Wir erstellen Ihr Konto und migrieren automatisch alle Antworten aus den Schritten 0 bis 3, damit Sie sofort in Schritt 4 auf Mobilgerät, Tablet oder Computer weitermachen.",
      checkoutMigrationTitle: "Garantierte Automatische Migration (Schritte 0 bis 3 → Schritt 4)",
      checkoutAccountLabel: "E-Mail-Adresse für Ihr Konto & Cloud-Backup",
      checkoutNameLabel: "Name des Gründers oder Kontoinhabers",
      checkoutPayBtn: "$49 USD Bezahlen, Konto Erstellen & zu Schritt 4"
    },
    it: {
      navHome: "1. Inizio",
      navAppTour: "2. App Tour",
      navTheory: "3. Basi Teoriche",
      navDemo: "4. Demo dal Vivo",
      navDownloads: "5. Pack di Download",
      navBuyCta: "Sblocca Brand · $49 USD",
      navLicenseActive: "Licenza Pro Attiva",
      heroEyebrow: "THE BEST BRAND · ARCHITETTURA SCIENTIFICA D'IDENTITÀ CON AURA",
      heroTitleLine1: "Dove la Scienza Strategica",
      heroTitleHighlight: "Diventa il Tuo Brand",
      heroLead: "Il Cerchio d'Oro, il Modello SMILE, i Touchpoint, l'Ingegneria Kaizen e il Differenziale di Osgood convergono organicamente con Aura per costruire la tua identità visiva e il tuo Brandbook ufficiale di oltre 30 pagine (adattabile al settore aziendale).",
      heroCtaTour: "Esplora l'App Tour Interattivo",
      heroCtaTheory: "Vedi Infografica delle Basi Teoriche",
      heroCtaDemo: "Prova la Demo dal Vivo (Passi 1-3 Gratis)",
      heroVideoBadge: "CONVERGENZA CONCETTUALE DAL VIVO · TEORIE → LOGO THE BEST BRAND",
      heroInteractiveStageTitle: "Fusione Organica: 5 Pilastri Scientifici verso The Best Brand",
      heroInteractiveStageSub: "Clicca su ogni nodo teorico o avvia la convergenza per osservare come ogni metodologia struttura il tuo brand in tempo reale.",
      heroConvergencePlayBtn: "Attiva Fusione verso il Logo",
      tourEyebrow: "SEZIONE 2 · PERCORSO INTERATTIVO SU MOBILE, TABLET O COMPUTER",
      tourTitle: "La Mappa di Percorso come Base e Ogni Passo in Livello Superiore allo Scroll",
      tourLead: "Usala con totale fluidità su mobile, tablet o computer. Mantieni la Mappa di Percorso completa dell'applicazione come base costante mentre scorrendo appare in un livello superiore ciò che viene esaminato in ogni passo, alternando screenshot reali, testo e immagini.",
      tourDeviceBadge: "DISPONIBILE SU MOBILE · TABLET · COMPUTER (100% SINCRONIZZATO NEL CLOUD)",
      tourDeviceMobile: "Mobile",
      tourDeviceTablet: "Tablet",
      tourDeviceDesktop: "Computer",
      tourIphoneModeCutout: "Mappa Base + Livello Superiore",
      tourIphoneModeLive: "App Reale Interattiva",
      tourWatchStepCapsule: "Guarda Capsula Esplicativa",
      tourBeforeAfterTitle: "Evoluzione Vettoriale Intelligente: Da Bozza o Logo Attuale a Identità Master",
      tourBeforeAfterSub: "Se hai già un logo, Aura preserva il tuo capitale visivo (Aaker & Haviv) e ne perfeziona la geometria.",
      theoryEyebrow: "SEZIONE 3 · INFOGRAFICA DINAMICA DELLE BASI TEORICHE E AUTORI",
      theoryTitle: "Architettura Scientifica Passo dopo Passo: Le Teorie a Supporto del Tuo Brand",
      theoryLead: "Esplora la nostra infografica accademica responsive su mobile, tablet o computer. Ogni fase di The Best Brand si fonda su modelli collaudati, diagrammi geometrici interattivi e autori di fama mondiale.",
      theoryInteractiveSimulatorTitle: "Simulatore Interattivo Kansei & Differenziale Semantico di Osgood (Passo 4)",
      theoryInteractiveSimulatorSub: "Regola gli assi emozionali dal vivo e osserva come la geometria parametrica trasforma tensione e carattere tipografico.",
      theoryAuthorsSectionTitle: "Autori e Modelli che Strutturano Ogni Fase",
      theoryBooksSectionTitle: "Bibliografia Essenziale di Strategia e Brand Design",
      demoEyebrow: "SEZIONE 4 · DEMO INTERATTIVA DAL VIVO CON AURA (MOBILE, TABLET O COMPUTER)",
      demoTitle: "Vivi l'Esperienza Reale su Mobile, Tablet o Computer: Passi da 1 a 3 Gratuiti",
      demoLead: "Interagisci direttamente con Aura da qualsiasi dispositivo (vista mobile, tablet o schermo intero su computer). Avanza gratuitamente nei primi 3 passi reali; al Passo 4 attiva la licenza da $49 USD con migrazione automatica di tutte le tue risposte.",
      demoModeIphone: "Vista Mobile / Tablet",
      demoModeFull: "Vista Computer / Schermo Intero",
      demoFreeStepsBadge: "PASSI 0, 1, 2 E 3 GRATIS DAL VIVO",
      demoPaywallStep4Badge: "IL PASSO 4 ATTIVA LA LICENZA PRO ($49 USD) CON MIGRAZIONE AUTO",
      demoUnlockBtn: "Sblocca Passi da 4 a 6 + Brandbook (+30 Pagine) · $49 USD",
      downloadsEyebrow: "SEZIONE 5 · CONSOLIDAMENTO DEI DELIVERABLE E CAVEAU ESECUTIVO",
      downloadsTitle: "Il Tuo Brandbook Ufficiale di Oltre 30 Pagine e Kit Completo di Produzione",
      downloadsLead: "Tutti i tuoi asset riuniti in un unico standard esecutivo per mobile, tablet o computer: il tuo Brandbook ufficiale di oltre 30 pagine (adattabile al settore aziendale), suite vettoriale (.SVG, .AI, .EPS, .PNG), modelli aziendali e font.",
      downloadsStandardBadge: "STANDARD UFFICIALE UNIFICATO · BRANDBOOK DI OLTRE 30 PAGINE (ADATTABILE AL SETTORE)",
      downloadsViewSampleBtn: "Ispeziona Campione ad Alta Risoluzione",
      downloadsUnlockAllBtn: "Ottieni i 9 Deliverable Ufficiali · $49 USD",
      lightboxPrev: "Precedente",
      lightboxNext: "Successivo",
      lightboxClose: "Chiudi",
      checkoutTitle: "Attiva la Licenza Pro ($49 USD) e Continua al Passo 4 Senza Perdere i Progressi",
      checkoutSub: "Creiamo il tuo account esecutivo e migriamo automaticamente tutte le risposte dei Passi da 0 a 3 per continuare subito nel Passo 4 su mobile, tablet o computer.",
      checkoutMigrationTitle: "Migrazione Automatica Garantita (Passi da 0 a 3 → Passo 4)",
      checkoutAccountLabel: "Indirizzo email per il tuo account e backup cloud",
      checkoutNameLabel: "Nome del fondatore o titolare",
      checkoutPayBtn: "Paga $49 USD, Crea Account e Continua al Passo 4"
    }
  };

  function getLang() {
    try {
      const saved = (localStorage.getItem(LANG_STORAGE_KEY) || localStorage.getItem("tbb_app_lang") || document.documentElement.lang || "es").toLowerCase().trim();
      return ["es", "en", "fr", "pt", "de", "it"].includes(saved) ? saved : "es";
    } catch (e) {
      return "es";
    }
  }
  window.tbbGetLang = getLang;

  function t(key) {
    const l = getLang();
    return (I18N[l] && I18N[l][key]) || I18N.es[key] || key;
  }

  function escHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function resolveVideoAsset(relPath) {
    return `${relPath}?v=${ASSET_VERSION}`;
  }

  function resolveVideoAssetFallback(relPath) {
    const clean = String(relPath || "").split("?")[0];
    return `https://cdn.jsdelivr.net/gh/ImprobearsIA/thebestbrand@main/apps/web${clean}`;
  }
  window.tbbResolveVideoFallback = resolveVideoAssetFallback;

  function getLocalizedStepVideoUrl(stepNum, langOverride) {
    const l = langOverride || getLang();
    const sfx = l === "es" ? "" : `_${l}`;
    return resolveVideoAsset(`/assets/videos/capsula_teoria_paso_${stepNum}${sfx}.mp4`);
  }

  function getLocalizedStepPosterUrl(stepNum, langOverride) {
    const l = langOverride || getLang();
    const sfx = l === "es" ? "" : `_${l}`;
    return resolveVideoAsset(`/assets/videos/poster_paso_${stepNum}${sfx}.jpg`);
  }

  function getLocalizedHeroVideoUrl(langOverride) {
    const l = langOverride || getLang();
    const sfx = l === "es" ? "" : `_${l}`;
    return resolveVideoAsset(`/assets/videos/hero_convergence_thebestbrand${sfx}.mp4`);
  }

  function getLocalizedHeroPosterUrl(langOverride) {
    const l = langOverride || getLang();
    const sfx = l === "es" ? "" : `_${l}`;
    return resolveVideoAsset(`/assets/videos/poster_hero_convergence${sfx}.jpg`);
  }

  function getLocalizedAppCaptureUrl(relPath, langOverride) {
    const l = langOverride || getLang();
    if (l === "es") return `${relPath}?v=${ASSET_VERSION}`;
    const dotIdx = relPath.lastIndexOf(".");
    if (dotIdx === -1) return `${relPath}?v=${ASSET_VERSION}`;
    return `${relPath.slice(0, dotIdx)}_${l}${relPath.slice(dotIdx)}?v=${ASSET_VERSION}`;
  }

  function stepLabelForLang(stepNum, isIntro) {
    const l = getLang();
    const map = { es: "Paso", en: "Step", fr: "Étape", pt: "Passo", de: "Schritt", it: "Passo" };
    return `${map[l] || "Paso"} ${stepNum}`;
  }

  function stepUpperForLang(stepNum) {
    return stepLabelForLang(stepNum, false).toUpperCase();
  }


  const VIDEO_CAPSULES = [0, 1, 2, 3, 4, 5, 6].map((idx) => {
    const metaByStep = {
      0: {
        author: "Peter Drucker, David Aaker & Sagi Haviv",
        es: ["Paso 0: Punto de Partida, Capital Visual y Giro", "Define si creas tu marca desde cero, evolucionas tu logotipo actual o estructuras una submarca oficial con Aura."],
        en: ["Step 0: Starting Point, Visual Equity & Business Sector", "Define whether you build from scratch, evolve your current logo, or structure an official sub-brand with Aura."],
        fr: ["Étape 0 : Point de Départ, Capital Visuel et Secteur", "Définissez si vous créez de zéro, faites évoluer votre logo actuel ou structurez une sous-marque avec Aura."],
        pt: ["Passo 0: Ponto de Partida, Património Visual e Ramo", "Defina se cria a sua marca do zero, evolui o logótipo atual ou estrutura uma submarca oficial com a Aura."],
        de: ["Schritt 0: Ausgangspunkt, Visuelles Kapital & Branche", "Definieren Sie, ob Sie neu starten, Ihr aktuelles Logo weiterentwickeln oder eine Submarke mit Aura aufbauen."],
        it: ["Passo 0: Punto di Partenza, Capitale Visivo e Settore", "Definisci se creare da zero, evolvere il logo attuale o strutturare un sub-brand ufficiale con Aura."]
      },
      1: {
        author: "Simon Sinek, Alex Osterwalder & Donald Miller",
        es: ["Paso 1: El Círculo Dorado y Promesa en 3 Pasos", "Estructuramos tu Porqué, tu Cómo y tu Qué junto con el arquetipo humano de tu empresa antes de trazar una sola línea."],
        en: ["Step 1: The Golden Circle & 3-Step Value Promise", "We structure your Why, How, and What alongside your company's human archetype before drawing a single line."],
        fr: ["Étape 1 : Le Cercle d'Or et Promesse en 3 Étapes", "Nous structurons votre Pourquoi, Comment et Quoi ainsi que l'archétype humain de votre entreprise."],
        pt: ["Passo 1: O Círculo Dourado e Promessa em 3 Passos", "Estruturamos o seu Porquê, Como e O Quê junto com o arquétipo humano da sua empresa."],
        de: ["Schritt 1: Der Golden Circle & 3-Schritte-Versprechen", "Wir strukturieren Ihr Warum, Wie und Was sowie den menschlichen Archetyp Ihres Unternehmens."],
        it: ["Passo 1: Il Cerchio d'Oro e Promessa in 3 Passi", "Strutturiamo il tuo Perché, Come e Cosa insieme all'archetipo umano della tua azienda."]
      },
      2: {
        author: "Jan Carlzon, Don Norman & Katherine Lemon",
        es: ["Paso 2: Arquitectura de Touchpoints (Antes, Durante y Después)", "Convertimos tu propósito en Momentos de la Verdad libres de fricción operativa en cada canal de contacto."],
        en: ["Step 2: Touchpoint Architecture (Before, During & After)", "We turn your purpose into zero-friction Moments of Truth across every customer channel."],
        fr: ["Étape 2 : Architecture des Touchpoints (Avant, Pendant, Après)", "Nous transformons votre raison d'être en Moments de Vérité sans friction sur chaque canal client."],
        pt: ["Passo 2: Arquitetura de Touchpoints (Antes, Durante e Depois)", "Transformamos o seu propósito em Momentos da Verdade sem fricção em cada canal de contacto."],
        de: ["Schritt 2: Touchpoint-Architektur (Vorher, Während, Nachher)", "Wir verwandeln Ihren Zweck in reibungslose Momente der Wahrheit an jedem Kontaktpunkt."],
        it: ["Passo 2: Architettura dei Touchpoint (Prima, Durante e Dopo)", "Trasformiamo il tuo scopo in Momenti della Verità senza attrito in ogni canale di contatto."]
      },
      3: {
        author: "Alexandra Watkins (SMILE), Al Ries & OMPI Niza",
        es: ["Paso 3: Ingeniería de Naming, Fonética y Clases de Niza", "Validamos la sonoridad, recordación SMILE, monograma 1:1 y clasificación internacional de Niza para tu nombre."],
        en: ["Step 3: Naming Engineering, Phonetics & Nice Classes", "We validate phonetics, SMILE memorability, 1:1 monogram, and WIPO Nice classification for your brand name."],
        fr: ["Étape 3 : Ingénierie du Naming, Phonétique et Classes de Nice", "Nous validons la sonorité, la mémorisation SMILE, le monogramme 1:1 et les classes OMPI de Nice."],
        pt: ["Passo 3: Engenharia de Naming, Fonética e Classes de Nice", "Validamos a sonoridade, memorização SMILE, monograma 1:1 e classificação internacional de Nice."],
        de: ["Schritt 3: Naming-Engineering, Phonetik & Nizza-Klassen", "Wir prüfen Phonetik, SMILE-Einprägsamkeit, 1:1-Monogramm und WIPO Nizza-Klassen für Ihren Namen."],
        it: ["Passo 3: Ingegneria del Naming, Fonetica e Classi di Nizza", "Validiamo sonorità, memorabilità SMILE, monogramma 1:1 e classificazione internazionale di Nizza."]
      },
      4: {
        author: "Mitsuo Nagamachi (Kansei), Charles Osgood & R. Bringhurst",
        es: ["Paso 4: Ingeniería Kansei, Diferencial de Osgood y Tipografía", "Calibramos 7 ejes emocionales y ópticos para traducir tu estrategia en proporciones geométricas y par tipográfico."],
        en: ["Step 4: Kansei Engineering, Osgood Differential & Typography", "We calibrate 7 emotional and optical axes to translate your strategy into geometric proportions and font pairing."],
        fr: ["Étape 4 : Ingénierie Kansei, Différentiel d'Osgood et Typographie", "Nous calibrons 7 axes émotionnels et optiques pour traduire votre stratégie en géométrie et duo typographique."],
        pt: ["Passo 4: Engenharia Kansei, Diferencial de Osgood e Tipografia", "Calibramos 7 eixos emocionais e ópticos para traduzir a sua estratégia em proporções geométricas e tipografia."],
        de: ["Schritt 4: Kansei-Engineering, Osgood-Differential & Typografie", "Wir kalibrieren 7 emotionale Achsen, um Ihre Strategie in geometrische Proportionen und Schriften zu übersetzen."],
        it: ["Passo 4: Ingegneria Kansei, Differenziale di Osgood e Tipografia", "Calibriamo 7 assi emozionali e ottici per tradurre la strategia in proporzioni geometriche e coppia tipografica."]
      },
      5: {
        author: "Paul Rand, Sagi Haviv, Josef Albers & Masaaki Imai (Kaizen)",
        es: ["Paso 5: Estudio de Logotipo en Curvas y Mejora Continua Kaizen", "Iteración progresiva sobre retícula constructiva 8X×3X, psicología cromática y vectorización en curvas Bézier puras."],
        en: ["Step 5: Vector Logo Studio & Kaizen Continuous Refinement", "Progressive iteration on an 8X×3X grid, color psychology, and pure Bézier curve vectorization."],
        fr: ["Étape 5 : Atelier Logo Vectoriel et Amélioration Kaizen", "Itération progressive sur grille 8X×3X, psychologie des couleurs et vectorisation en courbes de Bézier pures."],
        pt: ["Passo 5: Estúdio de Logótipo em Curvas e Melhoria Kaizen", "Iteração progressiva sobre grelha 8X×3X, psicologia da cor e vetorização em curvas Bézier puras."],
        de: ["Schritt 5: Vektor-Logo-Studio & Kontinuierliches Kaizen", "Progressive Iteration auf einem 8X×3X-Raster, Farbpsychologie und reine Bézier-Vektorisierung."],
        it: ["Passo 5: Studio del Logo in Curve e Miglioramento Kaizen", "Iterazione progressiva su griglia 8X×3X, psicologia del colore e vettorizzazione in curve di Bézier pure."]
      },
      6: {
        author: "Massimo Vignelli, Müller-Brockmann & Directiva C-00",
        es: ["Paso 6: Brandbook Oficial (+30 Páginas) y Bóveda Ejecutiva", "Compilación automática de tu Brandbook oficial de más de 30 páginas (ajustable según el giro del negocio) y tus 9 entregables."],
        en: ["Step 6: Official Brandbook (30+ Pages) & Executive Vault", "Automatic compilation of your official Brandbook of over 30 pages (adaptable to your business sector) and all 9 deliverables."],
        fr: ["Étape 6 : Brandbook Officiel (+30 Pages) et Voûte Exécutive", "Compilation automatique de votre Brandbook officiel de plus de 30 pages (adaptable selon votre secteur) et de vos 9 livrables."],
        pt: ["Passo 6: Brandbook Oficial (+30 Páginas) e Cofre Executivo", "Compilação automática do seu Brandbook oficial com mais de 30 páginas (ajustável ao ramo do negócio) e 9 entregáveis."],
        de: ["Schritt 6: Offizielles Brandbook (+30 Seiten) & Executive-Tresor", "Automatische Erstellung Ihres offiziellen Brandbooks mit über 30 Seiten (branchenanpassbar) und aller 9 Deliverables."],
        it: ["Passo 6: Brandbook Ufficiale (+30 Pagine) e Caveau Esecutivo", "Compilazione automatica del tuo Brandbook ufficiale di oltre 30 pagine (adattabile al settore) e dei 9 deliverable."]
      }
    }[idx];
    return {
      step: idx,
      author: metaByStep.author,
      get videoUrl() { return getLocalizedStepVideoUrl(idx); },
      get posterUrl() { return getLocalizedStepPosterUrl(idx); },
      get title() { const l = getLang(); return (metaByStep[l] || metaByStep.es)[0]; },
      get summary() { const l = getLang(); return (metaByStep[l] || metaByStep.es)[1]; }
    };
  });

  // Datos para el App Tour (Scrollytelling en iPhone + Recortes Precisos + Bloques Flotantes)
  const APP_TOUR_STEPS = [
    {
      step: 0,
      captureBase: "/assets/app_captures/step0_logo_aura.png",
      cutoutFocus: "top-center",
      accent: "#426EAE",
      theoryTag: "DRUCKER · AAKER · HAVIV",
      i18n: {
        es: {
          badge: "PASO 00 · PUNTO DE PARTIDA Y CAPITAL VISUAL",
          title: "Diagnóstico Inicial: Crear desde Cero, Evolucionar tu Logo o Crear Submarcas",
          body: "Dentro de la aplicación, Aura te recibe en tiempo real. Puedes cargar tu logotipo actual para conservar o evolucionar su capital visual, describir el giro exacto de tu negocio y activar tu arquitectura de submarcas.",
          cutoutLabel: "RECORTE DE INTERFAZ 00 · CARGA DE LOGO BASE Y SELECTOR DE OBJETIVO",
          floatingNote: "Aura extrae la paleta cromática de tu logo actual y personaliza todo el cuestionario según tu giro."
        },
        en: {
          badge: "STEP 00 · STARTING POINT & VISUAL EQUITY",
          title: "Initial Diagnosis: Build from Scratch, Evolve Your Logo, or Create Sub-brands",
          body: "Inside the app, Aura welcomes you in real time. Upload your current logo to preserve or evolve its visual equity, describe your exact business sector, and enable sub-brand architecture.",
          cutoutLabel: "UI PRECISION CUTOUT 00 · BASE LOGO UPLOAD & OBJECTIVE SELECTOR",
          floatingNote: "Aura extracts the color palette from your existing logo and tailors every question to your business line."
        },
        fr: {
          badge: "ÉTAPE 00 · POINT DE DÉPART ET CAPITAL VISUEL",
          title: "Diagnostic Initial : Créer de Zéro, Faire Évoluer Votre Logo ou Créer des Sous-marques",
          body: "Dans l'application, Aura vous accueille en temps réel. Importez votre logo actuel pour préserver ou faire évoluer son capital visuel, décrivez votre secteur d'activité et activez vos sous-marques.",
          cutoutLabel: "DÉCOUPE UI 00 · IMPORT DU LOGO ACTUEL ET SÉLECTEUR D'OBJECTIF",
          floatingNote: "Aura extrait la palette de votre logo actuel et personnalise tout le parcours selon votre secteur."
        },
        pt: {
          badge: "PASSO 00 · PONTO DE PARTIDA E PATRIMÓNIO VISUAL",
          title: "Diagnóstico Inicial: Criar do Zero, Evoluir o Seu Logo ou Criar Submarcas",
          body: "Na aplicação, a Aura recebe-o em tempo real. Carregue o seu logótipo atual para preservar ou evoluir o seu património visual, descreva o seu ramo de negócio e ative a arquitetura de submarcas.",
          cutoutLabel: "RECORTE UI 00 · CARREGAMENTO DE LOGO BASE E SELETOR DE OBJETIVO",
          floatingNote: "A Aura extrai a paleta cromática do seu logo atual e adapta todo o percurso ao seu ramo."
        },
        de: {
          badge: "SCHRITT 00 · AUSGANGSPUNKT & VISUELLES KAPITAL",
          title: "Erstdiagnose: Neu Starten, Logo Weiterentwickeln oder Submarken Aufbauen",
          body: "In der App empfängt Sie Aura in Echtzeit. Laden Sie Ihr bestehendes Logo hoch, beschreiben Sie Ihr Geschäftsfeld und aktivieren Sie bei Bedarf Ihre Submarken-Architektur.",
          cutoutLabel: "UI-AUSSCHNITT 00 · LOGO-UPLOAD & ZIELAUSWAHL",
          floatingNote: "Aura extrahiert die Farbpalette Ihres Logos und passt alle Fragen an Ihre Branche an."
        },
        it: {
          badge: "PASSO 00 · PUNTO DI PARTENZA E CAPITALE VISIVO",
          title: "Diagnosi Iniziale: Creare da Zero, Evolvere il Logo o Creare Sub-brand",
          body: "Nell'app, Aura ti accoglie in tempo reale. Carica il tuo logo attuale per preservarne o evolverne il capitale visivo, descrivi il tuo settore e attiva l'architettura dei sub-brand.",
          cutoutLabel: "RITAGLIO UI 00 · CARICAMENTO LOGO BASE E SELETTORE OBIETTIVO",
          floatingNote: "Aura estrae la palette cromatica dal tuo logo attuale e personalizza l'intero percorso."
        }
      }
    },
    {
      step: 1,
      captureBase: "/assets/app_captures/step1_golden_circle.png",
      cutoutFocus: "center",
      accent: "#FF7A00",
      theoryTag: "SIMON SINEK · EL CÍRCULO DORADO",
      i18n: {
        es: {
          badge: "PASO 01 · EL CÍRCULO DORADO Y PROMESA DE VALOR",
          title: "Del Porqué Nuclear a tu Método en 3 Pasos y la Empresa como Persona",
          body: "A través de una entrevista socrática por voz o texto, Aura estructura tu Círculo Dorado (Why → How → What), sintetiza tu promesa única de valor y define la personalidad humana de tu marca.",
          cutoutLabel: "RECORTE DE INTERFAZ 01 · LIENZO DEL CÍRCULO DORADO Y VOZ DE AURA",
          floatingNote: "Las primeras 8 páginas estratégicas de tu Brandbook se estructuran automáticamente al completar este paso."
        },
        en: {
          badge: "STEP 01 · THE GOLDEN CIRCLE & VALUE PROMISE",
          title: "From Core Why to Your 3-Step Method & The Company as a Person",
          body: "Through a Socratic voice or text interview, Aura structures your Golden Circle (Why → How → What), synthesizes your value promise, and defines your brand's human personality.",
          cutoutLabel: "UI PRECISION CUTOUT 01 · GOLDEN CIRCLE CANVAS & AURA VOICE",
          floatingNote: "The first 8 strategic pages of your Brandbook are structured automatically upon completing this step."
        },
        fr: {
          badge: "ÉTAPE 01 · LE CERCLE D'OR ET PROMESSE DE VALEUR",
          title: "Du Pourquoi Nucléaire à Votre Méthode en 3 Étapes et l'Entreprise comme Personne",
          body: "Par entretien socratique vocal ou écrit, Aura structure votre Cercle d'Or (Why → How → What), synthétise votre promesse de valeur et définit la personnalité humaine de votre marque.",
          cutoutLabel: "DÉCOUPE UI 01 · CANEVAS DU CERCLE D'OR ET VOIX D'AURA",
          floatingNote: "Les 8 premières pages stratégiques de votre Brandbook sont structurées automatiquement."
        },
        pt: {
          badge: "PASSO 01 · O CÍRCULO DOURADO E PROMESSA DE VALOR",
          title: "Do Porquê Nuclear ao Método em 3 Passos e a Empresa como Pessoa",
          body: "Através de uma entrevista socrática por voz ou texto, a Aura estrutura o seu Círculo Dourado (Why → How → What), sintetiza a sua promessa de valor e define a personalidade da marca.",
          cutoutLabel: "RECORTE UI 01 · TELA DO CÍRCULO DOURADO E VOZ DA AURA",
          floatingNote: "As primeiras 8 páginas estratégicas do seu Brandbook são estruturadas automaticamente."
        },
        de: {
          badge: "SCHRITT 01 · DER GOLDEN CIRCLE & WERTVERSPRECHEN",
          title: "Vom Kern-Warum zur 3-Schritte-Methode & dem Unternehmen als Person",
          body: "Im sokratischen Sprach- oder Textdialog strukturiert Aura Ihren Golden Circle (Why → How → What), Ihr Wertversprechen und die menschliche Markenpersönlichkeit.",
          cutoutLabel: "UI-AUSSCHNITT 01 · GOLDEN-CIRCLE-CANVAS & AURA-STIMME",
          floatingNote: "Die ersten 8 strategischen Seiten Ihres Brandbooks werden automatisch aufgebaut."
        },
        it: {
          badge: "PASSO 01 · IL CERCHIO D'ORO E PROMESSA DI VALORE",
          title: "Dal Perché Centrale al Metodo in 3 Passi e l'Azienda come Persona",
          body: "Attraverso un'intervista socratica vocale o testuale, Aura struttura il tuo Cerchio d'Oro (Why → How → What), sintetizza la promessa di valore e definisce la personalità del brand.",
          cutoutLabel: "RITAGLIO UI 01 · CANVAS DEL CERCHIO D'ORO E VOCE DI AURA",
          floatingNote: "Le prime 8 pagine strategiche del tuo Brandbook vengono strutturate automaticamente."
        }
      }
    },
    {
      step: 2,
      captureBase: "/assets/app_captures/step2_touchpoints.png",
      cutoutFocus: "center",
      accent: "#4C9DE6",
      theoryTag: "JAN CARLZON · MOMENTOS DE LA VERDAD",
      i18n: {
        es: {
          badge: "PASO 02 · ARQUITECTURA DE TOUCHPOINTS REALES",
          title: "Mapeo Operativo Antes, Durante y Después de la Compra",
          body: "Seleccionas con un toque los puntos de contacto reales donde tu cliente te descubre (Antes), vive tu servicio sin fricción (Durante) y regresa o te recomienda (Después).",
          cutoutLabel: "RECORTE DE INTERFAZ 02 · MATRIZ INTERACTIVA ANTES · DURANTE · DESPUÉS",
          floatingNote: "Cada touchpoint elegido determina las aplicaciones reales y mockups que incluirá tu Brandbook."
        },
        en: {
          badge: "STEP 02 · REAL TOUCHPOINT ARCHITECTURE",
          title: "Operational Mapping Before, During & After the Purchase",
          body: "Select with one tap the real touchpoints where customers discover you (Before), experience zero-friction delivery (During), and return or refer you (After).",
          cutoutLabel: "UI PRECISION CUTOUT 02 · INTERACTIVE BEFORE · DURING · AFTER MATRIX",
          floatingNote: "Every selected touchpoint dictates the real-world applications and mockups inside your Brandbook."
        },
        fr: {
          badge: "ÉTAPE 02 · ARCHITECTURE DES TOUCHPOINTS RÉELS",
          title: "Cartographie Opérationnelle Avant, Pendant et Après l'Achat",
          body: "Sélectionnez en un clic les points de contact réels où votre client vous découvre (Avant), vit une expérience sans friction (Pendant) et vous recommande (Après).",
          cutoutLabel: "DÉCOUPE UI 02 · MATRICE INTERACTIVE AVANT · PENDANT · APRÈS",
          floatingNote: "Chaque touchpoint choisi détermine les applications et mockups intégrés à votre Brandbook."
        },
        pt: {
          badge: "PASSO 02 · ARQUITETURA DE TOUCHPOINTS REAIS",
          title: "Mapeamento Operacional Antes, Durante e Depois da Compra",
          body: "Selecione com um toque os pontos de contacto reais onde o cliente o descobre (Antes), vive o serviço sem fricção (Durante) e regressa ou recomenda (Depois).",
          cutoutLabel: "RECORTE UI 02 · MATRIZ INTERATIVA ANTES · DURANTE · DEPOIS",
          floatingNote: "Cada touchpoint escolhido define as aplicações reais e mockups do seu Brandbook."
        },
        de: {
          badge: "SCHRITT 02 · ECHTE TOUCHPOINT-ARCHITEKTUR",
          title: "Operatives Mapping Vor, Während und Nach dem Kauf",
          body: "Wählen Sie die realen Kontaktpunkte, an denen Kunden Sie entdecken (Vorher), reibungslosen Service erleben (Während) und Sie weiterempfehlen (Nachher).",
          cutoutLabel: "UI-AUSSCHNITT 02 · INTERAKTIVE VORHER · WÄHREND · NACHHER MATRIX",
          floatingNote: "Jeder gewählte Touchpoint steuert die realen Anwendungen und Mockups in Ihrem Brandbook."
        },
        it: {
          badge: "PASSO 02 · ARCHITETTURA DEI TOUCHPOINT REALI",
          title: "Mappatura Operativa Prima, Durante e Dopo l'Acquisto",
          body: "Seleziona con un tocco i punti di contatto reali in cui il cliente ti scopre (Prima), vive il servizio senza attrito (Durante) e ti consiglia (Dopo).",
          cutoutLabel: "RITAGLIO UI 02 · MATRICE INTERATTIVA PRIMA · DURANTE · DOPO",
          floatingNote: "Ogni touchpoint scelto determina le applicazioni reali e i mockup del tuo Brandbook."
        }
      }
    },
    {
      step: 3,
      captureBase: "/assets/app_captures/step3_naming_nice.png",
      cutoutFocus: "center",
      accent: "#0D2540",
      theoryTag: "ALEXANDRA WATKINS · MODELO SMILE & OMPI NIZA",
      i18n: {
        es: {
          badge: "PASO 03 · INGENIERÍA DE NAMING, FONÉTICA Y REGISTRO",
          title: "Evaluación Acústica SMILE, Monograma 1:1 y Clases Internacionales de Niza",
          body: "Confirmas tu nombre actual o generas candidatos fonéticos de 2 a 3 sílabas con evaluación SMILE, descriptor comercial y clasificación oficial de Niza para blindar tu registro.",
          cutoutLabel: "RECORTE DE INTERFAZ 03 · AUDITORÍA FONÉTICA SMILE Y CLASES DE NIZA",
          floatingNote: "Hasta aquí avanzas 100% gratis en la Demo en Vivo antes del desbloqueo del Paso 4 ($49 USD)."
        },
        en: {
          badge: "STEP 03 · NAMING ENGINEERING, PHONETICS & TRADEMARK",
          title: "SMILE Acoustic Scoring, 1:1 Monogram & WIPO Nice Classes",
          body: "Confirm your existing name or generate 2–3 syllable phonetic candidates with SMILE scoring, commercial tagline, and official Nice classes for trademark protection.",
          cutoutLabel: "UI PRECISION CUTOUT 03 · SMILE PHONETIC AUDIT & NICE CLASSES",
          floatingNote: "You advance 100% free through Step 3 in the Live Demo before the Step 4 Pro unlock ($49 USD)."
        },
        fr: {
          badge: "ÉTAPE 03 · INGÉNIERIE DU NAMING, PHONÉTIQUE ET DÉPÔT",
          title: "Évaluation Acoustique SMILE, Monogramme 1:1 et Classes de Nice",
          body: "Confirmez votre nom actuel ou générez des candidats phonétiques avec score SMILE, slogan commercial et classification officielle OMPI de Nice.",
          cutoutLabel: "DÉCOUPE UI 03 · AUDIT PHONÉTIQUE SMILE ET CLASSES DE NICE",
          floatingNote: "Vous avancez gratuitement jusqu'à l'Étape 3 avant le déblocage Pro de l'Étape 4 (49 $ USD)."
        },
        pt: {
          badge: "PASSO 03 · ENGENHARIA DE NAMING, FONÉTICA E REGISTO",
          title: "Avaliação Acústica SMILE, Monograma 1:1 e Classes de Nice",
          body: "Confirme o seu nome atual ou gere candidatos fonéticos com avaliação SMILE, eslogan comercial e classificação oficial de Nice para proteção de marca.",
          cutoutLabel: "RECORTE UI 03 · AUDITORIA FONÉTICA SMILE E CLASSES DE NICE",
          floatingNote: "Avança 100% grátis até ao Passo 3 na Demo ao Vivo antes do desbloqueio do Passo 4 ($49 USD)."
        },
        de: {
          badge: "SCHRITT 03 · NAMING-ENGINEERING, PHONETIK & MARKENSCHUTZ",
          title: "SMILE-Phonetik-Score, 1:1-Monogramm & Internationale Nizza-Klassen",
          body: "Bestätigen Sie Ihren Namen oder generieren Sie phonetisch starke Kandidaten mit SMILE-Bewertung, Slogan und offiziellen Nizza-Klassen.",
          cutoutLabel: "UI-AUSSCHNITT 03 · SMILE-PHONETIK-AUDIT & NIZZA-KLASSEN",
          floatingNote: "Bis Schritt 3 testen Sie in der Live-Demo kostenlos, bevor Schritt 4 ($49 USD) freigeschaltet wird."
        },
        it: {
          badge: "PASSO 03 · INGEGNERIA DEL NAMING, FONETICA E REGISTRAZIONE",
          title: "Valutazione Acustica SMILE, Monogramma 1:1 e Classi di Nizza",
          body: "Conferma il tuo nome attuale o genera candidati fonetici con punteggio SMILE, slogan commerciale e classificazione ufficiale di Nizza.",
          cutoutLabel: "RITAGLIO UI 03 · AUDIT FONETICO SMILE E CLASSI DI NIZZA",
          floatingNote: "Avanzi gratuitamente fino al Passo 3 nella Demo dal Vivo prima dello sblocco del Passo 4 ($49 USD)."
        }
      }
    },
    {
      step: 4,
      captureBase: "/assets/app_captures/step4_kansei_axes.png",
      cutoutFocus: "center",
      accent: "#426EAE",
      theoryTag: "MITSUO NAGAMACHI · KANSEI & DIFERENCIAL DE OSGOOD",
      i18n: {
        es: {
          badge: "PASO 04 · INGENIERÍA KANSEI Y DIFERENCIAL DE OSGOOD",
          title: "Calibración de los 7 Ejes Visuales, Par Tipográfico y Semilla Constructiva",
          body: "Deslizas 7 ejes bipolares (de orgánico a geométrico, de clásico a vanguardista) para traducir emociones en vectores matemáticos, seleccionando tu tipografía oficial y estructura base.",
          cutoutLabel: "RECORTE DE INTERFAZ 04 · CALIBRADOR BIPOLAR DE 7 EJES DE OSGOOD",
          floatingNote: "Al desbloquear el Paso 4 ($49 USD), todas tus respuestas de los Pasos 0 al 3 migran automáticamente."
        },
        en: {
          badge: "STEP 04 · KANSEI ENGINEERING & OSGOOD DIFFERENTIAL",
          title: "Calibrating the 7 Visual Axes, Font Pairing & Structural Seed",
          body: "Slide 7 bipolar axes (from organic to geometric, classic to avant-garde) to translate human emotion into mathematical vectors, selecting your official typography and base structure.",
          cutoutLabel: "UI PRECISION CUTOUT 04 · 7-AXIS OSGOOD BIPOLAR CALIBRATOR",
          floatingNote: "Upon unlocking Step 4 ($49 USD), all your answers from Steps 0 to 3 migrate automatically."
        },
        fr: {
          badge: "ÉTAPE 04 · INGÉNIERIE KANSEI ET DIFFÉRENTIEL D'OSGOOD",
          title: "Calibrage des 7 Axes Visuels, Duo Typographique et Structure de Base",
          body: "Faites glisser 7 axes bipolaires (de l'organique au géométrique, du classique à l'avant-garde) pour traduire les émotions en vecteurs mathématiques et choisir votre typographie.",
          cutoutLabel: "DÉCOUPE UI 04 · CALIBRATEUR BIPOLAIRE À 7 AXES D'OSGOOD",
          floatingNote: "En débloquant l'Étape 4 (49 $ USD), toutes vos réponses des Étapes 0 à 3 sont migrées automatiquement."
        },
        pt: {
          badge: "PASSO 04 · ENGENHARIA KANSEI E DIFERENCIAL DE OSGOOD",
          title: "Calibração dos 7 Eixos Visuais, Par Tipográfico e Semente Construtiva",
          body: "Deslize 7 eixos bipolares (do orgânico ao geométrico, do clássico ao vanguardista) para traduzir emoções em vetores matemáticos e escolher a sua tipografia oficial.",
          cutoutLabel: "RECORTE UI 04 · CALIBRADOR BIPOLAR DE 7 EIXOS DE OSGOOD",
          floatingNote: "Ao desbloquear o Passo 4 ($49 USD), todas as respostas dos Passos 0 a 3 migram automaticamente."
        },
        de: {
          badge: "SCHRITT 04 · KANSEI-ENGINEERING & OSGOOD-DIFFERENTIAL",
          title: "Kalibrierung der 7 Visuellen Achsen, Schriftpaarung & Grundstruktur",
          body: "Steuern Sie 7 bipolare Achsen (von organisch bis geometrisch, klassisch bis avantgardistisch), um Emotionen in mathematische Vektoren und Typografie zu übersetzen.",
          cutoutLabel: "UI-AUSSCHNITT 04 · BIPOLARER 7-ACHSEN-KALIBRIERER NACH OSGOOD",
          floatingNote: "Beim Freischalten von Schritt 4 ($49 USD) werden alle Daten aus Schritt 0 bis 3 automatisch übernommen."
        },
        it: {
          badge: "PASSO 04 · INGEGNERIA KANSEI E DIFFERENZIALE DI OSGOOD",
          title: "Calibrazione dei 7 Assi Visivi, Coppia Tipografica e Struttura Base",
          body: "Scorri i 7 assi bipolari (da organico a geometrico, da classico ad avanguardista) per tradurre le emozioni in vettori matematici e selezionare la tipografia ufficiale.",
          cutoutLabel: "RITAGLIO UI 04 · CALIBRATORE BIPOLARE A 7 ASSI DI OSGOOD",
          floatingNote: "Sbloccando il Passo 4 ($49 USD), tutte le risposte dei Passi da 0 a 3 migrano automaticamente."
        }
      }
    },
    {
      step: 5,
      captureBase: "/assets/app_captures/step5_logo_studio.png",
      cutoutFocus: "center",
      accent: "#FF7A00",
      theoryTag: "PAUL RAND · SAGI HAVIV · INGENIERÍA KAIZEN",
      i18n: {
        es: {
          badge: "PASO 05 · TALLER DE LOGOTIPO EN CURVAS E ITERACIÓN KAIZEN",
          title: "10 Iteraciones Progresivas, Psicología Cromática y Vectores Bézier Puros",
          body: "El estudio sintetiza propuestas en curvas Bézier sobre retícula 8X×3X, valida contraste en fondo claro y oscuro, homologa submarcas y genera tu ícono App 1:1 en vivo.",
          cutoutLabel: "RECORTE DE INTERFAZ 05 · TALLER VECTORIAL Y COMPARADOR DE ITERACIONES",
          floatingNote: "Exportación inmediata en trazos vectoriales puros (.SVG y .AI) listos para imprenta y pantallas Retina."
        },
        en: {
          badge: "STEP 05 · VECTOR LOGO STUDIO & KAIZEN ITERATION",
          title: "10 Progressive Iterations, Color Psychology & Pure Bézier Vectors",
          body: "The studio synthesizes Bézier vector proposals on an 8X×3X grid, validates contrast on light and dark canvases, homologates sub-brands, and generates your 1:1 App Icon live.",
          cutoutLabel: "UI PRECISION CUTOUT 05 · VECTOR STUDIO & ITERATION COMPARATOR",
          floatingNote: "Instant export in pure vector paths (.SVG and .AI) ready for print and Retina displays."
        },
        fr: {
          badge: "ÉTAPE 05 · ATELIER LOGO VECTORIEL ET ITÉRATION KAIZEN",
          title: "10 Itérations Progressives, Psychologie Chromatique et Vecteurs Bézier",
          body: "L'atelier synthétise des propositions en courbes de Bézier sur grille 8X×3X, valide le contraste sur fonds clair et sombre, homologue les sous-marques et crée votre icône 1:1.",
          cutoutLabel: "DÉCOUPE UI 05 · ATELIER VECTORIEL ET COMPARATEUR D'ITÉRATIONS",
          floatingNote: "Export immédiat en tracés vectoriels purs (.SVG et .AI) prêts pour l'impression et le web."
        },
        pt: {
          badge: "PASSO 05 · ESTÚDIO DE LOGÓTIPO EM CURVAS E ITERAÇÃO KAIZEN",
          title: "10 Iterações Progressivas, Psicologia da Cor e Vetores Bézier Puros",
          body: "O estúdio sintetiza propostas em curvas Bézier sobre grelha 8X×3X, valida o contraste em fundo claro e escuro, homologa submarcas e gera o seu ícone App 1:1 ao vivo.",
          cutoutLabel: "RECORTE UI 05 · ESTÚDIO VETORIAL E COMPARADOR DE ITERAÇÕES",
          floatingNote: "Exportação imediata em traços vetoriais puros (.SVG e .AI) prontos para gráfica e ecrãs."
        },
        de: {
          badge: "SCHRITT 05 · VEKTOR-LOGO-STUDIO & KAIZEN-ITERATION",
          title: "10 Progressive Iterationen, Farbpsychologie & Reine Bézier-Vektoren",
          body: "Das Studio erzeugt Bézier-Vektorvorschläge auf einem 8X×3X-Raster, prüft den Kontrast auf hellem und dunklem Grund, homologiert Submarken und erstellt Ihr 1:1 App-Icon.",
          cutoutLabel: "UI-AUSSCHNITT 05 · VEKTOR-STUDIO & ITERATIONS-VERGLEICH",
          floatingNote: "Sofortiger Export in reinen Vektorpfaden (.SVG und .AI) für Druck und hochauflösende Displays."
        },
        it: {
          badge: "PASSO 05 · STUDIO DEL LOGO IN CURVE E ITERAZIONE KAIZEN",
          title: "10 Iterazioni Progressive, Psicologia del Colore e Vettori Bézier Puri",
          body: "Lo studio sintetizza proposte in curve di Bézier su griglia 8X×3X, valida il contrasto su sfondo chiaro e scuro, omologa i sub-brand e genera la tua icona App 1:1.",
          cutoutLabel: "RITAGLIO UI 05 · STUDIO VETTORIALE E COMPARATORE DI ITERAZIONI",
          floatingNote: "Esportazione immediata in tracciati vettoriali puri (.SVG e .AI) pronti per la stampa."
        }
      }
    },
    {
      step: 6,
      captureBase: "/assets/app_captures/step6_brandbook_36.png",
      cutoutFocus: "center",
      accent: "#0D2540",
      theoryTag: "MASSIMO VIGNELLI · BRANDBOOK +30 PÁGINAS",
      i18n: {
        es: {
          badge: "PASO 06 · BRANDBOOK OFICIAL (+30 PÁGINAS) Y 9 ENTREGABLES",
          title: "Gobernanza Editorial en Curvas Abiertas y Descarga Instantánea",
          body: "Tu recorrido completo se ensambla en un Brandbook oficial de más de 30 páginas (ajustable según el giro del negocio) junto con tu bóveda de 9 entregables listos para producción.",
          cutoutLabel: "RECORTE DE INTERFAZ 06 · VISOR DE BRANDBOOK (+30 PÁGINAS) Y BÓVEDA",
          floatingNote: "Incluye PDF editorial, HTML interactivo, vectores .SVG/.AI, plantillas Word/PowerPoint, firma y fuentes."
        },
        en: {
          badge: "STEP 06 · OFFICIAL BRANDBOOK (30+ PAGES) & 9 DELIVERABLES",
          title: "Open-Curve Editorial Governance & Instant Vault Download",
          body: "Your entire journey is compiled into an official Brandbook of over 30 pages (adaptable to your business sector) alongside your vault of 9 production-ready deliverables.",
          cutoutLabel: "UI PRECISION CUTOUT 06 · 30+ PAGE BRANDBOOK VIEWER & VAULT",
          floatingNote: "Includes editorial PDF, interactive HTML, .SVG/.AI vectors, Word/PowerPoint templates, email signature, and fonts."
        },
        fr: {
          badge: "ÉTAPE 06 · BRANDBOOK OFFICIEL (+30 PAGES) ET 9 LIVRABLES",
          title: "Gouvernance Éditoriale en Courbes Ouvertes et Téléchargement Immédiat",
          body: "Tout votre parcours est assemblé dans un Brandbook officiel de plus de 30 pages (adaptable selon votre secteur d'activité) avec votre voûte de 9 livrables prêts pour la production.",
          cutoutLabel: "DÉCOUPE UI 06 · VISIONNEUSE BRANDBOOK (+30 PAGES) ET VOÛTE",
          floatingNote: "Inclut PDF éditorial, HTML interactif, vecteurs .SVG/.AI, modèles Word/PowerPoint, signature et polices."
        },
        pt: {
          badge: "PASSO 06 · BRANDBOOK OFICIAL (+30 PÁGINAS) E 9 ENTREGÁVEIS",
          title: "Governança Editorial em Curvas Abertas e Descarga Instantânea",
          body: "Todo o seu percurso é compilado num Brandbook oficial com mais de 30 páginas (ajustável conforme o ramo do negócio) juntamente com o cofre de 9 entregáveis prontos a usar.",
          cutoutLabel: "RECORTE UI 06 · VISOR DE BRANDBOOK (+30 PÁGINAS) E COFRE",
          floatingNote: "Inclui PDF editorial, HTML interativo, vetores .SVG/.AI, modelos Word/PowerPoint, assinatura e fontes."
        },
        de: {
          badge: "SCHRITT 06 · OFFIZIELLES BRANDBOOK (+30 SEITEN) & 9 DELIVERABLES",
          title: "Editorische Markenführung in Offenen Kurven & Sofort-Download",
          body: "Ihr gesamter Prozess wird in einem offiziellen Brandbook mit über 30 Seiten (anpassbar je nach Branche) sowie Ihrem Tresor mit 9 produktionsfertigen Deliverables gebündelt.",
          cutoutLabel: "UI-AUSSCHNITT 06 · BRANDBOOK-VIEWER (+30 SEITEN) & TRESOR",
          floatingNote: "Enthält PDF, interaktives HTML, .SVG/.AI-Vektoren, Word/PowerPoint-Vorlagen, E-Mail-Signatur und Schriften."
        },
        it: {
          badge: "PASSO 06 · BRANDBOOK UFFICIALE (+30 PAGINE) E 9 DELIVERABLE",
          title: "Governance Editoriale in Curve Aperte e Download Istantaneo",
          body: "L'intero percorso viene assemblato in un Brandbook ufficiale di oltre 30 pagine (adattabile al settore aziendale) insieme al caveau con i 9 deliverable pronti per la produzione.",
          cutoutLabel: "RITAGLIO UI 06 · VISORE BRANDBOOK (+30 PAGINE) E CAVEAU",
          floatingNote: "Include PDF editoriale, HTML interattivo, vettori .SVG/.AI, modelli Word/PowerPoint, firma email e font."
        }
      }
    }
  ];

  // Consolidación de Entregables Reales · Caso Real Completo: ARCO Ingeniería (Ing. Luis Ponce · Iteración #5 Lineal Minimalista)
  const OFFICIAL_9_DELIVERABLES = [
    {
      num: "01",
      format: ".PDF + .HTML INTERACTIVO",
      sampleUrl: "/samples/Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.pdf",
      thumb: "/assets/app_captures/arco_30_paso6_1_brandbook_lamina01_portada.png",
      plateNum: 1,
      isPrimaryBrandbook: true,
      i18n: {
        es: { title: "Brandbook Oficial de 36 Láminas · Caso Real Auditado: ARCO INGENIERÍA (Ing. Luis Ponce · Modernización Lineal Minimalista #5)", desc: "Constitución visual y estratégica completa generada a partir de la Iteración #5 (Lineal Minimalista): Diagnóstico y Evolución del Logo Base, Círculo Dorado (Why/How/What), La Empresa como Persona, Touchpoints de Obra Civil (Antes/Durante/Después), Clases Niza 37 y 42, Ejes Kansei, Tríada Montserrat + Plus Jakarta Sans + JetBrains Mono, Rueda Cromática (#0078C0 / #88E0E0 / #585850) y Terna Vectorial." },
        en: { title: "Official 36-Plate Brandbook · Real Audited Case: ARCO INGENIERÍA (Eng. Luis Ponce · Minimalist Linear Modernization #5)", desc: "Complete visual and strategic brand constitution generated from Iteration #5 (Minimalist Linear): Base Logo Evolution, Golden Circle, Company as a Person, Civil Engineering Touchpoints (Before/During/After), Nice Classes 37 & 42, Kansei Axes, Montserrat + Plus Jakarta Sans + JetBrains Mono Triad, Color Wheel (#0078C0 / #88E0E0 / #585850), and Vector Suite." },
        fr: { title: "Brandbook Officiel de 36 Planches · Cas Réel Audité : ARCO INGENIERÍA (Ing. Luis Ponce · Modernisation Linéaire Minimaliste #5)", desc: "Constitution visuelle et stratégique complète générée à partir de l'Itération #5 (Linéaire Minimaliste) : Évolution du Logo de Base, Cercle d'Or, Touchpoints Génie Civil, Classes de Nice 37 et 42, Axes Kansei et Suite Vectorielle." },
        pt: { title: "Brandbook Oficial de 36 Lâminas · Caso Real Auditado: ARCO INGENIERÍA (Eng. Luis Ponce · Modernização Linear Minimalista #5)", desc: "Constituição visual e estratégica completa gerada a partir da Iteração #5 (Linear Minimalista): Evolução do Logo Base, Círculo Dourado, Touchpoints de Engenharia Civil, Classes Nice 37 e 42, Eixos Kansei e Suite Vetorial." },
        de: { title: "Offizielles 36-Seiten-Brandbook · Geprüfte Fallstudie: ARCO INGENIERÍA (Ing. Luis Ponce · Minimalistisch-Lineare Modernisierung #5)", desc: "Vollständige visuelle und strategische Markenverfassung aus Iteration #5 (Linear Minimalistisch): Logo-Evolution, Golden Circle, Bauingenieur-Touchpoints, Nizza-Klassen 37 & 42, Kansei-Achsen und Vektor-Suite." },
        it: { title: "Brandbook Ufficiale di 36 Tavole · Caso Reale Certificato: ARCO INGENIERÍA (Ing. Luis Ponce · Modernizzazione Lineare Minimalista #5)", desc: "Costituzione visiva e strategica completa generata dall'Iterazione #5 (Lineare Minimalista): Evoluzione Logo Base, Cerchio d'Oro, Touchpoint Ingegneria Civile, Classi di Nizza 37 e 42, Assi Kansei e Suite Vettoriale." }
      }
    },
    {
      num: "02",
      format: ".SVG · VECTOR EN CURVAS",
      sampleUrl: "/samples/Logotipo_Horizontal_Curvas_arco_ingenieria.svg",
      thumb: "/assets/app_captures/arco_31_paso6_1_brandbook_lamina13_terna.png",
      plateNum: 13,
      i18n: {
        es: { title: "Terna de Logotipos en Curvas Bézier (.SVG): Horizontal, Avatar 1:1 y Sello", desc: "Vectores matemáticos de ARCO Ingeniería (Iteración #5 Lineal Minimalista) trazados en curvas Bézier puras sin fuentes externas para web, planos CAD, cascos y gran formato." },
        en: { title: "Bézier Curve Logo Suite (.SVG): Horizontal, 1:1 Avatar & Seal", desc: "Mathematical vectors of ARCO Ingeniería (Iteration #5 Minimalist Linear) traced in pure Bézier curves for web, CAD blueprints, hardhats, and large-format signage." },
        fr: { title: "Suite de Logos en Courbes de Bézier (.SVG) : Horizontal, Avatar 1:1 et Sceau", desc: "Vecteurs mathématiques d'ARCO Ingeniería (Itération #5) tracés en courbes de Bézier pures pour le web, les plans CAO et la signalétique de chantier." },
        pt: { title: "Terna de Logótipos em Curvas Bézier (.SVG): Horizontal, Avatar 1:1 e Selo", desc: "Vetores matemáticos da ARCO Ingeniería (Iteração #5) traçados em curvas Bézier puras para web, plantas CAD e sinalética de obra." },
        de: { title: "Bézier-Vektor-Logopaket (.SVG): Horizontal, 1:1 Avatar & Siegel", desc: "Mathematische Vektoren von ARCO Ingeniería (Iteration #5) in reinen Bézier-Kurven für Web, CAD-Pläne und Baustellenbeschilderung." },
        it: { title: "Suite Loghi in Curve di Bézier (.SVG): Orizzontale, Avatar 1:1 e Sigillo", desc: "Vettori matematici di ARCO Ingeniería (Iterazione #5) tracciati in curve di Bézier pure per web, tavole CAD e cantieri." }
      }
    },
    {
      num: "03",
      format: ".AI · ADOBE ILLUSTRATOR",
      sampleUrl: "/samples/Logotipo_Horizontal_Curvas_arco_ingenieria.ai",
      thumb: "/assets/app_captures/arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png",
      plateNum: 11,
      i18n: {
        es: { title: "Original Maestro Nativo para Adobe Illustrator e Imprenta (.AI)", desc: "Archivo PostScript/PDF 1.6 nativo en curvas con las capas del arco estructural y las dos torres de ARCO Ingeniería (#0078C0, #88E0E0, #585850) listo para pre-prensa y bordado." },
        en: { title: "Native Adobe Illustrator & Pre-Press Master Original (.AI)", desc: "Native PostScript/PDF 1.6 vector file with separated structural arch and twin tower layers (#0078C0, #88E0E0, #585850) ready for print and embroidery." },
        fr: { title: "Original Maître Natif Adobe Illustrator et Pré-presse (.AI)", desc: "Fichier natif en courbes avec calques séparés de l'arche structurelle et des tours d'ARCO Ingeniería (#0078C0, #88E0E0, #585850)." },
        pt: { title: "Original Mestre Nativo Adobe Illustrator e Pré-impressão (.AI)", desc: "Ficheiro nativo em curvas com camadas separadas do arco estrutural e das torres da ARCO Ingeniería (#0078C0, #88E0E0, #585850)." },
        de: { title: "Natives Adobe Illustrator & Druckvorstufen-Master (.AI)", desc: "Native Vektordatei mit getrennten Ebenen des Bogens und der Türme von ARCO Ingeniería (#0078C0, #88E0E0, #585850)." },
        it: { title: "Originale Master Nativo Adobe Illustrator e Pre-stampa (.AI)", desc: "File nativo in curve con livelli separati dell'arco strutturale e delle torri di ARCO Ingeniería (#0078C0, #88E0E0, #585850)." }
      }
    },
    {
      num: "04",
      format: ".PNG · MASTERPIECE & APP ICON 1:1",
      sampleUrl: "/samples/Logotipo_Masterpiece_NanoBanana_ARCO_Ingenieria.png",
      thumb: "/samples/Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png",
      plateNum: 14,
      i18n: {
        es: { title: "Logotipo Masterpiece Alta Resolución e Isotipo 1:1 Centrado (.PNG)", desc: "Versión completa de la Iteración #5 (Lineal Minimalista) de ARCO Ingeniería junto con su Isotipo 1:1 de 1024×1024 px sin texto duplicado para ícono de App y avatar." },
        en: { title: "High-Res Masterpiece Logo & Centered 1:1 App Icon (.PNG)", desc: "Full lockup of Iteration #5 (Minimalist Linear) of ARCO Ingeniería plus its 1024×1024 px 1:1 symbol for App Icon and social avatar." },
        fr: { title: "Logo Masterpiece Haute Résolution et Icône App 1:1 (.PNG)", desc: "Version complète de l'Itération #5 d'ARCO Ingeniería avec son symbole 1:1 de 1024×1024 px centré pour icône d'application." },
        pt: { title: "Logótipo Masterpiece Alta Resolução e Ícone App 1:1 (.PNG)", desc: "Versão completa da Iteração #5 da ARCO Ingeniería com o seu símbolo 1:1 de 1024×1024 px centrado para ícone de aplicação." },
        de: { title: "Hochauflösendes Masterpiece-Logo & 1:1 App-Icon (.PNG)", desc: "Vollversion der Iteration #5 von ARCO Ingeniería inklusive zentriertem 1024×1024 px 1:1-Symbol für App-Icons." },
        it: { title: "Logo Masterpiece Alta Risoluzione e Icona App 1:1 (.PNG)", desc: "Versione completa dell'Iterazione #5 di ARCO Ingeniería con il simbolo 1:1 da 1024×1024 px centrato per icona app." }
      }
    },
    {
      num: "05",
      format: ".DOCX · HOJA MEMBRETADA",
      sampleUrl: "/samples/Plantilla_Hoja_Membretada_arco_ingenieria.docx",
      thumb: "/assets/app_captures/arco_33_paso6_2_boveda_ejecutiva_descargas.png",
      plateNum: 25,
      i18n: {
        es: { title: "Plantilla de Hoja Membretada y Licitación de Obra (.DOCX)", desc: "Documento nativo de Microsoft Word / Google Docs para ARCO Ingeniería con el isotipo #5 Lineal Minimalista en el encabezado, tipografía Montserrat y pie corporativo." },
        en: { title: "Editable Corporate Letterhead & Engineering Bid Template (.DOCX)", desc: "Native Microsoft Word / Google Docs template for ARCO Ingeniería featuring the #5 Minimalist Linear symbol in the header and corporate footer." },
        fr: { title: "Modèle de Papier à En-tête et Appel d'Offres (.DOCX)", desc: "Document natif Microsoft Word / Google Docs pour ARCO Ingeniería avec le symbole #5 Linéaire Minimaliste en en-tête." },
        pt: { title: "Modelo de Folha Timbrada e Proposta de Engenharia (.DOCX)", desc: "Documento nativo Microsoft Word / Google Docs para a ARCO Ingeniería com o símbolo #5 Linear Minimalista no cabeçalho." },
        de: { title: "Editierbarer Geschäftsbriefbogen & Ausschreibungsvorlage (.DOCX)", desc: "Native Microsoft Word / Google Docs Vorlage für ARCO Ingeniería mit dem #5 Linear-Minimalistischen Symbol in der Kopfzeile." },
        it: { title: "Modello di Carta Intestata e Capitolato d'Appalto (.DOCX)", desc: "Documento nativo Microsoft Word / Google Docs per ARCO Ingeniería con il simbolo #5 Lineare Minimalista nell'intestazione." }
      }
    },
    {
      num: "06",
      format: ".PPTX · PRESENTACIÓN 16:9",
      sampleUrl: "/samples/Plantilla_Presentacion_Ejecutiva_arco_ingenieria.pptx",
      thumb: "/assets/app_captures/arco_32_paso6_1_brandbook_lamina21_paleta.png",
      plateNum: 26,
      i18n: {
        es: { title: "Presentación Ejecutiva Panorámica 16:9 Editable (.PPTX · 6 Diapositivas)", desc: "Deck nativo de PowerPoint / Keynote para el Ing. Luis Ponce con portada institucional, Círculo Dorado, Perfil de Desarrolladoras, Touchpoints de Obra y Propuesta Económica." },
        en: { title: "Editable 16:9 Widescreen Executive Pitch Deck (.PPTX · 6 Slides)", desc: "Native PowerPoint / Keynote deck for Eng. Luis Ponce with cover slide, Golden Circle, Real Estate Developer Profile, Construction Touchpoints, and Commercial Proposal." },
        fr: { title: "Présentation Exécutive Panoramique 16:9 Éditable (.PPTX · 6 Diapositives)", desc: "Deck natif PowerPoint / Keynote pour l'Ing. Luis Ponce avec couverture, Cercle d'Or, Touchpoints de Chantier et Proposition Commerciale." },
        pt: { title: "Apresentação Executiva Panorâmica 16:9 Editável (.PPTX · 6 Diapositivos)", desc: "Deck nativo PowerPoint / Keynote para o Eng. Luis Ponce com capa, Círculo Dourado, Touchpoints de Obra e Proposta Comercial." },
        de: { title: "Editierbare 16:9 Widescreen-Präsentation (.PPTX · 6 Folien)", desc: "Natives PowerPoint / Keynote Deck für Ing. Luis Ponce mit Titelfolie, Golden Circle, Baustellen-Touchpoints und Angebot." },
        it: { title: "Presentazione Esecutiva Panoramica 16:9 Modificabile (.PPTX · 6 Slide)", desc: "Deck nativo PowerPoint / Keynote per l'Ing. Luis Ponce con copertina, Cerchio d'Oro, Touchpoint Cantiere e Proposta Commerciale." }
      }
    },
    {
      num: "07",
      format: ".HTML · FIRMA CORPORATIVA",
      sampleUrl: "/samples/Firma_Corporativa_Luis_Ponce_ARCO_Ingenieria.html",
      thumb: "/assets/app_captures/arco_34_modal_firma_corporativa_luis_ponce.png",
      plateNum: 27,
      i18n: {
        es: { title: "Firma de Correo Corporativa del Ing. Luis Ponce (.HTML · Gmail / Outlook)", desc: "Firma HTML interactiva lista para copiar y pegar con el isotipo #5 Lineal Minimalista de ARCO Ingeniería, cargo de Director General y enlaces directos." },
        en: { title: "Corporate Email Signature for Eng. Luis Ponce (.HTML · Gmail / Outlook)", desc: "Ready-to-paste HTML signature featuring the #5 Minimalist Linear symbol of ARCO Ingeniería, CEO title, and direct contact links." },
        fr: { title: "Signature E-mail Corporative de l'Ing. Luis Ponce (.HTML · Gmail / Outlook)", desc: "Signature HTML prête à coller avec le symbole #5 Linéaire Minimaliste d'ARCO Ingeniería et liens directs." },
        pt: { title: "Assinatura de E-mail Corporativa do Eng. Luis Ponce (.HTML · Gmail / Outlook)", desc: "Assinatura HTML pronta a colar com o símbolo #5 Linear Minimalista da ARCO Ingeniería e ligações diretas." },
        de: { title: "E-Mail-Signatur für Ing. Luis Ponce (.HTML · Gmail / Outlook)", desc: "Kopierfertige HTML-Signatur mit dem #5 Linear-Minimalistischen Symbol von ARCO Ingeniería und Direktlinks." },
        it: { title: "Firma Email Aziendale dell'Ing. Luis Ponce (.HTML · Gmail / Outlook)", desc: "Firma HTML pronta da incollare con il simbolo #5 Lineare Minimalista di ARCO Ingeniería e link diretti." }
      }
    },
    {
      num: "08",
      format: ".ZIP · KIT DE FUENTES .TTF",
      sampleUrl: "/samples/Kit_Fuentes_Oficiales_arco_ingenieria.zip",
      thumb: "/assets/app_captures/arco_21_paso4_4_tipografia_montserrat_arquitectura.png",
      plateNum: 17,
      i18n: {
        es: { title: "Kit de Fuentes Oficiales Instalables (.ZIP con .TTF + Licencia SIL OFL)", desc: "Paquete comprimido con los archivos .TTF listos para instalar en Windows/Mac de la tríada arquitectónica de ARCO Ingeniería: Montserrat, Plus Jakarta Sans y JetBrains Mono." },
        en: { title: "Installable Official Font Kit (.ZIP with .TTF + SIL OFL License)", desc: "ZIP bundle with desktop-installable .TTF files for ARCO Ingeniería's architectural typography triad: Montserrat, Plus Jakarta Sans, and JetBrains Mono." },
        fr: { title: "Kit de Polices Officielles Installables (.ZIP avec .TTF + Licence SIL OFL)", desc: "Archive ZIP contenant les fichiers .TTF installables de la triade typographique d'ARCO Ingeniería : Montserrat, Plus Jakarta Sans et JetBrains Mono." },
        pt: { title: "Kit de Fontes Oficiais Instaláveis (.ZIP com .TTF + Licença SIL OFL)", desc: "Pacote ZIP com os ficheiros .TTF instaláveis da tríade tipográfica da ARCO Ingeniería: Montserrat, Plus Jakarta Sans e JetBrains Mono." },
        de: { title: "Installierbares Schriftarten-Kit (.ZIP mit .TTF + SIL OFL Lizenz)", desc: "ZIP-Archiv mit installierbaren .TTF-Dateien der Typografie-Triade von ARCO Ingeniería: Montserrat, Plus Jakarta Sans und JetBrains Mono." },
        it: { title: "Kit Font Ufficiali Installabili (.ZIP con .TTF + Licenza SIL OFL)", desc: "Archivio ZIP con i file .TTF installabili della triade tipografica di ARCO Ingeniería: Montserrat, Plus Jakarta Sans e JetBrains Mono." }
      }
    },
    {
      num: "09",
      format: ".JSON / .SVG · TOKENS & SELLO",
      sampleUrl: "/samples/Sello_Circular_Curvas_arco_ingenieria.svg",
      thumb: "/assets/app_captures/arco_23_paso5_1_rueda_circular_colores_arco.png",
      plateNum: 21,
      i18n: {
        es: { title: "Sello Circular en Curvas y Design Tokens Cromáticos (.SVG / .JSON)", desc: "Sello institucional circular en curvas Bézier para planos y cascos de obra junto con los tokens cromáticos oficiales (#0078C0, #88E0E0, #585850, #0D2540, #F8FAFC)." },
        en: { title: "Circular Vector Seal & Color Design Tokens (.SVG / .JSON)", desc: "Circular institutional seal in Bézier curves for blueprints and hardhats plus the official color tokens (#0078C0, #88E0E0, #585850, #0D2540, #F8FAFC)." },
        fr: { title: "Sceau Circulaire Vectoriel et Design Tokens Chromatiques (.SVG / .JSON)", desc: "Sceau circulaire institutionnel en courbes de Bézier pour plans et casques de chantier avec tokens chromatiques officiels." },
        pt: { title: "Selo Circular Vetorial e Design Tokens Cromáticos (.SVG / .JSON)", desc: "Selo circular institucional em curvas Bézier para plantas e capacetes de obra com tokens cromáticos oficiais." },
        de: { title: "Rundes Vektorsiegel & Farb-Design-Tokens (.SVG / .JSON)", desc: "Rundes Siegel in Bézier-Kurven für Baupläne und Schutzhelme sowie offizielle Farb-Tokens (#0078C0, #88E0E0, #585850, #0D2540, #F8FAFC)." },
        it: { title: "Sigillo Circolare Vettoriale e Design Token Cromatici (.SVG / .JSON)", desc: "Sigillo circolare istituzionale in curve di Bézier per tavole tecniche e caschi da cantiere con token cromatici ufficiali." }
      }
    }
  ];


  // Infografía Académica Dinámica y Responsiva (Sección 3: Bases Teóricas — Cero Cápsulas de Video del Fundador)
  const ACADEMIC_INFOGRAPHIC_STAGES = [
    {
      step: 0,
      code: "ETAPA 00",
      color: "#426EAE",
      authors: "Peter Drucker · David Aaker · Sagi Haviv · Theodore Levitt",
      works: "Managing for Results (1964) · Managing Brand Equity (1991) · Identify (2011)",
      diagramType: "equity_spectrum",
      i18n: {
        es: {
          title: "Diagnóstico de Capital Visual, Giro de Negocio y Espectro de Marca",
          thesis: "Toda decisión de identidad parte de cuantificar el capital visual acumulado (Brand Equity) y evitar la miopía de marketing definiendo la transformación real que entrega la empresa.",
          pillars: [
            "Preservación o evolución progresiva de activos visuales existentes (Aaker & Haviv)",
            "Definición de alcance: Marca desde Cero, Rediseño Evolutivo o Arquitectura de Submarcas",
            "Extracción algorítmica de paleta base y parametrización del giro comercial"
          ],
          output: "Expediente de Diagnóstico Inicial + Arquitectura de Marca Madre y Submarcas"
        },
        en: {
          title: "Visual Equity Diagnosis, Business Line & Brand Relationship Spectrum",
          thesis: "Every identity decision begins by quantifying accumulated Brand Equity and avoiding marketing myopia by defining the real transformation delivered by the company.",
          pillars: [
            "Preservation or progressive evolution of existing visual assets (Aaker & Haviv)",
            "Scope definition: Brand from Scratch, Evolutionary Redesign, or Sub-brand Architecture",
            "Algorithmic base palette extraction and business sector parameterization"
          ],
          output: "Initial Diagnosis Dossier + Master Brand & Sub-brand Architecture"
        },
        fr: {
          title: "Diagnostic du Capital Visuel, Secteur d'Activité et Spectre de Marque",
          thesis: "Toute décision d'identité commence par mesurer le capital de marque accumulé (Brand Equity) et définir la transformation réelle apportée au client.",
          pillars: [
            "Préservation ou évolution progressive des actifs visuels existants (Aaker & Haviv)",
            "Définition du périmètre : Création de Zéro, Refonte Évolutive ou Sous-marques",
            "Extraction algorithmique de la palette et paramétrage du secteur d'activité"
          ],
          output: "Dossier de Diagnostic Initial + Architecture Marque Mère et Sous-marques"
        },
        pt: {
          title: "Diagnóstico de Património Visual, Ramo de Negócio e Espectro de Marca",
          thesis: "Toda decisão de identidade parte de quantificar o capital visual acumulado (Brand Equity) e definir a transformação real entregue pela empresa.",
          pillars: [
            "Preservação ou evolução progressiva de ativos visuais existentes (Aaker & Haviv)",
            "Definição de âmbito: Marca do Zero, Redesenho Evolutivo ou Submarcas",
            "Extração algorítmica da paleta base e parametrização do ramo comercial"
          ],
          output: "Dossier de Diagnóstico Inicial + Arquitetura de Marca Mãe e Submarcas"
        },
        de: {
          title: "Diagnose des Visuellen Kapitals, Geschäftsfeld & Markenspektrum",
          thesis: "Jede Identitätsentscheidung beginnt mit der Bewertung des vorhandenen Markenwerts (Brand Equity) und der klaren Definition des Kundennutzens.",
          pillars: [
            "Bewahrung oder progressive Evolution bestehender visueller Assets (Aaker & Haviv)",
            "Umfangsdefinition: Neustart, Evolutionäres Redesign oder Submarken-Architektur",
            "Algorithmische Farbextraktion und Parametrisierung des Geschäftsfelds"
          ],
          output: "Initiales Diagnose-Dossier + Dachmarken- & Submarken-Architektur"
        },
        it: {
          title: "Diagnosi del Capitale Visivo, Settore Aziendale e Spettro di Marca",
          thesis: "Ogni decisione d'identità parte dalla misurazione del valore visivo accumulato (Brand Equity) e dalla definizione della trasformazione offerta al cliente.",
          pillars: [
            "Preservazione o evoluzione progressiva degli asset visivi esistenti (Aaker & Haviv)",
            "Definizione dell'ambito: Brand da Zero, Redesign Evolutivo o Sub-brand",
            "Estrazione algoritmica della palette base e parametrizzazione del settore"
          ],
          output: "Dossier di Diagnosi Iniziale + Architettura Brand Madre e Sub-brand"
        }
      }
    },
    {
      step: 1,
      code: "ETAPA 01",
      color: "#FF7A00",
      authors: "Simon Sinek · Carl Jung · Jennifer Aaker · Donald Miller · Alex Osterwalder",
      works: "Start With Why (2009) · Dimensions of Brand Personality (1997) · Building a StoryBrand (2017)",
      diagramType: "golden_circle",
      i18n: {
        es: {
          title: "El Círculo Dorado, Arquetipos de Personalidad y Promesa en 3 Pasos",
          thesis: "Las personas no compran lo que haces, compran el porqué lo haces. La comunicación biológica fluye del sistema límbico (Propósito WHY) hacia el neocórtex (Diferenciador HOW y Producto WHAT).",
          pillars: [
            "Núcleo Límbico (WHY): Causa, creencia y razón de existir más allá de la utilidad",
            "Proceso Diferenciador (HOW): Método propietario resumido en 3 pasos claros (StoryBrand)",
            "La Empresa como Persona: Dimensiones de personalidad de Jennifer Aaker y arquetipos de Jung"
          ],
          output: "Páginas Estratégicas 01 a 08 del Brandbook Oficial"
        },
        en: {
          title: "The Golden Circle, Personality Archetypes & 3-Step Value Promise",
          thesis: "People don't buy what you do; they buy why you do it. Biological decision-making flows from the limbic brain (WHY) outward to the neocortex (HOW and WHAT).",
          pillars: [
            "Limbic Core (WHY): Cause, belief, and reason for being beyond profit",
            "Differentiating Process (HOW): Proprietary method distilled into 3 clear steps (StoryBrand)",
            "The Company as a Person: Jennifer Aaker's personality dimensions & Jungian archetypes"
          ],
          output: "Strategic Pages 01 to 08 of the Official Brandbook"
        },
        fr: {
          title: "Le Cercle d'Or, Archétypes de Personnalité et Promesse en 3 Étapes",
          thesis: "Les gens n'achètent pas ce que vous faites, mais pourquoi vous le faites. La décision naît dans le système limbique (WHY) avant le néocortex (HOW et WHAT).",
          pillars: [
            "Cœur Limbique (WHY) : Raison d'être et conviction profonde de l'entreprise",
            "Processus Différenciateur (HOW) : Méthode propriétaire en 3 étapes claires (StoryBrand)",
            "L'Entreprise comme Personne : Dimensions de personnalité d'Aaker et archétypes de Jung"
          ],
          output: "Pages Stratégiques 01 à 08 du Brandbook Officiel"
        },
        pt: {
          title: "O Círculo Dourado, Arquétipos de Personalidade e Promessa em 3 Passos",
          thesis: "As pessoas não compram o que faz, compram o porquê o faz. A decisão biológica flui do sistema límbico (WHY) para o neocórtex (HOW e WHAT).",
          pillars: [
            "Núcleo Límbico (WHY): Causa, crença e razão de existir além do lucro",
            "Processo Diferenciador (HOW): Método próprio resumido em 3 passos claros (StoryBrand)",
            "A Empresa como Pessoa: Dimensões de personalidade de Aaker e arquétipos de Jung"
          ],
          output: "Páginas Estratégicas 01 a 08 do Brandbook Oficial"
        },
        de: {
          title: "Der Golden Circle, Persönlichkeitsarchetypen & 3-Schritte-Versprechen",
          thesis: "Menschen kaufen nicht, was Sie tun, sondern warum Sie es tun. Entscheidungen entstehen im limbischen System (WHY) vor dem Neokortex (HOW und WHAT).",
          pillars: [
            "Limbischer Kern (WHY): Sinn, Überzeugung und Daseinszweck der Marke",
            "Differenzierender Prozess (HOW): Eigene Methode in 3 klaren Schritten (StoryBrand)",
            "Das Unternehmen als Person: Markenpersönlichkeit nach Aaker & Archetypen nach Jung"
          ],
          output: "Strategische Seiten 01 bis 08 des Offiziellen Brandbooks"
        },
        it: {
          title: "Il Cerchio d'Oro, Archetipi di Personalità e Promessa in 3 Passi",
          thesis: "Le persone non comprano ciò che fai, ma perché lo fai. La decisione biologica fluisce dal sistema limbico (WHY) verso la neocorteccia (HOW e WHAT).",
          pillars: [
            "Nucleo Limbico (WHY): Causa, convinzione e scopo profondo dell'azienda",
            "Processo Differenziante (HOW): Metodo proprietario sintetizzato in 3 passi (StoryBrand)",
            "L'Azienda come Persona: Dimensioni di personalità di Aaker e archetipi di Jung"
          ],
          output: "Pagine Strategiche da 01 a 08 del Brandbook Ufficiale"
        }
      }
    },
    {
      step: 2,
      code: "ETAPA 02",
      color: "#4C9DE6",
      authors: "Jan Carlzon · Don Norman · Katherine Lemon & Peter Verhoef · Bernd Schmitt",
      works: "Moments of Truth (1987) · The Design of Everyday Things (1988) · Customer Experience (2016)",
      diagramType: "touchpoints_wave",
      i18n: {
        es: {
          title: "Ingeniería de Touchpoints y Momentos de la Verdad (Antes · Durante · Después)",
          thesis: "Una marca es la suma de cada episodio de 15 segundos donde un cliente entra en contacto con su operación (Carlzon) eliminando la fricción cognitiva (Norman).",
          pillars: [
            "Fase ANTES (Descubrimiento): Redes, web clara, propuesta ejecutiva y primer contacto",
            "Fase DURANTE (Operación Cero Fricción): Entrega impecable donde se comprueba la promesa",
            "Fase DESPUÉS (Lealtad y Embajadores): Seguimiento, portal de clientes y recompra"
          ],
          output: "Matriz de Experiencia + Aplicaciones Operativas del Brandbook"
        },
        en: {
          title: "Touchpoint Engineering & Moments of Truth (Before · During · After)",
          thesis: "A brand is the sum of every 15-second episode where a customer interacts with its operation (Carlzon) while eliminating cognitive friction (Norman).",
          pillars: [
            "BEFORE Stage (Discovery): Social channels, clear website, executive proposal & first inquiry",
            "DURING Stage (Zero-Friction Delivery): Flawless execution proving the core promise",
            "AFTER Stage (Loyalty & Advocacy): Follow-up, client portal, and referral loop"
          ],
          output: "Experience Blueprint + Operational Brandbook Applications"
        },
        fr: {
          title: "Ingénierie des Touchpoints et Moments de Vérité (Avant · Pendant · Après)",
          thesis: "Une marque est la somme de chaque épisode de 15 secondes où un client interagit avec son opération (Carlzon) sans friction cognitive (Norman).",
          pillars: [
            "Phase AVANT (Découverte) : Réseaux, site clair, proposition exécutive et premier contact",
            "Phase PENDANT (Zéro Friction) : Prestation irréprochable prouvant la promesse centrale",
            "Phase APRÈS (Fidélisation) : Suivi proactif, portail client et recommandation"
          ],
          output: "Matrice d'Expérience + Applications Opérationnelles du Brandbook"
        },
        pt: {
          title: "Engenharia de Touchpoints e Momentos da Verdade (Antes · Durante · Depois)",
          thesis: "Uma marca é a soma de cada episódio de 15 segundos em que um cliente interage com a operação (Carlzon) eliminando a fricção cognitiva (Norman).",
          pillars: [
            "Fase ANTES (Descoberta): Redes, site claro, proposta executiva e primeiro contacto",
            "Fase DURANTE (Operação Zero Fricção): Entrega impecável que comprova a promessa",
            "Fase DEPOIS (Fidelização): Acompanhamento, portal de clientes e recomendação"
          ],
          output: "Matriz de Experiência + Aplicações Operacionais do Brandbook"
        },
        de: {
          title: "Touchpoint-Engineering & Momente der Wahrheit (Vorher · Während · Nachher)",
          thesis: "Eine Marke ist die Summe jeder 15-Sekunden-Interaktion mit dem Kunden (Carlzon) bei minimaler kognitiver Reibung (Norman).",
          pillars: [
            "Phase VORHER (Entdeckung): Social Media, klare Website, Angebot & Erstkontakt",
            "Phase WÄHREND (Null Reibung): Perfekte Leistungserbringung als Beweis des Versprechens",
            "Phase NACHHER (Bindung & Empfehlung): Betreuung, Kundenportal und Weiterempfehlung"
          ],
          output: "Experience-Matrix + Operative Brandbook-Anwendungen"
        },
        it: {
          title: "Ingegneria dei Touchpoint e Momenti della Verità (Prima · Durante · Dopo)",
          thesis: "Un brand è la somma di ogni episodio di 15 secondi in cui un cliente entra in contatto con l'operatività (Carlzon) senza attrito cognitivo (Norman).",
          pillars: [
            "Fase PRIMA (Scoperta): Social, sito chiaro, proposta esecutiva e primo contatto",
            "Fase DURANTE (Zero Attrito): Erogazione impeccabile che dimostra la promessa",
            "Fase DOPO (Fidelizzazione): Follow-up, portale clienti e passaparola"
          ],
          output: "Matrice d'Esperienza + Applicazioni Operative del Brandbook"
        }
      }
    },
    {
      step: 3,
      code: "ETAPA 03",
      color: "#0D2540",
      authors: "Alexandra Watkins · Al Ries & Jack Trout · David Placek · OMPI (Clasificación de Niza)",
      works: "Hello, My Name Is Awesome (2014) · Positioning (1981) · WIPO Nice Agreement (45 Classes)",
      diagramType: "smile_radar",
      i18n: {
        es: {
          title: "Modelo SMILE & SCRATCH, Simbolismo Fonético y Blindaje en Clases de Niza",
          thesis: "El nombre es el primer ancla de posicionamiento en la mente humana (Ries & Trout). Su éxito depende de su capacidad sugestiva, sonoridad fonética y viabilidad registral.",
          pillars: [
            "Evaluación SMILE: Suggestive (Sugerente), Memorable, Imagery (Imagen mental), Legs (Extensible), Emotional",
            "Filtro SCRATCH: Eliminación de defectos ortográficos, pronunciación confusa o nombres genéricos",
            "Clasificación Internacional de Niza (45 Clases OMPI) y construcción del Monograma 1:1"
          ],
          output: "Nombre Oficial Validado + Descriptor Comercial + Expediente Fonético y de Niza"
        },
        en: {
          title: "SMILE & SCRATCH Model, Sound Symbolism & WIPO Nice Trademark Shield",
          thesis: "Your name is the first positioning anchor in the human mind (Ries & Trout). Its strength relies on suggestive imagery, acoustic rhythm, and legal registrability.",
          pillars: [
            "SMILE Evaluation: Suggestive, Memorable, Imagery, Legs (Extendable), Emotional resonance",
            "SCRATCH Filter: Elimination of spelling traps, awkward pronunciation, or generic clichés",
            "WIPO International Nice Classification (45 Classes) & 1:1 Monogram construction"
          ],
          output: "Validated Official Name + Commercial Tagline + Phonetic & Nice Class Dossier"
        },
        fr: {
          title: "Modèle SMILE & SCRATCH, Symbolisme Phonétique et Classes OMPI de Nice",
          thesis: "Le nom est le premier ancrage de positionnement dans l'esprit du client (Ries & Trout). Sa force dépend de son imagerie mentale, de sa sonorité et de sa protection juridique.",
          pillars: [
            "Évaluation SMILE : Suggestive, Memorable, Imagery, Legs (Déclinable), Emotional",
            "Filtre SCRATCH : Élimination des pièges orthographiques et prononciations ambiguës",
            "Classification Internationale de Nice (45 Classes OMPI) et Monogramme 1:1"
          ],
          output: "Nom Officiel Validé + Slogan Commercial + Dossier Phonétique et OMPI"
        },
        pt: {
          title: "Modelo SMILE & SCRATCH, Simbolismo Fonético e Classes de Nice OMPI",
          thesis: "O nome é a primeira âncora de posicionamento na mente humana (Ries & Trout). O seu impacto depende da imagem mental, sonoridade e viabilidade legal.",
          pillars: [
            "Avaliação SMILE: Suggestive, Memorable, Imagery, Legs (Expansível), Emotional",
            "Filtro SCRATCH: Eliminação de erros ortográficos ou pronúncia confusa",
            "Classificação Internacional de Nice (45 Classes OMPI) e Monograma 1:1"
          ],
          output: "Nome Oficial Validado + Eslogan Comercial + Dossier Fonético e de Nice"
        },
        de: {
          title: "SMILE- & SCRATCH-Modell, Lautsymbolik & WIPO Nizza-Markenschutz",
          thesis: "Der Name ist der erste Positionierungsanker im Kopf des Kunden (Ries & Trout). Seine Stärke beruht auf Bildhaftigkeit, Klangmechanik und Schutzfähigkeit.",
          pillars: [
            "SMILE-Bewertung: Suggestive, Memorable, Imagery, Legs (Skalierbar), Emotional",
            "SCRATCH-Filter: Ausschluss von Schreibfehlern und schwer aussprechbaren Begriffen",
            "Internationale Nizza-Klassifikation (45 WIPO-Klassen) & 1:1-Monogramm"
          ],
          output: "Validierter Markenname + Slogan + Phonetik- & Nizza-Dossier"
        },
        it: {
          title: "Modello SMILE & SCRATCH, Simbolismo Fonetico e Classi di Nizza OMPI",
          thesis: "Il nome è la prima ancora di posizionamento nella mente del cliente (Ries & Trout). La sua forza dipende da capacità evocativa, ritmo acustico e tutela legale.",
          pillars: [
            "Valutazione SMILE: Suggestive, Memorable, Imagery, Legs (Estensibile), Emotional",
            "Filtro SCRATCH: Eliminazione di trappole ortografiche e pronunce ambigue",
            "Classificazione Internazionale di Nizza (45 Classi OMPI) e Monogramma 1:1"
          ],
          output: "Nome Ufficiale Validato + Slogan Commerciale + Dossier Fonetico e Nizza"
        }
      }
    },
    {
      step: 4,
      code: "ETAPA 04",
      color: "#426EAE",
      authors: "Prof. Mitsuo Nagamachi · Charles E. Osgood · V. S. Ramachandran · Robert Bringhurst",
      works: "Kansei Engineering (1995) · The Measurement of Meaning (1957) · Elements of Typographic Style (1992)",
      diagramType: "osgood_kansei",
      i18n: {
        es: {
          title: "Ingeniería Kansei, Diferencial Semántico de Osgood y Voz Tipográfica",
          thesis: "Los sentimientos humanos (Kansei) y las connotaciones semánticas (Osgood) pueden cuantificarse en 7 ejes bipolares para traducir la estrategia en radios de curvatura, peso de trazo y proporción tipográfica.",
          pillars: [
            "Diferencial Semántico de Osgood (1957): Medición bipolar en 7 ejes (Orgánico ↔ Geométrico, Clásico ↔ Disruptivo)",
            "Efecto Neuroestético Bouba/Kiki (Ramachandran): Curvas suaves para empatía vs. ángulos agudos para precisión técnica",
            "Arquitectura Tipográfica (Bringhurst & Frutiger): Emparejamiento óptico de fuentes de titular y lectura"
          ],
          output: "Vector Paramétrico de 7 Ejes + Par Tipográfico Oficial + Semilla Estructural"
        },
        en: {
          title: "Kansei Engineering, Osgood's Semantic Differential & Typographic Voice",
          thesis: "Human feelings (Kansei) and semantic connotations (Osgood) can be quantified across 7 bipolar axes to translate strategy into corner radii, stroke weight, and typographic proportion.",
          pillars: [
            "Osgood's Semantic Differential (1957): 7-axis bipolar calibration (Organic ↔ Geometric, Classic ↔ Disruptive)",
            "Bouba/Kiki Neuroaesthetic Effect (Ramachandran): Soft curves for empathy vs. sharp angles for technical precision",
            "Typographic Architecture (Bringhurst & Frutiger): Optical pairing of display and body typefaces"
          ],
          output: "7-Axis Parametric Vector + Official Font Pairing + Structural Seed"
        },
        fr: {
          title: "Ingénierie Kansei, Différentiel Sémantique d'Osgood et Voix Typographique",
          thesis: "Les émotions humaines (Kansei) et les connotations sémantiques (Osgood) se quantifient sur 7 axes bipolaires pour traduire la stratégie en rayons de courbure, graisse de trait et typographie.",
          pillars: [
            "Différentiel Sémantique d'Osgood (1957) : Calibrage sur 7 axes (Organique ↔ Géométrique, Classique ↔ Disruptif)",
            "Effet Neuro-esthétique Bouba/Kiki (Ramachandran) : Courbes d'empathie vs angles de précision",
            "Architecture Typographique (Bringhurst & Frutiger) : Duo optique de polices de titre et de lecture"
          ],
          output: "Vecteur Paramétrique à 7 Axes + Duo Typographique + Structure de Base"
        },
        pt: {
          title: "Engenharia Kansei, Diferencial Semântico de Osgood e Voz Tipográfica",
          thesis: "As emoções humanas (Kansei) e as conotações semânticas (Osgood) quantificam-se em 7 eixos bipolares para traduzir a estratégia em raios de curvatura, espessura de traço e tipografia.",
          pillars: [
            "Diferencial Semântico de Osgood (1957): Medição bipolar em 7 eixos (Orgânico ↔ Geométrico, Clássico ↔ Disruptivo)",
            "Efeito Neuroestético Bouba/Kiki (Ramachandran): Curvas suaves para empatia vs. ângulos para precisão técnica",
            "Arquitetura Tipográfica (Bringhurst & Frutiger): Emparelhamento óptico de fontes de título e corpo"
          ],
          output: "Vetor Paramétrico de 7 Eixos + Par Tipográfico Oficial + Semente Estrutural"
        },
        de: {
          title: "Kansei-Engineering, Semantisches Differential nach Osgood & Typografie",
          thesis: "Menschliche Emotionen (Kansei) und semantische Konnotationen (Osgood) werden auf 7 bipolaren Achsen quantifiziert, um Strategie in Kurvenradien, Strichstärke und Typografie zu übersetzen.",
          pillars: [
            "Semantisches Differential nach Osgood (1957): 7-Achsen-Kalibrierung (Organisch ↔ Geometrisch, Klassisch ↔ Disruptiv)",
            "Bouba/Kiki-Neuroästhetik (Ramachandran): Weiche Kurven für Nähe vs. präzise Winkel für Ingenieurskunst",
            "Typografische Architektur (Bringhurst & Frutiger): Optische Paarung von Titel- und Fließtextschrift"
          ],
          output: "Parametrischer 7-Achsen-Vektor + Offizielles Schriftpaar + Grundstruktur"
        },
        it: {
          title: "Ingegneria Kansei, Differenziale Semantico di Osgood e Voce Tipografica",
          thesis: "Le emozioni umane (Kansei) e le connotazioni semantiche (Osgood) si quantificano su 7 assi bipolari per tradurre la strategia in raggi di curvatura, spessore del tratto e tipografia.",
          pillars: [
            "Differenziale Semantico di Osgood (1957): Calibrazione su 7 assi (Organico ↔ Geometrico, Classico ↔ Dirompente)",
            "Effetto Neuroestetico Bouba/Kiki (Ramachandran): Curve morbide per empatia vs angoli netti per precisione",
            "Architettura Tipografica (Bringhurst & Frutiger): Accoppiamento ottico di font per titoli e testo"
          ],
          output: "Vettore Parametrico a 7 Assi + Coppia Tipografica Ufficiale + Seme Strutturale"
        }
      }
    },
    {
      step: 5,
      code: "ETAPA 05",
      color: "#FF7A00",
      authors: "Paul Rand · Masaaki Imai (Kaizen) · Max Wertheimer (Gestalt) · Josef Albers",
      works: "Thoughts on Design (1947) · Kaizen: The Key to Competitive Success (1986) · Interaction of Color (1963)",
      diagramType: "kaizen_bezier_grid",
      i18n: {
        es: {
          title: "Síntesis Geométrica de Paul Rand, Leyes de la Gestalt e Ingeniería Kaizen",
          thesis: "Un gran símbolo combina simplicidad, recordación y escalabilidad (Paul Rand) perfeccionadas mediante ciclos iterativos Kaizen (Masaaki Imai) y armonía cromática (Josef Albers).",
          pillars: [
            "Ingeniería Kaizen (Masaaki Imai): Evolución continua en 10 iteraciones aislando variables geométricas",
            "Leyes de la Gestalt (Wertheimer) y Retícula 8X×3X: Cierre visual, pregnancia figura-fondo y área de aislamiento",
            "Psicología e Interacción del Color (Albers & Itten): Validación de contraste WCAG AAA en positivo y negativo"
          ],
          output: "Logotipo Oficial en Curvas Bézier (.SVG/.AI) + Ícono 1:1 + Submarcas Homologadas"
        },
        en: {
          title: "Paul Rand's Geometric Synthesis, Gestalt Laws & Kaizen Engineering",
          thesis: "A great symbol combines simplicity, memorability, and scalability (Paul Rand), refined through iterative Kaizen cycles (Masaaki Imai) and chromatic harmony (Josef Albers).",
          pillars: [
            "Kaizen Engineering (Masaaki Imai): Continuous refinement across 10 iterations isolating geometric variables",
            "Gestalt Laws (Wertheimer) & 8X×3X Grid: Visual closure, figure-ground pregnance, and clear-space governance",
            "Color Psychology & Interaction (Albers & Itten): WCAG AAA contrast validation in positive and negative modes"
          ],
          output: "Official Bézier Vector Logo (.SVG/.AI) + 1:1 App Icon + Homologated Sub-brands"
        },
        fr: {
          title: "Synthèse Géométrique de Paul Rand, Lois de la Gestalt et Ingénierie Kaizen",
          thesis: "Un grand symbole allie simplicité, mémorabilité et polyvalence (Paul Rand), perfectionnées par des cycles itératifs Kaizen (Masaaki Imai) et l'harmonie chromatique (Albers).",
          pillars: [
            "Ingénierie Kaizen (Masaaki Imai) : Amélioration continue en 10 itérations isolant les variables géométriques",
            "Lois de la Gestalt (Wertheimer) et Grille 8X×3X : Clôture visuelle, rapport figure-fond et zone de protection",
            "Psychologie et Interaction des Couleurs (Albers & Itten) : Validation du contraste WCAG AAA positif/négatif"
          ],
          output: "Logo Officiel en Courbes de Bézier (.SVG/.AI) + Icône 1:1 + Sous-marques Homologuées"
        },
        pt: {
          title: "Síntese Geométrica de Paul Rand, Leis da Gestalt e Engenharia Kaizen",
          thesis: "Um grande símbolo combina simplicidade, memorabilidade e escalabilidade (Paul Rand), aperfeiçoadas por ciclos iterativos Kaizen (Masaaki Imai) e harmonia cromática (Albers).",
          pillars: [
            "Engenharia Kaizen (Masaaki Imai): Melhoria contínua em 10 iterações isolando variáveis geométricas",
            "Leis da Gestalt (Wertheimer) e Grelha 8X×3X: Fechamento visual, figura-fundo e área de proteção",
            "Psicologia e Interação da Cor (Albers & Itten): Validação de contraste WCAG AAA em positivo e negativo"
          ],
          output: "Logótipo Oficial em Curvas Bézier (.SVG/.AI) + Ícone 1:1 + Submarcas Homologadas"
        },
        de: {
          title: "Geometrische Synthese nach Paul Rand, Gestaltgesetze & Kaizen-Engineering",
          thesis: "Ein zeitloses Symbol vereint Einfachheit, Einprägsamkeit und Skalierbarkeit (Paul Rand), verfeinert durch iterative Kaizen-Zyklen (Masaaki Imai) und Farbharmonie (Albers).",
          pillars: [
            "Kaizen-Engineering (Masaaki Imai): Kontinuierliche Verfeinerung über 10 Iterationen",
            "Gestaltgesetze (Wertheimer) & 8X×3X-Raster: Prägnanz, Figur-Grund-Kontrast und Schutzzone",
            "Farbpsychologie & Wechselwirkung (Albers & Itten): WCAG-AAA-Kontrastprüfung in Positiv und Negativ"
          ],
          output: "Offizielles Bézier-Vektor-Logo (.SVG/.AI) + 1:1-Icon + Homologierte Submarken"
        },
        it: {
          title: "Sintesi Geometrica di Paul Rand, Leggi della Gestalt e Ingegneria Kaizen",
          thesis: "Un grande simbolo unisce semplicità, memorabilità e scalabilità (Paul Rand), perfezionate tramite cicli iterativi Kaizen (Masaaki Imai) e armonia cromatica (Albers).",
          pillars: [
            "Ingegneria Kaizen (Masaaki Imai): Miglioramento continuo in 10 iterazioni isolando le variabili geometriche",
            "Leggi della Gestalt (Wertheimer) e Griglia 8X×3X: Chiusura visiva, figura-sfondo e area di rispetto",
            "Psicologia e Interazione del Colore (Albers & Itten): Validazione contrasto WCAG AAA in positivo e negativo"
          ],
          output: "Logo Ufficiale in Curve di Bézier (.SVG/.AI) + Icona 1:1 + Sub-brand Omologati"
        }
      }
    },
    {
      step: 6,
      code: "ETAPA 06",
      color: "#0D2540",
      authors: "Massimo Vignelli · Josef Müller-Brockmann · Richard Danne & Bruce Blackburn (NASA) · Alina Wheeler",
      works: "The Vignelli Canon (2010) · Grid Systems in Graphic Design (1981) · NASA Graphics Standards Manual (1975)",
      diagramType: "vignelli_canon",
      i18n: {
        es: {
          title: "Canon de Massimo Vignelli, Sistemas de Retículas y Gobernanza Documental",
          thesis: "Un sistema de identidad trasciende en el tiempo cuando sus reglas estratégicas, geométricas y operativas quedan codificadas en un Brandbook claro y libre de ambigüedad.",
          pillars: [
            "Canon Editorial (Vignelli & Müller-Brockmann): Retícula modular, flujo abierto en curvas y jerarquía tipográfica",
            "Estándar Unificado: Brandbook oficial de más de 30 páginas (ajustable según el giro del negocio)",
            "Ecosistema de Implementación (Wheeler & NASA): Desde la filosofía y papelería hasta firma digital y tokens web"
          ],
          output: "Brandbook Oficial (+30 Páginas) + Bóveda Completa de 9 Entregables"
        },
        en: {
          title: "Massimo Vignelli's Canon, Grid Systems & Documentary Governance",
          thesis: "An identity system endures across decades when its strategic, geometric, and operational rules are codified in an unambiguous Brandbook.",
          pillars: [
            "Editorial Canon (Vignelli & Müller-Brockmann): Modular grid, open vector curves, and typographic hierarchy",
            "Unified Standard: Official Brandbook of over 30 pages (adaptable to your business sector)",
            "Implementation Ecosystem (Wheeler & NASA): From philosophy and stationery to digital signatures and web tokens"
          ],
          output: "Official Brandbook (30+ Pages) + Complete Vault of 9 Deliverables"
        },
        fr: {
          title: "Canon de Massimo Vignelli, Systèmes de Grilles et Gouvernance Documentaire",
          thesis: "Un système d'identité traverse le temps lorsque ses règles stratégiques, géométriques et opérationnelles sont codifiées dans un Brandbook sans ambiguïté.",
          pillars: [
            "Canon Éditorial (Vignelli & Müller-Brockmann) : Grille modulaire, courbes ouvertes et hiérarchie typographique",
            "Standard Unifié : Brandbook officiel de plus de 30 pages (adaptable selon votre secteur d'activité)",
            "Écosystème d'Implémentation (Wheeler & NASA) : De la philosophie et papeterie jusqu'aux tokens web"
          ],
          output: "Brandbook Officiel (+30 Pages) + Voûte Complète de 9 Livrables"
        },
        pt: {
          title: "Cânone de Massimo Vignelli, Sistemas de Grelhas e Governança Documental",
          thesis: "Um sistema de identidade perdura no tempo quando as suas regras estratégicas, geométricas e operacionais ficam codificadas num Brandbook claro.",
          pillars: [
            "Cânone Editorial (Vignelli & Müller-Brockmann): Grelha modular, fluxo aberto em curvas e hierarquia tipográfica",
            "Padrão Unificado: Brandbook oficial com mais de 30 páginas (ajustável conforme o ramo do negócio)",
            "Ecossistema de Implementação (Wheeler & NASA): Da filosofia e estacionário até assinatura digital e tokens web"
          ],
          output: "Brandbook Oficial (+30 Páginas) + Cofre Completo de 9 Entregáveis"
        },
        de: {
          title: "Kanon von Massimo Vignelli, Rastersysteme & Marken-Governance",
          thesis: "Ein Identitätssystem überdauert Jahrzehnte, wenn seine strategischen, geometrischen und operativen Regeln in einem eindeutigen Brandbook kodifiziert sind.",
          pillars: [
            "Editorischer Kanon (Vignelli & Müller-Brockmann): Modulares Raster, offene Kurven und Typografie-Hierarchie",
            "Einheitlicher Standard: Offizielles Brandbook mit über 30 Seiten (anpassbar je nach Branche)",
            "Implementierungs-Ökosystem (Wheeler & NASA): Von Philosophie und Briefpapier bis zu Web-Tokens"
          ],
          output: "Offizielles Brandbook (+30 Seiten) + Kompletter Tresor mit 9 Deliverables"
        },
        it: {
          title: "Canone di Massimo Vignelli, Sistemi di Griglie e Governance Documentale",
          thesis: "Un sistema d'identità dura nel tempo quando le sue regole strategiche, geometriche e operative sono codificate in un Brandbook privo di ambiguità.",
          pillars: [
            "Canone Editoriale (Vignelli & Müller-Brockmann): Griglia modulare, curve aperte e gerarchia tipografica",
            "Standard Unificato: Brandbook ufficiale di oltre 30 pagine (adattabile al settore aziendale)",
            "Ecosistema d'Implementazione (Wheeler & NASA): Dalla filosofia e cancelleria fino ai token web"
          ],
          output: "Brandbook Ufficiale (+30 Pagine) + Caveau Completo con 9 Deliverable"
        }
      }
    }
  ];

  const FOUNDER_ESSENTIAL_BOOKS = [
    { author: "Simon Sinek", year: "2009", work: "Start With Why", stage: "01", color: "#FF7A00" },
    { author: "Jan Carlzon", year: "1987", work: "Moments of Truth", stage: "02", color: "#4C9DE6" },
    { author: "Alexandra Watkins", year: "2014", work: "Hello, My Name Is Awesome (SMILE)", stage: "03", color: "#426EAE" },
    { author: "Masaaki Imai", year: "1986", work: "Kaizen: Continuous Improvement", stage: "05", color: "#FF7A00" },
    { author: "Charles E. Osgood & M. Nagamachi", year: "1957 / 1995", work: "Semantic Differential & Kansei Engineering", stage: "04", color: "#0D2540" },
    { author: "Paul Rand & Massimo Vignelli", year: "1985 / 2010", work: "Paul Rand: A Designer's Art & The Vignelli Canon", stage: "05–06", color: "#426EAE" }
  ];

  // Generador de Diagramas Vectoriales Interactivos para la Infografía de Bases Teóricas
  function buildAcademicDiagramSVG(diagramType, stageColor) {
    if (diagramType === "golden_circle") {
      return `<svg viewBox="0 0 320 210" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gcGradInf" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FF7A00" stop-opacity="0.28"/>
            <stop offset="60%" stop-color="#426EAE" stop-opacity="0.14"/>
            <stop offset="100%" stop-color="#0D2540" stop-opacity="0.05"/>
          </radialGradient>
        </defs>
        <circle cx="160" cy="105" r="88" fill="url(#gcGradInf)" stroke="#0D2540" stroke-width="2" stroke-dasharray="4 3"/>
        <circle cx="160" cy="105" r="58" fill="rgba(66,110,174,0.12)" stroke="#426EAE" stroke-width="2.2"/>
        <circle cx="160" cy="105" r="30" fill="#FF7A00" stroke="#FFFFFF" stroke-width="2.5"/>
        <text x="160" y="109" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat,sans-serif" font-weight="900" font-size="12">WHY</text>
        <text x="160" y="62" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="10">HOW · 3 STEPS</text>
        <text x="160" y="30" text-anchor="middle" fill="#426EAE" font-family="Montserrat,sans-serif" font-weight="800" font-size="10">WHAT · PRODUCT</text>
        <path d="M190 105 L285 105" stroke="#FF7A00" stroke-width="2" stroke-dasharray="3 3"/>
        <circle cx="285" cy="105" r="4" fill="#FF7A00"/>
      </svg>`;
    }
    if (diagramType === "touchpoints_wave") {
      return `<svg viewBox="0 0 320 210" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1="110" x2="296" y2="110" stroke="#CBD5E1" stroke-width="2"/>
        <path d="M 28 140 C 75 45, 115 45, 160 110 C 205 175, 245 45, 292 75" fill="none" stroke="#426EAE" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="68" cy="74" r="9" fill="#4C9DE6" stroke="#FFFFFF" stroke-width="2.5"/>
        <circle cx="160" cy="110" r="10" fill="#FF7A00" stroke="#FFFFFF" stroke-width="2.5"/>
        <circle cx="256" cy="78" r="9" fill="#0D2540" stroke="#FFFFFF" stroke-width="2.5"/>
        <text x="68" y="54" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="10">1. ANTES</text>
        <text x="160" y="142" text-anchor="middle" fill="#FF7A00" font-family="Montserrat,sans-serif" font-weight="900" font-size="10">2. DURANTE (15s)</text>
        <text x="256" y="56" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="10">3. DESPUÉS</text>
      </svg>`;
    }
    if (diagramType === "smile_radar") {
      return `<svg viewBox="0 0 320 210" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <polygon points="160,24 238,80 208,172 112,172 82,80" fill="rgba(66,110,174,0.10)" stroke="#94A3B8" stroke-width="1.5"/>
        <polygon points="160,38 224,85 198,158 122,158 96,85" fill="rgba(255,122,0,0.20)" stroke="#FF7A00" stroke-width="2.5"/>
        <circle cx="160" cy="38" r="4.5" fill="#0D2540"/><text x="160" y="17" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="9.5">S · SUGGESTIVE</text>
        <circle cx="224" cy="85" r="4.5" fill="#0D2540"/><text x="272" y="86" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="9.5">M · MEMORABLE</text>
        <circle cx="198" cy="158" r="4.5" fill="#0D2540"/><text x="235" y="188" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="9.5">I · IMAGERY</text>
        <circle cx="122" cy="158" r="4.5" fill="#0D2540"/><text x="85" y="188" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="9.5">L · LEGS</text>
        <circle cx="96" cy="85" r="4.5" fill="#0D2540"/><text x="48" y="86" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="9.5">E · EMOTIONAL</text>
      </svg>`;
    }
    if (diagramType === "osgood_kansei") {
      return `<svg viewBox="0 0 320 210" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="24" width="272" height="162" rx="14" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
        <line x1="56" y1="60" x2="264" y2="60" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/>
        <circle cx="205" cy="60" r="8" fill="#FF7A00" stroke="#FFFFFF" stroke-width="2"/>
        <text x="56" y="48" fill="#475569" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="9.5">Orgánico (Bouba)</text>
        <text x="264" y="48" text-anchor="end" fill="#0D2540" font-family="Plus Jakarta Sans,sans-serif" font-weight="800" font-size="9.5">Geométrico (Kiki)</text>
        <line x1="56" y1="108" x2="264" y2="108" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/>
        <circle cx="182" cy="108" r="8" fill="#426EAE" stroke="#FFFFFF" stroke-width="2"/>
        <text x="56" y="96" fill="#475569" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="9.5">Clásico / Herencia</text>
        <text x="264" y="96" text-anchor="end" fill="#0D2540" font-family="Plus Jakarta Sans,sans-serif" font-weight="800" font-size="9.5">Vanguardia Tecnológica</text>
        <line x1="56" y1="156" x2="264" y2="156" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/>
        <circle cx="134" cy="156" r="8" fill="#0D2540" stroke="#FFFFFF" stroke-width="2"/>
        <text x="56" y="144" fill="#0D2540" font-family="Plus Jakarta Sans,sans-serif" font-weight="800" font-size="9.5">Síntesis Minimalista</text>
        <text x="264" y="144" text-anchor="end" fill="#475569" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="9.5">Complejidad Escudo</text>
      </svg>`;
    }
    if (diagramType === "kaizen_bezier_grid") {
      return `<svg viewBox="0 0 320 210" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#E2E8F0" stroke-width="1">
          <line x1="40" y1="30" x2="280" y2="30"/><line x1="40" y1="65" x2="280" y2="65"/><line x1="40" y1="100" x2="280" y2="100"/><line x1="40" y1="135" x2="280" y2="135"/><line x1="40" y1="170" x2="280" y2="170"/>
          <line x1="40" y1="30" x2="40" y2="170"/><line x1="88" y1="30" x2="88" y2="170"/><line x1="136" y1="30" x2="136" y2="170"/><line x1="184" y1="30" x2="184" y2="170"/><line x1="232" y1="30" x2="232" y2="170"/><line x1="280" y1="30" x2="280" y2="170"/>
        </g>
        <rect x="64" y="45" width="192" height="110" rx="18" fill="none" stroke="#426EAE" stroke-width="2" stroke-dasharray="5 4"/>
        <path d="M 88 135 C 115 48, 205 48, 232 135" fill="none" stroke="#FF7A00" stroke-width="3.5"/>
        <line x1="88" y1="135" x2="115" y2="48" stroke="#0D2540" stroke-width="1.5"/>
        <line x1="232" y1="135" x2="205" y2="48" stroke="#0D2540" stroke-width="1.5"/>
        <circle cx="115" cy="48" r="5" fill="#0D2540"/><circle cx="205" cy="48" r="5" fill="#0D2540"/>
        <rect x="83" y="130" width="10" height="10" fill="#FF7A00"/><rect x="227" y="130" width="10" height="10" fill="#FF7A00"/>
        <text x="160" y="192" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="10">RETÍCULA 8X×3X · KAIZEN CONTINUO · BÉZIER</text>
      </svg>`;
    }
    if (diagramType === "vignelli_canon") {
      return `<svg viewBox="0 0 320 210" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
        <rect x="34" y="28" width="252" height="154" rx="16" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.2"/>
        <path d="M 34 86 Q 160 54 286 92 L 286 182 L 34 182 Z" fill="rgba(66,110,174,0.12)"/>
        <rect x="54" y="48" width="84" height="14" rx="4" fill="#0D2540"/>
        <rect x="54" y="70" width="130" height="8" rx="3" fill="#FF7A00"/>
        <rect x="54" y="104" width="64" height="56" rx="8" fill="#F8FAFC" stroke="#426EAE" stroke-width="1.6"/>
        <rect x="128" y="104" width="64" height="56" rx="8" fill="#F8FAFC" stroke="#426EAE" stroke-width="1.6"/>
        <rect x="202" y="104" width="64" height="56" rx="8" fill="#F8FAFC" stroke="#FF7A00" stroke-width="1.6"/>
        <text x="160" y="198" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="900" font-size="10">BRANDBOOK OFICIAL · +30 PÁGINAS EN CURVAS</text>
      </svg>`;
    }
    return `<svg viewBox="0 0 320 210" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="42" width="76" height="126" rx="14" fill="#F8FAFC" stroke="#426EAE" stroke-width="2"/>
      <rect x="122" y="28" width="76" height="140" rx="14" fill="#EFF6FF" stroke="#FF7A00" stroke-width="2.2"/>
      <rect x="214" y="42" width="76" height="126" rx="14" fill="#F8FAFC" stroke="#0D2540" stroke-width="2"/>
      <text x="68" y="108" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="9.5">DESDE CERO</text>
      <text x="160" y="102" text-anchor="middle" fill="#FF7A00" font-family="Montserrat,sans-serif" font-weight="900" font-size="9.5">EVOLUCIÓN</text>
      <text x="252" y="108" text-anchor="middle" fill="#0D2540" font-family="Montserrat,sans-serif" font-weight="800" font-size="9.5">SUBMARCAS</text>
    </svg>`;
  }

  // Estado Global Comercial y de Sincronización
  window.tbbCommercialDemoState = {
    activeMainSection: 1, // 1: Inicio, 2: App Tour, 3: Bases Teóricas, 4: Demo en Vivo, 5: Pack de Descargas
    heroConvergenceActive: false,
    heroSelectedTheoryIdx: 0,
    tourActiveStep: 0,
    tourIphoneLiveMode: false,
    beforeAfterVal: 54,
    kanseiGeoVal: 72,
    kanseiVanguardVal: 68,
    kanseiWeightVal: 64,
    demoViewportMode: "iphone", // "iphone" | "full"
    activeDemoStep: 0,
    brandName: "The Best Brand",
    selectedPlan: "pro_atelier",
    selectedPaymentMethod: "card",
    openVideoModalStep: null,
    migratedSteps0to3Snapshot: null
  };

  function hasProLicense() {
    try {
      return Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    } catch (e) {
      return false;
    }
  }
  window.tbbHasProLicense = hasProLicense;

  // Orden estricto del menú solicitado por el usuario:
  // 1. Inicio (/) | 2. App Tour (/app-tour) | 3. Bases Teóricas (/bases-teoricas) | 4. Demo en Vivo (/demo) | 5. Pack de Descargas (/pack-descargas)
  const SUBPAGE_META = {
    1: { slug: "inicio", path: "/" },
    2: { slug: "app-tour", path: "/app-tour" },
    3: { slug: "bases-teoricas", path: "/bases-teoricas" },
    4: { slug: "demo", path: "/demo" },
    5: { slug: "pack-descargas", path: "/pack-descargas" }
  };

  window.tbbSetActiveMainTab = function (slugOrNum) {
    const map = {
      "1": 1, "inicio": 1, "home": 1,
      "2": 2, "app-tour": 2, "tour": 2, "recorrido": 2,
      "3": 3, "bases-teoricas": 3, "bases-tecnicas": 3, "theory": 3,
      "4": 4, "demo": 4, "aplicacion": 4, "live-demo": 4,
      "5": 5, "pack-descargas": 5, "downloads": 5, "entregables": 5
    };
    const sec = map[String(slugOrNum || "1").toLowerCase()] || 1;
    window.tbbSwitchMainSection(sec);
  };

  window.tbbRenderActiveSubpageHTML = function (secNumber) {
    const s = Number(secNumber) || 1;
    if (s === 2) return window.tbbBuildSubpage2AppTourHTML();
    if (s === 3) return window.tbbBuildSubpage3TheoryHTML();
    if (s === 4) return window.tbbBuildSubpage4DemoHTML();
    if (s === 5) return window.tbbBuildSubpage5DownloadsHTML();
    return window.tbbBuildSubpage1HomeHTML();
  };

  window.tbbUpdateHeaderLogoDockState = function () {
    const st = window.tbbCommercialDemoState || {};
    const activeSec = Number(st.activeMainSection) || 1;
    const headerEl = document.querySelector(".tbb-master-header");
    const coverLogoEl = document.getElementById("tbbHomeCoverLogoBox");
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const shouldDockInHeader = activeSec !== 1 || scrollY > 175;
    if (headerEl) {
      headerEl.classList.toggle("is-logo-docked", shouldDockInHeader);
    }
    if (coverLogoEl) {
      coverLogoEl.classList.toggle("is-docked-to-header", shouldDockInHeader);
    }
  };

  window.tbbSwitchMainSection = function (secNumber, opts) {
    const s = Math.max(1, Math.min(5, Number(secNumber) || 1));
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.activeMainSection = s;

    // Close mobile drawer if open
    const drawer = document.getElementById("tbbMobileNavDrawer");
    if (drawer) drawer.classList.remove("open");

    const viewport = document.getElementById("tbbSubpageDynamicViewport");
    if (viewport) {
      viewport.innerHTML = window.tbbRenderActiveSubpageHTML(s);
    }

    // Update active state on all nav buttons
    document.querySelectorAll("[data-tbb-nav-sec]").forEach((btn) => {
      const btnSec = Number(btn.getAttribute("data-tbb-nav-sec"));
      btn.classList.toggle("active", btnSec === s);
    });

    if (!(opts && opts.skipHistory)) {
      try {
        const meta = SUBPAGE_META[s] || SUBPAGE_META[1];
        if (window.location.pathname !== meta.path) {
          window.history.pushState({ tbbSec: s }, "", meta.path);
        }
      } catch (e) {}
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, 0);
    }

    if (typeof window.tbbUpdateHeaderLogoDockState === "function") {
      window.tbbUpdateHeaderLogoDockState();
      setTimeout(() => window.tbbUpdateHeaderLogoDockState(), 120);
    }

    if (typeof window.tbbUpdateAlwaysOnFloatingBarText === "function") {
      window.tbbUpdateAlwaysOnFloatingBarText();
    }
    if (typeof window.tbbInitAwwwardsInteractions === "function") {
      setTimeout(() => window.tbbInitAwwwardsInteractions(), 40);
    }
  };

  // Interacciones del Escenario Protagonista de los 5 Pilares Científicos a Todo el Ancho (Sección 1: Inicio)
  window.tbbTriggerHeroConvergence = function () {
    const st = window.tbbCommercialDemoState || (window.tbbCommercialDemoState = {});
    st.heroConvergenceActive = !st.heroConvergenceActive;
    st.heroConvergenceBurstTs = performance.now();
    const stageEl = document.getElementById("tbbHeroInteractiveConvergenceStage");
    if (stageEl) {
      stageEl.classList.toggle("is-converged", st.heroConvergenceActive);
    }
    const btnLbl = document.getElementById("tbbConvergeBtnLabel");
    if (btnLbl) {
      btnLbl.textContent = st.heroConvergenceActive
        ? "Fusión Científica Activa · 5 Pilares en Síntesis"
        : t("heroConvergencePlayBtn");
    }
  };

  window.tbbSelectHeroTheoryNode = function (idx) {
    const st = window.tbbCommercialDemoState || (window.tbbCommercialDemoState = {});
    st.heroSelectedTheoryIdx = Number(idx) || 0;
    st.heroConvergenceBurstTs = performance.now();
    const detailEl = document.getElementById("tbbHeroTheoryNodeDetailBox");
    const stageObj = ACADEMIC_INFOGRAPHIC_STAGES[st.heroSelectedTheoryIdx + 1] || ACADEMIC_INFOGRAPHIC_STAGES[1];
    if (detailEl && stageObj) {
      const l = getLang();
      const loc = stageObj.i18n[l] || stageObj.i18n.es;
      detailEl.innerHTML = `
        <div class="tbb-hero-pillar-detail-grid">
          <div class="tbb-hero-pillar-detail-text">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:8px;">
              <span style="font-family:'JetBrains Mono',monospace; font-size:0.80rem; font-weight:800; color:${stageObj.color}; letter-spacing:0.06em;">${escHtml(stageObj.authors)}</span>
              <span style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:700; color:#475569; background:#FFFFFF; border:1px solid #E2E8F0; padding:4px 12px; border-radius:999px;">${escHtml(stageObj.works)}</span>
            </div>
            <div style="font-family:'Montserrat',sans-serif; font-size:1.25rem; font-weight:900; color:#0D2540; margin-bottom:6px;">${escHtml(loc.title)}</div>
            <div style="font-size:1.02rem; color:#334155; line-height:1.6; margin-bottom:10px;">${escHtml(loc.thesis)}</div>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${(loc.pillars || []).map((p) => `<span style="font-size:0.82rem; font-weight:700; color:#0D2540; background:#FFFFFF; border:1px solid #CBD5E1; padding:5px 12px; border-radius:999px;">✓ ${escHtml(p)}</span>`).join("")}
            </div>
          </div>
          <div class="tbb-hero-pillar-detail-diagram">
            ${buildAcademicDiagramSVG(stageObj.diagramType, stageObj.color)}
          </div>
        </div>
      `;
    }
    document.querySelectorAll(".tbb-hero-theory-pill").forEach((el, i) => {
      el.classList.toggle("active", i === st.heroSelectedTheoryIdx);
    });
  };

  // Data URI en curvas puras del Isotipo Oficial y del Logotipo THE BEST BRAND (Cero texto "del caos al sistema"; únicamente el Isotipo + "THE BEST BRAND")
  const TBB_ISOTIPO_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="102" r="87" fill="#090D16" fill-opacity="0.10"/><circle cx="100" cy="100" r="86" fill="#FF7A00"/><circle cx="100" cy="100" r="84.2" fill="none" stroke="#FFF7ED" stroke-width="1.2" stroke-opacity="0.55"/><circle cx="100" cy="100" r="81.2" fill="#EA580C" fill-opacity="0.65"/><circle cx="100" cy="100" r="79.5" fill="#070D19"/><circle cx="100" cy="100" r="76.5" fill="#0D2540" fill-opacity="0.88"/><circle cx="100" cy="96" r="68" fill="#1E3A8A" fill-opacity="0.28"/><circle cx="100" cy="100" r="77.2" fill="none" stroke="#60A5FA" stroke-width="1.3" stroke-opacity="0.42"/><circle cx="100" cy="100" r="56" fill="#38BDF8" fill-opacity="0.12"/><circle cx="100" cy="100" r="44" fill="#426EAE" fill-opacity="0.18"/><path d="M 100.00 87.00 C 86.50 68.00, 81.50 43.00, 100.00 32.00 C 118.50 43.00, 113.50 68.00, 100.00 87.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 88.74 C 104.31 65.54, 112.48 41.39, 134.00 41.11 C 144.52 59.89, 127.69 79.04, 106.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 93.50 C 120.96 72.31, 140.11 55.48, 158.89 66.00 C 158.61 87.52, 134.46 95.69, 111.26 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 113.00 100.00 C 132.00 86.50, 157.00 81.50, 168.00 100.00 C 157.00 118.50, 132.00 113.50, 113.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 106.50 C 134.46 104.31, 158.61 112.48, 158.89 134.00 C 140.11 144.52, 120.96 127.69, 111.26 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 111.26 C 127.69 120.96, 144.52 140.11, 134.00 158.89 C 112.48 158.61, 104.31 134.46, 106.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 100.00 113.00 C 113.50 132.00, 118.50 157.00, 100.00 168.00 C 81.50 157.00, 86.50 132.00, 100.00 113.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 111.26 C 95.69 134.46, 87.52 158.61, 66.00 158.89 C 55.48 140.11, 72.31 120.96, 93.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 106.50 C 79.04 127.69, 59.89 144.52, 41.11 134.00 C 41.39 112.48, 65.54 104.31, 88.74 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 87.00 100.00 C 68.00 113.50, 43.00 118.50, 32.00 100.00 C 43.00 81.50, 68.00 86.50, 87.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 93.50 C 65.54 95.69, 41.39 87.52, 41.11 66.00 C 59.89 55.48, 79.04 72.31, 88.74 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 88.74 C 72.31 79.04, 55.48 59.89, 66.00 41.11 C 87.52 41.39, 95.69 65.54, 93.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><circle cx="100" cy="100" r="28" fill="none" stroke="#93C5FD" stroke-width="0.9" stroke-opacity="0.45"/><circle cx="100" cy="100" r="25" fill="#FF7A00" fill-opacity="0.22"/><circle cx="100" cy="100" r="17.5" fill="#F97316" fill-opacity="0.48"/><circle cx="100" cy="100" r="11.8" fill="#FFEDD5" fill-opacity="0.86"/><circle cx="100" cy="100" r="6.5" fill="#FFFFFF"/><path d="M 42 66 C 56 35, 144 35, 158 66 C 138 50, 62 50, 42 66 Z" fill="#FFFFFF" fill-opacity="0.26"/></svg>`;
  const TBB_ISOTIPO_DATA_URI = "data:image/svg+xml;utf8," + encodeURIComponent(TBB_ISOTIPO_SVG_RAW);

  const TBB_CLEAN_LOGO_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 120" width="430" height="120"><g transform="translate(10, 10) scale(0.5)"><circle cx="100" cy="102" r="87" fill="#090D16" fill-opacity="0.10"/><circle cx="100" cy="100" r="86" fill="#FF7A00"/><circle cx="100" cy="100" r="84.2" fill="none" stroke="#FFF7ED" stroke-width="1.2" stroke-opacity="0.55"/><circle cx="100" cy="100" r="81.2" fill="#EA580C" fill-opacity="0.65"/><circle cx="100" cy="100" r="79.5" fill="#070D19"/><circle cx="100" cy="100" r="76.5" fill="#0D2540" fill-opacity="0.88"/><circle cx="100" cy="96" r="68" fill="#1E3A8A" fill-opacity="0.28"/><circle cx="100" cy="100" r="77.2" fill="none" stroke="#60A5FA" stroke-width="1.3" stroke-opacity="0.42"/><circle cx="100" cy="100" r="56" fill="#38BDF8" fill-opacity="0.12"/><circle cx="100" cy="100" r="44" fill="#426EAE" fill-opacity="0.18"/><path d="M 100.00 87.00 C 86.50 68.00, 81.50 43.00, 100.00 32.00 C 118.50 43.00, 113.50 68.00, 100.00 87.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 88.74 C 104.31 65.54, 112.48 41.39, 134.00 41.11 C 144.52 59.89, 127.69 79.04, 106.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 93.50 C 120.96 72.31, 140.11 55.48, 158.89 66.00 C 158.61 87.52, 134.46 95.69, 111.26 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 113.00 100.00 C 132.00 86.50, 157.00 81.50, 168.00 100.00 C 157.00 118.50, 132.00 113.50, 113.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 106.50 C 134.46 104.31, 158.61 112.48, 158.89 134.00 C 140.11 144.52, 120.96 127.69, 111.26 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 111.26 C 127.69 120.96, 144.52 140.11, 134.00 158.89 C 112.48 158.61, 104.31 134.46, 106.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 100.00 113.00 C 113.50 132.00, 118.50 157.00, 100.00 168.00 C 81.50 157.00, 86.50 132.00, 100.00 113.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 111.26 C 95.69 134.46, 87.52 158.61, 66.00 158.89 C 55.48 140.11, 72.31 120.96, 93.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 106.50 C 79.04 127.69, 59.89 144.52, 41.11 134.00 C 41.39 112.48, 65.54 104.31, 88.74 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 87.00 100.00 C 68.00 113.50, 43.00 118.50, 32.00 100.00 C 43.00 81.50, 68.00 86.50, 87.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 93.50 C 65.54 95.69, 41.39 87.52, 41.11 66.00 C 59.89 55.48, 79.04 72.31, 88.74 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 88.74 C 72.31 79.04, 55.48 59.89, 66.00 41.11 C 87.52 41.39, 95.69 65.54, 93.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><circle cx="100" cy="100" r="28" fill="none" stroke="#93C5FD" stroke-width="0.9" stroke-opacity="0.45"/><circle cx="100" cy="100" r="25" fill="#FF7A00" fill-opacity="0.22"/><circle cx="100" cy="100" r="17.5" fill="#F97316" fill-opacity="0.48"/><circle cx="100" cy="100" r="11.8" fill="#FFEDD5" fill-opacity="0.86"/><circle cx="100" cy="100" r="6.5" fill="#FFFFFF"/><path d="M 42 66 C 56 35, 144 35, 158 66 C 138 50, 62 50, 42 66 Z" fill="#FFFFFF" fill-opacity="0.26"/></g><line x1="125" y1="24" x2="125" y2="96" stroke="#CBD5E1" stroke-width="1.8"/><g transform="translate(0, 13)"><path d="M156.570 56L150.434 56L150.434 42.558L145.104 42.558L145.104 37.800L161.900 37.800L161.900 42.558L156.570 42.558L156.570 56ZM183.226 56L177.090 56L177.090 49.292L171.422 49.292L171.422 56L165.286 56L165.286 37.800L171.422 37.800L171.422 44.248L177.090 44.248L177.090 37.800L183.226 37.800L183.226 56ZM203.122 56L187.990 56L187.990 37.800L202.784 37.800L202.784 42.428L194.022 42.428L194.022 44.560L201.718 44.560L201.718 48.980L194.022 48.980L194.022 51.372L203.122 51.372L203.122 56ZM227.132 56L216.888 56L216.888 37.800L226.612 37.800Q230.382 37.800 232.176 39.139Q233.970 40.478 233.970 42.558L233.970 42.558Q233.970 43.936 233.216 45.002L233.216 45.002Q232.566 45.912 231.474 46.484L231.474 46.484Q231.526 46.510 231.604 46.536L231.604 46.536Q233.138 47.134 233.983 48.265Q234.828 49.396 234.828 50.982L234.828 50.982Q234.828 53.348 232.865 54.674Q230.902 56 227.132 56L227.132 56ZM222.920 48.850L222.920 51.710L226.612 51.710Q227.626 51.710 228.133 51.346Q228.640 50.982 228.640 50.280Q228.640 49.578 228.133 49.214Q227.626 48.850 226.612 48.850L226.612 48.850L222.920 48.850ZM222.920 42.090L222.920 44.794L225.780 44.794Q226.820 44.794 227.301 44.443Q227.782 44.092 227.782 43.442L227.782 43.442Q227.782 42.766 227.301 42.428Q226.820 42.090 225.780 42.090L225.780 42.090L222.920 42.090ZM253.918 56L238.786 56L238.786 37.800L253.580 37.800L253.580 42.428L244.818 42.428L244.818 44.560L252.514 44.560L252.514 48.980L244.818 48.980L244.818 51.372L253.918 51.372L253.918 56ZM264.870 56.416L264.870 56.416Q262.582 56.416 260.450 55.896Q258.318 55.376 256.940 54.544L256.940 54.544L258.916 50.072Q260.216 50.826 261.815 51.281Q263.414 51.736 264.922 51.736L264.922 51.736Q265.806 51.736 266.313 51.619Q266.820 51.502 267.054 51.281Q267.288 51.060 267.288 50.748L267.288 50.748Q267.288 50.254 266.742 49.968Q266.196 49.682 265.299 49.487Q264.402 49.292 263.336 49.071Q262.270 48.850 261.191 48.486Q260.112 48.122 259.215 47.524Q258.318 46.926 257.772 45.951Q257.226 44.976 257.226 43.520L257.226 43.520Q257.226 41.830 258.175 40.439Q259.124 39.048 261.009 38.216Q262.894 37.384 265.702 37.384L265.702 37.384Q267.548 37.384 269.342 37.774Q271.136 38.164 272.566 38.970L272.566 38.970L270.720 43.416Q269.368 42.740 268.107 42.402Q266.846 42.064 265.650 42.064L265.650 42.064Q264.766 42.064 264.246 42.220Q263.726 42.376 263.505 42.636Q263.284 42.896 263.284 43.208L263.284 43.208Q263.284 43.676 263.830 43.949Q264.376 44.222 265.273 44.404Q266.170 44.586 267.249 44.794Q268.328 45.002 269.394 45.366Q270.460 45.730 271.357 46.328Q272.254 46.926 272.800 47.888Q273.346 48.850 273.346 50.280L273.346 50.280Q273.346 51.944 272.397 53.335Q271.448 54.726 269.576 55.571Q267.704 56.416 264.870 56.416ZM287.054 56L280.918 56L280.918 42.558L275.588 42.558L275.588 37.800L292.384 37.800L292.384 42.558L287.054 42.558L287.054 56ZM315.614 56L305.370 56L305.370 37.800L315.094 37.800Q318.864 37.800 320.658 39.139Q322.452 40.478 322.452 42.558L322.452 42.558Q322.452 43.936 321.698 45.002L321.698 45.002Q321.048 45.912 319.956 46.484L319.956 46.484Q320.008 46.510 320.086 46.536L320.086 46.536Q321.620 47.134 322.465 48.265Q323.310 49.396 323.310 50.982L323.310 50.982Q323.310 53.348 321.347 54.674Q319.384 56 315.614 56L315.614 56ZM311.402 48.850L311.402 51.710L315.094 51.710Q316.108 51.710 316.615 51.346Q317.122 50.982 317.122 50.280Q317.122 49.578 316.615 49.214Q316.108 48.850 315.094 48.850L315.094 48.850L311.402 48.850ZM311.402 42.090L311.402 44.794L314.262 44.794Q315.302 44.794 315.783 44.443Q316.264 44.092 316.264 43.442L316.264 43.442Q316.264 42.766 315.783 42.428Q315.302 42.090 314.262 42.090L314.262 42.090L311.402 42.090ZM333.404 56L327.268 56L327.268 37.800L335.770 37.800Q339.956 37.800 342.140 39.646Q344.324 41.492 344.324 44.664L344.324 44.664Q344.324 46.770 343.310 48.278L343.310 48.278Q342.426 49.630 340.892 50.410L340.892 50.410L344.714 56L338.162 56L335.068 51.424L333.404 51.424L333.404 56ZM333.404 42.532L333.404 46.796L335.640 46.796Q336.914 46.796 337.525 46.224Q338.136 45.652 338.136 44.664Q338.136 43.676 337.525 43.104Q336.914 42.532 335.640 42.532L335.640 42.532L333.404 42.532ZM352.702 56L346.462 56L354.418 37.800L360.450 37.800L368.406 56L362.062 56L360.840 52.828L353.924 52.828L352.702 56ZM355.614 48.408L359.150 48.408L357.382 43.832L355.614 48.408ZM377.174 56L371.194 56L371.194 37.800L376.238 37.800L383.154 46.068L383.154 37.800L389.134 37.800L389.134 56L384.090 56L377.174 47.732L377.174 56ZM402.868 56L393.898 56L393.898 37.800L402.868 37.800Q405.910 37.800 408.224 38.905Q410.538 40.010 411.838 42.038Q413.138 44.066 413.138 46.900L413.138 46.900Q413.138 49.708 411.838 51.749Q410.538 53.790 408.224 54.895Q405.910 56 402.868 56L402.868 56ZM400.034 42.584L400.034 51.216L402.608 51.216Q403.908 51.216 404.883 50.722Q405.858 50.228 406.404 49.253Q406.950 48.278 406.950 46.900L406.950 46.900Q406.950 45.496 406.404 44.534Q405.858 43.572 404.883 43.078Q403.908 42.584 402.608 42.584L402.608 42.584L400.034 42.584Z" fill="#090D16"/></g></svg>`;
  const TBB_CLEAN_LOGO_DATA_URI = "data:image/svg+xml;utf8," + encodeURIComponent(TBB_CLEAN_LOGO_SVG_RAW);

  // ============================================================================
  // CATÁLOGO FIEL 1:1 DE LAS 8 PROPUESTAS REALES DE LA APP (studio.html -> renderSynthesizedFinalLogoProposalsGrid, líneas 11541-11800)
  // Cada tarjeta usa el viewBox="0 0 520 310" exacto de studio.html con los 8 arquetipos reales:
  // #01 Carta «La Estrella» & Barro, #02 Olla Escultórica de Barro Negro & Michelin, #03 Monograma «CL» Códice, #04 Sol de Comal & Chill-Out,
  // #05 El Agave & La Luna Carta N° 27, #06 Plato de Barro en Espiral Áurea, #07 Tríptico Galería Lotería, #08 Molcajete Escultórico Nocturno
  // ============================================================================
  function buildCasaLoteriaMockupSymbol(archetypeId, strokeScale = 1, hasShield = false, pri = "#C85A32", sec = "#14110F", gold = "#D4AF37") {
    const sw = (2.6 * strokeScale).toFixed(1);
    const shieldFrame = hasShield
      ? `<rect x="20" y="12" width="140" height="156" rx="14" fill="none" stroke="${gold}" stroke-width="2.2" stroke-dasharray="5 3"/>`
      : "";
    if (archetypeId === "loteria_estrella_barro") {
      return `<g transform="translate(0,0)">
        ${shieldFrame}
        <rect x="30" y="14" width="120" height="152" rx="10" fill="#FAF6F0" stroke="${sec}" stroke-width="${sw}"/>
        <rect x="37" y="21" width="106" height="138" rx="6" fill="none" stroke="${pri}" stroke-width="1.5"/>
        <text x="45" y="36" fill="${sec}" font-family="Cormorant Garamond,Georgia,serif" font-weight="700" font-size="11">32</text>
        <path d="M 90 30 L 95 45 L 111 45 L 98 54 L 103 69 L 90 60 L 77 69 L 82 54 L 69 45 L 85 45 Z" fill="${gold}" stroke="${sec}" stroke-width="1.2"/>
        <path d="M 62 84 C 62 76, 118 76, 118 84 C 128 104, 122 132, 90 134 C 58 132, 52 104, 62 84 Z" fill="${pri}" stroke="${sec}" stroke-width="2.2"/>
        <ellipse cx="90" cy="82" rx="22" ry="5" fill="${sec}" stroke="${gold}" stroke-width="1.4"/>
        <path d="M 60 106 Q 90 116 120 106" fill="none" stroke="#FAF6F0" stroke-width="2" stroke-linecap="round"/>
        <text x="90" y="151" text-anchor="middle" fill="${sec}" font-family="JetBrains Mono,monospace" font-weight="800" font-size="7.5" letter-spacing="2">LA ESTRELLA</text>
      </g>`;
    }
    if (archetypeId === "barro_michelin_vessel") {
      return `<g transform="translate(0,0)">
        ${shieldFrame}
        <circle cx="90" cy="90" r="70" fill="#FAF6F0" stroke="${pri}" stroke-width="2"/>
        <circle cx="90" cy="90" r="63" fill="none" stroke="${gold}" stroke-width="1.2" stroke-dasharray="4 3"/>
        <path d="M 90 24 L 94 36 L 106 36 L 96 43 L 100 55 L 90 48 L 80 55 L 84 43 L 74 36 L 86 36 Z" fill="${gold}"/>
        <path d="M 66 72 L 114 72 C 132 92, 128 134, 90 138 C 52 134, 48 92, 66 72 Z" fill="${sec}" stroke="${gold}" stroke-width="${sw}"/>
        <path d="M 66 72 C 46 72, 46 102, 60 108" fill="none" stroke="${pri}" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M 114 72 C 134 72, 134 102, 120 108" fill="none" stroke="${pri}" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M 64 104 L 76 94 L 90 106 L 104 94 L 116 104" fill="none" stroke="${gold}" stroke-width="2" stroke-linecap="round"/>
      </g>`;
    }
    if (archetypeId === "codice_loteria_monogram") {
      return `<g transform="translate(0,0)">
        ${shieldFrame}
        <polygon points="90,14 156,52 156,128 90,166 24,128 24,52" fill="#14110F" stroke="${gold}" stroke-width="2.4"/>
        <polygon points="90,22 148,56 148,124 90,158 32,124 32,56" fill="none" stroke="${pri}" stroke-width="1.4"/>
        <path d="M 104 56 C 68 48, 48 72, 52 98 C 56 124, 78 134, 106 124" fill="none" stroke="#FAF6F0" stroke-width="6.5" stroke-linecap="round"/>
        <path d="M 88 54 L 88 128 L 126 128" fill="none" stroke="${pri}" stroke-width="6.5" stroke-linecap="square"/>
        <polygon points="90,30 94,40 104,44 94,48 90,58 86,48 76,44 86,40" fill="${gold}"/>
      </g>`;
    }
    if (archetypeId === "comal_sol_acustico") {
      return `<g transform="translate(0,0)">
        ${shieldFrame}
        <circle cx="90" cy="88" r="66" fill="#1C1917" stroke="${gold}" stroke-width="2.2"/>
        <circle cx="90" cy="80" r="32" fill="${pri}" stroke="${gold}" stroke-width="2"/>
        <polygon points="90,56 95,72 111,72 98,81 103,97 90,88 77,97 82,81 69,72 85,72" fill="#FAF6F0"/>
        <path d="M 38 118 Q 64 106 90 118 T 142 118" fill="none" stroke="${gold}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M 46 130 Q 68 120 90 130 T 134 130" fill="none" stroke="${pri}" stroke-width="2.2" stroke-linecap="round"/>
      </g>`;
    }
    if (archetypeId === "agave_luna_loteria") {
      return `<g transform="translate(0,0)">
        ${shieldFrame}
        <rect x="28" y="16" width="124" height="148" rx="62" fill="#14110F" stroke="${gold}" stroke-width="2.2"/>
        <path d="M 90 120 L 90 48 M 90 120 L 64 62 M 90 120 L 116 62 M 90 120 L 48 84 M 90 120 L 132 84" stroke="#2E6F5E" stroke-width="5" stroke-linecap="round"/>
        <path d="M 56 120 L 124 120 L 110 144 L 70 144 Z" fill="${pri}" stroke="${gold}" stroke-width="1.8"/>
        <polygon points="90,26 93,34 101,37 93,40 90,48 87,40 79,37 87,34" fill="${gold}"/>
      </g>`;
    }
    if (archetypeId === "plato_barro_aureo") {
      return `<g transform="translate(0,0)">
        ${shieldFrame}
        <circle cx="90" cy="90" r="68" fill="${sec}" stroke="${gold}" stroke-width="2.5"/>
        <circle cx="90" cy="90" r="52" fill="${pri}" stroke="#FAF6F0" stroke-width="1.5"/>
        <circle cx="90" cy="90" r="34" fill="#14110F" stroke="${gold}" stroke-width="1.8"/>
        <polygon points="90,68 95,83 110,83 98,92 102,107 90,98 78,107 82,92 70,83 85,83" fill="${gold}"/>
      </g>`;
    }
    if (archetypeId === "galeria_loteria_triptico") {
      return `<g transform="translate(0,0)">
        ${shieldFrame}
        <rect x="22" y="34" width="38" height="112" rx="5" fill="#FAF6F0" stroke="${sec}" stroke-width="2"/>
        <rect x="66" y="20" width="48" height="136" rx="6" fill="${pri}" stroke="${gold}" stroke-width="2.4"/>
        <rect x="120" y="34" width="38" height="112" rx="5" fill="#FAF6F0" stroke="${sec}" stroke-width="2"/>
        <circle cx="41" cy="86" r="10" fill="${pri}"/>
        <polygon points="90,52 95,68 111,68 98,77 103,93 90,84 77,93 82,77 69,68 85,68" fill="${gold}"/>
        <path d="M 131 80 L 147 80 C 151 92, 149 106, 139 108 C 129 106, 127 92, 131 80 Z" fill="${sec}"/>
      </g>`;
    }
    return `<g transform="translate(0,0)">
      ${shieldFrame}
      <circle cx="90" cy="90" r="68" fill="#14110F" stroke="${gold}" stroke-width="2.2"/>
      <polygon points="90,32 95,46 109,46 98,54 102,68 90,60 78,68 82,54 71,46 85,46" fill="${gold}"/>
      <path d="M 48 82 L 132 82 C 130 116, 114 130, 90 130 C 66 130, 50 116, 48 82 Z" fill="${pri}" stroke="${gold}" stroke-width="2.2"/>
      <rect x="62" y="126" width="10" height="16" rx="3" fill="${gold}"/>
      <rect x="85" y="128" width="10" height="16" rx="3" fill="${gold}"/>
      <rect x="108" y="126" width="10" height="16" rx="3" fill="${gold}"/>
    </g>`;
  }

  const TBB_ARCO_PROCESS_CAPTURES = [
    { id: "p0", label: "Paso 0 · Logo Base", title: "Paso 0.2 · Subida de Logo Actual y Modo «Modernizar»", img: "/assets/app_captures/arco_02_paso0_2_nombre_y_logo_actual_modernizar.png" },
    { id: "p03", label: "Paso 0.3 · Giro + Aaker", title: "Paso 0.3 · Giro de Ingeniería Civil + Dictamen de David Aaker", img: "/assets/app_captures/arco_03_paso0_3_giro_y_dictamen_aaker.png" },
    { id: "p1", label: "Paso 1 · Círculo Dorado", title: "Paso 1.1 · Propósito Nuclear (Why) + Dictamen de Simon Sinek", img: "/assets/app_captures/arco_05_paso1_1_proposito_why_sinek.png" },
    { id: "p2", label: "Paso 2 · Touchpoints", title: "Paso 2.1 · Touchpoints de Obra (Antes · Durante · Después)", img: "/assets/app_captures/arco_12_paso2_1_touchpoints_antes_carlzon.png" },
    { id: "p3", label: "Paso 3 · Naming Niza 37", title: "Paso 3.3 · Confirmación ARCO Ingeniería + Clases Niza 37 y 42", img: "/assets/app_captures/arco_17_paso3_3_confirmacion_eslogan_clase_niza37_ries_trout.png" },
    { id: "p4", label: "Paso 4 · Semilla + Rand", title: "Paso 4.5 · Idea Semilla de Modernización + Dictamen de Paul Rand", img: "/assets/app_captures/arco_22_paso4_5_familia_estructural_semilla_dictamen_rand.png" },
    { id: "p51", label: "Paso 5.1 · Rueda Color", title: "Paso 5.1 · Rueda Circular de Espectro (#0078C0 · #88E0E0 · #585850)", img: "/assets/app_captures/arco_23_paso5_1_rueda_circular_colores_arco.png" },
    { id: "p52", label: "Paso 5.2 · Logo #5", title: "Paso 5.2 · Selección del Logo #5 · Lineal Minimalista + Ícono 1:1", img: "/assets/app_captures/arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png" },
    { id: "p61", label: "Paso 6.1 · Brandbook 36p", title: "Paso 6.1 · Portada del Manual de 36 Láminas con Logo #5", img: "/assets/app_captures/arco_30_paso6_1_brandbook_lamina01_portada.png" },
    { id: "p62", label: "Paso 6.2 · Bóveda & Firma", title: "Paso 6.2 · Firma Corporativa HTML del Ing. Luis Ponce", img: "/assets/app_captures/arco_34_modal_firma_corporativa_luis_ponce.png" }
  ];

  const TBB_MOCKUP_LOGO_PROPOSALS = [
    {
      id: 1,
      code: "#1 · TU LOGO BASE ORIGINAL",
      shortCode: "#1 · Base",
      name: "Logo Original ARCO (Base)",
      badge: "Capital Visual Extraído",
      rationale: "Logotipo original subido por el Ing. Luis Ponce en el Paso 0.2. El sistema extrae su paleta (#0078C0, #88E0E0, #585850) y preserva su esencia arquitectónica.",
      logoImg: "/assets/logos/arco_ingenieria_logo4k_original.png",
      screenImg: "/assets/app_captures/arco_24_paso5_2_iter1_logo_base_original.png"
    },
    {
      id: 2,
      code: "#2 · ✦ 1. EMBLEMA DE AUTOR",
      shortCode: "#2 · Emblema",
      name: "Emblema de Autor",
      badge: "Modernización Automática",
      rationale: "Primera evolución con NanoBanana PRO: moderniza la tipografía cursiva antigua por Montserrat Bold e integra puente atirantado y torres residenciales.",
      logoImg: "/assets/logos/arco_iter2_full.png",
      screenImg: "/assets/app_captures/arco_25_paso5_2_iter2_nanobanana_emblema_autor.png"
    },
    {
      id: 3,
      code: "#3 · ✦ 2. MONOGRAMA + GIRO",
      shortCode: "#3 · Monograma",
      name: "Monograma Arquitectónico «A»",
      badge: "Fusión Estructural",
      rationale: "Letra «A» estructural en gris acero (#585850) fusionada con el doble arco envolvente en azul cobalto (#0078C0) y turquesa (#88E0E0).",
      logoImg: "/assets/logos/arco_iter3_full.png",
      screenImg: "/assets/app_captures/arco_26_paso5_2_iter3_nanobanana_monograma_giro.png"
    },
    {
      id: 4,
      code: "#4 · ✦ 3. INSIGNIA / SELLO",
      shortCode: "#4 · Insignia",
      name: "Sello Institucional de Obra",
      badge: "Escudo Corporativo",
      rationale: "Insignia circular contemporánea con anillo perimetral ARCO INGENIERÍA · DISEÑO Y CONSTRUCCIÓN ideal para cascos, planos y lacres.",
      logoImg: "/assets/logos/arco_iter4_full.png",
      screenImg: "/assets/app_captures/arco_27_paso5_2_iter4_nanobanana_insignia_sello.png"
    },
    {
      id: 5,
      code: "#5 · ✦ 4. LINEAL MINIMALISTA",
      shortCode: "#5 · Minimalista",
      name: "Lineal Minimalista (Elegido)",
      badge: "★ SELECCIÓN OFICIAL",
      rationale: "Isotipo monolineal de precisión arquitectónica: arco estructural envolvente con dos torres esbeltas en #0078C0, #88E0E0 y #585850. Seleccionado para generar los 12 entregables.",
      logoImg: "/assets/logos/arco_iter5_full.png",
      screenImg: "/assets/app_captures/arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png"
    },
    {
      id: 6,
      code: "#6 · EVOLUCIÓN CONVERSACIONAL",
      shortCode: "#6 · Evolución IA",
      name: "Refinamiento Conversacional",
      badge: "Prompt en Vivo",
      rationale: "Variante generada desde la caja de texto conversacional pidiendo integrar la «A» con dos torres residenciales y el doble arco dinámico.",
      logoImg: "/assets/logos/arco_iter6_full.png",
      screenImg: "/assets/app_captures/arco_29_paso5_2_iter6_nanobanana_evolucion_conversacional_final.png"
    }
  ];

  window.tbbSelectHomeArcoCapture = function (capId) {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeArcoCapId = capId;
    window.tbbCommercialDemoState.homeMockupStep5Subscreen = "5A";
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm || "mobile");
    }
  };

  // Renderizador Multidispositivo Real (Celular, Tablet, Computadora) con las Capturas Reales de ARCO Ingeniería (Ing. Luis Ponce · Selección #5 Lineal Minimalista)
  window.tbbRenderHomeDeviceMockupContent = function (deviceForm) {
    const st = window.tbbCommercialDemoState || {};
    const form = deviceForm || st.homeDeviceForm || "mobile";
    const isLiveStudio = Boolean(st.homeDeviceLiveStudio);
    const subScreen = st.homeMockupStep5Subscreen || "5B"; // "5A" (Recorrido Paso a Paso) | "5B" (6 Iteraciones de Logo · #5 Elegido)
    const selectedLogoId = Number(st.homeMockupSelectedLogoId) || 5;
    const activeCapId = st.homeArcoCapId || "p52";
    const l = getLang();

    const selectedLogoObj = TBB_MOCKUP_LOGO_PROPOSALS.find((p) => p.id === selectedLogoId) || TBB_MOCKUP_LOGO_PROPOSALS[4];
    const selectedCapObj = TBB_ARCO_PROCESS_CAPTURES.find((c) => c.id === activeCapId) || TBB_ARCO_PROCESS_CAPTURES[7];

    if (isLiveStudio) {
      return `
        <div class="tbb-home-device-stage-centered">
          <div class="tbb-home-device-chassis is-${escHtml(form)}">
            <div class="tbb-home-device-top-bezel">
              <span class="tbb-bezel-dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
              <span class="tbb-bezel-title">THE BEST BRAND STUDIO EN VIVO (/studio · Caso Real: ARCO INGENIERÍA) · FORMATO ${form === 'mobile' ? 'CELULAR' : form === 'tablet' ? 'TABLET' : 'COMPUTADORA'}</span>
              <button type="button" class="tbb-bezel-mode-btn" onclick="window.tbbToggleHomeDeviceLiveStudio(false)">← Volver a Capturas de ARCO Ingeniería</button>
            </div>
            <div class="tbb-home-device-screen">
              <iframe src="/studio?brand=arco_ingenieria&step=5&novideo=1&embed=home_${escHtml(form)}&lang=${escHtml(l)}" title="The Best Brand Live App - ARCO Ingeniería" class="tbb-home-device-live-iframe"></iframe>
            </div>
          </div>
        </div>
      `;
    }

    const renderSubscreenSwitchBar = (compact = false) => `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; background:#0D2540; padding:5px; border-radius:999px; border:1.5px solid #88E0E0;">
        <button
          type="button"
          onclick="window.tbbSetMockupStep5Subscreen('5B')"
          style="background:${subScreen === '5B' ? '#0078C0' : 'transparent'}; color:#FFFFFF; border:none; border-radius:999px; padding:${compact ? '6px 8px' : '7px 14px'}; font-family:'Montserrat',sans-serif; font-size:${compact ? '0.62rem' : '0.72rem'}; font-weight:900; cursor:pointer; transition:all 0.2s;"
        >
          1 · ${compact ? '6 Iteraciones Logo (#5 Elegido)' : '6 Iteraciones de Logo «ARCO Ingeniería» (#5 Lineal Minimalista)'}
        </button>
        <button
          type="button"
          onclick="window.tbbSetMockupStep5Subscreen('5A')"
          style="background:${subScreen === '5A' ? '#0078C0' : 'transparent'}; color:#FFFFFF; border:none; border-radius:999px; padding:${compact ? '6px 8px' : '7px 14px'}; font-family:'Montserrat',sans-serif; font-size:${compact ? '0.62rem' : '0.72rem'}; font-weight:900; cursor:pointer; transition:all 0.2s;"
        >
          2 · ${compact ? 'Capturas Pasos 0 al 6' : 'Capturas Reales Paso a Paso (Pasos 0 al 6 · Ing. Luis Ponce)'}
        </button>
      </div>
    `;

    const renderRealAppLogoLockupCard = (item, compact = false) => {
      const isSel = item.id === selectedLogoId;
      return `
        <div
          onclick="window.tbbSelectMockupLogoOption(${item.id})"
          style="background:#FFFFFF; border:${isSel ? '2.5px solid #0078C0' : '1.5px solid #CBD5E1'}; border-radius:14px; padding:${compact ? '8px' : '10px'}; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; transition:all 0.2s ease; box-shadow:${isSel ? '0 10px 24px rgba(0,120,192,0.22)' : '0 4px 12px rgba(15,23,42,0.05)'}; text-align:left;"
        >
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; margin-bottom:6px; flex-wrap:wrap;">
              <span style="font-family:'JetBrains Mono',monospace; font-size:${compact ? '0.54rem' : '0.58rem'}; color:#FFFFFF; font-weight:800; background:${isSel ? '#0078C0' : '#0D2540'}; padding:2px 7px; border-radius:999px;">${escHtml(item.code)}</span>
              <span style="font-family:'JetBrains Mono',monospace; font-size:${compact ? '0.52rem' : '0.56rem'}; color:#0D2540; background:#F0F9FF; border:1px solid #88E0E0; padding:2px 6px; border-radius:999px; font-weight:800;">${escHtml(item.badge)}</span>
            </div>
            <div style="width:100%; aspect-ratio:16/11; border-radius:10px; overflow:hidden; border:1px solid #E2E8F0; margin-bottom:6px; background:#FFFFFF; display:flex; align-items:center; justify-content:center; padding:6px;">
              <img src="${escHtml(item.logoImg)}" alt="${escHtml(item.name)}" style="max-width:100%; max-height:100%; object-fit:contain;" />
            </div>
            ${!compact ? `<div style="font-size:0.64rem; color:#334155; line-height:1.35; margin-bottom:6px; font-weight:600;">${escHtml(item.rationale)}</div>` : ""}
          </div>
          <div style="display:grid; grid-template-columns:1fr auto; gap:4px;">
            <button
              type="button"
              onclick="event.stopPropagation(); window.tbbSelectMockupLogoOption(${item.id});"
              style="background:${isSel ? '#0078C0' : '#0D2540'}; color:#FFFFFF; border:none; border-radius:7px; padding:${compact ? '5px 6px' : '6px 8px'}; font-size:${compact ? '0.56rem' : '0.60rem'}; font-weight:800; cursor:pointer;"
            >
              ${isSel ? '✓ Iteración Activa en App' : 'Ver Captura de Iteración'}
            </button>
            <span style="background:#F8FAFC; color:#0D2540; border:1px solid #CBD5E1; border-radius:7px; padding:${compact ? '5px 6px' : '6px 7px'}; font-size:0.56rem; font-weight:800; font-family:'JetBrains Mono',monospace;">.SVG/.AI</span>
          </div>
        </div>
      `;
    };

    const renderStepByStepGallery = (compact = false) => `
      <div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
        <div style="display:flex; flex-wrap:wrap; gap:5px; background:#FFFFFF; padding:8px; border-radius:12px; border:1.5px solid #CBD5E1;">
          ${TBB_ARCO_PROCESS_CAPTURES.map((c) => `
            <button
              type="button"
              onclick="window.tbbSelectHomeArcoCapture('${c.id}')"
              style="background:${c.id === activeCapId ? '#0078C0' : '#F8FAFC'}; color:${c.id === activeCapId ? '#FFFFFF' : '#0D2540'}; border:1px solid ${c.id === activeCapId ? '#0078C0' : '#CBD5E1'}; border-radius:999px; padding:${compact ? '4px 8px' : '5px 11px'}; font-family:'Montserrat',sans-serif; font-size:${compact ? '0.58rem' : '0.64rem'}; font-weight:800; cursor:pointer;"
            >
              ${escHtml(c.label)}
            </button>
          `).join("")}
        </div>
        <div style="background:#FFFFFF; border:2px solid #0078C0; border-radius:14px; padding:10px; box-shadow:0 12px 28px rgba(13,37,64,0.10);">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
            <span style="font-family:'Montserrat',sans-serif; font-size:${compact ? '0.70rem' : '0.82rem'}; font-weight:900; color:#0D2540;">${escHtml(selectedCapObj.title)}</span>
            <span style="font-family:'JetBrains Mono',monospace; font-size:0.60rem; font-weight:800; color:#0078C0; background:#F0F9FF; border:1px solid #88E0E0; padding:3px 9px; border-radius:999px;">CASO REAL: ING. LUIS PONCE · ARCO INGENIERÍA</span>
          </div>
          <div style="width:100%; border-radius:10px; overflow:hidden; border:1px solid #E2E8F0; background:#F8FAFC;">
            <img src="${escHtml(selectedCapObj.img)}" alt="${escHtml(selectedCapObj.title)}" style="width:100%; height:auto; display:block;" />
          </div>
        </div>
      </div>
    `;

    // =========================================================================
    // 1. FORMATO CELULAR (MÓVIL VERTICAL): ARCO INGENIERÍA (#5 LINEAL MINIMALISTA)
    // =========================================================================
    if (form === "mobile") {
      return `
        <div class="tbb-home-device-stage-centered">
          <div class="tbb-home-device-chassis is-mobile">
            <div class="tbb-home-mobile-notch"></div>
            <div class="tbb-home-device-screen" style="background:#F8FAFC; color:#0D2540; padding:11px; gap:8px;">
              <div style="background:#0D2540; color:#FFFFFF; border-radius:13px; padding:9px 11px; display:flex; align-items:center; justify-content:space-between; border:1.5px solid #0078C0;">
                <div style="display:flex; align-items:center; gap:7px;">
                  <img src="/samples/Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png" alt="ARCO" style="width:24px; height:24px; border-radius:6px; background:#FFFFFF; padding:2px;" />
                  <div style="text-align:left;">
                    <div style="font-family:'JetBrains Mono',monospace; font-size:0.52rem; color:#88E0E0; font-weight:800;">CASO REAL AUDITADO · ING. LUIS PONCE</div>
                    <div style="font-family:'Montserrat',sans-serif; font-size:0.76rem; font-weight:900; color:#FFFFFF;">ARCO INGENIERÍA · #5 Minimalista</div>
                  </div>
                </div>
                <button type="button" onclick="window.tbbSwitchMainSection(5)" style="font-family:'JetBrains Mono',monospace; font-size:0.54rem; background:#0078C0; color:#FFFFFF; border:none; padding:4px 8px; border-radius:999px; font-weight:800; cursor:pointer;">12 Descargas</button>
              </div>

              ${renderSubscreenSwitchBar(true)}

              ${subScreen === "5A"
                ? renderStepByStepGallery(true)
                : `
                  <div style="background:#FFFFFF; border:2px solid #0078C0; border-radius:12px; padding:8px; text-align:left;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.56rem; font-weight:900; color:#0078C0;">CAPTURA REAL EN PASO 5.2 (${escHtml(selectedLogoObj.shortCode)}):</span>
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.54rem; background:#0D2540; color:#88E0E0; padding:2px 7px; border-radius:999px; font-weight:800;">NanoBanana PRO</span>
                    </div>
                    <img src="${escHtml(selectedLogoObj.screenImg)}" alt="${escHtml(selectedLogoObj.name)}" style="width:100%; border-radius:8px; border:1px solid #E2E8F0; display:block;" />
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                    ${TBB_MOCKUP_LOGO_PROPOSALS.map((item) => renderRealAppLogoLockupCard(item, true)).join("")}
                  </div>
                `}

              <button type="button" onclick="window.tbbSwitchMainSection(5)" style="width:100%; background:linear-gradient(135deg, #0078C0 0%, #0D2540 100%); color:#FFFFFF; border:1.5px solid #88E0E0; border-radius:11px; padding:9px 10px; font-family:'Montserrat',sans-serif; font-size:0.66rem; font-weight:800; cursor:pointer;">
                ✓ Ver Pack de Descargas de «ARCO Ingeniería» (Logo #5) →
              </button>
            </div>
            <div class="tbb-home-mobile-bar"></div>
          </div>
        </div>
      `;
    }

    // =========================================================================
    // 2. FORMATO TABLET: ARCO INGENIERÍA (#5 LINEAL MINIMALISTA)
    // =========================================================================
    if (form === "tablet") {
      return `
        <div class="tbb-home-device-stage-centered">
          <div class="tbb-home-device-chassis is-tablet">
            <div class="tbb-home-tablet-cam"></div>
            <div class="tbb-home-device-screen" style="background:#F8FAFC; color:#0D2540; padding:14px; gap:10px;">
              <div style="background:#0D2540; color:#FFFFFF; border-radius:14px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; border:1.5px solid #0078C0;">
                <div style="display:flex; align-items:center; gap:9px;">
                  <img src="/samples/Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png" alt="ARCO" style="width:28px; height:28px; border-radius:7px; background:#FFFFFF; padding:2px;" />
                  <div style="text-align:left;">
                    <div style="font-family:'JetBrains Mono',monospace; font-size:0.58rem; color:#88E0E0; font-weight:800;">VISTA TABLET · CASO REAL: ARCO INGENIERÍA (ING. LUIS PONCE)</div>
                    <div style="font-family:'Montserrat',sans-serif; font-size:0.92rem; font-weight:900; color:#FFFFFF;">Modernización de Logotipo: Selección #5 · Lineal Minimalista</div>
                  </div>
                </div>
                ${renderSubscreenSwitchBar(true)}
              </div>

              ${subScreen === "5A"
                ? renderStepByStepGallery(false)
                : `
                  <div style="background:#FFFFFF; border:2px solid #0078C0; border-radius:14px; padding:10px; text-align:left;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                      <span style="font-family:'Montserrat',sans-serif; font-size:0.76rem; font-weight:900; color:#0D2540;">CAPTURA EN VIVO DEL PASO 5.2 · ${escHtml(selectedLogoObj.code)}</span>
                      <button type="button" onclick="window.tbbSwitchMainSection(5)" style="background:#0078C0; color:#FFFFFF; border:none; border-radius:999px; padding:4px 12px; font-size:0.62rem; font-weight:800; cursor:pointer;">Ir al Pack de Descargas →</button>
                    </div>
                    <img src="${escHtml(selectedLogoObj.screenImg)}" alt="${escHtml(selectedLogoObj.name)}" style="width:100%; border-radius:10px; border:1px solid #E2E8F0; display:block;" />
                  </div>
                  <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
                    ${TBB_MOCKUP_LOGO_PROPOSALS.map((item) => renderRealAppLogoLockupCard(item, true)).join("")}
                  </div>
                `}
            </div>
          </div>
        </div>
      `;
    }

    // =========================================================================
    // 3. FORMATO COMPUTADORA: ARCO INGENIERÍA (CAPTURA REAL + 6 ITERACIONES DE LOGOTIPO)
    // =========================================================================
    return `
      <div class="tbb-home-device-stage-centered">
        <div class="tbb-home-device-chassis is-desktop">
          <div class="tbb-home-desktop-topbar">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="tbb-home-desktop-url">https://thebestbrand.app/studio · Caso Real Auditado: «ARCO INGENIERÍA» (Ing. Luis Ponce · Selección #5 Lineal Minimalista)</span>
            <button type="button" onclick="window.tbbSwitchMainSection(5)" style="margin-left:auto; background:#0078C0; color:#FFFFFF; border:none; border-radius:999px; padding:4px 12px; font-family:'Montserrat',sans-serif; font-size:0.68rem; font-weight:800; cursor:pointer;">
              Descargar los Entregables de ARCO Ingeniería →
            </button>
          </div>

          <div class="tbb-home-device-screen" style="background:#F8FAFC; color:#0D2540; padding:16px; gap:12px;">
            <div style="background:#0D2540; color:#FFFFFF; border-radius:16px; padding:12px 18px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; border:1.5px solid #0078C0;">
              <div style="display:flex; align-items:center; gap:12px;">
                <img src="/samples/Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png" alt="ARCO Ingeniería" style="width:34px; height:34px; border-radius:8px; background:#FFFFFF; padding:3px;" />
                <div style="text-align:left;">
                  <div style="font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#88E0E0; font-weight:800;">SESIÓN COMPLETA AUDITADA (PASOS 0 AL 6) · ING. LUIS PONCE · ARCO INGENIERÍA</div>
                  <div style="font-family:'Montserrat',sans-serif; font-size:1.04rem; font-weight:900; color:#FFFFFF;">Evolución de Logotipo con NanoBanana PRO · <span style="color:#88E0E0;">Iteración #5 Lineal Minimalista</span></div>
                </div>
              </div>
              ${renderSubscreenSwitchBar(false)}
            </div>

            ${subScreen === "5A"
              ? renderStepByStepGallery(false)
              : `
                <div style="display:grid; grid-template-columns:1.25fr 1fr; gap:12px; align-items:start;">
                  <div style="background:#FFFFFF; border:2px solid #0078C0; border-radius:14px; padding:12px; text-align:left; box-shadow:0 10px 26px rgba(0,120,192,0.12);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
                      <span style="font-family:'Montserrat',sans-serif; font-size:0.80rem; font-weight:900; color:#0D2540;">CAPTURA REAL DE LA APP · ${escHtml(selectedLogoObj.code)}</span>
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.60rem; background:#F0F9FF; color:#0078C0; border:1px solid #88E0E0; padding:3px 9px; border-radius:999px; font-weight:800;">${escHtml(selectedLogoObj.badge)}</span>
                    </div>
                    <img src="${escHtml(selectedLogoObj.screenImg)}" alt="${escHtml(selectedLogoObj.name)}" style="width:100%; border-radius:10px; border:1px solid #E2E8F0; display:block; margin-bottom:8px;" />
                    <div style="font-size:0.72rem; color:#334155; font-weight:600; line-height:1.45;">${escHtml(selectedLogoObj.rationale)}</div>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                    ${TBB_MOCKUP_LOGO_PROPOSALS.map((item) => renderRealAppLogoLockupCard(item, true)).join("")}
                  </div>
                </div>
              `}
          </div>
        </div>
        <div class="tbb-home-desktop-stand"></div>
      </div>
    `;
  };

  window.tbbSetMockupStep5Subscreen = function (sub) {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeMockupStep5Subscreen = sub === "5A" ? "5A" : "5B";
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm || "mobile");
    }
  };

  window.tbbSelectMockupAbChoice = function (choice) {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeMockupAbChoice = choice === "A" ? "A" : "B";
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm || "mobile");
    }
  };

  window.tbbSelectMockupLogoOption = function (logoId) {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeMockupSelectedLogoId = Number(logoId) || 1;
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm || "mobile");
    }
  };

  window.tbbSetMockupLogoModifier = function (mod) {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeMockupModifier =
      window.tbbCommercialDemoState.homeMockupModifier === mod ? "normal" : mod;
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm || "mobile");
    }
  };

  window.tbbToggleMockupInvertCanvas = function () {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeMockupInvertCanvas = !window.tbbCommercialDemoState.homeMockupInvertCanvas;
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm || "mobile");
    }
  };

  window.tbbSelectHomeDeviceMockup = function (deviceForm) {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeDeviceForm = deviceForm || "mobile";
    window.tbbCommercialDemoState.homeDeviceLiveStudio = false;
    document.querySelectorAll("[data-home-device-btn]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-home-device-btn") === window.tbbCommercialDemoState.homeDeviceForm);
    });
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm);
    }
  };

  window.tbbToggleHomeDeviceLiveStudio = function (enableLive) {
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.homeDeviceLiveStudio = Boolean(enableLive);
    const stage = document.getElementById("tbbHomeMultiDeviceMockupStage");
    if (stage) {
      stage.innerHTML = window.tbbRenderHomeDeviceMockupContent(window.tbbCommercialDemoState.homeDeviceForm || "mobile");
    }
  };

  // SUBPÁGINA 1: INICIO (PORTADA CON LOGO AL CENTRO + TAGLINE OFICIAL "Your Brand,  NOW!!!" + "Donde la ciencia..." + ANIMACIÓN 60FPS DE LOS 5 PILARES + SECCIÓN MULTIDISPOSITIVO AL FINAL CON MOCKUPS INTERACTIVOS)
  window.tbbBuildSubpage1HomeHTML = function () {
    const l = getLang();
    const st = window.tbbCommercialDemoState || {};
    const selectedIdx = Number(st.heroSelectedTheoryIdx) || 0;
    const activeHomeDevice = st.homeDeviceForm || "mobile";

    const fiveNodes = [
      { idx: 0, code: "01 · CÍRCULO DORADO", author: "Simon Sinek", sub: "WHY → HOW → WHAT", color: "#FF7A00" },
      { idx: 1, code: "02 · TOUCHPOINTS", author: "Jan Carlzon", sub: "Antes · Durante · Después", color: "#4C9DE6" },
      { idx: 2, code: "03 · MODELO SMILE", author: "Alexandra Watkins", sub: "Naming & OMPI Niza", color: "#426EAE" },
      { idx: 3, code: "04 · DIFERENCIAL OSGOOD", author: "Osgood & Nagamachi", sub: "7 Ejes Kansei", color: "#0D2540" },
      { idx: 4, code: "05 · INGENIERÍA KAIZEN", author: "Masaaki Imai & Rand", sub: "Mejora Vectorial Continua", color: "#FF7A00" }
    ];

    const initStage = ACADEMIC_INFOGRAPHIC_STAGES[selectedIdx + 1] || ACADEMIC_INFOGRAPHIC_STAGES[1];
    const initLoc = initStage.i18n[l] || initStage.i18n.es;

    return `
      <section class="tbb-subpage-section tbb-home-hero-section">
        <!-- Curva Vectorial Superior Fluida estilo ImproBears -->
        <div class="tbb-open-curve-bg" aria-hidden="true">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style="width:100%; height:100%;">
            <path fill="rgba(66,110,174,0.06)" d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,101.3C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            <path fill="none" stroke="rgba(255,122,0,0.22)" stroke-width="2" d="M0,192 C360,90 720,260 1440,110"></path>
          </svg>
        </div>

        <canvas id="tbbHeroDynamicCanvas" class="tbb-hero-particles-canvas" aria-hidden="true"></canvas>

        <div class="tbb-container-wide" style="position:relative; z-index:2;">
          <!-- PORTADA CENTRAL: 1) LOGOTIPO LIMPIO AL CENTRO (ISOTIPO + THE BEST BRAND) -> 2) TAGLINE LEGIBLE "Your Brand,  NOW!!!" -> 3) "Donde la ciencia se convierte en tu marca" -->
          <div class="tbb-reveal-on-scroll is-visible tbb-monumental-brand-axis">
            <div id="tbbHomeCoverLogoBox" class="tbb-cover-hero-logo-lockup">
              <div class="tbb-cover-logo-clean-row">
                <img
                  src="${TBB_ISOTIPO_DATA_URI}"
                  alt="The Best Brand Isotipo"
                  class="tbb-cover-isotipo-img"
                />
                <span class="tbb-cover-brand-words">THE BEST BRAND</span>
              </div>
              <div class="tbb-cover-tagline-now" aria-label="Your Brand,  NOW!!!">Your Brand,  NOW!!!</div>
            </div>

            <h1 class="tbb-hero-display-title">
              ${escHtml(t("heroTitleLine1"))} <span class="tbb-text-accent-gradient">${escHtml(t("heroTitleHighlight"))}</span>
            </h1>
            <p class="tbb-hero-lead-paragraph" style="margin-bottom:10px;">
              ${escHtml(t("heroLead"))}
            </p>
          </div>

          <!-- PROTAGONISTA A TODO EL ANCHO DE LA PANTALLA: ANIMACIÓN INTERACTIVA 60FPS DE LOS 5 PILARES CIENTÍFICOS Y EXPLICACIÓN -->
          <div class="tbb-hero-convergence-fullwidth tbb-reveal-on-scroll is-visible">
            <div id="tbbHeroInteractiveConvergenceStage" class="tbb-hero-interactive-stage tbb-fullwidth-stage ${st.heroConvergenceActive ? 'is-converged' : ''}">
              <div class="tbb-stage-header">
                <div>
                  <span class="tbb-eyebrow-pill" style="margin-bottom:8px;">${TBB_ICONS.spark} <span>ARQUITECTURA ALGORÍTMICA EN TIEMPO REAL</span></span>
                  <h2 class="tbb-stage-title" style="font-size:clamp(1.35rem, 2.2vw, 1.85rem);">${escHtml(t("heroInteractiveStageTitle"))}</h2>
                  <p class="tbb-stage-sub" style="font-size:1.0rem;">${escHtml(t("heroInteractiveStageSub"))}</p>
                </div>
                <button type="button" class="tbb-btn-converge-trigger" onclick="window.tbbTriggerHeroConvergence()">
                  ${TBB_ICONS.spark}
                  <span id="tbbConvergeBtnLabel">${escHtml(st.heroConvergenceActive ? "Fusión Científica Activa · 5 Pilares en Síntesis" : t("heroConvergencePlayBtn"))}</span>
                </button>
              </div>

              <!-- Lienzo Interactivo 60fps de Convergencia Científica (Partículas, Haces Bézier y Núcleo Aura en Tiempo Real) -->
              <div class="tbb-convergence-orbital-box tbb-orbital-fullwidth">
                <div class="tbb-five-pillars-canvas-wrap">
                  <canvas id="tbbFivePillarsConvergenceCanvas" class="tbb-five-pillars-live-canvas"></canvas>
                </div>

                <!-- Grid Panorámico de los 5 Pilares Científicos a Todo el Ancho (Sincronizado con el Canvas) -->
                <div class="tbb-hero-theory-pills-wrap tbb-five-pillars-fullgrid">
                  ${fiveNodes.map((n, idx) => `
                    <button type="button" class="tbb-hero-theory-pill pos-${idx} ${idx === selectedIdx ? 'active' : ''}" onclick="window.tbbSelectHeroTheoryNode(${idx})">
                      <span class="tbb-pill-code" style="color:${n.color};">${escHtml(n.code)}</span>
                      <strong class="tbb-pill-author">${escHtml(n.author)}</strong>
                      <span class="tbb-pill-sub">${escHtml(n.sub)}</span>
                    </button>
                  `).join("")}
                </div>
              </div>

              <!-- Tarjeta Dinámica Ancha del Pilar Científico Seleccionado con Diagrama Vectorial en Vivo -->
              <div id="tbbHeroTheoryNodeDetailBox" class="tbb-hero-theory-detail-box tbb-fullwidth-pillar-detail">
                <div class="tbb-hero-pillar-detail-grid">
                  <div class="tbb-hero-pillar-detail-text">
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:8px;">
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.80rem; font-weight:800; color:${initStage.color}; letter-spacing:0.06em;">${escHtml(initStage.authors)}</span>
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:700; color:#475569; background:#FFFFFF; border:1px solid #E2E8F0; padding:4px 12px; border-radius:999px;">${escHtml(initStage.works)}</span>
                    </div>
                    <div style="font-family:'Montserrat',sans-serif; font-size:1.25rem; font-weight:900; color:#0D2540; margin-bottom:6px;">${escHtml(initLoc.title)}</div>
                    <div style="font-size:1.02rem; color:#334155; line-height:1.6; margin-bottom:10px;">${escHtml(initLoc.thesis)}</div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                      ${(initLoc.pillars || []).map((p) => `<span style="font-size:0.82rem; font-weight:700; color:#0D2540; background:#FFFFFF; border:1px solid #CBD5E1; padding:5px 12px; border-radius:999px;">✓ ${escHtml(p)}</span>`).join("")}
                    </div>
                  </div>
                  <div class="tbb-hero-pillar-detail-diagram">
                    ${buildAcademicDiagramSVG(initStage.diagramType, initStage.color)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AL FINAL DE INICIO (DEBAJO DE LA ANIMACIÓN Y EXPLICACIÓN): EXPERIENCIA MULTIDISPOSITIVO CON MOCKUPS REALES EN CELULAR, TABLET Y COMPUTADORA -->
          <div class="tbb-home-multidevice-bottom-section tbb-reveal-on-scroll is-visible">
            <div class="tbb-home-multidevice-head">
              <div class="tbb-multidevice-showcase-bar" role="region" aria-label="Compatibilidad Multidispositivo">
                <div class="tbb-multidevice-badge-left">
                  <span class="tbb-live-dot"></span>
                  <span>Úsala en tu <strong>Celular, Tablet o Computadora</strong> · Haz clic para ver cómo luce la app real en cada dispositivo:</span>
                </div>
                <div class="tbb-multidevice-icons-group">
                  <button
                    type="button"
                    data-home-device-btn="mobile"
                    class="tbb-device-form-btn ${activeHomeDevice === 'mobile' ? 'active' : ''}"
                    onclick="window.tbbSelectHomeDeviceMockup('mobile')"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="18.5" r="1" fill="#FF7A00"/></svg>
                    <span>Celular</span>
                  </button>
                  <button
                    type="button"
                    data-home-device-btn="tablet"
                    class="tbb-device-form-btn ${activeHomeDevice === 'tablet' ? 'active' : ''}"
                    onclick="window.tbbSelectHomeDeviceMockup('tablet')"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2.5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="18.5" r="1" fill="#FF7A00"/></svg>
                    <span>Tablet</span>
                  </button>
                  <button
                    type="button"
                    data-home-device-btn="desktop"
                    class="tbb-device-form-btn ${activeHomeDevice === 'desktop' ? 'active' : ''}"
                    onclick="window.tbbSelectHomeDeviceMockup('desktop')"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="13" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    <span>Computadora</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Escenario de Mockup Real (Cambia instantáneamente entre Celular, Tablet y Computadora) -->
            <div id="tbbHomeMultiDeviceMockupStage" class="tbb-home-multidevice-stage-wrap">
              ${window.tbbRenderHomeDeviceMockupContent(activeHomeDevice)}
            </div>
          </div>
        </div>
      </section>
    `;
  };


  // Datos del Mapa de Recorrido Base de la Aplicación (Consistente al 100% con la vista Mapa de la App)
  const APP_BASE_MAP_NODES = [
    {
      step: 0,
      iconTag: "INICIO · PASO 0",
      iconRing: "#38BDF8",
      iconDot: "#FBBF24",
      eyebrow: { es: "PASO 00 · PUNTO DE PARTIDA", en: "STEP 00 · STARTING POINT", fr: "ÉTAPE 00 · POINT DE DÉPART", pt: "PASSO 00 · PONTO DE PARTIDA", de: "SCHRITT 00 · STARTPUNKT", it: "PASSO 00 · PUNTO DI PARTENZA" },
      title: { es: "Objetivo, Nombre Inicial y Giro", en: "Goal, Initial Name & Business Sector", fr: "Objectif, Nom Initial et Secteur", pt: "Objetivo, Nome Inicial e Ramo", de: "Ziel, Initialname & Branche", it: "Obiettivo, Nome Iniziale e Settore" },
      desc: { es: "Configuración base del negocio que adapta todos los pasos del sistema", en: "Core business setup that adapts every stage of the system", fr: "Configuration de base qui adapte toutes les étapes du système", pt: "Configuração base do negócio que adapta todos os passos", de: "Grundkonfiguration, die alle Schritte des Systems anpasst", it: "Configurazione base che adatta tutti i passi del sistema" },
      statusPill: { es: "Base Activa", en: "Active Base", fr: "Base Active", pt: "Base Ativa", de: "Aktive Basis", it: "Base Attiva" },
      reviewChecklist: {
        es: ["Modalidad: Marca desde Cero, Evolución o Submarcas", "Carga opcional de boceto o logotipo actual", "Definición de industria y alcance comercial"],
        en: ["Mode: Brand from Scratch, Evolution, or Sub-brands", "Optional upload of sketch or current logo", "Industry definition and commercial scope"],
        fr: ["Mode : Création, Évolution ou Sous-marques", "Import optionnel de croquis ou logo actuel", "Définition du secteur et périmètre commercial"],
        pt: ["Modo: Marca do Zero, Evolução ou Submarcas", "Carregamento opcional de esboço ou logo atual", "Definição do setor e âmbito comercial"],
        de: ["Modus: Neustart, Evolution oder Submarken", "Optionaler Upload von Skizze oder aktuellem Logo", "Branchen- und Umfangsdefinition"],
        it: ["Modalità: Da Zero, Evoluzione o Sub-brand", "Caricamento opzionale di bozza o logo attuale", "Definizione del settore e ambito commerciale"]
      }
    },
    {
      step: 1,
      iconTag: "PROPÓSITO",
      iconRing: "#60A5FA",
      iconDot: "#FF7A00",
      eyebrow: { es: "PASO 01 · ESENCIA Y PROPÓSITO", en: "STEP 01 · ESSENCE & PURPOSE", fr: "ÉTAPE 01 · ESSENCE ET RAISON D'ÊTRE", pt: "PASSO 01 · ESSÊNCIA E PROPÓSITO", de: "SCHRITT 01 · ESSENZ & ZWECK", it: "PASSO 01 · ESSENZA E SCOPO" },
      title: { es: "Propósito & Promesa de Valor", en: "Purpose & Value Promise", fr: "Raison d'Être & Promesse de Valeur", pt: "Propósito & Promessa de Valor", de: "Sinn & Wertversprechen", it: "Scopo & Promessa di Valore" },
      desc: { es: "Por qué existe tu marca, qué resuelves y a quién sirves", en: "Why your brand exists, what you solve, and whom you serve", fr: "Pourquoi votre marque existe, ce que vous résolvez et qui vous servez", pt: "Porque existe a sua marca, o que resolve e a quem serve", de: "Warum Ihre Marke existiert, was Sie lösen und wem Sie dienen", it: "Perché esiste il tuo brand, cosa risolvi e chi servi" },
      statusPill: { es: "Círculo Dorado", en: "Golden Circle", fr: "Cercle d'Or", pt: "Círculo Dourado", de: "Golden Circle", it: "Cerchio d'Oro" },
      reviewChecklist: {
        es: ["Círculo Dorado (WHY · HOW · WHAT) conversado con Aura", "La Empresa como Persona y carácter de marca", "Promesa de valor clara en 3 pasos operativos"],
        en: ["Golden Circle (WHY · HOW · WHAT) guided by Aura", "The Company as a Person & brand character", "Clear value promise in 3 operational steps"],
        fr: ["Cercle d'Or (WHY · HOW · WHAT) guidé par Aura", "L'Entreprise comme Personne et caractère", "Promesse de valeur en 3 étapes opérationnelles"],
        pt: ["Círculo Dourado (WHY · HOW · WHAT) com a Aura", "A Empresa como Pessoa e caráter da marca", "Promessa de valor em 3 passos operacionais"],
        de: ["Golden Circle (WHY · HOW · WHAT) mit Aura", "Das Unternehmen als Person & Charakter", "Wertversprechen in 3 klaren Schritten"],
        it: ["Cerchio d'Oro (WHY · HOW · WHAT) con Aura", "L'Azienda come Persona e carattere", "Promessa di valore in 3 passi operativi"]
      }
    },
    {
      step: 2,
      iconTag: "TOUCHPOINTS",
      iconRing: "#38BDF8",
      iconDot: "#38BDF8",
      eyebrow: { es: "PASO 02 · EXPERIENCIA Y CONTACTO", en: "STEP 02 · EXPERIENCE & TOUCHPOINTS", fr: "ÉTAPE 02 · EXPÉRIENCE ET CONTACT", pt: "PASSO 02 · EXPERIÊNCIA E CONTACTO", de: "SCHRITT 02 · ERLEBNIS & TOUCHPOINTS", it: "PASSO 02 · ESPERIENZA E CONTATTO" },
      title: { es: "Touchpoints: Antes · Durante · Después", en: "Touchpoints: Before · During · After", fr: "Touchpoints : Avant · Pendant · Après", pt: "Touchpoints: Antes · Durante · Depois", de: "Touchpoints: Vorher · Während · Nachher", it: "Touchpoint: Prima · Durante · Dopo" },
      desc: { es: "Puntos reales de contacto donde el cliente vive tu promesa", en: "Real interaction points where clients experience your promise", fr: "Points de contact réels où le client vit votre promesse", pt: "Pontos reais de contacto onde o cliente vive a promessa", de: "Reale Kontaktpunkte, an denen Kunden Ihr Versprechen erleben", it: "Punti di contatto reali dove il cliente vive la promessa" },
      statusPill: { es: "Momentos de Verdad", en: "Moments of Truth", fr: "Moments de Vérité", pt: "Momentos de Verdade", de: "Momente der Wahrheit", it: "Momenti di Verità" },
      reviewChecklist: {
        es: ["Mapeo de canales Antes (Descubrimiento y cotización)", "Experiencia Durante (Entrega sin fricción en 15s)", "Fidelización Después (Portal, recompra y referidos)"],
        en: ["Before channels (Discovery & proposal)", "During experience (Zero-friction 15s delivery)", "After loyalty loop (Portal, repeat & referrals)"],
        fr: ["Canaux Avant (Découverte et proposition)", "Expérience Pendant (Prestation sans friction)", "Fidélisation Après (Portail et recommandation)"],
        pt: ["Canais Antes (Descoberta e proposta)", "Experiência Durante (Entrega sem fricção)", "Fidelização Depois (Portal e recomendação)"],
        de: ["Vorher-Kanäle (Entdeckung & Angebot)", "Während-Erlebnis (Reibungslose Leistung)", "Nachher-Bindung (Portal & Empfehlung)"],
        it: ["Canali Prima (Scoperta e proposta)", "Esperienza Durante (Consegna senza attrito)", "Fidelizzazione Dopo (Portale e referral)"]
      }
    },
    {
      step: 3,
      iconTag: "NAMING · SMILE",
      iconRing: "#426EAE",
      iconDot: "#FF7A00",
      eyebrow: { es: "PASO 03 · IDENTIDAD VERBAL Y REGISTRO", en: "STEP 03 · VERBAL IDENTITY & REGISTRY", fr: "ÉTAPE 03 · IDENTITÉ VERBALE ET REGISTRE", pt: "PASSO 03 · IDENTIDADE VERBAL E REGISTO", de: "SCHRITT 03 · VERBALE IDENTITÄT & REGISTER", it: "PASSO 03 · IDENTITÀ VERBALE E REGISTRO" },
      title: { es: "Nombre, Slogan, Dominios y Clases Niza", en: "Name, Tagline, Domains & Nice Classes", fr: "Nom, Slogan, Domaines et Classes Nice", pt: "Nome, Slogan, Domínios e Classes Nice", de: "Name, Slogan, Domains & Nizza-Klassen", it: "Nome, Slogan, Domini e Classi Nizza" },
      desc: { es: "Evaluación fonética SMILE, disponibilidad web y viabilidad marcaria", en: "SMILE phonetic scoring, web availability & trademark viability", fr: "Évaluation phonétique SMILE, domaines web et viabilité", pt: "Avaliação fonética SMILE, domínios web e viabilidade", de: "SMILE-Phonetik, Web-Domains & Markenprüfung", it: "Valutazione fonetica SMILE, domini web e viabilità" },
      statusPill: { es: "Paso 03 Gratis", en: "Step 03 Free", fr: "Étape 03 Gratuite", pt: "Passo 03 Grátis", de: "Schritt 03 Gratis", it: "Passo 03 Gratis" },
      reviewChecklist: {
        es: ["Test SMILE & SCRATCH de memorabilidad fonética", "Verificación de dominios (.com, .app, .ai) y redes", "Pre-diagnóstico en las 45 Clases de Niza (OMPI)"],
        en: ["SMILE & SCRATCH phonetic memorability test", "Domain (.com, .app, .ai) & handle verification", "Pre-screening across all 45 WIPO Nice Classes"],
        fr: ["Test SMILE & SCRATCH de mémorabilité phonétique", "Vérification des domaines (.com, .app, .ai)", "Pré-diagnostic dans les 45 Classes de Nice"],
        pt: ["Teste SMILE & SCRATCH de memorabilidade fonética", "Verificação de domínios (.com, .app, .ai)", "Pré-diagnóstico nas 45 Classes de Nice"],
        de: ["SMILE & SCRATCH Phonetik- und Merkfähigkeitstest", "Domain-Prüfung (.com, .app, .ai) & Social Handles", "Vorprüfung in allen 45 WIPO-Nizza-Klassen"],
        it: ["Test SMILE & SCRATCH di memorabilità fonetica", "Verifica domini (.com, .app, .ai) e social", "Pre-diagnosi nelle 45 Classi di Nizza"]
      }
    },
    {
      step: 4,
      iconTag: "ADN VISUAL",
      iconRing: "#FF7A00",
      iconDot: "#FFFFFF",
      eyebrow: { es: "PASO 04 · INGENIERÍA KANSEI Y OSGOOD", en: "STEP 04 · KANSEI & OSGOOD ENGINEERING", fr: "ÉTAPE 04 · INGÉNIERIE KANSEI ET OSGOOD", pt: "PASSO 04 · ENGENHARIA KANSEI E OSGOOD", de: "SCHRITT 04 · KANSEI- & OSGOOD-ENGINEERING", it: "PASSO 04 · INGEGNERIA KANSEI E OSGOOD" },
      title: { es: "ADN Visual, Estilo y Tensión Geométrica", en: "Visual DNA, Style & Geometric Tension", fr: "ADN Visuel, Style et Tension Géométrique", pt: "ADN Visual, Estilo e Tensão Geométrica", de: "Visuelle DNA, Stil & Geometrische Spannung", it: "DNA Visivo, Stile e Tensione Geometrica" },
      desc: { es: "Calibración de los 7 ejes emocionales hacia parámetros vectoriales", en: "Calibration of 7 emotional axes into vector parameters", fr: "Calibrage des 7 axes émotionnels en paramètres vectoriels", pt: "Calibração dos 7 eixos emocionais em parâmetros vetoriais", de: "Kalibrierung der 7 emotionalen Achsen in Vektorparameter", it: "Calibrazione dei 7 assi emozionali in parametri vettoriali" },
      statusPill: { es: "Desbloqueo $49 USD", en: "Unlock $49 USD", fr: "Déblocage 49 $", pt: "Desbloqueio $49", de: "Freischaltung $49", it: "Sblocco $49 USD" },
      reviewChecklist: {
        es: ["Calibración de los 7 ejes del Diferencial de Osgood", "Traducción afectiva Kansei a radios, ángulos y pesos", "Migración automática de tus respuestas de los Pasos 0–3"],
        en: ["Calibration of Osgood's 7 Semantic Differential axes", "Kansei translation into radii, angles, and weights", "Automatic migration of your Steps 0–3 answers"],
        fr: ["Calibrage des 7 axes du Différentiel d'Osgood", "Traduction Kansei en rayons, angles et graisses", "Migration automatique de vos réponses des Étapes 0–3"],
        pt: ["Calibração dos 7 eixos do Diferencial de Osgood", "Tradução Kansei em raios, ângulos e pesos", "Migração automática das respostas dos Passos 0–3"],
        de: ["Kalibrierung der 7 Achsen des Osgood-Differentials", "Kansei-Übersetzung in Radien, Winkel und Strichstärken", "Automatische Migration Ihrer Antworten aus Schritt 0–3"],
        it: ["Calibrazione dei 7 assi del Differenziale di Osgood", "Traduzione Kansei in raggi, angoli e spessori", "Migrazione automatica delle risposte dei Passi 0–3"]
      }
    },
    {
      step: 5,
      iconTag: "LOGOTIPO",
      iconRing: "#38BDF8",
      iconDot: "#FF7A00",
      eyebrow: { es: "PASO 05 · TALLER VECTORIAL KAIZEN", en: "STEP 05 · KAIZEN VECTOR ATELIER", fr: "ÉTAPE 05 · ATELIER VECTORIEL KAIZEN", pt: "PASSO 05 · ATELIER VETORIAL KAIZEN", de: "SCHRITT 05 · KAIZEN-VEKTOR-ATELIER", it: "PASSO 05 · ATELIER VETTORIALE KAIZEN" },
      title: { es: "Logotipo en Curvas, Color y Tipografía", en: "Logo in Curves, Color & Typography", fr: "Logo en Courbes, Couleur et Typographie", pt: "Logótipo em Curvas, Cor e Tipografia", de: "Logo in Kurven, Farbe & Typografie", it: "Logo in Curve, Colore e Tipografia" },
      desc: { es: "Iteraciones progresivas en proporción 8X×3X y vectores Bézier", en: "Progressive iterations on an 8X×3X grid and pure Bézier vectors", fr: "Itérations progressives sur grille 8X×3X et vecteurs Bézier", pt: "Iterações progressivas em grelha 8X×3X e vetores Bézier", de: "Progressive Iterationen im 8X×3X-Raster & Bézier-Vektoren", it: "Iterazioni progressive su griglia 8X×3X e vettori Bézier" },
      statusPill: { es: "Curvas Bézier", en: "Bézier Curves", fr: "Courbes Bézier", pt: "Curvas Bézier", de: "Bézier-Kurven", it: "Curve Bézier" },
      reviewChecklist: {
        es: ["Hasta 10 iteraciones Kaizen en retícula constructiva 8X×3X", "Paleta oficial de 8 tonos con contraste WCAG AAA", "Homologación de Marca Madre, Submarcas e Ícono 1:1"],
        en: ["Up to 10 Kaizen iterations on an 8X×3X construction grid", "Official 8-tone palette with WCAG AAA contrast", "Master Brand, Sub-brands & 1:1 App Icon homologation"],
        fr: ["Jusqu'à 10 itérations Kaizen sur grille 8X×3X", "Palette officielle de 8 tons validée WCAG AAA", "Homologation Marque Mère, Sous-marques et Icône 1:1"],
        pt: ["Até 10 iterações Kaizen em grelha construtiva 8X×3X", "Paleta oficial de 8 tons com contraste WCAG AAA", "Homologação de Marca Mãe, Submarcas e Ícone 1:1"],
        de: ["Bis zu 10 Kaizen-Iterationen im 8X×3X-Konstruktionsraster", "Offizielle 8-Ton-Palette mit WCAG-AAA-Kontrast", "Homologation von Dachmarke, Submarken & 1:1-Icon"],
        it: ["Fino a 10 iterazioni Kaizen su griglia costruttiva 8X×3X", "Palette ufficiale a 8 toni con contrasto WCAG AAA", "Omologazione Brand Madre, Sub-brand e Icona 1:1"]
      }
    },
    {
      step: 6,
      iconTag: "BRANDBOOK",
      iconRing: "#10B981",
      iconDot: "#FFFFFF",
      eyebrow: { es: "PASO 06 · BRANDBOOK Y BÓVEDA", en: "STEP 06 · BRANDBOOK & VAULT", fr: "ÉTAPE 06 · BRANDBOOK ET VOÛTE", pt: "PASSO 06 · BRANDBOOK E COFRE", de: "SCHRITT 06 · BRANDBOOK & TRESOR", it: "PASSO 06 · BRANDBOOK E CAVEAU" },
      title: { es: "Brandbook Oficial (+30 Páginas) y 9 Entregables", en: "Official Brandbook (30+ Pages) & 9 Deliverables", fr: "Brandbook Officiel (+30 Pages) et 9 Livrables", pt: "Brandbook Oficial (+30 Páginas) e 9 Entregáveis", de: "Offizielles Brandbook (+30 Seiten) & 9 Deliverables", it: "Brandbook Ufficiale (+30 Pagine) e 9 Deliverable" },
      desc: { es: "Constitución visual en curvas abiertas y descarga inmediata", en: "Open-curve visual constitution and instant vault download", fr: "Constitution visuelle en courbes ouvertes et téléchargement", pt: "Constituição visual em curvas abertas e descarga imediata", de: "Visuelle Verfassung in offenen Kurven & Sofort-Download", it: "Costituzione visiva in curve aperte e download immediato" },
      statusPill: { es: "+30 Páginas", en: "30+ Pages", fr: "+30 Pages", pt: "+30 Páginas", de: "+30 Seiten", it: "+30 Pagine" },
      reviewChecklist: {
        es: ["Brandbook oficial de más de 30 páginas (ajustable según el giro)", "Suite vectorial en curvas (.SVG, .AI, .EPS) y PNG 4K", "Plantillas corporativas, firma ejecutiva, fuentes y tokens"],
        en: ["Official Brandbook of over 30 pages (adaptable to sector)", "Pure curve vector suite (.SVG, .AI, .EPS) & 4K PNGs", "Corporate templates, email signature, fonts & web tokens"],
        fr: ["Brandbook officiel de plus de 30 pages (adaptable au secteur)", "Suite vectorielle (.SVG, .AI, .EPS) et PNG 4K", "Modèles corporatifs, signature, polices et tokens web"],
        pt: ["Brandbook oficial com mais de 30 páginas (ajustável ao ramo)", "Suite vetorial (.SVG, .AI, .EPS) e PNG 4K", "Modelos corporativos, assinatura, fontes e tokens web"],
        de: ["Offizielles Brandbook mit über 30 Seiten (branchenanpassbar)", "Vektor-Suite (.SVG, .AI, .EPS) & 4K-PNGs", "Unternehmensvorlagen, Signatur, Schriften & Web-Tokens"],
        it: ["Brandbook ufficiale di oltre 30 pagine (adattabile al settore)", "Suite vettoriale (.SVG, .AI, .EPS) e PNG 4K", "Modelli aziendali, firma, font e token web"]
      }
    }
  ];

  // Sincronización del Mapa de Recorrido Base + Capa Superior Interactiva al Hacer Scroll
  window.tbbSetTourActiveStep = function (stepIdx) {
    const s = Math.max(0, Math.min(6, Number(stepIdx) || 0));
    const st = window.tbbCommercialDemoState;
    st.tourActiveStep = s;
    const item = APP_TOUR_STEPS[s] || APP_TOUR_STEPS[0];
    const mapNode = APP_BASE_MAP_NODES[s] || APP_BASE_MAP_NODES[0];
    const stageTheory = ACADEMIC_INFOGRAPHIC_STAGES[s] || ACADEMIC_INFOGRAPHIC_STAGES[0];
    const l = getLang();
    const loc = item.i18n[l] || item.i18n.es;
    const capUrl = getLocalizedAppCaptureUrl(item.captureBase, l);

    // 1. Actualizar el Mapa de Recorrido Base (Barra de progreso + resaltar y centrar la tarjeta del paso en el mapa base)
    const progBar = document.getElementById("tbbBaseMapProgressBarFill");
    if (progBar) {
      progBar.style.width = `${Math.round(((s + 1) / 7) * 100)}%`;
    }
    const contBtn = document.getElementById("tbbBaseMapContinueBtnTxt");
    if (contBtn) {
      contBtn.textContent = `Paso 0${s} · ${(mapNode.statusPill[l] || mapNode.statusPill.es)}`;
    }

    document.querySelectorAll(".tbb-base-map-step-card").forEach((cardEl, idx) => {
      cardEl.classList.toggle("is-active-map-step", idx === s);
      cardEl.classList.toggle("is-completed-map-step", idx < s);
    });

    const activeMapCard = document.getElementById(`tbbBaseMapNodeCard_${s}`);
    const mapScrollContainer = document.getElementById("tbbBaseMapScrollContainer");
    if (activeMapCard && mapScrollContainer) {
      const targetTop = Math.max(0, activeMapCard.offsetTop - 92);
      mapScrollContainer.scrollTo({ top: targetTop, behavior: "smooth" });
    }

    // 2. Actualizar la Capa Superior Flotante (Upper Layer) sobre el Mapa Base
    const upperBadge = document.getElementById("tbbUpperLayerStepBadge");
    if (upperBadge) upperBadge.textContent = loc.badge;
    const upperTitle = document.getElementById("tbbUpperLayerStepTitle");
    if (upperTitle) upperTitle.textContent = (mapNode.title[l] || mapNode.title.es);
    const upperImg = document.getElementById("tbbUpperLayerScreenImg");
    if (upperImg) {
      upperImg.src = capUrl;
      upperImg.onerror = function () { this.src = item.captureBase + "?v=" + ASSET_VERSION; };
    }
    const upperDiagram = document.getElementById("tbbUpperLayerMiniDiagram");
    if (upperDiagram && stageTheory) {
      upperDiagram.innerHTML = buildAcademicDiagramSVG(stageTheory.diagramType, stageTheory.color);
    }
    const upperChecklist = document.getElementById("tbbUpperLayerChecklist");
    if (upperChecklist) {
      const list = mapNode.reviewChecklist[l] || mapNode.reviewChecklist.es;
      upperChecklist.innerHTML = list.map((txt) => `<li>${TBB_ICONS.check} <span>${escHtml(txt)}</span></li>`).join("");
    }

    document.querySelectorAll(".tbb-tour-step-dot").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === s);
    });
    document.querySelectorAll(".tbb-tour-scrolly-card").forEach((card, idx) => {
      card.classList.toggle("is-active-step", idx === s);
    });

    const iframe = document.getElementById("tbbTourIphoneLiveIframe");
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({ type: "TBB_JUMP_TO_STEP", step: s }, "*");
      } catch (e) {}
    }
  };

  // Selector de Formato de Dispositivo sin Marcas: Móvil | Tablet | Computadora
  window.tbbSetTourDeviceFormFactor = function (formFactor) {
    const valid = ["mobile", "tablet", "desktop"].includes(formFactor) ? formFactor : "mobile";
    window.tbbCommercialDemoState.tourDeviceFormFactor = valid;
    const chassis = document.getElementById("tbbTourAdaptiveDeviceChassis");
    if (chassis) {
      chassis.setAttribute("data-device-form", valid);
    }
    document.querySelectorAll("[data-tbb-device-btn]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tbb-device-btn") === valid);
    });
  };

  // Mostrar / Ocultar la Capa Superior sobre el Mapa Base para inspeccionar el Mapa Completo o el Detalle del Paso
  window.tbbToggleTourUpperLayerSheet = function (forceShow) {
    const sheet = document.getElementById("tbbTourUpperLayerFloatingSheet");
    if (!sheet) return;
    const isCollapsed = sheet.classList.contains("is-collapsed");
    const show = typeof forceShow === "boolean" ? forceShow : isCollapsed;
    sheet.classList.toggle("is-collapsed", !show);
  };

  window.tbbToggleTourIphoneMode = function (liveMode) {
    const st = window.tbbCommercialDemoState;
    st.tourIphoneLiveMode = Boolean(liveMode);
    const cutoutWrap = document.getElementById("tbbTourIphoneCutoutModeWrap");
    const liveWrap = document.getElementById("tbbTourIphoneLiveModeWrap");
    const btnCutout = document.getElementById("tbbBtnTourModeCutout");
    const btnLive = document.getElementById("tbbBtnTourModeLive");
    if (cutoutWrap) cutoutWrap.style.display = st.tourIphoneLiveMode ? "none" : "flex";
    if (liveWrap) {
      liveWrap.style.display = st.tourIphoneLiveMode ? "flex" : "none";
      const iframe = document.getElementById("tbbTourIphoneLiveIframe");
      if (st.tourIphoneLiveMode && iframe && !iframe.getAttribute("src")) {
        iframe.setAttribute("src", `/studio?demo=true&embed=iphone_tour&lang=${getLang()}&step=${st.tourActiveStep || 0}`);
      }
    }
    if (btnCutout) btnCutout.classList.toggle("active", !st.tourIphoneLiveMode);
    if (btnLive) btnLive.classList.toggle("active", st.tourIphoneLiveMode);
  };

  window.tbbUpdateBeforeAfterSlider = function (val) {
    const num = Math.max(5, Math.min(95, Number(val) || 50));
    window.tbbCommercialDemoState.beforeAfterVal = num;
    const beforeClip = document.getElementById("tbbBeforeClipLayer");
    const handle = document.getElementById("tbbBeforeAfterHandle");
    if (beforeClip) beforeClip.style.clipPath = `inset(0 ${100 - num}% 0 0)`;
    if (handle) handle.style.left = `${num}%`;
  };

  // SUBPÁGINA 2: APP TOUR (MULTIDISPOSITIVO SIN MARCAS + MAPA DE RECORRIDO COMPLETO COMO BASE + CAPA SUPERIOR EN SCROLL INTERCALANDO SCREENSHOTS, TEXTO E IMÁGENES)
  window.tbbBuildSubpage2AppTourHTML = function () {
    const l = getLang();
    const st = window.tbbCommercialDemoState;
    const curStep = Math.max(0, Math.min(6, Number(st.tourActiveStep) || 0));
    const deviceForm = st.tourDeviceFormFactor || "mobile";
    const activeItem = APP_TOUR_STEPS[curStep] || APP_TOUR_STEPS[0];
    const activeLoc = activeItem.i18n[l] || activeItem.i18n.es;
    const activeMapNode = APP_BASE_MAP_NODES[curStep] || APP_BASE_MAP_NODES[0];
    const activeStageTheory = ACADEMIC_INFOGRAPHIC_STAGES[curStep] || ACADEMIC_INFOGRAPHIC_STAGES[0];
    const activeCapUrl = getLocalizedAppCaptureUrl(activeItem.captureBase, l);
    const activeChecklist = activeMapNode.reviewChecklist[l] || activeMapNode.reviewChecklist.es;

    const mapHeaderTitles = {
      es: { title: "Mapa de Recorrido", sub: "Toca cualquier paso para avanzar con Aura", openStep: "Abrir Paso", mapTab: "Mapa", homeTab: "Inicio", studioTab: "Taller", manualTab: "Manual", accountTab: "Cuenta", menuTab: "Menú", upperLayerLabel: "CAPA SUPERIOR DEL PASO · LO QUE REVISAS CON AURA", toggleBaseBtn: "Ver Mapa Base / Capa" },
      en: { title: "Journey Map", sub: "Tap any step to advance with Aura", openStep: "Open Step", mapTab: "Map", homeTab: "Home", studioTab: "Studio", manualTab: "Manual", accountTab: "Account", menuTab: "Menu", upperLayerLabel: "STEP UPPER LAYER · WHAT YOU REVIEW WITH AURA", toggleBaseBtn: "Toggle Base Map / Layer" },
      fr: { title: "Carte du Parcours", sub: "Touchez une étape pour avancer avec Aura", openStep: "Ouvrir Étape", mapTab: "Carte", homeTab: "Accueil", studioTab: "Atelier", manualTab: "Manuel", accountTab: "Compte", menuTab: "Menu", upperLayerLabel: "COUCHE SUPÉRIEURE · CE QUE VOUS RÉVISEZ AVEC AURA", toggleBaseBtn: "Voir Carte / Couche" },
      pt: { title: "Mapa de Percurso", sub: "Toque em qualquer passo para avançar com a Aura", openStep: "Abrir Passo", mapTab: "Mapa", homeTab: "Início", studioTab: "Atelier", manualTab: "Manual", accountTab: "Conta", menuTab: "Menu", upperLayerLabel: "CAMADA SUPERIOR · O QUE REVÊ COM A AURA", toggleBaseBtn: "Ver Mapa Base / Camada" },
      de: { title: "Prozesskarte", sub: "Tippen Sie auf einen Schritt, um mit Aura fortzufahren", openStep: "Schritt Öffnen", mapTab: "Karte", homeTab: "Start", studioTab: "Studio", manualTab: "Handbuch", accountTab: "Konto", menuTab: "Menü", upperLayerLabel: "OBERE EBENE · WAS SIE MIT AURA PRÜFEN", toggleBaseBtn: "Basiskarte / Ebene" },
      it: { title: "Mappa di Percorso", sub: "Tocca qualsiasi passo per avanzare con Aura", openStep: "Apri Passo", mapTab: "Mappa", homeTab: "Inizio", studioTab: "Studio", manualTab: "Manuale", accountTab: "Account", menuTab: "Menu", upperLayerLabel: "LIVELLO SUPERIORE · CIÒ CHE ESAMINI CON AURA", toggleBaseBtn: "Mappa Base / Livello" }
    };
    const mt = mapHeaderTitles[l] || mapHeaderTitles.es;

    return `
      <section class="tbb-subpage-section tbb-apptour-section">
        <div class="tbb-container-wide">
          <!-- Cabecera de Gran Escala + Distintivo Multidispositivo (Móvil, Tablet o Computadora · Sin Marcas) -->
          <div class="tbb-section-header-large tbb-reveal-on-scroll is-visible">
            <span class="tbb-eyebrow-pill">${TBB_ICONS.appTour} <span>${escHtml(t("tourEyebrow"))}</span></span>
            <h1 class="tbb-section-title-xl">${escHtml(t("tourTitle"))}</h1>
            <p class="tbb-section-lead-xl">${escHtml(t("tourLead"))}</p>

            <!-- Barra Interactiva Multidispositivo (Móvil · Tablet · Computadora — Cero Marcas Comerciales) -->
            <div class="tbb-multidevice-showcase-bar">
              <span class="tbb-multidevice-badge-txt">${escHtml(t("tourDeviceBadge"))}</span>
              <div class="tbb-multidevice-pills-group" role="group" aria-label="Device Format Selector">
                <button type="button" data-tbb-device-btn="mobile" class="tbb-device-form-btn ${deviceForm === 'mobile' ? 'active' : ''}" onclick="window.tbbSetTourDeviceFormFactor('mobile')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="18.5" r="1" fill="#FF7A00"/></svg>
                  <span>${escHtml(t("tourDeviceMobile"))}</span>
                </button>
                <button type="button" data-tbb-device-btn="tablet" class="tbb-device-form-btn ${deviceForm === 'tablet' ? 'active' : ''}" onclick="window.tbbSetTourDeviceFormFactor('tablet')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="18.5" r="1" fill="#FF7A00"/></svg>
                  <span>${escHtml(t("tourDeviceTablet"))}</span>
                </button>
                <button type="button" data-tbb-device-btn="desktop" class="tbb-device-form-btn ${deviceForm === 'desktop' ? 'active' : ''}" onclick="window.tbbSetTourDeviceFormFactor('desktop')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 21h8M12 17v4" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>
                  <span>${escHtml(t("tourDeviceDesktop"))}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Layout Scrollytelling Consistente con la App:
               Columna Izquierda Sticky = Mapa Completo de la App como Base + Capa Superior Emergente
               Columna Derecha = Capas Superiores en Scroll Intercalando Screenshots, Texto e Imágenes -->
          <div class="tbb-scrollytelling-layout">
            <!-- Columna Sticky Izquierda: Dispositivo Adaptable (Móvil / Tablet / Computadora) con el Mapa de Recorrido Completo como Base -->
            <div class="tbb-sticky-iphone-column">
              <div class="tbb-iphone-mode-switcher">
                <button type="button" id="tbbBtnTourModeCutout" class="tbb-mode-pill ${!st.tourIphoneLiveMode ? 'active' : ''}" onclick="window.tbbToggleTourIphoneMode(false)">
                  ${TBB_ICONS.phone} <span>${escHtml(t("tourIphoneModeCutout"))}</span>
                </button>
                <button type="button" id="tbbBtnTourModeLive" class="tbb-mode-pill ${st.tourIphoneLiveMode ? 'active' : ''}" onclick="window.tbbToggleTourIphoneMode(true)">
                  ${TBB_ICONS.spark} <span>${escHtml(t("tourIphoneModeLive"))}</span>
                </button>
              </div>

              <!-- Marco Adaptable (Móvil · Tablet · Computadora) Sin Marcas -->
              <div id="tbbTourAdaptiveDeviceChassis" class="tbb-iphone16-chassis" data-device-form="${escHtml(deviceForm)}">
                <div class="tbb-iphone16-dynamic-island">
                  <span class="tbb-island-cam"></span>
                  <span class="tbb-island-speaker"></span>
                </div>

                <!-- Vista 1: CAPA BASE (MAPA DE RECORRIDO COMPLETO DE LA APP) + CAPA SUPERIOR INTERACTIVA AL HACER SCROLL -->
                <div id="tbbTourIphoneCutoutModeWrap" class="tbb-iphone16-screen-inner tbb-base-map-screen-wrap" style="display:${st.tourIphoneLiveMode ? 'none' : 'flex'};">
                  <!-- CAPA BASE: Mapa de Recorrido Completo de la Aplicación (Idéntico a la vista Mapa de la App) -->
                  <div id="tbbBaseMapScrollContainer" class="tbb-app-base-map-scroll-layer">
                    <!-- Tarjeta Superior del Mapa de Recorrido -->
                    <div class="tbb-base-map-top-card">
                      <div class="tbb-base-map-top-row">
                        <div>
                          <div class="tbb-base-map-heading">${escHtml(mt.title)}</div>
                          <div class="tbb-base-map-subheading">${escHtml(mt.sub)}</div>
                        </div>
                        <button type="button" class="tbb-base-map-continue-btn" onclick="window.tbbToggleTourUpperLayerSheet()">
                          <span id="tbbBaseMapContinueBtnTxt">Paso 0${curStep} · ${escHtml(activeMapNode.statusPill[l] || activeMapNode.statusPill.es)}</span>
                        </button>
                      </div>
                      <div class="tbb-base-map-progress-track">
                        <div id="tbbBaseMapProgressBarFill" class="tbb-base-map-progress-fill" style="width:${Math.round(((curStep + 1) / 7) * 100)}%;"></div>
                      </div>
                    </div>

                    <!-- Cadena Vertical Conectada de los 7 Pasos del Mapa de Recorrido (Paso 00 al Paso 06) -->
                    <div class="tbb-base-map-nodes-chain">
                      ${APP_BASE_MAP_NODES.map((node, idx) => `
                        <div
                          id="tbbBaseMapNodeCard_${idx}"
                          class="tbb-base-map-step-card ${idx === curStep ? 'is-active-map-step' : ''} ${idx < curStep ? 'is-completed-map-step' : ''}"
                          onclick="window.tbbSetTourActiveStep(${idx}); window.tbbToggleTourUpperLayerSheet(true); const el=document.getElementById('tbbTourStepCard_${idx}'); if(el)el.scrollIntoView({behavior:'smooth',block:'center'});"
                        >
                          <div class="tbb-base-map-card-main">
                            <div class="tbb-base-map-dark-icon">
                              <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
                                <circle cx="22" cy="22" r="14" stroke="${node.iconRing}" stroke-width="2" stroke-opacity="0.85"/>
                                <circle cx="22" cy="22" r="5.5" fill="${node.iconDot}"/>
                              </svg>
                              <span>${escHtml(node.iconTag)}</span>
                            </div>
                            <div class="tbb-base-map-card-copy">
                              <div class="tbb-base-map-eyebrow">${escHtml(node.eyebrow[l] || node.eyebrow.es)}</div>
                              <div class="tbb-base-map-title">${escHtml(node.title[l] || node.title.es)}</div>
                              <div class="tbb-base-map-desc">${escHtml(node.desc[l] || node.desc.es)}</div>
                            </div>
                          </div>
                          <div class="tbb-base-map-card-footer">
                            <span class="tbb-base-map-status-pill">${escHtml(node.statusPill[l] || node.statusPill.es)}</span>
                            <span class="tbb-base-map-open-btn">${escHtml(mt.openStep)} ${idx}</span>
                          </div>
                        </div>
                        ${idx < 6 ? `<div class="tbb-base-map-connector-line"></div>` : ``}
                      `).join("")}
                    </div>
                  </div>

                  <!-- CAPA SUPERIOR EMERGENTE SOBRE EL MAPA BASE (Muestra lo que se revisa en el paso activo al hacer scroll) -->
                  <div id="tbbTourUpperLayerFloatingSheet" class="tbb-upper-layer-floating-sheet">
                    <div class="tbb-upper-layer-sheet-handle" onclick="window.tbbToggleTourUpperLayerSheet()">
                      <span class="tbb-sheet-pill-indicator"></span>
                      <div class="tbb-upper-layer-sheet-bar">
                        <span id="tbbUpperLayerStepBadge" class="tbb-upper-layer-badge">${escHtml(activeLoc.badge)}</span>
                        <button type="button" class="tbb-upper-layer-toggle-btn">${escHtml(mt.toggleBaseBtn)}</button>
                      </div>
                    </div>
                    <div class="tbb-upper-layer-sheet-body">
                      <div id="tbbUpperLayerStepTitle" class="tbb-upper-layer-title">${escHtml(activeMapNode.title[l] || activeMapNode.title.es)}</div>
                      <div class="tbb-upper-layer-interleaved-row">
                        <div class="tbb-upper-layer-shot-thumb">
                          <img
                            id="tbbUpperLayerScreenImg"
                            src="${escHtml(activeCapUrl)}"
                            onerror="this.src='${escHtml(activeItem.captureBase)}?v=${ASSET_VERSION}'"
                            alt="${escHtml(activeLoc.title)}"
                          />
                        </div>
                        <div id="tbbUpperLayerMiniDiagram" class="tbb-upper-layer-mini-diagram">
                          ${buildAcademicDiagramSVG(activeStageTheory.diagramType, activeStageTheory.color)}
                        </div>
                      </div>
                      <ul id="tbbUpperLayerChecklist" class="tbb-upper-layer-checklist">
                        ${activeChecklist.map((txt) => `<li>${TBB_ICONS.check} <span>${escHtml(txt)}</span></li>`).join("")}
                      </ul>
                    </div>
                  </div>

                  <!-- Barra Inferior Consistente con la Aplicación: Inicio | Mapa | Taller | Manual | Cuenta | Menú -->
                  <div class="tbb-base-map-bottom-dock">
                    <div class="tbb-app-dock-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 10.5L12 4l8 6.5V20h-5v-5H9v5H4v-9.5z" stroke="currentColor" stroke-width="1.8"/></svg><span>${escHtml(mt.homeTab)}</span></div>
                    <div class="tbb-app-dock-item active"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M8.7 7.5l6.6 3M8.7 16.5l6.6-3" stroke="currentColor" stroke-width="1.8"/></svg><span>${escHtml(mt.mapTab)}</span></div>
                    <div class="tbb-app-dock-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg><span>${escHtml(mt.studioTab)}</span></div>
                    <div class="tbb-app-dock-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v6m-2.5-2L12 14.5 14.5 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>${escHtml(mt.manualTab)}</span></div>
                    <div class="tbb-app-dock-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"/><path d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>${escHtml(mt.accountTab)}</span></div>
                    <div class="tbb-app-dock-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>${escHtml(mt.menuTab)}</span></div>
                  </div>
                </div>

                <!-- Vista 2: Código Real Interactivo de la Aplicación -->
                <div id="tbbTourIphoneLiveModeWrap" class="tbb-iphone16-screen-inner" style="display:${st.tourIphoneLiveMode ? 'flex' : 'none'};">
                  <iframe
                    id="tbbTourIphoneLiveIframe"
                    title="The Best Brand Live App"
                    src="${st.tourIphoneLiveMode ? `/studio?demo=true&embed=iphone_tour&lang=${l}&step=${curStep}` : ''}"
                    class="tbb-iphone-live-iframe"
                    allow="microphone; autoplay; clipboard-write"
                  ></iframe>
                </div>

                <div class="tbb-iphone16-home-bar"></div>
              </div>

              <!-- Selector Rápido de Pasos 00 a 06 debajo del Dispositivo -->
              <div class="tbb-tour-step-dots-row">
                ${APP_TOUR_STEPS.map((it, idx) => `
                  <button type="button" class="tbb-tour-step-dot ${idx === curStep ? 'active' : ''}" onclick="window.tbbSetTourActiveStep(${idx}); const el=document.getElementById('tbbTourStepCard_${idx}'); if(el)el.scrollIntoView({behavior:'smooth',block:'center'});">
                    0${idx}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Columna Derecha de Scrollytelling: CAPAS SUPERIORES EN SCROLL INTERCALANDO SCREENSHOTS REALES + TEXTO EXPLICATIVO + IMÁGENES GRÁFICAS -->
            <div class="tbb-scrolly-cards-column">
              ${APP_TOUR_STEPS.map((it, idx) => {
                const loc = it.i18n[l] || it.i18n.es;
                const capImg = getLocalizedAppCaptureUrl(it.captureBase, l);
                const posterImg = getLocalizedStepPosterUrl(idx, l);
                const mapNode = APP_BASE_MAP_NODES[idx] || APP_BASE_MAP_NODES[0];
                const stageTheory = ACADEMIC_INFOGRAPHIC_STAGES[idx] || ACADEMIC_INFOGRAPHIC_STAGES[0];
                const checklist = mapNode.reviewChecklist[l] || mapNode.reviewChecklist.es;
                const isEven = idx % 2 === 0;
                return `
                  <article
                    id="tbbTourStepCard_${idx}"
                    class="tbb-tour-scrolly-card tbb-upper-layer-step-card tbb-reveal-on-scroll ${idx === curStep ? 'is-active-step is-visible' : ''}"
                    data-tour-step="${idx}"
                    onmouseenter="window.tbbSetTourActiveStep(${idx})"
                    onclick="window.tbbSetTourActiveStep(${idx})"
                  >
                    <!-- Cinta de Capa Superior Sincronizada con el Mapa de Recorrido Base -->
                    <div class="tbb-scrolly-card-top">
                      <span class="tbb-scrolly-step-badge" style="border-color:${it.accent}; color:${it.accent};">${escHtml(loc.badge)}</span>
                      <span class="tbb-scrolly-theory-tag">${escHtml(mt.upperLayerLabel)} · 0${idx}</span>
                    </div>

                    <h2 class="tbb-scrolly-card-title">${escHtml(loc.title)}</h2>
                    <p class="tbb-scrolly-card-body">${escHtml(loc.body)}</p>

                    <!-- Intercalado Dinámico (Par / Impar): Screenshot Real de la App + Texto de Revisión + Imagen / Esquema Gráfico -->
                    <div class="tbb-interleaved-step-grid ${isEven ? 'is-even-layout' : 'is-odd-layout'}">
                      <!-- Bloque A: Screenshot Real de la Interfaz del Paso -->
                      <div class="tbb-precision-cutout-frame">
                        <img
                          src="${escHtml(capImg)}"
                          onerror="this.src='${escHtml(it.captureBase)}?v=${ASSET_VERSION}'"
                          alt="${escHtml(loc.cutoutLabel)}"
                          loading="lazy"
                        />
                        <div class="tbb-floating-callout-pill">
                          ${TBB_ICONS.check}
                          <span>${escHtml(loc.cutoutLabel)}</span>
                        </div>
                      </div>

                      <!-- Bloque B: Lo que se revisa en este paso (Texto Estructurado + Imagen / Esquema Visual) -->
                      <div class="tbb-interleaved-visual-and-text-col">
                        <div class="tbb-step-visual-graphic-card">
                          <div class="tbb-step-graphic-svg-wrap">
                            ${buildAcademicDiagramSVG(stageTheory.diagramType, stageTheory.color)}
                          </div>
                          <div class="tbb-step-graphic-caption">${escHtml(it.theoryTag)}</div>
                        </div>

                        <div class="tbb-floating-explanation-box">
                          <strong class="tbb-review-list-heading">${escHtml(mapNode.title[l] || mapNode.title.es)}</strong>
                          <ul class="tbb-scrolly-review-checklist">
                            ${checklist.map((itemTxt) => `<li>${TBB_ICONS.check} <span>${escHtml(itemTxt)}</span></li>`).join("")}
                          </ul>
                          <p style="margin-top:8px;">${escHtml(loc.floatingNote)}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Cápsula Emergente Moderada (1 botón limpio bajo demanda) -->
                    <div class="tbb-moderate-capsule-bar">
                      <div class="tbb-capsule-mini-preview" onclick="event.stopPropagation(); window.tbbOpenVideoPopupModal(${idx});">
                        <img src="${escHtml(posterImg)}" alt="Step 0${idx}" loading="lazy" />
                        <span class="tbb-capsule-play-badge">${TBB_ICONS.play}</span>
                      </div>
                      <div class="tbb-capsule-bar-info">
                        <strong>${escHtml(t("tourWatchStepCapsule"))} · 0${idx} (${l.toUpperCase()})</strong>
                        <span>${escHtml(VIDEO_CAPSULES[idx].author)}</span>
                      </div>
                      <button type="button" class="tbb-btn-capsule-open" onclick="event.stopPropagation(); window.tbbOpenVideoPopupModal(${idx});">
                        ${TBB_ICONS.play}
                        <span>${escHtml(t("tourWatchStepCapsule"))}</span>
                      </button>
                    </div>
                  </article>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Comparador Interactivo Antes / Después (Evolución de Logotipo con Aura) -->
          <div class="tbb-before-after-block tbb-reveal-on-scroll">
            <div class="tbb-before-after-header">
              <h2 class="tbb-section-title-lg">${escHtml(t("tourBeforeAfterTitle"))}</h2>
              <p class="tbb-section-lead-md">${escHtml(t("tourBeforeAfterSub"))}</p>
            </div>
            <div class="tbb-before-after-stage">
              <div class="tbb-ba-layer tbb-ba-after">
                <div class="tbb-ba-card-content is-after">
                  <span class="tbb-ba-badge after">DESPUÉS · THE BEST BRAND VECTOR ATELIER</span>
                  <img src="${TBB_CLEAN_LOGO_DATA_URI}" alt="The Best Brand Final Vector" style="max-height:110px; width:auto;" />
                  <p>Geometría en proporción áurea (8X×3X), curvas Bézier puras y Brandbook oficial de más de 30 páginas.</p>
                </div>
              </div>
              <div id="tbbBeforeClipLayer" class="tbb-ba-layer tbb-ba-before" style="clip-path:inset(0 ${100 - st.beforeAfterVal}% 0 0);">
                <div class="tbb-ba-card-content is-before">
                  <span class="tbb-ba-badge before">ANTES · BOCETO O LOGO SIN RETÍCULA</span>
                  <div class="tbb-ba-sketch-placeholder">BOCETO INICIAL · SIN SISTEMA</div>
                  <p>Trazos sin proporción matemática, sin paleta validada WCAG ni manual de aplicación.</p>
                </div>
              </div>
              <div id="tbbBeforeAfterHandle" class="tbb-ba-handle" style="left:${st.beforeAfterVal}%;">
                <div class="tbb-ba-handle-knob">${TBB_ICONS.arrowLeft}${TBB_ICONS.arrowRight}</div>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value="${st.beforeAfterVal}"
                class="tbb-ba-range-input"
                aria-label="Before and After Comparison"
                oninput="window.tbbUpdateBeforeAfterSlider(this.value)"
              />
            </div>

            <div style="text-align:center; margin-top:36px;">
              <button type="button" class="tbb-btn-primary-vibrant" onclick="window.tbbSwitchMainSection(3)">
                ${TBB_ICONS.theory}
                <span>${escHtml(t("navTheory"))}</span>
                ${TBB_ICONS.arrowRight}
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  };


  // Simulador Interactivo Kansei & Diferencial Semántico de Osgood en vivo (Sección 3: Bases Teóricas)
  window.tbbUpdateKanseiInfographicSimulator = function () {
    const st = window.tbbCommercialDemoState;
    const gEl = document.getElementById("tbbKanseiSliderGeo");
    const vEl = document.getElementById("tbbKanseiSliderVanguard");
    const wEl = document.getElementById("tbbKanseiSliderWeight");
    if (gEl) st.kanseiGeoVal = Number(gEl.value);
    if (vEl) st.kanseiVanguardVal = Number(vEl.value);
    if (wEl) st.kanseiWeightVal = Number(wEl.value);

    const previewBox = document.getElementById("tbbKanseiLiveVectorPreview");
    if (!previewBox) return;

    const rx = Math.round(48 - (st.kanseiGeoVal / 100) * 40); // 48px (Bouba orgánico) -> 8px (Kiki geométrico)
    const strokeW = (1.6 + (st.kanseiWeightVal / 100) * 3.8).toFixed(1);
    const rot = Math.round((st.kanseiVanguardVal - 50) * 0.45);
    const accentCol = st.kanseiVanguardVal > 55 ? "#FF7A00" : "#426EAE";

    previewBox.innerHTML = `
      <svg viewBox="0 0 360 190" width="100%" height="185" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="12" width="336" height="166" rx="18" fill="#0D2540"/>
        <g transform="translate(95, 95) rotate(${rot})">
          <rect x="-46" y="-46" width="92" height="92" rx="${rx}" fill="rgba(255,255,255,0.06)" stroke="${accentCol}" stroke-width="${strokeW}"/>
          <circle cx="0" cy="0" r="${Math.max(12, Math.round(32 - st.kanseiGeoVal * 0.16))}" fill="none" stroke="#FFFFFF" stroke-width="${strokeW}"/>
          <circle cx="0" cy="0" r="6" fill="#FF7A00"/>
        </g>
        <text x="172" y="84" fill="#FFFFFF" font-family="Montserrat,sans-serif" font-weight="${st.kanseiWeightVal > 50 ? 900 : 600}" font-size="18" letter-spacing="${(st.kanseiVanguardVal * 0.04).toFixed(1)}">THE BEST BRAND</text>
        <text x="172" y="108" fill="#93C5FD" font-family="JetBrains Mono,monospace" font-weight="700" font-size="10">R=${rx}px · W=${strokeW}pt · θ=${rot}°</text>
        <text x="172" y="130" fill="#FF7A00" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="10.5">${st.kanseiGeoVal >= 50 ? "Geometría Constructiva Kiki" : "Curva Orgánica Empática Bouba"}</text>
      </svg>
    `;
  };

  // SUBPÁGINA 3: BASES TEÓRICAS (INFOGRAFÍA DINÁMICA Y RESPONSIVA PASO A PASO · CERO CÁPSULAS DE VIDEO DEL FUNDADOR)
  window.tbbBuildSubpage3TheoryHTML = function () {
    const l = getLang();
    const st = window.tbbCommercialDemoState;

    return `
      <section class="tbb-subpage-section tbb-theory-infographic-section">
        <div class="tbb-container-wide">
          <!-- Cabecera Académica -->
          <div class="tbb-section-header-large tbb-reveal-on-scroll is-visible">
            <span class="tbb-eyebrow-pill">${TBB_ICONS.theory} <span>${escHtml(t("theoryEyebrow"))}</span></span>
            <h1 class="tbb-section-title-xl">${escHtml(t("theoryTitle"))}</h1>
            <p class="tbb-section-lead-xl">${escHtml(t("theoryLead"))}</p>
          </div>

          <!-- INFOGRAFÍA DINÁMICA Y RESPONSIVA PASO A PASO (ETAPAS 00 A 06 CON DIAGRAMAS VECTORIALES Y AUTORES) -->
          <div class="tbb-academic-infographic-timeline">
            ${ACADEMIC_INFOGRAPHIC_STAGES.map((stg, idx) => {
              const loc = stg.i18n[l] || stg.i18n.es;
              const isEven = idx % 2 === 0;
              return `
                <article class="tbb-infographic-stage-node tbb-reveal-on-scroll ${idx < 2 ? 'is-visible' : ''} ${isEven ? 'is-even' : 'is-odd'}">
                  <div class="tbb-infographic-spine-badge" style="background:${stg.color};">
                    <span>0${stg.step}</span>
                  </div>

                  <div class="tbb-infographic-card">
                    <div class="tbb-infographic-card-grid">
                      <!-- Columna Conceptual y Autores -->
                      <div class="tbb-infographic-text-col">
                        <div class="tbb-infographic-meta-row">
                          <span class="tbb-infographic-code-pill" style="background:${stg.color}; color:#FFFFFF;">${escHtml(stg.code)}</span>
                          <span class="tbb-infographic-authors-tag">${escHtml(stg.authors)}</span>
                        </div>
                        <h2 class="tbb-infographic-stage-title">${escHtml(loc.title)}</h2>
                        <div class="tbb-infographic-works-cite">${TBB_ICONS.book} <span>${escHtml(stg.works)}</span></div>
                        <p class="tbb-infographic-thesis">${escHtml(loc.thesis)}</p>

                        <ul class="tbb-infographic-pillars-list">
                          ${loc.pillars.map((p) => `
                            <li>${TBB_ICONS.check} <span>${escHtml(p)}</span></li>
                          `).join("")}
                        </ul>

                        <div class="tbb-infographic-output-bar">
                          <strong>ENTREGABLE CIENTÍFICO DE LA ETAPA:</strong>
                          <span>${escHtml(loc.output)}</span>
                        </div>
                      </div>

                      <!-- Columna de Diagrama Infográfico Responsivo -->
                      <div class="tbb-infographic-diagram-col">
                        <div class="tbb-infographic-diagram-frame">
                          ${buildAcademicDiagramSVG(stg.diagramType, stg.color)}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>

          <!-- SIMULADOR INTERACTIVO EN VIVO: INGENIERÍA KANSEI & DIFERENCIAL SEMÁNTICO DE OSGOOD -->
          <div class="tbb-kansei-simulator-card tbb-reveal-on-scroll">
            <div class="tbb-kansei-sim-header">
              <div>
                <span class="tbb-eyebrow-pill">${TBB_ICONS.spark} <span>LABORATORIO INTERACTIVO · NAGAMACHI & OSGOOD</span></span>
                <h2 class="tbb-section-title-lg" style="margin-top:10px;">${escHtml(t("theoryInteractiveSimulatorTitle"))}</h2>
                <p class="tbb-section-lead-md">${escHtml(t("theoryInteractiveSimulatorSub"))}</p>
              </div>
            </div>

            <div class="tbb-kansei-sim-grid">
              <div class="tbb-kansei-sliders-col">
                <div class="tbb-kansei-slider-row">
                  <div class="tbb-kansei-slider-labels">
                    <span>Orgánico / Cercano (Bouba)</span>
                    <strong>Eje 1 · Morfología Geométrica</strong>
                    <span>Geométrico / Exacto (Kiki)</span>
                  </div>
                  <input id="tbbKanseiSliderGeo" type="range" min="0" max="100" value="${st.kanseiGeoVal}" oninput="window.tbbUpdateKanseiInfographicSimulator()" />
                </div>

                <div class="tbb-kansei-slider-row">
                  <div class="tbb-kansei-slider-labels">
                    <span>Herencia Clásica</span>
                    <strong>Eje 2 · Tensión Temporal</strong>
                    <span>Vanguardia Disruptiva</span>
                  </div>
                  <input id="tbbKanseiSliderVanguard" type="range" min="0" max="100" value="${st.kanseiVanguardVal}" oninput="window.tbbUpdateKanseiInfographicSimulator()" />
                </div>

                <div class="tbb-kansei-slider-row">
                  <div class="tbb-kansei-slider-labels">
                    <span>Trazo Fino Editorial</span>
                    <strong>Eje 3 · Masa Óptica y Peso</strong>
                    <span>Presencia Monumental Bold</span>
                  </div>
                  <input id="tbbKanseiSliderWeight" type="range" min="0" max="100" value="${st.kanseiWeightVal}" oninput="window.tbbUpdateKanseiInfographicSimulator()" />
                </div>
              </div>

              <div id="tbbKanseiLiveVectorPreview" class="tbb-kansei-preview-col">
                <!-- Se inicializa al renderizar -->
              </div>
            </div>
          </div>

          <!-- BIBLIOGRAFÍA ESENCIAL DE RESPALDO ACADÉMICO -->
          <div class="tbb-books-academic-block tbb-reveal-on-scroll">
            <h2 class="tbb-section-title-lg" style="text-align:center; margin-bottom:24px;">${escHtml(t("theoryBooksSectionTitle"))}</h2>
            <div class="tbb-books-grid">
              ${FOUNDER_ESSENTIAL_BOOKS.map((b) => `
                <div class="tbb-book-academic-card">
                  <div class="tbb-book-spine" style="background:${b.color};">ETAPA ${escHtml(b.stage)}</div>
                  <div class="tbb-book-body">
                    <span class="tbb-book-year">${escHtml(b.year)}</span>
                    <h3 class="tbb-book-title">${escHtml(b.work)}</h3>
                    <p class="tbb-book-author">${escHtml(b.author)}</p>
                  </div>
                </div>
              `).join("")}
            </div>

            <div style="text-align:center; margin-top:40px;">
              <button type="button" class="tbb-btn-primary-vibrant" onclick="window.tbbSwitchMainSection(4)">
                ${TBB_ICONS.demo}
                <span>${escHtml(t("navDemo"))}</span>
                ${TBB_ICONS.arrowRight}
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  };

  // Alternar entre Vista Mockup de iPhone 16 Pro y Pantalla Completa en la Sección 4 (Demo en Vivo)
  window.tbbSetDemoViewportMode = function (mode) {
    const st = window.tbbCommercialDemoState;
    st.demoViewportMode = mode === "full" ? "full" : "iphone";
    const shell = document.getElementById("tbbDemoInteractiveStageWrap");
    if (shell) {
      shell.classList.toggle("is-fullscreen-mode", st.demoViewportMode === "full");
      shell.classList.toggle("is-iphone-mode", st.demoViewportMode !== "full");
    }
    const btnIp = document.getElementById("tbbBtnDemoModeIphone");
    const btnFl = document.getElementById("tbbBtnDemoModeFull");
    if (btnIp) btnIp.classList.toggle("active", st.demoViewportMode !== "full");
    if (btnFl) btnFl.classList.toggle("active", st.demoViewportMode === "full");
  };

  window.tbbJumpDemoToStep = function (stepNum) {
    const s = Number(stepNum) || 0;
    const isPro = hasProLicense();
    if (s >= 4 && !isPro) {
      window.tbbOpenBuyAppCheckoutModal("pro_atelier");
      return;
    }
    window.tbbCommercialDemoState.activeDemoStep = s;
    const iframe = document.getElementById("tbbRealStudioDemoIframe");
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({ type: "TBB_JUMP_TO_STEP", step: s }, "*");
      } catch (e) {}
    }
    document.querySelectorAll(".tbb-demo-step-pill").forEach((el, idx) => {
      el.classList.toggle("active", idx === s);
    });
  };

  // SUBPÁGINA 4: DEMO EN VIVO (TRASLADADA AL FINAL DEL FLUJO EDUCATIVO · EJECUTA EL CÓDIGO REAL DENTRO DEL MOCKUP DE IPHONE + PAYWALL $49 USD EN PASO 4)
  window.tbbBuildSubpage4DemoHTML = function () {
    const l = getLang();
    const st = window.tbbCommercialDemoState;
    const isPro = hasProLicense();
    const isFull = st.demoViewportMode === "full";
    const iframeSrc = `/studio?demo=true&embed=commercial&lang=${encodeURIComponent(l)}`;

    return `
      <section class="tbb-subpage-section tbb-live-demo-section">
        <div class="tbb-container-wide">
          <!-- Cabecera de Demo Interactiva Real -->
          <div class="tbb-section-header-large tbb-reveal-on-scroll is-visible" style="margin-bottom:24px;">
            <span class="tbb-eyebrow-pill">${TBB_ICONS.demo} <span>${escHtml(t("demoEyebrow"))}</span></span>
            <h1 class="tbb-section-title-xl">${escHtml(t("demoTitle"))}</h1>
            <p class="tbb-section-lead-xl">${escHtml(t("demoLead"))}</p>
          </div>

          <!-- Barra de Control de Pasos (Pasos 0, 1, 2 y 3 Libres | Paso 4 activa Paywall $49 USD con Migración Automática) -->
          <div class="tbb-demo-control-bar">
            <div class="tbb-demo-steps-strip">
              ${[0, 1, 2, 3, 4, 5, 6].map((s) => {
                const locked = s >= 4 && !isPro;
                return `
                  <button
                    type="button"
                    class="tbb-demo-step-pill ${st.activeDemoStep === s ? 'active' : ''} ${locked ? 'is-locked' : 'is-free'}"
                    onclick="window.tbbJumpDemoToStep(${s})"
                  >
                    ${locked ? TBB_ICONS.lock : TBB_ICONS.check}
                    <span>${escHtml(stepLabelForLang(s))}</span>
                    ${s < 4 ? `<small class="tbb-free-tag">FREE</small>` : `<small class="tbb-pro-tag">${isPro ? 'PRO' : '$49'}</small>`}
                  </button>
                `;
              }).join("")}
            </div>

            <div class="tbb-demo-viewport-toggles">
              <button type="button" id="tbbBtnDemoModeIphone" class="tbb-mode-pill ${!isFull ? 'active' : ''}" onclick="window.tbbSetDemoViewportMode('iphone')">
                ${TBB_ICONS.phone} <span>${escHtml(t("demoModeIphone"))}</span>
              </button>
              <button type="button" id="tbbBtnDemoModeFull" class="tbb-mode-pill ${isFull ? 'active' : ''}" onclick="window.tbbSetDemoViewportMode('full')">
                ${TBB_ICONS.expand} <span>${escHtml(t("demoModeFull"))}</span>
              </button>
            </div>
          </div>

          <!-- ESCENARIO REAL: MOCKUP INTERACTIVO DE IPHONE 16 PRO EJECUTANDO /STUDIO EN VIVO -->
          <div id="tbbDemoInteractiveStageWrap" class="tbb-demo-stage-wrap ${isFull ? 'is-fullscreen-mode' : 'is-iphone-mode'}">
            <!-- Panel Lateral Izquierdo de Guía y Conversión -->
            <aside class="tbb-demo-side-guide">
              <div class="tbb-demo-guide-card">
                <div class="tbb-demo-status-pill free">${TBB_ICONS.check} <span>${escHtml(t("demoFreeStepsBadge"))}</span></div>
                <h3>1. Habla o escribe a Aura en vivo</h3>
                <p>El mockup ejecuta el código real de The Best Brand Studio. Responde los Pasos 0, 1 (Círculo Dorado), 2 (Touchpoints) y 3 (Naming y Niza) sin costo.</p>
              </div>

              <div class="tbb-demo-guide-card highlight">
                <div class="tbb-demo-status-pill paywall">${isPro ? TBB_ICONS.unlock : TBB_ICONS.lock} <span>${escHtml(t("demoPaywallStep4Badge"))}</span></div>
                <h3>2. Desbloqueo del Paso 4 ($49 USD) y Migración Automática</h3>
                <p>Al avanzar al Paso 4 (Ingeniería Kansei), el sistema activa el bloqueo de pago de $49 USD, crea tu cuenta ejecutiva y migra automáticamente el 100% de tus respuestas de los Pasos 0 al 3.</p>
                <button type="button" class="tbb-btn-primary-vibrant" style="width:100%; margin-top:12px;" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
                  ${TBB_ICONS.shield}
                  <span>${escHtml(t("demoUnlockBtn"))}</span>
                </button>
              </div>
            </aside>

            <!-- Contenedor del Mockup de iPhone / Lienzo Completo con la App Real -->
            <div class="tbb-demo-iphone-center-stage">
              <div class="tbb-demo-device-frame">
                <div class="tbb-iphone16-dynamic-island">
                  <span class="tbb-island-cam"></span>
                  <span class="tbb-island-speaker"></span>
                </div>
                <iframe
                  id="tbbRealStudioDemoIframe"
                  title="The Best Brand Live Interactive Demo"
                  src="${escHtml(iframeSrc)}"
                  class="tbb-real-studio-iframe"
                  allow="microphone; autoplay; clipboard-write; fullscreen"
                ></iframe>
                <div class="tbb-iphone16-home-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  };

  // SUBPÁGINA 5: PACK DE DESCARGAS (CONSOLIDACIÓN DE ENTREGABLES · MENCIÓN ÚNICA DEL BRANDBOOK DE MÁS DE 30 PÁGINAS)
  window.tbbBuildSubpage5DownloadsHTML = function () {
    const l = getLang();
    const primaryBrandbook = OFFICIAL_9_DELIVERABLES[0];
    const pbLoc = primaryBrandbook.i18n[l] || primaryBrandbook.i18n.es;
    const otherDeliverables = OFFICIAL_9_DELIVERABLES.slice(1);

    return `
      <section class="tbb-subpage-section tbb-downloads-section">
        <div class="tbb-container-wide">
          <!-- Cabecera Unificada -->
          <div class="tbb-section-header-large tbb-reveal-on-scroll is-visible">
            <span class="tbb-eyebrow-pill">${TBB_ICONS.downloads} <span>${escHtml(t("downloadsEyebrow"))}</span></span>
            <h1 class="tbb-section-title-xl">${escHtml(t("downloadsTitle"))}</h1>
            <p class="tbb-section-lead-xl">${escHtml(t("downloadsLead"))}</p>
          </div>

          <!-- BLOQUE PROTAGONISTA ÚNICO DEL BRANDBOOK OFICIAL (ESTANDARIZADO A "MÁS DE 30 PÁGINAS (AJUSTABLE SEGÚN EL GIRO DEL NEGOCIO)") -->
          <div class="tbb-consolidated-brandbook-hero-card tbb-reveal-on-scroll is-visible">
            <div class="tbb-cb-left">
              <span class="tbb-cb-standard-badge">${TBB_ICONS.shield} <span>${escHtml(t("downloadsStandardBadge"))}</span></span>
              <h2 class="tbb-cb-title">${escHtml(pbLoc.title)}</h2>
              <p class="tbb-cb-desc">${escHtml(pbLoc.desc)}</p>
              <div class="tbb-cb-actions">
                <button
                  type="button"
                  class="tbb-btn-primary-vibrant"
                  onclick="window.tbbOpenPlateLightboxModal(1, '${escHtml(primaryBrandbook.thumb)}', '${escHtml(pbLoc.title)}', '${escHtml(primaryBrandbook.sampleUrl)}')"
                >
                  ${TBB_ICONS.book}
                  <span>${escHtml(t("downloadsViewSampleBtn"))}</span>
                </button>
                <button type="button" class="tbb-btn-secondary-clean" onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')">
                  ${TBB_ICONS.downloads}
                  <span>${escHtml(t("downloadsUnlockAllBtn"))}</span>
                </button>
              </div>
            </div>
            <div class="tbb-cb-right" onclick="window.tbbOpenPlateLightboxModal(1, '${escHtml(primaryBrandbook.thumb)}', '${escHtml(pbLoc.title)}', '${escHtml(primaryBrandbook.sampleUrl)}')">
              <img src="${escHtml(primaryBrandbook.thumb)}" alt="${escHtml(pbLoc.title)}" class="tbb-cb-preview-img" />
              <div class="tbb-cb-overlay-pill">${TBB_ICONS.expand} <span>${escHtml(primaryBrandbook.format)}</span></div>
            </div>
          </div>

          <!-- Grid Responsivo + Scroll Horizontal de los 8 Archivos Ejecutivos Complementarios -->
          <div class="tbb-deliverables-grid tbb-reveal-on-scroll">
            ${otherDeliverables.map((item) => {
              const loc = item.i18n[l] || item.i18n.es;
              return `
                <article class="tbb-deliverable-card" onclick="window.tbbOpenPlateLightboxModal(${item.plateNum}, '${escHtml(item.thumb)}', '${escHtml(loc.title)}', '${escHtml(item.sampleUrl)}')">
                  <div class="tbb-deliv-thumb-wrap">
                    <img src="${escHtml(item.thumb)}" alt="${escHtml(loc.title)}" loading="lazy" />
                    <span class="tbb-deliv-num-badge">#${escHtml(item.num)}</span>
                    <span class="tbb-deliv-fmt-badge">${escHtml(item.format)}</span>
                  </div>
                  <div class="tbb-deliv-body">
                    <h3 class="tbb-deliv-title">${escHtml(loc.title)}</h3>
                    <p class="tbb-deliv-desc">${escHtml(loc.desc)}</p>
                    <span class="tbb-deliv-link">${TBB_ICONS.expand} <span>${escHtml(t("downloadsViewSampleBtn"))}</span></span>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </div>
      </section>
    `;
  };


  window.tbbToggleMobileDrawer = function (forceState) {
    const drawer = document.getElementById("tbbMobileNavDrawer");
    if (!drawer) return;
    const next = typeof forceState === "boolean" ? forceState : !drawer.classList.contains("open");
    drawer.classList.toggle("open", next);
  };

  // ESTRUCTURA PRINCIPAL DE LA INTERFAZ COMERCIAL (HEADER CON LOGOTIPO PROTAGONISTA + MENÚ MÓVIL PROPIETARIO CERO EMOJIS + VIEWPORT)
  window.tbbBuildCommercialExperienceMarkup = function (isStandalonePage) {
    const l = getLang();
    const st = window.tbbCommercialDemoState || {};
    const activeSec = Math.max(1, Math.min(5, Number(st.activeMainSection) || 1));
    const isPro = hasProLicense();

    const navItems = [
      { sec: 1, label: t("navHome"), icon: TBB_ICONS.home },
      { sec: 2, label: t("navAppTour"), icon: TBB_ICONS.appTour },
      { sec: 3, label: t("navTheory"), icon: TBB_ICONS.theory },
      { sec: 4, label: t("navDemo"), icon: TBB_ICONS.demo },
      { sec: 5, label: t("navDownloads"), icon: TBB_ICONS.downloads }
    ];

    const langs = [
      { code: "es", label: "ES · Español" },
      { code: "en", label: "EN · English" },
      { code: "fr", label: "FR · Français" },
      { code: "pt", label: "PT · Português" },
      { code: "de", label: "DE · Deutsch" },
      { code: "it", label: "IT · Italiano" }
    ];

    const initialDocked = activeSec !== 1 || ((window.scrollY || 0) > 175);

    return `
      <div class="tbb-commercial-master-shell">
        <!-- HEADER SUPERIOR: EN INICIO EL LOGO ESTÁ EN LA PORTADA Y SOLO PASA AL ENCABEZADO AL HACER SCROLL O CAMBIAR DE MENÚ -->
        <header class="tbb-master-header ${initialDocked ? 'is-logo-docked' : ''}">
          <div class="tbb-header-inner">
            <!-- Logotipo del Encabezado (Oculto en la portada de 1. Inicio; aparece al hacer scroll o cambiar a menú 2-5 e incluye el logo y las palabras "THE BEST BRAND") -->
            <a href="/" class="tbb-brand-logo-link" onclick="event.preventDefault(); window.tbbSwitchMainSection(1);" aria-label="The Best Brand">
              <img src="${TBB_ISOTIPO_DATA_URI}" alt="The Best Brand Logo" class="tbb-header-isotipo-img" />
              <span class="tbb-header-brand-words">THE BEST <span class="tbb-brand-word-accent">BRAND</span></span>
            </a>

            <!-- Menú Principal del 1 al 5 (Siempre Prevalece al Hacer Más Pequeña la Ventana) -->
            <nav class="tbb-desktop-nav" aria-label="Primary Navigation">
              ${navItems.map((item) => `
                <button
                  type="button"
                  data-tbb-nav-sec="${item.sec}"
                  class="tbb-nav-tab-btn ${activeSec === item.sec ? 'active' : ''}"
                  onclick="window.tbbSwitchMainSection(${item.sec})"
                >
                  ${item.icon}
                  <span>${escHtml(item.label)}</span>
                </button>
              `).join("")}
            </nav>

            <!-- Acciones Derecha: Lista Desplegable de Idiomas + Botón Desbloquea tu Marca Bien Ajustado -->
            <div class="tbb-header-actions">
              <div class="tbb-lang-select-wrap">
                <span class="tbb-lang-globe-ic" aria-hidden="true">${TBB_ICONS.globe}</span>
                <select
                  id="tbbHeaderLangSelect"
                  class="tbb-lang-select-dropdown"
                  aria-label="Language Selector"
                  onchange="window.tbbSwitchCommercialLanguage(this.value)"
                >
                  ${langs.map((lg) => `
                    <option value="${lg.code}" ${l === lg.code ? 'selected' : ''}>${escHtml(lg.label)}</option>
                  `).join("")}
                </select>
              </div>

              <button
                type="button"
                class="tbb-header-buy-btn ${isPro ? 'is-pro' : ''}"
                onclick="window.tbbOpenBuyAppCheckoutModal('pro_atelier')"
              >
                <span class="tbb-buy-btn-ic">${isPro ? TBB_ICONS.unlock : TBB_ICONS.spark}</span>
                <span class="tbb-buy-btn-lbl">${escHtml(isPro ? t("navLicenseActive") : t("navBuyCta"))}</span>
              </button>
            </div>
          </div>
        </header>

        <!-- MENÚ MÓVIL REDISEÑADO (DRAWER DESLIZABLE + BARRA INFERIOR CON ICONOS PROPIETARIOS · CERO EMOJIS GENÉRICOS) -->
        <div id="tbbMobileNavDrawer" class="tbb-mobile-drawer-overlay" onclick="if(event.target===this) window.tbbToggleMobileDrawer(false)">
          <aside class="tbb-mobile-drawer-panel" onclick="event.stopPropagation()">
            <div class="tbb-mobile-drawer-head">
              <div class="tbb-mobile-drawer-logo">
                <img src="${TBB_CLEAN_LOGO_DATA_URI}" alt="The Best Brand" class="tbb-drawer-wordmark" />
              </div>
              <button type="button" class="tbb-drawer-close-btn" onclick="window.tbbToggleMobileDrawer(false)" aria-label="Close">
                ${TBB_ICONS.close}
              </button>
            </div>

            <div class="tbb-mobile-drawer-nav-list">
              ${navItems.map((item) => `
                <button
                  type="button"
                  data-tbb-nav-sec="${item.sec}"
                  class="tbb-mobile-drawer-item ${activeSec === item.sec ? 'active' : ''}"
                  onclick="window.tbbSwitchMainSection(${item.sec})"
                >
                  <span class="tbb-drawer-ic">${item.icon}</span>
                  <span class="tbb-drawer-lbl">${escHtml(item.label)}</span>
                  <span class="tbb-drawer-arr">${TBB_ICONS.arrowRight}</span>
                </button>
              `).join("")}
            </div>

            <div class="tbb-mobile-drawer-lang-box">
              <div class="tbb-drawer-lang-title">${TBB_ICONS.globe} <span>GLOBALIZACIÓN · 6 IDIOMAS</span></div>
              <div class="tbb-drawer-lang-grid">
                ${langs.map((lg) => `
                  <button
                    type="button"
                    class="tbb-drawer-lang-btn ${l === lg.code ? 'active' : ''}"
                    onclick="window.tbbSwitchCommercialLanguage('${lg.code}')"
                  >${lg.label}</button>
                `).join("")}
              </div>
            </div>

            <div class="tbb-mobile-drawer-footer">
              <button type="button" class="tbb-btn-primary-vibrant" style="width:100%;" onclick="window.tbbToggleMobileDrawer(false); window.tbbOpenBuyAppCheckoutModal('pro_atelier');">
                ${TBB_ICONS.shield}
                <span>${escHtml(t("navBuyCta"))}</span>
              </button>
            </div>
          </aside>
        </div>

        <!-- VIEWPORT DINÁMICO EXCLUSIVO DE LA SUBPÁGINA SELECCIONADA (CERO ANCLAS DE SCROLL EN INICIO) -->
        <main id="tbbSubpageDynamicViewport" class="tbb-subpage-dynamic-viewport">
          ${window.tbbRenderActiveSubpageHTML(activeSec)}
        </main>

        <!-- Barra de Navegación Móvil Inferior con Iconos Propietarios -->
        <nav class="tbb-mobile-bottom-dock" aria-label="Mobile Quick Navigation">
          ${navItems.map((item) => `
            <button
              type="button"
              data-tbb-nav-sec="${item.sec}"
              class="tbb-mobile-dock-btn ${activeSec === item.sec ? 'active' : ''}"
              onclick="window.tbbSwitchMainSection(${item.sec})"
            >
              ${item.icon}
              <span>${escHtml(item.label.replace(/^[0-9]+\.\s*/, ""))}</span>
            </button>
          `).join("")}
        </nav>
      </div>
    `;
  };

  // VISOR MODAL DE CÁPSULAS EXPLICATIVAS EN EL IDIOMA ACTIVO (ES, EN, FR, PT, DE, IT CON SELECTOR INTERACTIVO Y FALLBACK CDN)
  window.tbbOpenVideoPopupModal = function (stepIdx, langOverride) {
    const s = Math.max(0, Math.min(6, Number(stepIdx) || 0));
    if (langOverride && ["es", "en", "fr", "pt", "de", "it"].includes(String(langOverride).toLowerCase())) {
      const targetLang = String(langOverride).toLowerCase();
      if (window.tbbCommercialDemoState) {
        window.tbbCommercialDemoState.lang = targetLang;
      }
      try { localStorage.setItem("tbb_commercial_lang", targetLang); } catch (e) {}
    }
    const l = getLang();
    if (window.tbbCommercialDemoState) {
      window.tbbCommercialDemoState.openVideoModalStep = s;
    }

    let ov = document.getElementById("tbbVideoPopupModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbVideoPopupModalOverlay";
      ov.className = "tbb-modal-overlay";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseVideoPopupModal(); };
      document.body.appendChild(ov);
    }

    const cap = VIDEO_CAPSULES[s] || VIDEO_CAPSULES[0];
    const vidUrl = getLocalizedStepVideoUrl(s, l);
    const posterUrl = getLocalizedStepPosterUrl(s, l);
    const sfx = l === "es" ? "" : `_${l}`;
    const fbVidUrl = resolveVideoAssetFallback(`/assets/videos/capsula_teoria_paso_${s}${sfx}.mp4`);
    const modalLangs = [
      { code: "es", label: "ES · Español" },
      { code: "en", label: "EN · English" },
      { code: "fr", label: "FR · Français" },
      { code: "pt", label: "PT · Português" },
      { code: "de", label: "DE · Deutsch" },
      { code: "it", label: "IT · Italiano" }
    ];

    ov.innerHTML = `
      <div class="tbb-video-modal-card" onclick="event.stopPropagation()">
        <div class="tbb-video-modal-head" style="flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span class="tbb-eyebrow-pill" style="margin:0;">${TBB_ICONS.play} <span>THE BEST BRAND · ${escHtml(stepUpperForLang(s))} (${l.toUpperCase()})</span></span>
            <div style="display:flex; gap:5px; flex-wrap:wrap;" title="Seleccionar Paso (00 - 06)">
              ${[0, 1, 2, 3, 4, 5, 6].map((idx) => `
                <button
                  type="button"
                  onclick="window.tbbOpenVideoPopupModal(${idx}, '${l}')"
                  style="padding:4px 10px; border-radius:999px; border:1px solid ${idx === s ? '#FF7A00' : '#CBD5E1'}; background:${idx === s ? '#0D2540' : '#F8FAFC'}; color:${idx === s ? '#FFFFFF' : '#0D2540'}; font-size:0.74rem; font-weight:700; cursor:pointer;"
                >0${idx}</button>
              `).join("")}
            </div>
            <div style="display:flex; gap:4px; flex-wrap:wrap; padding-left:6px; border-left:1px solid #CBD5E1;" title="Idioma del Video (Avatar Multilingüe)">
              ${modalLangs.map((ml) => `
                <button
                  type="button"
                  onclick="window.tbbOpenVideoPopupModal(${s}, '${ml.code}')"
                  style="padding:4px 9px; border-radius:999px; border:1px solid ${ml.code === l ? '#FF7A00' : '#CBD5E1'}; background:${ml.code === l ? '#FF7A00' : '#FFFFFF'}; color:${ml.code === l ? '#FFFFFF' : '#0D2540'}; font-size:0.72rem; font-weight:800; cursor:pointer;"
                >${ml.label}</button>
              `).join("")}
            </div>
          </div>
          <button type="button" class="tbb-modal-close-ic" onclick="window.tbbCloseVideoPopupModal()" aria-label="Close">
            ${TBB_ICONS.close}
          </button>
        </div>

        <div class="tbb-video-modal-body-grid">
          <div class="tbb-video-modal-player-box" style="position:relative; overflow:hidden;">
            <img
              id="tbbPopupCapsulePosterOv"
              src="${escHtml(posterUrl)}"
              alt="Cápsula Ejecutiva"
              style="position:absolute; inset:0 0 46px 0; width:100%; height:calc(100% - 46px); object-fit:cover; pointer-events:none; transition:opacity 0.25s ease; z-index:2;"
            />
            <video
              id="tbbPopupCapsuleVideoEl"
              controls
              autoplay
              playsinline
              preload="metadata"
              src="${escHtml(vidUrl)}"
              poster="${escHtml(posterUrl)}"
              onloadedmetadata="this.playbackRate=1.0; this.defaultPlaybackRate=1.0;"
              ontimeupdate="const ov=document.getElementById('tbbPopupCapsulePosterOv'); if(ov && this.currentTime>0.08 && !this.paused){ov.style.opacity='0';}"
              onpause="const ov=document.getElementById('tbbPopupCapsulePosterOv'); if(ov && this.currentTime<0.08){ov.style.opacity='1';}"
              onerror="if(!this.dataset.fb){this.dataset.fb='1'; this.src='${escHtml(fbVidUrl)}'; this.load(); this.play().catch(()=>{});}"
            ></video>
          </div>
          <div class="tbb-video-modal-info-col">
            <span class="tbb-scrolly-theory-tag">${escHtml(cap.author)}</span>
            <h3>${escHtml(cap.title)}</h3>
            <p>${escHtml(cap.summary)}</p>
            <div style="padding:10px 12px; border-radius:12px; background:#F8FAFC; border:1px solid #E2E8F0; font-size:0.76rem; color:#334155;">
              <strong style="color:#0D2540;">Audio &amp; Video Nativo (${l.toUpperCase()}):</strong> Velocidad <code>1.0x</code> certificada · Disponible en 6 idiomas (ES, EN, FR, PT, DE, IT).
            </div>
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:auto;">
              ${s < 6 ? `
                <button type="button" class="tbb-btn-primary-vibrant" onclick="window.tbbOpenVideoPopupModal(${s + 1}, '${l}')">
                  <span>${escHtml(stepLabelForLang(s + 1))}</span>
                  ${TBB_ICONS.arrowRight}
                </button>
              ` : `
                <button type="button" class="tbb-btn-primary-vibrant" onclick="window.tbbCloseVideoPopupModal(); window.tbbSwitchMainSection(4);">
                  ${TBB_ICONS.demo}
                  <span>${escHtml(t("navDemo"))}</span>
                </button>
              `}
              <button type="button" class="tbb-btn-secondary-clean" onclick="window.tbbCloseVideoPopupModal()">
                <span>${escHtml(t("lightboxClose"))}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    ov.classList.add("open");
    const vEl = document.getElementById("tbbPopupCapsuleVideoEl");
    if (vEl) {
      vEl.defaultPlaybackRate = 1.0;
      vEl.playbackRate = 1.0;
      vEl.play().catch(() => {});
    }
  };

  window.tbbCloseVideoPopupModal = function () {
    if (window.tbbCommercialDemoState) {
      window.tbbCommercialDemoState.openVideoModalStep = null;
    }
    const vid = document.getElementById("tbbPopupCapsuleVideoEl");
    if (vid) {
      try { vid.pause(); } catch (e) {}
    }
    const ov = document.getElementById("tbbVideoPopupModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  // VISOR DE ALTA RESOLUCIÓN PARA EL BRANDBOOK Y ENTREGABLES
  window.tbbOpenPlateLightboxModal = function (plateNum, customImgUrl, customTitle, customSampleUrl) {
    const pNum = Math.max(1, Math.min(30, Number(plateNum) || 1));
    const imgUrl = customImgUrl || `/assets/brandbook_plates_tbb/plate-${String(pNum).padStart(2, "0")}.jpg`;
    const titleStr = customTitle || `Brandbook Oficial · Página ${String(pNum).padStart(2, "0")}`;
    const sampleHref = customSampleUrl || "/samples/1_Brandbook_Maestro_TheBestBrand.html";

    let ov = document.getElementById("tbbPlateLightboxOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbPlateLightboxOverlay";
      ov.className = "tbb-modal-overlay";
      ov.onclick = (e) => { if (e.target === ov) window.tbbClosePlateLightboxModal(); };
      document.body.appendChild(ov);
    }

    const prevNum = pNum > 1 ? pNum - 1 : 30;
    const nextNum = pNum < 30 ? pNum + 1 : 1;

    ov.innerHTML = `
      <div class="tbb-lightbox-modal-card" onclick="event.stopPropagation()">
        <div class="tbb-video-modal-head">
          <strong>${escHtml(titleStr)}</strong>
          <div style="display:flex; gap:8px; align-items:center;">
            <button type="button" class="tbb-btn-secondary-clean" style="padding:6px 12px;" onclick="window.tbbOpenPlateLightboxModal(${prevNum})">
              ${TBB_ICONS.arrowLeft} <span>${escHtml(t("lightboxPrev"))}</span>
            </button>
            <button type="button" class="tbb-btn-secondary-clean" style="padding:6px 12px;" onclick="window.tbbOpenPlateLightboxModal(${nextNum})">
              <span>${escHtml(t("lightboxNext"))}</span> ${TBB_ICONS.arrowRight}
            </button>
            <a href="${escHtml(sampleHref)}" target="_blank" rel="noopener" class="tbb-btn-primary-vibrant" style="padding:7px 14px; text-decoration:none;">
              ${TBB_ICONS.expand} <span>Abrir Documento Interactivo</span>
            </a>
            <button type="button" class="tbb-modal-close-ic" onclick="window.tbbClosePlateLightboxModal()">
              ${TBB_ICONS.close}
            </button>
          </div>
        </div>
        <div style="background:#F8FAFC; border-radius:18px; overflow:hidden; text-align:center; padding:12px;">
          <img src="${escHtml(imgUrl)}" alt="${escHtml(titleStr)}" style="max-width:100%; max-height:74vh; border-radius:12px; box-shadow:0 16px 40px rgba(13,37,64,0.12);" />
        </div>
      </div>
    `;
    ov.classList.add("open");
  };

  window.tbbClosePlateLightboxModal = function () {
    const ov = document.getElementById("tbbPlateLightboxOverlay");
    if (ov) ov.classList.remove("open");
  };


  // MECÁNICA DE CONVERSIÓN ($49 USD PAYWALL EN PASO 4), CREACIÓN DE CUENTA Y MIGRACIÓN AUTOMÁTICA DE PASOS 0 AL 3
  window.tbbGetPendingDemoMigrationSnapshot = function () {
    const st = window.tbbCommercialDemoState || {};
    if (st.migratedSteps0to3Snapshot && typeof st.migratedSteps0to3Snapshot === "object") {
      return st.migratedSteps0to3Snapshot;
    }
    try {
      const raw = localStorage.getItem("tbb_studio_autosave_v45") || localStorage.getItem("tbb_demo_steps_0_to_3_backup");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (e) {}
    return {
      brandName: st.brandName || "The Best Brand",
      completedSteps: [0, 1, 2, 3],
      migratedAt: new Date().toISOString()
    };
  };

  window.tbbFormatCardInput = function (inputEl) {
    if (!inputEl) return;
    const digits = String(inputEl.value || "").replace(/\D/g, "").slice(0, 16);
    inputEl.value = digits.replace(/(.{4})/g, "$1 ").trim();
  };

  window.tbbFormatExpiryInput = function (inputEl) {
    if (!inputEl) return;
    const digits = String(inputEl.value || "").replace(/\D/g, "").slice(0, 4);
    inputEl.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  window.tbbBroadcastLicenseUnlockedToStudio = function (receiptObj, accountObj, migrationSnapshot) {
    const payload = {
      type: "TBB_PRO_LICENSE_UNLOCKED",
      license: receiptObj,
      account: accountObj,
      migrationSnapshot: migrationSnapshot,
      continueAtStep: 4
    };
    ["tbbRealStudioDemoIframe", "tbbTourIphoneLiveIframe"].forEach((id) => {
      const ifr = document.getElementById(id);
      if (ifr && ifr.contentWindow) {
        try {
          ifr.contentWindow.postMessage(payload, "*");
          ifr.contentWindow.postMessage({ type: "TBB_JUMP_TO_STEP", step: 4 }, "*");
        } catch (e) {}
      }
    });
  };

  window.tbbProcessCheckoutPayment = async function (methodId) {
    const emailEl = document.getElementById("tbbCheckoutEmailInput");
    const nameEl = document.getElementById("tbbCheckoutHolderNameInput");
    const email = (emailEl && emailEl.value.trim()) || "fundador@thebestbrand.app";
    const holderName = (nameEl && nameEl.value.trim()) || "Fundador Ejecutivo";
    const migrationSnapshot = window.tbbGetPendingDemoMigrationSnapshot();

    const receiptObj = {
      licenseId: "TBB-PRO-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      plan: "pro_atelier",
      amountUsd: 49,
      method: methodId || "card",
      unlockedAt: new Date().toISOString(),
      stepsUnlocked: [0, 1, 2, 3, 4, 5, 6]
    };
    const accountObj = {
      email,
      name: holderName,
      createdAt: new Date().toISOString(),
      migratedSteps0to3: true
    };

    try {
      localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receiptObj));
      localStorage.setItem("tbb_user_account_v56", JSON.stringify(accountObj));
      localStorage.setItem("tbb_migrated_steps_0_to_3_v56", JSON.stringify(migrationSnapshot));
    } catch (e) {}

    window.tbbBroadcastLicenseUnlockedToStudio(receiptObj, accountObj, migrationSnapshot);
    window.tbbRenderCheckoutSuccessView(receiptObj, accountObj, migrationSnapshot);
    window.tbbRefreshCommercialPortalDOM();
  };

  window.tbbRenderCheckoutSuccessView = function (receipt, account, migrationSnapshot) {
    const box = document.getElementById("tbbCheckoutModalContentBox");
    if (!box) return;
    const bName = (migrationSnapshot && (migrationSnapshot.brandName || (migrationSnapshot.canvasState && migrationSnapshot.canvasState.brandName))) || "Tu Marca";
    box.innerHTML = `
      <div style="text-align:center; padding:18px 10px;">
        <div style="width:68px; height:68px; margin:0 auto 14px; border-radius:20px; background:#ECFDF5; border:2px solid #10B981; display:flex; align-items:center; justify-content:center;">
          ${TBB_ICONS.unlock}
        </div>
        <span class="tbb-eyebrow-pill" style="background:#ECFDF5; color:#065F46; border-color:#A7F3D0;">
          ${TBB_ICONS.check} <span>LICENCIA PRO ACTIVA (${escHtml(receipt.licenseId)}) · CUENTA CREADA</span>
        </span>
        <h2 style="font-family:'Montserrat',sans-serif; font-size:1.55rem; font-weight:900; color:#0D2540; margin:12px 0 8px;">
          ¡Progreso Migrado (${escHtml(bName)})! Paso 4 Desbloqueado
        </h2>
        <p style="font-size:0.98rem; color:#475569; line-height:1.55; max-width:520px; margin:0 auto 20px;">
          Tu cuenta <strong>${escHtml(account.email)}</strong> ha sido creada y todas tus respuestas de los Pasos 0, 1, 2 y 3 se migraron automáticamente. Ya puedes continuar en el Paso 4 sin perder nada de tu avance.
        </p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button
            type="button"
            class="tbb-btn-primary-vibrant"
            onclick="window.tbbCloseBuyAppCheckoutModal(); window.tbbSwitchMainSection(4); setTimeout(()=>window.tbbJumpDemoToStep(4), 180);"
          >
            ${TBB_ICONS.spark}
            <span>Continuar Ahora en el Paso 4</span>
            ${TBB_ICONS.arrowRight}
          </button>
          <a
            href="/studio?step=4&continue=true&lang=${encodeURIComponent(getLang())}"
            class="tbb-btn-secondary-clean"
            style="text-decoration:none;"
          >
            ${TBB_ICONS.expand}
            <span>Abrir Estudio a Pantalla Completa</span>
          </a>
        </div>
      </div>
    `;
  };

  window.tbbRenderCheckoutModalContent = function () {
    const box = document.getElementById("tbbCheckoutModalContentBox");
    if (!box) return;
    const mig = window.tbbGetPendingDemoMigrationSnapshot();
    const bName = (mig && (mig.brandName || (mig.canvasState && mig.canvasState.brandName))) || "Tu Marca en Curso";

    box.innerHTML = `
      <div class="tbb-checkout-head">
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="/assets/logos/Isotipo_Oficial_TheBestBrand_LiquidGlass_1024px.png" alt="The Best Brand" style="width:42px; height:42px; border-radius:11px;" />
          <div>
            <span class="tbb-eyebrow-pill" style="margin:0;">${TBB_ICONS.shield} <span>DESBLOQUEO PASO 4 AL 6 · $49 USD PAGO ÚNICO</span></span>
            <h3 style="font-family:'Montserrat',sans-serif; font-size:1.28rem; font-weight:900; color:#0D2540; margin:4px 0 0;">${escHtml(t("checkoutTitle"))}</h3>
          </div>
        </div>
        <button type="button" class="tbb-modal-close-ic" onclick="window.tbbCloseBuyAppCheckoutModal()">
          ${TBB_ICONS.close}
        </button>
      </div>

      <p style="font-size:0.95rem; color:#475569; line-height:1.5; margin:10px 0 14px;">
        ${escHtml(t("checkoutSub"))}
      </p>

      <!-- Garantía de Migración Automática de los Pasos 1 al 3 -->
      <div style="background:#F0F9FF; border:1.5px solid #BAE6FD; border-radius:16px; padding:12px 16px; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div style="display:flex; align-items:center; gap:10px;">
          ${TBB_ICONS.check}
          <div>
            <strong style="display:block; font-size:0.86rem; color:#0D2540;">${escHtml(t("checkoutMigrationTitle"))}</strong>
            <span style="font-size:0.80rem; color:#334155;">Marca detectada: <strong>${escHtml(bName)}</strong> · Pasos 0, 1, 2 y 3 listos para migrar al Paso 4.</span>
          </div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace; font-size:0.78rem; font-weight:800; color:#FF7A00; background:#FFF7ED; padding:4px 10px; border-radius:999px; border:1px solid #FFEDD5;">$49 USD</span>
      </div>

      <div class="tbb-checkout-form-grid">
        <div>
          <label class="tbb-checkout-label">${escHtml(t("checkoutNameLabel"))}</label>
          <input id="tbbCheckoutHolderNameInput" type="text" value="Jorge Benítez" class="tbb-checkout-input" />
        </div>
        <div>
          <label class="tbb-checkout-label">${escHtml(t("checkoutAccountLabel"))}</label>
          <input id="tbbCheckoutEmailInput" type="email" value="fundador@empresa.com" class="tbb-checkout-input" />
        </div>
        <div>
          <label class="tbb-checkout-label">Número de Tarjeta de Crédito o Débito</label>
          <input id="tbbCardNumberInput" type="text" value="4532 8910 4421 8890" maxlength="19" oninput="window.tbbFormatCardInput(this)" class="tbb-checkout-input mono" />
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div>
            <label class="tbb-checkout-label">Vigencia</label>
            <input id="tbbCardExpiryInput" type="text" value="08/29" maxlength="5" oninput="window.tbbFormatExpiryInput(this)" class="tbb-checkout-input mono" />
          </div>
          <div>
            <label class="tbb-checkout-label">CVC</label>
            <input type="text" value="884" maxlength="4" class="tbb-checkout-input mono" />
          </div>
        </div>
      </div>

      <button type="button" class="tbb-btn-primary-vibrant" style="width:100%; margin-top:18px; justify-content:center; padding:15px;" onclick="window.tbbProcessCheckoutPayment('card')">
        ${TBB_ICONS.card}
        <span>${escHtml(t("checkoutPayBtn"))}</span>
        ${TBB_ICONS.arrowRight}
      </button>
    `;
  };

  window.tbbOpenBuyAppCheckoutModal = function (planId) {
    if (window.tbbCommercialDemoState && planId) {
      window.tbbCommercialDemoState.selectedPlan = planId;
    }
    let ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbBuyAppCheckoutModalOverlay";
      ov.className = "tbb-modal-overlay";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseBuyAppCheckoutModal(); };
      ov.innerHTML = `<div id="tbbCheckoutModalContentBox" class="tbb-checkout-modal-card" onclick="event.stopPropagation()"></div>`;
      document.body.appendChild(ov);
    }
    window.tbbRenderCheckoutModalContent();
    ov.classList.add("open");
  };

  window.tbbCloseBuyAppCheckoutModal = function () {
    const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  // CAMBIO GLOBAL DE IDIOMA (TRADUCE TEXTOS, INFOGRAFÍA, IPHONE MOCKUP Y VIDEOS EN LOS 6 IDIOMAS)
  window.tbbSwitchCommercialLanguage = function (langCode) {
    const clean = String(langCode || "es").toLowerCase().trim();
    if (!["es", "en", "fr", "pt", "de", "it"].includes(clean)) return;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, clean);
      localStorage.setItem("tbb_app_lang", clean);
    } catch (e) {}
    document.documentElement.lang = clean;

    window.tbbRefreshCommercialPortalDOM();

    // Sincronizar iframes activos de Studio (/demo y /app-tour)
    ["tbbRealStudioDemoIframe", "tbbTourIphoneLiveIframe"].forEach((id) => {
      const ifr = document.getElementById(id);
      if (ifr && ifr.contentWindow) {
        try {
          ifr.contentWindow.postMessage({ type: "TBB_SET_LANGUAGE", lang: clean }, "*");
        } catch (e) {}
      }
    });

    // Si hay un modal de video abierto, actualizarlo de inmediato al idioma seleccionado
    const st = window.tbbCommercialDemoState || {};
    const vidOv = document.getElementById("tbbVideoPopupModalOverlay");
    if (vidOv && vidOv.classList.contains("open") && st.openVideoModalStep != null) {
      window.tbbOpenVideoPopupModal(st.openVideoModalStep);
    }
  };


  function tbbInjectAwwwardsStyles() {
    if (document.getElementById("tbbClinicalAuditV105Styles")) return;
    const st = document.createElement("style");
    st.id = "tbbClinicalAuditV105Styles";
    st.textContent = `
      :root {
        --tbb-navy: #0D2540;
        --tbb-blue: #426EAE;
        --tbb-sky: #4C9DE6;
        --tbb-orange: #FF7A00;
        --tbb-ink: #1E293B;
        --tbb-muted: #475569;
        --tbb-line: #E2E8F0;
        --tbb-bg: #FFFFFF;
        --tbb-surface: #F8FAFC;
      }
      html { scroll-behavior: smooth; }
      body.tbb-commercial-standalone-body {
        margin: 0;
        padding: 0;
        background: #FFFFFF;
        color: #0D2540;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .tbb-svg-ic { display: inline-block; vertical-align: middle; flex-shrink: 0; }

      /* HEADER SUPERIOR FIJO (SE PRESERVA SIEMPRE AL HACER SCROLL Y MUESTRA EL LOGO + "THE BEST BRAND") */
      .tbb-master-header {
        position: fixed;
        top: 3.5px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 2500;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1.5px solid #E2E8F0;
        box-shadow: 0 10px 30px rgba(13, 37, 64, 0.06);
      }
      .tbb-subpage-dynamic-viewport {
        padding-top: 82px;
      }
      .tbb-header-inner {
        max-width: 1440px;
        margin: 0 auto;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        transition: justify-content 0.3s ease;
      }
      .tbb-brand-logo-link {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        flex-shrink: 0;
        max-width: 340px;
        opacity: 1;
        transform: translateY(0) scale(1);
        transition: max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    opacity 0.28s ease,
                    transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                    margin 0.3s ease;
      }
      .tbb-brand-logo-link:hover { transform: scale(1.02); }
      .tbb-master-header:not(.is-logo-docked) .tbb-brand-logo-link {
        max-width: 0 !important;
        opacity: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
        margin: 0 !important;
        padding: 0 !important;
        gap: 0 !important;
        transform: translateY(-10px) scale(0.9);
      }
      .tbb-header-isotipo-img {
        height: 40px;
        width: auto;
        object-fit: contain;
        display: block;
        flex-shrink: 0;
      }
      .tbb-header-brand-words {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.05rem;
        font-weight: 900;
        letter-spacing: 0.06em;
        color: #0D2540;
        white-space: nowrap;
        line-height: 1;
      }
      .tbb-brand-word-accent {
        color: #FF7A00;
      }
      .tbb-header-wordmark-svg {
        height: 44px;
        width: auto;
        max-width: 245px;
        object-fit: contain;
        display: block;
      }

      /* MENÚ PRINCIPAL DEL 1 AL 5 (SIEMPRE PREVALECE AL HACER MÁS PEQUEÑA LA VENTANA) */
      .tbb-desktop-nav {
        display: flex !important;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
        background: #F4F8FC;
        padding: 5px;
        border-radius: 999px;
        border: 1px solid #DCE6F2;
        flex: 1 1 auto;
      }
      .tbb-nav-tab-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.22s ease;
        white-space: nowrap;
      }
      .tbb-nav-tab-btn:hover { background: rgba(66, 110, 174, 0.10); }
      .tbb-nav-tab-btn.active {
        background: #0D2540;
        color: #FFFFFF;
        box-shadow: 0 6px 18px rgba(13, 37, 64, 0.18);
      }

      /* ACCIONES DERECHA: IDIOMAS EN LISTA DESPLEGABLE + BOTÓN DESBLOQUEA TU MARCA BIEN AJUSTADO */
      .tbb-header-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        flex-shrink: 0;
      }
      .tbb-lang-select-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        background: #F8FAFC;
        border: 1.5px solid #CBD5E1;
        border-radius: 999px;
        padding: 0 10px 0 12px;
        height: 40px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .tbb-lang-select-wrap:hover,
      .tbb-lang-select-wrap:focus-within {
        border-color: #426EAE;
        box-shadow: 0 4px 12px rgba(66, 110, 174, 0.14);
      }
      .tbb-lang-globe-ic {
        display: inline-flex;
        align-items: center;
        color: #0D2540;
        margin-right: 6px;
        pointer-events: none;
      }
      .tbb-lang-select-dropdown {
        appearance: none;
        -webkit-appearance: none;
        border: none;
        background: transparent;
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.78rem;
        font-weight: 800;
        padding: 6px 20px 6px 2px;
        cursor: pointer;
        outline: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230D2540' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 2px center;
      }

      /* BOTÓN "DESBLOQUEA TU MARCA ($49 USD)" BIEN AJUSTADO Y PROPORCIONADO */
      .tbb-header-buy-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        height: 40px;
        padding: 0 16px;
        border-radius: 999px;
        border: 1.5px solid rgba(255, 255, 255, 0.22);
        background: linear-gradient(135deg, #FF7A00 0%, #EA580C 100%);
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.80rem;
        font-weight: 800;
        letter-spacing: 0.01em;
        line-height: 1;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(255, 122, 0, 0.26);
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .tbb-header-buy-btn:hover {
        transform: translateY(-1.5px);
        box-shadow: 0 12px 26px rgba(255, 122, 0, 0.36);
      }
      .tbb-header-buy-btn.is-pro {
        background: #0D2540;
        box-shadow: 0 6px 16px rgba(13, 37, 64, 0.18);
      }
      .tbb-buy-btn-ic {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .tbb-buy-btn-lbl {
        display: inline-block;
        line-height: 1;
      }

      /* PORTADA CENTRAL DE 1. INICIO: LOGOTIPO AL CENTRO (CERO "DEL CAOS AL SISTEMA") + TAGLINE "Your Brand,  NOW!!!" */
      .tbb-cover-hero-logo-lockup {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto 18px;
        padding: 10px 20px 14px;
        transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-cover-hero-logo-lockup.is-docked-to-header {
        opacity: 0;
        transform: translateY(-18px) scale(0.92);
        pointer-events: none;
      }
      .tbb-cover-logo-clean-row {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 18px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .tbb-cover-isotipo-img {
        height: clamp(68px, 8.5vw, 96px);
        width: auto;
        object-fit: contain;
        filter: drop-shadow(0 12px 26px rgba(13, 37, 64, 0.12));
      }
      .tbb-cover-brand-words {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(2.1rem, 4.2vw, 3.45rem);
        font-weight: 900;
        letter-spacing: 0.08em;
        color: #0D2540;
        line-height: 1;
      }
      .tbb-cover-tagline-now {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.08rem, 1.8vw, 1.42rem);
        font-weight: 900;
        color: #FF7A00;
        letter-spacing: 0.12em;
        white-space: pre;
        background: linear-gradient(90deg, #0D2540 0%, #426EAE 38%, #FF7A00 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding: 4px 18px;
        border-radius: 999px;
        border: 1.5px solid rgba(255, 122, 0, 0.28);
        background-color: #FFF7ED;
        box-shadow: 0 8px 20px rgba(255, 122, 0, 0.10);
      }

      /* HERO & PROTAGONISMO A TODO EL ANCHO DE LOS 5 PILARES CIENTÍFICOS */
      .tbb-subpage-section {
        position: relative;
        padding: 24px 24px 96px;
        min-height: calc(100vh - 84px);
      }
      .tbb-open-curve-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 360px;
        pointer-events: none;
        z-index: 0;
      }
      .tbb-hero-particles-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
      .tbb-container-wide {
        max-width: 1380px;
        margin: 0 auto;
      }
      .tbb-monumental-brand-axis {
        text-align: center;
        max-width: 1080px;
        margin: 0 auto 24px;
      }
      .tbb-eyebrow-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        border-radius: 999px;
        background: #FFF7ED;
        border: 1px solid #FFEDD5;
        color: #EA580C;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.05em;
      }
      .tbb-hero-display-title {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(2.05rem, 3.8vw, 3.25rem);
        font-weight: 900;
        color: #0D2540;
        line-height: 1.12;
        letter-spacing: -0.025em;
        margin: 10px 0 12px;
      }
      .tbb-text-accent-gradient {
        background: linear-gradient(135deg, #426EAE 0%, #FF7A00 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .tbb-hero-lead-paragraph {
        font-size: clamp(1.05rem, 1.3vw, 1.22rem);
        color: #334155;
        line-height: 1.6;
        max-width: 920px;
        margin: 0 auto 14px;
      }

      /* SECCIÓN FINAL DE 1. INICIO: "ÚSALA EN TU MÓVIL, TABLET O COMPUTADORA" + MOCKUPS REALES AL HACER CLICK */
      .tbb-home-multidevice-bottom-section {
        margin-top: 38px;
        background: linear-gradient(180deg, #FFFFFF 0%, #F4F8FC 100%);
        border: 2px solid #DCE6F2;
        border-radius: 32px;
        padding: 36px 28px 42px;
        box-shadow: 0 24px 64px rgba(13, 37, 64, 0.08);
      }
      .tbb-home-multidevice-header {
        text-align: center;
        max-width: 920px;
        margin: 0 auto 28px;
      }
      .tbb-multidevice-showcase-bar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
        background: #FFFFFF;
        border: 1.5px solid #CBD5E1;
        border-radius: 999px;
        padding: 8px 18px;
        box-shadow: 0 10px 26px rgba(13, 37, 64, 0.06);
      }
      .tbb-multidevice-badge-left {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.82rem;
        font-weight: 800;
        color: #0D2540;
      }
      .tbb-multidevice-icons-group {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #F4F8FC;
        padding: 4px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
      }
      .tbb-device-form-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-device-form-btn:hover { background: #E2E8F0; }
      .tbb-device-form-btn.active {
        background: #0D2540;
        color: #FFFFFF;
        box-shadow: 0 6px 16px rgba(13, 37, 64, 0.22);
      }
      .tbb-home-multidevice-head {
        text-align: center;
        margin: 0 auto 24px;
      }
      .tbb-home-multidevice-stage-wrap {
        max-width: 1240px;
        margin: 0 auto;
      }
      .tbb-home-device-stage-centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      /* CHASIS CELULAR, TABLET Y COMPUTADORA MOSTRANDO EL PASO DE SELECCIÓN DE LOGOTIPO */
      .tbb-home-device-chassis {
        background: #0D2540;
        box-shadow: 0 28px 70px rgba(13, 37, 64, 0.26), inset 0 0 0 3px #426EAE;
        position: relative;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
      }
      .tbb-home-device-chassis.is-mobile {
        width: 390px;
        max-width: 94vw;
        border-radius: 46px;
        padding: 14px;
      }
      .tbb-home-device-chassis.is-tablet {
        width: 880px;
        max-width: 96vw;
        border-radius: 34px;
        padding: 16px;
      }
      .tbb-home-device-chassis.is-desktop {
        width: 100%;
        max-width: 1180px;
        border-radius: 20px 20px 10px 10px;
        padding: 10px 14px 16px;
      }
      .tbb-tablet-logo-studio-grid {
        display: grid;
        grid-template-columns: 1.35fr 1fr;
        gap: 12px;
        align-items: stretch;
      }
      .tbb-desktop-logo-studio-grid {
        display: grid;
        grid-template-columns: 245px 1fr 275px;
        gap: 12px;
        align-items: stretch;
      }
      .tbb-studio-logo-card:hover {
        transform: translateY(-2px);
      }
      .tbb-home-device-top-bezel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 4px 8px 10px;
        color: #FFFFFF;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
      }
      .tbb-bezel-mode-btn {
        background: #FF7A00;
        color: #FFFFFF;
        border: none;
        border-radius: 999px;
        padding: 5px 12px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.70rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-home-mobile-notch {
        width: 108px;
        height: 22px;
        background: #061322;
        border-radius: 999px;
        margin: 0 auto 10px;
      }
      .tbb-home-mobile-bar {
        width: 110px;
        height: 5px;
        background: rgba(255, 255, 255, 0.45);
        border-radius: 999px;
        margin: 10px auto 2px;
      }
      .tbb-home-tablet-cam {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #4C9DE6;
        margin: 0 auto 8px;
      }
      .tbb-home-desktop-topbar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 8px 10px;
        flex-wrap: wrap;
      }
      .tbb-home-desktop-topbar .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .tbb-home-desktop-topbar .dot.red { background: #EF4444; }
      .tbb-home-desktop-topbar .dot.yellow { background: #F59E0B; }
      .tbb-home-desktop-topbar .dot.green { background: #10B981; }
      .tbb-home-desktop-url {
        margin-left: 10px;
        background: rgba(255, 255, 255, 0.12);
        color: #E2E8F0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        padding: 3px 14px;
        border-radius: 999px;
      }
      .tbb-home-desktop-stand {
        width: 200px;
        height: 16px;
        background: linear-gradient(180deg, #1E293B 0%, #0D2540 100%);
        border-radius: 0 0 18px 18px;
        box-shadow: 0 10px 20px rgba(13, 37, 64, 0.20);
      }
      .tbb-home-device-screen {
        background: #FAF8F5;
        border-radius: 24px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .tbb-home-device-chassis.is-desktop .tbb-home-device-screen {
        border-radius: 14px;
      }
      .tbb-home-device-live-iframe {
        width: 100%;
        height: 540px;
        border: none;
        background: #FFFFFF;
      }
      .tbb-home-mock-app-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: #F8FAFC;
        border-bottom: 1px solid #E2E8F0;
      }
      .tbb-home-mock-brand {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.76rem;
        font-weight: 900;
        color: #0D2540;
      }
      .tbb-home-mock-brand img { height: 22px; width: auto; }
      .tbb-home-mock-status {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        font-weight: 800;
        color: #FF7A00;
        background: #FFF7ED;
        padding: 3px 8px;
        border-radius: 999px;
      }
      .tbb-home-mock-body {
        flex: 1;
        padding: 14px;
        display: grid;
        gap: 12px;
      }
      .tbb-home-mock-body.layout-mobile {
        grid-template-columns: 1fr;
      }
      .tbb-home-mock-body.layout-tablet {
        grid-template-columns: 1.05fr 1fr;
      }
      .tbb-home-mock-body.layout-desktop {
        grid-template-columns: 170px 1fr 220px;
      }
      .tbb-home-mock-sidebar {
        background: #F4F8FC;
        border: 1px solid #DCE6F2;
        border-radius: 14px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .tbb-mock-step {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        color: #475569;
        padding: 7px 10px;
        border-radius: 10px;
      }
      .tbb-mock-step.active {
        background: #0D2540;
        color: #FFFFFF;
      }
      .tbb-home-mock-shot-panel {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid #CBD5E1;
        background: #F8FAFC;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tbb-home-mock-shot-img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        object-position: top center;
        display: block;
      }
      .tbb-home-mock-overlay-pill {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background: rgba(13, 37, 64, 0.90);
        color: #FFFFFF;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 999px;
      }
      .tbb-home-mock-aura-panel {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 14px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
      }
      .tbb-mock-aura-bubble {
        font-size: 0.80rem;
        color: #0D2540;
        line-height: 1.45;
        background: #FFFFFF;
        padding: 10px;
        border-radius: 12px;
        border: 1px solid #DCE6F2;
      }
      .tbb-mock-aura-bubble strong {
        display: block;
        color: #FF7A00;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.74rem;
        margin-bottom: 4px;
      }
      .tbb-mock-swatches {
        display: flex;
        gap: 6px;
      }
      .tbb-mock-swatches span {
        flex: 1;
        height: 22px;
        border-radius: 6px;
      }
      .tbb-home-mock-footer-cta {
        padding: 10px 14px;
        background: #F4F8FC;
        border-top: 1px solid #DCE6F2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .tbb-home-mock-footer-cta span {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        font-weight: 800;
        color: #0D2540;
      }
      .tbb-home-mock-footer-cta button {
        border: none;
        background: #FF7A00;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.74rem;
        font-weight: 800;
        padding: 6px 14px;
        border-radius: 999px;
        cursor: pointer;
      }

      .tbb-btn-primary-vibrant {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 24px;
        border-radius: 999px;
        border: none;
        background: linear-gradient(135deg, #0D2540 0%, #426EAE 100%);
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.94rem;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 14px 32px rgba(13, 37, 64, 0.22);
        transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-btn-primary-vibrant:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #FF7A00 0%, #EA580C 100%);
        box-shadow: 0 18px 36px rgba(255, 122, 0, 0.32);
      }
      .tbb-btn-secondary-clean {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        padding: 13px 20px;
        border-radius: 999px;
        border: 1.5px solid #CBD5E1;
        background: #FFFFFF;
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.90rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-btn-secondary-clean:hover {
        border-color: #426EAE;
        background: #F4F8FC;
        transform: translateY(-2px);
      }

      /* SECCIÓN PROTAGONISTA DE LOS 5 PILARES CIENTÍFICOS A TODO EL ANCHO DE LA PANTALLA (ANIMACIÓN 60FPS EN VIVO) */
      .tbb-hero-convergence-fullwidth {
        width: 100%;
      }
      .tbb-hero-interactive-stage.tbb-fullwidth-stage {
        width: 100%;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 2px solid #DCE6F2;
        border-radius: 32px;
        padding: 28px 32px;
        box-shadow: 0 24px 60px rgba(13, 37, 64, 0.08);
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .tbb-stage-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }
      .tbb-stage-title {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.35rem, 2.2vw, 1.85rem);
        font-weight: 900;
        color: #0D2540;
        margin: 0 0 6px;
      }
      .tbb-stage-sub {
        font-size: 1.02rem;
        color: #475569;
        margin: 0;
        line-height: 1.5;
        max-width: 780px;
      }
      .tbb-btn-converge-trigger {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 22px;
        border-radius: 999px;
        border: 2px solid #FF7A00;
        background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%);
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.86rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.24s ease;
        box-shadow: 0 8px 20px rgba(255, 122, 0, 0.16);
      }
      .tbb-btn-converge-trigger:hover,
      .tbb-hero-interactive-stage.is-converged .tbb-btn-converge-trigger {
        background: linear-gradient(135deg, #FF7A00 0%, #EA580C 100%);
        color: #FFFFFF;
        box-shadow: 0 12px 28px rgba(255, 122, 0, 0.34);
      }
      .tbb-convergence-orbital-box.tbb-orbital-fullwidth {
        position: relative;
        background: linear-gradient(180deg, #0D2540 0%, #133155 100%);
        border-radius: 26px;
        border: 2px solid #1E3A5F;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 18px 20px 20px;
        gap: 16px;
        overflow: hidden;
        box-shadow: inset 0 0 60px rgba(76, 157, 230, 0.14), 0 18px 40px rgba(13, 37, 64, 0.18);
      }
      .tbb-five-pillars-canvas-wrap {
        position: relative;
        width: 100%;
        height: 290px;
        border-radius: 18px;
        overflow: hidden;
      }
      .tbb-five-pillars-live-canvas {
        width: 100%;
        height: 100%;
        display: block;
        cursor: pointer;
      }
      .tbb-hero-theory-pills-wrap.tbb-five-pillars-fullgrid {
        position: relative;
        z-index: 3;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
      }
      .tbb-hero-theory-pill {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        padding: 14px 16px;
        border-radius: 18px;
        border: 2px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.96);
        cursor: pointer;
        text-align: left;
        transition: all 0.25s ease;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      .tbb-hero-theory-pill.active, .tbb-hero-theory-pill:hover {
        border-color: #FF7A00;
        background: #FFF7ED;
        transform: translateY(-4px);
        box-shadow: 0 14px 28px rgba(255, 122, 0, 0.28);
      }
      .tbb-pill-code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 800; }
      .tbb-pill-author { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 900; color: #0D2540; }
      .tbb-pill-sub { font-size: 0.80rem; color: #475569; line-height: 1.35; }
      .tbb-hero-theory-detail-box.tbb-fullwidth-pillar-detail {
        background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%);
        border: 1.5px solid #DCE6F2;
        border-left: 6px solid #FF7A00;
        border-radius: 22px;
        padding: 22px 26px;
      }
      .tbb-hero-pillar-detail-grid {
        display: grid;
        grid-template-columns: 1.35fr 1fr;
        gap: 28px;
        align-items: center;
      }
      .tbb-hero-pillar-diagram-preview {
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 18px;
        padding: 14px;
        box-shadow: 0 10px 24px rgba(13, 37, 64, 0.06);
      }

      /* CABECERAS DE SECCIÓN CON TIPOGRAFÍA GRANDE Y RESPONSIVA */
      .tbb-section-header-large {
        text-align: center;
        max-width: 960px;
        margin: 0 auto 38px;
      }
      .tbb-section-title-xl {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(2.0rem, 3.8vw, 3.15rem);
        font-weight: 900;
        color: #0D2540;
        line-height: 1.14;
        margin: 14px 0 16px;
      }
      .tbb-section-lead-xl {
        font-size: clamp(1.12rem, 1.35vw, 1.28rem);
        color: #334155;
        line-height: 1.65;
        margin: 0;
      }
      .tbb-section-title-lg {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.6rem, 2.8vw, 2.35rem);
        font-weight: 900;
        color: #0D2540;
        margin: 0 0 10px;
      }
      .tbb-section-lead-md {
        font-size: clamp(1.05rem, 1.2vw, 1.18rem);
        color: #475569;
        line-height: 1.6;
        margin: 0;
      }

      /* SECCIÓN 2: APP TOUR COMPACTADO Y AJUSTADO 100% A LA PANTALLA (MAPA BASE + CAPA SUPERIOR INTERACTIVA AL HACER SCROLL) */
      .tbb-apptour-section .tbb-section-header-large {
        max-width: 920px;
        margin: 0 auto 18px;
      }
      .tbb-apptour-section .tbb-section-title-xl {
        font-size: clamp(1.38rem, 2.2vw, 1.92rem);
        margin: 8px 0 6px;
        line-height: 1.18;
      }
      .tbb-apptour-section .tbb-section-lead-xl {
        font-size: clamp(0.88rem, 1.05vw, 0.98rem);
        line-height: 1.48;
        margin: 0 auto 10px;
        max-width: 780px;
      }
      .tbb-apptour-section .tbb-multidevice-showcase-bar {
        padding: 7px 14px;
        margin-top: 8px;
        gap: 10px;
      }
      .tbb-multidevice-badge-txt {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.78rem;
        font-weight: 800;
        color: #0D2540;
      }
      .tbb-multidevice-pills-group {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }

      .tbb-scrollytelling-layout {
        display: grid;
        grid-template-columns: 344px minmax(0, 1fr);
        gap: 22px;
        align-items: start;
        max-width: 1200px;
        margin: 0 auto;
      }
      .tbb-sticky-iphone-column {
        position: sticky;
        top: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
      }
      .tbb-iphone-mode-switcher {
        display: flex;
        gap: 4px;
        background: #F4F8FC;
        padding: 4px;
        border-radius: 999px;
        border: 1px solid #DCE6F2;
      }
      .tbb-mode-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 11px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.70rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-mode-pill.active {
        background: #0D2540;
        color: #FFFFFF;
      }

      /* CHASIS ADAPTATIVO MULTIDISPOSITIVO AJUSTADO AL ALTO DE LA PANTALLA (calc(100vh - 155px)) */
      .tbb-iphone16-chassis {
        width: 324px;
        height: min(555px, calc(100vh - 155px));
        min-height: 440px;
        max-width: 92vw;
        background: #0D2540;
        border-radius: 36px;
        padding: 9px;
        box-sizing: border-box;
        box-shadow: 0 20px 48px rgba(13, 37, 64, 0.22), inset 0 0 0 2.5px #426EAE;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: width 0.3s ease, border-radius 0.3s ease;
      }
      .tbb-iphone16-chassis[data-device-form="tablet"] {
        width: 344px;
        border-radius: 26px;
      }
      .tbb-iphone16-chassis[data-device-form="desktop"] {
        width: 348px;
        border-radius: 18px;
        padding: 8px;
      }
      .tbb-iphone16-dynamic-island {
        width: 92px;
        height: 16px;
        background: #050B14;
        border-radius: 999px;
        margin: 2px auto 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        flex-shrink: 0;
      }
      .tbb-iphone16-chassis[data-device-form="desktop"] .tbb-iphone16-dynamic-island {
        width: 100%;
        height: 14px;
        background: #1E293B;
        margin: 0 0 5px;
        box-sizing: border-box;
      }
      .tbb-island-cam { width: 7px; height: 7px; border-radius: 50%; background: #1E293B; border: 1.5px solid #426EAE; }
      .tbb-island-speaker { width: 28px; height: 3px; border-radius: 99px; background: #1E293B; }
      .tbb-iphone16-screen-inner {
        flex: 1;
        min-height: 0;
        background: #F4F7FB;
        border-radius: 26px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .tbb-iphone16-chassis[data-device-form="desktop"] .tbb-iphone16-screen-inner {
        border-radius: 12px;
      }

      /* CAPA BASE: MAPA DE RECORRIDO COMPLETO DE LA APLICACIÓN */
      .tbb-app-base-map-scroll-layer {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 8px 8px 10px;
        background: #F4F7FB;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .tbb-base-map-top-card {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 8px 10px;
        border: 1px solid #E2E8F0;
        box-shadow: 0 4px 10px rgba(13, 37, 64, 0.04);
        flex-shrink: 0;
      }
      .tbb-base-map-top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
      }
      .tbb-base-map-heading {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.74rem;
        font-weight: 900;
        color: #0D2540;
        line-height: 1.15;
      }
      .tbb-base-map-subheading {
        font-size: 0.58rem;
        color: #64748B;
        line-height: 1.2;
      }
      .tbb-base-map-continue-btn {
        background: #FFF7ED;
        color: #EA580C;
        border: 1px solid #FED7AA;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.56rem;
        font-weight: 800;
        padding: 3px 7px;
        border-radius: 999px;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .tbb-base-map-progress-track {
        height: 5px;
        background: #E2E8F0;
        border-radius: 999px;
        overflow: hidden;
        margin-top: 6px;
      }
      .tbb-base-map-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #426EAE 0%, #FF7A00 100%);
        border-radius: 999px;
        transition: width 0.35s ease;
      }
      .tbb-base-map-nodes-chain {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .tbb-base-map-step-card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 11px;
        padding: 6px 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tbb-base-map-step-card.is-active-map-step,
      .tbb-base-map-step-card.is-active {
        border: 2px solid #FF7A00;
        background: #FFFDF9;
        box-shadow: 0 6px 14px rgba(255, 122, 0, 0.14);
      }
      .tbb-base-map-step-card.is-completed-map-step,
      .tbb-base-map-step-card.is-done {
        border-color: #CBD5E1;
        background: #F8FAFC;
      }
      .tbb-base-map-card-main {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .tbb-base-map-dark-icon {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        background: #0D2540;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .tbb-base-map-dark-icon svg {
        width: 20px;
        height: 20px;
      }
      .tbb-base-map-dark-icon span {
        display: none;
      }
      .tbb-base-map-card-copy {
        flex: 1;
        min-width: 0;
        text-align: left;
      }
      .tbb-base-map-eyebrow {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.54rem;
        font-weight: 800;
        color: #FF7A00;
        line-height: 1.15;
      }
      .tbb-base-map-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.68rem;
        font-weight: 800;
        color: #0D2540;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tbb-base-map-desc {
        font-size: 0.58rem;
        color: #64748B;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tbb-base-map-card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 3px;
        border-top: 1px solid #F1F5F9;
      }
      .tbb-base-map-status-pill {
        font-size: 0.54rem;
        font-weight: 800;
        padding: 1px 6px;
        border-radius: 999px;
        background: #F1F5F9;
        color: #475569;
      }
      .tbb-base-map-open-btn {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.56rem;
        font-weight: 800;
        color: #0D2540;
        background: #F8FAFC;
        border: 1px solid #CBD5E1;
        border-radius: 999px;
        padding: 2px 7px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .tbb-base-map-step-card.is-active-map-step .tbb-base-map-open-btn,
      .tbb-base-map-step-card.is-active .tbb-base-map-open-btn {
        background: #FF7A00;
        color: #FFFFFF;
        border-color: #FF7A00;
      }
      .tbb-base-map-connector-line {
        width: 2px;
        height: 5px;
        background: #CBD5E1;
        margin-left: 22px;
      }

      /* CAPA SUPERIOR FLOTANTE SOBRE EL MAPA BASE DENTRO DEL DISPOSITIVO (COMPACTA Y PROPORCIONADA) */
      .tbb-upper-layer-floating-sheet {
        background: rgba(13, 37, 64, 0.97);
        color: #FFFFFF;
        padding: 7px 9px;
        border-top: 2px solid #FF7A00;
        flex-shrink: 0;
        max-height: 168px;
        overflow: hidden;
        box-shadow: 0 -8px 20px rgba(13, 37, 64, 0.22);
        transition: max-height 0.28s ease;
      }
      .tbb-upper-layer-floating-sheet.is-minimized {
        max-height: 30px;
      }
      .tbb-upper-layer-sheet-handle {
        cursor: pointer;
        margin-bottom: 4px;
      }
      .tbb-sheet-pill-indicator {
        display: block;
        width: 28px;
        height: 3px;
        background: rgba(255, 255, 255, 0.35);
        border-radius: 99px;
        margin: 0 auto 3px;
      }
      .tbb-upper-layer-sheet-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
      }
      .tbb-upper-layer-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.56rem;
        font-weight: 800;
        color: #FDE68A;
      }
      .tbb-upper-layer-toggle-btn {
        background: rgba(255, 255, 255, 0.14);
        color: #FFFFFF;
        border: none;
        border-radius: 999px;
        padding: 2px 7px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.54rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-upper-layer-sheet-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tbb-upper-layer-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.66rem;
        font-weight: 800;
        color: #FFFFFF;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
      }
      .tbb-upper-layer-interleaved-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        align-items: center;
      }
      .tbb-upper-layer-shot-thumb {
        width: 100%;
        height: 50px;
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid #FF7A00;
        background: #FFFFFF;
      }
      .tbb-upper-layer-shot-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
      }
      .tbb-upper-layer-mini-diagram {
        width: 100%;
        height: 50px;
        border-radius: 6px;
        overflow: hidden;
        background: #FFFFFF;
        padding: 2px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tbb-upper-layer-mini-diagram svg {
        width: 100% !important;
        height: 46px !important;
      }
      #tbbUpperLayerChecklist {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
        background: transparent;
        border: none;
      }
      #tbbUpperLayerChecklist li {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.55rem;
        font-weight: 600;
        color: #E2E8F0;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #tbbUpperLayerChecklist li svg {
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        color: #FF7A00;
      }

      /* BARRA INFERIOR DE LA APP EN EL MAPA BASE (Inicio | Mapa | Taller | Manual | Cuenta | Menú) */
      .tbb-base-map-bottom-dock {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        background: #FFFFFF;
        border-top: 1px solid #E2E8F0;
        padding: 4px 2px;
        text-align: center;
        flex-shrink: 0;
      }
      .tbb-app-dock-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.52rem;
        font-weight: 700;
        color: #64748B;
      }
      .tbb-app-dock-item svg {
        width: 13px;
        height: 13px;
      }
      .tbb-app-dock-item.active {
        color: #FF7A00;
        font-weight: 900;
      }

      .tbb-iphone-live-iframe {
        width: 100%;
        height: 100%;
        border: none;
        background: #FFFFFF;
      }
      .tbb-iphone16-home-bar {
        width: 96px;
        height: 4px;
        background: rgba(255, 255, 255, 0.45);
        border-radius: 999px;
        margin: 4px auto 1px;
        flex-shrink: 0;
      }
      .tbb-tour-step-dots-row {
        display: flex;
        gap: 5px;
        justify-content: center;
      }
      .tbb-tour-step-dot {
        width: 30px;
        height: 30px;
        border-radius: 999px;
        border: 1.5px solid #CBD5E1;
        background: #FFFFFF;
        color: #0D2540;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.70rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-tour-step-dot.active {
        background: #FF7A00;
        color: #FFFFFF;
        border-color: #FF7A00;
      }

      /* COLUMNA DERECHA DE SCROLLYTELLING: TARJETAS COMPACTAS Y PROPORCIONADAS AL VIEWPORT */
      .tbb-scrolly-cards-column {
        display: flex;
        flex-direction: column;
        gap: 18px;
        min-width: 0;
      }
      .tbb-tour-scrolly-card {
        background: #FFFFFF;
        border: 2px solid #E2E8F0;
        border-radius: 22px;
        padding: 18px 20px;
        box-shadow: 0 12px 30px rgba(13, 37, 64, 0.05);
        transition: all 0.25s ease;
        cursor: pointer;
        box-sizing: border-box;
      }
      .tbb-tour-scrolly-card.is-active-step {
        border-color: #FF7A00;
        box-shadow: 0 16px 38px rgba(255, 122, 0, 0.12);
      }
      .tbb-scrolly-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #F1F5F9;
      }
      .tbb-scrolly-step-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.70rem;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 999px;
        border: 1.5px solid #426EAE;
        background: #F8FAFC;
      }
      .tbb-scrolly-theory-tag {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        font-weight: 800;
        color: #FF7A00;
      }
      .tbb-scrolly-card-title {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.12rem, 1.55vw, 1.38rem);
        font-weight: 900;
        color: #0D2540;
        line-height: 1.22;
        margin: 0 0 6px;
      }
      .tbb-scrolly-card-body {
        font-size: 0.88rem;
        color: #334155;
        line-height: 1.5;
        margin: 0 0 12px;
      }
      .tbb-interleaved-step-grid {
        display: grid;
        grid-template-columns: 0.96fr 1.04fr;
        gap: 14px;
        align-items: stretch;
        margin-bottom: 12px;
      }
      .tbb-interleaved-step-grid.is-odd-layout .tbb-precision-cutout-frame {
        order: 2;
      }
      .tbb-interleaved-step-grid.is-odd-layout .tbb-interleaved-visual-and-text-col {
        order: 1;
      }
      .tbb-precision-cutout-frame {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        border: 1.5px solid #CBD5E1;
        background: #F8FAFC;
        height: 215px;
        box-shadow: 0 8px 20px rgba(13, 37, 64, 0.06);
      }
      .tbb-precision-cutout-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
      }
      .tbb-floating-callout-pill {
        position: absolute;
        bottom: 8px;
        left: 8px;
        right: 8px;
        background: rgba(13, 37, 64, 0.92);
        color: #FFFFFF;
        padding: 5px 10px;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.64rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .tbb-interleaved-visual-and-text-col {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        min-width: 0;
      }
      .tbb-step-visual-graphic-card {
        background: #F8FAFC;
        border: 1px solid #DCE6F2;
        border-radius: 12px;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .tbb-step-graphic-svg-wrap {
        width: 120px;
        height: 76px;
        flex-shrink: 0;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #E2E8F0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tbb-step-graphic-svg-wrap svg {
        width: 100% !important;
        height: 72px !important;
      }
      .tbb-step-graphic-caption {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        font-weight: 800;
        color: #0D2540;
        line-height: 1.35;
        text-align: left;
      }
      .tbb-floating-explanation-box {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-left: 3.5px solid #FF7A00;
        border-radius: 12px;
        padding: 9px 12px;
        text-align: left;
      }
      .tbb-review-list-heading {
        display: block;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.78rem;
        font-weight: 800;
        color: #0D2540;
        margin-bottom: 4px;
      }
      .tbb-scrolly-review-checklist {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .tbb-scrolly-review-checklist li {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 0.76rem;
        font-weight: 600;
        color: #1E293B;
        line-height: 1.35;
      }
      .tbb-scrolly-review-checklist li svg {
        width: 13px;
        height: 13px;
        flex-shrink: 0;
        margin-top: 2px;
        color: #FF7A00;
      }
      .tbb-floating-explanation-box p {
        font-size: 0.76rem;
        font-weight: 600;
        color: #475569;
        line-height: 1.38;
        margin: 5px 0 0;
      }

      /* CÁPSULA EMERGENTE MODERADA COMPACTA */
      .tbb-moderate-capsule-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 7px 12px;
        flex-wrap: wrap;
      }
      .tbb-capsule-mini-preview {
        position: relative;
        width: 38px;
        height: 50px;
        border-radius: 8px;
        overflow: hidden;
        flex-shrink: 0;
        border: 1.5px solid #FF7A00;
        cursor: pointer;
      }
      .tbb-capsule-mini-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
      }
      .tbb-capsule-play-badge {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(13, 37, 64, 0.25);
      }
      .tbb-capsule-bar-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        text-align: left;
      }
      .tbb-capsule-bar-info strong { font-size: 0.82rem; color: #0D2540; }
      .tbb-capsule-bar-info span { font-size: 0.74rem; color: #475569; }
      .tbb-btn-capsule-open {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        border-radius: 999px;
        border: 1.5px solid #0D2540;
        background: #0D2540;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.74rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-btn-capsule-open:hover { background: #FF7A00; border-color: #FF7A00; }

      /* ANTES / DESPUÉS SLIDER */
      .tbb-before-after-block {
        margin-top: 64px;
        background: #F4F8FC;
        border: 1.5px solid #DCE6F2;
        border-radius: 32px;
        padding: 40px 32px;
      }
      .tbb-before-after-header { text-align: center; max-width: 780px; margin: 0 auto 28px; }
      .tbb-before-after-stage {
        position: relative;
        max-width: 920px;
        height: 290px;
        margin: 0 auto;
        border-radius: 24px;
        overflow: hidden;
        border: 2px solid #0D2540;
        background: #FFFFFF;
      }
      .tbb-ba-layer {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
      .tbb-ba-after { background: #FFFFFF; }
      .tbb-ba-before { background: #F1F5F9; }
      .tbb-ba-card-content { text-align: center; max-width: 580px; }
      .tbb-ba-badge {
        display: inline-block;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.76rem;
        font-weight: 800;
        padding: 5px 12px;
        border-radius: 999px;
        margin-bottom: 14px;
      }
      .tbb-ba-badge.after { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
      .tbb-ba-badge.before { background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA; }
      .tbb-ba-sketch-placeholder {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.75rem;
        font-weight: 800;
        color: #64748B;
        border: 2px dashed #94A3B8;
        padding: 18px 32px;
        border-radius: 16px;
        margin-bottom: 10px;
      }
      .tbb-ba-handle {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 3px;
        background: #FF7A00;
        pointer-events: none;
      }
      .tbb-ba-handle-knob {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: #0D2540;
        color: #FFFFFF;
        border: 2.5px solid #FF7A00;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tbb-ba-range-input {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: ew-resize;
      }

      /* SECCIÓN 3: BASES TEÓRICAS (INFOGRAFÍA DINÁMICA Y RESPONSIVA · CERO VIDEOS DEL FUNDADOR) */
      .tbb-academic-infographic-timeline {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 56px;
      }
      .tbb-infographic-stage-node {
        display: grid;
        grid-template-columns: 68px 1fr;
        gap: 22px;
        align-items: stretch;
      }
      .tbb-infographic-spine-badge {
        width: 64px;
        height: 64px;
        border-radius: 20px;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.35rem;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 12px 28px rgba(13, 37, 64, 0.18);
      }
      .tbb-infographic-card {
        background: #FFFFFF;
        border: 2px solid #E2E8F0;
        border-radius: 28px;
        padding: 30px;
        box-shadow: 0 18px 44px rgba(13, 37, 64, 0.06);
      }
      .tbb-infographic-card-grid {
        display: grid;
        grid-template-columns: 1.35fr 1fr;
        gap: 28px;
        align-items: center;
      }
      .tbb-infographic-meta-row {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .tbb-infographic-code-pill {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.78rem;
        font-weight: 800;
        padding: 5px 12px;
        border-radius: 999px;
      }
      .tbb-infographic-authors-tag {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.92rem;
        font-weight: 800;
        color: #0D2540;
      }
      .tbb-infographic-stage-title {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.45rem, 2.2vw, 1.95rem);
        font-weight: 900;
        color: #0D2540;
        margin: 0 0 8px;
        line-height: 1.24;
      }
      .tbb-infographic-works-cite {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.80rem;
        color: #426EAE;
        font-weight: 700;
        margin-bottom: 14px;
      }
      .tbb-infographic-thesis {
        font-size: 1.08rem;
        color: #334155;
        line-height: 1.65;
        margin: 0 0 16px;
      }
      .tbb-infographic-pillars-list {
        list-style: none;
        padding: 0;
        margin: 0 0 18px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tbb-infographic-pillars-list li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 1.0rem;
        color: #0D2540;
        font-weight: 600;
        line-height: 1.5;
      }
      .tbb-infographic-output-bar {
        background: #F4F8FC;
        border: 1px solid #DCE6F2;
        border-left: 4px solid #FF7A00;
        border-radius: 12px;
        padding: 10px 14px;
        font-size: 0.92rem;
        color: #0D2540;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .tbb-infographic-diagram-frame {
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        border-radius: 22px;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* SIMULADOR INTERACTIVO KANSEI / OSGOOD */
      .tbb-kansei-simulator-card {
        background: linear-gradient(180deg, #FFFFFF 0%, #F4F8FC 100%);
        border: 2px solid #426EAE;
        border-radius: 30px;
        padding: 34px;
        margin-bottom: 56px;
        box-shadow: 0 22px 52px rgba(13, 37, 64, 0.08);
      }
      .tbb-kansei-sim-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 28px;
        align-items: center;
        margin-top: 24px;
      }
      .tbb-kansei-sliders-col {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .tbb-kansei-slider-row {
        background: #FFFFFF;
        border: 1px solid #CBD5E1;
        border-radius: 16px;
        padding: 14px 18px;
      }
      .tbb-kansei-slider-labels {
        display: flex;
        justify-content: space-between;
        font-size: 0.84rem;
        color: #475569;
        margin-bottom: 8px;
        gap: 8px;
        flex-wrap: wrap;
      }
      .tbb-kansei-slider-labels strong { color: #0D2540; }
      .tbb-kansei-slider-row input[type="range"] {
        width: 100%;
        accent-color: #FF7A00;
        cursor: pointer;
      }

      .tbb-books-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 18px;
      }
      .tbb-book-academic-card {
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        box-shadow: 0 10px 24px rgba(13, 37, 64, 0.05);
      }
      .tbb-book-spine {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        padding: 14px 8px;
        color: #FFFFFF;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        font-weight: 800;
        text-align: center;
      }
      .tbb-book-body { padding: 18px; }
      .tbb-book-year { font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; color: #FF7A00; font-weight: 800; }
      .tbb-book-title { font-family: 'Montserrat', sans-serif; font-size: 1.08rem; font-weight: 800; color: #0D2540; margin: 4px 0 6px; }
      .tbb-book-author { font-size: 0.92rem; color: #475569; margin: 0; }

      /* SECCIÓN 4: DEMO EN VIVO (MOCKUP INTERACTIVO DE IPHONE + FULLSCREEN + PAYWALL $49 USD) */
      .tbb-demo-control-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        background: #F4F8FC;
        border: 1.5px solid #DCE6F2;
        border-radius: 22px;
        padding: 12px 18px;
        margin-bottom: 26px;
        flex-wrap: wrap;
      }
      .tbb-demo-steps-strip {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .tbb-demo-step-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1.5px solid #CBD5E1;
        background: #FFFFFF;
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.80rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-demo-step-pill.active {
        background: #0D2540;
        color: #FFFFFF;
        border-color: #0D2540;
      }
      .tbb-free-tag {
        background: #ECFDF5;
        color: #065F46;
        padding: 2px 6px;
        border-radius: 99px;
        font-size: 0.65rem;
      }
      .tbb-pro-tag {
        background: #FFF7ED;
        color: #EA580C;
        padding: 2px 6px;
        border-radius: 99px;
        font-size: 0.65rem;
      }
      .tbb-demo-stage-wrap.is-iphone-mode {
        display: grid;
        grid-template-columns: 380px 1fr;
        gap: 32px;
        align-items: start;
      }
      .tbb-demo-stage-wrap.is-fullscreen-mode {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .tbb-demo-stage-wrap.is-fullscreen-mode .tbb-demo-side-guide {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
      }
      .tbb-demo-guide-card {
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 24px;
        padding: 22px;
        margin-bottom: 18px;
        box-shadow: 0 12px 30px rgba(13, 37, 64, 0.05);
      }
      .tbb-demo-guide-card.highlight {
        border-color: #FF7A00;
        background: linear-gradient(180deg, #FFFFFF 0%, #FFF7ED 100%);
      }
      .tbb-demo-guide-card h3 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.18rem;
        font-weight: 800;
        color: #0D2540;
        margin: 10px 0 8px;
      }
      .tbb-demo-guide-card p {
        font-size: 0.98rem;
        color: #334155;
        line-height: 1.58;
        margin: 0;
      }
      .tbb-demo-status-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 999px;
      }
      .tbb-demo-status-pill.free { background: #ECFDF5; color: #065F46; }
      .tbb-demo-status-pill.paywall { background: #FFF7ED; color: #EA580C; }

      .tbb-demo-iphone-center-stage {
        display: flex;
        justify-content: center;
      }
      .tbb-demo-stage-wrap.is-iphone-mode .tbb-demo-device-frame {
        width: 430px;
        height: 820px;
        max-width: 95vw;
        background: #0D2540;
        border-radius: 56px;
        padding: 14px;
        box-shadow: 0 32px 76px rgba(13, 37, 64, 0.28), inset 0 0 0 3px #426EAE;
        display: flex;
        flex-direction: column;
      }
      .tbb-demo-stage-wrap.is-fullscreen-mode .tbb-demo-device-frame {
        width: 100%;
        height: 84vh;
        background: #FFFFFF;
        border-radius: 24px;
        border: 2px solid #0D2540;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .tbb-demo-stage-wrap.is-fullscreen-mode .tbb-iphone16-dynamic-island,
      .tbb-demo-stage-wrap.is-fullscreen-mode .tbb-iphone16-home-bar {
        display: none;
      }
      .tbb-real-studio-iframe {
        flex: 1;
        width: 100%;
        border: none;
        border-radius: 38px;
        background: #FFFFFF;
      }
      .tbb-demo-stage-wrap.is-fullscreen-mode .tbb-real-studio-iframe {
        border-radius: 0;
      }

      /* SECCIÓN 5: PACK DE DESCARGAS CONSOLIDADO */
      .tbb-consolidated-brandbook-hero-card {
        display: grid;
        grid-template-columns: 1.25fr 1fr;
        gap: 32px;
        align-items: center;
        background: linear-gradient(135deg, #FFFFFF 0%, #F4F8FC 100%);
        border: 2.5px solid #0D2540;
        border-radius: 32px;
        padding: 36px;
        margin-bottom: 42px;
        box-shadow: 0 24px 60px rgba(13, 37, 64, 0.10);
      }
      .tbb-cb-standard-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #FFF7ED;
        color: #EA580C;
        border: 1px solid #FFEDD5;
        padding: 6px 14px;
        border-radius: 999px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.76rem;
        font-weight: 800;
        margin-bottom: 14px;
      }
      .tbb-cb-title {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.65rem, 2.6vw, 2.3rem);
        font-weight: 900;
        color: #0D2540;
        line-height: 1.2;
        margin: 0 0 14px;
      }
      .tbb-cb-desc {
        font-size: 1.08rem;
        color: #334155;
        line-height: 1.65;
        margin: 0 0 24px;
      }
      .tbb-cb-actions {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }
      .tbb-cb-right {
        position: relative;
        border-radius: 22px;
        overflow: hidden;
        border: 2px solid #CBD5E1;
        cursor: pointer;
      }
      .tbb-cb-preview-img {
        width: 100%;
        display: block;
        transition: transform 0.35s ease;
      }
      .tbb-cb-right:hover .tbb-cb-preview-img { transform: scale(1.03); }
      .tbb-cb-overlay-pill {
        position: absolute;
        bottom: 14px;
        right: 14px;
        background: rgba(13, 37, 64, 0.92);
        color: #FFFFFF;
        padding: 7px 14px;
        border-radius: 999px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.74rem;
        font-weight: 800;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .tbb-deliverables-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
        gap: 24px;
      }
      .tbb-deliverable-card {
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 24px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.25s ease;
        display: flex;
        flex-direction: column;
      }
      .tbb-deliverable-card:hover {
        transform: translateY(-4px);
        border-color: #426EAE;
        box-shadow: 0 18px 40px rgba(13, 37, 64, 0.10);
      }
      .tbb-deliv-thumb-wrap {
        position: relative;
        height: 175px;
        background: #F8FAFC;
        overflow: hidden;
      }
      .tbb-deliv-thumb-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .tbb-deliv-num-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        background: #0D2540;
        color: #FFFFFF;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.74rem;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 999px;
      }
      .tbb-deliv-fmt-badge {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: rgba(255, 255, 255, 0.95);
        color: #FF7A00;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.70rem;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid #FFEDD5;
      }
      .tbb-deliv-body {
        padding: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .tbb-deliv-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.12rem;
        font-weight: 800;
        color: #0D2540;
        margin: 0 0 8px;
      }
      .tbb-deliv-desc {
        font-size: 0.95rem;
        color: #475569;
        line-height: 1.55;
        margin: 0 0 14px;
        flex: 1;
      }
      .tbb-deliv-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.82rem;
        font-weight: 800;
        color: #426EAE;
      }

      /* MODALES Y DRAWER MÓVIL */
      .tbb-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 3000;
        background: rgba(13, 37, 64, 0.82);
        backdrop-filter: blur(14px);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
      }
      .tbb-modal-overlay.open { display: flex; }
      .tbb-video-modal-card, .tbb-lightbox-modal-card, .tbb-checkout-modal-card {
        background: #FFFFFF;
        border-radius: 28px;
        border: 1.5px solid #E2E8F0;
        max-width: 900px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        padding: 24px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
      }
      .tbb-checkout-modal-card { max-width: 640px; }
      .tbb-video-modal-head, .tbb-checkout-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 14px;
        border-bottom: 1px solid #E2E8F0;
        margin-bottom: 18px;
        flex-wrap: wrap;
      }
      .tbb-modal-close-ic {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid #CBD5E1;
        background: #F8FAFC;
        color: #0D2540;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .tbb-video-modal-body-grid {
        display: grid;
        grid-template-columns: 310px 1fr;
        gap: 24px;
        align-items: stretch;
      }
      .tbb-video-modal-player-box {
        background: #0D2540;
        border-radius: 20px;
        overflow: hidden;
      }
      .tbb-video-modal-player-box video {
        width: 100%;
        aspect-ratio: 9 / 16;
        display: block;
        object-fit: contain;
      }
      .tbb-video-modal-info-col {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .tbb-video-modal-info-col h3 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.45rem;
        font-weight: 900;
        color: #0D2540;
        margin: 0;
      }
      .tbb-video-modal-info-col p {
        font-size: 1.04rem;
        color: #334155;
        line-height: 1.6;
        margin: 0;
      }

      .tbb-checkout-form-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .tbb-checkout-label {
        display: block;
        font-size: 0.80rem;
        font-weight: 700;
        color: #0D2540;
        margin-bottom: 4px;
      }
      .tbb-checkout-input {
        width: 100%;
        height: 44px;
        padding: 0 14px;
        border-radius: 12px;
        border: 1.5px solid #CBD5E1;
        font-size: 0.94rem;
        color: #0D2540;
        box-sizing: border-box;
      }
      .tbb-checkout-input.mono { font-family: 'JetBrains Mono', monospace; }

      /* DRAWER MÓVIL Y BARRA INFERIOR */
      .tbb-mobile-drawer-overlay {
        position: fixed;
        inset: 0;
        z-index: 2500;
        background: rgba(13, 37, 64, 0.65);
        backdrop-filter: blur(8px);
        display: none;
        justify-content: flex-end;
      }
      .tbb-mobile-drawer-overlay.open { display: flex; }
      .tbb-mobile-drawer-panel {
        width: min(360px, 88vw);
        height: 100%;
        background: #FFFFFF;
        padding: 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
      }
      .tbb-mobile-drawer-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 16px;
        border-bottom: 1px solid #E2E8F0;
      }
      .tbb-mobile-drawer-logo {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .tbb-drawer-wordmark { height: 48px; width: auto; max-width: 240px; object-fit: contain; }
      .tbb-drawer-close-btn {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        border: 1px solid #CBD5E1;
        background: #F8FAFC;
        cursor: pointer;
      }
      .tbb-mobile-drawer-nav-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 18px 0;
      }
      .tbb-mobile-drawer-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1.5px solid #E2E8F0;
        background: #F8FAFC;
        color: #0D2540;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-mobile-drawer-item.active {
        background: #0D2540;
        color: #FFFFFF;
        border-color: #0D2540;
      }
      .tbb-drawer-lbl { flex: 1; text-align: left; margin-left: 12px; }
      .tbb-mobile-drawer-lang-box {
        background: #F4F8FC;
        border-radius: 16px;
        padding: 14px;
        border: 1px solid #DCE6F2;
      }
      .tbb-drawer-lang-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        font-weight: 800;
        color: #0D2540;
        margin-bottom: 10px;
      }
      .tbb-drawer-lang-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 6px;
      }
      .tbb-drawer-lang-btn {
        padding: 8px 0;
        border-radius: 10px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.76rem;
        font-weight: 800;
        cursor: pointer;
      }
      .tbb-drawer-lang-btn.active {
        background: #FF7A00;
        color: #FFFFFF;
        border-color: #FF7A00;
      }

      .tbb-mobile-bottom-dock {
        display: none;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1250;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(16px);
        border-top: 1.5px solid #E2E8F0;
        padding: 6px 8px calc(6px + env(safe-area-inset-bottom, 0px));
        justify-content: space-around;
      }
      .tbb-mobile-dock-btn {
        border: none;
        background: transparent;
        color: #475569;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.66rem;
        font-weight: 800;
        padding: 6px 8px;
        border-radius: 12px;
        cursor: pointer;
      }
      .tbb-mobile-dock-btn.active {
        color: #0D2540;
        background: #F4F8FC;
      }

      /* SCROLL-DRIVEN REVEALS */
      .tbb-reveal-on-scroll {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .tbb-reveal-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* RESPONSIVE BREAKPOINTS (EL MENÚ DEL 1 AL 5 SIEMPRE PREVALECE AL HACER MÁS PEQUEÑA LA VENTANA) */
      @media (max-width: 1180px) {
        .tbb-subpage-dynamic-viewport {
          padding-top: 134px;
        }
        .tbb-header-inner {
          justify-content: center;
          padding: 10px 14px;
          gap: 10px;
        }
        .tbb-desktop-nav {
          display: flex !important;
          order: 2;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
          border-radius: 20px;
          padding: 6px;
        }
        .tbb-brand-logo-link { order: 1; }
        .tbb-header-actions { order: 1; margin-left: auto; }
        .tbb-master-header:not(.is-logo-docked) .tbb-header-actions {
          margin-left: 0;
        }
        .tbb-nav-tab-btn {
          padding: 7px 12px;
          font-size: 0.78rem;
        }
        .tbb-hero-theory-pills-wrap.tbb-five-pillars-fullgrid {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        .tbb-hero-pillar-detail-grid,
        .tbb-home-device-mockup-layout,
        .tbb-infographic-card-grid,
        .tbb-kansei-sim-grid,
        .tbb-demo-stage-wrap.is-iphone-mode,
        .tbb-consolidated-brandbook-hero-card {
          grid-template-columns: 1fr;
        }
        .tbb-home-mock-body.layout-tablet,
        .tbb-home-mock-body.layout-desktop {
          grid-template-columns: 1fr;
        }
        .tbb-video-modal-body-grid {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 920px) {
        .tbb-scrollytelling-layout,
        .tbb-interleaved-step-grid {
          grid-template-columns: 1fr;
        }
        .tbb-interleaved-step-grid.is-odd-layout .tbb-precision-cutout-frame,
        .tbb-interleaved-step-grid.is-odd-layout .tbb-interleaved-visual-and-text-col {
          order: unset;
        }
        .tbb-sticky-iphone-column {
          position: relative;
          top: 0;
          margin-bottom: 18px;
        }
      }
      @media (max-width: 680px) {
        .tbb-header-wordmark-svg { height: 38px; max-width: 185px; }
        .tbb-nav-tab-btn { padding: 6px 10px; font-size: 0.74rem; gap: 4px; }
        .tbb-header-buy-btn { height: 36px; padding: 0 12px; font-size: 0.74rem; }
        .tbb-lang-select-wrap { height: 36px; padding: 0 8px 0 10px; }
        .tbb-lang-select-dropdown { font-size: 0.73rem; }
        .tbb-five-pillars-canvas-wrap { height: 240px; }
        .tbb-hero-interactive-stage.tbb-fullwidth-stage { padding: 18px 16px; }
        .tbb-infographic-stage-node { grid-template-columns: 1fr; }
        .tbb-infographic-spine-badge { width: 48px; height: 48px; font-size: 1.05rem; }
      }
    `;
    document.head.appendChild(st);
  }

  // Motor de Animaciones Basadas en Scroll + Partículas 60fps + Animación Interactiva de los 5 Pilares Científicos
  window.tbbInitAwwwardsInteractions = function () {
    // 0. Sincronizar estado del logo entre la Portada de 1. Inicio y el Encabezado al hacer scroll
    if (typeof window.tbbUpdateHeaderLogoDockState === "function") {
      window.tbbUpdateHeaderLogoDockState();
      if (!window.__tbbHeaderLogoScrollBound) {
        window.__tbbHeaderLogoScrollBound = true;
        window.addEventListener("scroll", () => {
          window.tbbUpdateHeaderLogoDockState();
        }, { passive: true });
      }
    }

    // 1. Scroll-driven reveals
    const revealEls = document.querySelectorAll(".tbb-reveal-on-scroll");
    if ("IntersectionObserver" in window) {
      const revObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach((el) => revObs.observe(el));

      // 2. Scrollytelling iPhone Synchronization in App Tour
      const tourCards = document.querySelectorAll(".tbb-tour-scrolly-card[data-tour-step]");
      if (tourCards.length > 0) {
        const tourObs = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              const sIdx = Number(en.target.getAttribute("data-tour-step"));
              if (!isNaN(sIdx)) {
                window.tbbSetTourActiveStep(sIdx);
              }
            }
          });
        }, { rootMargin: "-25% 0px -45% 0px", threshold: 0.15 });
        tourCards.forEach((c) => tourObs.observe(c));
      }
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    // 3. Inicializar Simulador Kansei si está presente en Bases Teóricas
    if (document.getElementById("tbbKanseiLiveVectorPreview")) {
      window.tbbUpdateKanseiInfographicSimulator();
    }

    // 4. Canvas de Nodos Conectados a 60fps en Hero (Estilo ImproBears)
    const canvas = document.getElementById("tbbHeroDynamicCanvas");
    if (canvas && !canvas.dataset.bound60fps) {
      canvas.dataset.bound60fps = "1";
      const ctx = canvas.getContext("2d");
      let w = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
      let h = (canvas.height = canvas.parentElement.offsetHeight || 720);
      const nodes = Array.from({ length: 24 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: i % 4 === 0 ? 3.5 : 2.2,
        accent: i % 5 === 0
      }));
      function tick() {
        if (!document.body.contains(canvas)) return;
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 165) {
              ctx.strokeStyle = `rgba(66, 110, 174, ${(1 - dist / 165) * 0.16})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
          ctx.fillStyle = a.accent ? "rgba(255, 122, 0, 0.55)" : "rgba(13, 37, 64, 0.25)";
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.fill();
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    // 5. Motor de Animación Interactiva 60fps de los 5 Pilares Científicos -> Núcleo Aura (#tbbFivePillarsConvergenceCanvas)
    const pillarsCanvas = document.getElementById("tbbFivePillarsConvergenceCanvas");
    if (pillarsCanvas && !pillarsCanvas.dataset.boundPillars60fps) {
      pillarsCanvas.dataset.boundPillars60fps = "1";
      const pCtx = pillarsCanvas.getContext("2d");
      const pillarMeta = [
        { code: "01", title: "CÍRCULO DORADO", sub: "Simon Sinek · WHY→HOW→WHAT", color: "#FF7A00", rx: 0.12, ry: 0.30 },
        { code: "02", title: "TOUCHPOINTS", sub: "Jan Carlzon · Momentos de Verdad", color: "#4C9DE6", rx: 0.27, ry: 0.76 },
        { code: "03", title: "MODELO SMILE", sub: "Watkins · Naming & OMPI Niza", color: "#38BDF8", rx: 0.50, ry: 0.18 },
        { code: "04", title: "DIFERENCIAL OSGOOD", sub: "Osgood & Nagamachi · 7 Ejes", color: "#A7F3D0", rx: 0.73, ry: 0.76 },
        { code: "05", title: "INGENIERÍA KAIZEN", sub: "Masaaki Imai & Paul Rand", color: "#FF7A00", rx: 0.88, ry: 0.30 }
      ];

      // Flujo continuo de fotones/partículas desde cada uno de los 5 pilares hacia el núcleo central
      const streamParticles = Array.from({ length: 45 }, (_, idx) => ({
        pillarIdx: idx % 5,
        t: (idx / 45) % 1,
        speed: 0.0045 + (idx % 7) * 0.0009,
        size: 2.2 + (idx % 3) * 1.1
      }));

      function getCanvasMetrics() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = pillarsCanvas.getBoundingClientRect();
        const cw = Math.max(320, rect.width || 960);
        const ch = Math.max(220, rect.height || 290);
        if (pillarsCanvas.width !== Math.round(cw * dpr) || pillarsCanvas.height !== Math.round(ch * dpr)) {
          pillarsCanvas.width = Math.round(cw * dpr);
          pillarsCanvas.height = Math.round(ch * dpr);
        }
        return { dpr, cw, ch };
      }

      pillarsCanvas.addEventListener("click", (ev) => {
        const rect = pillarsCanvas.getBoundingClientRect();
        const mx = ev.clientX - rect.left;
        const my = ev.clientY - rect.top;
        const cw = rect.width || 960;
        const ch = rect.height || 290;
        const coreX = cw * 0.5;
        const coreY = ch * 0.54;
        if (Math.hypot(mx - coreX, my - coreY) < 58) {
          window.tbbTriggerHeroConvergence();
          return;
        }
        for (let i = 0; i < pillarMeta.length; i++) {
          const px = cw * pillarMeta[i].rx;
          const py = ch * pillarMeta[i].ry;
          if (Math.hypot(mx - px, my - py) < 54) {
            window.tbbSelectHeroTheoryNode(i);
            return;
          }
        }
      });

      let startTs = performance.now();
      function renderPillarsFrame(now) {
        if (!document.body.contains(pillarsCanvas)) return;
        const { dpr, cw, ch } = getCanvasMetrics();
        pCtx.save();
        pCtx.scale(dpr, dpr);
        pCtx.clearRect(0, 0, cw, ch);

        const elapsed = (now - startTs) * 0.001;
        const st = window.tbbCommercialDemoState || {};
        const selectedIdx = Number(st.heroSelectedTheoryIdx) || 0;
        const isConverged = Boolean(st.heroConvergenceActive);
        const burstAge = st.heroConvergenceBurstTs ? (now - st.heroConvergenceBurstTs) * 0.001 : 999;

        const coreX = cw * 0.5;
        const coreY = ch * 0.54;

        // 1. Fondo de rejilla científica sutil y halo radial central
        pCtx.strokeStyle = "rgba(76, 157, 230, 0.08)";
        pCtx.lineWidth = 1;
        const gridStep = 36;
        for (let gx = 0; gx < cw; gx += gridStep) {
          pCtx.beginPath();
          pCtx.moveTo(gx, 0);
          pCtx.lineTo(gx, ch);
          pCtx.stroke();
        }
        for (let gy = 0; gy < ch; gy += gridStep) {
          pCtx.beginPath();
          pCtx.moveTo(0, gy);
          pCtx.lineTo(cw, gy);
          pCtx.stroke();
        }

        const coreGlow = pCtx.createRadialGradient(coreX, coreY, 8, coreX, coreY, isConverged ? 175 : 135);
        coreGlow.addColorStop(0, isConverged ? "rgba(255, 122, 0, 0.42)" : "rgba(76, 157, 230, 0.28)");
        coreGlow.addColorStop(0.55, "rgba(66, 110, 174, 0.12)");
        coreGlow.addColorStop(1, "rgba(13, 37, 64, 0)");
        pCtx.fillStyle = coreGlow;
        pCtx.beginPath();
        pCtx.arc(coreX, coreY, isConverged ? 175 : 135, 0, Math.PI * 2);
        pCtx.fill();

        // 2. Anillos orbitales concéntricos giratorios (Círculo Dorado + Radar Kansei)
        pCtx.save();
        pCtx.translate(coreX, coreY);
        pCtx.rotate(elapsed * (isConverged ? 0.55 : 0.22));
        pCtx.strokeStyle = isConverged ? "rgba(255, 122, 0, 0.45)" : "rgba(76, 157, 230, 0.28)";
        pCtx.lineWidth = 1.5;
        pCtx.setLineDash([8, 6]);
        pCtx.beginPath();
        pCtx.arc(0, 0, 74, 0, Math.PI * 2);
        pCtx.stroke();

        pCtx.rotate(-elapsed * 0.4);
        pCtx.strokeStyle = "rgba(255, 255, 255, 0.16)";
        pCtx.setLineDash([4, 8]);
        pCtx.beginPath();
        pCtx.arc(0, 0, 104, 0, Math.PI * 2);
        pCtx.stroke();
        pCtx.restore();

        // Onda expansiva cuando se activa fusión o se selecciona un pilar
        if (burstAge < 1.35) {
          const waveR = 38 + burstAge * 165;
          const waveAlpha = Math.max(0, 1 - burstAge / 1.35);
          pCtx.strokeStyle = `rgba(255, 122, 0, ${waveAlpha * 0.75})`;
          pCtx.lineWidth = 3;
          pCtx.beginPath();
          pCtx.arc(coreX, coreY, waveR, 0, Math.PI * 2);
          pCtx.stroke();
        }

        // Helper para punto en curva Bézier cuadrática entre cada Pilar y el Núcleo Aura
        function getQuadPoint(p0x, p0y, cpx, cpy, p1x, p1y, tVal) {
          const inv = 1 - tVal;
          return {
            x: inv * inv * p0x + 2 * inv * tVal * cpx + tVal * tVal * p1x,
            y: inv * inv * p0y + 2 * inv * tVal * cpy + tVal * tVal * p1y
          };
        }

        // 3. Haces Bézier desde los 5 Pilares Científicos hacia el Núcleo Central
        pillarMeta.forEach((p, idx) => {
          const px = cw * p.rx;
          const py = ch * p.ry;
          const cpx = (px + coreX) * 0.5;
          const cpy = Math.min(py, coreY) - 34;
          const isSelected = idx === selectedIdx;

          pCtx.save();
          pCtx.beginPath();
          pCtx.moveTo(px, py);
          pCtx.quadraticCurveTo(cpx, cpy, coreX, coreY);
          pCtx.strokeStyle = isSelected || isConverged ? p.color : "rgba(148, 163, 184, 0.35)";
          pCtx.lineWidth = isSelected || isConverged ? 3.2 : 1.8;
          pCtx.setLineDash([10, 6]);
          pCtx.lineDashOffset = -elapsed * (isSelected || isConverged ? 48 : 24);
          pCtx.stroke();
          pCtx.restore();
        });

        // 4. Partículas de energía fluyendo a 60fps sobre las curvas Bézier hacia el Núcleo
        streamParticles.forEach((pt) => {
          const p = pillarMeta[pt.pillarIdx];
          const isSelected = pt.pillarIdx === selectedIdx;
          pt.t += pt.speed * (isConverged ? 2.1 : isSelected ? 1.55 : 1);
          if (pt.t >= 1) pt.t -= 1;

          const px = cw * p.rx;
          const py = ch * p.ry;
          const cpx = (px + coreX) * 0.5;
          const cpy = Math.min(py, coreY) - 34;
          const pos = getQuadPoint(px, py, cpx, cpy, coreX, coreY, pt.t);

          pCtx.beginPath();
          pCtx.fillStyle = isSelected || isConverged ? "#FF7A00" : "#4C9DE6";
          pCtx.shadowColor = isSelected || isConverged ? "#FF7A00" : "#4C9DE6";
          pCtx.shadowBlur = isSelected || isConverged ? 12 : 6;
          pCtx.arc(pos.x, pos.y, isSelected ? pt.size + 1 : pt.size, 0, Math.PI * 2);
          pCtx.fill();
          pCtx.shadowBlur = 0;
        });

        // 5. Dibujar los 5 Nodos Orbitales con sus etiquetas legibles
        pillarMeta.forEach((p, idx) => {
          const px = cw * p.rx;
          const py = ch * p.ry;
          const isSelected = idx === selectedIdx;
          const pulseR = (isSelected || isConverged ? 24 : 19) + Math.sin(elapsed * 3.2 + idx) * 2.5;

          // Halo exterior del nodo
          pCtx.beginPath();
          pCtx.fillStyle = isSelected || isConverged ? "rgba(255, 122, 0, 0.26)" : "rgba(76, 157, 230, 0.16)";
          pCtx.arc(px, py, pulseR + 7, 0, Math.PI * 2);
          pCtx.fill();

          // Círculo principal del pilar
          pCtx.beginPath();
          pCtx.fillStyle = isSelected ? "#FF7A00" : "#0D2540";
          pCtx.strokeStyle = isSelected ? "#FFFFFF" : p.color;
          pCtx.lineWidth = isSelected ? 3 : 2.2;
          pCtx.arc(px, py, pulseR, 0, Math.PI * 2);
          pCtx.fill();
          pCtx.stroke();

          // Número del pilar dentro del nodo
          pCtx.fillStyle = "#FFFFFF";
          pCtx.font = "900 12px 'JetBrains Mono', monospace";
          pCtx.textAlign = "center";
          pCtx.textBaseline = "middle";
          pCtx.fillText(p.code, px, py);

          // Etiqueta flotante del pilar (en pantallas medianas/grandes)
          if (cw >= 560) {
            const lblY = py < coreY ? py - pulseR - 14 : py + pulseR + 16;
            pCtx.font = "800 11px 'Montserrat', sans-serif";
            pCtx.fillStyle = isSelected ? "#FFEDD5" : "#E2E8F0";
            pCtx.fillText(p.title, px, lblY);
          }
        });

        // 6. Dibujar el Núcleo Central de Síntesis Científica · Aura
        const corePulse = (isConverged ? 46 : 40) + Math.sin(elapsed * 4) * 3;
        const gradCore = pCtx.createLinearGradient(coreX - corePulse, coreY - corePulse, coreX + corePulse, coreY + corePulse);
        if (isConverged) {
          gradCore.addColorStop(0, "#FF7A00");
          gradCore.addColorStop(1, "#EA580C");
        } else {
          gradCore.addColorStop(0, "#0D2540");
          gradCore.addColorStop(1, "#426EAE");
        }
        pCtx.beginPath();
        pCtx.fillStyle = gradCore;
        pCtx.strokeStyle = "#FF7A00";
        pCtx.lineWidth = 3.5;
        pCtx.arc(coreX, coreY, corePulse, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.stroke();

        pCtx.fillStyle = "#FFFFFF";
        pCtx.font = "900 11px 'Montserrat', sans-serif";
        pCtx.textAlign = "center";
        pCtx.textBaseline = "middle";
        pCtx.fillText("NÚCLEO AURA", coreX, coreY - 6);
        pCtx.fillStyle = "#FFEDD5";
        pCtx.font = "800 9.5px 'JetBrains Mono', monospace";
        pCtx.fillText(isConverged ? "SÍNTESIS ACTIVA" : "5 PILARES → MARCA", coreX, coreY + 9);

        pCtx.restore();
        requestAnimationFrame(renderPillarsFrame);
      }
      requestAnimationFrame(renderPillarsFrame);
    }
  };

  window.tbbUpdateAlwaysOnFloatingBarText = function () {};
  window.tbbUpdateLocalizedFooterDOM = function () {};

  window.tbbRefreshCommercialPortalDOM = function () {
    tbbInjectAwwwardsStyles();
    const standaloneRoot = document.getElementById("tbbStandaloneCommercialPageRoot") || document.getElementById("tbbStandaloneCommercialRoot");
    if (standaloneRoot) {
      standaloneRoot.innerHTML = window.tbbBuildCommercialExperienceMarkup(true);
    }
    const portalInner = document.getElementById("tbbCommercialPortalInner");
    if (portalInner) {
      portalInner.innerHTML = window.tbbBuildCommercialExperienceMarkup(false);
    }
    setTimeout(() => window.tbbInitAwwwardsInteractions(), 30);
  };

  function applyUrlParamsState() {
    try {
      const path = (window.location.pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
      const pathMap = {
        "/": 1,
        "/inicio": 1,
        "/app-tour": 2,
        "/tour": 2,
        "/bases-teoricas": 3,
        "/bases-tecnicas": 3,
        "/demo": 4,
        "/aplicacion": 4,
        "/pack-descargas": 5,
        "/entregables": 5
      };
      if (pathMap[path]) {
        window.tbbCommercialDemoState.activeMainSection = pathMap[path];
      }
      const params = new URLSearchParams(window.location.search);
      const langP = params.get("lang");
      if (langP && ["es", "en", "fr", "pt", "de", "it"].includes(langP.toLowerCase())) {
        localStorage.setItem(LANG_STORAGE_KEY, langP.toLowerCase());
        localStorage.setItem("tbb_app_lang", langP.toLowerCase());
        document.documentElement.lang = langP.toLowerCase();
      }
      const secP = params.get("section") || params.get("tab");
      if (secP) {
        const sMap = { "1": 1, "inicio": 1, "2": 2, "app-tour": 2, "3": 3, "bases-teoricas": 3, "4": 4, "demo": 4, "5": 5, "pack-descargas": 5 };
        if (sMap[secP.toLowerCase()]) window.tbbCommercialDemoState.activeMainSection = sMap[secP.toLowerCase()];
      }
    } catch (e) {}
  }

  // Escuchar eventos desde el iframe de /studio (Sincronización de Pasos 0-3 y Bloqueo de Pago $49 USD en Paso 4)
  window.addEventListener("message", (ev) => {
    try {
      const msg = ev && ev.data;
      if (!msg || typeof msg !== "object") return;
      const st = window.tbbCommercialDemoState;
      if (msg.type === "TBB_DEMO_STATE_SYNC" && msg.stateSnapshot) {
        st.migratedSteps0to3Snapshot = msg.stateSnapshot;
        if (msg.stateSnapshot.brandName) st.brandName = msg.stateSnapshot.brandName;
        if (typeof msg.stateSnapshot.step === "number") st.activeDemoStep = msg.stateSnapshot.step;
        try {
          localStorage.setItem("tbb_demo_steps_0_to_3_backup", JSON.stringify(msg.stateSnapshot));
        } catch (e) {}
      }
      if (msg.type === "TBB_OPEN_CHECKOUT_PAYWALL_STEP4" || msg.type === "TBB_TRIGGER_PAYWALL") {
        if (msg.stateSnapshot) {
          st.migratedSteps0to3Snapshot = msg.stateSnapshot;
          try {
            localStorage.setItem("tbb_demo_steps_0_to_3_backup", JSON.stringify(msg.stateSnapshot));
          } catch (e) {}
        }
        window.tbbOpenBuyAppCheckoutModal("pro_atelier");
      }
    } catch (e) {}
  });

  window.addEventListener("popstate", () => {
    applyUrlParamsState();
    window.tbbRefreshCommercialPortalDOM();
  });

  function bootCommercialExperience() {
    tbbInjectAwwwardsStyles();
    applyUrlParamsState();
    window.tbbRefreshCommercialPortalDOM();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootCommercialExperience);
  } else {
    bootCommercialExperience();
  }
})();
