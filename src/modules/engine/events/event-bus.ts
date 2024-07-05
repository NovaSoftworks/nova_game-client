export interface NovaEvent { }

type NovaEventCallback<E extends NovaEvent> = (event: E) => void
type NovaEventConstructor<E extends NovaEvent> = new (...args: any[]) => E

export class NovaEventBus<E extends NovaEvent> {
    private listeners: Map<NovaEventConstructor<E>, Set<NovaEventCallback<E>>> = new Map()

    subscribe(eventConstructor: NovaEventConstructor<E>, callback: NovaEventCallback<E>) {
        if (!this.listeners.has(eventConstructor))
            this.listeners.set(eventConstructor, new Set())

        this.listeners.get(eventConstructor)!.add(callback)
    }

    unsubscribe(eventConstructor: NovaEventConstructor<E>, callback: NovaEventCallback<E>) {
        const listeners = this.listeners.get(eventConstructor)
        if (listeners) {
            listeners.delete(callback)
            if (listeners.size === 0) {
                this.listeners.delete(eventConstructor);
            }
        }
    }

    publish(event: E) {
        const eventconstructor = event.constructor as NovaEventConstructor<E>
        const listeners = this.listeners.get(eventconstructor)
        if (listeners) {
            listeners.forEach((listener) => listener(event))
        }
    }
}
