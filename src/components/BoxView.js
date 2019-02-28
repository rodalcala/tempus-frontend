import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class BoxView extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.match.params)}
      </div>
    )
  }
}

export default BoxView;