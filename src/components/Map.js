import React, { useState, useEffect, useRef } from 'react';
import './Map.css';
import BoxPreview from './BoxPreview';
import Loading from './Loading';

const Map = props => {

  const barnaCoord = {
    lat: 41.397759,
    lng: 2.187349
  };

  const [ boxes, setBoxes ] = useState(undefined);

  const [ selectedBox, setSelectedBox ] = useState(undefined);
  const latestSelectedBox = useRef(selectedBox);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      getBoxes()
    } else {
      props.history.push("/sign-in");
    }
  }, []);

  useEffect(() => {
    if (boxes) renderMap();
  }, [boxes]);

  const getBoxes = () => {
    return fetch(props.baseUrl + '/boxes', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt')},
    })
      .then(res => res.json())
      .then(payload => {
        if (typeof payload === 'string') {
          props.history.push("/sign-in");
        } else {
          return payload;
        }
      })
      .then(boxes => setBoxes(boxes))
  }

  const renderMap = () => {
    if (window.initMap) initMap();
    else {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&callback=initMap`);
      window.initMap = initMap;
    }
  }

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: barnaCoord,
      zoom: 14,
      disableDefaultUI: true
    });

    // set position of the user via HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const image = {
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
        handleLocationError(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }

    const fullBox = {
      url: require('./../assets/simcard.png'),
      size: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 16)
    }

    const emptyBox = {
      url: require('./../assets/open-box.png'),
      size: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 16)
    }

    // add boxes to the map
    if (boxes) {
      boxes.forEach((box, index) => {
        if (box.full) {
          const marker = new window.google.maps.Marker({
            position: {lat: box.lat, lng: box.lng},
            map: map,
            icon: fullBox,
          });
          marker.addListener('click', () => {
            handleBoxClick(index);
          });
        } else {
          const marker = new window.google.maps.Marker({
            position: {lat: box.lat, lng: box.lng},
            map: map,
            icon: emptyBox,
          });
          marker.addListener('click', () => {
            handleBoxClick(index);
          });
        }
      });
    }
  }

  const handleBoxClick = (index) => {
    setSelectedBox( latestSelectedBox.current === index ? undefined : index );
    latestSelectedBox.current = latestSelectedBox.current === index ? undefined : index;
  }

  const handleLocationError = (browserHasGeolocation) => {
    alert(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }

  const renderDetails = () => {
    if (selectedBox !== undefined) {
      return <BoxPreview box={boxes[selectedBox]}/>
    }
  }

  return (
    <div className="Map-Maps">
      {boxes ? renderDetails() : <Loading />}
      <div id="map"></div>
    </div>
  )
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
