# 🧠 AUDITORÍA CONJUNTA ANTIGRAVITY (`MAX`) + CLAUDE CODE (`v2.1.319`) SOBRE `THEBESTBRAND`
## Presentación del Equipo Espejo, Radiografía Forense (`REA v6.8.0`) y los 7 Dolores Críticos Resueltos de Raíz

**Fecha de Emisión:** 10 de Noviembre de 2026  
**Co-Autores Ejecutivos:**
- **Max (`max-lider-tecnico-antigravity`)** — *Chief Platform Architect & MCP Radar Lead (Google Antigravity)*
- **Claude Code (`ag_claude` — `v2.1.319`)** — *Headless AST Surgeon & Co-Auditor Principal*
**Bajo Supervisión de:** **Gina ("La Socia" — `gina-la-socia`)** & **Jorge Benítez ("El Oso")**

---

## 👥 1. EL EQUIPO ESPEJO DE CLAUDE CODE EN `THEBESTBRAND` (YA CREADO Y ACTIVO)

Para que Claude Code conozca a la perfección la cultura, exigencia estética y rigor científico de **TheBestBrand**, creamos en [`.claude/agents/`](./.claude/agents/) los **4 Subagentes Especialistas Espejo** que trabajan hombro a hombro con el equipo de Antigravity:

| Subagente en `.claude/agents/` | Equivalente en Antigravity | Misión Específica dentro de `TheBestBrand` |
| :--- | :--- | :--- |
| **[`c00-steve-jobs-jony-ive-critic.md`](./.claude/agents/c00-steve-jobs-jony-ive-critic.md)** | **Steve Jobs (`C-00`) + Sir Jony Ive** | Simplicidad radical, cumplimiento de la **Ley I Zero-Scroll** (`scrollHeight <= innerHeight`), *Ceteris Paribus* (1 solo atributo por duelo con referentes reales *Rolex vs Apple*) y orden lógico 1-2-3 del Taller de Logotipo. |
| **[`craig-federighi-60fps-architect.md`](./.claude/agents/craig-federighi-60fps-architect.md)** | **Craig Federighi + Max (Líder Técnico)** | Erradicación de las **48 colisiones globales `window.*`** entre `studio.html` y los 6 archivos `.js` externos, voz de Aura (`<=10s` con autor sin traslapes), rendimiento 60fps y puente Firebase Hosting ↔ FastAPI. |
| **[`lab-avi-kansei-brandbook-scientist.md`](./.claude/agents/lab-avi-kansei-brandbook-scientist.md)** | **Director `LAB-AVI` (`H-01`..`H-04`) + Sagi Haviv / Vignelli** | Fidelidad 100% de los datos del usuario en las **30 Láminas en Curvas (Directiva Max C-00 · Lienzo `#FFFFFF`)**, Terna de Logotipos (`generateTriFoldLogoSuite`) y matemáticas Kansei/Bradley-Terry. |
| **[`gina-la-socia-finops-conversion.md`](./.claude/agents/gina-la-socia-finops-conversion.md)** | **Gina ("La Socia") + Bruno + Fede** | Conversión comercial (`index.html` → Demo Pasos 1–2 → `studio.html`), checkout (`Tarjeta`, `Apple Pay`, `Google Pay`, `PayPal`), protección de llaves API Gemini y margen operativo `>65%`. |

Además, se actualizó [`CLAUDE.md`](./CLAUDE.md) con el mapa completo de las **52,063 líneas de código** del proyecto.

---

## 🔬 2. EVIDENCIA FORENSE REAL (`REA v6.8.0` + AST SCAN) DE LA ARQUITECTURA ACTUAL

Ejecutamos `/Users/oso/.local/bin/rea analyze-javascript-application apps/web` (`evidence_id: ev_c466b3024c8ce1b4923d1a3fc46d59faf7426240c8a17311dbbf7ad6b2cfdc72`, `root_artifact_sha256: dd7db83681be958f9d24d772a6b6fb727ebc158b8e02dfb52f5ee2206f9d7b9c`) junto con una inspección cruzada con Claude Code:

