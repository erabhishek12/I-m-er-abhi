Part 1: Master Generation Guide & Workflow

To produce a consistent 180-card deck with a unified aesthetic (matching the
modern romantic Manhwa/graphic novel illustration style with natural warm skin
tones), follow this technical setup:

+---------------------------------------------------------------------------------------------------+
|                                  THE 4-PILLAR CONSISTENCY ENGINE                                  |
+---------------------------------+---------------------------------+-------------------------------+
| 1. Character Reference Target   | 2. Style Reference Anchor       | 3. Aspect Ratio Control       |
| Define fixed physical anchors:  | Lock in inking weight, cel-     | Hardcode `--ar 2:3`           |
| (e.g., raven hair, warm skin)   | shading, and natural lighting.  | (Vertical Card Format).       |
+---------------------------------+---------------------------------+-------------------------------+

1. Defining Fixed Character Tokens

Never leave character descriptions open to random seed interpretation. Use a
fixed descriptor in every prompt:

  - Female Character ("Maya"): A 22-year-old young adult woman with long wavy
    jet-black hair, sharp jawline, warm peach skin tone, dark brown eyes,
    elegant collarbone.
  - Male Character ("Ethan"): A 24-year-old young adult man with styled messy
    dark hair, structured athletic jawline, warm golden skin tone, clean-shaven.

2. Maintaining Consistency Across Platforms

  - In Midjourney v6:
    1.  Generate one single master card illustration that you love.
    2.  Copy its image URL.
    3.  Append --cref <URL> --cw 80 (Character Reference) and --sref <URL>
        (Style Reference) to all subsequent prompts.
  - In Stable Diffusion / Flux / SeaArt / Fooocus:
      - Use IP-Adapter (Face & Style) with a single base reference image.
      - Keep your Seed fixed or run with a dedicated Manhwa LoRA.
      - Set resolution strictly to 832×1216 or 1024×1536 (Vertical
        Portrait 2:3).

3. Universal Negative Prompt (Crucial to block monochromatic overlays)

(monochromatic:1.5), (purple overlay, purple tint, blue cast, single color wash:1.4), photo, 3d render, photorealism, CGI, sketch, rough drawing, messy line art, bad hands, deformed fingers, extra limbs, bad anatomy, flat colors, washed out, low resolution, text, watermark, logo.

4. Universal Style Suffix

Append this to every prompt below: --ar 2:3 --stylize 250 --v 6.0

🟢 LEVEL 1: SOFT ROMANCE (Prompts 001 - 060)

Theme Aesthetic: Warm ambient indoor lighting, gentle pastel accents, cozy
bedroom and lounge settings, soft emotional intimacy.

Base 1: Sweet Whispers (Cards 001 - 010)

  - 001 (Sweet Compliment): Modern manhwa illustration, Ethan gently leaning
    close to whisper into Maya's ear, Maya blushing with a sweet smile, warm
    glowing side lamp, clean ink contours, natural skin tones.
  - 002 (Eye Contact): Close-up vector manhwa art, Ethan and Maya sitting
    opposite each other holding hands on a table, intense yet tender unbroken
    eye contact, soft golden hour lighting.
  - 003 (First Date Memory): Stylized graphic novel art, couple sitting on a
    cozy couch reminiscing, warm emotional expressions, relaxed posture, clean
    line art, soft ambient background.
  - 004 (Slow Dance): Romantic webtoon illustration, young adult couple slow
    dancing closely in a dim room, Maya resting her chin on Ethan's shoulder,
    elegant silhouette, natural colors.
  - 005 (Neck Scent): Minimalist aesthetic manhwa art, Ethan gently burying his
    nose near the side of Maya's neck, breathing in her scent, closed eyes in
    deep affection, soft room glow.
  - 006 (Adoration): Stylized couple illustration, Ethan looking admiringly at
    Maya while pointing warmly, expressive gentle smile, modern clean line work,
    cozy aesthetic.
  - 007 (Lip Tease Distance): Close-up profile manhwa art, Ethan and Maya with
    faces inches apart, lips almost touching with romantic tension, soft backlit
    glow, sharp clean contours.
  - 008 (Warm Breath): Artistic vector manhwa style, Ethan playfully blowing a
    soft warm breath against Maya's neck, Maya tilting her head with a happy
    giggle, delicate inking.
  - 009 (Dream Sharing): Romantic digital illustration, couple lying on a plush
    rug looking up at the ceiling together, intertwined fingers, dreamy warm
    lighting, natural skin tones.
  - 010 (Jawline Trace): Close-up romantic webtoon art, Ethan's slender fingers
    gently tracing Maya's jawline and chin, Maya looking up softly, detailed
    hand anatomy.

