import React from 'react';
import './index.css';

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
	let index = Math.floor(Math.random() * CardList.length)
	return CardList[index]
}	

export class Card extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.card.name,
			text: this.props.card.text,
			cost: this.props.card.cost
			ally: this.props.ally
		}
	}

	render() {
		if (this.state.ally === "true") {
			return (
				<div className="card" ally= "true">
					<div className="cardcost">
						{this.state.cost}
					</div>
					<div className="cardname">
						{this.state.name}
					</div>
					<div className="cardtext">
						{this.state.text}
					</div>
				</div>
			);
		} else {
			return (
				<div className="card" ally= "false">
				</div>
			);
		}
	}
}