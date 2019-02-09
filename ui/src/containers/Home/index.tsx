import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';
import { Connect, ConnectHOC, UrqlProps, query, mutation } from 'urql'
import match, { DataProps } from '../../utils/match'
import { getUsernames, getHashtags } from '../../utils/parsers'
import TextInput from '../../components/TextInput'
import Post, { PostType } from '../../components/Post'


interface FeedQuery {
  posts: Array<PostType>
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
      id
      username
      avatarUrl
    }
    thread {
      id
      title
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
  createPost: (args: {
    input: {
      content: string,
      tags: string
      // {
      //   hashtags: Array<string>,
      //   usernames: Array<string>
      // }
    }
  }) => Promise<{ createPost: { post: PostType } }>
}

type Props = UrqlProps<FeedQuery, CreatePostMutation>


const Feed: any = (props: Props) => match<FeedQuery, CreatePostMutation>({
  error: ({ error }) => <div>{JSON.stringify(error)}</div>,

  loading: () => <div>loading...</div>,

  data: ({ data }) => (
    data.posts.map(post => (
      <div key={post.id} className={styles.buffer}>
        <Post post={post} />
      </div>
    ))
  )
})(props)

// const PostInputBox: React.SFC<Props> = ({ createPost }) => (

// )

function getTags(content: string) {
  return JSON.stringify({
    hashtags: getHashtags(content),
    usernames: getUsernames(content)
  })
}

class Home extends React.Component<Props> {
  createPost = (content: string) => {
    const tags = getTags(content)
    this.props.createPost({
      input: {
        content,
        tags
      }
    })
    this.props.refetch({ skipFetch: false })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <TextInput submit={this.createPost}/>
          <Feed {...this.props} />
        </div>

        <div className={styles.right}>
          BUY FASTCASH NOW!
        </div>
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



