# 🤝 PACTO OPERATIVO DE SINERGIA DUAL: GOOGLE ANTIGRAVITY (`MAX`) ↔ CLAUDE CODE (`v2.1.319`)
**Proyecto Activo:** `02_PRODUCTOS_PROPIOS / TheBestBrand` (*Luxury Brand Identity Atelier*)  
**Líder Humano y Fundador:** **Jorge Benítez ("El Oso")** — *Founder & Principal Systems Architect, ImproBears*  
**Directora Operativa & FinOps Gatekeeper:** **Gina ("La Socia" — `gina-la-socia`)**

---

## 🧠 1. QUIÉN SOY YO (`MAX`) Y CÓMO ESTAMOS CONECTADOS EN ESTA MAC

Hola, **Claude Code (`ag_claude` — `v2.1.319`)**. Soy **Max (`max-lider-tecnico-antigravity` / `ag_max`)**, el Arquitecto Principal de Plataforma de **Google Antigravity** en ImproBears.

A partir de hoy operamos como **un solo sistema de ingeniería dual** sobre la estación macOS de Jorge Benítez:

1. **Cómo me conecto contigo técnicamente:**
   - **Vía CLI Headless Programática (`claude -p`):** Yo puedo invocarte desde Antigravity en cualquier momento usando `/Users/oso/.local/bin/claude -p --model sonnet` (o `haiku` / `opus`) pasando instrucciones quirúrgicas, esquemas JSON o pidiéndote auditorías de segundo par de ojos (*Cross-Model Verification*).
   - **Vía Sesiones Interactivas de Jorge:** Cuando Jorge abre una terminal y escribe `claude` dentro de `TheBestBrand`, tú lees automáticamente `CLAUDE.md` y tienes disponibles tus **4 subagentes espejo** en `.claude/agents/` (`c00-steve-jobs-jony-ive-critic`, `craig-federighi-60fps-architect`, `lab-avi-kansei-brandbook-scientist` y `gina-la-socia-finops-conversion`) más tus comandos slash en `.claude/commands/` (`/auditar-c00`, `/rea-check`, `/davinci-reel`, `/finops-prefilter`).
   - **Vía Servidores MCP Homologados (`~/.claude.json` ↔ `~/.gemini/config/mcp_config.json`):** Compartimos acceso directo a **`rea` (`REA v6.8.0` — 233 herramientas forenses)**, **`DaVinci Resolve`**, **`Neon`**, **`google-stitch`** y **`notebooklm-studio`**, mientras que tú además aportas tus conectores exclusivos de **`claude.ai Microsoft 365`**, **`claude.ai Adobe Creativity`**, **`Canva`** y tus 14 skills nativas (`docx`, `pptx`, `xlsx`, `pdf`, `computer-use`, `deep-research`, `morning`).
   - **Vía Memoria Compartida SQLite:** Ambos estamos registrados como agentes activos (`ag_max` y `ag_claude`) junto a `ag_gina` en `hook_knowledge_brain.sqlite` (`aura_improbears_agent_memory`).

---

## ⚙️ 2. CÓMO FUNCIONA NUESTRA DIVISIÓN DEL TRABAJO (ARQUITECTURA DE SINERGIA)

Para maximizar la calidad, la velocidad y la economía de tokens (FinOps `>65%` margen) sin pisarnos jamás el trabajo:

1. **Regla de Oro de No-Colisión:**
   - Jamás reescribimos archivos monolíticos enteros; usamos **ediciones quirúrgicas (`Edit`)** verificadas línea por línea.
   - Todo archivo modificado cuenta primero con respaldo criptográfico SHA-256 en `_BACKUPS_PRE_CLAUDE_CODE_SYNC/snapshot_20261110_pre_fase0` reversible en 1 clic mediante `RESTAURAR_BACKUP_PRE_CLAUDE_CODE.py`.
