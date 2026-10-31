#!/usr/bin/env python3
"""
Gauntlet v30: Continuidad Secuencial Estricta (0% Revoltura), Bóveda de Cuenta (SQLite + LocalStorage)
y Borrado Quirúrgico "Comenzar de nuevo con esta marca" (0% Residuos).
Audita Desktop (1440x900) y Mobile (390x844).
"""
import os
import sys
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d"
BASE_URL = "http://127.0.0.1:8000"


def run_v30_gauntlet():
    os.makedirs(ARTIFACT_DIR, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        console_errors = []
        page_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        page.goto(BASE_URL, wait_until="networkidle")
        page.wait_for_timeout(400)

        # 0. Primero ejecutar un Hard Reset para asegurar inicio limpio
        page.locator("#btnResetBrandStep0").click()
        page.wait_for_timeout(400)

        # 1. Crear / Vincular Cuenta en el Modal de Cuenta
        page.locator("#btnOpenAccountModalStep0").click()
        page.wait_for_timeout(300)
        assert page.locator("#accountVaultModal").is_visible(), "El modal de cuenta debe abrirse"
        page.locator("#accountUserNameInput").fill("Jorge Benítez")
        page.locator("#accountUserEmailInput").fill("jorge.fundador@thebestbrand.studio")
        page.locator("#btnSubmitAccountLogin").click()
        page.wait_for_timeout(500)
        status_txt = page.locator("#accountModalStatusMsg").inner_text()
        assert "Cuenta vinculada" in status_txt, f"Fallo al vincular cuenta: {status_txt}"
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v30_step0_account_vault_modal.png"))
        page.evaluate("closeAccountVaultModal()")
        page.wait_for_timeout(250)

        # 2. Paso 0: Definir negocio de App Móvil de Meditación y Sueño con IA
        biz_text = "Aplicación móvil de meditación guiada y sueño profundo con biofeedback e inteligencia artificial"
        page.locator("#step0CustomBusinessInput").fill(biz_text)
        page.wait_for_timeout(700)
        page.locator("#btnCompleteStep0Start").click()
        page.wait_for_timeout(450)

        # Cerrar cápsula de video Paso 0 -> Paso 1
        page.evaluate("finishTransitionVideoAndEnterNextStep()")
        page.wait_for_timeout(350)

        # 3. Paso 1: Enviar 3 respuestas distintas en secuencia y verificar que NO se revuelven ni se sobrescriben
        ans1 = "Ayudar a profesionales con insomnio a conciliar el sueño en 10 minutos sin fármacos"
        ans2 = "Audio binaural adaptativo en tiempo real conectado al ritmo cardíaco del reloj inteligente"
        ans3 = "Reducir el estrés laboral crónico y mejorar la salud mental de millones de personas"

        for idx, ans in enumerate([ans1, ans2, ans3], start=1):
            page.locator("#chatInput").fill(ans)
            page.evaluate("sendUserMessage()")
            page.wait_for_timeout(1200)

        gc_dom = page.locator("#canvasGoldenCircle").inner_text().strip()
        vo_dom = page.locator("#canvasValueOffer").inner_text().strip()
        sr_dom = page.locator("#canvasSocialRole").inner_text().strip()

        print(f"Pilar 1 (Golden Circle): {gc_dom}")
        print(f"Pilar 2 (Value Offer):   {vo_dom}")
        print(f"Pilar 3 (Social Role):   {sr_dom}")

        assert any(w in gc_dom.lower() for w in ["insomnio", "sueño", "descanso", "fármacos"]), f"Pilar 1 revuelto o perdido: {gc_dom}"
        assert any(w in vo_dom.lower() for w in ["binaural", "cardíaco", "reloj", "tiempo real"]), f"Pilar 2 revuelto o perdido: {vo_dom}"
        assert any(w in sr_dom.lower() for w in ["estrés", "salud", "mental", "higiene", "productividad"]), f"Pilar 3 revuelto o perdido: {sr_dom}"
        assert gc_dom != vo_dom and vo_dom != sr_dom, "Los pilares no deben tener texto repetido ni revuelto"

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v30_step1_unscrambled_manifesto_and_continuity.png"))

        # 4. Paso 2: Verificar que los Touchpoints son 100% de la App Digital y CERO residuos de restaurante ("toalla húmeda", "leña")
        page.evaluate("switchStep(2)")
        page.wait_for_timeout(450)
        step2_text = page.locator("#panel-step-2").inner_text().lower()
        for forbidden in ["toalla húmeda", "leña de encino", "hogaza", "romero", "comensal"]:
            assert forbidden not in step2_text, f"Residuo de restaurante encontrado en Paso 2: {forbidden}"

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v30_step2_digital_touchpoints_zero_restaurant_residue.png"))

        # 5. Paso 3: Bloquear el nombre oficial "SomniaFlow" y verificar propagación
        page.evaluate("switchStep(3)")
        page.wait_for_timeout(400)
        page.evaluate("document.getElementById('step3ManualNameBox').style.display = 'block'")
        page.locator("#customBrandNameInput").fill("SomniaFlow")
        page.locator("#customBrandSloganInput").fill("Sueño profundo guiado por neurociencia")
        page.evaluate("applyUserOwnBrandNameAndSlogan()")
        page.wait_for_timeout(400)

        continuity_text = page.locator("#liveBrandContinuityStrip").inner_text()
        assert "SomniaFlow" in continuity_text, f"El Hilo Conductor debe mostrar SomniaFlow: {continuity_text}"

        # 6. Paso 4 y Paso 5 -> Paso 6: Verificar que el nombre oficial "SomniaFlow" y los pilares de la app llegan intactos
        page.evaluate("switchStep(4)")
        page.wait_for_timeout(350)
        page.evaluate("switchStep(5)")
        page.wait_for_timeout(350)
        page.evaluate("switchStep(6)")
        page.wait_for_timeout(500)

        step6_text = page.locator("#panel-step-6").inner_text()
        assert "SomniaFlow" in step6_text, "El Brandbook en Paso 6 debe usar el nombre oficial SomniaFlow"
        assert "toalla húmeda" not in step6_text.lower(), "El Brandbook en Paso 6 no debe tener residuos de restaurante"
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v30_step6_brandbook_full_continuity.png"))

        # 7. Recargar la página desde cero (sin query params) y verificar que restaura la cuenta y toda la sesión
        page.goto(BASE_URL, wait_until="networkidle")
        page.wait_for_timeout(600)
        restored_state = page.evaluate("({ name: canvasState.brandName, gc: canvasState.golden_circle, vo: canvasState.value_offer, sr: canvasState.social_role, biz: canvasState.custom_business_type })")
        print("Estado restaurado tras reload:", restored_state)
        assert restored_state["name"] == "SomniaFlow", f"Nombre no restaurado tras reload: {restored_state}"
        assert any(w in restored_state["gc"].lower() for w in ["insomnio", "sueño", "descanso", "fármacos"]), f"Propósito no restaurado tras reload: {restored_state}"
        assert any(w in restored_state["vo"].lower() for w in ["binaural", "cardíaco", "reloj"]), f"Oferta de valor no restaurada tras reload: {restored_state}"

        # 8. Probar el botón "🔄 Comenzar de nuevo con esta marca" (Hard Reset 0% residuos)
        page.locator("#btnResetBrandStep0").click()
        page.wait_for_timeout(600)
        after_reset = page.evaluate("({ name: canvasState.brandName, gc: canvasState.golden_circle, vo: canvasState.value_offer, biz: canvasState.custom_business_type, tpBefore: tpExtractedItems.before.length, tpDuring: tpExtractedItems.during.length, ls: localStorage.getItem('tbb_active_brand_session_v24') })")
        print("Estado tras Hard Reset:", after_reset)
        assert after_reset["name"] == "Mi Nueva Marca", f"El nombre no se reinició: {after_reset}"
        assert after_reset["gc"] == "", f"Quedó residuo en golden_circle: {after_reset}"
        assert after_reset["vo"] == "", f"Quedó residuo en value_offer: {after_reset}"
        assert after_reset["biz"] == "", f"Quedó residuo en custom_business_type: {after_reset}"
        assert after_reset["tpBefore"] == 0 and after_reset["tpDuring"] == 0, f"Quedaron touchpoints residuales: {after_reset}"

        # Verificar también en BD SQLite que el endpoint /api/v1/account/load-state devuelve empty tras el reset
        db_after_reset = page.evaluate("fetch('/api/v1/account/load-state?account_id=' + encodeURIComponent(window.tbbUserAccount.account_id) + '&brand_id=active_brand_default').then(r => r.json())")
        print("Estado en BD SQLite tras Hard Reset:", db_after_reset)
        assert db_after_reset["status"] == "empty", f"La base de datos SQLite no se purgó: {db_after_reset}"

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v30_after_hard_reset_zero_residue.png"))

        # Verificar vista móvil (390x844)
        page.set_viewport_size({"width": 390, "height": 844})
        page.wait_for_timeout(300)
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v30_mobile_clean_reset_step0.png"))

        assert len(page_errors) == 0, f"Errores JS detectados: {page_errors}"
        browser.close()
        print("✅ GAUNTLET V30 COMPLETADO CON ÉXITO (0 ERRORES, 100% CONTINUIDAD, CUENTA SQLITE Y HARD RESET CERO RESIDUOS).")


if __name__ == "__main__":
    run_v30_gauntlet()
