import React from 'react';
import './App.css';

const BoxDetails = ({ box }) => (
  <div className="box-details">
    <h1>{box.name}</h1>
    <h3 className="data">{box.dataLeft}</h3>
    <h3 className="mins">{box.minsLeft}</h3>
    <h4>{box.expiration}</h4>
  </div>
)

export default BoxDetails;