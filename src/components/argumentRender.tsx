import React from "react"
import { 
	Node, 
	Argument, 
	NodeType,
	Statement 
} from "../data/argument/argument"

interface ArgumentRenderProps {
	argument: Argument
	selectedNodeId: number
}

export default class ArgumentRender extends React.Component<ArgumentRenderProps> {
	  

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
		}
		return(
			<div className="tree">
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
