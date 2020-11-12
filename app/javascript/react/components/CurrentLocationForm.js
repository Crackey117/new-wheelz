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
        <p className="bordered third-width centered cell small-6">Find yourself on the map to explore!</p>
      </div>
      
      <div className="field">
        <form onSubmit={onClickHandler}>
          <ErrorList errors={errors}
          error={error} />

          <label className="bordered-three green-background centered">
            Street Address
            <input 
              name="street_address"
              id="street_address"
              type="text"
              onChange={inputChangeHandler}
              value={currentLocation.street_address}
              />
          </label>

          <label className="bordered-three green-background centered">
            City  
            <input 
              name="city"
              id="city"
              type="text"
              onChange={inputChangeHandler}
              value={currentLocation.city}
              />
          </label>

          <label className="bordered-three green-background centered">
            State 
            <select id="state" name="state" onChange={inputChangeHandler} value={currentLocation.state}>
              <option value="">-------</option>
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
          <div className="centered"> 
            <input className="bordered-three yellow-background"
              type="submit"
              value="FIND ME!"
            />
          </div>
      </form>
      </div>
    </div>
  )
}

export default CurrentLocationForm