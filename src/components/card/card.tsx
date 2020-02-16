import React from 'react';
import './card.scss';
import { Type, TypeList } from '../type/type';

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
	const instance = getCardInstance(id, card, true);
	return instance
}

export function getCardInstance(id: number, card: CardData, isRemovable: boolean) {
	const instance: CardInstance = {
		card: card,
		id: id,
		isClicked: false,
		isRemovable: isRemovable
	};
	return instance;
}

interface CardProps {
	instance: CardInstance
	ally: boolean
	onClick?: () => void
}

export default class Card extends React.Component<CardProps, {} > {

	render() {
		const { instance, ally, onClick, } = this.props
		const type = instance.card.type.name
		const ccc = "card-component"
		const allyClass = ally ? `${ccc}--is-ally` : `${ccc}--is-enemy`
		const isClickedClass = instance.isClicked ? `${ccc}--is-clicked` : ""
		const isClickableClass = !!onClick && !instance.isClicked ? `${ccc}--is-clickable` : ""
		const hasPowerClass = !!instance.card.power ? `${ccc}__power--has` : ""

		return(
			<div className={`${ccc} ${ccc}--type-${type} ${allyClass} ${isClickedClass} ${isClickableClass}`} onClick={onClick}>
			{
				ally &&
				<>
					<div className={`${ccc}__values`}>
						<div className={`${ccc}__cost ${ccc}__cost--pre`}>
							{instance.card.cost}
						</div>
						<div className={`${ccc}__power ${hasPowerClass}`}>
							{instance.card.power}
						</div>
						<div className={`${ccc}__cost ${ccc}__cost--post`}>
							{/* TODO: */}
							{instance.card.cost}
						</div>
					</div>
					<div className={`${ccc}__name`}>
						{instance.card.name}
					</div>
					<div className={`${ccc}__image`}>

					</div>
					<div className={`${ccc}__text`}>
						{instance.card.text}
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