# DESIGN SYSTEM COMPACTO & PLAN DE REDISEÑO — `THE BEST BRAND V131` (*ATELIER LUMIÈRE*)
**Dirección Creativa & Ingeniería de Diseño:** Awwwards *Site of the Day* + *Apple Design Award* Standard  
**Fecha:** `2026-11-21 · 06:00 AM CST`  
**Alcance:** Landing Comercial (`index.html`, `website.html`, `tbb-commercial-experience-and-payments.js`) + Aplicación Interactiva (`studio.html`, `tbb-executive-deliverables-suite.js`, `tbb-multilingual-gemini-voice.js`)

---

## 1. FILOSOFÍA VISUAL: «ATELIER LUMIÈRE» (CERO PLANTILLA GENÉRICA DE IA)
Eliminamos cualquier rastro de plantilla genérica de IA (bordes gruesos caricaturescos en controles secundarios, overlays grises opacos de carga, tarjetas con vacíos artificiales, sombras duras de una sola capa y capturas estáticas heredadas) mediante **precisión editorial suiza sobre Lienzo Claro `#FFFFFF` (`70 / 20 / 10`)**, física táctil nativa tipo iOS/macOS y composición tipográfica de alto contraste.

---

## 2. TOKENS OFICIALES DEL DESIGN SYSTEM (`--tbb-ds-*`)

### 2.1 Paleta y Arquitectura de Luz (`70 / 20 / 10`)
| Token | Valor | Uso Estricto |
| :--- | :--- | :--- |
| `--tbb-ds-canvas` | `#FFFFFF` | Lienzo maestro (`70%` respiración pura) |
| `--tbb-ds-surface-1` | `#F8FAFC` | Superficie secundaria sutil (contenedores, bandejas de trabajo) |
| `--tbb-ds-surface-2` | `#F1F5F9` | Estados hover neutros, rieles de progreso, skeletons base |
| `--tbb-ds-glass` | `rgba(255, 255, 255, 0.86)` | Barras superiores/inferiores con `backdrop-filter: saturate(180%) blur(18px)` |
| `--tbb-ds-ink-strong` | `#0D2540` | Titulares, marca primaria y botones de confirmación |
| `--tbb-ds-ink-body` | `#1E293B` | Cuerpo editorial de lectura cómoda |
| `--tbb-ds-ink-muted` | `#475569` | Metadatos y subtítulos de apoyo (contraste AA garantizado `>= 7:1`) |
| `--tbb-ds-brand-blue` | `#426EAE` | Acento institucional, estados activos secundarios y enlaces |
| `--tbb-ds-brand-sky` | `#4C9DE6` | Anillos `:focus-visible`, indicadores vivos y selección |
| `--tbb-ds-accent` | `#FF7A00` | Acción primaria, progreso activo y pulso vocal de Aura (`10%` focal) |
| `--tbb-ds-hairline` | `rgba(13, 37, 64, 0.085)` | Bordes arquitectónicos de `1px` de baja opacidad |
| `--tbb-ds-hairline-strong` | `rgba(13, 37, 64, 0.15)` | Bordes de inputs e interacciones en reposo |

### 2.2 Escala Tipográfica, Tracking Óptico y Ritmo
- **Display & Titulares (`Montserrat`):**
  - `Hero H1`: `clamp(2.25rem, 4.6vw, 3.75rem)` · peso `700` · `letter-spacing: -0.034em` · `line-height: 1.07` · `text-wrap: balance`.
  - `Section H2`: `clamp(1.65rem, 3vw, 2.45rem)` · peso `700` · `letter-spacing: -0.026em` · `line-height: 1.15` · `text-wrap: balance`.
  - `Card / Studio H3`: `clamp(1.12rem, 1.6vw, 1.32rem)` · peso `700` · `letter-spacing: -0.018em` · `line-height: 1.28`.
- **Cuerpo, Controles y Datos (`Plus Jakarta Sans`):**
  - `Lead`: `1.125rem` (`18px`) · peso `450–500` · `line-height: 1.62` · `max-width: 62ch`.
  - `Body / Inputs`: `1rem` (`16px` — evita auto-zoom en iOS Safari/WKWebView) · peso `500` · `line-height: 1.58`.
  - `UI Pills / Micro-labels`: piso estricto `0.875rem` (`14px`) · peso `600` · `font-variant-numeric: tabular-nums` en tiempos, pasos y precios.

### 2.3 Sistema Espacial (`4px / 8px`) y Radios Concéntricos
- **Espaciado:** `--sp-1: 4px`, `--sp-2: 8px`, `--sp-3: 12px`, `--sp-4: 16px`, `--sp-5: 20px`, `--sp-6: 24px`, `--sp-8: 32px`, `--sp-10: 44px`, `--sp-12: 68px`.
- **Radios Concéntricos (`R_outer = R_inner + padding`):**
  - Ventana / Escenario Maestro: `28px`
  - Tarjetas Editoriales y Modales: `22px`
  - Tarjetas Internas / Opciones Táctiles: `16px`
  - Inputs y Botones de Acción: `14px`
  - Píldoras de Navegación y Estado: `999px`

