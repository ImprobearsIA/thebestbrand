import asyncio
from playwright.async_api import async_playwright

ARTIFACT_DIR = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d"

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 1050})
        page = await context.new_page()

        await page.goto("http://127.0.0.1:8000", wait_until="networkidle")

        # 1. Simular el estado exacto del usuario (incluyendo un prompt viejo contaminado con "Mi Nueva Marca" / "MNM" para probar que se purga solo)
        await page.evaluate("""() => {
            const stalePrompt = '1. IDENTIDAD VERBAL:\\n• Nombre Oficial de la Marca: "Mi Nueva Marca"\\n• Monograma / Iniciales Constructivas: "MNM"';
            const ta = document.getElementById('step5MasterPromptTextarea');
            if (ta) {
                ta.value = stalePrompt;
                ta.dataset.userEdited = "1";
            }

            lockOfficialBrandNameAcrossApp("TheBestBrand", "Propósito y experiencia diseñados con Aura");
            canvasState.custom_business_type = "es una app que ayuda a startups y empresarios a generar o modificar su marca e imagen corporativa de manera profesional y practica";
            canvasState.step0_short_essence = "aplicación digital intuitiva y ágil";
            canvasState.step0_paraphrased_essence = "una aplicación y plataforma digital (es una app que ayuda a startups y empresarios a generar o modificar su marca e imagen corporativa de manera profesional y practica) potenciada por una experiencia digital intuitiva, rápida y libre de fricciones técnicas";
            canvasState.golden_circle = "El propósito fundamental es eliminar las barreras de entrada al branding profesional, ofreciendo una vía ágil, accesible e intencionada para emprendedores con recursos limitados o introversión, transformando la incertidumbre en confianza inmediata para lanzar sus proyectos.";
            canvasState.value_offer = "Sentir que realmente tiene una marca que lo representa, y que su adn esta plasmado en un logo, un nombre, una guia de comportamiento que puede ahora compartir.";
            canvasState.step0_buyer_actor = "Emprendedores y decisores con alta ambición profesional que demandan agilidad y rigor estratégico, pero carecen del capital o tiempo para contratar agencias tradicionales.";
            canvasState.selected_colors_hex = ["#090D16", "#FAF8F5", "#C59B27", "#0F172A"];
            canvasState.primary_font = "Plus Jakarta Sans";
            userPairSelections[11] = "B"; // Caja mixta editorial: TheBestBrand
            selectedLiveSketchIndex = 0;
        }""")

        # 2. Ir al Paso 5 y disparar la síntesis de las 4 propuestas en vivo
        await page.evaluate("""async () => {
            navigateToScreen("focus", 5);
            switchStep(5);
            const closure = document.getElementById('step5DiscoveryClosureCard');
            if (closure) {
                closure.classList.add('visible');
                closure.style.display = 'flex';
            }
            await generateLiveAIStudioLogoProposals(false);
        }""")
        await page.wait_for_timeout(800)

        # Verificar el Prompt Maestro
        prompt_val = await page.locator("#step5MasterPromptTextarea").input_value()
        print("PROMPT PREVIEW:\n", "\n".join(prompt_val.splitlines()[:8]))
        assert '"TheBestBrand"' in prompt_val, f"Expected TheBestBrand in prompt, got: {prompt_val[:300]}"
        assert '"TBB"' in prompt_val, f"Expected TBB monogram in prompt, got: {prompt_val[:300]}"
        assert "Mi Nueva Marca" not in prompt_val, "Stale 'Mi Nueva Marca' must not appear in prompt!"
        assert '"MNM"' not in prompt_val and "«MNM»" not in prompt_val, "Stale 'MNM' must not appear in prompt!"

        # Abrir el cajón del Prompt Maestro para tomar captura verificable
        await page.evaluate("""() => {
            const box = document.getElementById("step5MasterPromptCollapseArea");
            if (box) box.style.display = "block";
        }""")
        await page.wait_for_timeout(200)
        prompt_card = page.locator("#step5MasterPromptStudioBox")
        if await prompt_card.count() > 0:
            await prompt_card.screenshot(path=f"{ARTIFACT_DIR}/v33_step5b_master_prompt_tbb.png")

        # Cerrar el cajón del prompt y capturar la cuadrícula de los 4 logos limpios
        await page.evaluate("""() => {
            const box = document.getElementById("step5MasterPromptCollapseArea");
            if (box) box.style.display = "none";
        }""")
        await page.wait_for_timeout(200)

        gallery_row = page.locator("#liveAIStudioImagesRow")
        await gallery_row.scroll_into_view_if_needed()
        await page.wait_for_timeout(250)
        await gallery_row.screenshot(path=f"{ARTIFACT_DIR}/v33_step5b_four_clean_logos.png")

        row_html = await gallery_row.inner_html()
        assert "Mi Nueva Marca" not in row_html, "Mi Nueva Marca must not appear in logo proposals!"
        assert "RETÍCULA SUIZA 8X" not in row_html, "Noisy engineering text must not appear inside logo SVGs!"
        assert "APP ICON · MODO NOCTURNO" not in row_html, "Old noisy dual app icon caption must not appear!"

        # 3. Hacer clic en el botón único de la Propuesta #01 para adoptar y abrir el Brandbook (Paso 6)
        await page.evaluate("""() => {
            adoptAIStudioProposal(0, false);
            navigateToScreen("focus", 6);
            switchStep(6);
            renderStep6BrandHeroShowcase();
        }""")
        await page.wait_for_timeout(400)

        hero_el = page.locator("#step6BrandHeroShowcase")
        await hero_el.scroll_into_view_if_needed()
        await page.wait_for_timeout(200)
        await hero_el.screenshot(path=f"{ARTIFACT_DIR}/v33_step6_hero_thebestbrand.png")

        print("ALL V33 CLEAN LOGOS & PROMPT CHECKS PASSED 100%!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
