import React from "react"
import { Argument } from "../data/argument/argument"

interface ArgumentRenderProps {
  argument: Argument
  
}

export default class ArgumentRender extends React.Component<ArgumentRenderProps> {
	  
	renderArgument() {
		return(

		)
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
