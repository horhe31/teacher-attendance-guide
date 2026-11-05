(function(){
 'use strict';
 const $=s=>document.querySelector(s),scene=$('#record-scene'),tilt=$('#record-stack');
 const media=matchMedia('(prefers-reduced-motion: reduce)');let active=true;
 function canMove(){return active&&!document.hidden&&!media.matches&&document.body.dataset.motion!=='off';}
 scene.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||!canMove())return;const r=scene.getBoundingClientRect();tilt.style.setProperty('--atlas-y',`${((event.clientX-r.left)/r.width-.5)*10}deg`);tilt.style.setProperty('--atlas-x',`${-((event.clientY-r.top)/r.height-.5)*7}deg`);});
 function clearTilt(){tilt.style.removeProperty('--atlas-x');tilt.style.removeProperty('--atlas-y');}
 scene.addEventListener('pointerleave',clearTilt);media.addEventListener('change',clearTilt);
 new MutationObserver(clearTilt).observe(document.body,{attributes:true,attributeFilter:['data-motion']});
 new IntersectionObserver(entries=>{active=entries[0].isIntersecting;document.body.classList.toggle('atlas-offscreen',!active);if(!active)clearTilt();}).observe(scene);
 document.addEventListener('visibilitychange',()=>document.body.classList.toggle('motion-paused',document.hidden));
 const intro=document.createElement('div');intro.className='reference-bar wrap';intro.innerHTML='<a href="#missions">← Back to your missions</a><small>TEACHER QUEST / REFERENCE LIBRARY</small><a href="assets/Teacher-Quest-Complete-Guide.pdf?v=orientation-2026-revised" download="Teacher-Attendance-Rules-Orientation-2026-Revised.pdf">Orientation PDF ↓</a>';$('#guide').before(intro);
 const guide=$('#guide'),tools=$('#tools'),resources=$('#resources'),action=$('#action'),edition=$('.edition-strip'),recap=$('.recap'),downloads=$('#downloads');
 function route(){const hash=location.hash;const game=hash.startsWith('#mission-')||hash==='#progress';const mode=hash==='#tools'?'tools':hash==='#resources'||hash.startsWith('#resource-')?'resources':hash==='#action'?'action':hash==='#guide'||hash.startsWith('#chapter-')||hash.startsWith('#rule-')?'guide':'home';document.body.dataset.view=game?'game':mode;
  if(!game){$('#quest-home').hidden=mode!=='home';$('#missions').hidden=mode!=='home';guide.hidden=mode!=='guide';tools.hidden=mode!=='tools';resources.hidden=mode!=='resources';action.hidden=mode!=='action'&&!(mode==='guide'&&/^#rule-(32|33|34)$/.test(hash));edition.hidden=mode!=='guide';recap.hidden=true;downloads.hidden=mode!=='home';}
  intro.hidden=game||mode==='home';document.querySelectorAll('.desktop-nav a').forEach(a=>{const nav=a.hash;const selected=nav==='#missions'&&!game&&mode==='home'||nav==='#progress'&&hash==='#progress'||nav==='#guide'&&mode==='guide'||nav==='#tools'&&mode==='tools'||nav==='#resources'&&mode==='resources';if(selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if(!game&&['#guide','#tools','#resources','#action'].includes(hash))requestAnimationFrame(()=>$(hash).scrollIntoView({behavior:'instant',block:'start'}));
 }
 window.addEventListener('hashchange',route);route();
 /* Full-guide printing must include every reference view, then restore navigation. */
 let printHidden=null;window.addEventListener('beforeprint',()=>{if(document.body.dataset.print==='summary'||printHidden)return;printHidden=[guide,tools,resources,action,edition].map(el=>[el,el.hidden]);printHidden.forEach(([el])=>el.hidden=false);});window.addEventListener('afterprint',()=>{if(printHidden){printHidden.forEach(([el,hidden])=>el.hidden=hidden);printHidden=null;}});
})();
