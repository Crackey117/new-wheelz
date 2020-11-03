import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';

const mapStyles = {
  width: '50%',
  height: '50%'
};


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div>
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={
            {
              lat: 42.3554,
              lng: -71.0640
            }
          }
        />
  
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC_YGBXqAn8ejgn1DXEe2nSQh4M9lUULyo"
})(MapContainer);
