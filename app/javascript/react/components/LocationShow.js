import React from "react"

const LocationShow = (props) => {
  let traffic_level
  let pavement 
  if(props.location.traffic_level){
    traffic_level = <p className="green-background bordered centered third-width">Traffic: {props.location.traffic_level}</p>
  }
  if(props.location.smoothness){
    pavement = <p className="green-background bordered centered third-width">Pavement Quality: {props.location.smoothness}</p>
  }
  return (
    <div className="sweet-blue-background bordered third-width"> 
      <h1 className="centered heading">{props.location.title}</h1>
      <p className="green-background bordered centered third-width">Address: {props.location.street_address}, {props.location.city}, {props.location.state} </p>
      <p className="green-background bordered centered third-width">Size: {props.location.size}</p>
      <p className="green-background bordered centered third-width">Description: {props.location.description}</p>
      {traffic_level}
      {pavement}

    </div>
  )
}
export default LocationShow 