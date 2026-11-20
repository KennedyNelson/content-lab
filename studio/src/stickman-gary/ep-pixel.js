// 2026-11-20 IG reel "Kalu interrupted by a call" in PIXEL ART (16-bit look): low-res 180x320 canvas scaled x6, integer positions only.
// Non-explicit: blanket + flying clothes + censored (pixelated) site thumbnails. Ends with a Windows-XP-style error popup + library SFX.
import { bind as bindT, label, captions, groupWords } from '../toon/toon.js';
const META = await (await fetch('/data/meta.json')).json();
const ENVS = await (await fetch('/data/env.json')).json();
export const DUR = META.dur;
let c, g, low, groups = [], WD = [];
const LW = 180, LH = 320;
const KEYS = /(बहन|लंड|चैन|मुट्ठी|पंद्रह|सौ|रुपये|भेज|खड़ा|चलेगा)/;
export function init(cx, w) { c = cx; bindT(c); WD = w; groups = groupWords(w); low = document.createElement('canvas'); low.width = LW; low.height = LH; g = low.getContext('2d'); g.imageSmoothingEnabled = false }
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, u) => a + (b - a) * u, pr = (t, a, b) => clamp((t - a) / (b - a));
const R = Math.round;
const px = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(R(x), R(y), R(w) || 1, R(h) || 1) };
const env = (k, t) => { const a = ENVS[k], i = Math.floor(t * 30); return a && i >= 0 && i < a.length ? a[i] : 0 };
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const dith = (x, y, k) => k * 16 > BAYER[(y & 3) * 4 + (x & 3)];
// ---------- palette ----------
const P = { ink: '#120d1f', wall1: '#2b2152', wall2: '#34296a', head1: '#4a3f86', head2: '#5d519f', floor: '#3a2a45', floor2: '#2e2138', rug: '#7a3b4f', rug2: '#5c2c3d',
  bl1: '#2f9e7a', bl2: '#1f7a5e', bl3: '#58c9a4', skin: '#8a5530', skinD: '#63391f', skinL: '#a46c3e', hair: '#17110e', tee: '#d8452b', teeD: '#a8321f', shorts: '#2a4d8f',
  white: '#f2efe9', moon: '#f5ecc2', cyan: '#6fe6ff', red: '#d92b3a', green: '#2fc65a', sweat: '#7fd0f5', wood: '#5a3a2a', wood2: '#46291c', fSkin: '#d29a6a', fSkinD: '#a8724a', fHair: '#3a2416' };
// ---------- 3x5 bitmap font ----------
const F = { A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', F: '111100110100100', G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010', K: '101101110101101', L: '100100100100111', M: '101111111101101', N: '110101101101101', O: '010101101101010', P: '110101110100100', Q: '010101101111011', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010', W: '101101111111101', X: '101101010101101', Y: '101101010010010', Z: '111001010100111',
  0: '111101101101111', 1: '010110010010111', 2: '110001010100111', 3: '110001010001110', 4: '101101111001001', 5: '111100110001110', 6: '011100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001110', '.': '000000000000010', '+': '000010111010000', '!': '010010010000010', ':': '000010000010000', '-': '000000111000000', ' ': '000000000000000' };
