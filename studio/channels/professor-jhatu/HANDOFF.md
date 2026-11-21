# Handoff brief: Professor Jhatu (new educational Instagram account)
Written 2026-11-21 from the Kalu project, for the new project's first session. Read this first, then STYLE-SHEET.md and RULES.md in this folder.

## Account
- Name: Professor Jhatu. Instagram handle: professor.jhaatuke. Instagram user ID: 28743020845381144 (already connected through Composio, account alias instagram_geira-imam).
- Composio also holds the Kalu account (kis_kadar_kaali, ID 28634952752843590). The Professor Jhatu account is currently Composio's DEFAULT, so EVERY post call must pass this exact ig_user_id, and after publishing verify the returned username is professor.jhaatuke. Never post this account's reels with the Kalu ID or the reverse.
- Daily scheduled task: created 2026-11-21 (trial of a few days); its prompt is the one-page recipe, rules are in this folder.

## Concept (owner brief)
Educational reels, mixed topics every day: crazy facts, space, science, what-if, history, Google-style coding interview questions, interview puzzles, intriguing scenarios, relatable Claude-and-engineer chats; follow current affairs and trends. Teach like to a 5-year-old. Quick, frames changing, easy on first listen. Clean, friendly, advertiser-safe tone. Characters optional (faceless fine). ONE language per reel (Hindi, English or other, never mixed); same topic can be re-made in another language as a separate reel. English-only replies to the owner.

## Rules that apply (all in the repo, studio/channels/)
- HOOKS.md: a very strong starting hook is MANDATORY on this account.
- VOICES.md: expressive, realistic ElevenLabs acting (soft, murmur, shy, embarrassed, etc.), eleven_v4 via Zapier, each line separate. Stay on ElevenLabs (owner decided; Starter plan Rs 528/month, 30,000 credits shared by all accounts, check balance before every run).
- professor-jhatu/STYLE-SHEET.md and RULES.md: this account's look, tone, script format.
- Motion graphics (owner wants this to be a strength): clean canvas, one idea on screen at a time, draw-on diagrams, animated analogies, code blocks that type themselves, counters/timelines, light camera moves. Reusable components should be built once in studio/motion/ (not yet created) and committed so all accounts share them.

## Repo and GitHub
- GitHub account: KennedyNelson. Repo: KennedyNelson/content-lab (renamed from funwithken-videos; the skills still mention the old name, use the new one).
- Add it to the session with add_repo (owner KennedyNelson, repo content-lab, push access), clone to /home/claude/content-lab (shallow clone is fine, allow ~10 min), then call register_repo_root. Push with: git push origin HEAD:main. Commit messages end with the attribution lines the session gives.
- Rule: anything new that other projects should have (tools, sounds, components, rules) is saved to the repo and committed; project memory is NOT shared between projects.
- Shared in repo: engines, style library (studio/LEMO-INDEX.md, styles-pack, variants), sfx_library, TOOLS.md, refs, PUBLISHED.md (log of posted videos), channel rule files. Separate per account: its channels/<account> folder, project memory, Instagram connection/ID, daily task.

## Skills
- No dedicated skill exists for this account yet; this folder is its rulebook. Account-level skills still apply: shorts-animation-styles (all visual styles + build toolkit), remotion best-practices skills, video-making, reels-caption-and-audit (caption + exactly 5 hashtags + audit), reels-niche-research (adapt to education niche). instagram-reels-studio and fun-with-ken-studio are for the other two accounts; where a skill contradicts the files in this folder, these files win. After a few reels the stable rules can be turned into a proper skill.

## Tools (a fresh workspace starts empty; reinstall each session, see studio/TOOLS.md)
- ffmpeg: installed. Playwright + Chromium preinstalled (do not run playwright install).
- Remotion: npx create-video in a new folder; render with --browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome --concurrency=2. (The Kalu character rig is in the Kalu project, not needed here.)
- HyperFrames (HeyGen, Apache 2.0): npm i hyperframes; npx hyperframes init <name> -e blank --resolution portrait --non-interactive --skip-transcribe; render with HYPERFRAMES_SKIP_SKILLS=1 PUPPETEER_EXECUTABLE_PATH=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell npx hyperframes render . -q draft -o out.mp4 (seconds instead of minutes).
- Code Animation Pack (Chalkboard, Flat Vector, Line-and-Dot, Glow Sketch, Clay 3D, CGI, Pixel, Toy Brick etc.): studio/styles-pack/ in the repo.
- Whisper: faster-whisper model downloads (huggingface.co) are blocked; use sherpa-onnx whisper turbo (rebuild if missing); Hindi output may truncate, use as a rough check only.
- yt-dlp: installed but YouTube is blocked by the proxy; use vidssave.com in Chrome or ask the owner for the file.
- Claude cannot hear audio or watch full video: QA uses contact sheets, loudness envelopes and silencedetect.
- Posting: Composio INSTAGRAM_POST_IG_USER_MEDIA (REELS, video_url = raw GitHub URL of the MP4 hosted on main, share_to_feed true) then INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH (max_wait_seconds 180). Voices: ElevenLabs via Zapier (selected_api App226160CLIAPI, action text_to_speech).

## Still needed from the owner
Reference reels (this account and YouTube), voices per language, daily posting time, then the owner says to create the daily scheduled task. Study references once, write the lessons into STYLE-SHEET.md, keep contact sheets, ask before keeping full videos.
