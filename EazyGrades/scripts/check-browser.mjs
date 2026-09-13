import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
mkdirSync('test-results',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const route of ['/','/courses','/pricing','/faq','/privacy','/terms','/refund']){
 const response=await page.goto('http://127.0.0.1:3000'+route);assert.equal(response.status(),200);
 await page.getByRole('button',{name:'Sign in',exact:true}).waitFor({state:'visible'});
 await page.waitForFunction(()=>!document.querySelector('.signin')?.hasAttribute('disabled'));
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflows');
 if(['/','/courses','/pricing'].includes(route))await page.screenshot({path:`test-results/desktop-${route==='/'?'home':route.slice(1)}.png`,fullPage:true});
}
await page.goto('http://127.0.0.1:3000/courses');
await page.getByRole('textbox',{name:'Search course code or name'}).fill('COMP 232');assert.equal(await page.locator('.course-card').count(),1);
await page.getByRole('button',{name:/View Practice Set/}).click();await page.getByRole('dialog').waitFor();assert.equal(await page.locator('.product-row').count(),2);
await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);
await page.getByRole('textbox',{name:'Search course code or name'}).fill('not-a-course');await page.getByRole('heading',{name:'No courses found.'}).waitFor();
await page.getByRole('button',{name:'Clear filters'}).click();assert.equal(await page.locator('.course-card').count(),5);
await page.getByRole('button',{name:'Software Engineering',exact:true}).click();assert.equal(await page.locator('.course-card').count(),1);
await page.goto('http://127.0.0.1:3000/pricing');await page.waitForFunction(()=>!document.querySelector('.signin')?.hasAttribute('disabled'));assert.equal(await page.getByRole('button',{name:'Available at launch'}).count(),3);
await page.getByRole('button',{name:'Sign in',exact:true}).click();await page.getByLabel('Email',{exact:true}).fill('notregistered@example.com');await page.getByLabel('Password',{exact:true}).fill('long-test-password');await page.getByRole('dialog').getByRole('button',{name:'Sign in',exact:true}).click();await page.getByRole('alert').filter({hasText:'Email or password is incorrect.'}).waitFor();await page.keyboard.press('Escape');
await page.goto('http://127.0.0.1:3000/faq');await page.getByText('Are these real past exams?',{exact:true}).click();assert.equal(await page.locator('details[open]').count(),1);
await page.setViewportSize({width:390,height:844});
for(const route of ['/','/courses','/pricing','/faq','/privacy','/terms','/refund']){
 await page.goto('http://127.0.0.1:3000'+route);await page.waitForFunction(()=>!document.querySelector('.signin')?.hasAttribute('disabled'));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' mobile overflows');
 if(['/','/courses','/pricing'].includes(route))await page.screenshot({path:`test-results/mobile-${route==='/'?'home':route.slice(1)}.png`,fullPage:true});
}
await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Courses',exact:true}).click();await page.waitForURL('**/courses');
await page.getByRole('button',{name:/View Practice Set/}).first().click();await page.screenshot({path:'test-results/mobile-dialog.png'});await page.keyboard.press('Escape');
assert.deepEqual(errors,[]);await browser.close();console.log('Browser checks passed: 7 routes on desktop/mobile; no overflow or browser errors; catalog search/filter/empty state; PDF dialogs; failed login; FAQ; mobile navigation.');

