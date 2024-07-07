import { AuthenticationFailureEvent, AuthenticationHandler, AuthenticationRequestEvent, AuthenticationSuccessEvent, NetworkManager } from '..'
import { NovaEventBus } from '../../events'
import { LogUtils } from '../../utils'

export class AuthenticationManager {
    eventBus: NovaEventBus
    username?: string

    constructor(private networkManager: NetworkManager) {
        this.eventBus = networkManager.eventBus
        this.eventBus.subscribe(AuthenticationRequestEvent, this.onAuthenticationRequest.bind(this))
        this.eventBus.subscribe(AuthenticationSuccessEvent, this.onAuthenticationSuccess.bind(this))

        networkManager.addHandler(new AuthenticationHandler(networkManager.eventBus))
    }

    onAuthenticationRequest(event: AuthenticationRequestEvent) {
        LogUtils.info('AuthenticationService', `Authentication request: '${event.username}'`)
        try {
            this.networkManager.sendMessage({
                type: 'authentication_request',
                payload: {
                    username: event.username
                }
            })
        } catch (error) {
            LogUtils.error('AuthenticationService', `Authentication failure: ${error}`)
            this.eventBus.publish(new AuthenticationFailureEvent('Failed to send authentication request.'))
        }
    }

    onAuthenticationSuccess(event: AuthenticationSuccessEvent) {
        this.username = event.username
    }
}