import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { env } from './env';
import type { Database } from './database.types';
export async function sessionClient(){const e=env(),jar=await cookies();return createServerClient<Database>(e.NEXT_PUBLIC_SUPABASE_URL,e.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{cookies:{getAll:()=>jar.getAll(),setAll:values=>{for(const {name,value,options} of values)jar.set(name,value,{...options,secure:new URL(e.APP_ORIGIN).protocol==='https:',sameSite:'lax'});}}});}
export function adminClient(){const e=env();return createClient<Database>(e.NEXT_PUBLIC_SUPABASE_URL,e.SUPABASE_SECRET_KEY,{auth:{persistSession:false,autoRefreshToken:false}});}
