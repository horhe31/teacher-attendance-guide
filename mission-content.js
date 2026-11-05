/* Practice activities derived from GuideContent; source rules remain authoritative. */
(function(root,factory){
 if(typeof module==='object'&&module.exports) module.exports=factory;
 else root.QuestContent=factory(root.GuideContent);
})(typeof window!=='undefined'?window:globalThis,function build(content){
 'use strict';
 if(!content||!Array.isArray(content.sections)) throw new Error('GuideContent must load before mission-content.js');
 const specs=[
 ['portals','Know the three portals',[2,3]],
 ['record','Check your attendance record',[4,5,6]],
 ['codes','Understand attendance codes',[7,8,9]],
 ['lateness','Understand lateness',[10,11]],
 ['amount','Find your PFI amount',[12,13]],
 ['exemptions','Check PFI exemptions',[14,15,16,17]],
 ['pfi-correction','Correct a PFI record',[18,19]],
 ['ati-rewards','Understand ATI rewards',[20,21,22]],
 ['ati-leave','Check ATI leave and deadlines',[23,24,25]],
 ['ranking-points','Understand ranking points',[26,27,28]],
 ['ranking-leave','Check ranking leave and deadlines',[29,30,31]],
 ['correction','Prepare a correction',[32,33,34]]
 ];
 function choice(prompt,labels,answer,explanation,sources){return {type:'choice',prompt:'Practice: '+prompt,options:labels.map((label,i)=>({id:String(i+1),label})),answer:String(answer),explanation,sources,practice:true};}
 function sequence(type,prompt,labels,answer,explanation,sources,pairs){return {type,prompt:'Practice: '+prompt,options:labels.map((label,i)=>({id:String(i+1),label})),answer:answer.map(String),explanation,sources,practice:true,...(pairs?{pairs:pairs.map((label,i)=>({id:String(i+1),label}))}:{})};}
 const qs=[
 [choice('Which portal handles peso deductions?',['PFI Deduction','Monthly Ranking'],1,'PFI handles peso deductions; ranking uses attendance points.',[2]),choice('When Gross PFI is unavailable, what is the applied deduction?',['₱0','Always ₱200'],1,'Applied deduction stays ₱0 until Gross PFI is available.',[3])],
 [sequence('order','Put these record-opening steps in order.',['Open Calculation Method','Enter employee number','Select Open record'],[2,3,1],'Enter the employee number, select Open record, then open Calculation Method.',[4]),choice('For the source 09:00 shift example, when does lateness begin?',['08:50:59 JT','08:51:00 JT'],2,'08:50:59 is latest on time; 08:51:00 begins lateness.',[6])],
 [sequence('match','Match missing work time to its category.',['30 minutes or less','31 minutes–4 hours','More than 4 hours'],[2,3,1],'Up to 30 minutes is treated under lateness; 31 minutes–4 hours is undertime; over 4 hours is absence.',[7],['Absence','Treated under lateness','Undertime']),choice('Which absence code means no valid absence INFO?',['A1','A2','A3'],3,'A3 means no valid absence INFO. AWC alone does not create a leave exemption.',[8])],
 [choice('With valid Late INFO, what is the amount for L3?',['₱200','₱250'],2,'L3 is more than 10 minutes late with valid Late INFO, at ₱250.',[10]),choice('Without valid Late INFO, which code applies over 30 minutes late?',['NIL1','NIL2'],2,'NIL2 uses a class rate for more than 30 minutes late without valid Late INFO.',[11])],
 [choice('In Class 2, what is the A3/U4 amount?',['₱750','₱1,500','₱3,000'],2,'Class 2 Gross PFI is ₱4,000–₱7,999.99; A3/U4 costs ₱1,500.',[12]),choice('In the document example, U3 with Class 4 has what amount before immunity?',['₱2,600','₱1,200'],1,'The source U3 Class 4 example is ₱2,600; immunity may still reduce it.',[13])],
 [sequence('order','Put the PFI exemption checks in order.',['Late-only immunity','Approved full-day leave','ATI immunity'],[2,3,1],'Approved leave comes first, ATI immunity second, and late-only immunity last.',[14]),choice('Which situation gets late-only immunity?',['Mixed LVL codes','Only L1: first 4 incidents'],2,'Only L1 gives the first four incidents no deduction. Mixed codes have no late-only immunity.',[15])],
 [choice('What is the PFI cap for events from November 6 onward?',['November 21, 2026','November 30, 2026'],2,'Use event +5 calendar days or November 30, whichever is earlier, by 11:59 PM Philippine time.',[18]),choice('Where can you track a filed PFI request?',['Corrections Summary','Only the filing button'],1,'Filed requests remain in Corrections Summary with pending, approved, or rejected status.',[19])],
 [choice('What is the maximum monthly ATI step?',['₱2,500','₱3,000'],1,'Step 6 is ₱2,500. Annual ATI is a separate reward.',[20,21]),choice('After a failed or incomplete month, what is the next qualified monthly amount?',['₱1,000','The previous amount plus ₱300'],1,'The next qualified month restarts at ₱1,000.',[22])],
 [choice('What filing timing is required for ATI leave shielding?',['Over 24 days before Correct Start Date','Any time after the attendance date'],1,'Approved leave must be filed over 24 days before Correct Start Date; other conditions also apply.',[23]),choice('What is the November ATI correction cap?',['November 21, 2026','November 30, 2026'],1,'ATI uses the earlier of event +5 calendar days and November 21; November 1–5 issues are due November 10.',[25])],
 [sequence('match','Match Cebu ranking records to deductions.',['Absence with INFO','Post-undertime','Late with INFO'],[3,1,2],'Absence with INFO deducts 2.50, post-undertime 1.50, and late with INFO 1.00.',[28],['1.50 points','1.00 point','2.50 points']),choice('What is 30.00 minus 2.50 minus 1.00?',['26.50','27.50'],1,'The document example finishes at 26.50 attendance points.',[26])],
 [choice('When ranking rules overlap, what is used?',['Lowest valid deduction, with no stacking','All deductions added together'],1,'Overlapping rules use the lowest valid deduction, with no stacking.',[29]),choice('What deduction remains for SIL Converted to Sick Leave?',['0.00 points','1.50 points'],2,'Service Incentive Leave and SIL Converted remain a 1.50-point deduction.',[30])],
 [choice('What should you compare before filing?',['Schedule, valid clock-in, INFO, and approved leave','Only the final amount'],1,'Check the calculation method, cutoff, and attendance evidence before filing.',[32]),choice('Which details should you bring?',['Teacher name, employee number, date, issue, supporting record','Only a teacher name'],1,'The guide lists all five details to support a correction.',[33])]
 ];
 const missions=specs.map(([id,title,sources],index)=>{
 const sections=sources.map(n=>{const s=content.sections.find(s=>s.id===n);if(!s)throw new Error('Missing source section '+n);return s;});
 const cards=sections.flatMap(s=>{
 const make=(suffix,title,body,kind='rule')=>({id:id+'-'+s.id+'-'+suffix,title,body,sources:[s.id],kind});
 return [make('intro',s.title,[s.sub,s.noteText].filter(Boolean).join('\n')),...(s.cards||[]).map((c,i)=>make('card-'+i,c.title||s.title,c.body)),...(s.list||[]).map((text,i)=>make('list-'+i,s.title,text)),...(s.key?[make('key','Remember',s.key,'key')]:[])].filter(c=>c.body);
 });
 return {id,title,intro:'Read the rule cards, then try two practice checks.',sources,cards,questions:qs[index].map((q,i)=>({id:id+'-q'+(i+1),...q})),recap:sections.map(s=>s.key).filter(Boolean)};
 });
 return {edition:'November 2026',missions};
});
