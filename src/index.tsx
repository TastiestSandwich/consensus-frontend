import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Card, { CardData, getRandomCard } from './card';
import { Chinpoko, ChinpokoData, getRandomChinpoko } from './chinpoko';
import { PhaseGroup, PhaseData, initPhaseGroupData } from './phase';

interface GameState {
  allyHand: Array<CardData>
  enemyHand: Array<CardData>
  allyChinpoko: ChinpokoData
  enemyChinpoko: ChinpokoData
  selectedCard: CardData | null
  allyPhases: Array<PhaseData>
  enemyPhases: Array<PhaseData>
}

function getStartingHand(size: number) {
  let startingHand: Array<CardData> = new Array<CardData>();
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
      enemyChinpoko: getRandomChinpoko(),
      selectedCard: null,
      allyPhases: initPhaseGroupData(5),
      enemyPhases: initPhaseGroupData(5),
    };
  }

  handleCardClick = (selectedCard: CardData) => {
    console.log(selectedCard)
    this.setState({
      selectedCard: selectedCard,
    })
  }

  renderField() {
    return (
      <div className = "field">
        <Chinpoko chinpoko = {this.state.enemyChinpoko} ally={false} />
        <hr></hr>
        <Chinpoko chinpoko = {this.state.allyChinpoko} ally={true} />
      </div>  
    );
  }

  render() {
    return (
      <div className="game">
        <div className="game-action">
          <Hand cards={this.state.enemyHand} ally={false} />
          <hr></hr>
          { this.renderField() }
          <hr></hr>
          <Hand cards={this.state.allyHand} ally={true} onCardClick={this.handleCardClick} />
        </div>
        <div className="game-info">
          { <NextTurn /> }
          { <PhaseGroup phases={this.state.allyPhases} ally={true} /> }
          { this.state.selectedCard &&
          <SelectedCard card={this.state.selectedCard} /> }
        </div>
      </div>
    );
  }
}

interface HandProps {
  cards: Array<CardData>
  ally: boolean
  onCardClick?: (card: CardData) => void
}

class Hand extends React.Component<HandProps> {
  handleClick = (card: CardData) => () => {
    if(this.props.onCardClick)
      this.props.onCardClick(card)
  }
  render() {
    // add is-not-ally class after ':' if needed
    const allyClass = this.props.ally ? "is-ally" : "" 
    return (
      <div className={`game-hand ${allyClass}`} >
        { this.props.cards.map((card, index) => (
          <Card 
            key={index} 
            card={card}
            ally={this.props.ally} 
            onClick={this.handleClick(card)}
           /> 
          ))}
      </div>
    );
  }
}

interface SelectedCardProps {
  card: CardData
}

class SelectedCard extends React.Component<SelectedCardProps> {
  render() {
    const {card} = this.props
    return (
      <div className = "selected-card">
        {
          card &&
          <Card card={card} ally={true}/>
        }
      </div>
    )
  }
}

class NextTurn extends React.Component {
  render() {
    return (
      <div className="next-turn">
        <button className = "next-turn-button">
          NEXT TURN
        </button>
      </div>
    )
  }
}

render(
  <Game />,
  document.getElementById('root')
);