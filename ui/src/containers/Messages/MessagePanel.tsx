import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from 'urql'
import { Link, Redirect } from 'react-router-dom'
import orderBy from 'lodash/orderBy'
import DisplayError from 'components/DisplayError'
// import Loading from 'components/Loading'
import ParsedText from 'components/ParsedText'
import styles from './styles.module.scss'


const requestedUserQuery = `query messagesByUsername ($username: UsernameDomain!) {
  currentUser {
    username
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

const createMessageMutation = `mutation createMessage ($input: CreateMessageInput!) {
  createMessage (input: $input) {
    message {
      id
      content
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
  currentUser?: {
    username: string
  }
  requestedUser: {
    sent: Array<Message>
    received: Array<Message>
  }
}

type CreateMessageInput = {
  input: {
    toUsername: string
    content: string
  }
}

type CreateMessagePayload = {
  createMessage: {
    message: Message
  }
}

type Props = {
  username?: string | null
}

// function useInterval(callback: Function, delay: number) {
//   const savedCallback = useRef<any>(null)

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

export default function MessagePanel ({ username }: Props) {
  const $sentMessages = useRef<any>(null)
  const [messageToSend, setMessageToSend] = useState<string>('')
  // const [{ error, data }, executeQuery] = useQuery<RequestedUserQuery>({
  const [{ error, data }] = useQuery<RequestedUserQuery>({
    query: requestedUserQuery,
    variables: { username: username || '' }
  })
  const [
    response, // eslint-disable-line
    executeCreateMessage
  ] = useMutation<CreateMessagePayload, CreateMessageInput>(createMessageMutation)

  // useInterval(() => {
  //   executeQuery({ requestPolicy: 'network-only' })
  // }, 1000)


  useEffect(() => {
    if ($sentMessages.current) {
      $sentMessages.current.scrollTop = $sentMessages.current.scrollHeight
    }
  })


  const sendMessage = (keyPressed?: string) => {
    if (keyPressed === 'Enter' && !!messageToSend) {
      executeCreateMessage({
        input: {
          content: messageToSend,
          toUsername: username || ''
        }
      })
      setMessageToSend('')
    }
  }

  if (error) return <DisplayError error={error} />
  // if (fetching && !stopLoadDisplay) return <Loading />
  if (!data || !data.currentUser) return null


  if (data.currentUser.username === username) return <Redirect to="/messages" />

  const collectedMessages = data.requestedUser ? collectMessages(data.requestedUser) : []
  const sentMessages = collectedMessages.map(message => (
    <div className={styles.message} key={message.id}>
      <div className={styles.sender}>
        <Link to={`/users/${message.from.username}`}>
          <strong>
            {message.from.username}
          </strong>
        </Link>
        <time>[{message.createdAt}]</time>
      </div>
      <div className={styles.content}>
        <ParsedText content={message.content} />
      </div>
    </div>
  ))

  return (
    <section className={styles.messagePanel}>
      {!data.requestedUser && `${username} is not an active FriendWorld user`}
      {data.requestedUser && <>
        <div ref={$sentMessages} className={styles.sentMessages}>
          {data.requestedUser && (collectedMessages.length
            ? sentMessages
            : `Send ${username} a message!`
          )}
        </div>

        <input
          className={styles.sendBox}
          value={messageToSend}
          onChange={e => setMessageToSend(e.target.value)}
          onKeyPress={e => sendMessage(e.key)}
          placeholder="Press ENTER to send message"
        />
      </>}

    </section>
  )
}

const collectMessages = (requestedUser: RequestedUserQuery['requestedUser']) => orderBy([
  ...requestedUser.received,
  ...requestedUser.sent
], 'createdAt')
