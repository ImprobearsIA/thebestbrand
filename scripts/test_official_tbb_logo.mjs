import { chromium } from "/Users/oso/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import fs from "fs";

function getOfficialTbbLogoSvg(uid = "test", isNeg = false) {
  const pri = "#0D2540";
  const sec = "#426EAE";
  const acc = "#FF7A00";

  if (isNeg) {
    return `
      <svg viewBox="0 0 180 180" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tbbWingBlueNeg_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="50%" stop-color="#93C5FD"/>
            <stop offset="100%" stop-color="#4C9DE6"/>
          </linearGradient>
          <linearGradient id="tbbWingOrangeNeg_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FEF08A"/>
            <stop offset="60%" stop-color="#FF7A00"/>
            <stop offset="100%" stop-color="#EA580C"/>
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r="64" fill="#FFFFFF" opacity="0.08"/>
        <!-- Ala Azul Izquierda -->
        <path d="M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z" fill="url(#tbbWingBlueNeg_${uid})" stroke="#93C5FD" stroke-width="1.4"/>
        <!-- Ala Naranja Derecha -->
        <path d="M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z" fill="url(#tbbWingOrangeNeg_${uid})" stroke="#FDE68A" stroke-width="1.4"/>
        <!-- Cinta Luminosa Conectora -->
        <path d="M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z" fill="#FFFFFF" opacity="0.92"/>
        <!-- Núcleo Central Monograma TB -->
        <circle cx="90" cy="90" r="28" fill="#0D2540" stroke="#FFFFFF" stroke-width="2.4"/>
        <text x="90" y="97.5" text-anchor="middle" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20" letter-spacing="1">TB</text>
        <!-- Estrella Guía Aura -->
        <path d="M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z" fill="#FEF08A" stroke="#FFFFFF" stroke-width="1.2"/>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 180 180" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tbbWingBlue_${uid}" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stop-color="#60A5FA"/>
          <stop offset="42%" stop-color="${sec}"/>
          <stop offset="85%" stop-color="${pri}"/>
          <stop offset="100%" stop-color="#050811"/>
        </linearGradient>
        <linearGradient id="tbbWingOrange_${uid}" x1="0%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="45%" stop-color="${acc}"/>
          <stop offset="85%" stop-color="#EA580C"/>
          <stop offset="100%" stop-color="#9A3412"/>
        </linearGradient>
        <linearGradient id="tbbRibbon_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.98"/>
          <stop offset="50%" stop-color="#E0F2FE" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="#93C5FD" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <circle cx="90" cy="90" r="64" fill="${sec}" opacity="0.10"/>
      <!-- Ala Azul Izquierda (Tecnología & Rigor) -->
      <path d="M 90 152 C 42 146, 18 102, 34 54 C 46 22, 82 24, 92 56 C 72 46, 52 64, 56 92 C 60 118, 78 134, 90 152 Z" fill="url(#tbbWingBlue_${uid})" stroke="#93C5FD" stroke-width="1.4"/>
      <!-- Ala Naranja Derecha (Creatividad & Factor Humano) -->
      <path d="M 90 28 C 138 34, 162 78, 146 126 C 134 158, 98 156, 88 124 C 108 134, 128 116, 124 88 C 120 62, 102 46, 90 28 Z" fill="url(#tbbWingOrange_${uid})" stroke="#FDE68A" stroke-width="1.4"/>
      <!-- Cinta Luminosa de Integración -->
      <path d="M 42 118 C 56 68, 124 112, 138 62 C 144 88, 114 132, 90 132 C 64 132, 40 126, 42 118 Z" fill="url(#tbbRibbon_${uid})" opacity="0.92"/>
      <!-- Núcleo Central Monograma TB -->
      <circle cx="90" cy="90" r="28" fill="${pri}" stroke="#FFFFFF" stroke-width="2.4"/>
      <ellipse cx="82" cy="78" rx="14" ry="7" transform="rotate(-28 82 78)" fill="#FFFFFF" opacity="0.30"/>
      <text x="90" y="97.5" text-anchor="middle" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20" letter-spacing="1">TB</text>
      <!-- Estrella Guía Aura -->
      <path d="M 142 26 L 145 35 L 154 38 L 145 41 L 142 50 L 139 41 L 130 38 L 139 35 Z" fill="#FF7A00" stroke="#FFFFFF" stroke-width="1.2"/>
    </svg>
  `;
}

async function renderTest() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&display=swap" rel="stylesheet">
      <style>
        body { margin:0; padding:40px; display:flex; gap:40px; background:#F8FAFC; font-family:Montserrat,sans-serif; }
        .box { padding:30px; border-radius:16px; background:#FFFFFF; border:1px solid #E2E8F0; text-align:center; }
        .box-dark { background:#0D2540; color:#FFFFFF; border-color:#0D2540; }
        h3 { margin:0 0 15px 0; font-size:14px; text-transform:uppercase; letter-spacing:0.1em; }
      </style>
    </head>
    <body>
      <div class="box">
        <h3>Oficial en Positivo</h3>
        ${getOfficialTbbLogoSvg("pos", false)}
        <div style="margin-top:14px; font-weight:900; font-size:16px; color:#0D2540;">THE BEST BRAND</div>
        <div style="font-weight:700; font-size:9px; color:#426EAE; letter-spacing:0.2em;">BRAND IDENTITY ATELIER</div>
      </div>
      <div class="box box-dark">
        <h3>Oficial en Negativo Calado</h3>
        ${getOfficialTbbLogoSvg("neg", true)}
        <div style="margin-top:14px; font-weight:900; font-size:16px; color:#FFFFFF;">THE BEST BRAND</div>
        <div style="font-weight:700; font-size:9px; color:#4C9DE6; letter-spacing:0.2em;">BRAND IDENTITY ATELIER</div>
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync("/tmp/tbb_logo_test.html", html);
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage({ viewport: { width: 800, height: 400 } });
  await page.goto("file:///tmp/tbb_logo_test.html");
  await page.waitForTimeout(500);
  await page.screenshot({ path: "/tmp/tbb_logo_test.png" });
  await browser.close();
  console.log("Screenshot saved to /tmp/tbb_logo_test.png");
}

renderTest();
