import { Component } from "../engine/ecs"

export class UIState extends Component {
    screens = new Map<string, HTMLElement>()

    usernameInput = <HTMLInputElement>document.getElementById('nova-ui__username-input')!
    loginErrorText = document.getElementById('nova-ui__login-error')!
    loginButton = document.getElementById('nova-ui__login-button')!

    usernameText = document.getElementById('nova-ui__username-text')!

    constructor() {
        super()
    }

    addScreen(screenName: string, screenId: string) {
        const screen = document.getElementById(screenId)
        if (!screen) return

        this.screens.set(screenName, screen)
    }
}
