import { Argument, NodeType } from "./data/argument/argument"

let id = 0

const testArgument : Argument = {
  id: 1,
  root: {
    id: 0,
    parentId: -1,
    sentence: "Masks are good safety measures against COVID-19",
    type: NodeType.STATEMENT as NodeType.STATEMENT,
    children: [
      {
        id: 1,
        parentId: 0,
        type: NodeType.FACT as NodeType.FACT,
        sentence: "Masks reduce aerosol spread from infected people",
        sources: [
          {
            id: 2,
            parentId: 1,
            type: NodeType.SOURCE as NodeType.SOURCE,
            sentence: "Surgical masks reduce 90% of aerosol spread",
            href: "http://www.wikipedia.com",
            description: "Science article from february 2020"
          }
        ]
      },
      {
        id: 3,
        parentId: 0,
        type: NodeType.STATEMENT as NodeType.STATEMENT,
        sentence: "Anyone could be infected without knowing it",
        children: [
          {
            id: 4,
            parentId: 3,
            type: NodeType.FACT as NodeType.FACT,
            sentence: "People infected with COVID take days to show symptoms",
            sources: [
              {
                id: 5,
                parentId: 4,
                type: NodeType.SOURCE as NodeType.SOURCE,
                sentence: "Between 5 to 7 days between contagiousness and symptoms",
                href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                description: "Nature article from january 2020"
              }
            ]
          },
          {
            id: 6,
            parentId: 3,
            type: NodeType.FACT as NodeType.FACT,
            sentence: "Many people are assymptomatic",
            sources: [
              {
                id: 7,
                parentId: 6,
                type: NodeType.SOURCE as NodeType.SOURCE,
                sentence: "Between 50 to 60% of COVID infections are assymptomatic",
                href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                description: "Nature article from december 2020"
              },
              {
                id: 5,
                parentId: 4,
                type: NodeType.SOURCE as NodeType.SOURCE,
                sentence: "Between 50 to 70% of COVID infections are assymptomatic",
                href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                description: "Science article from march 2020"
              }
            ]
          }
        ]
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
