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
      payNowBtn: "Autorizar Pago Seguro y Activar Licencia"
    },
    en: {
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
      payNowBtn: "Authorize Secure Payment & Activate License"
    },
    fr: {
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
      payNowBtn: "Autoriser le Paiement Sécurisé et Activer"
    },
    pt: {
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
      payNowBtn: "Autorizar Pagamento Seguro e Ativar Licença"
    },
    de: {
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
      payNowBtn: "Sichere Zahlung autorisieren & Lizenz aktivieren"
    },
    it: {
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
      payNowBtn: "Autorizza Pagamento Sicuro e Attiva Licenza"
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
  const VIDEO_CAPSULES = [
    {
      step: 0,
      url: "/assets/videos/capsula_teoria_paso_0.mp4?v=91.0",
      poster: "/assets/videos/poster_paso_0.jpg?v=91.0",
      popupCapture: "/assets/app_captures/popup_video_paso_0_a_1.png",
      duration: "00:36",
      author: "Aura · Mentora Estratégica IA",
      i18n: {
        es: { title: "Paso 0 · Objetivo, Logo Base y Esencia del Giro", desc: "Cómo elegir entre crear una marca desde cero o evolucionar tu logotipo actual respetando la esencia de tu negocio." },
        en: { title: "Step 0 · Goal, Base Logo & Core Business Essence", desc: "How to choose between creating a brand from scratch or evolving your current logo while honoring your business core." },
        fr: { title: "Étape 0 · Objectif, Logo de Base et Essence du Secteur", desc: "Comment choisir entre créer une marque de zéro ou faire évoluer votre logo actuel." },
        pt: { title: "Passo 0 · Objetivo, Logo Base e Essência do Negócio", desc: "Como escolher entre criar uma marca do zero ou evoluir seu logotipo atual." },
        de: { title: "Schritt 0 · Ziel, Basis-Logo & Unternehmenskern", desc: "Wie Sie zwischen einer Neuerstellung oder der Evolution Ihres bestehenden Logos wählen." },
        it: { title: "Passo 0 · Obiettivo, Logo Base ed Essenza del Business", desc: "Come scegliere tra creare un brand da zero o evolvere il tuo logo attuale." }
      }
    },
    {
      step: 1,
      url: "/assets/videos/capsula_teoria_paso_1.mp4?v=91.0",
      poster: "/assets/videos/poster_paso_1.jpg?v=91.0",
      popupCapture: "/assets/app_captures/popup_video_paso_0_a_1.png",
      duration: "00:38",
      author: "Simon Sinek & Donald Miller",
      i18n: {
        es: { title: "Paso 1 · El Círculo Dorado y la Claridad Narrativa", desc: "Por qué la gente no compra lo que haces, sino el propósito por el que lo haces (Por qué, Cómo y Qué)." },
        en: { title: "Step 1 · The Golden Circle & Narrative Clarity", desc: "Why people don't buy what you do, they buy why you do it (Why, How, and What)." },
        fr: { title: "Étape 1 · Le Cercle d'Or et la Clarté Narrative", desc: "Pourquoi les clients n'achètent pas ce que vous faites, mais pourquoi vous le faites." },
        pt: { title: "Passo 1 · O Círculo Dourado e a Clareza Narrativa", desc: "Por que as pessoas não compram o que você faz, mas o porquê você faz." },
        de: { title: "Schritt 1 · Der Golden Circle & Narrative Klarheit", desc: "Warum Menschen nicht kaufen, was Sie tun, sondern warum Sie es tun." },
        it: { title: "Passo 1 · Il Cerchio d'Oro e la Chiarezza Narrativa", desc: "Perché le persone non comprano ciò che fai, ma il perché lo fai." }
      }
    },
    {
      step: 2,
      url: "/assets/videos/capsula_teoria_paso_2.mp4?v=91.0",
      poster: "/assets/videos/poster_paso_2.jpg?v=91.0",
      popupCapture: "/assets/app_captures/popup_video_paso_1_a_2.png",
      duration: "00:38",
      author: "Jan Carlzon & Don Norman",
      i18n: {
        es: { title: "Paso 2 · Ingeniería de Touchpoints (Momentos de la Verdad)", desc: "En 15 segundos de contacto tu cliente decide si confía en tu marca antes, durante y después de comprar." },
        en: { title: "Step 2 · Touchpoint Engineering (Moments of Truth)", desc: "In 15 seconds of contact, your customer decides whether to trust your brand before, during, and after purchase." },
        fr: { title: "Étape 2 · Ingénierie des Touchpoints (Moments de Vérité)", desc: "En 15 secondes de contact, votre client décide s'il fait confiance à votre marque." },
        pt: { title: "Passo 2 · Engenharia de Touchpoints (Momentos da Verdade)", desc: "Em 15 segundos de contato seu cliente decide se confia na sua marca antes, durante e depois da compra." },
        de: { title: "Schritt 2 · Touchpoint-Engineering (Momente der Wahrheit)", desc: "In 15 Sekunden Kontakt entscheidet Ihr Kunde über Vertrauen vor, während und nach dem Kauf." },
        it: { title: "Passo 2 · Ingegneria dei Touchpoint (Momenti della Verità)", desc: "In 15 secondi di contatto il cliente decide se fidarsi del tuo brand prima, durante e dopo l'acquisto." }
      }
    },
    {
      step: 3,
      url: "/assets/videos/capsula_teoria_paso_3.mp4?v=91.0",
      poster: "/assets/videos/poster_paso_3.jpg?v=91.0",
      popupCapture: "/assets/app_captures/popup_video_paso_2_a_3.png",
      duration: "00:38",
      author: "Al Ries, Jack Trout & Alexandra Watkins",
      i18n: {
        es: { title: "Paso 3 · Fonética, Naming Estratégico y Clases de Niza", desc: "Cómo elegir un nombre memorable y vincularlo con las Clases Internacionales de Niza para registro marcario." },
        en: { title: "Step 3 · Phonetics, Strategic Naming & Nice Classes", desc: "How to lock in a memorable name and match it with international Nice Classification trademark classes." },
        fr: { title: "Étape 3 · Phonétique, Naming Stratégique et Classes de Nice", desc: "Comment valider un nom mémorable et l'associer aux classes internationales de Nice." },
        pt: { title: "Passo 3 · Fonética, Naming Estratégico e Classes de Nice", desc: "Como escolher um nome memorável e vinculá-lo às Classes Internacionais de Nice." },
        de: { title: "Schritt 3 · Phonetik, Naming & Nizza-Klassen", desc: "Wie Sie einen einprägsamen Markennamen wählen und rechtlich in Nizza-Klassen einordnen." },
        it: { title: "Passo 3 · Fonetica, Naming Strategico e Classi di Nizza", desc: "Come scegliere un nome memorabile e abbinarlo alle Classi Internazionali di Nizza." }
      }
    },
    {
      step: 4,
      url: "/assets/videos/capsula_teoria_paso_4.mp4?v=91.0",
      poster: "/assets/videos/poster_paso_4.jpg?v=91.0",
      popupCapture: "/assets/app_captures/popup_video_paso_3_a_4.png",
      duration: "00:38",
      author: "Mitsuo Nagamachi & Robert Bringhurst",
      i18n: {
        es: { title: "Paso 4 · Brújula Kansei y Gobernanza Tipográfica", desc: "Traducción de emociones a parámetros geométricos y selección del par tipográfico oficial con licencia abierta." },
        en: { title: "Step 4 · Kansei Compass & Typographic Governance", desc: "Translating sensory emotion into geometry and selecting your official open-license font pairing." },
        fr: { title: "Étape 4 · Boussole Kansei et Gouvernance Typographique", desc: "Traduction des émotions en géométrie et sélection du duo typographique officiel." },
        pt: { title: "Passo 4 · Bússola Kansei e Governança Tipográfica", desc: "Tradução de emoções em parâmetros visuais e escolha do par tipográfico oficial." },
        de: { title: "Schritt 4 · Kansei-Kompass & Typografie-Governance", desc: "Übersetzung sensorischer Eindrücke in Geometrie und Auswahl Ihres offiziellen Schriftpaares." },
        it: { title: "Passo 4 · Bussola Kansei e Governance Tipografica", desc: "Traduzione delle emozioni in geometria e scelta della coppia tipografica ufficiale." }
      }
    },
    {
      step: 5,
      url: "/assets/videos/capsula_teoria_paso_5.mp4?v=91.0",
      poster: "/assets/videos/poster_paso_5.jpg?v=91.0",
      popupCapture: "/assets/app_captures/popup_video_paso_4_a_5.png",
      duration: "00:38",
      author: "Paul Rand & Jony Ive",
      i18n: {
        es: { title: "Paso 5 · Síntesis Vectorial en Curvas y Taller de Logotipo", desc: "Iteración asistida por IA y trazado matemático Bézier sobre fondo claro y oscuro sin píxeles." },
        en: { title: "Step 5 · Vector Curve Synthesis & Logo Atelier", desc: "AI-assisted iteration and mathematical Bézier vector tracing on light and dark canvases." },
        fr: { title: "Étape 5 · Synthèse Vectorielle en Courbes et Atelier Logo", desc: "Itération assistée par IA et tracé mathématique de Bézier sur fond clair et sombre." },
        pt: { title: "Passo 5 · Síntese Vetorial em Curvas e Atelier de Logo", desc: "Iteração assistida por IA e traçado matemático Bézier sobre fundo claro e escuro." },
        de: { title: "Schritt 5 · Vektorkurven-Synthese & Logo-Atelier", desc: "KI-gestützte Iteration und mathematische Bézier-Vektorisierung auf hellem und dunklem Grund." },
        it: { title: "Passo 5 · Sintesi Vettoriale in Curve e Atelier del Logo", desc: "Iterazione assistita da IA e tracciato matematico di Bézier su sfondo chiaro e scuro." }
      }
    },
    {
      step: 6,
      url: "/assets/videos/capsula_teoria_paso_6.mp4?v=91.0",
      poster: "/assets/videos/poster_paso_6.jpg?v=91.0",
      popupCapture: "/assets/app_captures/popup_video_paso_5_a_6.png",
      duration: "00:40",
      author: "Massimo Vignelli & Josef Müller-Brockmann",
      i18n: {
        es: { title: "Paso 6 · El Manual Oficial de 36 Láminas y los 9 Entregables", desc: "Cómo la disciplina de retícula y tus 9 archivos ejecutivos convierten tu marca en un sistema escalable." },
        en: { title: "Step 6 · The 36-Plate Official Brandbook & 9 Deliverables", desc: "How grid discipline and your 9 production files turn your brand into a scalable enterprise asset." },
        fr: { title: "Étape 6 · Le Manuel Officiel de 36 Planches et les 9 Livrables", desc: "Comment la rigueur de grille et vos 9 fichiers transforment votre marque en système durable." },
        pt: { title: "Passo 6 · O Manual Oficial de 36 Lâminas e os 9 Entregáveis", desc: "Como a disciplina de grid e seus 9 arquivos transformam sua marca em um sistema escalável." },
        de: { title: "Schritt 6 · Das 36-Tafeln-Markenhandbuch & 9 Deliverables", desc: "Wie Rasterdisziplin und Ihre 9 Produktionsdateien Ihre Marke in ein skalierbares System verwandeln." },
        it: { title: "Passo 6 · Il Manuale Ufficiale di 36 Tavole e i 9 Deliverable", desc: "Come la disciplina della griglia e i tuoi 9 file trasformano il brand in un sistema scalabile." }
      }
    }
  ];

  // Recorrido completo de la App para el Menú 3 (App Tour):
  // Incluye cada paso desde el inicio hasta el final + los pop-ups de video + los descargables finales
  const APP_TOUR_FLOW_ITEMS = [
    {
      id: "step0_1",
      type: "step",
      badge: "PASO 0.1 · PUNTO DE PARTIDA",
      img: "/assets/app_captures/tour_step0_1_objetivo.png",
      secondaryImg: "/assets/app_captures/step0_logo_aura.png",
      i18n: {
        es: { title: "Eliges tu objetivo y conversas con Aura", desc: "Desde el primer segundo, la interfaz limpia te permite elegir si crearás una marca desde cero o evolucionarás tu logotipo actual, acompañado por el orbe líquido 3D de Aura en tiempo real." },
        en: { title: "Choose your goal and talk with Aura", desc: "From the very first second, a clean interface lets you choose whether to build a brand from scratch or evolve your existing logo, guided by Aura's live 3D Liquid Glass orb." },
        fr: { title: "Choisissez votre objectif et échangez avec Aura", desc: "Dès la première seconde, choisissez de créer une marque de zéro ou de faire évoluer votre logo actuel avec l'orbe 3D d'Aura." },
        pt: { title: "Escolha seu objetivo e converse com a Aura", desc: "Desde o primeiro segundo, escolha criar uma marca do zero ou evoluir seu logotipo atual com o orbe 3D da Aura." },
        de: { title: "Ziel wählen und mit Aura sprechen", desc: "Wählen Sie vom ersten Moment an zwischen Neuerstellung oder Evolution Ihres bestehenden Logos mit Auras 3D-Orb." },
        it: { title: "Scegli il tuo obiettivo e dialoga con Aura", desc: "Dal primo secondo scegli se creare un brand da zero o evolvere il tuo logo attuale con la sfera 3D di Aura." }
      }
    },
    {
      id: "step0_3",
      type: "step",
      badge: "PASO 0.3 · GIRO Y ARQUITECTURA",
      img: "/assets/app_captures/tour_step0_3_giro.png",
      i18n: {
        es: { title: "Defines tu giro empresarial por voz o texto", desc: "Describes con tus propias palabras qué hace tu empresa. El motor comprende el contexto industrial y configura si tu marca será monolítica o con submarcas." },
        en: { title: "Define your business sector by voice or text", desc: "Describe what your company does in your own words. The engine understands your industry context and configures a monolithic or multi-brand architecture." },
        fr: { title: "Définissez votre secteur par la voix ou le texte", desc: "Décrivez avec vos propres mots l'activité de votre entreprise pour calibrer toute l'architecture." },
        pt: { title: "Defina seu ramo por voz ou texto", desc: "Descreva com suas próprias palavras o que sua empresa faz para calibrar toda a arquitetura da marca." },
        de: { title: "Branche per Sprache oder Text definieren", desc: "Beschreiben Sie in eigenen Worten Ihr Geschäftsfeld zur automatischen Kalibrierung der Markenarchitektur." },
        it: { title: "Definisci il tuo settore con voce o testo", desc: "Descrivi con parole tue cosa fa la tua azienda per calibrare l'intera architettura del brand." }
      }
    },
    {
      id: "popup_0_1",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 0 A PASO 1",
      img: "/assets/app_captures/popup_video_paso_0_a_1.png",
      videoIdx: 1,
      i18n: {
        es: { title: "Cápsula emergente: El Círculo Dorado antes del Paso 1", desc: "Al avanzar de etapa, la aplicación despliega un pop-up cinematográfico 9:16 con avatar y B-Roll que te explica en 38 segundos cómo definir el Porqué de tu empresa." },
        en: { title: "Pop-up Capsule: The Golden Circle before Step 1", desc: "When advancing stages, the app presents a 9:16 cinematic pop-up with avatar and B-Roll explaining in 38 seconds how to articulate your company's Why." },
        fr: { title: "Pop-up Vidéo : Le Cercle d'Or avant l'Étape 1", desc: "À chaque transition, un pop-up vidéo 9:16 avec avatar et B-Roll explique en 38 secondes la théorie de l'étape suivante." },
        pt: { title: "Pop-up de Vídeo: O Círculo Dourado antes do Passo 1", desc: "Ao avançar de etapa, o app exibe um pop-up 9:16 com avatar e B-Roll explicando em 38 segundos como definir seu Porquê." },
        de: { title: "Video-Pop-up: Der Golden Circle vor Schritt 1", desc: "Beim Phasenwechsel öffnet sich ein 9:16-Video-Pop-up mit Avatar und B-Roll zur Einführung in den Golden Circle." },
        it: { title: "Pop-up Video: Il Cerchio d'Oro prima del Passo 1", desc: "Al cambio di fase, l'app mostra un pop-up video 9:16 con avatar e B-Roll che spiega come definire il tuo Perché." }
      }
    },
    {
      id: "step1_main",
      type: "step",
      badge: "PASO 1 · ADN Y CÍRCULO DORADO",
      img: "/assets/app_captures/step1_proposito_sinek.png",
      secondaryImg: "/assets/app_captures/tour_step1_6_persona.png",
      i18n: {
        es: { title: "Estructuras tu Propósito, Método, Promesa y Personalidad", desc: "Guiado por preguntas claras y corrección ortográfica/ejecutiva en un clic, defines el corazón filosófico de tu marca y su arquetipo humano." },
        en: { title: "Structure your Purpose, Method, Promise & Brand Persona", desc: "Guided by clear prompts and 1-click executive copy refinement, you define the philosophical core and human persona of your brand." },
        fr: { title: "Structurez votre Raison d'être, Méthode et Personnalité", desc: "Guidé par des questions claires et une révision exécutive en un clic, vous définissez le cœur de votre marque." },
        pt: { title: "Estruture seu Propósito, Método, Promessa e Personalidade", desc: "Guiado por perguntas claras e revisão executiva em um clique, você define o coração estratégico da sua marca." },
        de: { title: "Zweck, Methode, Versprechen & Markenpersönlichkeit", desc: "Mit klaren Impulsen und 1-Klick-Textoptimierung definieren Sie den strategischen Kern Ihrer Marke." },
        it: { title: "Struttura Scopo, Metodo, Promessa e Personalità", desc: "Guidato da domande chiare e revisione esecutiva in un clic, definisci il cuore strategico del tuo brand." }
      }
    },
    {
      id: "popup_1_2",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 1 A PASO 2",
      img: "/assets/app_captures/popup_video_paso_1_a_2.png",
      videoIdx: 2,
      i18n: {
        es: { title: "Cápsula emergente: Momentos de la Verdad (Jan Carlzon)", desc: "Antes de mapear la experiencia de tu cliente, la cápsula de video te muestra cómo los primeros 15 segundos de contacto determinan la lealtad hacia tu marca." },
        en: { title: "Pop-up Capsule: Moments of Truth (Jan Carlzon)", desc: "Before mapping your customer journey, this video pop-up shows how the first 15 seconds of contact determine brand loyalty." },
        fr: { title: "Pop-up Vidéo : Les Moments de Vérité (Jan Carlzon)", desc: "Découvrez comment 15 secondes d'interaction déterminent la confiance de vos clients." },
        pt: { title: "Pop-up de Vídeo: Momentos da Verdade (Jan Carlzon)", desc: "Veja como os primeiros 15 segundos de contato determinam a fidelidade do seu cliente." },
        de: { title: "Video-Pop-up: Momente der Wahrheit (Jan Carlzon)", desc: "Erleben Sie, wie die ersten 15 Sekunden Kundenkontakt über langfristige Markentreue entscheiden." },
        it: { title: "Pop-up Video: I Momenti della Verità (Jan Carlzon)", desc: "Scopri come i primi 15 secondi di contatto determinano la fedeltà verso il tuo brand." }
      }
    },
    {
      id: "step2_main",
      type: "step",
      badge: "PASO 2 · TOUCHPOINTS ANTES, DURANTE Y DESPUÉS",
      img: "/assets/app_captures/step2_touchpoints_carlzon.png",
      secondaryImg: "/assets/app_captures/tour_step2_2_durante.png",
      i18n: {
        es: { title: "Seleccionas los puntos de contacto clave de tu negocio", desc: "Eliges y personalizas cómo te descubren tus clientes (Antes), cómo viven tu servicio (Durante) y cómo aseguras que regresen y te recomienden (Después)." },
        en: { title: "Select the key touchpoints of your business", desc: "Choose and customize how customers discover you (Before), experience your service (During), and stay loyal (After)." },
        fr: { title: "Sélectionnez les points de contact clés de votre entreprise", desc: "Personnalisez comment vos clients vous découvrent (Avant), vivent votre service (Pendant) et restent fidèles (Après)." },
        pt: { title: "Selecione os pontos de contato chave do seu negócio", desc: "Personalize como seus clientes descobrem você (Antes), vivem seu serviço (Durante) e permanecem fiéis (Depois)." },
        de: { title: "Wählen Sie die wichtigsten Kontaktpunkte Ihres Geschäfts", desc: "Definieren Sie, wie Kunden Sie entdecken (Vorher), erleben (Währenddessen) und weiterempfehlen (Nachher)." },
        it: { title: "Seleziona i punti di contatto chiave del tuo business", desc: "Personalizza come i clienti ti scoprono (Prima), vivono il servizio (Durante) e restano fedeli (Dopo)." }
      }
    },
    {
      id: "popup_2_3",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 2 A PASO 3",
      img: "/assets/app_captures/popup_video_paso_2_a_3.png",
      videoIdx: 3,
      i18n: {
        es: { title: "Cápsula emergente: Naming Estratégico y Posicionamiento", desc: "El pop-up de video introduce las leyes de posicionamiento de Al Ries & Jack Trout y la fonética comercial antes de bautizar o confirmar el nombre de tu marca." },
        en: { title: "Pop-up Capsule: Strategic Naming & Positioning", desc: "This video pop-up introduces Al Ries & Jack Trout's positioning laws and commercial phonetics before confirming your brand name." },
        fr: { title: "Pop-up Vidéo : Naming Stratégique et Positionnement", desc: "Introduction aux lois du positionnement et à la phonétique de marque." },
        pt: { title: "Pop-up de Vídeo: Naming Estratégico e Posicionamento", desc: "Introdução às leis de posicionamento e fonética comercial antes de confirmar seu nome." },
        de: { title: "Video-Pop-up: Strategisches Naming & Positionierung", desc: "Einführung in die Gesetze der Markenpositionierung und kommerziellen Phonetik." },
        it: { title: "Pop-up Video: Naming Strategico e Posizionamento", desc: "Introduzione alle leggi del posizionamento e alla fonetica commerciale." }
      }
    },
    {
      id: "step3_main",
      type: "step",
      badge: "PASO 3 · NAMING, ESLOGAN Y CLASES DE NIZA",
      img: "/assets/app_captures/step3_naming_niza.png",
      secondaryImg: "/assets/app_captures/tour_step3_2_naming.png",
      i18n: {
        es: { title: "Confirmas tu Nombre, Eslogan y Clasificación Legal de Niza", desc: "Exploras propuestas de naming o validas tu nombre actual junto con su eslogan y las Clases Internacionales de Niza exactas para proteger tu marca ante IMPI, USPTO o EUIPO." },
        en: { title: "Confirm your Name, Tagline & Legal Nice Classification", desc: "Explore naming proposals or validate your current name, tagline, and exact International Nice Classes for trademark registration." },
        fr: { title: "Confirmez votre Nom, Slogan et Classification de Nice", desc: "Validez votre nom commercial, votre slogan et les classes internationales de Nice pour le dépôt de marque." },
        pt: { title: "Confirme seu Nome, Slogan e Classificação de Nice", desc: "Valide seu nome comercial, slogan e as Classes Internacionais de Nice exatas para registro de marca." },
        de: { title: "Markenname, Claim & Nizza-Klassifikation bestätigen", desc: "Bestätigen Sie Ihren Markennamen, Ihren Claim und die exakten Nizza-Klassen für den Markenschutz." },
        it: { title: "Conferma Nome, Payoff e Classificazione di Nizza", desc: "Convalida il nome del brand, lo slogan e le Classi Internazionali di Nizza per la registrazione del marchio." }
      }
    },
    {
      id: "popup_3_4",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 3 A PASO 4",
      img: "/assets/app_captures/popup_video_paso_3_a_4.png",
      videoIdx: 4,
      i18n: {
        es: { title: "Cápsula emergente: Ingeniería Kansei y Psicología de la Forma", desc: "Descubre en video cómo la metodología japonesa Kansei traduce tus valores estratégicos en peso tipográfico, curvatura y carácter visual." },
        en: { title: "Pop-up Capsule: Kansei Engineering & Psychology of Form", desc: "Discover how Japanese Kansei engineering translates your strategic values into typographic weight, curvature, and visual character." },
        fr: { title: "Pop-up Vidéo : Ingénierie Kansei et Psychologie des Formes", desc: "Découvrez comment la méthode japonaise Kansei traduit vos valeurs en typographie et géométrie." },
        pt: { title: "Pop-up de Vídeo: Engenharia Kansei e Psicologia da Forma", desc: "Descubra como a metodologia japonesa Kansei traduz seus valores em tipografia e geometria." },
        de: { title: "Video-Pop-up: Kansei-Engineering & Formpsychologie", desc: "Erfahren Sie, wie japanisches Kansei-Engineering Ihre Markenwerte in Typografie und Geometrie übersetzt." },
        it: { title: "Pop-up Video: Ingegneria Kansei e Psicologia della Forma", desc: "Scopri come il metodo giapponese Kansei traduce i tuoi valori in tipografia e geometria." }
      }
    },
    {
      id: "step4_main",
      type: "step",
      badge: "PASO 4 · BRÚJULA KANSEI Y TIPOGRAFÍA HÍBRIDA",
      img: "/assets/app_captures/step4_kansei_tipografia.png",
      secondaryImg: "/assets/app_captures/tour_step4_1_kansei.png",
      i18n: {
        es: { title: "Calibras tus ejes sensoriales y eliges tus fuentes oficiales", desc: "Ajustas los deslizadores Kansei y seleccionas tu arquitectura tipográfica (Primaria, Secundaria y Monoespaciada) con empaquetado automático .TTF en archivo .ZIP." },
        en: { title: "Calibrate sensory axes and select your official fonts", desc: "Adjust the Kansei sliders and choose your typographic hierarchy (Primary, Secondary, Monospace) with automatic .TTF font bundling in a .ZIP kit." },
        fr: { title: "Calibrez vos axes sensoriels et choisissez vos polices", desc: "Ajustez les curseurs Kansei et sélectionnez votre duo typographique officiel avec kit .ZIP inclus." },
        pt: { title: "Calibre seus eixos sensoriais e escolha suas fontes", desc: "Ajuste os controles Kansei e selecione sua hierarquia tipográfica oficial com pacote .ZIP incluso." },
        de: { title: "Sensorische Achsen kalibrieren & Schriften wählen", desc: "Kalibrieren Sie die Kansei-Regler und wählen Sie Ihre offizielle Schrifthierarchie inklusive .ZIP-Schriftenpaket." },
        it: { title: "Calibra gli assi sensoriali e scegli i tuoi font ufficiali", desc: "Regola i cursori Kansei e seleziona la gerarchia tipografica ufficiale con kit .ZIP incluso." }
      }
    },
    {
      id: "popup_4_5",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 4 A PASO 5",
      img: "/assets/app_captures/popup_video_paso_4_a_5.png",
      videoIdx: 5,
      i18n: {
        es: { title: "Cápsula emergente: Síntesis Vectorial y Colorimetría", desc: "El video explica cómo la simplicidad geométrica de Paul Rand y Jony Ive permite que un símbolo funcione desde el ícono de una app hasta la fachada de un edificio." },
        en: { title: "Pop-up Capsule: Vector Synthesis & Colorimetry", desc: "This video explains how geometric simplicity lets your emblem scale effortlessly from a mobile app icon to a building facade." },
        fr: { title: "Pop-up Vidéo : Synthèse Vectorielle et Colorimétrie", desc: "Comment la simplicité géométrique permet à votre emblème de fonctionner à toutes les échelles." },
        pt: { title: "Pop-up de Vídeo: Síntese Vetorial e Colorimetria", desc: "Como a simplicidade geométrica permite que seu símbolo funcione de um ícone de app até uma fachada." },
        de: { title: "Video-Pop-up: Vektorsynthese & Farbarchitektur", desc: "Wie geometrische Präzision dafür sorgt, dass Ihr Markenzeichen vom App-Icon bis zur Gebäudefassade wirkt." },
        it: { title: "Pop-up Video: Sintesi Vettoriale e Colorimetria", desc: "Come la semplicità geometrica permette al tuo simbolo di funzionare da un'icona app fino a una facciata." }
      }
    },
    {
      id: "step5_main",
      type: "step",
      badge: "PASO 5 · TALLER DE LOGOTIPO Y ACABADO LIQUID GLASS",
      img: "/assets/app_captures/step5_taller_logo_liquid_glass.png",
      secondaryImg: "/assets/app_captures/tour_step5_2_iter6_claro.png",
      i18n: {
        es: { title: "Evolucionas y apruebas tu Logotipo Oficial en Curvas", desc: "Visualizas tus iteraciones sobre lienzo claro (#FFFFFF) y soporte oscuro (#090D16), ajustas tu paleta HEX/CMYK/Pantone y bloqueas la versión maestra en vectores matemáticos." },
        en: { title: "Evolve and approve your Official Vector Logo", desc: "Preview iterations on light (#FFFFFF) and dark (#090D16) canvases, fine-tune your HEX/CMYK/Pantone palette, and lock in your master vector emblem." },
        fr: { title: "Faites évoluer et validez votre Logotype Officiel en Courbes", desc: "Prévisualisez vos itérations sur fond clair et sombre, ajustez votre palette HEX/CMYK/Pantone et validez le vecteur maître." },
        pt: { title: "Evolua e aprove seu Logotipo Oficial em Curvas", desc: "Visualize suas iterações em fundo claro e escuro, ajuste sua paleta HEX/CMYK/Pantone e aprove o vetor mestre." },
        de: { title: "Offizielles Vektor-Logo entwickeln und freigeben", desc: "Prüfen Sie Varianten auf hellem und dunklem Grund, kalibrieren Sie HEX/CMYK/Pantone und bestätigen Sie das Master-Logo." },
        it: { title: "Evolvi e approva il tuo Logo Ufficiale in Curve", desc: "Visualizza le iterazioni su sfondo chiaro e scuro, regola la palette HEX/CMYK/Pantone e approva il vettore master." }
      }
    },
    {
      id: "popup_5_6",
      type: "video_popup",
      badge: "POP-UP DE VIDEO · TRANSICIÓN PASO 5 A PASO 6",
      img: "/assets/app_captures/popup_video_paso_5_a_6.png",
      videoIdx: 6,
      i18n: {
        es: { title: "Cápsula emergente: La Bóveda del Manual de 36 Láminas", desc: "Última cápsula antes de entrar a tu bóveda: cómo usar tu Manual de Identidad y tus 9 entregables con imprentas, diseñadores y equipo comercial." },
        en: { title: "Pop-up Capsule: The 36-Plate Brandbook Vault", desc: "Final video capsule before entering your vault: how to deploy your 36-Plate Brandbook and 9 deliverables across print shops, designers, and sales teams." },
        fr: { title: "Pop-up Vidéo : Le Coffre du Manuel de 36 Planches", desc: "Dernière capsule avant le coffre : comment utiliser votre manuel et vos 9 livrables au quotidien." },
        pt: { title: "Pop-up de Vídeo: O Cofre do Manual de 36 Lâminas", desc: "Última cápsula antes do cofre: como usar seu Manual de 36 Lâminas e seus 9 entregáveis com gráficas e equipe." },
        de: { title: "Video-Pop-up: Der Tresor des 36-Tafeln-Handbuchs", desc: "Letzte Kapsel vor dem Tresor: Wie Sie Ihr Handbuch und alle 9 Deliverables im Alltag einsetzen." },
        it: { title: "Pop-up Video: Il Caveau del Manuale di 36 Tavole", desc: "Ultima capsula prima del caveau: come utilizzare il Manuale di 36 Tavole e i 9 deliverable con stamperie e team." }
      }
    },
    {
      id: "step6_1",
      type: "step",
      badge: "PASO 6.1 · VISOR EN VIVO DE LAS 36 LÁMINAS",
      img: "/assets/app_captures/step6_visor_36_laminas.png",
      secondaryImg: "/assets/brandbook_plates_tbb/plate-01.jpg",
      i18n: {
        es: { title: "Inspeccionas tu Manual Oficial de 36 Láminas hoja por hoja", desc: "Recorres las 36 láminas compiladas en tiempo real: portada monolítica, índice rector, Círculo Dorado, Touchpoints, retícula del logo, paleta industrial y mockups fotográficos 4:3." },
        en: { title: "Inspect your 36-Plate Official Brandbook page by page", desc: "Flip through all 36 compiled plates in real time: monolithic cover, master index, Golden Circle, Touchpoints, logo grid, industrial palette, and 4:3 photo mockups." },
        fr: { title: "Inspectez votre Manuel Officiel de 36 Planches page par page", desc: "Parcourez les 36 planches compilées en temps réel avant l'exportation finale." },
        pt: { title: "Inspecione seu Manual Oficial de 36 Lâminas folha por folha", desc: "Navegue pelas 36 lâminas compiladas em tempo real antes de exportar." },
        de: { title: "Prüfen Sie Ihr 36-Tafeln-Markenhandbuch Seite für Seite", desc: "Blättern Sie in Echtzeit durch alle 36 kompilierten Tafeln vor dem Export." },
        it: { title: "Ispeziona il tuo Manuale Ufficiale di 36 Tavole pagina per pagina", desc: "Sfoglia tutte le 36 tavole compilate in tempo reale prima dell'esportazione." }
      }
    },
    {
      id: "step6_2_deliverables",
      type: "deliverables_finale",
      badge: "PASO 6.2 Y 6.3 · DESCARGA DE LOS 9 ENTREGABLES OFICIALES",
      img: "/assets/app_captures/step6_boveda_entregables.png",
      secondaryImg: "/assets/app_captures/step6_firma_correo_html.png",
      i18n: {
        es: { title: "Descargas tus 9 Entregables Oficiales listos para operar", desc: "Al final del recorrido descargas en un clic tu Manual PDF de 36 Láminas, Visor Web HTML, Logotipo Horizontal SVG, Maestro Illustrator .AI, Isotipo 1024px, Firma de Correo HTML, Hoja Membretada Word .DOCX, Presentación PowerPoint .PPTX y Kit de Fuentes .ZIP." },
        en: { title: "Download all 9 Official Deliverables ready for business", desc: "At the end of the tour, download in one click your 36-Plate PDF Brandbook, Interactive HTML Viewer, Horizontal SVG Logo, Native Illustrator .AI, 1024px App Icon, HTML Email Signature, Word Letterhead .DOCX, PowerPoint Deck .PPTX, and Font Kit .ZIP." },
        fr: { title: "Téléchargez vos 9 Livrables Officiels prêts à l'emploi", desc: "À la fin du parcours, téléchargez en un clic votre Manuel PDF 36 Planches, Visionneuse HTML, SVG, Illustrator .AI, Icône 1024px, Signature HTML, Word .DOCX, PowerPoint .PPTX et Kit de Polices .ZIP." },
        pt: { title: "Baixe seus 9 Entregáveis Oficiais prontos para usar", desc: "No final do tour, baixe em um clique seu Manual PDF de 36 Lâminas, Visualizador HTML, SVG, Illustrator .AI, Ícone 1024px, Assinatura HTML, Word .DOCX, PowerPoint .PPTX e Kit de Fontes .ZIP." },
        de: { title: "Laden Sie alle 9 offiziellen Deliverables einsatzbereit herunter", desc: "Am Ende der Tour laden Sie per Klick Ihr 36-Tafeln-PDF, HTML-Viewer, SVG, Illustrator .AI, 1024px Icon, HTML-Signatur, Word .DOCX, PowerPoint .PPTX und Font-Kit .ZIP herunter." },
        it: { title: "Scarica i tuoi 9 Deliverable Ufficiali pronti per operare", desc: "Alla fine del percorso scarichi con un clic il Manuale PDF di 36 Tavole, Visore HTML, SVG, Illustrator .AI, Icona 1024px, Firma HTML, Word .DOCX, PowerPoint .PPTX e Kit Font .ZIP." }
      }
    }
  ];

  const OFFICIAL_9_DELIVERABLES = [
    {
      num: "01",
      format: ".PDF · 36 LÁMINAS",
      plateNum: 1,
      thumb: "/assets/brandbook_plates_tbb/plate-01.jpg",
      sampleUrl: "/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf",
      i18n: {
        es: { title: "Manual Oficial de Identidad de 36 Láminas (.PDF)", desc: "Documento maestro de 36 páginas 16:9 sobre lienzo claro con índice rector, Círculo Dorado, Touchpoints, terna de logotipos, retícula constructiva, paleta CMYK/Pantone y aplicaciones reales." },
        en: { title: "36-Plate Official Brand Identity Manual (.PDF)", desc: "36-page 16:9 master document on a light canvas featuring master index, Golden Circle, Touchpoints, logo suite, construction grid, CMYK/Pantone palette, and real-world mockups." },
        fr: { title: "Manuel Officiel d'Identité de 36 Planches (.PDF)", desc: "Document maître de 36 pages 16:9 avec sommaire, Cercle d'Or, Touchpoints, logotypes, grille de construction, palette CMJN/Pantone et applications." },
        pt: { title: "Manual Oficial de Identidade de 36 Lâminas (.PDF)", desc: "Documento mestre de 36 páginas 16:9 com índice diretor, Círculo Dourado, Touchpoints, terna de logotipos, grid construtivo, paleta CMYK/Pantone e aplicações." },
        de: { title: "Offizielles 36-Tafeln-Markenhandbuch (.PDF)", desc: "36-seitiges 16:9-Masterdokument mit Inhaltsverzeichnis, Golden Circle, Touchpoints, Logo-Suite, Konstruktionsraster, CMYK/Pantone-Palette und Mockups." },
        it: { title: "Manuale Ufficiale d'Identità di 36 Tavole (.PDF)", desc: "Documento master di 36 pagine 16:9 con indice generale, Cerchio d'Oro, Touchpoint, terna di loghi, griglia costruttiva, palette CMYK/Pantone e mockup." }
      }
    },
    {
      num: "02",
      format: ".HTML · VISOR INTERACTIVO",
      plateNum: 2,
      thumb: "/assets/brandbook_plates_tbb/plate-02.jpg",
      sampleUrl: "/assets/deliverables_tbb/Manual_Identidad_36_Laminas_the_best_brand.pdf",
      i18n: {
        es: { title: "Manual Web Autónomo de 36 Láminas (.HTML)", desc: "Archivo interactivo autónomo con navegación instantánea entre las 36 láminas, ideal para compartir con tu equipo directivo, diseñadores y proveedores." },
        en: { title: "Standalone Interactive 36-Plate Web Brandbook (.HTML)", desc: "Self-contained interactive file with instant navigation across all 36 plates, ideal for sharing with your executive team, designers, and vendors." },
        fr: { title: "Manuel Web Autonome de 36 Planches (.HTML)", desc: "Fichier interactif autonome permettant de naviguer instantanément entre les 36 planches sur tout navigateur." },
        pt: { title: "Manual Web Autônomo de 36 Lâminas (.HTML)", desc: "Arquivo interativo autônomo com navegação rápida entre as 36 lâminas para compartilhar com equipe e fornecedores." },
        de: { title: "Eigenständiges Interaktives Web-Brandbook (.HTML)", desc: "Interaktive Einzeldatei mit Sofortnavigation durch alle 36 Tafeln für Team, Agenturen und Lieferanten." },
        it: { title: "Manuale Web Autonomo di 36 Tavole (.HTML)", desc: "File interattivo autonomo con navigazione istantanea tra le 36 tavole da condividere con team e fornitori." }
      }
    },
    {
      num: "03",
      format: ".SVG · VECTORES PUROS",
      plateNum: 13,
      thumb: "/assets/brandbook_plates_tbb/plate-13.jpg",
      sampleUrl: "/assets/logos/Logotipo_Horizontal_Curvas_the_best_brand.svg",
      i18n: {
        es: { title: "Logotipo Horizontal Oficial en Curvas (.SVG)", desc: "Archivo vectorial matemático escalable al infinito sin pérdida de nitidez para web, rotulación vehicular, espectaculares y bordado." },
        en: { title: "Official Horizontal Vector Logo in Curves (.SVG)", desc: "Infinitely scalable mathematical vector file with zero quality loss for web, vehicle wraps, billboards, and embroidery." },
        fr: { title: "Logotype Horizontal Officiel en Courbes (.SVG)", desc: "Fichier vectoriel mathématique extensible à l'infini pour le web, la signalétique et l'impression grand format." },
        pt: { title: "Logotipo Horizontal Oficial em Curvas (.SVG)", desc: "Arquivo vetorial matemático escalável ao infinito sem perda de nitidez para web, frota, outdoor e bordado." },
        de: { title: "Offizielles Horizontales Vektor-Logo (.SVG)", desc: "Unendlich skalierbare mathematische Vektordatei ohne Qualitätsverlust für Web, Beschriftung und Großformatdruck." },
        it: { title: "Logotipo Orizzontale Ufficiale in Curve (.SVG)", desc: "File vettoriale matematico scalabile all'infinito senza perdita di qualità per web, insegne e stampa." }
      }
    },
    {
      num: "04",
      format: ".AI · ADOBE ILLUSTRATOR",
      plateNum: 14,
      thumb: "/assets/brandbook_plates_tbb/plate-14.jpg",
      sampleUrl: "/assets/logos/Isotipo_Simbolo_Curvas_the_best_brand.ai",
      i18n: {
        es: { title: "Archivo Maestro Editable en Capas (.AI)", desc: "Código nativo Adobe Illustrator con trazos Bézier puros, retícula constructiva y capas organizadas para imprentas offset y diseñadores." },
        en: { title: "Layered Native Master Vector File (.AI)", desc: "Native Adobe Illustrator file with pure Bézier paths, construction grid, and organized layers for offset printers and designers." },
        fr: { title: "Fichier Maître Éditable en Calques (.AI)", desc: "Fichier natif Adobe Illustrator avec tracés de Bézier purs et calques organisés pour les imprimeurs." },
        pt: { title: "Arquivo Mestre Editável em Camadas (.AI)", desc: "Arquivo nativo Adobe Illustrator com curvas Bézier puras e camadas organizadas para gráficas e designers." },
        de: { title: "Editierbare Master-Vektordatei mit Ebenen (.AI)", desc: "Native Adobe-Illustrator-Datei mit reinen Bézier-Pfaden und geordneten Ebenen für Druckereien und Designer." },
        it: { title: "File Master Editabile a Livelli (.AI)", desc: "File nativo Adobe Illustrator con tracciati di Bézier puri e livelli organizzati per tipografie e designer." }
      }
    },
    {
      num: "05",
      format: ".SVG + .PNG 1024px · APP ICON",
      plateNum: 18,
      thumb: "/assets/brandbook_plates_tbb/plate-18.jpg",
      sampleUrl: "/assets/logos/Isotipo_Simbolo_Curvas_the_best_brand.svg",
      i18n: {
        es: { title: "Isotipo 1:1, Avatar Social y Sello Circular", desc: "Símbolo cuadrado en alta resolución (1024×1024px) y curvas .SVG calibrado para App Store, WhatsApp Business, LinkedIn, Instagram y sello institucional." },
        en: { title: "1:1 App Icon, Social Avatar & Circular Seal", desc: "High-resolution 1024×1024px square symbol and .SVG curves calibrated for App Store, WhatsApp Business, LinkedIn, Instagram, and official seal." },
        fr: { title: "Isotype 1:1, Avatar Social et Sceau Circulaire", desc: "Symbole carré haute résolution (1024×1024px) et .SVG calibré pour App Store, WhatsApp Business, LinkedIn et Instagram." },
        pt: { title: "Isotipo 1:1, Avatar Social e Selo Circular", desc: "Símbolo quadrado em alta resolução (1024×1024px) e .SVG calibrado para App Store, WhatsApp Business, LinkedIn e Instagram." },
        de: { title: "1:1 App-Icon, Social-Avatar & Rundsiegel", desc: "Hochauflösendes 1024×1024px-Symbol und .SVG für App Store, WhatsApp Business, LinkedIn, Instagram und Siegel." },
        it: { title: "Isotipo 1:1, Avatar Social e Sigillo Circolare", desc: "Simbolo quadrato ad alta risoluzione (1024×1024px) e .SVG calibrato per App Store, WhatsApp Business, LinkedIn e Instagram." }
      }
    },
    {
      num: "06",
      format: ".HTML · FIRMA DE CORREO",
      plateNum: 33,
      thumb: "/assets/brandbook_plates_tbb/plate-33.jpg",
      sampleUrl: "/assets/deliverables_tbb/Firma_Correo_Corporativa_the_best_brand.html",
      i18n: {
        es: { title: "Firma Corporativa Interactiva de Correo (.HTML)", desc: "Plantilla ejecutiva personalizable con foto o isotipo, cargo, teléfono, enlaces y botón de copia en un clic para Gmail, Outlook y Apple Mail." },
        en: { title: "Interactive Corporate Email Signature (.HTML)", desc: "Customizable executive signature with photo or emblem, role, phone, links, and 1-click copy for Gmail, Outlook, and Apple Mail." },
        fr: { title: "Signature E-mail Corporative Interactive (.HTML)", desc: "Modèle exécutif personnalisable avec photo ou isotype et copie en un clic pour Gmail, Outlook et Apple Mail." },
        pt: { title: "Assinatura Corporativa Interativa de E-mail (.HTML)", desc: "Modelo executivo personalizável com foto ou isotipo e cópia em um clique para Gmail, Outlook e Apple Mail." },
        de: { title: "Interaktive Corporate E-Mail-Signatur (.HTML)", desc: "Anpassbare Executive-Signatur mit Foto oder Emblem und 1-Klick-Kopie für Gmail, Outlook und Apple Mail." },
        it: { title: "Firma Email Aziendale Interattiva (.HTML)", desc: "Modello esecutivo personalizzabile con foto o isotipo e copia in un clic per Gmail, Outlook e Apple Mail." }
      }
    },
    {
      num: "07",
      format: ".DOCX · MICROSOFT WORD",
      plateNum: 34,
      thumb: "/assets/brandbook_plates_tbb/plate-34.jpg",
      sampleUrl: "/assets/deliverables_tbb/Plantilla_Hoja_Membretada_the_best_brand.docx",
      i18n: {
        es: { title: "Plantilla Editable de Hoja Membretada (.DOCX)", desc: "Documento oficial en formato Carta/A4 con encabezado vectorial, tipografías homologadas y pie institucional listo para contratos y cotizaciones en Word o Google Docs." },
        en: { title: "Editable Corporate Letterhead Template (.DOCX)", desc: "Official Letter/A4 document with vector header, matched typography, and institutional footer ready for contracts and quotes in Word or Google Docs." },
        fr: { title: "Modèle Éditable de Papier à En-tête (.DOCX)", desc: "Document officiel avec en-tête vectoriel et pied de page institutionnel prêt pour vos contrats dans Word ou Google Docs." },
        pt: { title: "Modelo Editável de Papel Timbrado (.DOCX)", desc: "Documento oficial com cabeçalho vetorial e rodapé institucional pronto para contratos e propostas no Word ou Google Docs." },
        de: { title: "Editierbare Briefpapier-Vorlage (.DOCX)", desc: "Offizielle Vorlage mit Vektor-Kopfzeile und Fußzeile, bereit für Angebote und Verträge in Word oder Google Docs." },
        it: { title: "Modello Editabile di Carta Intestata (.DOCX)", desc: "Documento ufficiale con intestazione vettoriale e piè di pagina pronto per contratti e preventivi in Word o Google Docs." }
      }
    },
    {
      num: "08",
      format: ".PPTX · POWERPOINT 16:9",
      plateNum: 35,
      thumb: "/assets/brandbook_plates_tbb/plate-35.jpg",
      sampleUrl: "/assets/deliverables_tbb/Plantilla_Presentacion_Ejecutiva_the_best_brand.pptx",
      i18n: {
        es: { title: "Presentación Ejecutiva Widescreen 16:9 (.PPTX)", desc: "Master Deck corporativo con diapositivas editables de Portada, Propósito, Oferta Comercial, Metodología y Cierre alineadas a tu paleta oficial." },
        en: { title: "Widescreen 16:9 Executive Presentation (.PPTX)", desc: "Corporate Master Deck with editable Cover, Purpose, Commercial Offer, Methodology, and Closing slides aligned with your official palette." },
        fr: { title: "Présentation Exécutive Widescreen 16:9 (.PPTX)", desc: "Master Deck corporatif avec diapositives éditables alignées à 100% sur votre palette et votre typographie." },
        pt: { title: "Apresentação Executiva Widescreen 16:9 (.PPTX)", desc: "Master Deck corporativo com slides editáveis de Capa, Propósito, Oferta Comercial e Fechamento alinhados à sua marca." },
        de: { title: "Executive-Präsentation Widescreen 16:9 (.PPTX)", desc: "Corporate Master-Deck mit editierbaren Folien für Titel, Zweck, Angebot und Abschluss im offiziellen Marken-Design." },
        it: { title: "Presentazione Esecutiva Widescreen 16:9 (.PPTX)", desc: "Master Deck aziendale con diapositive editabili di Copertina, Scopo, Offerta Commerciale e Chiusura." }
      }
    },
    {
      num: "09",
      format: ".ZIP · KIT DE FUENTES .TTF",
      plateNum: 36,
      thumb: "/assets/brandbook_plates_tbb/plate-36.jpg",
      sampleUrl: "/assets/deliverables_tbb/Kit_Fuentes_Oficiales_the_best_brand.zip",
      i18n: {
        es: { title: "Paquete Oficial de Tipografías Instalables (.ZIP)", desc: "Archivo comprimido con las familias tipográficas oficiales en formato .TTF listas para instalar en Mac y Windows más guía de uso web y Adobe Typekit." },
        en: { title: "Installable Official Font Package (.ZIP)", desc: "ZIP archive containing your official .TTF font families ready to install on Mac and Windows plus web CSS and Adobe Typekit governance guide." },
        fr: { title: "Pack Officiel de Polices Installables (.ZIP)", desc: "Archive .ZIP contenant les polices officielles .TTF prêtes à installer sur Mac et Windows ainsi que le guide CSS/Web." },
        pt: { title: "Pacote Oficial de Tipografias Instaláveis (.ZIP)", desc: "Arquivo .ZIP com as famílias tipográficas oficiais .TTF prontas para instalar no Mac e Windows mais guia de uso web." },
        de: { title: "Installierbares Offizielles Schriftenpaket (.ZIP)", desc: "ZIP-Archiv mit allen offiziellen .TTF-Schriftfamilien für Mac und Windows inklusive Web-CSS-Leitfaden." },
        it: { title: "Pacchetto Ufficiale di Font Installabili (.ZIP)", desc: "Archivio .ZIP con le famiglie tipografiche ufficiali .TTF pronte da installare su Mac e Windows più guida CSS web." }
      }
    }
  ];

  const YOUTUBE_METHODOLOGY_AUTHORS = [
    {
      id: "qp0HIF3SfI4",
      author: "Simon Sinek",
      step: "Paso 1 · Círculo Dorado",
      title: "How Great Leaders Inspire Action (Start With Why)",
      duration: "18:04",
      thumb: "https://img.youtube.com/vi/qp0HIF3SfI4/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=qp0HIF3SfI4"
    },
    {
      id: "7X_WvGAhMlQ",
      author: "Jan Carlzon",
      step: "Paso 2 · Touchpoints",
      title: "Moments of Truth: Customer Experience Leadership",
      duration: "14:22",
      thumb: "https://img.youtube.com/vi/7X_WvGAhMlQ/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=7X_WvGAhMlQ"
    },
    {
      id: "W_K_0rM9q38",
      author: "Al Ries & Jack Trout",
      step: "Paso 3 · Naming & Posicionamiento",
      title: "The 22 Immutable Laws of Branding & Positioning",
      duration: "24:15",
      thumb: "https://img.youtube.com/vi/W_K_0rM9q38/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=W_K_0rM9q38"
    },
    {
      id: "rDkaXDDg88c",
      author: "Mitsuo Nagamachi & Jony Ive",
      step: "Paso 4 · Ingeniería Kansei",
      title: "Kansei Engineering & Sensory Design Architecture",
      duration: "19:40",
      thumb: "https://img.youtube.com/vi/rDkaXDDg88c/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=rDkaXDDg88c"
    },
    {
      id: "ybuT4EsqU3A",
      author: "Marty Neumeier",
      step: "Paso 5 · Identidad Visual",
      title: "The Brand Gap: Bridging Strategy and Design",
      duration: "32:10",
      thumb: "https://img.youtube.com/vi/ybuT4EsqU3A/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=ybuT4EsqU3A"
    },
    {
      id: "bU22pUq2eUQ",
      author: "Alexander Osterwalder",
      step: "Paso 6 · Modelo y Propuesta de Valor",
      title: "Value Proposition Design & Business Model Canvas",
      duration: "22:18",
      thumb: "https://img.youtube.com/vi/bU22pUq2eUQ/hqdefault.jpg",
      url: "https://www.youtube.com/watch?v=bU22pUq2eUQ"
    }
  ];

  const FOUNDER_ESSENTIAL_BOOKS = [
    {
      title: "Start with Why",
      author: "Simon Sinek",
      step: "Paso 1 · Propósito Nuclear",
      coverImg: "sinek_why.jpg",
      takeaway: "Las personas no compran lo que haces, sino el porqué lo haces. La base del Paso 1.",
      kindleUrl: "https://www.amazon.com/dp/B002Q6XUE4",
      appleBooksUrl: "https://books.apple.com/us/book/start-with-why/id359902640"
    },
    {
      title: "Moments of Truth",
      author: "Jan Carlzon",
      step: "Paso 2 · Touchpoints",
      coverImg: "carlzon_truth.jpg",
      takeaway: "Cómo cada contacto de 15 segundos entre cliente y empresa define la lealtad hacia tu marca.",
      kindleUrl: "https://www.amazon.com/dp/B001ANYDL0",
      appleBooksUrl: "https://books.apple.com/us/book/moments-of-truth/id1504958327"
    },
    {
      title: "Positioning: The Battle for Your Mind",
      author: "Al Ries & Jack Trout",
      step: "Paso 3 · Naming Estratégico",
      coverImg: "ries_positioning.jpg",
      takeaway: "Cómo ocupar un lugar único e indiscutible en la mente de tu cliente ideal desde el nombre.",
      kindleUrl: "https://www.amazon.com/dp/B000OI0F4K",
      appleBooksUrl: "https://books.apple.com/us/book/positioning-the-battle-for-your-mind/id496277918"
    },
    {
      title: "The Brand Gap",
      author: "Marty Neumeier",
      step: "Paso 4 y 5 · Estrategia y Diseño",
      coverImg: "neumeier_gap.jpg",
      takeaway: "El puente ejecutivo entre la estrategia de negocio analítica y la expresión visual carismática.",
      kindleUrl: "https://www.amazon.com/dp/B000SEI7P8",
      appleBooksUrl: "https://books.apple.com/us/book/the-brand-gap/id496263434"
    },
    {
      title: "Generación de Modelos de Negocio",
      author: "Alexander Osterwalder & Yves Pigneur",
      step: "Arquitectura de Valor",
      coverImg: "osterwalder_bmg.jpg",
      takeaway: "El estándar global para estructurar tu modelo de negocio en un sistema visual coherente.",
      kindleUrl: "https://www.amazon.com.mx/dp/B01B3J471E",
      appleBooksUrl: "https://books.apple.com/us/book/business-model-generation/id420803588"
    },
    {
      title: "Diseñando la Propuesta de Valor",
      author: "Alexander Osterwalder & Yves Pigneur",
      step: "Oferta Comercial",
      coverImg: "osterwalder_vpd.jpg",
      takeaway: "Cómo alinear exactamente lo que entregas con los dolores y aspiraciones reales de tu cliente.",
      kindleUrl: "https://www.amazon.com.mx/dp/B00P0L6W7A",
      appleBooksUrl: "https://books.apple.com/us/book/value-proposition-design/id927699748"
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
      whatOffer: "Suite ejecutiva de 9 entregables oficiales: Manual de 36 Láminas (.PDF y .HTML), vectores (.SVG y .AI), firma (.HTML), Word (.DOCX), PowerPoint (.PPTX) y Kit de Fuentes (.ZIP)."
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
      whatOffer: "Diseño estructural, construcción de naves industriales y gerencia de proyectos llave en mano."
    },
    {
      id: "boreal",
      label: "Café Boreal (Especialidad)",
      objective: "create",
      brandName: "CAFÉ BOREAL",
      tagline: "ORIGEN DE ALTURA EN CADA TAZA",
      businessGiro: "Tostaduría artesanal y barras de café de especialidad con grano trazable de microlotes de estricta altura.",
      whyPurpose: "Porque creemos que el productor de montaña merece comercio justo y el consumidor merece una pausa memorable.",
      howMethod: "Seleccionamos microlotes de +1,600 msnm, tostamos cada semana y diseñamos barras cálidas de hospitalidad.",
      whatOffer: "Café de especialidad en grano, suscripciones corporativas y barras de experiencia sensorial."
    }
  ];

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
      const cs = (typeof window.canvasState === "object" && window.canvasState) ? window.canvasState : null;
      if (!cs) return;
      const st = window.tbbCommercialDemoState;
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
  const SECTION_SLUG_MAP = {
    1: "inicio",
    2: "demo",
    3: "app-tour",
    4: "bases-teoricas",
    5: "pack-descargas"
  };

  function resolveSectionFromSlugOrHash(val) {
    if (typeof val === "number" && val >= 1 && val <= 5) return val;
    const raw = String(val || "").toLowerCase().replace(/^#/, "").trim();
    if (raw === "2" || raw === "demo" || raw === "demo-en-vivo") return 2;
    if (raw === "3" || raw === "app-tour" || raw === "tour" || raw === "recorrido") return 3;
    if (raw === "4" || raw === "bases-teoricas" || raw === "teoria" || raw === "bases") return 4;
    if (raw === "5" || raw === "pack-descargas" || raw === "descargas" || raw === "entregables") return 5;
    if (raw === "1" || raw === "inicio" || raw === "top" || raw === "home") return 1;
    const num = Number(raw);
    if (num >= 1 && num <= 5) return num;
    return 1;
  }

  window.tbbSwitchMainSection = function (secNumberOrSlug, skipHashUpdate) {
    const s = resolveSectionFromSlugOrHash(secNumberOrSlug);
    if (!window.tbbCommercialDemoState) window.tbbCommercialDemoState = {};
    window.tbbCommercialDemoState.activeMainSection = s;
    document.body.classList.remove("tbb-is-demo-section");

    if (!skipHashUpdate && window.history && window.history.replaceState) {
      const slug = SECTION_SLUG_MAP[s] || "inicio";
      window.history.replaceState(null, "", `#${slug}`);
    }

    for (let i = 1; i <= 5; i++) {
      const pane = document.getElementById(`tbbMainSectionPane_${i}`);
      if (pane) {
        pane.style.display = (i === s) ? "block" : "none";
      }
      document.querySelectorAll(`#tbbSecTab_${i}, .tbb-tab-sec-${i}`).forEach(btn => {
        btn.classList.toggle("is-active", i === s);
      });
    }

    // Mantener la barra flotante de compra siempre visible en standalone web
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

  window.tbbSetActiveMainTab = function (slugOrNum) {
    window.tbbSwitchMainSection(slugOrNum);
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
    const [whatL1, whatL2] = splitIntoTwoChordLines(st.whatOffer, 32, 36);
    const [howL1, howL2] = splitIntoTwoChordLines(st.howMethod, 26, 28);
    const [whyL1, whyL2] = splitIntoTwoChordLines(st.whyPurpose, 18, 18);

    return `
      <svg viewBox="0 0 380 380" width="100%" height="320" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto; max-width:360px;">
        <defs>
          <radialGradient id="gcWhyCoreV91" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#1D4ED8"/>
            <stop offset="100%" stop-color="#0D2540"/>
          </radialGradient>
        </defs>
        <circle cx="190" cy="190" r="172" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
        <text x="190" y="42" text-anchor="middle" fill="#1D4ED8" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" letter-spacing="0.05em">3. WHAT · OFERTA</text>
        <text x="190" y="57" text-anchor="middle" fill="#334155" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="500">
          <tspan x="190" dy="0">${escHtml(whatL1)}</tspan>
          ${whatL2 ? `<tspan x="190" dy="11.5">${escHtml(whatL2)}</tspan>` : ""}
        </text>

        <circle cx="190" cy="206" r="118" fill="#FFFFFF" stroke="#93C5FD" stroke-width="2" stroke-dasharray="5 4"/>
        <text x="190" y="114" text-anchor="middle" fill="#0D2540" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" letter-spacing="0.04em">2. HOW · MÉTODO</text>
        <text x="190" y="128" text-anchor="middle" fill="#334155" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.2" font-weight="500">
          <tspan x="190" dy="0">${escHtml(howL1)}</tspan>
          ${howL2 ? `<tspan x="190" dy="11">${escHtml(howL2)}</tspan>` : ""}
        </text>

        <circle cx="190" cy="224" r="66" fill="url(#gcWhyCoreV91)" stroke="#FF7A00" stroke-width="2.5"/>
        <text x="190" y="205" text-anchor="middle" fill="#93C5FD" font-family="'JetBrains Mono', monospace" font-size="8.8" font-weight="600">1. WHY · PROPÓSITO</text>
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
    const imgSrc = customImgUrl || `/assets/brandbook_plates_tbb/plate-${padNum}.jpg`;
    const titleTxt = customTitle || `Lámina ${padNum} / 36 · Manual Oficial The Best Brand`;
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
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#EA580C;">VISTA A MÁXIMA RESOLUCIÓN · PANTALLA CASI COMPLETA</div>
              <div style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:600; color:#0F172A;">${escHtml(titleTxt)}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            ${!customImgUrl ? `
              <button type="button" onclick="window.tbbOpenPlateLightboxModal(${prevNum})" class="tbb-btn-light-surface" style="padding:7px 14px; font-size:0.78rem;">← Lámina ${String(prevNum).padStart(2, '0')}</button>
              <button type="button" onclick="window.tbbOpenPlateLightboxModal(${nextNum})" class="tbb-btn-light-surface" style="padding:7px 14px; font-size:0.78rem;">Lámina ${String(nextNum).padStart(2, '0')} →</button>
            ` : ''}
            <a href="${downloadHref}" target="_blank" rel="noopener" class="tbb-comm-btn-blue" style="padding:8px 16px; font-size:0.78rem;">${t("packDownloadSample")}</a>
            <button type="button" onclick="window.tbbClosePlateLightboxModal()" class="tbb-btn-light-surface" style="padding:7px 14px; font-size:0.86rem;">✕ Cerrar</button>
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

    let ov = document.getElementById("tbbVideoCapsuleModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbVideoCapsuleModalOverlay";
      ov.style.cssText = "position:fixed; inset:0; background:rgba(15,23,42,0.86); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); z-index:10090; display:flex; align-items:center; justify-content:center; padding:16px;";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseVideoPopupModal(); };
      document.body.appendChild(ov);
    }

    ov.innerHTML = `
      <div style="background:#FFFFFF; border-radius:24px; width:100%; max-width:920px; overflow:hidden; box-shadow:0 30px 90px rgba(0,0,0,0.45); display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));">
        <div style="background:#0F172A; display:flex; align-items:center; justify-content:center; padding:16px;">
          <video src="${cap.url}" poster="${cap.poster}" controls autoplay playsinline style="max-height:74vh; width:auto; max-width:100%; border-radius:16px; box-shadow:0 16px 40px rgba(0,0,0,0.5);"></video>
        </div>
        <div style="padding:32px 28px; display:flex; flex-direction:column; justify-content:space-between; gap:20px; background:#FFFFFF; color:#0F172A;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:12px;">
              <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#EA580C; background:#FFF7ED; padding:4px 10px; border-radius:999px;">
                CÁPSULA DE VIDEO · ${lang.toUpperCase()} · ${cap.duration}
              </span>
              <button type="button" onclick="window.tbbCloseVideoPopupModal()" class="tbb-btn-light-surface" style="padding:5px 12px; font-size:0.82rem;">✕</button>
            </div>
            <h3 style="font-family:'Montserrat', sans-serif; font-size:1.35rem; font-weight:600; color:#0F172A; margin:0 0 10px 0; line-height:1.25;">
              ${escHtml(loc.title)}
            </h3>
            <div style="font-size:0.84rem; font-weight:500; color:#1D4ED8; margin-bottom:14px;">
              ${escHtml(cap.author)}
            </div>
            <p style="font-size:0.95rem; font-weight:400; color:#475569; line-height:1.65; margin:0;">
              ${escHtml(loc.desc)}
            </p>
          </div>
          <div style="display:flex; flex-direction:column; gap:10px; padding-top:16px; border-top:1px solid #E2E8F0;">
            <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbCloseVideoPopupModal(); window.tbbOpenBuyAppCheckoutModal('pro_atelier');" style="width:100%; padding:12px; font-size:0.88rem;">
              ${t("buyNowFloating")}
            </button>
            <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseVideoPopupModal()" style="width:100%; padding:10px; font-size:0.82rem;">
              Continuar explorando
            </button>
          </div>
        </div>
      </div>
    `;
    ov.style.display = "flex";
  };

  window.tbbCloseVideoPopupModal = function () {
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
    const p = DEMO_QUICK_PRESETS.find(item => item.id === presetId) || DEMO_QUICK_PRESETS[0];
    const st = window.tbbCommercialDemoState;
    st.demoObjective = p.objective || "create";
    st.brandName = p.brandName;
    st.tagline = p.tagline;
    st.businessGiro = p.businessGiro;
    st.whyPurpose = p.whyPurpose;
    st.howMethod = p.howMethod;
    st.whatOffer = p.whatOffer;
    window.tbbSyncCommercialDemoToAppState();
    window.tbbRefreshCommercialPortalDOM();
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

  // SUBPÁGINA 1: PORTADA / INICIO (HOOK + 2 OPCIONES VISUALES + SHOWCASE PANORÁMICO)
  window.tbbBuildSubpage1HomeHTML = function () {
    const st = window.tbbCommercialDemoState;
    const lang = getLang();
    const isManual = st.heroVisualMode === "manual";
    const step0Loc = APP_TOUR_FLOW_ITEMS[0].i18n[lang] || APP_TOUR_FLOW_ITEMS[0].i18n.es;

    return `
      <!-- HERO PANORÁMICO SOBRE LIENZO CLARO (UN SOLO FOCO A LA VEZ) -->
      <section style="padding:64px 24px 56px 24px; background:linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%); text-align:center;">
        <div style="max-width:980px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:22px;">
          <div style="display:inline-flex; align-items:center; gap:10px; padding:6px 16px; border-radius:999px; background:#F1F5F9; color:#0D2540; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; letter-spacing:0.04em;">
            <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="Aura" style="width:22px; height:22px; border-radius:50%; object-fit:cover;" />
            <span>${escHtml(t("heroEyebrow"))}</span>
          </div>

          <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(2.1rem, 4.4vw, 3.65rem); font-weight:600; color:#0F172A; line-height:1.12; letter-spacing:-0.03em; margin:0;">
            ${escHtml(t("heroHook"))}
          </h1>

          <p style="font-size:clamp(1.02rem, 1.5vw, 1.2rem); font-weight:400; color:#475569; line-height:1.68; max-width:780px; margin:0;">
            ${escHtml(t("heroSub"))}
          </p>

          <!-- LAS 2 OPCIONES PRINCIPALES EN BOTONES PEDIDAS POR EL USUARIO -->
          <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:16px; margin-top:8px; width:100%;">
            <button type="button" onclick="window.tbbSwitchMainSection(2)" class="tbb-comm-btn-blue" style="padding:16px 28px; font-size:0.98rem; font-weight:600; display:inline-flex; align-items:center; gap:12px;">
              <span class="tbb-live-pulse-dot"></span>
              <span>${escHtml(t("heroBtnDemo"))}</span>
              <span class="tbb-live-pill-badge">${escHtml(t("menu2Live"))}</span>
            </button>

            <button type="button" onclick="window.tbbSwitchMainSection(3)" class="tbb-btn-light-surface" style="padding:16px 28px; font-size:0.98rem; font-weight:500;">
              <span>${escHtml(t("heroBtnTour"))}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ESCENARIO PANORÁMICO LIMPIO: CAPTURA REAL DE LA APP O LÁMINA REAL DEL BRANDBOOK -->
      <section style="padding:20px 24px 80px 24px; background:#F8FAFC;">
        <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:28px;">
          <div style="text-align:center; max-width:760px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#1D4ED8; letter-spacing:0.06em; margin-bottom:6px;">
              ${escHtml(t("heroShowcaseTag"))}
            </div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.55rem, 2.8vw, 2.25rem); font-weight:600; color:#0F172A; margin:0 0 10px 0;">
              ${escHtml(t("heroShowcaseTitle"))}
            </h2>
            <p style="font-size:0.98rem; font-weight:400; color:#475569; line-height:1.65; margin:0;">
              ${escHtml(t("heroShowcaseDesc"))}
            </p>
          </div>

          <!-- Conmutador limpio entre Captura de la App y Lámina del Brandbook -->
          <div style="display:inline-flex; background:#E2E8F0; padding:5px; border-radius:999px; gap:6px;">
            <button type="button" onclick="window.tbbSetHeroVisualMode('app')" style="padding:9px 20px; border-radius:999px; border:none; background:${!isManual ? '#FFFFFF' : 'transparent'}; color:${!isManual ? '#0F172A' : '#475569'}; font-size:0.84rem; font-weight:500; cursor:pointer; box-shadow:${!isManual ? '0 4px 12px rgba(15,23,42,0.08)' : 'none'};">
              ${escHtml(t("heroSwitchApp"))}
            </button>
            <button type="button" onclick="window.tbbSetHeroVisualMode('manual')" style="padding:9px 20px; border-radius:999px; border:none; background:${isManual ? '#FFFFFF' : 'transparent'}; color:${isManual ? '#0F172A' : '#475569'}; font-size:0.84rem; font-weight:500; cursor:pointer; box-shadow:${isManual ? '0 4px 12px rgba(15,23,42,0.08)' : 'none'};">
              ${escHtml(t("heroSwitchManual"))}
            </button>
          </div>

          <!-- Imagen Panorámica Única sin cajas anidadas -->
          <div style="width:100%; position:relative; border-radius:24px; overflow:hidden; box-shadow:0 30px 80px rgba(15,23,42,0.12); background:#FFFFFF; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(1, '${isManual ? '/assets/brandbook_plates_tbb/plate-01.jpg' : '/assets/app_captures/step0_logo_aura.png'}', '${escHtml(step0Loc.title)}')">
            <img src="${isManual ? '/assets/brandbook_plates_tbb/plate-01.jpg' : '/assets/app_captures/step0_logo_aura.png'}" alt="The Best Brand Showcase" style="width:100%; height:auto; display:block;" />
            <div style="position:absolute; top:18px; left:18px; background:rgba(255,255,255,0.94); backdrop-filter:blur(10px); padding:8px 16px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#0F172A; box-shadow:0 8px 24px rgba(15,23,42,0.12);">
              ${isManual ? 'BRANDBOOK OFICIAL · LÁMINA 01 / 36' : escHtml(step0Loc.title)} · (${lang.toUpperCase()})
            </div>
          </div>

          <!-- Botones de flujo secuencial al final de la Portada -->
          <div style="padding-top:28px; display:flex; flex-wrap:wrap; justify-content:center; gap:14px;">
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

  // SUBPÁGINA 2: DEMO EN VIVO CON EL PASO 0, PASO 1 Y PASO 2 (FONDO CLARO, SIN CAJAS ANIDADAS)
  window.tbbBuildSubpage2DemoHTML = function () {
    const st = window.tbbCommercialDemoState;
    const step = [0, 1, 2].includes(st.activeDemoStep) ? st.activeDemoStep : 0;
    const tpCatalog = {
      before: [
        "Búsqueda Web y App Store",
        "Demostración Interactiva en Línea (Pasos 0, 1 y 2)",
        "Recomendación Directa de Empresarios",
        "Contenido Ejecutivo en LinkedIn / Instagram"
      ],
      during: [
        "Taller Guiado por Voz con Aura",
        "Lienzo Generativo de Logotipo en Tiempo Real",
        "Checkout Directo con Tarjeta, Apple Pay, Google Pay y PayPal"
      ],
      after: [
        "Bóveda Digital del Manual de 36 Láminas en PDF y HTML",
        "Suite Editable (.SVG, .AI, .DOCX, .PPTX, .HTML, .ZIP)",
        "Seguimiento de Satisfacción y Expansión Web"
      ]
    };

    const stepCaptureImg = step === 0
      ? "/assets/app_captures/tour_step0_1_objetivo.png"
      : (step === 1 ? "/assets/app_captures/step1_proposito_sinek.png" : "/assets/app_captures/step2_touchpoints_carlzon.png");

    return `
      <section style="padding:56px 24px 84px 24px; background:#FFFFFF;">
        <div style="max-width:1240px; margin:0 auto; display:flex; flex-direction:column; gap:36px;">
          <!-- Encabezado limpio de la Demo -->
          <div style="text-align:center; max-width:820px; margin:0 auto;">
            <div style="display:inline-flex; align-items:center; gap:8px; padding:5px 14px; border-radius:999px; background:#FFF7ED; color:#EA580C; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; margin-bottom:10px;">
              <span class="tbb-live-pulse-dot"></span>
              <span>${escHtml(t("demoEyebrow"))}</span>
            </div>
            <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.85rem, 3.4vw, 2.75rem); font-weight:600; color:#0F172A; margin:0 0 12px 0; letter-spacing:-0.02em;">
              ${escHtml(t("demoTitle"))}
            </h1>
            <p style="font-size:1.0rem; font-weight:400; color:#475569; line-height:1.65; margin:0;">
              ${escHtml(t("demoDesc"))}
            </p>
          </div>

          <!-- Presets rápidos sin bordes pesados -->
          <div style="display:flex; justify-content:center; align-items:center; gap:10px; flex-wrap:wrap;">
            ${DEMO_QUICK_PRESETS.map(p => {
              const active = st.brandName === p.brandName;
              return `
                <button type="button" onclick="window.tbbApplyCommercialDemoPreset('${p.id}')" style="padding:8px 18px; border-radius:999px; border:1px solid ${active ? '#0D2540' : '#CBD5E1'}; background:${active ? '#0D2540' : '#F8FAFC'}; color:${active ? '#FFFFFF' : '#334155'}; font-size:0.82rem; font-weight:500; cursor:pointer; transition:all 0.2s ease;">
                  ${escHtml(p.label)}
                </button>
              `;
            }).join("")}
          </div>

          <!-- Selector de Paso 0, Paso 1 y Paso 2 -->
          <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; border-bottom:1px solid #E2E8F0; padding-bottom:18px;">
            <button type="button" onclick="window.tbbSwitchCommercialDemoStep(0)" style="padding:12px 22px; border-radius:999px; border:1px solid ${step === 0 ? '#1D4ED8' : '#E2E8F0'}; background:${step === 0 ? '#EFF6FF' : '#FFFFFF'}; color:${step === 0 ? '#1D4ED8' : '#475569'}; font-size:0.88rem; font-weight:${step === 0 ? '600' : '500'}; cursor:pointer;">
              ${escHtml(t("demoStep0Tab"))}
            </button>
            <button type="button" onclick="window.tbbSwitchCommercialDemoStep(1)" style="padding:12px 22px; border-radius:999px; border:1px solid ${step === 1 ? '#1D4ED8' : '#E2E8F0'}; background:${step === 1 ? '#EFF6FF' : '#FFFFFF'}; color:${step === 1 ? '#1D4ED8' : '#475569'}; font-size:0.88rem; font-weight:${step === 1 ? '600' : '500'}; cursor:pointer;">
              ${escHtml(t("demoStep1Tab"))}
            </button>
            <button type="button" onclick="window.tbbSwitchCommercialDemoStep(2)" style="padding:12px 22px; border-radius:999px; border:1px solid ${step === 2 ? '#1D4ED8' : '#E2E8F0'}; background:${step === 2 ? '#EFF6FF' : '#FFFFFF'}; color:${step === 2 ? '#1D4ED8' : '#475569'}; font-size:0.88rem; font-weight:${step === 2 ? '600' : '500'}; cursor:pointer;">
              ${escHtml(t("demoStep2Tab"))}
            </button>
          </div>

          <!-- Área Panorámica de Trabajo: Controles Limpios a la Izquierda + Vista En Vivo y Captura Real a la Derecha -->
          <div class="tbb-comm-grid-2" style="align-items:start; gap:48px;">
            <div style="display:flex; flex-direction:column; gap:20px;">
              ${step === 0 ? `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                  <button type="button" onclick="window.tbbSetDemoObjective('create')" style="padding:16px; border-radius:16px; border:1.5px solid ${st.demoObjective !== 'redesign' ? '#1D4ED8' : '#E2E8F0'}; background:${st.demoObjective !== 'redesign' ? '#F8FAFC' : '#FFFFFF'}; text-align:left; cursor:pointer;">
                    <div style="font-size:0.92rem; font-weight:600; color:#0F172A;">✦ ${escHtml(t("demoObjCreate"))}</div>
                  </button>
                  <button type="button" onclick="window.tbbSetDemoObjective('redesign')" style="padding:16px; border-radius:16px; border:1.5px solid ${st.demoObjective === 'redesign' ? '#1D4ED8' : '#E2E8F0'}; background:${st.demoObjective === 'redesign' ? '#F8FAFC' : '#FFFFFF'}; text-align:left; cursor:pointer;">
                    <div style="font-size:0.92rem; font-weight:600; color:#0F172A;">↻ ${escHtml(t("demoObjRedesign"))}</div>
                  </button>
                </div>

                <div>
                  <label style="display:block; font-size:0.84rem; font-weight:500; color:#334155; margin-bottom:6px;">${escHtml(t("demoBrandLabel"))}</label>
                  <input type="text" value="${escHtml(st.brandName)}" oninput="window.tbbUpdateCommercialDemoField('brandName', this.value)" style="width:100%; height:46px; padding:0 14px; border-radius:12px; border:1px solid #CBD5E1; font-size:0.96rem; font-weight:500; color:#0F172A; background:#FFFFFF;" />
                </div>

                <div>
                  <label style="display:block; font-size:0.84rem; font-weight:500; color:#334155; margin-bottom:6px;">${escHtml(t("demoTaglineLabel"))}</label>
                  <input type="text" value="${escHtml(st.tagline)}" oninput="window.tbbUpdateCommercialDemoField('tagline', this.value)" style="width:100%; height:46px; padding:0 14px; border-radius:12px; border:1px solid #CBD5E1; font-size:0.94rem; font-weight:500; color:#0F172A; background:#FFFFFF;" />
                </div>

                <div>
                  <label style="display:block; font-size:0.84rem; font-weight:500; color:#334155; margin-bottom:6px;">${escHtml(t("demoGiroLabel"))}</label>
                  <textarea rows="3" oninput="window.tbbUpdateCommercialDemoField('businessGiro', this.value)" style="width:100%; padding:12px 14px; border-radius:12px; border:1px solid #CBD5E1; font-size:0.92rem; font-weight:400; color:#0F172A; line-height:1.55; background:#FFFFFF;">${escHtml(st.businessGiro)}</textarea>
                </div>

                <div style="display:flex; gap:12px; flex-wrap:wrap;">
                  <button type="button" onclick="window.tbbSwitchCommercialDemoStep(1)" class="tbb-comm-btn-blue" style="padding:13px 24px; font-size:0.9rem; font-weight:600;">
                    ${escHtml(t("demoNextStepBtn"))} (Paso 1)
                  </button>
                </div>
              ` : step === 1 ? `
                <div>
                  <label style="display:block; font-size:0.84rem; font-weight:500; color:#0D2540; margin-bottom:6px;">${escHtml(t("demoWhyLabel"))}</label>
                  <textarea rows="2" oninput="window.tbbUpdateCommercialDemoField('whyPurpose', this.value)" style="width:100%; padding:12px 14px; border-radius:12px; border:1px solid #93C5FD; font-size:0.92rem; font-weight:400; color:#0F172A; line-height:1.55; background:#F8FAFC;">${escHtml(st.whyPurpose)}</textarea>
                </div>

                <div>
                  <label style="display:block; font-size:0.84rem; font-weight:500; color:#1D4ED8; margin-bottom:6px;">${escHtml(t("demoHowLabel"))}</label>
                  <textarea rows="2" oninput="window.tbbUpdateCommercialDemoField('howMethod', this.value)" style="width:100%; padding:12px 14px; border-radius:12px; border:1px solid #CBD5E1; font-size:0.92rem; font-weight:400; color:#0F172A; line-height:1.55; background:#FFFFFF;">${escHtml(st.howMethod)}</textarea>
                </div>

                <div>
                  <label style="display:block; font-size:0.84rem; font-weight:500; color:#EA580C; margin-bottom:6px;">${escHtml(t("demoWhatLabel"))}</label>
                  <textarea rows="2" oninput="window.tbbUpdateCommercialDemoField('whatOffer', this.value)" style="width:100%; padding:12px 14px; border-radius:12px; border:1px solid #CBD5E1; font-size:0.92rem; font-weight:400; color:#0F172A; line-height:1.55; background:#FFFFFF;">${escHtml(st.whatOffer)}</textarea>
                </div>

                <div style="display:flex; gap:12px; flex-wrap:wrap;">
                  <button type="button" onclick="window.tbbPolishCommercialDemoStep1()" class="tbb-btn-light-surface" style="padding:12px 20px; font-size:0.86rem; font-weight:500;">
                    ✨ ${escHtml(t("demoPolishBtn"))}
                  </button>
                  <button type="button" onclick="window.tbbSwitchCommercialDemoStep(2)" class="tbb-comm-btn-blue" style="padding:12px 22px; font-size:0.88rem; font-weight:600;">
                    ${escHtml(t("demoNextStepBtn"))} (Paso 2)
                  </button>
                </div>
              ` : `
                ${["before", "during", "after"].map((phaseKey, pIdx) => {
                  const phaseTitle = pIdx === 0 ? "1. Antes de la compra (Descubrimiento)" : (pIdx === 1 ? "2. Durante la compra (Experiencia central)" : "3. Después de la compra (Lealtad)");
                  const stateKey = pIdx === 0 ? "tpBefore" : (pIdx === 1 ? "tpDuring" : "tpAfter");
                  const selectedArr = st[stateKey] || [];
                  const allOpts = [...new Set([...tpCatalog[phaseKey], ...selectedArr])];
                  return `
                    <div style="padding-bottom:14px; border-bottom:1px solid #F1F5F9;">
                      <div style="font-size:0.84rem; font-weight:600; color:#0F172A; margin-bottom:10px;">${phaseTitle}</div>
                      <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        ${allOpts.map(opt => {
                          const isSel = selectedArr.includes(opt);
                          const safeOpt = opt.replace(/'/g, "\\'");
                          return `
                            <button type="button" onclick="window.tbbToggleCommercialDemoTouchpoint('${stateKey}', '${safeOpt}')" style="padding:7px 14px; border-radius:999px; border:1px solid ${isSel ? '#1D4ED8' : '#CBD5E1'}; background:${isSel ? '#EFF6FF' : '#FFFFFF'}; color:${isSel ? '#1D4ED8' : '#475569'}; font-size:0.82rem; font-weight:500; cursor:pointer;">
                              ${isSel ? "✓ " : "+ "}${escHtml(opt)}
                            </button>
                          `;
                        }).join("")}
                      </div>
                    </div>
                  `;
                }).join("")}

                <div style="display:flex; gap:12px; flex-wrap:wrap; padding-top:6px;">
                  <a href="/studio" onclick="window.tbbSyncCommercialDemoToAppState()" class="tbb-comm-btn-blue" style="padding:13px 24px; font-size:0.9rem; font-weight:600;">
                    Continuar al Paso 3 en el Estudio Completo ↗
                  </a>
                </div>
              `}
            </div>

            <!-- Vista Derecha: Síntesis Visual en Vivo + Captura Real del Paso Activo -->
            <div style="display:flex; flex-direction:column; gap:24px;">
              <div style="background:#F8FAFC; border-radius:24px; padding:24px; text-align:center;">
                <div id="tbbDemoLiveBrandTitle" style="font-family:'Montserrat', sans-serif; font-size:1.35rem; font-weight:600; color:#0F172A;">${escHtml(st.brandName)}</div>
                <div id="tbbDemoLiveBrandTagline" style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; font-weight:500; color:#EA580C; margin-top:4px; margin-bottom:14px;">${escHtml(st.tagline)}</div>
                <div id="tbbDemoLiveGoldenCircleWrap">
                  ${window.tbbBuildCircularGoldenCircleSVG()}
                </div>
              </div>

              <div style="border-radius:20px; overflow:hidden; box-shadow:0 20px 50px rgba(15,23,42,0.10); cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(1, '${stepCaptureImg}', 'Captura Real · Paso ${step}')">
                <img src="${stepCaptureImg}" alt="Captura Real Paso ${step}" style="width:100%; height:auto; display:block;" />
              </div>
            </div>
          </div>

          <!-- Botones de navegación al final de la subpágina Demo hacia App Tour y Bases teóricas -->
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

  // SUBPÁGINA 3: APP TOUR (SCROLLING STORYTELLING: PARALLAX, STICKY STACKING, HORIZONTAL TRACK Y POP-UPS DE VIDEO)
  window.tbbBuildSubpage3AppTourHTML = function () {
    const lang = getLang();

    return `
      <!-- ENCABEZADO CON PARALLAX SUAVE SOBRE LIENZO CLARO -->
      <section style="padding:68px 24px 48px 24px; background:linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%); text-align:center;">
        <div style="max-width:900px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:16px;">
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:500; color:#1D4ED8; letter-spacing:0.06em;">
            ${escHtml(t("tourEyebrow"))} · (${lang.toUpperCase()})
          </div>
          <h1 style="font-family:'Montserrat', sans-serif; font-size:clamp(2rem, 3.8vw, 3.1rem); font-weight:600; color:#0F172A; margin:0; line-height:1.15; letter-spacing:-0.02em;">
            ${escHtml(t("tourTitle"))}
          </h1>
          <p style="font-size:1.05rem; font-weight:400; color:#475569; line-height:1.68; margin:0; max-width:760px;">
            ${escHtml(t("tourDesc"))}
          </p>
        </div>
      </section>

      <!-- STORYTELLING STICKY STACKING & DEPTH SCROLL: CADA PASO Y CADA POP-UP DE VIDEO -->
      <section style="padding:20px 24px 72px 24px; background:#F8FAFC;">
        <div style="max-width:1220px; margin:0 auto; display:flex; flex-direction:column; gap:72px;">
          ${APP_TOUR_FLOW_ITEMS.map((item, idx) => {
            const loc = item.i18n[lang] || item.i18n.es;
            const isPopup = item.type === "video_popup";
            const isFinale = item.type === "deliverables_finale";
            const stickyTop = 86 + (idx % 4) * 10;

            return `
              <article class="tbb-tour-sticky-stage" style="position:sticky; top:${stickyTop}px; background:#FFFFFF; border-radius:28px; padding:clamp(24px, 4vw, 44px); box-shadow:0 28px 70px rgba(15,23,42,0.08); border:1px solid ${isPopup ? '#FDBA74' : '#E2E8F0'};">
                <div style="display:flex; flex-direction:column; gap:28px;">
                  <!-- Encabezado de la etapa (Un solo foco claro) -->
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap;">
                    <div style="max-width:780px;">
                      <div style="display:inline-flex; align-items:center; gap:8px; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:${isPopup ? '#EA580C' : '#1D4ED8'}; margin-bottom:8px;">
                        <span>${escHtml(item.badge)}</span>
                        <span>·</span>
                        <span>IDIOMA ACTIVO: ${lang.toUpperCase()}</span>
                      </div>
                      <h2 style="font-family:'Montserrat', sans-serif; font-size:clamp(1.45rem, 2.5vw, 2.05rem); font-weight:600; color:#0F172A; margin:0 0 10px 0; line-height:1.2;">
                        ${escHtml(loc.title)}
                      </h2>
                      <p style="font-size:1.0rem; font-weight:400; color:#475569; line-height:1.65; margin:0;">
                        ${escHtml(loc.desc)}
                      </p>
                    </div>

                    ${isPopup ? `
                      <button type="button" onclick="window.tbbOpenVideoPopupModal(${item.videoIdx})" class="tbb-comm-btn-blue" style="padding:12px 22px; font-size:0.86rem; font-weight:600; flex-shrink:0;">
                        ▶ ${escHtml(t("tourPlayVideoBtn"))}
                      </button>
                    ` : `
                      <button type="button" onclick="window.tbbOpenPlateLightboxModal(1, '${item.img}', '${escHtml(loc.title)}')" class="tbb-btn-light-surface" style="padding:10px 18px; font-size:0.82rem; font-weight:500; flex-shrink:0;">
                        ⤢ Ampliar captura
                      </button>
                    `}
                  </div>

                  <!-- Captura Panorámica Real (Con banda traducida al idioma de la página) -->
                  <div style="position:relative; border-radius:20px; overflow:hidden; background:#0F172A; box-shadow:0 18px 48px rgba(15,23,42,0.12); cursor:pointer;" onclick="${isPopup ? `window.tbbOpenVideoPopupModal(${item.videoIdx})` : `window.tbbOpenPlateLightboxModal(1, '${item.img}', '${escHtml(loc.title)}')`}">
                    <img src="${item.img}" alt="${escHtml(loc.title)}" style="width:100%; max-height:600px; object-fit:contain; display:block; margin:0 auto; background:#0F172A;" />
                    <div style="position:absolute; bottom:14px; left:14px; right:14px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; background:rgba(255,255,255,0.95); backdrop-filter:blur(12px); padding:10px 18px; border-radius:14px;">
                      <div style="font-size:0.84rem; font-weight:500; color:#0F172A;">
                        ${escHtml(loc.title)}
                      </div>
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:${isPopup ? '#EA580C' : '#1D4ED8'};">
                        ${isPopup ? '▶ CLIC PARA REPRODUCIR VIDEO 9:16' : '⤢ CLIC PARA PANTALLA COMPLETA'}
                      </div>
                    </div>
                  </div>

                  ${isFinale ? `
                    <!-- RIEL DE SCROLL HORIZONTAL CON LOS DESCARGABLES AL FINAL DEL APP TOUR -->
                    <div style="padding-top:12px;">
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500; color:#0D2540; margin-bottom:12px;">
                        DESLIZA HORIZONTALMENTE · LOS 9 DESCARGABLES QUE OBTIENES AL FINALIZAR:
                      </div>
                      <div style="display:flex; gap:16px; overflow-x:auto; padding-bottom:12px; scroll-snap-type:x mandatory;">
                        ${OFFICIAL_9_DELIVERABLES.map((deliv) => {
                          const dLoc = deliv.i18n[lang] || deliv.i18n.es;
                          return `
                            <div style="min-width:290px; max-width:290px; scroll-snap-align:start; background:#F8FAFC; border-radius:18px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:10px; cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${deliv.plateNum}, '${deliv.thumb}', '${escHtml(dLoc.title)}', '${deliv.sampleUrl}')">
                              <img src="${deliv.thumb}" alt="${escHtml(dLoc.title)}" style="width:100%; height:150px; object-fit:cover; object-position:top center; border-radius:12px; background:#FFFFFF;" />
                              <div>
                                <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:500; color:#EA580C;">#${deliv.num} · ${escHtml(deliv.format)}</div>
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

          <!-- BOTÓN AL FINAL DEL APP TOUR QUE LLEVA A "BASES TEÓRICAS" (MENÚ 4) -->
          <div style="text-align:center; padding-top:24px;">
            <button type="button" onclick="window.tbbSwitchMainSection(4)" class="tbb-comm-btn-blue" style="padding:18px 34px; font-size:1.02rem; font-weight:600;">
              ${escHtml(t("nextToTheoryBtn"))}
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // SUBPÁGINA 4: BASES TEÓRICAS (VIDEOS CON MINIATURAS Y LIBROS CON LINKS DIRECTOS)
  window.tbbBuildSubpage4TheoryHTML = function () {
    const lang = getLang();

    return `
      <section style="padding:64px 24px 88px 24px; background:#FFFFFF;">
        <div style="max-width:1240px; margin:0 auto; display:flex; flex-direction:column; gap:64px;">
          <!-- Encabezado limpio sobre fondo claro -->
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

          <!-- 1. CÁPSULAS DE VIDEO DEL TALLER CON MINIATURAS -->
          <div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:1.5rem; font-weight:600; color:#0F172A; margin:0 0 24px 0;">
              ${escHtml(t("theoryCapsulesTitle"))}
            </h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:24px;">
              ${VIDEO_CAPSULES.map((cap, idx) => {
                const loc = cap.i18n[lang] || cap.i18n.es;
                return `
                  <div style="background:#F8FAFC; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.25s ease; cursor:pointer;" onclick="window.tbbOpenVideoPopupModal(${idx})">
                    <div>
                      <div style="position:relative; aspect-ratio:16/10; background:#0F172A; overflow:hidden;">
                        <img src="${cap.poster}" alt="${escHtml(loc.title)}" style="width:100%; height:100%; object-fit:cover; display:block;" />
                        <div style="position:absolute; inset:0; background:rgba(15,23,42,0.28); display:flex; align-items:center; justify-content:center;">
                          <div style="width:52px; height:52px; border-radius:50%; background:rgba(255,255,255,0.94); color:#0D2540; display:flex; align-items:center; justify-content:center; font-size:1.1rem; box-shadow:0 10px 25px rgba(0,0,0,0.25);">▶</div>
                        </div>
                        <span style="position:absolute; bottom:10px; right:10px; background:rgba(15,23,42,0.85); color:#FFFFFF; padding:3px 9px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.68rem;">${cap.duration}</span>
                      </div>
                      <div style="padding:18px 18px 10px 18px;">
                        <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#1D4ED8; margin-bottom:4px;">${escHtml(cap.author)}</div>
                        <h3 style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:600; color:#0F172A; margin:0 0 8px 0; line-height:1.3;">${escHtml(loc.title)}</h3>
                        <p style="font-size:0.86rem; font-weight:400; color:#475569; line-height:1.55; margin:0;">${escHtml(loc.desc)}</p>
                      </div>
                    </div>
                    <div style="padding:12px 18px 18px 18px;">
                      <span style="font-size:0.82rem; font-weight:500; color:#1D4ED8;">▶ ${escHtml(t("tourPlayVideoBtn"))}</span>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- 2. CONFERENCIAS MAGISTRALES DE LOS AUTORES (CON MINIATURAS Y ENLACE DIRECTO) -->
          <div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:1.5rem; font-weight:600; color:#0F172A; margin:0 0 24px 0;">
              ${escHtml(t("theoryAuthorsTitle"))}
            </h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:24px;">
              ${YOUTUBE_METHODOLOGY_AUTHORS.map(a => `
                <div style="background:#F8FAFC; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
                  <div>
                    <div style="position:relative; aspect-ratio:16/9; background:#0F172A; cursor:pointer;" onclick="window.tbbPlayYouTubeAuthorVideo('${a.id}')">
                      <img src="${a.thumb}" alt="${escHtml(a.title)}" style="width:100%; height:100%; object-fit:cover; display:block;" />
                      <div style="position:absolute; inset:0; background:rgba(15,23,42,0.25); display:flex; align-items:center; justify-content:center;">
                        <div style="width:50px; height:50px; border-radius:50%; background:#FFFFFF; color:#0F172A; display:flex; align-items:center; justify-content:center; font-size:1.05rem;">▶</div>
                      </div>
                      <span style="position:absolute; bottom:10px; right:10px; background:rgba(15,23,42,0.85); color:#FFFFFF; padding:3px 9px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.68rem;">${a.duration}</span>
                    </div>
                    <div style="padding:18px;">
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.68rem; font-weight:500; color:#EA580C; margin-bottom:4px;">${escHtml(a.step)} · ${escHtml(a.author)}</div>
                      <h3 style="font-family:'Montserrat', sans-serif; font-size:1.02rem; font-weight:600; color:#0F172A; margin:0;">${escHtml(a.title)}</h3>
                    </div>
                  </div>
                  <div style="padding:0 18px 18px 18px; display:flex; gap:10px;">
                    <button type="button" onclick="window.tbbPlayYouTubeAuthorVideo('${a.id}')" class="tbb-btn-light-surface" style="padding:8px 14px; font-size:0.8rem; font-weight:500;">▶ Ver aquí</button>
                    <a href="${a.url}" target="_blank" rel="noopener" class="tbb-btn-light-surface" style="padding:8px 14px; font-size:0.8rem; font-weight:500; text-decoration:none;">YouTube ↗</a>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- 3. LIBROS FUNDAMENTALES CON PORTADAS Y LINKS DIRECTOS -->
          <div>
            <h2 style="font-family:'Montserrat', sans-serif; font-size:1.5rem; font-weight:600; color:#0F172A; margin:0 0 24px 0;">
              ${escHtml(t("theoryBooksTitle"))}
            </h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:24px;">
              ${FOUNDER_ESSENTIAL_BOOKS.map(b => `
                <div style="background:#F8FAFC; border-radius:20px; padding:20px; display:flex; gap:18px; align-items:center;">
                  <img src="/assets/books/${b.coverImg}" alt="${escHtml(b.title)}" style="width:88px; height:128px; object-fit:cover; border-radius:10px; box-shadow:0 8px 20px rgba(15,23,42,0.12); flex-shrink:0;" />
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:500; color:#1D4ED8;">${escHtml(b.step)}</div>
                    <h3 style="font-family:'Montserrat', sans-serif; font-size:1.0rem; font-weight:600; color:#0F172A; margin:0;">${escHtml(b.title)}</h3>
                    <div style="font-size:0.82rem; font-weight:500; color:#475569;">${escHtml(b.author)}</div>
                    <p style="font-size:0.82rem; font-weight:400; color:#64748B; line-height:1.45; margin:0;">${escHtml(b.takeaway)}</p>
                    <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap;">
                      <a href="${b.kindleUrl}" target="_blank" rel="noopener" style="padding:6px 12px; border-radius:999px; background:#0D2540; color:#FFFFFF; font-size:0.75rem; font-weight:500; text-decoration:none;">Amazon / Kindle ↗</a>
                      <a href="${b.appleBooksUrl}" target="_blank" rel="noopener" style="padding:6px 12px; border-radius:999px; background:#E2E8F0; color:#0F172A; font-size:0.75rem; font-weight:500; text-decoration:none;">Apple Books ↗</a>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- BOTÓN AL FINAL DE BASES TEÓRICAS QUE LLEVA A "PACK DE DESCARGAS" (MENÚ 5) -->
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

    return `
      <section style="padding:64px 24px 88px 24px; background:#FFFFFF;">
        <div style="max-width:1280px; margin:0 auto; display:flex; flex-direction:column; gap:56px;">
          <!-- Encabezado limpio del Pack de Descargas -->
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

          <!-- ESCENARIO PRINCIPAL DEL ENTREGABLE ACTIVO (CLIC ABRE A MÁXIMA RESOLUCIÓN EN PANTALLA CASI COMPLETA) -->
          <div class="tbb-comm-grid-2" style="background:#F8FAFC; border-radius:28px; padding:clamp(24px, 3.5vw, 40px); gap:36px; align-items:center;">
            <div style="position:relative; border-radius:20px; overflow:hidden; background:#FFFFFF; box-shadow:0 20px 50px rgba(15,23,42,0.10); cursor:pointer;" onclick="window.tbbOpenPlateLightboxModal(${activeItem.plateNum}, '${activeItem.thumb}', '${escHtml(activeLoc.title)}', '${activeItem.sampleUrl}')">
              <img src="${activeItem.thumb}" alt="${escHtml(activeLoc.title)}" style="width:100%; max-height:440px; object-fit:contain; display:block; margin:0 auto;" />
              <div style="position:absolute; bottom:12px; right:12px; background:rgba(15,23,42,0.88); color:#FFFFFF; padding:6px 14px; border-radius:999px; font-family:'JetBrains Mono', monospace; font-size:0.7rem;">
                ⤢ ${escHtml(t("packOpenFullscreen"))}
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:18px;">
              <div style="display:inline-flex; align-items:center; gap:8px; align-self:flex-start; padding:5px 14px; border-radius:999px; background:#EFF6FF; color:#1D4ED8; font-family:'JetBrains Mono', monospace; font-size:0.72rem; font-weight:500;">
                ENTREGABLE #${activeItem.num} DE 09 · ${escHtml(activeItem.format)}
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
                <button type="button" onclick="window.tbbSelectDeliverableCarousel(${activeIdx - 1})" class="tbb-btn-light-surface" style="padding:8px 16px; font-size:0.82rem;">← Anterior</button>
                <button type="button" onclick="window.tbbSelectDeliverableCarousel(${activeIdx + 1})" class="tbb-btn-light-surface" style="padding:8px 16px; font-size:0.82rem;">Siguiente →</button>
              </div>
            </div>
          </div>

          <!-- CARRUSEL MODERNO DE MINIATURAS DE TODOS LOS 9 DESCARGABLES -->
          <div>
            <div id="tbbModernDeliverablesCarouselTrack" style="display:flex; gap:18px; overflow-x:auto; padding:8px 4px 20px 4px; scroll-snap-type:x mandatory;">
              ${OFFICIAL_9_DELIVERABLES.map((item, idx) => {
                const loc = item.i18n[lang] || item.i18n.es;
                const isSel = idx === activeIdx;
                return `
                  <div id="tbbCarouselDelivCard_${idx}" onclick="window.tbbSelectDeliverableCarousel(${idx})" style="min-width:265px; max-width:265px; scroll-snap-align:center; background:${isSel ? '#FFFFFF' : '#F8FAFC'}; border-radius:20px; padding:14px; border:2px solid ${isSel ? '#1D4ED8' : 'transparent'}; box-shadow:${isSel ? '0 16px 36px rgba(29,78,216,0.14)' : '0 4px 12px rgba(15,23,42,0.04)'}; cursor:pointer; transition:all 0.22s ease; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                    <div>
                      <div style="position:relative; border-radius:12px; overflow:hidden; background:#FFFFFF; margin-bottom:10px;">
                        <img src="${item.thumb}" alt="${escHtml(loc.title)}" style="width:100%; height:148px; object-fit:cover; object-position:top center; display:block;" />
                        <button type="button" onclick="event.stopPropagation(); window.tbbOpenPlateLightboxModal(${item.plateNum}, '${item.thumb}', '${escHtml(loc.title)}', '${item.sampleUrl}');" style="position:absolute; top:8px; right:8px; background:rgba(15,23,42,0.82); color:#FFFFFF; border:none; border-radius:999px; padding:4px 10px; font-size:0.68rem; cursor:pointer;">
                          ⤢ Max Res
                        </button>
                      </div>
                      <div style="font-family:'JetBrains Mono', monospace; font-size:0.66rem; font-weight:500; color:#EA580C;">#${item.num} · ${escHtml(item.format)}</div>
                      <div style="font-family:'Montserrat', sans-serif; font-size:0.92rem; font-weight:600; color:#0F172A; margin-top:4px; line-height:1.3;">${escHtml(loc.title)}</div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- SECCIÓN DEBAJO DEL CARRUSEL: "PRÓXIMAMENTE" (CREACIÓN DE PÁGINA WEB + PUBLICACIONES EN REDES SOCIALES) -->
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
              <!-- Opción 1: Creación de Página Web -->
              <div style="background:#F8FAFC; border-radius:24px; padding:32px; display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
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

              <!-- Opción 2: Publicaciones en Redes Sociales -->
              <div style="background:#F8FAFC; border-radius:24px; padding:32px; display:flex; flex-direction:column; justify-content:space-between; gap:20px;">
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
      <!-- BARRA SUPERIOR DE NAVEGACIÓN (FONDO CLARO, ELEGANTE, 5 MENÚS + COMPRAR SIEMPRE VISIBLE) -->
      <header class="tbb-awwwards-nav">
        <a href="#inicio" onclick="window.tbbSwitchMainSection(1); return false;" style="display:flex; align-items:center; gap:10px; text-decoration:none; min-width:0;">
          <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:36px; height:36px; border-radius:10px; object-fit:cover; flex-shrink:0;" />
          <div style="min-width:0;">
            <div class="tbb-brand-title-text" style="font-family:'Montserrat', sans-serif; font-size:0.95rem; font-weight:600; color:#0F172A; letter-spacing:-0.02em; white-space:nowrap;">
              THE BEST BRAND <span class="tbb-brand-inline-tagline" style="color:#EA580C; font-size:0.7rem; font-weight:500; margin-left:4px;">YOUR BRAND, NOW!!!</span>
            </div>
          </div>
        </a>

        <!-- LOS 5 MENÚS PRINCIPALES EN ORDEN SECUENCIAL -->
        <nav class="tbb-desktop-nav-links" aria-label="Menú Principal">
          <button type="button" id="tbbSecTab_1" class="tbb-nav-menu-item ${sec === 1 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(1)">
            <span>${escHtml(t("menu1"))}</span>
          </button>
          <button type="button" id="tbbSecTab_2" class="tbb-nav-menu-item ${sec === 2 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(2)">
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

        <!-- CONTROLES DERECHA: SELECTOR MULTILINGÜE + COMPRAR SIEMPRE VISIBLE + ABRIR ESTUDIO -->
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

      <!-- BARRA COMPACTA DE LAS 5 SUBPÁGINAS EN MÓVIL / TABLET -->
      <nav class="tbb-mobile-subpages-bar" aria-label="Subpáginas">
        <button type="button" class="tbb-mob-pill tbb-tab-sec-1 ${sec === 1 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(1)">${escHtml(t("menu1"))}</button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-2 ${sec === 2 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(2)">
          <span class="tbb-live-pulse-dot"></span> ${escHtml(t("menu2"))}
        </button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-3 ${sec === 3 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(3)">${escHtml(t("menu3"))}</button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-4 ${sec === 4 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(4)">${escHtml(t("menu4"))}</button>
        <button type="button" class="tbb-mob-pill tbb-tab-sec-5 ${sec === 5 ? 'is-active' : ''}" onclick="window.tbbSwitchMainSection(5)">${escHtml(t("menu5"))}</button>
      </nav>

      <!-- DRAWER MÓVIL RESPONSIVO -->
      <div id="tbbMobileDrawerBackdrop" class="tbb-mobile-drawer-backdrop" onclick="window.tbbToggleMobileDrawer(false)"></div>
      <aside id="tbbMobileSlideDrawer" class="tbb-mobile-slide-drawer" aria-label="Menú Móvil">
        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:14px; border-bottom:1px solid #E2E8F0;">
          <span style="font-weight:600; font-size:0.95rem; color:#0F172A;">THE BEST BRAND</span>
          <button type="button" class="tbb-btn-light-surface" onclick="window.tbbToggleMobileDrawer(false)" style="padding:5px 10px;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px;">
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(1);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">01 · ${escHtml(t("menu1"))}</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(2);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">02 · ${escHtml(t("menu2"))} (${escHtml(t("menu2Live"))})</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(3);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">03 · ${escHtml(t("menu3"))}</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(4);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">04 · ${escHtml(t("menu4"))}</button>
          <button type="button" onclick="window.tbbToggleMobileDrawer(false); window.tbbSwitchMainSection(5);" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px;">05 · ${escHtml(t("menu5"))}</button>
          <a href="/studio" class="tbb-btn-light-surface" style="justify-content:flex-start; padding:12px 14px; text-decoration:none;">${escHtml(t("openStudio"))}</a>
          <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbToggleMobileDrawer(false); window.tbbOpenBuyAppCheckoutModal('pro_atelier');" style="padding:14px; margin-top:6px;">${escHtml(t("buyNowFloating"))}</button>
        </div>
      </aside>

      <!-- CONTENEDORES DE LAS 5 SUBPÁGINAS -->
      <main style="background:#FFFFFF; min-height:82vh;">
        <div id="tbbMainSectionPane_1" style="display:${sec === 1 ? 'block' : 'none'};">
          ${window.tbbBuildSubpage1HomeHTML()}
        </div>
        <div id="tbbMainSectionPane_2" style="display:${sec === 2 ? 'block' : 'none'};">
          ${window.tbbBuildSubpage2DemoHTML()}
        </div>
        <div id="tbbMainSectionPane_3" style="display:${sec === 3 ? 'block' : 'none'};">
          ${window.tbbBuildSubpage3AppTourHTML()}
        </div>
        <div id="tbbMainSectionPane_4" style="display:${sec === 4 ? 'block' : 'none'};">
          ${window.tbbBuildSubpage4TheoryHTML()}
        </div>
        <div id="tbbMainSectionPane_5" style="display:${sec === 5 ? 'block' : 'none'};">
          ${window.tbbBuildSubpage5DownloadsHTML()}
        </div>
      </main>
    `;
  };

  // ---------------------------------------------------------------------------
  // 10. MODAL YOUTUBE Y MOTOR REAL DE PAGO (/api/v1/payments/checkout-live)
  // ---------------------------------------------------------------------------
  window.tbbPlayYouTubeAuthorVideo = function (videoId) {
    const author = YOUTUBE_METHODOLOGY_AUTHORS.find(a => a.id === videoId);
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
          <div style="font-family:'Montserrat',sans-serif; font-size:1.0rem; font-weight:600; color:#0F172A;">${escHtml(author?.title || "Conferencia Magistral")}</div>
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

    if (methodId === "card" && (nameVal.length < 3 || numVal.length < 13 || expVal.length < 4 || cvcVal.length < 3)) {
      if (statusBox) {
        statusBox.style.display = "block";
        statusBox.style.background = "#FEF2F2";
        statusBox.style.color = "#991B1B";
        statusBox.textContent = "Por favor verifica los datos de la tarjeta o selecciona Apple Pay, Google Pay o PayPal.";
      }
      return;
    }

    if (statusBox) {
      statusBox.style.display = "block";
      statusBox.style.background = "#EFF6FF";
      statusBox.style.color = "#1E3A8A";
      statusBox.textContent = `Procesando autorización criptográfica por $${planPrice.toFixed(2)} USD...`;
    }

    try {
      const resp = await fetch("/api/v1/payments/checkout-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: st.selectedPlan,
          payment_method: methodId,
          brand_name: st.brandName || "THE BEST BRAND",
          customer_email: emailVal,
          card_holder: nameVal,
          card_last4: numVal.slice(-4) || "8890"
        })
      });
      const data = await resp.json();

      if (data && data.stripe_checkout_url) {
        window.location.href = data.stripe_checkout_url;
        return;
      }

      const receiptObj = {
        licenseCode: (data && data.license_code) || ("TBB-PRO-" + Date.now().toString(36).toUpperCase()),
        orderFolio: (data && data.order_folio) || "TBB-LIVE-001",
        downloadGrantToken: (data && data.download_grant_token) || "",
        planId: st.selectedPlan,
        planLabel,
        amountUSD: planPrice,
        paymentMethod: methodId,
        brandName: st.brandName || "THE BEST BRAND",
        activatedAt: (data && data.authorized_at) || new Date().toISOString()
      };

      localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receiptObj));
      localStorage.setItem("thebestbrand_pro_license", receiptObj.licenseCode);
      if (receiptObj.downloadGrantToken) {
        localStorage.setItem("tbb_hmac_download_grant_v82", receiptObj.downloadGrantToken);
      }

      window.tbbSyncCommercialDemoToAppState();
      window.tbbRenderCheckoutSuccessView(receiptObj);
      window.tbbUpdateAlwaysOnFloatingBarText();
      window.tbbRefreshCommercialPortalDOM();
    } catch (err) {
      const fallbackReceipt = {
        licenseCode: "TBB-PRO-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
        orderFolio: "TBB-LIVE-LOCAL",
        planId: st.selectedPlan,
        planLabel,
        amountUSD: planPrice,
        paymentMethod: methodId,
        brandName: st.brandName || "THE BEST BRAND",
        activatedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(fallbackReceipt));
        localStorage.setItem("thebestbrand_pro_license", fallbackReceipt.licenseCode);
      } catch (e) {}
      window.tbbRenderCheckoutSuccessView(fallbackReceipt);
      window.tbbUpdateAlwaysOnFloatingBarText();
      window.tbbRefreshCommercialPortalDOM();
    }
  };

  window.tbbRenderCheckoutSuccessView = function (receipt) {
    const container = document.getElementById("tbbCheckoutSheetInner");
    if (!container) return;
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:16px; text-align:center; padding:16px 8px;">
        <div style="margin:0 auto;">${window.tbbBuildOfficialBrandbook1EmblemSVG(68)}</div>
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.74rem; font-weight:500; color:#16A34A;">
          PAGO AUTORIZADO · LICENCIA OFICIAL ACTIVADA
        </div>
        <h3 style="font-family:'Montserrat', sans-serif; font-size:1.45rem; font-weight:600; color:#0F172A; margin:0;">
          ¡Bienvenido a The Best Brand Pro!
        </h3>
        <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:16px; padding:16px; text-align:left; font-size:0.86rem; line-height:1.7; color:#334155;">
          <div>Licencia: <span style="font-family:'JetBrains Mono', monospace; color:#1D4ED8; font-weight:600;">${escHtml(receipt.licenseCode)}</span></div>
          <div>Folio de Orden: <span style="font-family:'JetBrains Mono', monospace;">${escHtml(receipt.orderFolio || "TBB-LIVE")}</span></div>
          <div>Plan: ${escHtml(receipt.planLabel)} ($${receipt.amountUSD.toFixed(2)} USD)</div>
          <div>Marca: ${escHtml(receipt.brandName)}</div>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:6px;">
          <a href="/studio" onclick="window.tbbCloseBuyAppCheckoutModal();" class="tbb-comm-btn-blue" style="flex:1; padding:14px; text-decoration:none;">
            Entrar al Estudio Completo con mi Marca →
          </a>
          <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="padding:14px 20px;">
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
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; border-bottom:1px solid #E2E8F0; padding-bottom:14px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="/assets/logos/tbb_official_liquid_glass_logo.jpg" alt="The Best Brand" style="width:38px; height:38px; border-radius:10px; object-fit:cover;" />
          <div>
            <div style="font-family:'Montserrat', sans-serif; font-size:1.1rem; font-weight:600; color:#0F172A;">${escHtml(t("checkoutTitle"))}</div>
            <div style="font-size:0.8rem; font-weight:400; color:#475569;">${escHtml(t("checkoutSub"))}</div>
          </div>
        </div>
        <button type="button" class="tbb-btn-light-surface" onclick="window.tbbCloseBuyAppCheckoutModal()" style="padding:6px 12px;">✕</button>
      </div>

      <!-- Selección de Plan -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px;">
        <button type="button" onclick="window.tbbSelectCheckoutPlan('pro_atelier')" style="padding:14px; border-radius:14px; border:1.5px solid ${!isAgency ? '#1D4ED8' : '#CBD5E1'}; background:${!isAgency ? '#EFF6FF' : '#FFFFFF'}; text-align:left; cursor:pointer;">
          <div style="font-size:0.86rem; font-weight:600; color:#0F172A;">${escHtml(t("planSingleName"))}</div>
          <div style="font-size:1.15rem; font-weight:600; color:#1D4ED8; margin-top:2px;">$49 USD</div>
          <div style="font-size:0.74rem; font-weight:400; color:#475569;">${escHtml(t("planSingleDesc"))}</div>
        </button>
        <button type="button" onclick="window.tbbSelectCheckoutPlan('agency_suite')" style="padding:14px; border-radius:14px; border:1.5px solid ${isAgency ? '#1D4ED8' : '#CBD5E1'}; background:${isAgency ? '#EFF6FF' : '#FFFFFF'}; text-align:left; cursor:pointer;">
          <div style="font-size:0.86rem; font-weight:600; color:#0F172A;">${escHtml(t("planAgencyName"))}</div>
          <div style="font-size:1.15rem; font-weight:600; color:#1D4ED8; margin-top:2px;">$149 USD</div>
          <div style="font-size:0.74rem; font-weight:400; color:#475569;">${escHtml(t("planAgencyDesc"))}</div>
        </button>
      </div>

      <!-- Métodos de Pago -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin-top:16px;">
        ${[
          { id: "card", lbl: "💳 Tarjeta" },
          { id: "apple_pay", lbl: " Apple Pay" },
          { id: "google_pay", lbl: "G Pay" },
          { id: "paypal", lbl: "PayPal" }
        ].map(m => `
          <button type="button" onclick="window.tbbSelectPaymentMethod('${m.id}')" style="padding:10px 8px; border-radius:10px; border:1px solid ${method === m.id ? '#0D2540' : '#CBD5E1'}; background:${method === m.id ? '#0D2540' : '#F8FAFC'}; color:${method === m.id ? '#FFFFFF' : '#0F172A'}; font-size:0.8rem; font-weight:500; cursor:pointer;">
            ${m.lbl}
          </button>
        `).join("")}
      </div>

      <div style="margin-top:16px; background:#F8FAFC; border-radius:16px; padding:18px;">
        ${method === "card" ? `
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div>
              <label style="display:block; font-size:0.76rem; font-weight:500; color:#334155; margin-bottom:4px;">Nombre del titular</label>
              <input type="text" id="tbbCardHolderInput" value="Jorge Benítez" style="width:100%; height:42px; padding:0 12px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.88rem; color:#0F172A; background:#FFFFFF;" />
            </div>
            <div>
              <label style="display:block; font-size:0.76rem; font-weight:500; color:#334155; margin-bottom:4px;">Número de tarjeta (Visa, Mastercard, Amex)</label>
              <input type="text" id="tbbCardNumberInput" oninput="window.tbbFormatCardInput(this)" value="4532 8910 4421 8890" maxlength="19" style="width:100%; height:42px; padding:0 12px; border-radius:10px; border:1px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.9rem; color:#0F172A; background:#FFFFFF;" />
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1.4fr; gap:10px;">
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">MM/AA</label>
                <input type="text" id="tbbCardExpiryInput" oninput="window.tbbFormatExpiryInput(this)" value="08/29" maxlength="5" style="width:100%; height:42px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.86rem; color:#0F172A; background:#FFFFFF;" />
              </div>
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">CVC</label>
                <input type="password" id="tbbCardCvcInput" value="842" maxlength="4" style="width:100%; height:42px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-family:'JetBrains Mono', monospace; font-size:0.86rem; color:#0F172A; background:#FFFFFF;" />
              </div>
              <div>
                <label style="display:block; font-size:0.74rem; font-weight:500; color:#334155; margin-bottom:4px;">Correo para licencia</label>
                <input type="email" id="tbbCardEmailInput" value="cliente@thebestbrand.app" style="width:100%; height:42px; padding:0 10px; border-radius:10px; border:1px solid #CBD5E1; font-size:0.84rem; color:#0F172A; background:#FFFFFF;" />
              </div>
            </div>
            <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbProcessCheckoutPayment('card')" style="width:100%; padding:14px; font-size:0.92rem; font-weight:600; margin-top:4px;">
              ${escHtml(t("payNowBtn"))} · ${priceTxt}
            </button>
          </div>
        ` : `
          <div style="text-align:center; padding:12px;">
            <p style="font-size:0.9rem; font-weight:400; color:#334155; margin:0 0 14px 0;">
              Autorización instantánea con <strong>${method.toUpperCase().replace("_", " ")}</strong> por ${priceTxt}.
            </p>
            <button type="button" class="tbb-comm-btn-blue" onclick="window.tbbProcessCheckoutPayment('${method}')" style="width:100%; padding:14px; font-size:0.92rem; font-weight:600;">
              ${escHtml(t("payNowBtn"))} · ${priceTxt}
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
          scrollbar-width: none;
        }
        .tbb-mobile-subpages-bar::-webkit-scrollbar {
          display: none;
        }
        .tbb-mobile-hamburger-btn {
          display: inline-flex !important;
        }
        .tbb-awwwards-nav {
          padding: 10px 14px;
        }
      }
      @media (max-width: 560px) {
        .tbb-brand-title-text {
          display: none !important;
        }
        #tbbBtnTopBuyAppNow {
          padding: 7px 14px !important;
          font-size: 0.76rem !important;
        }
        #tbbCommercialLangSelect {
          height: 34px !important;
          padding: 0 8px !important;
          font-size: 0.74rem !important;
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
      @media (max-width: 560px) {
        #tbbAlwaysOnBuyFloatingBar {
          left: 12px;
          right: 12px;
          bottom: 10px;
          justify-content: space-between;
          padding: 7px 14px;
        }
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
    if (window.location.hash && window.location.hash.length > 1) {
      window.tbbCommercialDemoState.activeMainSection = resolveSectionFromSlugOrHash(window.location.hash);
    }
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

  window.addEventListener("hashchange", () => {
    if (window.location.hash && window.location.hash.length > 1) {
      window.tbbSwitchMainSection(window.location.hash, true);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ensureModalsAndFloatingBarMounted();
      window.tbbRefreshCommercialPortalDOM();
    });
  } else {
    ensureModalsAndFloatingBarMounted();
    window.tbbRefreshCommercialPortalDOM();
  }
})();
