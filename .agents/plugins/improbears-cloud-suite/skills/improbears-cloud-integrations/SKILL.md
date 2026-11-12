---
name: improbears-cloud-integrations
description: Runbook y configuración oficial para usar Google Flow (Veo 3.1 / Kie / Fal), HeyGen API, Stripe API, Zoho One API, Railway y Neon PostgreSQL 18 tanto en ☁️ Remote Conversations como en SSD local.
---

# Integraciones Cloud de ImproBears (Google Flow, HeyGen, Stripe, Zoho, Railway, Neon)

## 1. Dónde viven las credenciales y cómo consumirlas
- **En Producción Cloud (Railway):** Las variables `GEMINI_API_KEY`, `HEYGEN_API_KEY`, `KIE_API_KEY`, `FAL_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` y `DATABASE_URL` están inyectadas directamente en los servicios de Railway (`thebestbrand-api-studio`, `improbears-cloud-studio`, `improbears-guardian-24x7-cron`).
- **En SSD Local (`/Users/oso/Proyectos_ImproBears_SSD`):** Están sincronizadas en los archivos `.env` y `.env.video` de cada proyecto.

## 2. Servidores MCP Incluidos en el Repositorio (`.agents/plugins/improbears-cloud-suite`)
- `google-stitch`: Generación y edición quirúrgica de interfaces (`stitch_generate_ui_spec`, `stitch_surgical_edit_node`).
- `notebooklm-studio`: Gestión de cuadernos de investigación (`notebook_list`, `notebook_create`, `quiz_create`).
- `improbears-bridge`: Bandeja operativa compartida entre Antigravity (`Max`) y `Claude Code` (`bridge_post_task`, `bridge_claim_task`, `bridge_complete_task`, `bridge_record_decision`).
- `Neon`: Conexión directa a PostgreSQL 18 (`https://mcp.neon.tech/mcp`).

## 3. Protocolo Zero-Touch (Cero Copiar y Pegar en Terminal para Jorge)
- **Política Obligatoria (`C-00`):** Jamás pedirle a Jorge Benítez ("El Oso") que copie y pegue comandos en la terminal cuando esté fuera de su computadora o en sesiones remotas (`☁️ Remote Conversations`, iPhone o Apple CarPlay).
- **Flujo en Nube (`Git Push -> Auto-Deploy`):**
  1. Max y Claude ejecutan las ediciones, pruebas (`node server/verify.mjs`, `node --check`) y hacen `git commit` + `git push origin main` directamente desde la máquina virtual remota.
  2. El workflow `.github/workflows/zero-touch-deploy.yml` valida el código en GitHub Actions y despliega en Firebase Hosting (`improbears-com`, `thebestbrand-studio`) y Cloudflare Workers (`acquaixtapa`), mientras Railway actualiza los backends automáticamente.
- **Sincronización Silenciosa 24/7 en la Mac (`improbears_zero_touch_guardian.sh`):**
  - El demonio `.agents/plugins/improbears-cloud-suite/scripts/improbears_zero_touch_guardian.sh` (`com.improbears.zerotouch.guardian`) corre cada 60 segundos en la Mac, hace `git fetch` + `git merge --ff-only` protegiendo cualquier cambio local con `autostash`, y ejecuta los despliegues locales autenticados (Firebase / Wrangler / Xcode CarPlay) sin intervención humana.