function txt(s, x, y, col, k = 1, ink) {
  s = s.toUpperCase(); const w = s.length * 4 * k;
  if (ink) { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) drawT(s, x + dx, y + dy, ink, k) }
  drawT(s, x, y, col, k); return w;
}
function drawT(s, x, y, col, k) { for (let i = 0; i < s.length; i++) { const gl = F[s[i]] || F[' ']; for (let j = 0; j < 15; j++) if (gl[j] === '1') px(x + i * 4 * k + (j % 3) * k, y + Math.floor(j / 3) * k, k, k, col) } }
const txtC = (s, cx, y, col, k = 1, ink) => txt(s, cx - R(s.length * 4 * k / 2) + k / 2, y, col, k, ink);
// ---------- shape helpers ----------
function ell(cx, cy, rx, ry, col) { for (let y = -ry; y <= ry; y++) { const w = Math.floor(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry + .01)))); px(cx - w, cy + y, 2 * w + 1, 1, col) } }
function sweat(x, y, k = 1) { px(x, y, k, k, P.sweat); px(x - k, y + k, 3 * k, 2 * k, P.sweat); px(x, y + 3 * k, k, k, P.sweat) }
// ---------- heads (front view). u = pixel unit ----------
function head(who, cx, cy, u, o = {}) {
  const sk = who === 'k' ? P.skin : P.fSkin, skD = who === 'k' ? P.skinD : P.fSkinD, hr = who === 'k' ? P.hair : P.fHair;
  const rot = o.tilt || 0; // whole-pixel shear
  if (who === 'k') { // afro behind face
    ell(cx, cy - 2 * u, R(6.4 * u), R(5.6 * u), P.ink); ell(cx, cy - 2 * u, R(6 * u) - 1, R(5.2 * u) - 1, hr);
    for (let i = 0; i < 5; i++) px(cx - 4 * u + i * 2 * u, cy - 7 * u + (i % 2) * u, u, u, '#2a2018');
  } else { ell(cx, cy - u, R(5.6 * u), R(5 * u), P.ink); ell(cx, cy - u, R(5.3 * u) - 1, R(4.7 * u) - 1, hr) }
  ell(cx - R(5 * u), cy + u, R(.9 * u), R(1.3 * u), sk); ell(cx + R(5 * u), cy + u, R(.9 * u), R(1.3 * u), skD);
  ell(cx, cy + R(.6 * u), R(5 * u) + 1, R(4.9 * u) + 1, P.ink); ell(cx, cy + R(.6 * u), R(5 * u), R(4.9 * u), sk);
  // lower shade
  for (let y = 2 * u; y < 4.9 * u; y++) { const w = Math.floor(5 * u * Math.sqrt(1 - ((y - .6 * u) / (4.9 * u)) ** 2)); px(cx + w - Math.max(1, R(u * .7)), cy + R(.6 * u) + R(y - 2 * u) - R(.6 * u) + 2 * u - 2 * u, Math.max(1, R(u * .7)), 1, skD) }
  if (who === 'k') { // hairline over forehead (clear forehead)
    ell(cx, cy - R(4.2 * u), R(4.9 * u), R(1.5 * u), hr); }
  else { px(cx - R(4.6 * u), cy - R(4.4 * u), R(9.2 * u), R(1.6 * u), hr); px(cx - R(4.6 * u), cy - R(3 * u), R(2 * u), R(1.5 * u), hr) }
  // eyes
  const ex = R(2.1 * u), ey = cy - R(.9 * u), e = Math.max(3, R(2.2 * u)), lid = o.lid || 0, look = o.look || [0, 0];
  for (const q of [-1, 1]) {
    const X = cx + q * ex - R(e / 2);
    px(X - 1, ey - 1, e + 2, e + 2, P.ink); px(X, ey, e, e, P.white);
    const pw = Math.max(2, R(e / 2)); px(X + R((e - pw) / 2 + look[0] * e * .25), ey + R((e - pw) / 2 + look[1] * e * .25), pw, pw, P.ink);
    if (lid > 0) { const lh = Math.ceil(e * lid); px(X, ey, e, lh, sk); px(X - 1, ey + lh - 1, e + 2, 1, P.ink) }
    if (who === 'f') { px(X - 2, ey - 2, e + 4, 1, P.ink); px(X - 2, ey + e + 1, e + 4, 1, P.ink); px(X - 2, ey - 2, 1, e + 4, P.ink); px(X + e + 1, ey - 2, 1, e + 4, P.ink) }
    // brows
    const br = o.brow || 0, bw = Math.max(3, R(2.6 * u)), by = ey - Math.max(2, R(.9 * u));
    for (let i = 0; i < bw; i++) { const inner = q > 0 ? i : bw - 1 - i; px(X - 1 + (q > 0 ? i : i), by - Math.floor(inner * (br < 0 ? -1 : 1) * Math.abs(br) * .6) - (br > 0 ? 0 : 0), 1, Math.max(1, R(u * .55)), P.ink) }
  }
  // nose
  px(cx - 1, cy + R(.6 * u), Math.max(2, R(u)), Math.max(2, R(.8 * u)), skD);
  // mouth
  const my = cy + R(2.8 * u), m = o.mouth || 'flat', op = o.open || 0, mw = R(3 * u);
  if (m === 'open' && op > .08) { const h = Math.max(2, R(2.2 * u * op)); px(cx - R(mw / 2) - 1, my - 1, mw + 2, h + 2, P.ink); px(cx - R(mw / 2), my, mw, h, '#6e1f2a'); if (h > 3) px(cx - R(mw / 2) + 1, my, mw - 2, 1, P.white) }
  else if (m === 'smile') { px(cx - R(mw / 2), my, mw, 1, P.ink); px(cx - R(mw / 2) - 1, my - 1, 1, 1, P.ink); px(cx + R(mw / 2), my - 1, 1, 1, P.ink) }
  else { px(cx - R(mw / 2), my, mw, Math.max(1, R(u * .4)), P.ink) }
  if (o.sweat) sweat(cx + R(4.6 * u), cy - R(2.6 * u), Math.max(1, R(u / 3)));
}
// ---------- room ----------
function room(t, glow) {
  for (let y = 0; y < LH; y++) px(0, y, LW, 1, P.wall1);
  for (let y = 100; y < 230; y++) for (let x = 0; x < LW; x++) if (dith(x, y, pr(y, 100, 200))) px(x, y, 1, 1, P.wall2);
  px(14, 36, 40, 54, P.ink); px(16, 38, 36, 50, '#16123a'); ell(40, 52, 7, 7, P.moon); ell(44, 50, 6, 6, '#16123a'); px(33, 38, 2, 50, P.ink); for (const [sx, sy] of [[22, 46], [24, 70], [30, 80]]) px(sx, sy, 1, 1, P.white);
  px(124, 60, 36, 40, P.ink); px(126, 62, 32, 36, '#3a3158');
  px(30, 100, 120, 70, P.ink); px(32, 102, 116, 68, P.head1); px(36, 108, 108, 62, P.head2);
  for (let y = 0; y < 90; y++) for (let x = 0; x < LW; x++) if (dith(x, y, 0)) px(x, y, 1, 1, P.wall1);
  px(0, 232, LW, 100, P.floor); for (let y = 232; y < LH; y += 2) for (let x = (y / 2) % 2 * 8; x < LW; x += 16) px(x, y, 8, 1, P.floor2);
  px(24, 262, 132, 34, P.rug); px(24, 262, 132, 2, P.rug2); px(24, 294, 132, 2, P.rug2);
  if (glow) for (let y = 70; y < 150; y++) for (let x = 40; x < 140; x++) { const d = Math.hypot(x - 90, (y - 118) * 1.2); if (d < 46 && dith(x, y, glow * (1 - d / 46))) px(x, y, 1, 1, P.cyan) }
}
function pillows() { px(40, 142, 40, 16, P.ink); px(41, 143, 38, 14, '#d9d4e8'); px(100, 142, 40, 16, P.ink); px(101, 143, 38, 14, '#cfc9e0') }
function bed(lump) {
  const y = 160 + lump; px(10, y - 1, 160, 76, P.ink); px(11, y, 158, 74, P.bl1); px(11, y, 158, 3, P.bl3);
  for (let i = 0; i < 6; i++) px(30 + i * 24, y + 22 + (i % 2) * 14, 4, 4, P.bl3);
  for (let x = 11; x < 169; x++) if (x % 4 < 2) px(x, y + 40, 1, 1, P.bl2); px(11, y + 70, 158, 4, P.bl2);
  px(6, 232, 168, 10, P.wood); px(6, 232, 168, 2, P.wood2);
}
function stand(buzz, t) {
  px(142, 168, 38, 6, P.ink); px(143, 168, 36, 4, P.wood); px(146, 174, 4, 70, P.wood2); px(170, 174, 4, 70, P.wood2);
  px(150, 157, 22, 10, '#58a7e0'); px(150, 157, 22, 1, '#8cc8ee'); px(158, 152, 6, 5, P.white);
  if (!buzz) { px(166, 164, 10, 4, '#111') }
}
// ---------- Kalu (side view) walking ----------
function kaluSide(x, y, step, flip) { // feet at y
  const s = flip ? -1 : 1, X = (dx, w) => flip ? x - dx - w : x + dx;
  const lf = step % 4, legA = [0, 2, 0, -2][lf], legB = [0, -2, 0, 2][lf], bob = (lf % 2) ? 1 : 0;
  px(X(-3, 3) + legA * s, y - 8 + bob - bob, 3, 8 - 1, P.skin); px(X(-3, 5) + legA * s - 1, y - 1, 5, 2, P.white);
  px(X(1, 3) + legB * s, y - 8, 3, 7, P.skinD); px(X(1, 5) + legB * s - 1, y - 1, 5, 2, '#d8d4cc');
  px(X(-4, 9), y - 14 - bob, 9, 7, P.shorts);
  px(X(-4, 9), y - 25 - bob, 9, 12, P.tee); px(X(-4, 2), y - 25 - bob, 2, 12, P.teeD);
  px(X(-6, 3) + (legB * s), y - 23 - bob, 3, 9, P.skin);
  ell(x, y - 33 - bob, 5, 5, P.ink); ell(x, y - 33 - bob, 4, 4, P.hair); px(X(-1, 6), y - 33 - bob, 5, 5, P.skin); px(X(3, 1), y - 31 - bob, 1, 1, P.white); px(X(3, 1), y - 31 - bob, 1, 1, P.ink);
}
function flung(t, t0) {
  const it = (a, kind, dx, spin) => { const u = t - a; if (u < 0 || u > 1.0) return; const x = R(90 + dx * u * 70), y = R(165 - 190 * u + 215 * u * u); const f = Math.floor(u * 10) % 2;
    if (kind === 's') { px(x - 8, y, 16, 8, P.ink); px(x - 7, y + 1, 14, 6, P.shorts); px(x - 7 + f, y + 6, 5, 4, P.shorts); px(x + 2 - f, y + 6, 5, 4, P.shorts) }
    else { px(x - 7, y, 14, 7, P.ink); px(x - 6, y + 1, 12, 5, P.white); px(x - 6, y + 1, 12, 2, P.red); px(x - 2, y + 6, 4, 2, P.white) } };
  it(t0 + .15, 's', -1.2, 1); it(t0 + .5, 'b', 1.3, -1);
}
// ---------- phone screens ----------
function siteScreen(t, x, y, w, h) {
  px(x - 2, y - 2, w + 4, h + 4, P.ink); px(x, y, w, h, P.white); px(x, y, w, 7, '#e0e0e8'); px(x + 2, y + 1, w - 14, 5, P.white); txt('MALLUBHABHIKEBADE.COM', x + 3, y + 1, '#555', 1);
  px(x, y + 7, w, 24, '#d10f4f'); txtC('MALLUBHABHIKEBADE', x + w / 2, y + 10, P.white, 1); txtC('CHUUCHE.COM', x + w / 2, y + 18, '#ffe27a', 2);
  const cw = R((w - 6) / 2); for (let i = 0; i < 6; i++) { const tx = x + 2 + (i % 2) * (cw + 2), ty = y + 34 + Math.floor(i / 2) * 31;
    for (let by = 0; by < 6; by++) for (let bx = 0; bx < 6; bx++) px(tx + bx * R(cw / 6), ty + by * 5, R(cw / 6) + 1, 5, ['#c97f5a', '#f2c3a0', '#a85c3c', '#e8a07a'][(bx * 7 + by * 3 + i * 5) % 4]);
    px(tx, ty + 11, cw, 8, P.ink); txtC('CENSORED', tx + cw / 2, ty + 12, P.white, 1); px(tx + 1, ty + 1, 11, 7, P.red); txt('18+', tx + 1, ty + 2, P.white, 1) }
}
function callScreen(t, x, y, w, h) {
  px(x - 2, y - 2, w + 4, h + 4, P.ink); px(x, y, w, h, '#1a2233'); txtC('INCOMING CALL', x + w / 2, y + 10, '#9fb0cc', 1);
  const p = Math.floor(t * 6) % 2; ell(x + w / 2, y + 40, 15 + p, 15 + p, '#4b5a7a'); txtC('D', x + w / 2, y + 36, P.white, 2);
  txtC('DOST', x + w / 2, y + 66, P.white, 2); txtC('MOBILE', x + w / 2, y + 78, '#9fb0cc', 1);
  ell(x + 14, y + h - 18, 9, 9, P.red); px(x + 10, y + h - 19, 9, 2, P.white); ell(x + w - 14, y + h - 18, 9, 9, P.green); px(x + w - 18, y + h - 20, 8, 5, P.white);
}
function handAround(x, y, w, h) { px(x + w - 1, y + 14, 8, 6, P.skin); px(x + w - 1, y + 24, 8, 6, P.skin); px(x + w - 1, y + 34, 8, 6, P.skin); px(x + w - 1, y + 44, 8, 6, P.skin); px(x - 5, y + 30, 7, 14, P.skinL);
  px(x + 10, y + h, w - 22, 90, P.tee); px(x + 10, y + h, 3, 90, P.teeD); px(x + 14, y + h - 12, w - 30, 14, P.skin) }
