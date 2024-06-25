import { Component } from "../engine/ecs"
import { NetworkManager } from "../engine/networking"

export class Network extends Component {
    manager: NetworkManager
    rtt: number = 0
    lastPingTime = 0
    pingInterval = 1000

    constructor(networkManager: NetworkManager) {
        super()
        this.manager = networkManager
    }
}