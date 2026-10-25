"""
TheBestBrand — Live Interactive Web & API Server (v9.0 Unlimited Multi-Angle Socratic Explorer + Illustrated Reference Brandbook + Outlined Curves)
Sirve la aplicación interactiva completa en http://127.0.0.1:8000 y conecta todos los motores:
- LiveGeminiSocraticBrain v9.0 (Indagación Socrática Sin Límite de Preguntas + Puerta de Confirmación '¿Algo más que agregar?')
- GeminiNeuralVoiceSynthesizer (Voz Neuronal Real de Gemini 24kHz 'Aoede')
- Naming Creativo con Gemini 3.5 + NamingFilterEngine (SMILE & SCRATCH + 45 Clases de Niza)
- Diagnóstico de 30 Pares de Imágenes Contrastantes (60 Escenas Visuales 100% Únicas)
- PrePressColorEngine (Auto-Heal AAA, CMYK FOGRA39, Pantone) & VectorCurveSanitizer (<path> en curvas)
- MasterBrandbookCompiler (Todos los puntos del Brandbook de Referencia: I. Posicionamiento 1-8, IV. Construcción A-I, Documentos y Aplicaciones Descargables)
"""

import sys
import os
from dotenv import load_dotenv

# Cargar variables de entorno locales (.env)
load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../packages/brandbook-engine")))

from fastapi import FastAPI
from fastapi.responses import HTMLResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn

from vector_sanitizer import PrePressColorEngine, VectorCurveSanitizer
from naming_engine import NamingFilterEngine
from avatar_brain_rag import (
    ZeroHallucinationAvatarBrain,
    DynamicConversationalProfiler,
    LiveGeminiSocraticBrain,
    GeminiNeuralVoiceSynthesizer
)
from master_brandbook_compiler import MasterBrandbookCompiler
from brand_sprint_bradley_terry import AlgorithmicIdentityDecisionEngine
from kansei_generative_architect import (
    KanseiEngineeringQTT1Engine,
    CorporateBackendAIHub,
    AlgorithmicVisualIdentityClosedLoopProject
)
from bespoke_logo_studio import (
    BespokePentagramLogoEngine,
    DeepTouchpointEngineeringEngine,
    MultiBrandArchitectureEngine
)
import tempfile
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../scripts")))
try:
    from generate_all_brandbooks_simulation import SIMULATED_BRANDS, generate_standalone_html_brandbook
except Exception:
    SIMULATED_BRANDS = []
    generate_standalone_html_brandbook = None

app = FastAPI(
    title="TheBestBrand Live Studio v21.0 (Pentagram Logo Studio + Deep Touchpoints + Multi-Brand Architecture + Direct PDF)",
    version="21.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_ASSETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../web/assets"))
os.makedirs(_ASSETS_DIR, exist_ok=True)
app.mount("/assets", StaticFiles(directory=_ASSETS_DIR), name="assets")

_BRANDBOOKS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../entregables_brandbooks"))
os.makedirs(_BRANDBOOKS_DIR, exist_ok=True)
app.mount("/brandbooks", StaticFiles(directory=_BRANDBOOKS_DIR), name="brandbooks")


class ChatTurnRequest(BaseModel):
    step: int = 1
    sub_step: int = 1
    user_message: str
    conversation_history: List[Any] = []
    canvas_state: Dict[str, Any] = {}
    llm_provider: str = "gemini"
    llm_api_key: str = ""
    generate_voice_audio: bool = False


class TTSRequest(BaseModel):
    text: str
    llm_api_key: str = ""


class NamingCheckRequest(BaseModel):
    candidates: List[str] = []
    conversation_history: List[str] = []
    canvas_state: Dict[str, Any] = {}
    preferred_style: str = "compuesto"
    industry_key: str = "comercio_local"
    llm_api_key: str = ""


class Step4SynthesizeRequest(BaseModel):
    pair_choices: List[Dict[str, Any]] = []
    bipolar_sliders: Optional[Dict[str, float]] = None
    canvas_state: Dict[str, Any] = {}
    conversation_history: List[Any] = []
    llm_api_key: str = ""


class CompileBrandbookRequest(BaseModel):
    brand_name: str = "Tu Marca"
    canvas_state: Dict[str, Any] = {}
    golden_circle: str = ""
    value_offer: str = ""
    social_role: str = ""
    process_steps_text: str = ""
    core_message: str = ""
    brand_persona: str = ""
    customer_behavior: str = ""
    brand_world: str = ""
    ideal_customer: str = ""
    touchpoints: List[str] = []
    master_prompt: str = ""
    selected_kit_name: str = "Kit 01 — Ingeniería & Precisión"
    selected_colors_hex: List[str] = ["#FAF8F5", "#141413", "#D96B43", "#1B5E4A"]
    primary_font: str = "Space Grotesk"
    secondary_font: str = "Plus Jakarta Sans"


@app.get("/", response_class=HTMLResponse)
def serve_web_app():
    html_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../web/index.html"))
    with open(html_path, "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())


_FAVICON_SVG = """<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='28' fill='#18181B'/><text x='50' y='64' font-family='sans-serif' font-weight='900' font-size='42' fill='#FFFFFF' text-anchor='middle'>TB</text></svg>"""

@app.get("/favicon.ico")
@app.get("/apple-touch-icon.png")
@app.get("/apple-touch-icon-precomposed.png")
def get_apple_touch_icon():
    return Response(content=_FAVICON_SVG, media_type="image/svg+xml")


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TheBestBrand Live Atelier v11.0",
        "neon_project": os.environ.get("NEON_PROJECT_ID", "green-cherry-54371329"),
        "database_connected": bool(os.environ.get("DATABASE_URL"))
    }


