import 'dotenv/config';
import coursesDefault from '../data/courses.js';
import { tracks, trackForCourse } from '../config/tracks.js';
import { engineeringFields } from '../config/engineering-fields.js';
import express from 'express';
import Database from 'better-sqlite3';
import { z } from 'zod';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import Stripe from 'stripe';
import { randomBytes, randomUUID, scrypt as scryptCallback, createHash, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync, readFileSync, existsSync, realpathSync } from 'node:fs';
import path from 'node:path';

const scrypt = promisify(scryptCallback);
const DAY = 86400000;
const hash = value => createHash('sha256').update(value).digest('hex');
const fail = (status, message) => Object.assign(new Error(message), { status });
const route = fn => (req, res, next) => Promise.resolve().then(() => fn(req, res)).catch(next);
const identifier = z.string().regex(/^[a-z0-9-]{1,80}$/);
const objectId = value => typeof value === 'string' ? value : value?.id;
const pricingDefault = JSON.parse(readFileSync(new URL('../config/pricing.json', import.meta.url), 'utf8'));

export function createApp(options = {}) {
  const dataDir = options.dataDir || path.resolve('data');
  const storageDir = path.resolve(options.storageDir || process.env.PRIVATE_PDF_DIR || path.join(dataDir, 'private-pdfs'));
  const dbPath = options.dbPath || process.env.DATABASE_PATH || path.join(dataDir, 'eazygrades.sqlite');
  if (dbPath !== ':memory:') mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, stripe_customer TEXT UNIQUE, access_blocked INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), plan_id TEXT NOT NULL, course_id TEXT, session_id TEXT UNIQUE, status TEXT NOT NULL DEFAULT 'pending', created_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS subscriptions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), plan_id TEXT NOT NULL, course_id TEXT, status TEXT NOT NULL, expires_at INTEGER NOT NULL, blocked INTEGER NOT NULL DEFAULT 0, cancel_at_period_end INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS webhook_events (id TEXT PRIMARY KEY);
  `);
  // Additive migration: retain old records, but never interpret old all-catalog
  // subscriptions as track-scoped Premium entitlements.
  for (const [table, columns] of Object.entries({
    users: {date_of_birth:'TEXT',engineering_field:'TEXT',terms_accepted_at:'INTEGER',policy_version:'TEXT'},
    orders: {product_id:'TEXT',track_id:'TEXT',expected_amount:'INTEGER',currency:'TEXT',stripe_price_id:'TEXT'},
    subscriptions: {track_id:'TEXT'},
  })) {
    const existing = new Set(db.prepare(`PRAGMA table_info(${table})`).all().map(c=>c.name));
    for (const [column,type] of Object.entries(columns)) if (!existing.has(column)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  }
  db.exec(`CREATE TABLE IF NOT EXISTS pdf_purchases (
    order_id TEXT PRIMARY KEY REFERENCES orders(id),user_id TEXT NOT NULL REFERENCES users(id),
    course_id TEXT NOT NULL,product_id TEXT NOT NULL,payment_intent TEXT,status TEXT NOT NULL,created_at INTEGER NOT NULL
  )`);
  const now = options.now || Date.now;
  const origin = new URL(options.appUrl || process.env.APP_URL || 'http://127.0.0.1:3000').origin;
  if (process.env.NODE_ENV === 'production' && !origin.startsWith('https://')) throw Error('Production APP_URL must use HTTPS.');
  const stripe = options.stripe || (process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null);
  const webhookSecret = options.webhookSecret ?? process.env.STRIPE_WEBHOOK_SECRET;
  const pricing = options.pricing || pricingDefault;
  const priceId = offer => options.priceIds?.[offer.id] || process.env[offer.priceEnv];
  const courses = options.courses || coursesDefault;
  for (const c of courses) {
    identifier.parse(c.id);
    if (!/^(ENGR|SOEN|COEN|ELEC|MECH|CIVI|BCEE|BLDG|MIAE|AERO|INDU|COMP|MATH|PHYS|CHEM) \d{3,4}$/.test(c.code) || c.products?.length !== 2 || c.products[0].id !== 'core' || c.products[1].id !== 'advanced') throw Error('Invalid course record.');
  }
  const fileFor = (course, product) => {
    const candidate = path.join(storageDir, course.id, `${product}.pdf`);
    if (!existsSync(candidate) || !existsSync(storageDir)) return null;
    const resolved = realpathSync(candidate);
    if (!resolved.startsWith(realpathSync(storageDir) + path.sep)) return null;
    return resolved;
  };
  const availableProduct = (c, product) => c.published === true && c.products.some(p=>p.id===product) && Boolean(fileFor(c,product));
  const available = c => c.products.some(p=>availableProduct(c,p.id));
  const availableCourses = () => courses.filter(available);
  const billingReady = offer => Boolean((options.supportEmail || process.env.NEXT_PUBLIC_SUPPORT_EMAIL) && stripe && webhookSecret && priceId(offer) && availableCourses().length && (options.checkoutEnabled ?? process.env.CHECKOUT_ENABLED === 'true'));
  const blocked = id => Boolean(db.prepare('SELECT access_blocked FROM users WHERE id=?').get(id)?.access_blocked);
  const activePremium = id => !blocked(id) ? db.prepare("SELECT * FROM subscriptions WHERE user_id=? AND plan_id='premium' AND status='active' AND blocked=0 AND expires_at>? ORDER BY expires_at DESC LIMIT 1").get(id,now()) : null;
  // Existing individual purchases retain their original scope; new bundles cover both products.
  const purchased = (id,courseId,productId) => Boolean(db.prepare("SELECT 1 FROM pdf_purchases WHERE user_id=? AND course_id=? AND product_id IN (?, 'bundle') AND status='confirmed'").get(id,courseId,productId));
  const canAccess = (id,c,product) => !blocked(id) && (purchased(id,c.id,product) || Boolean(activePremium(id)?.track_id && activePremium(id).track_id===trackForCourse(c)));
  const publicOffer = offer => ({id:offer.id,name:offer.name,amount:offer.amount,currency:offer.currency,checkoutEnabled:billingReady(offer)});
  const viewUser = u => {
    const premium = activePremium(u.id);
    return {name:u.name,email:u.email,engineeringField:u.engineering_field,hasBilling:Boolean(u.stripe_customer),accessBlocked:blocked(u.id),
      premium:premium?{trackId:premium.track_id,expiresAt:premium.expires_at,cancelAtPeriodEnd:Boolean(premium.cancel_at_period_end)}:null,
      plusPricing:premium?publicOffer(pricing.plus):null,
      subscriptions:db.prepare('SELECT id,plan_id AS planId,track_id AS trackId,status,expires_at AS expiresAt,cancel_at_period_end AS cancelAtPeriodEnd,blocked FROM subscriptions WHERE user_id=?').all(u.id),
      purchasedPdfIds:blocked(u.id)?[]:[...new Set(db.prepare("SELECT course_id,product_id FROM pdf_purchases WHERE user_id=? AND status='confirmed'").all(u.id).flatMap(p=>p.product_id==='bundle'?['core','advanced'].map(id=>`${p.course_id}:${id}`):[`${p.course_id}:${p.product_id}`]))],
      accessiblePdfIds:availableCourses().flatMap(c=>c.products.filter(p=>availableProduct(c,p.id)&&canAccess(u.id,c,p.id)).map(p=>`${c.id}:${p.id}`)),
    };
  };
  const app = express();
  app.locals.db = db;
  app.disable('x-powered-by');
  app.set('etag', false);
  app.use(helmet());
  app.use('/api', (req,res,next) => { res.set('Cache-Control','private, no-store'); next(); });
  // Serialize webhook reconciliation; fetch current Stripe state rather than trusting event order.
  let webhookQueue = Promise.resolve();
  async function syncSubscription(id) {
    const sub = await stripe.subscriptions.retrieve(id,{expand:['latest_invoice']});
    const order = db.prepare('SELECT * FROM orders WHERE id=?').get(sub.metadata?.orderId || '');
    if (!order || order.plan_id!=='premium') return;
    const user = db.prepare('SELECT * FROM users WHERE id=?').get(order.user_id);
    const item = sub.items?.data?.[0];
    if (objectId(sub.customer)!==user.stripe_customer || sub.items?.data?.length!==1 || item.quantity!==1 || objectId(item.price)!==order.stripe_price_id || !tracks.some(t=>t.id===order.track_id)) {
      db.prepare("UPDATE subscriptions SET status='invalid' WHERE id=?").run(sub.id);
      throw fail(400,'Subscription details do not match the purchase.');
    }
    const active = sub.status==='active' && sub.latest_invoice?.status==='paid' && !sub.pause_collection;
    const expires = (item.current_period_end || sub.current_period_end || 0)*1000;
    db.prepare(`INSERT INTO subscriptions (id,user_id,plan_id,track_id,status,expires_at,cancel_at_period_end,blocked) VALUES (?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET status=excluded.status,expires_at=excluded.expires_at,cancel_at_period_end=excluded.cancel_at_period_end`).run(sub.id,order.user_id,'premium',order.track_id,active?'active':sub.status==='active'?'unpaid':sub.status,expires,sub.cancel_at_period_end?1:0,user.access_blocked);
    db.prepare('UPDATE orders SET status=? WHERE id=?').run(active?'confirmed':sub.status==='active'?'unpaid':sub.status,order.id);
  }
  async function syncPayment(order,sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId,{expand:['line_items']});
    const user = db.prepare('SELECT * FROM users WHERE id=?').get(order.user_id);
    const items=session.line_items?.data;
    if (session.mode!=='payment' || session.metadata?.orderId!==order.id || session.client_reference_id!==order.id || objectId(session.customer)!==user.stripe_customer || (order.session_id && order.session_id!==session.id) || !items || items.length!==1 || session.line_items.has_more || items[0].quantity!==1 || objectId(items[0].price)!==order.stripe_price_id || session.amount_total!==order.expected_amount || session.currency!==order.currency) throw fail(400,'Payment details do not match the purchase.');
    if (session.status!=='complete' || session.payment_status!=='paid') return;
    db.transaction(()=>{
      db.prepare(`INSERT INTO pdf_purchases (order_id,user_id,course_id,product_id,payment_intent,status,created_at) VALUES (?,?,?,?,?,'confirmed',?) ON CONFLICT(order_id) DO NOTHING`).run(order.id,order.user_id,order.course_id,order.product_id,objectId(session.payment_intent)||null,now());
      db.prepare("UPDATE orders SET status='confirmed',session_id=? WHERE id=?").run(session.id,order.id);
    })();
  }
  app.post('/api/billing/webhook', express.raw({type:'application/json',limit:'1mb'}), route(async(req,res) => {
    if (!stripe || !webhookSecret) throw fail(503,'Billing is unavailable.');
    let event;
    try { event = stripe.webhooks.constructEvent(req.body,req.headers['stripe-signature'],webhookSecret); } catch { throw fail(400,'Invalid webhook signature.'); }
    const work = webhookQueue.then(async() => {
      if (db.prepare('SELECT 1 FROM webhook_events WHERE id=?').get(event.id)) return;
      const obj = event.data.object;
      if (event.type.startsWith('checkout.session.')) {
        const order = db.prepare('SELECT * FROM orders WHERE id=?').get(obj.metadata?.orderId || '');
        if (order) {
          if (objectId(obj.customer) !== db.prepare('SELECT stripe_customer FROM users WHERE id=?').get(order.user_id).stripe_customer || (order.session_id && order.session_id !== obj.id)) throw fail(400,'Checkout mismatch.');
          if (['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type)) {
            if (order.plan_id==='premium' && obj.mode==='subscription' && obj.subscription) await syncSubscription(objectId(obj.subscription));
            if (['single','plus'].includes(order.plan_id)) await syncPayment(order,obj.id);
          }
          if (['checkout.session.expired','checkout.session.async_payment_failed'].includes(event.type)) db.prepare('UPDATE orders SET status=? WHERE id=? AND status<>?').run(event.type.endsWith('expired')?'expired':'failed',order.id,'confirmed');
        }
      }
      if (event.type.startsWith('customer.subscription.')) await syncSubscription(obj.id);
      if (event.type.startsWith('invoice.')) {
        const id = objectId(obj.parent?.subscription_details?.subscription || obj.subscription);
        if (id) await syncSubscription(id);
      }
      // A refund/dispute suspends this customer's access for support review; never silently re-grant it on renewal.
      if (['charge.refunded','charge.dispute.created'].includes(event.type)) {
        const charge = event.type === 'charge.refunded' ? obj : await stripe.charges.retrieve(objectId(obj.charge));
        const customer = objectId(charge.customer);
        if (customer) db.transaction(() => { db.prepare('UPDATE users SET access_blocked=1 WHERE stripe_customer=?').run(customer); db.prepare('UPDATE subscriptions SET blocked=1 WHERE user_id IN (SELECT id FROM users WHERE stripe_customer=?)').run(customer); db.prepare("UPDATE pdf_purchases SET status='blocked' WHERE user_id IN (SELECT id FROM users WHERE stripe_customer=?)").run(customer); })();
      }
      db.prepare('INSERT OR IGNORE INTO webhook_events VALUES (?)').run(event.id);
    });
    webhookQueue = work.catch(()=>{});
    await work;
    res.json({received:true});
  }));
  app.use(express.json({limit:'16kb'}));
  app.use(cookieParser());
  if (options.rateLimits !== false) app.use('/api',rateLimit({windowMs:60000,limit:120,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Too many requests. Try again in a minute.'}}));
  const cookieOptions = {httpOnly:true,secure:origin.startsWith('https://'),sameSite:'lax',path:'/'};
  app.use('/api',(req,res,next)=>{
    if (!['GET','HEAD','OPTIONS'].includes(req.method) && (req.headers.origin !== origin || req.headers['sec-fetch-site'] === 'cross-site')) return next(fail(403,'Request origin is not allowed. Refresh the page and try again.'));
    const token = req.cookies.eazygrades_session;
    if (typeof token === 'string' && /^[a-f0-9]{64}$/.test(token)) {
      req.session = db.prepare('SELECT * FROM sessions WHERE token_hash=? AND expires_at>?').get(hash(token),now());
      if(req.session) req.user=db.prepare('SELECT * FROM users WHERE id=?').get(req.session.user_id);
    }
    next();
  });
  const auth = (req,res,next)=>req.user?next():next(fail(401,'Sign in to access your practice PDFs.'));
  function issueSession(id,res) {
    const token=randomBytes(32).toString('hex');
    db.prepare('DELETE FROM sessions WHERE expires_at<=?').run(now());
    db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(hash(token),id,now()+30*DAY);
    res.cookie('eazygrades_session',token,{...cookieOptions,maxAge:30*DAY});
  }
  const credentials=z.object({email:z.string().trim().email().max(254).transform(s=>s.toLowerCase()),password:z.string().min(10).max(128)}).strict();
  if(options.rateLimits!==false) app.use('/api/auth',rateLimit({windowMs:15*60000,limit:20,message:{error:'Too many sign-in attempts. Try again in 15 minutes.'}}));
  app.get('/api/health',(req,res)=>res.json({ok:true}));
  app.get('/api/catalog',(req,res)=>res.json({
    courses:courses.map(c=>({id:c.id,code:c.code,title:c.title,category:c.category,trackId:trackForCourse(c),description:c.description,practiceKind:c.practiceKind,coverageNote:c.coverageNote,sourceUrl:c.sourceUrl,products:c.products.map(p=>({id:p.id,title:p.title,available:availableProduct(c,p.id)})),available:available(c)})),
    tracks:tracks.map(t=>({id:t.id,name:t.name,available:availableCourses().some(c=>trackForCourse(c)===t.id)})),
    pricing:{single:publicOffer(pricing.single),premium:publicOffer(pricing.premium)},
  }));
  app.get('/api/me',(req,res)=>res.json({user:req.user?viewUser(req.user):null}));
  app.post('/api/auth/register',route(async(req,res)=>{
    const input=credentials.extend({
      name:z.string().trim().min(1).max(120),
      dateOfBirth:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value=>{
        const date=new Date(`${value}T00:00:00Z`);
        return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value&&value>='1900-01-01'&&value<=new Date(now()).toISOString().slice(0,10);
      },'Enter a valid date of birth.'),
      engineeringField:z.enum(engineeringFields),
      acceptTerms:z.literal(true),
    }).parse(req.body);
    const salt=randomBytes(16).toString('hex');
    const password=`${salt}:${(await scrypt(input.password,salt,64)).toString('hex')}`;
    const id=randomUUID();
    try {db.prepare('INSERT INTO users (id,name,email,password,date_of_birth,engineering_field,terms_accepted_at,policy_version) VALUES (?,?,?,?,?,?,?,?)').run(id,input.name,input.email,password,input.dateOfBirth,input.engineeringField,now(),'2026-09-28');} catch(e){if(e.code==='SQLITE_CONSTRAINT_UNIQUE')throw fail(409,'An account with this email already exists. Please sign in.');throw e;}
    issueSession(id,res);res.status(201).json({user:viewUser(db.prepare('SELECT * FROM users WHERE id=?').get(id))});
  }));
  app.post('/api/auth/login',route(async(req,res)=>{
    const input=credentials.parse(req.body);
    const user=db.prepare('SELECT * FROM users WHERE email=?').get(input.email);
    const [salt,expected]=(user?.password||`${'0'.repeat(32)}:${'0'.repeat(128)}`).split(':');
    const actual=await scrypt(input.password,salt,64);
    if(!user||!timingSafeEqual(actual,Buffer.from(expected,'hex')))throw fail(401,'Email or password is incorrect.');
    issueSession(user.id,res);res.json({user:viewUser(user)});
  }));
  app.post('/api/auth/logout',(req,res)=>{if(req.session)db.prepare('DELETE FROM sessions WHERE token_hash=?').run(req.session.token_hash);res.clearCookie('eazygrades_session',cookieOptions).json({ok:true});});
  const locks=new Set();
  app.post('/api/billing/checkout',auth,route(async(req,res)=>{
    const input=z.discriminatedUnion('kind',[
      z.object({kind:z.literal('premium'),trackId:identifier}).strict(),
      z.object({kind:z.literal('course'),courseId:identifier}).strict(),
      z.object({kind:z.literal('pdf'),courseId:identifier,productId:z.enum(['core','advanced'])}).strict(),
    ]).parse(req.body);
    if(blocked(req.user.id))throw fail(403,'Your billing access is under review. Please contact support.');
    if(locks.has(req.user.id))throw fail(409,'Checkout is already being prepared.');
    locks.add(req.user.id);
    try {
      // Refresh existing Premium from Stripe before issuing a member-price quote.
      const current=db.prepare("SELECT id FROM subscriptions WHERE user_id=? AND plan_id='premium' AND status NOT IN ('canceled','incomplete_expired')").all(req.user.id);
      if(stripe) for(const sub of current) await syncSubscription(sub.id);
      const premium=activePremium(req.user.id);
      let offer,courseId=null,productId=null,trackId=null;
      if(input.kind==='premium') {
        trackId=input.trackId;offer=pricing.premium;
        if(!tracks.some(t=>t.id===trackId))throw fail(400,'Choose a valid track.');
        if(!availableCourses().some(c=>trackForCourse(c)===trackId))throw fail(400,'No PDFs are available in this track yet.');
        if(db.prepare("SELECT 1 FROM subscriptions WHERE user_id=? AND status NOT IN ('canceled','incomplete_expired')").get(req.user.id))throw fail(409,'You already have a subscription. Manage it from your account.');
      } else if(input.kind==='course') {
        courseId=input.courseId;productId='bundle';offer=pricing.single;
        const course=courses.find(c=>c.id===courseId);
        if(!course||!course.products.every(p=>availableProduct(course,p.id)))throw fail(400,'Both course PDFs must be available before purchasing this bundle.');
        if(course.products.every(p=>canAccess(req.user.id,course,p.id)))throw fail(409,'You already have access to both course PDFs.');
      } else {
        courseId=input.courseId;productId=input.productId;
        const course=courses.find(c=>c.id===courseId);
        if(!course||!availableProduct(course,productId))throw fail(400,'This PDF is not available yet.');
        if(canAccess(req.user.id,course,productId))throw fail(409,'You already have access to this PDF. Download it from the course details.');
        if(!premium||premium.track_id===trackForCourse(course))throw fail(403,'Individual Plus purchases require active Premium and a PDF outside your track. Choose the course bundle for both PDFs.');
        offer=pricing.plus;
      }
      if(!billingReady(offer))throw fail(503,'Checkout is not open yet. Practice PDFs and payments are being prepared.');
      const matches=o=>o.plan_id===offer.id&&o.course_id===courseId&&o.product_id===productId&&o.track_id===trackId;
      const pending=db.prepare("SELECT * FROM orders WHERE user_id=? AND status='pending' ORDER BY created_at DESC LIMIT 1").get(req.user.id);
      if(pending?.session_id) {
        const existing=await stripe.checkout.sessions.retrieve(pending.session_id);
        if(existing.status==='open') {
          if(matches(pending))return res.json({url:existing.url});
          await stripe.checkout.sessions.expire(existing.id);
        } else if(existing.status==='complete')throw fail(409,'Your previous payment is still being confirmed. Refresh your account shortly.');
        db.prepare("UPDATE orders SET status='expired' WHERE id=?").run(pending.id);
      }
      const reusable=pending&&!pending.session_id?pending:null;
      if(reusable && (!matches(reusable)||now()-reusable.created_at>=23*60*60*1000))throw fail(409,'An earlier checkout needs confirmation. Retry the same purchase or contact support.');
      const selectedPrice=reusable?.stripe_price_id||priceId(offer);
      const price=await stripe.prices.retrieve(selectedPrice);
      const amount=reusable?.expected_amount??offer.amount;
      const currency=reusable?.currency??offer.currency;
      if(!price.active||price.currency!==currency||price.unit_amount!==amount||(offer.mode==='subscription'?(price.recurring?.interval!=='month'||price.recurring?.interval_count!==1):Boolean(price.recurring)))throw fail(503,'This price is temporarily unavailable. Please contact support.');
      let customer=db.prepare('SELECT stripe_customer FROM users WHERE id=?').get(req.user.id).stripe_customer;
      if(!customer){customer=(await stripe.customers.create({email:req.user.email,name:req.user.name},{idempotencyKey:`customer-${req.user.id}`})).id;db.prepare('UPDATE users SET stripe_customer=? WHERE id=?').run(customer,req.user.id);}
      const orderId=reusable?.id||randomUUID();
      const createdAt=reusable?.created_at??now();
      if(!reusable)db.prepare('INSERT INTO orders (id,user_id,plan_id,course_id,product_id,track_id,expected_amount,currency,stripe_price_id,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)').run(orderId,req.user.id,offer.id,courseId,productId,trackId,amount,currency,selectedPrice,createdAt);
      const session=await stripe.checkout.sessions.create({
        mode:offer.mode,customer,client_reference_id:orderId,metadata:{orderId},
        ...(offer.mode==='subscription'?{subscription_data:{metadata:{orderId}}}:{payment_intent_data:{metadata:{orderId}}}),
        line_items:[{price:selectedPrice,quantity:1}],
        success_url:`${origin}/pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${origin}/pricing?checkout=cancelled`,allow_promotion_codes:false,
        expires_at:Math.floor(createdAt/1000)+24*60*60,
      },{idempotencyKey:`checkout-${orderId}`});
      db.prepare('UPDATE orders SET session_id=? WHERE id=?').run(session.id,orderId);
      res.json({url:session.url});
    } finally {locks.delete(req.user.id);}
  }));
  app.post('/api/billing/cancel',auth,route(async(req,res)=>{
    const input=z.object({subscriptionId:z.string().max(255)}).strict().parse(req.body);
    const subscription=db.prepare("SELECT * FROM subscriptions WHERE id=? AND user_id=? AND plan_id='premium'").get(input.subscriptionId,req.user.id);
    if(!stripe||!subscription)throw fail(404,'Premium subscription not found.');
    await stripe.subscriptions.update(subscription.id,{cancel_at_period_end:true});
    await syncSubscription(subscription.id);
    res.json({user:viewUser(req.user)});
  }));
  app.get('/api/billing/status/:id',auth,route(async(req,res)=>{
    const id=z.string().regex(/^cs_[a-zA-Z0-9_]{1,240}$/).parse(req.params.id);
    const order=db.prepare('SELECT status FROM orders WHERE session_id=? AND user_id=?').get(id,req.user.id);
    if(!order)throw fail(404,'Checkout not found for this account.');res.json({status:order.status,user:viewUser(req.user)});
  }));
  app.post('/api/billing/portal',auth,route(async(req,res)=>{
    if(!stripe||!req.user.stripe_customer)throw fail(409,'No billing account is available.');
    const session=await stripe.billingPortal.sessions.create({customer:req.user.stripe_customer,return_url:`${origin}/pricing`});res.json({url:session.url});
  }));
  app.get('/api/download/:courseId/:product',auth,route(async(req,res)=>{
    const courseId=identifier.parse(req.params.courseId);
    const product=z.enum(['core','advanced']).parse(req.params.product);
    const course=courses.find(c=>c.id===courseId);
    if(!course||!availableProduct(course,product))throw fail(404,'This PDF is not available yet.');
    if(!canAccess(req.user.id,course,product))throw fail(403,'Purchase this PDF or choose Premium for its track.');
    const file=fileFor(course,product);
    res.set('X-Robots-Tag','noindex, nofollow');
    res.download(file,`EazyGrades-${course.code.replace(' ','-')}-${product}.pdf`);
  }));
  app.use((req,res)=>res.status(404).json({error:'Not found.'}));
  app.use((error,req,res,next)=>{
    if(res.headersSent)return next(error);
    if(error instanceof z.ZodError)return res.status(400).json({error:'Please check the information you entered.'});
    const status=error.status|| (error.type==='entity.too.large'?413:500);
    res.status(status).json({error:status===500?'Unable to complete this request. Please try again or contact support.':error.message});
  });
  return app;
}
export default createApp;
