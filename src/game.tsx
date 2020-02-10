import React from 'react';
import { render } from 'react-dom';
import './style/game.css';
import { CardInstance } from './card';
import { Hand, getStartingHand, SelectedCard } from './hand';
import { Chinpoko, ChinpokoData, getRandomChinpoko } from './chinpoko';
import { PhaseGroup, PhaseData, initPhaseGroupData, setPhaseGroupData, shouldPhaseBeClicked, deleteFromPhaseGroupData } from './phase';
import { Engine } from './engine';

export interface GameState {
  allyHand: {[id: number] : CardInstance}
  enemyHand: {[id: number] : CardInstance}
  allyChinpoko: ChinpokoData
  enemyChinpoko: ChinpokoData
  selectedCard: CardInstance | null
  allyPhases: Array<PhaseData>
  enemyPhases: Array<PhaseData>
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

  handleCardClick = (selectedCard: CardInstance) => {
    if (selectedCard.isClicked) {
      return;
    }
    const newHand = {...this.state.allyHand};
    const newCard = {...selectedCard};
    newHand[selectedCard.id].isClicked = true;
    if (this.state.selectedCard != null) {
      newHand[this.state.selectedCard.id].isClicked = false;
    }
    this.setState({
      selectedCard: newCard,
      allyHand: newHand
    })
  }

  deleteCardClick = () => {
    const newHand = {...this.state.allyHand};
    if(this.state.selectedCard != null) {
        newHand[this.state.selectedCard.id].isClicked = false;
    }
    this.setState({
      selectedCard: null,
      allyHand: newHand
    })
  }

  handlePhaseClick = (phaseNumber: number) => {
    const instance = this.state.selectedCard;
    if ( shouldPhaseBeClicked(phaseNumber, instance, this.state.allyPhases) ) {
      this.setState({
        allyPhases: setPhaseGroupData(phaseNumber, instance, this.state.allyPhases),
        selectedCard: null
      })
    }
  }

  deletePhaseClick = (phaseNumber: number, instance: CardInstance | null) => {
    if (instance === null) {
      return;
    }
    const newHand = {...this.state.allyHand};
    newHand[instance.id].isClicked = false;
    this.setState({
      allyPhases: deleteFromPhaseGroupData(phaseNumber, instance.card.cost, this.state.allyPhases),
      allyHand: newHand
    })
  }

  handleNextTurnClick = () => {
    console.log("clickity click");
  }

  renderField() {
    return (
      <div className = "field">
        <Chinpoko chinpoko = {this.state.enemyChinpoko} ally={false} />
        <hr></hr>
        <Engine />
        <hr></hr>
        <Chinpoko chinpoko = {this.state.allyChinpoko} ally={true} />
      </div>  
    );
  }

  render() {
    return (
      <div className="game">
        <div className="game-action">
          <Hand instances={this.state.enemyHand} ally={false} />
          <hr></hr>
          { this.renderField() }
          <hr></hr>
          <Hand instances={this.state.allyHand} ally={true} onCardClick={this.handleCardClick} />
        </div>
        <div className="game-info">
          { <NextTurn nextTurnClick={this.handleNextTurnClick} /> }
          { <PhaseGroup phases={this.state.enemyPhases} ally={false} /> }
          { <PhaseGroup phases={this.state.allyPhases} ally={true} 
            onPhaseClick={this.handlePhaseClick} 
            onPhaseDelete={this.deletePhaseClick} /> }
          { this.state.selectedCard &&
          <SelectedCard instance={this.state.selectedCard} deleteCardClick={this.deleteCardClick} /> }
        </div>
      </div>
    );
  }
}

interface NextTurnProps {
  nextTurnClick?: () => void
}

class NextTurn extends React.Component<NextTurnProps> {
  render() {
    return (
      <div className="next-turn">
        <button className = "next-turn-button" onClick={this.props.nextTurnClick}>
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