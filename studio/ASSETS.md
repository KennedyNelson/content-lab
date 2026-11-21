# Assets and licences
Record every downloaded asset here: source, licence, where it lives. Only npm/pip/GitHub or owner uploads; check the licence first.

| Asset | Source | Licence | Location |
|---|---|---|---|
| Adam Digital Video Effects pack (55 effects, captions, pause trim, code-made SFX) | https://github.com/adamgodigital/claude-reel-effects, commit 9526d93, 2026-11-21 (from the guide at adamgodigital.com/guides/claude-video-effects) | MIT (Vibha Ramprakash; Adam Digital Pte Ltd). Keep LICENSE with it. | studio/effects/ |
| Fonts inside the pack (Archivo Black, Instrument Serif, Space Mono, Inter, Anton, Montserrat, Playfair Display, Poppins; Permanent Marker) | same repo, fonts/ | SIL OFL; Permanent Marker Apache 2.0 (licence files in studio/effects/fonts/) | studio/effects/fonts/ |
| YuNet face detector | opencv_zoo, via the pack | MIT | studio/effects/models/yunet.onnx |
| MediaPipe Selfie Segmenter | Google, via the pack | Apache 2.0 | studio/effects/models/selfie_segmenter.tflite |
| 109 brand logos (Simple Icons) | via the pack, assets/logos.json | Simple Icons data CC0; the logos are trademarks of their owners: use only to refer to that brand, never to imply endorsement | studio/effects/assets/logos.json |
| gsap-skills (8 agent skills for GSAP) | https://github.com/greensock/gsap-skills, commit aed9cfd, 2026-11-21 | MIT | studio/skills/gsap-skills/ |
| video-shotcraft skill (text only; template, workbench and audio fetched on demand) | https://github.com/Vincentwei1021/video-shotcraft, commit 075b548, 2026-11-21 | Apache-2.0 (bundled audio has its own licences; Remotion has its own licence) | studio/skills/video-shotcraft/ |
| npm: gsap, lottie-web, animejs, motion, tsparticles, matter-js, @dimforge/rapier2d-compat | npm registry, installed 2026-11-21 | see studio/MOTION-GUIDE.md (MIT / Apache-2.0 / GSAP Standard no charge) | studio/motion/ (node_modules not committed) |
| Design kit (render.mjs and 5 templates) | written by Claude for this repo | ours | studio/design/ |
