import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
const LocationsIndex = (props) => {
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

  let locationListItems = locations.map((location) => {
 
    return (
    <div className="callout green-background bordered cell small-4 black-font"> 
      <Link to={`/locations/${location.id}`}>
        <h2 className="black-font">{location.title}</h2>
        <p className="black-font">{location.street_address} - {location.city} - {location.state}</p>  
      </Link>
    </div>)
  })

  return (
  <div>
    <div className="grid-x grid-margin-x ">
      {locationListItems} 
    </div> 
  </div>
  )
}

export default LocationsIndex
