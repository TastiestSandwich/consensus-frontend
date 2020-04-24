import React from 'react';
import { AppView } from '../../app';

interface ViewerProps {
  changeView: (view: AppView) => void
}

export class Viewer extends React.Component<ViewerProps> {
  changeViewToCreator = () => {
    this.props.changeView(AppView.CREATOR);
  }

  render() {
    return(
      <div className="start-component">
        <div className="start-component__title">
          ARE YOU READY TO BECOME A CONSENSUS VIEWER
        </div>
        <button className="start-component__game-button" onClick={this.changeViewToCreator}>
          CREATE
        </button>
      </div>
    );
  }
}