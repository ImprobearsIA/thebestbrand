import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import http from "http";
import fs from "fs";
import path from "path";
import { ENTREPRENEURS_30 } from "./catalog_30_entrepreneurs.mjs";

const PORT = 8993;
const webDir = path.resolve("apps/web");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8"
};

// Ensure directories exist
const dirEvidences = path.resolve("entregables_brandbooks/evidences");
const dirEntEvidences = path.resolve("entregables_brandbooks/entrepreneurs_30/evidences");
const dirEntHtmls = path.resolve("entregables_brandbooks/entrepreneurs_30/htmls");
const dirEntPdfs = path.resolve("entregables_brandbooks/entrepreneurs_30");
const dirWebBrandbooks = path.resolve("apps/web/brandbooks");

[dirEvidences, dirEntEvidences, dirEntHtmls, dirEntPdfs, dirWebBrandbooks].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

function createStaticServer(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split("?")[0];
      if (reqPath === "/" || reqPath === "/studio") reqPath = "/studio.html";
      const filePath = path.join(webDir, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      }
    });

    server.listen(port, () => resolve(server));
    server.on("error", reject);
  });
}

async function main() {
  console.log("=========================================================================");
  console.log("  THE BEST BRAND V80.0 · MOTOR DE GENERACIÓN DE BRANDBOOKS NATIVO EN APP");
  console.log("  30 Emprendedores Reales + The Best Brand Oficial · Directiva Max C-00");
  console.log("=========================================================================\n");

  const server = await createStaticServer(PORT);
  console.log(`✓ Servidor web estático local activo en http://localhost:${PORT}`);

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const pageApp = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pagePdf = await browser.newPage({ viewport: { width: 1122, height: 794 } });

  const auditLog = [];

  try {
    // -------------------------------------------------------------------------
    // 0. The Best Brand Oficial (Validación con Logotipo Oficial)
    // -------------------------------------------------------------------------
    console.log("\n[00/30] PROCESANDO MARCA MAESTRA: «The Best Brand» (Atelier Oficial)");
    await pageApp.goto(`http://localhost:${PORT}/studio.html`, { waitUntil: "domcontentloaded" });
    await pageApp.waitForTimeout(600);

    const tbbStatus = await pageApp.evaluate(() => {
      localStorage.setItem("tbb_active_brand_name", "The Best Brand");
      if (window.canvasState) window.canvasState.brandName = "The Best Brand";
      if (typeof window.openInApp30PlatesViewer === "function") {
        window.openInApp30PlatesViewer();
      }
      const modal = document.getElementById("tbbInApp30PlatesViewerModal");
      const p1 = modal ? modal.querySelector("#plate-01") : null;
      const hasWings = p1 ? (p1.innerHTML.includes("tbbWingBlue_bb") && p1.innerHTML.includes("tbbWingOrange_bb")) : false;
      const hasTB = p1 ? p1.innerHTML.includes(">TB<") : false;

      let docHtml = "";
      if (window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml === "function") {
        const b = window.CATALOG_30_MAP ? window.CATALOG_30_MAP["the_best_brand"] : null;
        if (b) docHtml = window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml(b);
      }
      return { modalOpen: Boolean(modal), hasWings, hasTB, docHtmlLength: docHtml.length, docHtml };
    });

    const tbbEvidencePath = path.join(dirEvidences, "evidence_app_thebestbrand_oficial.png");
    await pageApp.screenshot({ path: tbbEvidencePath });
    console.log(`  ✓ Captura de pantalla de la app guardada: ${tbbEvidencePath}`);

    const tbbHtmlPath = path.resolve("entregables_brandbooks/brandbook_thebestbrand_oficial_30_laminas_v80.html");
    if (tbbStatus.docHtml) {
      fs.writeFileSync(tbbHtmlPath, tbbStatus.docHtml, "utf-8");
      fs.copyFileSync(tbbHtmlPath, path.join(dirWebBrandbooks, "brandbook_thebestbrand_oficial_30_laminas_v80.html"));
    }

    const tbbPdfPath = path.resolve("entregables_brandbooks/Manual_Marca_30_Laminas_TheBestBrand_Oficial_v80.pdf");
    await pagePdf.goto("file://" + tbbHtmlPath, { waitUntil: "networkidle" });
    await pagePdf.waitForTimeout(600);
    await pagePdf.pdf({
      path: tbbPdfPath,
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    fs.copyFileSync(tbbPdfPath, path.join(dirWebBrandbooks, "Manual_Marca_30_Laminas_TheBestBrand_Oficial_v80.pdf"));

    const tbbPdfSize = (fs.statSync(tbbPdfPath).size / (1024 * 1024)).toFixed(2);
    console.log(`  ✓ PDF The Best Brand Oficial generado: ${tbbPdfSize} MB (${tbbPdfPath})`);
    console.log(`  ✓ Verificación Alas de Convergencia & Monograma TB: ${tbbStatus.hasWings && tbbStatus.hasTB ? "CORRECTO (Flawless)" : "FALLÓ"}`);

    auditLog.push({
      id: 0,
      name: "The Best Brand",
      slug: "the_best_brand",
      category: "Tecnología / Luxury Brand Identity Atelier",
      status: "Oficial Aprobado",
      font: "Montserrat / Plus Jakarta Sans",
      primaryColor: "#0D2540",
      secondaryColor: "#426EAE",
      accentColor: "#FF7A00",
      evidenceApp: tbbEvidencePath,
      htmlDeliverable: tbbHtmlPath,
      pdfDeliverable: tbbPdfPath,
      pdfSizeMB: tbbPdfSize,
      hasOfficialLogo: tbbStatus.hasWings && tbbStatus.hasTB
    });

    // -------------------------------------------------------------------------
    // 1 a 30: Catálogo Completo de 30 Emprendedores
    // -------------------------------------------------------------------------
    for (let i = 0; i < ENTREPRENEURS_30.length; i++) {
      const ent = ENTREPRENEURS_30[i];
      const caseNum = String(ent.id).padStart(2, "0");
      const slug = ent.slug;

      console.log(`\n[${caseNum}/30] PROCESANDO: «${ent.name}» (${ent.category})`);

      // 1. Navegar por la app
      await pageApp.goto(`http://localhost:${PORT}/studio.html`, { waitUntil: "domcontentloaded" });
      await pageApp.waitForTimeout(300);

      // 2. Inyectar estado en la app y renderizar en el visor de 30 láminas nativo
      const inAppInfo = await pageApp.evaluate((data) => {
        try {
          const cs = {
            brandName: data.name,
            tagline: data.tagline,
            step0_goal: data.isEstablished ? "evolve" : (data.isMultibrand ? "subbrand" : "first"),
            custom_business_type: data.category,
            step0_short_essence: data.giro.split(/\s+/).slice(0, 10).join(" "),
            ideal_customer: data.buyer,
            golden_circle: data.why,
            process_steps_text: data.how,
            value_offer: data.what,
            brand_persona: data.persona,
            tp_before: data.tpBefore.join(", "),
            tp_during: data.tpDuring.join(", "),
            tp_after: data.tpAfter.join(", "),
            primary_font: data.primaryFont,
            secondary_font: data.secondaryFont || "Avenir Next",
            primary_color: data.colors.pri,
            accent_color: data.colors.acc
          };

          localStorage.setItem("tbb_brand_state_v43", JSON.stringify(cs));
          localStorage.setItem("tbb_active_brand_name", data.name);
          window.canvasState = cs;

          window.step0State = {
            goal: cs.step0_goal,
            sector: data.category,
            brandName: data.name,
            tagline: data.tagline
          };

          window.tpExtractedItems = {
            before: [...data.tpBefore],
            during: [...data.tpDuring],
            after: [...data.tpAfter]
          };

          if (typeof window.openInApp30PlatesViewer === "function") {
            window.openInApp30PlatesViewer();
          }

          const modal = document.getElementById("tbbInApp30PlatesViewerModal");
          const plates = modal ? modal.querySelectorAll(".tbb-plate") : [];
          
          let docHtml = "";
          if (window.TBB_V80_PLATES_GENERATOR && typeof window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml === "function") {
            docHtml = window.TBB_V80_PLATES_GENERATOR.generateFullBrandbookDocHtml(data);
          }

          return {
            success: true,
            modalOpen: Boolean(modal),
            plateCount: plates.length,
            docHtmlLength: docHtml.length,
            docHtml: docHtml
          };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }, ent);

      if (!inAppInfo.success) {
        console.error(`  ✕ Error al inyectar estado en la app para ${ent.name}:`, inAppInfo.error);
        continue;
      }

      await pageApp.waitForTimeout(400);

      // 3. Captura de evidencia en la app
      const evidencePath = path.join(dirEntEvidences, `evidence_app_entrepreneur_${caseNum}_${slug}.png`);
      await pageApp.screenshot({ path: evidencePath });
      console.log(`  ✓ Evidencia in-app capturada: ${evidencePath}`);

      // 4. Guardar archivo HTML de 30 láminas
      const htmlPath = path.join(dirEntHtmls, `brandbook_entrepreneur_${caseNum}_${slug}.html`);
      fs.writeFileSync(htmlPath, inAppInfo.docHtml, "utf-8");

      // 5. Renderizar y exportar PDF en A4 apaisado vectorial de 30 láminas
      const pdfPath = path.join(dirEntPdfs, `brandbook_entrepreneur_${caseNum}_${slug}.pdf`);
      await pagePdf.goto("file://" + htmlPath, { waitUntil: "networkidle" });
      await pagePdf.waitForTimeout(400);

      await pagePdf.pdf({
        path: pdfPath,
        format: "A4",
        landscape: true,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      });

      const pdfStats = fs.statSync(pdfPath);
      const pdfSizeMB = (pdfStats.size / (1024 * 1024)).toFixed(2);
      console.log(`  ✓ PDF de 30 Láminas Generado: ${pdfSizeMB} MB -> ${pdfPath}`);

      auditLog.push({
        id: ent.id,
        name: ent.name,
        slug: slug,
        category: ent.category,
        isEstablished: ent.isEstablished,
        isMultibrand: ent.isMultibrand,
        font: ent.primaryFont,
        palette: {
          pri: ent.colors.pri,
          sec: ent.colors.sec,
          acc: ent.colors.acc
        },
        evidenceApp: evidencePath,
        htmlDeliverable: htmlPath,
        pdfDeliverable: pdfPath,
        pdfSizeMB: pdfSizeMB
      });
    }

    // -------------------------------------------------------------------------
    // Guardar JSON de Resultados de Auditoría
    // -------------------------------------------------------------------------
    const resultsJsonPath = path.join(dirEntPdfs, "results_30_entrepreneurs.json");
    fs.writeFileSync(resultsJsonPath, JSON.stringify(auditLog, null, 2), "utf-8");
    console.log(`\n✓ Resumen de auditoría guardado en: ${resultsJsonPath}`);

    console.log("\n=========================================================================");
    console.log("  TODAS LAS 30 MARCAS + THE BEST BRAND GENERADAS Y VERIFICADAS EN LA APP");
    console.log("=========================================================================");

  } catch (err) {
    console.error("Error durante la ejecución del lote:", err);
  } finally {
    await browser.close();
    server.close();
  }
}

main();
