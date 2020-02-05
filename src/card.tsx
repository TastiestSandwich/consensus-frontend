import React from 'react';
import './card.css';

export interface CardData {
	name: string
	text: string
	cost: number
}

export const CardList: Array<CardData> = [
	{name: "card1", text: "do thing 1", cost: 1},
	{name: "card2", text: "do thing 2", cost: 2},
	{name: "card3", text: "do tremendously long thing 3", cost: 3},
	{name: "card4", text: "do long thing 4", cost: 4},
	{name: "card5", text: "do very long thing 5", cost: 5}
];

export function getRandomCard() {
	let index = Math.floor(Math.random() * CardList.length);
	return CardList[index];
}	

interface CardProps {
	card: CardData
	ally: boolean
	onClick?: () => void
}

export default class Card extends React.Component<CardProps, {} > {

	render() {
		// add is-not-ally class after ':' if needed
		const allyClass = this.props.ally ? "is-ally" : "" 
		const {
			card, 
			ally,
			onClick
		} = this.props
		return(
			<div className={`card ${allyClass}`} onClick={onClick}> 
			{
				ally &&
				<>
					<div className="cardcost">
						{card.cost}
					</div>
					<div className="cardname">
						{card.name}
					</div>
					<div className="cardtext">
						{card.text}
					</div>
				</>
			}
			</div>
		)
	}
}