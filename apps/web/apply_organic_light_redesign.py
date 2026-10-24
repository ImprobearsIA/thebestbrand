# -*- coding: utf-8 -*-
"""
Master script to transform TheBestBrand into a Light, Neutral, Organic Single-Screen Atelier
"""
import re

with open("apps/web/index_pre_organic_backup.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update CSS Variables for Light Mode & Neutral Starting State
old_css_root = """    :root {
      --bg-void: #050608;
      --bg-surface: rgba(18, 21, 31, 0.72);
      --bg-surface-hover: rgba(28, 33, 48, 0.85);
      --bg-glass-pill: rgba(255, 255, 255, 0.05);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(255, 255, 255, 0.2);
      --border-accent: rgba(99, 102, 241, 0.4);
      --accent-iris: #6366F1;
      --accent-violet: #8B5CF6;
      --accent-cyan: #06B6D4;
      --accent-amber: #F59E0B;
      --accent-emerald: #10B981;
      --ink-primary: #FFFFFF;
      --ink-secondary: #94A3B8;
      --ink-tertiary: #64748B;
      --font-display: 'Syne', sans-serif;
      --font-ui: 'Plus Jakarta Sans', sans-serif;
      --font-tech: 'Space Grotesk', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }"""

new_css_root = """    :root {
      /* PURE NEUTRAL LIGHT GALLERY DESIGN SYSTEM (ZERO COLOR BIAS) */
      --bg-void: #F8F9FA;
      --bg-dynamic-ambient: rgba(24, 24, 27, 0.03);
      --brand-primary: #18181B; /* Neutral Graphite / Obsidian */
      --brand-primary-rgb: 24, 24, 27;
      --brand-secondary: #71717A;
      --brand-accent-glow: rgba(24, 24, 27, 0.05);
      --bg-surface: #FFFFFF;
      --bg-surface-hover: #F4F4F6;
      --bg-glass-pill: rgba(0, 0, 0, 0.04);
      --border-subtle: rgba(0, 0, 0, 0.08);
      --border-hover: rgba(0, 0, 0, 0.18);
      --border-accent: rgba(24, 24, 27, 0.25);
      --accent-iris: var(--brand-primary);
      --accent-violet: var(--brand-secondary);
      --accent-cyan: #475569;
      --accent-amber: #D97706;
      --accent-emerald: #059669;
      --ink-primary: #0F172A; /* Deep Warm Charcoal */
      --ink-secondary: #475569;
      --ink-tertiary: #94A3B8;
      --shadow-organic: 0 12px 32px -8px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
      --shadow-float: 0 20px 40px -12px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
      --radius-organic: 26px;
      --radius-pill: 9999px;
      --font-display: 'Syne', sans-serif;
      --font-ui: 'Plus Jakarta Sans', sans-serif;
      --font-tech: 'Space Grotesk', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }"""

html = html.replace(old_css_root, new_css_root)

# 2. Update body styling
old_body = """    body {
      background-color: var(--bg-void);
      background-image:
        radial-gradient(1400px 700px at 50% -100px, rgba(99, 102, 241, 0.16), transparent 70%),
        radial-gradient(1000px 600px at 85% 90%, rgba(6, 182, 212, 0.06), transparent 60%),
        radial-gradient(900px 500px at 15% 45%, rgba(139, 92, 246, 0.05), transparent 60%);
      background-attachment: fixed;
      color: var(--ink-primary);
      font-family: var(--font-ui);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }"""

new_body = """    body {
      background-color: var(--bg-void);
      background-image:
        radial-gradient(1200px 600px at 50% -60px, var(--bg-dynamic-ambient), transparent 70%),
        radial-gradient(1000px 500px at 85% 90%, var(--brand-accent-glow), transparent 60%),
        radial-gradient(800px 400px at 15% 45%, var(--brand-accent-glow), transparent 60%);
      background-attachment: fixed;
      color: var(--ink-primary);
      font-family: var(--font-ui);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      transition: background-color 0.6s ease, background-image 0.6s ease;
    }"""

html = html.replace(old_body, new_body)

# 3. Update top-dock styling to light glassmorphism
old_top_dock = """    .top-dock {
      position: sticky;
      top: 16px;
      z-index: 100;
      margin: 0 auto;
      max-width: 1080px;
      width: calc(100% - 32px);
      padding: 10px 18px;
      background: rgba(12, 14, 22, 0.75);
      backdrop-filter: blur(24px) saturate(190%);
      -webkit-backdrop-filter: blur(24px) saturate(190%);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
      transition: all 0.3s ease;
    }"""

new_top_dock = """    .top-dock {
      position: sticky;
      top: 14px;
      z-index: 100;
      margin: 0 auto;
      max-width: 1240px;
      width: calc(100% - 32px);
      padding: 10px 18px;
      background: rgba(255, 255, 255, 0.90);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
    }"""

html = html.replace(old_top_dock, new_top_dock)

# 4. Update brand-mark and step-pill colors
old_brand_mark = """    .brand-mark-seal {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      color: #FFFFFF;
      display: grid;
      place-items: center;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.82rem;
      box-shadow: 0 0 16px rgba(99, 102, 241, 0.5);
    }
    .brand-mark-text {
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }"""

new_brand_mark = """    .brand-mark-seal {
      width: 30px;
      height: 30px;
      border-radius: 10px;
      background: var(--brand-primary);
      color: #FFFFFF;
      display: grid;
      place-items: center;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.85rem;
      box-shadow: 0 4px 12px var(--brand-accent-glow);
      transition: background 0.5s ease;
    }
    .brand-mark-text {
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--ink-primary);
    }"""

html = html.replace(old_brand_mark, new_brand_mark)

old_stepper = """    .stepper-dock {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.03);
      padding: 4px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .step-pill {
      background: transparent;
      border: none;
      color: var(--ink-secondary);
      font-family: var(--font-ui);
      font-size: 0.76rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .step-pill:hover {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.06);
    }
    .step-pill.active {
      background: #FFFFFF;
      color: #050608;
      box-shadow: 0 4px 14px rgba(255, 255, 255, 0.25);
    }"""

new_stepper = """    .stepper-dock {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(0, 0, 0, 0.04);
      padding: 4px;
      border-radius: 999px;
      border: 1px solid rgba(0, 0, 0, 0.04);
    }
    .step-pill {
      background: transparent;
      border: none;
      color: var(--ink-secondary);
      font-family: var(--font-ui);
      font-size: 0.76rem;
      font-weight: 600;
      padding: 6px 13px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .step-pill:hover {
      color: var(--ink-primary);
      background: rgba(0, 0, 0, 0.04);
    }
    .step-pill.active {
      background: var(--brand-primary);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }"""

html = html.replace(old_stepper, new_stepper)

# 5. Voice dock button
old_voice = """    .voice-dock-btn {
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #A5B4FC;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 6px 12px;
      border-radius: 999px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      user-select: none;
    }
    .voice-dock-btn:hover {
      background: rgba(99, 102, 241, 0.22);
      box-shadow: 0 0 16px rgba(99, 102, 241, 0.35);
      color: #FFFFFF;
    }"""

new_voice = """    .voice-dock-btn {
      background: rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.08);
      color: var(--ink-secondary);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 6px 12px;
      border-radius: 999px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      user-select: none;
    }
    .voice-dock-btn:hover {
      background: rgba(0, 0, 0, 0.08);
      color: var(--ink-primary);
    }"""

html = html.replace(old_voice, new_voice)

# 6. Dialogue turns (Light theme)
old_turns = """    .dialogue-turn.user {
      background: linear-gradient(135deg, rgba(79, 70, 229, 0.4) 0%, rgba(99, 102, 241, 0.2) 100%);
      border: 1px solid rgba(99, 102, 241, 0.35);
      color: #FFFFFF;
      align-self: flex-end;
      max-width: 85%;
      border-bottom-right-radius: 4px;
      box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.4);
    }
    .dialogue-turn.mentor {
      background: rgba(18, 22, 34, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #F1F5F9;
      align-self: flex-start;
      max-width: 90%;
      border-bottom-left-radius: 4px;
    }"""

new_turns = """    .dialogue-turn.user {
      background: var(--brand-primary);
      border: 1px solid rgba(0, 0, 0, 0.05);
      color: #FFFFFF;
      align-self: flex-end;
      max-width: 85%;
      border-bottom-right-radius: 6px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    .dialogue-turn.mentor {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      color: var(--ink-primary);
      align-self: flex-start;
      max-width: 90%;
      border-bottom-left-radius: 6px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
    }"""

html = html.replace(old_turns, new_turns)

# 7. Input dock (Light theme)
old_input_dock = """    .input-dock {
      width: 100%;
      max-width: 740px;
      background: rgba(18, 21, 33, 0.85);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-subtle);
      border-radius: 28px;
      padding: 8px 12px 8px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15);
      transition: all 0.25s ease;
    }
    .input-dock:focus-within {
      border-color: rgba(99, 102, 241, 0.5);
      box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 35px rgba(99, 102, 241, 0.35);
      background: rgba(22, 26, 40, 0.95);
    }
    .input-textarea {
      flex: 1;
      background: transparent;
      border: none;
      color: #FFFFFF;
      font-family: var(--font-ui);
      font-size: 0.98rem;
      outline: none;
      resize: none;
      min-height: 28px;
      max-height: 100px;
      line-height: 1.45;
    }
    .input-textarea::placeholder {
      color: rgba(148, 163, 184, 0.5);
    }"""

new_input_dock = """    .input-dock {
      width: 100%;
      max-width: 740px;
      background: #FFFFFF;
      backdrop-filter: blur(24px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 999px;
      padding: 8px 12px 8px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px -6px rgba(0, 0, 0, 0.06);
      transition: all 0.25s ease;
    }
    .input-dock:focus-within {
      border-color: var(--brand-primary);
      box-shadow: 0 12px 36px -6px rgba(0, 0, 0, 0.1);
    }
    .input-textarea {
      flex: 1;
      background: transparent;
      border: none;
      color: var(--ink-primary);
      font-family: var(--font-ui);
      font-size: 0.98rem;
      outline: none;
      resize: none;
      min-height: 28px;
      max-height: 100px;
      line-height: 1.45;
    }
    .input-textarea::placeholder {
      color: rgba(100, 116, 139, 0.6);
    }"""

html = html.replace(old_input_dock, new_input_dock)

# 8. Update Smart Chips to soft white tactile pills
old_smart_chips = """    .smart-chip-pill {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 10px 14px;
      color: #E2E8F0;
      font-family: var(--font-ui);
      font-size: 0.82rem;
      line-height: 1.4;
      text-align: left;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .smart-chip-pill:hover {
      background: rgba(99, 102, 241, 0.12);
      border-color: rgba(99, 102, 241, 0.4);
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px -4px rgba(99, 102, 241, 0.3);
    }"""

new_smart_chips = """    .smart-chip-pill {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      padding: 9px 16px;
      color: var(--ink-primary);
      font-family: var(--font-ui);
      font-size: 0.82rem;
      line-height: 1.4;
      text-align: left;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    }
    .smart-chip-pill:hover {
      background: #F8FAFC;
      border-color: rgba(0, 0, 0, 0.2);
      color: var(--ink-primary);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px -4px rgba(0, 0, 0, 0.06);
    }"""

html = html.replace(old_smart_chips, new_smart_chips)

# 9. Update Question Billboard colors
old_billboard = """    .question-category {
      font-family: var(--font-tech);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent-cyan);
      margin-bottom: 12px;
      display: inline-block;
      font-weight: 600;
    }
    .question-text {
      font-family: var(--font-display);
      font-size: 2.1rem;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      text-wrap: balance;
    }"""

new_billboard = """    .question-category {
      font-family: var(--font-tech);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--ink-tertiary);
      margin-bottom: 10px;
      display: inline-block;
      font-weight: 600;
    }
    .question-text {
      font-family: var(--font-display);
      font-size: 2.05rem;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: var(--ink-primary);
      text-wrap: balance;
    }"""

html = html.replace(old_billboard, new_billboard)

# 10. Update manifesto vault & cards to light organic
old_vault = """    .manifesto-vault {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 28px;
      padding: 32px;
      backdrop-filter: blur(24px);
      box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5);
      animation: fadeInScale 0.5s ease;
    }
    .vault-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .vault-title {
      font-family: var(--font-display);
      font-size: 1.2rem;
      font-weight: 700;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .vault-progress {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #34D399;
      background: rgba(16, 185, 129, 0.1);
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(16, 185, 129, 0.25);
    }
    .manifesto-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .manifesto-plaque {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      padding: 20px;
      transition: all 0.22s ease;
    }
    .manifesto-plaque:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
    .plaque-num {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #818CF8;
      letter-spacing: 0.06em;
      display: block;
      margin-bottom: 6px;
    }
    .plaque-title {
      font-family: var(--font-tech);
      font-size: 0.95rem;
      font-weight: 700;
      color: #F8FAFC;
      margin-bottom: 8px;
    }
    .plaque-text {
      font-size: 0.84rem;
      color: var(--ink-secondary);
      line-height: 1.45;
    }"""

new_vault = """    .manifesto-vault {
      width: 100%;
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-organic);
      padding: 28px;
      box-shadow: var(--shadow-organic);
      animation: fadeInScale 0.5s ease;
    }
    .vault-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .vault-title {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--ink-primary);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .vault-progress {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #059669;
      background: rgba(5, 150, 105, 0.08);
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(5, 150, 105, 0.2);
    }
    .manifesto-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
    }
    .manifesto-plaque {
      background: #FAFAFB;
      border: 1px solid var(--border-subtle);
      border-radius: 18px;
      padding: 18px;
      transition: all 0.22s ease;
    }
    .manifesto-plaque:hover {
      background: #FFFFFF;
      border-color: rgba(0, 0, 0, 0.14);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px -4px rgba(0, 0, 0, 0.04);
    }
    .plaque-num {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--ink-tertiary);
      letter-spacing: 0.06em;
      display: block;
      margin-bottom: 6px;
    }
    .plaque-title {
      font-family: var(--font-tech);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ink-primary);
      margin-bottom: 8px;
    }
    .plaque-text {
      font-size: 0.84rem;
      color: var(--ink-secondary);
      line-height: 1.45;
    }"""

html = html.replace(old_vault, new_vault)

# 11. Add Unified Single-Screen Workbench styles
workbench_css = """
    /* ==========================================================================
       UNIFIED SINGLE-SCREEN ATELIER WORKBENCH (ALL IN ONE VIEW)
       ========================================================================== */
    .unified-workbench-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      width: 100%;
      max-width: 1360px;
      margin: 20px auto 40px auto;
      align-items: start;
    }
    @media (max-width: 1080px) {
      .unified-workbench-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
    .workbench-dialogue-pane {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .workbench-canvas-pane {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-organic);
      padding: 24px;
      box-shadow: var(--shadow-organic);
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: sticky;
      top: 90px;
      max-height: calc(100vh - 120px);
      overflow-y: auto;
    }
    @media (max-width: 1080px) {
      .workbench-canvas-pane {
        position: static;
        max-height: none;
      }
    }
    .brand-live-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .brand-live-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--ink-primary);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-live-monogram {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--brand-primary);
      color: #FFFFFF;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 0.9rem;
      transition: background 0.5s ease;
    }
    .brand-live-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.04);
      color: var(--ink-secondary);
      border: 1px solid var(--border-subtle);
    }

    /* Mobile switcher */
    .mobile-atelier-switch {
      display: none;
      background: rgba(0, 0, 0, 0.04);
      padding: 4px;
      border-radius: 999px;
      margin: 0 auto 16px auto;
      max-width: 340px;
      width: 100%;
    }
    @media (max-width: 1080px) {
      .mobile-atelier-switch { display: flex; }
    }
    .mobile-tab-btn {
      flex: 1;
      border: none;
      background: transparent;
      padding: 8px 12px;
      border-radius: 999px;
      font-family: var(--font-ui);
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--ink-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .mobile-tab-btn.active {
      background: #FFFFFF;
      color: var(--ink-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
"""

# Insert workbench_css right before </style>
html = html.replace("</style>", workbench_css + "\n  </style>")

# 12. Add JavaScript function for dynamic color environment change & neutral aura start
js_theme_engine = """
    // =========================================================================
    // DYNAMIC BRAND COLOR ENVIRONMENT & NEUTRAL AURA SYSTEM
    // =========================================================================
    let currentBrandThemeColors = ["#18181B", "#71717A"];
    let isBrandThemeColored = false;

    function applyDynamicBrandTheme(colors) {
      if (!colors || colors.length === 0) return;
      currentBrandThemeColors = colors;
      isBrandThemeColored = true;
      const primaryHex = colors[0];
      const secondaryHex = colors[1] || "#71717A";

      // Convert hex to rgb
      const r = parseInt(primaryHex.slice(1, 3), 16) || 24;
      const g = parseInt(primaryHex.slice(3, 5), 16) || 24;
      const b = parseInt(primaryHex.slice(5, 7), 16) || 27;

      const root = document.documentElement;
      root.style.setProperty("--brand-primary", primaryHex);
      root.style.setProperty("--brand-primary-rgb", `${r}, ${g}, ${b}`);
      root.style.setProperty("--brand-secondary", secondaryHex);
      root.style.setProperty("--brand-accent-glow", `rgba(${r}, ${g}, ${b}, 0.12)`);
      root.style.setProperty("--bg-dynamic-ambient", `rgba(${r}, ${g}, ${b}, 0.06)`);
      root.style.setProperty("--border-accent", `rgba(${r}, ${g}, ${b}, 0.35)`);

      // Update brand monogram and mark
      const monogram = document.getElementById("brandLiveMonogram");
      if (monogram) monogram.style.background = primaryHex;
      const seal = document.querySelector(".brand-mark-seal");
      if (seal) seal.style.background = primaryHex;

      // Update Aura Orb chromatic target
      const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) h = s = 0;
        else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
      };

      const [h, s, l] = rgbToHsl(r, g, b);
      for (let p of auraParticles) {
        p.hue = h;
      }
    }

    // Toggle for mobile view (Mentora vs Lienzo)
    function switchMobileView(view) {
      const left = document.getElementById("atelierLeftPane");
      const right = document.getElementById("atelierRightPane");
      const btnMentor = document.getElementById("mTabMentor");
      const btnCanvas = document.getElementById("mTabCanvas");
      if (view === 'mentor') {
        if (left) left.style.display = 'flex';
        if (right) right.style.display = 'none';
        if (btnMentor) btnMentor.classList.add('active');
        if (btnCanvas) btnCanvas.classList.remove('active');
      } else {
        if (left) left.style.display = 'none';
        if (right) right.style.display = 'flex';
        if (btnCanvas) btnCanvas.classList.add('active');
        if (btnMentor) btnMentor.classList.remove('active');
      }
    }
"""

html = html.replace("let currentXP = 450;", js_theme_engine + "\n    let currentXP = 450;")

# 13. Update Aura Orb rendering loop for neutral pearl/silver by default and dynamic brand hue
old_aura_render = """      // Inner Luminous Core
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, isSpeakingLive ? 48 : 36);
      if (isSpeakingLive) {
        grad.addColorStop(0, "rgba(6, 182, 212, 0.6)");
        grad.addColorStop(0.4, "rgba(99, 102, 241, 0.35)");
        grad.addColorStop(1, "rgba(6, 182, 212, 0)");
      } else {
        grad.addColorStop(0, "rgba(99, 102, 241, 0.45)");
        grad.addColorStop(0.6, "rgba(139, 92, 246, 0.18)");
        grad.addColorStop(1, "rgba(99, 102, 241, 0)");
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, isSpeakingLive ? 52 : 38, 0, Math.PI * 2);
      ctx.fill();"""

new_aura_render = """      // Inner Luminous Core (Neutral Pearl/Obsidian by default, shifts to Brand Colors on selection)
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, isSpeakingLive ? 48 : 36);
      if (isBrandThemeColored) {
        grad.addColorStop(0, `rgba(${currentBrandThemeColors[0] ? 'var(--brand-primary-rgb)' : '24,24,27'}, 0.4)`);
        grad.addColorStop(0.5, `rgba(${currentBrandThemeColors[0] ? 'var(--brand-primary-rgb)' : '24,24,27'}, 0.15)`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        // Pure Neutral Titanium/Silver & Ivory
        grad.addColorStop(0, isSpeakingLive ? "rgba(15, 23, 42, 0.35)" : "rgba(15, 23, 42, 0.22)");
        grad.addColorStop(0.5, "rgba(100, 116, 139, 0.12)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, isSpeakingLive ? 52 : 38, 0, Math.PI * 2);
      ctx.fill();"""

html = html.replace(old_aura_render, new_aura_render)

with open("apps/web/index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Master transformation to Light & Neutral Organic Atelier completed!")
