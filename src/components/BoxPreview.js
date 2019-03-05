import React, { Component } from 'react';
import { Link } from  'react-router-dom';
import './Map.css';

class BoxPreview extends Component {
  handleSimType = () => {
    const { simType } = this.props.box;
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

  renderExpiration = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const expiration = new Date(this.props.box.expiration);
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
    if (this.props.box.expiration) {
      return (
        <div>
          <h3 className="Map-data">{this.props.box.dataLeft + ' Mb of data available'}</h3>
          <h3 className="Map-mins">{this.props.box.minsLeft + ' free mins available'}</h3>
          <h4>{'Expiring on the ' + expiration.getDate() + sufix + ' of ' + months[expiration.getMonth()]}</h4>
        </div>
      )
    } else {
      return <h2>Empty box ready to<br />be filled up with 💞<br /><p>(and SIM cards)</p></h2> // eslint-disable-line
    }
  }

  render() {
    return (
      <Link to={{
        pathname: `/box/${this.props.box._id}`,
        state: {
          box: this.props.box
        }
      }} className="Map-details-conteiner">
        <div className="Map-sim-details">
          <h1>{this.props.box.name}</h1>
          {this.renderExpiration()}
        </div>
        <div className="Map-sim-type">
          {this.handleSimType()}
        </div>
      </Link>
    )
  }
}

export default BoxPreview;