export interface Argument {
	root: Node
	id: number
  title?: string
}

export type Node = Statement | Fact | Source

export interface NodeBase {
  id: number
  sentence: string
}

export enum NodeType {
  STATEMENT,
  FACT,
  SOURCE
}

export interface Statement extends NodeBase {
  type: NodeType.STATEMENT
  children: (Statement | Fact)[]
}

export interface Fact extends NodeBase {
  type: NodeType.FACT
  sources: Source[]
}

export interface Source extends NodeBase{
  type: NodeType.SOURCE
  href: string
  description: string
}

export function createEmptyArgument(id: number) : Argument {
  return {
    id: id,
    root: {
      id: 0,
      sentence: "",
      type: NodeType.STATEMENT,
      children: []
    }
  }
}

export function createEmptyStatement(id: number) : Statement {
  return {
    id: id,
    sentence: "",
    type: NodeType.STATEMENT,
    children: []
  }
}

export function createEmptyFact(id: number) : Fact {
  return {
    id: id,
    sentence: "",
    type: NodeType.FACT,
    sources: []
  }
}

export function createEmptySource(id: number) : Source {
  return {
    id: id,
    sentence: "",
    type: NodeType.SOURCE,
    href: "",
    description: ""
  }
}

export function findChildrenCount(node: Node) : number {
  switch (node.type) {
    case NodeType.STATEMENT: {
      return node.children.length
    }
    case NodeType.FACT: {
      return node.sources.length
    }
    //Includes SOURCE, which has no children
    default: {
      return 0
    }
  }
}