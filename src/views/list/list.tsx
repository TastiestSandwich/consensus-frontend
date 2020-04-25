import React from "react"
import * as api from "../../api"
import { createFakeList } from "../../data/argument/argument"

export default class List extends React.Component<{}> {
    state = {
        argumentList: []
    }

    componentDidMount() {
        api.create().then(() => {
            const argumentList = createFakeList()
            this.setState({
                argumentList: argumentList
            })
        })
    }

    render() {
        return (
            null
        )
    }
}