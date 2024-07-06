import { NetworkMessage } from './'

/**
 * Interface for defining handlers to process specific types of network messages.
 */
export interface NetworkHandler {
    /**
     * Function that handles incoming network messages of a specific type.
     * @param message The incoming network message.
     * @returns Boolean indicating whether the message was successfully handled.
     */
    handleMessage: (message: NetworkMessage) => boolean
}