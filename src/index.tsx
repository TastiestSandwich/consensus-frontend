import React from 'react';
import { render } from 'react-dom'
import './index.css';
import { Card, CardData, getRandomCard } from './card.tsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderBoard() {
    return (
      <div>
        <div className = "chinpoko" ally="false">
          ENEMY
        </div>
        <div className = "chinpoko" ally="true">
          ALLY
        </div>
      </div>  
    );
  }

  render() {
    return (
      <div className="game">
        <Hand ally ="false" />
        <hr></hr>
        <div className="game-board">
          { this.renderBoard() }
        </div>
        <hr></hr>
         <Hand ally="true" />
      </div>
    );
  }
}

class Deck extends React.Component {
	constructor(props) {
		super(props);
		
	}
}

interface HandState {
  cards: Array<CardData>
  ally: boolean
}

class Hand extends React.Component<{}, HandState> {

  getStartingHand(size: number) {
    let startingHand: Array = new Array<CardData>;
    for (let i = 0; i < size; i++) {
      startingHand.push(getRandomCard());
    }
    return startingHand;
  }

  constructor(props) {
    super(props);
    this.state = {
      cards: this.getStartingHand(3),
      ally: this.props.ally,
    }
  }

  render() {
    return (
      <div className = "game-hand" ally = {this.state.ally.toString()}>
        { this.state.cards.map((card, index) => (
          <Card key={index} card={card} ally={this.state.ally} /> 
          ))}
      </div>
    );
  }
}

render(
  <Game />,
  document.getElementById('root')
);