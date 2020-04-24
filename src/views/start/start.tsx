import React from 'react';
import { AppView } from '../../app';

interface StartProps {
  changeView: (view: AppView) => void
}

export class Start extends React.Component<StartProps> {
  changeViewToStart = () => {
    this.props.changeView(AppView.START);
  }

	render() {
    return(
      <div className="start-component">
        <div className="start-component__title">
          ARE YOU READY TO BECOME A CONSENSUS MASTER
        </div>
        <button className="start-component__game-button" onClick={this.changeViewToStart}>
          START
        </button>
      </div>
    );
	}
}