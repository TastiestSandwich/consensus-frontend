import React from 'react';
import NodeReviewer from '../../components/nodeReviewer';
import {  NodeType } from "../../data/argument/argument"
import ArgumentRender from "../../components/argumentRender"


export default class Viewer extends React.Component<{}> {

  componentDidMount() { }

  render() {
    let argument = {
      id: 1,
      root: {
        id: 0,
        parentId: -1,
        sentence: "El caballo blanco de santiago es blanco",
        type: NodeType.STATEMENT as NodeType.STATEMENT,
        children: [
          {
            id: 1,
            parentId: 0,
            type: NodeType.FACT as NodeType.FACT,
            sentence: "Habia un caballo en santiago",
            sources: [
              {
                id: 2,
                parentId: 1,
                type: NodeType.SOURCE as NodeType.SOURCE,
                sentence: "El caballo homo esta en santiago",
                href: "http://wwww.wikipedia.com",
                description: "La universidad de madrid vio el caballo al parecer"
              }
            ]
          },
          {
            id: 3,
            parentId: 0,
            type: NodeType.STATEMENT as NodeType.STATEMENT,
            sentence: "Solo se permitian caballos blancos en santiago",
            children: []
          }
        ]
      }
    }

    let node = {
      id: 3,
      parentId: 0,
      type: NodeType.STATEMENT as NodeType.STATEMENT,
      sentence: "Solo se permitian caballos blancos en santiago",
      children: []
    }

    return (
      <div className="viewer-component">
        <ArgumentRender
          argument={argument}
          selectedNodeId={0}
        />
        <NodeReviewer
          node={node}
        />

      </div>
    );
  }
}