import Workspace from '@/components/workspace';
import { configured } from '@/lib/env';
export const dynamic='force-dynamic';
export default function Page(){return <Workspace configured={configured()}/>;}
