import { AuthenticationFailureEvent } from "../../engine/networking";
import { LoginButtonClickedEvent } from "../events";
import { NovaScreen } from "./nova-screen";

export class LoginScreen extends NovaScreen {
    protected screen: HTMLElement = document.getElementById('nova-ui__login-screen')!

    private loginButtonClickHandler = this.onLoginButtonClicked.bind(this)
    private authenticationFailureHandler = this.onAuthenticationFailure.bind(this)

    private usernameInput = <HTMLInputElement>document.getElementById('nova-ui__username-input')!
    private loginButton = <HTMLButtonElement>document.getElementById('nova-ui__login-button')!
    private loginErrorText = document.getElementById('nova-ui__login-error')!

    enter(): void {
        this.loginButton.addEventListener('mouseup', this.loginButtonClickHandler)
        this.eventBus.subscribe(AuthenticationFailureEvent, this.authenticationFailureHandler)
    }

    exit(): void {
        this.loginButton.removeEventListener('mouseup', this.loginButtonClickHandler)
        this.eventBus.unsubscribe(AuthenticationFailureEvent, this.authenticationFailureHandler)
    }

    onLoginButtonClicked() {
        const username = this.usernameInput.value
        this.eventBus.publish(new LoginButtonClickedEvent(username))
    }

    onAuthenticationFailure(error: AuthenticationFailureEvent) {
        this.loginErrorText.innerHTML = error.message
    }
}