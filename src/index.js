import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './card.js';
import Board from './board.js';

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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);