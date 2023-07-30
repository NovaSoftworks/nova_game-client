import { UIAnchor } from '.'
import { DOMElement } from './dom-element'
import { UIParent } from './ui-parent'

export abstract class UIElement implements DOMElement {
    static nextElementId = 0

    domElement: HTMLElement
    parent: UIParent | null
    protected width: number | null
    protected height: number | null
    protected anchor: UIAnchor | null
    protected offsetX: number
    protected offsetY: number

    constructor(tag: string, parent: UIParent | null, width: number | null, height: number | null, anchor: UIAnchor | null, offsetX: number | null, offsetY: number | null) {
        const domElement = document.createElement(tag)
        domElement.id = `nova_ui-element-${UIElement.nextElementId++}`
        domElement.classList.add('nova_ui-element')

        this.domElement = domElement
        this.width = width
        this.height = height
        this.anchor = anchor
        this.offsetX = offsetX || 0
        this.offsetY = offsetY || 0

        this.parent = parent
        if (parent) {
            parent.addChild(this)
        }
    }

    setWidth(width: number) {
        this.width = width
    }

    setHeight(height: number) {
        this.height = this.height
    }

    render() {
        if (this.width !== null) this.domElement.style.width = `${this.width}px`
        if (this.height !== null) this.domElement.style.height = `${this.height}px`
        if (!this.parent) return

        if (this.anchor) {
            this.anchorToParent()
        } else {
            this.domElement.style.position = 'relative'
            this.domElement.style.top = 'auto'
            this.domElement.style.right = 'auto'
            this.domElement.style.bottom = 'auto'
            this.domElement.style.left = 'auto'
        }
    }

    anchorToParent() {
        if (!this.parent) {
            throw new Error(`${this.domElement.id} has no parent to anchor to.`)
        }

        const domElement = this.domElement
        domElement.style.position = 'absolute'

        const parentRect = this.parent.domElement.getBoundingClientRect()
        const parentWidth = parentRect.width
        const parentHeight = parentRect.height

        const elementRect = domElement.getBoundingClientRect()
        const elementWidth = elementRect.width
        const elementHeight = elementRect.height



        switch (this.anchor) {
            case UIAnchor.CENTER:
                domElement.style.left = `${(parentWidth - elementWidth) / 2 + this.offsetX}px`
                domElement.style.top = `${(parentHeight - elementHeight) / 2 + this.offsetY}px`
                break
            case UIAnchor.TOPLEFT:
                domElement.style.left = `${this.offsetX}px`
                domElement.style.top = `${this.offsetY}px`
                break
            case UIAnchor.TOP:
                domElement.style.left = `${(parentWidth - elementWidth) / 2 + this.offsetX}px`
                domElement.style.top = `${this.offsetY}px`
                break
            case UIAnchor.TOPRIGHT:
                domElement.style.left = `${parentWidth - elementWidth + this.offsetX}px`
                domElement.style.top = `${this.offsetY}px`
                break
            case UIAnchor.RIGHT:
                domElement.style.left = `${parentWidth - elementWidth + this.offsetX}px`
                domElement.style.top = `${(parentHeight - elementHeight) / 2 + this.offsetY}px`
                break
            case UIAnchor.BOTTOMRIGHT:
                domElement.style.left = `${parentWidth - elementWidth + this.offsetX}px`
                domElement.style.top = `${parentHeight - elementHeight + this.offsetY}px`
                break
            case UIAnchor.BOTTOM:
                domElement.style.left = `${(parentWidth - elementWidth) / 2 + this.offsetX}px`
                domElement.style.top = `${parentHeight - elementHeight + this.offsetY}px`
                break
            case UIAnchor.BOTTOMLEFT:
                domElement.style.left = `${this.offsetX}px`
                domElement.style.top = `${parentHeight - elementHeight + this.offsetY}px`
                break
            case UIAnchor.LEFT:
                domElement.style.left = `${this.offsetX}px`
                domElement.style.top = `${(parentHeight - elementHeight) / 2 + this.offsetY}px`
                break
            default:
                break
        }
    }

    abstract toString(): string
}