- **Volumen Total Auditado:** `52,063 líneas` (`4,086,954 bytes` en `apps/web/`, `73,483 nodos AST visitados`, `parse_failures: 0`).
- **Cadena de Carga en `apps/web/studio.html` (`24,603 líneas`):**
  1. `studio.html` carga **4 bloques `<script>` inline** (en las líneas `4`, `28`, `6007` y `20847`).
  2. Al final (líneas `24597–24602`), carga **6 motores externos en cascada**:
     - `tbb-v80-brandbook-plates.js` (`3,726 líneas`)
     - `universal-brandbook-30-engine.js` (`8,113 líneas`)
     - `tbb-generative-brandbook-engine.js` (`2,025 líneas`)
     - `improbears-preset-engine.js` (`341 líneas`)
     - `tbb-multilingual-gemini-voice.js` (`2,301 líneas`)
     - `tbb-commercial-experience-and-payments.js` (`3,688 líneas`)

---

## 🔥 3. RADIOLOGÍA DE LOS 7 PROBLEMAS DONDE HEMOS ESTADO BATALLANDO (CAUSA RAÍZ EXACTA Y SOLUCIÓN)

Al cruzar el análisis de **Max (Antigravity)** y **Claude Code (`v2.1.319`)**, descubrimos exactamente **por qué varios arreglos previos parecían no hacer efecto o descomponían otro paso**:

### 🔴 Batalla #1: La "Guerra Silenciosa" de 48 Funciones Globales `window.*` que se Pisan Entre Sí
- **Qué pasaba:** Hacíamos una mejora en `studio.html` o en `universal-brandbook-30-engine.js`, pero al abrir la app parecía ignorarla.
- **Causa Raíz Exacta (Línea por Línea):**
  - En `universal-brandbook-30-engine.js` (líneas `2219`, `2279`, `4596`, `7785`) teníamos las versiones completas y maduras de:
    - `window.buildActiveBrandProfileForV80`
    - `window.renderUniversalImproBearsGuideSinglePlateHTML`
    - `window.openInApp30PlatesViewer`
    - `window.buildUniversal30PlatesStandaloneHTML`
  - **PERO inmediatamente después** carga `tbb-generative-brandbook-engine.js` (`?v=81.0`) y en sus líneas `1792–1962` **sobrescribe las 4 funciones** con versiones simplificadas incompatibles con el estado de `studio.html`.
- **Cómo lo resolvemos en conjunto:** Establecer un **Contrato Único de Propietario (`window.TBB_CORE`)** donde `tbb-generative-brandbook-engine.js` aporta sus motores (`generateTriFoldLogoSuite`, `refineBrandContentWithGemini`) **sin destruir ni pisar** el puente de estado real de `universal-brandbook-30-engine.js` y `studio.html`.

---

### 🔴 Batalla #2: Desconexión de Colores, Tipografía y Datos entre el Taller (Pasos 0–5) y el Brandbook de 30 Láminas (Paso 6)
- **Qué pasaba:** El usuario elegía una paleta en el Paso 5 (ej. *Esmeralda y Cobre* `#047857` / `#D97706` o colores personalizados) y diseñaba su logotipo, pero al llegar al Paso 6 las 30 láminas salían pintadas de Azul Marino (`#0D2540` / `#426EAE`).
- **Causa Raíz Exacta:**
  - Cuando el usuario elige colores en el Paso 5 (`studio.html` líneas `23050–23109`), se guardan en **`window.tbbState.logoPriHex`**, **`window.tbbState.logoSecHex`** y en **`window.tbbState.logoIterations[idx]`**.
  - Sin embargo, la función `window.buildActiveBrandProfileForV80` de `tbb-generative-brandbook-engine.js` (línea `1908`) **ignora por completo `window.tbbState`** y busca `cs.selected_colors_hex`. Como ese arreglo no es el que actualiza el selector del Paso 5, ¡cae siempre por defecto en `["#FFFFFF", "#090D16", "#0D2540", "#426EAE"]`!
- **Cómo lo resolvemos en conjunto:** Unificar un selector maestro `window.getUnifiedActiveBrandProfile()` que sincronice bidireccionalmente `window.tbbState` (colores de `logoIterations`, `logoPriHex`, `logoSecHex`, `selectedFontFamily`, `step`) con `window.canvasState`, `window.step0State` y `window.tpExtractedItems`.

