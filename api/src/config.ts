import {
  createAutomatedPostPlugin,
  sendWelcomMessagePlugin,
  createMessageBotPlugin,
  createAccountMetadataPlugin
} from './plugins'

import { Request } from 'express'
import _ from 'lodash'


import knex from 'knex'

require('dotenv').config()
const isDev = process.env.NODE_ENV === 'development'

const config = {
  PORT: process.env.PORT || (isDev ? 5000 : 8080),
  ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'blah',
  SQL_PASSWORD: process.env.SQL_PASSWORD || '',
  HOST_URL: isDev
    ? 'http://localhost:5000/graphql'
    : 'https://friendworld.appspot.com/graphql',
  DB_URL: isDev
    ? 'postgres:///friendworld'
    : {
      password: process.env.SQL_PASSWORD,
      user: 'postgres',
      database: 'postgres',
      host: `/cloudsql/friendworld:us-central1:paget`
    }
  // // for connecting with the proxy:
    // DB_URL: {
    //   password: process.env.SQL_PASSWORD,
    //   user: 'postgres',
    //   database: 'postgres',
    // }

}



export const pgConfig = {
  disableDefaultMutations: true,
  simpleCollections: 'both' as any,
  jwtPgTypeIdentifier: 'friendworld_private.jwt_token',
  defaultRole: 'friendworld_anonymous',

  jwtSecret: config.JWT_SECRET,

  graphiql: isDev,
  enhanceGraphiql: isDev,
  watchPg: isDev,
  disableQueryLog:false,// !isDev,
  additionalGraphQLContextFromRequest: async (req: any) => ({ req }),

  appendPlugins: [
    require('@graphile-contrib/pg-simplify-inflector'),
    createAutomatedPostPlugin,
    sendWelcomMessagePlugin,
    createMessageBotPlugin,
    createAccountMetadataPlugin
  ],
}


export default config
