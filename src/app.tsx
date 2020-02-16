import React from 'react';
import { render } from 'react-dom';
import { Game } from './views/game/game';
import { Start } from './views/start/start';
import { TeamBuilder, getRandomTeam } from './views/teamBuilder/teamBuilder';
import { DeckBuilder } from './views/deckBuilder/deckBuilder';
import { CardInstance } from './components/card/card';
import { ChinpokoData } from './components/chinpoko/chinpoko';

export const enum AppView {
  START,
  DECK,
  TEAM,
  GAME
}

interface AppState {
  allyTeam: {[id: number] : ChinpokoData}
  enemyTeam: {[id: number] : ChinpokoData}
  allyDeck?: {[id: number] : CardInstance}
  enemyDeck?: {[id: number] : CardInstance}
  view: AppView
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      view: AppView.START,
      allyTeam: getRandomTeam(4),
      enemyTeam: getRandomTeam(4)
    };
  }

  setTeam = (team: {[id: number] : ChinpokoData}, ally: boolean) => {
    if(ally) {
      this.setState({
        allyTeam: team
      });
    } else {
      this.setState({
        enemyTeam: team
      })
    }
  }

  swapTeams = () => {
    this.setState((state) => ({
      allyTeam: state.enemyTeam,
      enemyTeam: state.allyTeam
    }));
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
          <TeamBuilder 
          changeView={this.changeView} 
          setTeam={this.setTeam} 
          swapTeams={this.swapTeams}
          allyTeam={this.state.allyTeam} 
          enemyTeam={this.state.enemyTeam}/>
        );

      case AppView.GAME:
        return (
          <Game 
          allyTeam={this.state.allyTeam} 
          enemyTeam={this.state.enemyTeam} 
          setTeam={this.setTeam}
          swapTeams={this.swapTeams}/>
        );
    }
	}
}

render(
  <App />,
  document.getElementById('root')
);