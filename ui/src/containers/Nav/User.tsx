import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import jwt from '../../utils/jwt'
import styles from './styles.module.scss'

const switchUser = (username: string) => {
  jwt.setCurrentUser(username)
  location.reload()
}

const logout = () => {
  jwt.clearCurrentUser()
  location.reload()
}

export const UserDropdown: React.SFC<{}> = () => {
  const alternativeUsers = jwt.getInnactiveUserList()

  return (
    <ul className={styles.userDropdown}>
      <a href="#" onClick={logout}>
        <li>Logout</li>
      </a>

      <Link to="/messages">
        <li>
          <div>Messages</div>
        </li>
      </Link>

      <Link to="/dashboard">
        <li>
          <div>User Dashboard</div>
        </li>
      </Link>

      {alternativeUsers.length &&
        <div className={styles.switchAccounts}>
          <strong>Switch Account</strong>
          <ul>
            {alternativeUsers.map(({ username }) => (
              <li
                key={username}
                onClick={() => switchUser(username)}
              >
                {username}
              </li>
             ))}
          </ul>
        </div>
      }
    </ul>
  )
}
