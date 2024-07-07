import { NetworkMessage } from '.'
import { NovaEvent } from '../events';

export class NetworkMessageEvent implements NovaEvent, NetworkMessage {
    constructor(public type: string, public payload?: any, public error?: string) { }
}

export class ConnectionOpenRequestEvent implements NovaEvent {
    constructor(public url: string) { }
}

export class ConnectionCloseRequestEvent implements NovaEvent { }

export class ConnectionOpenedEvent implements NovaEvent { }

export class ConnectionClosedEvent implements NovaEvent { }

export class ConnectionErrorEvent implements NovaEvent { }