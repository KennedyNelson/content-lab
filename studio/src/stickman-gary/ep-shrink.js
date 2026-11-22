// 2026-11-22 YouTube "You're Shorter Tonight" (type 1 funny knowledge). Desi Goggle-Eye Toon, warm hallway at dusk.
// Kalu (canon) and Battery standing. Battery measures himself on the door frame: tonight's pencil mark sits below this morning's.
// Beats: L1 Battery hook (a whole centimetre shorter) close on the door-frame marks / L2 Kalu two-shot, chai, 'everybody shrinks'
// / L3 spine insert: cushions between bones (cute disc faces) -> gravity squishes them like a sponge under books -> night, lying in
// bed, discs puff back up / L4 Battery relieved, arms up / L5 Kalu 'in space no gravity' -> Battery as an astronaut over Earth,
// stretching taller / L6 Battery scheming (dating profile) / L7 Kalu deadpan 'or just before breakfast'; Battery's face drops. Abrupt end.
import { W, H, bind, ctx, lerp, clamp, captions, groupWords, finish, poly, ell, fillEll, fillPoly, line, rrect, layer, blurred, shadowBlob, dark, light } from '../toon/toon.js';
import { kpSeated } from '../toon/kp.js';
import { KALU, BATTERY } from '../toon/kalu.js';
import { chaiGlass } from '../toon/sets.js';
const META = await (await fetch('/data/meta.json')).json();
const ENV = await (await fetch('/data/env.json')).json();
export const DUR = META.dur;
const TL = META.lines;
let c, groups = [], WS = [];
const KEYS = /^(centimetre|SHORTER|shrinks\.?|cushions|squishes|sponge\.?|puff|tall|space\.?|five|taller\.?|dating|breakfast\.?)$/i;

