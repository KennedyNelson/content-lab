const OL='#24150f';
const f=n=>Math.round(n*10)/10;
function sm(pts,closed){const n=pts.length;let d=`M${f(pts[0][0])},${f(pts[0][1])}`;const g=i=>closed?pts[((i%n)+n)%n]:pts[Math.max(0,Math.min(n-1,i))];const end=closed?n:n-1;
 for(let i=0;i<end;i++){const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2);d+=` C${f(p1[0]+(p2[0]-p0[0])/6)},${f(p1[1]+(p2[1]-p0[1])/6)} ${f(p2[0]-(p3[0]-p1[0])/6)},${f(p2[1]-(p3[1]-p1[1])/6)} ${f(p2[0])},${f(p2[1])}`}
 return d+(closed?'Z':'')}
function taper(c,w){const L=[],R=[],n=c.length;for(let i=0;i<n;i++){const a=c[Math.max(0,i-1)],b=c[Math.min(n-1,i+1)];let tx=b[0]-a[0],ty=b[1]-a[1];const m=Math.hypot(tx,ty)||1;tx/=m;ty/=m;L.push([c[i][0]-ty*w[i]/2,c[i][1]+tx*w[i]/2]);R.push([c[i][0]+ty*w[i]/2,c[i][1]-tx*w[i]/2])}
 const u=(p,q)=>{const x=p[0]-q[0],y=p[1]-q[1],m=Math.hypot(x,y)||1;return[x/m,y/m]};const t0=u(c[0],c[1]),t1=u(c[n-1],c[n-2]);
 return[[c[0][0]+t0[0]*w[0]*.5,c[0][1]+t0[1]*w[0]*.5],...L,[c[n-1][0]+t1[0]*w[n-1]*.5,c[n-1][1]+t1[1]*w[n-1]*.5],...R.reverse()]}
const P=(d,fill,sw=4,extra='')=>`<path d="${d}" fill="${fill}" stroke="${fill==='none'?OL:OL}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;
const LN=(d,sw=3,col=OL,op=1)=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`;
let U=0;const uid=()=>'u'+(U++);
function clip(d,inner){const id=uid();return`<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`}
window.LIB={sm,taper,P,LN,clip,uid,f,OL};
