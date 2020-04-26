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
	ERASE: "del",
	TOGGLE_LEGEND: "h",
  SAVE: "s"
}

interface NodeEditorProps {
	editing: boolean
	node: Node
	save: (sentence: string, type: NodeType, childType: NodeType | null, isSibling: boolean, href?: string, description?: string) => void
	onChangeMode: (editing: boolean) => void
  erase: () => void
  saveLink: () => void
}

interface NodeEditorState {
	errorMessage: string
	showLegend: boolean
}

export default class NodeEditor extends React.Component<NodeEditorProps, NodeEditorState> {
	state= {
		errorMessage: "",
		showLegend: true
	}
	updateSentence = (sentence: string) => {
		this.setState({errorMessage: ""})
		const node = this.props.node
		if (node.type === NodeType.SOURCE) {
			this.props.save(sentence, node.type, null, false, node.href, node.description)
		} else {
			this.props.save(sentence, node.type, null, false)
		} 
	}

	updateHref = (href: string) => {
		this.setState({errorMessage: ""})
		const node = this.props.node as Source
		this.props.save(node.sentence, node.type, null, false, href, node.description)
	}

	updateDescription = (description: string) => {
		this.setState({errorMessage: ""})
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
			ERASE: this.handleDelete,
			TOGGLE_LEGEND: this.handleShowLegend,
      SAVE: this.handleLink
		}
	}

  handleLink = () => {
    this.props.saveLink()
  }

  handleDelete = () => {
    // can't delete root
    if(this.props.node.parentId === -1) {
      return
    }
    this.props.erase()
    this.props.onChangeMode(false)
  }

	handleConfirm = () => {
		const {node} = this.props
		if(node.sentence.length === 0) {
			this.setState({
				errorMessage: "Please, write a statement to continue"
			})
			return
		}
		if(node.type === NodeType.SOURCE) {
			if(node.href.length === 0) {
				this.setState({
					errorMessage: "Please, provide the URL where the information can be found"
				})
				return
			}
		}
		this.props.onChangeMode(false)
	}

	handleAddSibling = () => {
		if(this.props.node.parentId === -1)
			return
		this.addSibling()
		this.props.onChangeMode(true)
	}

	handleAddChildStatement = (e) => {
		e.preventDefault()
		if(this.props.node.type === NodeType.SOURCE)
			return
		this.addStatementChild()
		this.props.onChangeMode(true)
	}

	handleAddChildSource = (e) => {
		e.preventDefault()
		if(this.props.node.type === NodeType.SOURCE)
			return
		this.addSourceChild()
		this.props.onChangeMode(true)
	}

	handleEdit = () => {
		this.props.onChangeMode(true)
	}

	handleUpdateSentence = (e) => {
		this.updateSentence(e.target.value)
	}

	handleShowLegend = () => {
		this.setState((prev) => {
			return {
				showLegend: !prev.showLegend
			}
		})
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
		const {showLegend} = this.state
		const hiddenClass = showLegend ? "" : "hidden"
		const isRoot = node.parentId === -1
		return(
			<div className="node-editor__instructions">
				<div className={hiddenClass}>
				{
					// Root has no siblings
					!isRoot &&
					(
						node.type === NodeType.SOURCE 
							? <div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddSibling}> Return </span> to add a sibling source</div>
							: <div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddSibling}> Return </span> to add a sibling statement</div>
					)  
				}
				{
					// Source has no children
					node.type !== NodeType.SOURCE &&
					<>
						<div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddChildStatement}> TAB </span> to add a child statement</div>
						<div className="node-editor__keyline">Press <span className="key" onClick={this.handleAddChildSource}> SHIFT </span> + <span className="key" onClick={this.handleAddChildSource}> TAB </span> to add a child source</div>
					</>
				}
				<div className="node-editor__keyline">Press <span className="key" onClick={this.handleEdit}> Backspace </span> to edit the selected node</div>
				{
				  	
				  	// Can't delete Root
					!isRoot &&
					<div className="node-editor__keyline">Press <span className="key" onClick={this.handleDelete}> DEL </span> to delete the selected node</div>
				}
				<div className="node-editor__keyline">
					Use 
					<span className="key"> Up </span> 
					<span className="key"> Left </span> 
					<span className="key"> Right </span> 
					<span className="key"> Down </span> 
					to navigate
				</div>
				</div>
				<div className="node-editor__keyline">Press <span className="key" onClick={this.handleShowLegend}> H </span> to toggle ON/OFF this legend</div>
        <div className="node-editor__keyline">Press <span className="key" onClick={this.handleShowLegend}> S </span> to save your argument</div>
			</div>

		)
	}

	autoFocus = (input) => {
		setTimeout(() => {
			input && input.focus()
		}, 200)
	}

	renderEditingSource(node: Source) {
		return (
			<div className="node-editor__edit-source">
				<div className="node-editor__left">
					<input ref={this.autoFocus} className="node-editor__sentence-input"
						value = {this.props.node.sentence}
						onChange = {this.handleUpdateSentence}
					/>
					<input className="node-editor__href-input"
						value = {node.href}
						placeholder = "http://"
						onChange = {e => this.updateHref(e.target.value)}
					/>
				</div>
				<div className="node-editor__right">
					<textarea className="node-editor__description-input"
						value = {node.description}
						placeholder="Summary of the content (optional)"
						onChange = {e => this.updateDescription(e.target.value)}
					/>
				</div>
			</div>
		)
	}

	renderEditingSentence(node: Node) {
		return(
			<div className="node-editor__input-group">
				<input ref={this.autoFocus} className="node-editor__sentence-input"
					value = {node.sentence}
					onChange = {this.handleUpdateSentence}
				/>
			</div>
		)
	}

	renderEditing(node: Node) {
		return(
			<div className="node-editor__actions">
				<div className="node-editor__message">
					{this.renderEditingText(node)}
				</div>
				{
					this.state.errorMessage &&
					<div className="node-editor__error">
						{this.state.errorMessage}
					</div>
				}
				{
					node.type === NodeType.SOURCE 
						? this.renderEditingSource(node)
						: this.renderEditingSentence(node)
				}
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
		const editingClass = editing? "editing" : ""
		return(
			<GlobalHotKeys keyMap = {keymap} handlers={this.getHotKeyHandlers()} allowChanges={true} >
				<div className={`node-editor-component ${editingClass} `}>
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