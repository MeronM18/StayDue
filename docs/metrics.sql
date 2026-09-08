-- Administrative beta report. No student content returned.
select count(*) as profiles,
 count(*) filter(where onboarding_status='completed') as onboarded
from profiles;
select status,count(*),avg(duration_ms) as average_duration_ms,avg(estimated_cost) as average_estimated_usd
from imports group by status;
select count(*) as extracted,count(*) filter(where edited) as edited,
 count(*) filter(where not accepted) as rejected,
 count(*) filter(where accepted and not edited) as unchanged
from import_candidates;
select avg(i.confirmed_at-u.created_at) as time_to_first_confirm
from auth.users u join lateral(select min(confirmed_at) as confirmed_at from imports where owner_id=u.id) i on true;
select count(distinct owner_id) as weekly_active from activity_events where created_at>now()-interval '7 days';
select event,count(*) from activity_events where created_at>now()-interval '7 days' group by event;
