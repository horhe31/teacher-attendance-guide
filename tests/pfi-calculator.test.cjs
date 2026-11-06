const test = require('node:test');
const assert = require('node:assert/strict');
let calc = {};
try { calc = require('../pfi-calculator-rules.js'); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
// Independently transcribed from PFI DEDUCTION.xlsx, G:S frequency matrix and U:AB rates.
const reference = [
  ['L1',4,11,[200,200,200,200]], ['L2',3,12,[200,200,200,200]],
  ['L3',2,13,[250,250,250,250]], ['NIL1',1,13,[350,350,350,350]],
  ['NIL2',1,13,[750,1500,3000,4875]], ['A1',1,13,[300,600,1200,1950]],
  ['A2',1,13,[400,800,1600,2600]], ['A3',1,13,[750,1500,3000,4875]],
  ['U1',2,12,[300,600,1200,1950]], ['U2',1,12,[300,600,1200,1950]],
  ['U3',1,12,[400,800,1600,2600]], ['U4',1,13,[750,1500,3000,4875]]
];
test('calculator exposes a pure calculation function',()=>assert.equal(typeof calc.calculate,'function'));
for (const [code,free,max,rates] of reference) {
  test(`${code}: every displayed frequency and level matches the source matrix`,()=>{
    for(let level=1;level<=4;level++) for(let frequency=1;frequency<=max;frequency++) {
      const r=calc.calculate?.({code,level,frequency});
      assert.equal(r?.deduction,frequency<=free?0:rates[level-1],`${code} level ${level}, frequency ${frequency}`);
      assert.equal(r.rate,rates[level-1]);
      assert.equal(r.startsAt,free+1);
    }
  });
  test(`${code}: blank cells beyond the shown range are not extrapolated`,()=>{
    assert.equal(calc.calculate?.({code,level:1,frequency:max+1})?.error,'frequency');
  });
}
test('unknown codes, invalid levels and invalid frequencies do not return deductions',()=>{
  for(const code of ['', 'XYZ','__proto__','toString']) assert.equal(calc.calculate?.({code,level:1,frequency:2})?.error,'code');
  for(const level of ['',null,0,5,1.5,NaN,Infinity]) assert.equal(calc.calculate?.({code:'A1',level,frequency:2})?.error,'level');
  for(const frequency of ['',null,0,-1,1.5,NaN,Infinity]) assert.equal(calc.calculate?.({code:'A1',level:1,frequency})?.error,'frequency');
});
test('code metadata identifies all 12 codes without a guessed minute classifier',()=>{
  assert.deepEqual(Object.keys(calc.codes||{}),reference.map(x=>x[0]));
  assert.match(calc.codes?.NIL1?.detail||'',/20/);
  assert.match(calc.codes?.NIL2?.detail||'',/30/);
  assert.equal(calc.classifyMinutes,undefined);
});
