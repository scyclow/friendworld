import * as React from 'react';
import { useQuery } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import Post, { PostType } from '../../components/Post'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'


type PostQuery = {
  post?: PostType
}

const postQuery = `
query postById ($id: Int!){
  post: postById (id: $id) {
    id
    createdAt
    content
    author {
      id
      username
      avatarUrl
      postStats: authoredPosts {
        totalCount
      }
    }
    thread {
      id
      title
    }
  }
}`


const Posts: React.SFC<{ id: number }> = ({ id }) => {
  const [{ error, fetching, data }] = useQuery<PostQuery>({ query: postQuery, variables: { id } })

  return (
    <section>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>

      <div className={styles.left}>
        {error && <DisplayError error={error} />}
        {fetching && <Loading />}
        {data && (
          data.post
            ? <Post post={data.post}/>
            : 'This post does not exist!'
        )}
      </div>
    </section>

  )
}

export default Posts
