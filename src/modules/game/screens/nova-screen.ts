import { NovaEventBus } from "../../engine/events";
import { GameContext } from "../game-context";

export abstract class NovaScreen {
    protected abstract screen: HTMLElement
    constructor(protected eventBus: NovaEventBus, protected gameContext: GameContext) { }

    abstract enter(): void
    abstract exit(): void

    show() {
        this.screen.classList.add('nova-ui__screen--visible')
    }

    hide() {
        this.screen.classList.remove('nova-ui__screen--visible')
    }
}