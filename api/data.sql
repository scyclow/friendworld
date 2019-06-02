insert into friendworld.users (id, username, avatar_url, flair) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'steve', 'https://www.healthyfamiliesbc.ca/sites/hfbcprox-prod.health.gov.bc.ca/files/thumbnails/getting-child-to-eat-breakfast.jpg', 'admin')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'VinceSlickson', 'https://media.mnn.com/assets/images/2014/05/kid%20eating%20cereal%20large.jpg.653x0_q80_crop-smart.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'SweetSalvation', 'https://i.ytimg.com/vi/6-CVjDMvCkk/hqdefault.jpg', '')
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'sadsack4', 'https://image.shutterstock.com/image-photo/portrait-beautiful-child-having-breakfast-260nw-226912240.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'DumboTheClown', 'https://www.healthybabycereals.org/sites/healthybabycereals.org/files/images/2017-12/BabyEatingCereal.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'SuperCatMeow', 'https://www.edmontonhumanesociety.com/wp-content/uploads/2018/05/Black-cat-looking-at-camera-e1533738476357.jpg', '')
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, 'TargetedTom', 'https://cdn.business2community.com/wp-content/uploads/2012/12/Targeted-User-Education.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefab'::uuid, 'fuckface99', 'https://i.ytimg.com/vi/sM-O4ZOwB2U/hqdefault.jpg', '')
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, 'BullseyeBob', 'https://images-na.ssl-images-amazon.com/images/I/71UgYrtHFnL._SX425_.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefad'::uuid, 'heatherhot6', 'https://hdwallsource.com/img/2016/6/hot-woman-wallpaper-49861-51542-hd-wallpapers.jpg', '')
;

insert into friendworld_private.accounts (user_id, password_hash) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, crypt('test1', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, crypt('test2', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, crypt('test3', gen_salt('bf')))
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, crypt('test4', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, crypt('test5', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, crypt('test6', gen_salt('bf')))
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, crypt('test7', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefab'::uuid, crypt('test8', gen_salt('bf')))
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, crypt('test9', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefad'::uuid, crypt('test10', gen_salt('bf')))
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
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Hello, and welcomed to Friendworld! I''m so glad that you''ve decided to stop by and hang out at this corner of the internet!'||chr(10)||' If you''re visiting for the first time, then you might notice that friendworld looks and feels a little different from other social networks... And that''s 100% intentional! I built Friendworld because I was dissatisfied with the current state of affairs over at facebook, twitter, reddit, and instagram. I was tired of mindlessly wasting all of my time on websites built by giant multinational corporations to track me, categorize me, and sell me crap. I was tired of using websites and apps designed to keep me addicted to their platform with the same manipulative tactics used by slot machines. And most importantly, I was tired of sifting through an endless stream of low-quality content -- much of which bordered on propaganda!'||chr(10)||' Here at Friendworld, you don''t have to worry about any of that. Even though it does have some ads (running servers ain''t cheap!), selling you random crap and tracking you is not my prerogative. Friendworld is designed from the ground up to be about one thing and one thing only: creating a meaningful experience for the user. There aren''t many places left on the internet where you can let loose, and not have to worry about your own content being used against you. And I wanted to fix that.'||chr(10)||' Rather than continuously attempting to trigger short bursts of dopamine with meaningless notifications, Friendworld''s sleek and minimalistic UI puts a strong emphasis on fostering long-form discussion. Additionally, I''ve chosen to use state-of-the-art machine learning technology to help keep moderation fair and balanced, and to help nudge the conversation back on track. And most importantly, I promise to never track you, show you targeted ads, or collect and sell your personal data. I''ll never "sell out" to corporate interests -- the only person I work for is you :)'||chr(10)||' So remember, whether you''re in the middle of a heated discussion, creating an account for the first time, or just lurking, Friendworld is the place for you! Remember to be respectful of the other users, use common sense before you post, and to BE YOURSELF.'||chr(10)||' S', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Wow, what a great post!', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'I sure do thats what differentiates me from the rest of the pack: i know that when i see that green it sets off something deep inside that noone except god almighty understands.', 1)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Im not really sure why Im making this post, but here it goes: things havent been going so hot for me this month. Im not sure why. From the outside, my life must look fine. But I just keep waking up every day, and am unable to find the slightest hint of joy in anyhting I do. I was just curious if any one else has any tips for ', 2)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'LOL kill yourself asshole. ', 3)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Ive successfully avoided their prying eye for this long, and nows not the time to stop.', 3)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'I just cant FUCKING BELIEVE what that jew chuck schumer is doing to this country. Is anyone even PAYING ATTENTION TO WHATS GOING ON? It doesnt look like it!', 4)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'That sounds bad', 4)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'I like blue :)', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Green!', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'purple', 5)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Studies have shown that the average American is shown up to 500,000 advertisements a year! If that sounds like a lot... thats because it is!  ', 6)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Did you know because I certainly did not!!!', 7)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Look at this picture of me and my girlfriend: https://pngimage.net/wp-content/uploads/2018/06/happy-couple-png-3.png', 8)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, '!', 9)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Ive been dealing with this for the last couple of months, and jsut wanted to know if anyone had any tips or tricks for dealing with this problem. Its been really tough researching this topic, for obvious reasons. Thanks in advance, Bob', 10)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Hi Tom, welcome to Friendworld! I know that youre going through a lot of stress right now. Believe me-- Ive been there. In fact, this sort of thing is MUCH more common than youd expect. In any given year, various DeepState agencies of the Federal Government keep close tabs on at least 500,000 people-- many of whom are citizens, although some are just interesting illegal aliens. A smaller subset of this group-- maybe 25,000 of them-- are subjected to a much more focused surveilance program. Most of the TI community falls into this bucket (the rest are just crazy, believe it or not, but thats a different story). It sounds like you fall into this latter group. The most important thing to remember is to KEEP CALM. If they know that you know about them, they will become much more agressive, and try to eliminate you before you have a chance to tell others. Its obviously too late for that, but you can still take some actions to mitigate the damage: '||E'\n'||' First, be sure to use VPNs and throwaway accounts/emails in all of your online communication. Similarly, be sure to avoid giving out identifying information. If they cant tell that you are you, then they cant know what you know. Also, use an anonymous browser like tor, and DELETE YOUR BROWSING HISTORY. You might want to leave some of the cookies and local storage of friendworld untouched though-- i know the owners of the site, and they cna be trusted. If youre doing this already then things are less urgent, but you should still read through these instructions to be safe. '||E'\n'||' Second, theres a good chance that youve already been chipped, so youre going to need to run some tests. the best way to tell is by using magnets. the ones on your refridgerator wont do. youll need something a bit stronger. If you dont happen to have a strong magnet lying around the house, go pick one up at the hardware store. But dont be too conspicuous. Buy a hammer, some nails, duct tape, and a box cutter as long as youre there. It will look like youre doing some basic home improvement, and wont raise any eyebrows. Besides, youll need all of these later. Remember to pay for all of this in CASH, or possibly an anonymous cryptocurrency. You dont need them tracking your purchases. Once youre home, youre going to want to use the magnet to check for implants. In particular, youre going to want to check your temples, hands, and neck-- but really anywhere on your head could be affected. Also check the fleshier parts of youre body, such as your biceps or buttocks. if you feel a magnetic tug, I hate to tell you: but youre going to have to use the box cutter and some tweezers to pull it out. be sure to sterilize the blade first with some rubbing alcohol. '||E'\n'||' Third, once youre clean-- and depending on the severity of your situation-- you might want to consider physically escaping from your current life. dont tell anyone-- you dont know who you can trust, so its best to just GET OUT. '||E'\n'||' And remember, try to act sooner rather than later. The cats very likely already out of the bag, so to speak, so you likely need to do damage control.', 10)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'So, a few weeks ago I took bullseyebob''s advice and gave my body a sweetp for tracking chips -- and boy, am I glad I did! I was completely shocked to find that I had a big fat one implanted in the back of my neck where it connects to the base of my skull. Thankfully I was able to cut it out. It wasn''t easy, but im glad I did it. My thoughts have been so much clearer...and in a lot of ways, I feel like I have much more agency. To be sure, I wasn''t feeling great after I first extracted it. I don''t know what it was doing, exactly, but in a lot of ways it felt like it became an extension of my mind. There must have been some sort of feedback loop going on, because after extraction it felt like a part of my brain was missing. For the first time I noticed that I  had been falling into certain thought patterns, which were reinforced by the chip. Here''s an example: before, I would get hungry and an electrical signal in my brain would tell me to order food on the internet. This was clearly the desired reaction of whoever chipped me, as it gave them a clear paper trail of what I ate. I''m sure that every meal I ate in the last couple months was logged to a database somewhere. But after extraction, I noticed that after I got hungry I''d forget what I was doing. Without that feedback loop telling me what to do, my thought patterns no longer made any sense. It took a little while to adjust, and I lost a bunch of weight, but I''m starting to feel better. There''s definitely a retraining process that needs to take place, to say the least. At the end fo the day though, I think it will be worth it. ', 10)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefab'::uuid, 'Hello!', 11)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefab'::uuid, 'Heres an image: https://nursejournal.org/wp-content/uploads/2014/06/wow-left-yellow.png!', 11)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Uh... @fuckface99 is being a dummy', 11)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Hey, Im the #dummy, dummy.', 11)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'Always remember to follow your dreams.', 12)
;


