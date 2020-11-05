import React, { useEffect, useState } from "react"
import MapContainer from "./MapContainer"
import LocationIndex from "./LocationIndex"
import { Link } from 'react-router-dom'
const LocationIndexContainer = (props) => {
  return(
    <div>
      <h1>Welcome to Skate Sharez!</h1>
      <h3>These are the spots other users have located near you:</h3>
      <LocationIndex /> 
      <Link className="big" to={`/locations/new`}>Add a New Spot </Link>
      <MapContainer />
    </div> 
  )
}
export default LocationIndexContainer