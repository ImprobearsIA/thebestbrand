# 🔬 AUDITORÍA FORENSE INTEGRAL — `THE BEST BRAND` (`WEB + APP + API · V130`)
**Rol:** Principal Software Engineer & QA Lead + Juez Invitado Awwwards  
** Ejecución Programada:** `2026-11-21 · 02:00 AM CST` (100% Solo Lectura · **0 líneas de código fuente modificadas**)  
**Alcance Auditado:**
- Landing Comercial ([index.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/index.html), [website.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/website.html), [tbb-commercial-experience-and-payments.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-commercial-experience-and-payments.js))
- Aplicación Interactiva Studio ([studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html), [tbb-multilingual-gemini-voice.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-multilingual-gemini-voice.js), [tbb-executive-deliverables-suite.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-executive-deliverables-suite.js), [tbb-generative-brandbook-engine.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-generative-brandbook-engine.js), [universal-brandbook-30-engine.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/universal-brandbook-30-engine.js), [tbb-v80-brandbook-plates.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-v80-brandbook-plates.js), [voz.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/voz.html))
- Backend, Base de Datos & Contenedor Nativo ([main.py](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/api/main.py), [avatar_brain_rag.py](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/packages/brandbook-engine/avatar_brain_rag.py), [firebase.json](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/firebase.json), [capacitor.config.json](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/capacitor.config.json))
- **9 Reportes con Captura de TestFlight (`tf_01..tf_09`) + 2 Reportes de Cierre (`iPhone18_2` & `Mac17_9`)** sincronizados desde App Store Connect API y Neon PostgreSQL (`tbb_feedback_inbox`).

> [!IMPORTANT]
> **Disciplina de Fase 1 (02:00 AM):** Tal como se instruyó (*«ANTES de modificar una sola línea de código... Espera mi confirmación antes de empezar a editar»*), este informe documenta con exactitud quirúrgica cada archivo, línea, causa raíz y plan de solución para su ejecución por bloques a las **04:00 AM** con **Gemini 4 Neon (XHigh)**.

---

## 🗺️ 1. MAPA ARQUITECTÓNICO DEL SISTEMA AUDITADO
- **Rutas y Hosting Híbrido:** `https://thebestbrand.app` sirve estáticos desde Firebase Hosting (`thebestbrand-studio`) y enruta `/api/**` a Cloud Run (`thebestbrand-api`), mientras Railway (`thebestbrand-api-studio-production.up.railway.app`) opera como espejo API conectado a Neon PostgreSQL 18 (`green-cherry-54371329`).
- **Estado del Cliente:** Coexisten 3 almacenes en memoria (`window.tbbState`, `window.canvasState`, `window.step0State`) serializados hacia `localStorage` (`tbb_studio_autosave_v45`, `tbb_canvas_state_v1`, `tbb_migrated_steps_0_to_3_v56`, `tbb_demo_steps_0_to_3_backup`) y sincronizados por `postMessage` entre la Web comercial y el `iframe` persistente `#tbbRealStudioDemoIframe`.
- **Sistema i18n y Voz:** `tbb-commercial-experience-and-payments.js` gestiona un diccionario `I18N` propio (`ES, EN, FR, PT, DE, IT`), mientras `tbb-multilingual-gemini-voice.js` aplica traducción por mutación de subárboles DOM (`tbbTranslateDOMSubtree`) + `TBBAudioDirector` (`1.14x`, 48 cápsulas `.mp3` `Aoede`).

---

## 🚨 NIVEL 1 — `[CRÍTICO / FUNCIONAL]` (Pérdida de Datos, Bloqueos de Flujo, Audio/Imagen y Crashes)

