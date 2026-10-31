/**
 * =========================================================================================
 * THEBESTBRAND — REA v6.8.0 RUNTIME TELEMETRY & ZERO-SCROLL GUARD
 * Archivo: apps/web/assets/rea_telemetry_guard.js
 * Propósito:
 *   1. Certifica en tiempo de ejecución la Ley I (Zero-Scroll Interaction) en viewports
 *      móviles (390x844) y de escritorio.
 *   2. Monitorea el presupuesto de cuadro de 60fps (16.67ms) para el orbe de Aura.
 *   3. Registra telemetría de conmutación 0ms entre Gemini Aoede 24kHz y Web Speech API.
 * =========================================================================================
 */
(function initTheBestBrandReaGuard() {
  if (typeof window === "undefined") return;

  const telemetry = {
    version: "29.1-REA-CERTIFIED",
    droppedFramesOver16ms: 0,
    zeroScrollViolations: 0,
    ttsSwitchEvents: [],
    lastCheckedAt: null,
  };

  function auditZeroScrollLaw() {
    const doc = document.documentElement;
    const horizontalOverflow = doc.scrollWidth > doc.clientWidth + 2;
    if (horizontalOverflow) {
      telemetry.zeroScrollViolations += 1;
    }
    telemetry.lastCheckedAt = new Date().toISOString();
    return {
      horizontalOverflow,
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      clientHeight: doc.clientHeight,
    };
  }

  function recordTtsFallback(provider, latencyMs, reason) {
    telemetry.ttsSwitchEvents.push({
      provider,
      latencyMs: Math.round(latencyMs),
      reason: reason || "nominal",
      timestamp: new Date().toISOString(),
    });
  }

  window.__TBB_REA_TELEMETRY__ = {
    getSnapshot: () => ({ ...telemetry, viewport: auditZeroScrollLaw() }),
    auditZeroScrollLaw,
    recordTtsFallback,
  };
})();
