import * as React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import { Connect, query } from 'urql'
import match, { DataProps } from './utils/match'
import jwt from './utils/jwt'

import Body from './containers/Body';
import Nav from './containers/Nav';
import Home from './containers/Home';
import Landing from './containers/Landing';


const Main: React.SFC<{}> = () => (
  <main className="App">
    <Nav/>
    <Body>
      <Switch>
        <Route exact path="/" component={Home} />

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



const loginQuery = query(`{
  currentUser {
    id
    username
  }
}`)


type LoginQuery = {
  currentUser: null | {
    id: string,
    username: string
  }
}

const App: React.SFC<{}> = () => (
  <Connect query={loginQuery}>
    {match<LoginQuery>({
      loading: () => 'loading...',
      error: ({ error }) => JSON.stringify(error),
      data: ({ data }) => data && data.currentUser
        ? <Main />
        : <Landing />
    })}
  </Connect>
)

export default App;

