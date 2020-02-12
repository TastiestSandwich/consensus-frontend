import React from 'react';
import { render } from 'react-dom';
import './style/game.css';
import { CardData, CardInstance } from './card';
import { Hand, getStartingHand, SelectedCard } from './hand';
import { Chinpoko, ChinpokoData, getRandomChinpoko } from './chinpoko';
import { PhaseCounter, PhaseGroup, PhaseData, initPhaseGroupData, setPhaseGroupData, shouldPhaseBeClicked, deleteFromPhaseGroupData } from './phase';
import { Engine } from './engine';
import { findHighestIndexOverLimit } from './util';

export interface GameState {
  allyHand: {[id: number] : CardInstance}
  enemyHand: {[id: number] : CardInstance}
  allyChinpoko: ChinpokoData
  enemyChinpoko: ChinpokoData
  selectedCard: CardInstance | null
  enemySelectedCard: CardInstance | null
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
      enemySelectedCard: null,
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

  handleChangeTeamClick = () => {
    this.setState((state) => ({
      allyHand: state.enemyHand,
      enemyHand: state.allyHand,
      allyChinpoko: state.enemyChinpoko,
      enemyChinpoko: state.allyChinpoko,
      selectedCard: state.enemySelectedCard,
      enemySelectedCard: state.selectedCard,
      allyPhases: state.enemyPhases,
      enemyPhases: state.allyPhases
    }))
  }

  handleNextTurnClick = () => {
    const phaseCounters: Array<PhaseCounter> = [
    {value: this.state.allyChinpoko.spe, chinpoko: {...this.state.allyChinpoko}, remainingPhases: [...this.state.allyPhases]},
    {value: this.state.enemyChinpoko.spe, chinpoko: {...this.state.enemyChinpoko}, remainingPhases: [...this.state.enemyPhases]}];
    const phaseLimit: number = Math.max(...phaseCounters.map( pc => pc.value ));

    while(phaseCounters.length > 0) {
      let index: number = findHighestIndexOverLimit(phaseCounters, phaseLimit);
      if (index >= 0) {
        let phaseCounter: PhaseCounter = phaseCounters[index];
        // remove phase from counter and do its action if it exists
        let phase: PhaseData | undefined = phaseCounter.remainingPhases.shift();
        console.log( "doing phase " + phase.index + " of chinpoko " + phaseCounter.chinpoko.storedData.name);
        if (phase != undefined && phase.instance != null) {
          let card: CardData = phase.instance.card;
          // do card action
          console.log(card.text);
        }
        // delete phaseCounter if no more phases, else antisum limit
        if (phaseCounter.remainingPhases.length <= 0) {
          phaseCounters.splice(index,1);
        } else {
          phaseCounter.value = phaseCounter.value - phaseLimit;
        }

      } else {
        // sum speed to each phaseCounter
        for (const pc of phaseCounters) {
          pc.value = pc.value + pc.chinpoko.spe;
        }
      }
    }
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
          { <ChangeTeam changeTeamClick={this.handleChangeTeamClick} /> }
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

interface ChangeTeamProps {
  changeTeamClick?: () => void
}

class ChangeTeam extends React.Component<ChangeTeamProps> {
  render() {
    return (
      <div className="change-team">
        <button className = "change-team-button" onClick={this.props.changeTeamClick}>
          CHANGE TEAM
        </button>
      </div>
    )
  }
}

render(
  <Game />,
  document.getElementById('root')
);