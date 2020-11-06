import React, { useEffect, useState } from "react"
import Map from "./Map"
import LocationIndex from "./LocationIndex"
import { Link } from 'react-router-dom'
const LocationIndexContainer = (props) => {
  const [locations, setLocations] = useState([])
  useEffect(() => {
    fetch("/api/v1/locations.json")
    .then (response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setLocations(body) 
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])
  return(
    <div>
      <h1>Welcome to Skate Sharez!</h1>
      <h3>These are the spots other users have located near you:</h3>
      <LocationIndex /> 
      <Link className="big" to={`/locations/new`}>Add a New Spot </Link>
      <Map locations={locations} />
    </div> 
  )
}
export default LocationIndexContainer