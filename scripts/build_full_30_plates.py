# -*- coding: utf-8 -*-
"""
Ensamblador del motor de 30 láminas Zero-Template en universal-brandbook-30-engine.js
"""

import sys
import os
from plates_00_to_09 import get_plates_00_to_09
from plates_10_to_19 import get_plates_10_to_19
from plates_20_to_29 import get_plates_20_to_29

def main():
    print("Iniciando integración del Motor Zero-Template V71...")
    
    with open("apps/web/universal-brandbook-30-engine.js", "r", encoding="utf-8") as f:
        content = f.read()

    pos_gen = content.find("window.generate30PlatesPdfBlobUltraFast = async function")
    if pos_gen == -1:
        print("ERROR: generate30PlatesPdfBlobUltraFast no encontrada")
        sys.exit(1)

    start_marker = "for (let i = 0; i < 30; i++) {"
    loop_start = content.find(start_marker, pos_gen)
    if loop_start == -1:
        print("ERROR: loop_start no encontrado")
        sys.exit(1)

    loop_end_target = "jpegPages.push({\n        dataUrl: canvas.toDataURL(\"image/jpeg\", 0.88),"
    loop_end = content.find(loop_end_target, loop_start)
    if loop_end == -1:
        print("ERROR: loop_end no encontrado")
        sys.exit(1)

    print(f"Zona de reemplazo identificada: caracteres {loop_start} a {loop_end} ({loop_end - loop_start} bytes)")

    # Construir nuevo bloque de código
    new_loop_code = """// =========================================================================
    // ENRIQUECIMIENTO SEMÁNTICO DE DATOS (PASOS 0 AL 6) — CERO REDUNDANCIAS
    // =========================================================================
    const rawPersona = (cs.brand_persona || `Líder con mente de ingeniero, rigor analítico y calidez de socio leal: escucha primero la necesidad real del cliente, estructura con orden y acompaña hombro a hombro con fuerza serena y visión de largo plazo.`).trim();
    d.persona = window.tbbRefineUserCopyOrthoAndClarity(rawPersona, "persona", bName, industry);

    const tpBeforeRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.before?.length)
      ? window.tpExtractedItems.before
      : (cs.tp_before ? cs.tp_before.split(",").map(s => s.trim()).filter(Boolean) : [
          `Presencia de autoridad y contenidos de valor en redes ejecutivas (${bName})`,
          `Sitio web oficial claro, sin fricciones y orientado a la conversión (www.${assets.cleanSlug}.com)`,
          `Agente conversacional inteligente en WhatsApp 24/7 con atención inmediata`,
          `Diagnóstico inicial ágil, solicitud de propuesta ejecutiva o sesión de alineación`
        ]);
    const tpDuringRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.during?.length)
      ? window.tpExtractedItems.during
      : (cs.tp_during ? cs.tp_during.split(",").map(s => s.trim()).filter(Boolean) : [
          `Proceso de contratación y pago transparente con opciones digitales integradas`,
          `Sesión de alineación estratégica hombro a hombro (in situ o vía videoconferencia)`,
          `Tablero interactivo de seguimiento y presentación ejecutiva de prototipos`,
          `Entrega puntual certificada con acabados y empaquetado de estándar superior`
        ]);
    const tpAfterRaw = (typeof window.tpExtractedItems === "object" && window.tpExtractedItems?.after?.length)
      ? window.tpExtractedItems.after
      : (cs.tp_after ? cs.tp_after.split(",").map(s => s.trim()).filter(Boolean) : [
          `Bóveda digital de cliente con historial completo de activos, entregables y facturas`,
          `Manuales de aplicación, certificados de autenticidad y garantías en lienzo claro`,
          `Encuesta ejecutiva de satisfacción, calibración de impacto y mejora continua`,
          `Acompañamiento post-lanzamiento, evolución continua y revisión estratégica anual`
        ]);

    d.tpBefore = tpBeforeRaw.slice(0, 4).map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, industry));
    d.tpDuring = tpDuringRaw.slice(0, 4).map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, industry));
    d.tpAfter = tpAfterRaw.slice(0, 4).map(t => window.tbbRefineUserCopyOrthoAndClarity(t, "touchpoint", bName, industry));

    while (d.tpBefore.length < 4) d.tpBefore.push(`Punto de contacto de descubrimiento y confianza (${bName})`);
    while (d.tpDuring.length < 4) d.tpDuring.push(`Punto de contacto de contratación y entrega ágil (${bName})`);
    while (d.tpAfter.length < 4) d.tpAfter.push(`Punto de contacto de portal, entregables y lealtad (${bName})`);

    // Helper para tarjeta editorial asimétrica suiza (cero cajas baratas, respiración amplia)
    const drawEditorialBlock = (bx, by, bw, bh, badge, title, bodyText, accentCol) => {
      drawRoundedRect(ctx, bx, by, bw, bh, isRect ? 4 : 14, "#FFFFFF", "#E2E8F0", 1.5);
      ctx.fillStyle = accentCol || pal.pri;
      ctx.fillRect(bx, by, isRect ? 4 : 6, bh);

      ctx.save();
      ctx.beginPath();
      ctx.rect(bx + 14, by + 10, bw - 28, bh - 20);
      ctx.clip();

      ctx.fillStyle = accentCol || pal.pri;
      ctx.font = "800 10.5px Montserrat, sans-serif";
      fillTextFitted(ctx, String(badge || "").toUpperCase(), bx + 22, by + 26, bw - 44);

      ctx.fillStyle = pal.darkInk;
      ctx.font = "800 16px Montserrat, sans-serif";
      const nextY = drawWrappedText(ctx, title, bx + 22, by + 48, bw - 44, 21, 2);

      if (bodyText) {
        ctx.fillStyle = "#334155";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        const availH = (by + bh - 12) - (nextY + 6);
        const maxLines = Math.max(1, Math.floor(availH / 18.5));
        drawWrappedText(ctx, bodyText, bx + 22, nextY + 6, bw - 44, 18.5, maxLines);
      }
      ctx.restore();
    };

    // Helper para citatorio o directriz de autor clásica
    const drawAuthorCallout = (cx, cy, cw, ch, quote, author, role) => {
      drawRoundedRect(ctx, cx, cy, cw, ch, isRect ? 4 : 12, pal.lightBg, pal.softTint, 1.5);
      ctx.fillStyle = pal.sec;
      ctx.fillRect(cx, cy, 5, ch);

      ctx.save();
      ctx.beginPath();
      ctx.rect(cx + 12, cy + 8, cw - 24, ch - 16);
      ctx.clip();

      ctx.fillStyle = pal.darkInk;
      ctx.font = "italic 600 12.5px Plus Jakarta Sans, sans-serif";
      const afterQ = drawWrappedText(ctx, `«${quote}»`, cx + 18, cy + 28, cw - 36, 18, 3);

      ctx.fillStyle = pal.sec;
      ctx.font = "800 10px Montserrat, sans-serif";
      fillTextFitted(ctx, `— ${author.toUpperCase()} · ${role}`, cx + 18, Math.max(cy + ch - 16, afterQ + 14), cw - 36);
      ctx.restore();
    };

    for (let i = 0; i < 30; i++) {
      if (typeof onProgress === "function") onProgress(i + 1, 30);
      drawC00Chrome(i);
      const meta = PLATE_META[i];

      if (i > 0) {
        // TÍTULO EDITORIAL OFICIAL (LÁMINAS 02 A 30)
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, `${meta.sec}  ·  ${dna.archBadge}`, 54, 106, W - 108);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        fillTextFitted(ctx, `${meta.num}. ${meta.title}`, 54, 138, W - 108);
      }
""" + get_plates_00_to_09() + get_plates_10_to_19() + get_plates_20_to_29() + "\n\n      "

    # Ensamblar archivo final
    new_content = content[:loop_start] + new_loop_code + content[loop_end:]
    
    with open("apps/web/universal-brandbook-30-engine.js", "w", encoding="utf-8") as f:
        f.write(new_content)

    print("Archivo apps/web/universal-brandbook-30-engine.js actualizado con éxito.")

if __name__ == "__main__":
    main()
