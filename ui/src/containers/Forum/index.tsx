import * as React from 'react';
import { Connect, UrqlProps, query } from 'urql'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import match, { DataProps } from '../../utils/match'
import ParsedText from '../../components/ParsedText'


import { RouteProps } from 'react-router-dom'



const threadQuery = query(`{
  threads: threadsList (orderBy: [LATEST_POST_TIME_DESC]) {
    id
    title
    latestPostTime
    postStats: posts {
      totalCount
    }
    posts: postsList (first: 1, orderBy: [CREATED_AT_DESC]) {
      author {
        username
      }
    }
  }
}`)

type Thread = {
  id: string,
  title: string,
  latestPostTime: string,
  posts: Array<{ author: { username: string } }>
  postStats: {
    totalCount: number
  }
}
type ThreadQuery = {
  threads: Array<Thread>
}

const ThreadPost = ({ thread }: { thread: Thread }) => (
  <div key={thread.id} className={styles.threadPost}>
    <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
    <div className={styles.info}><strong>LAST POST:</strong> [{thread.latestPostTime}]</div>
    <div className={styles.info}><strong>by:</strong> {thread.posts[0] && thread.posts[0].author.username}</div>
    <div className={styles.info}><strong>POSTS:</strong> {thread.postStats.totalCount}</div>
  </div>
)

const Forum: React.SFC<{}> = () => {

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Connect query={threadQuery}>
          {match<ThreadQuery>({
            error: ({ error }) => <div>Something went wrong: {JSON.stringify(error)}</div>,

            loading: () => <div>loading...</div>,

            data: ({ data }) => (
              <>
                <div className={styles.header}>
                  <h2>Forum</h2>
                  <Link to={`/threads/new`}>Start A Thread!</Link>
                </div>
                {data.threads.map(thread =>
                  <React.Fragment key={thread.id}>
                    <ThreadPost thread={thread} />
                  </React.Fragment>
                )}
              </>
            )
          })}
        </Connect>
      </div>
      <div className={styles.right}>
        <div><ParsedText content="https://www.washingtonpost.com/resizer/bmfQHooAGH6PmEv0qHjgf-ZUy-k=/480x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/EBULPVFULQI6PG4TXFYEHZL2EI.jpg BUY FAST CASH NOW"/></div>
        <div><ParsedText content="https://fartashphoto.files.wordpress.com/2010/12/funny-hillary-clinton-picture.jpg UH OH... WHAT DID SHILLARY DO THIS TIME?!"/></div>
        <div><ParsedText content="https://www.thoughtco.com/thmb/_Wdk4z5X4uEhg4h88GTFPS8KQqw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/h20-58e655f93df78c5162ea0a1f.jpg YOU'LL NEVER BELIEVE WHAT SCIENTISTS ARE FINDING IN YOUR FOOD"/></div>
        <div><ParsedText content="https://targetedindividualscanada.files.wordpress.com/2011/01/psycho-electronic-weapon-effects-pic1.jpg THE GOVERNMENT JUST FREAKED ABOUT NEW INFO LEAKING"/></div>
        <div><ParsedText content="https://targetedindividualscanada.files.wordpress.com/2011/11/brain-inplants.jpg WHAT YOU DON'T KNOW ABOUT YOUR BRAIN MAY KILL YOU"/></div>
      </div>
    </div>

  )
}

export default Forum
