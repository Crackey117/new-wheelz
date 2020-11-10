import React from "react"

const LocationShow = (props) => {
  let traffic_level
  let pavement 
  let hills
  if(props.location.traffic_level){
    traffic_level = <p className="pink-background bordered centered third-width"><strong>Traffic:</strong> {props.location.traffic_level}</p>
  }
  if(props.location.smoothness){
    pavement = <p className="pink-background bordered centered third-width"><strong>Pavement Quality:</strong> {props.location.smoothness}</p>
  }
  if(props.location.hills){
    hills = <p className="pink-background bordered centered third-width"><strong>Terrain:</strong> {props.location.hills}</p>
  }

  return (
      <div className="sweet-blue-background bordered third-width"> 
        <h2 className="centered heading2">{props.location.title}</h2>
        <br></br>
        <p className="pink-background bordered centered third-width"><strong>Address:</strong> {props.location.street_address}, {props.location.city}, {props.location.state} </p>
        <br></br>
        <p className="pink-background bordered centered third-width"><strong>Size:</strong> {props.location.size}</p>
        <br></br>
        <p className="pink-background bordered centered third-width"><strong>Description:</strong> {props.location.description}</p>
        <br></br>
        {traffic_level}
        <br></br>
        {pavement}
        <br></br>
        {hills}
      </div>
  )
}
export default LocationShow 