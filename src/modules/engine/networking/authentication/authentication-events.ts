import { NetworkEvent } from '../'

export interface AuthenticationEvent extends NetworkEvent { }

export class AuthenticationSuccessEvent implements AuthenticationEvent {
    constructor(username: string) { }
}

export class AuthenticationFailureEvent implements AuthenticationEvent {
    constructor(message: string) { }
}