"""Social card for Mpathy Therapy: 1200x630."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

F = '/mnt/skills/examples/canvas-design/canvas-fonts/'
OUT = '/home/user/jointreplacementsurgery/mavis/assets/'
W, H = 1200, 630

INK, CANVAS, CLAY, GOLD = (23, 18, 15), (246, 240, 232), (196, 110, 72), (200, 164, 92)

serif = ImageFont.truetype(F + 'InstrumentSerif-Regular.ttf', 76)
serif_i = ImageFont.truetype(F + 'InstrumentSerif-Italic.ttf', 76)
sans = ImageFont.truetype(F + 'InstrumentSans-Regular.ttf', 19)
sans_s = ImageFont.truetype(F + 'InstrumentSans-Regular.ttf', 21)

# Warm ground with a bloom behind the portrait, matching the site's hero.
og = Image.new('RGB', (W, H), INK)
d = ImageDraw.Draw(og)
for y in range(H):
    t = y / H
    d.line([(0, y), (W, y)], fill=(int(23 + t * 14), int(18 + t * 10), int(15 + t * 8)))
bloom = Image.new('RGB', (W, H), (0, 0, 0))
ImageDraw.Draw(bloom).ellipse((W - 620, -170, W + 130, 480), fill=(120, 62, 36))
og = Image.blend(og, bloom.filter(ImageFilter.GaussianBlur(115)), 0.55)
d = ImageDraw.Draw(og)


def tracked(draw, xy, text, font, fill, tracking=3):
    """PIL has no letter-spacing; draw glyph by glyph."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


PAD = 68
# Eyebrow with the site's rule-before-label treatment.
d.line([(PAD, 96), (PAD + 46, 96)], fill=GOLD, width=2)
tracked(d, (PAD + 62, 86), 'BABCP ACCREDITED CBT PSYCHOTHERAPIST', sans, GOLD, 2.6)

# Headline, with the emphasis in italic clay exactly as on the page.
y = 150
for line, font, colour in [('You have been', serif, CANVAS),
                           ('the strong one', serif, CANVAS),
                           ('long enough.', serif_i, CLAY)]:
    d.text((PAD, y), line, font=font, fill=colour)
    y += 88

# Footer lockup.
d.line([(PAD, 528), (PAD + 300, 528)], fill=(90, 78, 70), width=1)
d.text((PAD, 548), 'Mpathy Therapy', font=ImageFont.truetype(F + 'InstrumentSerif-Regular.ttf', 30), fill=CANVAS)
tracked(d, (PAD + 208, 556), 'MPATHYTHERAPY.COM', sans_s, (150, 136, 126), 2)

# Portrait, bled off the bottom-right.
port = Image.open(OUT + 'mavis-portrait.webp').convert('RGBA')
ph = int(H * 1.06)
pw = int(port.size[0] * ph / port.size[1])
port = port.resize((pw, ph), Image.LANCZOS)
og.paste(port, (W - pw + 30, H - ph + 8), port)

og.save(OUT + 'og-image.jpg', 'JPEG', quality=90, optimize=True)
print('og-image.jpg', og.size)
