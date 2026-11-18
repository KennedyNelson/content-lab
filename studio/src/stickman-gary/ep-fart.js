// 2026-11-18 IG reel "Lifetime fart" (Stickman): Pappu (round head, bald with 3 hairs, white vest, pot belly) learns what one
// lifetime of farts does. Beats: hook / room fills with gas / belly -> gas cylinder / chowkidar guards the gate / rocket launch / pants shraddhanjali.
import { bind as bindT, label, captions, groupWords } from '../toon/toon.js';
import { bind, man, face, line, shape, rect, oval, dot, star, finish, setBoil, ring } from './engine.js';
const META = await (await fetch('/data/meta.json')).json();
const ENV = (await (await fetch('/data/env.json')).json()).n;
export const DUR = META.dur;
let c, groups = [], WD = [];
const KEYS = /(पाद|गांड|पेट|रॉकेट|सिलेंडर|इज़्ज़त|पैंट|फटेगी|फटेगा|सलामत|शहीद|गैस)/;
export function init(cx, w) { c = cx; bind(c); bindT(c); WD = w; groups = groupWords(w) }
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, u) => a + (b - a) * u, eio = (u) => (u = clamp(u), u * u * (3 - 2 * u));
const pr = (t, a, b) => clamp((t - a) / (b - a)), back = (u) => { u = clamp(u); const k = 1.9; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2) };
const env = (t) => { const i = Math.floor(t * 30); return i >= 0 && i < ENV.length ? ENV[i] : 0 };
const mouthAt = (t, rest = 'flat') => { const a = env(t); return a > .08 ? { mouth: 'open', open: Math.min(1, a * 1.3) } : { mouth: rest } };
const wt = (txt, nth = 0) => { const m = WD.filter(x => x.w.includes(txt)); return m.length > nth ? m[nth].s : 0 };
const FLOOR = 1450, SKIN = '#B07448';
const blink = (t, ph = 0) => ((t + ph) % 3.1) < .12;
// ---------- shared drawing ----------
function cam(z, x, y, shake, t, fn, rot = 0) {
  c.save(); c.translate(540 + (shake ? Math.sin(t * 61) * shake : 0), 960 + (shake ? Math.cos(t * 53) * shake : 0)); if (rot) c.rotate(rot); c.scale(z, z); c.translate(-x, -y); fn(); c.restore();
}
function room(ceilingHole = 0) {
  c.fillStyle = '#FFE7B0'; c.fillRect(-300, -400, 1700, 2400);
  for (let x = -300; x < 1400; x += 120) { c.fillStyle = 'rgba(230,170,90,.18)'; c.fillRect(x, 150, 60, FLOOR - 150) }
  c.fillStyle = '#C98F5A'; c.fillRect(-300, FLOOR, 1700, 700);
  line([[-300, FLOOR], [1400, FLOOR]], 8, '#141414', 1.5);
  // ceiling slab
  c.fillStyle = '#B5654A'; c.fillRect(-300, -400, 1700, 550);
  for (let r = 0; r < 4; r++)for (let x = -300 + (r % 2) * 90; x < 1400; x += 180) { c.strokeStyle = 'rgba(40,10,0,.35)'; c.lineWidth = 5; c.strokeRect(x, 150 - r * 70 - 70, 180, 70) }
  line([[-300, 150], [1400, 150]], 8, '#141414', 1.5);
  if (ceilingHole > 0) { const w = 150 * ceilingHole; c.fillStyle = '#8FD3F4'; c.fillRect(540 - w, -400, w * 2, 550); line([[540 - w, 150], [540 - w - 20, 90], [540 - w, 20]], 7, '#141414', 2) }
  // window
  rect(110, 380, 250, 330, '#9ADCF7', 9); line([[235, 380], [235, 710]], 8); line([[110, 545], [360, 545]], 8);
  oval(190, 450, 36, 20, '#FFFFFF', 0); oval(220, 440, 30, 18, '#FFFFFF', 0);
  // sofa
  rect(700, 1170, 380, 150, '#2E8F8A', 8); rect(700, 1130, 380, 60, '#3AA7A1', 8); rect(690, 1160, 60, 190, '#2E8F8A', 8); rect(1040, 1160, 60, 190, '#2E8F8A', 8);
  line([[720, 1320], [720, FLOOR]], 9); line([[1060, 1320], [1060, FLOOR]], 9);
  // wall clock
  oval(850, 480, 70, 70, '#FFFFFF', 8); line([[850, 480], [850, 430]], 6); line([[850, 480], [890, 500]], 6);
}
function cloud(x, y, r, col = '#B9D64B', a = 1) {
  c.save(); c.globalAlpha = a;
  for (const [dx, dy, k] of [[0, 0, 1], [r * .8, r * .12, .8], [-r * .85, r * .1, .75], [r * .35, -r * .5, .7], [-r * .3, -r * .45, .65]]) oval(x + dx, y + dy, r * k, r * k * .85, col, 0);
  c.restore();
  c.save(); c.globalAlpha = a * .9; for (const [dx, dy, k] of [[0, 0, 1], [r * .8, r * .12, .8], [-r * .85, r * .1, .75]]) { c.beginPath(); c.ellipse(x + dx, y + dy, r * k, r * k * .85, 0, 0, 7); c.lineWidth = 6; c.strokeStyle = 'rgba(40,60,0,.55)'; c.stroke() } c.restore();
}
function belly(x, y, s, legH, tH, rad, col = '#F4F4F0', crack = 0, red = 0) {
  const cy = y - (legH + tH * .38) * s, R = rad * s;
  oval(x, cy, R, R * .96, red ? `rgb(255,${Math.round(244 - 120 * red)},${Math.round(240 - 150 * red)})` : col, 8, '#141414', 2);
  line([[x - R * .1, cy + R * .1], [x, cy + R * .18], [x + R * .1, cy + R * .1]], 6, '#141414', .8);  // navel
  if (crack > 0) { for (let i = 0; i < 4; i++) { const a = -2.2 + i * 1.0, L = R * .55 * crack; const p = [[x + Math.cos(a) * R * .45, cy + Math.sin(a) * R * .45]]; for (let k = 1; k < 4; k++)p.push([p[0][0] + Math.cos(a + (k % 2 ? .4 : -.4)) * L * k / 3, p[0][1] + Math.sin(a + (k % 2 ? .4 : -.4)) * L * k / 3]); line(p, 6, '#141414', 1) } }
}
// the hero. o: x,y,s,face,arms,legs,rad(belly),crack,red
function pappu(o) {
  const s = o.s || 1, legH = o.legH || 250, tH = 220;
  man({ x: o.x, y: o.y, s, legH, torso: tH, r: 120, skin: SKIN, body: o.body || '#F4F4F0', shoe: '#E8632B', face: { ...o.face, hair: 'strand', kind: 'round', hairStill: true }, arms: o.arms, legs: o.legs, lean: o.lean || 0, tilt: o.tilt || 0, squash: o.squash || 0, hop: o.hop || 0 });
  if (o.rad) belly(o.x, o.y - (o.hop || 0), s, legH, tH, o.rad, o.body || '#F4F4F0', o.crack || 0, o.red || 0);
}
function lpg(x, y, s, f, t) {   // red gas cylinder with Pappu's head on top
  c.save(); c.translate(x, y); c.scale(s, s);
  rect(-120, -470, 240, 400, '#D9302C', 9, '#141414', 2); rect(-120, -330, 240, 70, '#F4F4F0', 7, '#141414', 1);
  oval(0, -70, 120, 30, '#B02420', 9, '#141414', 2); rect(-80, -90, 160, 30, '#B02420', 8, '#141414', 1);
  line([[-60, -470], [-60, -520], [60, -520], [60, -470]], 9, '#141414', 1.5); oval(0, -440, 90, 30, '#B02420', 8, '#141414', 1.5);
  rect(-26, -560, 52, 50, '#C9C9CF', 8, '#141414', 1);
  c.save(); c.translate(0, -655); face({ ...f, r: 120, skin: SKIN, lw: 8, hair: 'strand', kind: 'round', hairStill: true }); c.restore();
  line([[-120, -280], [-170, -240 + Math.sin(t * 9) * 12], [-190, -170]], 9, '#141414', 2); line([[120, -280], [170, -240 + Math.cos(t * 9) * 12], [190, -170]], 9, '#141414', 2);
  oval(-150, -150, 30, 30, SKIN, 8, '#141414', 1); oval(150, -150, 30, 30, SKIN, 8, '#141414', 1);
  c.restore();
}
function chowkidar(x, y, s, f, arms, t, salute) {
  man({ x, y, s, legH: 230, torso: 215, r: 108, skin: '#8A5536', body: '#C9B27A', shoe: '#3B3B40', tie: null, face: { ...f, kind: 'round', hair: null }, arms, legs: [[-30, -130, -55, 0], [30, -130, 55, 0]] });
  c.save(); c.translate(x, y); c.scale(s, s);
  const hy = -(230 + 215) + 18 - 70 - 108 * .72;    // head centre
  shape([[-118, hy - 40], [-100, hy - 105], [0, hy - 125], [100, hy - 105], [118, hy - 40], [60, hy - 30], [-60, hy - 30]], '#8F7B4A', 8, '#141414', 1.6); line([[-136, hy - 36], [136, hy - 36]], 10, '#141414', 1);
  line([[-60, hy + 62], [-20, hy + 52], [20, hy + 52], [60, hy + 62]], 14, '#141414', .8);   // moustache
  c.restore();
}
function lathi(x, y, ang = 0) { c.save(); c.translate(x, y); c.rotate(ang); line([[0, 0], [0, -520]], 14, '#6B3B1A', 1); line([[0, 0], [0, -520]], 5, '#A8682E', .6); c.restore() }
function gate(open) {
  const w = 300, topY = 520, botY = FLOOR;
  for (const q of [-1, 1]) {   // two leaves
    const sx = 540 + q * 310, rot = q * open * .98;
    c.save(); c.translate(sx - q * 5, 0);
    const x0 = 0, ww = -q * w * Math.cos(open * 1.1 * 1) ;
    const wd = w * (1 - open * .82);
    const X = (q === -1 ? 0 : -wd), Y = topY;
    rect(X - (q === -1 ? 0 : 0), Y, wd, botY - Y, 'rgba(60,70,85,.0)', 10, '#2B2F3A', 1.2);
    for (let i = 1; i < 6; i++) line([[X + wd * i / 6, Y], [X + wd * i / 6, botY]], 8, '#2B2F3A', 1);
    line([[X, Y + 220], [X + wd, Y + 220]], 9, '#2B2F3A', 1); line([[X, Y + 560], [X + wd, Y + 560]], 9, '#2B2F3A', 1);
    c.restore();
  }
}
function ground(sky) {
  if (sky) { const g = c.createLinearGradient(0, -400, 0, FLOOR); g.addColorStop(0, '#5FB6EB'); g.addColorStop(1, '#BDE6FA'); c.fillStyle = g; c.fillRect(-400, -900, 1900, 2800); }
}
// ---------- the reel ----------
export function draw(t) {
  setBoil(Math.floor(t * 8));
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#FFE7B0'; c.fillRect(0, 0, 1080, 1920); c.restore();
  const T1 = 6.45, T2 = 12.33, T3 = 19.35, T3b = 22.2, T4 = 24.45, TL = 28.2, TF = META.sfx, TF2 = TF + 1.7;
  const nm = mouthAt(t, 'flat'); const bl = blink(t) ? { eyes: 'closed' } : {};
  if (t < T1) {                                   // 1 HOOK: Pappu, hand on belly, two thought bubbles
    const z = lerp(1.3, 1.55, pr(t, 0, T1)), tb = wt('फटेगी'), tj = wt('जुड़ी');
    cam(z, 540, 1060, 0, t, () => {
      room();
      const worry = t > tb - .2;
      pappu({ x: 540, y: FLOOR, s: 1, rad: 92, face: { brow: worry ? .8 : -.3, look: [.1, -.2], ...nm, ...bl }, arms: [[-60, 110, -85, 190], [60, 100, 70 + Math.sin(t * 3) * 6, 60]], legs: [[-40, -150, -70, 0], [40, -150, 70, 0]], tilt: Math.sin(t * 2.4) * .05 });
      if (t > tb - .15) { const u = back(pr(t, tb - .15, tb + .25)); c.save(); c.translate(330, 520); c.scale(u, u); oval(0, 0, 150, 110, '#FFFFFF', 8); oval(100, 130, 22, 16, '#FFFFFF', 7); oval(140, 175, 12, 9, '#FFFFFF', 6); star(0, 0, 70, '#F4C430', 9); c.restore() }
      if (t > tj - .1) { const u = back(pr(t, tj - .1, tj + .3)); c.save(); c.translate(760, 520); c.scale(u, u); oval(0, 0, 150, 110, '#FFFFFF', 8); oval(-100, 130, 22, 16, '#FFFFFF', 7); oval(-140, 175, 12, 9, '#FFFFFF', 6); rect(-38, -10, 76, 56, '#8E9AAF', 8); line([[-22, -10], [-22, -50], [0, -72], [22, -50], [22, -10]], 9); c.restore() }
    });
  } else if (t < T2) {                             // 2 THE HISAAB: he sits on a stool, puffs fill the room
    const u = pr(t, T1, T2), z = lerp(1.45, 1.15, eio(u));
    cam(z, 540, 1050, 0, t, () => {
      room();
      const N = Math.floor(u * 26) + 1;
      rect(450, 1260, 180, 20, '#8A5A2B', 8); line([[470, 1280], [450, FLOOR]], 9); line([[610, 1280], [630, FLOOR]], 9);
      pappu({ x: 540, y: FLOOR - 190, s: .9, legH: 130, rad: 86, face: { brow: -.2, look: [0, -.1], ...nm, ...bl }, arms: [[-60, 110, -70, 170], [60, 110, 60, 160]], legs: [[-70, -80, -130, -40], [70, -80, 130, -40]] });
      for (let i = 0; i < N; i++) { const a = i * 2.399, rr = 90 + (i * 37) % 420, cx = 540 + Math.cos(a) * rr * 1.1, cy = 1150 + Math.sin(a * 1.3) * Math.min(rr, 600) * .9 - u * 450; const pop = back(pr(u, i / 26 * .95, i / 26 * .95 + .06)); cloud(cx, cy, (60 + (i * 13) % 50) * pop, '#BFD64B', .78) }
      c.fillStyle = `rgba(185,214,75,${.55 * pr(u, .75, 1)})`; c.fillRect(-300, -400, 1700, 2400);
    });
  } else if (t < T3) {                             // 3 BELLY -> GAS CYLINDER
    const u = pr(t, T2, T3), tc = wt('सिलेंडर') || 17.3, p = pr(t, T2 + .2, tc - .1), isC = t > tc - .05;
    cam(lerp(1.3, 1.5, eio(u)), 540, lerp(1060, 960, eio(u)), 0, t, () => {
      room();
      const rad = lerp(86, 215, eio(p));
      if (!isC) pappu({ x: 540, y: FLOOR, s: 1, rad, red: p * .9, face: { brow: lerp(0, .9, p), eye: 1 + p * .12, look: [0, -.1], ...nm, ...bl }, arms: [[-60 - p * 70, 110, -85 - p * 90, 190 - p * 40], [60 + p * 70, 110, 85 + p * 90, 190 - p * 40]], legs: [[-40 - p * 25, -150, -70 - p * 25, 0], [40 + p * 25, -150, 70 + p * 25, 0]], squash: p * .1, hop: Math.sin(t * 20) * p * 5 });
      else { const q = back(pr(t, tc - .05, tc + .3)); lpg(540, FLOOR, .95 * (0.6 + .4 * q), { brow: .8, ...nm, ...bl }, t) }
    }, 0);
  } else if (t < T4) {                             // 4 chowkidar holds the gate, then the belly swells
    if (t < T3b) {
      const u = pr(t, T3, T3b);
      cam(lerp(1.3, 1.5, u), 540, 1050, 0, t, () => {
        room(); gate(0);
        chowkidar(540, FLOOR, 1.05, { brow: -.7, look: [0, 0], mouth: 'flat', ...bl }, [[-40, 90, 5, 40], [40, 60, 70, -60]], t);
        lathi(560, FLOOR); c.save(); c.globalAlpha = .9; for (let i = 0; i < 6; i++) { const yy = 900 + i * 90, ph = (t * 5 + i) % 2; line([[100 + ph * 30, yy], [190 + ph * 30, yy]], 6, '#FFFFFF', 0) } c.restore();
      });
    } else {
      const u = pr(t, T3b, T4), sh = u > .5 ? (u - .5) * 14 : 0;
      cam(lerp(1.3, 1.55, u), 540, 1000, sh, t, () => {
        room();
        pappu({ x: 540, y: FLOOR, s: 1, rad: lerp(215, 255, u), red: .9 + u * .1, crack: u, face: { brow: .9, eye: 1.18, ...nm }, arms: [[-120, 110, -150, 150], [120, 110, 150, 150]], legs: [[-60, -150, -95, 0], [60, -150, 95, 0]], squash: .12 });
        if (u > .3) for (let i = 0; i < 3; i++) { const a = -1 + i, yy = 780 + i * 40, p = (t * 6 + i) % 1; line([[720 + p * 40, yy], [780 + p * 40, yy - 10]], 6, '#141414', 0) }
      });
    }
  } else if (t < TF) {                             // 5 gate opens, ignition, launch through the roof
    const u = pr(t, T4, TL);
    if (t < TL) {
      const open = eio(pr(t, T4 + .15, T4 + 1.0)), ig = pr(t, T4 + 2.0, TL), pre = u;
      cam(lerp(1.15, 1.35, pr(t, T4, TL)), 540, 1050, ig > 0 ? ig * 7 : 0, t, () => {
        room(); gate(open);
        chowkidar(210, FLOOR, .95, { brow: .2, mouth: 'open', open: .5, eye: 1.1 }, [[-30, 70, -20, 120], [40, 40, 60, -110]], t);
        pappu({ x: 540, y: FLOOR, s: 1, rad: 225, red: 1, face: { brow: .7, eye: 1.18, mouth: 'scream', ...bl }, arms: [[-120, 110, -150, 150], [120, 110, 150, 150]], legs: [[-60, -150, -95, 0], [60, -150, 95, 0]], squash: .1, hop: Math.sin(t * 40) * ig * 8 });
        if (ig > 0) for (let i = 0; i < 6; i++) cloud(540 + ((i * 97) % 220) - 110, FLOOR - 30 + (i % 2) * 20, (30 + i * 8) * ig, '#BFD64B', .85);
      });
    } else {
      const q = pr(t, TL, TF);                      // launch: camera follows him up through the ceiling
      const hy = lerp(FLOOR, -900, q * q), camY = lerp(1050, hy - 300, eio(q));
      cam(1.25, 540, Math.max(-600, camY), 12 * (1 - q), t, () => {
        room(eio(pr(q, .15, .3)));
        ground(q > .35);
        pappu({ x: 540, y: hy, s: 1, rad: 150, red: .6, face: { brow: -.9, eye: 1.2, mouth: 'scream' }, arms: [[-30, 110, -30, 190], [30, 110, 30, 190]], legs: [[-18, -150, -22, 0], [18, -150, 22, 0]], squash: -.1 });
        for (let i = 0; i < 10; i++) { const yy = hy + 40 + i * 70, r = 40 + i * 8; cloud(540 + Math.sin(t * 9 + i) * 20, yy, r, '#BFD64B', Math.max(0, .9 - i * .07)) }
        // flying bricks
        if (q > .15 && q < .6) for (let i = 0; i < 7; i++) { const a = -1.3 + i * .45, p = pr(q, .15, .6); rect(540 + Math.cos(a) * 300 * p - 25, 150 + Math.sin(a) * 260 * p + p * p * 300 - 15, 50, 30, '#B5654A', 6, '#141414', 1) }
      });
    }
  } else if (t < TF2) {                            // fart SFX: tiny rocket-man high above the town
    const u = pr(t, TF, TF2);
    cam(1.0, 540, 960, 0, t, () => {
      ground(true);
      for (const [x, y, r] of [[200, 400, 110], [820, 650, 140], [480, 1150, 120], [900, 1400, 90]]) { oval(x, y, r, r * .55, '#FFFFFF', 0); oval(x + r * .6, y + 10, r * .7, r * .4, '#FFFFFF', 0) }
      const y = lerp(1500, 350, eio(u)); for (let i = 0; i < 12; i++) cloud(540 + Math.sin(i * 1.7 + t * 6) * 40, y + 60 + i * 90, 55 + i * 6, '#BFD64B', Math.max(0, .9 - i * .06));
      pappu({ x: 540, y, s: .55, rad: 150, red: .6, face: { brow: -.9, eye: 1.2, mouth: 'scream' }, arms: [[-30, 110, -30, 190], [30, 110, 30, 190]], legs: [[-18, -150, -22, 0], [18, -150, 22, 0]] });
      for (let i = 0; i < 5; i++) { const bx = (i * 230 + t * 160) % 1300 - 100; line([[bx, 300 + i * 50], [bx + 18, 285 + i * 50], [bx + 36, 300 + i * 50]], 6, '#141414', 0) }
    });
  } else {                                         // 6 aftermath: charred Pappu, garlanded pants photo, Izzat ghost waves bye
    const u = pr(t, TF2, DUR), ti = wt('इज़्ज़त') || 33.3, tn = wt('निकल') || 35;
    cam(lerp(1.25, 1.4, u), 470, 1060, 0, t, () => {
      room();
      // photo frame of the pants + garland + diya
      c.save(); c.translate(280, 1130); rect(-120, -190, 240, 300, '#FFF6DD', 10, '#141414', 1.2);
      shape([[-60, -150], [60, -150], [70, 20], [20, 20], [0, -60], [-20, 20], [-70, 20]], '#3E5DB0', 8, '#141414', 1.2);
      for (let i = 0; i < 12; i++) { const a = Math.PI * (.05 + i / 11 * .9); oval(Math.cos(a) * 130, -200 + Math.sin(a) * 90 + 70 - 70, 16, 16, i % 2 ? '#F29B1E' : '#F6C21B', 5, '#141414', .5) }
      line([[-110, 110], [-110, 330]], 9); line([[110, 110], [110, 330]], 9);
      rect(-30, 330, 60, 18, '#D9302C', 6); const fl = Math.sin(t * 17) * 6; shape([[-9, 330], [9, 330], [fl, 290]], '#F6C21B', 4, '#141414', .5);
      c.restore();
      const w = pr(t, ti, tn);
      pappu({ x: 600, y: FLOOR, s: 1, body: '#8D8D86', rad: 86, face: { brow: -.4, look: [-.4, .1], eye: 1, ...mouthAt(t, 'flat'), ...bl }, arms: [[-60, 110, -85, 190], [60, 110, 85, 190]], legs: [[-40, -150, -70, 0], [40, -150, 70, 0]], tilt: .03 });
      // smudges of soot on his face
      cloud(600 + 90, FLOOR - 560 + Math.sin(t * 2) * 6, 26, '#555', .6);
      // Izzat ghost: sheet ghost with halo, waves, floats away
      if (t > ti - .2) { const gx = 790 + Math.sin(t * 3) * 20, gy = lerp(900, 120, eio(w)), gs = back(pr(t, ti - .2, ti + .2)) * (1 - pr(t, tn + .2, tn + .8)); c.save(); c.translate(gx, gy); c.scale(gs, gs);
        shape([[-70, 80], [-80, -20], [-50, -80], [0, -100], [50, -80], [80, -20], [70, 80], [40, 60], [10, 85], [-20, 60]], '#FFFFFF', 8, '#141414', 1.5); dot(-26, -30, 8); dot(26, -30, 8); oval(0, 20, 14, 18, '#3a0d10', 5);
        oval(0, -128, 52, 14, null, 8, '#F4C430', .6); line([[70, 0], [118, -30 + Math.sin(t * 14) * 22]], 8, '#141414', 1); c.restore() }
    });
  }
  // top setup line (dark / sarcastic, Hindi) + word captions
  label([['कुछ सवाल ', '#111'], ['न पूछना ही', '#D7261E'], [' बेहतर था', '#111']], 540, 250, 56);
  captions(groups, t, KEYS, 1700); finish(t);
}
export const cues = [];
