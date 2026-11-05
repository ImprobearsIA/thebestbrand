# -*- coding: utf-8 -*-
"""
Motor Oficial TheBestBrand — Manual de Marca y Arquitectura Maestra IMPROBEARS (Parte 2: Láminas 16 a 30 + Compilador HTML/PDF/SVG)
Arquitectura Fluida en Curvas Vectoriales Tipo Illustrator (Edición Luz y Claridad con Elena Vance):
- Fondo Claro (#FFFFFF) en las 30 láminas con acentos en Naranja (#FF7A00) y Azules (#0D2540, #426EAE, #4C9DE6).
- Logotipo en Positivo sobre Fondo Claro por defecto en TODO el documento, EXCEPTO en la Lámina 21 (donde se explica la Aplicación en Negativo) y el ejemplo prohibido 02 de la Lámina 22.
- Secuencia Oficial TheBestBrand:
  - Láminas 01–02: Portada e Índice Metodológico
  - Lámina 03: Paso 0 (Giro y Problema que Resolvemos)
  - Láminas 04–08: Paso 1 (ADN: Círculo Dorado, Misión/Visión/Filosofía, Principios, y La Empresa como Persona = Jorge Benítez)
  - Láminas 09–12: Paso 2 (Ingeniería de Touchpoints: Antes, Durante, Después — ANTES de hablar del Nombre)
  - Lámina 13: Paso 3 (El Nombre Oficial: IMPROBEARS, Semiótica y Clases de Niza)
  - Láminas 14–22: Paso 4 (Arquitectura Maestra, Logotipos en Positivo, 4 Submarcas, Retícula, Aislamiento y Negativo, Usos Incorrectos)
  - Láminas 23–26: Paso 5 (Paleta Cromática, Regla 70/20/10, 6 Recursos en Curvas, Tipografía y 6 Sellos Metodológicos)
  - Láminas 27–30: Paso 6 (Gobernanza C-00, Papelería/Tarjetas/Firma, Ecosistema Digital/Checklist y Colofón en Lienzo Claro)
"""

import os
import json
from improbears_brandbook_plates_1_to_15 import (
    get_improbears_assets,
    header_html,
    footer_html,
    top_curves_svg,
    build_plates_01_to_15,
)


