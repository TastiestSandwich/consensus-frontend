import React from "react"
import * as api from "../../api"
import {
	Argument,
	createEmptyArgument,
	Node,
	NodeType
} from "../../data/argument/argument"
import ArgumentRender from "../../components/argumentRender"
import NodeEditor from "../../components/nodeEditor"

interface CreatorProps { }

interface CreatorState {
	loading: boolean
	selectedNode: Node | null
	argument?: Argument
}

export default class Creator extends React.Component<CreatorProps, CreatorState> {
	state: CreatorState = {
		loading: true,
		selectedNode: null
	}

	componentDidMount() {
		api.create().then((id: number) => {
			const argument = createEmptyArgument(id)
			this.setState({
				loading: false,
				argument: argument,
				selectedNode: argument.root
			})
		})
	}

	handleSaveSelectedNode = (sentence: string, type: NodeType, href?: string, description?: string) => {
		//TODO search node in argument and substitute
		let argument = {...this.state.argument} as Argument
		let node = {...this.state.selectedNode} as Node

		node.sentence = sentence
		node.type = type
		
		this.setState({
			selectedNode: node,
			argument: argument
		})
	}

	render() {
		if (this.state.loading) {
			return <div className="loading">I AM LOADING</div>
		}

		let argument = this.state.argument as Argument
		/* testing
		let argument = {
			id: 1,
			root: {
				id: 0,
				sentence: "El caballo blanco de santiago es blanco",
				type: NodeType.STATEMENT as NodeType.STATEMENT,
				children: [
					{
						id:1,
						type: NodeType.FACT as NodeType.FACT,
						sentence: "Habia un caballo en santiago",
						sources: [
							{
								id:2,
								type: NodeType.SOURCE as NodeType.SOURCE,
								sentence: "El caballo homo esta en santiago",
								href: "http://wwww.wikipedia.com",
								description: "La universidad de madrid vio el caballo al parecer"
							}
						]
					},
					{
						id:3,
						type: NodeType.STATEMENT as NodeType.STATEMENT,
						sentence: "Solo se permitian caballos blancos en santiago",
					}
				]
			}
		}
*/		let selectedNode = this.state.selectedNode as Node

		return (
			<div className="creator-component">
				<ArgumentRender 
					argument={argument} 
					selectedNodeId={selectedNode.id} 
				/>
				<NodeEditor
					//TODO search node from selectedNodeId
					node={selectedNode}
					save={() => this.handleSaveSelectedNode}
				/>
			</div>
		)
	}
}
