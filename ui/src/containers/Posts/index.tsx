import React, { Component } from 'react';

type Props = {
  id: string | void
}

const Post: React.SFC<Props> = ({ id }) => <div>this is post {id}!</div>

export default Post
