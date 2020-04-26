

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

export function substituteNodeInArgument(argument: Argument, newNode: Node) {
  let node = argument.root
  if (node.id === newNode.id) {
    argument.root = newNode
    return
  }
  substituteNodeInParent(node, newNode)
}

function substituteNodeInParent(parent: Node, newNode: Node) {
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
          parent.children[i] = newNode
          return
        }
        // substitute to sources
        if (parent.type === NodeType.FACT && newNode.type === NodeType.SOURCE) {
          parent.sources[i] = newNode
          return
        }

      } else {
        // we gotta get deeper
        switch(parent.type) {
          case NodeType.STATEMENT: {
            substituteNodeInParent(parent.children[i], newNode)
            break
          }
          case NodeType.FACT: {
            substituteNodeInParent(parent.sources[i], newNode)
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

export parseArgument(argument: Argument) {
  argumentJson = {}
  argumentJson.title = argument.title
  argumentJson.root_id = argument.root.id
  argumentJson.nodes = getNodes(argument.root)
  return argumentJson
}

export getNodes(node: Node) {
  nodes = {
    node.id = {
      'sentence': node.sentence,
      // 'evaluation': node.evaluation
    },
  }
  switch(node.type) {
    case NodeType.STATEMENT {
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

export getStatementNodes(node: Statement, nodes) {
  for (let children in node.children) {
    nodes = Object.assign(getNodes(node), nodes)
  }
}

export getFactNodes(node: Fact, nodes) {
  for (let children in node.sources) {
    nodes = Object.assign(getNodes(node), nodes)
  }
}

export getSourceNodes(node: Source, nodes) {
  nodes[node.id].href = node.href
  nodes[node.id].description = node.description
}
