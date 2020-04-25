import React from 'react';
import * as api from '../../api';
import {Argument, Node, Source, createEmptyArgument} from '../../data/argument/argument';

interface CreatorProps {
}

interface CreatorState {
  loading: boolean
  argument?: Argument
}

export class Creator extends React.Component<CreatorProps, CreatorState> {

  state = {
    loading: true
  }

  componentDidMount() {
    api.create().then((id: number) => {this.setState(
      loading: false,
      argument: createEmptyArgument(id)
    )})
  }

	render() {
    if (this.state.loading) {
      return(
        <div className="loading">
          I AM LOADING
        </div>
      )
    }

    let argument = this.state.argument as Argument
    
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