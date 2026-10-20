const fs = require('fs');
const path = require('path');

// 1. Load exact images and encode as base64 data URIs
const horizontalPngPath = path.join(__dirname, '..', 'assets', 'images', 'logo', 'logo-horizontal-transparent.png');
const horizontalNavyPngPath = path.join(__dirname, '..', 'assets', 'images', 'logo', 'Logo-3.png');
const emblemPngPath = path.join(__dirname, '..', 'assets', 'images', 'Logo-2.0-removebg-preview.png');
const emblemNavyPngPath = path.join(__dirname, '..', 'assets', 'images', 'logo', 'Logo-2.0.png');

const horizontalBase64 = fs.readFileSync(horizontalPngPath).toString('base64');
const horizontalDataUri = `data:image/png;base64,${horizontalBase64}`;

const horizontalNavyBase64 = fs.readFileSync(horizontalNavyPngPath).toString('base64');
const horizontalNavyDataUri = `data:image/png;base64,${horizontalNavyBase64}`;

const emblemBase64 = fs.readFileSync(emblemPngPath).toString('base64');
const emblemDataUri = `data:image/png;base64,${emblemBase64}`;

const emblemNavyBase64 = fs.readFileSync(emblemNavyPngPath).toString('base64');
const emblemNavyDataUri = `data:image/png;base64,${emblemNavyBase64}`;

console.log('✓ Loaded and encoded official brand assets into base64');

// 2. Update scratch/build-templates.js
const buildTemplatesPath = path.join(__dirname, 'build-templates.js');
let templatesContent = fs.readFileSync(buildTemplatesPath, 'utf8');

// Inject data URIs at the top of build-templates.js if not present
if (!templatesContent.includes('const horizontalDataUri =')) {
  templatesContent = templatesContent.replace(
    "const fs = require('fs');",
    `const fs = require('fs');
const horizontalDataUri = "${horizontalDataUri}";
const emblemDataUri = "${emblemDataUri}";`
  );
}

// Replace Header in generateSquareSVG
const oldSquareHeaderRegex = /<!-- HEADER -->\s*<g transform="translate\(80, 80\)">[\s\S]*?<g transform="translate\(620, 5\)">/g;
const newSquareHeader = `<!-- HEADER -->
  <g transform="translate(80, 70)">
    <!-- Exact Official FOX LIBRAS Horizontal Logo -->
    <image href="\${horizontalDataUri}" x="0" y="0" width="180" height="74" preserveAspectRatio="xMidYMid meet" />
    
    <!-- Category Pill Badge -->
    <g transform="translate(620, 15)">`;
templatesContent = templatesContent.replace(oldSquareHeaderRegex, newSquareHeader);

// Replace Graphic Placeholder cartoon face in generateSquareSVG
const oldSquareCenterGraphicRegex = /<!-- Inner aesthetic decorative elements -->[\s\S]*?<circle cx="400" cy="115" r="60"[^>]*\/>[\s\S]*?<ellipse cx="445" cy="120"[^>]*\/>/g;
const newSquareCenterGraphic = `<!-- Inner aesthetic decorative elements with authentic emblem -->
        <circle cx="400" cy="110" r="50" fill="#0B2040" stroke="#1E3A5F" stroke-width="1.5"/>
        <image href="\${emblemDataUri}" x="370" y="70" width="60" height="68" preserveAspectRatio="xMidYMid meet" />`;
templatesContent = templatesContent.replace(oldSquareCenterGraphicRegex, newSquareCenterGraphic);

// Replace Header in generateVerticalSVG
const oldVerticalHeaderRegex = /<!-- HEADER -->\s*<g transform="translate\(90, 90\)">[\s\S]*?<g transform="translate\(600, 8\)">/g;
const newVerticalHeader = `<!-- HEADER -->
  <g transform="translate(90, 80)">
    <!-- Exact Official FOX LIBRAS Horizontal Logo -->
    <image href="\${horizontalDataUri}" x="0" y="0" width="180" height="74" preserveAspectRatio="xMidYMid meet" />
    
    <g transform="translate(600, 18)">`;
templatesContent = templatesContent.replace(oldVerticalHeaderRegex, newVerticalHeader);

