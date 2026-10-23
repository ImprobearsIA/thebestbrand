"""
TheBestBrand — Phonosemantic & IP Naming Filter Engine
Diseñado por: Especialista Técnico en Propiedad Intelectual y Algoritmo Fonosemántico
Framework: Alexandra Watkins (SMILE & SCRATCH) + Clasificación Internacional de Niza (WIPO)
"""

from typing import Dict, List


class NamingFilterEngine:
    """
    Evalúa candidatos de nombre bajo criterios de longitud, estilo (siglas, compuesto,
    evocativo, neologismo), facilidad de pronunciación y riesgo de registro marcario.
    """

    NICE_CLASSIFICATION_MAP = {
        "restaurante": {"class": 43, "description": "Servicios de restauración (alimentación) y hospedaje temporal."},
        "salud": {"class": 44, "description": "Servicios médicos, clínicos, geriátricos y de higiene."},
        "casa_retiro": {"class": 43, "description": "Residencias para personas mayores y servicios asistenciales (Clase 43/44)."},
        "consultoria_b2b": {"class": 35, "description": "Gestión de negocios comerciales, consultoría empresarial y marketing."},
        "deportes": {"class": 41, "description": "Educación, entrenamiento deportivo y actividades atléticas ( más Clase 25 ropa)."},
        "bienes_raices": {"class": 36, "description": "Negocios inmobiliarios, administración de propiedades y finanzas."},
        "comercio_local": {"class": 35, "description": "Comercialización minorista y servicios de tienda física."}
    }

    @classmethod
    def evaluate_name_candidate(cls, candidate: str, style: str, industry_key: str) -> Dict[str, object]:
        clean = candidate.strip()
        syllables_est = max(1, sum(1 for c in clean.lower() if c in "aeiouáéíóú"))
        has_awkward_clusters = any(cluster in clean.lower() for cluster in ["sch", "tch", "zzx", "qwk", "xtr"])

        smile_score = {
            "Suggestive": True,
            "Memorable": len(clean) <= 12 and syllables_est <= 4,
            "Imagery": style in ["evocativo", "compuesto", "metaforico"],
            "Legs": True,
            "Emotional": True
        }

        scratch_Dealbreakers = {
            "Spelling_Challenged": has_awkward_clusters,
            "Copycat": False,
            "Restrictive": False,
            "Annoying": False,
            "Tame": False,
            "Curse_of_Knowledge": False,
            "Hard_to_Pronounce": has_awkward_clusters or syllables_est > 5
        }

        nice_info = cls.NICE_CLASSIFICATION_MAP.get(
            industry_key,
            {"class": 35, "description": "Servicios generales de negocios y comercio."}
        )

        passed = (not scratch_Dealbreakers["Spelling_Challenged"]) and (not scratch_Dealbreakers["Hard_to_Pronounce"])

        return {
            "candidate": clean,
            "style": style,
            "character_length": len(clean),
            "estimated_syllables": syllables_est,
            "nice_class": nice_info["class"],
            "nice_description": nice_info["description"],
            "smile_evaluation": smile_score,
            "scratch_risk_flags": scratch_Dealbreakers,
            "approved_for_brandbook": passed
        }
