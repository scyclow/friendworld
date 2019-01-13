import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';
import { Connect, ConnectHOC, UrqlProps, query, mutation } from 'urql'
import match, { DataProps } from '../../utils/match'
import TextInput from '../../components/TextInput'



interface Post {
  id: string,
  content: string,
  createdAt: string,
  author: {
    username: string
  }
}

interface FeedQuery {
  posts: Array<Post>
}

const feedQuery = query(`{
  posts: postsList(
    condition: { threadId: null }
    orderBy: [CREATED_AT_DESC]
  ) {
    id
    content
    createdAt
    author {
      username
    }
  }
}`)

const createPostMutation = mutation(`
mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      id
      content
      createdAt
      author {
        username
      }
    }
  }
}`)

export type CreatePostMutation = {
  createPost: (args: { input: { content: string } }) => Promise<{ createPost: { post: Post } }>
}

type Props = UrqlProps<FeedQuery, CreatePostMutation>


const Feed: any = (props: Props) => match<FeedQuery, CreatePostMutation>({
  error: ({ error }) => <div>{JSON.stringify(error)}</div>,

  loading: () => <div>loading...</div>,

  data: ({ data }) => (
    data.posts.map((post: Post) => (
      <div key={post.id}>
        {post.author.username}: {post.content}
      </div>
    ))
  )
})(props)

// const PostInputBox: React.SFC<Props> = ({ createPost }) => (

// )


class Home extends React.Component<Props> {
  render() {
    return (
      <div>
        <TextInput submit={content => this.props.createPost({ input: { content } })}/>
        <Feed {...this.props} />
      </div>
    )
  }
}

export default ConnectHOC({
  query: feedQuery,
  mutation: {
    createPost: createPostMutation
  }
})(Home);



