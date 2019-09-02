import React, { Fragment } from 'react';
import { useMutation, useQuery } from 'urql'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import flatMap from 'lodash/flatMap'
import styles from './styles.module.scss'
import AdContainer, { useAds } from '../AdContainer'
import Post, { PostType } from 'components/Post'
import TextInput from 'components/TextInput'
import DisplayError from 'components/DisplayError'
import Loading from 'components/Loading'
import { getTags } from 'utils/parsers'
import useResponsive from 'utils/useResponsive'
import profanityFilter from 'utils/profanityFilter'



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

const queryType = process.env.NODE_ENV === 'production' ? 'thread' : 'threadById'
const threadQuery = `
query ${queryType} ($id: Int!) {
  thread: ${queryType} (id: $id) {
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

const stickiedThreads = [1]
const Threads: React.SFC<{ id: number }> = ({ id }) => {
  const { isMobile, isDesktop } = useResponsive(820)
  const [{ data, error, fetching }] = useQuery<ThreadQuery>({ query: threadQuery, variables: { id } })

  const tags = (
    !stickiedThreads.includes(id) && data && data.thread
      ? flatMap(data.thread.posts, p => JSON.parse(p.tags))
      : []
  )
  const { ads, fetchingAds } = useAds(4, { tags })

  const showMobileAd = (i: number) => {
    if (!isMobile) return false
    if ((i + 1) % 4) return false

    const adIx = (((i + 1) / 4) - 1) % ads.length

    return (
      <div className={styles.ad}>
        <AdContainer ads={[ads[adIx]]} fetching={fetchingAds} />
      </div>
    )
  }

  const isError = error && <DisplayError error={error} />
  const isLoading = fetching && <Loading />


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
              {showMobileAd(i)}
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

        {isDesktop && (
          <div className={styles.adContainer}>
            <AdContainer ads={ads} fetching={fetchingAds} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Threads

