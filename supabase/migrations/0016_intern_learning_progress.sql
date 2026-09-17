-- Real per-intern lesson completion, replacing the hardcoded lesson/module
-- "status" fields in INTERN_LEARNING_MODULES (mock-data.ts) — those showed
-- the exact same "Alex Kumar completed Git" progress to every intern
-- regardless of who actually signed in. The curriculum CONTENT (module
-- and lesson titles, topics, lesson text) stays authored/static — that's
-- real course material, not a business record standing in for something
-- real, so it isn't migrated. Only completion state becomes real.
-- Run once, after 0001-0015.

create table if not exists public.intern_lesson_completions (
  id uuid primary key default gen_random_uuid(),
  staff_id text not null references public.staff(staff_id) on delete cascade,
  module_id text not null,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  unique (staff_id, module_id, lesson_id)
);

create index if not exists intern_lesson_completions_staff_idx on public.intern_lesson_completions (staff_id);

alter table public.intern_lesson_completions enable row level security;

create policy "users can view their own lesson completions"
  on public.intern_lesson_completions for select to authenticated
  using (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "admins can view all lesson completions"
  on public.intern_lesson_completions for select to authenticated
  using (public.get_my_role() = 'admin');

create policy "users can mark their own lessons complete"
  on public.intern_lesson_completions for insert to authenticated
  with check (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));

create policy "users can unmark their own lesson completions"
  on public.intern_lesson_completions for delete to authenticated
  using (staff_id = (select staff_id from public.staff where email = auth.jwt() ->> 'email'));
