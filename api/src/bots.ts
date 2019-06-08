import { GraphQLClient } from 'graphql-request'
import _ from 'lodash'
import knex from 'knex'
import config from './config'

export const knexConnection = process.env.ENV === 'production'
  ? { user: 'postgres', password: process.env.SQL_PASSWORD, database: 'postgres', host: `/cloudsql/friendworld:us-central1:paget` }
  : { user: 'spikelny', database: 'friendworld' }

const k = knex({
  client: 'pg',
  connection: knexConnection
})

const createMessageMutation = `
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) { message { id } }
  }
`

const bots = {
  steve: {
    uuid: 'd2aad2b5-4aba-484e-91f0-5dfdcf1b2ec9',
    jwt: process.env.STEVE_JWT
  },
  dumbotheclown: {
    uuid: '43913166-4f0b-4181-b5cf-07da8440cb7c',
    jwt: process.env.DUMBO_JWT
  },
  fuckface99: {
    uuid: 'abf1bc3f-f23f-4ba5-aec4-637053ebee6a',
    jwt: process.env.FUCKFACE_JWT
  },
  vinceslickson: {
    uuid: '0534b28d-5fa8-4c81-99c9-cf76fab5b861',
    jwt: process.env.VINCE_JWT
  },
  heatherhot6: {
    uuid: '0e622956-5ece-42d4-8926-faf880743d72',
    jwt: process.env.HEATHER_JWT
  },
}

function request(bot: keyof typeof bots, query: string, vars: {}) {
  const client = new GraphQLClient(config.HOST_URL, {
    headers: {
      authorization: `Bearer ${bots[bot].jwt}`,
    },
  })
  return client.request(query, vars)
}

// async function sendBotMessage (args: any, context: any, resolveInfo: any) {}

// async function sendAutomatedMessage (authorId: string) {
//   try {
//     const result = await k.raw(`
//       select username, count(*) as post_count
//       from friendworld.posts
//       join friendworld.users on users.id = '${authorId}'
//       where friendworld.posts.author_id = '${authorId}'
//       group by username;
//     `)

//     if (!result.rows.length) return
//     const postCount = Number(result.rows[0].post_count)
//     const toUsername = result.rows[0].username
//   } catch (e) {
//     console.log(e)
//   }
// }


export function sendWelcomeMessage(username: string) {
  return request('steve', createMessageMutation, {
    input: {
      toUsername: username,
      content: `Hi, ${username}! Welcome to Friendworld!
      I'm really glad you decided to sign up. Friendworld truely has a one-of-a-kind community with unique, intelligent, and thoughtful members. I'm sure that you'll help contribute to the community, and I'm really looking forward to reading you posts :)
      S
      P.S. If you have any questions or concerns, please let me know. I'm always looking to make your experience better, so I'm always be happy to see a bug report or feature request in my inbox.
      `,
    }
  })
}
