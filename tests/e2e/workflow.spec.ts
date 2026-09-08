import {test,expect,type BrowserContext} from '@playwright/test';
import {createServerClient} from '@supabase/ssr';
import {createClient} from '@supabase/supabase-js';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {PDFDocument,StandardFonts} from 'pdf-lib';
const status=JSON.parse(execFileSync('node_modules/.bin/supabase',['status','-o','json'],{encoding:'utf8'}));
if(!['localhost','127.0.0.1'].includes(new URL(status.API_URL).hostname))throw Error('E2E must use local Supabase');
const admin=createClient(status.API_URL,status.SERVICE_ROLE_KEY);
async function login(context:BrowserContext,email='alice@example.test'){const db=createServerClient(status.API_URL,status.ANON_KEY,{cookies:{getAll:()=>[],setAll:async cookies=>{await context.addCookies(cookies.map(c=>({name:c.name,value:c.value,domain:'localhost',path:'/',httpOnly:false,secure:false,sameSite:'Lax' as const})));}}});const result=await db.auth.signInWithPassword({email,password:'local-test-password'});if(result.error)throw result.error;return result.data;}
test('syllabus review creates coursework once, calendar, completion, export',async({page,context})=>{
 // Reset only the synthetic user's records, never a remote/project database.
 const uid='11111111-1111-4111-8111-111111111111';
 const {data:docs}=await admin.from('documents').select('storage_path').eq('owner_id',uid);if(docs?.length)await admin.storage.from('documents').remove(docs.map(d=>d.storage_path));
 await admin.from('documents').delete().eq('owner_id',uid);await admin.from('semesters').delete().eq('owner_id',uid);await admin.from('profiles').delete().eq('id',uid);
 await login(context);await page.goto('/');await expect(page.getByText('Make this semester yours')).toBeVisible();
 await page.getByLabel('Display name',{exact:true}).fill('Alice');await page.getByLabel('Timezone',{exact:true}).fill('America/Detroit');await page.getByLabel('First semester').fill('Fall 2026');await page.getByRole('button',{name:'Save and explore'}).click();await expect(page.getByText('Your semester is ready.',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Upload syllabus',exact:false}).click();const pdf=await PDFDocument.create(),font=await pdf.embedFont(StandardFonts.Helvetica);pdf.addPage().drawText(readFileSync('tests/fixtures/syllabus.txt','utf8'),{x:30,y:700,size:12,font});
 await page.getByLabel('PDF syllabus',{exact:true}).setInputFiles({name:'synthetic-syllabus.pdf',mimeType:'application/pdf',buffer:Buffer.from(await pdf.save())});await page.getByRole('button',{name:'Upload and analyze'}).click();
 await expect(page.getByRole('dialog',{name:'Review your syllabus'})).toBeVisible({timeout:60000});
 const {data:before}=await admin.from('tasks').select('id').eq('owner_id',uid);expect(before).toHaveLength(0);
 await page.getByRole('button',{name:'Confirm selected items'}).click();await expect(page.getByText('Your semester is organized.',{exact:false})).toBeVisible();
 const {data:imports}=await admin.from('imports').select('id').eq('owner_id',uid);const repeat=await page.request.post(`/api/v1/imports/${imports![0].id}/confirm`,{headers:{Origin:'http://localhost:3000'},data:{}});expect(repeat.ok()).toBe(true);const {data:after}=await admin.from('tasks').select('id').eq('owner_id',uid);expect(after).toHaveLength(2);
 await page.getByRole('button',{name:'Tasks',exact:true}).click();await expect(page.getByText('Homework 1',{exact:true})).toBeVisible();await page.getByRole('checkbox',{name:'Complete Homework 1'}).check();await page.getByLabel('Status',{exact:true}).selectOption('completed');await expect(page.getByText('Homework 1',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Calendar',exact:true}).click();await page.getByLabel('Month',{exact:true}).fill('2026-10');await expect(page.getByText('Midterm',{exact:false}).first()).toBeVisible();await page.getByRole('button',{name:'Agenda view'}).click();await expect(page.getByText('Computer Organization',{exact:false}).first()).toBeVisible();
 const exported=await page.request.get('/api/v1/export?format=json');expect(exported.ok()).toBe(true);expect((await exported.json()).tasks).toHaveLength(2);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test('anonymous and cross-origin mutations denied',async({page,context})=>{const anonymous=await page.request.get('/api/v1/tasks');expect(anonymous.status()).toBe(401);await login(context);const forged=await page.request.post('/api/v1/tasks',{headers:{Origin:'https://evil.example'},data:{title:'forged'}});expect(forged.status()).toBe(403);});
