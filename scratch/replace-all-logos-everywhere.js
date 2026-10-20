const fs = require('fs');
const path = require('path');

// 1. Read the exact images provided by user
const horizontalTransparentPng = fs.readFileSync('assets/images/logo/logo-horizontal-transparent.png');
const symbolTransparentPng = fs.readFileSync('assets/images/Logo-2.0-removebg-preview.png');
const darkLogoPng = fs.readFileSync('assets/images/logo/Logo-3.png');

const horizontalDataUri = `data:image/png;base64,${horizontalTransparentPng.toString('base64')}`;
const symbolDataUri = `data:image/png;base64,${symbolTransparentPng.toString('base64')}`;
const darkLogoDataUri = `data:image/png;base64,${darkLogoPng.toString('base64')}`;

// 2. BRAND FILES
const brandDir = path.join(__dirname, '..', 'assets', 'brand');
const publicBrandDir = path.join(__dirname, '..', 'public', 'brand');
const conceptsDir = path.join(brandDir, 'concepts');
const publicConceptsDir = path.join(publicBrandDir, 'concepts');

[brandDir, publicBrandDir, conceptsDir, publicConceptsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Crisp Official SVGs wrapping the exact user logo
const logoHorizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 120" width="290" height="120">
  <title>FOX LIBRAS — Soluções em Acessibilidade</title>
  <image href="${horizontalDataUri}" x="0" y="0" width="290" height="120" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const logoVerticalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
  <title>FOX LIBRAS — Vertical Oficial</title>
  <image href="${symbolDataUri}" x="60" y="8" width="100" height="112" preserveAspectRatio="xMidYMid meet" />
  <!-- Exact official typography matching the logo -->
  <text x="110" y="152" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="28" letter-spacing="1" text-anchor="middle">FOX <tspan fill="#00C4FF">LIBRAS</tspan></text>
  <text x="110" y="178" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="11" letter-spacing="0.5" text-anchor="middle">Soluções em Acessibilidade</text>
</svg>`;

const logoSymbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 112" width="100" height="112">
  <title>FOX LIBRAS — Símbolo Oficial</title>
  <image href="${symbolDataUri}" x="0" y="0" width="100" height="112" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const logoIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" rx="28" fill="#071B36" />
  <image href="${symbolDataUri}" x="14" y="8" width="100" height="112" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="#071B36"/>
  <image href="${symbolDataUri}" x="3" y="1" width="26" height="30" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#071B36"/>
  <circle cx="256" cy="256" r="230" fill="none" stroke="#00C4FF" stroke-width="4" opacity="0.3"/>
  <image href="${symbolDataUri}" x="76" y="56" width="360" height="400" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const logoMonochromeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 120" width="290" height="120">
  <filter id="grayscale">
    <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 1   0.33 0.33 0.33 0 1   0.33 0.33 0.33 0 1   0 0 0 1 0"/>
  </filter>
  <image href="${horizontalDataUri}" x="0" y="0" width="290" height="120" filter="url(#grayscale)" preserveAspectRatio="xMidYMid meet" />
</svg>`;

const brandFiles = [
  ['logo-horizontal.svg', logoHorizontalSvg],
  ['logo-vertical.svg', logoVerticalSvg],
  ['logo-symbol.svg', logoSymbolSvg],
  ['logo-icon.svg', logoIconSvg],
  ['favicon.svg', faviconSvg],
  ['app-icon.svg', appIconSvg],
  ['logo-monochrome.svg', logoMonochromeSvg],
  ['concepts/concept-a-fox-signature.svg', logoHorizontalSvg]
];

brandFiles.forEach(([name, content]) => {
  fs.writeFileSync(path.join(brandDir, name), content, 'utf8');
  fs.writeFileSync(path.join(publicBrandDir, name), content, 'utf8');
});
console.log('✓ Brand SVGs written to assets/brand/ and public/brand/');

// 3. UPDATE POSTS (post-01, post-02, post-03)
// We replace the old stylized fox paths in the header and center with the EXACT logo & symbol
function updatePostSvg(filePath, isFeedOrSquareOrStory) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace header logo group
  // Find <g transform="translate(80, 80)"> or <g transform="translate(90, 90)"> or <g transform="translate(90, 220)">
  // We replace the inner logo with <image href="${horizontalDataUri}" width="180" height="74" .../>
  const headerOldRegex = /<g transform="translate\(\d+,\s*\d+\)">\s*<!-- Symbol: FOX SIGNATURE -->[\s\S]*?<\/text>\s*<\/g>/g;
  
  // Or match from Symbol to Soluções em Acessibilidade
  const logoBlockRegex = /<!-- Symbol: FOX SIGNATURE -->[\s\S]*?Soluções em Acessibilidade<\/text>/g;
  if (logoBlockRegex.test(content)) {
    content = content.replace(logoBlockRegex, `<!-- Exact Official FOX LIBRAS Logo -->\n    <image href="${horizontalDataUri}" x="0" y="0" width="185" height="76" preserveAspectRatio="xMidYMid meet" />`);
  }

  // Also replace any other header pattern with the exact logo
  const genericHeaderRegex = /<g transform="translate\(0,\s*0\)">\s*<circle cx="[23]\d"[\s\S]*?Soluções em Acessibilidade<\/text>/g;
  if (genericHeaderRegex.test(content)) {
    content = content.replace(genericHeaderRegex, `<image href="${horizontalDataUri}" x="0" y="0" width="185" height="76" preserveAspectRatio="xMidYMid meet" />`);
  }

  // In Post 01 center composition: replace the stylized hands with the EXACT Fox + Hand symbol
  const centerOldHandsRegex = /<!-- Dynamic Signing Hands Concept Vector -->[\s\S]*?<\/g>\s*<!-- Center Bridge Line connecting hands -->\s*<path[^>]*\/>/g;
  if (centerOldHandsRegex.test(content)) {
    content = content.replace(centerOldHandsRegex, `<!-- Exact Official Fox + Hand Symbol -->\n    <image href="${symbolDataUri}" x="-110" y="-120" width="220" height="240" preserveAspectRatio="xMidYMid meet" />`);
  }
  
  // Also check if center had Dynamic Signing Hands without bridge
  const centerOldHands2 = /<!-- Dynamic Signing Hands Concept Vector -->[\s\S]*?<\/g>\s*<path d="M-25,12 Q0,-18 25,12"[^>]*\/>/g;
  if (centerOldHands2.test(content)) {
    content = content.replace(centerOldHands2, `<!-- Exact Official Fox + Hand Symbol -->\n    <image href="${symbolDataUri}" x="-110" y="-120" width="220" height="240" preserveAspectRatio="xMidYMid meet" />`);
  }

  const centerOldHands3 = /<!-- Dynamic Signing Hands Concept Vector -->[\s\S]*?<\/g>\s*<path d="M-30,15 Q0,-22 30,15"[^>]*\/>/g;
  if (centerOldHands3.test(content)) {
    content = content.replace(centerOldHands3, `<!-- Exact Official Fox + Hand Symbol -->\n    <image href="${symbolDataUri}" x="-130" y="-140" width="260" height="280" preserveAspectRatio="xMidYMid meet" />`);
  }

  // In Post 01 clean background:
  const cleanVisualRegex = /<!-- Clean Visual Focus \(Hands Symbol\) -->[\s\S]*?<\/g>\s*<path d="M-20,10 Q0,-15 20,10"[^>]*\/>/g;
  if (cleanVisualRegex.test(content)) {
    content = content.replace(cleanVisualRegex, `<!-- Exact Official Fox + Hand Symbol -->\n    <image href="${symbolDataUri}" x="-110" y="-120" width="220" height="240" preserveAspectRatio="xMidYMid meet" />`);
  }

  // Logo Position preserved in clean background
  const cleanHeaderRegex = /<!-- Logo Position preserved -->\s*<g transform="translate\(80, 80\)">[\s\S]*?SOLUÇÕES EM ACESSIBILIDADE<\/text>\s*<\/g>/g;
  if (cleanHeaderRegex.test(content)) {
    content = content.replace(cleanHeaderRegex, `<!-- Exact Official FOX LIBRAS Logo -->\n  <g transform="translate(80, 80)">\n    <image href="${horizontalDataUri}" x="0" y="0" width="185" height="76" preserveAspectRatio="xMidYMid meet" />\n  </g>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// Update all post SVGs
const postsDir = path.join(__dirname, '..', 'public', 'marketing', 'posts');
const postFolders = ['post-01-posicionamento', 'post-02-atendimento', 'post-03-eventos'];

postFolders.forEach(folder => {
  const pPath = path.join(postsDir, folder);
  if (fs.existsSync(pPath)) {
    const files = fs.readdirSync(pPath).filter(f => f.endsWith('.svg'));
    files.forEach(f => {
      updatePostSvg(path.join(pPath, f));
      console.log('✓ Updated post SVG:', folder + '/' + f);
    });
  }
});

