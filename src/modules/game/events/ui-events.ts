import { NovaEvent } from "../../engine/events";

export class LoginButtonClickedEvent implements NovaEvent {
    constructor(public username: string) { }
}

export class ReconnectButtonClickedEvent implements NovaEvent { }
