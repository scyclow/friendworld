import * as React from 'react';
import { ConnectHOC, mutation, UrqlProps } from 'urql'
import match, { DataProps } from '../../utils/match'
import jwt from '../../utils/jwt'


const loginMutation = mutation(`
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
}
`)

interface LoginMutation {
  login: (input: {
    input: {
      username: string,
      password: string
    }
  }) => Promise<{ login: { jwtToken: string }}>
}

const signupMutation = mutation(`
mutation($input: SignupInput!) {
  signup(input: $input) {
    user {
      id
      username
    }
  }
}
`)


interface SignupMutation {
  signup: (input: {
    input: {
      username: string,
      password: string
    }
  }) => Promise<{ signup: { jwtToken: string }}>
}


type Mutations = SignupMutation & LoginMutation

type Props = UrqlProps<void, Mutations>

type State = {
  username: string,
  password: string
}

class Signup extends React.Component<Props, State> {
  state = {
    username: '',
    password: ''
  }

  signup = async () => {
    const { username, password } = this.state

    try {
      await this.props.signup({ input: { username, password } })
      const results = await this.props.login({ input: { username, password } })

      jwt.set(username, results.login.jwtToken)
      jwt.setCurrentUser(username)
      window.location.href = '/'
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div>
        <input placeholder="username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value})} />
        <input placeholder="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})} />
        <button onClick={this.signup}>signup</button>
      </div>
    )
  }
}


export default ConnectHOC({
  mutation: {
    signup: signupMutation,
    login: loginMutation
  }
})(Signup);

