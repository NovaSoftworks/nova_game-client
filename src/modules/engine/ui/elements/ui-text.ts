import { UIAnchor } from '..'
import { UIContainer } from '../ui-container'
import { UIElement } from '../ui-element'

export class UIText extends UIElement {
    protected text: string

    constructor(parent: UIContainer, anchor?: UIAnchor, offsetX?: number, offsetY?: number) {
        super('span', parent, null, null, anchor || null, offsetX || null, offsetY || null)
        this.domElement.classList.add('nova_ui-text')

        this.render()
    }

    setText(text: string) {
        this.text = text
        this.render()
    }

    render(): void {
        this.domElement.style.whiteSpace = 'nowrap'
        if (this.text)
            this.domElement.textContent = this.text

        super.render()
    }
}