// Replace Graphic Placeholder cartoon face in generateVerticalSVG
const oldVerticalCenterGraphicRegex = /<circle cx="385" cy="180" r="80" fill="#0B2040"\/>[\s\S]*?<ellipse cx="445" cy="190"[^>]*\/>/g;
const newVerticalCenterGraphic = `<circle cx="385" cy="180" r="70" fill="#0B2040" stroke="#1E3A5F" stroke-width="2"/>
        <image href="\${emblemDataUri}" x="345" y="130" width="80" height="90" preserveAspectRatio="xMidYMid meet" />`;
templatesContent = templatesContent.replace(oldVerticalCenterGraphicRegex, newVerticalCenterGraphic);

fs.writeFileSync(buildTemplatesPath, templatesContent, 'utf8');
console.log('✓ Updated build-templates.js with authentic logo');

// 3. Update scratch/build-carousels.js
const buildCarouselsPath = path.join(__dirname, 'build-carousels.js');
let carouselsContent = fs.readFileSync(buildCarouselsPath, 'utf8');

// Inject data URIs at the top of build-carousels.js
if (!carouselsContent.includes('const horizontalDataUri =')) {
  carouselsContent = carouselsContent.replace(
    "const fs = require('fs');",
    `const fs = require('fs');
const horizontalDataUri = "${horizontalDataUri}";
const emblemDataUri = "${emblemDataUri}";`
  );
}

// Replace Brand Header in cover slide
const oldCoverHeaderRegex = /<!-- Brand Header -->\s*<g transform="translate\(90, 90\)">[\s\S]*?<g transform="translate\(620, 5\)">/g;
const newCoverHeader = `<!-- Brand Header -->
  <g transform="translate(90, 75)">
    <!-- Exact Official FOX LIBRAS Logo -->
    <image href="\${horizontalDataUri}" x="0" y="0" width="185" height="76" preserveAspectRatio="xMidYMid meet" />
    
    <g transform="translate(620, 20)">`;
carouselsContent = carouselsContent.replace(oldCoverHeaderRegex, newCoverHeader);

// Replace Cover graphic indicator center circles
const oldCoverGraphicRegex = /<!-- Visual Carousel Graphic Indicator -->[\s\S]*?<circle cx="450" cy="140" r="60"[^>]*\/>[\s\S]*?<ellipse cx="495" cy="145"[^>]*\/>/g;
const newCoverGraphic = `<!-- Visual Carousel Graphic Indicator with Official Emblem -->
    <g transform="translate(0, 420)">
      <rect x="0" y="0" width="900" height="280" rx="24" fill="#0A1C33" stroke="#1E3A5F" stroke-width="2"/>
      <circle cx="450" cy="120" r="60" fill="#0F2D54" stroke="#1E3A5F" stroke-width="1.5"/>
      <image href="\${emblemDataUri}" x="415" y="80" width="70" height="78" preserveAspectRatio="xMidYMid meet" />`;
carouselsContent = carouselsContent.replace(oldCoverGraphicRegex, newCoverGraphic);

// Replace Closing Slide Header
const oldClosingHeaderRegex = /<!-- Brand Header -->\s*<g transform="translate\(90, 90\)">[\s\S]*?<\/g>\s*<!-- Closing Card -->/g;
const newClosingHeader = `<!-- Brand Header -->
  <g transform="translate(90, 75)">
    <!-- Exact Official FOX LIBRAS Logo -->
    <image href="\${horizontalDataUri}" x="0" y="0" width="185" height="76" preserveAspectRatio="xMidYMid meet" />
  </g>

  <!-- Closing Card -->`;
carouselsContent = carouselsContent.replace(oldClosingHeaderRegex, newClosingHeader);

// Replace Regular Slide Header
const oldRegularHeaderRegex = /<!-- Brand Header -->\s*<g transform="translate\(90, 90\)">[\s\S]*?<g transform="translate\(680, 5\)">/g;
const newRegularHeader = `<!-- Brand Header -->
  <g transform="translate(90, 75)">
    <!-- Exact Official FOX LIBRAS Logo -->
    <image href="\${horizontalDataUri}" x="0" y="0" width="185" height="76" preserveAspectRatio="xMidYMid meet" />
    
    <g transform="translate(680, 20)">`;
carouselsContent = carouselsContent.replace(oldRegularHeaderRegex, newRegularHeader);

