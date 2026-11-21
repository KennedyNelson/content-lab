# Video effects guide (all accounts and projects)
The effects pack lives in `studio/effects/` (MIT, see ../ASSETS.md). Read `studio/effects/SKILL.md` for the full command, option and plan-file reference. Read THIS file first to decide which effect to use.

## When to use (talking-head videos, kaizenKen first)
Rule: every talking-head edit checks this guide, then picks the best effects for each spoken moment. One effect every 3 to 6 s, 1.5 to 4 s each, landing on the spoken word. Never stack two big things. Never cover the face. Pick for the moment, not all 55 per video.

| Moment | Best effects |
|---|---|
| Hook, first 2 s | `pop-word` on the big claim or brand; `logo-link` when two brands are named; `dot-reveal`; `lean-in` on the first strong word |
| Emphasis word | `lean-in`, `pop-word`, `backdrop-word`, `huge-strike` (negation), `crayon-write`, `reject-stamp` on "no/not/never" |
| Numbers, growth | `liquid-glass-graph`, `select-resize`, `over-the-shoulder-zoom`, `countdown-flip` |
| Lists, steps | `checklist`, `todo`, `apple-toggles`, `lineup`, `the-bill` |
| Comparison, before/after | `swipe`, `tier-list`, `moody` grade |
| Explanation breather (4 to 6 s) | `halftone-paper`, `split-headline`, `headline-box`, `slow-push` |
| Showing a screenshot or product | `card-drop`, `broll-split`, `reel-frame` |
| Dramatic or serious line | `spotlight`, `led-sign`, `slow-push`, `timeline`, `moody` |
| Story, social proof | `messages`, `headline-wall`, `profile-wall`, `place-in-grid` (need the owner's real screenshots and numbers) |
| Call to action | `comment-box` (keyword), `tap` (follow) |
| Always | `captions` (our default: bold kinetic, see the account STYLE-SHEET) |

## Rules
- Real numbers, names and screenshots only. Ask the owner if unknown.
- Effects need a visible face and work best on vertical footage with the speaker in frame. Check still frames before rendering (`fx.py --still`).
- Brand logos: only 109 bundled; for others use the official logo file from the owner.
- The pack's sound effects are code-made quiet pops and ticks; our own SFX still come from studio/sfx_library. Keep one SFX layer, do not double up.
- Captions: the pack's `bold` style is the closest to our kinetic default. Keep our safe area (nothing in the top 240 px or bottom 350 px of 9:16); check the result and move with `y` if needed.
- Renders are CPU-only here: check stills first, draft render second, final last.

## Setup notes (this workspace)
- Run `bash studio/effects/scripts/setup.sh` once per session workspace (creates a .venv inside studio/effects, which is git-ignored). Needs ffmpeg and Python 3.10+; installs numpy, opencv-python, pillow, mediapipe.
- `scripts/words.py` installs faster-whisper and downloads its model from huggingface.co, which this workspace blocks. Instead, write `<video>.words.json` yourself from the sherpa-onnx whisper transcript (see ../TOOLS.md), one entry per word, in the format words.py writes, then run fx.py. Fix misheard words by hand.
- The pack can also run on the owner's own computer: `git clone https://github.com/adamgodigital/claude-reel-effects ~/.claude/skills/effects`.
- STATUS 2026-11-21: pack added and licence checked; the install and a test render have NOT been run yet. The first video that uses it must run setup and a draft test first, then correct this line.

## Promo work (Project Kaizen, sports community)
Use the same pack when the owner or a member is on camera (founder talking, fit check, recruitment pitch): `pop-word` for the big claim or product name, `logo-link` for brand + partner, `card-drop` to show a product or poster screenshot, `lean-in` on the call to action, `comment-box` for "comment JOIN", `tap` for follow. Image/banner/flyer work uses ../design/ instead; motion libraries are in ../MOTION-GUIDE.md. Brand folders: channels/project-kaizen/ and channels/sports-community/.