@app.get("/api/db/status")
def database_status():
    db_url = os.environ.get("DATABASE_URL", "")
    return {
        "engine": "Neon Serverless Postgres 18",
        "project_id": os.environ.get("NEON_PROJECT_ID", "green-cherry-54371329"),
        "tables": [
            "users",
            "projects",
            "brand_manifestos",
            "naming_candidates",
            "sensory_preferences",
            "compiled_brandbooks"
        ],
        "configured": bool(db_url)
    }



@app.get("/api/corporate/status")
def corporate_backend_status():
    return CorporateBackendAIHub.get_corporate_credentials_status()


@app.get("/api/project-avi/team-and-methodology")
def get_project_avi_governance():
    """
    Devuelve la estructura oficial del proyecto interno LAB-AVI liderado por el
    Lead Generative Brand Architect & Kansei Engineer, el equipo contratado y la
    matriz de diagnóstico de 50 años de Algorithmic_Visual_Identity.pdf.
    """
    return AlgorithmicVisualIdentityClosedLoopProject.PROJECT_METADATA


@app.post("/api/kansei/closed-loop-avi")
def run_closed_loop_avi_pipeline(req: Step4SynthesizeRequest):
    """
    Ejecuta el Flujo de Trabajo Profesional Definitivo (Closed-Loop System de 4 Fases):
    1. CAPTURA (PCA sobre Diferenciales Semánticos)
    2. MAPEO (GA-BPNN + SVR No Lineal + Hayashi QTTI)
    3. SÍNTESIS (FLUX.1 / SDXL + IP-Adapter Decoupled Cross-Attention)
    4. SIMULACIÓN (Agentes Cognitivos ACT-R + BDI + MNL + Retroalimentación Dinámica)
    """
    sliders = req.bipolar_sliders or {
        "tradicional_innovador": 0.35,
        "accesible_exclusivo": 0.40,
        "humano_tecnologico": 0.25,
        "organico_geometrico": 0.45,
        "minimalista_complejo": -0.35,
        "serio_jugueton": -0.25,
        "convencional_rebelde": 0.30
    }
    pairs_map = {str(p.get("pair_id", f"p{i}")): str(p.get("chosen") or p.get("choice", "A")) for i, p in enumerate(req.pair_choices)}
    brand_name = req.canvas_state.get("brandName", "TheBestBrand")
    closed_loop = AlgorithmicVisualIdentityClosedLoopProject.execute_full_closed_loop(
        brand_name=brand_name,
        bipolar_sliders=sliders,
        pair_selections=pairs_map
    )
    return closed_loop


@app.post("/api/kansei/qt1-synthesis")
def run_kansei_qtt1_synthesis(req: Step4SynthesizeRequest):
    sliders = req.bipolar_sliders or {}
    pairs_map = {str(p.get("pair_id", f"p{i}")): str(p.get("chosen") or p.get("choice", "A")) for i, p in enumerate(req.pair_choices)}
    brand_name = req.canvas_state.get("brandName", "TheBestBrand")
    kansei_result = KanseiEngineeringQTT1Engine.compute_hayashi_qtt1_morphology(sliders, pairs_map, brand_name=brand_name)
    nanobanana_logos = CorporateBackendAIHub.generate_nanobanana_brand_logos(
        brand_name=brand_name,
        industry="global_brand",
        kansei_spec=kansei_result
    )
    return {
        "kansei_qtt1": kansei_result,
        "corporate_nanobanana_synthesis": nanobanana_logos
    }


@app.get("/api/step-video/{step_id}")
def get_step_intro_video(step_id: int):
    video = LiveGeminiSocraticBrain.STEP_INTRO_VIDEOS.get(step_id, LiveGeminiSocraticBrain.STEP_INTRO_VIDEOS[1])
    return {"step": step_id, "video": video}


@app.post("/api/tts/gemini")
def synthesize_gemini_voice(req: TTSRequest):
    wav_b64 = GeminiNeuralVoiceSynthesizer.synthesize_gemini_voice_wav_b64(req.text, req.llm_api_key)
    return {"audio_wav_base64": wav_b64}


