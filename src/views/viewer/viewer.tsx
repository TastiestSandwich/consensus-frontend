import React from 'react';
import { AppView } from '../../app';

interface ViewerProps {
  changeView: (view: AppView) => void
}

interface ViewerStatus {
  node: Node
}
export class Viewer extends React.Component<ViewerProps, ViewerStatus> {
  changeViewToCreator = () => {
    this.props.changeView(AppView.CREATOR);
  }

  render() {
    return (
      <div className="start-viewer">

      </div>
    );
  }
}