import fs from "fs";

let code = fs.readFileSync("scripts/build_flawless_brandbook_30_v80.mjs", "utf8");

// 1. Replace symCore and symCoreNeg
const oldSymCoreTarget = `  // Isotipo Vectorial Radiant Nexus (8 Facetas de Proporción Áurea)
  const symCore = \`
    <g transform="translate(100,100)">
      <!-- 4 Pétalos Mayores en Cruz (Deep Navy) -->
      <path d="M 0,-76 L 19,-24 L 0,-6 L -19,-24 Z" fill="\${pri}"/>
      <path d="M 76,0 L 24,19 L 6,0 L 24,-19 Z" fill="\${pri}"/>
      <path d="M 0,76 L -19,24 L 0,6 L 19,24 Z" fill="\${pri}"/>
      <path d="M -76,0 L -24,-19 L -6,0 L -24,19 Z" fill="\${pri}"/>
      
      <!-- 4 Pétalos Menores Diagonales (Zafiro) -->
      <path d="M 48,-48 L 34,-14 L 14,-14 L 14,-34 Z" fill="\${sec}"/>
      <path d="M 48,48 L 14,34 L 14,14 L 34,14 Z" fill="\${sec}"/>
      <path d="M -48,48 L -34,14 L -14,14 L -14,34 Z" fill="\${sec}"/>
      <path d="M -48,-48 L -14,-34 L -14,-14 L -34,-14 Z" fill="\${sec}"/>
      
      <!-- Núcleo Dorado / Naranja -->
      <circle cx="0" cy="0" r="6.5" fill="\${acc}"/>
    </g>
  \`;

  // Versión Negativa Calada del Isotipo (Blanco + Zafiro + Naranja)
  const symCoreNeg = \`
    <g transform="translate(100,100)">
      <path d="M 0,-76 L 19,-24 L 0,-6 L -19,-24 Z" fill="#FFFFFF"/>
      <path d="M 76,0 L 24,19 L 6,0 L 24,-19 Z" fill="#FFFFFF"/>
      <path d="M 0,76 L -19,24 L 0,6 L 19,24 Z" fill="#FFFFFF"/>
      <path d="M -76,0 L -24,-19 L -6,0 L -24,19 Z" fill="#FFFFFF"/>
      
      <path d="M 48,-48 L 34,-14 L 14,-14 L 14,-34 Z" fill="#4C9DE6"/>
      <path d="M 48,48 L 14,34 L 14,14 L 34,14 Z" fill="#4C9DE6"/>
      <path d="M -48,48 L -34,14 L -14,14 L -14,34 Z" fill="#4C9DE6"/>
      <path d="M -48,-48 L -14,-34 L -14,-14 L -34,-14 Z" fill="#4C9DE6"/>
      
      <circle cx="0" cy="0" r="6.5" fill="\${acc}"/>
    </g>
  \`;`;

const newSymCoreReplacement = `  // Isotipo Vectorial Oficial The Best Brand: Alas de Convergencia & Núcleo Central TB
  const symCore = \`
    <g transform="translate(10,10)">
      <defs>
        <linearGradient id="tbbWingBlue_bb" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stop-color="#60A5FA"/>
          <stop offset="42%" stop-color="\${sec}"/>
          <stop offset="85%" stop-color="\${pri}"/>
          <stop offset="100%" stop-color="#050811"/>
        </linearGradient>
        <linearGradient id="tbbWingOrange_bb" x1="0%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="45%" stop-color="\${acc}"/>
          <stop offset="85%" stop-color="#EA580C"/>
          <stop offset="100%" stop-color="#9A3412"/>
        </linearGradient>
        <linearGradient id="tbbRibbon_bb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.98"/>
          <stop offset="50%" stop-color="#E0F2FE" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="#93C5FD" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <circle cx="90" cy="90" r="64" fill="\${sec}" opacity="0.10"/>
      <!-- Ala Azul Izquierda (Tecnología & Rigor) -->
      <path d="M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z" fill="url(#tbbWingBlue_bb)" stroke="#93C5FD" stroke-width="1.4"/>
      <!-- Ala Naranja Derecha (Creatividad & Factor Humano) -->
      <path d="M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z" fill="url(#tbbWingOrange_bb)" stroke="#FDE68A" stroke-width="1.4"/>
      <!-- Cinta Luminosa de Integración -->
      <path d="M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z" fill="url(#tbbRibbon_bb)" opacity="0.92"/>
      <!-- Núcleo Central Monograma TB -->
      <circle cx="90" cy="90" r="28" fill="\${pri}" stroke="#FFFFFF" stroke-width="2.4"/>
      <ellipse cx="82" cy="78" rx="14" ry="7" transform="rotate(-28 82 78)" fill="#FFFFFF" opacity="0.30"/>
      <text x="90" y="97.5" text-anchor="middle" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20" letter-spacing="1">TB</text>
      <!-- Estrella Guía Aura -->
      <path d="M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z" fill="\${acc}" stroke="#FFFFFF" stroke-width="1.2"/>
    </g>
  \`;

  // Versión Negativa Calada del Isotipo (Blanco + Zafiro + Naranja)
  const symCoreNeg = \`
    <g transform="translate(10,10)">
      <defs>
        <linearGradient id="tbbWingBlueNeg_bb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="#93C5FD"/>
          <stop offset="100%" stop-color="#4C9DE6"/>
        </linearGradient>
        <linearGradient id="tbbWingOrangeNeg_bb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="60%" stop-color="\${acc}"/>
          <stop offset="100%" stop-color="#EA580C"/>
        </linearGradient>
      </defs>
      <circle cx="90" cy="90" r="64" fill="#FFFFFF" opacity="0.08"/>
      <!-- Ala Azul Izquierda -->
      <path d="M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z" fill="url(#tbbWingBlueNeg_bb)" stroke="#93C5FD" stroke-width="1.4"/>
      <!-- Ala Naranja Derecha -->
      <path d="M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z" fill="url(#tbbWingOrangeNeg_bb)" stroke="#FDE68A" stroke-width="1.4"/>
      <!-- Cinta Luminosa Conectora -->
      <path d="M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z" fill="#FFFFFF" opacity="0.92"/>
      <!-- Núcleo Central Monograma TB -->
      <circle cx="90" cy="90" r="28" fill="\${pri}" stroke="#FFFFFF" stroke-width="2.4"/>
      <text x="90" y="97.5" text-anchor="middle" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20" letter-spacing="1">TB</text>
      <!-- Estrella Guía Aura -->
      <path d="M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z" fill="#FEF08A" stroke="#FFFFFF" stroke-width="1.2"/>
    </g>
  \`;`;

