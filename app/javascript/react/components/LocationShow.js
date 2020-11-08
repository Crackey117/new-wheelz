import React from "react"

const LocationShow = (props) => {

  return (
    <div className="sweet-blue-background bordered"> 
      <h1 className="centered heading">{props.location.title}</h1>
      <p className="green-background bordered centered">Address: {props.location.street_address}, {props.location.city}, {props.location.state} </p>
      <p className="green-background bordered centered">Size of location: {props.location.size}</p>
      <p className="green-background bordered centered">General Description: {props.location.description}</p>
      <p className="green-background bordered centered">Traffic Level: {props.location.traffic_level}</p>
      <p className="green-background bordered centered">Smoothness of Pavement: {props.location.smoothness}</p>

    </div>
  )
}
export default LocationShow 