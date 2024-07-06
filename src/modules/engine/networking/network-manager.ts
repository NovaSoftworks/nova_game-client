import { ConnectionClosedEvent, ConnectionErrorEvent, ConnectionOpenedEvent, NetworkEvent, NetworkMessage, NetworkMessageEvent } from './'
import { NovaEventBus } from '../events'

export class NetworkManager {
    socket?: WebSocket

    constructor(public eventBus: NovaEventBus<NetworkEvent>) { }

    connect(url: string) {
        const socket = new WebSocket(url)
        this.socket = socket

        socket.onopen = () => {
            console.info('Connected to the server.')
            this.eventBus.publish(new ConnectionOpenedEvent())
        }

        socket.onmessage = (event) => {
            const message: NetworkMessage = JSON.parse(event.data)
            this.eventBus.publish(new NetworkMessageEvent(message.type, message.payload, message.error))
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
                this.socket.send(JSON.stringify(message))
            } else {
                console.error(`Can not send a network message with an unopened socket.`)
            }
        } else {
            console.error('Can not send a network message without a socket.')
        }
    }
}