const wt = (word, line) => { const x = WS.find(q => q.line === line && q.w.replace(/\W/g, '').toLowerCase() === word); return x ? x.s : TL[line][1] };
const env = (k, t) => { const a = ENV[k]; return a ? (a[Math.min(a.length - 1, Math.max(0, Math.floor(t * 30)))] || 0) : 0 };
const sm = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u) };
const seg = (t, a, b) => sm((t - a) / (b - a));
const nz = (t, k) => Math.sin(t * 17.3 + k) * .5 + Math.sin(t * 9.1 + k * 2) * .5;
const speaking = (sp, t) => TL.some(([s, a, b]) => s === sp && t >= a - .05 && t <= b);
const L = (i) => TL[i];
const S = .86, LIFT = 205, FLOOR = 1585, HY = FLOOR - 245 * S, SHY = HY - LIFT * S, LEN = 146, SH = { near: [-70, -300], far: [78, -312] };
const BX = 300, KX = 800;
const KAL = { ...KALU, stand: 1 };
const BAT = { ...BATTERY, specs: 'clear', specCol: '#1A1A1E', stand: 1 };
const HEADY = HY - (LIFT + 470) * S;                 // head centre (world)
const MARK_AM = HEADY - 128 * S * 1.25 - 6, MARK_PM = MARK_AM + 30;   // pencil marks on the frame (cartoon scale)
function ik(X, flip, side, tx, ty) {
  const lx = flip ? (X - tx) / S : (tx - X) / S, ly = (ty - SHY) / S, s0 = SH[side];
  let rx = lx - s0[0], ry = ly - s0[1]; const d0 = Math.hypot(rx, ry) || 1, mx = 2 * LEN * .985; if (d0 > mx) { rx *= mx / d0; ry *= mx / d0 }
  const d = Math.hypot(rx, ry), hh = Math.sqrt(Math.max(0, LEN * LEN - d * d / 4)); let px = -ry / d, py = rx / d; if (py < 0) { px = -px; py = -py }
  return { e: [rx / 2 + px * hh, ry / 2 + py * hh], h: [rx, ry] };
}
// times (set in init once the words are known)
export function init(cx, w) { c = cx; bind(c); WS = w; groups = groupWords(w); T_ALL = wt('all', 2) - .05; T_AT = wt('at', 2) - .05; T_ASTRO = wt('astronauts', 4) - .1; T_LIKE = wt('like', 2); T_PUFF = wt('puff', 2); T_GROW = wt('grow', 4); T_TALLER = wt('taller', 4); T_ABOUT = wt('about', 1); T_TALL = wt('tall', 3); T_MEASURE = wt('measure', 5) }
const T_INS = [L(2)[1] - .05, L(2)[2] + .1];
let T_ALL, T_AT, T_ASTRO, T_SPACE_END = L(4)[2] + .15, T_LIKE, T_PUFF, T_GROW, T_TALLER, T_ABOUT, T_TALL, T_MEASURE;
// ---------- set: warm hallway at dusk ----------
const OX = 240;
function hallLayer() {
  return layer('hall', 1560, 1920, () => {
    const g = ctx(); g.translate(OX, 0);
    // wall: sage-mint with a warm lamp gradient
    const wl = g.createLinearGradient(0, 0, 1080, 0); wl.addColorStop(0, '#BFD8C4'); wl.addColorStop(.6, '#D6E4C9'); wl.addColorStop(1, '#E9DDB8'); g.fillStyle = wl; g.fillRect(-OX, 0, 1560, FLOOR);
    g.fillStyle = 'rgba(255,255,255,.18)'; for (let x = -OX; x < 1400; x += 64) g.fillRect(x, 0, 6, FLOOR);          // soft wallpaper stripes
    // skirting
    g.fillStyle = '#F4EEE2'; g.fillRect(-OX, FLOOR - 60, 1560, 60); g.fillStyle = 'rgba(0,0,0,.1)'; g.fillRect(-OX, FLOOR - 8, 1560, 8);
    // wooden floor
    for (let y = FLOOR; y < 1920; y += 56) { g.fillStyle = (y / 56 & 1) ? '#B9814E' : '#AE7744'; g.fillRect(-OX, y, 1560, 56); for (let x = -OX + ((y / 56 & 1) ? 80 : 0); x < 1400; x += 300) { g.fillStyle = 'rgba(60,30,10,.25)'; g.fillRect(x, y, 4, 56) } }
    // door frame (left) with an open door into a dim room
    g.fillStyle = '#6F5B4E'; g.fillRect(-60, 220, 330, FLOOR - 220);
    g.fillStyle = '#4E3F36'; g.fillRect(-60, 220, 330, 40);
    g.fillStyle = '#F7F2E8'; g.fillRect(-110, 170, 50, FLOOR - 170); g.fillRect(270, 170, 50, FLOOR - 170); g.fillRect(-110, 170, 430, 50);
    g.strokeStyle = '#2B1D16'; g.lineWidth = 5; g.strokeRect(-110, 170, 430, FLOOR - 170); g.strokeRect(-60, 220, 330, FLOOR - 220);
    g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(270, 170, 12, FLOOR - 170);
    // window (right) showing dusk
    const wx = 860, wy = 360; g.fillStyle = '#F7F2E8'; g.fillRect(wx - 20, wy - 20, 360, 460);
    const sk = g.createLinearGradient(0, wy, 0, wy + 420); sk.addColorStop(0, '#5B6FA8'); sk.addColorStop(.6, '#E79A84'); sk.addColorStop(1, '#F6C48E'); g.fillStyle = sk; g.fillRect(wx, wy, 320, 420);
    g.fillStyle = '#7A5A72'; for (const [x, w, h] of [[0, 90, 120], [80, 70, 180], [150, 110, 90], [250, 70, 150]]) g.fillRect(wx + x, wy + 420 - h, w, h);
    g.fillStyle = 'rgba(255,240,200,.9)'; g.beginPath(); g.arc(wx + 230, wy + 120, 26, 0, 7); g.fill();
    g.strokeStyle = '#2B1D16'; g.lineWidth = 5; g.strokeRect(wx, wy, 320, 420); g.fillStyle = '#F7F2E8'; g.fillRect(wx + 155, wy, 10, 420); g.fillRect(wx, wy + 205, 320, 10);
    g.fillStyle = '#D9805F'; g.fillRect(wx - 70, wy - 50, 60, 540); g.fillRect(wx + 330, wy - 50, 60, 540); g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(wx - 40, wy - 50, 12, 540); g.fillRect(wx + 360, wy - 50, 12, 540);
    g.fillStyle = '#8A5A3C'; g.fillRect(wx - 90, wy - 64, 500, 16);
    // wall lamp (warm) and a framed abstract picture
    g.fillStyle = '#E8B04A'; g.beginPath(); g.moveTo(540, 300); g.lineTo(620, 300); g.lineTo(650, 380); g.lineTo(510, 380); g.closePath(); g.fill(); g.stroke();
    const lg = g.createRadialGradient(580, 400, 10, 580, 400, 420); lg.addColorStop(0, 'rgba(255,220,140,.45)'); lg.addColorStop(1, 'rgba(255,220,140,0)'); g.fillStyle = lg; g.fillRect(160, 0, 840, 900);
    g.fillStyle = '#F7F2E8'; g.fillRect(470, 520, 220, 270); g.strokeRect(470, 520, 220, 270); g.fillStyle = '#F2B66B'; g.beginPath(); g.arc(545, 630, 50, 0, 7); g.fill(); g.fillStyle = '#5E8C7A'; g.fillRect(600, 600, 60, 150); g.fillStyle = '#D9805F'; g.beginPath(); g.moveTo(490, 770); g.lineTo(580, 680); g.lineTo(670, 770); g.closePath(); g.fill();
    // shoe rack + plant (right foreground wall)
    g.fillStyle = '#9C6B45'; g.fillRect(1110, FLOOR - 220, 230, 220); g.strokeRect(1110, FLOOR - 220, 230, 220); g.fillStyle = '#7E5536'; g.fillRect(1110, FLOOR - 120, 230, 10);
    g.fillStyle = '#C0463B'; g.fillRect(1130, FLOOR - 165, 80, 40); g.fillStyle = '#3F6FA8'; g.fillRect(1230, FLOOR - 160, 80, 36); g.fillStyle = '#EDEDED'; g.fillRect(1140, FLOOR - 60, 90, 40);
    g.fillStyle = '#C46A3C'; g.fillRect(-200, FLOOR - 170, 110, 120); g.fillStyle = '#4F8A55'; for (let k = 0; k < 7; k++) { g.beginPath(); g.ellipse(-145 + Math.sin(k * 2.1) * 50, FLOOR - 240 - k * 20, 26, 70, Math.sin(k) * .8, 0, 7); g.fill() }
  });
}
// pencil marks on the right jamb (drawn sharp, in world coords)
function marks(t) {
  const x0 = 258, g = ctx();
  // older family marks (no text)
  g.strokeStyle = 'rgba(70,60,60,.45)'; g.lineWidth = 4; for (const y of [1050, 1180, 1290]) { g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + 60, y); g.stroke() }
  g.strokeStyle = '#D8433A'; g.lineWidth = 7; g.beginPath(); g.moveTo(x0 - 6, MARK_AM); g.lineTo(x0 + 70, MARK_AM); g.stroke();   // this morning (red)
  const u = seg(t, .05, .6); g.strokeStyle = '#2E2A30'; g.lineWidth = 7; g.beginPath(); g.moveTo(x0 - 6, MARK_PM); g.lineTo(x0 - 6 + 76 * u, MARK_PM); g.stroke();   // tonight (pencil)
}
// ---------- characters ----------
const SIPS = [[L(1)[2] + .05, L(2)[1] + .2], [L(6)[2] + .05, DUR + 1]];
const sipAmt = (t) => SIPS.reduce((m, [a, b]) => Math.max(m, seg(t, a, a + .4) * (1 - seg(t, b - .35, b))), 0);
function kalu(t) {
  const sp = speaking('k', t), sip = sipAmt(t);
  let f = { brow: -.12, look: [.9, 0], mouth: 'flat', wide: .3 };
  if (sp) f = { brow: -.12, look: [.9, 0], mouth: 'talk', open: clamp(env('k', t) * .6, .1, .3), wide: .14, wideNow: nz(t * 1.2, 1) * .06 };
  if (t >= L(6)[1] - .1) f = { ...f, brow: -.45 };
  const restF = { ...ik(KX, true, 'far', KX - 60, SHY - 130), hand: 'fist' };
  const mouthP = [KX - S * 6 - 62, HEADY + 78 * S];
  const gx = lerp(KX - 90, mouthP[0] - 8, sip), gy = lerp(SHY - 120, mouthP[1] + 18, sip);
  const near = { ...ik(KX, true, 'near', gx, gy), hand: 'fist' };
  return { face: f, arms: { near, far: restF }, headTilt: Math.sin(t * 1.4) * .008 - .03 * sip, glass: { x: gx - 8, y: gy + 52, up: sip } };
}
function battery(t) {
  const sp = speaking('b', t);
  let f = { brow: .25, lid: .1, look: [.9, .05], mouth: 'flat', wide: .2 };
  if (sp) f = { ...f, mouth: 'talk', open: clamp(env('b', t) * 1.0, .16, .65), wide: .21, wideNow: nz(t * 1.7, 5) * .25 };
  let near = { ...ik(BX, false, 'near', BX + 70, SHY + 150), hand: 'rest' }, far = { ...ik(BX, false, 'far', BX + 70, SHY + 140), hand: 'rest' };
  let turn = .55, tilt = 0, hop = 0;
  if (t < L(1)[1]) {                                   // L1: shocked, pointing up at the red morning mark behind him
    f = { ...f, brow: .7, browUp: 1, eye: 1.12, pupil: .8, look: [-.5, -.8] }; turn = -.2; tilt = .04;
    near = { ...ik(BX, false, 'near', BX + 40, SHY - 120), hand: 'open' }; far = { ...ik(BX, false, 'far', BX + 110, SHY - 110), hand: 'open' };
  } else if (t < L(3)[1] - .1) { f = { ...f, brow: .55, look: [.9, 0] } }             // listening, worried
  else if (t < L(5)[1] - .1) {                          // L4: relieved, arms up
    const u = seg(t, L(3)[1] - .1, L(3)[1] + .3); f = { ...f, brow: -.1, mouth: sp ? f.mouth : 'smile', eye: 1.05 }; hop = Math.abs(Math.sin((t - L(3)[1]) * 7)) * 14 * u * (t < L(3)[2] ? 1 : 0);
    near = { ...ik(BX, false, 'near', lerp(BX + 70, BX - 110, u), lerp(SHY + 150, SHY - 520, u)), hand: 'open' }; far = { ...ik(BX, false, 'far', lerp(BX + 70, BX + 260, u), lerp(SHY + 140, SHY - 520, u)), hand: 'open' };
  } else if (t < L(6)[1] - .1) {                        // L6: scheming
    f = { ...f, brow: -.45, lid: .45, mouth: sp ? f.mouth : 'smirk', look: [.9, .1] }; tilt = -.05;
    near = { ...ik(BX, false, 'near', BX + 90, HEADY + 115), hand: 'fist' };         // hand on chin
  } else {                                              // L7: deflates
    const u = seg(t, L(6)[2] - .2, L(6)[2] + .3); f = { ...f, brow: lerp(-.3, .5, u), lid: lerp(.3, .15, u), mouth: u > .5 ? 'o' : 'smirk', open: .3 };
  }
  return { face: f, arms: { near, far }, headTilt: -.02 + Math.sin(t * 1.3) * .012 + tilt, turn, hop };
}
function people(t, opts = {}) {
  shadowBlob(BX + 30, FLOOR + 12, 170, 20, .2); shadowBlob(KX - 30, FLOOR + 12, 170, 20, .2);
  const bst = battery(t), kst = kalu(t);
  kpSeated({ ...BAT, x: BX, y: HY, s: S, flip: false, face: bst.face, arms: bst.arms, headTilt: bst.headTilt, turn: bst.turn, hop: bst.hop });
  kpSeated({ ...KAL, x: KX, y: HY, s: S, flip: true, face: kst.face, arms: kst.arms, headTilt: kst.headTilt, turn: .55 });
  chaiGlass(kst.glass.x, kst.glass.y, 1.05, .85 - kst.glass.up * .25, 0, t);
}
// ---------- spine insert ----------
function vert(x, y, w, h) {
  rrect(x - w / 2, y - h / 2, w, h, 22, '#F3E7CF', () => { fillPoly([[x - w / 2, y + h * .18], [x + w / 2, y + h * .18], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2]], '#DCCBA8') }, 6);
  poly([[x + w / 2 - 6, y - h * .3], [x + w / 2 + 90, y - h * .05], [x + w / 2 + 96, y + h * .2], [x + w / 2 - 6, y + h * .3]], '#EBDDBF', null, 6);   // bony back spike
}
function disc(x, y, w, h, mood, t, k) {
  ell(x, y, w / 2, h / 2, '#F49AAA', () => fillEll(x, y + h * .25, w / 2, h * .3, '#E07D90'), 6);
  const g = ctx(), ey = y - h * .08, sep = 26; g.fillStyle = '#2B1D16';
  if (mood === 'squish') { g.lineWidth = 5; g.strokeStyle = '#2B1D16'; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x + s * sep - 9, ey - 6); g.lineTo(x + s * sep + 3 * s, ey); g.lineTo(x + s * sep - 9, ey + 6); g.stroke() } }
  else { for (const s of [-1, 1]) { g.beginPath(); g.arc(x + s * sep, ey, 6.5, 0, 7); g.fill() } g.lineWidth = 4.5; g.strokeStyle = '#2B1D16'; g.beginPath(); g.arc(x, ey + 6, 9, .2, Math.PI - .2); g.stroke() }
  if (mood === 'puff') { g.save(); g.globalAlpha = .9; g.fillStyle = '#FFF6C9'; const tw = Math.sin(t * 8 + k) * .5 + .5; for (const s of [-1, 1]) { g.beginPath(); g.arc(x + s * (w / 2 + 26), y - 10, 6 + tw * 5, 0, 7); g.fill() } g.restore() }
}
function spine(cx, cy, squash, mood, t) {          // vertical stack: 5 bones and 4 cushions; squash 0..1 flattens the cushions
  const vh = 92, dh = lerp(50, 22, squash), dw = lerp(170, 205, squash); let y = cy - (5 * vh + 4 * dh) / 2;
  const ys = []; for (let i = 0; i < 5; i++) { ys.push(['v', y + vh / 2]); y += vh; if (i < 4) { ys.push(['d', y + dh / 2]); y += dh } }
  for (const [k, yy] of ys) if (k === 'v') vert(cx, yy, 230, vh - 8);
  ys.filter(q => q[0] === 'd').forEach(([, yy], i) => disc(cx, yy, dw, dh + 14, mood, t, i));
}
function insert(t) {
  const g = ctx(), lt = t - T_INS[0];
  if (t < T_ALL) {                                  // (a) cushions between the bones
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#CFE7F0'); bg.addColorStop(1, '#F3E9D6'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.save(); g.globalAlpha = .25; g.drawImage(blurred('hallB2', hallLayer(), 24), -OX - 200, -300, 1560 * 1.4, 1920 * 1.4); g.restore();
    const z = 1.35 + lt * .06; g.save(); g.translate(W / 2, 820); g.scale(z, z); g.translate(-W / 2, -820);
    spine(470, 820, 0, 'happy', t);
    g.restore(); return;
  }
  if (t < T_AT) {                                   // (b) all day gravity squishes them, like a sponge under books
    const u = seg(t, T_ALL + .1, T_ALL + 1.4), sq = seg(t, T_LIKE - .1, T_LIKE + .5);
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#FFE3A8'); bg.addColorStop(1, '#F6C995'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    // sun arcing across the day
    const a = lerp(Math.PI * .95, Math.PI * .05, seg(t, T_ALL, T_AT)); fillEll(540 + Math.cos(a) * 420, 420 - Math.sin(a) * 200, 70, 70, '#FFF3B0');
    g.save(); g.translate(330, 860); g.scale(.82, .82); g.translate(-330, -860); spine(300, 880, u, u > .5 ? 'squish' : 'happy', t); g.restore();
    // sponge squished by a stack of books
    const sx = 800, base = 1240, sh = lerp(170, 90, sq), sw = lerp(240, 290, sq);
    rrect(sx - sw / 2, base - sh, sw, sh, 22, '#F7D648', () => { for (const [hx, hy] of [[-.3, .3], [.2, .55], [-.1, .75], [.3, .2], [0, .4]]) fillEll(sx + hx * sw, base - sh + hy * sh, 14, 9 * sh / 170, '#D9B52E'); fillPoly([[sx - sw / 2, base - sh * .25], [sx + sw / 2, base - sh * .25], [sx + sw / 2, base], [sx - sw / 2, base]], '#5FAF6A') }, 6);
    const drop = lerp(-500, 0, seg(t, T_LIKE - .5, T_LIKE - .1)), top = base - sh + drop;
    const books = [['#C0463B', 270], ['#3F6FA8', 250], ['#5E8C7A', 280]]; let by = top;
    for (const [col, bw] of books) { by -= 58; rrect(sx - bw / 2, by, bw, 58, 8, col, () => fillPoly([[sx - bw / 2, by + 40], [sx + bw / 2, by + 40], [sx + bw / 2, by + 58], [sx - bw / 2, by + 58]], dark(col, .2)), 5); rrect(sx + bw / 2 - 30, by + 8, 24, 42, 4, '#F4EEE2', null, 3) }
    return;
  }
  // (c) night: lying in bed, the cushions puff back up
  const p = seg(t, T_PUFF - .2, T_PUFF + .5);
  const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#26315F'); bg.addColorStop(1, '#4C4A86'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(255,255,230,.8)'; for (let k = 0; k < 26; k++) { const x = (k * 397) % 1040 + 20, y = (k * 211) % 640 + 60; g.beginPath(); g.arc(x, y, 3 + (k % 3), 0, 7); g.fill() }
  fillEll(830, 300, 80, 80, '#FFF6D2'); fillEll(860, 280, 70, 70, '#2D3868');            // crescent moon
  // bed
  rrect(60, 1080, 960, 150, 30, '#EEF0F8', () => fillPoly([[60, 1190], [1020, 1190], [1020, 1230], [60, 1230]], '#C9CDE0'), 6);
  rrect(40, 1230, 1000, 70, 14, '#8A5A3C', null, 6); rrect(40, 900, 60, 400, 14, '#8A5A3C', null, 6); rrect(980, 980, 60, 320, 14, '#8A5A3C', null, 6);
  rrect(120, 990, 260, 100, 44, '#FFFFFF', () => fillEll(250, 1070, 120, 18, '#E2E4EF'), 6);
  // Battery asleep in bed, x-ray strip over his back shows the cushions puffing back up
  const ls = .62, lx = 400, ly = 1090;
  ctx().save(); ctx().translate(lx, ly); ctx().rotate(-Math.PI / 2); ctx().translate(-lx, -ly);
  const sleep = { brow: .05, closed: 'flat', mouth: 'smile', wide: .18 };
  kpSeated({ ...BAT, x: lx + 120, y: ly + 370 * ls, s: ls, flip: true, face: sleep, arms: { near: { e: [40, 130], h: [70, 260], hand: 'rest' }, far: { e: [40, 130], h: [60, 250], hand: 'rest' } }, headTilt: 0, turn: .2 });
  ctx().restore();
  const xr = [590, 880, 410, 210];
  ctx().save(); ctx().globalAlpha = .82; rrect(xr[0], xr[1], xr[2], xr[3], 40, '#1D2C55', null, 6); ctx().restore();
  ctx().save(); ctx().beginPath(); ctx().roundRect(xr[0], xr[1], xr[2], xr[3], 40); ctx().clip();
  ctx().translate(xr[0] + xr[2] / 2, xr[1] + xr[3] / 2); ctx().rotate(Math.PI / 2); ctx().scale(.5, .5); spine(0, 0, 1 - p, p > .5 ? 'puff' : 'squish', t); ctx().restore();
  rrect(700, 1110, 330, 120, 30, '#5C7BC4', () => fillPoly([[700, 1190], [1030, 1190], [1030, 1230], [700, 1230]], '#4866AE'), 6);   // blanket edge
}
// ---------- space insert: Battery as an astronaut, stretching taller ----------
function space(t) {
  const g = ctx(), lt = t - T_ASTRO, grow = seg(t, T_GROW, T_TALLER + .3);
  g.fillStyle = '#0D1230'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#FFFFFF'; for (let k = 0; k < 60; k++) { const x = (k * 523) % 1080, y = (k * 331) % 1500; g.globalAlpha = .4 + (k % 4) * .15; g.beginPath(); g.arc(x, y, 1.5 + (k % 3), 0, 7); g.fill() } g.globalAlpha = 1;
  // Earth curve at the bottom
  const eg = g.createLinearGradient(0, 1450, 0, 1920); eg.addColorStop(0, '#5DA9E9'); eg.addColorStop(1, '#2C6BB0'); g.fillStyle = eg; g.beginPath(); g.ellipse(540, 2350, 1300, 900, 0, 0, 7); g.fill();
  g.fillStyle = '#6FBF73'; g.beginPath(); g.ellipse(300, 1530, 220, 60, -.1, 0, 7); g.fill(); g.beginPath(); g.ellipse(860, 1600, 180, 70, .2, 0, 7); g.fill();
  g.save(); g.globalAlpha = .35; g.strokeStyle = '#BFE3FF'; g.lineWidth = 30; g.beginPath(); g.ellipse(540, 2350, 1310, 910, 0, 0, 7); g.stroke(); g.restore();
  // floating astronaut Battery
  const fx = 540 + Math.sin(lt * 1.3) * 18, fy = 1000 + Math.sin(lt * 1.7) * 22, rot = -.12 + Math.sin(lt * .9) * .05;
  g.save(); g.translate(fx, fy); g.rotate(rot); g.scale(1, 1 + grow * .09); g.translate(-fx, -fy);
  const AS = { ...BATTERY, specs: 'clear', specCol: '#1A1A1E', suit: false, top: 'tee', topCol: '#F1F1EE', pant: '#E4E4DF', shoe: '#BDBDB8', stand: 1 };
  const s = .82, hy = fy + 300 * s;
  rrect(fx - 150 * s, hy - (LIFT + 340) * s, 120 * s, 260 * s, 20, '#D9D9D3', null, 5);   // backpack
  const f = { brow: lerp(.3, -.1, grow), eye: 1.08, look: [.6, -.3], mouth: grow > .3 ? 'smile' : 'o', open: .4 };
  const arm = (side, ang) => ({ e: [Math.cos(ang) * 140, Math.sin(ang) * 140], h: [Math.cos(ang) * 270, Math.sin(ang) * 270 - 30], hand: 'open' });
  kpSeated({ ...AS, x: fx, y: hy, s, flip: false, face: f, arms: { near: arm('near', -.4 + Math.sin(lt * 2) * .1), far: arm('far', -1.0 + Math.sin(lt * 2.2) * .1) }, headTilt: .04, turn: .3 });
  // helmet bubble
  const hx = fx + 6 * s, hcy = hy - (LIFT + 470) * s;
  g.save(); g.beginPath(); g.arc(hx, hcy, 190 * s, 0, 7); g.fillStyle = 'rgba(190,225,255,.18)'; g.fill(); g.lineWidth = 10; g.strokeStyle = '#E9EEF2'; g.stroke();
  g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(hx - 80 * s, hcy - 90 * s, 50 * s, 22 * s, -.6, 0, 7); g.fill(); g.restore();
  rrect(hx - 120 * s, hcy + 165 * s, 240 * s, 46 * s, 18, '#C9C9C2', null, 5);   // helmet collar
  g.restore();
}
// ---------- camera ----------
function camera(t) {
  const bH = [BX + 10, HEADY + 40], kH = [KX - 10, HEADY + 40];
  const K = [[0, 2.05, BX + 40, MARK_AM + 120], [1.35, 1.75, BX + 90, HEADY + 140],
    [L(1)[1] - .05, 1.05, 545, 1020], [T_ABOUT - .05, 1.9, kH[0], kH[1] + 60],
    [L(3)[1] - .05, 1.45, bH[0] + 90, bH[1] + 120], [T_TALL - .1, 2.2, bH[0] + 40, bH[1] + 10], [L(4)[1] - .05, 1.85, kH[0], kH[1] + 40],
    [T_SPACE_END, 1.95, bH[0] + 30, bH[1] + 40], [T_MEASURE - .1, 1.4, 560, 900], [L(6)[1] - .05, 2.0, kH[0], kH[1] + 50], [L(6)[2] - .1, 2.1, bH[0] + 20, bH[1] + 30]];
  let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const k = K[i], u = clamp((t - k[0]) / ((K[i + 1] ? K[i + 1][0] : DUR) - k[0])), push = 1 + u * .06;
  return { z: k[1] * push, cx: k[2], cy: k[3] };
}
export function draw(t) {
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
  if (t >= T_INS[0] && t < T_INS[1]) { insert(t); c.restore(); captions(groups, t, KEYS, 1690); finish(t); return }
  if (t >= T_ASTRO && t < T_SPACE_END) { space(t); c.restore(); captions(groups, t, KEYS, 1690); finish(t); return }
  const cm = camera(t);
  c.translate(W / 2, H / 2); c.scale(cm.z, cm.z); c.translate(-cm.cx, -cm.cy);
  c.drawImage(blurred('hallB', hallLayer(), 4), -OX, 0);
  marks(t);
  people(t);
  c.restore();
  captions(groups, t, KEYS, 1690); finish(t);
}
export const cues = [];
