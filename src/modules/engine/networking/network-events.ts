import { NetworkMessage } from '.'
import { NovaEvent } from '../events';

export interface NetworkEvent extends NovaEvent { }

export class NetworkMessageEvent implements NetworkEvent, NetworkMessage {
    constructor(public type: string, public payload?: any, public error?: string) { }
}

export class ConnectionOpenedEvent implements NetworkEvent { }

export class ConnectionClosedEvent implements NetworkEvent { }

export class ConnectionErrorEvent implements NetworkEvent {
    constructor(public message: string) { }
}