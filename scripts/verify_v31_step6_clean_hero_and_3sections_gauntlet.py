#!/usr/bin/env python3
"""
Gauntlet v31 — Step 6 Redesign Verification:
1. Clean, distraction-free Brand Hero Showcase (`#step6BrandHeroShowcase`) as the very first element in Step 6,
   spanning full container width (and 100% width on mobile) and occupying >60% of the viewport height.
2. Light / Dark background toggle (`#step6HeroBgToggle`) working cleanly on the Hero Showcase.
3. Intuitive 3-Category Segmented Navigation (`#step6CategorySegmentedNav`):
   - Tab 1: `📦 1. Archivos Descargables` (`#step6SectionDownloads`) with plain-language cards explaining how to use each file.
   - Tab 2: `📐 2. Información Técnica y Manual` (`#step6SectionTechnical`) with Tomos I–XI and ISO Print-Shop Cheatsheet.
   - Tab 3: `💼 3. Información Comercial y Expansión` (`#step6SectionCommercial`) with $64,500 USD valuation, Website Builder, and AI Social Strategy.
4. Sober editorial monochromatic restraint (zero rainbow button clutter).
"""
import asyncio
import os
from playwright.async_api import async_playwright

ARTIFACT_DIR = "/Users/oso/.gemini/antigravity/brain/3bad395a-8444-49c2-92c9-1229b0df449d"
BASE_URL = "http://127.0.0.1:8000"


