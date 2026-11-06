/* Reference: Lark PFI DEDUCTION sheet, read November 6, 2026.
   Separate from the reviewed orientation. Never infer a code from minutes.
   Frequency cells G:S; rates U:AB. Blank cells are not extrapolated. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./rules.js'));
  else root.PfiCalculatorRules = factory(root.GuideRules);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (guide) {
  'use strict';
  const codes = Object.freeze(Object.fromEntries([
    ['L1','Late','With INFO · within 5 minutes',4,11,200,null,5,10],
    ['L2','Late','With INFO · within 10 minutes',3,12,200,null,10,16],
    ['L3','Late','With INFO · within 20 minutes',2,13,250,null,15,22],
    ['NIL1','Late','Without INFO · within 20 minutes',1,13,350,null,20,28],
    ['NIL2','Late','Without INFO · after 30 minutes',1,13,null,2,25,34],
    ['A1','Absence','With INFO · with certificate / valid',1,13,null,0,30,40],
    ['A2','Absence','With INFO · no certificate',1,13,null,1,35,46],
    ['A3','Absence','Without INFO · no certificate',1,13,null,2,40,52],
    ['U1','Undertime','With INFO · valid by manager',2,12,null,0,45,58],
    ['U2','Undertime','With INFO · undertime and on time',1,12,null,0,50,64],
    ['U3','Undertime','With INFO · undertime and late',1,12,null,1,55,70],
    ['U4','Undertime','Without INFO · no certificate',1,13,null,2,60,76]
  ].map(([code,group,detail,free,max,fixed,rateIndex,row,rateRow])=>[code,Object.freeze({group,detail,free,max,fixed,rateIndex,row,rateRow})])));
  const levels = Object.freeze([2000,4000,8000,13000]);
  function calculate(input = {}) {
    const {code,level,frequency}=input;
    if (!Object.hasOwn(codes,code)) return {error:'code'};
    if (!Number.isInteger(level)||level<1||level>4) return {error:'level'};
    const info=codes[code];
    if (!Number.isInteger(frequency)||frequency<1||frequency>info.max) return {error:'frequency'};
    // The four source level examples match existing reviewed peso rates.
    // Reuse those amounts; do not import the orientation's frequency rules.
    const rate=info.fixed??guide.pfiClass(levels[level-1]).amounts[info.rateIndex];
    return {code,level,frequency,rate,deduction:frequency<=info.free?0:rate,startsAt:info.free+1,max:info.max,
      frequencyCell:String.fromCharCode(70+frequency)+(info.row+level-1),rateCell:'W'+(info.rateRow+level-1)};
  }
  return Object.freeze({codes,levels,calculate});
});
