import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './styles.module.scss'
import { Width } from 'components/Body'

import { RouteChildrenProps } from 'react-router'

export type Props = RouteChildrenProps

function Nav(props: Props) {
  return (
    <nav className={cx(styles.container, 'solid')}>
      <Width>
        <div className={styles.content}>
          <Link to="/">
            <div className={styles.title}>FriendWorld</div>
          </Link>

          <div className={styles.links}>
            <SignedOutMenu />
          </div>
        </div>
      </Width>
    </nav>
  )
}


const SignedOutMenu = () => (
  <>
    <Link to="/login" className={styles.link}>Login</Link>
    <Link to="/signup" className={styles.link}>Signup</Link>
  </>
)

export default Nav