Base 2: Gentle Touches (Cards 011 - 020)

  - 011 (Shoulder Massage): Modern manhwa illustration, Ethan standing behind
    Maya giving a relaxing shoulder massage, Maya tilting her head in relief,
    cozy bedroom setting, clean lines.
  - 012 (Hair Stroke): Stylized graphic novel illustration, Ethan running his
    fingers through Maya's long wavy black hair, tender loving gaze, soft warm
    highlights.
  - 013 (Hand Kiss): Romantic webtoon art, Ethan raising Maya's hand to his
    lips, kissing the back of her wrist, elegant posture, clean ink lines, warm
    ambient lighting.
  - 014 (Back Caress): Sensual romantic manhwa art, Ethan's hand gently sliding
    under Maya's collar to stroke her upper back, subtle romantic blush, clean
    contours.
  - 015 (Couch Cuddle): Cozy couple illustration, Maya and Ethan cuddling
    closely on a deep velvet couch with their heads touching, soft blanket, warm
    lamp light.
  - 016 (Arm Stroke): Close-up digital illustration, Ethan slowly caressing
    Maya's bare arm from shoulder to wrist, soft skin texture, gentle lighting.
  - 017 (60-Sec Hug): Full body manhwa illustration, couple locked in a deep,
    tight full-body hug, eyes closed in complete peace, clean vector style.
  - 018 (Waist Pull): Romantic graphic novel illustration, Ethan placing both
    hands on Maya's waist and pulling her body flush against his, romantic eye
    contact.
  - 019 (Foot Massage): Cozy intimate scene, Ethan gently massaging Maya's feet
    while she relaxes on plush pillows, warm soft-toned bedroom aesthetic.
  - 020 (Palm Heart Trace): Close-up romantic vector art, Ethan tracing a heart
    shape into Maya's open palm with his fingertip, sweet intimate framing.

Base 3: Warm Kisses (Cards 021 - 030)

  - 021 (Face Kisses): Charming manhwa illustration, Ethan peppering Maya's
    forehead, cheeks, and nose with sweet kisses, Maya smiling with closed eyes.
  - 022 (Collarbone Trail): Sensual webtoon illustration, Ethan placing a slow
    trail of soft kisses along Maya's sharp collarbone, head tilted back, soft
    lighting.
  - 023 (Eyelid Kiss): Tender graphic novel art, Ethan gently kissing Maya's
    closed eyelid, extreme emotional intimacy, delicate fine line work.
  - 024 (Slow Lip Kiss): Romantic manhwa art, couple sharing a slow,
    tender 30-second kiss on the lips, soft rosy lip highlights, natural warm
    lighting.
  - 025 (Behind Ear Kiss): Close-up illustration, Ethan kissing the sensitive
    spot directly behind Maya's ear, Maya shivering with delight, detailed hair
    strands.
  - 026 (Chin to Lip Kiss): Aesthetic manhwa drawing, Ethan kissing Maya's chin
    and moving up toward her lower lip, high romantic tension, clean lines.
  - 027 (Shoulder Kiss): Modern manhwa illustration, Ethan kissing Maya's bare
    shoulder from behind as she wears an off-shoulder top, warm skin tones.
  - 028 (Interlocked Hands Kiss): Romantic webtoon art, couple kissing while
    their hands are tightly interlocked between them, clean graphic novel style.
  - 029 (Neck Side Kisses): Sensual vector illustration, Ethan delivering three
    gentle kisses along the side of Maya's neck, subtle blushing skin.
  - 030 (Cupped Face Kiss): Full emotion manhwa illustration, Ethan cupping
    Maya's face with both hands for a long passionate kiss, warm ambient
    lighting.

