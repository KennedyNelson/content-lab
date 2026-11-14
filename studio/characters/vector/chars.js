(function(){
const {sm,taper,P,LN,clip,uid,f,OL}=window.LIB;
const CH={
 kalu:{id:'kalu',skin:'#5E3A24',shade:'#42261A',hair:'#14100F',hi:'#3C312E',tee:'#18181C',tee2:'#0F0F12',pant:'#1B1B20',pant2:'#121216',shoe:'#1E1E22',sole:'#F1EFEA',stripe:'#F4F4F4',iris:'#1a0f0a',brow:'#14100F'},
 battery:{id:'battery',skin:'#C99565',shade:'#A8754A',hair:'#17110F',hi:'#463832',tee:'#2F80DB',tee2:'#2064B3',pant:'#1B1B20',pant2:'#121216',shoe:'#F6F6F4',sole:'#C9C9C6',stripe:'#F4F4F4',iris:'#2a1a10',brow:'#17110F',beard:'#241812'}
};
const SK=(sx=1)=>[[-84,-4],[-82,-44],[-56,-72],[0,-80],[56,-72],[82,-44],[84,-4],[78,34],[52,62],[16,72],[-16,72],[-52,62],[-78,34]].map(p=>[p[0]*sx,p[1]]);
const skull=()=>sm(SK(),true);
function ear(d,sx){const x=84*sx;return P(sm([[x-2*sx,-18],[x+16*sx,-24],[x+24*sx,-4],[x+20*sx,18],[x+6*sx,28],[x-4*sx,22]],true),d.skin,3.6)+LN(`M${x+4*sx},-8 Q${x+16*sx},-4 ${x+12*sx},12`,2.4,OL,.8)}
function eyes(d,o,sh=0,view='front'){let s='';const ex=34,ey=-2;const rx=o.shock?21:19,ry=o.shock?24:21.5,ir=o.shock?8:(o.ir||12.5);const[lx,ly]=o.look||[0,0];
 [[-ex+sh*.8,1],[ex+sh*1.15,view==='q'?.9:1]].forEach(([x,k],i)=>{const id=uid();
  s+=`<ellipse cx="${x}" cy="${ey}" rx="${rx*k}" ry="${ry}" fill="#fff" stroke="${OL}" stroke-width="3.4"/>`;
  const px=x+lx*rx*.45,py=ey+ly*ry*.4;s+=`<circle cx="${px}" cy="${py}" r="${ir}" fill="${d.iris}"/><circle cx="${px}" cy="${py}" r="${ir*.46}" fill="#000"/><circle cx="${px-ir*.35}" cy="${py-ir*.4}" r="${ir*.3}" fill="#fff"/>`;
  const lid=o.lid||0,la=o.lidAng||0;
  if(lid||la){const a=la*(i?1:-1);s+=`<clipPath id="${id}"><ellipse cx="${x}" cy="${ey}" rx="${rx*k}" ry="${ry}"/></clipPath><g clip-path="url(#${id})"><polygon points="${x-rx-3},${ey-ry-3} ${x+rx+3},${ey-ry-3} ${x+rx+3},${ey-ry+ry*2*lid+a*ry*.9} ${x-rx-3},${ey-ry+ry*2*lid-a*ry*.9}" fill="${d.shade}"/></g><line x1="${x-rx}" y1="${ey-ry+ry*2*lid-a*ry*.9}" x2="${x+rx}" y2="${ey-ry+ry*2*lid+a*ry*.9}" stroke="${OL}" stroke-width="4"/>`}
  else s+=`<path d="M${x-rx*k},${ey-3} Q${x},${ey-ry-5} ${x+rx*k},${ey-3}" fill="none" stroke="${OL}" stroke-width="4.4" stroke-linecap="round"/>`});return s}
function brows(d,o,sh=0){const a=o.ba||0,u=o.bu||0,y=-40-u;const mk=(x,ang)=>`<path d="M-20,3 Q0,-7 20,0" transform="translate(${x},${y}) rotate(${ang*57.3})" fill="none" stroke="${d.brow}" stroke-width="${d.id==='kalu'?10:9}" stroke-linecap="round"/>`;
 return mk(-34+sh*.8,-a-.05)+mk(34+sh*1.15,a+.05)}
function nose(x,y){return`<path d="M${x-4},${y-8} Q${x-8},${y+4} ${x-4},${y+7} Q${x},${y+10} ${x+4},${y+7} Q${x+8},${y+4} ${x+4},${y-8}" fill="none" stroke="${OL}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`}
function mouth(k,x,y,s=1){const T=`transform="translate(${x},${y}) scale(${s})"`,st=`stroke="${OL}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"`;
 switch(k){
  case'talk':return`<path ${T} d="M-20 -4 Q0 -8 20 -4 Q18 18 0 18 Q-18 18 -20 -4Z" fill="#5f1c17" ${st}/><path ${T} d="M-16 -3 Q0 -6 16 -3 L15 4 Q0 2 -15 4Z" fill="#fff"/><path ${T} d="M-9 13 Q0 8 9 13 Q0 17 -9 13Z" fill="#d9625e"/>`;
  case'o':return`<ellipse ${T} cx="0" cy="4" rx="9" ry="13" fill="#5f1c17" ${st}/><ellipse ${T} cx="0" cy="10" rx="5" ry="4" fill="#d9625e"/>`;
  case'laugh':return`<path ${T} d="M-26 -6 Q0 -10 26 -6 Q24 28 0 30 Q-24 28 -26 -6Z" fill="#5f1c17" ${st}/><path ${T} d="M-21 -5 Q0 -8 21 -5 L19 3 Q0 1 -19 3Z" fill="#fff"/><path ${T} d="M-12 22 Q0 12 12 22 Q0 28 -12 22Z" fill="#d9625e"/>`;
  case'grit':return`<g ${T}><path d="M-22 -4 Q0 -9 22 -4 L20 12 Q0 17 -20 12Z" fill="#fff" ${st}/><path d="M-11 -6V13M0 -7V15M11 -6V13M-21 4Q0 8 21 4" stroke="${OL}" stroke-width="2.2" fill="none"/></g>`;
  case'sad':return`<path ${T} d="M-16 8 Q0 -6 16 8" fill="none" ${st}/>`;
  case'smirk':return`<path ${T} d="M-18 4 Q4 8 20 -8" fill="none" ${st}/>`;
  case'flat':return`<path ${T} d="M-14 2 Q0 3 14 2" fill="none" ${st}/>`;
  default:return`<path ${T} d="M-20 -4 Q0 12 20 -4" fill="none" ${st}/>`}} // closed smile
function fade(d,view){return clip(skull(),`<ellipse cx="-92" cy="-16" rx="26" ry="38" fill="${d.hair}" opacity=".62"/><ellipse cx="92" cy="-16" rx="26" ry="38" fill="${d.hair}" opacity=".62"/>`)}
function hairKalu(d,view,sh=0){const H=d.hair,hi=d.hi;let s='';
 if(view==='back'){
  s+=P(sm([[-90,-20],[-96,-64],[-70,-104],[-30,-122],[8,-128],[48,-118],[80,-96],[96,-60],[92,-14],[100,30],[84,66],[56,52],[44,78],[14,62],[-10,84],[-38,60],[-58,76],[-80,58],[-98,30]],true),H,4);
  s+=LN('M-70,-92 C-40,-122 10,-124 54,-108',3,hi,.85)+LN('M-80,-50 C-50,-90 0,-96 50,-84',3,hi,.7)+LN('M-60,10 C-52,30 -50,46 -54,60',3,hi,.7)+LN('M0,-20 C6,10 2,40 8,64',3,hi,.7)+LN('M60,6 C70,26 70,44 64,58',3,hi,.7);return s}
 if(view==='side'){
  s+=P(sm([[-70,-30],[-88,-8],[-100,24],[-92,60],[-72,50],[-62,78],[-40,58],[-24,72],[-10,40],[-14,6]],true),H,4);
  s+=P(sm([[-78,-14],[-86,-56],[-62,-92],[-20,-108],[28,-104],[64,-84],[82,-62],[78,-46],[58,-50],[44,-40],[26,-50],[4,-42],[-20,-30],[-44,-10]],true),H,4);
  s+=LN('M-70,-70 C-40,-104 10,-108 56,-92',3,hi,.85)+LN('M-60,-30 C-30,-70 20,-86 62,-72',3,hi,.7)+LN('M-90,24 C-82,40 -76,50 -74,56',3,hi,.7)+LN('M-60,10 C-52,30 -44,50 -40,62',3,hi,.7);return s}
 // front / 3-4 : back mullet drawn first (caller), here top + fade
 const x0=sh*.5;
 s+=P(sm([[-84+x0,-18],[-92+x0,-56],[-72+x0,-92],[-32+x0,-114],[10+x0,-122],[52+x0,-110],[82+x0,-86],[92+x0,-48],[88+x0,-16],[78+x0,-40],[56+x0,-54],[30+x0,-48],[6+x0,-58],[-18+x0,-50],[-44+x0,-58],[-66+x0,-46]],true),H,4);
 // big swept wave across the forehead, curling to the right
 s+=P(`M${-70+x0},-52 C${-52+x0},-84 ${-6+x0},-92 ${30+x0},-72 C${54+x0},-60 ${72+x0},-62 ${86+x0},-44 C${70+x0},-48 ${52+x0},-40 ${38+x0},-46 C${18+x0},-38 ${-6+x0},-48 ${-22+x0},-46 C${-40+x0},-40 ${-56+x0},-40 ${-70+x0},-52Z`,H,3.4);
 s+=LN(`M${-62+x0},-96 C${-30+x0},-120 ${16+x0},-122 ${60+x0},-104`,3.2,hi,.9)+LN(`M${-76+x0},-60 C${-52+x0},-96 ${-8+x0},-100 ${34+x0},-84`,3,hi,.8)+LN(`M${-30+x0},-78 C${-10+x0},-70 ${14+x0},-66 ${40+x0},-70`,2.8,hi,.7)+LN(`M${44+x0},-100 C${64+x0},-86 ${80+x0},-70 ${88+x0},-50`,2.8,hi,.7);
 return s}
function mulletBack(d,sh=0){const H=d.hair,hi=d.hi,x0=sh*.3;let s='';
 [-1,1].forEach(sg=>{const pts=sg<0?[[-80,-30],[-98,0],[-108,36],[-98,70],[-80,60],[-72,86],[-52,64],[-40,40],[-56,0]]:[[80,-30],[98,0],[108,36],[98,70],[80,60],[72,86],[52,64],[40,40],[56,0]];
  s+=P(sm(pts.map(p=>[p[0]+x0,p[1]]),true),H,4)});
 s+=LN(`M${-96+x0},20 C${-90+x0},40 ${-86+x0},56 ${-84+x0},64`,3,hi,.7)+LN(`M${96+x0},20 C${90+x0},40 ${86+x0},56 ${84+x0},64`,3,hi,.7);return s}
function hairBattery(d,view,sh=0){const H=d.hair,hi=d.hi;let s='';
 if(view==='back'){s+=P(sm([[-82,-18],[-88,-56],[-62,-90],[-20,-102],[24,-102],[62,-90],[88,-56],[82,-18],[70,6],[40,20],[0,24],[-40,20],[-70,6]],true),H,4);
  s+=LN('M-60,-76 C-30,-98 20,-98 56,-80',3,hi,.8)+LN('M-70,-40 C-40,-70 20,-72 64,-46',3,hi,.6)+clip(skull(),`<rect x="-100" y="-4" width="200" height="80" fill="${H}" opacity=".35"/>`);return s}
 if(view==='side'){s+=P(sm([[-76,-14],[-84,-54],[-60,-86],[-20,-100],[26,-98],[62,-82],[80,-54],[74,-40],[52,-52],[30,-46],[6,-56],[-20,-46],[-48,-24],[-62,0]],true),H,4);
  s+=LN('M-66,-70 C-36,-96 14,-98 56,-82',3,hi,.85)+LN('M-60,-34 C-30,-62 20,-72 60,-62',3,hi,.7);return s}
 const x0=sh*.5;
 s+=P(sm([[-80+x0,-18],[-88+x0,-56],[-66+x0,-90],[-24+x0,-104],[20+x0,-106],[62+x0,-94],[86+x0,-60],[82+x0,-18],[72+x0,-42],[50+x0,-56],[24+x0,-50],[0+x0,-60],[-26+x0,-52],[-52+x0,-56],[-70+x0,-42]],true),H,4);
 // textured, upswept top: several short chunky locks
 [[-60,-86,-46,-100,-34,-84],[-34,-96,-18,-112,-4,-96],[-6,-100,10,-116,24,-100],[22,-100,40,-114,54,-96],[50,-92,68,-100,74,-80]].forEach(([a,b,c,d2,e,g])=>{s+=P(`M${a+x0},${b} Q${c+x0},${d2} ${e+x0},${g}`+` Q${c+x0+4},${d2+14} ${a+x0},${b}Z`,H,3)});
 s+=LN(`M${-58+x0},-84 C${-30+x0},-100 ${14+x0},-102 ${54+x0},-88`,3,hi,.85)+LN(`M${-70+x0},-56 C${-40+x0},-78 ${10+x0},-80 ${50+x0},-66`,3,hi,.7)+LN(`M${-20+x0},-96 C${-12+x0},-82 ${-14+x0},-68 ${-20+x0},-56`,2.6,hi,.7)+LN(`M${30+x0},-98 C${40+x0},-86 ${42+x0},-70 ${36+x0},-56`,2.6,hi,.7);
 return s}
function beard(d,sh=0,view='front',o={}){const B=d.beard,x0=sh*.7;let s='';
 if(view==='side'){
  s+=P(sm([[-6,22],[4,46],[18,64],[44,70],[70,58],[84,46],[88,34],[76,40],[60,52],[40,54],[18,48],[6,30],[-2,18]],true),B,3.6);
  s+=P(sm([[56,32],[72,30],[86,34],[76,40],[60,40]],true),B,3);return s}
 const outer=[[-80+x0,-4],[-78+x0,34],[-52+x0,62],[-16+x0,72],[16+x0,72],[52+x0,62],[78+x0,34],[80+x0,-4]];
 const inner=[[70+x0,10],[62+x0,30],[46+x0,46],[26+x0,54],[x0,56],[-26+x0,54],[-46+x0,46],[-62+x0,30],[-70+x0,10]];
 s+=P(sm([...outer,...inner],true),B,3.6);
 s+=P(sm([[-32+x0,38],[-16+x0,28],[x0,33],[16+x0,28],[32+x0,38],[16+x0,43],[x0,39],[-16+x0,43]],true),B,3);
 return s}
function glasses(d,o,sh=0,view='front'){const c='#101012';let s='';const r=31;const X=[-32+sh*.8,32+sh*1.15];
 s+=`<path d="M${X[0]+r-3},-8 Q${(X[0]+X[1])/2},-16 ${X[1]-r+3},-8" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;
 X.forEach(x=>{s+=`<circle cx="${x}" cy="-2" r="${r}" fill="rgba(190,225,240,.16)" stroke="${c}" stroke-width="6.5"/><path d="M${x-r*.6},${-2-r*.4} Q${x-r*.3},${-2-r*.72} ${x+r*.15},${-2-r*.76}" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".8"/>`});
 s+=`<path d="M${X[0]-r},-6 L-88,-10" stroke="${c}" stroke-width="5.5" stroke-linecap="round"/>`+(view==='q'?'':`<path d="M${X[1]+r},-6 L88,-10" stroke="${c}" stroke-width="5.5" stroke-linecap="round"/>`);return s}
function head(d,o={}){const view=o.view||'front',K=d.id==='kalu';let s='';
 if(view==='back'){s+=ear(d,-1)+ear(d,1)+P(skull(),d.skin,4);s+=(K?hairKalu(d,'back'):hairBattery(d,'back'));return s}
 if(view==='side'){
  const prof=sm([[-76,-8],[-76,-48],[-50,-76],[0,-84],[50,-76],[76,-48],[84,-20],[92,0],[98,10],[90,18],[88,26],[84,34],[86,44],[72,58],[40,70],[0,72],[-40,62],[-68,34]],true);
  s+=P(prof,d.skin,4)+clip(prof,`<ellipse cx="-74" cy="20" rx="34" ry="96" fill="${d.shade}" opacity=".45"/>`);
  s+=(K?hairKalu(d,'side'):'');
  s+=P(sm([[-14,-14],[-38,-22],[-48,2],[-38,26],[-18,22]],true),d.skin,3.6)+LN('M-22,-4 Q-34,2 -26,16',2.4,OL,.8);
  s+=(K?'':hairBattery(d,'side'));
  const ex=46;s+=`<ellipse cx="${ex}" cy="-2" rx="13" ry="17.5" fill="#fff" stroke="${OL}" stroke-width="3.4"/><circle cx="${ex+4}" cy="-2" r="9.5" fill="${d.iris}"/><circle cx="${ex+4}" cy="-2" r="4.5" fill="#000"/><circle cx="${ex+1}" cy="-6" r="3" fill="#fff"/><path d="M${ex-13},-4 Q${ex},-24 ${ex+13},-4" fill="none" stroke="${OL}" stroke-width="4.4" stroke-linecap="round"/>`;
  if(!K)s+=`<circle cx="${ex+2}" cy="-2" r="31" fill="rgba(190,225,240,.16)" stroke="#101012" stroke-width="6.5"/><path d="M${ex-29},-6 L-30,-8" stroke="#101012" stroke-width="5.5"/>`;
  s+=`<path d="M${ex-22},-34 Q${ex},-44 ${ex+22},-32" fill="none" stroke="${d.brow}" stroke-width="9" stroke-linecap="round"/>`;
  if(!K)s+=beard(d,0,'side');
  s+=mouth(o.mouth||'closed',66,K?46:50,.8);return s}
 const q=view==='q',sh=q?22:0;
 if(K)s+=mulletBack(d,sh);
 s+=(q?'':ear(d,1))+ear(d,-1);
 s+=P(skull(),d.skin,4)+clip(skull(),`<ellipse cx="${q?-70:-82}" cy="24" rx="${q?40:24}" ry="96" fill="${d.shade}" opacity=".45"/><ellipse cx="0" cy="76" rx="56" ry="14" fill="${d.shade}" opacity=".3"/>`);
 s+=fade(d,view);
 s+=nose(sh*.9,22)+eyes(d,o,sh,view)+brows(d,o,sh);
 if(!K)s+=glasses(d,o,sh,view);
 s+=(K?'':beard(d,sh))+mouth(o.mouth||'closed',sh*.9,K?46:50,1);
 s+=(K?hairKalu(d,view,sh):hairBattery(d,view,sh));
 if(o.sweat)s+=`<path d="M72,-62 q10,18 0,26 q-10,-8 0,-26Z" fill="#9edcf5" stroke="${OL}" stroke-width="3"/>`;
 return s}
window.CH_={CH,head};
})();
