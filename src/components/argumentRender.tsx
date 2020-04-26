import React from "react"
import { 
	Node,
	Fact, 
	Argument, 
	NodeType,
	Statement,
	Source
} from "../data/argument/argument"

import "./argumentRenderer.scss"

interface ArgumentRenderProps {
	argument: Argument
	selectedNodeId: number
	editing: boolean
	changeSelected: (node: Node) => void
}

export default class ArgumentRender extends React.Component<ArgumentRenderProps> {

	renderSource(source: Source) {
		const selectedClass = source.id === this.props.selectedNodeId ? "selected" : ""
		return (
			<>
			<div 
				key={source.id} 
				className={`source ${selectedClass}`} 
				onClick={() => this.props.changeSelected(source)}
			>
			<div className="sentence">
				<a href={source.href}><div className="title" >{source.sentence}</div></a>
			</div>
			</div>
			</>
		)
	}


	renderFact(fact: Fact) {
		const selectedClass = fact.id === this.props.selectedNodeId ? "selected" : ""
		const multipleChildClass = fact.sources.length > 1 ? "multiple" : ""
		return (
			<>
			<div 
				className={`root fact ${selectedClass}`}
				onClick={() => this.props.changeSelected(fact)}
			>
				<div className="sentence">{fact.sentence}</div>
			</div>
			<div className={`children ${multipleChildClass}`}>

			{
				fact.sources.map(child => this.renderSource(child))
			}
			</div>
			</>
		)
	}

	renderStatement(st: Statement) {
		const selectedClass = st.id === this.props.selectedNodeId ? "selected" : ""
		const multipleChildClass = st.children.length > 1 ? "multiple" : ""
		return (
			<>
			<div 
				className={`root statement ${selectedClass}`}
				onClick={() => this.props.changeSelected(st)}
			>
				<div className="sentence">{st.sentence}</div>
			</div>
			{
				st.children.length > 0 &&
				<div className={`children ${multipleChildClass}`}>
				{
					st.children.map(child => this.renderTree(child))
				}
				</div>
			}
			</>
		)
	}

	renderTree(node: Node) {
		let content
		switch(node.type) {
			case NodeType.STATEMENT:
				content = this.renderStatement(node)
				break
			case NodeType.FACT:
				content = this.renderFact(node)
				break
		}
		return(
			<div key={node.id} className="tree">
				{content}
			</div>
		)
	}
 	render() {
		let { argument } = this.props
		return (
			<div className="argument-renderer-component">
				{this.renderTree(argument.root)}
			</div>
		)
	}
}
