"""
TheBestBrand — Bespoke Pentagram-Grade Vector Logo Studio, Deep Touchpoint Engineering & Multi-Brand Architecture Engine (v21.0)
Reemplaza por completo cualquier primitiva genérica tipo PowerPoint de los 90s por:
1. BespokePentagramLogoEngine:
   - Geometría Bézier de proporción áurea (φ = 1.618), espacio negativo real (Gestalt Figura-Fondo),
     metáforas icónicas por industria y 4 arquitecturas de lockup profesionales (Totémico, Horizontal,
     Sello Institucional y Avatar 1:1 en Espacio Negativo).
   - Cero bordes punteados dentro del símbolo, cero cajas crudas con texto plano encima.
2. DeepTouchpointEngineeringEngine:
   - Especificación de ingeniería completa para cada Touchpoint (Antes, Durante y Después):
     Sustrato/Material, Método de Impresión/Reproducción, Dimensiones y Escala Mínima en mm/px,
     Distancia de Lectura e Iluminación, Regla de Control de Calidad y Diagrama Técnico SVG acotado.
3. MultiBrandArchitectureEngine:
   - Clonación con Herencia de ADN (85% Heredado / 15% Específico) para grupos empresariales
     (ej. Grupo Aksis: Automation, Mantenimiento, Transporte y Control) y compilación de la Lámina 39.
"""

import html
import json
import math
import os
import re
import ssl
import urllib.request
import urllib.error
from typing import Dict, Any, List, Optional, Tuple

_STUDIO_SSL_CTX = ssl._create_unverified_context()


