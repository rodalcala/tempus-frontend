import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BoxDetails.css';

class BoxDetails extends Component {
	state = {
		baseUrl: 'http://localhost:4000'
	};

	componentDidMount() {
		this.handleBoxData();
	}

	handleBoxData = () => {
		// if the boxData comes from the on the props, reassign it to the state
		if (this.props.location.state) {
			this.setState({ box: this.props.location.state.box });
		} else {
			// if not, fetch it and assign it to the state
			fetch(this.state.baseUrl + '/box/' + this.props.match.params.id).then((res) => res.json()).then((box) => {
				this.setState({ box });
			});
		}
	};

	clearBox = () => {
		fetch(this.state.baseUrl + '/box/' + this.props.match.params.id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' }
		});
	};

	fillBox = () => {
		fetch(this.state.baseUrl + '/box/' + this.props.match.params.id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// mock data
				dataLeft: 30,
				minsLeft: 512,
				expiration: '2019-22-05T23:00:00.000Z',
				simType: 'SIM'
			})
		});
	};

	renderDetails = () => {
		// display different details if the box if full
		if (this.state.box.full) {
			return (
				<div className="details-container">
					<div className="box-name">
						<h1>{this.state.box.name}</h1>
					</div>
					<div className="box-data" />
					<div className="box-action">
						<Link
							onClick={this.clearBox}
							to={{
								pathname: '/feedback',
								state: {
									box: this.state.box
								}
							}}
						>
							Got it!
						</Link>
					</div>
				</div>
			);
		} else {
			// or if it's empty
			return (
				<div className="details-container">
					<div className="box-name">
						<h1>{this.state.box.name}</h1>
					</div>
					<div className="box-data" />
					<div className="box-action">
						<Link
							onClick={this.fillBox}
							to={{
								pathname: '/feedback',
								state: {
									box: this.state.box
								}
							}}
						>
							Left it!
						</Link>
					</div>
				</div>
			);
		}
	};

	render() {
		return (
			<div className="box-container">
				<div className="header-container">{this.props.match.params.id}</div>
				<div className="image-container" />
				{this.state.box ? this.renderDetails() : 'Loading...'}
			</div>
		);
	}
}

export default BoxDetails;
