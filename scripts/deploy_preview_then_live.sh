#!/bin/zsh
# ==============================================================================
# [#0703] Despliegue Atómico con Preview Channel — TheBestBrand Studio
# Uso:
#   ./scripts/deploy_preview_then_live.sh preview   # Despliega en canal preview de 7 días
#   ./scripts/deploy_preview_then_live.sh live      # Promueve a producción live
# ==============================================================================
set -e
MODE="${1:-preview}"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

if [ "$MODE" = "preview" ]; then
  echo "🧪 [#0703] Desplegando en Canal de Previsualización (staging-v82)..."
  /usr/local/bin/npx firebase-tools hosting:channel:deploy staging-v82 --expires 7d
elif [ "$MODE" = "live" ]; then
  echo "🚀 [#0703] Desplegando a Producción Live..."
  /usr/local/bin/npx firebase-tools deploy --only hosting
else
  echo "Uso: $0 [preview|live]"
fi
