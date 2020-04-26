import React from 'react';
import NodeReviewer, { ReviewerStep } from '../../components/nodeReviewer';
import { Node, Argument, NodeReview, substituteNodeInArgument } from "../../data/argument/argument"
import ArgumentRender from "../../components/argumentRender"
import * as api from "../../api"

interface ViewerProps {
}

interface ViewerState {
  loading: boolean
  selectedNode: Node | null
  argument?: Argument
  reviewerStep: ReviewerStep
}



export default class Viewer extends React.Component<ViewerProps, ViewerState> {

  state: ViewerState = {
    loading: true,
    selectedNode: null,
    reviewerStep: ReviewerStep.REVIEW
  }

  componentDidMount() {
    const argumentId = 3
    api.fetch(argumentId).then((arg: Argument) => {
      const argument = arg
      this.setState({
        loading: false,
        argument: argument,
        selectedNode: argument.root
      })
    })
  }

  handleChangeSelectedNode = (node: Node) => {
    this.setState({
      selectedNode: node
    })
  }

  handleReviewAction = (review: NodeReview) => {
    let argument = {...this.state.argument} as Argument
    let selectedNode = {...this.state.selectedNode} as Node

    switch(this.state.reviewerStep) {
      case ReviewerStep.REVIEW: {
        selectedNode.review = review
        break
      }
      case ReviewerStep.IMPLICATION: {
        selectedNode.implicationReview = review
        break
      }
    }

    substituteNodeInArgument(argument, selectedNode)

  }

  findNextNodeToReview(argument: Argument, currentNode: Node) : Node {
    switch(this.state.reviewerStep) {
      case ReviewerStep.REVIEW:{
        //if review is yes, find unreviewed sibling to review
        //if no unreviewed siblings, go to parent and swap to implication

        //if review is no, go to first children in review mode
        //if no children, find unreviewed sibling
        //if no unreviewed sibling, go to parent and swap to implication
        break
      }
      case ReviewerStep.IMPLICATION:{
        //if implication is yes but childrens are no, find unreviewed sibling and swap to review
        //if implication is yes and childrens are yes but review is no, inform, change review to yes, find unreviewed sibling and swap to review
        //if no unreviewed sibling, keep implication and go to parent

        //if implication is no, find unreviewed sibling and swap to review
        //if no unreviewed siblings, keep implication and go to parent
        break
      }
    }
    return currentNode
  }

  updateArgumentAndNode(argument: Argument, node: Node) {
    this.setState({
      selectedNode: node,
      argument: argument
    })
  }

  render() {
    if (this.state.loading) {
      return <div className="loading">I AM LOADING</div>
    }

    const argument = this.state.argument as Argument
    const node = this.state.selectedNode as Node
    const step = this.state.reviewerStep

    return (
      <div className="viewer-component">
        <ArgumentRender
          editing={false}
          argument={argument}
          selectedNodeId={node.id}
          changeSelected={this.handleChangeSelectedNode}
        />
        <NodeReviewer
          node={node}
          step={step}
        />
      </div>
    );
  }
}