const fs = require('fs');
const zlib = require('zlib');

function decodePNG(filePath) {
  const buf = fs.readFileSync(filePath);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  
  let idat = [];
  let pos = 8;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idat.push(buf.subarray(pos + 8, pos + 8 + len));
    pos += 12 + len;
  }
  const decomp = zlib.inflateSync(Buffer.concat(idat));
  
  const bpp = 4; // RGBA
  const stride = 1 + w * bpp;
  const raw = Buffer.alloc(w * h * bpp);
  
  let prevRow = Buffer.alloc(w * bpp);
  for (let y = 0; y < h; y++) {
    const filter = decomp[y * stride];
    const row = decomp.subarray(y * stride + 1, (y + 1) * stride);
    const unfiltered = Buffer.alloc(w * bpp);
    
    for (let x = 0; x < w * bpp; x++) {
      const a = x >= bpp ? unfiltered[x - bpp] : 0;
      const b = prevRow[x];
      const c = x >= bpp ? prevRow[x - bpp] : 0;
      let val = row[x];
      
      if (filter === 0) { // None
        unfiltered[x] = val;
      } else if (filter === 1) { // Sub
        unfiltered[x] = (val + a) & 0xff;
      } else if (filter === 2) { // Up
        unfiltered[x] = (val + b) & 0xff;
      } else if (filter === 3) { // Average
        unfiltered[x] = (val + Math.floor((a + b) / 2)) & 0xff;
      } else if (filter === 4) { // Paeth
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        unfiltered[x] = (val + pr) & 0xff;
      }
    }
    unfiltered.copy(raw, y * w * bpp);
    prevRow = unfiltered;
  }
  
  return { w, h, data: raw };
}

const logo2 = decodePNG('assets/images/Logo-2.0-removebg-preview.png');
console.log('Decoded logo2:', logo2.w, 'x', logo2.h, 'pixels:', logo2.data.length / 4);

// Sample a 50x56 ascii grid
let ascii = [];
for (let y = 0; y < logo2.h; y += 2) {
  let row = '';
  for (let x = 0; x < logo2.w; x += 2) {
    const idx = (y * logo2.w + x) * 4;
    const r = logo2.data[idx], g = logo2.data[idx+1], b = logo2.data[idx+2], a = logo2.data[idx+3];
    if (a < 50) row += ' ';
    else if (r > 180 && g < 150) row += 'O'; // Orange (Fox body)
    else if (b > 180 && r < 100) row += 'C'; // Cyan (Hand)
    else if (r > 200 && g > 200 && b > 200) row += 'W'; // White (Muzzle)
    else row += '#';
  }
  ascii.push(row);
}
console.log(ascii.join('\n'));
