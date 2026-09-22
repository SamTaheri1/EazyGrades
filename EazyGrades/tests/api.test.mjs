import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import Stripe from 'stripe';
import { createApp } from '../server/app.mjs';
const origin='http://127.0.0.1:3000';
const secret='whsec_test_eazygrades';
const signer=new Stripe('sk_test_fixture');
async function fixture(t,overrides={}){
 const dir=mkdtempSync(path.join(tmpdir(),'eazygrades-test-'));
 const courses=['comp-232','engr-213'].map((id,i)=>({id,code:i?'ENGR 213':'COMP 232',title:'Verified test course',category:'Engineering Core',description:'Test fixture',published:true,products:[{id:'core',title:'Core Exam Practice'},{id:'advanced',title:'Advanced Exam Practice'}]}));
 writeFileSync(path.join(dir,'courses.json'),JSON.stringify(courses));
 for(const c of courses){mkdirSync(path.join(dir,'private-pdfs',c.id),{recursive:true});for(const p of c.products)writeFileSync(path.join(dir,'private-pdfs',c.id,`${p.id}.pdf`),'%PDF-1.4\nTest-only bytes');}
 let time=Date.now();let seq=0;
 const state={subscriptions:new Map(),sessions:new Map(),created:[],keys:[],priceMismatch:false,customers:0};
 const stripe={webhooks:signer.webhooks,customers:{create:async()=>({id:`cus_${++state.customers}`})},prices:{retrieve:async id=>({id,active:true,currency:'cad',unit_amount:state.priceMismatch?1:({price_basic:900,price_pro:1900,price_semester:4900}[id]),recurring:{interval:'month',interval_count:id==='price_semester'?4:1}})},subscriptions:{retrieve:async id=>state.subscriptions.get(id)},checkout:{sessions:{create:async (input,options)=>{state.keys.push(options.idempotencyKey);const s={id:`cs_test_${++seq}`,url:'https://checkout.stripe.com/test',status:'open',...input};state.created.push(input);state.sessions.set(s.id,s);return s;},retrieve:async id=>state.sessions.get(id),expire:async id=>{state.sessions.get(id).status='expired';}}},billingPortal:{sessions:{create:async()=>({url:'https://billing.stripe.com/test'})}},charges:{retrieve:async()=>({customer:'cus_1'})}};
 const app=createApp({courses,dataDir:dir,dbPath:':memory:',appUrl:origin,stripe,webhookSecret:secret,priceIds:{basic:'price_basic',pro:'price_pro',semester:'price_semester'},checkoutEnabled:true,supportEmail:'support@example.com',rateLimits:false,now:()=>time,...overrides});
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
 t.after(async()=>{await new Promise(r=>server.close(r));app.locals.db.close();rmSync(dir,{recursive:true,force:true});});
 const base=`http://127.0.0.1:${server.address().port}`;
 async function request(url,{method='GET',body,cookie,headers={}}={}){const res=await fetch(base+url,{method,headers:{Origin:origin,...(cookie?{Cookie:cookie}:{}),...(body!==undefined?{'Content-Type':'application/json'}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)});return{status:res.status,body:res.headers.get('content-type')?.includes('application/json')?await res.json():await res.text(),headers:res.headers,cookie:res.headers.get('set-cookie')?.split(';')[0]};}
 const register=async(email='student@example.com')=>request('/api/auth/register',{method:'POST',body:{email,password:'long-test-password',name:'Student'},headers:{Origin:origin}});
 async function webhook(type,object,id=`evt_${++seq}`,valid=true){const payload=JSON.stringify({id,type,data:{object}});const res=await fetch(base+'/api/billing/webhook',{method:'POST',headers:{'Content-Type':'application/json','stripe-signature':valid?signer.webhooks.generateTestHeaderString({payload,secret}):'bad'},body:payload});return{status:res.status,body:await res.json()};}
 async function subscribe(cookie,planId='basic',courseId='comp-232'){
  const checkout=await request('/api/billing/checkout',{method:'POST',body:{planId,...(planId==='basic'?{courseId}:{})},cookie});assert.equal(checkout.status,200,JSON.stringify(checkout.body));
  const session=[...state.sessions.values()].at(-1);const sub={id:`sub_${++seq}`,customer:session.customer,metadata:session.subscription_data.metadata,status:'active',latest_invoice:{id:'in_1',status:'paid'},items:{data:[{price:{id:session.line_items[0].price},current_period_end:Math.floor(time/1000)+3600}]},cancel_at_period_end:false};state.subscriptions.set(sub.id,sub);session.subscription=sub.id;session.payment_status='paid';session.status='complete';
  return{session,sub};
 }
 return{app,state,dir,request,register,webhook,subscribe,advance:ms=>time+=ms};
}

test('accounts use hashed credentials, secure session boundaries and origin validation',async t=>{
 const f=await fixture(t);assert.equal((await f.request('/api/me')).body.user,null);
 const bad=await f.request('/api/auth/register',{method:'POST',headers:{Origin:'https://other.example'},body:{}});assert.equal(bad.status,403);
 assert.equal((await f.request('/api/auth/register',{method:'POST',body:{email:'invalid',password:'short',name:''}})).status,400);
 const a=await f.register();assert.equal(a.status,201);assert.match(a.headers.get('set-cookie'),/HttpOnly/);assert.match(a.headers.get('set-cookie'),/SameSite=Lax/);
 assert.notEqual(f.app.locals.db.prepare('SELECT password FROM users').get().password,'long-test-password');assert.notEqual(f.app.locals.db.prepare('SELECT token_hash FROM sessions').get().token_hash,a.cookie.split('=')[1]);
 assert.equal((await f.register()).status,409);
 assert.equal((await f.request('/api/auth/login',{method:'POST',body:{email:'student@example.com',password:'wrong-password'}})).status,401);
 await f.request('/api/auth/logout',{method:'POST',cookie:a.cookie,body:{}});assert.equal((await f.request('/api/me',{cookie:a.cookie})).body.user,null);
});

test('catalog exposes no private paths and all paid downloads require server authorization',async t=>{
 const f=await fixture(t);const c=await f.request('/api/catalog');assert.equal(c.body.courses.length,2);assert.equal(c.body.courses[0].products.length,2);assert.equal(JSON.stringify(c.body).includes(f.dir),false);assert.equal(JSON.stringify(c.body).includes('price_basic'),false);
 assert.equal((await f.request('/api/download/comp-232/core')).status,401);
 const a=await f.register();assert.equal((await f.request('/api/download/comp-232/core',{cookie:a.cookie})).status,403);
 assert.equal((await f.request('/api/download/unknown/core',{cookie:a.cookie})).status,404);
 assert.equal((await f.request('/api/download/comp-232/solutions',{cookie:a.cookie})).status,400);
 assert.equal((await f.request('/api/download/comp-232%2F..%2F/core',{cookie:a.cookie})).status,400);
 assert.equal((await f.request('/data/private-pdfs/comp-232/core.pdf',{cookie:a.cookie})).status,404);
});

test('checkout redirect cannot grant access; verified and idempotent webhooks bind Basic to one course',async t=>{
 const f=await fixture(t);const a=await f.register();const b=await f.register('other@example.com');
 const {session,sub}=await f.subscribe(a.cookie);
 assert.equal((await f.request(`/api/billing/status/${session.id}`,{cookie:a.cookie})).body.status,'pending');
 assert.equal((await f.request('/api/download/comp-232/core',{cookie:a.cookie})).status,403);
 assert.equal((await f.request(`/api/billing/status/${session.id}`,{cookie:b.cookie})).status,404);
 assert.equal((await f.webhook('checkout.session.completed',session,'evt_confirm',false)).status,400);
 assert.equal((await f.webhook('checkout.session.completed',session,'evt_confirm')).status,200);
 assert.equal((await f.webhook('checkout.session.completed',session,'evt_confirm')).status,200);
 assert.equal(f.app.locals.db.prepare('SELECT COUNT(*) n FROM subscriptions').get().n,1);
 assert.equal((await f.request(`/api/billing/status/${session.id}`,{cookie:a.cookie})).body.status,'confirmed');
 for(const p of ['core','advanced']){const r=await f.request(`/api/download/comp-232/${p}`,{cookie:a.cookie});assert.equal(r.status,200);assert.match(r.headers.get('content-disposition'),/attachment/);assert.match(r.headers.get('cache-control'),/no-store/);}
 assert.equal((await f.request('/api/download/engr-213/core',{cookie:a.cookie})).status,403);
 assert.equal((await f.request('/api/download/comp-232/core',{cookie:b.cookie})).status,403);
 f.advance(3601000);assert.equal((await f.request('/api/download/comp-232/core',{cookie:a.cookie})).status,403);
 sub.items.data[0].current_period_end+=3600;await f.webhook('invoice.paid',{parent:{subscription_details:{subscription:sub.id}}});assert.equal((await f.request('/api/download/comp-232/core',{cookie:a.cookie})).status,200);
});

test('Pro covers all courses; failed renewals and cancellations revoke access using current Stripe state',async t=>{
 const f=await fixture(t);const a=await f.register();const {session,sub}=await f.subscribe(a.cookie,'pro');
 await f.webhook('customer.subscription.created',sub);assert.equal((await f.request('/api/download/engr-213/advanced',{cookie:a.cookie})).status,200);
 sub.cancel_at_period_end=true;await f.webhook('customer.subscription.updated',sub);assert.equal((await f.request('/api/download/engr-213/core',{cookie:a.cookie})).status,200);
 sub.status='past_due';sub.latest_invoice.status='open';await f.webhook('invoice.payment_failed',{subscription:sub.id});assert.equal((await f.request('/api/download/engr-213/core',{cookie:a.cookie})).status,403);
 await f.webhook('checkout.session.completed',session);assert.equal((await f.request('/api/download/engr-213/core',{cookie:a.cookie})).status,403);
 sub.status='active';sub.latest_invoice.status='paid';await f.webhook('invoice.paid',{subscription:sub.id});assert.equal((await f.request('/api/download/engr-213/core',{cookie:a.cookie})).status,200);
 sub.status='canceled';await f.webhook('customer.subscription.deleted',sub);assert.equal((await f.request('/api/download/engr-213/core',{cookie:a.cookie})).status,403);
});

test('refund suspension survives subscription refresh and duplicate charge protection',async t=>{
 const f=await fixture(t);const a=await f.register();const {sub}=await f.subscribe(a.cookie,'semester');await f.webhook('customer.subscription.created',sub);
 assert.equal((await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body:{planId:'pro'}})).status,409);
 await f.webhook('charge.refunded',{customer:sub.customer});await f.webhook('customer.subscription.updated',sub);
 assert.equal((await f.request('/api/download/comp-232/core',{cookie:a.cookie})).status,403);
});

