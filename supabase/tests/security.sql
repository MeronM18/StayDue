begin;
create extension if not exists pgtap with schema extensions;
select plan(22);
insert into public.semesters(id,owner_id,name) values
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111','Alice semester'),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222','Bob semester');
insert into public.courses(id,owner_id,semester_id,name) values
('aaaaaaaa-0000-4000-8000-000000000001','11111111-1111-4111-8111-111111111111','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','Alice course'),
('bbbbbbbb-0000-4000-8000-000000000001','22222222-2222-4222-8222-222222222222','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','Bob course');
insert into public.documents(id,owner_id,course_id,storage_path,original_filename,mime_type,size_bytes,sha256) values
('bbbbbbbb-0000-4000-8000-000000000002','22222222-2222-4222-8222-222222222222','bbbbbbbb-0000-4000-8000-000000000001','22222222-2222-4222-8222-222222222222/bob.pdf','bob.pdf','application/pdf',100,'hash');
insert into storage.objects(bucket_id,name) values('documents','22222222-2222-4222-8222-222222222222/bob.pdf');
insert into public.imports(id,owner_id,document_id,semester_id) values('bbbbbbbb-0000-4000-8000-000000000003','22222222-2222-4222-8222-222222222222','bbbbbbbb-0000-4000-8000-000000000002','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');
set local role authenticated;
set local request.jwt.claims='{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated"}';
select ok(public.is_beta_user(),'Invited verified Google identity allowed');
select is((select count(*)::int from public.semesters),1,'Only own semester visible');
select is((select count(*)::int from public.courses),1,'Only own course visible');
select is((select count(*)::int from public.documents),0,'Other student document hidden');
select is((select count(*)::int from public.imports),0,'Other student import hidden');
select is((select count(*)::int from storage.objects),0,'Other student object hidden');
select throws_ok($$insert into public.tasks(owner_id,course_id,title) values('11111111-1111-4111-8111-111111111111','bbbbbbbb-0000-4000-8000-000000000001','forged')$$,'23503',null,'Cross-owner task relationship rejected');
select throws_ok($$insert into public.courses(owner_id,semester_id,name) values('11111111-1111-4111-8111-111111111111','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','forged')$$,'23503',null,'Cross-owner semester relationship rejected');
select throws_ok($$insert into public.tasks(owner_id,title) values('22222222-2222-4222-8222-222222222222','forged')$$,'42501',null,'Owner forgery denied');
select throws_ok($$select * from public.beta_allowlist$$,'42501',null,'Allowlist is private');
select throws_ok($$select * from public.integrations$$,'42501',null,'Integration credentials inaccessible');
select throws_ok($$select public.confirm_import('bbbbbbbb-0000-4000-8000-000000000003','22222222-2222-4222-8222-222222222222')$$,'42501',null,'Clients cannot invoke privileged confirmation');
select throws_ok($$insert into public.documents(owner_id,storage_path,original_filename,mime_type,size_bytes,sha256) values('11111111-1111-4111-8111-111111111111','x','x','application/pdf',100,'x')$$,'42501',null,'Clients cannot bypass validated uploads');
select throws_ok($$insert into public.tasks(owner_id,title,deadline_type,due_date) values('11111111-1111-4111-8111-111111111111','x','none','2026-09-01')$$,'23514',null,'Deadline combination constraint');
select lives_ok($$insert into public.tasks(owner_id,title) values('11111111-1111-4111-8111-111111111111','Personal')$$,'Own personal tasks work');
update public.courses set name='tampered' where id='bbbbbbbb-0000-4000-8000-000000000001';
reset role;
select is((select name from public.courses where id='bbbbbbbb-0000-4000-8000-000000000001'),'Bob course','Cross-owner update has no effect');
-- Service role still cannot attach another student's document through composite FK.
select throws_ok($$insert into public.imports(owner_id,document_id,semester_id) values('11111111-1111-4111-8111-111111111111','bbbbbbbb-0000-4000-8000-000000000002','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa')$$,'23503',null,'Import document ownership enforced in database');
set local role authenticated;
set local request.jwt.claims='{"sub":"99999999-9999-4999-8999-999999999999","role":"authenticated"}';
select is(public.is_beta_user(),false,'Unknown identity denied');
select is((select count(*)::int from public.tasks),0,'Unknown identity cannot read tasks');
reset role;
insert into public.profiles(id,email,deleting_at) values('11111111-1111-4111-8111-111111111111','alice@example.test',now()) on conflict(id) do update set deleting_at=now();
set local role authenticated;
set local request.jwt.claims='{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated"}';
select is(public.is_beta_user(),false,'Deleting account immediately denied');
select is((select count(*)::int from public.tasks),0,'Deleting account cannot use a stale token');
reset role;
delete from auth.users where id='11111111-1111-4111-8111-111111111111';
set local role authenticated;
select is(public.is_beta_user(),false,'Deleted account with stale JWT denied');
select * from finish();
rollback;
