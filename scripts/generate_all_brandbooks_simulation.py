#!/usr/bin/env python3
"""
Simulación Realista E2E de los 2 Equipos (Equipo A + Equipo B) creando 12 Brandbooks Completos:
1. Restaurante: "Brasa & Raíz"
2. Despacho Contable: "Vértice Patrimonial"
3. Colegio (Primaria, Secundaria y Preparatoria): "Colegio Ágora Nova"
4. Empresa B2B de Equipos de Laboratorio: "QuantaLab Científica"
5. Empresa de Campamentos para Escuelas y Empresas: "Cumbre Viva Expediciones"
6. Casa de Retiro para Adultos Mayores: "Villa Serena Residencia Senior"
7. Constructora de Casas: "Piedra Firme Residencial"
8. Mueblería en un Pueblo: "Mueblería El Roble de San Miguel"
9. Empresa de Automatización de Líneas Industriales (Matriz + 3 Sub-Marcas en Arquitectura):
   - 9A (Matriz): "Aksis Automation" (Automatización de Líneas Industriales)
   - 9B (Sub-Marca 1): "Aksis Mantenimiento" (Mantenimiento Industrial Predictivo y Correctivo 24/7)
   - 9C (Sub-Marca 2): "Aksis Transporte" (Transporte Especializado de Maquinaria y Logística Pesada)
   - 9D (Sub-Marca 3): "Aksis Control" (Telemetría IIoT, Tableros eléctricos y Software de Planta)
"""

import os
import sys
import json

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(os.path.join(ROOT_DIR, "packages", "brandbook-engine"))

from master_brandbook_compiler import MasterBrandbookCompiler
from vector_sanitizer import PrePressColorEngine
from naming_engine import NamingFilterEngine
from kansei_generative_architect import KanseiEngineeringQTT1Engine
from bespoke_logo_studio import BespokePentagramLogoEngine, DeepTouchpointEngineeringEngine

OUT_DIR = os.path.join(ROOT_DIR, "entregables_brandbooks")
os.makedirs(OUT_DIR, exist_ok=True)

