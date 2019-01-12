import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import jwt from '../../utils/jwt'


type Props = {
  loggedIn?: boolean
}

type NavBarProps = Props & {
  dropdownVisible: boolean,
  toggleDropdownVisible: () => void
}

type DropdownProps = {
  onClick: NavBarProps['toggleDropdownVisible']
}

const switchUser = (username: string) => {
  jwt.setCurrentUser(username)
  window.location.href = "/"
}

const Dropdown: React.SFC<DropdownProps> = ({ onClick }) => (
  <div className={styles.dropdown} onClick={onClick}>
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
  </div>
)

const NavBar: React.SFC<NavBarProps> = ({ loggedIn, dropdownVisible, toggleDropdownVisible }) => (
  <nav className={styles.spaceHolder}>
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to="/">
          <div className={styles.title}>friendworld.social</div>
        </Link>
        <div className={styles.links}>
          <a href="#" onClick={() => {jwt.clearCurrentUser(); window.location.href = '/'}}>logout</a>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/forum" className={styles.link}>Forum</Link>
          {loggedIn && <>
            <Link to="/messages" className={styles.link}>Messages</Link>
            <div
              className={styles.circle}
              onClick={toggleDropdownVisible}
              style={{
                backgroundImage: "url(https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c3.0.24.24a/p24x24/983791_10204867785199299_8740536904686164238_n.jpg?_nc_cat=104&_nc_ht=scontent-lga3-1.xx&oh=91c238d01e1493eca93ff6f0004caaf9&oe=5CCFD78B)"
              }}
            />
            <div className={styles.circle} />
          </>}
        </div>
        {dropdownVisible && <Dropdown onClick={toggleDropdownVisible}/>}
      </div>
    </div>
  </nav>
)

type State = {
  dropdownVisible: boolean
}

class Nav extends React.Component<Props, State> {
  state = {
    dropdownVisible: false
  }

  toggleDropdownVisible = () => this.setState(state => ({ ...state, dropdownVisible: !state.dropdownVisible}))

  render() {
    return (
      <NavBar
        {...this.props}
        dropdownVisible={this.state.dropdownVisible}
        toggleDropdownVisible={this.toggleDropdownVisible}
      />
    )
  }
}

export default Nav
