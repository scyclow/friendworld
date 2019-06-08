import {
  makeWrapResolversPlugin,
  makeExtendSchemaPlugin,
  gql,
} from 'graphile-utils'
import _ from 'lodash'
import knex from 'knex'
import {
  sendWelcomeMessage,
  sendAutomatedMessage,
  sendBotMessage,
  createAutomatedPost,
} from './bots'

export const createAutomatedPostPlugin = makeWrapResolversPlugin({
  Mutation: {
    async createPost(resolve, source, args, context: any, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      if (context.jwtClaims) {
        sendAutomatedMessage(context.jwtClaims.user_id, (q: string) => context.pgClient.query(q))
      }
      createAutomatedPost(args.input, context.jwtClaims.user_id, (q: string) => context.pgClient.query(q))
      return response
    }
  },
})


export const createMessageBotPlugin = makeWrapResolversPlugin({
  Mutation: {
    async createMessage(resolve, source, args, context: any, resolveInfo: any) {
      try {
        const response = await resolve(source, args, context, resolveInfo)
        if (context.jwtClaims) {
          await sendBotMessage(args.input.toUsername, context.jwtClaims.user_id, (q: string) => context.pgClient.query(q))
        }
        return response
      } catch (e) {
        console.log(e)
      }
    }
  },
})

export const sendWelcomMessagePlugin = makeWrapResolversPlugin({
  Mutation: {
    async signup(resolve, source, args, context: any, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      sendWelcomeMessage(args.input.username)
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
