import React from "react"

const LocationShow = (props) => {

  return (
    <div> 
      <h1>{props.location.title}</h1>
      <p>Address: {props.location.street_address}, {props.location.city}, {props.location.state} </p>
      <p>Size of location: {props.location.size}</p>
      <p>General Description: {props.location.description}</p>
      <p>Traffic Level: {props.location.traffic_level}</p>
      <p>Smoothness of Pavement: {props.location.smoothness}</p>

    </div>
  )
}
export default LocationShow 