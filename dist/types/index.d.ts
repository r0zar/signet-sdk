export * from './messages';
export interface SignetSDK {
    isExtensionInstalled(): boolean;
    signStructuredData(data: any): Promise<SignatureResult>;
    on(event: EventType, callback: () => void): void;
    off(event: EventType, callback: () => void): void;
    showNotification(type: 'info' | 'success' | 'error', title: string, message: string): void;
}
export interface MessageHandlers {
    onSignRequest?: (data: any) => Promise<{
        signature?: string;
        error?: string;
    }>;
    onConnectRequest?: () => Promise<{
        connected: boolean;
        error?: string;
    }>;
}
import type { SignatureResult, EventType } from './messages';
