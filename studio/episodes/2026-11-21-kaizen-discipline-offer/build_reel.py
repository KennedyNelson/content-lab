import sys, math, subprocess, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

S = "/tmp/claude-0/-home-claude/000ee20f-6976-5c02-b809-5ae7e9f48655/scratchpad/kz"
LOGO = "/home/claude/content-lab/studio/channels/project-kaizen/assets/logo-antlers-wordmark-tagline-white.png"
ANTON = "/usr/share/fonts/truetype/google-fonts/ofl/anton/Anton-Regular.ttf"
W, H, FPS = 1080, 1920, 30
WHITE = (244, 245, 240)
BLACK = (17, 17, 17)

def font(sz): return ImageFont.truetype(ANTON, sz)

def load(name, minh=2700):
    im = Image.open(f"{S}/photos/{name}.jpg").convert("RGB")
    if im.height < minh:
        k = minh / im.height
        im = im.resize((int(im.width * k), minh), Image.LANCZOS)
    return im

IMG = {k: load(k) for k in ["p07", "p05", "p09", "p06"]}

yy, xx = np.mgrid[0:H, 0:W]
d = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
VIG = np.clip(1.05 - 0.38 * d ** 1.6, 0.35, 1.0)[..., None]

def ease(t): t = min(max(t, 0), 1); return 1 - (1 - t) ** 3

def cover(name, t, z0, z1, cx, cy, dim=0.72):
    """Ken Burns crop of a photo to 1080x1920. cx, cy = focus (0..1)."""
    im = IMG[name]
    z = z0 + (z1 - z0) * t
    base = max(W / im.width, H / im.height)
    cw, ch = W / (base * z), H / (base * z)
    x0 = min(max(cx * im.width - cw / 2, 0), im.width - cw)
    y0 = min(max(cy * im.height - ch / 2, 0), im.height - ch)
    fr = im.resize((W, H), Image.BILINEAR, box=(x0, y0, x0 + cw, y0 + ch))
    a = np.asarray(fr).astype(np.float32) * dim * VIG
    return a

def text_layer(lines, size, fill=WHITE, stroke=0, track=0, gap=0.92, outline=False, maxw=930):
    def measure(sz):
        f = font(sz)
        return f, [sum(f.getlength(c) + track for c in ln) - track for ln in lines]
    f, ws = measure(size)
    if max(ws) > maxw:
        size = int(size * maxw / max(ws)); f, ws = measure(size)
    asc, desc = f.getmetrics()
    pitch = int((asc + desc) * gap)
    tw = int(max(ws)) + 80
    th = pitch * len(lines) + int(size * 0.5) + 60
    L = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    dr = ImageDraw.Draw(L)
    for i, ln in enumerate(lines):
        x = (tw - ws[i]) / 2
        for ch in ln:
            dr.text((x, 30 + i * pitch), ch, font=f, fill=fill + (255,), stroke_width=stroke, stroke_fill=fill + (255,))
            x += f.getlength(ch) + track
    return L

def paste_anim(canvas, L, cx, cy, tsec, delay=0.0, slam=True):
    t = (tsec - delay)
    if t < 0: return
    p = ease(t / 0.22)
    sc = (1.35 - 0.35 * p) if slam else 1.0
    al = min(1, t / 0.12)
    w, h = int(L.width * sc), int(L.height * sc)
    Ls = L.resize((w, h), Image.LANCZOS)
    a = np.asarray(Ls).astype(np.float32)
    x0, y0 = int(cx - w / 2), int(cy - h / 2)
    xs0, ys0 = max(0, x0), max(0, y0)
    xs1, ys1 = min(W, x0 + w), min(H, y0 + h)
    if xs1 <= xs0 or ys1 <= ys0: return
    sub = a[ys0 - y0:ys1 - y0, xs0 - x0:xs1 - x0]
    al_map = sub[..., 3:4] / 255 * al
    canvas[ys0:ys1, xs0:xs1] = canvas[ys0:ys1, xs0:xs1] * (1 - al_map) + sub[..., :3] * al_map

def flash(canvas, tsec, amt=0.55):
    if tsec < 0.07: canvas[:] = canvas * (1 - amt * (1 - tsec / 0.07)) + 255 * amt * (1 - tsec / 0.07)

def to_img(a): return np.clip(a, 0, 255).astype(np.uint8)

# ---------- scenes
HOOK1 = text_layer(["1% BETTER."], 230, stroke=2)
HOOK2 = text_layer(["TODAY."], 230, stroke=2)
T_EXEC = text_layer(["EXECUTE,", "REGARDLESS."], 170, stroke=2)
T_GRIND = text_layer(["BUILT FOR", "THE GRIND."], 170, stroke=2)
T_IND = text_layer(["MADE IN INDIA"], 70, track=8)
T_UNI = text_layer(["UNISEX"], 70, track=8)
T_NAME = text_layer(["DISCIPLINE TANK"], 120, stroke=1)
T_OLD = text_layer(["RS. 1,199"], 110)
T_NEW = text_layer(["RS. 899"], 300, stroke=3)
T_SAVE = text_layer(["SAVE RS. 300"], 78, track=6)
T_CTA = text_layer(["SHOP NOW"], 80, fill=BLACK, track=6)
T_URL = text_layer(["PROJECTKAIZEN.IN"], 56, track=8)
T_HANDLE = text_layer(["@PROJECTKAIZENCLO"], 56, track=6)