Base 4: Close Embrace (Cards 031 - 040)

  - 031 (Legs Intertwined): Cozy manhwa art, Ethan and Maya lying face-to-face
    in bed with their legs intertwined, casual sleepwear, soft morning light.
  - 032 (Heartbeat Listen): Intimate graphic novel drawing, Maya resting her
    head on Ethan's bare chest listening to his heartbeat, peaceful romantic
    atmosphere.
  - 033 (Unbuttoning Top): Sensual webtoon illustration, Maya's hands gently
    undoing the top buttons of Ethan's shirt, eye contact, romantic tension.
  - 034 (Blanket Cocoon): Cute romantic manhwa art, couple wrapped tightly
    together inside a thick fluffy duvet, only faces visible, smiling happily.
  - 035 (Synced Breathing): Close-up manhwa art, couple embracing tightly with
    foreheads touching, eyes closed, calm synced emotional warmth.
  - 036 (Feeding Fruit): Playful romantic scene, Maya feeding Ethan a strawberry
    from her hand, Ethan smiling, warm kitchen/bedroom backdrop.
  - 037 (Shoulder Rest): Tender graphic novel illustration, Maya resting her
    chin on Ethan's shoulder from behind, whispering into his ear, warm
    lighting.
  - 038 (Stomach Circles): Close-up manhwa drawing, Ethan's hand tracing gentle
    circles over Maya's midriff over her soft fabric top, clean inking.
  - 039 (Back Hug Sway): Romantic webtoon art, Ethan hugging Maya from behind
    around the waist while swaying slowly near a window, city lights outside.
  - 040 (Floor Cuddle): Casual intimate illustration, couple sitting on the rug
    leaning back against the bed, shoulders touching, holding mugs together.

Base 5: Heartfelt Connection (Cards 041 - 050)

  - 041 (1-Min Deep Kiss): Passionate modern manhwa illustration, couple engaged
    in an intense, uninterrupted one-minute romantic kiss, dynamic hair
    movement.
  - 042 (Promises): Emotional graphic novel art, Ethan holding both of Maya's
    hands close to his chest while speaking earnestly, deep emotional bond.
  - 043 (Silent Gaze): Intimate manhwa art, couple lying side-by-side on
    pillows, gazing into each other's eyes in peaceful silence, soft candle
    glow.
  - 044 (Jaw to Chest Trail): Sensual webtoon illustration, Ethan kissing a slow
    line from Maya's jawline down to the center of her collarbone, warm
    lighting.
  - 045 (Safe Embrace): Tender graphic novel illustration, Maya burying her face
    into Ethan's chest, Ethan wrapping his strong arms protectively around her.
  - 046 (Body Heat): Sensual aesthetic manhwa art, full body embrace with arms
    wrapped around backs, feeling mutual body warmth, natural skin tones.
  - 047 (Deep Whisper): Close-up illustration, Ethan whispering words of love
    directly against Maya's lips, warm emotional expression.
  - 048 (Closed Lip Trace): Minimalist manhwa art, Ethan lightly brushing his
    closed lips across Maya's lips, intense romantic anticipation.
  - 049 (Lap Rest): Cozy manhwa scene, Ethan resting his head in Maya's lap as
    she gently strokes his hair, warm bedside lamp aesthetic.
  - 050 (Neck Kiss Dream): Romantic webtoon illustration, Ethan kissing Maya's
    neck softly while holding her waist, both smiling with contentment.

Category 6: Playful Conditions (Cards 051 - 060)

  - 051 (Smiling Rule): Cute manhwa card art, couple looking at each other with
    beaming smiles, sparkling romantic accents, clean vector icon style.
  - 052 (Locked Hands): Stylized graphic novel art, two hands tightly
    interlocked with golden romantic line accents, clean modern card art.
  - 053 (Whisper Only): Minimalist manhwa card art, a stylized character holding
    a finger to their lips in a playful 'shh' gesture, warm lighting.
  - 054 (Eye Lock): Close-up graphic illustration of two pairs of expressive
    romantic eyes looking directly forward, intense focus, clean line art.
  - 055 (Cheek Kiss Penalty): Cute webtoon card graphic, one character planting
    a joyful kiss on the other's blushing cheek, sparkling stars.
  - 056 (No Phones): Minimalist modern graphic novel icon, a smartphone turned
    face-down beside two interlocked hands, clean aesthetic.
  - 057 (Zero Space): Stylized manhwa illustration, couple sitting with
    shoulders and knees pressed tightly together, warm cozy framing.
  - 058 (Thank You Kiss): Sweet romantic webtoon illustration, Maya bowing her
    head slightly with a hand over her heart, smiling sweetly at Ethan.
  - 059 (Eyes Closed Task): Artistic manhwa card illustration, Ethan performing
    a gentle touch with eyes peacefully shut, soft dreamlike glow.
  - 060 (Deep Breaths): Minimalist aesthetic card art, couple holding hands with
    chest rising in synced breath, soft glowing aura, clean lines.

