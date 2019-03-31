import {
  makeWrapResolversPlugin,
  makeExtendSchemaPlugin,
  gql,
} from 'graphile-utils'

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

type Tags = {
  hashtags: Array<string>
  usernames: Array<string>
}

type AutomatedPostInfo = {
  userUuid: string
  content: string
}
const getAutomatedPost = (content: string, tags: Tags): AutomatedPostInfo | null => {
  if (tags.hashtags.includes('cash')) return {
    userUuid: '0a04ff42-a2c6-4e1f-bda9-80c493abefee',
    content: `Wow, that's a really interesting comment!`
  }

  return null
}


const createAutomatedPost = async (args: any, context: any, resolveInfo: any) => {
  const { input: { threadId, content, tags } } = args;
  const post = getAutomatedPost(content, JSON.parse(tags) as Tags)
  const resolve = resolveInfo.graphile.build.graphql.graphql

  if (!post) return

  try {
    await context.pgClient.query(`set local jwt.claims.user_id to '${post.userUuid}';`)
    return resolve(resolveInfo.schema, createPostMutation, null, context, {
      input: {
        threadId: args.input.threadId,
        content: post.content,
        tags: '{ "hashtags": [], "usernames": [] }'
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
        await context.pgClient.query(`set local jwt.claims.user_id to '0a04ff42-a2c6-4e1f-bda9-80c493abefea';`)
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


