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
      
      if (filter === 0) unfiltered[x] = val;
      else if (filter === 1) unfiltered[x] = (val + a) & 0xff;
      else if (filter === 2) unfiltered[x] = (val + b) & 0xff;
      else if (filter === 3) unfiltered[x] = (val + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
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

function encodePNG(w, h, data) {
  // Simple uncompressed or deflate PNG encoder
  const bpp = 4;
  const stride = 1 + w * bpp;
  const filtered = Buffer.alloc(stride * h);
  
  for (let y = 0; y < h; y++) {
    filtered[y * stride] = 0; // Filter None
    data.copy(filtered, y * stride + 1, y * w * bpp, (y + 1) * w * bpp);
  }
  
  const compressed = zlib.deflateSync(filtered);
  
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA color type
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  
  const crcData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crcVal = crc32(crcData);
  buf.writeUInt32BE(crcVal, 8 + len);
  return buf;
}

// CRC32 implementation
function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Read Logo-3.png and make background transparent
const img = decodePNG('assets/images/logo/Logo-3.png');
const bgR = 1, bgG = 24, bgB = 56; // sample background

for (let i = 0; i < img.data.length; i += 4) {
  const r = img.data[i], g = img.data[i+1], b = img.data[i+2];
  // Calculate distance from background color
  const dist = Math.sqrt((r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2);
  
  if (dist < 18) {
    img.data[i+3] = 0; // 100% transparent
  } else if (dist < 35) {
    // Smooth feather edge
    const alpha = (dist - 18) / (35 - 18);
    img.data[i+3] = Math.round(alpha * 255);
  }
}

const outPng = encodePNG(img.w, img.h, img.data);
fs.writeFileSync('assets/images/logo/logo-horizontal-transparent.png', outPng);
console.log('Successfully created assets/images/logo/logo-horizontal-transparent.png (dim: ' + img.w + 'x' + img.h + ', bytes: ' + outPng.length + ')');