insert into friendworld.messages (from_id, to_id, content, created_at) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Hey steve, its vince. just checking in. if you have any more thoughts on what we talked about on tuesday, let me know.', '2019-02-16 19:49:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'Hey steve, its vince. just following up. let me know if you have any thoughts.', '2019-02-16 19:50:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'You know what? fuck you. go make your own money.', '2019-02-16 19:51:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'Who ARE you? leave me alone?', '2019-02-16 19:52:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'make me, scumbag', '2019-02-16 19:53:08.154957'::timestamp)
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'hello steven :)', '2019-02-16 19:54:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'hello vince :)', '2019-02-16 19:55:08.154957'::timestamp)
-- , ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'I dont like you', '2019-02-16 19:56:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'I dont kknow where you get off talkin to me like that but i dont like it and you better gimme every ounce of respect i deserve you sick slimey fuck!', '2019-02-17 19:50:08.154957'::timestamp)
;

insert into friendworld.alerts (user_id, content, link) values (
  '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid
, 'You received a message from @VinceSlickson!'
, '/messages/VinceSlickson'
)
;

-- TODO FIGURE OUT WHICH ONES SHOULD BE OFF BY DEFAULT
insert into friendworld.ads (url, img, content, weight, target_tags, primary_tags, tags, is_generic) values
  (
    'http://fastcashmoneyplus.biz'
  , 'https://www.washingtonpost.com/resizer/bmfQHooAGH6PmEv0qHjgf-ZUy-k=/480x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/EBULPVFULQI6PG4TXFYEHZL2EI.jpg'
  , 'MAKE FAST CASH NOW'
  , 1
  , '[]'
  , '[]'
  , '["fastcash", "fastcashmoneyplus", "fastcashmoneyplusbiz", "fastcashmoneybiz", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "crypto", "cryptocurrency", "bitcoin", "btc", "ethereum", "eth", "invest", "investing", "finance", "ico", "fortune", "millionaire", "billionaire", "blockchain", "economy", "payment", "trick", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz/79f417c21b848aac16507c47f92abfbd.pdf'
  , 'https://i.imgur.com/vyzpT7O.jpg'
  , 'STOP THROWING AWAY YOUR MONEY'
  , 1
  , '[]'
  , '["throwing"]'
  , '["fastcash", "fastcashmoneyplus", "fastcashmoneyplusbiz", "fastcashmoneybiz", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "crypto", "cryptocurrency", "bitcoin", "btc", "ethereum", "eth", "invest", "investing", "finance", "ico", "fortune", "millionaire", "billionaire", "blockchain", "economy", "payment", "trick", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz'
  , 'https://previews.123rf.com/images/artoleshko/artoleshko1712/artoleshko171200224/92625649-big-bomb-of-money-hundred-dollar-bills-with-a-burning-wick-little-time-before-the-explosion-the-conc.jpg'
  , 'WHEN WILL THIS BOMB GO OFF?'
  , 1
  , '[]'
  , '[]'
  , '["economic", "explosion", "fastcash", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "crypto", "cryptocurrency", "bitcoin", "btc", "ethereum", "eth", "invest", "investing", "finance", "ico", "fortune", "millionaire", "billionaire", "blockchain", "economy", "economic", "explosion", "payment", "market", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz/invest'
  , 'https://image.shutterstock.com/image-illustration/happy-man-laptop-money-explosion-450w-75571285.jpg'
  , 'MAKE MONEY FROM THE COMFORT OF YOUR OWN HOME'
  , 1
  , '[]'
  , '["comfort", "money", "home", "house", "apartment"]'
  , '["fastcash", "fastcashmoneyplus", "fastcashmoneyplusbiz", "fastcashmoneybiz", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "crypto", "cryptocurrency", "bitcoin", "btc", "ethereum", "eth", "invest", "investing", "finance", "ico", "fortune", "millionaire", "billionaire", "blockchain", "economy", "payment", "trick", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz/success'
  , 'https://previews.123rf.com/images/belchonock/belchonock1801/belchonock180130743/95161261-elegant-man-in-suit-holding-money-isolated-on-white.jpg'
  , 'SEE WHAT SUCCESS TASTES LIKE'
  , 1
  , '[]'
  , '["success"]'
  , '["fastcash", "food", "taste", "money", "cash", "profit", "suit", "wealth"]'
  , true
  )
