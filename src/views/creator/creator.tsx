import React from "react"
import { GlobalHotKeys } from "react-hotkeys"

import * as api from "../../api"
import {
	Argument,
	createEmptyArgument,
	createEmptyStatement,
	createEmptyFact,
	createEmptySource,
	Node,
	NodeType,
	getNextNodeId,
	substituteNodeInArgument,
	findNodeById,
	findFirstChildren,
	parseArgument
} from "../../data/argument/argument"
import ArgumentRender from "../../components/argumentRender"
import NodeEditor from "../../components/nodeEditor"

import "./style.scss"

const keyMap = {
	UP: "ArrowUp",
	DOWN: "ArrowDown",
	LEFT: "ArrowLeft",
	RIGHT: "ArrowRight",
}

function mod(n, m) {
	return ((n % m) + m) % m;
}

interface CreatorProps { }

interface CreatorState {
	loading: boolean
	selectedNode: Node | null
	argument?: Argument
	editing: boolean
}

export default class Creator extends React.Component<CreatorProps, CreatorState> {
	state: CreatorState = {
		loading: true,
		selectedNode: null,
		editing: false
	}

	componentDidMount() {
		api.create().then((id: number) => {
			const argument = createEmptyArgument(id)
			this.setState({
				loading: false,
				argument: argument,
				selectedNode: argument.root,
				editing: true
			})
		})
	}

	handleSaveLink = () => {
		const argument = this.state.argument as Argument
		let queryString = JSON.stringify(parseArgument(argument))
		let link = window.location.host + "/" + queryString
		alert(link)
	}

	// TODO: DRY handlers
	handleNavigateUp = () => {
		let argument = this.state.argument as Argument
		let selectedNode = this.state.selectedNode as Node
		if(selectedNode.parentId == -1)
			return
		const parent = findNodeById(argument, selectedNode.parentId)
		switch(parent.type) {
			case NodeType.STATEMENT:
				if(parent.children.length >= 1) {
					const selectedIndex = parent.children.findIndex(child => child.id === selectedNode.id)
					const siblingIndex = mod(selectedIndex-1, parent.children.length)
					console.log(siblingIndex)
					console.log(parent)
					this.setState({
						selectedNode: parent.children[siblingIndex] as Node
					}) 
				}
				return
			case NodeType.FACT:
				if(parent.sources.length >= 1) {
					const selectedIndex = parent.sources.findIndex(child => child.id === selectedNode.id)
					const siblingIndex = mod(selectedIndex-1, parent.sources.length)
					this.setState({
						selectedNode: parent.sources[siblingIndex] as Node
					}) 
				}
				return
		}
	}

	handleNavigateDown = () => {
		let argument = this.state.argument as Argument
		let selectedNode = this.state.selectedNode as Node
		if(selectedNode.parentId == -1)
			return
		const parent = findNodeById(argument, selectedNode.parentId)
		switch(parent.type) {
			case NodeType.STATEMENT:
				if(parent.children.length >= 1) {
					const selectedIndex = parent.children.findIndex(child => child.id === selectedNode.id)
					const siblingIndex = mod(selectedIndex+1, parent.children.length)
					console.log(siblingIndex)
					console.log(parent)
					this.setState({
						selectedNode: parent.children[siblingIndex] as Node
					}) 
				}
				return
			case NodeType.FACT:
				if(parent.sources.length >= 1) {
					const selectedIndex = parent.sources.findIndex(child => child.id === selectedNode.id)
					const siblingIndex = mod(selectedIndex+1, parent.sources.length)
					this.setState({
						selectedNode: parent.sources[siblingIndex] as Node
					}) 
				}
				return
		}
	}


	handleNavigateLeft = () => {
		let selectedNode = this.state.selectedNode as Node
		if(selectedNode.type === NodeType.SOURCE)
			return
		switch(selectedNode.type) {
			case NodeType.STATEMENT:
				if(selectedNode.children.length >= 1) {
					this.setState({
						selectedNode: selectedNode.children[0] as Node
					}) 
				}
				return
			case NodeType.FACT:
				if(selectedNode.sources.length >= 1) {
					this.setState({
						selectedNode: selectedNode.sources[0] as Node
					}) 
				}
				return
		}
	}

	handleNavigateRight = () => {
		let argument = this.state.argument as Argument
		let selectedNode = this.state.selectedNode as Node
		if(selectedNode.parentId == -1)
			return
		const parent = findNodeById(argument, selectedNode.parentId)
		this.setState({
			selectedNode: parent as Node
		}) 
	}

