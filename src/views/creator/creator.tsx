import React from "react"
import * as api from "../../api"
import {
	Argument,
	createEmptyArgument
} from "../../data/argument/argument"
import ArgumentRender from "../../components/argumentRender"

interface CreatorProps { }

interface CreatorState {
	loading: boolean
	selectedNodeId: number
	argument?: Argument
}

export default class Creator extends React.Component<CreatorProps, CreatorState> {
	state: CreatorState = {
		loading: true,
		selectedNodeId: -1
	}

	componentDidMount() {
		api.create().then((id: number) => {
			const argument = createEmptyArgument(id)
			this.setState({
				loading: false,
				argument,
				selectedNodeId: argument.root.id
			})
		})
	}

	render() {
		if (this.state.loading) {
			return <div className="loading">I AM LOADING</div>
		}

		let argument = this.state.argument as Argument

		return (
			<div className="creator-component">
				<ArgumentRender 
					argument={argument} 
					selectedNodeId={this.state.selectedNodeId} 
				/>
			</div>
		)
	}
}
