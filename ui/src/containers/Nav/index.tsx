import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Connect, UrqlProps, mutation } from 'urql'

import styles from './styles.module.scss'
import jwt from '../../utils/jwt'
import styleVars from '../../styles'
import ParsedText from '../../components/ParsedText'
import X from '../../components/X'

import { CurrentUser } from '../../App'

const switchUser = (username: string) => {
  jwt.setCurrentUser(username)
  window.location.href = "/"
}

const logout = () => {
  jwt.clearCurrentUser()
  window.location.href = '/'
}

const userImgStub = { backgroundImage: "url(https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c3.0.24.24a/p24x24/983791_10204867785199299_8740536904686164238_n.jpg?_nc_cat=104&_nc_ht=scontent-lga3-1.xx&oh=91c238d01e1493eca93ff6f0004caaf9&oe=5CCFD78B)"}

type DropdownProps = {
  hide: Function,
  children: any
}

class Dropdown extends React.Component<DropdownProps> {
  id = '__dropdown_component__'

  hideDropdown = (e: any) => {
    const dropdown = document.getElementById(this.id)
    console.log(dropdown, e.target !== dropdown, dropdown && !dropdown.contains(e.target))
    if (dropdown && e.target !== dropdown && !dropdown.contains(e.target)) {
      this.props.hide()
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDropdown)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown)
  }

  render() {
    const { children } = this.props
    return (
      <div
        id={this.id}
        className={styles.dropdown}
        style={styleVars.bg}
      >
        {children}
      </div>
    )
  }
}

const UserDropdown: React.SFC<{}> = () => (
  <>
    <Link to="/profile">
      <div>
        <div>Go to active user profile</div>
        <div>{jwt.getCurrentUser().username}</div>
      </div>
    </Link>

    <div>
      <div>Switch Account</div>
      {jwt.getInnactiveUserList().map(({ username }) => (
        <div
          key={username}
          onClick={() => switchUser(username)}
        >
          {username}
        </div>
       ))}
    </div>
  </>
)

export type ReadAlertMutation = {
  readAlert: (args: {
    input: {
      alertId: string
    }
  }) => Promise<{
    readAlert: {
      alert: {
        id: string,
        read: boolean
      }
    }
  }>
}

const readAlertMutation = mutation(`
mutation readAlert($input: ReadAlertInput!) {
  readAlert(input: $input) {
    alert {
      id
      read
    }
  }
}`)

type AlertDropdownProps = {
  alerts: CurrentUser['alerts']
}

const Alerts: React.SFC<AlertDropdownProps> = ({ alerts }) => (
  <Connect mutation={{ readAlert: readAlertMutation }}>
    {({ readAlert }: UrqlProps<null, ReadAlertMutation>) => (
      alerts.map(alert =>
        <div key={alert.id}>
          <X ring onClick={() => readAlert({ input: { alertId: alert.id} })} />
          <ParsedText content={alert.content} />
        </div>
      )
    )}
  </Connect>
)

const AlertDropdown: React.SFC<AlertDropdownProps> = ({ alerts }) => (
  <div className={styles.alertDropdown}>
    {alerts.length
      ? <Alerts alerts={alerts} />
      : 'No Alerts!'
    }
  </div>
)

const AlertCircle: React.SFC<{ unread: number, onClick: any }> = ({ unread, onClick }) => (
  // TODO make padding a a function of unread
  <div className={cx(styles.circle, { [styles.unread]: unread })} onClick={onClick}>
    {unread || 0}
  </div>
)


type NavBarProps = Props & {
  toggleDropdownVisible: (state: State['dropdownState']) => () => void
}

const NavBar: React.SFC<NavBarProps> = ({ currentUser, toggleDropdownVisible }) => (
  <nav className={styles.spaceHolder}>
    <div className={styles.container} style={styleVars.bg}>
      <div className={styles.content}>
        <Link to="/">
          <div className={styles.title}>FriendWorld</div>
        </Link>

        <div className={styles.links}>
          <a href="#" onClick={logout}>logout</a>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/forum" className={styles.link}>Forum</Link>
          {currentUser && <Link to="/messages" className={styles.link}>Messages</Link>}
          {currentUser && <div className={styles.circle} onClick={toggleDropdownVisible('users')} style={userImgStub} /> }
          {currentUser && <AlertCircle unread={currentUser.alerts.length} onClick={toggleDropdownVisible('alerts')} />}
        </div>
      </div>
    </div>
  </nav>
)

type Props = {
  currentUser: CurrentUser | null,
  routeChange: Function
}

type State = {
  dropdownState: null | 'users' | 'alerts'
}

class Nav extends React.Component<Props, State> {
  state = {
    dropdownState: null
  }

  unlisten: Function = () => {}

  componentDidMount() {
    this.unlisten = this.props.routeChange(this.changeDropdownState(null))
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
    const { currentUser } = this.props
    if (!currentUser) return

    switch (contentType) {
      case 'users': return <UserDropdown />
      case 'alerts': return <AlertDropdown alerts={currentUser.alerts} />
      default: return <></>
    }
  }

  render() {
    const { dropdownState } = this.state
    return (
      <>
        <NavBar
          {...this.props}
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

export default Nav
