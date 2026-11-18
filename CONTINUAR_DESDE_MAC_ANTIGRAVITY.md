# 🚀 HANDOFF OFICIAL PARA SESIÓN LOCAL EN MAC (ANTIGRAVITY DESKTOP)

Este archivo documenta el estado exacto dejado por la sesión Cloud (`commit 5526d7f`) para que el agente ejecutándose localmente en la Mac de Jorge (`thebestbrand`) tome el control inmediato del navegador de la Mac y de Xcode.

## 1. Todo lo que ya está listo en `origin/main` (`git pull origin main`)
- **Sistema de Códigos de Descuento, Pases VIP Alpha Tester (`ALPHA100`, `TESTER-VIP`, `RESENA-TBB`, `IMPROBEARS-VIP`, `LUIS-PONCE-VIP`, `FOUNDER50`, `ALPHA80`) y Módulo de Reseñas de 5 Estrellas:** Activo en `apps/api/main.py`, `apps/web/tbb-commercial-experience-and-payments.js` y Paso 4 de `apps/web/studio.html`.
- **Páginas Legales Obligatorias de Tiendas:** Activas en `/privacidad`, `/soporte`, `/eliminar-cuenta` y `/alpha`.
- **Proyecto Universal de Apple (`iOS` + `iPadOS` + `macOS`):** Generado y configurado en `ios/App/App.xcodeproj` (`Bundle ID: com.improbears.thebestbrand`, `Info.plist` con permisos de micrófono/voz/fotos, `ITSAppUsesNonExemptEncryption = false`, `PrivacyInfo.xcprivacy`, `SUPPORTS_MACCATALYST = YES` e icono `1024x1024` RGB sin canal alfa).
- **Proyecto Nativo de Android + Instalador Compilado:** Generado en `android/` y compilado en `apps/web/assets/releases/TheBestBrand_Alpha_v1.0.0.apk` (`5.2 MB`).

## 2. Instrucciones Exactas de Ejecución para el Agente Local en la Mac de Jorge
1. Ejecutar `git pull origin main` en la carpeta local de `thebestbrand`.
2. Abrir en el navegador local de la Mac:
   - `https://developer.apple.com/account/resources/identifiers/add/bundleId` → Registrar Bundle ID explícito `com.improbears.thebestbrand` (`The Best Brand Atelier`).
   - `https://appstoreconnect.apple.com/apps` → Crear Nueva App (`iOS` + `macOS`), Nombre: `The Best Brand`, Bundle ID: `com.improbears.thebestbrand`, SKU: `TBB-IMPROBEARS-2026`, URL Privacidad: `https://thebestbrand.app/privacidad`, URL Soporte: `https://thebestbrand.app/soporte`.
3. Ejecutar `bash scripts/publicar_alpha_apple_testflight_hoy.sh` (o `xcodebuild` con el Team de Apple Developer de Jorge) para archivar y subir el build a **TestFlight** (`iOS`, `iPadOS` y `macOS`).
4. Para Android: si Jorge desea abrir la cuenta de Google Play Console ($25 USD como Organización ImproBears con D-U-N-S), abrir `https://play.google.com/console/signup` y subir el `.aab`.
