import React from 'react';
import './deckCard.scss';
import { CardInstance } from '../../components/card/card';

interface DeckCardProps {
	instance: CardInstance
}

export class DeckCard extends React.Component<DeckCardProps, {} > {

	render() {
		const instance = this.props.instance;
		const type = instance.card.type.name
		const ccc = "deck-card-component"
		const hasPowerClass = !!instance.card.power ? `${ccc}__power--has` : ""

		return(
			<div className={`${ccc} ${ccc}--type-${type}`}>
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
			</div>
		)
	}
}