const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),context);
const source = context.window.GuideContent;
const build = require('../mission-content.js');
const data = build(source);
test('12 missions cover all 33 source sections once',()=>{
 assert.equal(data.missions.length,12);
 assert.deepEqual(data.missions.flatMap(m=>m.sources),Array.from({length:33},(_,i)=>i+2));
});
test('24 practice questions have resolvable answers and source references',()=>{
 const qs=data.missions.flatMap(m=>m.questions); assert.equal(qs.length,24);
 assert.ok(qs.filter(q=>q.type==='match').length>=2); assert.ok(qs.filter(q=>q.type==='order').length>=2);
 for(const m of data.missions){assert.equal(m.questions.length,2); for(const q of m.questions){
 assert.equal(q.practice,true); assert.ok(q.explanation); assert.ok(q.sources.every(s=>m.sources.includes(s)));
 assert.ok(q.options.length>=2&&q.options.length<=3);
 const ids=(q.type==='match'?q.pairs:q.options).map(o=>o.id);
 for(const answer of [].concat(q.answer)) assert.ok(ids.includes(answer));
 }}
});
test('all source teaching text is retained in mission cards',()=>{
 for(const s of source.sections){const m=data.missions.find(m=>m.sources.includes(s.id));
 const text=m.cards.filter(c=>c.sources.includes(s.id)).map(c=>c.title+'\n'+c.body).join('\n');
 for(const fact of [s.sub,s.noteText,s.key,...(s.list||[]),...(s.cards||[]).flatMap(c=>[c.title,c.body])].filter(Boolean)) assert.ok(text.includes(fact),`Missing section ${s.id}: ${fact}`);
 }
});
test('browser and CommonJS share mission data',()=>{
 vm.runInNewContext(fs.readFileSync(path.join(root,'mission-content.js'),'utf8'),context);
 assert.equal(JSON.stringify(context.window.QuestContent),JSON.stringify(data));
});
