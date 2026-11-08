# -*- coding: utf-8 -*-
"""
Láminas 00 a 09: Del Propósito Nuclear al Descubrimiento de Marca
"""

def get_plates_00_to_09():
    return """
      if (i === 0) {
        // LÁMINA 01: PORTADA MAESTRA ADAPTATIVA (MONUMENTAL ATELIER · CERO SUBMARCAS FORZADAS EN MARCA ÚNICA)
        ctx.fillStyle = pal.sec;
        ctx.font = "800 12.5px Montserrat, sans-serif";
        fillTextFitted(ctx, `MANUAL OFICIAL DE IDENTIDAD · ${dna.archBadge} · ${dna.strokeBadge}`, 72, 316, 670);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 58px Montserrat, sans-serif";
        fillTextFitted(ctx, bUpper, 72, 386, 670);

        ctx.fillStyle = pal.pri;
        ctx.font = "800 18px Montserrat, sans-serif";
        fillTextFitted(ctx, tagline.toUpperCase(), 72, 424, 670);

        ctx.fillStyle = pal.pri;
        ctx.fillRect(72, 442, 130, 5);
        ctx.fillStyle = pal.sec;
        if (isRect) {
          ctx.fillRect(212, 440, 9, 9);
        } else {
          ctx.beginPath();
          ctx.arc(218, 444.5, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 19.5px Plus Jakarta Sans, sans-serif";
        const afterGiroY = drawWrappedText(ctx, industry, 72, 480, 668, 26, 2);

        ctx.fillStyle = "#475569";
        ctx.font = "500 13.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(
          ctx,
          `Constitución oficial de marca con Círculo Dorado (Why·How·What), La Empresa como Persona, Ingeniería de Touchpoints en 3 Momentos y Sistema Visual en ${dna.strokeLabel.toLowerCase()} (${pal.pri} y ${pal.sec}) para ${bName}.`,
          72,
          Math.max(540, afterGiroY + 10),
          668,
          20,
          3
        );

        if (dna.archMode === "multibrand") {
          const subs = assets.subBrands.map(s => s.suffix);
          subs.forEach((s, idx) => {
            const sx = 72 + idx * 168;
            drawRoundedRect(ctx, sx, 632, 154, 152, isRect ? 4 : 16, "#F8FAFC", "#E2E8F0", 1.5);
            ctx.save();
            ctx.beginPath();
            ctx.rect(sx + 6, 638, 142, 140);
            ctx.clip();
            drawLogoOrEmblem(sx + 41, 648, 72, false, s, 136);
            ctx.restore();
          });
        } else {
          // Marca Única Monolítica: Ficha Estratégica en 3 Columnas
          const cardX = 72, cardY = 626, cardW = 668, cardH = 168;
          drawRoundedRect(ctx, cardX, cardY, cardW, cardH, isRect ? 4 : 16, "#F8FAFC", "#CBD5E1", 1.5);
          ctx.fillStyle = pal.sec;
          ctx.fillRect(cardX, cardY, cardW, 5);

          const pillarsCover = [
            { badge: "01 · PROPÓSITO NUCLEAR", title: "Por qué existimos", body: d.whyText, col: pal.sec },
            { badge: "02 · OFERTA DE VALOR", title: "Qué entregamos", body: d.valueOffer, col: pal.pri },
            { badge: "03 · IDENTIDAD MONOLÍTICA", title: `100% ${bName}`, body: `Concentración total del prestigio en un solo nombre oficial. Cero división de capital en submarcas.`, col: pal.darkInk }
          ];
          const colW = Math.floor((cardW - 36) / 3);
          pillarsCover.forEach((pCol, pIdx) => {
            const px = cardX + 14 + pIdx * (colW + 6);
            if (pIdx > 0) {
              ctx.strokeStyle = "#E2E8F0";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(px - 4, cardY + 18);
              ctx.lineTo(px - 4, cardY + cardH - 14);
              ctx.stroke();
            }
            ctx.save();
            ctx.beginPath();
            ctx.rect(px, cardY + 12, colW - 6, cardH - 22);
            ctx.clip();
            ctx.fillStyle = pCol.col;
            ctx.font = "800 9.5px Montserrat, sans-serif";
            fillTextFitted(ctx, pCol.badge, px + 4, cardY + 28, colW - 12);
            ctx.fillStyle = pal.darkInk;
            ctx.font = "800 13px Montserrat, sans-serif";
            fillTextFitted(ctx, pCol.title, px + 4, cardY + 48, colW - 12);
            ctx.fillStyle = "#334155";
            ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, pCol.body, px + 4, cardY + 68, colW - 12, 16, 5);
            ctx.restore();
          });
        }

        // Emblema Monumental Derecho en Lienzo Limpio con Órbitas Áureas
        const boxX = 790, boxY = 220, boxW = 546, boxH = 574;
        const cx = boxX + boxW / 2;
        drawRoundedRect(ctx, boxX, boxY, boxW, boxH, isRect ? 4 : 24, "#FFFFFF", "#CBD5E1", 2);

        ctx.save();
        ctx.beginPath();
        ctx.rect(boxX + 4, boxY + 4, boxW - 8, boxH - 8);
        ctx.clip();

        // Órbitas matemáticas sutiles en fondo
        ctx.strokeStyle = pal.softTint;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, boxY + 225, 195, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, boxY + 225, 140, 0, Math.PI * 2);
        ctx.stroke();

        drawLogoOrEmblem(cx - 140, boxY + 65, 280, false);

        // Ficha inferior de certificación de portada
        const footerBoxY = boxY + 458;
        drawRoundedRect(ctx, boxX + 26, footerBoxY, boxW - 52, 92, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.5);
        ctx.textAlign = "center";
        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 12px Montserrat, sans-serif";
        fillTextFitted(ctx, `${dna.archBadge}  •  ${dna.strokeBadge}`, cx, footerBoxY + 34, boxW - 80);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 11.5px Plus Jakarta Sans, sans-serif";
        fillTextFitted(ctx, `Versión Positiva Principal sobre Lienzo Claro (#FFFFFF) · ${pal.pri} & ${pal.sec}`, cx, footerBoxY + 62, boxW - 80);
        ctx.textAlign = "left";
        ctx.restore();

      } else if (i === 1) {
        // LÁMINA 02: MAPA METODOLÓGICO DE 30 LÁMINAS (PASOS 0 AL 6)
        // Columna Izquierda: Arquitectura del Manual + Pipeline Vectorial Continuo
        drawEditorialBlock(54, 160, 480, 240, "ARQUITECTURA DEL MANUAL", `Del Caos al Sistema de ${dna.strokeLabel}`, `Este manual se adapta a la identidad real de ${bName} (${dna.archTitle}). Ordena primero el problema raíz (Paso 0), el propósito nuclear y la personificación (Paso 1) y los puntos de contacto reales (Paso 2) antes de definir el nombre (Paso 3) y la geometría oficial del logotipo (${pal.pri} y ${pal.sec}).`, pal.pri);

        // Pipeline Vectorial Continuo P0 a P6
        drawRoundedRect(ctx, 54, 420, 480, 465, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
        ctx.save();
        ctx.beginPath();
        ctx.rect(58, 424, 472, 457);
        ctx.clip();

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 13px Montserrat, sans-serif";
        fillTextFitted(ctx, "TRAYECTORIA METODOLÓGICA (PASOS 0 AL 6)", 76, 452, 436);

        const flowSteps = [
          { p: "P0", name: "Giro & Problema", sub: "Diagnóstico comercial y buyer persona", y: 495, c: pal.darkInk },
          { p: "P1", name: "ADN & Persona", sub: "Círculo Dorado y arquetipos humanos", y: 560, c: pal.pri },
          { p: "P2", name: "Touchpoints", sub: "Experiencia Antes · Durante · Después", y: 625, c: pal.sec },
          { p: "P3", name: "Naming & Niza", sub: "Semiótica, Test SMILE y registro", y: 690, c: pal.pri },
          { p: "P4", name: "Arquitectura", sub: dna.archMode === "multibrand" ? "Marca Madre + Submarcas" : "Marca Única Monolítica", y: 755, c: pal.darkInk },
          { p: "P5-6", name: "Color & Gobernanza", sub: "Paleta 8 tonos, tipografía y sellos", y: 820, c: pal.sec }
        ];

        // Eje vertical conector
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(96, 495);
        ctx.lineTo(96, 820);
        ctx.stroke();

        flowSteps.forEach((st) => {
          ctx.fillStyle = st.c;
          ctx.beginPath();
          ctx.arc(96, st.y, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "800 9px Montserrat, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(st.p, 96, st.y + 3);
          ctx.textAlign = "left";

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 13px Montserrat, sans-serif";
          fillTextFitted(ctx, st.name, 126, st.y - 2, 380);

          ctx.fillStyle = "#64748B";
          ctx.font = "500 11px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, st.sub, 126, st.y + 14, 380);
        });
        ctx.restore();

        // Columna Derecha: 6 Bloques del Índice Oficial de 30 Láminas
        const secs = [
          ["SECCIÓN 01 · LÁMINAS 01–03", "Introducción, Giro y Problema", "01. Portada Maestra · 02. Mapa Metodológico · 03. Manifiesto: Del Caos al Sistema y Buyer Persona."],
          ["SECCIÓN 02 · LÁMINAS 04–08", "ADN y La Empresa como Persona", "04. Círculo Dorado (Why·How·What) · 05. Promesa, Misión, Visión · 06. 6 Principios · 07. La Empresa como Persona · 08. Tono de Voz."],
          ["SECCIÓN 03 · LÁMINAS 09–12", "Ingeniería de Touchpoints", "09. Mapa Integral del Viaje · 10. Antes de Comprar · 11. Durante la Compra · 12. Después de Comprar."],
          ["SECCIÓN 04–05 · LÁMINAS 13–22", "Nombre, Arquitectura y Logotipos", `13. Naming y Niza · 14. ${dna.archTitle} · 15. Anatomía Semiótica · 16–19. Los 4 Pilares · 20. Retícula 8X · 21. Aislamiento · 22. 6 Prohibiciones.`],
          ["SECCIÓN 06 · LÁMINAS 23–26", "Color, Trazo, Tipografía y Sellos", `23. Paleta Cromática (8 Tonos) · 24. Proporción 70/20/10 y Trazo · 25. Tipografía Oficial · 26. Los 6 Sellos Metodológicos.`],
          ["SECCIÓN 07 · LÁMINAS 27–30", "Aplicaciones y Gobernanza Oficial", "27. Norma Oficial de Co-Branding · 28. Papelería y Tarjetas · 29. Ecosistema Digital · 30. Colofón y Certificado Institucional."]
        ];
        secs.forEach((sItem, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const bx = 560 + col * 400;
          const by = 160 + row * 242;
          drawEditorialBlock(bx, by, 384, 226, sItem[0], sItem[1], sItem[2], idx % 2 === 0 ? pal.pri : pal.sec);
        });

      } else if (i === 2) {
        // LÁMINA 03: PASO 0 — MANIFIESTO: DEL CAOS AL SISTEMA & BUYER PERSONA
        drawEditorialBlock(54, 160, 630, 310, "EL PROBLEMA QUE RESOLVEMOS · DEL CAOS AL SISTEMA", `Transformamos la incertidumbre en certidumbre operativa en ${sectorShort}`, `${bName} nace para erradicar la improvisación y la falta de estandarización en ${industry}. Muchas empresas operan con procesos dispersos y comunicación incoherente que agota al equipo y confunde al comprador. Nuestra solución unifica estrategia, lenguaje y entrega bajo un solo estándar medible y confiable.`, pal.sec);

        drawEditorialBlock(710, 160, 636, 310, "EL ACTOR COMPRADOR (BUYER PERSONA)", d.idealCustomer, `Perfil del comprador ideal: Organizaciones y líderes que valoran la honestidad profesional, la precisión técnica y el acompañamiento leal. Buscan un socio que escuche primero y resuelva con método, sin perder tiempo ni generar fricción. Rol social de nuestra marca: ${d.socialRole}`, pal.pri);

        // Comparativa Asimétrica de 3 Escenas en el Mundo Real
        const scenes = [
          ["01 · EL CAOS PREVIO", "Operación Fragmentada y Fricción", "Criterios dispersos, mensajes contradictorios y desgaste en cada punto de contacto comercial.", "#64748B"],
          ["02 · LA INTERVENCIÓN " + bUpper, "Identidad y Estandarización Oficial", `Implantación del sistema de ${bName}: procesos alineados, imagen ejecutiva y certidumbre.`, pal.pri],
          ["03 · EL RESULTADO MEDIBLE", "Claridad, Confianza y Crecimiento", `Operación sólida bajo ${dna.archTitle}, lealtad del cliente y escalabilidad sostenible.`, pal.sec]
        ];
        scenes.forEach((sc, idx) => {
          const sx = 54 + idx * 440;
          drawRoundedRect(ctx, sx, 496, 412, 395, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
          ctx.fillStyle = sc[3];
          ctx.fillRect(sx, 496, 412, 7);

          ctx.save();
          ctx.beginPath();
          ctx.rect(sx + 10, 506, 392, 375);
          ctx.clip();

          ctx.fillStyle = sc[3];
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, sc[0], sx + 22, 532, 368);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          drawWrappedText(ctx, sc[1], sx + 22, 558, 368, 21, 2);

          ctx.fillStyle = "#334155";
          ctx.font = "500 13px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sc[2], sx + 22, 616, 368, 20, 5);

          // Vector conceptual de escena
          drawRoundedRect(ctx, sx + 22, 735, 368, 120, isRect ? 4 : 12, "#FFFFFF", "#E2E8F0", 1.5);
          ctx.fillStyle = sc[3];
          ctx.beginPath();
          ctx.arc(sx + 56, 795, 20, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "800 12px Montserrat, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`0${idx + 1}`, sx + 56, 799);
          ctx.textAlign = "left";

          ctx.fillStyle = pal.darkInk;
          ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, idx === 0 ? "Diagnóstico profundo en Paso 0" : idx === 1 ? "Alineación integral con Aura" : "Liderazgo sólido y respetado", sx + 88, 798, 280);
          ctx.restore();
        });

      } else if (i === 3) {
        // LÁMINA 04: EL CÍRCULO DORADO (WHY · HOW · WHAT) — SIMON SINEK
        // Izquierda: 3 Círculos Concéntricos Puros con Vectores Matemáticos
        const cx = 335, cy = 528;
        // Anillo 3: WHAT (Oferta Externa)
        ctx.beginPath();
        ctx.arc(cx, cy, 244, 0, Math.PI * 2);
        ctx.fillStyle = "#F8FAFC";
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#CBD5E1";
        ctx.stroke();

        // Anillo 2: HOW (Método y Diferencial)
        ctx.beginPath();
        ctx.arc(cx, cy, 168, 0, Math.PI * 2);
        ctx.fillStyle = pal.lightBg;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = pal.pri;
        ctx.stroke();

        // Anillo 1: WHY (Propósito Nuclear)
        ctx.beginPath();
        ctx.arc(cx, cy, 92, 0, Math.PI * 2);
        ctx.fillStyle = pal.darkInk;
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = pal.sec;
        ctx.stroke();

        // Rótulos centrales concéntricos
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 16px Montserrat, sans-serif";
        ctx.fillText("01. WHY", cx, cy - 8);
        ctx.font = "700 10px Plus Jakarta Sans, sans-serif";
        ctx.fillText("PROPÓSITO", cx, cy + 10);

        ctx.fillStyle = pal.pri;
        ctx.font = "800 12.5px Montserrat, sans-serif";
        ctx.fillText("02. HOW · EL MÉTODO Y DIFERENCIAL", cx, cy - 132);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 12.5px Montserrat, sans-serif";
        ctx.fillText("03. WHAT · LA OFERTA AL MERCADO", cx, cy - 208);
        ctx.textAlign = "left";

        // Derecha: 3 Bloques Editoriales Ricos y Profundos
        drawEditorialBlock(650, 165, 696, 226, "01 · WHY (EL PROPÓSITO CENTRAL · LA CREENCIA)", "Por qué existe " + bName + " más allá de vender", d.whyText, pal.sec);
        drawEditorialBlock(650, 412, 696, 226, "02 · HOW (EL MÉTODO Y DIFERENCIAL REAL)", "Cómo lo hacemos realidad cada día con rigor", d.howText + ". " + d.socialRole, pal.pri);
        drawEditorialBlock(650, 660, 696, 226, "03 · WHAT (LA OFERTA CONCRETA DE VALOR)", "Qué entregamos al mercado con maestría técnica", d.whatText + ` Diseñado y operado bajo el estándar de calidad de ${bName}.`, pal.darkInk);

      } else if (i === 4) {
        // LÁMINA 05: PROMESA, MISIÓN, VISIÓN Y LAS 6 MÁXIMAS DE FILOSOFÍA (DONALD MILLER)
        // Columna Izquierda: Promesa, Misión y Visión
        drawEditorialBlock(54, 160, 580, 226, "LA GRAN PROMESA DE MARCA (STORYBRAND)", `La transformación del cliente al elegir ${bName}`, `Prometemos a cada cliente que encontrará en ${bName} un socio de máxima fiabilidad técnica y calidez humana. Sustituimos la incertidumbre por claridad ejecutiva, entregando soluciones de alto impacto que protegen su inversión y multiplican su valor.`, pal.sec);

        drawEditorialBlock(54, 404, 580, 226, "MISIÓN OPERATIVA", `Qué hacemos cada día con maestría`, `Diseñar, estructurar y operar soluciones integrales en ${industry} mediante procesos rigurosos, tecnología de punta y acompañamiento cercano que libera tiempo mental a nuestros clientes.`, pal.pri);

        drawEditorialBlock(54, 648, 580, 238, "VISIÓN DE LARGO PLAZO", `Hacia dónde construimos para la próxima década`, `Ser reconocidos como el referente indiscutible de excelencia, ética y consistencia en ${sectorShort}, demostrando que el orden, la belleza funcional y la lealtad con el cliente son las mayores ventajas competitivas sostenibles.`, pal.darkInk);

        // Columna Derecha: Las 6 Máximas de Filosofía
        drawRoundedRect(ctx, 660, 160, 686, 726, isRect ? 4 : 20, "#F8FAFC", pal.softTint, 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(660, 160, 686, 8);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "FILOSOFÍA INSTITUCIONAL INNEGOCIABLE", 692, 196, 620);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 22px Montserrat, sans-serif";
        fillTextFitted(ctx, `Las 6 Máximas de Filosofía de ${bName}`, 692, 226, 620);

        const maximas = [
          ["01", "Claridad Radical sobre Artificios", "Si no aporta claridad al cliente, se elimina. La simplicidad funcional es nuestra mayor muestra de respeto."],
          ["02", "Mente de Ingeniero, Trato de Socio", "Combinamos la exactitud matemática con la empatía de quien camina hombro con hombro."],
          ["03", "Cero Tolerancia a la Improvisación", "Cada proceso, entregable y documento cuenta con una razón técnica y estética inmutable."],
          ["04", "El Cliente es el Héroe; Nosotros el Guía", "Nuestra autoridad se demuestra en el éxito de nuestros clientes, no en la ostentación propia."],
          ["05", "Valor Medible y Sostenible", "Toda intervención debe justificarse en reducción de fricción, certidumbre y rentabilidad duradera."],
          ["06", "Coherencia de la Idea a la Entrega", "Lo que prometemos en el primer contacto es exactamente lo que recibe en sus manos."]
        ];

        maximas.forEach((m, mIdx) => {
          const my = 260 + mIdx * 98;
          drawRoundedRect(ctx, 692, my, 622, 84, isRect ? 3 : 12, "#FFFFFF", "#E2E8F0", 1.2);
          ctx.fillStyle = mIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(692, my, 5, 84);

          ctx.fillStyle = mIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "900 16px Montserrat, sans-serif";
          ctx.fillText(m[0], 712, my + 34);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 14px Montserrat, sans-serif";
          fillTextFitted(ctx, m[1], 752, my + 30, 540);

          ctx.fillStyle = "#475569";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, m[2], 752, my + 48, 540, 16, 2);
        });

      } else if (i === 5) {
        // LÁMINA 06: LOS 6 PRINCIPIOS RECTORES Y CÓDIGO DE RELACIÓN CON CLIENTES
        // Columna Izquierda: Los 6 Principios Rectores
        const prX = 54, prW = 630;
        drawEditorialBlock(prX, 160, prW, 726, "CÓDIGO OPERATIVO INTERNO", "Los 6 Principios que Guían Cada Decisión", "", pal.pri);

        const principles = [
          ["PRINCIPIO 01 · VERDAD TÉCNICA", "Honestidad de Diagnóstico", "Nunca inflamos problemas para vender soluciones complejas. Decimos la verdad técnica con datos objetivos."],
          ["PRINCIPIO 02 · RESPETO AL TIEMPO", "Eficiencia y Cero Fricción", "El tiempo mental de nuestro cliente es sagrado. Diseñamos sistemas que resuelven en minutos lo que otros tardan semanas."],
          ["PRINCIPIO 03 · RIGOR EN EL DETALLE", "Obsesión por la Calidad", "Cuidamos cada milímetro, cada píxel y cada palabra con el estándar de un taller artesanal de alta precisión."],
          ["PRINCIPIO 04 · TRANSPARENCIA", "Cuentas y Términos Claros", "Sin letras pequeñas, costos ocultos ni ambigüedades contractuales. Operamos con luz total desde el primer momento."],
          ["PRINCIPIO 05 · ACOMPAÑAMIENTO", "Presencia Real y Accesible", "No desaparecemos tras la venta. Mantenemos canales abiertos y respuesta humana ante cualquier contingencia."],
          ["PRINCIPIO 06 · MEJORA CONTINUA", "Evolución sin Descanso", "Auditamos nuestros propios sistemas periódicamente para incorporar innovaciones que beneficien al usuario."]
        ];

        principles.forEach((pr, pIdx) => {
          const py = 240 + pIdx * 104;
          drawRoundedRect(ctx, prX + 20, py, prW - 40, 92, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);
          ctx.fillStyle = pIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 10px Montserrat, sans-serif";
          fillTextFitted(ctx, pr[0], prX + 36, py + 24, prW - 72);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 14px Montserrat, sans-serif";
          fillTextFitted(ctx, pr[1], prX + 36, py + 44, prW - 72);

          ctx.fillStyle = "#475569";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, pr[2], prX + 36, py + 62, prW - 72, 16, 2);
        });

        // Columna Derecha: Código de Relación con Clientes
        const rcX = 710, rcW = 636;
        drawEditorialBlock(rcX, 160, rcW, 726, "RELACIÓN HUMANA CON EL CLIENTE", `El Compromiso de Confianza de ${bName}`, "", pal.sec);

        const commitments = [
          ["COMPROMISO 01", "Escucha Activa antes de Proponer", "Primero comprendemos la meta y el contexto del cliente antes de sugerir cualquier herramienta o servicio."],
          ["COMPROMISO 02", "Propuesta de Valor Directa", "Cada propuesta explica en lenguaje claro el entregable, el cronograma y el impacto tangible."],
          ["COMPROMISO 03", "Entrega en Lienzo Claro", "Todos los entregables se entregan listos para operar, con acceso irrestricto y sin dependencias cautivas."],
          ["COMPROMISO 04", "Atención Inteligente 24/7", "Canales de soporte siempre activos que resuelven dudas inmediatas y escalan a atención ejecutiva."],
          ["COMPROMISO 05", "Alianza a Largo Plazo", "Medimos nuestro éxito en la recompra, la recomendación sincera y la lealtad mutua a través de los años."]
        ];

        commitments.forEach((cm, cIdx) => {
          const cy = 250 + cIdx * 124;
          drawRoundedRect(ctx, rcX + 24, cy, rcW - 48, 110, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
          ctx.fillStyle = pal.sec;
          ctx.fillRect(rcX + 24, cy, 6, 110);

          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          fillTextFitted(ctx, cm[0], rcX + 44, cy + 28, rcW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 15px Montserrat, sans-serif";
          fillTextFitted(ctx, cm[1], rcX + 44, cy + 50, rcW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, cm[2], rcX + 44, cy + 70, rcW - 88, 17.5, 2);
        });

      } else if (i === 6) {
        // LÁMINA 07: LA EMPRESA COMO PERSONA (CARÁCTER Y 4 FACETAS HUMANAS)
        // Izquierda: Gráfico Radar de Arquetipos de Carl Jung (6 Ejes en Curvas)
        drawEditorialBlock(54, 160, 560, 726, "ARQUETIPO DE MARCA Y PSICOLOGÍA", `La Personalidad Humana de ${bName}`, "", pal.sec);

        const rx = 334, ry = 480, rRad = 175;
        // Malla poligonal hexagonal
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 1.2;
        [0.35, 0.7, 1.0].forEach(scale => {
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (Math.PI / 3) * a - Math.PI / 2;
            const px = rx + Math.cos(angle) * rRad * scale;
            const py = ry + Math.sin(angle) * rRad * scale;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        });

        // Ejes de coordenadas
        const axesLabels = [
          "Fuerza Serena", "Rigor Técnico", "Claridad Ejecutiva",
          "Empatía & Calidez", "Agilidad", "Lealtad Leal"
        ];
        for (let a = 0; a < 6; a++) {
          const angle = (Math.PI / 3) * a - Math.PI / 2;
          const px = rx + Math.cos(angle) * rRad;
          const py = ry + Math.sin(angle) * rRad;
          ctx.strokeStyle = "#CBD5E1";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          ctx.textAlign = "center";
          const lx = rx + Math.cos(angle) * (rRad + 24);
          const ly = ry + Math.sin(angle) * (rRad + 24) + 4;
          ctx.fillText(axesLabels[a], lx, ly);
          ctx.textAlign = "left";
        }

        // Polígono de personalidad calibrada
        const values = [0.92, 0.88, 0.95, 0.85, 0.78, 0.96];
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const angle = (Math.PI / 3) * a - Math.PI / 2;
          const vx = rx + Math.cos(angle) * rRad * values[a];
          const vy = ry + Math.sin(angle) * rRad * values[a];
          if (a === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.fillStyle = pal.pri;
        ctx.globalAlpha = 0.22;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 3;
        ctx.stroke();

        drawAuthorCallout(74, 715, 520, 145, d.persona, "ARQUETIPO OFICIAL", "Personalidad y Conducta de Marca");

        // Derecha: Las 4 Facetas de Carácter Humano
        const fcX = 640, fcW = 706;
        drawEditorialBlock(fcX, 160, fcW, 726, "LAS 4 FACETAS DE CONDUCTA", "Cómo se Manifiesta Nuestra Personalidad en Vivo", "", pal.pri);

        const facets = [
          ["01 · EL ARQUITECTO DE CLARIDAD", "Mente Analítica y Estructura", "Aborda los desafíos con orden matemático. Convierte problemas dispersos en esquemas diáfanos, cronogramas viables y decisiones bien fundamentadas.", pal.pri],
          ["02 · EL SOCIO LEAL", "Calidez Humana y Cercanía", "Escucha sin arrogancia. No impone ideas desde la distancia; se sienta junto al cliente para construir la mejor solución técnica hombro a hombro.", pal.sec],
          ["03 · LA FUERZA SERENA", "Autoridad Tranquila y Firmeza", "Transmite seguridad sin necesidad de aspavientos ni agresividad comercial. Su tranquilidad se apoya en el dominio del oficio y la preparación rigurosa.", pal.darkInk],
          ["04 · EL ARTESANO FUNCIONAL", "Cuidado Obsesivo por la Forma", "Sabe que cada línea, cada tipografía y cada interfaz refleja el valor de la empresa. No tolera la mediocridad gráfica ni el descuido operacional.", pal.pri]
        ];

        facets.forEach((fc, fIdx) => {
          const fy = 246 + fIdx * 154;
          drawRoundedRect(ctx, fcX + 24, fy, fcW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = fc[3];
          ctx.fillRect(fcX + 24, fy, 6, 138);

          ctx.fillStyle = fc[3];
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, fc[0], fcX + 44, fy + 30, fcW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, fc[1], fcX + 44, fy + 54, fcW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, fc[2], fcX + 44, fy + 78, fcW - 88, 19, 3);
        });

      } else if (i === 7) {
        // LÁMINA 08: TONO DE VOZ, PERSONALIDAD Y LENGUAJE VISUAL (AURA & DONALD MILLER)
        // Izquierda: Espectro Tonal en Sliders de Polaridad
        const slX = 54, slW = 580;
        drawEditorialBlock(slX, 160, slW, 726, "CALIBRACIÓN KANSEI DEL TONO", "Espectro Tonal en 4 Dimensiones", `El tono de ${bName} está calibrado para proyectar solvencia ejecutiva sin sonar distante, y cercanía humana sin caer en la informalidad trivial.`, pal.sec);

        const sliders = [
          ["DIMENSIÓN 01 · CERCANÍA VS FORMALIDAD", "Cercano y Humano", "Rígido y Distante", 0.65, "65% Cercano"],
          ["DIMENSIÓN 02 · LENGUAJE TÉCNICO", "Claro y Accesible", "Jerga Compleja", 0.78, "78% Accesible"],
          ["DIMENSIÓN 03 · POSTURA COMERCIAL", "Consultivo y Seguro", "Vendedor Agresivo", 0.72, "72% Consultivo"],
          ["DIMENSIÓN 04 · ENFOQUE NARRATIVO", "Pragmático y Realista", "Idealismo Vacío", 0.68, "68% Pragmático"]
        ];

        sliders.forEach((sl, sIdx) => {
          const sy = 280 + sIdx * 135;
          drawRoundedRect(ctx, slX + 20, sy, slW - 40, 116, isRect ? 3 : 12, "#F8FAFC", "#E2E8F0", 1);

          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          fillTextFitted(ctx, sl[0], slX + 36, sy + 24, slW - 72);

          // Pista del slider
          const trackX = slX + 36, trackW = slW - 72, trackY = sy + 58;
          ctx.fillStyle = "#E2E8F0";
          ctx.beginPath();
          ctx.roundRect(trackX, trackY, trackW, 8, [4]);
          ctx.fill();

          // Relleno activo
          ctx.fillStyle = pal.pri;
          ctx.beginPath();
          ctx.roundRect(trackX, trackY, trackW * sl[3], 8, [4]);
          ctx.fill();

          // Puntero / Manija
          ctx.fillStyle = pal.sec;
          ctx.beginPath();
          ctx.arc(trackX + trackW * sl[3], trackY + 4, 9, 0, Math.PI * 2);
          ctx.fill();

          // Etiquetas de extremos
          ctx.fillStyle = pal.darkInk;
          ctx.font = "700 11px Plus Jakarta Sans, sans-serif";
          ctx.fillText(sl[1], trackX, sy + 88);
          ctx.textAlign = "right";
          ctx.fillStyle = "#64748B";
          ctx.fillText(sl[2], trackX + trackW, sy + 88);
          ctx.textAlign = "left";

          ctx.fillStyle = pal.pri;
          ctx.font = "800 10.5px JetBrains Mono, monospace";
          ctx.fillText(sl[4], trackX + trackW / 2 - 32, sy + 46);
        });

        // Derecha: Do's and Don'ts de Lenguaje
        const ddX = 660, ddW = 686;
        drawEditorialBlock(ddX, 160, ddW, 726, "GUÍA DE ESTILO LINGÜÍSTICO", "Directrices de Qué Decir y Qué Evitar", "", pal.pri);

        // Tabla comparativa Dos & Don'ts
        const dosX = ddX + 24, colHalfW = (ddW - 64) / 2;
        drawRoundedRect(ctx, dosX, 240, colHalfW, 616, isRect ? 4 : 14, "#F0FDF4", "#BBF7D0", 1.5);
        ctx.fillStyle = "#15803D";
        ctx.fillRect(dosX, 240, colHalfW, 6);

        ctx.fillStyle = "#15803D";
        ctx.font = "800 13px Montserrat, sans-serif";
        ctx.fillText("✓ CÓMO HABLAMOS (RECOMENDADO)", dosX + 16, 272);

        const dosList = [
          "«Diseñamos sistemas que reducen la fricción y liberan tu tiempo.»",
          "«Te explicamos el diagnóstico con datos y alternativas claras.»",
          "«El proceso toma 7 pasos y cuentas con nuestro apoyo diario.»",
          "«Hacemos que lo complejo se sienta sencillo y elegante.»",
          "«Tu marca queda lista para operar hoy mismo con certeza legal.»"
        ];
        dosList.forEach((item, idx) => {
          const dy = 300 + idx * 105;
          ctx.fillStyle = "#166534";
          ctx.font = "700 11.5px Plus Jakarta Sans, sans-serif";
          ctx.fillText(`0${idx + 1}.`, dosX + 16, dy);
          ctx.fillStyle = "#1F2937";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, item, dosX + 42, dy, colHalfW - 56, 18, 4);
        });

        const dontsX = dosX + colHalfW + 16;
        drawRoundedRect(ctx, dontsX, 240, colHalfW, 616, isRect ? 4 : 14, "#FEF2F2", "#FECACA", 1.5);
        ctx.fillStyle = "#B91C1C";
        ctx.fillRect(dontsX, 240, colHalfW, 6);

        ctx.fillStyle = "#B91C1C";
        ctx.font = "800 13px Montserrat, sans-serif";
        ctx.fillText("✕ LO QUE NUNCA DECIMOS (PROHIBIDO)", dontsX + 16, 272);

        const dontsList = [
          "«Somos los líderes número uno indiscutibles del mercado global.»",
          "«Nuestra sinergia holística disruptiva cambiará el paradigma.»",
          "«El costo depende... ya le avisaremos cuánto va a salir todo.»",
          "«Usted no se preocupe por los detalles técnicos porque no los entendería.»",
          "«Ofrecemos la solución mágica que resuelve cualquier cosa sin esfuerzo.»"
        ];
        dontsList.forEach((item, idx) => {
          const dy = 300 + idx * 105;
          ctx.fillStyle = "#991B1B";
          ctx.font = "700 11.5px Plus Jakarta Sans, sans-serif";
          ctx.fillText(`0${idx + 1}.`, dontsX + 16, dy);
          ctx.fillStyle = "#1F2937";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, item, dontsX + 42, dy, colHalfW - 56, 18, 4);
        });

      } else if (i === 8) {
        // LÁMINA 09: INGENIERÍA DE TOUCHPOINTS: MAPA INTEGRAL DEL VIAJE DEL CLIENTE
        // Cabezal Editorial Holístico
        drawEditorialBlock(54, 160, 1292, 160, "LOS 50,000 MOMENTOS DE LA VERDAD (JAN CARLZON & DON NORMAN)", `El Mapa Holístico de Experiencia de ${bName}`, `La reputación de ${bName} no se construye con discursos, sino en cada punto de contacto real donde el cliente interactúa con la marca. Diseñamos y homologamos la experiencia a lo largo de 3 momentos secuenciales: Antes de Comprar (descubrimiento y anclaje de confianza), Durante la Compra (ejecución sin fricción y trato humano) y Después de Comprar (entrega ejecutiva, portal y lealtad).`, pal.sec);

        // Infografía Vectorial Continua de las 3 Macro-Fases
        const phases = [
          {
            num: "01",
            name: "ANTES DE COMPRAR",
            tag: "Momento 1 · Descubrimiento y Confianza",
            color: pal.darkInk,
            points: d.tpBefore
          },
          {
            num: "02",
            name: "DURANTE LA COMPRA",
            tag: "Momento 2 · Ejecución y Trato Humano",
            color: pal.pri,
            points: d.tpDuring
          },
          {
            num: "03",
            name: "DESPUÉS DE COMPRAR",
            tag: "Momento 3 · Portal, Entregables y Lealtad",
            color: pal.sec,
            points: d.tpAfter
          }
        ];

        phases.forEach((ph, pIdx) => {
          const px = 54 + pIdx * 440;
          drawRoundedRect(ctx, px, 340, 412, 546, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
          ctx.fillStyle = ph.color;
          ctx.fillRect(px, 340, 412, 8);

          ctx.save();
          ctx.beginPath();
          ctx.rect(px + 10, 350, 392, 526);
          ctx.clip();

          // Número grande de momento
          ctx.fillStyle = ph.color;
          ctx.font = "900 32px Montserrat, sans-serif";
          ctx.fillText(ph.num, px + 22, 395);

          ctx.fillStyle = ph.color;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, ph.tag, px + 76, 380, 310);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 17px Montserrat, sans-serif";
          fillTextFitted(ctx, ph.name, px + 76, 404, 310);

          // Línea separadora
          ctx.strokeStyle = "#CBD5E1";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px + 22, 422);
          ctx.lineTo(px + 390, 422);
          ctx.stroke();

          // Los 4 Puntos de Contacto Reales de esta Fase
          ph.points.forEach((pt, ptIdx) => {
            const py = 440 + ptIdx * 105;
            drawRoundedRect(ctx, px + 20, py, 372, 92, isRect ? 3 : 12, "#FFFFFF", "#E2E8F0", 1.2);
            ctx.fillStyle = ph.color;
            ctx.fillRect(px + 20, py, 5, 92);

            ctx.fillStyle = ph.color;
            ctx.font = "800 10px Montserrat, sans-serif";
            fillTextFitted(ctx, `PUNTO CLAVE 0${ptIdx + 1}`, px + 36, py + 22, 340);

            ctx.fillStyle = pal.darkInk;
            ctx.font = "600 12.2px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, pt, px + 36, py + 42, 340, 18, 3);
          });
          ctx.restore();
        });

      } else if (i === 9) {
        // LÁMINA 10: TOUCHPOINTS MOMENTO 1: ANTES DE COMPRAR (DESCUBRIMIENTO Y CONFIANZA)
        // Columna Izquierda: Escenario Vectorial de Descubrimiento (Móvil + Búsqueda)
        const scX = 54, scW = 540;
        drawEditorialBlock(scX, 160, scW, 726, "ESCENARIO DE DESCUBRIMIENTO", "La Primera Impresión Fija el Marco de Confianza", `Como enseña Jan Carlzon, el cliente se forma una opinión en los primeros 15 segundos. Nuestro ecosistema previo a la compra combina presencia en redes, web clara y atención conversacional inmediata para transmitir orden y autoridad técnica.`, pal.darkInk);

        // Vector de smartphone en curvas con wireframe de landing y chat
        const phX = scX + 130, phY = 320, phW = 280, phH = 430;
        drawRoundedRect(ctx, phX, phY, phW, phH, 32, "#0F172A", "#334155", 3);
        drawRoundedRect(ctx, phX + 12, phY + 12, phW - 24, phH - 24, 22, "#FFFFFF", "#E2E8F0", 1.5);

        // Pantalla de teléfono
        ctx.fillStyle = pal.pri;
        ctx.fillRect(phX + 12, phY + 12, phW - 24, 38);
        drawLogoOrEmblem(phX + 22, phY + 18, 26, true);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText(bUpper, phX + 56, phY + 36);

        // Wireframe de contenido en pantalla
        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 13px Montserrat, sans-serif";
        drawWrappedText(ctx, `Crea tu marca en minutos con Aura`, phX + 26, phY + 76, phW - 52, 17, 2);

        // Mensaje de WhatsApp en pantalla
        drawRoundedRect(ctx, phX + 24, phY + 130, phW - 48, 86, 12, "#DCF8C6", "#86EFAC", 1);
        ctx.fillStyle = "#065F46";
        ctx.font = "800 9.5px Montserrat, sans-serif";
        ctx.fillText("AURA CONCIERGE 24/7", phX + 36, phY + 148);
        ctx.fillStyle = "#1F2937";
        ctx.font = "500 10.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Hola, bienvenido a ${bName}. Cuéntame tu proyecto y te preparo una propuesta en 2 minutos.`, phX + 36, phY + 166, phW - 72, 15, 3);

        // Ficha inferior
        drawRoundedRect(ctx, scX + 24, 765, scW - 48, 105, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("ESTÁNDAR OFICIAL DE RESPUESTA", scX + 40, 792);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Tiempo de respuesta menor a 3 minutos vía WhatsApp y sitio web con velocidad de carga menor a 1.2 segundos.`, scX + 40, 814, scW - 80, 18, 2);

        // Columna Derecha: Los 4 Touchpoints de Descubrimiento a Detalle
        const dtX = 620, dtW = 726;
        drawEditorialBlock(dtX, 160, dtW, 726, "INGENIERÍA DE MOMENTO 1", "Los 4 Puntos de Contacto Previos a la Compra", "", pal.sec);

        const beforeTouchpoints = [
          {
            badge: "TOUCHPOINT 01 · AUTORIDAD DIGITAL",
            title: "Redes Sociales y Publicaciones de Valor",
            body: d.tpBefore[0] || `Presencia cuidada en LinkedIn e Instagram con piezas visuales en Lienzo Claro (#FFFFFF) y acentos en ${pal.sec}. Compartimos casos reales y método, sin saturar con promociones vacías.`
          },
          {
            badge: "TOUCHPOINT 02 · SITIO WEB OFICIAL",
            title: `Portal Comercial y Experiencia Web (${assets.cleanSlug}.com)`,
            body: d.tpBefore[1] || `Sitio web limpio y directo que explica el valor en el primer scroll. Incluye comparativa de valor transparente y acceso inmediato a demo sin necesidad de registro forzado.`
          },
          {
            badge: "TOUCHPOINT 03 · ASISTENCIA CONVERSACIONAL",
            title: "Agente Inteligente en WhatsApp 24/7",
            body: d.tpBefore[2] || `Atención inmediata con lenguaje empático que resuelve inquietudes de horario, precio y metodología, facilitando la agenda de citas o la compra directa en segundos.`
          },
          {
            badge: "TOUCHPOINT 04 · DIAGNÓSTICO INICIAL",
            title: "Solicitud y Cotización Transparente",
            body: d.tpBefore[3] || `Formulario o diálogo inicial que captura las necesidades reales sin tecnicismos confusos, generando una propuesta ejecutiva formal en menos de 24 horas.`
          }
        ];

        beforeTouchpoints.forEach((bt, bIdx) => {
          const by = 246 + bIdx * 154;
          drawRoundedRect(ctx, dtX + 24, by, dtW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = bIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(dtX + 24, by, 6, 138);

          ctx.fillStyle = bIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, bt.badge, dtX + 44, by + 30, dtW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, bt.title, dtX + 44, by + 54, dtW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, bt.body, dtX + 44, by + 78, dtW - 88, 19, 3);
        });

      }
    """
