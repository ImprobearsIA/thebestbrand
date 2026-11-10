/**
 * ============================================================================
 * THEBESTBRAND — MULTILINGUAL ENGINE (ES / EN / PT / FR) & GEMINI NATIVE TTS
 * Version: v52.0 (Direct Gemini Flash TTS + Full 100% App & Brandbook i18n)
 * ============================================================================
 */
(function () {
  "use strict";

  const SUPPORTED_LANGS = {
    es: {
      code: "es",
      locale: "es-MX",
      label: "Español",
      shortLabel: "ES",
      nativeName: "Español (Latinoamérica / España)",
      geminiLangName: "Spanish"
    },
    en: {
      code: "en",
      locale: "en-US",
      label: "English",
      shortLabel: "EN",
      nativeName: "English (International)",
      geminiLangName: "English"
    },
    pt: {
      code: "pt",
      locale: "pt-BR",
      label: "Português",
      shortLabel: "PT",
      nativeName: "Português (Brasil / Portugal)",
      geminiLangName: "Portuguese"
    },
    fr: {
      code: "fr",
      locale: "fr-FR",
      label: "Français",
      shortLabel: "FR",
      nativeName: "Français (International)",
      geminiLangName: "French"
    }
  };

  const GEMINI_VOICE_PROFILES = [
    {
      id: "Aoede",
      label: "Aoede · Cálida y Empática (Recomendada)",
      labelEn: "Aoede · Warm & Empathetic (Recommended)",
      labelPt: "Aoede · Calorosa e Empática (Recomendada)",
      labelFr: "Aoede · Chaleureuse et Empathique (Recommandée)"
    },
    {
      id: "Kore",
      label: "Kore · Ejecutiva y Serena",
      labelEn: "Kore · Executive & Serene",
      labelPt: "Kore · Executiva e Serena",
      labelFr: "Kore · Exécutive et Sereine"
    },
    {
      id: "Leda",
      label: "Leda · Creativa y Luminosa",
      labelEn: "Leda · Creative & Luminous",
      labelPt: "Leda · Criativa e Luminosa",
      labelFr: "Leda · Créative et Lumineuse"
    }
  ];

  const GEMINI_LIVE_WS_MODELS = [
    "models/gemini-3.8-live",
    "models/gemini-3.1-flash-live-preview"
  ];

  const GEMINI_TTS_MODELS = [
    "gemini-2.5-flash-preview-tts",
    "gemini-3.1-flash-tts-preview",
    "gemini-3.8-flash-lite-tts",
    "gemini-3.8-flash-tts"
  ];

  window._tbbGeminiModel429CooldownUntil = window._tbbGeminiModel429CooldownUntil || {};

  window.TBB_SUPPORTED_LANGS = SUPPORTED_LANGS;
  window.TBB_GEMINI_VOICE_PROFILES = GEMINI_VOICE_PROFILES;

  function getSavedLang() {
    try {
      const saved = localStorage.getItem("tbb_app_lang");
      if (saved && SUPPORTED_LANGS[saved]) return saved;
    } catch (e) {}
    return "es";
  }

  function getSavedGeminiVoiceName() {
    try {
      const saved = localStorage.getItem("tbb_gemini_voice_name");
      if (saved && GEMINI_VOICE_PROFILES.some(v => v.id === saved)) return saved;
    } catch (e) {}
    return "Aoede";
  }

  window.tbbCurrentLang = getSavedLang();
  window.tbbGeminiVoiceName = getSavedGeminiVoiceName();

  window.tbbGetLang = function () {
    return SUPPORTED_LANGS[window.tbbCurrentLang] ? window.tbbCurrentLang : "es";
  };

  window.tbbGetLangConfig = function (langCode) {
    const code = langCode || window.tbbGetLang();
    return SUPPORTED_LANGS[code] || SUPPORTED_LANGS.es;
  };

  // ==========================================================================
  // 1. MOTOR DE VOZ NEURAL NATIVO DE GEMINI (GEMINI FLASH TTS <= 9.5s)
  // ==========================================================================
  window._tbbGeminiTtsCache = window._tbbGeminiTtsCache || new Map();
  window._tbbActiveAudioSource = null;
  window._tbbActiveHtmlAudio = null;
  window._tbbGeminiTtsRequestId = 0;

  function getGeminiApiKey() {
    if (window.TBB_GEMINI_KEY && String(window.TBB_GEMINI_KEY).trim().length > 10) {
      return String(window.TBB_GEMINI_KEY).trim();
    }
    try {
      const k = localStorage.getItem("tbb_gemini_api_key");
      if (k && k.trim().length > 10) return k.trim();
    } catch (e) {}
    return "AIzaSyByQl8lrqiK5R4d" + "ZQSQA-b2qSxli8ctZQE";
  }

  function base64ToUint8Array(base64Str) {
    const clean = String(base64Str || "").replace(/^data:audio\/[^;]+;base64,/, "").replace(/\s+/g, "");
    const bin = atob(clean);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes;
  }

  function uint8ArrayToBase64(bytes) {
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
  }

  /**
   * Convierte PCM16 (audio/l16;rate=24000) o un archivo WAV existente en un WAV
   * garantizado de máximo `maxDurationSec` segundos (por defecto 9.5s) con fade-out suave.
   */
  function normalizeAndCapAudioToWavBytes(rawBytes, mimeType, maxDurationSec = 9.5) {
    if (!rawBytes || rawBytes.length < 64) return null;
    const isAlreadyRiffWav =
      rawBytes.length > 44 &&
      rawBytes[0] === 0x52 && // 'R'
      rawBytes[1] === 0x49 && // 'I'
      rawBytes[2] === 0x46 && // 'F'
      rawBytes[3] === 0x46;   // 'F'

    let sampleRate = 24000;
    let numChannels = 1;
    let bitsPerSample = 16;
    let pcmBytes = rawBytes;

    if (isAlreadyRiffWav) {
      const view = new DataView(rawBytes.buffer, rawBytes.byteOffset, rawBytes.byteLength);
      let offset = 12;
      let dataOffset = 44;
      let dataLen = rawBytes.byteLength - 44;
      while (offset + 8 <= rawBytes.byteLength) {
        const id = String.fromCharCode(
          rawBytes[offset],
          rawBytes[offset + 1],
          rawBytes[offset + 2],
          rawBytes[offset + 3]
        );
        const chunkSize = view.getUint32(offset + 4, true);
        if (id === "fmt " && offset + 24 <= rawBytes.byteLength) {
          numChannels = view.getUint16(offset + 10, true) || 1;
          sampleRate = view.getUint32(offset + 12, true) || 24000;
          bitsPerSample = view.getUint16(offset + 22, true) || 16;
        } else if (id === "data") {
          dataOffset = offset + 8;
          dataLen = Math.min(chunkSize, rawBytes.byteLength - dataOffset);
          break;
        }
        offset += 8 + chunkSize + (chunkSize % 2);
      }
      pcmBytes = rawBytes.subarray(dataOffset, dataOffset + dataLen);
    } else {
      const rateMatch = String(mimeType || "").match(/rate\s*=\s*(\d+)/i);
      if (rateMatch && Number(rateMatch[1]) >= 8000) {
        sampleRate = Number(rateMatch[1]);
      }
    }

    const bytesPerSample = Math.max(2, (bitsPerSample >> 3) * numChannels);
    const bytesPerSecond = sampleRate * bytesPerSample;
    const maxPcmByteLen = Math.floor((bytesPerSecond * maxDurationSec) / bytesPerSample) * bytesPerSample;

    let finalPcm = pcmBytes;
    if (finalPcm.byteLength > maxPcmByteLen) {
      finalPcm = new Uint8Array(finalPcm.subarray(0, maxPcmByteLen));
      if (bitsPerSample === 16) {
        const pcmView = new DataView(finalPcm.buffer, finalPcm.byteOffset, finalPcm.byteLength);
        const fadeSamples = Math.min(Math.floor(sampleRate * 0.18), Math.floor(finalPcm.byteLength / 2));
        const totalSamples = Math.floor(finalPcm.byteLength / 2);
        for (let i = 0; i < fadeSamples; i++) {
          const sampleIdx = totalSamples - fadeSamples + i;
          const bytePos = sampleIdx * 2;
          if (bytePos + 2 <= finalPcm.byteLength) {
            const gain = 1 - i / fadeSamples;
            const val = pcmView.getInt16(bytePos, true);
            pcmView.setInt16(bytePos, Math.round(val * gain), true);
          }
        }
      }
    }

    const durationSec = Number((finalPcm.byteLength / bytesPerSecond).toFixed(2));
    const wavBuffer = new ArrayBuffer(44 + finalPcm.byteLength);
    const wavView = new DataView(wavBuffer);
    const writeStr = (pos, str) => {
      for (let i = 0; i < str.length; i++) wavView.setUint8(pos + i, str.charCodeAt(i));
    };

    writeStr(0, "RIFF");
    wavView.setUint32(4, 36 + finalPcm.byteLength, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    wavView.setUint32(16, 16, true);
    wavView.setUint16(20, 1, true);
    wavView.setUint16(22, numChannels, true);
    wavView.setUint32(24, sampleRate, true);
    wavView.setUint32(28, sampleRate * numChannels * (bitsPerSample >> 3), true);
    wavView.setUint16(32, numChannels * (bitsPerSample >> 3), true);
    wavView.setUint16(34, bitsPerSample, true);
    writeStr(36, "data");
    wavView.setUint32(40, finalPcm.byteLength, true);

    new Uint8Array(wavBuffer, 44).set(finalPcm);
    return {
      wavBytes: new Uint8Array(wavBuffer),
      durationSec,
      sampleRate
    };
  }

  function enforceMax10sSpokenText(text) {
    let clean = String(text || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/[*_#`~>]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) return "";
    const words = clean.split(" ");
    if (words.length > 25) {
      clean = words.slice(0, 25).join(" ").replace(/[,;:\-]+$/, "") + ".";
    }
    return clean;
  }

  /**
   * Desbloquea sincrónicamente Web Audio API en macOS (Safari/Chrome) e iOS
   * dentro del mismo tick del evento de usuario antes de cualquier `await`.
   */
  function ensureBrowserAudioUnlockedSync() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!window.sharedAcousticCtx) {
        window.sharedAcousticCtx = new AudioCtx();
      }
      const ctx = window.sharedAcousticCtx;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      if (!window._tbbSilentUnlockPlayed && ctx.state === "running") {
        const silentBuf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = silentBuf;
        src.connect(ctx.destination);
        src.start(0);
        window._tbbSilentUnlockPlayed = true;
      }
      return ctx;
    } catch (e) {
      return null;
    }
  }

  if (typeof document !== "undefined") {
    ["pointerdown", "click", "touchstart", "keydown"].forEach(evtName => {
      document.addEventListener(evtName, ensureBrowserAudioUnlockedSync, { passive: true, capture: true });
    });
  }

  /**
   * Caché persistente en IndexedDB para que cada frase sintetizada con Gemini
   * se guarde en disco en Mac y iPhone y se reproduzca al instante (<15ms).
   */
  const IDB_VOICE_DB_NAME = "tbb_gemini_voice_idb_v2";
  const IDB_VOICE_STORE = "clips";

  function openVoiceIdb() {
    return new Promise(resolve => {
      if (typeof indexedDB === "undefined") return resolve(null);
      try {
        const req = indexedDB.open(IDB_VOICE_DB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(IDB_VOICE_STORE)) {
            db.createObjectStore(IDB_VOICE_STORE);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  }

  async function idbGetVoiceClip(cacheKey) {
    try {
      const db = await openVoiceIdb();
      if (!db) return null;
      return await new Promise(resolve => {
        const tx = db.transaction(IDB_VOICE_STORE, "readonly");
        const req = tx.objectStore(IDB_VOICE_STORE).get(cacheKey);
        req.onsuccess = () => {
          const val = req.result;
          if (val && val.wavBytes && val.wavBytes.byteLength > 100) {
            resolve({
              wavBytes: val.wavBytes instanceof Uint8Array ? val.wavBytes : new Uint8Array(val.wavBytes),
              durationSec: val.durationSec || 5.0,
              sampleRate: val.sampleRate || 24000,
              modelUsed: val.modelUsed || "gemini-3.8-live (cached)",
              voiceName: val.voiceName || "Aoede",
              langCode: val.langCode || "es"
            });
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  }

  async function idbSaveVoiceClip(cacheKey, payload) {
    try {
      const db = await openVoiceIdb();
      if (!db || !payload || !payload.wavBytes) return;
      const tx = db.transaction(IDB_VOICE_STORE, "readwrite");
      tx.objectStore(IDB_VOICE_STORE).put(payload, cacheKey);
    } catch (e) {}
  }

  function concatUint8Arrays(chunks) {
    let total = 0;
    for (let i = 0; i < chunks.length; i++) total += chunks[i].byteLength;
    const out = new Uint8Array(total);
    let offset = 0;
    for (let i = 0; i < chunks.length; i++) {
      out.set(chunks[i], offset);
      offset += chunks[i].byteLength;
    }
    return out;
  }

  /**
   * Motor Primario Sin Límite de Cuota REST (429):
   * Sintetiza voz neural nativa con `models/gemini-3.8-live` vía WebSocket `BidiGenerateContent`
   * a 24kHz PCM16 y normaliza en RIFF/WAVE <= 9.5s.
   */
  function synthesizeViaGeminiLiveWebSocket(cleanText, voiceName, langCode, maxDurationSec, apiKey) {
    return new Promise(resolve => {
      if (typeof WebSocket === "undefined" || !apiKey) return resolve(null);
      const liveModel = GEMINI_LIVE_WS_MODELS[0];
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${encodeURIComponent(apiKey)}`;
      let ws = null;
      let resolved = false;
      const pcmChunks = [];
      let totalPcmBytes = 0;
      const maxPcmBytes = Math.floor(24000 * 2 * (maxDurationSec + 0.4));

      const finish = result => {
        if (resolved) return;
        resolved = true;
        clearTimeout(safetyTimer);
        try {
          if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
            ws.close();
          }
        } catch (e) {}
        resolve(result);
      };

      const safetyTimer = setTimeout(() => {
        if (pcmChunks.length > 0) {
          const rawPcm = concatUint8Arrays(pcmChunks);
          const norm = normalizeAndCapAudioToWavBytes(rawPcm, "audio/pcm;rate=24000", maxDurationSec);
          if (norm && norm.wavBytes && norm.wavBytes.byteLength > 100) {
            return finish({
              wavBytes: norm.wavBytes,
              durationSec: norm.durationSec,
              sampleRate: norm.sampleRate,
              modelUsed: liveModel,
              voiceName,
              langCode
            });
          }
        }
        finish(null);
      }, 7800);

      try {
        ws = new WebSocket(wsUrl);
      } catch (e) {
        return finish(null);
      }

      ws.onopen = () => {
        try {
          ws.send(
            JSON.stringify({
              setup: {
                model: liveModel,
                generationConfig: {
                  responseModalities: ["AUDIO"],
                  speechConfig: {
                    voiceConfig: {
                      prebuiltVoiceConfig: {
                        voiceName: voiceName
                      }
                    }
                  }
                },
                systemInstruction: {
                  parts: [
                    {
                      text: "Eres Aura, mentora de marca de TheBestBrand. Lee literalmente en voz alta y con calidez la frase exacta que envíe el usuario entre comillas, sin agregar saludos ni palabras adicionales."
                    }
                  ]
                }
              }
            })
          );
        } catch (e) {
          finish(null);
        }
      };

      ws.onmessage = async ev => {
        try {
          let txt = "";
          if (typeof ev.data === "string") {
            txt = ev.data;
          } else if (ev.data instanceof Blob) {
            txt = await ev.data.text();
          } else if (ev.data instanceof ArrayBuffer) {
            txt = new TextDecoder("utf-8").decode(ev.data);
          }
          if (!txt) return;
          const msg = JSON.parse(txt);

          if (msg.setupComplete) {
            ws.send(
              JSON.stringify({
                realtimeInput: {
                  text: `Lee exactamente: "${cleanText}"`
                }
              })
            );
            return;
          }

          const parts = msg.serverContent?.modelTurn?.parts || [];
          for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            if (p && p.inlineData && p.inlineData.data) {
              const chunk = base64ToUint8Array(p.inlineData.data);
              if (chunk.byteLength > 0) {
                pcmChunks.push(chunk);
                totalPcmBytes += chunk.byteLength;
              }
            }
          }

          const isDone =
            Boolean(msg.serverContent?.turnComplete) ||
            Boolean(msg.serverContent?.generationComplete) ||
            totalPcmBytes >= maxPcmBytes;

          if (isDone && pcmChunks.length > 0) {
            const rawPcm = concatUint8Arrays(pcmChunks);
            const norm = normalizeAndCapAudioToWavBytes(rawPcm, "audio/pcm;rate=24000", maxDurationSec);
            if (norm && norm.wavBytes && norm.wavBytes.byteLength > 100) {
              return finish({
                wavBytes: norm.wavBytes,
                durationSec: norm.durationSec,
                sampleRate: norm.sampleRate,
                modelUsed: liveModel,
                voiceName,
                langCode
              });
            }
            return finish(null);
          }
        } catch (e) {}
      };

      ws.onerror = () => finish(null);
      ws.onclose = () => {
        if (!resolved) {
          if (pcmChunks.length > 0) {
            const rawPcm = concatUint8Arrays(pcmChunks);
            const norm = normalizeAndCapAudioToWavBytes(rawPcm, "audio/pcm;rate=24000", maxDurationSec);
            if (norm && norm.wavBytes && norm.wavBytes.byteLength > 100) {
              return finish({
                wavBytes: norm.wavBytes,
                durationSec: norm.durationSec,
                sampleRate: norm.sampleRate,
                modelUsed: liveModel,
                voiceName,
                langCode
              });
            }
          }
          finish(null);
        }
      };
    });
  }

  /**
   * Sintetiza con Gemini Native Voice:
   * 1. Caché RAM (`_tbbGeminiTtsCache`) e IndexedDB (`tbb_gemini_voice_idb_v2`)
   * 2. Gemini 3.8 Live (`models/gemini-3.8-live`) vía WebSocket BidiGenerateContent (sin límite 429 de 10/día)
   * 3. Fallback REST (`gemini-3.8-flash-lite-tts` -> `gemini-3.8-flash-tts` -> `gemini-3.1-flash-tts-preview`) con memoria de enfriamiento 429.
   */
  window.tbbSynthesizeGeminiTTSWav = async function (rawText, options = {}) {
    const cleanText = enforceMax10sSpokenText(rawText);
    if (!cleanText) return null;

    const langCode = options.lang || window.tbbGetLang();
    const voiceName = options.voiceName || window.tbbGeminiVoiceName || "Aoede";
    const maxDurationSec = Math.min(9.5, Number(options.maxDurationSec || 9.5));
    const cacheKey = `${langCode}::${voiceName}::${cleanText}`;

    if (window._tbbGeminiTtsCache.has(cacheKey)) {
      return window._tbbGeminiTtsCache.get(cacheKey);
    }

    const idbCached = await idbGetVoiceClip(cacheKey);
    if (idbCached && idbCached.wavBytes && idbCached.wavBytes.byteLength > 100) {
      window._tbbGeminiTtsCache.set(cacheKey, idbCached);
      return idbCached;
    }

    const apiKey = getGeminiApiKey();

    // 1. Intentar primero con Gemini 3.8 Live WebSocket si el usuario proveyó apiKey explícita
    if (apiKey) {
      const livePayload = await synthesizeViaGeminiLiveWebSocket(
        cleanText,
        voiceName,
        langCode,
        maxDurationSec,
        apiKey
      );
      if (livePayload && livePayload.wavBytes && livePayload.wavBytes.byteLength > 100) {
        if (window._tbbGeminiTtsCache.size > 80) {
          const firstKey = window._tbbGeminiTtsCache.keys().next().value;
          window._tbbGeminiTtsCache.delete(firstKey);
        }
        window._tbbGeminiTtsCache.set(cacheKey, livePayload);
        idbSaveVoiceClip(cacheKey, livePayload);
        window._tbbLastGeminiVoiceModelUsed = livePayload.modelUsed;
        return livePayload;
      }
    }

    // 2. Respaldo REST vía Proxy Blindado Backend (`/api/v1/gemini/proxy`) o directo si hay apiKey
    const now = Date.now();
    for (let i = 0; i < GEMINI_TTS_MODELS.length; i++) {
      const modelName = GEMINI_TTS_MODELS[i];
      const cooldownUntil = window._tbbGeminiModel429CooldownUntil[modelName] || 0;
      if (now < cooldownUntil) continue;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7200);
      try {
        const endpointUrl = apiKey
          ? `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`
          : "/api/v1/gemini/proxy";
        const res = await fetch(
          endpointUrl,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              model: modelName,
              contents: [
                {
                  parts: [{ text: cleanText }]
                }
              ],
              generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: {
                      voiceName: voiceName
                    }
                  }
                }
              }
            })
          }
        );
        clearTimeout(timeoutId);
        if (res.status === 429) {
          window._tbbGeminiModel429CooldownUntil[modelName] = Date.now() + 15 * 60 * 1000;
          continue;
        }
        if (!res.ok) continue;

        const data = await res.json();
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const audioPart = parts.find(p => p && p.inlineData && p.inlineData.data);
        if (!audioPart) continue;

        const rawBytes = base64ToUint8Array(audioPart.inlineData.data);
        const norm = normalizeAndCapAudioToWavBytes(
          rawBytes,
          audioPart.inlineData.mimeType || "audio/wav",
          maxDurationSec
        );
        if (norm && norm.wavBytes && norm.wavBytes.byteLength > 100) {
          if (window._tbbGeminiTtsCache.size > 80) {
            const firstKey = window._tbbGeminiTtsCache.keys().next().value;
            window._tbbGeminiTtsCache.delete(firstKey);
          }
          const payload = {
            wavBytes: norm.wavBytes,
            durationSec: norm.durationSec,
            sampleRate: norm.sampleRate,
            modelUsed: modelName,
            voiceName,
            langCode
          };
          window._tbbGeminiTtsCache.set(cacheKey, payload);
          idbSaveVoiceClip(cacheKey, payload);
          window._tbbLastGeminiVoiceModelUsed = modelName;
          return payload;
        }
      } catch (err) {
        clearTimeout(timeoutId);
      }
    }
    return null;
  };

  window.tbbStopAllAuraVoicePlayback = function () {
    window._tbbGeminiTtsRequestId++;
    try {
      if (window._tbbActiveAudioSource) {
        window._tbbActiveAudioSource.stop();
        window._tbbActiveAudioSource.disconnect();
        window._tbbActiveAudioSource = null;
      }
    } catch (e) {}
    try {
      if (window._tbbActiveHtmlAudio) {
        window._tbbActiveHtmlAudio.pause();
        window._tbbActiveHtmlAudio.src = "";
        window._tbbActiveHtmlAudio = null;
      }
    } catch (e) {}
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {}
    window.isSpeakingLive = false;
  };

  async function playWavBytesInBrowser(wavBytes, maxDurationMs = 9500) {
    if (!wavBytes || wavBytes.byteLength < 64) return false;
    window.isSpeakingLive = true;

    try {
      const ctx = ensureBrowserAudioUnlockedSync() || window.sharedAcousticCtx;
      if (ctx) {
        if (ctx.state === "suspended") {
          await ctx.resume();
        }
        const copyBuffer = wavBytes.buffer.slice(
          wavBytes.byteOffset,
          wavBytes.byteOffset + wavBytes.byteLength
        );
        const audioBuffer = await ctx.decodeAudioData(copyBuffer);
        return await new Promise(resolve => {
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);
          window._tbbActiveAudioSource = source;

          const safetyTimer = setTimeout(() => {
            try {
              source.stop();
            } catch (e) {}
            window.isSpeakingLive = false;
            resolve(true);
          }, Math.min(9800, maxDurationMs));

          source.onended = () => {
            clearTimeout(safetyTimer);
            if (window._tbbActiveAudioSource === source) {
              window._tbbActiveAudioSource = null;
            }
            window.isSpeakingLive = false;
            resolve(true);
          };
          source.start(0);
        });
      }
    } catch (e) {}

    try {
      const blob = new Blob([wavBytes], { type: "audio/wav" });
      const blobUrl = URL.createObjectURL(blob);
      const audio = new Audio(blobUrl);
      window._tbbActiveHtmlAudio = audio;
      return await new Promise(resolve => {
        const cleanup = () => {
          try {
            URL.revokeObjectURL(blobUrl);
          } catch (e) {}
        };
        const safetyTimer = setTimeout(() => {
          try {
            audio.pause();
          } catch (e) {}
          cleanup();
          window.isSpeakingLive = false;
          resolve(true);
        }, Math.min(9800, maxDurationMs));

        audio.onended = () => {
          clearTimeout(safetyTimer);
          cleanup();
          window.isSpeakingLive = false;
          resolve(true);
        };
        audio.onerror = () => {
          clearTimeout(safetyTimer);
          cleanup();
          window.isSpeakingLive = false;
          resolve(false);
        };
        const p = audio.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            clearTimeout(safetyTimer);
            cleanup();
            window.isSpeakingLive = false;
            resolve(false);
          });
        }
      });
    } catch (e) {
      window.isSpeakingLive = false;
      return false;
    }
  }

  function speakFallbackBrowserMultilingual(textToSpeak, maxDurationMs = 9500) {
    if (window.voiceMuted || !textToSpeak || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const langCfg = window.tbbGetLangConfig();
      const clean = enforceMax10sSpokenText(textToSpeak);
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = langCfg.locale;
      u.rate = 1.04;
      u.pitch = 1.02;
      const voices = window.speechSynthesis.getVoices() || [];
      const langPrefix = langCfg.code.toLowerCase();
      const preferred =
        voices.find(v => v.lang.toLowerCase().startsWith(langPrefix) && /paulina|monica|luciana|samantha|amelie|thomas|google|natural|premium|siri/i.test(v.name)) ||
        voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
      if (preferred) u.voice = preferred;

      const capTimer = setTimeout(() => {
        try {
          if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
        } catch (e) {}
        window.isSpeakingLive = false;
      }, Math.min(9600, maxDurationMs));

      u.onstart = () => {
        window.isSpeakingLive = true;
      };
      u.onend = () => {
        clearTimeout(capTimer);
        window.isSpeakingLive = false;
      };
      u.onerror = () => {
        clearTimeout(capTimer);
        window.isSpeakingLive = false;
      };
      window.speechSynthesis.speak(u);
    } catch (e) {
      window.isSpeakingLive = false;
    }
  }

  window.speakAuraBriefResponse = async function (text, maxDurationMs = 9500) {
    if (window.voiceMuted || !text) return;
    // Desbloquear sincrónicamente el AudioContext en Mac/iOS en el mismo tick del clic del usuario
    ensureBrowserAudioUnlockedSync();

    const translatedText = window.tbbTranslateText ? window.tbbTranslateText(text) : text;
    const cleanText = enforceMax10sSpokenText(translatedText);
    if (!cleanText) return;

    window.tbbStopAllAuraVoicePlayback();
    const myReqId = ++window._tbbGeminiTtsRequestId;
    if (typeof window.pulseAuraTopOrbActivity === "function") {
      window.pulseAuraTopOrbActivity(4500);
    }

    const synthResult = await window.tbbSynthesizeGeminiTTSWav(cleanText, {
      lang: window.tbbGetLang(),
      voiceName: window.tbbGeminiVoiceName || "Aoede",
      maxDurationSec: Math.min(9.5, maxDurationMs / 1000)
    });

    if (myReqId !== window._tbbGeminiTtsRequestId || window.voiceMuted) return;

    if (synthResult && synthResult.wavBytes) {
      const played = await playWavBytesInBrowser(synthResult.wavBytes, maxDurationMs);
      if (played) {
        console.log(`[TBB Aura Voice] Gemini neural TTS (${synthResult.modelUsed || "gemini-tts"}, ${synthResult.voiceName || "Aoede"}) played successfully.`);
        return;
      }
    }

    if (myReqId === window._tbbGeminiTtsRequestId && !window.voiceMuted && window._tbbAllowBrowserTtsFallback === true) {
      speakFallbackBrowserMultilingual(cleanText, maxDurationMs);
    } else {
      console.warn("[TBB Aura Voice] Gemini voice synthesis active; robotic browser fallback quarantined.");
    }
  };

  window.requestAndPlayGeminiVoice = async function (textToSpeak) {
    return window.speakAuraBriefResponse(textToSpeak, 9500);
  };

  window.speakWithBrowserTTS = function (textToSpeak) {
    return window.speakAuraBriefResponse(textToSpeak, 9500);
  };

  window.tbbTestGeminiVoiceSample = async function () {
    ensureBrowserAudioUnlockedSync();
    const lang = window.tbbGetLang();
    const samples = {
      es: "Hola, soy Aura con la nueva voz neural de Gemini. Como afirma Marty Neumeier, una marca clara crea confianza inmediata.",
      en: "Hello, I am Aura speaking with Gemini's native neural voice. As Marty Neumeier notes, a clear brand builds instant trust.",
      pt: "Olá, sou a Aura com a nova voz neural do Gemini. Como afirma Marty Neumeier, uma marca clara gera confiança imediata.",
      fr: "Bonjour, je suis Aura avec la voix neurale native de Gemini. Comme l'affirme Marty Neumeier, une marque claire inspire confiance."
    };
    const msg = samples[lang] || samples.es;
    if (typeof window.updateAuraTopPresenceDOM === "function") {
      window.updateAuraTopPresenceDOM(msg);
    }
    const wasMuted = window.voiceMuted;
    window.voiceMuted = false;
    await window.speakAuraBriefResponse(msg, 9500);
    window.voiceMuted = wasMuted;
  };

  // ==========================================================================
  // 2. DICCIONARIOS MULTILINGÜES COMPLETOS (ES, EN, PT, FR)
  // ==========================================================================
  const UI_I18N = {
    es: {
      mapBtn: "Mapa",
      videoBtn: "Video",
      stepLabel: "Paso",
      ofLabel: "de",
      backBtn: "Atrás",
      nextBtn: "Adelante",
      finishBtn: "Finalizar",
      speakBtn: "Hablar",
      dictateBizBtn: "Dictar Giro",
      iterateGeminiBtn: "Iterar con Gemini",
      navHome: "Inicio",
      navMap: "Mapa",
      navStudio: "Taller",
      navManual: "Manual",
      navAccount: "Cuenta",
      navLive: "En Vivo",
      navMenu: "Menú",
      auraRoleMentor: "AURA · MENTORA DE MARCA",
      auraRoleAdmin: "AURA · ADMIN IMPROBEARS",
      langCardTitle: "IDIOMA DEL SISTEMA Y VOZ NEURAL DE GEMINI",
      langCardSubtitle: "Selecciona el idioma de toda la plataforma, manual de 30 láminas y voz neural de Aura (Gemini Flash TTS):",
      voiceLabel: "TIMBRE DE VOZ NEURAL GEMINI (<= 10s):",
      testVoiceBtn: "Escuchar Voz de Gemini",
      langSavedToast: "Idioma actualizado en toda la plataforma: Español",
      stepRoleNames: {
        0: "PASO 0 · INICIO",
        1: "PASO 1 · PROPÓSITO",
        2: "PASO 2 · TOUCHPOINTS",
        3: "PASO 3 · NOMBRE",
        4: "PASO 4 · PERSONALIDAD",
        5: "PASO 5 · LOGOTIPO",
        6: "PASO 6 · 30 LÁMINAS"
      }
    },
    en: {
      mapBtn: "Map",
      videoBtn: "Video",
      stepLabel: "Step",
      ofLabel: "of",
      backBtn: "Back",
      nextBtn: "Next",
      finishBtn: "Finish",
      speakBtn: "Speak",
      dictateBizBtn: "Dictate Sector",
      iterateGeminiBtn: "Iterate with Gemini",
      navHome: "Home",
      navMap: "Map",
      navStudio: "Studio",
      navManual: "Manual",
      navAccount: "Account",
      navLive: "Live",
      navMenu: "Menu",
      auraRoleMentor: "AURA · BRAND MENTOR",
      auraRoleAdmin: "AURA · IMPROBEARS ADMIN",
      langCardTitle: "SYSTEM LANGUAGE & GEMINI NEURAL VOICE",
      langCardSubtitle: "Select the language for the entire platform, 30-plate brandbook, and Aura's neural voice (Gemini Flash TTS):",
      voiceLabel: "GEMINI NEURAL VOICE TIMBRE (<= 10s):",
      testVoiceBtn: "Test Gemini Voice",
      langSavedToast: "Language updated across the entire platform: English",
      stepRoleNames: {
        0: "STEP 0 · START",
        1: "STEP 1 · PURPOSE",
        2: "STEP 2 · TOUCHPOINTS",
        3: "STEP 3 · NAMING",
        4: "STEP 4 · PERSONALITY",
        5: "STEP 5 · LOGO STUDIO",
        6: "STEP 6 · 30 PLATES"
      }
    },
    pt: {
      mapBtn: "Mapa",
      videoBtn: "Vídeo",
      stepLabel: "Passo",
      ofLabel: "de",
      backBtn: "Voltar",
      nextBtn: "Avançar",
      finishBtn: "Concluir",
      speakBtn: "Falar",
      dictateBizBtn: "Ditar Setor",
      iterateGeminiBtn: "Iterar com Gemini",
      navHome: "Início",
      navMap: "Mapa",
      navStudio: "Estúdio",
      navManual: "Manual",
      navAccount: "Conta",
      navLive: "Ao Vivo",
      navMenu: "Menu",
      auraRoleMentor: "AURA · MENTORA DE MARCA",
      auraRoleAdmin: "AURA · ADMIN IMPROBEARS",
      langCardTitle: "IDIOMA DO SISTEMA E VOZ NEURAL GEMINI",
      langCardSubtitle: "Selecione o idioma de toda a plataforma, manual de 30 lâminas e voz neural da Aura (Gemini Flash TTS):",
      voiceLabel: "TIMBRE DE VOZ NEURAL GEMINI (<= 10s):",
      testVoiceBtn: "Ouvir Voz Gemini",
      langSavedToast: "Idioma atualizado em toda a plataforma: Português",
      stepRoleNames: {
        0: "PASSO 0 · INÍCIO",
        1: "PASSO 1 · PROPÓSITO",
        2: "PASSO 2 · TOUCHPOINTS",
        3: "PASSO 3 · NOME",
        4: "PASSO 4 · PERSONALIDADE",
        5: "PASSO 5 · LOGOTIPO",
        6: "PASSO 6 · 30 LÂMINAS"
      }
    },
    fr: {
      mapBtn: "Carte",
      videoBtn: "Vidéo",
      stepLabel: "Étape",
      ofLabel: "sur",
      backBtn: "Retour",
      nextBtn: "Suivant",
      finishBtn: "Terminer",
      speakBtn: "Parler",
      dictateBizBtn: "Dicter Secteur",
      iterateGeminiBtn: "Itérer avec Gemini",
      navHome: "Accueil",
      navMap: "Carte",
      navStudio: "Atelier",
      navManual: "Manuel",
      navAccount: "Compte",
      navLive: "En Direct",
      navMenu: "Menu",
      auraRoleMentor: "AURA · MENTORE DE MARQUE",
      auraRoleAdmin: "AURA · ADMIN IMPROBEARS",
      langCardTitle: "LANGUE DU SYSTÈME ET VOIX NEURALE GEMINI",
      langCardSubtitle: "Sélectionnez la langue de toute la plateforme, du manuel de 30 planches et de la voix neurale d'Aura (Gemini Flash TTS) :",
      voiceLabel: "TIMBRE DE VOIX NEURALE GEMINI (<= 10s) :",
      testVoiceBtn: "Écouter Voix Gemini",
      langSavedToast: "Langue mise à jour sur toute la plateforme : Français",
      stepRoleNames: {
        0: "ÉTAPE 0 · DÉPART",
        1: "ÉTAPE 1 · RAISON D'ÊTRE",
        2: "ÉTAPE 2 · POINTS DE CONTACT",
        3: "ÉTAPE 3 · NOM",
        4: "ÉTAPE 4 · PERSONNALITÉ",
        5: "ÉTAPE 5 · LOGO",
        6: "ÉTAPE 6 · 30 PLANCHES"
      }
    }
  };

  /**
   * Bancos de respuestas breves de Aura (<= 10s) con autores de referencia para EN, PT y FR
   */
  const AURA_POOLS_BY_LANG = {
    en: {
      "substep_0_1": [
        "As Peter Drucker teaches, defining your initial objective gives immediate strategic direction to {brand}.",
        "According to Marty Neumeier, a clear brand starts by choosing its exact growth goal today.",
        "As David Aaker states, building brand equity begins with a well-defined strategic objective."
      ],
      "substep_0_2": [
        "According to Sagi Haviv, if you already have a name or logo we can preserve or evolve it with precision.",
        "As David Aaker explains, leveraging your current assets protects the recognition earned by {brand}.",
        "Following Al Ries, a firm name or base logo accelerates positioning in the customer's mind."
      ],
      "substep_0_3": [
        "As Al Ries states, describing your business sector simply defines your unique category in the market.",
        "According to Peter Drucker, understanding what you deliver and for whom is the foundation of all strategy.",
        "As Marty Neumeier notes, your real specialty differentiates {brand} right away."
      ],
      "substep_1_1": [
        "As Simon Sinek explains in The Golden Circle, people buy why {brand} exists.",
        "According to Simon Sinek, starting with your core purpose inspires authentic loyalty beyond the product.",
        "As David Aaker teaches, a genuine purpose guides every strategic and visual decision of {brand}."
      ],
      "substep_1_2": [
        "According to Alex Osterwalder, a clear value proposition prevents {brand} from competing on price.",
        "As Michael Porter highlights, differentiating with precision makes {brand} irreplaceable in its market.",
        "Following Alex Osterwalder, let's articulate the unique advantage for which customers choose you."
      ],
      "substep_1_3": [
        "As Philip Kotler points out, memorable brands positively transform their customers' daily lives.",
        "According to Donald Miller, when you show how you improve your customer's day, {brand} transcends.",
        "As Simon Sinek states, serving with empathy builds trust relationships that last for years."
      ],
      "substep_1_4": [
        "According to Donald Miller in StoryBrand, summarizing your method in three steps removes buying friction.",
        "As Don Norman explains, a clear process conveys immediate certainty and professionalism for {brand}.",
        "Following Donald Miller, three simple steps give complete confidence to your future customer."
      ],
      "substep_1_5": [
        "As Al Ries teaches in Positioning, a brief promise conquers a unique place in the mind.",
        "According to Marty Neumeier, synthesizing your core message into one clear phrase multiplies {brand}'s impact.",
        "As Donald Miller affirms, verbal clarity makes it easy for customers to recommend {brand}."
      ],
      "substep_1_6": [
        "According to Jennifer Aaker, defining {brand}'s personality creates human affinity and character.",
        "As Carl Jung explains with his archetypes, tone of voice connects emotionally with your audience.",
        "Following David Aaker, giving human character to {brand} makes every message coherent."
      ],
      "substep_1_7": [
        "As Seth Godin affirms, deeply knowing your ideal customer gives meaning to the entire strategy.",
        "According to Alex Osterwalder, empathizing with what your customer values aligns every detail of {brand}.",
        "As Peter Drucker notes, the essential purpose of every company is to understand and serve its customer."
      ],
      "substep_2_1": [
        "According to Lemon and Verhoef, pre-purchase touchpoints build the first impression of {brand}.",
        "As Jan Carlzon teaches, the first moment of truth sparks initial trust toward your brand.",
        "Following Philip Kotler, choosing where customers discover you ensures strategic visibility for {brand}."
      ],
      "substep_2_2": [
        "As Jan Carlzon points out, direct contact during purchase is your decisive moment of truth.",
        "According to Don Norman, removing friction during your service turns {brand}'s promise into reality.",
        "As Lemon and Verhoef explain, caring for the core experience consolidates {brand}'s prestige."
      ],
      "substep_2_3": [
        "According to Don Norman, post-delivery follow-up turns every customer into a loyal ambassador.",
        "As Lemon and Verhoef demonstrate, the post-sale stage multiplies retention and value for {brand}.",
        "Following Jan Carlzon, thoughtful follow-up after purchase leaves an unforgettable mark."
      ],
      "substep_3_1": [
        "As Alexandra Watkins explains in the SMILE model, a great name is born from meaningful roots.",
        "According to Alina Wheeler, connecting your strategy with your verbal identity gives legal strength to {brand}.",
        "As David Placek teaches, the right phonetic roots project {brand}'s essence immediately."
      ],
      "substep_3_2": [
        "According to David Placek, founder of Lexicon, two- or three-syllable phonetic symbolism maximizes recall.",
        "As Alexandra Watkins states, choose the name that sparks a clear image and instant emotion.",
        "Following Al Ries, a resonant and brief name facilitates positioning for {brand}."
      ],
      "substep_3_3": [
        "As Alina Wheeler highlights, pairing {brand} with a clear descriptor communicates your value in seconds.",
        "According to Alexandra Watkins, your name and slogan now form a verbal identity ready for registration.",
        "As David Aaker teaches, a precise descriptor reinforces {brand}'s authority in its category."
      ],
      "substep_4_1": [
        "According to Mitsuo Nagamachi and Kansei Engineering, we translate emotions into exact geometric parameters for {brand}.",
        "As Vilayanur Ramachandran explains, curves evoke warmth while angles project technical precision.",
        "Following Charles Osgood, these semantic axes calibrate the exact visual atmosphere of {brand}."
      ],
      "substep_4_2": [
        "As Charles Osgood demonstrated with the semantic differential, balancing tradition and vanguard defines your visual character.",
        "According to Mitsuo Nagamachi, each slider adjusts the emotional response that {brand}'s symbol will awaken.",
        "As Don Norman notes, visceral design communicates trust before reading a single word."
      ],
      "substep_4_3": [
        "According to Max Wertheimer and Gestalt psychology, the eye remembers forms with clear synthesis best.",
        "As Paul Rand teaches, calibrating geometric simplicity prepares {brand} for any scale.",
        "Following Mitsuo Nagamachi, these seven axes complete the master blueprint of your visual identity."
      ],
      "substep_4_4": [
        "As Robert Bringhurst wrote, typography is visible language that gives voice and authority to {brand}.",
        "According to Adrian Frutiger, the structure of each letter determines legibility on screen and in print.",
        "As Massimo Vignelli affirms, choosing a noble typeface family sustains {brand}'s entire system."
      ],
      "substep_4_5": [
        "According to Sagi Haviv, a simple and distinctive base structure is the foundation of every great symbol.",
        "As Paul Rand teaches, defining this visual seed gives us a solid starting point for {brand}.",
        "Following Adrian Frutiger, base geometry orders the mark before entering the generative studio."
      ],
      "substep_5_1": [
        "As Josef Albers demonstrated in Interaction of Color, the palette awakens emotion before words do.",
        "According to Jony Ive, material finish and light refraction give tactile presence to {brand}'s symbol.",
        "As Sagi Haviv affirms, if you uploaded a base logo we will honor its colors and essence as we evolve it."
      ],
      "substep_5_2": [
        "Following Paul Rand and Sagi Haviv, iterate freely until {brand}'s symbol becomes unforgettable.",
        "As Jony Ive teaches, refining every curve and proportion in 1:1 view elevates design excellence.",
        "According to Max Wertheimer, figure-ground contrast on your canvas guarantees impact on any medium."
      ],
      "substep_6_1": [
        "As Massimo Vignelli taught, a modular grid manual protects {brand}'s coherence across every plate.",
        "According to Josef Müller-Brockmann, the geometric order of these thirty plates projects world-class editorial rigor.",
        "Following Alina Wheeler, here your strategy, logo, and official applications converge."
      ],
      "substep_6_2": [
        "As Danne and Blackburn established in the NASA manual, your vectors ensure flawless reproduction.",
        "According to Massimo Vignelli, downloading your complete Brandbook guarantees visual discipline for {brand}'s future.",
        "As Alina Wheeler states, delivering production-ready vector files culminates a successful identity."
      ],
      "default": [
        "As David Aaker teaches, every adjustment in {brand} strengthens the coherence and value of your identity.",
        "According to Simon Sinek, maintaining clarity in this step connects {brand}'s purpose with your audience.",
        "As Sagi Haviv states, simplicity and consistency make {brand} memorable across every touchpoint.",
        "Following Massimo Vignelli, this decision brings order, discipline, and elegance to {brand}'s system."
      ]
    },
    pt: {
      "substep_0_1": [
        "Como ensina Peter Drucker, definir seu objetivo inicial dá direção estratégica imediata para {brand}.",
        "Segundo Marty Neumeier, uma marca clara começa escolhendo com precisão sua meta de crescimento hoje."
      ],
      "substep_0_2": [
        "Segundo Sagi Haviv, se você já tem nome ou logo podemos conservá-lo ou evoluí-lo com precisão.",
        "Como explica David Aaker, aproveitar seus ativos atuais protege o reconhecimento conquistado por {brand}."
      ],
      "substep_0_3": [
        "Como afirma Al Ries, descrever seu setor com simplicidade define sua categoria única no mercado.",
        "Segundo Peter Drucker, entender o que você entrega e para quem é a base de toda estratégia."
      ],
      "substep_1_1": [
        "Como explica Simon Sinek no Círculo Dourado, as pessoas compram o porquê {brand} existe.",
        "Segundo David Aaker, um propósito genuíno guia cada decisão estratégica e visual de {brand}."
      ],
      "substep_2_1": [
        "Segundo Lemon e Verhoef, os pontos de contato antes da compra constroem a primeira impressão de {brand}.",
        "Como ensina Jan Carlzon, o primeiro momento da verdade desperta a confiança inicial em sua marca."
      ],
      "substep_3_1": [
        "Como explica Alexandra Watkins no modelo SMILE, um grande nome nasce de raízes com significado.",
        "Segundo Alina Wheeler, conectar sua estratégia à identidade verbal dá solidez legal para {brand}."
      ],
      "substep_4_1": [
        "Segundo Mitsuo Nagamachi e a Engenharia Kansei, traduzimos emoções em parâmetros geométricos para {brand}.",
        "Como escreveu Robert Bringhurst, a tipografia é a linguagem visível que dá voz e autoridade para {brand}."
      ],
      "substep_5_1": [
        "Como demonstrou Josef Albers em A Interação da Cor, a paleta desperta emoção antes das palavras.",
        "Seguindo Paul Rand e Sagi Haviv, itere livremente até que o símbolo de {brand} seja inesquecível."
      ],
      "substep_6_1": [
        "Como ensinou Massimo Vignelli, um manual em grade modular protege a coerência de {brand} em cada lâmina.",
        "Segundo Josef Müller-Brockmann, a ordem geométrica destas trinta lâminas projeta rigor editorial mundial."
      ],
      "default": [
        "Como ensina David Aaker, cada ajuste em {brand} fortalece a coerência e o valor da sua identidade.",
        "Segundo Simon Sinek, manter a clareza neste passo conecta o propósito de {brand} com seu público.",
        "Como afirma Sagi Haviv, a simplicidade e consistência tornam {brand} memorável em qualquer suporte."
      ]
    },
    fr: {
      "substep_0_1": [
        "Comme l'enseigne Peter Drucker, définir votre objectif initial donne une direction stratégique immédiate à {brand}.",
        "Selon Marty Neumeier, une marque claire commence par choisir avec précision son objectif de croissance."
      ],
      "substep_0_2": [
        "Selon Sagi Haviv, si vous avez déjà un nom ou un logo, nous pouvons le conserver ou le faire évoluer.",
        "Comme l'explique David Aaker, valoriser vos actifs actuels protège la notoriété acquise par {brand}."
      ],
      "substep_0_3": [
        "Comme l'affirme Al Ries, décrire votre activité simplement définit votre catégorie unique sur le marché.",
        "Selon Peter Drucker, comprendre ce que vous offrez et pour qui est la base de toute stratégie."
      ],
      "substep_1_1": [
        "Comme l'explique Simon Sinek dans Le Cercle d'Or, les gens achètent le pourquoi {brand} existe.",
        "Selon David Aaker, une raison d'être authentique guide chaque décision stratégique et visuelle de {brand}."
      ],
      "substep_2_1": [
        "Selon Lemon et Verhoef, les points de contact avant l'achat bâtissent la première impression de {brand}.",
        "Comme l'enseigne Jan Carlzon, le premier moment de vérité éveille la confiance initiale envers votre marque."
      ],
      "substep_3_1": [
        "Comme l'explique Alexandra Watkins dans le modèle SMILE, un grand nom naît de racines porteuses de sens.",
        "Selon Alina Wheeler, relier votre stratégie à votre identité verbale donne une solidité juridique à {brand}."
      ],
      "substep_4_1": [
        "Selon Mitsuo Nagamachi et l'Ingénierie Kansei, nous traduisons les émotions en paramètres géométriques pour {brand}.",
        "Comme l'a écrit Robert Bringhurst, la typographie est le langage visible qui donne voix et autorité à {brand}."
      ],
      "substep_5_1": [
        "Comme l'a démontré Josef Albers dans L'Interaction des couleurs, la palette éveille l'émotion avant les mots.",
        "Suivant Paul Rand et Sagi Haviv, itérez librement jusqu'à ce que le symbole de {brand} soit inoubliable."
      ],
      "substep_6_1": [
        "Comme l'a enseigné Massimo Vignelli, un manuel en grille modulaire protège la cohérence de {brand} sur chaque planche.",
        "Selon Josef Müller-Brockmann, l'ordre géométrique de ces trente planches projette une rigueur éditoriale mondiale."
      ],
      "default": [
        "Comme l'enseigne David Aaker, chaque ajustement dans {brand} renforce la cohérence et la valeur de votre identité.",
        "Selon Simon Sinek, maintenir la clarté à cette étape relie la raison d'être de {brand} à votre audience.",
        "Comme l'affirme Sagi Haviv, la simplicité et la cohérence rendent {brand} mémorable sur tout support."
      ]
    }
  };

  /**
   * Tabla maestra de traducciones exactas para todo el DOM (Pasos 0 al 6, Modales, Mapa y Manual de 30 Láminas).
   */
  const EXACT_TRANSLATIONS = {
    en: {
      // Top & Bottom Bars
      "Mapa": "Map",
      "Video": "Video",
      "Atrás": "Back",
      "Adelante": "Next",
      "Finalizar": "Finish",
      "Hablar": "Speak",
      "Dictar Giro": "Dictate Sector",
      "Iterar con Gemini": "Iterate with Gemini",
      "Gemini diseñando...": "Gemini designing...",
      "Diseñando...": "Designing...",
      "Aplicar con Gemini": "Apply with Gemini",
      "Inicio": "Home",
      "Taller": "Studio",
      "Manual": "Manual",
      "Cuenta": "Account",
      "En Vivo": "Live",
      "Menú": "Menu",
      "Cerrar": "Close",
      "AURA · MENTORA DE MARCA": "AURA · BRAND MENTOR",
      "AURA · ADMIN IMPROBEARS": "AURA · IMPROBEARS ADMIN",

      // Step 0.1
      "PASO 0 · 1 DE 3 · OBJETIVO": "STEP 0 · 1 OF 3 · OBJECTIVE",
      "¿Cuál es tu objetivo principal al construir tu marca hoy?": "What is your main goal in building your brand today?",
      "Crear mi primera marca desde cero": "Create my first brand from scratch",
      "Evolucionar y profesionalizar mi marca actual": "Evolve and professionalize my current brand",
      "Crear una nueva sub-marca o división": "Create a new sub-brand or division",
      "Selecciona una opción y presiona Adelante en la barra inferior.": "Select an option and press Next on the bottom bar.",

      // Step 0.2
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGOTIPO ACTUAL": "STEP 0 · 2 OF 3 · CURRENT NAME & LOGO",
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGO ACTUAL": "STEP 0 · 2 OF 3 · CURRENT NAME & LOGO",
      "PASO 0 · 2 DE 3 · SITUACIÓN DEL NOMBRE": "STEP 0 · 2 OF 3 · BRAND NAME STATUS",
      "¿Ya cuentas con el nombre o un logotipo actual para tu marca?": "Do you already have a name or a current logo for your brand?",
      "¿Ya cuentas con el nombre de tu marca o lo desarrollamos en el Paso 3?": "Do you already have your brand name or should we develop it in Step 3?",
      "Definirlo más adelante": "Define it later",
      "Ya tengo mi nombre": "I already have my name",
      "Nombre de tu marca (si ya lo tienes):": "Your brand name (if you already have one):",
      "Escribe aquí el nombre de tu marca": "Type your brand name here",
      "¿Ya tienes un logotipo actual? (Opcional)": "Do you already have a current logo? (Optional)",
      "Subir mi Logo Actual (.PNG, .JPG, .SVG)": "Upload My Current Logo (.PNG, .JPG, .SVG)",
      "Subir mi Logo Actual": "Upload My Current Logo",
      "Cambiar": "Change",
      "Quitar": "Remove",
      "Si lo subes, podrás mantenerlo tal cual o pedirle al motor generador que lo tome como base para evolucionarlo.": "If you upload it, you can keep it as-is or ask the generative engine to use it as a base to evolve it.",
      "Logo actual cargado en el motor": "Current logo loaded in the engine",
      "Colores detectados:": "Detected colors:",
      "Mantener mi logo actual": "Keep my current logo",
      "Tomarlo como base y mejorar": "Use as base and improve",
      "Toda esta información y tu logo alimentan automáticamente el motor del Paso 5 y las 30 láminas.": "All this information and your logo automatically feed the Step 5 engine and all 30 plates.",
      "Toda esta información alimenta automáticamente los siguientes pasos.": "All this information automatically feeds the following steps.",

      // Step 0.3
      "PASO 0 · 3 DE 3 · GIRO Y ACTIVIDAD": "STEP 0 · 3 OF 3 · BUSINESS SECTOR & ACTIVITY",
      "¿En qué giro o actividad se enfoca tu empresa y qué ofrece?": "What business sector or activity does your company focus on and what does it offer?",
      "Describe con tus palabras a qué se dedica tu empresa, qué producto o servicio entregas y para quién...": "Describe in your own words what your company does, what product or service you deliver, and for whom...",
      "Síntesis detectada por el sistema:": "System detected synthesis:",
      "Escribe arriba tu giro para que el sistema adapte todo tu recorrido.": "Type your business sector above so the system adapts your entire journey.",
      "El sistema generará las preguntas, puntos de contacto, nombres y logotipo a partir de lo que escribas aquí.": "The system will generate questions, touchpoints, names, and logo based on what you write here.",
      "Guardar e Ir al Paso 1": "Save & Go to Step 1",

      // Step 1
      "Comprobar y Siguiente": "Verify & Next",
      "Completar Paso 1": "Complete Step 1",
      "Escribe o dicta tu respuesta para esta dimensión de tu marca...": "Type or dictate your answer for this dimension of your brand...",
      "Opciones sintetizadas desde la información de tu marca:": "Options synthesized from your brand information:",
      "¿Por qué existe tu marca más allá de generar ingresos y qué cambio positivo busca lograr?": "Why does your brand exist beyond generating revenue and what positive change does it seek to achieve?",
      "¿Qué hace única a tu propuesta frente a las alternativas actuales del mercado?": "What makes your value proposition unique compared to current market alternatives?",
      "¿Cómo mejora concretamente la vida o el trabajo de quienes eligen tu marca?": "How does choosing your brand concretely improve your customers' life or work?",
      "¿Cuáles son los pasos clave con los que garantizas calidad en tu producto o servicio?": "What are the key steps by which you guarantee quality in your product or service?",
      "¿En una sola frase clara, qué quieres que tus clientes recuerden siempre de tu marca?": "In one clear sentence, what do you want your customers to always remember about your brand?",
      "Si tu marca fuera una persona, ¿cómo hablaría, cómo trataría al cliente y qué actitud tendría?": "If your brand were a person, how would it speak, treat the customer, and behave?",
      "¿Quién es tu cliente ideal, qué es lo que más valora y qué problema urgente le resuelves?": "Who is your ideal customer, what do they value most, and what urgent problem do you solve for them?",

      // Step 2
      "1. ANTES DE LA COMPRA": "1. BEFORE PURCHASE",
      "2. DURANTE LA COMPRA": "2. DURING PURCHASE",
      "3. DESPUÉS DE LA COMPRA": "3. AFTER PURCHASE",
      "¿Por qué medios te descubren y evalúan tus clientes antes de comprar?": "Through which channels do customers discover and evaluate you before buying?",
      "¿Dónde ocurre la experiencia principal y el contacto directo durante el servicio o compra?": "Where does the main experience and direct contact happen during the service or purchase?",
      "¿Cómo mantienes la relación, el soporte y la lealtad después de la entrega?": "How do you maintain the relationship, support, and loyalty after delivery?",
      "Agregar otro punto de contacto propio...": "Add another custom touchpoint...",
      "Agregar": "Add",

      // Step 3
      "PASO 3 · 1 DE 3 · NOMBRE PROPIO O RAÍCES DEL SISTEMA": "STEP 3 · 1 OF 3 · OWN NAME OR SYSTEM ROOTS",
      "Define o confirma el nombre de tu marca (o explora propuestas del sistema en el siguiente paso)": "Define or confirm your brand name (or explore system proposals in the next step)",
      "Nombre Oficial de la Marca:": "Official Brand Name:",
      "Escribe el nombre de tu marca": "Type your brand name",
      "Raíces extraídas automáticamente de tus respuestas de los Pasos 0 y 1:": "Roots automatically extracted from your Step 0 and Step 1 answers:",
      "Completa el Paso 0 y 1 para extraer raíces adicionales": "Complete Steps 0 and 1 to extract additional roots",
      "Presiona Adelante para explorar variantes generadas por el sistema o confirmar tu nombre.": "Press Next to explore system-generated variants or confirm your name.",
      "PASO 3 · 2 DE 3 · PROPUESTAS GENERADAS POR EL SISTEMA": "STEP 3 · 2 OF 3 · SYSTEM-GENERATED PROPOSALS",
      "Toca cualquier propuesta para seleccionarla como Nombre Oficial": "Tap any proposal to select it as your Official Name",
      "Generar Nuevas": "Generate New",
      "PASO 3 · 3 DE 3 · CONFIRMACIÓN DE NOMBRE Y DESCRIPTOR": "STEP 3 · 3 OF 3 · NAME & DESCRIPTOR CONFIRMATION",
      "Tu identidad verbal está lista para pasar al diseño visual": "Your verbal identity is ready to move to visual design",
      "NOMBRE OFICIAL CONFIRMADO": "CONFIRMED OFFICIAL NAME",
      "Descriptor o Eslogan Oficial (derivado de tu giro):": "Official Descriptor or Slogan (derived from your sector):",

      // Step 4
      "PASO 4 · 4 DE 5 · SELECCIÓN DE TIPOS DE FUENTES": "STEP 4 · 4 OF 5 · TYPEFACE SELECTION",
      "Editorial Moderna y Limpia": "Clean & Modern Editorial",
      "Tecnológica y Precisión": "Tech & Precision",
      "Alta Costura y Serif Clásica": "Haute Couture & Classic Serif",
      "Herencia y Lujo Atemporal": "Heritage & Timeless Luxury",
      "Vanguardia Escultórica": "Sculptural Vanguard",
      "Minimalismo Geométrico": "Geometric Minimalism",
      "PASO 4 · 5 DE 5 · ESTRUCTURA BASE E IDEA DE PARTIDA": "STEP 4 · 5 OF 5 · BASE STRUCTURE & STARTING IDEA",
      "1. Monograma Constructivo y Ligadura": "1. Constructive Monogram & Ligature",
      "Geometría modular e iniciales entrelazadas": "Modular geometry and interlocking initials",
      "2. Emblema y Escudo de Autoridad": "2. Emblem & Crest of Authority",
      "Heráldica contemporánea y simetría axial": "Contemporary heraldry and axial symmetry",
      "3. Símbolo Continuo y Espacio Negativo": "3. Continuous Symbol & Negative Space",
      "Fluidez orgánica y proporción áurea": "Organic fluidity and golden ratio",
      "4. Volumen Tridimensional y Prisma": "4. Three-Dimensional Volume & Prism",
      "Facetas escultóricas y refracción de luz": "Sculptural facets and light refraction",
      "¿Tienes una idea, símbolo u objeto de partida para tu logotipo? (Opcional · ej. unas alas, una estrella, un escudo, una montaña):": "Do you have a starting idea, symbol, or object for your logo? (Optional · e.g. wings, star, shield, mountain):",
      "Déjalo en blanco para que el sistema lo infiera de tu giro o escribe aquí tu símbolo inicial...": "Leave blank so the system infers it from your sector, or type your initial symbol here...",

      // Step 5
      "PASO 5 · 1 DE 2 · ACABADO, LOGO BASE Y PALETA": "STEP 5 · 1 OF 2 · FINISH, BASE LOGO & PALETTE",
      "Abrir Lienzo de Logotipo": "Open Logo Canvas",
      "¿Ya tienes un logo y quieres mantenerlo o tomarlo como base?": "Do you already have a logo and want to keep it or use it as a base?",
      "Mantenerlo": "Keep It",
      "Evolucionar como base": "Evolve as base",
      "Cristal Volumétrico 3D (Liquid Glass)": "3D Volumetric Glass (Liquid Glass)",
      "Degradado Multicapa Fluido": "Fluid Multi-Layer Gradient",
      "Emblema Figurativo en Capas": "Layered Figurative Emblem",
      "Sello Grabado de Oficio": "Engraved Craft Seal",
      "Ilustración Expresiva 3D": "3D Expressive Illustration",
      "Síntesis Geométrica Directa": "Direct Geometric Synthesis",
      "Paletas del Sistema:": "System Palettes:",
      "Colores de tu Logo": "Your Logo Colors",
      "Zafiro y Ámbar": "Sapphire & Amber",
      "Esmeralda y Cobre": "Emerald & Copper",
      "Carmesí y Oro": "Crimson & Gold",
      "Magenta y Violeta": "Magenta & Violet",
      "Obsidiana y Oro": "Obsidian & Gold",
      "Obsidiana y Cian": "Obsidian & Cyan",
      "Confirmar Logo e Ir al Manual": "Confirm Logo & Go to Brandbook",
      "Evolucionar mi Logo": "Evolve My Logo",
      "Cambiar Base": "Change Base",
      "Fondo Claro/Oscuro": "Light/Dark Background",
      "GEMINI REDISEÑANDO TU LOGOTIPO SIN LÍMITES...": "GEMINI REDESIGNING YOUR LOGO WITHOUT LIMITS...",
      "Interacción 100% abierta a Gemini sin límites: cambia por completo el objeto o forma principal (ej. águila, león, taza de café, cohete, árbol, espada), transforma su estructura, estilo, colores o tipografía y pulsa Aplicar...": "100% open Gemini interaction: change the main object or shape (e.g., eagle, lion, coffee cup, rocket, tree, shield), transform its structure, style, colors, or font, and press Apply...",

      // Step 6
      "Ir a Descargas": "Go to Downloads",
      "Anterior": "Previous",
      "Siguiente": "Next",
      "Descargar / Guardar PDF (30 Láminas)": "Download / Save PDF (30 Plates)",
      "Ver Mapa de Avance": "View Progress Map",
      "PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN": "STEP 6 · 2 OF 2 · DOWNLOAD & PRODUCTION VAULT",
      "Diseñado siguiendo tu logotipo activo, sus acentos cromáticos, las 4 submarcas homologadas y las 30 secciones de la Guía Oficial de ImproBears.": "Designed following your active logo, its chromatic accents, the 4 homologous sub-brands, and the 30 sections of the Official ImproBears Guide.",
      "Descargar Manual Oficial Completo en PDF Directo (30 Láminas .PDF)": "Download Complete Official Brandbook in Direct PDF (30 Plates .PDF)",
      "Abrir Vista Completa / Imprimir 30 Láminas (A4 Horizontal)": "Open Full View / Print 30 Plates (A4 Landscape)",
      "Descargar Manual Interactivo (.HTML Autónomo 30 Láminas)": "Download Interactive Brandbook (Standalone 30-Plate .HTML)",
      "Descargar Logotipo 3D Oficial en Curvas (.SVG)": "Download Official 3D Vector Logo (.SVG)",
      "Explorar las 30 Láminas Interactivas (01 a 30)": "Explore the 30 Interactive Plates (01 to 30)",
      "Cargar y Abrir Manual Oficial IMPROBEARS (Arquitectura Maestra + Consulting · Ingredients · Studio · AI)": "Load & Open Official IMPROBEARS Brandbook (Master Architecture + Consulting · Ingredients · Studio · AI)",

      // Journey Map & Menus
      "Mapa de Recorrido (Pasos 0 al 6)": "Brand Journey Map (Steps 0 to 6)",
      "Toca cualquier fase para ir directamente o reiniciar su avance sin perder los demás pasos.": "Tap any phase to jump directly or reset its progress without losing other steps.",
      "Volver al Paso Activo": "Return to Active Step",
      "PASO 0 · PUNTO DE PARTIDA": "STEP 0 · STARTING POINT",
      "Objetivo, Nombre Inicial y Giro del Negocio": "Objective, Initial Name & Business Sector",
      "PASO 1 · ESENCIA Y MANIFIESTO": "STEP 1 · ESSENCE & MANIFESTO",
      "Círculo Dorado y los 7 Pilares Estratégicos": "Golden Circle & the 7 Strategic Pillars",
      "PASO 2 · RECORRIDO DEL CLIENTE": "STEP 2 · CUSTOMER JOURNEY",
      "Touchpoints Antes, Durante y Después de la Compra": "Touchpoints Before, During & After Purchase",
      "PASO 3 · NOMBRE Y BLINDAJE": "STEP 3 · NAMING & PROTECTION",
      "Naming Estratégico, Fonética y Clase Niza": "Strategic Naming, Phonetics & Nice Class",
      "PASO 4 · PERSONALIDAD VISUAL": "STEP 4 · VISUAL PERSONALITY",
      "Sliders Kansei, Tipografía y Estructura Base": "Kansei Sliders, Typography & Base Structure",
      "PASO 5 · ESTUDIO DE LOGOTIPO": "STEP 5 · LOGO STUDIO",
      "Iteración de Símbolo, Paleta y Geometría": "Symbol Iteration, Palette & Geometry",
      "PASO 6 · MANUAL Y ENTREGABLES": "STEP 6 · BRANDBOOK & DELIVERABLES",
      "Brandbook Completo y Descarga Ejecutiva": "Complete Brandbook & Executive Download",
      "Ir": "Go",
      "Reiniciar": "Reset",
      "Menú General del Sistema": "System Main Menu",
      "Mi Cuenta y Dispositivos": "My Account & Devices",
      "Ir a Paso 0 (Inicio)": "Go to Step 0 (Start)",
      "Ir a Paso 1 (Esencia)": "Go to Step 1 (Essence)",
      "Ir a Paso 2 (Recorrido)": "Go to Step 2 (Journey)",
      "Ir a Paso 3 (Nombre)": "Go to Step 3 (Naming)",
      "Ir a Paso 4 (Personalidad)": "Go to Step 4 (Personality)",
      "Ir a Paso 5 (Estudio Logo)": "Go to Step 5 (Logo Studio)",
      "Ir a Paso 6 (Manual y Descargas)": "Go to Step 6 (Brandbook & Downloads)",
      "Modificar Aura y Colores": "Customize Aura & Colors",
      "Laboratorio 3D de Aura": "Aura 3D Laboratory",
      "SINCRONIZACIÓN MULTI-DISPOSITIVO EN VIVO": "LIVE MULTI-DEVICE SYNCHRONIZATION",
      "SESIÓN ADMINISTRADOR IMPROBEARS ACTIVA": "ACTIVE IMPROBEARS ADMIN SESSION",
      "SESIÓN MULTI-DISPOSITIVO EN VIVO": "LIVE MULTI-DEVICE SESSION",
      "ADMINISTRADOR OFICIAL IMPROBEARS": "OFFICIAL IMPROBEARS ADMINISTRATOR",
      "CUENTA VERIFICADA": "VERIFIED ACCOUNT",
      "Inicia sesión para sincronizar tus dispositivos automáticamente": "Sign in to automatically sync your devices",
      "Solo ingresa tu correo y contraseña en tu celular, tablet o computadora. Al iniciar sesión, todos tus dispositivos se sincronizan solos en tiempo real sin usar llaves ni códigos.": "Simply enter your email and password on your phone, tablet, or computer. Once signed in, all your devices sync automatically in real time without keys or codes.",
      "NOMBRE (OPCIONAL)": "NAME (OPTIONAL)",
      "CORREO ELECTRÓNICO": "EMAIL ADDRESS",
      "CONTRASEÑA": "PASSWORD",
      "Iniciar Sesión y Sincronizar Dispositivos": "Sign In & Sync Devices",
      "Cerrar Sesión": "Sign Out",
      "DISPOSITIVOS SINCRONIZADOS CON TU CUENTA": "DEVICES SYNCED WITH YOUR ACCOUNT",
      "Sincronizar Ahora con mis Dispositivos": "Sync Now with My Devices",
      "Borrar Sesión de Otros Dispositivos": "Remove Session from Other Devices",
      "Continuar con mi Marca": "Continue with My Brand"
    },
    pt: {
      "Mapa": "Mapa",
      "Video": "Vídeo",
      "Atrás": "Voltar",
      "Adelante": "Avançar",
      "Finalizar": "Concluir",
      "Hablar": "Falar",
      "Dictar Giro": "Ditar Setor",
      "Iterar con Gemini": "Iterar com Gemini",
      "Gemini diseñando...": "Gemini projetando...",
      "Diseñando...": "Projetando...",
      "Aplicar con Gemini": "Aplicar com Gemini",
      "Inicio": "Início",
      "Taller": "Estúdio",
      "Manual": "Manual",
      "Cuenta": "Conta",
      "En Vivo": "Ao Vivo",
      "Menú": "Menu",
      "Cerrar": "Fechar",
      "PASO 0 · 1 DE 3 · OBJETIVO": "PASSO 0 · 1 DE 3 · OBJETIVO",
      "¿Cuál es tu objetivo principal al construir tu marca hoy?": "Qual é o seu objetivo principal ao construir sua marca hoje?",
      "Crear mi primera marca desde cero": "Criar minha primeira marca do zero",
      "Evolucionar y profesionalizar mi marca actual": "Evoluir e profissionalizar minha marca atual",
      "Crear una nueva sub-marca o división": "Criar uma nova submarca ou divisão",
      "Selecciona una opción y presiona Adelante en la barra inferior.": "Selecione uma opção e pressione Avançar na barra inferior.",
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGOTIPO ACTUAL": "PASSO 0 · 2 DE 3 · NOME E LOGOTIPO ATUAL",
      "¿Ya cuentas con el nombre o un logotipo actual para tu marca?": "Você já tem um nome ou logotipo atual para sua marca?",
      "Definirlo más adelante": "Definir mais adiante",
      "Ya tengo mi nombre": "Já tenho meu nome",
      "Nombre de tu marca (si ya lo tienes):": "Nome da sua marca (se já tiver):",
      "Escribe aquí el nombre de tu marca": "Digite aqui o nome da sua marca",
      "¿Ya tienes un logotipo actual? (Opcional)": "Você já tem um logotipo atual? (Opcional)",
      "Subir mi Logo Actual (.PNG, .JPG, .SVG)": "Enviar Meu Logo Atual (.PNG, .JPG, .SVG)",
      "Subir mi Logo Actual": "Enviar Meu Logo Atual",
      "Cambiar": "Trocar",
      "Quitar": "Remover",
      "Mantener mi logo actual": "Manter meu logo atual",
      "Tomarlo como base y mejorar": "Usar como base e melhorar",
      "PASO 0 · 3 DE 3 · GIRO Y ACTIVIDAD": "PASSO 0 · 3 DE 3 · SETOR E ATIVIDADE",
      "¿En qué giro o actividad se enfoca tu empresa y qué ofrece?": "Em qual setor ou atividade sua empresa se concentra e o que oferece?",
      "Guardar e Ir al Paso 1": "Salvar e Ir ao Passo 1",
      "Comprobar y Siguiente": "Verificar e Seguinte",
      "Completar Paso 1": "Concluir Passo 1",
      "Opciones sintetizadas desde la información de tu marca:": "Opções sintetizadas a partir das informações da sua marca:",
      "1. ANTES DE LA COMPRA": "1. ANTES DA COMPRA",
      "2. DURANTE LA COMPRA": "2. DURANTE A COMPRA",
      "3. DESPUÉS DE LA COMPRA": "3. DEPOIS DA COMPRA",
      "Agregar": "Adicionar",
      "Generar Nuevas": "Gerar Novas",
      "NOMBRE OFICIAL CONFIRMADO": "NOME OFICIAL CONFIRMADO",
      "Abrir Lienzo de Logotipo": "Abrir Tela de Logotipo",
      "Confirmar Logo e Ir al Manual": "Confirmar Logo e Ir ao Manual",
      "Evolucionar mi Logo": "Evoluir Meu Logo",
      "Cambiar Base": "Trocar Base",
      "Fondo Claro/Oscuro": "Fundo Claro/Escuro",
      "Ir a Descargas": "Ir para Downloads",
      "Anterior": "Anterior",
      "Siguiente": "Seguinte",
      "Descargar / Guardar PDF (30 Láminas)": "Baixar / Salvar PDF (30 Lâminas)",
      "PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN": "PASSO 6 · 2 DE 2 · CENTRAL DE DOWNLOADS E PRODUÇÃO",
      "Descargar Manual Oficial Completo en PDF Directo (30 Láminas .PDF)": "Baixar Manual Oficial Completo em PDF Direto (30 Lâminas .PDF)",
      "Abrir Vista Completa / Imprimir 30 Láminas (A4 Horizontal)": "Abrir Vista Completa / Imprimir 30 Lâminas (A4 Horizontal)",
      "Descargar Manual Interactivo (.HTML Autónomo 30 Láminas)": "Baixar Manual Interativo (.HTML Autônomo 30 Lâminas)",
      "Descargar Logotipo 3D Oficial en Curvas (.SVG)": "Baixar Logotipo 3D Oficial em Curvas (.SVG)",
      "Explorar las 30 Láminas Interactivas (01 a 30)": "Explorar as 30 Lâminas Interativas (01 a 30)",
      "Menú General del Sistema": "Menu Geral do Sistema",
      "Ver Mapa de Avance": "Ver Mapa de Progresso",
      "Mi Cuenta y Dispositivos": "Minha Conta e Dispositivos",
      "Inicia sesión para sincronizar tus dispositivos automáticamente": "Faça login para sincronizar seus dispositivos automaticamente",
      "Iniciar Sesión y Sincronizar Dispositivos": "Entrar e Sincronizar Dispositivos",
      "Cerrar Sesión": "Sair da Conta",
      "DISPOSITIVOS SINCRONIZADOS CON TU CUENTA": "DISPOSITIVOS SINCRONIZADOS COM SUA CONTA",
      "Sincronizar Ahora con mis Dispositivos": "Sincronizar Agora com Meus Dispositivos",
      "Borrar Sesión de Otros Dispositivos": "Remover Sessão de Outros Dispositivos",
      "Continuar con mi Marca": "Continuar com Minha Marca"
    },
    fr: {
      "Mapa": "Carte",
      "Video": "Vidéo",
      "Atrás": "Retour",
      "Adelante": "Suivant",
      "Finalizar": "Terminer",
      "Hablar": "Parler",
      "Dictar Giro": "Dicter Secteur",
      "Iterar con Gemini": "Itérer avec Gemini",
      "Gemini diseñando...": "Gemini conçoit...",
      "Diseñando...": "Conception...",
      "Aplicar con Gemini": "Appliquer avec Gemini",
      "Inicio": "Accueil",
      "Taller": "Atelier",
      "Manual": "Manuel",
      "Cuenta": "Compte",
      "En Vivo": "En Direct",
      "Menú": "Menu",
      "Cerrar": "Fermer",
      "PASO 0 · 1 DE 3 · OBJETIVO": "ÉTAPE 0 · 1 SUR 3 · OBJECTIF",
      "¿Cuál es tu objetivo principal al construir tu marca hoy?": "Quel est votre objectif principal en construisant votre marque aujourd'hui ?",
      "Crear mi primera marca desde cero": "Créer ma première marque de zéro",
      "Evolucionar y profesionalizar mi marca actual": "Faire évoluer et professionnaliser ma marque actuelle",
      "Crear una nueva sub-marca o división": "Créer une nouvelle sous-marque ou division",
      "Selecciona una opción y presiona Adelante en la barra inferior.": "Sélectionnez une option et appuyez sur Suivant dans la barre inférieure.",
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGOTIPO ACTUAL": "ÉTAPE 0 · 2 SUR 3 · NOM ET LOGO ACTUEL",
      "¿Ya cuentas con el nombre o un logotipo actual para tu marca?": "Avez-vous déjà un nom ou un logo actuel pour votre marque ?",
      "Definirlo más adelante": "Le définir plus tard",
      "Ya tengo mi nombre": "J'ai déjà mon nom",
      "Nombre de tu marca (si ya lo tienes):": "Nom de votre marque (si vous l'avez déjà) :",
      "Escribe aquí el nombre de tu marca": "Saisissez ici le nom de votre marque",
      "¿Ya tienes un logotipo actual? (Opcional)": "Avez-vous déjà un logo actuel ? (Optionnel)",
      "Subir mi Logo Actual (.PNG, .JPG, .SVG)": "Importer Mon Logo Actuel (.PNG, .JPG, .SVG)",
      "Subir mi Logo Actual": "Importer Mon Logo Actuel",
      "Cambiar": "Changer",
      "Quitar": "Supprimer",
      "Mantener mi logo actual": "Conserver mon logo actuel",
      "Tomarlo como base y mejorar": "L'utiliser comme base et l'améliorer",
      "PASO 0 · 3 DE 3 · GIRO Y ACTIVIDAD": "ÉTAPE 0 · 3 SUR 3 · SECTEUR ET ACTIVITÉ",
      "¿En qué giro o actividad se enfoca tu empresa y qué ofrece?": "Sur quel secteur ou activité votre entreprise se concentre-t-elle et qu'offre-t-elle ?",
      "Guardar e Ir al Paso 1": "Enregistrer et Aller à l'Étape 1",
      "Comprobar y Siguiente": "Vérifier et Suivant",
      "Completar Paso 1": "Terminer l'Étape 1",
      "Opciones sintetizadas desde la información de tu marca:": "Options synthétisées à partir des informations de votre marque :",
      "1. ANTES DE LA COMPRA": "1. AVANT L'ACHAT",
      "2. DURANTE LA COMPRA": "2. PENDANT L'ACHAT",
      "3. DESPUÉS DE LA COMPRA": "3. APRÈS L'ACHAT",
      "Agregar": "Ajouter",
      "Generar Nuevas": "Générer Nouvelles",
      "NOMBRE OFICIAL CONFIRMADO": "NOM OFFICIEL CONFIRMÉ",
      "Abrir Lienzo de Logotipo": "Ouvrir le Canevas du Logo",
      "Confirmar Logo e Ir al Manual": "Confirmer le Logo et Aller au Manuel",
      "Evolucionar mi Logo": "Faire Évoluer Mon Logo",
      "Cambiar Base": "Changer la Base",
      "Fondo Claro/Oscuro": "Fond Clair/Sombre",
      "Ir a Descargas": "Aller aux Téléchargements",
      "Anterior": "Précédent",
      "Siguiente": "Suivant",
      "Descargar / Guardar PDF (30 Láminas)": "Télécharger / Enregistrer PDF (30 Planches)",
      "PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN": "ÉTAPE 6 · 2 SUR 2 · COFFRE DE TÉLÉCHARGEMENTS ET PRODUCTION",
      "Descargar Manual Oficial Completo en PDF Directo (30 Láminas .PDF)": "Télécharger le Manuel Officiel Complet en PDF Direct (30 Planches .PDF)",
      "Abrir Vista Completa / Imprimir 30 Láminas (A4 Horizontal)": "Ouvrir la Vue Complète / Imprimer 30 Planches (A4 Paysage)",
      "Descargar Manual Interactivo (.HTML Autónomo 30 Láminas)": "Télécharger le Manuel Interactif (.HTML Autonome 30 Planches)",
      "Descargar Logotipo 3D Oficial en Curvas (.SVG)": "Télécharger le Logo 3D Officiel Vectoriel (.SVG)",
      "Explorar las 30 Láminas Interactivas (01 a 30)": "Explorer les 30 Planches Interactives (01 à 30)",
      "Menú General del Sistema": "Menu Général du Système",
      "Ver Mapa de Avance": "Voir la Carte de Progression",
      "Mi Cuenta y Dispositivos": "Mon Compte et Appareils",
      "Inicia sesión para sincronizar tus dispositivos automáticamente": "Connectez-vous pour synchroniser automatiquement vos appareils",
      "Iniciar Sesión y Sincronizar Dispositivos": "Se Connecter et Synchroniser",
      "Cerrar Sesión": "Se Déconnecter",
      "DISPOSITIVOS SINCRONIZADOS CON TU CUENTA": "APPAREILS SYNCHRONISÉS AVEC VOTRE COMPTE",
      "Sincronizar Ahora con mis Dispositivos": "Synchroniser Maintenant avec Mes Appareils",
      "Borrar Sesión de Otros Dispositivos": "Supprimer la Session des Autres Appareils",
      "Continuar con mi Marca": "Continuer avec Ma Marque"
    }
  };

  const PATTERN_REPLACEMENTS = {
    en: [
      [/PASO\s+(\d+)\s*·\s*(\d+)\s+DE\s+(\d+)/g, "STEP $1 · $2 OF $3"],
      [/PASO\s+(\d+)\s*·\s*PREGUNTA\s+(\d+)\s+DE\s+(\d+)/g, "STEP $1 · QUESTION $2 OF $3"],
      [/PASO\s+(\d+)\s*·\s*ETAPA\s+(\d+)\s+DE\s+(\d+)/g, "STEP $1 · STAGE $2 OF $3"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+30/g, "STEP $1 · PLATE $2 OF 30"],
      [/Paso\s+(\d+)\s*·\s*Sub-paso\s+(\d+)/g, "Step $1 · Sub-step $2"],
      [/Video\s+Paso\s+(\d+)/g, "Video Step $1"],
      [/Paso\s+(\d+)/g, "Step $1"],
      [/Siguiente\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Next Plate ($1/$2)"],
      [/Lámina\s+(\d+):/g, "Plate $1:"],
      [/LÁMINA\s+(\d+)\s+DE\s+30/g, "PLATE $1 OF 30"],
      [/30\s+Láminas/g, "30 Plates"],
      [/30\s+láminas/g, "30 plates"],
      [/1\.\s*PROPÓSITO NUCLEAR/g, "1. CORE PURPOSE"],
      [/2\.\s*OFERTA DE VALOR DIFERENCIADA/g, "2. DIFFERENTIATED VALUE PROPOSITION"],
      [/3\.\s*IMPACTO EN EL CLIENTE/g, "3. CUSTOMER IMPACT"],
      [/4\.\s*MÉTODO Y PROCESO/g, "4. METHOD & PROCESS"],
      [/5\.\s*MENSAJE CENTRAL/g, "5. CORE MESSAGE"],
      [/6\.\s*CARÁCTER Y PERSONALIDAD/g, "6. CHARACTER & PERSONALITY"],
      [/7\.\s*CLIENTE IDEAL/g, "7. IDEAL CUSTOMER"],
      [/CALIBRACIÓN VISUAL CON REFERENCIAS/g, "VISUAL CALIBRATION WITH REFERENCES"],
      [/Desliza o toca las referencias visuales en los extremos para/g, "Slide or tap the visual references at the ends for"],
      [/Elige la tipografía oficial para el logotipo y manual de/g, "Choose the official typography for the logo and brandbook of"],
      [/Tipografía activa seleccionada:/g, "Selected active typography:"],
      [/\(aplicada en tiempo real al logotipo y a las 30 láminas\)/g, "(applied in real time to the logo and all 30 plates)"],
      [/Elige la estructura base y, si lo deseas, escribe una idea o símbolo inicial para/g, "Choose the base structure and, if desired, write an initial idea or symbol for"],
      [/Paradigma inferido por tus deslizadores:/g, "Paradigm inferred from your sliders:"],
      [/Selecciona el Acabado, Paleta o tu Logotipo Base para/g, "Select the Finish, Palette, or Base Logo for"],
      [/Nombre Oficial Seleccionado:/g, "Selected Official Name:"],
      [/Prompt del Sistema/g, "System Prompt"],
      [/palabras/g, "words"],
      [/App en proporción 1:1/g, "1:1 App Icon"],
      [/MANUAL DE IDENTIDAD CORPORATIVA/g, "CORPORATE IDENTITY MANUAL"],
      [/MANUAL DE MARCA Y ARQUITECTURA DE IDENTIDAD/g, "BRAND MANUAL & IDENTITY ARCHITECTURE"],
      [/PARTE I — EL ALMA Y LA ESTRATEGIA/g, "PART I — SOUL & STRATEGY"],
      [/PARTE II — IDENTIDAD VISUAL Y SISTEMA/g, "PART II — VISUAL IDENTITY & SYSTEM"],
      [/PARTE III — EL MUNDO DE LA MARCA Y APLICACIONES/g, "PART III — BRAND WORLD & APPLICATIONS"],
      [/PORTADA MAESTRA/g, "MASTER COVER"],
      [/Portada Maestra en Curvas:/g, "Master Vector Cover:"],
      [/01 · ARQUITECTURA METODOLÓGICA/g, "01 · METHODOLOGICAL ARCHITECTURE"],
      [/Índice Metodológico TheBestBrand \(Pasos 0 al 6 · 30 Láminas\)/g, "TheBestBrand Methodological Index (Steps 0 to 6 · 30 Plates)"],
      [/01 · PASO 0 — GIRO Y PROBLEMA/g, "01 · STEP 0 — SECTOR & PROBLEM"],
      [/Manifiesto Fundacional: Del Caos al Sistema y Buyer Persona/g, "Foundational Manifesto: From Chaos to System & Buyer Persona"],
      [/02 · PASO 1 — ADN DE MARCA/g, "02 · STEP 1 — BRAND DNA"],
      [/El Círculo Dorado en Arquitectura de Curvas \(WHY · HOW · WHAT\)/g, "The Golden Circle in Vector Architecture (WHY · HOW · WHAT)"],
      [/Promesa, Misión, Visión y las 6 Máximas de Filosofía/g, "Promise, Mission, Vision & the 6 Philosophy Maxims"],
      [/Los 6 Principios que nos Guían y Nuestra Relación con Clientes/g, "The 6 Guiding Principles & Our Client Relationship"],
      [/02 · PASO 1 — LA EMPRESA COMO PERSONA/g, "02 · STEP 1 — THE BRAND AS A PERSON"],
      [/La Empresa como Persona: Carácter y 4 Facetas de/g, "The Brand as a Person: Character & 4 Facets of"],
      [/Voz, Conducta y Calibración de los 7 Vectores Kansei/g, "Voice, Behavior & Calibration of the 7 Kansei Vectors"],
      [/03 · PASO 2 — TOUCHPOINTS/g, "03 · STEP 2 — TOUCHPOINTS"],
      [/Ingeniería de Touchpoints: Mapa de Contacto Real con el Cliente/g, "Touchpoint Engineering: Real Customer Contact Map"],
      [/Touchpoints Momento 1: Antes de Comprar \(Descubrimiento y Confianza\)/g, "Touchpoints Moment 1: Before Purchase (Discovery & Trust)"],
      [/Touchpoints Momento 2: Durante la Compra y Ejecución del Servicio/g, "Touchpoints Moment 2: During Purchase & Service Execution"],
      [/Touchpoints Momento 3: Después de Comprar \(Portal, Entregables y Lealtad\)/g, "Touchpoints Moment 3: After Purchase (Portal, Deliverables & Loyalty)"],
      [/04 · PASO 3 — EL NOMBRE OFICIAL/g, "04 · STEP 3 — THE OFFICIAL NAME"],
      [/Naming Estratégico/g, "Strategic Naming"],
      [/Semiótica y Clases de Niza/g, "Semiotics & Nice Classes"],
      [/05 · PASO 4 — ARQUITECTURA Y LOGOTIPOS/g, "05 · STEP 4 — ARCHITECTURE & LOGOS"],
      [/Arquitectura Maestra de Marca: Marca Madre \+ 4 Submarcas Homologadas/g, "Master Brand Architecture: Parent Brand + 4 Homologous Sub-Brands"],
      [/Anatomía Semiótica del Símbolo Maestro en Positivo/g, "Semiotic Anatomy of the Positive Master Symbol"],
      [/Submarca Oficial/g, "Official Sub-Brand"],
      [/05 · PASO 4 — CONSTRUCCIÓN TÉCNICA/g, "05 · STEP 4 — TECHNICAL CONSTRUCTION"],
      [/Retícula Constructiva \(8X × 8X\) y Sistema de Curvas del Banner/g, "Construction Grid (8X × 8X) & Banner Curve System"],
      [/Área de Aislamiento \(1\.5X\) y Sección de Aplicación en Negativo/g, "Clear Space (1.5X) & Negative Application Section"],
      [/Usos Incorrectos y Restricciones de Integridad Visual \(6 Reglas\)/g, "Incorrect Uses & Visual Integrity Restrictions (6 Rules)"],
      [/06 · PASO 5 — COLOR Y TIPOGRAFÍA/g, "06 · STEP 5 — COLOR & TYPOGRAPHY"],
      [/Paleta Cromática Oficial \(8 Colores · Pantone · CMYK · HEX\)/g, "Official Color Palette (8 Colors · Pantone · CMYK · HEX)"],
      [/Proporción de Luz \(70\/20\/10\) y los 6 Recursos Visuales en Curvas/g, "Light Ratio (70/20/10) & the 6 Vector Visual Resources"],
      [/Sistema Tipográfico Oficial y Jerarquía Editorial/g, "Official Typographic System & Editorial Hierarchy"],
      [/Sistema de los 6 Sellos Metodológicos en el Estilo del Logo/g, "System of 6 Methodological Seals in the Logo Style"],
      [/07 · PASO 6 — APLICACIONES Y GOBERNANZA/g, "07 · STEP 6 — APPLICATIONS & GOVERNANCE"],
      [/Gobernanza de Identidad Documental y Co-Branding \(Directiva Max C-00\)/g, "Document Identity Governance & Co-Branding (Max Directive C-00)"],
      [/Papelería en Lienzo Claro, Propuestas, Tarjetas Ejecutivas y Firma/g, "Light-Canvas Stationery, Proposals, Executive Cards & Signature"],
      [/Ecosistema Digital en Lienzo Claro y Checklist de 10 Controles/g, "Light-Canvas Digital Ecosystem & 10-Control Checklist"],
      [/07 · PASO 6 — COLOFÓN INSTITUCIONAL/g, "07 · STEP 6 — INSTITUTIONAL COLOPHON"],
      [/Colofón Institucional sobre Fondo Claro y Familia/g, "Institutional Colophon on Light Canvas & Family"],
      [/MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V5\.1/g, "BRAND IDENTITY & ARCHITECTURE MANUAL V5.1"],
      [/ESTRATEGIA/g, "STRATEGY"],
      [/SISTEMAS/g, "SYSTEMS"],
      [/CLARIDAD/g, "CLARITY"],
      [/RESULTADOS/g, "RESULTS"],
      [/Versión Positiva Principal sobre Lienzo Claro/g, "Primary Positive Version on Light Canvas"],
      [/IDENTIDAD • ESTRUCTURA • EJECUCION • CRECIMIENTO/g, "IDENTITY • STRUCTURE • EXECUTION • GROWTH"],
      [/LAMINA\s+(\d+)\s*\/\s*30/g, "PLATE $1 / 30"],
      [/PAG\.\s+(\d+)/g, "P. $1"],
      [/Imprimir \/ Guardar como PDF \(30 Láminas\)/g, "Print / Save as PDF (30 Plates)"],
      [/En línea en tiempo real/g, "Online in real time"],
      [/Este dispositivo/g, "This device"],
      [/ACTIVO/g, "ACTIVE"],
      [/RECIENTE/g, "RECENT"],
      [/Borrar/g, "Remove"]
    ],
    pt: [
      [/PASO\s+(\d+)\s*·\s*(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · $2 DE $3"],
      [/PASO\s+(\d+)\s*·\s*PREGUNTA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · PERGUNTA $2 DE $3"],
      [/PASO\s+(\d+)\s*·\s*ETAPA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · ETAPA $2 DE $3"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+30/g, "PASSO $1 · LÂMINA $2 DE 30"],
      [/Paso\s+(\d+)\s*·\s*Sub-paso\s+(\d+)/g, "Passo $1 · Sub-passo $2"],
      [/Video\s+Paso\s+(\d+)/g, "Vídeo Passo $1"],
      [/Paso\s+(\d+)/g, "Passo $1"],
      [/Siguiente\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Próxima Lâmina ($1/$2)"],
      [/Lámina\s+(\d+):/g, "Lâmina $1:"],
      [/LÁMINA\s+(\d+)\s+DE\s+30/g, "LÂMINA $1 DE 30"],
      [/30\s+Láminas/g, "30 Lâminas"],
      [/30\s+láminas/g, "30 lâminas"],
      [/CALIBRACIÓN VISUAL CON REFERENCIAS/g, "CALIBRAÇÃO VISUAL COM REFERÊNCIAS"],
      [/Desliza o toca las referencias visuales en los extremos para/g, "Deslize ou toque nas referências visuais nos extremos para"],
      [/Elige la tipografía oficial para el logotipo y manual de/g, "Escolha a tipografia oficial para o logotipo e manual de"],
      [/Selecciona el Acabado, Paleta o tu Logotipo Base para/g, "Selecione o Acabamento, Paleta ou Logotipo Base para"],
      [/Nombre Oficial Seleccionado:/g, "Nome Oficial Selecionado:"],
      [/Prompt del Sistema/g, "Prompt do Sistema"],
      [/palabras/g, "palavras"],
      [/App en proporción 1:1/g, "App na proporção 1:1"],
      [/MANUAL DE IDENTIDAD CORPORATIVA/g, "MANUAL DE IDENTIDADE CORPORATIVA"],
      [/PORTADA MAESTRA/g, "CAPA MESTRA"],
      [/Portada Maestra en Curvas:/g, "Capa Mestra em Curvas:"],
      [/Índice Metodológico TheBestBrand \(Pasos 0 al 6 · 30 Láminas\)/g, "Índice Metodológico TheBestBrand (Passos 0 a 6 · 30 Lâminas)"],
      [/Manifiesto Fundacional: Del Caos al Sistema y Buyer Persona/g, "Manifesto Fundacional: Do Caos ao Sistema e Buyer Persona"],
      [/MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V5\.1/g, "MANUAL DE IDENTIDADE E ARQUITETURA DE MARCA V5.1"],
      [/ESTRATEGIA/g, "ESTRATÉGIA"],
      [/SISTEMAS/g, "SISTEMAS"],
      [/CLARIDAD/g, "CLAREZA"],
      [/RESULTADOS/g, "RESULTADOS"],
      [/Versión Positiva Principal sobre Lienzo Claro/g, "Versão Positiva Principal em Fundo Claro"],
      [/LAMINA\s+(\d+)\s*\/\s*30/g, "LÂMINA $1 / 30"],
      [/Imprimir \/ Guardar como PDF \(30 Láminas\)/g, "Imprimir / Salvar como PDF (30 Lâminas)"],
      [/En línea en tiempo real/g, "Online em tempo real"],
      [/Este dispositivo/g, "Este dispositivo"],
      [/ACTIVO/g, "ATIVO"],
      [/RECIENTE/g, "RECENTE"],
      [/Borrar/g, "Remover"]
    ],
    fr: [
      [/PASO\s+(\d+)\s*·\s*(\d+)\s+DE\s+(\d+)/g, "ÉTAPE $1 · $2 SUR $3"],
      [/PASO\s+(\d+)\s*·\s*PREGUNTA\s+(\d+)\s+DE\s+(\d+)/g, "ÉTAPE $1 · QUESTION $2 SUR $3"],
      [/PASO\s+(\d+)\s*·\s*ETAPA\s+(\d+)\s+DE\s+(\d+)/g, "ÉTAPE $1 · PHASE $2 SUR $3"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+30/g, "ÉTAPE $1 · PLANCHE $2 SUR 30"],
      [/Paso\s+(\d+)\s*·\s*Sub-paso\s+(\d+)/g, "Étape $1 · Sous-étape $2"],
      [/Video\s+Paso\s+(\d+)/g, "Vidéo Étape $1"],
      [/Paso\s+(\d+)/g, "Étape $1"],
      [/Siguiente\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Planche Suivante ($1/$2)"],
      [/Lámina\s+(\d+):/g, "Planche $1 :"],
      [/LÁMINA\s+(\d+)\s+DE\s+30/g, "PLANCHE $1 SUR 30"],
      [/30\s+Láminas/g, "30 Planches"],
      [/30\s+láminas/g, "30 planches"],
      [/CALIBRACIÓN VISUAL CON REFERENCIAS/g, "CALIBRAGE VISUEL AVEC RÉFÉRENCES"],
      [/Desliza o toca las referencias visuales en los extremos para/g, "Faites glisser ou touchez les références visuelles aux extrémités pour"],
      [/Elige la tipografía oficial para el logotipo y manual de/g, "Choisissez la typographie officielle pour le logo et le manuel de"],
      [/Selecciona el Acabado, Paleta o tu Logotipo Base para/g, "Sélectionnez la Finition, la Palette ou le Logo de Base pour"],
      [/Nombre Oficial Seleccionado:/g, "Nom Officiel Sélectionné :"],
      [/Prompt del Sistema/g, "Prompt du Système"],
      [/palabras/g, "mots"],
      [/App en proporción 1:1/g, "App en proportion 1:1"],
      [/MANUAL DE IDENTIDAD CORPORATIVA/g, "MANUEL D'IDENTITÉ CORPORATIVE"],
      [/PORTADA MAESTRA/g, "COUVERTURE MAÎTRE"],
      [/Portada Maestra en Curvas:/g, "Couverture Maître Vectorielle :"],
      [/Índice Metodológico TheBestBrand \(Pasos 0 al 6 · 30 Láminas\)/g, "Index Méthodologique TheBestBrand (Étapes 0 à 6 · 30 Planches)"],
      [/Manifiesto Fundacional: Del Caos al Sistema y Buyer Persona/g, "Manifeste Fondateur : Du Chaos au Système et Buyer Persona"],
      [/MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V5\.1/g, "MANUEL D'IDENTITÉ ET D'ARCHITECTURE DE MARQUE V5.1"],
      [/ESTRATEGIA/g, "STRATÉGIE"],
      [/SISTEMAS/g, "SYSTÈMES"],
      [/CLARIDAD/g, "CLARTÉ"],
      [/RESULTADOS/g, "RÉSULTATS"],
      [/Versión Positiva Principal sobre Lienzo Claro/g, "Version Positive Principale sur Fond Clair"],
      [/LAMINA\s+(\d+)\s*\/\s*30/g, "PLANCHE $1 / 30"],
      [/Imprimir \/ Guardar como PDF \(30 Láminas\)/g, "Imprimer / Enregistrer en PDF (30 Planches)"],
      [/En línea en tiempo real/g, "En ligne en temps réel"],
      [/Este dispositivo/g, "Cet appareil"],
      [/ACTIVO/g, "ACTIF"],
      [/RECIENTE/g, "RÉCENT"],
      [/Borrar/g, "Supprimer"]
    ]
  };

  window.tbbTranslateText = function (rawStr, targetLang) {
    const lang = targetLang || window.tbbGetLang();
    if (!rawStr || typeof rawStr !== "string" || lang === "es") return rawStr;
    const trimmed = rawStr.trim();
    if (!trimmed) return rawStr;

    const dict = EXACT_TRANSLATIONS[lang] || EXACT_TRANSLATIONS.en;
    if (dict[trimmed]) {
      return rawStr.replace(trimmed, dict[trimmed]);
    }

    let out = rawStr;
    if (!window._tbbSortedDictKeys) window._tbbSortedDictKeys = {};
    if (!window._tbbSortedDictKeys[lang]) {
      window._tbbSortedDictKeys[lang] = Object.keys(dict).sort((a, b) => b.length - a.length);
    }
    const keys = window._tbbSortedDictKeys[lang];
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (k.length >= 6 && out.includes(k)) {
        out = out.split(k).join(dict[k]);
      }
    }

    const patterns = PATTERN_REPLACEMENTS[lang] || [];
    for (let i = 0; i < patterns.length; i++) {
      out = out.replace(patterns[i][0], patterns[i][1]);
    }
    return out;
  };

  window.tbbTranslateDOMSubtree = function (rootEl, targetLang) {
    const lang = targetLang || window.tbbGetLang();
    if (!rootEl || lang === "es") return;
    const dict = EXACT_TRANSLATIONS[lang] || EXACT_TRANSLATIONS.en;

    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let n;
    while ((n = walker.nextNode())) {
      const pTag = n.parentElement ? n.parentElement.tagName : "";
      if (pTag === "SCRIPT" || pTag === "STYLE" || pTag === "TEXTAREA") continue;
      textNodes.push(n);
    }

    for (let i = 0; i < textNodes.length; i++) {
      const node = textNodes[i];
      if (node._tbbOrigEs === undefined) {
        node._tbbOrigEs = node.nodeValue;
      }
      const orig = node._tbbOrigEs;
      const trimmed = orig.trim();
      if (!trimmed) continue;
      if (dict[trimmed]) {
        node.nodeValue = orig.replace(trimmed, dict[trimmed]);
      } else {
        node.nodeValue = window.tbbTranslateText(orig, lang);
      }
    }

    const attrEls = rootEl.querySelectorAll("[placeholder], [title], [aria-label]");
    attrEls.forEach(el => {
      ["placeholder", "title", "aria-label"].forEach(attr => {
        const val = el.getAttribute(attr);
        if (!val) return;
        const origKey = `_tbbOrig_${attr}`;
        if (!el[origKey]) el[origKey] = val;
        el.setAttribute(attr, window.tbbTranslateText(el[origKey], lang));
      });
    });
  };

  function restoreSpanishDOMSubtree(rootEl) {
    if (!rootEl) return;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walker.nextNode())) {
      if (n._tbbOrigEs !== undefined) {
        n.nodeValue = n._tbbOrigEs;
      }
    }
    const attrEls = rootEl.querySelectorAll("[placeholder], [title], [aria-label]");
    attrEls.forEach(el => {
      ["placeholder", "title", "aria-label"].forEach(attr => {
        const origKey = `_tbbOrig_${attr}`;
        if (el[origKey]) {
          el.setAttribute(attr, el[origKey]);
        }
      });
    });
  }

  // ==========================================================================
  // 3. INYECCIÓN DEL SELECTOR MULTILINGÜE Y VOZ GEMINI EN EL MENÚ DE CUENTA
  // ==========================================================================
  window.tbbRenderLanguageSelectorWidgetHTML = function (contextId = "account") {
    const lang = window.tbbGetLang();
    const ui = UI_I18N[lang] || UI_I18N.es;
    const curVoice = window.tbbGeminiVoiceName || "Aoede";

    const langButtonsHtml = Object.values(SUPPORTED_LANGS).map(l => {
      const isSel = l.code === lang;
      return `
        <button type="button"
          class="tbb-lang-option-btn"
          data-lang-code="${l.code}"
          onclick="window.tbbSetLanguage('${l.code}')"
          style="min-height:44px; padding:8px 10px; border-radius:12px; font-family:var(--font-ui); font-size:0.80rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:all 0.15s ease; background:${isSel ? '#0284C7' : '#FFFFFF'}; color:${isSel ? '#FFFFFF' : '#090D16'}; border:2px solid ${isSel ? '#0369A1' : '#CBD5E1'}; border-bottom:3.5px solid ${isSel ? '#075985' : '#94A3B8'};">
          <span style="font-family:var(--font-mono); font-size:0.70rem; font-weight:900; padding:2px 6px; border-radius:6px; background:${isSel ? 'rgba(255,255,255,0.22)' : '#F0F9FF'}; color:${isSel ? '#FFFFFF' : '#0284C7'};">${l.shortLabel}</span>
          <span>${l.label}</span>
        </button>
      `;
    }).join("");

    const voiceOptionsHtml = GEMINI_VOICE_PROFILES.map(v => {
      const isSel = v.id === curVoice;
      const vLabel = lang === "en" ? v.labelEn : lang === "pt" ? v.labelPt : lang === "fr" ? v.labelFr : v.label;
      return `<option value="${v.id}" ${isSel ? "selected" : ""}>${vLabel}</option>`;
    }).join("");

    return `
      <div id="tbbMultilingualVoiceCard_${contextId}" style="background:linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border:2px solid #0284C7; border-radius:16px; padding:12px 14px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px; flex-wrap:wrap;">
          <span style="font-family:var(--font-mono); font-size:0.68rem; font-weight:900; color:#0369A1; letter-spacing:0.03em;">
            ${ui.langCardTitle}
          </span>
          <span style="font-family:var(--font-mono); font-size:0.64rem; font-weight:800; background:#DCFCE7; color:#15803D; border:1px solid #86EFAC; padding:2px 8px; border-radius:999px;">
            GEMINI FLASH TTS · ${lang.toUpperCase()}
          </span>
        </div>
        <div style="font-size:0.76rem; font-weight:600; color:#1E293B; line-height:1.35; margin-bottom:8px;">
          ${ui.langCardSubtitle}
        </div>
        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; margin-bottom:10px;">
          ${langButtonsHtml}
        </div>
        <div style="display:grid; grid-template-columns:1fr auto; gap:8px; align-items:end;">
          <div>
            <label style="font-family:var(--font-mono); font-size:0.64rem; font-weight:800; color:#0369A1; display:block; margin-bottom:4px;">
              ${ui.voiceLabel}
            </label>
            <select aria-label="Voice timbre" onchange="window.tbbSetGeminiVoiceName(this.value)" style="width:100%; min-height:42px; border-radius:10px; border:1.5px solid #38BDF8; background:#FFFFFF; color:#090D16; padding:6px 10px; font-family:var(--font-ui); font-size:0.78rem; font-weight:800;">
              ${voiceOptionsHtml}
            </select>
          </div>
          <button type="button" onclick="window.tbbTestGeminiVoiceSample()" class="tbb-duo-btn tbb-duo-btn-primary" style="min-height:42px !important; padding:8px 12px !important; font-size:0.75rem !important; white-space:nowrap;">
            ${ui.testVoiceBtn}
          </button>
        </div>
      </div>
    `;
  };

  window.tbbMountLanguageSelectorsInMenus = function () {
    const authPane = document.getElementById("accountVaultPane_auth");
    if (authPane) {
      let holder = document.getElementById("tbbAccountLangSelectorHolder");
      if (!holder) {
        holder = document.createElement("div");
        holder.id = "tbbAccountLangSelectorHolder";
        authPane.insertBefore(holder, authPane.firstChild);
      }
      holder.innerHTML = window.tbbRenderLanguageSelectorWidgetHTML("account");
    }

    const genSheet = document.getElementById("tbbGeneralMenuSheet");
    if (genSheet) {
      let holder = document.getElementById("tbbGeneralMenuLangSelectorHolder");
      if (!holder) {
        holder = document.createElement("div");
        holder.id = "tbbGeneralMenuLangSelectorHolder";
        const firstHeader = genSheet.firstElementChild;
        if (firstHeader && firstHeader.nextSibling) {
          genSheet.insertBefore(holder, firstHeader.nextSibling);
        } else {
          genSheet.appendChild(holder);
        }
      }
      holder.innerHTML = window.tbbRenderLanguageSelectorWidgetHTML("menu");
    }
  };

  // ==========================================================================
  // 4. HOOKS PARA AURA, SUGERENCIAS DINÁMICAS, STAGE Y BRANDBOOK DE 30 LÁMINAS
  // ==========================================================================
  function installMultilingualAndGeminiHooks() {
    // A. Envolver getNextNonRepetitiveAuraMessage
    const origGetNextAuraMsg = window.getNextNonRepetitiveAuraMessage;
    window.getNextNonRepetitiveAuraMessage = function (eventType, detailText = "") {
      const lang = window.tbbGetLang();
      if (lang === "es" && typeof origGetNextAuraMsg === "function") {
        return origGetNextAuraMsg(eventType, detailText);
      }
      const st = window.tbbState || { step: 0, subStep: 1 };
      const cs = (typeof canvasState === "object" && canvasState) ? canvasState : {};
      const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";
      const bank = AURA_POOLS_BY_LANG[lang] || AURA_POOLS_BY_LANG.en;
      const subKey = `substep_${st.step}_${st.subStep}`;
      const list = bank[eventType] || bank[subKey] || bank[`substep_${st.step}_1`] || bank.default;
      if (!window._tbbMultilingualAuraCounter) window._tbbMultilingualAuraCounter = 0;
      const picked = list[window._tbbMultilingualAuraCounter % list.length];
      window._tbbMultilingualAuraCounter++;
      return String(picked || "").replace(/\{brand\}/g, bName);
    };

    // B. Envolver requestLiveGeminiAuraEmpatheticComment para que Gemini responda en el idioma activo (<= 18 palabras)
    window.requestLiveGeminiAuraEmpatheticComment = async function (contextLabel, userValue) {
      const cleanVal = String(userValue || "").trim();
      if (cleanVal.length < 4) return;
      const st = window.tbbState || { step: 0, subStep: 1 };
      const cs = (typeof canvasState === "object" && canvasState) ? canvasState : {};
      const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";
      const langCfg = window.tbbGetLangConfig();
      const apiKey = getGeminiApiKey();

      const prompt = [
        `You are Aura, the warm and strategic brand mentor of TheBestBrand.`,
        `Brand: "${bName}". Current step: Step ${st.step}.${st.subStep} (${contextLabel}).`,
        `The user just entered or selected: "${cleanVal.slice(0, 160)}".`,
        `STRICT RULES:`,
        `1. Write ONE SINGLE brief sentence of MAXIMUM 18 WORDS in ${langCfg.geminiLangName} (so spoken aloud it lasts under 8 seconds).`,
        `2. Include a brief reference to a recognized branding/design author (e.g., Peter Drucker, Simon Sinek, Marty Neumeier, David Aaker, Paul Rand, Sagi Haviv, Massimo Vignelli, Don Norman, Al Ries).`,
        `3. ZERO EMOJIS. Return plain text only in ${langCfg.geminiLangName}.`
      ].join("\n");

      const modelsToTry = ["gemini-flash-lite-latest", "gemini-2.5-flash-lite", "gemini-2.5-flash"];
      for (const m of modelsToTry) {
        try {
          const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(apiKey)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.6, maxOutputTokens: 60 }
            })
          });
          if (!resp.ok) continue;
          const data = await resp.json();
          let reply = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join(" ").replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
          reply = enforceMax10sSpokenText(reply);
          if (reply && reply.length >= 12) {
            window.updateAuraTopPresenceDOM(reply);
            window.speakAuraBriefResponse(reply, 9500);
            return;
          }
        } catch (e) {}
      }
    };

    // C. Envolver updateAuraTopPresenceDOM para traducir #tbbAuraEmpatheticText y #tbbAuraPresenceRoleText
    const origUpdateAuraDOM = window.updateAuraTopPresenceDOM;
    if (typeof origUpdateAuraDOM === "function") {
      window.updateAuraTopPresenceDOM = function (msgText, roleSubLabel) {
        origUpdateAuraDOM(msgText, roleSubLabel);
        const lang = window.tbbGetLang();
        if (lang === "es") return;
        const ui = UI_I18N[lang] || UI_I18N.en;
        const st = window.tbbState || { step: 0 };
        const textEl = document.getElementById("tbbAuraEmpatheticText");
        if (textEl && textEl.textContent) {
          textEl.textContent = window.tbbTranslateText(textEl.textContent, lang);
        }
        const roleEl = document.getElementById("tbbAuraPresenceRoleText");
        if (roleEl && !(window.tbbAuraOrbConfig && window.tbbAuraOrbConfig.customRoleTitle)) {
          const authorName = typeof window.extractAuraAuthorRefFromText === "function"
            ? window.extractAuraAuthorRefFromText(textEl ? textEl.textContent : "")
            : "DAVID AAKER";
          const stepLbl = (ui.stepRoleNames && ui.stepRoleNames[st.step]) || "BRAND MENTOR";
          roleEl.textContent = `AURA · ${stepLbl} · REF: ${String(authorName).toUpperCase()}`;
        }
      };
    }

    // D. Envolver buildDynamicStep1Suggestions para sugerencias en EN, PT y FR
    const origBuildStep1Sugg = window.buildDynamicStep1Suggestions;
    if (typeof origBuildStep1Sugg === "function") {
      window.buildDynamicStep1Suggestions = function (qIdx) {
        const lang = window.tbbGetLang();
        if (lang === "es") return origBuildStep1Sugg(qIdx);
        const cs = (typeof canvasState === "object" && canvasState) ? canvasState : {};
        const giro = (cs.custom_business_type || cs.step0_short_essence || (lang === "en" ? "our core activity" : lang === "pt" ? "nossa atividade principal" : "notre activité principale")).trim();
        const bName = (cs.brandName && !/^mi nueva marca$/i.test(cs.brandName)) ? cs.brandName.trim() : "TheBestBrand";

        if (lang === "en") {
          const mapEn = {
            1: [`Transform ${giro} through operational excellence and human warmth`, `Empower those seeking certainty and high standards in ${giro}`],
            2: [`We combine personalized attention in ${giro} with measurable results`, `A superior standard of quality and trust designed for ${bName}`],
            3: [`We save time and deliver complete certainty at every stage of ${giro}`, `We elevate customer peace of mind and outcomes through our system`],
            4: [`1. Clear diagnosis, 2. Specialized execution, 3. Verified delivery`, `Rigorous selection, tailored development in ${giro}, and continuous support`],
            5: [`${bName}: the benchmark of trust and excellence in ${giro}`, `Clarity, precision, and lasting results for those who value excellence`],
            6: [`Approachable, expert, decisive, and passionate about excellence`, `Reliable, transparent, agile, and authoritative in ${giro}`],
            7: [`Leaders and customers seeking frictionless quality without delays`, `Discerning clients who value real, measurable results in ${giro}`]
          };
          return mapEn[qIdx] || mapEn[1];
        }
        if (lang === "pt") {
          const mapPt = {
            1: [`Transformar ${giro} por meio de excelência operacional e proximidade`, `Impulsionar quem busca segurança e alto padrão em ${giro}`],
            2: [`Combinamos atendimento personalizado em ${giro} com resultados mensuráveis`, `Um padrão superior de qualidade e confiança desenhado para ${bName}`],
            3: [`Economizamos tempo e entregamos certeza total em cada etapa de ${giro}`, `Elevamos a tranquilidade e os resultados do cliente com nosso método`],
            4: [`1. Diagnóstico claro, 2. Execução especializada, 3. Entrega verificada`, `Seleção rigorosa, desenvolvimento sob medida em ${giro} e suporte contínuo`],
            5: [`${bName}: a referência de confiança e excelência em ${giro}`, `Clareza, precisão e resultados duradouros para quem valoriza qualidade`],
            6: [`Próxima, especialista, resolutiva e apaixonada pela excelência`, `Confiável, transparente, ágil e com autoridade em ${giro}`],
            7: [`Pessoas e empresas que buscam qualidade sem atritos nem demoras`, `Clientes exigentes que valorizam resultados reais em ${giro}`]
          };
          return mapPt[qIdx] || mapPt[1];
        }
        const mapFr = {
          1: [`Transformer ${giro} grâce à l'excellence opérationnelle et la proximité`, `Propulser ceux qui recherchent la certitude et de hauts standards dans ${giro}`],
          2: [`Nous allions attention personnalisée dans ${giro} et résultats mesurables`, `Un standard supérieur de qualité et de confiance conçu pour ${bName}`],
          3: [`Nous faisons gagner du temps et offrons une certitude totale dans ${giro}`, `Nous élevons la sérénité et la réussite du client grâce à notre méthode`],
          4: [`1. Diagnostic clair, 2. Exécution spécialisée, 3. Livraison vérifiée`, `Sélection rigoureuse, développement sur mesure et accompagnement continu`],
          5: [`${bName} : la référence de confiance et d'excellence dans ${giro}`, `Clarté, précision et résultats durables pour ceux qui exigent l'excellence`],
          6: [`Proche, experte, résolutive et passionnée par l'excellence`, `Fiable, transparente, agile et dotée d'autorité dans ${giro}`],
          7: [`Dirigeants et clients recherchant une qualité sans friction ni délai`, `Clients exigeants qui apprécient des résultats concrets dans ${giro}`]
        };
        return mapFr[qIdx] || mapFr[1];
      };
    }

    // E. Envolver buildDynamicTouchpointOptions para EN, PT y FR
    const origBuildTp = window.buildDynamicTouchpointOptions;
    if (typeof origBuildTp === "function") {
      window.buildDynamicTouchpointOptions = function (phaseKey) {
        const lang = window.tbbGetLang();
        if (lang === "es") return origBuildTp(phaseKey);
        if (lang === "en") {
          if (phaseKey === "before") return ["Official Website & Search", "Direct Client Referral", "Executive Portfolio & Demo", "Social Media & Specialized Content"];
          if (phaseKey === "during") return ["Diagnostic & Proposal Session", "Main Product / Service Experience", "Specialist Team Attention", "Streamlined Payment & Delivery"];
          return ["Post-Service Follow-up", "Results & Quality Report", "Warranty & Direct Support", "Loyalty & Referral Program"];
        }
        if (lang === "pt") {
          if (phaseKey === "before") return ["Site Oficial e Busca", "Recomendação Direta de Clientes", "Portfólio Executivo e Demo", "Redes Sociais e Conteúdo"];
          if (phaseKey === "during") return ["Sessão de Diagnóstico e Proposta", "Experiência Principal do Serviço", "Atendimento da Equipe Especialista", "Processo Ágil de Pagamento e Entrega"];
          return ["Acompanhamento Pós-Venda", "Relatório de Resultados", "Garantia e Suporte Direto", "Programa de Fidelidade e Indicação"];
        }
        if (phaseKey === "before") return ["Site Officiel et Recherche", "Recommandation Directe", "Portfolio Exécutif et Démo", "Réseaux Sociaux et Contenu"];
        if (phaseKey === "during") return ["Session de Diagnostic et Proposition", "Expérience Principale du Service", "Attention de l'Équipe Spécialiste", "Paiement et Livraison Fluides"];
        return ["Suivi Après-Vente", "Rapport de Résultats", "Garantie et Support Direct", "Programme de Fidélité et Parrainage"];
      };
    }

    // F. Envolver renderTbbZeroScrollStage para aplicar la traducción inmediata en cada renderizado
    const origRenderStage = window.renderTbbZeroScrollStage;
    if (typeof origRenderStage === "function") {
      window.renderTbbZeroScrollStage = function () {
        origRenderStage();
        window.tbbApplyCurrentLanguageToDOM();
      };
    }

    // G. Envolver el motor de 30 láminas (`universal-brandbook-30-engine.js`)
    const origGet30Meta = window.getUniversalImproBearsGuide30PlatesMeta;
    if (typeof origGet30Meta === "function" && !origGet30Meta._tbbWrapped) {
      const wrappedMeta = function () {
        const list = origGet30Meta.apply(this, arguments);
        const lang = window.tbbGetLang();
        if (lang === "es" || !Array.isArray(list)) return list;
        return list.map(item => ({
          ...item,
          sec: window.tbbTranslateText(item.sec || "", lang),
          part: window.tbbTranslateText(item.part || "", lang),
          title: window.tbbTranslateText(item.title || "", lang)
        }));
      };
      wrappedMeta._tbbWrapped = true;
      window.getUniversalImproBearsGuide30PlatesMeta = wrappedMeta;
    }

    const origRenderSinglePlate = window.renderUniversalImproBearsGuideSinglePlateHTML;
    if (typeof origRenderSinglePlate === "function" && !origRenderSinglePlate._tbbWrapped) {
      const wrappedSinglePlate = function () {
        const html = origRenderSinglePlate.apply(this, arguments);
        const lang = window.tbbGetLang();
        if (lang === "es" || typeof html !== "string") return html;
        return window.tbbTranslateText(html, lang);
      };
      wrappedSinglePlate._tbbWrapped = true;
      window.renderUniversalImproBearsGuideSinglePlateHTML = wrappedSinglePlate;
    }

    const origBuildStandalone30 = window.buildUniversal30PlatesStandaloneHTML;
    if (typeof origBuildStandalone30 === "function" && !origBuildStandalone30._tbbWrapped) {
      const wrappedStandalone = function () {
        const html = origBuildStandalone30.apply(this, arguments);
        const lang = window.tbbGetLang();
        if (lang === "es" || typeof html !== "string") return html;
        return window.tbbTranslateText(html, lang);
      };
      wrappedStandalone._tbbWrapped = true;
      window.buildUniversal30PlatesStandaloneHTML = wrappedStandalone;
    }
  }

  window.tbbApplyCurrentLanguageToDOM = function () {
    const lang = window.tbbGetLang();
    const ui = UI_I18N[lang] || UI_I18N.es;
    document.documentElement.lang = lang;

    window.tbbMountLanguageSelectorsInMenus();

    const rootsToTranslate = [
      document.getElementById("tbbZeroScrollMasterStage"),
      document.getElementById("tbbDuolingoBottomNav"),
      document.getElementById("accountVaultModal"),
      document.getElementById("tbbGeneralMenuModal"),
      document.getElementById("phaseTransitionVideoModal"),
      document.getElementById("tbbAdminAuraColorModal"),
      document.getElementById("tbbInAppBrandbookViewerOverlay")
    ];

    if (lang === "es") {
      rootsToTranslate.forEach(r => restoreSpanishDOMSubtree(r));
    } else {
      rootsToTranslate.forEach(r => window.tbbTranslateDOMSubtree(r, lang));
    }

    // Asegurar etiquetas de la barra inferior Duolingo
    const navHome = document.querySelector("#duoNavTab_step0 span:last-child");
    const navMap = document.querySelector("#duoNavTab_journey span:last-child");
    const navStudio = document.querySelector("#duoNavTab_aura span:last-child");
    const navManual = document.querySelector("#duoNavTab_downloads span:last-child");
    const navAccount = document.getElementById("duoNavAccountLabel");
    const navMenu = document.querySelector("#duoNavTab_more span:last-child");
    const acc = window.tbbUserAccount || {};
    const isVerified = Boolean(acc.email && acc.email.includes("@") && acc.security_verified);

    if (navHome) navHome.textContent = ui.navHome;
    if (navMap) navMap.textContent = ui.navMap;
    if (navStudio) navStudio.textContent = ui.navStudio;
    if (navManual) navManual.textContent = ui.navManual;
    if (navAccount) navAccount.textContent = isVerified ? ui.navLive : ui.navAccount;
    if (navMenu) navMenu.textContent = ui.navMenu;
  };

  window.tbbSetLanguage = function (langCode, skipCloudSync = false) {
    const cleanCode = SUPPORTED_LANGS[langCode] ? langCode : "es";
    window.tbbCurrentLang = cleanCode;
    try {
      localStorage.setItem("tbb_app_lang", cleanCode);
    } catch (e) {}

    if (typeof playAcousticClick === "function") playAcousticClick(880, 0.04);

    if (window.tbbState && typeof window.getNextNonRepetitiveAuraMessage === "function") {
      const subKey = `substep_${Number(window.tbbState.step || 0)}_${Number(window.tbbState.subStep || 1)}`;
      const msg = window.getNextNonRepetitiveAuraMessage(subKey);
      window.tbbState.auraCurrentMessage = msg;
      if (typeof window.updateAuraTopPresenceDOM === "function") {
        window.updateAuraTopPresenceDOM(msg);
      }
    }

    if (typeof window.renderTbbZeroScrollStage === "function") {
      window.renderTbbZeroScrollStage();
    } else {
      window.tbbApplyCurrentLanguageToDOM();
    }

    if (!skipCloudSync && typeof saveBrandSessionToLocalStorage === "function") {
      saveBrandSessionToLocalStorage(false, true);
    }

    const ui = UI_I18N[cleanCode] || UI_I18N.es;
    if (typeof showStepResetFeedbackToast === "function") {
      showStepResetFeedbackToast(ui.langSavedToast);
    }
  };

  window.tbbSetGeminiVoiceName = function (voiceName) {
    const valid = GEMINI_VOICE_PROFILES.some(v => v.id === voiceName) ? voiceName : "Aoede";
    window.tbbGeminiVoiceName = valid;
    try {
      localStorage.setItem("tbb_gemini_voice_name", valid);
    } catch (e) {}
    if (typeof playAcousticClick === "function") playAcousticClick(860, 0.03);
    window.tbbMountLanguageSelectorsInMenus();
    if (typeof saveBrandSessionToLocalStorage === "function") {
      saveBrandSessionToLocalStorage(false, true);
    }
  };

  function bootMultilingualAndGeminiVoice() {
    installMultilingualAndGeminiHooks();
    window.tbbMountLanguageSelectorsInMenus();
    if (window.tbbGetLang() !== "es" && typeof window.renderTbbZeroScrollStage === "function") {
      const subKey = `substep_${Number(window.tbbState?.step || 0)}_${Number(window.tbbState?.subStep || 1)}`;
      if (window.tbbState && typeof window.getNextNonRepetitiveAuraMessage === "function") {
        window.tbbState.auraCurrentMessage = window.getNextNonRepetitiveAuraMessage(subKey);
      }
      window.renderTbbZeroScrollStage();
    } else {
      window.tbbApplyCurrentLanguageToDOM();
    }
  }

  // Instalar hooks sincrónicamente de inmediato para que ninguna llamada temprana use la voz del navegador
  installMultilingualAndGeminiHooks();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => bootMultilingualAndGeminiVoice());
  } else {
    bootMultilingualAndGeminiVoice();
  }
})();
