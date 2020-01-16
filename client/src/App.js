import React from "react";
import { StaticRouter, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Alert from "./components/Alert";
import {/* getCookie, */ authenticateUser, getCpu } from "./utils/handleSessions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: false,
      ssr: props.ssr ? true : false
    }
  }


  authenticate = () => authenticateUser()
    .then(auth => {
      console.log("auth.status");
      console.log(auth.status);
      this.setState({ authenticated: auth.status === 200 ? true : false, loading: false })
    })
    .catch(err => {
      if(process.env.NODE_ENV !== 'production')
      console.log(err)
    })

  getCpu = () => getCpu()
    .then(cpu => this.setState({ cpu: cpu }))
    .catch(err => {
      if(process.env.NODE_ENV !== 'production')
      console.log(err)
    })

  removeInfo = () => this.setState({ cpu: null })

  componentWillMount() {
      this.authenticate();
      this.getCpu();
  }

  render() {
    const RouterComponent = this.state.ssr ? StaticRouter : Router;
    return (
      <RouterComponent>
        <div>
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                <Landing {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />}
            />
            <Route component={NoMatch} />
          </Switch>
         
        </div>
      </RouterComponent>

    )
  }
}

export default App;
