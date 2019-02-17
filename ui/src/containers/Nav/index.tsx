import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { ConnectHOC, UrqlProps, query } from 'urql'

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

const currentUserQuery = query(`{
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
}`)

export type Props = RouteChildrenProps & UrqlProps<CurrentUserQuery>

export type State = {
  dropdownState: null | 'users' | 'alerts'
}

class Nav extends React.Component<Props, State> {
  state = {
    dropdownState: null
  }

  unlisten: Function = () => {}

  componentDidMount() {
    const { history } = this.props
    this.unlisten = history.listen(this.changeDropdownState(null))
  }

  componentWillUnmount() {
    this.unlisten()
  }

  changeDropdownState = (dropdownState: State['dropdownState']) => () => {
    this.setState(state => ({
      ...state,
      dropdownState: state.dropdownState ? null : dropdownState
    }))
  }

  renderDropdownContent = (contentType: State['dropdownState']) => {
    const { data } = this.props
    if (!data) return

    switch (contentType) {
      case 'users': return <UserDropdown />
      case 'alerts': return (
        <AlertDropdown
          alerts={data.currentUser.alerts}
          onEmptyClick={this.changeDropdownState(null)}
        />
      )
      default: return <></>
    }
  }

  render() {
    const { dropdownState } = this.state
    const { data } = this.props
    return (
      <>
        <NavBar
          {...this.props}
          currentUser={data && data.currentUser}
          toggleDropdownVisible={this.changeDropdownState}
        />
        {dropdownState &&
          <Dropdown hide={this.changeDropdownState(null)}>
            {this.renderDropdownContent(dropdownState)}
          </Dropdown>
        }
      </>
    )
  }
}

type NavBarProps = {
  currentUser: CurrentUserQuery['currentUser'] | null,
  toggleDropdownVisible: (state: State['dropdownState']) => () => void
}

const NavBar: React.SFC<NavBarProps> = ({ currentUser, toggleDropdownVisible }) => (
  <nav className={cx(styles.container, 'solid')}>
    <Width>
      <div className={styles.content}>
        <Link to="/">
          <div className={styles.title}>FriendWorld</div>
        </Link>

        <div className={styles.links}>
          {/*
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/forum" className={styles.link}>Forum</Link>
          */}
          {currentUser
          ? <>
              {/*<Link to="/messages" className={styles.link}>Messages</Link>*/}
              <div className={styles.link} onClick={toggleDropdownVisible('users')}>
                {currentUser.username}
                <div
                  className={cx(styles.circle, styles.user)}
                  style={{ backgroundImage: `url(${currentUser.avatarUrl})` }}
                />
              </div>
              <div className={styles.link} onClick={toggleDropdownVisible('alerts')}>
                Alerts
                <AlertCircle unread={currentUser.alerts.length} />
              </div>
            </>

          : <>
              <Link to="/login" className={styles.link}>Login</Link>
              <Link to="/signup" className={styles.link}>Create Account</Link>
            </>
          }
        </div>
      </div>
    </Width>
  </nav>
)

export default ConnectHOC({
  query: currentUserQuery
})(Nav)
