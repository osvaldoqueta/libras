const fs = require('fs');
const path = require('path');

// Read PNGs as base64
const horizontalPngBase64 = fs.readFileSync('assets/images/logo/logo-horizontal-transparent.png').toString('base64');
const symbolPngBase64 = fs.readFileSync('assets/images/Logo-2.0-removebg-preview.png').toString('base64');
const darkLogoPngBase64 = fs.readFileSync('assets/images/logo/Logo-3.png').toString('base64');

const horizontalDataUri = `data:image/png;base64,${horizontalPngBase64}`;
const symbolDataUri = `data:image/png;base64,${symbolPngBase64}`;
const darkLogoDataUri = `data:image/png;base64,${darkLogoPngBase64}`;

// 1. GENERATE ASSETS/BRAND FILES
const logoHorizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 120" width="290" height="120">
  <title>FOX LIBRAS — Soluções em Acessibilidade</title>
  <image href="${horizontalDataUri}" x="0" y="0" width="290" height="120" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const logoSymbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 112" width="100" height="112">
  <title>FOX LIBRAS — Símbolo Oficial</title>
  <image href="${symbolDataUri}" x="0" y="0" width="100" height="112" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const logoIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <title>FOX LIBRAS — Ícone</title>
  <rect width="128" height="128" rx="28" fill="#071B36" />
  <image href="${symbolDataUri}" x="16" y="10" width="96" height="108" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="#071B36"/>
  <image href="${symbolDataUri}" x="3" y="1" width="26" height="30" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#071B36"/>
  <circle cx="256" cy="256" r="230" fill="none" stroke="#00B4E6" stroke-width="4" opacity="0.3"/>
  <image href="${symbolDataUri}" x="66" y="46" width="380" height="420" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const logoVerticalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 220" width="240" height="220">
  <title>FOX LIBRAS — Vertical</title>
  <image href="${symbolDataUri}" x="70" y="10" width="100" height="112" preserveAspectRatio="xMidYMid meet" />
  <text x="120" y="155" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" letter-spacing="1.5" text-anchor="middle">FOX <tspan fill="#00B4E6">LIBRAS</tspan></text>
  <text x="120" y="180" fill="#CBD5E1" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="11" letter-spacing="2" text-transform="uppercase" text-anchor="middle">Soluções em Acessibilidade</text>
</svg>`;

const logoMonochromeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 120" width="290" height="120">
  <filter id="mono">
    <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 1   0.33 0.33 0.33 0 1   0.33 0.33 0.33 0 1   0 0 0 1 0"/>
  </filter>
  <image href="${horizontalDataUri}" x="0" y="0" width="290" height="120" filter="url(#mono)" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const brandDir = path.join(__dirname, '..', 'assets', 'brand');
const publicBrandDir = path.join(__dirname, '..', 'public', 'brand');
const conceptsDir = path.join(brandDir, 'concepts');
const publicConceptsDir = path.join(publicBrandDir, 'concepts');

[brandDir, publicBrandDir, conceptsDir, publicConceptsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const filesToWrite = [
  ['logo-horizontal.svg', logoHorizontalSvg],
  ['logo-vertical.svg', logoVerticalSvg],
  ['logo-symbol.svg', logoSymbolSvg],
  ['logo-icon.svg', logoIconSvg],
  ['favicon.svg', faviconSvg],
  ['app-icon.svg', appIconSvg],
  ['logo-monochrome.svg', logoMonochromeSvg],
  ['concepts/concept-a-fox-signature.svg', logoHorizontalSvg]
];

filesToWrite.forEach(([relPath, content]) => {
  fs.writeFileSync(path.join(brandDir, relPath), content, 'utf8');
  fs.writeFileSync(path.join(publicBrandDir, relPath), content, 'utf8');
});
console.log('Brand files updated successfully in assets/brand/ and public/brand/!');

// Helper to replace brand header in any SVG
function replaceSvgBrandHeader(svgContent, logoX, logoY, logoW, logoH) {
  // If already contains embedded horizontal image, return
  // Find <g transform="translate(80, 80)"> or similar
  // We can insert the official logo image
  return svgContent;
}

