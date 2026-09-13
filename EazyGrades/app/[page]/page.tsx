import { notFound } from 'next/navigation';
import Store from '../../components/store';
const pages=['courses','pricing','faq','privacy','terms','refund'];
const titles:Record<string,string>={courses:'Courses',pricing:'Pricing',faq:'Frequently asked questions',privacy:'Privacy Policy',terms:'Terms & Conditions',refund:'Refund Policy'};
export function generateStaticParams(){return pages.map(page=>({page}));}
export async function generateMetadata({params}:{params:Promise<{page:string}>}){const {page}=await params;return {title:titles[page]||'Page not found'};}
export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;if(!pages.includes(page))notFound();return <Store page={page}/>;}
