// 2026-11-20 IG reel "Kalu interrupted by a call" in COMIC ART: heavy ink, flat print colours, Ben-Day halftone, cream paper, sound words.
// Non-explicit: blanket + flying clothes + censored thumbnails. Ends on a reaction + library SFX ("faaah") with a sound-word burst.
import { bind as bindT, label, captions, groupWords } from '../toon/toon.js';
const META = await (await fetch('/data/meta.json')).json();
const ENVS = await (await fetch('/data/env.json')).json();
export const DUR = META.dur;
let c, groups = [], WD = [];
const W = 1080, H = 1920;
const KEYS = /(बहन|लंड|चैन|मुट्ठी|पंद्रह|सौ|रुपये|भेज|खड़ा|चलेगा)/;
export function init(cx, w) { c = cx; bindT(c); WD = w; const rest = w.filter(q => q.line !== 2), L3 = w.filter(q => q.line === 2); groups = groupWords(rest); if (L3.length) groups.push({ txt: L3.map(q => q.w.replace(/[,]/g, '')).join(' '), s: L3[0].s, e: L3[L3.length - 1].e + .25 }) }
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, u) => a + (b - a) * u, pr = (t, a, b) => clamp((t - a) / (b - a));
const back = (u) => { const s = 1.8; u = clamp(u) - 1; return u * u * ((s + 1) * u + s) + 1 };
const env = (k, t) => { const a = ENVS[k], i = Math.floor(t * 30); return a && i >= 0 && i < a.length ? a[i] : 0 };
const P = { paper: '#f4e8c8', ink: '#15110f', skin: '#8a5530', skinS: '#5a3319', hair: '#1d1612', tee: '#e0452b', shorts: '#2b56a8', yellow: '#ffd23a', pink: '#e8336f', teal: '#3aa6a0', tealD: '#2a7f7b',
  blanket: '#2f9e7a', blanketD: '#1f6e55', purple: '#4b3a8a', white: '#fffaf0', red: '#d92b3a', green: '#2fc65a', cyan: '#4fd6ee', wood: '#8a5a3a', floor: '#d79a5b', fSkin: '#d29a6a', fSkinS: '#a8724a', fHair: '#3a2416' };
