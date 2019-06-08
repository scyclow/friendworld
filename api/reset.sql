\i ./sql/0000-schema.sql
\i ./sql/0002-ads.sql

insert into friendworld.users (id, username, avatar_url, flair) values
  ('d2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'steve', 'https://www.healthyfamiliesbc.ca/sites/hfbcprox-prod.health.gov.bc.ca/files/thumbnails/getting-child-to-eat-breakfast.jpg', 'admin')
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'VinceSlickson', 'https://media.mnn.com/assets/images/2014/05/kid%20eating%20cereal%20large.jpg.653x0_q80_crop-smart.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'SweetSalvation', 'https://i.ytimg.com/vi/6-CVjDMvCkk/hqdefault.jpg', '')
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'sadsack4', 'https://image.shutterstock.com/image-photo/portrait-beautiful-child-having-breakfast-260nw-226912240.jpg', '')
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, 'DumboTheClown', 'https://www.healthybabycereals.org/sites/healthybabycereals.org/files/images/2017-12/BabyEatingCereal.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'SuperCatMeow', 'https://www.edmontonhumanesociety.com/wp-content/uploads/2018/05/Black-cat-looking-at-camera-e1533738476357.jpg', '')
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, 'TargetedTom', 'https://cdn.business2community.com/wp-content/uploads/2012/12/Targeted-User-Education.jpg', '')
, ('abf1bc3f-f23f-4ba5-aec4-637053ebee6a'::uuid, 'fuckface99', 'https://i.ytimg.com/vi/sM-O4ZOwB2U/hqdefault.jpg', '')
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, 'BullseyeBob', 'https://images-na.ssl-images-amazon.com/images/I/71UgYrtHFnL._SX425_.jpg', '')
, ('0e622956-5ece-42d4-8926-faf880743d72'::uuid, 'heatherhot6', 'https://hdwallsource.com/img/2016/6/hot-woman-wallpaper-49861-51542-hd-wallpapers.jpg', '')
;

insert into friendworld_private.accounts (user_id, password_hash) values
  ('d2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, crypt('test1', gen_salt('bf')))
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, crypt('test2', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, crypt('test3', gen_salt('bf')))
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, crypt('test4', gen_salt('bf')))
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, crypt('test5', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, crypt('test6', gen_salt('bf')))
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, crypt('test7', gen_salt('bf')))
, ('abf1bc3f-f23f-4ba5-aec4-637053ebee6a'::uuid, crypt('test8', gen_salt('bf')))
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, crypt('test9', gen_salt('bf')))
, ('0e622956-5ece-42d4-8926-faf880743d72'::uuid, crypt('test10', gen_salt('bf')))
;

insert into friendworld.threads (title) values
  ('Welcome to Friendworld!')
, ('I''ve had a rough couple months, and I dont know where else to turn')
, ('They are listening to everything I say and do.')
, ('You wont BELIEVE the kind of BULLS#!T that the Dems are pulling this week')
, ('What is your favorite color?')
, ('Advertising is slowly killing us')
, ('A solar flare may kill us all')
, ('I''m so happy')
, ('I know that this is a really long title, but, and it means that this will chop off some of it into an elipses at some point. I dont know how to spell ellipses, but whatever... I just need a really long title for testing purposes. I wonder if this is at 300 characters yet. I dont know. I better write a bit more just to be safe. I dont want to have to write a really really long title again, after all. Better safe than sorry. Thats what they say.')
, ('Has anyone else been the subject of a targeting campaign by the united states government?')
, ('HI!')
, ('And the cow JUMPED over the moon!')
;


