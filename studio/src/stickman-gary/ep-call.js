// 2026-11-18 IG reel "Kalu interrupted by a call" (Stickman). Kalu (dark skin, afro, red tee) walks to bed, browses on phone,
// strips under the blanket, friend calls. Fast cut list, close-ups, phone-in-hand cutaways. Non-explicit: blanket + flying clothes only.
import { bind as bindT, label, captions, groupWords } from '../toon/toon.js';
import { bind, man, face, line, shape, rect, oval, dot, star, finish, setBoil } from './engine.js';
const META = await (await fetch('/data/meta.json')).json();
const ENVS = await (await fetch('/data/env.json')).json();
export const DUR = META.dur;
let c, groups = [], WD = [];
const KEYS = /(बहन|लंड|शांति|मुट्ठी|पंद्रह|सौ|रुपये|भेज|खड़ा|चलेगा)/;
export function init(cx, w) { c = cx; bind(c); bindT(c); WD = w; groups = groupWords(w) }
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, u) => a + (b - a) * u, eio = (u) => (u = clamp(u), u * u * (3 - 2 * u));
const pr = (t, a, b) => clamp((t - a) / (b - a));
const env = (k, t) => { const a = ENVS[k], i = Math.floor(t * 30); return a && i >= 0 && i < a.length ? a[i] : 0 };
const mouthOf = (k, t) => { const a = env(k, t); return a > .08 ? { mouth: 'open', open: Math.min(1, a * 1.1) } : { mouth: 'flat' } };
const SK_K = '#6B4226', SK_F = '#C98A5A', INK = '#141414';
const blink = (t, ph = 0) => ((t + ph) % 3.1) < .12 ? { eyes: 'closed' } : {};
function cam(z, x, y, shake, t, fn, rot = 0) { c.save(); c.translate(540 + (shake ? Math.sin(t * 61) * shake : 0), 960 + (shake ? Math.cos(t * 53) * shake : 0)); if (rot) c.rotate(rot); c.scale(z, z); c.translate(-x, -y); fn(); c.restore() }
const punch = (t, s) => 1 + .14 * Math.pow(1 - pr(t, s, s + .18), 2);
const [B0, B1] = META.buzz;
const fill = (col) => { c.fillStyle = col; c.fillRect(-400, -400, 1900, 2800) };
// ---------- heads ----------
function head(who, cx, cy, r, f, rot = 0) {
  c.save(); c.translate(cx, cy); c.rotate(rot);
  if (who === 'k') face({ ...f, r, skin: SK_K, lw: r / 14, kind: 'round', hair: 'afro', hairFill: '#17110E', hairStill: true });
  else face({ ...f, r, skin: SK_F, lw: r / 14, kind: 'round', hair: 'part', hairFill: '#2A1D16', hairStill: true, specs: 'thin' });
  if (f.lid) { const ey = -r * .2, b = r * .34 * (f.eye || 1), sk = SK_K; for (const q of [-1, 1]) { const X = q * r * .33 * (f.eye || 1) * .98; c.fillStyle = who === 'k' ? SK_K : SK_F; c.fillRect(X - b * 1.12, ey - b * 1.1, b * 2.24, b * 2.24 * f.lid * .9); line([[X - b * 1.12, ey - b * 1.1 + b * 2.24 * f.lid * .9], [X + b * 1.12, ey - b * 1.1 + b * 2.24 * f.lid * .9]], r / 14, INK, .5) } }
  c.restore();
}
function sweat(x, y, s = 1) { shape([[x, y - 26 * s], [x + 14 * s, y + 6 * s], [x, y + 20 * s], [x - 14 * s, y + 6 * s]], '#6FB7D6', 4, INK, 1) }
// ---------- room ----------
function room(t, glow = 0) {
  fill('#2C2548'); rect(-100, 1480, 1300, 600, '#1F1A36', 0); rect(140, 1650, 800, 200, '#7A3B4F', 0);
  rect(110, 330, 250, 330, '#16123A', 9); oval(250, 440, 42, 42, '#F5ECC2', 0); oval(268, 430, 38, 38, '#16123A', 0); line([[235, 330], [235, 660]], 8);
  rect(740, 380, 200, 260, '#3A3158', 8);
  rect(190, 620, 700, 560, '#5A3A2A', 9); rect(250, 690, 580, 490, '#6D4833', 0);
  if (glow) { c.save(); c.globalAlpha = glow; oval(540, 900, 200, 180, '#6FE6FF', 0); c.restore() }
}
function nightstand(t, buzz) {
  rect(790, 1060, 280, 46, '#5A3A2A', 8); line([[820, 1106], [820, 1620]], 16, '#4A2E20', 0); line([[1040, 1106], [1040, 1620]], 16, '#4A2E20', 0);
  rect(840, 1000, 130, 60, '#58A7E0', 7); shape([[880, 1000], [900, 950], [930, 1000]], '#FFF', 5, INK, 1);
  if (!buzz) { rect(980, 1040, 90, 20, '#111', 5) }
}
function blanket(t, lump = 0) {
  const y = 1140 + lump; shape([[60, y + 40], [300, y], [540, y + 10], [800, y], [1020, y + 40], [1060, 1500], [20, 1500]], '#2F7A6E', 9, INK, 1.2);
  line([[120, y + 130], [540, y + 90], [960, y + 130]], 12, '#256458', 1); for (let i = 0; i < 4; i++) oval(200 + i * 230, y + 230 + (i % 2) * 90, 26, 26, '#3D9181', 0);
  rect(10, 1490, 1060, 70, '#5A3A2A', 8);
}
function kaluSeated(t, f, o = {}) {
  const by = 1060 + (o.dy || 0);
  shape([[390, 1260], [410, by], [670, by], [690, 1260]], '#D8452B', 9, INK, 1.4);
  line([[540, by - 18], [540, by - 60]], 9, INK, 1);
  const a = o.arms || [[-10, 40, -40, 120], [10, 40, 40, 120]];
  for (const [i, q] of a.entries()) { const sx = i ? 660 : 420, sy = by + 20; line([[sx, sy], [sx + q[0] * 2, sy + q[1] * 1.6], [sx + q[2] * 2, sy + q[3]]], 9, INK, 1.5); oval(sx + q[2] * 2, sy + q[3], 22, 22, SK_K, 6, INK, 1) }
  head('k', 540, by - 160 + (o.nod || 0), 140, f, o.rot || 0);
}
// ---------- phone prop ----------
function phoneShape(x, y, s, rot, screenFn) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  rect(-175, -330, 350, 660, '#0C0C10', 12); rect(-155, -305, 310, 610, '#fff', 0);
  c.save(); c.beginPath(); c.rect(-155, -305, 310, 610); c.clip(); screenFn(); c.restore();
  c.restore();
}
function handOnPhone(x, y, s, rot) { // thumb on front, fingers wrapped on the right edge, forearm out of bottom
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shape([[-70, 330], [70, 330], [120, 900], [-120, 900]], '#D8452B', 9, INK, 1.2);
  shape([[-60, 340], [60, 340], [70, 240], [-70, 240]], SK_K, 8, INK, 1);
  for (let i = 0; i < 4; i++) oval(180, -150 + i * 95, 42, 30, SK_K, 7, INK, 1);
  oval(-130, 120, 36, 70, SK_K, 8, INK, 1.2);
  c.restore();
}
function T2(s, x, y, size, col, w = 900) { c.save(); c.font = `${w} ${size}px Inter`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(s, x, y); c.restore() }
function screenSite() {
  rect(-155, -305, 310, 60, '#E8E8EE', 0); rect(-140, -297, 210, 40, '#fff', 3, '#bbb', 0); T2('MalluBhabhiKeBade Chuuche.com', -35, -277, 11, '#333', 700); rect(90, -297, 56, 40, '#222', 0); T2('Incog', 118, -277, 13, '#fff', 700);
  rect(-155, -245, 310, 120, '#D10F4F', 0); T2('MalluBhabhiKeBade', 0, -202, 29, '#fff'); T2('Chuuche.com', 0, -160, 38, '#FFE27A');
  for (let i = 0; i < 6; i++) {
    const x = -148 + (i % 2) * 152, y = -115 + Math.floor(i / 2) * 140;
    rect(x, y, 144, 132, '#E8A07A', 0); for (let k = 0; k < 20; k++) rect(x + (k % 4) * 36, y + Math.floor(k / 4) * 26.4, 36, 26.4, ['#C97F5A', '#F2C3A0', '#A85C3C', '#E8A07A'][(k * 7 + i * 3) % 4], 0);
    rect(x, y + 50, 144, 34, '#000', 0); T2('CENSORED', x + 72, y + 67, 19, '#fff'); rect(x + 5, y + 5, 40, 22, '#D10F4F', 0); T2('18+', x + 25, y + 16, 15, '#fff');
  }
}
function screenCall(t) {
  rect(-155, -305, 310, 610, '#1A2233', 0); T2('Incoming call...', 0, -240, 20, '#9FB0CC', 600);
  const p = 1 + .06 * Math.sin(t * 14); c.save(); c.translate(0, -130); c.scale(p, p); oval(0, 0, 62, 62, '#4B5A7A', 0); T2('GD', 0, 4, 54, '#fff'); c.restore();
  T2('Gandu Dost', 0, -20, 40, '#fff'); T2('mobile', 0, 18, 18, '#9FB0CC', 600);
  oval(-80, 210, 44, 44, '#E03A3A', 0); rect(-98, 206, 36, 9, '#fff', 0); oval(80, 210, 44, 44, '#2FC65A', 0); oval(80, 210, 16, 16, '#fff', 0);
}
// ---------- shots ----------
const SH = [];
const shot = (a, b, fn) => SH.push([a, b, fn]);
const T_ = META.lines; // [sp,start,end]
// 1 walk to bed (hop-walk, front view)
shot(0, 1.5, (t, a) => cam(1.0 * punch(t, a), 540, 1100, 0, t, () => {
  room(t); nightstand(t, 0); blanket(t, 0);
  const u = pr(t, a, 1.45), x = lerp(-80, 420, eio(u)), ph = t * 11, sw = Math.sin(ph), lift = Math.max(0, sw) * 40, lift2 = Math.max(0, -sw) * 40;
  man({ x, y: 1760 - Math.abs(sw) * 14, s: 1.0, legH: 250, torso: 215, r: 118, skin: SK_K, body: '#D8452B', shoe: '#F1F1EE', lean: .06,
    legs: [[-40, -150, -62 + sw * 28, -lift], [40, -150, 62 + sw * 28 * -1, -lift2]], arms: [[-50, 100, -70 - sw * 20, 170], [50, 100, 70 + sw * 20, 170]],
    face: { brow: .2, look: [.8, 0], mouth: 'smile', hair: 'afro', hairFill: '#17110E', kind: 'round', hairStill: true, ...blink(t) } });
}));
// 2 flop into bed + grab phone
shot(1.5, 2.8, (t, a) => cam(lerp(1.15, 1.4, pr(t, a, 2.8)) * punch(t, a), 600, 1000, 0, t, () => {
  room(t); nightstand(t, 0); const u = pr(t, a, a + .25), g = pr(t, a + .45, a + .95);
  kaluSeated(t, { brow: .2, look: [.9 * g, 0], mouth: 'smile', ...blink(t) }, { dy: 90 * (1 - eio(u)) - 90 * 0, nod: 0, arms: [[-10, 40, -40, 120], [60 + 120 * g, 30 - 20 * g, 160 * g + 20, 100 - 130 * g]] }); blanket(t, 0);
}));
// 3 phone screen (held in hand) 1.05 s so the site name reads
shot(2.8, 3.85, (t, a) => cam(1.0 * punch(t, a), 540, 960, 0, t, () => {
  fill('#12101C'); const u = pr(t, a, 3.85); phoneShape(540, 930, 1.55 + u * .06, -.03, screenSite); handOnPhone(540, 930, 1.55 + u * .06, -.03);
}));
// 4 face glued
shot(3.85, 4.55, (t, a) => cam(lerp(1.7, 2.0, pr(t, a, 4.55)) * punch(t, a), 540, 880, 2, t, () => {
  fill('#2C2548'); c.save(); c.globalAlpha = .5; oval(540, 960, 300, 260, '#6FE6FF', 0); c.restore();
  head('k', 540, 960, 200, { brow: .3, eye: 1.05, look: [0, .6], mouth: 'smile', ...blink(t, .5) }, Math.sin(t * 9) * .03); sweat(700, 840, 1.3);
}));
// 5 strip under blanket: clothes fly out
function flung(t, a) {
  const item = (t0, kind, dx, rot) => {
    const u = t - t0; if (u < 0 || u > 1.1) return; const x = 560 + dx * u * 300, y = 1240 - 1250 * u + 1500 * u * u;
    c.save(); c.translate(x, y); c.rotate(rot * u);
    if (kind === 's') shape([[-55, -40], [55, -40], [62, 40], [8, 40], [0, 0], [-8, 40], [-62, 40]], '#2A4D8F', 8, INK, 1.2);
    else { shape([[-48, -30], [48, -30], [40, 10], [8, 40], [-8, 40], [-40, 10]], '#FFFFFF', 8, INK, 1.2); rect(-48, -40, 96, 16, '#D92B3A', 5) }
    c.restore();
  };
  item(a + .12, 's', -1.1, 7); item(a + .4, 'b', 1.3, -9);
}
shot(4.55, 5.4, (t, a) => cam(1.0 * punch(t, a), 540, 1000, 0, t, () => {
  room(t, .25); nightstand(t, 1); kaluSeated(t, { brow: .3, look: [0, .6], mouth: 'smile', ...blink(t, .3) }, { nod: 6, arms: [[-10, 40, -20, 160], [10, 40, 20, 160]] });
  blanket(t, Math.sin(t * 16) * 9); flung(t, a);
}));
// 6 call arrives: phone in Kalu's hand, his face behind it
shot(5.4, 6.8, (t, a) => cam(1.0 * punch(t, a), 540, 960, 0, t, () => {
  fill('#12101C'); const sh = Math.sin(t * 38) * 7; head('k', 540, 330, 190, { brow: -.2, eye: 1.2, look: [0, .9], mouth: 'flat', ...blink(t) }, Math.sin(t * 9) * .02); sweat(690, 250, 1.3);
  phoneShape(540 + sh, 1050, 1.45, Math.sin(t * 38) * .03, () => screenCall(t)); handOnPhone(540 + sh, 1050, 1.45, Math.sin(t * 38) * .03);
}));
// 7 disappointed stare
shot(6.8, 7.0, (t, a) => { }); // placeholder (merged below)
shot(6.8, 8.5, (t, a) => cam(lerp(1.5, 1.9, pr(t, a, 8.5)) * punch(t, a), 540, 900, 0, t, () => {
  fill('#2C2548'); head('k', 540, 940, 200, { brow: .7, eye: 1, lid: .5, look: [.5, .4], mouth: 'flat', ...(t < 7.25 ? {} : { eyes: undefined }), ...(((t - a) % 2.2) < .16 ? { eyes: 'closed' } : {}) }, -.05);
  if (t > 7.0) { c.save(); c.globalAlpha = .9; sweat(720, 840, 1.2); c.restore() }
}));
// 8 Kalu on call line 1
shot(8.5, 10.3, (t, a) => cam(lerp(1.5, 1.75, pr(t, a, 10.3)) * punch(t, a), 540, 950, 0, t, () => {
  fill('#2C2548'); const m = mouthOf('k', t); head('k', 500, 930, 190, { brow: .8, eye: 1, lid: .5, look: [.3, .3], ...m, ...(((t) % 2.4) < .14 ? { eyes: 'closed' } : {}) }, -.06 + Math.sin(t * 6) * .01);
  rect(680, 940, 70, 180, '#111', 8); rect(690, 960, 50, 120, '#4BE08A', 0); line([[640, 1060], [690, 1070]], 14, SK_K, 0);
}));
// 9 friend (other side)
shot(10.3, 11.7, (t, a) => cam(lerp(1.3, 1.5, pr(t, a, 11.7)) * punch(t, a), 540, 960, 0, t, () => {
  fill('#E0B84C'); for (let i = 0; i < 6; i++) rect(i * 190 - 40, -400, 80, 2800, 'rgba(0,0,0,.05)', 0);
  const m = mouthOf('f', t); head('f', 540, 960, 190, { brow: .3, eye: 1.05, look: [-.2, .1], ...m, ...blink(t, 1) }, .07 + Math.sin(t * 8) * .015);
  rect(260, 980, 70, 170, '#111', 8); rect(270, 1000, 50, 110, '#4BE08A', 0);
}));
// 10 Kalu blank reaction while friend finishes
shot(11.7, 13.0, (t, a) => cam(lerp(1.9, 2.4, pr(t, a, 13.0)), 540, 900, 0, t, () => {
  fill('#2C2548'); head('k', 540, 950, 200, { brow: .9, eye: 1.0, lid: .55, look: [.6, 0], mouth: 'flat', ...(((t - a) % 2.5) < .5 && (t - a) > .6 ? { eyes: 'closed' } : {}) }, -.03);
}));
// 11 punchline
shot(13.0, 99, (t, a) => cam(lerp(1.7, 2.2, pr(t, a, a + 1.8)) * punch(t, a), 540, 900, 0, t, () => {
  fill('#2C2548'); const m = mouthOf('k', t); head('k', 540, 950, 200, { brow: .6, eye: .95, lid: .5, look: [0, .1], ...m }, 0);
}));
export function draw(t) {
  setBoil(Math.floor(t * 8));
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#2C2548'; c.fillRect(0, 0, 1080, 1920); c.restore();
  let s = null; for (const q of SH) if (t >= q[0] && t < q[1]) s = q; if (!s) { for (const q of SH) if (q[0] <= t) s = q }
  s[2](t, s[0]);
  label([['दोस्त वही जो ', '#111'], ['सही टाइम', '#D7261E'], [' पर गलत कॉल करे', '#111']], 540, 250, 52);
  captions(groups, t, KEYS, 1700); finish(t);
}
export const cues = [];
