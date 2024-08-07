import { Vector2 } from "../../engine/math"
import { Component } from "../../engine/ecs"

export class Velocity extends Component {
    velocity: Vector2

    constructor(velocity: Vector2 = Vector2.zero()) {
        super()
        this.velocity = velocity
    }
}