, (
    'https://www.amazon.com/Quick-Turn-Real-Estate-Millionaire/dp/B005ZOBAS2'
  , 'https://images-na.ssl-images-amazon.com/images/I/61G83WP73VL._SX258_BO1,204,203,200_.jpg'
  , 'YOU CAN BECOME THE NEXT MILLIONAIRE'
  , 1
  , '[]'
  , '["millionaire", "billionaire"]'
  , '["fast", "cash", "money", "rich", "wealth", "suit"]'
  , true
  )
, (
    'http://adwealthsystem.com/'
  , 'https://www.oneworldnews.com/wp-content/uploads/2017/12/57.jpg'
  , 'ACHIEVE YOUR FINANCIAL DREAMS TODAY'
  , 1
  , '[]'
  , '["dream", "dreams", "sleep", "pillow"]'
  , '["bucks", "cash", "money", "rich", "wealth", "saving", "savings", "invest", "investing", "finance", "fortune", "millionaire", "profit"]'
  , true
  )
, (
    'https://orders.chooseyourselffinancial.com/ALR_masterclassar_0918/PALRTC04/index.htm?pageNumber=2&referer=https%3a%2f%2fpro.chooseyourselffinancial.com%2fp%2fALR_masterclass1col_1017%2fPALRTC04%2f%3fs1%3d%26s2%3d%26s3%3d1_10514595873963804%26h%3dtrue&effortId=925454'
  , 'http://maristpoll.marist.edu/wp-content/uploads/2017/02/Businessman-walking-on-money-way-over-concrete-wall-FEATURED-IMAGE.jpg'
  , 'YOUR JOURNEY TO WEALTH BEGINS TODAY'
  , 1
  , '[]'
  , '["journey"]'
  , '["bucks", "cash", "money", "rich", "wealth", "saving", "savings", "invest", "investing", "finance", "fortune", "millionaire", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz/wallet'
  , 'https://media.brstatic.com/2017/09/25112945/family-showing-young-member-piggy-bank-savings-getty_573x300.jpg'
  , 'SAVE MORE MONEY WITH THIS WEIRD TRICK'
  , 1
  , '[]'
  , '["weird"]'
  , '["fastcash", "fastcashmoneyplus", "money", "savings", "saving", "family"]'
  , true
  )
  , (
    'https://0ms.co/fastcashmoneybiz.html'
  , 'https://waterfm.com/wp-content/uploads/money-vortex.jpg'
  , 'DON''T GET SUCKED INTO THIS MONEY VORTEX'
  , 1
  , '[]'
  , '["vortex"]'
  , '["fastcash", "fastcashmoneyplus", "fastcashmoneyplusbiz", "fastcashmoneybiz", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "invest", "investing", "finance", "fortune", "millionaire", "profit"]'
  , true
  )
, (
    'http://fakebullshit.news/articles/liberals-dont-want-you-to-know'
  , 'https://i.imgur.com/94L6Q6X.jpg'
  , 'UH OH... WHAT DID SHILLARY DO THIS TIME?!'
  , 1
  , '[]'
  , '["hillary", "clinton"]'
  , '["politics", "political", "government", "democrats", "republicans", "gop", "liberal", "liberals", "conservative", "conservatives", "libtards", "cucks", "cuck","clinton","socialist", "socialism", "shillary", "sjw", "sjws", "social", "justice", "warriors"]'
  , true
  )
, (
    'https://www.dr-pedre-md.com/unq-pedre/'
  , 'http://www.ub.edu/microbiologia_virology/sites/default/files/Presentaci%C3%B3n3_1.jpg'
  , 'YOULL NEVER BELIEVE WHAT SCIENTISTS ARE FINDING IN YOUR FOOD'
  , 1
  , '[]'
  , '[]'
  , '["food", "science", "chemicals", "chemtrails"]'
  , true
  )
