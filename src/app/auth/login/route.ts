import { sessionClient } from '@/lib/supabase';
import { env } from '@/lib/env';
import { handled,HttpError } from '@/lib/http';
export async function GET(req:Request){return handled(req,async()=>{const db=await sessionClient();const {data,error}=await db.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${env().APP_ORIGIN}/auth/callback`,queryParams:{prompt:'select_account'}}});console.log('OAuth response:',{error,data,hasUrl:!!data?.url});if(error){console.error('OAuth error:',error);throw new HttpError(503,'AUTH_UNAVAILABLE',`Google sign-in error: ${error.message}`);}if(!data.url){console.error('No URL returned',data);throw new HttpError(503,'AUTH_UNAVAILABLE','Google sign-in is not configured yet.');}return Response.redirect(data.url);});}