🟡 LEVEL 2: SENSUAL PASSION (Prompts 061 - 120)

Theme Aesthetic: Deep evening tones, warm golden rim lighting, silk satin
fabrics, heightened physical tension, skin-to-skin touch.

Base 1: Seductive Tease (Cards 061 - 070)

  - 061 (Naughty Whisper): Manhwa cover illustration, Maya leaning with a
    mischievous smirk whispering into Ethan's ear, Ethan gripping the couch with
    tension.
  - 062 (Earlobe Nibble): Close-up manhwa art, Ethan gently biting Maya's
    earlobe, warm breath visible as a subtle glow, Maya's head tilting back.
  - 063 (Ice Glide): Sensual digital manhwa art, Ethan sliding an ice cube down
    Maya's chest and neck, glistening skin highlights, natural warm skin tones.
  - 064 (45-Sec Near Kiss): High tension manhwa illustration, lips millimeter
    apart, heavy breathing, sharp jawlines, warm golden rim lighting.
  - 065 (Outfit Desire): Stylized webtoon art, Ethan checking out Maya wearing a
    black satin slip dress, expressive desire in his eyes, clean contours.
  - 066 (No-Hands Jaw Trace): Sensual graphic novel art, Ethan using only his
    lips to trace along Maya's jawline, hands deliberately behind his back.
  - 067 (Inner Arm Stroke): Close-up romantic manhwa drawing, Ethan's fingertips
    tracing Maya's sensitive inner arm, delicate goosebumps, warm shading.
  - 068 (Lip Bite): Expressive manhwa close-up, Maya biting her lower lip
    seductively while locking eyes with Ethan, glowing ambient lighting.
  - 069 (Head-to-Toe Gaze): Dynamic graphic novel panel, Ethan giving Maya a
    slow, hungry gaze from top to bottom, romantic tension in the room.
  - 070 (Sensitive Spot Touch): Sensual manhwa illustration, Maya guiding
    Ethan's hand to her lower hip, intense romantic expression, natural skin
    tones.

Base 2: Deep Kisses (Cards 071 - 080)

  - 071 (Passionate French Kiss): Intense manhwa illustration, Ethan and Maya
    sharing a deep passionate kiss, Ethan's hand in her hair, Maya's arms around
    his neck.
  - 072 (Lower Lip Nibble): Sensual close-up webtoon art, Ethan gently catching
    Maya's lower lip with his teeth during a wet kiss, glossy lips, clean line
    work.
  - 073 (Neck Mark Kiss): Passionate graphic novel illustration, Ethan pressing
    his lips firmly against Maya's neck, leaving a warm blush, Maya clutching
    his shoulder.
  - 074 (Full Face Kiss Finale): Manhwa illustration, Ethan peppering small
    kisses all over Maya's cheeks and jaw, approaching her lips for the finale.
  - 075 (Warm Breath Tease): Close-up manhwa drawing, Ethan exhaling warm breath
    right against the curve of Maya's neck, Maya arching her back softly.
  - 076 (Teeth Unbuttoning): Sensual webtoon art, Maya using only her teeth to
    unbutton Ethan's shirt, Ethan looking down with intense desire, clean
    inking.
  - 077 (Stomach to Belt Kiss): Sensual manhwa illustration, Ethan kneeling
    slightly to kiss down Maya's stomach toward her waistband, dim bedroom
    lighting.
  - 078 (Tongue & Peck Alternate): Dynamic manhwa kiss illustration, alternating
    between intense tongue kiss and teasing pecks, messy hair, warm skin tones.
  - 079 (Nape Pull Kiss): Passionate graphic novel drawing, Ethan placing his
    hand at the back of Maya's neck, pulling her in for a commanding kiss.
  - 080 (Wrist Kiss Gaze): Sensual webtoon art, Ethan kissing the sensitive skin
    inside Maya's wrist while maintaining direct eye contact.

