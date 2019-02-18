import React, { useState } from 'react';
import { useMutation } from 'urql'
import jwt from '../../utils/jwt'


const signupMutation = `
mutation($input: SignupInput!) {
  signup(input: $input) {
    user {
      id
      username
    }
  }
}`


interface SignupMutation {
  signup: (input: {
    input: {
      username: string,
      password: string
    }
  }) => Promise<{ signup: { jwtToken: string }}>
}

type SignupMutationResponse = { signup: { jwtToken: string }}

type Props = {}

type State = {
  username: string,
  password: string
}

function Signup() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [result, executeSignup] = useMutation<SignupMutationResponse>(signupMutation)

  const signup = () => executeSignup({ input: { username, password } })

  if (result.error) {
    console.error(result.error)
  }

  if (result.data) {
    jwt.set(username, result.data.signup.jwtToken)
    jwt.setCurrentUser(username)
    window.location.href = '/'
  }

  return (
    <div>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signup}>signup</button>
    </div>
  )
}



export default Signup

