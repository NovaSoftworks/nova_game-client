import { Rendering } from './rendering'

export class UI {
    static uiElementId = 0

    static screens = new Map()
    static currentScreen

    static printHierarchy() {
        UI.printElementHierarchy(UI.currentScreen)
    }

    static printElementHierarchy(element, depth = 0) {
        const spaces = '  '.repeat(depth)
        const className = element.className.split(" ").filter(c => { return c != "nova_ui-element" })
        console.log(`${spaces}${className || element.tagName} (${element.id}) ${className == 'nova_ui-text' ? '-> ' + element.innerHTML : ''}`)

        const children = element.children
        for (const child of children) {
            UI.printElementHierarchy(child, depth + 1)
        }
    }

    static createElement(tag, parent, width, height, anchor: UIAnchor, offsetX = 0, offsetY = 0) {
        const element = document.createElement(tag)
        element.id = `nova_ui-element-${UI.uiElementId++}`
        element.classList.add('nova_ui-element')

        element.style.width = width ? `${width}px` : 'fit-content'
        if (height)
            element.style.height = height ? `${height}px` : 'fit-content'

        // Store the anchor settings as attributes on the element
        if (anchor) {
            element.setAttribute('data-anchor', anchor);
            element.setAttribute('data-offset-x', offsetX);
            element.setAttribute('data-offset-y', offsetY);
        }

        if (parent) {
            parent.appendChild(element)
            if (!parent.layout)
                UI.anchorElement(element, anchor, offsetX, offsetY)
        }

        else
            element.style.position = 'relative'

        return element
    }

    static anchorElement(element, anchor, offsetX, offsetY) {
        const parentRect = element.parentElement.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        const elementWidth = elementRect.width
        const elementHeight = elementRect.height
        const parentWidth = parentRect.width
        const parentHeight = parentRect.height
        offsetX = offsetX || 0
        offsetY = offsetY || 0
        element.style.position = 'absolute'

        switch (anchor) {
            case UIAnchor.CENTER:
                element.style.left = `${(parentWidth - elementWidth) / 2 + offsetX}px`
                element.style.top = `${(parentHeight - elementHeight) / 2 + offsetY}px`
                break
            case UIAnchor.TOPLEFT:
                element.style.left = `${offsetX}px`
                element.style.top = `${offsetY}px`
                break
            case UIAnchor.TOP:
                element.style.left = `${(parentWidth - elementWidth) / 2 + offsetX}px`
                element.style.top = `${offsetY}px`
                break
            case UIAnchor.TOPRIGHT:
                element.style.left = `${parentWidth - elementWidth + offsetX}px`
                element.style.top = `${offsetY}px`
                break
            case UIAnchor.RIGHT:
                element.style.left = `${parentWidth - elementWidth + offsetX}px`
                element.style.top = `${(parentHeight - elementHeight) / 2 + offsetY}px`
                break
            case UIAnchor.BOTTOMRIGHT:
                element.style.left = `${parentWidth - elementWidth + offsetX}px`
                element.style.top = `${parentHeight - elementHeight + offsetY}px`
                break
            case UIAnchor.BOTTOM:
                element.style.left = `${(parentWidth - elementWidth) / 2 + offsetX}px`
                element.style.top = `${parentHeight - elementHeight + offsetY}px`
                break
            case UIAnchor.BOTTOMLEFT:
                element.style.left = `${offsetX}px`
                element.style.top = `${parentHeight - elementHeight + offsetY}px`
                break
            case UIAnchor.LEFT:
                element.style.left = `${offsetX}px`
                element.style.top = `${(parentHeight - elementHeight) / 2 + offsetY}px`
                break
            default:
                break
        }
    }

    static createPanel(parent, width, height, options: any = {}) {
        const layout = options?.layout
        const anchor = options?.anchor
        const offsetX = options?.offsetX
        const offsetY = options?.offsetY
        const bgColor = options?.bgColor

        const panel = UI.createElement('div', parent, width, height, anchor, offsetX, offsetY)
        panel.classList.add('nova_ui-panel')
        panel.style.backgroundColor = bgColor

        panel.layout = layout

        if (panel.layout) {
            panel.style.display = 'flex'
            panel.style.flexDirection = panel.layout
        }

        return panel
    }

    static createText(parent, options) {
        const anchor = options?.anchor
        const offsetX = options?.offsetX
        const offsetY = options?.offsetY
        const fontFamily = options?.family
        const fontSize = options?.size
        const fontWeight = options?.weight
        const fontColor = options?.color
        const fontCase = options?.case

        const text = UI.createElement('div', parent, null, null, anchor, offsetX, offsetY)
        text.classList.add('nova_ui-text')

        text.style.fontFamily = fontFamily || 'Arial'
        text.style.fontSize = fontSize
        text.style.fontWeight = fontWeight
        text.style.color = fontColor || 'black'
        text.style.whiteSpace = 'nowrap'

        if (fontCase)
            text.style.textTransform = fontCase

        text.setText = function (newText) {
            this.innerHTML = newText
            if (!parent.layout) {
                UI.anchorElement(text, anchor, offsetX, offsetY)
            }
        }

        return text
    }

    static createScreen(name, callback) {
        const screen = UI.createPanel(null, Rendering.canvas.width, Rendering.canvas.height)
        screen.className = "nova_ui-screen"
        screen.style.position = 'absolute'
        screen.style.pointerEvents = 'none'

        UI.screens.set(name, screen)

        callback(screen)
    }

    static setScreen(screenName) {
        const uiParent = Rendering.canvas.parentNode
        if (!uiParent) {
            throw new Error("No element to attach UI to. Please check the game canvas parent.")
        }

        const screen = UI.screens.get(screenName)
        if (screen) {
            if (UI.currentScreen)
                UI.currentScreen.parentNode.removeChild(UI.currentScreen)

            UI.currentScreen = screen
            uiParent.insertBefore(screen, Rendering.canvas)

            // After setting the screen, reposition the child elements using their anchor settings
            const elements = screen.querySelectorAll('.nova-ui__element')
            elements.forEach((element) => {
                const anchor = element.getAttribute('data-anchor')
                if (anchor) {
                    const offsetX = parseInt(element.getAttribute('data-offset-x') || 0, 10)
                    const offsetY = parseInt(element.getAttribute('data-offset-y') || 0, 10)
                    UI.anchorElement(element, anchor, offsetX, offsetY)
                }
            });
        }
    }
}

export enum UIAnchor {
    CENTER = 'center',
    TOPLEFT = 'top-left',
    TOP = 'top',
    TOPRIGHT = 'top-right',
    RIGHT = 'right',
    BOTTOMRIGHT = 'bottom-right',
    BOTTOM = 'bottom',
    BOTTOMLEFT = 'bottom-left',
    LEFT = 'left'
}

export enum UILayout {
    VERTICAL = 'column',
    HORIZONTAL = 'row'
}

export enum UITextCase {
    UPPER = 'uppercase',
    LOWER = 'lowercase'
}