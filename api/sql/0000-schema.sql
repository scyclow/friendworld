begin;

-------------------
-- reset
-------------------
-- drop schema friendworld cascade;
-- drop schema friendworld_private cascade;
-- drop domain username_domain;
-- -- drop domain tag_store;
-- drop role friendworld_root;
-- drop role friendworld_anonymous;
-- drop role friendworld_user;


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
create domain username_domain as citext check (value ~* '^[A-Za-z0-9_\-~+^<>.*!$]{0,18}[A-Za-z0-9_\-<>~^]$');
create table friendworld.users (
  id             uuid primary key unique default uuid_generate_v4()
, created_at     timestamp default now()
, updated_at     timestamp default now()
, username       username_domain not null unique
, email          citext check (email ~* '^.+@.+\..+$')
, flair          text default ''
, avatar_url     text default 'http://simpleicon.com/wp-content/uploads/user-4.png'
, gender         text default ''
, birthday       timestamp
, bio            text default ''
, job            text default ''
, interests      text default ''
, websites       text default ''
, media          text default ''
, religion       text default ''
, politics       text default ''
, tracking_info  jsonb default '{}'
);

create table friendworld_private.accounts (
  user_id        uuid primary key references friendworld.users(id)
, password_hash  text not null
, tracking_token text default ''
, ip             text default ''
);

create unique index username_index on friendworld.users(username);

-- user triggers

create trigger user_updated_at before update
  on friendworld.users
  for each row
  execute procedure friendworld_private.set_updated_at();


comment on table friendworld.users is 'A friendworld user';
comment on column friendworld.users.updated_at is E'@omit';

grant select on table friendworld.users to friendworld_anonymous, friendworld_user;
grant update, delete on table friendworld.users to friendworld_user;
grant insert on table friendworld.users to friendworld_anonymous, friendworld_user;

grant select, insert on table friendworld_private.accounts to friendworld_anonymous, friendworld_user;

alter table friendworld.users enable row level security;
create policy select_users on friendworld.users for select using (true);

create policy insert_users on friendworld.users for insert to friendworld_anonymous, friendworld_user
  with check (true);

create policy update_users on friendworld.users for update to friendworld_user
  using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);

create policy delete_users on friendworld.users for delete to friendworld_user
  using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);


-- threads
create table friendworld.threads (
  id            serial primary key
, created_at    timestamp default now()
, updated_at    timestamp default now()
, title         text not null check (title ~* '.+')
);

create trigger thread_updated_at before update
  on friendworld.threads
  for each row
  execute procedure friendworld_private.set_updated_at();

grant select on table friendworld.threads to friendworld_anonymous, friendworld_user;
grant insert on table friendworld.threads to friendworld_user;


-- alter table friendworld.threads enable row level security;
-- create policy select_threads on friendworld.threads for select using (true);
-- create policy update_threads on friendworld.threads for update to friendworld_user
--   using (id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);


-- posts

create table friendworld.posts (
  id            serial primary key
, created_at    timestamp default now()
, updated_at    timestamp default now()
, author_id     uuid not null references friendworld.users(id)
, thread_id     int references friendworld.threads(id)
, content       text not null check (content ~* '.+')
, usernames     jsonb default '[]'
, tags          jsonb default '[]'
);

create trigger post_updated_at before update
  on friendworld.posts
  for each row
  execute procedure friendworld_private.set_updated_at();

grant select on table friendworld.posts to friendworld_anonymous, friendworld_user;
grant insert on table friendworld.posts to friendworld_user;
grant usage, select on all sequences in schema friendworld to friendworld_user;


alter table friendworld.posts enable row level security;
create policy select_posts on friendworld.posts for select using (true);

create policy insert_posts on friendworld.posts for insert with check (
  author_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
);


create function friendworld.threads_latest_post_time(t friendworld.threads)
returns timestamp as $$

  select friendworld.posts.created_at
  from friendworld.posts
  where friendworld.posts.thread_id = t.id
  order by friendworld.posts.created_at desc
  limit 1;

$$ language sql stable;

grant execute on function friendworld.threads_latest_post_time(friendworld.threads) to friendworld_user, friendworld_anonymous;

comment on function friendworld.threads_latest_post_time(friendworld.threads) is E'@sortable';

-- messages/ DMs

create table friendworld.messages (
  id            uuid primary key unique default uuid_generate_v4()
, created_at    timestamp default now()
, updated_at    timestamp default now()
, from_id       uuid not null references friendworld.users(id)
, to_id         uuid not null references friendworld.users(id)
, content       text not null check (content ~* '.+')
);

create trigger message_updated_at before update
  on friendworld.messages
  for each row
  execute procedure friendworld_private.set_updated_at();

comment on constraint "messages_from_id_fkey" on friendworld.messages is E'@foreignFieldName messagesSent';
comment on constraint "messages_to_id_fkey" on friendworld.messages is E'@foreignFieldName messagesReceived';

