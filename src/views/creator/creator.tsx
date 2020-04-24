import React from 'react';
import { AppView } from '../../app';

interface CreatorProps {
  changeView: (view: AppView) => void
}

export class Start extends React.Component<CreatorProps> {
  changeViewToViewer = () => {
    this.props.changeView(AppView.VIEWER);
  }

	render() {
    return(
      <div className="start-component">
        <div className="start-component__title">
          ARE YOU READY TO BECOME A CONSENSUS CREATOR
        </div>
        <button className="start-component__game-button" onClick={this.changeViewToViewer}>
          VIEW
        </button>
      </div>
    );
	}
}