// ---------- shots ----------
const SH = []; const shot = (a, b, fn) => SH.push([a, b, fn]);
const [B0, B1] = META.buzz, I0 = META.intro, LN = META.lines;
const mouthOf = (k, t) => { const a = env(k, t); return a > .08 ? { mouth: 'open', open: Math.min(1, a * 1.15) } : { mouth: 'flat' } };
const pop = (t, a) => (t - a < .1 ? 1 : 0);
const bg = (col) => px(0, 0, LW, LH, col);
// 1 walk
const spr = document.createElement('canvas'); spr.width = 40; spr.height = 50; const sg = spr.getContext('2d'); sg.imageSmoothingEnabled = false;
shot(0, 1.5, (t, a) => { room(t); stand(0, t); bed(0); pillows(); const x = R(lerp(-14, 80, pr(t, a, 1.45)));
  const gg = g; g = sg; g.clearRect(0, 0, 40, 50); kaluSide(20, 46, Math.floor((t - a) * 9), false); g = gg; g.imageSmoothingEnabled = false; g.drawImage(spr, x - 20, 262 - 100, 80, 100) });
// 2 jump onto bed + grab phone
shot(1.5, 2.8, (t, a) => { room(t); stand(0, t); pillows(); const u = pr(t, a, a + .3), g2 = pr(t, a + .5, a + 1.0); const dy = u < 1 ? -R(Math.sin(u * Math.PI) * 18) : 0;
  head('k', 90, 120 + dy + (u < 1 ? 20 * (1 - u) : 0), 3, { mouth: 'smile', look: [g2 * 1.5, 0] }); px(72, 142 + dy, 36, 24, P.tee); px(72, 142 + dy, 4, 24, P.teeD);
  const ax = R(lerp(112, 146, g2)), ay = R(lerp(152, 146, g2)); px(108, 148, ax - 108 + 3, 5, P.tee); px(ax, ay - 1, 6, 6, P.skin);
  bed(0); if (g2 < 1) px(166, 164, 10, 4, '#111') });
