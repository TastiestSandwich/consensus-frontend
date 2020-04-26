import React from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { 
	Node, 
	NodeType, 
	findChildrenCount, 
	Source 
} from "../data/argument/argument"

import "./nodeEditor.scss"

const editingKeyMap = {
	CONFIRM: "Enter",
}

const infoKeyMap = {
	ADD_SIBLING: "enter",
	ADD_CHILD_STATEMENT: "tab",
	ADD_CHILD_SOURCE: "shift+tab",
	EDIT: "backspace",
	NAVIGATE: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
}

interface NodeEditorProps {
	editing: boolean
	node: Node
	save: (sentence: string, type: NodeType, childType: NodeType | null, isSibling: boolean, href?: string, description?: string) => void
	onChangeMode: (editing: boolean) => void
}

export default class NodeEditor extends React.Component<NodeEditorProps> {

	updateSentence = (sentence: string) => {
		const node = this.props.node
		if (node.type === NodeType.SOURCE) {
			this.props.save(sentence, node.type, null, false, node.href, node.description)
		} else {
			this.props.save(sentence, node.type, null, false)
		} 
	}

	updateHref = (href: string) => {
		const node = this.props.node as Source
		this.props.save(node.sentence, node.type, null, false, href, node.description)
	}

	updateDescription = (description: string) => {
		const node = this.props.node as Source
		this.props.save(node.sentence, node.type, null, false, node.href, description)
	}

	updateType = (type: NodeType) => {
		const node = this.props.node
		if (type === node.type) {
			return
		}
		if (node.type === NodeType.SOURCE) {
			this.props.save(node.sentence, type, null, false, node.href, node.description)
		} else {
			this.props.save(node.sentence, type, null, false)
		}
	}

	addSourceChild = () => {
		const node = this.props.node
		const childrenCount = findChildrenCount(node)
		switch(node.type) {
			case NodeType.STATEMENT: {
				if (childrenCount > 0) {
					console.log("Can't add source children to statement with children")
					return
				} else {
					console.log("Updating statement node to fact and adding source child")
					this.props.save(node.sentence, NodeType.FACT, NodeType.SOURCE, false)
				}
				break
			}
			case NodeType.FACT: {
				console.log("Adding source child to Fact")
				this.props.save(node.sentence, NodeType.FACT, NodeType.SOURCE, false)
				break
			}
			case NodeType.SOURCE: {
				console.log("Can't add childs to sources")
				return
			}
		}
	}

	addStatementChild = () => {
		const node = this.props.node
		const childrenCount = findChildrenCount(node)
		switch (node.type) {
			case NodeType.STATEMENT: {
				console.log("Adding statement child to Statement")
				this.props.save(node.sentence, NodeType.STATEMENT, NodeType.STATEMENT, false)
				break
			}
			case NodeType.FACT: {
				if (childrenCount > 0) {
					console.log("Can't add statement children to fact with children")
					return
				} else {
					console.log("Updating fact node to statement and adding statement child")
					this.props.save(node.sentence, NodeType.STATEMENT, NodeType.STATEMENT, false)
				}
				break
			}
			case NodeType.SOURCE: {
				console.log("Can't add childs to sources")
				return
			}
		}
	}

	addSibling = () => {
		console.log("add sibling")
		const node = this.props.node

		if (node.type === NodeType.STATEMENT || node.type === NodeType.FACT) {
			console.log("Adding statement sibling")
			this.props.save(node.sentence, node.type, NodeType.STATEMENT, true)

		} else if (node.type === NodeType.SOURCE) {
			console.log("Adding source sibling")
			this.props.save(node.sentence, node.type, NodeType.SOURCE, true)
		}
	}

	getHotKeyHandlers() {
		return {
			CONFIRM: this.handleConfirm,
			ADD_SIBLING: this.handleAddSibling,
			ADD_CHILD_STATEMENT: this.handleAddChildStatement,
			ADD_CHILD_SOURCE: this.handleAddChildSource,
			EDIT: this.handleEdit,
			NAVIGATE: this.handleNavigation
		}
	}

