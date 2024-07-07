import { Component } from "../../engine/ecs"

export class Connection extends Component {

    constructor(public username: string) {
        super()
    }
}