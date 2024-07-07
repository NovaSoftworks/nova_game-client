import { NovaEvent } from '../../events'

export class AuthenticationRequestEvent implements NovaEvent {
    constructor(public username: string) { }
}

export class AuthenticationSuccessEvent implements NovaEvent {
    constructor(public username: string) { }
}

export class AuthenticationFailureEvent implements NovaEvent {
    constructor(public message: string) { }
}