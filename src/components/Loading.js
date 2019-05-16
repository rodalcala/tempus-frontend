import React from 'react';
import './Loading.css';

const Loading = props => {
  return (
    <div className="Loading-background">
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Loading;
