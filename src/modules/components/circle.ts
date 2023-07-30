import { Component } from "../engine/ecs"

export class Circle extends Component {
    public name: string = "Circle"

    radius: number
    color: string

    constructor(radius: number, color: string) {
        super()
        this.radius = radius
        this.color = color
    }
}