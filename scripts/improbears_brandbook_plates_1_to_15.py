# -*- coding: utf-8 -*-
"""
Motor Oficial TheBestBrand — Manual de Marca y Arquitectura Maestra IMPROBEARS (Parte 1: Láminas 01 a 15)
Secuencia Metodológica Oficial TheBestBrand (Pasos 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6):
- Láminas 01–03 (Paso 0): Portada Maestra, Índice de 30 Láminas y Manifiesto Fundacional (Del Caos al Sistema).
- Láminas 04–08 (Paso 1): Círculo Dorado, Misión/Visión/Filosofía, Principios y Relación con Clientes,
  LA EMPRESA COMO PERSONA (Retrato vivo de Jorge Benítez "El Oso") y Código de Comportamiento / Espectro Kansei.
- Láminas 09–12 (Paso 2 — ANTES DE HABLAR DEL NOMBRE): Arquitectura de Touchpoints y Mapa del Viaje del Cliente
  (Momento 1: ANTES de Comprar · Momento 2: DURANTE la Compra · Momento 3: DESPUÉS de Comprar).
- Láminas 13–15 (Paso 3 y 4): Naming Estratégico (IMPRO + BEARS, Semiótica y Niza), Arquitectura Maestra
  (Marca Madre + 4 Submarcas) y Anatomía del Símbolo Maestro en Positivo.
"""

import os
import base64

ASSETS_DIR = "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/assets/improbears"


def get_b64_uri(filename: str) -> str:
    path = os.path.join(ASSETS_DIR, filename)
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode("ascii")
    ext = filename.split(".")[-1].lower()
    mime = "image/jpeg" if ext in ("jpg", "jpeg") else "image/png"
    return f"data:{mime};base64,{data}"


def get_improbears_assets(embed_base64: bool = True) -> dict:
    files = {
        "master": "logo-improbears-master.png",
        "consulting": "logo-improbears-consulting.png",
        "ingredients": "logo-improbears-ingredients.png",
        "studio": "logo-improbears-studio.png",
        "ai": "logo-improbears-ai.png",
        "master_neg": "logo-improbears-master-negativo.png",
        "consulting_neg": "logo-improbears-consulting-negativo.png",
        "ingredients_neg": "logo-improbears-ingredients-negativo.png",
        "studio_neg": "logo-improbears-studio-negativo.png",
        "ai_neg": "logo-improbears-ai-negativo.png",
        "mono_white": "logo-improbears-master-mono-white.png",
        "thumb": "logo-improbears-master-thumb.png",
        "thumb_neg": "logo-improbears-master-negativo-thumb.png",
        "banner": "banner-improbears.png",
        "founder": "foto-jb-oso.jpg",
        "jb_hero": "foto-jb-oso-hero.png",
        "photo_caos": "foto-caos-a-claridad.jpg",
        "photo_boardroom": "foto-sala-juntas-liderazgo.jpg",
        "photo_ai_woman": "foto-ejecutiva-ia-sistemas.jpg",
        "photo_hopzoil": "foto-hopzoil-ingredients.jpg",
        "photo_desk": "foto-escritorio-consultoria.jpg",
        "photo_studio_rotulo": "foto-studio-rotulo-casa.jpg",
        "photo_studio_parota": "foto-studio-rotulo-parota.jpg",
        "photo_studio_highlights": "foto-studio-rotulo-highlights.jpg",
        "sello_01": "sello-01-productividad.png",
        "sello_02": "sello-02-empowerment.png",
        "sello_03": "sello-03-estrategia.png",
        "sello_04": "sello-04-marca-cliente.png",
        "sello_05": "sello-05-pensamiento-sistemico.png",
        "sello_06": "sello-06-crm-comercial.png",
    }
    if not embed_base64:
        return {k: f"/assets/improbears/{v}" for k, v in files.items()}
    return {k: get_b64_uri(v) for k, v in files.items()}


def header_html(sec_num: str, sec_title: str, plate_num: int) -> str:
    """Encabezado editorial abierto sobre lienzo blanco con línea de flujo vectorial y nodo naranja."""
    return f"""
    <div class="plate-hdr">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <svg width="18" height="18" viewBox="0 0 18 18" style="flex-shrink:0;">
          <circle cx="9" cy="9" r="7" fill="none" stroke="#0D2540" stroke-width="2"/>
          <circle cx="9" cy="9" r="3" fill="#FF7A00"/>
        </svg>
        <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:9.5px;letter-spacing:0.14em;color:#FF7A00;white-space:nowrap;flex-shrink:0;">SECCION {sec_num}</span>
        <span style="color:#4C9DE6;font-weight:700;font-size:11px;flex-shrink:0;">—</span>
        <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:9.2px;letter-spacing:0.08em;color:#0D2540;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{sec_title}</span>
      </div>
      <div style="display:flex;align-items:center;gap:14px;flex-shrink:0;white-space:nowrap;">
        <span style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:8.2px;letter-spacing:0.12em;color:#426EAE;white-space:nowrap;">ESTRATEGIA • SISTEMAS • PRODUCTIVIDAD • RESULTADOS</span>
        <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:9.5px;color:#0D2540;border-bottom:2.5px solid #FF7A00;padding-bottom:2px;letter-spacing:0.1em;white-space:nowrap;">LAMINA {plate_num:02d} / 30</span>
      </div>
    </div>
    """


def footer_html(thumb_pos_src: str, plate_num: int) -> str:
    """Footer institucional sobre fondo claro (#FFFFFF) con curvas vectoriales fluidas y logo positivo por default."""
    return f"""
    <div class="plate-ftr">
      <svg viewBox="0 0 1600 44" width="100%" height="44" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
        <path d="M0,4 L1600,4" stroke="#E6E6E6" stroke-width="1" fill="none"/>
        <path d="M0,4 C320,4 460,4 680,4" stroke="#FF7A00" stroke-width="3" fill="none"/>
        <path d="M1180,44 C1320,20 1460,8 1600,2 L1600,44 Z" fill="#F0F6FC"/>
        <path d="M1340,44 C1440,28 1520,16 1600,8" stroke="#4C9DE6" stroke-width="2" fill="none" opacity="0.65"/>
        <path d="M1420,44 C1490,32 1550,22 1600,14" stroke="#FF7A00" stroke-width="2.5" fill="none" opacity="0.85"/>
      </svg>
      <div style="position:relative;z-index:1;display:flex;align-items:center;gap:10px;">
        <img src="{thumb_pos_src}" alt="ImproBears Positivo" style="width:26px;height:26px;object-fit:contain;display:block;" />
        <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:10px;letter-spacing:0.14em;color:#0D2540;">IMPROBEARS</span>
        <span style="color:#FF7A00;font-weight:800;">•</span>
        <span style="font-family:'Avenir Next','Plus Jakarta Sans',sans-serif;font-weight:600;font-size:9px;letter-spacing:0.12em;color:#426EAE;">ARQUITECTOS DE SISTEMAS DE PRODUCTIVIDAD</span>
      </div>
      <div style="position:relative;z-index:1;display:flex;align-items:center;gap:14px;">
        <span style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:8.5px;letter-spacing:0.16em;color:#FF7A00;">INTELIGENCIA • ESTRUCTURA • EJECUCION • CRECIMIENTO</span>
        <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:9.5px;color:#0D2540;">PAG. {plate_num:02d}</span>
      </div>
    </div>
    """


def top_curves_svg(variant: int = 0) -> str:
    """Curvas vectoriales tipo Illustrator que fluyen libremente por el lienzo blanco (sin cajas)."""
    if variant % 2 == 1:
        return """
        <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
          <path d="M0,0 L720,0 C520,26 280,44 0,68 Z" fill="#F0F6FC"/>
          <path d="M980,0 L1600,0 L1600,56 C1380,38 1180,18 980,0 Z" fill="#426EAE" opacity="0.08"/>
          <path d="M1220,0 L1600,0 L1600,24 C1460,16 1340,8 1220,0 Z" fill="#FF7A00" opacity="0.88"/>
          <path d="M-40,840 C380,790 880,870 1640,760" fill="none" stroke="#E6E6E6" stroke-width="1.5"/>
          <path d="M1480,120 A160,160 0 0,1 1580,280" fill="none" stroke="#4C9DE6" stroke-width="1.5" opacity="0.28"/>
          <circle cx="1540" cy="110" r="2.5" fill="#707070" opacity="0.35"/><circle cx="1556" cy="110" r="2.5" fill="#707070" opacity="0.35"/><circle cx="1572" cy="110" r="2.5" fill="#707070" opacity="0.35"/>
          <circle cx="1540" cy="126" r="2.5" fill="#707070" opacity="0.35"/><circle cx="1556" cy="126" r="2.5" fill="#707070" opacity="0.35"/><circle cx="1572" cy="126" r="2.5" fill="#707070" opacity="0.35"/>
        </svg>
        """
    return """
    <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
      <path d="M0,0 L860,0 C640,28 380,48 0,72 Z" fill="#426EAE" opacity="0.06"/>
      <path d="M1040,0 L1600,0 L1600,52 C1400,34 1210,16 1040,0 Z" fill="#4C9DE6" opacity="0.11"/>
      <path d="M1260,0 L1600,0 L1600,24 C1470,16 1360,8 1260,0 Z" fill="#FF7A00" opacity="0.9"/>
      <path d="M-20,830 C460,870 1020,785 1620,835" fill="none" stroke="#E6E6E6" stroke-width="1.5"/>
      <circle cx="48" cy="110" r="2.5" fill="#707070" opacity="0.3"/><circle cx="64" cy="110" r="2.5" fill="#707070" opacity="0.3"/><circle cx="80" cy="110" r="2.5" fill="#707070" opacity="0.3"/>
      <circle cx="48" cy="126" r="2.5" fill="#707070" opacity="0.3"/><circle cx="64" cy="126" r="2.5" fill="#707070" opacity="0.3"/><circle cx="80" cy="126" r="2.5" fill="#707070" opacity="0.3"/>
    </svg>
    """


