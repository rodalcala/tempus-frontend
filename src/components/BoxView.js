import React, { Component } from 'react';

class BoxView extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.match.params)}
        {console.log(this.props.location.state.box)}
      </div>
    )
  }
}

export default BoxView;