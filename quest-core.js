/* Personal learning state only. Attendance calculations remain in rules.js. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.QuestCore=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const version=1;
 function blank(){return {version,last:null,missions:{}};}
 function record(state,mission){return state.missions[mission.id]||(state.missions[mission.id]={position:0,visited:[],correct:[],completedAt:null});}
 function ready(r,m){return m.cards.every(c=>r.visited.includes(c.id))&&m.questions.every(q=>r.correct.includes(q.id));}
 function restore(raw,missions){
  const state=blank();if(!raw)return state;
  const saved=JSON.parse(raw);if(!saved||saved.version!==version||!saved.missions||typeof saved.missions!=='object')throw Error('Invalid progress');
  state.last=missions.some(m=>m.id===saved.last)?saved.last:null;
  for(const m of missions){const old=saved.missions[m.id];if(!old||typeof old!=='object')continue;const r=record(state,m);
   r.visited=m.cards.filter(c=>Array.isArray(old.visited)&&old.visited.includes(c.id)).map(c=>c.id);
   r.correct=m.questions.filter(q=>Array.isArray(old.correct)&&old.correct.includes(q.id)).map(q=>q.id);
   r.position=Number.isInteger(old.position)&&old.position>=0&&old.position<=m.cards.length+m.questions.length+1?old.position:0;
   if(ready(r,m)&&typeof old.completedAt==='string'&&Number.isFinite(Date.parse(old.completedAt)))r.completedAt=old.completedAt;
  }return state;
 }
 function correct(q,value){return q.type==='choice'?typeof value==='string'&&value===q.answer:Array.isArray(value)&&Array.isArray(q.answer)&&value.length===q.answer.length&&value.every((x,i)=>x===q.answer[i]);}
 function visit(s,m,id){const r=record(s,m);if(m.cards.some(c=>c.id===id)&&!r.visited.includes(id))r.visited.push(id);}
 function answer(s,m,q,value){const ok=correct(q,value);if(ok){const r=record(s,m);if(!r.correct.includes(q.id))r.correct.push(q.id);}return ok;}
 function complete(s,m){const r=record(s,m);if(!r.completedAt&&ready(r,m))r.completedAt=new Date().toISOString();return !!r.completedAt;}
 function phDate(date){return new Intl.DateTimeFormat('en-PH',{month:'long',day:'numeric',year:'numeric',timeZone:'Asia/Manila'}).format(new Date(date));}
 function summary(state,missions){return {completed:missions.filter(m=>state.missions[m.id]?.completedAt).length,correct:missions.reduce((n,m)=>n+m.questions.filter(q=>state.missions[m.id]?.correct?.includes(q.id)).length,0),total:missions.reduce((n,m)=>n+m.questions.length,0)};}
 return {version,restore,record,correct,visit,answer,complete,phDate,summary,reset:blank};
});
