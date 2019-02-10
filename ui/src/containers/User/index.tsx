import React, { Component } from 'react';
import { Connect, UrqlProps, query } from 'urql'
import match from '../../utils/match'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'



const userQuery = `
query threadById ($username: UsernameDomain!){
  user: userByUsername (username: $username) {
    id
    username
    createdAt
    avatarUrl
    posts: authoredPostsList (first: 10, orderBy: [CREATED_AT_DESC]) {
      id
      content
      threadId
    }
  }
}`

type UserQuery = {
  user: {
    id: string
    username: string
    createdAt: string
    avatarUrl: string
    posts: Array<{
      id: string
      threadId: string
      content: string
    }>
  }
}


type Props = {
  username: string
}


const formatDate = (date: string) => new Date(date).toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
})

const User: React.SFC<Props> = ({ username }) => (
  <Connect query={query(userQuery, { username })}>
    {match<UserQuery>({
      error: () => <div>ERROR CANNOT FIND USER WITH USERNAME: {username}!</div>,

      loading: () => <div>loading...</div>,

      data: ({ data: { user } }) => (
        <div className={styles.profile}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.avatar} style={{ backgroundImage: `url(${user.avatarUrl})` }} />
            </div>
            <div className={styles.right}>
              <h1 className={styles.intro}>Welcome to {user.username}'s Profile!</h1>
              <h4>{user.username} has been a member since {formatDate(user.createdAt)}</h4>
              <Link to={`/messages/new?id=${user.id}`}>Message {user.username}</Link>
              {/*
              <div>
                <h3>Last {user.posts.length} posts:</h3>
                {user.posts.map(post => (
                  <div key={post.id}>
                    <Link to={`/threads/{post.threadId}`}>{post.content}</Link>
                  </div>
                ))}
              </div>
              */}
            </div>

          </div>
          <div>user uuid: {user.id}</div>
        </div>
      )
    })}
  </Connect>
)

export default User
