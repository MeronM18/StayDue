import 'server-only';
import { z } from 'zod';
const schema = z.object({NEXT_PUBLIC_SUPABASE_URL:z.url(),NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:z.string().min(1),SUPABASE_SECRET_KEY:z.string().min(1),APP_ORIGIN:z.url()});
export function env(){const e=schema.parse(process.env);const local=['localhost','127.0.0.1','[::1]'].includes(new URL(e.NEXT_PUBLIC_SUPABASE_URL).hostname);if(process.env.NODE_ENV!=='production'&&!local)throw Error('Development must use local Supabase. Run npm run db:env.');if(process.env.VERCEL_ENV==='preview'&&!local)throw Error('Hosted database access is disabled in previews.');return e;}
export function configured(){return !!process.env.NEXT_PUBLIC_SUPABASE_URL&&!!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY&&!!process.env.SUPABASE_SECRET_KEY;}
