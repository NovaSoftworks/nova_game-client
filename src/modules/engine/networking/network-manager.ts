import { ConnectionClosedEvent, ConnectionErrorEvent, ConnectionOpenedEvent, ConnectionCloseRequestEvent, ConnectionOpenRequestEvent, NetworkHandler, NetworkMessage, NetworkMessageEvent, NetworkMiddleware } from './'
import { NovaEventBus } from '../events'
import { LogUtils } from '../utils'

export class NetworkManager {
    socket?: WebSocket
    handlers: NetworkHandler[] = []
    middlewares: NetworkMiddleware[] = []

    constructor(public eventBus: NovaEventBus) {
        this.eventBus.subscribe(ConnectionOpenRequestEvent, this.onConnectionOpenRequest.bind(this))
        this.eventBus.subscribe(ConnectionCloseRequestEvent, this.onConnectionCloseRequest.bind(this))
    }

    onConnectionOpenRequest(event: ConnectionOpenRequestEvent) {
        LogUtils.info('NetworkManager', `Creating connection to the server: '${event.url}'`)

        const socket = new WebSocket(event.url)
        this.socket = socket

        socket.onopen = () => {
            LogUtils.info('NetworkManager', `Connected to the server`)
            this.eventBus.publish(new ConnectionOpenedEvent())
        }

        socket.onmessage = (event) => {
            const message: NetworkMessage = JSON.parse(event.data)

            const processedMessage = this.middlewares.reduce((m, mw) =>
                mw.processIncomingMessage ? mw.processIncomingMessage(m) : m,
                message
            )

            let handled = this.handlers.some(h => h.handleMessage(processedMessage))

            if (!handled) {
                LogUtils.debug('NetworkManager', `Unhandled message type: '${processedMessage.type}'`)
                this.eventBus.publish(new NetworkMessageEvent(processedMessage.type, processedMessage.payload, processedMessage.error))
            }
        }

        socket.onclose = () => {
            LogUtils.info('NetworkManager', `Lost connection to the server`)
            this.eventBus.publish(new ConnectionClosedEvent())
        }

        socket.onerror = (error) => {
            LogUtils.info('NetworkManager', `Connection error`)
            this.eventBus.publish(new ConnectionErrorEvent())
        }
    }

    onConnectionCloseRequest() {
        this.socket?.close()
    }

    addHandler(handler: NetworkHandler) {
        this.handlers.push(handler)
    }

    addMiddleware(middleware: NetworkMiddleware) {
        this.middlewares.push(middleware)
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
                LogUtils.error('NetworkManager', 'Can not send a network message with an unopened socket')
            }
        } else {
            LogUtils.error('NetworkManager', 'Can not send a network message without a socket')
        }
    }
}