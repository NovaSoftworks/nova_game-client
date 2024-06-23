import { NetworkMessage, RemoteClient } from './'

export class NetworkManager {
    private socket: WebSocket | null = null
    private networkId: string | null = null
    private rtt?: number
    private isAuthenticated: boolean
    private remoteClients: Map<string, RemoteClient>

    private authCallback?: (success: boolean, error?: string) => void

    constructor() {
        this.isAuthenticated = false
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

    authenticate(username: string, callback: (success: boolean, error?: string) => void) {
        if (!this.socket) return

        this.authCallback = callback

        this.sendMessage({
            type: 'authenticate',
            payload: {
                username: username
            }
        })
    }

    private handleConnected() {
        console.info('Connected')
    }

    private handleDisconnected() {
        console.info('Disonnected')
        alert('Lost connection to the server.')
        location.reload()
    }

    private handleMessageReceived(message: any) {
        const parsedMessage: NetworkMessage = JSON.parse(message)
        // TODO: sanity checks

        switch (parsedMessage.type) {
            case 'ping':
                this.sendMessage({
                    type: 'pong',
                    payload: parsedMessage.payload
                })
                break
            case 'pong':
                this.rtt = Date.now() - parsedMessage.payload['timestamp']
                console.log(`Pong received. RTT is '${this.rtt}'`)
                break
            case 'connection_ok':
                this.networkId = parsedMessage.payload['network_id']
                this.addRemoteClients(parsedMessage.payload['clients'])
                this.sendMessage({
                    type: 'ping',
                    payload: {
                        timestamp: Date.now()
                    }
                })
                break
            case 'authentication_ok':
                this.isAuthenticated = true
                if (this.authCallback) {
                    this.authCallback(true)
                    this.authCallback = undefined
                }
                break
            case 'authentication_ko':
                this.isAuthenticated = false
                if (this.authCallback) {
                    const error = parsedMessage.error || "Unknown reason"
                    this.authCallback(false, error)
                    this.authCallback = undefined
                }
                break
            case 'client_connected':
                const connectedClientId = parsedMessage.payload['network_id']
                if (!this.isLocalClient(connectedClientId)) {
                    this.addRemoteClient(connectedClientId)
                    console.log(`Remote client connected: ${connectedClientId}`)
                }
                break
            case 'client_disconnected':
                const disconnectedClientId = parsedMessage.payload['network_id']
                if (!this.isLocalClient(disconnectedClientId)) {
                    this.deleteRemoteClient(disconnectedClientId)
                    console.log(`Remote client connected: ${disconnectedClientId}`)
                }
                break
            default:
                console.log(`Unhandled message received: ${message}`)
                break
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
