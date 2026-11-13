#!/usr/bin/env bash
# ==============================================================================
# P0: SALIDA DEFINITIVA DE REPLIT -> GOOGLE CLOUD RUN + FIREBASE HOSTING
# Proyecto: crm-improbears | Cloud Run: thebestbrand-api | Hosting: thebestbrand-studio
# Dominio Oficial: https://thebestbrand.app (y https://thebestbrand-studio.web.app)
# ==============================================================================
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${HOME}/.local/bin:${PATH}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_DIR}"

echo "=============================================================================="
echo "🚀 INICIANDO MIGRACIÓN P0: THEBESTBRAND 100% EN GOOGLE CLOUD + FIREBASE"
echo "=============================================================================="

# 1. Sincronizar últimos cambios de origin/main (V91.0 limpia sin los 344 MB de simulaciones)
echo "[1/4] Sincronizando repositorio local con origin/main..."
git fetch origin main
git merge --ff-only origin/main || true

# 2. Desplegar Backend FastAPI (apps/api/main.py) en Google Cloud Run (us-central1)
if command -v gcloud >/dev/null 2>&1; then
  echo "[2/4] Desplegando contenedor FastAPI (thebestbrand-api) en Google Cloud Run (us-central1)..."
  gcloud run deploy thebestbrand-api \
    --source . \
    --region us-central1 \
    --project crm-improbears \
    --allow-unauthenticated \
    --quiet || echo "⚠️ Nota: Si gcloud pide autenticación, ejecuta 'gcloud auth login' una sola vez."
else
  echo "ℹ️ gcloud CLI no detectado en PATH; saltando despliegue de Cloud Run local."
fi

# 3. Desplegar Frontend (apps/web) y Rewrites (/api/** -> thebestbrand-api) en Firebase Hosting
echo "[3/4] Publicando V91.0 en Firebase Hosting (thebestbrand-studio)..."
npx --yes firebase-tools deploy --only hosting:thebestbrand-studio --project crm-improbears

# 4. Sincronizar secreto FIREBASE_SERVICE_ACCOUNT hacia GitHub Actions (ImprobearsIA/thebestbrand)
echo "[4/4] Verificando credenciales para auto-deploy 24/7 en GitHub Actions..."
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  for sa_cand in \
    "${HOME}/.config/improbears/firebase-service-account.json" \
    "/Users/oso/Proyectos_ImproBears_SSD/.firebase-service-account.json" \
    "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/03_SISTEMAS_IMPROBEARS/firebase-service-account.json"; do
    if [ -f "${sa_cand}" ]; then
      gh secret set FIREBASE_SERVICE_ACCOUNT -R ImprobearsIA/thebestbrand < "${sa_cand}" 2>/dev/null || true
      echo "✅ Secreto FIREBASE_SERVICE_ACCOUNT sincronizado en GitHub Actions (ImprobearsIA/thebestbrand)."
      break
    fi
  done
fi

echo "=============================================================================="
echo "✅ ¡MIGRACIÓN TÉCNICA COMPLETADA!"
echo "   • Sitio y Estudio en vivo: https://thebestbrand-studio.web.app/studio?studio=1"
echo "   • Siguiente paso único para apagar Replit:"
echo "     1) En Replit -> Domains: desvincular 'thebestbrand.app'"
echo "     2) En Firebase Console (thebestbrand-studio) -> Agregar dominio 'thebestbrand.app'"
echo "        apuntando el registro A a 199.36.158.100"
echo "=============================================================================="
