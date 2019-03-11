import React, { Component } from 'react';
import { useQuery } from 'urql'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import Post from '../../components/Post'
import DisplayError from '../../components/DisplayError'
import ParsedText from '../../components/ParsedText'
import Loading from '../../components/Loading'
import useResponsive from '../../utils/useResponsive'

const userProps = `
  id
  createdAt
  username
  avatarUrl
  email
  gender
  birthday
  bio
  job
  interests
  websites
  media
  religion
  politics
`
const userQuery = `
query userByUsername ($username: UsernameDomain!){
  user: userByUsername (username: $username) {
    id
    createdAt
    username
    avatarUrl
    email
    gender
    birthday
    bio
    job
    interests
    websites
    media
    religion
    politics
    trackingInfo
    postStats: authoredPosts {
      totalCount
    }
    posts: authoredPostsList (first: 10, orderBy: [CREATED_AT_DESC]) {
      id
      content
      createdAt
      thread {
        id
        title
      }
    }
  }
}`

type UserQuery = {
  user: {
    id: string
    createdAt: string
    username: string
    avatarUrl: string | null
    email: string | null
    gender: string | null
    birthday: string | null
    bio: string | null
    job: string | null
    interests: string | null
    websites: string | null
    media: string | null
    religion: string | null
    politics: string | null
    postStats: {
      totalCount: number
    }
    posts: Array<{
      id: string
      content: string
      createdAt: string
      thread: {
        id: string
        title: string
      }

    }>
  } | null
}

const InfoSection = ({ title, info }: { title: string, info: any }) => (
  info && (
    <div className={styles.infoSection}>
      <h3>{title}</h3>
      <ParsedText content={info} />
    </div>
  )
)

type Props = {
  username: string
}

const formatDate = (date: string) => new Date(date).toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
})

const User: React.SFC<Props> = ({ username }) => {
  const [{ error, fetching, data }] = useQuery<UserQuery>({ query: userQuery, variables: { username } })
  const { isMobile, isDesktop } = useResponsive(540)

  if (error) return <DisplayError error={error} />
  if (fetching) return <Loading />
  if (!data || !data.user) return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      {username} is not an active Friendworld user!
    </div>
  )

  const { user } = data

  const header = (
    <header className={styles.header}>
      <h1 className={styles.intro}>Welcome to {user.username}'s Profile!</h1>
      <h4 className={styles.memberSince}>{user.username} has been a member since {formatDate(user.createdAt)}</h4>
    </header>
  )

  return (
    <div className={styles.profile}>
      {isMobile && header}
      <div className={styles.content}>
        <div className={styles.left}>
          <div>
            <div className={styles.avatar} style={{ backgroundImage: `url(${user.avatarUrl})` }} />
            <div><strong>Posts:</strong> {user.postStats.totalCount}</div>
            <div className={styles.sendMessage}>
              <Link to={`/messages/${user.username}`}>Message {user.username}</Link>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {isDesktop && header}
          <div className={styles.userInfo}>

          <InfoSection title="Gender" info={user.gender} />
          <InfoSection title="Birthday" info={user.birthday} />
          <InfoSection title="About Me" info={user.bio} />
          <InfoSection title="Occupation" info={user.job} />
          <InfoSection title="Favorite Websites" info={user.websites} />
          <InfoSection title="Favorite Movies, TV shows, and Music" info={user.media} />
          <InfoSection title="Religious Views" info={user.religion} />
          <InfoSection title="Political Views" info={user.politics} />

          </div>
          <div className={styles.recentPosts}>
            {user.posts.length ? (<>
              <h2>Recent posts by {user.username}:</h2>
              {user.posts.map(post => (
                <div className={styles.postContainer} key={post.id}>
                  <Post post={post} />
                </div>
              ))}
            </>) : (
              <h3>This user has not made any posts yet!</h3>
            )}
          </div>

          <div className={styles.uuid}>user uuid: {user.id}</div>
        </div>

      </div>
    </div>
  )
}

export default User
