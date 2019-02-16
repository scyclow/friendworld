import * as React from 'react';
import { Connect, UrqlProps, query, mutation } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import match from '../../utils/match'
import Post, { PostType } from '../../components/Post'


import { RouteChildrenProps } from 'react-router'

type CurrentUserQuery = {
  currentUser: {
    id: string
    username: string
    avatarUrl?: string
  }
}

const currentUserQuery = query(`{
  currentUser {
    id
    username
    avatarUrl
  }
}`)


const Posts: React.SFC<{ id: number }> = ({ id }) => {
  return (
    <div>
      <div className={styles.left}>
        <Connect query={currentUserQuery}>
          {match<CurrentUserQuery>({
            error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

            loading: () => <div>loading...</div>,

            data: ({ data: { currentUser } }) => (JSON.stringify(currentUser))
          })}
        </Connect>
      </div>
    </div>

  )
}

export default Posts

