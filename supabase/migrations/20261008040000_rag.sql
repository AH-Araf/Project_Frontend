-- Retrieval index for the assistant. Embeddings are 768-dimensional and normalized.

create extension if not exists vector with schema extensions;

create table if not exists public.ai_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  ref_id text not null,
  audience text not null check (audience in ('public', 'staff', 'student')),
  owner_email text,
  title text not null,
  content text not null,
  embedding extensions.vector(768) not null,
  updated_at timestamptz not null default now(),
  unique (source, ref_id)
);

create index if not exists ai_chunks_embedding_idx
  on public.ai_chunks
  using hnsw (embedding extensions.vector_cosine_ops);

alter table public.ai_chunks enable row level security;

grant select, insert, update, delete on public.ai_chunks to authenticated, service_role;

drop policy if exists "admin reads chunks" on public.ai_chunks;
create policy "admin reads chunks" on public.ai_chunks
  for select to authenticated
  using (public.is_admin());

drop policy if exists "admin writes chunks" on public.ai_chunks;
create policy "admin writes chunks" on public.ai_chunks
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.match_chunks(
  query_embedding extensions.vector(768),
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
