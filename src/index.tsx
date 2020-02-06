import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Card, { CardData, getRandomCard } from './card';
import { Chinpoko, ChinpokoData, getRandomChinpoko } from './chinpoko';
import { PhaseGroup, PhaseData, initPhaseGroupData, setPhaseGroupData, shouldPhaseBeClicked, deleteFromPhaseGroupData } from './phase';

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

  handleCardClick = (selectedCard: CardData, index: number) => {
    let newHand = this.state.allyHand.slice();
    newHand.splice(index, 1);
    if (this.state.selectedCard != null) {
      newHand.push(this.state.selectedCard)
    }
    this.setState({
      selectedCard: selectedCard,
      allyHand: newHand
    })
  }

  deleteCardClick = () => {
    let newHand = this.state.allyHand.slice();
    if(this.state.selectedCard != null) {
       newHand.push(this.state.selectedCard);
    }
    this.setState({
      selectedCard: null,
      allyHand: newHand
    })
  }

  handlePhaseClick = (phaseNumber: number) => {
    let card = this.state.selectedCard;
    if ( shouldPhaseBeClicked(phaseNumber, card, this.state.allyPhases) ) {
      this.setState({
        allyPhases: setPhaseGroupData(phaseNumber, card, this.state.allyPhases),
        selectedCard: null
      })
    }
  }

  deletePhaseClick = (phaseNumber: number, card: CardData | null) => {
    if (card === null) {
      return;
    }
    let newHand = this.state.allyHand.slice();
    newHand.push(card);
    this.setState({
      allyPhases: deleteFromPhaseGroupData(phaseNumber, card.cost, this.state.allyPhases),
      allyHand: newHand
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
          { <PhaseGroup phases={this.state.enemyPhases} ally={false} /> }
          { <PhaseGroup phases={this.state.allyPhases} ally={true} 
            onPhaseClick={this.handlePhaseClick} 
            onPhaseDelete={this.deletePhaseClick} /> }
          { this.state.selectedCard &&
          <SelectedCard card={this.state.selectedCard} deleteCardClick={this.deleteCardClick} /> }
        </div>
      </div>
    );
  }
}

interface HandProps {
  cards: Array<CardData>
  ally: boolean
  onCardClick?: (card: CardData, index: number) => void
}

class Hand extends React.Component<HandProps> {
  handleClick = (card: CardData, index: number) => () => {
    if(this.props.onCardClick)
      this.props.onCardClick(card, index)
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
            onClick={this.handleClick(card, index)}
           /> 
          ))}
      </div>
    );
  }
}

interface SelectedCardProps {
  card: CardData
  deleteCardClick?: () => void
}

class SelectedCard extends React.Component<SelectedCardProps> {
  deleteCardClick = () => () => {
    if(this.props.deleteCardClick)
      this.props.deleteCardClick()
  }

  render() {
    const card = this.props.card
    return (
      <div className = "selected-card">
        {
          card &&
          <Card card={card} ally={true}/>
        }
        {
          card &&
          <button className="delete-button" onClick={this.deleteCardClick()}> X </button>
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