import { Component } from "../engine/ecs/component";

export class Player extends Component {
    public name: string = "Player"

    username: string = 'John Doe'

    constructor(username: string) {
        super()
        this.username = username
    }
}
