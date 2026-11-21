import json, re, subprocess, numpy as np, wave
lines = {
1:(3.8759,[(0,0.98,"On Venus,"),(1.10,3.8759,"one day is longer than one whole year!")],0),
2:(8.3879,[(0,0.52,"How?"),(1.12,4.34,"A year is how long a planet takes to circle the Sun."),(4.85,8.3879,"Venus does it in just 225 Earth days.")],0),
3:(8.4686,[(0,3.35,"A day is how long a planet takes to spin once."),(3.62,8.4686,"Venus is so lazy, it needs 243 Earth days!")],0),
4:(5.4521,[(0,2.81,"So Venus goes all the way around the Sun..."),(3.16,5.4521,"before it spins around even once!")],0),
5:(4.1593,[(0,1.70,"And it spins backwards..."),(2.14,4.1593,"so the Sun rises in the west!")],4),
6:(5.4708,[(0,1.43,"So that's Venus:"),(1.72,2.45,"a slow,"),(2.58,3.54,"backwards spinner,"),(3.81,5.4708,"where the day beats the year!")],0),
}
def syl(w):
    w2=re.sub(r'[^a-z0-9]','',w.lower())
    if w2.isdigit(): return 3
    return max(1,len(re.findall(r'[aeiouy]+',w2)))
GAP=0.12; t=0.15; sr=44100; words=[]; offs={}
chunks=[]
for n,(dur,segs,gain) in lines.items():
    offs[n]=t
    for (a,b,txt) in segs:
        ws=txt.split(); tot=sum(syl(w)+0.3 for w in ws); c=a
        for w in ws:
            d=(b-a)*(syl(w)+0.3)/tot
            words.append({"w":w,"s":round(t+c,3),"e":round(t+c+d,3),"line":n}); c+=d
    w=wave.open(f'audio/t{n}.wav'); x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768
    x*=10**(gain/20); chunks.append((t,x)); t+=dur+GAP
total=t+0.5
mix=np.zeros(int(total*sr)+1,dtype=np.float32)
for st,x in chunks:
    i=int(st*sr); mix[i:i+len(x)]+=x
mix=np.clip(mix,-0.98,0.98)
pk=np.abs(mix).max(); print("peak",pk,"total",total)
out=wave.open('mix.wav','wb'); out.setnchannels(1); out.setsampwidth(2); out.setframerate(sr); out.writeframes((mix*32767).astype(np.int16).tobytes()); out.close()
json.dump({"total":round(total,2),"offs":offs,"words":words},open('timings.json','w'),indent=1)
