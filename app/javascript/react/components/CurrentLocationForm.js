import React, { useState } from 'react'
import _ from 'lodash'
import ErrorList from './ErrorList'

const CurrentLocationForm = (props) => {

  const [currentLocation, setCurrentLocation] = useState({
    street_address: "",
    city: "",
    state: ""
  })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)

  const validforSubmission = () => {
    let submittedErrors = {}
    const requiredFields = ["street_address", "city", "state"]
    requiredFields.forEach(field => {
      if (currentLocation[field].trim() === "") {
        submittedErrors = {
          ...submittedErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submittedErrors)
    return _.isEmpty(submittedErrors)
  }

  const inputChangeHandler = (event) => {
    setCurrentLocation({
      ...currentLocation,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onClickHandler = (event) => {
    event.preventDefault()
    if (validforSubmission()) {
      fetch(`/api/v1/current_location.json`, {
        method: "POST",
        body: JSON.stringify(currentLocation),
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(body => {
          if(body["lat"].toString().length > 0 && body["lng"].toString().length > 0){
            props.resetCoords(body)
            setError("")
          }else{
            setError("Location not found, please try something else!")
          } 
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  return(
    <div>
      <div>
        <p className="callout secondary cell small-6">Find yourself on the map to explore!</p>
      </div>
      
      <div className="field">
        <form onSubmit={onClickHandler}>
          <ErrorList errors={errors}
          error={error} />

          <label>
            Street Address
            <input 
              name="street_address"
              id="street_address"
              type="text"
              onChange={inputChangeHandler}
              value={currentLocation.street_address}
              />
          </label>

          <label>
            City  
            <input 
              name="city"
              id="city"
              type="text"
              onChange={inputChangeHandler}
              value={currentLocation.city}
              />
          </label>

          <label>
            State (two-digit code) 
            <input 
              name="state"
              id="state"
              type="text"
              onChange={inputChangeHandler}
              value={currentLocation.state}
              />
          </label>
          <input
            type="submit"
            value="FIND ME!"
          />
      </form>
      </div>
    </div>
  )
}

export default CurrentLocationForm