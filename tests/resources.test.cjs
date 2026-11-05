const {test}=require('node:test');
const assert=require('node:assert/strict');
const resources=require('../resources-content.js');
test('resource search finds overtime labels and individual FAQ wording',()=>{
 assert.deepEqual(resources.search('RDOT uninformed').map(r=>r.id),['overtime']);
 assert.deepEqual(resources.search('payslip').map(r=>r.id),['faq']);
 assert.equal(resources.search('Sick Leave','ranking').some(r=>r.id==='ranking-reference'),true);
 assert.deepEqual(resources.search('<img src=x onerror=alert(1)>'),[]);
});
test('historical amounts remain tagged as 2023 rather than a current calculator',()=>{
 const r=resources.items.find(r=>r.id==='payroll-2023');
 assert.equal(r.edition,'October 2023 example');
 assert.match(r.note,/not current pay rates/i);
 assert.deepEqual(r.tables[1].rows.map(r=>r[4]),['468','234','468','9.75','4.86','468']);
});
test('ambiguous screenshot symbols and point units are explicitly flagged',()=>{
 assert.match(resources.items.find(r=>r.id==='incentives').note,/no legend/i);
 const faq=resources.items.find(r=>r.id==='faq');
 assert.match(faq.note,/PFI points/);
 assert.equal(faq.faqs.length,11);
 assert.equal(faq.faqs.filter(f=>f.caution).length,3);
});
