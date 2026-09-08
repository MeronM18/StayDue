import {execFileSync} from 'node:child_process';
import {writeFileSync,readFileSync,existsSync} from 'node:fs';
const cli='node_modules/.bin/supabase';
const action=process.argv[2];
if(process.argv.length!==3||!['reset','test','types','env'].includes(action))throw Error('Only local reset/test/types/env are supported. No remote arguments allowed.');
if(process.env.SUPABASE_DB_URL||process.env.DATABASE_URL)throw Error('Unset remote database overrides before local operations.');
const status=JSON.parse(execFileSync(cli,['status','-o','json'],{encoding:'utf8',stdio:['ignore','pipe','inherit']}));
for(const name of ['API_URL','DB_URL'])if(!['127.0.0.1','localhost'].includes(new URL(status[name]).hostname))throw Error('Refusing non-local database');
if(action==='reset')execFileSync(cli,['db','reset','--local'],{stdio:'inherit'});
if(action==='test')execFileSync(cli,['test','db'],{stdio:'inherit'});
if(action==='types')writeFileSync('src/lib/database.types.ts',execFileSync(cli,['gen','types','typescript','--local'],{encoding:'utf8'}));
if(action==='env'){
 const path='.env.local',old=existsSync(path)?readFileSync(path,'utf8'):'';
 const keys=['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY','SUPABASE_SECRET_KEY','APP_ORIGIN'];
 // Preserve legacy credentials, but app only uses explicit local NEXT_PUBLIC variables.
 const kept=old.split('\n').filter(l=>!keys.includes(l.split('=')[0]));
 if(old&&!existsSync('.env.production.backup'))writeFileSync('.env.production.backup',old,{mode:0o600});
 writeFileSync(path,kept.join('\n').trim()+'\n'+`NEXT_PUBLIC_SUPABASE_URL=${status.API_URL}\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${status.ANON_KEY}\nSUPABASE_SECRET_KEY=${status.SERVICE_ROLE_KEY}\nAPP_ORIGIN=http://localhost:3000\n`,{mode:0o600});
 console.log('Local environment configured. No credentials printed.');
}
