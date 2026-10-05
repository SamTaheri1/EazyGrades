import {chromium} from 'playwright';
import {readFileSync,writeFileSync} from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();await page.route('**/*',route=>route.abort());
const rows=[];
for(const key of ['comp-soen','engr']){
 const html=readFileSync(`data/sources/${key}.html`,'utf8');
 await page.setContent(html,{waitUntil:'domcontentloaded'});
 const url=html.match(/<meta name="og:url" content="([^"]+)"/)?.[1] || html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
 const sourceUrl = url || html.match(/<meta name="internal-url" content="([^"]+)"/)[1].replace('/content/concordia/en/','/');
 const found=await page.locator('.course').evaluateAll(nodes=>nodes.map(n=>({heading:n.querySelector('.title').textContent.trim(),anchor:n.querySelector('a[id]').id,body:n.querySelector('.accordion-body').textContent.replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ').trim()})));
 for(const r of found){const m=r.heading.match(/^((?:COMP|SOEN|ENGR) \d{3}) (.+) \(([\d.]+) credits?\)$/);if(!m)throw Error(r.heading);rows.push({id:m[1].toLowerCase().replace(' ','-'),code:m[1],title:m[2].replace(/‑/g,'-'),credits:Number(m[3]),sourceUrl:sourceUrl+'#'+r.anchor,sourceDescription:r.body.split('Description:')[1]?.split(/Component\(s\):|Notes:/)[0].trim()});}
}
writeFileSync('data/sources/verified-courses.json',JSON.stringify(rows,null,2)+'\n');console.log(rows.map(r=>r.code+' | '+r.title+' | '+r.sourceDescription).join('\n'));await browser.close();

