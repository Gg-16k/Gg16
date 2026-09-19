const {db}=require('./_db');
module.exports=async(req,res)=>{res.status(200).json({ok:true,service:'trust-market-api',database:!!db()});};
