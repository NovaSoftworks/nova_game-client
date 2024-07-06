import { AuthenticationFailureEvent, AuthenticationSuccessEvent, NetworkEvent, NetworkHandler, NetworkMessage } from '../'
import { NovaEventBus } from '../../events'

export class AuthenticationHandler implements NetworkHandler {
    constructor(private networkEventBus: NovaEventBus<NetworkEvent>) { }

    handleMessage(message: NetworkMessage) {
        switch (message.type) {
            case 'authentication_success':
                this.networkEventBus.publish(new AuthenticationSuccessEvent(message.payload['username']))
                return true
            case 'authentication_failure':
                this.networkEventBus.publish(new AuthenticationFailureEvent(message.payload['message']))
                return true
            default:
                return false
        }
    }
}