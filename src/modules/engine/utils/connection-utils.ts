import { NetworkManager, NetworkMessage } from "../networking"

export class ConnectionUtils {
    private static networkManager: NetworkManager

    static initialize(networkManager: NetworkManager) {
        ConnectionUtils.networkManager = networkManager
    }

    static sendMessage(message: NetworkMessage) {
        if (this.networkManager) {
            this.networkManager.sendMessage(message)
        } else {
            console.error('You must initialize ConnectionUtils with a NetworkManager to send messages.')
        }
    }
}
