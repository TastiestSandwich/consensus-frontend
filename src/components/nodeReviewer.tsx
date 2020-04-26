import React from "react"
import { Node, NodeType, NodeReview } from "../data/argument/argument"
import { GlobalHotKeys } from "react-hotkeys"

import "./nodeReviewer.scss"

const keyMap = {
  NO: "n",
  YES: "y"
}

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
          <div className="node-editor__keyline">No <span className="key no" onClick={this.handleNo}> N </span> </div>
          <div className="node-editor__keyline">Yes <span className="key yes" onClick={this.handleYes}> Y </span> </div>
            
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
          <div className="node-editor__keyline">No <span className="key no" onClick={this.handleNo}> N </span> </div>
          <div className="node-editor__keyline">Yes <span className="key yes" onClick={this.handleYes}> Y </span> </div>
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

  getHotKeyHandlers() {
    return {
      NO: this.handleNo,
      YES: this.handleYes
    }
  }

  render() {
    return (
      <div className="node-reviewer-component">
      <GlobalHotKeys keyMap = {keyMap} handlers={this.getHotKeyHandlers()} allowChanges={true} >

        {/* this.renderNodePreview() */}
        { this.renderNodeReview() }
        { this.renderReviewerActions() }
        </GlobalHotKeys>
      </div>
    )
  }
}