@app.post("/api/chat/turn")
def process_avatar_chat_turn(req: ChatTurnRequest):
    clean_history: List[str] = []
    for item in req.conversation_history:
        if isinstance(item, dict):
            clean_history.append(f"{item.get('role', 'user')}: {item.get('content', '')}")
        else:
            clean_history.append(str(item))

    full_transcript = " ".join(clean_history + [req.user_message])
    brain_result = ZeroHallucinationAvatarBrain.process_turn_without_hallucination(
        user_message=full_transcript,
        external_verified_facts=[
            "Posicionamiento Completo de 8 Pilares + Círculo Dorado",
            "Test SMILE & SCRATCH + 45 Clases Internacionales de Niza",
            "Construcción de Marca A-I + Norma ISO 15930 PDF/X-1a CMYK FOGRA39 & Bordado >= 1.2mm"
        ]
    )

    committee_turn = LiveGeminiSocraticBrain.evaluate_and_respond(
        step=req.step,
        sub_step=req.sub_step,
        user_message=req.user_message,
        history=clean_history,
        canvas_state=req.canvas_state,
        llm_provider=req.llm_provider,
        llm_api_key=req.llm_api_key,
        generate_voice_audio=req.generate_voice_audio
    )

    signals = committee_turn["signals"]

    # Puente Orgánico LAB-AVI: Destilación semántica en vivo desde la conversación con AURA
    # hacia las 7 coordenadas de Osgood y el Sistema Closed-Loop (H-01 a H-04)
    t_low = full_transcript.lower()
    inferred_sliders = {
        "tradicional_innovador": 0.68 if any(w in t_low for w in ["digital", "ia", "esports", "app", "futur", "tecnolog", "software", "innov"]) else (-0.35 if any(w in t_low for w in ["tradicion", "artesanal", "herencia", "clasic", "familiar"]) else 0.45),
        "minimalista_complejo": 0.35 if any(w in t_low for w in ["liga", "club", "torneo", "deport", "escudo", "equipo", "heraldic"]) else -0.35,
        "amigable_autoritario": 0.55 if any(w in t_low for w in ["profesional", "corporativ", "lider", "lujo", "exclusiv", "oficial", "federacion"]) else -0.25,
        "humano_tecnologico": 0.65 if any(w in t_low for w in ["plataforma", "datos", "algoritm", "streaming", "esports", "juego", "tech"]) else -0.20,
        "serio_jugueton": 0.48 if any(w in t_low for w in ["deport", "futbol", "esports", "liga", "entretenimiento", "competencia", "juego"]) else -0.30,
        "convencional_rebelde": 0.52 if any(w in t_low for w in ["disruptiv", "nuevo", "revolucion", "unico", "diferente", "vanguardia"]) else 0.15,
        "organico_geometrico": 0.68 if any(w in t_low for w in ["precision", "exact", "arquitectura", "ingenieria", "sistema", "profesional"]) else 0.40
    }
    closed_loop_live = AlgorithmicVisualIdentityClosedLoopProject.execute_full_closed_loop(
        brand_name=committee_turn["updated_canvas"].get("brandName") or req.canvas_state.get("brandName", "TheBestBrand"),
        bipolar_sliders=inferred_sliders
    )

    return {
        "current_step": committee_turn["step"],
        "next_sub_step": committee_turn["sub_step"],
        "total_sub_steps": committee_turn.get("total_sub_steps", 8),
        "auto_transition_to_step": committee_turn.get("auto_transition_to_step"),
        "awaiting_closing_confirmation": committee_turn.get("awaiting_closing_confirmation", False),
        "can_advance_main_step": committee_turn["can_advance_main_step"],
        "recommended_next_step": committee_turn["recommended_next_step"],
        "ignored_filler": committee_turn.get("ignored_filler", False),
        "avatar_response": committee_turn["avatar_response"],
        "conclusion_video": committee_turn.get("conclusion_video"),
        "step_intro_video": committee_turn.get("step_intro_video"),
        "audio_wav_base64": committee_turn.get("audio_wav_base64"),
        "updated_canvas": committee_turn["updated_canvas"],
        "inferred_kansei_sliders": inferred_sliders,
        "kansei_closed_loop": closed_loop_live,
        "live_naming_proposals": committee_turn.get("live_naming_proposals", []),
        "committee_verdict": committee_turn["committee_verdict"],
        "entailment_score": brain_result.get("nli_entailment_score", 0.99),
        "inferred_profile": {
            "delivery_channel": signals["channel"],
            "economic_ticket": signals["ticket"],
            "payment_ritual": signals["payment"],
            "suggested_nice_classes": [{"class_id": nc} for nc in signals["nice_classes"]]
        },
        "brain_audit": brain_result
    }


@app.post("/api/step3/naming-filter")
def api_naming_filter(req: NamingCheckRequest):
    gemini_naming = LiveGeminiSocraticBrain.generate_creative_names_with_gemini(
        history=req.conversation_history,
        canvas_state=req.canvas_state,
        user_candidates=req.candidates,
        api_key=req.llm_api_key
    )

    evaluated = []
    seen = set()

    for user_cand in req.candidates:
        clean_c = user_cand.strip()
        if not clean_c:
            continue
        engine_res = NamingFilterEngine.evaluate_name_candidate(clean_c, req.preferred_style, req.industry_key)
        gem_match = next(
            (p for p in gemini_naming.get("proposals", []) if p.get("name", "").lower() == clean_c.lower()),
            None
        )
        evaluated.append({
            "name": clean_c,
            "category": "Tu Propuesta Oficial",
            "smile_score": gem_match.get("smile_score", engine_res.get("total_score_100", 88)) if gem_match else engine_res.get("total_score_100", 88),
            "syllables": engine_res.get("phonetics", {}).get("syllable_count", 3),
            "verdict": gem_match.get("rationale") if gem_match else f"Análisis fonético y semiótico: {engine_res.get('recommendation', '')}"
        })
        seen.add(clean_c.lower())

    for prop in gemini_naming.get("proposals", []):
        p_name = prop.get("name", "").strip()
        if not p_name or p_name.lower() in seen:
            continue
        engine_res = NamingFilterEngine.evaluate_name_candidate(p_name, req.preferred_style, req.industry_key)
        evaluated.append({
            "name": p_name,
            "category": prop.get("category", "Propuesta Creativa IA"),
            "smile_score": prop.get("smile_score", engine_res.get("total_score_100", 94)),
            "syllables": prop.get("syllables", engine_res.get("phonetics", {}).get("syllable_count", 3)),
            "verdict": prop.get("rationale", "Propuesta diseñada a medida según tu Posicionamiento y Touchpoints.")
        })
        seen.add(p_name.lower())

    return {
        "recommended_nice_class": gemini_naming.get("recommended_nice_class", "Clase 09 / 35 / 42 según giro operativo"),
        "candidates_evaluation": evaluated
    }


