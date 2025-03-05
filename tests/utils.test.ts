import { describe, it, expect } from 'vitest';
import { generateId } from '../src/utils/misc';

describe('Utils', () => {
  describe('generateId', () => {
    it('should generate a string of correct length', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      // Random string should be of substantial length
      expect(id.length).toBeGreaterThan(10);
    });

    it('should generate unique ids', () => {
      const id1 = generateId();
      const id2 = generateId();
      const id3 = generateId();
      
      expect(id1).not.toBe(id2);
      expect(id1).not.toBe(id3);
      expect(id2).not.toBe(id3);
    });
  });
});