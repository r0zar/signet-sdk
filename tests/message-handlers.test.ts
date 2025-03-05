import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMessageChannel, setupMessageHandlers } from '../src/core/message-handlers';

describe('Message Handlers', () => {
  let postMessageSpy: any;
  let addEventListenerSpy: any;
  
  beforeEach(() => {
    // Setup spies
    postMessageSpy = vi.spyOn(window, 'postMessage').mockImplementation(() => {});
    addEventListenerSpy = vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {});
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  describe('createMessageChannel', () => {
    it('should add a message listener when created', () => {
      createMessageChannel();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function));
    });
    
    it('should send messages through window.postMessage', () => {
      const { sendMessage } = createMessageChannel();
      
      const testMessage = { type: 'TEST_MESSAGE', id: 'test-id' };
      sendMessage(testMessage);
      
      expect(postMessageSpy).toHaveBeenCalledWith(
        { source: 'signet-sdk', message: testMessage },
        '*'
      );
    });
    
    it('should allow adding listeners for messages', () => {
      const { listenForMessages } = createMessageChannel();
      
      const callback = vi.fn();
      listenForMessages(callback);
      
      // Simulate a message from the extension
      const messageEvent = new MessageEvent('message', {
        source: window,
        data: {
          source: 'signet-extension',
          message: { type: 'TEST', id: 'test-id' }
        }
      });
      
      // Manually trigger the event handler 
      // (we can't actually dispatch the event due to the mock)
      const handler = addEventListenerSpy.mock.calls[0][1];
      handler(messageEvent);
      
      expect(callback).toHaveBeenCalledWith({ type: 'TEST', id: 'test-id' });
    });
  });
  
  describe('setupMessageHandlers', () => {
    it('should set up handlers for sign requests', () => {
      const onSignRequest = vi.fn().mockResolvedValue({ signature: 'test-signature' });
      
      setupMessageHandlers({
        onSignRequest
      });
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function));
    });
    
    it('should set up handlers for connect requests', () => {
      const onConnectRequest = vi.fn().mockResolvedValue({ connected: true });
      
      setupMessageHandlers({
        onConnectRequest
      });
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function));
    });
  });
});