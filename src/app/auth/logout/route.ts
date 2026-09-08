import { authorize } from '@/modules/accounts';
import { handled,response } from '@/lib/http';
export async function POST(req:Request){return handled(req,async()=>{const {db}=await authorize(req);await db.auth.signOut();return response({signed_out:true});});}
