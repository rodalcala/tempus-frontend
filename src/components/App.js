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
    // let infoWindow = new window.google.maps.InfoWindow();

    // set position of the user via HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        let image = {
          url: require('./../assets/gps.png'),
          size: new window.google.maps.Size(32, 32),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(16, 16)
        }

        new window.google.maps.Marker({
          position: pos,
          map: map,
          icon: image,
        })
      }, () => {
        this.handleLocationError(true);
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false);
    }
  }

  handleLocationError = (browserHasGeolocation) => {
    console.log(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
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
