import { createAutomatedPostPlugin } from './plugins'

const config = {
  PORT: 5000,
  ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: null
}

export const pgConfig = {
  enhanceGraphiql: true,
  disableDefaultMutations: true,
  watchPg: config.ENV === 'development' ? true : false,
  simpleCollections: 'both' as any,
  jwtSecret: config.JWT_SECRET || 'blah',
  jwtPgTypeIdentifier: 'friendworld_private.jwt_token',
  defaultRole: 'friendworld_anonymous',
  appendPlugins: [
    require('@graphile-contrib/pg-simplify-inflector'),
    createAutomatedPostPlugin
  ],
}

export default config
