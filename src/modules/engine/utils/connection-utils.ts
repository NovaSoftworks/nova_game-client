import { AuthenticationManager, NetworkManager, NetworkMessage } from "../networking"
import { LogUtils } from "./log-utils"

export class ConnectionUtils {
    private static networkManager: NetworkManager
    private static authenticationManager: AuthenticationManager

    static initialize(networkManager: NetworkManager, authenticationManager: AuthenticationManager) {
        ConnectionUtils.networkManager = networkManager
        ConnectionUtils.authenticationManager = authenticationManager
    }

    static getUsername(): string | undefined {
        return ConnectionUtils.authenticationManager.username
    }

    static sendMessage(message: NetworkMessage) {
        if (this.networkManager) {
            this.networkManager.sendMessage(message)
        } else {
            LogUtils.error('ConnectionUtils', 'You must initialize ConnectionUtils with a NetworkManager to send messages.')
        }
    }
}
