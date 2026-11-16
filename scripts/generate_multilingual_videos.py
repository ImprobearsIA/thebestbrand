#!/usr/bin/env python3
"""
THEBESTBRAND — GENERADOR MULTILINGÜE DE VIDEOS (HERO CONVERGENCE + 7 CÁPSULAS DE PASO 0 AL 6)
Idiomas soportados: en (English), fr (Français), pt (Português), de (Deutsch), it (Italiano).
- Cero llamadas pagadas a HeyGen / Gemini TTS (100% gTTS + calibración acústica masculina + ffmpeg).
- Proporciones 100% naturales (SAR 1:1, crop centrado sin aplastar al fundador).
"""

import json
import math
import subprocess
import textwrap
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont

from generate_vertical_broll_videos import (
    WORKSPACE_ROOT,
    VIDEOS_OUT_DIR,
    API_VIDEOS_OUT_DIR,
    STEP_VIDEO_SOURCES,
    STEP_APP_CAPTURES,
    resolve_localized_capture_path,
    build_transparent_hud_overlay,
    build_dynamic_heygen_flow_clip,
    get_duration,
)

LOGOS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "logos"
CAPTURES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "app_captures"
PLATES_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "brandbook_plates_tbb"
FONTS_DIR = WORKSPACE_ROOT / "apps" / "web" / "assets" / "fonts"
TMP_MULTI_DIR = Path("/tmp/tbb_multilingual_videos_v99")
TMP_MULTI_DIR.mkdir(parents=True, exist_ok=True)

FONT_BOLD = str(FONTS_DIR / "Montserrat-Black.ttf")
FONT_SEMI = str(FONTS_DIR / "PlusJakartaSans-Bold.ttf")
FONT_REG = str(FONTS_DIR / "PlusJakartaSans-Regular.ttf")

LANGS = ["en", "fr", "pt", "de", "it"]

STEP_WORD = {
    "en": ("STEP", "PART"),
    "fr": ("ÉTAPE", "PARTIE"),
    "pt": ("PASSO", "PARTE"),
    "de": ("SCHRITT", "TEIL"),
    "it": ("PASSO", "PARTE"),
}

