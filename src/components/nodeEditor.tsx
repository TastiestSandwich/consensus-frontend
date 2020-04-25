import React from "react"
import { Node, NodeType, findChildrenCount } from "../data/argument/argument"

interface NodeEditorProps {
  node: Node
  save: (sentence: string, type: NodeType, href: string, description: string) => void
}

interface NodeEditorState {
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
    this.state = {
      step: EditorStep.SENTENCE
    }
  }

  updateSentence = (sentence: string) => {
    const node = this.props.node
    if (node.type === NodeType.SOURCE) {
      this.props.save(sentence, node.type, node.href, node.description)
    } else {
      this.props.save(sentence, node.type, "", "")
    } 
  }

  handleNextStep = () => {
    let nextStep = this.findNextStep()

    this.setState({
      step: nextStep
    })
  }

  findNextStep() : EditorStep {
    const childrenCount = findChildrenCount(this.props.node)
    switch(this.state.step) {
      case EditorStep.SENTENCE: {
        return childrenCount > 0 ? EditorStep.ADDNODE : EditorStep.TYPE
      }
      case EditorStep.TYPE: {
        return EditorStep.ADDNODE
      }
      default: {
        return EditorStep.SENTENCE
      }
    }
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
          { node.type.toString() }
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
        <div className="node-editor__current-step">
          { this.state.step }
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
      case EditorStep.TYPE: {
        return this.renderTypeStep()
      }
      case EditorStep.ADDNODE: {
        return this.renderAddNodeStep()
      }
      default: {
        return this.renderSentenceStep()
      }
    }
  }

  render() {
    console.log("he renderitzat")
    console.log(this.props.node)
    return(
      <div className="node-editor">
        { this.renderNodePreview() }
        { this.renderEditorActions() }
        { this.renderNextStepButton() }
      </div>
    )
  }

}