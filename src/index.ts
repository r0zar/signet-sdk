// Public API exports
export { initializeSignetSDK } from './core/api-injector';
export type { SignetSDK, SignatureResult } from './types';

// Internal namespace for extension use
import { setupMessageHandlers } from './core/message-handlers';
export const internal = {
  setupMessageHandlers
};