import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Map from './Map';
import Error from './Error';
import LogIn from './LogIn';
import BoxDetails from './BoxDetails';
import Feedback from './Feedback';
import SingUp from './SignUp';

class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Map} />
					<Route path="/log-in" component={LogIn} />
					<Route path="/box/:id" component={BoxDetails} />
					<Route path="/feedback" component={Feedback} />
          <Route path="/sign-up" component={SingUp}/>
					<Route component={Error} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
