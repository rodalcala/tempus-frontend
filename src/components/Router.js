import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Map from './Map';
import Error from './Error';
import SignIn from './SignIn';
import BoxDetails from './BoxDetails';
import Feedback from './Feedback';
import SingUp from './SignUp';
import SingOut from './SignOut';

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
