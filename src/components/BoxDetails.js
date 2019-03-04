import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BoxDetails.css';

class BoxDetails extends Component {
	state = {
		baseUrl: 'http://localhost:4000',
		minsLeft: 0,
		dataLeft: 0,
		simType: 'nanoSIM',
		expiration: new Date().toISOString(),
		comments: ''
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
			fetch(this.state.baseUrl + '/box/' + this.props.match.params.id, {
				method: 'GET',
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
			})
				.then((res) => res.json())
				.then((box) => {
					this.setState({ box });
				});
		}
	};

	clearBox = () => {
		fetch(this.state.baseUrl + '/box/' + this.props.match.params.id, {
			method: 'PUT',
			headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      }
		});
	};

	fillBox = () => {
		const { dataLeft, minsLeft, expiration, simType, comments } = this.state;
		fetch(this.state.baseUrl + '/box/' + this.props.match.params.id, {
			method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      },
			body: JSON.stringify({
				dataLeft,
				minsLeft,
				expiration,
				simType,
				comments
			})
		});
  };
  
  handleBackButton = () => {
    this.props.history.push("/");
  }

	handleInputChange = (event) => {
		const { target } = event;
		const { value, name } = target;
		this.setState({
			[name]: value
		});
	};

	handleSimTypeChange = ({ target }) => {
		this.setState({
			simType: target.value
		});
	};

	handleExpirationChange = ({ target }) => {
		this.setState({
			expiration: new Date(target.value).toISOString()
		});
	};

	handleCommentsChange = ({ target }) => {
		this.setState({
			comments: target.value
		});
	};

	renderDetails = () => {
		// display different details if the box if full
		if (this.state.box.full) {
			return (
				<div className="details-container">
					<div className="box-name">
						<h1>{this.state.box.name}</h1>
            <p>by Rod</p>
					</div>
					<div className="box-data" />
					<div className="box-action">
						<Link
              className="action-botton"
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
            <p>by Rod</p>
					</div>
					<div className="box-data">
						<form>
							<label>
								How much data -in Mb- left? *required
								<input
									name="dataLeft"
									type="number"
									value={this.state.dataLeft}
									onChange={this.handleInputChange}
								/>
							</label>
							<br />
							<label>
								How many mins left? *required
								<input
									name="minsLeft"
									type="number"
									value={this.state.minsLeft}
									onChange={this.handleInputChange}
								/>
							</label>
							<br />
							<label>
								Which kind of SIMcard is it? *required
								<select value={this.state.simType} onChange={this.handleSimTypeChange}>
									<option value="SIM">Normal SIM</option>
									<option value="microSIM">microSIM</option>
									<option value="nanoSIM">nanoSIM</option>
								</select>
							</label>
							<br />
							<label>
								When is it expiring? *required
								<input name="expiration" type="datetime-local" onChange={this.handleExpirationChange} />
							</label>
							<br />
							<label>
								Any comments?
								<input
									name="comments"
									type="text"
									value={this.state.comments}
									onChange={this.handleCommentsChange}
								/>
							</label>
						</form>
					</div>
          <div className="box-action">
						<Link
              className="action-botton"
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
        <div className="header-container">
          <div className="back-button-container">
            <img className="back-button" src={require('./../assets/back.png')} onClick={this.handleBackButton} alt="back"/>
          </div>
          <div className="option-buttons">
            <img className="directions-button" src={require('./../assets/pedestrian-walking.png')} alt="directions"/>
            <img className="share-button" src={require('./../assets/share.png')} alt="share"/>
          </div>
        </div>
				<div className="image-container" />
				{this.state.box ? this.renderDetails() : 'Loading...'}
			</div>
		);
	}
}

export default BoxDetails;
