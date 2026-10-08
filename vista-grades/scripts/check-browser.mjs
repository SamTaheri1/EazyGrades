import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdirSync,mkdtempSync} from 'node:fs';
import courses from '../data/courses.js';
import {tracks,courseGroups} from '../config/tracks.js';
mkdirSync('test-results',{recursive:true});
const results=mkdtempSync('test-results/browser-');
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const ready=()=>page.waitForFunction(()=>!document.querySelector('.signin')?.hasAttribute('disabled')&&Number(getComputedStyle(document.querySelector('main')).opacity)===1);
 const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/courses','/pricing','/faq','/privacy','/terms','/refund']){
   assert.equal((await page.goto('http://127.0.0.1:3000'+route)).status(),200);await ready();await noOverflow();assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).animationName),'page-fade');
   if(route==='/')await page.locator('.course-spotlight').screenshot({path:`${results}/spotlight-${width}.png`});
   if(route==='/pricing'){
    assert.equal(await page.locator('.plan-card').count(),2);assert.equal(await page.locator('.plus-badge').count(),0);
    assert.match(await page.locator('.price').first().innerText(),/12\.99/);assert.match(await page.locator('.price').last().innerText(),/49\.99/);
    const boxes=await page.locator('.plan-card').evaluateAll(nodes=>nodes.map(n=>({x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y})));
    assert.equal(width>800?boxes[0].y===boxes[1].y:boxes[1].y>boxes[0].y,true);
    await page.screenshot({path:`${results}/pricing-${width}.png`,fullPage:true});
   }
  }
 }
 await page.locator('.footer-links a[href="/privacy"]').click();
 await page.waitForURL('**/privacy');
 assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).animationName),'page-fade');
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).animationName),'none');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('http://127.0.0.1:3000/courses');await ready();
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  assert.equal(await page.locator('.filters button').first().innerText(),'All courses');
  assert.equal(await page.locator('.filters button').nth(1).innerText(),'Engineering Core');
  await page.getByRole('button',{name:'All courses',exact:true}).click();
  assert.equal(await page.locator('.catalog-toolbar>span').innerText(),'39 courses');
  // Pagination preserves both the viewport and the position of its controls.
  const next=page.getByRole('button',{name:'Next',exact:true});
  await next.scrollIntoViewIfNeeded();
  const position=()=>page.evaluate(()=>({scroll:scrollY,top:document.querySelector('.catalog-pagination').getBoundingClientRect().top}));
  const start=await position();
  for(let number=2;number<=5;number++){
   await next.click();
   await page.waitForFunction(n=>document.querySelector('.catalog-pagination').textContent.includes(`Page ${n} of 5`),number);
   await page.waitForTimeout(200);
   const current=await position();
   assert.ok(Math.abs(current.scroll-start.scroll)<2,`Page ${number} changed scroll at ${width}px`);
   assert.ok(Math.abs(current.top-start.top)<2,`Page ${number} moved the controls at ${width}px`);
  }
  await page.getByRole('button',{name:'Previous',exact:true}).click();
  assert.ok(Math.abs((await position()).scroll-start.scroll)<2);
  for(const track of courseGroups){
   const button=page.getByRole('button',{name:track.name,exact:true});assert.equal(await button.isVisible(),true);await button.click();
   const codes=await page.locator('.catalog-card .course-code').allTextContents();
   assert.deepEqual(codes.map(c=>c.toLowerCase().replace(' ','-')).sort(),[...track.courseIds].sort());
   for(const code of ['ENGR 213','ENGR 233','ENGR 371'])assert.equal(codes.includes(code),track.id==='engineering-core');
  }
  await noOverflow();await page.screenshot({path:`${results}/engineering-fields-${width}.png`,fullPage:true});
 }
 for(const course of courses){
  await page.getByRole('textbox',{name:'Search course code or name'}).fill(course.id.replace('-',''));
  assert.equal(await page.locator('.catalog-card').count(),1);
  assert.equal(await page.locator('.catalog-card .course-code').innerText(),course.code);
  const programs=courseGroups.filter(group=>group.courseIds.includes(course.id));
  assert.deepEqual(await page.locator('.filters .active').allTextContents(),programs.map(group=>group.name));
  assert.equal(await page.locator('.catalog-toolbar>span').innerText(),'1 course');
 }
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const [query,groups,count] of [
   ['311',['Computer Engineering','Electrical Engineering','Industrial Engineering'],3],
   ['352',['Software Engineering','Computer Engineering','Electrical Engineering','Mechanical Engineering','Aerospace Engineering'],3],
   ['371',['Engineering Core','Mechanical Engineering','Aerospace Engineering','Industrial Engineering'],4],
   ['ELEC',['Software Engineering','Computer Engineering','Electrical Engineering'],7],
   ['engr-244',['Mechanical Engineering','Civil & Building Engineering'],1],
   ['  CoEn - 311  ',['Computer Engineering'],1],
   ['Engineering',['Engineering Core','Software Engineering','Electrical Engineering','Industrial Engineering'],5],
   ['no such course',[],0],['???',[],0],
   ['', ['All courses'],39],['   ',['All courses'],39],
  ]){
   await page.getByRole('textbox',{name:'Search course code or name'}).fill(query);
   assert.deepEqual(await page.locator('.filters .active').allTextContents(),groups,query);
   assert.deepEqual(await page.locator('.filters [aria-pressed="true"]').allTextContents(),groups,query);
   assert.equal(await page.locator('.catalog-toolbar>span').innerText(),`${count} ${count===1?'course':'courses'}`,query);
  }
  await page.getByRole('textbox',{name:'Search course code or name'}).fill('311');
  await page.getByRole('button',{name:'Electrical Engineering',exact:true}).click();
  assert.equal(await page.getByRole('textbox',{name:'Search course code or name'}).inputValue(),'');
  assert.deepEqual(await page.locator('.filters .active').allTextContents(),['Electrical Engineering']);
  assert.equal(await page.locator('.catalog-toolbar>span').innerText(),'6 courses');
 }
 await page.getByRole('textbox',{name:'Search course code or name'}).fill('comp232');assert.equal(await page.locator('.catalog-card').count(),1);
 await page.getByRole('textbox',{name:'Search course code or name'}).fill('COMP 352');assert.equal(await page.locator('.catalog-card').count(),1);
 await page.locator('.catalog-card').click();assert.equal(await page.locator('.product-row').count(),2);assert.equal(await page.getByRole('button',{name:'Buy both PDFs for $12.99',exact:true}).count(),1);await noOverflow();await page.keyboard.press('Escape');
 // Mock account/catalog state only in this isolated browser context; no real users or charges.
 const catalog=await (await page.request.get('http://127.0.0.1:3000/api/catalog')).json();
 for(const c of catalog.courses){c.available=true;for(const p of c.products)p.available=true;}
 for(const t of catalog.tracks)t.available=true;
 catalog.pricing.single.checkoutEnabled=true;catalog.pricing.program.checkoutEnabled=true;
 let user=null,submitted=null;
 await page.route('**/api/catalog',r=>r.fulfill({json:catalog}));
 await page.route('**/api/me',r=>r.fulfill({json:{user}}));
 await page.route('**/api/billing/checkout',r=>{submitted=r.request().postDataJSON();return r.fulfill({status:409,json:{error:'Test checkout captured.'}});});
 const signedIn={name:'Student',email:'student@example.com',engineeringField:'Software Engineering',hasBilling:true,accessBlocked:false,premium:null,programTrackIds:[],purchasedPdfIds:[],accessiblePdfIds:[],subscriptions:[]};
 const openCourse=async(code)=>{await page.goto('http://127.0.0.1:3000/courses');await ready();await page.getByRole('textbox',{name:'Search course code or name'}).fill(code);await page.locator('.catalog-card').click();};
 user={...signedIn};await openCourse('COMP 352');await page.getByRole('button',{name:'Buy both PDFs for $12.99',exact:true}).first().click();await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();assert.deepEqual(submitted,{kind:'course',courseId:'comp-352'});
 user={...signedIn,programTrackIds:['software-engineering'],accessiblePdfIds:['comp-352:core','comp-352:advanced','mech-343:core'],purchasedPdfIds:['mech-343:core']};
 await openCourse('ENGR 213');assert.equal(await page.getByRole('button',{name:'Download PDF',exact:true}).count(),0);await page.getByRole('button',{name:'Buy both PDFs for $12.99',exact:true}).click();await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();assert.deepEqual(submitted,{kind:'course',courseId:'engr-213'});
 await openCourse('COMP 352');assert.equal(await page.getByRole('button',{name:'Download PDF',exact:true}).count(),2);assert.equal(await page.locator('.bundle-purchase').count(),0);
 await openCourse('MECH 343');assert.equal(await page.getByRole('button',{name:'Download PDF',exact:true}).count(),1);assert.equal(await page.getByRole('button',{name:'Buy both PDFs for $12.99',exact:true}).count(),1);await noOverflow();
 await page.goto('http://127.0.0.1:3000/pricing');await ready();assert.equal(await page.getByRole('button',{name:'Program Pack purchased',exact:true}).isDisabled(),true);
 assert.match(await page.locator('.previous-price s').innerText(),/64\.99/);
 user={...signedIn,engineeringField:'Mechanical Engineering'};await page.reload();await ready();await page.getByRole('button',{name:'Choose Program Pack',exact:true}).click();await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();assert.deepEqual(submitted,{kind:'program',trackId:'mechanical-engineering'});
 assert.deepEqual(errors,[]);
 // Registration is completed before any create-account request is sent.
 for(const track of tracks){
  user={...signedIn,engineeringField:track.name};
  await page.goto('http://127.0.0.1:3000/pricing');await ready();
  assert.equal(await page.locator('#pack-program').count(),0);
  await page.getByRole('button',{name:'Choose Program Pack',exact:true}).click();
  await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();
  assert.deepEqual(submitted,{kind:'program',trackId:track.id});
 }
 user={...signedIn,engineeringField:null};
 await page.goto('http://127.0.0.1:3000/pricing');await ready();
 assert.equal(await page.getByRole('button',{name:'Choose Program Pack',exact:true}).isDisabled(),false);
 submitted=null;await page.getByRole('button',{name:'Choose Program Pack',exact:true}).click();await page.getByRole('alert').filter({hasText:'Contact support to add your engineering field'}).waitFor();assert.equal(submitted,null);
 user=null;
 await page.goto('http://127.0.0.1:3000/pricing');await ready();
 await page.getByRole('button',{name:'Choose Program Pack',exact:true}).click();
 assert.equal(await page.getByRole('dialog').isVisible(),true);
 await page.keyboard.press('Escape');
 let registration=null;
 user=null;
 await page.route('**/api/auth/register',r=>{registration=r.request().postDataJSON();return r.fulfill({json:{user:{...signedIn,name:registration.name}}});});
 for(const width of [1440,390]){
  registration=null;await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:3000/pricing');await ready();
  await page.getByRole('button',{name:'Sign in',exact:true}).click();await page.getByRole('button',{name:'New here? Create an account',exact:true}).click();
  const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'Create account',exact:true}).click();assert.equal(registration,null);
  await dialog.getByLabel('Full name',{exact:true}).fill('Alex Example');await dialog.getByLabel('Email',{exact:true}).fill('alex@example.com');await dialog.getByLabel('Password',{exact:true}).fill('long-test-password');await dialog.getByLabel('Date of birth',{exact:true}).fill('2000-02-29');
  assert.equal(await dialog.getByLabel('Engineering field',{exact:true}).locator('option').count(),8);await dialog.getByLabel('Engineering field',{exact:true}).selectOption('Civil & Building Engineering');await dialog.getByRole('checkbox').check();
  assert.equal(await dialog.evaluate(el=>el.scrollWidth>el.clientWidth),false);await page.screenshot({path:`${results}/registration-${width}.png`});
  await dialog.getByRole('button',{name:'Create account',exact:true}).click();await dialog.waitFor({state:'hidden'});
  assert.deepEqual(registration,{name:'Alex Example',email:'alex@example.com',password:'long-test-password',dateOfBirth:'2000-02-29',engineeringField:'Civil & Building Engineering',acceptTerms:true});
 }
 assert.deepEqual(errors,[]);
 console.log('Browser checks passed: seven desktop/mobile routes, two-card layout, no overflow, one-time purchase and owned download states and server-only checkout selection.');
}finally{await browser.close();}
