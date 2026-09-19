import { db } from '../lib/db.js';
import { body,clean,json,admin } from '../lib/http.js';
export default async function handler(req){
 try{const sql=db();
  if(req.method==='GET'){const rows=await sql`SELECT id,name,rating,body,created_at FROM reviews WHERE status='approved' ORDER BY created_at DESC LIMIT 50`;return json({ok:true,reviews:rows});}
  if(req.method==='POST'){const x=await body(req);const rating=Number(x?.rating);if(!clean(x?.name,120)||!clean(x?.body,2000)||rating<1||rating>5)return json({ok:false,error:'Invalid review'},400);const r=await sql`INSERT INTO reviews(name,rating,body) VALUES(${clean(x.name,120)},${rating},${clean(x.body,2000)}) RETURNING id`;return json({ok:true,id:r[0].id,status:'pending'},201)}
  if(req.method==='PATCH'){if(!admin(req))return json({ok:false,error:'Unauthorized'},401);const x=await body(req);const id=Number(x?.id),status=clean(x?.status,20);if(!id||!['approved','rejected'].includes(status))return json({ok:false,error:'Invalid request'},400);await sql`UPDATE reviews SET status=${status} WHERE id=${id}`;return json({ok:true})}
  return json({ok:false,error:'Method not allowed'},405);
 }catch(e){return json({ok:false,error:e.message},500)}
}
