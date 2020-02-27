import React from 'react';
import './power.scss';
import { GameStage } from '../../views/game/game';
import { TypeSymbol } from '../type/type';
import { ActionSymbol } from '../action/action';
import { CardInstance } from '../card/card';

interface PowerProps {
  instance: CardInstance
  stage: GameStage
  onClick?: () => void
}

export default class Power extends React.Component<PowerProps, {} > {

	render() {
		const { instance, stage, onClick, } = this.props
		const type = instance.card.type
		const pcc = "power-component"
		const isClickedClass = instance.isClicked ? `${pcc}--is-clicked` : ""
		const isClickableClass = !!onClick && !instance.isClicked ? `${pcc}--is-clickable` : ""
    const show = stage === GameStage.PLAY
    const hideClass = show ? "" : `${pcc}--is-hide` 

		return(
			<div className={`${pcc} ${pcc}--type-${type.name} ${isClickedClass} ${isClickableClass} ${hideClass}`} onClick={onClick}>
			{
				show &&
				<>
          <div className={`${pcc}__type`}>
            <TypeSymbol
            type={type}
            />
          </div>
					<div className={`${pcc}__values`}>
						{ instance.card.actions.map((action, index) => (
              <ActionSymbol
              key={index}
              action={action}
              />
            ))}
					</div>
					<div className={`${pcc}__name`}>
						{instance.card.name}
					</div>
					<div className={`${pcc}__text`}>
						{instance.card.text}
					</div>
				</>
			}
			</div>
		)
	}
}