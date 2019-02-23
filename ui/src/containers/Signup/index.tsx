import React, { useState } from 'react';
import { useMutation } from 'urql'
import jwt from '../../utils/jwt'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import styles from './styles.module.scss'

const signupMutation = `
mutation($input: SignupInput!) {
  signup(input: $input) {
    jwtToken
  }
}`


type SignupInput = {
  input: {
    username: string,
    password: string
  }
}

type SignupResponse = { signup: { jwtToken: string }}

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
  const [{ error, fetching, data }, executeSignup] = useMutation<SignupResponse, SignupInput>(signupMutation)

  const signup = () => {
    if (!username || !password) {
      setErrorText('Must include username and password.')
      return
    }
    if (password !== passwordConfirm) {
      setErrorText('Password must match Password Confirmation')
      return
    }
    executeSignup({ input: { username, password } })
  }

  const displayErrorText = error
    ? error.message.includes('violates unique constraint')
      ? 'That username is already taken. Please try again'
      : error.message
    : errorText
      ? errorText
      : ''

  if (data && !error) {
    jwt.set(username, data.signup.jwtToken)
    jwt.setCurrentUser(username)
    window.location.href = '/'
  }

  return (
    <section className={styles.signup}>
      <div className={styles.card}>
        <h1>Create Account</h1>
        <form>
          <input
            name="fw_username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <div style={{ marginTop: '10px' }}>
            {displayErrorText && <DisplayError error={displayErrorText} />}
            {fetching && <Loading />}
            {!fetching && (
              <button
                className={styles.submitButton}
                onClick={(e) => {
                  e.preventDefault()
                  signup()
                }}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}



export default Signup

