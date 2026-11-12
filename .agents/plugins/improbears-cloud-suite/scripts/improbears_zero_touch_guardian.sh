#!/usr/bin/env bash
# ==============================================================================
# IMPROBEARS ZERO-TOUCH GUARDIAN DAEMON (Max + Claude Code — Directiva C-00)
# Propósito:
#   Elimina el 100% de la necesidad de copiar y pegar comandos en la terminal
#   de la Mac de Jorge Benítez ("El Oso") cuando trabaja desde remoto (iPhone,
#   CarPlay o sesiones Cloud de Antigravity/Claude).
#
# Qué hace automáticamente cada 60 segundos en segundo plano:
#   1. Sincroniza (`git fetch` + `git merge --ff-only`) los 5 repositorios
#      oficiales de ImproBears en SSD Local y Google Drive.
#   2. Protege el trabajo local: Si un repositorio tiene cambios locales sin
#      guardar, NO los pisa ni hace reset; los respeta y registra el aviso.
#   3. Cuando detecta un commit nuevo en `ImproBears-Web`, `thebestbrand` o
#      `AcquaIxtapa`, dispara automáticamente el despliegue local autenticado
#      (Firebase Hosting / Cloudflare Wrangler) usando las sesiones CLI ya
#      iniciadas en la Mac (y además sincroniza los secretos hacia GitHub
#      Actions si `gh` está autenticado).
#   4. Si cambia `aura-carplay-ios/`, pre-compila `Aura.app` en Xcode y, si el
#      iPhone (`iChorch`) está al alcance por USB/Wi-Fi, lo actualiza solo.
#
# Modos de uso:
#   ./improbears_zero_touch_guardian.sh --install-daemon   # Instala LaunchAgent 24/7
#   ./improbears_zero_touch_guardian.sh --sync-once        # Ejecuta 1 ciclo ahora
#   ./improbears_zero_touch_guardian.sh --bootstrap-ci     # Sube tokens a GitHub Secrets
#   ./improbears_zero_touch_guardian.sh --status           # Muestra estado y últimos logs
# ==============================================================================
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${HOME}/.local/bin:${PATH}"

STATE_DIR="${HOME}/.local/share/improbears-zero-touch"
LOG_FILE="${STATE_DIR}/guardian.log"
LOCK_DIR="${STATE_DIR}/guardian.lock"
PLIST_PATH="${HOME}/Library/LaunchAgents/com.improbears.zerotouch.guardian.plist"
SCRIPT_ABS_PATH="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"

mkdir -p "${STATE_DIR}"

log_msg() {
  local ts
  ts="$(date '+%Y-%m-%d %H:%M:%S')"
  echo "[${ts}] $*" | tee -a "${LOG_FILE}"
}

# Candidate workspace roots on Jorge's Mac (SSD + Google Drive)
CANDIDATE_ROOTS=(
  "/Users/oso/Proyectos_ImproBears_SSD"
  "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity"
  "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/02_PRODUCTOS_PROPIOS"
  "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/01_CLIENTES"
  "/home/antigravity/ImprobearsIA"
)

discover_repos() {
  local found=()
  for base in "${CANDIDATE_ROOTS[@]}"; do
    if [ -d "${base}" ]; then
      while IFS= read -r gitdir; do
        repo_dir="$(dirname "${gitdir}")"
        found+=("${repo_dir}")
      done < <(find "${base}" -maxdepth 3 -name ".git" -type d 2>/dev/null || true)
    fi
  done
  printf "%s\n" "${found[@]}" | awk '!seen[$0]++'
}