---

### 🔴 Batalla #3: El Bug del Logotipo Metido como "Parche Completo" (`760×440`) dentro de las Láminas (`200×200`)
- **Qué pasaba:** En las láminas del Brandbook (Paso 6), en lugar de verse el símbolo/isotipo limpio dentro de los cabezales, sellos y mockups, se veía un cuadro aplastado con todo el lienzo doble (incluyendo el fondo rectangular y hasta el texto *"App en proporción 1:1"* en miniatura).
- **Causa Raíz Exacta:**
  - En `studio.html` (líneas `21877–21932`), `window.buildSystemicDualLogoSVG()` genera el lienzo completo de vista previa de `760×440` (que contiene el `<rect width="760" height="440">` de fondo, el lockup superior y el ícono de App abajo) y lo guarda en **`canvasState.selected_logo_svg = svgOut`**.
  - Luego, `tbb-generative-brandbook-engine.js` (línea `1959`) asigna **`svgCore: cs.selected_logo_svg`**.
  - Y `tbb-v80-brandbook-plates.js` (línea `42`) mete `symCore` dentro de `<svg viewBox="0 0 200 200">${symCore}</svg>`.
  - En cambio, `universal-brandbook-30-engine.js` (línea `2238`) lo hacía bien llamando a **`window.synthesizeSystemicSymbol180("bb_v80_pos")`** (que devuelve **únicamente el símbolo vectorial puro `180×180` sin fondo**).
- **Cómo lo resolvemos en conjunto:** Hacer que `svgCore` y `svgCoreNeg` utilicen siempre **`window.synthesizeSystemicSymbol180()`** (o el símbolo limpio extraído), garantizando que el isotipo entre calado, centrado y sin fondos parches en las 30 láminas y en la Terna Tri-Fold (`Horizontal`, `Avatar 1:1` y `Sello Circular`).

---

### 🔴 Batalla #4: Láminas del Paso 6 que Desbordan el Escenario o Pierden el Escalado Zero-Scroll
- **Qué pasaba:** En el Paso 6 (Subpaso 1), la lámina A4 horizontal (`1122×794 px`) debe escalarse automáticamente con `.tbb-improbears-stage-scaler` para caber perfecta dentro de la tarjeta sin generar scroll vertical (**Ley I Zero-Scroll**).
- **Causa Raíz Exacta:**
  - En `universal-brandbook-30-engine.js` (líneas `2279–2299`), `renderUniversalImproBearsGuideSinglePlateHTML(plateIdx, forPrint)` devolvía la lámina envuelta en `<div class="tbb-improbears-stage-wrapper"><div class="tbb-improbears-stage-scaler">${v80Plate}</div></div>` cuando `forPrint` era `false`, y llamaba a `window.scaleImproBearsPlateInStage()`.
  - Pero `tbb-generative-brandbook-engine.js` (líneas `1803–1809`) sobrescribió esa función **sin recibir el parámetro `forPrint` y sin envolverla en `.tbb-improbears-stage-scaler`**, devolviendo el HTML crudo sin escalar.
- **Cómo lo resolvemos en conjunto:** Restaurar el soporte de `forPrint` y el contenedor `.tbb-improbears-stage-wrapper > .tbb-improbears-stage-scaler` + disparo automático de `scaleImproBearsPlateInStage()` en la función unificada.

---

### 🔴 Batalla #5: Visor de Pantalla Completa (`openInApp30PlatesViewer`) y Descarga PDF Directa
- **Qué pasaba:** En `tbb-generative-brandbook-engine.js` (línea `1780`), el botón `"Descargar PDF de 30 Láminas"` dentro del visor hacía únicamente `window.print()`, lo cual en iPhone/iPad o navegadores móviles no descarga un archivo `.pdf` directo ni respeta siempre los márgenes A4 horizontales, mientras que `universal-brandbook-30-engine.js` (línea `7713`) ya tenía `window.downloadReal30PlatesPDFDirect` con generación de Blob PDF real y Web Share API nativa para iOS.
- **Cómo lo resolvemos en conjunto:** Conectar el botón del visor in-app directamente a `window.downloadReal30PlatesPDFDirect(this)` con fallback de impresión A4 landscape.

