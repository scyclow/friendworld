insert into friendworld.users (id, username, avatar_url) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'steve_p', 'https://www.healthyfamiliesbc.ca/sites/hfbcprox-prod.health.gov.bc.ca/files/thumbnails/getting-child-to-eat-breakfast.jpg')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'VinceSlickson', 'https://media.mnn.com/assets/images/2014/05/kid%20eating%20cereal%20large.jpg.653x0_q80_crop-smart.jpg')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'SweetSalvation57', 'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2014/07/cereal-179691809.jpg')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'sadsack4', 'https://image.shutterstock.com/image-photo/portrait-beautiful-child-having-breakfast-260nw-226912240.jpg')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'DumboTheClown', 'https://www.healthybabycereals.org/sites/healthybabycereals.org/files/images/2017-12/BabyEatingCereal.jpg')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'SuperCatMeow', 'https://scontent-ams3-1.cdninstagram.com/vp/df98d0520124614af70cdfa5ec0ef7dd/5C87DAA4/t51.2885-15/sh0.08/e35/c0.135.1080.1080/s640x640/42443173_278983142740614_1666608103659609066_n.jpg')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, 'TargetedTom', 'https://cdn.business2community.com/wp-content/uploads/2012/12/Targeted-User-Education.jpg')
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
, ('Advertising is slowly killing us')
, ('A solar flare may kill us all')
;


insert into friendworld.posts (author_id, content, thread_id) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Hello!', null)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Heres an image: https://nursejournal.org/wp-content/uploads/2014/06/wow-left-yellow.png!', null)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'I like making money. do you???', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'I like making money so much its not even funny let me tell you about this story: the other day i was walking through my neighborhood and i found $10 on the floor WOW!!! as an enterprising man, i immediately deposited this into the nearest bank under my savings account at a 0.5% interest rate, which doesnt sound like a lot but let me tell you compound interest compounds faster than you can keep your eye on!!!', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'Wow, it sounds like you really know how to make a quick buck!', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'I sure do thats what differentiates me from the rest of the pack: i know that when i see that green it sets off something deep inside that noone except god almighty understands.', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'Im not really sure why Im making this post, but here it goes: things havent been going so hot for me this month. Im not sure why. From the outside, my life must look fine. But I just keep waking up every day, and am unable to find the slightest hint of joy in anyhting I do. I was just curious if any one else has any tips for ', 2)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'LOL kill yourself asshole. ', 3)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Ive successfully avoided their prying eye for this long, and nows not the time to stop.', 3)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'I just cant FUCKING BELIEVE what that jew chuck schumer is doing to this country. Is anyone even PAYING ATTENTION TO WHATS GOING ON? It doesnt look like it!', 4)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'That sounds bad', 4)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'I like blue :)', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Green!', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'purple', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Studies have shown that the average American is shown up to 500,000 advertisements a year! If that sounds like a lot... thats because it is!  ', 6)
;


insert into friendworld.alerts (id, user_id, content) values
  (
    '0a04ff42-a2c6-4e1f-bda9-80c493aaaaaa'::uuid
  , '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid
  , 'This is a test alert for test1'
  )
;
