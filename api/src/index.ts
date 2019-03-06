import express from 'express'
import logger from 'morgan';
import cors from 'cors'
import postgraphile from 'postgraphile'
import { makeWrapResolversPlugin, gql } from 'graphile-utils'
import config from './config'

const app = express()


const doSomething = makeWrapResolversPlugin({
  Mutation: {
    async createPost(resolve, source, args, context, resolveInfo) {
      return await resolve(source, newArgs, context, resolveInfo)
    }
  },
})




app.use(cors())
app.use(logger('[:date[web]] :method :url :status :response-time ms - :res[content-length] -->>'));
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