### `CF-01` · Pérdida de imágenes IA generadas en Paso 5 y caída al emblema genérico de montañas (TestFlight `tf_01`)
- **Archivos exactos:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L16498-L16522), [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L21901-L21928) y [tbb-executive-deliverables-suite.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-executive-deliverables-suite.js#L2911-L3091).
- **Causa raíz:**
  1. `buildCompleteBrandStatePayload()` (`studio.html:16498–16521`) **omite** las propiedades `isNanoBananaGenerated`, `nanoBananaFullArtworkUrl`, `nanoBananaSymbolUrl`, `creativeMode` y `tracedCurvesSvg` al serializar `tbbState.logoIterations`. En cuanto ocurre una hidratación desde `localStorage` o sincronización en tiempo real, la iteración pierde su bandera `isNanoBananaGenerated` y `buildSystemicDualLogoSVG()` (`studio.html:21926`) cae al arquetipo vectorial por defecto (`nanobanana_masterpiece` = montañas con fogata).
  2. En `tbbGenerateNanoBananaBrandSymbol()` (`tbb-executive-deliverables-suite.js:2957–3090`), `st.geminiBusy = true` no está envuelto en un bloque `try { ... } finally { st.geminiBusy = false; }`. Si `tbbAutoTrimAndCenterRasterLogo` o `tbbVectorizeRasterLogoToSvgCurves` lanza una excepción o timeout, `st.geminiBusy` queda bloqueado en `true` toda la sesión, haciendo que `onTbbAtomicCenterAction` (`studio.html:25690–25725`) caiga siempre al SVG genérico.
  3. El espejo Railway (`thebestbrand-api-studio`) carece de `GEMINI_API_KEY` en variables de entorno (`connected: false` en `/api/corporate/status`), por lo que cualquier llamada directa a Railway para generación falla si no usa el proxy de `thebestbrand.app` o no se inyecta la variable.
- **Plan de solución:** Preservar `isNanoBananaGenerated`, `creativeMode`, `nanoBananaFullArtworkUrl`, `nanoBananaSymbolUrl` y `tracedCurvesSvg` en `buildCompleteBrandStatePayload()` + almacén `IndexedDB` (`tbb_artwork_vault_v1`) para binarios grandes; blindar `tbbGenerateNanoBananaBrandSymbol` con `try/finally` + timeout con `AbortController`; y renderizar en `buildSystemicDualLogoSVG` cualquier `nanoBananaFullArtworkUrl || nanoBananaSymbolUrl || uploadedLogoDataUrl` válido aunque falte la bandera booleana.

### `CF-02` · Bloqueo al escribir letras «A / B / 1 / 2» y disparo fantasma de confetti en Paso 5 (TestFlight `tf_06`)
- **Archivos exactos:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L15777-L15789) y [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L14126-L14132).
- **Causa raíz:** Existe un listener global heredado `window.addEventListener("keydown", ...)` (`L15777`) que cuando `currentStep === 5` intercepta las teclas `'a'`, `'b'`, `'1'`, `'2'`, `ArrowLeft` y `ArrowRight` ejecutando **`e.preventDefault()`** **sin verificar si el foco está en un `<input>`, `<textarea>` o elemento editable**. Cuando el usuario intenta escribir *«balón»* en `#tbbSingleLogoIterationBox`, el listener bloquea la `b` y la `a` (dejando *«lon»*, tal como se observa en la barra predictiva de iOS en `tf_06`) e invoca `choosePairOption()` en segundo plano hasta llegar al par 24, disparando `launchConfetti(90)` (`L14130`) en plena escritura.
- **Plan de solución:** Ignorar inmediatamente todo evento `keydown` global cuando `e.target.closest("input, textarea, select, [contenteditable='true']")` exista o cuando la vista activa sea el escenario atómico V130; además, desactivar `launchConfetti` durante interacciones de escritura y desplazar suavemente `#tbbSingleLogoIterationBox` sobre el teclado virtual de iOS (`visualViewport`).

