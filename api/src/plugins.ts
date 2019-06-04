import {
  makeWrapResolversPlugin,
  makeExtendSchemaPlugin,
  gql,
} from 'graphile-utils'
import _ from 'lodash'
import knex from 'knex'

export const knexConnection = process.env.ENV === 'production'
  ? { user: 'postgres', password: process.env.SQL_PASSWORD, database: 'postgres', host: `/cloudsql/friendworld:us-central1:paget` }
  : { user: 'spikelny', database: 'friendworld' }

const k = knex({
  client: 'pg',
  connection: knexConnection
})

const createPostMutation = `
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        content
        createdAt
        author {
          id
          avatarUrl
          username
        }
      }
    }
  }
`

type Tags = Array<string>
type Usernames = Array<string>

type AutomatedPostInfo = {
  chance?: number
  userUuid: string
  content: string
  usernames?: Array<string>
  tags?: Array<string>
}

const users = {
  steve: 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9',
  dumbotheclown: '43913166-4f0b-4181-b5cf-07da8440cb7c',
  fuckface99: 'abf1bc3f-f23f-4ba5-aec4-637053ebee6a',
  vinceslickson: '0534b28d-5fa8-4c81-99c9-cf76fab5b861',
  heatherhot6: '0e622956-5ece-42d4-8926-faf880743d72',
}

const automatedPosts: Array<AutomatedPostInfo> = [
  // DumboThe Clown
  { content: `Wow, that's a really interesting comment!`, userUuid: users.dumbotheclown },
  { content: 'Interesting!', userUuid: users.dumbotheclown },
  { content: `Hmm, I've never thought of that before!`, userUuid: users.dumbotheclown },
  { content: `Wow!`, userUuid: users.dumbotheclown },
  { content: `Wow, what a great post!`, userUuid: users.dumbotheclown },
  { content: `What a discussion!`, userUuid: users.dumbotheclown },

  // fuckface99
  { content: `LOL`, userUuid: users.fuckface99 },
  { content: `WOW`, userUuid: users.fuckface99 },
  { content: `WHAT ARE YOU EVEN TALKING ABOUT??`, userUuid: users.fuckface99 },
  { content: `THIS GUY IS SUCH A FREAKING IDIOT ^`, userUuid: users.fuckface99 },

]

const setUserUuid = async (context: any, uuid: string) => {
  context.jwtClaims.user_id = uuid
  return context.pgClient.query(`set local jwt.claims.user_id to '${uuid}';`)
}

const createResolve = (resolveInfo: any, context: any) => (mutation: string, input: Object) =>
  resolveInfo.graphile.build.graphql.graphql(resolveInfo.schema, mutation, null, context, input)



const getTriggerededPost = (
  content: string,
  authorUsername: string,
  tags: Tags,
  usernames: Usernames
): AutomatedPostInfo | null => {

  // TODO - 'WHAT DID YOU CALL ME?'
  if (usernames.includes('fuckface99')) return {
    content: 'WHAT DID YOU JUST CALL ME?',
    userUuid: users.fuckface99,
    chance: 0.9
  }

  if (usernames.includes('vinceslickson')) return {
    content: `Haha, nice one. But seriously, if you ever want to make some *real* money, give me a shout.`,
    userUuid: users.vinceslickson,
    tags: ['money'],
    chance: 0.9
  }

  if (tags.includes('fastcash')) return {
    chance: 0.4,
    content: `Hey @${authorUsername} If you're looking for a deal on that fastcash, then shoot my a DM. I've got a hookup that you wont't want to pass up.`,
    userUuid: users.vinceslickson,
    usernames: [authorUsername],
    tags: ['fastcash']
  }

  return null
}


const createAutomatedPost = async (args: any, context: any, resolveInfo: any) => {
  const { input: { threadId, content, tags, usernames } } = args;

  const authorUserId = context.jwtClaims.user_id
  const result = await context.pgClient.query(`select username from friendworld.users where id = '${authorUserId}';`)
  const authorUsername = result.rows[0].username

  const triggeredPost = getTriggerededPost(
    content,
    authorUsername,
    JSON.parse(tags) as Tags,
    JSON.parse(usernames) as Usernames,
  )

  const randomPost = _.sample(automatedPosts)

  const post = triggeredPost || randomPost || null

  if (!post || (Math.random() > (post.chance || 0.1))) return


  const resolve = createResolve(resolveInfo, context)


  try {
    await setUserUuid(context, post.userUuid)

    return resolve(createPostMutation, {
      input: {
        threadId: args.input.threadId,
        content: post.content,
        usernames: JSON.stringify(post.usernames || []),
        tags: JSON.stringify(post.tags || []),
      }
    })
  } catch (e) {
    console.log(e)
  }
}





