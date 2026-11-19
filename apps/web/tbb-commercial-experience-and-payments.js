/**
 * ============================================================================
 * THE BEST BRAND — COMMERCIAL EXPERIENCE, LIVE DEMO HOME & $49 STRIPE ENGINE
 * Edición V129.0 · 200 Mejoras Gauntlet de Campo (Agilidad, Claridad 16+, Aura Viva)
 * - Tagline Rector en Inicio: "Your Brand, Now!!!"
 * - Promesa Clara y Real: Brandbook de +30 páginas + 9 entregables en < 60 minutos
 * - Demo en Vivo persistente como Sección 1 (Inicio) sin perder respuestas al navegar
 * - Lenguaje 100% claro (entendible a los 16 años) en 6 idiomas (ES, EN, FR, PT, DE, IT)
 * - Cero citas académicas fuera de la subpágina 5 (Referencias)
 * - Tipografía orgánica (mínimo 14px / 0.875rem, pesos 400–700, cero saturación bold)
 * - Cápsulas <=15s con una sola voz (Aura Viva · Aoede) + Cero voces fantasma
 * - Checkout limpio $49 USD conectado a Stripe Checkout + Restauración de Cuenta
 * ============================================================================
 */
(function () {
  "use strict";

  const LANG_STORAGE_KEY = "tbb_active_ui_lang_v52";
  const LICENSE_STORAGE_KEY = "tbb_pro_license_v56";
  const ASSET_VERSION = "129.0";

  const TBB_ICONS = {
    home: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6.5h-5V21H4a1 1 0 0 1-1-1v-9.5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="10" r="2" fill="#FF7A00"/></svg>`,
    deliverables: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 4v11m0 0l-4-4m4 4l4-4" stroke="#FF7A00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    appTour: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" stroke-width="2"/><path d="M10 5.5h4" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.5" r="1.3" fill="#FF7A00"/></svg>`,
    cases: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M7 14l3-3 3 2.5 4-4.5" stroke="#FF7A00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    theory: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" stroke="currentColor" stroke-width="2"/><path d="M8 7h8M8 11h5" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`,
    demo: `<svg class="tbb-svg-ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M10 9l5 3-5 3V9z" fill="#FF7A00"/></svg>`,
    play: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(255,122,0,0.14)" stroke="#FF7A00" stroke-width="1.8"/><path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="#FF7A00"/></svg>`,
    lock: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2.5" stroke="currentColor" stroke-width="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`,
    unlock: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2.5" stroke="#10B981" stroke-width="2"/><path d="M8 11V7a4 4 0 0 1 7.5-1.8" stroke="#10B981" stroke-width="2" stroke-linecap="round"/></svg>`,
    check: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" fill="rgba(16,185,129,0.14)" stroke="#10B981" stroke-width="1.8"/><path d="M8 12.3l2.6 2.6 5.4-5.4" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    spark: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" fill="#FF7A00"/></svg>`,
    globe: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 12h17M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" stroke="#426EAE" stroke-width="1.6"/></svg>`,
    close: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    expand: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 4h5v5M9 20H4v-5M20 4l-6 6M4 20l6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    phone: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="18" r="1.2" fill="#FF7A00"/></svg>`,
    desktop: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="4" width="19" height="13" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 20h8M12 17v3" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`,
    arrowRight: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrowLeft: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5m0 0l5-5m-5 5l5 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    shield: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.2 8.7-7 10-3.8-1.3-7-5-7-10V6l7-3z" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke="#FF7A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    card: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="#FF7A00" stroke-width="2"/></svg>`,
    volume: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H3v6h3l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`,
    user: `<svg class="tbb-svg-ic" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.8" stroke="currentColor" stroke-width="2"/><path d="M5 20c1.6-3.4 4.2-5 7-5s5.4 1.6 7 5" stroke="#FF7A00" stroke-width="2" stroke-linecap="round"/></svg>`
  };
  window.TBB_ICONS = TBB_ICONS;

  const TBB_ISOTIPO_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="102" r="87" fill="#090D16" fill-opacity="0.10"/><circle cx="100" cy="100" r="86" fill="#FF7A00"/><circle cx="100" cy="100" r="84.2" fill="none" stroke="#FFF7ED" stroke-width="1.2" stroke-opacity="0.55"/><circle cx="100" cy="100" r="81.2" fill="#EA580C" fill-opacity="0.65"/><circle cx="100" cy="100" r="79.5" fill="#070D19"/><circle cx="100" cy="100" r="76.5" fill="#0D2540" fill-opacity="0.88"/><circle cx="100" cy="96" r="68" fill="#1E3A8A" fill-opacity="0.28"/><circle cx="100" cy="100" r="77.2" fill="none" stroke="#60A5FA" stroke-width="1.3" stroke-opacity="0.42"/><circle cx="100" cy="100" r="56" fill="#38BDF8" fill-opacity="0.12"/><circle cx="100" cy="100" r="44" fill="#426EAE" fill-opacity="0.18"/><path d="M 100.00 87.00 C 86.50 68.00, 81.50 43.00, 100.00 32.00 C 118.50 43.00, 113.50 68.00, 100.00 87.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 88.74 C 104.31 65.54, 112.48 41.39, 134.00 41.11 C 144.52 59.89, 127.69 79.04, 106.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 93.50 C 120.96 72.31, 140.11 55.48, 158.89 66.00 C 158.61 87.52, 134.46 95.69, 111.26 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 113.00 100.00 C 132.00 86.50, 157.00 81.50, 168.00 100.00 C 157.00 118.50, 132.00 113.50, 113.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 106.50 C 134.46 104.31, 158.61 112.48, 158.89 134.00 C 140.11 144.52, 120.96 127.69, 111.26 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 111.26 C 127.69 120.96, 144.52 140.11, 134.00 158.89 C 112.48 158.61, 104.31 134.46, 106.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 100.00 113.00 C 113.50 132.00, 118.50 157.00, 100.00 168.00 C 81.50 157.00, 86.50 132.00, 100.00 113.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 111.26 C 95.69 134.46, 87.52 158.61, 66.00 158.89 C 55.48 140.11, 72.31 120.96, 93.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 106.50 C 79.04 127.69, 59.89 144.52, 41.11 134.00 C 41.39 112.48, 65.54 104.31, 88.74 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 87.00 100.00 C 68.00 113.50, 43.00 118.50, 32.00 100.00 C 43.00 81.50, 68.00 86.50, 87.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 93.50 C 65.54 95.69, 41.39 87.52, 41.11 66.00 C 59.89 55.48, 79.04 72.31, 88.74 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 88.74 C 72.31 79.04, 55.48 59.89, 66.00 41.11 C 87.52 41.39, 95.69 65.54, 93.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><circle cx="100" cy="100" r="28" fill="none" stroke="#93C5FD" stroke-width="0.9" stroke-opacity="0.45"/><circle cx="100" cy="100" r="25" fill="#FF7A00" fill-opacity="0.22"/><circle cx="100" cy="100" r="17.5" fill="#F97316" fill-opacity="0.48"/><circle cx="100" cy="100" r="11.8" fill="#FFEDD5" fill-opacity="0.86"/><circle cx="100" cy="100" r="6.5" fill="#FFFFFF"/><path d="M 42 66 C 56 35, 144 35, 158 66 C 138 50, 62 50, 42 66 Z" fill="#FFFFFF" fill-opacity="0.26"/></svg>`;
  const TBB_ISOTIPO_DATA_URI = "data:image/svg+xml;utf8," + encodeURIComponent(TBB_ISOTIPO_SVG_RAW);

  const TBB_CLEAN_LOGO_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 120" width="430" height="120"><g transform="translate(10, 10) scale(0.5)"><circle cx="100" cy="102" r="87" fill="#090D16" fill-opacity="0.10"/><circle cx="100" cy="100" r="86" fill="#FF7A00"/><circle cx="100" cy="100" r="84.2" fill="none" stroke="#FFF7ED" stroke-width="1.2" stroke-opacity="0.55"/><circle cx="100" cy="100" r="81.2" fill="#EA580C" fill-opacity="0.65"/><circle cx="100" cy="100" r="79.5" fill="#070D19"/><circle cx="100" cy="100" r="76.5" fill="#0D2540" fill-opacity="0.88"/><circle cx="100" cy="96" r="68" fill="#1E3A8A" fill-opacity="0.28"/><circle cx="100" cy="100" r="77.2" fill="none" stroke="#60A5FA" stroke-width="1.3" stroke-opacity="0.42"/><circle cx="100" cy="100" r="56" fill="#38BDF8" fill-opacity="0.12"/><circle cx="100" cy="100" r="44" fill="#426EAE" fill-opacity="0.18"/><path d="M 100.00 87.00 C 86.50 68.00, 81.50 43.00, 100.00 32.00 C 118.50 43.00, 113.50 68.00, 100.00 87.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 88.74 C 104.31 65.54, 112.48 41.39, 134.00 41.11 C 144.52 59.89, 127.69 79.04, 106.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 93.50 C 120.96 72.31, 140.11 55.48, 158.89 66.00 C 158.61 87.52, 134.46 95.69, 111.26 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 113.00 100.00 C 132.00 86.50, 157.00 81.50, 168.00 100.00 C 157.00 118.50, 132.00 113.50, 113.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 111.26 106.50 C 134.46 104.31, 158.61 112.48, 158.89 134.00 C 140.11 144.52, 120.96 127.69, 111.26 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 106.50 111.26 C 127.69 120.96, 144.52 140.11, 134.00 158.89 C 112.48 158.61, 104.31 134.46, 106.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 100.00 113.00 C 113.50 132.00, 118.50 157.00, 100.00 168.00 C 81.50 157.00, 86.50 132.00, 100.00 113.00 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 111.26 C 95.69 134.46, 87.52 158.61, 66.00 158.89 C 55.48 140.11, 72.31 120.96, 93.50 111.26 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 106.50 C 79.04 127.69, 59.89 144.52, 41.11 134.00 C 41.39 112.48, 65.54 104.31, 88.74 106.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 87.00 100.00 C 68.00 113.50, 43.00 118.50, 32.00 100.00 C 43.00 81.50, 68.00 86.50, 87.00 100.00 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 88.74 93.50 C 65.54 95.69, 41.39 87.52, 41.11 66.00 C 59.89 55.48, 79.04 72.31, 88.74 93.50 Z" fill="#38BDF8" fill-opacity="0.28" stroke="#7DD3FC" stroke-width="1.35" stroke-opacity="0.82"/><path d="M 93.50 88.74 C 72.31 79.04, 55.48 59.89, 66.00 41.11 C 87.52 41.39, 95.69 65.54, 93.50 88.74 Z" fill="#426EAE" fill-opacity="0.22" stroke="#60A5FA" stroke-width="1.35" stroke-opacity="0.82"/><circle cx="100" cy="100" r="28" fill="none" stroke="#93C5FD" stroke-width="0.9" stroke-opacity="0.45"/><circle cx="100" cy="100" r="25" fill="#FF7A00" fill-opacity="0.22"/><circle cx="100" cy="100" r="17.5" fill="#F97316" fill-opacity="0.48"/><circle cx="100" cy="100" r="11.8" fill="#FFEDD5" fill-opacity="0.86"/><circle cx="100" cy="100" r="6.5" fill="#FFFFFF"/><path d="M 42 66 C 56 35, 144 35, 158 66 C 138 50, 62 50, 42 66 Z" fill="#FFFFFF" fill-opacity="0.26"/></g><line x1="125" y1="24" x2="125" y2="96" stroke="#CBD5E1" stroke-width="1.8"/><g transform="translate(0, 13)"><path d="M156.570 56L150.434 56L150.434 42.558L145.104 42.558L145.104 37.800L161.900 37.800L161.900 42.558L156.570 42.558L156.570 56ZM183.226 56L177.090 56L177.090 49.292L171.422 49.292L171.422 56L165.286 56L165.286 37.800L171.422 37.800L171.422 44.248L177.090 44.248L177.090 37.800L183.226 37.800L183.226 56ZM203.122 56L187.990 56L187.990 37.800L202.784 37.800L202.784 42.428L194.022 42.428L194.022 44.560L201.718 44.560L201.718 48.980L194.022 48.980L194.022 51.372L203.122 51.372L203.122 56ZM227.132 56L216.888 56L216.888 37.800L226.612 37.800Q230.382 37.800 232.176 39.139Q233.970 40.478 233.970 42.558L233.970 42.558Q233.970 43.936 233.216 45.002L233.216 45.002Q232.566 45.912 231.474 46.484L231.474 46.484Q231.526 46.510 231.604 46.536L231.604 46.536Q233.138 47.134 233.983 48.265Q234.828 49.396 234.828 50.982L234.828 50.982Q234.828 53.348 232.865 54.674Q230.902 56 227.132 56L227.132 56ZM222.920 48.850L222.920 51.710L226.612 51.710Q227.626 51.710 228.133 51.346Q228.640 50.982 228.640 50.280Q228.640 49.578 228.133 49.214Q227.626 48.850 226.612 48.850L226.612 48.850L222.920 48.850ZM222.920 42.090L222.920 44.794L225.780 44.794Q226.820 44.794 227.301 44.443Q227.782 44.092 227.782 43.442L227.782 43.442Q227.782 42.766 227.301 42.428Q226.820 42.090 225.780 42.090L225.780 42.090L222.920 42.090ZM253.918 56L238.786 56L238.786 37.800L253.580 37.800L253.580 42.428L244.818 42.428L244.818 44.560L252.514 44.560L252.514 48.980L244.818 48.980L244.818 51.372L253.918 51.372L253.918 56ZM264.870 56.416L264.870 56.416Q262.582 56.416 260.450 55.896Q258.318 55.376 256.940 54.544L256.940 54.544L258.916 50.072Q260.216 50.826 261.815 51.281Q263.414 51.736 264.922 51.736L264.922 51.736Q265.806 51.736 266.313 51.619Q266.820 51.502 267.054 51.281Q267.288 51.060 267.288 50.748L267.288 50.748Q267.288 50.254 266.742 49.968Q266.196 49.682 265.299 49.487Q264.402 49.292 263.336 49.071Q262.270 48.850 261.191 48.486Q260.112 48.122 259.215 47.524Q258.318 46.926 257.772 45.951Q257.226 44.976 257.226 43.520L257.226 43.520Q257.226 41.830 258.175 40.439Q259.124 39.048 261.009 38.216Q262.894 37.384 265.702 37.384L265.702 37.384Q267.548 37.384 269.342 37.774Q271.136 38.164 272.566 38.970L272.566 38.970L270.720 43.416Q269.368 42.740 268.107 42.402Q266.846 42.064 265.650 42.064L265.650 42.064Q264.766 42.064 264.246 42.220Q263.726 42.376 263.505 42.636Q263.284 42.896 263.284 43.208L263.284 43.208Q263.284 43.676 263.830 43.949Q264.376 44.222 265.273 44.404Q266.170 44.586 267.249 44.794Q268.328 45.002 269.394 45.366Q270.460 45.730 271.357 46.328Q272.254 46.926 272.800 47.888Q273.346 48.850 273.346 50.280L273.346 50.280Q273.346 51.944 272.397 53.335Q271.448 54.726 269.576 55.571Q267.704 56.416 264.870 56.416ZM287.054 56L280.918 56L280.918 42.558L275.588 42.558L275.588 37.800L292.384 37.800L292.384 42.558L287.054 42.558L287.054 56ZM315.614 56L305.370 56L305.370 37.800L315.094 37.800Q318.864 37.800 320.658 39.139Q322.452 40.478 322.452 42.558L322.452 42.558Q322.452 43.936 321.698 45.002L321.698 45.002Q321.048 45.912 319.956 46.484L319.956 46.484Q320.008 46.510 320.086 46.536L320.086 46.536Q321.620 47.134 322.465 48.265Q323.310 49.396 323.310 50.982L323.310 50.982Q323.310 53.348 321.347 54.674Q319.384 56 315.614 56L315.614 56ZM311.402 48.850L311.402 51.710L315.094 51.710Q316.108 51.710 316.615 51.346Q317.122 50.982 317.122 50.280Q317.122 49.578 316.615 49.214Q316.108 48.850 315.094 48.850L315.094 48.850L311.402 48.850ZM311.402 42.090L311.402 44.794L314.262 44.794Q315.302 44.794 315.783 44.443Q316.264 44.092 316.264 43.442L316.264 43.442Q316.264 42.766 315.783 42.428Q315.302 42.090 314.262 42.090L314.262 42.090L311.402 42.090ZM333.404 56L327.268 56L327.268 37.800L335.770 37.800Q339.956 37.800 342.140 39.646Q344.324 41.492 344.324 44.664L344.324 44.664Q344.324 46.770 343.310 48.278L343.310 48.278Q342.426 49.630 340.892 50.410L340.892 50.410L344.714 56L338.162 56L335.068 51.424L333.404 51.424L333.404 56ZM333.404 42.532L333.404 46.796L335.640 46.796Q336.914 46.796 337.525 46.224Q338.136 45.652 338.136 44.664Q338.136 43.676 337.525 43.104Q336.914 42.532 335.640 42.532L335.640 42.532L333.404 42.532ZM352.702 56L346.462 56L354.418 37.800L360.450 37.800L368.406 56L362.062 56L360.840 52.828L353.924 52.828L352.702 56ZM355.614 48.408L359.150 48.408L357.382 43.832L355.614 48.408ZM377.174 56L371.194 56L371.194 37.800L376.238 37.800L383.154 46.068L383.154 37.800L389.134 37.800L389.134 56L384.090 56L377.174 47.732L377.174 56ZM402.868 56L393.898 56L393.898 37.800L402.868 37.800Q405.910 37.800 408.224 38.905Q410.538 40.010 411.838 42.038Q413.138 44.066 413.138 46.900L413.138 46.900Q413.138 49.708 411.838 51.749Q410.538 53.790 408.224 54.895Q405.910 56 402.868 56L402.868 56ZM400.034 42.584L400.034 51.216L402.608 51.216Q403.908 51.216 404.883 50.722Q405.858 50.228 406.404 49.253Q406.950 48.278 406.950 46.900L406.950 46.900Q406.950 45.496 406.404 44.534Q405.858 43.572 404.883 43.078Q403.908 42.584 402.608 42.584L402.608 42.584L400.034 42.584Z" fill="#090D16"/></g></svg>`;
  const TBB_CLEAN_LOGO_DATA_URI = "data:image/svg+xml;utf8," + encodeURIComponent(TBB_CLEAN_LOGO_SVG_RAW);

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function tbbImgSrc(url) {
    return String(url || "");
  }
  window.tbbImgFallback = function (imgEl, fallbackSrc) {
    if (!imgEl || imgEl.dataset.tbbFbTried === "1") return;
    imgEl.dataset.tbbFbTried = "1";
    if (fallbackSrc) imgEl.src = fallbackSrc;
  };
  window.tbbHandleSampleClick = function () {
    return true;
  };

  function getLang() {
    try {
      const raw =
        localStorage.getItem(LANG_STORAGE_KEY) ||
        localStorage.getItem("tbb_app_lang") ||
        localStorage.getItem("tbb_lang") ||
        localStorage.getItem("tbb_ui_lang") ||
        (navigator.language || "es").slice(0, 2);
      const clean = String(raw || "es").toLowerCase().trim().slice(0, 2);
      return ["es", "en", "fr", "pt", "de", "it"].includes(clean) ? clean : "es";
    } catch (e) {
      return "es";
    }
  }

  function hasProLicense() {
    try {
      return Boolean(localStorage.getItem(LICENSE_STORAGE_KEY));
    } catch (e) {
      return false;
    }
  }
  window.tbbHasProLicense = hasProLicense;

  const I18N = {
    es: {
      navHome: "1. Inicio",
      navDeliverables: "2. Qué Recibes",
      navHowItWorks: "3. Cómo Funciona",
      navRealCases: "4. Ejemplos Reales",
      navReferences: "5. Referencias",
      navMyAccount: "Mi Cuenta",
      navBuyCta: "Tu Marca · $49 USD",
      navLicenseActive: "Licencia Pro Activa",
      taglineBadge: "YOUR BRAND, NOW!!!",
      heroHeadline: "Tu marca completa y lista para vender en menos de 60 minutos.",
      heroSubheadline: "Obtén un Brandbook profesional de más de 30 páginas, tu logotipo en curvas, colores, tipografías y papelería editable guiado paso a paso por Aura. Empieza gratis ahora mismo.",
      heroPill1: "Brandbook de +30 páginas",
      heroPill2: "9 archivos listos para usar",
      heroPill3: "Menos de 60 minutos",
      heroPill4: "Pasos 1 al 3 gratis",
      heroStartFullscreenBtn: "Abrir Estudio en Pantalla Completa",
      heroSeeDeliverablesBtn: "Ver todo lo que recibes",
      demoBarTitle: "Prueba la app en vivo aquí mismo (Pasos 0 al 3 gratis)",
      demoModeMobile: "Vista Celular",
      demoModeFull: "Vista Amplia",
      demoListenAuraBtn: "Escuchar a Aura (10s)",
      demoUnlockStep4Btn: "Desbloquear Paso 4 al 6 · $49 USD",
      homeTrustTitle: "¿Por qué tu marca queda tan bien en tan poco tiempo?",
      homeTrustBody: "Por dentro, Aura traduce tus respuestas simples en reglas profesionales de diseño, color y estrategia probadas por las mejores marcas del mundo, sin hacerte leer teoría.",
      homeTrustBtn: "Curiosear las bases y libros en Referencias →",
      delivEyebrow: "QUÉ RECIBES AL TERMINAR",
      delivTitle: "Tu Brandbook de más de 30 páginas y 9 archivos listos para usar hoy mismo",
      delivLead: "Nada de bocetos sueltos. Al completar el recorrido descargas toda tu marca lista para imprenta, redes sociales, sitio web, presentaciones y uniformes. 100% propiedad tuya.",
      glossaryTitle: "¿Para qué sirve cada archivo? (Explicado fácil)",
      glossarySub: "Toca cualquier formato si quieres saber exactamente dónde usarlo.",
      howEyebrow: "CÓMO FUNCIONA PASO A PASO",
      howTitle: "De una idea en tu cabeza a tu marca completa en 7 pasos cortos",
      howLead: "Avanzas como en un juego guiado: una pregunta clara a la vez, sugerencias listas si te trabas y cápsulas de voz de máximo 15 segundos con Aura.",
      howListenCapsule: "Escuchar cápsula de Aura (≤15s)",
      howBeforeAfterTitle: "¿Ya tienes un logo? Lo modernizamos sin perder tu esencia",
      howBeforeAfterSub: "Mueve el control para ver cómo un logo antiguo evoluciona a un símbolo limpio, moderno y listo para cualquier tamaño.",
      casesEyebrow: "EJEMPLOS REALES TERMINADOS",
      casesTitle: "Así se ve una marca real creada en The Best Brand",
      casesLead: "Explora el caso completo de ARCO Ingeniería (Ing. Luis Ponce): desde su logo anterior hasta su nueva identidad minimalista, sus láminas del Brandbook y sus archivos descargables.",
      casesPlatesTitle: "Muestra real por dentro del Brandbook (+30 páginas)",
      casesDownloadsTitle: "Descarga archivos reales de muestra para probar la calidad",
      refEyebrow: "REFERENCIAS Y FUNDAMENTOS DEL MÉTODO",
      refTitle: "Las grandes mentes, libros y modelos que respaldan a The Best Brand",
      refLead: "Aquí reunimos toda la ciencia, psicometría, diseño y estrategia que trabajan silenciosamente debajo del capó mientras tú creas tu marca de forma ágil.",
      refPillarsTitle: "Mapa Interactivo: 5 Pilares Estratégicos conectados al Núcleo de Aura",
      refPillarsSub: "Toca cualquier pilar para ver cómo transforma tus respuestas en decisiones reales de marca.",
      refKanseiTitle: "Simulador Visual de Personalidad y Forma (Paso 4)",
      refKanseiSub: "Mueve las barras para ver cómo el estilo de tu negocio cambia la forma, las esquinas y el grosor de tu identidad.",
      refKanseiAxis1L: "Suave y Cercano",
      refKanseiAxis1R: "Exacto y Geométrico",
      refKanseiAxis2L: "Clásico y Tradicional",
      refKanseiAxis2R: "Moderno y Audaz",
      refKanseiAxis3L: "Ligero y Minimalista",
      refKanseiAxis3R: "Firme y Con Peso",
      refAuthorsTitle: "Autores y Modelos por Etapa",
      refBooksTitle: "Biblioteca Recomendada para Fundadores y Creadores",
      refVideosTitle: "Charlas y Conferencias Clave",
      lightboxPrev: "Anterior",
      lightboxNext: "Siguiente",
      lightboxClose: "Cerrar",
      checkoutTitle: "Desbloquea tu Marca Completa · $49 USD (Pago Único)",
      checkoutSub: "Guardamos todo lo que llevas en los Pasos 0 al 3 para que continúes directo en el Paso 4 y descargues tu Brandbook de +30 páginas y tus 9 archivos.",
      checkoutNameLabel: "Tu nombre completo",
      checkoutNamePlaceholder: "Ej. Ana Martínez",
      checkoutEmailLabel: "Tu correo electrónico (para guardar tu marca y recibo)",
      checkoutEmailPlaceholder: "tu@correo.com",
      checkoutPayBtn: "Continuar al Pago Seguro con Stripe · $49 USD",
      checkoutPromoToggle: "¿Tienes un código promocional?",
      checkoutPromoPlaceholder: "Escribe tu código",
      checkoutPromoApply: "Aplicar",
      restoreTitle: "Entrar a Mi Cuenta / Restaurar Compra",
      restoreSub: "Ingresa el correo con el que activaste tu licencia para recuperar tus marcas y desbloquear los Pasos 4 al 6 en este dispositivo.",
      restoreBtn: "Recuperar Mi Cuenta",
      footerDesc: "Tu marca profesional con Brandbook de +30 páginas y archivos editables en menos de 60 minutos. 100% propiedad intelectual del cliente."
    },
    en: {
      navHome: "1. Home",
      navDeliverables: "2. What You Get",
      navHowItWorks: "3. How It Works",
      navRealCases: "4. Real Examples",
      navReferences: "5. References",
      navMyAccount: "My Account",
      navBuyCta: "Your Brand · $49 USD",
      navLicenseActive: "Pro License Active",
      taglineBadge: "YOUR BRAND, NOW!!!",
      heroHeadline: "Your complete, ready-to-sell brand in under 60 minutes.",
      heroSubheadline: "Get a professional 30+ page Brandbook, vector logos, color system, fonts, and editable templates guided step by step by Aura. Start free right now.",
      heroPill1: "30+ page Brandbook",
      heroPill2: "9 ready-to-use files",
      heroPill3: "Under 60 minutes",
      heroPill4: "Steps 1 to 3 free",
      heroStartFullscreenBtn: "Open Fullscreen Studio",
      heroSeeDeliverablesBtn: "See everything you get",
      demoBarTitle: "Try the live app right here (Steps 0 to 3 free)",
      demoModeMobile: "Mobile View",
      demoModeFull: "Wide View",
      demoListenAuraBtn: "Listen to Aura (10s)",
      demoUnlockStep4Btn: "Unlock Steps 4 to 6 · $49 USD",
      homeTrustTitle: "Why does your brand turn out so solid so fast?",
      homeTrustBody: "Under the hood, Aura turns your simple answers into proven design, color, and positioning rules used by world-class brands—without making you read theory.",
      homeTrustBtn: "Explore the science & books in References →",
      delivEyebrow: "WHAT YOU RECEIVE",
      delivTitle: "Your 30+ page Brandbook and 9 files ready to use today",
      delivLead: "No loose sketches. When you finish, you download your entire brand ready for print, social media, websites, pitch decks, and merchandise. 100% owned by you.",
      glossaryTitle: "What is each file format for? (Plain English)",
      glossarySub: "Tap any format to see exactly where to use it.",
      howEyebrow: "HOW IT WORKS STEP BY STEP",
      howTitle: "From an idea in your head to your complete brand in 7 short steps",
      howLead: "Move forward one clear question at a time, with instant idea buttons if you get stuck and 15-second voice capsules from Aura.",
      howListenCapsule: "Play Aura capsule (≤15s)",
      howBeforeAfterTitle: "Already have a logo? We modernize it while keeping its essence",
      howBeforeAfterSub: "Slide to see how an older logo evolves into a clean, modern mark that works at every size.",
      casesEyebrow: "REAL FINISHED EXAMPLES",
      casesTitle: "See a real brand built end-to-end in The Best Brand",
      casesLead: "Explore the complete ARCO Ingeniería case study: from its previous logo to its new minimalist identity, Brandbook pages, and downloadable production files.",
      casesPlatesTitle: "Inside a real 30+ page Brandbook",
      casesDownloadsTitle: "Download real sample files to inspect the quality",
      refEyebrow: "METHOD REFERENCES & FOUNDATIONS",
      refTitle: "The authors, books, and frameworks powering The Best Brand",
      refLead: "All the strategy, design systems, and color science working quietly under the hood while you build your brand fast live right here.",
      refPillarsTitle: "Interactive Map: 5 Strategic Pillars connected to Aura's Core",
      refPillarsSub: "Click any pillar to inspect how it turns your answers into brand decisions.",
      refKanseiTitle: "Visual Style & Shape Simulator (Step 4)",
      refKanseiSub: "Move the sliders to see how your brand's personality changes geometry, corners, and stroke weight.",
      refKanseiAxis1L: "Soft & Friendly",
      refKanseiAxis1R: "Exact & Geometric",
      refKanseiAxis2L: "Classic & Timeless",
      refKanseiAxis2R: "Modern & Bold",
      refKanseiAxis3L: "Light & Minimal",
      refKanseiAxis3R: "Solid & Strong",
      refAuthorsTitle: "Authors & Models by Stage",
      refBooksTitle: "Essential Reading for Founders & Creators",
      refVideosTitle: "Key Talks & Lectures",
      lightboxPrev: "Previous",
      lightboxNext: "Next",
      lightboxClose: "Close",
      checkoutTitle: "Unlock Your Complete Brand · $49 USD (One-Time)",
      checkoutSub: "All your answers from Steps 0 to 3 are saved automatically so you continue straight into Step 4 and download your 30+ page Brandbook and 9 files.",
      checkoutNameLabel: "Your full name",
      checkoutNamePlaceholder: "e.g. Alex Morgan",
      checkoutEmailLabel: "Your email address (for cloud backup & receipt)",
      checkoutEmailPlaceholder: "you@company.com",
      checkoutPayBtn: "Continue to Secure Stripe Checkout · $49 USD",
      checkoutPromoToggle: "Have a promo code?",
      checkoutPromoPlaceholder: "Enter promo code",
      checkoutPromoApply: "Apply",
      restoreTitle: "Sign In / Restore License",
      restoreSub: "Enter the email you used at checkout to restore your saved brands and unlock Steps 4 to 6 on this device.",
      restoreBtn: "Restore My Account",
      footerDesc: "Your complete brand with a 30+ page Brandbook and editable production files in under 60 minutes. 100% client IP ownership."
    },
    fr: {
      navHome: "1. Accueil",
      navDeliverables: "2. Ce que vous recevez",
      navHowItWorks: "3. Comment ça marche",
      navRealCases: "4. Exemples réels",
      navReferences: "5. Références",
      navMyAccount: "Mon Compte",
      navBuyCta: "Votre Marque · 49 $ USD",
      navLicenseActive: "Licence Pro Active",
      taglineBadge: "YOUR BRAND, NOW!!!",
      heroHeadline: "Votre marque complète et prête à vendre en moins de 60 minutes.",
      heroSubheadline: "Obtenez un Brandbook professionnel de plus de 30 pages, vos logos vectoriels, couleurs, polices et modèles guidé pas à pas par Aura. Commencez gratuitement.",
      heroPill1: "Brandbook +30 pages",
      heroPill2: "9 fichiers prêts à l'emploi",
      heroPill3: "Moins de 60 minutes",
      heroPill4: "Étapes 1 à 3 gratuites",
      heroStartFullscreenBtn: "Ouvrir le Studio Plein Écran",
      heroSeeDeliverablesBtn: "Voir tous les livrables",
      demoBarTitle: "Essayez l'application en direct ici (Étapes 0 à 3 gratuites)",
      demoModeMobile: "Vue Mobile",
      demoModeFull: "Vue Large",
      demoListenAuraBtn: "Écouter Aura (10s)",
      demoUnlockStep4Btn: "Débloquer Étapes 4 à 6 · 49 $ USD",
      homeTrustTitle: "Pourquoi votre marque est-elle si réussie en si peu de temps ?",
      homeTrustBody: "En coulisses, Aura traduit vos réponses simples en règles professionnelles de design, de couleur et de stratégie éprouvées—sans jargon.",
      homeTrustBtn: "Découvrir les bases et livres dans Références →",
      delivEyebrow: "CE QUE VOUS RECEVEZ",
      delivTitle: "Votre Brandbook de plus de 30 pages et 9 fichiers prêts dès aujourd'hui",
      delivLead: "À la fin du parcours, téléchargez toute votre marque prête pour l'impression, les réseaux sociaux, le web et vos présentations. 100 % votre propriété.",
      glossaryTitle: "À quoi sert chaque format ? (Expliqué simplement)",
      glossarySub: "Touchez un format pour savoir où l'utiliser.",
      howEyebrow: "COMMENT ÇA MARCHE",
      howTitle: "D'une idée à votre marque complète en 7 étapes simples",
      howLead: "Avancez une question claire à la fois, avec des idées en un clic et des capsules vocales de 15 secondes maximum avec Aura.",
      howListenCapsule: "Écouter la capsule d'Aura (≤15s)",
      howBeforeAfterTitle: "Vous avez déjà un logo ? Nous le modernisons en gardant son âme",
      howBeforeAfterSub: "Faites glisser pour voir comment un logo évolue vers un symbole net et moderne.",
      casesEyebrow: "EXEMPLES RÉELS",
      casesTitle: "Découvrez une vraie marque créée avec The Best Brand",
      casesLead: "Explorez le cas réel d'ARCO Ingeniería : de son ancien logo à sa nouvelle identité minimaliste, ses pages de Brandbook et ses fichiers.",
      casesPlatesTitle: "Aperçu réel d'un Brandbook (+30 pages)",
      casesDownloadsTitle: "Téléchargez des fichiers exemples pour vérifier la qualité",
      refEyebrow: "RÉFÉRENCES ET FONDEMENTS",
      refTitle: "Les auteurs, livres et modèles derrière The Best Brand",
      refLead: "Retrouvez ici toute la science du design, de la couleur et de la stratégie qui propulse votre marque en coulisses.",
      refPillarsTitle: "Carte Interactive : 5 Piliers reliés au Cœur d'Aura",
      refPillarsSub: "Cliquez sur un pilier pour voir comment il structure votre marque.",
      refKanseiTitle: "Simulateur Visuel de Style et de Forme (Étape 4)",
      refKanseiSub: "Déplacez les curseurs pour observer comment la personnalité change les formes et les lignes.",
      refKanseiAxis1L: "Doux et Proche",
      refKanseiAxis1R: "Précis et Géométrique",
      refKanseiAxis2L: "Classique",
      refKanseiAxis2R: "Moderne et Audacieux",
      refKanseiAxis3L: "Léger et Minimal",
      refKanseiAxis3R: "Solide et Fort",
      refAuthorsTitle: "Auteurs et Modèles par Étape",
      refBooksTitle: "Bibliothèque Essentielle",
      refVideosTitle: "Conférences Clés",
      lightboxPrev: "Précédent",
      lightboxNext: "Suivant",
      lightboxClose: "Fermer",
      checkoutTitle: "Débloquez Votre Marque Complète · 49 $ USD (Paiement Unique)",
      checkoutSub: "Vos réponses des Étapes 0 à 3 sont sauvegardées pour continuer à l'Étape 4 et télécharger votre Brandbook (+30 pages) et vos 9 fichiers.",
      checkoutNameLabel: "Votre nom complet",
      checkoutNamePlaceholder: "Ex. Claire Martin",
      checkoutEmailLabel: "Votre adresse e-mail (sauvegarde et reçu)",
      checkoutEmailPlaceholder: "vous@entreprise.com",
      checkoutPayBtn: "Continuer vers le Paiement Sécurisé Stripe · 49 $ USD",
      checkoutPromoToggle: "Vous avez un code promo ?",
      checkoutPromoPlaceholder: "Votre code",
      checkoutPromoApply: "Appliquer",
      restoreTitle: "Mon Compte / Restaurer ma Licence",
      restoreSub: "Saisissez l'e-mail utilisé lors de votre achat pour retrouver vos marques sur cet appareil.",
      restoreBtn: "Restaurer Mon Compte",
      footerDesc: "Votre marque complète avec Brandbook de +30 pages et fichiers prêts à l'emploi en moins de 60 minutes. 100 % propriété client."
    },
    pt: {
      navHome: "1. Início",
      navDeliverables: "2. O Que Recebe",
      navHowItWorks: "3. Como Funciona",
      navRealCases: "4. Exemplos Reais",
      navReferences: "5. Referências",
      navMyAccount: "Minha Conta",
      navBuyCta: "Sua Marca · $49 USD",
      navLicenseActive: "Licença Pro Ativa",
      taglineBadge: "YOUR BRAND, NOW!!!",
      heroHeadline: "A sua marca completa e pronta para vender em menos de 60 minutos.",
      heroSubheadline: "Receba um Brandbook profissional com mais de 30 páginas, logótipo em curvas, cores, fontes e modelos editáveis guiado passo a passo pela Aura. Comece grátis agora.",
      heroPill1: "Brandbook +30 páginas",
      heroPill2: "9 ficheiros prontos a usar",
      heroPill3: "Menos de 60 minutos",
      heroPill4: "Passos 1 a 3 grátis",
      heroStartFullscreenBtn: "Abrir Estúdio em Ecrã Inteiro",
      heroSeeDeliverablesBtn: "Ver tudo o que recebe",
      demoBarTitle: "Teste a app ao vivo aqui mesmo (Passos 0 a 3 grátis)",
      demoModeMobile: "Vista Telemóvel",
      demoModeFull: "Vista Ampla",
      demoListenAuraBtn: "Ouvir a Aura (10s)",
      demoUnlockStep4Btn: "Desbloquear Passos 4 a 6 · $49 USD",
      homeTrustTitle: "Porque é que a sua marca fica tão profissional em tão pouco tempo?",
      homeTrustBody: "Nos bastidores, a Aura transforma respostas simples em regras reais de design, cor e posicionamento usadas pelas melhores marcas—sem complicar.",
      homeTrustBtn: "Explorar as bases e livros em Referências →",
      delivEyebrow: "O QUE RECEBE AO TERMINAR",
      delivTitle: "O seu Brandbook com mais de 30 páginas e 9 ficheiros prontos hoje mesmo",
      delivLead: "Ao concluir o percurso, transfere toda a sua marca pronta para gráfica, redes sociais, site, apresentações e fardamento. 100% propriedade sua.",
      glossaryTitle: "Para que serve cada ficheiro? (Explicado fácil)",
      glossarySub: "Toque em qualquer formato para saber onde usá-lo.",
      howEyebrow: "COMO FUNCIONA PASSO A PASSO",
      howTitle: "De uma ideia na sua cabeça à marca completa em 7 passos curtos",
      howLead: "Avance uma pergunta clara de cada vez, com botão de ideias se precisar e cápsulas de voz de até 15 segundos com a Aura.",
      howListenCapsule: "Ouvir cápsula da Aura (≤15s)",
      howBeforeAfterTitle: "Já tem um logo? Modernizamos sem perder a sua essência",
      howBeforeAfterSub: "Deslize para ver como um logótipo antigo evolui para um símbolo limpo e moderno.",
      casesEyebrow: "EXEMPLOS REAIS CONCLUÍDOS",
      casesTitle: "Veja uma marca real criada na The Best Brand",
      casesLead: "Explore o caso completo da ARCO Ingeniería: desde o logo anterior até à nova identidade minimalista, lâminas do Brandbook e ficheiros de amostra.",
      casesPlatesTitle: "Amostra real por dentro do Brandbook (+30 páginas)",
      casesDownloadsTitle: "Transfira ficheiros reais de amostra para testar a qualidade",
      refEyebrow: "REFERÊNCIAS E FUNDAMENTOS",
      refTitle: "Os autores, livros e modelos que sustentam a The Best Brand",
      refLead: "Aqui reunimos toda a ciência de design, cor e estratégia que trabalha silenciosamente enquanto cria a sua marca com agilidade.",
      refPillarsTitle: "Mapa Interativo: 5 Pilares ligados ao Núcleo da Aura",
      refPillarsSub: "Toque em qualquer pilar para ver como estrutura a sua marca.",
      refKanseiTitle: "Simulador Visual de Estilo e Forma (Passo 4)",
      refKanseiSub: "Mova as barras para ver como a personalidade muda a geometria e os cantos.",
      refKanseiAxis1L: "Suave e Próximo",
      refKanseiAxis1R: "Exato e Geométrico",
      refKanseiAxis2L: "Clássico",
      refKanseiAxis2R: "Moderno e Ousado",
      refKanseiAxis3L: "Leve e Minimalista",
      refKanseiAxis3R: "Firme e Forte",
      refAuthorsTitle: "Autores e Modelos por Etapa",
      refBooksTitle: "Biblioteca Recomendada",
      refVideosTitle: "Palestras Essenciais",
      lightboxPrev: "Anterior",
      lightboxNext: "Seguinte",
      lightboxClose: "Fechar",
      checkoutTitle: "Desbloqueie a Sua Marca Completa · $49 USD (Pagamento Único)",
      checkoutSub: "Guardamos todas as suas respostas dos Passos 0 a 3 para continuar direto no Passo 4 e transferir o seu Brandbook (+30 páginas) e os 9 ficheiros.",
      checkoutNameLabel: "O seu nome completo",
      checkoutNamePlaceholder: "Ex. Mariana Costa",
      checkoutEmailLabel: "O seu e-mail (para cópia na nuvem e recibo)",
      checkoutEmailPlaceholder: "voce@empresa.com",
      checkoutPayBtn: "Continuar para Pagamento Seguro Stripe · $49 USD",
      checkoutPromoToggle: "Tem um código promocional?",
      checkoutPromoPlaceholder: "Escreva o código",
      checkoutPromoApply: "Aplicar",
      restoreTitle: "Entrar na Minha Conta / Restaurar Licença",
      restoreSub: "Introduza o e-mail usado na compra para recuperar as suas marcas neste dispositivo.",
      restoreBtn: "Recuperar Minha Conta",
      footerDesc: "A sua marca profissional com Brandbook de +30 páginas e ficheiros editáveis em menos de 60 minutos. 100% propriedade do cliente."
    },
    de: {
      navHome: "1. Start",
      navDeliverables: "2. Was Sie erhalten",
      navHowItWorks: "3. So funktioniert's",
      navRealCases: "4. Echte Beispiele",
      navReferences: "5. Referenzen",
      navMyAccount: "Mein Konto",
      navBuyCta: "Ihre Marke · $49 USD",
      navLicenseActive: "Pro-Lizenz Aktiv",
      taglineBadge: "YOUR BRAND, NOW!!!",
      heroHeadline: "Ihre komplette, verkaufsfertige Marke in unter 60 Minuten.",
      heroSubheadline: "Erhalten Sie ein professionelles Brandbook mit über 30 Seiten, Vektor-Logos, Farben, Schriften und Vorlagen – Schritt für Schritt geführt von Aura. Jetzt kostenlos starten.",
      heroPill1: "30+ Seiten Brandbook",
      heroPill2: "9 fertige Dateien",
      heroPill3: "Unter 60 Minuten",
      heroPill4: "Schritte 1–3 gratis",
      heroStartFullscreenBtn: "Vollbild-Studio öffnen",
      heroSeeDeliverablesBtn: "Alle Dateien ansehen",
      demoBarTitle: "Testen Sie die App direkt hier live (Schritte 0 bis 3 kostenlos)",
      demoModeMobile: "Mobil-Ansicht",
      demoModeFull: "Breite Ansicht",
      demoListenAuraBtn: "Aura anhören (10s)",
      demoUnlockStep4Btn: "Schritte 4 bis 6 freischalten · $49 USD",
      homeTrustTitle: "Warum wird Ihre Marke in so kurzer Zeit so stark?",
      homeTrustBody: "Im Hintergrund übersetzt Aura Ihre einfachen Antworten in bewährte Regeln für Design, Farbe und Strategie – ganz ohne trockene Theorie.",
      homeTrustBtn: "Grundlagen & Bücher unter Referenzen entdecken →",
      delivEyebrow: "WAS SIE ERHALTEN",
      delivTitle: "Ihr 30+ Seiten Brandbook und 9 sofort nutzbare Dateien",
      delivLead: "Am Ende laden Sie Ihre komplette Marke für Druck, Social Media, Website und Präsentationen herunter. 100 % Ihr Eigentum.",
      glossaryTitle: "Wofür ist welches Dateiformat? (Einfach erklärt)",
      glossarySub: "Tippen Sie auf ein Format, um zu sehen, wo Sie es einsetzen.",
      howEyebrow: "SCHRITT FÜR SCHRITT",
      howTitle: "Von der ersten Idee zur fertigen Marke in 7 kurzen Schritten",
      howLead: "Immer nur eine klare Frage pro Bildschirm, Ideen-Buttons bei Bedarf und maximal 15 Sekunden lange Sprachkapseln mit Aura.",
      howListenCapsule: "Aura-Kapsel anhören (≤15s)",
      howBeforeAfterTitle: "Schon ein Logo vorhanden? Wir modernisieren es behutsam",
      howBeforeAfterSub: "Bewegen Sie den Regler, um die Entwicklung vom alten zum modernen Vektor-Logo zu sehen.",
      casesEyebrow: "ECHTE BEISPIELE",
      casesTitle: "So sieht eine echte Marke aus The Best Brand aus",
      casesLead: "Entdecken Sie die Fallstudie ARCO Ingeniería: vom früheren Logo über das neue minimalistische Design bis zu allen Brandbook-Seiten.",
      casesPlatesTitle: "Blick ins echte Brandbook (30+ Seiten)",
      casesDownloadsTitle: "Laden Sie echte Musterdateien herunter",
      refEyebrow: "REFERENZEN & GRUNDLAGEN",
      refTitle: "Die Autoren, Bücher und Modelle hinter The Best Brand",
      refLead: "Hier finden Sie die gesamte Design-, Farb- und Strategiewissenschaft, die im Hintergrund für Ihre Marke arbeitet.",
      refPillarsTitle: "Interaktive Karte: 5 Säulen verbunden mit Auras Kern",
      refPillarsSub: "Klicken Sie auf eine Säule, um ihre Rolle zu sehen.",
      refKanseiTitle: "Visueller Stil- & Form-Simulator (Schritt 4)",
      refKanseiSub: "Bewegen Sie die Regler, um Geometrie, Ecken und Linienstärke live zu testen.",
      refKanseiAxis1L: "Weich & Nahbar",
      refKanseiAxis1R: "Präzise & Geometrisch",
      refKanseiAxis2L: "Klassisch",
      refKanseiAxis2R: "Modern & Mutig",
      refKanseiAxis3L: "Leicht & Minimal",
      refKanseiAxis3R: "Stark & Markant",
      refAuthorsTitle: "Autoren & Modelle pro Schritt",
      refBooksTitle: "Empfohlene Literatur",
      refVideosTitle: "Wichtige Vorträge",
      lightboxPrev: "Zurück",
      lightboxNext: "Weiter",
      lightboxClose: "Schließen",
      checkoutTitle: "Komplette Marke freischalten · $49 USD (Einmalig)",
      checkoutSub: "Alle Antworten aus Schritt 0 bis 3 bleiben gespeichert, damit Sie direkt in Schritt 4 weitermachen und Ihr 30+ Seiten Brandbook herunterladen.",
      checkoutNameLabel: "Ihr vollständiger Name",
      checkoutNamePlaceholder: "z. B. Lukas Weber",
      checkoutEmailLabel: "Ihre E-Mail-Adresse (für Cloud-Backup & Beleg)",
      checkoutEmailPlaceholder: "name@firma.de",
      checkoutPayBtn: "Weiter zur sicheren Stripe-Zahlung · $49 USD",
      checkoutPromoToggle: "Haben Sie einen Aktionscode?",
      checkoutPromoPlaceholder: "Code eingeben",
      checkoutPromoApply: "Anwenden",
      restoreTitle: "Mein Konto / Lizenz wiederherstellen",
      restoreSub: "Geben Sie Ihre Kauf-E-Mail ein, um Ihre Marken auf diesem Gerät wiederherzustellen.",
      restoreBtn: "Konto wiederherstellen",
      footerDesc: "Ihre komplette Marke mit 30+ Seiten Brandbook und Produktionsdateien in unter 60 Minuten. 100 % Eigentum des Kunden."
    },
    it: {
      navHome: "1. Inizio",
      navDeliverables: "2. Cosa Ricevi",
      navHowItWorks: "3. Come Funziona",
      navRealCases: "4. Esempi Reali",
      navReferences: "5. Riferimenti",
      navMyAccount: "Il Mio Account",
      navBuyCta: "Il Tuo Brand · $49 USD",
      navLicenseActive: "Licenza Pro Attiva",
      taglineBadge: "YOUR BRAND, NOW!!!",
      heroHeadline: "Il tuo brand completo e pronto a vendere in meno di 60 minuti.",
      heroSubheadline: "Ottieni un Brandbook professionale di oltre 30 pagine, logo vettoriale, colori, font e modelli modificabili guidato passo dopo passo da Aura. Inizia gratis ora.",
      heroPill1: "Brandbook +30 pagine",
      heroPill2: "9 file pronti all'uso",
      heroPill3: "Meno di 60 minuti",
      heroPill4: "Passi 1–3 gratis",
      heroStartFullscreenBtn: "Apri Studio a Schermo Intero",
      heroSeeDeliverablesBtn: "Scopri tutto ciò che ricevi",
      demoBarTitle: "Prova l'app dal vivo proprio qui (Passi 0–3 gratis)",
      demoModeMobile: "Vista Telefono",
      demoModeFull: "Vista Ampia",
      demoListenAuraBtn: "Ascolta Aura (10s)",
      demoUnlockStep4Btn: "Sblocca Passi 4–6 · $49 USD",
      homeTrustTitle: "Perché il tuo brand viene così bene in così poco tempo?",
      homeTrustBody: "Dietro le quinte, Aura trasforma le tue risposte semplici in regole professionali di design, colore e strategia usate dai migliori brand—senza teoria pesante.",
      homeTrustBtn: "Scopri le basi e i libri in Riferimenti →",
      delivEyebrow: "COSA RICEVI ALLA FINE",
      delivTitle: "Il tuo Brandbook di oltre 30 pagine e 9 file pronti da usare oggi",
      delivLead: "Alla fine scarichi l'intero brand pronto per stampa, social, sito web, presentazioni e divise. 100% di tua proprietà.",
      glossaryTitle: "A cosa serve ogni file? (Spiegato facile)",
      glossarySub: "Tocca qualsiasi formato per sapere esattamente dove usarlo.",
      howEyebrow: "COME FUNZIONA PASSO DOPO PASSO",
      howTitle: "Da un'idea nella tua testa al tuo brand completo in 7 brevi passi",
      howLead: "Avanzi una domanda chiara alla volta, con pulsanti di idee pronte e capsule vocali di massimo 15 secondi con Aura.",
      howListenCapsule: "Ascolta capsula di Aura (≤15s)",
      howBeforeAfterTitle: "Hai già un logo? Lo modernizziamo senza perdere la sua essenza",
      howBeforeAfterSub: "Scorri per vedere come un vecchio logo diventa un simbolo pulito e moderno.",
      casesEyebrow: "ESEMPI REALI COMPLETATI",
      casesTitle: "Ecco un vero brand creato con The Best Brand",
      casesLead: "Esplora il caso reale ARCO Ingeniería: dal vecchio logo alla nuova identità minimalista, le tavole del Brandbook e i file scaricabili.",
      casesPlatesTitle: "Dentro un vero Brandbook (+30 pagine)",
      casesDownloadsTitle: "Scarica file reali di esempio per testare la qualità",
      refEyebrow: "RIFERIMENTI E FONDAMENTI",
      refTitle: "Gli autori, i libri e i modelli dietro The Best Brand",
      refLead: "Qui trovi tutta la scienza di design, colore e strategia che lavora silenziosamente mentre crei il tuo brand con agilità.",
      refPillarsTitle: "Mappa Interattiva: 5 Pilastri collegati al Nucleo di Aura",
      refPillarsSub: "Clicca su un pilastro per vedere come guida il tuo brand.",
      refKanseiTitle: "Simulatore Visivo di Stile e Forma (Passo 4)",
      refKanseiSub: "Muovi i cursori per vedere come la personalità cambia forme, angoli e spessori.",
      refKanseiAxis1L: "Morbido e Vicino",
      refKanseiAxis1R: "Preciso e Geometrico",
      refKanseiAxis2L: "Classico",
      refKanseiAxis2R: "Moderno e Audace",
      refKanseiAxis3L: "Leggero e Minimal",
      refKanseiAxis3R: "Solido e Forte",
      refAuthorsTitle: "Autori e Modelli per Fase",
      refBooksTitle: "Biblioteca Consigliata",
      refVideosTitle: "Conferenze Chiave",
      lightboxPrev: "Precedente",
      lightboxNext: "Successivo",
      lightboxClose: "Chiudi",
      checkoutTitle: "Sblocca il Tuo Brand Completo · $49 USD (Pagamento Unico)",
      checkoutSub: "Salviamo tutte le risposte dei Passi 0–3 per farti continuare subito al Passo 4 e scaricare il tuo Brandbook (+30 pagine) e i 9 file.",
      checkoutNameLabel: "Il tuo nome completo",
      checkoutNamePlaceholder: "Es. Giulia Rossi",
      checkoutEmailLabel: "La tua email (per salvataggio cloud e ricevuta)",
      checkoutEmailPlaceholder: "tu@azienda.it",
      checkoutPayBtn: "Continua al Pagamento Sicuro Stripe · $49 USD",
      checkoutPromoToggle: "Hai un codice promozionale?",
      checkoutPromoPlaceholder: "Inserisci codice",
      checkoutPromoApply: "Applica",
      restoreTitle: "Il Mio Account / Ripristina Licenza",
      restoreSub: "Inserisci l'email usata per l'acquisto per recuperare i tuoi brand su questo dispositivo.",
      restoreBtn: "Ripristina Account",
      footerDesc: "Il tuo brand professionale con Brandbook di +30 pagine e file modificabili in meno di 60 minuti. 100% proprietà del cliente."
    }
  };

  function t(key) {
    const l = getLang();
    return (I18N[l] && I18N[l][key]) || I18N.es[key] || key;
  }

  // Lenguaje 100% simple para los 9 entregables (Cero tecnicismos intimidantes, cero autores, cero codenames)
  const OFFICIAL_9_DELIVERABLES = [
    {
      num: "01",
      format: ".PDF + .HTML",
      sampleUrl: "/assets/samples/Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.pdf",
      thumb: "/assets/app_captures/arco_30_paso6_1_brandbook_lamina01_portada.png",
      plateNum: 1,
      isPrimaryBrandbook: true,
      i18n: {
        es: { title: "Tu Brandbook Oficial de más de 30 páginas", desc: "El libro completo de tu marca listo para compartir con tu equipo, diseñadores o imprentas: explica qué hace única a tu marca, cómo usar tu logo, tus colores exactos, tus letras y cómo se ve en la vida real." },
        en: { title: "Your Official 30+ Page Brandbook", desc: "Your complete brand guide ready to share with your team, designers, or printers: explains what makes your business unique, how to use your logo, exact colors, fonts, and real-world applications." },
        fr: { title: "Votre Brandbook Officiel de plus de 30 pages", desc: "Le guide complet de votre marque prêt à partager : explique votre identité, comment utiliser votre logo, vos couleurs exactes, vos polices et vos supports réels." },
        pt: { title: "O Seu Brandbook Oficial com mais de 30 páginas", desc: "O livro completo da sua marca pronto para partilhar com a equipa ou gráficas: explica a sua essência, regras do logótipo, cores exatas, letras e aplicações reais." },
        de: { title: "Ihr offizielles Brandbook mit über 30 Seiten", desc: "Das komplette Markenhandbuch für Ihr Team, Designer oder Druckereien: erklärt Ihre Marke, Logo-Regeln, exakte Farben, Schriften und reale Anwendungen." },
        it: { title: "Il Tuo Brandbook Ufficiale di oltre 30 pagine", desc: "La guida completa del tuo brand pronta da condividere con team o tipografie: spiega la tua identità, l'uso del logo, i colori esatti, i font e le applicazioni reali." }
      }
    },
    {
      num: "02",
      format: ".SVG · VECTOR",
      sampleUrl: "/assets/samples/Logotipo_Horizontal_Curvas_arco_ingenieria.svg",
      thumb: "/assets/app_captures/arco_31_paso6_1_brandbook_lamina13_terna.png",
      plateNum: 2,
      i18n: {
        es: { title: "Tus Logotipos que nunca se pixelan (.SVG)", desc: "Tres versiones listas (horizontal, cuadrado para perfil y sello circular) que puedes agrandar desde un celular hasta un espectacular sin que pierdan nitidez." },
        en: { title: "Sharp Vector Logos That Never Pixelate (.SVG)", desc: "Three ready versions (horizontal, square profile icon, and circular seal) that scale from a phone screen to a billboard with crystal clarity." },
        fr: { title: "Vos Logos Vectoriels ultra-nets (.SVG)", desc: "Trois versions prêtes (horizontale, icône carrée et sceau) qui s'agrandissent sans jamais pixeliser." },
        pt: { title: "Os Seus Logótipos que nunca pixelizam (.SVG)", desc: "Três versões prontas (horizontal, quadrado para perfil e selo) que pode ampliar até um outdoor sem perder nitidez." },
        de: { title: "Gestochen scharfe Vektor-Logos (.SVG)", desc: "Drei fertige Versionen (horizontal, Profil-Icon und Siegel), die ohne Qualitätsverlust beliebig groß skaliert werden können." },
        it: { title: "I Tuoi Loghi Vettoriali sempre nitidi (.SVG)", desc: "Tre versioni pronte (orizzontale, icona quadrata e sigillo) ingrandibili all'infinito senza mai sgranare." }
      }
    },
    {
      num: "03",
      format: ".AI · IMPRENTA",
      sampleUrl: "/assets/samples/Logotipo_Horizontal_Curvas_arco_ingenieria.ai",
      thumb: "/assets/app_captures/arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png",
      plateNum: 3,
      i18n: {
        es: { title: "Archivo Maestro para Imprenta y Bordado (.AI)", desc: "El archivo original editable para Adobe Illustrator que te pide cualquier imprenta profesional para tarjetas, cajas, letreros o uniformes bordados." },
        en: { title: "Master Print & Embroidery File (.AI)", desc: "The native Adobe Illustrator master file every print shop asks for when producing business cards, packaging, signage, or embroidered uniforms." },
        fr: { title: "Fichier Maître Imprimerie et Broderie (.AI)", desc: "Le fichier natif Adobe Illustrator demandé par tous les imprimeurs pour cartes, emballages, enseignes et vêtements." },
        pt: { title: "Ficheiro Mestre para Gráfica e Bordado (.AI)", desc: "O ficheiro original Adobe Illustrator pedido por qualquer gráfica para cartões, embalagens, letreiros ou fardas." },
        de: { title: "Master-Datei für Druckerei & Stickerei (.AI)", desc: "Die originale Adobe-Illustrator-Datei für Visitenkarten, Verpackungen, Schilder und bestickte Kleidung." },
        it: { title: "File Master per Tipografia e Ricamo (.AI)", desc: "Il file originale Adobe Illustrator richiesto da ogni tipografia per biglietti, scatole, insegne o divise." }
      }
    },
    {
      num: "04",
      format: ".PNG · ALTA CALIDAD",
      sampleUrl: "/assets/samples/Logotipo_Masterpiece_NanoBanana_ARCO_Ingenieria.png",
      thumb: "/assets/samples/Isotipo_1x1_Centrado_ARCO_Ingenieria_1024px.png",
      plateNum: 4,
      i18n: {
        es: { title: "Logo Transparente + Foto de Perfil 1:1 (.PNG)", desc: "Imágenes de alta resolución listas para subir directo a WhatsApp Business, Instagram, TikTok, LinkedIn, Canva o tu tienda en línea." },
        en: { title: "Transparent Logo + 1:1 Profile Icon (.PNG)", desc: "High-resolution images ready to upload straight to WhatsApp Business, Instagram, TikTok, LinkedIn, Canva, or your online store." },
        fr: { title: "Logo Transparent + Photo de Profil 1:1 (.PNG)", desc: "Images haute résolution prêtes pour WhatsApp, Instagram, TikTok, LinkedIn, Canva ou votre boutique." },
        pt: { title: "Logo Transparente + Foto de Perfil 1:1 (.PNG)", desc: "Imagens de alta resolução prontas para WhatsApp Business, Instagram, TikTok, LinkedIn, Canva ou loja online." },
        de: { title: "Transparentes Logo + 1:1 Profilbild (.PNG)", desc: "Hochauflösende Bilder direkt für WhatsApp Business, Instagram, TikTok, LinkedIn, Canva oder Ihren Shop." },
        it: { title: "Logo Trasparente + Immagine Profilo 1:1 (.PNG)", desc: "Immagini ad alta risoluzione pronte per WhatsApp Business, Instagram, TikTok, LinkedIn, Canva o il tuo negozio." }
      }
    },
    {
      num: "05",
      format: ".DOCX · WORD",
      sampleUrl: "/assets/samples/Plantilla_Hoja_Membretada_arco_ingenieria.docx",
      thumb: "/assets/app_captures/arco_33_paso6_2_boveda_ejecutiva_descargas.png",
      plateNum: 5,
      i18n: {
        es: { title: "Hoja Membretada Editable (.DOCX)", desc: "Plantilla lista para abrir en Word o Google Docs con tu logo y tus colores para enviar cotizaciones, contratos y cartas formales." },
        en: { title: "Editable Letterhead Template (.DOCX)", desc: "Ready-to-open Word and Google Docs template with your logo and colors for quotes, proposals, and contracts." },
        fr: { title: "Papier à En-tête Modifiable (.DOCX)", desc: "Modèle Word et Google Docs prêt à l'emploi avec votre logo pour vos devis, contrats et courriers." },
        pt: { title: "Folha Timbrada Editável (.DOCX)", desc: "Modelo pronto para Word ou Google Docs com o seu logótipo e cores para orçamentos e contratos." },
        de: { title: "Editierbarer Briefbogen (.DOCX)", desc: "Fertige Vorlage für Word und Google Docs mit Ihrem Logo für Angebote, Verträge und Briefe." },
        it: { title: "Carta Intestata Modificabile (.DOCX)", desc: "Modello pronto per Word o Google Docs con il tuo logo per preventivi, proposte e contratti." }
      }
    },
    {
      num: "06",
      format: ".PPTX · SLIDES",
      sampleUrl: "/assets/samples/Plantilla_Presentacion_Ejecutiva_arco_ingenieria.pptx",
      thumb: "/assets/app_captures/arco_32_paso6_1_brandbook_lamina21_paleta.png",
      plateNum: 6,
      i18n: {
        es: { title: "Presentación Comercial 16:9 Editable (.PPTX)", desc: "Diapositivas listas en PowerPoint, Keynote o Google Slides con el diseño de tu marca para presentar tu negocio a clientes o socios." },
        en: { title: "Editable 16:9 Pitch Presentation (.PPTX)", desc: "Ready-to-edit slides for PowerPoint, Keynote, or Google Slides styled with your brand to pitch clients or partners." },
        fr: { title: "Présentation Commerciale 16:9 (.PPTX)", desc: "Diapositives modifiables pour PowerPoint, Keynote ou Google Slides aux couleurs de votre marque." },
        pt: { title: "Apresentação Comercial 16:9 Editável (.PPTX)", desc: "Diapositivos prontos para PowerPoint, Keynote ou Google Slides com o visual da sua marca." },
        de: { title: "Editierbare 16:9 Präsentation (.PPTX)", desc: "Fertige Folien für PowerPoint, Keynote oder Google Slides im Design Ihrer neuen Marke." },
        it: { title: "Presentazione Commerciale 16:9 (.PPTX)", desc: "Slide pronte per PowerPoint, Keynote o Google Slides con lo stile del tuo nuovo brand." }
      }
    },
    {
      num: "07",
      format: ".HTML · CORREO",
      sampleUrl: "/assets/samples/Firma_Corporativa_Luis_Ponce_ARCO_Ingenieria.html",
      thumb: "/assets/app_captures/arco_34_modal_firma_corporativa_luis_ponce.png",
      plateNum: 7,
      i18n: {
        es: { title: "Firma Profesional para tu Correo (.HTML)", desc: "Lista para copiar y pegar en Gmail, Outlook o Apple Mail con tu logo, tu puesto y botones directos de contacto." },
        en: { title: "Professional Email Signature (.HTML)", desc: "Ready to copy and paste into Gmail, Outlook, or Apple Mail with your logo, title, and direct contact links." },
        fr: { title: "Signature E-mail Professionnelle (.HTML)", desc: "Prête à copier-coller dans Gmail, Outlook ou Apple Mail avec votre logo et vos coordonnées." },
        pt: { title: "Assinatura de E-mail Profissional (.HTML)", desc: "Pronta para copiar e colar no Gmail, Outlook ou Apple Mail com o seu logótipo e contactos." },
        de: { title: "Professionelle E-Mail-Signatur (.HTML)", desc: "Kopierfertig für Gmail, Outlook oder Apple Mail mit Ihrem Logo und direkten Kontaktlinks." },
        it: { title: "Firma Email Professionale (.HTML)", desc: "Pronta da copiare e incollare su Gmail, Outlook o Apple Mail con il tuo logo e contatti diretti." }
      }
    },
    {
      num: "08",
      format: ".ZIP · FUENTES",
      sampleUrl: "/assets/samples/Kit_Fuentes_Oficiales_arco_ingenieria.zip",
      thumb: "/assets/app_captures/arco_21_paso4_4_tipografia_montserrat_arquitectura.png",
      plateNum: 8,
      i18n: {
        es: { title: "Paquete de Letras Oficiales Instalables (.ZIP)", desc: "Los archivos de las tipografías oficiales de tu marca con licencia comercial libre para instalarlos en tu computadora en dos clics." },
        en: { title: "Installable Brand Font Pack (.ZIP)", desc: "Your brand's official font files with free commercial licensing ready to install on Mac or Windows in two clicks." },
        fr: { title: "Pack de Polices Officielles (.ZIP)", desc: "Les fichiers des polices de votre marque avec licence commerciale gratuite à installer sur Mac ou PC." },
        pt: { title: "Pacote de Fontes Oficiais Instaláveis (.ZIP)", desc: "Os ficheiros das letras oficiais da sua marca com licença comercial livre prontos para instalar." },
        de: { title: "Installierbares Schriftarten-Paket (.ZIP)", desc: "Alle offiziellen Schriftdateien Ihrer Marke inklusive freier kommerzieller Lizenz für Mac und Windows." },
        it: { title: "Pacchetto Font Ufficiali Installabili (.ZIP)", desc: "I file dei caratteri ufficiali del tuo brand con licenza commerciale libera pronti da installare." }
      }
    },
    {
      num: "09",
      format: ".JSON / .SVG",
      sampleUrl: "/assets/samples/Sello_Circular_Curvas_arco_ingenieria.svg",
      thumb: "/assets/app_captures/arco_23_paso5_1_rueda_circular_colores_arco.png",
      plateNum: 9,
      i18n: {
        es: { title: "Sello Circular + Códigos para tu Sitio Web (.JSON)", desc: "Incluye tu sello redondo para stickers o empaques y la hoja exacta de colores y estilos para que cualquier programador o creador web arme tu página en minutos." },
        en: { title: "Circular Seal + Website Color Codes (.JSON)", desc: "Includes your round stamp for stickers or packaging plus exact color and font tokens so any web builder matches your brand instantly." },
        fr: { title: "Sceau Circulaire + Codes Web (.JSON)", desc: "Votre tampon rond pour stickers et les codes exacts de couleurs pour créer votre site web rapidement." },
        pt: { title: "Selo Circular + Códigos para Site (.JSON)", desc: "O seu carimbo circular para etiquetas e os códigos exatos de cores para criar o seu site rapidamente." },
        de: { title: "Rundes Siegel + Website-Farbcodes (.JSON)", desc: "Ihr rundes Markensiegel für Aufkleber sowie exakte Farb- und Schriftwerte für Ihre Website." },
        it: { title: "Sigillo Circolare + Codici per il Sito Web (.JSON)", desc: "Il tuo timbro rotondo per adesivi o packaging più i codici colore esatti per creare il tuo sito web." }
      }
    }
  ];

  const FORMAT_GLOSSARY = [
    { ext: ".PDF", use: { es: "Abrir, leer e imprimir tu Brandbook de +30 páginas en cualquier celular o computadora.", en: "Open, read, and print your 30+ page Brandbook on any phone or computer.", fr: "Lire et imprimer votre Brandbook de +30 pages partout.", pt: "Ler e imprimir o seu Brandbook de +30 páginas em qualquer ecrã.", de: "Ihr 30+ Seiten Brandbook überall lesen und drucken.", it: "Leggere e stampare il tuo Brandbook di +30 pagine ovunque." } },
    { ext: ".SVG", use: { es: "Tu logo para páginas web y letreros gigantes: nunca se ve borroso.", en: "Your logo for websites and giant signs: never gets blurry.", fr: "Votre logo pour le web et les grands formats : jamais flou.", pt: "O seu logo para sites e grandes formatos: nunca fica desfocado.", de: "Ihr Logo für Websites und Großdruck: niemals unscharf.", it: "Il tuo logo per siti web e grandi insegne: mai sfocato." } },
    { ext: ".AI", use: { es: "El archivo que entregas a la imprenta o taller de bordado.", en: "The master file you hand to professional printers or embroidery shops.", fr: "Le fichier à remettre à votre imprimeur ou brodeur.", pt: "O ficheiro que entrega à gráfica ou estúdio de bordado.", de: "Die Originaldatei für Druckereien und Stickereien.", it: "Il file da consegnare a tipografie o laboratori di ricamo." } },
    { ext: ".PNG", use: { es: "Para subir hoy mismo a Instagram, WhatsApp, TikTok y Canva.", en: "Ready to upload today to Instagram, WhatsApp, TikTok, and Canva.", fr: "Prêt pour Instagram, WhatsApp, TikTok et Canva.", pt: "Pronto para Instagram, WhatsApp, TikTok e Canva.", de: "Sofort bereit für Instagram, WhatsApp, TikTok und Canva.", it: "Pronto per Instagram, WhatsApp, TikTok e Canva." } },
    { ext: ".DOCX / .PPTX", use: { es: "Tus hojas membretadas en Word y diapositivas en PowerPoint listas para escribir.", en: "Your editable Word letterhead and PowerPoint slides ready to type into.", fr: "Vos documents Word et présentations PowerPoint prêts à éditer.", pt: "As suas folhas Word e apresentações PowerPoint prontas a escrever.", de: "Editierbare Word-Briefbögen und PowerPoint-Folien.", it: "Documenti Word e slide PowerPoint pronti da compilare." } }
  ];

  // Recorrido limpio en lenguaje sencillo de 16 años (CERO nombres de autores aquí)
  const CLEAN_TOUR_STEPS = [
    {
      step: 0,
      time: "3 min",
      free: true,
      img: "/assets/app_captures/arco_02_paso0_2_nombre_y_logo_actual_modernizar.png",
      color: "#426EAE",
      i18n: {
        es: { badge: "Paso 0 · Gratis", title: "Cuéntanos si empiezas desde cero o ya tienes logo", body: "Eliges tu idioma, nos dices de qué trata tu negocio en una frase sencilla y, si ya tienes un logo o nombre, lo subes para que Aura lo tome como punto de partida." },
        en: { badge: "Step 0 · Free", title: "Tell us if you're starting fresh or already have a logo", body: "Pick your language, describe what you sell in one simple sentence, and upload your current logo if you want Aura to modernize it." },
        fr: { badge: "Étape 0 · Gratuit", title: "Partez de zéro ou importez votre logo actuel", body: "Choisissez votre langue, décrivez votre activité simplement et importez votre logo actuel si vous souhaitez le moderniser." },
        pt: { badge: "Passo 0 · Grátis", title: "Comece do zero ou envie o seu logo atual", body: "Escolha o idioma, diga o que o seu negócio faz numa frase simples e envie o seu logo atual se quiser modernizá-lo." },
        de: { badge: "Schritt 0 · Gratis", title: "Neu starten oder bestehendes Logo hochladen", body: "Wählen Sie Ihre Sprache, beschreiben Sie Ihr Geschäft in einem Satz und laden Sie bei Bedarf Ihr aktuelles Logo hoch." },
        it: { badge: "Passo 0 · Gratis", title: "Parti da zero o carica il tuo logo attuale", body: "Scegli la lingua, descrivi in una frase cosa fai e carica il tuo logo attuale se vuoi modernizzarlo." }
      }
    },
    {
      step: 1,
      time: "8 min",
      free: true,
      img: "/assets/app_captures/arco_05_paso1_1_proposito_why_sinek.png",
      color: "#FF7A00",
      i18n: {
        es: { badge: "Paso 1 · Gratis", title: "La esencia de tu negocio en 5 preguntas cortas", body: "Respondes con tus propias palabras (o dictando por voz) por qué existe tu negocio, a quién ayudas y qué te hace distinto. ¿No sabes qué poner? Tocas «Dame una idea» y Aura te sugiere ejemplos reales." },
        en: { badge: "Step 1 · Free", title: "Your brand's essence in 5 quick questions", body: "Answer in your own words (or by voice) why your business exists, who you help, and how you're different. Stuck? Tap 'Give me an idea' for instant examples." },
        fr: { badge: "Étape 1 · Gratuit", title: "L'essence de votre projet en 5 questions courtes", body: "Répondez simplement à l'écrit ou à la voix. En panne d'inspiration ? Cliquez sur « Donne-moi une idée »." },
        pt: { badge: "Passo 1 · Grátis", title: "A essência do seu negócio em 5 perguntas curtas", body: "Responda com as suas palavras ou por voz. Sem ideias? Toque em «Dá-me uma ideia» para ver sugestões reais." },
        de: { badge: "Schritt 1 · Gratis", title: "Der Kern Ihres Geschäfts in 5 kurzen Fragen", body: "Antworten Sie frei per Text oder Sprache. Keine Idee? Tippen Sie einfach auf ‚Gib mir eine Idee‘." },
        it: { badge: "Passo 1 · Gratis", title: "L'essenza della tua attività in 5 brevi domande", body: "Rispondi con parole tue o con la voce. Non sai cosa scrivere? Tocca «Dammi un'idea»." }
      }
    },
    {
      step: 2,
      time: "6 min",
      free: true,
      img: "/assets/app_captures/arco_12_paso2_1_touchpoints_antes_carlzon.png",
      color: "#4C9DE6",
      i18n: {
        es: { badge: "Paso 2 · Gratis", title: "Dónde te ven tus clientes", body: "Con simples toques marcas dónde te descubren y compran tus clientes (redes, empaque, local, uniforme, web). Así tu Brandbook mostrará ejemplos exactamente de tu giro." },
        en: { badge: "Step 2 · Free", title: "Where customers see and buy from you", body: "Tap the places where customers interact with you (social media, packaging, storefront, uniforms, web) so your Brandbook fits your real world." },
        fr: { badge: "Étape 2 · Gratuit", title: "Où vos clients vous voient", body: "Sélectionnez en un toucher vos points de contact (réseaux, emballages, boutique, web) pour adapter votre Brandbook." },
        pt: { badge: "Passo 2 · Grátis", title: "Onde os seus clientes o encontram", body: "Marque com um toque onde o cliente vê a sua marca (redes, embalagens, loja, fardas, site)." },
        de: { badge: "Schritt 2 · Gratis", title: "Wo Kunden Ihre Marke erleben", body: "Tippen Sie an, wo Kunden Ihnen begegnen (Social Media, Verpackung, Laden, Kleidung, Website)." },
        it: { badge: "Passo 2 · Gratis", title: "Dove i clienti vedono il tuo brand", body: "Seleziona con un tocco dove i clienti entrano in contatto con te (social, packaging, negozio, sito)." }
      }
    },
    {
      step: 3,
      time: "7 min",
      free: true,
      img: "/assets/app_captures/arco_17_paso3_3_confirmacion_eslogan_clase_niza37_ries_trout.png",
      color: "#0D2540",
      i18n: {
        es: { badge: "Paso 3 · Gratis", title: "Tu nombre comercial y tu frase gancho", body: "Confirmas tu nombre actual o dejas que Aura te proponga nombres fáciles de recordar, eliges tu eslogan y revisas en qué categoría registrar tu marca." },
        en: { badge: "Step 3 · Free", title: "Your brand name and catchy tagline", body: "Keep your current name or pick from memorable suggestions, choose your tagline, and see the right category to register your trademark." },
        fr: { badge: "Étape 3 · Gratuit", title: "Votre nom et votre slogan", body: "Gardez votre nom ou choisissez parmi des idées mémorables, définissez votre slogan et préparez la protection de votre marque." },
        pt: { badge: "Passo 3 · Grátis", title: "O seu nome comercial e eslogan", body: "Confirme o seu nome ou escolha sugestões fáceis de lembrar, defina o seu eslogan e veja a categoria de registo." },
        de: { badge: "Schritt 3 · Gratis", title: "Ihr Markenname und Ihr Slogan", body: "Behalten Sie Ihren Namen oder wählen Sie aus einprägsamen Vorschlägen inklusive passendem Slogan." },
        it: { badge: "Passo 3 · Gratis", title: "Il tuo nome e il tuo slogan", body: "Conferma il tuo nome o scegli tra proposte facili da ricordare, definisci lo slogan e la categoria di registrazione." }
      }
    },
    {
      step: 4,
      time: "10 min",
      free: false,
      img: "/assets/app_captures/arco_21_paso4_4_tipografia_montserrat_arquitectura.png",
      color: "#426EAE",
      i18n: {
        es: { badge: "Paso 4 · Pro ($49 USD)", title: "El estilo visual y las letras de tu marca", body: "Mueves controles simples (de clásico a moderno, de suave a firme) y ves tu propio nombre escrito en combinaciones de letras profesionales hasta elegir tu favorita." },
        en: { badge: "Step 4 · Pro ($49 USD)", title: "Your visual style and brand fonts", body: "Slide simple style controls (classic to modern, soft to bold) and preview your own brand name in curated font pairings." },
        fr: { badge: "Étape 4 · Pro (49 $ USD)", title: "Votre style visuel et vos polices", body: "Ajustez des curseurs simples et prévisualisez le nom de votre marque dans des duos de polices professionnels." },
        pt: { badge: "Passo 4 · Pro ($49 USD)", title: "O estilo visual e as letras da sua marca", body: "Mova controlos simples e veja o nome da sua marca aplicado em combinações profissionais de fontes." },
        de: { badge: "Schritt 4 · Pro ($49 USD)", title: "Visueller Stil und Ihre Markenschriften", body: "Stellen Sie den Stil per Regler ein und sehen Sie Ihren eigenen Markennamen live in passenden Schriftpaaren." },
        it: { badge: "Passo 4 · Pro ($49 USD)", title: "Lo stile visivo e i font del tuo brand", body: "Regola controlli semplici e guarda il tuo nome applicato dal vivo su coppie di font professionali." }
      }
    },
    {
      step: 5,
      time: "14 min",
      free: false,
      img: "/assets/app_captures/arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png",
      color: "#FF7A00",
      i18n: {
        es: { badge: "Paso 5 · Pro ($49 USD)", title: "Tus colores exactos y el diseño de tu logotipo", body: "Eliges tu paleta de colores armónica, comparas propuestas limpias de logotipo, pides ajustes con tus propias palabras si quieres cambiar un detalle y apruebas tu favorito." },
        en: { badge: "Step 5 · Pro ($49 USD)", title: "Your color palette and custom logo design", body: "Choose a balanced color palette, compare clean logo proposals, request tweaks in plain words, and lock in your favorite." },
        fr: { badge: "Étape 5 · Pro (49 $ USD)", title: "Vos couleurs et la création de votre logo", body: "Choisissez votre palette de couleurs, comparez des propositions de logos nettes et affinez chaque détail." },
        pt: { badge: "Passo 5 · Pro ($49 USD)", title: "As suas cores e o design do logótipo", body: "Escolha a sua paleta de cores, compare propostas limpas de logótipo e ajuste qualquer detalhe." },
        de: { badge: "Schritt 5 · Pro ($49 USD)", title: "Ihre Farbpalette und Ihr individuelles Logo", body: "Wählen Sie harmonische Farben, vergleichen Sie klare Logo-Entwürfe und passen Sie Details gezielt an." },
        it: { badge: "Passo 5 · Pro ($49 USD)", title: "I tuoi colori e il design del tuo logo", body: "Scegli la tua palette colori, confronta proposte di logo pulite e rifinisci ogni dettaglio." }
      }
    },
    {
      step: 6,
      time: "5 min",
      free: false,
      img: "/assets/app_captures/arco_30_paso6_1_brandbook_lamina01_portada.png",
      color: "#0D2540",
      i18n: {
        es: { badge: "Paso 6 · Entrega Final", title: "Tu Brandbook de +30 páginas y descarga en un clic", body: "Revisas lámina por lámina tu manual terminado en celular o computadora y descargas todo tu paquete (.PDF, .SVG, .AI, .PNG, Word, PowerPoint, firma y fuentes)." },
        en: { badge: "Step 6 · Final Delivery", title: "Your 30+ page Brandbook & one-click download", body: "Flip through every page of your finished Brandbook on phone or computer and download all 9 production files right away." },
        fr: { badge: "Étape 6 · Livraison", title: "Votre Brandbook (+30 pages) et téléchargement immédiat", body: "Parcourez chaque page de votre manuel terminé et téléchargez tous vos fichiers prêts à l'emploi." },
        pt: { badge: "Passo 6 · Entrega Final", title: "O seu Brandbook (+30 páginas) e descarga num clique", body: "Veja página por página o seu manual concluído e transfira todos os 9 ficheiros de imediato." },
        de: { badge: "Schritt 6 · Übergabe", title: "Ihr 30+ Seiten Brandbook & Sofort-Download", body: "Blättern Sie durch Ihr fertiges Handbuch und laden Sie alle 9 Produktionsdateien sofort herunter." },
        it: { badge: "Passo 6 · Consegna", title: "Il tuo Brandbook (+30 pagine) e download immediato", body: "Sfoglia ogni pagina del tuo manuale completato e scarica subito tutti i 9 file." }
      }
    }
  ];

  // Propuestas limpias del caso real ARCO Ingeniería (Cero codenames internos)
  const ARCO_LOGO_ITERATIONS = [
    { id: 1, badge: "Punto de Partida", name: "Logo Anterior del Cliente", desc: "Imagen original subida en el Paso 0. Aura rescata sus colores azul, turquesa y gris acero.", logoImg: "/assets/logos/arco_ingenieria_logo4k_original.png", screenImg: "/assets/app_captures/arco_24_paso5_2_iter1_logo_base_original.png" },
    { id: 2, badge: "Opción #2", name: "Emblema Arquitectónico", desc: "Actualiza la letra cursiva antigua por una tipografía firme e integra el puente estructural.", logoImg: "/assets/logos/arco_iter2_full.png", screenImg: "/assets/app_captures/arco_25_paso5_2_iter2_nanobanana_emblema_autor.png" },
    { id: 3, badge: "Opción #3", name: "Monograma «A» Estructural", desc: "Une la inicial «A» en gris acero con un doble arco envolvente limpio y fácil de bordar.", logoImg: "/assets/logos/arco_iter3_full.png", screenImg: "/assets/app_captures/arco_26_paso5_2_iter3_nanobanana_monograma_giro.png" },
    { id: 4, badge: "Opción #4", name: "Sello Circular para Cascos y Planos", desc: "Versión redonda pensada para sellos oficiales, cascos de obra y stickers.", logoImg: "/assets/logos/arco_iter4_full.png", screenImg: "/assets/app_captures/arco_27_paso5_2_iter4_nanobanana_insignia_sello.png" },
    { id: 5, badge: "★ Elegido por el Cliente", name: "Lineal Minimalista (#5)", desc: "Arco estructural limpio con dos torres esbeltas. Elegido para construir su Brandbook de 36 páginas.", logoImg: "/assets/logos/arco_iter5_full.png", screenImg: "/assets/app_captures/arco_28_paso5_2_iter5_nanobanana_lineal_minimalista.png" },
    { id: 6, badge: "Opción #6", name: "Variante Refinada por Voz/Texto", desc: "Ajuste pedido en una frase para fusionar la inicial con las torres residenciales.", logoImg: "/assets/logos/arco_iter6_full.png", screenImg: "/assets/app_captures/arco_29_paso5_2_iter6_nanobanana_evolucion_conversacional_final.png" }
  ];

  const ARCO_PDF_PLATES_SHOWCASE = [
    { code: "Página 01", title: "Portada Oficial · ARCO Ingeniería", img: "/assets/app_captures/pdf_lamina_01_portada.png" },
    { code: "Página 03", title: "Esencia y Propósito del Negocio", img: "/assets/app_captures/pdf_lamina_03_why_circulo_dorado.png" },
    { code: "Página 08", title: "Perfil del Cliente Ideal", img: "/assets/app_captures/pdf_lamina_08_touchpoints.png" },
    { code: "Página 11", title: "Aplicaciones en Obra y Uniformes", img: "/assets/app_captures/pdf_lamina_11_naming_niza37.png" },
    { code: "Página 13", title: "Versiones Oficiales del Logotipo", img: "/assets/app_captures/pdf_lamina_13_terna_curvas.png" },
    { code: "Página 16", title: "Espacio Libre y Tamaños Mínimos", img: "/assets/app_captures/pdf_lamina_16_reticula_8x3x.png" },
    { code: "Página 21", title: "Colores Oficiales para Pantalla e Imprenta", img: "/assets/app_captures/pdf_lamina_21_paleta_cromatica.png" },
    { code: "Página 25", title: "Papelería y Tarjeta de Presentación", img: "/assets/app_captures/pdf_lamina_25_tipografia_montserrat.png" }
  ];

  // ============================================================================
  // EXCLUSIVO DE LA SUBPÁGINA 5 (REFERENCIAS): AUTORES, LIBROS, VIDEOS Y DIAGRAMAS
  // ============================================================================
  const ACADEMIC_INFOGRAPHIC_STAGES = [
    {
      step: 0,
      code: "ETAPA 00",
      color: "#426EAE",
      authors: "Peter Drucker · David Aaker · Sagi Haviv · Theodore Levitt",
      works: "Managing Brand Equity (1991) · Marketing Myopia (1960) · Identify (2011)",
      diagramType: "equity_audit",
      title: "Diagnóstico de Punto de Partida y Capital de Marca",
      thesis: "Define el giro real orientado al beneficio del cliente (Levitt & Drucker) y preserva los activos visuales reconocidos cuando una empresa ya opera en el mercado (Aaker & Haviv)."
    },
    {
      step: 1,
      code: "ETAPA 01",
      color: "#FF7A00",
      authors: "Simon Sinek · Donald Miller · Carl Jung · Alexander Osterwalder",
      works: "Start With Why (2009) · Building a StoryBrand (2017) · Value Proposition Design (2014)",
      diagramType: "golden_circle",
      title: "Círculo Dorado (Why → How → What), Narrativa Clara y Arquetipo Humano",
      thesis: "Las marcas memorables comunican desde su propósito central (Sinek), posicionan al cliente como protagonista con un plan simple (Miller) y mantienen una voz humana coherente (Jung)."
    },
    {
      step: 2,
      code: "ETAPA 02",
      color: "#4C9DE6",
      authors: "Jan Carlzon · Bernd Schmitt · Byron Sharp",
      works: "Moments of Truth (1987) · Experiential Marketing (1999) · How Brands Grow (2010)",
      diagramType: "touchpoints_wave",
      title: "Momentos de la Verdad y Disponibilidad Física/Digital",
      thesis: "Cada contacto de 15 segundos Antes, Durante y Después de la compra construye la confianza real del cliente y define dónde debe brillar el sistema visual (Carlzon & Sharp)."
    },
    {
      step: 3,
      code: "ETAPA 03",
      color: "#0D2540",
      authors: "Alexandra Watkins · Al Ries & Jack Trout · Clasificación Internacional OMPI de Niza",
      works: "Hello, My Name Is Awesome (2014) · Positioning (1981) · Arreglo de Niza (OMPI)",
      diagramType: "smile_radar",
      title: "Modelo Fonético SMILE, Posicionamiento Verbal y Registro Marcario",
      thesis: "Evalúa sonoridad, facilidad de recuerdo y extensión comercial del nombre (Watkins), acompañado de un eslogan claro (Ries & Trout) y sus clases internacionales de Niza."
    },
    {
      step: 4,
      code: "ETAPA 04",
      color: "#426EAE",
      authors: "Charles E. Osgood · Mitsuo Nagamachi · Robert Bringhurst · Wolfgang Köhler",
      works: "The Measurement of Meaning (1957) · Kansei Engineering (1995) · The Elements of Typographic Style (1992)",
      diagramType: "osgood_kansei",
      title: "Diferencial Semántico de Osgood, Ingeniería Kansei y Armonía Tipográfica",
      thesis: "Traduce adjetivos emocionales en proporciones geométricas, radios de curvatura, tensión visual (efecto Bouba/Kiki) y selección tipográfica legible."
    },
    {
      step: 5,
      code: "ETAPA 05",
      color: "#FF7A00",
      authors: "Paul Rand · Masaaki Imai (Kaizen) · Max Wertheimer (Gestalt) · Josef Albers",
      works: "Thoughts on Design (1947) · Kaizen (1986) · Interaction of Color (1963)",
      diagramType: "kaizen_bezier_grid",
      title: "Síntesis Icónica de Paul Rand, Psicología del Color e Iteración Continua Kaizen",
      thesis: "Un gran símbolo combina simplicidad, recordación y versatilidad a cualquier escala (Rand), refinado paso a paso (Imai) con contraste cromático verificado (Albers)."
    },
    {
      step: 6,
      code: "ETAPA 06",
      color: "#0D2540",
      authors: "Massimo Vignelli · Josef Müller-Brockmann · Richard Danne & Bruce Blackburn · Alina Wheeler",
      works: "The Vignelli Canon (2010) · Grid Systems in Graphic Design (1981) · Designing Brand Identity (2017)",
      diagramType: "vignelli_canon",
      title: "Canon Editorial de Vignelli, Sistemas de Retículas y Manual de Marca",
      thesis: "Codifica todas las reglas estratégicas, cromáticas, tipográficas y vectoriales en un Brandbook claro de más de 30 páginas listo para escalar el negocio sin perder coherencia."
    }
  ];

  const YOUTUBE_METHODOLOGY_AUTHORS = [
    { id: "qp0HIF3SfI4", author: "Simon Sinek", step: "Etapa 01 · Propósito", title: "How Great Leaders Inspire Action (Start With Why)", duration: "18:04" },
    { id: "7X_WvGAhMlQ", author: "Jan Carlzon", step: "Etapa 02 · Puntos de Contacto", title: "Moments of Truth: Managing Customer Experience", duration: "14:22" },
    { id: "W_K_0rM9q38", author: "Al Ries & Jack Trout", step: "Etapa 03 · Posicionamiento", title: "The 22 Immutable Laws of Branding & Positioning", duration: "24:15" },
    { id: "rDkaXDDg88c", author: "Mitsuo Nagamachi", step: "Etapa 04 · Ingeniería Kansei", title: "Kansei Engineering & Sensory Design Architecture", duration: "19:40" },
    { id: "ybuT4EsqU3A", author: "Marty Neumeier & Sagi Haviv", step: "Etapa 05 · Diseño de Identidad", title: "The Brand Gap & Iconic Logo Design Principles", duration: "32:10" },
    { id: "mYF2_FBCvXw", author: "Michael Porter & Massimo Vignelli", step: "Etapa 06 · Estrategia y Sistemas", title: "What is Strategy? & The Vignelli Canon of Grids", duration: "27:50" }
  ];

  const FOUNDER_ESSENTIAL_BOOKS = [
    { id: "start_with_why", category: "branding", categoryLabel: "Propósito", year: "2009", title: "Start with Why", author: "Simon Sinek", takeaway: "Por qué los clientes conectan primero con el propósito real de una empresa antes que con las características técnicas.", kindleUrl: "https://www.amazon.com/dp/B002Q6XUE4" },
    { id: "moments_truth", category: "branding", categoryLabel: "Experiencia", year: "1987", title: "Moments of Truth", author: "Jan Carlzon", takeaway: "Cómo cada contacto breve entre tu cliente y tu empresa define la reputación de tu marca.", kindleUrl: "https://www.amazon.com/dp/B001ANYDL0" },
    { id: "aaker_equity", category: "branding", categoryLabel: "Valor de Marca", year: "1991", title: "Managing Brand Equity", author: "David A. Aaker", takeaway: "Cómo proteger y multiplicar el reconocimiento visual y comercial al modernizar una marca.", kindleUrl: "https://www.amazon.com/dp/0029001013" },
    { id: "haviv_identify", category: "design", categoryLabel: "Logotipos", year: "2011", title: "Identify: Basic Principles of Identity Design", author: "Sagi Haviv, Chermayeff & Geismar", takeaway: "Las tres reglas prácticas de un gran símbolo: simple, memorable y funcional en cualquier tamaño.", kindleUrl: "https://www.amazon.com/dp/1440310327" },
    { id: "brand_gap", category: "design", categoryLabel: "Estrategia + Diseño", year: "2003", title: "The Brand Gap", author: "Marty Neumeier", takeaway: "El puente directo entre la estrategia comercial de negocio y una identidad visual clara.", kindleUrl: "https://www.amazon.com/dp/B000SEI7P8" },
    { id: "storybrand_miller", category: "strategy", categoryLabel: "Mensaje Claro", year: "2017", title: "Building a StoryBrand", author: "Donald Miller", takeaway: "Cómo explicar lo que vendes con tanta claridad que cualquier persona lo entienda en segundos.", kindleUrl: "https://www.amazon.com/dp/B06XFJ2JGR" },
    { id: "bmg_osterwalder", category: "strategy", categoryLabel: "Modelo de Negocio", year: "2010", title: "Business Model Generation", author: "Alexander Osterwalder & Yves Pigneur", takeaway: "Cómo alinear tu propuesta de valor con tus clientes ideales y tus canales de venta.", kindleUrl: "https://www.amazon.com.mx/dp/B01B3J471E" },
    { id: "lean_startup", category: "strategy", categoryLabel: "Agilidad", year: "2011", title: "The Lean Startup", author: "Eric Ries", takeaway: "Lanzar con agilidad, aprender rápido en el mercado real y mejorar de forma continua.", kindleUrl: "https://www.amazon.com/dp/B004J4XGN6" }
  ];

  const AURA_CAPSULE_SUMMARIES = {
    0: {
      es: { title: "Paso 0 · Punto de Partida", text: "¡Hola! Soy Aura. En menos de sesenta minutos crearemos tu marca completa y tu Brandbook de más de treinta páginas. Empecemos por lo básico." },
      en: { title: "Step 0 · Starting Point", text: "Hi! I'm Aura. In under sixty minutes we'll build your complete brand and your thirty-plus page Brandbook. Let's start with the basics." },
      fr: { title: "Étape 0 · Point de Départ", text: "Bonjour ! Je suis Aura. En moins de soixante minutes, nous allons créer votre marque complète et votre Brandbook de plus de trente pages." },
      pt: { title: "Passo 0 · Ponto de Partida", text: "Olá! Sou a Aura. Em menos de sessenta minutos vamos criar a sua marca completa e o seu Brandbook com mais de trinta páginas." },
      de: { title: "Schritt 0 · Startpunkt", text: "Hallo! Ich bin Aura. In unter sechzig Minuten erstellen wir Ihre komplette Marke und Ihr Brandbook mit über dreißig Seiten." },
      it: { title: "Passo 0 · Punto di Partenza", text: "Ciao! Sono Aura. In meno di sessanta minuti creeremo il tuo brand completo e il tuo Brandbook di oltre trenta pagine." }
    },
    1: {
      es: { title: "Paso 1 · Esencia de tu Negocio", text: "Aquí definimos la esencia de tu marca: qué haces, a quién ayudas y por qué te van a preferir. Responde como si se lo contaras a un amigo." },
      en: { title: "Step 1 · Your Brand Essence", text: "Now let's capture the heart of your business: what you do, who you help, and why people will choose you. Just write naturally." },
      fr: { title: "Étape 1 · Essence du Projet", text: "Définissons maintenant le cœur de votre activité : ce que vous faites, qui vous aidez et pourquoi on vous choisira." },
      pt: { title: "Passo 1 · Essência do Negócio", text: "Agora definimos a essência da sua marca: o que faz, quem ajuda e porque vão escolher a sua empresa." },
      de: { title: "Schritt 1 · Markenkern", text: "Jetzt halten wir fest, wofür Ihr Geschäft steht: was Sie tun, wem Sie helfen und warum Kunden Sie wählen." },
      it: { title: "Passo 1 · Essenza del Brand", text: "Ora definiamo il cuore della tua attività: cosa fai, chi aiuti e perché i clienti sceglieranno proprio te." }
    },
    2: {
      es: { title: "Paso 2 · Dónde te ven tus clientes", text: "Ahora elijamos dónde te ven tus clientes: redes sociales, empaques, local o sitio web. Así diseñaremos justo lo que vas a usar." },
      en: { title: "Step 2 · Customer Touchpoints", text: "Next, pick where customers see your brand: social media, packaging, storefront, or website, so we design exactly what you need." },
      fr: { title: "Étape 2 · Points de Contact", text: "Choisissons où vos clients voient votre marque : réseaux sociaux, emballages, boutique ou site web." },
      pt: { title: "Passo 2 · Onde o Cliente Vê", text: "Escolha onde os clientes encontram a sua marca: redes sociais, embalagens, loja física ou site." },
      de: { title: "Schritt 2 · Kontaktpunkte", text: "Wählen Sie aus, wo Kunden Ihre Marke sehen: Social Media, Verpackung, Geschäft oder Website." },
      it: { title: "Passo 2 · Dove ti vedono", text: "Scegliamo dove i clienti vedono il tuo brand: social, confezioni, negozio fisico o sito web." }
    },
    3: {
      es: { title: "Paso 3 · Nombre y Eslogan", text: "Es momento del nombre y tu frase clave. Puedes conservar tu nombre actual o dejar que te proponga ideas fáciles de recordar." },
      en: { title: "Step 3 · Name & Tagline", text: "Time for your brand name and tagline. Keep your current name or pick from clear, memorable ideas ready to register." },
      fr: { title: "Étape 3 · Nom et Slogan", text: "Passons au nom et au slogan. Gardez votre nom actuel ou choisissez parmi des idées simples et faciles à retenir." },
      pt: { title: "Passo 3 · Nome e Eslogan", text: "Hora do nome e da frase principal. Pode manter o seu nome atual ou escolher ideias curtas e fáceis de lembrar." },
      de: { title: "Schritt 3 · Name & Slogan", text: "Zeit für Namen und Slogan. Behalten Sie Ihren aktuellen Namen oder wählen Sie aus klaren, einprägsamen Ideen." },
      it: { title: "Passo 3 · Nome e Slogan", text: "È il momento del nome e dello slogan. Mantieni il tuo nome attuale oppure scegli tra idee chiare e memorabili." }
    },
    4: {
      es: { title: "Paso 4 · Estilo y Letras", text: "Pasemos al estilo visual. Con controles simples ajustaremos qué tan moderna, clásica o atrevida se verá tu marca y elegiremos tus letras." },
      en: { title: "Step 4 · Style & Fonts", text: "Let's shape your visual style. Use simple sliders to set how modern, classic, or bold your brand feels, and pick your fonts." },
      fr: { title: "Étape 4 · Style et Polices", text: "Passons au style visuel. Ajustez des curseurs simples pour définir l'allure de votre marque et choisir vos polices." },
      pt: { title: "Passo 4 · Estilo e Fontes", text: "Vamos ao estilo visual. Com controlos simples ajustamos o visual da sua marca e escolhemos as suas letras oficiais." },
      de: { title: "Schritt 4 · Stil & Schriften", text: "Gestalten wir Ihren visuellen Stil. Mit einfachen Reglern bestimmen Sie den Charakter Ihrer Marke und Ihre Schriften." },
      it: { title: "Passo 4 · Stile e Font", text: "Passiamo allo stile visivo. Con semplici cursori definiamo il carattere del tuo brand e scegliamo i tuoi font." }
    },
    5: {
      es: { title: "Paso 5 · Colores y Logotipo", text: "¡Llegó mi parte favorita! Elegiremos tus colores exactos y diseñaremos tu logotipo limpio y profesional listo para cualquier tamaño." },
      en: { title: "Step 5 · Colors & Logo", text: "Here comes the best part! We'll pick your exact color palette and craft a clean, versatile logo that looks sharp at any size." },
      fr: { title: "Étape 5 · Couleurs et Logo", text: "Voici ma partie préférée ! Choisissons vos couleurs exactes et créons un logo net, prêt pour tous vos supports." },
      pt: { title: "Passo 5 · Cores e Logótipo", text: "Chegou a melhor parte! Vamos escolher as suas cores exatas e criar um logótipo limpo e profissional." },
      de: { title: "Schritt 5 · Farben & Logo", text: "Jetzt kommt das Highlight! Wir wählen Ihre exakten Farben und entwerfen Ihr klares, vielseitiges Markenlogo." },
      it: { title: "Passo 5 · Colori e Logo", text: "Ecco la parte più bella! Sceglieremo i tuoi colori esatti e creeremo un logo pulito e versatile per ogni formato." }
    },
    6: {
      es: { title: "Paso 6 · Tu Brandbook Listo", text: "¡Lo lograste! Aquí tienes tu Brandbook de más de treinta páginas, tus logos en curvas y tus plantillas listas para descargar y vender." },
      en: { title: "Step 6 · Your Brandbook Is Ready", text: "You did it! Here is your thirty-plus page Brandbook, vector logos, and templates ready to download and launch today." },
      fr: { title: "Étape 6 · Votre Brandbook est Prêt", text: "Bravo ! Voici votre Brandbook de plus de trente pages, vos logos vectoriels et vos modèles prêts à télécharger." },
      pt: { title: "Passo 6 · Brandbook Concluído", text: "Conseguiu! Aqui está o seu Brandbook com mais de trinta páginas, logótipos em curvas e modelos prontos a transferir." },
      de: { title: "Schritt 6 · Ihr Brandbook ist fertig", text: "Geschafft! Hier sind Ihr Brandbook mit über dreißig Seiten, Ihre Vektor-Logos und alle Vorlagen zum Download." },
      it: { title: "Passo 6 · Il Tuo Brandbook è Pronto", text: "Ce l'hai fatta! Ecco il tuo Brandbook di oltre trenta pagine, i loghi vettoriali e i modelli pronti da scaricare." }
    }
  };

  // Estado Global Comercial V129
  window.tbbCommercialDemoState = {
    activeMainSection: 1, // 1: Inicio (Hook + Live Demo), 2: Qué Recibes, 3: Cómo Funciona, 4: Ejemplos Reales, 5: Referencias
    demoViewportMode: "full", // "full" | "mobile"
    activeDemoStep: 0,
    brandName: "",
    tourActiveStep: 0,
    tourDeviceFormFactor: "mobile",
    beforeAfterVal: 52,
    selectedArcoIterId: 5,
    heroSelectedTheoryIdx: 0,
    heroConvergenceActive: false,
    kanseiGeoVal: 70,
    kanseiVanguardVal: 68,
    kanseiWeightVal: 60,
    openVideoModalStep: null,
    promoDrawerOpen: false,
    appliedCoupon: null,
    migratedSteps0to3Snapshot: null
  };

  const SUBPAGE_META = {
    1: { slug: "inicio", path: "/" },
    2: { slug: "que-recibes", path: "/que-recibes" },
    3: { slug: "como-funciona", path: "/como-funciona" },
    4: { slug: "ejemplos", path: "/ejemplos" },
    5: { slug: "referencias", path: "/referencias" }
  };

  function hardStopAllWebAudio(reason) {
    if (window.TBBAudioDirector && typeof window.TBBAudioDirector.bumpGeneration === "function") {
      window.TBBAudioDirector.bumpGeneration(reason || "web_nav");
    }
    ["tbbRealStudioDemoIframe", "tbbImmersiveStudioCloneIframe"].forEach((id) => {
      const ifr = document.getElementById(id);
      if (ifr && ifr.contentWindow) {
        try {
          ifr.contentWindow.postMessage({ type: "TBB_HARD_STOP_ALL_AUDIO", reason: reason || "web_nav" }, "*");
        } catch (e) {}
      }
    });
  }

  window.tbbSetActiveMainTab = function (slugOrNum) {
    const map = {
      "1": 1, "inicio": 1, "home": 1, "demo": 1, "live-demo": 1, "aplicacion": 1,
      "2": 2, "que-recibes": 2, "entregables": 2, "pack-descargas": 2, "downloads": 2,
      "3": 3, "como-funciona": 3, "recorrido": 3, "app-tour": 3, "tour": 3,
      "4": 4, "ejemplos": 4, "casos-reales": 4, "cases": 4,
      "5": 5, "referencias": 5, "bases-teoricas": 5, "bases-tecnicas": 5, "theory": 5
    };
    const sec = map[String(slugOrNum || "1").toLowerCase()] || 1;
    window.tbbSwitchMainSection(sec);
  };

  window.tbbSwitchMainSection = function (sectionNum, skipPushState) {
    const s = [1, 2, 3, 4, 5].includes(Number(sectionNum)) ? Number(sectionNum) : 1;
    hardStopAllWebAudio("switch_tab_" + s);
    window.tbbCloseVideoPopupModal();
    window.tbbCloseMobileNavDrawer();
    window.tbbCommercialDemoState.activeMainSection = s;

    if (!skipPushState && window.history && window.history.pushState) {
      const meta = SUBPAGE_META[s] || SUBPAGE_META[1];
      try {
        window.history.pushState({ section: s }, "", meta.path + window.location.search);
      } catch (e) {}
    }

    window.tbbRefreshCommercialPortalDOM();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.tbbOpenMobileNavDrawer = function () {
    const dr = document.getElementById("tbbMobileDrawerOverlay");
    if (dr) dr.classList.add("open");
  };
  window.tbbCloseMobileNavDrawer = function () {
    const dr = document.getElementById("tbbMobileDrawerOverlay");
    if (dr) dr.classList.remove("open");
  };

  // ============================================================================
  // DEMO PERSISTENTE EN INICIO (NUNCA SE DESTRUYE AL CAMBIAR DE PESTAÑA)
  // ============================================================================
  function ensurePersistentDemoStageMounted() {
    let host = document.getElementById("tbbPersistentDemoIframeHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "tbbPersistentDemoIframeHost";
      host.className = "tbb-live-demo-frame-shell";
      const l = getLang();
      host.innerHTML = `
        <iframe
          id="tbbRealStudioDemoIframe"
          title="The Best Brand — Live Interactive Demo"
          src="/studio?demo=true&novideo=1&embed=web_home&lang=${encodeURIComponent(l)}"
          class="tbb-live-demo-iframe"
          allow="microphone; autoplay; clipboard-write"
        ></iframe>
      `;
    }
    const slot = document.getElementById("tbbHomeLiveDemoMountSlot");
    if (slot && host.parentElement !== slot) {
      slot.innerHTML = "";
      slot.appendChild(host);
      host.style.display = "block";
    } else if (!slot && host.parentElement) {
      // Mantenemos el iframe vivo en un contenedor oculto para conservar 100% de lo escrito por el usuario
      let park = document.getElementById("tbbHiddenDemoParkingLot");
      if (!park) {
        park = document.createElement("div");
        park.id = "tbbHiddenDemoParkingLot";
        park.style.cssText = "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;pointer-events:none;opacity:0;";
        document.body.appendChild(park);
      }
      if (host.parentElement !== park) {
        park.appendChild(host);
      }
    }
  }

  window.tbbSetDemoViewportMode = function (mode) {
    const valid = mode === "mobile" ? "mobile" : "full";
    window.tbbCommercialDemoState.demoViewportMode = valid;
    const wrap = document.getElementById("tbbHomeLiveDemoOuterWrap");
    if (wrap) {
      wrap.classList.toggle("is-mobile-frame", valid === "mobile");
    }
    document.querySelectorAll("[data-demo-view-btn]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-demo-view-btn") === valid);
    });
  };

  window.tbbJumpDemoToStep = function (stepIdx) {
    const s = Math.max(0, Math.min(6, Number(stepIdx) || 0));
    hardStopAllWebAudio("demo_jump_" + s);
    if (s >= 4 && !hasProLicense()) {
      window.tbbOpenBuyAppCheckoutModal("founder_pro");
      return;
    }
    window.tbbCommercialDemoState.activeDemoStep = s;
    document.querySelectorAll("[data-demo-step-pill]").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.getAttribute("data-demo-step-pill")) === s);
    });
    const ifr = document.getElementById("tbbRealStudioDemoIframe");
    if (ifr && ifr.contentWindow) {
      try {
        ifr.contentWindow.postMessage({ type: "TBB_JUMP_TO_STEP", step: s }, "*");
      } catch (e) {}
    }
  };

  window.tbbOpenImmersiveStudioClone = function (startStep) {
    hardStopAllWebAudio("open_immersive");
    const stepParam = typeof startStep === "number" ? startStep : (window.tbbCommercialDemoState.activeDemoStep || 0);
    window.location.href = `/studio?step=${encodeURIComponent(stepParam)}&continue=true&lang=${encodeURIComponent(getLang())}`;
  };

  window.tbbExitImmersiveStudioClone = function () {
    document.body.classList.remove("tbb-immersive-studio-mode");
    const ov = document.getElementById("tbbImmersiveStudioCloneOverlay");
    if (ov) ov.remove();
  };

  window.tbbShowImmersiveStep4Banner = function () {};

  // ============================================================================
  // SECCIÓN 1: INICIO ("YOUR BRAND, NOW!!!" + PROMESA <60 MIN / +30 PÁGS + DEMO EN VIVO)
  // ============================================================================
  window.tbbBuildSubpage1HomeHTML = function () {
    const st = window.tbbCommercialDemoState;
    const isPro = hasProLicense();
    const curDemoStep = Number(st.activeDemoStep) || 0;
    const viewMode = st.demoViewportMode || "full";

    return `
      <section class="tbb-section tbb-home-hero-demo-section">
        <div class="tbb-container">
          <!-- HOOK PRINCIPAL ENTUSIASTA Y DIRECTO -->
          <div class="tbb-home-hero-header">
            <div class="tbb-tagline-hero-badge">
              ${TBB_ICONS.spark}
              <span>${escHtml(t("taglineBadge"))}</span>
            </div>
            <h1 class="tbb-hero-h1">${escHtml(t("heroHeadline"))}</h1>
            <p class="tbb-hero-lead">${escHtml(t("heroSubheadline"))}</p>

            <div class="tbb-hero-value-pills" role="list">
              <span class="tbb-value-pill" role="listitem">${TBB_ICONS.check} <span>${escHtml(t("heroPill1"))}</span></span>
              <span class="tbb-value-pill" role="listitem">${TBB_ICONS.check} <span>${escHtml(t("heroPill2"))}</span></span>
              <span class="tbb-value-pill" role="listitem">${TBB_ICONS.check} <span>${escHtml(t("heroPill3"))}</span></span>
              <span class="tbb-value-pill is-highlight" role="listitem">${TBB_ICONS.spark} <span>${escHtml(t("heroPill4"))}</span></span>
            </div>
          </div>

          <!-- DEMO EN VIVO COMO PROTAGONISTA DE INICIO -->
          <div id="tbbHomeLiveDemoCard" class="tbb-live-demo-master-card">
            <div class="tbb-live-demo-toolbar">
              <div class="tbb-live-demo-toolbar-left">
                <span class="tbb-live-dot"></span>
                <strong class="tbb-live-demo-toolbar-title">${escHtml(t("demoBarTitle"))}</strong>
              </div>

              <div class="tbb-live-demo-step-pills" role="group" aria-label="Steps">
                ${[0, 1, 2, 3].map((idx) => `
                  <button
                    type="button"
                    data-demo-step-pill="${idx}"
                    class="tbb-step-jump-pill ${curDemoStep === idx ? "active" : ""}"
                    onclick="window.tbbJumpDemoToStep(${idx})"
                  >Paso ${idx}</button>
                `).join("")}
                <button
                  type="button"
                  data-demo-step-pill="4"
                  class="tbb-step-jump-pill is-pro-step ${curDemoStep >= 4 ? "active" : ""}"
                  onclick="window.tbbJumpDemoToStep(4)"
                >${isPro ? TBB_ICONS.unlock : TBB_ICONS.lock} <span>Paso 4–6</span></button>
              </div>

              <div class="tbb-live-demo-toolbar-actions">
                <button
                  type="button"
                  class="tbb-toolbar-ghost-btn"
                  onclick="window.tbbOpenVideoPopupModal(${curDemoStep})"
                >${TBB_ICONS.volume} <span>${escHtml(t("demoListenAuraBtn"))}</span></button>

                <div class="tbb-view-toggle-group">
                  <button
                    type="button"
                    data-demo-view-btn="mobile"
                    class="tbb-view-toggle-btn ${viewMode === "mobile" ? "active" : ""}"
                    onclick="window.tbbSetDemoViewportMode('mobile')"
                  >${TBB_ICONS.phone} <span>${escHtml(t("demoModeMobile"))}</span></button>
                  <button
                    type="button"
                    data-demo-view-btn="full"
                    class="tbb-view-toggle-btn ${viewMode === "full" ? "active" : ""}"
                    onclick="window.tbbSetDemoViewportMode('full')"
                  >${TBB_ICONS.desktop} <span>${escHtml(t("demoModeFull"))}</span></button>
                </div>

                <button
                  type="button"
                  class="tbb-toolbar-expand-btn"
                  onclick="window.tbbOpenImmersiveStudioClone(${curDemoStep})"
                >${TBB_ICONS.expand} <span>${escHtml(t("heroStartFullscreenBtn"))}</span></button>
              </div>
            </div>

            <div id="tbbHomeLiveDemoOuterWrap" class="tbb-live-demo-outer-stage ${viewMode === "mobile" ? "is-mobile-frame" : ""}">
              <div id="tbbHomeLiveDemoMountSlot" class="tbb-live-demo-mount-slot"></div>
            </div>

            <div class="tbb-live-demo-bottom-bar">
              <button type="button" class="tbb-btn-secondary" onclick="window.tbbSwitchMainSection(2)">
                ${TBB_ICONS.deliverables}
                <span>${escHtml(t("heroSeeDeliverablesBtn"))}</span>
              </button>
              ${isPro ? `
                <button type="button" class="tbb-btn-primary" onclick="window.tbbOpenImmersiveStudioClone(4)">
                  ${TBB_ICONS.unlock}
                  <span>Continuar en Estudio Completo (Pasos 4–6 Activos)</span>
                  ${TBB_ICONS.arrowRight}
                </button>
              ` : `
                <button type="button" class="tbb-btn-primary" onclick="window.tbbOpenBuyAppCheckoutModal('founder_pro')">
                  ${TBB_ICONS.spark}
                  <span>${escHtml(t("demoUnlockStep4Btn"))}</span>
                  ${TBB_ICONS.arrowRight}
                </button>
              `}
            </div>
          </div>

          <!-- RESUMEN RÁPIDO DE CONFIANZA (SIN CARGAR CON TEORÍA; INVITA A REFERENCIAS A QUIEN LO CUESTIONE) -->
          <div class="tbb-home-reassurance-strip">
            <div class="tbb-home-reassurance-copy">
              <h2>${escHtml(t("homeTrustTitle"))}</h2>
              <p>${escHtml(t("homeTrustBody"))}</p>
            </div>
            <button type="button" class="tbb-btn-secondary" onclick="window.tbbSwitchMainSection(5)">
              ${TBB_ICONS.theory}
              <span>${escHtml(t("homeTrustBtn"))}</span>
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // ============================================================================
  // SECCIÓN 2: QUÉ RECIBES (BRANDBOOK +30 PÁGINAS + 9 ARCHIVOS + GLOSARIO SIMPLE)
  // ============================================================================
  window.tbbBuildSubpage2DeliverablesHTML = function () {
    const l = getLang();
    return `
      <section class="tbb-section">
        <div class="tbb-container">
          <div class="tbb-section-header">
            <span class="tbb-eyebrow">${TBB_ICONS.deliverables} <span>${escHtml(t("delivEyebrow"))}</span></span>
            <h1 class="tbb-h1">${escHtml(t("delivTitle"))}</h1>
            <p class="tbb-lead">${escHtml(t("delivLead"))}</p>
          </div>

          <div class="tbb-deliverables-grid">
            ${OFFICIAL_9_DELIVERABLES.map((dl) => {
              const loc = dl.i18n[l] || dl.i18n.es;
              const fileName = String(dl.sampleUrl).split("/").pop();
              return `
                <article class="tbb-deliv-card ${dl.isPrimaryBrandbook ? "is-featured" : ""}">
                  <div class="tbb-deliv-thumb-wrap" onclick="window.tbbOpenPlateLightboxModal(${dl.plateNum}, '${escHtml(dl.thumb)}', '${escHtml(loc.title)}', '${escHtml(dl.sampleUrl)}')">
                    <img src="${escHtml(tbbImgSrc(dl.thumb))}" onerror="window.tbbImgFallback(this)" alt="${escHtml(loc.title)}" loading="lazy" />
                    <span class="tbb-deliv-format-pill">${escHtml(dl.num)} · ${escHtml(dl.format)}</span>
                  </div>
                  <div class="tbb-deliv-body">
                    <h3>${escHtml(loc.title)}</h3>
                    <p>${escHtml(loc.desc)}</p>
                    <div class="tbb-deliv-actions">
                      <button type="button" class="tbb-btn-secondary" onclick="window.tbbOpenPlateLightboxModal(${dl.plateNum}, '${escHtml(dl.thumb)}', '${escHtml(loc.title)}', '${escHtml(dl.sampleUrl)}')">
                        ${TBB_ICONS.expand} <span>Ver muestra</span>
                      </button>
                      <a href="${escHtml(dl.sampleUrl)}" download="${escHtml(fileName)}" class="tbb-link-btn">Descargar ejemplo ↓</a>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>

          <!-- GLOSARIO AMIGABLE DE FORMATOS -->
          <div class="tbb-glossary-box">
            <h2>${escHtml(t("glossaryTitle"))}</h2>
            <p class="tbb-muted-p">${escHtml(t("glossarySub"))}</p>
            <div class="tbb-glossary-grid">
              ${FORMAT_GLOSSARY.map((g) => `
                <div class="tbb-glossary-item">
                  <strong class="tbb-glossary-ext">${escHtml(g.ext)}</strong>
                  <span>${escHtml(g.use[l] || g.use.es)}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="tbb-centered-cta-row">
            <button type="button" class="tbb-btn-primary" onclick="window.tbbSwitchMainSection(1)">
              ${TBB_ICONS.play}
              <span>Empezar gratis en la Demo ahora</span>
              ${TBB_ICONS.arrowRight}
            </button>
            <button type="button" class="tbb-btn-secondary" onclick="window.tbbOpenBuyAppCheckoutModal('founder_pro')">
              ${TBB_ICONS.unlock}
              <span>Desbloquear los 9 archivos · $49 USD</span>
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // ============================================================================
  // SECCIÓN 3: CÓMO FUNCIONA (RECORRIDO SIMPLE 0–6 + CÁPSULAS ≤15S + ANTES/DESPUÉS)
  // ============================================================================
  window.tbbUpdateBeforeAfterSlider = function (val) {
    const num = Math.max(5, Math.min(95, Number(val) || 50));
    window.tbbCommercialDemoState.beforeAfterVal = num;
    const beforeClip = document.getElementById("tbbBeforeClipLayer");
    const handle = document.getElementById("tbbBeforeAfterHandle");
    if (beforeClip) beforeClip.style.clipPath = `inset(0 ${100 - num}% 0 0)`;
    if (handle) handle.style.left = `${num}%`;
  };

  window.tbbBuildSubpage3HowItWorksHTML = function () {
    const l = getLang();
    const baVal = Number(window.tbbCommercialDemoState.beforeAfterVal) || 52;

    return `
      <section class="tbb-section">
        <div class="tbb-container">
          <div class="tbb-section-header">
            <span class="tbb-eyebrow">${TBB_ICONS.appTour} <span>${escHtml(t("howEyebrow"))}</span></span>
            <h1 class="tbb-h1">${escHtml(t("howTitle"))}</h1>
            <p class="tbb-lead">${escHtml(t("howLead"))}</p>
          </div>

          <div class="tbb-how-steps-list">
            ${CLEAN_TOUR_STEPS.map((stItem) => {
              const loc = stItem.i18n[l] || stItem.i18n.es;
              return `
                <article class="tbb-how-step-card">
                  <div class="tbb-how-step-copy">
                    <div class="tbb-how-step-meta">
                      <span class="tbb-step-pill-tag ${stItem.free ? "is-free" : "is-pro"}">${escHtml(loc.badge)}</span>
                      <span class="tbb-step-time-pill">⏱ ~${escHtml(stItem.time)}</span>
                    </div>
                    <h2>${escHtml(loc.title)}</h2>
                    <p>${escHtml(loc.body)}</p>
                    <div class="tbb-how-step-btns">
                      <button type="button" class="tbb-btn-secondary" onclick="window.tbbOpenVideoPopupModal(${stItem.step})">
                        ${TBB_ICONS.volume}
                        <span>${escHtml(t("howListenCapsule"))}</span>
                      </button>
                      <button type="button" class="tbb-link-btn" onclick="window.tbbSwitchMainSection(1); setTimeout(()=>window.tbbJumpDemoToStep(${stItem.step}), 120);">
                        Probar este paso en vivo →
                      </button>
                    </div>
                  </div>
                  <div class="tbb-how-step-visual" onclick="window.tbbOpenPlateLightboxModal(1, '${escHtml(stItem.img)}', '${escHtml(loc.title)}', '/assets/samples/Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.pdf')">
                    <img src="${escHtml(tbbImgSrc(stItem.img))}" onerror="window.tbbImgFallback(this)" alt="${escHtml(loc.title)}" loading="lazy" />
                  </div>
                </article>
              `;
            }).join("")}
          </div>

          <!-- COMPARADOR INTERACTIVO ANTES / DESPUÉS (CERO AUTORES) -->
          <div class="tbb-before-after-card">
            <div class="tbb-before-after-head">
              <h2>${escHtml(t("howBeforeAfterTitle"))}</h2>
              <p>${escHtml(t("howBeforeAfterSub"))}</p>
            </div>
            <div class="tbb-ba-stage">
              <div class="tbb-ba-layer is-after">
                <img src="/assets/logos/arco_iter5_full.png" alt="Logo Modernizado" />
                <span class="tbb-ba-tag is-after-tag">Después · Vector Limpio</span>
              </div>
              <div id="tbbBeforeClipLayer" class="tbb-ba-layer is-before" style="clip-path:inset(0 ${100 - baVal}% 0 0);">
                <img src="/assets/logos/arco_ingenieria_logo4k_original.png" alt="Logo Anterior" />
                <span class="tbb-ba-tag is-before-tag">Antes · Logo Original</span>
              </div>
              <div id="tbbBeforeAfterHandle" class="tbb-ba-handle" style="left:${baVal}%;"></div>
              <input
                type="range"
                min="5"
                max="95"
                value="${baVal}"
                aria-label="Comparar Antes y Después"
                class="tbb-ba-range-input"
                oninput="window.tbbUpdateBeforeAfterSlider(this.value)"
              />
            </div>
          </div>
        </div>
      </section>
    `;
  };

  // ============================================================================
  // SECCIÓN 4: EJEMPLOS REALES (CASO ARCO INGENIERÍA LIMPIO + LIGHTBOX HD)
  // ============================================================================
  window.tbbSelectArcoCaseIteration = function (iterId) {
    window.tbbCommercialDemoState.selectedArcoIterId = Number(iterId) || 5;
    window.tbbRefreshCommercialPortalDOM();
  };

  window.tbbBuildSubpage4RealCasesHTML = function () {
    const selId = Number(window.tbbCommercialDemoState.selectedArcoIterId) || 5;
    const activeIter = ARCO_LOGO_ITERATIONS.find((x) => x.id === selId) || ARCO_LOGO_ITERATIONS[4];

    return `
      <section class="tbb-section">
        <div class="tbb-container">
          <div class="tbb-section-header">
            <span class="tbb-eyebrow">${TBB_ICONS.cases} <span>${escHtml(t("casesEyebrow"))}</span></span>
            <h1 class="tbb-h1">${escHtml(t("casesTitle"))}</h1>
            <p class="tbb-lead">${escHtml(t("casesLead"))}</p>
          </div>

          <!-- EVOLUCIÓN DE OPCIONES DEL CASO REAL -->
          <div class="tbb-case-hero-box">
            <div class="tbb-case-preview-main">
              <span class="tbb-step-pill-tag is-free">${escHtml(activeIter.badge)}</span>
              <h2>${escHtml(activeIter.name)}</h2>
              <p>${escHtml(activeIter.desc)}</p>
              <div class="tbb-case-main-img-wrap" onclick="window.tbbOpenPlateLightboxModal(1, '${escHtml(activeIter.screenImg)}', '${escHtml(activeIter.name)}', '/assets/samples/Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.pdf')">
                <img src="${escHtml(tbbImgSrc(activeIter.logoImg))}" alt="${escHtml(activeIter.name)}" />
              </div>
            </div>

            <div class="tbb-case-iter-selector-grid">
              ${ARCO_LOGO_ITERATIONS.map((it) => `
                <button
                  type="button"
                  class="tbb-case-iter-btn ${it.id === selId ? "active" : ""}"
                  onclick="window.tbbSelectArcoCaseIteration(${it.id})"
                >
                  <img src="${escHtml(tbbImgSrc(it.logoImg))}" alt="${escHtml(it.name)}" loading="lazy" />
                  <strong>${escHtml(it.name)}</strong>
                  <span>${escHtml(it.badge)}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- LÁMINAS REALES DEL BRANDBOOK -->
          <div class="tbb-subsection-block">
            <h2 class="tbb-h2">${escHtml(t("casesPlatesTitle"))}</h2>
            <div class="tbb-plates-gallery-grid">
              ${ARCO_PDF_PLATES_SHOWCASE.map((pl, idx) => `
                <div
                  class="tbb-plate-thumb-card"
                  onclick="window.tbbOpenPlateLightboxModal(${idx + 1}, '${escHtml(pl.img)}', '${escHtml(pl.code)} · ${escHtml(pl.title)}', '/assets/samples/Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.pdf')"
                >
                  <img src="${escHtml(tbbImgSrc(pl.img))}" alt="${escHtml(pl.title)}" loading="lazy" />
                  <div class="tbb-plate-thumb-caption">
                    <span>${escHtml(pl.code)}</span>
                    <strong>${escHtml(pl.title)}</strong>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="tbb-centered-cta-row">
            <a href="/assets/samples/Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.pdf" target="_blank" rel="noopener" class="tbb-btn-secondary">
              ${TBB_ICONS.deliverables}
              <span>Abrir PDF Completo de Muestra (36 páginas)</span>
            </a>
            <button type="button" class="tbb-btn-primary" onclick="window.tbbSwitchMainSection(1)">
              ${TBB_ICONS.spark}
              <span>Crear mi propia marca ahora →</span>
            </button>
          </div>
        </div>
      </section>
    `;
  };

  // ============================================================================
  // SECCIÓN 5: REFERENCIAS (100% DE AUTORES, TEORÍAS, LIBROS, VIDEOS Y SIMULADOR)
  // ============================================================================
  function buildAcademicDiagramSVG(diagramType) {
    if (diagramType === "golden_circle") {
      return `<svg viewBox="0 0 320 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"><circle cx="160" cy="100" r="82" fill="#F8FAFC" stroke="#0D2540" stroke-width="2" stroke-dasharray="4 3"/><circle cx="160" cy="100" r="54" fill="rgba(66,110,174,0.12)" stroke="#426EAE" stroke-width="2"/><circle cx="160" cy="100" r="28" fill="#FF7A00"/><text x="160" y="104" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat,sans-serif" font-weight="700" font-size="13">WHY</text><text x="160" y="58" text-anchor="middle" fill="#0D2540" font-family="Plus Jakarta Sans,sans-serif" font-weight="600" font-size="12">HOW</text><text x="160" y="29" text-anchor="middle" fill="#426EAE" font-family="Plus Jakarta Sans,sans-serif" font-weight="600" font-size="12">WHAT</text></svg>`;
    }
    if (diagramType === "touchpoints_wave") {
      return `<svg viewBox="0 0 320 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"><line x1="24" y1="105" x2="296" y2="105" stroke="#CBD5E1" stroke-width="2"/><path d="M 28 135 C 75 45, 115 45, 160 105 C 205 165, 245 45, 292 75" fill="none" stroke="#426EAE" stroke-width="3.2" stroke-linecap="round"/><circle cx="68" cy="72" r="8" fill="#4C9DE6"/><circle cx="160" cy="105" r="9" fill="#FF7A00"/><circle cx="256" cy="76" r="8" fill="#0D2540"/><text x="68" y="52" text-anchor="middle" fill="#0D2540" font-family="Plus Jakarta Sans,sans-serif" font-weight="600" font-size="12">Antes</text><text x="160" y="138" text-anchor="middle" fill="#FF7A00" font-family="Plus Jakarta Sans,sans-serif" font-weight="700" font-size="12">Durante</text><text x="256" y="54" text-anchor="middle" fill="#0D2540" font-family="Plus Jakarta Sans,sans-serif" font-weight="600" font-size="12">Después</text></svg>`;
    }
    if (diagramType === "smile_radar") {
      return `<svg viewBox="0 0 320 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"><polygon points="160,24 234,78 206,164 114,164 86,78" fill="rgba(66,110,174,0.08)" stroke="#94A3B8" stroke-width="1.5"/><polygon points="160,38 220,84 196,152 124,152 100,84" fill="rgba(255,122,0,0.18)" stroke="#FF7A00" stroke-width="2.4"/><text x="160" y="18" text-anchor="middle" fill="#0D2540" font-family="Plus Jakarta Sans,sans-serif" font-weight="600" font-size="12">SMILE</text></svg>`;
    }
    if (diagramType === "osgood_kansei") {
      return `<svg viewBox="0 0 320 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="24" width="272" height="152" rx="14" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/><line x1="56" y1="64" x2="264" y2="64" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/><circle cx="205" cy="64" r="8" fill="#FF7A00"/><line x1="56" y1="106" x2="264" y2="106" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/><circle cx="180" cy="106" r="8" fill="#426EAE"/><line x1="56" y1="148" x2="264" y2="148" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/><circle cx="136" cy="148" r="8" fill="#0D2540"/></svg>`;
    }
    if (diagramType === "kaizen_bezier_grid") {
      return `<svg viewBox="0 0 320 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"><rect x="56" y="38" width="208" height="118" rx="16" fill="#F8FAFC" stroke="#426EAE" stroke-width="2" stroke-dasharray="5 4"/><path d="M 88 134 C 116 48, 204 48, 232 134" fill="none" stroke="#FF7A00" stroke-width="3.5"/><circle cx="116" cy="48" r="5" fill="#0D2540"/><circle cx="204" cy="48" r="5" fill="#0D2540"/></svg>`;
    }
    return `<svg viewBox="0 0 320 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="28" width="248" height="144" rx="16" fill="#FFFFFF" stroke="#0D2540" stroke-width="2"/><rect x="56" y="48" width="90" height="14" rx="4" fill="#0D2540"/><rect x="56" y="70" width="136" height="8" rx="3" fill="#FF7A00"/><rect x="56" y="98" width="62" height="52" rx="8" fill="#F8FAFC" stroke="#426EAE" stroke-width="1.5"/><rect x="129" y="98" width="62" height="52" rx="8" fill="#F8FAFC" stroke="#426EAE" stroke-width="1.5"/><rect x="202" y="98" width="62" height="52" rx="8" fill="#F8FAFC" stroke="#FF7A00" stroke-width="1.5"/></svg>`;
  }

  window.tbbSelectHeroTheoryNode = function (idx) {
    const cleanIdx = Math.max(0, Math.min(4, Number(idx) || 0));
    window.tbbCommercialDemoState.heroSelectedTheoryIdx = cleanIdx;
    window.tbbCommercialDemoState.heroConvergenceBurstTs = performance.now();
    const stageMap = [1, 2, 3, 4, 5];
    const stObj = ACADEMIC_INFOGRAPHIC_STAGES[stageMap[cleanIdx]] || ACADEMIC_INFOGRAPHIC_STAGES[1];
    const box = document.getElementById("tbbRefSelectedPillarDetail");
    if (box) {
      box.innerHTML = `
        <strong>${escHtml(stObj.code)} · ${escHtml(stObj.title)}</strong>
        <p>${escHtml(stObj.thesis)}</p>
        <span>Autores clave: ${escHtml(stObj.authors)}</span>
      `;
    }
    document.querySelectorAll(".tbb-ref-pillar-btn").forEach((b, i) => b.classList.toggle("active", i === cleanIdx));
  };

  window.tbbTriggerHeroConvergence = function () {
    const st = window.tbbCommercialDemoState;
    st.heroConvergenceActive = !st.heroConvergenceActive;
    st.heroConvergenceBurstTs = performance.now();
  };

  window.tbbUpdateKanseiInfographicSimulator = function () {
    const gEl = document.getElementById("tbbSimGeoRange");
    const vEl = document.getElementById("tbbSimVanguardRange");
    const wEl = document.getElementById("tbbSimWeightRange");
    const geo = gEl ? Number(gEl.value) : window.tbbCommercialDemoState.kanseiGeoVal;
    const van = vEl ? Number(vEl.value) : window.tbbCommercialDemoState.kanseiVanguardVal;
    const wei = wEl ? Number(wEl.value) : window.tbbCommercialDemoState.kanseiWeightVal;
    window.tbbCommercialDemoState.kanseiGeoVal = geo;
    window.tbbCommercialDemoState.kanseiVanguardVal = van;
    window.tbbCommercialDemoState.kanseiWeightVal = wei;

    const prev = document.getElementById("tbbKanseiLiveVectorPreview");
    if (!prev) return;
    const radius = Math.round(48 - (geo / 100) * 42);
    const strokeW = (2 + (wei / 100) * 5.5).toFixed(1);
    const tilt = Math.round(((van - 50) / 50) * 12);
    prev.innerHTML = `
      <svg viewBox="0 0 260 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="240" height="160" rx="18" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
        <g transform="translate(130,90) rotate(${tilt})">
          <rect x="-46" y="-46" width="92" height="92" rx="${radius}" fill="rgba(66,110,174,0.12)" stroke="#0D2540" stroke-width="${strokeW}"/>
          <circle cx="0" cy="0" r="${Math.max(10, Math.round(28 - geo * 0.14))}" fill="#FF7A00"/>
        </g>
      </svg>
    `;
  };

  window.tbbFilterBooksCategory = function (cat) {
    const cards = document.querySelectorAll(".tbb-book-card");
    const pills = document.querySelectorAll(".tbb-book-filter-pill");
    pills.forEach((p) => p.classList.toggle("is-active", p.getAttribute("data-cat") === cat));
    cards.forEach((card) => {
      card.style.display = (cat === "all" || card.getAttribute("data-cat") === cat) ? "flex" : "none";
    });
  };

  window.tbbPlayYouTubeAuthorVideo = function (videoId) {
    const item = YOUTUBE_METHODOLOGY_AUTHORS.find((a) => a.id === videoId) || YOUTUBE_METHODOLOGY_AUTHORS[0];
    let ov = document.getElementById("tbbYouTubeAuthorModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbYouTubeAuthorModalOverlay";
      ov.className = "tbb-modal-overlay";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseYouTubeModal(); };
      document.body.appendChild(ov);
    }
    ov.innerHTML = `
      <div class="tbb-modal-card is-wide" onclick="event.stopPropagation()">
        <div class="tbb-modal-head">
          <div>
            <span class="tbb-eyebrow">${escHtml(item.author)} · ${escHtml(item.step)}</span>
            <h3>${escHtml(item.title)}</h3>
          </div>
          <button type="button" class="tbb-icon-close-btn" onclick="window.tbbCloseYouTubeModal()">${TBB_ICONS.close}</button>
        </div>
        <div style="aspect-ratio:16/9;width:100%;border-radius:16px;overflow:hidden;background:#000;">
          <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.id)}?autoplay=1&rel=0" title="${escHtml(item.title)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
    ov.classList.add("open");
  };

  window.tbbCloseYouTubeModal = function () {
    const ov = document.getElementById("tbbYouTubeAuthorModalOverlay");
    if (ov) {
      ov.innerHTML = "";
      ov.classList.remove("open");
    }
  };

  window.tbbBuildSubpage5ReferencesHTML = function () {
    const st = window.tbbCommercialDemoState;
    const selPillarIdx = Number(st.heroSelectedTheoryIdx) || 0;
    const activeStage = ACADEMIC_INFOGRAPHIC_STAGES[selPillarIdx + 1] || ACADEMIC_INFOGRAPHIC_STAGES[1];
    const pillarLabels = [
      "01 · Círculo Dorado (Sinek)",
      "02 · Touchpoints (Carlzon)",
      "03 · Modelo SMILE (Watkins)",
      "04 · Diferencial Osgood / Kansei",
      "05 · Síntesis & Kaizen (Rand / Imai)"
    ];

    return `
      <section class="tbb-section">
        <div class="tbb-container">
          <div class="tbb-section-header">
            <span class="tbb-eyebrow">${TBB_ICONS.theory} <span>${escHtml(t("refEyebrow"))}</span></span>
            <h1 class="tbb-h1">${escHtml(t("refTitle"))}</h1>
            <p class="tbb-lead">${escHtml(t("refLead"))}</p>
          </div>

          <!-- MAPA INTERACTIVO DE LOS 5 PILARES (AISLADO EN REFERENCIAS CON PAUSA AUTOMÁTICA OFFSCREEN) -->
          <div class="tbb-ref-pillars-box">
            <h2>${escHtml(t("refPillarsTitle"))}</h2>
            <p class="tbb-muted-p">${escHtml(t("refPillarsSub"))}</p>
            <div class="tbb-five-pillars-canvas-wrap">
              <canvas id="tbbFivePillarsConvergenceCanvas"></canvas>
            </div>
            <div class="tbb-ref-pillar-pills">
              ${pillarLabels.map((lbl, idx) => `
                <button
                  type="button"
                  class="tbb-ref-pillar-btn ${idx === selPillarIdx ? "active" : ""}"
                  onclick="window.tbbSelectHeroTheoryNode(${idx})"
                >${escHtml(lbl)}</button>
              `).join("")}
            </div>
            <div id="tbbRefSelectedPillarDetail" class="tbb-ref-pillar-detail">
              <strong>${escHtml(activeStage.code)} · ${escHtml(activeStage.title)}</strong>
              <p>${escHtml(activeStage.thesis)}</p>
              <span>Autores clave: ${escHtml(activeStage.authors)}</span>
            </div>
          </div>

          <!-- SIMULADOR INTERACTIVO LOCALIZADO KANSEI / OSGOOD -->
          <div class="tbb-kansei-sim-card">
            <div class="tbb-kansei-sim-controls">
              <h2>${escHtml(t("refKanseiTitle"))}</h2>
              <p>${escHtml(t("refKanseiSub"))}</p>

              <label class="tbb-sim-axis-row">
                <span class="tbb-sim-axis-labels"><span>${escHtml(t("refKanseiAxis1L"))}</span><span>${escHtml(t("refKanseiAxis1R"))}</span></span>
                <input id="tbbSimGeoRange" type="range" min="0" max="100" value="${st.kanseiGeoVal}" oninput="window.tbbUpdateKanseiInfographicSimulator()" />
              </label>
              <label class="tbb-sim-axis-row">
                <span class="tbb-sim-axis-labels"><span>${escHtml(t("refKanseiAxis2L"))}</span><span>${escHtml(t("refKanseiAxis2R"))}</span></span>
                <input id="tbbSimVanguardRange" type="range" min="0" max="100" value="${st.kanseiVanguardVal}" oninput="window.tbbUpdateKanseiInfographicSimulator()" />
              </label>
              <label class="tbb-sim-axis-row">
                <span class="tbb-sim-axis-labels"><span>${escHtml(t("refKanseiAxis3L"))}</span><span>${escHtml(t("refKanseiAxis3R"))}</span></span>
                <input id="tbbSimWeightRange" type="range" min="0" max="100" value="${st.kanseiWeightVal}" oninput="window.tbbUpdateKanseiInfographicSimulator()" />
              </label>
            </div>
            <div id="tbbKanseiLiveVectorPreview" class="tbb-kansei-sim-preview"></div>
          </div>

          <!-- ETAPAS Y AUTORES -->
          <div class="tbb-subsection-block">
            <h2 class="tbb-h2">${escHtml(t("refAuthorsTitle"))}</h2>
            <div class="tbb-authors-stages-grid">
              ${ACADEMIC_INFOGRAPHIC_STAGES.map((stg) => `
                <article class="tbb-author-stage-card">
                  <div class="tbb-author-stage-top">
                    <span class="tbb-step-pill-tag is-free">${escHtml(stg.code)}</span>
                    <span class="tbb-author-names">${escHtml(stg.authors)}</span>
                  </div>
                  <h3>${escHtml(stg.title)}</h3>
                  <p>${escHtml(stg.thesis)}</p>
                  <div class="tbb-author-diagram-wrap">${buildAcademicDiagramSVG(stg.diagramType)}</div>
                  <div class="tbb-author-works">Obras base: ${escHtml(stg.works)}</div>
                </article>
              `).join("")}
            </div>
          </div>

          <!-- BIBLIOTECA CON FILTRO REPARADO -->
          <div class="tbb-subsection-block">
            <div class="tbb-books-head-row">
              <h2 class="tbb-h2">${escHtml(t("refBooksTitle"))}</h2>
              <div class="tbb-book-filter-bar" role="group" aria-label="Book Filters">
                <button type="button" data-cat="all" class="tbb-book-filter-pill is-active" onclick="window.tbbFilterBooksCategory('all')">Todos</button>
                <button type="button" data-cat="branding" class="tbb-book-filter-pill" onclick="window.tbbFilterBooksCategory('branding')">Marca y Propósito</button>
                <button type="button" data-cat="design" class="tbb-book-filter-pill" onclick="window.tbbFilterBooksCategory('design')">Diseño Visual</button>
                <button type="button" data-cat="strategy" class="tbb-book-filter-pill" onclick="window.tbbFilterBooksCategory('strategy')">Estrategia y Claridad</button>
              </div>
            </div>
            <div class="tbb-books-grid">
              ${FOUNDER_ESSENTIAL_BOOKS.map((bk) => `
                <article class="tbb-book-card" data-cat="${escHtml(bk.category)}">
                  <div>
                    <span class="tbb-book-badge">${escHtml(bk.categoryLabel)} · ${escHtml(bk.year)}</span>
                    <h3>${escHtml(bk.title)}</h3>
                    <strong class="tbb-book-author">${escHtml(bk.author)}</strong>
                    <p>${escHtml(bk.takeaway)}</p>
                  </div>
                  <a href="${escHtml(bk.kindleUrl)}" target="_blank" rel="noopener noreferrer" class="tbb-link-btn">Ver libro de referencia ↗</a>
                </article>
              `).join("")}
            </div>
          </div>

          <!-- CONFERENCIAS EN VIDEO -->
          <div class="tbb-subsection-block">
            <h2 class="tbb-h2">${escHtml(t("refVideosTitle"))}</h2>
            <div class="tbb-videos-grid">
              ${YOUTUBE_METHODOLOGY_AUTHORS.map((vd) => `
                <article class="tbb-yt-card" onclick="window.tbbPlayYouTubeAuthorVideo('${escHtml(vd.id)}')">
                  <div class="tbb-yt-head">
                    <span>${escHtml(vd.step)}</span>
                    <span>${escHtml(vd.duration)}</span>
                  </div>
                  <h3>${escHtml(vd.title)}</h3>
                  <p>${escHtml(vd.author)}</p>
                  <span class="tbb-link-btn">${TBB_ICONS.play} <span>Reproducir charla</span></span>
                </article>
              `).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  };

  window.tbbRenderActiveSubpageHTML = function (secNumber) {
    const s = Number(secNumber) || 1;
    if (s === 2) return window.tbbBuildSubpage2DeliverablesHTML();
    if (s === 3) return window.tbbBuildSubpage3HowItWorksHTML();
    if (s === 4) return window.tbbBuildSubpage4RealCasesHTML();
    if (s === 5) return window.tbbBuildSubpage5ReferencesHTML();
    return window.tbbBuildSubpage1HomeHTML();
  };

  // ============================================================================
  // CÁPSULAS AURA VIVA (≤15s, UNA SOLA VOZ NEURAL AOEDE, ORBE 60FPS REACTIVO, CERO FANTASMAS)
  // ============================================================================
  let _auraModalRafId = 0;

  function startWebCapsuleOrbAnimation() {
    if (_auraModalRafId) cancelAnimationFrame(_auraModalRafId);
    const canvas = document.getElementById("tbbWebCapsuleAuraCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const start = performance.now();

    function draw(now) {
      if (!document.body.contains(canvas)) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const tSec = (now - start) * 0.001;
      const amp = typeof window.tbbGetLiveAudioAmplitude === "function" ? window.tbbGetLiveAudioAmplitude() : 0;
      const speaking = Boolean(window.isSpeakingLive) || amp > 0.02;
      const baseR = 46 + (speaking ? amp * 22 + Math.sin(tSec * 8) * 3 : Math.sin(tSec * 2.4) * 2.5);
      const cx = w / 2;
      const cy = h / 2;

      const halo = ctx.createRadialGradient(cx, cy, 8, cx, cy, baseR + 36);
      halo.addColorStop(0, speaking ? "rgba(255,122,0,0.62)" : "rgba(76,157,230,0.45)");
      halo.addColorStop(0.6, "rgba(66,110,174,0.22)");
      halo.addColorStop(1, "rgba(13,37,64,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR + 36, 0, Math.PI * 2);
      ctx.fill();

      const sphere = ctx.createRadialGradient(cx - 12, cy - 14, 6, cx, cy, baseR);
      sphere.addColorStop(0, "#FFFFFF");
      sphere.addColorStop(0.32, speaking ? "#FFEDD5" : "#BAE6FD");
      sphere.addColorStop(0.72, speaking ? "#FF7A00" : "#4C9DE6");
      sphere.addColorStop(1, "#0D2540");
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.48)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR + 8 + Math.sin(tSec * 4) * 2, 0, Math.PI * 2);
      ctx.stroke();

      _auraModalRafId = requestAnimationFrame(draw);
    }
    _auraModalRafId = requestAnimationFrame(draw);
  }

  window.tbbOpenVideoPopupModal = function (stepIdx, overrideLang) {
    const s = Math.max(0, Math.min(6, Number(stepIdx) || 0));
    const l = overrideLang && ["es", "en", "fr", "pt", "de", "it"].includes(overrideLang) ? overrideLang : getLang();
    if (overrideLang && overrideLang !== getLang()) {
      if (typeof window.syncAllLangStorageKeys === "function") {
        window.syncAllLangStorageKeys(l);
      } else {
        try { localStorage.setItem(LANG_STORAGE_KEY, l); } catch (e) {}
      }
    }

    hardStopAllWebAudio("open_aura_viva_capsule_" + s);
    window.tbbCommercialDemoState.openVideoModalStep = s;

    const capGroup = AURA_CAPSULE_SUMMARIES[s] || AURA_CAPSULE_SUMMARIES[0];
    const cap = capGroup[l] || capGroup.es;
    const modalLangs = [
      { code: "es", label: "ES" },
      { code: "en", label: "EN" },
      { code: "fr", label: "FR" },
      { code: "pt", label: "PT" },
      { code: "de", label: "DE" },
      { code: "it", label: "IT" }
    ];

    let ov = document.getElementById("tbbVideoPopupModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbVideoPopupModalOverlay";
      ov.className = "tbb-modal-overlay";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseVideoPopupModal(); };
      document.body.appendChild(ov);
    }

    ov.innerHTML = `
      <div class="tbb-modal-card is-capsule" onclick="event.stopPropagation()">
        <div class="tbb-modal-head">
          <div class="tbb-capsule-top-pills">
            ${[0, 1, 2, 3, 4, 5, 6].map((idx) => `
              <button type="button" class="tbb-mini-pill ${idx === s ? "active" : ""}" onclick="window.tbbOpenVideoPopupModal(${idx}, '${l}')">0${idx}</button>
            `).join("")}
          </div>
          <div class="tbb-capsule-lang-pills">
            ${modalLangs.map((ml) => `
              <button type="button" class="tbb-mini-pill ${ml.code === l ? "is-orange" : ""}" onclick="window.tbbOpenVideoPopupModal(${s}, '${ml.code}')">${ml.label}</button>
            `).join("")}
          </div>
          <button type="button" class="tbb-icon-close-btn" onclick="window.tbbCloseVideoPopupModal()" aria-label="Cerrar">${TBB_ICONS.close}</button>
        </div>

        <div class="tbb-capsule-grid">
          <div class="tbb-capsule-orb-stage">
            <span class="tbb-capsule-live-tag">AURA VIVA · ${l.toUpperCase()} · ≤15s</span>
            <canvas id="tbbWebCapsuleAuraCanvas" width="190" height="190"></canvas>
            <button type="button" class="tbb-capsule-replay-btn" onclick="window.tbbReplayActiveWebCapsule(${s}, '${l}')">
              ${TBB_ICONS.volume} <span>Repetir voz de Aura</span>
            </button>
          </div>
          <div class="tbb-capsule-copy-col">
            <h3>${escHtml(cap.title)}</h3>
            <p id="tbbWebCapsuleSubtitleText" class="tbb-capsule-subtitle">“${escHtml(cap.text)}”</p>
            <div class="tbb-capsule-actions">
              ${s < 6 ? `
                <button type="button" class="tbb-btn-primary" onclick="window.tbbOpenVideoPopupModal(${s + 1}, '${l}')">
                  <span>Siguiente cápsula (Paso 0${s + 1})</span> ${TBB_ICONS.arrowRight}
                </button>
              ` : `
                <button type="button" class="tbb-btn-primary" onclick="window.tbbCloseVideoPopupModal(); window.tbbSwitchMainSection(1);">
                  <span>Ir a la Demo en Vivo</span> ${TBB_ICONS.arrowRight}
                </button>
              `}
              <button type="button" class="tbb-btn-secondary" onclick="window.tbbCloseVideoPopupModal()">${escHtml(t("lightboxClose"))}</button>
            </div>
          </div>
        </div>
      </div>
    `;
    ov.classList.add("open");
    startWebCapsuleOrbAnimation();
    window.tbbReplayActiveWebCapsule(s, l);
  };

  window.tbbReplayActiveWebCapsule = function (stepIdx, langCode) {
    const s = Math.max(0, Math.min(6, Number(stepIdx) || 0));
    const l = langCode || getLang();
    if (typeof window.playAuraVivaCapsuleClip === "function") {
      window.playAuraVivaCapsuleClip(s, l, {
        onText: (txt) => {
          const el = document.getElementById("tbbWebCapsuleSubtitleText");
          if (el && txt) el.textContent = `“${txt}”`;
        }
      });
    } else if (typeof window.speakAuraBriefResponse === "function") {
      const capGroup = AURA_CAPSULE_SUMMARIES[s] || AURA_CAPSULE_SUMMARIES[0];
      const cap = capGroup[l] || capGroup.es;
      window.speakAuraBriefResponse(cap.text, l);
    }
  };

  window.tbbCloseVideoPopupModal = function () {
    if (_auraModalRafId) {
      cancelAnimationFrame(_auraModalRafId);
      _auraModalRafId = 0;
    }
    if (window.tbbCommercialDemoState) {
      window.tbbCommercialDemoState.openVideoModalStep = null;
    }
    hardStopAllWebAudio("close_aura_capsule_modal");
    const ov = document.getElementById("tbbVideoPopupModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  // ============================================================================
  // LIGHTBOX HD DE MUESTRAS Y LÁMINAS
  // ============================================================================
  window.tbbOpenPlateLightboxModal = function (plateNum, customImgUrl, customTitle, customSampleUrl) {
    const imgUrl = customImgUrl || "/assets/app_captures/pdf_lamina_01_portada.png";
    const titleStr = customTitle || "Muestra en Alta Resolución";
    const sampleHref = customSampleUrl || "/assets/samples/Manual_Marca_36_Laminas_ARCO_Ingenieria_Luis_Ponce.pdf";
    const dlFileName = String(sampleHref).split("/").pop();

    let ov = document.getElementById("tbbPlateLightboxOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbPlateLightboxOverlay";
      ov.className = "tbb-modal-overlay";
      ov.onclick = (e) => { if (e.target === ov) window.tbbClosePlateLightboxModal(); };
      document.body.appendChild(ov);
    }

    ov.innerHTML = `
      <div class="tbb-modal-card is-wide" onclick="event.stopPropagation()">
        <div class="tbb-modal-head">
          <h3>${escHtml(titleStr)}</h3>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <a href="${escHtml(sampleHref)}" target="_blank" rel="noopener" class="tbb-btn-secondary">Abrir archivo</a>
            <a href="${escHtml(sampleHref)}" download="${escHtml(dlFileName)}" class="tbb-btn-primary">Descargar ↓</a>
            <button type="button" class="tbb-icon-close-btn" onclick="window.tbbClosePlateLightboxModal()">${TBB_ICONS.close}</button>
          </div>
        </div>
        <div class="tbb-lightbox-img-box">
          <img src="${escHtml(tbbImgSrc(imgUrl))}" onerror="window.tbbImgFallback(this)" alt="${escHtml(titleStr)}" />
        </div>
      </div>
    `;
    ov.classList.add("open");
  };

  window.tbbClosePlateLightboxModal = function () {
    const ov = document.getElementById("tbbPlateLightboxOverlay");
    if (ov) ov.classList.remove("open");
  };

  // ============================================================================
  // CHECKOUT LIMPIO $49 USD CON STRIPE CHECKOUT + CÓDIGO COLAPSABLE + RESTAURACIÓN DE CUENTA
  // (Cero tarjetas falsas precargadas, cero cupones gratuitos públicos expuestos)
  // ============================================================================
  window.tbbGetPendingDemoMigrationSnapshot = function () {
    const st = window.tbbCommercialDemoState || {};
    if (st.migratedSteps0to3Snapshot && typeof st.migratedSteps0to3Snapshot === "object") {
      return st.migratedSteps0to3Snapshot;
    }
    try {
      const raw =
        localStorage.getItem("tbb_studio_autosave_v45") ||
        localStorage.getItem("tbb_demo_steps_0_to_3_backup") ||
        localStorage.getItem("tbb_canvas_state_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (e) {}
    return {
      brandName: st.brandName || "",
      completedSteps: [0, 1, 2, 3],
      migratedAt: new Date().toISOString()
    };
  };

  window.tbbBroadcastLicenseUnlockedToStudio = function (receiptObj, accountObj, migrationSnapshot) {
    const payload = {
      type: "TBB_PRO_LICENSE_UNLOCKED",
      license: receiptObj,
      account: accountObj,
      migrationSnapshot: migrationSnapshot,
      continueAtStep: 4
    };
    ["tbbRealStudioDemoIframe", "tbbImmersiveStudioCloneIframe"].forEach((id) => {
      const ifr = document.getElementById(id);
      if (ifr && ifr.contentWindow) {
        try {
          ifr.contentWindow.postMessage(payload, "*");
          ifr.contentWindow.postMessage({ type: "TBB_JUMP_TO_STEP", step: 4 }, "*");
        } catch (e) {}
      }
    });
  };

  window.tbbToggleCheckoutPromoDrawer = function () {
    window.tbbCommercialDemoState.promoDrawerOpen = !window.tbbCommercialDemoState.promoDrawerOpen;
    window.tbbRenderCheckoutModalContent();
  };

  window.tbbApplyPromoCouponCode = async function () {
    const inp = document.getElementById("tbbCheckoutPromoCodeInput");
    const msgEl = document.getElementById("tbbCheckoutPromoStatusMsg");
    const rawCode = String(inp ? inp.value : "").trim().toUpperCase();
    if (!rawCode) return;

    try {
      const res = await fetch("/api/v1/payments/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promo_code: rawCode, tier: "founder_pro" })
      });
      const data = await res.json();
      if (res.ok && data && data.valid) {
        const resolved = {
          valid: true,
          code: data.promo_code || rawCode,
          discountPercent: Number(data.discount_percent || 0),
          finalAmountUsd: Number(data.final_amount_usd || 0),
          tier: data.tier || "founder_pro",
          label: data.label || "Descuento aplicado"
        };
        window.tbbCommercialDemoState.appliedCoupon = resolved;
        window.tbbCommercialDemoState.promoDrawerOpen = true;
        window.tbbRenderCheckoutModalContent();
        return;
      }
      if (msgEl) {
        msgEl.style.display = "block";
        msgEl.textContent = (data && data.message) || "El código ingresado no es válido o ha expirado.";
      }
    } catch (e) {
      if (msgEl) {
        msgEl.style.display = "block";
        msgEl.textContent = "No pudimos verificar el código en este momento. Intenta de nuevo.";
      }
    }
  };

  window.tbbClearPromoCouponCode = function () {
    window.tbbCommercialDemoState.appliedCoupon = null;
    try { localStorage.removeItem("tbb_active_promo_coupon"); } catch (e) {}
    window.tbbRenderCheckoutModalContent();
  };

  window.tbbProcessCheckoutPayment = async function () {
    const nameEl = document.getElementById("tbbCheckoutHolderNameInput");
    const emailEl = document.getElementById("tbbCheckoutEmailInput");
    const errEl = document.getElementById("tbbCheckoutValidationMsg");
    const submitBtn = document.getElementById("tbbCheckoutSubmitBtn");

    const holderName = String(nameEl ? nameEl.value : "").trim();
    const email = String(emailEl ? emailEl.value : "").trim();

    if (!holderName || holderName.length < 2) {
      if (errEl) {
        errEl.style.display = "block";
        errEl.textContent = "Por favor escribe tu nombre para registrar tu licencia.";
      }
      if (nameEl) nameEl.focus();
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (errEl) {
        errEl.style.display = "block";
        errEl.textContent = "Por favor escribe un correo electrónico válido para enviarte tu respaldo.";
      }
      if (emailEl) emailEl.focus();
      return;
    }
    if (errEl) errEl.style.display = "none";
    try {
      sessionStorage.setItem("tbb_checkout_draft_name", holderName);
      sessionStorage.setItem("tbb_checkout_draft_email", email);
    } catch (e) {}

    const migrationSnapshot = window.tbbGetPendingDemoMigrationSnapshot();
    const bName =
      (migrationSnapshot && (migrationSnapshot.brandName || (migrationSnapshot.canvasState && migrationSnapshot.canvasState.brandName))) ||
      "Mi Marca";
    const coupon = window.tbbCommercialDemoState.appliedCoupon || null;
    const isFreeCoupon = Boolean(coupon && (coupon.discountPercent >= 100 || coupon.finalAmountUsd <= 0));

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.75";
    }

    try {
      localStorage.setItem("tbb_migrated_steps_0_to_3_v56", JSON.stringify(migrationSnapshot));
    } catch (e) {}

    try {
      // Ruta principal: Crear sesión real de Stripe Checkout (o canje verificado 100% en backend)
      const stripeRes = await fetch("/api/v1/payments/create-stripe-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: (coupon && coupon.tier) || "founder_pro",
          customer_email: email,
          customer_name: holderName,
          brand_name: bName,
          promo_code: coupon ? coupon.code : "",
          lang: getLang()
        })
      });
      if (stripeRes.ok) {
        const sData = await stripeRes.json();
        if (sData && sData.checkout_url && /^https?:\/\//i.test(sData.checkout_url)) {
          window.location.href = sData.checkout_url;
          return;
        }
        if (sData && sData.status === "unlocked_free" && sData.license_code) {
          const receiptObj = {
            licenseId: sData.license_code,
            plan: sData.tier || "founder_pro",
            amountUsd: 0,
            promoCode: coupon ? coupon.code : null,
            unlockedAt: new Date().toISOString(),
            stepsUnlocked: [0, 1, 2, 3, 4, 5, 6]
          };
          const accountObj = { email, name: holderName, migratedSteps0to3: true };
          try {
            localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receiptObj));
            localStorage.setItem("tbb_user_account_v56", JSON.stringify(accountObj));
          } catch (e) {}
          window.tbbBroadcastLicenseUnlockedToStudio(receiptObj, accountObj, migrationSnapshot);
          window.tbbCloseBuyAppCheckoutModal();
          window.tbbRefreshCommercialPortalDOM();
          window.tbbSwitchMainSection(1);
          setTimeout(() => window.tbbJumpDemoToStep(4), 160);
          return;
        }
      }

      // Respaldo mediante /api/v1/payments/checkout-live
      const fallbackRes = await fetch("/api/v1/payments/checkout-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: (coupon && coupon.tier) || "founder_pro",
          customer_email: email,
          customer_name: holderName,
          brand_name: bName,
          payment_method: isFreeCoupon ? "promo_coupon_100" : "stripe_checkout",
          promo_code: coupon ? coupon.code : ""
        })
      });
      const fbData = await fallbackRes.json();
      if (fbData && fbData.checkout_url && /^https?:\/\//i.test(fbData.checkout_url)) {
        window.location.href = fbData.checkout_url;
        return;
      }
      if (fbData && fbData.license_code && isFreeCoupon) {
        const receiptObj = {
          licenseId: fbData.license_code,
          plan: "founder_pro",
          amountUsd: 0,
          unlockedAt: new Date().toISOString(),
          stepsUnlocked: [0, 1, 2, 3, 4, 5, 6]
        };
        const accountObj = { email, name: holderName, migratedSteps0to3: true };
        try {
          localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receiptObj));
          localStorage.setItem("tbb_user_account_v56", JSON.stringify(accountObj));
        } catch (e) {}
        window.tbbBroadcastLicenseUnlockedToStudio(receiptObj, accountObj, migrationSnapshot);
        window.tbbCloseBuyAppCheckoutModal();
        window.tbbRefreshCommercialPortalDOM();
        return;
      }
      if (errEl) {
        errEl.style.display = "block";
        errEl.textContent = "No fue posible abrir la pasarela segura en este instante. Revisa tu conexión e intenta de nuevo.";
      }
    } catch (err) {
      if (errEl) {
        errEl.style.display = "block";
        errEl.textContent = "Error de conexión con la pasarela de pago. Intenta nuevamente.";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }
    }
  };

  window.tbbRenderCheckoutModalContent = function () {
    const box = document.getElementById("tbbCheckoutModalContentBox");
    if (!box) return;
    const mig = window.tbbGetPendingDemoMigrationSnapshot();
    const detectedBrand =
      (mig && (mig.brandName || (mig.canvasState && mig.canvasState.brandName))) || "";
    const coupon = window.tbbCommercialDemoState.appliedCoupon || null;
    const promoOpen = Boolean(window.tbbCommercialDemoState.promoDrawerOpen || coupon);
    const finalPrice = coupon ? Number(coupon.finalAmountUsd) : 49;

    let draftName = "";
    let draftEmail = "";
    try {
      draftName = sessionStorage.getItem("tbb_checkout_draft_name") || "";
      draftEmail = sessionStorage.getItem("tbb_checkout_draft_email") || "";
    } catch (e) {}

    box.innerHTML = `
      <div class="tbb-modal-head">
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="${TBB_ISOTIPO_DATA_URI}" alt="The Best Brand" style="width:42px;height:42px;border-radius:12px;" />
          <div>
            <span class="tbb-eyebrow">${TBB_ICONS.shield} <span>100% PROPIEDAD TUYA · PAGO ÚNICO</span></span>
            <h3>${escHtml(t("checkoutTitle"))}</h3>
          </div>
        </div>
        <button type="button" class="tbb-icon-close-btn" onclick="window.tbbCloseBuyAppCheckoutModal()">${TBB_ICONS.close}</button>
      </div>

      <p class="tbb-muted-p" style="margin:0 0 16px;">${escHtml(t("checkoutSub"))}</p>

      <div class="tbb-checkout-summary-box">
        <div>
          <strong>Incluye: Pasos 4 al 6 + Brandbook (+30 páginas) + 9 archivos editables</strong>
          <span>${detectedBrand ? `Progreso listo para migrar: «${escHtml(detectedBrand)}»` : "Tus respuestas de los Pasos 0 al 3 pasan directo al Paso 4."}</span>
        </div>
        <div class="tbb-checkout-price-tag">
          ${coupon ? `<s>$49</s> $${finalPrice.toFixed(2)} USD` : `$49 USD`}
        </div>
      </div>

      <div class="tbb-checkout-fields">
        <label class="tbb-field-label">
          <span>${escHtml(t("checkoutNameLabel"))}</span>
          <input id="tbbCheckoutHolderNameInput" type="text" value="${escHtml(draftName)}" placeholder="${escHtml(t("checkoutNamePlaceholder"))}" class="tbb-input" autocomplete="name" />
        </label>
        <label class="tbb-field-label">
          <span>${escHtml(t("checkoutEmailLabel"))}</span>
          <input id="tbbCheckoutEmailInput" type="email" value="${escHtml(draftEmail)}" placeholder="${escHtml(t("checkoutEmailPlaceholder"))}" class="tbb-input" autocomplete="email" />
        </label>
      </div>

      <div class="tbb-promo-collapsible">
        <button type="button" class="tbb-link-btn" onclick="window.tbbToggleCheckoutPromoDrawer()">
          ${escHtml(t("checkoutPromoToggle"))} ${promoOpen ? "▴" : "▾"}
        </button>
        ${promoOpen ? `
          <div class="tbb-promo-row">
            <input
              id="tbbCheckoutPromoCodeInput"
              type="text"
              value="${escHtml(coupon ? coupon.code : "")}"
              placeholder="${escHtml(t("checkoutPromoPlaceholder"))}"
              class="tbb-input"
              style="text-transform:uppercase;"
              onkeydown="if(event.key==='Enter'){event.preventDefault();window.tbbApplyPromoCouponCode();}"
            />
            <button type="button" class="tbb-btn-secondary" onclick="window.tbbApplyPromoCouponCode()">${escHtml(t("checkoutPromoApply"))}</button>
            ${coupon ? `<button type="button" class="tbb-link-btn" onclick="window.tbbClearPromoCouponCode()">Quitar</button>` : ""}
          </div>
          ${coupon ? `<div class="tbb-promo-ok-msg">✓ Código <strong>${escHtml(coupon.code)}</strong> aplicado — Total: <strong>$${finalPrice.toFixed(2)} USD</strong></div>` : ""}
          <div id="tbbCheckoutPromoStatusMsg" class="tbb-promo-err-msg" style="display:none;"></div>
        ` : ""}
      </div>

      <div id="tbbCheckoutValidationMsg" class="tbb-promo-err-msg" style="display:none;margin-top:10px;"></div>

      <button id="tbbCheckoutSubmitBtn" type="button" class="tbb-btn-primary is-full" style="margin-top:16px;" onclick="window.tbbProcessCheckoutPayment()">
        ${TBB_ICONS.card}
        <span>${coupon && finalPrice <= 0 ? "Activar Licencia con Código Verificado" : (coupon ? `Continuar al Pago Seguro · $${finalPrice.toFixed(2)} USD` : escHtml(t("checkoutPayBtn")))}</span>
        ${TBB_ICONS.arrowRight}
      </button>

      <div class="tbb-checkout-footer-note">
        <span>Pago procesado con cifrado bancario por Stripe · Tarjeta, Apple Pay o Google Pay.</span>
        <button type="button" class="tbb-link-btn" onclick="window.tbbCloseBuyAppCheckoutModal(); window.tbbOpenRestoreAccountModal();">¿Ya compraste antes? Restaurar mi cuenta</button>
      </div>
    `;
  };

  window.tbbOpenBuyAppCheckoutModal = function (planId) {
    if (planId) window.tbbCommercialDemoState.selectedPlan = planId;
    let ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbBuyAppCheckoutModalOverlay";
      ov.className = "tbb-modal-overlay";
      ov.style.zIndex = "100050";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseBuyAppCheckoutModal(); };
      ov.innerHTML = `<div id="tbbCheckoutModalContentBox" class="tbb-modal-card" onclick="event.stopPropagation()"></div>`;
      document.body.appendChild(ov);
    }
    window.tbbRenderCheckoutModalContent();
    ov.classList.add("open");
  };

  window.tbbCloseBuyAppCheckoutModal = function () {
    const ov = document.getElementById("tbbBuyAppCheckoutModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  // MODAL DE LOGIN / RESTAURACIÓN DE CUENTA PARA COMPRADORES RECURRENTES
  window.tbbOpenRestoreAccountModal = function () {
    let ov = document.getElementById("tbbRestoreAccountModalOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "tbbRestoreAccountModalOverlay";
      ov.className = "tbb-modal-overlay";
      ov.style.zIndex = "100060";
      ov.onclick = (e) => { if (e.target === ov) window.tbbCloseRestoreAccountModal(); };
      document.body.appendChild(ov);
    }
    ov.innerHTML = `
      <div class="tbb-modal-card" onclick="event.stopPropagation()">
        <div class="tbb-modal-head">
          <div>
            <span class="tbb-eyebrow">${TBB_ICONS.user} <span>RESPALDO EN LA NUBE</span></span>
            <h3>${escHtml(t("restoreTitle"))}</h3>
          </div>
          <button type="button" class="tbb-icon-close-btn" onclick="window.tbbCloseRestoreAccountModal()">${TBB_ICONS.close}</button>
        </div>
        <p class="tbb-muted-p">${escHtml(t("restoreSub"))}</p>
        <div class="tbb-checkout-fields">
          <label class="tbb-field-label">
            <span>Correo electrónico registrado</span>
            <input id="tbbRestoreEmailInput" type="email" placeholder="tu@correo.com" class="tbb-input" autocomplete="email" />
          </label>
          <label class="tbb-field-label">
            <span>Contraseña (opcional si solo activaste con correo)</span>
            <input id="tbbRestorePassInput" type="password" placeholder="••••••••" class="tbb-input" autocomplete="current-password" />
          </label>
        </div>
        <div id="tbbRestoreStatusMsg" class="tbb-promo-err-msg" style="display:none;margin-top:10px;"></div>
        <button type="button" class="tbb-btn-primary is-full" style="margin-top:16px;" onclick="window.tbbSubmitRestoreAccount()">
          ${TBB_ICONS.unlock} <span>${escHtml(t("restoreBtn"))}</span>
        </button>
      </div>
    `;
    ov.classList.add("open");
  };

  window.tbbCloseRestoreAccountModal = function () {
    const ov = document.getElementById("tbbRestoreAccountModalOverlay");
    if (ov) ov.classList.remove("open");
  };

  window.tbbSubmitRestoreAccount = async function () {
    const emailEl = document.getElementById("tbbRestoreEmailInput");
    const passEl = document.getElementById("tbbRestorePassInput");
    const msgEl = document.getElementById("tbbRestoreStatusMsg");
    const email = String(emailEl ? emailEl.value : "").trim();
    const password = String(passEl ? passEl.value : "").trim();
    if (!email) {
      if (msgEl) {
        msgEl.style.display = "block";
        msgEl.textContent = "Escribe tu correo electrónico para buscar tu cuenta.";
      }
      return;
    }
    try {
      const res = await fetch("/api/v1/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data && data.user) {
        const u = data.user;
        if (u.license_code || (u.tier && u.tier !== "free")) {
          const receipt = {
            licenseId: u.license_code || "TBB-PRO-CLOUD",
            plan: u.tier || "founder_pro",
            amountUsd: 49,
            unlockedAt: new Date().toISOString(),
            stepsUnlocked: [0, 1, 2, 3, 4, 5, 6]
          };
          try {
            localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receipt));
            localStorage.setItem("tbb_user_account_v56", JSON.stringify({ email: u.email, name: u.name || "" }));
          } catch (e) {}
          window.tbbBroadcastLicenseUnlockedToStudio(receipt, { email: u.email, name: u.name || "" }, window.tbbGetPendingDemoMigrationSnapshot());
        }
        window.tbbCloseRestoreAccountModal();
        window.tbbRefreshCommercialPortalDOM();
        return;
      }
      if (msgEl) {
        msgEl.style.display = "block";
        msgEl.textContent = (data && data.detail) || "No encontramos una licencia activa con ese correo.";
      }
    } catch (e) {
      if (msgEl) {
        msgEl.style.display = "block";
        msgEl.textContent = "Error al conectar con el servidor de cuentas.";
      }
    }
  };

  // ============================================================================
  // ENCABEZADO MAESTRO, DRAWER MÓVIL Y FOOTER LOCALIZADO
  // ============================================================================
  window.tbbBuildCommercialExperienceMarkup = function () {
    const st = window.tbbCommercialDemoState;
    const sec = Number(st.activeMainSection) || 1;
    const l = getLang();
    const isPro = hasProLicense();
    const langs = [
      { code: "es", label: "ES · Español" },
      { code: "en", label: "EN · English" },
      { code: "fr", label: "FR · Français" },
      { code: "pt", label: "PT · Português" },
      { code: "de", label: "DE · Deutsch" },
      { code: "it", label: "IT · Italiano" }
    ];

    const navTabs = [
      { id: 1, icon: TBB_ICONS.home, label: t("navHome") },
      { id: 2, icon: TBB_ICONS.deliverables, label: t("navDeliverables") },
      { id: 3, icon: TBB_ICONS.appTour, label: t("navHowItWorks") },
      { id: 4, icon: TBB_ICONS.cases, label: t("navRealCases") },
      { id: 5, icon: TBB_ICONS.theory, label: t("navReferences") }
    ];

    return `
      <header class="tbb-master-header">
        <div class="tbb-header-inner">
          <a href="/" class="tbb-brand-logo-link" onclick="event.preventDefault(); window.tbbSwitchMainSection(1);">
            <img src="${TBB_CLEAN_LOGO_DATA_URI}" alt="The Best Brand" class="tbb-header-wordmark-svg" />
          </a>

          <nav class="tbb-desktop-nav" aria-label="Navegación Principal">
            ${navTabs.map((tb) => `
              <button
                type="button"
                class="tbb-nav-tab-btn ${sec === tb.id ? "active" : ""}"
                onclick="window.tbbSwitchMainSection(${tb.id})"
              >${tb.icon} <span>${escHtml(tb.label)}</span></button>
            `).join("")}
          </nav>

          <div class="tbb-header-actions">
            <label class="tbb-lang-select-wrap" aria-label="Idioma">
              ${TBB_ICONS.globe}
              <select class="tbb-lang-select-dropdown" onchange="window.tbbSwitchCommercialLanguage(this.value)">
                ${langs.map((lg) => `<option value="${lg.code}" ${lg.code === l ? "selected" : ""}>${lg.code.toUpperCase()}</option>`).join("")}
              </select>
            </label>

            <button type="button" class="tbb-header-account-btn" onclick="window.tbbOpenRestoreAccountModal()">
              ${TBB_ICONS.user}
              <span>${escHtml(t("navMyAccount"))}</span>
            </button>

            <button
              type="button"
              class="tbb-header-buy-btn ${isPro ? "is-pro" : ""}"
              onclick="${isPro ? "window.tbbOpenImmersiveStudioClone(4)" : "window.tbbOpenBuyAppCheckoutModal('founder_pro')"}"
            >
              ${isPro ? TBB_ICONS.unlock : TBB_ICONS.spark}
              <span>${escHtml(isPro ? t("navLicenseActive") : t("navBuyCta"))}</span>
            </button>

            <button type="button" class="tbb-mobile-menu-btn" onclick="window.tbbOpenMobileNavDrawer()" aria-label="Menú">
              ☰
            </button>
          </div>
        </div>
      </header>

      <div id="tbbMobileDrawerOverlay" class="tbb-mobile-drawer-overlay" onclick="if(event.target===this)window.tbbCloseMobileNavDrawer()">
        <div class="tbb-mobile-drawer-panel">
          <div>
            <div class="tbb-mobile-drawer-head">
              <img src="${TBB_CLEAN_LOGO_DATA_URI}" alt="The Best Brand" style="height:40px;width:auto;" />
              <button type="button" class="tbb-icon-close-btn" onclick="window.tbbCloseMobileNavDrawer()">${TBB_ICONS.close}</button>
            </div>
            <div class="tbb-mobile-drawer-nav-list">
              ${navTabs.map((tb) => `
                <button type="button" class="tbb-mobile-drawer-item ${sec === tb.id ? "active" : ""}" onclick="window.tbbSwitchMainSection(${tb.id})">
                  ${tb.icon} <span class="tbb-drawer-lbl">${escHtml(tb.label)}</span> ${TBB_ICONS.arrowRight}
                </button>
              `).join("")}
              <button type="button" class="tbb-mobile-drawer-item" onclick="window.tbbCloseMobileNavDrawer(); window.tbbOpenRestoreAccountModal();">
                ${TBB_ICONS.user} <span class="tbb-drawer-lbl">${escHtml(t("navMyAccount"))}</span> ${TBB_ICONS.arrowRight}
              </button>
            </div>
          </div>
          <div class="tbb-mobile-drawer-lang-box">
            <div class="tbb-drawer-lang-grid">
              ${langs.map((lg) => `
                <button type="button" class="tbb-drawer-lang-btn ${lg.code === l ? "active" : ""}" onclick="window.tbbSwitchCommercialLanguage('${lg.code}')">${lg.code.toUpperCase()}</button>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <main class="tbb-subpage-dynamic-viewport">
        ${window.tbbRenderActiveSubpageHTML(sec)}
      </main>
    `;
  };

  window.tbbUpdateLocalizedFooterDOM = function () {
    const descEl = document.querySelector("[data-tbb-i18n-footer='desc']");
    if (descEl) descEl.textContent = t("footerDesc");
  };

  window.tbbSwitchCommercialLanguage = function (langCode) {
    const clean = String(langCode || "es").toLowerCase().trim();
    if (!["es", "en", "fr", "pt", "de", "it"].includes(clean)) return;
    hardStopAllWebAudio("lang_switch_" + clean);
    if (typeof window.syncAllLangStorageKeys === "function") {
      window.syncAllLangStorageKeys(clean);
    } else {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, clean);
        localStorage.setItem("tbb_app_lang", clean);
        localStorage.setItem("tbb_lang", clean);
        localStorage.setItem("tbb_ui_lang", clean);
      } catch (e) {}
    }
    document.documentElement.lang = clean;

    window.tbbRefreshCommercialPortalDOM();

    const ifr = document.getElementById("tbbRealStudioDemoIframe");
    if (ifr && ifr.contentWindow) {
      try {
        ifr.contentWindow.postMessage({ type: "TBB_SET_LANGUAGE", lang: clean }, "*");
      } catch (e) {}
    }
  };

  // ============================================================================
  // ESTILOS ORGÁNICOS, ESCALA TIPOGRÁFICA ≥14px (0.875rem) Y CERO NEGRITAS EXCESIVAS
  // ============================================================================
  function tbbInjectOrganicStyles() {
    if (document.getElementById("tbbOrganicV129Styles")) return;
    const st = document.createElement("style");
    st.id = "tbbOrganicV129Styles";
    st.textContent = `
      :root {
        --tbb-navy: #0D2540;
        --tbb-blue: #426EAE;
        --tbb-sky: #4C9DE6;
        --tbb-orange: #FF7A00;
        --tbb-ink: #1E293B;
        --tbb-muted: #475569;
        --tbb-line: #E2E8F0;
        --tbb-bg: #FFFFFF;
        --tbb-surface: #F8FAFC;
      }
      html { scroll-behavior: smooth; font-size: 16px; }
      body.tbb-commercial-standalone-body {
        margin: 0;
        padding: 0;
        background: #FFFFFF;
        color: #0D2540;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 1rem;
        line-height: 1.6;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .tbb-svg-ic { display: inline-block; vertical-align: middle; flex-shrink: 0; }
      .tbb-container { max-width: 1220px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; }
      .tbb-section { padding: 40px 0 76px; background: #FFFFFF; }

      /* HEADER LIMPIO Y AIREADO */
      .tbb-master-header {
        position: sticky;
        top: 0;
        z-index: 1200;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(14px);
        border-bottom: 1px solid #E2E8F0;
      }
      .tbb-header-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }
      .tbb-brand-logo-link { display: inline-flex; align-items: center; text-decoration: none; }
      .tbb-header-wordmark-svg { height: 42px; width: auto; display: block; }
      .tbb-desktop-nav {
        display: flex;
        align-items: center;
        gap: 4px;
        background: #F8FAFC;
        padding: 4px;
        border-radius: 999px;
        border: 1px solid #E2E8F0;
      }
      .tbb-nav-tab-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: #334155;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.18s ease, color 0.18s ease;
        white-space: nowrap;
      }
      .tbb-nav-tab-btn:hover { color: #0D2540; background: #EEF2F6; }
      .tbb-nav-tab-btn.active { background: #0D2540; color: #FFFFFF; }
      .tbb-header-actions { display: flex; align-items: center; gap: 8px; }
      .tbb-lang-select-wrap {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        height: 40px;
        padding: 0 10px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        color: #0D2540;
      }
      .tbb-lang-select-dropdown {
        border: none;
        background: transparent;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #0D2540;
        cursor: pointer;
        outline: none;
      }
      .tbb-header-account-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        color: #0D2540;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-header-buy-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 40px;
        padding: 0 16px;
        border-radius: 999px;
        border: none;
        background: #FF7A00;
        color: #FFFFFF;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(255, 122, 0, 0.25);
        white-space: nowrap;
      }
      .tbb-header-buy-btn.is-pro { background: #059669; box-shadow: none; }
      .tbb-mobile-menu-btn {
        display: none;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        color: #0D2540;
        font-size: 1.15rem;
        cursor: pointer;
      }

      /* ESCALA TIPOGRÁFICA ORGÁNICA (CERO <14px / 0.875rem, CERO PESOS 800/900) */
      .tbb-tagline-hero-badge, .tbb-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        border-radius: 999px;
        background: #FFF7ED;
        border: 1px solid #FED7AA;
        color: #C2410C;
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 0.03em;
      }
      .tbb-eyebrow {
        background: #F4F8FC;
        border-color: #DCE6F2;
        color: #426EAE;
      }
      .tbb-home-hero-header, .tbb-section-header {
        text-align: center;
        max-width: 840px;
        margin: 0 auto 28px;
      }
      .tbb-hero-h1, .tbb-h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.9rem, 3.6vw, 2.85rem);
        font-weight: 700;
        line-height: 1.18;
        color: #0D2540;
        margin: 14px 0 12px;
        letter-spacing: -0.02em;
      }
      .tbb-h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.45rem, 2.4vw, 1.9rem);
        font-weight: 700;
        color: #0D2540;
        margin: 0 0 16px;
      }
      .tbb-hero-lead, .tbb-lead {
        font-size: 1.08rem;
        font-weight: 400;
        color: #475569;
        line-height: 1.62;
        margin: 0 auto 20px;
      }
      .tbb-muted-p { font-size: 1rem; color: #475569; margin: 0 0 16px; font-weight: 400; }

      .tbb-hero-value-pills {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }
      .tbb-value-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        border-radius: 999px;
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        color: #0D2540;
        font-size: 0.92rem;
        font-weight: 500;
      }
      .tbb-value-pill.is-highlight {
        background: #ECFDF5;
        border-color: #A7F3D0;
        color: #065F46;
        font-weight: 600;
      }

      /* BOTONES TÁCTILES ESTILO ORGÁNICO */
      .tbb-btn-primary, .tbb-btn-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 46px;
        padding: 0 22px;
        border-radius: 14px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.96rem;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.14s ease, box-shadow 0.18s ease;
      }
      .tbb-btn-primary {
        background: #FF7A00;
        color: #FFFFFF;
        border: none;
        box-shadow: 0 4px 0 #D96500;
      }
      .tbb-btn-primary:active { transform: translateY(2px); box-shadow: 0 2px 0 #D96500; }
      .tbb-btn-secondary {
        background: #FFFFFF;
        color: #0D2540;
        border: 1.5px solid #CBD5E1;
        box-shadow: 0 3px 0 #E2E8F0;
      }
      .tbb-btn-secondary:active { transform: translateY(2px); box-shadow: 0 1px 0 #E2E8F0; }
      .tbb-btn-primary.is-full { width: 100%; }
      .tbb-link-btn {
        background: none;
        border: none;
        color: #426EAE;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.94rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 0;
      }
      .tbb-link-btn:hover { color: #FF7A00; text-decoration: underline; }

      /* DEMO EN VIVO EN INICIO */
      .tbb-live-demo-master-card {
        background: #FFFFFF;
        border: 1.5px solid #CBD5E1;
        border-radius: 24px;
        box-shadow: 0 16px 44px rgba(13, 37, 64, 0.08);
        overflow: hidden;
        margin-bottom: 36px;
      }
      .tbb-live-demo-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        padding: 12px 18px;
        background: #F8FAFC;
        border-bottom: 1px solid #E2E8F0;
      }
      .tbb-live-demo-toolbar-left { display: flex; align-items: center; gap: 10px; }
      .tbb-live-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #10B981;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18);
      }
      .tbb-live-demo-toolbar-title { font-size: 0.95rem; font-weight: 600; color: #0D2540; }
      .tbb-live-demo-step-pills { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
      .tbb-step-jump-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        color: #334155;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-step-jump-pill.active { background: #0D2540; color: #FFFFFF; border-color: #0D2540; }
      .tbb-step-jump-pill.is-pro-step { border-color: #FDBA74; background: #FFF7ED; color: #9A3412; }
      .tbb-live-demo-toolbar-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .tbb-toolbar-ghost-btn, .tbb-toolbar-expand-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 13px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        color: #0D2540;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-view-toggle-group {
        display: inline-flex;
        background: #EEF2F6;
        padding: 3px;
        border-radius: 999px;
      }
      .tbb-view-toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 11px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: #475569;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-view-toggle-btn.active { background: #FFFFFF; color: #0D2540; box-shadow: 0 2px 6px rgba(13,37,64,0.08); }

      .tbb-live-demo-outer-stage {
        background: #F4F8FC;
        padding: 0;
        display: flex;
        justify-content: center;
      }
      .tbb-live-demo-mount-slot { width: 100%; }
      .tbb-live-demo-frame-shell { width: 100%; height: min(740px, 80vh); min-height: 580px; background: #FFFFFF; }
      .tbb-live-demo-outer-stage.is-mobile-frame { padding: 24px 12px; }
      .tbb-live-demo-outer-stage.is-mobile-frame .tbb-live-demo-mount-slot {
        max-width: 412px;
        border: 8px solid #0D2540;
        border-radius: 36px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(13, 37, 64, 0.18);
      }
      .tbb-live-demo-iframe { width: 100%; height: 100%; border: none; display: block; background: #FFFFFF; }
      .tbb-live-demo-bottom-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        padding: 14px 20px;
        background: #FFFFFF;
        border-top: 1px solid #E2E8F0;
      }

      .tbb-home-reassurance-strip {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 22px;
        padding: 26px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
      }
      .tbb-home-reassurance-copy { max-width: 680px; }
      .tbb-home-reassurance-copy h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.32rem;
        font-weight: 700;
        margin: 0 0 6px;
        color: #0D2540;
      }
      .tbb-home-reassurance-copy p { margin: 0; color: #475569; font-size: 1rem; }

      /* ENTREGABLES Y GLOSARIO */
      .tbb-deliverables-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
        gap: 22px;
        margin-bottom: 36px;
      }
      .tbb-deliv-card {
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: border-color 0.2s ease, transform 0.2s ease;
      }
      .tbb-deliv-card:hover { border-color: #93C5FD; transform: translateY(-2px); }
      .tbb-deliv-card.is-featured {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 1.05fr 1fr;
        border-color: #426EAE;
        background: #F8FAFC;
      }
      .tbb-deliv-thumb-wrap {
        position: relative;
        aspect-ratio: 16 / 10;
        background: #F1F5F9;
        overflow: hidden;
        cursor: pointer;
      }
      .tbb-deliv-thumb-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .tbb-deliv-format-pill {
        position: absolute;
        top: 12px;
        left: 12px;
        background: rgba(13, 37, 64, 0.92);
        color: #FFFFFF;
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .tbb-deliv-body { padding: 20px 22px; display: flex; flex-direction: column; justify-content: space-between; flex: 1; }
      .tbb-deliv-body h3 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.18rem;
        font-weight: 700;
        color: #0D2540;
        margin: 0 0 8px;
      }
      .tbb-deliv-body p { font-size: 0.96rem; color: #475569; margin: 0 0 16px; line-height: 1.55; }
      .tbb-deliv-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }

      .tbb-glossary-box {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 22px;
        padding: 28px;
        margin-bottom: 32px;
      }
      .tbb-glossary-box h2 { font-family: 'Montserrat', sans-serif; font-size: 1.35rem; font-weight: 700; margin: 0 0 6px; }
      .tbb-glossary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 14px;
        margin-top: 16px;
      }
      .tbb-glossary-item {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 14px;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tbb-glossary-ext { font-size: 0.95rem; font-weight: 700; color: #FF7A00; }
      .tbb-glossary-item span { font-size: 0.92rem; color: #334155; }

      /* CÓMO FUNCIONA */
      .tbb-how-steps-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
      .tbb-how-step-card {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 28px;
        align-items: center;
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 22px;
        padding: 24px 28px;
      }
      .tbb-how-step-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
      .tbb-step-pill-tag {
        display: inline-block;
        padding: 5px 13px;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .tbb-step-pill-tag.is-free { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
      .tbb-step-pill-tag.is-pro { background: #FFF7ED; color: #9A3412; border: 1px solid #FED7AA; }
      .tbb-step-time-pill { font-size: 0.9rem; color: #475569; font-weight: 500; }
      .tbb-how-step-copy h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.35rem;
        font-weight: 700;
        margin: 0 0 8px;
        color: #0D2540;
      }
      .tbb-how-step-copy p { font-size: 1rem; color: #475569; margin: 0 0 16px; }
      .tbb-how-step-btns { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
      .tbb-how-step-visual {
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #E2E8F0;
        cursor: zoom-in;
        background: #F8FAFC;
      }
      .tbb-how-step-visual img { width: 100%; height: auto; display: block; }

      .tbb-before-after-card {
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        border-radius: 24px;
        padding: 28px;
      }
      .tbb-before-after-head { text-align: center; max-width: 680px; margin: 0 auto 20px; }
      .tbb-before-after-head h2 { font-family: 'Montserrat', sans-serif; font-size: 1.4rem; font-weight: 700; margin: 0 0 6px; }
      .tbb-before-after-head p { margin: 0; color: #475569; font-size: 1rem; }
      .tbb-ba-stage {
        position: relative;
        max-width: 720px;
        height: 320px;
        margin: 0 auto;
        border-radius: 18px;
        background: #FFFFFF;
        border: 1px solid #CBD5E1;
        overflow: hidden;
      }
      .tbb-ba-layer {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        padding: 24px;
      }
      .tbb-ba-layer img { max-width: 82%; max-height: 82%; object-fit: contain; }
      .tbb-ba-tag {
        position: absolute;
        bottom: 14px;
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .tbb-ba-tag.is-before-tag { left: 14px; background: #F1F5F9; color: #334155; }
      .tbb-ba-tag.is-after-tag { right: 14px; background: #0D2540; color: #FFFFFF; }
      .tbb-ba-handle {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 3px;
        background: #FF7A00;
        pointer-events: none;
      }
      .tbb-ba-range-input {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: ew-resize;
        margin: 0;
      }

      /* EJEMPLOS REALES */
      .tbb-case-hero-box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        border-radius: 24px;
        padding: 26px;
        margin-bottom: 40px;
      }
      .tbb-case-preview-main h2 { font-family: 'Montserrat', sans-serif; font-size: 1.4rem; font-weight: 700; margin: 10px 0 6px; }
      .tbb-case-preview-main p { color: #475569; margin: 0 0 14px; font-size: 0.98rem; }
      .tbb-case-main-img-wrap {
        background: #FFFFFF;
        border: 1px solid #CBD5E1;
        border-radius: 18px;
        padding: 20px;
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-in;
      }
      .tbb-case-main-img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }
      .tbb-case-iter-selector-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .tbb-case-iter-btn {
        background: #FFFFFF;
        border: 1.5px solid #E2E8F0;
        border-radius: 16px;
        padding: 12px;
        text-align: left;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tbb-case-iter-btn.active { border-color: #FF7A00; box-shadow: 0 6px 18px rgba(255,122,0,0.14); }
      .tbb-case-iter-btn img { width: 100%; height: 74px; object-fit: contain; margin-bottom: 4px; }
      .tbb-case-iter-btn strong { font-size: 0.92rem; font-weight: 600; color: #0D2540; }
      .tbb-case-iter-btn span { font-size: 0.875rem; color: #475569; }

      .tbb-subsection-block { margin-bottom: 44px; }
      .tbb-plates-gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 18px;
      }
      .tbb-plate-thumb-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 16px;
        overflow: hidden;
        cursor: zoom-in;
        transition: transform 0.18s ease;
      }
      .tbb-plate-thumb-card:hover { transform: translateY(-2px); }
      .tbb-plate-thumb-card img { width: 100%; aspect-ratio: 16/10; object-fit: cover; display: block; }
      .tbb-plate-thumb-caption { padding: 12px 14px; display: flex; flex-direction: column; gap: 2px; }
      .tbb-plate-thumb-caption span { font-size: 0.875rem; color: #426EAE; font-weight: 600; }
      .tbb-plate-thumb-caption strong { font-size: 0.94rem; color: #0D2540; font-weight: 600; }

      /* REFERENCIAS (SECCIÓN 5) */
      .tbb-ref-pillars-box {
        background: #0D2540;
        color: #FFFFFF;
        border-radius: 24px;
        padding: 28px;
        margin-bottom: 32px;
      }
      .tbb-ref-pillars-box h2 { font-family: 'Montserrat', sans-serif; font-size: 1.4rem; font-weight: 700; margin: 0 0 6px; color: #FFFFFF; }
      .tbb-ref-pillars-box .tbb-muted-p { color: #CBD5E1; }
      .tbb-five-pillars-canvas-wrap { width: 100%; height: 260px; margin: 12px 0; }
      .tbb-five-pillars-canvas-wrap canvas { width: 100%; height: 100%; display: block; cursor: pointer; }
      .tbb-ref-pillar-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
      .tbb-ref-pillar-btn {
        padding: 7px 14px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.24);
        background: rgba(255,255,255,0.08);
        color: #FFFFFF;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-ref-pillar-btn.active { background: #FF7A00; border-color: #FF7A00; }
      .tbb-ref-pillar-detail {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.16);
        border-radius: 16px;
        padding: 16px 18px;
      }
      .tbb-ref-pillar-detail strong { display: block; font-size: 1.05rem; margin-bottom: 4px; }
      .tbb-ref-pillar-detail p { margin: 0 0 6px; color: #E2E8F0; font-size: 0.96rem; }
      .tbb-ref-pillar-detail span { font-size: 0.9rem; color: #FDBA74; font-weight: 500; }

      .tbb-kansei-sim-card {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 24px;
        align-items: center;
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        border-radius: 24px;
        padding: 26px;
        margin-bottom: 40px;
      }
      .tbb-kansei-sim-controls h2 { font-family: 'Montserrat', sans-serif; font-size: 1.32rem; font-weight: 700; margin: 0 0 6px; }
      .tbb-kansei-sim-controls p { color: #475569; margin: 0 0 16px; font-size: 0.96rem; }
      .tbb-sim-axis-row { display: block; margin-bottom: 14px; }
      .tbb-sim-axis-labels { display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; color: #334155; margin-bottom: 4px; }
      .tbb-sim-axis-row input[type="range"] { width: 100%; accent-color: #FF7A00; cursor: pointer; }

      .tbb-authors-stages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
        gap: 20px;
      }
      .tbb-author-stage-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .tbb-author-stage-top { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
      .tbb-author-names { font-size: 0.9rem; font-weight: 600; color: #426EAE; }
      .tbb-author-stage-card h3 { font-family: 'Montserrat', sans-serif; font-size: 1.12rem; font-weight: 700; margin: 4px 0; }
      .tbb-author-stage-card p { font-size: 0.95rem; color: #475569; margin: 0; }
      .tbb-author-works { font-size: 0.875rem; color: #64748B; border-top: 1px solid #F1F5F9; padding-top: 8px; }

      .tbb-books-head-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 18px;
      }
      .tbb-book-filter-bar { display: flex; flex-wrap: wrap; gap: 8px; }
      .tbb-book-filter-pill {
        padding: 7px 15px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        color: #334155;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-book-filter-pill.is-active { background: #0D2540; color: #FFFFFF; border-color: #0D2540; }
      .tbb-books-grid, .tbb-videos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
        gap: 18px;
      }
      .tbb-book-card, .tbb-yt-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 18px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
      }
      .tbb-yt-card { cursor: pointer; }
      .tbb-book-badge, .tbb-yt-head { font-size: 0.875rem; font-weight: 600; color: #426EAE; display: flex; justify-content: space-between; }
      .tbb-book-card h3, .tbb-yt-card h3 { font-family: 'Montserrat', sans-serif; font-size: 1.08rem; font-weight: 700; margin: 6px 0 4px; color: #0D2540; }
      .tbb-book-author { font-size: 0.92rem; color: #FF7A00; font-weight: 600; display: block; margin-bottom: 6px; }
      .tbb-book-card p, .tbb-yt-card p { font-size: 0.94rem; color: #475569; margin: 0; }

      .tbb-centered-cta-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
        margin-top: 24px;
      }

      /* MODALES (CÁPSULA AURA VIVA, LIGHTBOX, CHECKOUT Y RESTAURACIÓN) */
      .tbb-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 9500;
        background: rgba(13, 37, 64, 0.62);
        backdrop-filter: blur(8px);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
      }
      .tbb-modal-overlay.open { display: flex; }
      .tbb-modal-card {
        width: 100%;
        max-width: 580px;
        max-height: 92vh;
        overflow-y: auto;
        background: #FFFFFF;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 24px 64px rgba(13, 37, 64, 0.24);
        box-sizing: border-box;
      }
      .tbb-modal-card.is-wide { max-width: 920px; }
      .tbb-modal-card.is-capsule { max-width: 760px; }
      .tbb-modal-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
        padding-bottom: 14px;
        margin-bottom: 16px;
        border-bottom: 1px solid #E2E8F0;
      }
      .tbb-modal-head h3 { font-family: 'Montserrat', sans-serif; font-size: 1.24rem; font-weight: 700; margin: 4px 0 0; color: #0D2540; }
      .tbb-icon-close-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid #CBD5E1;
        background: #F8FAFC;
        color: #0D2540;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .tbb-capsule-top-pills, .tbb-capsule-lang-pills { display: flex; gap: 5px; flex-wrap: wrap; }
      .tbb-mini-pill {
        padding: 5px 11px;
        border-radius: 999px;
        border: 1px solid #CBD5E1;
        background: #F8FAFC;
        color: #0D2540;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-mini-pill.active { background: #0D2540; color: #FFFFFF; border-color: #0D2540; }
      .tbb-mini-pill.is-orange { background: #FF7A00; color: #FFFFFF; border-color: #FF7A00; }

      .tbb-capsule-grid {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 24px;
        align-items: center;
      }
      .tbb-capsule-orb-stage {
        background: radial-gradient(circle at 50% 42%, #1E3A8A 0%, #0D2540 76%);
        border-radius: 20px;
        padding: 18px 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      .tbb-capsule-live-tag { color: #BAE6FD; font-size: 0.875rem; font-weight: 600; }
      .tbb-capsule-replay-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.28);
        background: rgba(255,255,255,0.12);
        color: #FFFFFF;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-capsule-copy-col h3 { font-family: 'Montserrat', sans-serif; font-size: 1.35rem; font-weight: 700; margin: 0 0 10px; }
      .tbb-capsule-subtitle {
        font-size: 1.06rem;
        color: #1E293B;
        line-height: 1.6;
        background: #F8FAFC;
        border-left: 4px solid #FF7A00;
        padding: 14px 16px;
        border-radius: 12px;
        margin: 0 0 18px;
      }
      .tbb-capsule-actions { display: flex; gap: 10px; flex-wrap: wrap; }

      .tbb-lightbox-img-box {
        background: #F8FAFC;
        border-radius: 16px;
        padding: 12px;
        text-align: center;
      }
      .tbb-lightbox-img-box img { max-width: 100%; max-height: 72vh; border-radius: 12px; }

      /* CHECKOUT FIELDS */
      .tbb-checkout-summary-box {
        background: #F4F8FC;
        border: 1px solid #DCE6F2;
        border-radius: 16px;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .tbb-checkout-summary-box strong { display: block; font-size: 0.95rem; color: #0D2540; }
      .tbb-checkout-summary-box span { font-size: 0.9rem; color: #475569; }
      .tbb-checkout-price-tag {
        background: #FFF7ED;
        border: 1px solid #FED7AA;
        color: #C2410C;
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 0.98rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .tbb-checkout-fields { display: flex; flex-direction: column; gap: 12px; }
      .tbb-field-label { display: flex; flex-direction: column; gap: 5px; font-size: 0.92rem; font-weight: 600; color: #0D2540; }
      .tbb-input {
        width: 100%;
        height: 46px;
        padding: 0 14px;
        border-radius: 12px;
        border: 1.5px solid #CBD5E1;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        color: #0D2540;
        box-sizing: border-box;
      }
      .tbb-input:focus { outline: none; border-color: #426EAE; box-shadow: 0 0 0 3px rgba(66,110,174,0.14); }
      .tbb-promo-collapsible { margin-top: 12px; }
      .tbb-promo-row { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
      .tbb-promo-ok-msg { margin-top: 8px; padding: 8px 12px; border-radius: 10px; background: #ECFDF5; color: #065F46; font-size: 0.9rem; }
      .tbb-promo-err-msg { padding: 8px 12px; border-radius: 10px; background: #FEF2F2; color: #B91C1C; font-size: 0.9rem; }
      .tbb-checkout-footer-note {
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid #F1F5F9;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.875rem;
        color: #64748B;
      }

      /* DRAWER MÓVIL */
      .tbb-mobile-drawer-overlay {
        position: fixed;
        inset: 0;
        z-index: 2500;
        background: rgba(13, 37, 64, 0.58);
        backdrop-filter: blur(6px);
        display: none;
        justify-content: flex-end;
      }
      .tbb-mobile-drawer-overlay.open { display: flex; }
      .tbb-mobile-drawer-panel {
        width: min(350px, 88vw);
        height: 100%;
        background: #FFFFFF;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
      }
      .tbb-mobile-drawer-head { display: flex; align-items: center; justify-content: space-between; padding-bottom: 14px; border-bottom: 1px solid #E2E8F0; }
      .tbb-mobile-drawer-nav-list { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
      .tbb-mobile-drawer-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 16px;
        border-radius: 14px;
        border: 1px solid #E2E8F0;
        background: #F8FAFC;
        color: #0D2540;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.96rem;
        font-weight: 600;
        cursor: pointer;
      }
      .tbb-mobile-drawer-item.active { background: #0D2540; color: #FFFFFF; border-color: #0D2540; }
      .tbb-drawer-lbl { flex: 1; text-align: left; margin-left: 10px; }
      .tbb-drawer-lang-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
      .tbb-drawer-lang-btn {
        padding: 9px 0;
        border-radius: 10px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #0D2540;
        cursor: pointer;
      }
      .tbb-drawer-lang-btn.active { background: #FF7A00; color: #FFFFFF; border-color: #FF7A00; }

      /* RESPONSIVE */
      @media (max-width: 1080px) {
        .tbb-desktop-nav, .tbb-header-account-btn { display: none; }
        .tbb-mobile-menu-btn { display: inline-flex; align-items: center; justify-content: center; }
        .tbb-deliv-card.is-featured,
        .tbb-how-step-card,
        .tbb-case-hero-box,
        .tbb-kansei-sim-card,
        .tbb-capsule-grid {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 680px) {
        .tbb-container { padding: 0 16px; }
        .tbb-section { padding: 26px 0 56px; }
        .tbb-header-wordmark-svg { height: 34px; }
        .tbb-header-buy-btn span { display: none; }
        .tbb-header-buy-btn { padding: 0 12px; }
        .tbb-live-demo-frame-shell { height: 76vh; min-height: 520px; }
        .tbb-case-iter-selector-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(st);
  }

  // ============================================================================
  // INTERACCIONES EN SECCIÓN 5 (CON INTERSECTIONOBSERVER + RESIZEOBSERVER)
  // ============================================================================
  window.tbbInitAwwwardsInteractions = function () {
    if (document.getElementById("tbbKanseiLiveVectorPreview")) {
      window.tbbUpdateKanseiInfographicSimulator();
    }

    const pillarsCanvas = document.getElementById("tbbFivePillarsConvergenceCanvas");
    if (pillarsCanvas && !pillarsCanvas.dataset.boundV129) {
      pillarsCanvas.dataset.boundV129 = "1";
      const pCtx = pillarsCanvas.getContext("2d");
      const pillarMeta = [
        { code: "01", title: "CÍRCULO DORADO", color: "#FF7A00", rx: 0.14, ry: 0.30 },
        { code: "02", title: "TOUCHPOINTS", color: "#4C9DE6", rx: 0.28, ry: 0.76 },
        { code: "03", title: "SMILE", color: "#38BDF8", rx: 0.50, ry: 0.18 },
        { code: "04", title: "OSGOOD / KANSEI", color: "#A7F3D0", rx: 0.72, ry: 0.76 },
        { code: "05", title: "KAIZEN & RAND", color: "#FF7A00", rx: 0.86, ry: 0.30 }
      ];
      let isVisible = true;
      let cw = 800;
      let ch = 260;
      let dpr = Math.min(window.devicePixelRatio || 1, 2);

      function syncSize() {
        const rect = pillarsCanvas.getBoundingClientRect();
        cw = Math.max(300, rect.width || 800);
        ch = Math.max(200, rect.height || 260);
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        pillarsCanvas.width = Math.round(cw * dpr);
        pillarsCanvas.height = Math.round(ch * dpr);
      }
      syncSize();

      if ("ResizeObserver" in window) {
        const ro = new ResizeObserver(syncSize);
        ro.observe(pillarsCanvas);
      }
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => { isVisible = en.isIntersecting; });
        });
        io.observe(pillarsCanvas);
      }

      pillarsCanvas.addEventListener("click", (ev) => {
        const rect = pillarsCanvas.getBoundingClientRect();
        const mx = ev.clientX - rect.left;
        const my = ev.clientY - rect.top;
        if (Math.hypot(mx - cw * 0.5, my - ch * 0.54) < 48) {
          window.tbbTriggerHeroConvergence();
          return;
        }
        for (let i = 0; i < pillarMeta.length; i++) {
          if (Math.hypot(mx - cw * pillarMeta[i].rx, my - ch * pillarMeta[i].ry) < 44) {
            window.tbbSelectHeroTheoryNode(i);
            return;
          }
        }
      });

      const startTs = performance.now();
      function frame(now) {
        if (!document.body.contains(pillarsCanvas)) return;
        if (isVisible) {
          pCtx.save();
          pCtx.scale(dpr, dpr);
          pCtx.clearRect(0, 0, cw, ch);
          const elapsed = (now - startTs) * 0.001;
          const st = window.tbbCommercialDemoState || {};
          const selectedIdx = Number(st.heroSelectedTheoryIdx) || 0;
          const coreX = cw * 0.5;
          const coreY = ch * 0.54;

          pillarMeta.forEach((p, idx) => {
            const px = cw * p.rx;
            const py = ch * p.ry;
            const isSel = idx === selectedIdx;
            pCtx.beginPath();
            pCtx.moveTo(px, py);
            pCtx.quadraticCurveTo((px + coreX) * 0.5, Math.min(py, coreY) - 24, coreX, coreY);
            pCtx.strokeStyle = isSel ? p.color : "rgba(148,163,184,0.35)";
            pCtx.lineWidth = isSel ? 3 : 1.6;
            pCtx.stroke();

            pCtx.beginPath();
            pCtx.fillStyle = isSel ? "#FF7A00" : "#1E3A8A";
            pCtx.strokeStyle = "#FFFFFF";
            pCtx.lineWidth = 2;
            pCtx.arc(px, py, isSel ? 21 : 17, 0, Math.PI * 2);
            pCtx.fill();
            pCtx.stroke();

            pCtx.fillStyle = "#FFFFFF";
            pCtx.font = "600 14px 'Plus Jakarta Sans', sans-serif";
            pCtx.textAlign = "center";
            pCtx.textBaseline = "middle";
            pCtx.fillText(p.code, px, py);
          });

          const pulse = 36 + Math.sin(elapsed * 3.2) * 2.5;
          pCtx.beginPath();
          pCtx.fillStyle = "#FF7A00";
          pCtx.strokeStyle = "#FFFFFF";
          pCtx.lineWidth = 2.5;
          pCtx.arc(coreX, coreY, pulse, 0, Math.PI * 2);
          pCtx.fill();
          pCtx.stroke();
          pCtx.fillStyle = "#FFFFFF";
          pCtx.font = "700 14px 'Montserrat', sans-serif";
          pCtx.textAlign = "center";
          pCtx.textBaseline = "middle";
          pCtx.fillText("AURA", coreX, coreY);
          pCtx.restore();
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
  };

  window.tbbRefreshCommercialPortalDOM = function () {
    tbbInjectOrganicStyles();
    // Estacionar la Demo viva antes de re-renderizar para jamás perder el estado del iframe
    const existingHost = document.getElementById("tbbPersistentDemoIframeHost");
    if (existingHost) {
      let park = document.getElementById("tbbHiddenDemoParkingLot");
      if (!park) {
        park = document.createElement("div");
        park.id = "tbbHiddenDemoParkingLot";
        park.style.cssText = "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;pointer-events:none;opacity:0;";
        document.body.appendChild(park);
      }
      park.appendChild(existingHost);
    }

    const standaloneRoot = document.getElementById("tbbStandaloneCommercialPageRoot") || document.getElementById("tbbStandaloneCommercialRoot");
    if (standaloneRoot) {
      standaloneRoot.innerHTML = window.tbbBuildCommercialExperienceMarkup(true);
    }
    const portalInner = document.getElementById("tbbCommercialPortalInner");
    if (portalInner) {
      portalInner.innerHTML = window.tbbBuildCommercialExperienceMarkup(false);
    }

    ensurePersistentDemoStageMounted();
    window.tbbUpdateLocalizedFooterDOM();
    setTimeout(() => window.tbbInitAwwwardsInteractions(), 20);
  };

  async function verifyStripeReturnIfPresent() {
    try {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("stripe_session_id");
      if (!sessionId) return;
      const res = await fetch(`/api/v1/payments/verify-stripe-session?session_id=${encodeURIComponent(sessionId)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.paid && data.license_code) {
        const receipt = {
          licenseId: data.license_code,
          plan: data.tier || "founder_pro",
          amountUsd: 49,
          unlockedAt: new Date().toISOString(),
          stepsUnlocked: [0, 1, 2, 3, 4, 5, 6]
        };
        const account = { email: data.customer_email || "", name: data.customer_name || "", migratedSteps0to3: true };
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(receipt));
        localStorage.setItem("tbb_user_account_v56", JSON.stringify(account));
        window.tbbBroadcastLicenseUnlockedToStudio(receipt, account, window.tbbGetPendingDemoMigrationSnapshot());
        window.tbbRefreshCommercialPortalDOM();
      }
    } catch (e) {}
  }

  function applyUrlParamsState() {
    try {
      const path = (window.location.pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
      const pathMap = {
        "/": 1,
        "/inicio": 1,
        "/demo": 1,
        "/aplicacion": 1,
        "/que-recibes": 2,
        "/entregables": 2,
        "/pack-descargas": 2,
        "/como-funciona": 3,
        "/recorrido": 3,
        "/app-tour": 3,
        "/tour": 3,
        "/ejemplos": 4,
        "/casos-reales": 4,
        "/referencias": 5,
        "/bases-teoricas": 5,
        "/bases-tecnicas": 5
      };
      if (pathMap[path]) {
        window.tbbCommercialDemoState.activeMainSection = pathMap[path];
      }
      const params = new URLSearchParams(window.location.search);
      const langP = params.get("lang");
      if (langP && ["es", "en", "fr", "pt", "de", "it"].includes(langP.toLowerCase())) {
        const cl = langP.toLowerCase();
        if (typeof window.syncAllLangStorageKeys === "function") window.syncAllLangStorageKeys(cl);
        else localStorage.setItem(LANG_STORAGE_KEY, cl);
        document.documentElement.lang = cl;
      }
      const secP = params.get("section") || params.get("tab");
      if (secP) {
        const map = {
          "1": 1, "inicio": 1, "demo": 1,
          "2": 2, "que-recibes": 2, "entregables": 2, "pack-descargas": 2,
          "3": 3, "como-funciona": 3, "app-tour": 3, "tour": 3,
          "4": 4, "ejemplos": 4, "casos-reales": 4,
          "5": 5, "referencias": 5, "bases-teoricas": 5
        };
        if (map[secP.toLowerCase()]) window.tbbCommercialDemoState.activeMainSection = map[secP.toLowerCase()];
      }
    } catch (e) {}
  }

  // Escuchar eventos desde el iframe de /studio (tanto TBB_DEMO_STATE_SYNC como TBB_DEMO_PROGRESS_SYNC)
  window.addEventListener("message", (ev) => {
    try {
      const msg = ev && ev.data;
      if (!msg || typeof msg !== "object") return;
      const st = window.tbbCommercialDemoState;

      if ((msg.type === "TBB_DEMO_STATE_SYNC" || msg.type === "TBB_DEMO_PROGRESS_SYNC") && (msg.stateSnapshot || msg.payload)) {
        const snap = msg.stateSnapshot || msg.payload;
        st.migratedSteps0to3Snapshot = snap;
        if (snap.brandName) st.brandName = snap.brandName;
        if (typeof snap.step === "number") {
          st.activeDemoStep = snap.step;
          document.querySelectorAll("[data-demo-step-pill]").forEach((btn) => {
            btn.classList.toggle("active", Number(btn.getAttribute("data-demo-step-pill")) === snap.step);
          });
        }
        try {
          localStorage.setItem("tbb_demo_steps_0_to_3_backup", JSON.stringify(snap));
        } catch (e) {}
      }

      if (msg.type === "TBB_EXIT_IMMERSIVE_STUDIO") {
        window.tbbExitImmersiveStudioClone();
        return;
      }

      if (
        msg.type === "TBB_TRIGGER_STEP4_PAYWALL" ||
        msg.type === "TBB_DEMO_COMPLETED_STEP_3" ||
        msg.type === "TBB_OPEN_CHECKOUT_PAYWALL_STEP4" ||
        msg.type === "TBB_TRIGGER_PAYWALL"
      ) {
        const snap = msg.stateSnapshot || msg.payload;
        if (snap && typeof snap === "object") {
          st.migratedSteps0to3Snapshot = snap;
          try {
            localStorage.setItem("tbb_demo_steps_0_to_3_backup", JSON.stringify(snap));
          } catch (e) {}
        }
        window.tbbOpenBuyAppCheckoutModal("founder_pro");
      }
    } catch (e) {}
  });

  window.addEventListener("popstate", () => {
    hardStopAllWebAudio("popstate");
    applyUrlParamsState();
    window.tbbRefreshCommercialPortalDOM();
  });

  function bootCommercialExperience() {
    tbbInjectOrganicStyles();
    applyUrlParamsState();
    window.tbbRefreshCommercialPortalDOM();
    verifyStripeReturnIfPresent();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootCommercialExperience);
  } else {
    bootCommercialExperience();
  }
})();