# Traducciones completas de las 7 cápsulas (4 escenas por paso) para EN, FR, PT, DE, IT
MULTILINGUAL_SCENES = {
    "en": {
        0: [
            ("Create from Scratch, Evolve, or Build a Sub-brand?", "Peter Drucker · Define the starting point", "Hi, I'm Jorge Benítez. Before designing a single line, in Step Zero we define your starting point: create a brand from scratch, evolve your current logo, or build a sub-brand."),
            ("Current Logo Diagnosis with Gemini Vision", "Sagi Haviv · Preserve visual equity", "If you already have a logo, upload it here. You can keep it intact or ask our engine to evolve it across 10 iterations while respecting your visual equity."),
            ("Detailed Business Line & Value Ecosystem", "Theodore Levitt · Avoid marketing myopia", "Describe in detail what your company sells and who it serves. That context feeds every strategic and visual recommendation in the workshop."),
            ("Official Sub-brand Architecture", "David Aaker · Brand Relationship Spectrum", "If your company has divisions, enable sub-brand architecture so the system builds your Master Brand and its official variations.")
        ],
        1: [
            ("People Don't Buy What You Do, They Buy Why You Do It", "Simon Sinek · The Golden Circle (2009)", "Welcome to Step 1. As Simon Sinek proved in The Golden Circle, inspiring brands communicate from the inside out: starting with their Purpose."),
            ("Purpose, Value Offer, and 3-Step Method", "Golden Circle · Why -> How -> What", "Together we will answer your Why, your What, and your How in three concrete steps, culminating in a single central value promise."),
            ("The Company as a Person & Brand Archetypes", "Carl Jung & Jennifer Aaker · Personality", "Next, we will imagine your company as a real person to define its character, voice tone, and ideal customer without corporate jargon."),
            ("Plates 01 to 08 Ready in Real Time", "Chapter I · Strategic Synthesis", "Upon completing Step 1, your first eight strategic brandbook plates are automatically structured.")
        ],
        2: [
            ("Turning Your Purpose into Moments of Truth", "Jan Carlzon · 15 decisive seconds", "You now have your strategy. In Step 2 we bring that philosophy down to earth through Jan Carlzon's Moments of Truth and Don Norman's Experience Design."),
            ("Touchpoint 1: BEFORE the Purchase (Discovery)", "Attraction & First Impression", "First we define how people discover you BEFORE buying: social media, website, digital proposal, or initial inquiry."),
            ("Touchpoint 2: DURING the Operation (Delivery)", "Zero Friction & Signature Experience", "Next, we map what the client experiences DURING the delivery of your product or service, where your central promise is proven."),
            ("Touchpoint 3: AFTER (Loyalty & Advocacy)", "Retention, Portal & Referral", "Finally, we design the AFTER stage: follow-up, warranties, and loyalty so every customer returns and recommends your brand.")
        ],
        3: [
            ("Positioning Starts with the Name", "Al Ries & Jack Trout · Positioning (1981)", "Welcome to Step 3. Al Ries and Jack Trout demonstrated that positioning happens in the customer's mind, and your name is the first anchor."),
            ("Semantic Roots & The SMILE Method", "Alexandra Watkins · Memorable Naming", "Using Alexandra Watkins' SMILE methodology, we explore semantic roots and generate phonetic, memorable, and easy-to-pronounce options."),
            ("WIPO Nice Classification & Tagline", "45 Official Classes · Trademark Protection", "Additionally, we analyze the 45 official Nice classes to guide your trademark registration and seal your commercial tagline."),
            ("Case Study: Stripe, Notion & Rolex", "Short Names with Clean 1:1 Monograms", "Think of Rolex or Stripe: concise names whose initials project an unmistakable monogram on any screen or facade. Let's confirm your brand name.")
        ],
        4: [
            ("Translating Your Strategy into Visual Parameters", "Mitsuo Nagamachi · Emotional Geometry", "Before generating your logo, in Step 4 we apply Mitsuo Nagamachi's Kansei Engineering and Charles Osgood's Semantic Differential."),
            ("The 7 Visual & Emotional Axes", "Calibrating Tension, Weight & Geometry", "Instead of guessing styles, you calibrate seven visual axes: from classic to disruptive, from organic to geometric, and from sober to vibrant."),
            ("Typographic Pairing & Optical Structure", "Robert Bringhurst & Adrian Frutiger", "With those vectors, we select your headline and body font pairing, logo layout structure, and conceptual symbol seed."),
            ("Case Study: Airbnb vs. Tesla", "Coherence Between Personality & Stroke", "Notice how Airbnb uses organic curves to evoke belonging, while Tesla uses sharp engineering angles. Calibrate your visual character now.")
        ],
        5: [
            ("Simplicity, Memorability, and Versatility", "Paul Rand & Sagi Haviv · Logo Design", "We arrive at Step 5: the Logo Studio. Following Paul Rand and Sagi Haviv, a great symbol must be simple, memorable, and versatile at any scale."),
            ("8-Tone Chromatic Psychology & Contrast", "Josef Albers & Johannes Itten", "First we define your official color palette with exact hexadecimal codes, validating contrast on both light and dark backgrounds."),
            ("10 Progressive Iterations with Nano Banana Pro", "Respecting Your Original Palette & Forms", "Our Nano Banana Pro engine generates up to ten progressive visual iterations and vectorizes the winning design into pure Bézier curves."),
            ("Mother Brand & Sub-brand Homologation", "Direct Rule · Descriptor in Action Accent", "If you enabled sub-brands, here you visualize and approve each variant homologated with your Master Brand.")
        ],
        6: [
            ("36 Horizontal Plates Connected End to End", "Massimo Vignelli · 36 Vector Plates", "Congratulations! In Step 6, your entire journey is compiled under Massimo Vignelli's editorial canon and Directive C-00."),
            ("Strict Governance: Rule 1 & Rule 2", "100% Light Canvas & Positive/Negative Logos", "Review your 36-plate horizontal Brandbook: Golden Circle, Touchpoints, Kansei, Color, Typography, Sub-brands, and Photorealistic Mockups."),
            ("Complete Architecture: Philosophy to Print", "Danne & Blackburn (NASA) & Alina Wheeler", "Like NASA's legendary manual, your plates cover everything from strategic essence and geometry to stationery, uniforms, and digital signature."),
            ("Download Your 9 Official Deliverables", "Brandbook .PDF/.HTML + .SVG/.AI + Office + Fonts", "In the Deliverables Vault, download your 9 ready-to-use files: PDF and HTML Brandbook, vector logos, Word, PowerPoint, email signature, and fonts.")
        ],
    },
    "fr": {
        0: [
            ("Créer de Zéro, Évoluer ou Créer une Sous-marque ?", "Peter Drucker · Définir le point de départ", "Bonjour, je suis Jorge Benítez. Dans l'Étape Zéro, nous définissons votre point de départ : créer une marque de zéro, faire évoluer votre logo ou créer une sous-marque."),
            ("Diagnostic du Logo Actuel avec Gemini Vision", "Sagi Haviv · Préserver le capital visuel", "Si vous avez déjà un logo, importez-le ici. Vous pouvez le conserver intact ou demander à notre moteur de le faire évoluer en dix itérations."),
            ("Secteur d'Activité et Écosystème de Valeur", "Theodore Levitt · Éviter la myopie marketing", "Décrivez en détail ce que vend votre entreprise et à qui. Ce contexte alimente toutes les recommandations stratégiques et visuelles."),
            ("Architecture Officielle des Sous-marques", "David Aaker · Spectre de marque", "Si votre entreprise possède des divisions, activez l'architecture de sous-marques pour structurer votre Marque Mère et ses déclinaisons.")
        ],
        1: [
            ("Les Gens N'achètent Pas Ce Que Vous Faites, Mais Pourquoi", "Simon Sinek · Le Cercle d'Or (2009)", "Bienvenue à l'Étape 1. Comme l'a démontré Simon Sinek avec le Cercle d'Or, les grandes marques communiquent de l'intérieur vers l'extérieur."),
            ("Raison d'Être, Offre et Méthode en 3 Étapes", "Cercle d'Or · Why -> How -> What", "Ensemble, nous définissons votre Pourquoi, votre Quoi et votre Comment en trois étapes concrètes jusqu'à votre promesse centrale."),
            ("L'Entreprise comme Personne et Archétypes", "Carl Jung & Jennifer Aaker · Personnalité", "Ensuite, nous imaginons votre entreprise comme une personne réelle pour définir son caractère, son ton de voix et son client idéal."),
            ("Planches 01 à 08 Prêtes en Temps Réel", "Chapitre I · Synthèse Stratégique", "Dès la fin de l'Étape 1, les huit premières planches stratégiques de votre manuel de marque sont générées.")
        ],
        2: [
            ("Transformer Votre Raison d'Être en Moments de Vérité", "Jan Carlzon · 15 secondes décisives", "Vous avez votre stratégie. À l'Étape 2, nous appliquons les Moments de Vérité de Jan Carlzon et le Design d'Expérience de Don Norman."),
            ("Touchpoint 1 : AVANT l'Achat (Découverte)", "Attraction et Première Impression", "Nous définissons d'abord comment vos clients vous découvrent AVANT d'acheter : réseaux sociaux, site web ou proposition commerciale."),
            ("Touchpoint 2 : PENDANT l'Opération (Livraison)", "Zéro Friction et Expérience Signature", "Ensuite, nous structurons ce que vit le client PENDANT la prestation de votre produit ou service, là où votre promesse se prouve."),
            ("Touchpoint 3 : APRÈS (Fidélisation et Recommandation)", "Rétention, Portail et Référence", "Enfin, nous concevons l'APRÈS : suivi, garantie et fidélisation pour que chaque client revienne et vous recommande.")
        ],
        3: [
            ("Le Positionnement Commence par le Nom", "Al Ries & Jack Trout · Positioning (1981)", "Bienvenue à l'Étape 3. Al Ries et Jack Trout ont prouvé que le positionnement naît dans l'esprit du client, dès le nom de marque."),
            ("Racines Sémantiques et Méthode SMILE", "Alexandra Watkins · Naming Mémorable", "Avec la méthode SMILE d'Alexandra Watkins, nous explorons des racines sémantiques et créons des noms mémorables et faciles à prononcer."),
            ("Classification de Nice OMPI et Slogan", "45 Classes Officielles · Protection Juridique", "Nous analysons également les 45 classes officielles de Nice pour orienter votre dépôt de marque et valider votre slogan."),
            ("Exemple Réel : Stripe, Notion et Rolex", "Noms Courts et Monogrammes 1:1", "Pensez à Rolex ou Stripe : des noms concis dont les initiales forment un monogramme parfait sur tout écran ou façade.")
        ],
        4: [
            ("Traduire la Stratégie en Paramètres Visuels", "Mitsuo Nagamachi · Géométrie Émotionnelle", "Avant de dessiner le logo, l'Étape 4 applique l'Ingénierie Kansei de Mitsuo Nagamachi et le Différentiel Sémantique d'Osgood."),
            ("Les 7 Axes Visuels et Émotionnels", "Calibrer Tension, Poids et Géométrie", "Au lieu de deviner, vous calibrez sept axes visuels : du classique au disruptif, de l'organique au géométrique, du sobre au vibrant."),
            ("Duo Typographique et Structure Optique", "Robert Bringhurst & Adrian Frutiger", "Avec ces vecteurs, nous sélectionnons vos polices de titres et de corps ainsi que la structure optique de votre symbole."),
            ("Exemple Réel : Airbnb vs. Tesla", "Cohérence entre Personnalité et Tracé", "Voyez comment Airbnb utilise des courbes organiques chaleureuses tandis que Tesla adopte des angles d'ingénierie précis.")
        ],
        5: [
            ("Simplicité, Mémorabilité et Polyvalence", "Paul Rand & Sagi Haviv · Design de Logo", "Voici l'Étape 5 : le Studio Logo. Selon Paul Rand et Sagi Haviv, un grand symbole doit être simple, mémorable et polyvalent."),
            ("Psychologie Chromatique en 8 Tons et Contraste", "Josef Albers & Johannes Itten", "Nous définissons d'abord votre palette officielle avec ses codes hexadécimaux exacts sur fonds clairs et sombres."),
            ("10 Itérations Progressives avec Nano Banana Pro", "Respect de Votre Palette et de Vos Formes", "Notre moteur Nano Banana Pro génère dix itérations progressives et vectorise le symbole final en courbes de Bézier pures."),
            ("Homologation Marque Mère et Sous-marques", "Règle Directrice · Descripteur en Accent", "Si vous avez des sous-marques, vous visualisez et validez ici chaque déclinaison homologuée avec votre Marque Mère.")
        ],
        6: [
            ("36 Planches Horizontales Connectées de Bout en Bout", "Massimo Vignelli · 36 Planches Vectorielles", "Félicitations ! À l'Étape 6, tout votre parcours est assemblé selon le canon éditorial de Massimo Vignelli et la Directive C-00."),
            ("Gouvernance Stricte : Règle 1 et Règle 2", "Toile 100% Claire et Logos Positif/Négatif", "Parcourez votre Brandbook de 36 planches : Cercle d'Or, Touchpoints, Kansei, Couleurs, Typographie, Sous-marques et Mockups."),
            ("Architecture Complète : de l'Idée à l'Impression", "Danne & Blackburn (NASA) & Alina Wheeler", "Comme le manuel historique de la NASA, vos planches couvrent l'essence, la géométrie, la papeterie, les uniformes et la signature."),
            ("Téléchargez Vos 9 Livrables Officiels", "Brandbook .PDF/.HTML + .SVG/.AI + Office + Polices", "Dans la Voûte des Livrables, téléchargez vos 9 fichiers prêts à l'emploi : PDF, HTML, vecteurs SVG et AI, Word, PowerPoint, signature et polices.")
        ],
    },
    "pt": {
        0: [
            ("Criar do Zero, Evoluir ou Criar uma Submarca?", "Peter Drucker · Definir o ponto de partida", "Olá, sou Jorge Benítez. No Passo Zero definimos o seu ponto de partida: criar uma marca do zero, evoluir o seu logótipo atual ou criar uma submarca."),
            ("Diagnóstico do Logótipo Atual com Gemini Vision", "Sagi Haviv · Preservar o património visual", "Se já tem um logótipo, carregue-o aqui. Pode mantê-lo intacto ou pedir ao nosso motor que o evolua ao longo de dez iterações."),
            ("Ramo de Negócio e Ecossistema de Valor", "Theodore Levitt · Evitar a miopia de marketing", "Descreva em detalhe o que a sua empresa vende e a quem serve. Esse contexto alimenta todas as recomendações estratégicas e visuais."),
            ("Arquitetura Oficial de Submarcas", "David Aaker · Espectro de Marca", "Se a sua empresa tem divisões, ative a arquitetura de submarcas para estruturar a sua Marca Mãe e respetivas variantes.")
        ],
        1: [
            ("As Pessoas Não Compram o Que Faz, Mas Porque o Faz", "Simon Sinek · O Círculo Dourado (2009)", "Bem-vindo ao Passo 1. Como Simon Sinek provou no Círculo Dourado, as marcas inspiradoras comunicam de dentro para fora: começando pelo Propósito."),
            ("Propósito, Oferta de Valor e Método em 3 Passos", "Círculo Dourado · Why -> How -> What", "Juntos responderemos ao seu Porquê, ao seu O Quê e ao seu Como em três passos concretos até formar uma promessa central única."),
            ("A Empresa como Pessoa e Arquétipos de Marca", "Carl Jung & Jennifer Aaker · Personalidade", "Depois, imaginamos a sua empresa como uma pessoa real para definir o seu caráter, tom de voz e cliente ideal."),
            ("Lâminas 01 a 08 Prontas em Tempo Real", "Capítulo I · Síntese Estratégica", "Ao concluir o Passo 1, as primeiras oito lâminas estratégicas do seu manual ficam automaticamente estruturadas.")
        ],
        2: [
            ("Transformando o Seu Propósito em Momentos da Verdade", "Jan Carlzon · 15 segundos decisivos", "Já tem a sua estratégia. No Passo 2 trazemos essa filosofia para a operação real com os Momentos da Verdade de Jan Carlzon e Don Norman."),
            ("Touchpoint 1: ANTES da Compra (Descoberta)", "Atração e Primeira Impressão", "Primeiro definimos como os clientes o descobrem ANTES de comprar: redes sociais, site, proposta digital ou primeiro contacto."),
            ("Touchpoint 2: DURANTE a Operação (Entrega)", "Zero Fricção e Experiência Assinatura", "Em seguida, desenhamos o que o cliente vive DURANTE a entrega do seu produto ou serviço, onde a sua promessa se comprova."),
            ("Touchpoint 3: DEPOIS (Fidelização e Recomendação)", "Retenção, Portal e Indicação", "Por fim, estruturamos o DEPOIS: acompanhamento, garantia e fidelização para que cada cliente volte e recomende a sua marca.")
        ],
        3: [
            ("O Posicionamento Começa pelo Nome", "Al Ries & Jack Trout · Positioning (1981)", "Bem-vindo ao Passo 3. Al Ries e Jack Trout demonstraram que o posicionamento ocorre na mente do cliente, e o nome é a primeira âncora."),
            ("Raízes Semânticas e Método SMILE", "Alexandra Watkins · Naming Memorável", "Com a metodologia SMILE de Alexandra Watkins, exploramos raízes semânticas e geramos opções fonéticas, memoráveis e fáceis de pronunciar."),
            ("Classificação de Nice OMPI e Eslogan", "45 Classes Oficiais · Proteção Legal", "Além disso, analisamos as 45 classes oficiais de Nice para orientar o seu registo de marca e selar o seu eslogan comercial."),
            ("Exemplo Real: Stripe, Notion e Rolex", "Nomes Curtos com Monogramas 1:1", "Pense na Rolex ou na Stripe: nomes curtos cujas iniciais formam um monograma inconfundível em qualquer ecrã ou fachada.")
        ],
        4: [
            ("Traduzindo a Estratégia em Parâmetros Visuais", "Mitsuo Nagamachi · Geometria Emocional", "Antes de gerar o logótipo, no Passo 4 aplicamos a Engenharia Kansei de Mitsuo Nagamachi e o Diferencial Semântico de Osgood."),
            ("Os 7 Eixos Visuais e Emocionais", "Calibrando Tensão, Peso e Geometria", "Em vez de adivinhar estilos, calibra sete eixos visuais: do clássico ao disruptivo, do orgânico ao geométrico e do sóbrio ao vibrante."),
            ("Par Tipográfico e Estrutura Óptica", "Robert Bringhurst & Adrian Frutiger", "Com esses vetores, selecionamos as fontes de títulos e corpo, a estrutura do logótipo e a semente conceptual do símbolo."),
            ("Exemplo Real: Airbnb vs. Tesla", "Coerência entre Personalidade e Traço", "Veja como a Airbnb usa curvas orgânicas acolhedoras enquanto a Tesla utiliza ângulos de engenharia de precisão.")
        ],
        5: [
            ("Simplicidade, Memorabilidade e Versatilidade", "Paul Rand & Sagi Haviv · Design de Logótipo", "Chegamos ao Passo 5: o Estúdio de Logótipo. Seguindo Paul Rand e Sagi Haviv, um grande símbolo deve ser simples, memorável e versátil."),
            ("Psicologia Cromática de 8 Tons e Contraste", "Josef Albers & Johannes Itten", "Primeiro definimos a sua paleta oficial com códigos hexadecimais exatos, validando o contraste em fundos claros e escuros."),
            ("10 Iterações Progressivas com Nano Banana Pro", "Respeitando a Sua Paleta e Formas", "O nosso motor Nano Banana Pro gera até dez iterações visuais progressivas e vetoriza o desenho vencedor em curvas Bézier puras."),
            ("Homologação de Marca Mãe e Submarcas", "Regra Diretriz · Descritor em Destaque", "Se ativou submarcas, aqui visualiza e aprova cada variante homologada com a sua Marca Mãe.")
        ],
        6: [
            ("36 Lâminas Horizontais Conectadas de Ponta a Ponta", "Massimo Vignelli · 36 Lâminas em Curvas", "Parabéns! No Passo 6, todo o seu percurso é compilado sob o cânone editorial de Massimo Vignelli e a Diretiva C-00."),
            ("Governança Estrita: Regra 1 e Regra 2", "Tela 100% Clara e Logos em Positivo/Negativo", "Revise o seu Brandbook horizontal de 36 lâminas: Círculo Dourado, Touchpoints, Kansei, Cor, Tipografia, Submarcas e Mockups."),
            ("Arquitetura Completa: da Filosofia à Gráfica", "Danne & Blackburn (NASA) & Alina Wheeler", "Tal como o manual da NASA, as suas lâminas cobrem desde a essência e geometria até estacionário, fardamento e assinatura digital."),
            ("Descarregue os Seus 9 Entregáveis Oficiais", "Brandbook .PDF/.HTML + .SVG/.AI + Office + Fontes", "No Cofre de Entregáveis, descarregue os seus 9 ficheiros prontos a usar: PDF, HTML, vetores SVG e AI, Word, PowerPoint, assinatura e fontes.")
        ],
    },
    "de": {
        0: [
            ("Neu Erstellen, Weiterentwickeln oder Submarke?", "Peter Drucker · Den Ausgangspunkt definieren", "Hallo, ich bin Jorge Benítez. In Schritt Null definieren wir Ihren Ausgangspunkt: Marke neu erstellen, bestehendes Logo weiterentwickeln oder Submarke aufbauen."),
            ("Diagnose des Aktuellen Logos mit Gemini Vision", "Sagi Haviv · Visuelles Kapital bewahren", "Wenn Sie bereits ein Logo haben, laden Sie es hier hoch. Sie können es beibehalten oder in zehn Iterationen präzise weiterentwickeln lassen."),
            ("Geschäftsfeld und Wert-Ökosystem", "Theodore Levitt · Marketing-Myopie vermeiden", "Beschreiben Sie detailliert, was Ihr Unternehmen verkauft und wem es dient. Dieser Kontext steuert alle strategischen und visuellen Empfehlungen."),
            ("Offizielle Submarken-Architektur", "David Aaker · Marken-Spektrum", "Wenn Ihr Unternehmen Sparten hat, aktivieren Sie die Submarken-Architektur für Ihre Dachmarke und ihre offiziellen Varianten.")
        ],
        1: [
            ("Menschen Kaufen Nicht Was Sie Tun, Sondern Warum", "Simon Sinek · Der Golden Circle (2009)", "Willkommen zu Schritt 1. Wie Simon Sinek im Golden Circle zeigte, kommunizieren starke Marken von innen nach außen: beginnend mit dem Warum."),
            ("Zweck, Wertangebot und 3-Schritte-Methode", "Golden Circle · Why -> How -> What", "Gemeinsam definieren wir Ihr Warum, Ihr Was und Ihr Wie in drei konkreten Schritten bis hin zu Ihrem zentralen Wertversprechen."),
            ("Das Unternehmen als Person & Markenarchetypen", "Carl Jung & Jennifer Aaker · Persönlichkeit", "Danach stellen wir uns Ihr Unternehmen als echte Person vor, um Charakter, Tonalität und den idealen Kunden klar festzulegen."),
            ("Tafeln 01 bis 08 in Echtzeit Bereit", "Kapitel I · Strategische Synthese", "Nach Abschluss von Schritt 1 sind die ersten acht strategischen Tafeln Ihres Brandbooks automatisch strukturiert.")
        ],
        2: [
            ("Ihren Zweck in Momente der Wahrheit Verwandeln", "Jan Carlzon · 15 entscheidende Sekunden", "Ihre Strategie steht. In Schritt 2 übertragen wir sie mit Jan Carlzons Momenten der Wahrheit und Don Normans Experience Design in die Praxis."),
            ("Touchpoint 1: VOR dem Kauf (Entdeckung)", "Anziehung & Erster Eindruck", "Zuerst definieren wir, wie Kunden Sie VOR dem Kauf entdecken: Social Media, Website, digitales Angebot oder Erstkontakt."),
            ("Touchpoint 2: WÄHREND der Leistung (Lieferung)", "Null Reibung & Signature Experience", "Anschließend gestalten wir, was der Kunde WÄHREND der Lieferung Ihres Produkts oder Services erlebt."),
            ("Touchpoint 3: NACH dem Kauf (Bindung & Empfehlung)", "Kundenbindung, Portal & Weiterempfehlung", "Zum Schluss planen wir die Phase DANACH: Betreuung, Garantie und Loyalität, damit jeder Kunde wiederkommt und Sie empfiehlt.")
        ],
        3: [
            ("Positionierung Beginnt mit dem Namen", "Al Ries & Jack Trout · Positioning (1981)", "Willkommen zu Schritt 3. Al Ries und Jack Trout zeigten, dass Positionierung im Kopf des Kunden beginnt – und der Name der erste Anker ist."),
            ("Semantische Wurzeln & die SMILE-Methode", "Alexandra Watkins · Einprägsames Naming", "Mit der SMILE-Methode von Alexandra Watkins entwickeln wir phonetisch starke, einprägsame und leicht aussprechbare Marken-Namen."),
            ("WIPO Nizza-Klassifikation & Slogan", "45 Offizielle Klassen · Markenschutz", "Zudem prüfen wir die 45 offiziellen Nizza-Klassen für Ihre Markenanmeldung und definieren Ihren kommerziellen Slogan."),
            ("Praxisbeispiel: Stripe, Notion und Rolex", "Kurze Namen mit Perfektem 1:1-Monogramm", "Denken Sie an Rolex oder Stripe: prägnante Namen, deren Initialen auf jedem Bildschirm und jeder Fassade sofort erkennbar sind.")
        ],
        4: [
            ("Strategie in Visuelle Parameter Übersetzen", "Mitsuo Nagamachi · Emotionale Geometrie", "Vor dem Logo-Design wenden wir in Schritt 4 Mitsuo Nagamachis Kansei-Engineering und Osgoods Semantisches Differential an."),
            ("Die 7 Visuellen und Emotionalen Achsen", "Spannung, Gewicht und Geometrie Kalibrieren", "Statt Stile zu raten, kalibrieren Sie sieben visuelle Achsen: von klassisch bis disruptiv, von organisch bis geometrisch."),
            ("Typografisches Paar & Optische Struktur", "Robert Bringhurst & Adrian Frutiger", "Mit diesen Vektoren wählen wir Ihre Titel- und Fließtextschriften sowie die optische Grundstruktur Ihres Symbols."),
            ("Praxisbeispiel: Airbnb vs. Tesla", "Kohärenz Zwischen Charakter und Linie", "Sehen Sie, wie Airbnb weiche Kurven für Gastfreundschaft nutzt, während Tesla präzise Winkel für Ingenieurskunst einsetzt.")
        ],
        5: [
            ("Einfachheit, Einprägsamkeit und Vielseitigkeit", "Paul Rand & Sagi Haviv · Logo-Design", "Willkommen in Schritt 5: dem Logo-Studio. Nach Paul Rand und Sagi Haviv muss ein starkes Symbol einfach, einprägsam und skalierbar sein."),
            ("8-Ton-Farbpsychologie & Kontrastprüfung", "Josef Albers & Johannes Itten", "Zuerst legen wir Ihre offizielle Farbpalette mit exakten Hex-Codes fest und prüfen den Kontrast auf hellen und dunklen Hintergründen."),
            ("10 Progressive Iterationen mit Nano Banana Pro", "Respekt vor Ihrer Originalpalette & Form", "Unsere Nano Banana Pro Engine erzeugt bis zu zehn progressive Iterationen und vektorisiert das Sieger-Logo in reine Bézier-Kurven."),
            ("Homologation von Dachmarke und Submarken", "Leitregel · Deskriptor in Akzentfarbe", "Wenn Sie Submarken aktiviert haben, prüfen und bestätigen Sie hier jede Variante im Einklang mit Ihrer Dachmarke.")
        ],
        6: [
            ("36 Horizontale Tafeln Nahtlos Verbunden", "Massimo Vignelli · 36 Vektor-Tafeln", "Herzlichen Glückwunsch! In Schritt 6 wird Ihr gesamter Prozess nach dem Kanon von Massimo Vignelli und Richtlinie C-00 zusammengeführt."),
            ("Strikte Markenführung: Regel 1 & Regel 2", "100% Helle Fläche & Positiv-/Negativ-Logos", "Prüfen Sie Ihr horizontales Brandbook mit 36 Tafeln: Golden Circle, Touchpoints, Kansei, Farben, Typografie, Submarken und Mockups."),
            ("Vollständige Architektur: Von der Idee bis zum Druck", "Danne & Blackburn (NASA) & Alina Wheeler", "Wie das legendäre NASA-Handbuch decken Ihre Tafeln alles ab: von Strategie und Geometrie bis zu Briefpapier und digitaler Signatur."),
            ("Laden Sie Ihre 9 Offiziellen Deliverables Herunter", "Brandbook .PDF/.HTML + .SVG/.AI + Office + Fonts", "Im Deliverables-Tresor laden Sie Ihre 9 fertigen Dateien herunter: PDF, HTML, SVG/AI-Vektoren, Word, PowerPoint, E-Mail-Signatur und Schriften.")
        ],
    },
    "it": {
        0: [
            ("Creare da Zero, Evolvere o Creare un Sub-brand?", "Peter Drucker · Definire il punto di partenza", "Ciao, sono Jorge Benítez. Nel Passo Zero definiamo il tuo punto di partenza: creare un brand da zero, evolvere il logo attuale o creare un sub-brand."),
            ("Diagnosi del Logo Attuale con Gemini Vision", "Sagi Haviv · Preservare il valore visivo", "Se hai già un logo, caricalo qui. Puoi mantenerlo intatto o chiedere al nostro motore di evolverlo attraverso dieci iterazioni."),
            ("Settore di Attività ed Ecosistema di Valore", "Theodore Levitt · Evitare la miopia di marketing", "Descrivi in dettaglio cosa vende la tua azienda e a chi si rivolge. Questo contesto guida ogni raccomandazione strategica e visiva."),
            ("Architettura Ufficiale dei Sub-brand", "David Aaker · Spettro del Brand", "Se la tua azienda ha divisioni, attiva l'architettura dei sub-brand per strutturare il Brand Madre e le sue varianti ufficiali.")
        ],
        1: [
            ("Le Persone Non Comprano Ciò Che Fai, Ma Perché Lo Fai", "Simon Sinek · Il Cerchio d'Oro (2009)", "Benvenuto al Passo 1. Come ha dimostrato Simon Sinek con il Cerchio d'Oro, i brand memorabili comunicano dall'interno verso l'esterno."),
            ("Scopo, Offerta di Valore e Metodo in 3 Passi", "Cerchio d'Oro · Why -> How -> What", "Insieme risponderemo al tuo Perché, al tuo Cosa e al tuo Come in tre passi concreti fino a formulare un'unica promessa centrale."),
            ("L'Azienda come Persona e Archetipi di Brand", "Carl Jung & Jennifer Aaker · Personalità", "Poi immagineremo la tua azienda come una persona reale per definirne carattere, tono di voce e cliente ideale."),
            ("Tavole da 01 a 08 Pronte in Tempo Reale", "Capitolo I · Sintesi Strategica", "Completando il Passo 1, le prime otto tavole strategiche del tuo brandbook vengono strutturate automaticamente.")
        ],
        2: [
            ("Trasformare il Tuo Scopo in Momenti della Verità", "Jan Carlzon · 15 secondi decisivi", "Ora hai la tua strategia. Nel Passo 2 portiamo questa filosofia nella pratica con i Momenti della Verità di Jan Carlzon e Don Norman."),
            ("Touchpoint 1: PRIMA dell'Acquisto (Scoperta)", "Attrazione e Prima Impressione", "Prima definiamo come i clienti ti scoprono PRIMA di acquistare: social media, sito web, proposta digitale o primo contatto."),
            ("Touchpoint 2: DURANTE l'Operazione (Erogazione)", "Zero Attrito ed Esperienza Distintiva", "Poi disegniamo ciò che il cliente vive DURANTE la consegna del tuo prodotto o servizio, dove la tua promessa viene dimostrata."),
            ("Touchpoint 3: DOPO (Fidelizzazione e Passaparola)", "Retention, Portale e Raccomandazione", "Infine progettiamo il DOPO: follow-up, garanzia e fidelizzazione affinché ogni cliente torni e consigli il tuo brand.")
        ],
        3: [
            ("Il Posizionamento Inizia dal Nome", "Al Ries & Jack Trout · Positioning (1981)", "Benvenuto al Passo 3. Al Ries e Jack Trout hanno dimostrato che il posizionamento avviene nella mente del cliente e il nome è la prima ancora."),
            ("Radici Semantiche e Metodo SMILE", "Alexandra Watkins · Naming Memorabile", "Con il metodo SMILE di Alexandra Watkins, esploriamo radici semantiche e generiamo opzioni fonetiche, memorabili e facili da pronunciare."),
            ("Classificazione di Nizza OMPI e Slogan", "45 Classi Ufficiali · Tutela Legale", "Analizziamo inoltre le 45 classi ufficiali di Nizza per guidare la registrazione del marchio e definire il tuo slogan commerciale."),
            ("Caso Reale: Stripe, Notion e Rolex", "Nomi Brevi con Monogramma 1:1", "Pensa a Rolex o Stripe: nomi concisi le cui iniziali formano un monogramma inconfondibile su ogni schermo o facciata.")
        ],
        4: [
            ("Tradurre la Strategia in Parametri Visivi", "Mitsuo Nagamachi · Geometria Emozionale", "Prima di generare il logo, nel Passo 4 applichiamo l'Ingegneria Kansei di Mitsuo Nagamachi e il Differenziale Semantico di Osgood."),
            ("I 7 Assi Visivi ed Emozionali", "Calibrare Tensione, Peso e Geometria", "Invece di indovinare gli stili, calibri sette assi visivi: dal classico al dirompente, dall'organico al geometrico, dal sobrio al vibrante."),
            ("Coppia Tipografica e Struttura Ottica", "Robert Bringhurst & Adrian Frutiger", "Con questi vettori selezioniamo i font per titoli e testo, la struttura del logo e il seme concettuale del simbolo."),
            ("Caso Reale: Airbnb vs. Tesla", "Coerenza tra Personalità e Tratto", "Osserva come Airbnb usi curve morbide per trasmettere accoglienza, mentre Tesla usi angoli netti per esprimere ingegneria.")
        ],
        5: [
            ("Semplicità, Memorabilità e Versatilità", "Paul Rand & Sagi Haviv · Logo Design", "Siamo al Passo 5: lo Studio del Logo. Seguendo Paul Rand e Sagi Haviv, un grande simbolo deve essere semplice, memorabile e versatile."),
            ("Psicologia Cromatica a 8 Toni e Contrasto", "Josef Albers & Johannes Itten", "Per prima cosa definiamo la tua palette ufficiale con codici esadecimali esatti, validando il contrasto su sfondi chiari e scuri."),
            ("10 Iterazioni Progressive con Nano Banana Pro", "Rispetto della Tua Palette e delle Forme", "Il nostro motore Nano Banana Pro genera fino a dieci iterazioni visive progressive e vettorizza il design vincente in curve di Bézier pure."),
            ("Omologazione Brand Madre e Sub-brand", "Regola Direttiva · Descrittore in Accento", "Se hai attivato i sub-brand, qui visualizzi e approvi ogni variante omologata con il tuo Brand Madre.")
        ],
        6: [
            ("36 Tavole Orizzontali Collegate da Capo a Fondo", "Massimo Vignelli · 36 Tavole Vettoriali", "Congratulazioni! Nel Passo 6 tutto il tuo percorso viene compilato secondo il canone editoriale di Massimo Vignelli e la Direttiva C-00."),
            ("Governance Rigorosa: Regola 1 e Regola 2", "Tela 100% Chiara e Loghi in Positivo/Negativo", "Esamina il tuo Brandbook orizzontale di 36 tavole: Cerchio d'Oro, Touchpoints, Kansei, Colore, Tipografia, Sub-brand e Mockup."),
            ("Architettura Completa: dalla Filosofia alla Stampa", "Danne & Blackburn (NASA) & Alina Wheeler", "Come lo storico manuale della NASA, le tue tavole coprono dall'essenza e geometria fino a cancelleria, divise e firma digitale."),
            ("Scarica i Tuoi 9 Deliverable Ufficiali", "Brandbook .PDF/.HTML + .SVG/.AI + Office + Font", "Nel Caveau dei Deliverable scarichi i tuoi 9 file pronti all'uso: PDF, HTML, vettori SVG e AI, Word, PowerPoint, firma email e font.")
        ],
    },
}

