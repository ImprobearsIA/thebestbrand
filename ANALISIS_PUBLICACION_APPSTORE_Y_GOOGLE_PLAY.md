# Análisis Técnico, Regulatorio y Operativo para Publicar **THE BEST BRAND** en Apple App Store y Google Play Store

> **Documento Oficial de Ingeniería y Lanzamiento — Edición Brandbook 1.0 (`v56.0`)**
> **Producto:** `THE BEST BRAND — YOUR BRAND, NOW!!!`
> **Arquitectura Actual:** Web App Progresiva (PWA) + Motor Vectorial de 30 Láminas en Curvas + Voz Neural Gemini 24 kHz + Checkout Multi-Método (`Tarjeta`, `Apple Pay`, `Google Pay`, `PayPal`).

---

## 1. Resumen Ejecutivo: Estrategia Dual (Web Comercial + Tiendas Nativas)

Para publicar **The Best Brand** en **Apple App Store (iOS / iPadOS / macOS)** y **Google Play Store (Android)** manteniendo el 100% de la velocidad a 60 FPS del orbe cuántico de **Aura**, el síntesis de voz neural de Gemini y la generación de las 30 láminas en curvas (`.PDF`, `.HTML`, `.SVG`), la ruta técnica recomendada y libre de fricción es:

