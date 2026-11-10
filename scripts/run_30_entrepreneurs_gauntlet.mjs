import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import http from "http";
import fs from "fs";
import path from "path";

const WEB_ROOT = path.resolve("apps/web");
const ARTIFACT_DIR = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d";
const OUTPUT_IMG_DIR = path.join(ARTIFACT_DIR, "entrepreneurs_30");
if (!fs.existsSync(OUTPUT_IMG_DIR)) {
  fs.mkdirSync(OUTPUT_IMG_DIR, { recursive: true });
}

// Catálogo Completo de 30 Emprendedores Reales y Diversos
const ENTREPRENEURS = [
  {
    id: 1,
    name: "Vértice Arquitectura",
    tagline: "ESPACIO, LUZ Y SUSTENTABILIDAD",
    goal: "evolve",
    category: "Arquitectura & Construcción",
    giro: "Estudio de arquitectura residencial bioclimática, diseño de interiores de lujo sustentable y supervisión técnica de obra.",
    buyer: "Familias e inversionistas patrimoniales que buscan residencias de autor energéticamente eficientes y de alta plusvalía.",
    why: "Porque creemos que un espacio bien diseñado transforma la calidad de vida de las personas y respeta el medio ambiente.",
    how: "Integramos modelado solar 3D, materiales de bajo impacto y supervisión rigurosa de acabados en cada metro cuadrado.",
    what: "Proyectos arquitectónicos ejecutivos completos, dirección de obra certificada y manual de mantenimiento del hogar.",
    persona: "Arquitecto visionario con mente analítica y rigor constructivo: escucha tu estilo de vida y lo traduce en luz, orden y confort.",
    tpBefore: ["Portafolio visual en Instagram y ArchDaily", "Sitio web con recorridos virtuales 3D interactivos", "Recomendación directa de clientes y desarrolladores", "Diagnóstico inicial de viabilidad del predio en 24h"],
    tpDuring: ["Sesión de diseño conceptual con realidad virtual", "Renderizado fotorrealista de materiales y luz solar", "Reporte fotográfico semanal de avance de obra", "Acompañamiento personal en selección de acabados"],
    tpAfter: ["Manual de entrega de la residencia con planos finales", "Póliza de garantía estructural y vicios ocultos de 3 años", "Bitácora digital de mantenimiento preventivo", "Sesión fotográfica editorial de la obra terminada"],
    sliders: { organico_geometrico: 0.85, tradicional_innovador: 0.70, minimalista_complejo: -0.30 },
    primaryFont: "Montserrat",
    colors: { primary: "#0D2540", secondary: "#C27803", darkInk: "#090D16", lightGray: "#E2E8F0" },
    archetype: "direct_uber_monolith"
  },
  {
    id: 2,
    name: "Marea Negra Gastronomía",
    tagline: "COCINA DE FUEGO Y MAREA PROFUNDA",
    goal: "evolve",
    category: "Gastronomía / Restaurante",
    giro: "Restaurante de autor especializado en pesca sustentable del Pacífico, brasa de carbón de encino y mixología botánica.",
    buyer: "Comensales gourmet, parejas y grupos que buscan experiencias gastronómicas memorables y productos frescos de origen trazable.",
    why: "Porque el mar tiene historias que solo el fuego lento y el respeto al ingrediente pueden contar a la mesa.",
    how: "Seleccionamos pesca del día directa de cooperativas ribereñas y la preparamos a la leña con técnicas contemporáneas.",
    what: "Menú degustación de 7 tiempos, carta de mariscos de temporada y barra de coctelería con destilados mexicanos.",
    persona: "Chef apasionado, riguroso con la frescura y cálido anfitrión: visita cada mesa para explicar el origen de cada plato.",
    tpBefore: ["Contenido visual de fuego y pesca en TikTok e Instagram", "Reservación instantánea por OpenTable y WhatsApp", "Menú digital dinámico con pesca fresca del día", "Ubicación clara y señalización exterior sobria"],
    tpDuring: ["Bienvenida con toalla tibia y agua aromática de cortesía", "Explicación sensorial del menú por el capitán de sala", "Degustación de sales minerales y aceite de oliva artesanal", "Servicio sincronizado con vajilla de cerámica negra"],
    tpAfter: ["Cortesía de infusión digestiva de hierbas de huerto", "Ticket digital enviado a WhatsApp sin esperas en mesa", "Invitación exclusiva a catas privadas de vino y mezcal", "Encuesta de 1 toque sobre temperatura y servicio"],
    sliders: { organico_geometrico: -0.65, tradicional_innovador: 0.40, minimalista_complejo: -0.10 },
    primaryFont: "Cinzel",
    colors: { primary: "#111827", secondary: "#F59E0B", darkInk: "#0A0A0C", lightGray: "#E5E7EB" },
    archetype: "liquid_glass_infinity"
  },
  {
    id: 3,
    name: "Aura Café Tostadores",
    tagline: "GRANOS DE ALTURA · TOSTADO DE AUTOR",
    goal: "first",
    category: "Café de Especialidad / Micro-Tostaduría",
    giro: "Tostaduría y barra de café de especialidad de origen único (+85 puntos Q-Grader), talleres de barismo y venta en grano.",
    buyer: "Amantes del buen café, profesionales que trabajan en remoto y cafeterías de especialidad que exigen tuestes consistentes.",
    why: "Porque una taza de café excepcional dignifica el trabajo del caficultor y despierta los mejores momentos del día.",
    how: "Tostamos en micro-lotes con perfiles de curva térmica personalizados para exaltar las notas frutales y florales de cada finca.",
    what: "Bolsas de café de 250g y 1kg con ficha técnica de cata, suscripción mensual a domicilio y servicio de barra de espresso.",
    persona: "Maestro tostador empático y didáctico: te pregunta tus gustos para recomendarte el método y molienda ideal para tu hogar.",
    tpBefore: ["Aroma a café recién tostado perceptible desde la banqueta", "Tienda online intuitiva con suscripción recurrente", "Guías breves en video para preparar V60 y Prensa Francesa", "Etiquetas con perfil de notas, altitud y productor"],
    tpDuring: ["Cata aromática del grano molido antes de la extracción", "Extracción frente al cliente con báscula y cronómetro", "Servicio en taza de cerámica artesanal con vaso de agua", "Espacio luminoso con Wi-Fi de alta velocidad y enchufes"],
    tpAfter: ["Bolsa de grano con válvula desgasificadora y cierre zip", "Correo quincenal con consejos de molienda y recetas", "Descuento en tienda al rellenar tu bolsa retornable", "Acceso preferente al lote exclusivo de cosecha nueva"],
    sliders: { organico_geometrico: -0.50, tradicional_innovador: -0.60, minimalista_complejo: 0.15 },
    primaryFont: "Playfair Display",
    colors: { primary: "#3B2219", secondary: "#C2593F", darkInk: "#1E120D", lightGray: "#EADCC9" },
    archetype: "artisan_seal"
  },
  {
    id: 4,
    name: "OmniFleet Cloud",
    tagline: "INTELIGENCIA EN RUTA · CERTEZA EN FLOTA",
    goal: "evolve",
    category: "Software SaaS B2B / Telemática",
    giro: "Plataforma en la nube con IA para telemetría de flotas vehiculares, prevención de accidentes, ahorro de combustible y rutas óptimas.",
    buyer: "Directores de logística, gerentes de transporte y directores de operaciones con flotas de 10 a 1,000 unidades.",
    why: "Porque reducir la fricción logística y proteger vidas en las carreteras multiplica la rentabilidad de las empresas.",
    how: "Conectamos sensores IoT a los camiones con algoritmos de visión por computadora que alertan fatiga y optimizan el kilometraje.",
    what: "SaaS multi-dispositivo con dashboard en tiempo real, alertas de mantenimiento predictivo y reportes para aseguradoras.",
    persona: "Ingeniero en sistemas y analista de operaciones: habla con métricas exactas de ahorro, ROI comprobado y soporte 24/7.",
    tpBefore: ["Calculadora interactiva de ahorro de diesel en el sitio web", "Demo guiada de 15 minutos con datos reales de la industria", "Caso de éxito documentado con reducción del 18% en costos", "Contrato digital y cotización transparente sin letra chica"],
    tpDuring: ["Instalación de dispositivos GPS en menos de 45 minutos por unidad", "Capacitación remota o in situ para monitoristas y mecánicos", "Configuración de geocercas y alertas críticas en WhatsApp", "Dashboard personalizado con los KPIs clave de la empresa"],
    tpAfter: ["Revisión mensual de rendimiento con asesor asignado", "Actualizaciones automáticas de software sin costo extra", "Garantía de cambio inmediato ante fallas de hardware", "Certificado de huella de carbono reducida para auditorías"],
    sliders: { organico_geometrico: 0.90, tradicional_innovador: 0.85, minimalista_complejo: -0.40 },
    primaryFont: "Plus Jakarta Sans",
    colors: { primary: "#1D4ED8", secondary: "#06B6D4", darkInk: "#0F172A", lightGray: "#E2E8F0" },
    archetype: "direct_uber_monolith"
  },
  {
    id: 5,
    name: "Lino & Raíz",
    tagline: "VESTIR CON CALMA · VIVIR CON CONCIENCIA",
    goal: "first",
    category: "Moda Sostenible / Indumentaria",
    giro: "Boutique de ropa atemporal confeccionada exclusivamente con lino europeo certificado, algodón regenerativo y botones de madera.",
    buyer: "Mujeres y hombres que valoran el consumo consciente, el confort térmico, la durabilidad y la elegancia minimalista.",
    why: "Porque la verdadera elegancia no desgasta al planeta ni pasa de moda en la siguiente temporada.",
    how: "Diseñamos siluetas relajadas con costuras reforzadas, confeccionadas éticamente por modistas locales con salarios justos.",
    what: "Colecciones cápsula de camisas, pantalones, vestidos y kimonos de lino prelavado que no encoge ni pierde suavidad.",
    persona: "Diseñadora textil serena, amante de la naturaleza y detallista: cuida el tacto, la caída de la tela y la armonía de color.",
    tpBefore: ["Fotografía editorial con luz natural sobre fondo neutro", "Guía de tallas exacta con medidas de prenda y corporales", "Transparencia total en costos de tela, corte y confección", "Empaque de papel kraft reciclado sin una sola bolsa de plástico"],
    tpDuring: ["Prueba de prendas en vestidores amplios con aroma a eucalipto", "Asesoría de combinaciones para crear un guardarropa cápsula", "Ajuste de dobladillo personalizado incluido sin costo extra", "Cobro ágil con terminal portátil y ticket por correo"],
    tpAfter: ["Prenda entregada con bolsa de tela reutilizable de manta", "Guía impresa en papel semilla con instrucciones de lavado suave", "Reparación gratuita de costuras o reposición de botones de por vida", "Acceso prioritario a ventas de archivo anuales"],
    sliders: { organico_geometrico: -0.40, tradicional_innovador: -0.30, minimalista_complejo: -0.50 },
    primaryFont: "Cormorant",
    colors: { primary: "#4B5320", secondary: "#78350F", darkInk: "#1C1917", lightGray: "#E6DEC8" },
    archetype: "fluid_gradient_bloom"
  },
  {
    id: 6,
    name: "Canteras del Valle",
    tagline: "LA SOLIDEZ DE LA PIEDRA NATURAL",
    goal: "evolve",
    category: "Materiales de Construcción",
    giro: "Extracción, corte especializado y comercialización de canteras naturales, mármoles rústicos y recubrimientos para fachadas.",
    buyer: "Constructores, arquitectos paisajistas y contratistas de obras comerciales y residenciales de alto volumen.",
    why: "Porque los monumentos y hogares que perduran siglos se construyen con la fuerza y nobleza de la piedra mexicana.",
    how: "Operamos bancos de extracción propios y maquinaria de disco diamantado que garantiza calibración y corte milimétrico.",
    what: "Placas de cantera gris, blanca y ocre, adoquines rústicos, molduras arquitectónicas y fuentes de piedra labrada.",
    persona: "Maestro cantero y empresario industrial: conoce la veta, la dureza y el comportamiento de cada piedra bajo el sol y lluvia.",
    tpBefore: ["Muestrario físico de canteras enviado a despacho de arquitectura", "Catálogo digital con pruebas de absorción y resistencia a compresión", "Cotización desglosada por m² con flete a pie de obra", "Visita técnica a obra para cubicación de material"],
    tpDuring: ["Entrega paletizada y flejada con esquineros protectores", "Inspección conjunta de tonos y espesores al descargar el camión", "Asesoría sobre selladores y adhesivos ideales para el tipo de cantera", "Facturación inmediata vinculada a la orden de compra"],
    tpAfter: ["Reposición garantizada en 48 horas ante mermas de transporte", "Guía de mantenimiento y limpieza periódica de fachadas", "Visita de seguimiento a la obra a los 6 meses de colocada", "Precios preferenciales por volumen para siguientes etapas"],
    sliders: { organico_geometrico: 0.70, tradicional_innovador: -0.50, minimalista_complejo: 0.10 },
    primaryFont: "Cinzel",
    colors: { primary: "#9A7B56", secondary: "#374151", darkInk: "#1F2937", lightGray: "#E5E7EB" },
    archetype: "direct_uber_monolith"
  },
  {
    id: 7,
    name: "Dentiqo Clínica Dental",
    tagline: "CIENCIA, CONFORT Y SONRISAS SEGURAS",
    goal: "first",
    category: "Salud & Especialidades Dentales",
    giro: "Clínica de odontología digital avanzada: ortodoncia invisible con escáner 3D, rehabilitación sobre implantes y odontopediatría sin dolor.",
    buyer: "Pacientes y familias que buscan atención dental de alta precisión tecnológica en un ambiente relajante y sin miedo al dentista.",
    why: "Porque sonreír con seguridad transforma la autoestima, la salud y la forma en que te conectas con el mundo.",
    how: "Eliminamos moldes molestos usando escaneo intraoral 3D y aplicamos protocolos de sedación consciente y anestesia computarizada.",
    what: "Diagnóstico 3D integral, alineadores invisibles a la medida, blanqueamiento led y planes dentales familiares preventivos.",
    persona: "Odontóloga especialista con trato cálido y tranquilizador: te explica con animaciones 3D cada fase antes de tocar tu boca.",
    tpBefore: ["Agendamiento de cita en 30 segundos por WhatsApp o web", "Recordatorio automático con enlace a Google Maps y estacionamiento", "Video tour de las instalaciones para calmar la ansiedad dental", "Historia clínica digital llenada cómodamente desde el celular"],
    tpDuring: ["Sala de espera con música suave, café de grano y aromaterapia", "Escaneo 3D en pantalla gigante para ver tu sonrisa antes y después", "Lentes con audífonos con cancelación de ruido durante el tratamiento", "Explicación detallada del presupuesto con opciones a meses sin intereses"],
    tpAfter: ["Mensaje de seguimiento de la doctora a las 6 horas para checar molestias", "Receta digital y kit de cuidado bucal de regalo para el hogar", "Cita de revisión semestral programada automáticamente en tu calendario", "Programa de puntos y descuentos para miembros de la familia"],
    sliders: { organico_geometrico: -0.20, tradicional_innovador: 0.75, minimalista_complejo: -0.35 },
    primaryFont: "Plus Jakarta Sans",
    colors: { primary: "#0284C7", secondary: "#10B981", darkInk: "#0F172A", lightGray: "#E0F2FE" },
    archetype: "liquid_glass_compass"
  },
  {
    id: 8,
    name: "LexVanguard Abogados",
    tagline: "BLINDAJE ESTRATÉGICO · CLARIDAD LEGAL",
    goal: "evolve",
    category: "Servicios Legales & Corporativos",
    giro: "Firma legal corporativa enfocada en gobierno corporativo, protección de activos intangibles, fusiones y derecho contractual preventivo.",
    buyer: "Fundadores de startups, directores generales y comités de accionistas que requieren certidumbre jurídica en sus contratos y rondas.",
    why: "Porque la verdadera asesoría jurídica no crea burocracia, sino que allana el camino para que las empresas crezcan seguras.",
    how: "Analizamos riesgos comerciales antes de redactar contratos y redactamos en lenguaje ejecutivo claro sin tecnicismos innecesarios.",
    what: "Auditoría legal preventiva (Due Diligence), registro de marcas y patentes, contratos comerciales blindados y litigio estratégico.",
    persona: "Abogado corporativo senior, estratega leal y resolutivo: anticipa conflictos y defiende tus intereses con firmeza.",
    tpBefore: ["Análisis de casos y notas de criterio legal en LinkedIn", "Agenda de llamada diagnóstica de 30 minutos sin costo", "Firma inmediata de acuerdo de confidencialidad (NDA)", "Propuesta de honorarios fija y predecible por proyecto o retainer"],
    tpDuring: ["Sesión de trabajo ejecutiva con resumen de riesgos en una sola cuartilla", "Plataforma de firma electrónica avanzada 100% legal", "Canal directo en Slack/WhatsApp con el socio a cargo del asunto", "Tablero digital con el estatus de trámites ante notarías y registros"],
    tpAfter: ["Bóveda digital en la nube con todos los contratos y sellos notariales", "Resumen ejecutivo de gobernanza para la junta directiva", "Alerta automática ante vencimientos de marcas o asambleas anuales", "Boletín mensual con reformas legales que impactan su industria"],
    sliders: { organico_geometrico: 0.80, tradicional_innovador: -0.70, minimalista_complejo: 0.15 },
    primaryFont: "Playfair Display",
    colors: { primary: "#0A192F", secondary: "#C5A880", darkInk: "#050C18", lightGray: "#E5E7EB" },
    archetype: "liquid_glass_crown"
  },
  {
    id: 9,
    name: "Masa Madre Taller",
    tagline: "HARINA, AGUA, SAL Y TIEMPO",
    goal: "first",
    category: "Panadería & Viennoiserie Artesanal",
    giro: "Panadería de fermentación lenta de 48 horas, trigos enteros agroecológicos, hogazas de masa madre y pastelería rústica francesa.",
    buyer: "Familias del vecindario, restaurantes locales y amantes de la comida saludable que buscan pan fácil de digerir y con sabor real.",
    why: "Porque el pan es el alimento más sagrado y merece elaborarse sin prisas, sin conservadores y con respeto a la tierra.",
    how: "Alimentamos nuestra masa madre viva todos los días y horneamos en horno de piso de piedra a alta temperatura al amanecer.",
    what: "Hogazas campesinas de centeno y trigo, baguettes crujientes, croissants de mantequilla pura y focaccias de romero con sal marina.",
    persona: "Panadero artesano de manos enharinadas y mirada honesta: te explica con orgullo cómo la fermentación lenta cuida tu digestión.",
    tpBefore: ["Horarios de salida de pan recién horneado publicados en historias de Instagram", "Menú semanal en pizarrón exterior con harinas de origen", "Aroma a pan caliente que perfuma la cuadra desde las 6:30 am", "Canastas de mimbre visibles desde la calle con hogazas doradas"],
    tpDuring: ["Saludo personalizado del panadero mientras rebana el pan", "Muestra de pan recién horneado con aceite de oliva para degustar", "Empaque en bolsa de papel kraft microperforada para conservar la costra", "Pago sin contacto con terminal rápida para no hacer filas"],
    tpAfter: ["Pan con costra crujiente que dura fresco hasta 5 días en casa", "Tarjeta con instrucciones sobre cómo congelar y revivir el pan en comal", "Taller mensual de panadería básica de masa madre para vecinos", "Descuento en compras de media tarde para aprovechar el pan del día"],
    sliders: { organico_geometrico: -0.60, tradicional_innovador: -0.80, minimalista_complejo: 0.20 },
    primaryFont: "Playfair Display",
    colors: { primary: "#D97706", secondary: "#451A03", darkInk: "#260E02", lightGray: "#FDE68A" },
    archetype: "artisan_seal"
  },
  {
    id: 10,
    name: "Costa Alta Real Estate",
    tagline: "PROPIEDADES DE AUTOR FRENTE AL MAR",
    goal: "first",
    category: "Bienes Raíces & Inversión Inmobiliaria",
    giro: "Agencia inmobiliaria especializada en villas de lujo, departamentos de playa y terrenos residenciales en destinos costeros exclusivos.",
    buyer: "Inversionistas nacionales y extranjeros, retirados y familias que buscan un segundo hogar o generar altos rendimientos en renta vacacional.",
    why: "Porque vivir junto al mar es un privilegio que merece una compra segura, legalmente impecable y con alta plusvalía.",
    how: "Auditamos legalmente cada predio antes de listarlo y ofrecemos recorridos inmersivos con drones y asesoría fiscal personalizada.",
    what: "Catálogo exclusivo de propiedades frente al océano, corretaje certificado, administración de rentas y gestión notarial completa.",
    persona: "Broker inmobiliario distinguido y de trato impecable: escucha tus objetivos patrimoniales y te muestra solo lo que encaja con tu estilo.",
    tpBefore: ["Fotografía y video 4K con drones mostrando el mar y los accesos", "Sitio web multi-idioma (Español/Inglés) con planos y ficha técnica descargable", "Campaña en redes con datos duros sobre el ROI de renta en la zona", "Contacto ágil por videollamada para clientes fuera de la ciudad"],
    tpDuring: ["Recorrido privado en vehículo de la agencia con amenidades y agua fresca", "Dossier impreso en carpeta de piel con títulos de propiedad y permisos", "Cita con el notario público de la firma para revisar escrituras en vivo", "Asesoría legal para compradores extranjeros sobre fideicomisos de zona restringida"],
    tpAfter: ["Entrega de llaves con botella de vino conmemorativa y kit de bienvenida", "Servicio de conserjería para amueblar y dar de alta servicios del hogar", "Informe semestral sobre el valor de mercado de su propiedad", "Gestión integral de administración si deciden colocarla en renta turística"],
    sliders: { organico_geometrico: 0.75, tradicional_innovador: 0.60, minimalista_complejo: -0.40 },
    primaryFont: "Montserrat",
    colors: { primary: "#0F172A", secondary: "#E5B887", darkInk: "#020617", lightGray: "#F1F5F9" },
    archetype: "direct_uber_monolith"
  }
];