// ---------- primitives ----------
const LW = 10;
function stroke(w = LW) { c.lineWidth = w; c.strokeStyle = P.ink; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke() }
function ell(cx, cy, rx, ry, fill, lw = LW, rot = 0) { c.beginPath(); c.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), rot, 0, 7); if (fill) { c.fillStyle = fill; c.fill() } if (lw) stroke(lw) }
function rr(x, y, w, h, r, fill, lw = LW) { c.beginPath(); c.roundRect(x, y, w, h, r); if (fill) { c.fillStyle = fill; c.fill() } if (lw) stroke(lw) }
function poly(pts, fill, lw = LW) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); if (fill) { c.fillStyle = fill; c.fill() } if (lw) stroke(lw) }
function ln(x1, y1, x2, y2, w = LW, col = P.ink) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineWidth = w; c.strokeStyle = col; c.lineCap = 'round'; c.stroke() }
// Ben-Day dots inside the current clip, density grows along dir
function dots(col, x0, y0, x1, y1, step, maxR, dir = [.6, .8]) {
  c.fillStyle = col; const d0 = x0 * dir[0] + y0 * dir[1], d1 = x1 * dir[0] + y1 * dir[1];
  for (let y = y0, r = 0; y < y1 + step; y += step * .87, r++) for (let x = x0 + (r % 2 ? step / 2 : 0); x < x1 + step; x += step) {
    const k = clamp((x * dir[0] + y * dir[1] - d0) / (d1 - d0)); if (k < .05) continue; c.beginPath(); c.arc(x, y, maxR * k, 0, 7); c.fill() }
}
function clipDots(pathFn, col, x0, y0, x1, y1, step, maxR, dir) { c.save(); pathFn(); c.clip(); dots(col, x0, y0, x1, y1, step, maxR, dir); c.restore() }
function rays(cx, cy, n, c1, c2, rot = 0) {
  for (let i = 0; i < n; i++) { const a0 = rot + i / n * Math.PI * 2, a1 = rot + (i + .5) / n * Math.PI * 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + 2400 * Math.cos(a0), cy + 2400 * Math.sin(a0)); c.lineTo(cx + 2400 * Math.cos(a1), cy + 2400 * Math.sin(a1)); c.closePath(); c.fillStyle = i % 2 ? c1 : c2; c.fill() }
}
function bgFlat(col, dotCol, step = 34, maxR = 11) { c.fillStyle = col; c.fillRect(0, 0, W, H); if (dotCol) dots(dotCol, 0, 0, W, H, step, maxR, [-.3, 1]) }
function burst(cx, cy, r1, r2, n, fill, rot = 0) { c.beginPath(); for (let i = 0; i < n * 2; i++) { const a = rot + i / (n * 2) * Math.PI * 2, r = i % 2 ? r1 : r2; c.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a)) } c.closePath(); c.fillStyle = fill; c.fill(); stroke(LW) }
// pop-in sound word with a starburst
function sound(s, x, y, size, rot, t0, t, hold = 1.2, fill = P.yellow, col = P.red) {
  const u = t - t0; if (u < 0 || u > hold) return; const z = back(clamp(u / .14)) * (1 + .03 * Math.sin(u * 40));
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(z, z); burst(0, 0, size * .55, size * .9, 11, fill, 0);
  c.font = `900 ${size}px Inter`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * .2; c.strokeStyle = P.ink; c.strokeText(s, 0, 0); c.fillStyle = col; c.fillText(s, 0, 0); c.restore();
}
function txtI(s, x, y, size, col = P.white, ink = P.ink, align = 'center', wt = 900) { c.save(); c.font = `${wt} ${size}px Inter`; c.textAlign = align; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * .2; c.strokeStyle = ink; if (ink) c.strokeText(s, x, y); c.fillStyle = col; c.fillText(s, x, y); c.restore() }
// ---------- head (front view). R = face radius in px ----------
function head(who, cx, cy, R, o = {}) {
  const k = who === 'k', sk = k ? P.skin : P.fSkin, skS = k ? P.skinS : P.fSkinS, hr = k ? P.hair : P.fHair, lw = Math.max(6, R * .035);
  c.save(); if (o.tilt) { c.translate(cx, cy); c.rotate(o.tilt); c.translate(-cx, -cy) }
  if (k) { ell(cx, cy - .32 * R, 1.13 * R, .98 * R, hr, lw); for (let i = 0; i < 5; i++) { const a = -2.5 + i * .5; ell(cx + Math.cos(a) * .85 * R, cy - .32 * R + Math.sin(a) * .72 * R, .09 * R, .05 * R, '#3a2c22', 0, a) } }
  else { // spiky hair
    poly([[cx - .95 * R, cy - .3 * R], [cx - .85 * R, cy - 1.15 * R], [cx - .45 * R, cy - .85 * R], [cx - .2 * R, cy - 1.3 * R], [cx + .15 * R, cy - .88 * R], [cx + .5 * R, cy - 1.25 * R], [cx + .62 * R, cy - .8 * R], [cx + .98 * R, cy - 1.0 * R], [cx + .95 * R, cy - .2 * R]], hr, lw) }
  ell(cx - .97 * R, cy + .12 * R, .17 * R, .22 * R, sk, lw); ell(cx + .97 * R, cy + .12 * R, .17 * R, .22 * R, sk, lw);
  const face = () => { c.beginPath(); c.ellipse(cx, cy + .05 * R, .95 * R, R, 0, 0, 7) };
  face(); c.fillStyle = sk; c.fill();
  clipDots(face, skS, cx - R, cy - R, cx + R, cy + 1.05 * R, R * .075, R * .035, [.55, .83]);
  c.save(); face(); c.clip(); c.fillStyle = hr; c.beginPath(); c.ellipse(cx, cy - .98 * R, 1.05 * R, .36 * R, 0, 0, 7); c.fill(); c.restore();
  face(); stroke(lw);
  const ex = .4 * R, ey = cy - .1 * R, ew = .21 * R, eh = .18 * R, lid = o.lid || 0, look = o.look || [0, 0];
  for (const q of [-1, 1]) {
    const X = cx + q * ex; ell(X, ey, ew, eh, P.white, lw * .8);
    c.save(); c.beginPath(); c.ellipse(X, ey, ew, eh, 0, 0, 7); c.clip(); ell(X + look[0] * ew * .55, ey + look[1] * eh * .5, .085 * R, .085 * R, P.ink, 0); ell(X + look[0] * ew * .55 - .03 * R, ey + look[1] * eh * .5 - .03 * R, .025 * R, .025 * R, P.white, 0);
    if (lid > 0) { c.fillStyle = sk; c.fillRect(X - ew - 4, ey - eh - 4, 2 * ew + 8, 2 * eh * lid + 4); ln(X - ew, ey - eh + 2 * eh * lid, X + ew, ey - eh + 2 * eh * lid, lw * .8) } c.restore();
    if (!k) { ell(X, ey, ew * 1.35, eh * 1.45, null, lw * .7) }
    const br = q < 0 ? (o.brL ?? o.brow ?? 0) : (o.brR ?? o.brow ?? 0), by = ey - eh - .15 * R - (o.browUp || 0) * .0 ;
    const inY = by - br * .13 * R, outY = by + br * .05 * R + (br < 0 ? br * .05 * R : 0);
    ln(X - q * .24 * R, inY, X + q * .26 * R, outY, R * .075, k ? P.ink : P.ink);
  }
  if (!k) ln(cx - .15 * R, ey, cx + .15 * R, ey, lw * .6);
  c.beginPath(); c.moveTo(cx - .05 * R, cy + .05 * R); c.quadraticCurveTo(cx + .1 * R, cy + .22 * R, cx - .02 * R, cy + .3 * R); c.lineWidth = lw * .7; c.strokeStyle = skS; c.stroke();
  const my = cy + .6 * R, mw = .36 * R, m = o.mouth || 'flat', op = o.open || 0;
  if (m === 'open' && op > .06) { const h = Math.max(.08 * R, .3 * R * op); c.beginPath(); c.ellipse(cx, my + h * .3, mw * (.7 + .3 * op), h, 0, 0, 7); c.fillStyle = '#6e1f2a'; c.fill(); c.save(); c.clip(); c.fillStyle = P.white; c.fillRect(cx - mw, my - h, 2 * mw, h * .75); c.restore(); c.beginPath(); c.ellipse(cx, my + h * .3, mw * (.7 + .3 * op), h, 0, 0, 7); stroke(lw) }
  else if (m === 'smile') { c.beginPath(); c.arc(cx, my - .12 * R, mw * .85, .15 * Math.PI, .85 * Math.PI); stroke(lw) }
  else if (m === 'smirk') { c.beginPath(); c.moveTo(cx - mw * .7, my + .03 * R); c.quadraticCurveTo(cx, my + .08 * R, cx + mw * .8, my - .08 * R); stroke(lw) }
  else ln(cx - mw * .6, my, cx + mw * .6, my, lw);
  if (o.sweat) { const sx = cx + .85 * R, sy = cy - .55 * R + (o.sweatY || 0); c.beginPath(); c.moveTo(sx, sy - .2 * R); c.quadraticCurveTo(sx + .17 * R, sy + .02 * R, sx, sy + .15 * R); c.quadraticCurveTo(sx - .17 * R, sy + .02 * R, sx, sy - .2 * R); c.fillStyle = P.cyan; c.fill(); stroke(lw * .7) }
  c.restore();
}
const mouthOf = (k, t) => { const a = env(k, t); return a > .08 ? { mouth: 'open', open: Math.min(1, a * 1.15) } : { mouth: 'flat' } };
// ---------- room & props ----------
function room(glow) {
  bgFlat(P.teal, P.tealD, 36, 12);
  rr(110, 500, 250, 380, 8, '#1c1f4d'); ell(240, 640, 42, 42, P.yellow, 6); ell(262, 630, 36, 36, '#1c1f4d', 0); for (const [x, y] of [[160, 560], [300, 560], [190, 780], [310, 740]]) ell(x, y, 5, 5, P.white, 0); ln(235, 500, 235, 880, 10); ln(110, 690, 360, 690, 10);
  c.fillStyle = P.floor; c.fillRect(0, 1360, W, 560); ln(0, 1360, W, 1360, 12); for (let i = 0; i < 6; i++) ln(0, 1450 + i * 100, W, 1450 + i * 100, 5, '#a8703c');
  rr(380, 1130, 160, 235, 8, P.wood);
}
function phoneProp(x, y, w, h, rot = 0, col = '#1a1a22') { c.save(); c.translate(x, y); c.rotate(rot); rr(-w / 2, -h / 2, w, h, w * .18, col, 7); c.restore() }
function bedFront(lump = 0) {
  rr(960, 880, 140, 500, 14, P.purple); rr(560, 1250 + lump, 540, 110, 10, P.wood);
  rr(880, 1060 + lump, 170, 90, 28, P.white);
  const bl = () => { c.beginPath(); c.roundRect(570, 1130 + lump, 470, 150, 28) };
  bl(); c.fillStyle = P.blanket; c.fill(); clipDots(bl, P.blanketD, 570, 1130, 1040, 1280, 26, 9, [.2, 1]); bl(); stroke(LW);
  ln(600, 1150 + lump, 1000, 1150 + lump, 5, '#6fe0b8');
}
function lumpBed(t, shake) { // blanket with body hump
  rr(960, 880, 140, 500, 14, P.purple); rr(560, 1250, 540, 110, 10, P.wood); rr(880, 1060, 170, 90, 28, P.white);
  const j = shake ? Math.sin(t * 34) * 5 : 0;
  const bl = () => { c.beginPath(); c.moveTo(570, 1280); c.lineTo(570, 1190 + j); c.bezierCurveTo(600, 1150, 700, 1090 + j * 2, 800, 1110 + j, 1040, 1150); c.lineTo(1040, 1280); c.closePath() };
  bl(); c.fillStyle = P.blanket; c.fill(); clipDots(bl, P.blanketD, 570, 1090, 1040, 1280, 26, 9, [.2, 1]); bl(); stroke(LW);
}
function kaluWalk(x, y, step) { // side view, feet at y, facing right. step = continuous phase
  const sw = Math.sin(step * Math.PI), bob = Math.abs(Math.cos(step * Math.PI)) * 14;
  ln(x - 10, y - 190, x - 70 * sw - 10, y - 14, 34, P.ink); ln(x - 10, y - 190, x - 70 * sw - 10, y - 14, 20, P.skinS); ell(x - 70 * sw + 10, y - 8, 38, 16, P.white, 8);
  ln(x + 10, y - 190, x + 70 * sw + 10, y - 14, 34, P.ink); ln(x + 10, y - 190, x + 70 * sw + 10, y - 14, 20, P.skin); ell(x + 70 * sw + 30, y - 8, 38, 16, P.white, 8);
  rr(x - 52, y - 215 - bob, 104, 70, 14, P.shorts); rr(x - 52, y - 400 - bob, 104, 200, 28, P.tee);
  ln(x - 4, y - 360 - bob, x + 56 * sw + 8, y - 245 - bob, 30, P.ink); ln(x - 4, y - 360 - bob, x + 56 * sw + 8, y - 245 - bob, 18, P.skin);
  ell(x + 6, y - 468 - bob, 78, 74, P.hair, 9); ell(x + 22, y - 450 - bob, 48, 54, P.skin, 9); ell(x + 42, y - 458 - bob, 7, 7, P.ink, 0); ln(x + 30, y - 424 - bob, x + 52, y - 424 - bob, 7);
}
// ---------- phone screens ----------
function siteScreen(x, y, w, h) {
  rr(x, y, w, h, 40, P.ink, 0); rr(x + 14, y + 14, w - 28, h - 28, 30, P.white, 6);
  const sx = x + 14, sw = w - 28; rr(sx + 20, y + 40, sw - 40, 56, 28, '#e8e4dc', 5); txtI('MalluBhabhiKeBadeChuuche.com', sx + sw / 2, y + 69, 30, '#333', null, 'center', 800);
  c.fillStyle = P.pink; c.fillRect(sx, y + 112, sw, 190); c.save(); c.beginPath(); c.rect(sx, y + 112, sw, 190); c.clip(); dots('#b01851', sx, y + 112, sx + sw, y + 302, 24, 8, [1, .2]); c.restore(); ln(sx, y + 302, sx + sw, y + 302, 8);
  txtI('MALLU BHABHI KE', sx + sw / 2, y + 168, 58, P.white, P.ink); txtI('BADE CHUUCHE.COM', sx + sw / 2, y + 240, 52, P.yellow, P.ink);
  const cw = (sw - 60) / 2, ch = 200;
  for (let i = 0; i < 4; i++) { const tx = sx + 20 + (i % 2) * (cw + 20), ty = y + 330 + Math.floor(i / 2) * (ch + 24);
    rr(tx, ty, cw, ch, 10, '#e0a47c', 6); c.save(); c.beginPath(); c.roundRect(tx, ty, cw, ch, 10); c.clip(); dots('#a85c3c', tx, ty, tx + cw, ty + ch, 18, 7, [.3, 1]); c.restore();
    rr(tx, ty + ch / 2 - 30, cw, 60, 0, P.ink, 0); txtI('CENSORED', tx + cw / 2, ty + ch / 2, 36, P.white, null); rr(tx + 10, ty + 10, 70, 36, 8, P.red, 5); txtI('18+', tx + 45, ty + 29, 26, P.white, null) }
}
function callScreen(t, x, y, w, h) {
  rr(x, y, w, h, 40, P.ink, 0); rr(x + 14, y + 14, w - 28, h - 28, 30, '#1a2233', 6); const cx = x + w / 2;
  txtI('INCOMING CALL', cx, y + 100, 38, '#9fb0cc', null, 'center', 800);
  const p = (Math.floor(t * 6) % 2) * 14; ell(cx, y + 300, 110 + p, 110 + p, '#4b5a7a', 6); txtI('D', cx, y + 305, 130, P.white, null);
  txtI('Dost', cx, y + 520, 100, P.white, P.ink); txtI('mobile', cx, y + 600, 40, '#9fb0cc', null, 'center', 700);
  ell(x + 150, y + h - 160, 70, 70, P.red, 8); ell(x + w - 150, y + h - 160, 70, 70, P.green, 8); ln(x + 120, y + h - 160, x + 180, y + h - 160, 14, P.white); ln(x + w - 180, y + h - 160, x + w - 120, y + h - 160, 14, P.white);
}
function handAround(x, y, w, h) { // fingers on the right edge, thumb on the left, sleeve below
  for (let i = 0; i < 4; i++) ell(x + w - 6, y + 180 + i * 120, 46, 40, P.skin, 9);
  ell(x + 6, y + 320, 38, 100, P.skin, 9); rr(x + 70, y + h - 40, w - 140, 400, 40, P.tee); rr(x + 120, y + h - 110, w - 240, 90, 30, P.skin);
}
// flying clothes (shorts + underwear) during the jingle
function flung(t, t0) {
  const it = (a, kind, dx) => { const u = t - a; if (u < 0 || u > 1.0) return; const x = 780 + dx * u * 520, y = 1050 - 1100 * u + 1250 * u * u, r = u * 9 * (dx < 0 ? -1 : 1);
    c.save(); c.translate(x, y); c.rotate(r);
    if (kind === 's') { poly([[-60, -40], [60, -40], [66, 40], [14, 52], [0, 0], [-14, 52], [-66, 40]], P.shorts) }
    else { poly([[-50, -28], [50, -28], [34, 36], [0, 22], [-34, 36]], P.white); ln(-50, -16, 50, -16, 10, P.red) }
    c.restore() };
  it(t0 + .15, 's', -1.2); it(t0 + .5, 'b', 1.0);
}
// ---------- shots ----------
const SH = []; const shot = (a, b, fn) => SH.push([a, b, fn]);
const [B0, B1] = META.buzz, I0 = META.intro, LN = META.lines;
// 1 walk
shot(0, 1.5, (t, a) => { room(); phoneProp(460, 1090, 70, 100); bedFront(); const u = pr(t, a, a + 1.4); kaluWalk(lerp(-120, 470, u), 1360, (t - a) * 3.2); if (u < .9) for (let i = 0; i < 3; i++) ln(lerp(-120, 470, u) - 150 - i * 40, 1180 + i * 60, lerp(-120, 470, u) - 230 - i * 60, 1180 + i * 60, 8, 'rgba(21,17,15,.5)'); sound('TAP TAP', 330, 640, 90, -.1, a + .15, t, .9) });
// 2 flop on bed, grab the phone
shot(1.5, 2.8, (t, a) => { room(); const u = pr(t, a, a + .3), g = pr(t, a + .5, a + 1.0), drop = u < 1 ? -(1 - u) * 400 : 0; const gotPhone = g >= 1;
  if (!gotPhone) phoneProp(460, 1090, 70, 100); lumpBed(t, false);
  c.save(); c.translate(0, drop); head('k', 960, 1010, 105, { mouth: 'smile', look: [-.7 * g, 0], tilt: .2 }); c.restore();
  const ax = lerp(780, 500, g), ay = lerp(1150, 1100, g); c.save(); ln(800, 1160 + drop * .2, ax, ay, 40, P.ink); ln(800, 1160 + drop * .2, ax, ay, 24, P.skin); ell(ax, ay, 30, 28, P.skin, 8); c.restore();
  if (gotPhone) phoneProp(ax - 10, ay - 40, 70, 100, -.3);
  sound('FWUMP!', 700, 700, 110, .08, a + .25, t, 1.0) });
