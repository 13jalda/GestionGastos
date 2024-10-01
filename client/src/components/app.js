import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import moment from 'moment';

import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import ContactUs from './pages/contact';
import Create from './pages/create';
import NoMatch from './pages/no-match';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }
  
  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }


  render() {
    return (
      <div className="container">
        <Router>
          <div>
          
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />

              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />

              <Route path="/about" component={About} />
              <Route path="/contact" component={ContactUs} />

              
              {this.state.loggedInStatus === "LOGGED_IN"
                ? this.authorizedPages()
                : null}

              <Route path="/create" component={Create} />
              
              <Route path="/*" component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