const createMessageMutation = `
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) { message { id } }
  }
`



const sendAutomatedMessage = async (args: any, context: any, resolveInfo: any) => {
  const authorUserId = context.jwtClaims.user_id
  try {

    const result = await context.pgClient.query(`
      select username, count(*) as post_count
      from friendworld.posts
      join friendworld.users on users.id = '${authorUserId}'
      where friendworld.posts.author_id = '${authorUserId}'
      group by username;
    `)
    const postCount = Number(result.rows[0].post_count)
    const toUsername = result.rows[0].username


    const execute = createResolve(resolveInfo, context)
    if (postCount === 3) {
      await setUserUuid(context, users.dumbotheclown)
      return execute(createMessageMutation, {
        input: { toUsername, content: `Hi!` }
      })
    }

    if (postCount === 10) {
      await setUserUuid(context, users.heatherhot6)
      return execute(createMessageMutation, {
        input: { toUsername, content: `hey` }
      })
    }


  } catch (e) {
    console.log(e)
  }
}

const heatherHotMessages = [
  {
    content: `Hi my real name is Amanda, I'm 21/f and pretty bored searching for some1 2 talk too... how old are you?`
  }, {
    content: `I love chatting with horny people.. Would you like to have a conversation today?`,
    followUp: {
      wait: 1000,
      content: `Where are you from??`
    }
  }, {
    content: `Im frm new york, Please answer my next  quest?`
  }, {
    content: `Do you like big booty women with big boobs? LMAO but for real cuz thats what i am/have..Is that too much for you to handle?`
  }, {
    content: `Have you ever heard of a whooty? Would you like to watch me i'll show you my Whooty....`
  }, {
    content: `lol Whooty is a White Girl with a big BOOTY!`
  }, {
    content: `i wanna show u mine...`
  }, {
    content: `ok let me set up my camera for you sweetheart..ok?`
  }, {
    content: `um go to this website FNGirl dot com and you'll see me.  all you have to do is click Accept Invite on the bottom left!, if the page doesn't load then use your phone or computer`,
    followUp: {
      wait: 3000,
      content: `You do not have to worry babe its absolutely free to join this website all you have to do is signup`
    }
  }, {
    content: ` fill out your credit card info for Age verification ONLY, your credit card wont be charged..`
  }, {
    content: `ok i'm ready for you now`
  }
]


const dumboMessages = [
  { content: `Hello, would you like to be my friend? :)` },
  { content: `Great! I love making new friends! What is your name?` },
  { content: `My name is Fred! Have you seen any good movies lately?` },
  { content: `Oh, I heard that one was super great! I really want to see it! What a fun conversation! What do you want to talk about next?` },
  { content: `LOL. Now *there* is a good idea. I've wanted to talk about that for ages. Why don't you start?` },
  { content: `Interesting! I never thought of it like that before. All of my other friends said the exact opposite... But I guess that's what makes https://friendworld.social such a special place! Where else would I be introduced to a unique perspective like that?` },
  { content: `I'm really glad I made a new friend today. Thank you for the conversation! I have to go now. Good bye.` },
  { content: `So long!` },
  { content: `Bye bye!` },
  { content: `Adiós!` },
  { content: `Sayonara!` },
  { content: `Arrivederci!` },
]

