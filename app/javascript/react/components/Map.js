import React from 'react';

import { useGoogleMaps } from "react-hook-google-maps"
 
const Map = (props) => {

  const { ref, map, google } = useGoogleMaps(
    "AIzaSyC_YGBXqAn8ejgn1DXEe2nSQh4M9lUULyo",
    {
      center: { lat: 42.3554, lng: -71.0640 },
      zoom: 14,
    },
  );
  if (map) {
    props.locations.forEach(location => {
      let marker = new google.maps.Marker({ position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)}, map, name: location.title })
      let infowindow = new google.maps.InfoWindow() 
      google.maps.event.addListener(marker, "click", function(evt) {  
        infowindow.setContent(location.title);
        infowindow.open(map,this);
      });
    })
  }
  return <div ref={ref} style={{ width: 400, height: 300 }} />;
};
 
export default Map;
