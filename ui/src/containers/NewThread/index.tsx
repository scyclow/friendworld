import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss';
import { getTags } from '../../utils/parsers'
import TextInput from '../../components/TextInput'
import Post from '../../components/Post'



type UserQuery = {
  currentUser: {
    id: string
    username: string
    avatarUrl: string
    postStats: {
      totalCount: number
    }
  }
}

const userQuery = `{
  currentUser {
    id
    username
    avatarUrl
    postStats: authoredPosts {
      totalCount
    }
  }
}`

export type CreateThreadMutation = {
  createThread: (args: {
    input: {
      title: string,
      content: string,
      tags: string
      // {
      //   hashtags: Array<string>,
      //   usernames: Array<string>
      // }
    }
  }) => Promise<{ createThread: { thread: { id: string, title: string } } }>
}

type CreateThreadMutationResponse = { createThread: { thread: { id: string, title: string } } }

const createThreadMutation = `
mutation createThread($input: CreateThreadInput!) {
  createThread(input: $input) {
    thread {
      id
      title
    }
  }
}`





const NewThread: React.SFC<{}> = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [query] = useQuery<UserQuery>({ query: userQuery })
  const [response, executeCreateThread] = useMutation<CreateThreadMutationResponse>(createThreadMutation)

  const createThread = () => {
    const tags = getTags(title + ' ' + content)
    executeCreateThread({ input: { title, content, tags, } })
  }

  if (response.data) {
    window.location.href = `/threads/${response.data.createThread.thread.id}`
    return <div />
  }
  if (query.fetching || response.fetching) return <span>loading...</span>

  const author = query.data && {
    ...query.data.currentUser,
    postStats: {
      totalCount: query.data.currentUser.postStats.totalCount + 1
    }
  }

  return (
    <section className={styles.newThread}>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>
      <h1 className={styles.sectionTitle}>New Thread</h1>
      <h2 className={styles.label}>Title</h2>
      <input
        className={styles.input}
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <h2 className={styles.label}>Content</h2>
      <TextInput
        onSubmit={createThread}
        onChange={setContent}
        buttonContent="Start Thread"
        placeholder=""
        inputStyle={{ height: '200px' }}
      />
      {(title || content) && (
        <>
          <h2 className={styles.label}>[PREVIEW] {title}</h2>
          <Post
            post={{
              id: 'XX',
              createdAt: new Date().toString(),
              content,
              author,
            }}
          />
        </>
      )}
    </section>
  )
}

export default NewThread
