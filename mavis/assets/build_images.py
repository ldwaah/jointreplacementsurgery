"""Build Mavis's portrait assets from the two uploads."""
from PIL import Image, ImageFilter, ImageDraw
import numpy as np
from scipy import ndimage

SRC = '/root/.claude/uploads/be5c8b63-b0bb-5d8f-9125-601ad58944d4/'
OUT = '/home/user/jointreplacementsurgery/mavis/assets/'

# ---------------------------------------------------------------- hero cut-out
# The "cut-out" sits on opaque white, and her top contains genuine pure-white
# pixels. Keying every white pixel would punch holes in the fabric, so only the
# white region connected to the image border counts as background.
src = Image.open(SRC + 'c36ca4fc-Untitled_design.png').convert('RGB')
a = np.array(src).astype(int)

nearwhite = (a[..., 0] > 244) & (a[..., 1] > 244) & (a[..., 2] > 244)
labels, n = ndimage.label(nearwhite)
border = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
border.discard(0)
background = np.isin(labels, list(border))
print('background %.1f%% of frame; %d white blobs kept as fabric'
      % (100 * background.mean(), n - len(border)))

solid = ~background
# The original cut-out was matted against white and kept a pale rim. Erode the
# matte a few pixels so those contaminated edge pixels are dropped rather than
# showing as a halo once the portrait sits on a coloured ground.
solid = ndimage.binary_erosion(solid, structure=np.ones((3, 3)), iterations=3)
alpha = np.where(solid, 255, 0).astype(np.uint8)
alpha_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.0))

cut = src.copy()
cut.putalpha(alpha_img)

bbox = Image.fromarray((solid * 255).astype(np.uint8)).getbbox()
print('subject bbox', bbox)
subject = cut.crop(bbox)
sw, sh = subject.size

# Compose onto a 3:4 canvas: centred, sitting on the bottom edge, with headroom
# at the top so the arch curve does not clip her head.
CW, CH = 900, 1200
scale = min((CW * 0.94) / sw, (CH * 0.92) / sh)
nw, nh = int(sw * scale), int(sh * scale)
subject = subject.resize((nw, nh), Image.LANCZOS)
hero = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
hero.paste(subject, ((CW - nw) // 2, CH - nh), subject)
hero.save(OUT + 'mavis-portrait.webp', 'WEBP', quality=90, method=6)
print('hero →', hero.size, 'transparent')

# ------------------------------------------------------------- circular photo
# The second upload is the same headshot with the real foliage behind it, sharp
# inside a circle and blurred outside. Crop to the circle so the dark surround
# (which would clash with the cream section) is gone.
b = Image.open(SRC + 'da8c75b4-FullSizeRender.jpeg').convert('RGB')
cx, cy, r = 659, 506, 434
box = (cx - r, cy - r, cx + r, cy + r)
circle = b.crop(box).resize((900, 900), Image.LANCZOS)

# Round mask, supersampled so the edge is smooth.
mask = Image.new('L', (3600, 3600), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 3599, 3599), fill=255)
mask = mask.resize((900, 900), Image.LANCZOS)
circle.putalpha(mask)
circle.save(OUT + 'mavis-circle.webp', 'WEBP', quality=90, method=6)
print('circle →', circle.size, 'round matte')

# A square crop of the same photo, for the About page frame.
square = b.crop((cx - r, cy - r, cx + r, cy + int(r * 1.05)))
square = square.resize((900, int(900 * square.size[1] / square.size[0])), Image.LANCZOS)
square.save(OUT + 'mavis-about.webp', 'WEBP', quality=88, method=6)
print('about →', square.size)

# ----------------------------------------------------------------- OG image
# 1200x630 social card: brand ink ground, warm bloom, portrait on the right.
OGW, OGH = 1200, 630
og = Image.new('RGB', (OGW, OGH), (23, 18, 15))
grad = Image.new('RGB', (OGW, OGH))
gp = grad.load()
for y in range(OGH):
    for x in range(0, OGW, 4):
        t = ((x / OGW) * 0.65 + (y / OGH) * 0.35)
        c = (int(23 + t * 60), int(18 + t * 30), int(15 + t * 18))
        for dx in range(4):
            if x + dx < OGW:
                gp[x + dx, y] = c
og = grad.filter(ImageFilter.GaussianBlur(12))

ph = int(OGH * 1.02)
pw = int(hero.size[0] * ph / hero.size[1])
port = hero.resize((pw, ph), Image.LANCZOS)
og.paste(port, (OGW - pw - 40, OGH - ph + 10), port)
og.save(OUT + 'og-image.jpg', 'JPEG', quality=88, optimize=True)
print('og →', og.size)
