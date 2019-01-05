import * as React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { ConnectHOC, query, UrqlProps } from 'urql'
import match, { DataProps } from './utils/match'
import jwt from './utils/jwt'

import Body from './containers/Body'
import Nav from './containers/Nav'
import Home from './containers/Home'
import Landing from './containers/Landing'
import Login from './containers/Login'
import Signup from './containers/Signup'



type LoginQuery = {
  currentUser: null | {
    id: string,
    username: string
  }
}

// const Main: React.SFC<{}> = () => (
//   <Connect query={loginQuery}>
//     {match<LoginQuery>({
//       loading: () => 'loading...',
//       error: ({ error }) => JSON.stringify(error),
//       data: ({ data }) => data && data.currentUser
//         ? <Home />
//         : <Landing />
//     })}
//   </Connect>
// )

const App: React.SFC<UrqlProps<LoginQuery>> = ({ data, error }) => {
  const loggedIn = !!(data && data.currentUser)

  return (
    <main className="App">
      <Route exact path="/">
        {loggedIn &&<Nav loggedIn={loggedIn} />}
      </Route>

      <Body>
        <Switch>
          <Route exact path="/">
            {loggedIn
              ? <Home />
              : <Landing/>
            }
          </Route>

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Route path="/forum">
            <div>This is the forum!</div>
          </Route>

          <Route path="/profile">
            <div>This is the profile!</div>
          </Route>

          <Route path="/chat">
            <div>Let's chat!</div>
          </Route>
        </Switch>

      </Body>
    </main>
  )
}

const loginQuery = query(`{
  currentUser {
    id
    username
  }
}`)



export default ConnectHOC({
  query: loginQuery
})(App)

