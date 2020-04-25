export interface Argument {
	root?: Node
	id: number
  title?: string
}

export interface Node {
  sentence: string
  id: number
  sources?: Source[]
  children?: Node[]
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