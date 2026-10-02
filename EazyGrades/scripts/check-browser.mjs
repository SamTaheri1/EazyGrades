import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import courses from '../data/courses.js';
import {tracks,courseGroups} from '../config/tracks.js';
mkdirSync('test-results',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const ready=()=>page.waitForFunction(()=>!document.querySelector('.signin')?.hasAttribute('disabled')&&Number(getComputedStyle(document.body).opacity)===1);
 const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/courses','/pricing','/faq','/privacy','/terms','/refund']){
   assert.equal((await page.goto('http://127.0.0.1:3000'+route)).status(),200);await ready();await noOverflow();assert.equal(await page.locator('h1').count(),1);
   if(route==='/pricing'){
    assert.equal(await page.locator('.plan-card').count(),2);assert.equal(await page.locator('.plus-badge').count(),0);
    assert.match(await page.locator('.price').first().innerText(),/19\.99/);assert.match(await page.locator('.price').last().innerText(),/15\.99/);
    const boxes=await page.locator('.plan-card').evaluateAll(nodes=>nodes.map(n=>({x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y})));
    assert.equal(width>800?boxes[0].y===boxes[1].y:boxes[1].y>boxes[0].y,true);
    await page.screenshot({path:`test-results/pricing-${width}.png`,fullPage:true});
   }
  }
 }
 await page.goto('http://127.0.0.1:3000/courses');await ready();
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  assert.equal(await page.locator('.filters button').first().innerText(),'All courses');
  assert.equal(await page.locator('.filters button').nth(1).innerText(),'Engineering Core');
  await page.getByRole('button',{name:'All courses',exact:true}).click();
  assert.match(await page.locator('.catalog-toolbar').innerText(),/44 courses (?:across sections|in total) \(39 unique\)/);
  for(const track of courseGroups){
   const button=page.getByRole('button',{name:track.name,exact:true});assert.equal(await button.isVisible(),true);await button.click();
   const codes=await page.locator('.catalog-card .course-code').allTextContents();
   assert.deepEqual(codes.map(c=>c.toLowerCase().replace(' ','-')).sort(),[...track.courseIds].sort());
   for(const code of ['ENGR 213','ENGR 233','ENGR 371'])assert.equal(codes.includes(code),track.id==='engineering-core');
  }
  await noOverflow();await page.screenshot({path:`test-results/engineering-fields-${width}.png`,fullPage:true});
 }
 for(const course of courses){await page.getByRole('textbox',{name:'Search course code or name'}).fill(course.id.replace('-',''));assert.equal(await page.locator('.catalog-card').count(),1);assert.equal(await page.locator('.catalog-card .course-code').innerText(),course.code);}
 await page.getByRole('textbox',{name:'Search course code or name'}).fill('comp232');assert.equal(await page.locator('.catalog-card').count(),1);
 await page.getByRole('textbox',{name:'Search course code or name'}).fill('COMP 352');assert.equal(await page.locator('.catalog-card').count(),1);
 await page.locator('.catalog-card').click();assert.equal(await page.locator('.product-row').count(),2);assert.equal(await page.getByRole('button',{name:'Buy both PDFs for $19.99',exact:true}).count(),1);await noOverflow();await page.keyboard.press('Escape');
 // Mock account/catalog state only in this isolated browser context; no real users or charges.
 const catalog=await (await page.request.get('http://127.0.0.1:3000/api/catalog')).json();
 for(const c of catalog.courses){c.available=true;for(const p of c.products)p.available=true;}
 for(const t of catalog.tracks)t.available=true;
 catalog.pricing.single.checkoutEnabled=true;catalog.pricing.premium.checkoutEnabled=true;
 let user=null,submitted=null;
 await page.route('**/api/catalog',r=>r.fulfill({json:catalog}));
 await page.route('**/api/me',r=>r.fulfill({json:{user}}));
 await page.route('**/api/billing/checkout',r=>{submitted=r.request().postDataJSON();return r.fulfill({status:409,json:{error:'Test checkout captured.'}});});
 const signedIn={name:'Student',email:'student@example.com',hasBilling:true,accessBlocked:false,premium:null,plusPricing:null,purchasedPdfIds:[],accessiblePdfIds:[],subscriptions:[]};
 const openCourse=async(code)=>{await page.goto('http://127.0.0.1:3000/courses');await ready();await page.getByRole('textbox',{name:'Search course code or name'}).fill(code);await page.locator('.catalog-card').click();};
 user={...signedIn};await openCourse('COMP 352');await page.getByRole('button',{name:'Buy both PDFs for $19.99',exact:true}).first().click();await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();assert.deepEqual(submitted,{kind:'course',courseId:'comp-352'});
 user={...signedIn,premium:{trackId:'software-engineering',expiresAt:Date.now()+3600000,cancelAtPeriodEnd:false},plusPricing:{id:'plus',name:'Plus pricing',amount:1299,currency:'cad',checkoutEnabled:true},purchasedPdfIds:['mech-343:core']};
 await openCourse('ENGR 213');assert.equal(await page.getByRole('button',{name:'Included with Premium',exact:true}).count(),0);assert.equal(await page.getByRole('button',{name:/Add with Plus/}).count(),0);await page.getByRole('button',{name:'Buy both PDFs for $19.99',exact:true}).click();await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();assert.deepEqual(submitted,{kind:'course',courseId:'engr-213'});
 await openCourse('COMP 352');assert.equal(await page.getByRole('button',{name:'Included with Premium',exact:true}).count(),2);
 await openCourse('MECH 343');assert.equal(await page.getByRole('button',{name:'Download PDF',exact:true}).count(),1);await page.getByRole('button',{name:'Add with Plus for $12.99',exact:true}).click();await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();assert.deepEqual(submitted,{kind:'pdf',courseId:'mech-343',productId:'advanced'});await noOverflow();await page.screenshot({path:'test-results/member-pdf-mobile.png'});
 await page.goto('http://127.0.0.1:3000/pricing');await ready();assert.equal(await page.locator('.plus-badge').count(),1);assert.equal(await page.locator('.plan-card').count(),2);assert.match(await page.locator('.plus-benefit').innerText(),/12\.99/);
 user={...signedIn,purchasedPdfIds:['mech-343:core']};await openCourse('MECH 343');assert.equal(await page.getByRole('button',{name:'Download PDF',exact:true}).count(),1);assert.equal(await page.getByRole('button',{name:'Buy both PDFs for $19.99',exact:true}).count(),1);assert.equal(await page.getByRole('button',{name:/Add with Plus/}).count(),0);
 await page.goto('http://127.0.0.1:3000/pricing');await ready();await page.getByRole('combobox',{name:/Your track/}).selectOption('software-engineering');await page.getByRole('button',{name:'Choose Premium',exact:true}).click();await page.getByRole('alert').filter({hasText:'Test checkout captured.'}).waitFor();assert.deepEqual(submitted,{kind:'premium',trackId:'software-engineering'});
 assert.deepEqual(errors,[]);
 // Registration is completed before any create-account request is sent.
 let registration=null;
 user=null;
 await page.route('**/api/auth/register',r=>{registration=r.request().postDataJSON();return r.fulfill({json:{user:{...signedIn,name:registration.name}}});});
 for(const width of [1440,390]){
  registration=null;await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:3000/pricing');await ready();
  await page.getByRole('button',{name:'Sign in',exact:true}).click();await page.getByRole('button',{name:'New here? Create an account',exact:true}).click();
  const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'Create account',exact:true}).click();assert.equal(registration,null);
  await dialog.getByLabel('Full name',{exact:true}).fill('Alex Example');await dialog.getByLabel('Email',{exact:true}).fill('alex@example.com');await dialog.getByLabel('Password',{exact:true}).fill('long-test-password');await dialog.getByLabel('Date of birth',{exact:true}).fill('2000-02-29');
  assert.equal(await dialog.getByLabel('Engineering field',{exact:true}).locator('option').count(),8);await dialog.getByLabel('Engineering field',{exact:true}).selectOption('Civil & Building Engineering');await dialog.getByRole('checkbox').check();
  assert.equal(await dialog.evaluate(el=>el.scrollWidth>el.clientWidth),false);await page.screenshot({path:`test-results/registration-${width}.png`});
  await dialog.getByRole('button',{name:'Create account',exact:true}).click();await dialog.waitFor({state:'hidden'});
  assert.deepEqual(registration,{name:'Alex Example',email:'alex@example.com',password:'long-test-password',dateOfBirth:'2000-02-29',engineeringField:'Civil & Building Engineering',acceptTerms:true});
 }
 assert.deepEqual(errors,[]);
 console.log('Browser checks passed: seven desktop/mobile routes, two-card layout, no overflow, member/owned/expired purchase states and server-only checkout selection.');
}finally{await browser.close();}
