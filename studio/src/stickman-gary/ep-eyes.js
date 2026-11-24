// 2026-11-24 YouTube "You've Never Seen Your Own Eyes Move" (type 1 funny knowledge). Desi Goggle-Eye Toon, bright bathroom, morning.
// Kalu (canon, toothbrush) and Battery (morning tee) standing. Takeaway: your eyes jump about 3 times a second and the brain blanks
// the picture during every jump (saccadic masking), so you never see your own eyes move in a mirror; it also edits your nose out.
// Beats: L1 hook = Kalu's claim over Battery's big mirror reflection, cut to Kalu close / L2 Battery scoffs, then mirror insert: pupils
// SNAP left/right with no in-between frames ('teleport') / L3 science insert: gaze ring hops sun-tree-house 3x a second, a cute brain
// flips a light switch so the picture blacks out on every hop, a smeared 'blurry mess' version snaps back to crisp / L4 Battery horrified,
// blinking / L5 film-strip insert: black gaps get painted over by the brain, then Kalu close / L6 Battery suspicious push-in / L7 Kalu
// 'your nose', POV insert: Battery's view with his nose at the bottom, the brain erases it / L8 Battery looking down at his nose, POV
// nose comes back / L9 Kalu turns to the camera: 'so can everyone watching this'. Abrupt end.
import { W, H, bind, ctx, lerp, clamp, captions, groupWords, finish, poly, ell, fillEll, fillPoly, line, rrect, layer, blurred, shadowBlob, dark, light } from '../toon/toon.js';
import { kpSeated } from '../toon/kp.js';
import { KALU, BATTERY } from '../toon/kalu.js';
const META = await (await fetch('/data/meta.json')).json();
const ENV = await (await fetch('/data/env.json')).json();
export const DUR = META.dur;
const TL = META.lines;
let c, groups = [], WS = [];
const KEYS = /^(never|eyes|move\.?|once\.?|TELEPORT\?!|jump|three|off,?|blurry|blind\.\.\.|blind\.|gaps\.?|notice\.?|ELSE|nose\.?|everyone)$/i;
const wt = (word, line, after = -1) => { const x = WS.find(q => q.line === line && q.s > after && q.w.replace(/\W/g, '').toLowerCase() === word); return x ? x.s : TL[line][1] };
const env = (k, t) => { const a = ENV[k]; return a ? (a[Math.min(a.length - 1, Math.max(0, Math.floor(t * 30)))] || 0) : 0 };
const sm = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u) };
const seg = (t, a, b) => sm((t - a) / (b - a));
const nz = (t, k) => Math.sin(t * 17.3 + k) * .5 + Math.sin(t * 9.1 + k * 2) * .5;
const speaking = (sp, t) => TL.some(([s, a, b]) => s === sp && t >= a - .05 && t <= b);
const L = (i) => TL[i];
const S = .86, LIFT = 205, FLOOR = 1585, HY = FLOOR - 245 * S, SHY = HY - LIFT * S, LEN = 146, SH = { near: [-70, -300], far: [78, -312] };
const BX = 300, KX = 800;
const KAL = { ...KALU, stand: 1 };
const BAT = { ...BATTERY, specs: 'clear', specCol: '#1A1A1E', suit: false, top: 'tee', topCol: '#E9A93B', pant: '#7D8794', shoe: '#E6E3DC', stand: 1 };
const HEADY = HY - (LIFT + 470) * S;
function ik(X, flip, side, tx, ty) {
  const lx = flip ? (X - tx) / S : (tx - X) / S, ly = (ty - SHY) / S, s0 = SH[side];
  let rx = lx - s0[0], ry = ly - s0[1]; const d0 = Math.hypot(rx, ry) || 1, mx = 2 * LEN * .985; if (d0 > mx) { rx *= mx / d0; ry *= mx / d0 }
  const d = Math.hypot(rx, ry), hh = Math.sqrt(Math.max(0, LEN * LEN - d * d / 4)); let px = -ry / d, py = rx / d; if (py < 0) { px = -px; py = -py }
  return { e: [rx / 2 + px * hh, ry / 2 + py * hh], h: [rx, ry] };
}
let T_NOT, T_LEFT, T_RIGHT, T_WAIT, T_TELE, T_DURING, T_SO, T_YOU5, T_ITS, T_BRAIN7, T_OUT, T_NOSE8, T_EVERY, T_FILLS;
export function init(cx, w) {
  c = cx; bind(c); WS = w; groups = groupWords(w);
  T_NOT = wt('not', 0) - .08; T_LEFT = wt('left', 1) - .1; T_RIGHT = wt('right', 1, T_LEFT + .2); T_WAIT = wt('wait', 1); T_TELE = wt('teleport', 1);
  T_DURING = wt('during', 2) - .08; T_SO = wt('so', 2) - .05; T_YOU5 = wt('you', 4) - .08; T_FILLS = wt('fills', 4);
  T_ITS = wt('its', 6) - .08; T_BRAIN7 = wt('brain', 6); T_OUT = wt('out', 6); T_NOSE8 = wt('nose', 7) - .15; T_EVERY = wt('everyone', 8);
}
// ---------- set: bright bathroom, morning ----------
const OX = 240;
function roomLayer() {
  return layer('bath', 1560, 1920, () => {
    const g = ctx(); g.translate(OX, 0);
    g.fillStyle = '#CFEDEA'; g.fillRect(-OX, 0, 1560, FLOOR);                                   // aqua wall
    g.fillStyle = 'rgba(255,255,255,.55)'; for (let y = 0; y < FLOOR; y += 90) g.fillRect(-OX, y, 1560, 4); for (let x = -OX; x < 1400; x += 90) g.fillRect(x, 0, 4, FLOOR);   // tile grout
    g.fillStyle = '#7FC4BE'; g.fillRect(-OX, 980, 1560, 26);                                     // tile border band
    g.fillStyle = '#FFFFFF'; g.fillRect(-OX, FLOOR - 50, 1560, 50); g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(-OX, FLOOR - 8, 1560, 8);
    for (let y = FLOOR; y < 1920; y += 80) for (let x = -OX; x < 1400; x += 80) { g.fillStyle = ((x / 80 + y / 80) & 1) ? '#E9ECEF' : '#D6DCE1'; g.fillRect(x, y, 80, 80) }   // checker floor
    // frosted window top-left with morning light
    const wx = -150, wy = 140; g.fillStyle = '#FFFFFF'; g.fillRect(wx - 18, wy - 18, 336, 396);
    const sk = g.createLinearGradient(0, wy, 0, wy + 360); sk.addColorStop(0, '#FFF6D8'); sk.addColorStop(1, '#FBE3B0'); g.fillStyle = sk; g.fillRect(wx, wy, 300, 360);
    g.fillStyle = 'rgba(255,255,255,.5)'; for (let k = 0; k < 6; k++) g.fillRect(wx + 20 + k * 46, wy, 14, 360);
    g.strokeStyle = '#2B1D16'; g.lineWidth = 5; g.strokeRect(wx, wy, 300, 360); g.fillStyle = '#FFFFFF'; g.fillRect(wx + 145, wy, 10, 360);
    const lg = g.createRadialGradient(0, 300, 20, 0, 300, 700); lg.addColorStop(0, 'rgba(255,240,190,.45)'); lg.addColorStop(1, 'rgba(255,240,190,0)'); g.fillStyle = lg; g.fillRect(-OX, 0, 1000, 1200);
    // big mirror in the middle with a soft reflection
    const mx = 400, my = 300, mw = 330, mh = 440;
    rrect(mx - 16, my - 16, mw + 32, mh + 32, 40, '#E2B54A', null, 5);
    const mg = g.createLinearGradient(mx, my, mx + mw, my + mh); mg.addColorStop(0, '#E8F6FA'); mg.addColorStop(1, '#BFDDE6'); rrect(mx, my, mw, mh, 30, mg, null, 4);
    g.fillStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.moveTo(mx + 40, my + 120); g.lineTo(mx + 140, my + 20); g.lineTo(mx + 180, my + 20); g.lineTo(mx + 60, my + 150); g.closePath(); g.fill();
    // sink counter under the mirror: basin, tap, toothbrush cup, soap
    rrect(mx - 60, 900, mw + 120, 46, 14, '#FFFFFF', () => fillPoly([[mx - 60, 930], [mx + mw + 60, 930], [mx + mw + 60, 946], [mx - 60, 946]], '#DCE3E8'), 5);
    rrect(mx - 20, 946, mw + 40, 260, 18, '#6C9BC9', () => fillPoly([[mx - 20, 1150], [mx + mw + 20, 1150], [mx + mw + 20, 1206], [mx - 20, 1206]], '#5A86B2'), 5);
    g.fillStyle = '#4F79A3'; g.fillRect(mx + mw / 2 - 4, 960, 8, 230); fillEll(mx + 110, 1060, 9, 9, '#E2B54A'); fillEll(mx + mw - 110, 1060, 9, 9, '#E2B54A');
    rrect(mx + mw / 2 - 12, 840, 24, 62, 8, '#C9D1D8', null, 4); rrect(mx + mw / 2 - 12, 840, 70, 20, 8, '#C9D1D8', null, 4);
    rrect(mx + 30, 830, 54, 72, 10, '#F28C6A', null, 4); g.lineWidth = 8; g.strokeStyle = '#4FB3A9'; g.beginPath(); g.moveTo(mx + 50, 840); g.lineTo(mx + 40, 760); g.stroke(); g.strokeStyle = '#F2C14E'; g.beginPath(); g.moveTo(mx + 66, 840); g.lineTo(mx + 80, 770); g.stroke();
    rrect(mx + mw - 90, 872, 60, 30, 12, '#F7E3F0', null, 4);
    // towel rail + towel (right)
    g.fillStyle = '#B9C4CC'; g.fillRect(1030, 560, 240, 14);
    rrect(1060, 566, 180, 380, 16, '#F2C14E', () => { fillPoly([[1060, 880], [1240, 880], [1240, 946], [1060, 946]], '#D9A73A'); g.fillStyle = 'rgba(255,255,255,.4)'; g.fillRect(1060, 820, 180, 14) }, 5);
    // small plant on a shelf (left)
    g.fillStyle = '#FFFFFF'; g.fillRect(-180, 800, 230, 18); g.fillStyle = '#C46A3C'; g.fillRect(-120, 730, 80, 70); g.fillStyle = '#4F8A55';
    for (let k = 0; k < 6; k++) { g.beginPath(); g.ellipse(-80 + Math.sin(k * 2.2) * 40, 700 - k * 16, 16, 46, Math.sin(k) * .9, 0, 7); g.fill() }
  });
}
// ---------- props / helpers ----------
function toothbrush(x, y, s, rot) {
  const g = ctx(); g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  rrect(-10, -150, 20, 170, 9, '#4FB3A9', null, 4); rrect(-14, -190, 28, 46, 8, '#FFFFFF', () => { for (let k = 0; k < 4; k++) fillPoly([[-12, -186 + k * 10], [12, -186 + k * 10], [12, -182 + k * 10], [-12, -182 + k * 10]], '#9FD8F2') }, 4);
  g.restore();
}
function brain(x, y, s, mood, t, arm = 0) {   // cute pink brain with goggle eyes, little arms
  const g = ctx(); g.save(); g.translate(x, y); g.scale(s, s);
  const b = Math.sin(t * 6) * 4;
  g.translate(0, b);
  ell(0, 0, 150, 115, '#F7A8B8', () => { fillEll(0, 60, 150, 50, '#E88DA0') }, 6);
  g.strokeStyle = '#D9768C'; g.lineWidth = 6; g.lineCap = 'round';
  for (const [a, b2, c2, d] of [[-110, -40, -60, -70], [-40, -90, 10, -60], [30, -80, 90, -40], [-120, 30, -70, 10], [70, 20, 120, -10], [-10, -20, 20, 10]]) { g.beginPath(); g.moveTo(a, b2); g.quadraticCurveTo((a + c2) / 2, b2 - 30, c2, d); g.stroke() }
  g.beginPath(); g.moveTo(0, -110); g.lineTo(0, -40); g.stroke();
  // eyes
  const ey = 10, look = mood === 'sneaky' ? [.5, 0] : [0, 0];
  for (const sx of [-42, 42]) {
    if (mood === 'stress') { line([[sx - 16, ey - 12], [sx + 14, ey], [sx - 16, ey + 12]].map(p => sx > 0 ? [2 * sx - p[0], p[1]] : p), 5, '#2B1D16', false); continue }
    ell(sx, ey, 26, 30, '#FFFFFF', null, 5); fillEll(sx + look[0] * 10, ey + 4, 10, 10, '#16100C'); fillEll(sx + look[0] * 10 - 3, ey, 3.5, 3.5, '#FFFFFF');
  }
  if (mood === 'stress') { g.strokeStyle = '#2B1D16'; g.lineWidth = 5; g.beginPath(); for (let k = 0; k < 5; k++) g.lineTo(-30 + k * 15, 66 + (k & 1 ? -8 : 8)); g.stroke() }
  else { g.strokeStyle = '#2B1D16'; g.lineWidth = 5; g.beginPath(); g.arc(0, 50, 22, .2, Math.PI - .2); g.stroke() }
  // arms
  line([[120, 40], [170, 10 - arm * 40], [190, -20 - arm * 60]], 12, '#E88DA0', true); fillEll(192, -24 - arm * 60, 16, 16, '#F7A8B8');
  line([[-120, 40], [-160, 80], [-170, 110]], 12, '#E88DA0', true); fillEll(-172, 114, 16, 16, '#F7A8B8');
  g.restore();
}
function view(x, y, w, h, t, opts = {}) {   // a little sunny picture: sun, tree, house (what the eyes look at)
  const g = ctx(); g.save(); g.beginPath(); g.roundRect(x, y, w, h, 36); g.clip();
  const draw = (dx, a) => {
    g.save(); g.globalAlpha = a; g.translate(dx, 0);
    const sk = g.createLinearGradient(0, y, 0, y + h); sk.addColorStop(0, '#8CC8F0'); sk.addColorStop(1, '#DDF0FA'); g.fillStyle = sk; g.fillRect(x - 200, y, w + 400, h);
    g.fillStyle = '#7CC46A'; g.fillRect(x - 200, y + h * .72, w + 400, h * .3);
    fillEll(x + w * .2, y + h * .22, 58, 58, '#FFD93B');
    g.fillStyle = '#8A5A3C'; g.fillRect(x + w * .47, y + h * .45, 30, h * .3); fillEll(x + w * .5, y + h * .4, 90, 100, '#4F8A55');
    g.fillStyle = '#F28C6A'; g.fillRect(x + w * .68, y + h * .5, 170, 150); fillPoly([[x + w * .66, y + h * .5], [x + w * .68 + 85, y + h * .32], [x + w * .68 + 190, y + h * .5]], '#C0463B');
    g.fillStyle = '#FFF3C4'; g.fillRect(x + w * .68 + 30, y + h * .5 + 40, 40, 40); g.fillStyle = '#7A5236'; g.fillRect(x + w * .68 + 100, y + h * .5 + 60, 44, 90);
    g.restore();
  };
  if (opts.smear) { for (let k = -4; k <= 4; k++) draw(k * 34 * opts.smear, .22) } else draw(0, 1);
  if (opts.black) { g.fillStyle = '#05050A'; g.globalAlpha = opts.black; g.fillRect(x, y, w, h); g.globalAlpha = 1 }
  g.restore();
  rrect(x, y, w, h, 36, 'rgba(0,0,0,0)', null, 8);
  return [[x + w * .2, y + h * .22], [x + w * .5, y + h * .4], [x + w * .68 + 85, y + h * .5 + 60]];
}
function eyePair(cx, cy, r, look) {   // two big cartoon eyes
  for (const sx of [-1, 1]) { ell(cx + sx * r * 1.1, cy, r, r * 1.08, '#FFFFFF', null, 7); fillEll(cx + sx * r * 1.1 + look[0] * r * .5, cy + look[1] * r * .5, r * .36, r * .36, '#3B2A20'); fillEll(cx + sx * r * 1.1 + look[0] * r * .5, cy + look[1] * r * .5, r * .2, r * .2, '#0B0806'); fillEll(cx + sx * r * 1.1 + look[0] * r * .5 - r * .12, cy + look[1] * r * .5 - r * .14, r * .08, r * .08, '#FFFFFF') }
}
// ---------- characters ----------
function kalu(t) {
  const sp = speaking('k', t);
  let f = { brow: -.15, look: [.9, 0], mouth: 'flat', wide: .3 };
  if (sp) f = { ...f, mouth: 'talk', open: clamp(env('k', t) * .6, .1, .3), wide: .14, wideNow: nz(t * 1.2, 1) * .06 };
  let turn = .55, tilt = Math.sin(t * 1.4) * .008;
  if (t >= L(4)[1] && t < L(5)[1]) f = { ...f, brow: -.3 };
  if (t >= T_EVERY - .1) { const u = seg(t, T_EVERY - .1, T_EVERY + .25); turn = lerp(.55, 0, u); f = { ...f, look: [lerp(.9, 0, u), 0], brow: -.25 } }
  const near = { ...ik(KX, true, 'near', KX - 120, SHY - 60), hand: 'fist' };
  const far = { ...ik(KX, true, 'far', KX - 40, SHY + 120), hand: 'rest' };
  return { face: f, arms: { near, far }, headTilt: tilt, turn, brush: [KX - 120, SHY - 50] };
}
function battery(t) {
  const sp = speaking('b', t);
  let f = { brow: .2, lid: .05, look: [.9, .05], mouth: 'flat', wide: .2 };
  if (sp) f = { ...f, mouth: 'talk', open: clamp(env('b', t) * 1.0, .16, .65), wide: .21, wideNow: nz(t * 1.7, 5) * .25 };
  let near = { ...ik(BX, false, 'near', BX + 70, SHY + 150), hand: 'rest' }, far = { ...ik(BX, false, 'far', BX + 70, SHY + 140), hand: 'rest' };
  let tilt = 0, turn = .55;
  if (t < L(1)[1]) { f = { ...f, brow: -.1, look: [.9, 0] } }
  else if (t < T_LEFT) {                                    // L2 start: scoffing, pointing at his own eyes
    f = { ...f, brow: -.35, lid: .25, mouth: sp ? f.mouth : 'smirk' }; tilt = -.06;
    near = { ...ik(BX, false, 'near', BX + 120, HEADY + 30), hand: 'point' };
  } else if (t < L(3)[1] - .1) { f = { ...f, brow: .6, browUp: .6, eye: 1.1 } }
  else if (t < L(4)[1] - .1) {                              // L4: horrified, hands on cheeks, blinking 3x a second
    const bl = ((t - L(3)[1]) * 3) % 1 < .14; f = { ...f, brow: .8, browUp: 1, eye: 1.15, pupil: .75, closed: bl ? 'flat' : undefined }; tilt = .04;
    near = { ...ik(BX, false, 'near', BX + 30, HEADY + 115), hand: 'open' }; far = { ...ik(BX, false, 'far', BX + 175, HEADY + 105), hand: 'open' };
  } else if (t < L(5)[1] - .1) { f = { ...f, brow: .5, look: [.9, 0] } }
  else if (t < L(6)[1] - .1) {                              // L6: suspicious, narrowed eyes, hand on chin
    f = { ...f, brow: -.5, lid: .5, look: [.9, .1], mouth: sp ? f.mouth : 'flat' }; tilt = -.05;
    near = { ...ik(BX, false, 'near', BX + 100, HEADY + 120), hand: 'fist' };
  } else if (t < L(7)[1] - .1) { f = { ...f, brow: .35, browUp: .4, look: [.9, 0] } }
  else {                                                    // L8/L9: staring down at his own nose, annoyed
    f = { ...f, brow: .55, lid: .2, look: [.15, .95], pupil: .8, mouth: sp ? f.mouth : 'flat' }; tilt = .08;
  }
  return { face: f, arms: { near, far }, headTilt: -.02 + Math.sin(t * 1.3) * .012 + tilt, turn };
}
function people(t) {
  shadowBlob(BX + 30, FLOOR + 12, 170, 20, .2); shadowBlob(KX - 30, FLOOR + 12, 170, 20, .2);
  const bst = battery(t), kst = kalu(t);
  kpSeated({ ...BAT, x: BX, y: HY, s: S, flip: false, face: bst.face, arms: bst.arms, headTilt: bst.headTilt, turn: bst.turn });
  kpSeated({ ...KAL, x: KX, y: HY, s: S, flip: true, face: kst.face, arms: kst.arms, headTilt: kst.headTilt, turn: kst.turn });
  toothbrush(kst.brush[0] + 4, kst.brush[1] + 10, .9, -.35);
}
// ---------- inserts ----------
function mirrorInsert(t, phase) {   // Battery's big reflection in the mirror
  const g = ctx(), lt = t;
  g.fillStyle = '#CFEDEA'; g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(255,255,255,.55)'; for (let y = 0; y < H; y += 150) g.fillRect(0, y, W, 6); for (let x = 0; x < W; x += 150) g.fillRect(x, 0, 6, H);
  const z = 1 + (phase === 'hook' ? t * .05 : (t - T_LEFT) * .04); g.save(); g.translate(W / 2, 900); g.scale(z, z); g.translate(-W / 2, -900);
  rrect(70, 150, 940, 1420, 70, '#E2B54A', null, 7);
  g.save(); g.beginPath(); g.roundRect(110, 190, 860, 1340, 50); g.clip();
  const mg = g.createLinearGradient(0, 190, 0, 1530); mg.addColorStop(0, '#E8F6FA'); mg.addColorStop(1, '#B7D7E1'); g.fillStyle = mg; g.fillRect(110, 190, 860, 1340);
  g.save(); g.globalAlpha = .35; g.drawImage(blurred('bathB3', roomLayer(), 20), -OX - 400, -300, 1560 * 1.5, 1920 * 1.5); g.restore();
  // pupils: hook = staring straight; L2 = SNAP left/right with no in-between frames
  let look = [0, 0], f = { brow: 0, lid: 0, eye: 1.08, mouth: 'flat', wide: .2 };
  if (phase === 'mirror') {
    const sp = speaking('b', t);
    if (t < T_RIGHT - .05) look = [-.85, 0]; else if (t < T_WAIT - .05) look = [.85, 0];
    else if (t < T_TELE - .05) { const k = Math.floor((t - T_WAIT) * 3); look = [k % 2 ? .85 : -.85, 0] }
    else look = [0, 0];
    f = { brow: t >= T_WAIT ? .6 : -.2, browUp: t >= T_TELE - .05 ? 1 : 0, lid: t < T_WAIT ? .15 : 0, eye: t >= T_TELE - .05 ? 1.22 : 1.06, pupil: t >= T_TELE - .05 ? .8 : 1.25, mouth: sp ? 'talk' : 'flat', open: clamp(env('b', t), .16, .65), wide: .21 };
  }
  const s = 1.65;
  kpSeated({ ...BAT, x: 540, y: 860 + 675 * s, s, flip: false, face: { ...f, look }, arms: { near: { e: [40, 130], h: [60, 260], hand: 'rest' }, far: { e: [40, 130], h: [60, 260], hand: 'rest' } }, headTilt: 0, turn: 0 });
  g.fillStyle = 'rgba(255,255,255,.28)'; g.beginPath(); g.moveTo(180, 520); g.lineTo(420, 230); g.lineTo(500, 230); g.lineTo(220, 600); g.closePath(); g.fill();
  g.restore(); g.restore();
}
function scienceInsert(t) {
  const g = ctx(), lt = Math.max(0, t - L(2)[1]);
  const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#FFF1C9'); bg.addColorStop(1, '#FBD9B0'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const z = 1 + lt * .02; g.save(); g.translate(W / 2, 900); g.scale(z, z); g.translate(-W / 2, -900);
  const hop = Math.floor(lt * 3), tgt = hop % 3, frac = (lt * 3) % 1;
  const pts = [[0, 0], [1, 1], [2, 2]];
  // eyes on top look at the current target, snapping
  const lookOf = [[-.7, -.2], [0, .1], [.7, .3]];
  const smear = t >= T_SO ? 1 - seg(t, T_SO + 1.0, T_SO + 1.3) : 0;
  eyePair(540, 330, 115, smear > 0 ? [Math.sin(t * 20) * .8, 0] : lookOf[tgt]);
  const black = t >= T_DURING && t < T_SO && frac < .3 ? 1 : 0;
  const P = view(120, 560, 840, 620, t, { smear: smear > 0 ? smear : 0, black });
  if (!smear && !black) { const p = P[tgt]; g.strokeStyle = '#FF4D4D'; g.lineWidth = 12; g.beginPath(); g.arc(p[0], p[1], 78 + Math.sin(t * 12) * 4, 0, 7); g.stroke() }
  if (t >= T_DURING) {
    const pop = seg(t, T_DURING, T_DURING + .25);
    g.save(); g.translate(300, 1430); g.scale(pop, pop);
    brain(0, 0, .95, smear > .3 ? 'stress' : 'happy', t, black ? 1 : 0);
    g.restore();
    // light switch the brain flips
    const sx = 640, sy = 1310; rrect(sx, sy, 130, 200, 20, '#FFFFFF', null, 6); rrect(sx + 40, sy + 40, 50, 120, 14, '#E4E4E0', null, 4);
    rrect(sx + 47, black ? sy + 100 : sy + 48, 36, 52, 10, black ? '#3F6FA8' : '#F2C14E', null, 4);
  }
  g.restore();
}
function gapsInsert(t) {   // film strip of what you see: black gaps between frames get painted over by the brain
  const g = ctx(), lt = Math.max(0, t - L(4)[1]);
  g.fillStyle = '#2C2A3A'; g.fillRect(0, 0, W, H);
  const fill = seg(t, T_FILLS - .1, T_FILLS + .9), off = (lt * 320) % 380;
  g.save(); g.translate(0, 0);
  rrect(-40, 600, W + 80, 560, 0, '#121018', null, 0);
  for (let k = -1; k < 5; k++) {
    const x = k * 380 - off + 60;
    if (k % 2 === 0) { view(x, 660, 330, 440, t) }
    else { g.fillStyle = '#05050A'; g.fillRect(x, 660, 330, 440); if (fill > 0) { g.save(); g.beginPath(); g.rect(x, 660, 330 * clamp(fill * 1.4 - (k > 2 ? .3 : 0), 0, 1), 440); g.clip(); view(x, 660, 330, 440, t); g.restore() } }
    for (let h = 0; h < 4; h++) { rrect(x + 20 + h * 80, 615, 40, 26, 6, '#E9E6EE', null, 0); rrect(x + 20 + h * 80, 1120, 40, 26, 6, '#E9E6EE', null, 0) }
  }
  g.restore();
  // brain with a paint roller
  const bx = lerp(-260, 480, seg(t, T_FILLS - .6, T_FILLS + .1));
  brain(bx, 1420, 1.15, 'sneaky', t, .6);
  g.save(); g.translate(bx + 220, 1240); rrect(-8, -10, 16, 160, 8, '#7A5236', null, 4); rrect(-80, -60, 160, 56, 20, '#7CC4E8', null, 5); g.restore();
}
function povInsert(t, noseA) {   // what Battery sees: the bathroom, and his nose at the bottom
  const g = ctx();
  g.drawImage(blurred('bathB1', roomLayer(), 2), -OX - 380, -380, 1560 * 1.45, 1920 * 1.45);
  // nose (two soft blurred lobes at the bottom middle)
  if (noseA > 0) { g.save(); g.globalAlpha = noseA; g.filter = 'blur(26px)'; fillEll(470, 1700, 200, 420, dark(BAT.skin, .05), .12); fillEll(610, 1700, 200, 420, dark(BAT.skin, .05), -.12); g.filter = 'none'; g.restore() }
  // eye-shaped vignette
  g.save(); g.fillStyle = '#0A0A0E'; g.beginPath(); g.rect(0, 0, W, H); g.ellipse(360, 960, 470, 860, 0, 0, 7, true); g.fill(); g.restore();
  g.save(); g.globalCompositeOperation = 'destination-over'; g.restore();
}
function noseInsert(t) {
  const g = ctx();
  const er = t >= T_BRAIN7 ? seg(t, T_BRAIN7 + .2, T_OUT + .2) : 0;
  g.save(); const z = 1 + (t - T_ITS) * .03; g.translate(W / 2, 960); g.scale(z, z); g.translate(-W / 2, -960);
  g.drawImage(blurred('bathB1', roomLayer(), 2), -OX - 380, -380, 1560 * 1.45, 1920 * 1.45);
  if (1 - er > 0) { g.save(); g.globalAlpha = 1 - er; g.filter = 'blur(24px)'; fillEll(450, 1720, 210, 430, dark(BAT.skin, .04), .14); fillEll(630, 1720, 210, 430, dark(BAT.skin, .04), -.14); g.filter = 'none'; g.restore() }
  g.restore();
  // soft eye-shaped vignette (two overlapping eyes)
  const v = g.createRadialGradient(540, 900, 520, 540, 900, 1100); v.addColorStop(0, 'rgba(10,10,14,0)'); v.addColorStop(1, 'rgba(10,10,14,.9)'); g.fillStyle = v; g.fillRect(0, 0, W, H);
  if (t >= T_BRAIN7 - .3) {   // brain pops in with an eraser and rubs the nose out
    const pop = seg(t, T_BRAIN7 - .3, T_BRAIN7), rub = Math.sin(t * 22) * 60 * (er > 0 && er < 1 ? 1 : 0);
    g.save(); g.translate(870, 1200); g.scale(pop, pop); brain(0, 0, .75, 'sneaky', t, .3); g.restore();
    g.save(); g.translate(lerp(900, 560 + rub, seg(t, T_BRAIN7 - .1, T_BRAIN7 + .25)), lerp(1100, 1480, seg(t, T_BRAIN7 - .1, T_BRAIN7 + .25))); g.rotate(-.5);
    rrect(-70, -40, 140, 80, 16, '#F49AAA', () => fillPoly([[-70, 10], [70, 10], [70, 40], [-70, 40]], '#5A86B2'), 5); g.restore();
  }
}
function noseBackInsert(t) {
  const g = ctx(), a = seg(t, T_NOSE8, T_NOSE8 + .25);
  g.drawImage(blurred('bathB1', roomLayer(), 2), -OX - 380, -380, 1560 * 1.45, 1920 * 1.45);
  g.save(); g.globalAlpha = a; g.filter = 'blur(18px)'; const zz = 1 + (t - T_NOSE8) * .15; fillEll(450, 1660, 230 * zz, 470 * zz, dark(BAT.skin, .04), .14); fillEll(630, 1660, 230 * zz, 470 * zz, dark(BAT.skin, .04), -.14); g.filter = 'none'; g.restore();
  const v = g.createRadialGradient(540, 900, 520, 540, 900, 1100); v.addColorStop(0, 'rgba(10,10,14,0)'); v.addColorStop(1, 'rgba(10,10,14,.9)'); g.fillStyle = v; g.fillRect(0, 0, W, H);
}
// ---------- camera ----------
function camera(t) {
  const bH = [BX + 10, HEADY + 40], kH = [KX - 10, HEADY + 40];
  const K = [[0, 1.95, kH[0], kH[1] + 60],
    [L(1)[1] - .05, 1.8, bH[0] + 40, bH[1] + 110],
    [L(3)[1] - .05, 2.15, bH[0] + 40, bH[1] + 40],
    [L(4)[1] - .05, 1.1, 545, 1020], [T_YOU5, 2.0, kH[0], kH[1] + 50],
    [L(5)[1] - .05, 1.7, bH[0] + 40, bH[1] + 110], [wt('else', 5) - .05, 2.3, bH[0] + 30, bH[1] + 20],
    [L(6)[1] - .05, 2.0, kH[0], kH[1] + 50],
    [L(7)[1] - .05, 2.1, bH[0] + 40, bH[1] + 40],
    [L(8)[1] - .05, 1.15, 560, 1030], [T_EVERY - .15, 2.15, kH[0] + 10, kH[1] + 40]];
  let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const k = K[i], u = clamp((t - k[0]) / ((K[i + 1] ? K[i + 1][0] : DUR) - k[0])), push = 1 + u * .06;
  return { z: k[1] * push, cx: k[2], cy: k[3] };
}
function scene(t) {
  if (t < T_NOT) return () => mirrorInsert(t, 'hook');
  if (t >= T_LEFT && t < L(1)[2] + .1) return () => mirrorInsert(t, 'mirror');
  if (t >= L(2)[1] - .05 && t < L(2)[2] + .1) return () => scienceInsert(t);
  if (t >= L(4)[1] - .05 && t < T_YOU5) return () => gapsInsert(t);
  if (t >= T_ITS && t < L(6)[2] + .1) return () => noseInsert(t);
  if (t >= T_NOSE8 && t < L(7)[2] + .1) return () => noseBackInsert(t);
  return null;
}
export function draw(t) {
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
  const ins = scene(t);
  if (ins) { ins(); c.restore(); captions(groups, t, KEYS, 1690); finish(t); return }
  const cm = camera(t);
  c.translate(W / 2, H / 2); c.scale(cm.z, cm.z); c.translate(-cm.cx, -cm.cy);
  c.drawImage(blurred('bathB', roomLayer(), 4), -OX, 0);
  people(t);
  c.restore();
  captions(groups, t, KEYS, 1690); finish(t);
}
export const cues = [];