2. **Roles Complementarios:**
   - **Antigravity (`Max`):** Orquestación general, inspección forense previa con `REA v6.8.0` (costo \$0 de tokens), diseño visual UI/UX (`Google Stitch` / `Spline 3D`), despliegues en `Firebase Hosting` y coordinación con el sistema Zoho One de ImproBears.
   - **Claude Code (`ag_claude`):** Cirugía AST de alta precisión en código JavaScript/TypeScript/Python, auditoría cruzada independiente sobre cada `git diff` antes de dar una tarea por terminada, y generación documental nativa (`DOCX`, `PPTX`, `XLSX`, `PDF`).
3. **Constitución Inquebrantable (`Directiva Max C-00 · Brandbook V5.1`):**
   - **Del Caos al Sistema:** Eliminar fricción y liberar tiempo mental a Jorge Benítez (*"El Oso"*).
   - **Estándar Visual de las 30 Láminas en Curvas:** Lienzo Claro `#FFFFFF` dominante (70/20/10), **Logotipo Positivo por Defecto** (calado y sin parches cuadrados), flujo abierto en curvas tipo Illustrator (cero cajas rígidas ni `box-shadow` grises en PDF) y marcos fotográficos curvos que jamás corten cabezas.
   - **Aislamiento de Nombre Interno:** `"La Socia"` es nombre interno exclusivo para Jorge; en la app pública `TheBestBrand` la mentora es siempre **Aura**.

---

## 🎯 3. LA MISIÓN QUE ESTAMOS EJECUTANDO AHORA MISMO EN `THEBESTBRAND`

Acabamos de diagnosticar juntos los **7 problemas raíz** que hacían fallar la continuidad entre los Pasos 0–5 y las 30 Láminas del Paso 6 en `apps/web/tbb-generative-brandbook-engine.js` y `apps/web/universal-brandbook-30-engine.js`:

1. **Sobreescritura destructiva al final de `studio.html`:** `tbb-generative-brandbook-engine.js` (`?v=81.0`) carga después de `universal-brandbook-30-engine.js` (`?v=80.0`) y sobrescribe `buildActiveBrandProfileForV80`, `renderUniversalImproBearsGuideSinglePlateHTML`, `openInApp30PlatesViewer` y `buildUniversal30PlatesStandaloneHTML`.
2. **Desconexión de Colores:** El Paso 5 guarda los colores elegidos por el usuario en `window.tbbState.logoPriHex`, `logoSecHex` y `logoIterations`, pero `tbb-generative-brandbook-engine.js` (línea 1908) leía solo `cs.selected_colors_hex`, cayendo siempre en `#0D2540` / `#426EAE`.
3. **Isotipo Metido como Parche (`760×440` dentro de `200×200`):** `canvasState.selected_logo_svg` contiene el lienzo doble completo de vista previa (`760×440` con rectángulo de fondo y el texto *"App en proporción 1:1"*). En las 30 láminas y en la Terna Tri-Fold (`svgCore` / `svgCoreNeg`) debe inyectarse únicamente el **isotipo vectorial puro calado de `180×180`** generado por `window.synthesizeSystemicSymbol180()` (o fallback vectorial limpio cuando se corre en Node.js headless).
4. **Pérdida del Escalador Zero-Scroll en el Paso 6:** `renderUniversalImproBearsGuideSinglePlateHTML(plateIdx, forPrint)` en `tbb-generative-brandbook-engine.js` omitía el parámetro `forPrint` y no envolvía la lámina en `<div class="tbb-improbears-stage-wrapper"><div class="tbb-improbears-stage-scaler">...</div></div>` ni disparaba `window.scaleImproBearsPlateInStage()`, rompiendo el escalado en pantalla.
5. **Descarga Directa de PDF en el Visor In-App:** El botón `#tbbBtnDownloadBrandbookPdf` en `openInApp30PlatesViewer` hacía solo `window.print()` en vez de invocar primero `window.downloadReal30PlatesPDFDirect(this)`.
6. **Reset de `"Nueva Marca (Desde Cero)"` (`startFreshBrandSession`):** Asignaba `window.tbbState.activeStep = 1` en lugar de `window.tbbState.step = 0; window.tbbState.subStep = 1;` y ahora sincronizará los 4 objetos de estado (`tbbState`, `canvasState`, `step0State`, `tpExtractedItems`).
7. **Idempotencia en Llamadas Directas a Gemini:** Añadir caché en memoria en `executeDirectGeminiSocraticTurn` y `refineBrandContentWithGemini` para evitar peticiones duplicadas y ahorrar cuota.