test('closed checkout, invalid plans, missing content and mismatched Stripe prices fail safely',async t=>{
 const f=await fixture(t);const a=await f.register();
 assert.equal((await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body:{planId:'fake'}})).status,400);
 assert.equal((await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body:{planId:'basic',courseId:'fake'}})).status,400);
 f.state.priceMismatch=true;assert.equal((await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body:{planId:'pro'}})).status,503);assert.equal(f.state.created.length,0);
 rmSync(path.join(f.dir,'private-pdfs'),{recursive:true});assert.equal((await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body:{planId:'pro'}})).status,503);
 assert.equal((await f.request('/api/catalog')).body.courses.some(c=>c.available),false);
 const closed=await fixture(t,{checkoutEnabled:false});const b=await closed.register();assert.equal((await closed.request('/api/billing/checkout',{method:'POST',cookie:b.cookie,body:{planId:'pro'}})).status,503);
});

test('pending checkout is reused, expired/failed sessions stay locked and unpaid active subscriptions do not grant access',async t=>{
 const f=await fixture(t);const a=await f.register();
 const body={planId:'basic',courseId:'comp-232'};await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body});await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body});assert.equal(f.state.created.length,1);
 const session=[...f.state.sessions.values()][0];await f.webhook('checkout.session.expired',session);assert.equal((await f.request(`/api/billing/status/${session.id}`,{cookie:a.cookie})).body.status,'expired');
 const next=await f.subscribe(a.cookie);next.sub.latest_invoice.status='open';await f.webhook('checkout.session.completed',next.session);assert.equal((await f.request('/api/download/comp-232/core',{cookie:a.cookie})).status,403);
});

