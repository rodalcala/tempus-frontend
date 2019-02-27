import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    barcelona: {lat: 41.390205, lng: 2.154007}
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyD8CW2x7KfEWmzWTge0_kfpYI6QsBe90bU&callback=initMap');
    window.initMap = this.initMap;
  }

  initMap = () => {
    new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.barcelona,
      zoom: 12
    })
  }

  render() {
    return (
      <div className="App">
        <div id="map"></div>
        <h1>tempus</h1>
      </div>
    );
  }
}

// Needed to load the script at the very top of our scripts
function loadScript(url) {
  const index  = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
