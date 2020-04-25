import React from "react"
import { Node, NodeType } from "../data/argument/argument"


interface NodeReviewerProps {
    node: Node
}

export default class NodeReviewer extends React.Component<NodeReviewerProps>{
    render() {
        let { node } = this.props
        return (
            <React.Fragment>
                <div>
                    <p>{node.sentence}</p>
                </div>
                {
                    node.type === NodeType.SOURCE &&
                    <div>{node.href}</div>
                }
                <button>Yes</button>
                <button>No</button>
            </React.Fragment>
        )
    }


}

