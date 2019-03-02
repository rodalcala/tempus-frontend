import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  state = {
    baseUrl: 'http://localhost:4000',
    email: '',
    password: '',
  }

  handlenInputChange = ({ target }) => {
		const { value, name } = target;
		this.setState({
			[name]: value
		});
	};

  handleSumbit = (event) => {
    event.preventDefault();
    const payload = btoa(this.state.email + ':' + this.state.password);
    fetch(this.state.baseUrl + '/sign-in', {
			method: 'GET',
      headers: { 'Authorization': 'Basic ' + payload},
    }).then(res => res.text())
      .then(token => {
        localStorage.setItem('jwt', token);
      });
  }

  render() {
    return (
      <div>
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
						password:
						<input
							name="password"
							type="text"
							value={this.state.password}
							onChange={this.handlenInputChange}
						/>
					</label>
          <br />
          <input name="sumbit" type="submit" value="Submit" />
        </form>
        <h2>Don't have an account? <Link to="/sign-up">Sing up for free!</Link></h2>
      </div>
    )
  }
}
// () => (
//   <div>
//     <h1>Log-in page under construction</h1>
//     <h2>Don't have an account? <Link to="/sign-up">Sing up for free!</Link></h2>
//   </div>
// )

export default SignIn;