import type { Message, MessageHandlers } from '../types';
/**
 * Creates a message channel for communication between website and extension
 */
export declare function createMessageChannel(): {
    /**
     * Sends a message to the extension
     */
    sendMessage(message: Partial<Message>): void;
    /**
     * Listens for messages from the extension
     */
    listenForMessages(callback: (message: any) => void): void;
};
/**
 * Sets up message handlers for content scripts in the extension
 * This is an internal API meant to be used by the extension itself
 */
export declare function setupMessageHandlers(handlers: MessageHandlers): void;
