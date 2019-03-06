import express from 'express'
import logger from 'morgan';
import cors from 'cors'
import postgraphile from 'postgraphile'
import config, { pgConfig } from './config'

const app = express()
app.use(cors())
app.use(logger(
  '[:date[web]] :method :url :status :response-time ms - :res[content-length]',
  { skip: (req, res) => req.originalUrl === '/favicon.ico' }
))

app.use(postgraphile('postgres:///friendworld', 'friendworld', pgConfig))

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