// 3 site on the phone, in hand (about 1 s)
shot(2.8, 3.85, (t, a) => { bgFlat('#2a2250', '#3c3270', 32, 10); const s = 1 + .03 * back(pr(t, a, a + .12)); c.save(); c.translate(W / 2, 960); c.scale(s, s); c.translate(-W / 2, -960); siteScreen(170, 400, 740, 1180); handAround(170, 400, 740, 1180); c.restore() });
// 4 jingle: loose shot, clothes fly, then close-ups with eyes closing
const lidAt = (t) => { const u = pr(t, I0 + .5, B0 - .05); return .82 * u * u * (3 - 2 * u) };
const relax = (t) => ({ lid: lidAt(t), brow: 1, mouth: 'smile', look: [0, .6], sweat: t > I0 + .6 });
shot(I0, I0 + .95, (t, a) => { room(); lumpBed(t, true); head('k', 960, 1010, 105, { ...relax(t), tilt: .15 }); phoneProp(780, 1010, 70, 100, -.3, '#2d3a5c'); flung(t, I0); sound('WHOOSH!', 500, 700, 120, -.12, I0 + .1, t, .9); for (let i = 0; i < 5; i++) ln(300 + i * 40, 900 + i * 55, 440 + i * 40, 900 + i * 55, 9, 'rgba(21,17,15,.5)') });
shot(I0 + .95, I0 + 1.9, (t, a) => { rays(540, 900, 28, '#ff7da8', '#ffc2d6', t * .3); head('k', 540, 930, 330, relax(t)); const z = Math.sin(t * 30); txtI('♥', 130 + z * 6, 640, 120, P.red, P.ink); txtI('♥', 930, 560 - z * 6, 90, P.red, P.ink) });
shot(I0 + 1.9, B0, (t, a) => { rays(540, 920, 28, '#ff5d92', '#ff9cbc', t * .3); const u = pr(t, a, B0); head('k', 540, 930 + u * 14, 360 + u * 24, relax(t)); clipDotsCyan(t) });
function clipDotsCyan() { c.save(); c.fillStyle = 'rgba(79,214,238,.35)'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(240 + i * 120, 1500, 10 + i * 2, 0, 7); c.fill() } c.restore() }
// 5 call arrives: phone in hand, worried face above
shot(B0, B1, (t, a) => { bgFlat('#2a2250', '#3c3270', 32, 10); head('k', 540, 560, 190, { brow: 1, mouth: 'flat', look: [0, .8], sweat: 1 }); const sh = Math.floor(t * 14) % 2 ? 10 : -10; callScreen(t, 170 + sh, 790, 740, 960); handAround(170 + sh, 790, 740, 960);
  sound('BZZT BZZT', 880, 420, 70, .15, B0, t, 1.3) });