SIMULATED_BRANDS = [
    {
        "id": "01_restaurante_brasa_y_raiz",
        "sector": "1. Dueño de Restaurante (Cocina de Leña y Hospitalidad)",
        "founder_persona": "Chef Mateo Valdés (42 años, dueño de restaurante de 140 comensales)",
        "chosen_name": "Brasa & Raíz",
        "tagline": "Cocina de origen al fuego lento y hospitalidad que abraza",
        "naming_style": "compuesto",
        "industry_key": "restaurante_gastronomia",
        "vault_finalists": ["Brasa & Raíz", "Lumbre Noble", "Casa Tizón", "Fogonero de Origen"],
        "nice_classes": "Clase 43 (Servicios de restauración y hospitalidad), Clase 29/30 (Salsas y conservas de la casa), Clase 35 (Franquicias)",
        "domains": ["brasayraiz.com", "brasayraiz.mx", "reservasbrasayraiz.com"],
        "purpose_why": "Rescatar los ingredientes del campo local y la ceremonia del fuego de leña para que cada comida familiar o de negocios se sienta como volver a casa.",
        "value_offer": "Cortes, vegetales a la brasa y pan de masa madre horneado al momento, servidos en menos de 18 minutos con hospitalidad cálida y acústica confortable.",
        "social_role": "Comercio justo directo con 18 productores agrícolas locales y cero desperdicio orgánico.",
        "process_steps": [
            "1. Selección diaria de ingredientes frescos de productores regionales a las 6:00 AM",
            "2. Cocción lenta en parrilla de encino blanco y horno de piedra a la vista del comensal",
            "3. Servicio de mesa sincronizado con maridaje y café de especialidad de despedida"
        ],
        "core_message": "Donde el fuego lento y la tierra se encuentran en tu mesa.",
        "brand_persona": "Anfitrión cálido, artesano del sabor, detallista, generoso y auténtico.",
        "customer_behavior": "Recibir por su nombre al cliente habitual, ofrecer degustación de pan recién horneado al sentarse y jamás apresurar la sobremesa.",
        "brand_world": "Madera de nogal carbonizada, latón envejecido, barro bruñido, luz cálida 2700K y aroma a leña de encino.",
        "ideal_customer": "Familias, parejas y ejecutivos que buscan ingredientes reales, trato humano sin pretensiones y un lugar memorable para celebrar.",
        "touchpoints_journey": {
            "antes": "Reels con sonido real de la brasa en Instagram · Reseñas 4.9★ en Google Maps · Menú interactivo y reserva en 2 clics por WhatsApp · Fachada con aroma a pan de leña",
            "durante": "Recepción cálida en atril de madera · Carta impresa en papel algodón antimanchas · Vajilla de cerámica artesanal con sello en la base · Portacuentas en cuero",
            "despues": "Caja térmica de autor para llevar con sello lacrado · Tarjeta con receta secreta de mantequilla ahumada · Mensaje de agradecimiento y club de comensales frecuentes"
        },
        "sliders": {
            "tradicional_innovador": -0.35,
            "minimalista_complejo": 0.15,
            "amigable_autoritario": -0.55,
            "humano_tecnologico": -0.65,
            "serio_jugueton": -0.15,
            "convencional_rebelde": 0.10,
            "organico_geometrico": -0.45
        },
        "base_family": "Familia 02 · Escudo o Sello Artesanal de Origen",
        "primary_font": "Playfair Display",
        "secondary_font": "Plus Jakarta Sans",
        "palette": ["#FAF6F0", "#1C1412", "#B45309", "#78350F"],
        "selected_24_traits": [
            "1A: Vértices Curvos Suaves", "2B: Masa Sólida 10pt (Para pirograbado en madera y mandil)", "3B: Sello Protector Circular",
            "4A: Vertical Firme 0°", "5B: Llama/Raíz en Espacio Negativo", "6B: Acomodo Vertical tipo Sello",
            "7A: Geometría Circular Solar", "8A: Trazo Único Continuo", "9B: Doble Fileteado de Gala",
            "10A: Diseño Plano 2D (Para sellos de tinta y bordado)", "11A: Terminales Redondeados", "12A: Núcleo Concentrado",
            "13B: Tipografía Clásica Serif (Playfair Display)", "14B: Letra Ancha Panorámica", "15A: Espaciado Amplio +0.30em",
            "16B: Caja Mixta Cercana (Brasa & Raíz)", "17B: Peso Fuerte Legible", "18B: Subtítulo Editorial Cursiva",
            "19A: Fondo Claro Crema/Alabastro", "20A: Color Cálido Ámbar/Brasa", "21A: Acento Terracota/Cobre",
            "22B: Contraste Tierra & Oro Viejo", "23A: Acabado Mate Papel Algodón", "24A: Tinta Sólida Pantone"
        ],
        "simulation_notes": "El dueño del restaurante amó que las pausas de voz no le cortaran sus ideas mientras recordaba los platillos. Pidió que en los Touchpoints existiera una plantilla específica para Menú QR + Carta Física + Empaque Delivery."
    },
    {
        "id": "02_despacho_contable_vertice",
        "sector": "2. Despacho Contable, Fiscal y Patrimonial",
        "founder_persona": "C.P.C. Elena Mondragón (49 años, Socia Directora de firma con 85 empresas clientes)",
        "chosen_name": "Vértice Patrimonial",
        "tagline": "Certeza fiscal, blindaje contable y paz financiera para tu empresa",
        "naming_style": "institucional",
        "industry_key": "consultoria_b2b",
        "vault_finalists": ["Vértice Patrimonial", "Verax Contadores", "Grupo Fiducia", "Ábaco Soberano"],
        "nice_classes": "Clase 35 (Contabilidad, auditoría fiscal y nóminas), Clase 36 (Consultoría financiera y patrimonial), Clase 45 (Cumplimiento legal y normativo)",
        "domains": ["verticepatrimonial.com", "verticefiscal.mx", "portalvertice.com"],
        "purpose_why": "Eliminar el miedo y la incertidumbre fiscal del empresario, transformando la contabilidad en una brújula estratégica que protege su patrimonio familiar y corporativo.",
        "value_offer": "Cierres contables antes del día 5 de cada mes, auditoría preventiva ante el SAT sin multas y tablero financiero en lenguaje claro para toma de decisiones.",
        "social_role": "Fomentar una cultura empresarial formal, ética, rentable y libre de contingencias fiscales.",
        "process_steps": [
            "1. Radiografía Fiscal 360° y detección de riesgos u oportunidades de deducción",
            "2. Automatización contable mensual con conciliación bancaria y blindaje de CFDI",
            "3. Junta mensual de Consejo con reporte ejecutivo de utilidades, flujo e impuestos"
        ],
        "core_message": "Tus números en orden absoluto. Tu patrimonio seguro.",
        "brand_persona": "Estratega incorruptible, claro, puntual, discreto y riguroso.",
        "customer_behavior": "Explicar leyes complejas sin tecnicismos confusos, anticiparse 15 días a cualquier vencimiento y responder urgencias en menos de 2 horas.",
        "brand_world": "Azul noche institucional, papel seguridad con marca de agua, gráficas limpias en verde esmeralda y tipografía suiza de alta legibilidad.",
        "ideal_customer": "Dueños de empresas PyME, médicos y directores generales que facturan entre $5M y $200M MXN y buscan dormir tranquilos.",
        "touchpoints_journey": {
            "antes": "Conferencias de reformas fiscales · Perfil corporativo en LinkedIn · Recomendación de banqueros y abogados · Sitio web con calculadora fiscal",
            "durante": "Carpeta ejecutiva de diagnóstico confidencial · Propuesta de honorarios transparente en PDF interactivo · Contrato con cláusula de confidencialidad y garantía",
            "despues": "Reporte mensual ejecutivo en 1 sola hoja ('Semáforo Fiscal') · Alertas preventivas por WhatsApp · Reunión trimestral de planeación patrimonial"
        },
        "sliders": {
            "tradicional_innovador": 0.15,
            "minimalista_complejo": -0.45,
            "amigable_autoritario": 0.65,
            "humano_tecnologico": 0.25,
            "serio_jugueton": -0.80,
            "convencional_rebelde": -0.50,
            "organico_geometrico": 0.75
        },
        "base_family": "Familia 01 · Monograma Geométrico de Precisión (VP)",
        "primary_font": "Plus Jakarta Sans",
        "secondary_font": "JetBrains Mono",
        "palette": ["#F8FAFC", "#0F172A", "#059669", "#C59B27"],
        "selected_24_traits": [
            "1B: Vértices Facetados 45° (Exactitud contable)", "2B: Masa Sólida 10pt", "3B: Escudo Contenedor Sobrio",
            "4A: Equilibrio Vertical Firme 0°", "5A: Líneas Explícitas Directas", "6A: Acomodo Horizontal Ejecutivo (Ideal para hojas membretadas)",
            "7B: Geometría Hexagonal Estructural", "8B: Módulos Constructivos", "9A: Síntesis Minimalista Limpia",
            "10A: Diseño Plano 2D", "11B: Terminales Rectos 90°", "12A: Núcleo Concentrado",
            "13A: Tipografía Moderna Sans", "14B: Letra Ancha Ejecutiva", "15A: Espaciado Amplio +0.30em",
            "16A: Mayúsculas de Autoridad", "17B: Peso Extra-Bold Fuerte", "18A: Subtítulo Técnico Tabular Mono",
            "19A: Fondo Claro Papel Seguridad", "20B: Color Frío Azul/Esmeralda Institucional", "21B: Acento Verde Esmeralda (Estabilidad)",
            "22A: Sobriedad Obsidiana & Esmeralda", "23B: Estampado Metálico en Carpetas Fiscales", "24A: Tinta Sólida Pantone"
        ],
        "simulation_notes": "La socia del despacho destacó que los 7 deslizadores con ejemplos de marcas reales le permitieron definir 'Autoridad sin verse anticuados'. Sugirió añadir plantillas de Firma de Correo y Portada de Dictamen Fiscal en el Paso 6."
    },
    {
        "id": "03_colegio_agora_nova",
        "sector": "3. Colegio con Primaria, Secundaria y Preparatoria (K-12)",
        "founder_persona": "Mtro. Rodrigo Santillán (Director General de institución educativa con 950 alumnos)",
        "chosen_name": "Colegio Ágora Nova",
        "tagline": "Mentes críticas, corazón humano y liderazgo para el mundo que viene",
        "naming_style": "institucional",
        "industry_key": "educacion_colegio",
        "vault_finalists": ["Colegio Ágora Nova", "Instituto Faro Real", "Liceo Verbum", "Colegio Cumbre Sabia"],
        "nice_classes": "Clase 41 (Educación primaria, secundaria y preparatoria; actividades deportivas y culturales), Clase 25 (Uniformes escolares y deportivos), Clase 16 (Libros y material didáctico)",
        "domains": ["colegioagoranova.edu.mx", "agoranova.mx", "admisionesagoranova.com"],
        "purpose_why": "Formar niños y jóvenes curiosos, bilingües y emocionalmente fuertes que descubran su vocación desde la primaria hasta ingresar a las mejores universidades.",
        "value_offer": "Continuidad formativa en 3 niveles (Primaria, Secundaria y Preparatoria) con laboratorios STEAM, programa socioemocional, certificaciones Cambridge y deporte competitivo.",
        "social_role": "Construir una comunidad de familias comprometidas con la ética, la ciencia, el arte y la ciudadanía global.",
        "process_steps": [
            "1. Primaria (6–12 años): Descubrimiento bilingüe, lectoescritura, pensamiento matemático y valores",
            "2. Secundaria (12–15 años): Proyectos científicos STEAM, debate crítico, autoconocimiento y trabajo en equipo",
            "3. Preparatoria (15–18 años): Especialización pre-universitaria, orientación vocacional y liderazgo internacional"
        ],
        "core_message": "Tres etapas, una misma excelencia humana y académica.",
        "brand_persona": "Mentor sabio, inspirador, seguro, innovador y cercano a las familias.",
        "customer_behavior": "Puertas abiertas para los padres, comunicación transparente en la app escolar y acompañamiento personalizado a cada alumno.",
        "brand_world": "Escudo heráldico modernizado (sin saturación para bordarse perfecto en playeras tipo polo y chamarras), azul real, oro solar y campus luminoso.",
        "ideal_customer": "Padres de familia que buscan un colegio seguro, de alto nivel académico y humano donde sus hijos puedan cursar desde 1° de Primaria hasta 6° de Preparatoria.",
        "touchpoints_journey": {
            "antes": "Open House vivencial en el campus · Recomendación entre padres de familia · Recorrido virtual 360° en web · Folleto de admisiones por nivel (Primaria, Secundaria, Prepa)",
            "durante": "Entrevista psicopedagógica cálida · Kit de bienvenida para el alumno nuevo · Plataforma digital de inscripción y colegiaturas sin filas",
            "despues": "Uniformes escolares de diario y gala con escudo bordado · Credencial inteligente de acceso seguro · App de comunicación diaria y festivales/torneos intercolegiales"
        },
        "sliders": {
            "tradicional_innovador": 0.25,
            "minimalista_complejo": 0.30,
            "amigable_autoritario": 0.20,
            "humano_tecnologico": -0.10,
            "serio_jugueton": -0.20,
            "convencional_rebelde": -0.25,
            "organico_geometrico": 0.45
        },
        "base_family": "Familia 02 · Escudo o Insignia de Autoridad Académica (Dividido en 3 estrellas por Primaria, Secundaria y Prepa)",
        "primary_font": "Plus Jakarta Sans",
        "secondary_font": "Playfair Display",
        "palette": ["#FAF8F5", "#0B192C", "#D4AF37", "#0284C7"],
        "selected_24_traits": [
            "1A: Vértices Curvos Amigables en el Escudo", "2B: Masa Sólida 10pt (Vital para bordar 2,000 uniformes al año)", "3B: Escudo Contenedor Heráldico Moderno",
            "4A: Vertical Firme 0°", "5A: Líneas Explícitas Claras", "6B: Acomodo Vertical Centrado (Sello de Gala y Uniformes)",
            "7B: Chasis Estructural", "8B: 3 Módulos Internos (Primaria, Secundaria, Prepa)", "9B: Doble Fileteado de Gala para Diplomas",
            "10A: Diseño Plano 2D (Cero degradados en bordado escolar)", "11A: Terminales Redondeados", "12B: Corona Radiante (Conocimiento que irradia)",
            "13A: Tipografía Moderna Sans para Señalética + Serif en Diplomas", "14B: Letra Ancha Institucional", "15A: Espaciado Amplio",
            "16A: Mayúsculas en Fachada y Escudo", "17B: Peso Extra-Bold Fuerte", "18B: Lema Humanista en Cursiva ('Scientia et Humanitas')",
            "19A: Fondo Claro Luminoso", "20B: Azul Marino Real con Oro Solar", "21A: Acento Dorado/Cian para Deportes",
            "22B: Contraste Azul Real, Oro y Blanco", "23B: Sello en Relieve Dorado para Títulos y Certificados", "24A: Tinta Sólida Pantone para Uniformes"
        ],
        "simulation_notes": "El Director del Colegio señaló que contar con 3 sub-niveles (Primaria, Secundaria y Preparatoria) requiere que el Brandbook muestre variaciones cromáticas de acento por nivel manteniendo el mismo escudo rector."
    },
    {
        "id": "04_b2b_laboratorio_quantalab",
        "sector": "4. Empresa B2B de Equipos de Laboratorio e Instrumentación",
        "founder_persona": "Ing. Quím. Ricardo Kuri (Director Comercial B2B para industria farmacéutica, alimentos y centros de investigación)",
        "chosen_name": "QuantaLab Científica",
        "tagline": "Precisión analítica certificada para laboratorios que no pueden fallar",
        "naming_style": "neologismo_portmanteau",
        "industry_key": "tecnologia_saas",
        "vault_finalists": ["QuantaLab Científica", "Metrixa Bio", "VeriSpectra", "KronoLab Systems"],
        "nice_classes": "Clase 09 (Aparatos e instrumentos científicos, ópticos, de pesaje y medición de laboratorio), Clase 37 (Instalación y mantenimiento de equipo científico), Clase 42 (Calibración metrológica ISO/IEC 17025)",
        "domains": ["quantalab.com.mx", "quantalabcientifica.com", "soporte.quantalab.io"],
        "purpose_why": "Garantizar que cada medición en un laboratorio farmacéutico, clínico o industrial tenga exactitud trazable internacionalmente, protegiendo la salud humana y la calidad industrial.",
        "value_offer": "Suministro llave en mano de espectrómetros, cromatógrafos y balanzas analíticas con instalación, calificación IQ/OQ/PQ y soporte técnico en sitio en menos de 24 horas.",
        "social_role": "Impulsar la ciencia y el control de calidad en el país mediante equipamiento confiable y metrología certificada.",
        "process_steps": [
            "1. Ingeniería de aplicación y dimensionamiento técnico según norma USP / FDA / COFEPRIS",
            "2. Importación ágil, instalación limpia y calificación operativa (IQ/OQ/PQ) en laboratorio",
            "3. Póliza de calibración acreditada EMA / ISO 17025 y suministro continuo de consumibles"
        ],
        "core_message": "Exactitud sub-micrónica. Respaldo técnico inmediato.",
        "brand_persona": "Científico experto, preciso, metódico, confiable y resolutivo.",
        "customer_behavior": "Documentación técnica impecable en cada entrega, trazabilidad de número de serie con código QR de calibración pegado en el chasis del equipo.",
        "brand_world": "Acero inoxidable grado médico, blanco clínico puro, azul cobalto óptico y etiquetas de calibración metalizadas de alta durabilidad a solventes.",
        "ideal_customer": "Directores de Control de Calidad, Gerentes de Planta Farmacéutica, Compradores Industriales B2B y Jefes de Laboratorio Universitario.",
        "touchpoints_journey": {
            "antes": "Catálogo técnico digital con hojas de datos (Datasheets) · Stands en congresos químicos/farma · Licitaciones técnicas y demostraciones con muestras reales",
            "durante": "Cotización B2B desglosada con tiempos de entrega Incoterms · Matriz de cumplimiento normativo (URS) · Orden de compra y financiamiento de arrendamiento puro",
            "despues": "Cajas de transporte anti-impacto con sellos de seguridad · Etiqueta metálica en el equipo con QR de certificado de calibración · Portal de tickets de servicio y consumibles"
        },
        "sliders": {
            "tradicional_innovador": 0.80,
            "minimalista_complejo": -0.60,
            "amigable_autoritario": 0.55,
            "humano_tecnologico": 0.85,
            "serio_jugueton": -0.75,
            "convencional_rebelde": 0.25,
            "organico_geometrico": 0.90
        },
        "base_family": "Familia 04 · Símbolo Tridimensional o Prisma Óptico de Precisión",
        "primary_font": "Space Grotesk",
        "secondary_font": "JetBrains Mono",
        "palette": ["#F8FAFC", "#090D16", "#0284C7", "#06B6D4"],
        "selected_24_traits": [
            "1B: Vértices Facetados 45°", "2B: Trazo Sólido Técnico", "3A: Símbolo Libre Abierto",
            "4A: Equilibrio Ortogonal 0°", "5A: Líneas de Ingeniería Explícitas", "6A: Acomodo Horizontal para Chasis de Equipos",
            "7B: Chasis Hexagonal Molecular", "8B: Ensamble Modular", "9A: Síntesis Minimalista Limpia",
            "10B: Prisma Isométrico 3D", "11B: Terminales Rectos 90°", "12A: Núcleo de Precisión",
            "13A: Tipografía Moderna Sans (Space Grotesk)", "14B: Letra Ancha Técnica", "15B: Espaciado Compacto de Ingeniería",
            "16A: Mayúsculas Técnicas", "17B: Peso Extra-Bold", "18A: Subtítulo Técnico en JetBrains Mono ('[ ISO/IEC 17025 CERTIFIED ]')",
            "19A: Fondo Blanco Clínico de Laboratorio", "20B: Azul Cobalto Científico", "21B: Acento Cian Óptico",
            "22A: Sobriedad Titanio, Blanco y Cobalto", "23B: Placa de Aluminio Anodizado Grabada en Láser", "24A: Tinta Sólida Resistente a Solventes"
        ],
        "simulation_notes": "Para B2B de laboratorio, la ficha técnica de grabado láser en placas de acero inoxidable y etiquetas resistentes a alcohol isopropílico fue decisiva."
    },
    {
        "id": "05_campamentos_cumbre_viva",
        "sector": "5. Empresa de Campamentos para Escuelas y Empresas",
        "founder_persona": "Lic. Sofía Aragón (36 años, fundadora de empresa de campamentos escolares y team-building corporativo)",
        "chosen_name": "Cumbre Viva",
        "tagline": "Aventura segura que transforma grupos en verdaderos equipos",
        "naming_style": "evocativo",
        "industry_key": "deporte_entretenimiento",
        "vault_finalists": ["Cumbre Viva", "Tribu Norte", "Kinetik Camp", "Senda Brava"],
        "nice_classes": "Clase 41 (Organización de campamentos educativos, deportivos y recreativos; talleres de liderazgo empresarial), Clase 39 (Transporte y excursiones), Clase 25 (Gorras, playeras dry-fit y buffs)",
        "domains": ["cumbreviva.com", "campamentoscumbreviva.mx", "empresas.cumbreviva.com"],
        "purpose_why": "Desconectar a niños, jóvenes y equipos corporativos de las pantallas para que descubran en la naturaleza su valentía, empatía y capacidad de lograr metas juntos.",
        "value_offer": "Campamentos todo incluido con protocolo de seguridad paramédica 24/7, staff certificado, metodologías de integración vivencial y sedes exclusivas cercadas.",
        "social_role": "Formar generaciones más resilientes, solidarias y respetuosas del medio ambiente, y culturas laborales más humanas.",
        "process_steps": [
            "1. Diagnóstico de objetivos con el colegio o área de Recursos Humanos (integración, liderazgo, graduación)",
            "2. Diseño del programa de retos outdoor, logística de transporte seguro, seguros médicos y brazaletes",
            "3. Ejecución del campamento con cobertura fotográfica diaria para padres/empresas y reporte de impacto"
        ],
        "core_message": "La aventura donde descubres de qué estás hecho.",
        "brand_persona": "Guía entusiasta, ultra-seguro, energético, empático y organizado.",
        "customer_behavior": "Doble filtro de seguridad en cada actividad, comunicación en tiempo real con padres de familia/directores y energía positiva contagiosa.",
        "brand_world": "Verde bosque profundo, naranja de alta visibilidad (seguridad en montaña), parches bordados coleccionables, banderines de patrulla y termos grabados.",
        "ideal_customer": "Directores de colegios particulares (que exigen seguridad total) y Directores de Recursos Humanos que buscan experiencias de alto impacto para sus líderes.",
        "touchpoints_journey": {
            "antes": "Video dinámico de seguridad y emoción para juntas de padres · Presentación ejecutiva para RH · Cotizador claro por participante",
            "durante": "Autobuses identificados · Brazaletes tejidos y paliacates por color de equipo · Señalética en cabañas y tirolesa · Uniformes de staff de alta visibilidad",
            "despues": "Parche bordado coleccionable de logro · Galería privada de fotos y aftermovie · Reporte de habilidades blandas para el colegio o empresa"
        },
        "sliders": {
            "tradicional_innovador": 0.40,
            "minimalista_complejo": 0.10,
            "amigable_autoritario": -0.45,
            "humano_tecnologico": -0.50,
            "serio_jugueton": 0.55,
            "convencional_rebelde": 0.35,
            "organico_geometrico": 0.25
        },
        "base_family": "Familia 02 · Insignia / Parche de Montaña y Brújula",
        "primary_font": "Syne",
        "secondary_font": "Plus Jakarta Sans",
        "palette": ["#FAF8F5", "#091512", "#EA580C", "#059669"],
        "selected_24_traits": [
            "1A: Vértices Curvos Amigables", "2B: Masa Sólida 10pt (Para parches bordados y banderas a 50 metros)", "3B: Escudo Tipo Parche de Expedición",
            "4B: Inclinación Dinámica +14° (Acción y ascenso)", "5B: Cumbre y Pino en Espacio Negativo", "6B: Acomodo Vertical Totémico",
            "7A: Anillo Circular tipo Brújula", "8A: Trazo Continuo Dinámico", "9B: Borde de Parche Bordado",
            "10A: Diseño Plano 2D de Alto Contraste", "11A: Terminales Redondeados", "12B: Corona Solar Radiante",
            "13A: Tipografía Moderna Sans", "14A: Letra Alta de Impacto en Playeras", "15B: Espaciado Compacto Unido",
            "16A: Mayúsculas de Energía", "17B: Peso Extra-Bold", "18B: Lema Cercano ('Aventura Segura · Equipos Fuertes')",
            "19A: Fondo Claro con Versión Nocturna de Fogata", "20A: Temperatura Cálida Naranja Fogata", "21A: Acento Naranja Cinético (#EA580C)",
            "22B: Contraste Verde Bosque & Naranja Seguridad", "23A: Textil Dry-Fit y Parche Bordado", "24A: Tinta Sólida para Serigrafía y Vinil"
        ],
        "simulation_notes": "La fundadora resaltó la dualidad de su negocio: necesita proyectar diversión y energía a los alumnos, pero máxima seriedad paramédica y logística a los directores de escuela y RH."
    },
    {
        "id": "06_casa_retiro_villa_serena",
        "sector": "6. Casa de Retiro y Residencia para Adultos Mayores",
        "founder_persona": "Dr. Fernando Elizondo (Geriatra y fundador de residencia asistida y club de día para adultos mayores)",
        "chosen_name": "Villa Serena",
        "tagline": "Plenitud, compañía cálida y cuidado médico digno en cada etapa de la vida",
        "naming_style": "evocativo",
        "industry_key": "salud_clinica",
        "vault_finalists": ["Villa Serena", "Casa Alba Dorada", "Estancia Plenitud", "Jardín de los Olivos"],
        "nice_classes": "Clase 43 (Residencias y estancias para adultos mayores), Clase 44 (Cuidados médicos geriátricos, enfermería, rehabilitación física y memoria), Clase 41 (Talleres cognitivos y recreativos)",
        "domains": ["villaserena.com.mx", "residenciavillaserena.com", "familias.villaserena.mx"],
        "purpose_why": "Honrar la vida y sabiduría de los adultos mayores brindándoles un hogar luminoso, activo y médicamente seguro, devolviendo la tranquilidad y calidad de tiempo a sus familias.",
        "value_offer": "Estancia permanente y residencia de día con valoración geriátrica integral, enfermería 24/7, jardines planos accesibles, gastronomía supervisada y talleres de estimulación cognitiva.",
        "social_role": "Erradicar la soledad del adulto mayor y dignificar el envejecimiento activo con amor, ciencia médica y respeto.",
        "process_steps": [
            "1. Recorrido empático con la familia y valoración geriátrica, nutricional y afectiva sin costo",
            "2. Plan personalizado de adaptación suave, habitación adaptada y rutina de talleres/fisioterapia",
            "3. Comunicación diaria con los hijos (bitácora de bienestar con fotos) y puertas abiertas los 365 días"
        ],
        "core_message": "Un hogar lleno de vida, cuidado experto y paz para toda la familia.",
        "brand_persona": "Médico humanista, cálido, paciente, luminoso y absolutamente confiable.",
        "customer_behavior": "Hablar siempre con respeto y cariño (nunca infantilizar al residente), letra grande de 16pt en todos los impresos y señalética de alto contraste anticaídas.",
        "brand_world": "Luz natural matutina, jardines de olivos, tonos arena cálidos, verde salvia relajante, madera clara y letras grandes sin reflejos deslumbrantes.",
        "ideal_customer": "Hijos adultos (40–65 años) que aman profundamente a sus padres y buscan el lugar más digno, seguro y cálido para su cuidado, así como adultos mayores independientes.",
        "touchpoints_journey": {
            "antes": "Guía descargable 'Cómo elegir con amor y sin culpa una residencia para tus padres' · Recorrido presencial con café en los jardines · Testimonios reales de familias",
            "durante": "Carpeta de bienvenida en letra grande (16pt) · Contrato transparente sin costos ocultos · Habitación personalizada con objetos queridos del residente",
            "despues": "Señalética interior ultra-legible para baja visión · Menú diario impreso en alto contraste · Reporte semanal de salud y alegría enviado por WhatsApp a los hijos"
        },
        "sliders": {
            "tradicional_innovador": -0.20,
            "minimalista_complejo": -0.50,
            "amigable_autoritario": -0.75,
            "humano_tecnologico": -0.80,
            "serio_jugueton": -0.25,
            "convencional_rebelde": -0.60,
            "organico_geometrico": -0.65
        },
        "base_family": "Familia 03 · Símbolo Fluido de un Solo Trazo (Abrazo Protector y Hoja de Olivo)",
        "primary_font": "Plus Jakarta Sans",
        "secondary_font": "Playfair Display",
        "palette": ["#FAF8F5", "#1E293B", "#059669", "#D4AF37"],
        "selected_24_traits": [
            "1A: Vértices Curvos Suaves (Cero puntas agresivas)", "2B: Trazo Grueso de Alta Visibilidad para Adultos Mayores", "3A: Símbolo Abierto Luminoso",
            "4A: Equilibrio Estable 0°", "5A: Líneas Claras Directas", "6A: Acomodo Horizontal de Lectura Fácil",
            "7A: Geometría Circular de Abrazo", "8A: Cinta Continua de Acompañamiento", "9A: Síntesis Limpia sin Ruido Visual",
            "10A: Diseño Plano 2D de Máximo Contraste", "11A: Terminales Redondeados Amables", "12A: Núcleo Cálido Protector",
            "13A: Tipografía Limpia de Alta Legibilidad", "14B: Letra Ancha y Clara", "15A: Espaciado Amplio para Baja Visión",
            "16B: Mayúscula Inicial y Minúsculas (Más amigable y fácil de leer para el adulto mayor)", "17B: Peso Fuerte Legible", "18B: Subtítulo Cálido Humanista",
            "19A: Fondo Claro Marfil Antirreflejante", "20A: Tonos Cálidos Solares y Verde Esperanza", "21B: Acento Verde Esmeralda Sereno",
            "22B: Armonía Marfil, Azul Pizarra, Verde Salvia y Oro Suave", "23A: Acabado Mate Sedoso (PROHIBIDO papel brillante que deslumbre)", "24A: Tinta Sólida de Contraste AAA (> 10:1)"
        ],
        "simulation_notes": "El dueño de la casa de retiro aplaudió el botón '👁️ A+' de accesibilidad visual y exigió que el Brandbook prohíba expresamente papeles couché brillantes porque deslumbran a personas con cataratas o presbicia."
    },
    {
        "id": "07_constructora_piedra_firme",
        "sector": "7. Empresa de Construcción de Casas y Desarrollos Residenciales",
        "founder_persona": "Arq. e Ing. Javier Castellanos (Director de constructora residencial de viviendas personalizadas y privadas)",
        "chosen_name": "Piedra Firme Residencial",
        "tagline": "Casas construidas con rigor estructural, a tiempo y a precio cerrado",
        "naming_style": "compuesto",
        "industry_key": "bienes_raices_construccion",
        "vault_finalists": ["Piedra Firme Residencial", "Cimiento Noble", "Domus Vértice", "Arkitekton Hogar"],
        "nice_classes": "Clase 37 (Construcción de casas, supervisión de obra civil y urbanización), Clase 42 (Diseño arquitectónico, cálculo estructural y renderizado BIM), Clase 36 (Comercialización inmobiliaria)",
        "domains": ["piedrafirme.mx", "piedrafirmeresidencial.com", "miobra.piedrafirme.mx"],
        "purpose_why": "Acabar con la pesadilla de las obras que cuestan el doble y tardan el doble, entregando a cada familia su casa soñada con presupuesto cerrado por contrato y calidad estructural certificada.",
        "value_offer": "Diseño arquitectónico y construcción llave en mano con metodología BIM, bitácora semanal en video con dron, fecha de entrega garantizada por penalización contractual y póliza de vicios ocultos por 10 años.",
        "social_role": "Crear hogares seguros, térmicamente eficientes y de alta plusvalía patrimonial con trato digno y seguro social para todos los trabajadores de obra.",
        "process_steps": [
            "1. Proyecto Ejecutivo BIM y Presupuesto Paramétrico a Precio Alzado (Cero sorpresas)",
            "2. Construcción por etapas auditables con reporte fotográfico/dron cada viernes por WhatsApp",
            "3. Entrega de llaves en caja de madera grabada con Manual del Propietario, planos As-Built y Garantía de 10 años"
        ],
        "core_message": "Construimos tu patrimonio con la solidez que tu familia merece.",
        "brand_persona": "Arquitecto constructor honesto, puntual, técnico, transparente y sólido.",
        "customer_behavior": "Obras impecablemente limpias y señalizadas, cascos y chalecos uniformados, y cuentas claras al centavo.",
        "brand_world": "Concreto arquitectónico aparente, acero negro, madera de tzalam, lonas perimetrales tensadas impecables y planos constructivos de precisión.",
        "ideal_customer": "Familias que compraron un terreno residencial o inversionistas patrimoniales que quieren construir sin estrés, sobrecostos ni retrasos.",
        "touchpoints_journey": {
            "antes": "Lonas perimetrales y tótems en obras activas (el mejor anuncio) · Recorridos en video de casas entregadas · Guía de costos reales de construcción por m²",
            "durante": "Carpeta de Proyecto Ejecutivo y catálogo de acabados físicos · Cascos blancos personalizados para la visita de la familia a su obra · Reporte semanal en vivo",
            "despues": "Caja de madera con llaves, planos hidráulicos/eléctricos As-Built y Póliza de Garantía · Placa metálica discreta en el acceso de la residencia · Visita de cortesía al mes 6"
        },
        "sliders": {
            "tradicional_innovador": 0.35,
            "minimalista_complejo": -0.40,
            "amigable_autoritario": 0.50,
            "humano_tecnologico": 0.30,
            "serio_jugueton": -0.65,
            "convencional_rebelde": -0.15,
            "organico_geometrico": 0.85
        },
        "base_family": "Familia 04 · Símbolo Arquitectónico Isométrico (Estructura de Casa y Viga Maestra)",
        "primary_font": "Space Grotesk",
        "secondary_font": "Plus Jakarta Sans",
        "palette": ["#F5F3EF", "#18181B", "#B45309", "#52525B"],
        "selected_24_traits": [
            "1B: Vértices Angulares a 45° y 90° (Escuadra de albañilería e ingeniería)", "2B: Masa Sólida 10pt (Visible a 50m en lonas de obra)", "3B: Marco Estructural Cuadrado",
            "4A: Plomada Vertical Perfecta 0°", "5B: Silueta de Techo/Columna en Espacio Negativo", "6A: Acomodo Horizontal para Lonas y Camionetas",
            "7B: Chasis Poligonal Estructural", "8B: Bloques Modulares", "9A: Síntesis Minimalista Fuerte",
            "10B: Volumen Isométrico Arquitectónico", "11B: Terminales Rectos a Escuadra 90°", "12A: Núcleo de Cimiento Sólido",
            "13A: Tipografía Moderna Geométrica", "14B: Letra Ancha de Gran Aplomo", "15A: Espaciado Amplio Arquitectónico",
            "16A: Mayúsculas de Autoridad", "17B: Peso Extra-Bold Monumental", "18A: Subtítulo Técnico en Planos ('[ ARQUITECTURA & INGENIERÍA RESIDENCIAL ]')",
            "19A: Fondo Piedra Caliza / Concreto Claro", "20A: Acento Cobre / Terracota Arquitectónico", "21A: Acento Ámbar Seguridad",
            "22A: Sobriedad Acero, Concreto y Cobre", "23A: Acabado Mate Mineral y Placa de Latón Cepillado en Fachada", "24A: Tinta Sólida para Vinil de Maquinaria y Cascos"
        ],
        "simulation_notes": "El constructor destacó que donde más se ve su marca es en la calle: en la lona de obra de 6x3 metros, en las puertas de las camionetas pick-up y en los cascos de seguridad."
    },
    {
        "id": "08_muebleria_pueblo_el_roble",
        "sector": "8. Mueblería en un Pueblo (Artesanía en Madera y Tradición Familiar)",
        "founder_persona": "Don Hilario y su hijo Adrián Mendoza (Mueblería tradicional en pueblo mágico/cabecera municipal en transición generacional)",
        "chosen_name": "Mueblería El Roble",
        "tagline": "Muebles de madera verdadera hechos para durar generaciones",
        "naming_style": "tradicional",
        "industry_key": "comercio_local",
        "vault_finalists": ["Mueblería El Roble", "Casa Mendoza Ebanistería", "Raíz de Pueblo", "Madera Viva San Miguel"],
        "nice_classes": "Clase 20 (Muebles de madera, comedores, recámaras y ebanistería), Clase 35 (Exhibición y venta minorista/mayorista de muebles), Clase 39 (Flete y entrega a domicilio protegida)",
        "domains": ["muebleriaelroble.mx", "elroblesanmiguel.com", "catalogo.muebleriaelroble.mx"],
        "purpose_why": "Preservar el oficio ebanista de nuestro pueblo fabricando muebles de madera maciza con ensambles reales (no aglomerado desechable) que se convierten en la herencia de cada hogar.",
        "value_offer": "Comedores, recámaras y muebles a medida en parota, encino y cedro estufado, con facilidades de apartado/pago local, entrega a domicilio en toda la región y garantía de por vida en ensambles.",
        "social_role": "Dar empleo digno a los talleres de carpintería de las familias del pueblo y llevar el orgullo de nuestra artesanía a clientes de toda la región y ciudades cercanas.",
        "process_steps": [
            "1. Selección de madera estufada de primera y diseño personalizado con el cliente en tienda o por WhatsApp",
            "2. Ensamble artesanal de caja y espiga en el taller del pueblo con acabado de cera y laca resistente al calor",
            "3. Entrega cuidadosa en camioneta propia hasta la sala del cliente, armado e hidratación de la madera"
        ],
        "core_message": "De las manos de nuestro pueblo al corazón de tu hogar.",
        "brand_persona": "Maestro carpintero honrado, cercano, orgulloso de su tierra, cumplido y amable.",
        "customer_behavior": "Saludar a todos como vecinos, dejar que el cliente toque y huela la madera, cumplir la fecha prometida y regalar una tablita de picar o cera protectora en cada entrega.",
        "brand_world": "Olor a cedro y cera de abeja, rótulo pintado a mano y forja en la fachada del local, etiquetas de cuero o cartón kraft colgadas con cordel de ixtle y sello quemador de bronce sobre la madera.",
        "ideal_customer": "Familias del pueblo y la región que amueblan su casa, recién casados y compradores de ciudad o casas de campo que buscan muebles auténticos de madera maciza.",
        "touchpoints_journey": {
            "antes": "Fachada acogedora en la calle principal del pueblo con un gran mueble en exhibición · Catálogo fácil por WhatsApp con precios claros · Videos cortos mostrando cómo se ensambla la madera real",
            "durante": "Etiquetas colgantes grandes en cada mueble (tipo de madera, medidas, precio de contado y apartado) · Nota de venta clara · Café de olla mientras eligen telas y tonos",
            "despues": "Camioneta de reparto bien rotulada que recorre el pueblo y carreteras · Sello pirograbado con calor debajo de cada mesa · Frasco de cera nutritiva con el logo para cuidar el mueble"
        },
        "sliders": {
            "tradicional_innovador": -0.60,
            "minimalista_complejo": 0.05,
            "amigable_autoritario": -0.65,
            "humano_tecnologico": -0.75,
            "serio_jugueton": -0.20,
            "convencional_rebelde": -0.45,
            "organico_geometrico": -0.35
        },
        "base_family": "Familia 02 · Sello de Taller Ebanista (Apto para Pirograbado en Madera con Hierro Caliente)",
        "primary_font": "Playfair Display",
        "secondary_font": "Plus Jakarta Sans",
        "palette": ["#FAF5EE", "#271810", "#92400E", "#065F46"],
        "selected_24_traits": [
            "1A: Vértices Curvos Suaves", "2B: Trazo Grueso 10pt (Indispensable para que el sello quemador en madera no se empaste)", "3B: Sello Oval/Circular de Taller",
            "4A: Equilibrio Firme 0°", "5B: Hoja de Roble y Veta en Espacio Negativo", "6B: Acomodo Vertical de Sello Artesanal",
            "7A: Anillo Circular de Sello", "8A: Trazo Continuo Noble", "9B: Doble Anillo Tradicional ('Desde 1984')",
            "10A: Diseño Plano 2D (100% reproducible en sello de bronce caliente y esténcil)", "11A: Terminales Redondeados", "12A: Núcleo Concentrado",
            "13B: Tipografía con Patines Clásicos (Tradición y Confianza)", "14B: Letra Ancha Legible en el Rótulo de la Calle", "15A: Espaciado Claro",
            "16B: Caja Mixta Cercana ('Mueblería El Roble')", "17B: Peso Fuerte", "18B: Subtítulo Tradicional ('Artesanos de la Madera · San Miguel')",
            "19A: Fondo Crema / Papel Kraft", "20A: Tonos Cálidos Nogal y Miel", "21B: Acento Verde Pino / Bosque",
            "22B: Madera Nogal, Miel y Verde Bosque", "23A: Acabado Natural en Papel Kraft y Pirograbado en Madera", "24A: Tinta Sólida 1 Tinta para Sellos y Cajas"
        ],
        "simulation_notes": "Don Hilario y su hijo descubrieron en el Paso 5 por qué un logo con líneas delgaditas o degradados no sirve para un sello quemador de bronce sobre madera. Quedaron encantados con la guía de taller."
    },
    {
        "id": "09A_automatizacion_matriz_aksis",
        "sector": "9A. [MARCA MATRIZ] Implementación de Automatizaciones en Líneas Industriales",
        "founder_persona": "Ing. Mecatrónico Alejandro Villarreal (CEO de Grupo Industrial en expansión hacia 4 unidades de negocio)",
        "chosen_name": "Aksis Automation",
        "tagline": "Ingeniería robótica y líneas autónomas de manufactura sin paros",
        "naming_style": "neologismo_portmanteau",
        "industry_key": "tecnologia_saas",
        "architecture_role": "MARCA MATRIZ (HOUSE OF BRANDS / BRANDED HOUSE MONOLÍTICA CON ENDOSO CROMÁTICO)",
        "sibling_brands": ["Aksis Mantenimiento (División Mantenimiento Industrial)", "Aksis Transporte (División Logística Pesada y Rigging)", "Aksis Control (División Software IIoT y Tableros)"],
        "vault_finalists": ["Aksis Automation", "Kinetix Industrial", "Vektor PLC", "AutomaTek Group"],
        "nice_classes": "Clase 07 (Robots industriales, transportadores y máquinas automatizadas), Clase 09 (PLC, sensores, visión artificial y tableros de control), Clase 42 (Ingeniería de automatización industrial)",
        "domains": ["aksis.industrial", "aksisautomation.com", "grupoaksis.mx"],
        "purpose_why": "Multiplicar la productividad, seguridad y precisión de las fábricas mediante celdas robóticas y líneas automatizadas llave en mano que operan 24/7 con cero defectos.",
        "value_offer": "Diseño mecánico, integración de robots (FANUC/KUKA/ABB), programación PLC/SCADA y puesta en marcha (FAT/SAT) garantizando el retorno de inversión (ROI) y el OEE comprometido por contrato.",
        "social_role": "Modernizar la planta productiva nacional liberando a los operadores humanos de tareas peligrosas o ergonómicamente lesivas y elevando sus puestos a supervisión técnica.",
        "process_steps": [
            "1. Levantamiento láser 3D en planta, simulación de tiempos de ciclo y propuesta técnica con ROI calculado",
            "2. Fabricación de celda, armado de tableros UL508A y pruebas de aceptación en fábrica (FAT)",
            "3. Instalación en ventana de paro programado, pruebas en sitio (SAT) y transferencia a Aksis Mantenimiento"
        ],
        "core_message": "Ingeniería en movimiento. Producción sin límites.",
        "brand_persona": "Ingeniero jefe de planta: exacto, impecable en normas de seguridad, innovador y orientado a métricas OEE.",
        "customer_behavior": "Cumplir ventanas críticas de instalación sin retrasar un minuto el arranque de línea del cliente; tableros eléctricos peinados con estándar internacional.",
        "brand_world": "Gris grafito anodizado, naranja robótico de alta energía, aluminio extruido, placas de identificación grabadas en láser y pantallas HMI en modo oscuro.",
        "ideal_customer": "Directores de Operaciones, Gerentes de Ingeniería de Planta y Compras Corporativas en industrias automotriz (Tier 1/2), alimentos y bebidas, metalmecánica y empaque.",
        "touchpoints_journey": {
            "antes": "Videos en cámara rápida (timelapse) de líneas instaladas en LinkedIn · Participación en exposiciones industriales (FABTECH / Automate) · Dossier técnico de capacidades",
            "durante": "Propuesta de ingeniería con layout 3D y simulación de ciclo · Invitación a pruebas FAT en nave propia · Protocolo de seguridad EHS y fianzas de cumplimiento",
            "despues": "Placa de acero inoxidable remachada en la celda robótica con QR de diagramas eléctricos · Pantalla de inicio en el HMI con el logo de Aksis · Póliza directa con Aksis Mantenimiento"
        },
        "sliders": {
            "tradicional_innovador": 0.85,
            "minimalista_complejo": -0.55,
            "amigable_autoritario": 0.65,
            "humano_tecnologico": 0.90,
            "serio_jugueton": -0.70,
            "convencional_rebelde": 0.40,
            "organico_geometrico": 0.95
        },
        "base_family": "Familia 01 · Monograma Hexagonal Isométrico 'AK' (Chasis Rector compartido por las 4 marcas del Grupo)",
        "primary_font": "Space Grotesk",
        "secondary_font": "JetBrains Mono",
        "palette": ["#090D16", "#F8FAFC", "#EA580C", "#38BDF8"],
        "selected_24_traits": [
            "1B: Vértices Facetados a 45° (Chaflán mecánico CNC)", "2B: Masa Sólida 10pt", "3A: Chasis Hexagonal Abierto",
            "4B: Inclinación Cinética +14° (Velocidad de línea)", "5B: Eje Robótico en Espacio Negativo", "6A: Acomodo Horizontal Modular (Permite intercambiar el descriptor de las 3 sub-marcas)",
            "7B: Geometría Hexagonal de Ingeniería", "8B: Módulos Constructivos (1 módulo por división del grupo)", "9A: Síntesis Minimalista Industrial",
            "10B: Volumen Isométrico 3D", "11B: Terminales Rectos a 90°", "12A: Núcleo de Torque",
            "13A: Tipografía Moderna Sans (Space Grotesk)", "14B: Letra Ancha Industrial", "15B: Espaciado Compacto Sólido",
            "16A: Mayúsculas Industriales ('AKSIS')", "17B: Peso Extra-Bold 900", "18A: Subtítulo Técnico en JetBrains Mono ('[ AUTOMATION · INDUSTRIAL LINES ]')",
            "19B: Fondo Nocturno Obsidiana (Para pantallas HMI y gabinetes)", "20A: Naranja Robótico de Alta Energía (#EA580C)", "21A: Acento Naranja Cinético",
            "22B: Contraste Grafito, Naranja Robótico y Cian Telemetría", "23B: Placa de Acero Inoxidable Grabada con Láser de Fibra", "24A: Tinta Sólida Pantone + Versión OLED para Pantallas HMI"
        ],
        "simulation_notes": "Al crear la marca matriz, el CEO pidió no tener que repetir los 6 pasos desde cero para sus otras 3 empresas (Mantenimiento, Transporte y Control). Aquí nació la práctica de 'Arquitectura Multi-Marca con Herencia de ADN'."
    },
    {
        "id": "09B_submarca_aksis_mantenimiento",
        "sector": "9B. [SUB-MARCA 1 DE ARQUITECTURA] Mantenimiento Industrial 24/7",
        "founder_persona": "Ing. Alejandro Villarreal + Gerente de Servicio Post-Venta",
        "chosen_name": "Aksis Mantenimiento",
        "tagline": "Continuidad operativa 24/7 y mantenimiento predictivo cero paros",
        "naming_style": "compuesto",
        "industry_key": "tecnologia_saas",
        "architecture_role": "SUB-MARCA ENDOSADA #01 (Hereda el 85% del ADN geométrico y tipográfico de Aksis Automation; cambia acento cromático a Verde Esmeralda Operativo #10B981 y descriptor modular)",
        "vault_finalists": ["Aksis Mantenimiento", "Aksis Care 24/7", "Aksis Uptime", "Aksis Service"],
        "nice_classes": "Clase 37 (Mantenimiento preventivo, predictivo y correctivo de maquinaria industrial y líneas de producción)",
        "domains": ["mantenimiento.aksis.industrial", "aksiscare.com", "sos.aksis.mx"],
        "purpose_why": "Asegurar que ninguna línea industrial se detenga de forma imprevista, respondiendo en minutos y anticipando fallas mecánicas o eléctricas mediante termografía y vibraciones.",
        "value_offer": "Pólizas de mantenimiento industrial 24/7 con SLA de llegada en menos de 2 horas, análisis predictivo de vibración/termografía y stock crítico de refacciones en consignación.",
        "social_role": "Proteger la continuidad de las fuentes de trabajo industriales y prevenir accidentes en planta por falta de mantenimiento.",
        "process_steps": [
            "1. Auditoría de criticidad de activos e instalación de etiquetas QR de historial en cada máquina",
            "2. Rutinas programadas de mantenimiento preventivo y diagnóstico predictivo sin detener producción",
            "3. Escuadrón de respuesta de emergencia 24/7 y reporte mensual de disponibilidad (MTBF / MTTR)"
        ],
        "core_message": "Tu planta siempre en verde. Cero paros no programados.",
        "brand_persona": "Especialista de respuesta rápida: confiable, prevenido, disponible 24/7 y metódico.",
        "customer_behavior": "Camionetas taller impecables, técnicos certificados con EPP completo y semáforo verde de estatus de máquina.",
        "brand_world": "Hereda el chasis hexagonal 'AK' de Aksis, pero sustituye el Naranja Robótico por Verde Esmeralda de 'Línea Operativa Activa' (#10B981) en uniformes antimanchas, cajas de herramientas y etiquetas LOTO.",
        "ideal_customer": "Gerentes de Mantenimiento y Jefes de Planta que pierden miles de dólares por cada hora de paro de línea.",
        "touchpoints_journey": {
            "antes": "Diagnóstico termográfico gratuito de un tablero crítico · Venta cruzada directa desde cada proyecto de Aksis Automation",
            "durante": "Póliza anual con niveles de servicio (SLA) claros · Etiquetado QR de cada activo en la planta del cliente",
            "despues": "Unidades móviles taller rotuladas · Candados de bloqueo LOTO personalizados · Bitácora digital de salud de máquina"
        },
        "sliders": {
            "tradicional_innovador": 0.70,
            "minimalista_complejo": -0.55,
            "amigable_autoritario": 0.60,
            "humano_tecnologico": 0.75,
            "serio_jugueton": -0.75,
            "convencional_rebelde": 0.20,
            "organico_geometrico": 0.95
        },
        "base_family": "Familia 01 · Monograma Hexagonal Isométrico 'AK' (Heredado de Marca Matriz + Código Cromático Verde Uptime)",
        "primary_font": "Space Grotesk",
        "secondary_font": "JetBrains Mono",
        "palette": ["#090D16", "#F8FAFC", "#10B981", "#059669"],
        "selected_24_traits": [
            "Hereda los atributos estructurales 1 al 18 de la Marca Matriz (Aksis) para mantener unidad de grupo",
            "Cambia Atributo 18A: Subtítulo Técnico '[ MANTENIMIENTO INDUSTRIAL 24/7 ]'",
            "Cambia Atributos 20 y 21: Color Primario Verde Esmeralda Operativo (#10B981, código universal de máquina funcionando en planta)"
        ],
        "simulation_notes": "PRÁCTICA MULTI-MARCA: En lugar de responder todo desde cero, al activar 'Crear Sub-Marca desde Matriz', el tiempo de creación bajó de 25 minutos a 3 minutos conservando coherencia total."
    },
    {
        "id": "09C_submarca_aksis_transporte",
        "sector": "9C. [SUB-MARCA 2 DE ARQUITECTURA] Transporte Industrial y Movimiento de Maquinaria",
        "founder_persona": "Ing. Alejandro Villarreal + Director de Logística y Maniobras (Rigging)",
        "chosen_name": "Aksis Transporte",
        "tagline": "Logística pesada, traslado de líneas completas y maniobras de alta precisión",
        "naming_style": "compuesto",
        "industry_key": "tecnologia_saas",
        "architecture_role": "SUB-MARCA ENDOSADA #02 (Hereda el 85% del ADN de Aksis; cambia acento cromático a Ámbar Vial de Alta Visibilidad #F59E0B para tractocamiones, grúas y escoltas)",
        "vault_finalists": ["Aksis Transporte", "Aksis Rigging & Freight", "Aksis Cargo Industrial", "Aksis Heavy Move"],
        "nice_classes": "Clase 39 (Transporte especializado de maquinaria pesada, camas bajas, grúas industriales, embalaje y logística puerta a puerta)",
        "domains": ["transporte.aksis.industrial", "aksisfreight.com", "rastreo.aksis.mx"],
        "purpose_why": "Mover prensas, celdas robóticas y líneas de producción multimillonarias de un país o estado a otro sin un solo rasguño, vibración ni retraso aduanal.",
        "value_offer": "Flota propia de plataformas con suspensión neumática, grúas hidráulicas para maniobras intramuros (rigging), embalaje anticorrosivo VCI, seguro por el 100% del valor de la maquinaria y telemetría GPS satelital en vivo.",
        "social_role": "Conectar los corredores industriales con seguridad vial ejemplar y operadores certificados.",
        "process_steps": [
            "1. Estudio de ruta, permisos de carga sobredimensionada y plan de izaje (Rigging Plan) certificado",
            "2. Embalaje industrial con sensores de impacto/inclinación y carga con grúas de precisión",
            "3. Traslado escoltado con rastreo GPS en vivo y descarga/nivelación láser en la nave destino"
        ],
        "core_message": "Movemos el peso de tu industria con precisión milimétrica.",
        "brand_persona": "Capitán logístico: puntual, blindado en seguridad vial, fuerte y calculador.",
        "customer_behavior": "Enlace de rastreo GPS en vivo compartido con el cliente desde que sale el tractocamión hasta que se nivela la máquina.",
        "brand_world": "Tractocamiones y plataformas en grafito oscuro con franjas reflectantes en Ámbar Vial (#F59E0B), eslingas certificadas y cajas de madera tratadas con esténcil industrial.",
        "ideal_customer": "Gerentes de Tráfico, Directores de Planta en reubicación de líneas (Nearshoring) y fabricantes de maquinaria (OEMs).",
        "touchpoints_journey": {
            "antes": "Presencia imponente de los tractocamiones y grúas en parques industriales y autopistas · Cotizador de maniobras y flete especializado",
            "durante": "Plan de Izaje (Rigging Plan) firmado · Link de monitoreo satelital en tiempo real y sensores de impacto",
            "despues": "Acta de entrega con nivelación láser verificada · Fotos del equipo instalado sin daños"
        },
        "sliders": {
            "tradicional_innovador": 0.65,
            "minimalista_complejo": -0.50,
            "amigable_autoritario": 0.75,
            "humano_tecnologico": 0.70,
            "serio_jugueton": -0.80,
            "convencional_rebelde": 0.25,
            "organico_geometrico": 0.95
        },
        "base_family": "Familia 01 · Monograma Hexagonal Isométrico 'AK' (Heredado de Marca Matriz + Código Cromático Ámbar Vial #F59E0B)",
        "primary_font": "Space Grotesk",
        "secondary_font": "JetBrains Mono",
        "palette": ["#090D16", "#F8FAFC", "#F59E0B", "#D97706"],
        "selected_24_traits": [
            "Hereda la geometría hexagonal e inclinación +14° de Aksis (ideal para puertas de tractocamiones y cajas)",
            "Cambia Atributo 18A: Subtítulo Técnico '[ TRANSPORTE INDUSTRIAL & RIGGING ]'",
            "Cambia Atributos 20 y 21: Color Primario Ámbar Vial Reflectante (#F59E0B, máxima visibilidad carretera diurna y nocturna)"
        ],
        "simulation_notes": "PRÁCTICA MULTI-MARCA: En la división de transporte, el sistema mantuvo el símbolo 'AK' inclinado a +14° (que luce increíble en la cabina de los tráileres) pero ajustó las normas de aplicación a vinil grado ingeniería reflectante."
    },
    {
        "id": "09D_submarca_aksis_control",
        "sector": "9D. [SUB-MARCA 3 DE ARQUITECTURA] Software IIoT, Telemetría OEE y Tableros de Control",
        "founder_persona": "Ing. Alejandro Villarreal + Directora de Software Industrial e Industria 4.0",
        "chosen_name": "Aksis Control",
        "tagline": "Inteligencia de planta en tiempo real y telemetría OEE en la nube",
        "naming_style": "compuesto",
        "industry_key": "tecnologia_saas",
        "architecture_role": "SUB-MARCA ENDOSADA #03 (Hereda el 85% del ADN de Aksis; cambia acento cromático a Azul Cian Digital #06B6D4 para dashboards cloud, sensores IIoT y gabinetes de control)",
        "vault_finalists": ["Aksis Control", "Aksis Pulse IIoT", "Aksis Cloud SCADA", "Aksis Neural Plant"],
        "nice_classes": "Clase 09 (Software industrial descargable, gateways IIoT y tableros eléctricos), Clase 42 (Plataforma SaaS de monitoreo industrial en la nube e inteligencia de datos de manufactura)",
        "domains": ["control.aksis.industrial", "aksispulse.io", "app.aksiscontrol.com"],
        "purpose_why": "Dar visibilidad instantánea desde el celular o sala de control a cada segundo de producción, consumo energético y eficiencia OEE de toda la fábrica.",
        "value_offer": "Plataforma plug-and-play que se conecta a cualquier PLC nuevo o antiguo en 48 horas, mostrando paros, micro-paros, calidad y alertas automáticas a Aksis Mantenimiento.",
        "social_role": "Democratizar la Industria 4.0 y la eficiencia energética en las fábricas latinoamericanas.",
        "process_steps": [
            "1. Conexión no invasiva de Gateway IIoT al tablero eléctrico de la línea en menos de 2 horas",
            "2. Configuración de dashboards OEE en pantallas Andon de planta y app móvil para el Director",
            "3. Alertas predictivas conectadas automáticamente con el escuadrón de Aksis Mantenimiento"
        ],
        "core_message": "Toda tu fábrica en una sola pantalla, en tiempo real.",
        "brand_persona": "Arquitecto de datos industriales: ágil, visionario, preciso y digital.",
        "customer_behavior": "Interfaz oscura sin fatiga visual para cuartos de control 24/7, alertas accionables sin spam y ciberseguridad industrial.",
        "brand_world": "Modo oscuro #090D16 con acentos en Azul Cian Telemetría (#06B6D4), pantallas Andon gigantes en nave industrial y gateways metálicos compactos.",
        "ideal_customer": "Directores de Transformación Digital, Gerentes de Mejora Continua (Lean/Six Sigma) y Directores de Operaciones.",
        "touchpoints_journey": {
            "antes": "Demo interactiva en vivo en tablet/celular · Calculadora de pérdidas ocultas por micro-paros",
            "durante": "Prueba piloto de 15 días en 1 línea crítica · Dashboard personalizado con el logo del cliente y endoso Aksis Control",
            "despues": "Pantallas Andon en planta · App móvil iOS/Android · Reportes automáticos de turno cada mañana a las 7:00 AM"
        },
        "sliders": {
            "tradicional_innovador": 0.95,
            "minimalista_complejo": -0.70,
            "amigable_autoritario": 0.45,
            "humano_tecnologico": 0.98,
            "serio_jugueton": -0.60,
            "convencional_rebelde": 0.55,
            "organico_geometrico": 0.95
        },
        "base_family": "Familia 01 · Monograma Hexagonal Isométrico 'AK' (Heredado de Marca Matriz + Código Cromático Cian IIoT #06B6D4)",
        "primary_font": "Space Grotesk",
        "secondary_font": "JetBrains Mono",
        "palette": ["#090D16", "#FFFFFF", "#06B6D4", "#38BDF8"],
        "selected_24_traits": [
            "Hereda el chasis hexagonal 'AK' de Aksis para funcionar como ícono de App móvil y favicon de SCADA",
            "Cambia Atributo 18A: Subtítulo Técnico '[ INDUSTRIAL IIoT & TELEMETRY ]'",
            "Cambia Atributos 20, 21 y 24: Color Primario Azul Cian Telemetría (#06B6D4) con brillo lumínico OLED para pantallas de cuarto de control"
        ],
        "simulation_notes": "PRÁCTICA MULTI-MARCA: Con esta 3ª sub-marca quedó cerrado el ecosistema completo de Grupo Aksis: Automatización (Naranja #EA580C), Mantenimiento (Verde #10B981), Transporte (Ámbar #F59E0B) y Control IIoT (Cian #06B6D4)."
    }
]


