import React from 'react';
import { render } from 'react-dom'
import './index.css';
import Card from './card.tsx';
import Board from './board.tsx';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

class Deck extends React.Component {
	constructor(props) {
		super(props);
		
	}
}

class Hand extends React.Component {

}

render(
  <Game />,
  document.getElementById('root')
);