import * as React from 'react';
import { Connect, mutation, UrqlProps } from 'urql'
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

// const Landing: React.SFC<{}> = () => (
//   <div>
//     Welcome to FriendWorld: The place to meet friends.
//   </div>
// )


interface LoginMutation {
  login: (input: {
    input: {
      username: string,
      password: string
    }
  }) => Promise<{ login: { jwtToken: string }}>
}

type QueryProps = UrqlProps<void, LoginMutation>;
type State = {
  username: string,
  password: string
}

class Landing extends React.Component<{}, State> {
  state = {
    username: '',
    password: ''
  }

  async login(mut: Function) {
    const { username, password } = this.state

    try {
      const results = await mut({ input: { username, password } })
      jwt.set(username, results.login.jwtToken)
      jwt.setCurrentUser(username)
      location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  renderData = ({ login }: LoginMutation) => {
    return (
      <div>
        <div>
          <h1>Friendworld</h1>
          <h2>A Place to Meet Friends</h2>
        </div>

        <input placeholder="username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value})} />
        <input placeholder="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})} />
        <button onClick={() => this.login(login)}>login</button>
      </div>
    )
  }

  render() {
    return (
      <Connect mutation={{ login: loginMutation }}>
        {match<void, LoginMutation>({
          error: ({ error }) => JSON.stringify(error),
          data: this.renderData
        })}
      </Connect>
    )
  }
}


export default Landing;

