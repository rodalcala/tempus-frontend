import React, { Component } from 'react';

class SingOut extends Component {
  componentDidMount() {
    localStorage.removeItem('jwt');
  }
  render() {
    return <h1>You've succesfully signed out!</h1>
  }
}

export default SingOut;