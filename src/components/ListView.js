import React, { Component } from 'react';
import './ListView.css';
import { Link } from  'react-router-dom';

class ListView extends Component {

  state = {
    baseUrl: 'http://localhost:4000',
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.getBoxes()
    } else {
      this.props.history.push("/sign-in");
    }
  }

  getBoxes() {
    return fetch(this.state.baseUrl + '/boxes', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt')},
    })
      .then(res => res.json())
      .then(payload => {
        if (typeof payload === 'string') {
          this.props.history.push("/sign-in");
        } else {
          return payload;
        }
      })
      .then(boxes => this.setState({ boxes }))
  }

  renderList = () => {
    return this.state.boxes.map(box => (
      <Link to={{
        pathname: `/box/${box._id}`,
        state: {
          box: box
        }
      }} className="ListView-box-container">
        {box.name}
      </Link>
    ))
  }

  render() {
    return (
      <div className="ListView-list-container">
        <div className="ListView-header-container" />
        <div className="ListView-boxes-container">
          {this.state.boxes ? this.renderList() : 'Loading...'}
        </div>
      </div>
    );
  }
}

export default ListView;
