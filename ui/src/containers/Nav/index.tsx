import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { useQuery, useMutation } from 'urql'
import useResponsive from 'utils/useResponsive'
import useInterval from 'utils/useInterval'


import styles from './styles.module.scss'
import { Width } from 'components/Body'

import { AlertDropdown, AlertCircle } from './Alerts'
import { UserDropdown } from './User'
import Dropdown from './Dropdown'

import { RouteChildrenProps } from 'react-router'

export type CurrentUser = {
    id: string,
    username: string,
    avatarUrl?: string
    alerts: Array<{
      id: string
      content: string
      link?: string
    }>
  }
export type CurrentUserQuery = {
  currentUser?: CurrentUser
}

const currentUserQuery = `{
  currentUser {
    id
    username
    avatarUrl
    alerts: alertsList (condition: { read: false }) {
      id
      content
      link
    }
  }
}`

type ReadAlertInput = {
  input: {
    alertId: string
  }
}

type ReadAlertResponse = {
  readAlert: {
    alert: {
      id: string,
      read: boolean
    }
  }
}

const readAlertMutation = `
mutation readAlert($input: ReadAlertInput!) {
  readAlert(input: $input) {
    alert {
      id
      read
    }
  }
}`

export type Props = RouteChildrenProps

export type State = {
  dropdownState: null | 'users' | 'alerts'
}

function Nav(props: Props) {
  const [dropdownState, setDropdownState] = useState<State['dropdownState']>(null)
  const [{ data, fetching }, executeQuery] = useQuery<CurrentUserQuery>({ query: currentUserQuery })
  const [response, executeReadAlert] = useMutation<ReadAlertResponse, ReadAlertInput>(readAlertMutation) // eslint-disable-line
  const currentUser = (data && data.currentUser) || null

  const readAlert = (alertId: string) => executeReadAlert({ input: { alertId } })

  const hideDropdown = () => setDropdownState(null)
  useEffect(() => props.history.listen(hideDropdown))
  useInterval(() => {
    if (!document.hidden) {
      executeQuery({ requestPolicy: 'network-only' })
    }
  }, 10000)

  return (
    <nav className={cx(styles.container, 'solid')}>
      <Width>
        <NavBar
          loading={fetching}
          currentUser={currentUser}
          toggleDropdownVisible={setDropdownState}
        />
        <div className={styles.dropdownPosition}>
          {dropdownState &&
            <Dropdown hide={hideDropdown}>
              {dropdownState === 'users' && <UserDropdown />}
              {dropdownState === 'alerts' && currentUser && <AlertDropdown
                alerts={currentUser.alerts}
                onEmptyClick={hideDropdown}
                readAlert={readAlert}
              />}
            </Dropdown>
          }
        </div>
      </Width>
    </nav>
  )
}



type NavBarProps = {
  loading: boolean,
  currentUser: CurrentUserQuery['currentUser'] | null,
  toggleDropdownVisible: (state: State['dropdownState']) => void,
}

const NavBar: React.SFC<NavBarProps> = ({ toggleDropdownVisible, currentUser, loading }) => {
  return (
    <div className={styles.content}>
      <Link to="/">
        <div className={styles.title}>FriendWorld</div>
      </Link>

      <div className={styles.links}>
        {currentUser
          ? <SignedInMenu currentUser={currentUser} toggleDropdownVisible={toggleDropdownVisible} />
          : loading ? false : <SignedOutMenu />
        }
      </div>
    </div>
  )
}

type SignedInMenuProps = {
  currentUser: CurrentUser
  toggleDropdownVisible: NavBarProps['toggleDropdownVisible']
}

const SignedInMenu = ({ currentUser, toggleDropdownVisible }: SignedInMenuProps) => {
  const { isDesktop, isMobile } = useResponsive(540)

  return (
    <>
      <div
        className={styles.link}
        onClick={() => toggleDropdownVisible('users')}
        style={{ maxWidth: '180px', overflow: 'auto' }}
      >
        {currentUser.username}
        <div
          className={cx(styles.circle, styles.user)}
          style={{ backgroundImage: `url(${currentUser.avatarUrl})` }}
        />
      </div>

      {isDesktop && (
        <div className={styles.link} onClick={() => toggleDropdownVisible('alerts')}>
          Alerts
          <AlertCircle unread={currentUser.alerts.length} />
        </div>
      )}

      {isMobile && (
        <div className={styles.link} onClick={() => toggleDropdownVisible('alerts')}>
          <AlertCircle unread={currentUser.alerts.length} />
        </div>
      )}
      {/*
      <Link to="/signup" className={styles.link}>Signup</Link>
      <Link to="/login" className={styles.link}>Login</Link>
    */}
    </>
  )
}

const SignedOutMenu = () => (
  <>
    <Link to="/login" className={styles.link}>Login</Link>
    <Link to="/signup" className={styles.link}>Signup</Link>
  </>
)

export default Nav
