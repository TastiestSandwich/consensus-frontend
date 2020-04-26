

export interface Argument {
  root: Node
  id: number
  title?: string
}

export type Node = Statement | Fact | Source

export interface NodeBase {
  id: number
  parentId: number
  sentence: string
  review?: NodeReview
  implicationReview?: NodeReview
}

export enum NodeReview {
  NO,
  YES
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

export interface Source extends NodeBase {
  type: NodeType.SOURCE
  href: string
  description: string
}

export function createEmptyArgument(id: number): Argument {
  return {
    id: id,
    root: {
      id: 0,
      parentId: -1,
      sentence: "",
      type: NodeType.STATEMENT,
      children: []
    }
  }
}

export function createEmptyStatement(id: number, parentId: number): Statement {
  return {
    id: id,
    parentId: parentId,
    sentence: "",
    type: NodeType.STATEMENT,
    children: []
  }
}

export function createEmptyFact(id: number, parentId: number): Fact {
  return {
    id: id,
    parentId: parentId,
    sentence: "",
    type: NodeType.FACT,
    sources: []
  }
}

export function createEmptySource(id: number, parentId: number): Source {
  return {
    id: id,
    parentId: parentId,
    sentence: "",
    type: NodeType.SOURCE,
    href: "",
    description: ""
  }
}

export function findChildrenCount(node: Node): number {
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

export function getNextNodeId() : number {
  return Date.now()
}

export function createFakeList() {
  const fakeRoot = {
    id: 1,
    type: NodeType.STATEMENT as NodeType.STATEMENT,
    sentence: "Habia un caballo en santiago",
    children: []
  }
  let fakeList = [
    { root: fakeRoot, id: 0, title: "gerardo de revilla" },
    { root: fakeRoot, id: 1, title: "ses coffee boy" },
    { root: fakeRoot, id: 2, title: "mapache maravilla" },
    { root: fakeRoot, id: 3, title: "agente Mike al servicio" }
  ]
  return fakeList
}

export function substituteNodeInArgument(argument: Argument, newNode: Node, erase: boolean) {
  let node = argument.root
  if (node.id === newNode.id) {
    // root can't be erased, only edited
    if(!erase) {
      argument.root = newNode
    }
    return
  }
  substituteNodeInParent(node, newNode, erase)
}

function substituteNodeInParent(parent: Node, newNode: Node, erase: boolean) {
  let q : Node[] = []
  switch (parent.type) {
    case NodeType.STATEMENT: {
      q = q.concat(parent.children)
      break
    }
    case NodeType.FACT: {
      q = q.concat(parent.sources)
      break
    }
  }

  if (q.length > 0) {
    let i = 0
    while (i < q.length) {
      // iterate over the parent children until we find the id
      if (q[i].id === newNode.id) {

        // substitute to children
        if (parent.type === NodeType.STATEMENT && newNode.type !== NodeType.SOURCE) {
          if(erase) {
            parent.children.splice(i,1)
          } else {
            parent.children[i] = newNode
          }
          return
        }
        // substitute to sources
        if (parent.type === NodeType.FACT && newNode.type === NodeType.SOURCE) {
          if(erase) {
            parent.sources.splice(i,1)
          } else {
            parent.sources[i] = newNode
          }
          return
        }

      } else {
        // we gotta get deeper
        switch(parent.type) {
          case NodeType.STATEMENT: {
            substituteNodeInParent(parent.children[i], newNode, erase)
            break
          }
          case NodeType.FACT: {
            substituteNodeInParent(parent.sources[i], newNode, erase)
            break
          }
        }
        i = i + 1
      }
    }
  }
}

export function findNodeById(argument: Argument, id: number) : Node {
  // q contains the root initially
  let q : Node[] = []
  q.push(argument.root)

  // check until q is empty
  while(q.length > 0) {
    // get first item in q
    let node = q.shift()
    if (!node) {
      // return root if list is empty
      console.log("Couldn't find node with id: " + id)
      return argument.root
    }

    // add children to q
    switch (node.type) {
      case NodeType.STATEMENT: {
        q = q.concat(node.children)
        break
      }
      case NodeType.FACT: {
        q = q.concat(node.sources)
        break
      }
    }

    // is node the one we're looking for?
    if(node.id === id) {
      return node
    }
  }

  // root if we didn't find
  console.log("Couldnt find node with id: " + id)
  return argument.root
}

export function parseArgument(argument: Argument) {
  let argumentJson = {
    title: argument.title,
    root_id: argument.root.id,
    nodes: getNodes(argument.root)
  }
  return argumentJson
}

export function getNodes(node: Node) {
  let id = node.id
  let nodes = {}
  nodes[id] = {
    sentence: node.sentence
  }
  switch(node.type) {
    case NodeType.STATEMENT: {
      getStatementNodes(node, nodes)
      break
    }
    case NodeType.FACT: {
      getFactNodes(node, nodes)
      break
    }
    case NodeType.SOURCE: {
      getSourceNodes(node, nodes)
      break
    }
  }
  return nodes
}

export function getStatementNodes(node: Statement, nodes) {
  node.children.forEach(() => {
    nodes = Object.assign(getNodes(node), nodes)
  })
}

export function getFactNodes(node: Fact, nodes) {
  node.sources.forEach(() => {
    nodes = Object.assign(getNodes(node), nodes)
  })
}

export function getSourceNodes(node: Source, nodes) {
  nodes[node.id].href = node.href
  nodes[node.id].description = node.description
}

export function findFirstChildren(node: Node) : Node | null {
  let q : Node[] = []
  switch(node.type) {
    case NodeType.STATEMENT: {
      q = q.concat(node.children)
      break
    }
    case NodeType.FACT: {
      q = q.concat(node.sources)
      break
    }
  }
  if (q.length > 0) {
    return q[0]
  } else {
    return null
  }
}

export function findFirstUnreviewedSibling(argument: Argument, currentNode: Node) : Node | null {
  if(currentNode.parentId === -1) { 
    return null
  }
  let node = findNodeById(argument, currentNode.parentId)
  let q : Node[] = []
  switch(node.type) {
    case NodeType.STATEMENT: {
      q = q.concat(node.children)
      break
    }
    case NodeType.FACT: {
      q = q.concat(node.sources)
      break
    }
  }
  while (q.length > 0) {
    let newNode = q.shift() as Node
    if(newNode.review == undefined) {
      return newNode
    }
  }
  return null
}

export function areAllChildrenReviewYes(node: Node) : boolean {
  let q : Node[] = []
  switch(node.type) {
    case NodeType.STATEMENT: {
      q = q.concat(node.children)
      break
    }
    case NodeType.FACT: {
      q = q.concat(node.sources)
      break
    }
  }
  while (q.length > 0) {
    let newNode = q.shift() as Node
    if(newNode.review == undefined || newNode.review === NodeReview.NO) {
      return false
    }
  }
  return true
}
