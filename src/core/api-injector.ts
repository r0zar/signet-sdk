import type { SignetSDK, SignatureResult, EventType } from '../types';
import { generateId } from '../utils/misc';
import { createMessageChannel } from './message-handlers';

/**
 * Checks if the Signet extension is installed by looking for its window injection
 */
function checkExtensionInstalled(): boolean {
  return typeof window !== 'undefined' && 
    (window as any).__SIGNET_EXTENSION_INSTALLED__ === true;
}

/**
 * Initialize the Signet SDK
 */
export function initializeSignetSDK(): SignetSDK {
  const eventListeners: Record<EventType, Array<() => void>> = {
    'ready': [],
    'connected': [],
    'disconnected': []
  };

  const { sendMessage, listenForMessages } = createMessageChannel();

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

  function triggerEvent(event: EventType): void {
    eventListeners[event].forEach(callback => callback());
  }

  return {
    isExtensionInstalled(): boolean {
      return checkExtensionInstalled();
    },

    signStructuredData(data: any): Promise<SignatureResult> {
      if (!checkExtensionInstalled()) {
        return Promise.reject(new Error('Signet extension is not installed'));
      }

      const messageId = generateId();
      
      return new Promise((resolve, reject) => {
        const responseHandler = (response: any) => {
          if (response.id !== messageId) return;
          
          if (response.error) {
            reject(new Error(response.error));
          } else if (response.signature) {
            resolve({
              signature: response.signature,
              data
            });
          } else {
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

    on(event: EventType, callback: () => void): void {
      if (eventListeners[event]) {
        eventListeners[event].push(callback);
      }
    },

    off(event: EventType, callback: () => void): void {
      if (eventListeners[event]) {
        const index = eventListeners[event].indexOf(callback);
        if (index !== -1) {
          eventListeners[event].splice(index, 1);
        }
      }
    },

    showNotification(type: 'info' | 'success' | 'error', title: string, message: string): void {
      if (!checkExtensionInstalled()) {
        console.warn('Signet extension is not installed, notification cannot be shown');
        return;
      }

      sendMessage({
        type: 'NOTIFICATION',
        id: generateId(),
        notificationType: type,
        title,
        message
      });
    }
  };
}