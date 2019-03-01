import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class SingUp extends Component {
	state = {
		baseUrl: 'http://localhost:4000',
		firstName: '',
		lastName: '',
		password: '',
		country: 'Spain'
	};

	handlenInputChange = ({ target }) => {
		const { value, name } = target;
		this.setState({
			[name]: value
		});
	};

	handleSumbit = (event) => {
		console.log(
      this.state.firstName, 
      this.state.lastName, 
      this.state.password, 
      this.state.country
    );
    event.preventDefault();
	};

	render() {
		return (
			<div className="signup-container">
        <h1>Sign-up!</h1>
				<form onSubmit={this.handleSumbit}>
					<label>
						First name:
						<input
							name="firstName"
							type="text"
							value={this.state.firstName}
							onChange={this.handlenInputChange}
						/>
					</label>
					<br />
					<label>
						Last name:
						<input
							name="lastName"
							type="text"
							value={this.state.lastName}
							onChange={this.handlenInputChange}
						/>
					</label>
					<br />
					<label>
						Password:
						<input
							name="password"
							type="text"
							value={this.state.password}
							onChange={this.handlenInputChange}
						/>
					</label>
					<br />
					<label>
						Counry of origin:
						<select value={this.state.simType} onChange={this.handleSimType}>
							<option value="Spain">Spain</option>
							<option value="Argentina">Argentina</option>
							<option value="Others">Others</option>
						</select>
					</label>
					<br />
					<input name="sumbit" type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default SingUp;
