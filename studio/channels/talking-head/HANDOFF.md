# kaizenKen project (talking-head editing, owner on camera): handoff brief
Written 2026-11-21 from the Kalu project, for the new project's first session. The owner films himself talking and is the face of the video. Claude does ALL the editing: cuts, captions, motion graphics, animation inserts, sound effects, music, colour, export.

## Job
- Input: raw clips the owner uploads (phone footage, vertical 9:16 mostly; may also be 16:9 for YouTube). Output: finished edited video(s) as MP4, delivered with SendUserFile and, if the owner asks, posted.
- Target look: cinematic and punchy. Tight cuts, kinetic word captions, animated motion graphics that explain what he says, zooms/punch-ins, animation or b-roll cutaways, well-placed sound effects and music, graded colour.
- Platform, channel name, language(s) and posting plan: NOT decided. Ask the owner first (Instagram Reels, YouTube Shorts/long, other; handle; one language per video). Create channels/talking-head STYLE-SHEET.md and RULES.md from the answers, as the other accounts have.

## Editing workflow (default)
1. Intake: ffprobe each clip (length, fps, resolution, audio). Convert phone footage (HEVC/VFR) to constant frame rate H.264 working copies; originals untouched.
2. Transcribe with word timestamps (Whisper; see Tools). Hindi transcripts can truncate: use as a rough guide, check against the owner's script if he gives one.
3. Rough cut by transcript: remove silences, fillers, repeated takes and mistakes; keep the best take; tighten pauses (ffmpeg silencedetect/trim, or Remotion sequences).
4. Plan beats: for each idea he says, decide a visual (motion-graphic diagram, number counter, animated analogy, code block, animation clip, b-roll, punch-in, plain face). Frames change every 1 to 3 s.
5. Build overlays in Remotion or HyperFrames over the face footage (transparent or composited); styles from studio/styles-pack and the shorts-animation-styles skill; clean canvas, one idea at a time.
6. Captions: word-synced, styled, inside the safe area (nothing in the top 240 px or bottom 350 px of 9:16).
7. Sound: SFX only from studio/sfx_library (index.csv), placed on cuts, reveals and punchlines; music bed ducked under speech; loudness normalised (about -14 LUFS for social). Voice-over, if any, via ElevenLabs per VOICES.md.
8. Colour/finish: ffmpeg grade (contrast, saturation, subtle vignette/grain), sharpen if soft, stabilise only if needed; final CRF 18-20, aac 192k, yuv420p, faststart.
9. QA: contact sheet of the final video, check cut points, caption sync against the transcript, loudness (ffmpeg loudnorm/ebur128), silence at head/tail, length, no glitches. Send the owner the file; do not post without his OK unless he sets up automation.

## What Claude can and cannot do (be honest with the owner)
- Cannot watch full video or hear audio: judges by frames/contact sheets, transcript and measured loudness. The owner's taste is the final check, so deliver a draft early and take notes.
- Cannot change the owner's face or generate his likeness; the face is always his real footage. Animation/avatar characters only as separate cutaways.
- Cannot use YouTube downloads (proxy blocks YouTube); get audio via vidssave.com in Chrome or ask for the file. Cannot log into Instagram to read competitors; public web only.
- Large raw files: the upload size through chat may be limited. Ask for compressed/trimmed clips, or work from a cloud-share link the workspace can reach (check network allowlist first).
- Renders are CPU-only (2 cores, no GPU): keep working copies small (1080x1920, 30 fps), draft-render first, then final.

## Tools (fresh workspace each session; see studio/TOOLS.md)
- ffmpeg/ffprobe (installed): cuts, concat, speed ramps, crop/zoom, colour grade, loudnorm, mux, subtitles burn-in.
- Remotion: npx create-video; render with --browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome --concurrency=2. Use OffthreadVideo/Video to put the owner's footage as the base layer with overlays on top.
- HyperFrames (HeyGen, Apache 2.0): npm i hyperframes; npx hyperframes init <name> -e blank --resolution portrait --non-interactive --skip-transcribe; render with HYPERFRAMES_SKIP_SKILLS=1 PUPPETEER_EXECUTABLE_PATH=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell npx hyperframes render . -q draft -o out.mp4.
- Code Animation Pack and animation styles: studio/styles-pack/, studio/LEMO-INDEX.md, shorts-animation-styles skill.
- Whisper: faster-whisper model downloads (huggingface.co) are blocked; use sherpa-onnx whisper turbo (rebuild if missing); Playwright + Chromium preinstalled (do not run playwright install).
- ElevenLabs via Zapier (selected_api App226160CLIAPI, action text_to_speech, eleven_v4) for any voice-over; follow studio/channels/VOICES.md.
- Posting (only if asked): Composio Instagram INSTAGRAM_POST_IG_USER_MEDIA then ..._PUBLISH, always passing the exact ig_user_id; YouTube via the connected YouTube tool/Zapier. Accounts: Kalu kis_kadar_kaali (28634952752843590), Professor Jhatu professor.jhaatuke (28743020845381144). Never cross-post to the wrong account.

## Repo and GitHub
- GitHub account KennedyNelson, repo KennedyNelson/content-lab. add_repo with push access, clone to /home/claude/content-lab (allow ~10 min), register_repo_root. Push with: git push origin HEAD:main. Commits end with the attribution lines the session gives.
- Shared in repo: engines, styles, SFX library, motion components (studio/motion, to be built), TOOLS.md, channel rule files (HOOKS.md, VOICES.md). Anything new that other projects should have goes into the repo. Project memory is NOT shared between projects.
- Do not commit the owner's raw footage to the repo (large, private): keep raws in the workspace, commit only scripts, templates, edit recipes and contact sheets.

## Skills
- None dedicated yet; this folder is the rulebook. Account-level skills that apply: shorts-animation-styles (styles + build toolkit), remotion skills, video-making, reels-caption-and-audit. Turn stable editing rules into a skill after a few videos.

## Rules inherited
English-only replies to the owner. Hooks: a strong starting hook is the default (HOOKS.md); voices per VOICES.md; no unnecessary on-screen text; pick styles per video from the whole library; repeating a style is fine.

## Needed from the owner
Channel/platform and language, 2 or 3 reference videos whose editing he loves (study once, write lessons into the style sheet, keep contact sheets), his first raw clip and script/topic, preferred caption look, music taste, whether he wants cinematic colour, and whether Claude should post or only deliver the file.