// 3 phone screen held in hand (1.05 s so the name reads)
shot(2.8, 3.85, (t, a) => { bg('#12101c'); siteScreen(t, 38, 58, 104, 190); handAround(38, 58, 104, 190) });
// 4 intro jingle: clothes fly
const lidAt = (t) => { const u = pr(t, I0 + .5, B0 - .05); return .8 * u * u * (3 - 2 * u) };
const relax = (t) => ({ lid: lidAt(t), brow: 1, mouth: 'smile', look: [0, .6], sweat: t > I0 + .6 });
shot(I0, I0 + .95, (t, a) => { room(t, .25); stand(1, t); pillows(); head('k', 90, 118, 3, relax(t)); px(72, 142, 36, 24, P.tee); px(72, 142, 4, 24, P.teeD); bed(R(Math.sin(t * 16) * 1.4)); flung(t, I0) });
shot(I0 + .95, I0 + 1.9, (t, a) => { bg('#2c2548'); for (let y = 90; y < 250; y++) for (let x = 20; x < 160; x++) { const d = Math.hypot(x - 90, (y - 160) * 1.1); if (d < 70 && dith(x, y, .55 * (1 - d / 70))) px(x, y, 1, 1, P.cyan) } head('k', 90, 160, 9, relax(t)) });
shot(I0 + 1.9, B0, (t, a) => { bg('#2c2548'); for (let y = 90; y < 250; y++) for (let x = 20; x < 160; x++) { const d = Math.hypot(x - 90, (y - 165) * 1.1); if (d < 78 && dith(x, y, .5 * (1 - d / 78))) px(x, y, 1, 1, P.cyan) } head('k', 90, 165 + R(pr(t, a, B0) * 3), 11, relax(t)) });
// 5 call arrives: phone in his hand, scared face behind
shot(B0, B1, (t, a) => { bg('#12101c'); head('k', 90, 38, 4, { brow: 1, mouth: 'flat', look: [0, .8], sweat: 1 }); const sh = Math.floor(t * 12) % 2 ? 1 : -1; callScreen(t, 38 + sh, 80, 104, 190); handAround(38 + sh, 80, 104, 190) });
// 6 disappointed stare
shot(B1, LN[0][1], (t, a) => { bg('#2c2548'); head('k', 90, 160, 9, { lid: .5, brow: 1, look: [.6, .4], mouth: 'flat', sweat: 1 }) });
// 7 L1
shot(LN[0][1], LN[1][1] - .0, (t, a) => { bg('#2c2548'); const e = env('k', t); head('k', 84 + (e > .5 ? 1 : 0), 160, 9, { lid: .3, brow: -1, look: [.4, .3], sweat: 1, ...mouthOf('k', t) }); px(140, 150, 12, 26, P.ink); px(141, 151, 10, 24, P.green) });
// 8 friend
shot(LN[1][1], LN[1][1] + 1.4, (t, a) => { bg('#e0b84c'); for (let x = 0; x < LW; x += 24) px(x, 0, 8, LH, '#cfa83e'); head('f', 96, 160, 9, { brow: 0, look: [-.4, .2], ...mouthOf('f', t) }); px(22, 156, 12, 26, P.ink); px(23, 157, 10, 24, P.green) });
// 9 reaction
shot(LN[1][1] + 1.4, LN[2][1], (t, a) => { bg('#2c2548'); head('k', 90, 165, 11, { lid: .55, brow: 1, look: [.7, 0], mouth: 'flat' }) });
// 10 punchline
shot(LN[2][1], META.end, (t, a) => { bg('#2c2548'); head('k', 90, 165, 12, { lid: .4, brow: -.7, look: [0, .1], ...mouthOf('k', t) }) });
// 11 Windows-XP style error popup (library SFX)
function xp(t) {
  bg('#2c2548'); head('k', 90, 165, 12, { lid: .5, brow: 1, look: [0, 0], mouth: 'flat' });
  const x = 18, y = 110, w = 144, h = 78, sh = Math.floor((t - META.end) * 20) % 2 ? 1 : 0; const ox = x + sh;
  px(ox - 1, y - 1, w + 2, h + 2, P.ink); px(ox, y, w, h, '#c0c0c0'); px(ox, y, w, 10, '#0a3fa8'); px(ox + w - 10, y + 1, 8, 8, '#d9402b'); txt('ERROR', ox + 3, y + 3, P.white, 1);
  ell(ox + 16, y + 34, 8, 8, P.red); txt('X', ox + 13, y + 31, P.white, 1);
  txt('DOST.EXE HAS', ox + 30, y + 24, '#111', 1); txt('STOPPED WORKING', ox + 30, y + 32, '#111', 1);
  px(ox + w / 2 - 14, y + h - 18, 28, 12, '#e8e8e8'); px(ox + w / 2 - 14, y + h - 18, 28, 1, P.white); px(ox + w / 2 - 14, y + h - 7, 28, 1, '#555'); txt('OK', ox + w / 2 - 4, y + h - 15, '#111', 1);
}
shot(META.end, 99, (t, a) => xp(t));
export function draw(t) {
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#12101c'; c.fillRect(0, 0, 1080, 1920); c.restore();
  g.imageSmoothingEnabled = false; g.clearRect(0, 0, LW, LH);
  let s = null; for (const q of SH) if (t >= q[0] && t < q[1]) s = q; if (!s) for (const q of SH) if (q[0] <= t) s = q;
  s[2](t, s[0]);
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.imageSmoothingEnabled = false; c.drawImage(low, 0, 0, 1080, 1920); c.restore();
  label([['दोस्त वही जो ', '#111'], ['सही टाइम', '#D7261E'], [' पर गलत कॉल करे', '#111']], 540, 250, 52);
  captions(groups, t, KEYS, 1700);
}
export const cues = [];
