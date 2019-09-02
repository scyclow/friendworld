import * as React from 'react'
import styles from './styles.module.scss'
import jwt from 'utils/jwt'

type Props = {
  error: Error | string
}

const DisplayError: React.SFC<Props> = ({ error }) => {
  const e: any = error
  if (e.response && e.response.status === 401) {
    jwt.clearCurrentUser()
    window.location.reload()
  }
  return (
    <div className={styles.error}>
      An Error Occurred: {JSON.stringify(error, null, 3)}
    </div>
  )
}

export default DisplayError
