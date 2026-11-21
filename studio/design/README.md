# Design kit: images, banners, flyers, pamphlets (shared by Project Kaizen, the sports community and any account)
One tool, five templates, brand tokens per brand. Everything is HTML rendered by Playwright, so text stays sharp and edits are quick.

## Use
`node studio/design/render.mjs studio/design/templates/<template>.html <out.png|out.pdf> --brand studio/channels/<brand>/brand.css --set headline="..." --set image=/abs/path/photo.jpg`
- Placeholders are `{{key|default}}`; `--set key=value` fills them. `--scale 2` for a 2x PNG. A `.pdf` output (or `--pdf`) makes a print PDF.
- Brand look lives ONLY in `studio/channels/<brand>/brand.css` (colours, fonts). Change it once and every template follows.
- Fonts come from `studio/effects/fonts` (Anton, Archivo Black, Montserrat, Poppins, Inter, etc., all open licences).

## Templates and sizes
| Template | Size | Use |
|---|---|---|
| social-post.html | 1080x1350 px (4:5) | Instagram feed post, product or announcement |
| story.html | 1080x1920 px | Story, reel cover; text only inside the safe area (top 250, bottom 350 px free) |
| banner.html | 1920x600 px | Website or Shopify hero, event page header, YouTube-style banner (crop as needed) |
| flyer-a5.html | 154x216 mm incl. 3 mm bleed (trim 148x210) | Printed flyer |
| pamphlet-trifold.html | 303x216 mm incl. bleed, 2 pages (outside, inside) | Tri-fold A4 pamphlet |
Other sizes (A4/A3 poster, 1080x1080 post, 1280x720 thumbnail, 1200x628 link image): copy a template, change `<meta name="size">` (px) or `<meta name="page">` (mm) and the CSS width/height.

## Print rules
- 300 dpi photos at final size (a 148x210 mm flyer photo needs about 1750x2480 px). Ask the owner for the original photo files, not screenshots.
- Keep text 8 mm inside the trim line and 8 mm from folds; the 3 mm bleed carries background only.
- Browser PDFs are RGB. Ask the printer whether they want CMYK or PDF/X; the printer usually converts.
- Always render a PNG preview of the PDF (`pdftoppm -r 60 -png file.pdf prev`) and look at it before sending.

## Honesty rules for images
- Real product photos only for the garments or event photos only; no AI-made pictures of the actual product, and no invented testimonials, prices, discounts or dates. AI-generated textures or backgrounds are fine if the product shown is real.
- Copyrighted characters, logos and artwork we do not own are never redrawn or recoloured. Show the owner's real photos of such items as they are.
- Written content (prices, dates, venues, fees) comes from the owner or the official page; ask if unknown.