, (
    'https://target.com'
  , 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/1200px-Target_Corporation_logo_%28vector%29.svg.png'
  , 'TARGET: EXPECT MORE PAY LESS'
  , 1
  , '[]'
  , '[]'
  , '["target", "targeted", "targeting"]'
  , false
  )
-- , (
--     'http://steviep.xyz'
--   , 'https://www.consciouslifestylemag.com/wp-content/uploads/2016/04/chakra-diagram-in-the-body.jpg'
--   , 'CLEANSE YOUR CHAKRAS WITH THESE 7 SOUND BATH TECHNIQUES'
--   , 1
--   , '["woo"]'
--   , '["cleanse"]'
--   , '["woo", "spirit", "mental", "spirituality", "god", "chakra", "chakras", "sound", "meditation", "reality", "dream", "dreams", "hypnosis", "mantra", "mantras", "technique", "energy", "karma", "cleanse", "vegan", "ascend", "ascension", "newage", "consciousness"]'
--   , true
--   )
-- , (
--     'http://steviep.xyz'
--   , 'https://targetedindividualscanada.files.wordpress.com/2011/01/psycho-electronic-weapon-effects-pic1.jpg'
--   , 'THE GOVERNMENT JUST FREAKED ABOUT NEW INFO LEAKING'
--   , 1
--   , '[]'
--   , '[]'
--   , '["ti", "targeted", "individual", "target", "targeting", "tracking", "conspiracy", "nuclear", "drone", "5g", "radiation", "alien", "aliens", "ufo", "ufos", "roswell", "brain", "mind-control", "chemtrails", "tracking"]'
--   , false
--   )
-- , (
--     'http://steviep.xyz'
--   , 'https://targetedindividualscanada.files.wordpress.com/2011/11/brain-inplants.jpg'
--   , 'WHAT YOU DONT KNOW ABOUT YOUR BRAIN MAY KILL YOU'
--   , 1
--   , '[]'
--   , '[]'
--   , '["sad", "depressed", "melencholy", "anxious", "anxiety", "depression", "anhedonia", "motivation", "happy", "mental", "brain", "suicide", "suicidal", "ocd", "obsessed", "scared", "fear", "emptiness", "cbd", "antidepressant"]'
--   , true
--   )
-- , (
--     'http://steviep.xyz'
--   , 'https://www.healthyplace.com/sites/default/files/images/stories/seroquel/1-internet-addiction-online-addiction-healthyplace.jpg'
--   , 'ARE YOU ADDICTED TO THE INTERNET'
--   , 1
--   , '[]'
--   , '["addicted", "addicting", "addiction", "internet"]'
--   , '["sad", "depressed", "melencholy", "anxious", "anxiety", "depression", "anhedonia", "motivation", "happy", "mental", "brain", "suicide", "suicidal", "ocd", "obsessed", "scared", "fear", "emptiness", "cbd", "antidepressant"]'
--   , true
--   )
, (
    'http://www.heavensgate.com/'
  , 'https://www.chantellerenee.org/wp-content/uploads/2018/06/light-dimensions-ascension-1.jpg'
  , 'EVACUATE THE PLANET BEFORE ITS TOO LATE'
  , 1
  , '["woo"]'
  , '["evacuate", "planet"]'
  , '["spirit", "spirituality", "god", "meditation", "energy", "karma", "ascend", "ascension", "newage"]'
  , true
  )
-- , (
--     'http://steviep.xyz'
--   , 'https://a57.foxnews.com/a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2018/09/640/320/1862/1048/adacbcf6-640_brain.jpg'
--   , 'IS SOMETHING WRONG WITH YOUR BRAIN? FIND OUT NOW'
--   , 1
--   , '[]'
--   , '[]'
--   , '["brain", "wrong", "psychology", "sad", "anhedonia", "depressed", "anxious", "anxiety"]'
--   , true
--   )
-- , (
--     'http://steviep.xyz'
--   , 'https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2018/20-neuroscienti.jpg'
--   , 'ARE YOU FORGETTING TO REMEMBER?'
--   , 1
--   , '[]'
--   , '[]'
--   , '["brain", "remember", "forget", "forgetting"]'
--   , true
--   )
, (
    'https://organicfungusnuker.com/'
  , 'https://corespirit.com/api/Containers/corespirit-static/download/size_1200_880ab40a-c7be-43be-9223-49fea6bfeb8e.jpg'
  , 'IS YOUR TONAIL FUNGUS OUT OF CONTROL?'
  , 1
  , '[]'
  , '[]'
  , '["foot", "death", "toenail", "nail", "fungus", "feet", "elderly", "organic"]'
  , true
  )
-- , (
--     ''
--   , 'https://i.pinimg.com/originals/fc/a3/18/fca31854ca2e944467184d58a381d8ec.jpg'
--   , 'YOUR BACK PAIN MIGHT NOT BE SO SIMPLE'
--   , 1
--   , '[]'
--   , '[]'
--   , '["back", "pain", "organ", "organs", "accupuncture", "intestine", "liver", "heart"]'
--   , true
--   )
, (
    'https://secure.ngagelive.com/chat/index.aspx?websiteid=92-90-134-193-83-0-152-30&alt=false&wl=false&loc=https%3A//wegrowhair.com/&mode=AutoEngage&visitorId=a422fd99-ab43-4b5a-a8bc-aa1d00368c4c'
  , 'http://3.bp.blogspot.com/-SWo3Fi7Kb5I/Ue9EP7ITfJI/AAAAAAAAD6A/5xacI3uWLLQ/s1600/h9991572_001.jpg'
  , 'PREVENT UGLY HAIR LOSS NOW'
  , 1
  , '["male", "man"]'
  , '[]'
  , '["male", "man", "testosterone", "hair", "loss", "bald", "balding"]'
  , false
  )
