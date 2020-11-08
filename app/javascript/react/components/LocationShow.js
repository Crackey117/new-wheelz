import React from "react"

const LocationShow = (props) => {

  return (
    <div className="sweet-blue-background bordered third-width"> 
      <h1 className="centered heading">{props.location.title}</h1>
      <p className="green-background bordered centered third-width">Address: {props.location.street_address}, {props.location.city}, {props.location.state} </p>
      <p className="green-background bordered centered third-width">Size: {props.location.size}</p>
      <p className="green-background bordered centered third-width">Description: {props.location.description}</p>
      <p className="green-background bordered centered third-width">Traffic: {props.location.traffic_level}</p>
      <p className="green-background bordered centered third-width">Pavement Quality: {props.location.smoothness}</p>

    </div>
  )
}
export default LocationShow 