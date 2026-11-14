import numpy as np, subprocess, wave, json
from PIL import Image, ImageDraw, ImageFont
B='/mnt/user-data/outputs/'
V=B+'breakup_video/'
FPS=24
tl=json.load(open(B+'el_audio/timeline3.json'))   # [id,who,start,end]
DUR=tl[-1][3]+1.5; N=int(FPS*DUR)
def sample(im,x,y): return im.getpixel((x,y))
CFG={
 'A':dict(f='nA.jpg',k=(465,1155,'down'),b=(1083,1098,'smile'),kw=62,bw=68),
 'B':dict(f='nB.jpg',k=(485,1142,'down'),b=(1100,1108,'tight'),kw=66,bw=108),
 'C':dict(f='nC.jpg',k=(468,1140,'flat'),b=(1068,1095,'flat'),kw=62,bw=68),
 'D':dict(f='nD.jpg',k=(481,1153,'big'),b=(1068,1095,'flat'),kw=90,bw=68)}
imgs={}
for n,c in CFG.items():
    im=Image.open(V+c['f']).convert('RGB')
    d=ImageDraw.Draw(im)
    col=sample(im,1265,2590); d.rectangle([1275,2490,1470,2690],fill=col)
    import cv2
    arr=np.asarray(im).copy(); mask=np.zeros(arr.shape[:2],np.uint8)
    for who,wk in (('k','kw'),('b','bw')):
        x,y,_=c[who]; w=c[wk]
        mask[y-28-(14 if w>100 else 0):y+28,x-w:x+w]=255
    arr=cv2.inpaint(arr,mask,9,cv2.INPAINT_TELEA)
    im=Image.fromarray(arr)
    imgs[n]=im.crop((0,11,1536,11+2730))
# envelopes per speaker
env={'k':np.zeros(N),'b':np.zeros(N)}
for id,who,s,e in tl:
    w=wave.open(B+f'el_audio/f_{id}.wav');sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)
    if w.getnchannels()>1:a=a.reshape(-1,w.getnchannels()).mean(1)
    hop=sr//FPS;n=len(a)//hop
    r=np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2)) for i in range(n)]);r=r/(np.percentile(r,95)+1e-9)
    s0=int(s*FPS)
    for i in range(n):
        if s0+i<N: env[who][s0+i]=max(env[who][s0+i],min(1,r[i]))
def lvl(v): return 0 if v<0.12 else (1 if v<0.4 else (2 if v<0.7 else 3))
# which still when
cuts=[(0,'A'),(5.9,'B'),(11.3,'D')]
def still_at(t):
    cur='A'
    for s,n in cuts:
        if t>=s: cur=n; seg_start=s
    return cur,seg_start
def frame(i):
    t=i/FPS; n,s0=still_at(t); c=CFG[n]
    im=imgs[n].copy(); d=ImageDraw.Draw(im)
    for who in 'kb':
        x,y,shape=c[who]; y-=11
        l=lvl(env[who][i])
        ol=(28,16,14) if who=='k' else (45,26,20)
        if l==0:
            if shape=='down': d.line([x-34,y+10,x-16,y+1,x,y-1,x+16,y+1,x+34,y+10],fill=ol,width=7,joint='curve')
            elif shape=='big': d.line([x-62,y+10,x-35,y-12,x,y-22,x+35,y-14,x+66,y+4],fill=ol,width=7,joint='curve')
            elif shape=='smile': d.arc([x-40,y-26,x+40,y+14],20,160,fill=ol,width=6)
            elif shape=='tight': d.line([x-40,y,x+40,y],fill=ol,width=7)
            else: d.line([x-34,y,x+34,y],fill=ol,width=7)
        else:
            h={1:14,2:26,3:38}[l];wd={1:36,2:44,3:50}[l]
            S=4; bw_=int(2*wd+12); bh_=int(h+h//3+12)
            m=Image.new('RGBA',(bw_*S,bh_*S),(0,0,0,0)); md=ImageDraw.Draw(m)
            ex0,ey0,ex1,ey1=6*S,6*S,(6+2*wd)*S,(6+h+h//3)*S
            md.ellipse([ex0,ey0,ex1,ey1],fill=(105,35,45,255))
            clip=Image.new('L',m.size,0); ImageDraw.Draw(clip).ellipse([ex0,ey0,ex1,ey1],fill=255)
            lay=Image.new('RGBA',m.size,(0,0,0,0)); ld=ImageDraw.Draw(lay)
            if l>=2:
                ld.rectangle([ex0,ey0,ex1,ey0+int((ey1-ey0)*0.30)],fill=(255,255,253,255))
                tr=0.55 if l==2 else 0.6
                ld.ellipse([ex0+(ex1-ex0)*0.22,ey0+(ey1-ey0)*(1-tr*0.75),ex1-(ex1-ex0)*0.22,ey1+(ey1-ey0)*0.25],fill=(222,118,125,255))
            lay.putalpha(Image.composite(lay.getchannel('A'),Image.new('L',m.size,0),clip))
            m=Image.alpha_composite(m,lay); md=ImageDraw.Draw(m)
            md.ellipse([ex0,ey0,ex1,ey1],outline=(25,12,10,255),width=5*S//2+2)
            m=m.resize((bw_,bh_),Image.LANCZOS)
            im.paste(m,(int(x-wd-6),int(y-h//3-6)),m)
    dur_seg=None
    z=1.12+0.06*min(1,(t-s0)/6.0)
    cw,ch=1536/z,2730/z
    x0=(1536-cw)/2;y0=(2730-ch)*0.55
    return im.resize((1080,1920),Image.BILINEAR,box=(x0,y0,x0+cw,y0+ch))
cap=Image.new('RGBA',(1080,1920),(0,0,0,0));cd=ImageDraw.Draw(cap)
ft=ImageFont.truetype('/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf',50)
t="Meri galti kya thi?";b=cd.textbbox((0,0),t,font=ft);tw=b[2]-b[0];th=b[3]-b[1]
x0=(1080-tw)//2-30;y0=230
cd.rectangle([x0,y0,x0+tw+60,y0+th+50],fill='white');cd.text((x0+30-b[0],y0+25-b[1]),t,font=ft,fill='black');cap.save('/tmp/w/cap4.png')
p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1920','-r',str(FPS),'-i','-','-i',B+'el_audio/el_dialogue_v3.mp3','-map','0:v','-map','1:a','-c:v','libx264','-crf','17','-pix_fmt','yuv420p','-c:a','aac','-shortest',B+'breakup_reel_v15.mp4'],stdin=subprocess.PIPE)
for i in range(N): p.stdin.write(np.asarray(frame(i)).tobytes())
p.stdin.close();p.wait()