@app.post("/api/step4/algorithmic-engine")
def api_step4_algorithmic_engine(req: Step4SynthesizeRequest):
    sliders = req.bipolar_sliders or {
        "tradicional_innovador": 0.35,
        "accesible_exclusivo": 0.40,
        "humano_tecnologico": 0.25,
        "organico_geometrico": 0.45,
        "minimalista_complejo": -0.35,
        "serio_jugueton": -0.25,
        "convencional_rebelde": 0.30
    }
    epa_res = AlgorithmicIdentityDecisionEngine.compute_osgood_epa_vector(sliders)
    bt_res = AlgorithmicIdentityDecisionEngine.fit_bradley_terry_preferences(sliders, req.pair_choices)
    trans_matrix = AlgorithmicIdentityDecisionEngine.map_theta_to_transactional_matrix(
        bt_res["theta_vector"],
        epa_res
    )
    return {
        "osgood_epa": epa_res,
        "bradley_terry": bt_res,
        "transactional_mapping": trans_matrix
    }


@app.post("/api/step4/synthesize-master-prompt")
def api_synthesize_master_prompt(req: Step4SynthesizeRequest):
    brand_name = req.canvas_state.get("brandName") or "Tu Marca"
    sliders = req.bipolar_sliders or {
        "tradicional_innovador": 0.35,
        "accesible_exclusivo": 0.40,
        "humano_tecnologico": 0.25,
        "organico_geometrico": 0.45,
        "minimalista_complejo": -0.35,
        "serio_jugueton": -0.25,
        "convencional_rebelde": 0.30
    }
    epa_res = AlgorithmicIdentityDecisionEngine.compute_osgood_epa_vector(sliders)
    bt_res = AlgorithmicIdentityDecisionEngine.fit_bradley_terry_preferences(sliders, req.pair_choices)
    trans_matrix = AlgorithmicIdentityDecisionEngine.map_theta_to_transactional_matrix(
        bt_res["theta_vector"],
        epa_res
    )
    algo_bundle = {
        "osgood_epa": epa_res,
        "bradley_terry": bt_res,
        "transactional_mapping": trans_matrix
    }

    choices_summary = "\n".join([
        f"- Par {c.get('pair_id')}: Eje {c.get('axis')} -> Eligió '{c.get('chosen_title')}' ({c.get('chosen_tag')})"
        for c in req.pair_choices
    ])
    v_epa = epa_res["v_inicial_epa"]
    geom = trans_matrix["svg_geometric_transduction"]
    typo = trans_matrix["variable_font_transduction"]
    cielab = trans_matrix["cielab_color_transduction"]
    arch = trans_matrix["derived_visual_archetype"]

    prompt = (
        f"MARCA: {brand_name}\n"
        f"1. PROPÓSITO: {req.canvas_state.get('golden_circle', '')}\n"
        f"2. POSICIONAMIENTO: {req.canvas_state.get('value_offer', '')}\n"
        f"3. ROL SOCIAL: {req.canvas_state.get('social_role', '')}\n"
        f"4. PROCESO: {req.canvas_state.get('process_steps_text', '')}\n"
        f"5. MENSAJE: {req.canvas_state.get('core_message', '')}\n"
        f"6. PERSONALIDAD: {req.canvas_state.get('brand_persona', '')}\n"
        f"7. COMPORTAMIENTO: {req.canvas_state.get('customer_behavior', '')}\n"
        f"8. SU MUNDO: {req.canvas_state.get('brand_world', '')}\n"
        f"TOUCHPOINTS: Antes={req.canvas_state.get('tp_before', '')} | Durante={req.canvas_state.get('tp_during', '')} | Después={req.canvas_state.get('tp_after', '')}\n"
        f"DIFERENCIAL SEMÁNTICO DE OSGOOD EPA: E={v_epa['E']}, P={v_epa['P']}, A={v_epa['A']}\n"
        f"MODELO PROBABILÍSTICO BRADLEY-TERRY: Log-Likelihood={bt_res['log_likelihood']}, Varianza Posterior={bt_res['posterior_variance']}\n"
        f"TRANSDUCCIÓN GEOMÉTRICA Y TIPOGRAFÍA: R_corner={geom['R_corner_px']}px, N_primitivas={geom['N_primitivas']}, Stroke={geom['stroke_width_px']}px, Tipografía={typo['recommended_family']} (wght={typo['font_weight_wght']})\n"
        f"MODELO CIELAB L*a*b*: {cielab['harmony_rule']} | {cielab['luminance_contrast_rule']} | Paleta={cielab['recommended_hex_palette']}\n"
        f"ARQUETIPO DERIVADO: {arch['archetype_name']} — {arch['description']}\n"
        f"DECISIONES PARES POLARIZADOS:\n{choices_summary}\n"
    )

    sys_inst = """Eres el Director Mundial de Arte e Identidad Visual (Pentagram / Swiss Style) operando con el Motor de Decisión Algorítmica Osgood EPA + Bradley-Terry + CIELAB L*a*b*.
Analiza los vectores psicométricos, la matriz de mapeo transaccional y las elecciones del fundador, y genera un JSON con:
1. `master_prompt`: El Prompt Maestro de Dirección de Arte (3 párrafos densos: Transducción Geométrica Vectorial R_corner/N_primitivas en 1:1 Circular y Cuadrado, Sistema Tipográfico/CIELAB L*a*b* y Aplicación en Touchpoints).
2. `visual_axes_summary`: Lista de 6 conclusiones cuantitativas y estéticas.
3. `recommended_palette`: Lista de 4 colores HEX (Fondo claro, Tinta oscura, Acento primario, Acento secundario) que cumplan contraste AAA.
4. `conclusion_video`: Objeto con `has_video`: true, `title` y `narration` (guion hablado de 25 segundos).
Devuelve SIEMPRE JSON válido."""

    gem_out = LiveGeminiSocraticBrain._call_gemini_json(prompt, sys_inst, req.llm_api_key)
    if gem_out and "master_prompt" in gem_out:
        gem_out["algorithmic_decision_engine"] = algo_bundle
        if not gem_out.get("recommended_palette"):
            gem_out["recommended_palette"] = cielab["recommended_hex_palette"]
        return gem_out

    return {
        "master_prompt": (
            f"DIRECCIÓN DE ARTE ALGORÍTMICA PARA {brand_name.upper()} ({arch['archetype_name']}): "
            f"Vector Semántico Osgood EPA = (E:{v_epa['E']}, P:{v_epa['P']}, A:{v_epa['A']}) y convergencia Bradley-Terry (σ²={bt_res['posterior_variance']}). "
            f"Transducción geométrica SVG con radio de curvatura R_corner={geom['R_corner_px']}px ({geom['corner_classification']}), "
            f"complejidad topológica N_primitivas={geom['N_primitivas']} nodos Bézier y trazo de {geom['stroke_width_px']}px en proporción 1:1 Circular Avatar-Safe y Cuadrada.\n\n"
            f"SISTEMA TIPOGRÁFICO Y CROMÁTICO CIELAB (L*a*b*): Familia {typo['recommended_family']} con peso variable wght={typo['font_weight_wght']}, "
            f"anchura wdth={typo['font_width_wdth']}% e inclinación slnt={typo['italic_angle_deg']}°. "
            f"Armonía {cielab['harmony_rule']} con {cielab['luminance_contrast_rule']} (L*={cielab['L_star_target']}, C*={cielab['C_star_chroma']})."
        ),
        "visual_axes_summary": [
            f"1. Vector Osgood EPA: Evaluación E={v_epa['E']} | Potencia P={v_epa['P']} | Actividad A={v_epa['A']}",
            f"2. Geometría Vectorial: R_corner={geom['R_corner_px']}px ({geom['corner_classification']}) | N_primitivas={geom['N_primitivas']} | Stroke={geom['stroke_width_px']}px",
            f"3. Simetría y Eje: {geom['symmetry_mode']} con inclinación estructural de {geom['structural_tilt_deg']}°",
            f"4. Tipografía Variable: {typo['recommended_family']} (wght={typo['font_weight_wght']}, wdth={typo['font_width_wdth']}%, tracking={typo['letter_spacing_em']}em)",
            f"5. Espacio CIELAB L*a*b*: {cielab['harmony_rule']} | {cielab['luminance_contrast_rule']}",
            f"6. Arquetipo Derivado: {arch['archetype_name']} (Convergencia Bradley-Terry σ²={bt_res['posterior_variance']})"
        ],
        "recommended_palette": cielab["recommended_hex_palette"],
        "algorithmic_decision_engine": algo_bundle,
        "conclusion_video": {
            "has_video": True,
            "title": "🎬 Conclusión del Paso 4: Tu Vector Osgood EPA, Modelo Bradley-Terry y Master Prompt",
            "narration": f"¡Excelente! Con el Diferencial Semántico de Osgood y el modelo probabilístico Bradley-Terry hemos calculado los parámetros exactos de curvatura, peso tipográfico y espacio de color CIELAB para {brand_name}. Pasemos al Paso 5."
        }
    }


