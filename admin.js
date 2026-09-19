import { db } from '../lib/db.js';
import { json,admin } from '../lib/http.js';
export default async function handler(req){
 if(!admin(req)) return json({ok:false,error:'Unauthorized'},401);
 try{const sql=db();const [listings,orders,reviews]=await Promise.all([
  sql`SELECT id,category,role,title,description,price,location,owner_name,owner_phone,owner_contact,status,admin_note,created_at FROM listings ORDER BY created_at DESC LIMIT 200`,
  sql`SELECT id,public_ref,customer_name,customer_phone,customer_contact,items,amount,payment_method,payment_reference,receipt_data,status,admin_note,created_at FROM orders ORDER BY created_at DESC LIMIT 200`,
  sql`SELECT id,name,rating,body,status,created_at FROM reviews ORDER BY created_at DESC LIMIT 200`
 ]);return json({ok:true,listings,orders,reviews});}catch(e){return json({ok:false,error:e.message},500)}
}
