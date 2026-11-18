#!/usr/bin/env bash
# ==============================================================================
# THE BEST BRAND — SCRIPT DE LANZAMIENTO ALPHA HOY (iOS · iPadOS · macOS)
# Ejecutar en tu Mac (con tu cuenta Apple Developer activa en Xcode):
#   bash scripts/publicar_alpha_apple_testflight_hoy.sh
# ==============================================================================
set -e

echo "=================================================================="
echo "🚀 PREPARANDO THE BEST BRAND ALPHA (iOS · iPadOS · macOS)"
echo "   Bundle ID: com.improbears.thebestbrand"
echo "=================================================================="

git pull origin main
npm install --no-audit --no-fund
npx cap sync ios

echo ""
echo "✅ Proyecto Universal de Xcode sincronizado en: ios/App/App.xcodeproj"
echo "👉 Abriendo Xcode automáticamente..."
echo ""
echo "PASOS EN XCODE (Toma 2 minutos):"
echo "  1. En el panel izquierdo haz clic en 'App' -> pestaña 'Signing & Capabilities'."
echo "  2. En 'Team', selecciona tu cuenta Apple Developer (ImproBears / Jorge Benítez)."
echo "  3. Arriba en el selector de dispositivo elige 'Any iOS Device (arm64)' (y para Mac: 'Any Mac (Mac Catalyst)')."
echo "  4. En la barra superior de Xcode ve a: Product -> Archive."
echo "  5. Cuando termine el Archive, haz clic en el botón azul 'Distribute App' -> 'TestFlight & App Store' -> 'Distribute'."
echo "=================================================================="

open ios/App/App.xcodeproj
