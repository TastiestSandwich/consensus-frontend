import React from 'react';
import Argument from '../data/argument';

interface ArgumentRenderProps {
	argument: Argument
}

export default class ArgumentRender extends React.Component<ArgumentRenderProps> {
	render() {
		let {argument} = this.props
		return(
			<div className="argument">
				{JSON.stringify(argument)}
			</div>
		)
	}
}