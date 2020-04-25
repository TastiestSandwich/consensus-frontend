export interface Argument {
	root?: Node
	id: number
  title?: string
}

export interface Node {
  id: number
  sentence: string
}

export interface Statement extends Node {
  children?: Node[]
}

export interface Fact extends Node {
  sources: Source[]
}

export interface Source{
  name: string,
  href: string,
  description: string
}

export function createEmptyArgument(id: number) : Argument {
  return {
    id: id,
  }
}