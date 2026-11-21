# video-shotcraft: what is NOT committed here (kept lean)
Committed: SKILL.md, references/, agents/, shot-polish/, publish/, LICENSE, README (upstream commit 075b548, 2026-11-21, Apache-2.0).
Not committed (fetch when a promo video needs it): template/ (Remotion project), workbench/, gallery/, demos/, assets/audio (24 MB, each audio file has its own licence; check ATTRIBUTION before use) and assets/readme.
Fetch: `git clone --depth 1 https://github.com/Vincentwei1021/video-shotcraft /tmp/video-shotcraft` then use its template/ with `npm install`.
Notes: output is 1920x1080 30 fps promo MP4 (use reframe/crop or its portrait option for 9:16); headless Linux needs `--concurrency=1` or 2, the chrome-headless-shell path from studio/TOOLS.md; Remotion has its own licence (free for individuals and small teams, companies may need a paid licence: owner to check for the Project Kaizen business).
