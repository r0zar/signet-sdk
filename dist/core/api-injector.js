"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSignetSDK = initializeSignetSDK;
const misc_1 = require("../utils/misc");
const message_handlers_1 = require("./message-handlers");
/**
 * Checks if the Signet extension is installed by looking for its window injection
 */
function checkExtensionInstalled() {
    return typeof window !== 'undefined' &&
        window.__SIGNET_EXTENSION_INSTALLED__ === true;
}
/**
 * Initialize the Signet SDK
 */
function initializeSignetSDK() {
    const eventListeners = {
        'ready': [],
        'connected': [],
        'disconnected': []
    };
    const { sendMessage, listenForMessages } = (0, message_handlers_1.createMessageChannel)();
    // Set up listeners for extension state
    listenForMessages((message) => {
        if (message.type === 'CONNECT_RESPONSE') {
            const event = message.connected ? 'connected' : 'disconnected';
            triggerEvent(event);
        }
    });
    // Trigger event when extension is detected
    if (checkExtensionInstalled()) {
        setTimeout(() => triggerEvent('ready'), 0);
    }
    function triggerEvent(event) {
        eventListeners[event].forEach(callback => callback());
    }
    return {
        isExtensionInstalled() {
            return checkExtensionInstalled();
        },
        signStructuredData(data) {
            if (!checkExtensionInstalled()) {
                return Promise.reject(new Error('Signet extension is not installed'));
            }
            const messageId = (0, misc_1.generateId)();
            return new Promise((resolve, reject) => {
                const responseHandler = (response) => {
                    if (response.id !== messageId)
                        return;
                    if (response.error) {
                        reject(new Error(response.error));
                    }
                    else if (response.signature) {
                        resolve({
                            signature: response.signature,
                            data
                        });
                    }
                    else {
                        reject(new Error('Invalid response from extension'));
                    }
                };
                listenForMessages(responseHandler);
                sendMessage({
                    type: 'SIGN_REQUEST',
                    id: messageId,
                    data
                });
            });
        },
        on(event, callback) {
            if (eventListeners[event]) {
                eventListeners[event].push(callback);
            }
        },
        off(event, callback) {
            if (eventListeners[event]) {
                const index = eventListeners[event].indexOf(callback);
                if (index !== -1) {
                    eventListeners[event].splice(index, 1);
                }
            }
        },
        showNotification(type, title, message) {
            if (!checkExtensionInstalled()) {
                console.warn('Signet extension is not installed, notification cannot be shown');
                return;
            }
            sendMessage({
                type: 'NOTIFICATION',
                id: (0, misc_1.generateId)(),
                notificationType: type,
                title,
                message
            });
        }
    };
}
