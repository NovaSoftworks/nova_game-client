import { NetworkMessage } from './'

export class NetworkManager {
    private socket: WebSocket | null = null
    public messagesBuffer: NetworkMessage[] = []

    constructor() {

    }

    connect(serverAddress: string): void {
        this.socket = new WebSocket(serverAddress)

        this.socket.onopen = () => {
            this.handleConnected()
        }

        this.socket.onmessage = (event) => {
            this.bufferMessage(event.data)
        }

        this.socket.onclose = () => {
            this.handleDisconnected()
        }

        this.socket.onerror = (error) => {
            console.error('Error:', error)
        }
    }

    sendMessage(message: NetworkMessage) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message))
        }
    }

    private handleConnected() {
        console.info('Connected')
    }

    private handleDisconnected() {
        console.info('Disonnected')
        alert('Lost connection to the server.')
        location.reload()
    }

    private bufferMessage(message: any) {
        const parsedMessage: NetworkMessage = JSON.parse(message)
        this.messagesBuffer.push(parsedMessage)
    }

    public getMessage(messageType: string) {
        const messages = this.messagesBuffer.filter(m => m.type === messageType)
        this.messagesBuffer = this.messagesBuffer.filter(m => m.type !== messageType)
        return messages
    }
}
