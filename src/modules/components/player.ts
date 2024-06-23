import { Component } from "../engine/ecs"

export class Player extends Component {
    username: string = 'John Doe'

    constructor(username: string) {
        super()
        this.username = username
    }
}
