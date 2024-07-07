import { AuthenticationFailureEvent, AuthenticationSuccessEvent, NetworkHandler, NetworkMessage } from '../'
import { NovaEventBus } from '../../events'
import { LogUtils } from '../../utils'

export class AuthenticationHandler implements NetworkHandler {
    constructor(private eventBus: NovaEventBus) { }

    handleMessage(message: NetworkMessage) {
        switch (message.type) {
            case 'authentication_success': {
                const username = message.payload['username']
                LogUtils.info('AuthenticationHandler', `Authentication success: '${username}'`)
                this.eventBus.publish(new AuthenticationSuccessEvent(username))
                return true
            }
            case 'authentication_failure': {
                const failureMessage = message.payload['message']
                LogUtils.error('AuthenticationHandler', `Authentication failure: '${failureMessage}'`)
                this.eventBus.publish(new AuthenticationFailureEvent(failureMessage))
                return true
            }
            default:
                return false
        }
    }
}