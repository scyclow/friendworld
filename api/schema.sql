begin;

-------------------
-- reset
-------------------
drop schema friendworld cascade;
drop schema friendworld_private cascade;
drop domain username_domain;
drop role friendworld_root;
drop role friendworld_anonymous;
drop role friendworld_user;


-------------------
-- modules
-------------------
create extension if not exists "uuid-ossp";
create extension if not exists citext;
create extension if not exists "pgcrypto";

create schema friendworld;
create schema friendworld_private;


-------------------
-- roles
-------------------
create role friendworld_root;

create role friendworld_anonymous;
grant friendworld_anonymous to friendworld_root;

create role friendworld_user;
grant friendworld_user to friendworld_root;

-- alter default privileges revoke execute on functions from public;
grant usage on schema friendworld to friendworld_anonymous, friendworld_user;
grant usage on schema friendworld_private to friendworld_anonymous, friendworld_user;


-------------------
-- pre-tables
-------------------
create function friendworld_private.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;


-------------------
-- tables
-------------------

-- users
create domain username_domain as citext check (value ~* '^[A-Za-z0-9._%-]+$');
create table friendworld.users (
  id            uuid primary key unique default uuid_generate_v4()
, created_at    timestamp default now()
, updated_at    timestamp default now()
, username      username_domain not null unique
, email         citext check (email ~* '^.+@.+\..+$')
, tracking_info json
);

create table friendworld_private.accounts (
  user_id        uuid primary key references friendworld.users(id)
, password_hash  text not null
);

-- user triggers

create trigger user_updated_at before update
  on friendworld.users
  for each row
  execute procedure friendworld_private.set_updated_at();


comment on table friendworld.users is 'A friendworld user';
comment on column friendworld.users.updated_at is E'@omit';

grant select on table friendworld.users to friendworld_anonymous, friendworld_user;
grant update, delete on table friendworld.users to friendworld_user;
grant select on table friendworld_private.accounts to friendworld_anonymous, friendworld_user;
grant update, delete on table friendworld_private.accounts to friendworld_user;

alter table friendworld.users enable row level security;
create policy select_users on friendworld.users for select using (true);

create policy update_users on friendworld.users for update to friendworld_user
  using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);

create policy delete_users on friendworld.users for delete to friendworld_user
  using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);


-- threads
create table friendworld.threads (
  id            uuid primary key unique default uuid_generate_v4()
, created_at    timestamp default now()
, updated_at    timestamp default now()
, title         text not null
);

create trigger thread_updated_at before update
  on friendworld.threads
  for each row
  execute procedure friendworld_private.set_updated_at();

grant select on table friendworld.threads to friendworld_anonymous, friendworld_user;
grant insert, update, delete on table friendworld.threads to friendworld_user;

-- alter table friendworld.threads enable row level security;
-- create policy select_threads on friendworld.threads for select using (true);
-- create policy update_users on friendworld.threads for update to friendworld_user
--   using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);


-- posts
create table friendworld.posts (
  id            uuid primary key unique default uuid_generate_v4()
, created_at    timestamp default now()
, updated_at    timestamp default now()
, author_id     uuid not null references friendworld.users(id)
, thread_id     uuid references friendworld.threads(id)
, content       text not null
);

create trigger post_updated_at before update
  on friendworld.posts
  for each row
  execute procedure friendworld_private.set_updated_at();

grant select on table friendworld.posts to friendworld_anonymous, friendworld_user;
grant insert, update, delete on table friendworld.posts to friendworld_user;


-- alter table friendworld.posts enable row level security;
-- create policy select_threads on friendworld.posts for select using (true);

/*
create view friendworld.view_test as
  select tracking_info
  from friendworld.users;
*/




-------------------
-- functions
-------------------
create type friendworld_private.jwt_token as (
  role     text
, aud      text
, exp      integer
, user_id  uuid
);


-- signup
create function friendworld.signup(
  username username_domain
, password text
, email text default null
) returns friendworld.users as $$
  declare
    u friendworld.users;

  begin
    insert into friendworld.users (username, email)
      values (username, email)
      returning * into u;

    insert into friendworld_private.accounts (user_id, password_hash)
      values (u.id, crypt(password, gen_salt('bf')));

    return u;
  end;
$$ language plpgsql;

grant execute on function friendworld.signup(username_domain, text, text) to friendworld_anonymous, friendworld_user;


-- login
create function friendworld.login(
  username      username_domain
, password      text
) returns friendworld_private.jwt_token as $$
  #variable_conflict use_variable

  declare
    account friendworld_private.accounts;

  begin
    select friendworld_private.accounts.* into account
    from friendworld.users
    inner join friendworld_private.accounts
      on friendworld.users.id = friendworld_private.accounts.user_id
    where friendworld.users.username = username;

    if account.password_hash = crypt(password, account.password_hash) then
      return ('friendworld_user', 'postgraphile', extract(epoch from now())::int + 7776000, account.user_id)::friendworld_private.jwt_token;
    else
      return null;
    end if;
  end;
$$ language plpgsql;

grant execute on function friendworld.login(username_domain, text) to friendworld_anonymous, friendworld_user;


-- current user
create function friendworld.current_user() returns friendworld.users as $$
  select *
  from friendworld.users
  where id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid;
$$ language sql stable;

create function friendworld.current_user_id() returns uuid as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::uuid;
$$ language sql stable;

grant execute on function friendworld.current_user() to friendworld_anonymous, friendworld_user;
grant execute on function friendworld.current_user_id() to friendworld_anonymous, friendworld_user;

-- create thread
create function friendworld.create_thread(
  title     text
, content   text
) returns friendworld.threads as $$
  declare
    thread friendworld.threads;

  begin
    insert into friendworld.threads (title)
      values (title)
      returning * into thread;

    perform friendworld.create_post(content, thread.id);

    return thread;
  end;
$$ language plpgsql;

grant execute on function friendworld.create_thread(text, text) to friendworld_user;

-- create post
create function friendworld.create_post(
  content     text
, thread_id   uuid default null
) returns friendworld.posts as $$
  declare
    post friendworld.posts;

  begin
    insert into friendworld.posts (author_id, content, thread_id)
      values (
        nullif(current_setting('jwt.claims.user_id', true), '')::uuid
      , content
      , thread_id
      )
      returning * into post;

    return post;
  end;
$$ language plpgsql;

grant execute on function friendworld.create_post(text, uuid) to friendworld_user;

commit;