, (
    'https://flatbellyrevolution.com/'
  , 'http://d1nnx3nhddxmeh.cloudfront.net/wp-content/uploads/2018/05/01122237/Overweight-Problems-Heres-How-to-Reset-Your-Melt-Fat-Hormones.jpg'
  , 'GET THAT BIKINI BODY FAST'
  , 1
  , '["woman", "female"]'
  , '[]'
  , '["fat", "skinny", "pepper", "hot", "furnace", "drip"]'
  , false
  )
, (
    'https://news.trycapsifit.com/'
  , 'https://i.pinimg.com/originals/fb/99/31/fb9931fc50a7e72fc9a708e960db3935.jpg'
  , 'WATCH FAT DRIP OFF YOUR BODY LIKE A FAT MELTING FURNACE'
  , 1
  , '["man", "male"]'
  , '[]'
  , '["fat", "skinny", "pepper", "hot", "furnace", "drip"]'
  , false
  )
, (
    'https://ketomeltandtrim.com/ss/'
  , 'http://media1.s-nbcnews.com/i/streams/2012/August/120827/504274-g-tdy-091221-belly-2p.jpg'
  , 'WATCH FAT DRIP OFF YOUR BODY LIKE A FAT MELTING FURNACE'
  , 1
  , '["male"]'
  , '[]'
  , '["fat", "skinny", "pepper", "hot", "furnace", "drip"]'
  , false
  )
, (
    'https://www.youtube.com/watch?v=SyvOPXeg4ig'
  , 'https://cdn1.medicalnewstoday.com/content/images/articles/320/320227/cancer-cell.jpg'
  , 'STOP CANCER DEAD IN ITS TRACKS'
  , 1
  , '[]'
  , '[]'
  , '["cancer", "stop", "dead", "death", "blood", "cells"]'
  , true
  )
-- , (
--     'https://steviep.xyz#indigo'
--   , 'https://i.ytimg.com/vi/Bey3c8kVm7M/maxresdefault.jpg'
--   , 'ARE YOU AN INDIGO CHILD? FIND OUT NOW'
--   , 1
--   , '["woo"]'
--   , '[]'
--   , '["add", "indigo", "child", "children", "chakra", "special", "energy", "collective"]'
--   , true
--   )
, (
    'https://weliveinamadworld.com/5g-and-intelligent-connectivity-a-plague-to-consume-humanity/'
  , 'https://weliveinamadworld.com/wp-content/uploads/2019/02/5g.jpg'
  , '5G AND THE COMING PLAGUE TO CONSUME HUMANITY'
  , 1
  , '[]'
  , '[]'
  , '["illuminati", "5g", "holocaust", "internet-of-things", "iot", "vr", "virtual", "reality", "individuality"]'
  , false
  )
, (
    'https://renegadevids.com/category/jews/'
  , 'http://www.conspirazzi.com/wp-content/uploads/2010/06/eternal-jew-illuminati.jpg'
  , 'SEMETIC SUBLIMINALS AND THE JEWISH QUESTION'
  , 1
  , '[]'
  , '["jew", "jews", "jewish"]'
  , '["semetic", "subliminal", "illuminati"]'
  , false
  )
, (
    'http://universeinsideyou.net/experiments-proving-astral-projection-is-real/'
  , 'https://cdn.shopify.com/s/files/1/0823/4911/products/CD260-3_1024x1024.jpg'
  , 'Are you curious to see where your spirit travels unrestrained from your body?'
  , 1
  , '["woo"]'
  , '[]'
  , '["astral", "projection", "subliminal", "chakra", "energy", "sound", "light", "healing", "consciousness", "dream", "sleep"]'
  , true
  )
, (
    'https://www.youtube.com/watch?v=ZOvk1DfLO6c'
  , 'https://i.ytimg.com/vi/ZOvk1DfLO6c/hqdefault.jpg'
  , 'DONT LET YOUR LUCK RUN OUT'
  , 1
  , '[]'
  , '[]'
  , '["luck", "clover", "horseshoe", "subliminal", "sexy", "vortex", "fortune"]'
  , true
  )
, (
    'https://www.youtube.com/watch?v=OK40AYHL97I'
  , 'https://www.institutobernabeu.com/foro/en/files/2014/02/021.jpg'
  , 'INCREASE YOUR SPERM COUNT WITHOUT TOUCHING A BUTTON'
  , 1
  , '["male", "man"]'
  , '[]'
  , '["binaural", "beats", "music", "sperm", "seamen", "sex"]'
  , false
  )
, (
    'https://www.crystalinks.com/reality.html'
  , 'https://www.crystalinks.com/binarycodebrain350.jpg'
  , 'REALITY MAY NOT BE WHAT YOU THINK! CLICK HERE TO FIND OUT'
  , 1
  , '[]'
  , '[]'
  , '["reality", "digital", "consciousness", "brain", "hologram", "simulation", "illusion", "dream", "numbers", "numeric", "dna", "information"]'
  , false
  )
-- , (
--     'http://steviep.xyz'
--   , 'https://www.scienceabc.com/wp-content/uploads/2016/01/shutterstock_338992685.jpg'
--   , 'WHAT''S SO FUNNY?'
--   , 1
--   , '[]'
--   , '[]'
--   , '["funny", "laugh", "laughing", "lol", "haha"]'
--   , true
--   )
-- , (
--     'http://steviep.xyz#your-computer-is-infected'
--   , 'https://i.ytimg.com/vi/-HE3jj5Ah2M/maxresdefault.jpg'
--   , 'CLICK THE KITTY'
--   , 1
--   , '[]'
--   , '[]'
--   , '["kitty", "kitten", "cat", "meow", "laugh", "happy", "virus", "infected", "scared"]'
--   , true
--   )
, (
    'https://www.youtube.com/watch?v=luN8xx2LG8g'
  , 'https://i1.wp.com/www.indianinthemachine.com/wp-content/uploads/2016/07/ashtar-semjase.jpg'
  , 'A MESSAGE FROM OUR COSMIC BROTHERS/SISTERS'
  , 1
  , '[]'
  , '[]'
  , '["pleiadians", "ufo", "alien", "aliens", "ufos", "space", "physics"]'
  , true
  )