alter table friendworld.messages enable row level security;
grant select on table friendworld.messages to friendworld_user;
grant insert, update on table friendworld.messages to friendworld_user;

create policy select_messages on friendworld.messages for select using (
  from_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
  or to_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
);

create policy insert_messages on friendworld.messages for insert with check (
  from_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
);


-- alerts

create table friendworld.alerts (
  id            uuid primary key unique default uuid_generate_v4()
, created_at    timestamp default now()
, updated_at    timestamp default now()
, user_id       uuid not null references friendworld.users(id)
, read          boolean default false
, content       text not null
, link          text default null
);

create trigger alert_updated_at before update
  on friendworld.alerts
  for each row
  execute procedure friendworld_private.set_updated_at();

alter table friendworld.alerts enable row level security;
grant select on table friendworld.alerts to friendworld_user;
grant insert, update on table friendworld.alerts to friendworld_user;

create policy select_alerts on friendworld.alerts for select using (
  user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
);

create policy insert_alerts on friendworld.alerts for insert
to friendworld_anonymous, friendworld_user
  with check (true);

create policy update_alerts on friendworld.alerts for update
to friendworld_user using (
  user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
);



-- create view friendworld.view_test as
--   select tracking_info
--   from friendworld.users;

-- grant select on view friendworld.view_test to friendworld_anonymous, friendworld_user;


create table friendworld.ads (
  id            uuid primary key unique default uuid_generate_v4()
, created_at    timestamp default now()
, updated_at    timestamp default now()
, url           text
, img           text default null
, content       text default null
, is_generic    boolean default true
, weight        int default 1
, target_tags   jsonb default '[]'
, primary_tags  jsonb default '[]'
, tags          jsonb default '[]'
);

create trigger ad_updated_at before update
  on friendworld.ads
  for each row
  execute procedure friendworld_private.set_updated_at();

grant select on table friendworld.ads to friendworld_anonymous, friendworld_user;


-- (add as computed column on thread)
-- function ad_for_thread
--   take thread_id
--   get all posts for thread
--   concatinate all key words
--   find all ads with intersection
--     https://www.postgresql.org/docs/current/functions-json.html#FUNCTIONS-JSONB-OP-TABLE
--     select '{ "blah": ["a", "b", "c"] }'::jsonb -> 'blah' ?| array['c', 'd', 'e'];



create table friendworld.ad_clicks (
  primary key (user_id, ad_id)
, unique (user_id, ad_id)
, ad_id         uuid not null references friendworld.ads(id)
, user_id       uuid not null references friendworld.users(id)
, created_at    timestamp default now()
, updated_at    timestamp default now()
, click_count   integer default 1
);

create trigger ad_click_updated_at before update
  on friendworld.ad_clicks
  for each row
  execute procedure friendworld_private.set_updated_at();

grant select on table friendworld.ad_clicks to friendworld_anonymous, friendworld_user;
grant insert, update on table friendworld.ad_clicks to friendworld_user;

create policy select_ad_clicks on friendworld.ad_clicks for select using (true);

create policy insert_messages on friendworld.ad_clicks for insert with check (
  user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
);






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
, ip text default null
, tracking_token text default null
, email text default null
) returns friendworld_private.jwt_token as $$
  declare
    u friendworld.users;

  begin
    insert into friendworld.users (username, email)
      values (username, email)
      returning * into u;

    insert into friendworld_private.accounts (user_id, password_hash, ip, tracking_token)
      values (u.id, crypt(password, gen_salt('bf')), ip, tracking_token);

    return (
      'friendworld_user',
      'postgraphile',
      extract(epoch from now())::int + 7776000, u.id
    )::friendworld_private.jwt_token;
  end;
$$ language plpgsql;

grant execute on function friendworld.signup(username_domain, text, text, text, text) to friendworld_anonymous, friendworld_user;


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
, usernames jsonb default null
, tags      jsonb default null
) returns friendworld.threads as $$
  declare
    thread friendworld.threads;

  begin
    insert into friendworld.threads (title)
      values (title)
      returning * into thread;

    perform friendworld.create_post(content, thread.id, usernames, tags);

    return thread;
  end;
$$ language plpgsql;

grant execute on function friendworld.create_thread(text, text, jsonb, jsonb) to friendworld_user;

