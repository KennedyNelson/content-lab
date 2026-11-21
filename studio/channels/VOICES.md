# Voice rule (owner, 2026-11-21): applies to ALL THREE channels
The voice is the most important part of every video. It must sound like a real person, with the emotion inside the voice itself, never a flat read.

## Engine and settings
- ElevenLabs eleven_v4 via Zapier (text_to_speech), one file per line, mp3_44100_128.
- Settings if the action exposes them: stability LOW (about 0.3 to 0.45, "creative") so emotion and variation come through; similarity about 0.75; style 0.3 to 0.6 for acted lines; speed 1.0 (adjust pace with atempo afterwards, not with flat tags). If the action does not expose a setting, carry the emotion through tags and punctuation instead.
- Normal pitch by default (owner rule). Deep or girlish only if the script needs it.

## Acting inside the voice (use to the max)
- Give every line its own performance tag in square brackets at the start, and extra tags mid-line where the feeling shifts. Examples: [whispers], [softly], [murmurs], [hesitant], [shy], [embarrassed], [nervous], [sighs], [voice breaking], [excited], [slightly angry], [deadpan], [sarcastic], [laughs], [gasps].
- Vary volume and energy inside one reel: a romantic line is soft and close; a shy engineer asking Claude a silly question murmurs in a feeble, quiet voice so nobody else hears; an angry line is sharp but still natural; a punchline is one continuous confident take.
- Use natural human sound: small breaths, a pause before a shy word, a trailing-off end, a crack on an emotional word, stumbles for nervousness. Keep them short; no dead air in the final mix.
- Write the text the way people speak (fillers, half sentences, repeated starts) and use ellipses and dashes for hesitation. Hindi in Devanagari for correct pronunciation.
- Quiet lines must stay audible: whisper and murmur are about intimacy, not volume loss. Normalise loudness in the mix (quiet lines about 6 dB below normal speech, never inaudible).

## Choosing voices
- Pick a different, fitting voice per character per reel from the ElevenLabs library (check Hindi/English/regional natives); not fixed unless the owner fixes it.
- For a new voice, generate a short test of the hardest line (the softest and the loudest), listen to its loudness envelope and length, and retake once if it sounds flat, robotic or hitched. Send audio-only samples to the owner when he is picky.
- Educational account: warm, clear, friendly teacher voice, still expressive (curiosity, surprise, wonder). Kalu account: casual young-friend voices with real emotion. YouTube: friendly and expressive, advertiser-safe.

## Process
- Generate each line separately, trim head and tail silence, squeeze long inner pauses, assemble with 0.04 to 0.12 s gaps.
- Check ElevenLabs credits before a run; if credits or the Zapier task limit fail, do not post a flat fallback voice.