, (
    'https://www.atlassurvivalshelters.com/'
  , 'https://www.veteranstoday.com/wp-content/uploads/2015/04/08/nuke-nyc.jpg'
  , 'ARE YOU READY FOR THE NUCLEAR EVENT?'
  , 1
  , '[]'
  , '["bunker", "atlas"]'
  , '["nuke", "nuclear", "war", "disaster", "apocalypse", "bomb", "survival", "shelter"]'
  , true
  )
, (
    'https://0ms.co/constipationrelief.html'
  , 'https://st2.depositphotos.com/1345122/5547/i/950/depositphotos_55471531-stock-photo-female-large-intestine-anatomy.jpg'
  , '"TOP DRs RECCOMEND THIS ONE DRUG TO COMPLETELY FLUSH YOUR BOWELS"'
  , 1
  , '["woman", "female", "girl"]'
  , '[]'
  , '["doctor", "bowels", "shit", "poop", "constipated", "intestine"]'
  , false
  )
-- , (
--     'https://steviep.xyz#your-computer-is-infected'
--   , 'https://thecount.com/wp-content/uploads/2019/05/octopus-wiki.jpg'
--   , 'YOU''LL NEVER BELIEVE WHAT THIS WOMAN FOUND UNDER HER SINK'
--   , 1
--   , '[]'
--   , '["octopus"]'
--   , '[]'
--   , true
--   )
, (
    'https://steviep.xyz'
  , 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555930491/shape/mentalfloss/434arms_6.jpg'
  , 'ARE YOU SMARTER THAN AN OCTOPUS?'
  , 1
  , '[]'
  , '["octopus", "smarter"]'
  , '[]'
  , true
  )
, (
    'https://0ms.co/cruise-winner.html'
  , 'https://disneyparksnews.com/uploads/sites/4/2016/03/Disney-Cruise-Line-Announces-Two-New-Ships-e1496345681909.jpg'
  , 'YOU JUST WON A FREE CRUISE'
  , 1
  , '[]'
  , '["cruise"]'
  , '[]'
  , true
  )
-- , (
--     ''
--   , 'https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_468/overcome_fears_1200x627.jpg'
--   , 'OH NO, YOU''RE NOT GOING TO BELIEVE THIS'
--   , 1
--   , '[]'
--   , '[]'
--   , '["fear", "anxiety", "scared"]'
--   , true
--   )
-- , (
--     'https://steviep.xyz'
--   , 'https://andreabeaman.com/wp-content/uploads/2015/09/ascaris-worm-parasite.jpg'
--   , 'GOT PARASITES IN YOUR BODY?'
--   , 1
--   , '[]'
--   , '["parasite", "parasites", "surgery"]'
--   , '[]'
--   , true
--   )
-- , (
--     'https://steviep.xyz#ti'
--   , 'http://discovermagazine.com/~/media/Images/Issues/2015/may/DBSgraphic.jpg'
--   , 'TRY DEEP BRAIN STIMULATION THERAPY'
--   , 1
--   , '[]'
--   , '["stimulation", "electrode", "dbs"]'
--   , '["deep", "brain", "therapy", "depressed", "depression", "targeted", "scanners", "scanner", "tracker", "target", "targeted", "individual", "ti"]'
--   , true
--   )
, (
    'https://www.liftandtighten.com/v_02.php'
  , 'http://www.ccplasticsurgery.com/media/site_assets/f61261e989d144a40e5578c1743298b1/assets/woman_sketched.jpg'
  , 'ARE YOU UGLY?'
  , 1
  , '["female"]'
  , '["beauty", "ugly"]'
  , '["surgery", "plastic"]'
  , false
  )
, (
    'https://0ms.co/constipationrelief.html'
  , 'https://cdn.images.express.co.uk/img/dynamic/11/590x/Worms-in-humans-845437.jpg'
  , 'CONSTIPATED??'
  , 1
  , '[]'
  , '["constipated", "constipation", "constipate"]'
  , '["shit", "poop", "poo",  "intestine"]'
  , false
  )
-- , (
  --   'https://www.youtube.com/watch?v=q-Oq_NUiA88&feature=youtu.be'
  -- , 'https://cdn-images-1.medium.com/max/1200/0*i9Ff80qVKtQP_K4J.jpg'
  -- , 'WATCH OUT FOR THESE 12 THINGS THAT CAN RUIN YOUR DAY'
  -- , 1
  -- , '[]'
  -- , '[]'
  -- , '["sad", "depressed", "melencholy", "anxious", "anxiety", "depression", "anhedonia", "motivation", "happy", "mental", "brain", "suicide", "suicidal", "ocd", "obsessed", "scared", "fear", "emptiness", "cbd", "antidepressant"]'
  -- , true
  -- )
-- , (
--     ''
--   , 'http://dailyvibes.co/wp-content/uploads/2018/03/shutterstock_336693212.jpg'
--   , 'YOU JUST READ MY MIND'
--   , 1
--   , '["female"]'
--   , '["telepathy"]'
--   , '["mind-control", "subliminal"]'
--   , false
--   )
-- , (
--     ''
--   , 'http://tall-white-aliens.com/wp-content/uploads/2017/10/Human-to-Human-Telepathic-Communication.jpg'
--   , 'YOU JUST READ MY MIND'
--   , 1
--   , '["male"]'
--   , '["telepathy"]'
--   , '["mind-control", "subliminal"]'
--   , false
--   )
, (
    'https://prepareforchange.net/2018/12/16/secret-darpa-mind-control-project-revealed-leaked-document/'
  , 'https://upload.wikimedia.org/wikipedia/commons/d/d1/IAO-logo.png'
  , 'DARPA MIND CONTROL SECRET DOCUMENT LEAKED'
  , 1
  , '[]'
  , '["darpa"]'
  , '["mind", "control", "5g", "ti", "targeted", "individual"]'
  , false
  )
