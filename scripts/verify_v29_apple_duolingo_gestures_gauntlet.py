#!/usr/bin/env python3
"""
Gauntlet v29: Auditoría Integral UX Apple/Duolingo + Gestos Swipe-Outward en Pares Binarios (Paso 5)
Verifica Desktop (1440x900) y Mobile (390x844), cero redundancias, cero modales apilados y gestos reales.
"""
import os
import sys
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d"
BASE_URL = "http://127.0.0.1:8000"


def run_gauntlet():
    os.makedirs(ARTIFACT_DIR, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # =====================================================================
        # 1. DESKTOP GAUNTLET (1440 x 900)
        # =====================================================================
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        console_errors = []
        page_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        page.goto(BASE_URL, wait_until="networkidle")
        page.wait_for_timeout(500)

        # Paso 0: escribir giro digital y verificar que solo queda 1 CTA primario visible
        inp0 = page.locator("#step0CustomBusinessInput")
        inp0.fill("Aplicación móvil con inteligencia artificial para finanzas personales y ahorro automatizado")
        page.wait_for_timeout(600)

        interp_card_visible = page.locator("#step0BusinessInterpretationCard").is_visible()
        redundant_btn_visible = page.locator("#btnStep0InterpretBusiness").is_visible()
        assert interp_card_visible, "La tarjeta de interpretación en vivo debe mostrarse en Paso 0"
        assert not redundant_btn_visible, "El botón intermedio redundante debe ocultarse cuando ya está la tarjeta lista"

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step0_single_cta_apple_clean.png"))

        # Avanzar de Paso 0 a Paso 1 -> Cápsula de Video -> Cero modal apilado de guía
        page.locator("#btnCompleteStep0Start").click()
        page.wait_for_timeout(450)
        assert page.locator("#phaseTransitionVideoModal").evaluate("el => el.classList.contains('open')"), "Debe abrirse cápsula de video 0->1"

        page.locator("#btnFinishTransitionVideo").click()
        page.wait_for_timeout(400)

        guide_modal_open = page.locator("#auraInteractionGuideModal").evaluate("el => el.classList.contains('open')")
        assert not guide_modal_open, "No debe apilarse un segundo modal de guía después de la cápsula de video"

        # Verificar que en Paso 2 no hay texto de pregunta duplicado
        page.evaluate("switchStep(2)")
        page.wait_for_timeout(350)
        dup_tp_question_visible = page.locator("#tpAuraLiveQuestionText").is_visible()
        assert not dup_tp_question_visible, "El recuadro duplicado #tpAuraLiveQuestionText debe estar oculto en Paso 2"
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step2_streamlined_touchpoints.png"))

        # Verificar Paso 3 limpio con barra estilo Duolingo y tarjetas con soporte swipe
        page.evaluate("switchStep(3)")
        page.wait_for_timeout(400)
        step3_html = page.locator("#panel-step-3").inner_text()
        assert "¿CÓMO FUNCIONA ESTE PASO? (ORDEN 3A" not in step3_html, "No debe existir el bloque redundante de instrucciones en Paso 3"
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step3_streamlined_naming.png"))

        # Verificar Paso 4 limpio directo a los 7 sliders
        page.evaluate("switchStep(4)")
        page.wait_for_timeout(350)
        step4_html = page.locator("#panel-step-4").inner_text()
        assert "ORDEN CLARO DE ESTE PASO (PASO 4A" not in step4_html, "No debe existir el bloque redundante en Paso 4"
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step4_streamlined_sliders.png"))

        # Verificar Paso 5: Gestos de deslizar hacia afuera (Swipe-Outward Dismissal)
        page.evaluate("switchStep(5)")
        page.wait_for_timeout(400)
        step5_text = page.locator("#panel-step-5").inner_text()
        assert "Atajo Rápido: [ ← / A ]" not in step5_text, "Debe haberse eliminado la leyenda inútil de atajo de teclado"
        assert "¿QUÉ HACER EN ESTE PASO? (ORDEN 5A" not in step5_text, "Debe haberse eliminado el bloque redundante 5A->5B->5C"

        # Captura del par inicial limpio estilo Apple/Duolingo
        page.locator("#pairArenaContainer").scroll_into_view_if_needed()
        page.wait_for_timeout(200)
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step5_gesture_arena_desktop.png"))

        # Simular gesto de arrastrar Tarjeta A hacia afuera a la izquierda para descartarla y conservar B
        card_a = page.locator("#duelCardA")
        box_a = card_a.bounding_box()
        assert box_a is not None, "Debe existir #duelCardA en la arena"
        start_x = box_a["x"] + box_a["width"] * 0.5
        start_y = box_a["y"] + box_a["height"] * 0.5

        page.mouse.move(start_x, start_y)
        page.mouse.down()
        page.mouse.move(start_x - 85, start_y + 6, steps=6)
        # Capturar estado en pleno arrastre con badge "Soltar para descartar"
        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step5_dragging_discard_preview.png"))
        page.mouse.up()

        # Esperar a que termine la transición spring (260ms) y aparezca el Par 2
        page.wait_for_timeout(420)
        pair_idx_after_swipe1 = page.evaluate("currentPairIdx")
        pair1_choice = page.evaluate("userPairSelections[1]")
        assert pair_idx_after_swipe1 == 1, f"Tras deslizar A hacia afuera, currentPairIdx debe ser 1 (Par 2/24), obtenido: {pair_idx_after_swipe1}"
        assert pair1_choice == "B", f"Al descartar A deslizando hacia afuera, la opción conservada debe ser 'B', obtenido: {pair1_choice}"

        # Ahora en el Par 2, simular gesto de arrastrar Tarjeta B hacia afuera a la derecha para descartarla y conservar A
        card_b = page.locator("#duelCardB")
        box_b = card_b.bounding_box()
        bx = box_b["x"] + box_b["width"] * 0.5
        by = box_b["y"] + box_b["height"] * 0.5

        page.mouse.move(bx, by)
        page.mouse.down()
        page.mouse.move(bx + 90, by + 4, steps=6)
        page.mouse.up()
        page.wait_for_timeout(420)

        pair_idx_after_swipe2 = page.evaluate("currentPairIdx")
        pair2_choice = page.evaluate("userPairSelections[2]")
        assert pair_idx_after_swipe2 == 2, f"Tras deslizar B hacia afuera en Par 2, currentPairIdx debe ser 2 (Par 3/24), obtenido: {pair_idx_after_swipe2}"
        assert pair2_choice == "A", f"Al descartar B deslizando hacia afuera, la opción conservada debe ser 'A', obtenido: {pair2_choice}"

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step5_after_swipe_pair3_desktop.png"))

        # Verificar cero desbordamiento horizontal en Desktop
        overflow_desktop = page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert not overflow_desktop, "Cero desbordamiento horizontal permitido en Desktop"

        context.close()

        # =====================================================================
        # 2. MOBILE GAUNTLET (390 x 844 - iPhone 14 Pro)
        # =====================================================================
        m_context = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        m_page = m_context.new_page()
        m_page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        m_page.on("pageerror", lambda err: page_errors.append(str(err)))

        m_page.goto(BASE_URL, wait_until="networkidle")
        m_page.wait_for_timeout(400)
        m_page.evaluate("switchStep(5)")
        m_page.wait_for_timeout(400)

        overflow_mobile = m_page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert not overflow_mobile, "Cero desbordamiento horizontal permitido en Mobile (390x844)"

        m_page.screenshot(path=os.path.join(ARTIFACT_DIR, "v29_step5_gesture_arena_mobile.png"))
        m_context.close()
        browser.close()

        assert len(page_errors) == 0, f"Errores JS detectados: {page_errors}"
        print("GAUNTLET v29 PASS: Desktop + Mobile + Swipe-Outward Gestures + Zero Redundancies OK")


if __name__ == "__main__":
    run_gauntlet()
