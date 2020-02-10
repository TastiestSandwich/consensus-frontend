import React from 'react';
import './style/card.css';

export interface CardData {
	name: string
	text: string
	cost: number
}

export const CardList: { [name:string] : CardData } = {
	"card1": {name: "card1", text: "do thing 1", cost: 1},
	"card2": {name: "card2", text: "do thing 2", cost: 2},
	"card3": {name: "card3", text: "do tremendously long thing 3", cost: 3},
	"card4": {name: "card4", text: "do long thing 4", cost: 4},
	"card5": {name: "card5", text: "do very long thing 5", cost: 5}
}

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
		const allyClass = this.props.ally ? "is-ally" : "is-enemy" 
		const isClickedClass = this.props.instance.isClicked ? "is-clicked" : "is-not-clicked"
		let {
			instance, 
			ally,
			onClick,
		} = this.props
		return(
			<div className={`card ${allyClass} ${isClickedClass}`} onClick={onClick}> 
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
				</>
			}
			</div>
		)
	}
}