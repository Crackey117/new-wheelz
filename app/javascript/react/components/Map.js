import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useGoogleMaps } from "react-hook-google-maps"
import longboard_icon from "/Users/chrisrackey/challenges/new-wheelz/app/assets/images/longboard_icon.png"
const Map = (props) => {
  const center = { lat: props.coords.lat, lng: props.coords.lng }
  const mapStyling = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#c9b2a6" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#dcd2be" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ae9e90" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#93817c" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#a5b076" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#447530" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#e98d58" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [{ color: "#db8555" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#806b63" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8f7d77" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }],
    },
  ]
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyC_YGBXqAn8ejgn1DXEe2nSQh4M9lUULyo",
    {
      center: center,
      zoom: 13,
      styles: mapStyling
    },
  );
  
  if(map){
    map.panTo(center)
  }
  
  if (map) {
    props.locations.forEach(location => {
      let marker = new google.maps.Marker({ position: {lat: parseFloat(location.lat), lng: parseFloat(location.lng)}, map, name: location.title, icon: {url: longboard_icon, scaledSize: new google.maps.Size(30, 30)}})
      let infowindow = new google.maps.InfoWindow() 
      let siteLink = `/locations/${location.id}`
      let contentString = '<div>' + '<b>' + location.title + '</br>' + '<a href="' + siteLink + '">See more!</a>'
      google.maps.event.addListener(marker, "click", function(evt) {  
        infowindow.setContent(contentString);
        infowindow.open(map,this);
      });
    })
  }
  return <div className="map-canvas" ref={ref} style={{ width: 700, height: 500 }} />;
};
 
export default Map;
