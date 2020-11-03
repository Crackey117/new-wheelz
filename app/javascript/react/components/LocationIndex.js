import React, { useEffect, useState } from "react"

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
    <div className="callout secondary cell small-4"> 
      <h2 >{location.title}</h2>
      <p>{location.street_address} - {location.city} - {location.state}</p>  
    </div>)
  })

  return (
  <div>
    <div className="grid-x grid-margin-x">
      {locationListItems} 
    </div> 
  </div>
  )
}

export default LocationsIndex
