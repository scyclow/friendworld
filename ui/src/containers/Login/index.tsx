import React, { useState } from 'react';
import DisplayError from 'components/DisplayError'
import styles from './styles.module.scss'

type Props = {}

type State = {
  username: string,
  password: string
}

function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')

  return (
    <section className={styles.login}>
      <div className={styles.card}>
        <h1>Login</h1>
        <form>
          <input
            name="fw_username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.submitButton}
            onClick={(e) => {
              e.preventDefault()
              if (username && password) {
                setErrorText('Your account has been suspended for violating Friendworld\'s terms of service')
              } else {
                setErrorText('Missing username and/or password')
              }
            }}
          >
            Submit
          </button>
          {errorText && <DisplayError error={errorText} />}

        </form>
      </div>
    </section>
  )
}

export default Login
