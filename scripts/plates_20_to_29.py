# -*- coding: utf-8 -*-
"""
Láminas 20 a 29: Del Área de Aislamiento al Colofón Institucional y Acta de Promulgación
"""

def get_plates_20_to_29():
    return """
      else if (i === 20) {
        // LÁMINA 21: ÁREA DE AISLAMIENTO (1.5X) Y SECCIÓN EN NEGATIVO CALADO (MASSIMO VIGNELLI & PAUL RAND)
        // Izquierda: Área de Aislamiento 1.5X con Cotas de Ingeniería sobre Lienzo Claro
        const isX = 54, isW = 630;
        drawRoundedRect(ctx, isX, 160, isW, 726, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);
        ctx.fillStyle = pal.pri;
        ctx.fillRect(isX, 160, isW, 8);

        ctx.save();
        ctx.beginPath();
        ctx.rect(isX + 8, 172, isW - 16, 706);
        ctx.clip();

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "ESPACIO DE GUARDA PERIMETRAL (1.5X)", isX + 24, 202, isW - 48);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 18px Montserrat, sans-serif";
        fillTextFitted(ctx, "Protección Contra Asfixia Visual", isX + 24, 228, isW - 48);

        // Bounding box punteado de aislamiento
        const bxX = isX + 105, bxY = 270, bxW = 420, bxH = 340;
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(bxX, bxY, bxW, bxH);
        ctx.setLineDash([]);

        // Flechas de cota 1.5X
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px JetBrains Mono, monospace";
        ctx.fillText("1.5X", bxX + bxW / 2 - 14, bxY - 10);
        ctx.fillText("1.5X", bxX + bxW / 2 - 14, bxY + bxH + 18);
        ctx.fillText("1.5X", bxX - 38, bxY + bxH / 2 + 4);
        ctx.fillText("1.5X", bxX + bxW + 8, bxY + bxH / 2 + 4);

        // Símbolo dentro del área segura
        drawLogoOrEmblem(bxX + 90, bxY + 50, 240, false);

        // Ficha técnica inferior
        drawRoundedRect(ctx, isX + 24, 650, isW - 48, 205, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "NORMA DE RESPETO PERIMETRAL", isX + 44, 680, isW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `El área de aislamiento equivale a 1.5 veces el módulo X del logotipo. Ningún texto, fotografía, borde o elemento gráfico puede invadir este espacio de guarda. Esta norma garantiza que el símbolo de ${bName} mantenga su respiración y destaque con máxima jerarquía sin competir con su entorno.`, isX + 44, 706, isW - 88, 19, 6);
        ctx.restore();

        // Derecha: Sección Oficial en Negativo Calado sobre Fondo Azul Noche
        const ngX = 710, ngW = 636;
        drawRoundedRect(ctx, ngX, 160, ngW, 726, isRect ? 4 : 20, pal.darkInk, pal.sec, 2.5);

        ctx.save();
        ctx.beginPath();
        ctx.rect(ngX + 8, 172, ngW - 16, 706);
        ctx.clip();

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "VERSIÓN EN NEGATIVO CALADO (SOPORTES OSCUROS)", ngX + 24, 202, ngW - 48);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 18px Montserrat, sans-serif";
        fillTextFitted(ctx, "Firma Oficial sobre Fondo Nocturno", ngX + 24, 228, ngW - 48);

        // Símbolo en negativo a gran escala
        drawLogoOrEmblem(ngX + (ngW - 270) / 2, 280, 270, true);

        // Ficha técnica de uso en negativo
        drawRoundedRect(ctx, ngX + 24, 610, ngW - 48, 245, isRect ? 4 : 14, "rgba(255,255,255,0.06)", "rgba(255,255,255,0.18)", 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        fillTextFitted(ctx, "REGLA SUPREMA: CERO PARCHES BLANCOS", ngX + 44, 642, ngW - 88);

        ctx.fillStyle = "#CBD5E1";
        ctx.font = "500 12.8px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Queda estrictamente prohibido encerrar el logotipo positivo dentro de cajas o parches blancos rectangulares cuando el soporte sea oscuro. Cuando el fondo sea ${pal.darkInk}, negro o fotográfico oscuro, se utiliza exclusivamente esta versión calada en negativo con trazos en blanco puro y acento en ${pal.sec}.`, ngX + 44, 668, ngW - 88, 19, 7);
        ctx.restore();

      } else if (i === 21) {
        // LÁMINA 22: USOS INCORRECTOS Y 6 RESTRICCIONES DE INTEGRIDAD VISUAL (MASSIMO VIGNELLI)
        // Cabezal Editorial
        drawEditorialBlock(54, 160, 1292, 140, "DISCIPLINA GRÁFICA Y BLINDAJE DE MARCA (MASSIMO VIGNELLI)", "Las 6 Prohibiciones Innegociables de Uso del Logotipo", `La consistencia visual es la barrera que protege a ${bName} de la degradación gráfica. Estas seis restricciones son de observancia obligatoria para cualquier colaborador, impresor o proveedor tecnológico externo. El logotipo no se interpreta: se reproduce de forma fidedigna.`, "#DC2626");

        // Matriz de 6 Infotargetas Vectoriales con Prohibiciones
        const infractions = [
          {
            num: "01",
            title: "Prohibido Deformar o Estirar",
            desc: "Bajo ninguna circunstancia se debe alterar la proporción horizontal o vertical (aspect ratio) del símbolo o del texto tipográfico.",
            drawInfraction: (ix, iy, iw, ih) => {
              // Dibujar logo estirado artificialmente
              ctx.save();
              ctx.scale(1.4, 0.7);
              drawLogoOrEmblem((ix + 20) / 1.4, (iy + 15) / 0.7, 54, false);
              ctx.restore();
            }
          },
          {
            num: "02",
            title: "Prohibido Rotar Arbitrariamente",
            desc: "El símbolo y el logotipo deben apoyarse siempre en un plano horizontal perfecto de 0°. Queda prohibido inclinarlo o girarlo.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.save();
              ctx.translate(ix + iw / 2, iy + ih / 2);
              ctx.rotate(0.35);
              drawLogoOrEmblem(-27, -27, 54, false);
              ctx.restore();
            }
          },
          {
            num: "03",
            title: "Prohibido Alterar la Paleta",
            desc: `No se permite aplicar colores ajenos a la paleta oficial (como rojos, verdes o degradados no autorizados fuera de ${pal.pri} y ${pal.sec}).`,
            drawInfraction: (ix, iy, iw, ih) => {
              drawRoundedRect(ctx, ix + iw / 2 - 27, iy + ih / 2 - 27, 54, 54, 8, "#EC4899", "#BE185D", 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.font = "900 16px Montserrat, sans-serif";
              ctx.fillText("!?", ix + iw / 2 - 9, iy + ih / 2 + 6);
            }
          },
          {
            num: "04",
            title: "Prohibido Sombras o Biseles",
            desc: "Cero sombras grises difusas, biseles 3D, relieves o efectos de iluminación artificial que rompan la pureza plana vectorial.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.fillStyle = "rgba(0,0,0,0.35)";
              ctx.beginPath();
              ctx.arc(ix + iw / 2 + 6, iy + ih / 2 + 6, 26, 0, Math.PI * 2);
              ctx.fill();
              drawLogoOrEmblem(ix + iw / 2 - 26, iy + ih / 2 - 26, 52, false);
            }
          },
          {
            num: "05",
            title: "Prohibido Parche Blanco en Oscuro",
            desc: "Nunca encerrar el logotipo positivo en una caja blanca sobre fondos oscuros. En fondos oscuros se usa la versión calada.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.fillStyle = "#0F172A";
              ctx.fillRect(ix + 16, iy + 10, iw - 32, ih - 20);
              drawRoundedRect(ctx, ix + iw / 2 - 32, iy + ih / 2 - 24, 64, 48, 4, "#FFFFFF", "#E2E8F0", 1);
              drawLogoOrEmblem(ix + iw / 2 - 18, iy + ih / 2 - 18, 36, false);
            }
          },
          {
            num: "06",
            title: "Prohibido Cambiar la Tipografía",
            desc: "No sustituir las familias oficiales (Montserrat y Plus Jakarta Sans) por tipografías genéricas como Arial, Times o Comic Sans.",
            drawInfraction: (ix, iy, iw, ih) => {
              ctx.fillStyle = "#991B1B";
              ctx.font = "italic 700 20px 'Times New Roman', serif";
              ctx.textAlign = "center";
              ctx.fillText(bName, ix + iw / 2, iy + ih / 2 + 7);
              ctx.textAlign = "left";
            }
          }
        ];

        infractions.forEach((inf, idx) => {
          const col = idx % 3;
          const row = Math.floor(idx / 3);
          const cxCard = 54 + col * 440;
          const cyCard = 320 + row * 280;

          drawRoundedRect(ctx, cxCard, cyCard, 412, 260, isRect ? 4 : 14, "#FEF2F2", "#FECACA", 1.5);
          ctx.fillStyle = "#DC2626";
          ctx.fillRect(cxCard, cyCard, 412, 5);

          // Escenario visual de infracción (Izquierda de tarjeta)
          const scX = cxCard + 16, scY = cyCard + 24, scW = 110, scH = 100;
          drawRoundedRect(ctx, scX, scY, scW, scH, 8, "#FFFFFF", "#FCA5A5", 1);
          inf.drawInfraction(scX, scY, scW, scH);

          // Símbolo de PROHIBIDO (Círculo rojo con barra diagonal)
          ctx.strokeStyle = "#DC2626";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(scX + scW / 2, scY + scH / 2, 34, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(scX + scW / 2 - 24, scY + scH / 2 - 24);
          ctx.lineTo(scX + scW / 2 + 24, scY + scH / 2 + 24);
          ctx.stroke();

          // Textos de infracción
          ctx.fillStyle = "#DC2626";
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, `RESTRICCIÓN ${inf.num}`, cxCard + 140, cyCard + 42, 250);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          drawWrappedText(ctx, inf.title, cxCard + 140, cyCard + 64, 250, 19, 2);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, inf.desc, cxCard + 16, cyCard + 146, 380, 18, 5);
        });

      } else if (i === 22) {
        // LÁMINA 23: PALETA CROMÁTICA OFICIAL (8 COLORES · PANTONE · CMYK · HEX · WCAG AAA)
        drawEditorialBlock(54, 160, 1292, 130, "INGENIERÍA KANSEI DEL COLOR (MITSUHIRO NAGAMACHI)", "Los 8 Tonos Oficiales del Sistema Cromático", `El color no decora: induce estados emocionales de certeza, autoridad y modernidad. Esta paleta de 8 tonos cuenta con fórmulas verificadas para impresión offset (Pantone & CMYK) y pantallas digitales (HEX & RGB), garantizando contraste accesible certificado WCAG AAA.`, pal.sec);

        const swatches = [
          { name: "01 · PRIMARIO OFICIAL", hex: pal.pri, pms: "Pantone 2945 C", role: "Identidad estructural, vectores principales y cabezales", pct: "20%" },
          { name: "02 · AZUL NOCHE PROFUNDO", hex: pal.darkInk, pms: "Pantone 534 C", role: "Tipografía de lectura, contraste y soporte negativo calado", pct: "70% Fondo" },
          { name: "03 · NARANJA ENERGÍA ACENTO", hex: pal.sec, pms: "Pantone 1585 C", role: "Descriptores, puntos de acción (CTA) y acentos focales", pct: "10%" },
          { name: "04 · AZUL ELÉCTRICO VIBRANTE", hex: pal.accentLight || "#4C9DE6", pms: "Pantone 2925 C", role: "Vínculos interactivos, badges y destellos tecnológicos", pct: "Acento" },
          { name: "05 · GRIS PIZARRA EJECUTIVO", hex: "#334155", pms: "Pantone 7546 C", role: "Párrafos secundarios, fichas técnicas y bordes sutiles", pct: "Neutro" },
          { name: "06 · GRIS MEDIO TÉCNICO", hex: "#707070", pms: "Pantone Cool Gray 8 C", role: "Líneas de cota, retículas de construcción y flechas", pct: "Neutro" },
          { name: "07 · LIENZO CLARO SUPERFICIE", hex: pal.softTint || "#F0F6FC", pms: "Pantone 656 C", role: "Fondos de tarjetas, paneles de lectura y tablas", pct: "Fondo Sec" },
          { name: "08 · BLANCO PURO LIENZO", hex: "#FFFFFF", pms: "Pantone Bright White", role: "Lienzo dominante (70% de la superficie) y respiración", pct: "70% Dom" }
        ];

        swatches.forEach((sw, idx) => {
          const col = idx % 4;
          const row = Math.floor(idx / 4);
          const sx = 54 + col * 328;
          const sy = 310 + row * 285;

          drawRoundedRect(ctx, sx, sy, 308, 265, isRect ? 4 : 16, "#FFFFFF", "#CBD5E1", 1.5);
          ctx.save();
          ctx.beginPath();
          ctx.rect(sx + 4, sy + 4, 300, 257);
          ctx.clip();

          // Muestra grande del color
          drawRoundedRect(ctx, sx + 14, sy + 14, 280, 110, isRect ? 3 : 10, sw.hex, "#CBD5E1", 1);

          ctx.fillStyle = sw.hex === "#FFFFFF" || sw.hex === pal.softTint ? "#0F172A" : "#FFFFFF";
          ctx.font = "800 11px JetBrains Mono, monospace";
          ctx.fillText(sw.hex, sx + 26, sy + 104);

          ctx.fillStyle = pal.sec;
          ctx.font = "800 10px Montserrat, sans-serif";
          fillTextFitted(ctx, sw.name, sx + 16, sy + 146, 276);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 14px Montserrat, sans-serif";
          fillTextFitted(ctx, sw.pms, sx + 16, sy + 168, 276);

          ctx.fillStyle = "#64748B";
          ctx.font = "600 10.5px JetBrains Mono, monospace";
          ctx.fillText(`RGB: ${hexToRgbStr(sw.hex)}`, sx + 16, sy + 192);
          ctx.fillText(`CMYK: ${hexToCmykStr(sw.hex)}`, sx + 16, sy + 210);

          ctx.fillStyle = "#334155";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, `${sw.role} (${sw.pct})`, sx + 16, sy + 230, 276, 16, 2);
          ctx.restore();
        });

      } else if (i === 23) {
        // LÁMINA 24: PROPORCIÓN DE LUZ (70/20/10) Y RECURSOS DE TRAZO (JONY IVE)
        // Cabezal Superior
        drawEditorialBlock(54, 160, 1292, 130, "ARQUITECTURA DE LA LUZ Y EL VACÍO (JONY IVE)", "La Regla de Oro de Luz: 70% Lienzo Claro · 20% Primario · 10% Acento", `El 70% de espacio en blanco (#FFFFFF) no es ausencia de diseño: es el aire y la respiración que otorga jerarquía a la solución de ${bName}. El 20% aporta la solidez institucional y el 10% focaliza la mirada en los puntos críticos de decisión.`, pal.pri);

        // Barra Monumental Proporcional de Luz
        const barX = 54, barY = 310, barW = 1292, barH = 100;
        drawRoundedRect(ctx, barX, barY, barW, barH, 18, "#FFFFFF", "#CBD5E1", 2);
        ctx.save();
        ctx.beginPath();
        ctx.rect(barX + 2, barY + 2, barW - 4, barH - 4);
        ctx.clip();

        // 70% Lienzo Claro
        ctx.fillStyle = "#F8FAFC";
        ctx.fillRect(barX, barY, barW * 0.70, barH);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 24px Montserrat, sans-serif";
        ctx.fillText("70% LIENZO CLARO (#FFFFFF)", barX + 32, barY + 58);
        ctx.font = "600 12px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Espacio de respiración, fondo dominante y limpieza absoluta", barX + 32, barY + 80);

        // 20% Primario
        ctx.fillStyle = pal.pri;
        ctx.fillRect(barX + barW * 0.70, barY, barW * 0.20, barH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 18px Montserrat, sans-serif";
        ctx.fillText("20% ESTRUCTURA", barX + barW * 0.70 + 20, barY + 54);
        ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`${pal.pri} · Identidad oficial`, barX + barW * 0.70 + 20, barY + 76);

        // 10% Acento
        ctx.fillStyle = pal.sec;
        ctx.fillRect(barX + barW * 0.90, barY, barW * 0.10, barH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 16px Montserrat, sans-serif";
        ctx.fillText("10%", barX + barW * 0.90 + 16, barY + 54);
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("ACENTO", barX + barW * 0.90 + 16, barY + 74);
        ctx.restore();

        // Mitad Inferior: Los 6 Recursos Gráficos en Curvas de The Best Brand
        const resX = 54, resW = 1292, resY = 440;
        drawEditorialBlock(resX, resY, resW, 446, "CATÁLOGO DE RECURSOS DE TRAZO", `El Sistema de ${dna.strokeLabel} de ${bName}`, "", pal.sec);

        const strokeResources = [
          ["01 · Curva Orbital Asimétrica", "Línea de flujo abierta que guía la lectura sin encasillar"],
          ["02 · Filete de Cota Técnico", "Líneas de 1.5 pt en color acento con nodos en los extremos"],
          ["03 · Contenedores Orgánicos", "Superficies con radio asimétrico que abrazan el contenido"],
          ["04 · Conectores de Trayectoria", "Trazos Bézier con derivaciones hacia hitos de avance"],
          ["05 · Marco Fotográfico Curvo", "Borde asimétrico que enmarca retratos sin cortar cabezas"],
          ["06 · Separador de Eje Limpio", "Línea arquitectónica de 1 pt con corte de color al 30%"]
        ];

        strokeResources.forEach((sr, sIdx) => {
          const col = sIdx % 3;
          const row = Math.floor(sIdx / 3);
          const rxCard = resX + 24 + col * 420;
          const ryCard = resY + 90 + row * 165;

          drawRoundedRect(ctx, rxCard, ryCard, 400, 145, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(rxCard, ryCard, 5, 145);

          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "800 11px Montserrat, sans-serif";
          fillTextFitted(ctx, sr[0], rxCard + 20, ryCard + 30, 360);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.5px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sr[1], rxCard + 20, ryCard + 54, 360, 18, 3);

          // Mini vector demostrativo
          ctx.strokeStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(rxCard + 20, ryCard + 120);
          ctx.bezierCurveTo(rxCard + 120, ryCard + 105, rxCard + 240, ryCard + 135, rxCard + 370, ryCard + 115);
          ctx.stroke();
        });

      } else if (i === 24) {
        // LÁMINA 25: SISTEMA TIPOGRÁFICO OFICIAL: FAMILIAS Y ESCALA (MASSIMO VIGNELLI & JONY IVE)
        // Columna Izquierda: Tipografía Principal Display (Montserrat)
        const tyX = 54, tyW = 630;
        drawEditorialBlock(tyX, 160, tyW, 726, "TIPOGRAFÍA PRINCIPAL DISPLAY (TITULARES)", "Montserrat · Fortaleza Geométrica y Elegancia", `Diseñada por Julieta Ulanovsky en Buenos Aires, inspirada en los letreros urbanos del siglo XX. Aporta autoridad inmutable, legibilidad a gran escala y solidez arquitectónica en titulares y logotipos.`, pal.pri);

        drawRoundedRect(ctx, tyX + 24, 280, tyW - 48, 240, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 48px Montserrat, sans-serif";
        ctx.fillText("Aa Gg Rr 99", tyX + 44, 345);

        ctx.fillStyle = pal.pri;
        ctx.font = "700 18px Montserrat, sans-serif";
        ctx.fillText("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", tyX + 44, 385);
        ctx.fillText("abcdefghijklmnñopqrstuvwxyz", tyX + 44, 415);
        ctx.fillText("0123456789 • !?@#$%&/()=", tyX + 44, 445);

        ctx.fillStyle = "#64748B";
        ctx.font = "600 11.5px JetBrains Mono, monospace";
        ctx.fillText("PESOS OFICIALES: 900 BLACK · 800 EXTRA BOLD · 700 BOLD", tyX + 44, 490);

        // Columna Izquierda Inferior: Párrafo de prueba Display
        drawRoundedRect(ctx, tyX + 24, 545, tyW - 48, 315, isRect ? 4 : 14, "#FFFFFF", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("ESCALA MODULAR DE TITULARES", tyX + 44, 575);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 28px Montserrat, sans-serif";
        fillTextFitted(ctx, `Titular H1: ${bUpper}`, tyX + 44, 615, tyW - 88);

        ctx.font = "800 20px Montserrat, sans-serif";
        fillTextFitted(ctx, `Subtítulo H2: Sistemas de Alta Precisión`, tyX + 44, 655, tyW - 88);

        ctx.font = "700 15px Montserrat, sans-serif";
        fillTextFitted(ctx, `Encabezado H3: Claridad Radical para ${sectorShort}`, tyX + 44, 695, tyW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Uso exclusivo en portadas, nombres de láminas, títulos de propuesta ejecutiva y cabezales comerciales. Nunca utilizar para bloques de texto corrido mayores a 3 líneas.`, tyX + 44, 735, tyW - 88, 18, 4);

        // Columna Derecha: Tipografía Secundaria de Lectura (Plus Jakarta Sans / Avenir Next)
        const trX = 710, trW = 636;
        drawEditorialBlock(trX, 160, trW, 726, "TIPOGRAFÍA SECUNDARIA DE LECTURA (TEXTO CORRIDO)", "Plus Jakarta Sans / Avenir Next · Claridad Suiza", `Familia geométrica neogrotesca calibrada para lectura prolongada en pantallas de alta densidad y documentos impresos. Garantiza fatiga visual cero y un flujo armónico en cuerpos de texto y tablas técnicas.`, pal.sec);

        drawRoundedRect(ctx, trX + 24, 280, trW - 48, 240, isRect ? 4 : 14, "#F8FAFC", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 48px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Ee Mm Kk 42", trX + 44, 345);

        ctx.fillStyle = pal.sec;
        ctx.font = "700 18px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ", trX + 44, 385);
        ctx.fillText("abcdefghijklmnñopqrstuvwxyz", trX + 44, 415);
        ctx.fillText("0123456789 • €$£¥«»—–§±≠", trX + 44, 445);

        ctx.fillStyle = "#64748B";
        ctx.font = "600 11.5px JetBrains Mono, monospace";
        ctx.fillText("PESOS OFICIALES: 600 SEMIBOLD · 500 MEDIUM · 400 REGULAR", trX + 44, 490);

        // Columna Derecha Inferior: Escala Modular de Párrafos y Jerarquía
        drawRoundedRect(ctx, trX + 24, 545, trW - 48, 315, isRect ? 4 : 14, "#FFFFFF", "#E2E8F0", 1.2);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("JERARQUÍA EDITORIAL DE LECTURA", trX + 44, 575);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "600 14.5px 'Plus Jakarta Sans', sans-serif";
        fillTextFitted(ctx, `Texto Lead (14 pt): Introducción ejecutiva con ritmo dinámico.`, trX + 44, 610, trW - 88);

        ctx.font = "500 12.5px 'Plus Jakarta Sans', sans-serif";
        fillTextFitted(ctx, `Cuerpo Principal (12 pt): Párrafos informativos con interlineado de 1.5x.`, trX + 44, 645, trW - 88);

        ctx.font = "400 10.5px 'Plus Jakarta Sans', sans-serif";
        fillTextFitted(ctx, `Texto Técnico (10 pt): Notas al pie, metadatos y citas metodológicas.`, trX + 44, 680, trW - 88);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Pangrama de validación de glifos: «El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja». Todas las tildes, signos y diéresis verificados.`, trX + 44, 725, trW - 88, 18, 5);

      } else if (i === 25) {
        // LÁMINA 26: LOS 6 SELLOS METODOLÓGICOS (PAUL RAND & MITSUHIRO NAGAMACHI)
        drawEditorialBlock(54, 160, 1292, 130, "SISTEMA DE CERTIFICACIÓN Y RIGOR TÉCNICO", "Los 6 Sellos Metodológicos Oficiales", `Rúbricas gráficas de garantía que avalan la integridad intelectual de cada solución desarrollada bajo el marco de The Best Brand. Se aplican en diplomas, portadas de propuestas, empaques y contratos formales.`, pal.sec);

        const seals = [
          { code: "SELLO 01", name: "Estrategia Socrática", author: "Simon Sinek", desc: "Certifica que la marca cuenta con propósito nuclear (Why) y alineación de causa.", icon: "WHY" },
          { code: "SELLO 02", name: "Geometría Euclidiana", author: "Massimo Vignelli", desc: "Aval de retícula constructiva 8X, proporciones exactas y vectores limpios.", icon: "8X" },
          { code: "SELLO 03", name: "Calibración Kansei", author: "Mitsuhiro Nagamachi", desc: "Garantía de respuesta emocional positiva, balance cromático y empatía humana.", icon: "KAN" },
          { code: "SELLO 04", name: "Arquitectura Monolítica", author: "David Aaker", desc: "Certificación de concentración de valor en un solo nombre sin submarcas forzadas.", icon: "MONO" },
          { code: "SELLO 05", name: "Auditoría Directiva C-00", author: "Consejo Crítico", desc: "Superación del estándar implacable de Steve Jobs: cero plantillas y cero relleno.", icon: "C-00" },
          { code: "SELLO 06", name: "Promulgación Oficial", author: "The Best Brand", desc: "Sello de vigencia constitucional e inmutabilidad de activos de marca.", icon: "LEX" }
        ];

        seals.forEach((sl, sIdx) => {
          const col = sIdx % 3;
          const row = Math.floor(sIdx / 3);
          const sx = 54 + col * 440;
          const sy = 310 + row * 285;

          drawRoundedRect(ctx, sx, sy, 412, 260, isRect ? 4 : 16, "#FFFFFF", "#CBD5E1", 1.5);
          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.fillRect(sx, sy, 412, 6);

          // Emblema circular del sello
          const scx = sx + 74, scy = sy + 80;
          ctx.strokeStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(scx, scy, 44, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = pal.softTint;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(scx, scy, 38, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = sIdx % 2 === 0 ? pal.pri : pal.sec;
          ctx.font = "900 13px Montserrat, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(sl.icon, scx, scy + 5);
          ctx.textAlign = "left";

          // Textos del sello
          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          fillTextFitted(ctx, sl.code, sx + 135, sy + 44, 250);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 16px Montserrat, sans-serif";
          fillTextFitted(ctx, sl.name, sx + 135, sy + 70, 250);

          ctx.fillStyle = "#64748B";
          ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, `Metodología: ${sl.author}`, sx + 135, sy + 92, 250);

          ctx.fillStyle = "#334155";
          ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, sl.desc, sx + 22, sy + 148, 368, 18, 5);
        });

      } else if (i === 26) {
        // LÁMINA 27: GOBERNANZA Y NORMA OFICIAL DE CO-BRANDING (REGLA MAX C-00)
        drawEditorialBlock(54, 160, 1292, 130, "GOBERNANZA DE IDENTIDAD DOCUMENTAL (MICHAEL PORTER & MARTY NEUMEIER)", "La Regla Max C-00 de Co-Branding y Preservación de Jerarquía", `Cuando ${bName} colabora con clientes, aliados o patrocinadores, la jerarquía visual debe ser nítida e inmutable. El logotipo del cliente o aliado jamás se mezcla ni se funde con los trazos de ${bName}: habita exclusivamente en una cápsula neutra aislada.`, pal.pri);

        // Mitad Inferior: Demostración Visual del Co-Branding en Cápsula Neutra
        const cbX = 54, cbW = 1292, cbY = 310;
        drawRoundedRect(ctx, cbX, cbY, cbW, 576, isRect ? 4 : 20, "#FFFFFF", "#CBD5E1", 2);

        // Lado Izquierdo: Logotipo Dominante de The Best Brand
        ctx.fillStyle = pal.sec;
        ctx.font = "800 12px Montserrat, sans-serif";
        ctx.fillText("MARCA RECTORA AUTÓNOMA (LIENZO CLARO DOMINANTE)", cbX + 44, cbY + 48);

        drawLogoOrEmblem(cbX + 80, cbY + 110, 240, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 32px Montserrat, sans-serif";
        ctx.fillText(bUpper, cbX + 360, cbY + 200);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 14px Plus Jakarta Sans, sans-serif";
        ctx.fillText(tagline.toUpperCase(), cbX + 360, cbY + 230);

        // Línea divisoria vertical de co-branding
        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cbX + cbW / 2 + 60, cbY + 40);
        ctx.lineTo(cbX + cbW / 2 + 60, cbY + 530);
        ctx.stroke();

        ctx.fillStyle = "#64748B";
        ctx.font = "800 16px Montserrat, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("EN ALIANZA CON", cbX + cbW / 2 + 60, cbY + 285);
        ctx.textAlign = "left";

        // Lado Derecho: La Cápsula Neutra Aislada del Aliado
        const capX = cbX + cbW / 2 + 130, capY = cbY + 120, capW = 440, capH = 260;
        drawRoundedRect(ctx, capX, capY, capW, capH, 16, "#F8FAFC", "#CBD5E1", 1.5);

        ctx.fillStyle = "#64748B";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("CÁPSULA NEUTRA AISLADA DEL CLIENTE O ALIADO", capX + 24, capY + 36);

        // Simulación de logo de cliente en caja neutra
        drawRoundedRect(ctx, capX + 30, capY + 60, capW - 60, 110, 8, "#FFFFFF", "#E2E8F0", 1);
        ctx.fillStyle = "#94A3B8";
        ctx.font = "800 18px Montserrat, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("[ LOGOTIPO DEL CLIENTE / PARTNER ]", capX + capW / 2, capY + 125);
        ctx.textAlign = "left";

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Aislamiento estricto: El logotipo del cliente no adopta la tipografía ni los colores de ${bName}, preservando al 100% su identidad original en su propio espacio.`, capX + 24, capY + 195, capW - 48, 17, 3);

        // Rótulo de directiva al pie
        drawRoundedRect(ctx, cbX + 44, cbY + 440, cbW - 88, 100, isRect ? 4 : 12, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("REGLA DOCUMENTAL MAX C-00 (VIGENTE)", cbX + 64, cbY + 468);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "500 12.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Todo documento emitido por ${bName} debe ejecutarse en Lienzo Claro (#FFFFFF) con logotipo en positivo. Si el documento es firmado por el cliente, se diseña enteramente bajo el manual del cliente sin mezclar estilos.`, cbX + 64, cbY + 490, cbW - 128, 18, 2);

      } else if (i === 27) {
        // LÁMINA 28: PAPELERÍA EN LIENZO CLARO Y APLICACIONES EJECUTIVAS (MARTY NEUMEIER & JONY IVE)
        drawEditorialBlock(54, 160, 1292, 130, "APLICACIONES FÍSICAS EN LIENZO CLARO", "Papelería Corporativa, Hojas Membretadas y Tarjetas Ejecutivas", `La experiencia táctil en el mundo real. Cada pieza física refleja el mismo rigor gráfico: papel opalina de alto gramaje, 70% de blanco puro, logotipo positivo y acentos precisos sin saturar.`, pal.sec);

        // Mockup Vectorial Izquierdo: Hoja Membretada Ejecutiva A4
        const letX = 54, letY = 310, letW = 520, letH = 576;
        drawRoundedRect(ctx, letX, letY, letW, letH, 16, "#FFFFFF", "#CBD5E1", 2);

        // Cabezal de carta membretada
        drawLogoOrEmblem(letX + 32, letY + 30, 48, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 14px Montserrat, sans-serif";
        ctx.fillText(bUpper, letX + 90, letY + 52);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 9.5px Plus Jakarta Sans, sans-serif";
        ctx.fillText(tagline.toUpperCase(), letX + 90, letY + 68);

        ctx.strokeStyle = "#CBD5E1";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(letX + 32, letY + 95);
        ctx.lineTo(letX + letW - 32, letY + 95);
        ctx.stroke();

        // Líneas de texto de carta simulada
        ctx.fillStyle = "#64748B";
        ctx.font = "600 10.5px JetBrains Mono, monospace";
        ctx.fillText("FECHA: NOVIEMBRE 2026 · CIUDAD DE MÉXICO", letX + 32, letY + 125);
        ctx.fillText("REF: PROPUESTA INTEGRAL DE MARCA", letX + 32, letY + 145);

        [185, 215, 245, 275, 305, 345, 375, 405, 435].forEach((ly, lIdx) => {
          ctx.fillStyle = lIdx === 0 ? pal.pri : (lIdx === 4 ? pal.sec : "#E2E8F0");
          ctx.fillRect(letX + 32, letY + ly, lIdx === 0 ? 180 : (lIdx % 3 === 0 ? letW - 120 : letW - 64), lIdx === 0 ? 8 : 6);
        });

        // Firma en carta
        ctx.fillStyle = pal.darkInk;
        ctx.font = "italic 700 13px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Jorge Benítez «El Oso»", letX + 32, letY + 500);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("FUNDADOR · IMPROBEARS & SUITE THE BEST", letX + 32, letY + 518);

        // Pie de membrete
        ctx.fillStyle = "#94A3B8";
        ctx.font = "500 9px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`www.${assets.cleanSlug}.com • contacto@${assets.cleanSlug}.com • Confidencial`, letX + 32, letY + 552);

        // Mockups Derechos: Tarjeta Ejecutiva (Frente y Vuelta) + Firma Digital
        const crdX = 600, crdW = 746, crdY = 310;

        // Tarjeta Frente (Lienzo Blanco)
        drawRoundedRect(ctx, crdX, crdY, 360, 210, 14, "#FFFFFF", "#CBD5E1", 2);
        drawLogoOrEmblem(crdX + 40, crdY + 55, 100, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 18px Montserrat, sans-serif";
        ctx.fillText(bUpper, crdX + 155, crdY + 105);
        ctx.fillStyle = pal.pri;
        ctx.font = "700 10.5px Plus Jakarta Sans, sans-serif";
        ctx.fillText(tagline.toUpperCase(), crdX + 155, crdY + 125);

        // Tarjeta Vuelta (Azul Noche Calado)
        drawRoundedRect(ctx, crdX + 386, crdY, 360, 210, 14, pal.darkInk, pal.sec, 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 14px Montserrat, sans-serif";
        ctx.fillText("JORGE BENÍTEZ «EL OSO»", crdX + 416, crdY + 55);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 10px Montserrat, sans-serif";
        ctx.fillText("CHIEF ARCHITECT & FOUNDER", crdX + 416, crdY + 75);

        ctx.fillStyle = "#CBD5E1";
        ctx.font = "500 10.5px JetBrains Mono, monospace";
        ctx.fillText("jorge.benitez@improbears.com", crdX + 416, crdY + 115);
        ctx.fillText("+52 55 1234 5678", crdX + 416, crdY + 135);
        ctx.fillText(`www.${assets.cleanSlug}.com`, crdX + 416, crdY + 155);

        // Firma Digital Ejecutiva de Correo (Inferior Derecha)
        drawRoundedRect(ctx, crdX, crdY + 235, crdW, 341, 16, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.pri;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("FIRMA DIGITAL HOMOLOGADA PARA CORREO ELECTRÓNICO", crdX + 30, crdY + 270);

        drawRoundedRect(ctx, crdX + 30, crdY + 290, crdW - 60, 165, 12, "#FFFFFF", "#E2E8F0", 1.5);
        drawLogoOrEmblem(crdX + 50, crdY + 320, 68, false);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 16px Montserrat, sans-serif";
        ctx.fillText("Equipo Directivo de " + bName, crdX + 135, crdY + 342);

        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText(`Especialistas en ${sectorShort}`, crdX + 135, crdY + 364);

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`Atención directa: contacto@${assets.cleanSlug}.com • WhatsApp 24/7 disponible`, crdX + 135, crdY + 392);
        ctx.fillText(`Sitio oficial: www.${assets.cleanSlug}.com`, crdX + 135, crdY + 414);

        ctx.fillStyle = "#64748B";
        ctx.font = "500 10.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Regla técnica: Todas las firmas de correo corporativo deben utilizar código HTML responsivo con imágenes alojadas en CDN SSL y tipografía web segura.`, crdX + 30, crdY + 480, crdW - 60, 17, 3);

      } else if (i === 28) {
        // LÁMINA 29: ECOSISTEMA DIGITAL Y CHECKLIST DE 10 CONTROLES DE INTEGRIDAD (MICHAEL PORTER)
        // Columna Izquierda: Mockups Digitales Responsivos (Desktop + Smartphone)
        const dX = 54, dW = 560;
        drawEditorialBlock(dX, 160, dW, 726, "RESPONSIVIDAD Y MOVILIDAD", "Adaptabilidad Digital en Cualquier Pantalla", `El sistema de diseño de ${bName} se adapta con fluidez desde monitores de escritorio ultrawide hasta pantallas compactas de smartphone. Los vectores matemáticos garantizan velocidad de carga instantánea y cero distorsión.`, pal.pri);

        // Ventana de navegador desktop vectorial
        const brX = dX + 30, brY = 320, brW = dW - 60, brH = 260;
        drawRoundedRect(ctx, brX, brY, brW, brH, 12, "#FFFFFF", "#CBD5E1", 2);

        // Barra superior de navegador
        ctx.fillStyle = "#F1F5F9";
        ctx.fillRect(brX, brY, brW, 36);
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(brX + 18, brY + 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#F59E0B";
        ctx.beginPath();
        ctx.arc(brX + 34, brY + 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(brX + 50, brY + 18, 5, 0, Math.PI * 2);
        ctx.fill();

        // Barra de URL
        drawRoundedRect(ctx, brX + 70, brY + 8, brW - 90, 20, 6, "#FFFFFF", "#CBD5E1", 1);
        ctx.fillStyle = "#64748B";
        ctx.font = "600 9.5px JetBrains Mono, monospace";
        ctx.fillText(`https://www.${assets.cleanSlug}.com`, brX + 85, brY + 22);

        // Contenido de la ventana web
        drawLogoOrEmblem(brX + 24, brY + 54, 42, false);
        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 15px Montserrat, sans-serif";
        ctx.fillText(bUpper, brX + 76, brY + 76);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 18px Montserrat, sans-serif";
        fillTextFitted(ctx, `Crea tu marca en minutos con Aura`, brX + 24, brY + 130, brW - 48);

        ctx.fillStyle = "#475569";
        ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Sin semanas de espera ni costos inflados. Tu Manual de 30 Hojas listo hoy mismo.`, brX + 24, brY + 155, brW - 48, 16, 2);

        drawRoundedRect(ctx, brX + 24, brY + 195, 140, 36, 18, pal.pri, pal.sec, 1.5);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("Probar Demo ↗", brX + 44, brY + 218);

        // Ficha inferior de velocidad
        drawRoundedRect(ctx, dX + 30, 610, dW - 60, 245, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 11px Montserrat, sans-serif";
        ctx.fillText("ESTÁNDAR DE RENDIMIENTO WEB", dX + 50, 642);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "800 15px Montserrat, sans-serif";
        ctx.fillText("Core Web Vitals 100/100 · Carga < 1.2s", dX + 50, 668);

        ctx.fillStyle = "#334155";
        ctx.font = "500 12.2px Plus Jakarta Sans, sans-serif";
        drawWrappedText(ctx, `Todos los activos SVG y estilos CSS están minificados y optimizados para garantizar que la plataforma obtenga puntuaciones perfectas en Google PageSpeed y sea indexada con máxima prioridad en motores de búsqueda.`, dX + 50, 694, dW - 100, 18, 6);

        // Columna Derecha: Checklist de los 10 Controles de Integridad Digital
        const chX = 640, chW = 706;
        drawEditorialBlock(chX, 160, chW, 726, "AUDITORÍA TÉCNICA DE 10 CONTROLES", "Checklist de Verificación de Integridad Digital (10/10)", "", pal.sec);

        const checkList = [
          ["CONTROL 01", "Favicon 1:1 en formato .ICO y .PNG a 16px, 32px y 48px con nitidez absoluta."],
          ["CONTROL 02", "OpenGraph Card para previsualización impecable al compartir enlaces en WhatsApp y LinkedIn."],
          ["CONTROL 03", "Tipografía web con carga asíncrona (font-display: swap) para evitar saltos de maquetación."],
          ["CONTROL 04", "Contraste accesible nivel WCAG AAA en todos los botones y textos informativos."],
          ["CONTROL 05", "Modo Oscuro nativo utilizando la versión en negativo calado sobre fondos nocturnos."],
          ["CONTROL 06", "Iconos de aplicación móvil en proporción 1:1 listos para iOS App Store y Google Play."],
          ["CONTROL 07", "Archivos SVG depurados con rutas simplificadas y peso menor a 15 KB por archivo."],
          ["CONTROL 08", "Seguridad SSL obligatoria y encabezados de protección CSP contra inyección de código."],
          ["CONTROL 09", "Firma HTML corporativa homologada para todos los buzones de correo institucionales."],
          ["CONTROL 10", "Bóveda de activos en la nube con acceso permanente para clientes y proveedores certificados."]
        ];

        checkList.forEach((ck, cIdx) => {
          const cky = 246 + cIdx * 62;
          drawRoundedRect(ctx, chX + 24, cky, chW - 48, 54, isRect ? 3 : 10, "#F8FAFC", "#E2E8F0", 1);

          ctx.fillStyle = "#10B981";
          ctx.font = "900 15px Montserrat, sans-serif";
          ctx.fillText("✓", chX + 40, cky + 33);

          ctx.fillStyle = pal.pri;
          ctx.font = "800 11px Montserrat, sans-serif";
          ctx.fillText(ck[0], chX + 68, cky + 24);

          ctx.fillStyle = "#334155";
          ctx.font = "500 11.5px Plus Jakarta Sans, sans-serif";
          fillTextFitted(ctx, ck[1], chX + 160, cky + 24, chW - 220);

          ctx.fillStyle = "#047857";
          ctx.font = "800 10px JetBrains Mono, monospace";
          ctx.fillText("CERTIFICADO", chX + chW - 130, cky + 33);
        });

      } else if (i === 29) {
        // LÁMINA 30: COLOFÓN INSTITUCIONAL Y CERTIFICADO DE PROMULGACIÓN (MARTY NEUMEIER & MICHAEL PORTER)
        // Gran Marco de Certificado Oficial con Doble Filete en Oro y Navy
        const certX = 54, certY = 160, certW = 1292, certH = 726;
        drawRoundedRect(ctx, certX, certY, certW, certH, isRect ? 4 : 24, "#FFFFFF", pal.pri, 3);

        ctx.save();
        ctx.beginPath();
        ctx.rect(certX + 10, certY + 10, certW - 20, certH - 20);
        ctx.clip();

        // Filete interior dorado/secundario
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(certX + 18, certY + 18, certW - 36, certH - 36);

        // Sello de agua central sutil
        ctx.save();
        ctx.globalAlpha = 0.04;
        drawLogoOrEmblem(certX + certW / 2 - 200, certY + certH / 2 - 200, 400, false);
        ctx.restore();

        // Cabezal del Certificado
        ctx.textAlign = "center";
        ctx.fillStyle = pal.sec;
        ctx.font = "800 13px Montserrat, sans-serif";
        ctx.fillText("REPÚBLICA EDITORIAL DE MARCA · THE BEST BRAND", certX + certW / 2, certY + 70);

        ctx.fillStyle = pal.darkInk;
        ctx.font = "900 36px Montserrat, sans-serif";
        ctx.fillText("ACTA DE CONSTITUCIÓN Y PROMULGACIÓN DE MARCA", certX + certW / 2, certY + 115);

        ctx.fillStyle = pal.pri;
        ctx.font = "700 15px Plus Jakarta Sans, sans-serif";
        ctx.fillText(`Manual Oficial de 30 Láminas en Curvas — Edición Maestra para ${bUpper}`, certX + certW / 2, certY + 145);

        // Texto formal de promulgación
        ctx.fillStyle = "#334155";
        ctx.font = "500 13.5px Plus Jakarta Sans, sans-serif";
        const declX = certX + 120, declW = certW - 240;
        const textDecl = `Por medio del presente documento, se certifica que la identidad visual, el propósito nuclear, la arquitectura de marca y las normas de ingeniería gráfica contenidas en este manual de 30 láminas han sido plenamente promulgadas y homologadas para ${bName}. A partir de esta fecha, este sistema constituye el estándar inmutable y rector para todas las aplicaciones físicas, digitales, comerciales y jurídicas de la organización, quedando prohibida cualquier desviación que comprometa su integridad.`;
        drawWrappedText(ctx, textDecl, declX, certY + 195, declW, 22, 5);

        // 3 Bloques de Certificación Formal
        const certBlocks = [
          ["AUTORÍA INTELECTUAL", "Ingeniería de Acqua e ImproBears", "Marco de 7 pasos fundamentado en Sinek, Carlzon, Vignelli, Rand y Neumeier."],
          ["ARQUITECTURA DE MARCA", dna.archTitle, `Operación concentrada en marca única sin dispersión de capital en submarcas.`],
          ["FORMATO Y VIGENCIA", "ISO 32000-1 (.PDF Vectorial)", "Vectores matemáticos en curvas puras sin pérdida de resolución a perpetuidad."]
        ];

        certBlocks.forEach((cb, cIdx) => {
          const bx = certX + 60 + cIdx * 395;
          const by = certY + 340;
          drawRoundedRect(ctx, bx, by, 380, 130, isRect ? 4 : 14, "#F8FAFC", pal.softTint, 1.5);
          ctx.fillStyle = pal.sec;
          ctx.font = "800 10.5px Montserrat, sans-serif";
          ctx.fillText(cb[0], bx + 20, by + 30);

          ctx.fillStyle = pal.darkInk;
          ctx.font = "800 15px Montserrat, sans-serif";
          fillTextFitted(ctx, cb[1], bx + 20, by + 56, 340);

          ctx.fillStyle = "#475569";
          ctx.font = "500 12px Plus Jakarta Sans, sans-serif";
          drawWrappedText(ctx, cb[2], bx + 20, by + 80, 340, 17, 2);
        });

        // Firmas Oficiales y Sello al pie del certificado
        const sigY = certY + 540;

        // Firma 1: Fundador
        ctx.strokeStyle = pal.darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(certX + 140, sigY + 60);
        ctx.lineTo(certX + 440, sigY + 60);
        ctx.stroke();

        ctx.fillStyle = pal.darkInk;
        ctx.font = "italic 700 18px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Jorge Benítez «El Oso»", certX + 290, sigY + 45);

        ctx.font = "800 11.5px Montserrat, sans-serif";
        ctx.fillText("JORGE BENÍTEZ «EL OSO»", certX + 290, sigY + 80);
        ctx.fillStyle = pal.sec;
        ctx.font = "700 10px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Fundador · ImproBears & Suite The Best", certX + 290, sigY + 96);

        // Sello Central de Certificación
        const selCX = certX + certW / 2, selCY = sigY + 50;
        ctx.strokeStyle = pal.pri;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(selCX, selCY, 48, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = pal.sec;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(selCX, selCY, 42, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = pal.pri;
        ctx.font = "900 12px Montserrat, sans-serif";
        ctx.fillText("PROMULGADO", selCX, selCY - 4);
        ctx.fillStyle = pal.sec;
        ctx.font = "800 9.5px JetBrains Mono, monospace";
        ctx.fillText("OFICIAL 2026", selCX, selCY + 12);

        // Firma 2: Mentor / Arquitecto de Marca
        ctx.strokeStyle = pal.darkInk;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(certX + certW - 440, sigY + 60);
        ctx.lineTo(certX + certW - 140, sigY + 60);
        ctx.stroke();

        ctx.fillStyle = pal.darkInk;
        ctx.font = "italic 700 18px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Aura Brand Architect", certX + certW - 290, sigY + 45);

        ctx.font = "800 11.5px Montserrat, sans-serif";
        ctx.fillText("AURA · MENTORA DE IDENTIDAD", certX + certW - 290, sigY + 80);
        ctx.fillStyle = pal.sec;
        ctx.font = "700 10px Plus Jakarta Sans, sans-serif";
        ctx.fillText("Motor Algorítmico de Síntesis de Marca", certX + certW - 290, sigY + 96);

        // Hash de Verificación Criptográfica al fondo
        ctx.fillStyle = "#94A3B8";
        ctx.font = "600 9.5px JetBrains Mono, monospace";
        ctx.fillText(`HASH DE VERIFICACIÓN: SHA256-${bUpper.slice(0, 4)}-${Date.now().toString(16).toUpperCase()}-V71 · EMISIÓN LEGAL REGISTRADA`, certX + certW / 2, certY + certH - 30);
        ctx.textAlign = "left";
        ctx.restore();

      }
    """