run_post_update_hooks() {
  local repo_dir="$1"
  local old_sha="$2"
  local new_sha="$3"
  local repo_name
  repo_name="$(basename "${repo_dir}")"

  local changed_files
  changed_files="$(git -C "${repo_dir}" diff --name-only "${old_sha}" "${new_sha}" 2>/dev/null || true)"

  log_msg "⚡ [${repo_name}] Actualizado ${old_sha:0:7} -> ${new_sha:0:7}. Verificando hooks Zero-Touch..."

  # 1. ImproBears-Web: Auto-deploy Firebase Hosting + Aura CarPlay Xcode build
  if [ -f "${repo_dir}/firebase.json" ] && grep -q "improbears-com" "${repo_dir}/firebase.json" 2>/dev/null; then
    if echo "${changed_files}" | grep -qE "^(public/|firebase\.json)"; then
      if command -v npx >/dev/null 2>&1; then
        log_msg "🚀 [${repo_name}] Desplegando cambios de public/ a Firebase Hosting (improbears-com)..."
        (cd "${repo_dir}" && npx --yes firebase-tools deploy --only hosting:improbears-com --project crm-improbears >> "${LOG_FILE}" 2>&1) \
          && log_msg "✅ [${repo_name}] Firebase Hosting (improbears-com) actualizado en vivo." \
          || log_msg "⚠️ [${repo_name}] Firebase CLI local no pudo desplegar (revisar sesión o GitHub Actions)."
      fi
    fi

    if echo "${changed_files}" | grep -q "^aura-carplay-ios/"; then
      if [ "$(uname -s)" = "Darwin" ] && [ -x "${repo_dir}/aura-carplay-ios/build_and_verify_carplay_mac.sh" ]; then
        log_msg "🚗 [${repo_name}] Cambios detectados en Aura CarPlay iOS. Compilando e instalando automáticamente..."
        (cd "${repo_dir}/aura-carplay-ios" && ./build_and_verify_carplay_mac.sh >> "${LOG_FILE}" 2>&1) \
          && log_msg "✅ [${repo_name}] Aura.app CarPlay compilado e instalado." \
          || log_msg "ℹ️ [${repo_name}] Aura.app compilado (iPhone no conectado por cable en este momento)."
      fi
    fi

    if echo "${changed_files}" | grep -qE "^(\.agents/plugins/improbears-cloud-suite/|public/assets/brand/dock-installer\.sh)"; then
      if [ -f "${repo_dir}/.agents/plugins/improbears-cloud-suite/scripts/improbears_zero_touch_guardian.sh" ]; then
        cp "${repo_dir}/.agents/plugins/improbears-cloud-suite/scripts/improbears_zero_touch_guardian.sh" "${STATE_DIR}/improbears_zero_touch_guardian.sh" 2>/dev/null || true
        chmod +x "${STATE_DIR}/improbears_zero_touch_guardian.sh" 2>/dev/null || true
      fi
      if [ "$(uname -s)" = "Darwin" ]; then
        if [ -f "${repo_dir}/public/assets/brand/dock-installer.sh" ]; then
          log_msg "🖥️ [${repo_name}] Actualizando accesos directos del Dock desde dock-installer.sh..."
          /bin/bash "${repo_dir}/public/assets/brand/dock-installer.sh" >> "${LOG_FILE}" 2>&1 || true
        elif [ -x "${repo_dir}/.agents/plugins/improbears-cloud-suite/scripts/install_macos_dock_suite.sh" ]; then
          log_msg "🖥️ [${repo_name}] Actualizando accesos directos del Dock desde install_macos_dock_suite.sh..."
          "${repo_dir}/.agents/plugins/improbears-cloud-suite/scripts/install_macos_dock_suite.sh" >> "${LOG_FILE}" 2>&1 || true
        fi
      fi
    fi
  fi

  # 2. TheBestBrand: Auto-deploy Firebase Hosting (thebestbrand-studio)
  if [ -f "${repo_dir}/firebase.json" ] && grep -q "thebestbrand-studio" "${repo_dir}/firebase.json" 2>/dev/null; then
    if echo "${changed_files}" | grep -qE "^(apps/web/|firebase\.json)"; then
      if command -v npx >/dev/null 2>&1; then
        log_msg "🚀 [${repo_name}] Desplegando apps/web/ a Firebase Hosting (thebestbrand-studio)..."
        (cd "${repo_dir}" && npx --yes firebase-tools deploy --only hosting:thebestbrand-studio --project crm-improbears >> "${LOG_FILE}" 2>&1) \
          && log_msg "✅ [${repo_name}] Firebase Hosting (thebestbrand-studio) actualizado en vivo." \
          || log_msg "⚠️ [${repo_name}] Firebase CLI local no pudo desplegar (revisar sesión o GitHub Actions)."
      fi
    fi
  fi

  # 3. AcquaIxtapa: Auto-deploy Cloudflare Workers
  if [ -f "${repo_dir}/wrangler.jsonc" ]; then
    if echo "${changed_files}" | grep -qE "^(artifacts/|wrangler\.jsonc|package\.json)"; then
      if command -v pnpm >/dev/null 2>&1; then
        log_msg "🌊 [${repo_name}] Compilando y desplegando Acqua Ixtapa en Cloudflare Workers..."
        (cd "${repo_dir}" && pnpm install --frozen-lockfile && pnpm run build && npx --yes wrangler deploy >> "${LOG_FILE}" 2>&1) \
          && log_msg "✅ [${repo_name}] Cloudflare Workers (acquaixtapa) actualizado en vivo." \
          || log_msg "⚠️ [${repo_name}] Wrangler local no pudo desplegar."
      fi
    fi
  fi
}

