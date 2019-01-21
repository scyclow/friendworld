import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './styles.module.scss'
import jwt from '../../utils/jwt'
import styleVars from '../../styles'
import ParsedText from '../../components/ParsedText'

import { LoginQuery } from '../../App'

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
  onClick: any,
  children: any
}

class Dropdown extends React.Component<DropdownProps> {
  id = '__dropdown_component__'

  hideDropdown = (e: any) => {
    const dropdown = document.getElementById(this.id)
    if (dropdown && e.target !== dropdown && !dropdown.contains(e.target)) {
      this.props.onClick()
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDropdown)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown)
  }

  render() {
    const { onClick, children } = this.props
    return (
      <div
        id={this.id}
        className={styles.dropdown}
        style={styleVars.bg}
        onClick={onClick}
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

const AlertCircle: React.SFC<{ unread: number, onClick: any }> = ({ unread, onClick }) => (
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
          <div className={styles.title}>friendworld.social</div>
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
  currentUser: LoginQuery['currentUser']
}

type State = {
  dropdownState: null | 'users' | 'alerts'
}

class Nav extends React.Component<Props, State> {
  state = {
    dropdownState: null
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
      case 'alerts': return <>{currentUser.alerts.map((alert, i) =>
        <div key={i}>
          <ParsedText content={alert.content} />
        </div>
      )}</>
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
          <Dropdown onClick={this.changeDropdownState(null)}>
            {this.renderDropdownContent(dropdownState)}
          </Dropdown>
        }
      </>
    )
  }
}

export default Nav