insert into friendworld.posts (author_id, content, thread_id) values
  ('d2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'Hello, and welcomed to Friendworld! I''m so glad that you''ve decided to stop by and hang out at this corner of the internet!'||chr(10)||' If you''re visiting for the first time, then you might notice that friendworld looks and feels a little different from other social networks... And that''s 100% intentional! I built Friendworld because I was dissatisfied with the current state of affairs over at facebook, twitter, reddit, and instagram. I was tired of mindlessly wasting all of my time on websites built by giant multinational corporations to track me, categorize me, and sell me crap. I was tired of using websites and apps designed to keep me addicted to their platform with the same manipulative tactics used by slot machines. And most importantly, I was tired of sifting through an endless stream of low-quality content -- much of which bordered on propaganda!'||chr(10)||' Here at Friendworld, you don''t have to worry about any of that. Even though it does have some ads (running servers ain''t cheap!), selling you random crap and tracking you is not my prerogative. Friendworld is designed from the ground up to be about one thing and one thing only: creating a meaningful experience for the user. There aren''t many places left on the internet where you can let loose, and not have to worry about your own content being used against you. And I wanted to fix that.'||chr(10)||' Rather than continuously attempting to trigger short bursts of dopamine with meaningless notifications, Friendworld''s sleek and minimalistic UI puts a strong emphasis on fostering long-form discussion. Additionally, I''ve chosen to use state-of-the-art machine learning technology to help keep moderation fair and balanced, and to help nudge the conversation back on track. And most importantly, I promise to never track you, show you targeted ads, or collect and sell your personal data. I''ll never "sell out" to corporate interests -- the only person I work for is you :)'||chr(10)||' So remember, whether you''re in the middle of a heated discussion, creating an account for the first time, or just lurking, Friendworld is the place for you! Remember to be respectful of the other users, use common sense before you post, and to BE YOURSELF.'||chr(10)||' S', 1)
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, 'Wow, what a great post!', 1)
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'I sure do thats what differentiates me from the rest of the pack: i know that when i see that green it sets off something deep inside that noone except god almighty understands.', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Im not really sure why Im making this post, but here it goes: things havent been going so hot for me this month. Im not sure why. From the outside, my life must look fine. But I just keep waking up every day, and am unable to find the slightest hint of joy in anyhting I do. I was just curious if any one else has any tips for ', 2)
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'LOL kill yourself asshole. ', 3)
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, 'Ive successfully avoided their prying eye for this long, and nows not the time to stop.', 3)
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'I just cant FUCKING BELIEVE what that jew chuck schumer is doing to this country. Is anyone even PAYING ATTENTION TO WHATS GOING ON? It doesnt look like it!', 4)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'That sounds bad', 4)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'I like blue :)', 5)
, ('d2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'Green!', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'purple', 5)
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, 'Studies have shown that the average American is shown up to 500,000 advertisements a year! If that sounds like a lot... thats because it is!  ', 6)
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, 'Did you know because I certainly did not!!!', 7)
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, 'Look at this picture of me and my girlfriend: https://pngimage.net/wp-content/uploads/2018/06/happy-couple-png-3.png', 8)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, '!', 9)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Ive been dealing with this for the last couple of months, and jsut wanted to know if anyone had any tips or tricks for dealing with this problem. Its been really tough researching this topic, for obvious reasons. Thanks in advance, Bob', 10)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Hi Tom, welcome to Friendworld! I know that youre going through a lot of stress right now. Believe me-- Ive been there. In fact, this sort of thing is MUCH more common than youd expect. In any given year, various DeepState agencies of the Federal Government keep close tabs on at least 500,000 people-- many of whom are citizens, although some are just interesting illegal aliens. A smaller subset of this group-- maybe 25,000 of them-- are subjected to a much more focused surveilance program. Most of the TI community falls into this bucket (the rest are just crazy, believe it or not, but thats a different story). It sounds like you fall into this latter group. The most important thing to remember is to KEEP CALM. If they know that you know about them, they will become much more agressive, and try to eliminate you before you have a chance to tell others. Its obviously too late for that, but you can still take some actions to mitigate the damage: '||E'\n'||' First, be sure to use VPNs and throwaway accounts/emails in all of your online communication. Similarly, be sure to avoid giving out identifying information. If they cant tell that you are you, then they cant know what you know. Also, use an anonymous browser like tor, and DELETE YOUR BROWSING HISTORY. You might want to leave some of the cookies and local storage of friendworld untouched though-- i know the owners of the site, and they cna be trusted. If youre doing this already then things are less urgent, but you should still read through these instructions to be safe. '||E'\n'||' Second, theres a good chance that youve already been chipped, so youre going to need to run some tests. the best way to tell is by using magnets. the ones on your refridgerator wont do. youll need something a bit stronger. If you dont happen to have a strong magnet lying around the house, go pick one up at the hardware store. But dont be too conspicuous. Buy a hammer, some nails, duct tape, and a box cutter as long as youre there. It will look like youre doing some basic home improvement, and wont raise any eyebrows. Besides, youll need all of these later. Remember to pay for all of this in CASH, or possibly an anonymous cryptocurrency. You dont need them tracking your purchases. Once youre home, youre going to want to use the magnet to check for implants. In particular, youre going to want to check your temples, hands, and neck-- but really anywhere on your head could be affected. Also check the fleshier parts of youre body, such as your biceps or buttocks. if you feel a magnetic tug, I hate to tell you: but youre going to have to use the box cutter and some tweezers to pull it out. be sure to sterilize the blade first with some rubbing alcohol. '||E'\n'||' Third, once youre clean-- and depending on the severity of your situation-- you might want to consider physically escaping from your current life. dont tell anyone-- you dont know who you can trust, so its best to just GET OUT. '||E'\n'||' And remember, try to act sooner rather than later. The cats very likely already out of the bag, so to speak, so you likely need to do damage control.', 10)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'So, a few weeks ago I took bullseyebob''s advice and gave my body a sweetp for tracking chips -- and boy, am I glad I did! I was completely shocked to find that I had a big fat one implanted in the back of my neck where it connects to the base of my skull. Thankfully I was able to cut it out. It wasn''t easy, but im glad I did it. My thoughts have been so much clearer...and in a lot of ways, I feel like I have much more agency. To be sure, I wasn''t feeling great after I first extracted it. I don''t know what it was doing, exactly, but in a lot of ways it felt like it became an extension of my mind. There must have been some sort of feedback loop going on, because after extraction it felt like a part of my brain was missing. For the first time I noticed that I  had been falling into certain thought patterns, which were reinforced by the chip. Here''s an example: before, I would get hungry and an electrical signal in my brain would tell me to order food on the internet. This was clearly the desired reaction of whoever chipped me, as it gave them a clear paper trail of what I ate. I''m sure that every meal I ate in the last couple months was logged to a database somewhere. But after extraction, I noticed that after I got hungry I''d forget what I was doing. Without that feedback loop telling me what to do, my thought patterns no longer made any sense. It took a little while to adjust, and I lost a bunch of weight, but I''m starting to feel better. There''s definitely a retraining process that needs to take place, to say the least. At the end fo the day though, I think it will be worth it. ', 10)
, ('abf1bc3f-f23f-4ba5-aec4-637053ebee6a'::uuid, 'Hello!', 11)
, ('abf1bc3f-f23f-4ba5-aec4-637053ebee6a'::uuid, 'Heres an image: https://nursejournal.org/wp-content/uploads/2014/06/wow-left-yellow.png!', 11)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Uh... @fuckface99 is being a dummy', 11)
, ('43913166-4f0b-4181-b5cf-07da8440cb7c'::uuid, 'Hey, Im the #dummy, dummy.', 11)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Always remember to follow your dreams.', 12)
;