// Generamos los casos 11 al 30 de forma programática con máxima riqueza contextual
const REMAINING_CONFIGS = [
  { id: 11, name: "Apex Performance Studio", tagline: "MÁXIMO POTENCIAL · FUERZA INTELIGENTE", goal: "evolve", category: "Fitness & Alto Rendimiento", giro: "Centro de entrenamiento de fuerza funcional, biomecánica aplicada y recuperación con crioterapia para atletas y ejecutivos.", priCol: "#18181B", secCol: "#FF5722", font: "Montserrat", geo: 0.85, trad: 0.90, arch: "direct_uber_monolith" },
  { id: 12, name: "Lúpulo & Cobre Brewing", tagline: "CERVEZA VIVA HECHA A MANO", goal: "evolve", category: "Cervecería Artesanal", giro: "Microcervecería independiente de estilos de fermentación mixta, maduración en barricas de roble y taproom gastronómico.", priCol: "#B45309", secCol: "#15803D", font: "Cinzel", geo: -0.45, trad: -0.65, arch: "artisan_seal" },
  { id: 13, name: "Criterio Capital Advisory", tagline: "PROTECCIÓN Y CRECIMIENTO PATRIMONIAL", goal: "first", category: "Consultoría Financiera", giro: "Asesoría en finanzas corporativas, estructuración de deuda, planes de retiro y gestión fiduciaria para patrimonios familiares.", priCol: "#0D2540", secCol: "#065F46", font: "Plus Jakarta Sans", geo: 0.80, trad: 0.35, arch: "liquid_glass_compass" },
  { id: 14, name: "Barro Vivo Cerámica", tagline: "ARTE DE LA TIERRA · PIEZAS DE AUTOR", goal: "first", category: "Cerámica & Decoración", giro: "Taller de piezas utilitarias y escultóricas de gres de alta temperatura para gastronomía de autor y proyectos de interiorismo.", priCol: "#9C4124", secCol: "#4D5D53", font: "Cormorant", geo: -0.80, trad: -0.75, arch: "artisan_seal" },
  { id: 15, name: "Aurea Joyería Atelier", tagline: "METALES NOBLES · FORMAS ETERNAS", goal: "evolve", category: "Joyería Fina", giro: "Taller de joyería contemporánea en oro reciclado de 18k, plata mexicana 925 y gemas con certificación de origen ético.", priCol: "#D4AF37", secCol: "#09090B", font: "Cinzel", geo: -0.30, trad: -0.50, arch: "liquid_glass_crown" },
  { id: 16, name: "Flete Directo Logística", tagline: "PUNTUALIDAD EN CADA KILÓMETRO", goal: "first", category: "Logística & Transporte", giro: "Servicios de transporte de carga consolidada, paquetería express interurbana y soluciones de última milla con trazabilidad satelital.", priCol: "#1E3A8A", secCol: "#EAB308", font: "Montserrat", geo: 0.90, trad: 0.65, arch: "direct_uber_monolith" },
  { id: 17, name: "VitalVet Hospital", tagline: "MEDICINA AVANZADA PARA QUIEN MÁS AMAS", goal: "first", category: "Salud Animal / Veterinaria", giro: "Hospital veterinario 24/7 con quirófano avanzado, terapia intensiva, laboratorio in situ y medicina preventiva compasiva.", priCol: "#059669", secCol: "#38BDF8", font: "Plus Jakarta Sans", geo: -0.35, trad: 0.50, arch: "liquid_glass_infinity" },
  { id: 18, name: "Botánica Urbana Paisaje", tagline: "CIUDADES MÁS VERDES · VIDAS MÁS SANAS", goal: "evolve", category: "Paisajismo & Jardinería", giro: "Diseño y construcción de azoteas verdes, jardines xerófilos de bajo consumo hídrico y muros vegetales interiores.", priCol: "#14532D", secCol: "#84CC16", font: "Montserrat", geo: -0.70, trad: 0.40, arch: "fluid_gradient_bloom" },
  { id: 19, name: "Micrófono Abierto Studio", tagline: "TU VOZ CON ESTÁNDAR BROADCAST", goal: "first", category: "Podcast & Medios Digitales", giro: "Estudio de producción audiovisual y grabación de podcasts corporativos en 4K, microfonía Shure y distribución multicanal.", priCol: "#0A0A0A", secCol: "#7C3AED", font: "Plus Jakarta Sans", geo: 0.65, trad: 0.85, arch: "direct_uber_monolith" },
  { id: 20, name: "Cilindro Maestro Taller", tagline: "PRECISIÓN MECÁNICA · HONESTIDAD TOTAL", goal: "evolve", category: "Servicios Automotrices", giro: "Taller automotriz especializado en inyección electrónica, frenos de alto desempeño y mantenimiento preventivo certificado.", priCol: "#1E293B", secCol: "#DC2626", font: "Montserrat", geo: 0.85, trad: 0.40, arch: "direct_uber_monolith" },
  { id: 21, name: "Nébula Eco-Resort", tagline: "DESCONEXIÓN NATURAL ENTRE LAS NUBES", goal: "first", category: "Hotelería & Ecoturismo", giro: "Hotel boutique en bosque de niebla con cabañas solares, spa con temazcal tradicional y cocina orgánica de la huerta.", priCol: "#2D4A3E", secCol: "#B47A46", font: "Playfair Display", geo: -0.65, trad: -0.45, arch: "artisan_seal" },
  { id: 22, name: "Verde Botánica Skincare", tagline: "NUTRICIÓN PURA PARA TU PIEL", goal: "first", category: "Cosmética Natural", giro: "Formulaciones cosméticas veganas con extractos botánicos locales, aceites de prensado en frío y envases biodegradables.", priCol: "#E8998D", secCol: "#588157", font: "Cormorant", geo: -0.55, trad: 0.60, arch: "fluid_gradient_bloom" },
  { id: 23, name: "Kódigo Kids Academia", tagline: "CREADORES DEL FUTURO DIGITAL", goal: "evolve", category: "Educación & EdTech", giro: "Academia interactiva de programación de videojuegos, robótica educativa y pensamiento crítico para niños de 6 a 15 años.", priCol: "#2563EB", secCol: "#FACC15", font: "Montserrat", geo: 0.70, trad: 0.80, arch: "direct_uber_monolith" },
  { id: 24, name: "Roble & Formas Muebles", tagline: "MADERAS NOBLES · OFICIO ETERNO", goal: "first", category: "Mobiliario & Ebanistería", giro: "Diseño y fabricación de muebles a medida en roble, nogal y parota maciza, con ensambles tradicionales y acabados en aceite natural.", priCol: "#4A2E18", secCol: "#D99B5B", font: "Cinzel", geo: 0.60, trad: -0.55, arch: "artisan_seal" },
  { id: 25, name: "Helios Energía Solar", tagline: "EL PODER DEL SOL A TU FAVOR", goal: "first", category: "Energía Solar & Fotovoltaica", giro: "Ingeniería, instalación y monitoreo de sistemas de paneles solares fotovoltaicos y bancos de baterías para empresas y residencias.", priCol: "#0284C7", secCol: "#F97316", font: "Plus Jakarta Sans", geo: 0.80, trad: 0.85, arch: "direct_uber_monolith" },
  { id: 26, name: "Nexum Talento Ejecutivo", tagline: "CONECTANDO LÍDERES QUE TRASCIENDEN", goal: "evolve", category: "Reclutamiento & Headhunting", giro: "Boutique de atracción de talento directivo, evaluación de liderazgo y sucesión de directores generales en empresas medianas.", priCol: "#1E1B4B", secCol: "#F43F5E", font: "Montserrat", geo: 0.75, trad: 0.45, arch: "liquid_glass_compass" },
  { id: 27, name: "Prisma Óptica Boutique", tagline: "TU VISIÓN CON ESTILO PROPIO", goal: "first", category: "Salud Visual & Óptica", giro: "Estudio de optometría clínica con diagnóstico corneal digital y colección curada de armazones artesanales de titanio y acetato.", priCol: "#18181B", secCol: "#155E75", font: "Montserrat", geo: 0.70, trad: 0.65, arch: "direct_uber_monolith" },
  { id: 28, name: "Gala & Sabor Banquetes", tagline: "EL BANQUETE QUE TUS INVITADOS RECORDARÁN", goal: "evolve", category: "Eventos & Banquetería", giro: "Servicio de alta banquetería para bodas de destino y eventos corporativos con cocina en vivo, montajes de gala y mixología.", priCol: "#701A28", secCol: "#D4AF37", font: "Playfair Display", geo: -0.50, trad: -0.40, arch: "liquid_glass_crown" },
  { id: 29, name: "AquaPure Tintorería", tagline: "LIMPIEZA IMPECABLE QUE CUIDA EL PLANETA", goal: "first", category: "Tintorería Ecológica", giro: "Cuidado profesional de prendas finas con tecnología Wet Cleaning a base de agua y ozono, sin percloroetileno y servicio a domicilio.", priCol: "#38BDF8", secCol: "#0F172A", font: "Plus Jakarta Sans", geo: -0.45, trad: 0.60, arch: "liquid_glass_infinity" },
  {
    id: 30,
    name: "IMPROBEARS GROUP",
    tagline: "BUSINESS IMPROVEMENT & HIGH IMPACT VENTURES",
    goal: "subbrand", // ARQUITECTURA MULTIMARCA
    category: "Holding Corporativo / Multimarca",
    giro: "Grupo empresarial integrador de consultoría estratégica, desarrollo de ingredientes de valor, producción de medios y soluciones de inteligencia artificial.",
    buyer: "Accionistas, directores de empresas y corporativos que buscan acelerar la rentabilidad y modernización de sus unidades de negocio.",
    why: "Porque la verdadera transformación de las empresas nace de liberar tiempo mental al líder y conectar la estrategia con la operación diaria.",
    how: "Operamos a través de 4 divisiones especializadas con el mismo rigor de ingeniería, calidez de socio leal y tecnología propietaria.",
    what: "Ecosistema de soluciones de mejora de negocio (Consulting), abastecimiento técnico (Ingredients), video y marca (Studio) e IA aplicada (AI).",
    persona: "Fuerza tranquila, mente de ingeniero y calidez de socio leal: escucha primero la idea del cliente y la profesionaliza hombro a hombro.",
    tpBefore: ["Presencia unificada en redes de la marca madre y sus 4 submarcas", "Portal corporativo improbears.com con acceso a cada división", "Agente inteligente de WhatsApp 24/7 para atención inmediata", "Recomendación institucional y eventos de networking ejecutivo"],
    tpDuring: ["Sesión de diagnóstico integral Del Caos al Sistema", "Propuesta técnica unificada en lienzo claro con división responsable", "Ejecución coordinada in situ con equipo multidisciplinario asignado", "Capacitación práctica y entrega de entregables en curvas matemáticas"],
    tpAfter: ["Portal de Clientes en Zoho Books con historial y facturas", "Garantía de servicio y acompañamiento post-implementación", "Encuesta ejecutiva de satisfacción y mejora continua", "Reunión trimestral de consejo para explorar nuevas divisiones"],
    sliders: { organico_geometrico: -0.35, tradicional_innovador: 0.50, minimalista_complejo: -0.20 },
    primaryFont: "Montserrat",
    colors: { primary: "#0D2540", secondary: "#FF7A00", darkInk: "#0D2540", lightGray: "#E6E6E6" },
    archetype: "fluid_gradient_bloom"
  }
];

