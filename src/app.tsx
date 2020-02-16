import React from 'react';
import { render } from 'react-dom';
import { Game } from './views/game/game';
import { Start } from './views/start/start';
import { TeamBuilder, getRandomTeam } from './views/teamBuilder/teamBuilder';
import { DeckBuilder, getRandomDeck } from './views/deckBuilder/deckBuilder';
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
  allyDeck: {[id: number] : CardInstance}
  enemyDeck: {[id: number] : CardInstance}
  view: AppView
  ally: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      view: AppView.START,
      allyTeam: getRandomTeam(4),
      enemyTeam: getRandomTeam(4),
      allyDeck: getRandomDeck(30),
      enemyDeck: getRandomDeck(30),
      ally: true
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

  setDeck = (deck: {[id: number] : CardInstance}, ally: boolean) => {
    if(ally) {
      this.setState({
        allyDeck: deck
      });
    } else {
      this.setState({
        enemyDeck: deck
      })
    }
  }

  swapPlayers = () => {
    this.setState((state) => ({
      allyTeam: state.enemyTeam,
      enemyTeam: state.allyTeam,
      allyDeck: state.enemyDeck,
      enemyDeck: state.allyDeck,
      ally: !state.ally
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
          <DeckBuilder 
          changeView={this.changeView}
          swapPlayers={this.swapPlayers}
          setDeck={this.setDeck}
          allyDeck={this.state.allyDeck}
          enemyDeck={this.state.enemyDeck}
          ally={this.state.ally}/>
        );

      case AppView.TEAM:
        return (
          <TeamBuilder 
          changeView={this.changeView} 
          setTeam={this.setTeam} 
          swapPlayers={this.swapPlayers}
          allyTeam={this.state.allyTeam} 
          enemyTeam={this.state.enemyTeam}
          ally={this.state.ally}/>
        );

      case AppView.GAME:
        return (
          <Game 
          allyTeam={this.state.allyTeam} 
          enemyTeam={this.state.enemyTeam} 
          setTeam={this.setTeam}
          swapPlayers={this.swapPlayers}/>
        );
    }
	}
}

render(
  <App />,
  document.getElementById('root')
);