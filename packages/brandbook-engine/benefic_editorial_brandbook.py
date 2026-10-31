# -*- coding: utf-8 -*-
"""
BENEFIC-Grade Editorial Brand Book Generator (v34.0)
====================================================
Genera el Manual Corporativo de Identidad (Brand Book) con el estándar editorial
exacto de agencia internacional (inspirado en BENEFIC_MANUAL_160318):
- 30 Láminas Editoriales Panorámicas (A4 Horizontal 297mm × 210mm, 1 concepto por página,
  cero cortes a mitad de tarjeta, amplio espacio en blanco, tipografía limpia y diagramas vectoriales).
- 100% conectado al nombre real del usuario, sus iniciales, su símbolo vectorial bespoke,
  su paleta cromática, su tipografía y sus respuestas de los Pasos 0 al 5.
- Cero nombres falsos ("Aurelian International" o "Mi Nueva Marca") y cero texto repetido.
"""

import os
import html
from typing import Dict, Any, List
from bespoke_logo_studio import BespokePentagramLogoEngine


def _esc(val: Any) -> str:
    return html.escape(str(val or "").strip())


def _hex_to_rgb_str(hex_code: str) -> str:
    h = (hex_code or "#090D16").lstrip("#")
    if len(h) != 6:
        return "9, 13, 22"
    try:
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        return f"{r} {g} {b}"
    except Exception:
        return "9 13 22"


