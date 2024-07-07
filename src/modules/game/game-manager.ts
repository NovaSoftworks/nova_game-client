import { NovaEventBus } from '../engine/events'
import { AuthenticationFailureEvent, AuthenticationRequestEvent, AuthenticationSuccessEvent, ConnectionClosedEvent, ConnectionCloseRequestEvent, ConnectionOpenedEvent, ConnectionOpenRequestEvent } from '../engine/networking'
import { LogUtils } from '../engine/utils'
import { DisconnectedScreen, GameContext, LoginScreen, NovaScreen, PlayingScreen } from './'
import { LoginButtonClickedEvent, ReconnectButtonClickedEvent } from './events'

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
        eventBus.subscribe(AuthenticationFailureEvent, this.onAuthenticationFailure.bind(this))
        eventBus.subscribe(ConnectionClosedEvent, this.onConnectionClosed.bind(this))

        eventBus.subscribe(ReconnectButtonClickedEvent, this.onReconnectButtonClicked.bind(this))
    }

    setScreen(screen: NovaScreen) {
        this.currentScreen?.hide()
        this.currentScreen?.exit()
        this.currentScreen = screen
        screen.enter()
        screen.show()
    }

    onLoginButtonClicked(event: LoginButtonClickedEvent) {
        LogUtils.info('GameManager', `User requested login: '${event.username}'`)
        this.gameContext.username = event.username
        this.eventBus.publish(new ConnectionOpenRequestEvent('ws://localhost:8080'))
    }

    onConnectionOpened() {
        if (this.gameContext.username != null)
            this.eventBus.publish(new AuthenticationRequestEvent(this.gameContext.username))
    }

    onAuthenticationSuccess(event: AuthenticationSuccessEvent) {
        this.gameContext.username = event.username
        this.setScreen(this.playingScreen)
    }

    onAuthenticationFailure(event: AuthenticationFailureEvent) {
        this.eventBus.publish(new ConnectionCloseRequestEvent())
    }

    onConnectionClosed(event: ConnectionClosedEvent) {
        if (this.currentScreen == this.playingScreen)
            this.setScreen(this.disconnectedScreen)
    }

    onReconnectButtonClicked() {
        this.setScreen(this.loginScreen)
    }
}