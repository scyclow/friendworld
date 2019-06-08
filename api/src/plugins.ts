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
    async createPost(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      if (context.jwtClaims) {
        sendAutomatedMessage(context.jwtClaims.user_id)
      }
      createAutomatedPost(args.input, context.jwtClaims.user_id)
      return response
    }
  },
})


export const createMessageBotPlugin = makeWrapResolversPlugin({
  Mutation: {
    async createMessage(resolve, source, args, context, resolveInfo: any) {
      const response = await resolve(source, args, context, resolveInfo)
      if (context.jwtClaims) {
        sendBotMessage(args.input.toUsername, context.jwtClaims.user_id)
      }
      return response
    }
  },
})

export const sendWelcomMessagePlugin = makeWrapResolversPlugin({
  Mutation: {
    async signup(resolve, source, args, context, resolveInfo: any) {
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
