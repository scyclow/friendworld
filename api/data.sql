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

insert into friendworld.threads (title) values
  ('Do you want to make Fast Cash now? Then click here!')
, ('Ive had a rough couple months, and I dont know where else to turn')
, ('They are listening to everything I say and do.')
, ('You wont BELIEVE the kind of BULLS#!T that the Dems are pulling this week')
, ('What is your favorite color?')
, ('Blah blah blah blah blah blah blah.')

;


insert into friendworld.posts (author_id, content, thread_id) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Hello!', null)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Heres an image: https://nursejournal.org/wp-content/uploads/2014/06/wow-left-yellow.png!', null)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'This is part of thread 1', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'This is also part of thread 1', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'This is also part of thread 1', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'This too is part of thread 1', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'This is part of thread 2', 2)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'This is part of thread 3', 3)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'This is part of thread 4', 4)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'This is part of thread 5', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'This is part of thread 6', 6)
;


insert into friendworld.alerts (id, user_id, content) values
  (
    '0a04ff42-a2c6-4e1f-bda9-80c493aaaaaa'::uuid
  , '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid
  , 'This is a test alert for test1'
  )
;
