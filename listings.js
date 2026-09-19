import { db } from '../lib/db.js';
import { body,clean,json,admin } from '../lib/http.js';

export default async function handler(req){
  try{
    const sql=db();
    if(req.method==='GET'){
      const url=new URL(req.url); const category=clean(url.searchParams.get('category'),40);
      const rows=category?await sql`SELECT id,category,role,title,description,price,location,media_url,created_at FROM listings WHERE status='approved' AND category=${category} ORDER BY created_at DESC LIMIT 100`:await sql`SELECT id,category,role,title,description,price,location,media_url,created_at FROM listings WHERE status='approved' ORDER BY created_at DESC LIMIT 100`;
      return json({ok:true,listings:rows});
    }
    if(req.method==='POST'){
      const x=await body(req);
      const required=['category','role','title','description','ownerName','ownerPhone'];
      if(!x||required.some(k=>!clean(x[k]))) return json({ok:false,error:'Missing required fields'},400);
      const rows=await sql`INSERT INTO listings(category,role,title,description,price,location,media_url,owner_name,owner_phone,owner_contact) VALUES(${clean(x.category,40)},${clean(x.role,20)},${clean(x.title,180)},${clean(x.description)},${clean(x.price,80)},${clean(x.location,120)},${clean(x.mediaUrl,500)},${clean(x.ownerName,120)},${clean(x.ownerPhone,40)},${clean(x.ownerContact,120)}) RETURNING id,created_at`;
      return json({ok:true,id:rows[0].id,status:'pending',message:'Submission received for review.'},201);
    }
    if(req.method==='PATCH'){
      if(!admin(req)) return json({ok:false,error:'Unauthorized'},401);
      const x=await body(req); const id=Number(x?.id); const status=clean(x?.status,20);
      if(!id||!['approved','rejected','archived'].includes(status)) return json({ok:false,error:'Invalid request'},400);
      await sql`UPDATE listings SET status=${status},admin_note=${clean(x.note,1000)},updated_at=NOW() WHERE id=${id}`;
      return json({ok:true});
    }
    return json({ok:false,error:'Method not allowed'},405);
  }catch(e){return json({ok:false,error:e.message},500)}
}
