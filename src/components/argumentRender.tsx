import React from "react"
import { 
	Node,
	Fact, 
	Argument, 
	NodeType,
	Statement,
	Source
} from "../data/argument/argument"

interface ArgumentRenderProps {
	argument: Argument
	selectedNodeId: number
}

export default class ArgumentRender extends React.Component<ArgumentRenderProps> {
	  

	renderSource(source: Source) {
		return (
			<>
			<div key={source.id} className="source">
				{source.sentence}
				{source.href}
				{source.description}
			</div>
			</>
		)
	}


	renderFact(fact: Fact) {
		return (
			<>
			<div className="root fact">
				{fact.sentence}
			</div>
			<div className="children">
			{
				fact.sources.map(child => this.renderSource(child))
			}
			</div>
			</>
		)
	}

	renderStatement(st: Statement) {
		return (
			<>
			<div className="root statement">
				{st.sentence}
			</div>
			{
				st.children &&
				<div className="children">
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
			<div className="argument-component">
				{this.renderTree(argument.root)}
			</div>
		)
	}
}
