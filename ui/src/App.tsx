import * as React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import Body, { Width } from 'components/Body'
import Nav from 'containers/Nav'
import Login from 'containers/Login'
import Signup from 'containers/Signup'
import Posts from 'containers/Posts'
import Threads from 'containers/Threads'
import NewThread from 'containers/NewThread'

import User from 'containers/User'
import Forum from 'containers/Forum'
import Stats from 'containers/Stats'
import Onboarding from 'containers/Onboarding'
import DevAds from 'containers/DevAds'


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


            <Route path="/posts/:id" render={({ match }) =>
              <Posts id={Number(match.params.id)} />
            }/>

            <Route path="/users/:username" render={({ match }) =>
              <User username={match.params.username} />
            }/>

            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/stats" component={Stats} />
            <Route exact path="/onboarding" component={Onboarding} />
            <Route exact path="/dev/ads" component={(DevAds as any)} />

          </Switch>
        </Body>

        <footer style={{ fontSize: '11px', padding: '10px 0'}}>
          <Width>(c) 2019 FriendWorld.social</Width>
        </footer>
      </main>
    )
  }
}




export default withRouter(App)

