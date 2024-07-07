import { AuthenticationFailureEvent, AuthenticationManager, AuthenticationRequestEvent, AuthenticationSuccessEvent, NetworkManager } from '../..'
import { NovaEventBus } from '../../../events'
import { LogUtils } from '../../../utils'

// Mocking module LogUtils instead of spying to avoid cluttering the tests output with log messages
jest.mock('../../../utils/log-utils')
jest.mock('../../../events/event-bus')
jest.mock('../../network-manager')

describe('AuthenticationManager', () => {
    let authManager: AuthenticationManager
    let mockNetworkManager: jest.Mocked<NetworkManager>
    let mockEventBus: jest.Mocked<NovaEventBus>

    beforeEach(() => {
        mockEventBus = new NovaEventBus() as jest.Mocked<NovaEventBus>
        mockNetworkManager = new NetworkManager(mockEventBus) as jest.Mocked<NetworkManager>
        mockNetworkManager.eventBus = mockEventBus
        authManager = new AuthenticationManager(mockNetworkManager)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('should subscribe to AuthenticationRequestEvent on construction and add authentication handler', () => {
        expect(mockEventBus.subscribe).toHaveBeenCalledTimes(2)
        expect(mockEventBus.subscribe).toHaveBeenCalledWith(AuthenticationRequestEvent, expect.any(Function))
        expect(mockEventBus.subscribe).toHaveBeenCalledWith(AuthenticationSuccessEvent, expect.any(Function))
        expect(mockNetworkManager.addHandler).toHaveBeenCalledTimes(1)
    })

    it('should handle AuthenticationRequestEvent correctly', () => {
        const username = 'flint'
        authManager.onAuthenticationRequest(new AuthenticationRequestEvent(username))

        expect(mockNetworkManager.sendMessage).toHaveBeenCalledWith({
            type: 'authentication_request',
            payload: { username }
        })
        expect(LogUtils.info).toHaveBeenCalled()
    })

    it('should handle authentication request errors and publish failure event', () => {
        const username = 'flint'
        const error = new Error('Network error')
        mockNetworkManager.sendMessage.mockImplementation(() => { throw error; })

        authManager.onAuthenticationRequest(new AuthenticationRequestEvent(username))

        expect(LogUtils.error).toHaveBeenCalled()
        expect(mockEventBus.publish).toHaveBeenCalledWith(new AuthenticationFailureEvent(expect.any(String)))
    })

    it('shoud set username on successfull authentication', () => {
        const username = 'flint'
        authManager.onAuthenticationSuccess(new AuthenticationSuccessEvent(username))

        expect(authManager.username).toBe(username)
    })
})