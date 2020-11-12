import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
const LocationsIndex = (props) => {
  const [currentState, setCurrentState] = useState(null)
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
    if(!currentState || currentState == "All" || currentState == location.state){
      return (
      <div className="callout maroon-background bordered cell small-4  box-shadow hover-zoom hover-zoom:hover"> 
        <Link to={`/locations/${location.id}`}>
          <h2 className="matcha-text font-one centered bordered dark-background">{location.title}</h2>
          <p className="matcha-text font-one centered">{location.street_address} - {location.city} - {location.state}</p>  
        </Link>
      </div>)
    }
  })

  const stateChange = (event) => {
    setCurrentState(event.currentTarget.value)
  }

  return (
  <div>
    <div>
      <label className="bordered-four green-background centered bold half-width">
          Sort by State: 
          <select id="state" name="state" onChange={stateChange} value={currentState}>
            <option value="All">All</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>				
      </label>
    </div>
    <div className="grid-x grid-margin-x ">
      {locationListItems} 
    </div> 
  </div>
  )
}

export default LocationsIndex
