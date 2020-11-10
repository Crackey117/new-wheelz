import React from "react"

const LocationShow = (props) => {
  let traffic_level
  let pavement 
  let hills
  if(props.location.traffic_level){
    traffic_level = <p className="green-background bordered centered third-width"><strong>Traffic:</strong> {props.location.traffic_level}</p>
  }
  if(props.location.smoothness){
    pavement = <p className="green-background bordered centered third-width"><strong>Pavement Quality:</strong> {props.location.smoothness}</p>
  }
  if(props.location.hills){
    hills = <p className="green-background bordered centered third-width"><strong>Terrain:</strong> {props.location.hills}</p>
  }

  return (
    <div className="sweet-blue-background bordered third-width"> 
      <h1 className="centered heading">{props.location.title}</h1>
      <p className="green-background bordered centered third-width"><strong>Address:</strong> {props.location.street_address}, {props.location.city}, {props.location.state} </p>
      <p className="green-background bordered centered third-width"><strong>Size:</strong> {props.location.size}</p>
      <p className="green-background bordered centered third-width"><strong>Description:</strong> {props.location.description}</p>
      {traffic_level}
      {pavement}
      {hills}
    </div>
  )
}
export default LocationShow 