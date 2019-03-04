import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Map from './components/Map';
import Error from './components/Error';
import SignIn from './components/SignIn';
import BoxDetails from './components/BoxDetails';
import Feedback from './components/Feedback';
import SingUp from './components/SignUp';
import SingOut from './components/SignOut';

class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Map} />
					<Route path="/sign-in" component={SignIn} />
					<Route path="/box/:id" component={BoxDetails} />
					<Route path="/feedback" component={Feedback} />
          <Route path="/sign-up" component={SingUp}/>
          <Route path="/sign-out" component={SingOut}/>
					<Route component={Error} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
