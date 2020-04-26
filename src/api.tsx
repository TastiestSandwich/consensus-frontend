import { Argument, NodeType } from "./data/argument/argument"

let id = 0

const testArgument : Argument = {
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
            href: "http://www.wikipedia.com",
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

export function create() {
	const return_id = id
	id++
	return Promise.resolve(return_id)
}

export function fetch(id: number) {
  return Promise.resolve(testArgument)
}
