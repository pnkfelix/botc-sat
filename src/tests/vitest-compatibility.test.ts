import { describe, it, expect } from 'vitest';

describe('Vitest Compatibility Test', () => {
    it('should run basic assertions', () => {
        expect(1 + 1).toBe(2);
        expect('hello').toContain('ell');
        expect(true).toBe(true);
    });

    it('should handle async tests', async () => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1);
        expect(Date.now()).toBeGreaterThan(0);
    });

    it('should work with TypeScript types', () => {
        interface TestType {
            name: string;
            count: number;
        }
        
        const testObj: TestType = { name: 'test', count: 42 };
        expect(testObj.name).toBe('test');
        expect(testObj.count).toBe(42);
    });

    it('should handle correct assertions', () => {
        expect(2 + 2).toBe(4); // Fixed!
    });

    it('should handle async operations correctly', async () => {
        const result = await Promise.resolve('success');
        expect(result).toBe('success'); // Fixed!
    });

    it('should handle object comparisons correctly', () => {
        const actual = { name: 'Alice', age: 30, city: 'NYC' };
        const expected = { name: 'Alice', age: 30, city: 'NYC' };
        expect(actual).toEqual(expected); // Fixed!
    });
});