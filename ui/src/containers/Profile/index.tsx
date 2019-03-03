import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import Post, { PostType } from '../../components/Post'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import useResponsive from '../../utils/useResponsive'

import { RouteChildrenProps } from 'react-router'

type CurrentUser = {
  id: string
  createdAt: string
  username: string
  avatarUrl: string
  email: string | null
  gender: string
  birthday: string | null
  bio: string
  job: string
  interests: string
  websites: string
  media: string
  religion: string
  politics: string
  trackingInfo: unknown
  postStats: {
    totalCount: number
  }
}
type CurrentUserQuery = {
  currentUser: CurrentUser
}

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

const currentUserQuery = `{
  currentUser {
    ${userProps}
    trackingInfo
    postStats: authoredPosts {
      totalCount
    }
  }
}`


const updateUserMutation = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
      ${userProps}
    }
  }
}`

type UpdateUserInput = {
  input: {
    avatarUrl?: string
    email?: string | null
    gender?: string
    birthday?: string | null
    bio?: string
    job?: string
    interests?: string
    websites?: string
    media?: string
    religion?: string
    politics?: string
  }
}

type UpdateUserPayload = {
  user: UpdateUserInput['input']
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

export default function Profile() {
  const [{ data, error, fetching }] = useQuery<CurrentUserQuery>({ query: currentUserQuery })
  if (error) return <DisplayError error={error} />
  if (fetching) return <Loading />
  if (!data) return null

  return <ProfileContent currentUser={data.currentUser}/>
}

const validDate = (dateStr: string) => Date.parse(dateStr) ? new Date(dateStr).toISOString() : null
const validEmail = (emailStr: string) => emailStr.match(/^.+@.+\..+$/) ? emailStr : null

type Props = {
  currentUser: CurrentUser
}

function ProfileContent ({ currentUser }: Props) {
  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser.avatarUrl)
  const [email, setEmail] = useState<string>(currentUser.email || '')
  const [gender, setGender] = useState<string>(currentUser.gender)
  const [birthday, setBirthday] = useState<string>(currentUser.birthday || '')
  const [bio, setBio] = useState<string>(currentUser.bio)
  const [job, setJob] = useState<string>(currentUser.job)
  const [interests, setInterests] = useState<string>(currentUser.interests)
  const [websites, setWebsites] = useState<string>(currentUser.websites)
  const [media, setMedia] = useState<string>(currentUser.media)
  const [religion, setReligion] = useState<string>(currentUser.religion)
  const [politics, setPolitics] = useState<string>(currentUser.politics)

  const [submitted, setSubmitted] = useState<boolean>(false)
  const { isMobile, isDesktop } = useResponsive(540)


  const [response, executeUpdateUser] = useMutation<UpdateUserPayload, UpdateUserInput>(updateUserMutation)

  const bdayError = submitted && birthday && !validDate(birthday) ? 'Birthday must be a valid date' : ''
  const emailError = submitted && email && !validEmail(email) ? 'Email must be in correct format' : ''

  const header = (
    <header className={styles.header}>
      <h1 className={styles.intro}>Update Profile: {currentUser.username}</h1>
      <div>uuid: {currentUser.id}</div>
    </header>
  )

  const updateUser = () => {
    setSubmitted(true)
    executeUpdateUser({
      input: {
        email: validEmail(email),
        birthday: validDate(birthday),
        avatarUrl,
        gender,
        bio,
        job,
        interests,
        websites,
        media,
        religion,
        politics
      }
    })
  }

  return (
    <div className={styles.profile}>
      {isMobile && header}
      <div className={styles.content}>
        <div className={styles.left}>
          <div>
            <div className={styles.avatar} style={{ backgroundImage: `url(${avatarUrl})` }} />
            <div><strong>Posts:</strong> {currentUser.postStats.totalCount}</div>
          </div>
        </div>

        <div className={styles.right}>
          {isDesktop && header}
          <div className={styles.buttonContainer}>
            <button className={styles.submitButton} onClick={updateUser}>UPDATE PROFILE</button>
          </div>

          <div className={styles.inputSection}>
            <h3>Avatar Url</h3>
            <input className={styles.contentInput} value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
          </div>

          <div className={styles.inputSection}>
            <h3>Email</h3>
            <input className={styles.contentInput} value={email} onChange={e => setEmail(e.target.value)} />
            {!!emailError && <div>{emailError}</div>}
          </div>

          <div className={styles.inputSection}>
            <h3>Gender</h3>
            <input className={styles.contentInput} value={gender} onChange={e => setGender(e.target.value)} />
          </div>

          <div className={styles.inputSection}>
            <h3>Birthday</h3>
            <input className={styles.contentInput} value={birthday} onChange={e => setBirthday(e.target.value)} />
            {!!bdayError && <div>{bdayError}</div>}
          </div>

          <div className={styles.inputSection}>
            <h3>About Me</h3>
            <textarea placeholder="Tell us about yourself!" className={styles.contentInput} value={bio} onChange={e => setBio(e.target.value)} />
          </div>

          <div className={styles.inputSection}>
            <h3>Occupation</h3>
            <input className={styles.contentInput} value={job} onChange={e => setJob(e.target.value)} />
          </div>

          <div className={styles.inputSection}>
            <h3>Favorite Websites</h3>
            <input className={styles.contentInput} value={websites} onChange={e => setWebsites(e.target.value)} />
          </div>

          <div className={styles.inputSection}>
            <h3>Favorite Movies, TV shows, and Music</h3>
            <input className={styles.contentInput} value={media} onChange={e => setMedia(e.target.value)} />
          </div>

          <div className={styles.inputSection}>
            <h3>Religious Views</h3>
            <input className={styles.contentInput} value={religion} onChange={e => setReligion(e.target.value)} />
          </div>

          <div className={styles.inputSection}>
            <h3>Political Views</h3>
            <input className={styles.contentInput} value={politics} onChange={e => setPolitics(e.target.value)} />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.submitButton} onClick={updateUser}>UPDATE PROFILE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

