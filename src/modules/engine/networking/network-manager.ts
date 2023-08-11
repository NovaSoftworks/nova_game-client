import { NetworkMessage, RemoteClient } from './'

export class NetworkManager {
    private socket: WebSocket | null = null
    private networkId: string | null = null
    private remoteClients: Map<string, RemoteClient>

    constructor() {
        this.remoteClients = new Map<string, RemoteClient>()
    }

    connect(serverAddress: string, callback: () => void): void {
        this.socket = new WebSocket(serverAddress)

        this.socket.onopen = () => {
            this.handleConnected()
            callback()
        }

        this.socket.onmessage = (event) => {
            this.handleMessageReceived(event.data)
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
    }

    private handleMessageReceived(message: any) {
        const parsedMessage: NetworkMessage = JSON.parse(message)
        // TODO: sanity checks

        switch (parsedMessage['type']) {
            case 'connection_ok':
                this.networkId = parsedMessage['payload']['network_id']
                this.addRemoteClients(parsedMessage['payload']['clients'])
                break;
            case 'client_connected':
                this.addRemoteClient(parsedMessage['payload']['network_id'])
                break;
            case 'client_disconnected':
                this.deleteRemoteClient(parsedMessage['payload']['network_id'])
                break;
            default:
                console.log(`Unhandled message received: ${message}`)
                break;
        }
    }

    private isLocalClient(networkId: string) {
        return networkId == this.networkId
    }

    private addRemoteClients(networkIds: string[]) {
        for (const networkId of networkIds) {
            this.addRemoteClient(networkId)
        }
    }

    private addRemoteClient(networkId: string) {
        if (!this.isLocalClient(networkId))
            this.remoteClients.set(networkId, new RemoteClient(networkId))
    }

    private deleteRemoteClient(networkId: string) {
        if (!this.isLocalClient(networkId))
            this.remoteClients.delete(networkId)
    }
}
