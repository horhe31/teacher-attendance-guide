/* Intent: help a teacher find and apply the source rules with low effort.
   Same paper/ink/blue palette, layered-card depth, Segoe UI/Arial typography,
   and 8px spacing system as styles.css. Motion explains state; it never hides content. */
(function () {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const content = window.GuideContent;
  const rules = window.GuideRules;
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = value => '₱' + Number(value).toLocaleString('en-PH', { maximumFractionDigits: 2 });
  const chapterIds = ['pfi', 'ati', 'ranking'];
  const chapterNames = { pfi: 'PFI Deduction', ati: 'Attendance Incentive', ranking: 'Monthly Ranking', action: 'Teacher action guide', intro: 'Overview' };
  const chapterInfo = {
    pfi: { text: 'PFI uses an attendance issue code to work out a peso deduction.', facts: [['Who','Active Cebu teachers in BFC and ITP'],['Cutoff','26th–25th'],['Starts','September 2026 review months'],['Daily rule','Highest LVL code only']] },
    ati: { text: 'ATI means Attendance Incentive. Qualified months advance through six payout amounts.', facts: [['Monthly','₱1,000–₱2,500'],['Biannual','₱2,000'],['Annual','₱3,000'],['Cycle resets','January and July']] },
    ranking: { text: 'Your attendance score starts at 30.00 points. Higher scores rank higher; equal scores share the rank.', facts: [['Formula','30.00 − attendance deductions'],['Minimum','0.00 points'],['Cutoff','Previous 26th–current 25th'],['Example','30 − 2.50 − 1.00 = 26.50']] }
  };
  const state = { chapter: 'pfi', read: [], motionOff: false, storage: true };
  const storageKey = 'teacher-field-guide-2026-v1';
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    state.read = Array.isArray(saved.read) ? saved.read.filter(id => chapterIds.includes(id)) : [];
    state.motionOff = saved.motionOff === true;
  } catch { state.storage = false; }
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify({read: state.read, motionOff: state.motionOff})); }
    catch { state.storage = false; $('#reading-help').textContent = 'Personal progress · available for this visit only'; }
  }
  function announce(message) { $('#site-status').textContent = message; }
  function callout(text, label='REMEMBER') { return `<div class="callout"><strong>${e(label)}</strong><p>${e(text)}</p></div>`; }
  function topic(section, index) {
    const cards = section.cards?.length ? `<div class="rule-cards">${section.cards.map(card => `<div class="rule-card">${card.title ? `<h4>${e(card.title)}</h4>` : ''}<p>${e(card.body)}</p></div>`).join('')}</div>` : '';
    const list = section.list ? `<ol class="rule-list">${section.list.map(text => `<li>${e(text)}</li>`).join('')}</ol>` : '';
    return `<details class="rule-topic" id="topic-${section.id}" ${index===0?'open':''}><summary><span class="topic-index">${String(index+1).padStart(2,'0')}</span><span class="topic-title">${e(section.title)}</span><span class="topic-chevron" aria-hidden="true">+</span></summary><div class="topic-body">${section.sub?`<p class="topic-sub">${e(section.sub)}</p>`:''}${cards}${list}${section.key?callout(section.key,section.label||'KEY NOTE'):''}<p class="source-note">Source section ${e(section.src)}${section.noteText ? ` · ${e(section.noteText)}` : ''}</p></div></details>`;
  }
  function renderChapters() {
    $('#chapter-panels').innerHTML = chapterIds.map(id => {
      const sections = content.sections.filter(s => s.chapter===id);
      const info = chapterInfo[id];
      const first = sections[0];
      const definitions = id==='pfi' ? '<p class="source-note">LVL = attendance issue code. Gross PFI = amount setting the deduction class.</p>' : '';
      return `<section class="chapter-panel" id="chapter-${id}" role="tabpanel" aria-labelledby="tab-${id}" ${id!=='pfi'?'hidden':''}><div class="chapter-intro"><div><span class="tool-kicker">CHAPTER ${String(chapterIds.indexOf(id)+1).padStart(2,'0')}</span><h3 tabindex="-1">${e(chapterNames[id])}</h3><p class="intro-text">${e(info.text)}</p>${definitions}</div><div class="chapter-facts">${info.facts.map(([label,value])=>`<div><span class="fact-label">${e(label)}</span><span class="fact-value">${e(value)}</span></div>`).join('')}</div>${callout(first.key)}</div>${sections.map(topic).join('')}<div class="read-control"><p>Finished this chapter? Keep your place for next time.</p><button class="read-button" data-read="${id}" aria-pressed="false">Mark chapter as read</button></div></section>`;
    }).join('');
    $$('.rule-topic').forEach(details => details.addEventListener('toggle', () => {
      if (details.open && !state.motionOff && !preference.matches) $('.topic-body',details).animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});
      syncExpandButton();
    }));
    $$('[data-read]').forEach(button=>button.addEventListener('click',()=>{
      const id=button.dataset.read;
      state.read = state.read.includes(id) ? state.read.filter(x=>x!==id) : [...state.read,id];
      save(); updateProgress(); announce(`${chapterNames[id]} ${state.read.includes(id)?'marked as read':'marked as unread'}.`);
    }));
  }
  function syncExpandButton() {
    const items=$$('.rule-topic',$('#chapter-'+state.chapter));
    $('#expand-topics').textContent=items.every(item=>item.open)?'Collapse topics':'Expand topics';
  }
  function setChapter(id,{hash=true,scroll=false,focus=false}={}) {
    if (!chapterIds.includes(id)) return;
    state.chapter=id;
    $$('[data-chapter]').forEach(button=>{ const selected=button.dataset.chapter===id;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1; });
    $$('.chapter-panel').forEach(panel=>panel.hidden=panel.id!=='chapter-'+id);
    const panel=$('#chapter-'+id);
    panel.classList.remove('panel-enter'); void panel.offsetWidth; panel.classList.add('panel-enter');
    if(hash) { try { history.replaceState(null,'','#chapter-'+id); } catch { /* File previews can restrict history; navigation still works. */ } }
    if(scroll) $('#guide').scrollIntoView({behavior:state.motionOff||preference.matches?'auto':'smooth'});
    if(focus) $('h3',panel).focus({preventScroll:true});
    syncExpandButton();
  }
  function updateProgress() {
    $('#reading-count').textContent=`${state.read.length} of 3 chapters read`;
    $('#reading-fill').style.transform=`scaleX(${state.read.length/3})`;
    if(!state.storage) $('#reading-help').textContent='Personal progress · available for this visit only';
    chapterIds.forEach(id=>{
      const read=state.read.includes(id);
      const button=$(`[data-read="${id}"]`);
      button.setAttribute('aria-pressed',String(read));button.textContent=read?'✓ Chapter read · undo':'Mark chapter as read';
      $('.chapter-read',$(`[data-chapter="${id}"]`)).textContent=read?'✓':'';
      $(`[data-chapter="${id}"]`).setAttribute('aria-label',`${chapterNames[id]}${read?', read':''}`);
    });
  }
  function wireTabs(buttons,onSelect) {
    buttons.forEach((button,index)=>button.addEventListener('keydown',event=>{
      let target;
      if(event.key==='ArrowRight') target=(index+1)%buttons.length;
      if(event.key==='ArrowLeft') target=(index-1+buttons.length)%buttons.length;
      if(event.key==='Home') target=0;
      if(event.key==='End') target=buttons.length-1;
      if(target!==undefined) {event.preventDefault();buttons[target].focus();onSelect(buttons[target]);}
    }));
  }
  function search() {
    const query=$('#rule-search').value.trim().toLocaleLowerCase();
    const area=$('#search-results');area.hidden=!query;
    if(!query) { $('#search-matches').replaceChildren();return; }
    const words=query.split(/\s+/);
    const matches=content.sections.filter(s=>words.every(word=>[s.title,s.sub,s.key,...(s.list||[]),...(s.cards||[]).flatMap(c=>[c.title,c.body])].join(' ').toLocaleLowerCase().includes(word)));
    $('#search-status').textContent=`${matches.length} ${matches.length===1?'topic':'topics'} found across the guide`;
    $('#search-matches').innerHTML=matches.length?matches.map(s=>`<button class="search-hit" data-result="${s.id}"><small>${e(chapterNames[s.chapter])}</small><strong>${e(s.title)}</strong></button>`).join(''):'<div class="empty-state"><strong>No matching rule found.</strong><p>Try a shorter phrase, such as “leave”, “L1”, or “deadline”.</p></div>';
    $$('[data-result]').forEach(button=>button.addEventListener('click',()=>{
      const section=content.sections.find(s=>s.id===Number(button.dataset.result));
      $('#rule-search').value=''; search();
      if(chapterIds.includes(section.chapter)) {
        setChapter(section.chapter,{scroll:false});const details=$('#topic-'+section.id);details.open=true;details.scrollIntoView({behavior:'auto',block:'start'});$('summary',details).focus({preventScroll:true});
      } else {const target=section.chapter==='intro'?$('#guide'):$('#action');target.scrollIntoView({behavior:'auto'});const heading=$('h2',target);heading.tabIndex=-1;heading.focus({preventScroll:true});}
    }));
  }
  function renderDeadline() {
    const portal=$('input[name="deadline-portal"]:checked').value;
    const input=$('#event-date');
    const result=rules.deadlineFor(portal,input.value);
    if(result.error) {
      const outside=result.error==='outside';
      $('#deadline-result').innerHTML=`<div class="result-error"><span class="result-label">${outside?'OUTSIDE THIS SOURCE WINDOW':'CHOOSE A DATE'}</span><h4>${outside?'This date is not covered.':'Enter a valid attendance date.'}</h4><p>${outside?(portal==='pfi'?'The source covers September 26–November 30, 2026 for this PFI correction guide.':'Only November 2026 attendance issues are open in this source.'): 'Choose a date using the attendance date field.'}</p></div>`;
      input.setAttribute('aria-invalid',String(!outside));return;
    }
    input.setAttribute('aria-invalid','false');
    const formatted=new Intl.DateTimeFormat('en-PH',{month:'long',day:'numeric',timeZone:'UTC'}).format(new Date(result.date+'T00:00:00Z'));
    $('#deadline-result').innerHTML=`<span class="result-label">${e(chapterNames[portal].toUpperCase())} · FILE BY</span><p class="deadline-day">${e(formatted)}<span class="sr-only">, 2026</span></p><p class="deadline-time">2026 · 11:59 PM Philippine time</p><p class="deadline-reason">${e(result.reason)}</p>${result.afterCap?'<p class="after-cap">This attendance date is after the filing cap. The window has already ended for this date.</p>':''}`;
  }
  function renderRate() {
    const input=$('#gross-pfi');const value=input.value;const result=rules.pfiClass(value);
    input.setAttribute('aria-invalid',String(value!==''&&!result));
    if(!result) { $('#rate-result').innerHTML=`<div class="rate-empty"><span aria-hidden="true">₱</span><h4>${value===''?'Your class appears here.':'Use a valid amount.'}</h4><p>${value===''?'Enter Gross PFI to see the three code-group rates.':'Enter zero or a positive Gross PFI amount.'}</p></div>`;return; }
    $('#rate-result').innerHTML=`<span class="result-label">GROSS PFI DEDUCTION CLASS</span><p class="rate-class">Class ${result.level}</p><p class="rate-band">${e(result.band)}</p>${result.amounts.map((value,i)=>`<div class="rate-line"><span>${['A1 / U1 / U2','A2 / U3','A3 / U4'][i]}</span><strong>${money(value)}</strong></div>`).join('')}<p class="source-note">Reference amounts before any applicable immunity. Fixed late amounts use their own rules.</p>`;
  }
  function renderAti() {
    const scenario=$('input[name="ati-scenario"]:checked').value;const example=rules.atiExample(scenario);
    $('#ati-result').innerHTML=`<span class="result-label">${scenario==='incomplete'?'DATA INCOMPLETE':'AUGUST → OCTOBER · SOURCE EXAMPLE'}</span><div class="ati-chart">${example.values.map(value=>`<div class="ati-column"><span class="ati-value">${money(value)}</span><span class="ati-bar ${value===0?'is-zero':''}" style="height:${Math.max(4,value/2500*190)}px" aria-hidden="true"></span></div>`).join('')}</div><div class="ati-labels">${example.labels.map(label=>`<span>${e(label)}</span>`).join('')}</div><p class="ati-note">${e(example.note)}</p>`;
  }
  function setTool(id) {
    $$('[data-tool]').forEach(button=>{const active=button.dataset.tool===id;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
    $$('.tool-panel').forEach(panel=>panel.hidden=panel.id!=='tool-'+id);
    const panel=$('#tool-'+id);panel.classList.remove('panel-enter');void panel.offsetWidth;panel.classList.add('panel-enter');
  }
  function updateMotion() {
    const off=state.motionOff||preference.matches;
    document.body.dataset.motion=off?'off':'on';document.documentElement.dataset.motion=off?'off':'on';
    const button=$('#motion-toggle');button.setAttribute('aria-pressed',String(off));button.disabled=preference.matches;
    button.setAttribute('aria-label',preference.matches?'Animations are off because of your device preference':off?'Turn on animations':'Turn off animations');
    button.title=button.getAttribute('aria-label');$('.motion-word',button).textContent=off?'Motion off':'Motion on';
    if(off) $('#record-stack').style.transform='';
  }
  renderChapters(); updateProgress(); renderDeadline(); renderRate(); renderAti(); updateMotion();
  $$('[data-chapter]').forEach(button=>button.addEventListener('click',()=>setChapter(button.dataset.chapter)));
  wireTabs($$('[data-chapter]'),button=>setChapter(button.dataset.chapter));
  $$('[data-chapter-link]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();setChapter(link.dataset.chapterLink,{scroll:true,focus:true});}));
  if(chapterIds.includes(location.hash.replace('#chapter-',''))) setChapter(location.hash.replace('#chapter-',''),{hash:false});
  window.addEventListener('hashchange',()=>{const id=location.hash.replace('#chapter-','');if(chapterIds.includes(id))setChapter(id,{hash:false});});
  $('#expand-topics').addEventListener('click',()=>{const items=$$('.rule-topic',$('#chapter-'+state.chapter));const open=!items.every(item=>item.open);items.forEach(item=>item.open=open);syncExpandButton();});
  $('#rule-search').addEventListener('input',search);
  $('#clear-search').addEventListener('click',()=>{$('#rule-search').value='';search();$('#rule-search').focus();});
  $('#reset-progress').addEventListener('click',()=>{state.read=[];save();updateProgress();announce('Reading progress reset.');});
  $$('[name="deadline-portal"]').forEach(input=>input.addEventListener('change',renderDeadline));
  $('#event-date').addEventListener('input',renderDeadline);$('#event-date').addEventListener('change',renderDeadline);
  $('#gross-pfi').addEventListener('input',renderRate);
  $$('[name="ati-scenario"]').forEach(input=>input.addEventListener('change',renderAti));
  $$('[data-tool]').forEach(button=>button.addEventListener('click',()=>setTool(button.dataset.tool)));
  wireTabs($$('[data-tool]'),button=>setTool(button.dataset.tool));
  $$('#correction-checklist input').forEach(input=>input.addEventListener('change',()=>{
    const count=$$('#correction-checklist input:checked').length;$('#checklist-status').textContent=`${count} of 5 steps checked${count===5?' · Checklist complete':''}`;
  }));
  $('#motion-toggle').addEventListener('click',()=>{state.motionOff=!state.motionOff;save();updateMotion();});
  preference.addEventListener('change',updateMotion);
  $('#menu-toggle').addEventListener('click',()=>{const button=$('#menu-toggle');const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu');$('#mobile-menu').hidden=!open;});
  function closeMenu(){ $('#mobile-menu').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Open menu'); }
  $$('#mobile-menu a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#mobile-menu').hidden){closeMenu();$('#menu-toggle').focus();}});
  window.matchMedia('(min-width: 801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
  let printState=[];
  window.addEventListener('beforeprint',()=>{printState=$$('.rule-topic').map(item=>item.open);$$('.rule-topic').forEach(item=>item.open=true);});
  window.addEventListener('afterprint',()=>{$$('.rule-topic').forEach((item,index)=>item.open=printState[index]??false);syncExpandButton();});
  $('#print-guide').addEventListener('click',()=>window.print());
  if('IntersectionObserver' in window) {const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.15});$$('.reveal').forEach(item=>observer.observe(item));}
  const scene=$('#record-scene');const stack=$('#record-stack');let frame=0;
  scene.addEventListener('pointermove',event=>{
    if(state.motionOff||preference.matches||event.pointerType!=='mouse')return;
    const rect=scene.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;
    cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{stack.style.transform=`rotateX(${-y*5}deg) rotateY(${x*6}deg)`;});
  });
  scene.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);stack.style.transform='';});
})();