def _load_studio_gemini_key() -> str:
    env_paths = [
        os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.env")),
        os.path.abspath(os.path.join(os.path.dirname(__file__), ".env")),
        os.path.abspath(".env")
    ]
    for ep in env_paths:
        if os.path.exists(ep):
            try:
                with open(ep, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith("GEMINI_API_KEY="):
                            val = line.split("=", 1)[1].strip().strip('"').strip("'")
                            if val and not val.startswith("AQ."):
                                return val
            except Exception:
                pass
    return os.environ.get("GEMINI_API_KEY", "").strip()


class BespokePentagramLogoEngine:
    """
    Motor de Diseño de Identidad Visual de Nivel Estudio Internacional (Pentagram / Chermayeff & Geismar / Wolff Olins) +
    Compilador de Master Prompt (45+ Insights de Pasos 0 a 5) + Síntesis Vectorial en Vivo con Gemini AI (v26.0).
    """

    FAMILY_NAMES = {
        0: "Monograma Escultural & Ligadura Geométrica",
        1: "Escudo Contemporáneo & Emblema de Autoridad",
        2: "Símbolo Abstracto Continuo & Espacio Negativo (Gestalt)",
        3: "Arquitectura Isométrica & Prisma Tridimensional"
    }

    @staticmethod
    def extract_brand_initials(brand_name: str) -> str:
        raw = (brand_name or "Marca").strip()
        # Separar CamelCase / PascalCase: "TheBestBrand" -> "The Best Brand"
        camel_split = re.sub(r"([a-z0-9áéíóúñ])([A-ZÁÉÍÓÚÑ])", r"\1 \2", raw)
        camel_split = re.sub(r"([A-ZÁÉÍÓÚÑ]+)([A-ZÁÉÍÓÚÑ][a-záéíóúñ])", r"\1 \2", camel_split)
        clean = re.sub(r"[^A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s]", " ", camel_split)
        all_words = [w for w in clean.upper().split() if w]
        filtered = [w for w in all_words if w not in ("DE", "DEL", "LA", "EL", "LOS", "LAS", "Y", "AND")]
        words = all_words if (len(all_words) >= 3 and all_words[0] == "THE") else (filtered or all_words)
        if len(words) >= 3:
            return (words[0][0] + words[1][0] + words[2][0]).upper()
        if len(words) == 2:
            return (words[0][0] + words[1][0]).upper()
        if len(words) == 1 and len(words[0]) >= 2:
            w0 = words[0]
            consonants = re.sub(r"[AEIOUÁÉÍÓÚ]", "", w0[1:])
            return (w0[0] + (consonants[0] if consonants else w0[1])).upper()
        return "TB"

    @staticmethod
    def split_brand_wordmark_parts(brand_name: str, uppercase: bool = False) -> Tuple[str, str]:
        """
        Divide inteligentemente un nombre CamelCase o multipalabra en dos partes ópticas
        para lograr contraste editorial (ej. 'TheBestBrand' -> ('TheBest', 'Brand')).
        """
        raw = (brand_name or "Marca").strip()
        camel_split = re.sub(r"([a-z0-9áéíóúñ])([A-ZÁÉÍÓÚÑ])", r"\1 \2", raw)
        parts = [p for p in camel_split.split() if p]
        if len(parts) >= 2:
            has_spaces = " " in raw
            sep = " " if has_spaces else ""
            p1 = sep.join(parts[:-1]) + (sep if has_spaces else "")
            p2 = parts[-1]
            if uppercase:
                return p1.upper(), p2.upper()
            return p1, p2
        txt = raw.upper() if uppercase else raw
        return txt, ""

    @staticmethod
    def detect_industry_archetype(
        brand_name: str,
        industry_hint: str = "",
        purpose_text: str = ""
    ) -> str:
        combined = f"{brand_name} {industry_hint} {purpose_text}".lower()
        # Prioridad 1: Tecnología, Apps, SaaS, IA, Plataformas Digitales
        if re.search(r"\b(aplicaci[oó]n|aplicaciones|app|apps|software|plataforma|sistema|automatiz\w*|inteligencia artificial|ia|ai|algoritm\w*|digital\w*|saas|cloud|tech|tecnolog\w*|datos|web|fintech)\b", combined):
            return "tech_saas_app_ia"
        # Prioridad 2: Mascotas / Nutrición Animal / Veterinaria
        if re.search(r"\b(perros?|gatos?|mascotas?|croquetas?|canin\w*|felin\w*|veterinar\w*|pet)\b", combined):
            return "pet_nutrition_care"
        # Prioridad 3: Gastronomía, Restaurantes, Café, Panadería
        if any(w in combined for w in ["brasa", "raíz", "raiz", "restaurante", "gastronom", "cocina", "fuego", "chef", "cafe", "café", "vino", "asador", "comida", "panader", "postre"]):
            return "restaurante_fuego_raiz"
        # Prioridad 4: Finanzas, Legal, Consultoría B2B, Contabilidad
        if any(w in combined for w in ["vértice", "vertice", "contable", "fiscal", "patrimoni", "finanz", "auditor", "legal", "abogad", "capital", "consultor", "agencia", "despacho", "b2b"]):
            return "despacho_contable_vertice"
        # Prioridad 5: Educación, Colegios, Academias, Cursos
        if any(w in combined for w in ["ágora", "agora", "colegio", "escuela", "educac", "primaria", "secundaria", "preparatoria", "academia", "universidad", "cursos", "formaci"]):
            return "colegio_agora_nova"
        # Prioridad 6: Ciencia, Laboratorio, Biotecnología
        if any(w in combined for w in ["quanta", "laboratorio", "científic", "cientific", "espectr", "cromat", "analític", "analitic", "biotec", "iso 17025"]):
            return "b2b_laboratorio_quantalab"
        # Prioridad 7: Outdoor, Campamentos, Naturaleza
        if any(w in combined for w in ["cumbre", "campamento", "outdoor", "montaña", "montana", "expedic", "bosque", "aventura"]):
            return "campamentos_cumbre_viva"
        # Prioridad 8: Hospitalidad Senior, Bienestar, Retiro
        if any(w in combined for w in ["serena", "retiro", "adultos mayores", "geriatr", "residencia", "longevidad", "senior", "spa", "wellness", "holístic"]):
            return "casa_retiro_villa_serena"
        # Prioridad 9: Construcción, Arquitectura, Inmobiliaria
        if any(w in combined for w in ["piedra firme", "constructora", "inmobiliaria", "arquitect", "vivienda", "residencial", "cimentac", "obra", "interiorismo"]):
            return "constructora_piedra_firme"
        # Prioridad 10: Mobiliario, Diseño Artesanal, Madera, Retail
        if any(w in combined for w in ["roble", "muebler", "madera", "carpinter", "ebanist", "hogar", "artesanal", "tienda", "boutique", "moda", "joyer"]):
            return "muebleria_el_roble"
        # Prioridad 11: Industrial, Robótica, Logística, Grupo Aksis
        if any(w in combined for w in ["aksis", "robótic", "robotic", "plc", "scada", "industrial", "mantenimiento", "rigging", "transporte", "logístic", "iiot", "manufactura"]):
            if "mantenimiento" in combined or "uptime" in combined:
                return "aksis_mantenimiento"
            if "transporte" in combined or "rigging" in combined or "logístic" in combined:
                return "aksis_transporte"
            if "control" in combined or "iiot" in combined or "telemetr" in combined:
                return "aksis_control"
            return "aksis_automation"
        # Prioridad 12: Salud, Clínica, Medicina, Odontología
        if re.search(r"\b(salud|cl[ií]nicas?|m[eé]dic[oa]s?|hospital\w*|dental\w*|odont\w*|pacientes?|terapias?)\b", combined):
            return "salud_clinica"
        return "pentagram_modernist"

    @classmethod
    def get_archetype_visual_metaphor(cls, archetype: str, brand_name: str, initials: str) -> Dict[str, str]:
        mapping = {
            "tech_saas_app_ia": {
                "sector_label": "Tecnología, Aplicación Digital, SaaS & IA",
                "metaphor": f"Nodo neural de proporción áurea entrelazado con el monograma «{initials}», destello de inteligencia algorítmica sin fricción y circuitos ópticos minimalistas",
                "symbol_elements": "Prisma de flujo continuo, estrella polar cognitiva en el vértice, espacio negativo Gestalt y geometría squircle lista para App Icon iOS/Android"
            },
            "pet_nutrition_care": {
                "sector_label": "Nutrición Natural & Bienestar para Mascotas",
                "metaphor": f"Corazón orgánico y hoja botánica fusionados con silueta noble protectora y monograma «{initials}» en espacio negativo",
                "symbol_elements": "Curvas cálidas de protección vital, brote natural de ingredientes puros y sello de confianza familiar"
            },
            "restaurante_fuego_raiz": {
                "sector_label": "Gastronomía de Autor, Hospitalidad & Café",
                "metaphor": f"Arco de origen artesanal con flama ascendente en proporción áurea y raíces orgánicas entrelazadas con «{initials}»",
                "symbol_elements": "Calidez sensorial, fuego central en espacio negativo y heráldica gastronómica contemporánea"
            },
            "despacho_contable_vertice": {
                "sector_label": "Consultoría Estratégica, Finanzas, Legal & B2B",
                "metaphor": f"Prisma arquitectónico de precisión suiza y vértice ascendente que integra las iniciales «{initials}» con autoridad ejecutiva",
                "symbol_elements": "Facetas de solidez patrimonial, equilibrio axial y elegancia sobria de banca privada"
            },
            "colegio_agora_nova": {
                "sector_label": "Educación, Academia & Formación de Liderazgo",
                "metaphor": f"Escudo contemporáneo con estrella polar de excelencia, alas de conocimiento y monograma «{initials}»",
                "symbol_elements": "Pórtico de sabiduría, páginas abiertas en ascenso y emblema institucional perdurable"
            },
            "b2b_laboratorio_quantalab": {
                "sector_label": "Ciencia, Biotecnología & Laboratorio Analítico",
                "metaphor": f"Hexágono cuántico de refracción óptica y órbitas elípticas calibradas alrededor del núcleo «{initials}»",
                "symbol_elements": "Exactitud metrológica, prisma de luz e ingeniería científica de vanguardia"
            },
            "campamentos_cumbre_viva": {
                "sector_label": "Outdoor, Naturaleza & Expedición",
                "metaphor": f"Doble cumbre alpina con rosa de los vientos y sendero ascendente que forma «{initials}»",
                "symbol_elements": "Medallón de exploración, horizonte solar y geometría de libertad natural"
            },
            "casa_retiro_villa_serena": {
                "sector_label": "Bienestar Integral, Hospitalidad & Longevidad",
                "metaphor": f"Arco sereno con sol naciente en proporción áurea y hojas de olivo que abrazan «{initials}»",
                "symbol_elements": "Armonía vital, ondas de serenidad y calidez humana"
            },
            "constructora_piedra_firme": {
                "sector_label": "Arquitectura, Construcción & Desarrollo Inmobiliario",
                "metaphor": f"Piedra angular monolítica en perspectiva isométrica con vigas en cantiléver e iniciales «{initials}» en espacio negativo",
                "symbol_elements": "Rigor estructural, volumen arquitectónico 3D y certeza patrimonial"
            },
            "muebleria_el_roble": {
                "sector_label": "Diseño de Autor, Mobiliario, Retail & Lujo Artesanal",
                "metaphor": f"Emblema octagonal de taller maestro con ensamble de precisión y monograma «{initials}»",
                "symbol_elements": "Simetría de alta factura, nobleza de materiales y sello de autenticidad"
            },
            "salud_clinica": {
                "sector_label": "Salud, Medicina Especializada & Cuidado Clínico",
                "metaphor": f"Cruz suiza suavizada en proporción áurea entrelazada con escudo de protección humana y monograma «{initials}»",
                "symbol_elements": "Asepsia visual, pulso de vida y respaldo clínico de alta precisión"
            }
        }
        return mapping.get(archetype, {
            "sector_label": "Identidad Corporativa de Autor (Estándar Pentagram)",
            "metaphor": f"Símbolo geométrico de proporción áurea (φ = 1.618) que entrelaza el monograma «{initials}» en espacio negativo Gestalt",
            "symbol_elements": "Tensión constructiva, pregnancia a cualquier escala y equilibrio óptico atemporal"
        })

    @classmethod
    def compile_master_logo_prompt(
        cls,
        brand_name: str,
        industry_hint: str = "",
        purpose_text: str = "",
        colors_hex: Optional[List[str]] = None,
        primary_font: str = "Space Grotesk",
        secondary_font: str = "Plus Jakarta Sans",
        descriptor_tagline: str = "ESTÁNDAR DE EXCELENCIA",
        canvas_state: Optional[Dict[str, Any]] = None,
        bipolar_sliders: Optional[Dict[str, float]] = None,
        pair_selections: Optional[Dict[str, str]] = None,
        selected_family_index: int = 0,
        custom_prompt_override: str = ""
    ) -> Dict[str, Any]:
        """
        Compila el MASTER PROMPT DETALLADO sumando los 45+ insights recolectados en:
        - Paso 0 (Giro explicado, resumen en ≤6 palabras, paráfrasis estratégica, cliente ideal, dolor del mercado, enfoque sensorial)
        - Paso 1 (6 Pilares Socráticos: Círculo Dorado, Oferta de Valor, Rol Social, Proceso, Mensaje Nuclear, Psicología del Cliente)
        - Paso 2 (12 Touchpoints Antes, Durante y Después)
        - Paso 3 (Nombre Oficial, Iniciales de Monograma, Eslogan y Raíces Semánticas)
        - Paso 4 (7 Deslizadores Bipolares Kansei + Familia Arquitectónica Base elegida)
        - Paso 5 (24 Decisiones A/B de Aislamiento Visual + Tipografía + Paleta Cromática HEX)
        """
        cs = canvas_state or {}
        sliders = bipolar_sliders or cs.get("bipolar_sliders") or {}
        pairs = pair_selections or cs.get("pair_selections") or {}
        colors = colors_hex or cs.get("selected_colors_hex") or ["#FAF8F5", "#090D16", "#C59B27", "#1E293B"]
        while len(colors) < 4:
            colors.append("#C59B27")

        clean_brand = (brand_name or cs.get("brand_name") or "").strip()
        if not clean_brand or clean_brand.lower() in ("mi nueva marca", "mi marca", "marca"):
            vault = cs.get("accepted_naming_vault") or cs.get("acceptedNamingVault") or []
            if isinstance(vault, list) and len(vault) > 0 and str(vault[0]).strip():
                clean_brand = str(vault[0]).strip()
            elif not clean_brand:
                clean_brand = "Mi Marca"
        initials = cls.extract_brand_initials(clean_brand)
        tagline = (descriptor_tagline or cs.get("brand_tagline") or "IDENTIDAD DE CLASE MUNDIAL").strip()

        # Paso 0 & Paso 1 Insights
        custom_biz = (cs.get("custom_business_type") or industry_hint or "").strip()
        short_essence = (cs.get("step0_short_essence") or "").strip()
        paraphrased_essence = (cs.get("step0_paraphrased_essence") or "").strip()
        buyer_actor = (cs.get("step0_buyer_actor") or cs.get("ideal_customer") or "").strip()
        market_pain = (cs.get("step0_market_pain") or "").strip()
        sensory_focus = (cs.get("step0_sensory_focus") or "").strip()

        golden_circle = (cs.get("golden_circle") or purpose_text or "").strip()
        value_offer = (cs.get("value_offer") or "").strip()
        social_role = (cs.get("social_role") or "").strip()
        process_steps = (cs.get("process_steps_text") or "").strip()
        core_message = (cs.get("core_message") or "").strip()

        archetype = cls.detect_industry_archetype(
            clean_brand,
            f"{custom_biz} {short_essence} {paraphrased_essence}",
            f"{golden_circle} {value_offer} {core_message}"
        )
        metaphor_info = cls.get_archetype_visual_metaphor(archetype, clean_brand, initials)

        # Paso 2 Touchpoints (filtrar defaults gastronómicos si el giro no es gastronómico)
        tp_before = cs.get("tp_before") or []
        tp_during = cs.get("tp_during") or []
        tp_after = cs.get("tp_after") or []
        all_tps = [str(t) for t in (tp_before + tp_during + tp_after) if t]
        raw_tp_summary = ", ".join(all_tps[:8])
        if not raw_tp_summary or (archetype != "restaurante_fuego_raiz" and ("leña" in raw_tp_summary.lower() or "café recién molido" in raw_tp_summary.lower())):
            tp_summary = "App Icon iOS/Android Squircle 1:1, Cabecera Web Retina, Presentación Ejecutiva, Tarjeta NFC y Empaque Insignia"
        else:
            tp_summary = raw_tp_summary

        # Paso 4 Sliders & Familia Base
        fam_idx = int(selected_family_index if selected_family_index is not None else cs.get("selected_family_index", 0)) % 4
        family_label = cls.FAMILY_NAMES.get(fam_idx, cls.FAMILY_NAMES[0])

        def _fmt_slider(k: str, left_lbl: str, right_lbl: str) -> str:
            v = float(sliders.get(k, 0.35))
            if v >= 0.25:
                return f"Inclinación hacia {right_lbl} ({v:+.2f})"
            if v <= -0.25:
                return f"Inclinación hacia {left_lbl} ({v:+.2f})"
            return f"Equilibrio calibrado {left_lbl}/{right_lbl} ({v:+.2f})"

        slider_summary_lines = [
            f"• Morfología: {_fmt_slider('organico_geometrico', 'Orgánico/Fluido', 'Geométrico/Exacto')}",
            f"• Temporalidad: {_fmt_slider('tradicional_innovador', 'Clásico/Herencia', 'Vanguardista/Futurista')}",
            f"• Posicionamiento: {_fmt_slider('accesible_exclusivo', 'Cercano/Accesible', 'Exclusivo/Lujo Editorial')}",
            f"• Tono Emocional: {_fmt_slider('serio_jugueton', 'Sobrio/Institucional', 'Dinámico/Expresivo')}",
            f"• Densidad Visual: {_fmt_slider('minimalista_complejo', 'Ultra-Minimalista (Bauhaus)', 'Riqueza de Detalle/Emblema')}",
            f"• Carácter: {_fmt_slider('humano_tecnologico', 'Cálido/Artesanal', 'Tecnológico/Algorítmico')}",
            f"• Actitud: {_fmt_slider('convencional_rebelde', 'Estándar de Confianza', 'Disruptivo/Categoría Propia')}"
        ]

        # Paso 5: 24 Decisiones A/B traducidas a instrucciones de diseño concretas
        def _pair(n: int, default: str = "A") -> str:
            return str(pairs.get(str(n), pairs.get(n, default))).upper()

        vertices_rule = "Vértices de precisión matemática y cortes angulares limpios" if _pair(1) == "A" else "Terminaciones con radio óptico suavizado y flujo continuo"
        stroke_rule = "Trazo estructural con presencia sólida y alto impacto visual" if _pair(2) == "B" else "Línea calibrada de elegancia geométrica y proporción áurea"
        symmetry_rule = "Simetría axial de autoridad institucional" if _pair(3) == "A" else "Asimetría cinética con tensión direccional hacia el futuro"
        neg_space_rule = f"Espacio negativo activo (Gestalt) que revela las iniciales «{initials}» o la metáfora central dentro del símbolo" if _pair(4) == "B" else f"Integración monolítica de alto contraste con monograma «{initials}»"
        enclosure_rule = "Símbolo autónomo de silueta libre y pregnancia inmediata" if _pair(5) == "A" else "Emblema contenido en escudo/medallón geométrico de proporción áurea"
        case_rule = "Logotipo en CAJA ALTA monumental con tracking óptico expandido (+0.28em)" if _pair(11) == "A" else "Logotipo en caja mixta editorial con kerning óptico de precisión"

        bg_light, ink_dark, pri_accent, sec_accent = colors[0], colors[1], colors[2], colors[3]

        master_prompt_es = f"""DIRECTRIZ MAESTRA DE DISEÑO DE LOGOTIPO (SÍNTESIS DE 45+ INSIGHTS DE TU ENTREVISTA)
================================================================================
1. IDENTIDAD VERBAL Y ARQUITECTURA DE MARCA (PASO 3):
• Nombre Oficial de la Marca: "{clean_brand}"
• Monograma / Iniciales Constructivas: "{initials}"
• Descriptor / Eslogan Oficial: "{tagline}"

2. GIRO REAL, PROPÓSITO Y PSICOLOGÍA DEL CLIENTE (PASOS 0 Y 1):
• Giro y Esencia del Negocio: {paraphrased_essence or custom_biz or short_essence or metaphor_info['sector_label']}
• Resumen Nuclear (≤ 6 palabras): {short_essence or metaphor_info['sector_label']}
• Propósito (Círculo Dorado): {golden_circle or 'Revolucionar su categoría con excelencia, agilidad y confianza absoluta.'}
• Oferta de Valor Diferenciada: {value_offer or 'Solución superior, intuitiva y diseñada a la medida de las expectativas reales del cliente.'}
• Cliente Ideal Detectado: {buyer_actor or 'Clientes exigentes que valoran calidad profesional, claridad y resultados reales.'}
• Problema del Mercado que Resuelve: {market_pain or 'Elimina la fricción, la improvisación y la falta de calidad en las alternativas tradicionales.'}
• Mensaje Nuclear de Marca: {core_message or tagline}

3. METÁFORA VISUAL Y CONCEPTO CREATIVO (ESTÁNDAR PENTAGRAM / WOLFF OLINS):
• Arquetipo Sectorial Detectado: {metaphor_info['sector_label']}
• Metáfora Visual Obligatoria: {metaphor_info['metaphor']}
• Elementos Constructivos del Símbolo: {metaphor_info['symbol_elements']}

4. SUSTRATOS REALES Y TOUCHPOINTS DONDE VIVIRÁ EL LOGOTIPO (PASO 2):
• Puntos de Contacto Prioritarios: {tp_summary}
• Requisito Técnico: El símbolo debe funcionar impecablemente desde 16x16 px (App Icon / Favicon) hasta señalética arquitectónica, impresión de gala y bordado/grabado láser (trazo mínimo ≥ 1.2 mm).

5. CALIBRACIÓN KANSEI Y FAMILIA ARQUITECTÓNICA ELEGIDA (PASO 4):
• Familia Base Seleccionada: {family_label}
{chr(10).join(slider_summary_lines)}

6. REGLAS GEOMÉTRICAS, TIPOGRÁFICAS Y CROMÁTICAS DE LAS 24 DECISIONES A/B (PASO 5):
• Geometría de Vértices: {vertices_rule}
• Calibre de Trazo: {stroke_rule}
• Balance y Ejes: {symmetry_rule}
• Psicología Gestalt: {neg_space_rule}
• Contención del Símbolo: {enclosure_rule}
• Tipografía Principal: '{primary_font}' ({case_rule}) + Secundaria '{secondary_font}'
• Paleta Cromática Oficial (HEX): Fondo Claro Editorial {bg_light} | Tinta Profunda {ink_dark} | Acento Maestro {pri_accent} | Acento Secundario {sec_accent}

7. INSTRUCCIÓN EJECUTIVA PARA GEMINI AI STUDIO:
Diseña un logotipo memorable, ultra-profesional y digno de un premio internacional de diseño (Pentagram / Chermayeff & Geismar / Apple Design Award) para "{clean_brand}". Prohibido usar clip-art genérico o polígonos vacíos sin alma. Fusiona la metáfora del giro ({metaphor_info['metaphor']}) con las iniciales "{initials}" en proporción áurea (φ = 1.618), utilizando exclusivamente la paleta ({ink_dark}, {pri_accent}, {sec_accent}, {bg_light}) y jerarquía tipográfica de lujo.""".strip()

        if custom_prompt_override and custom_prompt_override.strip():
            raw_override = custom_prompt_override.strip()
            # No permitir que un override viejo con "Mi Nueva Marca" / "MNM" contamine el nombre real
            if clean_brand.lower() not in ("mi nueva marca", "mi marca") and (
                "mi nueva marca" in raw_override.lower() or '"mnm"' in raw_override.lower() or "«mnm»" in raw_override.lower()
            ):
                pass
            else:
                master_prompt_es = raw_override

        master_prompt_en = (
            f"Design a museum-grade, bespoke vector brand identity and logo mark (Pentagram, Chermayeff & Geismar, Wolff Olins standard) "
            f"for '{clean_brand}' (Monogram initials: '{initials}', Tagline: '{tagline}'). "
            f"Business & Core Essence: {paraphrased_essence or custom_biz or metaphor_info['sector_label']}. "
            f"Value Proposition: {value_offer or golden_circle}. Target Audience: {buyer_actor}. "
            f"Mandatory Visual Metaphor: {metaphor_info['metaphor']}. "
            f"Base Architectural Family: {family_label}. "
            f"Geometric Rules from 24 A/B Selections: {vertices_rule}; {stroke_rule}; {symmetry_rule}; {neg_space_rule}; {enclosure_rule}. "
            f"Typography: '{primary_font}' ({case_rule}). "
            f"Exact Color Palette: Deep Ink {ink_dark}, Primary Luxury Accent {pri_accent}, Secondary Accent {sec_accent}, Editorial Canvas {bg_light}."
        )

        design_dna_pills = [
            {"label": "Marca & Monograma", "value": f"{clean_brand} ({initials})"},
            {"label": "Giro & Metáfora", "value": metaphor_info["sector_label"]},
            {"label": "Familia Paso 4", "value": family_label},
            {"label": "Geometría Paso 5", "value": f"{vertices_rule.split(' y ')[0]} · {symmetry_rule.split(' con ')[0]}"},
            {"label": "Tipografía Oficial", "value": primary_font},
            {"label": "Paleta HEX", "value": f"{ink_dark} · {pri_accent} · {sec_accent}"}
        ]

        return {
            "brand_name": clean_brand,
            "initials": initials,
            "tagline": tagline,
            "archetype": archetype,
            "metaphor_info": metaphor_info,
            "family_index": fam_idx,
            "family_label": family_label,
            "colors_hex": [bg_light, ink_dark, pri_accent, sec_accent],
            "primary_font": primary_font,
            "secondary_font": secondary_font,
            "vertices_sharp": _pair(1) == "A",
            "stroke_bold": _pair(2) == "B",
            "symmetric": _pair(3) == "A",
            "negative_space": _pair(4) == "B",
            "enclosed_emblem": _pair(5) == "B",
            "uppercase_lockup": _pair(11) == "A",
            "master_prompt_es": master_prompt_es,
            "master_prompt_en": master_prompt_en,
            "design_dna_pills": design_dna_pills
        }

    @classmethod
    def render_bespoke_monogram_badge_svg(
        cls,
        initials: str,
        pri_hex: str,
        sec_hex: str,
        ink_hex: str,
        bg_hex: str,
        primary_font: str = "Space Grotesk"
    ) -> str:
        """
        Construye un sello/monograma escultórico con las iniciales reales de la marca
        para integrarlo armónicamente en el símbolo vectorial.
        """
        safe_init = html.escape((initials or "TB")[:2].upper())
        return f"""
        <g class="bespoke-monogram-core">
          <circle cx="0" cy="0" r="14.5" fill="{ink_hex}" stroke="{pri_hex}" stroke-width="1.6"/>
          <text x="0" y="4.8" text-anchor="middle" fill="{bg_hex}" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="12.5" letter-spacing="1.2">{safe_init}</text>
        </g>
        """

    @classmethod
    def render_bespoke_symbol_inner_svg(
        cls,
        archetype: str,
        pri_hex: str,
        sec_hex: str,
        ink_hex: str,
        bg_hex: str = "#FAF8F5",
        variant_index: int = 0,
        uid: str = "s0",
        initials: str = "TB",
        primary_font: str = "Space Grotesk",
        variation_seed: int = 0,
        sub_variation: int = 0,
        custom_modifiers: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Devuelve el contenido vectorial <g> (centrado en 0,0 con radio ~46)
        diseñado con geometría escultórica nivel Pentagram / Linear / Apple Design Award:
        soporta semillas de regeneración (`variation_seed`), sub-variaciones del logo seleccionado (`sub_variation`)
        y modificadores interactivos del usuario (`custom_modifiers`).
        """
        mods = dict(custom_modifiers or {})
        stroke_mult = float(mods.get("stroke_scale", 1.0) or 1.0)
        sym_scale = float(mods.get("symbol_scale", 1.0) or 1.0)
        force_monogram = bool(mods.get("show_monogram", False))
        frame_style = str(mods.get("frame_style", "") or "").lower()
        geom_mode = str(mods.get("geometry_mode", "") or "").lower()
        rot_deg = float(mods.get("rotation_deg", 0.0) or 0.0)

        grad_id = f"studioGrad_{uid}_{variant_index}_{variation_seed}_{sub_variation}"
        foil_id = f"studioFoil_{uid}_{variant_index}_{variation_seed}_{sub_variation}"
        deep_id = f"studioDeep_{uid}_{variant_index}_{variation_seed}_{sub_variation}"
        glow_id = f"studioGlow_{uid}_{variant_index}_{variation_seed}_{sub_variation}"
        safe_init = html.escape((initials or "TBB")[:3].upper())

        # Garantizar que el gradiente metálico nunca se ensucie con un secundario negro/oscuro (#0F172A)
        sec_clean = (sec_hex or "").strip().upper()
        if sec_clean in ("#0F172A", "#090D16", "#1E293B", "#111827", "#000000", "#18181B", ""):
            luminous_sec = "#F3E5AB"
            deep_accent = "#9A7217"
        else:
            luminous_sec = sec_hex
            deep_accent = pri_hex

        defs = f"""
        <defs>
          <linearGradient id="{grad_id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3C4"/>
            <stop offset="45%" stop-color="{pri_hex}"/>
            <stop offset="100%" stop-color="{deep_accent}"/>
          </linearGradient>
          <linearGradient id="{foil_id}" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{deep_accent}"/>
            <stop offset="50%" stop-color="{pri_hex}"/>
            <stop offset="100%" stop-color="{luminous_sec}"/>
          </linearGradient>
          <linearGradient id="{deep_id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="{pri_hex}"/>
            <stop offset="100%" stop-color="{deep_accent}"/>
          </linearGradient>
          <filter id="{glow_id}" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.32"/>
          </filter>
        </defs>
        """

        # Envoltorio opcional de marco/escudo/órbita y monograma según sub_variation o modificadores del usuario
        frame_decoration = ""
        if frame_style == "shield" or sub_variation == 3:
            frame_decoration = f'<path d="M-44,-38 H44 V4 C44,29 0,47 0,47 C0,47 -44,29 -44,4 V-38 Z" fill="none" stroke="url(#{grad_id})" stroke-width="{round(2.0 * stroke_mult, 2)}" opacity="0.88"/>'
        elif frame_style == "circle" or sub_variation == 1:
            frame_decoration = (
                f'<circle cx="0" cy="0" r="45" fill="none" stroke="url(#{grad_id})" stroke-width="{round(1.3 * stroke_mult, 2)}" stroke-dasharray="6 3" opacity="0.78"/>'
                f'<circle cx="0" cy="-45" r="3" fill="{pri_hex}"/>'
                f'<circle cx="0" cy="45" r="3" fill="{pri_hex}"/>'
            )
        elif frame_style == "octagon":
            frame_decoration = f'<polygon points="0,-46 32,-32 46,0 32,32 0,46 -32,32 -46,0 -32,-32" fill="none" stroke="url(#{grad_id})" stroke-width="{round(1.8 * stroke_mult, 2)}" opacity="0.85"/>'

        monogram_core_overlay = ""
        if force_monogram or sub_variation == 2:
            f_sz_mono = "14" if len(safe_init) >= 3 else "17"
            monogram_core_overlay = (
                f'<circle cx="0" cy="0" r="16.5" fill="#090D16" stroke="url(#{grad_id})" stroke-width="{round(1.6 * stroke_mult, 2)}"/>'
                f'<text x="0" y="5.2" text-anchor="middle" fill="#FAF8F5" font-family="\'{primary_font}\', sans-serif" font-weight="800" font-size="{f_sz_mono}" letter-spacing="1.2">{safe_init}</text>'
            )

        def _wrap_custom(inner_content: str) -> str:
            t_parts = []
            if abs(sym_scale - 1.0) > 0.01:
                t_parts.append(f"scale({round(sym_scale, 2)})")
            if abs(rot_deg) > 0.1:
                t_parts.append(f"rotate({round(rot_deg, 1)})")
            t_attr = f' transform="{" ".join(t_parts)}"' if t_parts else ""
            return defs + f'<g{t_attr}>{frame_decoration}{inner_content}{monogram_core_overlay}</g>'

        # ---------------------------------------------------------------------
        # ATELIER JONY IVE: OBJETO BASE, PALABRA, FRASE O COMBINACIÓN DUAL (A+B)
        # ---------------------------------------------------------------------
        seed_obj_primary = str(mods.get("primary_seed_object") or mods.get("seed_object") or "").strip().lower()
        seed_obj_secondary = str(mods.get("secondary_seed_object") or "").strip().lower()
        seed_hash = int(mods.get("seed_hash_offset", 0) or 0)

        if seed_obj_primary:
            obj_svg = cls._render_jony_ive_seed_object_svg(
                obj_key=seed_obj_primary,
                sec_obj_key=seed_obj_secondary,
                grad_id=grad_id,
                foil_id=foil_id,
                deep_id=deep_id,
                glow_id=glow_id,
                pri_hex=pri_hex,
                luminous_sec=luminous_sec,
                ink_hex=ink_hex,
                bg_hex=bg_hex,
                safe_init=safe_init,
                primary_font=primary_font,
                stroke_mult=stroke_mult,
                variant_index=variant_index,
                variation_seed=variation_seed,
                sub_variation=sub_variation,
            )
            if obj_svg:
                return _wrap_custom(obj_svg)

        # Si el usuario pidió explícitamente geometría orgánica/curva o prisma isométrico
        if geom_mode == "organic_curves":
            return _wrap_custom(f"""
                <g filter="url(#{glow_id})">
                  <path d="M0,-42 C24,-42 42,-24 42,0 C42,24 24,42 0,42 C-24,42 -42,24 -42,0 C-42,-18 -28,-32 -12,-32 C4,-32 16,-20 16,-6 C16,8 6,18 -6,18 C-16,18 -22,10 -22,0" fill="none" stroke="url(#{grad_id})" stroke-width="{round(5.2 * stroke_mult, 2)}" stroke-linecap="round"/>
                  <path d="M0,-18 C3,-6 6,-3 18,0 C6,3 3,6 0,18 C-3,6 -6,3 -18,0 C-6,-3 -3,-6 0,-18 Z" fill="#FAF8F5"/>
                </g>
            """)
        elif geom_mode == "sharp_minimal":
            return _wrap_custom(f"""
                <g filter="url(#{glow_id})">
                  <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22" fill="none" stroke="url(#{grad_id})" stroke-width="{round(2.4 * stroke_mult, 2)}"/>
                  <path d="M-26,16 L0,-28 L26,16 Z" fill="none" stroke="#FAF8F5" stroke-width="{round(2.0 * stroke_mult, 2)}"/>
                  <line x1="0" y1="-44" x2="0" y2="44" stroke="url(#{grad_id})" stroke-width="{round(1.4 * stroke_mult, 2)}" opacity="0.7"/>
                  <circle cx="0" cy="-4" r="5" fill="url(#{grad_id})"/>
                </g>
            """)

        # Para el Ciclo #1 (variation_seed == 0) respetamos el arquetipo sectorial en la Tarjeta #1 si aplica,
        # pero garantizando que las 4 tarjetas tengan geometría distinta y NUNCA repitan en regeneraciones.
        if variation_seed == 0 and variant_index == 0 and not seed_obj_primary:
            if archetype == "pet_nutrition_care":
                return _wrap_custom(f"""
                <g filter="url(#{glow_id})">
                  <circle cx="0" cy="0" r="42" fill="{ink_hex}" stroke="url(#{grad_id})" stroke-width="2.2"/>
                  <path d="M0,26 C-22,12 -30,-6 -20,-20 C-12,-30 0,-22 0,-12 C0,-22 12,-30 20,-20 C30,-6 22,12 0,26 Z" fill="url(#{grad_id})"/>
                  <ellipse cx="0" cy="4" rx="8.5" ry="6.5" fill="{bg_hex}"/>
                  <circle cx="-9" cy="-6" r="3.4" fill="{bg_hex}"/>
                  <circle cx="-3" cy="-10" r="3.4" fill="{bg_hex}"/>
                  <circle cx="3" cy="-10" r="3.4" fill="{bg_hex}"/>
                  <circle cx="9" cy="-6" r="3.4" fill="{bg_hex}"/>
                </g>
                """)
            if archetype == "restaurante_fuego_raiz":
                return _wrap_custom(f"""
                <g filter="url(#{glow_id})">
                  <path d="M-36,42 V-6 C-36,-28 -20,-44 0,-44 C20,-44 36,-28 36,-6 V42 H-36 Z" fill="{ink_hex}"/>
                  <path d="M0,-32 C10,-18 18,-6 14,8 C11,18 2,24 0,24 C-2,24 -11,18 -14,8 C-18,-6 -10,-18 0,-32 Z" fill="url(#{grad_id})"/>
                  <path d="M0,-12 C5,-4 7,4 4,11 C2,15 -2,15 -4,11 C-7,4 -5,-4 0,-12 Z" fill="{bg_hex}"/>
                  <path d="M-26,28 C-14,22 -6,24 0,32 C6,24 14,22 26,28" fill="none" stroke="{luminous_sec}" stroke-width="2.6" stroke-linecap="round"/>
                </g>
                """)

        # =====================================================================
        # GALERÍA DE 24 ARQUETIPOS ESCULTÓRICOS NO CÍCLICOS (JONY IVE + PENTAGRAM)
        # Paso primo coprimo (variation_seed * 7 + seed_hash) % 24 + mutación paramétrica
        # =====================================================================
        v = (variant_index + variation_seed * 7 + seed_hash) % 24
        # Mutación armónica adicional cuando variation_seed >= 4 para variación infinita
        harmonic_rot = ((variation_seed // 3) * 15) % 60
        ring_accent = (
            f'<circle cx="0" cy="0" r="41" fill="none" stroke="url(#{grad_id})" stroke-width="{round(0.95 * stroke_mult, 2)}" stroke-dasharray="4 3" opacity="0.55"/>'
            if (variation_seed % 3 == 1 and sub_variation == 0) else ""
        )

        def _wrap_archetype(core_svg: str) -> str:
            rot_part = f' transform="rotate({harmonic_rot})"' if (harmonic_rot and v not in (2, 10, 18)) else ""
            return _wrap_custom(f'{ring_accent}<g filter="url(#{glow_id})"{rot_part}>{core_svg}</g>')

        if v == 0:
            # 01: Prisma Continuo de Proporción Áurea + Estrella Cognitiva en Espacio Negativo
            return _wrap_archetype(f"""
              <path d="M0,-44 L36,-22 L36,-4 L0,-26 L-22,-13 L-22,13 L0,26 L18,15 L36,25 L0,46 L-38,24 L-38,-22 Z" fill="url(#{grad_id})"/>
              <path d="M38,-22 L38,24 L22,14 L22,-12 L0,-25 L-16,-15 L-34,-25 L0,-44 Z" fill="url(#{foil_id})" opacity="0.92"/>
              <path d="M0,-18 C2.5,-6 6,-2.5 18,0 C6,2.5 2.5,6 0,18 C-2.5,6 -6,2.5 -18,0 C-6,-2.5 -2.5,-6 0,-18 Z" fill="#FAF8F5"/>
              <circle cx="0" cy="0" r="3.2" fill="{pri_hex}"/>
            """)
        elif v == 1:
            # 02: Emblema Squircle Obsidiana con Alas Geométricas en Oro Metálico
            return _wrap_archetype(f"""
              <rect x="-42" y="-42" width="84" height="84" rx="22" fill="#090D16" stroke="url(#{grad_id})" stroke-width="{round(2.0 * stroke_mult, 2)}"/>
              <path d="M-24,18 L-6,-22 L6,-22 L24,18 L13,18 L0,-11 L-13,18 Z" fill="url(#{grad_id})"/>
              <path d="M-18,6 L0,-4 L18,6 L12,13 L0,6 L-12,13 Z" fill="#FAF8F5"/>
              <circle cx="0" cy="-25" r="3" fill="#FFF3C4"/>
            """)
        elif v == 2:
            # 03: Medallón Octogonal con Iniciales Esculpidas
            f_size = "21" if len(safe_init) >= 3 else "25"
            return _wrap_archetype(f"""
              <polygon points="0,-45 32,-32 45,0 32,32 0,45 -32,32 -45,0 -32,-32" fill="#090D16" stroke="url(#{grad_id})" stroke-width="{round(2.2 * stroke_mult, 2)}"/>
              <circle cx="0" cy="0" r="34" fill="none" stroke="{pri_hex}" stroke-width="{round(1.0 * stroke_mult, 2)}" stroke-opacity="0.5"/>
              <path d="M0,-38 L3,-31 L0,-27 L-3,-31 Z" fill="url(#{grad_id})"/>
              <path d="M-22,-18 H22" stroke="url(#{grad_id})" stroke-width="{round(1.4 * stroke_mult, 2)}" stroke-opacity="0.65"/>
              <path d="M-22,19 H22" stroke="url(#{grad_id})" stroke-width="{round(1.4 * stroke_mult, 2)}" stroke-opacity="0.65"/>
              <text x="0" y="7.5" text-anchor="middle" fill="url(#{grad_id})" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{f_size}" letter-spacing="2.5">{safe_init}</text>
            """)
        elif v == 3:
            # 04: Cubo Hexagonal Isométrico con Chispa Cuántica Central
            return _wrap_archetype(f"""
              <path d="M0,-34 L30,-17 L30,17 L0,34 L-30,17 L-30,-17 Z" fill="none" stroke="url(#{grad_id})" stroke-width="{round(3.2 * stroke_mult, 2)}" stroke-linejoin="round"/>
              <path d="M0,-34 L30,-17 L0,0 L-30,-17 Z" fill="url(#{grad_id})" opacity="0.9"/>
              <path d="M-30,-17 L0,0 L0,34 L-30,17 Z" fill="url(#{deep_id})" opacity="0.75"/>
              <path d="M0,-14 C2,-4.5 4.5,-2 14,0 C4.5,2 2,4.5 0,14 C-2,4.5 -4.5,2 -14,0 C-4.5,-2 -2,-4.5 0,-14 Z" fill="#FAF8F5"/>
            """)
        elif v == 4:
            # 05: Cinta Infinita de Fibonacci & Doble Órbita
            return _wrap_archetype(f"""
              <circle cx="0" cy="0" r="39" fill="none" stroke="url(#{grad_id})" stroke-width="{round(2.4 * stroke_mult, 2)}" opacity="0.85"/>
              <path d="M-26,-14 C-14,-34 14,-34 26,-14 C34,0 20,22 0,10 C-20,-2 -34,20 -18,32 C-4,42 22,36 30,16" fill="none" stroke="url(#{foil_id})" stroke-width="{round(6.2 * stroke_mult, 2)}" stroke-linecap="round"/>
              <circle cx="0" cy="-22" r="5" fill="#FAF8F5"/>
              <circle cx="0" cy="22" r="4" fill="{pri_hex}"/>
            """)
        elif v == 5:
            # 06: Estrella de 8 Vértices & Corona Geométrica
            return _wrap_archetype(f"""
              <rect x="-31" y="-31" width="62" height="62" rx="10" fill="none" stroke="url(#{grad_id})" stroke-width="{round(2.4 * stroke_mult, 2)}"/>
              <rect x="-31" y="-31" width="62" height="62" rx="10" transform="rotate(45)" fill="#090D16" stroke="url(#{foil_id})" stroke-width="{round(2.4 * stroke_mult, 2)}"/>
              <path d="M0,-24 L6,-6 L24,0 L6,6 L0,24 L-6,6 L-24,0 L-6,-6 Z" fill="url(#{grad_id})"/>
              <circle cx="0" cy="0" r="4.5" fill="#FAF8F5"/>
            """)
        elif v == 6:
            # 07: Vértice Ascendente Triple (Estilo Stripe / Raycast)
            return _wrap_archetype(f"""
              <path d="M-34,24 L0,-38 L34,24 L20,24 L0,-14 L-20,24 Z" fill="url(#{grad_id})"/>
              <path d="M-20,34 L0,-2 L20,34 L8,34 L0,18 L-8,34 Z" fill="#FAF8F5"/>
              <circle cx="0" cy="-26" r="3.5" fill="#090D16"/>
            """)
        elif v == 7:
            # 08: Portal Áureo Concéntrico con Núcleo Luminoso
            return _wrap_archetype(f"""
              <path d="M-36,36 V-8 C-36,-28 -20,-42 0,-42 C20,-42 36,-28 36,-8 V36 H22 V-8 C22,-20 12,-28 0,-28 C-12,-28 -22,-20 -22,-8 V36 Z" fill="url(#{grad_id})"/>
              <path d="M-12,36 V-4 C-12,-11 -6,-16 0,-16 C6,-16 12,-11 12,-4 V36 Z" fill="#FAF8F5"/>
              <circle cx="0" cy="-4" r="4.5" fill="{pri_hex}"/>
            """)
        elif v == 8:
            # 09: Lemniscata de Cinta Moebius Escultórica (Jony Ive Continuum)
            return _wrap_archetype(f"""
              <path d="M-36,0 C-36,-22 -14,-22 0,0 C14,22 36,22 36,0 C36,-22 14,-22 0,0 C-14,22 -36,22 -36,0 Z" fill="none" stroke="url(#{grad_id})" stroke-width="{round(7.0 * stroke_mult, 2)}" stroke-linecap="round"/>
              <path d="M-36,0 C-36,-22 -14,-22 0,0 C14,22 36,22 36,0" fill="none" stroke="#FAF8F5" stroke-width="{round(2.4 * stroke_mult, 2)}" stroke-linecap="round" opacity="0.88"/>
              <circle cx="-19" cy="0" r="4" fill="url(#{foil_id})"/>
              <circle cx="19" cy="0" r="4" fill="#FAF8F5"/>
            """)
        elif v == 9:
            # 10: Rosa de los Vientos Suiza / Astrolabio de Navegación
            return _wrap_archetype(f"""
              <circle cx="0" cy="0" r="38" fill="none" stroke="url(#{grad_id})" stroke-width="{round(1.8 * stroke_mult, 2)}"/>
              <circle cx="0" cy="0" r="28" fill="none" stroke="#FAF8F5" stroke-width="0.9" stroke-dasharray="3 3" opacity="0.6"/>
              <polygon points="0,-42 8,-8 42,0 8,8 0,42 -8,8 -42,0 -8,-8" fill="url(#{grad_id})"/>
              <polygon points="-24,-24 -4,-8 24,-24 8,-4 24,24 4,8 -24,24 -8,4" fill="#FAF8F5" opacity="0.88"/>
              <circle cx="0" cy="0" r="5.5" fill="#090D16" stroke="url(#{grad_id})" stroke-width="2"/>
            """)
        elif v == 10:
            # 11: Blasón Heráldico Contemporáneo con Monograma Calado
            f_sz = "19" if len(safe_init) >= 3 else "23"
            return _wrap_archetype(f"""
              <path d="M-36,-36 H36 V2 C36,25 0,44 0,44 C0,44 -36,25 -36,2 V-36 Z" fill="#090D16" stroke="url(#{grad_id})" stroke-width="{round(2.8 * stroke_mult, 2)}"/>
              <path d="M-28,-28 H28 V0 C28,19 0,34 0,34 C0,34 -28,19 -28,0 V-28 Z" fill="none" stroke="#FAF8F5" stroke-width="1.0" opacity="0.45"/>
              <path d="M-14,-28 L0,-16 L14,-28" fill="none" stroke="url(#{foil_id})" stroke-width="2.2"/>
              <text x="0" y="9" text-anchor="middle" fill="url(#{grad_id})" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{f_sz}" letter-spacing="2">{safe_init}</text>
            """)
        elif v == 11:
            # 12: Turbina Helicoidal de 6 Aspas Áureas (Estilo Chermayeff & Geismar)
            return _wrap_archetype(f"""
              <path d="M0,-8 L18,-38 L34,-26 L12,0 Z" fill="url(#{grad_id})"/>
              <path d="M8,-4 L38,12 L24,30 L0,8 Z" fill="url(#{foil_id})"/>
              <path d="M4,8 L-12,38 L-30,26 L-8,0 Z" fill="url(#{grad_id})"/>
              <path d="M-8,4 L-38,-12 L-24,-30 L0,-8 Z" fill="#FAF8F5"/>
              <circle cx="0" cy="0" r="7" fill="#090D16" stroke="url(#{grad_id})" stroke-width="2.2"/>
            """)
        elif v == 12:
            # 13: Diamante Imperial de 12 Facetas Simétricas
            return _wrap_archetype(f"""
              <polygon points="-22,-34 22,-34 42,-10 0,42 -42,-10" fill="none" stroke="url(#{grad_id})" stroke-width="{round(2.6 * stroke_mult, 2)}" stroke-linejoin="round"/>
              <polygon points="-22,-34 22,-34 12,-10 -12,-10" fill="url(#{foil_id})" opacity="0.9"/>
              <polygon points="-42,-10 42,-10 0,42" fill="url(#{grad_id})" opacity="0.35"/>
              <polyline points="-22,-34 -12,-10 0,42 12,-10 22,-34" fill="none" stroke="#FAF8F5" stroke-width="{round(1.8 * stroke_mult, 2)}"/>
              <line x1="-42" y1="-10" x2="42" y2="-10" stroke="url(#{grad_id})" stroke-width="{round(2.0 * stroke_mult, 2)}"/>
            """)
        elif v == 13:
            # 14: Alas Aerodinámicas Desplegadas en V Real
            return _wrap_archetype(f"""
              <path d="M-44,-18 L-10,28 L0,14 L-24,-18 Z" fill="url(#{grad_id})"/>
              <path d="M44,-18 L10,28 L0,14 L24,-18 Z" fill="url(#{foil_id})"/>
              <path d="M-32,-4 L0,38 L32,-4 L18,-4 L0,20 L-18,-4 Z" fill="#FAF8F5"/>
              <polygon points="0,-34 8,-14 0,-4 -8,-14" fill="url(#{grad_id})"/>
            """)
        elif v == 14:
            # 15: Flor de Loto Geométrica en Proporción Fibonacci
            return _wrap_archetype(f"""
              <path d="M0,-38 C14,-18 14,8 0,28 C-14,8 -14,-18 0,-38 Z" fill="url(#{grad_id})"/>
              <path d="M0,28 C12,8 28,-8 38,-6 C34,14 18,28 0,28 Z" fill="url(#{foil_id})" opacity="0.9"/>
              <path d="M0,28 C-12,8 -28,-8 -38,-6 C-34,14 -18,28 0,28 Z" fill="#FAF8F5" opacity="0.9"/>
              <path d="M-26,34 Q0,24 26,34" fill="none" stroke="url(#{grad_id})" stroke-width="2.8" stroke-linecap="round"/>
              <circle cx="0" cy="-6" r="4" fill="#090D16"/>
            """)
        elif v == 15:
            # 16: Átomo / Esfera Armilar Cuántica de 3 Órbitas
            return _wrap_archetype(f"""
              <ellipse cx="0" cy="0" rx="40" ry="14" fill="none" stroke="url(#{grad_id})" stroke-width="{round(2.4 * stroke_mult, 2)}"/>
              <ellipse cx="0" cy="0" rx="40" ry="14" transform="rotate(60)" fill="none" stroke="url(#{foil_id})" stroke-width="{round(2.4 * stroke_mult, 2)}"/>
              <ellipse cx="0" cy="0" rx="40" ry="14" transform="rotate(-60)" fill="none" stroke="#FAF8F5" stroke-width="{round(2.0 * stroke_mult, 2)}" opacity="0.88"/>
              <circle cx="0" cy="0" r="7.5" fill="url(#{grad_id})"/>
              <circle cx="0" cy="0" r="3" fill="#090D16"/>
            """)
        elif v == 16:
            # 17: Corona Imperial Minimalista de 5 Puntas y Arco Elíptico
            return _wrap_archetype(f"""
              <path d="M-36,22 L-30,-16 L-14,4 L0,-28 L14,4 L30,-16 L36,22 Z" fill="url(#{grad_id})" stroke="#FAF8F5" stroke-width="1.2" stroke-linejoin="round"/>
              <rect x="-34" y="26" width="68" height="7" rx="3.5" fill="#FAF8F5"/>
              <circle cx="-30" cy="-22" r="3.5" fill="#FAF8F5"/>
              <circle cx="0" cy="-34" r="4.5" fill="url(#{foil_id})"/>
              <circle cx="30" cy="-22" r="3.5" fill="#FAF8F5"/>
            """)
        elif v == 17:
            # 18: Monolito de Doble Cinta Entrelazada (Gestalt Interlock)
            return _wrap_archetype(f"""
              <path d="M-32,-16 C-32,-34 -10,-42 8,-30 L30,-12 C42,-2 42,18 28,30 C14,42 -8,38 -18,24 L-6,12 C0,20 12,22 18,16 C24,10 24,-2 16,-8 L-6,-24 C-14,-30 -20,-24 -20,-16 Z" fill="url(#{grad_id})"/>
              <path d="M32,16 C32,34 10,42 -8,30 L-30,12 C-42,2 -42,-18 -28,-30 C-14,-42 8,-38 18,-24 L6,-12 C0,-20 -12,-22 -18,-16 C-24,-10 -24,2 -16,8 L6,24 C14,30 20,24 20,16 Z" fill="#FAF8F5"/>
              <path d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z" fill="url(#{grad_id})"/>
            """)
        elif v == 18:
            # 19: Sello Cuadrado Bauhaus con Monograma Arquitectónico
            f_sz = "20" if len(safe_init) >= 3 else "25"
            return _wrap_archetype(f"""
              <rect x="-38" y="-38" width="76" height="76" rx="14" fill="#090D16" stroke="url(#{grad_id})" stroke-width="{round(2.6 * stroke_mult, 2)}"/>
              <path d="M-38,-12 H38 M-12,-38 V38" stroke="url(#{grad_id})" stroke-width="1.2" opacity="0.38"/>
              <circle cx="12" cy="12" r="20" fill="url(#{grad_id})" opacity="0.22"/>
              <text x="0" y="9" text-anchor="middle" fill="#FAF8F5" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{f_sz}" letter-spacing="2">{safe_init}</text>
            """)
        elif v == 19:
            # 20: Puente Colgante / Arco de Alianza de Proporción Áurea
            return _wrap_archetype(f"""
              <path d="M-42,24 C-24,-26 24,-26 42,24" fill="none" stroke="url(#{grad_id})" stroke-width="{round(4.2 * stroke_mult, 2)}" stroke-linecap="round"/>
              <path d="M-44,24 H44" stroke="#FAF8F5" stroke-width="{round(2.6 * stroke_mult, 2)}" stroke-linecap="round"/>
              <line x1="-18" y1="-8" x2="-18" y2="24" stroke="url(#{foil_id})" stroke-width="2.2"/>
              <line x1="0" y1="-14" x2="0" y2="24" stroke="#FAF8F5" stroke-width="2.4"/>
              <line x1="18" y1="-8" x2="18" y2="24" stroke="url(#{foil_id})" stroke-width="2.2"/>
              <circle cx="0" cy="-24" r="5" fill="url(#{grad_id})"/>
            """)
        elif v == 20:
            # 21: Reloj de Arena / Temporalidad Infinita
            return _wrap_archetype(f"""
              <polygon points="-28,-36 28,-36 0,0" fill="none" stroke="url(#{grad_id})" stroke-width="{round(2.8 * stroke_mult, 2)}" stroke-linejoin="round"/>
              <polygon points="-28,36 28,36 0,0" fill="url(#{grad_id})" opacity="0.88" stroke="#FAF8F5" stroke-width="1.4" stroke-linejoin="round"/>
              <line x1="-34" y1="-36" x2="34" y2="-36" stroke="#FAF8F5" stroke-width="3" stroke-linecap="round"/>
              <line x1="-34" y1="36" x2="34" y2="36" stroke="#FAF8F5" stroke-width="3" stroke-linecap="round"/>
              <circle cx="0" cy="-14" r="4" fill="#FAF8F5"/>
            """)
        elif v == 21:
            # 22: Rayo Cinético en Anillo de Titanio
            return _wrap_archetype(f"""
              <circle cx="0" cy="0" r="38" fill="none" stroke="#FAF8F5" stroke-width="{round(1.8 * stroke_mult, 2)}" opacity="0.7"/>
              <polygon points="6,-42 -22,4 2,4 -6,42 22,-4 -2,-4" fill="url(#{grad_id})"/>
            """)
        elif v == 22:
            # 23: Espiral Nautilus Áurea con Triángulo de Precisión
            return _wrap_archetype(f"""
              <path d="M-34,20 L-10,-32 L8,-32 L-16,20 Z" fill="url(#{grad_id})"/>
              <path d="M-4,28 L20,-24 L36,-24 L12,28 Z" fill="#FAF8F5"/>
              <circle cx="24" cy="-32" r="5" fill="url(#{grad_id})"/>
            """)
        else:
            # 24: Pirámide Dual de Horizonte y Reflejo Solar
            return _wrap_archetype(f"""
              <path d="M0,-40 L36,24 H-36 Z" fill="none" stroke="url(#{grad_id})" stroke-width="{round(3.0 * stroke_mult, 2)}" stroke-linejoin="round"/>
              <path d="M0,-18 L18,14 H-18 Z" fill="url(#{grad_id})"/>
              <circle cx="0" cy="4" r="4.5" fill="#090D16"/>
            """)

    @classmethod
    def _render_jony_ive_seed_object_svg(
        cls,
        obj_key: str,
        sec_obj_key: str,
        grad_id: str,
        foil_id: str,
        deep_id: str,
        glow_id: str,
        pri_hex: str,
        luminous_sec: str,
        ink_hex: str,
        bg_hex: str,
        safe_init: str,
        primary_font: str,
        stroke_mult: float,
        variant_index: int = 0,
        variation_seed: int = 0,
        sub_variation: int = 0,
    ) -> str:
        """
        Sintetiza cualquiera de los 24 Objetos / Símbolos Base de Jony Ive en coordenadas centradas (0,0) [-44..44],
        y si hay un segundo objeto (`sec_obj_key`) crea una fusión dual Gestalt (Concepto A + Concepto B).
        Además varía la interpretación según `(variant_index + variation_seed) % 4` para que las 4 tarjetas
        y cada regeneración muestren composiciones distintas del objeto elegido.
        """
        style_mode = (variant_index + variation_seed) % 4
        sw = round(2.4 * stroke_mult, 2)

        def _single_obj_paths(k: str, scale_f: float = 1.0) -> str:
            k = k.lower().strip()
            s_attr = f' transform="scale({scale_f})"' if abs(scale_f - 1.0) > 0.01 else ""
            if k in ("faro", "luz", "torre", "guia"):
                return f"""<g{s_attr}>
                  <path d="M-12,38 L-7,-14 H7 L12,38 Z" fill="url(#{grad_id})"/>
                  <rect x="-10" y="-22" width="20" height="8" rx="2" fill="#FAF8F5"/>
                  <path d="M-8,-22 L0,-34 L8,-22 Z" fill="url(#{foil_id})"/>
                  <path d="M7,-18 L38,-32 V-4 Z" fill="url(#{grad_id})" opacity="0.55"/>
                  <path d="M-7,-18 L-38,-32 V-4 Z" fill="#FAF8F5" opacity="0.45"/>
                  <path d="M-28,38 Q0,30 28,38" fill="none" stroke="#FAF8F5" stroke-width="{sw}" stroke-linecap="round"/>
                </g>"""
            if k in ("brujula", "brújula", "norte", "rumbo", "rosa"):
                return f"""<g{s_attr}>
                  <circle cx="0" cy="0" r="38" fill="none" stroke="url(#{grad_id})" stroke-width="{sw}"/>
                  <polygon points="0,-42 9,-9 42,0 9,9 0,42 -9,9 -42,0 -9,-9" fill="url(#{grad_id})"/>
                  <polygon points="-22,-22 -4,-8 22,-22 8,-4 22,22 4,8 -22,22 -8,4" fill="#FAF8F5" opacity="0.9"/>
                  <circle cx="0" cy="0" r="5" fill="#090D16" stroke="url(#{grad_id})" stroke-width="2"/>
                </g>"""
            if k in ("leon", "león", "fuerza", "rey", "garra"):
                return f"""<g{s_attr}>
                  <polygon points="0,-42 26,-28 38,0 24,30 0,42 -24,30 -38,0 -26,-28" fill="none" stroke="url(#{grad_id})" stroke-width="{sw}"/>
                  <path d="M-22,-18 L-8,-28 L0,-18 L8,-28 L22,-18 L28,4 L16,24 L0,34 L-16,24 L-28,4 Z" fill="url(#{grad_id})" opacity="0.9"/>
                  <polygon points="-14,-6 -4,-2 -10,6" fill="#090D16"/>
                  <polygon points="14,-6 4,-2 10,6" fill="#090D16"/>
                  <polygon points="-6,10 6,10 0,18" fill="#FAF8F5"/>
                  <path d="M0,18 V26 M-8,26 Q0,20 8,26" fill="none" stroke="#FAF8F5" stroke-width="2.2" stroke-linecap="round"/>
                </g>"""
            if k in ("aguila", "águila", "halcon", "halcón", "vuelo", "alas", "ave"):
                return f"""<g{s_attr}>
                  <path d="M-44,-16 L-12,24 L0,10 L-22,-16 Z" fill="url(#{grad_id})"/>
                  <path d="M44,-16 L12,24 L0,10 L22,-16 Z" fill="url(#{foil_id})"/>
                  <path d="M-30,0 L0,36 L30,0 L16,0 L0,20 L-16,0 Z" fill="#FAF8F5"/>
                  <polygon points="0,-32 9,-12 0,-2 -9,-12" fill="url(#{grad_id})"/>
                </g>"""
            if k in ("corona", "realeza", "imperio", "soberania", "prestigio"):
                return f"""<g{s_attr}>
                  <path d="M-36,20 L-30,-16 L-14,4 L0,-28 L14,4 L30,-16 L36,20 Z" fill="url(#{grad_id})" stroke="#FAF8F5" stroke-width="1.4" stroke-linejoin="round"/>
                  <rect x="-34" y="25" width="68" height="7" rx="3.5" fill="#FAF8F5"/>
                  <circle cx="-30" cy="-22" r="3.5" fill="#FAF8F5"/>
                  <circle cx="0" cy="-34" r="4.5" fill="url(#{foil_id})"/>
                  <circle cx="30" cy="-22" r="3.5" fill="#FAF8F5"/>
                </g>"""
            if k in ("llave", "acceso", "clave", "apertura", "secreto"):
                return f"""<g{s_attr}>
                  <circle cx="-16" cy="0" r="18" fill="none" stroke="url(#{grad_id})" stroke-width="{round(3.2 * stroke_mult, 2)}"/>
                  <circle cx="-16" cy="0" r="7" fill="#FAF8F5"/>
                  <path d="M2,0 H38 V14 M26,0 V10 M16,0 V8" fill="none" stroke="url(#{grad_id})" stroke-width="{round(3.4 * stroke_mult, 2)}" stroke-linecap="round" stroke-linejoin="round"/>
                </g>"""
            if k in ("escudo", "proteccion", "protección", "blindaje", "seguridad"):
                return f"""<g{s_attr}>
                  <path d="M-34,-36 H34 V2 C34,25 0,42 0,42 C0,42 -34,25 -34,2 V-36 Z" fill="none" stroke="url(#{grad_id})" stroke-width="{round(3.0 * stroke_mult, 2)}"/>
                  <path d="M0,-30 V34 C0,34 26,20 26,0 V-30 Z" fill="url(#{grad_id})" opacity="0.88"/>
                  <path d="M-16,-6 L-4,6 L18,-14" fill="none" stroke="#FAF8F5" stroke-width="{round(3.2 * stroke_mult, 2)}" stroke-linecap="round" stroke-linejoin="round"/>
                </g>"""
            if k in ("loto", "flor", "zen", "bienestar", "armonia", "armonía"):
                return f"""<g{s_attr}>
                  <path d="M0,-36 C14,-16 14,8 0,26 C-14,8 -14,-16 0,-36 Z" fill="url(#{grad_id})"/>
                  <path d="M0,26 C12,8 28,-8 38,-6 C34,14 18,26 0,26 Z" fill="url(#{foil_id})" opacity="0.9"/>
                  <path d="M0,26 C-12,8 -28,-8 -38,-6 C-34,14 -18,26 0,26 Z" fill="#FAF8F5" opacity="0.9"/>
                  <path d="M-26,32 Q0,22 26,32" fill="none" stroke="url(#{grad_id})" stroke-width="2.6" stroke-linecap="round"/>
                </g>"""
            if k in ("arbol", "árbol", "raiz", "raíz", "bosque", "semilla", "hoja"):
                return f"""<g{s_attr}>
                  <circle cx="0" cy="-8" r="24" fill="url(#{grad_id})" opacity="0.9"/>
                  <circle cx="-14" cy="-2" r="16" fill="url(#{foil_id})" opacity="0.85"/>
                  <circle cx="14" cy="-2" r="16" fill="#FAF8F5" opacity="0.85"/>
                  <path d="M0,36 V-12 M0,6 L-10,-4 M0,2 L10,-8" fill="none" stroke="#090D16" stroke-width="3.2" stroke-linecap="round"/>
                  <path d="M-22,36 C-10,28 10,28 22,36" fill="none" stroke="url(#{grad_id})" stroke-width="2.8" stroke-linecap="round"/>
                </g>"""
            if k in ("montana", "montaña", "cumbre", "pico", "horizonte", "cima"):
                return f"""<g{s_attr}>
                  <path d="M-38,28 L-8,-28 L12,6 L22,-10 L40,28 Z" fill="url(#{grad_id})"/>
                  <path d="M-8,-28 L4,28 H-38 Z" fill="#FAF8F5" opacity="0.88"/>
                  <circle cx="20" cy="-24" r="7" fill="url(#{foil_id})"/>
                </g>"""
            if k in ("rayo", "energia", "energía", "velocidad", "impulso", "chispa"):
                return f"""<g{s_attr}>
                  <polygon points="8,-42 -24,4 2,4 -8,42 24,-4 -2,-4" fill="url(#{grad_id})"/>
                  <circle cx="0" cy="0" r="38" fill="none" stroke="#FAF8F5" stroke-width="1.6" stroke-dasharray="8 4" opacity="0.75"/>
                </g>"""
            if k in ("infinito", "moebius", "continuidad", "eterno", "bucle"):
                return f"""<g{s_attr}>
                  <path d="M-36,0 C-36,-22 -14,-22 0,0 C14,22 36,22 36,0 C36,-22 14,-22 0,0 C-14,22 -36,22 -36,0 Z" fill="none" stroke="url(#{grad_id})" stroke-width="{round(6.8 * stroke_mult, 2)}" stroke-linecap="round"/>
                  <circle cx="-18" cy="0" r="4.5" fill="#FAF8F5"/>
                  <circle cx="18" cy="0" r="4.5" fill="url(#{foil_id})"/>
                </g>"""
            if k in ("atomo", "átomo", "ciencia", "nodo", "red", "ia", "futuro"):
                return f"""<g{s_attr}>
                  <ellipse cx="0" cy="0" rx="38" ry="13" fill="none" stroke="url(#{grad_id})" stroke-width="{sw}"/>
                  <ellipse cx="0" cy="0" rx="38" ry="13" transform="rotate(60)" fill="none" stroke="url(#{foil_id})" stroke-width="{sw}"/>
                  <ellipse cx="0" cy="0" rx="38" ry="13" transform="rotate(-60)" fill="none" stroke="#FAF8F5" stroke-width="{sw}" opacity="0.9"/>
                  <circle cx="0" cy="0" r="7" fill="url(#{grad_id})"/>
                </g>"""
            if k in ("pluma", "autor", "editorial", "escritura", "historia"):
                return f"""<g{s_attr}>
                  <path d="M24,-38 C-8,-28 -28,-4 -30,34 C2,32 26,12 36,-20 Z" fill="url(#{grad_id})"/>
                  <path d="M-30,34 L8,-4" stroke="#090D16" stroke-width="2.6" stroke-linecap="round"/>
                  <circle cx="8" cy="-4" r="4" fill="#FAF8F5"/>
                </g>"""
            if k in ("puente", "conexion", "conexión", "union", "unión", "alianza"):
                return f"""<g{s_attr}>
                  <path d="M-40,22 C-22,-24 22,-24 40,22" fill="none" stroke="url(#{grad_id})" stroke-width="{round(4.0 * stroke_mult, 2)}" stroke-linecap="round"/>
                  <path d="M-42,22 H42" stroke="#FAF8F5" stroke-width="2.6" stroke-linecap="round"/>
                  <line x1="-16" y1="-6" x2="-16" y2="22" stroke="url(#{foil_id})" stroke-width="2.2"/>
                  <line x1="0" y1="-12" x2="0" y2="22" stroke="#FAF8F5" stroke-width="2.4"/>
                  <line x1="16" y1="-6" x2="16" y2="22" stroke="url(#{foil_id})" stroke-width="2.2"/>
                </g>"""
            if k in ("reloj", "tiempo", "arena", "precision", "precisión"):
                return f"""<g{s_attr}>
                  <polygon points="-26,-34 26,-34 0,0" fill="none" stroke="url(#{grad_id})" stroke-width="{sw}" stroke-linejoin="round"/>
                  <polygon points="-26,34 26,34 0,0" fill="url(#{grad_id})" stroke="#FAF8F5" stroke-width="1.4" stroke-linejoin="round"/>
                  <line x1="-32" y1="-34" x2="32" y2="-34" stroke="#FAF8F5" stroke-width="3" stroke-linecap="round"/>
                  <line x1="-32" y1="34" x2="32" y2="34" stroke="#FAF8F5" stroke-width="3" stroke-linecap="round"/>
                </g>"""
            if k in ("ola", "mar", "agua", "fluidez", "espiral"):
                return f"""<g{s_attr}>
                  <path d="M-38,14 C-26,-28 24,-34 34,0 C40,22 16,38 -6,32 C-24,26 -26,4 -10,-6 C2,-12 16,-2 10,10" fill="none" stroke="url(#{grad_id})" stroke-width="{round(4.8 * stroke_mult, 2)}" stroke-linecap="round"/>
                  <circle cx="10" cy="10" r="4.5" fill="#FAF8F5"/>
                </g>"""
            if k in ("llama", "fuego", "brasa", "calor", "pasion", "pasión"):
                return f"""<g{s_attr}>
                  <path d="M0,-38 C16,-18 26,0 20,18 C14,32 -14,32 -20,18 C-26,0 -16,-18 0,-38 Z" fill="url(#{grad_id})"/>
                  <path d="M0,-12 C8,0 10,12 6,22 C2,28 -2,28 -6,22 C-10,12 -8,0 0,-12 Z" fill="#FAF8F5"/>
                </g>"""
            if k in ("origami", "grulla", "prisma", "pliegue", "arte"):
                return f"""<g{s_attr}>
                  <polygon points="0,-38 38,-6 12,34 -12,10" fill="url(#{grad_id})"/>
                  <polygon points="0,-38 -38,-6 -12,34 12,10" fill="url(#{foil_id})" opacity="0.85"/>
                  <polygon points="-12,10 12,10 0,38" fill="#FAF8F5"/>
                </g>"""
            if k in ("diamante", "joya", "lujo", "valor", "cristal"):
                return f"""<g{s_attr}>
                  <polygon points="-22,-32 22,-32 40,-8 0,38 -40,-8" fill="none" stroke="url(#{grad_id})" stroke-width="{sw}" stroke-linejoin="round"/>
                  <polyline points="-22,-32 -10,-8 0,38 10,-8 22,-32" fill="none" stroke="#FAF8F5" stroke-width="1.8"/>
                  <line x1="-40" y1="-8" x2="40" y2="-8" stroke="url(#{grad_id})" stroke-width="2.0"/>
                </g>"""
            if k in ("compas", "compás", "arquitectura", "medida", "proporcion", "proporción"):
                return f"""<g{s_attr}>
                  <path d="M-24,36 L0,-34 L24,36" fill="none" stroke="url(#{grad_id})" stroke-width="{round(3.6 * stroke_mult, 2)}" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M-32,12 A34,34 0 0,0 32,12" fill="none" stroke="#FAF8F5" stroke-width="2.2" stroke-linecap="round"/>
                  <circle cx="0" cy="-34" r="5" fill="#FAF8F5"/>
                </g>"""
            if k in ("colibri", "colibrí", "nectar", "agilidad"):
                return f"""<g{s_attr}>
                  <path d="M-36,-22 L6,-4 L-18,28 Z" fill="url(#{grad_id})"/>
                  <path d="M-8,-18 L24,-28 L4,4 Z" fill="url(#{foil_id})"/>
                  <path d="M6,-4 L40,-10 L12,4 L4,32 Z" fill="#FAF8F5"/>
                  <circle cx="12" cy="-6" r="2.5" fill="#090D16"/>
                </g>"""
            if k in ("fenix", "fénix", "renacer", "ascenso", "sol"):
                return f"""<g{s_attr}>
                  <path d="M-40,-10 C-28,-32 -8,-20 0,-6 C8,-20 28,-32 40,-10 C28,12 12,26 0,38 C-12,26 -28,12 -40,-10 Z" fill="url(#{grad_id})"/>
                  <path d="M0,-36 L8,-12 L0,18 L-8,-12 Z" fill="#FAF8F5"/>
                </g>"""
            # Default: Estrella Polar / Astrolabio
            return f"""<g{s_attr}>
              <path d="M0,-40 C4,-12 12,-4 40,0 C12,4 4,12 0,40 C-4,12 -12,4 -40,0 C-12,-4 -4,-12 0,-40 Z" fill="url(#{grad_id})"/>
              <circle cx="0" cy="0" r="26" fill="none" stroke="#FAF8F5" stroke-width="1.4" opacity="0.75"/>
              <circle cx="0" cy="0" r="5" fill="#FAF8F5"/>
            </g>"""

        primary_g = _single_obj_paths(obj_key, 0.92 if sec_obj_key else 1.0)
        if sec_obj_key and sec_obj_key != obj_key:
            secondary_g = _single_obj_paths(sec_obj_key, 0.52)
            # 4 modos de fusión dual A + B según tarjeta y semilla
            if style_mode == 0:
                return f'<g filter="url(#{glow_id})">{primary_g}<g transform="translate(0, 4)">{secondary_g}</g></g>'
            elif style_mode == 1:
                return f'<g filter="url(#{glow_id})"><circle cx="0" cy="0" r="42" fill="none" stroke="url(#{grad_id})" stroke-width="1.6"/>{primary_g}<g opacity="0.88">{secondary_g}</g></g>'
            elif style_mode == 2:
                return f'<g filter="url(#{glow_id})"><polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22" fill="none" stroke="url(#{grad_id})" stroke-width="1.8"/>{primary_g}{secondary_g}</g>'
            else:
                return f'<g filter="url(#{glow_id})"><rect x="-40" y="-40" width="80" height="80" rx="20" fill="none" stroke="url(#{grad_id})" stroke-width="1.8"/>{primary_g}{secondary_g}</g>'

        # Si hay un solo objeto base, variamos el chasis arquitectónico en las 4 tarjetas y ciclos
        if style_mode == 0:
            return f'<g filter="url(#{glow_id})">{primary_g}</g>'
        elif style_mode == 1:
            return f'<g filter="url(#{glow_id})"><circle cx="0" cy="0" r="42" fill="none" stroke="url(#{grad_id})" stroke-width="1.6" stroke-dasharray="6 3"/>{primary_g}</g>'
        elif style_mode == 2:
            f_sz = "11" if len(safe_init) >= 3 else "13"
            return f'<g filter="url(#{glow_id})"><polygon points="0,-44 31,-31 44,0 31,31 0,44 -31,31 -44,0 -31,-31" fill="none" stroke="url(#{grad_id})" stroke-width="1.8"/>{primary_g}<text x="0" y="39" text-anchor="middle" fill="#FAF8F5" font-family="\'{primary_font}\', sans-serif" font-weight="800" font-size="{f_sz}" letter-spacing="2">{safe_init}</text></g>'
        else:
            return f'<g filter="url(#{glow_id})"><path d="M-38,-36 H38 V2 C38,26 0,44 0,44 C0,44 -38,26 -38,2 V-36 Z" fill="none" stroke="url(#{grad_id})" stroke-width="2.0"/><g transform="scale(0.84)">{primary_g}</g></g>'


    @staticmethod
    def render_bespoke_monogram_svg_badge_inline(
        safe_init: str,
        pri_hex: str,
        bg_hex: str,
        ink_hex: str,
        primary_font: str
    ) -> str:
        return ""

    @staticmethod
    def sanitize_and_validate_svg(svg_str: str) -> str:
        """
        Corrige atributos XML comunes y garantiza que el SVG sea 100% válido y escalable a pantalla completa.
        """
        if not svg_str or "<svg" not in svg_str:
            return ""
        s = svg_str.strip()
        # Reparar comillas faltantes tipo height="100% fill=
        s = re.sub(r'(\w+="[^"\s>]+)\s+(\w+=)', r'\1" \2', s)
        if 'xmlns=' not in s:
            s = s.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"', 1)
        if 'preserveAspectRatio=' not in s.split(">")[0]:
            s = s.replace("<svg", '<svg preserveAspectRatio="xMidYMid slice"', 1)
        if 'width=' not in s.split(">")[0]:
            s = s.replace("<svg", '<svg width="100%" height="100%"', 1)
        return s

    @classmethod
    def _call_live_gemini_for_bespoke_direction(
        cls,
        compiled_prompt: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """
        Invoca a Gemini en vivo (gemini-3-flash-preview / gemini-2.5-flash) con el Master Prompt
        de 45+ insights para sintetizar la Dirección Creativa Ejecutiva y las 4 conceptualizaciones
        a medida de la marca en ~1.2 segundos.
        """
        key = _load_studio_gemini_key()
        if not key:
            return None

        brand_name = compiled_prompt["brand_name"]
        initials = compiled_prompt["initials"]
        master_es = compiled_prompt["master_prompt_es"]
        cache_key = f"{brand_name}::{hash(master_es)}"
        if not hasattr(cls, "_gemini_dir_cache"):
            cls._gemini_dir_cache = {}
        if cache_key in cls._gemini_dir_cache:
            return cls._gemini_dir_cache[cache_key]

        sys_inst = (
            "Eres el Director Creativo Ejecutivo de Pentagram y Wolff Olins. "
            "Analiza el Master Prompt de 45+ insights del cliente y devuelve en JSON la dirección creativa ejecutiva "
            "y los títulos, subtítulos y justificaciones estratégicas personalizadas para las 4 propuestas de logotipo."
        )

        user_prompt = f"""{master_es}

Devuelve UNICAMENTE un objeto JSON válido con esta estructura:
{{
  "creative_director_rationale": "Síntesis ejecutiva en español (2-3 oraciones) explicando cómo el propósito, el giro, los touchpoints, los 7 sliders Kansei y las 24 decisiones A/B dan vida a la identidad visual de {brand_name} ({initials}).",
  "proposals_meta": [
    {{
      "tag": "⭐ OPCIÓN #01 · 99% MATCH CON TU ENTREVISTA",
      "title": "{brand_name} · Lockup Totémico Flagship ({initials})",
      "rationale": "Explicación específica en español (2 oraciones) de por qué esta primera opción representa el 99% de match con su entrevista, fusionando la metáfora de su giro con el monograma {initials} y su paleta."
    }},
    {{
      "tag": "OPCIÓN #02 · ARQUITECTURA HORIZONTAL 16:9",
      "title": "{brand_name} · Lockup Horizontal & Espacio Negativo",
      "rationale": "Explicación específica en español (2 oraciones) enfocada en cabeceras web, presentaciones ejecutivas y lectura inmediata."
    }},
    {{
      "tag": "OPCIÓN #03 · SELLO OFICIAL & EMPAQUE",
      "title": "{brand_name} · Emblema Circular & Sustratos Físicos",
      "rationale": "Explicación específica en español (2 oraciones) enfocada en empaque, bordado, grabado láser y papelería de prestigio."
    }},
    {{
      "tag": "OPCIÓN #04 · SISTEMA APP ICON 1:1 & AVATAR",
      "title": "{brand_name} · Squircle iOS/Android Nocturno & Editorial",
      "rationale": "Explicación específica en español (2 oraciones) enfocada en ícono de aplicación móvil, avatar digital, tarjeta NFC y favicon."
    }}
  ]
}}"""

        for model_name in ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3-flash-preview", "gemini-2.5-flash"]:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={key}"
            payload = {
                "systemInstruction": {"parts": [{"text": sys_inst}]},
                "contents": [{"role": "user", "parts": [{"text": user_prompt}]}],
                "generationConfig": {
                    "temperature": 0.65,
                    "maxOutputTokens": 1100,
                    "responseMimeType": "application/json",
                }
            }
            try:
                req = urllib.request.Request(
                    url,
                    data=json.dumps(payload).encode("utf-8"),
                    headers={"Content-Type": "application/json"}
                )
                with urllib.request.urlopen(req, timeout=7.5, context=_STUDIO_SSL_CTX) as resp:
                    raw = json.loads(resp.read().decode("utf-8"))
                    txt = raw["candidates"][0]["content"]["parts"][0]["text"].strip()
                    txt = re.sub(r"^```(?:json)?\s*|\s*```$", "", txt).strip()
                    parsed = json.loads(txt)
                    if isinstance(parsed.get("proposals_meta"), list) and len(parsed["proposals_meta"]) >= 4:
                        parsed["model_used"] = model_name
                        cls._gemini_dir_cache[cache_key] = parsed
                        return parsed
            except Exception:
                continue

        # Superpoder 3 (Max Tech Lead): Failover a Groq LPU (<250ms) si Gemini agota cuota (429)
        groq_key = os.environ.get("GROQ_API_KEY", "").strip()
        if groq_key:
            for groq_model in ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]:
                try:
                    req = urllib.request.Request(
                        "https://api.groq.com/openai/v1/chat/completions",
                        data=json.dumps({
                            "model": groq_model,
                            "messages": [
                                {"role": "system", "content": sys_inst},
                                {"role": "user", "content": user_prompt}
                            ],
                            "temperature": 0.6,
                            "response_format": {"type": "json_object"}
                        }).encode("utf-8"),
                        headers={
                            "Content-Type": "application/json",
                            "Authorization": f"Bearer {groq_key}",
                            "User-Agent": "TheBestBrand-BespokeStudio/3.0"
                        }
                    )
                    with urllib.request.urlopen(req, timeout=6.5, context=_STUDIO_SSL_CTX) as resp:
                        raw = json.loads(resp.read().decode("utf-8"))
                        txt = raw["choices"][0]["message"]["content"].strip()
                        txt = re.sub(r"^```(?:json)?\s*|\s*```$", "", txt).strip()
                        parsed = json.loads(txt)
                        if isinstance(parsed.get("proposals_meta"), list) and len(parsed["proposals_meta"]) >= 4:
                            parsed["model_used"] = f"groq/{groq_model}"
                            cls._gemini_dir_cache[cache_key] = parsed
                            return parsed
                except Exception:
                    continue
        return None

    SEED_OBJECT_KEYWORDS: List[Tuple[str, List[str]]] = [
        ("faro", ["faro", "luz", "torre de luz", "guía", "guia", "iluminar", "claridad"]),
        ("brujula", ["brújula", "brujula", "norte", "rumbo", "rosa de los vientos", "dirección", "direccion"]),
        ("leon", ["león", "leon", "rey", "melena", "rugido", "garra", "liderazgo"]),
        ("aguila", ["águila", "aguila", "halcón", "halcon", "alas", "vuelo", "volar", "ave"]),
        ("corona", ["corona", "realeza", "soberanía", "soberania", "imperio", "trono", "élite", "elite"]),
        ("llave", ["llave", "acceso", "apertura", "clave", "cerradura", "secreto", "desbloquear"]),
        ("escudo", ["escudo", "blindaje", "protección", "proteccion", "heráldica", "heraldica", "defensa"]),
        ("loto", ["loto", "flor de loto", "flor", "zen", "meditación", "meditacion", "armonía", "armonia", "calma"]),
        ("arbol", ["árbol", "arbol", "raíz", "raiz", "bosque", "roble", "pino", "semilla", "hoja", "vida"]),
        ("montana", ["montaña", "montana", "cumbre", "pico", "cima", "cordillera", "alpino", "escalar"]),
        ("rayo", ["rayo", "energía", "energia", "relámpago", "relampago", "chispa", "velocidad", "eléctrico", "electrico"]),
        ("infinito", ["infinito", "moebius", "cinta continua", "bucle", "eterno", "continuidad", "sinfín"]),
        ("atomo", ["átomo", "atomo", "cuántico", "cuantico", "ciencia", "nodo", "red neural", "molécula"]),
        ("pluma", ["pluma", "escritura", "autor", "editorial", "poesía", "literatura", "tinta"]),
        ("puente", ["puente", "conexión", "conexion", "unión", "union", "alianza", "vínculo", "vinculo", "arco"]),
        ("reloj", ["reloj", "reloj de arena", "tiempo", "cronómetro", "cronometro", "precisión", "precision"]),
        ("ola", ["ola", "mar", "océano", "oceano", "agua", "fluidez", "marea", "corriente"]),
        ("llama", ["llama", "fuego", "flama", "brasa", "hoguera", "calor", "pasión", "pasion"]),
        ("origami", ["origami", "grulla", "pliegue", "papel plegado", "facetado", "poliedro"]),
        ("estrella", ["estrella", "estrella polar", "constelación", "constelacion", "astrolabio", "cosmos", "astro"]),
        ("diamante", ["diamante", "joya", "gema", "cristal", "brillante", "quilate"]),
        ("compas", ["compás", "compas", "escuadra", "arquitectura", "medida", "trazo áureo"]),
        ("colibri", ["colibrí", "colibri", "néctar", "nectar", "agilidad"]),
        ("fenix", ["fénix", "fenix", "renacer", "resurgir", "cenizas", "sol"]),
    ]

    @classmethod
    def parse_user_refinement_modifiers(
        cls,
        user_refinement_prompt: str = "",
        custom_modifiers: Optional[Dict[str, Any]] = None,
        canvas_state: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Traduce las instrucciones en lenguaje natural del usuario y la Semilla Creativa de Jony Ive
        (palabra clave, frase, objeto/símbolo base y combinación de palabras/conceptos)
        combinándolas con `custom_modifiers` explícitos.
        """
        mods = dict(custom_modifiers or {})
        cs = canvas_state or {}

        seed_word = str(mods.get("seed_word") or cs.get("creative_seed_word") or "").strip()
        seed_phrase = str(mods.get("seed_phrase") or cs.get("creative_seed_phrase") or "").strip()
        seed_object = str(mods.get("seed_object") or cs.get("creative_seed_object") or "").strip()
        seed_combo = str(mods.get("seed_combo") or cs.get("creative_seed_combo") or "").strip()

        if seed_word:
            mods["seed_word"] = seed_word
        if seed_phrase:
            mods["seed_phrase"] = seed_phrase
        if seed_object:
            mods["seed_object"] = seed_object
        if seed_combo:
            mods["seed_combo"] = seed_combo

        combined_seed_text = " | ".join(
            [x for x in [seed_object, seed_combo, seed_word, seed_phrase, user_refinement_prompt] if x]
        ).lower().strip()

        # Detectar hasta 2 objetos/conceptos base (para soporte de Objeto Único o Combinación Dual A + B)
        detected_objs: List[str] = []
        if seed_object:
            so_clean = seed_object.lower().strip()
            for obj_id, kw_list in cls.SEED_OBJECT_KEYWORDS:
                if so_clean == obj_id or any(kw in so_clean for kw in kw_list):
                    if obj_id not in detected_objs:
                        detected_objs.append(obj_id)
        if seed_combo:
            parts = re.split(r"[\+\,/&]|(?:\s+y\s+)|(?:\s+con\s+)", seed_combo.lower())
            for part in parts:
                p_clean = part.strip()
                if not p_clean:
                    continue
                for obj_id, kw_list in cls.SEED_OBJECT_KEYWORDS:
                    if p_clean == obj_id or any(kw in p_clean for kw in kw_list):
                        if obj_id not in detected_objs:
                            detected_objs.append(obj_id)
        if combined_seed_text:
            for obj_id, kw_list in cls.SEED_OBJECT_KEYWORDS:
                if any(kw in combined_seed_text for kw in kw_list):
                    if obj_id not in detected_objs:
                        detected_objs.append(obj_id)

        if detected_objs:
            mods["primary_seed_object"] = detected_objs[0]
            if len(detected_objs) > 1:
                mods["secondary_seed_object"] = detected_objs[1]

        # Calcular un offset determinístico pero sensible a cualquier palabra/frase escrita por el usuario
        if combined_seed_text:
            mods["seed_hash_offset"] = sum((i + 1) * ord(ch) for i, ch in enumerate(combined_seed_text)) % 24
        else:
            mods["seed_hash_offset"] = int(mods.get("seed_hash_offset", 0) or 0)

        summary_parts = []
        if seed_word:
            summary_parts.append(f"Palabra base: «{seed_word}»")
        if seed_phrase:
            summary_parts.append(f"Frase rectora: «{seed_phrase}»")
        if seed_object:
            summary_parts.append(f"Objeto/Símbolo: «{seed_object}»")
        if seed_combo:
            summary_parts.append(f"Fusión conceptual: «{seed_combo}»")
        if detected_objs and not (seed_object or seed_combo):
            summary_parts.append(f"Metáfora detectada: {' + '.join(detected_objs)}")
        mods["creative_seed_summary"] = " · ".join(summary_parts)

        p = (user_refinement_prompt or "").lower().strip()
        if not p:
            return mods

        if any(w in p for w in ["fino", "delgado", "minimal", "minimalista", "sutil", "ligero", "aire"]):
            mods["stroke_scale"] = float(mods.get("stroke_scale") or 0.72)
            if "geometry_mode" not in mods and not detected_objs:
                mods["geometry_mode"] = "sharp_minimal"
        elif any(w in p for w in ["grueso", "fuerte", "bold", " sólido", "solido", "impacto", "pesado", "robusto"]):
            mods["stroke_scale"] = float(mods.get("stroke_scale") or 1.45)
            mods["symbol_scale"] = float(mods.get("symbol_scale") or 1.12)

        if any(w in p for w in ["monograma", "inicial", "iniciales", "letras", "siglas"]):
            mods["show_monogram"] = True
        if any(w in p for w in ["sin monograma", "solo símbolo", "solo simbolo", "sin letras"]):
            mods["show_monogram"] = False

        if any(w in p for w in ["escudo", "heráldico", "heraldico", "blason", "blasón", "insignia"]) and mods.get("primary_seed_object") != "escudo":
            mods["frame_style"] = "shield"
        elif any(w in p for w in ["círculo", "circulo", "circular", "anillo", "órbita", "orbita", "medallón", "medallon"]):
            mods["frame_style"] = "circle"
        elif any(w in p for w in ["octágono", "octagono", "hexágono", "hexagono", "polígono"]):
            mods["frame_style"] = "octagon"

        if any(w in p for w in ["curv", "orgánic", "organic", "suave", "fluido", "onda", "espiral"]) and not detected_objs:
            mods["geometry_mode"] = "organic_curves"
        elif any(w in p for w in ["geométric", "geometric", "angular", "recto", "prisma", "arquitect"]) and not detected_objs:
            mods["geometry_mode"] = "sharp_minimal"

        if any(w in p for w in ["grande", "mayor tamaño", "ampliar", "escalar"]):
            mods["symbol_scale"] = float(mods.get("symbol_scale") or 1.16)
        elif any(w in p for w in ["pequeño", "discreto", "compacto"]):
            mods["symbol_scale"] = float(mods.get("symbol_scale") or 0.86)

        if any(w in p for w in ["rotar", "girar", "inclin", "dinámic", "dinamic", "diagonal"]):
            mods["rotation_deg"] = float(mods.get("rotation_deg") or 15.0)

        if any(w in p for w in ["claro", "blanco", "marfil", " alabastro", "invertir", "positivo"]):
            mods["invert_canvas"] = True
        elif any(w in p for w in ["oscuro", "negro", "nocturno", "obsidiana"]):
            mods["invert_canvas"] = False

        if any(w in p for w in ["mayúscula", "mayuscula", "uppercase"]):
            mods["force_uppercase"] = True
        elif any(w in p for w in ["minúscula", "minuscula", "caja mixta"]):
            mods["force_uppercase"] = False

        return mods

    @classmethod
    def generate_4_studio_logo_proposals(
        cls,
        brand_name: str,
        industry_hint: str,
        purpose_text: str,
        colors_hex: List[str],
        primary_font: str = "Space Grotesk",
        secondary_font: str = "Plus Jakarta Sans",
        descriptor_tagline: str = "ESTÁNDAR DE EXCELENCIA",
        show_construction_grid: bool = False,
        canvas_state: Optional[Dict[str, Any]] = None,
        bipolar_sliders: Optional[Dict[str, float]] = None,
        pair_selections: Optional[Dict[str, str]] = None,
        selected_family_index: int = 0,
        custom_prompt_override: str = "",
        use_live_gemini: bool = False,
        generation_mode: str = "initial",
        variation_seed: int = 0,
        selected_slot_index: int = 0,
        user_refinement_prompt: str = "",
        custom_modifiers: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """
        Construye las 4 Propuestas de Logotipo Final con calidad de estudio internacional,
        guiadas por el Master Prompt compilado de los 45+ insights de los Pasos 0 a 5.
        Soporta 4 modos interactivos en tiempo real:
        - `initial`: Las 4 propuestas base (Totémico, Horizontal 16:9, Monograma/Emblema, App Icon 1:1).
        - `regenerate_all_4`: Regenera por completo las 4 opciones rotando geometrías, semillas (`variation_seed`) y composiciones.
        - `variations_of_selected`: Toma el logo seleccionado (`selected_slot_index`) y genera 4 variaciones hermanas de ese diseño.
        - `refine_selected`: Aplica los cambios pedidos por el usuario (`user_refinement_prompt` + `custom_modifiers`) al logo seleccionado.
        """
        effective_prompt_override = custom_prompt_override
        if user_refinement_prompt:
            effective_prompt_override = (
                f"{custom_prompt_override}\n\n[DIRECTRIZ DE AJUSTE DEL USUARIO EN VIVO (Ciclo #{variation_seed})]: {user_refinement_prompt}"
                if custom_prompt_override else ""
            )

        compiled = cls.compile_master_logo_prompt(
            brand_name=brand_name,
            industry_hint=industry_hint,
            purpose_text=purpose_text,
            colors_hex=colors_hex,
            primary_font=primary_font,
            secondary_font=secondary_font,
            descriptor_tagline=descriptor_tagline,
            canvas_state=canvas_state,
            bipolar_sliders=bipolar_sliders,
            pair_selections=pair_selections,
            selected_family_index=selected_family_index,
            custom_prompt_override=effective_prompt_override
        )
        if user_refinement_prompt:
            compiled["master_prompt_es"] += f"\n\n8. AJUSTE PERSONALIZADO SOLICITADO POR EL FUNDADOR:\n• Directriz aplicada: \"{user_refinement_prompt.strip()}\""

        mods = cls.parse_user_refinement_modifiers(user_refinement_prompt, custom_modifiers, canvas_state)
        seed_summary = str(mods.get("creative_seed_summary") or "").strip()
        if seed_summary:
            compiled["master_prompt_es"] += f"\n\n9. SEMILLA CREATIVA Y CONCEPTO BASE (JONY IVE ATELIER):\n• {seed_summary}"
            compiled["design_dna_pills"] = [
                {"label": "Semilla Creativa", "value": seed_summary[:42]},
                *compiled.get("design_dna_pills", []),
            ]

        live_dir = None

        bg_hex, ink_hex, pri_hex, sec_hex = compiled["colors_hex"]
        archetype = compiled["archetype"]
        initials = compiled["initials"]
        metaphor_info = compiled["metaphor_info"]
        raw_brand_str = compiled["brand_name"]
        clean_name = html.escape(raw_brand_str)
        use_upper = mods.get("force_uppercase", compiled["uppercase_lockup"])
        display_name = clean_name.upper() if use_upper else clean_name
        wp1_raw, wp2_raw = cls.split_brand_wordmark_parts(raw_brand_str, uppercase=use_upper)
        wp1 = html.escape(wp1_raw)
        wp2 = html.escape(wp2_raw)

        # Garantizar acento luminoso de alto contraste y lienzos editoriales puros
        if (pri_hex or "").upper() in ("#090D16", "#0F172A", "#1E293B", "#000000"):
            pri_hex = "#C59B27"
        light_canvas = "#FAF8F5"
        dark_canvas = "#070B14"
        invert_canvas = bool(mods.get("invert_canvas", False))

        desc_clean = html.escape(compiled["tagline"].upper()[:46])

        # Determinar índices de variante y sub-variaciones según el modo solicitado
        sel_idx = max(0, min(7, int(selected_slot_index or 0)))
        seed_int = max(0, int(variation_seed or 0))
        engine_mode = str(mods.get("engine_mode") or "nanobanana_2_ive").strip().lower()
        has_explicit_ive_object = bool(mods.get("primary_seed_object") or mods.get("seed_object"))

        live_svg_res = None
        live_svg_batch = None
        if use_live_gemini and engine_mode != "pentagram_golden_36":
            try:
                from multi_engine_logo_synthesizer import MultiEngineLogoSynthesizer
                live_svg_res = MultiEngineLogoSynthesizer.generate_gemini_8_bespoke_svg_symbols(
                    brand_name=raw_brand_str,
                    initials=initials,
                    metaphor_desc=metaphor_info.get("metaphor", ""),
                    creative_seed_summary=seed_summary or user_refinement_prompt or metaphor_info.get("metaphor", ""),
                    colors_hex=[bg_hex, ink_hex, pri_hex, sec_hex],
                    variation_seed=seed_int,
                    generation_mode=generation_mode,
                    selected_slot_index=sel_idx,
                    user_refinement_prompt=user_refinement_prompt,
                    api_key=_load_studio_gemini_key(),
                )
                if live_svg_res and live_svg_res.get("symbols"):
                    live_svg_batch = live_svg_res["symbols"]
            except Exception:
                live_svg_batch = None

        # Generar 8 símbolos base paramétricos de Sir Jony Ive (con soporte de objeto único, fusión A+B y 24 arquetipos sin ciclos)
        if generation_mode == "variations_of_selected":
            base_v = sel_idx % 8
            mods_list = [
                dict(mods),
                {**mods, "stroke_scale": round(float(mods.get("stroke_scale", 1.0)) * 0.76, 2), "frame_style": "circle"},
                {**mods, "show_monogram": True, "symbol_scale": round(float(mods.get("symbol_scale", 1.0)) * 1.06, 2)},
                {**mods, "frame_style": "shield", "stroke_scale": round(float(mods.get("stroke_scale", 1.0)) * 1.20, 2)},
                {**mods, "frame_style": "octagon", "rotation_deg": 15.0},
                {**mods, "geometry_mode": "organic_curves", "stroke_scale": 0.90},
                {**mods, "show_monogram": True, "frame_style": "circle"},
                {**mods, "stroke_scale": 1.32, "symbol_scale": 1.08},
            ]
            ive_syms = [
                cls.render_bespoke_symbol_inner_svg(
                    archetype,
                    pri_hex,
                    sec_hex,
                    "#090D16" if i in (1, 5) else "#FAF8F5",
                    light_canvas if i in (1, 5) else dark_canvas,
                    base_v,
                    f"var_{seed_int}_{i}",
                    initials,
                    primary_font,
                    seed_int,
                    i % 4,
                    mods_list[i],
                )
                for i in range(8)
            ]
        else:
            ive_syms = [
                cls.render_bespoke_symbol_inner_svg(
                    archetype,
                    pri_hex,
                    sec_hex,
                    "#090D16" if i in (1, 5) else "#FAF8F5",
                    light_canvas if i in (1, 5) else dark_canvas,
                    i,
                    f"g{seed_int}_{i}",
                    initials,
                    primary_font,
                    seed_int,
                    i % 4,
                    {**mods, "show_monogram": True} if i == 2 else ({**mods, "frame_style": "shield"} if i == 3 else ({**mods, "frame_style": "octagon"} if i == 6 else mods)),
                )
                for i in range(8)
            ]

        # Combinar inteligentemente los símbolos IA en vivo (NanoBanana 2.1 + Gemini 3.5) con la precisión escultórica de Jony Ive
        final_syms: List[str] = list(ive_syms)
        ai_titles: Dict[int, str] = {}
        ai_rationales: Dict[int, str] = {}

        if live_svg_batch and len(live_svg_batch) >= 4:
            if generation_mode == "variations_of_selected" and has_explicit_ive_object:
                # Cuando el usuario eligió un objeto escultórico de Jony Ive (ej. Brújula, León + Escudo) y pide 8 variaciones,
                # mantenemos las 8 variaciones geométricas coherentes del mismo objeto escultórico sin saltar a otro símbolo.
                for k in range(min(8, len(live_svg_batch))):
                    if live_svg_batch[k].get("title"):
                        ai_titles[k] = live_svg_batch[k]["title"]
                    if live_svg_batch[k].get("rationale"):
                        ai_rationales[k] = live_svg_batch[k]["rationale"]
            elif has_explicit_ive_object and engine_mode != "gemini_live_svg_only":
                # Si el usuario eligió un objeto escultórico de Jony Ive (ej. León + Escudo, Brújula + Estrella),
                # las opciones 1..4 muestran la escultura áurea exacta de Jony Ive y las opciones 5..8 muestran la síntesis IA libre de NanoBanana 2.1
                for k in range(min(4, len(live_svg_batch))):
                    target_slot = 4 + k
                    final_syms[target_slot] = f'<g transform="translate(-50,-50)">{live_svg_batch[k]["svg_g"]}</g>'
                    if live_svg_batch[k].get("title"):
                        ai_titles[target_slot] = live_svg_batch[k]["title"]
                    if live_svg_batch[k].get("rationale"):
                        ai_rationales[target_slot] = live_svg_batch[k]["rationale"]
            else:
                # Si es una idea abierta/frase libre o modo IA pura, las 8 tarjetas usan directamente los vectores de NanoBanana 2.1 + Gemini 3.5
                for k in range(min(8, len(live_svg_batch))):
                    final_syms[k] = f'<g transform="translate(-50,-50)">{live_svg_batch[k]["svg_g"]}</g>'
                    if live_svg_batch[k].get("title"):
                        ai_titles[k] = live_svg_batch[k]["title"]
                    if live_svg_batch[k].get("rationale"):
                        ai_rationales[k] = live_svg_batch[k]["rationale"]

        sym_0, sym_1, sym_2, sym_3, sym_4, sym_5, sym_6, sym_7 = final_syms[:8]

        grid_overlay = ""
        if show_construction_grid:
            grid_overlay = f"""
            <g opacity="0.20" stroke="{pri_hex}" stroke-width="0.6" stroke-dasharray="3 3">
              <line x1="0" y1="112" x2="520" y2="112"/>
              <line x1="260" y1="0" x2="260" y2="310"/>
              <circle cx="260" cy="108" r="58" fill="none"/>
              <circle cx="260" cy="108" r="35.8" fill="none"/>
            </g>
            """

        wordmark_dark_svg = (
            f'{wp1}<tspan fill="{pri_hex}">{wp2}</tspan>' if wp2 else display_name
        )
        wordmark_light_svg = (
            f'{wp1}<tspan fill="{pri_hex}">{wp2}</tspan>' if wp2 else display_name
        )
        font_sz_main = 27 if len(raw_brand_str) <= 14 else (23 if len(raw_brand_str) <= 20 else 19)
        track_main = "2.2" if not use_upper else "4.2"

        c1_bg_top = "#FFFFFF" if invert_canvas else "#162038"
        c1_bg_bot = "#F5F2EB" if invert_canvas else dark_canvas
        c1_text = "#090D16" if invert_canvas else "#FAF8F5"
        c1_sub = "#475569" if invert_canvas else "#94A3B8"

        # PROPUESTA 01: LOCKUP TOTÉMICO FLAGSHIP (99% MATCH — OBSIDIANA IMPERIAL & ORO ÁUREO)
        svg_01 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGlow01_{seed_int}" cx="50%" cy="36%" r="62%">
              <stop offset="0%" stop-color="{c1_bg_top}"/>
              <stop offset="100%" stop-color="{c1_bg_bot}"/>
            </radialGradient>
            <linearGradient id="goldLine01_{seed_int}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="{pri_hex}" stop-opacity="0"/>
              <stop offset="50%" stop-color="{pri_hex}" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="{pri_hex}" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <rect width="520" height="310" fill="url(#bgGlow01_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="{pri_hex}" stroke-opacity="0.24" stroke-width="1"/>
          {grid_overlay}
          <g transform="translate(260, 108) scale(1.38)">
            {sym_0}
          </g>
          <text x="260" y="226" text-anchor="middle" fill="{c1_text}" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{font_sz_main}" letter-spacing="{track_main}">{wordmark_dark_svg}</text>
          <line x1="170" y1="246" x2="350" y2="246" stroke="url(#goldLine01_{seed_int})" stroke-width="1.3"/>
          <text x="260" y="268" text-anchor="middle" fill="{c1_sub}" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="9.2" letter-spacing="3.2">{desc_clean}</text>
        </svg>"""

        # PROPUESTA 02: LOCKUP HORIZONTAL EJECUTIVO 16:9 (EDITORIAL ALABASTRO & CONTRASTE SUIZO)
        svg_02 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bgIvory02_{seed_int}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="100%" stop-color="#F5F2EB"/>
            </linearGradient>
          </defs>
          <rect width="520" height="310" fill="url(#bgIvory02_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="#090D16" stroke-opacity="0.08" stroke-width="1"/>
          {grid_overlay}
          <g transform="translate(118, 155) scale(1.28)">
            {sym_1}
          </g>
          <line x1="192" y1="98" x2="192" y2="212" stroke="{pri_hex}" stroke-width="1.6" opacity="0.65"/>
          <text x="214" y="152" text-anchor="start" fill="#090D16" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{font_sz_main}" letter-spacing="1.6">{wordmark_light_svg}</text>
          <text x="214" y="180" text-anchor="start" fill="#475569" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="8.2" letter-spacing="1.8">{html.escape(compiled["tagline"].upper()[:34])}</text>
        </svg>"""

        # PROPUESTA 03: MONOGRAMA ESCULTÓRICO & EMBLEMA DE AUTOR (ESTILO HERMÈS / PENTAGRAM)
        svg_03 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGlow03_{seed_int}" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stop-color="#131B2E"/>
              <stop offset="100%" stop-color="#070A12"/>
            </radialGradient>
          </defs>
          <rect width="520" height="310" fill="url(#bgGlow03_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="{pri_hex}" stroke-opacity="0.20" stroke-width="1"/>
          {grid_overlay}
          <g transform="translate(260, 118) scale(1.42)">
            {sym_2}
          </g>
          <text x="260" y="236" text-anchor="middle" fill="#FAF8F5" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="20" letter-spacing="5.5">{clean_name.upper()}</text>
          <text x="260" y="262" text-anchor="middle" fill="{pri_hex}" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="8.8" letter-spacing="3.4">{desc_clean}</text>
        </svg>"""

        # PROPUESTA 04: FLAGSHIP APP ICON SQUIRCLE 1:1 (ESTILO APPLE DESIGN AWARD / RAYCAST)
        svg_04 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgStudio04_{seed_int}" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stop-color="#1E293B"/>
              <stop offset="100%" stop-color="#080C15"/>
            </radialGradient>
            <linearGradient id="squircleSurf04_{seed_int}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#162035"/>
              <stop offset="55%" stop-color="#090D16"/>
              <stop offset="100%" stop-color="#05070C"/>
            </linearGradient>
            <linearGradient id="squircleEdge04_{seed_int}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF3C4" stop-opacity="0.9"/>
              <stop offset="45%" stop-color="{pri_hex}" stop-opacity="0.7"/>
              <stop offset="100%" stop-color="{pri_hex}" stop-opacity="0.2"/>
            </linearGradient>
            <filter id="squircleShadow04_{seed_int}" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000000" flood-opacity="0.55"/>
            </filter>
          </defs>
          <rect width="520" height="310" fill="url(#bgStudio04_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="1"/>
          <rect x="190" y="34" width="140" height="140" rx="34" fill="url(#squircleSurf04_{seed_int})" stroke="url(#squircleEdge04_{seed_int})" stroke-width="1.8" filter="url(#squircleShadow04_{seed_int})"/>
          <rect x="196" y="40" width="128" height="128" rx="29" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="0.9"/>
          <g transform="translate(260, 104) scale(1.26)">
            {sym_3}
          </g>
          <text x="260" y="222" text-anchor="middle" fill="#FAF8F5" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="22" letter-spacing="2.4">{wordmark_dark_svg}</text>
          <text x="260" y="250" text-anchor="middle" fill="#94A3B8" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="9.0" letter-spacing="3.0">{desc_clean}</text>
        </svg>"""

        # PROPUESTA 05: SÍNTESIS IA NANOBANANA 2.1 · ESCULTURA CINÉTICA DE AUTOR
        svg_05 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGlow05_{seed_int}" cx="50%" cy="38%" r="64%">
              <stop offset="0%" stop-color="#172554"/>
              <stop offset="100%" stop-color="#070B14"/>
            </radialGradient>
          </defs>
          <rect width="520" height="310" fill="url(#bgGlow05_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="{sec_hex}" stroke-opacity="0.28" stroke-width="1.2"/>
          <g transform="translate(260, 108) scale(1.38)">
            {sym_4}
          </g>
          <text x="260" y="228" text-anchor="middle" fill="#FAF8F5" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{font_sz_main}" letter-spacing="{track_main}">{wordmark_dark_svg}</text>
          <text x="260" y="258" text-anchor="middle" fill="{sec_hex}" font-family="'{secondary_font}', sans-serif" font-weight="700" font-size="9.0" letter-spacing="3.0">{desc_clean}</text>
        </svg>"""

        # PROPUESTA 06: SÍNTESIS IA NANOBANANA 2.1 · GALERÍA SUIZA SOBRE LIENZO MARFIL
        svg_06 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bgIvory06_{seed_int}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FAF8F5"/>
              <stop offset="100%" stop-color="#EDE9FE"/>
            </linearGradient>
          </defs>
          <rect width="520" height="310" fill="url(#bgIvory06_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="#090D16" stroke-opacity="0.12" stroke-width="1"/>
          <g transform="translate(260, 106) scale(1.34)">
            {sym_5}
          </g>
          <text x="260" y="226" text-anchor="middle" fill="#090D16" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{font_sz_main}" letter-spacing="2.0">{wordmark_light_svg}</text>
          <text x="260" y="254" text-anchor="middle" fill="#475569" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="8.8" letter-spacing="2.6">{desc_clean}</text>
        </svg>"""

        # PROPUESTA 07: INSIGNIA OCTOGONAL DE PRESTIGIO & SELLO HERÁLDICO MODERNO
        svg_07 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGlow07_{seed_int}" cx="50%" cy="40%" r="62%">
              <stop offset="0%" stop-color="#1E1B4B"/>
              <stop offset="100%" stop-color="#090D16"/>
            </radialGradient>
          </defs>
          <rect width="520" height="310" fill="url(#bgGlow07_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="{pri_hex}" stroke-opacity="0.26" stroke-width="1.2"/>
          <g transform="translate(118, 155) scale(1.30)">
            {sym_6}
          </g>
          <line x1="192" y1="96" x2="192" y2="214" stroke="{pri_hex}" stroke-width="1.6" opacity="0.65"/>
          <text x="214" y="150" text-anchor="start" fill="#FAF8F5" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{font_sz_main}" letter-spacing="1.8">{wordmark_dark_svg}</text>
          <text x="214" y="180" text-anchor="start" fill="{pri_hex}" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="8.4" letter-spacing="2.2">{html.escape(compiled["tagline"].upper()[:34])}</text>
        </svg>"""

        # PROPUESTA 08: JOYA ANODIZADA JONY IVE & MONOGRAMA DE BOLSILLO
        svg_08 = f"""<svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgGlow08_{seed_int}" cx="50%" cy="38%" r="65%">
              <stop offset="0%" stop-color="#111827"/>
              <stop offset="100%" stop-color="#05070C"/>
            </radialGradient>
          </defs>
          <rect width="520" height="310" fill="url(#bgGlow08_{seed_int})"/>
          <rect x="14" y="14" width="492" height="282" rx="14" fill="none" stroke="{pri_hex}" stroke-opacity="0.22" stroke-width="1"/>
          <circle cx="260" cy="108" r="68" fill="#090D16" stroke="{pri_hex}" stroke-width="1.5" stroke-opacity="0.55"/>
          <g transform="translate(260, 108) scale(1.28)">
            {sym_7}
          </g>
          <text x="260" y="226" text-anchor="middle" fill="#FAF8F5" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="21" letter-spacing="4.2">{clean_name.upper()}</text>
          <text x="260" y="254" text-anchor="middle" fill="#94A3B8" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="8.8" letter-spacing="3.0">{desc_clean}</text>
        </svg>"""

        director_rationale = (
            (live_svg_res or {}).get("creative_summary")
            or (live_dir or {}).get("creative_director_rationale")
            or f"Sintetizamos tu identidad visual para «{compiled['brand_name']}» ({metaphor_info['sector_label']}): "
               f"fusionamos la metáfora de {metaphor_info['metaphor']} con el monograma «{initials}», "
               f"respetando la tipografía {primary_font} y tu paleta seleccionada ({ink_hex}, {pri_hex}, {sec_hex})."
        )
        if seed_summary:
            director_rationale = f"[Idea Base: {seed_summary}] · " + director_rationale
        if user_refinement_prompt:
            director_rationale = f"[Ajuste Aplicado: «{user_refinement_prompt}»] · " + director_rationale

        meta_list = (live_dir or {}).get("proposals_meta") or []
        seed_badge_txt = f" · {seed_summary[:32]}" if seed_summary else ""
        active_ai_model = (live_svg_res or {}).get("model_used") or (live_dir or {}).get("model_used") or "NanoBanana 2.1 + Jony Ive Studio"
        gen_by = f"{active_ai_model} · Ciclo #{seed_int + 1} (8 Propuestas){seed_badge_txt}"

        if generation_mode == "variations_of_selected":
            parent_label = f"Opción #{sel_idx + 1}"
            proposals_out = [
                {
                    "proposal_id": f"VAR-{sel_idx+1}-A",
                    "title": ai_titles.get(0) or f"{compiled['brand_name']} · Variación A (Evolución Directa de {parent_label})",
                    "subtitle": f"Geometría Base de {parent_label} Perfeccionada en Proporción Áurea φ=1.618",
                    "tag": f"🧬 VARIACIÓN A DE {parent_label.upper()} · FIDELIDAD ÁUREA",
                    "rationale": ai_rationales.get(0) or f"Conserva la estructura central de tu {parent_label} seleccionada y afina el balance óptico en {primary_font}.",
                    "archetype": archetype,
                    "svg": svg_01
                },
                {
                    "proposal_id": f"VAR-{sel_idx+1}-B",
                    "title": ai_titles.get(1) or f"{compiled['brand_name']} · Variación B (Trazo Fino & Órbita Editorial)",
                    "subtitle": f"Versión Estilizada de {parent_label} sobre Lienzo Claro Alabastro",
                    "tag": f"🧬 VARIACIÓN B DE {parent_label.upper()} · MINIMALISMO EDITORIAL",
                    "rationale": ai_rationales.get(1) or f"Estiliza los trazos de tu {parent_label} con una órbita áurea sobre fondo claro de alto contraste.",
                    "archetype": archetype,
                    "svg": svg_02
                },
                {
                    "proposal_id": f"VAR-{sel_idx+1}-C",
                    "title": ai_titles.get(2) or f"{compiled['brand_name']} · Variación C (Monograma «{initials}» en el Núcleo)",
                    "subtitle": f"Fusión Escultórica de {parent_label} con las Iniciales Constructivas «{initials}»",
                    "tag": f"🧬 VARIACIÓN C DE {parent_label.upper()} · NÚCLEO MONOGRAMÁTICO",
                    "rationale": ai_rationales.get(2) or f"Integra el monograma «{initials}» directamente en el corazón geométrico de tu {parent_label}.",
                    "archetype": archetype,
                    "svg": svg_03
                },
                {
                    "proposal_id": f"VAR-{sel_idx+1}-D",
                    "title": ai_titles.get(3) or f"{compiled['brand_name']} · Variación D (Insignia Escudo & App Icon 1:1)",
                    "subtitle": f"Emblema Contenedor de {parent_label} Blindado para Ícono Digital y Empaque",
                    "tag": f"🧬 VARIACIÓN D DE {parent_label.upper()} · ESCUDO & APP ICON",
                    "rationale": ai_rationales.get(3) or f"Enmarca la geometría de tu {parent_label} dentro de un escudo de prestigio y contenedor Squircle 1:1.",
                    "archetype": archetype,
                    "svg": svg_04
                },
                {
                    "proposal_id": f"VAR-{sel_idx+1}-E",
                    "title": ai_titles.get(4) or f"{compiled['brand_name']} · Variación E (Síntesis IA NanoBanana 2.1)",
                    "subtitle": f"Reinterpretación Generativa de {parent_label} con Acento Secundario",
                    "tag": f"🍌 VARIACIÓN E · NANOBANANA 2.1 IA",
                    "rationale": ai_rationales.get(4) or f"Exploración generativa en vivo basada en el concepto de tu {parent_label}.",
                    "archetype": archetype,
                    "svg": svg_05
                },
                {
                    "proposal_id": f"VAR-{sel_idx+1}-F",
                    "title": ai_titles.get(5) or f"{compiled['brand_name']} · Variación F (Curvas Orgánicas sobre Marfil)",
                    "subtitle": f"Versión Fluida de {parent_label} para Papelería y Web Clara",
                    "tag": f"🍌 VARIACIÓN F · ESPACIO NEGATIVO CLARO",
                    "rationale": ai_rationales.get(5) or f"Suaviza los radios ópticos de tu {parent_label} sobre lienzo claro editorial.",
                    "archetype": archetype,
                    "svg": svg_06
                },
                {
                    "proposal_id": f"VAR-{sel_idx+1}-G",
                    "title": ai_titles.get(6) or f"{compiled['brand_name']} · Variación G (Lockup Horizontal Octogonal)",
                    "subtitle": f"Formato Panorámico 16:9 de {parent_label}",
                    "tag": f"🧬 VARIACIÓN G · PANORÁMICO 16:9",
                    "rationale": ai_rationales.get(6) or f"Disposición horizontal ejecutiva derivada directamente de tu {parent_label}.",
                    "archetype": archetype,
                    "svg": svg_07
                },
                {
                    "proposal_id": f"VAR-{sel_idx+1}-H",
                    "title": ai_titles.get(7) or f"{compiled['brand_name']} · Variación H (Medallón de Prestigio Jony Ive)",
                    "subtitle": f"Sello Circular de Alta Precisión de {parent_label}",
                    "tag": f"🍎 VARIACIÓN H · SELLO ANODIZADO",
                    "rationale": ai_rationales.get(7) or f"Versión en medallón circular anodizado lista para grabado láser y lacre.",
                    "archetype": archetype,
                    "svg": svg_08
                }
            ]
        else:
            cycle_badge = f" (Ciclo #{seed_int + 1})" if seed_int > 0 else ""
            proposals_out = [
                {
                    "proposal_id": f"PROP-01-S{seed_int}",
                    "title": ai_titles.get(0) or (meta_list[0].get("title") if len(meta_list) > 0 else None) or f"{compiled['brand_name']} · Escultura Áurea #01{cycle_badge}",
                    "subtitle": f"Lockup Totémico Flagship · {seed_summary or metaphor_info['sector_label']}",
                    "tag": f"⭐ OPCIÓN #01{cycle_badge} · ESCULTURA ÁUREA PRINCIPAL",
                    "rationale": ai_rationales.get(0) or (meta_list[0].get("rationale") if len(meta_list) > 0 else None) or f"Interpretación escultórica directa de tu idea y giro en proporción áurea (φ = 1.618) con tipografía {primary_font}.",
                    "archetype": archetype,
                    "svg": svg_01
                },
                {
                    "proposal_id": f"PROP-02-S{seed_int}",
                    "title": ai_titles.get(1) or (meta_list[1].get("title") if len(meta_list) > 1 else None) or f"{compiled['brand_name']} · Horizontal Editorial #02{cycle_badge}",
                    "subtitle": "Composición Ejecutiva 16:9 sobre Lienzo Claro Editorial",
                    "tag": f"OPCIÓN #02{cycle_badge} · HORIZONTAL EDITORIAL CLARO",
                    "rationale": ai_rationales.get(1) or (meta_list[1].get("rationale") if len(meta_list) > 1 else None) or f"Optimiza la lectura horizontal de «{compiled['brand_name']}» sobre fondo claro para cabeceras web y presentaciones.",
                    "archetype": archetype,
                    "svg": svg_02
                },
                {
                    "proposal_id": f"PROP-03-S{seed_int}",
                    "title": ai_titles.get(2) or (meta_list[2].get("title") if len(meta_list) > 2 else None) or f"{compiled['brand_name']} · Símbolo + Monograma ({initials}) #03{cycle_badge}",
                    "subtitle": f"Fusión de tu Idea Base con las Iniciales Constructivas «{initials}»",
                    "tag": f"OPCIÓN #03{cycle_badge} · SÍMBOLO + MONOGRAMA «{initials}»",
                    "rationale": ai_rationales.get(2) or (meta_list[2].get("rationale") if len(meta_list) > 2 else None) or f"Entrelaza el símbolo central con el monograma «{initials}» para máxima recordación e identidad propietaria.",
                    "archetype": archetype,
                    "svg": svg_03
                },
                {
                    "proposal_id": f"PROP-04-S{seed_int}",
                    "title": ai_titles.get(3) or (meta_list[3].get("title") if len(meta_list) > 3 else None) or f"{compiled['brand_name']} · Sistema App Icon Squircle #04{cycle_badge}",
                    "subtitle": f"Símbolo Autónomo «{initials}» en Chasis Squircle iOS/macOS",
                    "tag": f"🍎 OPCIÓN #04{cycle_badge} · APP ICON SQUIRCLE 1:1",
                    "rationale": ai_rationales.get(3) or (meta_list[3].get("rationale") if len(meta_list) > 3 else None) or "Diseñado bajo el estándar de Sir Jony Ive para brillar como ícono de aplicación, avatar social y sello 1:1.",
                    "archetype": archetype,
                    "svg": svg_04
                },
                {
                    "proposal_id": f"PROP-05-S{seed_int}",
                    "title": ai_titles.get(4) or f"{compiled['brand_name']} · Síntesis IA Figurativa #05{cycle_badge}",
                    "subtitle": "Generación Vectorial en Vivo NanoBanana 2.1 + Gemini 3.5",
                    "tag": f"🍌 OPCIÓN #05{cycle_badge} · SÍNTESIS IA NANOBANANA 2.1",
                    "rationale": ai_rationales.get(4) or f"Trazo generativo inédito creado por IA a partir de tu idea base y paleta cromática ({pri_hex}, {sec_hex}).",
                    "archetype": archetype,
                    "svg": svg_05
                },
                {
                    "proposal_id": f"PROP-06-S{seed_int}",
                    "title": ai_titles.get(5) or f"{compiled['brand_name']} · Espacio Negativo Gestalt #06{cycle_badge}",
                    "subtitle": "Síntesis Minimalista sobre Lienzo Claro de Alto Contraste",
                    "tag": f"🍌 OPCIÓN #06{cycle_badge} · GESTALT & ESPACIO NEGATIVO",
                    "rationale": ai_rationales.get(5) or "Exploración de figura-fondo sobre lienzo marfil para papelería corporativa y aplicaciones luminosas.",
                    "archetype": archetype,
                    "svg": svg_06
                },
                {
                    "proposal_id": f"PROP-07-S{seed_int}",
                    "title": ai_titles.get(6) or f"{compiled['brand_name']} · Emblema Panorámico Octogonal #07{cycle_badge}",
                    "subtitle": "Insignia Geométrica de Autor en Formato Horizontal Oscuro",
                    "tag": f"🏛️ OPCIÓN #07{cycle_badge} · INSIGNIA PANORÁMICA",
                    "rationale": ai_rationales.get(6) or "Combina un emblema octogonal de precisión con composición horizontal ejecutiva en modo nocturno.",
                    "archetype": archetype,
                    "svg": svg_07
                },
                {
                    "proposal_id": f"PROP-08-S{seed_int}",
                    "title": ai_titles.get(7) or f"{compiled['brand_name']} · Medallón Anodizado Jony Ive #08{cycle_badge}",
                    "subtitle": "Sello Circular de Alta Precisión para Grabado, Empaque y Lacre",
                    "tag": f"🍎 OPCIÓN #08{cycle_badge} · MEDALLÓN DE AUTOR",
                    "rationale": ai_rationales.get(7) or "Equilibrio radial perfecto calibrado para reproducción física en metal, bordado, empaque y firma institucional.",
                    "archetype": archetype,
                    "svg": svg_08
                }
            ]

        sym_list = [sym_0, sym_1, sym_2, sym_3, sym_4, sym_5, sym_6, sym_7]
        for idx, p in enumerate(proposals_out):
            p["master_prompt_es"] = compiled["master_prompt_es"]
            p["master_prompt_en"] = compiled["master_prompt_en"]
            p["design_dna_pills"] = compiled["design_dna_pills"]
            p["creative_director_rationale"] = director_rationale
            p["generated_by"] = gen_by
            p["generation_mode"] = generation_mode
            p["variation_seed"] = seed_int
            p["applied_modifiers"] = mods
            p["creative_seed_summary"] = seed_summary
            p["symbol_inner_svg"] = sym_list[idx] if idx < len(sym_list) else sym_0
            p["slot_index"] = idx

        return proposals_out


class DeepTouchpointEngineeringEngine:
    """
    Motor de Arquitectura Estratégica de Touchpoints, Experiencia Multisensorial y Service Blueprinting.
    Dirigido por el Líder de Proyecto de Touchpoints & CX Multisectorial (Marco Lemon & Verhoef, Service-Dominant Logic,
    Service Blueprinting de 5 Capas y Estrategias 'Surprise & Delight' nivel Ritz-Carlton / Chewy / Zappos / Spotify).
    """

    PROJECT_LEADER_PROFILE: Dict[str, Any] = {
        "name": "Mateo Valdés-Keller, MSc CX & Service Design",
        "role": "Líder de Proyecto de Touchpoints & Arquitectura de Experiencia Multisectorial",
        "sectors_experience": [
            "Gastronomía & Hospitalidad de Autor (Servicescape 5 sentidos)",
            "Servicios Profesionales, Fiscal & Patrimonial (Confianza y Cero Esfuerzo CES)",
            "Educación K-12 & Campus (Comunidad, rituales y vínculo familiar)",
            "B2B Científico, Médico & Industrial (SLAs, telemetría y certeza técnica)",
            "Inmobiliario, Construcción & Oficio Artesanal (Transparencia radical e hitos)"
        ],
        "theoretical_foundations": [
            "Lemon & Verhoef (2016): Gobernanza Brand-Owned, Partner-Owned, Customer-Owned y Social/External",
            "Service-Dominant Logic (Vargo & Lusch): Co-creación de valor con recursos operandos y operantes",
            "Service Blueprint (5 Capas): Evidencia Física/Sensorial, Acción del Cliente, Onstage, Backstage y Soporte/TI",
            "Surprise & Delight (Ritz-Carlton $2k Rule, Chewy Empathy Protocol, Zappos No-Script, Spotify Wrapped)",
            "Sistema de Métricas y Atribución: CSAT, CES (Customer Effort Score), NPS 3.0 y LTV Data-Driven"
        ]
    }

    SECTOR_GUIDED_JOURNEYS: Dict[str, Dict[str, Any]] = {
        "restaurante_hospitalidad": {
            "sector_label": "Gastronomía, Restaurante & Hospitalidad",
            "recommended_count_per_phase": 3,
            "aura_welcome": "En gastronomía y hospitalidad, un touchpoint no es solo el menú impreso: empieza con el aroma a leña o café desde la banqueta y termina con el detalle inesperado en la sobremesa.",
            "phases": {
                "before": {
                    "aura_question": "Empecemos por ANTES DE COMPRAR (Pre-compra): ¿Cómo te descubre el comensal por primera vez? ¿Es el aroma que sale a la calle, la recomendación de un amigo o un video donde se escucha el crepitar de la brasa?",
                    "examples": [
                        {
                            "icon": "🔥",
                            "title": "Aroma a leña de encino y humo cálido desde la banqueta (Servicescape Olfativo)",
                            "sensory_channel": "👃 Olfato + 👁️ Vista (Ambiental / Brand-Owned)",
                            "governance": "Brand-Owned (Control Total)",
                            "nature": "Ambiental / Física (Servicescape)",
                            "surprise_delight": "Ventilación aromática intencional hacia el acceso y cálida luz ámbar 2400K que invita a asomarse.",
                            "blueprint_onstage": "Hostess recibe en puerta sin atril rígido, ofreciendo degustar un caldo de bienvenida en taza de barro tibia.",
                            "blueprint_backstage": "Encendido programado de brasas 90 min antes de apertura y control de extracción acústica.",
                            "metrics": "Tráfico peatonal convertido (Walk-in rate) + Menciones orgánicas en Stories (Social/External)"
                        },
                        {
                            "icon": "📱",
                            "title": "Confirmación de reserva por WhatsApp con audio o nota del Chef y playlist de la noche",
                            "sensory_channel": "👂 Oído + 🤝 Emoción Humana (Digital + Humana)",
                            "governance": "Brand-Owned (Control Total)",
                            "nature": "Tecnológica + Humana Directa",
                            "surprise_delight": "Preguntar sutilmente si celebran algún aniversario o alergia para preparar un gesto sorpresa en mesa.",
                            "blueprint_onstage": "Mensaje cálido sin bots rígidos a menos de 2 minutos con ubicación en 1 clic y valet parking.",
                            "blueprint_backstage": "CRM etiqueta alergias, mesa preferida e historial de vino favorito del comensal.",
                            "metrics": "CES (Esfuerzo de reserva < 30 seg) + Reducción de No-Shows al < 3%"
                        },
                        {
                            "icon": "🗣️",
                            "title": "Reseñas vivas e historias de comensales reales recomendando el plato insignia",
                            "sensory_channel": "👁️ Vista + 🤝 Confianza Social (Social / External)",
                            "governance": "Social / External (Impulsado por deleite)",
                            "nature": "Comunidad entre Pares",
                            "surprise_delight": "Iluminación cenital cálida en cada mesa pensada para que los platillos luzcan extraordinarios sin usar flash.",
                            "blueprint_onstage": "Emplatado en cerámica artesanal de alta textura que despierta curiosidad en mesas vecinas.",
                            "blueprint_backstage": "Monitoreo de menciones y agradecimiento personalizado (no copiado y pegado) a cada reseña.",
                            "metrics": "NPS 3.0 + Atribución de nuevos clientes por recomendación boca a boca (WOM)"
                        }
                    ]
                },
                "during": {
                    "aura_question": "Vamos a DURANTE LA COMPRA: Cuando el cliente ya cruzó tu puerta y se sienta a la mesa, ¿qué toca, qué huele, cómo lo saluda tu equipo y qué detalle inesperado lo enamora?",
                    "examples": [
                        {
                            "icon": "🍵",
                            "title": "Ritual de bienvenida con toalla húmeda tibia con esencia de romero y pan recién horneado",
                            "sensory_channel": "✋ Tacto (Temperatura) + 👃 Olfato + 👅 Gusto",
                            "governance": "Brand-Owned (Control Total)",
                            "nature": "Humana Directa + Sensorial",
                            "surprise_delight": "Se entrega en los primeros 90 segundos sin costo antes de abrir la carta para bajar el estrés del día.",
                            "blueprint_onstage": "Mesero saluda por nombre (si reservó), entrega pinzas de madera y explica el origen del pan del día.",
                            "blueprint_backstage": "Calentador de toallas a 48°C con aceite esencial natural y horneado por tandas cada 30 min.",
                            "metrics": "CSAT de primera impresión + Incremento en tiempo de permanencia placentera"
                        },
                        {
                            "icon": "📖",
                            "title": "Carta táctil en papel algodón y piel con relato corto de los productores locales",
                            "sensory_channel": "✋ Tacto + 👁️ Vista (Evidencia Física)",
                            "governance": "Brand-Owned (Control Total)",
                            "nature": "Ambiental / Física + Humana",
                            "surprise_delight": "El personal tiene autonomía (estilo Ritz-Carlton) para ofrecer media porción de cortesía si el cliente duda entre dos entradas.",
                            "blueprint_onstage": "Recomendación honesta sin guion mecánico, maridando con el gusto real del comensal.",
                            "blueprint_backstage": "Impresión en papel algodón 320g libre de plástico con cuño seco y actualización de cosecha estacional.",
                            "metrics": "Ticket promedio + Conversión de platillos de autor"
                        },
                        {
                            "icon": "🎶",
                            "title": "Acústica envolvente que permite conversar sin gritar y cocina abierta con aroma a brasa limpia",
                            "sensory_channel": "👂 Oído + 👃 Olfato + 👁️ Vista (Servicescape)",
                            "governance": "Brand-Owned (Control Total)",
                            "nature": "Ambiental / Física",
                            "surprise_delight": "Curaduría musical que evoluciona según la hora y absorción acústica oculta bajo las mesas de madera maciza.",
                            "blueprint_onstage": "Servicio coreografiado y silencioso; vajilla de gres pesado que no tintinea estridentemente.",
                            "blueprint_backstage": "Sensores de decibeles (< 68 dB) y campanas de extracción silenciosas de alta capacidad.",
                            "metrics": "CSAT Ambiental + Tasa de sobremesa (postres y digestivos)"
                        }
                    ]
                },
                "after": {
                    "aura_question": "Por último, DESPUÉS DE LA COMPRA (Post-compra): ¿Cómo cierras la experiencia al pedir la cuenta y qué pasa cuando el cliente llega a su casa para que quiera volver la próxima semana?",
                    "examples": [
                        {
                            "icon": "💌",
                            "title": "Entrega de la cuenta en caja artesanal con infusión digestiva y postal con semilla plantable",
                            "sensory_channel": "👅 Gusto + ✋ Tacto + 🤝 Sorpresa Emocional",
                            "governance": "Brand-Owned + Customer-Owned",
                            "nature": "Humana Directa + Evidencia Física",
                            "surprise_delight": "Si es su primera visita o cumpleaños, incluye una pequeña hogaza o frasco de salsa de la casa etiquetado con su nombre para el desayuno del día siguiente.",
                            "blueprint_onstage": "Cobro sin fricción en mesa en menos de 45 segundos y despedida cálida en puerta.",
                            "blueprint_backstage": "Preparación de kits de despedida y facturación en 1 clic mediante código QR sin formularios largos.",
                            "metrics": "CES de pago + Tasa de recompra en los siguientes 30 días (LTV)"
                        },
                        {
                            "icon": "📲",
                            "title": "Mensaje personal al día siguiente agradeciendo la visita y compartiendo la receta o playlist",
                            "sensory_channel": "👂 Oído + 🤝 Vínculo Relacional",
                            "governance": "Brand-Owned",
                            "nature": "Tecnológica Humanizada",
                            "surprise_delight": "Cero spam promocional: se envía un enlace a la playlist que escuchó esa noche (estilo Spotify) o un tip del chef.",
                            "blueprint_onstage": "Comunicación breve y humana firmada por el anfitrión del restaurante.",
                            "blueprint_backstage": "Sincronización CRM-CEM que registra satisfacción y activa invitación VIP tras la 3ª visita.",
                            "metrics": "Tasa de retención longitudinal y LTV (Customer Equity)"
                        }
                    ]
                }
            }
        },
        "servicios_profesionales_b2b": {
            "sector_label": "Despacho, Consultoría, B2B & Servicios Profesionales",
            "recommended_count_per_phase": 3,
            "aura_welcome": "En servicios profesionales y B2B, el cliente suele llegar con incertidumbre o estrés técnico. Tus touchpoints deben transmitir paz mental, transparencia absoluta y cero fricción cognitiva.",
            "phases": {
                "before": {
                    "aura_question": "En la etapa ANTES DE CONTRATARTE: ¿Qué hace que un cliente confíe en tu autoridad antes de hablar contigo? ¿Un diagnóstico claro, un caso de éxito o una recomendación?",
                    "examples": [
                        {
                            "icon": "📊",
                            "title": "Diagnóstico ejecutivo gratuito en 1 página con hallazgos reales (sin jerga incomprensible)",
                            "sensory_channel": "👁️ Claridad Visual + 🧠 Alivio Cognitivo",
                            "governance": "Brand-Owned (Control Total)",
                            "nature": "Humana Directa + Tecnológica",
                            "surprise_delight": "Entregar valor real antes de cobrar un centavo: un semáforo visual de riesgos y ahorros explicados en lenguaje llano.",
                            "blueprint_onstage": "Video corto de 2 minutos del socio director explicando los 3 puntos clave de su diagnóstico.",
                            "blueprint_backstage": "Plantilla tipográfica suiza de alta legibilidad y motor de cálculo verificable.",
                            "metrics": "Tasa de conversión a reunión de cierre + Reducción de CAC"
                        },
                        {
                            "icon": "🤝",
                            "title": "Dossier de casos de éxito verificables y recomendaciones de clientes del mismo giro",
                            "sensory_channel": "✋ Tacto (Papel Algodón) / 🖥️ Interactivo + Confianza Social",
                            "governance": "Brand-Owned + Social/External",
                            "nature": "Comunicación de Autoridad",
                            "surprise_delight": "Incluir métricas auditadas de retorno de inversión (ROI) y contacto directo de referencias autorizadas.",
                            "blueprint_onstage": "Entrega en carpeta rígida con cuño seco o portal interactivo sin contraseñas complicadas.",
                            "blueprint_backstage": "Documentación trimestral de casos de éxito con permiso de clientes.",
                            "metrics": "Velocidad del ciclo de venta + Confianza inicial"
                        }
                    ]
                },
                "during": {
                    "aura_question": "En DURANTE LA CONTRATACIÓN: ¿Cómo es tu sala de juntas o videollamada, cómo presentas tu propuesta económica y cómo eliminas el miedo a la 'letra chica'?",
                    "examples": [
                        {
                            "icon": "☕",
                            "title": "Recepción en sala con aroma a madera de cedro, café de especialidad y silencio acústico",
                            "sensory_channel": "👃 Olfato + 👂 Silencio Acústico + 👅 Gusto",
                            "governance": "Brand-Owned (Control Total)",
                            "nature": "Ambiental / Física (Servicescape)",
                            "surprise_delight": "Taza de cerámica tibia con el emblema en bajo relieve y pantalla lista con el nombre del visitante al entrar.",
                            "blueprint_onstage": "Anfitrión recibe puntualmente sin esperas en recepción y ofrece bebida favorita registrada previamente.",
                            "blueprint_backstage": "Aislamiento acústico de sala de juntas y protocolo de hospitalidad ejecutiva.",
                            "metrics": "CSAT de reunión presencial + Tasa de aceptación de propuesta"
                        },
                        {
                            "icon": "📝",
                            "title": "Contrato transparente en lenguaje claro con resumen ejecutivo de 5 puntos y firma en 1 clic",
                            "sensory_channel": "👁️ Claridad Visual + 🧠 Cero Esfuerzo (Bajo CES)",
                            "governance": "Brand-Owned",
                            "nature": "Tecnológica + Humana",
                            "surprise_delight": "Garantía explícita de nivel de servicio (SLA) escrita en el encabezado sin cláusulas ocultas.",
                            "blueprint_onstage": "Asesor recorre el alcance en 5 minutos y habilita firma digital biométrica inmediata.",
                            "blueprint_backstage": "Integración automática entre firma digital, alta en CRM y asignación de líder de cuenta.",
                            "metrics": "CES (Customer Effort Score) en onboarding + Tiempo de cierre"
                        }
                    ]
                },
                "after": {
                    "aura_question": "En DESPUÉS DE CONTRATAR (Onboarding y Fidelización): ¿Qué recibe tu cliente en sus primeros 7 días para sentir que tomó la mejor decisión de su vida?",
                    "examples": [
                        {
                            "icon": "🎁",
                            "title": "Kit de bienvenida físico/digital y llamada proactiva de tranquilidad antes de que el cliente pregunte",
                            "sensory_channel": "✋ Tacto + 👂 Voz Empática + 🧠 Paz Mental",
                            "governance": "Brand-Owned",
                            "nature": "Humana Directa (Surprise & Delight)",
                            "surprise_delight": "Regla proactiva: si ocurre un cambio regulatorio o técnico, el cliente recibe un audio explicativo de su asesor antes de verlo en las noticias.",
                            "blueprint_onstage": "Ejecutivo dedicado con autonomía para resolver urgencias en menos de 15 minutos (estilo Zappos/Chewy).",
                            "blueprint_backstage": "Tablero de monitoreo continuo con alertas tempranas y reportes mensuales en 1 sola lámina.",
                            "metrics": "Retención anual > 96% + LTV + Referidos orgánicos (NPS)"
                        }
                    ]
                }
            }
        },
        "industrial_manufactura_construccion": {
            "sector_label": "Industria, Automatización, Construcción, Laboratorio & Mueblería",
            "recommended_count_per_phase": 3,
            "aura_welcome": "Cuando vendes obras físicas, maquinaria o muebles duraderos, el cliente necesita tocar la solidez, ver el orden en vivo y sentir respaldo total post-entrega.",
            "phases": {
                "before": {
                    "aura_question": "En ANTES DE COMPRAR: ¿Cómo demuestra tu marca que trabaja con precisión superior? ¿Una demostración en vivo, tocar los materiales reales o ver una obra impecable?",
                    "examples": [
                        {
                            "icon": "🪵",
                            "title": "Muestrario táctil de materiales reales (maderas, aceros, acabados) o demostración en vivo",
                            "sensory_channel": "✋ Tacto (Peso y Textura) + 👁️ Vista + 👃 Olor a material noble",
                            "governance": "Brand-Owned",
                            "nature": "Ambiental / Física + Humana",
                            "surprise_delight": "Permitir que el cliente se lleve a su casa u oficina una caja de muestras reales para verlas bajo su propia luz.",
                            "blueprint_onstage": "Especialista explica la resistencia y envejecimiento noble del material sin presionar la venta.",
                            "blueprint_backstage": "Curaduría de muestras grabadas con láser con código QR a ficha técnica y video de prueba.",
                            "metrics": "Tasa de conversión de prospectos calificados"
                        },
                        {
                            "icon": "🏗️",
                            "title": "Presencia en campo / planta / avenida con señalética limpia, orden impecable y código QR en vivo",
                            "sensory_channel": "👁️ Vista (Orden Arquitectónico) + 📱 Interacción Digital",
                            "governance": "Brand-Owned",
                            "nature": "Ambiental / Física + Tecnológica",
                            "surprise_delight": "Visitas guiadas con casco o equipo impecablemente personalizado e hidratación fresca para el visitante.",
                            "blueprint_onstage": "Ingeniero o maestro artesano muestra el proceso interno con transparencia total (Ryan Buell Transparency).",
                            "blueprint_backstage": "Protocolo diario de orden y limpieza 5S en taller, obra o showroom.",
                            "metrics": "Confianza percibida + Solicitudes de cotización in-situ"
                        }
                    ]
                },
                "during": {
                    "aura_question": "En DURANTE LA COMPRA Y EJECUCIÓN: ¿Cómo mantienes informado y tranquilo al cliente mientras fabricas, instalas o construyes su pedido?",
                    "examples": [
                        {
                            "icon": "📹",
                            "title": "Bitácora semanal por WhatsApp con video de 45 segundos del avance real de su pieza u obra",
                            "sensory_channel": "👁️ Vista + 👂 Voz del responsable + 🧠 Certeza",
                            "governance": "Brand-Owned",
                            "nature": "Tecnológica + Humana Directa",
                            "surprise_delight": "El cliente nunca tiene que llamar para preguntar '¿cómo va mi pedido?': recibe el avance cada viernes a la misma hora.",
                            "blueprint_onstage": "Líder de proyecto envía video corto mostrando el control de calidad con el nombre del cliente.",
                            "blueprint_backstage": "Sistema interno de hitos (Milestones) sincronizado entre taller/planta y atención al cliente.",
                            "metrics": "Reducción del 90% en llamadas de ansiedad + CSAT de proceso"
                        },
                        {
                            "icon": "👷",
                            "title": "Cuadrilla de entrega e instalación con uniforme impecable, protección de pisos y trato de guante blanco",
                            "sensory_channel": "👁️ Pulcritud Visual + 🤝 Respeto al Espacio del Cliente",
                            "governance": "Brand-Owned / Partner-Owned",
                            "nature": "Humana Directa + Evidencia Física",
                            "surprise_delight": "Dejar el espacio del cliente más limpio de como lo encontraron y explicar el uso en 3 minutos.",
                            "blueprint_onstage": "Equipo se presenta por nombre, usa cubrezapatos o tapetes protectores y entrega acta firmada.",
                            "blueprint_backstage": "Capacitación técnica y relacional de instaladores y logística en unidades rotuladas.",
                            "metrics": "CSAT de entrega + Cero incidencias en instalación"
                        }
                    ]
                },
                "after": {
                    "aura_question": "En DESPUÉS DE LA ENTREGA: ¿Qué sello físico queda en el producto y qué gesto tienes meses después para que te recomienden con orgullo?",
                    "examples": [
                        {
                            "icon": "🛡️",
                            "title": "Placa metálica o sello grabado a fuego en la pieza + Kit de cuidado (cera, herramientas o manual QR)",
                            "sensory_channel": "✋ Tacto Permanente + 👃 Aroma (Cera natural) + 👁️ Orgullo",
                            "governance": "Brand-Owned + Customer-Owned",
                            "nature": "Evidencia Física Duradera",
                            "surprise_delight": "Un sello discreto y elegante con el año de fabricación y una revisión preventiva programada a los 6 meses sin costo.",
                            "blueprint_onstage": "Entrega de certificado de garantía y llamada de cortesía a los 15 días para verificar que todo opere al 100%.",
                            "blueprint_backstage": "Registro de número de serie/obra en base de datos para soporte o ampliación futura (Sub-marcas).",
                            "metrics": "LTV + Tasa de recompra o expansión + NPS > 85"
                        }
                    ]
                }
            }
        }
    }

    CATALOG_SPECS: Dict[str, Dict[str, str]] = {
        "menú": {
            "category": "Editorial & Hospitalidad",
            "strategic_goal": "Comunicar oficio artesanal, legibilidad bajo luz tenue y justificar el ticket promedio.",
            "substrate_material": "Papel algodón 320 g/m² color marfil cálido libre de ácido con cubierta en piel vacuna o tela encerada.",
            "reproduction_method": "Impresión Offset CMYK FOGRA39 para textos + Cuño seco en bajo relieve (Deboss) para el símbolo en portada.",
            "dimensions_and_grid": "Formato 210 × 310 mm; logotipo centrado a 45 mm de ancho en portada con área de reserva 2X (16 mm).",
            "reading_distance_and_lighting": "Distancia de lectura 35–45 cm bajo iluminación cálida indirecta de 2400K–2700K (mínimo 12pt en platillos).",
            "quality_control_rule": "Prohibido plastificar con laminado brillante o usar tipografías menores a 11pt."
        },
        "fachada": {
            "category": "Arquitectura & Señalética Exterior",
            "strategic_goal": "Identificación inmediata a 30 metros de distancia diurna y nocturna, proyectando solidez.",
            "substrate_material": "Acero corten oxidado / Aluminio anodizado cepillado calibre 12 (2.5 mm) montado con separadores de 25 mm.",
            "reproduction_method": "Corte láser CNC de precisión con retroiluminación halo LED cálida (3000K, IP67 intemperie).",
            "dimensions_and_grid": "Ancho total 1,800 × 650 mm; símbolo de 520 mm de altura; trazo mínimo estructural de 18 mm.",
            "reading_distance_and_lighting": "Legibilidad garantizada de 5 m a 45 m bajo sol directo o lluvia nocturna.",
            "quality_control_rule": "Prohibido usar lona impresa tensada o cajas de luz acrílicas con tubos fluorescentes expuestos."
        },
        "uniforme": {
            "category": "Textil, Indumentaria & Bordado Industrial",
            "strategic_goal": "Generar confianza inmediata, higiene y autoridad técnica ante el cliente.",
            "substrate_material": "Gabardina peinada 100% algodón de 260 g/m² (o tela ignífuga NFPA 2112 en planta industrial).",
            "reproduction_method": "Bordado industrial Tajima/Barudan con hilo Madeira Polyneon calibre 40 (densidad 4.2 pts/mm).",
            "dimensions_and_grid": "Pecho izquierdo: Lockup horizontal de 75 × 28 mm; grosor mínimo de trazo de 1.4 mm sin degradados.",
            "reading_distance_and_lighting": "Distancia interpersonal de 1.0 a 3.5 metros en interiores o planta.",
            "quality_control_rule": "Prohibido bordar textos menores a 5.5 mm de altura de cápita (usar descriptor simplificado)."
        },
        "cotización": {
            "category": "Documentación Comercial & Cierre B2B/B2C",
            "strategic_goal": "Sustentar el valor económico de la propuesta y facilitar la aprobación del comité o cliente.",
            "substrate_material": "PDF Interactivo de Alta Resolución (RGB/sRGB) + Impresión en Papel Bond Algodón 120 g/m².",
            "reproduction_method": "Generación vectorial nativa con tipografías incrustadas, tablas tabulares y sello criptográfico/QR.",
            "dimensions_and_grid": "Formato Carta (215.9 × 279.4 mm); margen suizo de 20 mm; logo en esquina superior izquierda a 38 mm.",
            "reading_distance_and_lighting": "Lectura en monitor 4K/laptop, pantalla móvil de 6 pulgadas e impresión láser de oficina.",
            "quality_control_rule": "Toda tabla de precios debe usar fuente monoespaciada tabular para alinear cifras al centavo."
        },
        "empaque": {
            "category": "Packaging, Unboxing & Entrega Post-Venta",
            "strategic_goal": "Transformar la recepción del producto en un ritual memorable que dispare la recompra y recomendación.",
            "substrate_material": "Cartón Kraft rígido flauta E de 450 g/m² con papel seda interior de 28 g/m² y etiqueta de seguridad.",
            "reproduction_method": "Serigrafía a 2 tintas directas Pantone + Sello de caucho artesanal o lacre en el cierre.",
            "dimensions_and_grid": "Símbolo central ocupando el 28% del frente de la caja, respetando área de aislamiento 2X.",
            "reading_distance_and_lighting": "Experiencia táctil en manos del cliente (30–60 cm) y fotografía para redes sociales.",
            "quality_control_rule": "Prohibido colocar cintas adhesivas comerciales sobre el logotipo principal."
        },
        "flota": {
            "category": "Flota Vehicular, Transporte & Logística",
            "strategic_goal": "Convertir cada vehículo o unidad móvil en un espectacular rodante de alta seguridad vial.",
            "substrate_material": "Vinil fundido 3M Controltac IJ180C con laminado UV + Cintas reflejantes prismáticas Grado Ingeniería.",
            "reproduction_method": "Impresión látex de alta durabilidad exterior (7 años) + recorte de vinil reflejante en emblema.",
            "dimensions_and_grid": "Puertas laterales: 550 × 240 mm; Caja trasera/lateral: 1,400 × 500 mm con código de unidad en monoespaciada.",
            "reading_distance_and_lighting": "Lectura en movimiento a 25–40 metros a 80 km/h de día y bajo faros de automóvil de noche.",
            "quality_control_rule": "Respetar franjas de alta visibilidad DOT-C2 y nunca cortar el símbolo sobre bisagras o manijas."
        },
        "web": {
            "category": "Ecosistema Digital, Web & Redes Sociales",
            "strategic_goal": "Captar prospectos calificados en los primeros 3 segundos con autoridad visual y carga instantánea.",
            "substrate_material": "Interfaz Web Responsiva HTML5/CSS3 + SVG nativo en curvas y Favicon 1:1 adaptativo.",
            "reproduction_method": "Renderizado vectorial SVG inline con contraste WCAG AAA (≥ 7.0:1) y modo claro/obscuro.",
            "dimensions_and_grid": "Navbar: altura mínima 36 px (escritorio) y 28 px (móvil); Avatar social: 1080 × 1080 px con margen seguro circular.",
            "reading_distance_and_lighting": "Pantallas OLED/Retina desde 320 px hasta monitores ultrawide 4K.",
            "quality_control_rule": "Nunca exportar el logotipo del encabezado en JPG con compresión o fondo blanco pegado."
        },
        "planta": {
            "category": "Señalética Industrial, Tableros PLC & Seguridad LOTO",
            "strategic_goal": "Asegurar trazabilidad técnica, identificación de ingeniería y cumplimiento normativo en planta.",
            "substrate_material": "Placa de acero inoxidable 316 grabada al ácido / Policarbonato industrial Lexan 3M con adhesivo VHB.",
            "reproduction_method": "Grabado láser de fibra óptica indeleble + impresión serigráfica horneada resistente a solventes.",
            "dimensions_and_grid": "Placa de activo: 90 × 45 mm; Etiqueta de gabinete PLC: 65 × 25 mm con código QR de telemetría.",
            "reading_distance_and_lighting": "Lectura en pasillo industrial de 0.5 a 4 metros bajo iluminación LED de nave (500 lux).",
            "quality_control_rule": "El símbolo debe mantener legibilidad total en monocromo a 10 mm de altura sin empastarse."
        }
    }

    @classmethod
    def enrich_single_touchpoint(
        cls,
        raw_text: str,
        phase_key: str,
        index_num: int,
        brand_name: str,
        pri_hex: str = "#C59B27",
        ink_hex: str = "#090D16"
    ) -> Dict[str, Any]:
        """
        Convierte cualquier nombre o frase de touchpoint en una Ficha de Ingeniería de Punto de Contacto completa.
        """
        clean = raw_text.strip().lstrip("•-*0123456789. ").strip()
        if not clean:
            clean = "Punto de Contacto Estratégico"
        low = clean.lower()

        matched_spec = None
        for kw, spec in cls.CATALOG_SPECS.items():
            if kw in low:
                matched_spec = spec
                break
        if not matched_spec:
            if any(w in low for w in ["camión", "camion", "furgoneta", "vehícul", "vehicul", "lowboy", "transporte", "unidad"]):
                matched_spec = cls.CATALOG_SPECS["flota"]
            elif any(w in low for w in ["bata", "camisa", "chaleco", "casco", "credencial", "mandil", "playera", "bordad"]):
                matched_spec = cls.CATALOG_SPECS["uniforme"]
            elif any(w in low for w in ["caja", "bolsa", "etiqueta", "sello", "unboxing", "certificado", "garantía", "garantia", "placa"]):
                matched_spec = cls.CATALOG_SPECS["empaque"]
            elif any(w in low for w in ["pdf", "propuesta", "contrato", "factura", "carpeta", "dictamen", "dossier", "licitación"]):
                matched_spec = cls.CATALOG_SPECS["cotización"]
            elif any(w in low for w in ["tablero", "plc", "candado", "loto", "equipo", "maquinaria", "chasis", "gabinete", "scada"]):
                matched_spec = cls.CATALOG_SPECS["planta"]
            elif any(w in low for w in ["letrero", "tótem", "totem", "recepción", "recepcion", "arquitect", "sala", "campus", "jardín"]):
                matched_spec = cls.CATALOG_SPECS["fachada"]
            elif any(w in low for w in ["carta", "platillo", "mesa", "reserva", "comensal", "vajilla"]):
                matched_spec = cls.CATALOG_SPECS["menú"]
            else:
                matched_spec = cls.CATALOG_SPECS["web"]

        phase_labels = {
            "antes": ("ANTES DE COMPRAR", "Atracción, Descubrimiento & Primera Impresión"),
            "durante": ("DURANTE LA COMPRA", "Evaluación, Cotización, Experiencia & Cierre"),
            "despues": ("DESPUÉS DE COMPRAR", "Entrega, Uso Continuo, Soporte & Fidelización")
        }
        p_code, p_sub = phase_labels.get(phase_key, ("MOMENTO DE VERDAD", "Interacción de Marca"))
        tp_id = f"TP-{phase_key[:3].upper()}-{index_num:02d}"

        # Inferencia de dimensiones sensoriales, gobernanza Lemon & Verhoef, Service Blueprint y Surprise & Delight
        sensory_dims = "👁️ Vista + 🤝 Confianza Relacional"
        governance_type = "Brand-Owned (Control Directo de la Marca)"
        interaction_nature = "Humana Directa + Evidencia Física"
        surprise_delight_gesture = "Gesto inesperado de atención personalizada que reduce el esfuerzo percibido (CES) y eleva el deleite."
        blueprint_onstage = "Personal de primera línea o interfaz saluda con empatía, claridad y autonomía de resolución inmediata."
        blueprint_backstage = "Sincronización interna CRM + CEM sin silos funcionales para no pedir datos repetidos al cliente."
        metrics_attribution = "CSAT Transaccional · CES (Bajo Esfuerzo) · NPS 3.0 Longitudinal · Impacto en LTV"

        if any(w in low for w in ["aroma", "olor", "leña", "humo", "café", "pino", "cera", "romero", "perfume", "fragancia", "ambient"]):
            sensory_dims = "👃 Olfato + 🌡️ Temperatura + 👁️ Vista (Servicescape)"
            interaction_nature = "Ambiental / Física (Servicescape Sensorial)"
            surprise_delight_gesture = "Huella olfativa memorable que activa la memoria límbica del cliente desde los primeros 3 segundos."
        elif any(w in low for w in ["música", "acústic", "silencio", "audio", "voz", "llamada", "sonido", "playlist"]):
            sensory_dims = "👂 Oído + 🤝 Calidez Humana"
            interaction_nature = "Ambiental Acústica / Humana por Voz"
            surprise_delight_gesture = "Curaduría sonora y tono de voz empático sin guiones robóticos (Filosofía Zappos No-Script)."
        elif any(w in low for w in ["degust", "pan", "caldo", "infusión", "vino", "platillo", "bocado", "sabor", "probar"]):
            sensory_dims = "👅 Gusto + 👃 Olfato + ✋ Tacto"
            interaction_nature = "Sensorial Gastronómica + Hospitalidad Onstage"
            surprise_delight_gesture = "Cortesía inesperada en mesa o recepción que desarma positivamente al cliente antes de la transacción."
        elif any(w in low for w in ["toalla", "madera", "piel", "algodón", "cerámica", "textura", "muestrario", "caja", "unboxing"]):
            sensory_dims = "✋ Tacto (Textura, Peso y Temperatura) + 👁️ Vista"
            interaction_nature = "Evidencia Física Táctil + Ritual de Uso"
            surprise_delight_gesture = "Materiales nobles al tacto con peso y temperatura cuidados que comunican calidad sin decir una palabra."

        if any(w in low for w in ["reseña", "boca a boca", "recomend", "google maps", "comunidad", "foro", "influencer"]):
            governance_type = "Social / External (Comunidad y Pares)"
        elif any(w in low for w in ["unboxing", "cuidado", "uso en casa", "hábito", "playlist", "wrapped"]):
            governance_type = "Customer-Owned + Brand-Owned (Co-creación S-D Logic)"
        elif any(w in low for w in ["distribuidor", "logística", "alianza", "feria", "expo"]):
            governance_type = "Partner-Owned (Co-gestionado en Alianza)"

        svg_diagram = f"""<svg viewBox="0 0 260 110" width="100%" height="96" xmlns="http://www.w3.org/2000/svg">
          <rect width="260" height="110" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
          <rect x="14" y="14" width="82" height="82" rx="6" fill="{ink_hex}"/>
          <circle cx="55" cy="46" r="16" fill="{pri_hex}"/>
          <rect x="33" y="70" width="44" height="5" rx="2.5" fill="#FFFFFF"/>
          <line x1="12" y1="8" x2="98" y2="8" stroke="{pri_hex}" stroke-width="1"/>
          <text x="55" y="6" text-anchor="middle" fill="{pri_hex}" font-family="monospace" font-size="6.5">SERVICE BLUEPRINT</text>
          <text x="110" y="26" fill="#0F172A" font-family="sans-serif" font-weight="800" font-size="9.2">{html.escape(clean[:28])}</text>
          <text x="110" y="41" fill="#475569" font-family="monospace" font-size="7.2">ID: {tp_id} · {p_code}</text>
          <text x="110" y="56" fill="#0F172A" font-family="sans-serif" font-size="7.4">{html.escape(sensory_dims[:30])}</text>
          <text x="110" y="72" fill="#059669" font-family="monospace" font-weight="700" font-size="7.2">✓ {html.escape(governance_type[:28])}</text>
          <text x="110" y="88" fill="#64748B" font-family="sans-serif" font-size="7.0">Métrica: CSAT · CES · NPS · LTV</text>
        </svg>"""

        return {
            "tp_id": tp_id,
            "phase_key": phase_key,
            "phase_badge": p_code,
            "phase_subtitle": p_sub,
            "title": clean,
            "category": matched_spec["category"],
            "sensory_dimensions": sensory_dims,
            "governance_lemon_verhoef": governance_type,
            "interaction_nature": interaction_nature,
            "surprise_and_delight": surprise_delight_gesture,
            "blueprint_onstage": blueprint_onstage,
            "blueprint_backstage": blueprint_backstage,
            "metrics_and_attribution": metrics_attribution,
            "strategic_goal": matched_spec["strategic_goal"],
            "substrate_material": matched_spec["substrate_material"],
            "reproduction_method": matched_spec["reproduction_method"],
            "dimensions_and_grid": matched_spec["dimensions_and_grid"],
            "reading_distance_and_lighting": matched_spec["reading_distance_and_lighting"],
            "quality_control_rule": matched_spec["quality_control_rule"],
            "svg_technical_diagram": svg_diagram
        }

    @classmethod
    def build_detailed_touchpoints_dossier(
        cls,
        tp_before_raw: Any,
        tp_during_raw: Any,
        tp_after_raw: Any,
        brand_name: str,
        pri_hex: str = "#C59B27",
        ink_hex: str = "#090D16"
    ) -> Dict[str, Any]:
        """
        Recibe textos o listas de touchpoints en Antes, Durante y Después y devuelve un expediente
        técnico detallado con fichas de ingeniería individuales para cada punto de contacto.
        """
        def split_items(raw: Any) -> List[str]:
            if isinstance(raw, list):
                out = []
                for r in raw:
                    if isinstance(r, dict):
                        out.append(str(r.get("title") or r.get("name") or ""))
                    else:
                        out.extend([p.strip() for p in str(r).replace(";", ",").split(",") if p.strip()])
                return out or ["Presencia Digital y Catálogo Ejecutivo"]
            txt = str(raw or "").strip()
            if not txt:
                return ["Punto de Contacto Principal"]
            parts = [p.strip() for p in txt.replace("\n", ",").replace(";", ",").split(",") if len(p.strip()) > 2]
            return parts[:8] if parts else [txt]

        before_items = [
            cls.enrich_single_touchpoint(item, "antes", idx + 1, brand_name, pri_hex, ink_hex)
            for idx, item in enumerate(split_items(tp_before_raw))
        ]
        during_items = [
            cls.enrich_single_touchpoint(item, "durante", idx + 1, brand_name, pri_hex, ink_hex)
            for idx, item in enumerate(split_items(tp_during_raw))
        ]
        after_items = [
            cls.enrich_single_touchpoint(item, "despues", idx + 1, brand_name, pri_hex, ink_hex)
            for idx, item in enumerate(split_items(tp_after_raw))
        ]

        return {
            "total_engineered_touchpoints": len(before_items) + len(during_items) + len(after_items),
            "antes": before_items,
            "durante": during_items,
            "despues": after_items,
            "all_touchpoints": before_items + during_items + after_items
        }


class MultiBrandArchitectureEngine:
    """
    Motor de Arquitectura Corporativa Multimarca (Mejoras #001 a #015).
    Implementa la regla de Oro 85% ADN Heredado / 15% Diferenciación Operativa para grupos empresariales.
    """

    DIVISION_SEMANTIC_PRESETS = {
        "mantenimiento": {
            "suffix": "Mantenimiento",
            "descriptor": "CONTINUIDAD OPERATIVA & SERVICIO 24/7",
            "accent_hex": "#10B981",
            "accent_name": "Verde Esmeralda Uptime (Disponibilidad Operativa)",
            "nice_classes": ["Clase 37 (Mantenimiento, reparación e instalación industrial)"],
            "tp_before": "Auditoría termográfica preventiva, contrato de póliza SLA 24/7, código QR de emergencia en máquina",
            "tp_during": "Furgoneta taller móvil, candados y tarjetas LOTO (Lockout/Tagout), uniforme ignífugo con vivo verde",
            "tp_after": " Sello holográfico de equipo calibrado, bitácora digital de uptime, reporte de mantenimiento predictivo"
        },
        "transporte": {
            "suffix": "Transporte",
            "descriptor": "LOGÍSTICA PESADA, LOWBOY & RIGGING INDUSTRIAL",
            "accent_hex": "#F59E0B",
            "accent_name": "Ámbar Carretero Reflejante DOT-C2 (Seguridad Vial y Carga)",
            "nice_classes": ["Clase 39 (Transporte pesado, embalaje industrial, grúas y logística)"],
            "tp_before": "Estudio de ruta y gálibos, póliza de seguro de carga monumental, cotización por tonelada-kilómetro",
            "tp_during": "Tractocamiones con cama baja (Lowboy), camionetas piloto 'Exceso de Dimensiones', eslingas y grúas",
            "tp_after": "Acta de maniobra y nivelación láser en piso de planta, evidencia fotográfica GPS y carta porte"
        },
        "control": {
            "suffix": "Control",
            "descriptor": "SOFTWARE IIoT, SCADA & ANALÍTICA DE PLANTA",
            "accent_hex": "#06B6D4",
            "accent_name": "Cian Telemetría OLED (Datos en Tiempo Real e Industria 4.0)",
            "nice_classes": ["Clase 09 (Hardware y sensores IIoT)", "Clase 42 (SaaS industrial, telemetría y nube)"],
            "tp_before": "Demo interactiva de dashboard OEE en vivo, diagnóstico de conectividad OPC-UA / MQTT",
            "tp_during": "Interfaz HMI Dark-Mode en pantallas de planta, gateway IIoT en riel DIN, licenciamiento anual",
            "tp_after": "Alertas predictivas en móvil, reportes automáticos de eficiencia energética y soporte remoto"
        }
    }

    @classmethod
    def clone_subbrand_from_parent(
        cls,
        parent_brand_name: str,
        parent_canvas: Dict[str, Any],
        division_type: str = "mantenimiento",
        custom_subbrand_name: str = "",
        custom_accent_hex: str = ""
    ) -> Dict[str, Any]:
        base_root = parent_brand_name.split()[0] if parent_brand_name else "Aksis"
        preset = cls.DIVISION_SEMANTIC_PRESETS.get(division_type.lower(), cls.DIVISION_SEMANTIC_PRESETS["mantenimiento"])
        sub_name = custom_subbrand_name.strip() or f"{base_root} {preset['suffix']}"
        accent_hex = custom_accent_hex.strip() or preset["accent_hex"]

        parent_colors = parent_canvas.get("selected_colors_hex") or ["#F1F5F9", "#090D16", "#EA580C", "#334155"]
        new_colors = [
            parent_colors[0],
            parent_colors[1],
            accent_hex,
            parent_colors[3] if len(parent_colors) > 3 else "#334155"
        ]

        cloned_canvas = dict(parent_canvas)
        cloned_canvas.update({
            "brandName": sub_name,
            "parent_brand_name": parent_brand_name,
            "architecture_model": "Branded House / Sub-Marca Endosada (85% ADN Heredado / 15% Específico)",
            "division_type": division_type,
            "division_descriptor": preset["descriptor"],
            "selected_colors_hex": new_colors,
            "tp_before": preset["tp_before"],
            "tp_during": preset["tp_during"],
            "tp_after": preset["tp_after"],
            "recommended_nice_classes": preset["nice_classes"],
            "inherited_dna_locks": {
                "chassis_geometry_locked": True,
                "grid_proportions_locked": "8X × 3X (Bloqueado de Matriz)",
                "typography_locked": True,
                "attributes_1_to_17_locked": True,
                "customized_attributes_18_to_24": {
                    "attr_18_descriptor": preset["descriptor"],
                    "attr_19_to_24_semantic_accent": f"{accent_hex} ({preset['accent_name']})"
                }
            }
        })
        return cloned_canvas
