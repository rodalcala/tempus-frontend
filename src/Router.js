import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Map from './components/Map';
import Error from './components/Error';
import SignIn from './components/SignIn';
import BoxDetails from './components/BoxDetails';
import Feedback from './components/Feedback';
import SingUp from './components/SignUp';
import SingOut from './components/SignOut';
import ListView from './components/ListView';

const Router = () => {

  const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

	return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Map {...props} baseUrl={baseUrl} />} />
        <Route path="/listview" component={ListView}/>
        <Route path="/box/:id" component={BoxDetails} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/sign-up" component={SingUp}/>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-out" component={SingOut}/>
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
