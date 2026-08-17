"""Builds the final image prompt for each of the 180 cards.

Level 1 (001-060) uses the deck text nearly as written.
Levels 2-3 (061-180) are reinterpreted tastefully: clothed or implied,
emotion- and lighting-driven, symbolic for the 'condition' cards.
"""
import json

REF = "/home/user/refs/master-style-reference.png"

HEAD = ("Use the attached image ONLY as character/style reference "
        "(Maya: 22yo woman, long wavy jet-black hair, sharp jawline, warm peach skin, "
        "dark brown eyes, elegant collarbone; Ethan: 24yo man, styled messy dark brown hair, "
        "structured athletic jawline, warm golden skin, clean-shaven). "
        "Keep both faces and the art style identical to the reference.\n\n"
        "New scene, vertical 2:3 portrait card illustration, modern romantic manhwa / Korean webtoon art: ")

TAIL = {
    1: ("\n\nStyle: clean crisp ink contours, cel-shading, natural warm skin tones, cozy warm "
        "ambient indoor lighting, full warm palette of cream, gold and terracotta, premium webtoon "
        "cover quality. Both characters fully clothed and tastefully depicted. Not monochromatic, "
        "no purple or blue color wash, no photorealism, no 3D render, no text, no watermark, "
        "correct hand anatomy."),
    2: ("\n\nStyle: clean crisp ink contours, cel-shading, glowing warm skin with soft sheen, deep evening "
        "shadows cut by hot golden rim lighting, silk and satin and lace textures, heavy charged erotic "
        "tension, flushed cheeks, parted lips, heavy-lidded hungry eyes, arched bodies, close intimate "
        "crop, sultry seductive mood, premium adult webtoon cover quality. Suggestive and steamy but "
        "non-explicit: lingerie/sleepwear or draped fabric, no exposed genitals or nipples. "
        "Not monochromatic, no purple or blue color wash, no photorealism, no 3D render, no text, "
        "no watermark, correct hand anatomy."),
    3: ("\n\nStyle: clean crisp ink contours, dramatic high-contrast cel-shading, sweat-sheened glowing skin, "
        "deep black shadows slashed by intense candlelight and hot rim lighting, tangled damp sheets, "
        "raw uninhibited passion, gasping open mouths, heavy-lidded eyes, flushed skin, gripping hands, "
        "arched straining bodies, tight cinematic crop, smouldering erotic intensity, premium adult webtoon "
        "cover quality. Steamy and intense but non-explicit: bodies covered by sheets, shadow, or "
        "strategic framing, no exposed genitals or nipples. Not monochromatic, no purple or blue color "
        "wash, no photorealism, no 3D render, no text, no watermark, correct hand anatomy."),
}

def level(n):
    return 1 if n <= 60 else (2 if n <= 120 else 3)

