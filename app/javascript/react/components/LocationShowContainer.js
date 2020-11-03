import React, { useState, useEffect } from "react"
import LocationShow from "./LocationShow"


const LocationShowContainer = (props) => {
  const [location, setLocation] = useState({})
  const id = props.match.params.id 

  useEffect(() => {
    fetch(`/api/v1/locations/${id}`, {
      credentials: "same-origin"
    })
      .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
      })
      .then((responseBody) => {
        setLocation(responseBody)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }, [])
  
  
  
  return (
    <div>
      <LocationShow
        location={location}
      />
     
    </div>
  )
}

export default LocationShowContainer