export * from './messages';

// Public SDK interface
export interface SignetSDK {
  // Check if extension is installed
  isExtensionInstalled(): boolean;
  
  // Sign structured data
  signStructuredData(data: any): Promise<SignatureResult>;
  
  // Event handling
  on(event: EventType, callback: () => void): void;
  off(event: EventType, callback: () => void): void;
  
  // Notification handling
  showNotification(type: 'info' | 'success' | 'error', title: string, message: string): void;
}

// Used for message handlers in content script
export interface MessageHandlers {
  onSignRequest?: (data: any) => Promise<{ signature?: string; error?: string }>;
  onConnectRequest?: () => Promise<{ connected: boolean; error?: string }>;
}

import type { SignatureResult, EventType } from './messages';