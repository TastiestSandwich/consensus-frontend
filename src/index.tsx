import React from 'react';
import { render } from 'react-dom'
import './index.css';
import { Card, CardData, getRandomCard } from './card.tsx';
import { Chinpoko, ChinpokoData, getRandomChinpoko } from './chinpoko.tsx';

interface GameState {
  allyHand: Array<CardData>
  enemyHand: Array<CardData>
  allyChinpoko: ChinpokoData
  enemyChinpoko: ChinpokoData
}

function getStartingHand(size: number) {
  let startingHand: Array<CardData> = new Array<CardData>;
  for (let i = 0; i < size; i++) {
    startingHand.push(getRandomCard());
  }
  return startingHand;
}

class Game extends React.Component<{}, GameState> {
  constructor(props) {
    super(props);
    this.state = {
      allyHand: getStartingHand(3),
      enemyHand: getStartingHand(3),
      allyChinpoko: getRandomChinpoko(),
      enemyChinpoko: getRandomChinpoko()
    };
  }

  renderBoard() {
    return (
      <div className = "board">
        <Chinpoko chinpoko = {this.state.enemyChinpoko} ally="false" />
        <hr></hr>
        <Chinpoko chinpoko = {this.state.allyChinpoko} ally="true" />
      </div>  
    );
  }

  render() {
    return (
      <div className="game">
        <Hand hand = {this.state.enemyHand} ally ="false" />
        <hr></hr>
        <div className="game-board">
          { this.renderBoard() }
        </div>
        <hr></hr>
         <Hand hand = {this.state.allyHand} ally="true" />
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

  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.hand,
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