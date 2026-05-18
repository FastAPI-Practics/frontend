import { describe, it, expect } from 'vitest';
import { formatDate } from '../src/utils/dateFormatter';

describe('formatDate', () => {
    const staticDate = new Date(2026, 0, 1, 0, 0, 0);
    it('should return datestring', () => {
        expect(formatDate(staticDate)).toBe("01.01.2026, 00:00:00")
    });
    it('should return null', () => {
        expect(formatDate(null)).toBe(null)
    });
    it('should return datestring from timestamp', () => {
        const timestamp = staticDate.getTime();
        expect(formatDate(timestamp)).toBe("01.01.2026, 00:00:00")
    });
})