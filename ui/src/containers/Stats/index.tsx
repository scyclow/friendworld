import React from 'react';
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import usersData from 'data/users.json'



function Stats() {
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
              {usersData
                .sort((a, b) => b.postStats.totalCount - a.postStats.totalCount)
                .map((stat, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>
                      <Link to={`/users/${stat.username}`}>{stat.username}</Link>
                    </td>
                    <td>{stat.postStats.totalCount}</td>
                  </tr>
                ))
              }
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
              {usersData
                .sort((a, b) => b.adClicks.totalCount - a.adClicks.totalCount)
                .map((stat, i) => (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>
                      <Link to={`/users/${stat.username}`}>{stat.username}</Link>
                    </td>
                    <td>{stat.adClicks.totalCount}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Stats
