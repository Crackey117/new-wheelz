import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LocationIndexContainer from "./LocationIndexContainer"
import LocationShowContainer from "./LocationShowContainer"
import LocationsForm from "./LocationsForm.js"
import LocationDestroy from "./LocationDestroy"
import CommentIndex from "./CommentIndex"
import CommentDestroy from "./CommentDestory"
import Navbar from "./Navbar"
import AboutPage from "./AboutPage.js"
export const App = () => {
  return (
    <div>

    <BrowserRouter>
 
      <div className="cell medium-auto medium-cell-block-container">
      <div className="grid-x" style={{ height: "100%" }}>
        <Navbar classes="cell small-1 navbar nav-background" />
        <Switch>
          <Route exact path="/" component={LocationIndexContainer} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/locations" component={LocationIndexContainer} />
          <Route exact path="/locations/new" component={LocationsForm} />
          <Route exact path="/locations/:id" component={LocationShowContainer} />
          <Route exact path="/locations/:id/destroy" component={LocationDestroy} />
          <Route exact path="/locations/:location_id/comments" component={CommentIndex} />
          <Route exact path="/locations/:location_id/comments/:id/destroy" component={CommentDestroy} />
        </Switch>
      </div>
    </div>

    </BrowserRouter>
    </div>
  )
}

export default App
