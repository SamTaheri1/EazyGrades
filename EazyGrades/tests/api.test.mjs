import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import Stripe from 'stripe';
import {createApp} from '../server/app.mjs';
const origin='http://127.0.0.1:3000',secret='whsec_fixture',signer=new Stripe('sk_test_fixture');
const pdf=(courseId='comp-232')=>({kind:'course',courseId});
const plus=(courseId='engr-213',productId='core')=>({kind:'pdf',courseId,productId});
const premium={kind:'premium',trackId:'computer-science'};
async function fixture(t,overrides={}){
 const dir=mkdtempSync(path.join(tmpdir(),'eazygrades-test-'));
 const courses=['comp-232','comp-352','engr-213'].map((id,i)=>({id,code:id.toUpperCase().replace('-',' '),title:'Test',category:i===2?'Engineering Core':'Computer Science',published:true,products:[{id:'core',title:'Core'},{id:'advanced',title:'Advanced'}]}));
 for(const c of courses){mkdirSync(path.join(dir,'private-pdfs',c.id),{recursive:true});for(const p of c.products)writeFileSync(path.join(dir,'private-pdfs',c.id,`${p.id}.pdf`),'%PDF-1.4\nTest bytes');}
 let time=Date.now(),seq=0;const state={sessions:new Map(),subs:new Map(),requests:[],keys:[],customers:0,mismatch:false,uncertain:false};const amounts={price_single:1999,price_premium:1599,price_plus:1299};
 const stripe={webhooks:signer.webhooks,customers:{create:async()=>({id:`cus_${++state.customers}`})},prices:{retrieve:async id=>({id,active:true,currency:'cad',unit_amount:state.mismatch?1:amounts[id],recurring:id==='price_premium'?{interval:'month',interval_count:1}:null})},subscriptions:{retrieve:async id=>state.subs.get(id),update:async(id,input)=>Object.assign(state.subs.get(id),input)},checkout:{sessions:{
 create:async(input,opt)=>{state.requests.push(input);state.keys.push(opt.idempotencyKey);let s=[...state.sessions.values()].find(s=>s.client_reference_id===input.client_reference_id);if(!s){s={...input,id:`cs_test_${++seq}`,url:'https://checkout.stripe.com/test',status:'open',payment_status:'unpaid',currency:'cad',amount_total:amounts[input.line_items[0].price],payment_intent:`pi_${seq}`,line_items:{data:input.line_items.map(i=>({...i,price:{id:i.price}})),has_more:false}};state.sessions.set(s.id,s);}if(state.uncertain){state.uncertain=false;throw Error('timeout');}return s;},retrieve:async id=>state.sessions.get(id),expire:async id=>{state.sessions.get(id).status='expired';}}},billingPortal:{sessions:{create:async()=>({url:'https://billing.stripe.com/test'})}},charges:{retrieve:async()=>({customer:'cus_1'})}};
 const app=createApp({courses,dataDir:dir,dbPath:':memory:',appUrl:origin,stripe,webhookSecret:secret,priceIds:{single:'price_single',premium:'price_premium',plus:'price_plus'},checkoutEnabled:true,supportEmail:'support@example.com',rateLimits:false,now:()=>time,...overrides});
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));t.after(async()=>{await new Promise(r=>server.close(r));app.locals.db.close();rmSync(dir,{recursive:true,force:true});});const base=`http://127.0.0.1:${server.address().port}`;
 async function request(url,{body,cookie,headers={}}={}){const r=await fetch(base+url,{method:body===undefined?'GET':'POST',headers:{Origin:origin,...(cookie?{Cookie:cookie}:{}),...(body!==undefined?{'Content-Type':'application/json'}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)});return{status:r.status,body:r.headers.get('content-type')?.includes('application/json')?await r.json():await r.text(),headers:r.headers,cookie:r.headers.get('set-cookie')?.split(';')[0]};}
 const register=(email='student@example.com')=>request('/api/auth/register',{body:{email,password:'long-test-password',name:'Student Example',dateOfBirth:'2000-02-29',engineeringField:'Software Engineering',acceptTerms:true}});
 const checkout=(cookie,body)=>request('/api/billing/checkout',{cookie,body});
 async function webhook(type,object,id=`evt_${++seq}`,valid=true){const payload=JSON.stringify({id,type,data:{object}});return fetch(base+'/api/billing/webhook',{method:'POST',headers:{'Content-Type':'application/json','stripe-signature':valid?signer.webhooks.generateTestHeaderString({payload,secret}):'bad'},body:payload});}
 const last=()=>[...state.sessions.values()].at(-1);
 async function purchase(cookie,body=pdf(),confirm=true){const r=await checkout(cookie,body);assert.equal(r.status,200,JSON.stringify(r.body));const s=last();Object.assign(s,{status:'complete',payment_status:'paid'});if(confirm)assert.equal((await webhook('checkout.session.completed',s)).status,200);return s;}
 async function subscribe(cookie){const r=await checkout(cookie,premium);assert.equal(r.status,200,JSON.stringify(r.body));const s=last(),sub={id:`sub_${++seq}`,customer:s.customer,metadata:s.subscription_data.metadata,status:'active',latest_invoice:{id:'in_1',status:'paid'},items:{data:[{quantity:1,price:{id:'price_premium'},current_period_end:Math.floor(time/1000)+3600}]},cancel_at_period_end:false};state.subs.set(sub.id,sub);Object.assign(s,{subscription:sub.id,payment_status:'paid',status:'complete'});assert.equal((await webhook('checkout.session.completed',s)).status,200);return{sub,session:s};}
 const access=(cookie,course='comp-232',product='core')=>request(`/api/download/${course}/${product}`,{cookie});const me=async cookie=>(await request('/api/me',{cookie})).body.user;
 return{app,state,dir,request,register,checkout,webhook,purchase,subscribe,access,me,last,advance:ms=>time+=ms};
}
test('accounts retain hashed credentials, secure cookies and origin validation',async t=>{
 const f=await fixture(t);assert.equal(await f.me(),null);assert.equal((await f.request('/api/auth/register',{body:{},headers:{Origin:'https://other.example'}})).status,403);
 const a=await f.register();assert.equal(a.status,201);assert.match(a.headers.get('set-cookie'),/HttpOnly/);assert.match(a.headers.get('set-cookie'),/SameSite=Lax/);assert.notEqual(f.app.locals.db.prepare('SELECT password FROM users').get().password,'long-test-password');assert.notEqual(f.app.locals.db.prepare('SELECT token_hash FROM sessions').get().token_hash,a.cookie.split('=')[1]);assert.equal((await f.register()).status,409);
 assert.equal((await f.request('/api/auth/login',{body:{email:'student@example.com',password:'wrong-password'}})).status,401);await f.request('/api/auth/logout',{body:{},cookie:a.cookie});assert.equal(await f.me(a.cookie),null);
});
test('catalog exposes two offers and per-PDF availability; files stay private',async t=>{
 const f=await fixture(t);rmSync(path.join(f.dir,'private-pdfs/comp-232/advanced.pdf'));const c=(await f.request('/api/catalog')).body;
 assert.deepEqual(Object.keys(c.pricing),['single','premium']);assert.equal(c.courses[0].available,true);assert.equal(c.courses[0].products[1].available,false);assert.equal(c.courses[0].trackId,'computer-science');assert.equal(JSON.stringify(c).includes(f.dir),false);assert.equal(JSON.stringify(c).includes('price_single'),false);
 assert.equal((await f.access()).status,401);const {cookie}=await f.register();assert.equal((await f.me(cookie)).plusPricing,null);assert.equal((await f.access(cookie)).status,403);assert.equal((await f.access(cookie,'unknown')).status,404);assert.equal((await f.access(cookie,'comp-232','unknown')).status,400);assert.equal((await f.access(cookie,'comp-232%2F..%2F')).status,400);assert.equal((await f.request('/data/private-pdfs/comp-232/core.pdf')).status,404);assert.equal((await f.checkout(cookie,pdf('comp-232','advanced'))).status,400);assert.equal((await f.checkout(cookie,pdf())).status,400);
});
test('Course Bundle grants both PDFs in one course after verified payment, with idempotent fulfillment',async t=>{
 const f=await fixture(t),a=await f.register(),b=await f.register('other@example.com'),s=await f.purchase(a.cookie,pdf(),false);assert.equal(s.mode,'payment');assert.equal(s.amount_total,1999);assert.equal((await f.access(a.cookie)).status,403);assert.equal((await f.request(`/api/billing/status/${s.id}`,{cookie:a.cookie})).body.status,'pending');assert.equal((await f.request(`/api/billing/status/${s.id}`,{cookie:b.cookie})).status,404);
 assert.equal((await f.webhook('checkout.session.completed',s,'evt_paid',false)).status,400);await f.webhook('checkout.session.completed',s,'evt_paid');await f.webhook('checkout.session.completed',s,'evt_paid');assert.equal(f.app.locals.db.prepare('SELECT COUNT(*) n FROM pdf_purchases').get().n,1);
 const r=await f.access(a.cookie);assert.equal(r.status,200);assert.match(r.headers.get('content-disposition'),/attachment/);assert.match(r.headers.get('cache-control'),/no-store/);assert.equal((await f.access(a.cookie,'comp-232','advanced')).status,200);assert.equal((await f.access(a.cookie,'comp-352')).status,403);assert.equal((await f.access(b.cookie)).status,403);f.advance(86400000);assert.equal((await f.access(a.cookie)).status,200);assert.equal((await f.checkout(a.cookie,pdf())).status,409);
});
test('Premium covers exactly one track; Plus purchases survive expiry',async t=>{
 const f=await fixture(t),{cookie}=await f.register(),{session,sub}=await f.subscribe(cookie);assert.equal(session.mode,'subscription');assert.equal(session.amount_total,1599);
 for(const c of ['comp-232','comp-352'])for(const p of ['core','advanced'])assert.equal((await f.access(cookie,c,p)).status,200);assert.equal((await f.access(cookie,'engr-213')).status,403);assert.equal((await f.checkout(cookie,pdf())).status,409);assert.equal((await f.checkout(cookie,premium)).status,409);assert.equal((await f.me(cookie)).plusPricing.amount,1299);
 const s=await f.purchase(cookie,plus('engr-213'));assert.equal(s.mode,'payment');assert.equal(s.amount_total,1299);assert.equal((await f.access(cookie,'engr-213','advanced')).status,403);f.advance(3601000);assert.equal((await f.access(cookie)).status,403);assert.equal((await f.access(cookie,'engr-213')).status,200);assert.equal((await f.me(cookie)).plusPricing,null);assert.equal((await f.purchase(cookie,pdf('engr-213','advanced'))).amount_total,1999);
 sub.items.data[0].current_period_end+=3600;await f.webhook('invoice.paid',{parent:{subscription_details:{subscription:sub.id}}});assert.equal((await f.access(cookie)).status,200);
});
test('failed renewals, unpaid invoices and stale events preserve only individually owned access',async t=>{
 const f=await fixture(t),{cookie}=await f.register();await f.purchase(cookie);const {sub,session}=await f.subscribe(cookie);sub.latest_invoice.status='open';await f.webhook('invoice.payment_failed',{subscription:sub.id});assert.equal((await f.access(cookie,'comp-352')).status,403);assert.equal((await f.access(cookie)).status,200);await f.webhook('checkout.session.completed',session);assert.equal((await f.access(cookie,'comp-352')).status,403);
 sub.latest_invoice.status='paid';await f.webhook('invoice.paid',{subscription:sub.id});assert.equal((await f.access(cookie,'comp-352')).status,200);sub.status='canceled';await f.webhook('customer.subscription.deleted',sub);assert.equal((await f.me(cookie)).premium,null);assert.equal((await f.access(cookie,'comp-352')).status,403);assert.equal((await f.access(cookie)).status,200);
});
test('cancel future renewals checks ownership and preserves access through the paid period',async t=>{
 const f=await fixture(t),a=await f.register(),b=await f.register('other@example.com'),{sub}=await f.subscribe(a.cookie);const cancel=cookie=>f.request('/api/billing/cancel',{body:{subscriptionId:sub.id},cookie});assert.equal((await cancel(b.cookie)).status,404);const r=await cancel(a.cookie);assert.equal(r.status,200);assert.equal(r.body.user.premium.cancelAtPeriodEnd,true);assert.equal(sub.cancel_at_period_end,true);assert.equal((await f.access(a.cookie)).status,200);f.advance(3601000);assert.equal((await f.access(a.cookie)).status,403);
});
test('client price selection, invalid products/tracks and mismatched Stripe prices fail closed',async t=>{
 const f=await fixture(t),{cookie}=await f.register();for(const body of [{...pdf(),amount:1299},{...pdf(),planId:'plus'},{kind:'plus'},{kind:'premium',trackId:'all'},{...pdf(),productId:'unknown'},{...pdf(),courseId:'unknown'}])assert.equal((await f.checkout(cookie,body)).status,400);f.state.mismatch=true;assert.equal((await f.checkout(cookie,pdf())).status,503);assert.equal(f.state.requests.length,0);const closed=await fixture(t,{checkoutEnabled:false}),a=await closed.register();assert.equal((await closed.checkout(a.cookie,premium)).status,503);
});
test('fulfillment checks exact amount, currency, customer, metadata, mode and line items',async t=>{
 const f=await fixture(t),{cookie}=await f.register(),s=await f.purchase(cookie,pdf(),false),original=structuredClone(s);
 for(const change of [{amount_total:1299},{currency:'usd'},{customer:'cus_wrong'},{client_reference_id:'wrong'},{mode:'subscription'},{line_items:{data:[{quantity:2,price:{id:'price_single'}}]}},{line_items:{data:[{quantity:1,price:{id:'price_plus'}}]}}]){Object.assign(s,structuredClone(original),change);assert.equal((await f.webhook('checkout.session.completed',s)).status,400);assert.equal((await f.access(cookie)).status,403);}Object.assign(s,original);await f.webhook('checkout.session.completed',s);assert.equal((await f.access(cookie)).status,200);
});
test('unpaid and failed payments stay locked; delayed success unlocks',async t=>{
 const f=await fixture(t),{cookie}=await f.register(),s=await f.purchase(cookie,pdf(),false);s.payment_status='unpaid';await f.webhook('checkout.session.completed',s);assert.equal((await f.access(cookie)).status,403);await f.webhook('checkout.session.async_payment_failed',s);assert.equal((await f.access(cookie)).status,403);s.payment_status='paid';await f.webhook('checkout.session.async_payment_succeeded',s);assert.equal((await f.access(cookie)).status,200);await f.webhook('checkout.session.expired',s);assert.equal((await f.request(`/api/billing/status/${s.id}`,{cookie})).body.status,'confirmed');
});
test('uncertain checkout retries reuse the exact request and idempotency key',async t=>{
 const f=await fixture(t),{cookie}=await f.register();f.state.uncertain=true;assert.equal((await f.checkout(cookie,pdf())).status,500);f.advance(1500);assert.equal((await f.checkout(cookie,pdf())).status,200);assert.deepEqual(f.state.requests[0],f.state.requests[1]);assert.equal(f.state.keys[0],f.state.keys[1]);assert.equal(f.app.locals.db.prepare('SELECT COUNT(*) n FROM orders').get().n,1);await f.checkout(cookie,pdf());assert.equal(f.state.requests.length,2);const previous=f.last();await f.checkout(cookie,pdf('comp-352'));assert.equal(previous.status,'expired');
});
test('Plus eligibility refreshes Stripe before quoting and expires stale discounted sessions',async t=>{
 const f=await fixture(t),{cookie}=await f.register(),{sub}=await f.subscribe(cookie);await f.checkout(cookie,plus('engr-213'));const s=f.last();assert.equal(s.amount_total,1299);sub.status='past_due';sub.latest_invoice.status='open';assert.equal((await f.checkout(cookie,plus('engr-213'))).status,403);await f.checkout(cookie,pdf('engr-213'));assert.equal(s.status,'expired');assert.equal(f.last().amount_total,1999);assert.equal((await f.me(cookie)).plusPricing,null);
});
test('refund/dispute restrictions survive later confirmation',async t=>{
 for(const type of ['charge.refunded','charge.dispute.created']){const f=await fixture(t),{cookie}=await f.register(),s=await f.purchase(cookie,pdf(),false);await f.webhook(type,type==='charge.refunded'?{customer:s.customer}:{charge:'ch_1'});await f.webhook('checkout.session.completed',s);assert.equal((await f.access(cookie)).status,403);assert.equal((await f.checkout(cookie,premium)).status,403);assert.equal((await f.me(cookie)).accessBlocked,true);}
});
test('unexpected Stripe subscription changes invalidate access',async t=>{
 const f=await fixture(t),{cookie}=await f.register(),{sub}=await f.subscribe(cookie);sub.items.data[0].quantity=2;assert.equal((await f.webhook('customer.subscription.updated',sub)).status,400);assert.equal((await f.access(cookie)).status,403);
});
test('registration validates profile and consent before creating an account and keeps birth date private',async t=>{
 const f=await fixture(t);
 const body={name:'Alex Example',email:'profile@example.com',password:'long-test-password',dateOfBirth:'2000-02-29',engineeringField:'Mechanical Engineering',acceptTerms:true};
 for(const change of [{name:'  '},{dateOfBirth:'2001-02-29'},{dateOfBirth:'2099-01-01'},{dateOfBirth:''},{engineeringField:'Other'},{engineeringField:''},{acceptTerms:false},{acceptTerms:undefined},{dateOfBirth:undefined}]){
  assert.equal((await f.request('/api/auth/register',{body:{...body,...change}})).status,400);
  assert.equal(f.app.locals.db.prepare('SELECT COUNT(*) n FROM users').get().n,0);
 }
 const response=await f.request('/api/auth/register',{body});assert.equal(response.status,201);
 const row=f.app.locals.db.prepare('SELECT * FROM users').get();assert.equal(row.name,'Alex Example');assert.equal(row.date_of_birth,'2000-02-29');assert.equal(row.engineering_field,'Mechanical Engineering');assert.ok(row.terms_accepted_at);assert.equal(row.policy_version,'2026-09-28');
 assert.equal(response.body.user.engineeringField,'Mechanical Engineering');assert.equal(JSON.stringify(response.body).includes('2000-02-29'),false);assert.equal(JSON.stringify(await f.me(response.cookie)).includes('2000-02-29'),false);
 assert.equal((await f.checkout(response.cookie,plus())).status,403);
});
test('registration accepts each of the eight specified engineering fields',async t=>{
 const f=await fixture(t);const {engineeringFields}=await import('../config/engineering-fields.js');assert.equal(engineeringFields.length,8);
 for(const [index,engineeringField] of engineeringFields.entries())assert.equal((await f.request('/api/auth/register',{body:{name:'Student Example',email:`student${index}@example.com`,password:'long-test-password',dateOfBirth:'2000-01-01',engineeringField,acceptTerms:true}})).status,201);
});