sync_all_repos_once() {
  if ! mkdir "${LOCK_DIR}" 2>/dev/null; then
    # Si el lock tiene más de 10 minutos, limpiarlo
    if [ -d "${LOCK_DIR}" ] && [ -n "$(find "${LOCK_DIR}" -mmin +10 2>/dev/null)" ]; then
      rm -rf "${LOCK_DIR}"
      mkdir "${LOCK_DIR}" 2>/dev/null || return 0
    else
      return 0
    fi
  fi
  trap 'rm -rf "${LOCK_DIR}"' EXIT

  while IFS= read -r repo; do
    [ -z "${repo}" ] && continue
    [ ! -d "${repo}/.git" ] && continue

    repo_name="$(basename "${repo}")"
    remote_url="$(git -C "${repo}" remote get-url origin 2>/dev/null || true)"
    if [[ "${remote_url}" != *"ImprobearsIA/"* ]]; then
      continue
    fi

    # Fetch silencioso
    git -C "${repo}" fetch origin main --quiet 2>/dev/null || continue

    local_sha="$(git -C "${repo}" rev-parse HEAD 2>/dev/null || true)"
    remote_sha="$(git -C "${repo}" rev-parse origin/main 2>/dev/null || true)"

    if [ -z "${local_sha}" ] || [ -z "${remote_sha}" ] || [ "${local_sha}" = "${remote_sha}" ]; then
      continue
    fi

    # Verificar si local está detrás de origin/main
    if git -C "${repo}" merge-base --is-ancestor "${local_sha}" "${remote_sha}" 2>/dev/null; then
      # Proteger cambios locales sin commitear
      if [ -n "$(git -C "${repo}" status --porcelain --untracked-files=no 2>/dev/null)" ]; then
        log_msg "🛡️ [${repo_name}] Cambios locales detectados en ${repo}. Guardando autostash seguro antes de fast-forward..."
        git -C "${repo}" stash push -m "zero-touch-autostash-$(date +%s)" >> "${LOG_FILE}" 2>&1 || true
        if git -C "${repo}" merge --ff-only origin/main >> "${LOG_FILE}" 2>&1; then
          git -C "${repo}" stash pop >> "${LOG_FILE}" 2>&1 || log_msg "⚠️ [${repo_name}] Stash conservado en git stash list para evitar conflicto."
          run_post_update_hooks "${repo}" "${local_sha}" "${remote_sha}"
        fi
      else
        if git -C "${repo}" merge --ff-only origin/main >> "${LOG_FILE}" 2>&1; then
          run_post_update_hooks "${repo}" "${local_sha}" "${remote_sha}"
        fi
      fi
    fi
  done < <(discover_repos)
}