1. **Empaquetado Nativo Híbrido con Capacitor 6 (`@capacitor/core`, `@capacitor/ios`, `@capacitor/android`)**:
   - Envuelve el directorio [`apps/web/`](file:///Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi%20unidad/_1%20IMPROBEARS/Proyectos%20Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/index.html) dentro de un contenedor nativo real (`WKWebView` en iOS y `System WebView` / `Trusted Web Activity` en Android) con acceso a APIs nativas del sistema operativo (Sistema de Archivos para guardar el PDF de 30 láminas, Share Sheet nativo, Micrófono nativo, Haptics y Compras In-App).
2. **Separación Inteligente de Pasarelas de Pago (Cumplimiento Estricto de Políticas de Tiendas)**:
   - **En la Web Comercial (`/web` y navegador móvil/escritorio):** Se utilizan directamente **Tarjeta de Crédito/Débito (Stripe / Procesador Bancario)**, **Apple Pay Web**, **Google Pay Web** y **PayPal** (comisión estándar de pasarela ~2.9% + $0.30 USD).
   - **Dentro del binario descargado desde Apple App Store y Google Play Store:** Apple (Guideline 3.1.1) y Google (Play Billing Policy) exigen que el desbloqueo de funciones digitales dentro de la app utilice **StoreKit 2 (Apple In-App Purchase)** y **Google Play Billing Library v7** (comisión del 15% aplicando a los programas *App Store Small Business Program* y *Google Play 15% Service Fee Tier*), o bien que la app opere bajo modalidad **"Multiplatform SaaS / Reader & Companion"** donde los usuarios que adquirieron su licencia en la página comercial inician sesión con su cuenta sincronizada.

---

## 2. Requisitos para **Apple App Store** (iOS / iPadOS / macOS)

### 2.1. Cuenta y Registro Corporativo
| Requisito | Detalle y Costo | Tiempo Estimado |
| :--- | :--- | :--- |
| **Apple Developer Program** | Membresía anual de **$99 USD / año** (se recomienda inscripción como Organización bajo ImproBears / razón social). | 24 a 72 horas |
| **Número D-U-N-S** | Identificador empresarial gratuito de Dun & Bradstreet (obligatorio para publicar como empresa y no a título personal). | 3 a 5 días hábiles |
| **Certificados y Provisioning** | `Apple Distribution Certificate` + `App ID` (`com.improbears.thebestbrand`) + `Merchant ID` (`merchant.com.improbears.thebestbrand` para Apple Pay). | 30 minutos en Xcode |

### 2.2. Requerimientos Técnicos en Xcode (`ios/App`)
1. **Xcode 16+ y SDK de iOS 18**: Obligatorio para envíos actuales a App Store Connect.
2. **Declaraciones de Permisos en `Info.plist` (Obligatorias para pasar revisión)**:
   - `NSMicrophoneUsageDescription`: *"The Best Brand utiliza el micrófono para que puedas dictar a Aura el giro, propósito y ajustes de tu marca por voz."*
   - `NSSpeechRecognitionUsageDescription`: *"The Best Brand transcribe tu voz en tiempo real durante los Pasos 0, 1 y 5 del taller de identidad."*
   - `NSPhotoLibraryAddUsageDescription` y `UIFileSharingEnabled`: *"Permite subir tu logotipo actual como base en el Paso 0 y guardar tu Manual Oficial de 30 Láminas en PDF y SVG."*
3. **Privacy Manifest (`PrivacyInfo.xcprivacy`)**:
   - Exigido por Apple desde 2024/2025 para declarar el uso de `UserDefaults` / almacenamiento local (`CA92.1`) donde se persiste el avance del taller.
4. **Regla 4.2 de Revisión de Apple (*Minimum Functionality*)**:
   - Apple rechaza sitios web simples empaquetados sin valor nativo. **The Best Brand** supera ampliamente esta regla gracias al taller interactivo de 7 pasos, el lienzo generativo 3D, el sintetizador de voz de Aura y el motor local de exportación de 30 láminas en PDF. Se recomienda añadir `@capacitor/haptics` (vibración sutil al avanzar de paso) y `@capacitor/share` (hoja nativa de compartir en iOS para enviar el PDF por AirDrop / WhatsApp / Archivos).

### 2.3. Activos Gráficos y Metadatos para App Store Connect
- **App Icon Oficial:** `1024 × 1024 px` en formato PNG sin transparencia ni esquinas redondeadas (generado directamente desde el emblema 3D del Brandbook 1.0 sobre fondo `#090D16` con núcleo `#F97316` y anillos `#1D4ED8`).
- **Capturas de Pantalla (Screenshots):**
  - iPhone 6.9" / 6.7" (`1320 × 2868 px` o `1290 × 2796 px`) — mínimo 4 a 6 capturas mostrando: Splashboot de Aura, Paso 1 (Círculo Dorado), Paso 5 (Lienzo 3D de Logotipo) y Paso 6 (Visor de 30 Láminas en Curvas).
  - iPad Pro 13" (`2064 × 2752 px` o horizontal `2752 × 2064 px`).
- **URL de Política de Privacidad y Términos de Uso:** Hospedada públicamente en `https://thebestbrand-studio.web.app/privacy`.
- **Cuenta Demo para el Revisor de Apple (*App Review Information*):** Proveer en las notas de revisión un usuario y contraseña con una marca pre-cargada para que el revisor de Apple pueda probar los Pasos 0 al 6 y descargar el PDF de 30 láminas en menos de 2 minutos.

---

## 3. Requisitos para **Google Play Store** (Android)

### 3.1. Cuenta y Registro en Google Play Console
| Requisito | Detalle y Costo | Tiempo Estimado |
| :--- | :--- | :--- |
| **Google Play Console** | Pago único de **$25 USD** de por vida. | Inmediato (verificación de identidad en 48 h) |
| **Verificación de Desarrollador (D-U-N-S)** | Para cuentas de organización, Google solicita documento constitutivo y número D-U-N-S; las cuentas de organización **no requieren** la prueba cerrada de 20 testers durante 14 días (que sí se exige a cuentas personales nuevas). | 2 a 4 días hábiles |
| **Play App Signing** | Generación de llave de subida (`.jks` / `upload-keystore`) para firmar el paquete `.aab` (*Android App Bundle*). | 15 minutos en Android Studio |

### 3.2. Requerimientos Técnicos en Android Studio (`android/app`)
1. **Formato de Entrega:** **Android App Bundle (`.aab`)** obligatorio (no `.apk`).
2. **Nivel de API Objetivo (`targetSdkVersion`):** **API Level 35 (Android 15)** obligatorio para nuevas aplicaciones en Google Play.
3. **Permisos en `AndroidManifest.xml`:**
   - `<uses-permission android:name="android.permission.INTERNET" />`
   - `<uses-permission android:name="android.permission.RECORD_AUDIO" />` (para dictado por voz a Aura).
4. **Formulario de Seguridad de los Datos (*Data Safety Section*):**
   - Declarar que los datos de la marca y correo electrónico se cifran en tránsito (HTTPS/TLS) y que el usuario tiene un botón directo para eliminar su cuenta y sus datos desde el modal **Mi Cuenta**.

### 3.3. Activos Gráficos para Google Play Console
- **Ícono de Alta Resolución:** `512 × 512 px` (PNG de 32 bits).
- **Gráfico de Funciones (*Feature Graphic*):** `1024 × 500 px` con la estética del Brandbook 1.0 (corte geométrico `#F97316`, emblema 3D y título `THE BEST BRAND — YOUR BRAND, NOW!!!`).
- **Capturas de Pantalla:**
  - Teléfono (2 a 8 capturas en 16:9 o 9:16, mín. `1080 × 1920 px`).
  - Tablet de 7" y 10" (`1920 × 1200 px`).
- **Clasificación de Contenido (IARC):** Cuestionario dentro de Play Console (Categoría: *Productividad / Negocios / Diseño*, clasificación `Para todos / Everyone`).

---

## 4. Arquitectura de Pagos: Web Comercial vs. Tiendas Nativas

| Canal | Métodos de Pago Activos | Regulación Aplicable |
| :--- | :--- | :--- |
| **Página Comercial (`/web` / Navegador)** | **Tarjeta (Visa/MC/Amex), Apple Pay, Google Pay y PayPal** (implementados en [`tbb-commercial-experience-and-payments.js`](file:///Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi%20unidad/_1%20IMPROBEARS/Proyectos%20Antigravity/02_PRODUCTOS_PROPIOS/TheBestBrand/apps/web/tbb-commercial-experience-and-payments.js)). | Libertad total de pasarela (Stripe + PayPal Checkout). Activación instantánea de licencia vinculada al correo del usuario. |
| **App Nativa iOS (App Store)** | **StoreKit 2 (Apple In-App Purchase)** para compras iniciadas dentro de iOS + Inicio de sesión para clientes que compraron en la Web Comercial. | Cumple Guideline 3.1.1 y 3.1.3(b) (*Multiplatform Services*). |
| **App Nativa Android (Google Play)** | **Google Play Billing v7** para compras iniciadas dentro de Android + Inicio de sesión para clientes que compraron en la Web Comercial. | Cumple Google Play Payments Policy. |

---

## 5. Hoja de Ruta de Ejecución en 4 Pasos para Subir a Tiendas

1. **Paso 1 — Inicializar Contenedor Nativo Capacitor en el Proyecto:**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android @capacitor/share @capacitor/filesystem @capacitor/haptics
   npx cap init "The Best Brand" "com.improbears.thebestbrand" --web-dir="apps/web"
   npx cap add ios
   npx cap add android
   npx cap sync
   ```
2. **Paso 2 — Configurar llaves en Producción de Stripe (Tarjeta / Apple Pay / Google Pay) y PayPal:**
   - Vincular el `merchant.com.improbears.thebestbrand` en el dashboard de Stripe / Apple Developer y el `Client ID` de PayPal Live para el checkout de la página comercial (`/web`).
3. **Paso 3 — Compilar y Subir a TestFlight (Apple App Store):**
   - Abrir `npx cap open ios` en Xcode -> Seleccionar equipo `ImproBears` -> `Product > Archive` -> `Distribute App > App Store Connect`.
4. **Paso 4 — Compilar y Subir a Google Play Console (Android):**
   - Abrir `npx cap open android` en Android Studio -> `Build > Generate Signed App Bundle (.aab)` -> Subir al canal de **Producción** en Google Play Console.
