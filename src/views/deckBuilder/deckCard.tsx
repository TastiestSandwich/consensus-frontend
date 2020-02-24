import React from 'react';
import './deckCard.scss';
import { CardInstance } from '../../components/card/card';
import { ActionSymbol } from '../../components/action/action';
import { TypeSymbol } from '../../components/type/type';

interface DeckCardProps {
	instance: CardInstance
}

export class DeckCard extends React.Component<DeckCardProps, {} > {

	render() {
		const instance = this.props.instance;
		const type = instance.card.type
		const ccc = "deck-card-component"

		return(
			<div className={`${ccc} ${ccc}--type-${type.name}`}>
				<div className={`${ccc}__type`}>
            <TypeSymbol
            type={type}
            />
          </div>
					<div className={`${ccc}__values`}>
						{ instance.card.actions.map((action, index) => (
              <ActionSymbol
              key={index}
              action={action}
              />
            ))}
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