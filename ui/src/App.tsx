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
import NewThread from './containers/NewThread'
import Profile from './containers/Profile'
import User from './containers/User'
import Messages from './containers/Messages'
import Forum from './containers/Forum'



const App: React.SFC<{}> = () => (
  <main className="App">
    <Route path="/" component={Nav} />

    <Body>
      <Switch>
        <Route exact path="/" component={Forum} />
        <Route exact path="/threads/new" component={NewThread} />

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



export default App

