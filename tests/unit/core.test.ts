import {describe,it,expect} from 'vitest';
import {dashboard,isOverdue,localToInstant,calendarEvents,rankTasks} from '@/lib/dates';
import {taskInput,extractionSchema,type Task} from '@/lib/contracts';
import {normalize,readPdf} from '@/modules/syllabus';
import {csvCell} from '@/modules/export';
import fixture from '../fixtures/extraction.json';
import {readFileSync} from 'node:fs';
import {PDFDocument,StandardFonts} from 'pdf-lib';
const base={...taskInput.parse({title:'Test'}),id:'1',owner_id:'u',source_type:'manual',source_document_id:null,source_page:null,source_excerpt:null,confidence:null,completed_at:null,created_at:'',updated_at:''} as Task;
const zone='America/Detroit';
describe('deadlines',()=>{
 it('date only is not overdue before local midnight',()=>{const t={...base,deadline_type:'date_only',due_date:'2026-09-14'} as Task;expect(isOverdue(t,zone,new Date('2026-09-15T03:59:59Z'))).toBe(false);expect(isOverdue(t,zone,new Date('2026-09-15T04:00:00Z'))).toBe(true);});
 it('exact deadline keeps its instant',()=>{const t={...base,deadline_type:'exact_time',due_at:'2026-09-14T20:00:00Z'} as Task;expect(isOverdue(t,zone,new Date('2026-09-14T20:01:00Z'))).toBe(isOverdue(t,'Asia/Tokyo',new Date('2026-09-14T20:01:00Z')));});
 it('rejects DST gap and overlap',()=>{expect(()=>localToInstant('2026-03-08','02:30',zone)).toThrow();expect(()=>localToInstant('2026-11-01','01:30',zone)).toThrow();});
 it('validates all deadline combinations',()=>{expect(taskInput.safeParse({title:'T',deadline_type:'none',due_date:'2026-09-01'}).success).toBe(false);expect(taskInput.safeParse({title:'T',deadline_type:'date_only',due_date:'2026-02-30'}).success).toBe(false);});
 it('keeps cancelled out and completed separate',()=>{const d=dashboard([base,{...base,id:'2',status:'completed'},{...base,id:'3',status:'cancelled'}],zone);expect(d.unscheduled).toHaveLength(1);expect(d.completed).toHaveLength(1);});
 it('ranks overdue ahead of future work',()=>{const a={...base,id:'a',deadline_type:'date_only',due_date:'2026-09-01'} as Task,b={...a,id:'b',due_date:'2026-10-01'};expect(rankTasks([b,a],zone,new Date('2026-09-15'))[0].id).toBe('a');});
 it('bounds calendar requests',()=>expect(()=>calendarEvents([],[],[],[],zone,'2026-01-01','2026-12-31')).toThrow());
});
describe('extraction review contracts',()=>{
 it('normalizes every entity with provenance',()=>{const c=normalize(extractionSchema.parse(fixture),[readFileSync('tests/fixtures/syllabus.txt','utf8')]);expect(c).toHaveLength(6);expect(c.every(x=>x.source_page===1&&x.confidence==='high')).toBe(true);expect(c[2].candidate_data.title).toBe('Homework 1');});
 it('downgrades unsupported citations',()=>{expect(normalize(extractionSchema.parse(fixture),['unrelated'])[0].confidence).toBe('low');});
 it('rejects impossible structured output',()=>expect(extractionSchema.safeParse({...fixture,tasks:[{...fixture.tasks[0],type:'invented'}]}).success).toBe(false));
 it('preserves unknown dates instead of guessing years',()=>{const f=structuredClone(fixture);f.tasks[0]={...f.tasks[0],deadline_type:'none',due_date:null as unknown as string};expect(normalize(extractionSchema.parse(f),['Homework 1 due September 14'])[2].candidate_data.due_date).toBeNull();});
 it('allows a syllabus without assignments',()=>expect(normalize(extractionSchema.parse({...fixture,tasks:[]}),['x']).filter(c=>c.entity_type==='task')).toHaveLength(0));
});
describe('PDF parsing',()=>{
 it('rejects malformed files',async()=>{await expect(readPdf(new TextEncoder().encode('not a pdf'))).rejects.toThrow();});
 it.each(['simple','table-heavy','multi-page','no-schedule','missing-year','conflicting-dates','multiple-grading'])('reads synthetic %s PDFs',async(kind)=>{const p=await PDFDocument.create(),font=await p.embedFont(StandardFonts.Helvetica);const texts=kind==='multi-page'?['Course details','Homework due September 14, 2026']:kind==='conflicting-dates'?['Homework due September 14, 2026 and September 17, 2026']:kind==='missing-year'?['Homework due October 17; year is not stated']:kind==='no-schedule'?['Course policies and office hours; no assignment schedule is given']:kind==='multiple-grading'?['Undergraduate: Homework 20%','Graduate: Homework 30%']:[readFileSync('tests/fixtures/syllabus.txt','utf8')];for(const t of texts){const page=p.addPage();page.drawText(t,{x:30,y:700,size:10,font});}const pages=await readPdf(await p.save());expect(pages.length).toBe(texts.length);});
 it('rejects image-only/empty PDFs',async()=>{const p=await PDFDocument.create();p.addPage();await expect(readPdf(await p.save())).rejects.toThrow('readable');});
 it('bounds page count',async()=>{const p=await PDFDocument.create();for(let i=0;i<61;i++)p.addPage();await expect(readPdf(await p.save())).rejects.toThrow('60 pages');});
});
it('escapes formula injection and quotes',()=>{expect(csvCell('=HYPERLINK("x")')).toBe('"\'=HYPERLINK(""x"")"');expect(csvCell('normal')).toBe('"normal"');});
