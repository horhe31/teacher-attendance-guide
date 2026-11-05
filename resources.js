/* Readable companions to the supplied images; no policy calculations or progress changes. */
(function(){
 'use strict';
 const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>Array.from(p.querySelectorAll(s));
 const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const data=window.TeacherResources;let filter='all';
 const names={incentives:'Incentive overview',pay:'Historical worked example',ranking:'Attendance points',overtime:'OT reference',faq:'Teacher FAQs'};
 const symbols={incentives:'◈',pay:'₱',ranking:'#',overtime:'◷',faq:'?'};
 function reviewed(ids=[]){return ids.length?`<div class="resource-reviewed"><span>CHECK THE REVIEWED GUIDE</span>${ids.map(id=>{const s=GuideContent.sections.find(s=>s.id===id);return s?`<a href="#rule-${id}" data-resource-rule="${id}">${e(s.title)} <span aria-hidden="true">↗</span></a>`:'';}).join('')}</div>`:'';}
 function table(t){return `<div class="resource-table-scroll" tabindex="0" role="region" aria-label="${e(t.caption)}"><table><caption>${e(t.caption)}</caption><thead><tr>${t.headers.map(h=>`<th scope="col">${e(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${e(cell)}</th>`:`<td>${e(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
 function render(){
  const query=$('#resource-search').value,results=data.search(query,filter);
  $('#resource-status').textContent=`${results.length} of 5 resources shown${query.trim()?' · matching “'+query.trim()+'”':''}`;
  $('#resource-list').innerHTML=results.length?results.map(r=>`<details class="extra-resource" id="resource-${r.id}"><summary><span class="resource-symbol" aria-hidden="true">${symbols[r.category]}</span><span class="resource-summary-title"><small>${e(names[r.category])}</small><strong>${e(r.title)}</strong><span>${e(r.summary)}</span></span><span class="resource-edition">${e(r.edition)}</span><span class="resource-chevron" aria-hidden="true">+</span></summary><div class="resource-body"><div class="resource-caution"><strong>${r.id==='payroll-2023'?'HISTORICAL EXAMPLE':r.id==='incentives'||r.id==='overtime'||r.id==='faq'?'CHECK THE CONTEXT':'REMEMBER'}</strong><p>${e(r.note)}</p></div>${r.facts?`<div class="resource-facts">${r.facts.map(([label,value])=>`<div><span>${e(label)}</span><strong>${e(value)}</strong></div>`).join('')}</div>`:''}${(r.tables||[]).map(table).join('')}${(r.lists||[]).map(list=>`<div class="resource-list-block"><h3>${e(list.title)}</h3><ul>${list.items.map(text=>`<li>${e(text)}</li>`).join('')}</ul></div>`).join('')}${r.faqs?`<p class="resource-faq-intro">11 questions · Answers from the supplied FAQ. Open only what you need.</p><div class="resource-faqs">${r.faqs.map((f,i)=>`<details class="resource-faq" id="resource-faq-${i+1}"><summary><span>${String(i+1).padStart(2,'0')}</span><strong>${e(f.question)}</strong><span class="resource-chevron" aria-hidden="true">+</span></summary><div><p class="resource-answer">${e(f.answer)}</p>${f.caution?`<div class="resource-caution"><strong>TERMS NEED CONFIRMATION</strong><p>${e(f.caution)}</p></div>`:''}${f.note?`<p class="resource-detail-note">${e(f.note)}</p>`:''}${reviewed(f.related)}</div></details>`).join('')}</div>`:''}${reviewed(r.related)}<details class="resource-original"><summary>View original screenshot <span aria-hidden="true">↓</span></summary><p><a href="${e(r.image)}" target="_blank" rel="noopener noreferrer">Open full-size image in a new tab ↗</a><a href="${e(r.image)}" download>Download original image ↓</a></p><img src="${e(r.image)}" width="${r.width}" height="${r.height}" loading="lazy" alt="Original supplied screenshot: ${e(r.title)}. The information is transcribed above."></details></div></details>`).join(''):'<div class="resource-empty"><h3>No extra reference found.</h3><p>Try a shorter phrase, or choose All five.</p><button class="quest-button" data-clear-resources>Show all resources</button></div>';
  $$('[data-resource-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.resourceFilter===filter)));
  if(query.trim())$$('.extra-resource').forEach(d=>{d.open=true;$$('.resource-faq',d).forEach(f=>f.open=true);});
 }
 function openResource(id,{focus=true}={}){
  if(!data.items.some(r=>r.id===id))return;
  filter='all';$('#resource-search').value='';render();const target=$('#resource-'+id);target.open=true;
  target.scrollIntoView({behavior:'auto',block:'start'});if(focus)$('summary',target).focus({preventScroll:true});
 }
 function route(){if(location.hash==='#resources'){requestAnimationFrame(()=>$('#resources-heading').scrollIntoView({behavior:'instant',block:'start'}));return;}const match=location.hash.match(/^#resource-(incentives|payroll-2023|ranking-reference|overtime|faq)$/);if(match)openResource(match[1]);}
 function clear(){filter='all';$('#resource-search').value='';render();$('#resource-search').focus({preventScroll:true});}
 $('#resource-search').addEventListener('input',render);$('#resource-clear').addEventListener('click',clear);
 $$('[data-resource-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.resourceFilter;render();}));
 $('#resource-list').addEventListener('click',event=>{if(event.target.closest('[data-clear-resources]'))clear();});
 window.addEventListener('hashchange',route);
 let printState=null;
 window.addEventListener('beforeprint',()=>{if(document.body.dataset.print==='summary'||printState)return;printState={filter,query:$('#resource-search').value,opened:$$('.extra-resource[open],.resource-faq[open]').map(d=>d.id)};filter='all';$('#resource-search').value='';render();$$('.extra-resource,.resource-faq').forEach(d=>d.open=true);});
 window.addEventListener('afterprint',()=>{if(!printState)return;filter=printState.filter;$('#resource-search').value=printState.query;render();$$('.extra-resource,.resource-faq').forEach(d=>d.open=printState.opened.includes(d.id));printState=null;});
 render();route();
})();

