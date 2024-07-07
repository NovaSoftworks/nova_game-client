import { NovaEventBus } from '../engine/events'
import { AuthenticationRequestEvent, AuthenticationSuccessEvent, ConnectionClosedEvent, ConnectionOpenedEvent, ConnectionRequestEvent } from '../engine/networking'
import { DisconnectedScreen, GameContext, LoginScreen, NovaScreen, PlayingScreen } from './'
import { LoginButtonClickedEvent } from './events'

export class GameManager {
    private currentScreen: NovaScreen
    private gameContext: GameContext = new GameContext()

    private loginScreen: LoginScreen = new LoginScreen(this.eventBus, this.gameContext)
    private playingScreen: PlayingScreen = new PlayingScreen(this.eventBus, this.gameContext)
    private disconnectedScreen: DisconnectedScreen = new DisconnectedScreen(this.eventBus, this.gameContext)

    constructor(private eventBus: NovaEventBus) {
        this.setScreen(this.loginScreen)

        eventBus.subscribe(LoginButtonClickedEvent, this.onLoginButtonClicked.bind(this))
        eventBus.subscribe(ConnectionOpenedEvent, this.onConnectionOpened.bind(this))
        eventBus.subscribe(AuthenticationSuccessEvent, this.onAuthenticationSuccess.bind(this))
        eventBus.subscribe(ConnectionClosedEvent, this.onConnectionClosed.bind(this))
    }

    setScreen(screen: NovaScreen) {
        this.currentScreen?.hide()
        this.currentScreen?.exit()
        this.currentScreen = screen
        screen.enter()
        screen.show()
    }

    onLoginButtonClicked(event: LoginButtonClickedEvent) {
        this.gameContext.username = event.username
        this.eventBus.publish(new ConnectionRequestEvent('ws://localhost:8080'))
    }

    onConnectionOpened() {
        if (this.gameContext.username)
            this.eventBus.publish(new AuthenticationRequestEvent(this.gameContext.username))
    }

    onAuthenticationSuccess(event: AuthenticationSuccessEvent) {
        this.gameContext.username = event.username
        this.setScreen(this.playingScreen)
    }

    onConnectionClosed(event: ConnectionClosedEvent) {
        this.setScreen(this.disconnectedScreen)
    }
}