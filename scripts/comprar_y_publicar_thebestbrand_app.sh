#!/usr/bin/env bash
# ==============================================================================
# THE BEST BRAND — COMPRA DE DOMINIO (thebestbrand.app) Y LANZAMIENTO EN VIVO
# Proyecto Firebase: crm-improbears | Sitio Hosting: thebestbrand-studio
# Dominio Oficial:   https://thebestbrand.app  y  https://thebestbrand.app/studio
# ==============================================================================
set -euo pipefail

BOLD="\033[1m"
BLUE="\033[38;2;66;110;174m"
ORANGE="\033[38;2;255;122;0m"
GREEN="\033[38;2;40;167;69m"
RESET="\033[0m"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}"

echo -e "${BOLD}${BLUE}======================================================================${RESET}"
echo -e "${BOLD}  THE BEST BRAND — COMPRA DE 'thebestbrand.app' Y PUBLICACIÓN LIVE${RESET}"
echo -e "${BOLD}${BLUE}======================================================================${RESET}\n"

# 1. Sincronizar últimos cambios del repositorio
echo -e "${BOLD}[1/4] Sincronizando últimos cambios desde origin/main...${RESET}"
git pull --rebase origin main

# 2. Verificar sintaxis de todos los motores JS de TheBestBrand
echo -e "\n${BOLD}[2/4] Verificando motores de TheBestBrand (Web Comercial + Studio)...${RESET}"
node --check apps/web/tbb-generative-brandbook-engine.js
node --check apps/web/tbb-executive-deliverables-suite.js
node --check apps/web/tbb-commercial-experience-and-payments.js
echo -e "${GREEN}✔ Motores verificados al 100%.${RESET}"

# 3. Publicar la última versión de la Web (/) y la App (/studio) en Firebase Hosting
echo -e "\n${BOLD}[3/4] Publicando Web Comercial y App (/studio) en Firebase Hosting (thebestbrand-studio)...${RESET}"
npx --yes firebase-tools deploy --only hosting:thebestbrand-studio --project crm-improbears

# 4. Abrir el registrador para comprar thebestbrand.app y la consola de dominios de Firebase
echo -e "\n${BOLD}[4/4] Abriendo Cloudflare Registrar y Firebase Custom Domains en tu navegador...${RESET}"
echo -e "${ORANGE}${BOLD}PASO 1 — COMPRAR 'thebestbrand.app' (Al costo mayorista ~$8.20 USD, privacidad WHOIS gratis):${RESET}"
echo -e "  • En la pestaña de Cloudflare Dashboard -> Domain Registration -> Register Domains:"
echo -e "    Busca ${BOLD}thebestbrand.app${RESET} y completa el pago con Apple Pay / Tarjeta."
echo -e "    (También te abrimos Porkbun por si prefieres compra rápida en 1 clic sin entrar al panel de Cloudflare).\n"

echo -e "${ORANGE}${BOLD}PASO 2 — CONECTAR 'thebestbrand.app' EN FIREBASE HOSTING:${RESET}"
echo -e "  • En la pestaña de Firebase Console (sitio ${BOLD}thebestbrand-studio${RESET}):"
echo -e "    1. Haz clic en ${BOLD}'Agregar dominio personalizado' (Add custom domain)${RESET}."
echo -e "    2. Escribe: ${BOLD}thebestbrand.app${RESET} (y marca redirigir ${BOLD}www.thebestbrand.app${RESET})."
echo -e "    3. En el DNS de Cloudflare para ${BOLD}thebestbrand.app${RESET} (con el switch de Proxy en 'DNS Only / Nube Gris' para que Firebase emita el SSL de .app):"
echo -e "       - Tipo ${BOLD}A${RESET}     | Nombre: ${BOLD}@${RESET}   | Valor: ${BOLD}199.36.158.100${RESET}"
echo -e "       - Tipo ${BOLD}TXT${RESET}   | Nombre: ${BOLD}@${RESET}   | Valor: ${BOLD}hosting-site=thebestbrand-studio${RESET} (o el código TXT que muestre Firebase)"
echo -e "       - Tipo ${BOLD}CNAME${RESET} | Nombre: ${BOLD}www${RESET} | Valor: ${BOLD}thebestbrand-studio.web.app${RESET}\n"

if command -v open >/dev/null 2>&1; then
  open "https://dash.cloudflare.com/?to=/:account/domains/register"
  open "https://porkbun.com/checkout/search?q=thebestbrand.app"
  open "https://console.firebase.google.com/project/crm-improbears/hosting/sites/thebestbrand-studio/domains"
  open "https://thebestbrand-studio.web.app/studio"
fi

echo -e "${BOLD}${GREEN}======================================================================${RESET}"
echo -e "${BOLD}  ✔ Web Comercial en vivo: https://thebestbrand-studio.web.app/${RESET}"
echo -e "${BOLD}  ✔ App Studio en vivo:    https://thebestbrand-studio.web.app/studio${RESET}"
echo -e "${BOLD}  ✔ Dominio por conectar:  https://thebestbrand.app${RESET}"
echo -e "${BOLD}${GREEN}======================================================================${RESET}"