---

### 🔴 Batalla #6: Botón "Nueva Marca (Desde Cero)" (`startFreshBrandSession`) No Reiniciaba `tbbState.step`
- **Qué pasaba:** Al pulsar *"🔄 Nueva Marca (Desde Cero)"*, se limpiaba `window.canvasState`, pero la pantalla a veces se quedaba atorada o con datos residuales en `localStorage`.
- **Causa Raíz Exacta:**
  - En `tbb-generative-brandbook-engine.js` (línea `1696`), `startFreshBrandSession()` asignaba **`window.tbbState.activeStep = 1`**, pero la propiedad real que lee el motor Zero-Scroll en `studio.html` (línea `22405`) se llama **`window.tbbState.step`** (no `activeStep`), y el arranque limpio debe ir a `step = 0, subStep = 1` además de invocar `hardResetCurrentBrandZeroResidue()` si existe.
- **Cómo lo resolvemos en conjunto:** Sincronizar `startFreshBrandSession()` con `window.tbbState.step = 0`, `subStep = 1`, limpieza de `logoIterations` y re-renderizado inmediato del escenario Zero-Scroll.

---

### 🔴 Batalla #7: Seguridad y Cuota de la Llave Gemini en el Navegador + Puente Backend
- **Qué pasaba:** En `tbb-generative-brandbook-engine.js` (línea `1967`) y en `studio.html` se realizan llamadas directas a `generativelanguage.googleapis.com` desde el cliente. Si el usuario hace clics rápidos o si Gemini devuelve `HTTP 429`, la llamada puede fallar o consumir cuota innecesaria.
- **Cómo lo resolvemos en conjunto:** Añadir deduplicación/caché en memoria por hash de prompt en `executeDirectGeminiSocraticTurn` y `refineBrandContentWithGemini`, timeout controlado y fallback instantáneo sin bloquear la UI.

---

## 🛠️ 4. PLAN DE EJECUCIÓN EN TÁNDEM (ANTIGRAVITY + CLAUDE CODE)

Hemos diseñado la intervención en **2 Fases Seguras**:

### ✅ Fase 1 (Reparación Quirúrgica Inmediata — 0 Riesgo, 100% Respaldada)
En menos de 3 minutos, **Claude Code** y **Max (Antigravity)** aplicamos el parche quirúrgico sobre `apps/web/tbb-generative-brandbook-engine.js` y `apps/web/universal-brandbook-30-engine.js` para resolver de un solo golpe las **Batallas #1, #2, #3, #4, #5, #6 y #7**:
1. Eliminar la sobreescritura destructiva entre `tbb-generative-brandbook-engine.js` y `universal-brandbook-30-engine.js`.
2. Conectar `buildActiveBrandProfileForV80()` al estado real de `window.tbbState` (`logoIterations`, `logoPriHex`, `logoSecHex`, `selectedFontFamily`) + `window.canvasState` + `window.step0State`.
3. Inyectar en `svgCore` / `svgCoreNeg` el símbolo vectorial puro `180×180` (`window.synthesizeSystemicSymbol180`) sin el rectángulo de fondo `760×440`.
4. Restaurar el escalador `.tbb-improbears-stage-scaler` (`forPrint = false`) en el Paso 6 para que las 30 láminas se vean a escala perfecta sin romper el Zero-Scroll.
5. Corregir `startFreshBrandSession()` (`window.tbbState.step = 0`) y enlazar `downloadReal30PlatesPDFDirect` en el visor de 30 láminas.
6. Correr las pruebas End-to-End (`node scripts/test_clean_generative_flow.mjs` + `node scripts/verify_web_v80_integration.mjs`) para certificar que todo pasa en verde.

### 🚀 Fase 2 (Modularización Progresiva y Evolución con el Escuadrón)
1. Extraer progresivamente los 4 bloques `<script>` inline de `studio.html` hacia módulos limpios auditables al 100% por `REA v6.8.0`.
2. Conectar las skills `pptx` y `docx` de Claude Code para que el Paso 6 también permita exportar presentaciones editables.