# Tasteful reinterpretations, keyed by card number. Anything not listed uses the deck text.
OVERRIDE = {
 63:"Ethan holding a glass of iced water, teasing Maya by touching the cool glass to her shoulder, Maya laughing and flinching away, both fully clothed in evening wear, glistening warm highlights",
 65:"Ethan admiring Maya as she wears an elegant black satin evening dress, expressive warm admiration in his eyes, Maya smiling confidently over her shoulder",
 70:"Maya guiding Ethan's hand to rest on her hip as they stand close together, intense romantic expressions, both fully clothed in elegant evening outfits",
 76:"Maya playfully tugging at the collar of Ethan's shirt with a mischievous smile, Ethan looking down at her with warm desire, both fully clothed",
 77:"Ethan kneeling slightly to hug Maya around the middle and rest his head against her, Maya's hand in his hair, both fully clothed, dim bedroom lighting",
 81:"Maya slowly sliding the strap of her elegant evening dress off one shoulder while holding unbroken eye contact with Ethan, tasteful and modest framing",
 82:"Ethan using one hand to slip Maya's cardigan off her shoulders, revealing her bare shoulder and collarbone, tasteful, she wears a camisole underneath",
 83:"the couple standing close together in stylish silk pyjama sets, admiring each other, dim romantic lighting, tasteful and fully covered",
 84:"the couple standing before a full-length mirror in matching silk pyjamas, Ethan's hands resting on Maya's waist from behind, both watching their reflection",
 85:"Ethan leaning in close behind Maya to brush her hair aside from her bare shoulder, romantic candlelight, Maya in an off-shoulder top, tasteful",
 86:"Ethan's hand resting at the side of Maya's waist just above her skirt, intense romantic focus between them, both fully clothed",
 87:"the couple kissing passionately while Ethan's hands rest at Maya's waist, her coat sliding to the floor, both still fully clothed underneath",
 88:"Maya walking slowly past Ethan in an elegant silk robe, Ethan watching her with intense focus from an armchair, tasteful and covered",
 89:"Maya dropping a silk shirt to the floor with a bold confident smirk, seen from behind over her shoulder, wearing a camisole, tasteful framing, warm shadows",
 90:"the couple helping each other out of their coats and scarves simultaneously, shoulders touching, warm smiles, still clothed underneath",
 91:"Ethan giving Maya a warm massage across her shoulders and upper back as she lies on a towel-covered bed, tasteful back-only view, candles glowing",
 92:"Ethan's hands resting at Maya's waist as he holds her close, her knit top slightly loose at the shoulder, tender close-up, tasteful",
 93:"Ethan's hand resting gently on Maya's knee as she sits beside him, Maya leaning in close, both fully clothed, warm lighting, romantic tension",
 94:"Maya blindfolded with a silk scarf, smiling in anticipation as Ethan touches a cool glass then a warm hand to her forearm, both fully clothed, playful",
 95:"Maya leaning over Ethan, her long black hair falling across his shoulder, Ethan looking up at her with parted lips, both in loose shirts",
 96:"Ethan massaging Maya's lower back with warm oil as she rests face-down on a plush bed, covered by a towel, tasteful, candlelit",
 97:"Maya sitting on Ethan's lap facing him in silk pyjamas, arms around his neck, sharing a breathless kiss, tasteful and fully covered",
 98:"Ethan resting his head against Maya's stomach as she sits, her arms wrapped around his shoulders, both in soft loungewear, dim ambient shadows",
 99:"the couple lying close together on a bed in matching soft loungewear, full body contact in a warm embrace, tasteful, feeling each other's warmth",
100:"Ethan's hand resting on the back of Maya's thigh as she sits sideways across his lap in a skirt, tasteful framing, delicate warm shading",
101:"Ethan's hand resting on Maya's hip over her silk pyjamas while she grips the bedsheets, high emotional tension, tasteful and covered",
102:"the couple lying close on a bed in silk pyjamas, sharing a breathless passionate kiss, dynamic romantic poses, tasteful, fully covered",
103:"close-up, Ethan whispering something intense into Maya's ear, Maya's eyes widening with anticipation and a flushed smile, both clothed",
104:"Ethan kissing Maya's cheek while she leans her head back against his shoulder, a trail of romantic warmth, both fully clothed in soft knitwear",
105:"Ethan pausing his hand just above Maya's, both breathless with anticipation, high romantic tension, both fully clothed",
106:"Ethan gently holding Maya's wrists above her head against the pillows and leaning in for a deep kiss, both in silk pyjamas, tasteful",
107:"close-up, Maya burying her face against Ethan's neck with a soft sigh, Ethan closing his eyes in pure contentment, both clothed",
108:"the couple lying together under a single candle flame, wrapped in a soft sheet in a warm embrace, silhouetted and tasteful, no nudity",
109:"Ethan kissing along Maya's bare collarbone with his hands clasped behind his back, Maya in an off-shoulder top, tasteful",
110:"Ethan kissing Maya's hip over the fabric of her silk pyjama shorts as she lies back smiling, tasteful and fully covered",
111:"a luxurious black silk blindfold tied over Maya's eyes, a small anticipatory smile on her lips, Ethan smirking softly in the blurred background, both clothed",
112:"Ethan leaning in to nuzzle Maya's shoulder with his hands visibly clasped behind his back, playful challenge, both fully clothed",
113:"close-up of two faces pressed close together, lips parted, stylized soft sound-wave and vapor accents in the air denoting quiet breathing",
114:"a glowing stylized pause symbol overlaid on a couple caught mid-embrace, both fully clothed, frozen dramatic moment, clean graphic card art",
115:"Ethan taking a sip from a glass of iced water before leaning in to kiss Maya, condensation on the glass, both clothed, playful romantic mood",
116:"Ethan gently pausing his hand just above Maya's waist, looking to her eyes for a nonverbal yes, Maya smiling and nodding, both fully clothed, consent moment",
117:"an elegant surreal melting clock motif floating above a couple kissing in ultra slow motion, dreamlike graphic card art, both fully clothed",
118:"symmetrical dual silhouettes of a couple performing the exact same tender touch on each other simultaneously, elegant mirrored composition",
119:"Maya teasingly tossing a silk scarf over her shoulder with a competitive playful smile, fully clothed, warm playful lighting",
120:"Maya lying back on pillows with her hands clasped behind her head, waiting with an expectant smile, fully clothed in silk pyjamas, tasteful",
121:"Ethan holding Maya's jaw and speaking intensely close to her lips, heavy dramatic shadows, both fully clothed, raw emotional tension",
122:"Ethan sitting back on the edge of a bed beckoning Maya to come closer, Maya approaching with an intent look, both in silk sleepwear, dominant mood, tasteful",
123:"close-up, Ethan pressing a firm kiss against the curve of Maya's neck, Maya gasping softly with closed eyes, both clothed, dramatic shadow",
124:"Ethan kissing down the line of Maya's throat toward her collarbone, Maya's head tilted back, both clothed, deep candlelit shadows, tasteful",
125:"the couple lying tangled in bedsheets, whispering into each other's ears with intense smiles, covered by sheets, tasteful",
126:"Ethan gripping Maya's long black hair firmly and tilting her head back for a forceful deep kiss, dynamic motion, both fully clothed",
127:"Ethan looking down at Maya lying on the bed, whispering intently, Maya covered by a sheet, dramatic candlelight, tasteful, no nudity",
128:"Ethan pressing Maya's hand flat against his chest over his open shirt, intense unbroken eye contact, dramatic rim lighting",
129:"Maya performing a slow confident dance for Ethan in a silk robe, Ethan watching from the bed, tasteful and fully covered, no nudity",
130:"close-up, Ethan speaking continuously against Maya's ear as she clutches the bedsheets with a flushed expression, both clothed",
131:"Ethan kissing Maya's knee as she sits back on the bed gripping the sheets, both in sleepwear, candlelit, tasteful, no nudity",
132:"Ethan tugging playfully at the tie of Maya's silk robe with his teeth, dark room, Maya laughing, tasteful and fully covered",
133:"Maya lying back on the bed arching with her head thrown back in bliss, covered by a rumpled sheet, Ethan's silhouetted shoulder at the frame edge, tasteful implication only, no nudity",
134:"close-up of Maya's flushed face with closed eyes and parted lips in bliss, Ethan's hand tenderly at her cheek, both clothed, implied intimacy only",
135:"Ethan leaning over Maya on the bed kissing her shoulder, Maya smiling up at him, both in sleepwear under soft sheets, tasteful",
136:"close-up of Ethan's lips very near Maya's ear and jaw, warm visible breath as a soft glow, Maya's eyes closed, both clothed",
137:"Maya's hands tangled in Ethan's dark hair pulling him closer into a kiss, passionate close-up, both clothed",
138:"Ethan pausing abruptly, both breathless and frozen at the peak of tension, gripping each other's hands, both clothed, dramatic shadow",
139:"the couple kissing deeply while their hands clasp tightly together between them, passionate, both clothed, candlelit",
140:"Ethan licking a drop of warm chocolate syrup from Maya's fingertip, both smiling playfully, both fully clothed, warm kitchen candlelight",
141:"Maya kneeling on the bed while Ethan kneels behind her, kissing along her spine over her silk camisole, tasteful and fully covered",
142:"Maya sitting facing Ethan on his lap in silk sleepwear, holding intense eye contact, arms around his neck, tasteful, no nudity",
143:"Maya lying back on soft pillows, Ethan kneeling beside her leaning in, both in sleepwear under a sheet, candlelight, tasteful",
144:"Maya's wrists loosely tied to the headboard with a black silk scarf, blindfolded and smiling, fully clothed in silk pyjamas, Ethan leaning over her",
145:"an elegant symmetrical composition of the couple lying head-to-toe together on a dark plush bed, wrapped in sheets, stylized and tasteful, no nudity",
146:"Ethan holding both of Maya's hands pinned gently to the pillow, speaking a soft command, both in sleepwear, dominant romantic mood",
147:"the couple's shoulders and arms gleaming with massage oil as they embrace on silk sheets, tasteful upper-body framing only, no nudity",
148:"Ethan holding Maya's hand and looking into her eyes with gentle reassurance as they lie close, both in sleepwear, clean tender line art",
149:"Maya looking up breathlessly at Ethan who hovers above her, high emotional tension, both in sleepwear under a sheet, tasteful",
150:"the couple standing before a mirror wrapped together in a shared sheet, Ethan holding Maya from behind as they both watch their reflection, tasteful, no nudity",
151:"Ethan hovering above Maya on the bed with unbroken intense romantic eye contact, both covered by a draped sheet, tasteful implication, no nudity",
152:"a dynamic silhouetted couple embracing intensely on a bed, motion lines and sweat gleams, deep shadow, fully abstracted and tasteful, no nudity",
153:"Maya sitting upright on the bed with her head thrown back in bliss, hands braced on Ethan's chest, both covered by draped sheets, tasteful, no nudity",
154:"Ethan lifting Maya up against the bedroom wall, her legs wrapped around his waist, passionate kiss, both fully clothed, dramatic rim light",
155:"a dynamic three-panel manhwa card showing the same couple in three different tender embraces, stylized paneling, both clothed, no nudity",
156:"the couple frozen in a tight breathless embrace, gripping each other at the peak of tension, covered by sheets, dramatic candlelight, tasteful",
157:"Ethan holding Maya's wrists pinned above her head on the pillow, foreheads close, both in sleepwear under sheets, intense, tasteful",
158:"the couple spooning together on the bed under a soft sheet, Ethan's arm around Maya's waist, peaceful candlelight, tasteful, fully covered",
159:"a stylized silhouette of an intertwined couple on a bed, elegant abstract linework, deep shadow and candlelight, tasteful, no explicit detail",
160:"the couple holding each other in a tight slow embrace on the bed, swaying gently, covered by sheets, deeply sensual but tasteful",
161:"close-up of the couple's faces together, both with ecstatic blissful expressions and closed eyes, gripping each other tightly, shoulders only, tasteful",
162:"close-up of Maya with her head tilted back in overwhelming bliss while Ethan kisses her throat, shoulders-up framing, both clothed",
163:"a moody near-dark silhouette of a couple in a tight embrace, illuminated only by a distant candle and faint gleams on skin, abstract and tasteful",
164:"the couple resting completely still with foreheads touching, breathless relief and small smiles, wrapped in a sheet, tasteful",
165:"the couple sharing a desperate breathless kiss at the peak moment, hands gripping each other's shoulders, tasteful, covered",
166:"Ethan whispering softly into Maya's ear as she grips his back, blissful expression washing over her face, shoulders-up framing, tasteful",
167:"close-up of Maya's hand gripping firmly into Ethan's shoulder and upper back, visible tension in her fingers, dramatic shadow, shoulders only",
168:"the couple collapsing together onto rumpled sheets, breathing heavily and smiling in blissful exhaustion, wrapped in the sheet, tasteful",
169:"close-up, Ethan whispering into Maya's ear with both smiling and relaxed eyelids, afterglow warmth, wrapped in sheets, tasteful",
170:"the couple tangled peacefully together in bedsheets in a tight afterglow embrace, only shoulders and faces visible, serene, tasteful",
171:"Maya biting a pillow to muffle a sound with an intense restrained expression, Ethan's hand resting on her shoulder, both clothed, dramatic shadow",
172:"Maya blindfolded with a black silk tie, smiling as Ethan gently guides her hands, both fully clothed, candlelit card art",
173:"close-up of Ethan's determined focused eyes as he looks down at Maya with total devotion, both clothed, dramatic rim lighting",
174:"a glowing digital timer reading 00:60 floating beside a stylized silhouetted couple embracing, clean graphic card art, tasteful",
175:"a pair of wrists bound with soft red silk cord resting on white pillows, elegant clean graphic novel card art, no people beyond the hands",
176:"extreme close-up of lips whispering directly against an ear, with dynamic stylized sound-wave accents, warm shadow, clean card art",
177:"a couple frozen mid-embrace with a glowing blue-white ice crystal motif overlaid, dynamic dramatic card art, both clothed",
178:"close-up of Ethan's strong hands firmly holding Maya's hips in place over her silk pyjamas, controlling the rhythm, tasteful, dominant mood",
179:"Ethan kneeling beside the bed holding Maya's hand devotedly, an hourglass timer on the nightstand beside them, both clothed, candlelight",
180:"the couple sleeping peacefully wrapped in each other's arms under soft sheets, shoulders visible, soft dawn light filtering through the window, serene and tasteful",
}


def build(card):
    n = card["n"]
    lv = level(n)
    body = OVERRIDE.get(n)
    if body is None:
        body = card["desc"]
        # strip leading style words already covered by HEAD
        for p in ("Modern manhwa illustration, ", "Romantic webtoon illustration, "):
            if body.startswith(p):
                body = body[len(p):]
        body += " Both characters fully clothed."
    return HEAD + body + TAIL[lv]


if __name__ == "__main__":
    deck = json.load(open("/home/user/deck.json"))
    out = [{"n": c["n"], "title": c["title"], "level": level(c["n"]),
            "file": "card-%02d" % c["n"] if c["n"] < 100 else "card-%d" % c["n"],
            "prompt": build(c)} for c in deck]
    json.dump(out, open("/home/user/prompts.json", "w"), indent=1)
    print("built", len(out))