fs.writeFileSync(buildCarouselsPath, carouselsContent, 'utf8');
console.log('✓ Updated build-carousels.js with authentic logo');

// 4. Update the Concept SVG cards: concept-b and concept-c in assets/brand/concepts and public/brand/concepts
const conceptBSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%">
  <rect width="600" height="380" rx="24" fill="#071B36" stroke="#1E3A6E" stroke-width="2"/>
  
  <!-- Badge Identidade Oficial — Versão Vertical -->
  <g transform="translate(30, 25)">
    <rect width="260" height="30" rx="15" fill="#0B2D5B" stroke="#00B4E6" stroke-width="1.2"/>
    <circle cx="16" cy="15" r="4.5" fill="#00B4E6"/>
    <text x="30" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#FFFFFF" letter-spacing="1">IDENTIDADE OFICIAL — VERTICAL</text>
  </g>

  <!-- Official Vertical Lockup Artwork -->
  <g transform="translate(240, 70)">
    <circle cx="60" cy="55" r="55" fill="#0B2D5B" stroke="#1E3A6E" stroke-width="1.5"/>
    <image href="${emblemDataUri}" x="15" y="5" width="90" height="100" preserveAspectRatio="xMidYMid meet" />
  </g>

  <!-- Typography -->
  <g transform="translate(300, 250)" text-anchor="middle">
    <text y="0" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" letter-spacing="3">
      FOX <tspan fill="#00B4E6">LIBRAS</tspan>
    </text>
    <text y="28" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="12" fill="#CBD5E1" letter-spacing="4" text-transform="uppercase">
      Soluções em Acessibilidade
    </text>
    
    <line x1="-120" y1="48" x2="120" y2="48" stroke="#1E3A6E" stroke-width="1.5"/>
    
    <text y="70" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8" letter-spacing="1.5">
      USO EM APLICAÇÕES VERTICAIS &bull; EMBLEMA SUPERIOR
    </text>
  </g>
</svg>`;

const conceptCSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%">
  <rect width="600" height="380" rx="24" fill="#071B36" stroke="#1E3A6E" stroke-width="2"/>
  
  <!-- Badge Identidade Oficial — Símbolo & Emblema -->
  <g transform="translate(30, 25)">
    <rect width="270" height="30" rx="15" fill="#0B2D5B" stroke="#FF7A00" stroke-width="1.2"/>
    <circle cx="16" cy="15" r="4.5" fill="#FF7A00"/>
    <text x="30" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#FFFFFF" letter-spacing="1">IDENTIDADE OFICIAL — SÍMBOLO</text>
  </g>

  <!-- Official Emblem Artwork -->
  <g transform="translate(225, 75)">
    <circle cx="75" cy="75" r="75" fill="#0B2D5B" stroke="#1E3A6E" stroke-width="2"/>
    <image href="${emblemDataUri}" x="20" y="10" width="110" height="123" preserveAspectRatio="xMidYMid meet" />
  </g>

  <!-- Typography -->
  <g transform="translate(300, 275)" text-anchor="middle">
    <text y="0" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" letter-spacing="2">
      SÍMBOLO <tspan fill="#FF7A00">RAPOSA + MÃOS</tspan>
    </text>
    <text y="24" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#CBD5E1" letter-spacing="3" text-transform="uppercase">
      Identidade Institucional Fox Libras
    </text>
    
    <line x1="-130" y1="44" x2="130" y2="44" stroke="#1E3A6E" stroke-width="1.5"/>
    
    <text y="64" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8" letter-spacing="1.5">
      FAVICONS &bull; AVATARES &bull; SELOS DIGITAIS
    </text>
  </g>
</svg>`;

const conceptDirs = [
  path.join(__dirname, '..', 'assets', 'brand', 'concepts'),
  path.join(__dirname, '..', 'public', 'brand', 'concepts')
];

conceptDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'concept-b-fox-connect.svg'), conceptBSvg, 'utf8');
  fs.writeFileSync(path.join(dir, 'concept-c-fox-inclui.svg'), conceptCSvg, 'utf8');
  console.log(`✓ Updated concept-b and concept-c in ${dir}`);
});

console.log('Update script ready. Now will execute build-templates.js and build-carousels.js.');
