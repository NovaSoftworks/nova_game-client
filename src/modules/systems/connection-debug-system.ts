import { Connection } from "../components"
import { System } from "../engine/ecs"

export class ConnectionDebugSystem extends System {
    timeSinceLastDisplay = Infinity

    updateFixed(fixedDeltaTime: number) {
        this.timeSinceLastDisplay += (fixedDeltaTime * 1000)

        if (this.timeSinceLastDisplay >= 5000) {
            this.timeSinceLastDisplay = 0
            const player = this.world.queryEntities(Connection)[0]
            if (!player) return

            // console.clear()
            const connection = this.world.getComponent(player, Connection)
            if (connection) connection.debug()
        }
    }
}