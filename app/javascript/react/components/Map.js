import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useGoogleMaps } from "react-hook-google-maps"
 
const Map = (props) => {
  const center = { lat: props.coords.lat, lng: props.coords.lng }
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyC_YGBXqAn8ejgn1DXEe2nSQh4M9lUULyo",
    {
      center: center,
      zoom: 14
    },
  );
  
  if(map){
    map.panTo(center)
  }
  
  if (map) {
    props.locations.forEach(location => {
      let marker = new google.maps.Marker({ position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)}, map, name: location.title })
      let infowindow = new google.maps.InfoWindow() 
      let siteLink = `/locations/${location.id}`
      let contentString = '<div">' + '<b>' + location.title + '</br>' + '<a href="' + siteLink + '">See more!</a>'
      google.maps.event.addListener(marker, "click", function(evt) {  
        infowindow.setContent(contentString);
        infowindow.open(map,this);
      });
    })
  }
  return <div ref={ref} style={{ width: 400, height: 300 }} />;
};
 
export default Map;