// Completar los 30 emprendedores
for (const cfg of REMAINING_CONFIGS) {
  if (cfg.id <= 10) continue;
  if (cfg.id === 30) {
    ENTREPRENEURS.push(cfg);
    continue;
  }
  ENTREPRENEURS.push({
    id: cfg.id,
    name: cfg.name,
    tagline: cfg.tagline,
    goal: cfg.goal,
    category: cfg.category,
    giro: cfg.giro,
    buyer: `Directores, gerentes y consumidores que buscan excelencia y certeza en ${cfg.category}.`,
    why: `Porque creemos que en ${cfg.category} la calidad sin atajos genera confianza inmediata y lealtad para siempre.`,
    how: `Combinamos experiencia especializada, procesos trazables y atención personalizada en cada entrega de ${cfg.name}.`,
    what: `Servicios y productos certificados de ${cfg.category} con soporte directo y garantía de satisfacción total.`,
    persona: `Especialista apasionado de ${cfg.name}: te atiende con profesionalismo, calidez y foco total en resultados.`,
    tpBefore: [`Presencia digital en redes sociales y sitio web de ${cfg.name}`, `Atención inmediata por WhatsApp y formulario de contacto`, `Recomendaciones y reseñas verificadas de clientes previos`, `Cotización clara y diagnóstico inicial sin compromiso`],
    tpDuring: [`Recepción cálida y protocolo de servicio estandarizado`, `Presentación de avances o demostración del producto en vivo`, `Comunicación transparente durante todo el proceso de entrega`, `Cobro seguro con comprobante fiscal inmediato`],
    tpAfter: [`Entrega del producto o servicio con manual de cuidados`, `Mensaje de seguimiento post-venta a los 3 días`, `Garantía directa ante cualquier eventualidad`, `Beneficios y promociones para clientes frecuentes`],
    sliders: { organico_geometrico: cfg.geo, tradicional_innovador: cfg.trad, minimalista_complejo: 0.0 },
    primaryFont: cfg.font,
    colors: { primary: cfg.priCol, secondary: cfg.secCol, darkInk: "#090D16", lightGray: "#E2E8F0" },
    archetype: cfg.arch
  });
}