### `CF-03` · Cápsulas de transición mudas en iOS WKWebView / TestFlight (TestFlight `tf_07`)
- **Archivos exactos:** [tbb-multilingual-gemini-voice.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-multilingual-gemini-voice.js#L1185-L1261) y [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L10411-L10464).
- **Causa raíz:** `playAuraVivaCapsuleClip()` instancia un elemento `new Audio(meta.url)` nuevo en cada transición. En iOS `WKWebView` (TestFlight), `HTMLAudioElement.play()` es bloqueado con `NotAllowedError` cuando se invoca fuera del stack síncrono exacto del toque o tras operaciones previas, mientras que un `AudioContext` WebAudio desbloqueado una sola vez en el primer `pointerdown`/`touchstart` del documento puede reproducir buffers decodificados (`fetch` + `decodeAudioData` -> `AudioBufferSourceNode`) en cualquier momento sin bloqueo de iOS y alimentando directamente el `AnalyserNode` del orbe de Aura.
- **Plan de solución:** Actualizar `playAuraVivaCapsuleClip` para reproducir prioritariamente sobre el `AudioContext` compartido y pre-desbloqueado de `TBBAudioDirector` (con caché en RAM de `AudioBuffer` y fallback a `HTMLAudioElement` en gesto directo), mostrando estado claro de reproducción/repetición si el dispositivo tiene silencio activo.

### `CF-04` · Pérdida silenciosa de respuestas de los Pasos 0–3 al cruzar el Paywall hacia el Paso 4 (Error No Reportado)
- **Archivos exactos:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L27050-L27061) vs [tbb-commercial-experience-and-payments.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-commercial-experience-and-payments.js#L2129) y [tbb-commercial-experience-and-payments.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-commercial-experience-and-payments.js#L3828).
- **Causa raíz:** Desalineación de llaves en `localStorage`: la Web comercial respalda el progreso de la Demo en `tbb_migrated_steps_0_to_3_v56` y `tbb_demo_steps_0_to_3_backup`, pero `studio.html:27052` busca únicamente `tbb_demo_steps0to3_migration_v92`. Si el usuario abre `/studio?step=4&continue=true` desde otra pestaña o al volver de Stripe Checkout, no encuentra esa llave.
- **Plan de solución:** Unificar un lector/escritor canónico de migración que lea en orden `tbb_migrated_steps_0_to_3_v56`, `tbb_demo_steps_0_to_3_backup`, `tbb_demo_steps0to3_migration_v92` y `tbb_studio_autosave_v45`, hidratando `canvasState`, `step0State` y `tpExtractedItems` sin pérdida.

### `CF-05` · Saturación de `localStorage` (`QuotaExceededError` > 5 MB) y cierres por memoria en WKWebView (TestFlight Crashes `iPhone18_2` y `Mac17_9`)
- **Archivos exactos:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L16717-L16757) y [tbb-multilingual-gemini-voice.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-multilingual-gemini-voice.js#L4395-L4401).
- **Causa raíz:** Cada iteración de logo en base64 ocupa `1.3 MB – 1.8 MB` duplicada en tres campos (`nanoBananaFullArtworkUrl`, `nanoBananaSymbolUrl`, `uploadedLogoDataUrl`). A partir de la 3.ª o 4.ª iteración, `JSON.stringify(payload)` supera el límite estricto de `5 MB` de `localStorage` en WebKit (`QuotaExceededError` tragado silenciosamente por `catch (e) {}` en `L16756`, dejando de guardar el progreso) y acumula decenas de megabytes en memoria JS junto con un `setInterval` cada 5 segundos (`L4396`).
- **Plan de solución:** Almacenar las imágenes base64 de alta resolución en `IndexedDB` (`tbb_artwork_idb_v1`) referenciadas por clave ligera `idb://...` en `localStorage` (manteniendo en RAM las activas para renderizado instantáneo) y eliminar el `setInterval` redundante de 5 segundos en favor de guardado por evento con debounce.

### `CF-06` · Cambio de idioma a mitad de un paso borra texto no guardado y mezcla idiomas («Spanglish») (Error No Reportado)
- **Archivos exactos:** [tbb-multilingual-gemini-voice.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-multilingual-gemini-voice.js#L4264-L4286), [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L22915-L22924) y [tbb-commercial-experience-and-payments.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-commercial-experience-and-payments.js#L1200-L1225).
- **Causa raíz:**
  1. `tbbSetLanguage` llama a `renderTbbZeroScrollStage()` reconstruyendo `stage.innerHTML` sin volcar antes el valor vivo de `#tbbStep1AnswerInput`, `#tbbStep4SeedIdeaInput` o `#tbbSingleLogoIterationBox` cuando el usuario aún no disparó blur/save.
  2. En inglés (`web_home_desktop_1440.png` y `web_tab2_desktop_1440.png`) quedan cadenas fijas en español: botón `💬 Opinión` en header, píldoras `Paso 0..Paso 4–6` en la barra de la Demo, botones `Ver muestra` / `Descargar ejemplo ↓` en Tab 2, `"Business Activity:"` suelto en español en Paso 4.5 (`studio_step4_5_mobile_390.png`) y `"✦ Analizando la información específica de tu marca con IA..."` congelado en la burbuja de Aura (`studio_step5_2_mobile_390.png`).
- **Plan de solución:** Volcar cualquier campo activo antes de cambiar idioma, localizar al 100% las llaves faltantes de la Web comercial y del Studio en los 6 idiomas, y eliminar el estado bloqueado `"Analizando..."` en la burbuja superior de Aura (sustituyéndolo por mensaje contextual inmediato).

---

## 🎨 NIVEL 2 — `[UX / VISUAL]` (Regla Cero Emojis, Desbordamientos Móviles, Modal Mockups y Cápsula Limpia)

### `UX-01` · Violación de la Regla Estricta «Cero Emojis en la App ni en la Página» (`231` líneas detectadas · TestFlight `tf_04`)
- **Archivos exactos:**
  - [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html) (`73` líneas: `💡`, `💬`, `🎙️`, `✨`, `🔄`, `📄`, `📊`, `🇪🇸`)
  - [tbb-executive-deliverables-suite.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-executive-deliverables-suite.js) (`69` líneas: `🎯`, `💻`, `📱`, `📺`, `👕`, `🧢`, `🛍️`, `📍`, `📖`, `🖼️`, `🪟`, `🪧`, `🧱`, `✨`)
  - [tbb-multilingual-gemini-voice.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-multilingual-gemini-voice.js) (`46` líneas: banderas `🇪🇸🇺🇸🇧🇷🇫🇷🇩🇪🇮🇹` en selectores de idioma)
  - [tbb-generative-brandbook-engine.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-generative-brandbook-engine.js) (`17` líneas), [universal-brandbook-30-engine.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/universal-brandbook-30-engine.js) (`11` líneas), [tbb-v80-brandbook-plates.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-v80-brandbook-plates.js) (`8` líneas) y [tbb-commercial-experience-and-payments.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-commercial-experience-and-payments.js) (`7` líneas).
- **Causa raíz:** Uso histórico de emojis Unicode y banderas como sustitutos de iconografía UI.
- **Plan de solución:** Crear un catálogo único de íconos vectoriales SVG de trazo fino (`1.5px–1.75px`, `stroke-linecap="round"`) y códigos ISO tipográficos limpios (`ES`, `EN`, `FR`, `PT`, `DE`, `IT`), purgando el **100% de emojis Unicode** en todos los archivos HTML/JS de la Web y la App (verificado con regex automático `0` coincidencias).

### `UX-02` · Modal de Mockups con jerga interna de ingeniería, fondo oscuro e ilegibilidad móvil (TestFlight `tf_03`, `tf_04`, `tf_05`)
- **Archivo exacto:** [tbb-executive-deliverables-suite.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-executive-deliverables-suite.js#L2477-L2703).
- **Causa raíz:** El modal fue construido como réplica interna de `Google Flow` en tema oscuro (`#111318`), mostrando textos internos (`SUPERFICIES GOOGLE FLOW`, `CANVAS MEDIA · LOGOTIPO ACTIVO IMPORTADO`, `Fast (2.1) / Pro`, `Abrir en flow.google.com`, `LÁMINAS 05, 07...`, `Nano Banana 2.1`) y etiquetas en inglés (`laptop`, `phone`, `shirt`...), con `minmax(295px, 1fr)` que se aprieta y corta en iPhone.
- **Plan de solución:** Rediseñar `tbbOpenGoogleFlowMockupStudioModal` al **100% en Lienzo Claro `#FFFFFF`**, cero referencias a Google Flow / Nano Banana / números de lámina internos, superficies en español claro con íconos SVG limpios (`Camiseta`, `Empaque`, `Taza`, `Tarjeta`, `Letrero`, `Celular`, `Laptop`), layout fluido de 1 columna en móvil y 2 en escritorio sin desbordamiento horizontal.

### `UX-03` · Desbordamiento horizontal y recorte vertical en Pasos `3.1`, `4.4`, `4.5`, `5.1` y `5.2` en iPhone (`390px` y `440px`) (TestFlight `tf_02`, `tf_08`, `tf_09` + Hallazgos QA)
- **Archivos exactos:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L20108-L20145), [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L23830-L23840) y [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L24016-L24028).
- **Causa raíz medida con Playwright:**
  - `Paso 4.5` (`L23830`): `grid-template-columns: 1fr 1fr` sin `minmax(0, 1fr)` desborda `+174px` en `390px` y `+124px` en `440px` (`tf_02`).
  - `Paso 3.1`: `.tbb-atomic-card` recorta `+260px` verticales en `390x844`, ocultando el botón `Generar 6 Propuestas con IA`.
  - `Paso 5.1`: recorta `+90px` verticales de las muestras de color (`Grafito`, `Negro`, `Oro`).
  - `Paso 5.2`: las 4 píldoras (`1. Emblema`..`4. Minimalista`) en fila única ocultan `4. Minimalista` fuera del borde derecho; en una cuadrícula limpia `2x2` en móvil (`grid-template-columns: repeat(2, minmax(0, 1fr))`) las 4 opciones quedan 100% visibles de un vistazo sin scroll lateral.
- **Plan de solución:** Permitir `overflow-y: auto` suave dentro de `#tbbCenterAtomicStage` / `.tbb-atomic-card` con `min-height: 0`, cambiar todas las rejillas a `minmax(0, 1fr)` (1 columna en `<480px` para Paso 4.5, y `2x2` compacto para los 4 estilos del Paso 5.2).

### `UX-04` · Recuadro oscuro de la Cápsula encimado sobre el título inferior en vez de dejar solo el círculo de Aura (TestFlight `tf_07`)
- **Archivos exactos:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L5462-L5565) y [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L10341-L10465).
- **Causa raíz:** `#phaseTransitionVideoModal` conserva la caja negra `#0B101E` del reproductor de video antiguo, la cual invade el título `#transitionVideoTitle` debajo de ella (`studio_capsule_modal_mobile_390.png`) y aún muestra `Paso 1 · Círculo Dorado` en las píldoras superiores.
- **Plan de solución:** Eliminar por completo el recuadro rectangular oscuro y dejar **únicamente el círculo vivo de Aura** flotando limpio sobre el fondo `#FFFFFF` de la tarjeta, con botón minimalista SVG de reproducir/repetir, subtítulo corto, nombres simples de los pasos (`Paso 0` a `Paso 6` sin jerga teórica) y botones inferiores siempre visibles sin scroll.

---

## ⚡ NIVEL 3 — `[RENDIMIENTO / CÓDIGO]` (60fps, Red, Thrashing de Layout y Peso de Assets)

### `RC-01` · Descarga fantasma de video `.mp4` heredado al arrancar Web y App (`net::ERR_ABORTED`)
- **Archivo exacto:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L5511).
- **Causa raíz:** El elemento oculto `<video id="transitionTheoryVideoPlayer" src="/assets/videos/capsula_teoria_paso_0.mp4" preload="auto">` dispara en cada carga inicial una descarga pesada de video `.mp4` que luego se aborta, compitiendo por ancho de banda con las fuentes y el audio `Aoede`.
- **Plan de solución:** Eliminar `src` y cambiar a `preload="none"` en el HTML estático (conservando los archivos `.mp4` intactos en disco).

