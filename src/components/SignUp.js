import React, { Component } from 'react';
import './SignUp.css'

class SingUp extends Component {
	state = {
		baseUrl: 'http://localhost:4000',
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		country: 'Spain',
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
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('user_firstName', res.firstName);
          localStorage.setItem('user_lastNamee', res.lastName);
          localStorage.setItem('user_email', res.email);
          localStorage.setItem('user_country', res.country);
          this.props.history.push("/");
        }
      });
  };
  
  handleCountry = ({ target }) => {
		this.setState({
			country: target.value
		});
	};

	render() {
		return (
      <div className="sign-up-container">
        <div className="header-container">
          <div className="title-container">
            <p>Sign-up!</p>
          </div>
        </div>
        <div className="signup-container">
          <div className="form-container">
            <form>
              <label>
                <p>email:</p>
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handlenInputChange}
                  required
                />
              </label>
              <br />
              <label>
                <p>First name:</p>
                <input
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handlenInputChange}
                  required
                />
              </label>
              <br />
              <label>
                <p>Last name:</p>
                <input
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handlenInputChange}
                  required
                />
              </label>
              <br />
              <label>
                <p>Password:</p>
                <input
                  name="password"
                  type="text"
                  value={this.state.password}
                  onChange={this.handlenInputChange}
                  required
                />
              </label>
              <br />
              <label>
                <p>Counry of origin:</p>
                <select value={this.state.simType} onChange={this.handleCountry}>
                  <option value="Spain">Spain 🇪🇸</option>
                  <option value="Argentina">Argentina 🇦🇷</option>
                  <option value="Others">Others</option>
                </select>
              </label>
            </form>
          </div>
          <div className="action-container">
           <p onClick={this.handleSumbit} className="action-botton">Submit</p>
          </div>
        </div>
			</div>
		);
	}
}

export default SingUp;
