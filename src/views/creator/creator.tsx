import React from "react"
import * as api from "../../api"
import {
	Argument,
	createEmptyArgument,
	createEmptyStatement,
	createEmptyFact,
	createEmptySource,
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
		let selectedNode = this.state.selectedNode as Node

		let node
		switch(type) {
			case NodeType.STATEMENT: {
				node = createEmptyStatement(selectedNode.id)
				node.children = selectedNode.type == NodeType.STATEMENT ? selectedNode.children : []
			}
			case NodeType.FACT: {
				node = createEmptyFact(selectedNode.id)
				node.sources = selectedNode.type == NodeType.FACT ? selectedNode.sources : []
			}
			case NodeType.SOURCE: {
				node = createEmptySource(selectedNode.id)
				node.href = href
				node.description = description
			}
		}
		node.sentence = sentence

		//TODO find node by id
		argument.root = node

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
		let selectedNode = this.state.selectedNode as Node

		return (
			<div className="creator-component">
				<ArgumentRender 
					argument={argument} 
					selectedNodeId={selectedNode.id} 
				/>
				<NodeEditor
					node={selectedNode}
					save={(sentence: string, type: NodeType, href: string, description: string) => this.handleSaveSelectedNode(sentence, type, href, description)}
				/>
			</div>
		)
	}
}
