
import { UIAnchor, UILayout } from '.'
import { UIElement } from './ui-element'
import { UIParent } from './ui-parent'

export abstract class UIContainer extends UIElement implements UIParent {
    children: UIElement[] = []
    layout: UILayout

    constructor(tag: string, parent: UIContainer | null, width: number, height: number, layout: UILayout | null, anchor: UIAnchor | null, offsetX: number | null, offsetY: number | null) {
        super(tag, parent, width, height, anchor, offsetX, offsetY)
        this.domElement.classList.add('nova_ui-container')

        this.layout = layout || UILayout.VERTICAL
    }

    addChild(childElement: UIElement) {
        this.children.push(childElement)
        this.domElement.appendChild(childElement.domElement)
    }

    render() {
        super.render()

        this.domElement.style.display = 'flex'
        this.domElement.style.flexDirection = this.layout
        this.domElement.style.justifyContent = 'space-between'

        for (const child of this.children) {
            child.render()
        }
    }

    printHierarchy(indent: string = ''): void {
        console.log(`${indent}${this.toString()}:`)
        for (const child of this.children) {
            if (child instanceof UIContainer) {
                child.printHierarchy(indent + '  ')
            } else {
                console.log(`${indent}  ${child.toString()}`)
            }
        }
    }
}