import { Component } from "../engine/ecs"

export class Circle extends Component {
    radius: number
    color: string

    constructor(radius: number, color: string) {
        super()
        this.radius = radius
        this.color = color
    }
}