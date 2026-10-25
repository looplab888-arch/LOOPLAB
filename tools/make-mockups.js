/** Laptop and desktop adaptation of the supplied AllInOrder mockup renderer.
 * Run: node tools/make-mockups.js [input.png] [output-directory]
 * Uses the original PNG codec and rounded rectangle coverage, with new frames.
 * Input: non-interlaced, 8-bit PNG. No dependencies or browser required.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
const CHANNELS = { 0: 1, 2: 3, 4: 2, 6: 4 };

function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG');

  let pos = 8;
  let width = 0;
  let height = 0;
  let depth = 0;
  let colorType = 0;
  const idat = [];

  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + length);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      depth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error('interlaced PNGs are not supported');
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }

    pos += 12 + length;
  }

  if (depth !== 8) throw new Error(`unsupported bit depth ${depth}`);
  const channels = CHANNELS[colorType];
  if (!channels) throw new Error(`unsupported colour type ${colorType}`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(width * height * 4);
  const line = Buffer.alloc(stride);
  const prev = Buffer.alloc(stride);
  prev.fill(0);

  let src = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[src++];
    raw.copy(line, 0, src, src + stride);
    src += stride;

    // Undo the per-scanline filter. See PNG spec section 9.
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? line[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let value = line[i];

      if (filter === 1) value += a;
      else if (filter === 2) value += b;
      else if (filter === 3) value += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        value += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      line[i] = value & 0xff;
    }

    for (let x = 0; x < width; x++) {
      const s = x * channels;
      const d = (y * width + x) * 4;
      if (colorType === 6) {
        out[d] = line[s];
        out[d + 1] = line[s + 1];
        out[d + 2] = line[s + 2];
        out[d + 3] = line[s + 3];
      } else if (colorType === 2) {
        out[d] = line[s];
        out[d + 1] = line[s + 1];
        out[d + 2] = line[s + 2];
        out[d + 3] = 255;
      } else if (colorType === 0) {
        out[d] = out[d + 1] = out[d + 2] = line[s];
        out[d + 3] = 255;
      } else {
        out[d] = out[d + 1] = out[d + 2] = line[s];
        out[d + 3] = line[s + 1];
      }
    }

    line.copy(prev);
  }

  return { width, height, data: out };
}

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePNG(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------------ */
/* Framing                                                             */
/* ------------------------------------------------------------------ */

/** Coverage of a rounded rectangle at a point, anti-aliased over ~1px. */
function roundRectCoverage(x, y, left, top, right, bottom, radius) {
  const cx = Math.min(Math.max(x, left + radius), right - radius);
  const cy = Math.min(Math.max(y, top + radius), bottom - radius);
  const d = Math.hypot(x - cx, y - cy);
  return Math.max(0, Math.min(1, radius - d + 0.5));
}

function device(shot, kind) {
  const sw = shot.width;
  const sh = shot.height;
  const pad = 120;
  const bezel = 22;
  const top = 70;
  const left = pad + 60;
  const width = sw + left * 2;
  const height = sh + (kind === 'desktop' ? 390 : 230);
  const data = Buffer.alloc(width * height * 4);

  function rect(l, t, r, b, radius, color) {
    for (let y = Math.max(0, Math.floor(t)); y < Math.min(height, b); y++) {
      for (let x = Math.max(0, Math.floor(l)); x < Math.min(width, r); x++) {
        const a = roundRectCoverage(x + .5, y + .5, l, t, r, b, radius);
        const i = (y * width + x) * 4;
        for (let c = 0; c < 3; c++) data[i + c] = Math.round(color[c] * a + data[i + c] * (1 - a));
        data[i + 3] = 255;
      }
    }
  }

  // A quiet lavender studio backdrop keeps the frame readable in both themes.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const light = 1 - Math.min(1, Math.hypot((x-width*.5)/width, y/height));
      data[i] = 235 + Math.round(light * 12);
      data[i+1] = 227 + Math.round(light * 14);
      data[i+2] = 244 + Math.round(light * 9);
      data[i+3] = 255;
    }
  }
  const bottom = top + sh + bezel * 2;
  rect(left-18, top+24, left+sw+bezel*2+18, bottom+28, 38, [216,204,227]);
  if (kind === 'desktop') {
    rect(width/2-90, bottom-8, width/2+90, bottom+162, 18, [166,163,177]);
    rect(width/2-245, bottom+148, width/2+245, bottom+178, 14, [194,192,205]);
  }
  rect(left-3, top-3, left+sw+bezel*2+3, bottom+3, 30, [117,110,130]);
  rect(left, top, left+sw+bezel*2, bottom, 27, [24,18,32]);
  // Preserve source pixels exactly, with no stretch, crop or inset screen padding.
  for (let y=0; y<sh; y++) {
    shot.data.copy(data, ((top+bezel+y)*width+left+bezel)*4, y*sw*4, (y+1)*sw*4);
  }
  rect(width/2-4, top+7, width/2+4, top+15, 4, [82,94,109]);
  if (kind === 'laptop') {
    rect(left-70, bottom-1, left+sw+bezel*2+70, bottom+24, 8, [195,192,206]);
    rect(left-58, bottom+20, left+sw+bezel*2+58, bottom+37, 12, [138,133,151]);
    rect(width/2-110, bottom-1, width/2+110, bottom+10, 5, [128,122,142]);
  }
  return { width, height, data };
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.resolve(process.argv[2] || path.join(root, 'docs/mockups/raw/home.png'));
const output = path.resolve(process.argv[3] || path.join(root, 'docs/mockups'));
const shot = decodePNG(fs.readFileSync(input));
fs.mkdirSync(output, { recursive: true });
for (const kind of ['laptop', 'desktop']) {
  const mockup = device(shot, kind);
  const destination = path.join(output, `looplab-${kind}.png`);
  fs.writeFileSync(destination, encodePNG(mockup.width, mockup.height, mockup.data));
  console.log(`${destination}: ${mockup.width}x${mockup.height}`);
}

