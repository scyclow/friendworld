import * as React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { ConnectHOC, query, UrqlProps } from 'urql'
import match, { DataProps } from './utils/match'
import jwt from './utils/jwt'

import Body from './components/Body'
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
import Forum from './containers/Forum'

export type LoginQuery = {
  currentUser: null | CurrentUser
}

export type CurrentUser = {
  id: string,
  username: string,
  avatarUrl?: string
  alerts: Array<{
    id: string
    content: string
  }>
}

const loginQuery = query(`{
  currentUser {
    id
    username
    avatarUrl
    alerts: alertsList (condition: { read: false }) {
      id
      content
    }
  }
}`)

const App: React.SFC<UrqlProps<LoginQuery>> = ({ data, error }) => {
  const currentUser = data && data.currentUser
  const Main = currentUser ? Home : Landing

  return (
    <main className="App">
      <Route path="/" render={({ history }) =>
        currentUser && <Nav currentUser={currentUser} routeChange={history.listen} />
      }/>

      <Body>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/forum" component={Forum} />
          <Route exact path="/threads/new" render={() => <div/>} />

          <Route exact path="/threads/:id" render={({ match }) =>
            <Threads id={Number(match.params.id)} />
          }/>

          {/* TODOs: */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/messages" component={Messages} />

          <Route path="/users/:username" render={({ match }) =>
            <User username={match.params.username} />
          }/>

          <Route path="/posts/:id" render={({ match }) =>
            <Posts id={match.params.id} />
          }/>



        </Switch>

      </Body>
    </main>
  )
}


export default ConnectHOC({
  query: loginQuery
})(App)

