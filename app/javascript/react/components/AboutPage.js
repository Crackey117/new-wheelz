import React from "react"

const AboutPage = (props) => {
  return(
    <div className="bordered tan-background third-width">
      <h1 className=" centered bold">About</h1>
      <br></br>
      <h3 className="centered margined">
        The summer of 2020 left everyone trying to find fun new things to do while outside. 
        Longboarding was a great option. After getting tired of going to the same places,
        there came a need for finding new ones. 
      </h3>
      <br></br>
      <h3 className="centered margined">
        Skate Sharez is a site for sharing recommendations of places to skateboard/longboard. 
        Skaters can browse all the locations by state or explore the area around them by looking for 
        markers on a map. 
      </h3>
      <br></br>
      <h3 className="centered margined">
        Users can share locations they've found, supplying not only an address but 
        characteristics of a spot. Additionally, users can comment on a location to describe their experience there.
      </h3>
      <hr></hr>
      <h3 className="centered"> Created by: Chris Rackey</h3>
    </div>
  )
}

export default AboutPage