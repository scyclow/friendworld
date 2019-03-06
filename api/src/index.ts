import express from 'express'
import logger from 'morgan';
import cors from 'cors'
import postgraphile from 'postgraphile'
import { makeWrapResolversPlugin, gql } from 'graphile-utils'
import config from './config'

process.env.DEBUG="postgraphile:postgres"
const app = express()


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

const makeAutomatedPost = async (args: any, context: any, resolveInfo: any) => {
  const { input: { threadId, content, tags } } = args;

  const makePost = Math.random() > 0.5
  const botId = '0a04ff42-a2c6-4e1f-bda9-80c493abefea'
  const messageContent = 'this is an ENHANCED automated post!'

  if (!makePost) return

  await context.pgClient.query(`set local jwt.claims.user_id to '${botId}';`)

  return resolveInfo
    .graphile
    .build
    .graphql
    .graphql(resolveInfo.schema, createPostMutation, null, context, {
      input: {
        threadId: args.input.threadId,
        content: messageContent,
        tags: '{"hashtags":[], "usernames":[]}'
      }
    })
}


const doSomething = makeWrapResolversPlugin({
  Mutation: {
    async createPost(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      await makeAutomatedPost(args, context, resolveInfo)
      return response

    }
  },
})












app.use(cors())
app.use(logger(
  '[:date[web]] :method :url :status :response-time ms - :res[content-length]',
  { skip: (req, res) => req.originalUrl === '/favicon.ico' }
))


app.use(postgraphile('postgres:///friendworld', 'friendworld', {
  enhanceGraphiql: true,
  disableDefaultMutations: true,
  watchPg: config.ENV === 'development' ? true : false,
  simpleCollections: 'both',
  jwtSecret: config.JWT_SECRET || 'blah',
  jwtPgTypeIdentifier: 'friendworld_private.jwt_token',
  defaultRole: 'friendworld_anonymous',
  appendPlugins: [require('@graphile-contrib/pg-simplify-inflector'), doSomething],
}))

app.get('/health', (req, res) => {
  res.send('ok')
})

export const onServe = (err: any) => {
  if (err) throw new Error(`Something went wrong with express: ${err.message}`);
  console.log('Server started', new Date());
  console.log(`Running on src port ${config.PORT}`)
  console.log(`Running NODE_ENV: ${config.ENV}`);
}

if (config.ENV === 'production') {
  app.listen(config.PORT, onServe)
}

export default app
