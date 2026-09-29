export type Course = {id:string;code:string;title:string;category:string;trackIds?:string[];description:string;practiceKind?:string;coverageNote?:string;sourceUrl?:string;published?:boolean;available?:boolean;products:{id:string;title:string;available?:boolean}[]};
export type Offer = {id:string;name:string;amount:number;currency:string;checkoutEnabled?:boolean};
export type Pricing = {single:Offer;premium:Offer};
export type Track = {id:string;name:string;available?:boolean};
export type Checkout = {kind:'premium';trackId:string}|{kind:'course';courseId:string}|{kind:'pdf';courseId:string;productId:string};
export type User = {name:string;email:string;hasBilling:boolean;accessBlocked:boolean;premium:{trackId:string;expiresAt:number;cancelAtPeriodEnd:boolean}|null;plusPricing:Offer|null;purchasedPdfIds:string[];accessiblePdfIds:string[];subscriptions:{id:string;planId:string;trackId:string|null;status:string;expiresAt:number;cancelAtPeriodEnd:number;blocked:number}[]};
export async function api<T>(path:string,body?:unknown):Promise<T> {
  const response=await fetch(`/api${path}`,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});
  let data;
  try {data=await response.json();}catch{throw new Error('The service is temporarily unavailable. Please try again.');}
  if(!response.ok)throw new Error(data.error||'Something went wrong. Please try again.');
  return data;
}
