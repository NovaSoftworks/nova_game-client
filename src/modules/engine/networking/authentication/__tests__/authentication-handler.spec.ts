import { AuthenticationHandler, AuthenticationSuccessEvent, AuthenticationFailureEvent, NetworkMessage } from '../../'
import { NovaEventBus } from '../../../events'
import { LogUtils } from '../../../utils'

// Mocking module LogUtils instead of spying to avoid cluttering the tests output with log messages
jest.mock('../../../utils')

describe('AuthenticationHandler', () => {
    let eventBus: NovaEventBus
    let authHandler: AuthenticationHandler


    beforeEach(() => {
        eventBus = new NovaEventBus()
        authHandler = new AuthenticationHandler(eventBus)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('should handle authentication success message', () => {
        const message: NetworkMessage = {
            type: 'authentication_success',
            payload: { username: 'flint' }
        }

        const busPublishSpy = jest.spyOn(eventBus, 'publish')

        const result = authHandler.handleMessage(message)

        expect(result).toBe(true)
        expect(LogUtils.info).toHaveBeenCalled()
        expect(busPublishSpy).toHaveBeenCalledWith(new AuthenticationSuccessEvent('flint'))
    })

    it('should handle authentication failure message', () => {
        const message: NetworkMessage = {
            type: 'authentication_failure',
            payload: { message: 'Invalid credentials.' }
        }

        const busPublishSpy = jest.spyOn(eventBus, 'publish')

        const result = authHandler.handleMessage(message)

        expect(result).toBe(true)
        expect(LogUtils.error).toHaveBeenCalled()
        expect(busPublishSpy).toHaveBeenCalledWith(new AuthenticationFailureEvent('Invalid credentials.'))
    })

    it('should not handle unrelated message types', () => {
        const message: NetworkMessage = {
            type: 'unrelated_message',
            payload: {}
        }

        const busPublishSpy = jest.spyOn(eventBus, 'publish')

        const result = authHandler.handleMessage(message)

        expect(result).toBe(false)
        expect(LogUtils.info).not.toHaveBeenCalled()
        expect(LogUtils.error).not.toHaveBeenCalled()
        expect(busPublishSpy).not.toHaveBeenCalled()
    })
})