def generate_benefic_editorial_brandbook_html(
    brand: Dict[str, Any],
    color_table: List[Dict[str, Any]],
    assets_base_url: str = "/assets"
) -> str:
    """
    Construye el documento HTML/CSS completo de 30 láminas editoriales horizontales (297mm × 210mm)
    listo tanto para impresión directa en PDF vía Playwright como para visualización en la app.
    """
    raw_name = (brand.get("chosen_name") or "TheBestBrand").strip()
    if not raw_name or raw_name.lower() in ("mi nueva marca", "tu marca"):
        raw_name = "TheBestBrand"
    b_name = _esc(raw_name)
    b_upper = _esc(raw_name.upper())
    initials = _esc(BespokePentagramLogoEngine.extract_brand_initials(raw_name))

    palette = brand.get("palette") or ["#FAF8F5", "#090D16", "#C59B27", "#1E293B"]
    bg_hex = palette[0] if len(palette) > 0 else "#FAF8F5"
    ink_hex = palette[1] if len(palette) > 1 else "#090D16"
    pri_hex = palette[2] if len(palette) > 2 else "#C59B27"
    sec_hex = palette[3] if len(palette) > 3 else "#1E293B"

    # Si bg_hex es muy oscuro, asegurar que las páginas editoriales tengan papel claro #FFFFFF y el bloque oscuro use ink_hex
    paper_hex = "#FFFFFF"
    dark_canvas_hex = ink_hex if ink_hex.lower() not in ("#ffffff", "#faf8f5", "#f8fafc") else "#090D16"
    accent_hex = pri_hex if pri_hex.lower() not in ("#ffffff", "#faf8f5") else "#C59B27"
    sec_accent_hex = sec_hex if sec_hex.lower() not in ("#ffffff", "#faf8f5") else "#0284C7"

    pri_font = _esc(brand.get("primary_font") or "Plus Jakarta Sans")
    sec_font = _esc(brand.get("secondary_font") or "Inter")
    tagline = _esc(brand.get("tagline") or "Excelencia estratégica y diseño con propósito")

    purpose_why = _esc(brand.get("purpose_why") or f"Eliminar las barreras tradicionales de su sector y ofrecer a cada cliente de {raw_name} una solución ágil, confiable y extraordinaria.")
    value_offer = _esc(brand.get("value_offer") or f"{raw_name} combina rigor estratégico, atención personalizada y ejecución impecable para entregar resultados tangibles desde el primer contacto.")
    social_role = _esc(brand.get("social_role") or f"Elevar el estándar de ética, claridad y diseño funcional dentro de su industria y comunidad.")
    core_message = _esc(brand.get("core_message") or f"Con {raw_name}, tu proyecto cuenta con una identidad sólida, clara y lista para trascender.")
    brand_persona = _esc(brand.get("brand_persona") or "Especialista cercano, claro, innovador y confiable: combina autoridad técnica con calidez humana.")
    customer_behavior = _esc(brand.get("customer_behavior") or "Escucha activa sin interrupciones, transparencia total sin letra pequeña y acompañamiento puntual en cada etapa.")
    brand_world = _esc(brand.get("brand_world") or "Espacios luminosos, orden arquitectónico, materiales honestos de alta durabilidad y comunicación directa libre de ruido visual.")
    ideal_customer = _esc(brand.get("ideal_customer") or "Emprendedores, directivos y familias que valoran la certeza, el buen gusto, la rapidez de respuesta y un trato humano de primer nivel.")

    raw_steps = brand.get("process_steps") or []
    if isinstance(raw_steps, str):
        raw_steps = [s.strip() for s in raw_steps.split("\n") if s.strip()]
    if len(raw_steps) < 3:
        raw_steps = [
            "1. Diagnóstico profundo y escucha empática de las necesidades del cliente",
            "2. Diseño, arquitectura e implementación con control de calidad riguroso",
            "3. Entrega impecable, puesta en marcha y acompañamiento continuo"
        ]
    step_1_txt = _esc(raw_steps[0])
    step_2_txt = _esc(raw_steps[1])
    step_3_txt = _esc(raw_steps[2])

    def _split_touchpoints_clean(raw_val) -> list:
        if isinstance(raw_val, list):
            parts = [str(x).strip() for x in raw_val if str(x).strip()]
        else:
            txt = str(raw_val or "").strip()
            if "|" in txt or "·" in txt or "\n" in txt:
                parts = [p.strip() for p in txt.replace("·", "|").replace("\n", "|").split("|") if p.strip()]
            else:
                parts = [p.strip() for p in txt.split(";") if p.strip()]
        return [_esc(p) for p in parts if p]

    tp_journey = brand.get("touchpoints_journey") or {}
    tp_antes_list = _split_touchpoints_clean(tp_journey.get("antes_list") or tp_journey.get("antes") or "Presencia digital clara | Demostración en vivo | Recomendación directa")
    tp_durante_list = _split_touchpoints_clean(tp_journey.get("durante_list") or tp_journey.get("durante") or "Propuesta ejecutiva clara | Atención personalizada | Proceso de compra en minutos")
    tp_despues_list = _split_touchpoints_clean(tp_journey.get("despues_list") or tp_journey.get("despues") or "Entrega memorable | Manual de bienvenida | Seguimiento y comunidad")

    tp_detailed_map = tp_journey.get("detailed") or {}

    def _build_tp_detail_obj(item_str: str, phase_key: str, idx: int) -> dict:
        raw_list = tp_detailed_map.get(phase_key) or []
        prefix = "TP-ANT" if phase_key == "before" else ("TP-DUR" if phase_key == "during" else "TP-DES")
        code = f"{prefix}-{idx + 1:02d}"
        if idx < len(raw_list) and isinstance(raw_list[idx], dict):
            d = raw_list[idx]
            return {
                "code": _esc(d.get("tp_id") or code),
                "title": _esc(d.get("title") or item_str),
                "sensory": _esc(d.get("sensory_dimensions") or "👁️ Claridad Visual + 🤝 Atención Empática"),
                "experience": _esc(d.get("blueprint_onstage") or d.get("surprise_and_delight") or "Interacción fluida, sin fricciones y con acompañamiento claro en todo momento."),
                "substrate": _esc(d.get("substrate_material") or "Aplicación normativa del logotipo, paleta oficial y contraste WCAG AAA.")
            }
        low = item_str.lower()
        if any(w in low for w in ["app", "web", "landing", "demo", "video", "onboarding", "digital", "clic", "minuto", "segundos", "simulador", "redes", "bóveda", "descarga", "online"]):
            sensory = "👁️ Interfaz UI Nítida + ⚡ Respuesta < 1.5s"
            if phase_key == "before":
                exp = "Descubrimiento inmediato sin barreras ni registros largos; comunica la propuesta de valor en segundos."
                sub = "Ecosistema Web/App Retina (Contraste WCAG AAA ≥ 7:1) con símbolo vectorial SVG."
            elif phase_key == "during":
                exp = "Activación guiada e intuitiva hacia el primer resultado ('Aha! Moment') con cero fricción técnica."
                sub = "Interfaz interactiva en vivo con tipografía oficial y retroalimentación instantánea."
            else:
                exp = "Entrega inmediata de activos maestros, guía práctica de implementación y acceso continuo a su bóveda."
                sub = "Documentación PDF/X-1a de 30 páginas, kit vectorial SVG/PNG y portal de cliente."
        elif any(w in low for w in ["aroma", "leña", "toalla", "pan", "mesa", "vino", "degust", "reserva", "platillo", "café"]):
            sensory = "👃 Olfato + 👅 Gusto + ✋ Tacto Cálido"
            exp = "Hospitalidad sensorial en vivo que despierta memoria emocional y deleite desde el primer contacto."
            sub = "Materiales nobles (cerámica, madera, textil 100% algodón y papel con relieve en seco)."
        else:
            sensory = "👁️ Presencia Ejecutiva + 🤝 Confianza Directa"
            if phase_key == "before":
                exp = "Primera impresión de autoridad, orden y transparencia que inspira confianza inmediata en el cliente ideal."
                sub = "Catálogo / Presentación ejecutiva, presencia digital verificada y señalética institucional."
            elif phase_key == "during":
                exp = "Trato personalizado sin letra pequeña, diagnóstico claro y acuerdos transparentes paso a paso."
                sub = "Papelería corporativa membretada, propuesta formal e indumentaria oficial del equipo."
            else:
                exp = "Entrega ceremonial impecable, garantía activa sin trámites y seguimiento proactivo post-venta."
                sub = "Empaque rígido con sello oficial, certificado de calidad y comunicación directa de lealtad."
        return {
            "code": code,
            "title": item_str,
            "sensory": sensory,
            "experience": exp,
            "substrate": sub
        }

    tp_antes_detailed = [_build_tp_detail_obj(it, "before", i) for i, it in enumerate(tp_antes_list)]
    tp_durante_detailed = [_build_tp_detail_obj(it, "during", i) for i, it in enumerate(tp_durante_list)]
    tp_despues_detailed = [_build_tp_detail_obj(it, "after", i) for i, it in enumerate(tp_despues_list)]

    tp_a1 = tp_antes_list[0] if tp_antes_list else "Descubrimiento y primera impresión de confianza"
    tp_d1 = tp_durante_list[0] if tp_durante_list else "Activación ágil y experiencia sin fricciones"
    tp_p1 = tp_despues_list[0] if tp_despues_list else "Entrega memorable y acompañamiento continuo"
    sector_clean = _esc(brand.get("sector") or "Identidad Corporativa & Experiencia de Marca")

    domains = brand.get("domains") or [f"{raw_name.lower().replace(' ', '')}.com", f"{raw_name.lower().replace(' ', '')}.ai"]
    clean_domain = _esc(domains[0] if domains else f"{raw_name.lower().replace(' ', '')}.com")

    user_refinement_prompt = str(brand.get("user_refinement_prompt") or "").strip()
    custom_mods = BespokePentagramLogoEngine.parse_user_refinement_modifiers(user_refinement_prompt)
    if isinstance(brand.get("custom_modifiers"), dict) and brand.get("custom_modifiers"):
        custom_mods.update(brand.get("custom_modifiers"))

    selected_variant_idx = int(brand.get("selected_variant_index") or 0) % 4
    variation_seed = int(brand.get("variation_seed") or 0)

    # Generar los símbolos vectoriales bespoke reales de la marca (usando SIEMPRE el mismo selected_variant_idx en todo el manual)
    studio_proposals = BespokePentagramLogoEngine.generate_4_studio_logo_proposals(
        brand_name=raw_name,
        industry_hint=f"{brand.get('industry_key') or ''} {brand.get('sector') or ''} app plataforma digital saas",
        purpose_text=purpose_why,
        colors_hex=[paper_hex, dark_canvas_hex, accent_hex, sec_accent_hex],
        primary_font=pri_font,
        secondary_font=sec_font,
        descriptor_tagline=tagline[:52],
        show_construction_grid=False,
        user_refinement_prompt=user_refinement_prompt,
        custom_modifiers=custom_mods,
        variation_seed=variation_seed
    )
    archetype = studio_proposals[0]["archetype"] if studio_proposals else "tech_app_node"

    sym_color_on_white = BespokePentagramLogoEngine.render_bespoke_symbol_inner_svg(
        archetype=archetype, pri_hex=accent_hex, sec_hex=sec_accent_hex,
        ink_hex=dark_canvas_hex, bg_hex="#FFFFFF", variant_index=selected_variant_idx, uid="ed_pos", initials=initials,
        primary_font=pri_font, variation_seed=variation_seed, custom_modifiers=custom_mods
    )
    sym_white_on_dark = BespokePentagramLogoEngine.render_bespoke_symbol_inner_svg(
        archetype=archetype, pri_hex=accent_hex, sec_hex="#FFFFFF",
        ink_hex="#FFFFFF", bg_hex=dark_canvas_hex, variant_index=selected_variant_idx, uid="ed_neg", initials=initials,
        primary_font=pri_font, variation_seed=variation_seed, custom_modifiers=custom_mods
    )
    sym_mono_glyph = BespokePentagramLogoEngine.render_bespoke_symbol_inner_svg(
        archetype=archetype, pri_hex=accent_hex, sec_hex=dark_canvas_hex,
        ink_hex=dark_canvas_hex, bg_hex="#FFFFFF", variant_index=selected_variant_idx, uid="ed_glyph", initials=initials,
        primary_font=pri_font, variation_seed=variation_seed, custom_modifiers=custom_mods
    )
    sym_badge_emblem = BespokePentagramLogoEngine.render_bespoke_symbol_inner_svg(
        archetype=archetype, pri_hex=accent_hex, sec_hex="#FFFFFF",
        ink_hex="#FFFFFF", bg_hex=dark_canvas_hex, variant_index=selected_variant_idx, uid="ed_badge", initials=initials,
        primary_font=pri_font, variation_seed=variation_seed, custom_modifiers=custom_mods
    )

    # Fotografías curadas locales (funcionan 100% offline/online y sin marcas falsas)
    img_arch = f"{assets_base_url}/avi/brandbook_plate_architectural_signage.jpg"
    img_stat = f"{assets_base_url}/avi/brandbook_plate_stationery_suite.jpg"
    img_pack = f"{assets_base_url}/avi/brandbook_plate_packaging_unboxing.jpg"
    img_digi = f"{assets_base_url}/avi/brandbook_plate_digital_ecosystem.jpg"
    img_tp = f"{assets_base_url}/avi/brandbook_plate_touchpoints_ecosystem.jpg"
    img_app = f"{assets_base_url}/avi/brandbook_plate_apparel_embroidery.jpg"

    # Helper para construir lockup horizontal positivo y negativo
    def build_lockup_svg(is_dark: bool = False, uid_suffix: str = "1", width_px: int = 380, height_px: int = 110) -> str:
        txt_fill = "#FFFFFF" if is_dark else dark_canvas_hex
        sub_fill = accent_hex
        sym_inner = sym_white_on_dark if is_dark else sym_color_on_white
        return f"""<svg viewBox="0 0 460 120" width="{width_px}" height="{height_px}" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(62, 60) scale(0.92)">{sym_inner}</g>
          <text x="132" y="62" fill="{txt_fill}" font-family="'{pri_font}', sans-serif" font-weight="800" font-size="34" letter-spacing="-0.5">{b_name}</text>
          <text x="134" y="86" fill="{sub_fill}" font-family="'{sec_font}', sans-serif" font-weight="600" font-size="9.5" letter-spacing="2.2">{tagline[:48].upper()}</text>
        </svg>"""

    def page_footer(page_num: int, section_label: str = "", dark_mode: bool = False) -> str:
        fg = "#FFFFFF" if dark_mode else "#64748B"
        sec_col = "#FFFFFF" if dark_mode else accent_hex
        top_tag = f'<div class="bb-top-section-tag" style="color:{sec_col};">{_esc(section_label)}</div>' if section_label else ""
        return f"""
        {top_tag}
        <div class="bb-page-footer" style="color:{fg};">
          <span>BRAND BOOK 2026 · {b_upper}</span>
          <span class="bb-page-num">{page_num}</span>
        </div>
        """

    # Tabla cromática enriquecida
    c_rows = []
    default_roles = [
        ("PRIMARIO · IDENTIDAD", accent_hex, "PANTONE 7548 C", "C:10 M:28 Y:85 K:5"),
        ("PRIMARIO · ESTRUCTURA", dark_canvas_hex, "PANTONE Black 6 C", "C:75 M:68 Y:62 K:82"),
        ("SECUNDARIO · ACENTO", sec_accent_hex, "PANTONE 2144 C", "C:82 M:48 Y:0 K:12"),
        ("SECUNDARIO · LIENZO", bg_hex, "PANTONE Warm Gray 1 C", "C:2 M:2 Y:4 K:0"),
    ]
    for idx, (r_label, hx, p_fallback, cmyk_fallback) in enumerate(default_roles):
        ct = color_table[idx] if idx < len(color_table) else {}
        pantone_str = _esc(ct.get("pantone_solid_coated") or p_fallback)
        cmyk_str = _esc(ct.get("cmyk_fogra39") or cmyk_fallback)
        rgb_str = _hex_to_rgb_str(hx)
        c_rows.append({
            "role": r_label,
            "hex": hx,
            "pantone": pantone_str,
            "cmyk": cmyk_str,
            "rgb": rgb_str
        })

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Brand Book Oficial — {b_name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4 landscape;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    body {{
      margin: 0;
      padding: 0;
      background: #E2E8F0;
      font-family: '{sec_font}', 'Plus Jakarta Sans', -apple-system, sans-serif;
      color: #1E293B;
    }}
    .bb-spread {{
      width: 297mm;
      height: 210mm;
      margin: 0 auto 18px auto;
      background: #FFFFFF;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
      break-inside: avoid;
      box-shadow: 0 14px 40px rgba(15, 23, 42, 0.12);
      display: flex;
      flex-direction: column;
    }}
    @media print {{
      body {{ background: #FFFFFF; }}
      .bb-spread {{
        margin: 0;
        box-shadow: none;
        page-break-after: always;
        break-after: page;
      }}
      .no-print {{ display: none !important; }}
    }}
    .bb-top-section-tag {{
      position: absolute;
      top: 14mm;
      right: 18mm;
      font-family: '{pri_font}', sans-serif;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      z-index: 10;
    }}
    .bb-page-footer {{
      position: absolute;
      bottom: 10mm;
      left: 18mm;
      right: 18mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5pt;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      z-index: 10;
      pointer-events: none;
    }}
    .bb-page-num {{
      font-weight: 800;
      font-size: 8.5pt;
    }}
    .bb-pad {{
      padding: 18mm 20mm 18mm 20mm;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .bb-num-title {{
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 4px;
    }}
    .bb-big-index {{
      font-family: '{pri_font}', sans-serif;
      font-size: 34pt;
      font-weight: 300;
      color: {accent_hex};
      line-height: 1;
    }}
    .bb-h1 {{
      font-family: '{pri_font}', sans-serif;
      font-size: 20pt;
      font-weight: 700;
      color: {accent_hex};
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin: 0;
    }}
    .bb-subtitle {{
      font-size: 9.5pt;
      font-weight: 600;
      letter-spacing: 0.18em;
      color: #64748B;
      text-transform: uppercase;
      margin-top: 2px;
    }}
    .bb-lead-right {{
      max-width: 155mm;
      margin-left: auto;
      text-align: right;
      font-size: 12.5pt;
      line-height: 1.55;
      color: #334155;
      font-weight: 400;
    }}
    .bb-lead-right strong {{
      color: {accent_hex};
      font-weight: 700;
    }}
    .bb-toc-col h4 {{
      font-family: '{pri_font}', sans-serif;
      font-size: 10.5pt;
      font-weight: 800;
      color: {accent_hex};
      letter-spacing: 0.14em;
      margin: 0 0 10px 0;
      text-transform: uppercase;
    }}
    .bb-toc-row {{
      display: flex;
      align-items: baseline;
      font-size: 9pt;
      color: #334155;
      margin-bottom: 6px;
    }}
    .bb-toc-dots {{
      flex: 1;
      border-bottom: 1px dotted #94A3B8;
      margin: 0 8px;
    }}
    .bb-toc-pg {{
      font-weight: 700;
      color: {accent_hex};
      font-size: 8.5pt;
    }}
  </style>
</head>
<body>

  <!-- =========================================================================
       PÁGINA 1 · PORTADA EDITORIAL (50% FOTO ATMOSFÉRICA + SÍMBOLO CENTRAL + 50% LOGO)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="display:grid; grid-template-columns:1fr 1fr; width:100%; height:100%; position:relative;">
      <div style="position:relative; overflow:hidden; background:{dark_canvas_hex};">
        <img src="{img_arch}" alt="Portada {b_name}" style="width:100%; height:100%; object-fit:cover; opacity:0.86;" />
        <div style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(9,13,22,0.55) 0%, rgba(9,13,22,0.15) 100%);"></div>
      </div>
      <!-- Badge circular central que cabalga entre la foto y el lienzo blanco -->
      <div style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:46mm; height:46mm; border-radius:50%; background:#FFFFFF; box-shadow:0 16px 40px rgba(9,13,22,0.22); display:flex; align-items:center; justify-content:center; z-index:5; border:3px solid {accent_hex};">
        <svg viewBox="-54 -54 108 108" width="120" height="120">{sym_color_on_white}</svg>
      </div>
      <div style="background:#FFFFFF; display:flex; flex-direction:column; justify-content:space-between; align-items:flex-end; padding:22mm 22mm 16mm 28mm; text-align:right;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:8pt; color:#94A3B8; letter-spacing:0.2em;">
          MANUAL OFICIAL DE IDENTIDAD DE MARCA
        </div>
        <div style="margin:auto 0;">
          {build_lockup_svg(is_dark=False, uid_suffix="cov", width_px=340, height_px=100)}
          <div style="margin-top:10px; font-size:10.5pt; color:#475569; font-weight:500;">{tagline}</div>
        </div>
        <div style="font-family:'{pri_font}',sans-serif; font-size:12pt; font-weight:700; letter-spacing:0.24em; color:{accent_hex};">
          BRAND BOOK <span style="font-weight:300; color:#64748B;">2026</span>
        </div>
      </div>
    </div>
  </section>

  <!-- =========================================================================
       PÁGINA 2 · HOJA DE RESPIRO Y SÍMBOLO DE AUTOR (ESTÁNDAR BENEFIC PÁG. 3)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#FFFFFF;">
      <div style="text-align:center;">
        <svg viewBox="-56 -56 112 112" width="175" height="175">{sym_color_on_white}</svg>
        <div style="margin-top:14px; font-family:'JetBrains Mono',monospace; font-size:8pt; letter-spacing:0.28em; color:#94A3B8;">
          {b_upper} · SÍMBOLO CONSTRUCTIVO OFICIAL
        </div>
      </div>
    </div>
    {page_footer(2, "")}
  </section>

  <!-- =========================================================================
       PÁGINA 3 · CONTENIDO Y OBJETIVOS DEL MANUAL (ESTÁNDAR BENEFIC PÁG. 4)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:20mm; align-items:start;">
        <div>
          <h1 class="bb-h1" style="font-size:24pt; letter-spacing:0.14em;">CONTENIDO</h1>
          <div style="margin-top:8mm;">
            <div style="font-weight:800; font-size:9.5pt; letter-spacing:0.16em; color:#334155; margin-bottom:6px;">OBJETIVOS</div>
            <p style="font-size:9.5pt; color:#475569; line-height:1.6; margin:0;">
              • Comunicar la esencia, propósito y estrategia de <strong>{b_name}</strong>.<br/>
              • Funcionar como guía de inducción al equipo, aliados y proveedores.<br/>
              • Garantizar coherencia absoluta en cada punto de contacto físico y digital.
            </p>
          </div>
        </div>
        <div style="border-left:2px solid {accent_hex}; padding-left:14px; margin-top:4mm;">
          <div style="font-size:9pt; color:#64748B; letter-spacing:0.12em; text-transform:uppercase; font-weight:700;">Arquitectura Documental</div>
          <p style="font-size:10pt; color:#1E293B; line-height:1.55; margin:6px 0 0 0;">
            Este manual integra las 3 dimensiones rectoras de <strong>{b_name}</strong>: su <strong>Posicionamiento Estratégico</strong>, las reglas de <strong>Construcción de la Marca</strong> y su <strong>Estilo Visual y Aplicaciones Oficiales</strong>.
          </p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14mm; margin-top:auto; padding-bottom:6mm;">
        <div class="bb-toc-col">
          <h4>POSICIONAMIENTO</h4>
          <div class="bb-toc-row"><span>1. El propósito</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">05</span></div>
          <div class="bb-toc-row"><span>2. Posicionamiento</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">06</span></div>
          <div class="bb-toc-row"><span>3. Rol en la sociedad</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">07</span></div>
          <div class="bb-toc-row"><span>4. Su proceso</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">08</span></div>
          <div class="bb-toc-row"><span>5. Mensaje</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">09</span></div>
          <div class="bb-toc-row"><span>6. Personalidad</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">10</span></div>
          <div class="bb-toc-row"><span>7. Comportamiento</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">11</span></div>
          <div class="bb-toc-row"><span>8. Su mundo</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">12</span></div>
        </div>
        <div class="bb-toc-col">
          <h4>CONSTRUCCIÓN DE LA MARCA</h4>
          <div class="bb-toc-row"><span>A. Logotipo</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">13</span></div>
          <div class="bb-toc-row"><span>B. Símbolo</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">14</span></div>
          <div class="bb-toc-row"><span>C. Relación logo/símbolo</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">15</span></div>
          <div class="bb-toc-row"><span>D. Área de seguridad</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">16</span></div>
          <div class="bb-toc-row"><span>E. Color (Pantone / CMYK / HEX)</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">17</span></div>
          <div class="bb-toc-row"><span>F. Usos permitidos</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">18</span></div>
          <div class="bb-toc-row"><span>G. Restricciones</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">19</span></div>
          <div class="bb-toc-row"><span>H. Reducción mínima</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">20</span></div>
          <div class="bb-toc-row"><span>I. Tipografía</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">21</span></div>
          <div class="bb-toc-row"><span>J. Jerarquía tipográfica</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">22</span></div>
        </div>
        <div class="bb-toc-col">
          <h4>ESTILO VISUAL Y APLICACIONES</h4>
          <div class="bb-toc-row"><span>I. Estilo visual y jerarquía de color</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">23</span></div>
          <div class="bb-toc-row"><span>II. Dirección de fotografía</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">24</span></div>
          <div class="bb-toc-row"><span>III. Tarjeta de presentación (9×5 cm)</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">25</span></div>
          <div class="bb-toc-row"><span>IV. Hoja membretada y cotización</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">26</span></div>
          <div class="bb-toc-row"><span>V. Banner vertical y póster</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">27</span></div>
          <div class="bb-toc-row"><span>VI. Presentación digital (4 slides)</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">28</span></div>
          <div class="bb-toc-row"><span>VII. Firma electrónica y Touchpoints</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">29</span></div>
          <div class="bb-toc-row"><span>VIII. Validación y cierre</span><span class="bb-toc-dots"></span><span class="bb-toc-pg">30</span></div>
        </div>
      </div>
    </div>
    {page_footer(3, "")}
  </section>

  <!-- =========================================================================
       PÁGINA 4 · INTRODUCCIÓN DEL MANUAL (ESTÁNDAR BENEFIC PÁG. 5)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
      <div style="padding:18mm 22mm 8mm 22mm; display:grid; grid-template-columns:0.78fr 1.62fr; gap:16mm; align-items:center;">
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <svg viewBox="-56 -56 112 112" width="140" height="140">{sym_color_on_white}</svg>
          <div style="margin-top:8px; font-family:'{pri_font}',sans-serif; font-weight:800; font-size:13pt; color:{dark_canvas_hex}; letter-spacing:0.08em;">{b_upper}</div>
          <div style="font-size:7.5pt; color:{accent_hex}; font-weight:700; text-align:center; margin-top:3px;">{sector_clean[:54]}</div>
        </div>
        <div style="font-size:10pt; line-height:1.62; color:#334155;">
          <p style="margin:0 0 10px 0;">
            Como parte del crecimiento y consolidación estratégica de <strong>{b_name}</strong>, se ha creado este manual rector que integra de forma orgánica su <strong>ADN estratégico (Paso 1)</strong>, su <strong>ecosistema de experiencia y puntos de contacto (Paso 2)</strong>, su <strong>personificación humana</strong> y sus reglas de construcción visual.
          </p>
          <p style="margin:0 0 10px 0;">
            Su objetivo es proyectar a <strong>{b_name}</strong> con coherencia absoluta ante su cliente ideal (<em>{ideal_customer}</em>), asegurando que desde el primer contacto (<strong>{tp_a1}</strong>) hasta la activación (<strong>{tp_d1}</strong>) y la fidelización (<strong>{tp_p1}</strong>) se respire la misma excelencia.
          </p>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; height:76mm; width:100%;">
        <img src="{img_stat}" alt="Mundo 1" style="width:100%; height:100%; object-fit:cover;" />
        <img src="{img_digi}" alt="Mundo 2" style="width:100%; height:100%; object-fit:cover;" />
        <img src="{img_pack}" alt="Mundo 3" style="width:100%; height:100%; object-fit:cover;" />
      </div>
    </div>
    {page_footer(4, "INTRODUCCIÓN", dark_mode=True)}
  </section>

  <!-- =========================================================================
       PÁGINA 5 · 1. EL PROPÓSITO · PARA QUÉ EXISTE (ESTÁNDAR BENEFIC PÁG. 6)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="padding:16mm 20mm 8mm 20mm; display:grid; grid-template-columns:0.95fr 1.45fr; gap:12mm; align-items:start;">
      <div>
        <div class="bb-num-title">
          <span class="bb-big-index">1</span>
          <h2 class="bb-h1">EL PROPÓSITO</h2>
        </div>
        <div class="bb-subtitle" style="margin-left:34px;">PARA QUÉ EXISTE {b_upper}</div>
        <div style="margin-top:4mm; margin-left:34px; font-size:8.5pt; color:#475569; line-height:1.5; border-left:2.5px solid {accent_hex}; padding-left:10px;">
          <strong style="color:{dark_canvas_hex};">Primer Momento de Verdad:</strong><br/>
          {tp_a1}
        </div>
      </div>
      <div class="bb-lead-right" style="font-size:11pt; line-height:1.55;">
        <strong>{b_name}</strong> nace con una convicción clara:<br/>
        {purpose_why}
        <div style="margin-top:8px; font-size:9pt; color:#475569;">
          <strong>Para quién existe:</strong> {ideal_customer}
        </div>
      </div>
    </div>
    <div style="margin-top:auto; height:106mm; width:100%; position:relative; overflow:hidden;">
      <img src="{img_arch}" alt="Propósito {b_name}" style="width:100%; height:100%; object-fit:cover;" />
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(9,13,22,0.55) 0%, transparent 55%);"></div>
    </div>
    {page_footer(5, "POSICIONAMIENTO", dark_mode=True)}
  </section>

  <!-- =========================================================================
       PÁGINA 6 · 2. POSICIONAMIENTO · LO QUE DICEN DE LA MARCA (BENEFIC PÁG. 7)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="padding:16mm 20mm 8mm 20mm; display:grid; grid-template-columns:0.95fr 1.45fr; gap:12mm; align-items:start;">
      <div>
        <div class="bb-num-title">
          <span class="bb-big-index">2</span>
          <h2 class="bb-h1">POSICIONAMIENTO</h2>
        </div>
        <div class="bb-subtitle" style="margin-left:34px;">LO QUE DICEN DE {b_upper}</div>
        <div style="margin-top:4mm; margin-left:34px; font-size:8.5pt; color:#475569; line-height:1.5; border-left:2.5px solid {sec_accent_hex}; padding-left:10px;">
          <strong style="color:{dark_canvas_hex};">Activación de Valor (Paso 2):</strong><br/>
          {tp_d1}
        </div>
      </div>
      <div class="bb-lead-right" style="font-size:11pt; line-height:1.55;">
        Nuestra oferta de valor diferenciada:<br/>
        <strong>{value_offer}</strong>
        <div style="margin-top:8px; font-size:9pt; color:#475569;">
          <strong>Promesa Nuclear:</strong> “{core_message}”
        </div>
      </div>
    </div>
    <div style="margin-top:auto; height:106mm; width:100%; position:relative; overflow:hidden;">
      <img src="{img_tp}" alt="Posicionamiento {b_name}" style="width:100%; height:100%; object-fit:cover;" />
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(9,13,22,0.55) 0%, transparent 55%);"></div>
    </div>
    {page_footer(6, "POSICIONAMIENTO", dark_mode=True)}
  </section>

  <!-- =========================================================================
       PÁGINA 7 · 3. SU ROL EN LA SOCIEDAD (DIAGRAMA 4 NODOS · BENEFIC PÁG. 8)
       ========================================================================= -->
  <section class="bb-spread" style="background:{dark_canvas_hex}; color:#FFFFFF;">
    <div class="bb-pad">
      <div>
        <div class="bb-num-title">
          <span class="bb-big-index" style="color:{accent_hex};">3</span>
          <h2 class="bb-h1" style="color:#FFFFFF;">SU ROL EN LA SOCIEDAD</h2>
        </div>
        <div class="bb-subtitle" style="color:#CBD5E1; margin-left:34px;">IMPACTO POSITIVO Y TRANSFORMACIÓN</div>
      </div>

      <!-- Infografía de 4 cajas conectadas con flechas curvas punteadas -->
      <div style="margin:auto 0; position:relative;">
        <svg viewBox="0 0 980 230" width="100%" height="215" xmlns="http://www.w3.org/2000/svg">
          <!-- Flechas curvas punteadas superiores e inferiores -->
          <path d="M 195 55 Q 250 12 305 55" fill="none" stroke="{accent_hex}" stroke-width="2" stroke-dasharray="5 5"/>
          <polygon points="305,55 296,49 299,59" fill="{accent_hex}"/>
          <path d="M 445 175 Q 500 218 555 175" fill="none" stroke="{accent_hex}" stroke-width="2" stroke-dasharray="5 5"/>
          <polygon points="555,175 546,169 549,179" fill="{accent_hex}"/>
          <path d="M 695 55 Q 750 12 805 55" fill="none" stroke="{accent_hex}" stroke-width="2" stroke-dasharray="5 5"/>
          <polygon points="805,55 796,49 799,59" fill="{accent_hex}"/>

          <!-- Caja 1 -->
          <rect x="20" y="65" width="210" height="100" rx="8" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
          <text x="125" y="102" fill="{accent_hex}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">1. RESOLVER CON CERTEZA</text>
          <text x="125" y="122" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">Atender las necesidades</text>
          <text x="125" y="138" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">reales de nuestros clientes</text>

          <!-- Caja 2 -->
          <rect x="270" y="65" width="210" height="100" rx="8" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
          <text x="375" y="102" fill="{accent_hex}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">2. CERO FRICCIÓN</text>
          <text x="375" y="122" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">Eliminando la lentitud, las</text>
          <text x="375" y="138" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">barreras y la incertidumbre</text>

          <!-- Caja 3 -->
          <rect x="520" y="65" width="210" height="100" rx="8" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
          <text x="625" y="102" fill="{accent_hex}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">3. ELEVAR EL ESTÁNDAR</text>
          <text x="625" y="122" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">Promoviendo calidad ética,</text>
          <text x="625" y="138" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">claridad y excelencia técnica</text>

          <!-- Caja 4 -->
          <rect x="760" y="65" width="200" height="100" rx="8" fill="none" stroke="{accent_hex}" stroke-width="2.2"/>
          <text x="860" y="102" fill="{accent_hex}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">4. IMPACTO REAL</text>
          <text x="860" y="122" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">Transformando la confianza</text>
          <text x="860" y="138" fill="#FFFFFF" font-family="sans-serif" font-size="11" text-anchor="middle">en resultados duraderos</text>
        </svg>
      </div>

      <div style="text-align:center; font-size:12pt; color:#F8FAFC; max-width:210mm; margin:0 auto 8mm auto; line-height:1.5;">
        “{social_role}”
      </div>
    </div>
    {page_footer(7, "POSICIONAMIENTO", dark_mode=True)}
  </section>

  <!-- =========================================================================
       PÁGINA 8 · 4. SU PROCESO DE CREACIÓN Y OPERACIÓN (BENEFIC PÁG. 9)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1.1fr 1fr; gap:10mm; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">4</span>
            <h2 class="bb-h1">SU PROCESO OPERATIVO</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">CÓMO CONSTRUYE VALOR {b_upper}</div>
        </div>
        <p style="font-size:9.5pt; color:#475569; line-height:1.55; margin:0; text-align:right;">
          Cada entrega de <strong>{b_name}</strong> sigue una metodología estructurada en <strong>3 etapas auditables</strong> que garantizan certidumbre, rapidez y excelencia en cada detalle.
        </p>
      </div>

      <!-- Infografía de 3 etapas conectada con TODOS los Touchpoints declarados en Antes, Durante y Después -->
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8mm; margin:auto 0; padding:2mm 0;">
        <div style="background:#F8FAFC; border:1.5px solid #E2E8F0; border-top:5px solid #0284C7; border-radius:16px; padding:14px 16px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <div style="width:34px; height:34px; border-radius:50%; background:{dark_canvas_hex}; color:#38BDF8; display:flex; align-items:center; justify-content:center; font-family:'{pri_font}',sans-serif; font-weight:800; font-size:11pt;">01</div>
              <span style="font-family:'JetBrains Mono',monospace; font-size:7pt; font-weight:800; background:#E0F2FE; color:#0369A1; padding:3px 8px; border-radius:99px;">1. ANTES DE LA COMPRA</span>
            </div>
            <div style="font-family:'{pri_font}',sans-serif; font-size:10pt; font-weight:800; color:{dark_canvas_hex}; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:4px;">Diagnóstico y Atracción</div>
            <p style="font-size:8.4pt; color:#334155; line-height:1.45; margin:0 0 8px 0;">{step_1_txt}</p>
          </div>
          <div style="border-top:1px dashed #CBD5E1; padding-top:8px; font-size:7.6pt; color:#0F172A;">
            <strong style="color:#0284C7; display:block; margin-bottom:4px;">Touchpoints Antes de Comprar (Paso 2):</strong>
            <ul style="margin:0; padding-left:14px; line-height:1.42; color:#334155;">
              {"".join([f"<li style='margin-bottom:3px;'><strong>{d['title']}</strong> <span style='color:#64748B;'>({d['sensory']})</span></li>" for d in tp_antes_detailed])}
            </ul>
          </div>
        </div>

        <div style="background:#F8FAFC; border:1.5px solid #E2E8F0; border-top:5px solid {accent_hex}; border-radius:16px; padding:14px 16px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <div style="width:34px; height:34px; border-radius:50%; background:{accent_hex}; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-family:'{pri_font}',sans-serif; font-weight:800; font-size:11pt;">02</div>
              <span style="font-family:'JetBrains Mono',monospace; font-size:7pt; font-weight:800; background:#FEF3C7; color:#92400E; padding:3px 8px; border-radius:99px;">2. DURANTE LA COMPRA</span>
            </div>
            <div style="font-family:'{pri_font}',sans-serif; font-size:10pt; font-weight:800; color:{dark_canvas_hex}; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:4px;">Arquitectura y Ejecución</div>
            <p style="font-size:8.4pt; color:#334155; line-height:1.45; margin:0 0 8px 0;">{step_2_txt}</p>
          </div>
          <div style="border-top:1px dashed #CBD5E1; padding-top:8px; font-size:7.6pt; color:#0F172A;">
            <strong style="color:{accent_hex}; display:block; margin-bottom:4px;">Touchpoints Durante la Compra (Paso 2):</strong>
            <ul style="margin:0; padding-left:14px; line-height:1.42; color:#334155;">
              {"".join([f"<li style='margin-bottom:3px;'><strong>{d['title']}</strong> <span style='color:#64748B;'>({d['sensory']})</span></li>" for d in tp_durante_detailed])}
            </ul>
          </div>
        </div>

        <div style="background:#F8FAFC; border:1.5px solid #E2E8F0; border-top:5px solid #059669; border-radius:16px; padding:14px 16px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <div style="width:34px; height:34px; border-radius:50%; background:#059669; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-family:'{pri_font}',sans-serif; font-weight:800; font-size:11pt;">03</div>
              <span style="font-family:'JetBrains Mono',monospace; font-size:7pt; font-weight:800; background:#D1FAE5; color:#065F46; padding:3px 8px; border-radius:99px;">3. DESPUÉS DE LA COMPRA</span>
            </div>
            <div style="font-family:'{pri_font}',sans-serif; font-size:10pt; font-weight:800; color:{dark_canvas_hex}; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:4px;">Entrega y Fidelización</div>
            <p style="font-size:8.4pt; color:#334155; line-height:1.45; margin:0 0 8px 0;">{step_3_txt}</p>
          </div>
          <div style="border-top:1px dashed #CBD5E1; padding-top:8px; font-size:7.6pt; color:#0F172A;">
            <strong style="color:#059669; display:block; margin-bottom:4px;">Touchpoints Después de Comprar (Paso 2):</strong>
            <ul style="margin:0; padding-left:14px; line-height:1.42; color:#334155;">
              {"".join([f"<li style='margin-bottom:3px;'><strong>{d['title']}</strong> <span style='color:#64748B;'>({d['sensory']})</span></li>" for d in tp_despues_detailed])}
            </ul>
          </div>
        </div>
      </div>

      <div style="background:{dark_canvas_hex}; color:#FFFFFF; border-radius:12px; padding:10px 18px; display:flex; justify-content:space-between; align-items:center; font-size:9pt; margin-bottom:4mm;">
        <span style="color:{accent_hex}; font-weight:700;">ESTÁNDAR DE CALIDAD INNEGOCIABLE</span>
        <span>Trazabilidad de principio a fin · Cero fricción para el usuario</span>
      </div>
    </div>
    {page_footer(8, "POSICIONAMIENTO")}
  </section>

  <!-- =========================================================================
       PÁGINA 9 · 5. SU MENSAJE NUCLEAR (SPLIT FOTO + MANIFIESTO · BENEFIC PÁG. 10)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="display:grid; grid-template-columns:0.95fr 1.25fr; width:100%; height:100%;">
      <div style="height:100%; overflow:hidden; position:relative;">
        <img src="{img_digi}" alt="Mensaje {b_name}" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div style="padding:20mm 22mm 20mm 18mm; display:flex; flex-direction:column; justify-content:center;">
        <div class="bb-num-title">
          <span class="bb-big-index">5</span>
          <h2 class="bb-h1">SU MENSAJE</h2>
        </div>
        <div class="bb-subtitle" style="margin-left:34px; margin-bottom:10mm;">LA PROMESA CENTRAL DE {b_upper}</div>

        <blockquote style="margin:0 0 8mm 0; padding-left:16px; border-left:4px solid {accent_hex}; font-family:'{pri_font}',sans-serif; font-size:16pt; font-weight:700; color:{dark_canvas_hex}; line-height:1.4;">
          “{core_message}”
        </blockquote>

        <p style="font-size:10.5pt; color:#334155; line-height:1.65; margin:0 0 6mm 0;">
          {b_name} se comunica con claridad, convicción y empatía. Nunca utiliza tecnicismos innecesarios que alejen a las personas; habla con la seguridad de quien domina su oficio y acompaña al cliente hacia un resultado tangible.
        </p>
        <div style="font-family:'JetBrains Mono',monospace; font-size:8.5pt; color:{accent_hex}; font-weight:700;">
          ESLOGAN / DESCRIPTOR OFICIAL: “{tagline}”
        </div>
      </div>
    </div>
    {page_footer(9, "POSICIONAMIENTO")}
  </section>

  <!-- =========================================================================
       PÁGINA 10 · 6. PERSONALIDAD · SI LA MARCA FUERA UNA PERSONA (BENEFIC PÁG. 11)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="width:100%; height:100%; position:relative; overflow:hidden; background:{dark_canvas_hex};">
      <img src="{img_app}" alt="Personalidad {b_name}" style="width:100%; height:100%; object-fit:cover; opacity:0.55;" />
      <div style="position:absolute; inset:0; background:linear-gradient(90deg, rgba(9,13,22,0.82) 0%, rgba(9,13,22,0.40) 100%);"></div>

      <div style="position:absolute; top:16mm; left:20mm; z-index:5; max-width:110mm;">
        <div class="bb-num-title">
          <span class="bb-big-index" style="color:#FFFFFF;">6</span>
          <h2 class="bb-h1" style="color:#FFFFFF;">PERSONALIDAD</h2>
        </div>
        <div class="bb-subtitle" style="color:{accent_hex}; margin-left:34px;">RETRATO HUMANO: SI {b_upper} FUERA UNA PERSONA</div>
        <div style="margin-top:8mm; background:rgba(9,13,22,0.78); border:1px solid rgba(255,255,255,0.18); border-left:4px solid {accent_hex}; border-radius:12px; padding:12px 14px; color:#F8FAFC; font-size:8.8pt; line-height:1.55;">
          <strong style="color:{accent_hex}; text-transform:uppercase; letter-spacing:0.08em; display:block; margin-bottom:4px;">¿Cómo entra a una sala y cómo se relaciona?</strong>
          Si <strong>{b_name}</strong> fuera una persona en carne y hueso, combinaría la seguridad de un especialista senior con la calidez de un socio estratégico que escucha al 100%, habla sin tecnicismos confusos y viste con elegancia funcional.
        </div>
      </div>

      <!-- Tarjeta blanca translúcida a la derecha estilo BENEFIC Pág. 11 con Personificación + Cliente Ideal -->
      <div style="position:absolute; right:18mm; top:50%; transform:translateY(-50%); width:144mm; background:rgba(255,255,255,0.96); border-radius:14px; padding:9mm 11mm; box-shadow:0 20px 50px rgba(0,0,0,0.35); border-left:5px solid {accent_hex}; z-index:5;">
        <div style="font-family:'{pri_font}',sans-serif; font-size:9.5pt; font-weight:800; color:{accent_hex}; letter-spacing:0.11em; text-transform:uppercase; margin-bottom:5px;">
          1. Si {b_name} fuera una Persona (Carácter, Voz y Porte)
        </div>
        <p style="font-size:9.5pt; color:#1E293B; line-height:1.52; margin:0 0 10px 0;">
          {brand_persona}
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:8px 10px; font-size:8.2pt; color:#334155;">
          <div><strong style="color:{dark_canvas_hex};">• Cómo habla:</strong> Con claridad ejecutiva, empatía real y enfoque en soluciones.<br/><strong style="color:{dark_canvas_hex};">• Cómo viste:</strong> Sobriedad contemporánea, pulcritud e intención.</div>
          <div><strong style="color:{dark_canvas_hex};">• Cómo trata:</strong> Escucha activa y acompañamiento sin fricción.<br/><strong style="color:{dark_canvas_hex};">• Qué jamás haría:</strong> Usar letra pequeña, improvisar o ser arrogante.</div>
        </div>
        <div style="border-top:1px solid #CBD5E1; padding-top:9px; font-family:'{pri_font}',sans-serif; font-size:9.5pt; font-weight:800; color:{dark_canvas_hex}; letter-spacing:0.11em; text-transform:uppercase; margin-bottom:4px;">
          2. Nuestro Cliente Ideal (Con Quién Conecta)
        </div>
        <p style="font-size:9pt; color:#334155; line-height:1.5; margin:0;">
          {ideal_customer}
        </p>
      </div>
    </div>
    {page_footer(10, "POSICIONAMIENTO", dark_mode=True)}
  </section>

  <!-- =========================================================================
       PÁGINA 11 · 7. SU COMPORTAMIENTO · SI FUERA UNA PERSONA (5 BANDAS · BENEFIC PÁG. 12)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div>
        <div class="bb-num-title">
          <span class="bb-big-index">7</span>
          <h2 class="bb-h1">SU COMPORTAMIENTO</h2>
        </div>
        <div class="bb-subtitle" style="margin-left:34px;">CÓDIGO DE CONDUCTA: SI {b_upper} FUERA UNA PERSONA EN CADA INTERACCIÓN</div>
      </div>

      <div style="display:flex; flex-direction:column; gap:7px; margin:auto 0; padding:2mm 0;">
        <div style="display:grid; grid-template-columns:68mm 36mm 1fr; align-items:stretch; border:1px solid #E2E8F0; border-radius:8px; overflow:hidden;">
          <div style="background:{accent_hex}; color:#FFFFFF; padding:10px 14px; font-weight:800; font-size:8.2pt; letter-spacing:0.08em; display:flex; align-items:center;">CARÁCTER Y ARQUETIPO</div>
          <div style="background:#F8FAFC; padding:10px 12px; font-weight:800; font-size:8.5pt; color:{accent_hex}; display:flex; align-items:center; border-right:1px solid #E2E8F0;">Quién es</div>
          <div style="background:#FFFFFF; padding:10px 14px; font-size:8.8pt; color:#334155; display:flex; align-items:center;">{brand_persona}</div>
        </div>

        <div style="display:grid; grid-template-columns:68mm 36mm 1fr; align-items:stretch; border:1px solid #E2E8F0; border-radius:8px; overflow:hidden;">
          <div style="background:{dark_canvas_hex}; color:#FFFFFF; padding:10px 14px; font-weight:800; font-size:8.2pt; letter-spacing:0.08em; display:flex; align-items:center;">VOZ Y EXPRESIÓN VERBAL</div>
          <div style="background:#F8FAFC; padding:10px 12px; font-weight:800; font-size:8.5pt; color:{dark_canvas_hex}; display:flex; align-items:center; border-right:1px solid #E2E8F0;">Cómo habla</div>
          <div style="background:#FFFFFF; padding:10px 14px; font-size:8.8pt; color:#334155; display:flex; align-items:center;">Directa, empática y resolutiva · Promesa central: “{core_message}”</div>
        </div>

        <div style="display:grid; grid-template-columns:68mm 36mm 1fr; align-items:stretch; border:1px solid #E2E8F0; border-radius:8px; overflow:hidden;">
          <div style="background:{sec_accent_hex}; color:#FFFFFF; padding:10px 14px; font-weight:800; font-size:8.2pt; letter-spacing:0.08em; display:flex; align-items:center;">TRATO EN MOMENTOS DE VERDAD</div>
          <div style="background:#F8FAFC; padding:10px 12px; font-weight:800; font-size:8.5pt; color:{sec_accent_hex}; display:flex; align-items:center; border-right:1px solid #E2E8F0;">Cómo trata</div>
          <div style="background:#FFFFFF; padding:10px 14px; font-size:8.8pt; color:#334155; display:flex; align-items:center;">{customer_behavior}</div>
        </div>

        <div style="display:grid; grid-template-columns:68mm 36mm 1fr; align-items:stretch; border:1px solid #E2E8F0; border-radius:8px; overflow:hidden;">
          <div style="background:{accent_hex}; color:#FFFFFF; padding:10px 14px; font-weight:800; font-size:8.2pt; letter-spacing:0.08em; display:flex; align-items:center;">VESTIMENTA Y PRESENCIA</div>
          <div style="background:#F8FAFC; padding:10px 12px; font-weight:800; font-size:8.5pt; color:{accent_hex}; display:flex; align-items:center; border-right:1px solid #E2E8F0;">Cómo luce</div>
          <div style="background:#FFFFFF; padding:10px 14px; font-size:8.8pt; color:#334155; display:flex; align-items:center;">{brand_world}</div>
        </div>

        <div style="display:grid; grid-template-columns:68mm 36mm 1fr; align-items:stretch; border:1px solid #E2E8F0; border-radius:8px; overflow:hidden;">
          <div style="background:{dark_canvas_hex}; color:#FFFFFF; padding:10px 14px; font-weight:800; font-size:8.2pt; letter-spacing:0.08em; display:flex; align-items:center;">EXPERIENCIA EN TOUCHPOINTS</div>
          <div style="background:#F8FAFC; padding:10px 12px; font-weight:800; font-size:8.2pt; color:{dark_canvas_hex}; display:flex; align-items:center; border-right:1px solid #E2E8F0;">Antes · Durante · Después</div>
          <div style="background:#FFFFFF; padding:8px 12px; font-size:7.6pt; color:#334155; display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; align-items:start;">
            <div style="border-left:2.5px solid #0284C7; padding-left:6px;"><strong style="color:#0284C7;">1. ANTES:</strong><br/>{" · ".join(tp_antes_list)}</div>
            <div style="border-left:2.5px solid {accent_hex}; padding-left:6px;"><strong style="color:{accent_hex};">2. DURANTE:</strong><br/>{" · ".join(tp_durante_list)}</div>
            <div style="border-left:2.5px solid #059669; padding-left:6px;"><strong style="color:#059669;">3. DESPUÉS:</strong><br/>{" · ".join(tp_despues_list)}</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    {page_footer(11, "POSICIONAMIENTO")}
  </section>

  <!-- =========================================================================
       PÁGINA 12 · 8. SU MUNDO (MOODBOARD 2x3 · ESTÁNDAR BENEFIC PÁG. 13)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="padding:14mm 20mm 8mm 20mm; display:flex; justify-content:space-between; align-items:baseline;">
      <div class="bb-num-title">
        <span class="bb-big-index">8</span>
        <h2 class="bb-h1">SU MUNDO</h2>
      </div>
      <div style="font-size:9.5pt; color:#475569; max-width:165mm; text-align:right;">
        {brand_world}
      </div>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; grid-template-rows:64mm 64mm; gap:3mm; padding:0 20mm; margin-bottom:auto;">
      <img src="{img_arch}" alt="Mundo 1" style="width:100%; height:100%; object-fit:cover; border-radius:6px;" />
      <img src="{img_stat}" alt="Mundo 2" style="width:100%; height:100%; object-fit:cover; border-radius:6px;" />
      <img src="{img_digi}" alt="Mundo 3" style="width:100%; height:100%; object-fit:cover; border-radius:6px;" />
      <img src="{img_pack}" alt="Mundo 4" style="width:100%; height:100%; object-fit:cover; border-radius:6px;" />
      <img src="{img_tp}" alt="Mundo 5" style="width:100%; height:100%; object-fit:cover; border-radius:6px;" />
      <img src="{img_app}" alt="Mundo 6" style="width:100%; height:100%; object-fit:cover; border-radius:6px;" />
    </div>
    {page_footer(12, "POSICIONAMIENTO")}
  </section>

  <!-- =========================================================================
       PÁGINA 13 · A. LOGOTIPO (POSITIVO Y NEGATIVO · BENEFIC PÁG. 14)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad" style="padding-bottom:0;">
      <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:12mm; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">A</span>
            <h2 class="bb-h1">LOGOTIPO</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">FIRMA OFICIAL POSITIVA Y NEGATIVA</div>
        </div>
        <p style="font-size:9.5pt; color:#475569; line-height:1.55; margin:0;">
          El logotipo de <strong>{b_name}</strong> es su firma rectora. Integra el símbolo constructivo en proporción áurea (φ = 1.618) con la tipografía oficial <strong>{pri_font}</strong>. A continuación se presenta su versión positiva sobre fondo claro y su versión negativa calada sobre fondo corporativo.
        </p>
      </div>

      <!-- Versión Positiva sobre Blanco -->
      <div style="flex:1; display:flex; align-items:center; justify-content:center; background:#FFFFFF;">
        {build_lockup_svg(is_dark=False, uid_suffix="p13_pos", width_px=420, height_px=115)}
      </div>

      <!-- Versión Negativa sobre Bloque de Color de Marca -->
      <div style="height:64mm; margin:0 -20mm; background:{dark_canvas_hex}; display:flex; align-items:center; justify-content:center; border-top:3px solid {accent_hex};">
        {build_lockup_svg(is_dark=True, uid_suffix="p13_neg", width_px=420, height_px=115)}
      </div>
    </div>
    {page_footer(13, "CONSTRUCCIÓN DE LA MARCA", dark_mode=True)}
  </section>

  <!-- =========================================================================
       PÁGINA 14 · B. SÍMBOLO (EMBLEMA CONTENEDOR Y GLIFO AISLADO · BENEFIC PÁG. 15)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:12mm; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">B</span>
            <h2 class="bb-h1">SÍMBOLO</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">ISOTIPO Y MONOGRAMA CONSTRUCTIVO ({initials})</div>
        </div>
        <p style="font-size:9.5pt; color:#475569; line-height:1.55; margin:0;">
          El símbolo sintetiza la esencia de <strong>{b_name}</strong> y sus iniciales <strong>{initials}</strong> en un chasis óptico 1:1. Cuenta con dos variantes oficiales: versión con contenedor sólido (ideal para avatares, ícono de app y sellos) y versión de glifo libre sobre fondo claro.
        </p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20mm; margin:auto 0; align-items:center;">
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12mm; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:20px;">
          <div style="width:140px; height:140px; border-radius:30px; background:{dark_canvas_hex}; display:flex; align-items:center; justify-content:center; box-shadow:0 12px 28px rgba(9,13,22,0.18); border:2px solid {accent_hex};">
            <svg viewBox="-54 -54 108 108" width="110" height="110">{sym_white_on_dark}</svg>
          </div>
          <span style="margin-top:12px; font-family:'JetBrains Mono',monospace; font-size:8.5pt; font-weight:700; color:#334155;">B1 · VERSIÓN CONTENEDOR / APP ICON (MISMO SÍMBOLO EN NEGATIVO)</span>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12mm; background:#FFFFFF; border:1px solid #E2E8F0; border-radius:20px;">
          <div style="width:140px; height:140px; display:flex; align-items:center; justify-content:center;">
            <svg viewBox="-54 -54 108 108" width="128" height="128">{sym_color_on_white}</svg>
          </div>
          <span style="margin-top:12px; font-family:'JetBrains Mono',monospace; font-size:8.5pt; font-weight:700; color:#334155;">B2 · VERSIÓN GLIFO PURO EN CURVAS (MISMO SÍMBOLO EN POSITIVO)</span>
        </div>
      </div>
      <div></div>
    </div>
    {page_footer(14, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 15 · C. RELACIÓN LOGO/SÍMBOLO (PROPORCIÓN MÁXIMA Y MÍNIMA · BENEFIC PÁG. 16)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:12mm; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">C</span>
            <h2 class="bb-h1">RELACIÓN LOGO/SÍMBOLO</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">PROPORCIÓN MODULAR 8X × 3X</div>
        </div>
        <p style="font-size:9.5pt; color:#475569; line-height:1.55; margin:0;">
          Para preservar el equilibrio visual entre el símbolo y el logotipo tipográfico de <strong>{b_name}</strong>, se establece una retícula constructiva donde el alto del bloque tipográfico corresponde a <strong>1.8X</strong> respecto al núcleo del símbolo, manteniendo siempre alineación axial al centro.
        </p>
      </div>

      <div style="margin:auto 0; display:flex; justify-content:center;">
        <svg viewBox="0 0 860 250" width="100%" height="230" xmlns="http://www.w3.org/2000/svg">
          <!-- Guías punteadas horizontales de proporción -->
          <line x1="60" y1="45" x2="800" y2="45" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6 4"/>
          <line x1="60" y1="125" x2="800" y2="125" stroke="{accent_hex}" stroke-width="1.2" stroke-dasharray="4 4"/>
          <line x1="60" y1="205" x2="800" y2="205" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6 4"/>
          <line x1="250" y1="80" x2="800" y2="80" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4 4"/>
          <line x1="250" y1="170" x2="800" y2="170" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4 4"/>

          <!-- Caja del Símbolo -->
          <rect x="95" y="45" width="160" height="160" fill="rgba(197,155,39,0.06)" stroke="{accent_hex}" stroke-width="1.5" stroke-dasharray="5 4"/>
          <g transform="translate(175, 125) scale(1.25)">{sym_color_on_white}</g>

          <!-- Separador 0.5X -->
          <rect x="255" y="45" width="40" height="160" fill="rgba(2,132,199,0.06)" stroke="#38BDF8" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="275" y="36" fill="#0284C7" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">0.5X</text>

          <!-- Bloque Tipográfico -->
          <rect x="295" y="80" width="465" height="90" fill="none" stroke="{dark_canvas_hex}" stroke-width="1.2" stroke-dasharray="5 4"/>
          <text x="310" y="132" fill="{dark_canvas_hex}" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="44">{b_name}</text>
          <text x="312" y="158" fill="{accent_hex}" font-family="'{sec_font}',sans-serif" font-weight="700" font-size="10.2" letter-spacing="2.1">{tagline[:52].upper()}</text>

          <!-- Etiquetas MÁXIMO y MÍNIMO como en BENEFIC Pág. 16 -->
          <text x="775" y="42" fill="#475569" font-family="monospace" font-size="9.5" font-weight="700" text-anchor="end">MÁXIMO (3X)</text>
          <text x="775" y="76" fill="{accent_hex}" font-family="monospace" font-size="9.5" font-weight="700" text-anchor="end">ALTO TEXTO (1.8X)</text>
        </svg>
      </div>
      <div></div>
    </div>
    {page_footer(15, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 16 · D. ÁREA DE SEGURIDAD (1X CON INICIAL DE MARCA · BENEFIC PÁG. 17)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:12mm; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">D</span>
            <h2 class="bb-h1">ÁREA DE SEGURIDAD</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">ZONA DE RESPETO PERIMETRAL 1X</div>
        </div>
        <p style="font-size:9.5pt; color:#475569; line-height:1.55; margin:0;">
          El área de seguridad garantiza la legibilidad e impacto de <strong>{b_name}</strong> evitando que textos, bordes o elementos externos invadan su espacio. La medida base <strong>1X</strong> equivale a la altura de la inicial <strong>“{initials[:1]}”</strong> del logotipo en cualquiera de sus dimensiones.
        </p>
      </div>

      <div style="margin:auto 0; display:grid; grid-template-columns:1.4fr 0.9fr; gap:14mm; align-items:center;">
        <!-- Diagrama Lockup con X perimetral -->
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:16px; display:flex; justify-content:center;">
          <svg viewBox="0 0 520 220" width="100%" height="195">
            <rect x="30" y="20" width="460" height="180" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="6 4"/>
            <rect x="80" y="65" width="360" height="90" fill="#FFFFFF" stroke="{accent_hex}" stroke-width="1.5" stroke-dasharray="4 4"/>
            <!-- Iniciales X en los 4 costados como en BENEFIC Pág. 17 -->
            <text x="55" y="120" fill="{accent_hex}" opacity="0.35" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="28" text-anchor="middle">{initials[:1]}</text>
            <text x="465" y="120" fill="{accent_hex}" opacity="0.35" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="28" text-anchor="middle">{initials[:1]}</text>
            <text x="260" y="52" fill="{accent_hex}" opacity="0.35" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="28" text-anchor="middle">{initials[:1]}</text>
            <text x="260" y="192" fill="{accent_hex}" opacity="0.35" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="28" text-anchor="middle">{initials[:1]}</text>
            <g transform="translate(130, 110) scale(0.72)">{sym_color_on_white}</g>
            <text x="182" y="118" fill="{dark_canvas_hex}" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="28">{b_name}</text>
          </svg>
        </div>

        <!-- Diagrama Símbolo Aislado con X perimetral -->
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:16px; display:flex; justify-content:center;">
          <svg viewBox="0 0 260 220" width="100%" height="195">
            <rect x="30" y="15" width="200" height="190" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="6 4"/>
            <rect x="75" y="55" width="110" height="110" fill="#FFFFFF" stroke="{accent_hex}" stroke-width="1.5" stroke-dasharray="4 4"/>
            <text x="52" y="120" fill="{accent_hex}" opacity="0.35" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="26" text-anchor="middle">{initials[:1]}</text>
            <text x="208" y="120" fill="{accent_hex}" opacity="0.35" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="26" text-anchor="middle">{initials[:1]}</text>
            <g transform="translate(130, 110) scale(0.88)">{sym_color_on_white}</g>
          </svg>
        </div>
      </div>
      <div></div>
    </div>
    {page_footer(16, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 17 · E. COLOR (TABLA PANTONE / CMYK / RGB / HEX · BENEFIC PÁG. 18)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:0.85fr 1.65fr; gap:14mm; height:100%; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">E</span>
            <h2 class="bb-h1">COLOR</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px; margin-bottom:6mm;">FORMULACIÓN OFICIAL IMPRENTA Y PANTALLA</div>
          <p style="font-size:9.5pt; color:#475569; line-height:1.6;">
            El color es uno de los activos de mayor recordación sensorial de <strong>{b_name}</strong>. Es indispensable respetar los códigos exactos de tintas directas (<strong>Pantone Solid Coated</strong>), selección de color (<strong>CMYK FOGRA39</strong>) y valores digitales (<strong>RGB / HEX</strong>).
          </p>
        </div>

        <!-- Tabla de 4 columnas idéntica a BENEFIC Pág. 18 -->
        <div style="margin-top:4mm;">
          <div style="display:grid; grid-template-columns:1.2fr 1fr 1fr 0.9fr 0.9fr; gap:8px; border-bottom:2px solid #CBD5E1; padding-bottom:8px; font-family:'{pri_font}',sans-serif; font-size:7.5pt; font-weight:800; color:#475569; letter-spacing:0.08em;">
            <div>MUESTRA OFICIAL</div>
            <div>PANTONE<br/><span style="font-weight:400; font-size:6.5pt;">TINTAS DIRECTAS</span></div>
            <div>CMYK<br/><span style="font-weight:400; font-size:6.5pt;">SELECCIÓN DE COLOR</span></div>
            <div>RGB<br/><span style="font-weight:400; font-size:6.5pt;">PANTALLA</span></div>
            <div>HEX / HTML<br/><span style="font-weight:400; font-size:6.5pt;">WEB / APP</span></div>
          </div>

          <div style="font-size:8pt; font-weight:800; color:{accent_hex}; letter-spacing:0.14em; margin:12px 0 8px 0;">COLORES PRIMARIOS</div>
          {"".join([f'''
          <div style="display:grid; grid-template-columns:1.2fr 1fr 1fr 0.9fr 0.9fr; gap:8px; align-items:center; padding:8px 0; border-bottom:1px solid #F1F5F9; font-size:8.5pt;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:42px; height:36px; border-radius:9px; background:{c["hex"]}; border:1px solid #CBD5E1; flex-shrink:0;"></div>
              <span style="font-weight:700; font-size:8pt; color:#1E293B;">{c["role"]}</span>
            </div>
            <div style="font-family:monospace; color:#334155;">{c["pantone"]}</div>
            <div style="font-family:monospace; color:#334155;">{c["cmyk"]}</div>
            <div style="font-family:monospace; color:#334155;">{c["rgb"]}</div>
            <div style="font-family:monospace; font-weight:700; color:#090D16;">{c["hex"]}</div>
          </div>
          ''' for c in c_rows[:2]])}

          <div style="font-size:8pt; font-weight:800; color:#64748B; letter-spacing:0.14em; margin:14px 0 8px 0;">COLORES SECUNDARIOS Y DE SOPORTE</div>
          {"".join([f'''
          <div style="display:grid; grid-template-columns:1.2fr 1fr 1fr 0.9fr 0.9fr; gap:8px; align-items:center; padding:8px 0; border-bottom:1px solid #F1F5F9; font-size:8.5pt;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:42px; height:18px; border-radius:99px; background:{c["hex"]}; border:1px solid #CBD5E1; flex-shrink:0;"></div>
              <span style="font-weight:700; font-size:8pt; color:#1E293B;">{c["role"]}</span>
            </div>
            <div style="font-family:monospace; color:#334155;">{c["pantone"]}</div>
            <div style="font-family:monospace; color:#334155;">{c["cmyk"]}</div>
            <div style="font-family:monospace; color:#334155;">{c["rgb"]}</div>
            <div style="font-family:monospace; font-weight:700; color:#090D16;">{c["hex"]}</div>
          </div>
          ''' for c in c_rows[2:]])}
        </div>
      </div>
    </div>
    {page_footer(17, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 18 · F. USOS SOBRE FONDOS Y FOTOGRAFÍA (CUADRÍCULA 2x2 · BENEFIC PÁG. 19)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:0.85fr 1.65fr; gap:14mm; height:100%; align-items:center;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">F</span>
            <h2 class="bb-h1">USOS</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px; margin-bottom:6mm;">REGLAS DE CONTRASTE Y FONDOS</div>
          <p style="font-size:9.5pt; color:#475569; line-height:1.6;">
            El logotipo de <strong>{b_name}</strong> debe utilizarse preferentemente en su versión positiva sobre fondo blanco o claro, y en versión negativa sobre bloques de color corporativo. Sobre fotografías, colóquese siempre en zonas limpias de alto contraste.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div style="border:1.5px solid #CBD5E1; border-radius:12px; padding:18px; background:#FFFFFF; text-align:center;">
            <div style="height:88px; display:flex; align-items:center; justify-content:center;">
              {build_lockup_svg(is_dark=False, uid_suffix="f1", width_px=240, height_px=70)}
            </div>
            <div style="font-size:8.5pt; font-weight:700; color:#334155; margin-top:6px;">1. Positivo sobre fondo claro</div>
          </div>

          <div style="border:1.5px solid {dark_canvas_hex}; border-radius:12px; padding:18px; background:{dark_canvas_hex}; text-align:center;">
            <div style="height:88px; display:flex; align-items:center; justify-content:center;">
              {build_lockup_svg(is_dark=True, uid_suffix="f2", width_px=240, height_px=70)}
            </div>
            <div style="font-size:8.5pt; font-weight:700; color:#FFFFFF; margin-top:6px;">2. Negativo sobre fondo institucional</div>
          </div>

          <div style="border:1.5px solid #CBD5E1; border-radius:12px; overflow:hidden; position:relative; height:132px;">
            <img src="{img_arch}" alt="Fondo foto limpia" style="width:100%; height:100%; object-fit:cover;" />
            <div style="position:absolute; inset:0; background:rgba(9,13,22,0.52); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12px;">
              {build_lockup_svg(is_dark=True, uid_suffix="f3", width_px=230, height_px=66)}
              <div style="font-size:8pt; font-weight:700; color:#FFFFFF; margin-top:4px;">3. Sobre fotografía en zona legible</div>
            </div>
          </div>

          <div style="border:1.5px solid #FCA5A5; border-radius:12px; overflow:hidden; position:relative; height:132px;">
            <img src="{img_tp}" alt="Fondo saturado" style="width:100%; height:100%; object-fit:cover; filter:contrast(1.35) saturate(1.8);" />
            <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12px; background:rgba(220,38,38,0.18);">
              <line x1="0" y1="0" x2="300" y2="140" stroke="#DC2626" stroke-width="3"/>
              <div style="background:rgba(255,255,255,0.92); padding:6px 12px; border-radius:6px; font-size:8pt; font-weight:800; color:#991B1B;">
                ✕ Evitar fondos con ruido visual sin reserva
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {page_footer(18, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 19 · G. RESTRICCIONES (6 USOS INCORRECTOS TACHADOS · BENEFIC PÁG. 20)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:0.85fr 1.65fr; gap:14mm; height:100%; align-items:center;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">G</span>
            <h2 class="bb-h1">RESTRICCIONES</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px; margin-bottom:6mm;">USOS NO AUTORIZADOS</div>
          <p style="font-size:9.5pt; color:#475569; line-height:1.6;">
            El logotipo y el símbolo de <strong>{b_name}</strong> nunca deben ser alterados. Cualquier distorsión geométrica, cambio cromático fuera de la paleta o sustitución tipográfica debilita la autoridad de la marca.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
          <!-- 1. Cambiar colores o efectos -->
          <div style="border:1px solid #E2E8F0; border-radius:10px; padding:12px; text-align:center; position:relative; background:#F8FAFC;">
            <div style="height:72px; display:flex; align-items:center; justify-content:center; filter:hue-rotate(145deg) drop-shadow(3px 4px 4px #EC4899);">
              {build_lockup_svg(is_dark=False, uid_suffix="g1", width_px=170, height_px=54)}
            </div>
            <svg style="position:absolute; inset:0; width:100%; height:75%; pointer-events:none;"><line x1="15%" y1="80%" x2="85%" y2="20%" stroke="#DC2626" stroke-width="1.8"/></svg>
            <div style="font-size:7.5pt; color:#475569; font-weight:700;">1. Cambiar colores o usar sombras</div>
          </div>

          <!-- 2. Alterar proporciones -->
          <div style="border:1px solid #E2E8F0; border-radius:10px; padding:12px; text-align:center; position:relative; background:#F8FAFC;">
            <div style="height:72px; display:flex; align-items:center; justify-content:center; transform:scaleX(0.62) scaleY(1.28);">
              {build_lockup_svg(is_dark=False, uid_suffix="g2", width_px=170, height_px=54)}
            </div>
            <svg style="position:absolute; inset:0; width:100%; height:75%; pointer-events:none;"><line x1="15%" y1="80%" x2="85%" y2="20%" stroke="#DC2626" stroke-width="1.8"/></svg>
            <div style="font-size:7.5pt; color:#475569; font-weight:700;">2. Deformar o estirar proporciones</div>
          </div>

          <!-- 3. Outlines -->
          <div style="border:1px solid #E2E8F0; border-radius:10px; padding:12px; text-align:center; position:relative; background:#F8FAFC;">
            <div style="height:72px; display:flex; align-items:center; justify-content:center;">
              <span style="font-family:'{pri_font}',sans-serif; font-size:20pt; font-weight:800; color:transparent; -webkit-text-stroke:1.2px #64748B;">{b_name}</span>
            </div>
            <svg style="position:absolute; inset:0; width:100%; height:75%; pointer-events:none;"><line x1="15%" y1="80%" x2="85%" y2="20%" stroke="#DC2626" stroke-width="1.8"/></svg>
            <div style="font-size:7.5pt; color:#475569; font-weight:700;">3. Aplicar contornos (Outlines)</div>
          </div>

          <!-- 4. Girarlo -->
          <div style="border:1px solid #E2E8F0; border-radius:10px; padding:12px; text-align:center; position:relative; background:#F8FAFC;">
            <div style="height:72px; display:flex; align-items:center; justify-content:center; transform:rotate(-22deg);">
              {build_lockup_svg(is_dark=False, uid_suffix="g4", width_px=165, height_px=50)}
            </div>
            <svg style="position:absolute; inset:0; width:100%; height:75%; pointer-events:none;"><line x1="15%" y1="80%" x2="85%" y2="20%" stroke="#DC2626" stroke-width="1.8"/></svg>
            <div style="font-size:7.5pt; color:#475569; font-weight:700;">4. Inclinar o girar el logotipo</div>
          </div>

          <!-- 5. Cambiar tipografía -->
          <div style="border:1px solid #E2E8F0; border-radius:10px; padding:12px; text-align:center; position:relative; background:#F8FAFC;">
            <div style="height:72px; display:flex; align-items:center; justify-content:center; font-family:'Courier New',monospace; font-size:16pt; font-weight:700; color:#334155;">
              {b_name}
            </div>
            <svg style="position:absolute; inset:0; width:100%; height:75%; pointer-events:none;"><line x1="15%" y1="80%" x2="85%" y2="20%" stroke="#DC2626" stroke-width="1.8"/></svg>
            <div style="font-size:7.5pt; color:#475569; font-weight:700;">5. Cambiar su tipografía oficial</div>
          </div>

          <!-- 6. Reorganizar elementos -->
          <div style="border:1px solid #E2E8F0; border-radius:10px; padding:12px; text-align:center; position:relative; background:#F8FAFC;">
            <div style="height:72px; display:flex; align-items:center; justify-content:center; gap:4px;">
              <span style="font-family:'{pri_font}',sans-serif; font-weight:800; font-size:13pt;">{b_name}</span>
              <svg viewBox="-54 -54 108 108" width="32" height="32">{sym_color_on_white}</svg>
            </div>
            <svg style="position:absolute; inset:0; width:100%; height:75%; pointer-events:none;"><line x1="15%" y1="80%" x2="85%" y2="20%" stroke="#DC2626" stroke-width="1.8"/></svg>
            <div style="font-size:7.5pt; color:#475569; font-weight:700;">6. Invertir o desalinear elementos</div>
          </div>
        </div>
      </div>
    </div>
    {page_footer(19, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 20 · H. REDUCCIÓN MÍNIMA (IMPRESO Y DIGITAL · BENEFIC PÁG. 21)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:12mm; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">H</span>
            <h2 class="bb-h1">REDUCCIÓN</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">TAMAÑOS MÍNIMOS DE REPRODUCCIÓN</div>
        </div>
        <p style="font-size:9.5pt; color:#475569; line-height:1.55; margin:0;">
          Para evitar el empastado de tintas en imprenta, bordado textil o pixelación en pantallas móviles, se establecen las siguientes escalas mínimas inviolables para el logotipo completo y para el símbolo aislado de <strong>{b_name}</strong>.
        </p>
      </div>

      <div style="margin:auto 0; display:grid; grid-template-columns:1fr 1fr; gap:20mm; align-items:center;">
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:16mm; text-align:center;">
          <div style="display:inline-block;">
            {build_lockup_svg(is_dark=False, uid_suffix="h_min", width_px=180, height_px=52)}
            <div style="border-top:1.5px solid {accent_hex}; margin-top:6px; padding-top:6px; font-family:'JetBrains Mono',monospace; font-size:9pt; font-weight:700; color:{dark_canvas_hex};">
              ├─ Ancho Mínimo: 2.0 cm (Impreso) / 90 px (Digital) ─┤
            </div>
          </div>
        </div>

        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:16mm; text-align:center;">
          <div style="display:inline-block;">
            <svg viewBox="-54 -54 108 108" width="52" height="52">{sym_color_on_white}</svg>
            <div style="border-top:1.5px solid {accent_hex}; margin-top:10px; padding-top:6px; font-family:'JetBrains Mono',monospace; font-size:9pt; font-weight:700; color:{dark_canvas_hex};">
              ├─ Símbolo Mínimo: 6.0 mm (Sello/Bordado) / 24 px (Favicon) ─┤
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    {page_footer(20, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 21 · I. TIPOGRAFÍA (PRIMARIA Y COMPLEMENTARIA · BENEFIC PÁG. 22)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:12mm; align-items:start;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">I</span>
            <h2 class="bb-h1">TIPOGRAFÍA</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">FAMILIAS TIPOGRÁFICAS OFICIALES</div>
        </div>
        <p style="font-size:9.5pt; color:#475569; line-height:1.55; margin:0;">
          El sistema tipográfico de <strong>{b_name}</strong> combina la fuerza geométrica de <strong>{pri_font}</strong> para titulares y cabeceras con la legibilidad humanista de <strong>{sec_font}</strong> para cuerpos de texto, documentos e interfaces digitales.
        </p>
      </div>

      <div style="margin:auto 0; display:grid; grid-template-columns:1fr 1fr; gap:18mm; border-top:1px solid #E2E8F0; padding-top:10mm;">
        <!-- Columna Primaria -->
        <div style="border-right:1px solid #CBD5E1; padding-right:14mm;">
          <div style="font-size:8.5pt; font-weight:800; color:{accent_hex}; letter-spacing:0.16em; margin-bottom:6px;">PRIMARIA · TITULARES Y MARCA</div>
          <div style="font-family:'{pri_font}',sans-serif; font-size:26pt; font-weight:800; color:{dark_canvas_hex}; margin-bottom:10px;">{pri_font}</div>
          <div style="font-family:'{pri_font}',sans-serif; font-size:11.5pt; font-weight:700; color:#334155; line-height:1.7; letter-spacing:0.06em;">
            A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br/>
            a b c d e f g h i j k l m n ñ o p q r s t u v w x y z<br/>
            <span style="color:{accent_hex};">0 1 2 3 4 5 6 7 8 9 · ! ¡ ? ¿ @ $ % &amp;</span>
          </div>
        </div>

        <!-- Columna Complementaria -->
        <div>
          <div style="font-size:8.5pt; font-weight:800; color:{sec_accent_hex}; letter-spacing:0.16em; margin-bottom:6px;">COMPLEMENTARIA · CUERPO EDITORIAL Y UI</div>
          <div style="font-family:'{sec_font}',sans-serif; font-size:26pt; font-weight:400; color:{dark_canvas_hex}; margin-bottom:10px;">{sec_font}</div>
          <div style="font-family:'{sec_font}',sans-serif; font-size:11.5pt; font-weight:400; color:#334155; line-height:1.7; letter-spacing:0.05em;">
            A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z<br/>
            a b c d e f g h i j k l m n ñ o p q r s t u v w x y z<br/>
            <span style="font-family:'JetBrains Mono',monospace; font-weight:700; color:{dark_canvas_hex};">0 1 2 3 4 5 6 7 8 9 (Cifras Tabulares)</span>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    {page_footer(21, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 22 · J. JERARQUÍA TIPOGRÁFICA (LÍNEAS CON PUNTO ───● · BENEFIC PÁG. 23)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div>
        <div class="bb-num-title">
          <span class="bb-big-index">J</span>
          <h2 class="bb-h1">JERARQUÍA TIPOGRÁFICA</h2>
        </div>
        <div class="bb-subtitle" style="margin-left:34px;">ORDEN DE LECTURA Y PESOS EDITORIALES</div>
      </div>

      <!-- Diagrama con líneas conectoras terminadas en punto idéntico a BENEFIC Pág. 23 -->
      <div style="margin:auto 0; display:flex; flex-direction:column; gap:10px;">
        <div style="display:grid; grid-template-columns:52mm 38mm 1fr; align-items:center; gap:10px;">
          <div style="text-align:right; font-size:8pt; font-weight:800; color:{accent_hex}; letter-spacing:0.12em;">TÍTULO PRINCIPAL<br/><span style="font-weight:400; color:#64748B;">{pri_font} Bold · 24pt</span></div>
          <div style="display:flex; align-items:center;"><div style="flex:1; height:1.5px; background:{accent_hex};"></div><div style="width:7px; height:7px; border-radius:50%; background:{accent_hex};"></div></div>
          <div style="font-family:'{pri_font}',sans-serif; font-size:20pt; font-weight:800; color:{dark_canvas_hex}; text-transform:uppercase;">{b_name}: EXCELENCIA CON PROPÓSITO</div>
        </div>

        <div style="display:grid; grid-template-columns:52mm 38mm 1fr; align-items:center; gap:10px;">
          <div style="text-align:right; font-size:8pt; font-weight:800; color:{accent_hex}; letter-spacing:0.12em;">SUBTÍTULO 1<br/><span style="font-weight:400; color:#64748B;">{pri_font} Medium · 14pt</span></div>
          <div style="display:flex; align-items:center;"><div style="flex:1; height:1.5px; background:{accent_hex};"></div><div style="width:7px; height:7px; border-radius:50%; background:{accent_hex};"></div></div>
          <div style="font-family:'{pri_font}',sans-serif; font-size:12.5pt; font-weight:600; color:#475569; letter-spacing:0.12em; text-transform:uppercase;">{tagline}</div>
        </div>

        <div style="display:grid; grid-template-columns:52mm 38mm 1fr; align-items:center; gap:10px;">
          <div style="text-align:right; font-size:8pt; font-weight:800; color:{accent_hex}; letter-spacing:0.12em;">INTRODUCCIÓN PRINCIPAL<br/><span style="font-weight:400; color:#64748B;">{sec_font} Regular · 11pt</span></div>
          <div style="display:flex; align-items:center;"><div style="flex:1; height:1.5px; background:{accent_hex};"></div><div style="width:7px; height:7px; border-radius:50%; background:{accent_hex};"></div></div>
          <div style="font-family:'{sec_font}',sans-serif; font-size:10.5pt; color:#1E293B; line-height:1.5;">{purpose_why}</div>
        </div>

        <div style="display:grid; grid-template-columns:52mm 38mm 1fr; align-items:center; gap:10px;">
          <div style="text-align:right; font-size:8pt; font-weight:800; color:{accent_hex}; letter-spacing:0.12em;">SUBTÍTULO 2 (SECCIÓN)<br/><span style="font-weight:400; color:#64748B;">{pri_font} Bold · 10pt</span></div>
          <div style="display:flex; align-items:center;"><div style="flex:1; height:1.5px; background:{accent_hex};"></div><div style="width:7px; height:7px; border-radius:50%; background:{accent_hex};"></div></div>
          <div style="font-family:'{pri_font}',sans-serif; font-size:10pt; font-weight:800; color:{accent_hex}; letter-spacing:0.08em; text-transform:uppercase;">DIFERENCIAL COMPETITIVO Y PROMESA DE ENTREGA</div>
        </div>

        <div style="display:grid; grid-template-columns:52mm 38mm 1fr; align-items:center; gap:10px;">
          <div style="text-align:right; font-size:8pt; font-weight:800; color:{accent_hex}; letter-spacing:0.12em;">CUERPO DE TEXTO<br/><span style="font-weight:400; color:#64748B;">{sec_font} Regular · 9.5pt</span></div>
          <div style="display:flex; align-items:center;"><div style="flex:1; height:1.5px; background:{accent_hex};"></div><div style="width:7px; height:7px; border-radius:50%; background:{accent_hex};"></div></div>
          <div style="font-family:'{sec_font}',sans-serif; font-size:9.5pt; color:#475569; line-height:1.55;">{value_offer}</div>
        </div>
      </div>
      <div></div>
    </div>
    {page_footer(22, "CONSTRUCCIÓN DE LA MARCA")}
  </section>

  <!-- =========================================================================
       PÁGINA 23 · ESTILO VISUAL & II. COLORES Y JERARQUÍAS (BENEFIC PÁGS. 24 Y 26)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:1fr 1.15fr; gap:16mm; height:100%; align-items:center;">
        <div>
          <span style="font-family:'JetBrains Mono',monospace; font-size:8pt; color:{accent_hex}; font-weight:800; letter-spacing:0.18em;">SECCIÓN III · ESTILO VISUAL</span>
          <h2 class="bb-h1" style="font-size:22pt; margin:4px 0 8px 0;">COLORES Y JERARQUÍAS</h2>
          <p style="font-size:9.5pt; color:#475569; line-height:1.6; margin:0 0 14px 0;">
            La proporción cromática es clave para mantener la elegancia editorial de <strong>{b_name}</strong>. Los tonos primarios (Superficie Blanca/Alabastro, Tinta Estructural y Acento Maestro) dominan entre el <strong>75% y 85%</strong> del espacio visual, reservando los secundarios a un máximo del <strong>25%</strong>.
          </p>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; height:42mm; border-radius:10px; overflow:hidden;">
            <img src="{img_stat}" alt="Estilo 1" style="width:100%; height:100%; object-fit:cover;" />
            <img src="{img_arch}" alt="Estilo 2" style="width:100%; height:100%; object-fit:cover;" />
            <img src="{img_pack}" alt="Estilo 3" style="width:100%; height:100%; object-fit:cover;" />
          </div>
        </div>

        <!-- Diagrama de Bloques de Proporción Cromática idéntico a BENEFIC Pág. 26 -->
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:18px;">
          <div style="font-size:8pt; font-weight:800; color:#475569; letter-spacing:0.14em; margin-bottom:8px;">PROPORCIÓN DE COLORES PRIMARIOS (75% – 85%)</div>
          <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:10px; height:76px; margin-bottom:14px;">
            <div style="background:{dark_canvas_hex}; color:#FFFFFF; border-radius:8px; padding:12px; display:flex; justify-content:space-between; align-items:flex-end; font-family:monospace; font-size:9pt; font-weight:700;">
              <span>TINTA ESTRUCTURAL</span><span>50% – 80%</span>
            </div>
            <div style="background:{accent_hex}; color:#FFFFFF; border-radius:8px; padding:12px; display:flex; justify-content:space-between; align-items:flex-end; font-family:monospace; font-size:9pt; font-weight:700;">
              <span>ACENTO MAESTRO</span><span>20% – 50%</span>
            </div>
          </div>

          <div style="font-size:8pt; font-weight:800; color:#64748B; letter-spacing:0.14em; margin-bottom:8px;">COLORES SECUNDARIOS Y AIRE EDITORIAL (MÁX. 25%)</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; height:48px;">
            <div style="background:{sec_accent_hex}; color:#FFFFFF; border-radius:8px; padding:10px; display:flex; justify-content:space-between; align-items:center; font-family:monospace; font-size:8.5pt; font-weight:700;">
              <span>SECUNDARIO</span><span>≤ 15%</span>
            </div>
            <div style="background:#FFFFFF; color:#090D16; border:1.5px solid #CBD5E1; border-radius:8px; padding:10px; display:flex; justify-content:space-between; align-items:center; font-family:monospace; font-size:8.5pt; font-weight:700;">
              <span>ESPACIO BLANCO</span><span>MÍN. 25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {page_footer(23, "ESTILO VISUAL")}
  </section>

  <!-- =========================================================================
       PÁGINA 24 · I. DIRECCIÓN DE FOTOGRAFÍA (PERSONAS, ENTORNO, DETALLES · BENEFIC PÁG. 25)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div>
        <div class="bb-num-title">
          <span class="bb-big-index">I</span>
          <h2 class="bb-h1">FOTOGRAFÍA</h2>
        </div>
        <div class="bb-subtitle" style="margin-left:34px;">DIRECCIÓN DE ARTE FOTOGRÁFICA: PERSONAS, ENTORNO Y DETALLES</div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10mm; margin:auto 0;">
        <div style="border:1px solid #E2E8F0; border-radius:14px; overflow:hidden; background:#FFFFFF;">
          <img src="{img_app}" alt="Personas y Equipo" style="width:100%; height:72mm; object-fit:cover;" />
          <div style="padding:12px 14px;">
            <div style="font-family:'{pri_font}',sans-serif; font-size:9.5pt; font-weight:800; color:{accent_hex}; margin-bottom:4px;">1. PERSONAS Y AUTENTICIDAD</div>
            <p style="font-size:8.5pt; color:#475569; line-height:1.5; margin:0;">Expresiones auténticas, seguras y naturales. Cero poses forzadas de banco de imágenes; enfoque en la confianza humana.</p>
          </div>
        </div>

        <div style="border:1px solid #E2E8F0; border-radius:14px; overflow:hidden; background:#FFFFFF;">
          <img src="{img_arch}" alt="Entorno y Arquitectura" style="width:100%; height:72mm; object-fit:cover;" />
          <div style="padding:12px 14px;">
            <div style="font-family:'{pri_font}',sans-serif; font-size:9.5pt; font-weight:800; color:{accent_hex}; margin-bottom:4px;">2. ENTORNO E ILUMINACIÓN</div>
            <p style="font-size:8.5pt; color:#475569; line-height:1.5; margin:0;">Composición limpia con profundidad de campo, iluminación natural o cálida controlada y orden geométrico.</p>
          </div>
        </div>

        <div style="border:1px solid #E2E8F0; border-radius:14px; overflow:hidden; background:#FFFFFF;">
          <img src="{img_pack}" alt="Detalles y Texturas" style="width:100%; height:72mm; object-fit:cover;" />
          <div style="padding:12px 14px;">
            <div style="font-family:'{pri_font}',sans-serif; font-size:9.5pt; font-weight:800; color:{accent_hex}; margin-bottom:4px;">3. DETALLES Y MATERIALIDAD</div>
            <p style="font-size:8.5pt; color:#475569; line-height:1.5; margin:0;">Primeros planos macro que destacan la textura de los materiales, acabados de imprenta e interfaces de alta precisión.</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    {page_footer(24, "ESTILO VISUAL")}
  </section>

  <!-- =========================================================================
       PÁGINA 25 · III. APLICACIONES: TARJETA DE PRESENTACIÓN (9 × 5 CM · BENEFIC PÁG. 27)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:0.85fr 1.65fr; gap:14mm; height:100%; align-items:center;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">III</span>
            <h2 class="bb-h1">APLICACIONES</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px; margin-bottom:6mm;">TARJETA DE PRESENTACIÓN</div>
          <p style="font-size:9pt; color:#334155; line-height:1.6;">
            <strong>Dimensiones:</strong> 9.0 × 5.0 cm (Horizontal)<br/>
            <strong>Sustrato:</strong> Papel algodón o Couché mate 350 g/m²<br/><br/>
            <strong>Frente:</strong> Fondo en color institucional ({dark_canvas_hex}) con el logotipo y símbolo de <strong>{b_name}</strong> centrado en acabado limpio.<br/><br/>
            <strong>Vuelta:</strong> Fondo blanco con nombre del ejecutivo en {pri_font} Bold, cargo, datos de contacto en {sec_font} Regular y el símbolo en marca de agua sutil a la derecha.
          </p>
        </div>

        <!-- Mockup Vectorial en Abanico con Sombra (Frente y Vuelta) como BENEFIC Pág. 27 -->
        <div style="display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 620 360" width="100%" height="310" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="cardShadow" x="-15%" y="-15%" width="135%" height="135%">
                <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#090D16" flood-opacity="0.22"/>
              </filter>
            </defs>
            <!-- Tarjeta Frente (Inclinada atrás) -->
            <g transform="translate(55, 35) rotate(-6)" filter="url(#cardShadow)">
              <rect width="310" height="175" rx="10" fill="{dark_canvas_hex}" stroke="{accent_hex}" stroke-width="1.5"/>
              <g transform="translate(155, 72) scale(0.82)">{sym_white_on_dark}</g>
              <text x="155" y="136" fill="#FFFFFF" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="18" text-anchor="middle" letter-spacing="1">{b_name}</text>
              <text x="155" y="152" fill="{accent_hex}" font-family="monospace" font-size="7.5" text-anchor="middle" letter-spacing="2">{clean_domain.upper()}</text>
            </g>

            <!-- Tarjeta Vuelta (Frente derecha) -->
            <g transform="translate(245, 130) rotate(4)" filter="url(#cardShadow)">
              <rect width="320" height="180" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2"/>
              <rect x="0" y="168" width="320" height="12" fill="{accent_hex}"/>
              <g transform="translate(265, 88) scale(0.95)" opacity="0.12">{sym_color_on_white}</g>
              <text x="28" y="48" fill="{dark_canvas_hex}" font-family="'{pri_font}',sans-serif" font-weight="800" font-size="15">DIRECCIÓN GENERAL</text>
              <text x="28" y="66" fill="{accent_hex}" font-family="'{sec_font}',sans-serif" font-weight="700" font-size="9.5" letter-spacing="1.5">FUNDADOR &amp; ESTRATEGIA · {b_upper}</text>
              <line x1="28" y1="80" x2="175" y2="80" stroke="#E2E8F0" stroke-width="1.5"/>
              <text x="28" y="104" fill="#334155" font-family="'{sec_font}',sans-serif" font-size="9.5">hola@{clean_domain}</text>
              <text x="28" y="122" fill="#334155" font-family="'{sec_font}',sans-serif" font-size="9.5">www.{clean_domain}</text>
              <text x="28" y="140" fill="#64748B" font-family="'{sec_font}',sans-serif" font-size="8.5">{tagline[:42]}</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
    {page_footer(25, "ESTILO VISUAL · APLICACIONES")}
  </section>

  <!-- =========================================================================
       PÁGINA 26 · III. APLICACIONES: HOJA MEMBRETADA Y PROPUESTA (21.5 × 28 CM · BENEFIC PÁGS. 28-29)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:0.85fr 1.65fr; gap:14mm; height:100%; align-items:center;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">III</span>
            <h2 class="bb-h1">APLICACIONES</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px; margin-bottom:6mm;">HOJA MEMBRETADA Y PROPUESTA COMERCIAL</div>
          <p style="font-size:9pt; color:#334155; line-height:1.6;">
            <strong>Dimensiones:</strong> 21.5 × 28.0 cm (Tamaño Carta)<br/><br/>
            <strong>Superior:</strong> Logotipo oficial de <strong>{b_name}</strong> alineado a la izquierda con datos de fecha y referencia a la derecha.<br/><br/>
            <strong>Medio:</strong> Cuerpo de carta o tabla de cotización en {sec_font} de 10pt sobre símbolo en marca de agua al 6% de opacidad.<br/><br/>
            <strong>Inferior:</strong> Pleca institucional en {dark_canvas_hex} y {accent_hex} con dominio web y contacto oficial.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:center;">
          <!-- Hoja Membretada -->
          <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:8px; padding:18px; height:142mm; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 14px 32px rgba(15,23,42,0.1); position:relative; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid #E2E8F0; padding-bottom:10px;">
              {build_lockup_svg(is_dark=False, uid_suffix="lh1", width_px=155, height_px=42)}
              <span style="font-family:monospace; font-size:7pt; color:#64748B;">CARTA OFICIAL</span>
            </div>
            <div style="position:absolute; right:-15px; top:42%; opacity:0.06; pointer-events:none;">
              <svg viewBox="-54 -54 108 108" width="160" height="160">{sym_color_on_white}</svg>
            </div>
            <div style="font-size:7.5pt; color:#475569; line-height:1.65; my:auto;">
              <strong style="color:#090D16;">Estimado Cliente / Aliado Estratégico:</strong><br/><br/>
              {purpose_why}<br/><br/>
              {value_offer}<br/><br/>
              Atentamente,<br/>
              <strong style="color:{dark_canvas_hex};">Dirección General · {b_name}</strong>
            </div>
            <div style="border-top:3px solid {accent_hex}; background:{dark_canvas_hex}; color:#FFFFFF; margin:0 -18px -18px -18px; padding:8px 16px; font-family:monospace; font-size:6.8pt; display:flex; justify-content:space-between;">
              <span>www.{clean_domain}</span>
              <span style="color:{accent_hex};">hola@{clean_domain}</span>
            </div>
          </div>

          <!-- Formulario Administrativo / Cotización -->
          <div style="background:#FFFFFF; border:1px solid #CBD5E1; border-radius:8px; padding:18px; height:142mm; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 14px 32px rgba(15,23,42,0.1); position:relative; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid {dark_canvas_hex}; padding-bottom:10px;">
              {build_lockup_svg(is_dark=False, uid_suffix="lh2", width_px=145, height_px=40)}
              <div style="text-align:right; font-family:monospace; font-size:7pt; color:{accent_hex}; font-weight:800;">PROPUESTA #001<br/><span style="color:#64748B;">FORMATO OFICIAL</span></div>
            </div>
            <div style="font-size:7.2pt; color:#334155;">
              <div style="display:grid; grid-template-columns:2.2fr 0.9fr 0.9fr; background:{dark_canvas_hex}; color:#FFFFFF; padding:5px 8px; font-weight:700; border-radius:4px;">
                <span>ETAPA / TOUCHPOINT (PASOS 1 Y 2)</span><span>FASE</span><span>ESTADO</span>
              </div>
              <div style="display:grid; grid-template-columns:2.2fr 0.9fr 0.9fr; padding:6px 8px; border-bottom:1px solid #E2E8F0;">
                <span>{step_1_txt[:48]}</span><span>Antes</span><span style="color:#059669; font-weight:700;">Activo</span>
              </div>
              <div style="display:grid; grid-template-columns:2.2fr 0.9fr 0.9fr; padding:6px 8px; border-bottom:1px solid #E2E8F0;">
                <span>{step_2_txt[:48]}</span><span>Durante</span><span style="color:#059669; font-weight:700;">Incluido</span>
              </div>
              <div style="display:grid; grid-template-columns:2.2fr 0.9fr 0.9fr; padding:6px 8px; border-bottom:1px solid #E2E8F0;">
                <span>{step_3_txt[:48]}</span><span>Después</span><span style="color:#059669; font-weight:700;">Certificado</span>
              </div>
            </div>
            <div style="border-top:3px solid {accent_hex}; background:{dark_canvas_hex}; color:#FFFFFF; margin:0 -18px -18px -18px; padding:8px 16px; font-family:monospace; font-size:6.8pt; display:flex; justify-content:space-between;">
              <span>{b_upper}</span>
              <span style="color:{accent_hex};">DOCUMENTO CONFIDENCIAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {page_footer(26, "ESTILO VISUAL · APLICACIONES")}
  </section>

  <!-- =========================================================================
       PÁGINA 27 · III. APLICACIONES: BANNER VERTICAL Y PÓSTER (BENEFIC PÁGS. 31-32)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:0.85fr 1.65fr; gap:14mm; height:100%; align-items:center;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">III</span>
            <h2 class="bb-h1">APLICACIONES</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px; margin-bottom:6mm;">BANNER VERTICAL Y PÓSTER PROMOCIONAL</div>
          <p style="font-size:9pt; color:#334155; line-height:1.6;">
            <strong>Superior:</strong> Fotografía de alto impacto con el símbolo de <strong>{b_name}</strong> en badge circular sobre la intersección.<br/><br/>
            <strong>Medio:</strong> Titular de promesa de valor en {pri_font} Bold sobre lienzo limpio.<br/><br/>
            <strong>Inferior:</strong> Cierre institucional en {dark_canvas_hex} con datos de contacto y sitio web oficial.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:0.75fr 1.25fr; gap:18px; align-items:center;">
          <!-- Banner Vertical Roll-up -->
          <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:10px; overflow:hidden; height:142mm; display:flex; flex-direction:column; box-shadow:0 14px 30px rgba(15,23,42,0.12); position:relative;">
            <div style="height:58mm; position:relative; overflow:hidden;">
              <img src="{img_arch}" alt="Banner" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="width:44px; height:44px; border-radius:50%; background:#FFFFFF; border:2px solid {accent_hex}; display:flex; align-items:center; justify-content:center; margin:-22px auto 8px auto; position:relative; z-index:3; box-shadow:0 6px 14px rgba(0,0,0,0.15);">
              <svg viewBox="-54 -54 108 108" width="32" height="32">{sym_color_on_white}</svg>
            </div>
            <div style="padding:8px 14px; text-align:center; flex:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:'{pri_font}',sans-serif; font-weight:800; font-size:12pt; color:{dark_canvas_hex};">{b_name}</div>
              <p style="font-size:7.8pt; color:#475569; line-height:1.45; margin:6px 0;">“{core_message}”</p>
            </div>
            <div style="background:{dark_canvas_hex}; color:{accent_hex}; text-align:center; padding:8px; font-family:monospace; font-size:7pt; font-weight:700;">
              www.{clean_domain}
            </div>
          </div>

          <!-- Póster Horizontal -->
          <div style="background:#FFFFFF; border:1.5px solid #CBD5E1; border-radius:10px; overflow:hidden; height:112mm; display:grid; grid-template-columns:1.1fr 1fr; box-shadow:0 14px 30px rgba(15,23,42,0.12);">
            <div style="position:relative; overflow:hidden;">
              <img src="{img_digi}" alt="Poster" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="background:{dark_canvas_hex}; color:#FFFFFF; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
              <svg viewBox="-54 -54 108 108" width="48" height="48">{sym_white_on_dark}</svg>
              <div>
                <div style="font-family:'{pri_font}',sans-serif; font-size:14pt; font-weight:800; color:#FFFFFF; line-height:1.15;">{b_name}</div>
                <div style="font-size:8pt; color:{accent_hex}; font-weight:700; margin-top:4px;">{tagline}</div>
                <p style="font-size:7.5pt; color:#CBD5E1; line-height:1.45; margin-top:8px;">{value_offer[:130]}</p>
              </div>
              <div style="font-family:monospace; font-size:7pt; color:{accent_hex}; border-top:1px solid rgba(255,255,255,0.15); padding-top:6px;">
                {clean_domain}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {page_footer(27, "ESTILO VISUAL · APLICACIONES")}
  </section>

  <!-- =========================================================================
       PÁGINA 28 · III. APLICACIONES: PRESENTACIÓN DIGITAL EN 4 LAPTOPS (BENEFIC PÁG. 34)
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad">
      <div style="display:grid; grid-template-columns:0.82fr 1.68fr; gap:12mm; height:100%; align-items:center;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">III</span>
            <h2 class="bb-h1">APLICACIONES</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px; margin-bottom:6mm;">PRESENTACIÓN DIGITAL EJECUTIVA</div>
          <p style="font-size:9pt; color:#334155; line-height:1.6;">
            <strong>Formato:</strong> 1920 × 1080 px (16:9)<br/><br/>
            El sistema de presentaciones de <strong>{b_name}</strong> estructura las diapositivas en 4 plantillas maestras:<br/>
            • <strong>Slide 1:</strong> Portada con foto e insignia.<br/>
            • <strong>Slide 2:</strong> Contenido ejecutivo limpio.<br/>
            • <strong>Slide 3:</strong> Separador de bloque en color.<br/>
            • <strong>Slide 4:</strong> Cierre institucional de marca.
          </p>
        </div>

        <!-- Cuadrícula 2x2 de Laptops con las 4 diapositivas oficiales como BENEFIC Pág. 34 -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <!-- Laptop 1: Portada -->
          <div style="text-align:center;">
            <div style="border:6px solid #1E293B; border-radius:10px 10px 0 0; height:108px; display:grid; grid-template-columns:1fr 1fr; overflow:hidden; background:#FFFFFF;">
              <img src="{img_arch}" alt="Slide 1" style="width:100%; height:100%; object-fit:cover;" />
              <div style="padding:10px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                <svg viewBox="-54 -54 108 108" width="32" height="32">{sym_color_on_white}</svg>
                <div style="font-family:'{pri_font}',sans-serif; font-weight:800; font-size:9pt; color:{dark_canvas_hex}; margin-top:4px;">{b_name}</div>
              </div>
            </div>
            <div style="height:7px; background:#94A3B8; border-radius:0 0 8px 8px; width:108%; margin-left:-4%;"></div>
            <span style="font-size:7.5pt; font-weight:700; color:#475569;">1. Slide de Portada</span>
          </div>

          <!-- Laptop 2: Contenido -->
          <div style="text-align:center;">
            <div style="border:6px solid #1E293B; border-radius:10px 10px 0 0; height:108px; padding:12px; text-align:left; background:#FFFFFF; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="font-family:'{pri_font}',sans-serif; font-weight:800; font-size:8.5pt; color:{accent_hex};">01 · PROPUESTA DE VALOR</div>
              <div style="font-size:7pt; color:#334155; line-height:1.4;">{value_offer[:105]}...</div>
              <div style="font-family:monospace; font-size:6pt; color:#94A3B8; text-align:right;">{b_upper}</div>
            </div>
            <div style="height:7px; background:#94A3B8; border-radius:0 0 8px 8px; width:108%; margin-left:-4%;"></div>
            <span style="font-size:7.5pt; font-weight:700; color:#475569;">2. Slide de Contenido</span>
          </div>

          <!-- Laptop 3: Divisor -->
          <div style="text-align:center;">
            <div style="border:6px solid #1E293B; border-radius:10px 10px 0 0; height:108px; padding:12px; background:{accent_hex}; color:#FFFFFF; display:flex; flex-direction:column; justify-content:center; align-items:center;">
              <div style="font-family:'{pri_font}',sans-serif; font-weight:800; font-size:10pt; letter-spacing:0.08em;">NUESTRO PROCESO</div>
              <div style="font-size:7pt; opacity:0.9; margin-top:4px;">{tagline[:38]}</div>
            </div>
            <div style="height:7px; background:#94A3B8; border-radius:0 0 8px 8px; width:108%; margin-left:-4%;"></div>
            <span style="font-size:7.5pt; font-weight:700; color:#475569;">3. Slide Separador</span>
          </div>

          <!-- Laptop 4: Cierre -->
          <div style="text-align:center;">
            <div style="border:6px solid #1E293B; border-radius:10px 10px 0 0; height:108px; padding:12px; background:{dark_canvas_hex}; color:#FFFFFF; display:flex; flex-direction:column; justify-content:center; align-items:center;">
              <svg viewBox="-54 -54 108 108" width="34" height="34">{sym_white_on_dark}</svg>
              <div style="font-family:'{pri_font}',sans-serif; font-weight:800; font-size:9pt; margin-top:4px;">{b_name}</div>
              <div style="font-family:monospace; font-size:6.5pt; color:{accent_hex};">www.{clean_domain}</div>
            </div>
            <div style="height:7px; background:#94A3B8; border-radius:0 0 8px 8px; width:108%; margin-left:-4%;"></div>
            <span style="font-size:7.5pt; font-weight:700; color:#475569;">4. Slide de Cierre</span>
          </div>
        </div>
      </div>
    </div>
    {page_footer(28, "ESTILO VISUAL · APLICACIONES")}
  </section>

  <!-- =========================================================================
       PÁGINA 29 · III. ARQUITECTURA DETALLADA DE TOUCHPOINTS: ANTES, DURANTE Y DESPUÉS DE LA COMPRA
       ========================================================================= -->
  <section class="bb-spread">
    <div class="bb-pad" style="padding-top:11mm; padding-bottom:13mm;">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:10mm; margin-bottom:3mm;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">III</span>
            <h2 class="bb-h1" style="font-size:18pt;">ARQUITECTURA DETALLADA DE TOUCHPOINTS (PASO 2)</h2>
          </div>
          <div class="bb-subtitle" style="margin-left:34px;">TODOS LOS PUNTOS DE CONTACTO DECLARADOS CON DETALLE: 1. ANTES · 2. DURANTE · 3. DESPUÉS DE LA COMPRA</div>
        </div>
        <!-- Firma Electrónica Compacta Integrada en Cabecera Derecha -->
        <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-left:3.5px solid {accent_hex}; border-radius:9px; padding:6px 11px; display:flex; align-items:center; gap:9px; flex-shrink:0;">
          <svg viewBox="-54 -54 108 108" width="28" height="28">{sym_color_on_white}</svg>
          <div style="font-size:6.8pt; line-height:1.3; color:#334155;">
            <strong style="color:{dark_canvas_hex}; font-size:7.4pt;">{b_name} · Firma Oficial</strong><br/>
            hola@{clean_domain} · www.{clean_domain}
          </div>
        </div>
      </div>

      <!-- 3 Columnas A4 Horizontales diferenciando claramente ANTES, DURANTE y DESPUÉS con todos los Touchpoints detallados -->
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:5.5mm; flex:1; align-items:stretch;">
        <!-- COLUMNA 1: ANTES DE LA COMPRA -->
        <div style="background:#F8FAFC; border:1.5px solid #BAE6FD; border-top:5px solid #0284C7; border-radius:12px; padding:9px 11px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; padding-bottom:5px; border-bottom:1px solid #E0F2FE;">
              <div>
                <span style="font-family:'JetBrains Mono',monospace; font-size:6.5pt; font-weight:800; background:#0284C7; color:#FFFFFF; padding:2px 7px; border-radius:99px; display:inline-block; margin-bottom:2px;">ETAPA 01 · PRE-COMPRA</span>
                <div style="font-family:'{pri_font}',sans-serif; font-size:9pt; font-weight:800; color:#0369A1;">1. ANTES DE LA COMPRA (DESCUBRIMIENTO Y ATRACCIÓN)</div>
              </div>
              <span style="font-family:'JetBrains Mono',monospace; font-size:6.8pt; font-weight:800; color:#0284C7;">{len(tp_antes_detailed)} declarados</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:5px;">
              {"".join([f'''
              <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-left:3px solid #0284C7; border-radius:8px; padding:6px 8px;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; gap:4px; margin-bottom:2px;">
                  <strong style="font-size:7.6pt; color:#0F172A; line-height:1.28;">{i+1}. {d["title"]}</strong>
                  <span style="font-family:'JetBrains Mono',monospace; font-size:5.8pt; color:#0284C7; font-weight:700; flex-shrink:0;">{d["code"]}</span>
                </div>
                <div style="font-size:6.5pt; color:#0369A1; font-weight:700; margin-bottom:2px;">{d["sensory"]}</div>
                <div style="font-size:6.6pt; color:#334155; line-height:1.32;"><strong>Experiencia:</strong> {d["experience"]}</div>
                <div style="font-size:6.3pt; color:#64748B; line-height:1.28; margin-top:1px;"><strong>Soporte:</strong> {d["substrate"]}</div>
              </div>
              ''' for i, d in enumerate(tp_antes_detailed)])}
            </div>
          </div>
          <div style="border-top:1px dashed #BAE6FD; padding-top:5px; margin-top:5px; font-size:6.6pt; color:#0369A1;">
            <strong>Objetivo Estratégico (Paso 1):</strong> Despertar confianza inmediata en nuestro cliente ideal desde el primer contacto.
          </div>
        </div>

        <!-- COLUMNA 2: DURANTE LA COMPRA -->
        <div style="background:#F8FAFC; border:1.5px solid #FDE68A; border-top:5px solid {accent_hex}; border-radius:12px; padding:9px 11px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; padding-bottom:5px; border-bottom:1px solid #FEF3C7;">
              <div>
                <span style="font-family:'JetBrains Mono',monospace; font-size:6.5pt; font-weight:800; background:{accent_hex}; color:#FFFFFF; padding:2px 7px; border-radius:99px; display:inline-block; margin-bottom:2px;">ETAPA 02 · MOMENTO DE VERDAD</span>
                <div style="font-family:'{pri_font}',sans-serif; font-size:9pt; font-weight:800; color:#92400E;">2. DURANTE LA COMPRA (EXPERIENCIA Y CONVERSIÓN)</div>
              </div>
              <span style="font-family:'JetBrains Mono',monospace; font-size:6.8pt; font-weight:800; color:#92400E;">{len(tp_durante_detailed)} declarados</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:5px;">
              {"".join([f'''
              <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-left:3px solid {accent_hex}; border-radius:8px; padding:6px 8px;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; gap:4px; margin-bottom:2px;">
                  <strong style="font-size:7.6pt; color:#0F172A; line-height:1.28;">{i+1}. {d["title"]}</strong>
                  <span style="font-family:'JetBrains Mono',monospace; font-size:5.8pt; color:#92400E; font-weight:700; flex-shrink:0;">{d["code"]}</span>
                </div>
                <div style="font-size:6.5pt; color:#92400E; font-weight:700; margin-bottom:2px;">{d["sensory"]}</div>
                <div style="font-size:6.6pt; color:#334155; line-height:1.32;"><strong>Experiencia:</strong> {d["experience"]}</div>
                <div style="font-size:6.3pt; color:#64748B; line-height:1.28; margin-top:1px;"><strong>Soporte:</strong> {d["substrate"]}</div>
              </div>
              ''' for i, d in enumerate(tp_durante_detailed)])}
            </div>
          </div>
          <div style="border-top:1px dashed #FDE68A; padding-top:5px; margin-top:5px; font-size:6.6pt; color:#92400E;">
            <strong>Objetivo Estratégico (Paso 1):</strong> Cumplir la promesa “{core_message}” con cero fricción.
          </div>
        </div>

        <!-- COLUMNA 3: DESPUÉS DE LA COMPRA -->
        <div style="background:#F8FAFC; border:1.5px solid #A7F3D0; border-top:5px solid #059669; border-radius:12px; padding:9px 11px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; padding-bottom:5px; border-bottom:1px solid #D1FAE5;">
              <div>
                <span style="font-family:'JetBrains Mono',monospace; font-size:6.5pt; font-weight:800; background:#059669; color:#FFFFFF; padding:2px 7px; border-radius:99px; display:inline-block; margin-bottom:2px;">ETAPA 03 · POST-COMPRA</span>
                <div style="font-family:'{pri_font}',sans-serif; font-size:9pt; font-weight:800; color:#065F46;">3. DESPUÉS DE LA COMPRA (ENTREGA Y LEALTAD)</div>
              </div>
              <span style="font-family:'JetBrains Mono',monospace; font-size:6.8pt; font-weight:800; color:#059669;">{len(tp_despues_detailed)} declarados</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:5px;">
              {"".join([f'''
              <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-left:3px solid #059669; border-radius:8px; padding:6px 8px;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; gap:4px; margin-bottom:2px;">
                  <strong style="font-size:7.6pt; color:#0F172A; line-height:1.28;">{i+1}. {d["title"]}</strong>
                  <span style="font-family:'JetBrains Mono',monospace; font-size:5.8pt; color:#059669; font-weight:700; flex-shrink:0;">{d["code"]}</span>
                </div>
                <div style="font-size:6.5pt; color:#059669; font-weight:700; margin-bottom:2px;">{d["sensory"]}</div>
                <div style="font-size:6.6pt; color:#334155; line-height:1.32;"><strong>Experiencia:</strong> {d["experience"]}</div>
                <div style="font-size:6.3pt; color:#64748B; line-height:1.28; margin-top:1px;"><strong>Soporte:</strong> {d["substrate"]}</div>
              </div>
              ''' for i, d in enumerate(tp_despues_detailed)])}
            </div>
          </div>
          <div style="border-top:1px dashed #A7F3D0; padding-top:5px; margin-top:5px; font-size:6.6pt; color:#065F46;">
            <strong>Objetivo Estratégico (Paso 1):</strong> Consolidar el rol social, la recompra y la recomendación activa.
          </div>
        </div>
      </div>
    </div>
    {page_footer(29, "ESTILO VISUAL · APLICACIONES")}
  </section>

  <!-- =========================================================================
       PÁGINA 30 · IV. VALIDACIÓN Y CONTRAPORTADA EDITORIAL (BENEFIC PÁGS. 39-40)
       ========================================================================= -->
  <section class="bb-spread">
    <div style="display:grid; grid-template-columns:1.25fr 0.75fr; width:100%; height:100%;">
      <div style="padding:18mm 18mm 18mm 20mm; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <div class="bb-num-title">
            <span class="bb-big-index">IV</span>
            <h2 class="bb-h1">VALIDACIÓN</h2>
          </div>
          <p style="font-size:9.5pt; color:#475569; margin:4px 0 10mm 0;">
            Antes de hacer pública cualquier pieza o aplicación de <strong>{b_name}</strong>, debe aprobar las siguientes 4 preguntas de validación:
          </p>

          <div style="border-top:1.5px solid {accent_hex}; padding:12px 0; font-size:10.5pt; color:#1E293B;">
            <strong>1.</strong> ¿Expresa con claridad el propósito y la esencia de <strong>{b_name}</strong>?
          </div>
          <div style="border-top:1.5px solid {accent_hex}; padding:12px 0; font-size:10.5pt; color:#1E293B;">
            <strong>2.</strong> ¿Respeta el logotipo, el área de seguridad <strong>1X</strong>, la paleta oficial y la tipografía <strong>{pri_font}</strong>?
          </div>
          <div style="border-top:1.5px solid {accent_hex}; padding:12px 0; font-size:10.5pt; color:#1E293B;">
            <strong>3.</strong> ¿Es libre de ruido visual y se entiende su mensaje en menos de <strong>3 segundos</strong>?
          </div>
          <div style="border-top:1.5px solid {accent_hex}; border-bottom:1.5px solid {accent_hex}; padding:12px 0; font-size:10.5pt; color:#1E293B;">
            <strong>4.</strong> ¿Transmite profesionalismo, cercanía y valor real para nuestro cliente ideal?
          </div>
        </div>

        <div style="font-family:'{pri_font}',sans-serif; font-size:13pt; font-weight:700; color:{accent_hex};">
          El objetivo es informar e inspirar confianza inmediata.
        </div>
      </div>

      <!-- Contraportada derecha estilo BENEFIC Pág. 40 -->
      <div style="background:{dark_canvas_hex}; color:#FFFFFF; padding:20mm; display:flex; flex-direction:column; justify-content:space-between; align-items:center; text-align:center; position:relative;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:7.5pt; color:{accent_hex}; letter-spacing:0.2em;">
          IDENTIDAD OFICIAL CERTIFICADA
        </div>
        <div>
          <svg viewBox="-56 -56 112 112" width="125" height="125">{sym_white_on_dark}</svg>
          <div style="font-family:'{pri_font}',sans-serif; font-size:18pt; font-weight:800; color:#FFFFFF; margin-top:12px; letter-spacing:0.06em;">{b_name}</div>
          <div style="font-size:8.5pt; color:#CBD5E1; margin-top:4px;">{tagline}</div>
        </div>
        <div style="font-family:'{pri_font}',sans-serif; font-size:11pt; font-weight:700; letter-spacing:0.24em; color:{accent_hex};">
          BRAND BOOK <span style="font-weight:300; color:#94A3B8;">2026</span>
        </div>
      </div>
    </div>
  </section>

</body>
</html>"""
