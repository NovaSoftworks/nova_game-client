import { Vector2 } from "../engine/core/math";
import { Component } from "../engine/ecs/component";

export class PlayerInput extends Component {
    public name: string = "PlayerInput"

    moveDirection: Vector2 = Vector2.zero()

    constructor(moveDirection: Vector2) {
        super()
        this.moveDirection = moveDirection
    }
}