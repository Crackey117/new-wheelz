import React, { useEffect, useState } from "react"
import LocationIndex from "./LocationIndex"
const LocationIndexContainer = (props) => {
  const [coords, setCoords] = useState({ lat: 42.3554, lng: -71.0640 })
  const [locations, setLocations] = useState([])

  const resetCoords = (coordsObj) => {
    setCoords(coordsObj)
  }
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
    <div className="cell grid-container page">
      <h4 className="font-one centered dark-tan-background bordered half-width bold">Shared Spots</h4>
      <div className="margined"> 
        <LocationIndex /> 
      </div>
    </div> 
  )
}
export default LocationIndexContainer