import * as React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
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
import Dashboard from './containers/Dashboard'
import User from './containers/User'
import Messages from './containers/Messages'
import Forum from './containers/Forum'



class App extends React.Component<RouteComponentProps> {
  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <main className="App">
        <Route path="/" component={Nav} />

        <Body>
          <Switch>
            <Route exact path="/" component={Forum} />
            <Route exact path="/threads/new" component={NewThread} />

            <Route exact path="/threads/:id" render={({ match }) =>
              <Threads id={Number(match.params.id)} />
            }/>

            <Route path="/messages/:username" render={({ match }) =>
              <Messages username={match.params.username} />
            }/>

            <Route path="/messages" render={({ match }) =>
              <Messages />
            }/>

            {/* TODOs: */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />

            <Route path="/users/:username" render={({ match }) =>
              <User username={match.params.username} />
            }/>

            <Route path="/posts/:id" render={({ match }) =>
              <Posts id={Number(match.params.id)} />
            }/>
          </Switch>
        </Body>
      </main>
    )
  }
}




export default withRouter(App)

