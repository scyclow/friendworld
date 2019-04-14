import {
  makeWrapResolversPlugin,
  makeExtendSchemaPlugin,
  gql,
} from 'graphile-utils'
import _ from 'lodash'


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
  steve_p: '0a04ff42-a2c6-4e1f-bda9-80c493abefea',
  dumboTheClown: '0a04ff42-a2c6-4e1f-bda9-80c493abefee',
  fuckface99: '0a04ff42-a2c6-4e1f-bda9-80c493abefab',
  vinceSlickson: '0a04ff42-a2c6-4e1f-bda9-80c493abefeb',
}

const automatedPosts: Array<AutomatedPostInfo> = [
  // DumboThe Clown
  { content: `Wow, that's a really interesting comment!`, userUuid: users.dumboTheClown },
  { content: 'Interesting!', userUuid: users.dumboTheClown },
  { content: `Hmm, I've never thought of that before!`, userUuid: users.dumboTheClown },
  { content: `Wow!`, userUuid: users.dumboTheClown },
  { content: `What a discussion!`, userUuid: users.dumboTheClown },

  // fuckface99
  { content: `LOL`, userUuid: users.fuckface99 },
  { content: `WOW`, userUuid: users.fuckface99 },
  { content: `WHAT ARE YOU EVEN TALKING ABOUT??`, userUuid: users.fuckface99 },
  { content: `THIS GUY IS SUCH A FREAKING IDIOT ^`, userUuid: users.fuckface99 },

]


const getAutomatedPost = (
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
    userUuid: users.vinceSlickson,
    tags: ['money'],
    chance: 0.9
  }

  if (tags.includes('fastcash')) return {
    chance: 0.5,
    content: `Hey @${authorUsername} If you're looking for a deal on that fastcash, let's talk. I've got a hookup that you wont't want to pass up.`,
    userUuid: users.vinceSlickson,
    usernames: [authorUsername],
    tags: ['fastcash']
  }

  return _.sample(automatedPosts) as AutomatedPostInfo
}


const createAutomatedPost = async (args: any, context: any, resolveInfo: any) => {
  const { input: { threadId, content, tags, usernames } } = args;

  const authorUserId = context.jwtClaims.user_id
  const result = await context.pgClient.query(`select username from friendworld.users where id = '${authorUserId}';`)
  const authorUsername = result.rows[0].username

  const post = getAutomatedPost(
    content,
    authorUsername,
    JSON.parse(tags) as Tags,
    JSON.parse(usernames) as Usernames,
  )
  const resolve = resolveInfo.graphile.build.graphql.graphql

  if (!post || (Math.random() < (post.chance || 0.2))) return

  try {
    await context.pgClient.query(`set local jwt.claims.user_id to '${post.userUuid}';`)
    return resolve(resolveInfo.schema, createPostMutation, null, context, {
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

export const createAutomatedPostPlugin = makeWrapResolversPlugin({
  Mutation: {
    async createPost(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      await createAutomatedPost(args, context, resolveInfo)
      return response
    }
  },
})


const createMessageMutation = `
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) { message { id } }
  }
`
export const sendWelcomMessagePlugin = makeWrapResolversPlugin({
  Mutation: {
    async signup(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      const execute = resolveInfo.graphile.build.graphql.graphql
      const { username } = args.input

      try {
        await context.pgClient.query(`set local jwt.claims.user_id to '${users.steve_p}';`)
        await execute(resolveInfo.schema, createMessageMutation, null, context, {
          input: {
            toUsername: username,
            content: `Hi, ${username}! Welcome to Friendworld!
            I'm really glad you decided to sign up. Friendworld truely has a one-of-a-kind community with unique, intelligent, and thoughtful members. Here on Friendworld, we

            I'm sure that you'll help contribute to the community, and I'm really looking forward to reading you posts :)
            Unlike all of the other mainstream social networks, I'll *never* collect or sell any of you personal data. So feel free to let loose and be your honest and true self. For once, you can be whoever you want to be.

            Best,
            Steve
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


