import { neon } from '@neondatabase/serverless';

export function db(){
  const url=process.env.DATABASE_URL;
  if(!url) throw new Error('DATABASE_URL is not configured');
  return neon(url);
}

export function assertDb(){
  if(!process.env.DATABASE_URL) return {configured:false};
  return {configured:true};
}