HERO_I18N = {
    "en": {
        "kicker": "CONVERGENCE OF THE 6 SCIENTIFIC BRANDING THEORIES",
        "theories": [
            ("01 · GOLDEN CIRCLE", "Simon Sinek · Core Purpose", (29, 78, 216), "WHY → HOW → WHAT"),
            ("02 · TOUCHPOINTS", "Jan Carlzon & Don Norman", (2, 132, 199), "Before · During · After"),
            ("03 · NAMING & NICE", "Ries, Trout & A. Watkins (SMILE)", (234, 88, 12), "Phonetics & Legal Shield"),
            ("04 · KANSEI ENG.", "Mitsuo Nagamachi & Osgood", (13, 37, 64), "7 Emotional Axes"),
            ("05 · VECTOR & GLASS", "Paul Rand, Sagi Haviv & Jony Ive", (29, 78, 216), "Pure Bézier .SVG / .AI"),
            ("06 · 36-PLATE CANON", "Massimo Vignelli & Guide C-00", (234, 88, 12), "9 Official Deliverables"),
        ],
        "left_card": "LIVE APPLICATION · 7 STEPS WITH AURA",
        "right_card": "36-PLATE BRANDBOOK + 9 DELIVERABLES",
        "stage1_t": "1. SCIENTIFIC FOUNDATION: 6 WORLD-CLASS THEORIES",
        "stage1_d": "Sinek (Golden Circle) + Carlzon (Touchpoints) + Watkins (SMILE) + Nagamachi (Kansei) + Rand/Ive + Vignelli",
        "stage2_t": "2. REAL-TIME ALGORITHMIC FUSION",
        "stage2_d": "Theories converge in Aura's Socratic engine to synthesize your Apple Liquid Glass visual identity",
        "stage3_t": "3. THE BEST BRAND · YOUR BRAND & 9 DELIVERABLES IN 30 MINUTES",
        "stage3_d": "36-Plate Brandbook (.PDF/.HTML) + Vector Suite (.SVG/.AI) + Word + PowerPoint + Signature + Fonts",
        "narration": "Six world-class branding theories converge in real time with Aura and Nano Banana Pro to create your brand and nine official deliverables in thirty minutes.",
    },
    "fr": {
        "kicker": "CONVERGENCE DES 6 THÉORIES SCIENTIFIQUES DU BRANDING",
        "theories": [
            ("01 · CERCLE D'OR", "Simon Sinek · Raison d'Être", (29, 78, 216), "WHY → HOW → WHAT"),
            ("02 · TOUCHPOINTS", "Jan Carlzon & Don Norman", (2, 132, 199), "Avant · Pendant · Après"),
            ("03 · NAMING & NICE", "Ries, Trout & A. Watkins (SMILE)", (234, 88, 12), "Phonétique & Dépôt OMPI"),
            ("04 · ING. KANSEI", "Mitsuo Nagamachi & Osgood", (13, 37, 64), "7 Axes Émotionnels"),
            ("05 · VECTEUR & GLASS", "Paul Rand, Sagi Haviv & Jony Ive", (29, 78, 216), "Courbes Bézier .SVG / .AI"),
            ("06 · CANON 36 PLANCHES", "Massimo Vignelli & Guide C-00", (234, 88, 12), "9 Livrables Officiels"),
        ],
        "left_card": "APPLICATION EN DIRECT · 7 ÉTAPES AVEC AURA",
        "right_card": "BRANDBOOK 36 PLANCHES + 9 LIVRABLES",
        "stage1_t": "1. FONDEMENT SCIENTIFIQUE : 6 THÉORIES MONDIALES",
        "stage1_d": "Sinek (Cercle d'Or) + Carlzon (Touchpoints) + Watkins (SMILE) + Nagamachi (Kansei) + Rand/Ive + Vignelli",
        "stage2_t": "2. FUSION ALGORITHMIQUE EN TEMPS RÉEL",
        "stage2_d": "Les théories convergent dans le moteur socratique d'Aura et synthétisent votre identité Liquid Glass",
        "stage3_t": "3. THE BEST BRAND · VOTRE MARQUE ET VOS 9 LIVRABLES EN 30 MINUTES",
        "stage3_d": "Manuel de 36 Planches (.PDF/.HTML) + Suite Vectorielle (.SVG/.AI) + Word + PowerPoint + Signature + Polices",
        "narration": "Six théories scientifiques du branding convergent en temps réel avec Aura et Nano Banana Pro pour créer votre marque et vos neuf livrables officiels en trente minutes.",
    },
    "pt": {
        "kicker": "CONVERGÊNCIA DAS 6 TEORIAS CIENTÍFICAS DE BRANDING",
        "theories": [
            ("01 · CÍRCULO DOURADO", "Simon Sinek · Propósito Nuclear", (29, 78, 216), "WHY → HOW → WHAT"),
            ("02 · TOUCHPOINTS", "Jan Carlzon & Don Norman", (2, 132, 199), "Antes · Durante · Depois"),
            ("03 · NAMING & NICE", "Ries, Trout & A. Watkins (SMILE)", (234, 88, 12), "Fonética & Proteção Legal"),
            ("04 · ENG. KANSEI", "Mitsuo Nagamachi & Osgood", (13, 37, 64), "7 Eixos Emocionais"),
            ("05 · VETOR & GLASS", "Paul Rand, Sagi Haviv & Jony Ive", (29, 78, 216), "Curvas Bézier .SVG / .AI"),
            ("06 · CÂNONE 36 LÂMINAS", "Massimo Vignelli & Guia C-00", (234, 88, 12), "9 Entregáveis Oficiais"),
        ],
        "left_card": "APLICAÇÃO AO VIVO · 7 PASSOS COM AURA",
        "right_card": "BRANDBOOK 36 LÂMINAS + 9 ENTREGÁVEIS",
        "stage1_t": "1. FUNDAMENTO CIENTÍFICO: 6 TEORIAS DE CLASSE MUNDIAL",
        "stage1_d": "Sinek (Círculo Dourado) + Carlzon (Touchpoints) + Watkins (SMILE) + Nagamachi (Kansei) + Rand/Ive + Vignelli",
        "stage2_t": "2. FUSÃO ALGORÍTMICA EM TEMPO REAL",
        "stage2_d": "As teorias convergem no motor socrático da Aura e sintetizam a identidade visual Apple Liquid Glass",
        "stage3_t": "3. THE BEST BRAND · A SUA MARCA E 9 ENTREGÁVEIS EM 30 MINUTOS",
        "stage3_d": "Manual de 36 Lâminas (.PDF/.HTML) + Suite de Vetores (.SVG/.AI) + Word + PowerPoint + Assinatura + Fontes",
        "narration": "Seis teorias científicas de branding convergem em tempo real com a Aura e o Nano Banana Pro para criar a sua marca e os seus nove entregáveis oficiais em trinta minutos.",
    },
    "de": {
        "kicker": "KONVERGENZ DER 6 WISSENSCHAFTLICHEN BRANDING-THEORIEN",
        "theories": [
            ("01 · GOLDEN CIRCLE", "Simon Sinek · Kernzweck", (29, 78, 216), "WHY → HOW → WHAT"),
            ("02 · TOUCHPOINTS", "Jan Carlzon & Don Norman", (2, 132, 199), "Vorher · Während · Nachher"),
            ("03 · NAMING & NIZZA", "Ries, Trout & A. Watkins (SMILE)", (234, 88, 12), "Phonetik & Markenschutz"),
            ("04 · KANSEI-ENG.", "Mitsuo Nagamachi & Osgood", (13, 37, 64), "7 Emotionale Achsen"),
            ("05 · VEKTOR & GLASS", "Paul Rand, Sagi Haviv & Jony Ive", (29, 78, 216), "Reine Bézier .SVG / .AI"),
            ("06 · 36-TAFELN-KANON", "Massimo Vignelli & Leitfaden C-00", (234, 88, 12), "9 Offizielle Deliverables"),
        ],
        "left_card": "LIVE-ANWENDUNG · 7 SCHRITTE MIT AURA",
        "right_card": "36-TAFELN-BRANDBOOK + 9 DELIVERABLES",
        "stage1_t": "1. WISSENSCHAFTLICHES FUNDAMENT: 6 WELTKLASSE-THEORIEN",
        "stage1_d": "Sinek (Golden Circle) + Carlzon (Touchpoints) + Watkins (SMILE) + Nagamachi (Kansei) + Rand/Ive + Vignelli",
        "stage2_t": "2. ALGORITHMISCHE FUSION IN ECHTZEIT",
        "stage2_d": "Die Theorien verschmelzen in Auras sokratischer Engine zur Apple Liquid Glass Markenidentität",
        "stage3_t": "3. THE BEST BRAND · IHRE MARKE & 9 DELIVERABLES IN 30 MINUTEN",
        "stage3_d": "36-Tafeln-Brandbook (.PDF/.HTML) + Vektor-Suite (.SVG/.AI) + Word + PowerPoint + Signatur + Schriften",
        "narration": "Sechs wissenschaftliche Branding-Theorien verschmelzen in Echtzeit mit Aura und Nano Banana Pro, um Ihre Marke und neun offizielle Deliverables in dreißig Minuten zu erstellen.",
    },
    "it": {
        "kicker": "CONVERGENZA DELLE 6 TEORIE SCIENTIFICHE DEL BRANDING",
        "theories": [
            ("01 · CERCHIO D'ORO", "Simon Sinek · Scopo Centrale", (29, 78, 216), "WHY → HOW → WHAT"),
            ("02 · TOUCHPOINTS", "Jan Carlzon & Don Norman", (2, 132, 199), "Prima · Durante · Dopo"),
            ("03 · NAMING & NIZZA", "Ries, Trout & A. Watkins (SMILE)", (234, 88, 12), "Fonetica & Tutela Legale"),
            ("04 · ING. KANSEI", "Mitsuo Nagamachi & Osgood", (13, 37, 64), "7 Assi Emozionali"),
            ("05 · VETTORE & GLASS", "Paul Rand, Sagi Haviv & Jony Ive", (29, 78, 216), "Curve Bézier .SVG / .AI"),
            ("06 · CANONE 36 TAVOLE", "Massimo Vignelli & Guida C-00", (234, 88, 12), "9 Deliverable Ufficiali"),
        ],
        "left_card": "APPLICAZIONE LIVE · 7 PASSI CON AURA",
        "right_card": "BRANDBOOK 36 TAVOLE + 9 DELIVERABLE",
        "stage1_t": "1. FONDAMENTO SCIENTIFICO: 6 TEORIE DI CLASSE MONDIALE",
        "stage1_d": "Sinek (Cerchio d'Oro) + Carlzon (Touchpoints) + Watkins (SMILE) + Nagamachi (Kansei) + Rand/Ive + Vignelli",
        "stage2_t": "2. FUSIONE ALGORITMICA IN TEMPO REALE",
        "stage2_d": "Le teorie convergono nel motore socratico di Aura e sintetizzano l'identità Apple Liquid Glass",
        "stage3_t": "3. THE BEST BRAND · IL TUO BRAND E 9 DELIVERABLE IN 30 MINUTI",
        "stage3_d": "Manuale di 36 Tavole (.PDF/.HTML) + Suite Vettoriale (.SVG/.AI) + Word + PowerPoint + Firma + Font",
        "narration": "Sei teorie scientifiche di branding convergono in tempo reale con Aura e Nano Banana Pro per creare il tuo brand e i tuoi nove deliverable ufficiali in trenta minuti.",
    },
}