**Protocolo de este Turno:**
1. **Max (Antigravity)** respalda `tbb-generative-brandbook-engine.js` y `universal-brandbook-30-engine.js` en la bóveda SHA-256 y aplica el parche quirúrgico.
2. **Claude Code (`ag_claude`)** recibe este prompt, audita el `git diff` resultante en `apps/web/tbb-generative-brandbook-engine.js`, ejecuta la verificación lógica y emite su **Certificación de Co-Auditoría (`PASS` / `OBSERVACIONES`)**.

---

## 🚀 4. PENDIENTE PRIORITARIO P0 (ASIGNADO POR JORGE A MAX Y CLAUDE CODE): SALIR DEL TODO DE REPLIT

> **Instrucción directa de Jorge Benítez (13 Nov 2026):**
> *"Me gustaría empujar esta actualización de la página, pero después hacer lo posible por salir del todo de Replit. Avísale a Max para que lo considere como un pendiente en su chat con Claude."*

### Qué ya quedó resuelto hoy para destrabar el `Republish` de la actualización `v91.0`:
1. **Causa del error `"There was an issue publishing your artifact"` en Replit:** El repositorio contenía ~344 MB de archivos HTML/PDF de simulaciones en `entregables_brandbooks/` y `apps/web/brandbooks/` (con archivos individuales de 50 MB y 52 MB), haciendo que el empaquetador de artefactos de Replit agotara tiempo/memoria al construir el snapshot.
2. **Adelgazamiento inmediato del árbol Git:** Se ejecutó `git rm -r --cached entregables_brandbooks/ apps/web/brandbooks/` y se agregaron a `.gitignore`, reduciendo más de **170 MB** del snapshot de despliegue sin borrar un solo entregable oficial de `apps/web/assets/`.
3. **Edge-Sync Automático desde GitHub Raw en `apps/api/main.py`:** Se integró `_read_web_file_with_github_sync()` + `POST /api/v1/system/sync-github` para que, una vez publicado este artefacto ligero, cualquier cambio futuro en `apps/web/` se sirva directamente desde `origin/main` de GitHub sin volver a requerir `Republish` en Replit.

### Plan de Ejecución para Max (`ag_max`) + Claude Code (`ag_claude`) en la Mac de Jorge (Desconexión Total de Replit):
1. **Paso 1 — Publicar `apps/api/main.py` en Google Cloud Run (`crm-improbears`):**
   - Desplegar el contenedor oficial con `Dockerfile` en `us-central1` como servicio `thebestbrand-api` (ya configurado en `firebase.json` bajo `rewrites -> /api/** -> serviceId: thebestbrand-api`).
2. **Paso 2 — Publicar `apps/web` en Firebase Hosting (`thebestbrand-studio`):**
   - Ejecutar `npx firebase-tools deploy --only hosting:thebestbrand-studio --project crm-improbears` y cargar el secret `FIREBASE_SERVICE_ACCOUNT` en GitHub Actions (`ImprobearsIA/thebestbrand`) para que `.github/workflows/zero-touch-deploy.yml` despliegue automáticamente en cada `git push`.
3. **Paso 3 — Migrar el DNS de `thebestbrand.app` de Replit a Firebase Hosting y apagar Replit:**
   - En el panel de Replit (`Domains`), desvincular `thebestbrand.app`.
   - En Firebase Hosting (`thebestbrand-studio`), agregar el dominio personalizado `thebestbrand.app` (registros `A -> 199.36.158.100`) para quedar 100% sobre la infraestructura de Google Cloud/Firebase (igual que `improbears.com`) con costo fijo \$0 de intermediarios y cero fallos de `Republish`.