Base 3: Removing Layers (Cards 081 - 090)

  - 081 (Slow Strip Gaze): Sensual manhwa illustration, Maya slowly sliding a
    strap off her shoulder while holding unbroken eye contact with Ethan.
  - 082 (One-Hand Shirt Removal): Dynamic webtoon art, Ethan using one hand to
    slip Maya's blouse off her shoulders, reveal of bare collarbone, clean
    contours.
  - 083 (Strip to Underwear): Sensual graphic novel art, Ethan and Maya standing
    in stylish dark underwear, admiring each other's toned bodies, dim lighting.
  - 084 (Mirror Reflection Underwear): Manhwa illustration, couple standing in
    front of a full-length mirror in underwear, Ethan's hands resting on Maya's
    hips from behind.
  - 085 (Teeth Bra Unclasp): Sensual webtoon drawing, Ethan skillfully
    unclasping Maya's top with his teeth, romantic candlelight in background.
  - 086 (Hand Under Waistband): Close-up manhwa art, Ethan's hand sliding just
    inside the waistband of Maya's skirt, intense romantic focus, clean line
    work.
  - 087 (Kiss While Undressing): Dynamic romantic illustration, couple
    passionately kissing while Ethan slides Maya's skirt down to the floor.
  - 088 (Seductive Walk): Sensual manhwa panel, Maya walking slowly past Ethan
    in black lace underwear, Ethan watching with intense focus.
  - 089 (Garment Drop): Graphic novel art, Maya dropping a silk shirt to the
    floor with a bold smirk, clean line contours, warm shadows.
  - 090 (Mutual Undress): Sensual manhwa illustration, couple helping each other
    remove their final shirts simultaneously, bare shoulders touching.

Base 4: Sensual Touch (Cards 091 - 100)

  - 091 (Oil Back Massage): Sensual manhwa art, Ethan applying warm massage oil
    down Maya's bare back, smooth glistening skin highlights, candles glowing.
  - 092 (Hands on Ribs): Close-up graphic novel drawing, Ethan's hands caressing
    Maya's bare waist and ribcage under her loosened top.
  - 093 (Inner Thigh Stroke): Sensual webtoon illustration, Ethan's hand gently
    caressing Maya's inner thigh, Maya arching slightly, warm lighting.
  - 094 (Ice & Warm Hands): Artistic manhwa art, Maya blindfolded while Ethan
    contrasts cold ice and warm hands against her stomach, clean line work.
  - 095 (Hair Trail on Chest): Sensual illustration, Maya trailing her long
    black hair across Ethan's bare chest, Ethan looking up with parted lips.
  - 096 (Hip & Glute Massage): Sensual graphic novel art, Ethan firmly massaging
    Maya's hips and lower back with warm oil on a plush bed.
  - 097 (Lap Straddle Grind): Passionate manhwa art, Maya straddling Ethan's lap
    in silk lingerie, their hips touching, sharing a breathless kiss.
  - 098 (Navel Wet Kisses): Sensual close-up drawing, Ethan placing wet kisses
    around Maya's belly button and hip bones, dim ambient shadows.
  - 099 (Full Body Heat): Sensual webtoon illustration, couple lying on top of
    each other in underwear, full body contact, feeling mutual skin heat.
  - 100 (Back of Thigh Trace): Close-up manhwa art, Ethan's fingers slowly
    tracing up the back of Maya's thigh to her hip, delicate skin shading.

Base 5: Passionate Foreplay (Cards 101 - 110)

  - 101 (Over-Fabric Tease): Sensual manhwa drawing, Ethan's hand teasing Maya
    over her silk underwear, Maya gripping the bedsheets, high tension.
  - 102 (Dry Humping Grind): Passionate graphic novel illustration, couple
    grinding against each other on the bed in underwear, breathless kiss,
    dynamic poses.
  - 103 (Climax Whisper): Close-up manhwa panel, Ethan whispering dirty promises
    into Maya's ear, Maya's eyes widening with anticipation.
  - 104 (Full Trail of Kisses): Sensual webtoon art, Ethan kissing a continuous
    trail from Maya's lips, down her chest, down to her thighs.
  - 105 (Edging Touch): Intense manhwa art, Ethan building up fast touch and
    suddenly pausing right on the edge, Maya gasping for breath.
  - 106 (Pinned Hands Kiss): Dominant romantic manhwa art, Ethan pinning both of
    Maya's wrists above her head on pillows, leaning in for a deep kiss.
  - 107 (Moan in Ear): Close-up graphic novel drawing, Maya moaning softly
    against Ethan's neck, Ethan closing his eyes in pure pleasure.
  - 108 (Naked Dim Light): Sensual manhwa illustration, couple lying completely
    naked together under a single candle flame, skin-to-skin embrace.
  - 109 (Lips & Tongue Only): Sensual webtoon art, Ethan exploring Maya's bare
    collarbone and stomach using only his lips and tongue, hands behind back.
  - 110 (Teeth Underwear Pull): Sensual close-up drawing, Ethan using his teeth
    to tug the side strap of Maya's underwear down slightly, kissing her hip.

