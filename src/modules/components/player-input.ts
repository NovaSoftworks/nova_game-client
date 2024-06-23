import { Vector2 } from "../engine/math"
import { Component } from "../engine/ecs"

export class PlayerInput extends Component {
    moveDirection: Vector2

    constructor(moveDirection: Vector2 = Vector2.zero()) {
        super()
        this.moveDirection = moveDirection
    }
}