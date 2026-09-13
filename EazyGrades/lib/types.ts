export type Course = {id:string;code:string;title:string;category:string;description:string;practiceKind?:string;coverageNote?:string;sourceUrl?:string;published?:boolean;available?:boolean;products:{id:string;title:string}[]};
export type Plan = {id:string;name:string;amount:number;currency:string;period:string;description:string;scope:string;features:string[];checkoutEnabled?:boolean};
export type User = {name:string;email:string;hasBilling:boolean;accessibleCourseIds:string[];subscriptions:{planId:string;courseId:string|null;status:string;expiresAt:number;cancelAtPeriodEnd:number;blocked:number}[]};
export async function api<T>(path:string,body?:unknown):Promise<T> {
  const response=await fetch(`/api${path}`,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});
  let data;
  try {data=await response.json();}catch{throw new Error('The service is temporarily unavailable. Please try again.');}
  if(!response.ok)throw new Error(data.error||'Something went wrong. Please try again.');
  return data;
}
