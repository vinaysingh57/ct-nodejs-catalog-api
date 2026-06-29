import { slugify } from '../src/utils/slug';
import { successResponse } from '../src/utils/response';

describe('slugify', () => {
    it('creates a URL-friendly slug from a product name', () => {
        expect(slugify('Summer Running Shoes!')).toBe('summer-running-shoes');
    });

    it('removes leading and trailing separators', () => {
        expect(slugify('---demo---')).toBe('demo');
    });
});

describe('successResponse', () => {
    it('standardizes API responses', () => {
        expect(successResponse({ id: '123' }, 'Created', { page: 1 })).toEqual({
            success: true,
            message: 'Created',
            data: { id: '123' },
            meta: { page: 1 }
        });
    });
});
