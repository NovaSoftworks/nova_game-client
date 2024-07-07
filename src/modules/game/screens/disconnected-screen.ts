import { NovaScreen } from "./nova-screen"
import { ReconnectButtonClickedEvent } from "../events"

export class DisconnectedScreen extends NovaScreen {
    protected screen: HTMLElement = document.getElementById('nova-ui__disconnected-screen')!

    private reconnectButton = <HTMLButtonElement>document.getElementById('nova-ui__reconnect-button')!
    private reconnectButtonClickHandler = this.onReconnectButtonClicked.bind(this)

    enter(): void {
        this.reconnectButton.addEventListener('mouseup', this.reconnectButtonClickHandler)
    }
    exit(): void {
        this.reconnectButton.removeEventListener('mouseup', this.reconnectButtonClickHandler)
    }

    onReconnectButtonClicked() {
        this.eventBus.publish(new ReconnectButtonClickedEvent())
    }
}