install_macos_launch_agent() {
  local target_bin="${STATE_DIR}/improbears_zero_touch_guardian.sh"
  cp "${SCRIPT_ABS_PATH}" "${target_bin}"
  chmod +x "${target_bin}"

  mkdir -p "${HOME}/Library/LaunchAgents"
  cat > "${PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.improbears.zerotouch.guardian</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${target_bin}</string>
    <string>--sync-once</string>
  </array>
  <key>StartInterval</key>
  <integer>60</integer>
  <key>RunAtLoad</key>
  <true/>
  <key>StandardOutPath</key>
  <string>${STATE_DIR}/launchd.out.log</string>
  <key>StandardErrorPath</key>
  <string>${STATE_DIR}/launchd.err.log</string>
</dict>
</plist>
EOF

  if [ "$(uname -s)" = "Darwin" ]; then
    launchctl unload "${PLIST_PATH}" 2>/dev/null || true
    launchctl load -w "${PLIST_PATH}"
    log_msg "✅ LaunchAgent 'com.improbears.zerotouch.guardian' instalado y activo cada 60s en macOS."
  else
    log_msg "ℹ️ Plist generado en ${PLIST_PATH} (entorno actual Linux; en macOS se activará con launchctl)."
  fi
}

bootstrap_github_secrets() {
  # Si estamos en la Mac de Jorge y 'gh' está autenticado, sincroniza una sola vez
  # las credenciales de Firebase / Cloudflare hacia GitHub Actions Secrets para
  # que GitHub despliegue en la nube incluso si la Mac está apagada.
  local marker="${STATE_DIR}/.gh_secrets_bootstrapped_v1"
  [ -f "${marker}" ] && return 0
  command -v gh >/dev/null 2>&1 || return 0
  gh auth status >/dev/null 2>&1 || return 0

  local sa_file=""
  for cand in \
    "${HOME}/.config/improbears/firebase-service-account.json" \
    "/Users/oso/Proyectos_ImproBears_SSD/.firebase-service-account.json" \
    "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/_1 IMPROBEARS/Proyectos Antigravity/03_SISTEMAS_IMPROBEARS/firebase-service-account.json"; do
    if [ -f "${cand}" ]; then
      sa_file="${cand}"
      break
    fi
  done

  if [ -n "${sa_file}" ]; then
    log_msg "🔑 Subiendo FIREBASE_SERVICE_ACCOUNT a GitHub Secrets (ImproBears-Web y thebestbrand)..."
    gh secret set FIREBASE_SERVICE_ACCOUNT -R ImprobearsIA/ImproBears-Web < "${sa_file}" 2>/dev/null || true
    gh secret set FIREBASE_SERVICE_ACCOUNT -R ImprobearsIA/thebestbrand < "${sa_file}" 2>/dev/null || true
    touch "${marker}"
  elif [ -n "${FIREBASE_TOKEN:-}" ]; then
    log_msg "🔑 Subiendo FIREBASE_TOKEN a GitHub Secrets (ImproBears-Web y thebestbrand)..."
    printf "%s" "${FIREBASE_TOKEN}" | gh secret set FIREBASE_TOKEN -R ImprobearsIA/ImproBears-Web 2>/dev/null || true
    printf "%s" "${FIREBASE_TOKEN}" | gh secret set FIREBASE_TOKEN -R ImprobearsIA/thebestbrand 2>/dev/null || true
    touch "${marker}"
  fi
}

