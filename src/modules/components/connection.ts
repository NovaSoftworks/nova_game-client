import { Component } from "../engine/ecs"
import { NetworkMessage } from "../engine/utils"

export class Connection extends Component {
    status: ConnectionStatus = ConnectionStatus.Disconnected
    socket: WebSocket

    rtt?: number
    lastPingTime: number = 0
    pingInterval: number = 1000

    messagesBuffer: Map<string, NetworkMessage[]> = new Map<string, NetworkMessage[]>()

    constructor(socket: WebSocket) {
        super()
        this.socket = socket
    }

    getMessages(messageType: string): NetworkMessage[] {
        const messages = this.messagesBuffer.get(messageType) || []
        this.messagesBuffer.delete(messageType)
        return messages
    }

    bufferMessage(message: NetworkMessage) {
        const messages = this.messagesBuffer.get(message.type)
        if (messages)
            messages.push(message)
        else
            this.messagesBuffer.set(message.type, [message])
    }

    debug() {
        const msgBufferTypes = Object.keys(this.messagesBuffer)
        console.debug(`[Connection]: status=${ConnectionStatus[this.status]}; RTT=${this.rtt}`)
    }
}

export enum ConnectionStatus {
    Disconnected,
    Connecting,
    Connected
}