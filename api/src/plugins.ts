import { makeWrapResolversPlugin } from 'graphile-utils'

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