test('checkout retry after an uncertain network failure reuses the same order and idempotency key',async t=>{
 const f=await fixture(t);const a=await f.register();
 const orderBody={planId:'pro'};
 // Persist an uncertain request as it would exist after a connection timeout.
 const user=f.app.locals.db.prepare('SELECT * FROM users').get();
 f.app.locals.db.prepare('UPDATE users SET stripe_customer=? WHERE id=?').run('cus_retry',user.id);
 f.app.locals.db.prepare('INSERT INTO orders (id,user_id,plan_id,created_at) VALUES (?,?,?,?)').run('uncertain-order',user.id,'pro',Date.now());
 const response=await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body:orderBody});assert.equal(response.status,200);
 assert.equal(f.state.created[0].metadata.orderId,'uncertain-order');
 assert.equal(f.state.keys[0],'checkout-uncertain-order');
 assert.equal(f.app.locals.db.prepare('SELECT COUNT(*) n FROM orders').get().n,1);
});

test('a refund arriving before subscription creation remains revoked after later confirmation',async t=>{
 const f=await fixture(t);const a=await f.register();const {session,sub}=await f.subscribe(a.cookie,'pro');
 await f.webhook('charge.refunded',{customer:sub.customer});await f.webhook('checkout.session.completed',session);
 assert.equal((await f.request('/api/download/comp-232/core',{cookie:a.cookie})).status,403);
 assert.equal((await f.request('/api/billing/checkout',{method:'POST',cookie:a.cookie,body:{planId:'pro'}})).status,403);
});
