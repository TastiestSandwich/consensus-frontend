import React from 'react';
import './style/hand.css';
import Card, { CardInstance, getRandomCardInstance } from './card';

export function getStartingHand(size: number) {
  let startingHand: {[id: number] : CardInstance} = {};
  for (let i = 0; i < size; i++) {
    startingHand[i] = getRandomCardInstance(i);
  }
  return startingHand;
}

interface HandProps {
  instances: {[id: number] : CardInstance}
  ally: boolean
  onCardClick?: (instance: CardInstance) => void
}

export class Hand extends React.Component<HandProps> {
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

export class SelectedCard extends React.Component<SelectedCardProps> {
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