insert into friendworld.messages (from_id, to_id, content, created_at) values
  ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'Hey steve, its vince. just checking in. if you have any more thoughts on what we talked about on tuesday, let me know.', '2019-02-16 19:49:08.154957'::timestamp)
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'Hey steve, its vince. just following up. let me know if you have any thoughts.', '2019-02-16 19:50:08.154957'::timestamp)
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'You know what? fuck you. go make your own money.', '2019-02-16 19:51:08.154957'::timestamp)
, ('d2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, '0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'Who ARE you? leave me alone?', '2019-02-16 19:52:08.154957'::timestamp)
, ('0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'make me, scumbag', '2019-02-16 19:53:08.154957'::timestamp)
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'hello steven :)', '2019-02-16 19:54:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, '0534b28d-5fa8-4c81-99c9-cf76fab5b861'::uuid, 'hello vince :)', '2019-02-16 19:55:08.154957'::timestamp)
-- , ('d2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'I dont like you', '2019-02-16 19:56:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid, 'I dont kknow where you get off talkin to me like that but i dont like it and you better gimme every ounce of respect i deserve you sick slimey fuck!', '2019-02-17 19:50:08.154957'::timestamp)
;

insert into friendworld.alerts (user_id, content, link) values (
  'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9'::uuid
, 'You received a message from @VinceSlickson!'
, '/messages/VinceSlickson'
)
;


-- TODO more cross referencing depression with ads preying on depression
-- TODO make most TI ads restricted - only pick up on ti key words
-- TODO make new agey ads more inclusive feeling. everyone hates you, bt this will make things better

-- WEBSITES I NEED:
--   LOW EFFORT
--     back pain
--     sexy singles
--     food
--   MEDIUM EFFORT
--     7 steps to dating success
--   HIGH EFFORT
--     computer infected
--     chakras
--     depression

-- ping alex to get him to help me with either website copy and/or ad


-- THANK YOU
-- -



-- CHAKRAS
-- https://rhysthomasinstitute.com/wp-content/uploads/2010/05/Chakra-Chart.jpg



-- man running in brain
-- https://www.drjimtaylor.com/4.0/wp-content/uploads/2017/07/Mental-imagery-5.png


-- fix it man
--


-- water
-- toxic sludge picture: ARE YOU SURE YOU KNOW WHAT''S IN YOUR DRINKING WATER?
-- idea here being: some products have an optimistic approach, others prey on fear


-- free trump hat
-- https://ilovemyfreedoms.com/free-2020-hat?affiliate_id=1614745


-- tinitis placeholder
-- https://tonakitinnitusprotocol.com/

-- AMERICAS #1 FAVORITE VEGETABLE ISN'T WHAT YOU THINK IT IS

-- SCAM:
-- https://www.horoscopefinder.co/0hin5?&t1=120914&t2=294506


-- burn fat
-- https://ketomeltandtrim.com/ss/



-- funny broken links


-- HIGH QUALITY JEWISH BURIAL SITES

-- KOSMON CHURCH
-- http://kosmonchurch.org/history/pictures-of-our-place-of-worship
