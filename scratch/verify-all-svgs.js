const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.svg')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const rootDir = path.join(__dirname, '..');
const svgFiles = getAllFiles(rootDir);

console.log(`Found ${svgFiles.length} SVG files to verify:`);

let allClean = true;
svgFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  
  // Check if contains valid SVG tags
  if (!content.includes('<svg') || !content.includes('</svg>')) {
    console.error(`[INVALID SVG] ${relPath}`);
    allClean = false;
  }
  
  // Check for old facial path strings or old concepts
  const badPatterns = [
    'C16,24 20,14',
    'C14,42 18,28',
    'C22,28 25,20',
    'CONCEITO B — CONNECT',
    'CONCEITO C — INCLUI',
    'FOXCONNECT',
    'FOXINCLUI'
  ];
  
  for (const bad of badPatterns) {
    if (content.includes(bad)) {
      console.error(`[BAD PATTERN: "${bad}"] in ${relPath}`);
      allClean = false;
    }
  }

  // Check if has image data URI or clean vector
  const hasImage = content.includes('data:image/png;base64');
  const sizeKb = (content.length / 1024).toFixed(1);
  // console.log(`✓ [${sizeKb} KB] ${relPath} (embedded: ${hasImage ? 'YES' : 'NO'})`);
});

if (allClean) {
  console.log(`\n🎉 SUCCESS! All ${svgFiles.length} SVG files are 100% CLEAN and verified with the authentic identity!`);
} else {
  console.error('\n❌ Issues found in SVG files!');
  process.exit(1);
}