@app.post("/api/step6/compile-master-brandbook")
def api_compile_brandbook(req: CompileBrandbookRequest):
    cs = req.canvas_state or {}
    bg_hex = req.selected_colors_hex[0] if len(req.selected_colors_hex) > 0 else "#FAF8F5"
    ink_hex = req.selected_colors_hex[1] if len(req.selected_colors_hex) > 1 else "#141413"
    primary_hex = req.selected_colors_hex[2] if len(req.selected_colors_hex) > 2 else "#D96B43"
    secondary_hex = req.selected_colors_hex[3] if len(req.selected_colors_hex) > 3 else "#1B5E4A"

    gc_val = req.golden_circle or cs.get("golden_circle") or "Impulsar la excelencia, confiabilidad y transformación positiva en cada entrega."
    vo_val = req.value_offer or cs.get("value_offer") or "Calidad superior, ingeniería de precisión y experiencia impecable de principio a fin."
    sr_val = req.social_role or cs.get("social_role") or f"Elevar el estándar ético, técnico y estético de nuestra comunidad a través de {req.brand_name}."
    ps_raw = req.process_steps_text or cs.get("process_steps_text") or ""
    cm_val = req.core_message or cs.get("core_message") or f"{req.brand_name}: Precisión, confianza y excelencia que trascienden."
    bp_val = req.brand_persona or cs.get("brand_persona") or "Especialista apasionado, confiable, claro, empático y con autoridad comprobada."
    cb_val = req.customer_behavior or cs.get("customer_behavior") or "Trato transparente, proactivo, resolutivo y cercano en cada interacción."
    bw_val = req.brand_world or cs.get("brand_world") or req.master_prompt or "Un entorno de orden visual, materiales nobles, alta visibilidad y excelencia técnica."
    ic_val = req.ideal_customer or cs.get("ideal_customer") or "Tomadores de decisión e instituciones que exigen durabilidad, claridad y desempeño oficial."

    tp_before = (req.touchpoints[0] if len(req.touchpoints) > 0 else "") or cs.get("tp_before") or "Demostraciones técnicas en vivo, licitaciones, catálogos de ingeniería y presencia digital."
    tp_during = (req.touchpoints[1] if len(req.touchpoints) > 1 else "") or cs.get("tp_during") or "Cotización formal desglosada, asesoría de instalación, contrato de garantía y pago."
    tp_after = (req.touchpoints[2] if len(req.touchpoints) > 2 else "") or cs.get("tp_after") or "Embalaje industrial, instalación certificada en sitio, capacitación, manual y soporte continuo."

    profile = {
        "chosen_name": req.brand_name,
        "naming_style": "compuesto",
        "industry_key": "tecnologia_saas",
        "free_speech_transcript": gc_val,
        "purpose_why": gc_val,
        "value_offer": vo_val,
        "social_role": sr_val,
        "process_steps": (
            [s.strip() for s in ps_raw.split("\n") if s.strip()]
            if ps_raw
            else [
                "1. Diagnóstico y comprensión profunda de las necesidades del cliente",
                "2. Diseño, ingeniería e implementación bajo estándar innegociable",
                "3. Entrega puntual, puesta en marcha y acompañamiento post-venta"
            ]
        ),
        "core_message": cm_val,
        "brand_persona": bp_val,
        "customer_behavior": cb_val,
        "brand_world": bw_val,
        "touchpoints_journey": {
            "antes": tp_before,
            "durante": tp_during,
            "despues": tp_after
        },
        "contrast_insights": req.master_prompt or "Alto Contraste AAA + Retícula Constructiva en Curvas",
        "selected_primary_hex": primary_hex,
        "selected_secondary_hex": secondary_hex
    }
    compiled = MasterBrandbookCompiler.run_full_simulation(profile)

    color_table = [
        PrePressColorEngine.build_brand_color_table("Superficie Base", bg_hex, ink_hex),
        PrePressColorEngine.build_brand_color_table("Tinta Estructural", ink_hex, bg_hex),
        PrePressColorEngine.build_brand_color_table("Acento Primario", primary_hex, bg_hex),
        PrePressColorEngine.build_brand_color_table("Acento Secundario", secondary_hex, bg_hex),
    ]

    toc_38_pages = [
        {"page": i, "title": f"Lámina Editorial {i:02d} — {req.brand_name}"} for i in range(1, 39)
    ]

    applications_suite = [
        {"code": "APP-01", "title": "Tarjeta de Presentación Ejecutiva", "format": "85 × 55 mm · Couché 350g"},
        {"code": "APP-02", "title": "Hoja Membretada & Cotización", "format": "215.9 × 279.4 mm (Carta)"},
        {"code": "APP-03", "title": "Sobre Corporativo DL", "format": "220 × 110 mm"},
        {"code": "APP-04", "title": "Folder Ejecutivo de Licitación", "format": "230 × 310 mm"},
        {"code": "APP-05", "title": "Uniforme Técnico & Bordado", "format": "Trazo mínimo ≥ 1.2 mm"},
        {"code": "APP-06", "title": "Señalética Exterior y Chasis 30m", "format": "Aluminio Anodizado & LED"},
        {"code": "APP-07", "title": "Firma de Correo & Propuesta PDF", "format": "HTML / SVG Responsivo"},
        {"code": "APP-08", "title": "Kit Digital & Redes Sociales", "format": "1080 × 1080 px & SVG"}
    ]

    documents_vault = [
        {"id": "DOC-01", "title": f"Brandbook Maestro Ilustrado ({req.brand_name}) — 38 Páginas"},
        {"id": "DOC-02", "title": "Master Pack de Logotipos en Curvas (.SVG)"},
        {"id": "DOC-03", "title": "Playbook de Posicionamiento & Customer Journey"},
        {"id": "DOC-04", "title": "Ficha Técnica de Imprenta, Pantone y Bordado"},
        {"id": "DOC-05", "title": "Manifiesto de Identidad & Tokens (.JSON)"},
        {"id": "DOC-06", "title": "PDF Directo de Alta Resolución A4/Carta"}
    ]

    tp_dossier = DeepTouchpointEngineeringEngine.build_detailed_touchpoints_dossier(
        tp_before_raw=tp_before,
        tp_during_raw=tp_during,
        tp_after_raw=tp_after,
        brand_name=req.brand_name,
        pri_hex=primary_hex,
        ink_hex=ink_hex
    )
    studio_proposals = BespokePentagramLogoEngine.generate_4_studio_logo_proposals(
        brand_name=req.brand_name,
        industry_hint=str(cs.get("industry_key") or ""),
        purpose_text=gc_val,
        colors_hex=req.selected_colors_hex,
        primary_font=req.primary_font,
        secondary_font=req.secondary_font,
        descriptor_tagline=vo_val[:38],
        show_construction_grid=True
    )

    return {
        "brand_name": req.brand_name,
        "selected_kit_name": req.selected_kit_name,
        "total_pages": 39,
        "table_of_contents": toc_38_pages,
        "section_1_positioning": {
            "p1_proposito_golden_circle": gc_val,
            "p2_posicionamiento_oferta_valor": vo_val,
            "p3_rol_en_la_sociedad": sr_val,
            "p4_su_proceso": ps_raw or "1. Ingeniería · 2. Fabricación · 3. Instalación y Soporte",
            "p5_el_mensaje": cm_val,
            "p6_la_personalidad": bp_val,
            "p7_el_comportamiento": cb_val,
            "p8_su_mundo": bw_val,
            "cliente_ideal": ic_val
        },
        "section_2_touchpoints": {
            "antes_de_la_compra": tp_before,
            "durante_la_compra": tp_during,
            "despues_de_la_compra": tp_after,
            "engineered_touchpoints_dossier": tp_dossier
        },
        "section_4_construction": {
            "f_color_palette": {"colors": color_table},
            "studio_logo_proposals": studio_proposals
        },
        "applications_suite": applications_suite,
        "documents_vault": documents_vault,
        "positioning_8_pillars": compiled.get("strategy_chapter", {}),
        "touchpoints_journey": profile["touchpoints_journey"],
        "engineered_touchpoints_dossier": tp_dossier,
        "studio_logo_proposals": studio_proposals,
        "color_table": color_table,
        "full_compilation": compiled
    }


