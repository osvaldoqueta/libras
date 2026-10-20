const fs = require('fs');
const path = require('path');

const files = ['index.html', 'brand-guide.html', 'marketing-hub.html'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log('Checking:', file);
  
  const srcMatches = [...content.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  const localAssets = srcMatches.filter(s => 
    !s.startsWith('http') && 
    !s.startsWith('data:') && 
    !s.startsWith('#') && 
    !s.startsWith('javascript:')
  );
  
  let missingCount = 0;
  localAssets.forEach(asset => {
    const cleanAsset = asset.split('?')[0].split('#')[0];
    if (!fs.existsSync(cleanAsset)) {
      console.warn('  [MISSING SRC]:', cleanAsset);
      missingCount++;
    }
  });

  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
  const localHrefs = hrefMatches.filter(h => 
    !h.startsWith('http') && 
    !h.startsWith('data:') && 
    !h.startsWith('#') && 
    !h.startsWith('mailto:') && 
    !h.startsWith('tel:') && 
    !h.startsWith('javascript:')
  );
  
  localHrefs.forEach(href => {
    const cleanHref = href.split('?')[0].split('#')[0];
    if (!fs.existsSync(cleanHref)) {
      console.warn('  [MISSING HREF]:', cleanHref);
      missingCount++;
    }
  });

  if (missingCount === 0) {
    console.log('  -> All ' + (localAssets.length + localHrefs.length) + ' local references OK!');
  }
});

console.log('Done.');
