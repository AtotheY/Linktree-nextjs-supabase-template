create table
  public.link_analytics (
    id uuid not null default extensions.uuid_generate_v4 (),
    created_at timestamp with time zone not null default timezone ('utc'::text, now()),
    event_type text not null,
    link_id text null,
    country text null,
    city text null,
    region text null,
    ip_address text null,
    user_agent text null,
    source text null,
    constraint link_analytics_pkey primary key (id)
  ) tablespace pg_default;