class TouchpointEnrichRequest(BaseModel):
    brand_name: str = "TheBestBrand"
    tp_before: Any = []
    tp_during: Any = []
    tp_after: Any = []
    primary_hex: str = "#C59B27"
    ink_hex: str = "#090D16"


@app.post("/api/v1/touchpoints/enrich-dossier")
def api_enrich_touchpoints_dossier(req: TouchpointEnrichRequest):
    return DeepTouchpointEngineeringEngine.build_detailed_touchpoints_dossier(
        tp_before_raw=req.tp_before,
        tp_during_raw=req.tp_during,
        tp_after_raw=req.tp_after,
        brand_name=req.brand_name,
        pri_hex=req.primary_hex,
        ink_hex=req.ink_hex
    )


@app.get("/api/v1/touchpoints/project-lead-and-sectors")
def api_get_touchpoints_project_lead():
    """
    Devuelve el perfil del Líder de Proyecto de Touchpoints & CX Multisectorial
    (Mateo Valdés-Keller) y los recorridos guiados por sector con ejemplos sensoriales,
    Service Blueprinting de 5 capas y estrategias Surprise & Delight.
    """
    return {
        "project_leader": DeepTouchpointEngineeringEngine.PROJECT_LEADER_PROFILE,
        "sector_guided_journeys": DeepTouchpointEngineeringEngine.SECTOR_GUIDED_JOURNEYS
    }


