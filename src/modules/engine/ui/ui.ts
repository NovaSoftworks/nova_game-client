import Rendering from '../core/rendering'
import { UIScreen } from './'

export class UI {
    static screens = new Map<string, UIScreen>()
    static currentScreen: UIScreen | null = null

    private static HTMLHook: ParentNode

    static initialize(canvas: HTMLCanvasElement) {
        const hook = canvas.parentNode
        if (!hook)
            throw new Error(`Could not initialize UI from a canvas without a parent node.`)

        UI.HTMLHook = canvas.parentNode
    }

    static createScreen(name: string) {
        const screen = new UIScreen(name)
        UI.screens.set(name, screen)

        return screen
    }

    static setScreen(screenName: string) {
        if (!UI.HTMLHook) {
            throw new Error("No HTML element to attach UI to. Please make sure rendering has been properly initialized.")
        }

        const screen = UI.screens.get(screenName)
        if (screen) {
            const currentScreenParentDomElement = UI.HTMLHook
            if (UI.currentScreen)
                currentScreenParentDomElement.removeChild(UI.currentScreen.domElement)

            UI.currentScreen = screen
            UI.HTMLHook.insertBefore(screen.domElement, Rendering.canvas)
            screen.render()
        }
    }
}


/*

    static createScreen(name, callback) {
        const screen = UI.createPanel(null, Rendering.canvas.width, Rendering.canvas.height)
        screen.className = "nova_ui-screen"

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
            })
        }
    }
 */