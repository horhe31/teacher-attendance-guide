const test=require('node:test'),assert=require('node:assert/strict');
let method={};try{method=require('../pfi-method-content.js');}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
test('live portal reference has six stable, distinct topics',()=>{
  assert.deepEqual(method.sections?.map(s=>s.id),['process','codes','immunity','rates','dates','evidence']);
  assert.match(method.source||'',/apps\.52cebu\.com\/teacher-attendance-records-next/);
});
test('all seven source tables retain their rows and values',()=>{
  assert.deepEqual(method.tables?.map(t=>t.length-1),[6,10,12,6,4,3,4]);
  assert.match(method.tables?.[1]?.[1]?.[1]||'',/minus 10 minutes.*60 seconds/);
  assert.equal(method.tables?.[4]?.[4]?.[2],'₱4,875');
});
test('live definitions resolve the source-sheet code differences',()=>{
  const rows=method.tables?.[2]||[];
  assert.match(rows.find(r=>r[1]==='NIL1')?.[2]||'',/within 30 minutes/);
  assert.match(rows.find(r=>r[1]==='L3')?.[2]||'',/over-30-minute/);
  assert.match(rows.find(r=>r[1]==='U1')?.[2]||'',/Post-undertime/);
  assert.match(rows.find(r=>r[1]==='U2')?.[2]||'',/Pre-undertime/);
});
test('search finds advanced evidence and payroll rules with source labels',()=>{
  assert.ok(method.search?.('seven distinct schedule')?.some(s=>s.id==='evidence'));
  assert.ok(method.search?.('No PFI Gross')?.some(s=>s.id==='process'));
  assert.ok(method.search?.('Magna Carta')?.some(s=>s.id==='immunity'));
  assert.deepEqual(method.search?.('not-a-real-rule'),[]);
  assert.deepEqual(method.search?.(''),[]);
});
test('leave list includes all 13 portal types and keeps AWC separate',()=>{
  assert.equal(method.leaveTypes?.length,13);
  assert.ok(method.leaveTypes?.includes('Solo Parent Leave (SOL)'));
  assert.match(method.leaveNote||'',/AWC is not a leave exemption/);
});
test('the November deadline cap and source month examples are preserved',()=>{
  assert.equal(method.tables?.[6]?.[4]?.[1],'November 30, 2026');
  assert.deepEqual(method.tables?.[5]?.[3],['January 2027','December 26, 2026','January 25, 2027']);
});
test('single-code late immunity and mixed-code rules remain distinct',()=>{
  assert.equal(method.immunityFor?.('L1')?.[2],'First 4 L1 occurrences have no deduction.');
  assert.equal(method.immunityFor?.('L2')?.[2],'First 3 L2 occurrences have no deduction.');
  assert.equal(method.immunityFor?.('L3')?.[2],'First 2 L3 occurrences have no deduction.');
  assert.match(method.immunityFor?.('mixed')?.[2]||'',/No late immunity/);
  assert.equal(method.immunityFor?.('U1'),null);
});
