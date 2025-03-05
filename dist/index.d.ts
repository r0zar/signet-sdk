export { initializeSignetSDK } from './core/api-injector';
export type { SignetSDK, SignatureResult } from './types';
import { setupMessageHandlers } from './core/message-handlers';
export declare const internal: {
    setupMessageHandlers: typeof setupMessageHandlers;
};
