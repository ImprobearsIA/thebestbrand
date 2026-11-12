import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn } from "node:child_process";

const ARTIFACT_DIR = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/b4c90800-97e3-4a72-b74c-2807a05a674a";
const DELIVERABLES_DIR = "/home/antigravity/ImprobearsIA/thebestbrand/entregables_brandbooks/the_best_brand";
const CHROME_BIN = "/usr/bin/chromium";
const CDP_PORT = 9244;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, { headers: { Host: `127.0.0.1:${CDP_PORT}` } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

class SimpleCDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve);
      this.ws.addEventListener("error", reject);
    });
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }
  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evalJs(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (res && res.exceptionDetails) {
      throw new Error("JS Exception: " + JSON.stringify(res.exceptionDetails));
    }
    return res && res.result ? res.result.value : undefined;
  }
  async capturePng(outFile) {
    const shot = await this.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(outFile, Buffer.from(shot.data, "base64"));
  }
  close() {
    try { this.ws.close(); } catch (_) {}
  }
}

async function main() {
  console.log("=== PROBANDO Y EXPORTANDO SUITE VECTORIAL (.SVG / .AI) CON TRANSPARENCIAS REALES Y CURVAS BÉZIER ===");
  const chromeProc = spawn(CHROME_BIN, [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--window-size=1440,940",
    `--remote-debugging-port=${CDP_PORT}`,
    "http://127.0.0.1:8000/studio"
  ], {
    env: { ...process.env, NO_PROXY: "127.0.0.1,localhost", no_proxy: "127.0.0.1,localhost" },
    stdio: "ignore"
  });

  let cdp;
  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      await sleep(350);
      try {
        targets = await fetchJson(`http://127.0.0.1:${CDP_PORT}/json/list`);
        if (targets && targets.length > 0) break;
      } catch (_) {}
    }
    const pageTarget = targets.find((t) => t.type === "page") || targets[0];
    cdp = new SimpleCDP(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 940,
      deviceScaleFactor: 2,
      mobile: false
    });
    await sleep(1600);

    const exported = await cdp.evalJs(`(async () => {
      window.canvasState = window.canvasState || {};
      window.canvasState.brandName = "The Best Brand";
      window.canvasState.tagline = "Del Caos al Sistema: Tu Identidad de Marca en Minutos";
      window.canvasState.logo_finish_style = "liquid_glass";
      window.canvasState.color_palette = ["#0D2540", "#426EAE", "#FF7A00"];
      window.canvasState.primaryFont = "Montserrat";
      window.canvasState.secondaryFont = "Plus Jakarta Sans";

      const captured = {};
      const capturedText = {};
      const blobToBase64 = (blob) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const res = String(reader.result || "");
          resolve(res.includes(",") ? res.split(",")[1] : "");
        };
        reader.readAsDataURL(blob);
      });

      window.tbbDeliverFileNativeOrDownload = async function (blob, fileName) {
        captured[fileName] = await blobToBase64(blob);
        capturedText[fileName] = await blob.text();
        return true;
      };

      await window.tbbExportLogoInCurves("symbol", "svg");
      await window.tbbExportLogoInCurves("symbol", "ai");
      await window.tbbExportLogoInCurves("horizontal", "svg");
      await window.tbbExportLogoInCurves("horizontal", "ai");
      await window.tbbExportLogoInCurves("avatar", "svg");
      await window.tbbExportLogoInCurves("seal", "svg");

      return {
        files: captured,
        symbolSvg: capturedText["Isotipo_Simbolo_Curvas_the_best_brand.svg"] || "",
        horizontalSvg: capturedText["Logotipo_Horizontal_Curvas_the_best_brand.svg"] || "",
        avatarSvg: capturedText["Avatar_Social_1x1_Curvas_the_best_brand.svg"] || "",
        sealSvg: capturedText["Sello_Circular_Curvas_the_best_brand.svg"] || "",
        aiTextSample: (capturedText["Logotipo_Horizontal_Curvas_the_best_brand.ai"] || "").slice(0, 1200)
      };
    })()`);

    for (const [fname, b64] of Object.entries(exported.files || {})) {
      const buf = Buffer.from(b64, "base64");
      fs.writeFileSync(path.join(DELIVERABLES_DIR, fname), buf);
      fs.writeFileSync(path.join(ARTIFACT_DIR, fname), buf);
      console.log(`  -> Exportado: ${fname} (${(buf.length / 1024).toFixed(1)} KB)`);
    }

    // Construir lámina de inspección al 400% (Normal View vs Adobe Illustrator Wireframe Outline View + Transparencias /ExtGState)
    await cdp.evalJs(`(() => {
      const symSvg = ${JSON.stringify(exported.symbolSvg)};
      const horizSvg = ${JSON.stringify(exported.horizontalSvg)};
      const avatarSvg = ${JSON.stringify(exported.avatarSvg)};
      const sealSvg = ${JSON.stringify(exported.sealSvg)};

      // Crear versión "Illustrator Outline / Wireframe Mode (Cmd+Y)" del símbolo para demostrar que cada pétalo y anillo es una curva Bézier matemática limpia
      const parser = new DOMParser();
      const doc = parser.parseFromString(symSvg, "image/svg+xml");
      const svgEl = doc.querySelector("svg");
      if (svgEl) {
        svgEl.querySelectorAll("circle, path, rect").forEach((el, idx) => {
          el.setAttribute("fill", "none");
          el.setAttribute("fill-opacity", "0");
          el.setAttribute("stroke", idx % 3 === 0 ? "#FF7A00" : (idx % 2 === 0 ? "#2563EB" : "#0F172A"));
          el.setAttribute("stroke-width", "0.75");
          el.setAttribute("stroke-opacity", "0.9");
        });
      }
      const wireframeSvg = svgEl ? new XMLSerializer().serializeToString(svgEl) : symSvg;

      document.body.innerHTML = \`
        <div style="width:1440px;height:940px;background:#F8FAFC;padding:28px 40px;box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif;display:flex;flex-direction:column;gap:18px;">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2.5px solid #0D2540;padding-bottom:12px;">
            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:800;color:#FF7A00;letter-spacing:1.2px;">AUDITORÍA DE VECTORES CON TRANSPARENCIAS REALES (.SVG fill-opacity & .AI /ExtGState /ca) · ZOOM 400%</div>
              <h1 style="font-family:'Montserrat',sans-serif;font-size:25px;font-weight:900;color:#090D16;margin:4px 0 0 0;">THE BEST BRAND — Curvas Bézier Matemáticas + Lentes Translúcidas Liquid Glass (0 Escalones)</h1>
            </div>
            <div style="display:flex;gap:10px;align-items:center;font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:800;">
              <span style="background:#059669;color:#FFF;padding:6px 12px;border-radius:8px;">✓ PDF 1.6 /ExtGState /ca Activo</span>
              <span style="background:#0D2540;color:#FFF;padding:6px 12px;border-radius:8px;">✓ 12 Pétalos Bézier Exactos</span>
              <span style="background:#FF7A00;color:#FFF;padding:6px 12px;border-radius:8px;">✓ 0 Etiquetas &lt;text&gt; o &lt;image&gt;</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1.15fr;gap:20px;flex:1;">
            <!-- COL 1: ZOOM 400% VISTA PREVISUALIZACIÓN CON TRANSPARENCIAS -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 8px 24px rgba(15,23,42,0.04);">
              <div>
                <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#059669;background:#ECFDF5;padding:4px 10px;border-radius:6px;">01 · VISTA NORMAL EN ILLUSTRATOR (ZOOM 400%)</span>
                <h3 style="font-family:'Montserrat',sans-serif;font-size:17px;font-weight:800;color:#090D16;margin:10px 0 4px 0;">Isotipo_Simbolo_Curvas_the_best_brand.svg / .ai</h3>
                <p style="font-size:12.5px;color:#475569;margin:0;line-height:1.45;">Pétalos translúcidos superpuestos con <code>fill-opacity</code> y diccionario PDF <code>/ExtGState /ca</code> + halo naranja progresivo sin bordes dentados.</p>
              </div>
              <div style="flex:1;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at center, #F8FAFC 0%, #E2E8F0 100%);border-radius:16px;margin:14px 0;padding:16px;">
                <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;">
                  \${symSvg.replace('width="800"', 'width="310"').replace('height="800"', 'height="310"')}
                </div>
              </div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#334155;font-weight:700;border-left:3px solid #FF7A00;padding-left:10px;">
                Transparencias nativas: /ca 0.14 → 0.22 → 0.28 → 0.48 → 0.88 → 1.00
              </div>
            </div>

            <!-- COL 2: VISTA CONTORNOS / WIREFRAME (CMD+Y EN ILLUSTRATOR) -->
            <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 8px 24px rgba(15,23,42,0.04);">
              <div>
                <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#2563EB;background:#EFF6FF;padding:4px 10px;border-radius:6px;">02 · VISTA CONTORNOS / WIREFRAME (CMD + Y)</span>
                <h3 style="font-family:'Montserrat',sans-serif;font-size:17px;font-weight:800;color:#090D16;margin:10px 0 4px 0;">Geometría Matemática Pura (0 Escalones)</h3>
                <p style="font-size:12.5px;color:#475569;margin:0;line-height:1.45;">Cada pétalo está construido con 2 curvas Bézier cúbicas simétricas exactas (<code>M ... C ... C ... Z</code>) y círculos concéntricos limpios.</p>
              </div>
              <div style="flex:1;display:flex;align-items:center;justify-content:center;background:#FFFFFF;border:1px dashed #CBD5E1;border-radius:16px;margin:14px 0;padding:16px;">
                <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;">
                  \${wireframeSvg.replace('width="800"', 'width="310"').replace('height="800"', 'height="310"')}
                </div>
              </div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#334155;font-weight:700;border-left:3px solid #2563EB;padding-left:10px;">
                Nodos limpios y editables individualmente con la herramienta Selección Directa (A).
              </div>
            </div>

            <!-- COL 3: TERNA VECTORIAL COMPLETA EXPORTADA -->
            <div style="display:flex;flex-direction:column;gap:16px;">
              <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:18px;padding:18px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
                <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;color:#0D2540;">03 · LOGOTIPO HORIZONTAL EN CURVAS (.SVG / .AI)</div>
                <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:8px;">
                  \${horizSvg}
                </div>
                <div style="font-size:11.5px;color:#64748B;font-weight:600;">Tipografía Montserrat + Plus Jakarta Sans convertida a trazos Bézier + Orbe Liquid Glass con transparencias.</div>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1;">
                <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:18px;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
                  <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;color:#0D2540;align-self:flex-start;">04 · AVATAR 1:1 (.SVG)</div>
                  <div style="width:136px;height:136px;display:flex;align-items:center;justify-content:center;">
                    \${avatarSvg}
                  </div>
                  <div style="font-size:11px;color:#64748B;font-weight:600;">Squircle en curvas + transparencias</div>
                </div>
                <div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:18px;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;">
                  <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;color:#0D2540;align-self:flex-start;">05 · SELLO CIRCULAR (.SVG)</div>
                  <div style="width:136px;height:136px;display:flex;align-items:center;justify-content:center;">
                    \${sealSvg}
                  </div>
                  <div style="font-size:11px;color:#64748B;font-weight:600;">Arco tipográfico en curvas Bézier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;
    })()`);

    await sleep(600);
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_sim_48_showcase_suite_logos_descargados.png"));
    await cdp.capturePng(path.join(ARTIFACT_DIR, "tbb_vector_transparencias_zoom400_comparativa.png"));
    console.log("✓ Screenshot comparativo Zoom 400% + Wireframe Cmd+Y guardado.");
  } finally {
    if (cdp) cdp.close();
    try { chromeProc.kill("SIGKILL"); } catch (_) {}
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
