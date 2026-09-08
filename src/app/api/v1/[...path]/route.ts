import { route } from '@/modules/router';
import { handled } from '@/lib/http';
export const runtime='nodejs';
export const maxDuration=120;
export const dynamic='force-dynamic';
async function handle(req:Request,ctx:{params:Promise<{path:string[]}>}){return handled(req,async()=>route(req,(await ctx.params).path));}
export {handle as GET,handle as POST,handle as PATCH,handle as DELETE};
