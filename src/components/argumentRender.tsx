import React from "react"
import { Argument } from "../data/argument/argument"

interface ArgumentRenderProps {
  argument: Argument
}

export default class ArgumentRender extends React.Component<ArgumentRenderProps> {
  render() {
    let { argument } = this.props
    console.log(argument)
    return <div className="argument">{JSON.stringify(argument)}</div>
  }
}
