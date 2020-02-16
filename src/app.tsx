import React from 'react';
import { render } from 'react-dom';
import { Game } from './views/game/game';
import { Start } from './views/start/start';
import { TeamBuilder, getRandomTeam } from './views/teamBuilder/teamBuilder';
import { DeckBuilder, getRandomDeckList } from './views/deckBuilder/deckBuilder';
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
  allyDeckList: {[id: number] : CardInstance}
  enemyDeckList: {[id: number] : CardInstance}
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
      allyDeckList: getRandomDeckList(30),
      enemyDeckList: getRandomDeckList(30),
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

  setDeckList = (deckList: {[id: number] : CardInstance}, ally: boolean) => {
    if(ally) {
      this.setState({
        allyDeckList: deckList
      });
    } else {
      this.setState({
        enemyDeckList: deckList
      })
    }
  }

  swapPlayers = () => {
    this.setState((state) => ({
      allyTeam: state.enemyTeam,
      enemyTeam: state.allyTeam,
      allyDeckList: state.enemyDeckList,
      enemyDeckList: state.allyDeckList,
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
          setDeckList={this.setDeckList}
          allyDeckList={this.state.allyDeckList}
          enemyDeckList={this.state.enemyDeckList}
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
          allyDeckList={this.state.allyDeckList}
          enemyDeckList={this.state.enemyDeckList}
          setTeam={this.setTeam}
          setDeckList={this.setDeckList}
          swapPlayers={this.swapPlayers}/>
        );
    }
	}
}

render(
  <App />,
  document.getElementById('root')
);