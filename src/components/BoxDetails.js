import React, { Component } from 'react';
import './App.css';

class BoxDetails extends Component {
  handleSimType = () => {
    const { simType } = this.props.box;
    if (simType === 'SIM') {
      return <img className="sim-image" src={require('./../assets/sizes-SIM.png')} alt="SIM size"/>
    } else if (simType === 'microSIM') {
      return <img className="sim-image" src={require('./../assets/sizes-microSIM.png')} alt="microSIM size"/>
    } else if (simType === 'nanoSIM') {
      return <img className="sim-image" src={require('./../assets/sizes-nanoSIM.png')} alt="nanoSIM size"/>
    }
  }

  render() {
    return (
      <div className="details-conteiner">
        <div className="sim-details">
          <h1>{this.props.box.name}</h1>
          <h3 className="data">{this.props.box.dataLeft + ' Mb of data available'}</h3>
          <h3 className="mins">{this.props.box.minsLeft + ' free mins available'}</h3>
          <h4>{'Expiring on the ' + (new Date(this.props.box.expiration)).getDate() + ' of ' + (new Date(this.props.box.expiration)).getMonth()}</h4>
        </div>
        <div className="sim-type">
          {this.handleSimType()}
        </div>
      </div>
    )
  }
}

export default BoxDetails;