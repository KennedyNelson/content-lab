# Audio + timing for IG reel "Kalu interrupted by call" (Stickman). Kalu=Raunak M Reel, Friend=Armaan (phone-filtered). usage: python3 asm.py
import numpy as np, json, subprocess, re, sys
from scipy.io import wavfile
from scipy import signal
sys.path.insert(0,'../..'); import bgm
SR=44100; L=json.load(open('lines.json'))
SPD=[1.2,1.12,1.25]; CAPS=[.08,.08,.03]; PITCH=[.87,1.0,.87]; GAIN=[.1,.1,.1]
T_BUZZ=6.45; BUZZ_D=1.4; T=[8.4]; INTRO=3.85
def tight(x,cap=.08):
    h=int(.012*SR); e=np.convolve(np.abs(x),np.ones(h)/h,'same'); th=max(.012,e.max()*.05)
    act=np.where(e>th)[0]; x=x[max(0,act[0]-300):act[-1]+1500]; e=e[max(0,act[0]-300):act[-1]+1500]
    s=e<th; o=[];k=0;m=len(x)
    while k<m:
        j=k
        if s[k]:
            while j<m and s[j]: j+=1
            o.append(x[k:k+min(j-k,int(cap*SR))])
        else:
            while j<m and not s[j]: j+=1
            o.append(x[k:j])
        k=j
    return np.concatenate(o)
segs=[];Wd=[];TT=[];gaps=[0,.25,.25]
t=T[0]
for i,(sp,txt) in enumerate(L):
    subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',f'raw/l{i+1}.mp3','-ac','1','-ar',str(SR),f'data/l{i}.wav'],check=True)
    _,x=wavfile.read(f'data/l{i}.wav'); x=x.astype(float)/32768; y=tight(x,CAPS[i])
    wavfile.write(f'data/t{i}.wav',SR,(y*32767).astype(np.int16))
    subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',f'data/t{i}.wav','-filter:a',f'atempo={SPD[i]}',f'data/p{i}.wav'],check=True); _,y=wavfile.read(f'data/p{i}.wav'); y=y.astype(float)/32768
    if sp=='f':
        b,a=signal.butter(3,[320/(SR/2),3200/(SR/2)],'band'); y=signal.lfilter(b,a,y)
    if PITCH[i]!=1.0:
        wavfile.write(f'data/q{i}.wav',SR,(y*32767).astype(np.int16))
        subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',f'data/q{i}.wav','-filter:a',f'asetrate={int(SR*PITCH[i])},aresample={SR},atempo={1/PITCH[i]:.4f}',f'data/r{i}.wav'],check=True); _,y=wavfile.read(f'data/r{i}.wav'); y=y.astype(float)/32768
    y=y/np.sqrt((y**2).mean())*GAIN[i]
    t+=gaps[i]
    h=int(.012*SR); e=np.convolve(np.abs(y),np.ones(h)/h,'same'); voiced=e>e.max()*.07; cum=np.cumsum(voiced)/SR; tot=cum[-1]
    words=txt.split(); w8=[len(re.sub(r'\W','',w))+1.5 for w in words]; c=0
    for w,g in zip(words,w8):
        a_=c/sum(w8)*tot; c+=g; b_=c/sum(w8)*tot
        Wd.append(dict(w=w,line=i,spk=sp,s=round(t+int(np.searchsorted(cum,a_))/SR,3),e=round(t+int(np.searchsorted(cum,b_))/SR,3)))
    TT.append(dict(line=i,sp=sp,start=round(t,3),end=round(t+len(y)/SR,3),text=txt))
    segs.append((t,y,sp)); t+=len(y)/SR
DUR=round(t+.3,2); N=int(DUR*SR); v=np.zeros(N)
for s,y,sp in segs: i0=int(s*SR); v[i0:i0+len(y)]+=y
v=v/np.abs(v).max()*.89
# phone buzz + ring, flung-clothes whooshes
tt=np.arange(int(BUZZ_D*SR))/SR
fx=np.zeros(N)
def add(x,at,g=1):
    i=int(at*SR); x=x[:N-i]; fx[i:i+len(x)]+=x*g
add(np.sin(2*np.pi*880*tt)*((tt%.5)<.18)*.12+np.sin(2*np.pi*1320*tt)*((tt%.5)<.18)*.07+np.sin(2*np.pi*95*tt)*((tt%.32)<.2)*.22,T_BUZZ)
sfxi=np.zeros(1)
subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i','/mnt/user-data/uploads/Downloads/2668-pornhub-intro.mp3','-ac','1','-ar',str(SR),'data/intro.wav'],check=True)
_,iw=wavfile.read('data/intro.wav'); iw=iw.astype(float)/32768; iw=iw[:int(2.6*SR)]*np.concatenate([np.ones(int(2.6*SR)-int(.25*SR)),np.linspace(1,0,int(.25*SR))])[:int(2.6*SR)]; add(iw/np.abs(iw).max()*.55,INTRO)
for wt in (4.0,4.35):
    n=int(.3*SR); r=np.random.default_rng(3).standard_normal(n); r=np.convolve(r,np.ones(40)/40,'same'); add(r*np.sin(np.linspace(0,np.pi,n))*.5,wt)
b=bgm.make('lofi',DUR)[:N]; b=np.pad(b,(0,N-len(b)))
duck=np.convolve((np.abs(v)>.02).astype(float),np.ones(int(.25*SR))/int(.25*SR),'same')
bg=b*(.16-.09*np.clip(duck*3,0,1)); bg[int(INTRO*SR):int((INTRO+2.6)*SR)]*=.2
mix=v+fx+bg; mix=np.tanh(mix*1.1)
wavfile.write('data/mix.wav',SR,(mix*32767).astype(np.int16))
n30=int(DUR*30)+1; env={'k':[0]*n30,'f':[0]*n30}
for s,y,sp in segs:
    f=SR//30; e=np.abs(y); h=int(.012*SR); e=np.convolve(e,np.ones(h)/h,'same')
    m=np.array([e[j*f:(j+1)*f].mean() if j*f<len(e) else 0 for j in range(int(len(y)/f)+1)]); top=np.percentile(m,95) or 1
    for j,val in enumerate(m):
        idx=int(s*30)+j
        if idx<n30: env[sp][idx]=round(float(np.clip(val/top,0,1)),3)
json.dump(Wd,open('data/words.json','w')); json.dump(TT,open('data/timing.json','w'),indent=0)
json.dump(dict(dur=DUR,intro=INTRO,buzz=[T_BUZZ,T_BUZZ+BUZZ_D],lines=[[d['sp'],d['start'],d['end']] for d in TT]),open('data/meta.json','w')); json.dump(env,open('data/env.json','w'))
print('DUR',DUR,[ (d['start'],d['end']) for d in TT])
