-- Synthetic local beta fixtures only. No real student information.
insert into public.beta_allowlist(email) values ('alice@example.test'),('bob@example.test') on conflict do nothing;
-- These identities are LOCAL test doubles for Google; never seed production.
insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,confirmation_token,recovery_token,email_change_token_new,email_change)
select '00000000-0000-0000-0000-000000000000',v.id::uuid,'authenticated','authenticated',v.email,crypt('local-test-password',gen_salt('bf')),now(),'{"provider":"google","providers":["google","email"]}'::jsonb,'{"full_name":"Local Tester"}'::jsonb,now(),now(),'','','',''
from (values('11111111-1111-4111-8111-111111111111','alice@example.test'),('22222222-2222-4222-8222-222222222222','bob@example.test')) as v(id,email) on conflict(id) do nothing;
insert into auth.identities(id,user_id,provider_id,identity_data,provider,created_at,updated_at)
select gen_random_uuid(),id,id::text,jsonb_build_object('sub',id::text,'email',email,'email_verified',true),'google',now(),now() from auth.users where email in ('alice@example.test','bob@example.test') on conflict do nothing;
insert into auth.identities(id,user_id,provider_id,identity_data,provider,created_at,updated_at)
select gen_random_uuid(),id,id::text,jsonb_build_object('sub',id::text,'email',email,'email_verified',true),'email',now(),now() from auth.users where email in ('alice@example.test','bob@example.test') on conflict do nothing;
