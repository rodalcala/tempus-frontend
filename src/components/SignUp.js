import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class SingUp extends Component {
	state = {
		baseUrl: 'http://localhost:4000',
		email: '',
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
    event.preventDefault();
    fetch(this.state.baseUrl + '/sign-up', {
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        country: this.state.country,
			})
    }).then(res => res.json())
      .then(res => {
        if (res.errors) {
          alert(...res.errors)
        } else {
          this.props.history.push("/");
        }
      });
	};

	render() {
		return (
			<div className="signup-container">
        <h1>Sign-up!</h1>
				<form onSubmit={this.handleSumbit}>
					<label>
						email:
						<input
							name="email"
							type="text"
							value={this.state.email}
							onChange={this.handlenInputChange}
						/>
					</label>
					<br />
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
