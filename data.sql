insert into friendworld.users (id, username) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'steviepxyz');

insert into friendworld_private.accounts (user_id, password_hash) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, crypt('password123', gen_salt('bf')));



