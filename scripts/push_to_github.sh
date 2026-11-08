#!/bin/bash
# ==============================================================================
# TheBestBrand Studio — Script de Publicación Automatizada a GitHub
# ==============================================================================

PROJECT_DIR="/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/TheBestBrand"

cd "$PROJECT_DIR" || {
    echo "❌ Error: No se pudo acceder a $PROJECT_DIR"
    exit 1
}

echo "======================================================================"
echo "🚀 THEBESTBRAND: SUBIENDO A GITHUB (ImprobearsIA/thebestbrand)"
echo "======================================================================"
echo "📁 Directorio local: $(pwd)"
echo "📦 Tamaño ultra-ligero del repositorio: $(du -sh .git | cut -f1)"
echo "🛡️  Almacenamiento protegido: PDFs pesados y ZIPs quedan en Google Drive."
echo ""

# Verificar si el remoto está configurado
if ! git remote | grep -q "origin"; then
    git remote add origin https://github.com/ImprobearsIA/thebestbrand.git
fi

echo "Intentando subir rama 'main' a GitHub..."
echo "Si es la primera vez, el sistema te pedirá autorización para ImprobearsIA."
echo ""

git push -u origin main

echo ""
echo "======================================================================"
echo "✅ ¡PROCESO TERMINADO!"
echo "Verifica tu repositorio en: https://github.com/ImprobearsIA/thebestbrand"
echo "======================================================================"
read -p "Presiona [Enter] para cerrar esta ventana..."
