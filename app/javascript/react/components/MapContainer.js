import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY
const mapStyles = {
  width: '50%',
  height: '50%'
};
export class MapContainer extends Component {
  
  render() {
    return (
      <Map
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC_YGBXqAn8ejgn1DXEe2nSQh4M9lUULyo"
})(MapContainer);