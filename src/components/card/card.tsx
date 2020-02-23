import React from 'react';
import './card.scss';
import { GameStage } from '../../views/game/game';
import { Type, TypeSymbol } from '../type/type';
import { CardList } from '../../data/cardList';

export function shuffle(array: Array<number>) {
	for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
  stage: GameStage
	onClick?: () => void
}

export default class Card extends React.Component<CardProps, {} > {

	render() {
		const { instance, ally, onClick, } = this.props
		const type = instance.card.type
		const ccc = "card-component"
		const allyClass = ally ? `${ccc}--is-ally` : `${ccc}--is-enemy`
		const isClickedClass = instance.isClicked ? `${ccc}--is-clicked` : ""
		const isClickableClass = !!onClick && !instance.isClicked ? `${ccc}--is-clickable` : ""
		const hasPowerClass = !!instance.card.power ? `${ccc}__power--has` : ""
    const show = ally && this.props.stage === GameStage.PLAY
    const hideClass = show ? "" : `${ccc}--is-hide` 

		return(
			<div className={`${ccc} ${ccc}--type-${type.name} ${allyClass} ${isClickedClass} ${isClickableClass} ${hideClass}`} onClick={onClick}>
			{
				show &&
				<>
          <div className={`${ccc}__type`}>
            <TypeSymbol
            type={type}
            />
          </div>
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
