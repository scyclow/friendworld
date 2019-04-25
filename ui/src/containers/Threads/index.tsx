import React, { Fragment } from 'react';
import { useMutation, useQuery } from 'urql'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './styles.module.scss'
import AdContainer from '../AdContainer'
import Post, { PostType } from '../../components/Post'
import TextInput from '../../components/TextInput'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import { getTags } from '../../utils/parsers'
import useResponsive from '../../utils/useResponsive'
import profanityFilter from '../../utils/profanityFilter'



type ThreadQuery = {
  thread?: {
    id: number
    title: string
    posts: Array<PostType & { tags: string }>
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
      tags
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

type CreatePostInput = {
  input: {
    content: string,
    threadId: number,
    tags: string, // Array<string>,
    usernames: string, // Array<string>
  }
}

type CreatePostResponse = { createPost: { post: PostType } }

type AddPostProps = {
  threadId: number,
  disabled?: boolean
}
const AddPost: React.SFC<AddPostProps> = ({ threadId, disabled }) => {
  const [response, executeCreatePost] = useMutation<CreatePostResponse, CreatePostInput>(createPostMutation) // eslint-disable-line

  const submit = (content: string) => {
    if (!content) return
    const { tags, usernames } = getTags(content)
    executeCreatePost({
      input: {
        threadId,
        content,
        tags,
        usernames,
      }
    })
  }

  return (
    <>
      {disabled && (
        <Link to="/signup">
          <h2 className={styles.signup}>Create An Account To Join The Conversation!</h2>
        </Link>
      )}
      <div className={cx(styles.addPost, disabled && styles.disabled)}>
        <TextInput onSubmit={submit} />
      </div>
    </>
  )
}


const Threads: React.SFC<{ id: number }> = ({ id }) => {
  const { isMobile, isDesktop } = useResponsive(820)
  const [{ data, error, fetching }] = useQuery<ThreadQuery>({ query: threadQuery, variables: { id } })

  // const refetch = useCallback(
  //   () => executeQuery({ requestPolicy: 'network-only' }),
  //   []
  // );
  const showAd = (i: number) => isMobile && !((i + 1) % 4)

  const isError = error && <DisplayError error={error} />
  const isLoading = fetching && <Loading />

  const tags = (data && data.thread
    ? data.thread.posts.flatMap(p => JSON.parse(p.tags))
    : []
  )

  const isData = data && (data.thread ? (
    <div className={styles.container}>
      <header className={styles.threadTitle}>
        <h2 >{profanityFilter(data.thread.title)}</h2>
      </header>
      <div>
        <Link to={`/threads/${data.thread.id}`}>
          <div className={styles.threadLink}>
            /threads/{data.thread.id}
          </div>
        </Link>
        <>
          {data.thread.posts.map((post, i) =>
            <Fragment key={post.id}>
              {showAd(i) &&
                <div className={styles.ad}>
                  <AdContainer n={1} tag={tags[i]}/>
                </div>
              }
              <Post post={post} />
            </Fragment>
          )}
        </>
        <AddPost
          threadId={data.thread.id}
          disabled={!data.currentUser}
        />
      </div>
    </div>
  ) : 'This thread does not exist!')

  return (
    <section>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>

      <div className={styles.threadContainer}>
        <div className={styles.left}>
          {isError}
          {isLoading}
          {isData}
        </div>

        {isDesktop && <div className={styles.adContainer}><AdContainer n={3} tags={tags}/></div>}
      </div>
    </section>
  )
}

export default Threads

