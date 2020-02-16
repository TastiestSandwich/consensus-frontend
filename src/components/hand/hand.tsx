import React from 'react';
import './hand.scss';
import { GameStage } from '../../views/game/game';
import Card, { CardInstance } from '../card/card';

interface HandProps {
	instances: Array<CardInstance>
	ally: boolean
  stage: GameStage
	onCardClick?: (id: number) => void
	className?: string
}

export class Hand extends React.Component<HandProps> {
	handleClick = (id: number) => () => {
		if(this.props.onCardClick)
			this.props.onCardClick(id)
	}
	render() {
		const {instances, ally, className} = this.props
		// add is-not-ally class after ':' if needed
		const allyClass = ally ? "is-ally" : "is-enemy"
		const onClick = ally ?
						this.handleClick ?
							this.handleClick
							: (a) => {return undefined}
						: (a) => {return undefined}
		return (
			<div className={`hand-component hand-component--${allyClass} ${className}`} >
				{ instances.map((instance) => (
					<Card
						key={instance.id}
						instance={instance}
						ally={this.props.ally}
            stage={this.props.stage}
						onClick={onClick(instance.id)}
					 />
					))}
			</div>
		);
	}
}

interface SelectedCardProps {
	instance: CardInstance
  stage: GameStage
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
					<Card instance={instance} ally={true} stage={this.props.stage}/>
				}
				{
					instance &&
					<button className="delete-button" onClick={this.deleteCardClick(instance.id)}> X </button>
				}
			</div>
		)
	}
}