import React from "react"
import { Node, NodeType, NodeReview } from "../data/argument/argument"


export enum ReviewerStep {
  REVIEW,
  IMPLICATION,
  FINISHED
}

interface NodeReviewerProps {
    node: Node
    step: ReviewerStep
    review: (review: NodeReview) => void
}

export default class NodeReviewer extends React.Component<NodeReviewerProps>{

  handleYes = () => {
    this.props.review(NodeReview.YES)
  }

  handleNo = () => {
    this.props.review(NodeReview.NO)
  }

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
      { node.review != undefined && 
        <>
          <div className="node-reviewer__review-message">
          Do you agree with this statement?
          </div>
          <div className="node-reviewer__review-value">
          { NodeReview[node.review] }
          </div>
        </>
      }
      { node.implicationReview != undefined &&
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
          <button className="node-reviewer__review-action-yes"
          onClick={this.handleYes}>
          { NodeReview[NodeReview.YES]}
          </button>
          <button className="node-reviewer__review-action-no"
          onClick={this.handleNo}>
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
        Do this statement's children imply the statement?
        </div>
        <div className="node-reviewer__implication-action-buttons">
          <button className="node-reviewer__implication-action-yes"
          onClick={this.handleYes}>
          { NodeReview[NodeReview.YES]}
          </button>
          <button className="node-reviewer__implication-action-no"
          onClick={this.handleNo}>
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
      case ReviewerStep.FINISHED: {
        return (
          <div>FINISHED</div>
        )
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

