import sherpa_onnx, sys, subprocess, numpy as np, glob
d='/tmp/pp/sherpa-onnx-whisper-base.en/'
r=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=glob.glob(d+'*encoder.int8.onnx')[0] if glob.glob(d+'*encoder.int8.onnx') else glob.glob(d+'*encoder*.onnx')[0],decoder=glob.glob(d+'*decoder.int8.onnx')[0] if glob.glob(d+'*decoder.int8.onnx') else glob.glob(d+'*decoder*.onnx')[0],tokens=glob.glob(d+'*tokens.txt')[0],language='en',task='transcribe')
for f in sys.argv[1:]:
    a=subprocess.run(['ffmpeg','-nostdin','-v','error','-i',f,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout
    x=np.frombuffer(a,dtype=np.float32); s=r.create_stream(); s.accept_waveform(16000,x); r.decode_stream(s); print(f, '|', s.result.text)
