import * as React from 'react'
import styles from './styles.module.scss'

type Props = {
  error: Error | string
}

const DisplayError: React.SFC<Props> = ({ error }) => (
  <div className={styles.error}>
    An Error Occurred: {JSON.stringify(error, null, 3)}
  </div>
)

export default DisplayError
