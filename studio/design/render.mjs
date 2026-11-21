#!/usr/bin/env node
// render.mjs: HTML template -> PNG (screen) or PDF (print), with brand tokens and {{placeholders}}.
//   node studio/design/render.mjs templates/social-post.html out.png --brand ../channels/project-kaizen/brand.css \
//        --set headline="1% BETTER" --set image=/abs/path/photo.jpg [--scale 1] [--pdf]
// Size comes from <meta name="size" content="1080x1350"> (px) or <meta name="page" content="154x216mm"> (print, PDF).
// Placeholders: {{key}} or {{key|default}}. Needs node + playwright (preinstalled; NODE_PATH=/opt/npm-tools/node_modules).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
const a = process.argv.slice(2), sets = {};
let brand = "", scale = 1, pdf = false; const pos = [];
for (let i = 0; i < a.length; i++) {
  if (a[i] === "--brand") brand = resolve(a[++i]);
  else if (a[i] === "--scale") scale = +a[++i];
  else if (a[i] === "--pdf") pdf = true;
  else if (a[i] === "--set") { const s = a[++i], k = s.indexOf("="); sets[s.slice(0, k)] = s.slice(k + 1); }
  else pos.push(a[i]);
}
if (!pos[0]) { console.log("usage: render.mjs template.html [out.png|out.pdf] --brand brand.css [--set k=v]... [--scale 2] [--pdf]"); process.exit(1); }
const tpl = resolve(pos[0]); let out = resolve(pos[1] || tpl.replace(/\.html$/, pdf ? ".pdf" : ".png"));
if (/\.pdf$/i.test(out)) pdf = true;
if (brand) sets.brand = pathToFileURL(brand).href;
let html = readFileSync(tpl, "utf8").replace(/\{\{\s*([\w-]+)\s*(?:\|([^}]*))?\}\}/g, (_, k, d) => (k in sets ? sets[k] : (d ?? "")));
const tmp = resolve(dirname(tpl), ".render-" + basename(tpl)); writeFileSync(tmp, html);
const req = createRequire(import.meta.url);
let pw; try { pw = req("playwright"); } catch { pw = createRequire("/opt/npm-tools/node_modules/")("playwright"); }
const meta = n => (html.match(new RegExp(`<meta name="${n}" content="([^"]+)"`)) || [])[1];
mkdirSync(dirname(out), { recursive: true });
const browser = await pw.chromium.launch();
try {
  if (pdf) {
    const [w, h] = (meta("page") || "210x297mm").replace("mm", "").split("x");
    const p = await browser.newPage(); await p.goto(pathToFileURL(tmp).href); await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: out, width: w + "mm", height: h + "mm", printBackground: true, preferCSSPageSize: true });
  } else {
    const [w, h] = (meta("size") || "1080x1350").split("x").map(Number);
    const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    await p.goto(pathToFileURL(tmp).href); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
  }
} finally { await browser.close(); (await import("node:fs")).unlinkSync(tmp); }
console.log("wrote " + out);