	handleConfirm = () => {
		console.log("Keypress [Enter] handler [CONFIRM]")
		this.props.onChangeMode(false)
	}

	handleAddSibling = () => {
		this.addSibling()
		this.props.onChangeMode(true)
	}

	handleAddChildStatement = () => {
		this.addStatementChild()
		this.props.onChangeMode(true)
	}

	handleAddChildSource = () => {
		this.addSourceChild()
		this.props.onChangeMode(true)
	}

	handleEdit = () => {
		this.props.onChangeMode(true)
	}

	handleNavigation = () => {
		//TODO
		console.log("Not implemented yet")
	}

	handleUpdateSentence = (e) => {
		this.updateSentence(e.target.value)
	}

	renderEditingText(node: Node) {
		if(node.parentId === -1) {
			return "Start by writing the conclusion of your argument"
		} else if (node.type === NodeType.SOURCE) {
			return "Insert a source"
		}

		return "Write an statement"
	}

	renderEditingInstructions(node: Node) {
		return(
			<div className="node-editor__instructions">
				<div className="node-editor__keyline">
					Press 
					<span className="key" onClick={this.handleConfirm}> Return </span> 
					to confirm
				</div>
				{
					node.type === NodeType.SOURCE &&
					<div className="node-editor__keyline">Press <span className="key"> Tab </span> to focus next input </div>
				}
			</div>
		)
	}

	renderNoEditingInstructions(node: Node) {
		return(
			<div className="node-editor__instructions">
				{
					// Root has no siblings
					node.parentId !== -1 &&
					(
						node.type === NodeType.SOURCE 
							? <div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddSibling}> Return </span> to add a sibling source</div>
							: <div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddSibling}> Return </span> to add a sibling statement</div>
					)  
				}
				<div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddChildStatement}> TAB </span> to add a child statement</div>
				<div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddChildSource}> SHIFT </span> + <span className="key" onClick={this.handleAddChildSource}> TAB </span> to add a child source</div>
				<div className="node-editor__keyline">Press <span className="key" onClick={this.handleEdit}> Backspace </span> to edit the selected node</div>
				<div className="node-editor__keyline">
					Use 
					<span className="key"> Up </span> 
					<span className="key"> Left </span> 
					<span className="key"> Right </span> 
					<span className="key"> Down </span> 
					to navigate
				</div>
			</div>
		)
	}

	renderEditing(node: Node) {
		return(
			<div className="node-editor__actions">
				<div className="node-editor__message">
					{this.renderEditingText(node)}
				</div>
				<div className="node-editor__input-group">
					<input className="node-editor__sentence-input"
						value = {this.props.node.sentence}
						onChange = {this.handleUpdateSentence}
					/>
					{
						node.type === NodeType.SOURCE &&
						<>
						<input className="node-editor__href-input"
							value = {node.href}
							onChange = {e => this.updateHref(e.target.value)}
						/>
						<input className="node-editor__description-input"
							value = {node.description}
							onChange = {e => this.updateDescription(e.target.value)}
						/>
						</>
					}
				</div>
				{this.renderEditingInstructions(node)}
			</div>
		)
	}

	renderInfo(node: Node) {
		return(
			<div className="node-editor__actions">
				{this.renderNoEditingInstructions(node)}
			</div>
		)
	}

	render() {
		const {node, editing} = this.props
		const keymap = editing ? editingKeyMap : infoKeyMap
		return(
			<GlobalHotKeys keyMap = {keymap} handlers={this.getHotKeyHandlers()} allowChanges={true} >
				<div className="node-editor-component">
				{
					editing
						? this.renderEditing(node)
						: this.renderInfo(node)
				}
				</div>
			</GlobalHotKeys>

		)
	}

}