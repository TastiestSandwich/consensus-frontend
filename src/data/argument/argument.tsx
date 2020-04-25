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
  children?: (Statement | Fact)[]
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
      type: NodeType.STATEMENT
    }
  }
}