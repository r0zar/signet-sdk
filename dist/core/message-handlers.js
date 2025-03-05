"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageChannel = createMessageChannel;
exports.setupMessageHandlers = setupMessageHandlers;
/**
 * Creates a message channel for communication between website and extension
 */
function createMessageChannel() {
    const listeners = [];
    // Set up message listener if we're in a browser environment
    if (typeof window !== 'undefined') {
        window.addEventListener('message', (event) => {
            // Verify message is from our extension
            if (event.source !== window || !event.data || event.data.source !== 'signet-extension') {
                return;
            }
            const message = event.data.message;
            listeners.forEach(listener => listener(message));
        });
    }
    return {
        /**
         * Sends a message to the extension
         */
        sendMessage(message) {
            if (typeof window !== 'undefined') {
                window.postMessage({
                    source: 'signet-sdk',
                    message
                }, '*');
            }
        },
        /**
         * Listens for messages from the extension
         */
        listenForMessages(callback) {
            listeners.push(callback);
        }
    };
}
/**
 * Sets up message handlers for content scripts in the extension
 * This is an internal API meant to be used by the extension itself
 */
function setupMessageHandlers(handlers) {
    const { sendMessage, listenForMessages } = createMessageChannel();
    listenForMessages(async (message) => {
        if (!message || !message.type || !message.id) {
            return;
        }
        // Handle sign request
        if (message.type === 'SIGN_REQUEST' && handlers.onSignRequest) {
            try {
                const result = await handlers.onSignRequest(message.data);
                sendMessage(Object.assign({ type: 'SIGN_RESPONSE', id: message.id }, result));
            }
            catch (error) {
                sendMessage({
                    type: 'SIGN_RESPONSE',
                    id: message.id,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
        // Handle connect request
        if (message.type === 'CONNECT_REQUEST' && handlers.onConnectRequest) {
            try {
                const result = await handlers.onConnectRequest();
                sendMessage(Object.assign({ type: 'CONNECT_RESPONSE', id: message.id }, result));
            }
            catch (error) {
                sendMessage({
                    type: 'CONNECT_RESPONSE',
                    id: message.id,
                    connected: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
    });
}
