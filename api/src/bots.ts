import { GraphQLClient } from 'graphql-request'
import _ from 'lodash'
import config from './config'
require('dotenv').config()


function request(bot: keyof typeof bots, query: string, vars: { input: {} }) {
  const headers = {
    authorization: `Bearer ${bots[bot].jwt}`,
  }

  const client = new GraphQLClient(config.HOST_URL, { headers })
  return client.request(query, vars)
    .catch(e => {
      console.log(e)
    })
}

const createMessageMutation = `
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) { message { id } }
  }
`

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

const bots = {
  steve: {
    uuid: 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9',
    jwt: process.env.STEVE_JWT
  },
  dumbotheclown: {
    uuid: '43913166-4f0b-4181-b5cf-07da8440cb7c',
    jwt: process.env.DUMBO_JWT
  },
  fuckface99: {
    uuid: 'abf1bc3f-f23f-4ba5-aec4-637053ebee6a',
    jwt: process.env.FUCKFACE_JWT
  },
  vinceslickson: {
    uuid: '0534b28d-5fa8-4c81-99c9-cf76fab5b861',
    jwt: process.env.VINCE_JWT
  },
  heatherhot6: {
    uuid: '0e622956-5ece-42d4-8926-faf880743d72',
    jwt: process.env.HEATHER_JWT
  },
}

const heatherHotMessages = [
  { content: `Hi my real name is Amanda, I'm 21/f and pretty bored searching for some1 2 talk too... how old are you?` },
  { content: `I love chatting with horny people.. Would you like to have a conversation today?`,
    followUp: { wait: 1000,  content: `Where are you from??` } },
  { content: `Im frm new york, Please answer my next  quest?` },
  { content: `Do you like big booty women with big boobs? LMAO but for real cuz thats what i am/have..Is that too much for you to handle?` },
  { content: `Have you ever heard of a whooty? Would you like to watch me i'll show you my Whooty....` },
  { content: `lol Whooty is a White Girl with a big BOOTY!` },
  { content: `i wanna show u mine...` },
  { content: `ok let me set up my camera for you sweetheart..ok?` },
  { content: `um go to this website FNGirl dot com and you'll see me.  all you have to do is click Accept Invite on the bottom left!, if the page doesn't load then use your phone or computer`,
    followUp: { wait: 3000,  content: `You do not have to worry babe its absolutely free to join this website all you have to do is signup` } },
  { content: ` fill out your credit card info for Age verification ONLY, your credit card wont be charged..` },
  { content: `ok i'm ready for you now` }
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
    followUp: { wait: 1000, content: `Oh yeah, by the way, do you have any high-income friends or relatives?` } },
  { content: `Oh, I just wanted to get a sense of what your motivations are. Knowing rich people can be a great motivator for generating wealth for yourself. Additionally, they can open doors for you down the line that wouldn't normally be there for poorer folks. Anyhow, moving on: Are you content making money slowly and steadily over the course of years... or maybe even decades? Or, do you prefer to make your money all at once?` },
  { content: `Great! That's what I like to hear! I have a few opportunities in mind for you, so I just have a couple more questions for you to help use narrow things down; What's your opinion on the government tracking payments as a way to both monitor citizens' behavior?` },
  { content: `Yeah, I totally agree with you there. I think I know what would work for you: Have you heard of crypto currencies? I think they would be a great investment opportunity for you. They really check all the boxes: They're fast, safe, anyone can buy them, AND the pesky government can't keep track of what you're spending them on! They've only gone up in value, and I'm dead certain that they'll continue for the forseeable future.` },
  { content: `I knew you'd ask that!  There are a lot of bogus cryptos out there, so I wouldn't just buy anything. But lucky for you, I happen to be an expert in the space. There's one crypto in particular that I think you'll like. It's called FastCashMoneyPlus, and it's the real hot ticket right now. It's a pretty safe bet, but it won't last forever. So don't sleep on it. Head on over to http://fastcashmoneyplus.biz/?ref=buzzDYNAMIC_PLUSIVZ7MwNjKyMVLy98H  COPY and get in NOW` },
  { content: `Well, if I were you I'd buy as much as I could now. They're going fast, so you don't want to leave money on the table.` },
]

const automatedPosts: Array<AutomatedPostInfo> = [
  // DumboThe Clown
  { content: `Wow, that's a really interesting comment!`, botName: 'dumbotheclown' },
  { content: 'Interesting!', botName: 'dumbotheclown' },
  { content: `Hmm, I've never thought of that before!`, botName: 'dumbotheclown' },
  { content: `Wow!`, botName: 'dumbotheclown' },
  { content: `Wow, what a great post!`, botName: 'dumbotheclown' },
  { content: `What a discussion!`, botName: 'dumbotheclown' },

  // fuckface99
  { content: `LOL`, botName: 'fuckface99' },
  { content: `WOW`, botName: 'fuckface99' },
  { content: `WHAT ARE YOU EVEN TALKING ABOUT??`, botName: 'fuckface99' },
  { content: `THIS GUY IS SUCH A FREAKING IDIOT ^`, botName: 'fuckface99' },
]

type Tags = Array<string>
type Usernames = Array<string>

type AutomatedPostInfo = {
  chance?: number
  botName: keyof typeof bots
  content: string
  usernames?: Array<string>
  tags?: Array<string>
}

