import React from 'react';
import { AppView } from './app';

interface DeckBuilderProps {
  changeView: (view: AppView) => void
}

export class DeckBuilder extends React.Component<DeckBuilderProps> {
  changeViewToStart = () => {
    this.props.changeView(AppView.START);
  }

  render(){
  	return (
  		<div className="team-view-component">
        <button className="team-view-component__start-button" onClick={this.changeViewToStart}>
          BACK
        </button>
  			<div className="team-view-component__title">
  				DECK BUILDER
  			</div>
  		</div>
	  )
  }
}