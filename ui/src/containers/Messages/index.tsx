import React, { Component, useState, Fragment } from 'react';
import { Link } from 'react-router-dom'

import { useQuery } from 'urql'
import orderBy from 'lodash/orderBy'
import styles from './styles.module.scss'
import useResponsive from '../../utils/useResponsive'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'


const messagesDataQuery = `{
  messageData: currentUser {
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
}`

type MessagesDataQuery = {
  messageData: {
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
}

const requestedUserQuery = `
query messagesByUsername ($username: UsernameDomain!) {
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

type RequestedUserQuery = {
  requestedUser: {
    sent: Array<Message>
    received: Array<Message>
  }
}


type Props = {
  username?: string | null
}
// & UrqlProps<MessagesQuery>

type State = {
  section: 'users' | 'messages'
}

const collectMessages = (requestedUser: RequestedUserQuery['requestedUser']) => orderBy([
  ...requestedUser.received,
  ...requestedUser.sent
], message => message.createdAt)

const Messages: React.SFC<Props> = ({ username }) => {
  const { isMobile, isDesktop } = useResponsive(540)
  const [section, setSection] = useState<State['section']>('users')

  const messagePanel = username
    ? <MessagePanel username={username} />
    : <EmptyPanel />

  return (
    <div>
      <h1>Messages</h1>
      <section>
        {isMobile && (
          <div className={styles.mobileContainer}>
            {section === 'users' && <SidePanel />}
            {section === 'messages' && messagePanel}
          </div>
        )}

        {isDesktop && (
          <div className={styles.desktopContainer}>
            <div className={styles.sidePanelContainer}>
              <SidePanel />
            </div>
            <div className={styles.messagePanelContainer}>
              {messagePanel}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

const uniqueUsers = (messageData: MessagesDataQuery['messageData']) => {
  const sentNames = messageData.sent.reduce(
    (set, message) => set.add(message.to.username),
    new Set()
  )

  const receivedNames = messageData.received.reduce(
    (set, message) => set.add(message.from.username),
    new Set()
  )

  // @ts-ignore
  const combinedNames = new Set([...sentNames, ...receivedNames])
  combinedNames.delete(messageData.username)

  return Array.from(combinedNames)
}

const SidePanel: React.SFC<{}> = () => {
  const [{ error, fetching, data }] = useQuery<MessagesDataQuery>({
    query: messagesDataQuery
  })

  if (error) return <DisplayError error={error} />
  if (fetching) return <Loading />
  if (!data) return null

  return (
    <aside className={styles.sidePanel}>
      {uniqueUsers(data.messageData).map(username => (
        <Fragment key={username}>
          <Link to={`/messages/${username}`}>
            <div className={styles.user}>{username}</div>
          </Link>
        </Fragment>
      ))}
    </aside>
  )
}

const MessagePanel: React.SFC<{ username: string }> = ({ username }) => {
  const [{ error, fetching, data }] = useQuery<RequestedUserQuery>({
    query: requestedUserQuery,
    variables: { username }
  })

  if (error) return <DisplayError error={error} />
  if (fetching) return <Loading />
  if (!data) return null

  return (
    <div className={styles.messagePanel}>
      {data.requestedUser
        ? collectMessages(data.requestedUser).map(message => (
          <div key={message.id}>
            {message.from.username}: {message.content}
          </div>
        ))
        : 'no message'
      }
    </div>
  )
}

const EmptyPanel: React.SFC<{}> = () => {
  return <>'no messages here'</>
}

export default Messages
