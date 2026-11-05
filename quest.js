(function(){
 'use strict';
 const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>Array.from(p.querySelectorAll(s));
 const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const {missions,edition}=window.QuestContent,C=window.QuestCore;
 const key='teacher-quest-nov2026-v1';
 const stages=[{id:'start',title:'Start here',description:'Know which portal does what.',ids:['portals']},{id:'pfi',title:'PFI deductions',description:'Check your record, codes, amounts, and exemptions.',ids:['record','codes','lateness','amount','exemptions','pfi-correction']},{id:'ati',title:'ATI rewards',description:'Understand rewards, leave, and filing windows.',ids:['ati-rewards','ati-leave']},{id:'ranking',title:'Monthly Ranking',description:'Understand attendance points and leave rules.',ids:['ranking-points','ranking-leave']},{id:'corrections',title:'Prepare a correction',description:'Bring the right details. Follow the five steps.',ids:['correction']}];
 let stageFilter='all',resetTrigger=null;
 let state,storage=true,storageMessage='',current=null,selection=null,feedback=null,name='',lastRoute='';
 try{state=C.restore(localStorage.getItem(key),missions);}
 catch{state=C.restore(null,missions);storage=false;storageMessage='Progress cannot be saved. You can keep learning during this visit. Existing saved data was not changed.';}
 if(storage){try{localStorage.setItem(key,JSON.stringify(state));}catch{storage=false;storageMessage='Progress cannot be saved. Your earlier progress is loaded for this visit.';}}
 const refs=Array.from($('#top').children).filter(el=>!['quest-home','missions','quest-player','progress'].includes(el.id));
 function save(){if(!storage)return;try{localStorage.setItem(key,JSON.stringify(state));}catch{storage=false;storageMessage='Progress cannot be saved. Keep this page open to continue during this visit.';updateHome();}}
 function completed(){return missions.filter(m=>C.record(state,m).completedAt);}
 function nextMission(){return missions.find(m=>!C.record(state,m).completedAt)||missions[0];}
 function notice(message){$('#site-status').textContent='';requestAnimationFrame(()=>$('#site-status').textContent=message);}
 function updateHome(){
  const done=completed(),next=state.last&&missions.find(m=>m.id===state.last&&!C.record(state,m).completedAt)||nextMission();
  const started=missions.some(m=>C.record(state,m).visited.length||C.record(state,m).correct.length);
  $('#quest-start').href='#mission-'+next.id;$('#quest-start').innerHTML=`${done.length===12?'Review your missions':started?'Continue your mission':'Start learning'} <span aria-hidden="true">→</span>`;
  $('#passport-count').textContent=`${done.length} / 12`;
  $('#quest-score').textContent=`${C.summary(state,missions).correct} / 24`;
  $('#passport-stamps').innerHTML=missions.map((m,i)=>`<span class="${C.record(state,m).completedAt?'stamped':''}" aria-label="Mission ${i+1}${C.record(state,m).completedAt?' complete':' not completed'}">${C.record(state,m).completedAt?'✓':String(i+1).padStart(2,'0')}</span>`).join('');
  $('#quest-storage').textContent=storage?'Personal progress · saved only on this device.':storageMessage;$('#quest-storage').classList.toggle('warning',!storage);
  $('#mission-path').innerHTML=stages.filter(g=>stageFilter==='all'||g.id===stageFilter).map(g=>`<section class="quest-stage stage-${g.id}" aria-labelledby="stage-${g.id}-heading"><div class="stage-heading"><span class="stage-index">${String(stages.indexOf(g)+1).padStart(2,'0')}</span><div><h3 id="stage-${g.id}-heading">${g.title}</h3><p>${g.description}</p></div><span class="stage-mission-count">${g.ids.length} ${g.ids.length===1?'mission':'missions'}</span></div><div class="stage-cards">${missions.filter(m=>g.ids.includes(m.id)).map(m=>{const i=missions.indexOf(m),r=C.record(state,m),done=!!r.completedAt,recommended=!done&&m.id===nextMission().id;return `<a class="mission-checkpoint ${done?'done':''} ${recommended?'recommended':''}" href="#mission-${m.id}" aria-label="Mission ${i+1}: ${e(m.title)}. ${done?'Completed':recommended?'Recommended next':'Available'}"><div class="mission-topline"><span class="mission-number">${done?'✓':String(i+1).padStart(2,'0')}</span><span class="mission-state">${done?'✓ Stamp collected':recommended?'Start here':r.visited.length?'In progress':'Explore mission'}</span></div><h3>${e(m.title)}</h3><span class="mission-foot"><span>${m.cards.length} rule cards · 2 questions</span><span class="mission-arrow" aria-hidden="true">↗</span></span></a>`;}).join('')}</div></section>`).join('');
 }
 function sourceLink(id,label='Read the rule'){return `<a href="#rule-${id}" data-source="${id}">${e(label)} <span aria-hidden="true">↗</span></a>`;}
 function sources(ids){return `<div class="quest-source">${ids.map(id=>{const s=GuideContent.sections.find(s=>s.id===id);return sourceLink(id,'Source '+s.src);}).join('')}</div>`;}
 function go(position){if(!current)return;C.record(state,current).position=position;selection=null;feedback=null;save();renderPlayer(true);}
 function button(label,action,primary=false,disabled=false){return `<button class="quest-button ${primary?'primary':''}" data-quest="${action}" ${disabled?'disabled':''}>${label}</button>`;}
 function renderPlayer(focus=false){
  const m=current,r=C.record(state,m),n=m.cards.length,p=r.position,total=n+4;
  let body='',controls='';
  if(p===0){body=`<p class="eyebrow">MISSION ${String(missions.indexOf(m)+1).padStart(2,'0')} / 12</p><h2 id="quest-heading" tabindex="-1">${e(m.title)}</h2><p class="quest-reading">${e(m.intro)}</p><ul class="quest-reading-list"><li>Read ${n} short rule cards.</li><li>Try two practice questions. Retry whenever you need.</li><li>Collect your mission stamp.</li></ul><div class="quest-callout"><strong>REMEMBER</strong>All missions are open. This is personal learning progress.</div>`;controls=`<a class="quest-button" href="#missions">Mission map</a>${button(r.visited.length?'Continue reading →':'Begin mission →','next',true)}`;}
  else if(p<=n){const card=m.cards[p-1];C.visit(state,m,card.id);save();body=`<p class="eyebrow">RULE CARD ${p} OF ${n}</p><h2 id="quest-heading" tabindex="-1">${e(card.title==='Remember'?m.title:card.title)}</h2>${card.kind==='key'?`<div class="quest-callout"><strong>REMEMBER</strong><p class="quest-reading">${e(card.body)}</p></div>`:`<p class="quest-reading">${e(card.body)}</p>`}${sources(card.sources)}`;controls=`${button('← Back','back')}${button(p===n?'Try a question →':'Next →','next',true)}`;}
  else if(p<=n+2){const q=m.questions[p-n-1];body=renderQuestion(q,p-n);controls=`${button('← Back','back')}${feedback?.ok?button('Continue →','next',true):feedback?button('Try again','retry',true):button('Check answer','submit',true,!selectionReady(q))}`;}
  else{const wasDone=!!r.completedAt;const done=C.complete(state,m);save();updateHome();const all=completed().length===12;body=`<div class="quest-stamp" aria-label="${done?'Mission completed':'Keep learning'}">${done?'✓<br>MISSION<br>COMPLETE':'KEEP<br>LEARNING'}</div>${all?'<div class="quest-celebrate" aria-hidden="true">✦ <span>✧</span> ✦ <span>✧</span></div>':''}<p class="eyebrow">${done?'STAMP COLLECTED':'FINISH THE RULE CARDS AND QUESTIONS'}</p><h2 id="quest-heading" tabindex="-1">${all?'Your passport is complete.':done?'One more rule made clear.':'A little more to explore.'}</h2><p class="quest-recap">${e(m.title)}</p><ul class="quest-reading-list">${m.recap.map(text=>`<li>${e(text)}</li>`).join('')}</ul><div class="quest-callout"><strong>REMEMBER</strong>Completion means personal learning progress. It does not certify official attendance compliance.</div>`;controls=`${button('Review mission','replay')}${done?(all?'<a class="quest-button primary" href="#progress">View my summary →</a>':`<a class="quest-button primary" href="#mission-${nextMission().id}">Next mission →</a>`):button('Return to cards','replay',true)}`;if(done&&!wasDone)notice(`Mission ${missions.indexOf(m)+1} completed. Stamp collected. ${completed().length} of 12 missions completed.`);}
  $('#quest-player').innerHTML=`<div class="quest-topbar"><a href="#missions">← Mission map</a><span>Mission ${missions.indexOf(m)+1} / 12 · Step ${p+1} / ${total}</span><a href="#progress">My progress</a></div><div class="quest-meter" aria-label="Mission step ${p+1} of ${total}"><span style="width:${(p+1)/total*100}%"></span></div><article class="quest-sheet ${p>n+2?'quest-complete':''}">${body}</article><div class="quest-controls">${controls}</div>`;
  if(focus){$('#quest-heading').focus({preventScroll:true});$('#quest-player').scrollIntoView({behavior:'auto',block:'start'});}
 }
 function selectionReady(q){return q.type==='choice'?typeof selection==='string':Array.isArray(selection)&&selection.length===q.options.length&&selection.every(Boolean);}
 function renderQuestion(q,index){
  let choices='';const locked=!!feedback;
  if(q.type==='choice')choices=`<div class="quest-choices" role="group" aria-label="Answer choices">${q.options.map((o,i)=>`<button class="quest-choice" data-choice="${o.id}" aria-pressed="${selection===o.id}" ${locked?'disabled':''}><span class="choice-marker" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${e(o.label)}</span></button>`).join('')}</div>`;
  if(q.type==='match')choices=`<p class="quest-practice-note">Choose one match for each row. Use each answer once.</p>${q.options.map((o,i)=>`<div class="match-row" role="group" aria-label="Match ${e(o.label)}"><h3>${e(o.label)}</h3><div class="match-buttons">${q.pairs.map(pair=>`<button data-match-row="${i}" data-match="${pair.id}" aria-pressed="${selection?.[i]===pair.id}" ${locked?'disabled':''}>${e(pair.label)}</button>`).join('')}</div></div>`).join('')}`;
  if(q.type==='order')choices=`<p class="quest-practice-note">Tap the steps in order. No dragging needed.</p><div class="order-selection" aria-live="polite">${selection?.length?`<ol>${selection.map(id=>`<li>${e(q.options.find(o=>o.id===id).label)}</li>`).join('')}</ol>`:'Your ordered steps will appear here.'}</div><div class="quest-choices">${q.options.map(o=>`<button class="quest-choice" data-order="${o.id}" ${locked||selection?.includes(o.id)?'disabled':''}><span class="choice-marker" aria-hidden="true">${selection?.includes(o.id)?'✓':'+'}</span>${e(o.label)}</button>`).join('')}</div>${!locked?`<button class="text-button" data-quest="clear-order">Clear order</button>`:''}`;
  return `<p class="eyebrow">PRACTICE ${index} OF 2 · ${q.type==='match'?'TAP TO MATCH':q.type==='order'?'TAP IN ORDER':'CHOOSE ONE'}</p><h2 id="quest-heading" tabindex="-1">${e(q.prompt.replace(/^Practice:\s*/,''))}</h2><p class="quest-practice-note">Practice activity. Incorrect choices are practice distractors.</p>${choices}${feedback?`<div class="quest-feedback ${feedback.ok?'correct':''}" tabindex="-1" id="quest-feedback" role="status"><h3>${feedback.ok?'✓ Correct':'↻ Let’s review'}</h3><p>${e(q.explanation)}</p>${sourceLink(q.sources[0])}</div>`:`<details class="quest-hint"><summary>Need a hint? Read the rule</summary><p>${e(q.explanation)}</p>${sourceLink(q.sources[0])}</details>`}`;
 }
 function renderProgress(focus=false){
  const done=completed(),all=done.length===12;
  $('#progress').innerHTML=`<div class="quest-topbar"><a href="#missions">← Mission map</a><span>YOUR LEARNING PASSPORT</span></div><div class="quest-sheet"><p class="eyebrow">MY PROGRESS</p><h2 id="progress-heading" tabindex="-1">${all?'Twelve stamps. Well done.':'Every small step counts.'}</h2><p class="progress-total"><strong>${done.length} of 12</strong> missions completed</p><p class="quest-summary-note">${storage?'Progress is saved only on this device.':e(storageMessage)} Chapter reading bookmarks are separate.</p><ul class="progress-stamps">${missions.map((m,i)=>`<li class="${C.record(state,m).completedAt?'done':''}"><span aria-hidden="true">${C.record(state,m).completedAt?'✓':String(i+1).padStart(2,'0')}</span><a href="#mission-${m.id}">${e(m.title)}</a><span class="sr-only">${C.record(state,m).completedAt?'Completed':'Not completed'}</span></li>`).join('')}</ul>${all?`<div class="quest-summary-form"><h3>Personal learning completion summary</h3><p class="quest-summary-note">Download a single-page image, or print / save as PDF.</p><label for="summary-name">Teacher name (optional)</label><input id="summary-name" maxlength="60" autocomplete="off" value="${e(name)}" placeholder="Your name"><small>Kept in memory only. Cleared when this page reloads.</small><div class="summary-actions">${button('Download my summary ↓','download',true)}${button('Print / save as PDF','print')}</div><p class="quest-summary-note">${e(edition)} policy edition · Completed ${e(C.phDate(completionDate()))} (Philippine time).<br>Completion is recorded on your device and is not independently verified.</p></div>`:`<div class="quest-callout"><strong>YOUR SUMMARY</strong>Complete all 12 missions to unlock your download.</div><div class="summary-actions"><a class="quest-button primary" href="#mission-${nextMission().id}">Continue learning →</a></div>`}<details class="quest-reset"><summary>Reset my mission progress</summary><p>This clears mission positions and stamps on this device. Reading bookmarks and motion preferences stay as they are.</p>${button('Clear mission progress','reset')}</details></div>`;
  const total=C.summary(state,missions);$('.progress-total').insertAdjacentHTML('afterend',`<p class="progress-score">Practice score <strong>${total.correct} / ${total.total}</strong> questions learned</p><p class="quest-summary-note">A learning score only. This is separate from official attendance or ranking scores.</p><div class="summary-actions"><button class="reset-game" data-quest="reset">↺ Reset game &amp; score</button><a class="quest-button" href="assets/Teacher-Quest-Complete-Guide.pdf" download>Download the full guide PDF ↓</a></div>`);
  if(focus){$('#progress-heading').focus({preventScroll:true});$('#progress').scrollIntoView({behavior:'auto'});}
 }
 function completionDate(){return completed().map(m=>C.record(state,m).completedAt).sort().at(-1);}
 function route(){
  const hash=location.hash,m=missions.find(m=>hash==='#mission-'+m.id),isProgress=hash==='#progress',inGame=!!m||isProgress;
  $('#quest-home').hidden=inGame;$('#missions').hidden=inGame;$('#quest-player').hidden=!m;$('#progress').hidden=!isProgress;
  refs.forEach(el=>el.hidden=inGame);
  if(m){current=m;state.last=m.id;selection=null;feedback=null;save();renderPlayer(true);}
  else if(isProgress)renderProgress(true);
  else{current=null;updateHome();if(hash==='#missions'&&lastRoute!==hash)$('#missions-heading').focus({preventScroll:true});}
  lastRoute=hash;
  const source=hash.match(/^#rule-(\d+)$/);if(source)openSource(Number(source[1]));
 }
 function openSource(id){
  const source=GuideContent.sections.find(s=>s.id===id);if(!source)return;
  if(source.chapter==='intro'){const details=$('#topic-'+id);if(details){details.open=true;details.scrollIntoView({behavior:'auto',block:'start'});$('summary',details).focus({preventScroll:true});}return;}
  const tab=$('[data-chapter="'+source.chapter+'"]');
  if(tab){tab.click();const details=$('#topic-'+id);details.open=true;details.scrollIntoView({behavior:'auto',block:'start'});$('summary',details).focus({preventScroll:true});}
  else{const target=source.chapter==='action'?$('#action'):$('#guide');target.scrollIntoView({behavior:'auto'});const heading=$('h2',target);heading.tabIndex=-1;heading.focus({preventScroll:true});}
 }
 function redrawAnswers(q,focusedSelector){
  renderPlayer(false);if(focusedSelector)$(focusedSelector,$('#quest-player'))?.focus({preventScroll:true});
 }
 document.addEventListener('click',event=>{
  const source=event.target.closest('[data-source]');if(source){event.preventDefault();location.hash='rule-'+source.dataset.source;return;}
  const action=event.target.closest('[data-quest]');
  if(action){const a=action.dataset.quest;if(action.disabled)return;
   if(a==='reset'){resetTrigger=action;$('#game-reset-dialog').showModal();return;}
   if(a==='confirm-reset'){state=C.reset();current=null;selection=null;feedback=null;name='';$('#summary-print')?.remove();delete document.body.dataset.print;save();$('#game-reset-dialog').close('reset');updateHome();if(location.hash==='#progress')renderProgress(true);else if(location.hash.startsWith('#mission-'))location.hash='missions';notice('Game and practice score reset. Zero missions completed.');return;}
   if(a==='download'){downloadSummary().catch(()=>notice('The image could not be downloaded. Use Print / save as PDF instead.'));return;}
   if(a==='print'){printSummary();return;}
   if(!current)return;const r=C.record(state,current),q=current.questions[r.position-current.cards.length-1];
   if(a==='next')go(r.position+1);if(a==='back')go(Math.max(0,r.position-1));if(a==='replay')go(0);
   if(a==='retry'){selection=null;feedback=null;renderPlayer(true);}
   if(a==='clear-order'){selection=[];redrawAnswers(q,'[data-order]');}
   if(a==='submit'&&q&&!feedback&&selectionReady(q)){const ok=C.answer(state,current,q,selection);feedback={ok};save();updateHome();renderPlayer(false);$('#quest-feedback').focus({preventScroll:true});notice(ok?'Correct. Select Continue when you are ready.':'Let’s review. Read the explanation, then try again.');}
   return;
  }
  if(!current||feedback)return;const r=C.record(state,current),q=current.questions[r.position-current.cards.length-1];if(!q)return;
  const choice=event.target.closest('[data-choice]');if(choice){selection=choice.dataset.choice;redrawAnswers(q,'[data-choice="'+selection+'"]');}
  const match=event.target.closest('[data-match]');if(match){if(!Array.isArray(selection))selection=Array(q.options.length).fill(null);const row=Number(match.dataset.matchRow);selection=selection.map((v,i)=>i!==row&&v===match.dataset.match?null:v);selection[row]=match.dataset.match;redrawAnswers(q,'[data-match-row="'+row+'"][data-match="'+match.dataset.match+'"]');}
  const order=event.target.closest('[data-order]');if(order&&!order.disabled){selection=[...(selection||[]),order.dataset.order];redrawAnswers(q,selection.length===q.options.length?'[data-quest="submit"]':'[data-order]:not(:disabled)');}
 });
 document.addEventListener('input',event=>{if(event.target.id==='summary-name')name=event.target.value;});
 document.addEventListener('click',event=>{const b=event.target.closest('[data-stage]');if(!b)return;stageFilter=b.dataset.stage;if(!['all',...stages.map(s=>s.id)].includes(stageFilter))stageFilter='all';$$('.stage-filters [data-stage]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.stage===stageFilter)));updateHome();if(b.classList.contains('world-button')){location.hash='missions';$('#missions-heading').focus({preventScroll:true});$('#missions').scrollIntoView({behavior:document.body.dataset.motion==='off'?'instant':'smooth'});}notice(stageFilter==='all'?'All 12 missions shown.':stages.find(s=>s.id===stageFilter).title+' missions shown.');});
 $('#game-reset-dialog').addEventListener('close',()=>{if(resetTrigger?.isConnected)resetTrigger.focus({preventScroll:true});else if(location.hash==='#progress')$('#progress-heading')?.focus({preventScroll:true});resetTrigger=null;});
 function summaryLines(){return ['Personal learning completion summary',name.trim()||'Teacher Quest learner',`12 of 12 missions completed · ${C.phDate(completionDate())}`,`Policy edition: ${edition}`,location.origin+location.pathname];}
 async function downloadSummary(){
  if(completed().length!==12)return;const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1600;const ctx=canvas.getContext('2d');
  ctx.fillStyle='#f7f8fc';ctx.fillRect(0,0,1200,1600);ctx.fillStyle='#172a45';ctx.fillRect(0,0,1200,300);ctx.fillStyle='#fff';ctx.font='bold 22px Arial';ctx.fillText('TEACHER QUEST  /  LEARNING PASSPORT',64,70);
  wrapText(ctx,'Personal learning completion summary',64,130,1070,56,'bold 49px Arial');
  ctx.fillStyle='#172a45';wrapText(ctx,name.trim()||'Teacher Quest learner',64,370,1070,44,'bold 34px Arial');
  ctx.font='25px Arial';ctx.fillText('12 of 12 missions completed',64,445);ctx.fillText(C.phDate(completionDate())+' · Philippine time',64,490);
  missions.forEach((m,i)=>{const y=555+i*61;ctx.fillStyle='#176348';ctx.beginPath();ctx.arc(82,y-7,16,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 20px Arial';ctx.fillText('✓',74,y);ctx.fillStyle='#172a45';ctx.font='25px Arial';ctx.fillText(String(i+1).padStart(2,'0')+'  '+m.title,116,y);});
  ctx.fillStyle='#42536c';ctx.font='24px Arial';ctx.fillText('Policy edition: '+edition,64,1330);wrapText(ctx,location.origin+location.pathname,64,1380,1070,32,'22px Arial');wrapText(ctx,'Personal device progress. Not independently verified. This summary does not certify official attendance compliance.',64,1460,1070,32,'22px Arial');
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('PNG unavailable');const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Teacher-Quest-Learning-Summary.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notice('Your personal learning summary is ready.');
 }
 function wrapText(ctx,text,x,y,maxWidth,lineHeight,font){ctx.font=font;let line='';for(const word of text.split(/\s+/).flatMap(word=>{if(ctx.measureText(word).width<=maxWidth)return [word];let chunks=[],chunk='';for(const char of word){if(ctx.measureText(chunk+char).width>maxWidth){chunks.push(chunk);chunk='';}chunk+=char;}return [...chunks,chunk];})){const candidate=line?line+' '+word:word;if(ctx.measureText(candidate).width>maxWidth&&line){ctx.fillText(line,x,y);y+=lineHeight;line=word;}else line=candidate;}ctx.fillText(line,x,y);return y;}
 function printSummary(){if(completed().length!==12)return;let target=$('#summary-print');if(!target){target=document.createElement('section');target.id='summary-print';target.className='summary-print';$('#top').append(target);}const lines=summaryLines();target.innerHTML=`<p>TEACHER QUEST / LEARNING PASSPORT</p><h1>${e(lines[0])}</h1><h2>${e(lines[1])}</h2><p>${e(lines[2])} · Philippine time</p><ul>${missions.map((m,i)=>`<li>✓ ${i+1}. ${e(m.title)}</li>`).join('')}</ul><p>${e(lines[3])}</p><p class="print-url">${e(lines[4])}</p><p>Completion is recorded on your device and is not independently verified. This summary does not certify official attendance compliance.</p>`;document.body.dataset.print='summary';window.print();}
 window.addEventListener('afterprint',()=>delete document.body.dataset.print);
 $('#print-guide').addEventListener('click',()=>delete document.body.dataset.print,true);
 window.addEventListener('hashchange',route);updateHome();route();
})();
