import React from 'react';
import find from 'lodash/find'
import orderBy from 'lodash/orderBy'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import Post from 'components/Post'
import ParsedText from 'components/ParsedText'
import useResponsive from 'utils/useResponsive'

import adData from 'data/ads.json'
import userData from 'data/users.json'
import postData from 'data/posts.json'


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
  const { isMobile, isDesktop } = useResponsive(540)

  const ads = { totalCount: adData.length }
  const user = find(userData, { username })

  if (!user) return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      {username} is not an active Friendworld user!
    </div>
  )

  const userPosts = orderBy(postData.filter(post => post.author.id === user.id), 'createdAt', 'desc')

  const header = (
    <header className={styles.header}>
      <h1 className={styles.intro}>Welcome to {user.username}'s Profile!</h1>
      <h4 className={styles.memberSince}>{user.username} has been a member since {formatDate(user.createdAt)}</h4>
      <h4 className={styles.memberSince}>{user.username} has engaged with {user.adClicks.totalCount}/{ads.totalCount} pieces of sponsored content!</h4>
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
          <InfoSection title="Interests" info={user.interests} />
          <InfoSection title="Favorite Websites" info={user.websites} />
          <InfoSection title="Favorite Movies, TV shows, and Music" info={user.media} />
          <InfoSection title="Religious Views" info={user.religion} />
          <InfoSection title="Political Views" info={user.politics} />

          </div>
          <div className={styles.recentPosts}>
            {userPosts.length ? (<>
              <h2>Recent posts by {user.username}:</h2>
              {userPosts.map((post: any) => (
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
