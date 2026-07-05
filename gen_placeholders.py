from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, random

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

BG = (10, 10, 12)
BG2 = (17, 17, 20)
ACCENT = (124, 108, 255)
ACCENT2 = (255, 157, 77)
TEXT = (245, 244, 239)
TEXT_MUTED = (245, 244, 239)

W, H = 1200, 900  # 4:3

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i]-a[i])*t) for i in range(3))

def make_bg(seed, accent=ACCENT, accent2=ACCENT2):
    random.seed(seed)
    img = Image.new("RGB", (W, H), BG)
    # diagonal gradient wash
    grad = Image.new("RGB", (W, H), BG)
    gd = ImageDraw.Draw(grad)
    for y in range(H):
        t = y / H
        c = lerp(BG, BG2, t)
        gd.line([(0, y), (W, y)], fill=c)
    img = grad

    # soft glow blobs
    glow = Image.new("RGB", (W, H), (0,0,0))
    gdraw = ImageDraw.Draw(glow)
    cx, cy = random.randint(int(W*0.55), int(W*0.9)), random.randint(int(H*0.05), int(H*0.35))
    r = random.randint(280, 420)
    for i in range(r, 0, -4):
        alpha = (1 - i/r) ** 2
        col = lerp((0,0,0), accent, alpha*0.55)
        gdraw.ellipse([cx-i, cy-i, cx+i, cy+i], fill=col)
    cx2, cy2 = random.randint(int(W*0.0), int(W*0.25)), random.randint(int(H*0.65), int(H*0.95))
    r2 = random.randint(220, 340)
    for i in range(r2, 0, -4):
        alpha = (1 - i/r2) ** 2
        col = lerp((0,0,0), accent2, alpha*0.35)
        gdraw.ellipse([cx2-i, cy2-i, cx2+i, cy2+i], fill=col)
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    img = Image.blend(img, glow, 0.9)

    # subtle grid lines
    grid = Image.new("RGBA", (W, H), (0,0,0,0))
    gdraw2 = ImageDraw.Draw(grid)
    step = 60
    for x in range(0, W, step):
        gdraw2.line([(x,0),(x,H)], fill=(255,255,255,10), width=1)
    for y in range(0, H, step):
        gdraw2.line([(0,y),(W,y)], fill=(255,255,255,10), width=1)
    img = img.convert("RGBA")
    img.alpha_composite(grid)
    img = img.convert("RGB")

    # noise
    return img

def rounded_rect(draw, box, radius, **kwargs):
    draw.rounded_rectangle(box, radius=radius, **kwargs)

def draw_icon(draw, kind, cx, cy, size, color):
    s = size
    if kind == "tools":
        # wrench-like abstract: two overlapping rounded bars
        draw.rounded_rectangle([cx-s, cy-s*0.18, cx+s, cy+s*0.18], radius=int(s*0.18), outline=color, width=6)
        draw.ellipse([cx-s-14, cy-s*0.18-14, cx-s+ s*0.5, cy+s*0.18+14], outline=color, width=6)
    elif kind == "fun":
        # abstract stars/sparkle
        for ang in range(0, 360, 45):
            x2 = cx + s*math.cos(math.radians(ang))
            y2 = cy + s*math.sin(math.radians(ang))
            draw.line([cx, cy, x2, y2], fill=color, width=5)
        draw.ellipse([cx-14, cy-14, cx+14, cy+14], fill=color)
    elif kind == "spiritual":
        # concentric circles (mandala-ish)
        for i, rr in enumerate([s, s*0.66, s*0.33]):
            draw.ellipse([cx-rr, cy-rr, cx+rr, cy+rr], outline=color, width=5)
    elif kind == "commerce":
        # simple shop/bag icon abstract
        draw.rounded_rectangle([cx-s*0.7, cy-s*0.2, cx+s*0.7, cy+s*0.9], radius=20, outline=color, width=6)
        draw.arc([cx-s*0.45, cy-s*0.7, cx+s*0.45, cy+s*0.1], start=180, end=360, fill=color, width=6)
    elif kind == "luxury":
        # diamond
        pts = [(cx, cy-s), (cx+s*0.8, cy-s*0.25), (cx+s*0.5, cy+s*0.9), (cx-s*0.5, cy+s*0.9), (cx-s*0.8, cy-s*0.25)]
        draw.polygon(pts, outline=color, width=6)
        draw.line([cx-s*0.8, cy-s*0.25, cx+s*0.8, cy-s*0.25], fill=color, width=4)
        draw.line([cx, cy-s, cx, cy+s*0.9], fill=color, width=3)
    else:
        draw.ellipse([cx-s, cy-s, cx+s, cy+s], outline=color, width=6)