def build_plates_01_to_15(assets: dict) -> list:
    m_logo = assets["master"]
    c_logo = assets["consulting"]
    i_logo = assets["ingredients"]
    s_logo = assets["studio"]
    a_logo = assets["ai"]
    t_pos = assets["thumb"]
    banner = assets["banner"]
    founder = assets["founder"]
    jb_hero = assets["jb_hero"]
    photo_caos = assets["photo_caos"]
    photo_boardroom = assets["photo_boardroom"]
    photo_ai_woman = assets["photo_ai_woman"]
    photo_hopzoil = assets["photo_hopzoil"]
    photo_desk = assets["photo_desk"]
    photo_studio_rotulo = assets["photo_studio_rotulo"]

    plates = []

    # =========================================================================
    # LAMINA 01: PORTADA MAESTRA EN CURVAS ILLUSTRATOR SOBRE FONDO CLARO
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-01" style="background:#FFFFFF;">
      <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:1;">
        <path d="M0,0 L760,0 C540,85 280,190 0,350 Z" fill="#FF7A00"/>
        <path d="M0,255 C260,145 520,68 830,0 L940,0 C600,105 310,220 0,395 Z" fill="#E6E6E6" opacity="0.85"/>
        <path d="M80,635 C520,635 690,410 1060,410" fill="none" stroke="#E6E6E6" stroke-width="2" stroke-dasharray="6,6"/>
        <path d="M620,240 C780,240 850,350 960,350" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
        <circle cx="620" cy="240" r="5" fill="#FF7A00"/>
        <circle cx="960" cy="350" r="5" fill="#426EAE"/>
        <circle cx="1175" cy="365" r="245" fill="#FFFFFF"/>
        <path d="M955,245 A250,250 0 1,1 1395,485" fill="none" stroke="#426EAE" stroke-width="3" opacity="0.35"/>
        <path d="M985,495 A235,235 0 0,1 1375,225" fill="none" stroke="#FF7A00" stroke-width="4" stroke-linecap="round"/>
        <path d="M1010,525 A215,215 0 0,0 1390,395" fill="none" stroke="#4C9DE6" stroke-width="2.5" stroke-dasharray="8,6"/>
        <path d="M1060,900 C1270,790 1440,650 1600,450 L1600,900 Z" fill="#0D2540" opacity="0.10"/>
        <path d="M960,900 C1210,780 1410,620 1600,390 L1600,460 C1420,665 1230,805 1020,900 Z" fill="#426EAE" opacity="0.22"/>
        <path d="M890,900 C1160,770 1380,600 1600,345 L1600,382 C1390,615 1175,780 935,900 Z" fill="#4C9DE6" opacity="0.45"/>
        <g fill="#707070" opacity="0.35">
          <circle cx="880" cy="110" r="3"/><circle cx="902" cy="110" r="3"/><circle cx="924" cy="110" r="3"/><circle cx="946" cy="110" r="3"/>
          <circle cx="880" cy="132" r="3"/><circle cx="902" cy="132" r="3"/><circle cx="924" cy="132" r="3"/><circle cx="946" cy="132" r="3"/>
          <circle cx="880" cy="154" r="3"/><circle cx="902" cy="154" r="3"/><circle cx="924" cy="154" r="3"/><circle cx="946" cy="154" r="3"/>
        </g>
      </svg>

      <div class="plate-body" style="position:relative;z-index:2;display:grid;grid-template-columns:1.12fr 0.88fr;align-items:center;gap:32px;padding:54px 56px 26px 56px;">
        <div style="padding-top:48px;">
          <div style="display:inline-flex;align-items:center;gap:8px;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;letter-spacing:0.2em;color:#FF7A00;margin-bottom:10px;">
            <span style="display:inline-block;width:28px;height:2.5px;background:#FF7A00;"></span>
            MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V5.0
          </div>
          <h1 style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:52px;line-height:0.98;color:#0D2540;letter-spacing:-0.02em;margin:0 0 8px 0;">IMPROBEARS</h1>
          <div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:16px;letter-spacing:0.28em;color:#426EAE;margin-bottom:16px;">BUSINESS IMPROVEMENT</div>
          <svg width="240" height="12" viewBox="0 0 240 12" style="margin-bottom:16px;display:block;">
            <line x1="0" y1="6" x2="95" y2="6" stroke="#FF7A00" stroke-width="4" stroke-linecap="round"/>
            <line x1="105" y1="6" x2="185" y2="6" stroke="#426EAE" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="200" cy="6" r="4" fill="#4C9DE6"/>
          </svg>
          <div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:22px;color:#0D2540;margin-bottom:10px;line-height:1.2;">
            Arquitectos de sistemas de productividad.
          </div>
          <p style="font-family:'Avenir Next',sans-serif;font-size:13.2px;line-height:1.58;color:#333333;margin:0 0 26px 0;max-width:540px;">
            Sistema rector de posicionamiento, Círculo Dorado, La Empresa como Persona (Jorge Benítez), Ingeniería de Touchpoints y Arquitectura Visual en curvas para la Marca Madre y sus <strong>4 Submarcas Oficiales</strong>.
          </p>

          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding-top:16px;border-top:1.5px solid #E6E6E6;">
            <div style="padding:4px 12px 4px 0;border-right:1px solid #E6E6E6;text-align:center;">
              <img src="{c_logo}" alt="Consulting" style="height:56px;object-fit:contain;margin-bottom:4px;" />
              <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#0D2540;letter-spacing:0.08em;">CONSULTING</div>
            </div>
            <div style="padding:4px 12px;border-right:1px solid #E6E6E6;text-align:center;">
              <img src="{i_logo}" alt="Ingredients" style="height:56px;object-fit:contain;margin-bottom:4px;" />
              <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#0D2540;letter-spacing:0.08em;">INGREDIENTS</div>
            </div>
            <div style="padding:4px 12px;border-right:1px solid #E6E6E6;text-align:center;">
              <img src="{s_logo}" alt="Studio" style="height:56px;object-fit:contain;margin-bottom:4px;" />
              <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#0D2540;letter-spacing:0.08em;">STUDIO</div>
            </div>
            <div style="padding:4px 0 4px 12px;text-align:center;">
              <img src="{a_logo}" alt="AI" style="height:56px;object-fit:contain;margin-bottom:4px;" />
              <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#FF7A00;letter-spacing:0.08em;">AI</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-right:10px;">
          <img src="{m_logo}" alt="ImproBears Master Positive Logo" style="width:295px;height:295px;object-fit:contain;display:block;filter:drop-shadow(0 16px 32px rgba(13,37,64,0.08));" />
          <div style="margin-top:16px;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;letter-spacing:0.22em;color:#0D2540;">
            ESTRATEGIA <span style="color:#FF7A00;">•</span> SISTEMAS <span style="color:#FF7A00;">•</span> PRODUCTIVIDAD <span style="color:#FF7A00;">•</span> RESULTADOS
          </div>
          <div style="margin-top:4px;font-family:'Avenir Next',sans-serif;font-size:10.5px;font-weight:600;color:#426EAE;letter-spacing:0.08em;">
            Versión Positiva Principal sobre Lienzo Claro (#FFFFFF)
          </div>
        </div>
      </div>
      {footer_html(t_pos, 1)}
    </section>
    """)

    # =========================================================================
    # LAMINA 02: INDICE EDITORIAL FLUIDO EN ORDEN METODOLOGICO (PASOS 0 AL 6)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-02">
      {top_curves_svg(0)}
      {header_html("01", "INTRODUCCION Y ARQUITECTURA METODOLOGICA DEL MANUAL (30 LAMINAS)", 2)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.84fr 1.16fr;gap:34px;align-items:center;">
        <div style="display:flex;flex-direction:column;gap:14px;padding-right:18px;border-right:1.5px solid #E6E6E6;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;letter-spacing:0.18em;color:#FF7A00;margin-bottom:4px;">ESTRUCTURA DEL SISTEMA • PASOS 0 AL 6</div>
            <h2 style="font-family:'Montserrat',sans-serif;font-size:24px;font-weight:800;color:#0D2540;margin:0 0 8px 0;line-height:1.12;">
              De la esencia humana y los Touchpoints al símbolo.
            </h2>
            <p style="font-family:'Avenir Next',sans-serif;font-size:12px;color:#333333;line-height:1.52;margin:0;">
              Siguiendo la metodología de <strong>TheBestBrand</strong>, este manual define primero el problema que resolvemos (Paso 0), el ADN y <strong>La Empresa como Persona: Jorge Benítez</strong> (Paso 1), y la <strong>Ingeniería de Touchpoints</strong> (Paso 2) antes de presentar el <strong>Nombre</strong> (Paso 3) y el sistema visual (Pasos 4–6).
            </p>
          </div>

          <div style="position:relative;padding:8px 0;">
            <svg viewBox="0 0 420 155" width="100%" height="150" style="display:block;">
              <!-- Curva fluida ascendente de los 7 Pasos Metodológicos -->
              <path d="M24,118 C95,118 115,44 195,44 C275,44 295,104 388,28" fill="none" stroke="#426EAE" stroke-width="3" stroke-linecap="round"/>
              <path d="M24,128 C105,128 125,58 205,58 C285,58 305,114 394,40" fill="none" stroke="#FF7A00" stroke-width="2" stroke-dasharray="5,4"/>
              <polygon points="396,22 380,24 389,37" fill="#FF7A00"/>
              <!-- Nodos Paso 0 al 6 -->
              <circle cx="32" cy="118" r="13" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
              <text x="32" y="122" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="8.5" fill="#0D2540">P0</text>
              <text x="32" y="144" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="7.5" fill="#707070">CAOS→SISTEMA</text>

              <circle cx="102" cy="84" r="13" fill="#FFFFFF" stroke="#426EAE" stroke-width="2.5"/>
              <text x="102" y="88" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="8.5" fill="#0D2540">P1</text>
              <text x="102" y="62" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="7.5" fill="#426EAE">PERSONA</text>

              <circle cx="176" cy="46" r="13" fill="#FFFFFF" stroke="#FF7A00" stroke-width="2.5"/>
              <text x="176" y="50" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="8.5" fill="#FF7A00">P2</text>
              <text x="176" y="24" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="7.5" fill="#FF7A00">TOUCHPOINTS</text>

              <circle cx="246" cy="64" r="13" fill="#FFFFFF" stroke="#0D2540" stroke-width="2.5"/>
              <text x="246" y="68" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="8.5" fill="#0D2540">P3</text>
              <text x="246" y="92" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="7.5" fill="#0D2540">NAMING</text>

              <circle cx="312" cy="72" r="13" fill="#FFFFFF" stroke="#426EAE" stroke-width="2.5"/>
              <text x="312" y="76" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="8.5" fill="#426EAE">P4</text>
              <text x="312" y="99" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="7.5" fill="#426EAE">LOGOS (5)</text>

              <circle cx="372" cy="36" r="14" fill="#FF7A00"/>
              <text x="372" y="40" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="8" fill="#FFFFFF">P5·6</text>
              <text x="366" y="14" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="7.5" fill="#FF7A00">SISTEMA C-00</text>
            </svg>
            <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#426EAE;letter-spacing:0.12em;margin-top:4px;">
              FLUJO METODOLOGICO EN CURVAS • DEL ADN Y TOUCHPOINTS A LA IDENTIDAD
            </div>
          </div>

          <div style="border-left:3px solid #FF7A00;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;letter-spacing:0.12em;">NORMA DE COMPOSICION FLUIDA</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;margin-top:2px;">
              Lienzo claro (#FFFFFF) en todo el documento, logotipo positivo por defecto y conexiones vectoriales en curvas tipo Illustrator.
            </div>
          </div>
        </div>

        <div style="position:relative;">
          <svg viewBox="0 0 600 420" width="100%" height="100%" style="position:absolute;inset:0;pointer-events:none;z-index:0;">
            <path d="M18,45 C140,45 160,185 310,185 C440,185 460,320 580,320" fill="none" stroke="#4C9DE6" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.55"/>
            <line x1="290" y1="10" x2="290" y2="410" stroke="#E6E6E6" stroke-width="1"/>
            <line x1="0" y1="140" x2="590" y2="140" stroke="#E6E6E6" stroke-width="1"/>
            <line x1="0" y1="280" x2="590" y2="280" stroke="#E6E6E6" stroke-width="1"/>
          </svg>
          <div style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;column-gap:32px;row-gap:18px;">
            <div class="ib-flow-node">
              <div class="ib-node-hdr"><span class="ib-dot-orange"></span>SECCION 01 • LAMINAS 01–03 (PASO 0)</div>
              <div class="ib-flow-title">Introducción y Contexto</div>
              <div class="ib-flow-txt">01. Portada Maestra en Curvas<br/>02. Mapa Metodológico de 30 Láminas<br/>03. Manifiesto: Del Caos al Sistema</div>
            </div>
            <div class="ib-flow-node">
              <div class="ib-node-hdr"><span class="ib-dot-blue"></span>SECCION 02 • LAMINAS 04–08 (PASO 1)</div>
              <div class="ib-flow-title">ADN y La Empresa como Persona</div>
              <div class="ib-flow-txt">04. Círculo Dorado (WHY · HOW · WHAT)<br/>05. Misión, Visión y Filosofía<br/>06. Los 6 Principios y Relación Cliente<br/>07. <strong>La Empresa como Persona (Jorge Benítez)</strong><br/>08. Voz, Conducta y Espectro Kansei</div>
            </div>
            <div class="ib-flow-node">
              <div class="ib-node-hdr"><span class="ib-dot-orange"></span>SECCION 03 • LAMINAS 09–12 (PASO 2)</div>
              <div class="ib-flow-title">Ingeniería de Touchpoints</div>
              <div class="ib-flow-txt">09. Mapa Integral del Viaje del Cliente<br/>10. Touchpoints ANTES de Comprar<br/>11. Touchpoints DURANTE la Compra<br/>12. Touchpoints DESPUÉS de Comprar</div>
            </div>
            <div class="ib-flow-node">
              <div class="ib-node-hdr"><span class="ib-dot-blue"></span>SECCION 04 • LAMINAS 13–22 (PASO 3–4)</div>
              <div class="ib-flow-title">Nombre, Arquitectura y Logos</div>
              <div class="ib-flow-txt">13. <strong>Naming (IMPRO+BEARS) y Niza</strong><br/>14. Arquitectura: Madre + 4 Submarcas<br/>15. Anatomía · 16–19. Las 4 Submarcas<br/>20. Retícula · 21. Sección Negativo · 22. Prohibiciones</div>
            </div>
            <div class="ib-flow-node">
              <div class="ib-node-hdr"><span class="ib-dot-orange"></span>SECCION 05 • LAMINAS 23–26 (PASO 5)</div>
              <div class="ib-flow-title">Color, Curvas, Tipografía y Sellos</div>
              <div class="ib-flow-txt">23. Paleta Oficial (8 Tonos)<br/>24. Regla 70/20/10 y 6 Recursos en Curvas<br/>25. Tipografía Montserrat + Avenir Next<br/>26. Los 6 Sellos Metodológicos</div>
            </div>
            <div class="ib-flow-node">
              <div class="ib-node-hdr"><span class="ib-dot-blue"></span>SECCION 06 • LAMINAS 27–30 (PASO 6)</div>
              <div class="ib-flow-title">Aplicaciones y Gobernanza C-00</div>
              <div class="ib-flow-txt">27. Regla C-00 de Co-Branding<br/>28. Papelería, Propuestas, Tarjetas y Firma<br/>29. Ecosistema Digital y Auditoría (10 Controles)<br/>30. Colofón Institucional en Lienzo Claro</div>
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 2)}
    </section>
    """)

    # =========================================================================
    # LAMINA 03: MANIFIESTO FUNDACIONAL Y CONTEXTO (PASO 0)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-03">
      {top_curves_svg(1)}
      {header_html("01", "MANIFIESTO FUNDACIONAL • DE LA COMPLEJIDAD A LA CLARIDAD (PASO 0)", 3)}
      <div class="plate-body" style="display:grid;grid-template-columns:1.18fr 0.82fr;gap:32px;align-items:center;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">EL PROBLEMA QUE RESOLVEMOS • DEL CAOS AL SISTEMA</div>
            <h2 style="font-family:'Montserrat',sans-serif;font-size:24px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;line-height:1.14;">
              Ayudamos a empresas que crecieron más rápido que sus sistemas.
            </h2>
            <p style="font-family:'Avenir Next',sans-serif;font-size:12px;color:#333333;line-height:1.5;margin:0;">
              <strong>ImproBears</strong> nace para resolver la fractura operativa de organizaciones valiosas que hoy sufren por información dispersa, procesos desconectados y dependencia excesiva de personas clave. Transformamos el desgaste diario en una arquitectura clara, humana y medible.
            </p>
          </div>

          <div style="position:relative;height:192px;border-radius:18px 38px 18px 18px;overflow:hidden;border-bottom:3.5px solid #FF7A00;">
            <img src="{photo_caos}" alt="Del Caos Operativo a la Claridad" style="width:100%;height:100%;object-fit:cover;object-position:center 18%;display:block;" />
          </div>

          <div style="display:grid;grid-template-columns:1fr 54px 1fr;align-items:center;gap:8px;padding-top:4px;">
            <div style="border-left:3px solid #707070;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#707070;letter-spacing:0.1em;">ANTES: FRAGMENTACION</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">
                Información dispersa en múltiples chats, fatiga del fundador y esfuerzo alto sin trazabilidad financiera.
              </div>
            </div>
            <div style="text-align:center;">
              <svg width="48" height="32" viewBox="0 0 48 32">
                <path d="M4,22 Q22,22 38,8" fill="none" stroke="#FF7A00" stroke-width="3.5" stroke-linecap="round"/>
                <polygon points="42,5 32,7 39,15" fill="#FF7A00"/>
              </svg>
            </div>
            <div style="border-left:3px solid #FF7A00;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;letter-spacing:0.1em;">DESPUES: SISTEMA IMPROBEARS</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">
                Claridad operativa en tiempo real, estrategia conectada a sistemas y libertad mental para crecer.
              </div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;padding-left:22px;border-left:1px solid #E6E6E6;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#426EAE;letter-spacing:0.15em;">EL ACTOR COMPRADOR (BUYER PERSONA)</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              Fundadores, Directores Generales y Líderes de Industria B2B
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.48;margin:0;">
              Empresarios que ya lograron tracción comercial o industrial pero sienten que su empresa depende de su agotamiento personal, o directores de I+D y operaciones que requieren formulaciones, narrativa visual e inteligencia artificial con rigor técnico.
            </p>
          </div>
          <img src="{photo_desk}" alt="Claridad Ejecutiva" style="width:100%;height:162px;object-fit:cover;object-position:center center;border-radius:18px 38px 18px 18px;border-bottom:3.5px solid #426EAE;display:block;" />
          <div style="border-left:3.5px solid #0D2540;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;">LA TRANSFORMACION CENTRAL</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.5px;color:#0D2540;font-weight:600;line-height:1.45;margin-top:3px;">
              “No vendemos horas sueltas ni software aislado; instalamos el sistema operativo que devuelve claridad, control y rentabilidad al líder.”
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 3)}
    </section>
    """)

    # =========================================================================
    # LAMINA 04: EL CIRCULO DORADO EN CURVAS CONECTADAS (PASO 1.1)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-04">
      {top_curves_svg(0)}
      {header_html("02", "ADN DE MARCA • EL CIRCULO DORADO EN ARQUITECTURA DE CURVAS (PASO 1.1)", 4)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.92fr 1.08fr;gap:18px;align-items:center;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <svg viewBox="0 0 460 390" width="100%" height="360">
            <circle cx="210" cy="195" r="158" fill="#F8FAFC" stroke="#E6E6E6" stroke-width="1.5"/>
            <path d="M62,140 A158,158 0 1,1 295,328" fill="none" stroke="#426EAE" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="210" cy="195" r="108" fill="#F0F6FC" stroke="#4C9DE6" stroke-width="2.5" stroke-dasharray="6,4"/>
            <path d="M112,150 A108,108 0 1,1 285,272" fill="none" stroke="#0D2540" stroke-width="3.5"/>
            <circle cx="210" cy="195" r="58" fill="#FFF8F1" stroke="#FF7A00" stroke-width="3.5"/>
            <text x="210" y="191" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="16">WHY</text>
            <text x="210" y="207" text-anchor="middle" fill="#FF7A00" font-family="Montserrat" font-weight="800" font-size="8.5" letter-spacing="1.5">PROPOSITO</text>
            <text x="210" y="112" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="10.5">HOW • METODO</text>
            <text x="210" y="126" text-anchor="middle" fill="#426EAE" font-family="Plus Jakarta Sans" font-weight="700" font-size="8.5">Sistemas + Ciencia + IA</text>
            <text x="210" y="56" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="10.5">WHAT • 4 SUBMARCAS</text>
            <text x="210" y="70" text-anchor="middle" fill="#707070" font-family="Montserrat" font-weight="700" font-size="8">Consulting · Ingredients · Studio · AI</text>
            <path d="M268,195 C330,195 355,75 448,75" fill="none" stroke="#FF7A00" stroke-width="2.2"/>
            <circle cx="268" cy="195" r="4.5" fill="#FF7A00"/><circle cx="448" cy="75" r="4.5" fill="#FF7A00"/>
            <path d="M318,195 L448,195" fill="none" stroke="#426EAE" stroke-width="2.2"/>
            <circle cx="318" cy="195" r="4.5" fill="#426EAE"/><circle cx="448" cy="195" r="4.5" fill="#426EAE"/>
            <path d="M352,265 C390,295 410,315 448,315" fill="none" stroke="#4C9DE6" stroke-width="2.2"/>
            <circle cx="352" cy="265" r="4.5" fill="#4C9DE6"/><circle cx="448" cy="315" r="4.5" fill="#4C9DE6"/>
          </svg>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <div style="padding-bottom:14px;border-bottom:1px solid #E6E6E6;">
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">01. WHY • EL PROPOSITO NUCLEAR (POR QUE EXISTIMOS)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:12.4px;color:#0D2540;line-height:1.52;margin-top:4px;">
              Ayudar a las empresas y a sus líderes a construir <strong>sistemas organizacionales inteligentes</strong> que conecten estrategia, operación, personas y resultados, liberando tiempo mental y transformando el crecimiento desordenado en claridad y trascendencia.
            </div>
          </div>

          <div style="padding-bottom:14px;border-bottom:1px solid #E6E6E6;">
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#426EAE;letter-spacing:0.15em;">02. HOW • LA METODOLOGIA DIFERENCIADORA (COMO LO HACEMOS)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:12px;color:#333333;line-height:1.5;margin-top:4px;">
              <strong>Diagnóstico Profundo (5 Por Qués):</strong> Escuchamos antes de proponer y resolvemos antes de producir.<br/>
              <strong>Arquitectura Hub &amp; Spoke:</strong> Integramos procesos, Zoho One, formulaciones B2B, narrativa visual e IA.<br/>
              <strong>Evolución Conjunta:</strong> Tableros ejecutivos en tiempo real, trazabilidad financiera y mejora continua.
            </div>
          </div>

          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;letter-spacing:0.15em;">03. WHAT • EL ECOSISTEMA DE 4 UNIDADES (QUE ENTREGAMOS)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:12px;color:#333333;line-height:1.5;margin-top:4px;">
              <strong>ImproBears Consulting</strong> (arquitectura operacional y productividad), <strong>ImproBears Ingredients</strong> (biotecnología e ingredientes funcionales B2B), <strong>ImproBears Studio</strong> (comunicación audiovisual estratégica) e <strong>ImproBears AI</strong> (agentes autónomos y software propio).
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 4)}
    </section>
    """)

    # =========================================================================
    # LAMINA 05: ESENCIA DE MARCA (MISION, VISION Y LAS 6 MAXIMAS DE FILOSOFIA - PASO 1.2)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-05">
      {top_curves_svg(1)}
      {header_html("02", "ESENCIA DE MARCA • MISION, VISION Y LAS 6 MAXIMAS DE FILOSOFIA (PASO 1.2)", 5)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <svg viewBox="0 0 1200 46" width="100%" height="42" style="display:block;">
          <path d="M60,24 C320,4 480,44 600,24 C720,4 880,44 1140,24" fill="none" stroke="#4C9DE6" stroke-width="2" stroke-dasharray="6,4"/>
          <circle cx="180" cy="18" r="7" fill="#0D2540"/><circle cx="180" cy="18" r="3" fill="#FF7A00"/>
          <circle cx="600" cy="24" r="7" fill="#426EAE"/><circle cx="600" cy="24" r="3" fill="#FFFFFF"/>
          <circle cx="1020" cy="20" r="7" fill="#FF7A00"/><circle cx="1020" cy="20" r="3" fill="#FFFFFF"/>
        </svg>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;flex:1;align-items:start;">
          <div style="padding:0 24px 0 6px;border-right:1px solid #E6E6E6;height:100%;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">01 • MISION INSTITUCIONAL</div>
              <h3 style="font-family:'Montserrat',sans-serif;font-size:19px;font-weight:800;color:#0D2540;margin:6px 0 8px 0;line-height:1.18;">
                Diseñar sistemas prácticos, claros y sostenibles.
              </h3>
              <div style="width:42px;height:3px;background:#0D2540;margin-bottom:10px;"></div>
              <p style="font-family:'Avenir Next',sans-serif;font-size:12px;color:#333333;line-height:1.52;margin:0 0 14px 0;">
                Diseñar e implementar sistemas organizacionales, tecnológicos, comerciales y de producto que permitan a las empresas operar con mayor alineación, enfoque y capacidad de crecimiento real.
              </p>
              <div style="border-left:2.5px solid #426EAE;padding-left:12px;font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.5;">
                • Procesos auditables y sin fricción<br/>
                • Ecosistema Zoho One + IA integrado<br/>
                • Equipos con responsabilidades RACI<br/>
                • Rentabilidad y control financiero
              </div>
            </div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.12em;padding-top:10px;border-top:1px solid #E6E6E6;">
              ESTRATEGIA ATERRIZADA EN OPERACION
            </div>
          </div>

          <div style="padding:0 24px;border-right:1px solid #E6E6E6;height:100%;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#426EAE;letter-spacing:0.16em;">02 • VISION DE FUTURO</div>
              <h3 style="font-family:'Montserrat',sans-serif;font-size:19px;font-weight:800;color:#0D2540;margin:6px 0 8px 0;line-height:1.18;">
                Referente en Arquitectura Empresarial e IA.
              </h3>
              <div style="width:42px;height:3px;background:#426EAE;margin-bottom:10px;"></div>
              <p style="font-family:'Avenir Next',sans-serif;font-size:12px;color:#333333;line-height:1.52;margin:0 0 14px 0;">
                Consolidarse como la firma referente en arquitectura operacional, productividad estratégica, ingredientes de innovación B2B, comunicación audiovisual ejecutiva y transformación con IA aplicada.
              </p>
              <div style="border-left:2.5px solid #FF7A00;padding-left:12px;font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.5;">
                • Estándar B2B en México y Norteamérica<br/>
                • Sinergia entre las 4 divisiones del grupo<br/>
                • Plataformas SaaS propias de alto impacto<br/>
                • Relaciones de largo plazo con líderes
              </div>
            </div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;letter-spacing:0.12em;padding-top:10px;border-top:1px solid #E6E6E6;">
              LIDERAZGO MULTIDISCIPLINARIO B2B
            </div>
          </div>

          <div style="padding:0 6px 0 24px;height:100%;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">03 • FILOSOFIA NUCLEAR (6 MAXIMAS)</div>
              <h3 style="font-family:'Montserrat',sans-serif;font-size:19px;font-weight:800;color:#0D2540;margin:6px 0 8px 0;line-height:1.18;">
                Lo que ImproBears cree firmemente.
              </h3>
              <div style="width:42px;height:3px;background:#FF7A00;margin-bottom:10px;"></div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.58;">
                <strong style="color:#FF7A00;">01.</strong> Una tarea no gestionada no existe.<br/>
                <strong style="color:#FF7A00;">02.</strong> La productividad no es trabajar más, es tener sistema.<br/>
                <strong style="color:#FF7A00;">03.</strong> La estrategia no sirve si no aterriza en operación.<br/>
                <strong style="color:#426EAE;">04.</strong> La claridad organizacional libera tiempo mental.<br/>
                <strong style="color:#426EAE;">05.</strong> Las empresas necesitan estructura antes de crecer.<br/>
                <strong style="color:#426EAE;">06.</strong> La tecnología se adapta a la empresa, no al revés.
              </div>
            </div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.12em;padding-top:10px;border-top:1px solid #E6E6E6;">
              PROMESA: MENOS FRICCION, MAS ESTRUCTURA
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 5)}
    </section>
    """)

    # =========================================================================
    # LAMINA 06: LOS 6 PRINCIPIOS Y RELACION CON CLIENTES (PASO 1.3)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-06">
      {top_curves_svg(0)}
      {header_html("02", "PRINCIPIOS QUE NOS GUIAN Y RELACION CON NUESTROS CLIENTES (PASO 1.3)", 6)}
      <div class="plate-body" style="display:grid;grid-template-columns:1.12fr 0.88fr;gap:32px;align-items:center;">
        <div style="display:flex;flex-direction:column;gap:16px;padding-right:18px;border-right:1px solid #E6E6E6;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;letter-spacing:0.16em;">PRINCIPIOS QUE NOS GUIAN</div>
            <div style="width:46px;height:3px;background:#FF7A00;margin-top:4px;"></div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);column-gap:18px;row-gap:18px;">
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" style="margin-bottom:4px;">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#426EAE" stroke-width="2"/>
                <circle cx="18" cy="18" r="4" fill="#FF7A00"/>
                <line x1="18" y1="0" x2="18" y2="6" stroke="#FF7A00" stroke-width="2"/>
                <line x1="18" y1="30" x2="18" y2="36" stroke="#FF7A00" stroke-width="2"/>
              </svg>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:11.5px;color:#0D2540;">Claridad</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.4;margin-top:2px;">Convertimos complejidad en claridad visual y accionable.</div>
            </div>
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" style="margin-bottom:4px;">
                <path d="M18,4 L30,9 L30,18 C30,26 24,31 18,34 C12,31 6,26 6,18 L6,9 Z" fill="none" stroke="#0D2540" stroke-width="2"/>
                <polyline points="13,18 17,22 24,14" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
              </svg>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:11.5px;color:#0D2540;">Confianza</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.4;margin-top:2px;">Relaciones de largo plazo basadas en transparencia y ética.</div>
            </div>
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" style="margin-bottom:4px;">
                <circle cx="10" cy="12" r="5" fill="none" stroke="#0D2540" stroke-width="2"/>
                <circle cx="26" cy="12" r="5" fill="none" stroke="#426EAE" stroke-width="2"/>
                <circle cx="18" cy="26" r="5" fill="none" stroke="#FF7A00" stroke-width="2"/>
                <line x1="15" y1="12" x2="21" y2="12" stroke="#0D2540" stroke-width="2"/>
                <line x1="13" y1="16" x2="16" y2="22" stroke="#0D2540" stroke-width="2"/>
                <line x1="23" y1="16" x2="20" y2="22" stroke="#0D2540" stroke-width="2"/>
              </svg>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:11.5px;color:#0D2540;">Sistemas</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.4;margin-top:2px;">Todo conectado e interdependiente; cero esfuerzos aislados.</div>
            </div>
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" style="margin-bottom:4px;">
                <circle cx="18" cy="11" r="5" fill="none" stroke="#FF7A00" stroke-width="2.2"/>
                <path d="M8,30 C8,22 28,22 28,30" fill="none" stroke="#0D2540" stroke-width="2.2"/>
              </svg>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:11.5px;color:#0D2540;">Humanos</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.4;margin-top:2px;">Las personas al centro; el sistema libera al líder humano.</div>
            </div>
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" style="margin-bottom:4px;">
                <circle cx="18" cy="18" r="13" fill="none" stroke="#426EAE" stroke-width="2"/>
                <circle cx="18" cy="18" r="7" fill="none" stroke="#0D2540" stroke-width="2"/>
                <circle cx="18" cy="18" r="2.5" fill="#FF7A00"/>
              </svg>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:11.5px;color:#0D2540;">Resultados</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.4;margin-top:2px;">Enfocados en indicadores sostenibles, financieros y medibles.</div>
            </div>
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" style="margin-bottom:4px;">
                <path d="M6,28 Q18,24 28,8" fill="none" stroke="#FF7A00" stroke-width="3" stroke-linecap="round"/>
                <polygon points="30,5 22,8 28,14" fill="#FF7A00"/>
              </svg>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:11.5px;color:#0D2540;">Crecimiento</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.4;margin-top:2px;">Siempre una flecha ascendente hacia la evolución continua.</div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:16px;padding-top:10px;border-top:1px solid #E6E6E6;">
            <img src="{photo_boardroom}" alt="Sala de Juntas ImproBears" style="width:195px;height:122px;object-fit:cover;object-position:center 10%;border-radius:16px 34px 16px 16px;border-bottom:3px solid #FF7A00;flex-shrink:0;display:block;" />
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.42;">
              <strong style="color:#0D2540;font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:0.08em;">ACOMPAÑAMIENTO EJECUTIVO HOMBRO A HOMBRO</strong><br/>
              Profesionalizamos la idea del cliente sin imponer; solucionamos con arquitectura y calidez humana.
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#426EAE;letter-spacing:0.15em;">RELACION CON NUESTROS CLIENTES</div>
            <div style="width:46px;height:3px;background:#426EAE;margin-top:4px;"></div>
          </div>

          <div style="position:relative;padding-left:28px;display:flex;flex-direction:column;gap:16px;">
            <svg width="24" height="300" viewBox="0 0 24 300" style="position:absolute;left:0;top:6px;">
              <line x1="12" y1="8" x2="12" y2="275" stroke="#4C9DE6" stroke-width="2" stroke-dasharray="4,4"/>
              <circle cx="12" cy="12" r="6" fill="#0D2540"/>
              <circle cx="12" cy="76" r="6" fill="#426EAE"/>
              <circle cx="12" cy="140" r="6" fill="#426EAE"/>
              <circle cx="12" cy="204" r="6" fill="#FF7A00"/>
              <circle cx="12" cy="268" r="6" fill="#FF7A00"/>
            </svg>
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">01. Aliados estratégicos, no proveedores</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#707070;">Nos integramos al negocio como socios de evolución a largo plazo.</div>
            </div>
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">02. Escuchamos antes de proponer</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#707070;">Comprendemos la visión y dolor real del fundador antes de diseñar.</div>
            </div>
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">03. Diagnóstico profundo, soluciones aterrizadas</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#707070;">Cero teoría abstracta; arquitectura lista para operar desde el día uno.</div>
            </div>
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">04. Acompañamos la implementación</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#707070;">Ejecución hombro a hombro con el equipo directivo y operativo.</div>
            </div>
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">05. Medimos, optimizamos y evolucionamos juntos</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#707070;">Mejora continua con indicadores claros en tableros ejecutivos.</div>
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 6)}
    </section>
    """)

    # =========================================================================
    # LAMINA 07: LA EMPRESA COMO PERSONA (BRAND PERSONA: JORGE BENITEZ "EL OSO" — PASO 1.4)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-07">
      {top_curves_svg(1)}
      {header_html("02", "LA EMPRESA COMO PERSONA • BRAND PERSONA: JORGE BENITEZ (PASO 1.4)", 7)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.82fr 1.18fr;gap:32px;align-items:center;">
        <!-- Izquierda: Retrato Vivo de Jorge Benítez con el Oso Estratégico detrás sobre Blanco + Curvas SVG -->
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding-right:20px;border-right:1px solid #E6E6E6;">
          <div style="position:relative;width:276px;height:256px;display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 280 260" width="280" height="260" style="position:absolute;inset:0;pointer-events:none;">
              <path d="M18,195 A122,122 0 1,1 262,195" fill="none" stroke="#426EAE" stroke-width="3"/>
              <path d="M32,212 A114,114 0 0,1 248,96" fill="none" stroke="#FF7A00" stroke-width="3.5" stroke-linecap="round"/>
              <circle cx="248" cy="96" r="5" fill="#FF7A00"/>
              <circle cx="18" cy="195" r="4.5" fill="#426EAE"/>
            </svg>
            <img src="{jb_hero}" alt="Jorge Benítez — La Empresa como Persona" style="width:228px;height:228px;border-radius:50%;object-fit:cover;object-position:center top;display:block;" />
          </div>
          <div style="margin-top:6px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">SI IMPROBEARS FUERA UNA PERSONA</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:#0D2540;margin:2px 0;">JORGE BENITEZ (“EL OSO”)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11px;font-weight:600;color:#426EAE;margin-bottom:6px;">
              Arquitecto de Sistemas, Estratega Práctico y Aliado Leal
            </div>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.2px;font-style:italic;color:#333333;line-height:1.44;margin:0;">
              “Un líder sereno, protector y estructurado que entiende tu idea sin imponer, convierte el caos en sistema y camina hombro a hombro contigo hasta ver resultados reales.”
            </p>
          </div>
        </div>

        <!-- Derecha: Retrato Psicológico, Carácter y las 4 Dimensiones Personales de Jorge Benítez en Flujo Abierto -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="padding-bottom:12px;border-bottom:1px solid #E6E6E6;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">ESENCIA HUMANA Y CARACTER DE LA MARCA</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:19px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              Fuerza tranquila, mente de ingeniero y calidez de socio.
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.8px;color:#333333;line-height:1.5;margin:0;">
              Personificar a <strong>ImproBears</strong> es describir a <strong>Jorge Benítez</strong>: un estratega curioso e incansable que une mundos que rara vez se tocan —la ingeniería de procesos y finanzas, la ciencia de ingredientes, la estética cinematográfica y la inteligencia artificial— bajo una sola filosofía: <strong>hacer que las cosas funcionen con orden, belleza y rentabilidad para liberar tiempo de vida</strong>.
            </p>
          </div>

          <!-- Las 4 Facetas de Jorge Benítez conectadas en flujo abierto -->
          <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:14px;">
            <div style="border-left:3px solid #426EAE;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;">01. El Arquitecto de Claridad (Mente Sistémica)</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:2px;">
                Ve conexiones donde otros ven caos. Escucha con paciencia, hace las preguntas correctas (5 Por Qués) y traduce problemas complejos en flujos simples y medibles.
              </div>
            </div>
            <div style="border-left:3px solid #FF7A00;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;">02. El Protector Leal (“El Oso” como Respaldo)</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:2px;">
                Su presencia transmite calma, certeza y respaldo. Cuida a su familia, a su equipo y el patrimonio de sus clientes como propios; su palabra vale más que cualquier contrato.
              </div>
            </div>
            <div style="border-left:3px solid #0D2540;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;">03. Creador Multidisciplinario y Perfeccionista Práctico</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:2px;">
                Combina rigor técnico e industrial con sensibilidad visual y narrativa. No tolera lo improvisado ni los parches superficiales: busca soluciones de raíz con acabado impecable.
              </div>
            </div>
            <div style="border-left:3px solid #4C9DE6;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;">04. Innovador con Propósito Humano</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:2px;">
                Adopta la tecnología más avanzada y construye agentes de IA no por moda, sino para que el ser humano deje de ser esclavo de la operación y recupere su libertad mental.
              </div>
            </div>
          </div>

          <div style="padding-top:10px;border-top:1px solid #E6E6E6;display:flex;align-items:center;justify-content:space-between;font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;">
            <span>ARQUETIPO TRIPLE: <span style="color:#426EAE;">EL SABIO ESTRATEGICO</span> + <span style="color:#FF7A00;">EL CREADOR</span> + <span style="color:#0D2540;">EL GUARDIAN PROTECTOR</span></span>
            <span style="color:#FF7A00;">VOZ: CLARA · CERCANA · EJECUTIVA</span>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 7)}
    </section>
    """)

    # =========================================================================
    # LAMINA 08: CODIGO DE CONDUCTA, VOZ Y ESPECTRO KANSEI DE LA PERSONA (PASO 1.5)
    # =========================================================================
    sliders_data = [
        ("Tradicional", "Innovador / Vanguardista", 78),
        ("Minimalista / Limpio", "Complejo / Ornamentado", 22),
        ("Cercano / Aliado", "Autoritario / Corporativo", 58),
        ("Humano / Empático", "Tecnológico / Sistémico", 56),
        ("Serio / Ejecutivo", "Juguetón / Casual", 18),
        ("Convencional", "Transformador / Disruptivo", 74),
        ("Orgánico / Fluido", "Geométrico / Estructurado", 76),
    ]
    bars_html = ""
    for left_l, right_l, pct in sliders_data:
        bars_html += f"""
        <div style="margin-bottom:9px;">
          <div style="display:flex;justify-content:space-between;font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:700;color:#0D2540;margin-bottom:3px;">
            <span>{left_l}</span><span style="color:#FF7A00;font-weight:800;">{pct}%</span><span>{right_l}</span>
          </div>
          <svg viewBox="0 0 400 10" width="100%" height="10" style="display:block;">
            <line x1="0" y1="5" x2="400" y2="5" stroke="#E6E6E6" stroke-width="3" stroke-linecap="round"/>
            <line x1="0" y1="5" x2="{int(pct * 4)}" y2="5" stroke="#426EAE" stroke-width="3" stroke-linecap="round"/>
            <circle cx="{int(pct * 4)}" cy="5" r="4.5" fill="#FF7A00"/>
          </svg>
        </div>
        """

    plates.append(f"""
    <section class="benefic-plate" id="plate-08">
      {top_curves_svg(0)}
      {header_html("02", "VOZ, CONDUCTA Y CALIBRACION KANSEI DE LA PERSONA IMPROBEARS (PASO 1.5)", 8)}
      <div class="plate-body" style="display:grid;grid-template-columns:1.04fr 0.96fr;gap:36px;align-items:center;">
        <div style="padding-right:20px;border-right:1px solid #E6E6E6;">
          <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#426EAE;letter-spacing:0.15em;margin-bottom:10px;">
            CALIBRACION PSICOMETRICA • 7 VECTORES KANSEI DE JORGE / IMPROBEARS
          </div>
          <div>{bars_html}</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#707070;margin-top:8px;">
            <strong style="color:#0D2540;">Equilibrio Personal:</strong> Vanguardia tecnológica e innovación (78%) y estructura clara (76%), equilibradas con empatía humana (56%) y sobriedad ejecutiva.
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:22px;">
          <div style="border-left:3.5px solid #426EAE;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;letter-spacing:0.14em;margin-bottom:6px;">
              COMO HABLA Y ACTUA ESTA PERSONA (LO QUE SI ES)
            </div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.8px;color:#333333;line-height:1.54;">
              <strong style="color:#426EAE;">•</strong> Habla con claridad ejecutiva, sin tecnicismos innecesarios ni rodeos.<br/>
              <strong style="color:#426EAE;">•</strong> Primero escucha la idea del cliente y luego la profesionaliza con método.<br/>
              <strong style="color:#426EAE;">•</strong> Une estrategia, ciencia, diseño e inteligencia artificial con sentido práctico.<br/>
              <strong style="color:#426EAE;">•</strong> Transmite orden, limpieza visual, confianza y acompañamiento real.
            </div>
          </div>

          <svg width="100%" height="14" viewBox="0 0 420 14">
            <path d="M0,7 C140,0 280,14 420,7" fill="none" stroke="#E6E6E6" stroke-width="1.5"/>
          </svg>

          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;margin-bottom:6px;">
              LO QUE JAMAS HARIA NI DIRIA (FRONTERAS DE IDENTIDAD)
            </div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.8px;color:#333333;line-height:1.54;">
              <strong style="color:#FF7A00;">×</strong> Jamás actúa como “vende-humo” ni promete resultados mágicos sin sistema.<br/>
              <strong style="color:#FF7A00;">×</strong> Jamás impone su ego sobre la necesidad real del cliente.<br/>
              <strong style="color:#FF7A00;">×</strong> Jamás entrega parches improvisados ni deja al cliente solo tras diagnosticar.<br/>
              <strong style="color:#FF7A00;">×</strong> Jamás usa estética ruidosa, pesada o encerrada en cajas rígidas.
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 8)}
    </section>
    """)

    # =========================================================================
    # LAMINA 09: ARQUITECTURA GENERAL DE TOUCHPOINTS (PASO 2 — ANTES DEL NOMBRE)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-09">
      {top_curves_svg(1)}
      {header_html("03", "INGENIERIA DE TOUCHPOINTS • MAPA DE CONTACTO REAL CON EL CLIENTE (PASO 2)", 9)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
        <!-- Introducción de Paso 2 (Touchpoints reales de contacto con el cliente antes del Naming) -->
        <div style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:28px;align-items:center;padding-bottom:10px;border-bottom:1px solid #E6E6E6;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">PASO 2 DE LA METODOLOGIA • PUNTOS DE CONTACTO REALES CON EL CLIENTE</div>
            <h2 style="font-family:'Montserrat',sans-serif;font-size:20.5px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              Cómo nos descubre, nos compra y convive el cliente con cada marca.
            </h2>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.5px;color:#333333;line-height:1.46;margin:0;">
              Antes de hablar del nombre, definimos los <strong>puntos de contacto reales con el cliente</strong> según la división: desde las <strong>redes sociales, la página web y el agente automatizado de WhatsApp</strong>, hasta la <strong>compra fácil, capacitación in situ, sesión de video, envío de productos/documentos, portal Zoho Books y encuesta de servicio</strong>.
            </p>
          </div>
          <div style="border-left:3.5px solid #426EAE;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;letter-spacing:0.12em;">CRITERIO RECTOR DE TOUCHPOINTS</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.3px;color:#426EAE;font-weight:600;line-height:1.45;margin-top:3px;">
              “Todo punto de contacto con el cliente debe ser ágil, claro y sin fricción: fácil de contactar, fácil de comprar, impecable en persona y transparente en su portal.”
            </div>
          </div>
        </div>

        <!-- Gran Diagrama Vectorial en Curvas tipo Illustrator de las 3 Etapas del Viaje del Cliente -->
        <svg viewBox="0 0 1200 102" width="100%" height="94" style="display:block;">
          <!-- Curvas fluidas de conexión entre Antes, Durante y Después -->
          <path d="M70,65 C240,10 380,100 600,52 C820,4 960,95 1130,32" fill="none" stroke="#426EAE" stroke-width="3"/>
          <path d="M70,78 C260,30 400,105 600,64 C800,20 950,98 1130,44" fill="none" stroke="#FF7A00" stroke-width="2" stroke-dasharray="6,5"/>
          <!-- Estación 1: ANTES -->
          <circle cx="200" cy="48" r="22" fill="#FFFFFF" stroke="#426EAE" stroke-width="3.5"/>
          <text x="200" y="52" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="11">01</text>
          <text x="200" y="88" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="10.5" letter-spacing="1">MOMENTO 1: ANTES</text>
          <!-- Estación 2: DURANTE -->
          <circle cx="600" cy="52" r="22" fill="#FFFFFF" stroke="#FF7A00" stroke-width="3.5"/>
          <text x="600" y="56" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="11">02</text>
          <text x="600" y="92" text-anchor="middle" fill="#FF7A00" font-family="Montserrat" font-weight="800" font-size="10.5" letter-spacing="1">MOMENTO 2: DURANTE</text>
          <!-- Estación 3: DESPUÉS -->
          <circle cx="1000" cy="46" r="22" fill="#FFFFFF" stroke="#0D2540" stroke-width="3.5"/>
          <text x="1000" y="50" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="11">03</text>
          <text x="1000" y="86" text-anchor="middle" fill="#426EAE" font-family="Montserrat" font-weight="800" font-size="10.5" letter-spacing="1">MOMENTO 3: DESPUES</text>
          <!-- Flecha final de crecimiento -->
          <polygon points="1142,26 1124,26 1133,40" fill="#FF7A00"/>
        </svg>

        <!-- 3 Columnas Abiertas Resumen del Viaje Real del Cliente (Cero Cajas) -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;flex:1;align-items:start;">
          <div style="padding:0 22px 0 4px;border-right:1px solid #E6E6E6;">
            <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#426EAE;letter-spacing:0.12em;">1. ANTES DE COMPRAR (PRIMER CONTACTO)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.1px;color:#333333;line-height:1.46;margin-top:4px;">
              • <strong>Contacto en Redes Sociales:</strong> LinkedIn, Instagram, YouTube y Reels por submarca.<br/>
              • <strong>Página Web:</strong> Portales claros (<code>improbears.com</code> y divisiones) con catálogo y casos.<br/>
              • <strong>WhatsApp con Agente Automatizado:</strong> Atención inmediata 24/7, dudas y citas.<br/>
              • <strong>Solicitud de Capacitaciones o Proyectos:</strong> Formularios ágiles de cotización o muestras.
            </div>
          </div>

          <div style="padding:0 22px;border-right:1px solid #E6E6E6;">
            <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#FF7A00;letter-spacing:0.12em;">2. DURANTE LA COMPRA Y SERVICIO</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.1px;color:#333333;line-height:1.46;margin-top:4px;">
              • <strong>Compra Fácil y Envío de Documentos:</strong> Propuestas, contratos y pago sin fricción.<br/>
              • <strong>Capacitación In Situ:</strong> Talleres y consultoría presencial en instalaciones del cliente.<br/>
              • <strong>Sesión de Video:</strong> Rodaje y dirección audiovisual en locación (<em>Studio</em>).<br/>
              • <strong>Envío de Productos:</strong> Entrega de insumos y muestras con rastreo (<em>Ingredients</em>).
            </div>
          </div>

          <div style="padding:0 4px 0 22px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;letter-spacing:0.12em;">3. DESPUES DE COMPRAR (POST-VENTA)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.1px;color:#333333;line-height:1.46;margin-top:4px;">
              • <strong>Portal de Clientes de Zoho Books:</strong> Estados de cuenta, facturas CFDI y pagos.<br/>
              • <strong>Envío de Documentos Finales:</strong> Manuales, certificados COA/SDS, constancias y videos.<br/>
              • <strong>Encuesta de Servicio:</strong> Evaluación de satisfacción al cerrar cada entrega.<br/>
              • <strong>WhatsApp Post-Venta y Recompra:</strong> Soporte continuo, resurtido y nuevos proyectos.
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 9)}
    </section>
    """)

    # =========================================================================
    # LAMINA 10: TOUCHPOINTS MOMENTO 1 - ANTES DE COMPRAR (PASO 2.1)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-10">
      {top_curves_svg(0)}
      {header_html("03", "TOUCHPOINTS MOMENTO 1: ANTES DE COMPRAR • REDES, WEB, WHATSAPP Y SOLICITUD (PASO 2.1)", 10)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
        <svg viewBox="0 0 1200 42" width="100%" height="38" style="display:block;">
          <path d="M40,22 C280,4 520,40 760,18 C920,6 1060,28 1160,16" fill="none" stroke="#426EAE" stroke-width="2.5"/>
          <circle cx="150" cy="16" r="7" fill="#426EAE"/><circle cx="450" cy="26" r="7" fill="#FF7A00"/>
          <circle cx="750" cy="18" r="7" fill="#0D2540"/><circle cx="1050" cy="20" r="7" fill="#4C9DE6"/>
        </svg>

        <div style="display:grid;grid-template-columns:repeat(2,1fr);column-gap:36px;row-gap:20px;flex:1;align-items:center;">
          <div style="border-left:3.5px solid #426EAE;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">TP-ANT-01 • TODAS LAS MARCAS (SEGUN ESPECIALIDAD)</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Contacto en Redes Sociales (LinkedIn · Instagram · YouTube · Reels)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Primer encuentro a través de contenido útil, reels y publicaciones adaptadas por marca: liderazgo y orden en <em>Consulting</em>, ciencia de insumos en <em>Ingredients</em>, producción audiovisual en <em>Studio</em> y automatización en <em>AI</em>.
            </div>
          </div>

          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;">TP-ANT-02 • ECOSISTEMA DIGITAL IMPROBEARS</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Página Web Institucional y Portales por Submarca (improbears.com)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Sitio web limpio sobre fondo claro donde el visitante explora nuestras 4 divisiones, consulta fichas de productos, revisa videos muestra o prueba nuestras aplicaciones SaaS sin confusión.
            </div>
          </div>

          <div style="border-left:3.5px solid #0D2540;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;letter-spacing:0.14em;">TP-ANT-03 • ATENCION INMEDIATA CONVERSACIONAL</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Contacto por WhatsApp con el Agente Automatizado (24/7)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> El prospecto escribe por WhatsApp y recibe respuesta inmediata y cálida de nuestro agente automatizado, quien orienta según la marca, comparte información inicial y agenda sesión o canaliza el pedido.
            </div>
          </div>

          <div style="border-left:3.5px solid #4C9DE6;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">TP-ANT-04 • CONSULTING · INGREDIENTS · STUDIO · AI</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Solicitud de Capacitaciones, Proyectos, Videos o Muestras</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Punto donde el cliente solicita fácilmente una capacitación o consultoría (<em>Consulting</em>), muestras o cotización de insumos (<em>Ingredients</em>), una sesión de video (<em>Studio</em>) o un desarrollo de IA (<em>AI</em>).
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 10)}
    </section>
    """)

    # =========================================================================
    # LAMINA 11: TOUCHPOINTS MOMENTO 2 - DURANTE LA COMPRA (PASO 2.2)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-11">
      {top_curves_svg(1)}
      {header_html("03", "TOUCHPOINTS MOMENTO 2: DURANTE LA COMPRA • COMPRA FACIL, IN SITU, VIDEO Y ENVIO (PASO 2.2)", 11)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
        <svg viewBox="0 0 1200 42" width="100%" height="38" style="display:block;">
          <path d="M40,18 C300,38 560,6 820,26 C960,34 1080,10 1160,22" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
          <circle cx="150" cy="24" r="7" fill="#426EAE"/><circle cx="450" cy="18" r="7" fill="#FF7A00"/>
          <circle cx="750" cy="22" r="7" fill="#0D2540"/><circle cx="1050" cy="18" r="7" fill="#4C9DE6"/>
        </svg>

        <div style="display:grid;grid-template-columns:repeat(2,1fr);column-gap:36px;row-gap:20px;flex:1;align-items:center;">
          <div style="border-left:3.5px solid #426EAE;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">TP-DUR-01 • TODAS LAS MARCAS (EXPERIENCIA COMERCIAL SIN FRICCION)</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Compra Fácil y Envío de Documentos Comerciales / Legales</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Recepción de propuestas claras, firma digital en 1 clic (Zoho Sign), envío de fichas técnicas y un proceso de <strong>compra fácil</strong> en línea o transferencia directa sin trámites engorrosos.
            </div>
          </div>

          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;">TP-DUR-02 • IMPROBEARS CONSULTING, INGREDIENTS &amp; AI</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Capacitación In Situ y Acompañamiento Presencial / Online</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Sesiones de <strong>capacitación in situ</strong> en las oficinas o planta del cliente, talleres directivos, puesta en marcha de sistemas o asesoría técnica hombro con hombro con el equipo del cliente.
            </div>
          </div>

          <div style="border-left:3.5px solid #0D2540;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;letter-spacing:0.14em;">TP-DUR-03 • IMPROBEARS STUDIO</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Sesión de Video, Dirección Escénica y Rodaje en Locación</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> La experiencia presencial o en estudio durante la <strong>sesión de video</strong> y fotografía: planeación previa, trato humano que da seguridad frente a cámara, orden técnico e iluminación impecable.
            </div>
          </div>

          <div style="border-left:3.5px solid #4C9DE6;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">TP-DUR-04 • IMPROBEARS INGREDIENTS</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Envío de Productos, Muestras Físicas y Notificación de Guía</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> El <strong>envío de productos</strong> e ingredientes funcionales hasta la planta del cliente, con aviso automático de rastreo por WhatsApp/correo, empaque protegido e identificación limpia de lote.
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 11)}
    </section>
    """)

    # =========================================================================
    # LAMINA 12: TOUCHPOINTS MOMENTO 3 - DESPUES DE COMPRAR (PASO 2.3)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-12">
      {top_curves_svg(0)}
      {header_html("03", "TOUCHPOINTS MOMENTO 3: DESPUES DE COMPRAR • PORTAL ZOHO BOOKS Y ENCUESTA (PASO 2.3)", 12)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
        <svg viewBox="0 0 1200 42" width="100%" height="38" style="display:block;">
          <path d="M40,26 C320,8 600,32 880,14 C1010,6 1100,18 1155,8" fill="none" stroke="#0D2540" stroke-width="2.5"/>
          <polygon points="1165,6 1152,4 1156,15" fill="#FF7A00"/>
          <circle cx="150" cy="20" r="7" fill="#426EAE"/><circle cx="450" cy="21" r="7" fill="#FF7A00"/>
          <circle cx="750" cy="19" r="7" fill="#0D2540"/><circle cx="1050" cy="12" r="7" fill="#FF7A00"/>
        </svg>

        <div style="display:grid;grid-template-columns:repeat(2,1fr);column-gap:36px;row-gap:20px;flex:1;align-items:center;">
          <div style="border-left:3.5px solid #426EAE;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">TP-DES-01 • AUTOGESTION ADMINISTRATIVA Y CONTABLE</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Portal de Clientes de Zoho Books (Facturas, Estados de Cuenta y Pagos)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Acceso directo al <strong>Portal de Clientes de Zoho Books</strong> donde el cliente consulta sus cotizaciones, descarga facturas CFDI (PDF/XML), revisa su estado de cuenta histórico y realiza pagos en línea.
            </div>
          </div>

          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;">TP-DES-02 • ENTREGA FORMAL POR MARCA</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Envío de Documentos Finales, Certificados, Manuales y Videos</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> El <strong>envío de documentos</strong> y entregables concluidos: constancias y manuales de capacitación (<em>Consulting</em>), certificados COA/SDS (<em>Ingredients</em>), enlaces de descarga de video (<em>Studio</em>) o manuales de marca/IA (<em>AI</em>).
            </div>
          </div>

          <div style="border-left:3.5px solid #0D2540;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;letter-spacing:0.14em;">TP-DES-03 • ESCUCHA ACTIVA Y MEJORA CONTINUA</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Encuesta de Servicio y Evaluación de Satisfacción del Cliente</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Envío de una <strong>encuesta de servicio</strong> ágil tras cada capacitación, proyecto, sesión de video o entrega de producto para evaluar la atención recibida y perfeccionar la experiencia.
            </div>
          </div>

          <div style="border-left:3.5px solid #4C9DE6;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">TP-DES-04 • CONTINUIDAD Y FIDELIZACION</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">Seguimiento por WhatsApp Automatizado, Soporte y Recompra Fácil</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;line-height:1.45;">
              <strong>Contacto con el cliente:</strong> Atención post-venta por WhatsApp y correo para resolver dudas tras la capacitación, recordar el resurtido de ingredientes o agendar nuevas sesiones de video y consultoría en 1 clic.
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 12)}
    </section>
    """)

    # =========================================================================
    # LAMINA 13: NAMING ESTRATEGICO, SEMIOTICA Y PROTECCION NIZA (PASO 3 — DESPUES DE TOUCHPOINTS)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-13">
      {top_curves_svg(1)}
      {header_html("04", "EL NOMBRE OFICIAL • NAMING ESTRATEGICO, SEMIOTICA Y NIZA (PASO 3)", 13)}
      <div class="plate-body" style="display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;">
        <div style="padding-right:20px;border-right:1px solid #E6E6E6;">
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">CONSTRUCCION MORFOLOGICA Y SEMIOTICA DEL NOMBRE</div>
          <h3 style="font-family:'Montserrat',sans-serif;font-size:30px;font-weight:800;color:#0D2540;margin:4px 0;">
            IMPRO<span style="color:#426EAE;">BEARS</span>
          </h3>
          <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;color:#426EAE;letter-spacing:0.18em;margin-bottom:12px;">
            BUSINESS IMPROVEMENT • MEJORA CONTINUA CON RESPALDO
          </div>

          <svg viewBox="0 0 460 135" width="100%" height="130" style="margin-bottom:10px;">
            <circle cx="95" cy="65" r="54" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
            <text x="95" y="60" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="16">IMPRO-</text>
            <text x="95" y="77" text-anchor="middle" fill="#FF7A00" font-family="Montserrat" font-weight="700" font-size="8.5">IMPROVEMENT</text>
            <path d="M149,65 C195,35 235,95 281,65" fill="none" stroke="#4C9DE6" stroke-width="2.5" stroke-dasharray="4,4"/>
            <circle cx="215" cy="65" r="14" fill="#FFFFFF" stroke="#0D2540" stroke-width="2"/>
            <text x="215" y="70" text-anchor="middle" fill="#FF7A00" font-family="Montserrat" font-weight="800" font-size="14">+</text>
            <circle cx="335" cy="65" r="54" fill="none" stroke="#426EAE" stroke-width="2.5"/>
            <text x="335" y="60" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="16">-BEARS</text>
            <text x="335" y="77" text-anchor="middle" fill="#426EAE" font-family="Montserrat" font-weight="700" font-size="8.5">EL OSO (JORGE)</text>
          </svg>

          <p style="font-family:'Avenir Next',sans-serif;font-size:11.8px;color:#333333;line-height:1.5;margin:0 0 12px 0;">
            <strong>Raíz “IMPRO” (Improvement):</strong> Mejora continua, optimización de sistemas y evolución medible.<br/>
            <strong>Raíz “BEARS” (El Oso / Jorge Benítez):</strong> Respaldo, inteligencia estratégica y fuerza protectora alrededor del líder humano.
          </p>
          <div style="border-top:1px solid #E6E6E6;padding-top:10px;font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#0D2540;">
            <strong>Nomenclatura Endosada:</strong> Raíz maestra <strong>IMPROBEARS</strong> + especialidad en <strong>#FF7A00</strong>: <span style="color:#FF7A00;font-weight:700;">CONSULTING · INGREDIENTS · STUDIO · AI</span>.
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:18px;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;letter-spacing:0.15em;margin-bottom:8px;">
              CLASIFICACION INTERNACIONAL DE NIZA (COBERTURA DE LAS 4 DIVISIONES)
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.46;">
              <div style="border-left:3px solid #426EAE;padding-left:12px;">
                <strong style="color:#0D2540;">Clase 35 (Consulting):</strong> Consultoría en dirección de negocios, eficiencia operativa, arquitectura organizacional y productividad CRM.
              </div>
              <div style="border-left:3px solid #FF7A00;padding-left:12px;">
                <strong style="color:#0D2540;">Clases 01, 30 y 32 (Ingredients):</strong> Extractos naturales de lúpulo (Hopzoil®), edulcorantes botánicos (Verifolia™) e ingredientes funcionales B2B.
              </div>
              <div style="border-left:3px solid #0D2540;padding-left:12px;">
                <strong style="color:#0D2540;">Clase 41 (Studio):</strong> Producción audiovisual corporativa, cine publicitario, fotografía ejecutiva y unidad deportiva (Chorch7).
              </div>
              <div style="border-left:3px solid #4C9DE6;padding-left:12px;">
                <strong style="color:#0D2540;">Clase 42 (AI &amp; SaaS):</strong> Desarrollo de software, plataformas SaaS (Suite TheBest), agentes autónomos de IA e ingeniería cloud.
              </div>
            </div>
          </div>

          <div style="border-top:1.5px solid #E6E6E6;padding-top:12px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#426EAE;letter-spacing:0.14em;margin-bottom:4px;">
              ECOSISTEMA DE DOMINIOS Y CORREOS OFICIALES
            </div>
            <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;color:#0D2540;line-height:1.55;">
              Dominio Rector: <span style="color:#426EAE;">improbears.com</span><br/>
              Subdominios: <span style="color:#426EAE;">consulting · ingredients · studio · ai (.improbears.com)</span><br/>
              Contacto Oficial: <span style="color:#FF7A00;">jorge.benitez@improbears.com · sales@improbears.com</span>
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 13)}
    </section>
    """)

    # =========================================================================
    # LAMINA 14: ARQUITECTURA MAESTRA DE MARCA (MADRE + 4 SUBMARCAS EN POSITIVO SOBRE BLANCO)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-14">
      {top_curves_svg(0)}
      {header_html("04", "ARQUITECTURA MAESTRA DE MARCA • MARCA MADRE Y 4 SUBMARCAS (PASO 4)", 14)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:8px;">
        <div style="position:relative;display:flex;align-items:center;justify-content:space-between;padding:2px 12px 10px 12px;">
          <div style="display:flex;align-items:center;gap:16px;">
            <img src="{m_logo}" alt="ImproBears Master Positivo" style="width:74px;height:74px;object-fit:contain;display:block;flex-shrink:0;" />
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.18em;">MARCA MADRE CORPORATIVA (MASTER BRAND EN POSITIVO PRINCIPAL)</div>
              <div style="font-family:'Montserrat',sans-serif;font-size:21px;font-weight:800;color:#0D2540;letter-spacing:0.01em;">IMPROBEARS — BUSINESS IMPROVEMENT</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11.5px;color:#426EAE;font-weight:600;">Arquitectos de sistemas de productividad • Respaldo estratégico, gobernanza y visión integral del ecosistema.</div>
            </div>
          </div>
          <div style="text-align:right;border-left:3px solid #FF7A00;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;letter-spacing:0.14em;">ARQUITECTURA ENDOSADA</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:800;color:#FF7A00;">4 SUBMARCAS HOMOLOGADAS</div>
          </div>
        </div>

        <svg viewBox="0 0 1200 28" width="100%" height="24" preserveAspectRatio="none" style="display:block;">
          <path d="M150,26 C150,8 420,12 600,2 C780,12 1050,8 1050,26" fill="none" stroke="#426EAE" stroke-width="2"/>
          <path d="M450,26 C450,12 540,8 600,2 C660,8 750,12 750,26" fill="none" stroke="#FF7A00" stroke-width="2"/>
          <circle cx="600" cy="3" r="4" fill="#FF7A00"/>
          <circle cx="150" cy="24" r="3.5" fill="#426EAE"/>
          <circle cx="450" cy="24" r="3.5" fill="#FF7A00"/>
          <circle cx="750" cy="24" r="3.5" fill="#0D2540"/>
          <circle cx="1050" cy="24" r="3.5" fill="#4C9DE6"/>
        </svg>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;flex:1;align-items:stretch;">
          <!-- SUBMARCA 1: CONSULTING -->
          <div style="padding:4px 14px 4px 6px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;justify-content:space-between;gap:8px;align-items:center;text-align:center;">
            <img src="{c_logo}" alt="ImproBears Consulting" style="height:104px;object-fit:contain;display:block;" />
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">CONSULTING</span></div>
              <div style="font-family:'Montserrat',sans-serif;font-size:7.8px;font-weight:800;color:#426EAE;margin:2px 0 4px 0;letter-spacing:0.08em;">4 BARRAS DE CRECIMIENTO</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10.3px;color:#333333;line-height:1.34;">
                Arquitectura operacional, productividad estratégica, Zoho One, PMI/RACI y transformación organizacional.
              </div>
            </div>
            <img src="{photo_boardroom}" alt="Consulting" style="width:100%;height:136px;object-fit:cover;object-position:center 10%;border-radius:14px 30px 14px 14px;border-bottom:3px solid #426EAE;display:block;" />
            <div style="width:100%;border-top:1.5px solid #E6E6E6;padding-top:5px;font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;color:#426EAE;">
              consulting.improbears.com
            </div>
          </div>

          <!-- SUBMARCA 2: INGREDIENTS -->
          <div style="padding:4px 14px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;justify-content:space-between;gap:8px;align-items:center;text-align:center;">
            <img src="{i_logo}" alt="ImproBears Ingredients" style="height:104px;object-fit:contain;display:block;" />
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">INGREDIENTS</span></div>
              <div style="font-family:'Montserrat',sans-serif;font-size:7.8px;font-weight:800;color:#FF7A00;margin:2px 0 4px 0;letter-spacing:0.08em;">NODOS MOLECULARES B2B</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10.3px;color:#333333;line-height:1.34;">
                Innovación biotecnológica e ingredientes funcionales B2B (Hopzoil®, Verifolia™, GranoBrew) y formulación científica.
              </div>
            </div>
            <img src="{photo_hopzoil}" alt="Ingredients Hopzoil" style="width:100%;height:136px;object-fit:cover;object-position:center center;border-radius:14px 30px 14px 14px;border-bottom:3px solid #FF7A00;display:block;" />
            <div style="width:100%;border-top:1.5px solid #E6E6E6;padding-top:5px;font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;color:#FF7A00;">
              ingredients.improbears.com
            </div>
          </div>

          <!-- SUBMARCA 3: STUDIO -->
          <div style="padding:4px 14px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;justify-content:space-between;gap:8px;align-items:center;text-align:center;">
            <img src="{s_logo}" alt="ImproBears Studio" style="height:104px;object-fit:contain;display:block;" />
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">STUDIO</span></div>
              <div style="font-family:'Montserrat',sans-serif;font-size:7.8px;font-weight:800;color:#426EAE;margin:2px 0 4px 0;letter-spacing:0.08em;">CAMARA CINEMATOGRAFICA</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10.3px;color:#333333;line-height:1.34;">
                Producción audiovisual B2B, Videos Hero con rótulos dinámicos, storytelling visual, reels y unidad Chorch7.
              </div>
            </div>
            <img src="{photo_studio_rotulo}" alt="ImproBears Studio Fotograma Real con Rótulo" style="width:100%;height:136px;object-fit:cover;object-position:center center;border-radius:6px 28px 14px 14px;border-bottom:3px solid #0D2540;display:block;" />
            <div style="width:100%;border-top:1.5px solid #E6E6E6;padding-top:5px;font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;color:#0D2540;">
              studio.improbears.com
            </div>
          </div>

          <!-- SUBMARCA 4: AI -->
          <div style="padding:4px 6px 4px 14px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;align-items:center;text-align:center;">
            <img src="{a_logo}" alt="ImproBears AI" style="height:104px;object-fit:contain;display:block;" />
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">AI</span></div>
              <div style="font-family:'Montserrat',sans-serif;font-size:7.8px;font-weight:800;color:#FF7A00;margin:2px 0 4px 0;letter-spacing:0.08em;">NUCLEO NEURONAL COGNITIVO</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10.3px;color:#333333;line-height:1.34;">
                Sistemas multi-agente autónomos (Proyecto Aura ImproBears), automatización cognitiva y Suite SaaS TheBest.
              </div>
            </div>
            <img src="{photo_ai_woman}" alt="ImproBears AI" style="width:100%;height:136px;object-fit:cover;object-position:center 12%;border-radius:14px 30px 14px 14px;border-bottom:3px solid #4C9DE6;display:block;" />
            <div style="width:100%;border-top:1.5px solid #E6E6E6;padding-top:5px;font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;color:#426EAE;">
              ai.improbears.com
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 14)}
    </section>
    """)

    # =========================================================================
    # LAMINA 15: ANATOMIA SEMIOTICA DEL SIMBOLO MAESTRO EN POSITIVO (PASO 4.1)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-15">
      {top_curves_svg(1)}
      {header_html("04", "SISTEMA DE LOGOTIPOS • ANATOMIA DEL SIMBOLO MAESTRO EN POSITIVO", 15)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.86fr 1.14fr;gap:32px;align-items:center;">
        <div style="position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding-right:18px;border-right:1px solid #E6E6E6;">
          <div style="position:relative;width:270px;height:270px;display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 270 270" width="270" height="270" style="position:absolute;inset:0;pointer-events:none;">
              <circle cx="135" cy="135" r="126" fill="none" stroke="#E6E6E6" stroke-width="1.5" stroke-dasharray="5,5"/>
              <path d="M22,95 A120,120 0 0,1 248,95" fill="none" stroke="#426EAE" stroke-width="2"/>
              <path d="M40,210 A120,120 0 0,0 230,210" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
              <circle cx="22" cy="95" r="4" fill="#426EAE"/><circle cx="248" cy="95" r="4" fill="#426EAE"/>
            </svg>
            <img src="{m_logo}" alt="Sello Maestro Positivo Oficial" style="width:215px;height:215px;object-fit:contain;display:block;" />
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;letter-spacing:0.14em;margin-top:4px;">
            CONFIGURACION POSITIVA POR DEFECTO SOBRE #FFFFFF
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:10px;padding-top:10px;border-top:1px solid #E6E6E6;text-align:left;">
            <img src="{founder}" alt="Jorge Benitez" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid #FF7A00;flex-shrink:0;" />
            <div style="font-family:'Avenir Next',sans-serif;font-size:10.8px;color:#333333;line-height:1.38;">
              <strong style="color:#0D2540;">Dualidad Humano + Oso Estratégico:</strong> La figura humana habita en espacio negativo blanco al centro, respaldada por el Oso Azul (#426EAE).
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:28px;row-gap:22px;">
          <div style="border-left:3px solid #426EAE;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">ELEMENTO 01 • ESPACIO CENTRAL</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">La Figura Humana</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.46;">
              Representa al <strong>cliente, al líder y a la organización</strong>. Se construye mediante espacio negativo limpio sobre el lienzo blanco, permaneciendo siempre en primer plano como protagonista.
            </div>
          </div>

          <div style="border-left:3px solid #0D2540;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;letter-spacing:0.14em;">ELEMENTO 02 • GUARDIAN AZUL (#426EAE)</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">El Oso Estratégico (Jorge)</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.46;">
              Representa <strong>inteligencia aplicada, respaldo, fuerza protectora y acompañamiento</strong>. Su postura mira hacia el futuro en armonía con el líder humano, jamás agresiva.
            </div>
          </div>

          <div style="border-left:3px solid #FF7A00;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;">ELEMENTO 03 • VECTOR DINAMICO (#FF7A00)</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">La Flecha Ascendente</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.46;">
              Representa <strong>crecimiento sostenible, evolución, dirección, enfoque y mejora continua</strong>. Es el pulso de energía que convierte la estrategia en acción y cobija el ícono de cada submarca.
            </div>
          </div>

          <div style="border-left:3px solid #4C9DE6;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;">ELEMENTO 04 • ANILLO Y ARCO (#0D2540)</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:800;color:#0D2540;margin:3px 0 5px 0;">El Sello / Arco Abierto</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.46;">
              Representa <strong>sistema, estructura y ecosistema integrado</strong>. En la marca madre cierra el doble círculo; en las 4 submarcas se abre como arco arquitectónico superior en #0D2540.
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 15)}
    </section>
    """)

    return plates
