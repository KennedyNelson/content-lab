# Project Kaizen: setup brief (2026-11-21)
Owner's clothing brand: activewear and streetwear (tanks, t-shirts, shorts, other merchandise later). Claude makes promotional videos, product images, banners, flyers and pamphlets. Owner supplies product photos and approves; owner posts manually (no posting account is connected).

## Source files
Owner's working folder: ~/Documents/ProjectKaizen on his Mac (Designs, Tshirts, Tracks, utilities; a lot is work in progress). Read via the desktop bridge (ask for folder access if not connected). Never copy whole designs of licensed characters into the repo. Product details: PRODUCTS.md.

## Known facts (from the owner, his techpacks and projectkaizen.in, checked 2026-11-21)
- Shopify store for India, prices in INR. Motto "1% Better Every Day"; positioning "not just a fashion brand, it is a lifestyle"; goal: inspire people to become the best version of themselves. Instagram @projectkaizenclo. Audience: everyone (gym-goers, runners, street-style buyers).
- Garments are made in India, unisex, sizes XS to XXL; hang tag front antler logo, back "Thank you for choosing us", QR to projectkaizen.in. Tag text shows @projectkaizen while the website shows @projectkaizenclo: ask which handle is current.
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
1. Vector logo and wordmark files exported as SVG/PDF (the folder has .ai only; I used the antler PNG) and the exact brand fonts.
2. Product photos in full resolution (front, back, detail, on-model) per product; the folder holds techpacks and flats, not photos.
3. What to promote first (a drop, an offer, a festival sale, a new product), the call to action and which Instagram handle is correct.
4. Which products are live and their current prices; whether Oversized, Polo (1%BETTER), Compression, Obsession, Dominate, Indian and Track lines are launched or still in progress.
5. Licence status of the character-based designs (Yujiro, Toji, Baki).
6. Reference brands or posts he likes; the printer's size, paper and CMYK or PDF/X needs for flyers and pamphlets.

## Workflow
1. Brief (goal, product, offer, channel, size) -> 2. copy (COPY-BANK.md tone, 3 options) -> 3. layout from template or video plan -> 4. render a PNG/MP4 draft -> 5. check the picture yourself (contact sheet or preview), text safe areas, spelling, prices -> 6. send with SendUserFile and a short note -> 7. owner feedback goes into STYLE-SHEET.md the same session. Keep recipes (copy, settings, template, `--set` values) in studio/episodes/<date>-kaizen-<slug>/ so pieces can be redone; do not commit large photos.
