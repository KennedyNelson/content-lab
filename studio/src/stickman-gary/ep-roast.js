// 2026-11-25 YouTube "The AI Refused to Roast Him" (type 3 dark/spicy comedy: roast + savage twist). Desi Goggle-Eye Toon, Battery's bedroom late at night.
// Battery (night look: purple tee, grey trackpants) sits on the edge of his bed with his phone; Kalu (canon) on a desk chair with a popcorn bowl.
// Beats: L1 hook close on Battery, punch-in on NO / L2 Kalu close / L3 Battery waves the phone -> phone insert A (his 'roast me' bubble with a flame,
// AI typing dots, AI reply pops with a pity heart) / L4 rest: Battery stunned close / L5 Kalu shaking with held-in laughter, popcorn
// / L6 Battery whiny, punch on SORRY / L7 phone insert B: angry thumbs typing, bubble sent, AI reply pops / L8 rest two-shot, Battery turns to Kalu,
// close on 'punishment' / L9 Kalu close, tiny smirk, eats popcorn. Abrupt end.
import { W, H, bind, ctx, lerp, clamp, captions, groupWords, finish, poly, ell, fillEll, fillPoly, line, rrect, layer, blurred, shadowBlob, dark, light } from '../toon/toon.js';
import { kpSeated, kpChair } from '../toon/kp.js';
import { KALU, BATTERY } from '../toon/kalu.js';
const META = await (await fetch('/data/meta.json')).json();
const ENV = await (await fetch('/data/env.json')).json();
export const DUR = META.dur;
const TL = META.lines;
let c, groups = [], WS = [];
const KEYS = /^(roast|roast\.|NO!?|mercy|enough\.?|SORRY|friend|friend\?|punishment|AI\.?|IS)$/;
const wt = (word, line, after = -1) => { const x = WS.find(q => q.line === line && q.s >= after && q.w.replace(/\W/g, '').toLowerCase() === word); return x ? x.s : TL[line][1] };
const env = (k, t) => { const a = ENV[k]; return a ? (a[Math.min(a.length - 1, Math.max(0, Math.floor(t * 30)))] || 0) : 0 };
const sm = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u) };
const seg = (t, a, b) => sm((t - a) / (b - a));
const nz = (t, k) => Math.sin(t * 17.3 + k) * .5 + Math.sin(t * 9.1 + k * 2) * .5;
const speaking = (sp, t) => TL.some(([s, a, b]) => s === sp && t >= a - .05 && t <= b);
const L = (i) => TL[i];
const S = .86, HY = 1300, FLOOR = HY + 215, LEN = 146, SH = { near: [-70, -300], far: [78, -312] };
const BX = 330, KX = 800;
const KAL = { ...KALU };
const BAT = { ...BATTERY, suit: false, top: 'tee', topCol: '#7A5BA8', pant: '#5C6470', shoe: '#E8E8E4', specs: 'clear', specCol: '#1A1A1E' };
const HEADY = HY - 470 * S;
function ik(X, flip, side, tx, ty) {
  const lx = flip ? (X - tx) / S : (tx - X) / S, ly = (ty - HY) / S, s0 = SH[side];
  let rx = lx - s0[0], ry = ly - s0[1]; const d0 = Math.hypot(rx, ry) || 1, mx = 2 * LEN * .985; if (d0 > mx) { rx *= mx / d0; ry *= mx / d0 }
  const d = Math.hypot(rx, ry), hh = Math.sqrt(Math.max(0, LEN * LEN - d * d / 4)); let px = -ry / d, py = rx / d; if (py < 0) { px = -px; py = -py }
  return { e: [rx / 2 + px * hh, ry / 2 + py * hh], h: [rx, ry] };
}
let T_IS, T_NO, T_LOOK, T_AND4, T_SORRY, T_HAS, T_PUN, INS_A, INS_B;
export function init(cx, w) {
  c = cx; bind(c); WS = w; groups = groupWords(w);
  T_NO = wt('no', 0) - .06; T_LOOK = wt('look', 2) - .08; T_AND4 = wt('and', 3) - .05; T_SORRY = wt('sorry', 5) - .08;
  T_HAS = wt('has', 7) - .08; T_PUN = wt('punishment', 7) - .1;
  INS_A = [T_LOOK, T_AND4]; INS_B = [L(6)[1] - .05, T_HAS];
}
// ---------- set: Battery's bedroom, late at night ----------
const OX = 240;
function roomLayer() {
  return layer('night', 1560, 1920, () => {
    const g = ctx(); g.translate(OX, 0);
    const wl = g.createLinearGradient(0, 0, 0, FLOOR); wl.addColorStop(0, '#2C3566'); wl.addColorStop(1, '#3B4580'); g.fillStyle = wl; g.fillRect(-OX, 0, 1560, FLOOR);
    g.fillStyle = '#5A3E36'; for (let y = FLOOR; y < 1920; y += 46) { g.fillStyle = (y / 46 & 1) ? '#5A3E36' : '#634539'; g.fillRect(-OX, y, 1560, 46); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(-OX, y, 1560, 3) }
    g.fillStyle = '#2A2F55'; g.fillRect(-OX, FLOOR - 40, 1560, 40);
    // window with moon and stars (centre-left, behind the bed)
    const wx = 40, wy = 300; g.fillStyle = '#E9E4F2'; g.fillRect(wx - 20, wy - 20, 420, 480);
    const sk = g.createLinearGradient(0, wy, 0, wy + 440); sk.addColorStop(0, '#0F1638'); sk.addColorStop(1, '#27305E'); g.fillStyle = sk; g.fillRect(wx, wy, 380, 440);
    g.fillStyle = '#FFF4C8'; g.beginPath(); g.arc(wx + 280, wy + 110, 52, 0, 7); g.fill(); g.fillStyle = '#0F1638'; g.beginPath(); g.arc(wx + 302, wy + 96, 46, 0, 7); g.fill();
    g.fillStyle = '#FFFFFF'; for (const [x, y, r] of [[60, 60, 4], [140, 150, 3], [200, 40, 3], [90, 260, 3], [330, 300, 4], [250, 220, 2.5], [40, 380, 3], [170, 330, 2.5]]) { g.beginPath(); g.arc(wx + x, wy + y, r, 0, 7); g.fill() }
    g.fillStyle = '#1B2148'; for (const [x, w, h] of [[0, 80, 110], [85, 60, 170], [150, 90, 90], [245, 70, 140], [320, 60, 100]]) g.fillRect(wx + x, wy + 440 - h, w, h);
    g.fillStyle = '#F7D774'; for (const [x, y] of [[20, 360], [100, 300], [110, 340], [175, 380], [265, 330], [270, 370], [335, 370]]) g.fillRect(wx + x, wy + y, 10, 12);
    g.strokeStyle = '#2B1D16'; g.lineWidth = 5; g.strokeRect(wx, wy, 380, 440); g.fillStyle = '#E9E4F2'; g.fillRect(wx + 185, wy, 10, 440);
    // curtains
    g.fillStyle = '#C0577A'; g.fillRect(wx - 70, wy - 60, 70, 600); g.fillRect(wx + 380, wy - 60, 70, 600); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(wx - 40, wy - 60, 12, 600); g.fillRect(wx + 410, wy - 60, 12, 600);
    // string fairy lights across the wall
    const pts = []; for (let i = 0; i <= 24; i++) { const x = -OX + 60 + i * 60; pts.push([x, 200 + Math.sin(i * .9) * 10 + ((i % 6) - 3) ** 2 * 3]) }
    g.strokeStyle = '#1B1B22'; g.lineWidth = 3; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke();
    for (const [x, y] of pts) { const gr = g.createRadialGradient(x, y + 14, 2, x, y + 14, 34); gr.addColorStop(0, 'rgba(255,214,120,.55)'); gr.addColorStop(1, 'rgba(255,214,120,0)'); g.fillStyle = gr; g.fillRect(x - 34, y - 20, 68, 68); g.fillStyle = '#FFD878'; g.beginPath(); g.ellipse(x, y + 14, 7, 10, 0, 0, 7); g.fill() }
    // abstract poster (right wall), shelf with a plant and a little robot toy
    g.fillStyle = '#F2C14E'; g.fillRect(760, 380, 220, 300); g.fillStyle = '#E7763F'; g.beginPath(); g.arc(870, 500, 70, 0, 7); g.fill(); g.fillStyle = '#3F8C8A'; g.fillRect(790, 590, 160, 60);
    g.strokeStyle = '#2B1D16'; g.strokeRect(760, 380, 220, 300);
    g.fillStyle = '#7A5236'; g.fillRect(1030, 560, 260, 18);
    g.fillStyle = '#C46A3C'; g.fillRect(1060, 500, 56, 60); g.fillStyle = '#4F8A55'; for (let k = 0; k < 5; k++) { g.beginPath(); g.ellipse(1088 + Math.sin(k * 2) * 22, 480 - k * 12, 12, 30, Math.sin(k) * .9, 0, 7); g.fill() }
    g.fillStyle = '#B4BAC4'; g.fillRect(1170, 500, 60, 60); g.fillStyle = '#7FD3F0'; g.fillRect(1180, 515, 15, 12); g.fillRect(1205, 515, 15, 12); g.fillStyle = '#B4BAC4'; g.fillRect(1196, 482, 8, 18);
    // desk lamp glow behind Kalu
    g.fillStyle = '#7A5236'; g.fillRect(1000, 1010, 320, 20); g.fillRect(1020, 1030, 16, FLOOR - 1030); g.fillRect(1290, 1030, 16, FLOOR - 1030);
    const lg = g.createRadialGradient(1160, 980, 10, 1160, 980, 330); lg.addColorStop(0, 'rgba(255,200,110,.5)'); lg.addColorStop(1, 'rgba(255,200,110,0)'); g.fillStyle = lg; g.fillRect(830, 650, 660, 660);
    line([[1120, 1008], [1150, 900], [1200, 860]], 8, '#2B1D16'); poly([[1170, 840], [1250, 850], [1240, 900], [1180, 890]], '#E2B54A', null, 4);
    g.fillStyle = '#3F6FA8'; g.fillRect(1040, 960, 70, 50); g.fillStyle = '#C0463B'; g.fillRect(1050, 940, 50, 20);
    // bed (Battery sits on its edge): headboard, mattress, rumpled blanket, pillows
    poly([[-100, 960], [490, 960], [490, 1300], [-100, 1300]], '#6B4A32', () => fillPoly([[-100, 960], [490, 960], [490, 990], [-100, 990]], '#7E583D'));
  });
}
function bedFront() {   // mattress + blanket in front of the headboard, under Battery
  const x0 = -60, x1 = BX + 150;
  rrect(x0, HY - 30, x1 - x0, 90, 22, '#F2EEE6', () => fillPoly([[x0, HY + 30], [x1, HY + 30], [x1, HY + 60], [x0, HY + 60]], '#DDD6CA'), 5);
  poly([[x0, HY - 40], [BX - 80, HY - 70], [BX - 20, HY - 20], [BX + 40, HY + 10], [x1 - 10, HY + 6], [x1, HY + 60], [x0, HY + 60]], '#4FB3A9', () => fillPoly([[BX - 40, HY - 20], [x1, HY + 20], [x1, HY + 60], [BX - 60, HY + 60]], '#3B968D'), 5);
  rrect(x0 + 10, HY - 150, 200, 110, 40, '#FFFFFF', () => fillEll(x0 + 150, HY - 70, 60, 30, '#E6E1D8'), 5);
  poly([[x0, HY + 60], [x1, HY + 60], [x1, FLOOR + 10], [x0, FLOOR + 10]], '#6B4A32', () => fillPoly([[x0, FLOOR - 20], [x1, FLOOR - 20], [x1, FLOOR + 10], [x0, FLOOR + 10]], '#573B28'), 5);
}
// ---------- props ----------
function popcorn(x, y, s = 1, t = 0) {
  const g = ctx(); g.save(); g.translate(x, y); g.scale(s, s);
  for (let i = 0; i < 12; i++) { const a = i * 2.4, r = 30 + (i % 4) * 14; fillEll(Math.cos(a) * r * 1.3, -40 - Math.abs(Math.sin(a)) * 30 - (i % 3) * 8, 20, 17, i % 3 ? '#FFF6D8' : '#F7DB8A') }
  poly([[-100, -50], [100, -50], [76, 60], [-76, 60]], '#E04848', () => { for (const k of [-60, -20, 20, 60]) fillPoly([[k - 10, -50], [k + 10, -50], [k * .76 + 8, 60], [k * .76 - 8, 60]], '#FFFFFF') }, 5);
  g.restore();
}
function phoneSmall(x, y, s, glow = 1) {
  const g = ctx(); g.save(); g.translate(x, y); g.rotate(-.2); g.scale(s, s);
  if (glow) { const gr = g.createRadialGradient(0, -40, 10, 0, -40, 260); gr.addColorStop(0, 'rgba(140,200,255,.35)'); gr.addColorStop(1, 'rgba(140,200,255,0)'); g.fillStyle = gr; g.fillRect(-260, -300, 520, 520) }
  rrect(-48, -90, 96, 180, 16, '#1E1F24', null, 5); rrect(-40, -80, 80, 160, 10, '#1C2433', null, 0);
  rrect(-6, -56, 40, 18, 8, '#E7763F', null, 0); rrect(-34, -26, 46, 18, 8, '#5A6B86', null, 0); rrect(-34, 4, 34, 18, 8, '#5A6B86', null, 0);
  g.restore();
}
// ---------- characters ----------
const EATS = [[L(4)[2] - .1, L(5)[1] + .5], [L(8)[2] - .25, DUR + 1]];
const eatAmt = (t) => EATS.reduce((m, [a, b]) => Math.max(m, seg(t, a, a + .35) * (1 - seg(t, b - .3, b))), 0);
function kalu(t) {
  const sp = speaking('k', t), eat = eatAmt(t);
  let f = { brow: -.15, look: [.9, 0], mouth: 'flat', wide: .3 };
  if (sp) f = { brow: -.15, look: [.9, 0], mouth: 'talk', open: clamp(env('k', t) * .6, .1, .3), wide: .14, wideNow: nz(t * 1.2, 1) * .06 };
  let shake = 0;
  if (t >= L(3)[2] && t < L(4)[2] + .2) { f = { ...f, brow: .25, browUp: .2 }; shake = Math.sin(t * 38) * 4 * (1 - seg(t, L(4)[2] - .2, L(4)[2] + .2)) }   // holding in a laugh
  if (t >= T_HAS) f = { ...f, look: [.95, 0], mouth: sp ? f.mouth : 'smirk', wide: .22 };
  if (t >= L(8)[2] - .1) f = { ...f, brow: -.05, mouth: eat > .6 ? 'flat' : 'smirk' };
  const bowl = [KX - 150, HY - 70];
  const mouthP = [KX - 70, HEADY + 70];
  const hx = lerp(bowl[0] + 10, mouthP[0], eat), hy = lerp(bowl[1] - 40, mouthP[1], eat);
  return { face: f, arms: { near: { ...ik(KX, true, 'near', hx, hy), hand: 'fist' }, far: { ...ik(KX, true, 'far', bowl[0] + 60, bowl[1] - 10), hand: 'open' } }, headTilt: Math.sin(t * 1.4) * .008 + shake * .004, nod: shake * .05, bowl };
}
let holding = null;
function battery(t) {
  const sp = speaking('b', t); holding = 'phone';
  let f = { brow: .25, lid: .1, look: [.9, .05], mouth: 'flat', wide: .2 };
  if (sp) f = { ...f, mouth: 'talk', open: clamp(env('b', t) * 1.0, .16, .65), wide: .21, wideNow: nz(t * 1.7, 5) * .25 };
  let near = { ...ik(BX, false, 'near', BX + 150, HY - 240), hand: 'fist' }, far = { ...ik(BX, false, 'far', BX + 90, HY - 60), hand: 'rest' };
  let tilt = 0, hop = 0, lean = 0, ph = [BX + 165, HY - 300];
  if (t < L(0)[2] + .1) {                                   // L1: outraged, phone up, free hand flung out
    f = { ...f, brow: -.75, browUp: 0, lid: .05, eye: 1.15, wide: .12, open: sp ? clamp(env('b', t) * 1.3, .3, .8) : .5, mouth: sp ? 'talk' : 'o', wideNow: 0 }; tilt = Math.sin(t * 3) * .03; lean = Math.sin(t * 5) * .02;
    far = { ...ik(BX, false, 'far', BX + 280, HY - 340), hand: 'open' };
    if (t > T_NO) { hop = 8 * Math.abs(Math.sin((t - T_NO) * 14)) * (1 - seg(t, T_NO + .3, T_NO + .7)); f = { ...f, brow: -.6, eye: 1.2 } }
  } else if (t < L(2)[1] - .05) { f = { ...f, brow: -.3, look: [.9, 0] } }
  else if (t < L(3)[2] + .1) {                              // L3: waving the phone at Kalu
    const w = Math.sin(t * 9) * 30; ph = [BX + 210 + w, HY - 330 + w * .3]; near = { ...ik(BX, false, 'near', ph[0] - 10, ph[1] + 60), hand: 'fist' };
    f = { ...f, brow: -.35, browUp: .2, eye: 1.08 }; lean = .04;
    if (t >= T_AND4) { f = { ...f, brow: .7, browUp: .5, lid: 0, eye: 1.18, mouth: 'o', open: .5 }; ph = [BX + 150, HY - 220]; near = { ...ik(BX, false, 'near', BX + 140, HY - 160), hand: 'fist' }; lean = 0 }   // stunned
  } else if (t < L(5)[1] - .05) { f = { ...f, brow: .6, browUp: .3, lid: .25, look: [.9, .1], mouth: 'flat' }; tilt = .04 }        // L5 hurt
  else if (t < L(5)[2] + .1) {                              // L6 whiny
    f = { ...f, brow: .85, browUp: .5, lid: .1, eye: 1.05, wide: .13, wideNow: 0 }; tilt = -.05 + Math.sin(t * 6) * .03;
    far = { ...ik(BX, false, 'far', BX + 250, HY - 250), hand: 'open' };
    if (t > T_SORRY) { hop = 6 * Math.abs(Math.sin((t - T_SORRY) * 12)); f = { ...f, brow: 1, eye: 1.15 } }
  } else if (t < T_HAS) { f = { ...f, brow: -.5, lid: .3, look: [.5, .8] }; ph = [BX + 170, HY - 230]; near = { ...ik(BX, false, 'near', BX + 160, HY - 170), hand: 'fist' }; far = { ...ik(BX, false, 'far', BX + 175, HY - 190), hand: 'fist' } }   // typing
  else {                                                    // L8 rest + L9: reads the reply, slowly turns to Kalu, betrayed
    const u = seg(t, T_PUN, T_PUN + .5);
    f = { ...f, brow: lerp(.1, .75, u), browUp: lerp(0, .4, u), lid: lerp(.2, .05, u), eye: lerp(1, 1.12, u), look: [lerp(.6, 1, u), lerp(.7, 0, u)], mouth: u > .5 ? 'o' : 'flat', open: .35 };
    ph = [BX + 150, HY - 220]; near = { ...ik(BX, false, 'near', BX + 140, HY - 160), hand: 'fist' };
  }
  return { face: f, arms: { near, far }, headTilt: -.02 + Math.sin(t * 1.3) * .012 + tilt, hop, lean, ph };
}
function people(t) {
  shadowBlob(KX - 10, FLOOR + 8, 190, 22, .22);
  bedFront();
  const bst = battery(t), kst = kalu(t);
  kpSeated({ ...BAT, x: BX, y: HY, s: S, flip: false, face: bst.face, arms: bst.arms, headTilt: bst.headTilt, turn: .55, hop: bst.hop, lean: bst.lean });
  if (holding === 'phone') phoneSmall(bst.ph[0], bst.ph[1], .7, 1);
  kpChair(KX, HY, S, true, '#8E3B46');
  kpSeated({ ...KAL, x: KX, y: HY, s: S, flip: true, face: kst.face, arms: kst.arms, headTilt: kst.headTilt, nod: kst.nod, turn: .55 });
  popcorn(kst.bowl[0], kst.bowl[1], .75, t);
}
// ---------- phone inserts ----------
function flame(x, y, s) { const g = ctx(); g.save(); g.translate(x, y); g.scale(s, s); poly([[0, -40], [22, -10, 26, 10, 18, 26], [10, 40, -10, 40, -18, 26], [-26, 10, -14, -8, -6, -18], [-2, -4, 4, -20, 0, -40]], '#FF8A2A', () => fillEll(0, 20, 10, 16, '#FFD23B'), 3); g.restore() }
function heart(x, y, s, col = '#FF6B8A') { const g = ctx(); g.save(); g.translate(x, y); g.scale(s, s); poly([[0, 30], [-34, 0, -40, -26, -20, -34], [-6, -40, 0, -26, 0, -20], [0, -26, 6, -40, 20, -34], [40, -26, 34, 0, 0, 30]], col, null, 3); g.restore() }
function bubble(x, y, w, h, side, col, bars, pop, icon, t) {   // chat bubble with blank text bars (no readable text)
  if (pop <= 0) return; const g = ctx(); g.save(); const ax = side === 'r' ? x + w : x; g.translate(ax, y + h); g.scale(lerp(.6, 1, pop), lerp(.6, 1, pop)); g.globalAlpha = clamp(pop * 1.5); g.translate(-ax, -(y + h));
  rrect(x, y, w, h, 34, col, null, 0);
  bars.forEach((bw, i) => rrect(x + 34, y + 34 + i * 46, (w - 68) * bw, 22, 11, side === 'r' ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.55)', null, 0));
  if (icon === 'flame') flame(x + w - 60, y + h - 52, 1.0);
  if (icon === 'heart') heart(x + w - 56, y + h - 50, .9 + Math.sin(t * 6) * .05);
  if (icon === 'smile') { ell(x + w - 58, y + h - 50, 30, 30, '#FFD23B', null, 3); line([[x + w - 72, y + h - 44], [x + w - 58, y + h - 34, x + w - 44, y + h - 44]], 3); fillEll(x + w - 68, y + h - 58, 4, 5, '#2B1D16'); fillEll(x + w - 48, y + h - 58, 4, 5, '#2B1D16') }
  g.restore();
}
function dots(x, y, t, a) { if (a <= 0) return; const g = ctx(); g.save(); g.globalAlpha = a; rrect(x, y, 170, 80, 40, '#3A4A66', null, 0); for (let i = 0; i < 3; i++) fillEll(x + 45 + i * 40, y + 40 - Math.max(0, Math.sin(t * 9 - i)) * 10, 11, 11, '#C9D3E6'); g.restore() }
function phoneInsert(t, which) {
  const g = ctx(), t0 = which === 'A' ? INS_A[0] : INS_B[0], lt = t - t0;
  g.fillStyle = '#1C2148'; g.fillRect(0, 0, W, H);
  g.save(); g.globalAlpha = .55; g.drawImage(blurred('nightB2', roomLayer(), 22), -OX - 300, -500, 1560 * 1.5, 1920 * 1.5); g.restore();
  const gl = g.createRadialGradient(540, 900, 50, 540, 900, 800); gl.addColorStop(0, 'rgba(120,180,255,.25)'); gl.addColorStop(1, 'rgba(120,180,255,0)'); g.fillStyle = gl; g.fillRect(0, 0, W, H);
  const shake = which === 'B' && t < L(6)[2] ? Math.sin(t * 70) * 5 : 0;
  const z = 1 + lt * .035; g.save(); g.translate(W / 2 + shake, 960); g.scale(z, z); g.translate(-W / 2, -960);
  ell(540, 1680, 330, 180, BAT.skin, () => fillEll(600, 1740, 260, 110, dark(BAT.skin, .14)), 5);
  for (let k = 0; k < 3; k++) ell(252, 1010 + k * 130, 46, 58, BAT.skin, () => fillEll(264, 1030 + k * 130, 30, 40, dark(BAT.skin, .12)), 5);
  rrect(250, 300, 580, 1200, 70, '#15161B', null, 6); rrect(276, 328, 528, 1144, 50, '#121826', null, 0);
  rrect(470, 344, 140, 26, 13, '#15161B', null, 0);
  // header: round AI avatar (a friendly sparkle) and a name bar
  rrect(276, 380, 528, 120, 0, '#1A2234', null, 0);
  ell(350, 440, 38, 38, '#7FD3F0', () => { }, 3); g.fillStyle = '#FFFFFF'; g.beginPath(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, r = k & 1 ? 8 : 24; g.lineTo(350 + Math.cos(a) * r, 440 + Math.sin(a) * r) } g.closePath(); g.fill();
  rrect(408, 422, 160, 20, 10, '#56657F', null, 0); fillEll(590, 432, 8, 8, '#5BD68A');
  g.save(); g.beginPath(); g.rect(276, 500, 528, 840); g.clip();
  if (which === 'A') {
    bubble(470, 560, 300, 150, 'r', '#E7763F', [.75, .45], 1, 'flame', t);
    const ar = L(3)[1] - .2;
    dots(310, 760, t, seg(t, t0 + .25, t0 + .4) * (1 - seg(t, ar - .05, ar + .05)));
    bubble(310, 760, 420, 196, 'l', '#2F3D5A', [.95, .8, .5], seg(t, ar, ar + .18), 'heart', t);
  } else {
    const up = 0; // earlier messages, scrolled up
    bubble(470, 520 - up, 300, 110, 'r', '#E7763F', [.6], 1, 'flame', t);
    bubble(310, 650, 420, 150, 'l', '#2F3D5A', [.95, .5], 1, 'heart', t);
    const typed = clamp((t - L(6)[1]) / (L(6)[2] - L(6)[1])), sent = seg(t, L(6)[2], L(6)[2] + .15);
    bubble(450, 840, 320, 110, 'r', '#E7763F', [Math.max(.08, typed * .8)], sent > 0 ? 1 : .001, null, t);
    const ar = L(7)[1] - .2;
    dots(310, 980, t, seg(t, L(6)[2] + .2, L(6)[2] + .35) * (1 - seg(t, ar - .05, ar + .05)));
    bubble(310, 980, 440, 196, 'l', '#2F3D5A', [.9, .95, .55], seg(t, ar, ar + .18), 'smile', t);
  }
  g.restore();
  // keyboard while typing (insert B), thumbs over it
  if (which === 'B' && t < L(6)[2] + .1) {
    rrect(276, 1180, 528, 292, 0, '#232B3D', null, 0);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 9; k++) rrect(292 + k * 56 + r * 14, 1200 + r * 78, 46, 62, 10, '#3A4560', null, 0);
    const j = Math.floor(t * 12); for (const [hx, ph] of [[380, 0], [700, 1]]) { const jy = (j + ph) % 2 ? -18 : 0; ell(hx + ((j * 37 + ph * 50) % 60) - 30, 1330 + jy, 56, 92, BAT.skin, () => fillEll(hx + 12, 1360 + jy, 34, 60, dark(BAT.skin, .12)), 5, ph ? -.5 : .5) }
  } else {
    rrect(276, 1360, 528, 112, 0, '#1A2234', null, 0); rrect(300, 1385, 400, 60, 30, '#2A3550', null, 0); fillEll(750, 1415, 30, 30, '#E7763F');
    const th = 1 + Math.sin(t * 2) * .02; ell(860 * th, 1330, 58, 120, BAT.skin, () => fillEll(875, 1360, 36, 80, dark(BAT.skin, .12)), 5, -.6);
  }
  g.restore();
}
// ---------- camera ----------
function camera(t) {
  const bH = [BX + 10, HEADY + 40], kH = [KX + 10, HEADY + 40];
  const K = [[0, 2.3, bH[0] + 70, bH[1] + 40], [wt('roast', 0) - .06, 1.55, bH[0] + 120, bH[1] + 230], [T_NO, 2.5, bH[0] + 30, bH[1] + 30],
    [L(1)[1] - .05, 2.0, kH[0], kH[1] + 60],
    [L(2)[1] - .05, 1.12, 560, 1080],
    [T_AND4, 2.25, bH[0] + 30, bH[1] + 40],
    [L(4)[1] - .05, 1.7, kH[0] - 40, kH[1] + 170], [wt('is', 4) - .06, 2.35, kH[0], kH[1] + 40],
    [L(5)[1] - .05, 1.75, bH[0] + 60, bH[1] + 100], [T_SORRY, 2.35, bH[0] + 30, bH[1] + 30],
    [T_HAS, 1.1, 560, 1080], [T_PUN, 2.25, bH[0] + 40, bH[1] + 40],
    [L(8)[1] - .1, 2.2, kH[0], kH[1] + 50]];
  let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const k = K[i], u = clamp((t - k[0]) / ((K[i + 1] ? K[i + 1][0] : DUR) - k[0])), push = 1 + u * .06;
  return { z: k[1] * push, cx: k[2], cy: k[3] };
}
export function draw(t) {
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
  if (t >= INS_A[0] && t < INS_A[1]) { phoneInsert(t, 'A'); c.restore(); captions(groups, t, KEYS, 1690); finish(t); return }
  if (t >= INS_B[0] && t < INS_B[1]) { phoneInsert(t, 'B'); c.restore(); captions(groups, t, KEYS, 1690); finish(t); return }
  const cm = camera(t);
  c.translate(W / 2, H / 2); c.scale(cm.z, cm.z); c.translate(-cm.cx, -cm.cy);
  c.drawImage(blurred('nightB', roomLayer(), 4), -OX, 0);
  people(t);
  c.restore();
  captions(groups, t, KEYS, 1690); finish(t);
}
export const cues = [];