const getTriggerededPost = (
  content: string,
  authorUsername: string,
  tags: Tags,
  usernames: Usernames
): AutomatedPostInfo | null => {
  if (usernames.includes('fuckface99')) return {
    content: 'WHAT DID YOU JUST CALL ME?',
    botName: 'fuckface99',
    chance: 0.9
  }

  if (usernames.includes('vinceslickson')) return {
    content: `Haha, nice one. But seriously, if you ever want to make some *real* money, give me a shout.`,
    botName: 'vinceslickson',
    tags: ['money'],
    chance: 1
  }

  if (tags.includes('fastcash')) return {
    chance: 0.4,
    content: `Hey @${authorUsername} If you're looking for a deal on that fastcash, then shoot my a DM. I've got a hookup that you wont't want to pass up.`,
    botName: 'vinceslickson',
    usernames: [authorUsername],
    tags: ['fastcash']
  }

  return null
}

export async function createAutomatedPost (
  input: { threadId: string, content: string, tags: string, usernames: string},
  authorUserId: string,
  executeQuery: (q: string) => Promise<any>,
) {
  const result = await executeQuery(`select username from friendworld.users where id = '${authorUserId}';`)
  if (!result.rows.length) return
  const authorUsername = result.rows[0].username
  const triggeredPost = getTriggerededPost(
    input.content,
    authorUsername,
    JSON.parse(input.tags) as Tags,
    JSON.parse(input.usernames) as Usernames,
  )
  const randomPost = _.sample(automatedPosts)
  const post = triggeredPost || randomPost || null

  if (!post || (Math.random() > (post.chance || 0.1))) return
  try {
    return request(post.botName, createPostMutation, {
      input: {
        threadId: input.threadId,
        content: post.content,
        usernames: JSON.stringify(post.usernames || []),
        tags: JSON.stringify(post.tags || []),
      }
    })

  } catch (e) {
    console.log(e)
  }

}


async function createMessageHandler(
  username: keyof (typeof bots),
  senderId: string,
  messages: Array<{ content: string, followUp?: { content: string, wait: number }}>,
  backupMessages: Array<string>,
  executeQuery: (q: string) => Promise<any>,
) {
  const botId = bots[username]

  try {
    const result = await executeQuery(`
      select username, count(*) as message_count
      from friendworld.messages
      left join friendworld.users on friendworld.users.id = friendworld.messages.from_id
      where friendworld.messages.from_id = '${senderId}' and friendworld.messages.to_id = '${botId.uuid}'
      group by username;
    `)

    if (!result.rows.length) return
    const toUsername = result.rows[0].username
    const messageCount = result.rows[0].message_count - 1

    const msg = messages[messageCount] || (backupMessages ? { content: _.sample(backupMessages) } as any : null)

    if (!msg || !msg.content) return
    await new Promise(res => setTimeout(res, Math.random() * 3000))
    const { content, followUp } = msg

    await request(username, createMessageMutation, {
      input: { toUsername, content }
    })

    if (followUp) {
      await new Promise(res => setTimeout(res, Math.random() * 3000 + followUp.wait))
      const content = followUp.content

      await request(username, createMessageMutation, {
        input: { toUsername, content }
      })
    }

  } catch (e) {
    console.log(e)
  }
}

export async function sendBotMessage (
    toUsername: string,
    fromId: string,
    executeQuery: (q: string) => Promise<any>
  ) {
  setTimeout(() => {
    switch (toUsername.toLowerCase()) {
      case 'heatherhot6':
        return createMessageHandler('heatherhot6', fromId, heatherHotMessages, [], executeQuery)

      case 'dumbotheclown':
        return createMessageHandler('dumbotheclown', fromId, dumboMessages, [], executeQuery)

      case 'fuckface99':
        return createMessageHandler('fuckface99', fromId, fuckfaceMessages, fuckfaceBackupMessages, executeQuery)

      case 'vinceslickson':
        return createMessageHandler('vinceslickson', fromId, vinceSlicksonMessages, [], executeQuery)

      default:
        console.log(toUsername)
        break;
    }
  }, 200)
}

export async function sendAutomatedMessage (authorId: string, executeQuery: (q: string) => Promise<any>) {
  try {
    const result = await executeQuery(`
      select username, count(*) as post_count
      from friendworld.posts
      join friendworld.users on users.id = '${authorId}'
      where friendworld.posts.author_id = '${authorId}'
      group by username;
    `)

    if (!result.rows.length) return
    const postCount = Number(result.rows[0].post_count)
    const toUsername = result.rows[0].username

    if (postCount === 3) {
      return request('dumbotheclown', createMessageMutation, {
        input: { toUsername, content: 'Hi!' }
      })
    }

    if (postCount === 10) {
      return request('heatherhot6', createMessageMutation, {
        input: { toUsername, content: 'hey' }
      })
    }
  } catch (e) {
    console.log(e)
  }
}

export function sendWelcomeMessage(username: string) {
  return request('steve', createMessageMutation, {
    input: {
      toUsername: username,
      content: `Hi, ${username}! Welcome to Friendworld!
      I'm really glad you decided to sign up. Friendworld truely has a one-of-a-kind community with unique, intelligent, and thoughtful members. I'm sure that you'll help contribute to the community, and I'm really looking forward to reading you posts :)
      S
      P.S. If you have any questions or concerns, please let me know. I'm always looking to make your experience better, so I'm always be happy to see a bug report or feature request in my inbox.
      `,
    }
  })
}
