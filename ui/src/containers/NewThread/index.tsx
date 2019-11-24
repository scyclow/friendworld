import React from 'react';
import { Link } from 'react-router-dom'
import noop from 'lodash/noop'


import styles from './styles.module.scss';
import TextInput from 'components/TextInput'


const NewThread: React.SFC<{}> = () => {

  return (
    <section className={styles.newThread}>
      <div className={styles.back}>
        <Link to="/">{'< Back to forum'}</Link>
      </div>

      <Link to="/signup">
        <h2 className={styles.signup}>Create An Account To Join The Conversation!</h2>
      </Link>

      <div className={styles.disabled}>
        <h2 className={styles.label}>Title</h2>
        <input
          className={styles.input}
          onChange={noop}
          value={'This is my first post on friendworld!'}
        />
        <h2 className={styles.label}>Content</h2>
        <TextInput
          onSubmit={noop}
          onChange={noop}
          buttonContent="Start Thread"
          placeholder="This place looks amazing! I can't wait to start posting content!"
          inputStyle={{ height: '200px' }}
        />
      </div>
    </section>
  )
}

export default NewThread
