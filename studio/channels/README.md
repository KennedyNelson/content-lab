# Content Lab (repo KennedyNelson/content-lab, formerly funwithken-videos)
The single source of truth for all four accounts. Skills are thin pointers to the folders below; the old repo name/path (funwithken-videos) may still appear in old text: use KennedyNelson/content-lab and /home/claude/content-lab. Anything new that other projects should have (tools, sounds, components, rules) is saved here and committed. Project memory is not shared between projects; this repo is.

## Accounts (folder = account name)
| Folder | Account | Purpose | Posting | Status 2026-11-21 |
|---|---|---|---|---|
| `kalujokes/` | Instagram kaalujokes (Composio kis_kadar_kaali, ID 28634952752843590; username mai_kaala_hu) | spicy, dark, very relatable animated comedy reels | daily task, 8 pm IST | PAUSED by owner |
| `professor-jhatu/` | Instagram Professor Jhatu (professor.jhaatuke, ID 28743020845381144) | faceless educational reels: puzzles, coding questions, crazy facts, what-if | daily task | LIVE (trial of a few days) |
| `funwithken/` | YouTube Shorts FunWithKen | informational, modern, trendy, relatable | daily task, 9 am IST | LIVE again (trial of a few days) |
| `kaizenken/` | owner's own channel (on camera) | talking-head videos Claude edits | owner posts manually | project kaizenKen, no task |

Each account folder has: STYLE-SHEET.md (how it looks/sounds, from approved work), RULES.md (current rules only), references/ (clips and contact sheets), plus HANDOFF.md / PROCESS.md / LEGACY-SKILL.md where they exist.

## Shared files
- `HOOKS.md` hook rule (mandatory on YouTube and Professor Jhatu, optional on kalujokes).
- `VOICES.md` expressive realistic ElevenLabs acting for all accounts.
- `../TOOLS.md` tools and install notes; `../TOOLKIT-FULL.md` the full animation toolkit text (style picker, build, voices, BGM) archived from the old skill; `../PUBLISHED.md` log of every post, name the account on each line; `../LEMO-INDEX.md`, `../STYLE-LIBRARY.md`, `../styles-pack/`, `../sfx_library/`, `../refs/`, `../src/`, `../episodes/`.

## How Claude works (flow)
Scheduled task prompt (one page) -> clone this repo -> read the account folder + HOOKS.md + VOICES.md -> research -> script -> audio first -> picture -> QA -> post with that account's ID -> log in PUBLISHED.md -> report. Skills are short pointers; where an old skill text or LEGACY-SKILL.md disagrees with a file here, the files here win.
Rule: when the owner approves or rejects something, update that account's STYLE-SHEET.md in the same session. A newer owner note beats an older line; delete the older line.
Safety: every Instagram post names the exact ig_user_id of its account (Professor Jhatu is Composio's default account, so never rely on the default) and checks the returned username afterwards.
