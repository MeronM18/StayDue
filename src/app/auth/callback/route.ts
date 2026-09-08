import { sessionClient } from '@/lib/supabase';
import { env } from '@/lib/env';
export async function GET(req:Request){const db=await sessionClient(),code=new URL(req.url).searchParams.get('code');if(code){const {error}=await db.auth.exchangeCodeForSession(code);if(!error){const {data:allowed}=await db.rpc('is_beta_user');if(allowed)return Response.redirect(env().APP_ORIGIN);await db.auth.signOut();}}return Response.redirect(`${env().APP_ORIGIN}/?auth_error=1`);}
