const {test}=require('node:test');
const assert=require('node:assert/strict');
const core=require('../quest-core.js');
const missions=[{id:'first',cards:[{id:'a'},{id:'b'}],questions:[{id:'q1',type:'choice',answer:'yes'},{id:'q2',type:'order',answer:['one','two','three']}]}];
test('a stamp requires every card and both correct questions; duplicate visits do not count twice',()=>{
 const s=core.restore(null,missions);core.visit(s,missions[0],'a');core.visit(s,missions[0],'a');
 assert.equal(core.answer(s,missions[0],missions[0].questions[0],'no'),false);
 assert.equal(core.answer(s,missions[0],missions[0].questions[0],'yes'),true);
 core.answer(s,missions[0],missions[0].questions[1],['one','two','three']);
 assert.equal(core.complete(s,missions[0]),false);core.visit(s,missions[0],'b');
 assert.equal(core.complete(s,missions[0]),true);assert.ok(s.missions.first.completedAt);
 const date=s.missions.first.completedAt;core.answer(s,missions[0],missions[0].questions[0],'no');
 assert.equal(core.complete(s,missions[0]),true);assert.equal(s.missions.first.completedAt,date);
});
test('ordered and matched answers reject missing, duplicate, reversed and extra selections',()=>{
 const q={type:'match',answer:['a','b','c']};
 for(const bad of [[],['a','a','c'],['c','b','a'],['a','b','c','d'],null])assert.equal(core.correct(q,bad),false);
 assert.equal(core.correct(q,['a','b','c']),true);
});
test('restore sanitizes invalid data and cannot manufacture a completion stamp',()=>{
 const raw={version:1,last:'bad',missions:{first:{visited:['a','bad','a'],correct:['q1'],position:999,completedAt:'2026-11-05'}}};
 const s=core.restore(JSON.stringify(raw),missions);assert.deepEqual(s.missions.first.visited,['a']);
 assert.equal(s.missions.first.completedAt,null);assert.equal(s.last,null);assert.equal(s.missions.first.position,0);
 assert.throws(()=>core.restore('{',missions));assert.throws(()=>core.restore('{"version":999}',missions));
});
test('save and resume preserves a finished mission and its original completion date',()=>{
 const s=core.restore(null,missions);for(const c of missions[0].cards)core.visit(s,missions[0],c.id);
 for(const q of missions[0].questions)core.answer(s,missions[0],q,q.answer);
 core.complete(s,missions[0]);s.last='first';s.missions.first.position=2;
 const restored=core.restore(JSON.stringify(s),missions);assert.equal(restored.last,'first');
 assert.equal(restored.missions.first.position,2);assert.equal(restored.missions.first.completedAt,s.missions.first.completedAt);
});
test('Philippine completion date rolls forward across UTC midnight boundary',()=>{
 assert.equal(core.phDate('2026-11-05T17:00:00.000Z'),'November 6, 2026');
});
test('practice score counts unique correct questions and stays separate from attendance scores',()=>{
 const s=core.restore(null,missions);core.answer(s,missions[0],missions[0].questions[0],'no');
 assert.deepEqual(core.summary(s,missions),{completed:0,correct:0,total:2});
 core.answer(s,missions[0],missions[0].questions[0],'yes');core.answer(s,missions[0],missions[0].questions[0],'yes');
 assert.equal(core.summary(s,missions).correct,1);
});
test('game reset clears the mission position, score, last mission and stamps',()=>{
 const s=core.restore(null,missions);core.visit(s,missions[0],'a');core.answer(s,missions[0],missions[0].questions[0],'yes');s.last='first';
 const reset=core.reset();assert.deepEqual(reset,{version:1,last:null,missions:{}});
 assert.deepEqual(core.summary(reset,missions),{completed:0,correct:0,total:2});assert.equal(s.last,'first');
});
