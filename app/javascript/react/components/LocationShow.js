import React from "react"

const LocationShow = (props) => {
  let traffic_level
  let pavement 
  let hills
  if(props.location.traffic_level){
    traffic_level = <div className="centered"> <lable className="centered"><strong>Traffic:</strong> <p className="pink-background bordered centered third-width">{props.location.traffic_level}</p></lable></div>
  }
  if(props.location.smoothness){
    pavement = <div className="centered"> <lable className="centered"><strong>Pavement Quality:</strong> <p className="pink-background bordered centered third-width">{props.location.smoothness}</p></lable></div>
  }
  if(props.location.hills){
    hills = <div className="centered"> <lable className="centered"><strong>Terrain:</strong><p className="pink-background bordered centered third-width">{props.location.hills}</p></lable></div>
  }

  return (
      <div className="sweet-blue-background bordered third-width"> 
        <h2 className="centered heading2">{props.location.title}</h2>
        <br></br>
        <div className="centered">
          <lable className="centered"><strong>Address:</strong>
            <p className="pink-background third-width bordered">{props.location.street_address}, {props.location.city}, {props.location.state} </p>
          </lable>
        </div>
        <br></br>
        <div className="centered">
          <lable className="centered"><strong>Size:</strong>
            <p className="pink-background bordered centered third-width">{props.location.size}</p>
          </lable>
        </div>
        <br></br>
        <div className="centered">
          <lable className="centered"><strong>Description:</strong>
            <p className="pink-background bordered centered third-width">{props.location.description}</p>
          </lable>
        </div>
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