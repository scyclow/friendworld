import * as React from 'react';
import { Connect, UrqlProps, query, mutation } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import match from '../../utils/match'
import Post, { PostType } from '../../components/Post'
import TextInput from '../../components/TextInput'
import { getTags } from '../../utils/parsers'


import { RouteChildrenProps } from 'react-router'

type ThreadQuery = {
  thread?: {
    id: number
    title: string
    posts: Array<PostType>
  }
}

const threadQuery = `
query threadById ($id: Int!){
  thread: threadById (id: $id) {
    id
    title
    posts: postsList {
      id
      content
      createdAt
      author {
        id
        username
        avatarUrl
      }
    }
  }
}`


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
      threadId: number,
      tags: string,
      // {
      //   hashtags: Array<string>,
      //   usernames: Array<string>
      // }
    }
  }) => Promise<{ createPost: { post: PostType } }>
}

type AddPostProps = {
  threadId: number,
  createPost: CreatePostMutation['createPost']
}
const AddPost: React.SFC<AddPostProps> = ({ threadId, createPost }) => {
  const submit = (content: string) => {
    createPost({
      input: {
        content,
        threadId,
        tags: getTags(content)
      }
    })
  }

  return (
    <div className={styles.addPost}>
      <TextInput onSubmit={submit} />
    </div>
  )
}

const Threads: React.SFC<{ id: number }> = ({ id }) => {
  return (
    <div>
      <div className={styles.back}>
        <Link to="/forum">{'< Back to forum'}</Link>
      </div>

      <div className={styles.left}>
        <Connect
          query={query(threadQuery, { id })}
          mutation={{ createPost: createPostMutation }}
        >
          {match<ThreadQuery, CreatePostMutation>({
            error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

            loading: () => <div>loading...</div>,

            data: ({ createPost, data: { thread } }) => thread ? (
              <div className={styles.container}>
                <h2 className={styles.threadTitle}>{thread.title}</h2>
                <div>
                  {thread.posts.map(post =>
                    <React.Fragment key={post.id}>
                      <Post post={post} />
                    </React.Fragment>
                  )}
                  <AddPost threadId={thread.id} createPost={createPost} />
                </div>
              </div>
            ) : 'This thread does not exist!'
          })}
        </Connect>
      </div>
    </div>

  )
}

export default Threads


// const Thread: React.SFC<Props> = ({ id }) => <div>this is thread: {id}</div>

