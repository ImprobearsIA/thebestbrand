import fs from "fs";

let content = fs.readFileSync("apps/web/tbb-v80-brandbook-plates.js", "utf8");

const tbbObjStr = `
  const THE_BEST_BRAND_OFFICIAL_PROFILE = {
    "id": 0,
    "name": "The Best Brand",
    "slug": "the_best_brand",
    "tagline": "BRAND IDENTITY ATELIER & MOTOR ALGORÍTMICO",
    "category": "Tecnología / Luxury Brand Identity Atelier",
    "giro": "Atelier de identidad de marca algorítmica y motor editorial de Brandbooks de 30 láminas en curvas matemáticas puras.",
    "buyer": "Líderes de empresas consolidadas y fundadores exigentes que valoran su tiempo y exigen excelencia técnica sin plantillas genéricas.",
    "why": "Porque el tiempo mental del líder es sagrado; unimos la calidez de una mentora de clase mundial con el rigor matemático de curvas vectoriales.",
    "how": "Diálogo socrático de 7 pasos con Aura, calibración estética en tiempo real y síntesis geométrica en vectores.",
    "what": "Manual de Identidad de 30 Láminas en Curvas (.PDF), suite vectorial abierta y bóveda digital permanente.",
    "persona": "Jorge Benítez 'El Oso': mente de ingeniero, fuerza tranquila y socio leal que escucha primero y profesionaliza hombro a hombro.",
    "niza": "Clase 42 (Servicios tecnológicos y diseño de software e identidad) y Clase 35 (Consultoría de negocios).",
    "tpBefore": [
      "Landing page en lienzo claro con tiempo de carga inferior a 0.8 segundos",
      "Demo interactivo en tiempo real sin requerir tarjeta de crédito previa",
      "Video explicativo en Full HD 1080p guiado por la voz neural de Aura",
      "Portafolio editorial de Brandbooks reales creados para múltiples industrias"
    ],
    "tpDuring": [
      "Atelier conversacional con Aura respondiendo en lenguaje natural empático",
      "Algoritmo de validación de naming con Clases Niza y test fonético",
      "Calibración de afinidad estética con sliders bipolares a 60 FPS",
      "Checkout transparente y seguro con Stripe y entrega inmediata"
    ],
    "tpAfter": [
      "Descarga instantánea del PDF de 30 láminas vectoriales de alta resolución",
      "Kit de isotipos abiertos en SVG transparente y PNG a 4000 px",
      "Bóveda digital permanente con acceso vitalicio a los activos de marca",
      "Acompañamiento post-venta y soporte directo para aplicaciones impresas y digitales"
    ],
    "colors": {
      "pri": "#0D2540",
      "sec": "#426EAE",
      "acc": "#FF7A00",
      "darkInk": "#0D2540",
      "midGray": "#707070",
      "lightGray": "#E6E6E6",
      "softBg": "#F8FAFC",
      "white": "#FFFFFF",
      "pantonePri": "Pantone 296 C",
      "pantoneSec": "Pantone 7683 C",
      "cmykPri": "C:100 M:80 Y:40 K:50",
      "cmykSec": "C:75 M:45 Y:5 K:0"
    },
    "primaryFont": "Montserrat",
    "secondaryFont": "Plus Jakarta Sans",
    "isEstablished": true,
    "isMultibrand": false,
    "svgCore": "<g transform=\\"translate(10,10)\\"><defs><linearGradient id=\\"tbbWingBlue_bb\\" x1=\\"10%\\" y1=\\"0%\\" x2=\\"90%\\" y2=\\"100%\\"><stop offset=\\"0%\\" stop-color=\\"#60A5FA\\"/><stop offset=\\"42%\\" stop-color=\\"#426EAE\\"/><stop offset=\\"85%\\" stop-color=\\"#0D2540\\"/><stop offset=\\"100%\\" stop-color=\\"#050811\\"/></linearGradient><linearGradient id=\\"tbbWingOrange_bb\\" x1=\\"0%\\" y1=\\"0%\\" x2=\\"95%\\" y2=\\"100%\\"><stop offset=\\"0%\\" stop-color=\\"#FEF08A\\"/><stop offset=\\"45%\\" stop-color=\\"#FF7A00\\"/><stop offset=\\"85%\\" stop-color=\\"#EA580C\\"/><stop offset=\\"100%\\" stop-color=\\"#9A3412\\"/></linearGradient><linearGradient id=\\"tbbRibbon_bb\\" x1=\\"0%\\" y1=\\"0%\\" x2=\\"100%\\" y2=\\"100%\\"><stop offset=\\"0%\\" stop-color=\\"#FFFFFF\\" stop-opacity=\\"0.98\\"/><stop offset=\\"50%\\" stop-color=\\"#E0F2FE\\" stop-opacity=\\"0.92\\"/><stop offset=\\"100%\\" stop-color=\\"#93C5FD\\" stop-opacity=\\"0.85\\"/></linearGradient></defs><circle cx=\\"90\\" cy=\\"90\\" r=\\"64\\" fill=\\"#426EAE\\" opacity=\\"0.10\\"/><path d=\\"M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z\\" fill=\\"url(#tbbWingBlue_bb)\\" stroke=\\"#93C5FD\\" stroke-width=\\"1.4\\"/><path d=\\"M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z\\" fill=\\"url(#tbbWingOrange_bb)\\" stroke=\\"#FDE68A\\" stroke-width=\\"1.4\\"/><path d=\\"M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z\\" fill=\\"url(#tbbRibbon_bb)\\" opacity=\\"0.92\\"/><circle cx=\\"90\\" cy=\\"90\\" r=\\"28\\" fill=\\"#0D2540\\" stroke=\\"#FFFFFF\\" stroke-width=\\"2.4\\"/><ellipse cx=\\"82\\" cy=\\"78\\" rx=\\"14\\" ry=\\"7\\" transform=\\"rotate(-28 82 78)\\" fill=\\"#FFFFFF\\" opacity=\\"0.30\\"/><text x=\\"90\\" y=\\"97.5\\" text-anchor=\\"middle\\" fill=\\"#FFFFFF\\" font-family=\\"'Montserrat', sans-serif\\" font-weight=\\"900\\" font-size=\\"20\\" letter-spacing=\\"1\\">TB</text><path d=\\"M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z\\" fill=\\"#FF7A00\\" stroke=\\"#FFFFFF\\" stroke-width=\\"1.2\\"/></g>",
    "svgCoreNeg": "<g transform=\\"translate(10,10)\\"><defs><linearGradient id=\\"tbbWingBlueNeg_bb\\" x1=\\"0%\\" y1=\\"0%\\" x2=\\"100%\\" y2=\\"100%\\"><stop offset=\\"0%\\" stop-color=\\"#FFFFFF\\"/><stop offset=\\"50%\\" stop-color=\\"#93C5FD\\"/><stop offset=\\"100%\\" stop-color=\\"#4C9DE6\\"/></linearGradient><linearGradient id=\\"tbbWingOrangeNeg_bb\\" x1=\\"0%\\" y1=\\"0%\\" x2=\\"100%\\" y2=\\"100%\\"><stop offset=\\"0%\\" stop-color=\\"#FEF08A\\"/><stop offset=\\"60%\\" stop-color=\\"#FF7A00\\"/><stop offset=\\"100%\\" stop-color=\\"#EA580C\\"/></linearGradient></defs><circle cx=\\"90\\" cy=\\"90\\" r=\\"64\\" fill=\\"#FFFFFF\\" opacity=\\"0.08\\"/><path d=\\"M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z\\" fill=\\"url(#tbbWingBlueNeg_bb)\\" stroke=\\"#93C5FD\\" stroke-width=\\"1.4\\"/><path d=\\"M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z\\" fill=\\"url(#tbbWingOrangeNeg_bb)\\" stroke=\\"#FDE68A\\" stroke-width=\\"1.4\\"/><path d=\\"M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z\\" fill=\\"#FFFFFF\\" opacity=\\"0.92\\"/><circle cx=\\"90\\" cy=\\"90\\" r=\\"28\\" fill=\\"#0D2540\\" stroke=\\"#FFFFFF\\" stroke-width=\\"2.4\\"/><text x=\\"90\\" y=\\"97.5\\" text-anchor=\\"middle\\" fill=\\"#FFFFFF\\" font-family=\\"'Montserrat', sans-serif\\" font-weight=\\"900\\" font-size=\\"20\\" letter-spacing=\\"1\\">TB</text><path d=\\"M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z\\" fill=\\"#FEF08A\\" stroke=\\"#FFFFFF\\" stroke-width=\\"1.2\\"/></g>"
  };
`;

if (!content.includes("THE_BEST_BRAND_OFFICIAL_PROFILE")) {
  content = content.replace("window.CATALOG_30_MAP = {", tbbObjStr + "\n  window.CATALOG_30_MAP = {\n    \"the_best_brand\": THE_BEST_BRAND_OFFICIAL_PROFILE,\n    \"thebestbrand\": THE_BEST_BRAND_OFFICIAL_PROFILE,\n    \"the best brand\": THE_BEST_BRAND_OFFICIAL_PROFILE,");
  fs.writeFileSync("apps/web/tbb-v80-brandbook-plates.js", content, "utf8");
  console.log("Successfully injected THE_BEST_BRAND_OFFICIAL_PROFILE into CATALOG_30_MAP!");
} else {
  console.log("THE_BEST_BRAND_OFFICIAL_PROFILE already present.");
}
