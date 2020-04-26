import React from "react"
import { Node, NodeType, NodeReview } from "../data/argument/argument"


export enum ReviewerStep {
  REVIEW,
  IMPLICATION
}

interface NodeReviewerProps {
    node: Node
    step: ReviewerStep
}

export default class NodeReviewer extends React.Component<NodeReviewerProps>{

  renderNodePreview() {
    const node = this.props.node
    return(
      <div className="node-reviewer__node-preview">
        <div className="node-reviewer__sentence">
          { node.sentence }
        </div>
        <div className="node-reviewer__type">
          { NodeType[node.type] }
        </div>
        {
          node.type === NodeType.SOURCE &&
          <div>
            <div className="node-reviewer__href">
            { node.href }
            </div>
            <div className="node-reviewer__description">
            { node.description }
            </div>
          </div>  
        }
      </div>
    )
  }

  renderNodeReview() {
    const node = this.props.node
    return(
      <div className="node-reviewer__node-review">
      { node.review && 
        <>
          <div className="node-reviewer__review-message">
          Do you agree with this statement?
          </div>
          <div className="node-reviewer__review-value">
          { NodeReview[node.review] }
          </div>
        </>
      }
      { node.implicationReview &&
        <>
          <div className="node-reviewer__implication-message">
          Do this statement's children imply the statement?
          </div>
          <div className="node-reviewer__implication-value">
          { NodeReview[node.implicationReview] }
          </div>
        </>
      }
      </div>
    )
  }

  renderReviewAction() {
    return(
      <div className="node-reviewer__review-action">
        <div className="node-reviewer__review-action-message">
        Do you agree with this statement?
        </div>
        <div className="node-reviewer__review-action-buttons">
          <button className="node-reviewer__review-action-yes">
          { NodeReview[NodeReview.YES]}
          </button>
          <button className="node-reviewer__review-action-no">
          { NodeReview[NodeReview.NO]}
          </button>
        </div>
      </div>
    )
  }

  renderImplicationAction() {
    return(
      <div className="node-reviewer__implication-action">
        <div className="node-reviewer__implication-action-message">
        Do you agree with this statement?
        </div>
        <div className="node-reviewer__implication-action-buttons">
          <button className="node-reviewer__implication-action-yes">
          { NodeReview[NodeReview.YES]}
          </button>
          <button className="node-reviewer__implication-action-no">
          { NodeReview[NodeReview.NO]}
          </button>
        </div>
      </div>
    )
  }

  renderReviewerActions() {
    switch(this.props.step){
      case ReviewerStep.REVIEW: {
        return this.renderReviewAction()
      }
      case ReviewerStep.IMPLICATION: {
        return this.renderImplicationAction()
      }
    }
  }

  render() {
    return (
      <div className="node-reviewer">
        { this.renderNodePreview() }
        { this.renderNodeReview() }
        { this.renderReviewerActions() }
      </div>
    )
  }
}

