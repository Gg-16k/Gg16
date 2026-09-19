const { neon } = require('@neondatabase/serverless');
function db(){ if(!process.env.DATABASE_URL) return null; return neon(process.env.DATABASE_URL); }
function admin(req){ const token=process.env.ADMIN_TOKEN; return !!token && req.headers.authorization===`Bearer ${token}`; }
module.exports={db,admin};
