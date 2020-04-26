import React from 'react';
import { render } from 'react-dom';
import Creator from './views/creator/creator'
import Viewer from './views/viewer/viewer'
import {configure} from 'react-hotkeys';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import "./root.scss"

configure({
  // Dont ignore keypresses on inputs
  ignoreTags: []
})

export enum AppView {
  CREATOR,
  VIEWER
}

class App extends React.Component<{}, {}> {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Creator />
          </Route>
          <Route path="/:param">
            <Viewer />
          </Route>
        </Switch>
      </Router>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
);