Category 6: Kinky Conditions (Cards 111 - 120)

  - 111 (Silk Blindfold): Stylized manhwa card art, a luxurious black silk
    blindfold tied over Maya's eyes, Ethan smirking in the background.
  - 112 (No Hands Task): Dynamic graphic novel card art, Ethan leaning in to
    undress Maya using only his mouth, hands visibly held behind back.
  - 113 (Silence/Moans Only): Close-up manhwa card illustration, two faces
    pressed close, lips parted with vapor/sound wave accents denoting moans
    only.
  - 114 (Freeze Command): Stylized webtoon card art, a glowing pause symbol
    overlaid on a couple caught in an intense intimate embrace.
  - 115 (Cold Water Sip): Sensual graphic card drawing, Ethan taking a sip from
    a glass of iced water before leaning in to kiss Maya.
  - 116 (Permission Check): Romantic manhwa card art, Ethan gently pausing his
    hand above Maya's waist, looking at her for nonverbal consent.
  - 117 (Slow Motion): Aesthetic graphic novel card art, an elegant melting
    clock motif floating above a couple kissing in ultra-slow motion.
  - 118 (Mirror Reflection Action): Dual silhouette manhwa art, couple
    performing the exact same sensual touch on each other simultaneously in
    symmetry.
  - 119 (Strip Penalty): Playful manhwa card art, Maya teasingly tossing a piece
    of lingerie over her shoulder with a competitive smile.
  - 120 (Hands Behind Back): Sensual webtoon card illustration, Maya lying back
    with wrists held behind her back, waiting for Ethan's touch.

🔴 LEVEL 3: WILD INTIMACY (Prompts 121 - 180)

Theme Aesthetic: Deep shadows, intense candlelight, dramatic rim lighting,
uninhibited physical passion, sweat on skin, raw graphic novel romance.

Base 1: Dirty Talk & Command (Cards 121 - 130)

  - 121 (Raw Desire Talk): Intense manhwa illustration, Ethan holding Maya by
    the jaw, speaking raw dirty desires into her parted lips, heavy shadows.
  - 122 (Kneeling Command): Dominant graphic novel art, Ethan sitting back on
    the bed commanding Maya to approach, Maya looking up with desire.
  - 123 (Passionate Bite): Passionate manhwa close-up, Ethan taking a firm
    passionate bite on Maya's neck/shoulder, leaving a red mark, Maya gasping.
  - 124 (Tongue Line to Navel): Sensual webtoon illustration, Ethan dragging his
    wet tongue in a slow line from Maya's collarbone all the way to her navel.
  - 125 (Wild Fantasy): Close-up manhwa art, couple lying tangled in sheets,
    whispering intense wild fantasies into each other's ears.
  - 126 (Hair Pull Rough Kiss): Dynamic graphic novel drawing, Ethan gripping
    Maya's long black hair firmly, tilting her head back for a forceful deep
    kiss.
  - 127 (Verbal Tasting Plan): Sensual manhwa panel, Ethan looking down at
    Maya's bare body, whispering exactly which parts he will taste first.
  - 128 (Hand Press Private): Close-up sensual drawing, Ethan placing Maya's
    hand firmly over his bare intimate area, pressing down with intense eye
    contact.
  - 129 (Full Striptease): Sensual manhwa art, Maya completely naked, performing
    a slow confident striptease for Ethan who watches from the bed.
  - 130 (Non-Stop Dirty Talk): Close-up webtoon illustration, Ethan speaking
    non-stop dirty words against Maya's ear as she clutches the bedsheets.

