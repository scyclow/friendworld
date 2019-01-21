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
import Posts from './containers/Posts'
import Threads from './containers/Threads'
import Profile from './containers/Profile'
import User from './containers/User'
import Messages from './containers/Messages'

export type LoginQuery = {
  currentUser: null | {
    id: string,
    username: string,
    alerts: Array<{
      content: string
    }>
  }
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
          <Route exact path="/profile" component={Profile} />
          <Route path="/messages" component={Messages} />

          <Route path="/users/:username" render={({ match }) =>
            <User username={match.params.username}/>
          }/>

          <Route path="/posts/:id" render={({ match }) =>
            <Posts id={match.params.id}/>
          }/>

          <Route path="/threads/:id" render={({ match }) =>
            <Threads id={match.params.id}/>
          } />

          <Route path="/forum">
            <div>This is the forum!</div>
          </Route>
        </Switch>

      </Body>
    </main>
  )
}


export default ConnectHOC({
  query: loginQuery
})(App)

