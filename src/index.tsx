import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Card, { getRandomCardInstance, CardInstance } from './card';
import { Chinpoko, ChinpokoData, getRandomChinpoko } from './chinpoko';
import { PhaseGroup, PhaseData, initPhaseGroupData, setPhaseGroupData, shouldPhaseBeClicked, deleteFromPhaseGroupData } from './phase';

interface GameState {
  allyHand: {[id: number] : CardInstance}
  enemyHand: {[id: number] : CardInstance}
  allyChinpoko: ChinpokoData
  enemyChinpoko: ChinpokoData
  selectedCard: CardInstance | null
  allyPhases: Array<PhaseData>
  enemyPhases: Array<PhaseData>
}

function getStartingHand(size: number) {
  let startingHand: {[id: number] : CardInstance} = {};
  for (let i = 0; i < size; i++) {
    startingHand[i] = getRandomCardInstance(i);
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
          <Hand instances={this.state.enemyHand} ally={false} />
          <hr></hr>
          { this.renderField() }
          <hr></hr>
          <Hand instances={this.state.allyHand} ally={true} onCardClick={this.handleCardClick} />
        </div>
        <div className="game-info">
          { <NextTurn /> }
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

interface HandProps {
  instances: {[id: number] : CardInstance}
  ally: boolean
  onCardClick?: (instance: CardInstance) => void
}

class Hand extends React.Component<HandProps> {
  handleClick = (instance: CardInstance) => () => {
    if(this.props.onCardClick)
      this.props.onCardClick(instance)
  }
  render() {
    const cardArray = Object.values(this.props.instances);
    // add is-not-ally class after ':' if needed
    const allyClass = this.props.ally ? "is-ally" : ""
    return (
      <div className={`game-hand ${allyClass}`} >
        { cardArray.map((instance) => (
          <Card 
            key={instance.id} 
            instance={instance}
            ally={this.props.ally} 
            onClick={this.handleClick(instance)}
           /> 
          ))}
      </div>
    );
  }
}

interface SelectedCardProps {
  instance: CardInstance
  deleteCardClick?: (id: number) => void
}

class SelectedCard extends React.Component<SelectedCardProps> {
  deleteCardClick = (id: number) => () => {
    if(this.props.deleteCardClick)
      this.props.deleteCardClick(id)
  }

  render() {
    const instance = this.props.instance
    return (
      <div className = "selected-card">
        {
          instance &&
          <Card instance={instance} ally={true}/>
        }
        {
          instance &&
          <button className="delete-button" onClick={this.deleteCardClick(instance.id)}> X </button>
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