const fuckfaceMessages = [
  { content: `HI THERE, WHAT'S YOUR NAME?` },
  { content: `WHO GIVES A SHIT? HAHAHA. YOU KNOW WHAT? YOU'RE A COMPLETE AND TOTAL LOSER, AND YOU'LL NEVER AMOUNT TO ANYTHING. WHAT ARE YOU EVEN DOING WASTING YOUR LIFE ON THIS STUPID WEBSITE? DON'T YOU HAVE ANYTHING BETTER TO DO?` },
  { content: `LOOK, I'M SORRY. I WAS JUST KIDDING. WE ALL GET STRESSED OUT SOMETIMES, RIGHT? TO BE TOTALLY HONEST, I'VE BEEN FEELING PRETTY DOWN THE LAST COUPLE OF MONTHS. BEING AGGRESSIVE ON SOCIAL MEDIA HAS BEEN A GOOD OUTLET FOR MY ANXIETY, BUT I KNOW THAT IT ISN'T SUSTAINABLE. ALL I'M DOING IS BRINGING OTHER PEOPLE DOWN WITH ME :(` },
  { content: `YEAH, THANKS. I APPRECIATE IT. BUT I'M GLAD YOU ASKED. I'VE ACTUALLY BEEN THINKING ABOUT GOING TO THERAPY, OR ENGAGING IN SOME SORT OF SELF-HELP PROGRAM. IF YOU HEAR OF ANY GOOD ONES, THEN LET ME KNOW. ` },
  { content: `ANYHOW, I HAVE TO GO, BUT THANKS FOR REACHING OUT. IT REALLY MEANT A LOT TO ME.` },
  { content: `SERIOUSLY, I HAVE THINGS TO DO, SO GO AWAY.` },
  { content: `YOU KNOW WHAT? I THINK YOU COULD BENEFIT FROM SOME THERAPY AND SELF HELP YOURSELF! YOU NEED TO LEARN TO GET YOUR KICKS FROM WAYS OTHER THAN TROLLING STRANGERS ON THE INTERNET` },
]
const fuckfaceBackupMessages = ['FUCK OFF', 'I DON\'T CARE', 'GO AWAY', 'SHUT UP']


const vinceSlicksonMessages = [
  { content: `Hey pal, are you ready to make some money?` },
  { content: `Haha, I bet you are! You sound like a real go-getter ;)` },
  { content: `Okay, okay. I can tell you're anxious to get started! You remind me of myself when I was your age: young, hungry, ready to fuck anything that moved, and most importantly: always on the look out to make a quick buck. But before we get started, I'm going to need to ask you a few questions. I'm very selective in who I choose to work with, so I need to make sure I'm not wasting my time with you. Gabich?` },
  { content: `Ha, don't worry buddy, I'll make it quick. First question: In the last six months, are you dissatisfied with your current level of income?` },
  { content: `Hmm, I see. And what is your income now, if you don't mind me asking?` },
  { content: `Okay, okay. Not terrible, but I think we can do a little better than that!`,
    followUp: {
      wait: 1000,
      content: `Oh yeah, by the way, do you have any high-income friends or relatives?`
    }
  },
  { content: `Oh, I just wanted to get a sense of what your motivations are. Knowing rich people can be a great motivator for generating wealth for yourself. Additionally, they can open doors for you down the line that wouldn't normally be there for poorer folks. Anyhow, moving on: Are you content making money slowly and steadily over the course of years... or maybe even decades? Or, do you prefer to make your money all at once?` },
  { content: `Great! That's what I like to hear! I have a few opportunities in mind for you, so I just have a couple more questions for you to help use narrow things down; What's your opinion on the government tracking payments as a way to both monitor citizens' behavior?` },
  { content: `Yeah, I totally agree with you there. I think I know what would work for you: Have you heard of crypto currencies? I think they would be a great investment opportunity for you. They really check all the boxes: They're fast, safe, anyone can buy them, AND the pesky government can't keep track of what you're spending them on! They've only gone up in value, and I'm dead certain that they'll continue for the forseeable future.` },
  { content: `I knew you'd ask that!  There are a lot of bogus cryptos out there, so I wouldn't just buy anything. But lucky for you, I happen to be an expert in the space. There's one crypto in particular that I think you'll like. It's called FastCashMoneyPlus, and it's the real hot ticket right now. It's a pretty safe bet, but it won't last forever. So don't sleep on it. Head on over to http://fastcashmoneyplus.biz/?ref=buzzDYNAMIC_PLUSIVZ7MwNjKyMVLy98H  COPY and get in NOW` },
  { content: `Well, if I were you I'd buy as much as I could now. They're going fast, so you don't want to leave money on the table.` },
]


