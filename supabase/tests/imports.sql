begin;
create extension if not exists pgtap with schema extensions;
select plan(8);
insert into public.semesters(id,owner_id,name) values('cccccccc-0000-4000-8000-000000000001','11111111-1111-4111-8111-111111111111','Import semester');
insert into public.documents(id,owner_id,storage_path,original_filename,mime_type,size_bytes,sha256) values('cccccccc-0000-4000-8000-000000000002','11111111-1111-4111-8111-111111111111','test/import.pdf','syllabus.pdf','application/pdf',100,'test');
insert into public.imports(id,owner_id,document_id,semester_id,status) values('cccccccc-0000-4000-8000-000000000003','11111111-1111-4111-8111-111111111111','cccccccc-0000-4000-8000-000000000002','cccccccc-0000-4000-8000-000000000001','needs_review');
insert into public.import_candidates(owner_id,import_id,entity_type,candidate_data,confidence) values
('11111111-1111-4111-8111-111111111111','cccccccc-0000-4000-8000-000000000003','course','{"name":"Imported course"}','high'),
('11111111-1111-4111-8111-111111111111','cccccccc-0000-4000-8000-000000000003','task','{"title":"Imported task","type":"homework","deadline_type":"date_only","due_date":"2026-09-14"}','high');
select is((select count(*)::int from public.tasks where source_type='syllabus'),0,'Candidates are not official tasks');
select lives_ok($$select public.confirm_import('cccccccc-0000-4000-8000-000000000003','11111111-1111-4111-8111-111111111111')$$,'Confirm succeeds');
select is((select count(*)::int from public.tasks where source_document_id='cccccccc-0000-4000-8000-000000000002'),1,'Exactly one task created');
select lives_ok($$select public.confirm_import('cccccccc-0000-4000-8000-000000000003','11111111-1111-4111-8111-111111111111')$$,'Repeated confirm succeeds');
select is((select count(*)::int from public.tasks where source_document_id='cccccccc-0000-4000-8000-000000000002'),1,'Repeated confirm creates no duplicates');
select is((select status from public.imports where id='cccccccc-0000-4000-8000-000000000003'),'confirmed','Import records final state');
select throws_ok($$select public.review_candidate('cccccccc-0000-4000-8000-000000000003','11111111-1111-4111-8111-111111111111',gen_random_uuid(),'{}',true)$$,'P0001',null,'Confirmed candidates cannot be edited');
select throws_ok($$select public.confirm_import('cccccccc-0000-4000-8000-000000000003','22222222-2222-4222-8222-222222222222')$$,'P0001',null,'Wrong owner cannot confirm');
select * from finish();
rollback;
