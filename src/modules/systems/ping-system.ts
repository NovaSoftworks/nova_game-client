import { Network } from "../components"
import { System } from "../engine/ecs"
import { TimeUtils } from "../engine/utils/time-utils"

export class PingSystem extends System {

    updateFixed(fixedDeltaTime: number) {
        const network = this.world.getSingleton(Network)
        if (!network)
            throw new Error('Could not find Network singleton component.')

        const currentTime = TimeUtils.getCurrentTime()

        if (currentTime - network.lastPingTime >= network.pingInterval) {
            network.manager.sendMessage({
                type: 'ping',
                payload: { timestamp: Date.now() }
            })
            network.lastPingTime = currentTime
        }

        const pong = network.manager.getMessage('pong')
        pong.forEach(p => {
            const rtt = Date.now() - p.payload['timestamp']
            network.rtt = rtt
            console.debug(`RTT is ${network.rtt}`)
        })
    }
}