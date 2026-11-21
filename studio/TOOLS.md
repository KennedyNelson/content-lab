# Tool notes (2026-11-21)
- ffmpeg: installed, used for all audio/video mixing and encodes.
- Whisper: faster-whisper installs via pip but its model download (huggingface.co) is blocked in the sandbox. Use the local sherpa-onnx Whisper turbo model (/tmp/pp, rebuild if missing); its Hindi output often cuts off the end of short clips, so treat it as a rough check only.
- yt-dlp: installed, but YouTube is blocked by the sandbox proxy. Use the vidssave.com method in Chrome, or ask the owner for the file.
- HyperFrames (HeyGen, Apache 2.0): `npm i hyperframes`, `npx hyperframes init <name> -e blank --resolution portrait --non-interactive --skip-transcribe`, render with `HYPERFRAMES_SKIP_SKILLS=1 PUPPETEER_EXECUTABLE_PATH=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell npx hyperframes render . -q draft -o out.mp4`. Do NOT use the full chromium (2 s clip took 2m43s); with the headless shell the same clip took 4.3 s.
- Remotion: rig in the kalujokesIG project (remotion/); render with --browser-executable and --concurrency=2.
- Video effects pack (55 effects, captions, pause trim): studio/effects/, decision guide studio/EFFECTS-GUIDE.md, licences studio/ASSETS.md. Added 2026-11-21; install not yet tested here.
