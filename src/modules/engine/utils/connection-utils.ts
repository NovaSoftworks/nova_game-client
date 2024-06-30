export class ConnectionUtils {
    static sendMessage(socket: WebSocket, message: NetworkMessage) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message))
        }
    }
}

export interface NetworkMessage {
    type: string,
    payload?: any
    error?: string
}