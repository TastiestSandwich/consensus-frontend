import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

class App extends React.Component<{}, {}> {

  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/">
          Creator
        </Route>
        <Route path="/id">
          viewer
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