Base 2: Oral Pleasure & Deep Tease (Cards 131 - 140)

  - 131 (Inner Thigh Licking): Sensual manhwa illustration, Ethan kissing and
    licking Maya's inner thighs, getting millimeters from her center, Maya
    gripping sheets.
  - 132 (Teeth Strip Underwear): Passionate webtoon art, Ethan ripping off
    Maya's lace underwear with his teeth, throwing it across the dark room.
  - 133 (3-Min Oral Pleasure): Sensual graphic novel art, Ethan positioned
    between Maya's legs giving intense oral pleasure, Maya arching her back with
    head thrown back.
  - 134 (Finger Stimulation): Intimate manhwa art, Ethan's hand deeply
    stimulating Maya with glistening moisture highlights, Maya gasping with
    closed eyes.
  - 135 (Full Body Licking): Sensual webtoon drawing, Ethan pinning Maya to the
    bed, kissing and licking every inch of her bare naked skin.
  - 136 (Breath & Lick Alternate): Close-up manhwa art, Ethan alternating warm
    breath, licking, and blowing on Maya's most sensitive intimate spot.
  - 137 (Guiding Head): Sensual graphic novel illustration, Maya's hands tangled
    in Ethan's dark hair, guiding his head down to her center.
  - 138 (Manual Edging): Intense manhwa drawing, Ethan stimulating Maya to the
    absolute brink of climax and stopping abruptly twice, high pleasure.
  - 139 (Simultaneous Touch Kiss): Passionate webtoon art, couple French kissing
    deeply while their hands stimulate each other's private areas
    simultaneously.
  - 140 (Syrup Lick Off Chest): Sensual manhwa illustration, Ethan licking warm
    sweet chocolate/syrup directly off Maya's bare chest and stomach.

Base 3: Naked Dominance (Cards 141 - 150)

  - 141 (Doggy Setup Spank): Dominant manhwa art, Maya on all fours on the bed,
    Ethan behind her giving a firm playful spank to her hip, kissing her spine.
  - 142 (Naked Straddle Grind): Sensual graphic novel illustration, completely
    naked Maya straddling Ethan, grinding her hips slowly while holding intense
    eye contact.
  - 143 (Pillow Elevation Angle): Intimate manhwa art, pillows placed under
    Maya's hips for elevation, Ethan kneeling between her thighs ready for
    entry.
  - 144 (Tied to Bedposts): Kinky webtoon drawing, Maya's wrists tied gently to
    the headboard with a black silk scarf, blindfolded, Ethan leaning over her.
  - 145 (69 Oral Position): Sensual graphic novel illustration, couple in a
    tasteful 69 position on a dark plush bed, giving mutual oral pleasure
    simultaneously.
  - 146 (Full Dominance Control): Dominant manhwa art, Ethan holding both of
    Maya's hands pinned down, dictating her breathing and movements with a
    command.
  - 147 (Full Body Oil Slide): Sensual webtoon illustration, both naked bodies
    coated in shimmering massage oil, sliding against each other on silk sheets.
  - 148 (Finger Preparation): Intimate manhwa art, Ethan slowly preparing Maya
    with glistening fingers, gentle romantic eye contact, clean line art.
  - 149 (Begging for Entry): High tension graphic novel drawing, Maya looking up
    at Ethan, breathlessly asking him to enter her, Ethan hovering over her.
  - 150 (Mirror Naked Watch): Sensual manhwa art, couple naked in front of a
    mirror, Ethan caressing Maya from behind while they both watch their
    reflection.