def build_plates_16_to_30(assets: dict) -> list:
    m_logo = assets["master"]
    c_logo = assets["consulting"]
    i_logo = assets["ingredients"]
    s_logo = assets["studio"]
    a_logo = assets["ai"]
    m_neg = assets["master_neg"]
    c_neg = assets["consulting_neg"]
    i_neg = assets["ingredients_neg"]
    s_neg = assets["studio_neg"]
    a_neg = assets["ai_neg"]
    mono_white = assets["mono_white"]
    t_pos = assets["thumb"]
    banner = assets["banner"]
    photo_board = assets["photo_boardroom"]
    photo_lab = assets["photo_hopzoil"]
    photo_desk = assets["photo_desk"]
    photo_studio_rotulo = assets["photo_studio_rotulo"]

    plates = []

    # =========================================================================
    # LAMINA 16: SUBMARCA 01 — IMPROBEARS CONSULTING (FLUJO ABIERTO CON CAPSULA HUMANA)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-16">
      {top_curves_svg(1)}
      {header_html("05", "SUBMARCA OFICIAL 01: IMPROBEARS CONSULTING (PASO 4.2)", 16)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.82fr 1.18fr;gap:34px;align-items:center;">
        <!-- Izquierda: Sello Oficial Positivo sobre Blanco + Fotografía Editorial sin Recorte de Cabezas -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding-right:18px;border-right:1px solid #E6E6E6;">
          <img src="{c_logo}" alt="ImproBears Consulting Oficial" style="width:162px;height:162px;object-fit:contain;display:block;filter:drop-shadow(0 12px 24px rgba(13,37,64,0.08));" />
          <div style="text-align:center;">
            <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:16.5px;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">CONSULTING</span></div>
            <div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:8.8px;color:#426EAE;letter-spacing:0.15em;margin-top:2px;">ARQUITECTURA OPERACIONAL &amp; PRODUCTIVIDAD</div>
          </div>
          <img src="{photo_board}" alt="Sesión Ejecutiva ImproBears Consulting" style="width:100%;height:185px;object-fit:cover;object-position:center 10%;border-radius:18px 38px 18px 18px;border-bottom:3.5px solid #FF7A00;display:block;" />
        </div>

        <!-- Derecha: Especificación en flujo abierto sin cajas -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">PROMESA DE LA SUBMARCA</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:19px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              “Construimos el sistema operativo que permite a tu empresa crecer con orden, claridad y rentabilidad.”
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.48;margin:0;">
              Acompañamos a fundadores y equipos directivos B2B a eliminar cuellos de botella mediante diagnóstico de causa raíz, gobernanza PMI/RACI y automatización comercial sobre Zoho One.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;padding-top:8px;border-top:1px solid #E6E6E6;">
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-blue"></span>SIMBOLO DIFERENCIADOR</div>
              <div class="ib-flow-title" style="font-size:13.5px;">4 Barras de Crecimiento (#0D2540)</div>
              <div class="ib-flow-txt">Debajo de la flecha naranja emergen 4 barras ascendentes en Azul Oscuro (#0D2540) que representan KPIs, madurez de procesos, escalabilidad y retorno financiero medible.</div>
            </div>
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-orange"></span>PORTAFOLIO &amp; ENTREGABLES</div>
              <div class="ib-flow-title" style="font-size:13.5px;">Claridad en 30 Días + Zoho One</div>
              <div class="ib-flow-txt">• Diagnóstico de Productividad (5 Por Qués)<br/>• Sistema Operativo de Claridad en 30 Días<br/>• Arquitectura Zoho CRM / Books / Projects / Analytics<br/>• Gobernanza RACI y Ritmo Diario de 15 Minutos</div>
            </div>
          </div>

          <div style="padding-top:10px;border-top:1px solid #E6E6E6;display:flex;justify-content:space-between;align-items:center;font-family:'Avenir Next',sans-serif;font-size:11px;color:#0D2540;">
            <span><strong style="color:#FF7A00;">Audiencia:</strong> CEOs, Dueños de Negocio y Directores de Operaciones (20 a 250 colaboradores).</span>
            <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:10px;color:#426EAE;">consulting.improbears.com</span>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 16)}
    </section>
    """)

    # =========================================================================
    # LAMINA 17: SUBMARCA 02 — IMPROBEARS INGREDIENTS (FLUJO ABIERTO CON CAPSULA LAB)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-17">
      {top_curves_svg(0)}
      {header_html("05", "SUBMARCA OFICIAL 02: IMPROBEARS INGREDIENTS (PASO 4.3)", 17)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.82fr 1.18fr;gap:34px;align-items:center;">
        <!-- Izquierda -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding-right:18px;border-right:1px solid #E6E6E6;">
          <img src="{i_logo}" alt="ImproBears Ingredients Oficial" style="width:162px;height:162px;object-fit:contain;display:block;filter:drop-shadow(0 12px 24px rgba(13,37,64,0.08));" />
          <div style="text-align:center;">
            <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:16.5px;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">INGREDIENTS</span></div>
            <div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:8.8px;color:#426EAE;letter-spacing:0.15em;margin-top:2px;">BIOTECNOLOGIA &amp; INGREDIENTES FUNCIONALES B2B</div>
          </div>
          <img src="{photo_lab}" alt="Laboratorio ImproBears Ingredients" style="width:100%;height:185px;object-fit:cover;object-position:center center;border-radius:18px 38px 18px 18px;border-bottom:3.5px solid #426EAE;display:block;" />
        </div>

        <!-- Derecha -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="border-left:3.5px solid #426EAE;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#426EAE;letter-spacing:0.15em;">PROMESA DE LA SUBMARCA</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:19px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              “Ciencia biotecnológica y pureza sensorial para escalar la industria de alimentos y bebidas.”
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.48;margin:0;">
              Conectamos los desarrollos biotecnológicos más avanzados del mundo con cervecerías, plantas de bebidas e industria alimentaria en México y Latinoamérica, con trazabilidad FEFO y soporte de I+D.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;padding-top:8px;border-top:1px solid #E6E6E6;">
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-orange"></span>SIMBOLO DIFERENCIADOR</div>
              <div class="ib-flow-title" style="font-size:13.5px;">Red Molecular Bicolor</div>
              <div class="ib-flow-txt">Nodos moleculares interconectados en Azul Oscuro (#0D2540) y Naranja (#FF7A00) bajo la flecha de crecimiento, simbolizando formulación química, extractos puros y precisión científica.</div>
            </div>
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-blue"></span>PORTAFOLIO INSIGNIA</div>
              <div class="ib-flow-title" style="font-size:13.5px;">Hopzoil®, Verifolia™ &amp; GranoBrew</div>
              <div class="ib-flow-txt">• <strong>Hopzoil®:</strong> Aceites esenciales hidrodestilados de lúpulo fresco.<br/>• <strong>Verifolia™:</strong> Modulación dulce natural de alta pureza.<br/>• <strong>GranoBrew:</strong> Soluciones funcionales y rendimiento cervecero.</div>
            </div>
          </div>

          <div style="padding-top:10px;border-top:1px solid #E6E6E6;display:flex;justify-content:space-between;align-items:center;font-family:'Avenir Next',sans-serif;font-size:11px;color:#0D2540;">
            <span><strong style="color:#FF7A00;">Gobernanza:</strong> Flujo NDA Zoho Sign → Dossier Técnico NIH → Muestra 2.5mL/20mL/50mL → Lote FEFO.</span>
            <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:10px;color:#426EAE;">ingredients.improbears.com</span>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 17)}
    </section>
    """)

    # =========================================================================
    # LAMINA 18: SUBMARCA 03 — IMPROBEARS STUDIO (FLUJO ABIERTO CON DIAGRAMA CINE)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-18">
      {top_curves_svg(1)}
      {header_html("05", "SUBMARCA OFICIAL 03: IMPROBEARS STUDIO (PASO 4.4)", 18)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.82fr 1.18fr;gap:34px;align-items:center;">
        <!-- Izquierda -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding-right:18px;border-right:1px solid #E6E6E6;">
          <img src="{s_logo}" alt="ImproBears Studio Oficial" style="width:162px;height:162px;object-fit:contain;display:block;filter:drop-shadow(0 12px 24px rgba(13,37,64,0.08));" />
          <div style="text-align:center;">
            <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:16.5px;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">STUDIO</span></div>
            <div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:8.8px;color:#426EAE;letter-spacing:0.15em;margin-top:2px;">STORYTELLING VISUAL &amp; PRODUCCION B2B</div>
          </div>
          <img src="{photo_studio_rotulo}" alt="Fotograma Real de Producción ImproBears Studio con Rótulo" style="width:100%;height:185px;object-fit:cover;object-position:center center;border-radius:8px 34px 18px 18px;border-bottom:3.5px solid #FF7A00;display:block;" />
        </div>

        <!-- Derecha -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">PROMESA DE LA SUBMARCA</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:19px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              “Traducimos la propuesta de valor de tu empresa en activos audiovisuales que inspiran autoridad y cierran ventas.”
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.48;margin:0;">
              No hacemos videos decorativos: diseñamos herramientas comerciales en video con dirección estratégica de negocio, estética cinematográfica y estructura persuasiva para decisores B2B.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;padding-top:8px;border-top:1px solid #E6E6E6;">
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-blue"></span>SIMBOLO DIFERENCIADOR</div>
              <div class="ib-flow-title" style="font-size:13.5px;">Cámara de Cine con Lente Naranja</div>
              <div class="ib-flow-txt">Cuerpo de cámara cinematográfica en Azul Oscuro (#0D2540) con obturador central en Naranja (#FF7A00), representando enfoque estratégico, encuadre ejecutivo y proyección de marca.</div>
            </div>
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-orange"></span>PORTAFOLIO AUDIOVISUAL</div>
              <div class="ib-flow-title" style="font-size:13.5px;">Videos Hero, Casos de Éxito &amp; Reels</div>
              <div class="ib-flow-txt">• Videos Hero Corporativos e Industriales 4K<br/>• Mini-Documentales de Casos de Éxito B2B<br/>• Cápsulas Ejecutivas para LinkedIn y Ventas<br/>• Motor Audiovisual Chorch7 y Dirección de Arte</div>
            </div>
          </div>

          <div style="padding-top:10px;border-top:1px solid #E6E6E6;display:flex;justify-content:space-between;align-items:center;font-family:'Avenir Next',sans-serif;font-size:11px;color:#0D2540;">
            <span><strong style="color:#FF7A00;">Principio Rector:</strong> Resolver antes que producir • La historia sirve a la estrategia comercial.</span>
            <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:10px;color:#426EAE;">studio.improbears.com</span>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 18)}
    </section>
    """)

    # =========================================================================
    # LAMINA 19: SUBMARCA 04 — IMPROBEARS AI (HOMOLOGADA POR ELENA VANCE)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-19">
      {top_curves_svg(0)}
      {header_html("05", "SUBMARCA OFICIAL 04: IMPROBEARS AI • ESQUEMA HOMOLOGADO (PASO 4.5)", 19)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.82fr 1.18fr;gap:34px;align-items:center;">
        <!-- Izquierda: Sello Oficial Homologado sobre Fondo Claro -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding-right:18px;border-right:1px solid #E6E6E6;">
          <img src="{a_logo}" alt="ImproBears AI Oficial Homologado" style="width:195px;height:195px;object-fit:contain;display:block;filter:drop-shadow(0 12px 24px rgba(13,37,64,0.08));" />
          <div style="text-align:center;">
            <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:17px;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">AI</span></div>
            <div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:9px;color:#426EAE;letter-spacing:0.15em;margin-top:2px;">SISTEMAS MULTI-AGENTE &amp; SAAS PROPIETARIO</div>
          </div>
          <!-- Comparativa de Homologación en Flujo Abierto -->
          <div style="display:flex;align-items:center;gap:14px;padding-top:6px;border-top:1px solid #E6E6E6;">
            <img src="{c_logo}" alt="Consulting" style="height:44px;object-fit:contain;" />
            <img src="{i_logo}" alt="Ingredients" style="height:44px;object-fit:contain;" />
            <img src="{s_logo}" alt="Studio" style="height:44px;object-fit:contain;" />
            <img src="{a_logo}" alt="AI" style="height:44px;object-fit:contain;" />
          </div>
        </div>

        <!-- Derecha: Solución de Homologación Visual + Portafolio -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">HOMOLOGACION VISUAL DEL SISTEMA DE SUBMARCAS (ELENA VANCE)</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:18.5px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              Alineación 1:1 con Consulting, Ingredients y Studio sobre lienzo claro.
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.5px;color:#333333;line-height:1.46;margin:0;">
              Se corrigió el logotipo de <strong>ImproBears AI</strong> para respetar exactamente la matriz constructiva de las otras 3 submarcas: mismo Oso Azul (#426EAE), silueta humana intacta, arco exterior abierto con gap a la altura de la punta de la flecha, grafo neuronal nítido bajo la curva ascendente y el descriptor <strong>“AI” en Naranja (#FF7A00)</strong> con proporción óptica equilibrada.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;padding-top:8px;border-top:1px solid #E6E6E6;">
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-blue"></span>SIMBOLO DIFERENCIADOR</div>
              <div class="ib-flow-title" style="font-size:13.5px;">Grafo Neuronal de 7 Nodos</div>
              <div class="ib-flow-txt">Núcleo de inteligencia en Naranja (#FF7A00) conectado a 6 nodos perimetrales en Azul Oscuro (#0D2540) mediante enlaces en Azul Claro (#4C9DE6), representando la orquestación multi-agente.</div>
            </div>
            <div>
              <div class="ib-node-hdr"><span class="ib-dot-orange"></span>ECOSISTEMA TECNOLOGICO</div>
              <div class="ib-flow-title" style="font-size:13.5px;">La Socia + OpenClaw + Suite TheBest</div>
              <div class="ib-flow-txt">• <strong>Gina (“La Socia”):</strong> Motor ejecutivo conectado a Zoho One.<br/>• <strong>Célula OpenClaw:</strong> 7 agentes autónomos especializados.<br/>• <strong>Suite SaaS:</strong> TheBestBrand, TheBestLeague y TheBestScoreboard.</div>
            </div>
          </div>

          <div style="padding-top:10px;border-top:1px solid #E6E6E6;display:flex;justify-content:space-between;align-items:center;font-family:'Avenir Next',sans-serif;font-size:11px;color:#0D2540;">
            <span><strong style="color:#FF7A00;">Regla de Familia:</strong> Las 4 submarcas llevan su descriptor en #FF7A00 bajo IMPROBEARS en #0D2540.</span>
            <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:10px;color:#426EAE;">ai.improbears.com</span>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 19)}
    </section>
    """)

    # =========================================================================
    # LAMINA 20: RETICULA CONSTRUCTIVA, PROPORCIONES (X) Y CURVAS DEL BANNER
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-20">
      {top_curves_svg(1)}
      {header_html("05", "RETICULA CONSTRUCTIVA, PROPORCIONES (X) Y SISTEMA DE CURVAS DEL BANNER (PASO 4.6)", 20)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.88fr 1.12fr;gap:34px;align-items:center;">
        <!-- Izquierda: Retícula 8X x 8X sobre Fondo Claro -->
        <div style="display:flex;flex-direction:column;align-items:center;padding-right:18px;border-right:1px solid #E6E6E6;">
          <div style="position:relative;width:236px;height:236px;display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 240 240" width="236" height="236" style="position:absolute;inset:0;pointer-events:none;">
              <g stroke="#CBD5E1" stroke-width="0.8" stroke-dasharray="3,3">
                <line x1="30" y1="0" x2="30" y2="240"/><line x1="60" y1="0" x2="60" y2="240"/><line x1="90" y1="0" x2="90" y2="240"/>
                <line x1="120" y1="0" x2="120" y2="240"/><line x1="150" y1="0" x2="150" y2="240"/><line x1="180" y1="0" x2="180" y2="240"/><line x1="210" y1="0" x2="210" y2="240"/>
                <line x1="0" y1="30" x2="240" y2="30"/><line x1="0" y1="60" x2="240" y2="60"/><line x1="0" y1="90" x2="240" y2="90"/>
                <line x1="0" y1="120" x2="240" y2="120"/><line x1="0" y1="150" x2="240" y2="150"/><line x1="0" y1="180" x2="240" y2="180"/><line x1="0" y1="210" x2="240" y2="210"/>
              </g>
              <circle cx="120" cy="120" r="106" fill="none" stroke="#FF7A00" stroke-width="1.3" stroke-dasharray="5,4"/>
              <line x1="14" y1="232" x2="226" y2="232" stroke="#0D2540" stroke-width="1.5"/>
              <text x="120" y="227" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-size="9" font-weight="800">DIAMETRO MAESTRO = 8X</text>
            </svg>
            <img src="{m_logo}" alt="Retícula Master" style="width:206px;height:206px;object-fit:contain;position:relative;z-index:2;display:block;" />
          </div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;text-align:center;margin-top:8px;line-height:1.4;">
            <strong>Unidad Base (X):</strong> Igual a la altura del carácter <strong>“I”</strong> del wordmark <strong>IMPROBEARS</strong>. Proporción maestra del sello: <strong>8X × 8X (1:1)</strong>.
          </div>
        </div>

        <!-- Derecha: Banner Institucional en Curvas + Parámetros Geométricos Abiertos -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;margin-bottom:6px;">
              SISTEMA DE ONDAS VECTORIALES TIPO ILLUSTRATOR (BANNER OFICIAL)
            </div>
            <img src="{banner}" alt="Banner Oficial ImproBears" style="width:100%;height:118px;object-fit:cover;border-radius:16px;display:block;filter:drop-shadow(0 8px 20px rgba(13,37,64,0.08));" />
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding-top:8px;border-top:1px solid #E6E6E6;">
            <div style="border-left:3px solid #0D2540;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;">GROSOR DE ARO</div>
              <div style="font-family:'Montserrat',sans-serif;font-size:16px;font-weight:800;color:#0D2540;margin:2px 0;">0.14X</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10.8px;color:#333333;">Trazo constante del anillo estructural en #0D2540.</div>
            </div>
            <div style="border-left:3px solid #FF7A00;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;">ANGULO VECTORIAL</div>
              <div style="font-family:'Montserrat',sans-serif;font-size:16px;font-weight:800;color:#0D2540;margin:2px 0;">42° ASC</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10.8px;color:#333333;">Tangente de salida de la flecha naranja de mejora continua.</div>
            </div>
            <div style="border-left:3px solid #4C9DE6;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;">APERTURA SUBMARCA</div>
              <div style="font-family:'Montserrat',sans-serif;font-size:16px;font-weight:800;color:#0D2540;margin:2px 0;">18° — 48°</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10.8px;color:#333333;">Corte derecho del anillo en Consulting, Ingredients, Studio y AI.</div>
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 20)}
    </section>
    """)

    # =========================================================================
    # LAMINA 21: SECCION EXCLUSIVA DE APLICACION EN NEGATIVO Y AISLAMIENTO (1.5X)
    # (Unico lugar del documento donde se muestran las aplicaciones sobre fondo oscuro)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-21">
      {top_curves_svg(0)}
      {header_html("05", "AREA DE AISLAMIENTO (1.5X) Y SECCION DE APLICACION EN NEGATIVO (PASO 4.7)", 21)}
      <div class="plate-body" style="display:grid;grid-template-columns:0.84fr 1.16fr;gap:30px;align-items:center;">
        <!-- Izquierda: Regla de Aislamiento 1.5X en Positivo + Especificación Técnica del Negativo -->
        <div style="display:flex;flex-direction:column;gap:14px;padding-right:18px;border-right:1px solid #E6E6E6;">
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">
            ZONA DE PROTECCION (1.5X) Y LEY DE INVERSION NEGATIVA
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:center;text-align:center;">
            <!-- Diagrama de aislamiento positivo sobre blanco -->
            <div style="padding:12px;display:flex;flex-direction:column;align-items:center;">
              <div style="position:relative;width:128px;height:128px;display:flex;align-items:center;justify-content:center;">
                <svg viewBox="0 0 128 128" width="128" height="128" style="position:absolute;inset:0;pointer-events:none;">
                  <rect x="4" y="4" width="120" height="120" rx="16" fill="none" stroke="#FF7A00" stroke-width="1.5" stroke-dasharray="5,4"/>
                </svg>
                <img src="{m_logo}" alt="Logo Protección Positivo" style="width:104px;height:104px;object-fit:contain;display:block;" />
              </div>
              <div style="font-family:'Montserrat',sans-serif;font-size:8px;font-weight:800;color:#0D2540;margin-top:8px;">DEFAULT: POSITIVO (1.5X)</div>
            </div>

            <!-- Muestra de calado monocromo blanco -->
            <div style="background:#0D2540;border-radius:18px;padding:12px;display:flex;flex-direction:column;align-items:center;">
              <div style="width:128px;height:128px;display:flex;align-items:center;justify-content:center;">
                <img src="{mono_white}" alt="Logo Monocromo Blanco" style="width:108px;height:108px;object-fit:contain;display:block;" />
              </div>
              <div style="font-family:'Montserrat',sans-serif;font-size:8px;font-weight:800;color:#4C9DE6;margin-top:8px;">MONOCROMO CALADO</div>
            </div>
          </div>

          <div style="border-left:3.5px solid #FF7A00;padding-left:14px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;margin-bottom:4px;">
              REGLA TECNICA DE APLICACION EN NEGATIVO (SIN CIRCULOS BLANCOS)
            </div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.46;">
              • <strong>Default del Sistema:</strong> El logotipo se aplica siempre en positivo sobre fondo claro (#FFFFFF).<br/>
              • <strong>Excepción en Fondos Oscuros:</strong> Cuando una pieza audiovisual o soporte oscuro lo exija, se prohíbe poner un círculo blanco de parche; se usa el archivo <strong>-negativo.png</strong> donde la silueta humana es transparente y los trazos #0D2540 invierten a <strong>#FFFFFF</strong>.
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;padding-top:8px;border-top:1px solid #E6E6E6;font-family:'Avenir Next',sans-serif;font-size:10.8px;color:#0D2540;">
            <span><strong>Mínimo Digital:</strong> 36 px (Sello) · 16 px (Favicon)</span>
            <span><strong>Mínimo Impreso:</strong> 15 mm (Offset)</span>
          </div>
        </div>

        <!-- Derecha: Comparativa de Aplicación Positiva Default vs. Aplicación en Negativo Oficial -->
        <div style="display:flex;flex-direction:column;gap:14px;">
          <!-- Fila Superior: Uso Positivo Default sobre Fondos Claros -->
          <div style="padding-bottom:12px;border-bottom:1px solid #E6E6E6;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#426EAE;letter-spacing:0.14em;margin-bottom:8px;">
              A. CONFIGURACION PRINCIPAL POR DEFECTO (SOBRE FONDOS CLAROS #FFFFFF / #F8FAFC)
            </div>
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;align-items:center;text-align:center;">
              <div><img src="{m_logo}" alt="Master Positivo" style="height:82px;object-fit:contain;" /><div style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:800;color:#0D2540;margin-top:3px;">MASTER</div></div>
              <div><img src="{c_logo}" alt="Consulting Positivo" style="height:82px;object-fit:contain;" /><div style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:800;color:#0D2540;margin-top:3px;">CONSULTING</div></div>
              <div><img src="{i_logo}" alt="Ingredients Positivo" style="height:82px;object-fit:contain;" /><div style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:800;color:#0D2540;margin-top:3px;">INGREDIENTS</div></div>
              <div><img src="{s_logo}" alt="Studio Positivo" style="height:82px;object-fit:contain;" /><div style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:800;color:#0D2540;margin-top:3px;">STUDIO</div></div>
              <div><img src="{a_logo}" alt="AI Positivo" style="height:82px;object-fit:contain;" /><div style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:800;color:#FF7A00;margin-top:3px;">AI</div></div>
            </div>
          </div>

          <!-- Fila Inferior: Demostración Exclusiva de Aplicación en Negativo sobre #0D2540 y #090D16 -->
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;margin-bottom:8px;">
              B. DEMOSTRACION EXCLUSIVA DE APLICACION EN NEGATIVO REAL (CALADO TRANSPARENTE)
            </div>
            <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:14px;">
              <!-- Muestra sobre Azul Oscuro #0D2540 -->
              <div style="background:#0D2540;border-radius:18px;padding:14px;text-align:center;color:#FFFFFF;">
                <div style="display:flex;justify-content:space-around;align-items:center;height:96px;">
                  <img src="{m_neg}" alt="Master Negativo" style="height:88px;object-fit:contain;" />
                  <img src="{c_neg}" alt="Consulting Negativo" style="height:88px;object-fit:contain;" />
                  <img src="{i_neg}" alt="Ingredients Negativo" style="height:88px;object-fit:contain;" />
                </div>
                <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#4C9DE6;margin-top:6px;letter-spacing:0.08em;">
                  NEGATIVO REAL SOBRE AZUL OSCURO (#0D2540)
                </div>
              </div>
              <!-- Muestra sobre Negro Cine #090D16 -->
              <div style="background:#090D16;border-radius:18px;padding:14px;text-align:center;color:#FFFFFF;">
                <div style="display:flex;justify-content:space-around;align-items:center;height:96px;">
                  <img src="{s_neg}" alt="Studio Negativo" style="height:88px;object-fit:contain;" />
                  <img src="{a_neg}" alt="AI Negativo" style="height:88px;object-fit:contain;" />
                </div>
                <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#FF7A00;margin-top:6px;letter-spacing:0.08em;">
                  NEGATIVO CINE 4K (#090D16)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 21)}
    </section>
    """)

    # =========================================================================
    # LAMINA 22: USOS INCORRECTOS SOBRE LIENZO CLARO (CERO CAJAS)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-22">
      {top_curves_svg(1)}
      {header_html("05", "USOS INCORRECTOS Y RESTRICCIONES DE INTEGRIDAD VISUAL (PASO 4.8)", 22)}
      <div class="plate-body" style="display:grid;grid-template-columns:repeat(3,1fr);column-gap:28px;row-gap:22px;align-items:start;">
        <!-- 01 -->
        <div style="text-align:center;padding-bottom:10px;border-bottom:1px solid #E6E6E6;">
          <div style="height:92px;display:flex;align-items:center;justify-content:center;">
            <img src="{m_logo}" alt="Deformado" style="width:132px;height:64px;object-fit:fill;" />
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;margin-top:4px;">× 01. PROHIBIDO DEFORMAR O ESTIRAR</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">Jamás alterar la proporción 1:1 del escudo maestro ni achatar horizontal o verticalmente el símbolo.</div>
        </div>

        <!-- 02 -->
        <div style="text-align:center;padding-bottom:10px;border-bottom:1px solid #E6E6E6;">
          <div style="height:92px;display:flex;align-items:center;justify-content:center;">
            <div style="background:#0D2540;padding:8px 22px;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;">
              <div style="width:68px;height:68px;border-radius:50%;background:#FFFFFF;padding:4px;border:2px solid #FF7A00;">
                <img src="{m_logo}" alt="Parche Circulo Blanco Prohibido" style="width:100%;height:100%;object-fit:contain;" />
              </div>
            </div>
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;margin-top:4px;">× 02. PROHIBIDO EL PARCHE DE CIRCULO BLANCO</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">Cuando se requiera fondo oscuro, jamás encerrar el logo positivo en un círculo blanco; usar la versión <strong>-negativo.png</strong>.</div>
        </div>

        <!-- 03 -->
        <div style="text-align:center;padding-bottom:10px;border-bottom:1px solid #E6E6E6;">
          <div style="height:92px;display:flex;align-items:center;justify-content:center;">
            <img src="{m_logo}" alt="Color alterado" style="width:82px;height:82px;object-fit:contain;filter:hue-rotate(135deg) saturate(2);" />
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;margin-top:4px;">× 03. PROHIBIDO ALTERAR COLORES</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">Prohibido aplicar colores ajenos a la paleta o cambiar el descriptor de submarca a un color distinto de <strong>#FF7A00</strong>.</div>
        </div>

        <!-- 04 -->
        <div style="text-align:center;">
          <div style="height:92px;display:flex;align-items:center;justify-content:center;">
            <div style="padding:6px 18px;border-radius:14px;background:repeating-linear-gradient(45deg,#426EAE,#426EAE 6px,#FF7A00 6px,#FF7A00 12px);">
              <img src="{c_logo}" alt="Fondo saturado" style="width:74px;height:74px;object-fit:contain;opacity:0.8;" />
            </div>
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;margin-top:4px;">× 04. PROHIBIDO FONDOS SATURADOS</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">No colocar los logotipos sobre tramas o fotografías ruidosas que impidan distinguir la figura humana central.</div>
        </div>

        <!-- 05 -->
        <div style="text-align:center;">
          <div style="height:92px;display:flex;align-items:center;justify-content:center;">
            <span style="font-family:Georgia,serif;font-size:20px;font-style:italic;color:#0D2540;">ImproBears Consulting</span>
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;margin-top:4px;">× 05. PROHIBIDO CAMBIAR TIPOGRAFIA</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">Nunca sustituir Montserrat y Avenir Next por fuentes serif clásicas, manuscritas u ornamentales.</div>
        </div>

        <!-- 06 -->
        <div style="text-align:center;">
          <div style="height:92px;display:flex;align-items:center;justify-content:center;">
            <span style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:800;color:#0D2540;border-bottom:3px solid #FF7A00;padding-bottom:4px;">ENCERRAR EN CAJAS PESADAS</span>
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#FF7A00;margin-top:4px;">× 06. PROHIBIDO ENCERRAR EN CUADROS</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;margin-top:3px;">Evitar encerrar textos y elementos dentro de cajas rectangulares rígidas; mantener siempre el flujo abierto en curvas.</div>
        </div>
      </div>
      {footer_html(t_pos, 22)}
    </section>
    """)

    # =========================================================================
    # LAMINA 23: PALETA CROMATICA OFICIAL EN NODOS ABIERTOS (PASO 5.1)
    # =========================================================================
    colors_8 = [
        ("AZUL PRINCIPAL", "#426EAE", "66 110 166", "84 45 5 0", "Pantone 7686 C", "Marca principal, Oso Estratégico, estructura, diagramas y nodos"),
        ("AZUL OSCURO", "#0D2540", "13 37 64", "98 74 29 25", "Pantone 533 C", "Anillo positivo, titulares de autoridad, estructura y acentos profundos"),
        ("NARANJA", "#FF7A00", "255 122 0", "0 66 100 0", "Pantone 151 C", "Flecha de crecimiento, descriptores de las 4 submarcas y acentos de energía"),
        ("AZUL CLARO", "#4C9DE6", "77 158 214", "69 21 0 0", "Pantone 2925 C", "Arcos secundarios, líneas conectoras, gráficas y versión negativa"),
        ("GRIS OSCURO", "#333333", "51 51 51", "0 0 0 80", "Pantone 447 C", "Texto corporativo de cuerpo, descripciones y lectura ejecutiva"),
        ("GRIS MEDIO", "#707070", "112 112 112", "0 0 0 60", "Pantone 424 C", "Metadatos, etiquetas secundarias, ejes y matrices de puntos"),
        ("GRIS CLARO", "#E6E6E6", "230 230 230", "0 0 0 10", "Cool Gray 1 C", "Ondas suaves, líneas divisorias capilares y equilibrio visual"),
        ("BLANCO", "#FFFFFF", "255 255 255", "0 0 0 0", "Papel Puro", "Lienzo editorial dominante en todo el documento y figura humana central"),
    ]
    swatches_html = ""
    for name, hx, rgb, cmyk, pms, role in colors_8:
        ring_stroke = "#CBD5E1" if hx in ("#FFFFFF", "#E6E6E6") else hx
        swatches_html += f"""
        <div style="display:flex;flex-direction:column;align-items:flex-start;padding:6px 14px 10px 0;border-bottom:1px solid #E6E6E6;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">
            <svg width="52" height="52" viewBox="0 0 52 52" style="flex-shrink:0;">
              <circle cx="26" cy="26" r="21" fill="{hx}" stroke="{ring_stroke}" stroke-width="2"/>
              <path d="M6,26 A20,20 0 0,1 46,26" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.35"/>
            </svg>
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:11px;color:#0D2540;">{name}</div>
              <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:12px;color:#FF7A00;">{hx}</div>
            </div>
          </div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:10.4px;color:#333333;line-height:1.4;">
            <div><strong>RGB:</strong> {rgb} · <strong>CMYK:</strong> {cmyk}</div>
            <div style="color:#426EAE;font-weight:600;">{pms}</div>
            <div style="color:#707070;margin-top:2px;">{role}</div>
          </div>
        </div>
        """

    plates.append(f"""
    <section class="benefic-plate" id="plate-23">
      {top_curves_svg(0)}
      {header_html("06", "PALETA CROMATICA OFICIAL • ESPECIFICACION TECNICA EN FLUJO ABIERTO (PASO 5.1)", 23)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;">
        <svg viewBox="0 0 1200 32" width="100%" height="28" preserveAspectRatio="none">
          <path d="M0,16 Q300,2 600,16 T1200,16" fill="none" stroke="#E6E6E6" stroke-width="2"/>
          <path d="M0,16 Q150,6 300,16" fill="none" stroke="#426EAE" stroke-width="4"/>
          <path d="M300,16 Q450,26 600,16" fill="none" stroke="#0D2540" stroke-width="4"/>
          <path d="M600,16 Q750,6 900,16" fill="none" stroke="#FF7A00" stroke-width="4"/>
          <path d="M900,16 Q1050,26 1200,16" fill="none" stroke="#4C9DE6" stroke-width="4"/>
        </svg>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);column-gap:24px;row-gap:14px;flex:1;align-items:center;">
          {swatches_html}
        </div>
      </div>
      {footer_html(t_pos, 23)}
    </section>
    """)

    # =========================================================================
    # LAMINA 24: REGLA 70/20/10 Y LOS 6 RECURSOS VISUALES VECTORIALES (PASO 5.2)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-24">
      {top_curves_svg(1)}
      {header_html("06", "PROPORCION DE LUZ (70/20/10) Y LOS 6 RECURSOS VISUALES EN CURVAS (PASO 5.2)", 24)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
        <div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:32px;align-items:center;padding-bottom:12px;border-bottom:1px solid #E6E6E6;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">ARQUITECTURA DE LUZ Y ACENTOS</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:20px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              Fondo claro dominante con acentos en naranja y azules.
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.8px;color:#333333;line-height:1.48;margin:0;">
              El <strong>70% del documento</strong> es lienzo claro (#FFFFFF / #E6E6E6) para máxima respiración editorial; el <strong>20% son Azules (#426EAE, #0D2540, #4C9DE6)</strong> en tipografía y arcos; y el <strong>10% es Naranja (#FF7A00)</strong> como vector de energía y crecimiento.
            </p>
          </div>
          <div>
            <svg viewBox="0 0 460 54" width="100%" height="54">
              <line x1="10" y1="22" x2="320" y2="22" stroke="#E6E6E6" stroke-width="12" stroke-linecap="round"/>
              <line x1="328" y1="22" x2="412" y2="22" stroke="#426EAE" stroke-width="12" stroke-linecap="round"/>
              <line x1="420" y1="22" x2="452" y2="22" stroke="#FF7A00" stroke-width="12" stroke-linecap="round"/>
              <text x="165" y="46" text-anchor="middle" fill="#0D2540" font-family="Montserrat" font-weight="800" font-size="9.5">70% FONDO CLARO (#FFFFFF)</text>
              <text x="370" y="46" text-anchor="middle" fill="#426EAE" font-family="Montserrat" font-weight="800" font-size="9.5">20% AZULES</text>
              <text x="436" y="46" text-anchor="middle" fill="#FF7A00" font-family="Montserrat" font-weight="800" font-size="9.5">10%</text>
            </svg>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px;align-items:center;flex:1;padding-top:4px;">
          <div style="border-right:1px solid #E6E6E6;padding-right:12px;">
            <svg viewBox="0 0 140 90" width="100%" height="84">
              <path d="M5,78 C35,25 80,15 135,8 C95,35 55,58 5,78 Z" fill="#FF7A00"/>
              <path d="M18,82 C60,45 95,30 135,22 L135,44 C95,58 55,72 18,82 Z" fill="#0D2540"/>
              <path d="M35,86 C75,60 105,48 135,42 L135,58 C105,68 70,78 35,86 Z" fill="#4C9DE6"/>
            </svg>
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;margin-top:6px;">Líneas curvas</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;margin-top:2px;">Flujo, continuidad, integración y evolución.</div>
          </div>

          <div style="border-right:1px solid #E6E6E6;padding-right:12px;">
            <svg viewBox="0 0 140 90" width="100%" height="84">
              <path d="M18,75 A42,42 0 0,1 102,75" fill="none" stroke="#0D2540" stroke-width="4.5" stroke-linecap="round"/>
              <path d="M38,75 A36,36 0 0,1 112,75" fill="none" stroke="#FF7A00" stroke-width="4.5" stroke-linecap="round"/>
              <path d="M58,75 A28,28 0 0,1 122,75" fill="none" stroke="#4C9DE6" stroke-width="4" stroke-linecap="round"/>
            </svg>
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;margin-top:6px;">Arcos abiertos</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;margin-top:2px;">Ecosistema, arquitectura, protección y estructura.</div>
          </div>

          <div style="border-right:1px solid #E6E6E6;padding-right:12px;">
            <svg viewBox="0 0 140 90" width="100%" height="84">
              <g fill="#707070">
                <circle cx="25" cy="20" r="3"/><circle cx="50" cy="20" r="3"/><circle cx="75" cy="20" r="3"/><circle cx="100" cy="20" r="3"/>
                <circle cx="25" cy="40" r="3"/><circle cx="50" cy="40" r="3"/><circle cx="75" cy="40" r="3"/><circle cx="100" cy="40" r="3"/>
                <circle cx="25" cy="60" r="3"/><circle cx="50" cy="60" r="3"/><circle cx="75" cy="60" r="3"/><circle cx="100" cy="60" r="3"/>
              </g>
            </svg>
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;margin-top:6px;">Grids minimalistas</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;margin-top:2px;">Orden, precisión, método e ingeniería.</div>
          </div>

          <div style="border-right:1px solid #E6E6E6;padding-right:12px;">
            <svg viewBox="0 0 140 90" width="100%" height="84">
              <path d="M8,68 C45,25 85,20 132,12" fill="none" stroke="#E6E6E6" stroke-width="6" stroke-linecap="round"/>
              <path d="M18,76 C55,40 95,32 132,26" fill="none" stroke="#E6E6E6" stroke-width="5" stroke-linecap="round"/>
              <path d="M30,82 C65,55 100,45 132,40" fill="none" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;margin-top:6px;">Patrones suaves</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;margin-top:2px;">Profundidad visual sin saturar el diseño.</div>
          </div>

          <div style="border-right:1px solid #E6E6E6;padding-right:12px;">
            <svg viewBox="0 0 140 90" width="100%" height="84">
              <path d="M18,74 Q52,65 78,20" fill="none" stroke="#FF7A00" stroke-width="5" stroke-linecap="round"/>
              <polygon points="82,12 68,20 83,27" fill="#FF7A00"/>
              <path d="M46,76 Q78,66 104,22" fill="none" stroke="#0D2540" stroke-width="5" stroke-linecap="round"/>
              <polygon points="108,14 94,22 109,29" fill="#0D2540"/>
            </svg>
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;margin-top:6px;">Flechas de crecimiento</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;margin-top:2px;">Dirección, avance, enfoque y mejora continua.</div>
          </div>

          <div>
            <svg viewBox="0 0 140 90" width="100%" height="84">
              <circle cx="24" cy="45" r="12" fill="none" stroke="#0D2540" stroke-width="2.5"/>
              <line x1="36" y1="45" x2="54" y2="45" stroke="#0D2540" stroke-width="2.5"/>
              <circle cx="68" cy="45" r="14" fill="none" stroke="#FF7A00" stroke-width="2.8"/>
              <line x1="82" y1="45" x2="100" y2="45" stroke="#0D2540" stroke-width="2.5"/>
              <circle cx="112" cy="45" r="11" fill="none" stroke="#4C9DE6" stroke-width="2.5"/>
            </svg>
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;margin-top:6px;">Diagramas y flujos</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:10.5px;color:#333333;line-height:1.38;margin-top:2px;">Pensamiento sistémico, claridad y procesos conectados.</div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 24)}
    </section>
    """)

    # =========================================================================
    # LAMINA 25: SISTEMA TIPOGRAFICO ABIERTO SOBRE FONDO CLARO (PASO 5.3)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-25">
      {top_curves_svg(0)}
      {header_html("06", "SISTEMA TIPOGRAFICO OFICIAL • MONTSERRAT & AVENIR NEXT (PASO 5.3)", 25)}
      <div class="plate-body" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;align-items:center;">
        <div style="padding:8px 26px 8px 6px;border-right:1px solid #E6E6E6;">
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.16em;">TIPOGRAFIA PRIMARIA • TITULOS Y BRANDING</div>
          <div style="font-family:'Montserrat',sans-serif;font-size:28px;font-weight:800;color:#0D2540;margin:6px 0 2px 0;">MONTSERRAT</div>
          <div style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:600;color:#426EAE;margin-bottom:10px;">ExtraBold 800 · Bold 700 · SemiBold 600 · Regular 400</div>
          <div style="font-family:'Montserrat',sans-serif;font-size:64px;font-weight:800;color:#0D2540;line-height:1;margin-bottom:10px;">Aa</div>
          <p style="font-family:'Avenir Next',sans-serif;font-size:11.5px;color:#333333;line-height:1.48;margin:0 0 12px 0;">
            Geométrica, firme y contemporánea. Utilizada en el wordmark <strong>IMPROBEARS</strong>, en los descriptores de las 4 submarcas y en todos los titulares ejecutivos.
          </p>
          <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;color:#707070;line-height:1.6;border-top:1px solid #E6E6E6;padding-top:10px;">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
            abcdefghijklmnopqrstuvwxyz<br/>
            0123456789 • % &amp; ( ) / +
          </div>
        </div>

        <div style="padding:8px 26px;border-right:1px solid #E6E6E6;">
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#426EAE;letter-spacing:0.16em;">TIPOGRAFIA SECUNDARIA • SUBTITULOS Y CUERPO</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:28px;font-weight:600;color:#0D2540;margin:6px 0 2px 0;">AVENIR NEXT</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;font-weight:600;color:#FF7A00;margin-bottom:10px;">Demi Bold 600 · Medium 500 · Regular 400</div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:64px;font-weight:500;color:#0D2540;line-height:1;margin-bottom:10px;">Aa</div>
          <p style="font-family:'Avenir Next',sans-serif;font-size:11.5px;color:#333333;line-height:1.48;margin:0 0 12px 0;">
            Humanista, cálida y de altísima legibilidad. Aporta cercanía ejecutiva en párrafos largos, diagnósticos, reportes y documentación técnica.
          </p>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#707070;line-height:1.6;border-top:1px solid #E6E6E6;padding-top:10px;">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
            abcdefghijklmnopqrstuvwxyz<br/>
            0123456789 • Lectura ejecutiva limpia
          </div>
        </div>

        <div style="padding:8px 6px 8px 26px;">
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;letter-spacing:0.16em;margin-bottom:12px;">
            EJEMPLOS DE USO Y JERARQUIA EDITORIAL
          </div>
          <div style="border-left:3.5px solid #FF7A00;padding-left:16px;margin-bottom:18px;">
            <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:22px;color:#0D2540;margin-bottom:6px;">TITULOS PRINCIPALES</div>
            <div style="font-family:'Avenir Next',sans-serif;font-weight:600;font-size:15px;color:#FF7A00;margin-bottom:8px;">Subtítulos y encabezados</div>
            <div style="font-family:'Avenir Next',sans-serif;font-weight:400;font-size:12.5px;color:#333333;line-height:1.5;">
              Texto corporativo elegante, respirable y minimalista para presentaciones, reportes, manuales y documentos.
            </div>
          </div>
          <div style="border-top:1px solid #E6E6E6;padding-top:12px;font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.5;">
            <strong style="color:#0D2540;">Regla tipográfica:</strong> Mantener siempre amplio aire blanco alrededor de los textos, sin encerrarlos en cajas ni saturar con mayúsculas corridas.
          </div>
        </div>
      </div>
      {footer_html(t_pos, 25)}
    </section>
    """)

    # =========================================================================
    # LAMINA 26: LOS 6 SELLOS METODOLOGICOS OFICIALES (RESCATADOS DE DRIVE)
    # =========================================================================
    seals = [
        ("SELLO 01", "Productividad Estratégica", "Claridad operacional, gestión inteligente del tiempo (Ritmo Diario de 15 Minutos), ejecución organizada y productividad sostenible.", "#FF7A00", assets["sello_01"]),
        ("SELLO 02", "Empowerment Organizacional", "Autonomía del equipo, matrices RACI claras, responsabilidad compartida y toma de decisiones distribuida sin cuellos de botella.", "#426EAE", assets["sello_02"]),
        ("SELLO 03", "Estrategia y Arquitectura", "Visión de largo plazo, alineación de unidades de negocio, mapa estratégico y dirección organizacional estructurada.", "#0D2540", assets["sello_03"]),
        ("SELLO 04", "Marca Centrada en el Cliente", "Propuesta de valor diferenciada, identidad coherente, ingeniería de Touchpoints y conexión de alta confianza.", "#FF7A00", assets["sello_04"]),
        ("SELLO 05", "Pensamiento Sistémico", "Comprensión de relaciones causa-efecto (5 Por Qués), interdependencia operativa y decisiones basadas en datos.", "#426EAE", assets["sello_05"]),
        ("SELLO 06", "CRM y Productividad Comercial", "Visibilidad total del pipeline en Zoho CRM, seguimiento automatizado, conversión B2B y trazabilidad hasta cobranza CFDI.", "#0D2540", assets["sello_06"]),
    ]
    seals_html = ""
    for code, title, desc, accent, seal_img in seals:
        seals_html += f"""
        <div style="display:flex;align-items:center;gap:14px;padding-bottom:14px;border-bottom:1px solid #E6E6E6;">
          <img src="{seal_img}" alt="{title}" style="width:112px;height:112px;object-fit:contain;flex-shrink:0;display:block;mix-blend-mode:multiply;" />
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:{accent};letter-spacing:0.15em;">{code}</div>
            <div style="font-family:'Montserrat',sans-serif;font-size:13.5px;font-weight:800;color:#0D2540;margin:2px 0 4px 0;">{title}</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.42;">{desc}</div>
          </div>
        </div>
        """

    plates.append(f"""
    <section class="benefic-plate" id="plate-26">
      {top_curves_svg(1)}
      {header_html("06", "SISTEMA DE LOS 6 SELLOS METODOLOGICOS OFICIALES (PASO 5.4)", 26)}
      <div class="plate-body" style="display:grid;grid-template-columns:repeat(3,1fr);column-gap:26px;row-gap:16px;align-items:center;">
        {seals_html}
      </div>
      {footer_html(t_pos, 26)}
    </section>
    """)

    # =========================================================================
    # LAMINA 27: GOBERNANZA DE IDENTIDAD DOCUMENTAL (REGLA MAX C-00 CON LOGO POSITIVO EN FONDO CLARO)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-27">
      {top_curves_svg(0)}
      {header_html("07", "GOBERNANZA DE IDENTIDAD DOCUMENTAL Y CO-BRANDING (REGLA MAX C-00 · PASO 6.1)", 27)}
      <div class="plate-body" style="display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;">
        <div style="padding-right:20px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;gap:14px;">
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">REGLA 1 • DOCUMENTOS FIRMADOS POR IMPROBEARS O SUS 4 SUBMARCAS</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              100% Manual ImproBears en Fondo Claro + Cápsula Neutra Cliente
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.48;margin:0;">
              Cuando <strong>ImproBears (Master, Consulting, Ingredients, Studio o AI)</strong> emite una propuesta, cotización o reporte, el 100% del documento se construye sobre lienzo claro con nuestras curvas, tipografías y <strong>logotipo positivo por defecto</strong>.
            </p>
          </div>

          <img src="{photo_desk}" alt="Entregables Ejecutivos ImproBears" style="width:100%;height:142px;object-fit:cover;object-position:center center;border-radius:16px 34px 16px 16px;border-bottom:3px solid #FF7A00;display:block;" />

          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1.5px solid #E6E6E6;">
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="{c_logo}" alt="Emisor ImproBears Positivo" style="width:54px;height:54px;object-fit:contain;display:block;" />
              <div>
                <div style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#FF7A00;">MARCA EMISORA (POSITIVO DEFAULT)</div>
                <div style="font-family:'Montserrat',sans-serif;font-size:11.5px;font-weight:800;color:#0D2540;">IMPROBEARS CONSULTING</div>
              </div>
            </div>
            <svg width="46" height="20" viewBox="0 0 46 20">
              <line x1="2" y1="10" x2="44" y2="10" stroke="#4C9DE6" stroke-width="2" stroke-dasharray="4,3"/>
              <circle cx="23" cy="10" r="3.5" fill="#FF7A00"/>
            </svg>
            <div style="border:1.5px dashed #426EAE;border-radius:99px;padding:7px 14px;text-align:center;">
              <div style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:800;color:#707070;">PREPARADO PARA:</div>
              <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;">[ LOGO CLIENTE AISLADO ]</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="border-left:3.5px solid #426EAE;padding-left:16px;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#426EAE;letter-spacing:0.15em;">REGLA 2 • DOCUMENTOS GENERADOS PARA QUE EL CLIENTE LOS FIRME</div>
            <h3 style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:#0D2540;margin:4px 0 6px 0;">
              100% Brandbook del Cliente (Cero Mezcla Visual)
            </h3>
            <p style="font-family:'Avenir Next',sans-serif;font-size:11.6px;color:#333333;line-height:1.48;margin:0;">
              Cuando generamos un documento a nombre del cliente para que dicho cliente lo firme ante terceros, la pieza se guía al 100% por el manual de marca del cliente, sin mezclar curvas ni colores de ImproBears.
            </p>
          </div>

          <div style="padding-top:12px;border-top:1px solid #E6E6E6;">
            <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;letter-spacing:0.14em;margin-bottom:8px;">
              ESTANDAR CANONICO OFICIAL • MANUAL DE 30 LAMINAS EN CURVAS ABIERTAS
            </div>
            <div style="display:flex;align-items:center;gap:16px;">
              <svg viewBox="0 0 210 124" width="210" height="124" style="flex-shrink:0;border-radius:10px;border:1px solid #E6E6E6;background:#FFFFFF;">
                <path d="M0,0 L95,0 C65,24 32,46 0,74 Z" fill="#FF7A00"/>
                <path d="M135,124 C165,98 190,74 210,44 L210,124 Z" fill="#426EAE" opacity="0.22"/>
                <path d="M22,84 C75,54 135,96 188,62" fill="none" stroke="#4C9DE6" stroke-width="2" stroke-dasharray="4,3"/>
                <circle cx="52" cy="72" r="5" fill="#0D2540"/>
                <circle cx="108" cy="75" r="5" fill="#FF7A00"/>
                <circle cx="164" cy="68" r="5" fill="#426EAE"/>
                <text x="105" y="42" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="11" fill="#0D2540">IMPROBEARS</text>
                <text x="105" y="54" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="6.5" fill="#FF7A00" letter-spacing="1.2">30 LAMINAS OFICIALES</text>
                <text x="105" y="108" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="6.5" fill="#426EAE" letter-spacing="1">LIENZO CLARO • POSITIVO DEFAULT</text>
              </svg>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11.4px;color:#333333;line-height:1.48;">
                Este <strong>Manual de 30 Láminas en Curvas</strong> es la única referencia oficial para tomar decisiones y crear material en toda la empresa: todo fluye sobre blanco con curvas vectoriales en <strong>#FF7A00</strong>, <strong>#426EAE</strong>, <strong>#4C9DE6</strong> y <strong>#0D2540</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 27)}
    </section>
    """)

    # =========================================================================
    # LAMINA 28: APLICACIONES EDITORIALES EN FONDO CLARO (PAPELERIA, PROPUESTAS, TARJETAS Y FIRMA)
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-28">
      {top_curves_svg(1)}
      {header_html("07", "APLICACIONES EDITORIALES EN FONDO CLARO • PAPELERIA, PROPUESTAS, TARJETAS Y FIRMA (PASO 6.2)", 28)}
      <div class="plate-body" style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:34px;align-items:center;">
        <!-- Izquierda: Hoja Membretada + Portada de Propuesta en Fondo Claro -->
        <div style="padding-right:20px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;gap:14px;">
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#FF7A00;letter-spacing:0.15em;">
            01 • HOJA MEMBRETADA Y PORTADAS EJECUTIVAS (LIENZO CLARO + LOGO POSITIVO)
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
            <!-- Hoja Membretada -->
            <div style="background:#FFFFFF;border-top:3px solid #FF7A00;border-bottom:2px solid #426EAE;padding:12px;height:165px;display:flex;flex-direction:column;justify-content:space-between;filter:drop-shadow(0 10px 24px rgba(13,37,64,0.07));position:relative;overflow:hidden;">
              <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #E6E6E6;padding-bottom:5px;">
                <div style="display:flex;align-items:center;gap:5px;">
                  <img src="{m_logo}" alt="Logo Positivo" style="width:26px;height:26px;object-fit:contain;" />
                  <span style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:800;color:#0D2540;">IMPROBEARS</span>
                </div>
                <span style="font-family:'Montserrat',sans-serif;font-size:6.5px;font-weight:700;color:#426EAE;">improbears.com</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:5px;">
                <div style="width:58%;height:4.5px;background:#0D2540;border-radius:3px;"></div>
                <div style="width:36%;height:3px;background:#FF7A00;border-radius:3px;"></div>
                <div style="width:92%;height:2.5px;background:#E6E6E6;border-radius:3px;"></div>
                <div style="width:84%;height:2.5px;background:#E6E6E6;border-radius:3px;"></div>
              </div>
              <div style="border-top:1px solid #E6E6E6;padding-top:4px;font-family:'Montserrat',sans-serif;font-size:6px;color:#426EAE;display:flex;justify-content:space-between;">
                <span>ESTRATEGIA • SISTEMAS • RESULTADOS</span><span style="color:#FF7A00;font-weight:800;">PAG. 01</span>
              </div>
            </div>

            <!-- Portada de Propuesta -->
            <div style="background:#FFFFFF;border-top:3px solid #426EAE;border-bottom:2px solid #FF7A00;padding:12px;height:165px;display:flex;flex-direction:column;justify-content:space-between;filter:drop-shadow(0 10px 24px rgba(13,37,64,0.07));position:relative;overflow:hidden;">
              <svg viewBox="0 0 300 165" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;">
                <path d="M0,0 L135,0 C90,26 42,50 0,82 Z" fill="#FF7A00" opacity="0.88"/>
                <path d="M190,165 C235,135 270,105 300,65 L300,165 Z" fill="#426EAE" opacity="0.16"/>
              </svg>
              <div style="position:relative;z-index:1;display:flex;justify-content:flex-end;">
                <img src="{c_logo}" alt="Consulting Positivo" style="width:40px;height:40px;object-fit:contain;" />
              </div>
              <div style="position:relative;z-index:1;">
                <div style="font-family:'Montserrat',sans-serif;font-size:7px;font-weight:800;color:#FF7A00;">PROPUESTA EJECUTIVA</div>
                <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;">ARQUITECTURA OPERACIONAL</div>
                <div style="font-family:'Avenir Next',sans-serif;font-size:8px;color:#426EAE;font-weight:600;">Claridad en 30 Días · Zoho One</div>
              </div>
              <div style="position:relative;z-index:1;border-top:1px dashed #426EAE;padding-top:4px;font-family:'Montserrat',sans-serif;font-size:6.5px;font-weight:800;color:#0D2540;">
                PREPARADO PARA: [ CAPSULA CLIENTE ]
              </div>
            </div>
          </div>
          <div style="font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;line-height:1.44;">
            Toda la papelería comercial, cotizaciones y contratos en <strong>Zoho Sign / Zoho Books</strong> se emiten sobre papel/lienzo blanco con el logotipo positivo de la división.
          </div>
        </div>

        <!-- Derecha: Tarjetas Ejecutivas + Firma de Correo en Fondo Claro -->
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#426EAE;letter-spacing:0.15em;">
            02 • TARJETAS EJECUTIVAS (90×50 MM) Y FIRMA DE CORREO CORPORATIVO
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
            <div style="background:#FFFFFF;border-radius:12px;padding:12px;height:112px;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;position:relative;overflow:hidden;filter:drop-shadow(0 10px 22px rgba(13,37,64,0.08));">
              <svg viewBox="0 0 260 120" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;">
                <path d="M0,0 L115,0 C75,22 35,45 0,72 Z" fill="#FF7A00"/>
                <path d="M140,120 C185,95 225,70 260,30 L260,120 Z" fill="#426EAE" opacity="0.22"/>
              </svg>
              <img src="{m_logo}" alt="Master Positivo" style="width:56px;height:56px;object-fit:contain;position:relative;z-index:1;" />
              <div style="position:relative;z-index:1;">
                <div style="font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:800;color:#0D2540;">IMPROBEARS</div>
                <div style="font-family:'Montserrat',sans-serif;font-size:6.5px;font-weight:700;color:#FF7A00;">BUSINESS IMPROVEMENT</div>
              </div>
            </div>
            <div style="background:#FFFFFF;border-radius:12px;padding:12px;height:112px;display:flex;flex-direction:column;justify-content:space-between;filter:drop-shadow(0 10px 22px rgba(13,37,64,0.08));border-left:3.5px solid #FF7A00;">
              <div>
                <div style="font-family:'Montserrat',sans-serif;font-size:11.5px;font-weight:800;color:#0D2540;">JORGE BENITEZ</div>
                <div style="font-family:'Avenir Next',sans-serif;font-size:8.5px;font-weight:600;color:#FF7A00;">Founder &amp; Principal Systems Architect</div>
              </div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:8.5px;color:#333333;line-height:1.4;">
                jorge.benitez@improbears.com<br/>
                <span style="font-family:'Montserrat',sans-serif;font-size:7px;font-weight:800;color:#426EAE;">CONSULTING · INGREDIENTS · STUDIO · AI</span>
              </div>
            </div>
          </div>

          <!-- Firma de Correo -->
          <div style="display:flex;align-items:center;gap:12px;padding-top:10px;border-top:1px solid #E6E6E6;">
            <img src="{m_logo}" alt="Firma Logo Positivo" style="width:54px;height:54px;object-fit:contain;flex-shrink:0;" />
            <div style="border-left:3px solid #FF7A00;padding-left:12px;">
              <div style="font-family:'Montserrat',sans-serif;font-size:12px;font-weight:800;color:#0D2540;">Jorge Benitez · <span style="color:#426EAE;font-weight:600;">ImproBears</span></div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:10px;color:#333333;">jorge.benitez@improbears.com · www.improbears.com</div>
              <div style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:800;color:#FF7A00;letter-spacing:0.12em;margin-top:2px;">ESTRATEGIA • SISTEMAS • PRODUCTIVIDAD • RESULTADOS</div>
            </div>
          </div>
        </div>
      </div>
      {footer_html(t_pos, 28)}
    </section>
    """)

    # =========================================================================
    # LAMINA 29: ECOSISTEMA DIGITAL EN LIENZO CLARO Y CHECKLIST DE AUDITORIA (10 CONTROLES)
    # =========================================================================
    checks = [
        ("01. Logotipo en Positivo por Defecto", "Logo positivo sobre fondo claro (#FFFFFF) en todo el documento, salvo en la Lámina 21."),
        ("02. Lienzo Claro Dominante (70/20/10)", "Fondo blanco luminoso con acentos fluidos en naranja (#FF7A00) y azules (#0D2540, #426EAE, #4C9DE6)."),
        ("03. Cero Elementos Encerrados en Cajas", "Textos y gráficos libres conectados por curvas vectoriales tipo Illustrator."),
        ("04. La Empresa como Persona (Jorge Benítez)", "Presencia cálida, ingenieril y leal de 'El Oso' reflejada en voz y conducta."),
        ("05. Touchpoints Antes del Nombre", "Ingeniería Antes · Durante · Después documentada antes del Naming Oficial."),
        ("06. Familia de 4 Submarcas Homologada", "Consulting, Ingredients, Studio y AI con el mismo esquema y descriptor en #FF7A00."),
        ("07. Aplicación en Negativo sin Parches", "En fondos oscuros se usa el archivo -negativo.png con silueta humana transparente."),
        ("08. Tipografía Oficial Intocable", "Titulares en Montserrat y cuerpo ejecutivo en Avenir Next con amplio aire blanco."),
        ("09. Directiva Max C-00 (Co-Branding)", "Logo del cliente aislado en cápsula neutra sin mezclar colores ni curvas."),
        ("10. Exportación Limpia en Curvas / PDF", "Documento vectorial en alta resolución sin bordes oscuros ni recortes."),
    ]
    checks_html = ""
    for idx, (title, desc) in enumerate(checks):
        dot_c = "#FF7A00" if idx % 2 == 0 else "#426EAE"
        checks_html += f"""
        <div style="display:flex;align-items:flex-start;gap:8px;padding-bottom:6px;border-bottom:1px solid #E6E6E6;">
          <svg width="16" height="16" viewBox="0 0 18 18" style="flex-shrink:0;margin-top:2px;">
            <circle cx="9" cy="9" r="7" fill="none" stroke="{dot_c}" stroke-width="2"/>
            <polyline points="5.5,9 8,11.5 12.5,6.5" fill="none" stroke="#0D2540" stroke-width="2"/>
          </svg>
          <div>
            <div style="font-family:'Montserrat',sans-serif;font-size:10px;font-weight:800;color:#0D2540;">{title}</div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:9.8px;color:#333333;line-height:1.32;">{desc}</div>
          </div>
        </div>
        """

    plates.append(f"""
    <section class="benefic-plate" id="plate-29">
      {top_curves_svg(0)}
      {header_html("07", "ECOSISTEMA DIGITAL EN LIENZO CLARO Y CHECKLIST DE AUDITORIA (10 CONTROLES · PASO 6.3)", 29)}
      <div class="plate-body" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
        <!-- Barra Superior: Ecosistema Digital en Modo Claro -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;border-bottom:1.5px solid #E6E6E6;">
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="{a_logo}" alt="AI Positivo" style="width:42px;height:42px;object-fit:contain;" />
            <div>
              <div style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#FF7A00;letter-spacing:0.14em;">INTERFACES DIGITALES, WEB Y TABLEROS BI EN MODO CLARO</div>
              <div style="font-family:'Avenir Next',sans-serif;font-size:11.2px;color:#333333;">
                Portales web, dashboards ejecutivos y reportes interactivos priorizan el lienzo blanco (#FFFFFF) con logotipo positivo y acentos en azul y naranja.
              </div>
            </div>
          </div>
          <span style="font-family:'Montserrat',sans-serif;font-size:9px;font-weight:800;color:#0D2540;border-left:3px solid #FF7A00;padding-left:10px;">AUDITORIA C-00</span>
        </div>

        <!-- 10 Controles de Auditoría en Flujo Abierto -->
        <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:30px;row-gap:8px;flex:1;align-items:center;">
          {checks_html}
        </div>
      </div>
      {footer_html(t_pos, 29)}
    </section>
    """)

    # =========================================================================
    # LAMINA 30: COLOFON INSTITUCIONAL SOBRE FONDO CLARO (#FFFFFF) CON CURVAS ILLUSTRATOR Y LOGOS POSITIVOS
    # =========================================================================
    plates.append(f"""
    <section class="benefic-plate" id="plate-30" style="background:#FFFFFF;color:#0D2540;">
      <svg viewBox="0 0 1600 900" width="100%" height="100%" preserveAspectRatio="none" style="position:absolute;inset:0;pointer-events:none;z-index:1;">
        <!-- Ondas superiores izquierdas en Naranja y Gris Claro debajo del encabezado -->
        <path d="M0,58 L460,58 C310,135 160,220 0,320 Z" fill="#FF7A00" opacity="0.9"/>
        <path d="M0,245 C180,165 350,105 550,58 L640,58 C410,130 210,210 0,355 Z" fill="#E6E6E6" opacity="0.85"/>
        <!-- Curva central tipo Illustrator que abraza las 4 submarcas -->
        <path d="M120,560 C480,500 1120,620 1480,540" fill="none" stroke="#4C9DE6" stroke-width="2" stroke-dasharray="6,6" opacity="0.6"/>
        <!-- Ondas inferiores derechas en Azules -->
        <path d="M1080,900 C1280,790 1450,650 1600,470 L1600,900 Z" fill="#0D2540" opacity="0.09"/>
        <path d="M980,900 C1220,780 1420,620 1600,410 L1600,475 C1430,665 1240,805 1040,900 Z" fill="#426EAE" opacity="0.22"/>
        <path d="M910,900 C1170,770 1390,600 1600,365 L1600,400 C1400,625 1185,785 955,900 Z" fill="#4C9DE6" opacity="0.45"/>
      </svg>
      {header_html("07", "COLOFON INSTITUCIONAL • ARQUITECTURA MAESTRA IMPROBEARS (PASO 6.4)", 30)}
      <div class="plate-body" style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:14px;text-align:center;padding-top:10px;">
        <!-- Marca Madre en Positivo sobre Fondo Claro (#FFFFFF) -->
        <div style="display:flex;flex-direction:column;align-items:center;">
          <img src="{m_logo}" alt="ImproBears Master Positivo Oficial" style="width:162px;height:162px;object-fit:contain;display:block;filter:drop-shadow(0 12px 24px rgba(13,37,64,0.08));" />
          <h2 style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:28px;color:#0D2540;margin:8px 0 3px 0;letter-spacing:0.03em;">IMPROBEARS — BUSINESS IMPROVEMENT</h2>
          <div style="font-family:'Avenir Next',sans-serif;font-weight:600;font-size:13px;color:#426EAE;margin-bottom:5px;">
            Arquitectos de sistemas de productividad • Complejidad organizacional transformada en claridad visual.
          </div>
          <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:10px;letter-spacing:0.22em;color:#FF7A00;">
            ESTRATEGIA • SISTEMAS • PRODUCTIVIDAD • RESULTADOS
          </div>
        </div>

        <!-- Las 4 Submarcas en Positivo sobre Lienzo Blanco separadas por líneas capilares (Cero Cajas) -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;width:100%;max-width:1020px;padding:12px 0;border-top:1.5px solid #E6E6E6;border-bottom:1.5px solid #E6E6E6;">
          <div style="padding:4px 14px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;align-items:center;">
            <img src="{c_logo}" alt="Consulting Positivo" style="height:92px;object-fit:contain;margin-bottom:6px;" />
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">CONSULTING</span></div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:9.5px;color:#426EAE;font-weight:600;margin-top:2px;">consulting.improbears.com</div>
          </div>
          <div style="padding:4px 14px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;align-items:center;">
            <img src="{i_logo}" alt="Ingredients Positivo" style="height:92px;object-fit:contain;margin-bottom:6px;" />
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">INGREDIENTS</span></div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:9.5px;color:#426EAE;font-weight:600;margin-top:2px;">ingredients.improbears.com</div>
          </div>
          <div style="padding:4px 14px;border-right:1px solid #E6E6E6;display:flex;flex-direction:column;align-items:center;">
            <img src="{s_logo}" alt="Studio Positivo" style="height:92px;object-fit:contain;margin-bottom:6px;" />
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">STUDIO</span></div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:9.5px;color:#426EAE;font-weight:600;margin-top:2px;">studio.improbears.com</div>
          </div>
          <div style="padding:4px 14px;display:flex;flex-direction:column;align-items:center;">
            <img src="{a_logo}" alt="AI Positivo" style="height:92px;object-fit:contain;margin-bottom:6px;" />
            <div style="font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:800;color:#0D2540;">IMPROBEARS <span style="color:#FF7A00;">AI</span></div>
            <div style="font-family:'Avenir Next',sans-serif;font-size:9.5px;color:#426EAE;font-weight:600;margin-top:2px;">ai.improbears.com</div>
          </div>
        </div>

        <div style="width:100%;max-width:1020px;display:flex;align-items:center;justify-content:space-between;font-family:'Avenir Next',sans-serif;font-size:11px;color:#333333;">
          <span><strong style="color:#0D2540;">Contacto Oficial:</strong> jorge.benitez@improbears.com · sales@improbears.com · www.improbears.com</span>
          <span><strong style="color:#FF7A00;">Motor en Curvas:</strong> TheBestBrand Studio Engine v5.1 · Edición Jorge Benítez &amp; Elena Vance</span>
        </div>
      </div>
      {footer_html(t_pos, 30)}
    </section>
    """)

    return plates


def build_complete_improbears_brandbook_html(embed_base64: bool = True) -> str:
    assets = get_improbears_assets(embed_base64=embed_base64)
    plates_1_15 = build_plates_01_to_15(assets)
    plates_16_30 = build_plates_16_to_30(assets)
    all_plates_html = "\n".join(plates_1_15 + plates_16_30)

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manual de Marca y Arquitectura Maestra en Curvas — IMPROBEARS (Consulting · Ingredients · Studio · AI)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: 297mm 210mm;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    body {{
      margin: 0;
      padding: 24px 0;
      background: #F4F7FA;
      font-family: 'Avenir Next', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #333333;
    }}
    .top-bar-no-print {{
      position: sticky;
      top: 0;
      z-index: 999;
      max-width: 1122px;
      margin: 0 auto 20px auto;
      background: rgba(255, 255, 255, 0.96);
      border-bottom: 3px solid #FF7A00;
      border-radius: 14px;
      padding: 12px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #0D2540;
      box-shadow: 0 12px 30px rgba(13, 37, 64, 0.08);
      backdrop-filter: blur(10px);
    }}
    .benefic-plate {{
      width: 297mm;
      height: 210mm;
      margin: 0 auto 22px auto;
      background: #FFFFFF;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 16px 40px rgba(13, 37, 64, 0.08);
      page-break-after: always;
      break-after: page;
    }}
    .plate-hdr {{
      position: relative;
      z-index: 2;
      padding: 18px 42px 10px 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E6E6E6;
    }}
    .plate-body {{
      position: relative;
      z-index: 2;
      flex: 1;
      padding: 18px 42px;
      overflow: hidden;
    }}
    .plate-ftr {{
      position: relative;
      z-index: 2;
      height: 42px;
      background: #FFFFFF;
      padding: 0 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #0D2540;
    }}
    /* Elementos en flujo abierto tipo Illustrator (Cero Cajas Cerradas) */
    .ib-flow-node {{
      padding: 4px 8px 4px 0;
    }}
    .ib-node-hdr {{
      display: flex;
      align-items: center;
      gap: 7px;
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: #426EAE;
      text-transform: uppercase;
      margin-bottom: 4px;
    }}
    .ib-dot-orange {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #FF7A00;
      display: inline-block;
      flex-shrink: 0;
    }}
    .ib-dot-blue {{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #426EAE;
      display: inline-block;
      flex-shrink: 0;
    }}
    .ib-flow-title {{
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 800;
      color: #0D2540;
      margin-bottom: 4px;
    }}
    .ib-flow-txt {{
      font-family: 'Avenir Next', 'Plus Jakarta Sans', sans-serif;
      font-size: 11.2px;
      line-height: 1.46;
      color: #333333;
    }}
    @media print {{
      body {{
        background: #FFFFFF;
        padding: 0;
      }}
      .top-bar-no-print {{
        display: none !important;
      }}
      .benefic-plate {{
        margin: 0;
        box-shadow: none;
        page-break-after: always;
        break-after: page;
      }}
    }}
  </style>
</head>
<body>
  <div class="top-bar-no-print">
    <div>
      <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:13px;color:#0D2540;">
        IMPROBEARS — MANUAL DE MARCA Y ARQUITECTURA EN CURVAS (30 LAMINAS • LIENZO CLARO)
      </div>
      <div style="font-size:11px;color:#426EAE;font-weight:600;">
        Persona: Jorge Benítez (“El Oso”) • Touchpoints Antes del Nombre • Logotipo Positivo por Defecto sobre Fondo Claro
      </div>
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()" style="background:#FF7A00;color:#FFFFFF;border:none;border-radius:99px;padding:10px 20px;font-family:'Montserrat',sans-serif;font-weight:800;font-size:11px;cursor:pointer;">
        IMPRIMIR / GUARDAR PDF EN CURVAS (30 LAMINAS)
      </button>
    </div>
  </div>
  {all_plates_html}
</body>
</html>
"""


def build_master_illustrator_svg_sheet(assets: dict) -> str:
    """Genera además un archivo maestro .SVG nativo en curvas vectoriales puras (compatible con Adobe Illustrator)."""
    m_logo = assets["master"]
    c_logo = assets["consulting"]
    i_logo = assets["ingredients"]
    s_logo = assets["studio"]
    a_logo = assets["ai"]
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" width="1600" height="900">
  <rect width="1600" height="900" fill="#FFFFFF"/>
  <!-- Curvas Institucionales Sangradas tipo Illustrator -->
  <path d="M0,0 L760,0 C540,85 280,190 0,350 Z" fill="#FF7A00"/>
  <path d="M0,255 C260,145 520,68 830,0 L940,0 C600,105 310,220 0,395 Z" fill="#E6E6E6" opacity="0.85"/>
  <path d="M1060,900 C1270,790 1440,650 1600,450 L1600,900 Z" fill="#0D2540" opacity="0.10"/>
  <path d="M960,900 C1210,780 1410,620 1600,390 L1600,460 C1420,665 1230,805 1020,900 Z" fill="#426EAE" opacity="0.22"/>
  <path d="M890,900 C1160,770 1380,600 1600,345 L1600,382 C1390,615 1175,780 935,900 Z" fill="#4C9DE6" opacity="0.45"/>
  <!-- Conexiones Vectoriales de Arquitectura -->
  <path d="M800,320 C420,320 260,430 260,520" fill="none" stroke="#426EAE" stroke-width="2.5"/>
  <path d="M800,320 C620,360 580,430 580,520" fill="none" stroke="#FF7A00" stroke-width="2.5"/>
  <path d="M800,320 C980,360 1020,430 1020,520" fill="none" stroke="#0D2540" stroke-width="2.5"/>
  <path d="M800,320 C1180,320 1340,430 1340,520" fill="none" stroke="#4C9DE6" stroke-width="2.5"/>
  <!-- Sello Maestro Positivo sobre Blanco -->
  <image href="{m_logo}" x="690" y="70" width="220" height="220"/>
  <text x="800" y="315" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="800" font-size="26" fill="#0D2540">IMPROBEARS — BUSINESS IMPROVEMENT</text>
  <text x="800" y="340" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="700" font-size="12" fill="#FF7A00" letter-spacing="4">ARQUITECTOS DE SISTEMAS DE PRODUCTIVIDAD</text>
  <!-- 4 Submarcas en Positivo sobre Blanco -->
  <image href="{c_logo}" x="170" y="530" width="180" height="180"/>
  <text x="260" y="735" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="800" font-size="15" fill="#0D2540">IMPROBEARS CONSULTING</text>
  <image href="{i_logo}" x="490" y="530" width="180" height="180"/>
  <text x="580" y="735" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="800" font-size="15" fill="#0D2540">IMPROBEARS INGREDIENTS</text>
  <image href="{s_logo}" x="930" y="530" width="180" height="180"/>
  <text x="1020" y="735" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="800" font-size="15" fill="#0D2540">IMPROBEARS STUDIO</text>
  <image href="{a_logo}" x="1250" y="530" width="180" height="180"/>
  <text x="1340" y="735" text-anchor="middle" font-family="Montserrat, sans-serif" font-weight="800" font-size="15" fill="#0D2540">IMPROBEARS AI</text>
</svg>
"""


def main():
    html_b64 = build_complete_improbears_brandbook_html(embed_base64=True)
    html_web = build_complete_improbears_brandbook_html(embed_base64=False)
    svg_master = build_master_illustrator_svg_sheet(get_improbears_assets(embed_base64=True))

    paths_html_b64 = [
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/03_SISTEMAS_IMPROBEARS/Zoho_ImproBears/Manual_Marca_Arquitectura_ImproBears_30_Laminas.html",
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/entregables_brandbooks/brandbook_00_improbears_arquitectura_maestra.html",
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/2 Marca/General/Manual_Marca_Arquitectura_ImproBears_30_Laminas.html",
    ]
    for p in paths_html_b64:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(html_b64)
        print("Saved standalone HTML:", p, len(html_b64))

    svg_paths = [
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/2 Marca/General/Manual_Marca_Arquitectura_ImproBears_Curvas_Illustrator.svg",
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/assets/improbears/arquitectura-improbears-curvas.svg",
    ]
    for sp in svg_paths:
        os.makedirs(os.path.dirname(sp), exist_ok=True)
        with open(sp, "w", encoding="utf-8") as f:
            f.write(svg_master)
        print("Saved Illustrator SVG:", sp, len(svg_master))

    web_brandbook_path = "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/brandbooks/improbears-arquitectura-maestra.html"
    os.makedirs(os.path.dirname(web_brandbook_path), exist_ok=True)
    with open(web_brandbook_path, "w", encoding="utf-8") as f:
        f.write(html_web)
    print("Saved web HTML:", web_brandbook_path, len(html_web))

    pdf_targets = [
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/03_SISTEMAS_IMPROBEARS/Zoho_ImproBears/Manual_Marca_Arquitectura_ImproBears_30_Laminas.pdf",
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/entregables_brandbooks/brandbook_00_improbears_arquitectura_maestra.pdf",
        "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/2 Marca/General/Manual_Marca_Arquitectura_ImproBears_30_Laminas.pdf",
    ]
    import subprocess, shutil
    chrome_bin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    first_pdf = pdf_targets[0]
    subprocess.run([
        chrome_bin,
        "--headless",
        "--disable-gpu",
        f"--print-to-pdf={first_pdf}",
        "--no-pdf-header-footer",
        f"file://{paths_html_b64[0]}"
    ], check=True)
    for pt in pdf_targets[1:]:
        shutil.copy2(first_pdf, pt)
    for pt in pdf_targets:
        print("Saved PDF:", pt, os.path.getsize(pt))


if __name__ == "__main__":
    main()