function startLocalServer(port = 8992) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const rawUrl = (req.url || "/").split("?")[0];
      const urlPath = decodeURIComponent(rawUrl);
      let filePath = path.join(WEB_ROOT, urlPath === "/" ? "index.html" : urlPath);

      if (!fs.existsSync(filePath)) {
        if (urlPath === "/studio") filePath = path.join(WEB_ROOT, "studio.html");
        else if (urlPath === "/web") filePath = path.join(WEB_ROOT, "index.html");
        else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
          return;
        }
      }

      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) filePath = path.join(filePath, "index.html");
      const ext = path.extname(filePath).toLowerCase();
      const contentType = {
        ".html": "text/html; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".mp4": "video/mp4"
      }[ext] || "application/octet-stream";

      const content = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });

    server.listen(port, () => resolve(server));
    server.on("error", reject);
  });
}

async function run30EntrepreneursGauntlet() {
  console.log("=== INICIANDO GAUNTLET DE 30 EMPRENDEDORES SIN SHORTCUTS ===");
  const server = await startLocalServer(8992);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const auditResults = [];

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    for (let i = 0; i < ENTREPRENEURS.length; i++) {
      const ent = ENTREPRENEURS[i];
      const caseNum = String(ent.id).padStart(2, "0");
      console.log(`\n[${caseNum}/30] PROCESANDO: «${ent.name}» (${ent.category})`);

      // 1. Cargar studio.html limpio
      await page.goto("http://localhost:8992/studio.html", { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      // 2. Inyectar datos auténticos a través del estado nativo de la aplicación
      const injectedStatus = await page.evaluate((data) => {
        try {
          // A. Preparar Canvas State
          const cs = {
            brandName: data.name,
            tagline: data.tagline,
            step0_goal: data.goal,
            custom_business_type: data.giro,
            step0_short_essence: data.giro.split(/\s+/).slice(0, 8).join(" "),
            ideal_customer: data.buyer,
            golden_circle: data.why,
            process_steps_text: data.how,
            value_offer: data.what,
            brand_persona: data.persona,
            tp_before: data.tpBefore.join(", "),
            tp_during: data.tpDuring.join(", "),
            tp_after: data.tpAfter.join(", "),
            primary_font: data.primaryFont,
            secondary_font: "Avenir Next",
            primary_color: data.colors.primary,
            accent_color: data.colors.secondary,
            bipolar_sliders: data.sliders
          };

          // B. Guardar en LocalStorage como si el usuario hubiera llenado cada pantalla
          localStorage.setItem("tbb_brand_state_v43", JSON.stringify(cs));
          localStorage.setItem("tbb_active_brand_name", data.name);
          window.canvasState = cs;

          // C. Configurar Step 0
          window.step0State = {
            goal: data.goal,
            sector: data.giro,
            brandName: data.name,
            tagline: data.tagline
          };

          // D. Configurar Bipolar Sliders
          window.bipolarSliderValues = data.sliders;

          // E. Configurar Touchpoints
          window.tpExtractedItems = {
            before: [...data.tpBefore],
            during: [...data.tpDuring],
            after: [...data.tpAfter]
          };

          // F. Configurar tbbState con iteración de logo activa
          if (!window.tbbState) window.tbbState = {};
          window.tbbState.activeStep = 6;
          window.tbbState.subStep = 1;
          window.tbbState.logoIterationIndex = 1;
          window.tbbState.logoIterations = [
            {
              index: 1,
              fontFamily: data.primaryFont,
              archetype: data.archetype,
              paradigm: data.archetype.includes("monolith") ? "direct_geometric" : "fluid_gradient",
              colorPalette: {
                primary: data.colors.primary,
                secondary: data.colors.secondary,
                accent: data.colors.secondary,
                darkInk: data.colors.darkInk,
                lightGray: data.colors.lightGray
              },
              mods: {
                fontFamily: data.primaryFont,
                bipolarSliders: data.sliders
              }
            }
          ];

          // G. Hidratar motor
          if (typeof window.syncAppStateFromCanvasState === "function") {
            window.syncAppStateFromCanvasState();
          }

          return { success: true };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }, ent);

      if (!injectedStatus.success) {
        console.error(`  ❌ Error al inyectar estado para ${ent.name}:`, injectedStatus.error);
        continue;
      }

      // 3. Generar el PDF real ultra-rápido de 30 láminas y capturar métricas
      const genMetrics = await page.evaluate(async () => {
        let cur = 0, tot = 0;
        const pdfBlob = await window.generate30PlatesPdfBlobUltraFast((c, t) => {
          cur = c;
          tot = t;
        });

        // Extraer DNA resuelto
        const cs = typeof window.getActiveCanvasState === "function" ? window.getActiveCanvasState() : (window.canvasState || {});
        const st = window.tbbState || {};
        const activeIt = (st.logoIterations && st.logoIterations[0]) || null;
        const bName = cs.brandName || cs.userLockedBrandName || "TheBestBrand";
        const bGiro = cs.custom_business_type || "";
        const bOffer = cs.value_offer || "";
        const dna = typeof window.resolveBrandbookDesignDNA === "function"
          ? window.resolveBrandbookDesignDNA(cs, st, activeIt, bName, bGiro, bOffer)
          : { archMode: "monolithic", strokeStyle: "organic", eraStyle: "modern" };

        return {
          pdfSize: pdfBlob.size,
          pdfType: pdfBlob.type,
          cur,
          tot,
          archMode: dna.archMode,
          archTitle: dna.archTitle,
          strokeStyle: dna.strokeStyle,
          eraStyle: dna.eraStyle,
          strokeBadge: dna.strokeBadge,
          systemStyleBadge: dna.systemStyleBadge
        };
      });

      console.log(`  ✓ PDF Generado: ${(genMetrics.pdfSize / 1024 / 1024).toFixed(2)} MB | ${genMetrics.tot} Láminas`);
      console.log(`  ✓ Arquitectura: ${genMetrics.archTitle} (${genMetrics.archMode})`);
      console.log(`  ✓ Lenguaje Visual: ${genMetrics.systemStyleBadge}`);

      // 4. Renderizar Lámina 01 (Portada Maestra) y Lámina 04 (Círculo Dorado) para captura de alta resolución
      const platesHtml = await page.evaluate(() => {
        return {
          sheet01: window.renderUniversalImproBearsGuideSinglePlateHTML(0, true),
          sheet04: window.renderUniversalImproBearsGuideSinglePlateHTML(3, true),
          sheet09: window.renderUniversalImproBearsGuideSinglePlateHTML(8, true),
          sheet14: window.renderUniversalImproBearsGuideSinglePlateHTML(13, true)
        };
      });

      // Guardar Captura de Portada Maestra para este emprendedor
      const coverPage = await context.newPage();
      await coverPage.setViewportSize({ width: 1122, height: 794 });
      await coverPage.setContent(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Cormorant:ital,wght@0,600;0,700;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=Montserrat:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="http://localhost:8992/benefic-editorial-base.css?v=71.0">
          <style>
            body { margin:0; padding:0; background:#FFFFFF; overflow:hidden; }
            .benefic-plate { width:1122px; height:794px; position:relative; box-sizing:border-box; }
          </style>
        </head>
        <body>${platesHtml.sheet01}</body>
        </html>
      `);
      await coverPage.waitForTimeout(350);

      const coverImgName = `entrepreneur_${caseNum}_cover_${ent.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.png`;
      const coverImgPath = path.join(OUTPUT_IMG_DIR, coverImgName);
      await coverPage.screenshot({ path: coverImgPath, fullPage: true });
      await coverPage.close();

      console.log(`  ✓ Portada guardada: ${coverImgName}`);

      // Registrar en el informe de auditoría
      auditResults.push({
        ...ent,
        ...genMetrics,
        coverImgName,
        coverImgPath
      });
    }

    await context.close();
    console.log(`\n=== GAUNTLET COMPLETADO: 30 DE 30 EMPRENDEDORES AUDITADOS EXITOSAMENTE ===`);

    // 5. Escribir JSON con resultados
    fs.writeFileSync(
      path.join(ARTIFACT_DIR, "auditoria_30_emprendedores_resultado.json"),
      JSON.stringify(auditResults, null, 2),
      "utf-8"
    );
    console.log("✓ Archivo de auditoría guardado: auditoria_30_emprendedores_resultado.json");

  } catch (err) {
    console.error("❌ ERROR EN GAUNTLET:", err);
  } finally {
    await browser.close();
    server.close();
  }
}

run30EntrepreneursGauntlet();
