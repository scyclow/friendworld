'use strict'

if (process.env.NODE_ENV === 'production') {
  const { Storage } = require('@google-cloud/storage')
  const bucketName = `envvars-friendworld`
  const project = new Storage({ projectId: 'friendworld' })
  console.log(`Downloading .env from bucket "${bucketName}"`)

  project
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => {
      console.info('getEnv.js: .env downloaded successfully')
    })
    .catch(e => {
      console.error(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`)
    })
}
