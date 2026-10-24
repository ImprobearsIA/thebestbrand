# -*- coding: utf-8 -*-
import re

with open("apps/web/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let's replace the internal structure of panel-step-1 to use the unified workbench grid
old_step_1_inner = """    <section class="stage-section active" id="panel-step-1">
      <div class="question-billboard">
        <span class="question-category" id="questionCategory">01 · Propósito Nuclear & Círculo Dorado</span>
        <h1 class="question-text" id="activeQuestionHeading">
          ¿Qué problema real le resuelves a tus clientes que nadie más en tu industria ha sido capaz de solucionar?
        </h1>
      </div>

      <!-- DUOLINGO TAP-TO-ANSWER SMART SUGGESTION CHIPS -->
      <div class="smart-chips-stage" id="smartChipsContainer">
        <div class="smart-chips-header">
          <span class="smart-chips-label">💡 TOCA PARA INSPIRARTE (RESPUESTAS ESTRATÉGICAS RÁPIDAS):</span>
          <span class="smart-chips-sub">Haz clic para redactar al instante</span>
        </div>
        <div class="smart-chips-grid" id="smartChipsGrid">
          <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('⚡ Resolvemos la ineficiencia logística mediante automatización y trazabilidad en tiempo real.')">
            ⚡ Logística automatizada y trazabilidad en tiempo real
          </button>
          <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('💎 Ofrecemos manufactura artesanal suiza y precisión a un precio justo y transparente.')">
            💎 Manufactura de alta precisión y precio transparente
          </button>
          <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('🌱 Democratizamos el acceso a productos 100% ecológicos sin sobrecosto comercial.')">
            🌱 Sostenibilidad ecológica real sin sobreprecio
          </button>
          <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('🛡️ Blindamos la seguridad de pagos con criptografía y verificación biométrica continua.')">
            🛡️ Criptoseguridad y verificación bancaria continua
          </button>
        </div>
      </div>

      <!-- EFFORTLESS INPUT DOCK (RIGHT UNDER THE ACTIVE QUESTION - ZERO SCROLL) -->
      <div class="input-dock" style="margin-bottom: 10px;">
        <button class="btn-circle btn-mic-round" id="micBtn" onclick="toggleContinuousVoice()" title="Hablar por voz">🎙️</button>
        <textarea
          id="chatInput"
          class="input-textarea"
          rows="1"
          placeholder="Habla o escribe con total libertad..."
          oninput="onChatInputChanged(this.value)"
          onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendUserMessage(); }"
        ></textarea>
        <button class="btn-circle btn-send" id="sendBtn" onclick="sendUserMessage()" title="Enviar mensaje">↑</button>
      </div>

      <!-- STRATEGIC DEPTH METER -->
      <div class="strategic-depth-container" id="strategicDepthContainer">
        <div class="depth-meter-top">
          <span class="depth-meter-title">🎯 PROFUNDIDAD ESTRATÉGICA DEL ARGUMENTO:</span>
          <span class="depth-meter-badge" id="depthMeterLabel">65% · Nivel Profesional (+25 XP)</span>
        </div>
        <div class="depth-meter-track">
          <div class="depth-meter-progress" id="depthMeterProgress" style="width: 65%;"></div>
        </div>
      </div>

      <!-- CLOSING CONFIRMATION GATE -->
      <div class="closing-gate-pill" id="closingGateBanner">
        <span class="closing-gate-text">✨ ¡Excelente! Hemos capturado los pilares de este paso. ¿Quieres agregar más ideas o avanzamos?</span>
        <div class="closing-gate-actions">
          <button class="btn-action" style="padding:6px 12px; font-size:0.75rem;" onclick="document.getElementById('chatInput').focus()">✍️ Agregar más</button>
          <button class="btn-action emerald" style="padding:6px 12px; font-size:0.75rem;" onclick="confirmNoMoreCommentsAndAdvance()">Avanzar a Touchpoints →</button>
        </div>
      </div>

      <!-- SOCRATIC DIALOGUE STREAM (HISTORY TRANSCRIPT) -->
      <div class="socratic-stream" id="chatHistory">
        <div class="dialogue-turn mentor">
          <span class="mentor-pill-tag">✨ AURA · CONSULTORÍA ESTRATÉGICA</span>
          <p>Bienvenido al Taller de Marca. Vamos a descubrir la verdadera alma de tu proyecto, conversando con calma y explorando cada ángulo hasta definir un posicionamiento inolvidable. Cuéntame todo sobre tu producto o servicio.</p>
        </div>
      </div>

      <!-- THE BRAND MANIFESTO VAULT (PROGRESSIVE DISCLOSURE) -->
      <div class="manifesto-vault">
        <div class="vault-header">
          <div class="vault-title">
            <span>🏛️ Manifiesto de Marca en Construcción</span>
          </div>
          <span class="vault-progress" id="committeePct">15% Completitud</span>
        </div>
        <div class="manifesto-grid">
          <div class="manifesto-plaque">
            <span class="plaque-num">01 · PROPÓSITO</span>
            <div class="plaque-title">Círculo Dorado</div>
            <p class="plaque-text" id="canvasGoldenCircle">En espera de tus respuestas...</p>
          </div>
          <div class="manifesto-plaque">
            <span class="plaque-num">02 · DIFERENCIAL</span>
            <div class="plaque-title">Oferta de Valor</div>
            <p class="plaque-text" id="canvasValueOffer">La ventaja única frente al mercado...</p>
          </div>
          <div class="manifesto-plaque">
            <span class="plaque-num">03 · IMPACTO</span>
            <div class="plaque-title">Rol en la Sociedad</div>
            <p class="plaque-text" id="canvasSocialRole">Transformación de la industria...</p>
          </div>
          <div class="manifesto-plaque">
            <span class="plaque-num">04 · MÉTODO</span>
            <div class="plaque-title">Proceso Operativo</div>
            <p class="plaque-text" id="canvasProcessSteps">Paso a paso de excelencia...</p>
          </div>
          <div class="manifesto-plaque">
            <span class="plaque-num">05 · VOZ</span>
            <div class="plaque-title">Mensaje Nuclear</div>
            <p class="plaque-text" id="canvasCoreMessage">Idea central de recordación...</p>
          </div>
          <div class="manifesto-plaque">
            <span class="plaque-num">06 · CLIENTE</span>
            <div class="plaque-title">Perfil Ideal</div>
            <p class="plaque-text" id="canvasIdealCustomer">Quién decide y qué valora...</p>
          </div>
        </div>
      </div>
    </section>"""

new_step_1_inner = """    <section class="stage-section active" id="panel-step-1">
      <!-- MOBILE VIEW SWITCHER (MENTORA VS LIENZO) -->
      <div class="mobile-atelier-switch">
        <button type="button" class="mobile-tab-btn active" id="mTabMentor" onclick="switchMobileView('mentor')">💬 Aura Mentora</button>
        <button type="button" class="mobile-tab-btn" id="mTabCanvas" onclick="switchMobileView('canvas')">🏛️ Lienzo en Vivo</button>
      </div>

      <!-- UNIFIED SINGLE-SCREEN ATELIER WORKBENCH -->
      <div class="unified-workbench-grid">

        <!-- LEFT COLUMN: AURA SOCRATIC DIALOGUE & INTERACTIVE INPUT -->
        <div class="workbench-dialogue-pane" id="atelierLeftPane">
          <div class="question-billboard" style="margin-bottom: 20px;">
            <span class="question-category" id="questionCategory">01 · Propósito Nuclear & Círculo Dorado</span>
            <h1 class="question-text" id="activeQuestionHeading" style="font-size: 1.75rem;">
              ¿Qué problema real le resuelves a tus clientes que nadie más en tu industria ha sido capaz de solucionar?
            </h1>
          </div>

          <!-- SMART CHIPS DE INSPIRACIÓN RÁPIDA -->
          <div class="smart-chips-stage" id="smartChipsContainer">
            <div class="smart-chips-header">
              <span class="smart-chips-label">💡 TOCA PARA INSPIRARTE (RESPUESTAS RÁPIDAS):</span>
            </div>
            <div class="smart-chips-grid" id="smartChipsGrid">
              <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('⚡ Resolvemos la ineficiencia logística mediante automatización y trazabilidad en tiempo real.')">
                ⚡ Logística automatizada y trazabilidad
              </button>
              <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('💎 Ofrecemos manufactura artesanal suiza y precisión a un precio justo y transparente.')">
                💎 Manufactura de alta precisión suiza
              </button>
              <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('🌱 Democratizamos el acceso a productos 100% ecológicos sin sobrecosto comercial.')">
                🌱 Sostenibilidad real sin sobreprecio
              </button>
              <button type="button" class="smart-chip-pill" onclick="injectSmartAnswer('🛡️ Blindamos la seguridad de pagos con criptografía y verificación biométrica continua.')">
                🛡️ Criptoseguridad y verificación continua
              </button>
            </div>
          </div>

          <!-- FLOATING INPUT DOCK -->
          <div class="input-dock" style="margin-bottom: 12px;">
            <button class="btn-circle btn-mic-round" id="micBtn" onclick="toggleContinuousVoice()" title="Hablar por voz">🎙️</button>
            <textarea
              id="chatInput"
              class="input-textarea"
              rows="1"
              placeholder="Habla o escribe tu visión..."
              oninput="onChatInputChanged(this.value)"
              onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendUserMessage(); }"
            ></textarea>
            <button class="btn-circle btn-send" id="sendBtn" onclick="sendUserMessage()" title="Enviar mensaje">↑</button>
          </div>

          <!-- STRATEGIC DEPTH METER -->
          <div class="strategic-depth-container" id="strategicDepthContainer" style="margin-bottom: 16px;">
            <div class="depth-meter-top">
              <span class="depth-meter-title">🎯 PROFUNDIDAD ESTRATÉGICA:</span>
              <span class="depth-meter-badge" id="depthMeterLabel">65% · Profesional (+25 XP)</span>
            </div>
            <div class="depth-meter-track">
              <div class="depth-meter-progress" id="depthMeterProgress" style="width: 65%;"></div>
            </div>
          </div>

          <!-- CLOSING CONFIRMATION GATE -->
          <div class="closing-gate-pill" id="closingGateBanner">
            <span class="closing-gate-text">✨ ¡Excelente! Hemos capturado los pilares de este paso. ¿Quieres agregar más ideas o avanzamos?</span>
            <div class="closing-gate-actions">
              <button class="btn-action" style="padding:6px 12px; font-size:0.75rem;" onclick="document.getElementById('chatInput').focus()">✍️ Más ideas</button>
              <button class="btn-action emerald" style="padding:6px 12px; font-size:0.75rem;" onclick="confirmNoMoreCommentsAndAdvance()">Avanzar a Touchpoints →</button>
            </div>
          </div>

          <!-- SOCRATIC DIALOGUE STREAM (COMPACT, AUTO-SCROLL) -->
          <div class="socratic-stream" id="chatHistory" style="max-height: 280px; overflow-y: auto; margin-bottom: 0;">
            <div class="dialogue-turn mentor">
              <span class="mentor-pill-tag">✨ AURA · CONSULTORÍA ESTRATÉGICA</span>
              <p>Bienvenido al Taller de Marca. Vamos a descubrir la verdadera alma de tu proyecto, conversando con calma y explorando cada ángulo hasta definir un posicionamiento inolvidable. Cuéntame todo sobre tu producto o servicio.</p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: LIVING BRAND CANVAS (ALL-IN-ONE REAL-TIME VIEW) -->
        <div class="workbench-canvas-pane" id="atelierRightPane">
          <div class="brand-live-header-bar">
            <div class="brand-live-title">
              <div class="brand-live-monogram" id="brandLiveMonogram">TB</div>
              <span id="brandLiveName">TheBestBrand</span>
            </div>
            <span class="vault-progress" id="committeePct">15% Completitud</span>
          </div>

          <div class="manifesto-grid">
            <div class="manifesto-plaque">
              <span class="plaque-num">01 · PROPÓSITO (WHY)</span>
              <div class="plaque-title">Círculo Dorado</div>
              <p class="plaque-text" id="canvasGoldenCircle">En espera de tus respuestas...</p>
            </div>
            <div class="manifesto-plaque">
              <span class="plaque-num">02 · DIFERENCIAL (HOW)</span>
              <div class="plaque-title">Oferta de Valor</div>
              <p class="plaque-text" id="canvasValueOffer">La ventaja única frente al mercado...</p>
            </div>
            <div class="manifesto-plaque">
              <span class="plaque-num">03 · IMPACTO</span>
              <div class="plaque-title">Rol en la Sociedad</div>
              <p class="plaque-text" id="canvasSocialRole">Transformación de la industria...</p>
            </div>
            <div class="manifesto-plaque">
              <span class="plaque-num">04 · MÉTODO (WHAT)</span>
              <div class="plaque-title">Proceso Operativo</div>
              <p class="plaque-text" id="canvasProcessSteps">Paso a paso de excelencia...</p>
            </div>
            <div class="manifesto-plaque">
              <span class="plaque-num">05 · VOZ DE MARCA</span>
              <div class="plaque-title">Mensaje Nuclear</div>
              <p class="plaque-text" id="canvasCoreMessage">Idea central de recordación...</p>
            </div>
            <div class="manifesto-plaque">
              <span class="plaque-num">06 · CLIENTE IDEAL</span>
              <div class="plaque-title">Buyer Persona / ICP</div>
              <p class="plaque-text" id="canvasIdealCustomer">Quién decide y qué valora...</p>
            </div>
          </div>
        </div>

      </div>
    </section>"""

if old_step_1_inner in html:
    html = html.replace(old_step_1_inner, new_step_1_inner)
    print("Replaced panel-step-1 with Unified Single-Screen Workbench!")
else:
    print("Could not match old_step_1_inner exactly, will try regex")
    pattern = r'<section class="stage-section active" id="panel-step-1">.*?</section>'
    html = re.sub(pattern, new_step_1_inner, html, flags=re.DOTALL)
    print("Replaced via regex!")

with open("apps/web/index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html successfully")
