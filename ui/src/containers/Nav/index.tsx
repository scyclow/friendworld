import React, { Component, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { useQuery, useMutation } from 'urql'
import useResponsive from '../../utils/useResponsive'


import styles from './styles.module.scss'
import { Width } from '../../components/Body'

import { AlertDropdown, AlertCircle } from './Alerts'
import { UserDropdown } from './User'
import Dropdown from './Dropdown'

import { RouteChildrenProps } from 'react-router'

export type CurrentUserQuery = {
  currentUser: {
    id: string,
    username: string,
    avatarUrl?: string
    alerts: Array<{
      id: string
      content: string
      link?: string
    }>
  }
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
  const [response, executeReadAlert] = useMutation<ReadAlertResponse, ReadAlertInput>(readAlertMutation)
  const currentUser = (data && data.currentUser) || null

  const readAlert = (alertId: string) => executeReadAlert({ input: { alertId } })

  const hideDropdown = () => setDropdownState(null)
  useEffect(() => props.history.listen(hideDropdown))

  return (
    <>
      <NavBar
        loading={fetching}
        currentUser={currentUser}
        toggleDropdownVisible={setDropdownState}
      />
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
    </>
  )
}




type NavBarProps = {
  loading: boolean,
  currentUser: CurrentUserQuery['currentUser'] | null,
  toggleDropdownVisible: (state: State['dropdownState']) => void
}

const NavBar: React.SFC<NavBarProps> = ({ toggleDropdownVisible, currentUser, loading }) => {
  return (
    <nav className={cx(styles.container, 'solid')}>
      <Width>
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
      </Width>
    </nav>
  )
}

type SignedInMenuProps = {
  currentUser: CurrentUserQuery['currentUser']
  toggleDropdownVisible: NavBarProps['toggleDropdownVisible']
}

const SignedInMenu = ({ currentUser, toggleDropdownVisible }: SignedInMenuProps) => {
  const { isDesktop, isMobile } = useResponsive(540)

  return (
    <>
      <div className={styles.link} onClick={() => toggleDropdownVisible('users')}>
        {currentUser.username}
        <div
          className={cx(styles.circle, styles.user)}
          style={{ backgroundImage: `url(${currentUser.avatarUrl})` }}
        />
      </div>

      {isDesktop && <Link to="/messages" className={styles.link}>Messages</Link>}

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
    </>
  )
}

const SignedOutMenu = () => (
  <>
    <Link to="/login" className={styles.link}>Login</Link>
    <Link to="/signup" className={styles.link}>Create Account</Link>
  </>
)



export default Nav
