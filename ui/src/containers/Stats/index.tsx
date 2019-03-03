import React, { useState } from 'react';
import { useQuery } from 'urql'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import styles from './styles.module.scss'


const statsQuery = `{
  userStatsList {
    username
    postCount
  }
}`

type StatsQuery = {
  userStatsList: Array<{
    username: string
    postCount: string
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
      <h2>Top Posters:</h2>
      <ol>
        {data.userStatsList.map((stat, i) => (
          <li>
            {i + 1}. {stat.username}: {stat.postCount}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Stats
