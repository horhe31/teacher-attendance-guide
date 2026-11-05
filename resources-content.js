/* User-supplied screenshots: supplementary references, not replacements for GuideContent. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.TeacherResources=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const items=[
  {id:'incentives',category:'incentives',title:'Incentives at a glance',edition:'Undated screenshot',image:'assets/resources/incentive-overview.jpg',width:1280,height:752,
   summary:'Compare the symbols shown for attendance issues across four incentives.',
   note:'The screenshot has no legend explaining the check and cross symbols. They are copied below as symbols only. A PFI check does not establish that there is no peso deduction. Use the reviewed rules for eligibility, exemptions, and amounts.',
   related:[2,3,20,21,24],
   tables:[{caption:'Symbols exactly as shown in the supplied image',headers:['Attendance issue','ATI (Attendance Incentive)','PFI (Performance Incentive)','Biannual Perfect Attendance','Annual Perfect Attendance'],rows:[
    ['Absent with INFO','Cross ✕','Check ✓','Cross ✕','Cross ✕'],['Absent without INFO','Cross ✕','Check ✓','Cross ✕','Cross ✕'],['Late with INFO','Cross ✕','Check ✓','Cross ✕','Cross ✕'],['Late without INFO','Cross ✕','Check ✓','Cross ✕','Cross ✕'],['Pre/Post undertime with INFO','Cross ✕','Check ✓','Cross ✕','Cross ✕'],['Pre/Post undertime without INFO','Cross ✕','Check ✓','Cross ✕','Cross ✕']]}]},
  {id:'payroll-2023',category:'pay',title:'Pay and cutoff worked example',edition:'October 2023 example',image:'assets/resources/payroll-example-2023.jpg',width:1490,height:600,
   summary:'See how the supplied example separates payroll, ATI, and PFI amounts.',
   note:'Historical teaching example: these are not current pay rates. The dates and amounts are copied from October 2023. Do not use them to calculate November 2026 pay, PFI, or filing deadlines. The image shows ₱4.86 for the five-minute late example; it is retained as shown.',
   related:[3,12,18,21,25,26,31],
   facts:[['Daily pay shown','₱468.00'],['Hourly pay shown','₱58.50'],['PFI classification shown','2 · ₱6,435.00']],
   tables:[{caption:'Cutoffs shown in the 2023 image',headers:['Item','Cutoff in the example'],rows:[['Payroll · 14th pay','23rd–8th'],['Payroll · 29th pay','9th–22nd'],['PFI','26th–25th'],['ATI','23rd–22nd']]},
   {caption:'Original 2023 example amounts — deductions as labeled in the image',headers:['Date','Status','Reason','Remarks','Payroll (₱)','ATI','PFI (₱)'],rows:[
    ['10/10/2023','Absent','Dysmenorrhea','With medical certificate','468','0','0'],['11/10/2023','Pre-undertime (4 hours)','Dysmenorrhea','—','234','0','0'],['25/10/2023','Absent','Process important documents','—','468','0','800'],['26/10/2023','Late (10 minutes)','No INFO','—','9.75','0','0'],['27/10/2023','Late (5 minutes)','No INFO','—','4.86','0','350'],['31/10/2023','Absent','Go back to hometown','—','468','0','800']]},
   {caption:'Cutoff columns shown at the right of the image',headers:['Row / group','Payroll cutoff amount','PFI cutoff amount','Pay label'],rows:[['October 10–11','702','Blank','Oct. 29th PAY'],['October 25','468','800','Nov. 14th PAY'],['October 26','9.75','0','Nov. 14th PAY'],['October 27','4.86','350','Nov. 14th PAY'],['October 31','468','800','Nov. 14th PAY']]}]},
  {id:'ranking-reference',category:'ranking',title:'Attendance points reference',edition:'Undated screenshot',image:'assets/resources/attendance-points.jpg',width:925,height:502,
   summary:'Read the absence, late, and undertime point values in the supplied reference.',
   note:'The basic point values match the reviewed Cebu ranking table. The screenshot also lists “Post Undertime (severe condition)” under no deduction, but does not define the condition or approval requirements. Check the reviewed leave rules before applying an exemption.',
   related:[28,29,30],
   tables:[{caption:'Point deductions shown in the supplied image',headers:['Record','Deduction shown'],rows:[['Absence without INFO','−3 points'],['Absence with INFO','−2.5 points'],['SIL used as Sick Leave (SL)','−1.5 points'],['Late with INFO','−1 point'],['Late without INFO','−1 point'],['Pre-undertime','−2 points'],['Post-undertime','−1.5 points']]}],
   lists:[{title:'Listed under “Others (no deduction)”',items:['Sick Leave','Planned Absences (filed 25 days)','Bereavement Leave','Indefinite Leave','Emergency/Calamity Leave','Post Undertime (severe condition)']}]
  },
  {id:'overtime',category:'overtime',title:'OT attendance deductions',edition:'Undated screenshot · scope unconfirmed',image:'assets/resources/ot-attendance-deductions.png',width:519,height:482,
   summary:'Keep the seven OT/RDOT entries together as an extra reference.',
   note:'The image does not define OT, REG OT, or RDOT. It also does not state the deduction unit, effective date, or which score it affects. These values are shown as supplied and are not used by the calculators or mission answers. The image gives no rule for a duration between 4 and 5 hours.',
   related:[],
   tables:[{caption:'OT attendance deduction entries — unit not stated in image',headers:['Entry as supplied','Deduct'],rows:[['OT/RDOT Late','1'],['REG OT informed · 4 hours or less','1.5'],['REG OT uninformed · 4 hours or less','2.0'],['REG OT informed · 5 hours or more','2.0'],['REG OT uninformed · 5 hours or more','2.5'],['RDOT informed','2.5'],['RDOT uninformed','3.0']]}]
  },
  {id:'faq',category:'faq',title:'Teacher questions and answers',edition:'Undated FAQ screenshot',image:'assets/resources/teacher-faq.jpg',width:1840,height:1908,
   summary:'Find short answers about leave, pay, corrections, and ranking.',
   note:'This FAQ uses “PFI points” and “Attendance PFI base deduction.” Their relationship to the reviewed guide’s peso-based PFI and ranking points is unconfirmed. The three affected answers are flagged below. Keep the reviewed guide as the rule for current calculations.',
   related:[8,16,17,24,26,28,29,30,32],
   faqs:[
    {question:'I filed a Planned Absence. What happens?',answer:'The supplied FAQ says no ATI is issued. It says PFI and the sanction remain safe, but no basic pay is provided for the days covered by Planned Absence. It also says there is no Monthly Ranking deduction.',note:'The screenshot does not state the leave approval or advance-filing conditions. Check those in the reviewed guide.',related:[16,17,24,29,30]},
    {question:'I filed AWC for my absence. What happens?',answer:'AWC means Absence with Certificate. The FAQ says it waives the attendance sanction and prevents ATI. No basic pay is provided. It labels the “Attendance PFI base deduction” as −2.5 points per absence.',caution:'“Attendance PFI base deduction” is the screenshot’s label. Do not treat these points as pesos. AWC alone does not create an approved-leave exemption in the reviewed guide.',related:[8,29]},
    {question:'Why was I deducted for two absence days without an attendance infraction?',answer:'The FAQ gives two cases. Case 1: attendance logs were incomplete and no attendance correction was filed. Case 2: SL or SIL was filed; check the payslip to confirm whether the corresponding pay was credited.',related:[32]},
    {question:'I filed SL. Do I still need a log correction?',answer:'No. The FAQ says not to file a log correction for an absence already properly filed as SL/SIL.'},
    {question:'How much does the FAQ deduct from PFI for Sick Leave?',answer:'It states −1.5 PFI points per day. It says this applies to Sick Leave (SL) and to Service Incentive Leave (SIL) converted to SL.',caution:'The FAQ calls these “PFI points.” The reviewed ranking guide separates qualifying Sick Leave from SIL converted to Sick Leave. Do not apply this screenshot’s value as a current PFI peso amount or as a replacement ranking rule.',related:[28,29,30]},
    {question:'Does AWC waive my PFI deduction?',answer:'No. The FAQ says AWC waives the attendance sanction, while the PFI deduction still applies at −2.5 points per absence.',note:'This repeats the FAQ’s point-based wording; see the flagged AWC answer above.',related:[8,29]},
    {question:'Can I file Sick Leave for undertime?',answer:'Yes. The FAQ says SL may be filed for eligible undertime. It says the applicable base PFI deduction remains −1.5 points.',caution:'“Base PFI deduction” and “points” are the screenshot’s terms. Eligibility conditions and the connection to the reviewed peso-based PFI are not stated.',related:[16,17,29,30]},
    {question:'What happens after a valid student attitude complaint?',answer:'The FAQ says each offense gives a −2-point infraction deduction. It affects the infraction score for one month.',note:'This is an additional infraction reference. It is not added to the attendance calculators.'},
    {question:'How are teachers ranked in Monthly Ranking?',answer:'The FAQ says finalized ranking points and corresponding scores determine the ranking. A higher ranking score does not necessarily mean a higher level; the teacher must also meet that level’s requirements.',related:[26]},
    {question:'Can my Monthly Ranking level change after the initial file?',answer:'Yes. The initial file can change. Adjustments can increase or decrease other teachers’ scores and affect the final ranking level. The supplied example says Teacher 1 may move from Level 1 to Level 2 after finalization, while Teacher 2 may remain Level 3.',related:[26]},
    {question:'After filing HL and SIL, can I still receive the daily minimum wage?',answer:'Yes. The FAQ says eligibility for the daily minimum wage remains, with no Monthly Performance deduction associated with HL/SIL, subject to applicable attendance and payroll rules.',note:'HL is kept as written because this screenshot does not expand it.'}
   ]}
 ];
 function search(query='',category='all'){
  const words=String(query).trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return items.filter(r=>(category==='all'||r.category===category)&&words.every(word=>[r.title,r.edition,r.summary,r.note,...(r.facts||[]).flat(),...(r.tables||[]).flatMap(t=>[t.caption,...t.headers,...t.rows.flat()]),...(r.lists||[]).flatMap(l=>[l.title,...l.items]),...(r.faqs||[]).flatMap(f=>[f.question,f.answer,f.note,f.caution])].join(' ').toLocaleLowerCase().includes(word)));
 }
 return {items,search};
});