def generate_standalone_html_brandbook(brand: dict, compiled: dict, color_table: list) -> str:
    b_name = brand["chosen_name"]
    bg_hex, ink_hex, pri_hex, sec_hex = brand["palette"]
    logo_plate_map = {
        "01_restaurante_brasa_y_raiz": "brand_01_brasa_y_raiz_logo.jpg",
        "02_despacho_contable_vertice": "brand_02_vertice_patrimonial_logo.jpg",
        "03_colegio_agora_nova": "brand_03_colegio_agora_nova_logo.jpg",
        "04_b2b_laboratorio_quantalab": "brand_04_quantalab_logo.jpg",
        "05_campamentos_cumbre_viva": "brand_05_cumbre_viva_logo.jpg",
        "06_casa_retiro_villa_serena": "brand_06_villa_serena_logo.jpg",
        "07_constructora_piedra_firme": "brand_07_piedra_firme_logo.jpg",
        "08_muebleria_pueblo_el_roble": "brand_08_muebleria_el_roble_logo.jpg",
        "09A_automatizacion_matriz_aksis": "brand_09_grupo_aksis_architecture_logos.jpg",
        "09B_submarca_aksis_mantenimiento": "brand_09_grupo_aksis_architecture_logos.jpg",
        "09C_submarca_aksis_transporte": "brand_09_grupo_aksis_architecture_logos.jpg",
        "09D_submarca_aksis_control": "brand_09_grupo_aksis_architecture_logos.jpg",
    }
    plate_file = logo_plate_map.get(brand["id"], "step5b_master_logo_01_totemic_emblem.jpg")
    plate_rel_path = f"../apps/web/assets/logos/{plate_file}"
    studio_proposals = BespokePentagramLogoEngine.generate_4_studio_logo_proposals(
        brand_name=b_name,
        industry_hint=brand["sector"],
        purpose_text=brand["purpose_why"],
        colors_hex=brand["palette"],
        primary_font=brand["primary_font"],
        secondary_font=brand["secondary_font"],
        descriptor_tagline=brand["tagline"][:38],
        show_construction_grid=True
    )
    hero_symbol_svg = BespokePentagramLogoEngine.render_bespoke_symbol_inner_svg(
        archetype=studio_proposals[0]["archetype"],
        pri_hex=pri_hex,
        sec_hex=sec_hex,
        ink_hex="#090D16",
        bg_hex="#FFFFFF",
        variant_index=0,
        uid="hero"
    )
    tp_dossier = DeepTouchpointEngineeringEngine.build_detailed_touchpoints_dossier(
        tp_before_raw=[s.strip() for s in brand["touchpoints_journey"]["antes"].split("·") if s.strip()],
        tp_during_raw=[s.strip() for s in brand["touchpoints_journey"]["durante"].split("·") if s.strip()],
        tp_after_raw=[s.strip() for s in brand["touchpoints_journey"]["despues"].split("·") if s.strip()],
        brand_name=b_name,
        pri_hex=pri_hex,
        ink_hex=ink_hex
    )

    proposals_grid_html = "".join([
        f"""<div style="border:1.5px solid #CBD5E1;border-radius:14px;padding:12px;background:#F8FAFC;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;font-weight:800;color:{pri_hex};margin-bottom:4px;">{p['proposal_id']} · SISTEMA VECTORIAL EN CURVAS</div>
          <div style="font-weight:800;font-size:0.9rem;color:#0F172A;margin-bottom:6px;">{p['title']}</div>
          <div style="height:175px;border-radius:10px;overflow:hidden;border:1px solid #E2E8F0;background:#FFF;">{p['svg']}</div>
          <div style="font-size:0.76rem;color:#475569;margin-top:6px;">{p['subtitle']}</div>
        </div>"""
        for p in studio_proposals
    ])

    def render_tp_cards(items: list, border_color: str) -> str:
        return "".join([
            f"""<div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-left:5px solid {border_color};border-radius:12px;padding:14px 16px;margin-bottom:12px;display:grid;grid-template-columns:1.8fr 1fr;gap:14px;align-items:center;">
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;background:#0F172A;color:#FDE68A;padding:2px 8px;border-radius:99px;font-weight:800;">{tp['tp_id']} · {tp['phase_badge']}</span>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:{border_color};font-weight:800;">{tp['category']}</span>
                </div>
                <div style="font-size:0.96rem;font-weight:800;color:#0F172A;margin-bottom:6px;">{tp['title']}</div>
                <div style="font-size:0.78rem;color:#1E293B;line-height:1.45;">
                  <strong>• Objetivo Estratégico:</strong> {tp['strategic_goal']}<br/>
                  <strong>• Sustrato / Material Físico o Digital:</strong> {tp['substrate_material']}<br/>
                  <strong>• Método de Impresión / Reproducción:</strong> {tp['reproduction_method']}<br/>
                  <strong>• Dimensiones, Retícula y Escala Mínima:</strong> {tp['dimensions_and_grid']}<br/>
                  <strong>• Distancia de Lectura e Iluminación:</strong> {tp['reading_distance_and_lighting']}<br/>
                  <strong style="color:#B45309;">• Regla de Control de Calidad:</strong> {tp['quality_control_rule']}
                </div>
              </div>
              <div>{tp['svg_technical_diagram']}</div>
            </div>"""
            for tp in items
        ])

    tp_before_cards = render_tp_cards(tp_dossier["antes"], "#0284C7")
    tp_during_cards = render_tp_cards(tp_dossier["durante"], pri_hex)
    tp_after_cards = render_tp_cards(tp_dossier["despues"], "#059669")

    traits_html = "".join([
        f"<div style='background:#F8FAFC;border:1px solid #CBD5E1;border-radius:8px;padding:8px 12px;font-size:0.82rem;'><strong>✓</strong> {t}</div>"
        for t in brand["selected_24_traits"]
    ])
    steps_html = "".join([f"<li>{s}</li>" for s in brand["process_steps"]])
    colors_html = "".join([
        f"""<div style="border:1px solid #CBD5E1;border-radius:12px;overflow:hidden;background:#FFF;">
          <div style="height:64px;background:{c['hex']};border-bottom:1px solid #CBD5E1;"></div>
          <div style="padding:12px;font-family:monospace;font-size:0.78rem;line-height:1.5;">
            <strong>{c['role']}</strong><br/>
            HEX: {c['hex']}<br/>
            CMYK: {c['cmyk_fogra39']}<br/>
            Pantone: {c['pantone_solid_coated']}<br/>
            Contraste: {c['wcag_contrast_ratio']}:1 ({c['wcag_level']})
          </div>
        </div>"""
        for c in color_table
    ])
    arch_banner = ""
    if brand.get("architecture_role"):
        arch_banner = f"""
        <div style="background:#0F172A;color:#FDE68A;border:2px solid {pri_hex};border-radius:14px;padding:16px 20px;margin-bottom:22px;">
          <div style="font-family:monospace;font-size:0.78rem;font-weight:800;letter-spacing:0.08em;">🏛️ ARQUITECTURA MULTI-MARCA CORPORATIVA (REGLA 85% ADN HEREDADO / 15% ESPECÍFICO)</div>
          <div style="font-size:0.95rem;color:#FFFFFF;margin-top:4px;font-weight:600;">{brand['architecture_role']}</div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Brandbook Maestro Oficial — {b_name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=JetBrains+Mono:wght@500;700&family=Playfair+Display:ital,wght@0,700;1,600&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <style>
    body {{ font-family: 'Plus Jakarta Sans', sans-serif; background: #F1F5F9; color: #0F172A; margin: 0; padding: 24px; }}
    .sheet {{ max-width: 1120px; margin: 0 auto 24px auto; background: #FFFFFF; border: 1.5px solid #CBD5E1; border-radius: 20px; padding: 28px 32px; box-shadow: 0 12px 32px rgba(15,23,42,0.06); page-break-after: always; }}
    .sheet-header {{ display: flex; justify-content: space-between; border-bottom: 2px solid #0F172A; padding-bottom: 10px; margin-bottom: 20px; font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; font-weight: 700; color: #475569; text-transform: uppercase; }}
    .grid-2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }}
    .grid-3 {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }}
    .grid-4 {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }}
    .card {{ background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; }}
    .tag {{ font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 800; color: {pri_hex}; text-transform: uppercase; display: block; margin-bottom: 6px; }}
    h1, h2, h3 {{ margin: 0 0 8px 0; font-family: '{brand["primary_font"]}', sans-serif; }}
    p, li {{ font-size: 0.88rem; line-height: 1.5; color: #1E293B; }}
    @media print {{ body {{ background: #FFF; padding: 0; }} .sheet {{ box-shadow: none; border: 1px solid #CBD5E1; margin-bottom: 12px; page-break-after: always; }} .no-print {{ display: none !important; }} }}
  </style>
</head>
<body>
  <div class="sheet">
    <div class="sheet-header">
      <span>TOMO I · PORTADA OFICIAL, SISTEMA DE LOGOTIPO DE ESTUDIO Y PLATAFORMA ESTRATÉGICA (8 PILARES)</span>
      <span>SECTOR: {brand["sector"]}</span>
    </div>
    {arch_banner}
    <div style="background:#090D16;color:#FFFFFF;border-radius:18px;padding:26px 30px;display:flex;justify-content:space-between;align-items:center;gap:24px;border:2.5px solid {pri_hex};margin-bottom:22px;">
      <div style="display:flex;align-items:center;gap:22px;">
        <div style="width:104px;height:104px;border-radius:22px;background:#FFFFFF;display:grid;place-items:center;border:3px solid {pri_hex};flex-shrink:0;">
          <svg viewBox="-52 -52 104 104" width="88" height="88" xmlns="http://www.w3.org/2000/svg">{hero_symbol_svg}</svg>
        </div>
        <div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.74rem;color:#FDE68A;font-weight:700;">PERFIL FUNDADOR: {brand["founder_persona"]}</div>
          <h1 style="font-size:2.3rem;color:#FFFFFF;margin:4px 0;">{b_name}</h1>
          <div style="font-size:1.02rem;color:#E2E8F0;font-style:italic;">“{brand["tagline"]}”</div>
        </div>
      </div>
      <button class="no-print" onclick="window.print()" style="background:{pri_hex};color:#FFFFFF;border:none;border-radius:99px;padding:12px 22px;font-weight:800;cursor:pointer;">🖨️ Imprimir / Guardar PDF</button>
    </div>

    <span class="tag">LÁMINA MAGISTRAL DE IDENTIDAD VISUAL · RENDER DE ESTUDIO GEMINI + APLICACIÓN FÍSICA REAL</span>
    <div style="margin-bottom:20px;border-radius:16px;overflow:hidden;border:2px solid {pri_hex};background:#090D16;">
      <img src="{plate_rel_path}" alt="Logo Oficial {b_name}" style="width:100%;max-height:390px;object-fit:cover;display:block;" />
    </div>

    <span class="tag">SISTEMA DE IDENTIDAD VISUAL DE ESTUDIO (4 ARQUITECTURAS DE LOCKUP EN CURVAS BÉZIER)</span>
    <div class="grid-2" style="margin-bottom:22px;">
      {proposals_grid_html}
    </div>

    <div class="grid-3">
      <div class="card"><span class="tag">1. Propósito (Círculo Dorado)</span><p>{brand["purpose_why"]}</p></div>
      <div class="card"><span class="tag">2. Oferta de Valor Diferenciada</span><p>{brand["value_offer"]}</p></div>
      <div class="card"><span class="tag">3. Rol en la Sociedad</span><p>{brand["social_role"]}</p></div>
      <div class="card"><span class="tag">4. Proceso Operativo</span><ul style="margin:0;padding-left:18px;">{steps_html}</ul></div>
      <div class="card"><span class="tag">5. Mensaje Nuclear</span><p><strong>“{brand["core_message"]}”</strong></p></div>
      <div class="card"><span class="tag">6. Personalidad de Marca</span><p>{brand["brand_persona"]}</p></div>
      <div class="card"><span class="tag">7. Comportamiento en Momentos de Verdad</span><p>{brand["customer_behavior"]}</p></div>
      <div class="card"><span class="tag">8. Mundo Visual y Sensorial</span><p>{brand["brand_world"]}</p></div>
      <div class="card" style="background:#FFFBEB;border-color:#FDE68A;"><span class="tag">9. Cliente Ideal (Buyer Persona)</span><p>{brand["ideal_customer"]}</p></div>
    </div>
  </div>

  <div class="sheet">
    <div class="sheet-header">
      <span>TOMO II · EXPEDIENTE DE INGENIERÍA DE TOUCHPOINTS (SUSTRATOS, MEDIDAS, IMPRESIÓN Y CONTROL DE CALIDAD)</span>
      <span>{b_name} · {tp_dossier["total_engineered_touchpoints"]} FICHAS TÉCNICAS DE TOUCHPOINTS</span>
    </div>
    <h3 style="color:#0284C7;margin-bottom:10px;">MOMENTO 1 · ANTES DE COMPRAR (DESCUBRIMIENTO Y ATRACCIÓN)</h3>
    {tp_before_cards}
    <h3 style="color:{pri_hex};margin:18px 0 10px 0;">MOMENTO 2 · DURANTE LA COMPRA (EVALUACIÓN, COTIZACIÓN Y CIERRE)</h3>
    {tp_during_cards}
    <h3 style="color:#059669;margin:18px 0 10px 0;">MOMENTO 3 · DESPUÉS DE COMPRAR (ENTREGA, USO CONTINUO Y FIDELIZACIÓN)</h3>
    {tp_after_cards}
  </div>

  <div class="sheet">
    <div class="sheet-header">
      <span>TOMO III · NAMING, NIZA, DOMINIOS, LOS 24 ATRIBUTOS AISLADOS Y ESPECIFICACIÓN DE PRE-PRENSA</span>
      <span>FAMILIA BASE: {brand["base_family"]}</span>
    </div>
    <div class="grid-3" style="margin-bottom:18px;">
      <div class="card"><span class="tag">Top 4 Finalistas en Bóveda Evolutiva</span><p>{" · ".join(brand["vault_finalists"])}</p></div>
      <div class="card"><span class="tag">Clases Internacionales de Niza</span><p>{brand["nice_classes"]}</p></div>
      <div class="card"><span class="tag">Dominios Web Verificados</span><p style="font-family:monospace;font-weight:700;color:#059669;">{"<br/>".join(["🟢 " + d for d in brand["domains"]])}</p></div>
    </div>
    <p><strong>Tipografía Oficial Titulares:</strong> {brand["primary_font"]} · <strong>Tipografía Secundaria y Tabular:</strong> {brand["secondary_font"]}</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0 20px 0;">
      {traits_html}
    </div>
    <span class="tag">Paleta Cromática Oficial (HEX, CMYK FOGRA39, Pantone Solid Coated y Contraste WCAG)</span>
    <div class="grid-4" style="margin-top:8px;margin-bottom:20px;">
      {colors_html}
    </div>
    <div class="card" style="background:#090D16;color:#F8FAFC;border:1.5px solid {pri_hex};">
      <span class="tag" style="color:#FDE68A;">BITÁCORA DE EXPERIENCIA DEL FUNDADOR Y DEL EQUIPO EN ESTE CASO:</span>
      <p style="color:#E2E8F0;margin:0;">{brand["simulation_notes"]}</p>
    </div>
  </div>
</body>
</html>"""


