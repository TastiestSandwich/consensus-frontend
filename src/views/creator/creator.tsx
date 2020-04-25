import React from "react"
import * as api from "../../api"
import {
  Argument,
  Node,
  Source,
  createEmptyArgument
} from "../../data/argument/argument"
import ArgumentRender from "../../components/argumentRender"

interface CreatorProps { }

interface CreatorState {
  loading: boolean
  argument?: Argument
}

export default class Creator extends React.Component<CreatorProps, CreatorState> {
  state: CreatorState = {
    loading: true
  }

  componentDidMount() {
    api.create().then((id: number) => {
      this.setState({
        loading: false,
        argument: createEmptyArgument(id)
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <div className="loading">I AM LOADING</div>
    }

    let argument = this.state.argument as Argument

    return (
      <div className="creator-component">
        <ArgumentRender argument={argument} />
      </div>
    )
  }
}
