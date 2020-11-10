import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import ErrorList from './ErrorList'

const LocationsForm = (props) => {

  const [submittedLocation, setSubmittedLocation] = useState({
    title: "",
    street_address: "",
    city: "",
    state: "",
    size: "",
    description: "",
    traffic_level: "",
    smoothness: "",
    hills: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState({
    redirect: false,
    id: ""
  })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)

  const validforSubmission = () => {
    let submittedErrors = {}
    const requiredFields = ["title", "street_address", "city", "state", "description", "size"]
    requiredFields.forEach(field => {
      if (submittedLocation[field].trim() === "") {
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
    setSubmittedLocation({
      ...submittedLocation,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onClickHandler = (event) => {
    event.preventDefault()
    if (validforSubmission()) {
      fetch(`/api/v1/locations.json`, {
        method: "POST",
        body: JSON.stringify(submittedLocation),
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.errors) {
          const requiredFields = ["title", "street_address", "city", "state", "description", "size"]
          requiredFields.forEach(field => { 
            if (body.errors[field] !== undefined) {
              setErrors({
                ...errors,
                [field]: body.errors[field][0]
              })
            }
            else if(body.errors["lat"] !== undefined || body.errors["lng"] !== undefined){
              setError("Invalid address, please double check that it was entered correctly or try a different address.")
            }
          })
        }else if (body.error) {
          setError(body.error)
        }else{
          setShouldRedirect({
            redirect: true,
            id: body.id
          })
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  if (shouldRedirect.redirect) {
    return <Redirect to={`/locations/${shouldRedirect.id}`}/>
  }

  return(
    <div>
      <div>
        <p className="third-width callout yellow-background bordered centered cell small-6 bold">To add a new location, please enter a title, description, size, and address</p>
      </div>
      <ErrorList errors={errors}
          error={error} />
      <div className="field third-width">
        <form className="sweet-blue-background bordered" onSubmit={onClickHandler}>
          

          <label className="bordered green-background centered">
            Title
            <input 
              name="title"
              id="title"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.title}
              />
          </label>

          <label className="bordered green-background centered">
            Description
            <input 
              name="description"
              id="description"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.description}
              />
          </label>

          <label className="bordered green-background centered">
            Street Address
            <input 
              name="street_address"
              id="street_address"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.street_address}
              />
          </label>

          <label className="bordered green-background centered">
            City  
            <input 
              name="city"
              id="city"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.city}
              />
          </label>

          <label className="bordered green-background centered">
            State 
            <select id="state" name="state" onChange={inputChangeHandler} value={submittedLocation.state}>
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

          <label className="bordered green-background centered">
            Size 
            <select name="size" id="size" onChange={inputChangeHandler} value={submittedLocation.size}>
              <option value="">-------</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>

          <label className="bordered green-background centered">
            Traffic Level 
            <select name="traffic_level" id="traffic_level" onChange={inputChangeHandler} value={submittedLocation.traffic_level}>
              <option value="">-------</option>
              <option value="Very Low">Very Low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </label>
          <label className="bordered green-background centered">
            Pavement Quality (1 to 5 with 5 being the smoothest) 
            <select name="smoothness" id="smoothness" onChange={inputChangeHandler} value={submittedLocation.smoothness}>
              <option value="">-------</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label className="bordered green-background centered">
            Terrain 
            <select name="hills" id="hills" onChange={inputChangeHandler} value={submittedLocation.hills}>
              <option value="">-------</option>
              <option value="Flat">Flat</option>
              <option value="Slight Hills">Slight Hills</option>
              <option value="Mixed">Mixed</option>
              <option value="Steep Hills">Steep Hills</option>
            </select>
          </label>
          <div className="centered">
            <input className="bordered yellow-background"
              type="submit"
              value="Add New Location"
            />
          </div>
      </form>
      </div>
    </div>
  )
}

export default LocationsForm