async function createMessageHandler(
  username: keyof (typeof users),
  senderId: string,
  messages: Array<{ content: string, followUp?: { content: string, wait: number }}>,
  backupMessages?: Array<string>
) {
  const botId = users[username]

  try {
    const result = await k.raw(`
      select username, count(*) as message_count
      from friendworld.messages
      left join friendworld.users on friendworld.users.id = friendworld.messages.from_id
      where friendworld.messages.from_id = '${senderId}'and friendworld.messages.to_id = '${botId}'
      group by username;
    `)

    if (!result.rows.length) return
    const toUsername = result.rows[0].username
    const messageCount = result.rows[0].message_count - 1

    const msg = messages[messageCount] || (backupMessages ? { content: _.sample(backupMessages) } as any : null)

    if (!msg || !msg.content) return
    await new Promise(res => setTimeout(res, Math.random() * 3000))
    const { content, followUp } = msg
    const cleaned = content.replace(/'/g, "''").replace(/\?/g, '\\?')

    await k.raw(`
      commit;
      begin;
        set local jwt.claims.user_id to '${botId}';
        select friendworld.create_message('${toUsername}', '${cleaned}');
      commit;
    `)
    if (followUp) {
      await new Promise(res => setTimeout(res, Math.random() * 3000 + followUp.wait))
      const cleanedFollowup = followUp.content.replace(/'/g, "''").replace(/\?/g, '\\?')

      await k.raw(`
        begin;
          set local jwt.claims.user_id to '${botId}';
          select friendworld.create_message('${toUsername}', '${cleanedFollowup}');
        commit;
      `)
    }

  } catch (e) {
    console.log(e)
  }
}
const sendBotMessage = async (args: any, context: any, resolveInfo: any) => {
  const { toUsername } = args.input

  if (toUsername.toLowerCase() === 'heatherhot6') {
    createMessageHandler('heatherhot6', context.jwtClaims.user_id, heatherHotMessages)
  }
  if (toUsername.toLowerCase() === 'dumbotheclown') {
    createMessageHandler('dumbotheclown', context.jwtClaims.user_id, dumboMessages)
  }
  if (toUsername.toLowerCase() === 'fuckface99') {
    createMessageHandler('fuckface99', context.jwtClaims.user_id, fuckfaceMessages, fuckfaceBackupMessages)
  }
  if (toUsername.toLowerCase() === 'vinceslickson') {
    createMessageHandler('vinceslickson', context.jwtClaims.user_id, vinceSlicksonMessages)
  }
}


export const createAutomatedPostPlugin = makeWrapResolversPlugin({
  Mutation: {
    async createPost(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      await sendAutomatedMessage(args, context, resolveInfo)
      await createAutomatedPost(args, context, resolveInfo)
      return response
    }
  },
})


export const sendWelcomMessagePlugin = makeWrapResolversPlugin({
  Mutation: {
    async signup(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      const execute = createResolve(resolveInfo, context)

      const { username } = args.input

      try {
        await setUserUuid(context, users.steve)

        await execute(createMessageMutation, {
          input: {
            toUsername: username,
            content: `Hi, ${username}! Welcome to Friendworld!
            I'm really glad you decided to sign up. Friendworld truely has a one-of-a-kind community with unique, intelligent, and thoughtful members. I'm sure that you'll help contribute to the community, and I'm really looking forward to reading you posts :)
            S
            P.S. If you have any questions or concerns, please let me know. I'm always looking to make your experience better, so I'm always be happy to see a bug report or feature request in my inbox.
            `,
          }
        })
        return response
      } catch (e) {
        console.log(e)
      }
      return response
    }
  },
})

export const createMessageBotPlugin = makeWrapResolversPlugin({
  Mutation: {
    async createMessage(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      setTimeout(() => sendBotMessage(args, context, resolveInfo), 200)
      return response
    }
  },
})


export const createAccountMetadataPlugin = makeWrapResolversPlugin({
  Mutation: {
    async signup(resolve, source, args, context, resolveInfo: any) {
      args.input.ip = context.req.ip
      args.input.trackingToken = context.req.headers.trackingtoken
      return resolve(source, args, context, resolveInfo)
    }
  },
})
