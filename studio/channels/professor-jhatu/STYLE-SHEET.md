# Professor Jhatu (handle professor.jhaatuke, ID 28743020845381144): educational Instagram style sheet (owner brief, 2026-11-21). See HANDOFF.md first.
Reference reels for this account: owner will send them. Add what they teach to this file.

## Concept
- Teach one interesting thing per reel as if teaching a 5-year-old: very clear, simple words, one main idea, one picture per beat.
- Topic mix every day (never one topic for a week): crazy facts, space and astronomy, science, "what if" scenarios, crazy history, interview coding questions (Google style), brain puzzles asked in interviews, intriguing scenarios, relatable tech jokes such as frustrating Claude-and-engineer chats. Follow current affairs and trending topics.
- Characters are optional. Faceless, characterless videos are fine and often best for facts. Use Kalu or other characters only when a story needs a person.

## Language
- Hindi, English, or any other language, but ONE language per reel, never mixed in a reel. Every topic can be made in more than one language as separate reels.

## Tone and pace
- Clean, educational, friendly and warm. Advertiser-safe: no swearing, no crude or dark humour, no hate, no sexual content.
- Quick, never slow or boring. Frames keep changing (a new picture or angle every 1 to 3 s), but every beat must be easy to understand on first listen. Do not stack facts.
- Captions on screen for every spoken word group; no other unnecessary text.

## Hook
- See ../HOOKS.md. The hook is the most important part of every reel.

## Look
- Style chosen per video by Claude from the whole library (Lemo explainer styles such as Whiteboard, Sketchnote, Isometric Infographic, Bauhaus Shapes, Scale Zoom, Data Storytelling, Assembly-Line Diagram, Spreadsheet Film, Mascot Screencast; plus Stickman, Comic, Pixel, Remotion, HyperFrames). Repeating a style is allowed.

## Script format
- Hook, then the explanation in short steps, then a clear payoff or "now you know" line. Fact-check and note the source in the script file for every fact. Length decided by the topic, usually 20 to 45 s.

## Open items
- Daily post time, voice choices per language, reference reels.

## Learned 2026-11-21 (first run)
- Composio needs the account alias too: pass account "instagram_geira-imam" plus ig_user_id 28743020845381144 (two accounts connected, no default is assumed).
- Pipeline that worked end to end in ~1 h: voice lines (Alice, eleven_v4) -> trim/silence-detect -> venus.html canvas (styles-pack player) -> render.mjs with audio (2 min) -> ffmpeg CRF 20. Keep captions out of the lower 20% and off diagram labels (counters at y<=1330). Word timings without Whisper: syllable-proportional inside pause-detected segments (build_audio.py in the episode folder).
