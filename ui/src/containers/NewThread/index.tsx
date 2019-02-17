import * as React from 'react';
import { Connect, ConnectHOC, UrqlProps, query, mutation } from 'urql'
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

const userQuery = query(`{
  currentUser {
    id
    username
    avatarUrl
    postStats: authoredPosts {
      totalCount
    }
  }
}`)

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

const createThreadMutation = mutation(`
mutation createThread($input: CreateThreadInput!) {
  createThread(input: $input) {
    thread {
      id
      title
    }
  }
}`)


type Props = UrqlProps<UserQuery, CreateThreadMutation>
type State = {
  title: string,
  content: string,
}


class NewThread extends React.Component<Props, State> {
  state = {
    title: '',
    content: '',
  }

  createThread = async () => {
    const { title, content } = this.state
    const tags = getTags(title + ' ' + content)
    const { createThread: { thread } } = await this.props.createThread({ input: {
        title,
        content,
        tags,
      }
    })
    window.location.href = `/threads/${thread.id}`
  }

  render() {
    const { error, data, fetching } = this.props
    const { title, content } = this.state

    if (fetching) return 'loading...'

    const author = data && {
      ...data.currentUser,
      postStats: {
        totalCount: data.currentUser.postStats.totalCount + 1
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
          onChange={e => this.setState({ title: e.target.value })}
          value={title}
        />
        <h2 className={styles.label}>Content</h2>
        <TextInput
          onSubmit={this.createThread}
          onChange={content => this.setState({ content })}
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
}


export default ConnectHOC({
  query: userQuery,
  mutation: {
    createThread: createThreadMutation
  }
})(NewThread)

