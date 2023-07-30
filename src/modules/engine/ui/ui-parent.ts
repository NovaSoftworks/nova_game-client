import { DOMElement } from './dom-element'

export interface UIParent extends DOMElement {
    children: DOMElement[]

    addChild(childElement: DOMElement): void

    printHierarchy(): void
}