MALE_PITCH_BY_LANG = {
    "es": (0.586, "com.mx"),
    "en": (0.619, "com"),
    "fr": (0.743, "fr"),
    "pt": (0.553, "com.br"),
    "de": (0.610, "de"),
    "it": (0.960, "it"),
}


def synthesize_localized_founder_voice_m4a(text: str, lang: str, clip_id: str) -> Path:
    out_m4a = TMP_MULTI_DIR / f"{clip_id}_{lang}_male132.m4a"
    if out_m4a.exists() and out_m4a.stat().st_size > 4000:
        return out_m4a

    pitch_factor, tld = MALE_PITCH_BY_LANG.get(lang, (0.619, "com"))
    raw_mp3 = TMP_MULTI_DIR / f"{clip_id}_{lang}_raw.mp3"
    tts = gTTS(text=text, lang=lang, tld=tld, slow=False)
    tts.save(str(raw_mp3))

    # Calibrar timbre masculino barítono de Jorge Benítez (~132 Hz) con formantes desplazados + ambiente sutil
    af_voice = (
        f"[0:a]rubberband=pitch={pitch_factor:.3f}:tempo=1.06:formant=shifted:pitchq=quality,"
        "equalizer=f=135:t=q:w=1.1:g=3.5,"
        "equalizer=f=3200:t=q:w=1.5:g=-2.5,"
        "lowpass=f=7200,aresample=44100,volume=1.6[v];"
        "[1:a]lowpass=f=700[bg];"
        "[v][bg]amix=inputs=2:duration=first:dropout_transition=1,apad=pad_dur=0.20[aout]"
    )
    subprocess.run([
        "ffmpeg", "-y",
        "-i", str(raw_mp3),
        "-f", "lavfi",
        "-i", "aevalsrc='0.010*sin(2*PI*196*t)+0.007*sin(2*PI*293.66*t)+0.005*sin(2*PI*392*t)':s=44100:c=stereo",
        "-filter_complex", af_voice,
        "-map", "[aout]",
        "-c:a", "aac", "-b:a", "128k",
        str(out_m4a)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out_m4a


def build_localized_hud_overlay(
    lang: str,
    step_num: int,
    shot_idx: int,
    headline: str,
    sub_label: str,
    out_png: Path,
):
    W, H = 720, 1280
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    try:
        font_badge = ImageFont.truetype(FONT_BOLD, 14)
        font_h1 = ImageFont.truetype(FONT_BOLD, 26)
        font_sub = ImageFont.truetype(FONT_SEMI, 16)
    except Exception:
        font_badge = font_h1 = font_sub = ImageFont.load_default()

    # Gradiente inferior sutil (22%)
    for y in range(1000, H):
        alpha = int(min(210, ((y - 1000) / 280.0) ** 1.35 * 195))
        draw.line([(0, y), (W, y)], fill=(10, 18, 32, alpha))

    step_w, part_w = STEP_WORD.get(lang, ("STEP", "PART"))
    draw.rounded_rectangle([28, 28, 290, 62], radius=17, fill=(13, 37, 64, 210), outline=(255, 255, 255, 70), width=1)
    draw.ellipse([42, 40, 52, 50], fill=(255, 122, 0, 255))
    draw.text((62, 36), f"{step_w} 0{step_num} · {part_w} {shot_idx + 1}/4", font=font_badge, fill=(255, 255, 255, 250))

    draw.rounded_rectangle([28, 1126, 35, 1232], radius=3, fill=(255, 122, 0, 255))
    wrapped_h1 = textwrap.wrap(headline, width=32)[:2]
    hy = 1126
    for line in wrapped_h1:
        draw.text((48, hy), line, font=font_h1, fill=(255, 255, 255, 255))
        hy += 32

    draw.text((48, hy + 4), sub_label[:48], font=font_sub, fill=(147, 197, 253, 245))

    seg_w = (W - 56 - 24) // 4
    for s in range(4):
        sx = 28 + s * (seg_w + 8)
        col = (255, 122, 0, 255) if s <= shot_idx else (255, 255, 255, 75)
        draw.rounded_rectangle([sx, 1254, sx + seg_w, 1260], radius=3, fill=col)

    img.save(out_png, "PNG")


def generate_step_capsule_for_lang(lang: str, step: int):
    import shutil

    scenes = MULTILINGUAL_SCENES[lang][step]
    sources = STEP_VIDEO_SOURCES.get(step, STEP_VIDEO_SOURCES[1])
    cap_specs = STEP_APP_CAPTURES.get(step, STEP_APP_CAPTURES[0])
    step_w, part_w = STEP_WORD.get(lang, ("STEP", "PART"))
    clip_paths = []

    for s_idx, (headline, sub_label, narration) in enumerate(scenes):
        clip_id = f"v99_step{step}_shot{s_idx + 1}_{lang}"
        mode, look_idx, start_sec, shot_badge, _orig_sub = sources[s_idx % len(sources)]
        cap_base, _cap_caption = cap_specs[s_idx % len(cap_specs)]
        cap_path = resolve_localized_capture_path(cap_base, lang)

        overlay_png = TMP_MULTI_DIR / f"{clip_id}_overlay.png"
        build_transparent_hud_overlay(
            step_num=step,
            shot_idx=s_idx,
            shot_badge=shot_badge,
            headline=headline,
            sub_label=sub_label,
            narration_text=narration,
            pip_img_path=cap_path,
            pip_caption=f"THEBESTBRAND STUDIO · {step_w} 0{step} ({lang.upper()})",
            out_png=overlay_png,
            show_app_card=(mode == "heygen_app_card"),
            step_word=step_w,
            part_word=part_w,
        )

        audio_m4a = synthesize_localized_founder_voice_m4a(narration, lang, clip_id)
        clip_mp4 = TMP_MULTI_DIR / f"{clip_id}.mp4"
        poster_path = (VIDEOS_OUT_DIR / f"poster_paso_{step}_{lang}.jpg") if s_idx == 0 else None

        build_dynamic_heygen_flow_clip(
            mode=mode,
            look_idx=look_idx,
            start_sec=start_sec,
            overlay_png=overlay_png,
            audio_m4a=audio_m4a,
            out_mp4=clip_mp4,
            poster_jpg=poster_path,
        )
        clip_paths.append(clip_mp4)

    concat_txt = TMP_MULTI_DIR / f"concat_step_{step}_{lang}.txt"
    with open(concat_txt, "w") as cf:
        for cp in clip_paths:
            cf.write(f"file '{cp.resolve()}'\n")

    out_step_mp4 = VIDEOS_OUT_DIR / f"capsula_teoria_paso_{step}_{lang}.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_txt), "-c", "copy", "-movflags", "+faststart",
        str(out_step_mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    shutil.copy2(out_step_mp4, API_VIDEOS_OUT_DIR / out_step_mp4.name)
    poster_file = VIDEOS_OUT_DIR / f"poster_paso_{step}_{lang}.jpg"
    if poster_file.exists():
        shutil.copy2(poster_file, API_VIDEOS_OUT_DIR / poster_file.name)

    dur = round(get_duration(out_step_mp4), 1)
    print(f"  ✓ [{lang.upper()}] {out_step_mp4.name} ({dur}s, HeyGen Look {step} Lip-Sync + Voz Masculina 132Hz)")


def ease_in_out_cubic(x: float) -> float:
    x = max(0.0, min(1.0, x))
    return 4 * x * x * x if x < 0.5 else 1 - pow(-2 * x + 2, 3) / 2


def generate_hero_video_for_lang(lang: str):
    cfg = HERO_I18N[lang]
    W, H = 1280, 720
    FPS = 24
    DURATION = 12.0
    TOTAL_FRAMES = int(FPS * DURATION)
    frames_dir = TMP_MULTI_DIR / f"hero_frames_{lang}"
    frames_dir.mkdir(parents=True, exist_ok=True)

    try:
        f_kicker = ImageFont.truetype(FONT_BOLD, 13)
        f_title = ImageFont.truetype(FONT_BOLD, 26)
        f_sub = ImageFont.truetype(FONT_SEMI, 15)
        f_node_t = ImageFont.truetype(FONT_BOLD, 14)
        f_node_s = ImageFont.truetype(FONT_REG, 12)
        f_node_b = ImageFont.truetype(FONT_BOLD, 11)
    except Exception:
        f_kicker = f_title = f_sub = f_node_t = f_node_s = f_node_b = ImageFont.load_default()

    logo_path = LOGOS_DIR / "tbb_official_liquid_glass_logo.jpg"
    logo_img = Image.open(logo_path).convert("RGBA") if logo_path.exists() else None
    app_cap_path = CAPTURES_DIR / f"step0_logo_aura_{lang}.png"
    if not app_cap_path.exists():
        app_cap_path = CAPTURES_DIR / "step0_logo_aura.png"
    app_cap = Image.open(app_cap_path).convert("RGBA") if app_cap_path.exists() else None
    plate1_path = PLATES_DIR / "plate-01.jpg"
    plate1 = Image.open(plate1_path).convert("RGBA") if plate1_path.exists() else None

    cx, cy = W // 2, 338
    for fidx in range(TOTAL_FRAMES):
        t = fidx / FPS
        img = Image.new("RGBA", (W, H), (248, 250, 252, 255))
        draw = ImageDraw.Draw(img)

        for gx in range(0, W, 64):
            draw.line([(gx, 0), (gx, H)], fill=(226, 232, 240, 110), width=1)
        for gy in range(0, H, 64):
            draw.line([(0, gy), (W, gy)], fill=(226, 232, 240, 110), width=1)

        for r_idx, rad in enumerate([245, 180, 118]):
            pulse = math.sin(t * 2.2 + r_idx) * 4
            col = (203, 213, 225, 160) if r_idx < 2 else (147, 197, 253, 210)
            draw.ellipse([cx - rad - pulse, cy - rad - pulse, cx + rad + pulse, cy + rad + pulse], outline=col, width=2)

        draw.rounded_rectangle([W // 2 - 290, 18, W // 2 + 290, 52], radius=17, fill=(255, 255, 255, 245), outline=(203, 213, 225, 255), width=1)
        draw.ellipse([W // 2 - 272, 29, W // 2 - 260, 41], fill=(234, 88, 12, 255))
        draw.text((W // 2 - 248, 28), cfg["kicker"], font=f_kicker, fill=(13, 37, 64, 255))

        conv_p = ease_in_out_cubic((t - 4.0) / 2.6) if t > 4.0 else 0.0
        reveal_p = ease_in_out_cubic((t - 6.4) / 1.8) if t > 6.4 else 0.0

        if conv_p < 0.99:
            base_rx = 415 * (1.0 - conv_p * 0.88)
            base_ry = 185 * (1.0 - conv_p * 0.88)
            node_alpha = int(255 * (1.0 - max(0.0, (conv_p - 0.72) / 0.28)))
            for i, (t_code, t_author, t_rgb, t_pill) in enumerate(cfg["theories"]):
                angle = (i / 6.0) * math.pi * 2 - math.pi / 3 + t * 0.28 + conv_p * 1.8
                nx = int(cx + math.cos(angle) * base_rx)
                ny = int(cy + math.sin(angle) * base_ry)
                draw.line([(nx, ny), (cx, cy)], fill=(t_rgb[0], t_rgb[1], t_rgb[2], int(140 * (1 - conv_p * 0.5))), width=3)
                beam_prog = ((t * 1.4 + i * 0.17) % 1.0)
                px = int(nx + (cx - nx) * beam_prog)
                py = int(ny + (cy - ny) * beam_prog)
                draw.ellipse([px - 5, py - 5, px + 5, py + 5], fill=(234, 88, 12, node_alpha))
                cw, ch = 228, 86
                x0, y0 = nx - cw // 2, ny - ch // 2
                draw.rounded_rectangle([x0, y0, x0 + cw, y0 + ch], radius=16, fill=(255, 255, 255, min(248, node_alpha)), outline=(t_rgb[0], t_rgb[1], t_rgb[2], node_alpha), width=2)
                draw.text((x0 + 14, y0 + 12), t_code, font=f_node_t, fill=(t_rgb[0], t_rgb[1], t_rgb[2], node_alpha))
                draw.text((x0 + 14, y0 + 34), t_author, font=f_node_s, fill=(51, 65, 85, node_alpha))
                draw.rounded_rectangle([x0 + 14, y0 + 56, x0 + cw - 14, y0 + 76], radius=8, fill=(241, 245, 249, node_alpha))
                draw.text((x0 + 22, y0 + 59), t_pill, font=f_node_b, fill=(15, 23, 42, node_alpha))

        core_r = int(68 + conv_p * 34 - reveal_p * 18)
        draw.ellipse([cx - core_r - 10, cy - core_r - 10, cx + core_r + 10, cy + core_r + 10], fill=(29, 78, 216, int(45 + conv_p * 60)))

        if reveal_p > 0.01:
            alpha_rev = int(255 * reveal_p)
            slide_offset = int((1.0 - reveal_p) * 60)
            if app_cap is not None:
                card_w, card_h = 375, 240
                lx = 55 - slide_offset // 2
                ly = cy - card_h // 2 - 14
                draw.rounded_rectangle([lx - 6, ly - 34, lx + card_w + 6, ly + card_h + 6], radius=18, fill=(255, 255, 255, alpha_rev), outline=(29, 78, 216, alpha_rev), width=2)
                draw.text((lx + 12, ly - 24), cfg["left_card"], font=f_node_b, fill=(29, 78, 216, alpha_rev))
                cap_resized = app_cap.resize((card_w, card_h), Image.Resampling.LANCZOS)
                if alpha_rev < 255:
                    cap_resized.putalpha(alpha_rev)
                img.alpha_composite(cap_resized, (lx, ly))

            if plate1 is not None:
                card_w, card_h = 375, 240
                rx = 850 + slide_offset // 2
                ry = cy - card_h // 2 - 14
                draw.rounded_rectangle([rx - 6, ry - 34, rx + card_w + 6, ry + card_h + 6], radius=18, fill=(255, 255, 255, alpha_rev), outline=(234, 88, 12, alpha_rev), width=2)
                draw.text((rx + 12, ry - 24), cfg["right_card"], font=f_node_b, fill=(234, 88, 12, alpha_rev))
                pl_resized = plate1.resize((card_w, card_h), Image.Resampling.LANCZOS)
                if alpha_rev < 255:
                    pl_resized.putalpha(alpha_rev)
                img.alpha_composite(pl_resized, (rx, ry))

        if logo_img is not None:
            logo_sz = int(116 + conv_p * 38)
            l_resized = logo_img.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
            mask = Image.new("L", (logo_sz, logo_sz), 0)
            ImageDraw.Draw(mask).ellipse([0, 0, logo_sz, logo_sz], fill=255)
            circ_logo = Image.new("RGBA", (logo_sz, logo_sz), (0, 0, 0, 0))
            circ_logo.paste(l_resized, (0, 0), mask)
            draw.ellipse([cx - logo_sz // 2 - 5, cy - logo_sz // 2 - 5, cx + logo_sz // 2 + 5, cy + logo_sz // 2 + 5], fill=(255, 255, 255, 255), outline=(234, 88, 12, 255) if conv_p > 0.5 else (29, 78, 216, 255), width=4)
            img.alpha_composite(circ_logo, (cx - logo_sz // 2, cy - logo_sz // 2))

        draw.rounded_rectangle([80, H - 96, W - 80, H - 18], radius=20, fill=(255, 255, 255, 248), outline=(203, 213, 225, 255), width=2)
        if t < 4.5:
            stage_title, stage_desc = cfg["stage1_t"], cfg["stage1_d"]
        elif t < 7.5:
            stage_title, stage_desc = cfg["stage2_t"], cfg["stage2_d"]
        else:
            stage_title, stage_desc = cfg["stage3_t"], cfg["stage3_d"]

        draw.text((112, H - 84), stage_title, font=f_title, fill=(15, 23, 42, 255))
        draw.text((112, H - 48), stage_desc, font=f_sub, fill=(71, 85, 105, 255))

        frame_file = frames_dir / f"frame_{fidx:04d}.jpg"
        img.convert("RGB").save(frame_file, "JPEG", quality=90)

    hero_audio = synthesize_localized_founder_voice_m4a(cfg["narration"], lang, f"hero_convergence_{lang}")
    out_mp4 = VIDEOS_OUT_DIR / f"hero_convergence_thebestbrand_{lang}.mp4"
    poster_jpg = VIDEOS_OUT_DIR / f"poster_hero_convergence_{lang}.jpg"

    subprocess.run([
        "ffmpeg", "-y",
        "-framerate", str(FPS),
        "-i", str(frames_dir / "frame_%04d.jpg"),
        "-i", str(hero_audio),
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "21",
        "-c:a", "aac", "-b:a", "128k",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-shortest",
        str(out_mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    subprocess.run([
        "ffmpeg", "-y",
        "-i", str(out_mp4),
        "-ss", "00:00:08.00",
        "-frames:v", "1",
        "-q:v", "2",
        str(poster_jpg)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"  ✓ [{lang.upper()}] {out_mp4.name} listo")


def add_spanish_voice_to_hero():
    """Añade voz narrada en español al video Hero de convergencia principal."""
    es_narration = "Seis teorías científicas de clase mundial convergen en tiempo real con Aura y Nano Banana Pro para crear tu marca y tus nueve entregables oficiales en treinta minutos."
    es_audio = synthesize_localized_founder_voice_m4a(es_narration, "es", "hero_convergence_es")
    orig_mp4 = VIDEOS_OUT_DIR / "hero_convergence_thebestbrand.mp4"
    tmp_mp4 = TMP_MULTI_DIR / "hero_convergence_es_voiced.mp4"
    if orig_mp4.exists():
        subprocess.run([
            "ffmpeg", "-y",
            "-i", str(orig_mp4),
            "-i", str(es_audio),
            "-map", "0:v:0", "-map", "1:a:0",
            "-c:v", "copy", "-c:a", "aac", "-b:a", "128k",
            "-movflags", "+faststart", "-shortest",
            str(tmp_mp4)
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        import shutil
        shutil.move(str(tmp_mp4), str(orig_mp4))
        print("  ✓ [ES] hero_convergence_thebestbrand.mp4 actualizado con narración en español")


def main():
    print("=== Generando los 35 videos multilingües de Pasos 0..6 (EN, FR, PT, DE, IT) con Avatar HeyGen Jorge Improbears ===")

    tasks = []
    with ThreadPoolExecutor(max_workers=4) as ex:
        for lang in LANGS:
            for step in range(7):
                tasks.append(ex.submit(generate_step_capsule_for_lang, lang, step))
        for t in tasks:
            t.result()

    print("\n✓ Los 35 videos multilingües (7 Pasos x 5 idiomas) generados con éxito.")


if __name__ == "__main__":
    main()
