-- Catálogo dinâmico de produtos afiliados (alimentado via n8n/Telegram)
create table if not exists public.catalog_afiliados (
  id            bigserial primary key,
  slug          text        not null unique,
  nome          text        not null,
  preco         numeric(10,2) default 0,
  imagem_url    text,
  link_afiliado text        not null,
  marketplace   text        not null default 'mercadolivre',
  categoria     text        not null default 'celulares',
  badge         text        default 'Mix Cell indica',
  ml_id         text,
  marca         text,
  modelo        text,
  specs         jsonb       default '[]',
  descricao     text,
  nota          numeric(3,1) default 0,
  destaque      boolean     default false,
  ativo         boolean     default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Índices
create index if not exists idx_catalog_afiliados_categoria on public.catalog_afiliados(categoria);
create index if not exists idx_catalog_afiliados_ativo on public.catalog_afiliados(ativo);
create index if not exists idx_catalog_afiliados_ml_id on public.catalog_afiliados(ml_id);

-- RLS: leitura pública, escrita apenas via service_role (n8n usa service key)
alter table public.catalog_afiliados enable row level security;

create policy "Leitura publica" on public.catalog_afiliados
  for select using (ativo = true);

create policy "Service role pode tudo" on public.catalog_afiliados
  for all using (auth.role() = 'service_role');

-- Trigger: atualiza updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger catalog_afiliados_updated_at
  before update on public.catalog_afiliados
  for each row execute procedure public.set_updated_at();
