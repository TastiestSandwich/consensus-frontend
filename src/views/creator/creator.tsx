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

import "./style.scss"

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

	updateArgumentAndNode(argument: Argument, node: Node) {
		this.setState({
			selectedNode: node,
			argument: argument
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
				break
			}
			case NodeType.FACT: {
				node = createEmptyFact(selectedNode.id)
				node.sources = selectedNode.type == NodeType.FACT ? selectedNode.sources : []
				break
			}
			case NodeType.SOURCE: {
				node = createEmptySource(selectedNode.id)
				node.href = href
				node.description = description
				break
			}
		}
		node.sentence = sentence

		//TODO find node by id
		argument.root = node

		this.updateArgumentAndNode(argument, node)
	}

	render() {
		if (this.state.loading) {
			return <div className="loading">I AM LOADING</div>
		}

		//let argument = this.state.argument as Argument
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
						children: []
					}
				]
			}
		}
		
		let selectedNode = argument.root

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
