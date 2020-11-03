import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LocationIndexContainer from "./LocationIndexContainer"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LocationIndexContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