def sc_hook(i, n):
    t = i / FPS
    a = cover("p05", i / n, 1.08, 1.25, 0.45, 0.5, 0.8)
    flash(a, t)
    paste_anim(a, HOOK1, W / 2, 560, t, 0.05)
    paste_anim(a, HOOK2, W / 2, 800, t, 0.45)
    return to_img(a)

def sc_reveal(i, n):
    t = i / FPS
    a = cover("p07", i / n, 1.0, 1.12, 0.5, 0.55, 0.85)
    flash(a, t)
    paste_anim(a, T_EXEC, W / 2, 1180, t, 0.1)
    return to_img(a)

def sc_grind(i, n):
    t = i / FPS
    a = cover("p06", i / n, 1.05, 1.2, 0.5, 0.5, 0.8)
    flash(a, t)
    paste_anim(a, T_GRIND, W / 2, 640, t, 0.08)
    return to_img(a)

def sc_front(i, n):
    t = i / FPS
    a = cover("p09", i / n, 1.12, 1.3, 0.55, 0.45, 0.78)
    flash(a, t)
    paste_anim(a, T_IND, W / 2, 420, t, 0.1, slam=False)
    paste_anim(a, T_UNI, W / 2, 520, t, 0.3, slam=False)
    return to_img(a)

def sc_offer(i, n):
    t = i / FPS
    a = cover("p09", i / n, 1.35, 1.45, 0.55, 0.45, 0.2)
    flash(a, t)
    paste_anim(a, T_NAME, W / 2, 380, t, 0.05)
    paste_anim(a, T_OLD, W / 2, 600, t, 0.35, slam=False)
    if t > 0.5:
        w = T_OLD.width - 80
        x0 = int(W / 2 - w / 2); y = 600
        prog = min(1, (t - 0.5) / 0.2)
        a[y - 3:y + 4, x0:x0 + int(w * prog)] = WHITE
    paste_anim(a, T_NEW, W / 2, 860, t, 0.7)
    paste_anim(a, T_SAVE, W / 2, 1110, t, 1.1, slam=False)
    if t > 1.5:
        p = ease((t - 1.5) / 0.2)
        bw, bh = 640, 150
        x0, y0 = W // 2 - bw // 2, 1250
        pill = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
        ImageDraw.Draw(pill).rounded_rectangle((0, 0, bw - 1, bh - 1), 75, fill=WHITE + (255,))
        pa = np.asarray(pill).astype(np.float32)
        al = pa[..., 3:4] / 255 * p
        a[y0:y0 + bh, x0:x0 + bw] = a[y0:y0 + bh, x0:x0 + bw] * (1 - al) + pa[..., :3] * al
        paste_anim(a, T_CTA, W / 2, y0 + bh / 2, t, 1.5, slam=False)
    paste_anim(a, T_URL, W / 2, 1480, t, 1.8, slam=False)
    return to_img(a)

LOGO_IM = Image.open(LOGO).convert("RGBA")
def sc_end(i, n):
    t = i / FPS
    a = np.zeros((H, W, 3), np.float32) + np.array(BLACK, np.float32)
    lw = 800
    lg = LOGO_IM.resize((lw, int(LOGO_IM.height * lw / LOGO_IM.width)), Image.LANCZOS)
    L = Image.new("RGBA", (lg.width + 40, lg.height + 40), (0, 0, 0, 0)); L.paste(lg, (20, 20))
    paste_anim(a, L, W / 2, 760, t, 0.05, slam=False)
    paste_anim(a, T_HANDLE, W / 2, 1150, t, 0.5, slam=False)
    paste_anim(a, T_URL, W / 2, 1250, t, 0.7, slam=False)
    return to_img(a)

SCENES = [("hook", 1.8, sc_hook), ("reveal", 2.2, sc_reveal), ("grind", 1.8, sc_grind),
          ("front", 2.0, sc_front), ("offer", 3.4, sc_offer), ("end", 2.0, sc_end)]

def render(name, dur, fn, out):
    n = int(round(dur * FPS))
    tmp = out + ".tmp.mp4"
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                          "-framerate", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "18", "-preset", "veryfast",
                          "-pix_fmt", "yuv420p", "-r", str(FPS), tmp], stdin=subprocess.PIPE)
    for i in range(n):
        p.stdin.write(fn(i, n).tobytes())
    p.stdin.close()
    if p.wait() == 0: os.rename(tmp, out)

if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "stills":
        for name, dur, fn in SCENES:
            n = int(round(dur * FPS))
            idx = int(sys.argv[2]) if len(sys.argv) > 2 else n - 4
            Image.fromarray(fn(min(idx, n - 1), n)).save(f"{S}/work/still_{name}.png")
    else:
        for name, dur, fn in SCENES:
            render(name, dur, fn, f"{S}/work/scene_{name}.mp4")
