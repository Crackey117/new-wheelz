import React, { useEffect, useState } from "react"
import MapContainer from "./MapContainer"
import LocationIndex from "./LocationIndex"
const LocationIndexContainer = (props) => {
  return(
    <div>
      <h1>Welcome to Skate Sharez!</h1>
      <h3>These are the spots other users have located near you:</h3>
      <LocationIndex /> 
      <MapContainer />
    </div> 
  )
}
export default LocationIndexContainer