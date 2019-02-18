import React, { useState } from 'react';
import { useMutation } from 'urql'
import jwt from '../../utils/jwt'


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


type LoginMutation = (input: {
    input: {
      username: string,
      password: string
    }
  }) => Promise<{ login: { jwtToken: string }}>


type MutationResponse = { login: { jwtToken: string }}
type Props = {}

type State = {
  username: string,
  password: string
}

function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [result, executeLogin] = useMutation<MutationResponse>(loginMutation)


  const login = () => {
    executeLogin({ input: { username, password } })
  }

  if (result.error) {
    console.log(result.error)
  } else if (result.fetching) {
    console.log(result.fetching)
  }

  if (result.data) {
    jwt.set(username, result.data.login.jwtToken)
    jwt.setCurrentUser(username)
    window.location.href = '/'
  }

  return (
    <div>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>login</button>
    </div>
  )
}


export default Login