def make_card(filename, title, subtitle, badge, kind, seed, accent=ACCENT, accent2=ACCENT2, fmt="PNG"):
    img = make_bg(seed, accent, accent2).convert("RGBA")
    draw = ImageDraw.Draw(img)

    # border frame
    draw.rounded_rectangle([24,24,W-24,H-24], radius=36, outline=(255,255,255,40), width=2)

    # badge pill top-left
    badge_font = ImageFont.truetype(FONT_MONO, 26)
    bbox = draw.textbbox((0,0), badge.upper(), font=badge_font)
    bw, bh = bbox[2]-bbox[0], bbox[3]-bbox[1]
    pad_x, pad_y = 26, 16
    bx, by = 70, 70
    draw.rounded_rectangle([bx, by, bx+bw+pad_x*2, by+bh+pad_y*2], radius=(bh+pad_y*2)//2, fill=(255,255,255,235))
    draw.text((bx+pad_x, by+pad_y-4), badge.upper(), font=badge_font, fill=(10,10,12))

    # icon top-right
    draw_icon(draw, kind, W-150, 150, 60, (255,255,255,220))

    # Title
    title_font = ImageFont.truetype(FONT_BOLD, 96)
    # wrap title if long
    words = title.split(" ")
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        tb = draw.textbbox((0,0), test, font=title_font)
        if tb[2]-tb[0] > W - 160 and cur:
            lines.append(cur)
            cur = w
        else:
            cur = test
    if cur:
        lines.append(cur)

    ty = H - 260 - (len(lines)-1)*100
    for line in lines:
        draw.text((72, ty), line, font=title_font, fill=(245,244,239,255))
        ty += 108

    # subtitle
    sub_font = ImageFont.truetype(FONT_REG, 34)
    draw.text((74, ty+6), subtitle, font=sub_font, fill=(245,244,239,190))

    # bottom accent line
    draw.rounded_rectangle([72, H-90, 72+140, H-84], radius=3, fill=accent)

    img = img.convert("RGB")
    if fmt == "JPEG":
        img.save(filename, "JPEG", quality=92)
    else:
        img.save(filename, "PNG")
    print("wrote", filename)

BASE = "/home/user/portfolio/assets/images/projects/"

make_card(BASE+"dip.png", "Calculator", "Vault", "Secret Feature", "tools", 1)
make_card(BASE+"aistudy.png", "Study Helper AI", "A&K", "AI Powered", "spiritual", 2)
make_card(BASE+"akt.png", "Multi Tool Box", "35+ Utilities", "35+ Tools", "tools", 3)
make_card(BASE+"fr.png", "See Your Future", "Fun AI App", "Fun App", "fun", 4)
make_card(BASE+"radha.png", "Naam Jaap", "Counter", "Spiritual", "spiritual", 5)
make_card(BASE+"dudhwala.png", "Dudh Wala", "Ledger App", "Small Business", "commerce", 6)
make_card(BASE+"dukan.png", "Dukan Wala", "Shop Assistant", "Small Business", "commerce", 7)
make_card(BASE+"kj.jpg", "Khushi Jewellers", "Luxury E-Commerce", "Flagship", "luxury", 8, accent=(255,196,120), accent2=(124,108,255), fmt="JPEG")

print("done")
