// 2026-11-23 YouTube "He Saved 8,000 by Spending 12,000" (type 2 relatable comedy). Desi Goggle-Eye Toon, bright apartment entrance, morning.
// Kalu (canon, coffee mug) and Battery standing. Battery walks in behind a tower of delivery boxes from the Black Friday sale.
// Beats: L1 hook close on Battery, pull back to the box tower / L2 Kalu close, deadpan / L3 Battery sheepish then proud, punch-in on SAVED
// / L4 Kalu two-shot / L5 inserts: pasta maker rises out of a box, massage gun out of a box, then Battery close holding a weird gadget
// / L6 Kalu close / L7 Battery hugs the pasta maker, whiny / L8 two-shot push, cut to Kalu close on 'hundred percent', Battery deflates
// / phone buzz -> phone insert (the same gadget, 2+1 badge) / L9 Battery tempted, thumb over the button / last beat: Kalu deadpan. Abrupt end.
import { W, H, bind, ctx, lerp, clamp, captions, groupWords, finish, poly, ell, fillEll, fillPoly, line, rrect, layer, blurred, shadowBlob, dark, light } from '../toon/toon.js';
import { kpSeated } from '../toon/kp.js';
import { KALU, BATTERY } from '../toon/kalu.js';
const META = await (await fetch('/data/meta.json')).json();
const ENV = await (await fetch('/data/env.json')).json();
export const DUR = META.dur;
const TL = META.lines;
let c, groups = [], WS = [];
const KEYS = /^(SAVED|eight|Black|Friday|spend\??|Twelve|pasta|massage|SEVENTY|hundred|free\.?)$/i;
const wt = (word, line) => { const x = WS.find(q => q.line === line && q.w.replace(/\W/g, '').toLowerCase() === word); return x ? x.s : TL[line][1] };
const env = (k, t) => { const a = ENV[k]; return a ? (a[Math.min(a.length - 1, Math.max(0, Math.floor(t * 30)))] || 0) : 0 };
const sm = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u) };
const seg = (t, a, b) => sm((t - a) / (b - a));
const nz = (t, k) => Math.sin(t * 17.3 + k) * .5 + Math.sin(t * 9.1 + k * 2) * .5;
const speaking = (sp, t) => TL.some(([s, a, b]) => s === sp && t >= a - .05 && t <= b);
const L = (i) => TL[i];
const S = .86, LIFT = 205, FLOOR = 1585, HY = FLOOR - 245 * S, SHY = HY - LIFT * S, LEN = 146, SH = { near: [-70, -300], far: [78, -312] };
const BX = 380, KX = 830;
const KAL = { ...KALU, stand: 1 };
const BAT = { ...BATTERY, specs: 'clear', specCol: '#1A1A1E', stand: 1 };
const HEADY = HY - (LIFT + 470) * S;
function ik(X, flip, side, tx, ty) {
  const lx = flip ? (X - tx) / S : (tx - X) / S, ly = (ty - SHY) / S, s0 = SH[side];
  let rx = lx - s0[0], ry = ly - s0[1]; const d0 = Math.hypot(rx, ry) || 1, mx = 2 * LEN * .985; if (d0 > mx) { rx *= mx / d0; ry *= mx / d0 }
  const d = Math.hypot(rx, ry), hh = Math.sqrt(Math.max(0, LEN * LEN - d * d / 4)); let px = -ry / d, py = rx / d; if (py < 0) { px = -px; py = -py }
  return { e: [rx / 2 + px * hh, ry / 2 + py * hh], h: [rx, ry] };
}
let T_BF, T_TW, T_SAVED, T_PASTA, T_MASS, T_AND, T_HUND, T_NOT;
const T_BUZZ = L(8)[1] - .62, T_PH = [L(7)[2] + .12, L(8)[1] + .95];
export function init(cx, w) { c = cx; bind(c); WS = w; groups = groupWords(w); T_BF = wt('black', 0) - .05; T_TW = wt('but', 2) - .08; T_SAVED = wt('saved', 2); T_PASTA = L(4)[1] - .05; T_MASS = wt('massage', 4) - .12; T_AND = wt('and', 4) - .05; T_HUND = wt('hundred', 7) - .12; T_NOT = L(7)[1] }
// ---------- set: bright apartment entrance, morning ----------
const OX = 240;
function roomLayer() {
  return layer('entry', 1560, 1920, () => {
    const g = ctx(); g.translate(OX, 0);
    const wl = g.createLinearGradient(0, 0, 1080, 0); wl.addColorStop(0, '#F6D3B8'); wl.addColorStop(.55, '#F9DFC6'); wl.addColorStop(1, '#F3E6CF'); g.fillStyle = wl; g.fillRect(-OX, 0, 1560, FLOOR);
    g.fillStyle = '#E9B99A'; g.fillRect(-OX, FLOOR - 520, 1560, 12);             // chair rail
    g.fillStyle = '#EFC7A8'; g.fillRect(-OX, FLOOR - 508, 1560, 448);            // lower wall band
    g.fillStyle = '#FFFFFF'; g.fillRect(-OX, FLOOR - 60, 1560, 60); g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(-OX, FLOOR - 8, 1560, 8);
    // light tiled floor
    for (let y = FLOOR; y < 1920; y += 70) for (let x = -OX + ((y / 70 & 1) ? 0 : 60); x < 1400; x += 120) { g.fillStyle = ((x / 120 + y / 70) & 1) ? '#E8E1D6' : '#DED6C9'; g.fillRect(x, y, 120, 70); g.fillStyle = 'rgba(0,0,0,.06)'; g.fillRect(x, y, 2, 70) }
    // open front door (left), bright corridor behind
    g.fillStyle = '#CFE3EA'; g.fillRect(-40, 300, 330, FLOOR - 300);
    g.fillStyle = '#B7D2DC'; g.fillRect(-40, FLOOR - 200, 330, 200);
    g.fillStyle = '#FFFFFF'; g.fillRect(-90, 250, 50, FLOOR - 250); g.fillRect(290, 250, 50, FLOOR - 250); g.fillRect(-90, 250, 430, 50);
    g.strokeStyle = '#2B1D16'; g.lineWidth = 5; g.strokeRect(-90, 250, 430, FLOOR - 250); g.strokeRect(-40, 300, 330, FLOOR - 300);
    // the door itself swung open into the room (teal panel in perspective)
    g.fillStyle = '#3F8C8A'; g.beginPath(); g.moveTo(-40, 300); g.lineTo(-200, 240); g.lineTo(-200, FLOOR + 60); g.lineTo(-40, FLOOR); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#E2B54A'; g.beginPath(); g.arc(-170, 960, 12, 0, 7); g.fill(); g.stroke();
    // big window (right) with morning sky, plants on the sill
    const wx = 900, wy = 330; g.fillStyle = '#FFFFFF'; g.fillRect(wx - 22, wy - 22, 384, 484);
    const sk = g.createLinearGradient(0, wy, 0, wy + 440); sk.addColorStop(0, '#8CC8F0'); sk.addColorStop(1, '#DDF0FA'); g.fillStyle = sk; g.fillRect(wx, wy, 340, 440);
    g.fillStyle = '#FFFFFF'; for (const [x, y, r] of [[80, 90, 40], [120, 80, 50], [165, 95, 38], [250, 200, 30], [280, 190, 40]]) { g.beginPath(); g.arc(wx + x, wy + y, r, 0, 7); g.fill() }
    g.fillStyle = '#A9C4D6'; for (const [x, w, h] of [[0, 90, 150], [95, 70, 220], [170, 100, 120], [275, 65, 180]]) g.fillRect(wx + x, wy + 440 - h, w, h);
    g.strokeStyle = '#2B1D16'; g.strokeRect(wx, wy, 340, 440); g.fillStyle = '#FFFFFF'; g.fillRect(wx + 165, wy, 10, 440);
    g.fillStyle = '#F2C14E'; g.fillRect(wx - 80, wy - 50, 60, 560); g.fillRect(wx + 360, wy - 50, 60, 560); g.fillStyle = 'rgba(0,0,0,.1)'; g.fillRect(wx - 50, wy - 50, 12, 560); g.fillRect(wx + 390, wy - 50, 12, 560);
    g.fillStyle = '#7A5236'; g.fillRect(wx - 100, wy - 64, 540, 16);
    g.fillStyle = '#C46A3C'; g.fillRect(wx + 30, wy + 400, 70, 60); g.fillRect(wx + 240, wy + 405, 60, 55); g.fillStyle = '#4F8A55';
    for (let k = 0; k < 5; k++) { g.beginPath(); g.ellipse(wx + 65 + Math.sin(k * 2) * 26, wy + 380 - k * 14, 14, 36, Math.sin(k) * .9, 0, 7); g.fill(); g.beginPath(); g.ellipse(wx + 270 + Math.cos(k * 2) * 20, wy + 385 - k * 12, 12, 30, Math.cos(k) * .9, 0, 7); g.fill() }
    // round mirror + key hooks by the door, a slim console table
    g.fillStyle = '#E2B54A'; g.beginPath(); g.arc(560, 560, 120, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#DCEFF5'; g.beginPath(); g.arc(560, 560, 98, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,255,255,.6)'; g.beginPath(); g.ellipse(520, 520, 30, 12, -.7, 0, 7); g.fill();
    g.fillStyle = '#7A5236'; g.fillRect(430, 940, 260, 20); g.fillRect(450, 960, 14, 330); g.fillRect(656, 960, 14, 330); g.fillRect(450, 1150, 220, 12);
    g.fillStyle = '#D9805F'; g.fillRect(470, 880, 60, 60); g.fillStyle = '#4F8A55'; g.beginPath(); g.ellipse(500, 850, 30, 45, 0, 0, 7); g.fill();
    g.fillStyle = '#3F6FA8'; g.fillRect(580, 912, 80, 28);
    // floor mat at the door
    g.fillStyle = '#C0463B'; g.fillRect(-20, FLOOR + 30, 300, 60); g.fillStyle = '#A3362D'; g.fillRect(-20, FLOOR + 75, 300, 15);
  });
}
// ---------- props ----------
function box(x, y, w, h, tint = 0, open = 0) {   // cardboard delivery box, bottom-left at x,y (no brand, no text)
  const col = ['#C99A62', '#D5A86E', '#BF8F57'][tint % 3];
  rrect(x, y - h, w, h, 6, col, () => { fillPoly([[x + w * .72, y - h], [x + w, y - h], [x + w, y], [x + w * .72, y]], dark(col, .15)); fillPoly([[x, y - h], [x + w, y - h], [x + w, y - h + 14], [x, y - h + 14]], dark(col, .08)) }, 5);
  ctx().fillStyle = 'rgba(240,225,190,.85)'; ctx().fillRect(x + w * .42, y - h, w * .14, h);          // tape strip
  ctx().fillStyle = '#FFFFFF'; ctx().fillRect(x + w * .1, y - h * .42, w * .22, h * .18);            // shipping label (blank)
  if (open) { poly([[x, y - h], [x - w * .18 * open, y - h - h * .45 * open], [x + w * .3, y - h - h * .5 * open], [x + w * .5, y - h]], light(col, .1), null, 5); poly([[x + w, y - h], [x + w * 1.18, y - h - h * .45 * open], [x + w * .7, y - h - h * .5 * open], [x + w * .5, y - h]], dark(col, .05), null, 5) }
}
function boxTower(t) {
  const sway = Math.sin(t * 2.2) * 2; const g = ctx(); g.save(); g.translate(sway, 0);
  box(20, FLOOR + 20, 250, 190, 0); box(40, FLOOR - 170, 210, 170, 1); box(10, FLOOR - 340, 240, 150, 2); box(60, FLOOR - 490, 170, 140, 0); box(90, FLOOR - 630, 120, 110, 1);
  box(560, FLOOR + 40, 150, 110, 2);                     // one small box at Battery's feet
  g.restore();
}
function mug(x, y, s = 1, steam = 0, t = 0) {
  const g = ctx(); g.save(); g.translate(x, y); g.scale(s, s);
  rrect(-34, -80, 68, 80, 12, '#F2C14E', () => fillPoly([[14, -80], [34, -80], [34, 0], [14, 0]], '#D9A633'), 4);
  g.beginPath(); g.arc(40, -42, 20, -Math.PI / 2, Math.PI / 2); g.lineWidth = 9; g.strokeStyle = '#2B1D16'; g.stroke(); g.lineWidth = 5; g.strokeStyle = '#F2C14E'; g.stroke();
  fillEll(0, -78, 30, 7, '#5A3520');
  if (steam) { g.save(); g.globalAlpha = .55 * steam; for (let i = 0; i < 2; i++) { const ph = t * 2.6 + i * 2; line([[-10 + i * 20, -92], [-22 + i * 20 + Math.sin(ph) * 10, -130], [-6 + i * 20, -170]], 6, '#FFFFFF') } g.restore() }
  g.restore();
}
function pastaMaker(x, y, s = 1) {   // chrome hand-crank pasta machine, centre-bottom at x,y
  const g = ctx(); g.save(); g.translate(x, y); g.scale(s, s);
  rrect(-120, -170, 240, 170, 18, '#C9CED6', () => { fillPoly([[60, -170], [120, -170], [120, 0], [60, 0]], '#A8AFBA'); fillPoly([[-110, -150], [-80, -150], [-80, -20], [-110, -20]], 'rgba(255,255,255,.55)') }, 5);
  rrect(-80, -205, 160, 40, 10, '#B4BAC4', null, 5);                       // roller slot
  line([[120, -110], [175, -110], [175, -40]], 10, '#2B1D16', false); line([[120, -110], [175, -110], [175, -40]], 5, '#8E96A3', false);
  rrect(160, -50, 34, 44, 10, '#C0463B', null, 4);                          // crank handle
  poly([[-70, -10], [70, -10], [60, 70], [-60, 70]], '#F4D27A', () => fillPoly([[-70, 30], [70, 30], [60, 70], [-60, 70]], '#E3BB5C'), 4);   // pasta sheet
  g.restore();
}
function massageGun(x, y, s = 1, rot = 0) {
  const g = ctx(); g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  rrect(-40, -40, 80, 190, 26, '#E7763F', () => fillPoly([[14, -40], [40, -40], [40, 150], [14, 150]], '#C95E2C'), 5);   // handle
  rrect(-150, -130, 300, 100, 46, '#3B3F48', () => fillPoly([[-150, -60], [150, -60], [150, -30], [-150, -30]], '#2A2D34'), 5);   // body
  rrect(150, -112, 50, 64, 12, '#5A5F6B', null, 5); ell(222, -80, 34, 38, '#EDEDED', () => fillEll(232, -70, 22, 26, '#CFCFCF'), 5);   // head
  fillEll(-90, -80, 10, 10, '#7FD3A0');
  g.restore();
}
function gadget(x, y, s = 1, t = 0, rot = 0) {   // the mystery gadget: teal egg, three bendy legs, spiral antenna, one blinking button
  const g = ctx(); g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  for (const k of [-1, 0, 1]) line([[k * 40, 60], [k * 70, 120], [k * 52, 170]], 9, '#2B1D16');
  for (const k of [-1, 0, 1]) { line([[k * 40, 60], [k * 70, 120], [k * 52, 170]], 5, '#B4BAC4'); fillEll(k * 52, 172, 16, 8, '#C0463B') }
  ell(0, 0, 95, 115, '#4FB3A9', () => { fillEll(40, 20, 50, 100, '#3B968D'); fillEll(-40, -50, 22, 34, 'rgba(255,255,255,.45)') }, 5);
  const sp = []; for (let i = 0; i <= 40; i++) { const a = i * .55, r = 4 + i * .55; sp.push([Math.cos(a) * r * 1.6, -115 - i * 3.2 + Math.sin(a) * r]) } line(sp, 4, '#2B1D16', true);
  fillEll(0, -245, 12, 12, '#F2C14E');
  const blink = (Math.sin(t * 9) > 0) ? '#FF4D4D' : '#9C2B2B'; ell(0, 20, 22, 22, blink, null, 4);
  g.restore();
}
// ---------- characters ----------
const SIPS = [[L(0)[2] - .2, L(1)[1] + .05], [L(5)[2] + .05, L(6)[2] - .3]];
const sipAmt = (t) => SIPS.reduce((m, [a, b]) => Math.max(m, seg(t, a, a + .4) * (1 - seg(t, b - .35, b))), 0);
function kalu(t) {
  const sp = speaking('k', t), sip = sipAmt(t);
  let f = { brow: -.15, look: [.9, 0], mouth: 'flat', wide: .3 };
  if (sp) f = { brow: -.15, look: [.9, 0], mouth: 'talk', open: clamp(env('k', t) * .6, .1, .3), wide: .14, wideNow: nz(t * 1.2, 1) * .06 };
  if (t >= L(3)[1] && t < L(4)[2]) f = { ...f, look: [.8, .35] };                 // glancing at the boxes
  if (t >= L(7)[1] - .1) f = { ...f, brow: -.45 };
  if (t >= T_PH[1]) f = { ...f, brow: -.6, look: [.85, .2] };
  const restF = { ...ik(KX, true, 'far', KX - 60, SHY - 130), hand: 'fist' };
  const mouthP = [KX - S * 6 - 62, HEADY + 78 * S];
  const gx = lerp(KX - 95, mouthP[0] - 10, sip), gy = lerp(SHY - 110, mouthP[1] + 30, sip);
  const near = { ...ik(KX, true, 'near', gx, gy), hand: 'fist' };
  return { face: f, arms: { near, far: restF }, headTilt: Math.sin(t * 1.4) * .008 - .03 * sip, mug: { x: gx - 4, y: gy + 40 } };
}
let holding = null;
function battery(t) {
  const sp = speaking('b', t); holding = null;
  let f = { brow: .25, lid: .1, look: [.9, .05], mouth: 'flat', wide: .2 };
  if (sp) f = { ...f, mouth: 'talk', open: clamp(env('b', t) * 1.0, .16, .65), wide: .21, wideNow: nz(t * 1.7, 5) * .25 };
  let near = { ...ik(BX, false, 'near', BX + 70, SHY + 150), hand: 'rest' }, far = { ...ik(BX, false, 'far', BX + 70, SHY + 140), hand: 'rest' };
  let turn = .55, tilt = 0, hop = 0;
  if (t < L(0)[2] + .1) {                                  // L1: thrilled, arms wide, little bounce
    f = { ...f, brow: -.05, browUp: .6, eye: 1.1, mouth: sp ? f.mouth : 'smile' }; hop = Math.abs(Math.sin(t * 6)) * 10;
    near = { ...ik(BX, false, 'near', BX - 150, SHY - 330), hand: 'open' }; far = { ...ik(BX, false, 'far', BX + 260, SHY - 320), hand: 'open' };
  } else if (t < L(2)[1] - .1) { f = { ...f, brow: .05, mouth: sp ? f.mouth : 'smile' } }
  else if (t < T_TW) {                                     // 'twelve thousand' - smaller, sheepish
    f = { ...f, brow: .6, lid: .25, look: [.5, .5] }; tilt = .05;
    near = { ...ik(BX, false, 'near', BX + 60, SHY - 20), hand: 'fist' }; far = { ...ik(BX, false, 'far', BX + 110, SHY - 30), hand: 'fist' };
  } else if (t < L(3)[2]) {                                // 'but I SAVED eight!' - finger up
    f = { ...f, brow: -.15, browUp: .5, eye: 1.08 }; tilt = -.03;
    near = { ...ik(BX, false, 'near', BX + 120, SHY - 330), hand: 'point' };
  } else if (t < L(5)[1] - .1) {                           // L5 (main-shot part): holding the gadget up, confused
    f = { ...f, brow: .55, browUp: .3, look: [.4, -.35], mouth: sp ? f.mouth : 'o', open: .25 }; tilt = .06 * Math.sin(t * 2);
    near = { ...ik(BX, false, 'near', BX + 150, SHY - 210), hand: 'open' }; holding = 'gadget';
  } else if (t < L(6)[2] + .1) {                           // L6/L7: hugging the pasta maker
    f = { ...f, brow: .7, browUp: .4, lid: .15, eye: 1.05 }; tilt = -.05 + Math.sin(t * 5) * .02;
    near = { ...ik(BX, false, 'near', BX + 40, SHY - 70), hand: 'open' }; far = { ...ik(BX, false, 'far', BX + 160, SHY - 90), hand: 'open' }; holding = 'pasta';
  } else if (t < T_PH[0]) {                                // L8: deflates
    const u = seg(t, T_HUND, T_HUND + .5); f = { ...f, brow: lerp(.4, .2, u), lid: lerp(.1, .45, u), mouth: 'flat' };
    near = { ...ik(BX, false, 'near', BX + 40, SHY - 70), hand: 'open' }; far = { ...ik(BX, false, 'far', BX + 160, SHY - 90), hand: 'open' }; holding = 'pasta';
  } else {                                                 // L9: tempted, looking at the phone
    f = { ...f, brow: -.35, lid: .35, look: [.6, .8], mouth: sp ? f.mouth : 'smirk' }; tilt = .06;
    near = { ...ik(BX, false, 'near', BX + 130, SHY - 150), hand: 'fist' }; holding = 'phone';
  }
  return { face: f, arms: { near, far }, headTilt: -.02 + Math.sin(t * 1.3) * .012 + tilt, turn, hop };
}
function phoneSmall(x, y, s, t) {
  const g = ctx(); g.save(); g.translate(x, y); g.rotate(-.25); g.scale(s, s);
  rrect(-48, -90, 96, 180, 16, '#1E1F24', null, 5); rrect(-40, -80, 80, 160, 10, '#F7F3EC', null, 0);
  fillEll(0, -20, 26, 30, '#4FB3A9'); rrect(-30, 30, 60, 26, 8, '#E7763F', null, 0);
  g.restore();
}
function people(t) {
  shadowBlob(BX + 30, FLOOR + 12, 170, 20, .2); shadowBlob(KX - 30, FLOOR + 12, 170, 20, .2);
  const bst = battery(t), kst = kalu(t);
  kpSeated({ ...BAT, x: BX, y: HY, s: S, flip: false, face: bst.face, arms: bst.arms, headTilt: bst.headTilt, turn: bst.turn, hop: bst.hop });
  if (holding === 'gadget') gadget(BX + 160, SHY - 300, .62, t, Math.sin(t * 2.4) * .25);
  if (holding === 'pasta') pastaMaker(BX + 105, SHY - 15, .6);
  if (holding === 'phone') phoneSmall(BX + 130, SHY - 175, .7, t);
  kpSeated({ ...KAL, x: KX, y: HY, s: S, flip: true, face: kst.face, arms: kst.arms, headTilt: kst.headTilt, turn: .55 });
  mug(kst.mug.x, kst.mug.y, .85, 1, t);
}
// ---------- inserts ----------
function itemInsert(t, which) {   // an opened box on the floor, the item rises out of it
  const g = ctx(), t0 = which === 'pasta' ? T_PASTA : T_MASS, lt = t - t0;
  const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, which === 'pasta' ? '#FFE7B8' : '#D7ECF7'); bg.addColorStop(1, '#F6EBDD'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  g.save(); g.globalAlpha = .3; g.drawImage(blurred('entryB2', roomLayer(), 22), -OX - 300, -500, 1560 * 1.5, 1920 * 1.5); g.restore();
  const z = 1 + lt * .05; g.save(); g.translate(W / 2, 1000); g.scale(z, z); g.translate(-W / 2, -1000);
  const rise = seg(t, t0 + .05, t0 + .45), bob = Math.sin(lt * 5) * 6;
  shadowBlob(540, 1415, 330, 34, .18);
  g.save(); g.beginPath(); g.rect(0, 0, W, 1250); g.clip();
  if (which === 'pasta') pastaMaker(540, lerp(1400, 1060, rise) + bob, 1.55); else massageGun(520, lerp(1500, 1000, rise) + bob, 1.45, -.15 + Math.sin(lt * 3) * .05);
  g.restore();
  box(260, 1420, 560, 200, which === 'pasta' ? 1 : 2, 1);
  g.restore();
}
function phoneInsert(t) {
  const g = ctx(), lt = t - T_PH[0], buzz = t < L(8)[1] ? Math.sin(t * 120) * 7 * (Math.sin(t * 15) > 0 ? 1 : 0) : 0;
  const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#F6D3B8'); bg.addColorStop(1, '#EFC7A8'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  g.save(); g.globalAlpha = .45; g.drawImage(blurred('entryB2', roomLayer(), 22), -OX - 300, -500, 1560 * 1.5, 1920 * 1.5); g.restore();
  const z = 1 + lt * .06; g.save(); g.translate(W / 2 + buzz, 960); g.scale(z, z); g.translate(-W / 2, -960);
  // hand holding the phone from below (Battery's skin): palm + fingers wrapping the left edge
  ell(540, 1560, 300, 170, BAT.skin, () => fillEll(600, 1620, 250, 110, dark(BAT.skin, .14)), 5);
  for (let k = 0; k < 3; k++) ell(258, 1000 + k * 130, 46, 58, BAT.skin, () => fillEll(270, 1020 + k * 130, 30, 40, dark(BAT.skin, .12)), 5);
  rrect(250, 330, 580, 1150, 70, '#1E1F24', null, 6); rrect(278, 360, 524, 1090, 50, '#FBF8F3', null, 0);
  rrect(470, 378, 140, 26, 13, '#1E1F24', null, 0);
  // product card: the same mystery gadget
  rrect(318, 440, 444, 520, 30, '#E4F3F1', null, 0);
  gadget(540, 720, .95, t, Math.sin(t * 2) * .08);
  // 2+1 badge pops in
  const pop = seg(t, L(8)[1] + .55, L(8)[1] + .8); if (pop > 0) { g.save(); g.translate(690, 500); g.scale(pop, pop); g.rotate(.18); ell(0, 0, 92, 92, '#FF4D4D', null, 5); g.fillStyle = '#FFFFFF'; g.font = '900 64px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('2+1', 0, 4); g.restore() }
  // rating stars + price bars (no readable text) + buy button with a cart icon
  for (let i = 0; i < 5; i++) { g.fillStyle = '#F2C14E'; g.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k & 1 ? 12 : 26; g.lineTo(360 + i * 62 + Math.cos(a) * r, 1010 + Math.sin(a) * r) } g.closePath(); g.fill() }
  rrect(330, 1060, 300, 30, 15, '#D8D2C8', null, 0); rrect(330, 1110, 200, 30, 15, '#E6E0D7', null, 0);
  const pulse = 1 + Math.max(0, Math.sin(t * 7)) * .05; g.save(); g.translate(540, 1300); g.scale(pulse, pulse);
  rrect(-200, -60, 400, 120, 60, '#E7763F', () => fillPoly([[-200, 20], [200, 20], [200, 60], [-200, 60]], '#C95E2C'), 5);
  line([[-50, -26], [-34, -26], [-20, 20], [40, 20], [52, -12], [-28, -12]], 7, '#FFFFFF', false); fillEll(-12, 34, 8, 8, '#FFFFFF'); fillEll(32, 34, 8, 8, '#FFFFFF');
  g.restore();
  // thumb hovering towards the button
  const th = seg(t, L(8)[1] + .3, L(8)[2]); ell(lerp(860, 640, th), lerp(1420, 1330, th), 58, 120, BAT.skin, () => fillEll(lerp(875, 655, th), lerp(1450, 1360, th), 36, 80, dark(BAT.skin, .12)), 5, -.7);
  g.restore();
}
// ---------- camera ----------
function camera(t) {
  const bH = [BX + 20, HEADY + 40], kH = [KX + 15, HEADY + 40];
  const K = [[0, 1.95, bH[0] + 30, bH[1] + 70], [T_BF, 1.0, 540, 1010],
    [L(1)[1] - .05, 1.95, kH[0], kH[1] + 60],
    [L(2)[1] - .05, 1.7, bH[0] + 40, bH[1] + 120], [T_SAVED - .05, 2.25, bH[0] + 50, bH[1] + 20],
    [L(3)[1] - .05, 1.12, 590, 1040],
    [T_AND, 1.75, bH[0] + 80, bH[1] - 20],
    [L(5)[1] - .05, 2.05, kH[0], kH[1] + 50],
    [L(6)[1] - .05, 1.8, bH[0] + 60, bH[1] + 130],
    [T_NOT - .05, 1.15, 600, 1030], [T_HUND, 2.3, kH[0], kH[1] + 30], [T_HUND + 1.15, 1.9, bH[0] + 40, bH[1] + 90],
    [T_PH[1], 2.0, bH[0] + 60, bH[1] + 80], [L(8)[2] + .15, 2.15, kH[0], kH[1] + 40]];
  let i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
  const k = K[i], u = clamp((t - k[0]) / ((K[i + 1] ? K[i + 1][0] : DUR) - k[0])), push = 1 + u * .06;
  return { z: k[1] * push, cx: k[2], cy: k[3] };
}
export function draw(t) {
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
  if (t >= T_PASTA && t < T_AND) { itemInsert(t, t < T_MASS ? 'pasta' : 'mass'); c.restore(); captions(groups, t, KEYS, 1690); finish(t); return }
  if (t >= T_PH[0] && t < T_PH[1]) { phoneInsert(t); c.restore(); captions(groups, t, KEYS, 1690); finish(t); return }
  const cm = camera(t);
  c.translate(W / 2, H / 2); c.scale(cm.z, cm.z); c.translate(-cm.cx, -cm.cy);
  c.drawImage(blurred('entryB', roomLayer(), 4), -OX, 0);
  boxTower(t);
  people(t);
  c.restore();
  captions(groups, t, KEYS, 1690); finish(t);
}
export const cues = [];
