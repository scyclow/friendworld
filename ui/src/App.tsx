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



export type LoginQuery = {
  currentUser: null | {
    id: string,
    username: string,
    alerts: Array<{
      content: string
    }>
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
  const currentUser = data && data.currentUser

  return (
    <main className="App">
      <Route exact path="/">
        {currentUser &&<Nav currentUser={currentUser} />}
      </Route>

      <Body>
        <Switch>
          <Route exact path="/">
            {currentUser
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

          <Route path="/messages">
            <div>Let's DM!</div>
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
    alerts: alertsList (condition: { read: false }) {
      content
    }
  }
}`)



export default ConnectHOC({
  query: loginQuery
})(App)

