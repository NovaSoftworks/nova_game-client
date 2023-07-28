import { Vector2 } from "../engine/core/math";
import { Component } from "../engine/ecs/component";

export class Transform extends Component {
    position: Vector2 = Vector2.zero()

    constructor(position: Vector2) {
        super()
        this.position = position
    }
}
