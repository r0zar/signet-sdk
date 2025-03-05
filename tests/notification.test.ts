import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showFallbackNotification } from '../src/utils/notification';

describe('Notification Utils', () => {
  let consoleInfoSpy: any;
  let consoleLogSpy: any;
  let consoleErrorSpy: any;
  let notificationMock: any;
  let originalWindow: any;
  
  beforeEach(() => {
    // Mock console methods
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Save original Notification
    originalWindow = { ...window };
    
    // Mock Notification API
    notificationMock = vi.fn();
    notificationMock.permission = 'granted';
    notificationMock.requestPermission = vi.fn().mockResolvedValue('granted');
    
    // @ts-ignore - mocking global
    global.Notification = notificationMock;
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  describe('showFallbackNotification', () => {
    it('should log info notification to console', () => {
      showFallbackNotification('info', 'Info Title', 'Info Message');
      expect(consoleInfoSpy).toHaveBeenCalledWith('Info Title: Info Message');
    });
    
    it('should log success notification to console', () => {
      showFallbackNotification('success', 'Success Title', 'Success Message');
      expect(consoleLogSpy).toHaveBeenCalledWith('✅ Success Title: Success Message');
    });
    
    it('should log error notification to console', () => {
      showFallbackNotification('error', 'Error Title', 'Error Message');
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error Title: Error Message');
    });
    
    it('should create a browser notification when permission is granted', () => {
      showFallbackNotification('info', 'Browser Title', 'Browser Message');
      expect(notificationMock).toHaveBeenCalledWith('Browser Title', { body: 'Browser Message' });
    });
    
    it('should request permission when status is not determined', () => {
      // Mock permission as not determined
      notificationMock.permission = 'default';
      
      showFallbackNotification('info', 'Permission Title', 'Permission Message');
      expect(notificationMock.requestPermission).toHaveBeenCalled();
    });
  });
});