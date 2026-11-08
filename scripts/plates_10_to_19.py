# -*- coding: utf-8 -*-
"""
Láminas 10 a 19: De la Experiencia de Compra a la Retícula Constructiva 8X
"""

def get_plates_10_to_19():
    return """
      else if (i === 10) {
        // LÁMINA 11: TOUCHPOINTS MOMENTO 2: DURANTE LA COMPRA Y EJECUCIÓN (JAN CARLZON & DON NORMAN)
        // Columna Izquierda: Escenario Vectorial de Ejecución y Contrato
        const exX = 54, exW = 540;
        drawEditorialBlock(exX, 160, exW, 726, "ESCENARIO DE COMPRA Y SERVICIO", "Fricción Cero en la Contratación y Entrega", `La fase donde la promesa comercial se vuelve realidad tangible. Diseñamos un flujo transparente sin sorpresas de costos, con sesiones de trabajo colaborativas y visualización continua de avances.`, pal.pri);

        // Vector de documento ejecutivo y apretón de manos
        const docX = exX + 130, docY = 320, docW = 280, docH = 430;
        drawRoundedRect(ctx, docX, docY, docW, docH, 16, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(docX, docY, docW, 40);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 12px Montserrat, sans-serif";
        ctx.fillText("PROPUESTA Y ACUERDO OFICIAL", docX + 18, docY + 25);

        // Líneas de contenido de documento
        [80, 110, 140, 170, 200, 230, 260].forEach((ly, lIdx) => {
          ctx.fillStyle = lIdx === 0 ? pal.sec : "#E2E8F0";
          ctx.fillRect(docX + 20, docY + ly, lIdx === 0 ? 120 : (lIdx % 2 === 0 ? docW - 50 : docW - 80), lIdx === 0 ? 8 : 6);
        });

        // Casillas de verificación
        [300, 335, 370].forEach((cy, cIdx) => {
          ctx.strokeStyle = "#10B981";
          ctx.lineWidth = 2;
          ctx.strokeRect(docX + 20, docY + cy, 18, 18);
          ctx.fillStyle = "#10B981";
          ctx.beginPath();
          ctx.arc(docX + 29, docY + cy + 9, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = pal.darkInk;
          ctx.font = "700 11px Plus Jakarta Sans, sans-serif";
          ctx.fillText(cIdx === 0 ? "Diagnóstico validado" : (cIdx === 1 ? "Entregables certificados" : "Acompañamiento activo"), docX + 48, docY + cy + 13);
        });

        drawRoundedRect(ctx, exX + 24, 765, exW - 48, 105, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("ESTÁNDAR DE EJECUCIÓN", exX + 40, 792);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Tiempos de entrega innegociables y actualización de avances cada 48 horas sin que el cliente tenga que solicitarlo.`, exX + 40, 814, exW - 80, 18, 2);

        // Columna Derecha: Los 4 Touchpoints Durante la Compra
        const dcX = 620, dcW = 726;
        drawEditorialBlock(dcX, 160, dcW, 726, "INGENIERÍA DE MOMENTO 2", "Los 4 Puntos de Contacto Durante el Servicio", "", pal.pri);

        const duringTouchpoints = [
          {
            badge: "TOUCHPOINT 01 · CONTRATACIÓN ÁGIL",
            title: "Proceso de Pago y Firma Transparente",
            body: d.tpDuring[0] || `Pasarela digital segura con opciones de pago directo (Tarjeta, Apple Pay, Google Pay, transferencia bancaria), factura inmediata y contrato de términos claros sin cláusulas abusivas.`
          },
          {
            badge: "TOUCHPOINT 02 · ONBOARDING EJECUTIVO",
            title: "Sesión de Alineación Hombro con Hombro",
            body: d.tpDuring[1] || `Reunión inicial de bienvenida para clarificar expectativas, roles y fechas clave. Se asigna un responsable directo de proyecto que acompaña al cliente sin triangulaciones.`
          },
          {
            badge: "TOUCHPOINT 03 · SEGUIMIENTO EN VIVO",
            title: "Presentación de Avances y Prototipos",
            body: d.tpDuring[2] || `Presentaciones visuales ejecutivas en Lienzo Claro (#FFFFFF) donde el cliente evalúa avances reales con criterio técnico, permitiendo retroalimentación precisa y ágil.`
          },
          {
            badge: "TOUCHPOINT 04 · PROTOCOLO DE ENTREGA",
            title: "Entrega Puntual y Empaquetado Premium",
            body: d.tpDuring[3] || `Tanto en entregables físicos como digitales, cuidamos el acabado, la resolución y la organización estructural para que el cliente reciba una solución lista para operar hoy mismo.`
          }
        ];

        duringTouchpoints.forEach((dt, dIdx) => {
          const dy = 246 + dIdx * 154;
          drawRoundedRect(ctx, dcX + 24, dy, dcW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(dcX + 24, dy, 6, 138);

          ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, dt.badge, dcX + 44, dy + 30, dcW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, dt.title, dcX + 44, dy + 54, dcW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, dt.body, dcX + 44, dy + 78, dcW - 88, 19, 3);
        });

      } else if (i === 11) {
        // LÁMINA 12: TOUCHPOINTS MOMENTO 3: DESPUÉS DE COMPRAR (PORTAL, ENTREGABLES Y LEALTAD)
        // Columna Izquierda: Escenario Vectorial de Bóveda y Lealtad
        const poX = 54, poW = 540;
        drawEditorialBlock(poX, 160, poW, 726, "ESCENARIO DE POST-VENTA", "La Génesis de la Próxima Compra y Recomendación", `El servicio post-venta en ${bName} no es un costo de soporte; es el activo que convierte clientes satisfechos en embajadores apasionados. Garantizamos acceso perpetuo a los activos y acompañamiento evolutivo.`, pal.sec);

        // Vector de portal digital con carpetas de activos
        const vX = poX + 130, vY = 320, vW = 280, vH = 430;
        drawRoundedRect(ctx, vX, vY, vW, vH, 18, "#0F172A", "#1E293B", 2);

        // Cabezal del portal
        ctx.fillStyle = "#1E293B";
        ctx.fillRect(vX, vY, vW, 44);
        ctx.fillStyle = pal.sec;
        ctx.beginPath();
        ctx.arc(vX + 24, vY + 22, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText(`PORTAL DE CLIENTE · ${bUpper}`, vX + 38, vY + 26);

        // Carpetas de activos digitales
        const folders = [
          ["Manual Oficial 30 Hojas (.PDF)", "Vectores en curvas de alta resolución"],
          ["Logotipos en Formatos Vectoriales", ".SVG, .PNG positivo y negativo calado"],
          ["Fuentes y Recursos Tipográficos", "Familias Montserrat y Plus Jakarta Sans"],
          ["Facturas y Certificados de Vigencia", "Comprobantes fiscales y licencias"]
        ];

        folders.forEach((f, fIdx) => {
          const fy = vY + 60 + fIdx * 80;
          drawRoundedRect(ctx, vX + 16, fy, vW - 32, 68, 10, "#1E293B", "#334155", 1);
          ctx.fillStyle = pal.pri;
          ctx.fillRect(vX + 16, fy, 4, 68);

          ctx.fillStyle = "#F8FAFC";
          ctx.font = "800 11.5px Montserrat, sans-serif";
          fillTextFitted(ctx, f[0], vX + 28, fy + 26, vW - 56);

          ctx.fillStyle = "#94A3B8";
          ctx.font = "500 10.5px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, f[1], vX + 28, fy + 46, vW - 56);
        });

        // Ficha inferior
        drawRoundedRect(ctx, poX + 24, 765, poW - 48, 105, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("GARANTÍA Y RETENCIÓN ACTIVA", poX + 40, 792);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "700 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Auditoría anual de vigencia visual y actualización gratuita ante cambios de versión del software o formatos web.`, poX + 40, 814, poW - 80, 18, 2);

        // Columna Derecha: Los 4 Touchpoints de Post-Venta
        const atX = 620, atW = 726;
        drawEditorialBlock(atX, 160, atW, 726, "INGENIERÍA DE MOMENTO 3", "Los 4 Puntos de Contacto de Fidelización y Lealtad", "", pal.sec);

        const afterTouchpoints = [
          {
            badge: "TOUCHPOINT 01 · BÓVEDA DIGITAL PRIVADA",
            title: "Portal de Clientes con Acceso 24/7",
            body: d.tpAfter[0] || `Repositorio centralizado en la nube donde el cliente descarga en cualquier momento sus manuales, logotipos en curvas, licencias y comprobantes sin intermediarios ni demoras.`
          },
          {
            badge: "TOUCHPOINT 02 · ENTREGABLES CERTIFICADOS",
            title: "Manuales de Marca y Guías Operativas",
            body: d.tpAfter[1] || `Entrega del Manual de Marca de 30 Hojas en .PDF vectorial nativo y versión .HTML interactiva, garantizando que impresores, desarrolladores y agencias apliquen la marca sin desviaciones.`
          },
          {
            badge: "TOUCHPOINT 03 · CALIBRACIÓN DE SATISFACCIÓN",
            title: "Encuesta Ejecutiva de Calidad y NPS",
            body: d.tpAfter[2] || `Medición formal del índice de satisfacción tras la entrega, evaluando la claridad, la velocidad y la atención recibida para implementar mejoras operativas inmediatas.`
          },
          {
            badge: "TOUCHPOINT 04 · ALIANZA CONTINUA",
            title: "Acompañamiento y Evolución de Marca",
            body: d.tpAfter[3] || `Seguimiento periódico para evaluar la tracción del sistema en el mercado, ofreciendo ampliaciones de portafolio y nuevos recursos gráficos conforme el negocio crece.`
          }
        ];

        afterTouchpoints.forEach((at, aIdx) => {
          const ay = 246 + aIdx * 154;
          drawRoundedRect(ctx, atX + 24, ay, atW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = aIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(atX + 24, ay, 6, 138);

          ctx.fillStyle = aIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, at.badge, atX + 44, ay + 30, atW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, at.title, atX + 44, ay + 54, atW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, at.body, atX + 44, ay + 78, atW - 88, 19, 3);
        });

      } else if (i === 12) {
        // LÁMINA 13: NAMING ESTRATÉGICO, SEMIÓTICA Y CLASES DE NIZA (ALEXANDRA WATKINS & AL RIES)
        // Cabezal Superior con Desglose Fonético del Nombre
        drawRoundedRect(ctx, 54, 160, 1292, 185, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(54, 160, 1292, 7);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11.5px Montserrat, sans-serif";
        fillTextFitted(ctx, "ANATOMÍA FONÉTICA Y POSICIONAMIENTO EN LA MENTE", 80, 194, 600);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 44px Montserrat, sans-serif";
        fillTextFitted(ctx, bUpper, 80, 246, 750);

        ctx.fillStyle = pal.pri;
        ctx.font = "700 13px Plus Jakarta Sans, sans-serif";
        fillTextFitted(ctx, `Etimología y justificación semiótica: Nombre de alta sonoridad y memorabilidad inmediata diseñado para dominar la categoría de ${industry}.`, 80, 280, 750);

        // Bloque derecho de cabezal: Sello oficial de registro Niza
        drawRoundedRect(ctx, 920, 185, 396, 134, isRect ? 4 : 14, "#FFFFFF", "#CBD5E1", 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "CLASIFICACIÓN INTERNACIONAL DE NIZA", 940, 214, 356);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        fillTextFitted(ctx, "CLASES 35 · 42 · PROTECCIÓN GLOBAL", 940, 246, 356);

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Servicios comerciales, dirección de negocios, diseño tecnológico y software de marca. Blindaje ante homónimos.`, 940, 270, 356, 16, 2);

        // Mitad Inferior: El Test SMILE de Alexandra Watkins (Izquierda) y Test SCRATCH (Derecha)
        const smX = 54, smW = 630;
        drawEditorialBlock(smX, 365, smW, 520, "AUDITORÍA SMILE (ALEXANDRA WATKINS)", "5 Factores de Fortaleza Fonética y Emocional", "", pal.pri);

        const smileItems = [
          ["S · SUGGESTIVE", "Evoca la Esencia del Negocio", `Sugiere de forma inmediata excelencia, liderazgo y solución en ${sectorShort}.`],
          ["M · MEANINGFUL", "Cargado de Significado Real", `El nombre comunica valor genuino sin depender de explicaciones forzadas.`],
          ["I · IMAGERY", "Crea una Imagen Mental Clara", `Provoca asociaciones visuales de estructura, confianza y vanguardia tecnológica.`],
          ["L · LEGS", "Capacidad de Extensión", `Permite crecer hacia nuevas líneas de producto y servicios sin quedar obsoleto.`],
          ["E · EMOTIONAL", "Conexión Empática Inmediata", `Genera calidez y certidumbre en el primer contacto con el cliente.`]
        ];

        smileItems.forEach((sm, smIdx) => {
          const sy = 440 + smIdx * 82;
          drawRoundedRect(ctx, smX + 20, sy, smW - 40, 72, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);
          ctx.fillStyle = pal.pri;
          ctx.font = "800 11.5px Montserrat, sans-serif";
          ctx.fillText(sm[0], smX + 36, sy + 24);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 13px Montserrat, sans-serif";
          fillTextFitted(ctx, sm[1], smX + 180, sy + 24, smW - 210);

          ctx.fillStyle = "#475569";
          ctx.font = "500 11px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sm[2], smX + 36, sy + 44, smW - 72, 15, 2);
        });

        // Derecha: Test SCRATCH de Eliminación de Errores Críticos
        const scX2 = 710, scW2 = 636;
        drawEditorialBlock(scX2, 365, scW2, 520, "FILTRO SCRATCH DE RIESGO CERO", "7 Errores Críticos Superados con Éxito (100%)", "", pal.sec);

        const scratchItems = [
          ["Spelling-challenged", "Fácil de escribir al escuchar"],
          ["Copycat", "Original y sin copia de rivales"],
          ["Restrictive", "No limita la expansión futura"],
          ["Annoying", "Agradable al oído y elegante"],
          ["Tame", "Memorable con personalidad propia"],
          ["Curse of Knowledge", "Cero tecnicismos crípticos"],
          ["Hard to pronounce", "Pronunciación universal fluida"]
        ];

        scratchItems.forEach((sc, scIdx) => {
          const scy = 440 + scIdx * 58;
          drawRoundedRect(ctx, scX2 + 20, scy, scW2 - 40, 50, isRect ? 3 : 8, "#F8FAFC", "#E2E8F0", 1);
          ctx.fillStyle = "#10B981";
          ctx.font = "900 14px Montserrat, sans-serif";
          ctx.fillText("✓", scX2 + 36, scy + 32);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 12.5px Montserrat, sans-serif";
          ctx.fillText(`Superado: ${sc[0]}`, scX2 + 64, scy + 26);

          ctx.fillStyle = "#64748B";
          ctx.font = "500 11px Plus Jakarta Sans, sans-serif";
          ctx.fillText(`— ${sc[1]}`, scX2 + 64, scy + 42);
        });

      } else if (i === 13) {
        // LÁMINA 14: ARQUITECTURA DE MARCA ÚNICA (MONOLÍTICA) O MULTIMARCA
        if (dna.archMode === "multibrand") {
          // Multimarca con 4 Submarcas Homologadas
          drawEditorialBlock(54, 160, 1292, 160, "ARQUITECTURA MULTIMARCA HOMOLOGADA", `Marca Madre ${bUpper} y sus 4 Divisiones de Negocio`, `Estructura corporativa diseñada para grupos que operan en múltiples líneas especializadas. Cada división comparte el símbolo maestro y la tipografía rectora, diferenciándose mediante un color de acento armónico y un descriptor funcional claro.`, pal.pri);

          assets.subBrands.forEach((sb, sIdx) => {
            const sx = 54 + sIdx * 328;
            drawRoundedRect(ctx, sx, 340, 308, 546, isRect ? 4 : 18, "#F8FAFC", pal.softTint, 2);
            ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
            ctx.fillRect(sx, 340, 308, 8);

            drawLogoOrEmblem(sx + 89, 370, 130, false, sb.suffix, 270);
            ctx.fillStyle = pal.darkInk;
            ctx.font = "800 16px Montserrat, sans-serif";
            ctx.textAlign = "center";
            fillTextFitted(ctx, `${bUpper} ${sb.suffix}`, sx + 154, 545, 275);
            ctx.textAlign = "left";

            ctx.fillStyle = "#334155";
            ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, sb.tagline, sx + 20, 580, 268, 18, 5);

            ctx.fillStyle = pal.pri;
            ctx.font = "800 10.5px JetBrains Mono, monospace";
            ctx.textAlign = "center";
            fillTextFitted(ctx, sb.domain, sx + 154, 845, 275);
            ctx.textAlign = "left";
          });
        } else {
          // MARCA ÚNICA (MONOLÍTICA): Foco total en un solo nombre oficial
          // Columna Izquierda: Principio de Concentración Total de Valor
          const moX = 54, moW = 540;
          drawRoundedRect(ctx, moX, 160, moW, 726, isRect ? 4 : 20, "#F8FAFC", pal.pri, 2);
          ctx.fillStyle = pal.sec;
          ctx.fillRect(moX, 160, moW, 8);

          ctx.save();
          ctx.beginPath();
          ctx.rect(moX + 10, 172, moW - 20, 706);
          ctx.clip();

          drawLogoOrEmblem(moX + 160, 195, 220, false);
          ctx.textAlign = "center";
          ctx.fillStyle = pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, "IDENTIDAD UNIFICADA AL 100% · SIN SUBMARCAS", moX + 270, 452, moW - 60);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "900 28px Montserrat, sans-serif";
          fillTextFitted(ctx, bUpper, moX + 270, 488, moW - 60);

          ctx.fillStyle = pal.pri;
          ctx.font = "700 13px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, tagline, moX + 270, 514, moW - 60);
          ctx.textAlign = "left";

          drawEditorialBlock(moX + 22, 542, moW - 44, 155, "POR QUÉ OPERAMOS COMO MARCA ÚNICA", "Concentración Absoluta de Prestigio", `A diferencia de los grupos dispersos, ${bName} concentra el 100% de su inversión publicitaria, confianza y valor de marca en un solo nombre. Cada éxito de cualquier producto fortalece directamente la reputación global de ${bName}.`, pal.pri);

          drawEditorialBlock(moX + 22, 712, moW - 44, 155, "REGLA DE ORO DE IDENTIDAD", "Un Solo Nombre y 3 Disposiciones", `Queda estrictamente prohibido crear submarcas o agregar sufijos arbitrarios. La marca se adapta únicamente en su disposición geométrica (Horizontal, Vertical o 1:1) según las exigencias del soporte.`, pal.sec);
          ctx.restore();

          // Columna Derecha: Las 3 Disposiciones Oficiales del Logotipo Único
          const dpX = 620, dpW = 726;
          const dispositions = [
            {
              badge: "DISPOSICIÓN 01 · USO PRINCIPAL EN CABEZALES Y DOCUMENTOS",
              title: `Firma Horizontal Principal (${bName})`,
              body: `Integra el símbolo en positivo a la izquierda y el logotipo tipográfico a la derecha. Uso obligatorio en cabezales web (www.${assets.cleanSlug}.com), portadas de propuestas comerciales y hojas membretadas oficiales.`
            },
            {
              badge: "DISPOSICIÓN 02 · USO EN EMPAQUES, SEÑALÉTICA Y RÓTULOS",
              title: `Emblema Vertical Centrado (${bName})`,
              body: `Presenta el símbolo maestro en eje central simétrico sobre el nombre ${bUpper}. Ideal para etiquetas verticales, empaques, bolsas de entrega, uniformes y tótems de recepción.`
            },
            {
              badge: "DISPOSICIÓN 03 · USO EN ECOSISTEMA DIGITAL Y REDES",
              title: "Símbolo Compacto 1:1 (Icono de App y Avatar)",
              body: `Síntesis óptica cuadrada 1:1 para foto de perfil en WhatsApp Business, Instagram, LinkedIn, favicon web e icono de aplicación móvil desde 16 píxeles con máxima nitidez.`
            }
          ];

          dispositions.forEach((disp, dIdx) => {
            const dy = 160 + dIdx * 248;
            drawRoundedRect(ctx, dpX, dy, dpW, 230, isRect ? 4 : 18, "#FFFFFF", "#CBD5E1", 1.8);
            ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
            ctx.fillRect(dpX, dy, 6, 230);

            ctx.save();
            ctx.beginPath();
            ctx.rect(dpX + 10, dy + 8, dpW - 20, 214);
            ctx.clip();

            drawRoundedRect(ctx, dpX + 20, dy + 22, 184, 184, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.5);
            drawLogoOrEmblem(dpX + 52, dy + 42, 120, false, dIdx === 0 ? "HORIZONTAL" : dIdx === 1 ? "VERTICAL" : "ICONO 1:1", 164);

            ctx.fillStyle = dIdx % 2 === 0 ? pal.pri : pal.sec;
            ctx.font = "800 10px Montserrat, sans-serif";
            fillTextFitted(ctx, disp.badge, dpX + 225, dy + 40, dpW - 245);

            ctx.fillStyle = pal.darkInk;
            ctx.font = "800 18px Montserrat, sans-serif";
            fillTextFitted(ctx, disp.title, dpX + 225, dy + 68, dpW - 245);

            ctx.fillStyle = "#334155";
            ctx.font = "500 13px Plus Jakarta Sans, sans-serif";
            drawWrappedText(ctx, disp.body, dpX + 225, dy + 98, dpW - 245, 20, 5);
            ctx.restore();
          });
        }

      } else if (i === 14) {
        // LÁMINA 15: ANATOMÍA SEMIÓTICA DEL SÍMBOLO MAESTRO (PAUL RAND & SAGI HAVIV)
        // Izquierda: Símbolo a Gran Escala con Guías Ópticas de Construcción
        const smX = 54, smW = 630;
        drawRoundedRect(ctx, smX, 160, smW, 726, isRect ? 4 : 22, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(smX, 160, smW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(smX + 8, 172, smW - 16, 706);
        ctx.clip();

        const sCenter = smX + smW / 2;
        // Guías de retícula y ejes
        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sCenter, 200);
        ctx.lineTo(sCenter, 570);
        ctx.moveTo(smX + 50, 385);
        ctx.lineTo(smX + smW - 50, 385);
        ctx.stroke();

        // Círculos de proporción áurea
        ctx.strokeStyle = pal.softTint;
        ctx.lineWidth = 1.8;
        [120, 160, 200].forEach(r => {
          ctx.beginPath();
          ctx.arc(sCenter, 385, r, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Símbolo maestro central
        drawLogoOrEmblem(sCenter - 140, 245, 280, false);

        // Ficha técnica inferior del símbolo
        drawRoundedRect(ctx, smX + 24, 620, smW - 48, 235, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "JUSTIFICACIÓN SEMIÓTICA Y EQUILIBRIO ÓPTICO", smX + 44, 650, smW - 88);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 16px Montserrat, sans-serif";
        fillTextFitted(ctx, `La Morfología Visual de ${bName}`, smX + 44, 678, smW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `El símbolo sintetiza los valores de ${industry}: orden, solidez técnica y visión hacia el futuro. Su geometría se apoya en arcos tangentes que transmiten dinamismo sin perder aplomo institucional. Los trazos en ${dna.strokeLabel.toLowerCase()} garantizan un peso óptico homogéneo que no se deforma al reducirse a iconos móviles ni al ampliarse en señalética arquitectónica.`, smX + 44, 704, smW - 88, 19, 6);
        ctx.restore();

        // Derecha: Auditoría de 7 Puntos de Paul Rand (100/100)
        const prX = 710, prW = 636;
        drawEditorialBlock(prX, 160, prW, 726, "TEST DE PAUL RAND (CALIDAD DE LOGO)", "Evaluación de 7 Factores de Viabilidad Icónica", "", pal.sec);

        const randFactors = [
          ["01 · DISTINTIVIDAD", "10 / 10", "Se diferencia con claridad de cualquier competidor directo en " + sectorShort + "."],
          ["02 · VISIBILIDAD", "10 / 10", "Impacto visual instantáneo a primer golpe de vista, incluso en entornos saturados."],
          ["03 · ADAPTABILIDAD", "10 / 10", "Funciona en blanco y negro, grabado láser, bordado textil y pantalla digital."],
          ["04 · MEMORABILIDAD", "10 / 10", "Fácil de recordar y describir verbalmente tras verlo una sola vez."],
          ["05 · UNIVERSALIDAD", "10 / 10", "Aceptado y comprendido a través de distintas culturas sin connotaciones equívocas."],
          ["06 · PERDURABILIDAD", "10 / 10", "Diseño inmune a modas pasajeras que mantendrá su vigencia durante décadas."],
          ["07 · SIMPLICIDAD", "10 / 10", "Reducido a sus elementos indispensables sin elementos superfluos."]
        ];

        randFactors.forEach((rf, rIdx) => {
          const rfy = 246 + rIdx * 78;
          drawRoundedRect(ctx, prX + 24, rfy, prW - 48, 68, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);

          ctx.fillStyle = pal.pri;
          ctx.font = "800 11px Montserrat, sans-serif";
          ctx.fillText(rf[0], prX + 40, rfy + 24);

          ctx.fillStyle = "#10B981";
          ctx.font = "900 13px Montserrat, sans-serif";
          ctx.textAlign = "right";
          ctx.fillText(rf[1] + " ★", prX + prW - 40, rfy + 24);
          ctx.textAlign = "left";

          ctx.fillStyle = "#475569";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, rf[2], prX + 40, rfy + 44, prW - 80, 16, 2);
        });

        // Dictamen inferior de Rand
        drawRoundedRect(ctx, prX + 24, 804, prW - 48, 68, isRect ? 4 : 10, "#ECFDF5", "#A7F3D0", 1.5);
        ctx.fillStyle = "#047857";
        ctx.font = "800 12px Montserrat, sans-serif";
        ctx.fillText("DICTAMEN OFICIAL: APTO PARA REGISTRO Y RECONOCIMIENTO ICÓNICO", prX + 40, 832);
        ctx.fillStyle = "#065F46";
        ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Puntuación Total: 100/100 · Símbolo certificado por el Consejo Metodológico.", prX + 40, 852);

      } else if (i >= 15 && i <= 18) {
        // LÁMINAS 16–19: LOS 4 PILARES DE EXCELENCIA DE LA MARCA ÚNICA (O SUBMARCAS)
        const pilarIndex = i - 14; // 1, 2, 3, 4
        const pilarTitles = [
          `Pilar 01 de ${bName}: Solución Central y Propuesta de Valor`,
          `Pilar 02 de ${bName}: Estándar de Experiencia y Atención al Cliente`,
          `Pilar 03 de ${bName}: Ecosistema Digital y Adaptabilidad 1:1`,
          `Pilar 04 de ${bName}: Control de Calidad, Entrega y Retención`
        ];
        const pilarBadges = [
          "PROPUESTA CORE Y VENTAJA COMPETITIVA",
          "EXPERIENCIA HUMANA Y TRATO DE SOCIO",
          "CONECTIVIDAD DIGITAL Y MOVILIDAD",
          "GARANTÍA INSTITUCIONAL Y LEALTAD"
        ];
        const pilarBodies = [
          `La solución central de ${bName} combina rigor analítico, metodología probada y ejecución especializada para resolver el problema raíz de nuestros clientes en ${industry}. Oferta oficial: ${d.valueOffer}`,
          `El trato con el cliente se apoya en la empatía y la presencia accesible. Ningún cliente es un número de folio; acompañamos hombro con hombro desde el diagnóstico inicial hasta la implantación final.`,
          `Diseño concebido para brillar en pantallas OLED de smartphones, tablets, ordenadores y redes sociales. El símbolo 1:1 mantiene su nitidez absoluta incluso en favicons de 16 píxeles.`,
          `Compromiso contractual con la entrega puntual, la vigencia documental y la mejora continua. Respaldamos cada solución con soporte activo y auditorías periódicas.`
        ];

        // Columna Izquierda: Símbolo Monumental en Positivo sobre Fondo Claro
        const pX = 54, pW = 540;
        drawRoundedRect(ctx, pX, 160, pW, 726, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = i % 2 === 0 ? pal.pri : pal.sec;
        ctx.fillRect(pX, 160, pW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(pX + 8, 172, pW - 16, 706);
        ctx.clip();

        drawLogoOrEmblem(pX + 140, 240, 260, false, `PILAR 0${pilarIndex} · OFICIAL`, pW - 60);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        ctx.textAlign = "center";
        fillTextFitted(ctx, bUpper, pX + 270, 560, pW - 60);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 12px Montserrat, sans-serif";
        fillTextFitted(ctx, `DISPOSICIÓN OFICIAL EN ${i === 15 ? 'HORIZONTAL' : (i === 16 ? 'VERTICAL' : (i === 17 ? 'ICONO 1:1' : 'DOCUMENTAL'))}`, pX + 270, 588, pW - 60);
        ctx.textAlign = "left";

        drawEditorialBlock(pX + 24, 630, pW - 48, 226, "APLICACIÓN EN EL MUNDO REAL", "Norma de Uso del Logotipo", `En este pilar, la marca ${bName} se presenta con su logotipo en positivo sobre Lienzo Claro (#FFFFFF). Prohibido deformar el trazo o añadir cajas blancas que rompan el flujo visual.`, pal.pri);
        ctx.restore();

        // Columna Derecha: Contenido Editorial Profundo del Pilar
        const pdX = 620, pdW = 726;
        drawEditorialBlock(pdX, 160, pdW, 726, pilarBadges[pilarIndex - 1], pilarTitles[pilarIndex - 1], "", i % 2 === 0 ? pal.pri : pal.sec);

        // 3 Bloques Específicos de este Pilar
        const pilarSubBlocks = [
          [
            ["01 · DIAGNÓSTICO PROFUNDO", "Comprensión de Raíz", `Analizamos el contexto específico de cada cliente en ${sectorShort} para diseñar la solución exacta.`],
            ["02 · MÉTODO PROBADO", "Cero Improvisación", `Ejecutamos bajo el marco de 7 pasos de The Best Brand con estándares de clase mundial.`],
            ["03 · RESULTADO TANGIBLE", "Impacto Medible", `El cliente experimenta reducción inmediata de fricción operativa y claridad en su comunicación.`]
          ],
          [
            ["01 · ESCUCHA ACTIVA", "Atención sin Arrogancia", "Escuchamos primero la visión del cliente para profesionalizarla con rigor sin imponer caprichos."],
            ["02 · RESPUESTA RÁPIDA", "Cero Burocracia", "Canales directos de comunicación que eliminan intermediarios y resuelven dudas en minutos."],
            ["03 · LEALTAD MUTUA", "Alianza a Largo Plazo", "Construimos relaciones comerciales que perduran por años basadas en el respeto y la confianza."]
          ],
          [
            ["01 · REDUCCIÓN ESCALAR", "Nitidez a 16 Píxeles", "El símbolo mantiene su legibilidad óptica tanto en un rascacielos como en el favicon del navegador."],
            ["02 · OPTIMIZACIÓN MÓVIL", "Cero Latencia en Red", "Archivos SVG matemáticos ultra-ligeros (<15 KB) que cargan instantáneamente en 4G/5G."],
            ["03 · AVATARES Y REDES", "Ajuste Óptico Cuadrado", "Encuadre calibrado para círculos y cuadrados de WhatsApp Business, LinkedIn e Instagram."]
          ],
          [
            ["01 · VIGENCIA DOCUMENTAL", "Garantía de Marca", "Todos los archivos y fuentes quedan resguardados en el portal con validez permanente."],
            ["02 · ENTREGABLES NATIVOS", "Formatos Industriales", "Archivos listos para imprenta offset, serigrafía textil, corte láser y desarrollo web."],
            ["03 · AUDITORÍA ANUAL", "Evolución sin Costo", "Revisión anual para certificar que la marca siga alineada con las nuevas tecnologías."]
          ]
        ];

        pilarSubBlocks[pilarIndex - 1].forEach((sb, sbIdx) => {
          const sby = 246 + sbIdx * 206;
          drawRoundedRect(ctx, pdX + 24, sby, pdW - 48, 186, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = sbIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(pdX + 24, sby, 6, 186);

          ctx.fillStyle = sbIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11.5px Montserrat, sans-serif";
          fillTextFitted(ctx, sb[0], pdX + 44, sby + 32, pdW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 18px Montserrat, sans-serif";
          fillTextFitted(ctx, sb[1], pdX + 44, sby + 58, pdW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 13px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sb[2], pdX + 44, sby + 86, pdW - 88, 20, 4);
        });

      } else if (i === 19) {
        // LÁMINA 20: RETÍCULA CONSTRUCTIVA (8X × 8X) Y GEOMETRÍA EUCLIDIANA (MASSIMO VIGNELLI)
        // Izquierda: Plano Técnico de Construcción en Grilla 8x8 con Cotas en Cyan
        const gridX = 54, gridW = 740, gridH = 726;
        drawRoundedRect(ctx, gridX, 160, gridW, gridH, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = "#0284C7";
        ctx.fillRect(gridX, 160, gridW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(gridX + 8, 172, gridW - 16, gridH - 24);
        ctx.clip();

        // Malla cuadriculada 8x8
        const gCells = 8;
        const cellSize = 62;
        const startGX = gridX + (gridW - gCells * cellSize) / 2;
        const startGY = 210;

        ctx.strokeStyle = "#E0F2FE";
        ctx.lineWidth = 1;
        for (let r = 0; r <= gCells; r++) {
          ctx.beginPath();
          ctx.moveTo(startGX, startGY + r * cellSize);
          ctx.lineTo(startGX + gCells * cellSize, startGY + r * cellSize);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(startGX + r * cellSize, startGY);
          ctx.lineTo(startGX + r * cellSize, startGY + gCells * cellSize);
          ctx.stroke();
        }

        // Ejes principales en Cyan
        ctx.strokeStyle = "#0284C7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startGX, startGY + 4 * cellSize);
        ctx.lineTo(startGX + gCells * cellSize, startGY + 4 * cellSize);
        ctx.moveTo(startGX + 4 * cellSize, startGY);
        ctx.lineTo(startGX + 4 * cellSize, startGY + gCells * cellSize);
        ctx.stroke();

        // Círculos de radio constructivo
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(startGX + 4 * cellSize, startGY + 4 * cellSize, 3 * cellSize, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(startGX + 4 * cellSize, startGY + 4 * cellSize, 1.8 * cellSize, 0, Math.PI * 2);
        ctx.stroke();

        // Símbolo dibujado en el centro de la retícula
        drawLogoOrEmblem(startGX + 4 * cellSize - 110, startGY + 4 * cellSize - 110, 220, false);

        // Cotas milimétricas '8X' y '1X'
        ctx.fillStyle = "#0369A1";
        ctx.font = "800 12px JetBrains Mono, monospace";
        ctx.fillText("|<------------------------ 8X ------------------------>|", startGX, startGY + gCells * cellSize + 28);
        ctx.fillText("MODULO = 1X", startGX + gCells * cellSize + 14, startGY + 32);

        // Rótulo inferior técnico
        drawRoundedRect(ctx, gridX + 24, 755, gridW - 48, 105, isRect ? 4 : 12, "#F0F9FF", "#BAE6FD", 1.5);
        ctx.fillStyle = "#0369A1";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("PROPORCIÓN MATEMÁTICA Y PRECISIÓN VECTORIAL", gridX + 40, 782);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "500 12px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `La totalidad del símbolo se inscribe en un módulo cuadrado de 8X × 8X. Todos los ángulos y radios de curvatura derivan de múltiplos exactos de X, permitiendo una reproducción milimétrica en cualquier soporte físico o digital.`, gridX + 40, 804, gridW - 80, 18, 3);
        ctx.restore();

        // Derecha: Explicación de las Leyes de la Retícula
        const grX = 820, grW = 526;
        drawEditorialBlock(grX, 160, grW, 726, "EL CANON DE MASSIMO VIGNELLI", "Leyes de la Retícula Euclidiana", "", "#0284C7");

        const gridRules = [
          ["01 · EL MÓDULO BASE (1X)", "Unidad Mínima Inmutable", "El grosor del trazo principal define la variable matemática X. Ningún elemento puede trazarse fuera de esta proporción."],
          ["02 · RELACIÓN DE ALTURAS", "Simbolismo y Logotipo", "La altura del texto tipográfico corresponde exactamente a 2.5X respecto a la altura total del símbolo (8X)."],
          ["03 · ESPACIADO ÓPTICO (KERNING)", "Interletraje Calibrado", "El espacio entre caracteres está ajustado matemáticamente para mantener la legibilidad incluso a distancias mayores a 10 metros."],
          ["04 · CENTRO DE GRAVEDAD", "Equilibrio Físico y Visual", "El baricentro óptico del símbolo coincide con el cruce de las diagonales principales de la grilla 8x8."]
        ];

        gridRules.forEach((gr, gIdx) => {
          const gry = 246 + gIdx * 154;
          drawRoundedRect(ctx, grX + 24, gry, grW - 48, 138, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = "#0284C7";
          ctx.fillRect(grX + 24, gry, 6, 138);

          ctx.fillStyle = "#0284C7";
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, gr[0], grX + 44, gry + 30, grW - 88);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, gr[1], grX + 44, gry + 54, grW - 88);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, gr[2], grX + 44, gry + 78, grW - 88, 19, 3);
        });

      }
    """
