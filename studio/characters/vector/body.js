(function(){
const {sm,taper,P,LN,clip,uid,f,OL}=window.LIB;const {CH,head}=window.CH_;
const G={shY:-352,hipY:-214};
const ls=(c,w,fill,sw=4)=>P(sm(taper(c,w),true),fill,sw);
function hand(x,y,ang,d,s=1){const palm=sm([[-13,-2],[-16,12],[-14,26],[-4,34],[9,32],[16,22],[15,8],[12,-2]],true),thumb=sm([[-10,6],[-24,16],[-26,28],[-16,30],[-9,20]],true);
 return `<g transform="translate(${x},${y}) rotate(${ang}) scale(${s})">${P(thumb,d.skin,3.4)}${P(palm,d.skin,3.6)}${LN('M-6,18 Q-4,28 -2,31 M3,16 Q5,28 7,31',2.2)}</g>`}
function sneaker(d,x,dir,side){const t=dir,L=side?66:42,K=d.id==='kalu';
 const body=sm([[x-22*t,-40],[x+10*t,-40],[x+22*t,-20],[x+L*t,-12],[x+(L+10)*t,2],[x-24*t,2],[x-26*t,-16]],true);
 return P(body,d.shoe,4)+P(sm([[x-26*t,-6],[x+(L+10)*t,-6],[x+(L+12)*t,6],[x-26*t,6]],true),d.sole,3.2)+LN(`M${x+10*t},${-30} Q${x+22*t},${-18} ${x+(L-8)*t},${-14}`,2.4,K?'#4a4a52':'#9a9a96')+(K?'':LN(`M${x-8*t},-20 h12`,2.2,'#9a9a96'))}
function pantsFront(d,o){let s='';const {hipY}=G;
 const legs=o.legs||[[[-36,hipY+6],[-40,-130],[-42,-50]],[[36,hipY+6],[40,-130],[42,-50]]];
 const w=[80,76,84];
 legs.forEach((c,i)=>{const sg=i?1:-1;s+=ls(c,w,d.pant);
  s+=clip(sm(taper(c,w),true),`<rect x="${i?c[0][0]:c[0][0]-60}" y="${hipY}" width="${i?60:22}" height="200" fill="${d.pant2}" opacity="${i?0:.6}"/>`);
  // white side stripes
  const ox=sg*(w[1]/2-14),ox2=sg*(w[1]/2-24);
  [ox,ox2].forEach(o2=>{s+=`<path d="M${c[0][0]+o2},${hipY+26} L${c[1][0]+o2},${c[1][1]} L${c[2][0]+o2},-56" fill="none" stroke="${OL}" stroke-width="7.5" stroke-linecap="round"/><path d="M${c[0][0]+o2},${hipY+26} L${c[1][0]+o2},${c[1][1]} L${c[2][0]+o2},-56" fill="none" stroke="${d.stripe}" stroke-width="3.8" stroke-linecap="round"/>`});
  s+=LN(`M${c[2][0]-40},-52 q40,10 80,0`,2.6)+LN(`M${c[1][0]-26},${c[1][1]-4} q26,12 52,0`,2.2,OL,.7)});
 legs.forEach((c,i)=>{s+=sneaker(d,c[2][0]+(i?6:-6),i?1:-1,false)});
 return s}
function bodyFront(d,o={}){const {shY,hipY}=G,K=d.id==='kalu',back=o.view==='back';let s=pantsFront(d,o);
 // arms (skin), short & sturdy
 const A=o.arms||{R:[[62,shY+26],[72,shY+118],[68,shY+196]],Lf:[[-62,shY+26],[-72,shY+118],[-68,shY+196]]};
 const armw=K?[40,34,28]:[38,32,27];
 const drawArm=k=>{const c=A[k];return ls(c,armw,d.skin)+hand(c[2][0],c[2][1]+(o.hang?-4:4),o.hang!=null?(k==='R'?-o.hang:o.hang):(k==='R'?4:-4),d,1.05)};
 s+=drawArm('Lf');
 // neck
 s+=P(sm([[-20,shY-26],[20,shY-26],[24,shY+6],[-24,shY+6]],true),d.skin,3.6)+clip(sm([[-20,shY-26],[20,shY-26],[24,shY+6],[-24,shY+6]],true),`<ellipse cx="0" cy="${shY-24}" rx="30" ry="14" fill="${d.shade}" opacity=".6"/>`);
 // sleeveless tee
 const tp=sm([[-56,shY+14],[-34,shY-4],[-14,shY-8],[0,shY-8],[14,shY-8],[34,shY-4],[56,shY+14],[58,shY+66],[62,shY+110],[64,hipY-6],[0,hipY+8],[-64,hipY-6],[-62,shY+110],[-58,shY+66]],true);
 s+=P(tp,d.tee,4)+clip(tp,`<rect x="-80" y="${shY-10}" width="46" height="170" fill="${d.tee2}" opacity=".5"/>`);
 s+=LN(`M-60,${shY+66} q10,-8 4,-52`,2.4)+LN(`M60,${shY+66} q-10,-8 -4,-52`,2.4)+LN(`M-52,${hipY-14} q52,16 104,0`,2.6)+LN(`M-18,${shY+70} q6,22 -6,46`,2.2,OL,.6);
 if(!back){s+=LN(`M-24,${shY-4} Q0,${shY+22} 24,${shY-4}`,5,d.tee2)+LN(`M-25,${shY-4} Q0,${shY+25} 25,${shY-4}`,2.6)}
 else s+=LN(`M-22,${shY-4} Q0,${shY+8} 22,${shY-4}`,3)+LN(`M0,${shY+8} V${hipY}`,2.2,OL,.5);
 // waistband + drawstring
 s+=`<path d="M-70,${hipY-4} Q0,${hipY+14} 70,${hipY-4} L70,${hipY+14} Q0,${hipY+32} -70,${hipY+14}Z" fill="${d.pant}" stroke="${OL}" stroke-width="3.6"/>`;
 if(!back)s+=LN(`M-10,${hipY+22} q-4,18 -2,30 M10,${hipY+22} q4,18 2,30`,2.6,'#8e8e96');
 s+=drawArm('R');return s}
function bodySide(d,o){const {shY,hipY}=G,K=d.id==='kalu';let s='';const w=o.walk??.5;
 const sw=w*46;const wl=[66,62,68];
 const leg=sg=>[[0,hipY+6],[sg*sw*.5,-130],[sg*sw,-50]];
 const far=leg(-1),near=leg(1);
 s+=ls(far,wl,d.pant2)+sneaker(d,far[2][0]+4,1,true);
 s+=ls(near,wl,d.pant)+sneaker(d,near[2][0]+4,1,true);
 [0,1].forEach(()=>{});
 s+=`<path d="M${near[0][0]},${hipY+30} L${near[1][0]},${-130} L${near[2][0]},-56" fill="none" stroke="${OL}" stroke-width="7.5" stroke-linecap="round"/><path d="M${near[0][0]},${hipY+30} L${near[1][0]},${-130} L${near[2][0]},-56" fill="none" stroke="${d.stripe}" stroke-width="3.8" stroke-linecap="round"/>`;
 s+=LN(`M${near[2][0]-30},-52 q30,10 60,0`,2.6);
 s+=P(sm([[-16,shY-26],[18,shY-26],[22,shY+6],[-18,shY+6]],true),d.skin,3.6);
 const td=46;const tp=sm([[-td-4,shY+16],[-td+8,shY-2],[0,shY-8],[td-6,shY-2],[td+4,shY+20],[td+8,shY+80],[td+14,shY+130],[td+4,hipY-4],[-td-2,hipY-4],[-td-12,shY+130],[-td-6,shY+80]],true);
 s+=P(tp,d.tee,4)+clip(tp,`<rect x="${-td-14}" y="${shY-10}" width="36" height="170" fill="${d.tee2}" opacity=".5"/>`)+LN(`M${-td},${hipY-14} q${td},12 ${2*td+8},0`,2.6);
 s+=`<path d="M-${td+6},${hipY-4} Q0,${hipY+12} ${td+10},${hipY-4} L${td+10},${hipY+14} Q0,${hipY+30} -${td+6},${hipY+14}Z" fill="${d.pant}" stroke="${OL}" stroke-width="3.6"/>`;
 const sw2=w*40;const arm=sg=>{const c=[[0,shY+28],[sg*sw2*.55,shY+114],[sg*sw2*1.05,shY+190]];return ls(c,K?[40,34,28]:[38,32,27],d.skin)+hand(c[2][0],c[2][1]+4,-sg*8,d,1.05)};
 s+=arm(-1)+arm(1);return s}
function figure(d,x,y,sc,o={}){const view=o.view||'front';let body;
 if(view==='front'||view==='back')body=bodyFront(d,o);else if(view==='q')body=`<g transform="scale(.86,1)">${bodyFront(d,o)}</g>`;else body=bodySide(d,o);
 const hy=G.shY-26-72+16;const hx=(view==='q'?12:0)+(o.hx||0);
 return `<g transform="translate(${x},${y}) scale(${sc})">${body}<g transform="translate(${hx},${hy}) rotate(${o.tilt||0}) scale(${o.hsc||1})">${head(d,{...o,view})}</g></g>`}
window.BODY_={figure,hand};
})();
