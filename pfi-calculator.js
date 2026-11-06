(function () {
  'use strict';
  const $=s=>document.querySelector(s), R=window.PfiCalculatorRules;
  const form=$('#pfi-calc-form'), code=$('#pfi-calc-code'), frequency=$('#pfi-calc-frequency'), output=$('#pfi-calc-result');
  const money=n=>new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(n);
  for(const group of ['Late','Absence','Undertime']) {
    const optgroup=document.createElement('optgroup');optgroup.label=group;
    for(const [id,info] of Object.entries(R.codes).filter(([,v])=>v.group===group)) {
      const option=document.createElement('option');option.value=id;option.textContent=id+' — '+info.detail;optgroup.append(option);
    }
    code.append(optgroup);
  }
  function clearResult(message='Choose your details, then calculate.') {
    output.classList.remove('has-result');
    output.innerHTML='<span class="pfi-result-icon" aria-hidden="true">₱</span><span class="tool-kicker">YOUR REFERENCE ESTIMATE</span><h4>See what the sheet shows.</h4><p>'+message+'</p><div class="pfi-result-footer">One code · one frequency · one clear answer</div>';
  }
  function updateDetails() {
    const info=R.codes[code.value];
    frequency.max=info?info.max:13;
    $('#pfi-frequency-help').textContent=info?'Frequency means occurrence number. The '+code.value+' table shows 1–'+info.max+'. Use the number confirmed in your record.':'Frequency means occurrence number. Choose a code to see its supported range.';
    $('#pfi-code-help').textContent=info?info.detail+'. INFO means the information given about your attendance.':'Use the code in your attendance record. Do not choose by minutes alone.';
    $('#pfi-frequency-down').disabled=Number(frequency.value)<=1;
    $('#pfi-frequency-up').disabled=Number(frequency.value)>=Number(frequency.max);
    clearResult('Details changed. Select Calculate deduction to update your estimate.');
    $('#pfi-calc-error').textContent='';
    form.querySelectorAll('[aria-invalid]').forEach(input=>input.removeAttribute('aria-invalid'));
  }
  function render(result) {
    output.classList.add('has-result');
    const info=R.codes[result.code], charged=result.deduction>0;
    output.innerHTML=`<span class="tool-kicker">DEDUCTION FOR THIS OCCURRENCE</span><p class="pfi-result-amount">${money(result.deduction)}</p><p class="pfi-result-selection">${result.code} · Level ${result.level} · Frequency ${result.frequency}</p><div class="pfi-result-explain"><strong>${charged?'Deduction starts at frequency '+result.startsAt+'.':'No PFI deduction in this frequency cell.'}</strong><p>${charged?'This occurrence is charged '+money(result.rate)+'.':'The sheet begins charging '+money(result.rate)+' at frequency '+result.startsAt+'.'}</p></div><div class="pfi-frequency-strip" aria-label="${result.code} frequency reference">${Array.from({length:info.max},(_,i)=>`<span class="${i+1===result.frequency?'is-current ':''}${i<info.free?'is-free':'is-charged'}" aria-label="Frequency ${i+1}: ${i<info.free?'no PFI deduction':money(result.rate)}${i+1===result.frequency?', selected':''}">${i+1}</span>`).join('')}</div><p class="pfi-strip-key"><span>○ No PFI deduction</span><span>● Charged frequency</span></p><p class="pfi-cell-note">Source: frequency matrix, rows ${info.row}–${info.row+3}; rate table W${info.rateRow}:AB${info.rateRow+3}.</p>`;
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const level=form.querySelector('[name="pfi-calc-level"]:checked');
    const result=R.calculate({code:code.value,level:level?Number(level.value):null,frequency:frequency.value===''?null:Number(frequency.value)});
    if(result.error) {
      const messages={code:'Choose the attendance code from your record.',level:'Choose your confirmed PFI level.',frequency:'Enter a whole frequency from 1 to '+frequency.max+'. Later blank cells are not calculated.'};
      $('#pfi-calc-error').textContent=messages[result.error];clearResult('Check the input named in the message before calculating.');
      const target=result.error==='code'?code:result.error==='level'?form.querySelector('[name="pfi-calc-level"]'):frequency;target.setAttribute('aria-invalid','true');target.focus();return;
    }
    $('#pfi-calc-error').textContent='';render(result);
  });
  form.addEventListener('input',updateDetails);form.addEventListener('change',updateDetails);
  for(const [id,delta] of [['#pfi-frequency-down',-1],['#pfi-frequency-up',1]]) $(id).addEventListener('click',()=>{
    const value=Number(frequency.value)||1;frequency.value=String(Math.max(1,Math.min(Number(frequency.max),value+delta)));updateDetails();
  });
  form.addEventListener('reset',()=>{requestAnimationFrame(()=>{updateDetails();clearResult();$('#pfi-calc-error').textContent='';code.focus();});});
  function route(){if(location.hash==='#pfi-calculator'){$('#tool-tab-calculator').click();requestAnimationFrame(()=>$('#tools').scrollIntoView({behavior:'instant',block:'start'}));}}
  window.addEventListener('hashchange',route);route();clearResult();
})();