, (
    'https://trylifestreamlabs.com/gummies/v1.5/desktop/'
  , 'https://www.incredmed.com/wp-content/uploads/2018/07/cbd_science_placeholder.jpg'
  , 'RELIEVE YOUR PAIN WITH CBD OIL'
  , 1
  , '[]'
  , '["cbd"]'
  , '["pot", "weed", "drugs", "marijuana", "pain"]'
  , true
  )
-- , (
--     'https://steviep.xyz/#7-steps'
--   , 'https://purepng.com/public/uploads/large/purepng.com-men-in-suitmanpeoplepersonsmalesuit-1121525121301szwqf.png'
--   , 'I WANT TO SHOW YOU THE SEVEN STEPS TO DATING SUCCESS'
--   , 1
--   , '["male"]'
--   , '["seduction", "dating"]'
--   , '["romance", "sex"]'
--   , false
--   )
-- , (
--     'https://steviep.xyz/#sexy-singles'
--   , 'https://vignette.wikia.nocookie.net/velesk-games/images/b/b1/Intro02_jpg.jpg/revision/latest?cb=20171008084733'
--   , 'FIND SEXY SINGLES IN YOUR AREA'
--   , 1
--   , '["female"]'
--   , '["sex"]'
--   , '["sexy", "dating", "singles"]'
--   , false
--   )
, (
    'http://www.anusha.com/'
  , 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/faridmusayev/phpBe26Fu.png'
  , 'SAM SLOAN 2020 doesn''t play politics as usual'
  , 1
  , '[]'
  , '["chess", "666"]'
  , '["2016", "hillary", "sloan"]'
  , true
  )
, (
    'https://www.amazon.in/Freemasonry-666-Universal-Emperor-Months/dp/0954310152'
  , 'https://images-na.ssl-images-amazon.com/images/I/51HvZ2-sqGL._SX348_BO1,204,203,200_.jpg'
  , 'The Freemasonry (666) Universal Emperor for 42 Months: 666, 999, Miracle Hell, Genesis, Symbol of Freemasonry'
  , 1
  , '[]'
  , '["freemasonry", "666"]'
  , '["universal", "emperor", "42", "miracle", "hell", "genesis"]'
  , false
  )
, (
    'http://obeyjesus.org'
  , 'https://www.thespruceeats.com/thmb/9n3YM4RVKSWyUWQ0JCl7BwHrl1U=/4288x2848/filters:fill(auto,1)/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg'
  , 'JESUS is the BREAD of LIFE'
  , 1
  , '[]'
  , '["bread", "jesus"]'
  , '["christianity", "god", "sandwich", "miracle", "hell", "genesis", "bible"]'
  , true
  )
-- , (
--     'https://steviep.xyz#virus'
--   , 'http://www.soidergi.com/wp-content/uploads/ph/photostock-vector-man-silhouette-isolated-on-white-background-in-falling-pose.jpg'
--   , 'DONT FALL FOR THIS ONE TRICK'
--   , 1
--   , '[]'
--   , '[]'
--   , '["safe", "safety", "virus", "spyware", "malware", "security"]'
--   , true
--   )
, (
    'http://www.radiationdangers.com/cell-phones/how-big-technology-companies-control-the-minds-of-the-masses-through-smart-phone-addiction/'
  , 'http://www.radiationdangers.com/wp-content/uploads/2018/08/Screen-Shot-2018-08-12-at-1.41.56-PM-768x453.png'
  , 'HOW BIG TECH IS CONTROLLING YOU'
  , 1
  , '[]'
  , '["5g", "addiction"]'
  , '["5g", "internet", "addiction", "mind", "control", "towers", "smartphone"]'
  , false
  )
, (
    'https://askclaudia.com/voice-god-weaponized-mind-control-frequency-technology-2/'
  , 'https://www.theblackvault.com/documentarchive/wp-content/uploads/2015/02/Mind-Control-731x411.jpg'
  , 'VOICE GOD WEAPONIZED MIND CONTROL FREQUENCY TECHNOLOGY'
  , 1
  , '[]'
  , '["weaponized"]'
  , '["5g", "internet", "addiction", "mind", "control", "towers", "smartphone", "digital", "thoughts", "ti", "targeted"]'
  , false
  )
, (
    'https://www.wanttoknow.info/mindcontrolinformation'
  , 'https://www.wanttoknow.info/mk/nsa-images/scalartech12_03.gif'
  , 'YOU''VE NEVER SEEN COGNITIVE MAPPING KNOWLEDGE-PROCESSING LIKE THIS'
  , 1
  , '[]'
  , '["cognitive", "knowledge", "processing"]'
  , '["radio", "transmission", "mind", "control", "nsa", "microwave", "frequency", "ti", "targeted"]'
  , false
  )
, (
    'http://www.torturedinamerica.org/'
  , 'http://www.torturedinamerica.org/nonwo.jpg'
  , ''
  , 1
  , '["politics"]'
  , '["nwo"]'
  , '["new", "world", "order", "deep", "state", "politics", "corruption", "ti", "targeted"]'
  , false
  )
, (
    'http://fastcashmoneyplus.biz'
  , 'https://i.imgur.com/BzrG85K.png'
  , 'GOT MONEY ON THE BRAIN?'
  , 1
  , '[]'
  , '["x-ray"]'
  , '["money", "brain", "cash", "skull", "rich", "profit", "dopamine", "wealth", "fastcash"]'
  , true
  )
