import express from 'express'
import logger from 'morgan';
import cors from 'cors'
import postgraphile from 'postgraphile'
import config, { pgConfig } from './config'

// import knex from 'knex'

// const knexConfig = config.ENV === 'production'
//   ? {
//     password: process.env.SQL_PASSWORD,
//     user: 'postgres',
//     database: 'postgres',
//     host: `/cloudsql/friendworld:us-central1:paget`
//   }
//   : {
//     user: 'spikelny',
//     database: 'friendworld'
//   }

// const k = knex({
//   client: 'pg',
//   connection: knexConfig
// })

const app = express()
app.use(cors())
app.use(logger(
  '[:date[web]] :method :url :status :response-time ms - :res[content-length]',
  { skip: (req, res) => req.originalUrl === '/favicon.ico' }
))

app.use(postgraphile(config.DB_URL, 'friendworld', pgConfig))

app.get('/health', (req, res) => {
  res.send('ok')
})

// app.get('/test', async (req, res) => {
//   try {
//     const result = await k.select('username').from('friendworld.users')
//     console.log(result)
//     res.send({ result }).status(200)
//   } catch (e) {
//     res.send('ERROR:' + JSON.stringify(e))
//   }
// })

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
