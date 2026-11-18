# 🚀 KIT LISTO PARA COPIAR Y PEGAR HOY EN APP STORE CONNECT (`iOS` · `iPadOS` · `macOS`) Y GOOGLE PLAY (`Android`)

Todo el código nativo (`ios/` y `android/`), iconos `1024×1024` sin canal alfa, permisos de micrófono/voz (`Info.plist` + `PrivacyInfo.xcprivacy` + `AndroidManifest.xml`) y páginas legales obligatorias ya están activos en producción.

---

## 🍎 PARTE 1: SUBIR HOY A APPLE (`iOS`, `iPadOS` y `macOS` vía Tu Licencia Apple Developer)

### Paso 1: Dar de alta el App en App Store Connect (2 minutos)
1. Entra a **[https://appstoreconnect.apple.com/apps](https://appstoreconnect.apple.com/apps)** con tu cuenta Apple Developer.
2. Haz clic en el botón **`+` (Nueva App)** y llena así:
   - **Plataformas:** Marca **`iOS`** y **`macOS`** (iPadOS se incluye automáticamente dentro de iOS Universal).
   - **Nombre:** `The Best Brand`
   - **Idioma principal:** `Español (México)` (o `Spanish`)
   - **ID de paquete (Bundle ID):** Si no aparece en la lista, haz clic en *"Registrar un nuevo ID de paquete en Developer Portal"* con:
     - **Description:** `The Best Brand Atelier`
     - **Bundle ID (Explicit):** `com.improbears.thebestbrand`
   - **SKU:** `TBB-IMPROBEARS-2026`
   - **Acceso de usuarios:** `Acceso completo`

### Paso 2: Subir el Build desde tu Mac a TestFlight (3 minutos)
En la Terminal de tu Mac, dentro de la carpeta del proyecto `thebestbrand`, corre este único comando:
```bash
bash scripts/publicar_alpha_apple_testflight_hoy.sh
```
Esto actualizará el repositorio y abrirá automáticamente **`ios/App/App.xcodeproj`** en **Xcode**:
1. En Xcode, haz clic en **`App`** (barra lateral izquierda) → pestaña **`Signing & Capabilities`**.
2. En **`Team`**, selecciona tu cuenta de **Apple Developer**.
3. En la barra superior de Xcode selecciona como destino **`Any iOS Device (arm64)`** y ve al menú **`Product → Archive`**.
4. Al terminar (toma ~40 segundos), se abre la ventana *Organizer*: haz clic en **`Distribute App` → `TestFlight & App Store` → `Distribute`**.
5. *(Opcional para app nativa dedicada de Mac además de Apple Silicon)*: Cambia el destino a **`Any Mac (Mac Catalyst)`** y repite **`Product → Archive → Distribute App`**.

### Paso 3: Textos y URLs Oficiales para Copiar y Pegar en App Store Connect / TestFlight
- **URL de Política de Privacidad (Ya activa):** `https://thebestbrand.app/privacidad`
- **URL de Soporte (Ya activa):** `https://thebestbrand.app/soporte`
- **URL de Eliminación de Cuenta (Ya activa):** `https://thebestbrand.app/eliminar-cuenta`
- **Subtítulo (30 caracteres máx.):** `Identidad de Marca y Logo IA`
- **Descripción para TestFlight / App Store:**
  > The Best Brand es el primer Atelier de Identidad Visual Algorítmica guiado por voz e Inteligencia Artificial (Aura). Recorre los 6 pasos científicos (Propósito Golden Circle, Touchpoints, Naming + Clase Niza, ADN Kansei, Logotipo en Curvas Vectoriales y Brandbook Editorial de 36 Láminas) y descarga tu paquete completo de 12 archivos ejecutivos listos para imprenta y web.
- **Notas para el Revisor de Apple (Beta App Review Notes):**
  > Los Pasos 0, 1, 2 y 3 son 100% abiertos sin inicio de sesión. Para desbloquear gratuitamente los Pasos 4, 5 y 6 durante la revisión o prueba Alpha, ingrese el código de pase gratuito `ALPHA100` o `TESTER-VIP` en el Paso 4 ($0.00 USD sin tarjeta).

---

## 🤖 PARTE 2: ANDROID (Cómo probar HOY mismo sin cuenta + Cómo activar Google Play)

### Opción A: Probar HOY MISMO en celulares/tablets Android (Sin esperar la cuenta de Google Play)
Nuestro flujo de **GitHub Actions (`.github/workflows/build-alpha-ios-macos-android.yml`)** compila automáticamente en la nube de GitHub el instalador directo **`TheBestBrand-Alpha-Android-DirectInstall-APK` (`app-debug.apk`)**:
1. Entra a tu repositorio en GitHub: **`https://github.com/ImprobearsIA/thebestbrand/actions`**
2. Haz clic en la ejecución **`Build Alpha (iOS · iPadOS · macOS · Android APK & AAB)`**.
3. En la sección **Artifacts** descarga **`TheBestBrand-Alpha-Android-DirectInstall-APK`**.
4. Ese archivo `.apk` se lo puedes mandar **hoy mismo por WhatsApp o Google Drive** a cualquier tester con Android para que lo instale directo en su teléfono o tablet sin pasar por Google Play.

### Opción B: Dar de alta la cuenta Google Play Console ($25 USD pago único)
Cuando registres la cuenta en **[https://play.google.com/console/signup](https://play.google.com/console/signup)**:
1. Elige **Cuenta de Organización (`ImproBears`)** (con tu D-U-N-S) para evitar el requisito de 14 días de las cuentas personales.
2. En esa misma página de GitHub Actions ya está generado y listo el archivo **`TheBestBrand-Alpha-GooglePlay-AAB` (`app-debug.aab`)** para subirlo directo a **Google Play Console → Testing → Internal Testing**.
