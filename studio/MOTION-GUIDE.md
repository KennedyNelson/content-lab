# Motion and animation libraries (added 2026-11-21; all accounts)
Installed in `studio/motion/` (`cd studio/motion && npm install` in a fresh workspace; node_modules is git-ignored). Use inside Remotion, HyperFrames or the HTML players of studio/styles-pack.
| Library | Version | Licence | Use for |
|---|---|---|---|
| gsap | 3.15 | GSAP "Standard no charge" licence (free incl. commercial; cannot be used to build a competing visual animation tool) | timelines, text reveals, SplitText-style kinetic type, easing; skills in studio/skills/gsap-skills |
| lottie-web | 5.13 | MIT | play free Lottie JSON animations (icons, confetti, arrows, loaders) |
| animejs | 4.5 | MIT | quick property/SVG animations, staggers |
| motion | 14.14 | MIT | spring and layout animation in React/Remotion |
| tsparticles | 4.6 | MIT | sparks, confetti, snow, glow particles (promo drops, event wins) |
| matter-js | 0.20 | MIT | 2D physics: falling shirts, bouncing balls, piles |
| @dimforge/rapier2d-compat | 0.21 | Apache-2.0 | faster 2D physics when Matter is too slow |
Not installed: Manim (Python, needs system pangocairo that this workspace lacks; run on the owner's computer or install the system libs first), three.js and React Three Fiber (3D, slow on the CPU-only workspace; `studio/vendor/three.module.js` already exists), Blender MCP (needs Blender running).
Skills: studio/skills/gsap-skills (MIT, 8 skills: read the matching SKILL.md before writing GSAP code), studio/skills/video-shotcraft (Apache-2.0, product promo videos; see its FETCH-ON-DEMAND.md).

## Which to reach for
- Product drop / promo (Project Kaizen): GSAP kinetic type + video-shotcraft recipes for 16:9; vertical reels from our own Remotion/HyperFrames with tsParticles accents and the effects pack for any on-camera shot.
- Sports community: GSAP counters, brackets and scoreboards; Matter-js for ball/confetti moments; tsParticles for win bursts; Lottie for icons.
- Professor Jhatu: GSAP + Lottie for diagrams; Manim-style maths on the owner's machine if needed.
- Always: draft low-res first, one idea per frame, nothing in the top 240 / bottom 350 px of 9:16.
