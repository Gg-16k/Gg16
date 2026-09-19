export function json(data,status=200){
  return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
}
export async function body(req){
  try{return await req.json();}catch{return null;}
}
export function clean(v,max=2000){return typeof v==='string'?v.trim().slice(0,max):'';}
export function admin(req){
  const expected=process.env.ADMIN_TOKEN;
  const got=req.headers.get('authorization')?.replace(/^Bearer\s+/i,'');
  return !!expected && !!got && got===expected;
}
export function ref(){return 'TM-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,7).toUpperCase();}
