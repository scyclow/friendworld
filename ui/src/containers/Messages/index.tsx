import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'

import { useQuery } from 'urql'
import styles from './styles.module.scss'
import useResponsive from 'utils/useResponsive'
import DisplayError from 'components/DisplayError'
import Loading from 'components/Loading'
import SidePanel from './SidePanel'
import MessagePanel from './MessagePanel'
import NewMessagePanel from './NewMessagePanel'


const currentUserQuery = `{
  currentUser {
    username
  }
}`

type CurrentUserQuery = {
  currentUser?: {
    username: string
  }
}

type Props = {
  username?: string | null
}

type State = {
  newMessage: boolean
}

const Messages: React.SFC<Props> = ({ username }) => {
  const { isMobile, isDesktop } = useResponsive(450)
  const [newMessage, setNewMessage] = useState<State['newMessage']>(false)
  const [{ data, error, fetching }] = useQuery<CurrentUserQuery>({ query: currentUserQuery })

  if (error) return <DisplayError error={error} />
  if (fetching) return <Loading />

  if (data && !data.currentUser) {
    return <Redirect to="/signup" />
  } else if (data && data.currentUser && data.currentUser.username === username) {
    return <Redirect to="/messages" />
  }

  return (
    <div className={styles.messages}>
      <header className={styles.header}>
        <h1>Message Console</h1>
        {isMobile && (newMessage || username)
          ? <Link to="/messages" onClick={() => setNewMessage(false)}>{'< All Messages'}</Link>
          : <Link to="/messages" onClick={() => setNewMessage(true)}>New Message</Link>
        }
      </header>

      <section className={styles.messagesSection}>
        {isMobile && (
          <div className={styles.mobileContainer}>
            {username && <MessagePanel username={username} />}
            {!username && newMessage && <NewMessagePanel />}
            {!username && !newMessage && <SidePanel />}
          </div>
        )}

        {isDesktop && (
          <div className={styles.desktopContainer}>
            <SidePanel />

            {username && <MessagePanel username={username} />}
            {!username && <NewMessagePanel />}

          </div>
        )}
      </section>
    </div>
  )
}

export default Messages
