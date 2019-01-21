import React, { Component } from 'react';

type Props = {
  username: string | void
}

const User: React.SFC<Props> = ({ username }) => <div>welcome to {username}'s profile!</div>

export default User
