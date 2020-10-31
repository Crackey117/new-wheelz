import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import MapContainer from "./MapContainer"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MapContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
