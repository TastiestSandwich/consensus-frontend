import React from "react"

import {Node, Argument} from "../../../data/argument/argument"


interface ArgumentReviewerProps {
	argument: Argument
}

interface ArgumentReviewerState {
	currentNode: Node 
}

export default class ArgumentReviewer extends React.Component<ArgumentReviewerProps, ArgumentReviewerState> {
	state = {
		currentNode: this.props.argument.root
	}

	render() {
		return (
			<div className="argument-reviewer-component">
				
			</div>
		)
	}
}