-- , (
--     'https://steviep.xyz#self-help'
--   , 'https://d3b3by4navws1f.cloudfront.net/iStock-629568880.jpg'
--   , 'ARE YOU SICK OF GOING TO WORK?'
--   , 1
--   , '[]'
--   , '["driving"]'
--   , '["depressed", "sad", "anxious", "anxiety", "muscle", "work", "hate"]'
--   , true
--   )
, (
    'https://pathtoawakening.net/emf-balancing-technique/'
  , 'https://i.imgur.com/zIOEsMZ.jpg'
  , 'HOW ARE YOU USING YOUR ENERGY?'
  , 1
  , '["woo"]'
  , '["emf", "electromagnetic"]'
  , '["relationship", "cocreate", "relationships", "chakra", "energy", "therapy", "electo", "magnetic", "intuition", "happy", "depressed", "soul"]'
  , true
  )
, (
    'http://ascendedhealer.com/'
  , 'http://ascendedhealer.com/images/hypnosis-cds2.jpg'
  , 'THERE IS NO REASON FOR YOU TO SUFFER WITH ANYTHING EVER AGAIN FOR THE REST OF YOUR LIFE'
  , 1
  , '["woo"]'
  , '["dream", "dreams", "dreaming"]'
  , '["lucid", "therapy", "woo", "hypnosis", "suffering", "depressed"]'
  , true
  )
, (
    'https://www.lifeenergysolutions.com/'
  , 'https://newagora.ca/wp-content/uploads/2019/04/orgonite.jpg'
  , 'Protect yourself from EMF''s! (Electro-magnetic Frequencies)'
  , 1
  , '["woo"]'
  , '["emf"]'
  , '["5g", "electromagnetic", "jewelry", "electric", "cancer", "jewelry"]'
  , true
  )
, (
    'https://www.shambhalahealingtools.com/'
  , 'https://www.shambhalahealingtools.com/v/vspfiles/assets/images/donation-ewt-2t.jpg'
  , 'Maitreya Solar Crosses (TM): Spiritual Awakening That Radiate Higher Harmonics'
  , 1
  , '["woo"]'
  , '["buddha"]'
  , '["healing", "moon", "jesus", "christ", "blessing", "buddhism", "harmony", "harmonics", "spirit", "spiritual", "spirituality"]'
  , true
  )
, (
    'https://unariansunited.com/who-we-are/'
  , 'https://unariansunited.com/wp-content/uploads/Pic-2-Venus-high-plane.jpg'
  , 'Explore past-life therapy to achieve a Higher Self'
  , 1
  , '["woo"]'
  , '["unarius"]'
  , '["spirit", "spiritual", "spirituality", "god", "therapy", "venus", "mars"]'
  , true
  )
, (
    'https://www.waterworks4u.com/'
  , 'http://www1.udel.edu/PR/UDaily/2007/mar/Szalewiczfiglg.jpg'
  -- , 'https://st2.depositphotos.com/3782659/11737/i/950/depositphotos_117378280-stock-photo-young-asian-woman-thumbs-up.jpg'
  -- , 'http://www.kenho-products.com/kenho/admin/src/images/learn2.PNG'
  , 'IMPROVE YOUR LIFE WITH HEALTHY HYDROGEN WATER'
  , 1
  , '["woo"]'
  , '["water", "hydrogen"]'
  , '["ion", "acidic", "alkaline", "radicals", "health", "h20", "infinity", "oasis", "ph"]'
  , true
  )
, (
    'https://www.implanet.net/'
  , 'https://i.imgur.com/7hoZ1bt.jpg'
  , 'I COULDN''T BELIEVE THEY WEREN''T REAL TEETH!'
  , 1
  , '[]'
  , '["teeth", "tooth"]'
  , '["dental", "dentist", "implants", "implant", "cavity", "mouth", "gums", "dentures"]'
  , true
  )
, (
    'https://www.hypnosiswow.com/'
  , 'https://www.wayoflife.org/reports/beware-of-hypnosis_files/hypnosis-copy.jpg'
  , 'TAKE CONTROL OF YOUR SEX LIFE'
  , 1
  , '["woo"]'
  , '["hypnosis"]'
  , '["therapy", "depression", "anxiety", "weight", "quantum", "motivation", "motivaitonal", "phobia"]'
  , true
  )
, (
    'https://0ms.co/'
  , 'https://iedunote.com/img/10964/what-is-transactions-types-of-accounting-transactions.jpg'
  , 'WE WILL HELP YOU SELL YOUR PRODUCT'
  , 1
  , '[]'
  , '["ad", "ads", "advertisement", "advertisements"]'
  , '["sponsored", "marketing", "sales", "optimization"]'
  , false
  )
, (
    'https://github.com/scyclow/friendworld'
  , 'https://quantummagneticresonance.com/wp-content/uploads/2018/08/reparar-la-m%C3%A1quina-de-hidrogeno.jpg'
  , 'WE GET THE JOB DONE'
  , 1
  , '[]'
  , '[]'
  , '[]'
  , true
  )
, (
    'https://www.bilderberg.org/index.htm'
  , 'https://atlanticsentinel.com/wp-content/uploads/2017/08/1877-Fred-Rose-Europe-map-600x400.jpg'
  , 'IS THERE SOMETHING THAT'
  , 1
  , '[]'
  , '["bilderberg"]'
  , '["octopus", "globalization", "conspiracy", "illuminati"]'
  , true
  )
, (
    'http://www.stopabductions.com/'
  , 'http://www.stopabductions.com/jonlocke.jpg'
  , 'Stop abductions NOW'
  , 1
  , '[]'
  , '["abduction", "abductions"]'
  , '["alien", "ufo", "conspiracy", "extraterestrial"]'
  , true
  )
, (
    'https://newlifeexpo.com/'
  , 'https://rhysthomasinstitute.com/wp-content/uploads/2010/05/Chakra-Chart.jpg'
  , 'LOOK GREAT, FEEL GREAT'
  , 1
  , '[]'
  , '["woo"]'
  , '["expo", "conference", "charkra", "chakras", "hypnosis", "woo", "spirituality", "vibrations", "5g", "energy", "newage", "newlife", "dream", "therapy"]'
  , true
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
