import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

type Props = {
  loggedIn?: boolean
}

const Nav: React.SFC<Props> = ({ loggedIn }) => (
  <nav className={styles.spaceHolder}>
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to="/">
          <div className={styles.title}>friendworld.social</div>
        </Link>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/forum" className={styles.link}>Forum</Link>
          {loggedIn && <>
            <Link to="/chat" className={styles.link}>Chat</Link>
            <Link to="/profile" className={styles.link}>Profile</Link>
            <div className={styles.alerts} />
          </>}
        </div>
      </div>
    </div>
  </nav>
)

export default Nav