	handleChangeMode = (editing: boolean) => {
		this.setState({
			editing
		})
	}

	handleChangeSelectedNode = (node: Node) => {
		if(this.state.selectedNode != null && this.state.selectedNode.sentence === "") {
			return
		}
		this.setState({
			selectedNode: node
		})
	}

	handleSaveSelectedNode = (sentence: string, type: NodeType, childType: NodeType | null, isSibling: boolean, href?: string, description?: string) => {
		let argument = {...this.state.argument} as Argument
		let selectedNode = this.state.selectedNode as Node

		if(isSibling) {
			selectedNode = findNodeById(argument, selectedNode.parentId)
		}

		// create childNode if exists
		let childNode
		if (childType != null) {
			switch(childType) {
				case NodeType.STATEMENT: {
					console.log("Creating new statement")
					childNode = createEmptyStatement(getNextNodeId(), selectedNode.id)
					break
				}
				case NodeType.FACT: {
					console.log("Creating new fact")
					childNode = createEmptyFact(getNextNodeId(), selectedNode.id)
					break
				}
				case NodeType.SOURCE: {
					console.log("Creating new source")
					childNode = createEmptySource(getNextNodeId(), selectedNode.id)
					break
				}
			}
		}

		// if creating sibling, node is a copy of parent. Else, node is copy of whatever we're doing with selectedNode
		type = isSibling ? selectedNode.type : type
		let node
		switch(type) {
			case NodeType.STATEMENT: {
				node = createEmptyStatement(selectedNode.id, selectedNode.parentId)
				node.children = selectedNode.type == NodeType.STATEMENT ? selectedNode.children : []
				if (childType != null) {
					console.log("Pushing child to node.children")
					node.children.push(childNode)
				}
				break
			}
			case NodeType.FACT: {
				node = createEmptyFact(selectedNode.id, selectedNode.parentId)
				node.sources = selectedNode.type == NodeType.FACT ? selectedNode.sources : []
				if (childType != null) {
					console.log("Pushing child to node.sources")
					node.sources.push(childNode)
				}
				break
			}
			case NodeType.SOURCE: {
				node = createEmptySource(selectedNode.id, selectedNode.parentId)
				node.href = href
				node.description = description
				break
			}
		}
		node.sentence = isSibling ? selectedNode.sentence : sentence

		substituteNodeInArgument(argument, node, false)

		if (childType != null) {
			this.updateArgumentAndNode(argument, childNode)
		} else {
			this.updateArgumentAndNode(argument, node)
		}
	}

	handleDeleteSelectedNode = () => {
		let argument = {...this.state.argument} as Argument
		let node = this.state.selectedNode as Node
		// delete from argument
		substituteNodeInArgument(argument, node, true)
		
		let parent = findNodeById(argument, node.parentId)
		let newNode = findFirstChildren(parent)
		if (newNode == null) {
			// change parent type if it has no more children
			// parent must always be statement or fact because it had children (sources don't have children)
			newNode = createEmptyStatement(parent.id, parent.parentId)
			newNode.sentence = parent.sentence
			substituteNodeInArgument(argument, newNode, false)
		}
		this.updateArgumentAndNode(argument, newNode)
	}

	updateArgumentAndNode(argument: Argument, node: Node) {
		this.setState({
			selectedNode: node,
			argument: argument
		})
	}

	getHotKeyHandlers() {
		return {
			UP: this.handleNavigateUp,
			LEFT: this.handleNavigateLeft,
			RIGHT: this.handleNavigateRight,
			DOWN: this.handleNavigateDown,
		}
	}

	render() {
		if (this.state.loading) {
			return <div className="loading">LOADING</div>
		}

		let argument = this.state.argument as Argument
		let selectedNode = this.state.selectedNode as Node
		const editing = this.state.editing
		return (
			<div className="creator-component">
			<GlobalHotKeys keyMap = {keyMap} handlers={this.getHotKeyHandlers()} allowChanges={true} >

				<ArgumentRender
					editing={editing} 
					argument={argument} 
					selectedNodeId={selectedNode.id}
					changeSelected={this.handleChangeSelectedNode}
				/>
				<NodeEditor
					editing={editing} 
					node={selectedNode}
					save={this.handleSaveSelectedNode}
					onChangeMode={this.handleChangeMode}
					erase={this.handleDeleteSelectedNode}
					saveLink={this.handleSaveLink}
				/>
				</GlobalHotKeys>
			</div>
		)
	}
}
