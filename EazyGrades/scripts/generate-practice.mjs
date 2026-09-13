import {chromium} from 'playwright';
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {bank} from '../data/practice-bank.mjs';

// Uses only the source snapshots and original exercises within this project.
const verified=JSON.parse(readFileSync('data/sources/verified-courses.json','utf8'));
const verifiedDate='2026-09-12';
const kinds={mock:'Short mock exam',project:'Project and report practice',reflection:'Reflective learning practice',lab:'Lab preparation practice',seminar:'Seminar analysis practice','topic-template':'Offering-specific practice template'};
const notes={
 mock:'Each PDF contains 2 multipart questions (50 practice marks), space for working, and answer guidance. Selected topics only; not a full-length exam or complete syllabus coverage.',
 project:'Project and report exercises with assessment guidance. The scenario is hypothetical; this is not a prediction of a course exam or an assignment to submit.',
 reflection:'Reflective learning prompts with assessment guidance. Use anonymized experiences; this course is placement-focused, so the sets are not conventional mock exams.',
 lab:'Simulation and lab-planning exercises with answer guidance. Follow your actual supervised lab procedures; this is not a substitute for hands-on assessment.',
 seminar:'Hypothetical seminar-analysis exercises with assessment guidance. These sets do not represent real seminar attendance or reports to submit.',
 'topic-template':'The calendar does not specify a fixed topic. Both PDFs are adaptation templates, not completed topic-specific mock exams. Downloads remain unavailable until the current offering syllabus is supplied and the content is completed.'
};
const featured=['COMP 248','SOEN 287','COMP 352'];
const rank=c=>featured.includes(c.code)?featured.indexOf(c.code):c.code.startsWith('COMP')?10:c.code.startsWith('SOEN')?20:30;
const courses=verified.map(v=>{
 const b=bank[v.code];if(!b)throw Error(`No practice for ${v.code}`);
 for(const product of ['core','advanced'])if(b[product].length!==2||b[product].some(q=>q.length!==2||q.some(t=>typeof t!=='string'||t.length<40)))throw Error(`Incomplete ${v.code}/${product}`);
 return {id:v.id,code:v.code,title:v.title,category:v.code.startsWith('COMP')?'Computer Science':v.code.startsWith('SOEN')?'Software Engineering':'Engineering Core',description:b.description,credits:v.credits,sourceUrl:v.sourceUrl,metadataVerifiedAt:verifiedDate,practiceKind:b.practiceKind,coverageNote:notes[b.practiceKind],published:b.practiceKind!=='topic-template',products:[{id:'core',title:'Core Exam Practice'},{id:'advanced',title:'Advanced Exam Practice'}]};
}).sort((a,b)=>rank(a)-rank(b)||a.code.localeCompare(b.code));
if(new Set(courses.map(c=>c.id)).size!==95||Object.keys(bank).length!==95)throw Error('Unexpected catalog coverage; review source changes.');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const readable=s=>s.replace(/\b(length|load|area|depth|rate|capacity|time|day|factor|value|level|from|through|at|is|gives|givesa|with|for|to|of|by|and|Use|using|pole|size|diameter|speed|density|viscosity|probability|impact|period|mass|force|height|radius)(?=\d)/g,'$1 ');
const paras=s=>escape(readable(s)).split(/(?=\([abc]\) )/).filter(Boolean).map(t=>`<p>${t}</p>`).join('');
const font=readFileSync('public/fonts/dmsans-400.ttf').toString('base64');
const bold=readFileSync('public/fonts/dmsans-600.ttf').toString('base64');
const footer='© 2026 EazyGrades. For personal study use only. Redistribution, resale, or sharing is not permitted.';
const disclaimer='AI-generated exam-style practice questions for study purposes only. Not official course material.';
function document(c,p){
 const b=bank[c.code], questions=b[p.id];
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(c.code+' — '+p.title)}</title><style>
 @font-face{font-family:DM;src:url(data:font/ttf;base64,${font})} @font-face{font-family:DM;src:url(data:font/ttf;base64,${bold});font-weight:600}
 @page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;background:#e5e7eb;color:#152033;font:10.5pt DM,Arial,sans-serif;line-height:1.42}.sheet{background:white;width:210mm;height:297mm;padding:14mm 16mm 17mm;position:relative;break-after:page;overflow:hidden}.sheet:last-child{break-after:auto}.brand{display:flex;justify-content:space-between;border-bottom:2px solid #18324e;padding-bottom:8px;font-weight:600;font-size:10pt;letter-spacing:1px}.tag{font-size:9pt;text-transform:uppercase;color:#425670;letter-spacing:1px;margin:14px 0 5px}h1{font-size:25pt;line-height:1.1;margin:0 0 7px;font-weight:600}h2{font-size:13pt;line-height:1.25;margin:0 0 9px}h3{font-size:11pt;margin:0 0 5px}p{margin:4px 0}.intro{color:#43536a;font-size:9pt;border-left:3px solid #527599;padding-left:10px;margin:10px 0}.instructions{font-size:9pt;color:#43536a;margin:10px 0}.question{margin-top:15px;break-inside:avoid}.question h3{display:flex;justify-content:space-between;color:#18324e}.marks{font-size:9pt;font-weight:400}.working{height:100px;background:repeating-linear-gradient(white,white 23px,#e2e8ef 24px,white 25px);margin-top:10px}.answer{margin:20px 0;padding-bottom:14px;border-bottom:1px solid #d7e0ea}.scope{background:#f1f5f9;padding:12px;margin-top:15px;font-size:9pt}.source{font-size:8.5pt;overflow-wrap:anywhere;color:#43536a;margin-top:12px}footer{position:absolute;bottom:8mm;left:16mm;right:16mm;font-size:8pt;color:#43536a;border-top:1px solid #d7e0ea;padding-top:6px;display:flex;gap:12px;align-items:start}footer span:first-child{flex:1} .body-end{height:1px}
 </style></head><body><section class="sheet"><div class="brand"><span>EAZYGRADES</span><span>${escape(c.code)} / ${escape(p.id.toUpperCase())}</span></div><p class="tag">${escape(kinds[b.practiceKind])}</p><h1>${escape(p.title)}</h1><h2>${escape(c.code+' · '+c.title)}</h2><div class="intro">${disclaimer}</div><p class="instructions">2 multipart questions · 50 practice marks · Work independently, then consult page 2.<br>For each question: (a) 10 marks, (b) 10 marks, (c) 5 marks. Show reasoning, assumptions and units. Use additional paper as needed.</p>${questions.map(([q],i)=>`<article class="question"><h3><span>Question ${i+1}</span><span class="marks">25 marks</span></h3>${paras(q)}<div class="working" aria-label="Space for working"></div></article>`).join('')}<div class="body-end"></div><footer><span>${footer}</span><span>1 / 2</span></footer></section>
 <section class="sheet"><div class="brand"><span>EAZYGRADES</span><span>${escape(c.code)} / ${escape(p.id.toUpperCase())}</span></div><p class="tag">Check your reasoning</p><h1>Answer guidance</h1><p class="instructions">Allocate the stated marks to correct reasoning and results for each subpart. Accept equivalent valid methods. For open-ended exercises, these are example criteria, not the only valid answers.</p>${questions.map(([,a],i)=>`<article class="answer"><h3>Question ${i+1} · Worked answer / assessment guidance</h3>${paras(a)}</article>`).join('')}<div class="scope"><h3>Scope of this practice</h3><p>${escape(c.coverageNote)}</p><p>${escape(c.description)}</p><p>AI-generated educational practice material. Compare with your current syllabus and verify unfamiliar results using trusted course resources. No grade or exam outcome is guaranteed.</p></div><div class="source"><strong>Course metadata source · verified ${verifiedDate}</strong><p>${escape(c.sourceUrl)}</p><p>The calendar verifies the course identity and broad subject area; it does not supply these questions or endorse their coverage. EazyGrades is not affiliated with, endorsed by, or officially connected to Concordia University or any school.</p></div><div class="body-end"></div><footer><span>${footer}</span><span>2 / 2</span></footer></section></body></html>`;
}
mkdirSync('data/practice-qa',{recursive:true});
mkdirSync('data/private-pdfs',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:794,height:1123},deviceScaleFactor:1});
await page.route('**/*',r=>r.abort());
const manifest=[];
try {
 for(const c of courses){
  mkdirSync(`data/private-pdfs/${c.id}`,{recursive:true});
  for(const p of c.products){
   await page.setContent(document(c,p),{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
   const layout=await page.locator('.sheet').evaluateAll(sheets=>sheets.map(s=>({width:s.scrollWidth,clientWidth:s.clientWidth,end:s.querySelector('.body-end').getBoundingClientRect().bottom,footer:s.querySelector('footer').getBoundingClientRect().top})));
   if(layout.some(s=>s.width>s.clientWidth||s.end>s.footer-8))throw Error(`PDF overflow: ${c.code}/${p.id} ${JSON.stringify(layout)}`);
   const file=`data/private-pdfs/${c.id}/${p.id}.pdf`;
   const bytes=await page.pdf({path:file,preferCSSPageSize:true,printBackground:true});
   const pages=(bytes.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;
   if(pages!==2)throw Error(`Unexpected page count ${pages}: ${file}`);
   manifest.push({courseId:c.id,productId:p.id,pages,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),kind:c.practiceKind});
   // Visual QA representatives cover technical, mathematical, project, reflection and template layouts.
   if(['comp-248','comp-232','soen-287','engr-213','engr-244','engr-490','comp-108','soen-499'].includes(c.id)){
    for(let i=0;i<2;i++)await page.locator('.sheet').nth(i).screenshot({path:`data/practice-qa/${c.id}-${p.id}-${i+1}.png`});
   }
  }
 }
 writeFileSync('data/courses.json',JSON.stringify(courses,null,2)+'\n');
 writeFileSync('data/practice-manifest.json',JSON.stringify({generatedAt:verifiedDate,sourceCount:verified.length,pdfCount:manifest.length,files:manifest},null,2)+'\n');
 console.log(`Generated ${manifest.length} two-page PDFs for ${courses.length} verified courses. ${courses.filter(c=>c.published).length} practice pairs published; 5 rotating-topic template pairs remain unpublished.`);
} finally {await browser.close();}

