#!/usr/bin/env bash
# ==============================================================================
# THE BEST BRAND — SCRIPT DE LANZAMIENTO AUTOMÁTICO A TESTFLIGHT (iOS · iPadOS · macOS)
# Archiva y sube automáticamente iOS/iPadOS (.ipa) y macOS Catalyst (.pkg) a TestFlight
# usando la llave oficial App Store Connect API (Key ID: 39SVX48393).
# ==============================================================================
set -e

echo "=================================================================="
echo "🚀 PUBLICANDO THE BEST BRAND ALPHA EN TESTFLIGHT (iOS · iPadOS · macOS)"
echo "   Bundle ID: com.improbears.thebestbrand | App ID: 6836450465"
echo "   Team ID:   6XS66NSWN6"
echo "=================================================================="

git pull origin main
npm install --no-audit --no-fund
npx cap sync ios

KEY_PATH="$HOME/.appstoreconnect/private_keys/AuthKey_39SVX48393.p8"
KEY_ID="39SVX48393"
ISSUER_ID="7cccb707-bcb3-4289-bf5e-631054c5b190"

if [ -f "$KEY_PATH" ]; then
  echo "📦 1/2 Archivando y subiendo Build Universal iOS + iPadOS..."
  xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Release \
    -destination "generic/platform=iOS" -allowProvisioningUpdates \
    -authenticationKeyPath "$KEY_PATH" -authenticationKeyID "$KEY_ID" -authenticationKeyIssuerID "$ISSUER_ID" \
    archive -archivePath ios/build/TheBestBrand_iOS.xcarchive

  xcodebuild -exportArchive -archivePath ios/build/TheBestBrand_iOS.xcarchive \
    -exportOptionsPlist ios/ExportOptions_AppStore.plist -exportPath ios/build/export_ios \
    -allowProvisioningUpdates \
    -authenticationKeyPath "$KEY_PATH" -authenticationKeyID "$KEY_ID" -authenticationKeyIssuerID "$ISSUER_ID"

  echo "💻 2/2 Archivando y subiendo Build Nativo macOS (Mac Catalyst)..."
  xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Release \
    -destination "generic/platform=macOS,variant=Mac Catalyst" -allowProvisioningUpdates \
    -authenticationKeyPath "$KEY_PATH" -authenticationKeyID "$KEY_ID" -authenticationKeyIssuerID "$ISSUER_ID" \
    archive -archivePath ios/build/TheBestBrand_macOS.xcarchive

  xcodebuild -exportArchive -archivePath ios/build/TheBestBrand_macOS.xcarchive \
    -exportOptionsPlist ios/ExportOptions_AppStore.plist -exportPath ios/build/export_macos \
    -allowProvisioningUpdates \
    -authenticationKeyPath "$KEY_PATH" -authenticationKeyID "$KEY_ID" -authenticationKeyIssuerID "$ISSUER_ID"

  echo "✅ Builds de iOS, iPadOS y macOS subidos exitosamente a TestFlight."
else
  echo "⚠️ No se encontró $KEY_PATH. Abriendo Xcode..."
  open ios/App/App.xcworkspace
fi
