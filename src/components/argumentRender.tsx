import React from "react"
import { Argument } from "../data/argument/argument"

interface ArgumentRenderProps {
	argument: Argument
	selectedNodeId: number
}

export default class ArgumentRender extends React.Component<ArgumentRenderProps> {
	  
	renderArgument(argument: Argument) {
		return null
	}
 	render() {
		let { argument } = this.props
		return (
			<div className="argument">
				{this.renderArgument(argument)}
			</div>
		)
	}
}
