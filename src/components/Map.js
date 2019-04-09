import React, { Component } from 'react';
import './Map.css';
import BoxPreview from './BoxPreview';

class Map extends Component {

  state = {
    barcelona: {lat: 41.397759, lng: 2.187349},
    baseUrl: 'http://localhost:4000',
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.getBoxes()
        .then(() => this.renderMap());
    } else {
      this.props.history.push("/sign-in");
    }
  }

  getBoxes() {
    return fetch(this.state.baseUrl + '/boxes', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt')},
    })
      .then(res => res.json())
      .then(payload => {
        if (typeof payload === 'string') {
          this.props.history.push("/sign-in");
        } else {
          return payload;
        }
      })
      .then(boxes => this.setState({ boxes }))
  }

  renderMap = () => {
    if (window.initMap) this.initMap();
    else {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&callback=initMap`);
      window.initMap = this.initMap;
    }
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.barcelona,
      zoom: 14,
      disableDefaultUI: true
    });

    // set position of the user via HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        let image = {
          url: require('./../assets/current-location.png'),
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
      this.state.boxes.forEach((box, index) => {
        if (box.full) {
          const marker = new window.google.maps.Marker({
            position: {lat: box.lat, lng: box.lng},
            map: map,
            icon: fullBox,
          });
          marker.addListener('click', () => {
            this.handleBoxClick(index);
          });
        } else {
          const marker = new window.google.maps.Marker({
            position: {lat: box.lat, lng: box.lng},
            map: map,
            icon: emptyBox,
          });
          marker.addListener('click', () => {
            this.handleBoxClick(index);
          });
        }
      });
    }
  }

  handleBoxClick = (index) => {
    this.setState({ 
      selectedBox: this.state.selectedBox === index
        ? undefined
        : index 
    });
  }

  handleLocationError = (browserHasGeolocation) => {
    alert(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }

  renderDetails = () => {
    const details = this.state.boxes[this.state.selectedBox]
    if (this.state.selectedBox !== undefined) {
      return <BoxPreview box={details}/>
    }
  }

  render() {
    return (
      <div className="Map-Maps">
        {this.state.boxes ? this.renderDetails() : 'Loading...'}
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

export default Map;
