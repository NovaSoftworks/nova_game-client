import { GameState, State, UIState } from '../components'
import { EventType, System } from '../engine/ecs'

export class UISystem extends System {
    create() {
        if (!this.world.getSingleton(UIState)) {
            this.world.addSingleton(new UIState())
        }
        const uiState = this.world.getSingleton(UIState)!

        uiState.addScreen('login', 'nova-ui__login-screen')
        uiState.addScreen('loading', 'nova-ui__loading-screen')
        uiState.addScreen('hud', 'nova-ui__hud-screen')
        uiState.addScreen('disconnected', 'nova-ui__disconnected-screen')

        uiState.loginButton?.addEventListener('mouseup', () => {
            const username = uiState.usernameInput?.value
            this.world.publishEvent({
                type: EventType.LOGIN_ATTEMPT,
                payload: { username: username }
            })
        })
    }


    update(deltaTime: number) {
        const uiState = this.world.getSingleton(UIState)
        if (!uiState) return

        const gameState = this.world.getSingleton(GameState)
        if (!gameState) return

        switch (gameState.state) {
            case State.Login:
                for (const e of this.world.getEventsByType(EventType.LOGIN_ERROR)) {
                    console.debug(`[UISystem] Login error: ${e.payload.message}`)
                    uiState.loginErrorText.textContent = e.payload.message
                }

                for (const e of this.world.getEventsByType(EventType.CONNECTION_ERROR)) {
                    console.debug(`[UISystem] Connection error: ${e.payload.message}`)
                    uiState.loginErrorText.textContent = e.payload.message
                }
                this.setScreen('login')
                break
            case State.Playing:
                for (const e of this.world.getEventsByType(EventType.LOGIN_SUCCESS)) {
                    console.debug(`[UISystem] Login success: ${e.payload.username}`)
                    uiState.loginErrorText.textContent = ''
                    uiState.usernameText.textContent = e.payload.username
                }
                this.setScreen('hud')
                break
            case State.Disconnected:
                this.setScreen('disconnected')
                break
        }
    }

    setScreen(screenName: string) {
        const uiState = this.world.getSingleton(UIState)
        if (!uiState) return

        const screen = uiState.screens.get(screenName)
        if (!screen) return

        const previousScreen = document.getElementsByClassName('nova-ui__screen--visible')[0]

        if (previousScreen == screen) return

        previousScreen?.classList.remove('nova-ui__screen--visible')
        screen.classList.add('nova-ui__screen--visible')

        console.debug(`[UISystem] Screen set to ${screenName}`)
    }
}