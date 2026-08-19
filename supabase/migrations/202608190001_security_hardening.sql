-- Security hardening for the current lead/content workflow.
-- The service role may write audit events from trusted server code; clients may only read them through RLS.
drop policy if exists audit_staff_insert on public.audit_logs;
revoke insert, update, delete on public.audit_logs from anon, authenticated;

comment on table public.booking_requests is 'Legacy scheduling model. Not used by the current public advisor-call flow.';
comment on table public.booking_slots is 'Legacy scheduling model. Not used by the current public advisor-call flow.';
