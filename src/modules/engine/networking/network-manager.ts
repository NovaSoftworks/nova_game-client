import { ConnectionClosedEvent, ConnectionErrorEvent, ConnectionOpenedEvent, NetworkEvent, NetworkHandler, NetworkMessage, NetworkMessageEvent, NetworkMiddleware } from './'
import { NovaEventBus } from '../events'

export class NetworkManager {
    socket?: WebSocket
    handlers: NetworkHandler[] = []
    middlewares: NetworkMiddleware[] = []

    constructor(public eventBus: NovaEventBus<NetworkEvent>) { }

    addHandler(handler: NetworkHandler) {
        this.handlers.push(handler)
    }

    addMiddleware(middleware: NetworkMiddleware) {
        this.middlewares.push(middleware)
    }

    connect(url: string) {
        const socket = new WebSocket(url)
        this.socket = socket

        socket.onopen = () => {
            console.info('Connected to the server.')
            this.eventBus.publish(new ConnectionOpenedEvent())
        }

        socket.onmessage = (event) => {
            const message: NetworkMessage = JSON.parse(event.data)

            const processedMessage = this.middlewares.reduce((m, mw) =>
                mw.processIncomingMessage ? mw.processIncomingMessage(m) : m,
                message
            )

            let handled = this.handlers.some(h => h.handleMessage(processedMessage))

            if (!handled)
                this.eventBus.publish(new NetworkMessageEvent(processedMessage.type, processedMessage.payload, processedMessage.error))
        }

        socket.onclose = () => {
            console.info('Lost connection to the server.')
            this.eventBus.publish(new ConnectionClosedEvent())
        }

        socket.onerror = (error) => {
            console.error('Error:', error)
            this.eventBus.publish(new ConnectionErrorEvent(`${error}`))
        }
    }

    sendMessage(message: NetworkMessage) {
        if (this.socket) {
            if (this.socket.readyState === WebSocket.OPEN) {
                const processedMessage = this.middlewares.reduce((m, mw) =>
                    mw.processOutgoingMessage ? mw.processOutgoingMessage(m) : m,
                    message
                )

                this.socket.send(JSON.stringify(processedMessage))
            } else {
                console.error(`Can not send a network message with an unopened socket.`)
            }
        } else {
            console.error('Can not send a network message without a socket.')
        }
    }
}