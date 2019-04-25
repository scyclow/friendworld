import React from 'react'
import { Link } from 'react-router-dom'
import jwt from 'utils/jwt'
import styles from './styles.module.scss'

const switchUser = (username: string) => {
  jwt.setCurrentUser(username)
  window.location.reload()
}

const logout = () => {
  jwt.clearCurrentUser()
  window.location.reload()
}

export const UserDropdown: React.SFC<{}> = () => {
  const alternativeUsers = jwt.getInnactiveUserList()

  return (
    <ul className={styles.userDropdown}>
      <a href="#logout" onClick={logout}>
        <li>Logout</li>
      </a>

      <Link to="/messages">
        <li>
          <div>Messages</div>
        </li>
      </Link>

      <Link to="/profile">
        <li>
          <div>Update Profile</div>
        </li>
      </Link>

      <Link to="/signup">
        <li>
          <div>Create Account</div>
        </li>
      </Link>

      {!!alternativeUsers.length &&
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
