import { sessionClient } from '@/lib/supabase';
import { env } from '@/lib/env';
import { handled,HttpError } from '@/lib/http';
export async function GET(req:Request){return handled(req,async()=>{const db=await sessionClient();const {data,error}=await db.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${env().APP_ORIGIN}/auth/callback`,queryParams:{prompt:'select_account'}}});if(error||!data.url)throw new HttpError(503,'AUTH_UNAVAILABLE','Google sign-in is not configured yet.');return Response.redirect(data.url);});}
