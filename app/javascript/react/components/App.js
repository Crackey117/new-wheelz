import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LocationIndexContainer from "./LocationIndexContainer"
import LocationShowContainer from "./LocationShowContainer"
export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LocationIndexContainer} />
        <Route exact path="/locations" component={LocationIndexContainer} />
        <Route exact path="/locations/:id" component={LocationShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
