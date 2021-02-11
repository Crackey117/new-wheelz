import React, { useEffect, useState } from "react"
import LocationIndex from "./LocationIndex"
const LocationIndexContainer = (props) => {
  
  return(
    <div className="cell grid-container page">
      <h4 className="font-one centered dark-tan-background bordered half-width bold">Shared Spots</h4>
      <div className="margined"> 
        <LocationIndex /> 
      </div>
    </div> 
  )
}
export default LocationIndexContainer