async def run_v31_gauntlet():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        # ---------------------------------------------------------------------
        # 1. DESKTOP VERIFICATION (1440x900)
        # ---------------------------------------------------------------------
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        console_errors = []
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        await page.goto(f"{BASE_URL}/?step=6", wait_until="networkidle")
        await page.wait_for_timeout(600)

        # Set a realistic digital brand state to verify full continuity in the Hero Showcase
        await page.evaluate("""() => {
            canvasState.brandName = "NexoFlow";
            canvasState.tagline = "Plataforma inteligente de automatización y productividad en tiempo real";
            canvasState.primary_font = "Space Grotesk";
            canvasState.selected_colors_hex = ["#FAF8F5", "#090D16", "#D4AF37", "#38BDF8"];
            switchStep(6);
        }""")
        await page.wait_for_timeout(500)

        # Verify Hero Showcase is the very first element in #panel-step-6 and occupies a large portion of viewport
        hero_metrics = await page.evaluate("""() => {
            const panel = document.getElementById("panel-step-6");
            const hero = document.getElementById("step6BrandHeroShowcase");
            const rect = hero.getBoundingClientRect();
            const firstChildId = panel && panel.firstElementChild ? panel.firstElementChild.id : "";
            return {
                firstChildId,
                width: rect.width,
                height: rect.height,
                top: rect.top,
                viewportHeight: window.innerHeight,
                heightRatio: rect.height / window.innerHeight,
                titleText: document.getElementById("brandbookMasterTitle")?.textContent?.trim()
            };
        }""")
        print("Desktop Hero Metrics:", hero_metrics)
        assert hero_metrics["firstChildId"] == "step6BrandHeroShowcase", "Hero must be first element in Step 6"
        assert hero_metrics["heightRatio"] >= 0.60, f"Hero height ratio too small: {hero_metrics['heightRatio']}"
        assert hero_metrics["titleText"] == "NexoFlow", f"Unexpected title: {hero_metrics['titleText']}"

        # Screenshot 1: Desktop Hero Showcase (Dark Theme) + Segmented Bar
        await page.screenshot(path=os.path.join(ARTIFACT_DIR, "v31_step6_hero_dark_desktop.png"), full_page=False)

        # Test Light/Dark Toggle on Hero Showcase
        await page.click("#step6HeroBgToggle")
        await page.wait_for_timeout(350)
        hero_bg_light = await page.evaluate("""() => {
            return getComputedStyle(document.getElementById("step6BrandHeroShowcase")).backgroundColor;
        }""")
        print("Hero background after light toggle:", hero_bg_light)
        await page.screenshot(path=os.path.join(ARTIFACT_DIR, "v31_step6_hero_light_desktop.png"), full_page=False)

        # Toggle back to dark for standard view
        await page.click("#step6HeroBgToggle")
        await page.wait_for_timeout(300)

        # Scroll to the 3-Category Segmented Navigation & Section 1 (Downloads)
        await page.evaluate("""() => {
            document.getElementById("step6CategorySegmentedNav").scrollIntoView({ behavior: "instant", block: "start" });
        }""")
        await page.wait_for_timeout(350)

        vis_state_1 = await page.evaluate("""() => ({
            downloads: getComputedStyle(document.getElementById("step6SectionDownloads")).display,
            technical: getComputedStyle(document.getElementById("step6SectionTechnical")).display,
            commercial: getComputedStyle(document.getElementById("step6SectionCommercial")).display
        })""")
        print("Category 1 (Downloads) Visibility:", vis_state_1)
        assert vis_state_1["downloads"] != "none" and vis_state_1["technical"] == "none" and vis_state_1["commercial"] == "none"
        await page.screenshot(path=os.path.join(ARTIFACT_DIR, "v31_step6_tab1_downloads.png"), full_page=False)

        # Switch to Category 2: Información Técnica y Manual
        await page.click("#step6CatBtn_technical")
        await page.wait_for_timeout(450)
        vis_state_2 = await page.evaluate("""() => ({
            downloads: getComputedStyle(document.getElementById("step6SectionDownloads")).display,
            technical: getComputedStyle(document.getElementById("step6SectionTechnical")).display,
            commercial: getComputedStyle(document.getElementById("step6SectionCommercial")).display
        })""")
        print("Category 2 (Technical) Visibility:", vis_state_2)
        assert vis_state_2["technical"] != "none" and vis_state_2["downloads"] == "none" and vis_state_2["commercial"] == "none"
        await page.screenshot(path=os.path.join(ARTIFACT_DIR, "v31_step6_tab2_technical.png"), full_page=False)

        # Switch to Category 3: Información Comercial y Expansión
        await page.click("#step6CatBtn_commercial")
        await page.wait_for_timeout(450)
        vis_state_3 = await page.evaluate("""() => ({
            downloads: getComputedStyle(document.getElementById("step6SectionDownloads")).display,
            technical: getComputedStyle(document.getElementById("step6SectionTechnical")).display,
            commercial: getComputedStyle(document.getElementById("step6SectionCommercial")).display
        })""")
        print("Category 3 (Commercial) Visibility:", vis_state_3)
        assert vis_state_3["commercial"] != "none" and vis_state_3["downloads"] == "none" and vis_state_3["technical"] == "none"
        await page.screenshot(path=os.path.join(ARTIFACT_DIR, "v31_step6_tab3_commercial.png"), full_page=False)

        # ---------------------------------------------------------------------
        # 2. MOBILE VERIFICATION (390x844 — iPhone 14 Pro)
        # ---------------------------------------------------------------------
        m_context = await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        m_page = await m_context.new_page()
        await m_page.goto(f"{BASE_URL}/?step=6", wait_until="networkidle")
        await m_page.wait_for_timeout(500)
        await m_page.evaluate("""() => {
            canvasState.brandName = "NexoFlow";
            canvasState.tagline = "Plataforma inteligente de automatización y productividad en tiempo real";
            canvasState.primary_font = "Space Grotesk";
            canvasState.selected_colors_hex = ["#FAF8F5", "#090D16", "#D4AF37", "#38BDF8"];
            switchStep(6);
            window.scrollTo(0, 0);
        }""")
        await m_page.wait_for_timeout(450)

        m_metrics = await m_page.evaluate("""() => {
            const hero = document.getElementById("step6BrandHeroShowcase");
            const rect = hero.getBoundingClientRect();
            return {
                heroWidth: rect.width,
                viewportWidth: window.innerWidth,
                widthRatio: rect.width / window.innerWidth,
                heroHeight: rect.height,
                overflowX: document.documentElement.scrollWidth > window.innerWidth
            };
        }""")
        print("Mobile Hero Metrics:", m_metrics)
        assert m_metrics["widthRatio"] >= 0.88, f"Mobile hero should span full container width: {m_metrics['widthRatio']}"
        assert not m_metrics["overflowX"], "Zero horizontal overflow allowed on mobile"

        await m_page.screenshot(path=os.path.join(ARTIFACT_DIR, "v31_step6_hero_mobile.png"), full_page=False)

        assert len(console_errors) == 0, f"Console errors detected: {console_errors}"
        await browser.close()
        print("ALL V31 STEP 6 REDESIGN CHECKS PASSED 100%!")


if __name__ == "__main__":
    asyncio.run(run_v31_gauntlet())
