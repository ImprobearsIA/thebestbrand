"""
Motor Algorítmico-Cognitivo de Identidad Visual (v11.0)
Implementa la metodología científica completa:
1. Diferencial Semántico de Osgood (Marco Tridimensional EPA: Evaluación, Potencia, Actividad).
2. Metodología 3-Hour Brand Sprint de Google Ventures (7 Deslizadores Bipolares en [-1.0, +1.0]).
3. Modelo Probabilístico de Bradley-Terry para Comparación por Pares:
   P(i > j) = sigma(theta_i - theta_j) = 1 / (1 + exp(-(theta_i - theta_j)))
   con actualización MLE por descenso de gradiente y métrica de varianza sigma^2_theta < epsilon.
4. Matriz de Mapeo Transaccional a Parámetros de Diseño (R_corner, N_primitivas, Variable Fonts,
   letter-spacing, y Coordenadas CIELAB L*a*b* con Croma C* y separación angular Delta_h).
"""

import math
from typing import Dict, Any, List


class AlgorithmicIdentityDecisionEngine:
    # 7 Ejes Bipolares (Osgood + Google Ventures Brand Sprint) en rango [-1.0, +1.0]
    BIPOLAR_AXES_SPEC = [
        {
            "key": "tradicional_innovador",
            "left_pole": "Tradicional (-1.0)",
            "right_pole": "Innovador / Vanguardista (+1.0)",
            "epa_weights": {"E": 0.2, "P": 0.1, "A": 0.8},
            "rule": "Alterna entre Serif Clásicas / escudos simétricos (-1.0) y Sans Geométricas / chaflanes 45° (+1.0)."
        },
        {
            "key": "accesible_exclusivo",
            "left_pole": "Accesible / Cercano (-1.0)",
            "right_pole": "Exclusivo / Élite (+1.0)",
            "epa_weights": {"E": 0.7, "P": 0.5, "A": -0.2},
            "rule": "Controla R_corner (>12px en -1.0 vs <=2px en +1.0), grosor de trazo y margen de espacio negativo."
        },
        {
            "key": "humano_tecnologico",
            "left_pole": "Humano / Artesanal (-1.0)",
            "right_pole": "Tecnológico / Industrial (+1.0)",
            "epa_weights": {"E": 0.3, "P": 0.6, "A": 0.4},
            "rule": "Define curvas B-Spline orgánicas (-1.0) frente a rejillas ortogonales 1:1 y fuentes Monospaced (+1.0)."
        },
        {
            "key": "organico_geometrico",
            "left_pole": "Orgánico / Fluido (-1.0)",
            "right_pole": "Geométrico / Axial (+1.0)",
            "epa_weights": {"E": 0.2, "P": 0.7, "A": 0.3},
            "rule": "Controla la tolerancia de suavizado de nodos Bézier y simetría axial estricta."
        },
        {
            "key": "minimalista_complejo",
            "left_pole": "Minimalista (N <= 3) (-1.0)",
            "right_pole": "Complejo / Emblemático (N >= 8) (+1.0)",
            "epa_weights": {"E": 0.4, "P": 0.6, "A": 0.2},
            "rule": "Limita el número total de primitivas geométricas (N_primitivas <= 3 frente a N_primitivas >= 8)."
        },
        {
            "key": "serio_jugueton",
            "left_pole": "Serio / Institucional (-1.0)",
            "right_pole": "Juguetón / Expresivo (+1.0)",
            "epa_weights": {"E": 0.3, "P": -0.7, "A": 0.6},
            "rule": "Rige la estabilidad ortogonal y sobriedad (-1.0) frente a expresividad y saturación cromática (+1.0)."
        },
        {
            "key": "convencional_rebelde",
            "left_pole": "Convencional / Normativo (-1.0)",
            "right_pole": "Rebelde / Disruptivo (+1.0)",
            "epa_weights": {"E": -0.1, "P": 0.5, "A": 0.9},
            "rule": "Dicta composiciones clásicas centradas (-1.0) frente a tensión angular e inclinación cinética (+1.0)."
        }
    ]

    @staticmethod
    def sigmoid(x: float) -> float:
        x_clamped = max(-20.0, min(20.0, x))
        return 1.0 / (1.0 + math.exp(-x_clamped))

    @classmethod
    def compute_osgood_epa_vector(cls, sliders: Dict[str, float]) -> Dict[str, float]:
        """
        Calcula el vector tridimensional de Osgood v_inicial = (E, P, A)^T en [-1.0, +1.0]
        a partir de los 7 deslizadores bipolares del Brand Sprint.
        """
        e_val = (
            0.35 * sliders.get("accesible_exclusivo", 0.2)
            + 0.25 * (-sliders.get("minimalista_complejo", 0.0))
            + 0.25 * sliders.get("organico_geometrico", 0.4)
            + 0.15 * (-sliders.get("serio_jugueton", -0.5))
        )
        p_val = (
            0.35 * sliders.get("humano_tecnologico", 0.6)
            + 0.30 * (-sliders.get("serio_jugueton", -0.6))
            + 0.20 * sliders.get("organico_geometrico", 0.5)
            + 0.15 * sliders.get("convencional_rebelde", 0.3)
        )
        a_val = (
            0.40 * sliders.get("tradicional_innovador", 0.6)
            + 0.35 * sliders.get("convencional_rebelde", 0.4)
            + 0.25 * sliders.get("serio_jugueton", -0.2)
        )
        e_r = round(max(-1.0, min(1.0, e_val)), 3)
        p_r = round(max(-1.0, min(1.0, p_val)), 3)
        a_r = round(max(-1.0, min(1.0, a_val)), 3)
        return {
            "E_evaluacion": e_r,
            "P_potencia": p_r,
            "A_actividad": a_r,
            "v_inicial_epa": {"E": e_r, "P": p_r, "A": a_r}
        }

    @classmethod
    def fit_bradley_terry_preferences(
        cls,
        sliders: Dict[str, float],
        pair_choices: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Actualiza el vector de utilidades latentes theta mediante el modelo de Bradley-Terry:
        P(i > j) = sigma(theta_i - theta_j)
        L(theta) = sum [ y_ij ln sigma(theta_i - theta_j) + (1 - y_ij) ln(1 - sigma(theta_i - theta_j)) ]
        """
        theta: Dict[str, float] = {
            "tradicional_innovador": float(sliders.get("tradicional_innovador", 0.5)),
            "accesible_exclusivo": float(sliders.get("accesible_exclusivo", 0.3)),
            "humano_tecnologico": float(sliders.get("humano_tecnologico", 0.7)),
            "organico_geometrico": float(sliders.get("organico_geometrico", 0.7)),
            "minimalista_complejo": float(sliders.get("minimalista_complejo", -0.2)),
            "serio_jugueton": float(sliders.get("serio_jugueton", -0.6)),
            "convencional_rebelde": float(sliders.get("convencional_rebelde", 0.4)),
            "temperatura_cromatica": 0.5,
            "contraste_bipolar": 0.7
        }

        lr = 0.14
        log_likelihood = 0.0
        margins: List[float] = []

        for idx, c in enumerate(pair_choices):
            side = c.get("side", "A")
            y_ij = 1.0 if side == "A" else 0.0
            axis_keys = list(theta.keys())
            dim_key = axis_keys[idx % len(axis_keys)]

            # Polo A vs Polo B en la dimensión evaluada
            theta_i = theta[dim_key]
            theta_j = -theta[dim_key]
            prob_a = cls.sigmoid(theta_i - theta_j)
            prob_a_safe = max(1e-6, min(1.0 - 1e-6, prob_a))

            log_likelihood += y_ij * math.log(prob_a_safe) + (1.0 - y_ij) * math.log(1.0 - prob_a_safe)
            grad = (y_ij - prob_a)
            theta[dim_key] = max(-1.0, min(1.0, theta[dim_key] + lr * grad))
            margins.append(abs(theta_i - theta_j))

        n_obs = max(1, len(pair_choices))
        variance_sigma2 = round(0.35 / math.sqrt(n_obs + 4), 4)
        epsilon_threshold = 0.08
        converged = variance_sigma2 < epsilon_threshold

        epa = cls.compute_osgood_epa_vector(theta)
        transactional_params = cls.map_theta_to_transactional_matrix(theta, epa)

        return {
            "theta_vector": {k: round(v, 3) for k, v in theta.items()},
            "osgood_epa_vector": epa,
            "log_likelihood": round(log_likelihood, 3),
            "posterior_variance": variance_sigma2,
            "converged": converged,
            "bradley_terry_metrics": {
                "comparisons_evaluated": len(pair_choices),
                "log_likelihood": round(log_likelihood, 3),
                "mean_pairwise_margin": round(sum(margins) / max(1, len(margins)), 3),
                "posterior_variance_sigma2": variance_sigma2,
                "convergence_epsilon": epsilon_threshold,
                "converged": converged
            },
            "transactional_design_matrix": transactional_params
        }

    @classmethod
    def map_theta_to_transactional_matrix(
        cls,
        theta: Dict[str, float],
        epa: Dict[str, float]
    ) -> Dict[str, Any]:
        """
        Traduce el vector final theta y las coordenadas EPA en parámetros deterministas
        de generación vectorial (Variable Fonts, R_corner, N_primitivas, CIELAB L*a*b* y Arquetipo).
        """
        ti = theta.get("tradicional_innovador", 0.5)
        ae = theta.get("accesible_exclusivo", 0.3)
        ht = theta.get("humano_tecnologico", 0.7)
        og = theta.get("organico_geometrico", 0.7)
        mc = theta.get("minimalista_complejo", -0.2)
        cr = theta.get("convencional_rebelde", 0.4)

        # 1. R_corner y N_primitivas
        r_corner_px = round(max(0.0, 14.0 * (1.0 - (og + 1.0) / 2.0) * (1.0 - (ae + 1.0) / 3.0)), 1)
        n_primitives = int(round(3 + ((mc + 1.0) / 2.0) * 6))
        stroke_width_pt = round(max(1.5, 3.2 + epa["P_potencia"] * 1.4 - ae * 0.6), 2)
        letter_spacing_em = round(0.02 + ((ti + 1.0) / 2.0) * 0.14, 3)
        kinetic_angle_deg = round(max(0.0, cr * 10.0), 1) if cr > 0.25 else 0.0

        # 2. Selección Tipográfica (Matriz Transaccional)
        if ti < -0.25 and ae > 0.2:
            primary_font = "Cormorant Garamond" if ht < 0 else "Playfair Display"
            secondary_font = "Plus Jakarta Sans"
        elif ht > 0.45 and og > 0.35:
            primary_font = "Space Grotesk" if cr < 0.5 else "Chakra Petch"
            secondary_font = "JetBrains Mono"
        elif epa["P_potencia"] > 0.45:
            primary_font = "Bebas Neue" if cr > 0 else "Oswald"
            secondary_font = "IBM Plex Mono"
        elif ti > 0.55:
            primary_font = "Syne"
            secondary_font = "Space Grotesk"
        else:
            primary_font = "Fraunces" if ti < 0 else "Plus Jakarta Sans"
            secondary_font = "IBM Plex Mono"

        # 3. Espacio Cromático CIELAB (L*a*b*) y Esquema Bipolar
        if epa["A_actividad"] > 0.25:
            # Alta Actividad: Longitudes de onda largas, Croma elevado C* > 70, Contraste complementario Delta_h = 180°
            cielab_spec = {
                "scheme": "Bipolar Complementario de Alta Actividad (C* > 74, Δh = 180°)",
                "L_star_range": "L*: 12 (Chasis) vs L*: 64 (Acento Cálido)",
                "C_star_chroma": 78.4,
                "delta_h_deg": 180,
                "palette_hex": ["#FAF8F5", "#0E1116", "#EA580C", "#16A34A"]
            }
        elif ae > 0.45 and ti < 0.0:
            # Lujo Patrimonial Sostenible: C* moderado, tonos oliva/marfil/latón
            cielab_spec = {
                "scheme": "Patrimonial de Luminancia Controlada (L*: 22-94, C*: 28)",
                "L_star_range": "L*: 18 (Oliva Profundo) vs L*: 95 (Marfil)",
                "C_star_chroma": 28.5,
                "delta_h_deg": 45,
                "palette_hex": ["#F4F1EA", "#1B2E22", "#C5A059", "#292524"]
            }
        elif ti > 0.6 and cr > 0.4:
            # Vanguardia Tecnológica Disruptiva
            cielab_spec = {
                "scheme": "Vanguardia de Alta Croma y Luminancia (L*: 65-88, C*: 86)",
                "L_star_range": "L*: 6 (Obsidiana) vs L*: 85 (Neón/Cian)",
                "C_star_chroma": 86.0,
                "delta_h_deg": 165,
                "palette_hex": ["#F8FAFC", "#0A0A0C", "#0284C7", "#10B981"]
            }
        else:
            # Corporativo Minimalista / Ingeniería Monocromática (Delta L* > 60)
            cielab_spec = {
                "scheme": "Contraste Monocromático de Alta Luminancia (ΔL* > 72, C* < 32)",
                "L_star_range": "L*: 9 (Carbón) vs L*: 97 (Albero)",
                "C_star_chroma": 31.0,
                "delta_h_deg": 0,
                "palette_hex": ["#FAF8F5", "#141413", "#0047AB", "#B84A27"]
            }

        # 4. Clasificación de Arquetipo Visual Derivado por Coordenadas EPA
        if ti > 0.4 and ht > 0.4 and epa["A_actividad"] > 0.2:
            archetype = {
                "name": "Arquetipo I: Vanguardia Tecnológica & Precisión Industrial 1:1",
                "archetype_name": "Arquetipo I: Vanguardia Tecnológica Disruptiva (1:1)",
                "description": "Intersección de polígonos regulares con achaflanado de 45°, inscrito en circunferencia 1:1 para foto de perfil y chasis.",
                "coords": f"Innovación ({ti:+.2f}), Tecnología ({ht:+.2f}), Potencia ({epa['P_potencia']:+.2f})",
                "geometry_rule": "Intersección de polígonos regulares con achaflanado de 45°, inscrito en circunferencia 1:1 para foto de perfil y chasis."
            }
        elif ti < 0.0 and ae > 0.3:
            archetype = {
                "name": "Arquetipo II: Lujo Patrimonial & Autoridad Institucional 1:1",
                "archetype_name": "Arquetipo II: Lujo Patrimonial Sostenible (1:1)",
                "description": "Escudo y monograma centralizado con simetría axial estricta y marco circular de alto contraste.",
                "coords": f"Tradición ({ti:+.2f}), Exclusividad ({ae:+.2f}), Evaluación ({epa['E_evaluacion']:+.2f})",
                "geometry_rule": "Escudo y monograma centralizado con simetría axial estricta y marco circular de alto contraste."
            }
        else:
            archetype = {
                "name": "Arquetipo III: Corporativo Minimalista & Alta Visibilidad 1:1",
                "archetype_name": "Arquetipo III: Corporativo Minimalista (1:1)",
                "description": "Trazo continuo calibrado (≥1.2mm) sobre rejilla ortogonal 1:1 basada en la sección áurea.",
                "coords": f"Geometría ({og:+.2f}), Minimalismo ({-mc:+.2f}), Potencia ({epa['P_potencia']:+.2f})",
                "geometry_rule": "Trazo continuo calibrado (≥1.2mm) sobre rejilla ortogonal 1:1 basada en la sección áurea."
            }

        wght = int(max(400, min(900, round(600 + epa["P_potencia"] * 220))))
        wdth = int(max(75, min(125, round(100 + epa["P_potencia"] * 12))))

        return {
            "r_corner_px": r_corner_px,
            "n_primitives": n_primitives,
            "stroke_width_pt": stroke_width_pt,
            "letter_spacing_em": f"{letter_spacing_em}em",
            "kinetic_angle_deg": kinetic_angle_deg,
            "recommended_primary_font": primary_font,
            "recommended_secondary_font": secondary_font,
            "cielab_color_model": cielab_spec,
            "derived_visual_archetype": archetype,
            "proportion_standard": "1:1 Circular Avatar-Safe (Ø 88% Fill) + 1:1 Square Stacked Lockup",
            "svg_geometric_transduction": {
                "R_corner_px": r_corner_px,
                "corner_classification": "Ángulos Agudos de Precisión" if r_corner_px < 6 else "Curvatura Orgánica Calibrada",
                "N_primitivas": n_primitives,
                "stroke_width_px": stroke_width_pt,
                "symmetry_mode": "Asimetría Cinética Controlada" if kinetic_angle_deg > 0 else "Simetría Axial 1:1",
                "structural_tilt_deg": kinetic_angle_deg
            },
            "variable_font_transduction": {
                "recommended_family": primary_font,
                "font_weight_wght": wght,
                "font_width_wdth": wdth,
                "italic_angle_deg": kinetic_angle_deg,
                "letter_spacing_em": letter_spacing_em
            },
            "cielab_color_transduction": {
                "harmony_rule": cielab_spec["scheme"],
                "luminance_contrast_rule": cielab_spec["L_star_range"],
                "L_star_target": cielab_spec["L_star_range"],
                "C_star_chroma": cielab_spec["C_star_chroma"],
                "recommended_hex_palette": cielab_spec["palette_hex"]
            }
        }