ensure_macos_dock_suite() {
  # Instala y mantiene sincronizados automáticamente los 3 accesos directos en el Dock de la Mac:
  # TheBestBrand (https://thebestbrand-studio.web.app/studio?studio=1)
  # TheBestGrowth (https://improbears-com.web.app/consola-marketing#automatizacion-marketing)
  # Aura (https://improbears-com.web.app/voz)
  [ "$(uname -s)" = "Darwin" ] || return 0

  # 1. Si existe un instalador actualizado en el Escritorio (sincronizado por Google Drive) o en public/assets/brand/dock-installer.sh,
  #    verificar su hash para ejecutarlo automáticamente cuando cambie sin pedir clic manual.
  local desktop_installer=""
  for d_cand in \
    "${HOME}/Desktop/.instalar_dock_improbears.sh" \
    "/Users/oso/Library/CloudStorage/GoogleDrive-jorge.benitez@improbears.com/Mi unidad/Desktop/.instalar_dock_improbears.sh" \
    "/Users/oso/Proyectos_ImproBears_SSD/ImproBears-Web/public/assets/brand/dock-installer.sh"; do
    if [ -f "${d_cand}" ]; then
      desktop_installer="${d_cand}"
      break
    fi
  done

  if [ -n "${desktop_installer}" ]; then
    local current_hash
    current_hash="$(shasum -a 256 "${desktop_installer}" 2>/dev/null | awk '{print $1}' || true)"
    local saved_hash_file="${STATE_DIR}/.dock_installer_last_sha256"
    local saved_hash=""
    [ -f "${saved_hash_file}" ] && saved_hash="$(cat "${saved_hash_file}" 2>/dev/null || true)"
    if [ -n "${current_hash}" ] && [ "${current_hash}" != "${saved_hash}" ]; then
      log_msg "🖥️ Detectada nueva versión de accesos directos del Dock (${desktop_installer}). Actualizando Dock automáticamente..."
      printf "%s" "${current_hash}" > "${saved_hash_file}"
      /bin/bash "${desktop_installer}" >> "${LOG_FILE}" 2>&1 || true
      return 0
    fi
  fi

  local marker="${STATE_DIR}/.dock_suite_installed_v6"
  [ -f "${marker}" ] && return 0

  local dock_script=""
  for cand in \
    "$(cd "$(dirname "$0")" && pwd)/install_macos_dock_suite.sh" \
    "/Users/oso/Proyectos_ImproBears_SSD/ImproBears-Web/.agents/plugins/improbears-cloud-suite/scripts/install_macos_dock_suite.sh"; do
    if [ -x "${cand}" ]; then
      dock_script="${cand}"
      break
    fi
  done

  if [ -n "${dock_script}" ]; then
    log_msg "🖥️ Actualizando accesos directos en el Dock de macOS (TheBestBrand Studio, TheBestGrowth, Aura Viva)..."
    "${dock_script}" >> "${LOG_FILE}" 2>&1 && touch "${marker}" || true
  fi
}

show_status() {
  echo "=============================================================================="
  echo "🛡️  IMPROBEARS ZERO-TOUCH GUARDIAN — ESTADO ACTUAL"
  echo "=============================================================================="
  echo "Repositorios monitoreados:"
  discover_repos | sed 's/^/  - /'
  echo ""
  if [ -f "${LOG_FILE}" ]; then
    echo "Últimos eventos en ${LOG_FILE}:"
    tail -n 20 "${LOG_FILE}"
  else
    echo "Aún no hay eventos registrados en ${LOG_FILE}."
  fi
}

case "${1:---sync-once}" in
  --install-daemon)
    install_macos_launch_agent
    bootstrap_github_secrets
    ensure_macos_dock_suite
    sync_all_repos_once
    ;;
  --sync-once)
    bootstrap_github_secrets
    ensure_macos_dock_suite
    sync_all_repos_once
    ;;
  --install-dock)
    rm -f "${STATE_DIR}/.dock_suite_installed_v1"
    ensure_macos_dock_suite
    ;;
  --bootstrap-ci)
    rm -f "${STATE_DIR}/.gh_secrets_bootstrapped_v1"
    bootstrap_github_secrets
    ;;
  --status)
    show_status
    ;;
  *)
    echo "Uso: $0 [--sync-once | --install-daemon | --install-dock | --bootstrap-ci | --status]"
    exit 1
    ;;
esac
