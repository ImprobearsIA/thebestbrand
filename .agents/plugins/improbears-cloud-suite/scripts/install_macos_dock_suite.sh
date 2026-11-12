#!/usr/bin/env bash
# ==============================================================================
# IMPROBEARS MACOS DOCK SUITE INSTALLER (Max + Claude Code — Directiva C-00)
# Crea e instala en el Dock de macOS las 3 aplicaciones ejecutivas con sus
# iconos oficiales en alta resolución (1024x1024 .icns):
#   1. TheBestBrand.app  -> Atelier de Identidad de Marca (V86)
#   2. TheBestGrowth.app -> Automatización de Marketing Omnicanal, Pauta y CRM
#   3. Aura.app          -> Copiloto Ejecutivo de Voz & Puente Apple CarPlay
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ICONS_DIR="$(cd "${SCRIPT_DIR}/../assets/dock-icons" && pwd)"

if [ "$(uname -s)" != "Darwin" ]; then
  echo "ℹ️ Este instalador de Dock está diseñado para ejecutarse en macOS (Darwin)."
  echo "   Iconos PNG 1024x1024 verificados en: ${ICONS_DIR}"
  ls -la "${ICONS_DIR}"
  exit 0
fi

APPS_DIR="${HOME}/Applications/ImproBears Suite"
mkdir -p "${APPS_DIR}"

build_icns_from_png() {
  local src_png="$1"
  local out_icns="$2"
  local tmp_iconset
  tmp_iconset="$(mktemp -d)/AppIcon.iconset"
  mkdir -p "${tmp_iconset}"

  for sz in 16 32 128 256 512; do
    sips -z "${sz}" "${sz}" "${src_png}" --out "${tmp_iconset}/icon_${sz}x${sz}.png" >/dev/null 2>&1
    sz2=$((sz * 2))
    sips -z "${sz2}" "${sz2}" "${src_png}" --out "${tmp_iconset}/icon_${sz}x${sz}@2x.png" >/dev/null 2>&1
  done

  iconutil -c icns "${tmp_iconset}" -o "${out_icns}"
  rm -rf "$(dirname "${tmp_iconset}")"
}

create_macos_app_bundle() {
  local app_name="$1"
  local bundle_id="$2"
  local icon_png="$3"
  local primary_url="$4"
  local fallback_url="$5"

  local app_path="${APPS_DIR}/${app_name}.app"
  local contents_dir="${app_path}/Contents"
  local macos_dir="${contents_dir}/MacOS"
  local res_dir="${contents_dir}/Resources"

  rm -rf "${app_path}"
  mkdir -p "${macos_dir}" "${res_dir}"

  # Build .icns
  build_icns_from_png "${icon_png}" "${res_dir}/AppIcon.icns"

  # Info.plist
  cat > "${contents_dir}/Info.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleExecutable</key>
  <string>launcher</string>
  <key>CFBundleIconFile</key>
  <string>AppIcon</string>
  <key>CFBundleIdentifier</key>
  <string>${bundle_id}</string>
  <key>CFBundleName</key>
  <string>${app_name}</string>
  <key>CFBundleDisplayName</key>
  <string>${app_name}</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>3.1.0</string>
  <key>LSMinimumSystemVersion</key>
  <string>12.0</string>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>
EOF

  # Executable launcher (opens local server if active, otherwise production URL)
  cat > "${macos_dir}/launcher" <<EOF
#!/usr/bin/env bash
TARGET_URL="${primary_url}"
if [ -n "${fallback_url}" ]; then
  if curl -fsS --max-time 0.6 "${fallback_url}" >/dev/null 2>&1; then
    TARGET_URL="${fallback_url}"
  fi
fi

if [ -d "/Applications/Google Chrome.app" ]; then
  open -na "Google Chrome" --args --app="\${TARGET_URL}"
else
  open "\${TARGET_URL}"
fi
EOF
  chmod +x "${macos_dir}/launcher"

  # Register updated bundle with macOS LaunchServices and update mtime
  /System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -f "${app_path}" >/dev/null 2>&1 || true
  touch "${app_path}"

  # Also link in /Applications if writable
  if [ -w "/Applications" ]; then
    ln -sfn "${app_path}" "/Applications/${app_name}.app" || true
  fi
}

add_app_to_dock_idempotent() {
  local app_path="$1"
  if ! defaults read com.apple.dock persistent-apps 2>/dev/null | grep -Fq "${app_path}"; then
    defaults write com.apple.dock persistent-apps -array-add \
      "<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>file://${app_path}/</string><key>_CFURLStringType</key><integer>15</integer></dict></dict></dict>"
    return 0
  fi
  return 1
}

echo "🎨 Creando paquetes .app con iconos Retina 1024x1024..."

# 1. TheBestBrand (Interactive Socratic Chat + Live 3D Aura Orb Studio)
create_macos_app_bundle \
  "TheBestBrand" \
  "com.improbears.thebestbrand.dock" \
  "${ICONS_DIR}/TheBestBrand-1024.png" \
  "https://thebestbrand-studio.web.app/studio?studio=1" \
  ""

# 2. TheBestGrowth (Consola Directa de Automatización de Marketing Digital, Pauta 9:16 y Embudos Zoho CRM)
create_macos_app_bundle \
  "TheBestGrowth" \
  "com.improbears.thebestgrowth.dock" \
  "${ICONS_DIR}/TheBestGrowth-1024.png" \
  "https://improbears-com.web.app/consola-marketing#automatizacion-marketing" \
  "http://localhost:5000/consola-marketing.html#automatizacion-marketing"

# 3. Aura (Copiloto Ejecutivo de Voz Neural Gemini, Orbe Radial 60fps & Chat en Vivo)
create_macos_app_bundle \
  "Aura" \
  "com.improbears.aura.dock" \
  "${ICONS_DIR}/Aura-1024.png" \
  "https://improbears-com.web.app/voz" \
  "http://localhost:5000/voz"

for app_title in "TheBestBrand" "TheBestGrowth" "Aura"; do
  add_app_to_dock_idempotent "${APPS_DIR}/${app_title}.app" || true
done

killall Dock || true
echo "✅ Se actualizaron y refrescaron TheBestBrand, TheBestGrowth y Aura en el Dock de tu Mac."