### 2.4 Profundidad Multicapa y Sombras Ambientales
- `--tbb-ds-shadow-xs`: `0 1px 2px rgba(13, 37, 64, 0.04)`
- `--tbb-ds-shadow-sm`: `0 1px 2px rgba(13, 37, 64, 0.04), 0 6px 16px -4px rgba(13, 37, 64, 0.06)`
- `--tbb-ds-shadow-md`: `0 2px 4px rgba(13, 37, 64, 0.04), 0 14px 34px -8px rgba(13, 37, 64, 0.08)`
- `--tbb-ds-shadow-stage`: `0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 2px 6px rgba(13, 37, 64, 0.04), 0 24px 56px -12px rgba(13, 37, 64, 0.10)`

### 2.5 Iconografía Vectorial (`0%` Emojis Unicode)
- **Regla Absoluta:** `0` emojis Unicode o banderas en Web y App.
- Todos los íconos emplean `<svg>` inline con `stroke-width="1.65"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"` y color heredado por `currentColor`.

### 2.6 Curvas de Movimiento a `60fps` (Exclusivamente GPU: `transform` y `opacity`)
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)` (entradas de vistas, modales y reveals al hacer scroll — `380ms–480ms`).
- `--ease-spring`: `cubic-bezier(0.22, 1, 0.36, 1)` (micro-interacciones táctiles y cambio de sub-paso — `180ms–240ms`).
- **Física Táctil:** `:hover` eleva tarjetas con `transform: translate3d(0, -2px, 0)`; `:active` responde al instante con `transform: scale(0.982)` (`90ms`), `touch-action: manipulation`, y respeto íntegro a `@media (prefers-reduced-motion: reduce)`.

---

## 3. PLAN DE REDISEÑO SECCIÓN POR SECCIÓN

1. **Web · Header & Navegación Global:** Barra translúcida `backdrop-filter: saturate(180%) blur(18px)` con borde hairline `1px`, cápsula de navegación de alto contraste, estados `:focus-visible` nítidos y transición GPU al cambiar entre las 5 secciones.
2. **Web · Sección 1 (`Inicio — "Your Brand, Now!!!"` + Demo Viva):** Atmósfera luminosa sutil de estudio (malla arquitectónica al `2.5%` de opacidad sobre `#FFFFFF`), las 4 píldoras de promesa alineadas en una sola fila equilibrada en escritorio, marco tipo ventana de estudio Apple alrededor de `#tbbHomeLiveDemoCard` y sincronización inmediata del idioma inicial en el `iframe` embebido.
3. **Web · Sección 2 (`Qué Recibes`):** Bento editorial con marcos tipo hoja de papel sobre mesa de luz (`#F4F7FB`), vistas previas vectoriales/editoriales limpias (sin micro-textos internos heredados en la portada de muestra) y elevación GPU sutil en hover.
4. **Web · Sección 3 (`Cómo Funciona`):** Narrativa **Sticky Scrollytelling** en escritorio (panel resumen sticky a la izquierda + recorrido limpio de los 7 pasos a la derecha con tarjetas UI vectoriales modernas libres de capturas V80 antiguas con citas de autores) + comparador Antes/Después fluido a `60fps`.
5. **Web · Secciones 4 y 5 (`Ejemplos Reales` y `Referencias`):** Galería curada con reveals escalonados por `IntersectionObserver` (`opacity` + `translate3d`), selector de iteraciones con respuesta táctil instantánea y simulador Kansei pulido.
6. **App (`studio.html` & `tbb-executive-deliverables-suite.js`):**
   - **Superficies y Botones Nivel Apple Design Award:** Píldoras secundarias refinadas con borde `1px` y relieve sutil (reservando el acento sólido profundo para estados seleccionados y acciones primarias), eliminando el peso visual excesivo en pantallas densas como Paso `5.2`.
   - **Paso `0.1` y Estados Vacíos:** Opciones con descriptores claros e iconografía SVG fina agrupadas con ritmo natural (eliminando el hueco blanco de `240px` en móvil), y zona de subida de logo con estética limpia de mesa de diseño.
   - **Skeletons Luminosos GPU (`60fps` Shimmer):** Sustitución total del overlay gris oscuro opaco en Paso `5.2` (`Aura diseñando tu logotipo`), generación de nombres en Paso `3` y generación de Mockups por un **Skeleton Luminoso sobre `#FFFFFF`/`#F8FAFC`** con barrido GPU `translate3d(-100%, 0, 0) -> translate3d(100%, 0, 0)`.
   - **Transiciones Suaves entre Pasos:** Entrada `opacity` + `translate3d(0, 6px, 0)` en `200ms` únicamente al cambiar de `step`/`subStep` (nunca al teclear, preservando el foco al 100%).