Base 4: Raw Penetration & Positions (Cards 151 - 160)

  - 151 (Missionary Eye Contact): Passionate manhwa art, deep slow missionary
    penetration, Ethan hovering over Maya with unbroken intense romantic eye
    contact.
  - 152 (Fast Doggy Style): Dynamic graphic novel illustration, intense Doggy
    Style position, Ethan gripping Maya's hips firmly, fast motion lines, sweat
    on skin.
  - 153 (Cowgirl Riding): Sensual manhwa drawing, Maya on top riding Ethan in
    Cowgirl position, head thrown back, hands on Ethan's chest, Ethan gripping
    her waist.
  - 154 (Standing Against Wall): Passionate webtoon art, Ethan lifting Maya
    against the bedroom wall for deep standing penetration, Maya's legs wrapped
    around him.
  - 155 (3-Position Switch): Dynamic multi-panel manhwa art showing smooth
    transitions between missionary, cowgirl, and doggy style positions.
  - 156 (Penetration Edging): Intense graphic novel art, Ethan pausing deep
    inside Maya right before the point of no return, both gripping each other
    breathless.
  - 157 (Pinned Hands Thrust): Dominant manhwa illustration, Ethan holding
    Maya's wrists pinned above her head on the pillow, thrusting deeply toward
    climax.
  - 158 (Spooning Position): Intimate sensual webtoon art, couple spooning
    together from behind on the bed, slow rhythmic deep penetration,
    candlelight.
  - 159 (Legs on Shoulders): Sensual manhwa drawing, Maya's legs resting over
    Ethan's shoulders for maximum depth of penetration, passionate facial
    expressions.
  - 160 (Rhythmic Circles): Passionate graphic novel art, couple holding each
    other in a tight embrace, moving in slow deep sensual circles on the bed.

Base 5: Explosive Climax (Cards 161 - 170)

  - 161 (Simultaneous Climax): Intense romantic manhwa art, couple reaching
    explosive orgasm together, ecstatic facial expressions, gripping each other
    tightly.
  - 162 (Uninhibited Moan): Close-up manhwa illustration, Maya with head tilted
    back screaming in pure pleasure, Ethan kissing her throat.
  - 163 (Dark Wild Sex): Moody graphic novel drawing, raw wild intimacy in near
    total darkness, illuminated only by sweat gleams and a distant candle.
  - 164 (Post-Climax Pulse): Sensual manhwa art, Ethan resting completely still
    deep inside Maya after climax, foreheads touching, breathless relief.
  - 165 (Climax Kiss): Passionate webtoon art, couple sharing a desperate,
    breathless kiss on the lips at the exact peak moment of release.
  - 166 (Commanded Release): Dominant manhwa drawing, Ethan whispering the
    command to let go, Maya gripping his back as full-body climax washes over
    them.
  - 167 (Back Grip Spasm): Sensual close-up art, Maya's fingernails digging
    firmly into Ethan's muscular back during an intense climax, visible tension.
  - 168 (Breathless Collapse): Tender graphic novel art, couple collapsing
    together naked onto sweat-dampened sheets, breathing heavily, smiling in
    bliss.
  - 169 (Post-Release Whisper): Close-up manhwa drawing, Ethan whispering into
    Maya's ear immediately after climax, both smiling with relaxed eyelids.
  - 170 (10-Min Naked Cuddle): Peaceful romantic manhwa illustration, couple
    tangled completely naked in bedsheets, locked in a tight afterglow embrace.

Category 6: Hardcore Conditions (Cards 171 - 180)

  - 171 (Forbidden Moan): Sensual manhwa card art, Maya biting a pillow to
    muffle her moans while Ethan touches her, intense restraint expression.
  - 172 (Full Blindfold Sex): Graphic novel card art, Maya completely
    blindfolded with a black silk tie during intimacy, Ethan guiding her hands.
  - 173 (Partner First Rule): Manhwa card illustration, Ethan holding back his
    release, focused entirely on making Maya climax first, determination in
    eyes.
  - 174 (60-Sec Timer Alarm): Stylized webtoon card art, an illuminated digital
    timer showing 00:60 floating beside an active couple shifting positions.
  - 175 (Tied Hands Restriction): Sensual manhwa card drawing, wrists bound with
    a soft red silk cord, hands pinned to pillows, clean graphic novel style.
  - 176 (Continuous Dirty Talk): Close-up graphic novel card art, mouth
    whispering directly against an ear, dynamic sound waves and speech bubble
    accents.
  - 177 (Freeze in Motion): Dynamic manhwa card art, couple frozen in mid-thrust
    with a glowing ice-crystal motif overlaid, intense romantic tension.
  - 178 (100% Pace Control): Dominant webtoon card art, Ethan's strong hands
    firmly locking Maya's hips in place to control the exact rhythm.
  - 179 (5-Min Oral Prerequisite): Sensual manhwa card illustration, Ethan
    kneeling between Maya's legs with an hourglass timer beside the bed.
  - 180 (15-Min Skin-to-Skin): Peaceful graphic novel card art, completely naked
    couple sleeping wrapped in each other's arms, soft dawn light filtering
    through.
