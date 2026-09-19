import { db } from '../lib/db.js';
import { body,clean,json,admin,ref } from '../lib/http.js';

export default async function handler(req){
  try{
    const sql=db();
    if(req.method==='POST'){
      const x=await body(req); const items=Array.isArray(x?.items)?x.items.slice(0,30):[];
      if(!clean(x?.customerName,120)||!clean(x?.customerPhone,40)||!items.length||!Number.isFinite(Number(x.amount))||!['CBE','Telebirr'].includes(x.paymentMethod)) return json({ok:false,error:'Incomplete order'},400);
      const publicRef=ref();
      await sql`INSERT INTO orders(public_ref,customer_name,customer_phone,customer_contact,items,amount,payment_method,receipt_data,payment_reference) VALUES(${publicRef},${clean(x.customerName,120)},${clean(x.customerPhone,40)},${clean(x.customerContact,120)},${JSON.stringify(items)},${Number(x.amount)},${x.paymentMethod},${clean(x.receiptData,2200000)},${clean(x.paymentReference,120)})`;
      return json({ok:true,publicRef,status:'payment_review',message:'Order submitted for payment review.'},201);
    }
    if(req.method==='GET'){
      if(!admin(req)) return json({ok:false,error:'Unauthorized'},401);
      const rows=await sql`SELECT id,public_ref,customer_name,customer_phone,customer_contact,items,amount,payment_method,payment_reference,status,admin_note,created_at FROM orders ORDER BY created_at DESC LIMIT 200`;
      return json({ok:true,orders:rows});
    }
    if(req.method==='PATCH'){
      if(!admin(req)) return json({ok:false,error:'Unauthorized'},401);
      const x=await body(req); const id=Number(x?.id); const status=clean(x?.status,30);
      if(!id||!['paid','rejected','completed'].includes(status)) return json({ok:false,error:'Invalid request'},400);
      await sql`UPDATE orders SET status=${status},admin_note=${clean(x.note,1000)},updated_at=NOW() WHERE id=${id}`;
      return json({ok:true});
    }
    return json({ok:false,error:'Method not allowed'},405);
  }catch(e){return json({ok:false,error:e.message},500)}
}
