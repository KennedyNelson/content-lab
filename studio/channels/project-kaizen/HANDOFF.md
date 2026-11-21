# Project Kaizen: setup brief (2026-11-21)
Owner's clothing brand: activewear and streetwear (tanks, t-shirts, shorts, other merchandise later). Claude makes promotional videos, product images, banners, flyers and pamphlets. Owner supplies product photos and approves; owner posts manually (no posting account is connected).

## Known facts (from the owner and projectkaizen.in, checked 2026-11-21)
- Shopify store for India, prices in INR. Motto "1% Better Every Day"; positioning "not just a fashion brand, it is a lifestyle"; goal: inspire people to become the best version of themselves. Instagram @projectkaizenclo. Audience: everyone (gym-goers, runners, street-style buyers).
- Products on the site that day: DISCIPLINE Tank, ARISE Tank, THE OGRE - YUJIRO HANMA T-Shirt. Prices and discounts change: read them from the site or the owner at the time, never from this file.
- Tone: motivational, direct, short imperative sentences, capitalised emphasis ("EMBRACE THE PAIN"), occasional emoji.

## What Claude can make, and with what
| Output | How |
|---|---|
| Feed posts, stories, banners, flyers, pamphlets | studio/design/ templates + brand.css here (README in studio/design) |
| Product promo video, 16:9 or 9:16 | Remotion/HyperFrames + studio/MOTION-GUIDE.md libraries; studio/skills/video-shotcraft for screenshot-based promos; owner's product clips as base layer |
| Owner on camera (founder talking, fit check, drop announcement) | studio/EFFECTS-GUIDE.md pack, same workflow as kaizenken/HANDOFF.md |
| Product reveal / drop teaser / lookbook reel | owner's real photos and clips, GSAP kinetic type, tsParticles accents, zoom punches, SFX from studio/sfx_library, music licensed only |
| Mockups of product on a model | only from real photos; never invent a garment image |

## Needed from the owner (open items)
1. Logo files (SVG or PNG with transparent background) and the real brand colours and fonts (brand.css colours are PROVISIONAL guesses: black, bone white, red-orange).
2. Product photos in full resolution (front, back, detail, on-model), and the product list with sizes, colours, fabric and current prices.
3. What to promote first (a drop, an offer, a festival sale, a new product) and the call to action (website, Instagram, code).
4. Language(s) for captions and copy (English, Hindi, Hinglish) and city or region focus.
5. Reference brands or posts whose look he likes (study once, write lessons into STYLE-SHEET.md).
6. Whether printed pieces will be made at a local printer (ask for their size, paper and CMYK or PDF/X requirements).

## Workflow
1. Brief (goal, product, offer, channel, size) -> 2. copy (COPY-BANK.md tone, 3 options) -> 3. layout from template or video plan -> 4. render a PNG/MP4 draft -> 5. check the picture yourself (contact sheet or preview), text safe areas, spelling, prices -> 6. send with SendUserFile and a short note -> 7. owner feedback goes into STYLE-SHEET.md the same session. Keep recipes (copy, settings, template, `--set` values) in studio/episodes/<date>-kaizen-<slug>/ so pieces can be redone; do not commit large photos.