-- create post
create function friendworld.create_post(
  content     text
, thread_id   int default null
, usernames   jsonb default null
, tags        jsonb default null
) returns friendworld.posts as $$
  #variable_conflict use_variable
  declare
    post        friendworld.posts;
    author      friendworld.users;

  begin
    insert into friendworld.posts (author_id, content, usernames, tags, thread_id)
      values (
        nullif(current_setting('jwt.claims.user_id', true), '')::uuid
      , content
      , usernames
      , tags
      , thread_id
      )
    returning * into post;

    -- get the author
    select friendworld.users.* into author
    from friendworld.users
    where friendworld.users.id = post.author_id;

    -- if there are any users tagged, alert the user
    insert into friendworld.alerts (user_id, content) (
      select
        friendworld.users.id as user_id
      , format('You were mentioned by @%s in /posts/%s !', author.username, post.id::text) as content
      from
        jsonb_array_elements_text(usernames::jsonb) as _usernames
        left join friendworld.users on _usernames::citext = friendworld.users.username::citext
      where
        _usernames::citext = friendworld.users.username::citext
    );



    return post;
  end;
$$ language plpgsql;

grant execute on function friendworld.create_post(text, int, jsonb, jsonb) to friendworld_user;



-- create message
create function friendworld.create_message(
  to_username         username_domain
, content             text
) returns friendworld.messages as $$
  declare
    message   friendworld.messages;
    from_user friendworld.users;
    to_user friendworld.users;

  begin

    select friendworld.users.* into to_user
    from friendworld.users
    where friendworld.users.username = to_username;

    select friendworld.users.* into from_user
    from friendworld.users
    where friendworld.users.id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid;

    insert into friendworld.messages (from_id, to_id, content) values (
      from_user.id
    , to_user.id
    , content
    ) returning * into message;

    insert into friendworld.alerts (user_id, content, link) values (
      to_user.id
    , format('You received a message from @%s!', from_user.username)
    , format('/messages/%s', from_user.username)
    );

    return message;
  end;
$$ language plpgsql;

grant execute on function friendworld.create_message(username_domain, text) to friendworld_user;

commit;

create function friendworld.read_alert(
  alert_id        uuid
) returns friendworld.alerts as $$

  declare
    alert friendworld.alerts;

  begin
    update friendworld.alerts
    set read = true
    where friendworld.alerts.id = alert_id
    returning * into alert;

    return alert;
  end;
$$ language plpgsql;

grant execute on function friendworld.read_alert(uuid) to friendworld_user;

create function friendworld.update_user(
  avatar_url     text default null
, email          text default null
, gender         text default null
, birthday       timestamp default null
, bio            text default null
, job            text default null
, interests      text default null
, websites       text default null
, media          text default null
, religion       text default null
, politics       text default null
, tracking_info  jsonb default null
) returns friendworld.users as $$
  #variable_conflict use_variable

  declare
    user  friendworld.users;

  begin
    update friendworld.users
    set
      avatar_url     = coalesce(avatar_url, friendworld.users.avatar_url)
    , email          = coalesce(email, friendworld.users.email)
    , gender         = coalesce(gender, friendworld.users.gender)
    , birthday       = coalesce(birthday, friendworld.users.birthday)
    , bio            = coalesce(bio, friendworld.users.bio)
    , job            = coalesce(job, friendworld.users.job)
    , interests      = coalesce(interests, friendworld.users.interests)
    , websites       = coalesce(websites, friendworld.users.websites)
    , media          = coalesce(media, friendworld.users.media)
    , religion       = coalesce(religion, friendworld.users.religion)
    , politics       = coalesce(politics, friendworld.users.politics)
    , tracking_info  = coalesce(tracking_info, friendworld.users.tracking_info)
    where friendworld.users.id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
    returning * into user;

    return user;
  end;
$$ language plpgsql;

grant execute on function friendworld.update_user(text, text, text, timestamp, text, text, text, text, text, text, text, jsonb)
  to friendworld_user;


-- Stats
create function friendworld.user_stats()
  returns table (
    username    text
  , post_count  bigint
) as $$
  select username, count(*) as post_count
  from friendworld.posts
  join friendworld.users on users.id = friendworld.posts.author_id
  group by username
  order by post_count
  desc;
$$ language sql stable;

grant execute on function friendworld.user_stats()
  to friendworld_user, friendworld_anonymous;

create function friendworld.user_ad_clicks()
  returns table (
    username    text
  , ad_clicks  bigint
) as $$
  select username, count(*) as post_count
  from friendworld.ad_clicks
  join friendworld.users on users.id = friendworld.ad_clicks.user_id
  group by username
  order by post_count
  desc;
$$ language sql stable;

grant execute on function friendworld.user_ad_clicks()
  to friendworld_user, friendworld_anonymous;

-- log_ad_click
create function friendworld.log_ad_click(
  ad     uuid
) returns friendworld.ad_clicks as $$
  declare
    ad_click friendworld.ad_clicks;

  begin

    insert into friendworld.ad_clicks (ad_id, user_id)
      values (ad, nullif(current_setting('jwt.claims.user_id', true), '')::uuid)
    on conflict (ad_id, user_id) do update
      set click_count = friendworld.ad_clicks.click_count + 1
    returning * into ad_click;

    return ad_click;
  end;
$$ language plpgsql;

grant execute on function friendworld.log_ad_click(uuid) to friendworld_user;
