import React, { Component } from 'react';
import './App.css';
import apiKey from './../assets/google.maps.api';

class App extends Component {

  state = {
    barcelona: {lat: 41.397759, lng: 2.187349},
    baseUrl: 'http://localhost:4000',
  }

  componentDidMount() {
    this.getBoxes();
    this.renderMap();
  }

  getBoxes() {
    fetch(this.state.baseUrl + '/boxes')
      .then(res => res.json())
      .then(boxes => this.setState({ boxes }))
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.barcelona,
      zoom: 14
    });

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

    let fullBox = {
      url: require('./../assets/simcard.png'),
      size: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 16)
    }

    let emptyBox = {
      url: require('./../assets/open-box.png'),
      size: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 16)
    }

    // add boxes to the map
    if (this.state.boxes) {
      this.state.boxes.forEach((box) => {
        if (box.full) {
          const marker = new window.google.maps.Marker({
            position: {lat: box.lat, lng: box.lng},
            map: map,
            icon: fullBox,
          });
          marker.addListener('click', () => {
            console.log(box.name);
          });
        } else {
          const marker = new window.google.maps.Marker({
            position: {lat: box.lat, lng: box.lng},
            map: map,
            icon: emptyBox,
          });
          marker.addListener('click', () => {
            console.log(box.name);
          });
        }
      });
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
        <div className="berta"></div>
        <div id="map"></div>
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
