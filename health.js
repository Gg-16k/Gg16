import { assertDb } from '../lib/db.js';
export default async function handler(){
  return new Response(JSON.stringify({ok:true,service:'trust-market-api',database:assertDb().configured?'configured':'not-configured'}),{headers:{'content-type':'application/json'}});
}
