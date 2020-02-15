import React from 'react';
import { render } from 'react-dom';
import { Game } from './game';
import { Start } from './start';
import { TeamBuilder } from './teamBuilder';
import { DeckBuilder } from './deckBuilder';
import { CardInstance } from './card';
import { ChinpokoData } from './chinpoko'

export const enum AppView {
  START,
  DECK,
  TEAM,
  GAME
}

interface AppState {
  team?: {[id: number] : ChinpokoData}
  deck?: {[id: number] : CardInstance}
  view: AppView
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      view: AppView.START,
    };
  }

  setTeam = (team: {[id: number] : ChinpokoData}) => {
    this.setState({
      team: team
    });
    console.log(team);
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

      case AppView.DECK:
        return (
          <DeckBuilder changeView={this.changeView}/>
        );

      case AppView.TEAM:
        return (
          <TeamBuilder changeView={this.changeView} setTeam={this.setTeam}/>
        );

      case AppView.GAME:
        return (
          <Game team={this.state.team}/>
        );
    }
	}
}

render(
  <App />,
  document.getElementById('root')
);