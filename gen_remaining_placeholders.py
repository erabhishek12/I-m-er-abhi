from PIL import Image, ImageDraw, ImageFont

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

W, H = 1200, 900

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i]-a[i])*t) for i in range(3))

def make_bg(c1, c2, diagonal=True):
    img = Image.new("RGB", (W, H), c1)
    px = img.load()
    for y in range(H):
        for x in range(0, W, 4):
            t = ((x/W) + (y/H))/2 if diagonal else y/H
            t = max(0, min(1, t))
            col = lerp(c1, c2, t)
            for dx in range(4):
                if x+dx < W:
                    px[x+dx, y] = col
    return img

def make_card(filename, title, subtitle, badge, bg1, bg2, text_color=(255,255,255), badge_bg=(255,255,255), badge_fg=(20,20,20), accent=None, fmt="PNG"):
    img = make_bg(bg1, bg2).convert("RGBA")
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([24,24,W-24,H-24], radius=36, outline=(255,255,255,50), width=2)

    badge_font = ImageFont.truetype(FONT_MONO, 26)
    bbox = draw.textbbox((0,0), badge.upper(), font=badge_font)
    bw, bh = bbox[2]-bbox[0], bbox[3]-bbox[1]
    pad_x, pad_y = 26, 16
    bx, by = 70, 70
    draw.rounded_rectangle([bx, by, bx+bw+pad_x*2, by+bh+pad_y*2], radius=(bh+pad_y*2)//2, fill=badge_bg)
    draw.text((bx+pad_x, by+pad_y-4), badge.upper(), font=badge_font, fill=badge_fg)

    title_font = ImageFont.truetype(FONT_BOLD, 92)
    words = title.split(" ")
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        tb = draw.textbbox((0,0), test, font=title_font)
        if tb[2]-tb[0] > W - 160 and cur:
            lines.append(cur); cur = w
        else:
            cur = test
    if cur: lines.append(cur)

    ty = H - 260 - (len(lines)-1)*102
    for line in lines:
        draw.text((72, ty), line, font=title_font, fill=text_color + (255,))
        ty += 106

    sub_font = ImageFont.truetype(FONT_REG, 32)
    draw.text((74, ty+6), subtitle, font=sub_font, fill=text_color + (200,))

    if accent:
        draw.rounded_rectangle([72, H-90, 72+140, H-84], radius=3, fill=accent)

    img = img.convert("RGB")
    if fmt == "JPEG":
        img.save(filename, "JPEG", quality=90)
    else:
        img.save(filename, "PNG", optimize=True)
    print("wrote", filename)

BASE = "/home/user/portfolio/assets/images/projects/"

# aistudy.png — dark near-black with cyan/purple/magenta gradient theme
make_card(BASE+"aistudy.png", "Study Helper AI", "AI Study Assistant", "AI Powered",
          (10,10,18), (30,15,45), text_color=(240,240,255), badge_bg=(255,255,255), accent=(0,220,220))

# akt.png — dark starfield blue theme (Abhi&k Tool)
make_card(BASE+"akt.png", "Abhi&k Tool", "35+ Utilities", "35+ Tools",
          (5,8,20), (10,18,40), text_color=(200,225,255), badge_bg=(255,255,255), accent=(90,150,255))

# fr.png — dark mystical purple/pink neon theme (See Your Future)
make_card(BASE+"fr.png", "See Your Future", "Fun AI App", "Fun App",
          (18,5,25), (35,8,45), text_color=(255,230,250), badge_bg=(255,255,255), accent=(255,60,180))

# radha.png — warm orange/yellow devotional theme
make_card(BASE+"radha.png", "Radha Naam Jaap", "Digital Counter", "Spiritual",
          (255,180,40), (255,140,20), text_color=(90,50,10), badge_bg=(255,255,255), badge_fg=(120,70,10), accent=(150,80,10))

# dudhwala.png — teal/green village app theme
make_card(BASE+"dudhwala.png", "Dudh Wala", "Milk Ledger App", "Small Business",
          (60,190,160), (100,210,170), text_color=(255,255,255), badge_bg=(255,255,255), badge_fg=(20,90,70), accent=(255,255,255))

# dukan.png — dark green offline-first shop theme
make_card(BASE+"dukan.png", "Dukan Wala", "Shop Assistant", "Small Business",
          (8,20,15), (10,35,25), text_color=(220,255,235), badge_bg=(30,140,90), badge_fg=(255,255,255), accent=(40,180,110))

# kj.jpg — warm cream/gold luxury jewellery theme
make_card(BASE+"kj.jpg", "Khushi Jewellers", "Luxury E-Commerce", "Flagship",
          (245,240,225), (235,220,190), text_color=(30,25,15), badge_bg=(180,140,70), badge_fg=(255,255,255), accent=(180,140,70), fmt="JPEG")

print("done")