def main():
    summary_index = []
    html_pdf_pairs = []
    for brand in SIMULATED_BRANDS:
        bg_hex, ink_hex, pri_hex, sec_hex = brand["palette"]
        profile = {
            "chosen_name": brand["chosen_name"],
            "naming_style": brand["naming_style"],
            "industry_key": brand["industry_key"],
            "free_speech_transcript": brand["purpose_why"],
            "purpose_why": brand["purpose_why"],
            "value_offer": brand["value_offer"],
            "social_role": brand["social_role"],
            "process_steps": brand["process_steps"],
            "core_message": brand["core_message"],
            "brand_persona": brand["brand_persona"],
            "customer_behavior": brand["customer_behavior"],
            "brand_world": brand["brand_world"],
            "touchpoints_journey": brand["touchpoints_journey"],
            "contrast_insights": ", ".join(brand["selected_24_traits"][:6]),
            "selected_primary_hex": pri_hex,
            "selected_secondary_hex": sec_hex
        }
        compiled = MasterBrandbookCompiler.run_full_simulation(profile)
        color_table = [
            PrePressColorEngine.build_brand_color_table("Superficie Base", bg_hex, ink_hex),
            PrePressColorEngine.build_brand_color_table("Tinta Estructural", ink_hex, bg_hex),
            PrePressColorEngine.build_brand_color_table("Acento Primario", pri_hex, bg_hex),
            PrePressColorEngine.build_brand_color_table("Acento Secundario", sec_hex, bg_hex),
        ]
        tp_dossier = DeepTouchpointEngineeringEngine.build_detailed_touchpoints_dossier(
            tp_before_raw=[s.strip() for s in brand["touchpoints_journey"]["antes"].split("·") if s.strip()],
            tp_during_raw=[s.strip() for s in brand["touchpoints_journey"]["durante"].split("·") if s.strip()],
            tp_after_raw=[s.strip() for s in brand["touchpoints_journey"]["despues"].split("·") if s.strip()],
            brand_name=brand["chosen_name"],
            pri_hex=pri_hex,
            ink_hex=ink_hex
        )
        html_doc = generate_standalone_html_brandbook(brand, compiled, color_table)
        html_path = os.path.join(OUT_DIR, f"brandbook_{brand['id']}.html")
        json_path = os.path.join(OUT_DIR, f"brandbook_{brand['id']}.json")
        pdf_path = os.path.join(OUT_DIR, f"brandbook_{brand['id']}.pdf")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_doc)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump({
                "brand_input": brand,
                "color_table": color_table,
                "engineered_touchpoints_dossier": tp_dossier,
                "compiled_engine": compiled
            }, f, ensure_ascii=False, indent=2)
        html_pdf_pairs.append((html_path, pdf_path, brand["chosen_name"]))
        summary_index.append({
            "id": brand["id"],
            "sector": brand["sector"],
            "chosen_name": brand["chosen_name"],
            "html_file": f"entregables_brandbooks/brandbook_{brand['id']}.html",
            "pdf_file": f"entregables_brandbooks/brandbook_{brand['id']}.pdf",
            "json_file": f"entregables_brandbooks/brandbook_{brand['id']}.json"
        })
        print(f"✓ Generado Brandbook HTML/JSON: {brand['chosen_name']} ({brand['sector']})")

    # Compilar los 12 PDFs reales con Playwright Chromium
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            for h_path, p_path, b_title in html_pdf_pairs:
                page.goto(f"file://{h_path}", wait_until="domcontentloaded")
                page.pdf(
                    path=p_path,
                    format="A4",
                    print_background=True,
                    margin={"top": "10mm", "bottom": "10mm", "left": "10mm", "right": "10mm"}
                )
                print(f"📄 Compilado PDF Oficial: {b_title} -> {p_path}")
            browser.close()
    except Exception as e:
        print(f"Aviso compilación PDF: {e}")

    with open(os.path.join(OUT_DIR, "index_12_brandbooks.json"), "w", encoding="utf-8") as f:
        json.dump(summary_index, f, ensure_ascii=False, indent=2)
    print(f"\nTotal Brandbooks (HTML + PDF + JSON) generados con éxito: {len(summary_index)}")


if __name__ == "__main__":
    main()
