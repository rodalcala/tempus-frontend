import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Map from './Map';
import Error from './Error';
import LogIn from './LogIn';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Map }/>
          <Route component={ Error } />
          <Route path="/log-in" component={ LogIn }/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router;