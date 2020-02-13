import React from 'react';
import './style/card.css';
import { Type, TypeList } from './type';

export interface CardInstance {
	card: CardData
	id: number
	isClicked: boolean
	isRemovable: boolean
}

function getRandomCard() {
	let index = Math.floor(Math.random() * Object.values(CardList).length);
	return Object.values(CardList)[index];
}

export function getRandomCardInstance(id: number) {
	const card = getRandomCard();
	const instance: CardInstance = {
		card: card,
		id: id,
		isClicked: false,
		isRemovable: true
	}
	return instance
}

interface CardProps {
	instance: CardInstance
	ally: boolean
	onClick?: () => void
}

export default class Card extends React.Component<CardProps, {} > {

	render() {
		// add is-not-ally class after ':' if needed
		const { instance, ally, onClick, } = this.props
		const isClickedClass = instance.isClicked ? "is-clicked" : "is-not-clicked"
		const allyClass = ally ? "is-ally" : "is-enemy" 
		const color = instance.card.type.color
		const border = ally ? "5px solid " + color : "4px solid grey"

		return(
			<div className={`card ${allyClass} ${isClickedClass}`} style={{border: border}} onClick={onClick}> 
			{
				ally &&
				<>
					<div className="cardcost">
						{instance.card.cost}
					</div>
					<div className="cardname">
						{instance.card.name}
					</div>
					<div className="cardtext">
						{instance.card.text}
					</div>
					<div className="cardpower-wrapper">
					{ instance.card.power &&
						<div className="cardpower">
							{instance.card.power}
						</div>
					}
					</div>
				</>
			}
			</div>
		)
	}
}

export interface CardData {
	name: string
	text: string
	cost: number
	power?: number
	type: Type
	action: Array<CardAction>
}

export interface CardAction {
	effect: string
	parameters: ActionParameters
}

export interface ActionParameters {
	power?: number
	percentage?: number
}

export const CardList: { [name:string] : CardData } = {
	"Quick Attack": {
		name: "Quick Attack", 
		cost: 1,
		power: 30,
		text: "Quickly strikes the enemy", 
		type: TypeList["NEUTRAL"],
		action: [{
			effect: "DAMAGE",
			parameters: {
				power: 30,
			}
		}]
	},
	"Water Gun": {
		name: "Water Gun", 
		cost: 2,
		power: 50,
		text: "Soaks the enemy in water",
		type: TypeList["WATER"],
		action: [{
			effect: "DAMAGE",
			parameters: {
				power: 50,
			}
		}]
	},
	"Mega Drain": {
		name: "Mega Drain",
		cost: 3,
		power: 60,
		text: "Drains the enemy's health, recovering half the damage done",
		type: TypeList["GRASS"],
		action: [{
			effect: "ABSORB",
			parameters: {
				power: 60,
				percentage: 0.5,
			}
		}]
	},
	"Flamethrower": {
		name: "Flamethrower",
		cost: 4,
		power: 90,
		text: "Burns the enemy with a stream of fire",
		type: TypeList["FIRE"],
		action: [{
			effect: "DAMAGE",
			parameters: {
				power: 90,
			}
		}]
	},
	"Rest": {
		name: "Rest",
		cost: 5,
		text: "Rests and recovers half of its health",
		type: TypeList["NEUTRAL"],
		action: [{
			effect: "HEAL",
			parameters: {
				percentage: 0.5,
			}
		}]
	},
}