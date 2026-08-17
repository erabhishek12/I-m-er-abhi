import os, io, json, base64
from PIL import Image

prompts = {p["n"]: p for p in json.load(open("/home/user/prompts.json"))}
LV = {1: ("Level 1 - Soft Romance", "#c9852a"), 2: ("Level 2 - Sensual Passion", "#b8642f"),
      3: ("Level 3 - Wild Intimacy", "#9c3b30")}

cells, done = [], 0
for n in range(1, 181):
    p = prompts[n]
    path = "/home/user/cards/%s.webp" % p["file"]
    if os.path.exists(path):
        done += 1
        im = Image.open(path); im.thumbnail((300, 450), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, "WEBP", quality=72)
        src = "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()
        img = '<img src="%s" alt="">' % src
    else:
        img = '<div class="ph">pending</div>'
    cells.append(
        '<figure class="c"><div class="w">%s<span class="lv" style="background:%s">L%d</span></div>'
        '<figcaption><b>%s.webp</b><span>%03d &middot; %s</span></figcaption></figure>'
        % (img, LV[p["level"]][1], p["level"], p["file"], n, p["title"]))

html = """<!doctype html><meta charset="utf-8"><title>Romance Card Deck</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#171310;color:#f0e6da;font-family:'Segoe UI',system-ui,sans-serif}
header{padding:34px 30px 24px;background:linear-gradient(135deg,#2a1d15,#3d2418);border-bottom:1px solid #533}
h1{margin:0;font-size:27px;letter-spacing:.3px}
p.sub{margin:8px 0 0;color:#c3ab93;font-size:14px}
.bar{margin-top:16px;height:9px;background:#0e0b09;border-radius:9px;overflow:hidden;max-width:520px}
.bar i{display:block;height:100%%;width:%.1f%%;background:linear-gradient(90deg,#c9852a,#e0a94e)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(178px,1fr));gap:17px;padding:26px 30px 60px}
.c{margin:0}
.w{position:relative;aspect-ratio:2/3;border-radius:10px;overflow:hidden;background:#241b15;border:1px solid #3a2c22}
.w img{width:100%%;height:100%%;object-fit:cover;display:block}
.ph{width:100%%;height:100%%;display:flex;align-items:center;justify-content:center;color:#6b5748;font-size:12px;letter-spacing:1px}
.lv{position:absolute;top:7px;left:7px;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;color:#fff}
figcaption{padding:7px 2px 0;font-size:11.5px;line-height:1.45}
figcaption b{display:block;color:#f4e9dc}
figcaption span{color:#a8917c}
</style>
<header><h1>Romance Card Deck &mdash; 180 Illustrated Cards</h1>
<p class="sub">Consistent characters &middot; manhwa/webtoon style &middot; 1024&times;1536 (2:3) &middot; WebP</p>
<p class="sub"><b>%d of 180</b> generated</p><div class="bar"><i></i></div></header>
<div class="grid">%s</div>""" % (done / 180 * 100, done, "\n".join(cells))

open("/home/user/gallery.html", "w").write(html)
print("gallery:", done, "/180  size %.1f MB" % (len(html) / 1e6))