// 6 disappointed stare
shot(B1, LN[0][1], (t, a) => { bgFlat('#e8c25a', '#d6a93c', 30, 10); head('k', 540, 930, 360, { lid: .5, brow: 1, look: [.6, .4], mouth: 'flat', sweat: 1 }) });
// 7 L1 (slightly angry), phone at ear
function phoneEar(side, t, e) { const x = side > 0 ? 930 : 150, sh = e * 5 * Math.sin(t * 50); c.save(); c.translate(x + sh, 880); c.rotate(side * .12); rr(-60, -170, 120, 340, 26, '#1a1a22', 9); rr(-46, -150, 92, 270, 14, '#1a2233', 0); ell(0, 110, 12, 12, P.white, 0); c.restore(); ell(x + side * -70, 930, 55, 60, P.skin, 9) }
shot(LN[0][1], LN[1][1], (t, a) => { bgFlat('#e8c25a', '#d6a93c', 30, 10); const e = env('k', t); head('k', 520 + (e > .5 ? 6 : 0), 930, 360, { lid: .25, brow: -1, look: [.4, .3], sweat: 1, ...mouthOf('k', t) }); phoneEar(1, t, e) });
// 8 friend
shot(LN[1][1], LN[1][1] + 1.4, (t, a) => { rays(540, 940, 24, '#8fd3c8', '#bfe9e1', 0); const e = env('f', t); head('f', 590, 930, 360, { brow: 0, look: [-.4, .2], ...mouthOf('f', t) }); phoneEar(-1, t, e) });
// 9 reaction
shot(LN[1][1] + 1.4, LN[2][1], (t, a) => { bgFlat('#e8c25a', '#d6a93c', 30, 10); head('k', 540, 930, 370, { lid: .55, brow: 1, look: [.7, 0], mouth: 'flat' }) });
// 10 punchline (sarcastic question) then 11 end SFX burst
shot(LN[2][1], 99, (t, a) => { bgFlat('#e8c25a', '#d6a93c', 30, 10); const e = env('k', t), post = t >= META.end;
  head('k', 540, 930, 380, { lid: post ? .5 : .3, brow: -.4, brL: -.9, brR: .7, look: [0, .1], tilt: -.05, ...(post ? { mouth: 'flat' } : mouthOf('k', t)) });
  if (t > LN[2][1] + .1 && !post) txtI('?', 900, 560, 150, P.red, P.ink);
  sound('FAAAH!', 560, 400, 150, -.08, META.end, t, 3, P.yellow, P.red) });
export function draw(t) {
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = P.paper; c.fillRect(0, 0, W, H); c.restore();
  let s = null; for (const q of SH) if (t >= q[0] && t < q[1]) s = q; if (!s) for (const q of SH) if (q[0] <= t) s = q;
  c.save(); const sk = t >= META.end && t < META.end + .35 ? Math.sin(t * 90) * 7 : 0; c.translate(sk, -sk * .6); s[2](t, s[0]); c.restore();
  // halftone vignette corners (print feel)
  c.save(); c.fillStyle = 'rgba(21,17,15,.12)'; for (let y = 0; y < 220; y += 22) for (let x = 0; x < 220 - y; x += 22) { for (const [ox, oy] of [[0, 0], [W, 0], [0, H], [W, H]]) { c.beginPath(); c.arc(ox ? ox - x : x, oy ? oy - y : y, 5, 0, 7); c.fill() } } c.restore();
  label([['दोस्त वही जो ', '#111'], ['सही टाइम', '#D7261E'], [' पर गलत कॉल करे', '#111']], 540, 250, 52);
  captions(groups, t, KEYS, 1700);
}
export const cues = [];
