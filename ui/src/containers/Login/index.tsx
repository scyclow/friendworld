import React, { useState } from 'react';
import { useMutation } from 'urql'
import jwt from '../../utils/jwt'
import DisplayError from '../../components/DisplayError'
import Loading from '../../components/Loading'
import styles from './styles.module.scss'



const loginMutation = `
mutation($input: LoginInput!) {
  login(input: $input) {
    jwtToken
    query {
      currentUser {
        id
        username
      }
    }
  }
}`


type LoginInput = {
  input: {
    username: string,
    password: string
  }
}
type LoginResponse = { login: { jwtToken: string }}
type Props = {}

type State = {
  username: string,
  password: string
}

function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [{ error, fetching, data }, executeLogin] = useMutation<LoginResponse, LoginInput>(loginMutation)

  if (data) {
    jwt.set(username, data.login.jwtToken)
    jwt.setCurrentUser(username)
    window.location.href = '/'
  }

  return (
    <section className={styles.login}>
      <div className={styles.card}>
        <h1>Login</h1>
        {error && <DisplayError error={error} />}
        {fetching && <Loading />}
        {!error && !fetching && (
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
                  executeLogin({ input: { username, password } })
                }
              }}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Login
