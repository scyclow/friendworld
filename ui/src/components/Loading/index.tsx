import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'


const Loading: React.SFC<{}> = () => {
  const [dots, setDots] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => setDots(dots + '.'), 350)
    return () => clearInterval(interval)
  })

  return (
    <div className={styles.loading}>
      loading{dots}
    </div>
)
}

export default Loading
