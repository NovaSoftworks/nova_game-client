export class Event {
    type: EventType
    payload?: any
}

export enum EventType {
    LOGIN_ATTEMPT,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    CONNECTION_CLOSED,
    CONNECTION_ERROR
}