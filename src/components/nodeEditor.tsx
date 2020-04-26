import React from "react"
import { 
	Node, 
	NodeType, 
//	findChildrenCount, 
	Source 
} from "../data/argument/argument"

import "./nodeEditor.scss"

interface NodeEditorProps {
	editing: boolean
	node: Node
	save: (sentence: string, type: NodeType, childType: NodeType | null, isSibling: boolean, href?: string, description?: string) => void
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
/*
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
		this.handleNextStep()
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
		this.handleNextStep()
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
		this.handleNextStep()
	}

	renderNodePreview() {
		const node = this.props.node
		const childrenCount = findChildrenCount(node)

		return(
			<div className="node-editor__node-preview">
			<div className="node-editor__sentence">
			{ node.sentence }
			</div>
			<div className="node-editor__children-count">
			{ childrenCount }
			</div>
			<div className="node-editor__type">
			{ NodeType[node.type] }
			</div>
			{
				node.type === NodeType.SOURCE &&
				<div>
				<div className="node-editor__href">
				{ node.href }
				</div>
				<div className="node-editor__description">
				{ node.description }
				</div>
				</div>  
			}
			</div>
			)
	}

	renderSentenceStep() {
		return(
			<div className="node-editor__actions">
			<div className="node-editor__message">
			Add a sentence
			</div>
			<input className="node-editor__sentence-input"
			value = {this.props.node.sentence}
			onChange = {e => this.updateSentence(e.target.value)}
			/>
			</div>
			)
	}

	renderHrefStep() {
		const node = this.props.node
		if (node.type !== NodeType.SOURCE) {
			return
		}
		return(
			<div className="node-editor__actions">
			<div className="node-editor__message">
			Add a link
			</div>
			<input className="node-editor__href-input"
			value = {node.href}
			onChange = {e => this.updateHref(e.target.value)}
			/>
			</div>
			)
	}

	renderDescriptionStep() {
		const node = this.props.node
		if (node.type !== NodeType.SOURCE) {
			return
		}
		return(
			<div className="node-editor__actions">
			<div className="node-editor__message">
			Add a description
			</div>
			<input className="node-editor__description-input"
			value = {node.description}
			onChange = {e => this.updateDescription(e.target.value)}
			/>
			</div>
			)
	}

	renderAddNodeStep() {
		const childrenCount = findChildrenCount(this.props.node)
		let childSource : boolean = true
		let childStatement : boolean = true
		let sibling : boolean = true

		if (this.props.node.type === NodeType.SOURCE) {
			// Sources can't have childs
			childSource = false
			childStatement = false
		} else if (this.props.node.type === NodeType.STATEMENT && childrenCount > 0) {
			// Statement with childs can only have statement childs
			childSource = false
		} else if (this.props.node.type === NodeType.FACT && childrenCount > 0) {
			// Facts with childs can only have source childs
			childStatement = false
		} else if (this.props.node.parentId === -1) {
			sibling = false
		}

		return(
			<div className="node-editor__actions">
			<div className="node-editor__message">
			Add a Child or a Sibling
			</div>
			<div className="node-editor__add-node-buttons">
			{ childSource && 
				<button 
				className="node-editor__child-source-button"
				onClick={this.addSourceChild}>
				ADD SOURCE
				</button> 
			}
			{ childStatement && 
				<button 
				className="node-editor__child-statement-button"
				onClick={this.addStatementChild}>
				ADD STATEMENT
				</button> 
			}
			{
				sibling &&
				<button 
				className="node-editor__sibling-button"
				onClick={this.addSibling}>
				ADD SIBLING
				</button>
			}
			</div>
			</div>
			)
	}

	renderNextStepButton() {
		return(
			<div className="node-editor__next-step">
			<div className="node-editor__current-step">
			{ EditorStep[this.state.step] }
			</div>
			<button className="node-editor__next-step-button" onClick={this.handleNextStep}>NEXT</button>
			</div>
			)
	}

	renderEditorActions() {
		switch(this.state.step) {
			case EditorStep.SENTENCE: {
				return this.renderSentenceStep()
			}
			case EditorStep.ADDNODE: {
				return this.renderAddNodeStep()
			}
			case EditorStep.HREF: {
				return this.renderHrefStep()
			}
			case EditorStep.DESCRIPTION: {
				return this.renderDescriptionStep()
			}
			default: {
				return this.renderSentenceStep()
			}
		}
	}
*/
	handleUpdateSentence = (e) => {
		this.updateSentence(e.target.value)
	}

	renderEditingText(node: Node) {
		if(node.parentId === -1) {
			return "Start by writing the conclusion of your argument"
		} else if (node.type === NodeType.SOURCE) {
			return "Insert a source"
		}

		return "Write an affirmation"
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
			</div>
		)
	}

	renderInfo(node: Node) {
		return null
	}

	render() {
		const {node, editing} = this.props
		return(
			<div className="node-editor-component">
			{
				editing
					? this.renderEditing(node)
					: this.renderInfo(node)
			}
			</div>
		)
	}

}