import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ContextProvider } from './Context';

import Map from './components/Map';
import Error from './components/Error';
import SignIn from './components/SignIn';
import BoxDetails from './components/BoxDetails';
import Feedback from './components/Feedback';
import SingUp from './components/SignUp';
import SingOut from './components/SignOut';
import ListView from './components/ListView';

const Router = () => {

	return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Map} />
          <Route path="/listview" component={ListView} />
          <Route path="/box/:id" component={BoxDetails} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/sign-up" component={SingUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-out" component={SingOut} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );

}

export default Router;
