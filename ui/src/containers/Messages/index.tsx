import React, { Component, useState, Fragment } from 'react';
import { Link } from 'react-router-dom'

import { Connect, UrqlProps, query } from 'urql'
import orderBy from 'lodash/orderBy'
import styles from './styles.module.scss'
import match, { DataProps } from '../../utils/match'
import useResponsive from '../../utils/useResponsive'


const messagesQuery = `
query messagesByUsername ($username: UsernameDomain!) {
  usernames: currentUser {
    username
    sent: messagesSentList {
      to {
        username
      }
    }
    received: messagesReceivedList {
      from {
        username
      }
    }
  }

  requestedUser: userByUsername(username: $username) {
    sent: messagesSentList {
      id
      content
      createdAt
      to {
        username
      }
      from {
        username
      }
    }
    received: messagesReceivedList {
      id
      content
      createdAt
      to {
        id
        username
      }
      from {
        id
        username
      }
    }
  }
}`


type Message = {
  id: string
  content: string
  createdAt: string
  to: {
    id: string
    username: string
  }
  from: {
    id: string
    username: string
  }
}

type MessagesQuery = {
  usernames: {
    username: string
    sent: Array<{
      to: {
        username: string
      }
    }>
    received: Array<{
      from: {
        username: string
      }
    }>
  }
  requestedUser: {
    sent: Array<Message>
    received: Array<Message>
  }
}


const uniqueUsers = (usernames: MessagesQuery['usernames']) => {
  const sentNames = usernames.sent.reduce(
    (set, message) => set.add(message.to.username),
    new Set()
  )

  const receivedNames = usernames.received.reduce(
    (set, message) => set.add(message.from.username),
    new Set()
  )

  // @ts-ignore
  const combinedNames = new Set([...sentNames, ...receivedNames])
  combinedNames.delete(usernames.username)

  return Array.from(combinedNames)
}

type Props = {
  username?: string | null
}
// & UrqlProps<MessagesQuery>

type State = {
  section: 'users' | 'messages'
}

const collectMessages = (requestedUser: MessagesQuery['requestedUser']) => orderBy([
  ...requestedUser.received,
  ...requestedUser.sent
], message => message.createdAt)

const Messages: React.SFC<Props> = ({ username }) => {
  const { isMobile, isDesktop } = useResponsive(540)
  const [section, setSection] = useState<State['section']>('users')

  return (
    <div>
      <h1>Messages</h1>
      <section>
        <Connect query={query(messagesQuery, { username: username || '' })} >
          {match<MessagesQuery>({
            error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

            loading: () => <div>loading...</div>,

            data: ({ data }) => (
              <>
                <aside>
                  {uniqueUsers(data.usernames).map(_username => (
                    <Fragment key={_username}>
                      <Link to={`/messages/${_username}`}><div>{_username}</div></Link>
                    </Fragment>
                  ))}
                </aside>
                <div>
                  {data.requestedUser
                    ? collectMessages(data.requestedUser)
                    .map(message => (
                      <div key={message.id}>
                        {message.from.username}: {message.content}
                      </div>
                    ))
                    : 'no message'
                  }
                </div>
              </>
            )
          })}
        </Connect>
      </section>
    </div>
  )




  // const users = getUsers(data.messages)
  // const relevantMessages = filter(data.messages, ['from.username', username])

  // return (
  // )
}



export default Messages
