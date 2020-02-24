import React from 'react';
import './deckCard.scss';
import { CardInstance, CardAction } from '../../components/card/card';
import { TypeSymbol } from '../../components/type/type';

interface DeckCardProps {
	instance: CardInstance
}

export class DeckCard extends React.Component<DeckCardProps, {} > {

  renderCardAction(parent: string, action: CardAction) {
    return(
      <div className={`${parent}__action ${parent}__action--effect-${action.effect.name}`}>
        <div className={`${parent}__action-icon`}>
          <i className={action.effect.symbol}></i>
        </div>
      </div>
    )
  }

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
						{ instance.card.actions.map((action) => (
              this.renderCardAction(ccc, action)
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