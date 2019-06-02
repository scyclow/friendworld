import React from 'react';
import { useQuery } from 'urql'
import DisplayError from 'components/DisplayError'
import Loading from 'components/Loading'
import styles from './styles.module.scss'


const statsQuery = `{
  userStatsList {
    username
    postCount
  }
  userAdClicksList {
    username
    adClicks
  }
}`

type StatsQuery = {
  userStatsList: Array<{
    username: string
    postCount: string
  }>
  userAdClicksList: Array<{
    username: string
    adClicks: string
  }>
}



function Stats() {
  const [{ error, fetching, data }] = useQuery<StatsQuery>({ query: statsQuery })

  if (error) {
    debugger
    return <DisplayError error={error} />
  }
  if (fetching) return <Loading />
  if (!data) return null

  return (
    <section className={styles.stats}>
      <h1>User Stats</h1>
      <div className={styles.sectionContainer}>
        <div className={styles.statSection}>
          <h2>Top Posters:</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
                <th>Posts</th>
              </tr>
            </thead>
            <tbody>
              {data.userStatsList.map((stat, i) => (
                <tr key={i}>
                  <td>{i + 1}.</td>
                  <td>{stat.username}</td>
                  <td>{stat.postCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.statSection}>
          <h2>Sponsored Content Engagements:</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
                <th>Engagements</th>
              </tr>
            </thead>
            <tbody>
              {data.userAdClicksList.map((stat, i) => (
                <tr key={i}>
                  <td>{i + 1}.</td>
                  <td>{stat.username}</td>
                  <td>{stat.adClicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Stats
