(function(){
 'use strict';
 const M=window.PfiMethod,$=s=>document.querySelector(s),e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const root=$('#pfi-method-content');let active='process';
 const cards=items=>'<div class="method-cards">'+items.map(([title,body])=>'<article class="method-card"><h5>'+e(title)+'</h5><p>'+e(body)+'</p></article>').join('')+'</div>';
 function originalTable(index){
  const table=M.tables[index],headers=table[0];
  return '<details class="method-original"><summary>Read the complete portal wording · '+e(M.sections.find(s=>s.tables.includes(index)).label)+'</summary><div class="method-source-rows">'+table.slice(1).map(row=>'<article class="method-source-row">'+row.map((value,i)=>'<div><span>'+e(headers[i])+'</span><p>'+e(value)+'</p></div>').join('')+'</article>').join('')+'</div></details>';
 }
 root.innerHTML=`<div class="method-topic-nav" role="group" aria-label="Live PFI method topics">${M.sections.map((s,i)=>`<button type="button" data-method-topic="${s.id}" aria-pressed="${i===0}" aria-controls="method-${s.id}"><small>0${i+1}</small>${e(s.label)}</button>`).join('')}</div><div class="method-search-row"><label for="pfi-method-search">Find a portal rule<input id="pfi-method-search" type="search" placeholder="Try U1, mixed codes, leave, or schedule…" autocomplete="off" aria-controls="method-search-results"></label><button type="button" id="method-search-clear" class="text-button">Clear search</button></div><div id="method-search-results" hidden><p id="method-search-status" role="status"></p><div id="method-search-hits"></div></div><div id="method-topics">${M.sections.map((s,i)=>`<section id="method-${s.id}" class="method-topic" ${i?'hidden':''} aria-labelledby="method-heading-${s.id}"><p class="method-position">TOPIC ${i+1} OF 6</p><h4 id="method-heading-${s.id}" tabindex="-1">${e(s.title)}</h4><p class="method-intro">${e(s.intro)}</p>${s.id==='process'?cards(M.scope.map(([title,value,note])=>[title,value+'. '+note])):''}${cards(s.cards)}<div class="method-key"><strong>KEY NOTE</strong><p>${e(s.key)}</p></div>${s.id==='codes'?'<div class="method-interactive"><label for="method-code-picker">Look up a live portal code</label><select id="method-code-picker">'+M.tables[2].slice(1).map(row=>'<option value="'+e(row[1])+'">'+e(row[1]+' · '+row[0])+'</option>').join('')+'</select><div id="method-code-detail" role="status" aria-live="polite"></div></div>':''}${s.id==='immunity'?'<div class="method-interactive"><label for="method-pattern-picker">Which codes are in the cutoff?</label><select id="method-pattern-picker"><option value="mixed">Two or more different LVL codes</option><option value="L1">Only L1</option><option value="L2">Only L2</option><option value="L3">Only L3</option></select><div id="method-pattern-result" role="status" aria-live="polite"></div></div><details class="method-original method-leave"><summary>See all 13 approved full-day leave types</summary><ul>'+M.leaveTypes.map(t=>'<li>'+e(t)+'</li>').join('')+'</ul></details>':''}${s.id==='rates'?'<div class="method-cards method-rate-cards">'+M.tables[4].slice(1).map(row=>'<article class="method-card"><h5>'+e(row[0])+'</h5><p class="method-band">'+e(row[1])+'</p><dl>'+[2,3,4].map(j=>'<div><dt>'+e(M.tables[4][0][j])+'</dt><dd>'+e(row[j])+'</dd></div>').join('')+'</dl></article>').join('')+'</div>':''}${s.notes.length?'<div class="method-notes">'+s.notes.map(n=>'<p>'+e(n)+'</p>').join('')+'</div>':''}${s.id==='dates'?cards(M.corrections):''}${s.tables.map(originalTable).join('')}</section>`).join('')}</div><div class="method-pager"><button class="text-button" type="button" id="method-back">← Back</button><p id="method-position" role="status">1 / 6 · Process</p><button class="button primary" type="button" id="method-next">Next topic →</button></div>`;
 function updatePager(){const index=M.sections.findIndex(s=>s.id===active);$('#method-back').disabled=index===0;$('#method-next').disabled=index===M.sections.length-1;$('#method-position').textContent=(index+1)+' / 6 · '+M.sections[index].label;}
 function show(id,focus=false){
  if(!M.sections.some(s=>s.id===id))id='process';active=id;
  $('#pfi-method-search').value='';$('#method-search-results').hidden=true;$('#method-topics').hidden=false;$('.method-pager').hidden=false;
  document.querySelectorAll('[data-method-topic]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.methodTopic===id)));
  M.sections.forEach(s=>$('#method-'+s.id).hidden=s.id!==id);updatePager();if(focus)$('#method-heading-'+id).focus({preventScroll:false});
 }
 document.querySelectorAll('[data-method-topic]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.methodTopic)));
 for(const [selector,delta] of [['#method-back',-1],['#method-next',1]])$(selector).addEventListener('click',()=>{const index=M.sections.findIndex(s=>s.id===active),next=M.sections[index+delta];if(next)show(next.id,true);});
 function codeLookup(){const row=M.tables[2].find(r=>r[1]===$('#method-code-picker').value);$('#method-code-detail').innerHTML='<h5>'+e(row[1])+' · '+e(row[0])+'</h5><p>'+e(row[2])+'</p><p><strong>Information:</strong> '+e(row[3])+'</p><p><strong>Rate:</strong> '+e(row[4])+'</p>';}
 function patternLookup(){const row=M.immunityFor($('#method-pattern-picker').value);$('#method-pattern-result').innerHTML='<h5>'+e(row[1])+'</h5><p>'+e(row[2])+'</p><small>Apply approved full-day leave and ATI rules in the stated order. This lookup does not add an extra free occurrence.</small>';}
 $('#method-code-picker').addEventListener('change',codeLookup);$('#method-pattern-picker').addEventListener('change',patternLookup);codeLookup();patternLookup();updatePager();
 $('#pfi-method-search').addEventListener('input',()=>{
  const query=$('#pfi-method-search').value.trim();if(!query){show(active);return;}
  const matches=M.search(query);$('#method-search-results').hidden=false;$('#method-topics').hidden=true;$('.method-pager').hidden=true;
  $('#method-search-status').textContent=matches.length+' '+(matches.length===1?'topic':'topics')+' found in the live portal reference.';
  $('#method-search-hits').innerHTML=matches.length?matches.map(s=>'<button type="button" class="method-search-hit" data-method-hit="'+s.id+'"><small>LIVE PORTAL · '+e(M.readDate)+'</small><strong>'+e(s.title)+'</strong><span>'+e(s.intro)+'</span></button>').join(''):'<p>No match. Try a code, leave type, or shorter phrase.</p>';
  document.querySelectorAll('[data-method-hit]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.methodHit,true)));
 });
 $('#method-search-clear').addEventListener('click',()=>{show(active);$('#pfi-method-search').focus();});
 function route(){const match=location.hash.match(/^#pfi-method(?:-([a-z]+))?$/);if(!match)return;$('#tool-tab-method').click();show(match[1]||'process');requestAnimationFrame(()=>$('#tools').scrollIntoView({behavior:'instant',block:'start'}));}
 window.addEventListener('hashchange',route);route();
 // A user can change tool tabs without changing the URL. Activate same-hash
 // source links explicitly, because the browser will not emit hashchange.
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');if(!link)return;const hash=link.getAttribute('href');
  if(hash!==location.hash)return;
  if(/^#pfi-method(?:-[a-z]+)?$/.test(hash)){event.preventDefault();route();}
  else if(hash==='#pfi-calculator'){event.preventDefault();$('#tool-tab-calculator').click();$('#tools').scrollIntoView({behavior:'instant',block:'start'});}
 });
 let printDetails=[],printHidden=null;
 window.addEventListener('beforeprint',()=>{if(document.body.dataset.print==='summary'||printHidden)return;printHidden=[$('#tool-method'),$('#method-topics'),...root.querySelectorAll('.method-topic')].map(el=>[el,el.hidden]);printHidden.forEach(([el])=>el.hidden=false);printDetails=Array.from(root.querySelectorAll('details')).map(el=>[el,el.open]);printDetails.forEach(([el])=>el.open=true);});
 window.addEventListener('afterprint',()=>{printDetails.forEach(([el,open])=>el.open=open);printDetails=[];if(printHidden){printHidden.forEach(([el,hidden])=>el.hidden=hidden);printHidden=null;}});
})();
