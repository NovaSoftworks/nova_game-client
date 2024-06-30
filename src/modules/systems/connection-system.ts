import { Connection, ConnectionStatus } from "../components"
import { Entity, System } from "../engine/ecs"
import { ConnectionUtils, NetworkMessage, TimeUtils } from "../engine/utils"

export class ConnectionSystem extends System {

    create() {
        let player = this.world.createEntity()
        const socket = new WebSocket('ws://localhost:8080')
        const connection = new Connection(socket)
        this.world.addComponent(player, connection)

        connection.status = ConnectionStatus.Connecting

        socket.onopen = () => {
            connection.status = ConnectionStatus.Connected
            console.info('Connected to the server.')
        }

        socket.onmessage = (event) => {
            const parsedMessage: NetworkMessage = JSON.parse(event.data)
            connection.bufferMessage(parsedMessage)
        }

        socket.onclose = () => {
            connection.status = ConnectionStatus.Disconnected
            connection.rtt = undefined
            console.info('Lost connection to the server.')
        }

        socket.onerror = (error) => {
            console.error('Error:', error)
        }
    }

    updateFixed(fixedDeltaTime: number) {
        const player = this.world.queryEntities(Connection)[0]
        if (!player) return

        const connection = this.world.getComponent(player, Connection)!

        this.updateRtt(player, connection)
    }

    updateRtt(player: Entity, connection: Connection) {
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