import * as React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import { Connect, query } from 'urql'
import match, { DataProps } from './utils/match'

import Body from './containers/Body/ix';
import Nav from './containers/Nav/ix';
import Home from './containers/Home/ix';


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

// const Landing: React.SFC<{}> = () => (
//   <div>
//     Welcome to FriendWorld: The place to meet friends.
//   </div>
// )
const Landing = Main


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
    {match({
      loading: () => 'loading...',
      error: ({ error }) => JSON.stringify(error),
      data: ({ data }) => data && data.currentUser
        ? <Main />
        : <Landing />
    })}
  </Connect>
)

export default App;

