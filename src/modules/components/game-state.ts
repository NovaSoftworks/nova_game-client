import { Component } from "../engine/ecs"

export class GameState extends Component {
    state: State = State.Login
    username?: string

    constructor() {
        super()
    }
}

export enum State {
    Login,
    Playing,
    Disconnected
}
