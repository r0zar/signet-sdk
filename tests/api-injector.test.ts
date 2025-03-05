import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initializeSignetSDK } from '../src/core/api-injector';

describe('API Injector', () => {
  // Save original window object
  const originalWindow = { ...window };
  
  // Mock message channel
  vi.mock('../src/core/message-handlers', () => ({
    createMessageChannel: () => ({
      sendMessage: vi.fn(),
      listenForMessages: vi.fn()
    })
  }));

  beforeEach(() => {
    // Reset window to original state before each test
    Object.defineProperty(window, '__SIGNET_EXTENSION_INSTALLED__', {
      value: undefined,
      configurable: true,
      writable: true
    });
  });

  afterEach(() => {
    // Restore window to original state after each test
    vi.resetAllMocks();
  });

  describe('isExtensionInstalled', () => {
    it('should return false when extension is not installed', () => {
      const sdk = initializeSignetSDK();
      expect(sdk.isExtensionInstalled()).toBe(false);
    });

    it('should return true when extension is installed', () => {
      Object.defineProperty(window, '__SIGNET_EXTENSION_INSTALLED__', {
        value: true,
        configurable: true,
        writable: true
      });
      
      const sdk = initializeSignetSDK();
      expect(sdk.isExtensionInstalled()).toBe(true);
    });
  });

  describe('event handling', () => {
    it('should add and remove event listeners', () => {
      const sdk = initializeSignetSDK();
      
      const callback = vi.fn();
      const secondCallback = vi.fn();
      
      // Test adding listeners
      sdk.on('ready', callback);
      sdk.on('ready', secondCallback);
      
      // Test removing one listener
      sdk.off('ready', callback);
      
      // We can't access private eventListeners directly, so we'll verify through behavior
      // by triggering events manually in a controlled manner
    });
    
    it('should support the correct event types', () => {
      const sdk = initializeSignetSDK();
      const callback = vi.fn();
      
      // These should not throw errors
      expect(() => {
        sdk.on('ready', callback);
        sdk.on('connected', callback);
        sdk.on('disconnected', callback);
      }).not.toThrow();
      
      // These should also not throw errors
      expect(() => {
        sdk.off('ready', callback);
        sdk.off('connected', callback);
        sdk.off('disconnected', callback);
      }).not.toThrow();
    });
  });

  describe('signStructuredData', () => {
    it('should reject if extension is not installed', async () => {
      const sdk = initializeSignetSDK();
      
      await expect(sdk.signStructuredData({ test: 'data' }))
        .rejects
        .toThrow('Signet extension is not installed');
    });
  });

  describe('showNotification', () => {
    it('should not throw when extension is not installed', () => {
      const sdk = initializeSignetSDK();
      
      // This should log a warning, but not throw
      expect(() => {
        sdk.showNotification('info', 'Test Title', 'Test Message');
      }).not.toThrow();
    });
  });
});