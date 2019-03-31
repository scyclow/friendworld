import { createAutomatedPostPlugin, sendWelcomMessagePlugin } from './plugins'

require('dotenv').config()
const isDev = process.env.NODE_ENV === 'development'

const config = {
  PORT: process.env.PORT || (isDev ? 5000 : 8080),
  ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'blah',
  SQL_PASSWORD: process.env.SQL_PASSWORD || '',
  DB_URL: isDev
    ? 'postgres:///friendworld'
/* for connecting with the proxy:
    ? {
      password: process.env.SQL_PASSWORD,
      user: 'postgres',
      database: 'postgres',
    }
*/
    : {
      password: process.env.SQL_PASSWORD,
      user: 'postgres',
      database: 'postgres',
      host: `/cloudsql/friendworld:us-central1:paget`
    }
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

  appendPlugins: [
    require('@graphile-contrib/pg-simplify-inflector'),
    createAutomatedPostPlugin,
    sendWelcomMessagePlugin,
  ],
}

export default config