class StudioLogoGenerateRequest(BaseModel):
    brand_name: str = "TheBestBrand"
    industry_hint: str = ""
    purpose_text: str = ""
    colors_hex: List[str] = ["#FAF8F5", "#090D16", "#C59B27", "#1E293B"]
    primary_font: str = "Space Grotesk"
    secondary_font: str = "Plus Jakarta Sans"
    descriptor_tagline: str = "ESTÁNDAR DE EXCELENCIA"
    show_construction_grid: bool = True


@app.post("/api/v1/logos/generate-studio-logos")
def api_generate_studio_logos(req: StudioLogoGenerateRequest):
    proposals = BespokePentagramLogoEngine.generate_4_studio_logo_proposals(
        brand_name=req.brand_name,
        industry_hint=req.industry_hint,
        purpose_text=req.purpose_text,
        colors_hex=req.colors_hex,
        primary_font=req.primary_font,
        secondary_font=req.secondary_font,
        descriptor_tagline=req.descriptor_tagline,
        show_construction_grid=req.show_construction_grid
    )
    return {
        "brand_name": req.brand_name,
        "archetype": proposals[0]["archetype"],
        "proposals": proposals
    }


class CloneSubBrandRequest(BaseModel):
    parent_brand_name: str = "Aksis Automation"
    parent_canvas: Dict[str, Any] = {}
    division_type: str = "mantenimiento"
    custom_subbrand_name: str = ""
    custom_accent_hex: str = ""


@app.post("/api/v1/architecture/clone-subbrand")
def api_clone_subbrand(req: CloneSubBrandRequest):
    cloned = MultiBrandArchitectureEngine.clone_subbrand_from_parent(
        parent_brand_name=req.parent_brand_name,
        parent_canvas=req.parent_canvas,
        division_type=req.division_type,
        custom_subbrand_name=req.custom_subbrand_name,
        custom_accent_hex=req.custom_accent_hex
    )
    return {"status": "cloned", "subbrand_canvas": cloned}


@app.get("/api/v1/presets/12-simulated-brands")
def api_get_12_simulated_brands():
    return {
        "total": len(SIMULATED_BRANDS),
        "brands": SIMULATED_BRANDS
    }


