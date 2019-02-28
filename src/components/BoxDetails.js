import React from 'react';
import './App.css';

const BoxDetails = ({ box }) => (
  <div className="details-conteiner">
    <div className="sim-details">
      <h1>{box.name}</h1>
      <h3 className="data">{box.dataLeft + ' Mb of data available'}</h3>
      <h3 className="mins">{box.minsLeft + ' free mins available'}</h3>
      <h4>{'Expiring on the ' + (new Date(box.expiration)).getDate() + ' of ' + (new Date(box.expiration)).getMonth()}</h4>
    </div>
    <div className="sim-type">
      <img className="sim-image" src={require('./../assets/sizes-original.png')} alt="SIM sizes"/>
    </div>
  </div>
)

export default BoxDetails;