const test = require('node:test');
const assert = require('node:assert/strict');
let rules = {};
try { rules = require('../rules.js'); } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }

test('the deadline finder is available', () => assert.equal(typeof rules.deadlineFor, 'function'));
const cases = [
  ['pfi','2026-09-26','2026-11-08'], ['pfi','2026-10-25','2026-11-08'],
  ['pfi','2026-10-26','2026-11-10'], ['pfi','2026-11-05','2026-11-10'],
  ['pfi','2026-11-06','2026-11-11'], ['pfi','2026-11-25','2026-11-30'],
  ['pfi','2026-11-26','2026-11-30'], ['pfi','2026-11-30','2026-11-30'],
  ['ati','2026-11-01','2026-11-10'], ['ati','2026-11-05','2026-11-10'],
  ['ati','2026-11-06','2026-11-11'], ['ati','2026-11-16','2026-11-21'],
  ['ati','2026-11-17','2026-11-21'], ['ati','2026-11-30','2026-11-21'],
  ['ranking','2026-11-01','2026-11-10'], ['ranking','2026-11-05','2026-11-10'],
  ['ranking','2026-11-06','2026-11-11'], ['ranking','2026-11-29','2026-11-30']
];
for (const [portal,date,expected] of cases) test(`${portal}: ${date} → ${expected}`,()=>{
  assert.equal(rules.deadlineFor?.(portal,date)?.date,expected);
});
test('day zero means exactly five calendar days, independent of local time',()=>{
  assert.equal(rules.deadlineFor?.('ranking','2026-11-10')?.date,'2026-11-15');
});
test('dates after ATI cap are clearly identified',()=>{
  assert.equal(rules.deadlineFor?.('ati','2026-11-22')?.afterCap,true);
});
for(const [portal,date] of [['pfi','2026-09-25'],['pfi','2026-12-01'],['ati','2026-10-31'],['ranking','2027-11-01']])
  test(`does not invent policy outside ${portal} source window: ${date}`,()=>assert.equal(rules.deadlineFor?.(portal,date)?.error,'outside'));
for(const date of ['', '2026-11-31','2026-02-30','bad','2026-1-1'])
  test(`invalid date rejected: ${date}`,()=>assert.equal(rules.deadlineFor?.('pfi',date)?.error,'date'));
test('unknown portal rejected',()=>assert.equal(rules.deadlineFor?.('payroll','2026-11-06')?.error,'portal'));
for (const [gross,level,amounts] of [[0,1,[300,400,750]],[3999.99,1,[300,400,750]],[4000,2,[600,800,1500]],[7999.99,2,[600,800,1500]],[8000,3,[1200,1600,3000]],[12999.99,3,[1200,1600,3000]],[13000,4,[1950,2600,4875]]])
  test(`Gross PFI ₱${gross} selects class ${level}`,()=>{
    assert.equal(rules.pfiClass?.(gross)?.level,level);
    assert.deepEqual(rules.pfiClass?.(gross)?.amounts,amounts);
  });
for(const value of ['', -1,Infinity,NaN,'text']) test(`invalid Gross PFI rejected: ${value}`,()=>assert.equal(rules.pfiClass?.(value),null));
test('ATI scenarios preserve the original August–October examples',()=>{
  assert.deepEqual(rules.atiExample?.('qualified').values,[1300,1600,1900]);
  assert.deepEqual(rules.atiExample?.('failed').values,[1300,0,1000]);
  assert.deepEqual(rules.atiExample?.('incomplete').values,[0,1000]);
});
