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

  renderSimType = (box) => {
    const { simType } = box;
    if (simType === 'SIM') {
      return <img className="Map-sim-image" src={require('./../assets/sizes-SIM.png')} alt="SIM size"/>
    } else if (simType === 'microSIM') {
      return <img className="Map-sim-image" src={require('./../assets/sizes-microSIM.png')} alt="microSIM size"/>
    } else if (simType === 'nanoSIM') {
      return <img className="Map-sim-image" src={require('./../assets/sizes-nanoSIM.png')} alt="nanoSIM size"/>
    } else {
      return <img className="Map-add-image" src={require('./../assets/plus.png')} alt="add"/>
    }
  }

  renderExpiration = (box) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const expiration = new Date(box.expiration);
    const lastNum = (expiration.getDate()).toString().split('').pop();
    let sufix;
    if (lastNum === '1') {
      sufix = 'st';
    } else if (lastNum === '2') {
      sufix = 'nd';
    } else if (lastNum === '3') {
      sufix = 'rd';
    } else {
      sufix = 'th';
    }
    if (box.expiration) {
      return (
        <div>
          <h3 className="ListView-data">{box.dataLeft + ' Mb of data available'}</h3>
          <h3 className="ListView-mins">{box.minsLeft + ' free mins available'}</h3>
          <h4>{'Expiring on the ' + expiration.getDate() + sufix + ' of ' + months[expiration.getMonth()]}</h4>
        </div>
      )
    } else {
      return <h2>Empty box ready to<br />be filled up with 💞<br /><p>(and SIM cards)</p></h2> // eslint-disable-line
    }
  }

  renderList = () => {
    return this.state.boxes.map(box => (
      <Link to={{
        pathname: `/box/${box._id}`,
        state: {
          box: box
        }
      }} className="ListView-box-container">
        <div className="ListView-sim-details">
          <h1>{box.name}</h1>
          <div>{this.renderExpiration(box)}</div>
        </div>
        <div className="ListView-sim-type">
          {this.renderSimType(box)}
        </div>
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
        <div>
        </div>
      </div>
    );
  }
}

export default ListView;
