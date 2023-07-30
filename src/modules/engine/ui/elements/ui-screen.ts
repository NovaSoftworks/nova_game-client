
import { UIContainer } from '../ui-container'
import Rendering from '../../core/rendering'

export class UIScreen extends UIContainer {
    name: string

    constructor(name: string) {
        super('div', null, Rendering.canvas.width, Rendering.canvas.height, null, null, null, null)
        this.domElement.classList.add('nova_ui-screen')

        this.name = name
    }

    render() {
        super.render()

        this.domElement.style.position = 'absolute'
        this.domElement.style.pointerEvents = 'none'
    }
}