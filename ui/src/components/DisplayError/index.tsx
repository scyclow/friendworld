import * as React from 'react'
import styles from './styles.module.scss'

type Props = {
  error: Error
}

const DisplayError: React.SFC<Props> = ({ error }) => (
  <div className={styles.error}>
    An Error Occurred: {JSON.stringify(error)}
  </div>
)

export default DisplayError
