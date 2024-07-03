import { Connection, ConnectionStatus } from "../components"
import { EventType, System } from "../engine/ecs"
import { ConnectionUtils, NetworkMessage, TimeUtils } from "../engine/utils"

export class ConnectionSystem extends System {

    updateFixed(fixedDeltaTime: number) {
        const connection = this.world.getSingleton(Connection)

        if (!connection) {
            console.debug('[ConnectionSystem] No connection found')
            for (const e of this.world.getEventsByType(EventType.LOGIN_ATTEMPT)) {
                console.debug('[ConnectionSystem] Login attempt')
                this.createConnection(e.payload.username)
            }
        } else {
            this.updateRtt(connection)

            connection.getMessages('authentication_ok').forEach(msg => {
                this.world.publishEvent({
                    type: EventType.LOGIN_SUCCESS, payload: { username: msg.payload.username }
                })
            })

            connection.getMessages('authentication_error').forEach(msg => {
                this.world.destroySingleton(Connection)
                this.world.publishEvent({
                    type: EventType.LOGIN_ERROR, payload: { message: msg.payload.message }
                })
            })
        }
    }

    createConnection(username: string) {
        const socket = new WebSocket('ws://localhost:8080')
        const connection = new Connection(socket)
        this.world.addSingleton(connection)

        connection.status = ConnectionStatus.Connecting

        socket.onopen = () => {
            connection.status = ConnectionStatus.Connected
            console.info('Connected to the server.')

            ConnectionUtils.sendMessage(connection.socket, {
                type: 'authentication',
                payload: { username: username }
            })
        }

        socket.onmessage = (event) => {
            const parsedMessage: NetworkMessage = JSON.parse(event.data)
            connection.bufferMessage(parsedMessage)
        }

        socket.onclose = () => {
            connection.status = ConnectionStatus.Disconnected
            connection.rtt = undefined
            console.info('Lost connection to the server.')
            this.world.publishEvent({ type: EventType.CONNECTION_CLOSED })
        }

        socket.onerror = (error) => {
            console.error('Error:', error)

            this.world.publishEvent({
                type: EventType.CONNECTION_ERROR, payload: { message: error }
            })
        }
    }

    updateRtt(connection: Connection) {
        if (connection.status != ConnectionStatus.Connected) return

        const currentTime = TimeUtils.getCurrentTime()

        if (currentTime - connection.lastPingTime >= connection.pingInterval) {
            ConnectionUtils.sendMessage(connection.socket, {
                type: 'ping',
                payload: { timestamp: currentTime }
            })
            connection.lastPingTime = currentTime
        }

        connection.getMessages('pong').forEach(pongMsg => {
            const rtt = currentTime - pongMsg.payload['original_timestamp']
            connection.rtt = rtt
        })
    }
}