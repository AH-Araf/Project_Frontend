-- Local embeddings are 384-dimensional. Existing vectors were 768 and cannot be mixed in.

delete from public.ai_chunks;

drop index if exists public.ai_chunks_embedding_idx;

alter table public.ai_chunks drop column if exists embedding;
alter table public.ai_chunks add column embedding extensions.vector(384) not null;

create index if not exists ai_chunks_embedding_idx
  on public.ai_chunks
  using hnsw (embedding extensions.vector_cosine_ops);

create table if not exists public.ai_settings (
  id integer primary key check (id = 1),
  embedder text not null check (embedder in ('local', 'gemini')),
  updated_at timestamptz not null default now()
);

alter table public.ai_settings enable row level security;

grant select, insert, update, delete on public.ai_settings to authenticated, service_role;

drop policy if exists "read embedder" on public.ai_settings;
create policy "read embedder" on public.ai_settings
  for select to authenticated using (true);

drop policy if exists "admin writes embedder" on public.ai_settings;
create policy "admin writes embedder" on public.ai_settings
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop function if exists public.match_chunks(extensions.vector, integer);

create or replace function public.match_chunks(
  query_embedding extensions.vector(384),
  match_count integer default 8
)
returns table (
  source text,
  title text,
  content text,
  similarity double precision
)
language sql
stable
security definer
set search_path = public, extensions
as $$
  select
    chunks.source,
    chunks.title,
    chunks.content,
    1 - (chunks.embedding <=> query_embedding) as similarity
  from public.ai_chunks as chunks
  where public.is_admin()
    or chunks.audience = 'public'
    or (
      chunks.audience = 'student'
      and lower(chunks.owner_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  order by chunks.embedding <=> query_embedding
  limit least(greatest(match_count, 1), 12);
$$;

grant execute on function public.match_chunks(extensions.vector, integer) to authenticated, service_role;
