import * as React from 'react';
import { useMutation, useQuery } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import AdContainer from '../AdContainer'
import Post, { PostType } from '../../components/Post'
import TextInput from '../../components/TextInput'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import { getTags } from '../../utils/parsers'
import useResponsive from '../../utils/useResponsive'


import { RouteChildrenProps } from 'react-router'

type ThreadQuery = {
  thread?: {
    id: number
    title: string
    posts: Array<PostType>
  }
  currentUser?: {
    id: string
  }
}

const threadQuery = `
query threadById ($id: Int!) {
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
        postStats: authoredPosts {
          totalCount
        }
      }
    }
  }
  currentUser {
    id
  }
}`

const _threadQuery = `
query threadById ($id: Int!) {
  threads: threadById (first: 1) {
    id
    title
  }
  currentUser {
    id
  }
}`


const createPostMutation = `
mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      id
      content
      createdAt
      author {
        id
        avatarUrl
        username
      }
    }
  }
}`

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
    // TODO fix this
    | any
}
type CreatePostMutationResponse = { createPost: { post: PostType } }

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

let i = 0
const Threads: React.SFC<{ id: number }> = ({ id }) => {
  const { isMobile, isDesktop } = useResponsive(820)
  const showAd = (i: number) => isMobile && !((i + 1) % 4)

  const [q] = useQuery<ThreadQuery>({ query: _threadQuery, })
  console.log(q[0])
  // const [query] = useQuery<ThreadQuery>({ query: threadQuery, variables: { id } })
  const query: any = {}
  const [response, executeCreatePost] = useMutation<CreatePostMutationResponse>(createPostMutation)


  const existingPosts = query.data && query.data.thread && query.data.thread.posts || []
  const allPosts = existingPosts && response.data
    ? [...existingPosts, response.data.createPost.post]
    : existingPosts


  return (
    <section>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>

      <div className={styles.threadContainer}>
        <div className={styles.left}>
          {query.error && <DisplayError error={query.error} />}
          {query.fetching && <Loading />}
          {query.data && (
            !query.data.thread
              ? 'This thread does not exist!'
              : (
                <div className={styles.container}>
                  <h2 className={styles.threadTitle}>{query.data.thread.title}</h2>
                  <div>
                    {allPosts.map((post: any, i: number) =>
                      <React.Fragment key={post.id}>
                        {showAd(i) && (
                          <div className={styles.ad}><AdContainer n={1}/></div>
                        )}
                        <Post post={post} />
                      </React.Fragment>
                    )}
                    {!query.data.currentUser && (
                      <Link to="/signup">
                        <h2 className={styles.signup}>Create An Account To Join The Conversation!</h2>
                      </Link>
                    )}
                    {query.data.currentUser
                      ? <AddPost threadId={query.data.thread.id} createPost={executeCreatePost} />
                      : <div className={styles.disabled}><AddPost threadId={query.data.thread.id} createPost={executeCreatePost} /></div>
                    }
                  </div>
                </div>
              )
          )}
        </div>

        {isDesktop && <div style={{ marginTop: '10px' }}><AdContainer /></div>}
      </div>
    </section>
  )
}

export default Threads

