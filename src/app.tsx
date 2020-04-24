import React from 'react';
import { render } from 'react-dom';
import { Start } from './views/start/start';

export const enum AppView {
  START
}

interface AppState {
  view: AppView
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      view: AppView.START,
    };
  }

  changeView = (view: AppView) => {
    this.setState({
      view: view
    });
  }

  render() {
    const view = this.state.view;

    switch(view) {
      case AppView.START:
        return (
          <Start changeView={this.changeView}/>
        );
    }
  }
}

render(
  <App />,
  document.getElementById('root')
);
