import { NovaScreen } from "./nova-screen";

export class DisconnectedScreen extends NovaScreen {
    protected screen: HTMLElement = document.getElementById('nova-ui__disconnected-screen')!

    enter(): void {
    }
    exit(): void {
    }
}