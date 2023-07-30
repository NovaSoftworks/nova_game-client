import { UIAnchor, UILayout } from '..'
import { UIContainer } from '../ui-container'

export class UIPanel extends UIContainer {
    protected backgroundColor: string

    constructor(parent: UIContainer | null, width: number, height: number, layout?: UILayout | null, anchor?: UIAnchor, offsetX?: number, offsetY?: number) {
        super('div', parent, width, height, layout || null, anchor || null, offsetX || null, offsetY || null)
        this.domElement.classList.add('nova_ui-panel')

        this.render()
    }

    setBackgroundColor(color: string) {
        this.backgroundColor = color
        this.render()
    }

    render(): void {
        if (this.backgroundColor)
            this.domElement.style.backgroundColor = this.backgroundColor

        super.render()
    }

    toString(): string {
        return `Panel (#${this.domElement.id})`
    }
}