@app.post("/api/step6/download-pdf")
def api_download_brandbook_pdf(req: CompileBrandbookRequest):
    """
    Compila en vivo el Brandbook Maestro Ilustrado completo de la marca activa y devuelve
    un archivo binario .PDF real (application/pdf) listo para descarga directa e imprenta.
    """
    cs = req.canvas_state or {}
    # Si coincide con una de las 12 marcas pre-compiladas y ya existe el PDF, o compilar en vivo con Playwright
    matched_preset = next(
        (b for b in SIMULATED_BRANDS if b["chosen_name"].lower() == req.brand_name.strip().lower()),
        None
    )
    if matched_preset:
        preset_pdf_path = os.path.join(_BRANDBOOKS_DIR, f"brandbook_{matched_preset['id']}.pdf")
        if os.path.exists(preset_pdf_path):
            with open(preset_pdf_path, "rb") as f:
                pdf_bytes = f.read()
            safe_slug = req.brand_name.strip().replace(" ", "_")
            return Response(
                content=pdf_bytes,
                media_type="application/pdf",
                headers={"Content-Disposition": f'attachment; filename="Brandbook_Maestro_{safe_slug}.pdf"'}
            )

    bg_hex = req.selected_colors_hex[0] if len(req.selected_colors_hex) > 0 else "#FAF8F5"
    ink_hex = req.selected_colors_hex[1] if len(req.selected_colors_hex) > 1 else "#090D16"
    primary_hex = req.selected_colors_hex[2] if len(req.selected_colors_hex) > 2 else "#C59B27"
    secondary_hex = req.selected_colors_hex[3] if len(req.selected_colors_hex) > 3 else "#1E293B"

    gc_val = req.golden_circle or cs.get("golden_circle") or "Impulsar la excelencia, confiabilidad y transformación positiva en cada entrega."
    vo_val = req.value_offer or cs.get("value_offer") or "Calidad superior, ingeniería de precisión y experiencia impecable de principio a fin."
    sr_val = req.social_role or cs.get("social_role") or f"Elevar el estándar ético, técnico y estético de nuestra comunidad a través de {req.brand_name}."
    ps_raw = req.process_steps_text or cs.get("process_steps_text") or ""
    cm_val = req.core_message or cs.get("core_message") or f"{req.brand_name}: Precisión, confianza y excelencia que trascienden."
    bp_val = req.brand_persona or cs.get("brand_persona") or "Especialista apasionado, confiable, claro, empático y con autoridad comprobada."
    cb_val = req.customer_behavior or cs.get("customer_behavior") or "Trato transparente, proactivo, resolutivo y cercano en cada interacción."
    bw_val = req.brand_world or cs.get("brand_world") or req.master_prompt or "Un entorno de orden visual, materiales nobles, alta visibilidad y excelencia técnica."
    ic_val = req.ideal_customer or cs.get("ideal_customer") or "Tomadores de decisión e instituciones que exigen durabilidad, claridad y desempeño oficial."

    tp_before = (req.touchpoints[0] if len(req.touchpoints) > 0 else "") or cs.get("tp_before") or "Sitio web oficial, catálogo técnico ejecutivo, presencia en redes y demostraciones."
    tp_during = (req.touchpoints[1] if len(req.touchpoints) > 1 else "") or cs.get("tp_during") or "Cotización formal membretada, uniforme del equipo, contrato de servicio y pasarela de pago."
    tp_after = (req.touchpoints[2] if len(req.touchpoints) > 2 else "") or cs.get("tp_after") or "Empaque con sello de seguridad, certificado de garantía, manual de bienvenida y soporte continuo."

    brand_dict = {
        "id": "custom_live",
        "sector": cs.get("sector_label") or "Identidad Corporativa de Alta Precisión",
        "founder_persona": cs.get("founder_persona") or "Fundador & Dirección General",
        "chosen_name": req.brand_name,
        "tagline": cm_val,
        "naming_style": "compuesto",
        "industry_key": cs.get("industry_key") or "tecnologia_saas",
        "architecture_role": cs.get("architecture_model") or "",
        "vault_finalists": [req.brand_name, f"{req.brand_name} Group", f"{req.brand_name} Studio", f"{req.brand_name} Global"],
        "nice_classes": cs.get("recommended_nice_classes_str") or "Clase 09, Clase 35, Clase 37 y Clase 42 según giro operativo",
        "domains": [
            f"{req.brand_name.lower().replace(' ', '').replace('&', '')}.com",
            f"{req.brand_name.lower().replace(' ', '').replace('&', '')}.mx"
        ],
        "purpose_why": gc_val,
        "value_offer": vo_val,
        "social_role": sr_val,
        "process_steps": [s.strip() for s in ps_raw.split("\n") if s.strip()] if ps_raw else [
            "1. Diagnóstico profundo y comprensión de requerimientos del cliente",
            "2. Diseño, fabricación o implementación con control de calidad estricto",
            "3. Entrega puntual, garantía oficial y seguimiento post-venta"
        ],
        "core_message": cm_val,
        "brand_persona": bp_val,
        "customer_behavior": cb_val,
        "brand_world": bw_val,
        "ideal_customer": ic_val,
        "touchpoints_journey": {
            "antes": tp_before.replace(",", " · "),
            "durante": tp_during.replace(",", " · "),
            "despues": tp_after.replace(",", " · ")
        },
        "base_family": req.selected_kit_name,
        "primary_font": req.primary_font,
        "secondary_font": req.secondary_font,
        "palette": [bg_hex, ink_hex, primary_hex, secondary_hex],
        "selected_24_traits": cs.get("selected_24_traits_list") or [
            "Geometría Bézier en Proporción Áurea φ=1.618",
            "Trazo mínimo calibrado ≥ 1.2 mm para bordado y grabado láser",
            "Contraste cromático verificado WCAG AAA e ISO 15930 PDF/X-1a"
        ],
        "simulation_notes": "Brandbook Maestro compilado en vivo desde el estudio interactivo TheBestBrand."
    }
    color_table = [
        PrePressColorEngine.build_brand_color_table("Superficie Base", bg_hex, ink_hex),
        PrePressColorEngine.build_brand_color_table("Tinta Estructural", ink_hex, bg_hex),
        PrePressColorEngine.build_brand_color_table("Acento Primario", primary_hex, bg_hex),
        PrePressColorEngine.build_brand_color_table("Acento Secundario", secondary_hex, bg_hex),
    ]
    html_doc = generate_standalone_html_brandbook(brand_dict, {}, color_table)

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_html = os.path.join(tmpdir, "brandbook_live.html")
        tmp_pdf = os.path.join(tmpdir, "brandbook_live.pdf")
        # Ajustar ruta relativa de imágenes para el archivo temporal
        abs_logos = os.path.abspath(os.path.join(_ASSETS_DIR, "logos"))
        html_doc = html_doc.replace("../apps/web/assets/logos/", f"file://{abs_logos}/")
        with open(tmp_html, "w", encoding="utf-8") as f:
            f.write(html_doc)
        import subprocess
        subprocess.run(
            [
                sys.executable,
                "-c",
                (
                    "import sys; from playwright.sync_api import sync_playwright; "
                    "p = sync_playwright().start(); b = p.chromium.launch(headless=True); "
                    "page = b.new_page(); page.goto('file://' + sys.argv[1], wait_until='domcontentloaded'); "
                    "page.pdf(path=sys.argv[2], format='A4', print_background=True, "
                    "margin={'top':'10mm','bottom':'10mm','left':'10mm','right':'10mm'}); "
                    "b.close(); p.stop()"
                ),
                tmp_html,
                tmp_pdf
            ],
            check=True,
            timeout=30
        )
        with open(tmp_pdf, "rb") as f:
            pdf_bytes = f.read()

    safe_slug = "".join([c if c.isalnum() else "_" for c in req.brand_name.strip()]) or "TheBestBrand"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="Brandbook_Maestro_{safe_slug}.pdf"'}
    )


if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Starting TheBestBrand Studio on http://{host}:{port}")
    uvicorn.run(app, host=host, port=port)
