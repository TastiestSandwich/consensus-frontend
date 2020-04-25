import React from "react"
import { Node, NodeType, Statement, Fact, Source } from "../data/argument/argument"

interface NodeEditorProps {
  node: Node
  save: () => void
}

interface NodeEditorState {
  sentence: string
  childrenCount: number
  type: NodeType
  href?: string
  description?: string
  step: EditorStep
}

enum EditorStep {
  SENTENCE,
  HREF,
  DESCRIPTION,
  TYPE,
  ADDNODE
}

export default class NodeEditor extends React.Component<NodeEditorProps, NodeEditorState> {
  constructor(props) {
    super(props)

    switch(props.node.type) {
      case NodeType.FACT: {
        let node : Fact = props.node as Fact
        this.state = {
          sentence: node.sentence,
          childrenCount: node.sources.length,
          type: NodeType.FACT,
          step: EditorStep.SENTENCE
        }
      }
      case NodeType.SOURCE: {
        let node : Source = props.node as Source
        this.state = {
          sentence: node.sentence,
          childrenCount: 0,
          href: node.href,
          description: node.description,
          type: NodeType.SOURCE,
          step: EditorStep.SENTENCE
        }
      }
      // Default is NodeType.STATEMENT
      default: {
        let node : Statement = props.node as Statement
        this.state = {
          sentence: node.sentence,
          childrenCount: node.children ? node.children.length : 0,
          type: NodeType.STATEMENT,
          step: EditorStep.SENTENCE
        }
      }
    }
  }
  handleNextStep = () => {}
  updateSentence = (sentence: string) => {
    this.setState({
      sentence: sentence
    })
  }

  handleSaveSentence = (sentence: string) => {
    this.setState({
      sentence: sentence
    })
  }

  renderNodePreview() {
    const sentence = this.state.sentence
    return(
      <div className="node-editor__sentence">
         { sentence }
      </div>
    )
  }

  renderSentenceStep() {
    return(
      <div className="node-editor__actions">
        <div className="node-editor__message">
          Add a sentence
        </div>
      </div>
    )
  }

  renderTypeStep() {
    return(
      <div className="node-editor__actions">
        <div className="node-editor__message">
          Is this a Statement, a Fact or a Source?
        </div>
        <div className="node-editor__type-buttons">
          <button className="node-editor__statement-button">STATEMENT</button>
          <button className="node-editor__fact-button">FACT</button>
          <button className="node-editor__source-button">SOURCE</button>
        </div>
      </div>
    )
  }

  renderAddNodeStep() {
     return(
      <div className="node-editor__actions">
        <div className="node-editor__message">
          Add a Child or a Sibling
        </div>
        <div className="node-editor__add-node-buttons">
          <button className="node-editor__child-button">CHILD</button>
          <button className="node-editor__sibling-button">SIBLING</button>
        </div>
      </div>
    )
  }

  renderNextStepButton() {
    return(
      <div className="node-editor__next-step">
        <button className="node-editor__next-step-button" onClick={this.handleNextStep} />
      </div>
    )
  }

  renderEditorActions() {
    switch(this.state.step) {
      case EditorStep.SENTENCE: {
        return this.renderSentenceStep
      }
      case EditorStep.TYPE: {
        return this.renderTypeStep
      }
      case EditorStep.ADDNODE: {
        return this.renderAddNodeStep
      }
      default: {
        return this.renderSentenceStep
      }
    }
  }

  render() {
    return(
      <div className="node-editor">
        { this.renderNodePreview }
        { this.renderEditorActions }
      </div>
    )
  }

}