insert into friendworld.users (id, username) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'test1')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'test2')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'test3')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'test4')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'test5')

;

insert into friendworld_private.accounts (user_id, password_hash) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, crypt('test1', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, crypt('test2', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, crypt('test3', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, crypt('test4', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, crypt('test5', gen_salt('bf')))
;



