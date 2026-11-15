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
      flag: "🇪🇸",
      locale: "es-MX",
      label: "Español",
      shortLabel: "ES",
      nativeName: "Español (Latinoamérica / España)",
      geminiLangName: "Spanish"
    },
    en: {
      code: "en",
      flag: "🇺🇸",
      locale: "en-US",
      label: "English",
      shortLabel: "EN",
      nativeName: "English (International)",
      geminiLangName: "English"
    },
    pt: {
      code: "pt",
      flag: "🇧🇷",
      locale: "pt-BR",
      label: "Português",
      shortLabel: "PT",
      nativeName: "Português (Brasil / Portugal)",
      geminiLangName: "Portuguese"
    },
    fr: {
      code: "fr",
      flag: "🇫🇷",
      locale: "fr-FR",
      label: "Français",
      shortLabel: "FR",
      nativeName: "Français (International)",
      geminiLangName: "French"
    },
    de: {
      code: "de",
      flag: "🇩🇪",
      locale: "de-DE",
      label: "Deutsch",
      shortLabel: "DE",
      nativeName: "Deutsch (Deutschland / DACH)",
      geminiLangName: "German"
    },
    it: {
      code: "it",
      flag: "🇮🇹",
      locale: "it-IT",
      label: "Italiano",
      shortLabel: "IT",
      nativeName: "Italiano (Italia)",
      geminiLangName: "Italian"
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
      const params = new URLSearchParams(window.location.search || "");
      const urlLang = (params.get("lang") || "").toLowerCase();
      if (urlLang && SUPPORTED_LANGS[urlLang]) {
        localStorage.setItem("tbb_app_lang", urlLang);
        localStorage.setItem("thebestbrand_lang_v90", urlLang);
        return urlLang;
      }
      const savedWeb = (localStorage.getItem("thebestbrand_lang_v90") || "").toLowerCase();
      const savedApp = (localStorage.getItem("tbb_app_lang") || "").toLowerCase();
      if (savedWeb && SUPPORTED_LANGS[savedWeb]) {
        localStorage.setItem("tbb_app_lang", savedWeb);
        return savedWeb;
      }
      if (savedApp && SUPPORTED_LANGS[savedApp]) {
        localStorage.setItem("thebestbrand_lang_v90", savedApp);
        return savedApp;
      }
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
    return "";
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

    // 3. Respaldo Cloud Backend (/api/tts/gemini local o en Railway Cloud)
    const ttsEndpoints = [
      "/api/tts/gemini",
      "https://thebestbrand-api-studio-production.up.railway.app/api/tts/gemini"
    ];
    for (let j = 0; j < ttsEndpoints.length; j++) {
      try {
        const resTts = await fetch(ttsEndpoints[j], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: cleanText, llm_api_key: apiKey || "" })
        });
        if (resTts.ok) {
          const dataTts = await resTts.json();
          if (dataTts && dataTts.audio_wav_base64) {
            const rawBytes = base64ToUint8Array(dataTts.audio_wav_base64);
            if (rawBytes && rawBytes.byteLength > 100) {
              const payload = {
                wavBytes: rawBytes,
                durationSec: 6.0,
                sampleRate: 24000,
                modelUsed: "gemini-cloud-neural",
                voiceName,
                langCode
              };
              window._tbbGeminiTtsCache.set(cacheKey, payload);
              idbSaveVoiceClip(cacheKey, payload);
              return payload;
            }
          }
        }
      } catch (e) {}
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
      fr: "Bonjour, je suis Aura avec la voix neurale native de Gemini. Comme l'affirme Marty Neumeier, une marque claire inspire confiance.",
      de: "Hallo, ich bin Aura mit der nativen neuronalen Stimme von Gemini. Wie Marty Neumeier sagt, schafft eine klare Marke sofortiges Vertrauen.",
      it: "Ciao, sono Aura con la voce neurale nativa di Gemini. Come afferma Marty Neumeier, un brand chiaro genera fiducia immediata."
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
        6: "ÉTAPE 6 · 36 PLANCHES"
      }
    },
    de: {
      mapBtn: "Karte",
      videoBtn: "Video",
      stepLabel: "Schritt",
      ofLabel: "von",
      backBtn: "Zurück",
      nextBtn: "Weiter",
      finishBtn: "Abschließen",
      speakBtn: "Sprechen",
      dictateBizBtn: "Branche diktieren",
      iterateGeminiBtn: "Mit Gemini iterieren",
      navHome: "Start",
      navMap: "Karte",
      navStudio: "Studio",
      navManual: "Handbuch",
      navAccount: "Konto",
      navLive: "Live",
      navMenu: "Menü",
      auraRoleMentor: "AURA · MARKENMENTORIN",
      auraRoleAdmin: "AURA · IMPROBEARS ADMIN",
      langCardTitle: "SYSTEMSPRACHE & NEURONALE GEMINI-STIMME",
      langCardSubtitle: "Wähle die Sprache für die gesamte Plattform, das 36-Seiten-Handbuch und Auras neuronale Stimme (Gemini Flash TTS):",
      voiceLabel: "NEURONALE GEMINI-STIMMFARBE (<= 10s):",
      testVoiceBtn: "Gemini-Stimme testen",
      langSavedToast: "Sprache auf der gesamten Plattform aktualisiert: Deutsch",
      stepRoleNames: {
        0: "SCHRITT 0 · START",
        1: "SCHRITT 1 · ZWECK",
        2: "SCHRITT 2 · TOUCHPOINTS",
        3: "SCHRITT 3 · NAMING",
        4: "SCHRITT 4 · PERSÖNLICHKEIT",
        5: "SCHRITT 5 · LOGO-STUDIO",
        6: "SCHRITT 6 · 36 SEITEN"
      }
    },
    it: {
      mapBtn: "Mappa",
      videoBtn: "Video",
      stepLabel: "Passo",
      ofLabel: "di",
      backBtn: "Indietro",
      nextBtn: "Avanti",
      finishBtn: "Concludi",
      speakBtn: "Parla",
      dictateBizBtn: "Dettare Settore",
      iterateGeminiBtn: "Itera con Gemini",
      navHome: "Inizio",
      navMap: "Mappa",
      navStudio: "Atelier",
      navManual: "Manuale",
      navAccount: "Account",
      navLive: "Live",
      navMenu: "Menu",
      auraRoleMentor: "AURA · MENTORE DI BRAND",
      auraRoleAdmin: "AURA · ADMIN IMPROBEARS",
      langCardTitle: "LINGUA DEL SISTEMA E VOCE NEURALE GEMINI",
      langCardSubtitle: "Seleziona la lingua di tutta la piattaforma, del manuale di 36 tavole e della voce neurale di Aura (Gemini Flash TTS):",
      voiceLabel: "TIMBRO VOCALE NEURALE GEMINI (<= 10s):",
      testVoiceBtn: "Ascolta Voce Gemini",
      langSavedToast: "Lingua aggiornata su tutta la piattaforma: Italiano",
      stepRoleNames: {
        0: "PASSO 0 · INIZIO",
        1: "PASSO 1 · SCOPO",
        2: "PASSO 2 · TOUCHPOINTS",
        3: "PASSO 3 · NAMING",
        4: "PASSO 4 · PERSONALITÀ",
        5: "PASSO 5 · STUDIO LOGO",
        6: "PASSO 6 · 36 TAVOLE"
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
    },
    de: {
      "substep_0_1": [
        "Wie Peter Drucker lehrt, gibt die klare Definition deines Startziels {brand} sofortige strategische Richtung.",
        "Laut Marty Neumeier beginnt eine starke Marke damit, ihr genaues Wachstumsziel heute klar zu wählen."
      ],
      "substep_0_2": [
        "Nach Paul Rand gibt uns dein aktueller Name oder dein bestehendes Logo eine klare visuelle Synthese voller Bedeutung.",
        "Wie Sagi Haviv erklärt, können wir deinen bestehenden Namen oder dein Logo bewahren oder präzise weiterentwickeln."
      ],
      "substep_0_3": [
        "Wie Al Ries betont, definiert eine einfache Beschreibung deiner Branche deine einzigartige Kategorie im Markt.",
        "Nach Peter Drucker ist das Verständnis dessen, was du für wen lieferst, das Fundament jeder Strategie."
      ],
      "substep_1_1": [
        "Wie Simon Sinek im Golden Circle zeigt, kaufen Menschen warum {brand} existiert.",
        "Nach David Aaker leitet ein echter Unternehmenszweck jede strategische und visuelle Entscheidung von {brand}."
      ],
      "substep_1_2": [
        "Laut Alex Osterwalder verhindert ein klares Wertversprechen, dass {brand} nur über den Preis konkurriert.",
        "Wie Michael Porter hervorhebt, macht präzise Differenzierung {brand} in seinem Markt unersetzlich."
      ],
      "substep_1_3": [
        "Wie Philip Kotler zeigt, verändern unvergessliche Marken den Alltag ihrer Kunden nachhaltig positiv.",
        "Nach Donald Miller wächst {brand}, wenn du klar zeigst, wie du das Leben deines Kunden verbesserst."
      ],
      "substep_1_4": [
        "Laut Donald Miller in StoryBrand baut eine klare 3-Schritte-Methode jede Kaufhürde ab.",
        "Wie Don Norman erklärt, vermittelt ein klarer Prozess sofortige Sicherheit und Professionalität für {brand}."
      ],
      "substep_1_5": [
        "Wie Al Ries in Positioning lehrt, erobert ein kurzes Markenversprechen einen festen Platz im Kopf.",
        "Nach Marty Neumeier vervielfacht ein klarer Kernsatz die Wirkung von {brand}."
      ],
      "substep_1_6": [
        "Nach Jennifer Aaker schafft die klare Persönlichkeit von {brand} menschliche Nähe und Charakter.",
        "Wie Carl Jung mit seinen Archetypen zeigt, verbindet der richtige Tonfall emotional mit deinem Publikum."
      ],
      "substep_1_7": [
        "Wie Seth Godin betont, gibt das tiefe Verständnis deines Idealkunden der gesamten Strategie Sinn.",
        "Nach Alex Osterwalder richtet Empathie für deinen Kunden jedes Detail von {brand} präzise aus."
      ],
      "substep_2_1": [
        "Nach Lemon und Verhoef prägen die Touchpoints vor dem Kauf den ersten Eindruck von {brand}.",
        "Wie Jan Carlzon lehrt, weckt der erste Moment der Wahrheit das initiale Vertrauen in deine Marke."
      ],
      "substep_2_2": [
        "Wie Jan Carlzon betont, ist der direkte Kontakt während des Kaufs dein entscheidender Moment der Wahrheit.",
        "Nach Don Norman macht der Abbau von Reibung im Service das Versprechen von {brand} erlebbar."
      ],
      "substep_2_3": [
        "Nach Don Norman verwandelt eine exzellente Nachbetreuung jeden Kunden in einen treuen Botschafter.",
        "Wie Lemon und Verhoef zeigen, steigert die Phase nach dem Kauf die Kundenbindung von {brand}."
      ],
      "substep_3_1": [
        "Wie Alexandra Watkins im SMILE-Modell erklärt, entsteht ein großer Name aus bedeutungsvollen Wurzeln.",
        "Nach Alina Wheeler verleiht die Verbindung von Strategie und Naming {brand} rechtliche Stärke."
      ],
      "substep_3_2": [
        "Nach David Placek maximiert ein prägnanter Klang von zwei bis drei Silben die Merkfähigkeit.",
        "Wie Al Ries zeigt, erleichtert ein klangvoller, kurzer Name die Positionierung von {brand}."
      ],
      "substep_3_3": [
        "Wie Alina Wheeler betont, erklärt ein präziser Slogan den Wert von {brand} in wenigen Sekunden.",
        "Nach Alexandra Watkins bilden Name und Slogan nun eine schutzfähige verbale Identität."
      ],
      "substep_4_1": [
        "Nach Mitsuo Nagamachi und Kansei Engineering übersetzen wir Emotionen in exakte Geometrie für {brand}.",
        "Wie Charles Osgood zeigte, kalibrieren diese Achsen die visuelle Atmosphäre von {brand}."
      ],
      "substep_4_2": [
        "Nach Charles Osgood definiert die Balance zwischen Tradition und Avantgarde deinen visuellen Charakter.",
        "Wie Don Norman betont, kommuniziert viszerales Design Vertrauen noch vor dem ersten gelesenen Wort."
      ],
      "substep_4_3": [
        "Nach Max Wertheimer und der Gestaltpsychologie merkt sich das Auge klare geometrische Synthese am besten.",
        "Wie Paul Rand lehrt, bereitet geometrische Einfachheit {brand} auf jede Skalierung vor."
      ],
      "substep_4_4": [
        "Wie Robert Bringhurst schrieb, ist Typografie sichtbare Sprache, die {brand} Stimme und Autorität verleiht.",
        "Nach Massimo Vignelli trägt eine edle Schriftfamilie das gesamte visuelle System von {brand}."
      ],
      "substep_4_5": [
        "Nach Sagi Haviv ist eine einfache, unverwechselbare Grundstruktur das Fundament jedes großen Symbols.",
        "Wie Paul Rand lehrt, gibt uns diese visuelle Keimzelle einen starken Startpunkt für {brand}."
      ],
      "substep_5_1": [
        "Wie Josef Albers in Interaction of Color zeigte, weckt die Farbpalette Emotionen noch vor Worten.",
        "Nach Jony Ive verleihen Materialität und Lichtbrechung dem Symbol von {brand} greifbare Präsenz."
      ],
      "substep_5_2": [
        "Nach Paul Rand und Sagi Haviv iterieren wir frei, bis das Symbol von {brand} unvergesslich ist.",
        "Wie Jony Ive lehrt, hebt die Verfeinerung jeder Kurve im 1:1-Format die Designqualität auf Höchstniveau."
      ],
      "substep_6_1": [
        "Wie Massimo Vignelli lehrte, schützt ein modulares Handbuch die Kohärenz von {brand} auf jeder Tafel.",
        "Nach Josef Müller-Brockmann strahlt die geometrische Ordnung dieser 36 Seiten höchste editorische Präzision aus."
      ],
      "substep_6_2": [
        "Wie Danne und Blackburn im NASA-Handbuch zeigten, sichern deine Vektordateien perfekte Reproduktion.",
        "Nach Alina Wheeler krönt die Übergabe produktionsfertiger Dateien eine erfolgreiche Markenidentität."
      ],
      "default": [
        "Wie David Aaker lehrt, stärkt jede Feinabstimmung in {brand} die Kohärenz und den Wert deiner Identität.",
        "Nach Simon Sinek verbindet Klarheit in diesem Schritt den Zweck von {brand} direkt mit deinem Publikum.",
        "Wie Sagi Haviv betont, machen Einfachheit und Konsistenz {brand} auf jedem Medium unverwechselbar."
      ]
    },
    it: {
      "substep_0_1": [
        "Come insegna Peter Drucker, definire il tuo obiettivo iniziale dà direzione strategica immediata a {brand}.",
        "Secondo Marty Neumeier, un brand chiaro inizia scegliendo con precisione il proprio traguardo di crescita."
      ],
      "substep_0_2": [
        "Secondo Paul Rand, partire dal tuo logo o nome attuale ci offre una sintesi visiva chiara e densa di significato.",
        "Come spiega Sagi Haviv, se hai già un nome o un logo possiamo preservarlo o farlo evolvere con precisione."
      ],
      "substep_0_3": [
        "Come afferma Al Ries, descrivere con semplicità il tuo settore definisce la tua categoria unica sul mercato.",
        "Secondo Peter Drucker, comprendere ciò che offri e per chi è la base di ogni strategia."
      ],
      "substep_1_1": [
        "Come spiega Simon Sinek nel Cerchio d'Oro, le persone comprano il perché {brand} esiste.",
        "Secondo David Aaker, uno scopo autentico guida ogni decisione strategica e visiva di {brand}."
      ],
      "substep_1_2": [
        "Secondo Alex Osterwalder, una proposta di valore chiara evita che {brand} competa solo sul prezzo.",
        "Come evidenzia Michael Porter, differenziarsi con precisione rende {brand} insostituibile nel suo mercato."
      ],
      "substep_1_3": [
        "Come indica Philip Kotler, i brand memorabili trasformano positivamente la vita quotidiana dei clienti.",
        "Secondo Donald Miller, mostrare come migliori la giornata del cliente fa emergere {brand}."
      ],
      "substep_1_4": [
        "Secondo Donald Miller in StoryBrand, riassumere il tuo metodo in tre passi elimina ogni attrito d'acquisto.",
        "Come spiega Don Norman, un processo chiaro trasmette certezza immediata e professionalità per {brand}."
      ],
      "substep_1_5": [
        "Come insegna Al Ries in Positioning, una promessa breve conquista un posto unico nella mente.",
        "Secondo Marty Neumeier, sintetizzare il messaggio centrale in una frase chiara moltiplica l'impatto di {brand}."
      ],
      "substep_1_6": [
        "Secondo Jennifer Aaker, definire la personalità di {brand} crea affinità umana e carattere.",
        "Come spiega Carl Jung con gli archetipi, il tono di voce connette emotivamente con il tuo pubblico."
      ],
      "substep_1_7": [
        "Come afferma Seth Godin, conoscere a fondo il cliente ideale dà senso all'intera strategia.",
        "Secondo Alex Osterwalder, entrare in empatia con ciò che il cliente apprezza allinea ogni dettaglio di {brand}."
      ],
      "substep_2_1": [
        "Secondo Lemon e Verhoef, i punti di contatto prima dell'acquisto costruiscono la prima impressione di {brand}.",
        "Come insegna Jan Carlzon, il primo momento della verità accende la fiducia iniziale verso il tuo brand."
      ],
      "substep_2_2": [
        "Come sottolinea Jan Carlzon, il contatto diretto durante l'acquisto è il tuo momento della verità decisivo.",
        "Secondo Don Norman, eliminare l'attrito durante il servizio trasforma la promessa di {brand} in realtà."
      ],
      "substep_2_3": [
        "Secondo Don Norman, la cura post-vendita trasforma ogni cliente in un ambasciatore fedele.",
        "Come dimostrano Lemon e Verhoef, la fase successiva all'acquisto moltiplica la fedeltà verso {brand}."
      ],
      "substep_3_1": [
        "Come spiega Alexandra Watkins nel modello SMILE, un grande nome nasce da radici ricche di significato.",
        "Secondo Alina Wheeler, collegare strategia e identità verbale conferisce solidità legale a {brand}."
      ],
      "substep_3_2": [
        "Secondo David Placek, il simbolismo fonetico di due o tre sillabe massimizza la memorabilità.",
        "Come afferma Al Ries, un nome sonoro e breve facilita il posizionamento di {brand}."
      ],
      "substep_3_3": [
        "Come evidenzia Alina Wheeler, affiancare a {brand} un descrittore chiaro comunica il tuo valore in pochi secondi.",
        "Secondo Alexandra Watkins, nome e slogan formano ora un'identità verbale pronta per la registrazione."
      ],
      "substep_4_1": [
        "Secondo Mitsuo Nagamachi e il Kansei Engineering, traduciamo le emozioni in parametri geometrici per {brand}.",
        "Come spiega Charles Osgood, questi assi semantici calibrano l'atmosfera visiva esatta di {brand}."
      ],
      "substep_4_2": [
        "Come ha dimostrato Charles Osgood, bilanciare tradizione e avanguardia definisce il tuo carattere visivo.",
        "Secondo Don Norman, il design viscerale comunica fiducia prima ancora di leggere una sola parola."
      ],
      "substep_4_3": [
        "Secondo Max Wertheimer e la psicologia della Gestalt, l'occhio ricorda meglio le forme di chiara sintesi.",
        "Come insegna Paul Rand, calibrare la semplicità geometrica prepara {brand} a qualsiasi scala."
      ],
      "substep_4_4": [
        "Come scrisse Robert Bringhurst, la tipografia è linguaggio visibile che dà voce e autorità a {brand}.",
        "Secondo Massimo Vignelli, scegliere una famiglia tipografica nobile sostiene l'intero sistema di {brand}."
      ],
      "substep_4_5": [
        "Secondo Sagi Haviv, una struttura di base semplice e distintiva è il fondamento di ogni grande simbolo.",
        "Come insegna Paul Rand, definire questo seme visivo offre un solido punto di partenza per {brand}."
      ],
      "substep_5_1": [
        "Come dimostrò Josef Albers in Interazione del colore, la palette risveglia l'emozione prima delle parole.",
        "Secondo Jony Ive, finitura materica e rifrazione della luce donano presenza tattile al simbolo di {brand}."
      ],
      "substep_5_2": [
        "Seguendo Paul Rand e Sagi Haviv, itera liberamente finché il simbolo di {brand} non diventa indimenticabile.",
        "Come insegna Jony Ive, rifinire ogni curva e proporzione in vista 1:1 eleva l'eccellenza del design."
      ],
      "substep_6_1": [
        "Come insegnava Massimo Vignelli, un manuale su griglia modulare protegge la coerenza di {brand} in ogni tavola.",
        "Secondo Josef Müller-Brockmann, l'ordine geometrico di queste 36 tavole proietta rigore editoriale mondiale."
      ],
      "substep_6_2": [
        "Come stabilirono Danne e Blackburn nel manuale NASA, i tuoi vettori garantiscono una riproduzione impeccabile.",
        "Secondo Alina Wheeler, consegnare file vettoriali pronti per la produzione corona un'identità di successo."
      ],
      "default": [
        "Come insegna David Aaker, ogni perfezionamento in {brand} rafforza la coerenza e il valore della tua identità.",
        "Secondo Simon Sinek, mantenere chiarezza in questo passo connette lo scopo di {brand} con il tuo pubblico.",
        "Come afferma Sagi Haviv, semplicità e coerenza rendono {brand} memorabile su qualsiasi supporto."
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
      "Continuar con mi Marca": "Continue with My Brand",
      "Paso 0 · Inicio & Giro": "Step 0 · Start & Sector",
      "Paso 1 · Círculo Dorado": "Step 1 · Golden Circle",
      "Paso 2 · Touchpoints": "Step 2 · Touchpoints",
      "Paso 3 · Naming & Niza": "Step 3 · Naming & Nice",
      "Paso 4 · Personalidad": "Step 4 · Personality",
      "Paso 5 · Logotipos": "Step 5 · Logos",
      "Paso 6 · Manual 36 Láminas": "Step 6 · 36-Plate Brandbook",
      "⚡ Cargar Admin (TheBestBrand)": "⚡ Load Admin (TheBestBrand)",
      "⚡ Admin TBB": "⚡ Admin TBB",
      "Web ↗": "Web ↗",
      "CONSEJERO OFICIAL": "OFFICIAL ADVISOR",
      "Relevancia de Categoría & Brand Equity": "Category Relevance & Brand Equity",
      "Propósito Nuclear & El Círculo Dorado": "Core Purpose & The Golden Circle",
      "Momentos de la Verdad & Touchpoints": "Moments of Truth & Touchpoints",
      "Posicionamiento en la Mente & Naming": "Mind Positioning & Naming",
      "Rigor Simbólico & Test de Rand": "Symbolic Rigor & Rand's Test",
      "Ingeniería Kansei & Proporción 70/20/10": "Kansei Engineering & 70/20/10 Ratio",
      "Estrategia Competitiva & Gobernanza": "Competitive Strategy & Governance",
      "✓ Tu logotipo oficial está activo en el motor, en el lienzo y en las 30 láminas": "✓ Your official logo is active in the engine, on the canvas, and across all 36 plates",
      "Si lo subes, el motor lo mantendrá como tu logotipo oficial en todo el recorrido y en las 30 láminas.": "If you upload it, the engine will keep it as your official logo throughout the journey and across all 36 plates.",
      "Corregir ortografía y expresar mi idea con claridad ejecutiva": "Fix spelling & express my idea with executive clarity",
      "Corregir ortografía y redactar mi idea con claridad": "Fix spelling & write my idea with clarity",
      "1. Tradición Clásica vs. Vanguardia Tecnológica": "1. Classic Tradition vs. Tech Vanguard",
      "Herencia Clásica (Rolex)": "Classic Heritage (Rolex)",
      "Corona Heráldica & Serifas": "Heraldic Crown & Serifs",
      "Vanguardia Pura (Apple / Tesla)": "Pure Vanguard (Apple / Tesla)",
      "Silueta Monolítica Minimalista": "Minimalist Monolithic Silhouette",
      "2. Síntesis de 1 Trazo vs. Riqueza Heráldica": "2. 1-Stroke Synthesis vs. Heraldic Richness",
      "Síntesis Absoluta (Nike)": "Absolute Synthesis (Nike)",
      "1 Solo Trazo Fluido Continuo": "1 Continuous Fluid Stroke",
      "Blasón Multicapa (Porsche)": "Multi-Layer Crest (Porsche)",
      "Escudo Cuadripartito Detallado": "Detailed Quadripartite Shield",
      "3. Cercanía Humana vs. Prestigio de Ingeniería": "3. Human Warmth vs. Engineering Prestige",
      "Calidez Orgánica (Airbnb)": "Organic Warmth (Airbnb)",
      "Bucle Continuo Acogedor": "Welcoming Continuous Loop",
      "Alta Precisión (TAG Heuer / NVIDIA)": "High Precision (TAG Heuer / NVIDIA)",
      "Geometría Angular de Precisión": "Precision Angular Geometry",
      "4. Sello Artesanal de Autor vs. Velocidad Digital": "4. Artisanal Author Seal vs. Digital Speed",
      "Óptica & Autor (Leica)": "Optics & Author (Leica)",
      "Medallón Caligráfico Táctil": "Tactile Calligraphic Medallion",
      "Aerodinámica Digital (Formula 1)": "Digital Aerodynamics (Formula 1)",
      "Vectores de Velocidad a 25°": "25° Speed Vectors",
      "5. Solidez Institucional vs. Energía Competitiva": "5. Institutional Solidity vs. Competitive Energy",
      "Monolito Corporativo (IBM)": "Corporate Monolith (IBM)",
      "Estabilidad Horizontal Ortogonal": "Orthogonal Horizontal Stability",
      "Adrenalina Angular (Valorant / Red Bull)": "Angular Adrenaline (Valorant / Red Bull)",
      "Cortes Diagonales de Impacto": "High-Impact Diagonal Cuts",
      "6. Canon Clásico de Lujo vs. Disrupción Radical": "6. Classic Luxury Canon vs. Radical Disruption",
      "Monograma Simétrico (Chanel)": "Symmetric Monogram (Chanel)",
      "Anillos Entrelazados Eternos": "Eternal Interlocking Rings",
      "Vanguardia Disruptiva (Nothing / Twitch)": "Disruptive Vanguard (Nothing / Twitch)",
      "Matriz de Puntos & Prisma": "Dot Matrix & Prism",
      "7. Curvas Fibonacci Orgánicas vs. Retícula Suiza Pura": "7. Organic Fibonacci Curves vs. Pure Swiss Grid",
      "Espiral Orgánica (Nautilus)": "Organic Spiral (Nautilus)",
      "Curvas Continuas sin Esquinas": "Cornerless Continuous Curves",
      "Retícula Bauhaus 45°/90° (Braun)": "45°/90° Bauhaus Grid (Braun)",
      "Círculo, Cuadrado y Triángulo Puros": "Pure Circle, Square & Triangle",
      "PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE + ADOBE FONTS)": "STEP 4 · 4 OF 5 · HYBRID TYPOGRAPHIC SYSTEM (OPEN SOURCE + ADOBE FONTS)",
      "Toca un estilo arriba y elige la tríada oficial para": "Tap a style above and choose the official triad for",
      "1. Ingeniería & Geométrica": "1. Engineering & Geometric",
      "2. Suiza & Tecnológica": "2. Swiss & Tech",
      "3. Editorial & Lujo Serif": "3. Editorial & Luxury Serif",
      "4. Vanguardia & Impacto": "4. Vanguard & Impact",
      "5. ✦ Adobe Fonts (Híbrido)": "5. ✦ Adobe Fonts (Hybrid)",
      "Modo Híbrido (Opcional · Web Project ID):": "Hybrid Mode (Optional · Web Project ID):",
      "Conectar Kit": "Connect Kit",
      "3 .TTF LIBRES": "3 FREE .TTF",
      "HÍBRIDO ADOBE": "ADOBE HYBRID",
      "Titular:": "Headline:",
      "Cuerpo:": "Body:",
      "Equivalente 100% libre:": "100% free equivalent:",
      "Tríada activa:": "Active triad:",
      "Titulares": "Headlines",
      "Cuerpo": "Body",
      "Acentos": "Accents",
      "Descargar Kit Híbrido de Fuentes (.ZIP)": "Download Hybrid Font Kit (.ZIP)",
      "✦ Símbolo Nano Banana Pro": "✦ Nano Banana Pro Symbol",
      "Generando Símbolo IA...": "Generating AI Symbol...",
      "#1 · Tu Logo Base": "#1 · Your Base Logo",
      "#1 · Base": "#1 · Base",
      "Ilustrar Capítulos (Flow IA)": "Illustrate Chapters (Flow AI)",
      "Generando 6 Fotos IA...": "Generating 6 AI Photos...",
      "Exportar PDF (36 Láminas)": "Export PDF (36 Plates)",
      "PASO 6 · 2 DE 2 · BÓVEDA DE LOS 9 ENTREGABLES EJECUTIVOS DE TU MARCA": "STEP 6 · 2 OF 2 · VAULT OF YOUR BRAND'S 9 EXECUTIVE DELIVERABLES",
      "Los 9 activos oficiales de tu identidad listos para descarga inmediata en curvas vectoriales (.SVG / .AI), documentos editables (.DOCX / .PPTX / .HTML), manual editorial de 36 láminas (.PDF) y Kit Híbrido de Fuentes (.ZIP).": "All 9 official identity assets ready for immediate download in vector curves (.SVG / .AI), editable documents (.DOCX / .PPTX / .HTML), 36-plate brandbook (.PDF), and Hybrid Font Kit (.ZIP).",
      "1. Descargar Manual Oficial Completo en PDF Directo (36 Láminas .PDF)": "1. Download Complete Official Brandbook in Direct PDF (36 Plates .PDF)",
      "2. Descargar Manual Interactivo Autónomo (.HTML 36 Láminas)": "2. Download Standalone Interactive Brandbook (36-Plate .HTML)",
      "3. Descargar Suite de Logotipos en Curvas (.SVG / .AI + PNG 4K Transparente)": "3. Download Vector Logo Suite (.SVG / .AI + 4K Transparent PNG)",
      "4. Descargar Plantilla Oficial de Hoja Membretada (.DOCX Editable en Word)": "4. Download Official Letterhead Template (Editable Word .DOCX)",
      "5. Descargar Plantilla de Presentación Ejecutiva (.PPTX Editable 16:9)": "5. Download Executive Presentation Template (Editable 16:9 .PPTX)",
      "6. Abrir Generador de Firma de Correo Corporativa (.HTML + Foto / Logo)": "6. Open Corporate Email Signature Generator (.HTML + Photo / Logo)",
      "7. Ver Sitio Web Funcional Conectado a tu Brandbook (Próximamente)": "7. View Functional Website Connected to Your Brandbook (Coming Soon)",
      "8. Ver Fábrica de Redes Sociales y Estrategia Digital (6 Agentes IA · Próximamente)": "8. View Social Media Factory & Digital Strategy (6 AI Agents · Coming Soon)",
      "9. Descargar Kit Híbrido de Fuentes Oficiales (.ZIP con .TTF + CSS + Licencia OFL)": "9. Download Official Hybrid Font Kit (.ZIP with .TTF + CSS + OFL License)",
      "← Volver al Visor Interactivo de las 36 Láminas (01 a 36)": "← Return to the 36-Plate Interactive Viewer (01 to 36)",
      "Hola, soy Aura.": "Hello, I am Aura.",
      "Tu Mentora de Identidad": "Your Brand Identity Mentor",
      "Iniciar Taller con Aura": "Start Studio with Aura",
      "Web Comercial / Comprar": "Commercial Web / Buy",
      "CÁPSULA DEL FUNDADOR · HEYGEN + GOOGLE FLOW": "FOUNDER CAPSULE · HEYGEN + GOOGLE FLOW",
      "TU AVANCE SINCRONIZADO:": "YOUR SYNCED PROGRESS:",
      "Continuar al Paso": "Continue to Step",
      "Omitir video": "Skip video",
      "Paso 0 · Inicio": "Step 0 · Start",
      "Paso 3 · Naming": "Step 3 · Naming",
      "Paso 4 · Kansei": "Step 4 · Kansei",
      "Paso 5 · Logotipo": "Step 5 · Logo",
      "Paso 6 · Manual": "Step 6 · Manual"
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
      "Continuar con mi Marca": "Continuar com Minha Marca",
      "Paso 0 · Inicio & Giro": "Passo 0 · Início e Setor",
      "Paso 1 · Círculo Dorado": "Passo 1 · Círculo Dourado",
      "Paso 2 · Touchpoints": "Passo 2 · Touchpoints",
      "Paso 3 · Naming & Niza": "Passo 3 · Naming e Nice",
      "Paso 4 · Personalidad": "Passo 4 · Personalidade",
      "Paso 5 · Logotipos": "Passo 5 · Logotipos",
      "Paso 6 · Manual 36 Láminas": "Passo 6 · Manual 36 Lâminas",
      "⚡ Cargar Admin (TheBestBrand)": "⚡ Carregar Admin (TheBestBrand)",
      "⚡ Admin TBB": "⚡ Admin TBB",
      "CONSEJERO OFICIAL": "CONSELHEIRO OFICIAL",
      "Relevancia de Categoría & Brand Equity": "Relevância de Categoria e Brand Equity",
      "Propósito Nuclear & El Círculo Dorado": "Propósito Central e O Círculo Dourado",
      "Momentos de la Verdad & Touchpoints": "Momentos da Verdade e Touchpoints",
      "Posicionamiento en la Mente & Naming": "Posicionamento na Mente e Naming",
      "Rigor Simbólico & Test de Rand": "Rigor Simbólico e Teste de Rand",
      "Ingeniería Kansei & Proporción 70/20/10": "Engenharia Kansei e Proporção 70/20/10",
      "Estrategia Competitiva & Gobernanza": "Estratégia Competitiva e Governança",
      "✓ Tu logotipo oficial está activo en el motor, en el lienzo y en las 30 láminas": "✓ Seu logotipo oficial está ativo no motor, na tela e nas 36 lâminas",
      "Si lo subes, el motor lo mantendrá como tu logotipo oficial en todo el recorrido y en las 30 láminas.": "Se você enviá-lo, o motor o manterá como seu logotipo oficial em toda a jornada e nas 36 lâminas.",
      "Corregir ortografía y expresar mi idea con claridad ejecutiva": "Corrigir ortografia e expressar minha ideia com clareza executiva",
      "Corregir ortografía y redactar mi idea con claridad": "Corrigir ortografia e redigir minha ideia com clareza",
      "Describe con tus palabras a qué se dedica tu empresa, qué producto o servicio entregas y para quién...": "Descreva com suas palavras o que sua empresa faz, qual produto ou serviço entrega e para quem...",
      "Síntesis detectada por el sistema:": "Síntese detectada pelo sistema:",
      "Escribe arriba tu giro para que el sistema adapte todo tu recorrido.": "Escreva acima seu setor para que o sistema adapte toda a sua jornada.",
      "El sistema generará las preguntas, puntos de contacto, nombres y logotipo a partir de lo que escribas aquí.": "O sistema gerará as perguntas, touchpoints, nomes e logotipo a partir do que você escrever aqui.",
      "Escribe o dicta tu respuesta para esta dimensión de tu marca...": "Escreva ou dite sua resposta para esta dimensão da sua marca...",
      "¿Por qué existe tu marca más allá de generar ingresos y qué cambio positivo busca lograr?": "Por que sua marca existe além de gerar receita e qual mudança positiva busca alcançar?",
      "¿Qué hace única a tu propuesta frente a las alternativas actuales del mercado?": "O que torna sua proposta única frente às alternativas atuais do mercado?",
      "¿Cómo mejora concretamente la vida o el trabajo de quienes eligen tu marca?": "Como escolher sua marca melhora concretamente a vida ou o trabalho dos seus clientes?",
      "¿Cuáles son los pasos clave con los que garantizas calidad en tu producto o servicio?": "Quais são os passos-chave com os quais você garante qualidade no seu produto ou serviço?",
      "¿En una sola frase clara, qué quieres que tus clientes recuerden siempre de tu marca?": "Em uma única frase clara, o que você quer que seus clientes lembrem sempre da sua marca?",
      "Si tu marca fuera una persona, ¿cómo hablaría, cómo trataría al cliente y qué actitud tendría?": "Se sua marca fosse uma pessoa, como falaria, como trataria o cliente e que atitude teria?",
      "¿Quién es tu cliente ideal, qué es lo que más valora y qué problema urgente le resuelves?": "Quem é seu cliente ideal, o que ele mais valoriza e qual problema urgente você resolve?",
      "¿Por qué medios te descubren y evalúan tus clientes antes de comprar?": "Por quais meios seus clientes descobrem e avaliam você antes de comprar?",
      "¿Dónde ocurre la experiencia principal y el contacto directo durante el servicio o compra?": "Onde ocorre a experiência principal e o contato direto durante o serviço ou compra?",
      "¿Cómo mantienes la relación, el soporte y la lealtad después de la entrega?": "Como você mantém o relacionamento, o suporte e a fidelidade após a entrega?",
      "Agregar otro punto de contacto propio...": "Adicionar outro ponto de contato próprio...",
      "1. Tradición Clásica vs. Vanguardia Tecnológica": "1. Tradição Clássica vs. Vanguarda Tecnológica",
      "Herencia Clásica (Rolex)": "Herança Clássica (Rolex)",
      "Corona Heráldica & Serifas": "Coroa Heráldica e Serifas",
      "Vanguardia Pura (Apple / Tesla)": "Vanguarda Pura (Apple / Tesla)",
      "Silueta Monolítica Minimalista": "Silhueta Monolítica Minimalista",
      "2. Síntesis de 1 Trazo vs. Riqueza Heráldica": "2. Síntese de 1 Traço vs. Riqueza Heráldica",
      "Síntesis Absoluta (Nike)": "Síntese Absoluta (Nike)",
      "1 Solo Trazo Fluido Continuo": "1 Único Traço Fluido Contínuo",
      "Blasón Multicapa (Porsche)": "Brasão Multicamadas (Porsche)",
      "Escudo Cuadripartito Detallado": "Escudo Quadripartido Detalhado",
      "3. Cercanía Humana vs. Prestigio de Ingeniería": "3. Proximidade Humana vs. Prestígio de Engenharia",
      "Calidez Orgánica (Airbnb)": "Calor Orgânico (Airbnb)",
      "Bucle Continuo Acogedor": "Laço Contínuo Acolhedor",
      "Alta Precisión (TAG Heuer / NVIDIA)": "Alta Precisão (TAG Heuer / NVIDIA)",
      "Geometría Angular de Precisión": "Geometria Angular de Precisão",
      "4. Sello Artesanal de Autor vs. Velocidad Digital": "4. Selo Artesanal de Autor vs. Velocidade Digital",
      "Óptica & Autor (Leica)": "Óptica e Autor (Leica)",
      "Medallón Caligráfico Táctil": "Medalhão Caligráfico Tátil",
      "Aerodinámica Digital (Formula 1)": "Aerodinâmica Digital (Formula 1)",
      "Vectores de Velocidad a 25°": "Vetores de Velocidade a 25°",
      "5. Solidez Institucional vs. Energía Competitiva": "5. Solidez Institucional vs. Energia Competitiva",
      "Monolito Corporativo (IBM)": "Monólito Corporativo (IBM)",
      "Estabilidad Horizontal Ortogonal": "Estabilidade Horizontal Ortogonal",
      "Adrenalina Angular (Valorant / Red Bull)": "Adrenalina Angular (Valorant / Red Bull)",
      "Cortes Diagonales de Impacto": "Cortes Diagonais de Impacto",
      "6. Canon Clásico de Lujo vs. Disrupción Radical": "6. Cânone Clássico de Luxo vs. Disrupção Radical",
      "Monograma Simétrico (Chanel)": "Monograma Simétrico (Chanel)",
      "Anillos Entrelazados Eternos": "Anéis Entrelaçados Eternos",
      "Vanguardia Disruptiva (Nothing / Twitch)": "Vanguarda Disruptiva (Nothing / Twitch)",
      "Matriz de Puntos & Prisma": "Matriz de Pontos e Prisma",
      "7. Curvas Fibonacci Orgánicas vs. Retícula Suiza Pura": "7. Curvas Fibonacci Orgânicas vs. Grade Suíça Pura",
      "Espiral Orgánica (Nautilus)": "Espiral Orgânica (Nautilus)",
      "Curvas Continuas sin Esquinas": "Curvas Contínuas sem Cantos",
      "Retícula Bauhaus 45°/90° (Braun)": "Grade Bauhaus 45°/90° (Braun)",
      "Círculo, Cuadrado y Triángulo Puros": "Círculo, Quadrado e Triângulo Puros",
      "PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE + ADOBE FONTS)": "PASSO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE + ADOBE FONTS)",
      "Toca un estilo arriba y elige la tríada oficial para": "Toque em um estilo acima e escolha a tríade oficial para",
      "1. Ingeniería & Geométrica": "1. Engenharia e Geométrica",
      "2. Suiza & Tecnológica": "2. Suíça e Tecnológica",
      "3. Editorial & Lujo Serif": "3. Editorial e Luxo Serif",
      "4. Vanguardia & Impacto": "4. Vanguarda e Impacto",
      "5. ✦ Adobe Fonts (Híbrido)": "5. ✦ Adobe Fonts (Híbrido)",
      "Descargar Kit Híbrido de Fuentes (.ZIP)": "Baixar Kit Híbrido de Fontes (.ZIP)",
      "✦ Símbolo Nano Banana Pro": "✦ Símbolo Nano Banana Pro",
      "#1 · Tu Logo Base": "#1 · Seu Logo Base",
      "#1 · Base": "#1 · Base",
      "Ilustrar Capítulos (Flow IA)": "Ilustrar Capítulos (Flow IA)",
      "Exportar PDF (36 Láminas)": "Exportar PDF (36 Lâminas)",
      "PASO 6 · 2 DE 2 · BÓVEDA DE LOS 9 ENTREGABLES EJECUTIVOS DE TU MARCA": "PASSO 6 · 2 DE 2 · CENTRAL DOS 9 ENTREGÁVEIS EXECUTIVOS DA SUA MARCA",
      "1. Descargar Manual Oficial Completo en PDF Directo (36 Láminas .PDF)": "1. Baixar Manual Oficial Completo em PDF Direto (36 Lâminas .PDF)",
      "2. Descargar Manual Interactivo Autónomo (.HTML 36 Láminas)": "2. Baixar Manual Interativo Autônomo (.HTML 36 Lâminas)",
      "3. Descargar Suite de Logotipos en Curvas (.SVG / .AI + PNG 4K Transparente)": "3. Baixar Suite de Logotipos em Curvas (.SVG / .AI + PNG 4K Transparente)",
      "4. Descargar Plantilla Oficial de Hoja Membretada (.DOCX Editable en Word)": "4. Baixar Modelo Oficial de Papel Timbrado (.DOCX Editável no Word)",
      "5. Descargar Plantilla de Presentación Ejecutiva (.PPTX Editable 16:9)": "5. Baixar Modelo de Apresentação Executiva (.PPTX Editável 16:9)",
      "6. Abrir Generador de Firma de Correo Corporativa (.HTML + Foto / Logo)": "6. Abrir Gerador de Assinatura de E-mail Corporativa (.HTML + Foto / Logo)",
      "7. Ver Sitio Web Funcional Conectado a tu Brandbook (Próximamente)": "7. Ver Site Funcional Conectado ao seu Brandbook (Em Breve)",
      "8. Ver Fábrica de Redes Sociales y Estrategia Digital (6 Agentes IA · Próximamente)": "8. Ver Fábrica de Redes Sociais e Estratégia Digital (6 Agentes IA · Em Breve)",
      "9. Descargar Kit Híbrido de Fuentes Oficiales (.ZIP con .TTF + CSS + Licencia OFL)": "9. Baixar Kit Híbrido de Fontes Oficiais (.ZIP com .TTF + CSS + Licença OFL)",
      "← Volver al Visor Interactivo de las 36 Láminas (01 a 36)": "← Voltar ao Visualizador Interativo das 36 Lâminas (01 a 36)",
      "Hola, soy Aura.": "Olá, sou a Aura.",
      "Tu Mentora de Identidad": "Sua Mentora de Identidade",
      "Iniciar Taller con Aura": "Iniciar Estúdio com Aura",
      "Web Comercial / Comprar": "Web Comercial / Comprar",
      "CÁPSULA DEL FUNDADOR · HEYGEN + GOOGLE FLOW": "CÁPSULA DO FUNDADOR · HEYGEN + GOOGLE FLOW",
      "TU AVANCE SINCRONIZADO:": "SEU PROGRESSO SINCRONIZADO:",
      "Continuar al Paso": "Continuar ao Passo",
      "Omitir video": "Pular vídeo"
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
      "Continuar con mi Marca": "Continuer avec Ma Marque",
      "Paso 0 · Inicio & Giro": "Étape 0 · Départ & Secteur",
      "Paso 1 · Círculo Dorado": "Étape 1 · Cercle d'Or",
      "Paso 2 · Touchpoints": "Étape 2 · Points de Contact",
      "Paso 3 · Naming & Niza": "Étape 3 · Naming & Nice",
      "Paso 4 · Personalidad": "Étape 4 · Personnalité",
      "Paso 5 · Logotipos": "Étape 5 · Logos",
      "Paso 6 · Manual 36 Láminas": "Étape 6 · Manuel 36 Planches",
      "⚡ Cargar Admin (TheBestBrand)": "⚡ Charger Admin (TheBestBrand)",
      "⚡ Admin TBB": "⚡ Admin TBB",
      "CONSEJERO OFICIAL": "CONSEILLER OFFICIEL",
      "Relevancia de Categoría & Brand Equity": "Pertinence de Catégorie & Capital Marque",
      "Propósito Nuclear & El Círculo Dorado": "Raison d'Être & Le Cercle d'Or",
      "Momentos de la Verdad & Touchpoints": "Moments de Vérité & Points de Contact",
      "Posicionamiento en la Mente & Naming": "Positionnement Mental & Naming",
      "Rigor Simbólico & Test de Rand": "Rigueur Symbolique & Test de Rand",
      "Ingeniería Kansei & Proporción 70/20/10": "Ingénierie Kansei & Ratio 70/20/10",
      "Estrategia Competitiva & Gobernanza": "Stratégie Compétitive & Gouvernance",
      "✓ Tu logotipo oficial está activo en el motor, en el lienzo y en las 30 láminas": "✓ Votre logo officiel est actif dans le moteur, sur le canevas et sur les 36 planches",
      "Si lo subes, el motor lo mantendrá como tu logotipo oficial en todo el recorrido y en las 30 láminas.": "Si vous l'importez, le moteur le conservera comme logo officiel tout au long du parcours et sur les 36 planches.",
      "Corregir ortografía y expresar mi idea con claridad ejecutiva": "Corriger l'orthographe et exprimer mon idée avec clarté exécutive",
      "Corregir ortografía y redactar mi idea con claridad": "Corriger l'orthographe et rédiger mon idée avec clarté",
      "Describe con tus palabras a qué se dedica tu empresa, qué producto o servicio entregas y para quién...": "Décrivez avec vos mots l'activité de votre entreprise, le produit ou service que vous offrez et pour qui...",
      "Síntesis detectada por el sistema:": "Synthèse détectée par le système :",
      "Escribe arriba tu giro para que el sistema adapte todo tu recorrido.": "Décrivez votre secteur ci-dessus pour que le système adapte tout votre parcours.",
      "El sistema generará las preguntas, puntos de contacto, nombres y logotipo a partir de lo que escribas aquí.": "Le système générera les questions, points de contact, noms et logo à partir de ce que vous écrivez ici.",
      "Escribe o dicta tu respuesta para esta dimensión de tu marca...": "Écrivez ou dictez votre réponse pour cette dimension de votre marque...",
      "¿Por qué existe tu marca más allá de generar ingresos y qué cambio positivo busca lograr?": "Pourquoi votre marque existe-t-elle au-delà du chiffre d'affaires et quel changement positif vise-t-elle ?",
      "¿Qué hace única a tu propuesta frente a las alternativas actuales del mercado?": "Qu'est-ce qui rend votre proposition unique face aux alternatives actuelles du marché ?",
      "¿Cómo mejora concretamente la vida o el trabajo de quienes eligen tu marca?": "Comment le choix de votre marque améliore-t-il concrètement la vie ou le travail de vos clients ?",
      "¿Cuáles son los pasos clave con los que garantizas calidad en tu producto o servicio?": "Quelles sont les étapes clés par lesquelles vous garantissez la qualité de votre produit ou service ?",
      "¿En una sola frase clara, qué quieres que tus clientes recuerden siempre de tu marca?": "En une seule phrase claire, que voulez-vous que vos clients retiennent toujours de votre marque ?",
      "Si tu marca fuera una persona, ¿cómo hablaría, cómo trataría al cliente y qué actitud tendría?": "Si votre marque était une personne, comment parlerait-elle, traiterait-elle le client et quelle serait son attitude ?",
      "¿Quién es tu cliente ideal, qué es lo que más valora y qué problema urgente le resuelves?": "Qui est votre client idéal, qu'apprécie-t-il le plus et quel problème urgent résolvez-vous pour lui ?",
      "¿Por qué medios te descubren y evalúan tus clientes antes de comprar?": "Par quels moyens vos clients vous découvrent-ils et vous évaluent-ils avant d'acheter ?",
      "¿Dónde ocurre la experiencia principal y el contacto directo durante el servicio o compra?": "Où se déroule l'expérience principale et le contact direct pendant le service ou l'achat ?",
      "¿Cómo mantienes la relación, el soporte y la lealtad después de la entrega?": "Comment maintenez-vous la relation, le support et la fidélité après la livraison ?",
      "Agregar otro punto de contacto propio...": "Ajouter un autre point de contact personnalisé...",
      "1. Tradición Clásica vs. Vanguardia Tecnológica": "1. Tradition Classique vs Avant-Garde Technologique",
      "Herencia Clásica (Rolex)": "Héritage Classique (Rolex)",
      "Corona Heráldica & Serifas": "Couronne Héraldique & Empattements",
      "Vanguardia Pura (Apple / Tesla)": "Avant-Garde Pure (Apple / Tesla)",
      "Silueta Monolítica Minimalista": "Silhouette Monolithique Minimaliste",
      "2. Síntesis de 1 Trazo vs. Riqueza Heráldica": "2. Synthèse d'Un Trait vs Richesse Héraldique",
      "Síntesis Absoluta (Nike)": "Synthèse Absolue (Nike)",
      "1 Solo Trazo Fluido Continuo": "Un Seul Trait Fluide Continu",
      "Blasón Multicapa (Porsche)": "Blason Multicouche (Porsche)",
      "Escudo Cuadripartito Detallado": "Écu Quadripartite Détaillé",
      "3. Cercanía Humana vs. Prestigio de Ingeniería": "3. Proximité Humaine vs Prestige d'Ingénierie",
      "Calidez Orgánica (Airbnb)": "Chaleur Organique (Airbnb)",
      "Bucle Continuo Acogedor": "Boucle Continue Accueillante",
      "Alta Precisión (TAG Heuer / NVIDIA)": "Haute Précision (TAG Heuer / NVIDIA)",
      "Geometría Angular de Precisión": "Géométrie Angulaire de Précision",
      "4. Sello Artesanal de Autor vs. Velocidad Digital": "4. Sceau Artisanal d'Auteur vs Vitesse Numérique",
      "Óptica & Autor (Leica)": "Optique & Auteur (Leica)",
      "Medallón Caligráfico Táctil": "Médaillon Calligraphique Tactile",
      "Aerodinámica Digital (Formula 1)": "Aérodynamique Numérique (Formula 1)",
      "Vectores de Velocidad a 25°": "Vecteurs de Vitesse à 25°",
      "5. Solidez Institucional vs. Energía Competitiva": "5. Solidité Institutionnelle vs Énergie Compétitive",
      "Monolito Corporativo (IBM)": "Monolithe Corporatif (IBM)",
      "Estabilidad Horizontal Ortogonal": "Stabilité Horizontale Orthogonale",
      "Adrenalina Angular (Valorant / Red Bull)": "Adrénaline Angulaire (Valorant / Red Bull)",
      "Cortes Diagonales de Impacto": "Coupes Diagonales d'Impact",
      "6. Canon Clásico de Lujo vs. Disrupción Radical": "6. Canon Classique du Luxe vs Disruption Radicale",
      "Monograma Simétrico (Chanel)": "Monogramme Symétrique (Chanel)",
      "Anillos Entrelazados Eternos": "Anneaux Entrelacés Éternels",
      "Vanguardia Disruptiva (Nothing / Twitch)": "Avant-Garde Disruptive (Nothing / Twitch)",
      "Matriz de Puntos & Prisma": "Matrice de Points & Prisme",
      "7. Curvas Fibonacci Orgánicas vs. Retícula Suiza Pura": "7. Courbes Fibonacci Organiques vs Grille Suisse Pure",
      "Espiral Orgánica (Nautilus)": "Spirale Organique (Nautilus)",
      "Curvas Continuas sin Esquinas": "Courbes Continues sans Angles",
      "Retícula Bauhaus 45°/90° (Braun)": "Grille Bauhaus 45°/90° (Braun)",
      "Círculo, Cuadrado y Triángulo Puros": "Cercle, Carré et Triangle Purs",
      "PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE + ADOBE FONTS)": "ÉTAPE 4 · 4 SUR 5 · SYSTÈME TYPOGRAPHIQUE HYBRIDE (OPEN SOURCE + ADOBE FONTS)",
      "Toca un estilo arriba y elige la tríada oficial para": "Touchez un style ci-dessus et choisissez la triade officielle pour",
      "1. Ingeniería & Geométrica": "1. Ingénierie & Géométrique",
      "2. Suiza & Tecnológica": "2. Suisse & Technologique",
      "3. Editorial & Lujo Serif": "3. Éditorial & Luxe Serif",
      "4. Vanguardia & Impacto": "4. Avant-Garde & Impact",
      "5. ✦ Adobe Fonts (Híbrido)": "5. ✦ Adobe Fonts (Hybride)",
      "Descargar Kit Híbrido de Fuentes (.ZIP)": "Télécharger le Kit Hybride de Polices (.ZIP)",
      "✦ Símbolo Nano Banana Pro": "✦ Symbole Nano Banana Pro",
      "#1 · Tu Logo Base": "#1 · Votre Logo de Base",
      "#1 · Base": "#1 · Base",
      "Ilustrar Capítulos (Flow IA)": "Illustrer les Chapitres (Flow IA)",
      "Exportar PDF (36 Láminas)": "Exporter PDF (36 Planches)",
      "PASO 6 · 2 DE 2 · BÓVEDA DE LOS 9 ENTREGABLES EJECUTIVOS DE TU MARCA": "ÉTAPE 6 · 2 SUR 2 · COFFRE DES 9 LIVRABLES EXÉCUTIFS DE VOTRE MARQUE",
      "1. Descargar Manual Oficial Completo en PDF Directo (36 Láminas .PDF)": "1. Télécharger le Manuel Officiel Complet en PDF Direct (36 Planches .PDF)",
      "2. Descargar Manual Interactivo Autónomo (.HTML 36 Láminas)": "2. Télécharger le Manuel Interactif Autonome (.HTML 36 Planches)",
      "3. Descargar Suite de Logotipos en Curvas (.SVG / .AI + PNG 4K Transparente)": "3. Télécharger la Suite de Logos Vectoriels (.SVG / .AI + PNG 4K Transparent)",
      "4. Descargar Plantilla Oficial de Hoja Membretada (.DOCX Editable en Word)": "4. Télécharger le Modèle Officiel de Papier à En-tête (.DOCX Éditable Word)",
      "5. Descargar Plantilla de Presentación Ejecutiva (.PPTX Editable 16:9)": "5. Télécharger le Modèle de Présentation Exécutive (.PPTX Éditable 16:9)",
      "6. Abrir Generador de Firma de Correo Corporativa (.HTML + Foto / Logo)": "6. Ouvrir le Générateur de Signature E-mail (.HTML + Photo / Logo)",
      "7. Ver Sitio Web Funcional Conectado a tu Brandbook (Próximamente)": "7. Voir le Site Web Fonctionnel Connecté à Votre Brandbook (Bientôt)",
      "8. Ver Fábrica de Redes Sociales y Estrategia Digital (6 Agentes IA · Próximamente)": "8. Voir l'Usine Réseaux Sociaux et Stratégie Digitale (6 Agents IA · Bientôt)",
      "9. Descargar Kit Híbrido de Fuentes Oficiales (.ZIP con .TTF + CSS + Licencia OFL)": "9. Télécharger le Kit Hybride de Polices Officielles (.ZIP avec .TTF + CSS + Licence OFL)",
      "← Volver al Visor Interactivo de las 36 Láminas (01 a 36)": "← Retour à la Visionneuse Interactive des 36 Planches (01 à 36)",
      "Hola, soy Aura.": "Bonjour, je suis Aura.",
      "Tu Mentora de Identidad": "Votre Mentore d'Identité",
      "Iniciar Taller con Aura": "Démarrer l'Atelier avec Aura",
      "Web Comercial / Comprar": "Site Commercial / Acheter",
      "CÁPSULA DEL FUNDADOR · HEYGEN + GOOGLE FLOW": "CAPSULE DU FONDATEUR · HEYGEN + GOOGLE FLOW",
      "TU AVANCE SINCRONIZADO:": "VOTRE PROGRESSION SYNCHRONISÉE :",
      "Continuar al Paso": "Continuer vers l'Étape",
      "Omitir video": "Passer la vidéo"
    },
    de: {
      "Mapa": "Karte",
      "Video": "Video",
      "Atrás": "Zurück",
      "Adelante": "Weiter",
      "Finalizar": "Abschließen",
      "Hablar": "Sprechen",
      "Dictar Giro": "Branche diktieren",
      "Iterar con Gemini": "Mit Gemini iterieren",
      "Gemini diseñando...": "Gemini entwirft...",
      "Diseñando...": "Entwirft...",
      "Aplicar con Gemini": "Mit Gemini anwenden",
      "Inicio": "Start",
      "Taller": "Studio",
      "Manual": "Handbuch",
      "Cuenta": "Konto",
      "En Vivo": "Live",
      "Menú": "Menü",
      "Cerrar": "Schließen",
      "AURA · MENTORA DE MARCA": "AURA · MARKENMENTORIN",
      "AURA · ADMIN IMPROBEARS": "AURA · IMPROBEARS ADMIN",
      "Paso 0 · Inicio & Giro": "Schritt 0 · Start & Branche",
      "Paso 1 · Círculo Dorado": "Schritt 1 · Golden Circle",
      "Paso 2 · Touchpoints": "Schritt 2 · Touchpoints",
      "Paso 3 · Naming & Niza": "Schritt 3 · Naming & Nizza",
      "Paso 4 · Personalidad": "Schritt 4 · Persönlichkeit",
      "Paso 5 · Logotipos": "Schritt 5 · Logos",
      "Paso 6 · Manual 36 Láminas": "Schritt 6 · 36-Seiten-Handbuch",
      "⚡ Cargar Admin (TheBestBrand)": "⚡ Admin laden (TheBestBrand)",
      "⚡ Admin TBB": "⚡ Admin TBB",
      "Web ↗": "Web ↗",
      "CONSEJERO OFICIAL": "OFFIZIELLER BERATER",
      "Relevancia de Categoría & Brand Equity": "Kategorie-Relevanz & Markenwert",
      "Propósito Nuclear & El Círculo Dorado": "Kernzweck & Der Golden Circle",
      "Momentos de la Verdad & Touchpoints": "Momente der Wahrheit & Touchpoints",
      "Posicionamiento en la Mente & Naming": "Positionierung im Kopf & Naming",
      "Rigor Simbólico & Test de Rand": "Symbolische Strenge & Rand-Test",
      "Ingeniería Kansei & Proporción 70/20/10": "Kansei Engineering & 70/20/10-Regel",
      "Estrategia Competitiva & Gobernanza": "Wettbewerbsstrategie & Governance",
      "PASO 0 · 1 DE 3 · OBJETIVO": "SCHRITT 0 · 1 VON 3 · ZIELSETZUNG",
      "¿Cuál es tu objetivo principal al construir tu marca hoy?": "Was ist dein Hauptziel beim Aufbau deiner Marke heute?",
      "Crear mi primera marca desde cero": "Meine erste Marke von Grund auf neu erstellen",
      "Evolucionar y profesionalizar mi marca actual": "Meine bestehende Marke weiterentwickeln und professionalisieren",
      "Crear una nueva sub-marca o división": "Eine neue Submarke oder Geschäftssparte erstellen",
      "Selecciona una opción y presiona Adelante en la barra inferior.": "Wähle eine Option und klicke unten auf Weiter.",
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGOTIPO ACTUAL": "SCHRITT 0 · 2 VON 3 · AKTUELLER NAME & LOGO",
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGO ACTUAL": "SCHRITT 0 · 2 VON 3 · AKTUELLER NAME & LOGO",
      "PASO 0 · 2 DE 3 · SITUACIÓN DEL NOMBRE": "SCHRITT 0 · 2 VON 3 · STATUS DES MARKENNAMENS",
      "¿Ya cuentas con el nombre o un logotipo actual para tu marca?": "Hast du bereits einen Namen oder ein aktuelles Logo für deine Marke?",
      "¿Ya cuentas con el nombre de tu marca o lo desarrollamos en el Paso 3?": "Hast du bereits einen Markennamen oder sollen wir ihn in Schritt 3 entwickeln?",
      "Definirlo más adelante": "Später definieren",
      "Ya tengo mi nombre": "Ich habe bereits meinen Namen",
      "Nombre de tu marca (si ya lo tienes):": "Name deiner Marke (falls bereits vorhanden):",
      "Escribe aquí el nombre de tu marca": "Gib hier den Namen deiner Marke ein",
      "¿Ya tienes un logotipo actual? (Opcional)": "Hast du bereits ein aktuelles Logo? (Optional)",
      "Subir mi Logo Actual (.PNG, .JPG, .SVG)": "Mein aktuelles Logo hochladen (.PNG, .JPG, .SVG)",
      "Subir mi Logo Actual": "Mein aktuelles Logo hochladen",
      "Cambiar": "Ändern",
      "Quitar": "Entfernen",
      "✓ Tu logotipo oficial está activo en el motor, en el lienzo y en las 30 láminas": "✓ Dein offizielles Logo ist in der Engine, auf dem Canvas und auf allen 36 Seiten aktiv",
      "Si lo subes, el motor lo mantendrá como tu logotipo oficial en todo el recorrido y en las 30 láminas.": "Wenn du es hochlädst, behält das System es als dein offizielles Logo im gesamten Prozess und auf allen 36 Seiten bei.",
      "Si lo subes, podrás mantenerlo tal cual o pedirle al motor generador que lo tome como base para evolucionarlo.": "Wenn du es hochlädst, kannst du es unverändert übernehmen oder als Basis für eine Evolution nutzen.",
      "Logo actual cargado en el motor": "Aktuelles Logo im System geladen",
      "Colores detectados:": "Erkannte Farben:",
      "Mantener mi logo actual": "Mein aktuelles Logo behalten",
      "Tomarlo como base y mejorar": "Als Basis nutzen und verbessern",
      "Toda esta información y tu logo alimentan automáticamente el motor del Paso 5 y las 30 láminas.": "Alle diese Angaben und dein Logo speisen automatisch das Atelier in Schritt 5 und alle 36 Seiten.",
      "Toda esta información alimenta automáticamente los siguientes pasos.": "Alle diese Angaben fließen automatisch in die nächsten Schritte ein.",
      "PASO 0 · 3 DE 3 · GIRO Y ACTIVIDAD": "SCHRITT 0 · 3 VON 3 · BRANCHE & TÄTIGKEIT",
      "¿En qué giro o actividad se enfoca tu empresa y qué ofrece?": "Auf welche Branche oder Tätigkeit konzentriert sich dein Unternehmen und was bietet es an?",
      "Describe con tus palabras a qué se dedica tu empresa, qué producto o servicio entregas y para quién...": "Beschreibe mit deinen eigenen Worten, was dein Unternehmen tut, welches Produkt oder welche Dienstleistung du für wen anbietest...",
      "Corregir ortografía y expresar mi idea con claridad ejecutiva": "Rechtschreibung prüfen & meine Idee mit exekutiver Klarheit formulieren",
      "Corregir ortografía y redactar mi idea con claridad": "Rechtschreibung prüfen & meine Idee klar formulieren",
      "Síntesis detectada por el sistema:": "Vom System erkannte Synthese:",
      "Escribe arriba tu giro para que el sistema adapte todo tu recorrido.": "Beschreibe oben deine Branche, damit das System deine gesamte Sitzung anpasst.",
      "El sistema generará las preguntas, puntos de contacto, nombres y logotipo a partir de lo que escribas aquí.": "Das System generiert Fragen, Touchpoints, Namen und Logo basierend auf deiner Beschreibung.",
      "Guardar e Ir al Paso 1": "Speichern & weiter zu Schritt 1",
      "Comprobar y Siguiente": "Prüfen & Weiter",
      "Completar Paso 1": "Schritt 1 abschließen",
      "Escribe o dicta tu respuesta para esta dimensión de tu marca...": "Schreibe oder diktiere deine Antwort für diese Dimension deiner Marke...",
      "Opciones sintetizadas desde la información de tu marca:": "Aus deinen Markeninformationen synthetisierte Vorschläge:",
      "¿Por qué existe tu marca más allá de generar ingresos y qué cambio positivo busca lograr?": "Warum existiert deine Marke über den Umsatz hinaus und welche positive Veränderung bewirkt sie?",
      "¿Qué hace única a tu propuesta frente a las alternativas actuales del mercado?": "Was macht dein Wertversprechen im Vergleich zu bestehenden Marktalternativen einzigartig?",
      "¿Cómo mejora concretamente la vida o el trabajo de quienes eligen tu marca?": "Wie verbessert deine Marke konkret das Leben oder die Arbeit deiner Kunden?",
      "¿Cuáles son los pasos clave con los que garantizas calidad en tu producto o servicio?": "Mit welchen Schlüsselschritten garantierst du höchste Qualität bei deinem Produkt oder Service?",
      "¿En una sola frase clara, qué quieres que tus clientes recuerden siempre de tu marca?": "Was sollen deine Kunden in einem einzigen klaren Satz immer über deine Marke in Erinnerung behalten?",
      "Si tu marca fuera una persona, ¿cómo hablaría, cómo trataría al cliente y qué actitud tendría?": "Wenn deine Marke eine Person wäre: Wie würde sie sprechen, den Kunden behandeln und auftreten?",
      "¿Quién es tu cliente ideal, qué es lo que más valora y qué problema urgente le resuelves?": "Wer ist dein idealer Kunde, was schätzt er am meisten und welches dringende Problem löst du für ihn?",
      "1. ANTES DE LA COMPRA": "1. VOR DEM KAUF",
      "2. DURANTE LA COMPRA": "2. WÄHREND DES KAUFS",
      "3. DESPUÉS DE LA COMPRA": "3. NACH DEM KAUF",
      "¿Por qué medios te descubren y evalúan tus clientes antes de comprar?": "Über welche Kanäle entdecken und bewerten dich deine Kunden vor dem Kauf?",
      "¿Dónde ocurre la experiencia principal y el contacto directo durante el servicio o compra?": "Wo findet das Haupterlebnis und der direkte Kontakt während des Kaufs oder Service statt?",
      "¿Cómo mantienes la relación, el soporte y la lealtad después de la entrega?": "Wie pflegst du Kundenbeziehung, Support und Loyalität nach der Lieferung?",
      "Agregar otro punto de contacto propio...": "Eigenen Touchpoint hinzufügen...",
      "Agregar": "Hinzufügen",
      "PASO 3 · 1 DE 3 · NOMBRE PROPIO O RAÍCES DEL SISTEMA": "SCHRITT 3 · 1 VON 3 · EIGENER NAME ODER SYSTEMWURZELN",
      "Define o confirma el nombre de tu marca (o explora propuestas del sistema en el siguiente paso)": "Definiere oder bestätige deinen Markennamen (oder entdecke Systemvorschläge im nächsten Schritt)",
      "Nombre Oficial de la Marca:": "Offizieller Markenname:",
      "Escribe el nombre de tu marca": "Gib den Namen deiner Marke ein",
      "Raíces extraídas automáticamente de tus respuestas de los Pasos 0 y 1:": "Automatisch aus deinen Antworten in Schritt 0 und 1 extrahierte Wortwurzeln:",
      "Completa el Paso 0 y 1 para extraer raíces adicionales": "Schließe Schritt 0 und 1 ab, um weitere Wurzeln zu extrahieren",
      "Presiona Adelante para explorar variantes generadas por el sistema o confirmar tu nombre.": "Klicke auf Weiter, um vom System generierte Namensvarianten zu prüfen oder deinen Namen zu bestätigen.",
      "PASO 3 · 2 DE 3 · PROPUESTAS GENERADAS POR EL SISTEMA": "SCHRITT 3 · 2 VON 3 · VOM SYSTEM GENERIERTE VORSCHLÄGE",
      "Toca cualquier propuesta para seleccionarla como Nombre Oficial": "Tippe auf einen Vorschlag, um ihn als offiziellen Markennamen auszuwählen",
      "Generar Nuevas": "Neue generieren",
      "PASO 3 · 3 DE 3 · CONFIRMACIÓN DE NOMBRE Y DESCRIPTOR": "SCHRITT 3 · 3 VON 3 · BESTÄTIGUNG VON NAME & SLOGAN",
      "Tu identidad verbal está lista para pasar al diseño visual": "Deine verbale Identität ist bereit für das visuelle Design",
      "NOMBRE OFICIAL CONFIRMADO": "BESTÄTIGTER OFFIZIELLER NAME",
      "Descriptor o Eslogan Oficial (derivado de tu giro):": "Offizieller Descriptor oder Slogan (abgeleitet aus deiner Branche):",
      "1. Tradición Clásica vs. Vanguardia Tecnológica": "1. Klassische Tradition vs. Technologische Avantgarde",
      "Herencia Clásica (Rolex)": "Klassisches Erbe (Rolex)",
      "Corona Heráldica & Serifas": "Heraldische Krone & Serifen",
      "Vanguardia Pura (Apple / Tesla)": "Reine Avantgarde (Apple / Tesla)",
      "Silueta Monolítica Minimalista": "Minimalistische Monolith-Silhouette",
      "2. Síntesis de 1 Trazo vs. Riqueza Heráldica": "2. 1-Strich-Synthese vs. Heraldischer Reichtum",
      "Síntesis Absoluta (Nike)": "Absolute Synthese (Nike)",
      "1 Solo Trazo Fluido Continuo": "1 durchgehender flüssiger Schwung",
      "Blasón Multicapa (Porsche)": "Mehrschichtiges Wappen (Porsche)",
      "Escudo Cuadripartito Detallado": "Detaillierter vierteiliger Wappenschild",
      "3. Cercanía Humana vs. Prestigio de Ingeniería": "3. Menschliche Nähe vs. Ingenieurs-Prestige",
      "Calidez Orgánica (Airbnb)": "Organische Wärme (Airbnb)",
      "Bucle Continuo Acogedor": "Einladende durchgehende Schleife",
      "Alta Precisión (TAG Heuer / NVIDIA)": "Höchste Präzision (TAG Heuer / NVIDIA)",
      "Geometría Angular de Precisión": "Winklige Präzisionsgeometrie",
      "4. Sello Artesanal de Autor vs. Velocidad Digital": "4. Handwerkliches Autorensiegel vs. Digitale Dynamik",
      "Óptica & Autor (Leica)": "Optik & Handschrift (Leica)",
      "Medallón Caligráfico Táctil": "Taktiles kalligrafisches Medaillon",
      "Aerodinámica Digital (Formula 1)": "Digitale Aerodynamik (Formula 1)",
      "Vectores de Velocidad a 25°": "25°-Geschwindigkeitsvektoren",
      "5. Solidez Institucional vs. Energía Competitiva": "5. Institutionelle Stärke vs. Wettbewerbsenergie",
      "Monolito Corporativo (IBM)": "Corporate Monolith (IBM)",
      "Estabilidad Horizontal Ortogonal": "Orthogonale horizontale Stabilität",
      "Adrenalina Angular (Valorant / Red Bull)": "Winkliges Adrenalin (Valorant / Red Bull)",
      "Cortes Diagonales de Impacto": "Kraftvolle diagonale Schnitte",
      "6. Canon Clásico de Lujo vs. Disrupción Radical": "6. Klassischer Luxuskanon vs. Radikale Disruption",
      "Monograma Simétrico (Chanel)": "Symmetrisches Monogramm (Chanel)",
      "Anillos Entrelazados Eternos": "Zeitlos verschlungene Ringe",
      "Vanguardia Disruptiva (Nothing / Twitch)": "Disruptive Avantgarde (Nothing / Twitch)",
      "Matriz de Puntos & Prisma": "Punktmatrix & Prisma",
      "7. Curvas Fibonacci Orgánicas vs. Retícula Suiza Pura": "7. Organische Fibonacci-Kurven vs. Reines Schweizer Raster",
      "Espiral Orgánica (Nautilus)": "Organische Spirale (Nautilus)",
      "Curvas Continuas sin Esquinas": "Durchgehende Kurven ohne Ecken",
      "Retícula Bauhaus 45°/90° (Braun)": "Bauhaus-Raster 45°/90° (Braun)",
      "Círculo, Cuadrado y Triángulo Puros": "Reiner Kreis, Quadrat und Dreieck",
      "PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE + ADOBE FONTS)": "SCHRITT 4 · 4 VON 5 · HYBRIDES TYPOGRAFIESYSTEM (OPEN SOURCE + ADOBE FONTS)",
      "PASO 4 · 4 DE 5 · SELECCIÓN DE TIPOS DE FUENTES": "SCHRITT 4 · 4 VON 5 · SCHRIFTAUSWAHL",
      "Toca un estilo arriba y elige la tríada oficial para": "Tippe oben auf einen Stil und wähle die offizielle Schrift-Triade für",
      "1. Ingeniería & Geométrica": "1. Engineering & Geometrisch",
      "2. Suiza & Tecnológica": "2. Schweizer & Technologisch",
      "3. Editorial & Lujo Serif": "3. Editorial & Luxus-Serif",
      "4. Vanguardia & Impacto": "4. Avantgarde & Impact",
      "5. ✦ Adobe Fonts (Híbrido)": "5. ✦ Adobe Fonts (Hybrid)",
      "Modo Híbrido (Opcional · Web Project ID):": "Hybrid-Modus (Optional · Web Project ID):",
      "Conectar Kit": "Kit verbinden",
      "3 .TTF LIBRES": "3 FREIE .TTF",
      "HÍBRIDO ADOBE": "ADOBE HYBRID",
      "Titular:": "Titel:",
      "Cuerpo:": "Text:",
      "Equivalente 100% libre:": "100% freies Äquivalent:",
      "Tríada activa:": "Aktive Triade:",
      "Titulares": "Titel",
      "Cuerpo": "Fließtext",
      "Acentos": "Akzente",
      "Descargar Kit Híbrido de Fuentes (.ZIP)": "Hybrides Schriften-Kit herunterladen (.ZIP)",
      "PASO 4 · 5 DE 5 · ESTRUCTURA BASE E IDEA DE PARTIDA": "SCHRITT 4 · 5 VON 5 · GRUNDSTRUKTUR & AUSGANGSIDEE",
      "1. Monograma Constructivo y Ligadura": "1. Konstruktives Monogramm & Ligatur",
      "Geometría modular e iniciales entrelazadas": "Modulare Geometrie und verschlungene Initialen",
      "2. Emblema y Escudo de Autoridad": "2. Emblem & Autoritätswappen",
      "Heráldica contemporánea y simetría axial": "Zeitgenössische Heraldik und Achsensymmetrie",
      "3. Símbolo Continuo y Espacio Negativo": "3. Kontinuierliches Symbol & Negativraum",
      "Fluidez orgánica y proporción áurea": "Organischer Fluss und Goldener Schnitt",
      "4. Volumen Tridimensional y Prisma": "4. Dreidimensionales Volumen & Prisma",
      "Facetas escultóricas y refracción de luz": "Skulpturale Facetten und Lichtbrechung",
      "¿Tienes una idea, símbolo u objeto de partida para tu logotipo? (Opcional · ej. unas alas, una estrella, un escudo, una montaña):": "Hast du eine Ausgangsidee, ein Symbol oder Objekt für dein Logo? (Optional · z. B. Flügel, Stern, Wappen, Berg):",
      "Déjalo en blanco para que el sistema lo infiera de tu giro o escribe aquí tu símbolo inicial...": "Leer lassen, damit das System es aus deiner Branche ableitet, oder gib hier dein Wunschsymbol ein...",
      "PASO 5 · 1 DE 2 · ACABADO, LOGO BASE Y PALETA": "SCHRITT 5 · 1 VON 2 · FINISH, BASISLOGO & FARBPALETTE",
      "Abrir Lienzo de Logotipo": "Logo-Atelier öffnen",
      "¿Ya tienes un logo y quieres mantenerlo o tomarlo como base?": "Hast du bereits ein Logo und möchtest es behalten oder als Basis weiterentwickeln?",
      "Mantenerlo": "Behalten",
      "Evolucionar como base": "Als Basis weiterentwickeln",
      "Cristal Volumétrico 3D (Liquid Glass)": "Volumetrisches 3D-Glas (Liquid Glass)",
      "Degradado Multicapa Fluido": "Fließender Mehrschicht-Verlauf",
      "Emblema Figurativo en Capas": "Mehrschichtiges figuratives Emblem",
      "Sello Grabado de Oficio": "Graviertes Handwerkssiegel",
      "Ilustración Expresiva 3D": "Expressive 3D-Illustration",
      "Síntesis Geométrica Directa": "Direkte geometrische Synthese",
      "Paletas del Sistema:": "System-Farbpaletten:",
      "Colores de tu Logo": "Farben deines Logos",
      "Zafiro y Ámbar": "Saphir & Bernstein",
      "Esmeralda y Cobre": "Smaragd & Kupfer",
      "Carmesí y Oro": "Karmesin & Gold",
      "Magenta y Violeta": "Magenta & Violett",
      "Obsidiana y Oro": "Obsidian & Gold",
      "Obsidiana y Cian": "Obsidian & Cyan",
      "Confirmar Logo e Ir al Manual": "Logo bestätigen & zum Handbuch",
      "Evolucionar mi Logo": "Mein Logo weiterentwickeln",
      "Cambiar Base": "Basis wechseln",
      "Fondo Claro/Oscuro": "Heller/Dunkler Hintergrund",
      "✦ Símbolo Nano Banana Pro": "✦ Nano Banana Pro Symbol",
      "Generando Símbolo IA...": "KI-Symbol wird generiert...",
      "#1 · Tu Logo Base": "#1 · Dein Basislogo",
      "#1 · Base": "#1 · Basis",
      "GEMINI REDISEÑANDO TU LOGOTIPO SIN LÍMITES...": "GEMINI GESTALTET DEIN LOGO NEU...",
      "Interacción 100% abierta a Gemini sin límites: cambia por completo el objeto o forma principal (ej. águila, león, taza de café, cohete, árbol, espada), transforma su estructura, estilo, colores o tipografía y pulsa Aplicar...": "100% offene Gemini-Steuerung: Ändere das Hauptsymbol (z. B. Adler, Löwe, Kaffeetasse, Rakete, Baum, Wappen), Struktur, Stil, Farben oder Typografie und klicke auf Anwenden...",
      "Ir a Descargas": "Zu den Downloads",
      "Anterior": "Zurück",
      "Siguiente": "Weiter",
      "Ilustrar Capítulos (Flow IA)": "Kapitel illustrieren (Flow KI)",
      "Generando 6 Fotos IA...": "6 KI-Fotos werden erstellt...",
      "Exportar PDF (36 Láminas)": "PDF exportieren (36 Seiten)",
      "Descargar / Guardar PDF (30 Láminas)": "PDF herunterladen / speichern (36 Seiten)",
      "Ver Mapa de Avance": "Fortschrittskarte ansehen",
      "PASO 6 · 2 DE 2 · BÓVEDA DE LOS 9 ENTREGABLES EJECUTIVOS DE TU MARCA": "SCHRITT 6 · 2 VON 2 · TRESOR DER 9 EXEKUTIVEN LIEFERPAKETE DEINER MARKE",
      "PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN": "SCHRITT 6 · 2 VON 2 · DOWNLOAD- & PRODUKTIONSTRESOR",
      "Los 9 activos oficiales de tu identidad listos para descarga inmediata en curvas vectoriales (.SVG / .AI), documentos editables (.DOCX / .PPTX / .HTML), manual editorial de 36 láminas (.PDF) y Kit Híbrido de Fuentes (.ZIP).": "Alle 9 offiziellen Marken-Assets bereit zum sofortigen Download als Vektorkurven (.SVG / .AI), editierbare Vorlagen (.DOCX / .PPTX / .HTML), 36-Seiten-Handbuch (.PDF) und hybrides Schriften-Kit (.ZIP).",
      "1. Descargar Manual Oficial Completo en PDF Directo (36 Láminas .PDF)": "1. Komplettes offizielles Markenhandbuch als PDF herunterladen (36 Seiten .PDF)",
      "2. Descargar Manual Interactivo Autónomo (.HTML 36 Láminas)": "2. Interaktives Standalone-Handbuch herunterladen (36 Seiten .HTML)",
      "3. Descargar Suite de Logotipos en Curvas (.SVG / .AI + PNG 4K Transparente)": "3. Vektor-Logo-Suite herunterladen (.SVG / .AI + 4K transparentes PNG)",
      "4. Descargar Plantilla Oficial de Hoja Membretada (.DOCX Editable en Word)": "4. Offizielle Briefpapier-Vorlage herunterladen (Editierbares Word .DOCX)",
      "5. Descargar Plantilla de Presentación Ejecutiva (.PPTX Editable 16:9)": "5. Executive-Präsentationsvorlage herunterladen (Editierbares 16:9 .PPTX)",
      "6. Abrir Generador de Firma de Correo Corporativa (.HTML + Foto / Logo)": "6. E-Mail-Signatur-Generator öffnen (.HTML + Foto / Logo)",
      "7. Ver Sitio Web Funcional Conectado a tu Brandbook (Próximamente)": "7. Mit deinem Brandbook verbundene Website ansehen (Demnächst)",
      "8. Ver Fábrica de Redes Sociales y Estrategia Digital (6 Agentes IA · Próximamente)": "8. Social-Media-Fabrik & Digitalstrategie ansehen (6 KI-Agenten · Demnächst)",
      "9. Descargar Kit Híbrido de Fuentes Oficiales (.ZIP con .TTF + CSS + Licencia OFL)": "9. Offizielles hybrides Schriften-Kit herunterladen (.ZIP mit .TTF + CSS + OFL-Lizenz)",
      "← Volver al Visor Interactivo de las 36 Láminas (01 a 36)": "← Zurück zum interaktiven 36-Seiten-Viewer (01 bis 36)",
      "Mapa de Recorrido (Pasos 0 al 6)": "Marken-Fortschrittskarte (Schritte 0 bis 6)",
      "Toca cualquier fase para ir directamente o reiniciar su avance sin perder los demás pasos.": "Tippe auf eine Phase, um direkt dorthin zu springen oder sie zurückzusetzen.",
      "Volver al Paso Activo": "Zurück zum aktiven Schritt",
      "PASO 0 · PUNTO DE PARTIDA": "SCHRITT 0 · AUSGANGSPUNKT",
      "Objetivo, Nombre Inicial y Giro del Negocio": "Zielsetzung, Initialname & Unternehmensbranche",
      "PASO 1 · ESENCIA Y MANIFIESTO": "SCHRITT 1 · ESSENZ & MANIFEST",
      "Círculo Dorado y los 7 Pilares Estratégicos": "Golden Circle & die 7 strategischen Säulen",
      "PASO 2 · RECORRIDO DEL CLIENTE": "SCHRITT 2 · CUSTOMER JOURNEY",
      "Touchpoints Antes, Durante y Después de la Compra": "Touchpoints Vor, Während & Nach dem Kauf",
      "PASO 3 · NOMBRE Y BLINDAJE": "SCHRITT 3 · NAMING & MARKENSCHUTZ",
      "Naming Estratégico, Fonética y Clase Niza": "Strategisches Naming, Phonetik & Nizza-Klasse",
      "PASO 4 · PERSONALIDAD VISUAL": "SCHRITT 4 · VISUELLE PERSÖNLICHKEIT",
      "Sliders Kansei, Tipografía y Estructura Base": "Kansei-Regler, Typografie & Grundstruktur",
      "PASO 5 · ESTUDIO DE LOGOTIPO": "SCHRITT 5 · LOGO-ATELIER",
      "Iteración de Símbolo, Paleta y Geometría": "Symbol-Iteration, Farbpalette & Geometrie",
      "PASO 6 · MANUAL Y ENTREGABLES": "SCHRITT 6 · HANDBUCH & LIEFERPAKETE",
      "Brandbook Completo y Descarga Ejecutiva": "Komplettes Brandbook & Executive-Download",
      "Ir": "Öffnen",
      "Reiniciar": "Zurücksetzen",
      "Menú General del Sistema": "Hauptmenü des Systems",
      "Mi Cuenta y Dispositivos": "Mein Konto & Geräte",
      "Ir a Paso 0 (Inicio)": "Zu Schritt 0 (Start)",
      "Ir a Paso 1 (Esencia)": "Zu Schritt 1 (Essenz)",
      "Ir a Paso 2 (Recorrido)": "Zu Schritt 2 (Journey)",
      "Ir a Paso 3 (Nombre)": "Zu Schritt 3 (Naming)",
      "Ir a Paso 4 (Personalidad)": "Zu Schritt 4 (Persönlichkeit)",
      "Ir a Paso 5 (Estudio Logo)": "Zu Schritt 5 (Logo-Atelier)",
      "Ir a Paso 6 (Manual y Descargas)": "Zu Schritt 6 (Handbuch & Downloads)",
      "SINCRONIZACIÓN MULTI-DISPOSITIVO EN VIVO": "LIVE-MULTIGERÄTE-SYNCHRONISIERUNG",
      "Inicia sesión para sincronizar tus dispositivos automáticamente": "Melde dich an, um deine Geräte automatisch zu synchronisieren",
      "Iniciar Sesión y Sincronizar Dispositivos": "Anmelden & Geräte synchronisieren",
      "Iniciar Sesión y Sincronizar mis Dispositivos": "Anmelden & meine Geräte synchronisieren",
      "Cerrar Sesión": "Abmelden",
      "DISPOSITIVOS SINCRONIZADOS CON TU CUENTA": "MIT DEINEM KONTO SYNCHRONISIERTE GERÄTE",
      "Sincronizar Ahora con mis Dispositivos": "Jetzt mit meinen Geräten synchronisieren",
      "Borrar Sesión de Otros Dispositivos": "Sitzung auf anderen Geräten entfernen",
      "Continuar con mi Marca": "Weiter mit meiner Marke",
      "Continuar a mi Marca": "Weiter zu meiner Marke",
      "Hola, soy Aura.": "Hallo, ich bin Aura.",
      "Tu Mentora de Identidad": "Deine Markenmentorin",
      "Iniciar Taller con Aura": "Studio mit Aura starten",
      "Web Comercial / Comprar": "Webseite / Kaufen",
      "CÁPSULA DEL FUNDADOR · HEYGEN + GOOGLE FLOW": "GRÜNDER-KAPSEL · HEYGEN + GOOGLE FLOW",
      "TU AVANCE SINCRONIZADO:": "DEIN SYNCHRONISIERTER FORTSCHRITT:",
      "Continuar al Paso": "Weiter zum Schritt",
      "Omitir video": "Video überspringen",
      "Paso 0 · Inicio": "Schritt 0 · Start",
      "Paso 3 · Naming": "Schritt 3 · Naming",
      "Paso 4 · Kansei": "Schritt 4 · Kansei",
      "Paso 5 · Logotipo": "Schritt 5 · Logo",
      "Paso 6 · Manual": "Schritt 6 · Handbuch"
    },
    it: {
      "Mapa": "Mappa",
      "Video": "Video",
      "Atrás": "Indietro",
      "Adelante": "Avanti",
      "Finalizar": "Concludi",
      "Hablar": "Parla",
      "Dictar Giro": "Dettare Settore",
      "Iterar con Gemini": "Itera con Gemini",
      "Gemini diseñando...": "Gemini sta progettando...",
      "Diseñando...": "Progettazione...",
      "Aplicar con Gemini": "Applica con Gemini",
      "Inicio": "Inizio",
      "Taller": "Atelier",
      "Manual": "Manuale",
      "Cuenta": "Account",
      "En Vivo": "Live",
      "Menú": "Menu",
      "Cerrar": "Chiudi",
      "AURA · MENTORA DE MARCA": "AURA · MENTORE DI BRAND",
      "AURA · ADMIN IMPROBEARS": "AURA · ADMIN IMPROBEARS",
      "Paso 0 · Inicio & Giro": "Passo 0 · Inizio & Settore",
      "Paso 1 · Círculo Dorado": "Passo 1 · Cerchio d'Oro",
      "Paso 2 · Touchpoints": "Passo 2 · Touchpoints",
      "Paso 3 · Naming & Niza": "Passo 3 · Naming & Nizza",
      "Paso 4 · Personalidad": "Passo 4 · Personalità",
      "Paso 5 · Logotipos": "Passo 5 · Loghi",
      "Paso 6 · Manual 36 Láminas": "Passo 6 · Manuale 36 Tavole",
      "⚡ Cargar Admin (TheBestBrand)": "⚡ Carica Admin (TheBestBrand)",
      "⚡ Admin TBB": "⚡ Admin TBB",
      "Web ↗": "Web ↗",
      "CONSEJERO OFICIAL": "CONSIGLIERE UFFICIALE",
      "Relevancia de Categoría & Brand Equity": "Rilevanza di Categoria & Brand Equity",
      "Propósito Nuclear & El Círculo Dorado": "Scopo Centrale & Il Cerchio d'Oro",
      "Momentos de la Verdad & Touchpoints": "Momenti della Verità & Touchpoints",
      "Posicionamiento en la Mente & Naming": "Posizionamento nella Mente & Naming",
      "Rigor Simbólico & Test de Rand": "Rigore Simbolico & Test di Rand",
      "Ingeniería Kansei & Proporción 70/20/10": "Kansei Engineering & Proporzione 70/20/10",
      "Estrategia Competitiva & Gobernanza": "Strategia Competitiva & Governance",
      "PASO 0 · 1 DE 3 · OBJETIVO": "PASSO 0 · 1 DI 3 · OBIETTIVO",
      "¿Cuál es tu objetivo principal al construir tu marca hoy?": "Qual è il tuo obiettivo principale nel costruire il tuo brand oggi?",
      "Crear mi primera marca desde cero": "Creare il mio primo brand da zero",
      "Evolucionar y profesionalizar mi marca actual": "Far evolvere e professionalizzare il mio brand attuale",
      "Crear una nueva sub-marca o división": "Creare un nuovo sub-brand o divisione",
      "Selecciona una opción y presiona Adelante en la barra inferior.": "Seleziona un'opzione e premi Avanti nella barra inferiore.",
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGOTIPO ACTUAL": "PASSO 0 · 2 DI 3 · NOME E LOGO ATTUALE",
      "PASO 0 · 2 DE 3 · NOMBRE Y LOGO ACTUAL": "PASSO 0 · 2 DI 3 · NOME E LOGO ATTUALE",
      "PASO 0 · 2 DE 3 · SITUACIÓN DEL NOMBRE": "PASSO 0 · 2 DI 3 · STATO DEL NOME",
      "¿Ya cuentas con el nombre o un logotipo actual para tu marca?": "Hai già un nome o un logo attuale per il tuo brand?",
      "¿Ya cuentas con el nombre de tu marca o lo desarrollamos en el Paso 3?": "Hai già il nome del tuo brand o lo sviluppiamo nel Passo 3?",
      "Definirlo más adelante": "Definirlo più avanti",
      "Ya tengo mi nombre": "Ho già il mio nome",
      "Nombre de tu marca (si ya lo tienes):": "Nome del tuo brand (se lo hai già):",
      "Escribe aquí el nombre de tu marca": "Scrivi qui il nome del tuo brand",
      "¿Ya tienes un logotipo actual? (Opcional)": "Hai già un logo attuale? (Opzionale)",
      "Subir mi Logo Actual (.PNG, .JPG, .SVG)": "Carica il Mio Logo Attuale (.PNG, .JPG, .SVG)",
      "Subir mi Logo Actual": "Carica il Mio Logo Attuale",
      "Cambiar": "Cambia",
      "Quitar": "Rimuovi",
      "✓ Tu logotipo oficial está activo en el motor, en el lienzo y en las 30 láminas": "✓ Il tuo logo ufficiale è attivo nel motore, sulla tela e nelle 36 tavole",
      "Si lo subes, el motor lo mantendrá como tu logotipo oficial en todo el recorrido y en las 30 láminas.": "Se lo carichi, il motore lo manterrà come logo ufficiale in tutto il percorso e nelle 36 tavole.",
      "Si lo subes, podrás mantenerlo tal cual o pedirle al motor generador que lo tome como base para evolucionarlo.": "Se lo carichi, potrai mantenerlo così com'è o usarlo come base per farlo evolvere.",
      "Logo actual cargado en el motor": "Logo attuale caricato nel motore",
      "Colores detectados:": "Colori rilevati:",
      "Mantener mi logo actual": "Mantieni il mio logo attuale",
      "Tomarlo como base y mejorar": "Usalo come base e miglioralo",
      "Toda esta información y tu logo alimentan automáticamente el motor del Paso 5 y las 30 láminas.": "Tutte queste informazioni e il tuo logo alimentano automaticamente il Passo 5 e le 36 tavole.",
      "Toda esta información alimenta automáticamente los siguientes pasos.": "Tutte queste informazioni alimentano automaticamente i passaggi successivi.",
      "PASO 0 · 3 DE 3 · GIRO Y ACTIVIDAD": "PASSO 0 · 3 DI 3 · SETTORE E ATTIVITÀ",
      "¿En qué giro o actividad se enfoca tu empresa y qué ofrece?": "Su quale settore o attività si concentra la tua impresa e cosa offre?",
      "Describe con tus palabras a qué se dedica tu empresa, qué producto o servicio entregas y para quién...": "Descrivi con parole tue di cosa si occupa la tua azienda, quale prodotto o servizio offri e per chi...",
      "Corregir ortografía y expresar mi idea con claridad ejecutiva": "Correggi l'ortografia ed esprimi la mia idea con chiarezza esecutiva",
      "Corregir ortografía y redactar mi idea con claridad": "Correggi l'ortografia e redigi la mia idea con chiarezza",
      "Síntesis detectada por el sistema:": "Sintesi rilevata dal sistema:",
      "Escribe arriba tu giro para que el sistema adapte todo tu recorrido.": "Scrivi sopra il tuo settore affinché il sistema adatti l'intero percorso.",
      "El sistema generará las preguntas, puntos de contacto, nombres y logotipo a partir de lo que escribas aquí.": "Il sistema genererà domande, touchpoint, nomi e logo a partire da ciò che scrivi qui.",
      "Guardar e Ir al Paso 1": "Salva e Vai al Passo 1",
      "Comprobar y Siguiente": "Verifica e Avanti",
      "Completar Paso 1": "Completa Passo 1",
      "Escribe o dicta tu respuesta para esta dimensión de tu marca...": "Scrivi o detta la tua risposta per questa dimensione del tuo brand...",
      "Opciones sintetizadas desde la información de tu marca:": "Opzioni sintetizzate dalle informazioni del tuo brand:",
      "¿Por qué existe tu marca más allá de generar ingresos y qué cambio positivo busca lograr?": "Perché esiste il tuo brand oltre a generare ricavi e quale cambiamento positivo vuole ottenere?",
      "¿Qué hace única a tu propuesta frente a las alternativas actuales del mercado?": "Cosa rende unica la tua proposta rispetto alle alternative attuali del mercato?",
      "¿Cómo mejora concretamente la vida o el trabajo de quienes eligen tu marca?": "Come migliora concretamente la vita o il lavoro di chi sceglie il tuo brand?",
      "¿Cuáles son los pasos clave con los que garantizas calidad en tu producto o servicio?": "Quali sono i passaggi chiave con cui garantisci qualità nel tuo prodotto o servizio?",
      "¿En una sola frase clara, qué quieres que tus clientes recuerden siempre de tu marca?": "In una sola frase chiara, cosa vuoi che i tuoi clienti ricordino sempre del tuo brand?",
      "Si tu marca fuera una persona, ¿cómo hablaría, cómo trataría al cliente y qué actitud tendría?": "Se il tuo brand fosse una persona, come parlerebbe, come tratterebbe il cliente e che atteggiamento avrebbe?",
      "¿Quién es tu cliente ideal, qué es lo que más valora y qué problema urgente le resuelves?": "Chi è il tuo cliente ideale, cosa apprezza di più e quale problema urgente gli risolvi?",
      "1. ANTES DE LA COMPRA": "1. PRIMA DELL'ACQUISTO",
      "2. DURANTE LA COMPRA": "2. DURANTE L'ACQUISTO",
      "3. DESPUÉS DE LA COMPRA": "3. DOPO L'ACQUISTO",
      "¿Por qué medios te descubren y evalúan tus clientes antes de comprar?": "Attraverso quali canali i clienti ti scoprono e ti valutano prima di acquistare?",
      "¿Dónde ocurre la experiencia principal y el contacto directo durante el servicio o compra?": "Dove avviene l'esperienza principale e il contatto diretto durante il servizio o l'acquisto?",
      "¿Cómo mantienes la relación, el soporte y la lealtad después de la entrega?": "Come mantieni la relazione, il supporto e la fedeltà dopo la consegna?",
      "Agregar otro punto de contacto propio...": "Aggiungi un altro touchpoint personalizzato...",
      "Agregar": "Aggiungi",
      "PASO 3 · 1 DE 3 · NOMBRE PROPIO O RAÍCES DEL SISTEMA": "PASSO 3 · 1 DI 3 · NOME PROPRIO O RADICI DEL SISTEMA",
      "Define o confirma el nombre de tu marca (o explora propuestas del sistema en el siguiente paso)": "Definisci o conferma il nome del tuo brand (o esplora le proposte del sistema nel passo successivo)",
      "Nombre Oficial de la Marca:": "Nome Ufficiale del Brand:",
      "Escribe el nombre de tu marca": "Scrivi il nome del tuo brand",
      "Raíces extraídas automáticamente de tus respuestas de los Pasos 0 y 1:": "Radici estratte automaticamente dalle tue risposte dei Passi 0 e 1:",
      "Completa el Paso 0 y 1 para extraer raíces adicionales": "Completa i Passi 0 e 1 per estrarre ulteriori radici",
      "Presiona Adelante para explorar variantes generadas por el sistema o confirmar tu nombre.": "Premi Avanti per esplorare le varianti generate dal sistema o confermare il tuo nome.",
      "PASO 3 · 2 DE 3 · PROPUESTAS GENERADAS POR EL SISTEMA": "PASSO 3 · 2 DI 3 · PROPOSTE GENERATE DAL SISTEMA",
      "Toca cualquier propuesta para seleccionarla como Nombre Oficial": "Tocca qualsiasi proposta per selezionarla come Nome Ufficiale",
      "Generar Nuevas": "Genera Nuove",
      "PASO 3 · 3 DE 3 · CONFIRMACIÓN DE NOMBRE Y DESCRIPTOR": "PASSO 3 · 3 DI 3 · CONFERMA DI NOME E DESCRITTORE",
      "Tu identidad verbal está lista para pasar al diseño visual": "La tua identità verbale è pronta per passare al design visivo",
      "NOMBRE OFICIAL CONFIRMADO": "NOME UFFICIALE CONFERMATO",
      "Descriptor o Eslogan Oficial (derivado de tu giro):": "Descrittore o Slogan Ufficiale (derivato dal tuo settore):",
      "1. Tradición Clásica vs. Vanguardia Tecnológica": "1. Tradizione Classica vs Avanguardia Tecnologica",
      "Herencia Clásica (Rolex)": "Eredità Classica (Rolex)",
      "Corona Heráldica & Serifas": "Corona Araldica & Grazie",
      "Vanguardia Pura (Apple / Tesla)": "Avanguardia Pura (Apple / Tesla)",
      "Silueta Monolítica Minimalista": "Silhouette Monolitica Minimalista",
      "2. Síntesis de 1 Trazo vs. Riqueza Heráldica": "2. Sintesi in 1 Tratto vs Ricchezza Araldica",
      "Síntesis Absoluta (Nike)": "Sintesi Assoluta (Nike)",
      "1 Solo Trazo Fluido Continuo": "1 Solo Tratto Fluido Continuo",
      "Blasón Multicapa (Porsche)": "Blasone Multistrato (Porsche)",
      "Escudo Cuadripartito Detallado": "Scudo Quadripartito Dettagliato",
      "3. Cercanía Humana vs. Prestigio de Ingeniería": "3. Vicinanza Umana vs Prestigio Ingegneristico",
      "Calidez Orgánica (Airbnb)": "Calore Organico (Airbnb)",
      "Bucle Continuo Acogedor": "Anello Continuo Accogliente",
      "Alta Precisión (TAG Heuer / NVIDIA)": "Alta Precisione (TAG Heuer / NVIDIA)",
      "Geometría Angular de Precisión": "Geometria Angolare di Precisione",
      "4. Sello Artesanal de Autor vs. Velocidad Digital": "4. Sigillo Artigianale d'Autore vs Velocità Digitale",
      "Óptica & Autor (Leica)": "Ottica & Autore (Leica)",
      "Medallón Caligráfico Táctil": "Medaglione Calligrafico Tattile",
      "Aerodinámica Digital (Formula 1)": "Aerodinamica Digitale (Formula 1)",
      "Vectores de Velocidad a 25°": "Vettori di Velocità a 25°",
      "5. Solidez Institucional vs. Energía Competitiva": "5. Solidità Istituzionale vs Energia Competitiva",
      "Monolito Corporativo (IBM)": "Monolite Corporativo (IBM)",
      "Estabilidad Horizontal Ortogonal": "Stabilità Orizzontale Ortogonale",
      "Adrenalina Angular (Valorant / Red Bull)": "Adrenalina Angolare (Valorant / Red Bull)",
      "Cortes Diagonales de Impacto": "Tagli Diagonali d'Impatto",
      "6. Canon Clásico de Lujo vs. Disrupción Radical": "6. Canone Classico di Lusso vs Disruzione Radicale",
      "Monograma Simétrico (Chanel)": "Monogramma Simmetrico (Chanel)",
      "Anillos Entrelazados Eternos": "Anelli Intrecciati Eterni",
      "Vanguardia Disruptiva (Nothing / Twitch)": "Avanguardia Disruptiva (Nothing / Twitch)",
      "Matriz de Puntos & Prisma": "Matrice di Punti & Prisma",
      "7. Curvas Fibonacci Orgánicas vs. Retícula Suiza Pura": "7. Curve Fibonacci Organiche vs Griglia Svizzera Pura",
      "Espiral Orgánica (Nautilus)": "Spirale Organica (Nautilus)",
      "Curvas Continuas sin Esquinas": "Curve Continue senza Spigoli",
      "Retícula Bauhaus 45°/90° (Braun)": "Griglia Bauhaus 45°/90° (Braun)",
      "Círculo, Cuadrado y Triángulo Puros": "Cerchio, Quadrato e Triangolo Puri",
      "PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE + ADOBE FONTS)": "PASSO 4 · 4 DI 5 · SISTEMA TIPOGRAFICO IBRIDO (OPEN SOURCE + ADOBE FONTS)",
      "PASO 4 · 4 DE 5 · SELECCIÓN DE TIPOS DE FUENTES": "PASSO 4 · 4 DI 5 · SELEZIONE DEI CARATTERI",
      "Toca un estilo arriba y elige la tríada oficial para": "Tocca uno stile qui sopra e scegli la triade ufficiale per",
      "1. Ingeniería & Geométrica": "1. Ingegneria & Geometrica",
      "2. Suiza & Tecnológica": "2. Svizzera & Tecnologica",
      "3. Editorial & Lujo Serif": "3. Editoriale & Lusso Serif",
      "4. Vanguardia & Impacto": "4. Avanguardia & Impatto",
      "5. ✦ Adobe Fonts (Híbrido)": "5. ✦ Adobe Fonts (Ibrido)",
      "Modo Híbrido (Opcional · Web Project ID):": "Modalità Ibrida (Opzionale · Web Project ID):",
      "Conectar Kit": "Collega Kit",
      "3 .TTF LIBRES": "3 .TTF LIBERI",
      "HÍBRIDO ADOBE": "IBRIDO ADOBE",
      "Titular:": "Titolo:",
      "Cuerpo:": "Corpo:",
      "Equivalente 100% libre:": "Equivalente 100% libero:",
      "Tríada activa:": "Triade attiva:",
      "Titulares": "Titoli",
      "Cuerpo": "Corpo",
      "Acentos": "Accenti",
      "Descargar Kit Híbrido de Fuentes (.ZIP)": "Scarica Kit Ibrido di Font (.ZIP)",
      "PASO 4 · 5 DE 5 · ESTRUCTURA BASE E IDEA DE PARTIDA": "PASSO 4 · 5 DI 5 · STRUTTURA DI BASE E IDEA INIZIALE",
      "1. Monograma Constructivo y Ligadura": "1. Monogramma Costruttivo e Legatura",
      "Geometría modular e iniciales entrelazadas": "Geometria modulare e iniziali intrecciate",
      "2. Emblema y Escudo de Autoridad": "2. Emblema e Scudo d'Autorità",
      "Heráldica contemporánea y simetría axial": "Araldica contemporanea e simmetria assiale",
      "3. Símbolo Continuo y Espacio Negativo": "3. Simbolo Continuo e Spazio Negativo",
      "Fluidez orgánica y proporción áurea": "Fluidità organica e sezione aurea",
      "4. Volumen Tridimensional y Prisma": "4. Volume Tridimensionale e Prisma",
      "Facetas escultóricas y refracción de luz": "Sfaccettature scultoree e rifrazione della luce",
      "¿Tienes una idea, símbolo u objeto de partida para tu logotipo? (Opcional · ej. unas alas, una estrella, un escudo, una montaña):": "Hai un'idea, simbolo o oggetto di partenza per il tuo logo? (Opzionale · es. ali, stella, scudo, montagna):",
      "Déjalo en blanco para que el sistema lo infiera de tu giro o escribe aquí tu símbolo inicial...": "Lascia vuoto affinché il sistema lo deduca dal tuo settore oppure scrivi qui il tuo simbolo iniziale...",
      "PASO 5 · 1 DE 2 · ACABADO, LOGO BASE Y PALETA": "PASSO 5 · 1 DI 2 · FINITURA, LOGO BASE E PALETTE",
      "Abrir Lienzo de Logotipo": "Apri Tela del Logo",
      "¿Ya tienes un logo y quieres mantenerlo o tomarlo como base?": "Hai già un logo e vuoi mantenerlo o usarlo come base?",
      "Mantenerlo": "Mantienilo",
      "Evolucionar como base": "Fallo evolvere come base",
      "Cristal Volumétrico 3D (Liquid Glass)": "Cristallo Volumetrico 3D (Liquid Glass)",
      "Degradado Multicapa Fluido": "Gradiente Multistrato Fluido",
      "Emblema Figurativo en Capas": "Emblema Figurativo a Strati",
      "Sello Grabado de Oficio": "Sigillo Inciso d'Arte",
      "Ilustración Expresiva 3D": "Illustrazione Espressiva 3D",
      "Síntesis Geométrica Directa": "Sintesi Geometrica Diretta",
      "Paletas del Sistema:": "Palette del Sistema:",
      "Colores de tu Logo": "Colori del Tuo Logo",
      "Zafiro y Ámbar": "Zaffiro e Ambra",
      "Esmeralda y Cobre": "Smeraldo e Rame",
      "Carmesí y Oro": "Cremisi e Oro",
      "Magenta y Violeta": "Magenta e Viola",
      "Obsidiana y Oro": "Ossidiana e Oro",
      "Obsidiana y Cian": "Ossidiana e Ciano",
      "Confirmar Logo e Ir al Manual": "Conferma Logo e Vai al Manuale",
      "Evolucionar mi Logo": "Fai Evolvere il Mio Logo",
      "Cambiar Base": "Cambia Base",
      "Fondo Claro/Oscuro": "Sfondo Chiaro/Scuro",
      "✦ Símbolo Nano Banana Pro": "✦ Simbolo Nano Banana Pro",
      "Generando Símbolo IA...": "Generazione Simbolo IA...",
      "#1 · Tu Logo Base": "#1 · Il Tuo Logo Base",
      "#1 · Base": "#1 · Base",
      "GEMINI REDISEÑANDO TU LOGOTIPO SIN LÍMITES...": "GEMINI STA RIPROGETTANDO IL TUO LOGO...",
      "Interacción 100% abierta a Gemini sin límites: cambia por completo el objeto o forma principal (ej. águila, león, taza de café, cohete, árbol, espada), transforma su estructura, estilo, colores o tipografía y pulsa Aplicar...": "Interazione 100% aperta con Gemini: cambia l'oggetto o la forma principale (es. aquila, leone, tazza di caffè, razzo, albero, scudo), trasforma struttura, stile, colori o tipografia e premi Applica...",
      "Ir a Descargas": "Vai ai Download",
      "Anterior": "Precedente",
      "Siguiente": "Successivo",
      "Ilustrar Capítulos (Flow IA)": "Illustra Capitoli (Flow IA)",
      "Generando 6 Fotos IA...": "Generazione di 6 Foto IA...",
      "Exportar PDF (36 Láminas)": "Esporta PDF (36 Tavole)",
      "Descargar / Guardar PDF (30 Láminas)": "Scarica / Salva PDF (36 Tavole)",
      "Ver Mapa de Avance": "Vedi Mappa dei Progressi",
      "PASO 6 · 2 DE 2 · BÓVEDA DE LOS 9 ENTREGABLES EJECUTIVOS DE TU MARCA": "PASSO 6 · 2 DI 2 · CASSAFORTE DEI 9 DELIVERABLE ESECUTIVI DEL TUO BRAND",
      "PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN": "PASSO 6 · 2 DI 2 · CASSAFORTE DI DOWNLOAD E PRODUZIONE",
      "Los 9 activos oficiales de tu identidad listos para descarga inmediata en curvas vectoriales (.SVG / .AI), documentos editables (.DOCX / .PPTX / .HTML), manual editorial de 36 láminas (.PDF) y Kit Híbrido de Fuentes (.ZIP).": "Tutti i 9 asset ufficiali della tua identità pronti per il download immediato in curve vettoriali (.SVG / .AI), documenti modificabili (.DOCX / .PPTX / .HTML), manuale di 36 tavole (.PDF) e Kit Ibrido di Font (.ZIP).",
      "1. Descargar Manual Oficial Completo en PDF Directo (36 Láminas .PDF)": "1. Scarica il Manuale Ufficiale Completo in PDF Diretto (36 Tavole .PDF)",
      "2. Descargar Manual Interactivo Autónomo (.HTML 36 Láminas)": "2. Scarica il Manuale Interattivo Autonomo (.HTML 36 Tavole)",
      "3. Descargar Suite de Logotipos en Curvas (.SVG / .AI + PNG 4K Transparente)": "3. Scarica la Suite di Loghi Vettoriali (.SVG / .AI + PNG 4K Trasparente)",
      "4. Descargar Plantilla Oficial de Hoja Membretada (.DOCX Editable en Word)": "4. Scarica il Modello Ufficiale di Carta Intestata (.DOCX Modificabile in Word)",
      "5. Descargar Plantilla de Presentación Ejecutiva (.PPTX Editable 16:9)": "5. Scarica il Modello di Presentazione Esecutiva (.PPTX Modificabile 16:9)",
      "6. Abrir Generador de Firma de Correo Corporativa (.HTML + Foto / Logo)": "6. Apri il Generatore di Firma Email Aziendale (.HTML + Foto / Logo)",
      "7. Ver Sitio Web Funcional Conectado a tu Brandbook (Próximamente)": "7. Vedi Sito Web Funzionale Connesso al Tuo Brandbook (Prossimamente)",
      "8. Ver Fábrica de Redes Sociales y Estrategia Digital (6 Agentes IA · Próximamente)": "8. Vedi Fabbrica Social Media e Strategia Digitale (6 Agenti IA · Prossimamente)",
      "9. Descargar Kit Híbrido de Fuentes Oficiales (.ZIP con .TTF + CSS + Licencia OFL)": "9. Scarica il Kit Ibrido di Font Ufficiali (.ZIP con .TTF + CSS + Licenza OFL)",
      "← Volver al Visor Interactivo de las 36 Láminas (01 a 36)": "← Torna al Visualizzatore Interattivo delle 36 Tavole (01 a 36)",
      "Mapa de Recorrido (Pasos 0 al 6)": "Mappa del Percorso (Passi 0 a 6)",
      "Toca cualquier fase para ir directamente o reiniciar su avance sin perder los demás pasos.": "Tocca qualsiasi fase per accedervi direttamente o reimpostarne i progressi.",
      "Volver al Paso Activo": "Torna al Passo Attivo",
      "PASO 0 · PUNTO DE PARTIDA": "PASSO 0 · PUNTO DI PARTENZA",
      "Objetivo, Nombre Inicial y Giro del Negocio": "Obiettivo, Nome Iniziale e Settore d'Impresa",
      "PASO 1 · ESENCIA Y MANIFIESTO": "PASSO 1 · ESSENZA E MANIFESTO",
      "Círculo Dorado y los 7 Pilares Estratégicos": "Cerchio d'Oro e i 7 Pilastri Strategici",
      "PASO 2 · RECORRIDO DEL CLIENTE": "PASSO 2 · PERCORSO DEL CLIENTE",
      "Touchpoints Antes, Durante y Después de la Compra": "Touchpoint Prima, Durante e Dopo l'Acquisto",
      "PASO 3 · NOMBRE Y BLINDAJE": "PASSO 3 · NAMING E TUTELA",
      "Naming Estratégico, Fonética y Clase Niza": "Naming Strategico, Fonetica e Classe di Nizza",
      "PASO 4 · PERSONALIDAD VISUAL": "PASSO 4 · PERSONALITÀ VISIVA",
      "Sliders Kansei, Tipografía y Estructura Base": "Cursori Kansei, Tipografia e Struttura di Base",
      "PASO 5 · ESTUDIO DE LOGOTIPO": "PASSO 5 · ATELIER DEL LOGO",
      "Iteración de Símbolo, Paleta y Geometría": "Iterazione del Simbolo, Palette e Geometria",
      "PASO 6 · MANUAL Y ENTREGABLES": "PASSO 6 · MANUALE E DELIVERABLE",
      "Brandbook Completo y Descarga Ejecutiva": "Brandbook Completo e Download Esecutivo",
      "Ir": "Vai",
      "Reiniciar": "Reimposta",
      "Menú General del Sistema": "Menu Generale del Sistema",
      "Mi Cuenta y Dispositivos": "Il Mio Account e Dispositivi",
      "Ir a Paso 0 (Inicio)": "Vai al Passo 0 (Inizio)",
      "Ir a Paso 1 (Esencia)": "Vai al Passo 1 (Essenza)",
      "Ir a Paso 2 (Recorrido)": "Vai al Passo 2 (Percorso)",
      "Ir a Paso 3 (Nombre)": "Vai al Passo 3 (Nome)",
      "Ir a Paso 4 (Personalidad)": "Vai al Passo 4 (Personalità)",
      "Ir a Paso 5 (Estudio Logo)": "Vai al Passo 5 (Atelier Logo)",
      "Ir a Paso 6 (Manual y Descargas)": "Vai al Passo 6 (Manuale e Download)",
      "SINCRONIZACIÓN MULTI-DISPOSITIVO EN VIVO": "SINCRONIZZAZIONE MULTI-DISPOSITIVO LIVE",
      "Inicia sesión para sincronizar tus dispositivos automáticamente": "Accedi per sincronizzare automaticamente i tuoi dispositivi",
      "Iniciar Sesión y Sincronizar Dispositivos": "Accedi e Sincronizza Dispositivi",
      "Iniciar Sesión y Sincronizar mis Dispositivos": "Accedi e Sincronizza i Miei Dispositivi",
      "Cerrar Sesión": "Esci",
      "DISPOSITIVOS SINCRONIZADOS CON TU CUENTA": "DISPOSITIVI SINCRONIZZATI CON IL TUO ACCOUNT",
      "Sincronizar Ahora con mis Dispositivos": "Sincronizza Ora con i Miei Dispositivi",
      "Borrar Sesión de Otros Dispositivos": "Rimuovi Sessione dagli Altri Dispositivi",
      "Continuar con mi Marca": "Continua con il Mio Brand",
      "Continuar a mi Marca": "Continua al Mio Brand",
      "Hola, soy Aura.": "Ciao, sono Aura.",
      "Tu Mentora de Identidad": "La Tua Mentore d'Identità",
      "Iniciar Taller con Aura": "Inizia l'Atelier con Aura",
      "Web Comercial / Comprar": "Sito Commerciale / Acquista",
      "CÁPSULA DEL FUNDADOR · HEYGEN + GOOGLE FLOW": "CAPSULA DEL FONDATORE · HEYGEN + GOOGLE FLOW",
      "TU AVANCE SINCRONIZADO:": "I TUOI PROGRESSI SINCRONIZZATI:",
      "Continuar al Paso": "Continua al Passo",
      "Omitir video": "Salta video",
      "Paso 0 · Inicio": "Passo 0 · Inizio",
      "Paso 3 · Naming": "Passo 3 · Naming",
      "Paso 4 · Kansei": "Passo 4 · Kansei",
      "Paso 5 · Logotipo": "Passo 5 · Logo",
      "Paso 6 · Manual": "Passo 6 · Manuale"
    }
  };

  const PATTERN_REPLACEMENTS = {
    en: [
      [/SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "HYBRID TYPOGRAPHIC SYSTEM (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "EXECUTIVE DOWNLOAD & PRODUCTION VAULT V83.0"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del (?:Paso|Step) 1/g, "Welcome! Sector Summary + Step 1 Theory"],
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
      [/Borrar/g, "Remove"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "STEP $1 · PLATE $2 OF $3"],
      [/LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "PLATE $1 OF $2"],
      [/LAMINA\s+(\d+)\s*\/\s*(\d+)/g, "PLATE $1 / $2"],
      [/36\s+Láminas/g, "36 Plates"],
      [/36\s+láminas/g, "36 plates"],
      [/Solicitar Dictamen a\s+(.+)/g, "Request Advisory from $1"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*INICIO\s*·\s*REF:\s*(.+)/g, "AURA · STEP $1 · START · REF: $2"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*([A-ZÁÉÍÓÚÑ\s]+)\s*·\s*REF:\s*(.+)/g, "AURA · STEP $1 · $2 · REF: $3"],
      [/Según\s+([^,]+),\s*partir de\s+«([^»]+)»\s+nos da una síntesis visual clara y llena de significado\./g, "According to $1, starting from \"$2\" gives us a clear and meaningful visual synthesis."],
      [/Como enseña\s+([^,]+),\s*definir tu objetivo inicial da dirección estratégica inmediata a tu marca\./g, "As $1 teaches, defining your initial objective gives immediate strategic direction to your brand."],
      [/PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "STEP 4 · 4 OF 5 · HYBRID TYPOGRAPHIC SYSTEM (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/1\. Elige la familia de estilo \(o conecta Adobe Fonts\) y 2\. Toca la tríada para/g, "1. Choose the style family (or connect Adobe Fonts) & 2. Tap the triad for"],
      [/Ej\. xab1cde o URL https:\/\/use\.typekit\.net\/xab1cde\.css/g, "E.g. xab1cde or URL https://use.typekit.net/xab1cde.css"],
      [/✓ 100% Legal: Web\/Curvas\/PDF \+ \.TTF Libres en tu \.ZIP/g, "✓ 100% Legal: Web/Vectors/PDF + Free .TTF in your .ZIP"],
      [/Arquitectura, Obra Civil y Liderazgo Corporativo/g, "Architecture, Civil Engineering & Corporate Leadership"],
      [/Editorial Contemporánea y Alta Claridad/g, "Contemporary Editorial & High Clarity"],
      [/Minimalismo Geométrico y Cercanía/g, "Geometric Minimalism & Warmth"],
      [/Fuerza Estructural e Impacto Monolítico/g, "Structural Strength & Monolithic Impact"],
      [/Ingeniería de Precisión, SaaS e Innovación/g, "Precision Engineering, SaaS & Innovation"],
      [/Rigor Suizo y Sistemas Digitales/g, "Swiss Rigor & Digital Systems"],
      [/Fintech, Futuro y Claridad Algorítmica/g, "Fintech, Future & Algorithmic Clarity"],
      [/Consultoría Estratégica y Banca Moderna/g, "Strategic Consulting & Modern Banking"],
      [/Alta Costura, Inmobiliaria Premium y Autoridad/g, "Haute Couture, Luxury Real Estate & Authority"],
      [/Herencia Clásica, Joyería y Hospitalidad/g, "Classic Heritage, Jewelry & Hospitality"],
      [/Prestigio Institucional, Legal y Monumental/g, "Institutional, Legal & Monumental Prestige"],
      [/Gastronomía de Autor y Carácter Artesanal/g, "Signature Gastronomy & Artisanal Character"],
      [/Estudio Creativo, Diseño y Cultura Visual/g, "Creative Studio, Design & Visual Culture"],
      [/Industrial, Deporte e Infraestructura Pesada/g, "Industrial, Sports & Heavy Infrastructure"],
      [/Titulares de Alto Impacto y Gran Escala/g, "High-Impact & Large-Scale Headlines"],
      [/Movilidad, Urbanismo y Lifestyle/g, "Mobility, Urbanism & Lifestyle"],
      [/✓ Sistema Híbrido Activo:/g, "✓ Active Hybrid System:"],
      [/\(Logo\/Títulos\)/g, "(Logo/Headlines)"],
      [/\(Cuerpo\)/g, "(Body)"],
      [/\(Datos\)/g, "(Data)"],
      [/↓ Descargar Kit Híbrido \(\.ZIP: \.TTF \+ Typekit CSS\)/g, "↓ Download Hybrid Kit (.ZIP: .TTF + Typekit CSS)"],
      [/Iteración #(\d+)/g, "Iteration #$1"],
      [/Diseña el logotipo 3D de/g, "Design the 3D logo of"],
      [/integrando su símbolo y monograma en proporción 1:1 para app y versión horizontal con nombre y eslogan, sobre lienzo claro y oscuro con acabado de agencia mundial\./g, "integrating its symbol and monogram in 1:1 app ratio and horizontal lockup with name and slogan, on light and dark canvas with world-class agency finish."],
      [/Siguiente Lámina/g, "Next Plate"],
      [/Weiter Lámina/g, "Next Plate"],
      [/01\. Portada Oficial de Marca:/g, "01. Official Brand Cover:"],
      [/CONSEJO METODOLÓGICO · DICTAMEN METODOLÓGICO: APROBADO/g, "METHODOLOGICAL COUNCIL · VERDICT: APPROVED"],
      [/Consejo Metodológico · DICTAMEN METODOLÓGICO: APROBADO/g, "Methodological Council · VERDICT: APPROVED"],
      [/PORTADA MONUMENTAL/g, "MONUMENTAL COVER"],
      [/LIENZO CLARO C-00 CERTIFICADO/g, "CERTIFIED C-00 LIGHT CANVAS"],
      [/✓ Fotografía Editorial 4:3 Lista/g, "✓ 4:3 Editorial Photo Ready"],
      [/PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "STEP 6 · 2 OF 2 · EXECUTIVE DOWNLOAD & PRODUCTION VAULT V83.0"],
      [/Manual Oficial \((36\s+(?:Láminas|Plates))\), Vectores \(\.SVG \/ \.AI\), Kit Híbrido de Fuentes \(\.TTF \+ Typekit\) y Suite Editable de/g, "Official Brandbook ($1), Vectors (.SVG / .AI), Hybrid Font Kit (.TTF + Typekit) & Editable Suite of"],
      [/Todos tus activos listos para imprenta, Adobe Illustrator, Gmail\/Outlook, Word, PowerPoint y tu sistema tipográfico híbrido 100% libre de riesgos de copyright\./g, "All your assets ready for print, Adobe Illustrator, Gmail/Outlook, Word, PowerPoint, and your 100% copyright-safe hybrid font system."],
      [/1\. Descargar Manual Oficial Completo en PDF Directo \([^)]+\)/g, "1. Download Complete Official Brandbook in Direct PDF (36 Plates .PDF)"],
      [/2\. Logotipo Horizontal 100% en Curvas \(\.SVG Vectorizado\)/g, "2. 100% Vector Horizontal Logo (.SVG Curves)"],
      [/3\. Archivo Nativo Adobe Illustrator en Curvas \(\.AI\)/g, "3. Native Adobe Illustrator Vector File (.AI)"],
      [/4\. Firma Corporativa de Correo \(\.HTML Gmail \/ Outlook\)/g, "4. Corporate Email Signature (.HTML Gmail / Outlook)"],
      [/5\. Plantilla Editable Hoja Membretada \(\.DOCX Word \/ Docs\)/g, "5. Editable Letterhead Template (.DOCX Word / Docs)"],
      [/6\. Presentación Ejecutiva Editable 16:9 \(\.PPTX PowerPoint\)/g, "6. Editable 16:9 Executive Presentation (.PPTX PowerPoint)"],
      [/7\. Avatar 1:1 \+ Sello Circular en Curvas \(\.SVG\)/g, "7. 1:1 Avatar + Vector Circular Seal (.SVG)"],
      [/8\. Manual Web Interactivo Autónomo \(\.HTML [^)]+\)/g, "8. Standalone Interactive Web Brandbook (36-Plate .HTML)"],
      [/9\. Descargar Kit Híbrido de Fuentes \(\.ZIP:/g, "9. Download Hybrid Font Kit (.ZIP:"],
      [/← Volver al Visor Interactivo de las (?:36\s+(?:Láminas|Plates)) \(01 a 36\)/g, "← Return to the 36-Plate Interactive Viewer (01 to 36)"],
      [/PASO 0\s+PASO 1 · BIENVENIDA Y TEORÍA/g, "STEP 0 TO STEP 1 · WELCOME & THEORY"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del Paso 1/g, "Welcome! Sector Summary + Step 1 Theory"],
      [/Revisa la síntesis de tu proyecto y mira la cápsula teórica sobre el Círculo Dorado antes de responder la primera pregunta:/g, "Review your project synthesis and watch the Golden Circle theory capsule before answering the first question:"],
      [/El Círculo Dorado y tu Promesa en 3 Pasos/g, "The Golden Circle & Your 3-Step Promise"],
      [/La gente no compra lo que haces, sino el porqué lo haces \(Simon Sinek\)\. Aquí defines tu propósito nuclear, tu método claro en tres pasos \(Donald Miller\) y el arquetipo humano de tu marca\./g, "People don't buy what you do; they buy why you do it (Simon Sinek). Here you define your core purpose, your clear 3-step method (Donald Miller), and your brand's human archetype."],
      [/PARTE 1 · BIENVENIDA Y RESUMEN DE TU PUNTO DE PARTIDA \([^)]+\):/g, "PART 1 · WELCOME & STARTING POINT SUMMARY (STEP 0):"],
      [/Esencia del Giro Interpretada:/g, "Interpreted Sector Essence:"],
      [/Plataforma de alta dirección y diseño algorítmico que construye la identidad visual completa de tu empresa y su Manual Oficial de (?:30 Hojas|36 Plates|36 Láminas) en Curvas en minutos\./g, "Executive algorithmic design platform that builds your complete corporate visual identity and 36-Plate Vector Brandbook in minutes."],
      [/Continuar en (?:Paso|Step)\s+(\d+)/g, "Continue in Step $1"],
      [/WHY \(Propósito Nuclear\): Democratizar la excelencia del branding de lujo[\s\S]*$/g, "WHY (Core Purpose): Democratize luxury branding excellence, enabling founders and executives to build mathematically precise visual identities in minutes without agency delays. HOW: By converging generative AI, algorithmic Bézier geometry, Aura's neural voice mentorship, and the methodology of 15 legendary authors. WHAT: SaaS Atelier that designs your corporate identity, vector logo, and 36-Plate Brandbook ready for print and governance."],
      [/SaaS y Atelier de Identidad Visual Algorítmica[\s\S]*$/g, "Algorithmic Visual Identity SaaS & Atelier with AI, Bézier vector curves, and Aura neural voice mentorship"],
      [/Redes Sociales Oficiales \(LinkedIn \/ X \/ Instagram\)/g, "Official Social Media (LinkedIn / X / Instagram)"],
      [/Web Comercial \(thebestbrand-studio\.web\.app\)/g, "Commercial Website (thebestbrand.app)"],
      [/Aura Agente de Voz 24\/7/g, "Aura 24/7 Neural Voice Mentor"],
      [/Cuestionario Interactivo de 7 Pasos/g, "7-Step Interactive Brand Diagnostic"],
      [/Diagnóstico Gratuito de Marca en Minutos/g, "Free Brand Assessment in Minutes"],
      [/Pasarela de Pago Rápida \(Apple Pay \/ Tarjeta \/ PayPal\)/g, "Fast Checkout (Apple Pay / Card / PayPal)"],
      [/Generación en Tiempo Real de Logotipos en Canvas y SVG/g, "Real-Time Canvas & SVG Vector Logo Generation"],
      [/Asesoría en Vivo de los 15 Autores Consejeros/g, "Live Advisory from the 15 Master Authors"],
      [/Renderizado Instantáneo del Brandbook de 30 Hojas/g, "Instant 36-Plate Vector Brandbook Rendering"],
      [/Ajustes Interactivos de Color, Trazos y Tipografía/g, "Interactive Color, Stroke & Typography Controls"],
      [/SaaS\s*·\s*Atelier\s*·\s*Identidad\s*·\s*Visual\s*·\s*Algorítmica/g, "SaaS · Atelier · Identity · Visual · Algorithmic"],
      [/Raíces extraídas de tu estrategia:/g, "Roots extracted from your strategy:"]
    ],
    pt: [
      [/SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "CENTRAL DE DOWNLOADS E PRODUÇÃO EXECUTIVA V83.0"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del (?:Paso|Passo) 1/g, "Bem-vindo! Resumo do seu Setor + Teoria do Passo 1"],
      [/PASO\s+(\d+)\s*·\s*(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · $2 DE $3"],
      [/PASO\s+(\d+)\s*·\s*PREGUNTA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · PERGUNTA $2 DE $3"],
      [/PASO\s+(\d+)\s*·\s*ETAPA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · ETAPA $2 DE $3"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+30/g, "PASSO $1 · LÂMINA $2 DE 30"],
      [/Paso\s+(\d+)\s*·\s*Sub-paso\s+(\d+)/g, "Passo $1 · Sub-passo $2"],
      [/Video\s+Paso\s+(\d+)/g, "Vídeo Passo $1"],
      [/Paso\s+(\d+)/g, "Passo $1"],
      [/Siguiente\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Próxima Lâmina ($1/$2)"],
      [/Seguinte\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Próxima Lâmina ($1/$2)"],
      [/Lámina\s+(\d+):/g, "Lâmina $1:"],
      [/LÁMINA\s+(\d+)\s+DE\s+30/g, "LÂMINA $1 DE 30"],
      [/30\s+Láminas/g, "36 Lâminas"],
      [/30\s+láminas/g, "36 lâminas"],
      [/1\.\s*PROPÓSITO NUCLEAR/g, "1. PROPÓSITO CENTRAL (CÍRCULO DOURADO)"],
      [/2\.\s*OFERTA DE VALOR DIFERENCIADA/g, "2. PROPOSTA DE VALOR DIFERENCIADA"],
      [/3\.\s*IMPACTO EN EL CLIENTE/g, "3. IMPACTO NO CLIENTE"],
      [/4\.\s*MÉTODO Y PROCESO/g, "4. MÉTODO E PROCESSO"],
      [/5\.\s*MENSAJE CENTRAL/g, "5. MENSAGEM CENTRAL"],
      [/6\.\s*CARÁCTER Y PERSONALIDAD/g, "6. CARÁTER E PERSONALIDADE"],
      [/7\.\s*CLIENTE IDEAL/g, "7. CLIENTE IDEAL"],
      [/CALIBRACIÓN VISUAL CON REFERENCIAS/g, "CALIBRAÇÃO VISUAL COM REFERÊNCIAS"],
      [/Desliza o toca las referencias visuales en los extremos para/g, "Deslize ou toque nas referências visuais nos extremos para"],
      [/Elige la tipografía oficial para el logotipo y manual de/g, "Escolha a tipografia oficial para o logotipo e manual de"],
      [/Selecciona el Acabado, Paleta o tu Logotipo Base para/g, "Selecione o Acabamento, Paleta ou Logotipo Base para"],
      [/Nombre Oficial Seleccionado:/g, "Nome Oficial Selecionado:"],
      [/Prompt del Sistema/g, "Prompt do Sistema"],
      [/palabras/g, "palavras"],
      [/App en proporción 1:1/g, "Ícone App 1:1"],
      [/MANUAL DE IDENTIDAD CORPORATIVA/g, "MANUAL DE IDENTIDADE CORPORATIVA"],
      [/PORTADA MAESTRA/g, "CAPA MESTRA"],
      [/Portada Maestra en Curvas:/g, "Capa Mestra em Curvas:"],
      [/Índice Metodológico TheBestBrand \(Pasos 0 al 6 · 30 Láminas\)/g, "Índice Metodológico TheBestBrand (Passos 0 a 6 · 36 Lâminas)"],
      [/Manifiesto Fundacional: Del Caos al Sistema y Buyer Persona/g, "Manifesto Fundacional: Do Caos ao Sistema e Buyer Persona"],
      [/MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V5\.1/g, "MANUAL DE IDENTIDADE E ARQUITETURA DE MARCA V5.1"],
      [/ESTRATEGIA/g, "ESTRATÉGIA"],
      [/SISTEMAS/g, "SISTEMAS"],
      [/CLARIDAD/g, "CLAREZA"],
      [/RESULTADOS/g, "RESULTADOS"],
      [/Versión Positiva Principal sobre Lienzo Claro/g, "Versão Positiva Principal em Fundo Claro"],
      [/LAMINA\s+(\d+)\s*\/\s*30/g, "LÂMINA $1 / 30"],
      [/Imprimir \/ Guardar como PDF \(30 Láminas\)/g, "Imprimir / Salvar como PDF (36 Lâminas)"],
      [/En línea en tiempo real/g, "Online em tempo real"],
      [/Este dispositivo/g, "Este dispositivo"],
      [/ACTIVO/g, "ATIVO"],
      [/RECIENTE/g, "RECENTE"],
      [/Borrar/g, "Remover"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · LÂMINA $2 DE $3"],
      [/LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "LÂMINA $1 DE $2"],
      [/LAMINA\s+(\d+)\s*\/\s*(\d+)/g, "LÂMINA $1 / $2"],
      [/36\s+Láminas/g, "36 Lâminas"],
      [/36\s+láminas/g, "36 lâminas"],
      [/Solicitar Dictamen a\s+(.+)/g, "Solicitar Parecer a $1"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*INICIO\s*·\s*REF:\s*(.+)/g, "AURA · PASSO $1 · INÍCIO · REF: $2"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*([A-ZÁÉÍÓÚÑ\s]+)\s*·\s*REF:\s*(.+)/g, "AURA · PASSO $1 · $2 · REF: $3"],
      [/Según\s+([^,]+),\s*partir de\s+«([^»]+)»\s+nos da una síntesis visual clara y llena de significado\./g, "Segundo $1, partir de «$2» nos dá uma síntese visual clara e cheia de significado."],
      [/Como enseña\s+([^,]+),\s*definir tu objetivo inicial da dirección estratégica inmediata a tu marca\./g, "Como ensina $1, definir seu objetivo inicial dá direção estratégica imediata à sua marca."],
      [/PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "PASSO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/1\. Elige la familia de estilo \(o conecta Adobe Fonts\) y 2\. Toca la tríada para/g, "1. Escolha a família de estilo (ou conecte Adobe Fonts) e 2. Toque na tríade para"],
      [/Modo Híbrido \(Opcional · Web Project ID\):/g, "Modo Híbrido (Opcional · Web Project ID):"],
      [/Ej\. xab1cde o URL https:\/\/use\.typekit\.net\/xab1cde\.css/g, "Ex. xab1cde ou URL https://use.typekit.net/xab1cde.css"],
      [/✓ 100% Legal: Web\/Curvas\/PDF \+ \.TTF Libres en tu \.ZIP/g, "✓ 100% Legal: Web/Curvas/PDF + .TTF Livres no seu .ZIP"],
      [/3 \.TTF LIBRES/g, "3 .TTF LIVRES"],
      [/Arquitectura, Obra Civil y Liderazgo Corporativo/g, "Arquitetura, Engenharia Civil e Liderança Corporativa"],
      [/Editorial Contemporánea y Alta Claridad/g, "Editorial Contemporânea e Alta Clareza"],
      [/Minimalismo Geométrico y Cercanía/g, "Minimalismo Geométrico e Proximidade"],
      [/Fuerza Estructural e Impacto Monolítico/g, "Força Estrutural e Impacto Monolítico"],
      [/Ingeniería de Precisión, SaaS e Innovación/g, "Engenharia de Precisão, SaaS e Inovação"],
      [/Rigor Suizo y Sistemas Digitales/g, "Rigor Suíço e Sistemas Digitais"],
      [/Fintech, Futuro y Claridad Algorítmica/g, "Fintech, Futuro e Clareza Algorítmica"],
      [/Consultoría Estratégica y Banca Moderna/g, "Consultoria Estratégica e Finanças Modernas"],
      [/✓ Sistema Híbrido Activo:/g, "✓ Sistema Híbrido Ativo:"],
      [/\(Logo\/Títulos\)/g, "(Logo/Títulos)"],
      [/\(Cuerpo\)/g, "(Corpo)"],
      [/\(Datos\)/g, "(Dados)"],
      [/↓ Descargar Kit Híbrido \(\.ZIP: \.TTF \+ Typekit CSS\)/g, "↓ Baixar Kit Híbrido (.ZIP: .TTF + Typekit CSS)"],
      [/Iteración #(\d+)/g, "Iteração #$1"],
      [/Diseña el logotipo 3D de/g, "Projete o logotipo 3D de"],
      [/integrando su símbolo y monograma en proporción 1:1 para app y versión horizontal con nombre y eslogan, sobre lienzo claro y oscuro con acabado de agencia mundial\./g, "integrando seu símbolo e monograma na proporção 1:1 para app e versão horizontal com nome e slogan, em fundo claro e escuro com padrão de agência global."],
      [/01\. Portada Oficial de Marca:/g, "01. Capa Oficial da Marca:"],
      [/CONSEJO METODOLÓGICO · DICTAMEN METODOLÓGICO: APROBADO/g, "CONSELHO METODOLÓGICO · PARECER: APROVADO"],
      [/Consejo Metodológico · DICTAMEN METODOLÓGICO: APROBADO/g, "Conselho Metodológico · PARECER: APROVADO"],
      [/PORTADA MONUMENTAL/g, "CAPA MONUMENTAL"],
      [/LIENZO CLARO C-00 CERTIFICADO/g, "FUNDO CLARO C-00 CERTIFICADO"],
      [/✓ Fotografía Editorial 4:3 Lista/g, "✓ Fotografia Editorial 4:3 Pronta"],
      [/PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "PASSO 6 · 2 DE 2 · CENTRAL DE DOWNLOADS E PRODUÇÃO EXECUTIVA V83.0"],
      [/Manual Oficial \([^)]+\), Vectores \(\.SVG \/ \.AI\), Kit Híbrido de Fuentes \(\.TTF \+ Typekit\) y Suite Editable de/g, "Manual Oficial (36 Lâminas), Vetores (.SVG / .AI), Kit Híbrido de Fontes (.TTF + Typekit) e Suite Editável de"],
      [/Todos tus activos listos para imprenta, Adobe Illustrator, Gmail\/Outlook, Word, PowerPoint y tu sistema tipográfico híbrido 100% libre de riesgos de copyright\./g, "Todos os seus ativos prontos para gráfica, Adobe Illustrator, Gmail/Outlook, Word, PowerPoint e seu sistema tipográfico híbrido 100% livre de riscos de direitos autorais."],
      [/1\. Descargar Manual Oficial Completo en PDF Directo \([^)]+\)/g, "1. Baixar Manual Oficial Completo em PDF Direto (36 Lâminas .PDF)"],
      [/2\. Logotipo Horizontal 100% en Curvas \(\.SVG Vectorizado\)/g, "2. Logotipo Horizontal 100% em Curvas (.SVG Vetorizado)"],
      [/3\. Archivo Nativo Adobe Illustrator en Curvas \(\.AI\)/g, "3. Arquivo Nativo Adobe Illustrator em Curvas (.AI)"],
      [/4\. Firma Corporativa de Correo \(\.HTML Gmail \/ Outlook\)/g, "4. Assinatura Corporativa de E-mail (.HTML Gmail / Outlook)"],
      [/5\. Plantilla Editable Hoja Membretada \(\.DOCX Word \/ Docs\)/g, "5. Modelo Editável de Papel Timbrado (.DOCX Word / Docs)"],
      [/6\. Presentación Ejecutiva Editable 16:9 \(\.PPTX PowerPoint\)/g, "6. Apresentação Executiva Editável 16:9 (.PPTX PowerPoint)"],
      [/7\. Avatar 1:1 \+ Sello Circular en Curvas \(\.SVG\)/g, "7. Avatar 1:1 + Selo Circular em Curvas (.SVG)"],
      [/8\. Manual Web Interactivo Autónomo \(\.HTML [^)]+\)/g, "8. Manual Web Interativo Autônomo (.HTML 36 Lâminas)"],
      [/9\. Descargar Kit Híbrido de Fuentes \(\.ZIP:/g, "9. Baixar Kit Híbrido de Fontes (.ZIP:"],
      [/← Volver al Visor Interactivo de las [^)]+\(01 a 36\)/g, "← Voltar ao Visualizador Interativo das 36 Lâminas (01 a 36)"],
      [/PASO 0\s+PASO 1 · BIENVENIDA Y TEORÍA/g, "PASSO 0 AO PASSO 1 · BOAS-VINDAS E TEORIA"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del Paso 1/g, "Bem-vindo! Resumo do seu Setor + Teoria do Passo 1"],
      [/Revisa la síntesis de tu proyecto y mira la cápsula teórica sobre el Círculo Dorado antes de responder la primera pregunta:/g, "Revise a síntese do seu projeto e assista à cápsula teórica sobre o Círculo Dourado antes de responder à primeira pergunta:"],
      [/El Círculo Dorado y tu Promesa en 3 Pasos/g, "O Círculo Dourado e sua Promessa em 3 Passos"],
      [/La gente no compra lo que haces, sino el porqué lo haces \(Simon Sinek\)\. Aquí defines tu propósito nuclear, tu método claro en tres pasos \(Donald Miller\) y el arquetipo humano de tu marca\./g, "As pessoas não compram o que você faz, mas o porquê você faz (Simon Sinek). Aqui você define seu propósito central, seu método claro em 3 passos (Donald Miller) e o arquétipo da sua marca."],
      [/PARTE 1 · BIENVENIDA Y RESUMEN DE TU PUNTO DE PARTIDA \([^)]+\):/g, "PARTE 1 · BOAS-VINDAS E RESUMO DO SEU PONTO DE PARTIDA (PASSO 0):"],
      [/Esencia del Giro Interpretada:/g, "Essência do Setor Interpretada:"],
      [/Plataforma de alta dirección y diseño algorítmico que construye la identidad visual completa de tu empresa y su Manual Oficial de [^)]+ en minutos\./g, "Plataforma executiva de design algorítmico que constrói a identidade visual completa da sua empresa e seu Manual Oficial de 36 Lâminas em Curvas em minutos."],
      [/Continuar en (?:Paso|Passo)\s+(\d+)/g, "Continuar no Passo $1"],
      [/WHY \(Propósito Nuclear\): Democratizar la excelencia del branding de lujo[\s\S]*$/g, "WHY (Propósito Central): Democratizar a excelência do branding de luxo, permitindo que fundadores e diretores criem identidades visuais matematicamente precisas em minutos. HOW (Como): Unindo IA generativa, geometria algorítmica em curvas Bézier, mentoria de voz neural da Aura e a metodologia de 15 autores lendários. WHAT (O quê): Atelier SaaS que projeta sua identidade corporativa, logotipo vetorial e Manual Oficial de 36 Lâminas."],
      [/SaaS y Atelier de Identidad Visual Algorítmica[\s\S]*$/g, "SaaS e Atelier de Identidade Visual Algorítmica com IA, curvas Bézier e mentoria de voz neural da Aura"],
      [/Redes Sociales Oficiales \(LinkedIn \/ X \/ Instagram\)/g, "Redes Sociais Oficiais (LinkedIn / X / Instagram)"],
      [/Web Comercial \(thebestbrand-studio\.web\.app\)/g, "Site Comercial (thebestbrand.app)"],
      [/Aura Agente de Voz 24\/7/g, "Aura Mentora de Voz 24/7"],
      [/Cuestionario Interactivo de 7 Pasos/g, "Diagnóstico Interativo de 7 Passos"],
      [/Diagnóstico Gratuito de Marca en Minutos/g, "Diagnóstico Gratuito de Marca em Minutos"],
      [/Pasarela de Pago Rápida \(Apple Pay \/ Tarjeta \/ PayPal\)/g, "Checkout Rápido (Apple Pay / Cartão / PayPal)"],
      [/Generación en Tiempo Real de Logotipos en Canvas y SVG/g, "Geração em Tempo Real de Logotipos em Canvas e SVG"],
      [/Asesoría en Vivo de los 15 Autores Consejeros/g, "Consultoria ao Vivo dos 15 Autores Conselheiros"],
      [/Renderizado Instantáneo del Brandbook de 30 Hojas/g, "Renderização Instantânea do Brandbook de 36 Lâminas"],
      [/Ajustes Interactivos de Color, Trazos y Tipografía/g, "Ajustes Interativos de Cor, Traços e Tipografia"],
      [/SaaS\s*·\s*Atelier\s*·\s*Identidad\s*·\s*Visual\s*·\s*Algorítmica/g, "SaaS · Atelier · Identidade · Visual · Algorítmica"],
      [/Raíces extraídas de tu estrategia:/g, "Raízes extraídas da sua estratégia:"]
    ],
    fr: [
      [/SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "SYSTÈME TYPOGRAPHIQUE HYBRIDE (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "COFFRE DE TÉLÉCHARGEMENTS ET PRODUCTION EXÉCUTIVE V83.0"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del (?:Paso|Étape) 1/g, "Bienvenue ! Résumé de votre Secteur + Théorie de l'Étape 1"],
      [/PASO\s+(\d+)\s*·\s*(\d+)\s+DE\s+(\d+)/g, "ÉTAPE $1 · $2 SUR $3"],
      [/PASO\s+(\d+)\s*·\s*PREGUNTA\s+(\d+)\s+DE\s+(\d+)/g, "ÉTAPE $1 · QUESTION $2 SUR $3"],
      [/PASO\s+(\d+)\s*·\s*ETAPA\s+(\d+)\s+DE\s+(\d+)/g, "ÉTAPE $1 · PHASE $2 SUR $3"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+30/g, "ÉTAPE $1 · PLANCHE $2 SUR 30"],
      [/Paso\s+(\d+)\s*·\s*Sub-paso\s+(\d+)/g, "Étape $1 · Sous-étape $2"],
      [/Video\s+Paso\s+(\d+)/g, "Vidéo Étape $1"],
      [/Paso\s+(\d+)/g, "Étape $1"],
      [/Siguiente\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Planche Suivante ($1/$2)"],
      [/Suivant\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Planche Suivante ($1/$2)"],
      [/Lámina\s+(\d+):/g, "Planche $1 :"],
      [/LÁMINA\s+(\d+)\s+DE\s+30/g, "PLANCHE $1 SUR 30"],
      [/30\s+Láminas/g, "36 Planches"],
      [/30\s+láminas/g, "36 planches"],
      [/1\.\s*PROPÓSITO NUCLEAR/g, "1. RAISON D'ÊTRE (CERCLE D'OR)"],
      [/2\.\s*OFERTA DE VALOR DIFERENCIADA/g, "2. PROPOSITION DE VALEUR DIFFÉRENCIÉE"],
      [/3\.\s*IMPACTO EN EL CLIENTE/g, "3. IMPACT CLIENT"],
      [/4\.\s*MÉTODO Y PROCESO/g, "4. MÉTHODE ET PROCESSUS"],
      [/5\.\s*MENSAJE CENTRAL/g, "5. MESSAGE CENTRAL"],
      [/6\.\s*CARÁCTER Y PERSONALIDAD/g, "6. CARACTÈRE ET PERSONNALITÉ"],
      [/7\.\s*CLIENTE IDEAL/g, "7. CLIENT IDÉAL"],
      [/CALIBRACIÓN VISUAL CON REFERENCIAS/g, "CALIBRAGE VISUEL AVEC RÉFÉRENCES"],
      [/Desliza o toca las referencias visuales en los extremos para/g, "Faites glisser ou touchez les références visuelles aux extrémités pour"],
      [/Elige la tipografía oficial para el logotipo y manual de/g, "Choisissez la typographie officielle pour le logo et le manuel de"],
      [/Selecciona el Acabado, Paleta o tu Logotipo Base para/g, "Sélectionnez la Finition, la Palette ou le Logo de Base pour"],
      [/Nombre Oficial Seleccionado:/g, "Nom Officiel Sélectionné :"],
      [/Prompt del Sistema/g, "Prompt du Système"],
      [/palabras/g, "mots"],
      [/App en proporción 1:1/g, "Icône App 1:1"],
      [/MANUAL DE IDENTIDAD CORPORATIVA/g, "MANUEL D'IDENTITÉ CORPORATIVE"],
      [/PORTADA MAESTRA/g, "COUVERTURE MAÎTRE"],
      [/Portada Maestra en Curvas:/g, "Couverture Maître Vectorielle :"],
      [/Índice Metodológico TheBestBrand \(Pasos 0 al 6 · 30 Láminas\)/g, "Index Méthodologique TheBestBrand (Étapes 0 à 6 · 36 Planches)"],
      [/Manifiesto Fundacional: Del Caos al Sistema y Buyer Persona/g, "Manifeste Fondateur : Du Chaos au Système et Buyer Persona"],
      [/MANUAL DE IDENTIDAD Y ARQUITECTURA DE MARCA V5\.1/g, "MANUEL D'IDENTITÉ ET D'ARCHITECTURE DE MARQUE V5.1"],
      [/ESTRATEGIA/g, "STRATÉGIE"],
      [/SISTEMAS/g, "SYSTÈMES"],
      [/CLARIDAD/g, "CLARTÉ"],
      [/RESULTADOS/g, "RÉSULTATS"],
      [/Versión Positiva Principal sobre Lienzo Claro/g, "Version Positive Principale sur Fond Clair"],
      [/LAMINA\s+(\d+)\s*\/\s*30/g, "PLANCHE $1 / 30"],
      [/Imprimir \/ Guardar como PDF \(30 Láminas\)/g, "Imprimer / Enregistrer en PDF (36 Planches)"],
      [/En línea en tiempo real/g, "En ligne en temps réel"],
      [/Este dispositivo/g, "Cet appareil"],
      [/ACTIVO/g, "ACTIF"],
      [/RECIENTE/g, "RÉCENT"],
      [/Borrar/g, "Supprimer"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "ÉTAPE $1 · PLANCHE $2 SUR $3"],
      [/LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "PLANCHE $1 SUR $2"],
      [/LAMINA\s+(\d+)\s*\/\s*(\d+)/g, "PLANCHE $1 / $2"],
      [/36\s+Láminas/g, "36 Planches"],
      [/36\s+láminas/g, "36 planches"],
      [/Solicitar Dictamen a\s+(.+)/g, "Demander l'Avis de $1"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*([A-ZÁÉÍÓÚÑ\s]+)\s*·\s*REF:\s*(.+)/g, "AURA · ÉTAPE $1 · $2 · RÉF : $3"],
      [/Según\s+([^,]+),\s*partir de\s+«([^»]+)»\s+nos da una síntesis visual clara y llena de significado\./g, "Selon $1, partir de « $2 » nous offre une synthèse visuelle claire et pleine de sens."],
      [/Como enseña\s+([^,]+),\s*definir tu objetivo inicial da dirección estratégica inmediata a tu marca\./g, "Comme l'enseigne $1, définir votre objectif initial donne une direction stratégique immédiate à votre marque."],
      [/PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "ÉTAPE 4 · 4 SUR 5 · SYSTÈME TYPOGRAPHIQUE HYBRIDE (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/1\. Elige la familia de estilo \(o conecta Adobe Fonts\) y 2\. Toca la tríada para/g, "1. Choisissez la famille de style (ou connectez Adobe Fonts) et 2. Touchez la triade pour"],
      [/Modo Híbrido \(Opcional · Web Project ID\):/g, "Mode Hybride (Optionnel · Web Project ID) :"],
      [/Ej\. xab1cde o URL https:\/\/use\.typekit\.net\/xab1cde\.css/g, "Ex. xab1cde ou URL https://use.typekit.net/xab1cde.css"],
      [/✓ 100% Legal: Web\/Curvas\/PDF \+ \.TTF Libres en tu \.ZIP/g, "✓ 100% Légal : Web/Vecteurs/PDF + .TTF Libres dans votre .ZIP"],
      [/3 \.TTF LIBRES/g, "3 .TTF LIBRES"],
      [/Arquitectura, Obra Civil y Liderazgo Corporativo/g, "Architecture, Génie Civil et Leadership Corporatif"],
      [/Editorial Contemporánea y Alta Claridad/g, "Éditorial Contemporain et Haute Clarté"],
      [/Minimalismo Geométrico y Cercanía/g, "Minimalisme Géométrique et Proximité"],
      [/Fuerza Estructural e Impacto Monolítico/g, "Force Structurelle et Impact Monolithique"],
      [/Ingeniería de Precisión, SaaS e Innovación/g, "Ingénierie de Précision, SaaS et Innovation"],
      [/Rigor Suizo y Sistemas Digitales/g, "Rigueur Suisse et Systèmes Numériques"],
      [/Fintech, Futuro y Claridad Algorítmica/g, "Fintech, Futur et Clarté Algorithmique"],
      [/Consultoría Estratégica y Banca Moderna/g, "Conseil Stratégique et Banque Moderne"],
      [/✓ Sistema Híbrido Activo:/g, "✓ Système Hybride Actif :"],
      [/\(Logo\/Títulos\)/g, "(Logo/Titres)"],
      [/\(Cuerpo\)/g, "(Corps)"],
      [/\(Datos\)/g, "(Données)"],
      [/↓ Descargar Kit Híbrido \(\.ZIP: \.TTF \+ Typekit CSS\)/g, "↓ Télécharger le Kit Hybride (.ZIP : .TTF + Typekit CSS)"],
      [/Iteración #(\d+)/g, "Itération #$1"],
      [/Diseña el logotipo 3D de/g, "Concevez le logo 3D de"],
      [/integrando su símbolo y monograma en proporción 1:1 para app y versión horizontal con nombre y eslogan, sobre lienzo claro y oscuro con acabado de agencia mundial\./g, "intégrant son symbole et monogramme en ratio 1:1 pour app et version horizontale avec nom et slogan, sur fond clair et sombre avec finition d'agence mondiale."],
      [/01\. Portada Oficial de Marca:/g, "01. Couverture Officielle de Marque :"],
      [/CONSEJO METODOLÓGICO · DICTAMEN METODOLÓGICO: APROBADO/g, "CONSEIL MÉTHODOLOGIQUE · AVIS : APPROUVÉ"],
      [/Consejo Metodológico · DICTAMEN METODOLÓGICO: APROBADO/g, "Conseil Méthodologique · AVIS : APPROUVÉ"],
      [/PORTADA MONUMENTAL/g, "COUVERTURE MONUMENTALE"],
      [/LIENZO CLARO C-00 CERTIFICADO/g, "FOND CLAIR C-00 CERTIFIÉ"],
      [/✓ Fotografía Editorial 4:3 Lista/g, "✓ Photographie Éditoriale 4:3 Prête"],
      [/PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "ÉTAPE 6 · 2 SUR 2 · COFFRE DE TÉLÉCHARGEMENTS ET PRODUCTION EXÉCUTIVE V83.0"],
      [/Manual Oficial \([^)]+\), Vectores \(\.SVG \/ \.AI\), Kit Híbrido de Fuentes \(\.TTF \+ Typekit\) y Suite Editable de/g, "Manuel Officiel (36 Planches), Vecteurs (.SVG / .AI), Kit Hybride de Polices (.TTF + Typekit) et Suite Éditable de"],
      [/Todos tus activos listos para imprenta, Adobe Illustrator, Gmail\/Outlook, Word, PowerPoint y tu sistema tipográfico híbrido 100% libre de riesgos de copyright\./g, "Tous vos actifs prêts pour l'impression, Adobe Illustrator, Gmail/Outlook, Word, PowerPoint et votre système typographique hybride 100% libre de droits."],
      [/1\. Descargar Manual Oficial Completo en PDF Directo \([^)]+\)/g, "1. Télécharger le Manuel Officiel Complet en PDF Direct (36 Planches .PDF)"],
      [/2\. Logotipo Horizontal 100% en Curvas \(\.SVG Vectorizado\)/g, "2. Logo Horizontal 100% Vectoriel (.SVG en Courbes)"],
      [/3\. Archivo Nativo Adobe Illustrator en Curvas \(\.AI\)/g, "3. Fichier Natif Adobe Illustrator en Courbes (.AI)"],
      [/4\. Firma Corporativa de Correo \(\.HTML Gmail \/ Outlook\)/g, "4. Signature E-mail Corporative (.HTML Gmail / Outlook)"],
      [/5\. Plantilla Editable Hoja Membretada \(\.DOCX Word \/ Docs\)/g, "5. Modèle Éditable de Papier à En-tête (.DOCX Word / Docs)"],
      [/6\. Presentación Ejecutiva Editable 16:9 \(\.PPTX PowerPoint\)/g, "6. Présentation Exécutive Éditable 16:9 (.PPTX PowerPoint)"],
      [/7\. Avatar 1:1 \+ Sello Circular en Curvas \(\.SVG\)/g, "7. Avatar 1:1 + Sceau Circulaire Vectoriel (.SVG)"],
      [/8\. Manual Web Interactivo Autónomo \(\.HTML [^)]+\)/g, "8. Manuel Web Interactif Autonome (.HTML 36 Planches)"],
      [/9\. Descargar Kit Híbrido de Fuentes \(\.ZIP:/g, "9. Télécharger le Kit Hybride de Polices (.ZIP :"],
      [/← Volver al Visor Interactivo de las [^)]+\(01 a 36\)/g, "← Retour à la Visionneuse Interactive des 36 Planches (01 à 36)"],
      [/PASO 0\s+PASO 1 · BIENVENIDA Y TEORÍA/g, "ÉTAPE 0 À ÉTAPE 1 · BIENVENUE ET THÉORIE"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del Paso 1/g, "Bienvenue ! Résumé de votre Secteur + Théorie de l'Étape 1"],
      [/Revisa la síntesis de tu proyecto y mira la cápsula teórica sobre el Círculo Dorado antes de responder la primera pregunta:/g, "Consultez la synthèse de votre projet et regardez la capsule théorique sur le Cercle d'Or avant de répondre à la première question :"],
      [/El Círculo Dorado y tu Promesa en 3 Pasos/g, "Le Cercle d'Or et votre Promesse en 3 Étapes"],
      [/La gente no compra lo que haces, sino el porqué lo haces \(Simon Sinek\)\. Aquí defines tu propósito nuclear, tu método claro en tres pasos \(Donald Miller\) y el arquetipo humano de tu marca\./g, "Les gens n'achètent pas ce que vous faites, mais pourquoi vous le faites (Simon Sinek). Ici vous définissez votre raison d'être, votre méthode en 3 étapes (Donald Miller) et l'archétype de votre marque."],
      [/PARTE 1 · BIENVENIDA Y RESUMEN DE TU PUNTO DE PARTIDA \([^)]+\):/g, "PARTIE 1 · BIENVENUE ET RÉSUMÉ DE VOTRE POINT DE DÉPART (ÉTAPE 0) :"],
      [/Esencia del Giro Interpretada:/g, "Essence du Secteur Interprétée :"],
      [/Plataforma de alta dirección y diseño algorítmico que construye la identidad visual completa de tu empresa y su Manual Oficial de [^)]+ en minutos\./g, "Plateforme exécutive de design algorithmique qui construit l'identité visuelle complète de votre entreprise et son Manuel Officiel de 36 Planches en quelques minutes."],
      [/Continuar en (?:Paso|Étape)\s+(\d+)/g, "Continuer à l'Étape $1"],
      [/WHY \(Propósito Nuclear\): Democratizar la excelencia del branding de lujo[\s\S]*$/g, "WHY (Raison d'Être) : Démocratiser l'excellence du branding de luxe, permettant aux dirigeants de créer des identités visuelles mathématiquement parfaites en quelques minutes. HOW (Comment) : En unissant l'IA générative, la géométrie algorithmique de Bézier, le mentorat vocal d'Aura et la méthodologie de 15 auteurs légendaires. WHAT (Quoi) : Atelier SaaS qui conçoit votre identité, votre logo vectoriel et votre Manuel Officiel de 36 Planches."],
      [/SaaS y Atelier de Identidad Visual Algorítmica[\s\S]*$/g, "SaaS et Atelier d'Identité Visuelle Algorithmique avec IA, courbes de Bézier et mentorat vocal d'Aura"],
      [/Redes Sociales Oficiales \(LinkedIn \/ X \/ Instagram\)/g, "Réseaux Sociaux Officiels (LinkedIn / X / Instagram)"],
      [/Web Comercial \(thebestbrand-studio\.web\.app\)/g, "Site Commercial (thebestbrand.app)"],
      [/Aura Agente de Voz 24\/7/g, "Aura Mentore Vocale 24/7"],
      [/Cuestionario Interactivo de 7 Pasos/g, "Diagnostic Interactif en 7 Étapes"],
      [/Diagnóstico Gratuito de Marca en Minutos/g, "Diagnostic Gratuit de Marque en Minutes"],
      [/Pasarela de Pago Rápida \(Apple Pay \/ Tarjeta \/ PayPal\)/g, "Paiement Rapide (Apple Pay / Carte / PayPal)"],
      [/Generación en Tiempo Real de Logotipos en Canvas y SVG/g, "Génération en Temps Réel de Logos sur Canevas et SVG"],
      [/Asesoría en Vivo de los 15 Autores Consejeros/g, "Conseil en Direct des 15 Auteurs Maîtres"],
      [/Renderizado Instantáneo del Brandbook de 30 Hojas/g, "Rendu Instantané du Brandbook de 36 Planches"],
      [/Ajustes Interactivos de Color, Trazos y Tipografía/g, "Ajustements Interactifs de Couleur, Traits et Typographie"],
      [/SaaS\s*·\s*Atelier\s*·\s*Identidad\s*·\s*Visual\s*·\s*Algorítmica/g, "SaaS · Atelier · Identité · Visuelle · Algorithmique"],
      [/Raíces extraídas de tu estrategia:/g, "Racines extraites de votre stratégie :"]
    ],
    de: [
      [/SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "HYBRIDES TYPOGRAFIESYSTEM (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "EXEKUTIVER DOWNLOAD- & PRODUKTIONSTRESOR V83.0"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del (?:Paso|Schritt) 1/g, "Willkommen! Branchen-Zusammenfassung + Theorie zu Schritt 1"],
      [/PASO\s+(\d+)\s*·\s*(\d+)\s+DE\s+(\d+)/g, "SCHRITT $1 · $2 VON $3"],
      [/PASO\s+(\d+)\s*·\s*PREGUNTA\s+(\d+)\s+DE\s+(\d+)/g, "SCHRITT $1 · FRAGE $2 VON $3"],
      [/PASO\s+(\d+)\s*·\s*ETAPA\s+(\d+)\s+DE\s+(\d+)/g, "SCHRITT $1 · PHASE $2 VON $3"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "SCHRITT $1 · SEITE $2 VON $3"],
      [/Paso\s+(\d+)\s*·\s*Sub-paso\s+(\d+)/g, "Schritt $1 · Teilschritt $2"],
      [/Video\s+Paso\s+(\d+)/g, "Video Schritt $1"],
      [/Paso\s+(\d+)/g, "Schritt $1"],
      [/Siguiente\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Nächste Seite ($1/$2)"],
      [/Weiter\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Nächste Seite ($1/$2)"],
      [/Lámina\s+(\d+):/g, "Seite $1:"],
      [/LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "SEITE $1 VON $2"],
      [/LAMINA\s+(\d+)\s*\/\s*(\d+)/g, "SEITE $1 / $2"],
      [/36\s+Láminas/g, "36 Seiten"],
      [/36\s+láminas/g, "36 Seiten"],
      [/30\s+Láminas/g, "36 Seiten"],
      [/30\s+láminas/g, "36 Seiten"],
      [/1\.\s*PROPÓSITO NUCLEAR/g, "1. KERNZWECK (GOLDEN CIRCLE)"],
      [/2\.\s*OFERTA DE VALOR DIFERENCIADA/g, "2. DIFFERENZIERTES WERTVERSPRECHEN"],
      [/3\.\s*IMPACTO EN EL CLIENTE/g, "3. KUNDENWIRKUNG"],
      [/4\.\s*MÉTODO Y PROCESO/g, "4. METHODE & PROZESS"],
      [/5\.\s*MENSAJE CENTRAL/g, "5. KERNBOTSCHAFT"],
      [/6\.\s*CARÁCTER Y PERSONALIDAD/g, "6. CHARAKTER & PERSÖNLICHKEIT"],
      [/7\.\s*CLIENTE IDEAL/g, "7. IDEALER KUNDE"],
      [/CALIBRACIÓN VISUAL CON REFERENCIAS/g, "VISUELLE KALIBRIERUNG MIT REFERENZEN"],
      [/Desliza o toca las referencias visuales en los extremos para/g, "Bewege den Regler oder tippe auf die visuellen Pole für"],
      [/Elige la tipografía oficial para el logotipo y manual de/g, "Wähle die offizielle Typografie für Logo und Handbuch von"],
      [/Elige la estructura base y, si lo deseas, escribe una idea o símbolo inicial para/g, "Wähle die Grundstruktur und gib optional eine Symbolidee ein für"],
      [/Selecciona el Acabado, Paleta o tu Logotipo Base para/g, "Wähle Finish, Farbpalette oder dein Basislogo für"],
      [/Nombre Oficial Seleccionado:/g, "Ausgewählter offizieller Name:"],
      [/Solicitar Dictamen a\s+(.+)/g, "Gutachten anfordern von $1"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*INICIO\s*·\s*REF:\s*(.+)/g, "AURA · SCHRITT $1 · START · REF: $2"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*([A-ZÁÉÍÓÚÑ\s]+)\s*·\s*REF:\s*(.+)/g, "AURA · SCHRITT $1 · $2 · REF: $3"],
      [/Según\s+([^,]+),\s*partir de\s+«([^»]+)»\s+nos da una síntesis visual clara y llena de significado\./g, "Laut $1 gibt uns der Startpunkt „$2“ eine klare und bedeutungsvolle visuelle Synthese."],
      [/Como enseña\s+([^,]+),\s*definir tu objetivo inicial da dirección estratégica inmediata a tu marca\./g, "Wie $1 lehrt, gibt die Definition deines Startziels deiner Marke sofortige strategische Richtung."],
      [/Tomar mi logotipo actual/g, "Mein aktuelles Logo verwenden"],
      [/MANUAL DE IDENTIDAD CORPORATIVA/g, "CORPORATE-IDENTITY-HANDBUCH"],
      [/MANUAL DE MARCA Y ARQUITECTURA DE IDENTIDAD/g, "MARKENHANDBUCH & IDENTITÄTSARCHITEKTUR"],
      [/PORTADA MAESTRA/g, "HAUPTCOVER"],
      [/Portada Maestra en Curvas:/g, "Vektor-Hauptcover:"],
      [/ESTRATEGIA/g, "STRATEGIE"],
      [/SISTEMAS/g, "SYSTEME"],
      [/CLARIDAD/g, "KLARHEIT"],
      [/RESULTADOS/g, "ERGEBNISSE"],
      [/Versión Positiva Principal sobre Lienzo Claro/g, "Primäre Positiv-Version auf hellem Canvas"],
      [/En línea en tiempo real/g, "In Echtzeit online"],
      [/Este dispositivo/g, "Dieses Gerät"],
      [/ACTIVO/g, "AKTIV"],
      [/RECIENTE/g, "KÜRZLICH"],
      [/Borrar/g, "Entfernen"],
      [/PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "SCHRITT 4 · 4 VON 5 · HYBRIDES TYPOGRAFIESYSTEM (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/1\. Elige la familia de estilo \(o conecta Adobe Fonts\) y 2\. Toca la tríada para/g, "1. Wähle die Stilfamilie (oder verbinde Adobe Fonts) & 2. Tippe auf die Triade für"],
      [/Ej\. xab1cde o URL https:\/\/use\.typekit\.net\/xab1cde\.css/g, "Z. B. xab1cde oder URL https://use.typekit.net/xab1cde.css"],
      [/✓ 100% Legal: Web\/Curvas\/PDF \+ \.TTF Libres en tu \.ZIP/g, "✓ 100% Legal: Web/Vektoren/PDF + Freie .TTF in deiner .ZIP"],
      [/Arquitectura, Obra Civil y Liderazgo Corporativo/g, "Architektur, Ingenieurbau & Unternehmensführung"],
      [/Editorial Contemporánea y Alta Claridad/g, "Zeitgenössisches Editorial & Höchste Klarheit"],
      [/Minimalismo Geométrico y Cercanía/g, "Geometrischer Minimalismus & Nähe"],
      [/Fuerza Estructural e Impacto Monolítico/g, "Strukturelle Kraft & Monolithische Wirkung"],
      [/Ingeniería de Precisión, SaaS e Innovación/g, "Präzisions-Engineering, SaaS & Innovation"],
      [/Rigor Suizo y Sistemas Digitales/g, "Schweizer Präzision & Digitale Systeme"],
      [/Fintech, Futuro y Claridad Algorítmica/g, "Fintech, Zukunft & Algorithmische Klarheit"],
      [/Consultoría Estratégica y Banca Moderna/g, "Strategieberatung & Modernes Banking"],
      [/✓ Sistema Híbrido Activo:/g, "✓ Aktives Hybridsystem:"],
      [/\(Logo\/Títulos\)/g, "(Logo/Titel)"],
      [/\(Cuerpo\)/g, "(Fließtext)"],
      [/\(Datos\)/g, "(Daten)"],
      [/↓ Descargar Kit Híbrido \(\.ZIP: \.TTF \+ Typekit CSS\)/g, "↓ Hybrides Kit herunterladen (.ZIP: .TTF + Typekit CSS)"],
      [/Iteración #(\d+)/g, "Iteration #$1"],
      [/Prompt del Sistema/g, "System-Prompt"],
      [/palabras/g, "Wörter"],
      [/App en proporción 1:1/g, "1:1 App-Icon"],
      [/Diseña el logotipo 3D de/g, "Entwirf das 3D-Logo von"],
      [/integrando su símbolo y monograma en proporción 1:1 para app y versión horizontal con nombre y eslogan, sobre lienzo claro y oscuro con acabado de agencia mundial\./g, "mit integriertem Symbol und Monogramm im 1:1-App-Format sowie horizontalem Lockup mit Name und Slogan auf hellem und dunklem Canvas."],
      [/01\. Portada Oficial de Marca:/g, "01. Offizielles Markencover:"],
      [/CONSEJO METODOLÓGICO · DICTAMEN METODOLÓGICO: APROBADO/g, "METHODENRAT · PRÜFURTEIL: ZERTIFIZIERT"],
      [/Consejo Metodológico · DICTAMEN METODOLÓGICO: APROBADO/g, "Methodenrat · PRÜFURTEIL: ZERTIFIZIERT"],
      [/PORTADA MONUMENTAL/g, "MONUMENTALES COVER"],
      [/LIENZO CLARO C-00 CERTIFICADO/g, "ZERTIFIZIERTER HELLER CANVAS C-00"],
      [/✓ Fotografía Editorial 4:3 Lista/g, "✓ 4:3 Editorial-Fotografie bereit"],
      [/PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "SCHRITT 6 · 2 VON 2 · EXEKUTIVER DOWNLOAD- & PRODUKTIONSTRESOR V83.0"],
      [/Manual Oficial \([^)]+\), Vectores \(\.SVG \/ \.AI\), Kit Híbrido de Fuentes \(\.TTF \+ Typekit\) y Suite Editable de/g, "Offizielles Handbuch (36 Seiten), Vektoren (.SVG / .AI), Hybrides Schriften-Kit (.TTF + Typekit) & Editierbare Suite von"],
      [/Todos tus activos listos para imprenta, Adobe Illustrator, Gmail\/Outlook, Word, PowerPoint y tu sistema tipográfico híbrido 100% libre de riesgos de copyright\./g, "Alle deine Assets bereit für Druck, Adobe Illustrator, Gmail/Outlook, Word, PowerPoint und dein 100% urheberrechtssicheres hybrides Schriftsystem."],
      [/1\. Descargar Manual Oficial Completo en PDF Directo \([^)]+\)/g, "1. Komplettes offizielles Markenhandbuch als PDF herunterladen (36 Seiten .PDF)"],
      [/2\. Logotipo Horizontal 100% en Curvas \(\.SVG Vectorizado\)/g, "2. Horizontales Logo 100% in Vektorkurven (.SVG Vektor)"],
      [/3\. Archivo Nativo Adobe Illustrator en Curvas \(\.AI\)/g, "3. Native Adobe Illustrator Vektordatei in Kurven (.AI)"],
      [/4\. Firma Corporativa de Correo \(\.HTML Gmail \/ Outlook\)/g, "4. Unternehmens-E-Mail-Signatur (.HTML Gmail / Outlook)"],
      [/5\. Plantilla Editable Hoja Membretada \(\.DOCX Word \/ Docs\)/g, "5. Editierbare Briefpapier-Vorlage (.DOCX Word / Docs)"],
      [/6\. Presentación Ejecutiva Editable 16:9 \(\.PPTX PowerPoint\)/g, "6. Editierbare 16:9 Executive-Präsentation (.PPTX PowerPoint)"],
      [/7\. Avatar 1:1 \+ Sello Circular en Curvas \(\.SVG\)/g, "7. 1:1 Avatar + Rundes Vektorsiegel in Kurven (.SVG)"],
      [/8\. Manual Web Interactivo Autónomo \(\.HTML [^)]+\)/g, "8. Interaktives Standalone-Webhandbuch (36 Seiten .HTML)"],
      [/9\. Descargar Kit Híbrido de Fuentes \(\.ZIP:/g, "9. Hybrides Schriften-Kit herunterladen (.ZIP:"],
      [/← Volver al Visor Interactivo de las [^)]+\(01 a 36\)/g, "← Zurück zum interaktiven 36-Seiten-Viewer (01 bis 36)"],
      [/PASO 0\s+PASO 1 · BIENVENIDA Y TEORÍA/g, "SCHRITT 0 ZU SCHRITT 1 · WILLKOMMEN & THEORIE"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del Paso 1/g, "Willkommen! Branchen-Zusammenfassung + Theorie zu Schritt 1"],
      [/Revisa la síntesis de tu proyecto y mira la cápsula teórica sobre el Círculo Dorado antes de responder la primera pregunta:/g, "Prüfe die Synthese deines Projekts und sieh dir die Theorie-Kapsel zum Golden Circle an, bevor du die erste Frage beantwortest:"],
      [/El Círculo Dorado y tu Promesa en 3 Pasos/g, "Der Golden Circle & dein 3-Schritte-Versprechen"],
      [/La gente no compra lo que haces, sino el porqué lo haces \(Simon Sinek\)\. Aquí defines tu propósito nuclear, tu método claro en tres pasos \(Donald Miller\) y el arquetipo humano de tu marca\./g, "Menschen kaufen nicht, was du tust, sondern warum du es tust (Simon Sinek). Hier definierst du deinen Kernzweck, deine klare 3-Schritte-Methode (Donald Miller) und den Archetyp deiner Marke."],
      [/PARTE 1 · BIENVENIDA Y RESUMEN DE TU PUNTO DE PARTIDA \([^)]+\):/g, "TEIL 1 · WILLKOMMEN & ZUSAMMENFASSUNG DEINES STARTPUNKTS (SCHRITT 0):"],
      [/Esencia del Giro Interpretada:/g, "Interpretierte Branchen-Essenz:"],
      [/Plataforma de alta dirección y diseño algorítmico que construye la identidad visual completa de tu empresa y su Manual Oficial de [^)]+ en minutos\./g, "Plattform für algorithmisches Design, die deine komplette visuelle Identität und dein offizielles 36-Seiten-Markenhandbuch in Vektorkurven in Minuten erstellt."],
      [/Continuar en (?:Paso|Schritt)\s+(\d+)/g, "Weiter in Schritt $1"],
      [/WHY \(Propósito Nuclear\): Democratizar la excelencia del branding de lujo[\s\S]*$/g, "WHY (Kernzweck): Die Exzellenz von Luxus-Branding demokratisieren, damit Gründer und Führungskräfte in Minuten mathematisch präzise Markenidentitäten erhalten. HOW (Wie): Durch die Verbindung von generativer KI, algorithmischer Bézier-Geometrie, Auras Sprach-Mentoring und der Methodik von 15 legendären Autoren. WHAT (Was): SaaS-Atelier, das deine Corporate Identity, dein Vektorlogo und dein 36-Seiten-Markenhandbuch erstellt."],
      [/SaaS y Atelier de Identidad Visual Algorítmica[\s\S]*$/g, "Algorithmisches SaaS- & Markenidentitäts-Atelier mit KI, Bézier-Vektorkurven und neuronalem Sprach-Mentoring von Aura"],
      [/Redes Sociales Oficiales \(LinkedIn \/ X \/ Instagram\)/g, "Offizielle soziale Medien (LinkedIn / X / Instagram)"],
      [/Web Comercial \(thebestbrand-studio\.web\.app\)/g, "Kommerzielle Website (thebestbrand.app)"],
      [/Aura Agente de Voz 24\/7/g, "Aura 24/7 Sprach-Mentorin"],
      [/Cuestionario Interactivo de 7 Pasos/g, "Interaktiver 7-Schritte-Markendialog"],
      [/Diagnóstico Gratuito de Marca en Minutos/g, "Kostenlose Markendiagnose in Minuten"],
      [/Pasarela de Pago Rápida \(Apple Pay \/ Tarjeta \/ PayPal\)/g, "Schneller Checkout (Apple Pay / Karte / PayPal)"],
      [/Generación en Tiempo Real de Logotipos en Canvas y SVG/g, "Echtzeit-Logogenerierung in Canvas & SVG"],
      [/Asesoría en Vivo de los 15 Autores Consejeros/g, "Live-Beratung der 15 Meisterautoren"],
      [/Renderizado Instantáneo del Brandbook de 30 Hojas/g, "Sofort-Rendering des 36-Seiten-Brandbooks"],
      [/Ajustes Interactivos de Color, Trazos y Tipografía/g, "Interaktive Farb-, Kontur- & Typografie-Steuerung"],
      [/SaaS\s*·\s*Atelier\s*·\s*Identidad\s*·\s*Visual\s*·\s*Algorítmica/g, "SaaS · Atelier · Identität · Visuell · Algorithmisch"],
      [/Raíces extraídas de tu estrategia:/g, "Aus deiner Strategie extrahierte Wortwurzeln:"]
    ],
    it: [
      [/SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "SISTEMA TIPOGRAFICO IBRIDO (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "CASSAFORTE DI DOWNLOAD E PRODUZIONE ESECUTIVA V83.0"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del (?:Paso|Passo) 1/g, "Benvenuto! Riepilogo del Settore + Teoria del Passo 1"],
      [/PASO\s+(\d+)\s*·\s*(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · $2 DI $3"],
      [/PASO\s+(\d+)\s*·\s*PREGUNTA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · DOMANDA $2 DI $3"],
      [/PASO\s+(\d+)\s*·\s*ETAPA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · FASE $2 DI $3"],
      [/PASO\s+(\d+)\s*·\s*LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "PASSO $1 · TAVOLA $2 DI $3"],
      [/Paso\s+(\d+)\s*·\s*Sub-paso\s+(\d+)/g, "Passo $1 · Sotto-passo $2"],
      [/Video\s+Paso\s+(\d+)/g, "Video Passo $1"],
      [/Paso\s+(\d+)/g, "Passo $1"],
      [/Siguiente\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Tavola Successiva ($1/$2)"],
      [/Successivo\s+Lámina\s*\((\d+)\/(\d+)\)/g, "Tavola Successiva ($1/$2)"],
      [/Lámina\s+(\d+):/g, "Tavola $1:"],
      [/LÁMINA\s+(\d+)\s+DE\s+(\d+)/g, "TAVOLA $1 DI $2"],
      [/LAMINA\s+(\d+)\s*\/\s*(\d+)/g, "TAVOLA $1 / $2"],
      [/36\s+Láminas/g, "36 Tavole"],
      [/36\s+láminas/g, "36 tavole"],
      [/30\s+Láminas/g, "36 Tavole"],
      [/30\s+láminas/g, "36 tavole"],
      [/1\.\s*PROPÓSITO NUCLEAR/g, "1. SCOPO CENTRALE (CERCHIO D'ORO)"],
      [/2\.\s*OFERTA DE VALOR DIFERENCIADA/g, "2. OFFERTA DI VALORE DIFFERENZIATA"],
      [/3\.\s*IMPACTO EN EL CLIENTE/g, "3. IMPATTO SUL CLIENTE"],
      [/4\.\s*MÉTODO Y PROCESO/g, "4. METODO E PROCESSO"],
      [/5\.\s*MENSAJE CENTRAL/g, "5. MESSAGGIO CENTRALE"],
      [/6\.\s*CARÁCTER Y PERSONALIDAD/g, "6. CARATTERE E PERSONALITÀ"],
      [/7\.\s*CLIENTE IDEAL/g, "7. CLIENTE IDEALE"],
      [/CALIBRACIÓN VISUAL CON REFERENCIAS/g, "CALIBRAZIONE VISIVA CON RIFERIMENTI"],
      [/Desliza o toca las referencias visuales en los extremos para/g, "Scorri o tocca i riferimenti visivi agli estremi per"],
      [/Elige la tipografía oficial para el logotipo y manual de/g, "Scegli la tipografia ufficiale per il logo e il manuale di"],
      [/Elige la estructura base y, si lo deseas, escribe una idea o símbolo inicial para/g, "Scegli la struttura di base e, se vuoi, scrivi un'idea o simbolo iniziale per"],
      [/Selecciona el Acabado, Paleta o tu Logotipo Base para/g, "Seleziona Finitura, Palette o Logo Base per"],
      [/Nombre Oficial Seleccionado:/g, "Nome Ufficiale Selezionato:"],
      [/Solicitar Dictamen a\s+(.+)/g, "Richiedi Parere a $1"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*INICIO\s*·\s*REF:\s*(.+)/g, "AURA · PASSO $1 · INIZIO · RIF: $2"],
      [/AURA\s*·\s*PASO\s+(\d+)\s*·\s*([A-ZÁÉÍÓÚÑ\s]+)\s*·\s*REF:\s*(.+)/g, "AURA · PASSO $1 · $2 · RIF: $3"],
      [/Según\s+([^,]+),\s*partir de\s+«([^»]+)»\s+nos da una síntesis visual clara y llena de significado\./g, "Secondo $1, partire da «$2» ci offre una sintesi visiva chiara e ricca di significato."],
      [/Como enseña\s+([^,]+),\s*definir tu objetivo inicial da dirección estratégica inmediata a tu marca\./g, "Come insegna $1, definire il tuo obiettivo iniziale dà direzione strategica immediata al tuo brand."],
      [/Tomar mi logotipo actual/g, "Usare il mio logo attuale"],
      [/MANUAL DE IDENTIDAD CORPORATIVA/g, "MANUALE DI IDENTITÀ CORPORATIVA"],
      [/MANUAL DE MARCA Y ARQUITECTURA DE IDENTIDAD/g, "MANUALE DI MARCA E ARCHITETTURA D'IDENTITÀ"],
      [/PORTADA MAESTRA/g, "COPERTINA MAESTRA"],
      [/Portada Maestra en Curvas:/g, "Copertina Maestra in Curve:"],
      [/ESTRATEGIA/g, "STRATEGIA"],
      [/SISTEMAS/g, "SISTEMI"],
      [/CLARIDAD/g, "CHIAREZZA"],
      [/RESULTADOS/g, "RISULTATI"],
      [/Versión Positiva Principal sobre Lienzo Claro/g, "Versione Positiva Principale su Tela Chiara"],
      [/En línea en tiempo real/g, "Online in tempo reale"],
      [/Este dispositivo/g, "Questo dispositivo"],
      [/ACTIVO/g, "ATTIVO"],
      [/RECIENTE/g, "RECENTE"],
      [/Borrar/g, "Rimuovi"],
      [/PASO 4 · 4 DE 5 · SISTEMA TIPOGRÁFICO HÍBRIDO \(OPEN SOURCE \.TTF \+ ADOBE FONTS TYPEKIT · 100% COPYRIGHT\)/g, "PASSO 4 · 4 DI 5 · SISTEMA TIPOGRAFICO IBRIDO (OPEN SOURCE .TTF + ADOBE FONTS TYPEKIT · 100% COPYRIGHT)"],
      [/1\. Elige la familia de estilo \(o conecta Adobe Fonts\) y 2\. Toca la tríada para/g, "1. Scegli la famiglia di stile (o collega Adobe Fonts) e 2. Tocca la triade per"],
      [/Ej\. xab1cde o URL https:\/\/use\.typekit\.net\/xab1cde\.css/g, "Es. xab1cde o URL https://use.typekit.net/xab1cde.css"],
      [/✓ 100% Legal: Web\/Curvas\/PDF \+ \.TTF Libres en tu \.ZIP/g, "✓ 100% Legale: Web/Curve/PDF + .TTF Liberi nel tuo .ZIP"],
      [/Arquitectura, Obra Civil y Liderazgo Corporativo/g, "Architettura, Ingegneria Civile e Leadership Aziendale"],
      [/Editorial Contemporánea y Alta Claridad/g, "Editoria Contemporanea e Alta Chiarezza"],
      [/Minimalismo Geométrico y Cercanía/g, "Minimalismo Geometrico e Vicinanza"],
      [/Fuerza Estructural e Impacto Monolítico/g, "Forza Strutturale e Impatto Monolitico"],
      [/Ingeniería de Precisión, SaaS e Innovación/g, "Ingegneria di Precisione, SaaS e Innovazione"],
      [/Rigor Suizo y Sistemas Digitales/g, "Rigore Svizzero e Sistemi Digitali"],
      [/Fintech, Futuro y Claridad Algorítmica/g, "Fintech, Futuro e Chiarezza Algoritmica"],
      [/Consultoría Estratégica y Banca Moderna/g, "Consulenza Strategica e Banking Moderno"],
      [/✓ Sistema Híbrido Activo:/g, "✓ Sistema Ibrido Attivo:"],
      [/\(Logo\/Títulos\)/g, "(Logo/Titoli)"],
      [/\(Cuerpo\)/g, "(Corpo)"],
      [/\(Datos\)/g, "(Dati)"],
      [/↓ Descargar Kit Híbrido \(\.ZIP: \.TTF \+ Typekit CSS\)/g, "↓ Scarica Kit Ibrido (.ZIP: .TTF + Typekit CSS)"],
      [/Iteración #(\d+)/g, "Iterazione #$1"],
      [/Prompt del Sistema/g, "Prompt di Sistema"],
      [/palabras/g, "parole"],
      [/App en proporción 1:1/g, "Icona App 1:1"],
      [/Diseña el logotipo 3D de/g, "Progetta il logo 3D di"],
      [/integrando su símbolo y monograma en proporción 1:1 para app y versión horizontal con nombre y eslogan, sobre lienzo claro y oscuro con acabado de agencia mundial\./g, "integrando simbolo e monogramma in proporzione 1:1 per app e versione orizzontale con nome e slogan, su sfondo chiaro e scuro."],
      [/01\. Portada Oficial de Marca:/g, "01. Copertina Ufficiale del Brand:"],
      [/CONSEJO METODOLÓGICO · DICTAMEN METODOLÓGICO: APROBADO/g, "CONSIGLIO METODOLOGICO · PARERE: APPROVATO"],
      [/Consejo Metodológico · DICTAMEN METODOLÓGICO: APROBADO/g, "Consiglio Metodologico · PARERE: APPROVATO"],
      [/PORTADA MONUMENTAL/g, "COPERTINA MONUMENTALE"],
      [/LIENZO CLARO C-00 CERTIFICADO/g, "TELA CHIARA C-00 CERTIFICATA"],
      [/✓ Fotografía Editorial 4:3 Lista/g, "✓ Fotografia Editoriale 4:3 Pronta"],
      [/PASO 6 · 2 DE 2 · BÓVEDA DE DESCARGAS Y PRODUCCIÓN EJECUTIVA V83\.0/g, "PASSO 6 · 2 DI 2 · CASSAFORTE DI DOWNLOAD E PRODUZIONE ESECUTIVA V83.0"],
      [/Manual Oficial \([^)]+\), Vectores \(\.SVG \/ \.AI\), Kit Híbrido de Fuentes \(\.TTF \+ Typekit\) y Suite Editable de/g, "Manuale Ufficiale (36 Tavole), Vettori (.SVG / .AI), Kit Ibrido di Font (.TTF + Typekit) e Suite Modificabile di"],
      [/Todos tus activos listos para imprenta, Adobe Illustrator, Gmail\/Outlook, Word, PowerPoint y tu sistema tipográfico híbrido 100% libre de riesgos de copyright\./g, "Tutti i tuoi asset pronti per la stampa, Adobe Illustrator, Gmail/Outlook, Word, PowerPoint e il tuo sistema tipografico ibrido 100% libero da rischi di copyright."],
      [/1\. Descargar Manual Oficial Completo en PDF Directo \([^)]+\)/g, "1. Scarica il Manuale Ufficiale Completo in PDF Diretto (36 Tavole .PDF)"],
      [/2\. Logotipo Horizontal 100% en Curvas \(\.SVG Vectorizado\)/g, "2. Logo Orizzontale 100% in Curve (.SVG Vettoriale)"],
      [/3\. Archivo Nativo Adobe Illustrator en Curvas \(\.AI\)/g, "3. File Nativo Adobe Illustrator in Curve (.AI)"],
      [/4\. Firma Corporativa de Correo \(\.HTML Gmail \/ Outlook\)/g, "4. Firma Email Aziendale (.HTML Gmail / Outlook)"],
      [/5\. Plantilla Editable Hoja Membretada \(\.DOCX Word \/ Docs\)/g, "5. Modello Modificabile Carta Intestata (.DOCX Word / Docs)"],
      [/6\. Presentación Ejecutiva Editable 16:9 \(\.PPTX PowerPoint\)/g, "6. Presentazione Esecutiva Modificabile 16:9 (.PPTX PowerPoint)"],
      [/7\. Avatar 1:1 \+ Sello Circular en Curvas \(\.SVG\)/g, "7. Avatar 1:1 + Sigillo Circolare in Curve (.SVG)"],
      [/8\. Manual Web Interactivo Autónomo \(\.HTML [^)]+\)/g, "8. Manuale Web Interattivo Autonomo (.HTML 36 Tavole)"],
      [/9\. Descargar Kit Híbrido de Fuentes \(\.ZIP:/g, "9. Scarica Kit Ibrido di Font (.ZIP:"],
      [/← Volver al Visor Interactivo de las [^)]+\(01 a 36\)/g, "← Torna al Visualizzatore Interattivo delle 36 Tavole (01 a 36)"],
      [/PASO 0\s+PASO 1 · BIENVENIDA Y TEORÍA/g, "PASSO 0 AL PASSO 1 · BENVENUTO E TEORIA"],
      [/¡Bienvenido! Resumen de tu Giro \+ Teoría del Paso 1/g, "Benvenuto! Riepilogo del Settore + Teoria del Passo 1"],
      [/Revisa la síntesis de tu proyecto y mira la cápsula teórica sobre el Círculo Dorado antes de responder la primera pregunta:/g, "Rivedi la sintesi del tuo progetto e guarda la capsula teorica sul Cerchio d'Oro prima di rispondere alla prima domanda:"],
      [/El Círculo Dorado y tu Promesa en 3 Pasos/g, "Il Cerchio d'Oro e la tua Promessa in 3 Passi"],
      [/La gente no compra lo que haces, sino el porqué lo haces \(Simon Sinek\)\. Aquí defines tu propósito nuclear, tu método claro en tres pasos \(Donald Miller\) y el arquetipo humano de tu marca\./g, "Le persone non comprano ciò che fai, ma il perché lo fai (Simon Sinek). Qui definisci il tuo scopo centrale, il tuo metodo chiaro in 3 passi (Donald Miller) e l'archetipo del tuo brand."],
      [/PARTE 1 · BIENVENIDA Y RESUMEN DE TU PUNTO DE PARTIDA \([^)]+\):/g, "PARTE 1 · BENVENUTO E RIEPILOGO DEL TUO PUNTO DI PARTENZA (PASSO 0):"],
      [/Esencia del Giro Interpretada:/g, "Essenza del Settore Interpretata:"],
      [/Plataforma de alta dirección y diseño algorítmico que construye la identidad visual completa de tu empresa y su Manual Oficial de [^)]+ en minutos\./g, "Piattaforma esecutiva di design algoritmico che costruisce l'identità visiva completa della tua azienda e il suo Manuale Ufficiale di 36 Tavole in pochi minuti."],
      [/Continuar en (?:Paso|Passo)\s+(\d+)/g, "Continua nel Passo $1"],
      [/WHY \(Propósito Nuclear\): Democratizar la excelencia del branding de lujo[\s\S]*$/g, "WHY (Scopo Centrale): Democratizzare l'eccellenza del branding di lusso, consentendo a fondatori e dirigenti di ottenere in pochi minuti identità visive matematicamente perfette. HOW (Come): Unendo IA generativa, geometria algoritmica in curve di Bézier, mentoring vocale di Aura e la metodologia di 15 autori leggendari. WHAT (Cosa): Atelier SaaS che progetta la tua identità aziendale, il tuo logo vettoriale e il Manuale Ufficiale di 36 Tavole."],
      [/SaaS y Atelier de Identidad Visual Algorítmica[\s\S]*$/g, "SaaS e Atelier di Identità Visiva Algoritmica con IA, curve di Bézier e mentoring vocale neurale di Aura"],
      [/Redes Sociales Oficiales \(LinkedIn \/ X \/ Instagram\)/g, "Social Media Ufficiali (LinkedIn / X / Instagram)"],
      [/Web Comercial \(thebestbrand-studio\.web\.app\)/g, "Sito Commerciale (thebestbrand.app)"],
      [/Aura Agente de Voz 24\/7/g, "Aura Mentore Vocale 24/7"],
      [/Cuestionario Interactivo de 7 Pasos/g, "Questionario Interattivo in 7 Passi"],
      [/Diagnóstico Gratuito de Marca en Minutos/g, "Diagnosi Gratuita del Brand in Minuti"],
      [/Pasarela de Pago Rápida \(Apple Pay \/ Tarjeta \/ PayPal\)/g, "Checkout Rapido (Apple Pay / Carta / PayPal)"],
      [/Generación en Tiempo Real de Logotipos en Canvas y SVG/g, "Generazione in Tempo Reale di Loghi in Canvas e SVG"],
      [/Asesoría en Vivo de los 15 Autores Consejeros/g, "Consulenza Live dei 15 Autori Consiglieri"],
      [/Renderizado Instantáneo del Brandbook de 30 Hojas/g, "Rendering Istantaneo del Brandbook di 36 Tavole"],
      [/Ajustes Interactivos de Color, Trazos y Tipografía/g, "Controlli Interattivi di Colore, Tratti e Tipografia"],
      [/SaaS\s*·\s*Atelier\s*·\s*Identidad\s*·\s*Visual\s*·\s*Algorítmica/g, "SaaS · Atelier · Identità · Visiva · Algoritmica"],
      [/Raíces extraídas de tu estrategia:/g, "Radici estratte dalla tua strategia:"]
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
    // Ejecutar primero los patrones específicos antes de sustituciones cortas para evitar reemplazos parciales
    const patterns = PATTERN_REPLACEMENTS[lang] || [];
    for (let i = 0; i < patterns.length; i++) {
      out = out.replace(patterns[i][0], patterns[i][1]);
    }

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

    const valEls = rootEl.querySelectorAll("textarea, input[type='text']");
    valEls.forEach(el => {
      const val = el.value;
      if (!val || !val.trim()) return;
      if (!el._tbbOrigValEs) el._tbbOrigValEs = val;
      const translatedVal = window.tbbTranslateText(el._tbbOrigValEs, lang);
      if (translatedVal !== val) {
        el.value = translatedVal;
      }
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
    const valEls = rootEl.querySelectorAll("textarea, input[type='text']");
    valEls.forEach(el => {
      if (el._tbbOrigValEs !== undefined) {
        el.value = el._tbbOrigValEs;
      }
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

    // Inyectar selector rápido de 6 idiomas en la barra superior (#tbbTopDiscreteBar)
    const topBar = document.getElementById("tbbTopDiscreteBar");
    if (topBar) {
      let topSel = document.getElementById("tbbStudioTopLangSelect");
      if (!topSel) {
        topSel = document.createElement("select");
        topSel.id = "tbbStudioTopLangSelect";
        topSel.setAttribute("aria-label", "Idioma / Language");
        topSel.style.cssText = "height:32px; padding:0 6px; border-radius:8px; border:1.5px solid #0284C7; border-bottom:2.5px solid #FF7A00; background:#F0F9FF; font-family:var(--font-mono); font-size:0.72rem; font-weight:900; color:#0D2540; cursor:pointer; flex-shrink:0;";
        topSel.onchange = function () {
          window.tbbSetLanguage(this.value);
        };
        const voiceBtn = document.getElementById("tbbBtnTopVoice");
        if (voiceBtn) {
          topBar.insertBefore(topSel, voiceBtn);
        } else {
          topBar.appendChild(topSel);
        }
      }
      const curLang = window.tbbGetLang();
      topSel.innerHTML = Object.values(SUPPORTED_LANGS).map(l =>
        `<option value="${l.code}" ${l.code === curLang ? "selected" : ""}>${l.flag || ""} ${l.shortLabel}</option>`
      ).join("");
      topSel.value = curLang;
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
        const rawGiro = (cs.custom_business_type || cs.step0_short_essence || (lang === "en" ? "our core activity" : lang === "pt" ? "nossa atividade principal" : "notre activité principale")).trim();
        const giro = window.tbbTranslateText(rawGiro, lang);
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
        if (lang === "de") {
          const mapDe = {
            1: [`${giro} durch operative Exzellenz und menschliche Nähe transformieren`, `Menschen und Unternehmen stärken, die höchste Sicherheit in ${giro} suchen`],
            2: [`Wir verbinden persönliche Betreuung in ${giro} mit messbaren Ergebnissen`, `Ein überlegener Qualitäts- und Vertrauensstandard, entwickelt für ${bName}`],
            3: [`Wir sparen Zeit und bieten absolute Sicherheit in jeder Phase von ${giro}`, `Wir steigern die Ruhe und den Erfolg unserer Kunden durch unser System`],
            4: [`1. Klare Diagnose, 2. Spezialisierte Umsetzung, 3. Geprüfte Übergabe`, `Sorgfältige Auswahl, maßgeschneiderte Entwicklung in ${giro} und laufender Support`],
            5: [`${bName}: Der Maßstab für Vertrauen und Exzellenz in ${giro}`, `Klarheit, Präzision und nachhaltige Ergebnisse für höchste Ansprüche`],
            6: [`Nahbar, kompetent, lösungsorientiert und leidenschaftlich für Exzellenz`, `Zuverlässig, transparent, agil und führend in ${giro}`],
            7: [`Führungskräfte und Kunden, die reibungslose Qualität ohne Verzögerung suchen`, `Anspruchsvolle Kunden, die echte, messbare Ergebnisse in ${giro} schätzen`]
          };
          return mapDe[qIdx] || mapDe[1];
        }
        if (lang === "it") {
          const mapIt = {
            1: [`Trasformare ${giro} attraverso eccellenza operativa e vicinanza umana`, `Valorizzare chi cerca certezza e alti standard in ${giro}`],
            2: [`Uniamo attenzione personalizzata in ${giro} e risultati misurabili`, `Uno standard superiore di qualità e fiducia progettato per ${bName}`],
            3: [`Facciamo risparmiare tempo e offriamo certezza totale in ogni fase di ${giro}`, `Eleviamo la serenità e i risultati del cliente grazie al nostro metodo`],
            4: [`1. Diagnosi chiara, 2. Esecuzione specializzata, 3. Consegna verificata`, `Selezione rigorosa, sviluppo su misura in ${giro} e supporto continuo`],
            5: [`${bName}: il punto di riferimento per fiducia ed eccellenza in ${giro}`, `Chiarezza, precisione e risultati duraturi per chi esige il meglio`],
            6: [`Vicina, esperta, risolutiva e appassionata dell'eccellenza`, `Affidabile, trasparente, agile e autorevole in ${giro}`],
            7: [`Leader e clienti che cercano qualità senza attriti né ritardi`, `Clienti esigenti che apprezzano risultati concreti e misurabili in ${giro}`]
          };
          return mapIt[qIdx] || mapIt[1];
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
        if (lang === "de") {
          if (phaseKey === "before") return ["Offizielle Website & Suche", "Direkte Kundenempfehlung", "Executive Portfolio & Demo", "Social Media & Fachinhalte"];
          if (phaseKey === "during") return ["Diagnose- & Angebotsgespräch", "Hauptprodukt- / Serviceerlebnis", "Betreuung durch Spezialistenteam", "Reibungslose Zahlung & Lieferung"];
          return ["Nachbetreuung nach dem Kauf", "Ergebnis- & Qualitätsbericht", "Garantie & Direktsupport", "Treue- & Empfehlungsprogramm"];
        }
        if (lang === "it") {
          if (phaseKey === "before") return ["Sito Ufficiale e Ricerca", "Passaparola e Referenze Dirette", "Portfolio Esecutivo e Demo", "Social Media e Contenuti Specialistici"];
          if (phaseKey === "during") return ["Sessione di Diagnosi e Proposta", "Esperienza Principale del Servizio", "Assistenza del Team Specializzato", "Pagamento e Consegna Fluidi"];
          return ["Follow-up Post-Vendita", "Report di Risultati e Qualità", "Garanzia e Supporto Diretto", "Programma Fedeltà e Referral"];
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
      document.getElementById("tbbAuraSplashBootOverlay"),
      document.getElementById("tbbZeroScrollMasterStage"),
      document.getElementById("tbbBottomControlDeck"),
      document.getElementById("screen-journey"),
      document.getElementById("tbbDuolingoBottomNav"),
      document.getElementById("accountVaultModal"),
      document.getElementById("tbbGeneralMenuModal"),
      document.getElementById("phaseTransitionVideoModal"),
      document.getElementById("tbbAdminAuraColorModal"),
      document.getElementById("tbbInAppBrandbookViewerOverlay"),
      document.getElementById("tbbDemoCompletionPaywallModal")
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
      localStorage.setItem("thebestbrand_lang_v90", cleanCode);
    } catch (e) {}

    if (!skipCloudSync && typeof playAcousticClick === "function") playAcousticClick(880, 0.04);

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
    if (!skipCloudSync && typeof showStepResetFeedbackToast === "function") {
      showStepResetFeedbackToast(ui.langSavedToast);
    }

    try {
      const transModal = document.getElementById("phaseTransitionVideoModal");
      if (transModal && transModal.classList.contains("open") && window._tbbActiveTransitionModalParams && typeof openPhaseTransitionVideoCapsule === "function") {
        const p = window._tbbActiveTransitionModalParams;
        openPhaseTransitionVideoCapsule(p.fromStep, p.toStep, p.options || {});
      }
    } catch (e) {}
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
    const applyInitialLang = () => {
      const cur = getSavedLang();
      window.tbbCurrentLang = cur;
      if (cur !== "es" && typeof window.renderTbbZeroScrollStage === "function") {
        const subKey = `substep_${Number(window.tbbState?.step || 0)}_${Number(window.tbbState?.subStep || 1)}`;
        if (window.tbbState && typeof window.getNextNonRepetitiveAuraMessage === "function") {
          const msg = window.getNextNonRepetitiveAuraMessage(subKey);
          window.tbbState.auraCurrentMessage = msg;
          if (typeof window.updateAuraTopPresenceDOM === "function") {
            window.updateAuraTopPresenceDOM(msg);
          }
        }
        window.renderTbbZeroScrollStage();
      } else {
        window.tbbApplyCurrentLanguageToDOM();
      }
    };
    applyInitialLang();
    setTimeout(applyInitialLang, 130);
    setTimeout(applyInitialLang, 350);
  }

  // Instalar hooks sincrónicamente de inmediato para que ninguna llamada temprana use la voz del navegador
  installMultilingualAndGeminiHooks();

  window.addEventListener("message", function (ev) {
    const d = ev && ev.data;
    if (d && typeof d === "object" && (d.type === "TBB_SET_LANGUAGE" || d.type === "TBB_SYNC_LANG") && d.lang) {
      if (typeof window.tbbSetLanguage === "function") {
        window.tbbSetLanguage(String(d.lang).toLowerCase(), true);
      }
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => bootMultilingualAndGeminiVoice());
  } else {
    bootMultilingualAndGeminiVoice();
  }
})();


// === [#0305] INCREMENTAL 5-SECOND VOICE INTERVIEW CHECKPOINT AUTOSAVE ===
window.TBB_VOICE_SESSION_AUTOSAVE = {
  STORAGE_KEY: "tbb_v82_voice_interview_checkpoint",
  saveCheckpoint: function(stateObj) {
    try {
      const payload = {
        savedAt: new Date().toISOString(),
        lang: localStorage.getItem("tbb_app_lang") || "es",
        state: stateObj || window.tbbCurrentBrandState || {}
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
      return true;
    } catch (e) {
      return false;
    }
  },
  restoreCheckpoint: function() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
};
if (typeof window !== "undefined") {
  setInterval(function() {
    if (window.tbbCurrentBrandState && Object.keys(window.tbbCurrentBrandState).length > 0) {
      window.TBB_VOICE_SESSION_AUTOSAVE.saveCheckpoint(window.tbbCurrentBrandState);
    }
  }, 5000);
}
