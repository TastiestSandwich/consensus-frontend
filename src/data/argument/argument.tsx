export interface Argument {
	root?: Node
	id: number
  title?: string
}

export interface Node {
  type: NodeType
  id: number
  sentence: string
}

export enum NodeType {
  STATEMENT,
  FACT,
  SOURCE
}

export interface Statement extends Node {
  type: NodeType.STATEMENT
  children?: (Statement | Fact)[]
}

export interface Fact extends Node {
  type: NodeType.FACT
  sources: Source[]
}

export interface Source extends Node{
  type: NodeType.SOURCE
  href: string
  description: string
}

export function createEmptyArgument(id: number) : Argument {
  return {
    id: id,
    root: 
  }
}