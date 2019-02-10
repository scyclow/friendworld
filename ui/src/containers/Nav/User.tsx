import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import jwt from '../../utils/jwt'

const switchUser = (username: string) => {
  jwt.setCurrentUser(username)
  location.reload()
}

const logout = () => {
  jwt.clearCurrentUser()
  window.location.href = '/'
}

export const UserDropdown: React.SFC<{}> = () => (
  <>
    <a href="#" onClick={logout}>logout</a>

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
