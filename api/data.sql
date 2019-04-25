insert into friendworld.users (id, username, avatar_url, gender) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'steve_p', 'https://www.healthyfamiliesbc.ca/sites/hfbcprox-prod.health.gov.bc.ca/files/thumbnails/getting-child-to-eat-breakfast.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'VinceSlickson', 'https://media.mnn.com/assets/images/2014/05/kid%20eating%20cereal%20large.jpg.653x0_q80_crop-smart.jpg', 'yes please!')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, 'SweetSalvation66', 'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2014/07/cereal-179691809.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'sadsack4', 'https://image.shutterstock.com/image-photo/portrait-beautiful-child-having-breakfast-260nw-226912240.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'DumboTheClown', 'https://www.healthybabycereals.org/sites/healthybabycereals.org/files/images/2017-12/BabyEatingCereal.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, 'SuperCatMeow', 'https://www.edmontonhumanesociety.com/wp-content/uploads/2018/05/Black-cat-looking-at-camera-e1533738476357.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, 'TargetedTom', 'https://cdn.business2community.com/wp-content/uploads/2012/12/Targeted-User-Education.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefab'::uuid, 'fuckface99', 'https://i.ytimg.com/vi/sM-O4ZOwB2U/hqdefault.jpg', '')
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, 'BullseyeBob', 'https://images-na.ssl-images-amazon.com/images/I/71UgYrtHFnL._SX425_.jpg', '')
;

