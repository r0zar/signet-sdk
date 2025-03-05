import { describe, it, expect } from 'vitest';
import { initializeSignetSDK, internal } from '../src/index';

describe('Index exports', () => {
  it('should export the initializeSignetSDK function', () => {
    expect(typeof initializeSignetSDK).toBe('function');
  });
  
  it('should export internal namespace for extension use', () => {
    expect(internal).toBeDefined();
    expect(typeof internal.setupMessageHandlers).toBe('function');
  });
});