### `RC-02` · Layout Thrashing síncrono en cada renderizado (`getComputedStyle` masivo)
- **Archivo exacto:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L27292-L27309).
- **Causa raíz:** `tbbNormalizeStageReadableTypography()` recorre cientos de nodos llamando `window.getComputedStyle(el)` y escribiendo estilos inline sincrónicamente tras cada `renderTbbZeroScrollStage()`, forzando recálculos de layout en móviles.
- **Plan de solución:** Reemplazar el barrido JS `getComputedStyle` por reglas CSS declarativas limpias con tokens tipográficos y ejecutar cualquier ajuste puntual en `requestAnimationFrame` únicamente sobre el contenedor recién montado.

### `RC-03` · Doble bucle `60fps` de `<canvas>` simultáneo y miniaturas PNG de `1.6 MB` para íconos de `40×40px`
- **Archivos exactos:** [studio.html](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/studio.html#L23815-L23818), [tbb-commercial-experience-and-payments.js](file:///Users/oso/Proyectos_ImproBears_SSD/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-commercial-experience-and-payments.js#L1089-L1095) y `apps/web/assets/avi/step4_dir1..4_*.png` (`5.9 MB` combinados).
- **Causa raíz:**
  1. Cuando el usuario cambia a las pestañas 2–5 en la Web comercial, el `iframe` estacionado `#tbbRealStudioDemoIframe` sigue corriendo el `requestAnimationFrame` del orbe 3D de Aura en segundo plano aunque no está visible en pantalla.
  2. En el Paso 4.5, cuatro miniaturas de `40×40px` descargan `5.9 MB` de PNGs sin comprimir (`step4_dir1..4`), penalizando datos móviles en iPhone.
- **Plan de solución:** Pausar automáticamente el loop `requestAnimationFrame` del orbe en `studio.html` cuando `IntersectionObserver` / `postMessage` indique que el iframe está estacionado fuera de vista, y generar variantes optimizadas WebP/SVG ligeras (`<25 KB`) para las 4 miniaturas del Paso 4.5 (sin borrar los PNG originales en disco).

---

## 🏆 AUTOCRÍTICA VISUAL DE JUEZ AWWWARDS (CAPTURAS DESKTOP `1440px` Y MÓVIL `390px`)

Tras abrir la vista previa real y examinar las capturas tomadas en Desktop (`1440×900`) y Móvil (`390×844`), estos son los **últimos 3 detalles visuales clave** incorporados al plan para alcanzar nivel *Site of the Day / Apple Design Award*:

````carousel
![Web Home Desktop 1440px](/Users/oso/.gemini/antigravity/brain/d494e20d-5df7-41c7-ad31-4d13630be22d/scratch/audit_2am_previews/web_home_desktop_1440.png)
<!-- slide -->
![Web Home Mobile 390px](/Users/oso/.gemini/antigravity/brain/d494e20d-5df7-41c7-ad31-4d13630be22d/scratch/audit_2am_previews/web_home_mobile_390.png)
<!-- slide -->
![Studio Step 0 Mobile 390px](/Users/oso/.gemini/antigravity/brain/d494e20d-5df7-41c7-ad31-4d13630be22d/scratch/audit_2am_previews/studio_step0_mobile_390.png)
<!-- slide -->
![Studio Capsule Modal Mobile 390px](/Users/oso/.gemini/antigravity/brain/d494e20d-5df7-41c7-ad31-4d13630be22d/scratch/audit_2am_previews/studio_capsule_modal_mobile_390.png)
````

1. **Detalle Awwwards #1 — Encabezado Comercial Desbordado en `1440px` y Círculo Naranja Vacío en `390px`:**
   - En `web_home_desktop_1440.png`, el botón principal naranja a la derecha (`Your Brand — $49`) queda cortado (`Your B...`) y las pestañas en otros idiomas conservan prefijos `1. 2. 3. 4. 5.` más `💬 Opinión` con emoji. En `web_home_mobile_390.png`, ocultar el `<span>` del botón de compra deja un círculo naranja completamente vacío sin ícono ni precio. **Corrección:** Quitar prefijos numéricos en los 6 idiomas, compactar brechas del header para que quepa con holgura desde `1280px`, usar ícono SVG fino para `Opinión` / `Feedback`, y mostrar en móvil una píldora nítida `Pro · $49` con ícono SVG blanco visible.
2. **Detalle Awwwards #2 — Vacío Vertical Artificial dentro de `.tbb-atomic-card` y Recorte Derecho en Barra Superior Móvil del Studio:**
   - En `studio_step0_desktop_1440.png` y `studio_step0_mobile_390.png`, `justify-content: space-between` estira la tarjeta dejando un hueco blanco inerte de `~200px` entre la pregunta `¿Cuál es tu objetivo principal hoy?` y las opciones, mientras que en `390px` el selector `ES` se muerde al borde derecho y oculta los botones de voz y opinión. **Corrección:** Cambiar `.tbb-atomic-card` a flujo orgánico agrupado (`justify-content: flex-start; gap: 16px`) y estilizar `#tbbTopDiscreteBar` en móvil con botones circulares/compactos SVG de `36px` que quepan al 100% junto a la barra de progreso naranja.
3. **Detalle Awwwards #3 — Miniaturas Antiguas con Textos de Autores en `Qué Recibes` (Tab 2):**
   - En `web_tab2_desktop_1440.png`, las tarjetas `01`, `02` y `03` muestran capturas antiguas de interfaz donde todavía se alcanzan a leer micro-cintillos `"REF: DAVID AAKER"` y `"Massimo Vignelli & Paul Rand"`. **Corrección:** Sustituir esas vistas previas por láminas limpias reales del Brandbook y composiciones vectoriales puras que luzcan el producto terminado sin ruido de interfaz antigua.

---

## 📋 ORDEN DE EJECUCIÓN PROGRAMADO PARA LAS 04:00 AM (`GEMINI 4 NEON XHIGH`)
1. **Bloque 1 — `[Crítico / Funcional]`:** `CF-01` a `CF-06` + verificación sintáctica, E2E y navegador (`1440px` / `390px`).
2. **Bloque 2 — `[UX / Visual]`:** `UX-01` (0% Emojis en toda la Web y App) a `UX-04` + los 3 Detalles de Juez Awwwards + verificación `1440px` / `390px`.
3. **Bloque 3 — `[Rendimiento / Código]`:** `RC-01` a `RC-03` + auditoría final de capturas Desktop/Móvil + despliegue en vivo.
