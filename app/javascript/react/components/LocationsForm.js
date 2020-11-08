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
    smoothness: ""
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
            State (two-digit code) 
            <input 
              name="state"
              id="state"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.state}
              />
          </label>

          <label className="bordered green-background centered">
            Size 
            <input 
              name="size"
              id="size"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.size}
              />
          </label>

          <label className="bordered green-background centered">
            Traffic Level 
            <input 
              name="traffic_level"
              id="traffic_level"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.traffic_level}
              />
          </label>
          <label className="bordered green-background centered">
            Smoothness (1 to 5 with 5 being the smoothest) 
            <input 
              name="smoothness"
              id="smoothness"
              type="text"
              onChange={inputChangeHandler}
              value={submittedLocation.smoothness}
              />
          </label>
          <div className="centered">
            <input className="bordered"
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