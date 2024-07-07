import { AuthenticationFailureEvent, ConnectionErrorEvent } from "../../engine/networking"
import { LoginButtonClickedEvent } from "../events"
import { NovaScreen } from "./nova-screen"

export class LoginScreen extends NovaScreen {
    protected screen: HTMLElement = document.getElementById('nova-ui__login-screen')!

    private loginButtonClickHandler = this.onLoginButtonClicked.bind(this)
    private authenticationFailureHandler = this.onAuthenticationFailure.bind(this)
    private connectionErrorHandler = this.onConnectionError.bind(this)

    private usernameInput = <HTMLInputElement>document.getElementById('nova-ui__username-input')!
    private loginButton = <HTMLButtonElement>document.getElementById('nova-ui__login-button')!
    private loginErrorText = document.getElementById('nova-ui__login-error')!

    enter(): void {
        this.loginButton.addEventListener('mouseup', this.loginButtonClickHandler)
        this.eventBus.subscribe(AuthenticationFailureEvent, this.authenticationFailureHandler)
        this.eventBus.subscribe(ConnectionErrorEvent, this.connectionErrorHandler)
        this.enableLoginButton()
    }

    exit(): void {
        this.loginButton.removeEventListener('mouseup', this.loginButtonClickHandler)
        this.eventBus.unsubscribe(AuthenticationFailureEvent, this.authenticationFailureHandler)
        this.eventBus.unsubscribe(ConnectionErrorEvent, this.connectionErrorHandler)
    }

    disableLoginButton() {
        this.loginButton.disabled = true
    }

    enableLoginButton() {
        this.loginButton.disabled = false
    }

    onLoginButtonClicked() {
        this.disableLoginButton()
        const username = this.usernameInput.value
        this.eventBus.publish(new LoginButtonClickedEvent(username))
    }

    onAuthenticationFailure(event: AuthenticationFailureEvent) {
        this.loginErrorText.innerHTML = event.message
        this.enableLoginButton()
    }

    onConnectionError(event: ConnectionErrorEvent) {
        this.loginErrorText.innerHTML = 'Error connecting to the server.'
        this.enableLoginButton()
    }
}