import React, { Component } from 'react';

class BoxDetails extends Component {
  render() {
    return (
      <div className="box-container">
        <div className="header-container"></div>
        <div className="image-container"></div>
        <div className="details-container"></div>
        {console.log(this.props.match.params)}
        {console.log(this.props.location.state.box)}
      </div>
    )
  }
}

export default BoxDetails;