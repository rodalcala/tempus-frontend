import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    barcelona: {lat: 41.390205, lng: 2.154007},
    baseUrl: 'http://localhost:4000',
  }

  componentDidMount() {
    this.renderMap();
    this.getBoxes();
  }

  getBoxes() {
    fetch(this.state.baseUrl + '/boxes')
      .then(res => res.json())
      .then(boxes => this.setState({ boxes }))
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyD8CW2x7KfEWmzWTge0_kfpYI6QsBe90bU&callback=initMap');
    window.initMap = this.initMap;
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.barcelona,
      zoom: 12
    });
    let infoWindow = new window.google.maps.InfoWindow();

    // HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, () => {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
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

// Needed to load the Google Maps script at the very top of our scripts
function loadScript(url) {
  const index  = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
