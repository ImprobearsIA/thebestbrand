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
import math
from typing import Dict, Any, List, Optional


class BespokePentagramLogoEngine:
    """
    Motor de Diseño de Identidad Visual de Nivel Estudio Internacional (Pentagram / Chermayeff & Geismar / Wolff Olins).
    Construye símbolos vectoriales complejos mediante curvas Bézier cúbicas, recortes de espacio negativo y
    composiciones tipográficas con tracking óptico real.
    """

    @staticmethod
    def detect_industry_archetype(
        brand_name: str,
        industry_hint: str = "",
        purpose_text: str = ""
    ) -> str:
        combined = f"{brand_name} {industry_hint} {purpose_text}".lower()
        if any(w in combined for w in ["brasa", "raíz", "raiz", "restaurante", "gastronom", "cocina", "fuego", "chef", "cafe", "vino", "asador"]):
            return "restaurante_fuego_raiz"
        if any(w in combined for w in ["vértice", "vertice", "contable", "fiscal", "patrimoni", "finanz", "auditor", "legal", "abogad", "capital"]):
            return "despacho_contable_vertice"
        if any(w in combined for w in ["ágora", "agora", "colegio", "escuela", "educac", "primaria", "secundaria", "preparatoria", "academia", "universidad"]):
            return "colegio_agora_nova"
        if any(w in combined for w in ["quanta", "laboratorio", "científic", "cientific", "espectr", "cromat", "analític", "analitic", "biotec", "iso 17025"]):
            return "b2b_laboratorio_quantalab"
        if any(w in combined for w in ["cumbre", "campamento", "outdoor", "montaña", "montana", "expedic", "bosque", "aventura", "liderazgo"]):
            return "campamentos_cumbre_viva"
        if any(w in combined for w in ["serena", "retiro", "adultos mayores", "geriatr", "residencia", "longevidad", "cuidado", "senior"]):
            return "casa_retiro_villa_serena"
        if any(w in combined for w in ["piedra firme", "constructora", "inmobiliaria", "arquitect", "vivienda", "residencial", "cimentac", "obra"]):
            return "constructora_piedra_firme"
        if any(w in combined for w in ["roble", "muebler", "madera", "carpinter", "ebanist", "hogar", "artesanal"]):
            return "muebleria_el_roble"
        if any(w in combined for w in ["aksis", "automatiz", "robótic", "robotic", "plc", "scada", "industrial", "mantenimiento", "rigging", "transporte pesado", "iiot"]):
            if "mantenimiento" in combined or "uptime" in combined:
                return "aksis_mantenimiento"
            if "transporte" in combined or "rigging" in combined or "logístic" in combined:
                return "aksis_transporte"
            if "control" in combined or "iiot" in combined or "telemetr" in combined:
                return "aksis_control"
            return "aksis_automation"
        if any(w in combined for w in ["salud", "clínica", "clinica", "médic", "medic", "hospital", "dental"]):
            return "salud_clinica"
        return "pentagram_modernist"

    @classmethod
    def render_bespoke_symbol_inner_svg(
        cls,
        archetype: str,
        pri_hex: str,
        sec_hex: str,
        ink_hex: str,
        bg_hex: str = "#FAF8F5",
        variant_index: int = 0,
        uid: str = "s0"
    ) -> str:
        """
        Devuelve el contenido vectorial <g> (en un sistema de coordenadas centrado en 0,0 con radio ~48)
        diseñado con curvas Bézier de estudio profesional, espacio negativo real y cero 'clip-art' de los 90s.
        """
        grad_id = f"studioGrad_{uid}_{variant_index}"
        glow_id = f"studioGlow_{uid}_{variant_index}"

        defs = f"""
        <defs>
          <linearGradient id="{grad_id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="{pri_hex}"/>
            <stop offset="100%" stop-color="{sec_hex}"/>
          </linearGradient>
          <filter id="{glow_id}" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.18"/>
          </filter>
        </defs>
        """

        if archetype == "restaurante_fuego_raiz":
            # Símbolo de autor: Arco de horno de leña + flama ascendente en espacio negativo + raíz orgánica entrelazada
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Marco de Arco Áureo Terracota -->
              <path d="M-36,42 V-6 C-36,-28 -20,-44 0,-44 C20,-44 36,-28 36,-6 V42 H-36 Z" fill="{ink_hex}"/>
              <path d="M-30,36 V-6 C-30,-23 -16,-38 0,-38 C16,-38 30,-23 30,-6 V36 H-30 Z" fill="none" stroke="{sec_hex}" stroke-width="1.2" opacity="0.55"/>
              <!-- Flama Central en Curvas Bézier de Proporción Áurea -->
              <path d="M0,-32 C10,-18 18,-6 14,8 C11,18 2,24 0,24 C-2,24 -11,18 -14,8 C-18,-6 -10,-18 0,-32 Z" fill="url(#{grad_id})"/>
              <!-- Núcleo de Brasa en Espacio Negativo -->
              <path d="M0,-12 C5,-4 7,4 4,11 C2,15 -2,15 -4,11 C-7,4 -5,-4 0,-12 Z" fill="{bg_hex}"/>
              <!-- Raíces Botánicas Entrelazadas en la Base -->
              <path d="M-26,28 C-14,22 -6,24 0,32 C6,24 14,22 26,28" fill="none" stroke="{sec_hex}" stroke-width="2.6" stroke-linecap="round"/>
              <path d="M-18,36 C-8,31 -3,33 0,39 C3,33 8,31 18,36" fill="none" stroke="{pri_hex}" stroke-width="2.2" stroke-linecap="round"/>
            </g>
            """

        if archetype == "despacho_contable_vertice":
            # Símbolo de autor: Prisma Vértice Arquitectónico Isométrico en Oro Viejo y Azul Noche (Estilo Banca Privada Suiza)
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Faceta Izquierda de Autoridad -->
              <path d="M-38,-28 L-14,-28 L0,12 L-12,38 Z" fill="url(#{grad_id})"/>
              <!-- Faceta Derecha de Precisión -->
              <path d="M38,-28 L14,-28 L-12,38 L0,38 Z" fill="{sec_hex}"/>
              <!-- Contrapunto Geométrico de Escala Patrimonial -->
              <path d="M0,-38 L10,-18 L0,2 L-10,-18 Z" fill="{pri_hex}"/>
              <!-- Línea de Horizonte Áureo -->
              <path d="M-34,-34 H34" stroke="{sec_hex}" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>
              <circle cx="0" cy="-18" r="2.8" fill="{bg_hex}"/>
            </g>
            """

        if archetype == "colegio_agora_nova":
            # Símbolo de autor: Pórtico Clásico de Ágora + Libro Abierto + Estrella Polar de 8 Puntas
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Escudo Académico Contemporáneo de Curva Continua -->
              <path d="M-36,-34 H36 V4 C36,26 0,44 0,44 C0,44 -36,26 -36,4 V-34 Z" fill="{ink_hex}"/>
              <path d="M-30,-28 H30 V3 C30,21 0,37 0,37 C0,37 -30,21 -30,3 V-28 Z" fill="none" stroke="{sec_hex}" stroke-width="1.5"/>
              <!-- Estrella Polar de 8 Puntas (Excelencia y Guía) -->
              <path d="M0,-24 L4,-10 L18,-6 L4,-2 L0,12 L-4,-2 L-18,-6 L-4,-10 Z" fill="#F59E0B"/>
              <!-- Libro Abierto / Alas de Ágora en la Base -->
              <path d="M-24,14 C-14,10 -5,13 0,19 C5,13 14,10 24,14 V23 C14,19 5,22 0,28 C-5,22 -14,19 -24,23 Z" fill="{bg_hex}"/>
              <path d="M-20,6 C-11,3 -4,5 0,10 C4,5 11,3 20,6" fill="none" stroke="{sec_hex}" stroke-width="2.2" stroke-linecap="round"/>
            </g>
            """

        if archetype == "b2b_laboratorio_quantalab":
            # Símbolo de autor: Prisma Óptico de Espectrometría + Órbita Cuántica Elíptica + Nodo de Calibración
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Hexágono de Precisión Científica -->
              <polygon points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21" fill="{ink_hex}"/>
              <!-- Órbita Elíptica Cuántica 1 -->
              <ellipse cx="0" cy="0" rx="30" ry="12" transform="rotate(-30)" fill="none" stroke="{pri_hex}" stroke-width="2.6"/>
              <!-- Órbita Elíptica Cuántica 2 -->
              <ellipse cx="0" cy="0" rx="30" ry="12" transform="rotate(30)" fill="none" stroke="{sec_hex}" stroke-width="2.6"/>
              <!-- Prisma Central de Refracción -->
              <polygon points="0,-16 15,11 -15,11" fill="{bg_hex}"/>
              <polygon points="0,-9 8,7 -8,7" fill="{pri_hex}"/>
              <!-- Trazo de Salida Q (Quanta) -->
              <path d="M8,8 L24,24" stroke="{sec_hex}" stroke-width="3.6" stroke-linecap="round"/>
            </g>
            """

        if archetype == "campamentos_cumbre_viva":
            # Símbolo de autor: Doble Cumbre Alpina + Pino en Espacio Negativo + Rosa de los Vientos
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Medallón de Expedición -->
              <circle cx="0" cy="0" r="40" fill="{ink_hex}"/>
              <circle cx="0" cy="0" r="35" fill="none" stroke="{sec_hex}" stroke-width="1.5"/>
              <!-- Sol de Campamento -->
              <circle cx="14" cy="-16" r="8" fill="{sec_hex}"/>
              <!-- Cumbre Mayor y Cumbre Menor -->
              <path d="M-32,22 L-6,-22 L12,6 L20,-6 L34,22 Z" fill="{bg_hex}"/>
              <!-- Sombra de Ladera para Volumen Vectorial -->
              <path d="M-6,-22 L2,22 L-32,22 Z" fill="{pri_hex}"/>
              <!-- Pino Silueteado en Espacio Negativo -->
              <path d="M0,2 L7,12 H3 L9,20 H1 V26 H-1 V20 H-9 L-3,12 H-7 Z" fill="{ink_hex}"/>
              <!-- Sendero Ascendente -->
              <path d="M-18,28 Q0,20 18,28" fill="none" stroke="{sec_hex}" stroke-width="2.5" stroke-linecap="round"/>
            </g>
            """

        if archetype == "casa_retiro_villa_serena":
            # Símbolo de autor: Arco Mediterráneo Sereno + Sol Naciente Cálido + Rama de Olivo Protectora
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Arco de Hospitalidad Senior -->
              <path d="M-34,36 V-4 C-34,-24 -19,-38 0,-38 C19,-38 34,-24 34,-4 V36 H-34 Z" fill="{pri_hex}"/>
              <!-- Sol Naciente en Proporción Áurea -->
              <circle cx="0" cy="-4" r="16" fill="{sec_hex}"/>
              <!-- Ondas de Serenidad y Jardín -->
              <path d="M-34,14 Q-16,4 0,14 T34,14 V36 H-34 Z" fill="{ink_hex}"/>
              <path d="M-34,24 Q-16,14 0,24 T34,24" fill="none" stroke="{bg_hex}" stroke-width="2.4" stroke-linecap="round"/>
              <!-- Hojas de Olivo Ascendentes -->
              <path d="M-12,-6 C-18,-14 -12,-24 -2,-20 C-4,-12 -8,-8 -12,-6 Z" fill="{bg_hex}"/>
              <path d="M12,-6 C18,-14 12,-24 2,-20 C4,-12 8,-8 12,-6 Z" fill="{bg_hex}"/>
            </g>
            """

        if archetype == "constructora_piedra_firme":
            # Símbolo de autor: Piedra Angular Isométrica (Keystone) + Vigas Estructurales en Cantiléver
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Cubo Arquitectónico Monolítico en Perspectiva Isométrica -->
              <!-- Cubierta Superior -->
              <polygon points="0,-40 36,-20 0,0 -36,-20" fill="{pri_hex}"/>
              <!-- Muro Estructural Izquierdo (Pilar P) -->
              <polygon points="-36,-20 0,0 0,40 -36,20" fill="{ink_hex}"/>
              <!-- Muro Estructural Derecho (Viga F en Espacio Negativo) -->
              <polygon points="36,-20 0,0 0,40 36,20" fill="{sec_hex}"/>
              <!-- Recortes Arquitectónicos de Luz (Espacio Negativo F) -->
              <polygon points="8,4 28,-7 28,1 8,12" fill="{bg_hex}"/>
              <polygon points="8,18 22,10 22,18 8,26" fill="{bg_hex}"/>
              <polygon points="-26,-6 -8,4 -8,30 -16,25 -16,8 -26,2" fill="{bg_hex}"/>
            </g>
            """

        if archetype == "muebleria_el_roble":
            # Símbolo de autor: Sello de Ebanistería con Ensamble Cola de Milano + Hoja de Roble y Anillos de Duramen
            return defs + f"""
            <g filter="url(#{glow_id})">
              <!-- Escudo Octagonal de Taller Maestro -->
              <polygon points="-16,-38 16,-38 38,-16 38,16 16,38 -16,38 -38,16 -38,-16" fill="{ink_hex}"/>
              <polygon points="-13,-32 13,-32 32,-13 32,13 13,32 -13,32 -32,13 -32,-13" fill="none" stroke="{pri_hex}" stroke-width="1.6"/>
              <!-- Hoja de Roble Estilizada en Geometría Simétrica -->
              <path d="M0,-24 C8,-24 12,-18 10,-12 C18,-12 22,-4 15,2 C20,8 14,16 6,16 L0,22 L-6,16 C-14,16 -20,8 -15,2 C-22,-4 -18,-12 -10,-12 C-12,-18 -8,-24 0,-24 Z" fill="{pri_hex}"/>
              <!-- Nervadura Central y Ensamble de Madera en Espacio Negativo -->
              <path d="M0,-16 V26 M0,-4 L7,-10 M0,4 L-8,-2 M0,10 L7,4" stroke="{bg_hex}" stroke-width="2.4" stroke-linecap="round"/>
              <!-- Base de Cola de Milano -->
              <polygon points="-12,26 12,26 8,19 -8,19" fill="{sec_hex}"/>
            </g>
            """

        if archetype in ("aksis_automation", "aksis_mantenimiento", "aksis_transporte", "aksis_control"):
            # Símbolo Maestro de Arquitectura Corporativa GRUPO AKSIS:
            # Chasis Hexagonal Cinemático a +14° de inclinación con eslabón robótico AK y acento cromático de división
            div_accent = {
                "aksis_automation": "#EA580C",
                "aksis_mantenimiento": "#10B981",
                "aksis_transporte": "#F59E0B",
                "aksis_control": "#06B6D4"
            }.get(archetype, pri_hex)
            return defs + f"""
            <g filter="url(#{glow_id})" transform="skewX(-8)">
              <!-- Chasis Hexagonal Industrial de Precisión -->
              <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="{ink_hex}" stroke="{div_accent}" stroke-width="2.5"/>
              <!-- Eslabón Cinemático Izquierdo (A) -->
              <path d="M-20,22 L-4,-22 H6 L-10,22 Z" fill="{bg_hex}"/>
              <!-- Vector de Fuerza / Brazo Robótico Derecho (K) en Color Semántico de División -->
              <path d="M4,-2 L20,-22 H30 L12,0 L28,22 H18 L4,2 Z" fill="{div_accent}"/>
              <!-- Puente Axial de Torque -->
              <rect x="-14" y="2" width="22" height="6" rx="2" fill="{div_accent}"/>
              <!-- Perno de Calibración Óptica -->
              <circle cx="4" cy="0" r="4" fill="{ink_hex}" stroke="{bg_hex}" stroke-width="2"/>
            </g>
            """

        # Default: Pentagram / Chermayeff & Geismar Modernist Geometric Master Mark (4 Variantes según variant_index)
        v = variant_index % 4
        if v == 0:
            # Cinta Continua de Proporción Áurea entrelazada (Sin bordes punteados)
            return defs + f"""
            <g filter="url(#{glow_id})">
              <path d="M-32,-16 C-32,-34 -10,-42 8,-30 L30,-12 C42,-2 42,18 28,30 C14,42 -8,38 -18,24 L-6,12 C0,20 12,22 18,16 C24,10 24,-2 16,-8 L-6,-24 C-14,-30 -20,-24 -20,-16 Z" fill="url(#{grad_id})"/>
              <path d="M32,16 C32,34 10,42 -8,30 L-30,12 C-42,2 -42,-18 -28,-30 C-14,-42 8,-38 18,-24 L6,-12 C0,-20 -12,-22 -18,-16 C-24,-10 -24,2 -16,8 L6,24 C14,30 20,24 20,16 Z" fill="{ink_hex}"/>
              <circle cx="0" cy="0" r="5.5" fill="{pri_hex}"/>
            </g>
            """
        elif v == 1:
            # Prisma Arquitectónico de Espacio Negativo (Estilo Chermayeff)
            return defs + f"""
            <g filter="url(#{glow_id})">
              <polygon points="0,-40 36,-20 36,20 0,40 -36,20 -36,-20" fill="{ink_hex}"/>
              <polygon points="0,-40 36,-20 0,0 -36,-20" fill="url(#{grad_id})"/>
              <polygon points="0,0 36,-20 36,20 0,40" fill="{sec_hex}" opacity="0.88"/>
              <polygon points="0,-22 19,-11 0,0 -19,-11" fill="{bg_hex}"/>
              <polygon points="0,0 0,24 -19,13 -19,-11" fill="{bg_hex}"/>
            </g>
            """
        elif v == 2:
            # Blasón Contemporáneo de Alta Autoridad
            return defs + f"""
            <g filter="url(#{glow_id})">
              <path d="M-34,-34 H34 V2 C34,25 0,42 0,42 C0,42 -34,25 -34,2 V-34 Z" fill="{ink_hex}"/>
              <path d="M-26,-26 H26 V1 C26,19 0,33 0,33 C0,33 -26,19 -26,1 V-26 Z" fill="none" stroke="url(#{grad_id})" stroke-width="2.4"/>
              <path d="M0,-18 L14,0 L0,18 L-14,0 Z" fill="url(#{grad_id})"/>
              <circle cx="0" cy="0" r="4.5" fill="{bg_hex}"/>
            </g>
            """
        else:
            # Estrella Polar / Nodo Orbital Minimalista Suizo
            return defs + f"""
            <g filter="url(#{glow_id})">
              <rect x="-36" y="-36" width="72" height="72" rx="18" fill="{ink_hex}"/>
              <path d="M0,-28 C4,-10 10,-4 28,0 C10,4 4,10 0,28 C-4,10 -10,4 -28,0 C-10,-4 -4,-10 0,-28 Z" fill="url(#{grad_id})"/>
              <circle cx="0" cy="0" r="6" fill="{bg_hex}"/>
            </g>
            """

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
        show_construction_grid: bool = False
    ) -> List[Dict[str, Any]]:
        """
        Construye las 4 Propuestas de Logotipo Final con calidad de estudio internacional:
        - #01: Lockup Totémico Principal (Sobre Lienzo Claro Editorial)
        - #02: Lockup Horizontal Corporativo (Sobre Lienzo Obscuro de Gala)
        - #03: Sello / Insignia Institucional para Impresión, Grabado y Bordado
        - #04: Icono 1:1 Avatar-Safe & Contraste Positivo/Negativo
        """
        bg_hex = colors_hex[0] if len(colors_hex) > 0 else "#FAF8F5"
        ink_hex = colors_hex[1] if len(colors_hex) > 1 else "#090D16"
        pri_hex = colors_hex[2] if len(colors_hex) > 2 else "#C59B27"
        sec_hex = colors_hex[3] if len(colors_hex) > 3 else "#1E293B"

        archetype = cls.detect_industry_archetype(brand_name, industry_hint, purpose_text)
        clean_name = html.escape(brand_name.strip() or "TheBestBrand")
        words = clean_name.upper().split()
        if len(words) >= 2:
            line1 = " ".join(words[:-1])
            line2 = words[-1]
        else:
            line1 = clean_name.upper()
            line2 = ""

        desc_clean = html.escape((descriptor_tagline or "IDENTIDAD OFICIAL").upper()[:36])

        sym_light_0 = cls.render_bespoke_symbol_inner_svg(archetype, pri_hex, sec_hex, ink_hex, bg_hex, 0, "p1")
        sym_dark_1 = cls.render_bespoke_symbol_inner_svg(archetype, pri_hex, sec_hex, "#0F172A", "#FFFFFF", 1, "p2")
        sym_seal_2 = cls.render_bespoke_symbol_inner_svg(archetype, pri_hex, sec_hex, ink_hex, bg_hex, 2, "p3")
        sym_icon_3 = cls.render_bespoke_symbol_inner_svg(archetype, pri_hex, sec_hex, ink_hex, bg_hex, 3, "p4")

        grid_overlay = ""
        if show_construction_grid:
            grid_overlay = f"""
            <g opacity="0.22" stroke="{pri_hex}" stroke-width="0.6">
              <line x1="0" y1="110" x2="420" y2="110"/>
              <line x1="210" y1="0" x2="210" y2="240"/>
              <circle cx="210" cy="84" r="46" fill="none"/>
              <circle cx="210" cy="84" r="28.4" fill="none"/>
            </g>
            """

        # PROPUESTA 01: LOCKUP TOTÉMICO DE GALA (Fondo Claro Editorial)
        svg_01 = f"""<svg viewBox="0 0 420 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="250" rx="14" fill="{bg_hex}"/>
          <rect x="8" y="8" width="404" height="234" rx="10" fill="none" stroke="{ink_hex}" stroke-opacity="0.08" stroke-width="1"/>
          {grid_overlay}
          <g transform="translate(210, 84) scale(1.08)">
            {sym_light_0}
          </g>
          <text x="210" y="{168 if line2 else 176}" text-anchor="middle" fill="{ink_hex}" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{21 if len(line1) < 16 else 17}" letter-spacing="3.5">{line1}</text>
          {f'<text x="210" y="191" text-anchor="middle" fill="{pri_hex}" font-family="&#39;{primary_font}&#39;, sans-serif" font-weight="700" font-size="14.5" letter-spacing="5.5">{line2}</text>' if line2 else ''}
          <line x1="155" y1="204" x2="265" y2="204" stroke="{pri_hex}" stroke-width="1.2" opacity="0.65"/>
          <text x="210" y="220" text-anchor="middle" fill="{ink_hex}" fill-opacity="0.65" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="8.5" letter-spacing="3.2">{desc_clean}</text>
        </svg>"""

        # PROPUESTA 02: LOCKUP HORIZONTAL ARQUITECTÓNICO (Fondo Obscuro de Alto Contraste)
        svg_02 = f"""<svg viewBox="0 0 420 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="250" rx="14" fill="#090D16"/>
          <rect x="8" y="8" width="404" height="234" rx="10" fill="none" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1"/>
          <g transform="translate(96, 125) scale(1.05)">
            {sym_dark_1}
          </g>
          <line x1="158" y1="76" x2="158" y2="174" stroke="{pri_hex}" stroke-width="1.5" opacity="0.65"/>
          <text x="176" y="{115 if line2 else 126}" text-anchor="start" fill="#FFFFFF" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="{22 if len(line1) < 14 else 17.5}" letter-spacing="2.8">{line1}</text>
          {f'<text x="176" y="140" text-anchor="start" fill="{pri_hex}" font-family="&#39;{primary_font}&#39;, sans-serif" font-weight="700" font-size="15.5" letter-spacing="4.5">{line2}</text>' if line2 else ''}
          <text x="176" y="164" text-anchor="start" fill="#94A3B8" font-family="'{secondary_font}', sans-serif" font-weight="600" font-size="8.5" letter-spacing="2.6">{desc_clean}</text>
        </svg>"""

        # PROPUESTA 03: SELLO INSTITUCIONAL CIRCULAR PARA BORDADO Y GRABADO LÁSER
        svg_03 = f"""<svg viewBox="0 0 420 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="250" rx="14" fill="{bg_hex}"/>
          <circle cx="210" cy="112" r="78" fill="{ink_hex}"/>
          <circle cx="210" cy="112" r="71" fill="none" stroke="{pri_hex}" stroke-width="1.8"/>
          <circle cx="210" cy="112" r="54" fill="{bg_hex}"/>
          <g transform="translate(210, 112) scale(0.84)">
            {sym_seal_2}
          </g>
          <circle cx="148" cy="112" r="3" fill="{pri_hex}"/>
          <circle cx="272" cy="112" r="3" fill="{pri_hex}"/>
          <text x="210" y="216" text-anchor="middle" fill="{ink_hex}" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="15" letter-spacing="4.2">{clean_name.upper()}</text>
          <text x="210" y="233" text-anchor="middle" fill="{pri_hex}" font-family="'{secondary_font}', sans-serif" font-weight="700" font-size="8.2" letter-spacing="2.8">SELLO OFICIAL · TRAZO ≥ 1.2MM APTO BORDADO Y LÁSER</text>
        </svg>"""

        # PROPUESTA 04: SISTEMA AVATAR 1:1 POSITIVO / NEGATIVO & FAVICON DE ALTA PREGNANCIA
        svg_04 = f"""<svg viewBox="0 0 420 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="250" rx="14" fill="#F1F5F9"/>
          <!-- App Icon Dark 1:1 -->
          <rect x="48" y="34" width="142" height="142" rx="32" fill="{ink_hex}"/>
          <g transform="translate(119, 105) scale(1.12)">
            {sym_dark_1}
          </g>
          <text x="119" y="198" text-anchor="middle" fill="#0F172A" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="11" letter-spacing="1.5">VERSIÓN NOCTURNA 1:1</text>
          <!-- App Icon Light 1:1 -->
          <rect x="230" y="34" width="142" height="142" rx="32" fill="{bg_hex}" stroke="#CBD5E1" stroke-width="1.5"/>
          <g transform="translate(301, 105) scale(1.12)">
            {sym_icon_3}
          </g>
          <text x="301" y="198" text-anchor="middle" fill="#0F172A" font-family="'{primary_font}', sans-serif" font-weight="800" font-size="11" letter-spacing="1.5">VERSIÓN EDITORIAL 1:1</text>
          <text x="210" y="228" text-anchor="middle" fill="#475569" font-family="'{secondary_font}', sans-serif" font-weight="700" font-size="9" letter-spacing="2.4">{clean_name.upper()} · SISTEMA ICONOGRÁFICO MULTIESCALA</text>
        </svg>"""

        return [
            {
                "proposal_id": "PROP-01",
                "title": f"{brand_name} · Lockup Totémico Principal",
                "subtitle": "Símbolo de Autor en Proporción Áurea + Logotipo con Tracking Óptico",
                "archetype": archetype,
                "svg": svg_01,
                "studio_render_asset": "/assets/logos/step5b_master_logo_01_totemic_emblem.png"
            },
            {
                "proposal_id": "PROP-02",
                "title": f"{brand_name} · Lockup Horizontal Arquitectónico",
                "subtitle": "Composición Corporativa para Fachadas, Flota Vehicular, Cabeceras Web y Licitaciones",
                "archetype": archetype,
                "svg": svg_02,
                "studio_render_asset": "/assets/logos/step5b_master_logo_02_architectural_lockup.png"
            },
            {
                "proposal_id": "PROP-03",
                "title": f"{brand_name} · Sello Institucional & Bordado",
                "subtitle": "Emblema Circular de Alta Solidez Calibrado a ≥ 1.2 mm para Bordado, Cuño y Láser",
                "archetype": archetype,
                "svg": svg_03,
                "studio_render_asset": "/assets/logos/step5b_master_logo_03_institutional_seal.png"
            },
            {
                "proposal_id": "PROP-04",
                "title": f"{brand_name} · Sistema Iconográfico 1:1 (Positivo / Negativo)",
                "subtitle": "Símbolo Autónomo de Espacio Negativo para App Icon, Avatar Social y Señalética a 30m",
                "archetype": archetype,
                "svg": svg_04,
                "studio_render_asset": "/assets/logos/step5b_master_logo_04_kinetic_isometric_mark.png"
            }
        ]


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
