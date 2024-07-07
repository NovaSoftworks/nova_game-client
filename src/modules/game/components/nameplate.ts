import { Component } from "../../engine/ecs"

export class Nameplate extends Component {
    color: string
    font: string

    constructor(color: string, font = '13px Arial') {
        super()
        this.color = color
        this.font = font
    }
}