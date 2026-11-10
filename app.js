'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const listing=portfolio['124:124'];
const projects=[
 [3,4,5,6,null],[7,8,10,11,'66:2'],[12,13,14,15,'94:2'],[16,17,18,19,'112:2'],[20,21,22,23,'118:2']
];
$('#cards').innerHTML=projects.map(([title,date,org,desc,id])=>{const tag=id?'button':'article';return '<'+tag+' class="card"'+(id?' data-open="'+id+'"':'')+'><span class="card-top"><strong>'+esc(listing[title])+'</strong><span class="badge">'+esc(listing[date])+'</span></span><span class="org">'+esc(listing[org])+'</span><p>'+esc(listing[desc])+'</p></'+tag+'>';}).join('');
const cases={
 '66:2':{count:4,sections:[[10,11],[12,13],[14,15],[36,37]],poster:'usd.png',photo:true,gallery:{title:'From the lab at CIMAV',layout:'cimav',photos:[
  ['cimav-resin-trials','Resin trials on a clear plate','center 63%'],
  ['cimav-printer-lab','Yovanni next to the resin printers','center 45%'],
  ['cimav-printed-specimens','Printed resin specimens on the build plate','center 63%'],
  ['cimav-team','Yovanni with teammates outside CIMAV'],
  ['cimav-tensile-test','A resin specimen in the tensile tester','center 67%'],
  ['cimav-printed-prototypes','Three yellow resin prints under UV light','center 52%']
 ]}},
 '94:2':{count:4,sections:[[10,11],[12,13,14],[15,16,17,18],[19,20,21,22],[23,24,25,26]],poster:'scripps.png',gallery:{title:28,intro:29,layout:'scripps',photos:[['photo-2','Presenting my research'],['photo-3','Friends from Scripps'],['photo-0','Out on the water','center 62%'],['photo-1','Tide pool discoveries']]}},
 '112:2':{count:4,sections:[[10,11],[12,13,14],[15,16],[17,18,19,20,21,22]],gallery:{title:23,layout:'ucsd',photos:[['photo-4',25],['photo-5',26],['photo-6',27],['photo-7',28],['photo-8',29]]}},
 '118:2':{count:3,sections:[[8,9],[10,11,12,13],[14,15,16]],gallery:{title:17,layout:'construction',photos:[['photo-9',19,'center 72%'],['photo-10',20],['photo-11',21],['photo-12',22,'center 63%'],['photo-13',23]]}}
};
const modal=$('#modal'), content=$('#modal-content');
function render(id){
 modal.classList.toggle('email',id==='email');
 if(id==='email'){
  const emails=portfolio['29:2'].slice(2);
  $('#modal-label').textContent='CONTACT';
  content.innerHTML='<h2 id="modal-title">Email</h2><div class="email-links">'+emails.map(e=>'<a href="mailto:'+esc(e)+'">'+esc(e)+'</a>').join('')+'</div>';
 }else{
  const d=portfolio[id], c=cases[id];
  $('#modal-label').textContent=d.at(-2);
  const stats=Array.from({length:c.count},(_,i)=>'<div><strong>'+esc(d[2+i*2])+'</strong><span>'+esc(d[3+i*2])+'</span></div>').join('');
  const sections=c.sections.map(([h,...ps])=>'<h3>'+esc(d[h])+'</h3>'+ps.map(i=>'<p>'+esc(d[i])+'</p>').join('')).join('');
  const table=id==='66:2'?'<div class="table"><table><thead><tr>'+d.slice(16,21).map(x=>'<th scope="col">'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+[21,26,31].map(i=>'<tr>'+d.slice(i,i+5).map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'';
  const poster=c.poster?'<aside class="poster">'+(c.photo?'<figure><img src="assets/conference.png" alt="Yovanni presenting his resin research"><figcaption>'+esc(d[38])+'</figcaption></figure>':'')+'<h3>Research poster</h3><a href="assets/'+c.poster+'" target="_blank" rel="noopener"><img src="assets/'+c.poster+'" alt="Open the full-size research poster"></a></aside>':'';
  const gallery=c.gallery?(()=>{const {title,intro,layout,photos}=c.gallery;
   const value=x=>typeof x==='number'?d[x]:x;
   const tiles=photos.map(([name,label,position])=>{
    const src='assets/'+name+'.jpg';
    return '<a href="'+src+'" target="_blank" rel="noopener"><img loading="lazy" src="'+src+'" alt="'+esc(value(label))+'"'+(position?' style="object-position:'+position+'"':'')+'></a>';
   }).join('');
   return '<section class="gallery gallery--'+layout+'"><h3>'+esc(value(title))+'</h3>'+(intro?'<p>'+esc(value(intro))+'</p>':'')+'<div>'+tiles+'</div></section>';
  })():'';
  content.innerHTML='<h2 id="modal-title">'+esc(d[0])+'</h2><p class="lede">'+esc(d[1])+'</p><div class="stats">'+stats+'</div><div class="detail-grid"><div class="copy">'+sections+table+'</div>'+poster+'</div>'+gallery;
 }
 modal.showModal();modal.scrollTop=0;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)render(b.dataset.open);});
modal.querySelector('.close').onclick=()=>modal.close();
modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
const reveal=$('.reveal');
function flip(){const on=reveal.classList.toggle('flipped');reveal.setAttribute('aria-pressed',String(on));reveal.querySelector('.reveal-label').textContent=on?'↺ Back to the conference photo':'↻ Meet Mini Yovanni';}
const auto=matchMedia('(prefers-reduced-motion: reduce)').matches?0:setTimeout(flip,1000);
reveal.addEventListener('click',()=>{clearTimeout(auto);flip();});
