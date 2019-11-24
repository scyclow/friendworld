import React, { useState } from 'react';
import jwt from 'utils/jwt'
import DisplayError from 'components/DisplayError'
import styles from './styles.module.scss'


type Props = {}

type State = {
  username: string,
  password: string
}

function Signup() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')

  const signup = () => {
    if (!username || !password) {
      setErrorText('Must include username and password.')
      return
    }
    if (password !== passwordConfirm) {
      setErrorText('Password must match Password Confirmation')
      return
    }

    if (jwt.hasAccounts()) {
      setErrorText('This device is not eligable to create a Friendworld account because previous accounts have violated the Friendworld terms of service')
    } else {
      setErrorText('This device is not eligable to create a Friendworld account')
    }
  }

  return (
    <section className={styles.signup}>
      <div className={styles.card}>
        <h1>Create Account</h1>
        <form>
          <div className={styles.inputs}>
            <input
              name="fw_username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (e.target.value.length > 18) setErrorText('Username must be 18 characters or less')
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="password_confirm"
              placeholder="Password Confirmation"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          {errorText && <DisplayError error={errorText} />}
          <button
            className={styles.submitButton}
            onClick={(e) => {
              e.preventDefault()
              signup()
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}



export default Signup