if (!code.includes(oldSymCoreTarget)) {
  console.error("Target symCore not found in code!");
  process.exit(1);
}

code = code.replace(oldSymCoreTarget, newSymCoreReplacement);

// 2. Adjust logoHoriz and logoHorizNeg scale and translation
code = code.replace(
  `<line x1="96" y1="26" x2="96" y2="84" stroke="\${lightGray}" stroke-width="1.8"/>\n      <text x="114" y="52"`,
  `<line x1="116" y1="26" x2="116" y2="84" stroke="\${lightGray}" stroke-width="1.8"/>\n      <text x="132" y="52"`
);
code = code.replace(
  `<line x1="96" y1="26" x2="96" y2="84" stroke="rgba(255,255,255,0.25)" stroke-width="1.8"/>\n      <text x="114" y="52"`,
  `<line x1="116" y1="26" x2="116" y2="84" stroke="rgba(255,255,255,0.25)" stroke-width="1.8"/>\n      <text x="132" y="52"`
);
code = code.replace(/text x="114" y="74"/g, 'text x="132" y="74"');

// 3. Update Plate 15 description of the symbol
code = code.replace(
  `El Radiant Star Nexus: Foco y Expansión`,
  `Alas de Convergencia & Núcleo Central TB`
);
code = code.replace(
  `PÉTALO AXIAL (NAVY)`,
  `ALA AZUL (RIGOR & IA)`
);
code = code.replace(
  `FACETA ÁUREA 45° (ZAFIRO)`,
  `ALA NARANJA (FACTOR HUMANO)`
);
code = code.replace(
  `NÚCLEO DORADO (SOL)`,
  `NÚCLEO CENTRAL (TB)`
);

code = code.replace(
  `<strong>Los 4 Ejes Mayores (Solidez &amp; Autoridad):</strong> Orientados en cruz perfecta (N-S-E-O), representan los 4 pilares metodológicos de The Best Brand: Propósito, Estructura, Ejecución y Gobernanza.`,
  `<strong>El Ala Azul Izquierda (Tecnología &amp; Rigor):</strong> Representa el motor de inteligencia algorítmica, las curvas matemáticas Bézier y la solidez estructural en Deep Navy y Zafiro Corporativo.`
);

code = code.replace(
  `<strong>Las 4 Facetas Diagonales a 45° (Precisión &amp; Dinamismo):</strong> Diseñadas con proporciones de diamante pulido, simbolizan la aceleración del tiempo mental y la vanguardia algorítmica.`,
  `<strong>El Ala Naranja Derecha (Creatividad &amp; Factor Humano):</strong> Encarna la calidez de socio leal, la mentoría socrática de Aura y la energía transformadora de la marca en Naranja Acento (#FF7A00).`
);

code = code.replace(
  `<strong>El Núcleo Solar Central (Empatía &amp; Propósito):</strong> El círculo en acento naranja (#FF7A00) es el corazón humano del sistema: Aura y la visión del fundador como centro neurálgico de toda la marca.`,
  `<strong>El Núcleo Central Monograma TB &amp; Estrella Guía:</strong> Escudo protector en Deep Navy con las iniciales TB en blanco de alta legibilidad, custodiado por la Estrella Polar de excelencia creativa.`
);

fs.writeFileSync("scripts/build_flawless_brandbook_30_v80.mjs", code, "utf8");
console.log("Updated scripts/build_flawless_brandbook_30_v80.mjs successfully!");