insert into friendworld_private.accounts (user_id, password_hash) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, crypt('test1', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, crypt('test2', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, crypt('test3', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, crypt('test4', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, crypt('test5', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, crypt('test6', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, crypt('test7', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefab'::uuid, crypt('test8', gen_salt('bf')))
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, crypt('test9', gen_salt('bf')))
;

insert into friendworld.threads (title) values
  ('Do you want to make Fast Cash now? Then click here!')
, ('Ive had a rough couple months, and I dont know where else to turn')
, ('They are listening to everything I say and do.')
, ('You wont BELIEVE the kind of BULLS#!T that the Dems are pulling this week')
, ('What is your favorite color?')
, ('Advertising is slowly killing us')
, ('A solar flare may kill us all')
, ('Im so happy')
, ('I know that this is a really long title, but, and it means that this will chop off some of it into an elipses at some point. I dont know how to spell ellipses, but whatever... I just need a really long title for testing purposes. I wonder if this is at 300 characters yet. I dont know. I better write a bit more just to be safe. I dont want to have to write a really really long title again, after all. Better safe than sorry. Thats what they say.')
, ('Has anyone else been the subject of a targeting campaign by the united states government?')
, ('HI!')
, ('And the cow JUMPED over the moon!')
;


insert into friendworld.posts (author_id, content, thread_id) values
  ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'I like making money. do you???', 1)
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
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Did you know because I certainly did not!!!', 7)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefee'::uuid, 'Look at this picture of me and my girlfriend: https://pngimage.net/wp-content/uploads/2018/06/happy-couple-png-3.png', 8)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefef'::uuid, '!', 9)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, 'Ive been dealing with this for the last couple of months, and jsut wanted to know if anyone had any tips or tricks for dealing with this problem. Its been really tough researching this topic, for obvious reasons. Thanks in advance, Bob', 10)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, 'Hi Tom, welcome to Friendworld! I know that youre going through a lot of stress right now. Believe me-- Ive been there. In fact, this sort of thing is MUCH more common than youd expect. In any given year, various DeepState agencies of the Federal Government keep close tabs on at least 500,000 people-- many of whom are citizens, although some are just interesting illegal aliens. A smaller subset of this group-- maybe 25,000 of them-- are subjected to a much more focused surveilance program. Most of the TI community falls into this bucket (the rest are just crazy, believe it or not, but thats a different story). It sounds like you fall into this latter group. The most important thing to remember is to KEEP CALM. If they know that you know about them, they will become much more agressive, and try to eliminate you before you have a chance to tell others. Its obviously too late for that, but you can still take some actions to mitigate the damage: '||E'\n'||' First, be sure to use VPNs and throwaway accounts/emails in all of your online communication. Similarly, be sure to avoid giving out identifying information. If they cant tell that you are you, then they cant know what you know. Also, use an anonymous browser like tor, and DELETE YOUR BROWSING HISTORY. You might want to leave some of the cookies and local storage of friendworld untouched though-- i know the owners of the site, and they cna be trusted. If youre doing this already then things are less urgent, but you should still read through these instructions to be safe. '||E'\n'||' Second, theres a good chance that youve already been chipped, so youre going to need to run some tests. the best way to tell is by using magnets. the ones on your refridgerator wont do. youll need something a bit stronger. If you dont happen to have a strong magnet lying around the house, go pick one up at the hardware store. But dont be too conspicuous. Buy a hammer, some nails, duct tape, and a box cutter as long as youre there. It will look like youre doing some basic home improvement, and wont raise any eyebrows. Besides, youll need all of these later. Remember to pay for all of this in CASH, or possibly an anonymous cryptocurrency. You dont need them tracking your purchases. Once youre home, youre going to want to use the magnet to check for implants. In particular, youre going to want to check your temples, hands, and neck-- but really anywhere on your head could be affected. Also check the fleshier parts of youre body, such as your biceps or buttocks. if you feel a magnetic tug, I hate to tell you: but youre going to have to use the box cutter and some tweezers to pull it out. be sure to sterilize the blade first with some rubbing alcohol. '||E'\n'||' Third, once youre clean-- and depending on the severity of your situation-- you might want to consider physically escaping from your current life. dont tell anyone-- you dont know who you can trust, so its best to just GET OUT. '||E'\n'||' And remember, try to act sooner rather than later. The cats very likely already out of the bag, so to speak, so you likely need to do damage control.', 10)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefaa'::uuid, 'So, a few weeks ago I took bullseyebob'||E'\''||'s advice and gave my body a sweetp for tracking chips -- and boy, am I glad I did! I was completely shocked to find that I had a big fat one implanted in the back of my neck where it connects to the base of my skull. Thankfully I was able to cut it out. It wasn'||E'\''||'t easy, but im glad I did it. My thoughts have been so much clearer...and in a lot of ways, I feel like I have much more agency. To be sure, I wasn'||E'\''||'t feeling great after I first extracted it. I don'||E'\''||'t know what it was doing, exactly, but in a lot of ways it felt like it became an extension of my mind. There must have been some sort of feedback loop going on, because after extraction it felt like a part of my brain was missing. For the first time I noticed that I  had been falling into certain thought patterns, which were reinforced by the chip. Here'||E'\''||'s an example: before, I would get hungry and an electrical signal in my brain would tell me to order food on the internet. This was clearly the desired reaction of whoever chipped me, as it gave them a clear paper trail of what I ate. I'||E'\''||'m sure that every meal I ate in the last couple months was logged to a database somewhere. But after extraction, I noticed that after I got hungry I'||E'\''||'d forget what I was doing. Without that feedback loop telling me what to do, my thought patterns no longer made any sense. It took a little while to adjust, and I lost a bunch of weight, but I'||E'\''||'m starting to feel better. There'||E'\''||'s definitely a retraining process that needs to take place, to say the least. At the end fo the day though, I think it will be worth it. ', 10)
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
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefac'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'hello steven :)', '2019-02-16 19:54:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefeb'::uuid, 'hello vince :)', '2019-02-16 19:55:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefed'::uuid, 'I dont like you', '2019-02-16 19:56:08.154957'::timestamp)
, ('0a04ff42-a2c6-4e1f-bda9-80c493abefec'::uuid, '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid, 'I dont kknow where you get off talkin to me like that but i dont like it and you better gimme every ounce of respect i deserve you sick slimey fuck!', '2019-02-17 19:50:08.154957'::timestamp)
;

insert into friendworld.alerts (user_id, content, link) values (
  '0a04ff42-a2c6-4e1f-bda9-80c493abefea'::uuid
, 'You received a message from @VinceSlickson!'
, '/messages/VinceSlickson'
)
;

-- TODO FIGURE OUT WHICH ONES SHOULD BE OFF BY DEFAULT
insert into friendworld.ads (url, img, content, tags, is_generic) values
  (
    'http://fastcashmoneyplus.biz'
  , 'https://www.washingtonpost.com/resizer/bmfQHooAGH6PmEv0qHjgf-ZUy-k=/480x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/EBULPVFULQI6PG4TXFYEHZL2EI.jpg'
  , 'MAKE FAST CASH NOW'
  , '["fastcash", "fastcashmoneyplus", "fastcashmoneyplusbiz", "fastcashmoneybiz", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "crypto", "cryptocurrency", "bitcoin", "btc", "ethereum", "eth", "invest", "investing", "finance", "ico", "fortune", "millionaire", "billionaire", "blockchain", "economy", "payment", "trick", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz'
  , 'https://kitchenreviewed.com/wp-content/uploads/2017/10/spending_too_on_meat_grinder.jpg'
  , 'STOP THROWING AWAY YOUR MONEY'
  , '["throwing", "fastcash", "fastcashmoneyplus", "fastcashmoneyplusbiz", "fastcashmoneybiz", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "crypto", "cryptocurrency", "bitcoin", "btc", "ethereum", "eth", "invest", "investing", "finance", "ico", "fortune", "millionaire", "billionaire", "blockchain", "economy", "payment", "trick", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz'
  , 'https://previews.123rf.com/images/belchonock/belchonock1801/belchonock180130743/95161261-elegant-man-in-suit-holding-money-isolated-on-white.jpg'
  , 'SEE WHAT SUCCESS TASTES LIKE'
  , '["success", "taste", "money", "cash", "profit", "suit", "wealth"]'
  , true
  )
, (
    'https://www.amazon.com/Quick-Turn-Real-Estate-Millionaire/dp/B005ZOBAS2'
  , 'https://images-na.ssl-images-amazon.com/images/I/61G83WP73VL._SX258_BO1,204,203,200_.jpg'
  , 'YOU CAN BECOME THE NEXT MILLIONAIRE'
  , '["millionaire", "billionaire", "fast", "cash", "money", "rich", "wealth", "suit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz'
  , 'https://www.oneworldnews.com/wp-content/uploads/2017/12/57.jpg'
  , 'ACHIEVE YOUR FINANCIAL DREAMS TODAY'
  , '["dream", "dreams", "sleep", "pillow", "fastcash", "fastcashmoneyplus", "fastcashmoneyplusbiz", "fastcashmoneybiz", "moneybucks", "bucks", "fast", "cash", "money", "rich", "wealth", "saving", "savings", "invest", "investing", "finance", "fortune", "millionaire", "profit"]'
  , true
  )
, (
    'http://fastcashmoneyplus.biz'
  , 'https://media.brstatic.com/2017/09/25112945/family-showing-young-member-piggy-bank-savings-getty_573x300.jpg'
  , 'SAVE MORE MONEY WITH THIS WEIRD TRICK'
  , '["fastcash", "fastcashmoneyplus", "money", "savings", "saving", "family"]'
  , true
  )
, (
    'http://fakebullshit.news'
  , 'https://i.imgur.com/94L6Q6X.jpg'
  , 'UH OH... WHAT DID SHILLARY DO THIS TIME?!'
  , '["politics", "political", "government", "democrats", "republicans", "gop", "liberal", "liberals", "conservative", "conservatives", "libtards", "cucks", "cuck","clinton","socialist", "socialism", "shillary", "sjw", "sjws", "social", "justice", "warriors"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://www.thoughtco.com/thmb/_Wdk4z5X4uEhg4h88GTFPS8KQqw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/h20-58e655f93df78c5162ea0a1f.jpg'
  , 'YOULL NEVER BELIEVE WHAT SCIENTISTS ARE FINDING IN YOUR FOOD'
  , '[]'
  , true
  )
, (
    'https://target.com'
  , 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/1200px-Target_Corporation_logo_%28vector%29.svg.png'
  , 'TARGET: EXPECT MORE PAY LESS'
  , '["target", "targeted", "targeting"]'
  , true
  ), (
    'http://steviep.xyz'
  , 'https://www.consciouslifestylemag.com/wp-content/uploads/2016/04/chakra-diagram-in-the-body.jpg'
  , 'CLEAN YOUR CHAKRAS WITH THESE 3 SPIRITUAL TECHNIQUES'
  , '["woo", "spirit", "mental", "spirituality", "god", "chakra", "chakras", "sound", "meditation", "reality", "dream", "dreams", "hypnosis", "mantra", "mantras", "technique", "energy", "karma", "cleanse", "vegan", "ascend", "ascension", "newage", "consciousness"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://targetedindividualscanada.files.wordpress.com/2011/01/psycho-electronic-weapon-effects-pic1.jpg'
  , 'THE GOVERNMENT JUST FREAKED ABOUT NEW INFO LEAKING'
  , '["ti", "targeted", "target", "targeting", "tracking", "conspiracy", "nuclear", "drone", "5g", "radiation", "alien", "aliens", "ufo", "ufos", "roswell", "brain", "mind-control", "chemtrails", "tracking"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://targetedindividualscanada.files.wordpress.com/2011/11/brain-inplants.jpg'
  , 'WHAT YOU DONT KNOW ABOUT YOUR BRAIN MAY KILL YOU'
  , '["sad", "depressed", "melencholy", "anxious", "anxiety", "depression", "anhedonia", "motivation", "happy", "mental", "brain", "suicide", "suicidal", "ocd", "obsessed", "scared", "fear", "emptiness", "cbd", "antidepressant"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://www.chantellerenee.org/wp-content/uploads/2018/06/light-dimensions-ascension-1.jpg'
  , 'SUBMIT TO GOD BEFORE ITS TOO LATE'
  , '["woo", "spirit", "spirituality", "god", "chakra", "chakras", "sound", "meditation", "reality", "dream", "dreams", "hypnosis", "mantra", "mantras", "technique", "energy", "karma", "cleanse", "vegan", "ascend", "ascension", "newage"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://a57.foxnews.com/a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2018/09/640/320/1862/1048/adacbcf6-640_brain.jpg'
  , 'IS SOMETHING WRONG WITH YOUR BRAIN? FIND OUT NOW'
  , '["brain", "wrong", "psychology", "sad", "anhedonia", "depressed", "anxious", "anxiety"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2018/20-neuroscienti.jpg'
  , 'ARE YOU FORGETTING TO REMEMBER?'
  , '["brain", "remember", "forget", "forgetting"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://corespirit.com/api/Containers/corespirit-static/download/size_1200_880ab40a-c7be-43be-9223-49fea6bfeb8e.jpg'
  , 'FIND OUT WHAT HAPPENS TO PEOPLE WITH THIS STRAIN OF TONAIL FUNGUS'
  , '["foot", "death", "toenail", "nail", "fungus", "feet", "elderly"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://i.pinimg.com/originals/fc/a3/18/fca31854ca2e944467184d58a381d8ec.jpg'
  , 'YOUR BACK PAIN MIGHT NOT BE SO SIMPLE'
  , '["back", "pain", "organ", "organs", "accupuncture", "intestine", "liver", "heart"]'
  , true
  )
, (
    'https://secure.ngagelive.com/chat/index.aspx?websiteid=92-90-134-193-83-0-152-30&alt=false&wl=false&loc=https%3A//wegrowhair.com/&mode=AutoEngage&visitorId=a422fd99-ab43-4b5a-a8bc-aa1d00368c4c'
  , 'http://3.bp.blogspot.com/-SWo3Fi7Kb5I/Ue9EP7ITfJI/AAAAAAAAD6A/5xacI3uWLLQ/s1600/h9991572_001.jpg'
  , 'YOUR BACK PAIN MIGHT NOT BE SO SIMPLE'
  , '["male", "man", "testosterone", "hair", "loss", "bald", "balding"]'
  , true
  )
, (
    'https://news.trycapsifit.com/'
  , 'http://d1nnx3nhddxmeh.cloudfront.net/wp-content/uploads/2018/05/01122237/Overweight-Problems-Heres-How-to-Reset-Your-Melt-Fat-Hormones.jpg'
  , 'GET THAT BIKINI BODY FAST'
  , '["woman", "female", "fat", "skinny", "pepper", "hot", "furnace", "drip"]'
  , true
  )
, (
    'https://news.trycapsifit.com/'
  , 'https://i.pinimg.com/originals/fb/99/31/fb9931fc50a7e72fc9a708e960db3935.jpg'
  , 'WATCH FAT DRIP OFF YOUR BODY LIKE A FAT MELTING FURNACE'
  , '["man", "male", "fat", "skinny", "pepper", "hot", "furnace", "drip"]'
  , true
  )
, (
    'https://news.trycapsifit.com/'
  , 'http://media1.s-nbcnews.com/i/streams/2012/August/120827/504274-g-tdy-091221-belly-2p.jpg'
  , 'WATCH FAT DRIP OFF YOUR BODY LIKE A FAT MELTING FURNACE'
  , '["fat", "skinny", "pepper", "hot", "furnace", "drip"]'
  , true
  )
, (
    'https://www.youtube.com/watch?v=SyvOPXeg4ig'
  , 'https://cdn1.medicalnewstoday.com/content/images/articles/320/320227/cancer-cell.jpg'
  , 'STOP CANCER DEAD IN ITS TRACKS'
  , '["cancer", "stop", "dead", "death", "blood", "cells"]'
  , true
  )
, (
    'https://www.youtube.com/watch?v=SyvOPXeg4ig'
  , 'https://i.ytimg.com/vi/Bey3c8kVm7M/maxresdefault.jpg'
  , 'ARE YOU AN INDIGO CHILD? FIND OUT NOW'
  , '["add", "indigo", "child", "children", "chakra", "special", "energy", "collective"]'
  , true
  )
, (
    'https://weliveinamadworld.com/5g-and-intelligent-connectivity-a-plague-to-consume-humanity/'
  , 'https://weliveinamadworld.com/wp-content/uploads/2019/02/5g.jpg'
  , '5G AND THE COMING PLAGUE TO CONSUME HUMANITY'
  , '["illuminati", "5g", "holocaust", "internet-of-things", "iot", "vr", "virtual", "reality", "individuality"]'
  , true
  )
, (
    'https://renegadevids.com/category/jews/'
  , 'http://www.conspirazzi.com/wp-content/uploads/2010/06/eternal-jew-illuminati.jpg'
  , 'SEMETIC SUBLIMINALS AND THE JEWISH QUESTION'
  , '["semetic", "subliminal", "jew", "jewish", "illuminati"]'
  , true
  )
, (
    'http://universeinsideyou.net/experiments-proving-astral-projection-is-real/'
  , 'https://cdn.shopify.com/s/files/1/0823/4911/products/CD260-3_1024x1024.jpg'
  , 'Are you curious to see where your spirit travels unrestrained from your body?'
  , '["astral", "projection", "subliminal", "chakra", "energy", "sound", "light", "healing", "consciousness", "dream", "sleep"]'
  , true
  )
, (
    'https://www.youtube.com/watch?v=ZOvk1DfLO6c'
  , 'https://i.ytimg.com/vi/ZOvk1DfLO6c/hqdefault.jpg'
  , 'DONT LET YOUR LUCK RUN OUT'
  , '["luck", "clover", "horseshoe", "subliminal", "sexy", "vortex", "fortune"]'
  , true
  )
, (
    'https://www.youtube.com/watch?v=OK40AYHL97I'
  , 'https://www.institutobernabeu.com/foro/en/files/2014/02/021.jpg'
  , 'INCREASE YOUR SPERM COUNT WITHOUT TOUCHING A BUTTON'
  , '["male", "man", "binaural", "beats", "music", "sperm", "seamen", "sex"]'
  , true
  )
, (
    'https://www.crystalinks.com/reality.html'
  , 'https://www.crystalinks.com/binarycodebrain350.jpg'
  , 'REALITY MAY NOT BE WHAT YOU THINK! CLICK HERE TO FIND OUT'
  , '["reality", "digital", "consciousness", "brain", "hologram", "simulation", "illusion", "dream", "numbers", "numeric", "dna", "information"]'
  , true
  )
, (
    'https://www.theblackvault.com/documentarchive/mind-control-collection/'
  , 'https://www.theblackvault.com/documentarchive/wp-content/uploads/2015/02/Mind-Control-731x411.jpg'
  , 'ARE YOU REALLY IN CONTROL OF YOUR OWN THOUGHTS?'
  , '["technology", "mind", "control", "digital", "thoughts"]'
  , true
  )
, (
    'http://steviep.xyz'
  , 'https://www.scienceabc.com/wp-content/uploads/2016/01/shutterstock_338992685.jpg'
  , 'WHATS SO FUNNY?'
  , '["funny", "laugh", "laughing"]'
  , true
  )
, (
    'http://steviep.xyz#your-computer-is-infected'
  , 'https://i.ytimg.com/vi/-HE3jj5Ah2M/maxresdefault.jpg'
  , 'CLICK THE KITTY'
  , '["kitty", "kitten", "cat", "meow", "laugh", "happy", "virus", "infected", "scared"]'
  , true
  )
, (
    'https://www.youtube.com/watch?v=luN8xx2LG8g'
  , 'https://i1.wp.com/www.indianinthemachine.com/wp-content/uploads/2016/07/ashtar-semjase.jpg'
  , 'A MESSAGE FROM OUR COSMIC BROTHERS/SISTERS'
  , '["pleiadians", "ufo", "alien", "aliens", "ufos", "space", "physics"]'
  , true
  )
;
