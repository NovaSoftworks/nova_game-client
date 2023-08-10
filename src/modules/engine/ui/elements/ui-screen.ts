
import { UIContainer } from '../ui-container'
import { RenderingUtils } from '../../utils'

export class UIScreen extends UIContainer {
    name: string

    constructor(name: string) {
        super('div', null, RenderingUtils.canvas.width, RenderingUtils.canvas.height, null, null, null, null)
        this.domElement.classList.add('nova_ui-screen')

        this.name = name
    }

    render() {
        super.render()

        this.domElement.style.position = 'absolute'
        this.domElement.style.pointerEvents = 'none'
    }

    toString(): string {
        return `Screen (#${this.domElement.id})`
    }
}