import React from 'react';
import { AppView } from './app';

interface StartProps {
  changeView: (view: AppView) => void
}

export class Start extends React.Component<StartProps> {
  changeViewToGame = () => {
    this.props.changeView(AppView.GAME);
  }
  changeViewToTeam = () => {
    this.props.changeView(AppView.TEAM);
  }
  changeViewToDeck = () => {
    this.props.changeView(AppView.DECK);
  }

	render() {
    return(
      <div className="start-component">
        <div className="start-component__title">
          ARE YOU READY TO BECOME A CHINPOKOMON MASTER
        </div>
        <button className="start-component__game-button" onClick={this.changeViewToGame}>
          GAME
        </button>
        <button className="start-component__team-button" onClick={this.changeViewToTeam}>
          TEAM
        </button>
        <button className="start-component__deck-button" onClick={this.changeViewToDeck}>
          DECK
         </button>
      </div>
    );
	}
}