"""
TheBestBrand — Cloud OpenXML Office Suite Generator (.DOCX Letterhead & .PPTX Executive Deck)
100% Zero-Dependency Pure Python OpenXML (ECMA-376) + ZipFile Engine.
Runs 24/7 in any serverless/cloud container without requiring external C-extensions or MS Office.
Follows Directiva Max C-00 (Pure White Canvas #FFFFFF, Brand Palette, Golden Circle, Touchpoints).
"""

import io
import zipfile
from typing import Dict, Any, List
from xml.sax.saxutils import escape


def _clean_hex(hex_str: str, default: str = "0D2540") -> str:
    h = str(hex_str or "").strip().lstrip("#").upper()
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return h[:6] if len(h) >= 6 else default


class CloudOfficeSuiteGenerator:
    """
    Construye en memoria binarios nativos `.docx` (Word) y `.pptx` (PowerPoint)
    personalizados con los datos estratégicos y cromáticos de la marca.
    """

    @classmethod
    def build_editable_letterhead_docx(cls, brand: Dict[str, Any]) -> bytes:
        b_name = escape(str(brand.get("name") or "The Best Brand"))
        tagline = escape(str(brand.get("tagline") or "IDENTIDAD CORPORATIVA OFICIAL"))
        giro = escape(str(brand.get("giro") or "Soluciones estratégicas y excelencia operativa."))
        why = escape(str(brand.get("why") or "Propósito centrado en crear valor real y duradero."))
        how = escape(str(brand.get("how") or "Metodología estructurada con estándares internacionales."))
        what = escape(str(brand.get("what") or "Productos y servicios con garantía de calidad."))
        persona = escape(str(brand.get("persona") or "Líder confiable, cercano y resolutivo."))
        pri_hex = _clean_hex((brand.get("colors") or {}).get("pri"), "0D2540")
        sec_hex = _clean_hex((brand.get("colors") or {}).get("sec"), "426EAE")
        acc_hex = _clean_hex((brand.get("colors") or {}).get("acc"), "FF7A00")
        pri_font = escape(str(brand.get("primaryFont") or "Montserrat"))

        content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>"""

        rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

        document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <!-- CABECERA MEMBRETADA EN LIENZO CLARO (#FFFFFF) -->
    <w:p>
      <w:pPr>
        <w:pBdr>
          <w:bottom w:val="single" w:sz="18" w:space="6" w:color="{acc_hex}"/>
        </w:pBdr>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="{pri_font}" w:hAnsi="{pri_font}"/>
          <w:b/>
          <w:color w:val="{pri_hex}"/>
          <w:sz w:val="36"/>
        </w:rPr>
        <w:t>{b_name.upper()}</w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="{pri_font}" w:hAnsi="{pri_font}"/>
          <w:b/>
          <w:color w:val="{acc_hex}"/>
          <w:sz w:val="18"/>
        </w:rPr>
        <w:t>   ·   {tagline.upper()}</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:r>
        <w:rPr><w:color w:val="707070"/><w:sz w:val="18"/></w:rPr>
        <w:t>Hoja Membretada Ejecutiva Oficial · Directiva C-00 · Tipografía Primaria: {pri_font} · Paleta: #{pri_hex} / #{sec_hex} / #{acc_hex}</w:t>
      </w:r>
    </w:p>

    <w:p/>

    <!-- CARTA / PROPUESTA EJECUTIVA EDITABLE -->
    <w:p>
      <w:r>
        <w:rPr><w:b/><w:color w:val="{pri_hex}"/><w:sz w:val="24"/></w:rPr>
        <w:t>COMUNICADO EJECUTIVO &amp; PROPUESTA DE VALOR — {b_name}</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:r>
        <w:rPr><w:color w:val="333333"/><w:sz w:val="22"/></w:rPr>
        <w:t>Estimado cliente / aliado estratégico:</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:r>
        <w:rPr><w:color w:val="333333"/><w:sz w:val="21"/></w:rPr>
        <w:t>{giro}</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:r>
        <w:rPr><w:b/><w:color w:val="{acc_hex}"/><w:sz w:val="21"/></w:rPr>
        <w:t>1. Nuestro Propósito (WHY): </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:color w:val="333333"/><w:sz w:val="21"/></w:rPr>
        <w:t>{why}</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:r>
        <w:rPr><w:b/><w:color w:val="{sec_hex}"/><w:sz w:val="21"/></w:rPr>
        <w:t>2. Nuestra Metodología (HOW): </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:color w:val="333333"/><w:sz w:val="21"/></w:rPr>
        <w:t>{how}</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:r>
        <w:rPr><w:b/><w:color w:val="{pri_hex}"/><w:sz w:val="21"/></w:rPr>
        <w:t>3. Oferta de Valor (WHAT): </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:color w:val="333333"/><w:sz w:val="21"/></w:rPr>
        <w:t>{what}</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:r>
        <w:rPr><w:b/><w:color w:val="{pri_hex}"/><w:sz w:val="21"/></w:rPr>
        <w:t>4. La Empresa como Persona (Voz &amp; Trato): </w:t>
      </w:r>
      <w:r>
        <w:rPr><w:color w:val="333333"/><w:sz w:val="21"/></w:rPr>
        <w:t>{persona}</w:t>
      </w:r>
    </w:p>

    <w:p/>

    <!-- FIRMA DE CORREO Y PIE INSTITUCIONAL -->
    <w:p>
      <w:pPr>
        <w:pBdr>
          <w:top w:val="single" w:sz="12" w:space="6" w:color="{sec_hex}"/>
        </w:pBdr>
      </w:pPr>
      <w:r>
        <w:rPr><w:b/><w:color w:val="{pri_hex}"/><w:sz w:val="20"/></w:rPr>
        <w:t>Dirección General · {b_name}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:color w:val="707070"/><w:sz w:val="18"/></w:rPr>
        <w:t>{tagline} · Documento 100% Editable generado por TheBestBrand Cloud Office Engine</w:t>
      </w:r>
    </w:p>

    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>"""

        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("[Content_Types].xml", content_types)
            zf.writestr("_rels/.rels", rels)
            zf.writestr("word/document.xml", document_xml)
        return buf.getvalue()

    @classmethod
    def _build_pptx_slide_xml(cls, title: str, subtitle: str, bullets: List[str], pri_hex: str, acc_hex: str, pri_font: str) -> str:
        t_esc = escape(title)
        sub_esc = escape(subtitle)
        bullet_paras = []
        for b in bullets[:5]:
            b_esc = escape(str(b))
            bullet_paras.append(f"""
            <a:p>
              <a:pPr marL="228600" indent="-228600"><a:buChar char="•"/></a:pPr>
              <a:r>
                <a:rPr lang="es-MX" sz="1800" dirty="0">
                  <a:solidFill><a:srgbClr val="333333"/></a:solidFill>
                  <a:latin typeface="Plus Jakarta Sans"/>
                </a:rPr>
                <a:t>{b_esc}</a:t>
              </a:r>
            </a:p>""")
        bullets_xml = "\n".join(bullet_paras)

        return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
       xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill>
        <a:effectLst/>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm>
      </p:grpSpPr>
      <!-- TÍTULO Y SUBTÍTULO -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="2" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="457200"/><a:ext cx="10820400" cy="1371600"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        </p:spPr>
        <p:txBody>
          <a:bodyPr/>
          <a:lstStyle/>
          <a:p>
            <a:r>
              <a:rPr lang="es-MX" sz="1200" b="1" dirty="0">
                <a:solidFill><a:srgbClr val="{acc_hex}"/></a:solidFill>
                <a:latin typeface="{pri_font}"/>
              </a:rPr>
              <a:t>{sub_esc}</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr lang="es-MX" sz="3200" b="1" dirty="0">
                <a:solidFill><a:srgbClr val="{pri_hex}"/></a:solidFill>
                <a:latin typeface="{pri_font}"/>
              </a:rPr>
              <a:t>{t_esc}</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
      <!-- CUERPO DE PUNTOS ESTRATÉGICOS -->
      <p:sp>
        <p:nvSpPr><p:cNvPr id="3" name="Content"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="685800" y="2057400"/><a:ext cx="10820400" cy="4343400"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        </p:spPr>
        <p:txBody>
          <a:bodyPr/>
          <a:lstStyle/>
          {bullets_xml}
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>"""

    @classmethod
    def build_executive_deck_pptx(cls, brand: Dict[str, Any]) -> bytes:
        b_name = str(brand.get("name") or "The Best Brand")
        tagline = str(brand.get("tagline") or "BRAND IDENTITY ATELIER")
        giro = str(brand.get("giro") or "Soluciones estratégicas de alto valor.")
        buyer = str(brand.get("buyer") or "Directores y clientes que buscan excelencia.")
        why = str(brand.get("why") or "Propósito nuclear auténtico.")
        how = str(brand.get("how") or "Metodología propietaria de precisión.")
        what = str(brand.get("what") or "Productos y servicios certificados.")
        persona = str(brand.get("persona") or "Especialista cercano, claro y resolutivo.")
        pri_hex = _clean_hex((brand.get("colors") or {}).get("pri"), "0D2540")
        sec_hex = _clean_hex((brand.get("colors") or {}).get("sec"), "426EAE")
        acc_hex = _clean_hex((brand.get("colors") or {}).get("acc"), "FF7A00")
        pri_font = escape(str(brand.get("primaryFont") or "Montserrat"))

        tp_b = brand.get("tpBefore") or ["Descubrimiento digital claro", "Diagnóstico ágil"]
        tp_d = brand.get("tpDuring") or ["Atención de excelencia", "Entrega puntual"]
        tp_a = brand.get("tpAfter") or ["Soporte continuo", "Fidelización"]

        slides_data = [
            (
                f"{b_name.upper()}",
                f"MANUAL EJECUTIVO DE IDENTIDAD · {tagline.upper()}",
                [
                    f"Giro y Esencia (Paso 0): {giro}",
                    f"Buyer Persona: {buyer}",
                    f"Lienzo Claro (#FFFFFF) · Paleta Oficial: #{pri_hex} / #{sec_hex} / #{acc_hex}",
                    f"Tipografía Oficial Primaria: {pri_font}"
                ]
            ),
            (
                "ADN DE MARCA & CÍRCULO DORADO",
                "PASO 1 · PROPÓSITO, METODOLOGÍA Y LA EMPRESA COMO PERSONA",
                [
                    f"WHY (Propósito): {why}",
                    f"HOW (Metodología): {how}",
                    f"WHAT (Oferta de Valor): {what}",
                    f"La Empresa como Persona: {persona}"
                ]
            ),
            (
                "INGENIERÍA DE TOUCHPOINTS",
                "PASO 2 · ANTES, DURANTE Y DESPUÉS DE LA COMPRA",
                [
                    f"ANTES: {' · '.join(str(x) for x in tp_b[:3])}",
                    f"DURANTE: {' · '.join(str(x) for x in tp_d[:3])}",
                    f"DESPUÉS: {' · '.join(str(x) for x in tp_a[:3])}"
                ]
            ),
            (
                "SISTEMA VISUAL & GOBERNANZA C-00",
                "PASOS 4, 5 Y 6 · LOGOTIPOS EN CURVAS, COLOR Y APLICACIONES",
                [
                    f"Terna Oficial en Curvas: Logotipo Horizontal (3.5:1), Avatar Social (1:1) y Sello Circular.",
                    f"Paleta Certificada WCAG AAA: Primario #{pri_hex} · Secundario #{sec_hex} · Acento #{acc_hex}.",
                    "Regla 70/20/10 sobre Lienzo Blanco Puro (#FFFFFF) y versión en negativo calado para fondos oscuros.",
                    "Presentación 100% Editable generada en la nube por TheBestBrand Studio."
                ]
            )
        ]

        content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide2.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide3.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide4.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
</Types>"""

        root_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>"""

        pres_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide3.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide4.xml"/>
</Relationships>"""

        presentation_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
                xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
                xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldIdLst>
    <p:sldId id="256" r:id="rId1"/>
    <p:sldId id="257" r:id="rId2"/>
    <p:sldId id="258" r:id="rId3"/>
    <p:sldId id="259" r:id="rId4"/>
  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>"""

        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("[Content_Types].xml", content_types)
            zf.writestr("_rels/.rels", root_rels)
            zf.writestr("ppt/presentation.xml", presentation_xml)
            zf.writestr("ppt/_rels/presentation.xml.rels", pres_rels)
            for idx, (stitle, ssub, sbullets) in enumerate(slides_data, start=1):
                sxml = cls._build_pptx_slide_xml(stitle, ssub, sbullets, pri_hex, acc_hex, pri_font)
                zf.writestr(f"ppt/slides/slide{idx}.xml", sxml)
        return buf.getvalue()


    @classmethod
    def build_email_signature_html(cls, brand: Dict[str, Any]) -> str:
        """[#0303] Genera una firma de correo HTML ejecutiva lista para Gmail / Zoho Mail / Outlook bajo norma C-00."""
        b_name = escape(str(brand.get("name") or "The Best Brand"))
        tagline = escape(str(brand.get("tagline") or "DIRECCIÓN GENERAL"))
        giro = escape(str(brand.get("giro") or "Excelencia y Soluciones Estratégicas"))
        pri_hex = _clean_hex((brand.get("colors") or {}).get("pri"), "0D2540")
        sec_hex = _clean_hex((brand.get("colors") or {}).get("sec"), "426EAE")
        acc_hex = _clean_hex((brand.get("colors") or {}).get("acc"), "FF7A00")
        pri_font = escape(str(brand.get("primaryFont") or "Montserrat"))

        return f"""<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Firma Ejecutiva - {b_name}</title></head>
<body style="margin:0;padding:16px;background:#FFFFFF;font-family:'{pri_font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF;border-collapse:collapse;max-width:560px;">
    <tr>
      <td style="border-left:4px solid #{acc_hex};padding-left:16px;">
        <div style="font-size:18px;font-weight:800;color:#{pri_hex};letter-spacing:0.5px;text-transform:uppercase;">{b_name}</div>
        <div style="font-size:11px;font-weight:700;color:#{acc_hex};letter-spacing:1.2px;text-transform:uppercase;margin-top:2px;">{tagline}</div>
        <div style="font-size:12px;color:#333333;margin-top:8px;line-height:1.4;">{giro}</div>
        <div style="font-size:11px;color:#707070;margin-top:8px;">
          <span style="color:#{sec_hex};font-weight:700;">●</span> Identidad Oficial Certificada C-00 · Paleta #{pri_hex} / #{sec_hex} / #{acc_hex}
        </div>
      </td>
    </tr>
  </table>
</body>
</html>"""

    @classmethod
    def build_editable_quote_xlsx(cls, brand: Dict[str, Any]) -> bytes:
        """[#0303] Genera un libro nativo Excel (.xlsx OpenXML ECMA-376) de Cotización Ejecutiva 100% en la nube."""
        b_name = escape(str(brand.get("name") or "The Best Brand"))
        tagline = escape(str(brand.get("tagline") or "COTIZACIÓN COMERCIAL EJECUTIVA"))
        what = escape(str(brand.get("what") or "Servicio Integral Profesional"))

        content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>"""

        root_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

        wb_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>"""

        workbook_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Cotizacion_Oficial" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>"""

        sheet1_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    <row r="1">
      <c r="A1" t="inlineStr"><is><t>{b_name.upper()} — {tagline}</t></is></c>
    </row>
    <row r="2">
      <c r="A2" t="inlineStr"><is><t>Concepto / Entregable</t></is></c>
      <c r="B2" t="inlineStr"><is><t>Cantidad</t></is></c>
      <c r="C2" t="inlineStr"><is><t>Precio Unitario (MXN)</t></is></c>
      <c r="D2" t="inlineStr"><is><t>Subtotal (MXN)</t></is></c>
    </row>
    <row r="3">
      <c r="A3" t="inlineStr"><is><t>{what}</t></is></c>
      <c r="B3"><v>1</v></c>
      <c r="C3"><v>15000</v></c>
      <c r="D3"><f>B3*C3</f><v>15000</v></c>
    </row>
    <row r="4">
      <c r="A4" t="inlineStr"><is><t>Acompañamiento Estratégico y Garantía de Calidad</t></is></c>
      <c r="B4"><v>1</v></c>
      <c r="C4"><v>5000</v></c>
      <c r="D4"><f>B4*C4</f><v>5000</v></c>
    </row>
    <row r="5">
      <c r="C5" t="inlineStr"><is><t>TOTAL NETO</t></is></c>
      <c r="D5"><f>SUM(D3:D4)</f><v>20000</v></c>
    </row>
  </sheetData>
</worksheet>"""

        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("[Content_Types].xml", content_types)
            zf.writestr("_rels/.rels", root_rels)
            zf.writestr("xl/workbook.xml", workbook_xml)
            zf.writestr("xl/_rels/workbook.xml.rels", wb_rels)
            zf.writestr("xl/worksheets/sheet1.xml", sheet1_xml)
        return buf.getvalue()
