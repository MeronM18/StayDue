-- StayDue private beta. Apply locally first; never reset a remote database.
create extension if not exists pgcrypto;
create schema if not exists private;
revoke all on schema private from public;

create table public.beta_allowlist (email text primary key check (email = lower(email)), created_at timestamptz not null default now());
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 email text not null, display_name text not null default '', timezone text not null default 'America/Detroit',
 onboarding_status text not null default 'pending' check(onboarding_status in ('pending','completed')),
 deleting_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create function public.is_beta_user() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from auth.users u join public.beta_allowlist b on b.email=lower(u.email)
 where u.id=auth.uid() and u.email_confirmed_at is not null
 and exists (select 1 from auth.identities i where i.user_id=u.id and i.provider='google')
 and not exists(select 1 from public.profiles p where p.id=u.id and p.deleting_at is not null));
$$;
revoke all on function public.is_beta_user() from public;
grant execute on function public.is_beta_user() to authenticated;
create function private.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at=now(); return new; end $$;
create table public.semesters (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, name text not null check(length(name) between 1 and 120), start_date date, end_date date, archived_at timestamptz, check(end_date is null or start_date is null or end_date>=start_date), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.semesters(owner_id);
create table public.courses (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, semester_id uuid not null, name text not null check(length(name) between 1 and 200), code text, section text, instructor_name text, instructor_email text, location text, color text default '#436b52', course_url text, lms_provider text, lms_course_id text, lms_url text, foreign key(semester_id,owner_id) references public.semesters(id,owner_id) on delete cascade, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.courses(owner_id);
create table public.documents (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, course_id uuid, storage_path text not null unique, original_filename text not null, mime_type text not null check(mime_type='application/pdf'), size_bytes bigint not null check(size_bytes between 1 and 4194304), document_type text not null default 'syllabus' check(document_type in ('syllabus','assignment','notes','study_guide','schedule','lecture','other')), sha256 text not null, foreign key(course_id,owner_id) references public.courses(id,owner_id) on delete cascade, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.documents(owner_id);
create table public.imports (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, document_id uuid not null, semester_id uuid not null, course_id uuid, import_type text not null default 'syllabus', status text not null default 'uploaded' check(status in ('uploaded','processing','needs_review','confirmed','failed','cancelled')), provider text, model text, raw_result jsonb, normalized_result jsonb, error_code text, error_message text, attempts int not null default 0, processing_started_at timestamptz, completed_at timestamptz, confirmed_at timestamptz, duration_ms int, input_tokens int, output_tokens int, estimated_cost numeric, input_chars int, foreign key(document_id,owner_id) references public.documents(id,owner_id) on delete cascade, foreign key(semester_id,owner_id) references public.semesters(id,owner_id) on delete cascade, foreign key(course_id,owner_id) references public.courses(id,owner_id) on delete cascade, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.imports(owner_id);
create table public.import_candidates (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, import_id uuid not null, entity_type text not null check(entity_type in ('course','meeting','task','grading_component','policy')), candidate_data jsonb not null, source_page int check(source_page>0), source_excerpt text, confidence text not null check(confidence in ('high','medium','low')), accepted boolean not null default true, edited boolean not null default false, foreign key(import_id,owner_id) references public.imports(id,owner_id) on delete cascade, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.import_candidates(owner_id);
create table public.course_meetings (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, course_id uuid not null, day_of_week int not null check(day_of_week between 0 and 6), start_time time not null, end_time time not null, location text, start_date date, end_date date, source_document_id uuid, source_page int, source_excerpt text, confidence text, check(end_time>start_time), check(end_date is null or start_date is null or end_date>=start_date), foreign key(course_id,owner_id) references public.courses(id,owner_id) on delete cascade, foreign key(source_document_id,owner_id) references public.documents(id,owner_id) on delete set null (source_document_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.course_meetings(owner_id);
create table public.grading_components (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, course_id uuid not null, name text not null, weight_percent numeric check(weight_percent between 0 and 100), source_document_id uuid, source_page int, source_excerpt text, confidence text, foreign key(course_id,owner_id) references public.courses(id,owner_id) on delete cascade, foreign key(source_document_id,owner_id) references public.documents(id,owner_id) on delete set null (source_document_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.grading_components(owner_id);
create table public.course_policies (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, course_id uuid not null, policy_type text not null check(policy_type in ('attendance','late_work','makeup_work','grading','extra_credit','office_hours','other')), title text not null, content text not null, source_document_id uuid, source_page int, source_excerpt text, confidence text, foreign key(course_id,owner_id) references public.courses(id,owner_id) on delete cascade, foreign key(source_document_id,owner_id) references public.documents(id,owner_id) on delete set null (source_document_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.course_policies(owner_id);
create table public.integrations (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, provider text not null check(provider in ('canvas','google_calendar','moodle','blackboard','d2l')), status text not null default 'disconnected', encrypted_credentials bytea, external_user_id text, last_sync_at timestamptz, next_sync_at timestamptz, sync_cursor jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.integrations(owner_id);
create table public.activity_events (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, event text not null check(event in ('dashboard_view','calendar_view','task_created','task_completed','import_confirmed')), entity_id uuid, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.activity_events(owner_id);
create table public.tasks (id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade, course_id uuid, title text not null check(length(title) between 1 and 300), description text, task_url text,
 type text not null default 'assignment' check(type in ('assignment','homework','quiz','exam','midterm','final','project','lab','reading','presentation','other')),
 status text not null default 'pending' check(status in ('pending','completed','cancelled')),
 deadline_type text not null default 'none' check(deadline_type in ('none','date_only','exact_time')), due_date date, due_at timestamptz,
 points_possible numeric check(points_possible>=0), weight_percent numeric check(weight_percent between 0 and 100), estimated_minutes int check(estimated_minutes>0), priority int not null default 0 check(priority between 0 and 3),
 source_type text not null default 'manual' check(source_type in ('manual','syllabus','canvas','google_calendar','moodle','blackboard','d2l','other')), source_id text,
 source_document_id uuid, source_page int check(source_page>0), source_excerpt text, confidence text check(confidence in ('high','medium','low')), completed_at timestamptz,
 check((deadline_type='none' and due_date is null and due_at is null) or (deadline_type='date_only' and due_date is not null and due_at is null) or (deadline_type='exact_time' and due_at is not null and due_date is null)),
 check((status='completed')=(completed_at is not null)),
 foreign key(course_id,owner_id) references public.courses(id,owner_id) on delete cascade,
 foreign key(source_document_id,owner_id) references public.documents(id,owner_id) on delete set null (source_document_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(id,owner_id));
create index on public.tasks(owner_id);
alter table public.beta_allowlist enable row level security;
alter table public.profiles enable row level security;
create trigger touch_updated before update on public.profiles for each row execute function private.touch_updated_at();
alter table public.semesters enable row level security;
create trigger touch_updated before update on public.semesters for each row execute function private.touch_updated_at();
alter table public.courses enable row level security;
create trigger touch_updated before update on public.courses for each row execute function private.touch_updated_at();
alter table public.documents enable row level security;
create trigger touch_updated before update on public.documents for each row execute function private.touch_updated_at();
alter table public.imports enable row level security;
create trigger touch_updated before update on public.imports for each row execute function private.touch_updated_at();
alter table public.import_candidates enable row level security;
create trigger touch_updated before update on public.import_candidates for each row execute function private.touch_updated_at();
alter table public.course_meetings enable row level security;
create trigger touch_updated before update on public.course_meetings for each row execute function private.touch_updated_at();
alter table public.grading_components enable row level security;
create trigger touch_updated before update on public.grading_components for each row execute function private.touch_updated_at();
alter table public.course_policies enable row level security;
create trigger touch_updated before update on public.course_policies for each row execute function private.touch_updated_at();
alter table public.integrations enable row level security;
create trigger touch_updated before update on public.integrations for each row execute function private.touch_updated_at();
alter table public.activity_events enable row level security;
create trigger touch_updated before update on public.activity_events for each row execute function private.touch_updated_at();
alter table public.tasks enable row level security;
create trigger touch_updated before update on public.tasks for each row execute function private.touch_updated_at();
create policy own_records on public.semesters for all to authenticated using(owner_id=auth.uid() and public.is_beta_user()) with check(owner_id=auth.uid() and public.is_beta_user());
create policy own_records on public.courses for all to authenticated using(owner_id=auth.uid() and public.is_beta_user()) with check(owner_id=auth.uid() and public.is_beta_user());
create policy own_records on public.tasks for all to authenticated using(owner_id=auth.uid() and public.is_beta_user()) with check(owner_id=auth.uid() and public.is_beta_user());
create policy own_records on public.course_meetings for all to authenticated using(owner_id=auth.uid() and public.is_beta_user()) with check(owner_id=auth.uid() and public.is_beta_user());
create policy own_read on public.profiles for select to authenticated using(id=auth.uid() and public.is_beta_user());
create policy own_read on public.documents for select to authenticated using(owner_id=auth.uid() and public.is_beta_user());
create policy own_read on public.imports for select to authenticated using(owner_id=auth.uid() and public.is_beta_user());
create policy own_read on public.import_candidates for select to authenticated using(owner_id=auth.uid() and public.is_beta_user());
create policy own_read on public.grading_components for select to authenticated using(owner_id=auth.uid() and public.is_beta_user());
create policy own_read on public.course_policies for select to authenticated using(owner_id=auth.uid() and public.is_beta_user());

-- No client write policies for imports/candidates/documents: only validated server operations.
-- Integrations and event telemetry have no client privileges or routes.
revoke all on public.beta_allowlist, public.integrations, public.activity_events from anon, authenticated;
grant all on all tables in schema public to service_role;
grant select on public.profiles,public.documents,public.imports,public.import_candidates,public.grading_components,public.course_policies to authenticated;
grant select,insert,update,delete on public.semesters,public.courses,public.tasks,public.course_meetings to authenticated;
create index on public.tasks(owner_id,status,due_at);
create index on public.tasks(owner_id,status,due_date);
create index on public.courses(semester_id);
create index on public.tasks(course_id);
create index on public.import_candidates(import_id);
create index on public.imports(owner_id,processing_started_at);
create index on public.documents(owner_id,sha256);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('documents','documents',false,4194304,array['application/pdf']);
create policy private_documents_read on storage.objects for select to authenticated using(
 bucket_id='documents' and public.is_beta_user() and exists(
 select 1 from public.documents d where d.storage_path=name and d.owner_id=auth.uid()));
-- Upload/delete through the server only, so metadata and object ownership cannot diverge.

create function public.claim_import(p_id uuid,p_owner uuid) returns public.imports
language plpgsql security definer set search_path='' as $$
declare r public.imports;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_owner::text,0));
 select * into r from public.imports where id=p_id and owner_id=p_owner for update;
 if not found then raise exception 'Import not found'; end if;
 if r.status='processing' and r.processing_started_at>now()-interval '5 minutes' then raise exception 'Import already processing'; end if;
 if r.status not in ('uploaded','failed','processing') then raise exception 'Import cannot be processed'; end if;
 if r.attempts>=5 then raise exception 'Retry limit reached'; end if;
 if exists(select 1 from public.imports where owner_id=p_owner and id<>p_id and status='processing' and processing_started_at>now()-interval '5 minutes') then raise exception 'Another import is processing'; end if;
 if (select count(*) from private.extraction_attempts where owner_id=p_owner and created_at>now()-interval '1 hour')>=5 then raise exception 'Hourly extraction limit reached'; end if;
 insert into private.extraction_attempts(owner_id) values(p_owner);
 update public.imports set status='processing',attempts=attempts+1,processing_started_at=now(),error_code=null,error_message=null where id=p_id returning * into r;
 return r;
end $$;
create table private.extraction_attempts(id uuid primary key default gen_random_uuid(),owner_id uuid references auth.users(id) on delete cascade,created_at timestamptz default now());
create index on private.extraction_attempts(owner_id,created_at);

create function public.save_candidates(p_id uuid,p_owner uuid,p_candidates jsonb,p_result jsonb,p_metrics jsonb) returns void
language plpgsql security definer set search_path='' as $$
declare r public.imports; c jsonb;
begin
 select * into r from public.imports where id=p_id and owner_id=p_owner for update;
 if not found or r.status<>'processing' then raise exception 'Import not processing'; end if;
 delete from public.import_candidates where import_id=p_id;
 for c in select value from jsonb_array_elements(p_candidates) loop
 insert into public.import_candidates(owner_id,import_id,entity_type,candidate_data,source_page,source_excerpt,confidence)
 values(p_owner,p_id,c->>'entity_type',c->'candidate_data',(c->>'source_page')::int,c->>'source_excerpt',c->>'confidence');
 end loop;
 update public.imports set status='needs_review',raw_result=p_result,normalized_result=p_candidates,completed_at=now(),
 provider=p_metrics->>'provider',model=p_metrics->>'model',duration_ms=(p_metrics->>'duration_ms')::int,
 input_tokens=(p_metrics->>'input_tokens')::int,output_tokens=(p_metrics->>'output_tokens')::int,
 estimated_cost=(p_metrics->>'estimated_cost')::numeric,input_chars=(p_metrics->>'input_chars')::int where id=p_id;
end $$;

create function public.review_candidate(p_import uuid,p_owner uuid,p_candidate uuid,p_data jsonb,p_accepted boolean) returns void
language plpgsql security definer set search_path='' as $$
begin
 perform 1 from public.imports where id=p_import and owner_id=p_owner and status='needs_review' for update;
 if not found then raise exception 'Import is not reviewable'; end if;
 update public.import_candidates set edited=edited or candidate_data<>p_data,candidate_data=p_data,accepted=p_accepted
 where id=p_candidate and import_id=p_import and owner_id=p_owner;
 if not found then raise exception 'Candidate not found'; end if;
end $$;

create function public.confirm_import(p_id uuid,p_owner uuid) returns uuid
language plpgsql security definer set search_path='' as $$
declare r public.imports; c public.import_candidates; d jsonb; course uuid;
begin
 select * into r from public.imports where id=p_id and owner_id=p_owner for update;
 if not found then raise exception 'Import not found'; end if;
 if r.status='confirmed' then return r.course_id; end if;
 if r.status<>'needs_review' then raise exception 'Import is not ready'; end if;
 course=r.course_id;
 if course is null then
 select candidate_data into d from public.import_candidates where import_id=p_id and entity_type='course' and accepted order by created_at limit 1;
 if d is null or coalesce(d->>'name','')='' then raise exception 'Accept a course with a name first'; end if;
 insert into public.courses(owner_id,semester_id,name,code,section,instructor_name,instructor_email,location)
 values(p_owner,r.semester_id,d->>'name',d->>'code',d->>'section',d->>'instructor_name',d->>'instructor_email',d->>'location') returning id into course;
 else
 select candidate_data into d from public.import_candidates where import_id=p_id and entity_type='course' and accepted order by created_at limit 1;
 if d is not null then update public.courses set name=coalesce(d->>'name',name),code=coalesce(d->>'code',code),section=coalesce(d->>'section',section),instructor_name=coalesce(d->>'instructor_name',instructor_name),instructor_email=coalesce(d->>'instructor_email',instructor_email),location=coalesce(d->>'location',location) where id=course and owner_id=p_owner; end if;
 end if;
 for c in select * from public.import_candidates where import_id=p_id and accepted loop
 d=c.candidate_data;
 if c.entity_type='task' then
 insert into public.tasks(owner_id,course_id,title,description,type,deadline_type,due_date,due_at,points_possible,weight_percent,source_type,source_id,source_document_id,source_page,source_excerpt,confidence)
 values(p_owner,course,d->>'title',d->>'description',d->>'type',d->>'deadline_type',(d->>'due_date')::date,(d->>'due_at')::timestamptz,(d->>'points_possible')::numeric,(d->>'weight_percent')::numeric,'syllabus',c.id::text,r.document_id,c.source_page,c.source_excerpt,c.confidence);
 elsif c.entity_type='meeting' then
 insert into public.course_meetings(owner_id,course_id,day_of_week,start_time,end_time,location,start_date,end_date,source_document_id,source_page,source_excerpt,confidence)
 values(p_owner,course,(d->>'day_of_week')::int,(d->>'start_time')::time,(d->>'end_time')::time,d->>'location',(d->>'start_date')::date,(d->>'end_date')::date,r.document_id,c.source_page,c.source_excerpt,c.confidence);
 elsif c.entity_type='grading_component' then
 insert into public.grading_components(owner_id,course_id,name,weight_percent,source_document_id,source_page,source_excerpt,confidence)
 values(p_owner,course,d->>'name',(d->>'weight_percent')::numeric,r.document_id,c.source_page,c.source_excerpt,c.confidence);
 elsif c.entity_type='policy' then
 insert into public.course_policies(owner_id,course_id,policy_type,title,content,source_document_id,source_page,source_excerpt,confidence)
 values(p_owner,course,d->>'policy_type',d->>'title',d->>'content',r.document_id,c.source_page,c.source_excerpt,c.confidence);
 end if;
 end loop;
 update public.documents set course_id=course where id=r.document_id;
 update public.imports set status='confirmed',confirmed_at=now(),course_id=course where id=p_id;
 insert into public.activity_events(owner_id,event,entity_id) values(p_owner,'import_confirmed',p_id);
 return course;
end $$;

create function public.complete_onboarding(p_owner uuid,p_email text,p_name text,p_timezone text,p_semester text) returns void
language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(p_owner::text,1));
 if not exists(select 1 from pg_timezone_names where name=p_timezone) then raise exception 'Invalid timezone'; end if;
 if exists(select 1 from public.profiles where id=p_owner and onboarding_status='completed') then return; end if;
 insert into public.profiles(id,email,display_name,timezone,onboarding_status) values(p_owner,p_email,p_name,p_timezone,'completed')
 on conflict(id) do update set display_name=p_name,timezone=p_timezone,onboarding_status='completed';
 insert into public.semesters(owner_id,name) values(p_owner,p_semester);
end $$;
revoke all on function public.claim_import(uuid,uuid) from public,anon,authenticated;
grant execute on function public.claim_import(uuid,uuid) to service_role;
revoke all on function public.save_candidates(uuid,uuid,jsonb,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.save_candidates(uuid,uuid,jsonb,jsonb,jsonb) to service_role;
revoke all on function public.review_candidate(uuid,uuid,uuid,jsonb,boolean) from public,anon,authenticated;
grant execute on function public.review_candidate(uuid,uuid,uuid,jsonb,boolean) to service_role;
revoke all on function public.confirm_import(uuid,uuid) from public,anon,authenticated;
grant execute on function public.confirm_import(uuid,uuid) to service_role;
revoke all on function public.complete_onboarding(uuid,text,text,text,text) from public,anon,authenticated;
grant execute on function public.complete_onboarding(uuid,text,text,text,text) to service_role;
