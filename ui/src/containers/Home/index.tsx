import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';
import { Connect, query } from 'urql'
import match, { DataProps } from '../../utils/match'



type Props = {};

interface Post {
  id: string,
  content: string,
  author: {
    username: string
  }
}
interface FeedQuery {
  postsList: Array<Post>
}

const feedQuery = query(`{
  postsList {
    id
    content
    author {
      username
    }
  }
}`)



const Home: React.SFC<Props> = () => (
  <Connect query={feedQuery}>
    {match<FeedQuery>({
      error: ({ error }) => <div>{JSON.stringify(error)}</div>,

      loading: () => <div>loading...</div>,

      data: ({ data }) => (
        data.postsList.map((post: Post) => (
          <div key={post.id}>
            {post.author.username}: {post.content}
          </div>
        ))
      )
    })}
  </Connect>
)
export default Home;



