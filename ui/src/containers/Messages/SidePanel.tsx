import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import orderBy from 'lodash/orderBy'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import styles from './styles.module.scss'

const messagesDataQuery = `{
  messageData: currentUser {
    username
    sent: messagesSentList {
      createdAt
      user: to {
        username
      }
    }
    received: messagesReceivedList {
      createdAt
      user: from {
        username
      }
    }
  }
}`

type MessageData = {
  createdAt: string
  user: {
    username: string
  }
}
type MessagesDataQuery = {
  messageData: null | {
    username: string
    sent: Array<MessageData>
    received: Array<MessageData>
  }
}

const collectMessages = (
  messages: Map<string, Date>,
  { createdAt, user: { username } }: MessageData
) => {
  const _createdAt = new Date(createdAt)
  // @ts-ignore
  if (!messages.has(username) || (messages.get(username) < _createdAt)) {
    messages.set(username, _createdAt)
  }
  return messages
}

const uniqueSortedUsers = (messageData: MessagesDataQuery['messageData']) => {
  if (!messageData) return []

  const allMessages = [...messageData.sent, ...messageData.received]
  const messages = allMessages.reduce(collectMessages, new Map())

  const values = Array.from(messages.entries())
  return orderBy(values, [1]).reverse().map(m => m[0])
}

export default function SidePanel() {
  const [{ error, fetching, data }] = useQuery<MessagesDataQuery>({
    query: messagesDataQuery
  })

  if (error) return <DisplayError error={error} />
  if (fetching) return <Loading />
  if (!data || !data.messageData) return null

  const messageNames = uniqueSortedUsers(data.messageData)


  return (
    <aside className={styles.sidePanelContainer}>
      <div className={styles.sidePanel}>
        {messageNames.length ?
          messageNames.map(username => (
            <Fragment key={username}>
              <Link to={`/messages/${username}`}>
                <div className={styles.user}>{username}</div>
              </Link>
            </Fragment>
          ))
          : <div className={styles.emptyUsers}>You have no conversations.</div>
        }
      </div>
    </aside>
  )
}
